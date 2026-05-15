// Direct seed script — bypasses Next.js HTTP, runs directly against DB
// Usage: node scripts/seed-direct.mjs
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function generateSovereignId(countryCode = "DE") {
  const rand = randomBytes(4).toString("hex").toUpperCase();
  return `ID-GLB-${countryCode}-${rand}`;
}

async function main() {
  console.log("── GloryaShine Seed (DSGVO-konform) ────────────────────");

  // 1. Super Admin
  const saEmail = process.env.SUPER_ADMIN_EMAIL;
  const saPassword = process.env.SUPER_ADMIN_PASSWORD;
  if (!saEmail || !saPassword) throw new Error("SUPER_ADMIN_EMAIL / SUPER_ADMIN_PASSWORD fehlen in .env.local");

  const saHash = await bcrypt.hash(saPassword, 12);
  const saSovId = generateSovereignId("DE");

  const superAdmin = await prisma.user.upsert({
    where: { email: saEmail },
    update: {},
    create: {
      email: saEmail,
      name: "Super Administrator",
      passwordHash: saHash,
      role: "SUPER_ADMIN",
      sovereignId: saSovId,
      countryCode: "DE",
      isActive: true,
      consentGivenAt: new Date(),
      consentVersion: "1.0-DSGVO-2026",
    },
  });
  console.log(`✔ Super Admin: ${saEmail} | ${saSovId}`);

  // 2. Tenant Paderborn
  const tenantSlug = process.env.FIRST_TENANT_SLUG ?? "paderborn";
  const tenantName = process.env.FIRST_TENANT_NAME ?? "Likewise Paderborn";
  const tenant = await prisma.tenant.upsert({
    where: { slug: tenantSlug },
    update: {},
    create: { slug: tenantSlug, name: tenantName, countryCode: "DE", nodeId: "ID-EU", isActive: true },
  });
  console.log(`✔ Tenant: ${tenantName} (/${tenantSlug})`);

  // 3. Tenant Admin
  const taEmail = process.env.FIRST_TENANT_EMAIL ?? "likewise@paderborn.com";
  const taPassword = process.env.FIRST_TENANT_ADMIN_PASSWORD ?? "change-me-on-first-login";
  const taHash = await bcrypt.hash(taPassword, 12);
  const taSovId = generateSovereignId("DE");

  const tenantAdmin = await prisma.user.upsert({
    where: { email: taEmail },
    update: {},
    create: {
      email: taEmail,
      name: tenantName,
      passwordHash: taHash,
      role: "TENANT_ADMIN",
      sovereignId: taSovId,
      countryCode: "DE",
      tenantId: tenant.id,
      isActive: true,
      consentGivenAt: new Date(),
      consentVersion: "1.0-DSGVO-2026",
    },
  });
  console.log(`✔ Tenant Admin: ${taEmail} | ${taSovId}`);

  // 4. DSGVO Audit Log — consent-Einträge für beide Accounts
  await prisma.dsgvoAuditLog.createMany({
    data: [
      { userId: superAdmin.id, action: "CONSENT_GIVEN", detail: "Initial seed — v1.0-DSGVO-2026" },
      { userId: tenantAdmin.id, action: "CONSENT_GIVEN", detail: "Initial seed — v1.0-DSGVO-2026" },
    ],
  });
  console.log("✔ DSGVO Audit-Einträge angelegt");

  console.log("── Seed abgeschlossen. Alle Daten souverän gespeichert. ─");
}

main()
  .catch((e) => { console.error("SEED FEHLER:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
