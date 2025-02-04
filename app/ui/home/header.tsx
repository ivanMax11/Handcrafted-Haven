"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

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
    name: "Sign In",
    href: "/authenticated/login",
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
      </div>
    </>
  );
}
