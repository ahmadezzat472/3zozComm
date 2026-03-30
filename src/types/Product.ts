export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  img: string[];
  isInCart: boolean;
  categoryId: number;
}
