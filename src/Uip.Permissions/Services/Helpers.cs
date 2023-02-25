namespace Uip.Permissions.Services;

internal static class ServiceHelpers
{
    public const string PermissionDeniedErrorId = "permissions:PermissionDenied";
    public const string PermissionDeniedNotFound = "permissions:NotFound";

    public static GenericResponse PermissionDenied(
        string userId,
        string action,
        string resourceType,
        string resourceId
    )
    {
        return new GenericResponse
        {
            Success = false,
            Message =
                $"User {userId} does not have permission to {action} on {resourceType} {resourceId}",
            ErrorId = PermissionDeniedErrorId
        };
    }

    public static GenericResponse NotFound(string resourceType, string resourceId)
    {
        return new GenericResponse
        {
            Success = false,
            Message = $"{resourceType} {resourceId} not found",
            ErrorId = PermissionDeniedNotFound
        };
    }
}
