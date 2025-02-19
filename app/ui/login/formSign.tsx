"use client";

import { Metadata } from "next";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "login",
};

export default function FormSign() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize the router
  const [callbackUrl, setCallbackUrl] = useState("/profile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("callbackUrl") || "/";
    setCallbackUrl(urlParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Login form submitted");
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl, // Use the callbackUrl from state
      });

      if (res?.error) {
        setError(res.error);
      } else {
        // Successful sign-in, redirect will be handled by NextAuth.js
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("An error occurred during sign in.");
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link
              href="/authenticated/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create an account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <p className="text-red-500">{error}</p>} {/* Error display */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email} // Controlled input
                    onChange={(e) => setEmail(e.target.value)} // Update state
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password} // Controlled input
                    onChange={(e) => setPassword(e.target.value)} // Update state
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => { console.log("Login button clicked"); }}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <button
                onClick={() => {
                  signIn("github", { callbackUrl }); // Use callbackUrl from state
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


// "use client";

// import { Metadata } from "next";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";



// export const metadata: Metadata = {
//   title: "login",
// };

// export default function FormSign() {
//   console.log("FormSign component is mounting...");
//   const searchParams = useSearchParams();
//   const [callbackUrl, setCallbackUrl] = useState("/profile"); // Default to home

//   // Run this effect whenever searchParams changes
//   useEffect(() => {
//     const urlParam = searchParams.get("callbackUrl") || "/";
//     console.log("Updated callbackUrl:", urlParam);
//     setCallbackUrl(urlParam);
//   }, [searchParams]); // Reacts to changes in searchParams
//   return (
//     <main>
//       <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600 max-w">
//             Or
//             <Link
//               href="/authenticated/register"
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               create an account
//             </Link>
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form className="space-y-6" action="#" method="POST">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Enter your password"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <button

//                 onClick={() => {
//                   console.log("Github Button clicked"); // Debugging log
//                   console.log("Logging in with callbackUrl:", callbackUrl); // Debugging log
//                   signIn("github", { callbackUrl });
//                 }}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Sign in with GitHub
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }