"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDYHUB_COLORS, LAYOUT } from "@/lib/theme";

const links = [
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/dashboard/decks", label: "Study Decks" },
  { href: "/dashboard/shared", label: "Shared Decks" },
  { href: "/dashboard/search", label: "Search" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside
      className="flex flex-col flex-shrink-0 pt-6 min-h-screen"
      style={{
        width: LAYOUT.sidebarWidth,
        background: "#f7fafc",
        borderRight: `1.5px solid #e5e7eb`,
      }}
    >
      <h2 className="font-bold px-6 mb-6 text-xl" style={{ color: STUDYHUB_COLORS.primary }}>
        StudyHub
      </h2>
      <nav>
        <ul className="flex flex-col gap-2 px-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block px-3 py-2 rounded transition font-medium ${
                  pathname === l.href
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-blue-50 text-gray-800"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
