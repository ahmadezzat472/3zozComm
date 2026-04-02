import { useEffect, useState } from "react";
import DisplayProducts from "./DisplayProducts";
import { supabase } from "../../types/utils/supabase";
import type { CategoryData } from "../../types";
import type { PostgrestError } from "@supabase/supabase-js";
import OpenProductDrawer from "./OpenProductDrawer";

const AdminCrud = () => {
  const [categories, setCategories] = useState<CategoryData[]>();
  const [errorCat, setErrorCat] = useState<PostgrestError>();

  //* Effects */
  useEffect(() => {
    const getCategories = async () => {
      const { data: categories, error } = await supabase
        .from("category")
        .select();

      if (categories) setCategories(categories);
      if (error) setErrorCat(error);
    };

    getCategories();
  }, []);

  return (
    <section className="custom-container py-10">
      <DisplayProducts categories={categories} errorCat={errorCat}  />
      <div className="fixed bottom-8 right-10">
        <OpenProductDrawer
          errorCat={errorCat}
          categories={categories}
          labelClassName="btn btn-primary btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </OpenProductDrawer>
      </div>
    </section>
  );
};

export default AdminCrud;
