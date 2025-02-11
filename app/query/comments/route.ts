import { db } from "@vercel/postgres";

const client = await db.connect();

async function listComments() {
  const data = await client.sql`
    SELECT * FROM comments;`;

  return data.rows;
}

async function createComment(comment: string) {
  const data = await client.sql`
    INSERT INTO comments (comment) VALUES (${comment}) RETURNING *;`;

  return data.rows[0];
}

export async function GET() {
  try {
    return Response.json(await listComments());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST({ body }: { body: { comment: string } }) {
  try {
    return Response.json(await createComment(body.comment), { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
