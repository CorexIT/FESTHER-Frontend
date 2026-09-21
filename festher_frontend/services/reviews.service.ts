// Public guest reviews service.
// Mirrors the pattern of the other public services (offers, bookings…): when no
// backend is configured it falls back to the shared admin comment store, so
// guest submissions appear as PENDING for moderation and only APPROVED items
// are shown publicly.
import type { ApiResult, GuestReview, ReviewInput } from "@/lib/types";
import { createComment, getComments } from "@/services/admin/comments.service";
import { apiRequest, delay, isBackendConfigured } from "./config";

import type { ReviewComment } from "./admin/comments.service";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function toGuestReview(c: ReviewComment): GuestReview {
  const status: GuestReview["status"] =
    c.status === "approved" ? "APPROVED" : c.status === "pending" ? "PENDING" : "REJECTED";
  return {
    id: c.id,
    name: c.name,
    rating: c.rating,
    comment: c.comment,
    status,
    createdAt: c.date,
  };
}

export async function getApprovedReviews(): Promise<GuestReview[]> {
  if (!isBackendConfigured()) {
    await delay(350);
    const all = await getComments();
    return all
      .filter(
        (c) =>
          c.status === "approved" &&
          c.name.trim().length > 0 &&
          c.comment.trim().length > 0 &&
          c.rating >= 1 &&
          c.rating <= 5
      )
      .map(toGuestReview);
  }
  const result = await apiRequest<ApiResult<{ items: GuestReview[] }>>("/api/reviews?status=APPROVED");
  return (result.data?.items ?? []).filter((r) => r.status === "APPROVED");
}

export async function submitReview(input: ReviewInput): Promise<GuestReview> {
  if (!isBackendConfigured()) {
    await delay(500);
    const created = await createComment({
      name: input.name.trim(),
      comment: input.comment.trim(),
      rating: input.rating,
      date: todayISO(),
      status: "pending",
    });
    return {
      ...toGuestReview(created),
      email: input.email.trim(),
      country: input.country?.trim() || undefined,
    };
  }
  const result = await apiRequest<ApiResult<{ review: GuestReview }>>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!result.data?.review) {
    throw new Error("Could not submit your review. Please try again.");
  }
  return result.data.review;
}