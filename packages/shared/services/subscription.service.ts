import { SUBSCRIPTION_ENDPOINTS } from '../endpoints/subscription.endpoints';
import type {
  CheckoutData,
  PickCreateCheckout,
  SubscriptionDetail,
  SubscriptionPlan,
} from '../types/subscription.types';
import type { TResponse } from '../types/response.types';
import { GetResponse, PostResponse } from './http';
import { toServiceResponse } from './service-response';

export async function ListPlans(): Promise<TResponse<SubscriptionPlan[]>> {
  const res = await GetResponse<SubscriptionPlan[]>(SUBSCRIPTION_ENDPOINTS.PLANS);
  return toServiceResponse(res, {
    message: 'Daftar paket berhasil diambil',
  });
}

export async function GetMySubscription(): Promise<TResponse<SubscriptionDetail>> {
  const res = await GetResponse<SubscriptionDetail>(SUBSCRIPTION_ENDPOINTS.ME);
  return toServiceResponse(res, {
    message: 'Langganan berhasil diambil',
  });
}

export async function Checkout(payload: PickCreateCheckout): Promise<TResponse<CheckoutData>> {
  const res = await PostResponse<CheckoutData>(SUBSCRIPTION_ENDPOINTS.CHECKOUT, payload);
  return toServiceResponse(res, {
    message: 'Checkout berhasil dibuat',
    statusCode: 201,
  });
}

export async function CancelSubscription(): Promise<TResponse<{ id: string }>> {
  const res = await PostResponse<{ id: string }>(SUBSCRIPTION_ENDPOINTS.CANCEL);
  return toServiceResponse(res, {
    message: 'Langganan berhasil dibatalkan',
  });
}

export const SubscriptionService = {
  ListPlans,
  GetMySubscription,
  Checkout,
  CancelSubscription,
  getPlans: ListPlans,
  getMine: GetMySubscription,
  checkout: Checkout,
  cancel: CancelSubscription,
};
