// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import PublicFooter from "@/components/PublicFooter";
import NavbarPublic from "@/components/NavbarPublic";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* ===============================
   🌍 GLOBAL SEO METADATA
================================ */
export const metadata: Metadata = {
  metadataBase: new URL("https://storysumba.com"),

  title: {
    default: "Storysumba - Premium Travel Experience",
    template: "%s | Storysumba",
  },

  description:
    "Storysumba is a premium travel experience platform offering curated trips, cultural journeys, and unforgettable adventures in Sumba and beyond.",

  keywords: [
    "Sumba travel",
    "Luxury travel Indonesia",
    "Sumba tour package",
    "Premium travel Sumba",
    "Storysumba travel",
  ],

  authors: [{ name: "Storysumba Team" }],
  creator: "Storysumba",
  publisher: "Storysumba",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://storysumba.com",
  },

  openGraph: {
    title: "Storysumba - Premium Travel Experience",
    description:
      "Discover curated premium travel experiences in Sumba. Luxury journeys, cultural immersion, and unforgettable destinations.",
    url: "https://storysumba.com",
    siteName: "Storysumba",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // taruh di folder public
        width: 1200,
        height: 630,
        alt: "Storysumba Premium Travel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Storysumba - Premium Travel Experience",
    description: "Luxury travel experiences in Sumba and Indonesia.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/images/logo2.jpg",
  },

  verification: {
    google:
      "google-site-verification=K5ka712yewP8XkMXyAXDNq8yCV6HouGCZO_WM-lJlnU",
  },
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
