using System.ComponentModel.DataAnnotations;

namespace Uip.Permissions.Implementations.Database.Model;

public class RoleDb
{
    [Key]
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public List<ActionPolicyDocumentDb> ActionPolicyDocuments { get; set; } = null!;

    [Timestamp]
    public byte[]? RowVersion { get; set; }
}
