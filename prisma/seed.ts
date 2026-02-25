// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Create Admin
  await prisma.user.upsert({
    where: { email: "admin@travel.com" },
    update: {},
    create: {
      email: "admin@travel.com",
      name: "Admin Travel",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create Sample Cars
  const cars = [
    { name: "Toyota Alphard", pricePerDay: 1500000 },
    { name: "Toyota Innova", pricePerDay: 700000 },
    { name: "Honda HRV", pricePerDay: 600000 },
  ];

  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.name.toLowerCase().replace(/ /g, "-") }, // dummy id logic
      update: {},
      create: car,
    });
  }

  console.log("Seed data created!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
