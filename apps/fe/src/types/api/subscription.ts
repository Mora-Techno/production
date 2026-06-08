export type SubscriptionTier = 'free' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';
export type PaymentProvider = 'stripe' | 'xendit';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'canceled';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete';

export interface PlanPrice {
  usd: number;
  idr: number;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  description: string;
  maxWorkstationUsers: number;
  prices: {
    monthly: PlanPrice;
    yearly: PlanPrice;
  };
  features: string[];
}

export interface CreateCheckoutInput {
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  provider: PaymentProvider;
}

export interface CheckoutData {
  provider: PaymentProvider;
  checkoutUrl: string | null;
  sessionId: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
}

export interface SubscriptionInfo {
  id: string;
  companyId: string;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  provider: PaymentProvider | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  maxWorkstationUsers: number;
}

export interface PaymentInfo {
  id: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  status: PaymentStatus;
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  createdAt: string;
}

export interface SubscriptionDetail {
  company: {
    id: string;
    name: string;
    tier: SubscriptionTier;
    billingCycle: BillingCycle;
    subscriptionStartsAt: string;
    subscriptionEndsAt: string | null;
    maxWorkstationUsers: number;
  };
  subscription: SubscriptionInfo | null;
  recentPayments: PaymentInfo[];
}
