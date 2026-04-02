import { useState, useEffect, type ReactNode } from "react";
import type { CategoryData, ProductData } from "../../types";
import { supabase } from "../../types/utils/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import Input from "../Input";

interface OpenProductDrawerProps {
  children: ReactNode;
  labelClassName: string;
  categories?: CategoryData[];
  errorCat?: PostgrestError;
  product?: ProductData;
  onSuccess?: () => void;
  drawerId?: string;
}

type FormDataType = {
  title: string;
  description: string;
  categoryId: string;
  stock?: number | string;
  price?: number | string;
  img: string;
};

type FormErrorType = Partial<Record<keyof FormDataType, string>>;

const INITIAL_FORM_DATA: FormDataType = {
  description: "",
  title: "",
  categoryId: "",
  img: "/images/products/img-1.jpg",
  price: "",
  stock: "",
};

const OpenProductDrawer = ({
  children,
  labelClassName,
  categories,
  errorCat,
  product,
  onSuccess,
  drawerId = "my-drawer-5",
}: OpenProductDrawerProps) => {
  const isEditMode = !!product;

  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title ?? "",
        description: product.description ?? "",
        categoryId: String(product.categoryId ?? ""),
        stock: product.stock ?? "",
        price: product.price ?? "",
        img: product.img ?? "/images/products/img-1.jpg",
      });
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
    setFormErrors({});
  }, [product]);

  //* Handlers */
  const handleOnChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateForm = (data: FormDataType): FormErrorType => {
    const errors: FormErrorType = {};

    if (!data.title || !/^[A-Za-z][A-Za-z0-9-]{2,29}$/.test(data.title))
      errors.title =
        "Title must be 3-30 characters, letters, numbers or dash only.";

    if (!data.description || data.description.trim().length < 3)
      errors.description = "Description must be at least 3 characters.";

    if (!data.categoryId) errors.categoryId = "Please select a category.";

    if (!data.stock || Number(data.stock) <= 0)
      errors.stock = "Stock must be a positive number.";

    if (!data.price || Number(data.price) <= 0)
      errors.price = "Price must be a positive number.";

    return errors;
  };

  const closeDrawer = () => {
    const checkbox = document.getElementById(drawerId) as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      if (isEditMode && product) {
        // UPDATE
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", product.id);

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Product updated successfully.");
          onSuccess?.();
          closeDrawer();
        }
      } else {
        // INSERT
        const { data, error } = await supabase
          .from("products")
          .insert([formData])
          .select();

        if (error) {
          toast.error(error.message);
        } else if (data) {
          toast.success("Product added successfully.");
          setFormData(INITIAL_FORM_DATA);
          onSuccess?.();
          closeDrawer();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBtn = () => {
    setFormData(
      isEditMode && product
        ? {
            title: product.title ?? "",
            description: product.description ?? "",
            categoryId: String(product.categoryId ?? ""),
            stock: product.stock ?? "",
            price: product.price ?? "",
            img: product.img ?? "/images/products/img-1.jpg",
          }
        : INITIAL_FORM_DATA,
    );
    setFormErrors({});
    closeDrawer();
  };

  //* Renders */
  return (
    <div className="drawer drawer-end">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor={drawerId} className={`drawer-button ${labelClassName}`}>
          {children}
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <div className="mb-5">
            <h1 className="text-xl font-bold">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h1>
            <p className="text-primary">
              {isEditMode
                ? "Update the product details below."
                : "Fill in the details to add a new product."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              error={formErrors.title}
              type="text"
              required
              placeholder="Title"
              title="Only letters, numbers or dash"
              name="title"
              onChange={handleOnChangeInput}
              value={formData.title}
            />
            <Input
              error={formErrors.description}
              type="text"
              required
              placeholder="Description"
              title="Only letters, numbers or dash"
              name="description"
              onChange={handleOnChangeInput}
              value={formData.description}
            />
            <Input
              error={formErrors.stock}
              type="number"
              required
              placeholder="Enter the Count of Products"
              title="Positive number"
              name="stock"
              onChange={handleOnChangeInput}
              value={formData.stock}
            />
            <Input
              error={formErrors.price}
              type="number"
              required
              placeholder="Enter the Price"
              title="Positive number"
              name="price"
              onChange={handleOnChangeInput}
              value={formData.price}
            />

            {/* Category selector */}
            {errorCat ? (
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
                <span>{errorCat.message}</span>
              </div>
            ) : !categories ? (
              <section className="flex justify-center items-center">
                <span className="loading loading-spinner"></span>
              </section>
            ) : categories.length ? (
              <div>
                <select
                  className={`select select-primary w-full ${formErrors.categoryId ? "select-error" : ""}`}
                  onChange={handleOnChangeInput}
                  value={formData.categoryId}
                  name="categoryId"
                >
                  <option value="" disabled>
                    Pick a Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {formErrors.categoryId && (
                  <p className="text-error text-sm mt-1">
                    {formErrors.categoryId}
                  </p>
                )}
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
                <span className="font-bold text-xl">No categories</span>
              </div>
            )}

            <div className="space-x-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelBtn}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
};

export default OpenProductDrawer;
