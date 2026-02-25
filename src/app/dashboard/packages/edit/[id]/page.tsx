"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Plus, Trash2, Loader2 } from "lucide-react";

type PriceItem = {
  pax: number;
  price: number;
};
type PackageOptionType = {
  id: string;
  pax: number;
  pricePerPax: number;
  totalCost: number;
  packageId: string;
};

type PackageResponse = {
  id: string;
  title: string;
  description: string;
  duration: number;
  durationText?: string;
  itinerary?: string;
  include?: string;
  exclude?: string;
  imageUrl: string;
  isHighlighted: boolean;
  options: PackageOptionType[];
};

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [prices, setPrices] = useState<PriceItem[]>([{ pax: 1, price: 0 }]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    durationText: "",
    itinerary: "",
    include: "",
    exclude: "",
    isHighlighted: false,
  });

  const imageSrc = preview || existingImage || null;

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/packages/${id}`);
        if (!res.ok) {
          router.push("/dashboard/packages");
          return;
        }

        const data: PackageResponse = await res.json();

        setFormData({
          title: data.title,
          description: data.description,
          duration: String(data.duration),
          durationText: data.durationText || "",
          itinerary: data.itinerary || "",
          include: data.include || "",
          exclude: data.exclude || "",
          isHighlighted: data.isHighlighted ?? false,
        });

        setPrices(
          data.options?.map((opt) => ({
            pax: opt.pax,
            price: opt.pricePerPax,
          })) || [{ pax: 1, price: 0 }],
        );

        setExistingImage(data.imageUrl || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, router]);

  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isHighlighted: e.target.checked,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
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

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    data.set("isHighlighted", String(formData.isHighlighted));
    data.set("prices", JSON.stringify(prices));

    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        router.push("/dashboard/packages");
        router.refresh();
      } else {
        alert("Failed to update package");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-stone-200">
      <h2 className="font-serif text-3xl font-bold mb-6">Edit Package</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div className="grid gap-2">
          <Label>Package Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="grid gap-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* DURATION NUMBER */}
        <div className="grid gap-2">
          <Label>Duration (Days - Number)</Label>
          <Input
            name="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        {/* DURATION TEXT */}
        <div className="grid gap-2">
          <Label>Duration Text</Label>
          <Input
            name="durationText"
            value={formData.durationText}
            onChange={handleChange}
            required
          />
        </div>

        {/* HIGHLIGHT */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isHighlighted}
            onChange={handleCheckboxChange}
          />
          <label>Highlight this package</label>
        </div>

        {/* ITINERARY */}
        <div className="grid gap-2">
          <Label>Itinerary</Label>
          <Textarea
            name="itinerary"
            rows={4}
            value={formData.itinerary}
            onChange={handleChange}
          />
        </div>

        {/* INCLUDE */}
        <div className="grid gap-2">
          <Label>Include</Label>
          <Textarea
            name="include"
            rows={3}
            value={formData.include}
            onChange={handleChange}
          />
        </div>

        {/* EXCLUDE */}
        <div className="grid gap-2">
          <Label>Exclude</Label>
          <Textarea
            name="exclude"
            rows={3}
            value={formData.exclude}
            onChange={handleChange}
          />
        </div>

        {/* PRICING TIERS */}
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

        {/* IMAGE */}
        <div className="grid gap-2">
          <Label>Package Image</Label>
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageSrc && (
            <div className="relative w-full h-40 border rounded overflow-hidden">
              <Image
                src={imageSrc}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        <Button type="submit" disabled={saving} className="w-full">
          {saving ? "Updating..." : "Update Package"}
        </Button>
      </form>
    </div>
  );
}
