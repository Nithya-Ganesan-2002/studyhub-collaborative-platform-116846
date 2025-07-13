"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  created_at?: string;
  is_active?: boolean;
}

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const id = localStorage.getItem("user_id");
      if (!id) return;
      try {
        const data = await apiFetch<User>(`/users/${id}`);
        setUser(data);
      } catch {
        // ignore error
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.username}!</h1>
      <p className="mb-4 text-gray-700">
        Manage your personal decks and notes, or browse what&apos;s being shared.
      </p>
      <ul className="mt-8 space-y-4">
        <li>
          <a href="/dashboard/decks" className="text-blue-600 hover:underline">
            My Decks
          </a>
        </li>
        <li>
          <a href="/dashboard/shared" className="text-green-600 hover:underline">
            Decks Shared With Me
          </a>
        </li>
        <li>
          <a href="/dashboard/search" className="text-orange-600 hover:underline">
            Search Decks/Notes
          </a>
        </li>
      </ul>
    </section>
  );
}
