using System.Security.Claims;
using AutoMapper;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Uip.Permissions.Interfaces;

namespace Uip.Permissions.Services;

[Authorize]
internal class PermissionsService : Permissions.PermissionsBase
{
    readonly ILogger<PermissionsService> _logger;
    readonly IPermissionStoreAsync _permissionStore;
    readonly IPermissionCheckerAsync _permissionChecker;
    readonly IMapper _mapper;

    public PermissionsService(
        ILogger<PermissionsService> logger,
        IPermissionStoreAsync permissionStore,
        IPermissionCheckerAsync permissionChecker,
        IMapper mapper
    )
    {
        _logger = logger;
        _permissionStore = permissionStore;
        _permissionChecker = permissionChecker;
        _mapper = mapper;
    }

    override public async Task<UpsertRoleResponse> UpsertRole(
        UpsertRoleRequest request,
        ServerCallContext context
    )
    {
        // Authorise
        var userId = context.GetHttpContext().User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        var canUpsert = await _permissionChecker.UserCanPerformAction(
            userId,
            "permissions:UpsertRole",
            new Dictionary<string, string> { { "Name", request.Role.Name } }
        );
        if (!canUpsert)
        {
            return new UpsertRoleResponse
            {
                Response = ServiceHelpers.PermissionDenied(
                    userId,
                    "permissions:UpsertRole",
                    "Role",
                    request.Role.Name
                )
            };
        }

        // Act
        var role = _mapper.Map<RoleDto>(request.Role) with
        {
            Id = Guid.Parse(request.Role.IdGuid)
        };
        await _permissionStore.Upsert(role);

        // Finalise
        return new UpsertRoleResponse { Response = { Success = true } };
    }

    public override async Task<GetRoleResponse> GetRole(
        GetRoleRequest request,
        ServerCallContext context
    )
    {
        // Pre-auth read
        var roleGuid = Guid.Parse(request.IdGuid);
        var role = await _permissionStore.GetRole(roleGuid);
        if (role == null)
        {
            return new GetRoleResponse
            {
                Response = ServiceHelpers.NotFound("Role", request.IdGuid)
            };
        }

        // Authorise
        var userId = context.GetHttpContext().User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        var canGet = await _permissionChecker.UserCanPerformAction(
            userId,
            "permissions:GetRole",
            new Dictionary<string, string> { { "Name", role.Name }, { "Id", role.Id.ToString() } }
        );

        if (!canGet)
        {
            return new GetRoleResponse
            {
                Response = ServiceHelpers.PermissionDenied(
                    userId,
                    "permissions:GetRole",
                    "Role",
                    request.IdGuid
                )
            };
        }

        // Finalise
        return new GetRoleResponse
        {
            Response = { Success = true },
            Role = _mapper.Map<GrpcRoleDto>(role)
        };
    }

    public override async Task<ListRolesResponse> ListRoles(
        ListRolesRequest request,
        ServerCallContext context
    )
    {
        // Authorise
        var userId = context.GetHttpContext().User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        var canList = await _permissionChecker.UserCanPerformAction(
            userId,
            "permissions:ListRoles",
            new Dictionary<string, string>()
        );
        if (!canList)
        {
            return new ListRolesResponse
            {
                Response = ServiceHelpers.PermissionDenied(
                    userId,
                    "permissions:ListRoles",
                    "Role",
                    ""
                )
            };
        }

        // Act
        // TODO: Pagination
        var roles = _permissionStore.ListRoles();

        // Finalise
        return new ListRolesResponse
        {
            Response = { Success = true },
            Roles = { _mapper.Map<IEnumerable<GrpcRoleDto>>(roles) }
        };
    }

    public override async Task<DeleteRoleResponse> DeleteRole(
        DeleteRoleRequest request,
        ServerCallContext context
    )
    {
        // Pre-auth read
        var roleGuid = Guid.Parse(request.IdGuid);
        var role = await _permissionStore.GetRole(roleGuid);
        if (role == null)
        {
            return new DeleteRoleResponse
            {
                Response = { Success = true, Message = "Success - Role not found" }
            };
        }

        // Authorise
        var userId = context.GetHttpContext().User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        var canDelete = await _permissionChecker.UserCanPerformAction(
            userId,
            "permissions:DeleteRole",
            new Dictionary<string, string> { { "Name", role.Name }, { "Id", role.Id.ToString() } }
        );
        if (!canDelete)
        {
            return new DeleteRoleResponse
            {
                Response = ServiceHelpers.PermissionDenied(
                    userId,
                    "permissions:DeleteRole",
                    "Role",
                    request.IdGuid
                )
            };
        }

        // Act
        await _permissionStore.Delete(new[] { role! });

        // Finalise
        return new DeleteRoleResponse { Response = { Success = true } };
    }
}
