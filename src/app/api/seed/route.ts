import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTenantAdminOnboarding } from "@/lib/email";
import { generateSovereignId } from "@/lib/sovereign-id";
import bcrypt from "bcryptjs";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/seed
// One-time setup: creates Super Admin + first tenant (Paderborn) + Tenant Admin
// Sends onboarding email to likewise@paderborn.com
// Protected by SEED_SECRET env var
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ── 1. Create Super Admin ──────────────────────────────────────────────
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL!;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD!;
    const superAdminHash = await bcrypt.hash(superAdminPassword, 12);
    const superAdminSovId = generateSovereignId("DE", false);

    const superAdmin = await prisma.user.upsert({
      where: { email: superAdminEmail },
      update: {},
      create: {
        email: superAdminEmail,
        name: "Super Administrator",
        passwordHash: superAdminHash,
        role: "SUPER_ADMIN",
        sovereignId: superAdminSovId,
        countryCode: "DE",
        isActive: true,
      },
    });

    // ── 2. Create first Tenant (Paderborn) ─────────────────────────────────
    const tenantSlug = process.env.FIRST_TENANT_SLUG ?? "paderborn";
    const tenantName = process.env.FIRST_TENANT_NAME ?? "Likewise Paderborn";

    const tenant = await prisma.tenant.upsert({
      where: { slug: tenantSlug },
      update: {},
      create: {
        slug: tenantSlug,
        name: tenantName,
        countryCode: "DE",
        nodeId: "ID-EU",
        isActive: true,
      },
    });

    // ── 3. Create Tenant Admin ─────────────────────────────────────────────
    const tenantAdminEmail = process.env.FIRST_TENANT_EMAIL ?? "likewise@paderborn.com";
    const tenantAdminPassword = process.env.FIRST_TENANT_ADMIN_PASSWORD ?? "change-me-on-first-login";
    const tenantAdminHash = await bcrypt.hash(tenantAdminPassword, 12);
    const tenantAdminSovId = generateSovereignId("DE", false);

    const tenantAdmin = await prisma.user.upsert({
      where: { email: tenantAdminEmail },
      update: {},
      create: {
        email: tenantAdminEmail,
        name: tenantName,
        passwordHash: tenantAdminHash,
        role: "TENANT_ADMIN",
        sovereignId: tenantAdminSovId,
        countryCode: "DE",
        tenantId: tenant.id,
        isActive: true,
      },
    });

    // ── 4. Send Onboarding Email ───────────────────────────────────────────
    let emailResult: { id?: string; error?: unknown } = {};
    try {
      const res = await sendTenantAdminOnboarding({
        to: tenantAdminEmail,
        tenantName,
        tenantSlug,
        adminEmail: tenantAdminEmail,
        adminPassword: tenantAdminPassword,
        sovereignId: tenantAdminSovId,
      });
      emailResult = { id: (res as any).id };
    } catch (emailErr) {
      emailResult = { error: String(emailErr) };
    }

    return NextResponse.json({
      success: true,
      superAdmin: { id: superAdmin.id, sovereignId: superAdminSovId },
      tenant: { id: tenant.id, slug: tenantSlug },
      tenantAdmin: { id: tenantAdmin.id, email: tenantAdminEmail, sovereignId: tenantAdminSovId },
      email: emailResult,
    });
  } catch (err) {
    console.error("[SEED ERROR]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
