export type DeliveryMethodType = "pickup" | "delivery";
export type PaymentMethodType = "online" | "cash";

export interface OrderItem {
  id: number;
  name: string;
  pName: string;
  price: number;
  quantity: number;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  address: string;
}
