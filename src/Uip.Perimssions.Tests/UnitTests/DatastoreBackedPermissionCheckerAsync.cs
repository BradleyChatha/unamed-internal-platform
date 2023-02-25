using Microsoft.Extensions.Logging.Abstractions;
using Uip.Permissions.Implementations.Composable;
using Uip.Permissions.Implementations.Memory;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Tests.UnitTests;

public class DatastoreBackedPermissionCheckerAsyncTests
{
    readonly IPermissionStoreAsync _store;

    public DatastoreBackedPermissionCheckerAsyncTests()
    {
        _store = new MemoryPermissionStoreAsync();

        var document = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            "Test",
            "",
            new[]
            {
                new ActionPolicyStatementDto("Test", new[] { "List" }, new[] { "kv:Type=Password" })
            }.ToList()
        );

        var role = new RoleDto(Guid.NewGuid(), "Test", "");

        _store.Upsert(document).Wait();
        _store.Upsert(role).Wait();
        _store.Upsert(new UserRoleMappingDto("abc", role.Id)).Wait();
        _store.Upsert(new RoleActionPolicyMappingDto(role.Id, document.Id)).Wait();
    }

    [Fact]
    public async Task UserCanPerformAction_KV_Granted()
    {
        // Arrange
        var checker = new DatastoreBackedPermissionCheckerAsync(
            new NullLogger<DatastoreBackedPermissionCheckerAsync>(),
            _store
        );

        // Act
        var result = await checker.UserCanPerformAction(
            "abc",
            "List",
            new Dictionary<string, string> { { "Type", "Password" } }
        );

        // Assert
        result.Should().BeTrue();
    }

    [Fact]
    public async Task UserCanPerformAction_KV_Denied_BadKvMatch()
    {
        // Arrange
        var checker = new DatastoreBackedPermissionCheckerAsync(
            new NullLogger<DatastoreBackedPermissionCheckerAsync>(),
            _store
        );

        // Act
        var result = await checker.UserCanPerformAction(
            "abc",
            "List",
            new Dictionary<string, string> { { "Type", "NotPassword" } }
        );

        // Assert
        result.Should().BeFalse();
    }

    [Fact]
    public async Task UserCanPerformAction_KV_Denied_BadAction()
    {
        // Arrange
        var checker = new DatastoreBackedPermissionCheckerAsync(
            new NullLogger<DatastoreBackedPermissionCheckerAsync>(),
            _store
        );

        // Act
        var result = await checker.UserCanPerformAction(
            "abc",
            "NotList",
            new Dictionary<string, string> { { "Type", "Password" } }
        );

        // Assert
        result.Should().BeFalse();
    }

    [Fact]
    public async Task UserCanPerformAction_KV_Denied_BadUser()
    {
        // Arrange
        var checker = new DatastoreBackedPermissionCheckerAsync(
            new NullLogger<DatastoreBackedPermissionCheckerAsync>(),
            _store
        );

        // Act
        var result = await checker.UserCanPerformAction(
            "def",
            "List",
            new Dictionary<string, string> { { "Type", "Password" } }
        );

        // Assert
        result.Should().BeFalse();
    }
}
