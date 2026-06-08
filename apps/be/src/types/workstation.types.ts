import type { WorkstationMemberRole } from '@prisma/client';

export type { WorkstationMemberRole };

export interface CreateWorkstationBody {
  name: string;
}

export interface UpdateWorkstationBody {
  name?: string;
}

export interface WorkstationParams {
  id: string;
}

export interface InviteMemberBody {
  email: string;
  fullName: string;
  password: string;
  role?: WorkstationMemberRole;
}

export interface WorkstationMemberResponse {
  id: string;
  workstationId: string;
  userId: string;
  role: WorkstationMemberRole;
  joinedAt: Date;
  user: {
    id: string;
    email: string;
    fullName: string;
    companyRole: string;
  };
}

export interface WorkstationResponse {
  id: string;
  name: string;
  companyId: string;
  createdById: string;
  memberCount: number;
  maxMembers: number;
  createdAt: Date;
  updatedAt: Date;
}
