import { Pool as NeonPool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ?? "postgresql://localhost:5432/gloryashine";

  const isNeon =
    connectionString.includes("neon.tech") ||
    process.env.NETLIFY === "true";

  let adapter;
  if (isNeon) {
    neonConfig.fetchConnectionCache = true;
    const pool = new NeonPool({ connectionString });
    adapter = new PrismaNeon(pool as any);
  } else {
    const pool = new Pool({ connectionString });
    adapter = new PrismaPg(pool);
  }

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.__prisma = prisma;
