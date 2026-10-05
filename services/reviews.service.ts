import type { ApiResult, GuestReview } from "@/lib/types";
import { apiRequest } from "./config";

interface FeedbackApiRecord {
  id: string;
  customerName: string;
  feedback: string;
  createdAt: string;
}

function toGuestReview(feedback: FeedbackApiRecord): GuestReview {
  return {
    id: feedback.id,
    name: feedback.customerName,
    comment: feedback.feedback,
    status: "APPROVED",
    active: true,
    createdAt: feedback.createdAt,
  };
}

export async function getApprovedReviews(): Promise<GuestReview[]> {
  const result = await apiRequest<ApiResult<FeedbackApiRecord[]>>("/api/feedbacks");
  return (Array.isArray(result?.data) ? result.data : [])
    .filter(
      (feedback) =>
        feedback &&
        typeof feedback.customerName === "string" &&
        feedback.customerName.trim().length > 0 &&
        typeof feedback.feedback === "string" &&
        feedback.feedback.trim().length > 0,
    )
    .map(toGuestReview);
}
