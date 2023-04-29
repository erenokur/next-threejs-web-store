type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// this code will come from the backend
export const productList: Product[] = [
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
