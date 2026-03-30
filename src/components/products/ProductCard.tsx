import type { ProductData } from "../../types";
import CartBtn from "./CartBtn";

interface ProductsCardProps {
  product: ProductData;
  toggleProductInCart: (id: number) => void;
}
const ProductsCard = ({ product, toggleProductInCart }: ProductsCardProps) => {
  const { img, price, title, description, isInCart } = product;

  return (
    <div className="card card-sm bg-base-100 max-w-60 shadow">
      <figure className="hover-gallery">
        {img.map((src, idx) => (
          <img key={idx} src={src} />
        ))}
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          {title}
          <span className="font-normal">${price}</span>
        </h2>
        <p>{description}</p>
        <CartBtn
          isInCart={isInCart}
          product={product}
          toggleProductInCart={toggleProductInCart}
        />
      </div>
    </div>
  );
};

export default ProductsCard;
