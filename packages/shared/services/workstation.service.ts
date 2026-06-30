import {
  WORKSTATION_ENDPOINTS,
  workstationById,
  workstationMemberById,
  workstationMembers,
} from "../endpoints/workstation.endpoints";
import type { TResponse } from "../types/response.types";
import type {
  PickCreateWorkstation,
  PickInviteMember,
  PickUpdateWorkstation,
  Workstation,
  WorkstationMember,
} from "../types/workstation.types";
import {
  DeleteResponse,
  GetResponse,
  PatchResponse,
  PostResponse,
} from "./http";
import { toServiceResponse } from "./service-response";

export async function ListWorkstations(): Promise<TResponse<Workstation[]>> {
  const res = await GetResponse<Workstation[]>(WORKSTATION_ENDPOINTS.LIST);
  return toServiceResponse(res, {
    message: "Daftar workstation berhasil diambil",
  });
}

export async function CreateWorkstation(
  payload: PickCreateWorkstation,
): Promise<TResponse<Workstation>> {
  const res = await PostResponse<Workstation>(
    WORKSTATION_ENDPOINTS.CREATE,
    payload,
  );
  return toServiceResponse(res, {
    message: "Workstation berhasil dibuat",
    statusCode: 201,
  });
}

export async function GetWorkstation(
  id: string,
): Promise<TResponse<Workstation>> {
  const res = await GetResponse<Workstation>(workstationById(id));
  return toServiceResponse(res, {
    message: "Detail workstation berhasil diambil",
  });
}

export async function UpdateWorkstation(
  id: string,
  payload: PickUpdateWorkstation,
): Promise<TResponse<Workstation>> {
  const res = await PatchResponse<Workstation>(workstationById(id), payload);
  return toServiceResponse(res, {
    message: "Workstation berhasil diperbarui",
  });
}

export async function DeleteWorkstation(
  id: string,
): Promise<TResponse<Workstation>> {
  const res = await DeleteResponse<Workstation>(workstationById(id));
  return toServiceResponse(res, {
    message: "Workstation berhasil dihapus",
  });
}

export async function InviteMember(
  workstationId: string,
  payload: PickInviteMember,
): Promise<TResponse<WorkstationMember>> {
  const res = await PostResponse<WorkstationMember>(
    workstationMembers(workstationId),
    payload,
  );
  return toServiceResponse(res, {
    message: "Anggota berhasil diinvite",
    statusCode: 201,
  });
}

export async function RemoveMember(
  workstationId: string,
  userId: string,
): Promise<TResponse<WorkstationMember>> {
  const res = await DeleteResponse<WorkstationMember>(
    workstationMemberById(workstationId, userId),
  );
  return toServiceResponse(res, {
    message: "Anggota berhasil dihapus",
  });
}

export const WorkstationService = {
  ListWorkstations,
  CreateWorkstation,
  GetWorkstation,
  UpdateWorkstation,
  DeleteWorkstation,
  InviteMember,
  RemoveMember,
};
