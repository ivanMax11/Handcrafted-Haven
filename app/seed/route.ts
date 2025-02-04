import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

import { users, products } from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        image TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`;

  const insertUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
                INSERT INTO users (id, name, email, password, role)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
                ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertUsers;
}

async function seedProducts() {
  await client.sql`CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        category TEXT NOT NULL
    )`;

  await client.sql`CREATE TABLE reviews (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        userId UUID REFERENCES users(id) ON DELETE CASCADE,
        productId UUID REFERENCES products(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL
    )`;

  const insertProducts = await Promise.all(
    products.map(async (product) => {
      const insertProduct = await client.sql`
            INSERT INTO products (id, name, price, description, image, quantity)
            VALUES (${product.id}, ${product.name}, ${product.price}, ${product.description}, ${product.image}, ${product.quantity})
            ON CONFLICT (id) DO NOTHING;
        `;

      const insertReviews = await Promise.all(
        product.reviews.map(async (review) => {
          return client.sql`
                    INSERT INTO reviews (id, userId, productId, rating, comment)
                    VALUES (${review.id}, ${product.id}, ${review.rating}, ${review.comment})
                    ON CONFLICT (id) DO NOTHING;
                `;
        })
      );

      return [insertProduct, ...insertReviews];
    })
  );

  return insertProducts;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedProducts();

    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
