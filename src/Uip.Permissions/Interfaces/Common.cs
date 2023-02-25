namespace Uip.Permissions.Interfaces;

// Public because:
//   - the integration tests use a class fixture, which is forced to be public by xUnit
//   - which means the DbContext used by the class fixture must be public
//   - which means the models used by the DbContext must be public
//   - which means this specific record must be public, as it is used by a model
public record ActionPolicyStatementDto(
    string Name,
    IList<string> Actions,
    IList<string> KeyValueMatchStrings,
    object? StorageDriverMetadata = null
);

internal record ActionPolicyDocumentDto(
    Guid Id,
    string Name,
    string Description,
    IList<ActionPolicyStatementDto> Statements,
    object? StorageDriverMetadata = null
);

internal record RoleDto(
    Guid Id,
    string Name,
    string Description,
    object? StorageDriverMetadata = null
);

internal record RoleActionPolicyMappingDto(
    Guid RoleId,
    Guid ActionPolicyDocumentId,
    object? StorageDriverMetadata = null
);

internal record UserRoleMappingDto(
    string UserId,
    Guid RoleId,
    object? StorageDriverMetadata = null
);
