using Uip.Permissions.Implementations.Memory;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Tests.UnitTests;

public class MemoryPermissionStoreAsyncTests
{
    [Fact]
    public async Task UpsertActionPolicyDocument_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var document = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            "test",
            "test",
            new[] { new ActionPolicyStatementDto("test", new[] { "test" }, new[] { "test" }) }
        );

        // Act
        await store.Upsert(document);

        // Assert
        (await store.QueryActionPolicyDocuments())
            .Count()
            .Should()
            .Be(1);
    }

    [Fact]
    public async Task UpsertActionPolicyDocument_WithExistingDocument()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var document = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            "test",
            "test",
            new[] { new ActionPolicyStatementDto("test", new[] { "test" }, new[] { "test" }) }
        );
        await store.Upsert(document);

        // Act
        await store.Upsert(document with { Description = "test2" });

        // Assert
        (await store.QueryActionPolicyDocuments())
            .Single()
            .Description.Should()
            .Be("test2");
    }

    [Fact]
    public async Task UpsertRole_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var role = new RoleDto(Guid.NewGuid(), "name", "description");

        // Act
        await store.Upsert(role);

        // Assert
        (await store.QueryRoles())
            .Count()
            .Should()
            .Be(1);
    }

    [Fact]
    public async Task UpsertRole_WithExistingRole()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var role = new RoleDto(Guid.NewGuid(), "name", "description");
        await store.Upsert(role);

        // Act
        await store.Upsert(role with { Description = "test2" });

        // Assert
        (await store.QueryRoles())
            .Single()
            .Description.Should()
            .Be("test2");
    }

    [Fact]
    public async Task UpsertRoleActionPolicyMapping_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var mapping = new RoleActionPolicyMappingDto(Guid.NewGuid(), Guid.NewGuid());

        // Act
        await store.Upsert(mapping);

        // Assert
        (await store.QueryRoleActionPolicyMappings())
            .Count()
            .Should()
            .Be(1);
    }

    [Fact]
    public async Task UpsertUserRoleMapping_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var mapping = new UserRoleMappingDto("userId", Guid.NewGuid());

        // Act
        await store.Upsert(mapping);

        // Assert
        (await store.QueryUserRoleMappings())
            .Count()
            .Should()
            .Be(1);
    }

    [Fact]
    public async Task DeleteActionPolicyDocument_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var document = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            "test",
            "test",
            new[] { new ActionPolicyStatementDto("test", new[] { "test" }, new[] { "test" }) }
        );
        await store.Upsert(document);

        // Act
        await store.Delete(new[] { document });

        // Assert
        (await store.QueryActionPolicyDocuments())
            .Count()
            .Should()
            .Be(0);
    }

    [Fact]
    public async Task DeleteRole_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var role = new RoleDto(Guid.NewGuid(), "name", "description");
        await store.Upsert(role);

        // Act
        await store.Delete(new[] { role });

        // Assert
        (await store.QueryRoles())
            .Count()
            .Should()
            .Be(0);
    }

    [Fact]
    public async Task DeleteRoleActionPolicyMapping_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var mapping = new RoleActionPolicyMappingDto(Guid.NewGuid(), Guid.NewGuid());
        await store.Upsert(mapping);

        // Act
        await store.Delete(new[] { mapping });

        // Assert
        (await store.QueryRoleActionPolicyMappings())
            .Count()
            .Should()
            .Be(0);
    }

    [Fact]
    public async Task DeleteUserRoleMapping_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var mapping = new UserRoleMappingDto("userId", Guid.NewGuid());
        await store.Upsert(mapping);

        // Act
        await store.Delete(new[] { mapping });

        // Assert
        (await store.QueryUserRoleMappings())
            .Count()
            .Should()
            .Be(0);
    }

    [Fact]
    public async Task GetActionPolicyDocument_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var document = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            "test",
            "test",
            new[] { new ActionPolicyStatementDto("test", new[] { "test" }, new[] { "test" }) }
        );
        await store.Upsert(document);

        // Act
        var result = await store.GetActionPolicyDocument(document.Id);

        // Assert
        result.Should().Be(document);
    }

    [Fact]
    public async Task GetRole_Happy()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();
        var role = new RoleDto(Guid.NewGuid(), "name", "description");
        await store.Upsert(role);

        // Act
        var result = await store.GetRole(role.Id);

        // Assert
        result.Should().Be(role);
    }

    [Fact]
    public async Task GetActionPolicyDocument_WithNonExistingDocument()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();

        // Act
        var result = await store.GetActionPolicyDocument(Guid.NewGuid());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetRole_WithNonExistingRole()
    {
        // Arrange
        var store = new MemoryPermissionStoreAsync();

        // Act
        var result = await store.GetRole(Guid.NewGuid());

        // Assert
        result.Should().BeNull();
    }
}
