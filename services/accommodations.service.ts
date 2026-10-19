import type { Accommodation, AmenityKey, ApiResult } from "@/lib/types";
import { API_BASE_URL, apiRequest } from "./config";

interface AccommodationApiRecord {
  id: string;
  title: string;
  description: string;
  price?: number;
  highlights?: string[];
  sleeps?: number;
  bed?: string;
  checkIn?: string;
  checkOut?: string;
  images?: string[];
  isActive?: boolean;
}

type AccommodationsResponse = ApiResult<AccommodationApiRecord[]>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function amenityFor(highlight: string): [AmenityKey, string] | null {
  const value = highlight.toLowerCase();
  if (value.includes("bed")) return ["bed", highlight];
  if (value.includes("balcony") || value.includes("veranda") || value.includes("terrace")) {
    return ["veranda", highlight];
  }
  if (value.includes("family") || value.includes("mattress")) return ["family", highlight];
  return null;
}

function mapAccommodation(record: AccommodationApiRecord): Accommodation {
  const images = Array.isArray(record.images) ? record.images.filter(Boolean) : [];
  const highlights = (record.highlights ?? []).filter(Boolean);
  const amenities = highlights
    .map(amenityFor)
    .filter((amenity): amenity is [AmenityKey, string] => amenity !== null);

  if (record.bed && !amenities.some(([key]) => key === "bed")) {
    amenities.unshift(["bed", record.bed]);
  }

  return {
    id: record.id,
    slug: slugify(record.title) || record.id,
    name: record.title,
    price: record.price,
    currency: "LKR",
    roomSize: "Stay",
    shortDescription:
      record.description.length > 160 ? `${record.description.slice(0, 157).trimEnd()}…` : record.description,
    fullDescription: record.description,
    heroImage: images[0] ?? "/festher-hero.jpg",
    images,
    amenities,
    capacity: record.sleeps,
    bedType: record.bed,
    highlights,
    details: [
      ...(record.sleeps ? [["Sleeps", `Up to ${record.sleeps} guests`] as [string, string]] : []),
      ...(record.bed ? [["Bed", record.bed] as [string, string]] : []),
      ...(record.checkIn && record.checkOut
        ? [["Check-in / Check-out", `${record.checkIn} / ${record.checkOut}`] as [string, string]]
        : []),
    ],
  };
}

export async function getAccommodations(): Promise<Accommodation[]> {
  const result = await apiRequest<AccommodationsResponse>(
    API_BASE_URL ? "/api/v1/accommodations" : "/api/accommodations",
  );
  return (Array.isArray(result?.data) ? result.data : [])
    .filter((record) => record && record.isActive !== false)
    .map(mapAccommodation);
}

export async function getAccommodation(id: string): Promise<Accommodation | undefined> {
  const rooms = await getAccommodations();
  return rooms.find((room) => room.id === id);
}

export async function getAccommodationBySlug(slug: string): Promise<Accommodation | undefined> {
  const rooms = await getAccommodations();
  return rooms.find((room) => room.slug === slug);
}