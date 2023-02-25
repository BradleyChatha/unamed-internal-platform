using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Ory.Kratos.Client.Api;
using Ory.Kratos.Client.Client;
using Ory.Kratos.Client.Model;

namespace Uip.Common.Auth;

public class KratosAuthenticationOptions : AuthenticationSchemeOptions { }

public class KratosAuthenticationHandler : AuthenticationHandler<KratosAuthenticationOptions>
{
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

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        base.Logger.LogDebug("Performing authentication against Kratos");

        KratosSession? session;
        try
        {
            string? cookie = base.Request.Cookies["ory_kratos_session"];
            string? xSessionToken = base.Request.Headers["X-Session-Token"];
            session = (
                cookie == null
                    ? await this._kratosApi.ToSessionAsync(cookie: cookie)
                    : xSessionToken == null
                        ? await this._kratosApi.ToSessionAsync(xSessionToken: xSessionToken)
                        : null
            );
        }
        catch (Exception e)
        {
            if (e is ApiException apiException && apiException.ErrorCode == 401)
            {
                base.Logger.LogDebug("No session found in Kratos");
                return AuthenticateResult.NoResult();
            }
            base.Logger.LogError(e, "Failed to get session from Kratos");
            return AuthenticateResult.Fail(e);
        }

        base.Logger.LogDebug("Got session from Kratos: {session}", session);

        if (session == null)
            return AuthenticateResult.Fail("No session found - are you logged in?");

        if (!session.Active)
            return AuthenticateResult.Fail(
                "Session is not active - this session has been invalidated, please log in again"
            );

        if (session.Identity == null)
            return AuthenticateResult.Fail(
                "No identity found - likely a bug, try logging out and back in again"
            );

        if (session.Identity.Id == null)
            return AuthenticateResult.Fail(
                "No identity id found - likely a bug, try logging out and back in again"
            );

        if (session.ExpiresAt == null)
            return AuthenticateResult.Fail(
                "No expiry date found - likely a bug, try logging out and back in again. This is disallowed for security reasons"
            );

        if (session.ExpiresAt < DateTime.Now)
            return AuthenticateResult.Fail("Session has expired - please log in again");

        if (session.AuthenticatorAssuranceLevel != KratosAuthenticatorAssuranceLevel.Aal2)
            return AuthenticateResult.Fail("Session is not AAL2 - you have not completed 2FA");

        if (session.Identity.VerifiableAddresses == null)
            return AuthenticateResult.Fail(
                "No verifiable addresses found - admins: https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation"
            );

        if (session.Identity.VerifiableAddresses.Count == 0)
            return AuthenticateResult.Fail(
                "No verifiable addresses found - admins: https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation"
            );

        if (!session.Identity.VerifiableAddresses.Any(e => e.Verified))
            return AuthenticateResult.Fail(
                "Email address is not verified - please verify your email address, you should have received an email from Kratos"
            );

        var identity = new ClaimsIdentity(base.Scheme.Name);
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, session.Identity.Id));
        identity.AddClaim(new Claim(ClaimTypes.Expiration, session.ExpiresAt.ToString()));

        base.Logger.LogInformation("Authenticated user {id}", session.Identity.Id);
        return AuthenticateResult.Success(
            new AuthenticationTicket(new ClaimsPrincipal(identity), base.Scheme.Name)
        );
    }
}
