'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Zod schema for validating the form data
const FormSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  stock: z
    .number()
    .int()
    .nonnegative({ message: 'Stock must be a non-negative integer' }),
});

export type State = {
  errors?: {
    productId?: string[];
    userId?: string[];
    name?: string[];
    categoryId?: string[];
    description?: string[];
    imageUrl?: string[];
    price?: string[];
    stock?: string[];
  };
  message?: string | null;
};

const CreateProduct = FormSchema.omit({ productId: true });

export async function createProduct(prevState: State, formData: FormData) {
  // Validate the form data using Zod schema
  const productInfo = CreateProduct.safeParse({
    productId: formData.get('productId'),
    userId: formData.get('userId'),
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    price: formData.get('price'),
    stock: formData.get('stock'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!productInfo.success) {
    return {
      errors: productInfo.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  // Prepare data for insertion into the database
  const { userId, name, categoryId, description, imageUrl, price, stock } =
    productInfo.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (user_id, name, category_id, description, image_url, price, stock, created_at)
      VALUES ( ${userId}, ${name}, ${categoryId}, ${description}, ${imageUrl}, ${price}, ${stock}, NOW())
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  // Revalidate the cache for the products page and redirect the user.
  revalidatePath('/shop/products');
  redirect('/shop/products');
}
=======

// export async function createComments() {
//   const { comment_text, product_id, user_id } = req.body;
//   try {
//     await sql`
//     INSERT INTO comments (product_id, user_id, comment_text) VALUES (${product_id}, ${user_id}, ${comment_text})`;
//   } catch (error) {
//     console.error(error);
//   }
//   revalidatePath("/shop/products");
//   redirect("/shop/products");
// }

