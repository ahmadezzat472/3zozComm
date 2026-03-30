import type { CartItem } from "../../types";
import CartBtn from "../products/CartBtn";

interface CartItemsProps {
  product: CartItem;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

const CartItems = ({
  product,
  incrementQuantity,
  decrementQuantity,
}: CartItemsProps) => {
  const { title, id, stock, img, isInCart, price, description, quantity } =
    product;

  return (
    <tr className="text-center hover:bg-primary/10">
      <td>{id}</td>
      <td>
        <div className="flex items-center justify-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={img[0]} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">Hart Hagerty</div>
            <div className="text-sm opacity-50">United States</div>
          </div>
        </div>
      </td>
      <td>{title}</td>
      <td>{description}</td>
      <th>
        {stock < 0 ? (
          "Out of stock"
        ) : (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => decrementQuantity(id)}
              className={`btn btn-circle btn-xs text-black font-bold  ${quantity > 0 ? "bg-primary/80" : ""}`}
              disabled={quantity <= 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            {quantity}
            <button
              onClick={() => incrementQuantity(id)}
              className={`btn btn-circle btn-xs text-black font-bold ${quantity !== stock ? "bg-primary/80" : ""}`}
              disabled={quantity === stock}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        )}
      </th>
      <th>{price}</th>

      <th>
        <CartBtn mode="remove" product={product} isInCart={isInCart} />
      </th>
    </tr>
  );
};

export default CartItems;
