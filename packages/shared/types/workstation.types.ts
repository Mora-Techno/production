export type WorkstationMemberRole = 'admin' | 'member';

export type PickCreateWorkstation = {
  name: string;
};

export type PickUpdateWorkstation = {
  name?: string;
};

export type PickInviteMember = {
  email: string;
  fullName: string;
  password: string;
  role?: WorkstationMemberRole;
};

export interface WorkstationMember {
  id: string;
  workstationId: string;
  userId: string;
  role: WorkstationMemberRole;
  joinedAt: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    companyRole: string;
  };
}

export interface Workstation {
  id: string;
  name: string;
  companyId: string;
  createdById: string;
  memberCount: number;
  maxMembers: number;
  createdAt: string;
  updatedAt: string;
  members?: WorkstationMember[];
}
