"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

type PriceItem = {
  pax: number;
  price: number;
};

export default function AddPackage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [prices, setPrices] = useState<PriceItem[]>([{ pax: 1, price: 0 }]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handlePriceChange = (
    index: number,
    field: "pax" | "price",
    value: string,
  ) => {
    const newPrices = [...prices];
    newPrices[index][field] = Number(value);
    setPrices(newPrices);
  };

  const addPriceRow = () => {
    setPrices([...prices, { pax: prices.length + 1, price: 0 }]);
  };

  const removePriceRow = (index: number) => {
    if (prices.length > 1) {
      setPrices(prices.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("isHighlighted", String(isHighlighted));
    formData.set("prices", JSON.stringify(prices));

    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/dashboard/packages");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to create package");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-stone-200">
      <h2 className="font-serif text-3xl font-bold mb-6">Add New Package</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Package Title</Label>
          <Input id="title" name="title" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} required />
        </div>

        {/* DURATION NUMBER */}
        <div className="grid gap-2">
          <Label htmlFor="duration">Duration (Days - Number)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            min="1"
            placeholder="4"
            required
          />
        </div>

        {/* DURATION TEXT */}
        <div className="grid gap-2">
          <Label htmlFor="durationText">Duration Text (Display)</Label>
          <Input
            id="durationText"
            name="durationText"
            placeholder="4 Day 3 Night"
            required
          />
        </div>

        {/* ✅ FIXED CHECKBOX */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isHighlighted}
            onChange={(e) => setIsHighlighted(e.target.checked)}
          />
          <label>Highlight this package</label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="itinerary">Itinerary</Label>
          <Textarea id="itinerary" name="itinerary" rows={4} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="include">Include</Label>
          <Textarea id="include" name="include" rows={3} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="exclude">Exclude</Label>
          <Textarea id="exclude" name="exclude" rows={3} />
        </div>

        <div className="border p-4 rounded-md space-y-4 bg-stone-50">
          <div className="flex justify-between items-center">
            <Label className="font-semibold">Pricing Tiers</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addPriceRow}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Tier
            </Button>
          </div>

          {prices.map((item, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Pax</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.pax}
                  onChange={(e) =>
                    handlePriceChange(index, "pax", e.target.value)
                  }
                  required
                />
              </div>

              <div className="flex-1">
                <Label>Price (IDR)</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) =>
                    handlePriceChange(index, "price", e.target.value)
                  }
                  required
                />
              </div>

              {prices.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removePriceRow(index)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image">Package Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {preview && (
            <div className="relative w-full h-40 border rounded overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Package"}
        </Button>
      </form>
    </div>
  );
}
