namespace Uip.Permissions.Implementations.Database.Model;

public class UserRoleMappingDb
{
    public required string UserId { get; set; }

    public Guid RoleId { get; set; }
    public RoleDb Role { get; set; } = null!;
}
