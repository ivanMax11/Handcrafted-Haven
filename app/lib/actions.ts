"use server";

import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
    try {
        const client = await sql.connect();

        // Extract form data
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const full_name = formData.get("full_name") as string;


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into DB
        const result = await client.sql`
      INSERT INTO users (username, email, password, full_name)
      VALUES (${username}, ${email}, ${hashedPassword}, ${full_name})
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, email;
    `;

        // If no user was inserted (due to conflict), return an error
        if (!result.rowCount) {
            return { error: "Username already exists." };
        }

        // Return inserted user details (without password)
        return { success: true, user: result.rows[0] };
    } catch (error) {
        console.error("Database error:", error);
        return { error: "Failed to register user." };
    }
}

'use server';


// Zod schema for validating the form data
const FormSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  categoryId: z.number().positive({
    message: 'Please select a category.',
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
  message: string;
};

const CreateProduct = FormSchema.omit({ productId: true });

export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file); // 'file' is the key your storage service expects.

    const response = await fetch('/api/upload', {
      // Your API route
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get error details if any
      throw new Error(errorData.message || 'Image upload failed');
    }

    const { imageUrl } = await response.json(); // Get the URL from the API response
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw for handling in the component
  }
}

export async function createProduct(prevState: State, formData: FormData) {
  
  console.log(formData);
  // Validate the form data using Zod schema
  const productInfo = CreateProduct.safeParse({
    productId: formData.get('productId'),
    userId: formData.get('userId'),
    name: formData.get('name'),
    categoryId: Number(formData.get('categoryId')),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!productInfo.success) {
    console.log('Validation failed');
    console.log(productInfo.error.flatten().fieldErrors);
    return {
      errors: productInfo.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }
  console.log('Validation successful');
  // Prepare data for insertion into the database
  const timeStamp = new Date().toISOString();
  const { userId, name, categoryId, description, imageUrl, price, stock } =
    productInfo.data;

  console.log(imageUrl);

  console.log('Going to add to the database now ');

  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (user_id, name, category_id, description, image_url, price, stock, created_at)
      VALUES ( ${userId}, ${name}, ${categoryId}, ${description}, ${imageUrl}, ${price}, ${stock}, ${timeStamp})
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
