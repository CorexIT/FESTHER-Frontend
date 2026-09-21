export type OfferType = "STAY" | "DINING" | "PACKAGE";

export interface Offer {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  type: OfferType;
  image: string;
  originalPrice?: number;
  offerPrice?: number;
  discountPercentage?: number;
  currency?: string;
  accommodationId?: string;
  diningItemId?: string;
  startDate?: string;
  endDate?: string;
  active: boolean;
  featured?: boolean;
}

export type AmenityKey = "breakfast" | "veranda" | "garden" | "air" | "family" | "bed";

export interface Accommodation {
  id: string;
  slug: string;
  name: string;
  roomSize: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  images: string[];
  amenities: [AmenityKey, string][];
  capacity?: number;
  bedType?: string;
  highlights?: string[];
  details?: [string, string][];
}

export interface DiningItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price?: number;
  currency?: string;
  available: boolean;
  featured?: boolean;
  dietary?: string[];
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price?: number;
  currency?: string;
  available: boolean;
  featured?: boolean;
  dietary?: string[];
  highlights?: string[];
}

export interface BookingRequest {
  accommodationId: string;
  offerId?: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests?: string;
}

export interface RestaurantReservationRequest {
  offerId?: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface OrderItemInput {
  diningItemId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRequest {
  offerId?: string;
  items: OrderItemInput[];
  customerName: string;
  phone: string;
  email?: string;
  notes?: string;
  subtotal: number;
  discount: number;
  total: number;
}

export type OrderItem = {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
};

export type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";

export type OrderStatus = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";

export interface RestaurantOrder {
  id?: string;
  customerName: string;
  phone: string;
  email?: string;
  items: OrderItem[];
  specialInstructions?: string;
  orderType?: OrderType;
  subtotal: number;
  discount: number;
  total: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface ApiResult<T = undefined> {
  success: boolean;
  message?: string;
  reference?: string;
  data?: T;
}

export type ApiStatus = "idle" | "loading" | "success" | "error";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface GuestReview {
  id: string;
  name: string;
  email?: string;
  country?: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface ReviewInput {
  name: string;
  email: string;
  rating: number;
  comment: string;
  country?: string;
}