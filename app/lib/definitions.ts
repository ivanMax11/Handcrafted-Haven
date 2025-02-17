export type Product = {
  user_id: number;
  name: string;
  category_id: number;
  description: string;
  image_url: string;
  price: number;
  stock: string;
  id: number;
};

export type Category = {
  id: number;
  name: string;
  image_url: string;
};
