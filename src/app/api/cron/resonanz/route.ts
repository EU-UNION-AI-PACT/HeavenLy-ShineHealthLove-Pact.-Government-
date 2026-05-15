import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cron/resonanz
// Called nightly at 00:00 UTC by Vercel Cron or external scheduler
// Generates daily Resonanz-Bilanz report
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  try {
    const [
      totalPilgrim,
      totalJunior,
      totalPetitions,
      vacanciesFilled,
      newArrivals,
      parentLinks,
      transitions,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "PILGRIM" } }),
      prisma.user.count({ where: { role: "JUNIOR" } }),
      prisma.petition.count({ where: { isDeleted: false } }),
      prisma.vacancy.count({ where: { status: "GOLDEN", updatedAt: { gte: today } } }),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.parentChildLink.count({ where: { isActive: true } }),
      prisma.juniorProfile.count({ where: { transitionStatus: "PENDING_TRANSITION" } }),
    ]);

    const transmutationRate =
      totalPetitions > 0
        ? Math.round(
            (await prisma.petition.count({ where: { status: "GEWISSHEIT", isDeleted: false } }) /
              totalPetitions) *
              100
          )
        : 0;

    const report = await prisma.resonanzBilanz.upsert({
      where: { reportDate: today },
      update: {
        goldProjects: totalPetitions,
        vacanciesFilled,
        newArrivals,
        juniorSynced: totalJunior,
        parentRelaySuccess: parentLinks,
        transitions18: transitions,
        transmutationRate,
        generatedAt: new Date(),
      },
      create: {
        reportDate: today,
        giessFactInput: totalPilgrim * 0.01,
        transmutationRate,
        goldProjects: totalPetitions,
        vacanciesFilled,
        newArrivals,
        juniorSynced: totalJunior,
        parentRelaySuccess: parentLinks,
        transitions18: transitions,
        attacksBlocked: 0,
        resonanceFrequency: 432,
      },
    });

    return NextResponse.json({ success: true, reportId: report.id, date: today.toISOString() });
  } catch (err) {
    console.error("[RESONANZ CRON ERROR]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
