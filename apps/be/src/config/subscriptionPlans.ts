import type { BillingCycle, SubscriptionTier } from '@repo/types/company.types';

export type PaymentProvider = 'stripe' | 'xendit';

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

function envNumber(key: string, fallback: number): number {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    tier: 'free',
    name: 'Free',
    description: 'Cocok untuk tim kecil yang baru mulai.',
    maxWorkstationUsers: 4,
    prices: {
      monthly: { usd: 0, idr: 0 },
      yearly: { usd: 0, idr: 0 },
    },
    features: [
      'Max 4 user per workstation',
      'Todo, Notes, Calendar',
      'Workstation management dasar',
    ],
  },
  {
    tier: 'pro',
    name: 'Pro',
    description: 'Untuk tim produktif dengan kebutuhan kolaborasi lebih besar.',
    maxWorkstationUsers: 8,
    prices: {
      monthly: {
        usd: envNumber('SUBSCRIPTION_PRO_MONTHLY_USD', 500),
        idr: envNumber('SUBSCRIPTION_PRO_MONTHLY_IDR', 79000),
      },
      yearly: {
        usd: envNumber('SUBSCRIPTION_PRO_YEARLY_USD', 5000),
        idr: envNumber('SUBSCRIPTION_PRO_YEARLY_IDR', 790000),
      },
    },
    features: [
      'Max 8 user per workstation',
      'Semua fitur Free',
      'Priority support',
      'Billing bulanan atau tahunan',
    ],
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    description: 'Skala besar dengan kapasitas tim maksimal.',
    maxWorkstationUsers: 16,
    prices: {
      monthly: {
        usd: envNumber('SUBSCRIPTION_ENTERPRISE_MONTHLY_USD', 2500),
        idr: envNumber('SUBSCRIPTION_ENTERPRISE_MONTHLY_IDR', 399000),
      },
      yearly: {
        usd: envNumber('SUBSCRIPTION_ENTERPRISE_YEARLY_USD', 25000),
        idr: envNumber('SUBSCRIPTION_ENTERPRISE_YEARLY_IDR', 3990000),
      },
    },
    features: [
      'Max 16 user per workstation',
      'Semua fitur Pro',
      'Dedicated support',
      'Custom onboarding',
    ],
  },
];

export function getPlan(tier: SubscriptionTier): SubscriptionPlan {
  const plan = SUBSCRIPTION_PLANS.find((item) => item.tier === tier);
  if (!plan) throw new Error('Paket langganan tidak ditemukan');
  return plan;
}

export function getPlanPrice(
  tier: SubscriptionTier,
  billingCycle: BillingCycle,
  provider: PaymentProvider,
): { amount: number; currency: string } {
  const plan = getPlan(tier);

  if (tier === 'free') {
    return { amount: 0, currency: provider === 'stripe' ? 'usd' : 'idr' };
  }

  const price = plan.prices[billingCycle];

  if (provider === 'stripe') {
    return { amount: price.usd, currency: 'usd' };
  }

  return { amount: price.idr, currency: 'idr' };
}

export function getPeriodEnd(billingCycle: BillingCycle, from = new Date()): Date {
  const end = new Date(from);

  if (billingCycle === 'yearly') {
    end.setFullYear(end.getFullYear() + 1);
    return end;
  }

  end.setMonth(end.getMonth() + 1);
  return end;
}
