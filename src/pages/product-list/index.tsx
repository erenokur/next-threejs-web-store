import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// this code will come from the backend
const productList: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "This is the first product",
    price: 10,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is the second product",
    price: 20,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is the third product",
    price: 30,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Product 4",
    description: "This is the first product",
    price: 10,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Product 5",
    description: "This is the second product",
    price: 20,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Product 6",
    description: "This is the third product",
    price: 30,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const ProductList: React.FC = () => {
  const { user, getUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) {
      router.push("/");
    }
    console.log("user changed" + user);
  }, [user]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 py-8">
      {productList.map((product) => (
        <div
          key={product.id}
          className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
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
