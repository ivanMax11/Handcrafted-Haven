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
};

export type Comments = {
  id: number;
  product_id: number;
  user_id: number;
  comment_text: string;
  created_at: string;
};
