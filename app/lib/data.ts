import { sql } from "@vercel/postgres";
import { Product } from "./definitions";

export async function getProducts() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<Product>` select * from products`;
    return data.rows;
  } catch (error) {
    console.error("Error fetching product data", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
