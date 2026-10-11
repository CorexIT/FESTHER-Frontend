import type { ApiResult, Offer } from "@/lib/types";
import { API_BASE_URL, apiRequest } from "./config";

interface PackageApiRecord {
  id: string;
  title: string;
  description?: string;
  stay?: { id?: string } | string | null;
  dining?: { id?: string } | string | null;
  price?: number;
  savePercentage?: number;
  startDate?: string;
  endDate?: string;
  image?: string;
  isActive?: boolean;
}

type PackagesResponse = ApiResult<PackageApiRecord[]>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function relatedId(value: PackageApiRecord["stay"] | PackageApiRecord["dining"]): string | undefined {
  if (typeof value === "string") return value;
  return value?.id;
}

function mapPackage(record: PackageApiRecord): Offer {
  return {
    id: record.id,
    slug: slugify(record.title) || record.id,
    title: record.title,
    shortDescription: record.description ?? "",
    description: record.description,
    type: "PACKAGE",
    image: record.image ?? "/festher-sunset-view.jpg",
    offerPrice: record.price,
    discountPercentage: record.savePercentage,
    currency: "LKR",
    accommodationId: relatedId(record.stay),
    diningItemId: relatedId(record.dining),
    startDate: record.startDate,
    endDate: record.endDate,
    active: record.isActive !== false,
  };
}

export async function getPackages(): Promise<Offer[]> {
  const result = await apiRequest<PackagesResponse>(
    API_BASE_URL ? "/api/v1/packages" : "/api/packages",
  );

  return (Array.isArray(result?.data) ? result.data : [])
    .filter((record) => record && record.isActive !== false)
    .map(mapPackage);
}
