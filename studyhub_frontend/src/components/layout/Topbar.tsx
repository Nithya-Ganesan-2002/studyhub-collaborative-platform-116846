"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    router.push("/auth/login");
  }

  return (
    <header className="w-full h-16 flex items-center px-6 justify-between bg-blue-600 text-white">
      <span className="font-bold tracking-wide text-lg">StudyHub</span>
      <div className="flex gap-3 items-center">
        <Link href="/dashboard/profile" className="hover:underline">
          Profile
        </Link>
        <button onClick={logout} className="bg-blue-700 rounded px-3 py-1 ml-2 hover:bg-blue-900">
          Logout
        </button>
      </div>
    </header>
  );
}
