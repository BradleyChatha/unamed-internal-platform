using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Ory.Kratos.Client.Api;
using Ory.Kratos.Client.Client;
using Ory.Kratos.Client.Model;

namespace Uip.Common.Auth;

public class KratosAuthenticationOptions : AuthenticationSchemeOptions { }

public class KratosAuthenticationHandler : AuthenticationHandler<KratosAuthenticationOptions>
{
    public const string ErrorNoSessionFound = "[kratos:error:no-session-found]";
    public const string ErrorGenericFailure = "[kratos:error:generic-failure]";
    public const string ErrorInactiveSession = "[kratos:error:inactive-session]";
    public const string ErrorNoIdentityFound = "[kratos:error:no-identity-found]";
    public const string ErrorNoExpiryDateFound = "[kratos:error:no-expiry-date-found]";
    public const string ErrorExpiredSession = "[kratos:error:expired-session]";
    public const string ErrorBadAal = "[kratos:error:bad-aal]";
    public const string ErrorNoVerifiableAddressesFound =
        "[kratos:error:no-verifiable-addresses-found]";
    public const string ErrorNoVerifiedAddressesFound =
        "[kratos:error:no-verified-addresses-found]";

    const string ErrorNoSessionFoundMessage = "No session found in Kratos - are you logged in?";
    const string ErrorGenericFailureMessage = "Generic failure while communicating with Kratos";
    const string ErrorInactiveSessionMessage =
        "Session is not active - this session has been invalidated, please log in again";
    const string ErrorNoIdentityFoundMessage =
        "No identity found - likely a bug, try logging out and back in again?";
    const string ErrorNoExpiryDateFoundMessage =
        "No expiry date found - likely a bug, try logging out and back in again. This is disallowed for security reasons";
    const string ErrorExpiredSessionMessage = "Session has expired - please log in again";
    const string ErrorBadAalMessage = "Session is not AAL2 - you have not completed 2FA";
    const string ErrorNoVerifiableAddressesFoundMessage =
        "No verifiable addresses found - admins: https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation";
    const string ErrorNoVerifiedAddressesFoundMessage =
        "No verified addresses found - admins: https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation";

    public const string SchemeName = "Kratos";

    readonly IFrontendApiAsync _kratosApi;

    public KratosAuthenticationHandler(
        IOptionsMonitor<KratosAuthenticationOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IFrontendApiAsync kratosApi
    )
        : base(options, logger, encoder, clock)
    {
        _kratosApi = kratosApi;
    }

    async Task<AuthenticateResult> Fail(string error, string message)
    {
        base.Response.Headers.Add("X-Error-Id", error);
        base.Response.Headers.Add("X-Error-Reason", message);
        // await base.Response.BodyWriter.WriteAsync(
        //     JsonSerializer.SerializeToUtf8Bytes(
        //         new { error = new { id = error, reason = message } }
        //     )
        // );
        await Task.CompletedTask;
        return AuthenticateResult.Fail(error);
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        KratosSession? session;
        try
        {
            string? cookie = base.Request.Cookies["ory_kratos_session"];
            string? xSessionToken = base.Request.Headers["X-Session-Token"];
            session = (
                cookie != null
                    ? await this._kratosApi.ToSessionAsync(cookie: $"ory_kratos_session={cookie}")
                    : xSessionToken != null
                        ? await this._kratosApi.ToSessionAsync(xSessionToken: xSessionToken)
                        : null
            );
        }
        catch (Exception e)
        {
            if (e is ApiException apiException && apiException.ErrorCode == 401)
                return await Fail(ErrorNoSessionFound, ErrorNoSessionFoundMessage);
            return await Fail(ErrorGenericFailure, ErrorGenericFailureMessage);
        }

        base.Logger.LogDebug("Got session from Kratos: {session}", session);

        if (session == null)
            return await Fail(ErrorNoSessionFound, ErrorNoSessionFoundMessage);
        if (!session.Active)
            return await Fail(ErrorInactiveSession, ErrorInactiveSessionMessage);

        if (session.Identity == null)
            return await Fail(ErrorNoIdentityFound, ErrorNoIdentityFoundMessage);

        if (session.Identity.Id == null)
            return await Fail(ErrorNoIdentityFound, ErrorNoIdentityFoundMessage);

        if (session.ExpiresAt == null)
            return await Fail(ErrorNoExpiryDateFound, ErrorNoExpiryDateFoundMessage);

        if (session.ExpiresAt < DateTime.Now)
            return await Fail(ErrorExpiredSession, ErrorExpiredSessionMessage);

        if (session.AuthenticatorAssuranceLevel != KratosAuthenticatorAssuranceLevel.Aal2)
            return await Fail(ErrorBadAal, ErrorBadAalMessage);

        if (session.Identity.VerifiableAddresses == null)
            return await Fail(
                ErrorNoVerifiableAddressesFound,
                ErrorNoVerifiableAddressesFoundMessage
            );

        if (session.Identity.VerifiableAddresses.Count == 0)
            return await Fail(
                ErrorNoVerifiableAddressesFound,
                ErrorNoVerifiableAddressesFoundMessage
            );
        if (!session.Identity.VerifiableAddresses.Any(e => e.Verified))
            return await Fail(ErrorNoVerifiedAddressesFound, ErrorNoVerifiedAddressesFoundMessage);

        var identity = new ClaimsIdentity(base.Scheme.Name);
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, session.Identity.Id));
        identity.AddClaim(new Claim(ClaimTypes.Expiration, session.ExpiresAt.ToString()));

        base.Logger.LogInformation("Authenticated user {id}", session.Identity.Id);
        return AuthenticateResult.Success(
            new AuthenticationTicket(new ClaimsPrincipal(identity), base.Scheme.Name)
        );
    }
}
