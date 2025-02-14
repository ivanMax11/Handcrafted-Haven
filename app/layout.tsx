import type { Metadata } from "next";
import { roboto } from "./ui/fonts";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import SessionProvider from "./ui/SessionProvider";


export const metadata: Metadata = {
  title: "Handcrafted",
  description: "Handcrafted",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${roboto.className}  antialiased`}>
        <SessionProvider session={session}> {children} </SessionProvider>
      </body>
    </html>
  );
}
