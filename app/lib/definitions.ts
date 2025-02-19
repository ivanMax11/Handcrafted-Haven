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

export type Comments = {
  id: number;
  product_id: number;
  user_id: number;
  comment_text: string;
  created_at: string;
};
export type adaptedProfile = {
  bio: string;
  avatar_url: string;
  full_name: string,

};

export type AdapterUser = {
  id: number;
  username: string,
  name: string, // GitHub name
  password: string,
  email: string,
  full_name: string,
  bio: string,
  profile_picture: string,
  is_artisan: boolean,

};

export type Session = {
  user: {
    id: string;
    full_name?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};