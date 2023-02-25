namespace Uip.Permissions.Interfaces;

internal interface IPermissionStoreAsync
{
    public Task Upsert(ActionPolicyDocumentDto policyDocumentDto);
    public Task Upsert(RoleDto roleDto);
    public Task Upsert(RoleActionPolicyMappingDto roleActionPolicyMappingDto);
    public Task Upsert(UserRoleMappingDto userRoleMappingDto);

    public Task<IQueryable<ActionPolicyDocumentDto>> QueryActionPolicyDocuments();
    public Task<IQueryable<RoleDto>> QueryRoles();
    public Task<IQueryable<RoleActionPolicyMappingDto>> QueryRoleActionPolicyMappings();
    public Task<IQueryable<UserRoleMappingDto>> QueryUserRoleMappings();

    public Task Delete(IEnumerable<ActionPolicyDocumentDto> actionPolicyDocumentDtos);
    public Task Delete(IEnumerable<RoleDto> roleDtos);
    public Task Delete(IEnumerable<RoleActionPolicyMappingDto> roleActionPolicyMappingDtos);
    public Task Delete(IEnumerable<UserRoleMappingDto> userRoleMappingDtos);

    public Task<ActionPolicyDocumentDto?> GetActionPolicyDocument(Guid id);
    public Task<RoleDto?> GetRole(Guid id);
}
