import React, { useEffect } from "react";
import { productList } from "./tempProducts";
import { useRouter } from "next/router";

const ProductList: React.FC = () => {
  const router = useRouter();

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-8">
      {productList.map((product) => (
        <div
          key={product.id}
          className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="relative h-48">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <div className="mt-1 text-lg text-gray-900">${product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
