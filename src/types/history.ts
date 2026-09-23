import { StaticImageData } from "next/image";

export type OrderStatus = "completed" | "cancelled" | "preparing";

export type OrderFilterCategory = "All" | "Coffee" | "Food" | "Snacks";

export interface HistoryItemData {
  id: number;
  orderNumber: string;
  date: string;
  pDate: string;
  time: string;
  total: number;
  status: OrderStatus;
  category: Exclude<OrderFilterCategory, "All">;
  items: {
    id: number;
    name: string;
    pName: string;
    image: StaticImageData;
    quantity: number;
    price: number;
  }[];
}
