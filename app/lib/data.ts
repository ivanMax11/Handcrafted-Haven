import { sql } from "@vercel/postgres";

export async function getProducts() {
  try {
    const client = await sql.connect();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await client.sql` select * from products`;
    client.release();
    return data.rows;
  } catch (error) {
    console.error("Error fetching product data", error);
    throw new Error("Failed to fetch invoice.");
  }
}
