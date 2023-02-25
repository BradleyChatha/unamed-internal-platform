namespace Uip.Permissions.Implementations.Database.Model;

public class RoleActionPolicyDocumentMappingDb
{
    public Guid RoleId { get; set; }
    public RoleDb Role { get; set; } = null!;

    public Guid ActionPolicyDocumentId { get; set; }
    public ActionPolicyDocumentDb ActionPolicyDocument { get; set; } = null!;
}
