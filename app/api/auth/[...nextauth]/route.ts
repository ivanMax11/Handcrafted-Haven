// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import { db } from "@vercel/postgres";
// import { AdapterUser, adaptedProfile } from "../../../lib/definitions";
// import { User, Profile } from "next-auth";


// const authOptions = {
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID ?? "",
//             clientSecret: process.env.GITHUB_SECRET ?? "",
//         }),
//     ],
//     pages: {
//         signIn: "/authenticated/login", // Custom login page


//     },
//     callbacks: {
//         async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
//             //console.log("NextAuth Redirect URL:", url);
//             //console.log("NextAuth Redirect Base URL:", baseUrl);
//             return url.startsWith(baseUrl) ? url : baseUrl; // Ensure safe redirects
//         },
//         async signIn({ user, profile }: { user: User | AdapterUser; profile?: Profile | adaptedProfile; }) {
//             //console.log("GitHub User (user):", user);
//             //console.log("GitHub Account (account):", account);
//             //console.log("GitHub Profile (profile):", profile);

//             // Check if the user already exists in the database
//             const client = await db.connect();

//             try {
//                 const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [user.email]);
//                 if (existingUser.rows.length === 0) {

//                     // Store the new user in the database
//                     const bio = profile && "bio" in profile ? (profile as adaptedProfile).bio : null;
//                     const profile_picture = profile && "avatar_url" in profile ? (profile as adaptedProfile).avatar_url : null;
//                     await client.query('INSERT INTO users (username, email, password, full_name, bio, profile_picture) VALUES ($1, $2, $3, $4, $5, $6)', [user.name, user.email, "dummyPassword", user.name, bio, profile_picture]);
//                     console.log("New user created in database:", user.email);
//                 } else {
//                     console.log("User already exists in database:", user.email);
//                 }
//             } catch (error) {
//                 console.error("Error storing user in database:", error);
//                 // Handle the error appropriately (e.g., throw an error, return false to prevent sign-in)
//                 throw error; // Or return false;
//             } finally {
//                 client.release();
//             }

//             return true;
//         },
//     },


// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
//import { AdapterUser, adaptedProfile } from "../../../lib/definitions";
import { User, Profile, Session, Account } from "next-auth";
//import { User, Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const authOptions = {
    strategy: "jwt",
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Authorize function called with credentials:", credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing email or password");
                    return null;
                }

                try {
                    const client = await db.connect();
                    console.log("Database connection established");

                    // Fetch user from PostgreSQL
                    const userResult = await client.query('SELECT * FROM users WHERE email = $1', [credentials.email]);
                    client.release(); // Release DB connection
                    console.log("Database connection released");

                    if (userResult.rows.length === 0) {
                        console.log("User not found for email:", credentials.email);
                        return null;
                    }

                    const user = userResult.rows[0];
                    console.log("User found:", user);

                    // Validate password using bcrypt
                    const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                    if (!passwordsMatch) {
                        console.log("Invalid password for user:", credentials.email);
                        return null;
                    }

                    console.log("Password validated for user:", credentials.email);

                    // Return authenticated user data
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        full_name: user.full_name,
                        bio: user.bio,
                        profile_picture: user.profile_picture,
                        password: user.password, // Include password
                        is_artisan: user.is_artisan // Include is_artisan
                    };
                } catch (error) {
                    console.error("Error during authentication:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/authenticated/login", // Custom login page
    },
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return url.startsWith(baseUrl) ? url : baseUrl; // Ensure safe redirects
        },
        async signIn({ user, account, profile, email }: {
            user: User;
            account: Account | null;
            profile?: Profile;
            email?: { verificationRequest?: boolean };
            credentials?: Record<string, unknown>;
        }) {
            const client = await db.connect();

            try {
                const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [user.email]);
                if (existingUser.rows.length === 0) {
                    const bio = profile && "bio" in profile ? (profile as Profile).bio : null;
                    const profile_picture = profile && "avatar_url" in profile ? (profile as Profile).avatar_url : null;
                    await client.query('INSERT INTO users (username, email, password, full_name, bio, profile_picture) VALUES ($1, $2, $3, $4, $5, $6)', [user.name, user.email, "dummyPassword", user.name, bio, profile_picture]);
                    console.log("New user created in database:", user.email);
                } else {
                    console.log("User already exists in database:", user.email);
                }
            } catch (error) {
                console.error("Error storing user in database:", error);
            } finally {
                client.release();
            }
            return true;
        },
        async jwt({ token, user }: { token: JWT; user?: User }) {
            console.log("🔑 JWT Callback - Before:", token);

            if (user) {
                token.id = Number(user.id); // Assign user ID to the token
                token.full_name = (user as User).full_name; // Assign full name
                console.log("JWT Token:", token); // 🛠️ Debug output

            }
            console.log("🔑 JWT Callback - After:", token);

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("🟢 Session Callback Called!");
            if (session?.user) {
                session.user.id = token.id;
                session.user.full_name = token.full_name as string; // Add full_name to the session
            }
            return session;
        },
    }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };