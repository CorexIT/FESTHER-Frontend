"use client";

import { useMemo, useState, type FormEvent } from "react";
import Modal from "./Modal";
import Field from "./Field";
import { useSubmit } from "./useSubmit";
import { createOrder } from "@/services/orders.service";
import { effectiveDiscount, formatPrice } from "@/lib/format";
import { validateOrder } from "@/lib/validators";
import type { DiningItem, Offer, OrderRequest } from "@/lib/types";

interface OrderModalProps {
  item: DiningItem;
  offer: Offer | null;
  onClose: () => void;
}

export default function OrderModal({ item, offer, onClose }: OrderModalProps) {
  const { status, error, reference, run } = useSubmit();
  const loading = status === "loading";
  const failed = status === "error";
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ customerName: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const unitPrice = item.price ?? 0;
  const discountPct = offer ? effectiveDiscount(offer) ?? 0 : 0;
  const subtotal = qty * unitPrice;
  const discount = Math.round(subtotal * (discountPct / 100));
  const total = Math.max(0, subtotal - discount);

  const currency = item.currency ?? "LKR";
  const summary = useMemo(
    () => ({
      subtotal: formatPrice(subtotal, currency),
      discount: discount > 0 ? formatPrice(-discount, currency) : null,
      total: formatPrice(total, currency),
    }),
    [subtotal, discount, total, currency],
  );

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateOrder(form);
    if (qty < 1) errs.qty = "Please select a quantity of at least one.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const payload: OrderRequest = {
      offerId: offer?.id,
      items: [{ diningItemId: item.id, quantity: qty, unitPrice }],
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      notes: form.notes.trim() || undefined,
      subtotal,
      discount,
      total,
    };
    await run(() => createOrder(payload));
  };

  return (
    <Modal
      onClose={onClose}
      kicker={offer ? offer.title : "Order"}
      title={item.name}
      subtitle={item.category ? `${item.category} — ordered from your table` : "Order from your table"}
    >
      {status === "success" ? (
        <div className="of-success">
          <span className="of-check" aria-hidden="true">
            ✓
          </span>
          <h3>Order Requested</h3>
          <p>
            Thank you, {form.customerName.split(" ")[0] || "friend"}. Your order for {item.name} ({qty} ×{" "}
            {formatPrice(unitPrice, currency)}) has been received.
          </p>
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
            <div className="of-summary-row">
              <span className="of-summary-name">{item.name}</span>
              <span className="of-summary-unit">{formatPrice(unitPrice, currency)}</span>
            </div>
            <div className="of-summary-qty">
              <span className="of-label">Quantity</span>
              <div className="of-qty">
                <button type="button" onClick={() => setQty((v) => Math.max(1, v - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span className="of-qty-value">{qty}</span>
                <button type="button" onClick={() => setQty((v) => v + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>
            </div>
            <div className="of-totals">
              <div className="of-totals-row">
                <span>Subtotal</span>
                <span>{summary.subtotal}</span>
              </div>
              {summary.discount ? (
                <div className="of-totals-row of-totals-row--discount">
                  <span>Offer discount ({discountPct}%)</span>
                  <span>{summary.discount}</span>
                </div>
              ) : null}
              <div className="of-totals-row of-totals-row--total">
                <span>Total</span>
                <span>{summary.total}</span>
              </div>
            </div>
          </div>

          <Field id="of-o-name" label="Full name" error={errors.customerName} span>
            <input
              id="of-o-name"
              className="of-input"
              type="text"
              autoComplete="name"
              value={form.customerName}
              onChange={(e) => set("customerName", e.target.value)}
              placeholder="Your full name"
            />
          </Field>
          <Field id="of-o-phone" label="Phone" error={errors.phone}>
            <input
              id="of-o-phone"
              className="of-input"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+94 7X XXX XXXX"
            />
          </Field>
          <Field id="of-o-email" label="Email (optional)" error={errors.email}>
            <input
              id="of-o-email"
              className="of-input"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@email.com"
            />
          </Field>
          <Field id="of-o-notes" label="Notes (optional)" span>
            <textarea
              id="of-o-notes"
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