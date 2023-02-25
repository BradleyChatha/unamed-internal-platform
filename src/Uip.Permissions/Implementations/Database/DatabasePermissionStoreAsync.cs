using Microsoft.EntityFrameworkCore;
using Uip.Permissions.Implementations.Database.Model;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Implementations.Database;

internal class DatabasePermissionStoreAsync : IPermissionStoreAsync
{
    readonly ILogger<DatabasePermissionStoreAsync> _logger;
    readonly PermissionsDbContext _db;

    public DatabasePermissionStoreAsync(
        PermissionsDbContext db,
        ILogger<DatabasePermissionStoreAsync> logger
    )
    {
        _logger = logger;
        _db = db;
    }

    public Task Delete(IEnumerable<ActionPolicyDocumentDto> actionPolicyDocumentDtos)
    {
        var dtoIdStrings = actionPolicyDocumentDtos.Select(x => x.Id.ToString());
        var query = this._db.ActionPolicyDocuments.Where(
            x => dtoIdStrings.Any(dto => dto == x.Id.ToString())
        );
        foreach (var actionPolicyDocumentDb in query)
        {
            this._logger.LogInformation(
                "Deleting action policy document {Id} ({Name})",
                actionPolicyDocumentDb.Id,
                actionPolicyDocumentDb.Name
            );
            this._db.ActionPolicyDocuments.Remove(actionPolicyDocumentDb);
        }

        return this._db.SaveChangesAsync();
    }

    public Task Delete(IEnumerable<RoleDto> roleDtos)
    {
        var dtoIdStrings = roleDtos.Select(x => x.Id.ToString());
        var query = this._db.Roles.Where(x => dtoIdStrings.Any(dto => dto == x.Id.ToString()));
        foreach (var roleDb in query)
        {
            this._logger.LogInformation("Deleting role {Id} ({Name})", roleDb.Id, roleDb.Name);
            this._db.Roles.Remove(roleDb);
        }

        return this._db.SaveChangesAsync();
    }

    public Task Delete(IEnumerable<RoleActionPolicyMappingDto> roleActionPolicyMappingDtos)
    {
        var dtoRoleIdStrings = roleActionPolicyMappingDtos.Select(x => x.RoleId.ToString());
        var dtoActionPolicyDocumentIdStrings = roleActionPolicyMappingDtos.Select(
            x => x.ActionPolicyDocumentId.ToString()
        );
        var query = this._db.RoleActionPolicyDocuments
            .Where(x => dtoRoleIdStrings.Any(dto => dto == x.RoleId.ToString()))
            .Where(
                x =>
                    dtoActionPolicyDocumentIdStrings.Any(
                        dto => dto == x.ActionPolicyDocumentId.ToString()
                    )
            );
        foreach (var mapping in query)
        {
            this._logger.LogInformation(
                "Deleting role action policy mapping {RoleId} ({RoleName}) -> {ActionPolicyDocumentId} ({ActionPolicyDocumentName})",
                mapping.RoleId,
                mapping.Role.Name,
                mapping.ActionPolicyDocumentId,
                mapping.ActionPolicyDocument.Name
            );
            this._db.RoleActionPolicyDocuments.Remove(mapping);
        }

        return this._db.SaveChangesAsync();
    }

    public Task Delete(IEnumerable<UserRoleMappingDto> userRoleMappingDtos)
    {
        var dtoUserIdStrings = userRoleMappingDtos.Select(x => x.UserId.ToString());
        var dtoRoleIdStrings = userRoleMappingDtos.Select(x => x.RoleId.ToString());
        var query = this._db.UserRoles
            .Where(x => dtoUserIdStrings.Any(dto => dto == x.UserId))
            .Where(x => dtoRoleIdStrings.Any(dto => dto == x.RoleId.ToString()));
        foreach (var mapping in query)
        {
            this._logger.LogInformation(
                "Deleting user role mapping {UserId} -> {RoleId} ({RoleName})",
                mapping.UserId,
                mapping.RoleId,
                mapping.Role.Name
            );
            this._db.UserRoles.Remove(mapping);
        }

        return this._db.SaveChangesAsync();
    }

    public Task<ActionPolicyDocumentDto?> GetActionPolicyDocument(Guid id)
    {
        var policyDocumentDb = this._db.ActionPolicyDocuments.FirstOrDefault(x => x.Id == id);
        if (policyDocumentDb == null)
            return Task.FromResult<ActionPolicyDocumentDto?>(null);

        return Task.FromResult<ActionPolicyDocumentDto?>(
            new ActionPolicyDocumentDto(
                policyDocumentDb.Id,
                policyDocumentDb.Name,
                policyDocumentDb.Description,
                policyDocumentDb.Statements,
                null
            )
        );
    }

    public Task<RoleDto?> GetRole(Guid id)
    {
        var roleDb = this._db.Roles.FirstOrDefault(x => x.Id == id);
        if (roleDb == null)
            return Task.FromResult<RoleDto?>(null);

        return Task.FromResult<RoleDto?>(
            new RoleDto(roleDb.Id, roleDb.Name, roleDb.Description, null)
        );
    }

