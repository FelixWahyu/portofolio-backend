import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { PrismaClient } = pkg;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "admin@felixws.my.id";
  const placeholderPassword = "adminpassword123"; // USER: Silakan ganti setelah login pertama kali
  
  const hashedPassword = await bcrypt.hash(placeholderPassword, 10);

  console.log("Seeding admin user...");
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin Felix",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log({ admin });
  console.log("Seed finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
