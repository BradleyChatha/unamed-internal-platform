using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Implementations.Database.Model;

public class ActionPolicyDocumentDb
{
    [Key]
    public required Guid Id { get; set; }

    public required string Name { get; set; }
    public required string Description { get; set; }

    [Column(TypeName = "jsonb")]
    public IList<ActionPolicyStatementDto> Statements { get; set; }

    [Timestamp]
    public byte[]? RowVersion { get; set; }

    public ActionPolicyDocumentDb()
    {
        Statements = new List<ActionPolicyStatementDto>();
    }
}
