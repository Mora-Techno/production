export type CompanyRole = 'leader' | 'admin' | 'employee';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';

export interface RegisterCompanyBody {
  companyName: string;
  email: string;
  fullName: string;
  password: string;
  tier?: SubscriptionTier;
}

export interface CreateAdminBody {
  email: string;
  fullName: string;
  password: string;
}

export interface UpdateSubscriptionBody {
  tier: SubscriptionTier;
  billingCycle?: BillingCycle;
}

export interface CompanyParams {
  id: string;
}

export interface SafeUser {
  id: string;
  email: string;
  fullName: string;
  companyRole: CompanyRole;
  companyId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyResponse {
  id: string;
  name: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  subscriptionStartsAt: Date;
  subscriptionEndsAt: Date | null;
  leaderId: string;
  maxWorkstationUsers: number;
  createdAt: Date;
  updatedAt: Date;
}
