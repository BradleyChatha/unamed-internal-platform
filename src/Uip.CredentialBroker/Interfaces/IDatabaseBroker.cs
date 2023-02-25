namespace Uip.CredentialBroker.Interfaces;

public record DatabaseCredentials(
    string host,
    ushort port,
    string username,
    string password,
    string dbname
);

public interface IDatabaseBroker
{
    public Task<DatabaseCredentials> CreateCredentialsAsync(string pluginId);
}
