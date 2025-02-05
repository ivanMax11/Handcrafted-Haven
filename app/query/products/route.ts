import { db } from "@vercel/postgres";

const client = await db.connect();

async function listProducts() {
    const data = await client.sql`
    SELECT * FROM products;`;

    return data.rows;
}

export async function GET() {

    try {
        return Response.json(await listProducts());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}