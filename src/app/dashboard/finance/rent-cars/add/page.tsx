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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Car = {
  id: string;
  name: string;
  pricePerDay: number;
};

export default function AddRentCarPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  // 🔥 Date sebagai Date object
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [duration, setDuration] = useState(1);
  const [carId, setCarId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // 🔥 Fetch Cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars");
        if (res.ok) {
          const data = await res.json();
          setCars(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch cars", err);
      }
    };

    fetchCars();
  }, []);

  // 🔥 Auto Calculate Total
  useEffect(() => {
    const selectedCar = cars.find((c) => c.id === carId);

    if (selectedCar && duration > 0) {
      setTotalAmount(selectedCar.pricePerDay * duration);
    } else {
      setTotalAmount(0);
    }
  }, [carId, duration, cars]);

  // 🔥 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!startDate) {
      alert("Please select start date");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/rents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          startDate,
          duration: Number(duration),
          carId,
          totalAmount,
        }),
      });

      if (res.ok) {
        router.push("/dashboard/finance/rent-cars");
        router.refresh();
      } else {
        alert("Failed to create booking");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">
            Add Rent Car Booking
          </CardTitle>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Car */}
            <div className="space-y-2">
              <Label>Select Car</Label>
              <Select onValueChange={setCarId} value={carId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a car..." />
                </SelectTrigger>
                <SelectContent>
                  {cars?.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.name} (Rp {car.pricePerDay.toLocaleString("id-ID")}
                      /day)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Start Date (Calendar) */}
            <div className="space-y-2">
              <Label>Start Date</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "dd MMMM yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label>Duration (Days)</Label>
              <Input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
            </div>

            {/* Total */}
            <div className="space-y-2">
              <Label>Total Amount</Label>
              <Input
                value={`Rp ${totalAmount.toLocaleString("id-ID")}`}
                readOnly
                className="bg-stone-100 font-bold"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading || !carId}
              className="w-full bg-primary text-white"
            >
              {loading ? "Saving..." : "Save Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
