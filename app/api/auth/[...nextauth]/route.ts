import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authoptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
};

export const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };












// import NextAuth from "next-auth";
// import type { DefaultSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { db } from "@vercel/postgres";

// // Extend the built-in session type
// declare module "next-auth" {
//     interface Session extends DefaultSession {
//         user: {
//             id: string;
//         } & DefaultSession["user"]
//     }
// }

// interface User {
//     id: string;
//     email: string;
//     password: string;
//     name: string;
//     username: string;
//     full_name: string;
//     bio: string;
//     profile_picture: string;
//     is_artisan: boolean;
// }

// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: {
//                     label: "Email",
//                     type: "email",
//                     placeholder: "Enter your email"
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password",
//                     placeholder: "Enter your password"
//                 },
//             },


//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Missing credentials");
//                 }

//                 try {
//                     // Get client from the pool
//                     const client = await db.connect();

//                     try {
//                         // Query user from database
//                         const result = await client.query<User>(
//                             'SELECT * FROM users WHERE email = $1',
//                             [credentials.email]
//                         );

//                         const user = result.rows[0];

//                         // If no user found, return null
//                         if (!user) {
//                             return null;
//                         }
//                         // client.release(); // Release DB connection *after* getting the user data

//                         // Type checking and conversion for user.password (optional but good practice):
//                         if (typeof user.password !== 'string') {
//                             console.error("user.password is not a string:", user.password);
//                             return null; // Handle this case appropriately
//                         }
//                         // Validate password using bcrypt
//                         const passwordsMatch = await bcrypt.compare(String(credentials.password), user.password);
//                         if (!passwordsMatch) {
//                             console.log("Invalid password");
//                             return null;
//                         }

//                         // Return authenticated user data (Corrected)
//                         return {
//                             id: user.id,
//                             name: user.name,
//                             email: user.email,
//                             username: user.username,
//                             full_name: user.full_name,
//                             bio: user.bio,
//                             profile_picture: user.profile_picture,
//                             is_artisan: user.is_artisan,
//                         };
//                     } finally {
//                         // Always release the client back to the pool
//                         client.release();
//                     }
//                 } catch (error) {
//                     console.error("Error during authentication:", error);
//                     return null; // Important: Return null to indicate authentication failure
//                 }
//             },
//         }),
//     ],
//     pages: {
//         signIn: "/login", // Redirect to login page
//         error: "/auth/error",

//     },
//     session: {
//         strategy: "jwt", // Recommended for production
//     },
//     // Callbacks
//     // callbacks: {
//     //     async jwt({ token, user }) {
//     //         if (user) {
//     //             token.id = user.id;
//     //         }
//     //         return token;
//     //     },
//     //     async session({ session, token }) {
//     //         if (session.user) {
//     //             session.user.id = token.id as string;
//     //         }
//     //         return session;
//     //     },
//     // },
//     // Secret for JWT encryption
//     secret: process.env.NEXTAUTH_SECRET,
// });
// console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET); // Check your secret
// console.log("DB Connection Details:", process.env.POSTGRES_URL); // Check your DB connection details

// // Export Next.js API route handlers
// export { handler as GET, handler as POST };