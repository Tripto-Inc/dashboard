import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

console.log(process.env.DATABASE_URL)

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma };
