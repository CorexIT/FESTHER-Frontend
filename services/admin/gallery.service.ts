// Public admin gallery service. Backed by the real gallery REST API
// (GET/POST /galleries, PATCH/DELETE /galleries/:id) through the shared
// API configuration, so admin changes show up on the public gallery page.
import type { ApiResult } from "@/lib/types";
import type { AdminGalleryImage, GalleryCategory, GalleryImageInput } from "@/lib/admin/types";
import { apiRequest } from "@/services/config";
import { galleryPath, getGalleryItems, type GalleryItem } from "@/services/gallery.service";

const galleryCategories: GalleryCategory[] = ["ROOMS", "VIEWS", "DINING", "SPACES", "WELLNESS"];

const toAdminImage = (item: GalleryItem): AdminGalleryImage => {
  const category = (item.category ?? "").toUpperCase();
  return {
    id: item.id,
    src: item.images?.[0] ?? "",
    title: item.title ?? "",
    alt: item.title ?? "",
    category: (galleryCategories as string[]).includes(category)
      ? (category as GalleryCategory)
      : "ROOMS",
    description: item.description ?? "",
    createdAt: (item.createdAt ?? "").slice(0, 10),
  };
};

const toPayload = (input: GalleryImageInput) => ({
  title: input.title.trim(),
  description: input.description.trim(),
  category: input.category.toLowerCase(),
  images: [input.src.trim()],
});

export async function getGalleryImages(): Promise<AdminGalleryImage[]> {
  const items = await getGalleryItems();
  return items.map(toAdminImage);
}

export async function createGalleryImage(input: GalleryImageInput): Promise<void> {
  await apiRequest<ApiResult<GalleryItem>>(galleryPath(), {
    method: "POST",
    body: JSON.stringify(toPayload(input)),
  });
}

export async function updateGalleryImage(id: string, input: GalleryImageInput): Promise<void> {
  await apiRequest<ApiResult<GalleryItem>>(galleryPath(`/${encodeURIComponent(id)}`), {
    method: "PATCH",
    body: JSON.stringify(toPayload(input)),
  });
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await apiRequest(galleryPath(`/${encodeURIComponent(id)}`), { method: "DELETE" });
}

export type {
  AdminGalleryImage,
  GalleryCategory,
  GalleryImageInput,
} from "@/lib/admin/types";
