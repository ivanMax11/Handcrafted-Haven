import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@vercel/postgres";
import { AdapterUser, adaptedProfile } from "../../../lib/definitions";
import { User, Profile } from "next-auth";


const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/authenticated/login", // Custom login page


    },
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            //console.log("NextAuth Redirect URL:", url);
            //console.log("NextAuth Redirect Base URL:", baseUrl);
            return url.startsWith(baseUrl) ? url : baseUrl; // Ensure safe redirects
        },
        async signIn({ user, profile }: { user: User | AdapterUser; profile?: Profile | adaptedProfile; }) {
            //console.log("GitHub User (user):", user);
            //console.log("GitHub Account (account):", account);
            //console.log("GitHub Profile (profile):", profile);

            // Check if the user already exists in the database
            const client = await db.connect();

            try {
                const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [user.email]);
                if (existingUser.rows.length === 0) {

                    // Store the new user in the database
                    const bio = profile && "bio" in profile ? (profile as adaptedProfile).bio : null;
                    const profile_picture = profile && "avatar_url" in profile ? (profile as adaptedProfile).avatar_url : null;
                    await client.query('INSERT INTO users (username, email, password, full_name, bio, profile_picture) VALUES ($1, $2, $3, $4, $5, $6)', [user.name, user.email, "dummyPassword", user.name, bio, profile_picture]);
                    console.log("New user created in database:", user.email);
                } else {
                    console.log("User already exists in database:", user.email);
                }
            } catch (error) {
                console.error("Error storing user in database:", error);
                // Handle the error appropriately (e.g., throw an error, return false to prevent sign-in)
                throw error; // Or return false;
            } finally {
                client.release();
            }

            return true;
        },
    },


};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };