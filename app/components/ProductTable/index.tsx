"use client";

import { memo } from "react";
import { Product } from "@/app/types";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductTable = memo(function ProductTable(
  props: ProductTableProps
) {
  const { products, currentPage, totalPages, onPageChange } = props;

  return (
    <Card className="bg-white text-black dark:bg-gray-800 dark:text-white border rounded-lg dark:border-gray-700">
      <div className="px-4 py-2 flex items-center text-yellow-600 bg-yellow-100 border border-yellow-300 rounded-md mb-4">
        <AlertCircle className="mr-2 text-yellow-600" size={20} />
        <span className="text-sm font-medium">
          Filters applied here will also be reflected in the cards within the
          gallery tabs.
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {product.desc}
                </td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">Category {product.id_category}</td>
                <td className="px-6 py-4">{product.price || "N/A"}</td>
                <td className="px-6 py-4">{product.size || "N/A"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.status_active
                        ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {product.status_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Card>
  );
});
