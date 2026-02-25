export type PackageOption = {
  pax: number;
  price: number; // harga per pax
  cost: number; // total cost operasional
};

export type TravelPackage = {
  name: string;
  packageSlug: string;
  days: number;
  options: PackageOption[];
};

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    name: "Eksplorasi Sumba Barat",
    packageSlug: "eksplorasi-sumba-barat",
    days: 3,
    options: [
      { pax: 2, price: 4200000, cost: 4195000 },
      { pax: 3, price: 3650000, cost: 5470000 },
      { pax: 4, price: 2880000, cost: 5745000 },
      { pax: 5, price: 2820000, cost: 7020000 },
      { pax: 6, price: 3370000, cost: 10090000 },
      { pax: 7, price: 3250000, cost: 11365000 },
      { pax: 8, price: 3250000, cost: 11640000 },
      { pax: 9, price: 3250000, cost: 12915000 },
      { pax: 10, price: 3250000, cost: 13190000 },
      { pax: 11, price: 3250000, cost: 14465000 },
      { pax: 12, price: 3250000, cost: 14740000 },
    ],
  },

  // MASUKKAN paket lain di sini (Sumba Adventure, dll)
];
