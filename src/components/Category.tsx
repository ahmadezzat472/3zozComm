import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { CategoryData } from "../types";

const Category = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = Number(searchParams.get("categoryId"));

  const handleActiveCategory = (categoryId: number) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("categoryId", String(categoryId));
      return nextParams;
    });
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/category");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      setCategories(data);
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

  useEffect(() => {
    getCategories();
  }, []);

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

  return (
    <ul className="menu menu-vertical md:menu-horizontal bg-base-100 rounded-box">
      {categories.map((cat) => (
        <li key={cat.id}>
          <a
            className={activeCategory === cat.id ? "bg-primary/60 font-bold" : ""}
            onClick={() => handleActiveCategory(cat.id)}
          >
            {cat.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Category;
