import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth"; 
import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await db.connect();

  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      session.user.email,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    return NextResponse.json({
      name: user.full_name,
      email: user.email,
      bio: user.bio,
      avatar: user.profile_picture,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}
