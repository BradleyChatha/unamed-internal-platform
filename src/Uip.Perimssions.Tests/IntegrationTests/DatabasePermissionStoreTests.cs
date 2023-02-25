using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Uip.Common.Testing;
using Uip.Permissions.Implementations.Database;
using Uip.Permissions.Implementations.Database.Model;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Tests.IntegrationTests;

public class DatabasePermissionStoreTests
    : IClassFixture<RandomDatabaseFixture<PermissionsDbContext>>
{
    readonly RandomDatabaseFixture<PermissionsDbContext> _fixture;

    public DatabasePermissionStoreTests(RandomDatabaseFixture<PermissionsDbContext> fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public async Task DeleteActionPolicyDocuments_NonExistant()
    {
        // Arrange
        var actionPolicyDocumentDtos = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        await store.Delete(actionPolicyDocumentDtos);

        // Assert
        var actionPolicyDocuments = _fixture.Context.ActionPolicyDocuments.ToList();
        actionPolicyDocuments.Should().NotContain(x => x.Id == actionPolicyDocumentDtos[0].Id);
    }

    [Fact]
    public async Task DeleteActionPolicyDocuments_Happy()
    {
        // Arrange
        var actionPolicyDocumentDtos = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(actionPolicyDocumentDtos[0]);

        // Act
        await store.Delete(actionPolicyDocumentDtos);

        // Assert
        var actionPolicyDocuments = _fixture.Context.ActionPolicyDocuments.ToList();
        actionPolicyDocuments.Should().NotContain(x => x.Id == actionPolicyDocumentDtos[0].Id);
    }

    [Fact]
    public async Task DeleteRoles_NonExistant()
    {
        // Arrange
        var roleDtos = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        await store.Delete(roleDtos);

        // Assert
        var roles = _fixture.Context.Roles.ToList();
        roles.Should().NotContain(x => x.Id == roleDtos[0].Id);
    }

    [Fact]
    public async Task DeleteRoles_Happy()
    {
        // Arrange
        var roleDtos = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roleDtos[0]);

        // Act
        await store.Delete(roleDtos);

        // Assert
        var roles = _fixture.Context.Roles.ToList();
        roles.Should().NotContain(x => x.Id == roleDtos[0].Id);
    }

    [Fact]
    public async Task DeleteRoleActionPolicyMappings_NonExistant()
    {
        // Arrange
        var roleActionPolicyMappingDtos = new[]
        {
            new RoleActionPolicyMappingDto(Guid.NewGuid(), Guid.NewGuid()),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        await store.Delete(roleActionPolicyMappingDtos);

        // Assert
        var roleActionPolicyMappings = _fixture.Context.RoleActionPolicyDocuments.ToList();
        roleActionPolicyMappings
            .Should()
            .NotContain(
                x =>
                    x.RoleId == roleActionPolicyMappingDtos[0].RoleId
                    && x.ActionPolicyDocumentId
                        == roleActionPolicyMappingDtos[0].ActionPolicyDocumentId
            );
    }

    [Fact]
    public async Task DeleteRoleActionPolicyMappings_Happy()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var actionPolicyDocuments = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var roleActionPolicyMappingDtos = new[]
        {
            new RoleActionPolicyMappingDto(roles[0].Id, actionPolicyDocuments[0].Id),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);
        await store.Upsert(actionPolicyDocuments[0]);
        await store.Upsert(roleActionPolicyMappingDtos[0]);

        // Act
        await store.Delete(roleActionPolicyMappingDtos);

        // Assert
        var roleActionPolicyMappings = _fixture.Context.RoleActionPolicyDocuments.ToList();
        roleActionPolicyMappings
            .Should()
            .NotContain(
                x =>
                    x.RoleId == roleActionPolicyMappingDtos[0].RoleId
                    && x.ActionPolicyDocumentId
                        == roleActionPolicyMappingDtos[0].ActionPolicyDocumentId
            );
    }

    [Fact]
    public async Task DeleteUserRoleMappings_NonExistant()
    {
        // Arrange
        var userRoleMappingDtos = new[]
        {
            new UserRoleMappingDto(Guid.NewGuid().ToString(), Guid.NewGuid()),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        await store.Delete(userRoleMappingDtos);

        // Assert
        var userRoleMappings = _fixture.Context.UserRoles.ToList();
        userRoleMappings
            .Should()
            .NotContain(
                x =>
                    x.UserId == userRoleMappingDtos[0].UserId
                    && x.RoleId == userRoleMappingDtos[0].RoleId
            );
    }

    [Fact]
    public async Task DeleteUserRoleMappings_Happy()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var userRoleMappingDtos = new[]
        {
            new UserRoleMappingDto(Guid.NewGuid().ToString(), roles[0].Id),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);
        await store.Upsert(userRoleMappingDtos[0]);

        // Act
        await store.Delete(userRoleMappingDtos);

        // Assert
        var userRoleMappings = _fixture.Context.UserRoles.ToList();
        userRoleMappings
            .Should()
            .NotContain(
                x =>
                    x.UserId == userRoleMappingDtos[0].UserId
                    && x.RoleId == userRoleMappingDtos[0].RoleId
            );
    }

    [Fact]
    public async Task UpsertActionPolicyDocuments_Insert()
    {
        // Arrange
        var actionPolicyDocumentDto = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString(),
            new[]
            {
                new ActionPolicyStatementDto(
                    Guid.NewGuid().ToString(),
                    new[] { "abc" },
                    new[] { "abc" }
                )
            }
        );
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        await store.Upsert(actionPolicyDocumentDto);

        // Assert
        var actionPolicyDocument = _fixture.Context.ActionPolicyDocuments.Single(
            x => x.Id == actionPolicyDocumentDto.Id
        );
        actionPolicyDocument.Name.Should().Be(actionPolicyDocumentDto.Name);
        actionPolicyDocument.Description.Should().Be(actionPolicyDocumentDto.Description);
        actionPolicyDocument.Statements
            .Should()
            .HaveCount(actionPolicyDocumentDto.Statements.Count());
        foreach (var actionPolicyStatement in actionPolicyDocument.Statements)
        {
            var actionPolicyStatementDto = actionPolicyDocumentDto.Statements.Single(
                x => x.Name == actionPolicyStatement.Name
            );
            actionPolicyStatementDto.Actions.Should().BeEquivalentTo(actionPolicyStatement.Actions);
            actionPolicyStatementDto.KeyValueMatchStrings
                .Should()
                .BeEquivalentTo(actionPolicyStatement.KeyValueMatchStrings);
        }
    }

    [Fact]
    public async Task UpsertActionPolicyDocuments_Update()
    {
        // Arrange
        var actionPolicyDocumentDto = new ActionPolicyDocumentDto(
            Guid.NewGuid(),
            Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString(),
            new[]
            {
                new ActionPolicyStatementDto(
                    Guid.NewGuid().ToString(),
                    new[] { "abc" },
                    new[] { "abc" }
                )
            }
        );
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(actionPolicyDocumentDto);

        // Act
        var newName = Guid.NewGuid().ToString();
        await store.Upsert(
            actionPolicyDocumentDto with
            {
                Name = newName,
                Description = "cba",
                Statements = new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "cba" },
                        new[] { "cba" }
                    )
                }
            }
        );

        // Assert
        var actionPolicyDocument = _fixture.Context.ActionPolicyDocuments.Single(
            x => x.Id == actionPolicyDocumentDto.Id
        );
        actionPolicyDocument.Name.Should().Be(newName);
        actionPolicyDocument.Description.Should().Be("cba");
        actionPolicyDocument.Statements.Should().HaveCount(1);
        actionPolicyDocument.Statements.First().Actions.Should().HaveCount(1);
        actionPolicyDocument.Statements.First().Actions.First().Should().Be("cba");
    }

    [Fact]
    public async Task UpsertRoleDto_Insert()
    {
        // Arrange
        var roleDto = new RoleDto(
            Guid.NewGuid(),
            Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString()
        );
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        await store.Upsert(roleDto);

        // Assert
        var roles = _fixture.Context.Roles.ToList();
        roles.Should().Contain(x => x.Id == roleDto.Id);
    }

    [Fact]
    public async Task UpsertRoleDto_Update()
    {
        // Arrange
        var roleDto = new RoleDto(
            Guid.NewGuid(),
            Guid.NewGuid().ToString(),
            Guid.NewGuid().ToString()
        );
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roleDto);

        // Act
        var newName = Guid.NewGuid().ToString();
        await store.Upsert(roleDto with { Name = newName, Description = "cba", });

        // Assert
        var role = _fixture.Context.Roles.Single(x => x.Id == roleDto.Id);
        role.Name.Should().Be(newName);
        role.Description.Should().Be("cba");
    }

    [Fact]
    public async Task UpsertRoleActionPolicyMappingDto_Insert()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var actionPolicyDocuments = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var roleActionPolicyMappingDto = new RoleActionPolicyMappingDto(
            roles[0].Id,
            actionPolicyDocuments[0].Id
        );
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);
        await store.Upsert(actionPolicyDocuments[0]);

        // Act
        await store.Upsert(roleActionPolicyMappingDto);

        // Assert
        var roleActionPolicyMappings = _fixture.Context.RoleActionPolicyDocuments.ToList();
        roleActionPolicyMappings
            .Should()
            .Contain(
                x =>
                    x.RoleId == roleActionPolicyMappingDto.RoleId
                    && x.ActionPolicyDocumentId == roleActionPolicyMappingDto.ActionPolicyDocumentId
            );
    }

    [Fact]
    public async Task UpsertUserRoleMappingDto_Insert()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var userRoleMappingDto = new UserRoleMappingDto(Guid.NewGuid().ToString(), roles[0].Id);
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);

        // Act
        await store.Upsert(userRoleMappingDto);

        // Assert
        var userRoleMappings = _fixture.Context.UserRoles.ToList();
        userRoleMappings
            .Should()
            .Contain(
                x => x.UserId == userRoleMappingDto.UserId && x.RoleId == userRoleMappingDto.RoleId
            );
    }

    [Fact]
    public async Task QueryActionPolicyDocuments()
    {
        // Arrange
        var actionPolicyDocuments = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(actionPolicyDocuments[0]);
        await store.Upsert(actionPolicyDocuments[1]);

        // Act
        var result = await store.QueryActionPolicyDocuments();

        // Assert
        result.Should().HaveCountGreaterThanOrEqualTo(2);
        result.Should().Contain(x => x.Id == actionPolicyDocuments[0].Id);
        result.Should().Contain(x => x.Id == actionPolicyDocuments[1].Id);
    }

    [Fact]
    public async Task QueryRoles()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);
        await store.Upsert(roles[1]);

        // Act
        var result = await store.QueryRoles();

        // Assert
        result.Should().HaveCountGreaterThanOrEqualTo(2);
        result.Should().Contain(x => x.Id == roles[0].Id);
        result.Should().Contain(x => x.Id == roles[1].Id);
    }

    [Fact]
    public async Task QueryRoleActionPolicyMappings()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var actionPolicyDocuments = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var roleActionPolicyMappings = new[]
        {
            new RoleActionPolicyMappingDto(roles[0].Id, actionPolicyDocuments[0].Id),
            new RoleActionPolicyMappingDto(roles[0].Id, actionPolicyDocuments[1].Id),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);
        await store.Upsert(actionPolicyDocuments[0]);
        await store.Upsert(actionPolicyDocuments[1]);
        await store.Upsert(roleActionPolicyMappings[0]);
        await store.Upsert(roleActionPolicyMappings[1]);

        // Act
        var result = await store.QueryRoleActionPolicyMappings();

        // Assert
        result.Should().HaveCountGreaterThanOrEqualTo(2);
        result
            .Should()
            .Contain(
                x =>
                    x.RoleId == roleActionPolicyMappings[0].RoleId
                    && x.ActionPolicyDocumentId
                        == roleActionPolicyMappings[0].ActionPolicyDocumentId
            );
        result
            .Should()
            .Contain(
                x =>
                    x.RoleId == roleActionPolicyMappings[1].RoleId
                    && x.ActionPolicyDocumentId
                        == roleActionPolicyMappings[1].ActionPolicyDocumentId
            );
    }

    [Fact]
    public async Task QueryUserRoles()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var userRoleMappings = new[]
        {
            new UserRoleMappingDto(Guid.NewGuid().ToString(), roles[0].Id),
            new UserRoleMappingDto(Guid.NewGuid().ToString(), roles[0].Id),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);
        await store.Upsert(userRoleMappings[0]);
        await store.Upsert(userRoleMappings[1]);

        // Act
        var result = await store.QueryUserRoleMappings();

        // Assert
        result.Should().HaveCountGreaterThanOrEqualTo(2);
        result
            .Should()
            .Contain(
                x =>
                    x.UserId == userRoleMappings[0].UserId && x.RoleId == userRoleMappings[0].RoleId
            );
        result
            .Should()
            .Contain(
                x =>
                    x.UserId == userRoleMappings[1].UserId && x.RoleId == userRoleMappings[1].RoleId
            );
    }

    [Fact]
    public async Task GetRole()
    {
        // Arrange
        var roles = new[]
        {
            new RoleDto(Guid.NewGuid(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString()),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(roles[0]);

        // Act
        var result = await store.GetRole(roles[0].Id);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(roles[0].Id);
    }

    [Fact]
    public async Task GetActionPolicyDocument()
    {
        // Arrange
        var actionPolicyDocuments = new[]
        {
            new ActionPolicyDocumentDto(
                Guid.NewGuid(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                new[]
                {
                    new ActionPolicyStatementDto(
                        Guid.NewGuid().ToString(),
                        new[] { "abc" },
                        new[] { "abc" }
                    )
                }
            ),
        };
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );
        await store.Upsert(actionPolicyDocuments[0]);

        // Act
        var result = await store.GetActionPolicyDocument(actionPolicyDocuments[0].Id);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(actionPolicyDocuments[0].Id);
    }

    [Fact]
    public async Task GetRole_NotFound()
    {
        // Arrange
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        var result = await store.GetRole(Guid.NewGuid());

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetActionPolicyDocument_NotFound()
    {
        // Arrange
        var store = new DatabasePermissionStoreAsync(
            _fixture.Context,
            NullLogger<DatabasePermissionStoreAsync>.Instance
        );

        // Act
        var result = await store.GetActionPolicyDocument(Guid.NewGuid());

        // Assert
        result.Should().BeNull();
    }
}
