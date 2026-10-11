"use client";

import type { GuestReview } from "@/lib/types";

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const STAR_COUNT = [1, 2, 3, 4, 5];

export default function ReviewCard({ review }: { review: GuestReview }) {
  return (
    <figure className="rv-card">
      {review.rating ? (
        <div className="rv-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {STAR_COUNT.map((s) => {
            const rating = review.rating ?? 0;
            return (
              <span key={s} className={`rv-star${s <= rating ? " is-on" : ""}`} aria-hidden="true">
                ★
              </span>
            );
          })}
        </div>
      ) : null}
      <blockquote className="rv-quote">&ldquo;{review.comment}&rdquo;</blockquote>
      <figcaption className="rv-meta">
        &mdash; {review.name}
        {review.country ? <span className="rv-country"> / {review.country}</span> : null}
      </figcaption>
      <time className="rv-date" dateTime={review.createdAt}>
        {formatDate(review.createdAt)}
      </time>
    </figure>
  );
}