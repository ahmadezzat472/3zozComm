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
      <figure className="hover-gallery">
        {img.map((src, idx) => (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt={`${title} preview ${idx + 1}`}
          />
        ))}
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          {title}
          <span className="font-normal">${price}</span>
        </h2>
        <p>{description}</p>
        <CartBtn isInCart={isInCart} product={product} />
      </div>
    </div>
  );
};

export default ProductsCard;