    public Task<IQueryable<ActionPolicyDocumentDto>> QueryActionPolicyDocuments()
    {
        return Task.FromResult(
            this._db.ActionPolicyDocuments.Select(
                x => new ActionPolicyDocumentDto(x.Id, x.Name, x.Description, x.Statements, null)
            )
        );
    }

    public Task<IQueryable<RoleActionPolicyMappingDto>> QueryRoleActionPolicyMappings()
    {
        return Task.FromResult(
            this._db.RoleActionPolicyDocuments.Select(
                x => new RoleActionPolicyMappingDto(x.RoleId, x.ActionPolicyDocumentId, null)
            )
        );
    }

    public Task<IQueryable<RoleDto>> QueryRoles()
    {
        return Task.FromResult(
            this._db.Roles.Select(x => new RoleDto(x.Id, x.Name, x.Description, null))
        );
    }

    public Task<IQueryable<UserRoleMappingDto>> QueryUserRoleMappings()
    {
        return Task.FromResult(
            this._db.UserRoles.Select(x => new UserRoleMappingDto(x.UserId, x.RoleId, null))
        );
    }

    public Task Upsert(ActionPolicyDocumentDto policyDocumentDto)
    {
        var policyDocumentDb = this._db.ActionPolicyDocuments.FirstOrDefault(
            x => x.Id == policyDocumentDto.Id
        );
        if (policyDocumentDb == null)
        {
            this._logger.LogInformation(
                "Creating action policy document {Id} ({Name})",
                policyDocumentDto.Id,
                policyDocumentDto.Name
            );
            policyDocumentDb = new ActionPolicyDocumentDb()
            {
                Id = policyDocumentDto.Id,
                Name = policyDocumentDto.Name,
                Description = policyDocumentDto.Description,
                Statements = policyDocumentDto.Statements,
            };
            this._db.ActionPolicyDocuments.Add(policyDocumentDb);
        }
        else
        {
            this._logger.LogInformation(
                "Updating action policy document {Id} ({Name})",
                policyDocumentDto.Id,
                policyDocumentDto.Name
            );
            policyDocumentDb.Name = policyDocumentDto.Name;
            policyDocumentDb.Description = policyDocumentDto.Description;
            policyDocumentDb.Statements = policyDocumentDto.Statements;
        }

        return this._db.SaveChangesAsync();
    }

    public Task Upsert(RoleDto roleDto)
    {
        var roleDb = this._db.Roles.FirstOrDefault(x => x.Id == roleDto.Id);
        if (roleDb == null)
        {
            this._logger.LogInformation("Creating role {Id} ({Name})", roleDto.Id, roleDto.Name);
            roleDb = new RoleDb()
            {
                Id = roleDto.Id,
                Name = roleDto.Name,
                Description = roleDto.Description,
            };
            this._db.Roles.Add(roleDb);
        }
        else
        {
            this._logger.LogInformation("Updating role {Id} ({Name})", roleDto.Id, roleDto.Name);
            roleDb.Name = roleDto.Name;
            roleDb.Description = roleDto.Description;
        }

        return this._db.SaveChangesAsync();
    }

    public Task Upsert(RoleActionPolicyMappingDto roleActionPolicyMappingDto)
    {
        var mappingDb = this._db.RoleActionPolicyDocuments.FirstOrDefault(
            x =>
                x.RoleId == roleActionPolicyMappingDto.RoleId
                && x.ActionPolicyDocumentId == roleActionPolicyMappingDto.ActionPolicyDocumentId
        );
        if (mappingDb == null)
        {
            this._logger.LogInformation(
                "Creating role action policy mapping {RoleId} -> {ActionPolicyDocumentId}",
                roleActionPolicyMappingDto.RoleId,
                roleActionPolicyMappingDto.ActionPolicyDocumentId
            );
            mappingDb = new RoleActionPolicyDocumentMappingDb()
            {
                RoleId = roleActionPolicyMappingDto.RoleId,
                ActionPolicyDocumentId = roleActionPolicyMappingDto.ActionPolicyDocumentId,
            };
            this._db.RoleActionPolicyDocuments.Add(mappingDb);

            return this._db.SaveChangesAsync();
        }

        return Task.CompletedTask;
    }

    public Task Upsert(UserRoleMappingDto userRoleMappingDto)
    {
        var mappingDb = this._db.UserRoles.FirstOrDefault(
            x => x.UserId == userRoleMappingDto.UserId && x.RoleId == userRoleMappingDto.RoleId
        );
        if (mappingDb == null)
        {
            this._logger.LogInformation(
                "Creating user role mapping {UserId} -> {RoleId}",
                userRoleMappingDto.UserId,
                userRoleMappingDto.RoleId
            );
            mappingDb = new UserRoleMappingDb()
            {
                UserId = userRoleMappingDto.UserId,
                RoleId = userRoleMappingDto.RoleId,
            };
            this._db.UserRoles.Add(mappingDb);

            return this._db.SaveChangesAsync();
        }

        return Task.CompletedTask;
    }
}
