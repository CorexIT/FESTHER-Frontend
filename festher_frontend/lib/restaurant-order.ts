import type { OrderRequest, RestaurantOrder } from "./types";
import { formatPrice } from "./format";

export type OrderSummary = Pick<RestaurantOrder, "items" | "subtotal" | "discount" | "total" | "currency">;

export function orderWhatsAppMessage(
  order: OrderSummary & Pick<OrderRequest, "customerName" | "phone" | "email" | "specialInstructions">,
  orderNumber?: string,
): string {
  return [
    "Hello FESTHER,", "", "I would like to place a restaurant order.", "",
    ...(orderNumber ? [`Order Number: ${orderNumber}`, ""] : []),
    "ORDER DETAILS", "",
    ...order.items.flatMap((item) => [
      item.name, `Quantity: ${item.quantity}`, `Unit Price: ${formatPrice(item.unitPrice, order.currency)}`,
      ...(item.notes ? [`Instructions: ${item.notes}`] : []), "",
    ]),
    `Subtotal: ${formatPrice(order.subtotal, order.currency)}`,
    ...(order.discount > 0 ? [`Discount: ${formatPrice(order.discount, order.currency)}`] : []),
    `Total: ${formatPrice(order.total, order.currency)}`, "", "CUSTOMER", "",
    `Name: ${order.customerName}`, `Phone: ${order.phone}`, `Email: ${order.email}`, "",
    "Special Instructions:", order.specialInstructions || "None", "",
    "Please confirm availability and my order.", "", "Thank you.",
  ].join("\n");
}

// Whitelist outbound fields: even a tampered caller cannot send prices or payment status.
export function orderPayload(request: OrderRequest): OrderRequest {
  if (!request.items.length || request.items.some((item) =>
    !item.menuItemId || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 99
  )) throw new Error("Please select between 1 and 99 of each dish.");
  return {
    customerName: request.customerName.trim(), email: request.email.trim(), phone: request.phone.trim(),
    specialInstructions: request.specialInstructions?.trim(), orderMethod: request.orderMethod,
    items: request.items.map(({ menuItemId, quantity, notes }) => ({ menuItemId, quantity, notes })),
    offerIds: request.offerIds,
    ...(request.orderMethod === "ONLINE" && request.billingAddress ? {
      billingAddress: {
        address: request.billingAddress.address.trim(), city: request.billingAddress.city.trim(),
        country: request.billingAddress.country.trim(),
      },
    } : {}),
  };
}

export function paymentView(order: RestaurantOrder): "paid" | "pending" | "failed" {
  if (order.paymentStatus === "PAID") return "paid";
  if (order.paymentStatus === "FAILED" || order.paymentStatus === "REFUNDED" ||
      order.paymentStatus === "UNPAID" || order.orderStatus === "CANCELLED") return "failed";
  return "pending";
}
