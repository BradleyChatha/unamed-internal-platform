using Microsoft.EntityFrameworkCore;
using Uip.Common.Testing;

namespace Uip.Permissions.Implementations.Database.Model;

public class PermissionsDbContext : DbContext, IFixtureCompatibleDbContext<PermissionsDbContext>
{
    public DbSet<ActionPolicyDocumentDb> ActionPolicyDocuments { get; set; } = null!;
    public DbSet<RoleDb> Roles { get; set; } = null!;
    public DbSet<RoleActionPolicyDocumentMappingDb> RoleActionPolicyDocuments { get; set; } = null!;
    public DbSet<UserRoleMappingDb> UserRoles { get; set; } = null!;

    public PermissionsDbContext(DbContextOptions<PermissionsDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Currently not supported by Npgsql
        // modelBuilder
        //     .Entity<ActionPolicyDocumentDb>()
        //     .OwnsMany(x => x.Statements, statement => statement.ToJson());
        modelBuilder.Entity<ActionPolicyDocumentDb>().HasIndex(x => x.Name).IsUnique();

        modelBuilder
            .Entity<RoleActionPolicyDocumentMappingDb>()
            .HasKey(x => new { x.RoleId, x.ActionPolicyDocumentId });

        modelBuilder
            .Entity<RoleDb>()
            .HasMany(x => x.ActionPolicyDocuments)
            .WithMany()
            .UsingEntity<RoleActionPolicyDocumentMappingDb>(
                x =>
                    x.HasOne(x => x.ActionPolicyDocument)
                        .WithMany()
                        .HasForeignKey(x => x.ActionPolicyDocumentId),
                x => x.HasOne(x => x.Role).WithMany().HasForeignKey(x => x.RoleId)
            );
        modelBuilder.Entity<RoleDb>().HasIndex(x => x.Name).IsUnique();
        modelBuilder.Entity<RoleDb>().Navigation(x => x.ActionPolicyDocuments).AutoInclude();

        modelBuilder.Entity<UserRoleMappingDb>().HasKey(x => new { x.UserId, x.RoleId });
    }

    public static PermissionsDbContext CreateFixture(DbContextOptions<PermissionsDbContext> options)
    {
        return new(options);
    }
}
