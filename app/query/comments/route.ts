import { db } from "@vercel/postgres";

const client = await db.connect();

async function listComments() {
    const data = await client.sql`
    SELECT * FROM comments;`;

    return data.rows;
}

export async function GET() {

    try {
        return Response.json(await listComments());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}