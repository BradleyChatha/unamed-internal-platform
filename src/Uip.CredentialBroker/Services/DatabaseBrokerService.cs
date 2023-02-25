using FluentValidation;
using Grpc.Core;
using Uip.CredentialBroker.Interfaces;

namespace Uip.CredentialBroker.Services;

public class DatabaseBrokerService : DatabaseBroker.DatabaseBrokerBase
{
    readonly IValidator<CreateCredentialsRequest> _createCredentialsRequestValidator;
    readonly ILogger<DatabaseBrokerService> _logger;
    readonly IDatabaseBroker _broker;

    public DatabaseBrokerService(
        ILogger<DatabaseBrokerService> logger,
        IDatabaseBroker broker,
        IValidator<CreateCredentialsRequest> createCredentialsRequestValidator
    )
    {
        _logger = logger;
        _broker = broker;
        _createCredentialsRequestValidator = createCredentialsRequestValidator;

        _logger.LogTrace("Using implementation {BrokerImpl}", broker.GetType().FullName);
    }

    public override async Task<CreateCredentialsResponse> CreateCredentials(
        CreateCredentialsRequest request,
        ServerCallContext context
    )
    {
        await this._createCredentialsRequestValidator.ValidateAndThrowAsync(
            request,
            context.CancellationToken
        );

        var result = await this._broker.CreateCredentialsAsync(request.PluginId);
        return new CreateCredentialsResponse
        {
            Dbname = result.dbname,
            Host = result.host,
            Password = result.password,
            Port = result.port,
            Username = result.username
        };
    }
}
