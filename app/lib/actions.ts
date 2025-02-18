'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//import { useState } from 'react';

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
    /*imageUrl?: string[];*/
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
    categoryId: '1',
    description: formData.get('description'),
    /*imageUrl: formData.get('imageUrl'),*/
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
  const {
    userId,
    name,
    /*categoryId,*/ description,
    /*imageUrl,*/ price,
    stock,
  } = productInfo.data;

  //test data ***********
  const imageUrl = '../public/handrafted 2.jpg';
  //const userId = 1;
  const categoryId = 1;

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

// async function uploadImage(file) {
//   try {
//     const formData = new FormData();
//     formData.append('file', file); // 'file' is the key your storage service expects.

//     const response = await fetch('/api/upload', { // Your API route
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json(); // Get error details if any
//       throw new Error(errorData.message || 'Image upload failed');
//     }

//     const { imageUrl } = await response.json(); // Get the URL from the API response
//     return imageUrl;

//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error; // Re-throw for handling in the component
//   }
// }

// export default function UploadingImage() {
//   const [imageUrl, setImageUrl] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleImageChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     try {
//       const url = await uploadImage(selectedFile);
//       setImageUrl(url);
//       // Now you have the imageUrl.  You can save it to your database.
//       console.log("Image URL:", url);

//       // Example: Saving to Database (using a separate API route)
//       const dbResponse = await fetch('/api/saveImage', {
//         method: 'POST',
//         body: JSON.stringify({ imageUrl: url }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!dbResponse.ok) {
//         throw new Error('Error saving image URL to database');
//       }

//       console.log('Image URL saved to database');

//     } catch (error) {
//        // Handle errors, display messages to the user, etc.
//       console.error(error);
//     }
//   };

// }

// *******************************************************

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
