import { ReactNode } from "react";
import SidebarNav from "@/components/layout/SidebarNav";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 max-w-screen-lg mx-auto px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
