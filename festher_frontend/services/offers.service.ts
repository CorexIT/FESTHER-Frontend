import type { ApiResult, Offer } from "@/lib/types";
import { demoOffers } from "@/lib/data/offers";
import { apiRequest, delay, isBackendConfigured } from "./config";

export async function getOffers(): Promise<Offer[]> {
  if (!isBackendConfigured()) {
    await delay(350);
    return demoOffers.filter((o) => o.active);
  }
  const result = await apiRequest<ApiResult<{ items: Offer[] }>>("/api/offers");
  return (result.data?.items ?? []).filter((o) => o.active);
}

export async function getOfferBySlug(slug: string): Promise<Offer | undefined> {
  if (!isBackendConfigured()) {
    await delay(250);
    return demoOffers.find((o) => o.slug === slug && o.active);
  }
  const result = await apiRequest<ApiResult<{ offer: Offer }>>(`/api/offers/${encodeURIComponent(slug)}`);
  return result.data?.offer;
}