"use server";

import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

export async function registerUser(formData: FormData) {
    try {
        const client = await sql.connect();

        // Extract form data
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const full_name = formData.get("full_name") as string;


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into DB
        const result = await client.sql`
      INSERT INTO users (username, email, password, full_name)
      VALUES (${username}, ${email}, ${hashedPassword}, ${full_name})
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, email;
    `;

        // If no user was inserted (due to conflict), return an error
        if (!result.rowCount) {
            return { error: "Username already exists." };
        }

        // Return inserted user details (without password)
        return { success: true, user: result.rows[0] };
    } catch (error) {
        console.error("Database error:", error);
        return { error: "Failed to register user." };
    }
}