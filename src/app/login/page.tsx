"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/protected",
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 pb-30 px-10 pt-10 bg-white border-1 border-gray-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
      <p className="text-center font-semibold text-xl">Welcome Back To ECOMMERCE</p>
      <p className="text-center text-gray-600">The next gen business marketplace</p>
      <div className="">
        <span>Email</span>
        <input
          type="email"
          placeholder="Enter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
      </div>
      <div className="">
        <span>Password</span>
        <input
          type="password"
          placeholder="Enter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
      </div>
      <button
        onClick={handleLogin}
        className="cursor-pointer w-full uppercase bg-black text-white p-2 rounded"
      >
        Login
      </button>

      <div className="text-gray-500 text-center mt-4 justify-center items-center">Dont Have An Account?
        <Link href='/signup' className="text-gray-900 font-semibold uppercase hover:underline">Sign up</Link>
      </div>
    </div>
  );
}
