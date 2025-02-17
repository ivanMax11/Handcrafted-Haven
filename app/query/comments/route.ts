import { db } from "@vercel/postgres";

const client = await db.connect();

async function listComments() {
  const data = await client.sql`
    SELECT * FROM comments;`;

  return data.rows;
}

async function addComment(
  product_id: number,
  comment_text: string,
  user_id: number
) {
  try {
    const data = await client.sql`
      INSERT INTO comments (product_id, comment_text, user_id)
      VALUES (${product_id}, ${comment_text}, ${user_id})
      RETURNING *; -- Return the newly created comment
    `;
    return data.rows[0]; // Return the first row (the created comment)
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; // Re-throw the error to be caught by the handler
  }
}

export async function POST(req: Request) {
  try {
    const { product_id, comment_text, user_id } = await req.json();

    if (!product_id || !comment_text || !user_id) {
      return new Response(
        "Missing required fields (product_id, comment_text, user_id)",
        { status: 400 }
      );
    }

    const newComment = await addComment(product_id, comment_text, user_id);
    return Response.json(newComment, { status: 201 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 }); 
  }
}

export async function GET() {
  try {
    return Response.json(await listComments());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
