namespace Uip.Permissions.Interfaces;

internal interface IPermissionStoreAsync
{
    public Task Upsert(ActionPolicyDocumentDto policyDocumentDto);
    public Task Upsert(RoleDto roleDto);
    public Task Upsert(RoleActionPolicyMappingDto roleActionPolicyMappingDto);
    public Task Upsert(UserRoleMappingDto userRoleMappingDto);

    public Task Delete(IEnumerable<ActionPolicyDocumentDto> actionPolicyDocumentDtos);
    public Task Delete(IEnumerable<RoleDto> roleDtos);
    public Task Delete(IEnumerable<RoleActionPolicyMappingDto> roleActionPolicyMappingDtos);
    public Task Delete(IEnumerable<UserRoleMappingDto> userRoleMappingDtos);

    public Task<ActionPolicyDocumentDto?> GetActionPolicyDocument(Guid id);
    public Task<RoleDto?> GetRole(Guid id);

    public IAsyncEnumerable<RoleDto> ListRoles();
    public IAsyncEnumerable<ActionPolicyDocumentDto> ListActionPolicyDocuments();
    public IAsyncEnumerable<RoleDto> ListRolesForUser(string userId);
    public IAsyncEnumerable<ActionPolicyDocumentDto> ListActionPolicyDocumentsForRole(RoleDto role);
}
