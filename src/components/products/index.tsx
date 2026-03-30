import { useEffect, useState } from "react";
import type { ProductData } from "../../types";
import ProductsCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //* Apis Handler */
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3000/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while fetching products");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //* Effects */
  useEffect(() => {
    fetchProducts();
  }, []);

  //* Renders */
  if (isLoading) {
    return (
      <section className="custom-container flex justify-center items-center py-10">
        <span className="loading loading-spinner"></span>
      </section>
    );
  }

  if (error) {
    return (
      <section className="custom-container py-10">
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="custom-container py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
