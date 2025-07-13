"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

interface Deck {
  id: number;
  title: string;
  description: string;
  is_public: boolean;
  owner_id: number;
}

export default function DeckListPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDecks() {
      try {
        const user_id = localStorage.getItem("user_id");
        const url = user_id ? `/decks/?owner_id=${user_id}` : "/decks/";
        const res = await apiFetch<Deck[]>(url);
        setDecks(res);
      } catch {
        setDecks([]);
      }
      setLoading(false);
    }
    loadDecks();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Study Decks</h1>
      <Link href="/dashboard/decks/new" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 mb-6 inline-block">
        Add New Deck
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : decks.length === 0 ? (
        <div>No decks found.</div>
      ) : (
        <ul className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
          {decks.map((deck) => (
            <li key={deck.id} className="border rounded p-4 flex flex-col shadow-sm bg-white">
              <div className="font-semibold">{deck.title}</div>
              <div className="mb-2 text-gray-600 text-sm">{deck.description}</div>
              <div className="flex gap-2 mt-auto">
                <Link href={`/dashboard/decks/${deck.id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
                <Link href={`/dashboard/decks/${deck.id}/edit`} className="text-green-500 hover:underline">
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
