"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";


function AuthButton() {

  const { data: session } = useSession();


  if (session) {
    return (
      <>
        Welcome {session?.user?.name} <br />
        <button className="bg-[#e0e7ff] text-[#7672ec] p-2 rounded-lg m-2" onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      Not Signed in <br />
      <button className="bg-blue-700 text-white p-2 rounded-lg m-2" onClick={() => signIn()}>Sign In</button>
    </>
  );
}

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop/products",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "My Profile",
    href: "/myprofile",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-between items-center lg:mx-[10vw] mx-[8vw] py-[1vw] border-b border-solid border-gray-200">
        <Link className="text-blue-700 lg:text-2xl" href="/">
          Handcrafted
        </Link>
        <div className="hidden lg:flex space-x-4">
          {links.map((link) => {
            return (
              <Link
                className={clsx("text-gray-600", {
                  "bg-sky-100 text-blue-700": pathname === link.href,
                })}
                key={link.href}
                href={link.href}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="lg:hidden flex space-x-1">
          {links.map((link) => {
            return (
              <Link
                className={clsx("text-gray-600", {
                  "bg-sky-100 text-blue-700": pathname === link.href,
                })}
                key={link.href}
                href={link.href}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <AuthButton />
      </div>
    </>
  );
}
