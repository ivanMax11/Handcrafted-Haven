import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

import { users, categories, products, comments } from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        full_name VARCHAR(100),
        bio TEXT,
        profile_picture TEXT,
        is_artisan BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  const insertUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (username, email, password, full_name, bio, profile_picture, is_artisan)
        VALUES (${user.username}, ${user.email}, ${hashedPassword}, ${user.full_name}, ${user.bio}, ${user.profile_picture}, ${user.is_artisan})
        ON CONFLICT (username) DO NOTHING;
      `;
    })
  );

  return insertUsers;
}

async function seedCategories() {
  await client.sql`CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
  )`;

  const insertCategories = await Promise.all(
    categories.map(async (category) => {
      return client.sql`
        INSERT INTO categories (name)
        VALUES (${category.name})
        ON CONFLICT (name) DO NOTHING;
      `;
    })
  );

  return insertCategories;
}

async function seedProducts() {
  await client.sql`CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      category_id INT REFERENCES categories(id) ON DELETE SET NULL,
      description TEXT,
      image_url TEXT,
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
      stock INT NOT NULL CHECK (stock >= 0),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  const insertProducts = await Promise.all(
    products.map(async (product) => {
      return client.sql`
        INSERT INTO products (user_id, name, category_id, description, image_url, price, stock)
        VALUES (${product.user_id}, ${product.name}, ${product.category_id}, ${product.description}, ${product.image_url}, ${product.price}, ${product.stock})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertProducts;
}

async function seedComments() {
  await client.sql`CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      comment_text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  const insertComments = await Promise.all(
    comments.map(async (comment) => {
      return client.sql`
        INSERT INTO comments (product_id, user_id, comment_text)
        VALUES (${comment.product_id}, ${comment.user_id}, ${comment.comment_text})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertComments;
}

export async function GET() {
  try {
    await client.sql`BEGIN`; // Start transaction

    await seedUsers();       // Step 1: Seed Users
    await seedCategories();  // Step 2: Seed Categories (needed before products)
    await seedProducts();    // Step 3: Seed Products (needs users & categories)
    await seedComments();    // Step 4: Seed Comments (needs users & products)

    await client.sql`COMMIT`; // Commit transaction

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`; // Rollback on error
    console.error("❌ Seeding error:", error);
    return Response.json({ error }, { status: 500 });
  }
}