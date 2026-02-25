import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import NavbarPublic from "@/components/NavbarPublic"; // 🔥 tambahkan ini

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <>
      {/* 🔥 Navbar tetap muncul */}
      <NavbarPublic />

      <div className="flex h-screen bg-stone-100 pt-">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </>
  );
}
