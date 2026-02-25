"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  id: string;
  pax: number;
  pricePerPax: number;
  totalCost: number;
  packageId: string;
};

export default function PublicBookingForm({
  packageId,
  options,
  title,
}: {
  packageId: string;
  options: Option[];
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const handleOptionChange = (value: string) => {
    setSelectedOptionId(value);

    const selected = options.find((o) => o.id === value);
    if (selected) {
      setTotalAmount(selected.totalCost);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const selectedOption = options.find((o) => o.id === selectedOptionId);

    const payload = {
      customerName: formData.get("name"),
      phone: formData.get("phone"),
      startDate: formData.get("date"),
      packageName: `${title} (${selectedOption?.pax} Pax)`,
      totalAmount,
      packageId,
    };

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Booking successful! We will contact you shortly.");
        router.push("/packages");
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* FORM HEADER */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900">
          Reserve Your Trip
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Secure your seat in just a few steps.
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">Full Name</Label>
        <Input
          name="name"
          placeholder="Enter your full name"
          required
          className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Phone / WhatsApp
        </Label>
        <Input
          name="phone"
          placeholder="+62 812..."
          required
          className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Departure Date
        </Label>
        <Input
          name="date"
          type="date"
          required
          className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Pax Tier */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Select Pax Option
        </Label>
        <Select onValueChange={handleOptionChange} value={selectedOptionId}>
          <SelectTrigger className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40">
            <SelectValue placeholder="Choose pax option" />
          </SelectTrigger>

          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.id} value={o.id}>
                {o.pax} Pax — Rp {o.totalCost.toLocaleString("id-ID")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Total Payment Card */}
      {totalAmount > 0 && (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Total Payment</span>
            <span className="text-2xl font-bold text-primary">
              Rp {totalAmount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading || !selectedOptionId}
        className="w-full rounded-xl py-6 text-base font-semibold 
                   bg-linear-to-r from-primary to-primary/80 
                   hover:opacity-90 text-white shadow-lg transition"
      >
        {loading ? "Processing Booking..." : "Book This Trip"}
      </Button>

      {/* Trust Text */}
      <p className="text-xs text-center text-slate-400">
        🔒 Your information is safe and will only be used for booking
        confirmation.
      </p>
    </form>
  );
}
