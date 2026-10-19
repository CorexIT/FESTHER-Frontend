import type { ApiResult } from "@/lib/types";
import { apiRequest, isBackendConfigured } from "./config";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GalleryMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type GalleryResponse = ApiResult<GalleryItem[]> & { meta?: GalleryMeta };

const PAGE_LIMIT = 20;
const MAX_PAGES = 50;

export function galleryPath(suffix = ""): string {
  const base = isBackendConfigured() ? "/api/v1/galleries" : "/api/galleries";
  return `${base}${suffix}`;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items: GalleryItem[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await apiRequest<GalleryResponse>(
      galleryPath(`?page=${page}&limit=${PAGE_LIMIT}`),
    );
    const pageItems = Array.isArray(result.data)
      ? result.data.filter((item) => item != null)
      : [];
    items.push(...pageItems);
    totalPages = Math.min(Math.max(result.meta?.totalPages ?? 1, 1), MAX_PAGES);
    page += 1;
  } while (page <= totalPages);

  return items;
}
