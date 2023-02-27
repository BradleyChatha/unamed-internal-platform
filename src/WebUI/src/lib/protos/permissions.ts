/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "permissions";

export interface GenericResponse {
  Success: boolean;
  ErrorId: string;
  Message: string;
}

export interface GrpcRoleDto {
  IdGuid: string;
  Name: string;
  Description: string;
}

export interface GrpcActionPolicyStatementDto {
  Name: string;
  Actions: string[];
  KeyValueMatchStrings: string[];
}

export interface GrpcActionPolicyDocumentDto {
  IdGuid: string;
  Name: string;
  Description: string;
  Statements: GrpcActionPolicyStatementDto[];
}

export interface UpsertRoleRequest {
  Role: GrpcRoleDto | undefined;
}

export interface UpsertRoleResponse {
  Response: GenericResponse | undefined;
}

export interface GetRoleRequest {
  IdGuid: string;
}

export interface GetRoleResponse {
  Response: GenericResponse | undefined;
  Role: GrpcRoleDto | undefined;
}

export interface ListRolesRequest {
}

export interface ListRolesResponse {
  Response: GenericResponse | undefined;
  Roles: GrpcRoleDto[];
}

export interface DeleteRoleRequest {
  IdGuid: string;
}

export interface DeleteRoleResponse {
  Response: GenericResponse | undefined;
}

export interface UpsertActionPolicyDocumentRequest {
  ActionPolicyDocument: GrpcActionPolicyDocumentDto | undefined;
}

export interface UpsertActionPolicyDocumentResponse {
  Response: GenericResponse | undefined;
}

export interface GetActionPolicyDocumentRequest {
  IdGuid: string;
}

export interface GetActionPolicyDocumentResponse {
  Response: GenericResponse | undefined;
  ActionPolicyDocument: GrpcActionPolicyDocumentDto | undefined;
}

export interface ListActionPolicyDocumentsRequest {
}

export interface ListActionPolicyDocumentsResponse {
  Response: GenericResponse | undefined;
  ActionPolicyDocuments: GrpcActionPolicyDocumentDto[];
}

export interface DeleteActionPolicyDocumentRequest {
  IdGuid: string;
}

export interface DeleteActionPolicyDocumentResponse {
  Response: GenericResponse | undefined;
}

export interface AttachActionPolicyDocumentToRoleRequest {
  ActionPolicyDocumentIdGuid: string;
  RoleIdGuid: string;
}

export interface AttachActionPolicyDocumentToRoleResponse {
  Response: GenericResponse | undefined;
}

export interface DetachActionPolicyDocumentFromRoleRequest {
  ActionPolicyDocumentIdGuid: string;
  RoleIdGuid: string;
}

export interface DetachActionPolicyDocumentFromRoleResponse {
  Response: GenericResponse | undefined;
}

export interface ListActionPolicyDocumentsForRoleRequest {
  RoleIdGuid: string;
}

export interface ListActionPolicyDocumentsForRoleResponse {
  Response: GenericResponse | undefined;
  ActionPolicyDocuments: GrpcActionPolicyDocumentDto[];
}

export interface AttachRoleToUserRequest {
  RoleIdGuid: string;
  UserIdGuid: string;
}

export interface AttachRoleToUserResponse {
  Response: GenericResponse | undefined;
}

export interface DetachRoleFromUserRequest {
  RoleIdGuid: string;
  UserIdGuid: string;
}

export interface DetachRoleFromUserResponse {
  Response: GenericResponse | undefined;
}

export interface ListRolesForUserRequest {
  UserIdGuid: string;
}

export interface ListRolesForUserResponse {
  Response: GenericResponse | undefined;
  Roles: GrpcRoleDto[];
}

export interface UserCanPerformActionRequest {
  UserIdGuid: string;
  Action: string;
  ResourceKeyValues: { [key: string]: string };
}

export interface UserCanPerformActionRequest_ResourceKeyValuesEntry {
  key: string;
  value: string;
}

export interface UserCanPerformActionResponse {
  Response: GenericResponse | undefined;
  CanPerformAction: boolean;
}

function createBaseGenericResponse(): GenericResponse {
  return { Success: false, ErrorId: "", Message: "" };
}

