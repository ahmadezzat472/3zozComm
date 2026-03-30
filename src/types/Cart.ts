import type { ProductData } from "./index";

export interface CartItem extends ProductData {
  quantity: number;
}
