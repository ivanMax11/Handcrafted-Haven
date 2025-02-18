"use client"

import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/actions";
import { signIn } from "next-auth/react";





// import Image from "next/image";

export const metadata: Metadata = {
  title: "Register",
};

//const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { };

export default function FormRegister() {
  const isRegistrationDisabled = false; // Set to true to disable registration

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Collect form data
    const formData = new FormData(e.currentTarget);

    // Call server action
    const response = await registerUser(formData);

    if (response.error) {
      setError(response.error);
      setIsSubmitting(false);
    } else {
      // ✅ Automatically sign in the user after registration
      const signInResponse = await signIn("credentials", {
        redirect: false, // Don't redirect yet, handle manually
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (signInResponse?.error) {
        setError("Login failed. Please try to log in manually.");
        setIsSubmitting(false);
      } else {
        router.push("/profile"); // ✅ Redirect to profile after login
      }
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <Link
              href="/authenticated/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {isRegistrationDisabled ? ( // Conditionally render the form or the message
              <div className="text-center text-gray-700">
                Registration with email and password is temporarily disabled.
                <br />
                Please create an account with GitHub.
                <Link href="/authenticated/login" className="font-medium text-blue-600 hover:text-blue-500 block mt-4">
                  Sign in with Github
                </Link>
              </div>
            ) : (

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="text"
                      name="full_name"
                      type="text"
                      autoComplete="text"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your name and Lastname"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="text"
                      name="username"
                      type="text"
                      autoComplete="text"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter a Username"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            )} {/* Closing the conditional rendering block */}
          </div>
        </div>
      </div>
    </main>
  );
}
