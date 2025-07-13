import Link from "next/link";
import { STUDYHUB_COLORS } from "@/lib/theme";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-[var(--foreground)] p-4 gap-6">
      <h1 className="text-4xl font-bold mb-3" style={{ color: STUDYHUB_COLORS.primary }}>
        StudyHub
      </h1>
      <h2 className="text-lg mb-5 max-w-xl text-center text-gray-700">
        Organize, share, and collaborate on study notes & decks.
      </h2>
      <div className="flex gap-4">
        <Link href="/auth/login" className="rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
          Login
        </Link>
        <Link href="/auth/register" className="rounded px-4 py-2 bg-green-500 text-white hover:bg-green-600">
          Register
        </Link>
      </div>
    </main>
  );
}
