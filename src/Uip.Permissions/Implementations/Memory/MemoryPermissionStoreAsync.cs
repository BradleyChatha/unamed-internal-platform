using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Implementations.Memory;

// Mainly used for tests and development; not for any real world usage.
internal sealed class MemoryPermissionStoreAsync : IPermissionStoreAsync
{
    readonly List<ActionPolicyDocumentDto> _actionPolicyDocuments;
    readonly List<RoleDto> _roles;
    readonly List<RoleActionPolicyMappingDto> _roleActionPolicyMappings;
    readonly List<UserRoleMappingDto> _userRoleMappings;

    public MemoryPermissionStoreAsync()
    {
        this._actionPolicyDocuments = new List<ActionPolicyDocumentDto>();
        this._roles = new List<RoleDto>();
        this._roleActionPolicyMappings = new List<RoleActionPolicyMappingDto>();
        this._userRoleMappings = new List<UserRoleMappingDto>();
    }

    public Task Delete(IEnumerable<ActionPolicyDocumentDto> actionPolicyDocumentDtos)
    {
        foreach (var value in actionPolicyDocumentDtos)
            this._actionPolicyDocuments.Remove(value);

        return Task.CompletedTask;
    }

    public Task Delete(IEnumerable<RoleDto> roleDtos)
    {
        foreach (var value in roleDtos)
            this._roles.Remove(value);

        return Task.CompletedTask;
    }

    public Task Delete(IEnumerable<RoleActionPolicyMappingDto> roleActionPolicyMappingDtos)
    {
        foreach (var value in roleActionPolicyMappingDtos)
            this._roleActionPolicyMappings.Remove(value);

        return Task.CompletedTask;
    }

    public Task Delete(IEnumerable<UserRoleMappingDto> userRoleMappingDtos)
    {
        foreach (var value in userRoleMappingDtos)
            this._userRoleMappings.Remove(value);

        return Task.CompletedTask;
    }

    public Task<ActionPolicyDocumentDto?> GetActionPolicyDocument(Guid id)
    {
        return Task.FromResult(this._actionPolicyDocuments.FirstOrDefault(v => v.Id == id));
    }

    public Task<RoleDto?> GetRole(Guid id)
    {
        return Task.FromResult(this._roles.FirstOrDefault(v => v.Id == id));
    }

    public Task<IQueryable<ActionPolicyDocumentDto>> QueryActionPolicyDocuments()
    {
        return Task.FromResult(this._actionPolicyDocuments.AsQueryable());
    }

    public Task<IQueryable<RoleActionPolicyMappingDto>> QueryRoleActionPolicyMappings()
    {
        return Task.FromResult(this._roleActionPolicyMappings.AsQueryable());
    }

    public Task<IQueryable<RoleDto>> QueryRoles()
    {
        return Task.FromResult(this._roles.AsQueryable());
    }

    public Task<IQueryable<UserRoleMappingDto>> QueryUserRoleMappings()
    {
        return Task.FromResult(this._userRoleMappings.AsQueryable());
    }

    public Task Upsert(ActionPolicyDocumentDto policyDocumentDto)
    {
        var index = this._actionPolicyDocuments.FindIndex(v => v.Id == policyDocumentDto.Id);
        if (index >= 0)
            this._actionPolicyDocuments[index] = policyDocumentDto;
        else
            this._actionPolicyDocuments.Add(policyDocumentDto);

        return Task.CompletedTask;
    }

    public Task Upsert(RoleDto roleDto)
    {
        var index = this._roles.FindIndex(v => v.Id == roleDto.Id);
        if (index >= 0)
            this._roles[index] = roleDto;
        else
            this._roles.Add(roleDto);

        return Task.CompletedTask;
    }

    public Task Upsert(RoleActionPolicyMappingDto roleActionPolicyMappingDto)
    {
        var index = this._roleActionPolicyMappings.FindIndex(
            v =>
                v.RoleId == roleActionPolicyMappingDto.RoleId
                && v.ActionPolicyDocumentId == roleActionPolicyMappingDto.ActionPolicyDocumentId
        );
        if (index >= 0)
            this._roleActionPolicyMappings[index] = roleActionPolicyMappingDto;
        else
            this._roleActionPolicyMappings.Add(roleActionPolicyMappingDto);

        return Task.CompletedTask;
    }

    public Task Upsert(UserRoleMappingDto userRoleMappingDto)
    {
        var index = this._userRoleMappings.FindIndex(
            v => v.UserId == userRoleMappingDto.UserId && v.RoleId == userRoleMappingDto.RoleId
        );
        if (index >= 0)
            this._userRoleMappings[index] = userRoleMappingDto;
        else
            this._userRoleMappings.Add(userRoleMappingDto);

        return Task.CompletedTask;
    }
}
