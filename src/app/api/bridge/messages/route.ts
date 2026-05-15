import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET  /api/bridge/messages?ref=<anonymousRef>
export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;
  if (!user || user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.json({ error: "ref required" }, { status: 400 });

  const messages = await prisma.bridgeMessage.findMany({
    where: { anonymousRef: ref },
    orderBy: { createdAt: "asc" },
  });

  // Mark admin messages as read
  await prisma.bridgeMessage.updateMany({
    where: { anonymousRef: ref, sender: "HUMAN", isReadByAdmin: false },
    data: { isReadByAdmin: true },
  });

  return NextResponse.json({ messages });
}

// POST /api/bridge/messages
export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;
  if (!user || user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { anonymousRef, content } = await req.json();
  if (!anonymousRef || !content?.trim()) {
    return NextResponse.json({ error: "anonymousRef and content required" }, { status: 400 });
  }

  // Verify the HumanPotential exists
  const hp = await prisma.humanPotential.findUnique({ where: { anonymousRef } });
  if (!hp) return NextResponse.json({ error: "Berufungswunsch nicht gefunden" }, { status: 404 });

  const message = await prisma.bridgeMessage.create({
    data: {
      anonymousRef,
      sender: "ADMIN",
      content: content.trim(),
      isReadByHuman: false,
    },
  });

  // Advance bridge status to MATCHING if still at INCEPTION/MAPPING
  if (hp.bridgeStatus === "INCEPTION" || hp.bridgeStatus === "MAPPING") {
    await prisma.humanPotential.update({
      where: { anonymousRef },
      data: { bridgeStatus: "MATCHING" },
    });
  }

  return NextResponse.json({ ok: true, message }, { status: 201 });
}
