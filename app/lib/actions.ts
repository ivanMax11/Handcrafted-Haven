'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function uploadImage(file: File, userId: number) {
  //export async function uploadImage(file: File) {

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString()); // Send user ID to rename the file

    // Get the base URL from environment variables
    const baseUrl = process.env.NEXTAUTH_URL;

    const response = await fetch(`${baseUrl}/api/uploads`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const { imageUrl } = await response.json();
    return imageUrl; // The URL where the image is stored
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function createProduct(prevState: State, formData: FormData): Promise<{ message: string; errors?: any }> {


  console.log("formData in action:", formData);
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
      VALUES (${userId}, ${name}, ${categoryId}, ${description}, ${imageUrl}, ${price}, ${stock}, ${timeStamp})
    `;

    return { message: 'Product created successfully' }; // ✅ Ensure return type
  } catch (error) {
    console.log(error);
    return { message: 'Database error: Failed to create product.' }; // ✅ Return a consistent object
  }
}
// Revalidate the cache for the products page and redirect the user.
//revalidatePath('/shop/products');
// redirect('/shop/products');


//   export default function UploadingImage(imageUrl) {
//       const [imageUrl, setImageUrl] = useState(null);
//       const [selectedFile, setSelectedFile] = useState(null);

//       const handleImageChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!selectedFile) return;

//     try {
//       const url = await uploadImage(selectedFile);
//       setImageUrl(url);
//       // Now you have the imageUrl.  You can save it to your database.
//       console.log('Image URL:', url);

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
//       // Handle errors, display messages to the user, etc.
//       console.error(error);
//     }
//   }
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