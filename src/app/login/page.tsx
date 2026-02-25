"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      const errorData = await res.json();
      setError(errorData.message || "Invalid email or password.");
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* HERO IMAGE */}
      <Image
        src="/images/hero1.jpg"
        alt="Travel Hero"
        fill
        priority
        className="object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* LOGIN CARD */}
      <Card className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/90 shadow-2xl border-0 rounded-2xl">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <Image
              src="/images/logo.jpg"
              alt="LuxeVoyage Logo"
              width={60}
              height={10}
              className="object-contain group-hover:scale-105 transition"
              priority
            />
          </div>

          <CardTitle className="text-3xl font-serif text-stone-900">
            Admin Login
          </CardTitle>

          <CardDescription>Sign in to access dashboard</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@travel.com"
                required
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="h-12 rounded-xl pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-stone-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </CardContent>

          <CardContent>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-400 text-white shadow-lg"
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </CardContent>
        </form>

        <CardContent className="text-center">
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-blue-600 transition"
          >
            Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
