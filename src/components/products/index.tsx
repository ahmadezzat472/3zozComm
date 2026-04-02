import { useEffect, useState } from "react";
import type { ProductData } from "../../types";
import ProductsCard from "./ProductCard";
import { supabase } from "../../types/utils/supabase";
import { useSearchParams } from "react-router";

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const activeCategory = Number(searchParams.get("categoryId"));

  //* Apis Handler */
  // const fetchProducts = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const res = await fetch("http://localhost:3000/products");

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch products");
  //     }

  //     const data = await res.json();
  //     setProducts(data);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("Something went wrong while fetching products");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  //* Effects */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        if (activeCategory) {
          const { data: products } = await supabase
            .from("products")
            .select()
            .eq("categoryId", activeCategory);
          if (products) {
            setProducts(products);
          }
        } else {
          const { data: products } = await supabase.from("products").select();
          if (products) {
            setProducts(products);
          }
        }
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
    fetchProducts();
  }, [activeCategory]);

  //* Renders */
  if (isLoading) {
    return (
      <section className="flex justify-center items-center">
        <span className="loading loading-spinner"></span>
      </section>
    );
  }

  if (error) {
    return (
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
    );
  }

  return products.length ? (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
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
      <span className="font-bold text-xl">No data</span>
    </div>
  );
};

export default Products;
