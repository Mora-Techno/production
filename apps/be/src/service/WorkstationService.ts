import bcryptjs from 'bcryptjs';
import prisma from 'prisma/client';
import { getWorkstationUserLimit } from '@/utils/tierLimits';
import type {
  CreateWorkstationBody,
  InviteMemberBody,
  UpdateWorkstationBody,
} from '@/types/workstation.types';

class WorkstationService {
  private async getCompanyWithLimit(companyId: string) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error('Company tidak ditemukan');
    }

    return {
      company,
      maxMembers: getWorkstationUserLimit(company.tier),
    };
  }

  public async list(companyId: string) {
    const { maxMembers } = await this.getCompanyWithLimit(companyId);

    const workstations = await prisma.workstation.findMany({
      where: { companyId },
      include: { _count: { select: { members: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return workstations.map((ws) => ({
      id: ws.id,
      name: ws.name,
      companyId: ws.companyId,
      createdById: ws.createdById,
      memberCount: ws._count.members,
      maxMembers,
      createdAt: ws.createdAt,
      updatedAt: ws.updatedAt,
    }));
  }

  public async getById(id: string, companyId: string) {
    const { maxMembers } = await this.getCompanyWithLimit(companyId);

    const workstation = await prisma.workstation.findFirst({
      where: { id, companyId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
                companyRole: true,
              },
            },
          },
          orderBy: { joinedAt: 'asc' },
        },
      },
    });

    if (!workstation) return null;

    return {
      id: workstation.id,
      name: workstation.name,
      companyId: workstation.companyId,
      createdById: workstation.createdById,
      memberCount: workstation.members.length,
      maxMembers,
      members: workstation.members,
      createdAt: workstation.createdAt,
      updatedAt: workstation.updatedAt,
    };
  }

  public async create(companyId: string, createdById: string, input: CreateWorkstationBody) {
    await this.getCompanyWithLimit(companyId);

    const workstation = await prisma.workstation.create({
      data: {
        name: input.name,
        companyId,
        createdById,
      },
    });

    const { maxMembers } = await this.getCompanyWithLimit(companyId);

    return {
      id: workstation.id,
      name: workstation.name,
      companyId: workstation.companyId,
      createdById: workstation.createdById,
      memberCount: 0,
      maxMembers,
      createdAt: workstation.createdAt,
      updatedAt: workstation.updatedAt,
    };
  }

  public async update(id: string, companyId: string, input: UpdateWorkstationBody) {
    const existing = await prisma.workstation.findFirst({
      where: { id, companyId },
    });

    if (!existing) return null;

    const workstation = await prisma.workstation.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
      },
      include: { _count: { select: { members: true } } },
    });

    const { maxMembers } = await this.getCompanyWithLimit(companyId);

    return {
      id: workstation.id,
      name: workstation.name,
      companyId: workstation.companyId,
      createdById: workstation.createdById,
      memberCount: workstation._count.members,
      maxMembers,
      createdAt: workstation.createdAt,
      updatedAt: workstation.updatedAt,
    };
  }

  public async remove(id: string, companyId: string) {
    const existing = await prisma.workstation.findFirst({
      where: { id, companyId },
    });

    if (!existing) return null;

    await prisma.workstation.delete({ where: { id } });
    return existing;
  }

  public async inviteMember(workstationId: string, companyId: string, input: InviteMemberBody) {
    const workstation = await prisma.workstation.findFirst({
      where: { id: workstationId, companyId },
      include: {
        _count: { select: { members: true } },
        company: true,
      },
    });

    if (!workstation) {
      throw new Error('Workstation tidak ditemukan');
    }

    const maxMembers = getWorkstationUserLimit(workstation.company.tier);

    if (workstation._count.members >= maxMembers) {
      throw new Error(
        `Batas anggota workstation tercapai (maks. ${maxMembers} untuk tier ${workstation.company.tier})`,
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      if (existingUser.companyId && existingUser.companyId !== companyId) {
        throw new Error('Email sudah terdaftar di company lain');
      }

      const alreadyMember = await prisma.workstationMember.findUnique({
        where: {
          workstationId_userId: {
            workstationId,
            userId: existingUser.id,
          },
        },
      });

      if (alreadyMember) {
        throw new Error('Pengguna sudah menjadi anggota workstation ini');
      }

      const member = await prisma.$transaction(async (tx) => {
        const user =
          existingUser.companyId === companyId
            ? existingUser
            : await tx.user.update({
                where: { id: existingUser.id },
                data: { companyId, companyRole: 'employee' },
              });

        return tx.workstationMember.create({
          data: {
            workstationId,
            userId: user.id,
            role: input.role ?? 'member',
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
                companyRole: true,
              },
            },
          },
        });
      });

      return member;
    }

    const hashedPassword = await bcryptjs.hash(input.password, 10);

    const member = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          fullName: input.fullName,
          password: hashedPassword,
          companyRole: 'employee',
          companyId,
        },
      });

      return tx.workstationMember.create({
        data: {
          workstationId,
          userId: user.id,
          role: input.role ?? 'member',
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
              companyRole: true,
            },
          },
        },
      });
    });

    return member;
  }

  public async removeMember(workstationId: string, companyId: string, userId: string) {
    const workstation = await prisma.workstation.findFirst({
      where: { id: workstationId, companyId },
    });

    if (!workstation) return null;

    const member = await prisma.workstationMember.findUnique({
      where: {
        workstationId_userId: { workstationId, userId },
      },
    });

    if (!member) return null;

    await prisma.workstationMember.delete({
      where: { id: member.id },
    });

    return member;
  }
}

export default new WorkstationService();
