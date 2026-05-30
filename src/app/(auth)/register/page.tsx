"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";
import Link from "next/link";
export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await AuthService.register({
        name,
        email,
        password,
      });

      router.push(
        "/login"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-blackx">
      <div className="w-full max-w-md border border-neutral-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-black">
          Register
        </h1>

        <p className="text-neutral-500 mb-6">
          Create your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded-lg p-3 text-black"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 text-black"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3 text-black"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold">
                Login
            </Link>
            </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg p-3 text-black"
          >
            {loading
              ? "Creating..."
              : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}