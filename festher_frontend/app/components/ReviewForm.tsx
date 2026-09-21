"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { submitReview } from "@/services/reviews.service";
import type { ReviewInput } from "@/lib/types";
import { validateReview } from "@/lib/validators";

interface ReviewFormProps {
  onClose: () => void;
}

type Stage = "form" | "submitting" | "done" | "error";

const emptyForm: ReviewInput = {
  name: "",
  email: "",
  rating: 0,
  comment: "",
  country: "",
};

const STAR_COUNT = [1, 2, 3, 4, 5];

export default function ReviewForm({ onClose }: ReviewFormProps) {
  const [form, setForm] = useState<ReviewInput>(emptyForm);
  const [hoverStar, setHoverStar] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewInput, string>>>({});
  const [stage, setStage] = useState<Stage>("form");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const rating = hoverStar || form.rating;

  const set = <K extends keyof ReviewInput>(key: K, value: ReviewInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validateReview(form);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStage("submitting");
    setErrorMsg("");
    try {
      await submitReview({
        name: form.name.trim(),
        email: form.email.trim(),
        rating: form.rating,
        comment: form.comment.trim(),
        country: (form.country ?? "").trim() || undefined,
      });
      setStage("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Could not submit your review. Please try again.");
      setStage("error");
    }
  };

  return createPortal(
    <div className="rv-overlay" onClick={onClose} role="presentation">
      <div
        className="rv-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Share your experience"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="rv-modal-close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>

        {stage === "done" ? (
          <div className="rv-success">
            <div className="rv-check" aria-hidden="true">
              ✓
            </div>
            <h3>Thank you</h3>
            <p>Thank you for sharing your experience. Your review will appear after approval.</p>
            <div className="rv-success-actions">
              <button type="button" className="rv-btn rv-btn--ghost" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="rv-modal-kicker">Guest stories</p>
            <h3 className="rv-modal-title">Share your experience</h3>
            <p className="rv-modal-sub">
              Tell us about your stay — a name, your honest words and a few stars. We publish reviews after a
              short approval.
            </p>

            <form className="rv-form" onSubmit={submit} noValidate>
              <div className="rv-field">
                <label className="rv-label" htmlFor="rv-name">
                  Name *
                </label>
                <input
                  id="rv-name"
                  className={`rv-input${errors.name ? " rv-input-error" : ""}`}
                  type="text"
                  value={form.name}
                  placeholder="Your full name"
                  onChange={(e) => set("name", e.target.value)}
                  disabled={stage === "submitting"}
                />
                {errors.name ? <span className="rv-field-error">{errors.name}</span> : null}
              </div>

              <div className="rv-field">
                <label className="rv-label" htmlFor="rv-email">
                  Email *
                </label>
                <input
                  id="rv-email"
                  className={`rv-input${errors.email ? " rv-input-error" : ""}`}
                  type="email"
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={(e) => set("email", e.target.value)}
                  disabled={stage === "submitting"}
                />
                {errors.email ? <span className="rv-field-error">{errors.email}</span> : null}
              </div>

              <div className="rv-field">
                <span className="rv-label" id="rv-rating-label">
                  Your rating *
                </span>
                <div
                  className="rv-fstars"
                  role="radiogroup"
                  aria-labelledby="rv-rating-label"
                  aria-label={`${rating} out of 5 stars`}
                >
                  {STAR_COUNT.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`rv-fstar${s <= rating ? " is-on" : ""}`}
                      aria-label={`${s} star${s > 1 ? "s" : ""}`}
                      aria-pressed={s <= form.rating}
                      onMouseEnter={() => setHoverStar(s)}
                      onMouseLeave={() => setHoverStar(0)}
                      onFocus={() => setHoverStar(s)}
                      onBlur={() => setHoverStar(0)}
                      onClick={() => set("rating", s)}
                      disabled={stage === "submitting"}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating ? <span className="rv-field-error">{errors.rating}</span> : null}
              </div>

              <div className="rv-field">
                <label className="rv-label" htmlFor="rv-country">
                  Country
                </label>
                <input
                  id="rv-country"
                  className="rv-input"
                  type="text"
                  value={form.country}
                  placeholder="e.g. United Kingdom"
                  onChange={(e) => set("country", e.target.value)}
                  disabled={stage === "submitting"}
                />
              </div>

              <div className="rv-field rv-span-2">
                <label className="rv-label" htmlFor="rv-comment">
                  Your review *
                </label>
                <textarea
                  id="rv-comment"
                  className={`rv-textarea${errors.comment ? " rv-input-error" : ""}`}
                  rows={4}
                  value={form.comment}
                  placeholder="What made your stay memorable?"
                  onChange={(e) => set("comment", e.target.value)}
                  disabled={stage === "submitting"}
                />
                {errors.comment ? <span className="rv-field-error">{errors.comment}</span> : null}
              </div>

              {stage === "error" && errorMsg ? (
                <p className="rv-error rv-span-2" role="alert">
                  {errorMsg}
                </p>
              ) : null}

              <div className="rv-form-actions rv-span-2">
                {stage === "submitting" ? (
                  <span className="rv-processing">
                    <span className="rv-spinner" aria-hidden="true" />
                    Submitting…
                  </span>
                ) : (
                  <button type="submit" className="rv-btn">
                    Submit Review
                  </button>
                )}
                <button
                  type="button"
                  className="rv-btn rv-btn--ghost"
                  onClick={onClose}
                  disabled={stage === "submitting"}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}