export const GenericResponse = {
  encode(message: GenericResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Success === true) {
      writer.uint32(8).bool(message.Success);
    }
    if (message.ErrorId !== "") {
      writer.uint32(18).string(message.ErrorId);
    }
    if (message.Message !== "") {
      writer.uint32(26).string(message.Message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenericResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenericResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Success = reader.bool();
          break;
        case 2:
          message.ErrorId = reader.string();
          break;
        case 3:
          message.Message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenericResponse {
    return {
      Success: isSet(object.Success) ? Boolean(object.Success) : false,
      ErrorId: isSet(object.ErrorId) ? String(object.ErrorId) : "",
      Message: isSet(object.Message) ? String(object.Message) : "",
    };
  },

  toJSON(message: GenericResponse): unknown {
    const obj: any = {};
    message.Success !== undefined && (obj.Success = message.Success);
    message.ErrorId !== undefined && (obj.ErrorId = message.ErrorId);
    message.Message !== undefined && (obj.Message = message.Message);
    return obj;
  },

  create<I extends Exact<DeepPartial<GenericResponse>, I>>(base?: I): GenericResponse {
    return GenericResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GenericResponse>, I>>(object: I): GenericResponse {
    const message = createBaseGenericResponse();
    message.Success = object.Success ?? false;
    message.ErrorId = object.ErrorId ?? "";
    message.Message = object.Message ?? "";
    return message;
  },
};

function createBaseGrpcRoleDto(): GrpcRoleDto {
  return { IdGuid: "", Name: "", Description: "" };
}

export const GrpcRoleDto = {
  encode(message: GrpcRoleDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.IdGuid !== "") {
      writer.uint32(10).string(message.IdGuid);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Description !== "") {
      writer.uint32(26).string(message.Description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrpcRoleDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrpcRoleDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.IdGuid = reader.string();
          break;
        case 2:
          message.Name = reader.string();
          break;
        case 3:
          message.Description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrpcRoleDto {
    return {
      IdGuid: isSet(object.IdGuid) ? String(object.IdGuid) : "",
      Name: isSet(object.Name) ? String(object.Name) : "",
      Description: isSet(object.Description) ? String(object.Description) : "",
    };
  },

  toJSON(message: GrpcRoleDto): unknown {
    const obj: any = {};
    message.IdGuid !== undefined && (obj.IdGuid = message.IdGuid);
    message.Name !== undefined && (obj.Name = message.Name);
    message.Description !== undefined && (obj.Description = message.Description);
    return obj;
  },

  create<I extends Exact<DeepPartial<GrpcRoleDto>, I>>(base?: I): GrpcRoleDto {
    return GrpcRoleDto.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GrpcRoleDto>, I>>(object: I): GrpcRoleDto {
    const message = createBaseGrpcRoleDto();
    message.IdGuid = object.IdGuid ?? "";
    message.Name = object.Name ?? "";
    message.Description = object.Description ?? "";
    return message;
  },
};

function createBaseGrpcActionPolicyStatementDto(): GrpcActionPolicyStatementDto {
  return { Name: "", Actions: [], KeyValueMatchStrings: [] };
}

export const GrpcActionPolicyStatementDto = {
  encode(message: GrpcActionPolicyStatementDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Name !== "") {
      writer.uint32(10).string(message.Name);
    }
    for (const v of message.Actions) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.KeyValueMatchStrings) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrpcActionPolicyStatementDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrpcActionPolicyStatementDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Name = reader.string();
          break;
        case 2:
          message.Actions.push(reader.string());
          break;
        case 3:
          message.KeyValueMatchStrings.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrpcActionPolicyStatementDto {
    return {
      Name: isSet(object.Name) ? String(object.Name) : "",
      Actions: Array.isArray(object?.Actions) ? object.Actions.map((e: any) => String(e)) : [],
      KeyValueMatchStrings: Array.isArray(object?.KeyValueMatchStrings)
        ? object.KeyValueMatchStrings.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GrpcActionPolicyStatementDto): unknown {
    const obj: any = {};
    message.Name !== undefined && (obj.Name = message.Name);
    if (message.Actions) {
      obj.Actions = message.Actions.map((e) => e);
    } else {
      obj.Actions = [];
    }
    if (message.KeyValueMatchStrings) {
      obj.KeyValueMatchStrings = message.KeyValueMatchStrings.map((e) => e);
    } else {
      obj.KeyValueMatchStrings = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GrpcActionPolicyStatementDto>, I>>(base?: I): GrpcActionPolicyStatementDto {
    return GrpcActionPolicyStatementDto.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GrpcActionPolicyStatementDto>, I>>(object: I): GrpcActionPolicyStatementDto {
    const message = createBaseGrpcActionPolicyStatementDto();
    message.Name = object.Name ?? "";
    message.Actions = object.Actions?.map((e) => e) || [];
    message.KeyValueMatchStrings = object.KeyValueMatchStrings?.map((e) => e) || [];
    return message;
  },
};

function createBaseGrpcActionPolicyDocumentDto(): GrpcActionPolicyDocumentDto {
  return { IdGuid: "", Name: "", Description: "", Statements: [] };
}

export const GrpcActionPolicyDocumentDto = {
  encode(message: GrpcActionPolicyDocumentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.IdGuid !== "") {
      writer.uint32(10).string(message.IdGuid);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Description !== "") {
      writer.uint32(26).string(message.Description);
    }
    for (const v of message.Statements) {
      GrpcActionPolicyStatementDto.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrpcActionPolicyDocumentDto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrpcActionPolicyDocumentDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.IdGuid = reader.string();
          break;
        case 2:
          message.Name = reader.string();
          break;
        case 3:
          message.Description = reader.string();
          break;
        case 4:
          message.Statements.push(GrpcActionPolicyStatementDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrpcActionPolicyDocumentDto {
    return {
      IdGuid: isSet(object.IdGuid) ? String(object.IdGuid) : "",
      Name: isSet(object.Name) ? String(object.Name) : "",
      Description: isSet(object.Description) ? String(object.Description) : "",
      Statements: Array.isArray(object?.Statements)
        ? object.Statements.map((e: any) => GrpcActionPolicyStatementDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GrpcActionPolicyDocumentDto): unknown {
    const obj: any = {};
    message.IdGuid !== undefined && (obj.IdGuid = message.IdGuid);
    message.Name !== undefined && (obj.Name = message.Name);
    message.Description !== undefined && (obj.Description = message.Description);
    if (message.Statements) {
      obj.Statements = message.Statements.map((e) => e ? GrpcActionPolicyStatementDto.toJSON(e) : undefined);
    } else {
      obj.Statements = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GrpcActionPolicyDocumentDto>, I>>(base?: I): GrpcActionPolicyDocumentDto {
    return GrpcActionPolicyDocumentDto.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GrpcActionPolicyDocumentDto>, I>>(object: I): GrpcActionPolicyDocumentDto {
    const message = createBaseGrpcActionPolicyDocumentDto();
    message.IdGuid = object.IdGuid ?? "";
    message.Name = object.Name ?? "";
    message.Description = object.Description ?? "";
    message.Statements = object.Statements?.map((e) => GrpcActionPolicyStatementDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpsertRoleRequest(): UpsertRoleRequest {
  return { Role: undefined };
}

export const UpsertRoleRequest = {
  encode(message: UpsertRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Role !== undefined) {
      GrpcRoleDto.encode(message.Role, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpsertRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpsertRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Role = GrpcRoleDto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpsertRoleRequest {
    return { Role: isSet(object.Role) ? GrpcRoleDto.fromJSON(object.Role) : undefined };
  },

  toJSON(message: UpsertRoleRequest): unknown {
    const obj: any = {};
    message.Role !== undefined && (obj.Role = message.Role ? GrpcRoleDto.toJSON(message.Role) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpsertRoleRequest>, I>>(base?: I): UpsertRoleRequest {
    return UpsertRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpsertRoleRequest>, I>>(object: I): UpsertRoleRequest {
    const message = createBaseUpsertRoleRequest();
    message.Role = (object.Role !== undefined && object.Role !== null)
      ? GrpcRoleDto.fromPartial(object.Role)
      : undefined;
    return message;
  },
};

function createBaseUpsertRoleResponse(): UpsertRoleResponse {
  return { Response: undefined };
}

export const UpsertRoleResponse = {
  encode(message: UpsertRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpsertRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpsertRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpsertRoleResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: UpsertRoleResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpsertRoleResponse>, I>>(base?: I): UpsertRoleResponse {
    return UpsertRoleResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpsertRoleResponse>, I>>(object: I): UpsertRoleResponse {
    const message = createBaseUpsertRoleResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseGetRoleRequest(): GetRoleRequest {
  return { IdGuid: "" };
}

export const GetRoleRequest = {
  encode(message: GetRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.IdGuid !== "") {
      writer.uint32(10).string(message.IdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.IdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRoleRequest {
    return { IdGuid: isSet(object.IdGuid) ? String(object.IdGuid) : "" };
  },

  toJSON(message: GetRoleRequest): unknown {
    const obj: any = {};
    message.IdGuid !== undefined && (obj.IdGuid = message.IdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetRoleRequest>, I>>(base?: I): GetRoleRequest {
    return GetRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetRoleRequest>, I>>(object: I): GetRoleRequest {
    const message = createBaseGetRoleRequest();
    message.IdGuid = object.IdGuid ?? "";
    return message;
  },
};

function createBaseGetRoleResponse(): GetRoleResponse {
  return { Response: undefined, Role: undefined };
}

export const GetRoleResponse = {
  encode(message: GetRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    if (message.Role !== undefined) {
      GrpcRoleDto.encode(message.Role, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.Role = GrpcRoleDto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRoleResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      Role: isSet(object.Role) ? GrpcRoleDto.fromJSON(object.Role) : undefined,
    };
  },

  toJSON(message: GetRoleResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    message.Role !== undefined && (obj.Role = message.Role ? GrpcRoleDto.toJSON(message.Role) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetRoleResponse>, I>>(base?: I): GetRoleResponse {
    return GetRoleResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetRoleResponse>, I>>(object: I): GetRoleResponse {
    const message = createBaseGetRoleResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.Role = (object.Role !== undefined && object.Role !== null)
      ? GrpcRoleDto.fromPartial(object.Role)
      : undefined;
    return message;
  },
};

function createBaseListRolesRequest(): ListRolesRequest {
  return {};
}

export const ListRolesRequest = {
  encode(_: ListRolesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ListRolesRequest {
    return {};
  },

  toJSON(_: ListRolesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesRequest>, I>>(base?: I): ListRolesRequest {
    return ListRolesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListRolesRequest>, I>>(_: I): ListRolesRequest {
    const message = createBaseListRolesRequest();
    return message;
  },
};

function createBaseListRolesResponse(): ListRolesResponse {
  return { Response: undefined, Roles: [] };
}

export const ListRolesResponse = {
  encode(message: ListRolesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.Roles) {
      GrpcRoleDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.Roles.push(GrpcRoleDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRolesResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      Roles: Array.isArray(object?.Roles) ? object.Roles.map((e: any) => GrpcRoleDto.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListRolesResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    if (message.Roles) {
      obj.Roles = message.Roles.map((e) => e ? GrpcRoleDto.toJSON(e) : undefined);
    } else {
      obj.Roles = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesResponse>, I>>(base?: I): ListRolesResponse {
    return ListRolesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListRolesResponse>, I>>(object: I): ListRolesResponse {
    const message = createBaseListRolesResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.Roles = object.Roles?.map((e) => GrpcRoleDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDeleteRoleRequest(): DeleteRoleRequest {
  return { IdGuid: "" };
}

export const DeleteRoleRequest = {
  encode(message: DeleteRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.IdGuid !== "") {
      writer.uint32(10).string(message.IdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.IdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRoleRequest {
    return { IdGuid: isSet(object.IdGuid) ? String(object.IdGuid) : "" };
  },

  toJSON(message: DeleteRoleRequest): unknown {
    const obj: any = {};
    message.IdGuid !== undefined && (obj.IdGuid = message.IdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(base?: I): DeleteRoleRequest {
    return DeleteRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRoleRequest>, I>>(object: I): DeleteRoleRequest {
    const message = createBaseDeleteRoleRequest();
    message.IdGuid = object.IdGuid ?? "";
    return message;
  },
};

function createBaseDeleteRoleResponse(): DeleteRoleResponse {
  return { Response: undefined };
}

export const DeleteRoleResponse = {
  encode(message: DeleteRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRoleResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: DeleteRoleResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteRoleResponse>, I>>(base?: I): DeleteRoleResponse {
    return DeleteRoleResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRoleResponse>, I>>(object: I): DeleteRoleResponse {
    const message = createBaseDeleteRoleResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseUpsertActionPolicyDocumentRequest(): UpsertActionPolicyDocumentRequest {
  return { ActionPolicyDocument: undefined };
}

export const UpsertActionPolicyDocumentRequest = {
  encode(message: UpsertActionPolicyDocumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ActionPolicyDocument !== undefined) {
      GrpcActionPolicyDocumentDto.encode(message.ActionPolicyDocument, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpsertActionPolicyDocumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpsertActionPolicyDocumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ActionPolicyDocument = GrpcActionPolicyDocumentDto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpsertActionPolicyDocumentRequest {
    return {
      ActionPolicyDocument: isSet(object.ActionPolicyDocument)
        ? GrpcActionPolicyDocumentDto.fromJSON(object.ActionPolicyDocument)
        : undefined,
    };
  },

  toJSON(message: UpsertActionPolicyDocumentRequest): unknown {
    const obj: any = {};
    message.ActionPolicyDocument !== undefined && (obj.ActionPolicyDocument = message.ActionPolicyDocument
      ? GrpcActionPolicyDocumentDto.toJSON(message.ActionPolicyDocument)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpsertActionPolicyDocumentRequest>, I>>(
    base?: I,
  ): UpsertActionPolicyDocumentRequest {
    return UpsertActionPolicyDocumentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpsertActionPolicyDocumentRequest>, I>>(
    object: I,
  ): UpsertActionPolicyDocumentRequest {
    const message = createBaseUpsertActionPolicyDocumentRequest();
    message.ActionPolicyDocument = (object.ActionPolicyDocument !== undefined && object.ActionPolicyDocument !== null)
      ? GrpcActionPolicyDocumentDto.fromPartial(object.ActionPolicyDocument)
      : undefined;
    return message;
  },
};

function createBaseUpsertActionPolicyDocumentResponse(): UpsertActionPolicyDocumentResponse {
  return { Response: undefined };
}

export const UpsertActionPolicyDocumentResponse = {
  encode(message: UpsertActionPolicyDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpsertActionPolicyDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpsertActionPolicyDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpsertActionPolicyDocumentResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: UpsertActionPolicyDocumentResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpsertActionPolicyDocumentResponse>, I>>(
    base?: I,
  ): UpsertActionPolicyDocumentResponse {
    return UpsertActionPolicyDocumentResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpsertActionPolicyDocumentResponse>, I>>(
    object: I,
  ): UpsertActionPolicyDocumentResponse {
    const message = createBaseUpsertActionPolicyDocumentResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseGetActionPolicyDocumentRequest(): GetActionPolicyDocumentRequest {
  return { IdGuid: "" };
}

export const GetActionPolicyDocumentRequest = {
  encode(message: GetActionPolicyDocumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.IdGuid !== "") {
      writer.uint32(10).string(message.IdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActionPolicyDocumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActionPolicyDocumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.IdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetActionPolicyDocumentRequest {
    return { IdGuid: isSet(object.IdGuid) ? String(object.IdGuid) : "" };
  },

  toJSON(message: GetActionPolicyDocumentRequest): unknown {
    const obj: any = {};
    message.IdGuid !== undefined && (obj.IdGuid = message.IdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetActionPolicyDocumentRequest>, I>>(base?: I): GetActionPolicyDocumentRequest {
    return GetActionPolicyDocumentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetActionPolicyDocumentRequest>, I>>(
    object: I,
  ): GetActionPolicyDocumentRequest {
    const message = createBaseGetActionPolicyDocumentRequest();
    message.IdGuid = object.IdGuid ?? "";
    return message;
  },
};

function createBaseGetActionPolicyDocumentResponse(): GetActionPolicyDocumentResponse {
  return { Response: undefined, ActionPolicyDocument: undefined };
}

export const GetActionPolicyDocumentResponse = {
  encode(message: GetActionPolicyDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    if (message.ActionPolicyDocument !== undefined) {
      GrpcActionPolicyDocumentDto.encode(message.ActionPolicyDocument, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActionPolicyDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActionPolicyDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.ActionPolicyDocument = GrpcActionPolicyDocumentDto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetActionPolicyDocumentResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      ActionPolicyDocument: isSet(object.ActionPolicyDocument)
        ? GrpcActionPolicyDocumentDto.fromJSON(object.ActionPolicyDocument)
        : undefined,
    };
  },

  toJSON(message: GetActionPolicyDocumentResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    message.ActionPolicyDocument !== undefined && (obj.ActionPolicyDocument = message.ActionPolicyDocument
      ? GrpcActionPolicyDocumentDto.toJSON(message.ActionPolicyDocument)
      : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetActionPolicyDocumentResponse>, I>>(base?: I): GetActionPolicyDocumentResponse {
    return GetActionPolicyDocumentResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetActionPolicyDocumentResponse>, I>>(
    object: I,
  ): GetActionPolicyDocumentResponse {
    const message = createBaseGetActionPolicyDocumentResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.ActionPolicyDocument = (object.ActionPolicyDocument !== undefined && object.ActionPolicyDocument !== null)
      ? GrpcActionPolicyDocumentDto.fromPartial(object.ActionPolicyDocument)
      : undefined;
    return message;
  },
};

function createBaseListActionPolicyDocumentsRequest(): ListActionPolicyDocumentsRequest {
  return {};
}

export const ListActionPolicyDocumentsRequest = {
  encode(_: ListActionPolicyDocumentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListActionPolicyDocumentsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListActionPolicyDocumentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ListActionPolicyDocumentsRequest {
    return {};
  },

  toJSON(_: ListActionPolicyDocumentsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ListActionPolicyDocumentsRequest>, I>>(
    base?: I,
  ): ListActionPolicyDocumentsRequest {
    return ListActionPolicyDocumentsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListActionPolicyDocumentsRequest>, I>>(
    _: I,
  ): ListActionPolicyDocumentsRequest {
    const message = createBaseListActionPolicyDocumentsRequest();
    return message;
  },
};

function createBaseListActionPolicyDocumentsResponse(): ListActionPolicyDocumentsResponse {
  return { Response: undefined, ActionPolicyDocuments: [] };
}

export const ListActionPolicyDocumentsResponse = {
  encode(message: ListActionPolicyDocumentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ActionPolicyDocuments) {
      GrpcActionPolicyDocumentDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListActionPolicyDocumentsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListActionPolicyDocumentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.ActionPolicyDocuments.push(GrpcActionPolicyDocumentDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListActionPolicyDocumentsResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      ActionPolicyDocuments: Array.isArray(object?.ActionPolicyDocuments)
        ? object.ActionPolicyDocuments.map((e: any) => GrpcActionPolicyDocumentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListActionPolicyDocumentsResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    if (message.ActionPolicyDocuments) {
      obj.ActionPolicyDocuments = message.ActionPolicyDocuments.map((e) =>
        e ? GrpcActionPolicyDocumentDto.toJSON(e) : undefined
      );
    } else {
      obj.ActionPolicyDocuments = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListActionPolicyDocumentsResponse>, I>>(
    base?: I,
  ): ListActionPolicyDocumentsResponse {
    return ListActionPolicyDocumentsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListActionPolicyDocumentsResponse>, I>>(
    object: I,
  ): ListActionPolicyDocumentsResponse {
    const message = createBaseListActionPolicyDocumentsResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.ActionPolicyDocuments =
      object.ActionPolicyDocuments?.map((e) => GrpcActionPolicyDocumentDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDeleteActionPolicyDocumentRequest(): DeleteActionPolicyDocumentRequest {
  return { IdGuid: "" };
}

export const DeleteActionPolicyDocumentRequest = {
  encode(message: DeleteActionPolicyDocumentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.IdGuid !== "") {
      writer.uint32(10).string(message.IdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteActionPolicyDocumentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteActionPolicyDocumentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.IdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteActionPolicyDocumentRequest {
    return { IdGuid: isSet(object.IdGuid) ? String(object.IdGuid) : "" };
  },

  toJSON(message: DeleteActionPolicyDocumentRequest): unknown {
    const obj: any = {};
    message.IdGuid !== undefined && (obj.IdGuid = message.IdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteActionPolicyDocumentRequest>, I>>(
    base?: I,
  ): DeleteActionPolicyDocumentRequest {
    return DeleteActionPolicyDocumentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteActionPolicyDocumentRequest>, I>>(
    object: I,
  ): DeleteActionPolicyDocumentRequest {
    const message = createBaseDeleteActionPolicyDocumentRequest();
    message.IdGuid = object.IdGuid ?? "";
    return message;
  },
};

function createBaseDeleteActionPolicyDocumentResponse(): DeleteActionPolicyDocumentResponse {
  return { Response: undefined };
}

export const DeleteActionPolicyDocumentResponse = {
  encode(message: DeleteActionPolicyDocumentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteActionPolicyDocumentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteActionPolicyDocumentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteActionPolicyDocumentResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: DeleteActionPolicyDocumentResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteActionPolicyDocumentResponse>, I>>(
    base?: I,
  ): DeleteActionPolicyDocumentResponse {
    return DeleteActionPolicyDocumentResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DeleteActionPolicyDocumentResponse>, I>>(
    object: I,
  ): DeleteActionPolicyDocumentResponse {
    const message = createBaseDeleteActionPolicyDocumentResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseAttachActionPolicyDocumentToRoleRequest(): AttachActionPolicyDocumentToRoleRequest {
  return { ActionPolicyDocumentIdGuid: "", RoleIdGuid: "" };
}

export const AttachActionPolicyDocumentToRoleRequest = {
  encode(message: AttachActionPolicyDocumentToRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ActionPolicyDocumentIdGuid !== "") {
      writer.uint32(10).string(message.ActionPolicyDocumentIdGuid);
    }
    if (message.RoleIdGuid !== "") {
      writer.uint32(18).string(message.RoleIdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttachActionPolicyDocumentToRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttachActionPolicyDocumentToRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ActionPolicyDocumentIdGuid = reader.string();
          break;
        case 2:
          message.RoleIdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttachActionPolicyDocumentToRoleRequest {
    return {
      ActionPolicyDocumentIdGuid: isSet(object.ActionPolicyDocumentIdGuid)
        ? String(object.ActionPolicyDocumentIdGuid)
        : "",
      RoleIdGuid: isSet(object.RoleIdGuid) ? String(object.RoleIdGuid) : "",
    };
  },

  toJSON(message: AttachActionPolicyDocumentToRoleRequest): unknown {
    const obj: any = {};
    message.ActionPolicyDocumentIdGuid !== undefined &&
      (obj.ActionPolicyDocumentIdGuid = message.ActionPolicyDocumentIdGuid);
    message.RoleIdGuid !== undefined && (obj.RoleIdGuid = message.RoleIdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<AttachActionPolicyDocumentToRoleRequest>, I>>(
    base?: I,
  ): AttachActionPolicyDocumentToRoleRequest {
    return AttachActionPolicyDocumentToRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AttachActionPolicyDocumentToRoleRequest>, I>>(
    object: I,
  ): AttachActionPolicyDocumentToRoleRequest {
    const message = createBaseAttachActionPolicyDocumentToRoleRequest();
    message.ActionPolicyDocumentIdGuid = object.ActionPolicyDocumentIdGuid ?? "";
    message.RoleIdGuid = object.RoleIdGuid ?? "";
    return message;
  },
};

function createBaseAttachActionPolicyDocumentToRoleResponse(): AttachActionPolicyDocumentToRoleResponse {
  return { Response: undefined };
}

export const AttachActionPolicyDocumentToRoleResponse = {
  encode(message: AttachActionPolicyDocumentToRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttachActionPolicyDocumentToRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttachActionPolicyDocumentToRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttachActionPolicyDocumentToRoleResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: AttachActionPolicyDocumentToRoleResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AttachActionPolicyDocumentToRoleResponse>, I>>(
    base?: I,
  ): AttachActionPolicyDocumentToRoleResponse {
    return AttachActionPolicyDocumentToRoleResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AttachActionPolicyDocumentToRoleResponse>, I>>(
    object: I,
  ): AttachActionPolicyDocumentToRoleResponse {
    const message = createBaseAttachActionPolicyDocumentToRoleResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseDetachActionPolicyDocumentFromRoleRequest(): DetachActionPolicyDocumentFromRoleRequest {
  return { ActionPolicyDocumentIdGuid: "", RoleIdGuid: "" };
}

export const DetachActionPolicyDocumentFromRoleRequest = {
  encode(message: DetachActionPolicyDocumentFromRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ActionPolicyDocumentIdGuid !== "") {
      writer.uint32(10).string(message.ActionPolicyDocumentIdGuid);
    }
    if (message.RoleIdGuid !== "") {
      writer.uint32(18).string(message.RoleIdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetachActionPolicyDocumentFromRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetachActionPolicyDocumentFromRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ActionPolicyDocumentIdGuid = reader.string();
          break;
        case 2:
          message.RoleIdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DetachActionPolicyDocumentFromRoleRequest {
    return {
      ActionPolicyDocumentIdGuid: isSet(object.ActionPolicyDocumentIdGuid)
        ? String(object.ActionPolicyDocumentIdGuid)
        : "",
      RoleIdGuid: isSet(object.RoleIdGuid) ? String(object.RoleIdGuid) : "",
    };
  },

  toJSON(message: DetachActionPolicyDocumentFromRoleRequest): unknown {
    const obj: any = {};
    message.ActionPolicyDocumentIdGuid !== undefined &&
      (obj.ActionPolicyDocumentIdGuid = message.ActionPolicyDocumentIdGuid);
    message.RoleIdGuid !== undefined && (obj.RoleIdGuid = message.RoleIdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<DetachActionPolicyDocumentFromRoleRequest>, I>>(
    base?: I,
  ): DetachActionPolicyDocumentFromRoleRequest {
    return DetachActionPolicyDocumentFromRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DetachActionPolicyDocumentFromRoleRequest>, I>>(
    object: I,
  ): DetachActionPolicyDocumentFromRoleRequest {
    const message = createBaseDetachActionPolicyDocumentFromRoleRequest();
    message.ActionPolicyDocumentIdGuid = object.ActionPolicyDocumentIdGuid ?? "";
    message.RoleIdGuid = object.RoleIdGuid ?? "";
    return message;
  },
};

function createBaseDetachActionPolicyDocumentFromRoleResponse(): DetachActionPolicyDocumentFromRoleResponse {
  return { Response: undefined };
}

export const DetachActionPolicyDocumentFromRoleResponse = {
  encode(message: DetachActionPolicyDocumentFromRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetachActionPolicyDocumentFromRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetachActionPolicyDocumentFromRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DetachActionPolicyDocumentFromRoleResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: DetachActionPolicyDocumentFromRoleResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DetachActionPolicyDocumentFromRoleResponse>, I>>(
    base?: I,
  ): DetachActionPolicyDocumentFromRoleResponse {
    return DetachActionPolicyDocumentFromRoleResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DetachActionPolicyDocumentFromRoleResponse>, I>>(
    object: I,
  ): DetachActionPolicyDocumentFromRoleResponse {
    const message = createBaseDetachActionPolicyDocumentFromRoleResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseListActionPolicyDocumentsForRoleRequest(): ListActionPolicyDocumentsForRoleRequest {
  return { RoleIdGuid: "" };
}

export const ListActionPolicyDocumentsForRoleRequest = {
  encode(message: ListActionPolicyDocumentsForRoleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RoleIdGuid !== "") {
      writer.uint32(10).string(message.RoleIdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListActionPolicyDocumentsForRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListActionPolicyDocumentsForRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RoleIdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListActionPolicyDocumentsForRoleRequest {
    return { RoleIdGuid: isSet(object.RoleIdGuid) ? String(object.RoleIdGuid) : "" };
  },

  toJSON(message: ListActionPolicyDocumentsForRoleRequest): unknown {
    const obj: any = {};
    message.RoleIdGuid !== undefined && (obj.RoleIdGuid = message.RoleIdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListActionPolicyDocumentsForRoleRequest>, I>>(
    base?: I,
  ): ListActionPolicyDocumentsForRoleRequest {
    return ListActionPolicyDocumentsForRoleRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListActionPolicyDocumentsForRoleRequest>, I>>(
    object: I,
  ): ListActionPolicyDocumentsForRoleRequest {
    const message = createBaseListActionPolicyDocumentsForRoleRequest();
    message.RoleIdGuid = object.RoleIdGuid ?? "";
    return message;
  },
};

function createBaseListActionPolicyDocumentsForRoleResponse(): ListActionPolicyDocumentsForRoleResponse {
  return { Response: undefined, ActionPolicyDocuments: [] };
}

export const ListActionPolicyDocumentsForRoleResponse = {
  encode(message: ListActionPolicyDocumentsForRoleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ActionPolicyDocuments) {
      GrpcActionPolicyDocumentDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListActionPolicyDocumentsForRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListActionPolicyDocumentsForRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.ActionPolicyDocuments.push(GrpcActionPolicyDocumentDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListActionPolicyDocumentsForRoleResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      ActionPolicyDocuments: Array.isArray(object?.ActionPolicyDocuments)
        ? object.ActionPolicyDocuments.map((e: any) => GrpcActionPolicyDocumentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListActionPolicyDocumentsForRoleResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    if (message.ActionPolicyDocuments) {
      obj.ActionPolicyDocuments = message.ActionPolicyDocuments.map((e) =>
        e ? GrpcActionPolicyDocumentDto.toJSON(e) : undefined
      );
    } else {
      obj.ActionPolicyDocuments = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListActionPolicyDocumentsForRoleResponse>, I>>(
    base?: I,
  ): ListActionPolicyDocumentsForRoleResponse {
    return ListActionPolicyDocumentsForRoleResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListActionPolicyDocumentsForRoleResponse>, I>>(
    object: I,
  ): ListActionPolicyDocumentsForRoleResponse {
    const message = createBaseListActionPolicyDocumentsForRoleResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.ActionPolicyDocuments =
      object.ActionPolicyDocuments?.map((e) => GrpcActionPolicyDocumentDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAttachRoleToUserRequest(): AttachRoleToUserRequest {
  return { RoleIdGuid: "", UserIdGuid: "" };
}

export const AttachRoleToUserRequest = {
  encode(message: AttachRoleToUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RoleIdGuid !== "") {
      writer.uint32(10).string(message.RoleIdGuid);
    }
    if (message.UserIdGuid !== "") {
      writer.uint32(18).string(message.UserIdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttachRoleToUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttachRoleToUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RoleIdGuid = reader.string();
          break;
        case 2:
          message.UserIdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttachRoleToUserRequest {
    return {
      RoleIdGuid: isSet(object.RoleIdGuid) ? String(object.RoleIdGuid) : "",
      UserIdGuid: isSet(object.UserIdGuid) ? String(object.UserIdGuid) : "",
    };
  },

  toJSON(message: AttachRoleToUserRequest): unknown {
    const obj: any = {};
    message.RoleIdGuid !== undefined && (obj.RoleIdGuid = message.RoleIdGuid);
    message.UserIdGuid !== undefined && (obj.UserIdGuid = message.UserIdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<AttachRoleToUserRequest>, I>>(base?: I): AttachRoleToUserRequest {
    return AttachRoleToUserRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AttachRoleToUserRequest>, I>>(object: I): AttachRoleToUserRequest {
    const message = createBaseAttachRoleToUserRequest();
    message.RoleIdGuid = object.RoleIdGuid ?? "";
    message.UserIdGuid = object.UserIdGuid ?? "";
    return message;
  },
};

function createBaseAttachRoleToUserResponse(): AttachRoleToUserResponse {
  return { Response: undefined };
}

export const AttachRoleToUserResponse = {
  encode(message: AttachRoleToUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AttachRoleToUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttachRoleToUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AttachRoleToUserResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: AttachRoleToUserResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AttachRoleToUserResponse>, I>>(base?: I): AttachRoleToUserResponse {
    return AttachRoleToUserResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AttachRoleToUserResponse>, I>>(object: I): AttachRoleToUserResponse {
    const message = createBaseAttachRoleToUserResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseDetachRoleFromUserRequest(): DetachRoleFromUserRequest {
  return { RoleIdGuid: "", UserIdGuid: "" };
}

export const DetachRoleFromUserRequest = {
  encode(message: DetachRoleFromUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.RoleIdGuid !== "") {
      writer.uint32(10).string(message.RoleIdGuid);
    }
    if (message.UserIdGuid !== "") {
      writer.uint32(18).string(message.UserIdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetachRoleFromUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetachRoleFromUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.RoleIdGuid = reader.string();
          break;
        case 2:
          message.UserIdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DetachRoleFromUserRequest {
    return {
      RoleIdGuid: isSet(object.RoleIdGuid) ? String(object.RoleIdGuid) : "",
      UserIdGuid: isSet(object.UserIdGuid) ? String(object.UserIdGuid) : "",
    };
  },

  toJSON(message: DetachRoleFromUserRequest): unknown {
    const obj: any = {};
    message.RoleIdGuid !== undefined && (obj.RoleIdGuid = message.RoleIdGuid);
    message.UserIdGuid !== undefined && (obj.UserIdGuid = message.UserIdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<DetachRoleFromUserRequest>, I>>(base?: I): DetachRoleFromUserRequest {
    return DetachRoleFromUserRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DetachRoleFromUserRequest>, I>>(object: I): DetachRoleFromUserRequest {
    const message = createBaseDetachRoleFromUserRequest();
    message.RoleIdGuid = object.RoleIdGuid ?? "";
    message.UserIdGuid = object.UserIdGuid ?? "";
    return message;
  },
};

function createBaseDetachRoleFromUserResponse(): DetachRoleFromUserResponse {
  return { Response: undefined };
}

export const DetachRoleFromUserResponse = {
  encode(message: DetachRoleFromUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetachRoleFromUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetachRoleFromUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DetachRoleFromUserResponse {
    return { Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined };
  },

  toJSON(message: DetachRoleFromUserResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DetachRoleFromUserResponse>, I>>(base?: I): DetachRoleFromUserResponse {
    return DetachRoleFromUserResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DetachRoleFromUserResponse>, I>>(object: I): DetachRoleFromUserResponse {
    const message = createBaseDetachRoleFromUserResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    return message;
  },
};

function createBaseListRolesForUserRequest(): ListRolesForUserRequest {
  return { UserIdGuid: "" };
}

export const ListRolesForUserRequest = {
  encode(message: ListRolesForUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UserIdGuid !== "") {
      writer.uint32(10).string(message.UserIdGuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesForUserRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesForUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserIdGuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRolesForUserRequest {
    return { UserIdGuid: isSet(object.UserIdGuid) ? String(object.UserIdGuid) : "" };
  },

  toJSON(message: ListRolesForUserRequest): unknown {
    const obj: any = {};
    message.UserIdGuid !== undefined && (obj.UserIdGuid = message.UserIdGuid);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesForUserRequest>, I>>(base?: I): ListRolesForUserRequest {
    return ListRolesForUserRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListRolesForUserRequest>, I>>(object: I): ListRolesForUserRequest {
    const message = createBaseListRolesForUserRequest();
    message.UserIdGuid = object.UserIdGuid ?? "";
    return message;
  },
};

function createBaseListRolesForUserResponse(): ListRolesForUserResponse {
  return { Response: undefined, Roles: [] };
}

export const ListRolesForUserResponse = {
  encode(message: ListRolesForUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.Roles) {
      GrpcRoleDto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRolesForUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRolesForUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.Roles.push(GrpcRoleDto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRolesForUserResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      Roles: Array.isArray(object?.Roles) ? object.Roles.map((e: any) => GrpcRoleDto.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListRolesForUserResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    if (message.Roles) {
      obj.Roles = message.Roles.map((e) => e ? GrpcRoleDto.toJSON(e) : undefined);
    } else {
      obj.Roles = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListRolesForUserResponse>, I>>(base?: I): ListRolesForUserResponse {
    return ListRolesForUserResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListRolesForUserResponse>, I>>(object: I): ListRolesForUserResponse {
    const message = createBaseListRolesForUserResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.Roles = object.Roles?.map((e) => GrpcRoleDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserCanPerformActionRequest(): UserCanPerformActionRequest {
  return { UserIdGuid: "", Action: "", ResourceKeyValues: {} };
}

export const UserCanPerformActionRequest = {
  encode(message: UserCanPerformActionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UserIdGuid !== "") {
      writer.uint32(10).string(message.UserIdGuid);
    }
    if (message.Action !== "") {
      writer.uint32(18).string(message.Action);
    }
    Object.entries(message.ResourceKeyValues).forEach(([key, value]) => {
      UserCanPerformActionRequest_ResourceKeyValuesEntry.encode({ key: key as any, value }, writer.uint32(26).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserCanPerformActionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserCanPerformActionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.UserIdGuid = reader.string();
          break;
        case 2:
          message.Action = reader.string();
          break;
        case 3:
          const entry3 = UserCanPerformActionRequest_ResourceKeyValuesEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.ResourceKeyValues[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserCanPerformActionRequest {
    return {
      UserIdGuid: isSet(object.UserIdGuid) ? String(object.UserIdGuid) : "",
      Action: isSet(object.Action) ? String(object.Action) : "",
      ResourceKeyValues: isObject(object.ResourceKeyValues)
        ? Object.entries(object.ResourceKeyValues).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: UserCanPerformActionRequest): unknown {
    const obj: any = {};
    message.UserIdGuid !== undefined && (obj.UserIdGuid = message.UserIdGuid);
    message.Action !== undefined && (obj.Action = message.Action);
    obj.ResourceKeyValues = {};
    if (message.ResourceKeyValues) {
      Object.entries(message.ResourceKeyValues).forEach(([k, v]) => {
        obj.ResourceKeyValues[k] = v;
      });
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserCanPerformActionRequest>, I>>(base?: I): UserCanPerformActionRequest {
    return UserCanPerformActionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserCanPerformActionRequest>, I>>(object: I): UserCanPerformActionRequest {
    const message = createBaseUserCanPerformActionRequest();
    message.UserIdGuid = object.UserIdGuid ?? "";
    message.Action = object.Action ?? "";
    message.ResourceKeyValues = Object.entries(object.ResourceKeyValues ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseUserCanPerformActionRequest_ResourceKeyValuesEntry(): UserCanPerformActionRequest_ResourceKeyValuesEntry {
  return { key: "", value: "" };
}

export const UserCanPerformActionRequest_ResourceKeyValuesEntry = {
  encode(
    message: UserCanPerformActionRequest_ResourceKeyValuesEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserCanPerformActionRequest_ResourceKeyValuesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserCanPerformActionRequest_ResourceKeyValuesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserCanPerformActionRequest_ResourceKeyValuesEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: UserCanPerformActionRequest_ResourceKeyValuesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserCanPerformActionRequest_ResourceKeyValuesEntry>, I>>(
    base?: I,
  ): UserCanPerformActionRequest_ResourceKeyValuesEntry {
    return UserCanPerformActionRequest_ResourceKeyValuesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserCanPerformActionRequest_ResourceKeyValuesEntry>, I>>(
    object: I,
  ): UserCanPerformActionRequest_ResourceKeyValuesEntry {
    const message = createBaseUserCanPerformActionRequest_ResourceKeyValuesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseUserCanPerformActionResponse(): UserCanPerformActionResponse {
  return { Response: undefined, CanPerformAction: false };
}

export const UserCanPerformActionResponse = {
  encode(message: UserCanPerformActionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Response !== undefined) {
      GenericResponse.encode(message.Response, writer.uint32(10).fork()).ldelim();
    }
    if (message.CanPerformAction === true) {
      writer.uint32(16).bool(message.CanPerformAction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserCanPerformActionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserCanPerformActionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Response = GenericResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.CanPerformAction = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserCanPerformActionResponse {
    return {
      Response: isSet(object.Response) ? GenericResponse.fromJSON(object.Response) : undefined,
      CanPerformAction: isSet(object.CanPerformAction) ? Boolean(object.CanPerformAction) : false,
    };
  },

  toJSON(message: UserCanPerformActionResponse): unknown {
    const obj: any = {};
    message.Response !== undefined &&
      (obj.Response = message.Response ? GenericResponse.toJSON(message.Response) : undefined);
    message.CanPerformAction !== undefined && (obj.CanPerformAction = message.CanPerformAction);
    return obj;
  },

  create<I extends Exact<DeepPartial<UserCanPerformActionResponse>, I>>(base?: I): UserCanPerformActionResponse {
    return UserCanPerformActionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UserCanPerformActionResponse>, I>>(object: I): UserCanPerformActionResponse {
    const message = createBaseUserCanPerformActionResponse();
    message.Response = (object.Response !== undefined && object.Response !== null)
      ? GenericResponse.fromPartial(object.Response)
      : undefined;
    message.CanPerformAction = object.CanPerformAction ?? false;
    return message;
  },
};

export interface Permissions {
  UpsertRole(request: DeepPartial<UpsertRoleRequest>, metadata?: grpc.Metadata): Promise<UpsertRoleResponse>;
  GetRole(request: DeepPartial<GetRoleRequest>, metadata?: grpc.Metadata): Promise<GetRoleResponse>;
  ListRoles(request: DeepPartial<ListRolesRequest>, metadata?: grpc.Metadata): Promise<ListRolesResponse>;
  DeleteRole(request: DeepPartial<DeleteRoleRequest>, metadata?: grpc.Metadata): Promise<DeleteRoleResponse>;
  UpsertActionPolicyDocument(
    request: DeepPartial<UpsertActionPolicyDocumentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpsertActionPolicyDocumentResponse>;
  GetActionPolicyDocument(
    request: DeepPartial<GetActionPolicyDocumentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetActionPolicyDocumentResponse>;
  ListActionPolicyDocuments(
    request: DeepPartial<ListActionPolicyDocumentsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListActionPolicyDocumentsResponse>;
  DeleteActionPolicyDocument(
    request: DeepPartial<DeleteActionPolicyDocumentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteActionPolicyDocumentResponse>;
  AttachActionPolicyDocumentToRole(
    request: DeepPartial<AttachActionPolicyDocumentToRoleRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AttachActionPolicyDocumentToRoleResponse>;
  DetachActionPolicyDocumentFromRole(
    request: DeepPartial<DetachActionPolicyDocumentFromRoleRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DetachActionPolicyDocumentFromRoleResponse>;
  ListActionPolicyDocumentsForRole(
    request: DeepPartial<ListActionPolicyDocumentsForRoleRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListActionPolicyDocumentsForRoleResponse>;
  AttachRoleToUser(
    request: DeepPartial<AttachRoleToUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AttachRoleToUserResponse>;
  DetachRoleFromUser(
    request: DeepPartial<DetachRoleFromUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DetachRoleFromUserResponse>;
  ListRolesForUser(
    request: DeepPartial<ListRolesForUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListRolesForUserResponse>;
}

export class PermissionsClientImpl implements Permissions {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpsertRole = this.UpsertRole.bind(this);
    this.GetRole = this.GetRole.bind(this);
    this.ListRoles = this.ListRoles.bind(this);
    this.DeleteRole = this.DeleteRole.bind(this);
    this.UpsertActionPolicyDocument = this.UpsertActionPolicyDocument.bind(this);
    this.GetActionPolicyDocument = this.GetActionPolicyDocument.bind(this);
    this.ListActionPolicyDocuments = this.ListActionPolicyDocuments.bind(this);
    this.DeleteActionPolicyDocument = this.DeleteActionPolicyDocument.bind(this);
    this.AttachActionPolicyDocumentToRole = this.AttachActionPolicyDocumentToRole.bind(this);
    this.DetachActionPolicyDocumentFromRole = this.DetachActionPolicyDocumentFromRole.bind(this);
    this.ListActionPolicyDocumentsForRole = this.ListActionPolicyDocumentsForRole.bind(this);
    this.AttachRoleToUser = this.AttachRoleToUser.bind(this);
    this.DetachRoleFromUser = this.DetachRoleFromUser.bind(this);
    this.ListRolesForUser = this.ListRolesForUser.bind(this);
  }

  UpsertRole(request: DeepPartial<UpsertRoleRequest>, metadata?: grpc.Metadata): Promise<UpsertRoleResponse> {
    return this.rpc.unary(PermissionsUpsertRoleDesc, UpsertRoleRequest.fromPartial(request), metadata);
  }

  GetRole(request: DeepPartial<GetRoleRequest>, metadata?: grpc.Metadata): Promise<GetRoleResponse> {
    return this.rpc.unary(PermissionsGetRoleDesc, GetRoleRequest.fromPartial(request), metadata);
  }

  ListRoles(request: DeepPartial<ListRolesRequest>, metadata?: grpc.Metadata): Promise<ListRolesResponse> {
    return this.rpc.unary(PermissionsListRolesDesc, ListRolesRequest.fromPartial(request), metadata);
  }

  DeleteRole(request: DeepPartial<DeleteRoleRequest>, metadata?: grpc.Metadata): Promise<DeleteRoleResponse> {
    return this.rpc.unary(PermissionsDeleteRoleDesc, DeleteRoleRequest.fromPartial(request), metadata);
  }

  UpsertActionPolicyDocument(
    request: DeepPartial<UpsertActionPolicyDocumentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpsertActionPolicyDocumentResponse> {
    return this.rpc.unary(
      PermissionsUpsertActionPolicyDocumentDesc,
      UpsertActionPolicyDocumentRequest.fromPartial(request),
      metadata,
    );
  }

  GetActionPolicyDocument(
    request: DeepPartial<GetActionPolicyDocumentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetActionPolicyDocumentResponse> {
    return this.rpc.unary(
      PermissionsGetActionPolicyDocumentDesc,
      GetActionPolicyDocumentRequest.fromPartial(request),
      metadata,
    );
  }

  ListActionPolicyDocuments(
    request: DeepPartial<ListActionPolicyDocumentsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListActionPolicyDocumentsResponse> {
    return this.rpc.unary(
      PermissionsListActionPolicyDocumentsDesc,
      ListActionPolicyDocumentsRequest.fromPartial(request),
      metadata,
    );
  }

  DeleteActionPolicyDocument(
    request: DeepPartial<DeleteActionPolicyDocumentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DeleteActionPolicyDocumentResponse> {
    return this.rpc.unary(
      PermissionsDeleteActionPolicyDocumentDesc,
      DeleteActionPolicyDocumentRequest.fromPartial(request),
      metadata,
    );
  }

  AttachActionPolicyDocumentToRole(
    request: DeepPartial<AttachActionPolicyDocumentToRoleRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AttachActionPolicyDocumentToRoleResponse> {
    return this.rpc.unary(
      PermissionsAttachActionPolicyDocumentToRoleDesc,
      AttachActionPolicyDocumentToRoleRequest.fromPartial(request),
      metadata,
    );
  }

  DetachActionPolicyDocumentFromRole(
    request: DeepPartial<DetachActionPolicyDocumentFromRoleRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DetachActionPolicyDocumentFromRoleResponse> {
    return this.rpc.unary(
      PermissionsDetachActionPolicyDocumentFromRoleDesc,
      DetachActionPolicyDocumentFromRoleRequest.fromPartial(request),
      metadata,
    );
  }

  ListActionPolicyDocumentsForRole(
    request: DeepPartial<ListActionPolicyDocumentsForRoleRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListActionPolicyDocumentsForRoleResponse> {
    return this.rpc.unary(
      PermissionsListActionPolicyDocumentsForRoleDesc,
      ListActionPolicyDocumentsForRoleRequest.fromPartial(request),
      metadata,
    );
  }

  AttachRoleToUser(
    request: DeepPartial<AttachRoleToUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AttachRoleToUserResponse> {
    return this.rpc.unary(PermissionsAttachRoleToUserDesc, AttachRoleToUserRequest.fromPartial(request), metadata);
  }

  DetachRoleFromUser(
    request: DeepPartial<DetachRoleFromUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<DetachRoleFromUserResponse> {
    return this.rpc.unary(PermissionsDetachRoleFromUserDesc, DetachRoleFromUserRequest.fromPartial(request), metadata);
  }

  ListRolesForUser(
    request: DeepPartial<ListRolesForUserRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListRolesForUserResponse> {
    return this.rpc.unary(PermissionsListRolesForUserDesc, ListRolesForUserRequest.fromPartial(request), metadata);
  }
}

export const PermissionsDesc = { serviceName: "permissions.Permissions" };

export const PermissionsUpsertRoleDesc: UnaryMethodDefinitionish = {
  methodName: "UpsertRole",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpsertRoleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpsertRoleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsGetRoleDesc: UnaryMethodDefinitionish = {
  methodName: "GetRole",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetRoleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetRoleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsListRolesDesc: UnaryMethodDefinitionish = {
  methodName: "ListRoles",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListRolesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListRolesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsDeleteRoleDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteRole",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteRoleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteRoleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsUpsertActionPolicyDocumentDesc: UnaryMethodDefinitionish = {
  methodName: "UpsertActionPolicyDocument",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpsertActionPolicyDocumentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpsertActionPolicyDocumentResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsGetActionPolicyDocumentDesc: UnaryMethodDefinitionish = {
  methodName: "GetActionPolicyDocument",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetActionPolicyDocumentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetActionPolicyDocumentResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsListActionPolicyDocumentsDesc: UnaryMethodDefinitionish = {
  methodName: "ListActionPolicyDocuments",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListActionPolicyDocumentsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListActionPolicyDocumentsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsDeleteActionPolicyDocumentDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteActionPolicyDocument",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteActionPolicyDocumentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DeleteActionPolicyDocumentResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsAttachActionPolicyDocumentToRoleDesc: UnaryMethodDefinitionish = {
  methodName: "AttachActionPolicyDocumentToRole",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AttachActionPolicyDocumentToRoleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AttachActionPolicyDocumentToRoleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsDetachActionPolicyDocumentFromRoleDesc: UnaryMethodDefinitionish = {
  methodName: "DetachActionPolicyDocumentFromRole",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DetachActionPolicyDocumentFromRoleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DetachActionPolicyDocumentFromRoleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsListActionPolicyDocumentsForRoleDesc: UnaryMethodDefinitionish = {
  methodName: "ListActionPolicyDocumentsForRole",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListActionPolicyDocumentsForRoleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListActionPolicyDocumentsForRoleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsAttachRoleToUserDesc: UnaryMethodDefinitionish = {
  methodName: "AttachRoleToUser",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AttachRoleToUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AttachRoleToUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsDetachRoleFromUserDesc: UnaryMethodDefinitionish = {
  methodName: "DetachRoleFromUser",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DetachRoleFromUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DetachRoleFromUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const PermissionsListRolesForUserDesc: UnaryMethodDefinitionish = {
  methodName: "ListRolesForUser",
  service: PermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListRolesForUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListRolesForUserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export interface PrivatePermissions {
  UserCanPerformAction(
    request: DeepPartial<UserCanPerformActionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UserCanPerformActionResponse>;
}

export class PrivatePermissionsClientImpl implements PrivatePermissions {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UserCanPerformAction = this.UserCanPerformAction.bind(this);
  }

  UserCanPerformAction(
    request: DeepPartial<UserCanPerformActionRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UserCanPerformActionResponse> {
    return this.rpc.unary(
      PrivatePermissionsUserCanPerformActionDesc,
      UserCanPerformActionRequest.fromPartial(request),
      metadata,
    );
  }
}

export const PrivatePermissionsDesc = { serviceName: "permissions.PrivatePermissions" };

export const PrivatePermissionsUserCanPerformActionDesc: UnaryMethodDefinitionish = {
  methodName: "UserCanPerformAction",
  service: PrivatePermissionsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UserCanPerformActionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UserCanPerformActionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
