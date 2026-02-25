// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import PublicFooter from "@/components/PublicFooter";
import "./globals.css";
import NavbarPublic from "@/components/NavbarPublic"; // 🔥 tambahkan ini

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Storysumba - Premium Travel Experience",
  description: "Discover amazing destinations and book your dream vacation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-inter text-slate-900 bg-white antialiased">
        <NavbarPublic />
        <main className="min-h-screen">{children}</main>
        <PublicFooter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
