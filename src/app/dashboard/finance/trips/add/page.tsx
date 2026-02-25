"use client";

import { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type PackageItem = {
  id: string;
  title: string;
  options: {
    id: string;
    pax: number;
    pricePerPax: number;
  }[];
};

type PriceOption = {
  id: string;
  pax: number;
  pricePerPax: number;
};

export default function AddTripPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState<PackageItem[]>([]);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");

  // Selection State
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState("");

  const [availablePrices, setAvailablePrices] = useState<PriceOption[]>([]);

  const [qtyPax, setQtyPax] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // 🔥 Fetch Packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");

        if (res.ok) {
          const data = await res.json();
          setPackages(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch packages", error);
      }
    };

    fetchPackages();
  }, []);

  // 🔥 When Package Change
  const handlePackageChange = (value: string) => {
    setSelectedPackageId(value);
    setSelectedPriceId("");
    setQtyPax(1);
    setTotalAmount(0);

    const selectedPkg = packages.find((p) => p.id === value);

    if (selectedPkg) {
      setAvailablePrices(selectedPkg.options || []);
    } else {
      setAvailablePrices([]);
    }
  };

  // 🔥 When Tier Change
  const handlePriceChange = (value: string) => {
    setSelectedPriceId(value);
  };

  // 🔥 Auto Calculate Total
  useEffect(() => {
    const selectedPrice = availablePrices.find((p) => p.id === selectedPriceId);

    if (selectedPrice && qtyPax > 0) {
      const total = selectedPrice.pricePerPax * qtyPax;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [qtyPax, selectedPriceId, availablePrices]);

  // 🔥 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selectedPkg = packages.find((p) => p.id === selectedPackageId);

    const selectedPrice = availablePrices.find((p) => p.id === selectedPriceId);

    if (!selectedPkg || !selectedPrice) {
      alert("Please select package and price tier");
      setLoading(false);
      return;
    }

    const payload = {
      customerName,
      phone,
      startDate: new Date(startDate),
      pax: qtyPax,
      pricePerPax: selectedPrice.pricePerPax,
      totalAmount,
      packageId: selectedPackageId,
    };

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/dashboard/finance/trips");
      } else {
        alert("Failed to create booking");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Add New Booking</CardTitle>
          <CardDescription>Create a new trip booking manually.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            {/* Package */}
            <div className="space-y-2">
              <Label>Select Package</Label>
              <Select
                value={selectedPackageId}
                onValueChange={handlePackageChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose package..." />
                </SelectTrigger>
                <SelectContent>
                  {packages?.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tier */}
            {selectedPackageId && (
              <div className="space-y-2">
                <Label>Select Price Tier</Label>
                <Select
                  value={selectedPriceId}
                  onValueChange={handlePriceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose tier..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePrices?.length > 0 ? (
                      availablePrices.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          Tier {p.pax} Pax - Rp{" "}
                          {p.pricePerPax.toLocaleString("id-ID")} /pax
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="empty">
                        No tier available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Pax */}
            {selectedPriceId && (
              <div className="space-y-2">
                <Label>Number of Pax</Label>
                <Input
                  type="number"
                  min="1"
                  value={qtyPax}
                  onChange={(e) => setQtyPax(Number(e.target.value))}
                  required
                />
              </div>
            )}

            {/* Total */}
            <div className="space-y-2">
              <Label>Total Amount</Label>
              <Input
                type="number"
                value={totalAmount}
                readOnly
                className="bg-stone-100 font-bold"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !selectedPriceId}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {loading ? "Saving..." : "Save Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
