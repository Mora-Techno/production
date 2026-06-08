import type { BillingCycle, SubscriptionTier } from './company.types';

export type PaymentProvider = 'stripe' | 'xendit';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'canceled';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete';

export interface SubscriptionPlanResponse {
  tier: SubscriptionTier;
  name: string;
  description: string;
  maxWorkstationUsers: number;
  prices: {
    monthly: { usd: number; idr: number };
    yearly: { usd: number; idr: number };
  };
  features: string[];
}

export interface CreateCheckoutBody {
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  provider: PaymentProvider;
}

export interface CheckoutResponse {
  provider: PaymentProvider;
  checkoutUrl: string | null;
  sessionId: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
}

export interface SubscriptionResponse {
  id: string;
  companyId: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  provider: PaymentProvider | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  maxWorkstationUsers: number;
}

export interface PaymentResponse {
  id: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  status: PaymentStatus;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  createdAt: Date;
}

export interface SubscriptionDetailResponse {
  company: {
    id: string;
    name: string;
    tier: SubscriptionTier;
    billingCycle: BillingCycle;
    subscriptionStartsAt: Date;
    subscriptionEndsAt: Date | null;
    maxWorkstationUsers: number;
  };
  subscription: SubscriptionResponse | null;
  recentPayments: PaymentResponse[];
}
