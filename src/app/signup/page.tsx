"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 pb-30 px-10 pt-10 bg-white border-1 border-gray-600 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
      <div className="">
        <span>Name</span>
        <input
          type="string"
          placeholder="Enter"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
      </div>
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
        onClick={handleSignup}
        className="cursor-pointer w-full uppercase bg-black text-white p-2 rounded"
      >
        CREATE ACCOUNT
      </button>

      <div className="text-gray-500 text-center mt-4 justify-center items-center">Have An Account?
          <Link href='/login' className="text-gray-900 uppercase hover:underline"> Login</Link>
      </div>
    </div>
  );
}
