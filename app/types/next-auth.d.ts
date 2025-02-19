import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username: string,
            name: string, // GitHub name
            password: string,
            email: string,
            full_name: string,
            bio: string,
            profile_picture: string,
            is_artisan: boolean,
        } & DefaultSession["user"];
    }
}
declare module "next-auth" {
    interface Profile {
        bio?: string;
        avatar_url?: string;
    }
}

// Extending the main "next-auth" module
declare module "next-auth" {
    interface User {
        id: number | string;  // Allow both string and number
        username: string,
        name: string, // GitHub name
        password: string,
        email: string,
        full_name: string,
        bio: string,
        profile_picture: string,
        is_artisan: boolean,
        avatar?: string | null, // GitHub avatar
        location?: string | null,
        createdAt?: string | null,
        socialLinks?: socialLinks | null,
    }

    interface Session {
        user: User & DefaultSession["user"];
    }
}

//  Extending the JWT token
declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        full_name?: string;
    }
}