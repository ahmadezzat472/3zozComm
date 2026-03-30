import { createContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  toggleCartItem: (newItem: CartItem) => void;
  updateCartItems: (newItems: CartItem[]) => void;
  getCartLength: () => number;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const isItemExist = (id: number) => {
    return cartItems.findIndex((item) => id === item.id);
  };

  const updateCartItems = (newItems: CartItem[]) => {
    setCartItems(newItems);
  };

  const addToCart = (newItem: CartItem) => {
    if (isItemExist(newItem.id) == -1) {
      setCartItems((prev) => [...prev, newItem]);
    }
  };

  const toggleCartItem = (newItem: CartItem) => {
    if (isItemExist(newItem.id) == -1) {
      addToCart(newItem);
    } else {
      removeFromCart(newItem.id);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getCartLength = () => {
    return cartItems.length;
  };

  console.log(cartItems);

  return (
    <CartContext
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        toggleCartItem,
        updateCartItems,
        getCartLength,
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartProvider;
