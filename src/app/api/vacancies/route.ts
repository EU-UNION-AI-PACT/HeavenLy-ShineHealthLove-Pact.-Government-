import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendParentRelayNotification } from "@/lib/email";

// ─────────────────────────────────────────────────────────────────────────────
// Match-Orchestrator — Vacancy filling logic
// Inspired by "BIFROST MATCH-ORCHESTRATOR v1.0"
// Junior comms ALWAYS route to parents only — never to children
// ─────────────────────────────────────────────────────────────────────────────

function calculateResonance(mentor: any, arrival: any): number {
  let score = 0;
  if (mentor.countryCode === arrival.countryCode) score += 30;
  if (mentor.isVerifiedMentor) score += 40;
  if (mentor.isMentorReady) score += 20;
  score += Math.random() * 10; // resonance variance
  return score;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;

  if (!user || !["SUPER_ADMIN", "TENANT_ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { vacancyId } = await req.json();
  if (!vacancyId) return NextResponse.json({ error: "vacancyId required" }, { status: 400 });

  const vacancy = await prisma.vacancy.findUnique({ where: { id: vacancyId } });
  if (!vacancy) return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
  if (vacancy.status !== "WAITING") return NextResponse.json({ error: "Vacancy already filled" }, { status: 400 });

  // 1. Find mentor candidates — only verified, only adults
  const candidates = await prisma.user.findMany({
    where: {
      role: { in: ["PILGRIM", "PARENT"] },
      isMentorReady: true,
      isActive: true,
    },
  });

  if (candidates.length === 0) {
    return NextResponse.json({ status: "QUEUED", message: "No mentors available. Vacancy remains in queue." });
  }

  // 2. Score by resonance
  const arrivedUser = await prisma.user.findUnique({ where: { id: vacancy.arriverId } });
  type UserRow = (typeof candidates)[number];
  const bestMentor = candidates.sort((a: UserRow, b: UserRow) =>
    calculateResonance(b, arrivedUser) - calculateResonance(a, arrivedUser)
  )[0];

  // 3. Execute match
  await prisma.vacancy.update({
    where: { id: vacancyId },
    data: {
      mentorId: bestMentor.id,
      status: "MATCHED",
      matchedAt: new Date(),
    },
  });

  // 4. STRICT JUNIOR PROTECTION: route ALL comms to parent only
  if (vacancy.isJunior) {
    const parentLink = await prisma.parentChildLink.findUnique({
      where: { childId: vacancy.arriverId },
      include: { parent: true },
    });

    if (parentLink?.parent?.email) {
      await sendParentRelayNotification({
        parentEmail: parentLink.parent.email,
        parentName: parentLink.parent.name ?? "Erziehungsberechtigte/r",
        eventType: "MENTOR_GREETING",
        childDisplayName: arrivedUser?.name ?? "dein Kind",
        mentorId: bestMentor.sovereignId ?? bestMentor.id,
      });
    }
    // NO message to the child — ever
  }

  // 5. Update Gießfass (vacancy becomes GOLDEN after relay)
  await prisma.vacancy.update({
    where: { id: vacancyId },
    data: { status: "GOLDEN" },
  });

  return NextResponse.json({
    status: "BEHEIMATET",
    mentorId: bestMentor.sovereignId ?? bestMentor.id,
    vacancyId,
    isJunior: vacancy.isJunior,
    relayedToParent: vacancy.isJunior,
  });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vacancies = await prisma.vacancy.findMany({
    where: { status: "WAITING" },
    orderBy: [{ isJunior: "desc" }, { createdAt: "asc" }],
    take: 50,
  });

  return NextResponse.json(vacancies);
}
