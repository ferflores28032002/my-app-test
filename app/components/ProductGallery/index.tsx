"use client";

import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/app/types";

interface ProductGalleryProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductGallery = memo(function ProductGallery(
  props: ProductGalleryProps
) {
  const { products, currentPage, totalPages, onPageChange } = props;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-white text-black dark:bg-gray-800 dark:text-white border dark:border-gray-700 overflow-hidden rounded-lg shadow-sm"
          >
            <div className="relative aspect-square">
              <Image
                src={product.url_image || "/placeholder.svg"}
                alt={product.desc}
                fill
                className="rounded-t-lg object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">
                {product.desc || "N/A"}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                Brand: {product.brand || "N/A"}
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                Price: {product.price || "N/A"}
              </p>
              {product.variety && (
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                  Variety: {product.variety.join(", ") || "N/A"}
                </p>
              )}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  product.status_active
                    ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {product.status_active ? "Active" : "Inactive"}
              </span>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
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
    </>
  );
});
