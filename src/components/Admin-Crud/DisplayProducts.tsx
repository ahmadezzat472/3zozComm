import { useEffect, useState } from "react";
import type { CategoryData, ProductData } from "../../types";
import { supabase } from "../../types/utils/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import OpenProductDrawer from "./OpenProductDrawer";
import toast from "react-hot-toast";

interface DisplayProductsProps {
  categories?: CategoryData[];
  errorCat?: PostgrestError;
}

const DisplayProducts = ({ categories, errorCat }: DisplayProductsProps) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null,
  );
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(
    null,
  );

  //* Api Handlers */
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data: products, error } = await supabase
        .from("products")
        .select();
      if (error) throw new Error(error.message);
      if (products) setProducts(products);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while fetching products",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setDeletingId(productToDelete.id);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productToDelete.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product deleted successfully.");
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    }

    setDeletingId(null);
    setProductToDelete(null);

    // Close the modal
    const checkbox = document.getElementById(
      "delete_modal",
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  //* Effects */
  useEffect(() => {
    fetchProducts();
  }, []);

  //* Renders */
  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-48">
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

  console.log(selectedProduct);

  return (
    <div className="overflow-x-auto">
      {selectedProduct && (
        <OpenProductDrawer
          drawerId={"edit-drawer"}
          labelClassName="hidden"
          categories={categories}
          errorCat={errorCat}
          product={selectedProduct}
          onSuccess={() => {
            fetchProducts();
            setSelectedProduct(null);
          }}
        >
          <span />
        </OpenProductDrawer>
      )}

      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="text-error font-semibold">
              {productToDelete?.title}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="modal-action">
            <label htmlFor="delete_modal" className="btn btn-outline">
              Cancel
            </label>
            <button
              className="btn btn-error"
              onClick={handleDeleteConfirm}
              disabled={deletingId !== null}
            >
              {deletingId !== null ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="delete_modal">
          Close
        </label>
      </div>

      {products.length ? (
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.categoryId}</td>
                <td>
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{product.stock}</td>
                <td>${product.price}</td>
                <td className="flex gap-2">
                  <label
                    htmlFor="edit-drawer"
                    className="btn btn-sm btn-warning"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit
                  </label>

                  <label
                    htmlFor="delete_modal"
                    className="btn btn-sm btn-error"
                    onClick={() => setProductToDelete(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </label>
                </td>
              </tr>
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
          <span className="font-bold text-xl">No data</span>
        </div>
      )}
    </div>
  );
};

export default DisplayProducts;
