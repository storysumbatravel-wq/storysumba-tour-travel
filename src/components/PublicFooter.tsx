// src/components/PublicFooter.tsx
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function PublicFooter() {
  const mahakaUrl =
    process.env.NEXT_PUBLIC_MAHAKA_URL ?? "https://mahakaattraction.id";
  return (
    <footer className="bg-stone-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">
                Story<span className="text-red-800">sumba</span>
              </span>
            </Link>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Jl. Rambu Duka, Kel. Prailiu, Kec. Kambera, Kab. Sumba Timur,
                NTT, Indonesia
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +62 812-4699-4982
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                storysumbatravel@gmail.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Permit */}
          <div>
            <h3 className="text-white font-medium mb-6 tracking-wide">
              Tourism Permit
            </h3>
            <div className="space-y-6">
              <div>
                <Image
                  src="/images/footer-2.jpg"
                  alt="Tourism Permit"
                  width={80}
                  height={40}
                  className="rounded"
                />
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-medium mb-6 tracking-wide">
              Subsidiary Of
            </h3>
            <div>
              <Link
                href={mahakaUrl}
                target="_blank"
                className="inline-block hover:opacity-80 transition"
              >
                <Image
                  src="/images/footer-1.jpg"
                  alt="Mahaka Attraction"
                  width={130}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>© 2025 storysumba. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-emerald-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-emerald-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
