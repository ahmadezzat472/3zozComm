import type { ProductData } from "../../types";
import { useCart } from "../../providers/CartContext";
import CartBtn from "./CartBtn";

interface ProductsCardProps {
  product: ProductData;
}
const ProductsCard = ({ product }: ProductsCardProps) => {
  const { cartItems } = useCart();
  const { id, img, price, title, description } = product;
  const isInCart = cartItems.some((item) => item.id === id);

  return (
    <div className="card card-sm bg-base-100 max-w-60 shadow">
      <figure className="h-60 w-full overflow-hidden rounded-xl relative">
        <img
          src={img}
          alt={`${title} preview`}
          className="w-full h-full object-cover transition duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex justify-between mt-5">
          <CartBtn isInCart={isInCart} product={product} />
          <span className="font-normal">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
