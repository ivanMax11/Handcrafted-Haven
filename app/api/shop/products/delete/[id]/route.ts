import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // Adjust this based on your database setup

export async function DELETE(req: NextRequest) {
    try {
        // Extract ID from the request URL
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // Get last segment from URL
        const productId = Number(id);

        if (!productId) {
            return NextResponse.json({ error: "Invalid Product ID" }, { status: 400 });
        }

        // Connect to DB and delete product
        const result = await sql`
            DELETE FROM products WHERE id = ${productId} RETURNING *;
        `;

        if (!result.rowCount) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}