"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Plane,
  Package,
  FileText,
  Car,
  DollarSign,
  BarChart,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MenuItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Plane },
  { href: "/dashboard/packages", label: "Packages", icon: Package },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/finance/trips", label: "Trip Finance", icon: DollarSign },
  {
    href: "/dashboard/finance/rent-cars",
    label: "Rent Car Finance",
    icon: Car,
  },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "bg-stone-900 text-white min-h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-stone-800">
        {!collapsed && <h1 className="font-serif text-2xl font-bold">Admin</h1>}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-stone-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded transition-all",
                  isActive ? "bg-primary text-white" : "hover:bg-stone-800",
                )}
              >
                <Icon className="h-5 w-5" />

                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-stone-800">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full text-white hover:bg-stone-800",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
