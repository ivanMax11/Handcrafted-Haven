// import { sql } from "@vercel/postgres";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

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
