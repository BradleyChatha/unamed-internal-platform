using Uip.Common;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Implementations.Composable;

internal sealed class DatastoreBackedPermissionCheckerAsync : IPermissionCheckerAsync
{
    readonly ILogger<DatastoreBackedPermissionCheckerAsync> _logger;
    readonly IPermissionStoreAsync _permissionStoreAsync;

    public DatastoreBackedPermissionCheckerAsync(
        ILogger<DatastoreBackedPermissionCheckerAsync> logger,
        IPermissionStoreAsync permissionStoreAsync
    )
    {
        _logger = logger;
        _permissionStoreAsync = permissionStoreAsync;
    }

    public async Task<bool> UserCanPerformAction(
        string userId,
        string action,
        IDictionary<string, string> resourceKeyValues
    )
    {
        this._logger.LogTrace(
            "Checking if user {userId} can perform action {action} on resource {resourceKeyValues}",
            userId,
            action,
            resourceKeyValues
        );

        var userRoleIds = (await this._permissionStoreAsync.QueryUserRoleMappings())
            .Where(map => map.UserId == userId)
            .Select(map => map.RoleId);

        var roleActionPolicyDocumentIds = (
            await this._permissionStoreAsync.QueryRoleActionPolicyMappings()
        )
            .Where(map => userRoleIds.Contains(map.RoleId))
            .Select(map => map.ActionPolicyDocumentId);

        var actionPolicyDocuments = (await this._permissionStoreAsync.QueryActionPolicyDocuments())
            .Where(doc => roleActionPolicyDocumentIds.Contains(doc.Id))
            .AsEnumerable();

        // TODO: Benchmarking; decide whether to do a heuristic (e.g. statement or matcher count?)
        //       to choose between parallel and sequential, etc.
        var anyStatementAllowsAction = actionPolicyDocuments
            .SelectMany(doc => doc.Statements)
            .AsParallel()
            .Any(s => this.DoesStatementAllowAction(s, userId, action, resourceKeyValues));

        if (anyStatementAllowsAction)
        {
            this._logger.LogTrace(
                "User {userId} can perform action {action} on resource {resourceKeyValues}",
                userId,
                action,
                resourceKeyValues
            );
            return true;
        }

        this._logger.LogTrace(
            "User {userId} cannot perform action {action} on resource {resourceKeyValues}",
            userId,
            action,
            resourceKeyValues
        );
        return false;
    }

    private bool DoesStatementAllowAction(
        ActionPolicyStatementDto statement,
        string userId,
        string action,
        IDictionary<string, string> resourceKeyValues
    )
    {
        this._logger.LogDebug(
            "Checking statement {statement} for user {userId}",
            statement,
            userId
        );

        foreach (var kv in statement.KeyValueMatchStrings)
        {
            this._logger.LogDebug(
                "Checking key-value matcher {keyValueMatcher} for user {userId}",
                kv,
                userId
            );

            if (MatchByKeyValue(kv, resourceKeyValues))
            {
                this._logger.LogDebug(
                    "Key-value matcher `{keyValueMatcher}` matches for user {userId}",
                    kv,
                    userId
                );

                if (statement.Actions.Contains(action))
                    return true;
            }
        }

        return false;
    }

    private static bool MatchByKeyValue(
        string keyValueMatcher,
        IDictionary<string, string> resourceKeyValues
    )
    {
        var allowed = false;
        ResourceMatcher.ParseKvMatchString(
            keyValueMatcher,
            (key, matcher) =>
            {
                var keyAsString = key.ToString();
                if (
                    resourceKeyValues.ContainsKey(keyAsString)
                    && ResourceMatcher.DoesValueMatchMatcher(
                        matcher,
                        resourceKeyValues[keyAsString]
                    )
                )
                {
                    allowed = true;
                    return true;
                }

                return false;
            }
        );

        return allowed;
    }
}
