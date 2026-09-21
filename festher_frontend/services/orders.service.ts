import type { ApiResult, OrderRequest } from "@/lib/types";
import { apiRequest, delay, isBackendConfigured } from "./config";

export interface OrderResult {
  orderId?: string;
}

// Totals are sent for display purposes only — the backend must recalculate and
// validate every price when the API is connected.
export async function createOrder(request: OrderRequest): Promise<ApiResult<OrderResult>> {
  if (!isBackendConfigured()) {
    await delay(700);
    return {
      success: true,
      message: "Your order request has been received. Our team will confirm by email.",
    };
  }
  return apiRequest<ApiResult<OrderResult>>("/api/orders", {
    method: "POST",
    body: JSON.stringify(request),
  });
}