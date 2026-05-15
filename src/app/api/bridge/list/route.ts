import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await prisma.humanPotential.findMany({
    where: { anonymizedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      anonymousRef: true,
      fieldKey: true,
      bridgeStatus: true,
      createdAt: true,
      profile: true,
    },
  });

  return NextResponse.json({ entries });
}
