"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/packages", label: "Packages" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NavbarPremium() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-xl bg-white/70 border-b border-stone-200">
        <div className="container flex h-20 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={40}
                height={20}
                className="object-contain group-hover:scale-105 transition"
                priority
              />
            </div>

            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
              Story<span className="text-red-800">sumba</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-stone-600 hover:text-primary",
                  )}
                >
                  {link.label}

                  {isActive && (
                    <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-linear-to-r from-primary to-stone-800 rounded-full" />
                  )}
                </Link>
              );
            })}

            <Link href="/login">
              <Button className="ml-4 bg-linear-to-r from-primary to-stone-800 hover:opacity-90 text-white px-6 rounded-full shadow-md transition">
                Admin Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="bg-white/95 backdrop-blur-xl border-none p-8"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col items-center gap-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl font-medium hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link href="/login">
                  <Button className="bg-linear-to-r from-primary to-stone-800 text-white px-8 py-6 rounded-full shadow-lg">
                    Admin Login
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
