import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

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
            console.log("NextAuth Redirect URL:", url);
            console.log("NextAuth Redirect Base URL:", baseUrl);
            return url.startsWith(baseUrl) ? url : baseUrl; // Ensure safe redirects
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };