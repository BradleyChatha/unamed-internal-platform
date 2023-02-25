namespace Uip.Permissions.Interfaces;

public interface IPermissionCheckerAsync
{
    public Task<bool> UserCanPerformAction(
        string userId,
        string action,
        IDictionary<string, string> resourceKeyValues
    );
}
