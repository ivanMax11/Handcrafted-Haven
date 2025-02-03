const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    lastName: "1",
    email: "user@nextmail.com",
    password: "123456",
    role: "user",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    name: "Admin",
    lastName: "2",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin",
  },
];

const products = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Product 1",
    price: 100,
    description: "Product 1 description here",
    image: "/hand(1).jpg",
    quantity: 10,
    reviews: [
      {
        id: "1",
        rating: 4,
        comment: "Good product",
      },
      {
        id: "2",
        rating: 2,
        comment: "Bad product",
      },
    ],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ab",
    name: "Product 2",
    price: 200,
    description: "Product 2 description here",
    image: "/hand(2).jpg",
    quantity: 20,
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "Great product",
      },
    ],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ac",
    name: "Product 3",
    price: 300,
    description: "Product 3 description here",
    image: "/hand(3).jpg",
    quantity: 30,
    reviews: [],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ad",
    name: "Product 4",
    price: 400,
    description: "Product 4 description here",
    image: "/hand(4).jpg",
    quantity: 40,
    reviews: [],
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81ae",
    name: "Product 5",
    price: 500,
    description: "Product 5 description here",
    image: "/hand(5).jpg",
    quantity: 50,
    reviews: [],
  },
];
export { products, users };
