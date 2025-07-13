"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { STUDYHUB_COLORS } from "@/lib/theme";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Example: replace with backend auth endpoint
      const resp = await apiFetch<{ token: string; user_id: number }>("/auth/login", {
        method: "POST",
        body: form,
      });
      localStorage.setItem("token", resp.token);
      localStorage.setItem("user_id", String(resp.user_id));
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Could not log in");
      } else {
        setError("Could not log in");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--soft)] p-8 shadow rounded-lg flex flex-col gap-3 min-w-[320px]"
        style={{ borderColor: STUDYHUB_COLORS.primary }}
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Login to StudyHub</h1>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          type="submit"
        >
          Login
        </button>
        <p className="text-gray-500 text-center">
          New? <Link href="/auth/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
