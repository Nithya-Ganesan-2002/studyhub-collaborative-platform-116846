"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { STUDYHUB_COLORS } from "@/lib/theme";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await apiFetch("/users/", {
        method: "POST",
        body: form,
      });
      router.push("/auth/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Could not register");
      } else {
        setError("Could not register");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--soft)] p-8 shadow rounded-lg flex flex-col gap-3 min-w-[320px]"
        style={{ borderColor: STUDYHUB_COLORS.secondary }}
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Register for StudyHub</h1>
        <input
          name="username"
          required
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded"
        />
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
          className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
          type="submit"
        >
          Register
        </button>
        <p className="text-gray-500 text-center">
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
