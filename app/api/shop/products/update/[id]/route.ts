import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "../../../../../lib/actions";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        // Await params before using
        const { id } = await context.params;

        console.log("Received params:", id);

        if (!id) {
            return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
        }

        // Convert the ID to a number safely
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        const { name, description, price, stock } = body;

        if (!name || !description || isNaN(price) || isNaN(stock)) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        console.log("Updating product:", { productId, name, description, price, stock });

        // Prepare FormData (including productId)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        formData.append('productId', productId.toString());  // Add the productId to formData

        // Call update function with the updated formData
        const updatedProduct = await updateProduct(productId, formData);

        return NextResponse.json({ message: "Product updated successfully", product: updatedProduct }, { status: 200 });

    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}