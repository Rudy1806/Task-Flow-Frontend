"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
export default function LoginPage() {
  const router = useRouter();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

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

      const response =
        await AuthService.login({
          email,
          password,
        });

      const token =
        response.access_token;

      localStorage.setItem(
        "access_token",
        token
      );

      const me =
        await AuthService.me();

      setAuth(
        me.user,
        token
      );

      router.push(
        "/dashboard"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md border border-neutral-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          Login
        </h1>

        <p className="text-neutral-500 mb-6 tesxt-black">
          Welcome back to TaskFlow
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
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



            <p className="text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="font-semibold">
                    Register
                </Link>
                </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg p-3 text-black"
          >

            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}