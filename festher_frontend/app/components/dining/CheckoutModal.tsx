"use client";

import { useState, type FormEvent } from "react";
import Modal from "../offers/Modal";
import Field from "../offers/Field";
import { useSubmit } from "../offers/useSubmit";
import { createOrder } from "@/services/orders.service";
import { formatPrice } from "@/lib/format";
import { validateOrder } from "@/lib/validators";
import { summarizeCart, type CartLine } from "./cart";
import type { Offer, OrderRequest } from "@/lib/types";

interface CheckoutModalProps {
  lines: CartLine[];
  offers: Offer[];
  onClose: () => void;
  onPlaced: () => void;
}

export default function CheckoutModal({ lines, offers, onClose, onPlaced }: CheckoutModalProps) {
  const { status, error, reference, run } = useSubmit();
  const loading = status === "loading";
  const failed = status === "error";
  const summary = summarizeCart(lines, offers);
  const [form, setForm] = useState({ customerName: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placedName, setPlacedName] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateOrder(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const payload: OrderRequest = {
      items: lines.map((line) => ({
        diningItemId: line.item.id,
        quantity: line.qty,
        unitPrice: line.item.price ?? 0,
      })),
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      notes:
        [
          form.notes.trim(),
          ...lines
            .filter((line) => line.notes && line.notes.trim())
            .map((line) => `${line.item.name}: ${line.notes?.trim()}`),
        ]
          .filter(Boolean)
          .join(" | ") || undefined,
      subtotal: summary.subtotal,
      discount: summary.discount,
      total: summary.total,
    };
    setPlacedName(form.customerName.trim());
    const ok = await run(() => createOrder(payload));
    if (ok) onPlaced();
  };

  return (
    <Modal
      onClose={onClose}
      kicker="Order"
      title="Complete Your Order"
      subtitle={`${summary.count} item${summary.count === 1 ? "" : "s"} — ${formatPrice(summary.total, summary.currency) ?? ""}`}
      wide
    >
      {status === "success" ? (
        <div className="of-success">
          <span className="of-check" aria-hidden="true">
            ✓
          </span>
          <h3>Order Requested</h3>
          <p>Thank you, {placedName.split(" ")[0] || "friend"}. Your order has been received.</p>
          {reference ? <span className="of-ref">Reference {reference}</span> : null}
          <p>{reference ? "Keep this reference for your records." : "Our team will confirm your order by email."}</p>
          <div className="of-success-actions">
            <button type="button" className="of-btn of-btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <form className="of-form" onSubmit={submit} noValidate>
          <div className="of-summary of-span-2">
            {lines.map((line) => (
              <div className="of-summary-row" key={line.item.id}>
                <span className="of-summary-name">
                  {line.item.name} × {line.qty}
                </span>
                <span className="of-summary-unit">
                  {formatPrice((line.item.price ?? 0) * line.qty, line.item.currency)}
                </span>
              </div>
            ))}
            <div className="of-totals">
              <div className="of-totals-row">
                <span>Subtotal</span>
                <span>{formatPrice(summary.subtotal, summary.currency)}</span>
              </div>
              {summary.discount > 0 ? (
                <div className="of-totals-row of-totals-row--discount">
                  <span>Offer discount</span>
                  <span>{formatPrice(-summary.discount, summary.currency)}</span>
                </div>
              ) : null}
              <div className="of-totals-row of-totals-row--total">
                <span>Total</span>
                <span>{formatPrice(summary.total, summary.currency)}</span>
              </div>
            </div>
          </div>

          <Field id="dine-co-name" label="Full name" error={errors.customerName} span>
            <input
              id="dine-co-name"
              className="of-input"
              type="text"
              autoComplete="name"
              value={form.customerName}
              onChange={(e) => set("customerName", e.target.value)}
              placeholder="Your full name"
            />
          </Field>
          <Field id="dine-co-phone" label="Phone" error={errors.phone}>
            <input
              id="dine-co-phone"
              className="of-input"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+94 7X XXX XXXX"
            />
          </Field>
          <Field id="dine-co-email" label="Email (optional)" error={errors.email}>
            <input
              id="dine-co-email"
              className="of-input"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@email.com"
            />
          </Field>
          <Field id="dine-co-notes" label="Special requests (optional)" span>
            <textarea
              id="dine-co-notes"
              className="of-textarea"
              rows={2}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Allergies, preferences…"
            />
          </Field>

          {failed && error ? <p className="of-error-banner of-span-2">{error}</p> : null}

          <div className="of-form-actions of-span-2">
            {loading ? (
              <span className="of-processing">
                <span className="of-spinner" aria-hidden="true" />
                Processing…
              </span>
            ) : (
              <button type="submit" className="of-btn" disabled={loading}>
                Place Order
              </button>
            )}
            <p className="of-form-note">
              Prices shown are indicative and are recalculated by our team on confirmation. No payment is taken here.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}
