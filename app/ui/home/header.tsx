"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (session) {
    return (
      <button
        className="bg-[#e0e7ff] text-[#7672ec] px-2  rounded-lg lg:p-2"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }

  return (
    <>
      <button
        className="bg-blue-700 text-white px-2 rounded-lg lg:p-2"
        onClick={() =>
          router.push(`/authenticated/login/?callbackUrl=${pathname}`)
        }
      >
        Sign In
      </button>
    </>
  );
}

export default function Header() {
  const { data: session } = useSession(); // Get session data inside Header
  const pathname = usePathname();

  const urlLoggin = session
    ? "/profile"
    : `/authenticated/login/?callbackUrl=/profile`;

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/products" },
    { name: "About", href: "/about" },
    { name: "Profile", href: urlLoggin },
  ];
  const linksMobible = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/products" },
    { name: "About", href: "/about" },
    { name: "Profile", href: urlLoggin },
  ];

  return (
    <>

      <div className="flex lg:justify-between justify-center items-center lg:mx-[10vw] mx-[8vw] py-[1vw] border-b border-solid border-gray-200">
        <Link className="hidden lg:block text-blue-700 lg:text-2xl" href="/">
          Handcrafted
        </Link>
        <div className="hidden lg:flex place-items-center space-x-4">
          {links.map((link) => (
            <Link
              className={clsx("text-gray-600", {
                "bg-sky-100 text-blue-700": pathname === link.href,
              })}
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
          <AuthButton />
        </div>

        <div className="lg:hidden flex space-x-2 justify-center ">
          {linksMobible.map((link) => (
            <Link
              className={clsx("text-gray-600", {
                "bg-sky-100 text-blue-700": pathname === link.href,
              })}
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
          <AuthButton />
        </div>
      </div>
    </>
  );
}
