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
      <>
        Welcome {session?.user?.name} <br />
        <button
          className="bg-[#e0e7ff] text-[#7672ec] p-2 rounded-lg m-2"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <>
      Not Signed in <br />
      <button
        className="bg-blue-700 text-white p-2 rounded-lg m-2"
        onClick={() => router.push(`/authenticated/login/?callbackUrl=${pathname}`)}
      >
        Sign In
      </button>
    </>
  );
}

export default function Header() {
  const { data: session } = useSession(); // Get session data inside Header
  const pathname = usePathname();

  // ✅ Compute `urlLoggin` inside the Header component
  const urlLoggin = session ? "/profile" : `/authenticated/login/?callbackUrl=/profile`;

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop/products" },
    { name: "About", href: "/about" },
    { name: "My Profile", href: urlLoggin }, // ✅ Use the computed value here
  ];

  return (
    <>
      <div className="flex justify-between items-center lg:mx-[10vw] mx-[8vw] py-[1vw] border-b border-solid border-gray-200">
        <Link className="text-blue-700 lg:text-2xl" href="/">
          Handcrafted
        </Link>
        <div className="hidden lg:flex space-x-4">
          {links.map((link) => (
            <Link
              className={clsx("text-gray-600", { "bg-sky-100 text-blue-700": pathname === link.href })}
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="lg:hidden flex space-x-1">
          {links.map((link) => (
            <Link
              className={clsx("text-gray-600", { "bg-sky-100 text-blue-700": pathname === link.href })}
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <AuthButton />
      </div>
    </>
  );
}

// "use client";

// import Link from "next/link";
// import clsx from "clsx";
// import { usePathname, useRouter } from "next/navigation"; // ✅ Import useRouter
// import { signOut, useSession } from "next-auth/react";
// import { url } from "inspector";



// function AuthButton() {
//   const { data: session } = useSession();
//   const router = useRouter(); // ✅ Initialize router
//   const pathname = usePathname(); // Get the current route
//   console.log('pathname', pathname);

//   let urlLoggin: string;
  

//   if (session) {
//     urlLoggin = '/profile';
//     return (
//       <>
//         Welcome {session?.user?.name} <br />
//         <button
//           className="bg-[#e0e7ff] text-[#7672ec] p-2 rounded-lg m-2"
//           onClick={() => signOut()}
//         >
//           Sign Out
//         </button>
//       </>
//     );
//   }

//   urlLoggin = `/authenticated/login/?callbackUrl=${pathname}`;
//   return (
//     <>
//       Not Signed in <br />
//       <button
//         className="bg-blue-700 text-white p-2 rounded-lg m-2"
//         onClick={() => router.push(`/authenticated/login`)} // Pass current URL
//       >
//         Sign In
//       </button>
//     </>
//   );
// }



// const links = [
//   {
//     name: "Home",
//     href: "/",
//   },
//   {
//     name: "Shop",
//     href: "/shop/products",
//   },
//   {
//     name: "About",
//     href: "/about",
//   },
//   {
//     name: "My Profile",
//     href: `${urlLoggin}`,
//   },
// ];

// export default function Header() {
//   const pathname = usePathname();

//   return (
//     <>
//       <div className="flex justify-between items-center lg:mx-[10vw] mx-[8vw] py-[1vw] border-b border-solid border-gray-200">
//         <Link className="text-blue-700 lg:text-2xl" href="/">
//           Handcrafted
//         </Link>
//         <div className="hidden lg:flex space-x-4">
//           {links.map((link) => {
//             return (
//               <Link
//                 className={clsx("text-gray-600", {
//                   "bg-sky-100 text-blue-700": pathname === link.href,
//                 })}
//                 key={link.href}
//                 href={link.href}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//         </div>

//         <div className="lg:hidden flex space-x-1">
//           {links.map((link) => {
//             return (
//               <Link
//                 className={clsx("text-gray-600", {
//                   "bg-sky-100 text-blue-700": pathname === link.href,
//                 })}
//                 key={link.href}
//                 href={link.href}
//               >
//                 {link.name}
//               </Link>
//             );
//           })}
//         </div>
//         <AuthButton />
//       </div>
//     </>
//   );
// }
