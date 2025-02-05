import { db } from "@vercel/postgres";

const client = await db.connect();

async function listCategories() {
    const data = await client.sql`
    SELECT * FROM categories;`;

    return data.rows;
}

export async function GET() {

    try {
        return Response.json(await listCategories());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}