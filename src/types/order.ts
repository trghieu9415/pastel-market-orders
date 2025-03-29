
export type OrderStatus = "pending" | "shipped" | "delivered" | "completed";

export interface Buyer {
  id: string;
  name: string;
  avatar: string;
  rating?: number;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

export interface ShippingInfo {
  address: string;
  trackingCode?: string;
  carrier: string;
}

export interface Transaction {
  date: string;
  paymentMethod: string;
  amountReceived: number;
  platformFee: number;
}

export interface Order {
  id: string;
  product: Product;
  buyer: Buyer;
  status: OrderStatus;
  shipping: ShippingInfo;
  transaction: Transaction;
  createdAt: string;
}
