import bcryptjs from "bcryptjs";
import type { CompanyRole } from "@prisma/client";
import prisma from "prisma/client";
import { getWorkstationUserLimit } from "@/utils/tierLimits";
import { getPeriodEnd } from "@/config/subscriptionPlans";
import type {
  PickCreateAdmin,
  PickRegisterCompany,
  PickUpdateCompanySubscription,
} from "@repo/types/company.types";
import { sanitizeUser } from "@/utils/authTokens";

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

class CompanyService {
  public async registerLeader(input: PickRegisterCompany) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcryptjs.hash(input.password, 10);
    const tier = input.tier ?? "free";
    const now = new Date();

    const result = await prisma.$transaction(async (tx) => {
      const leader = await tx.user.create({
        data: {
          email: input.email,
          fullName: input.fullName,
          password: hashedPassword,
          companyRole: "leader",
        },
      });

      const company = await tx.company.create({
        data: {
          name: input.companyName,
          tier,
          billingCycle: "monthly",
          subscriptionStartsAt: now,
          subscriptionEndsAt: addMonths(now, 1),
          leaderId: leader.id,
        },
      });

      const updatedLeader = await tx.user.update({
        where: { id: leader.id },
        data: { companyId: company.id },
      });

      return { company, leader: updatedLeader };
    });

    return {
      company: {
        ...result.company,
        maxWorkstationUsers: getWorkstationUserLimit(result.company.tier),
      },
      leader: sanitizeUser(result.leader),
    };
  }

  public async createAdmin(companyId: string, input: PickCreateAdmin) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new Error("Email sudah terdaftar");
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error("Company tidak ditemukan");
    }

    const hashedPassword = await bcryptjs.hash(input.password, 10);

    const admin = await prisma.user.create({
      data: {
        email: input.email,
        fullName: input.fullName,
        password: hashedPassword,
        companyRole: "admin",
        companyId,
      },
    });

    return sanitizeUser(admin);
  }

  public async listAdmins(companyId: string) {
    return prisma.user.findMany({
      where: { companyId, companyRole: "admin" },
      select: {
        id: true,
        email: true,
        fullName: true,
        companyRole: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  public async getById(companyId: string) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        leader: {
          select: {
            id: true,
            email: true,
            fullName: true,
            companyRole: true,
          },
        },
        _count: { select: { workstations: true, members: true } },
      },
    });

    if (!company) return null;

    return {
      ...company,
      maxWorkstationUsers: getWorkstationUserLimit(company.tier),
    };
  }

  public async updateSubscription(
    companyId: string,
    input: PickUpdateCompanySubscription,
  ) {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) return null;

    const now = new Date();
    const billingCycle = input.billingCycle ?? "monthly";

    return prisma.company.update({
      where: { id: companyId },
      data: {
        tier: input.tier,
        billingCycle,
        subscriptionStartsAt: now,
        subscriptionEndsAt: getPeriodEnd(billingCycle, now),
      },
    });
  }
}

export default new CompanyService();
