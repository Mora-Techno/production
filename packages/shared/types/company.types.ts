export type CompanyRole = 'leader' | 'admin' | 'employee';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';

export type PickRegisterCompany = {
  companyName: string;
  email: string;
  fullName: string;
  password: string;
  tier?: SubscriptionTier;
};

export type PickCreateAdmin = {
  email: string;
  fullName: string;
  password: string;
};

export type PickUpdateCompanySubscription = {
  tier: SubscriptionTier;
  billingCycle?: BillingCycle;
};

export interface CompanyProfile {
  id: string;
  name: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  subscriptionStartsAt: string;
  subscriptionEndsAt: string | null;
  leaderId: string;
  maxWorkstationUsers: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  companyRole: CompanyRole;
  companyId: string | null;
  createdAt: string;
  updatedAt: string;
}
