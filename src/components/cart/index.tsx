import CartItems from "./CartItems";
import { useCart } from "../../providers/CartContext";

const Cart = () => {
  const { cartItems, updateCartItems } = useCart();

  const updateQuantity = (id: number, value: number) => {
    const newProducts = [...cartItems];
    const productIndex = newProducts.findIndex((pro) => pro.id === id);

    if (productIndex === -1) return;

    const targetProduct = newProducts[productIndex];
    newProducts[productIndex] = {
      ...targetProduct,
      quantity: targetProduct.quantity + value,
    };

    updateCartItems(newProducts);
  };

  const incrementQuantity = (id: number) => {
    updateQuantity(id, 1);
  };

  const decrementQuantity = (id: number) => {
    updateQuantity(id, -1);
  };

  return (
    <div className="overflow-x-auto custom-container py-10">
      {cartItems.length ? (
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>description</th>
              <th>Quantity</th>
              <th>price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <CartItems
                key={product.id}
                product={product}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-48">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ff8f00"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>
          <span className="font-bold text-xl">Cart Items Empty</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
