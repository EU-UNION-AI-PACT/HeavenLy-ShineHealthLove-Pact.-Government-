import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;
  if (!user) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  }

  const body = await req.json();
  const { content, purposeCode, visibility } = body;

  if (!content || typeof content !== "string" || content.trim().length < 3) {
    return NextResponse.json({ error: "Wunsch zu kurz" }, { status: 400 });
  }

  const validPurpose = ["EARTH", "FELLOWS", "GOVERNMENT", "SELF"];
  const validVisibility = ["PUBLIC", "TENANT_ONLY", "PRIVATE"];

  const petition = await prisma.petition.create({
    data: {
      title:       content.trim().substring(0, 80),
      content:     content.trim(),
      purposeCode: validPurpose.includes(purposeCode) ? purposeCode : "SELF",
      visibility:  validVisibility.includes(visibility) ? visibility : "PRIVATE",
      status:      "HOFFNUNG",
      authorId:    user.id,
      tenantId:    user.tenantId ?? null,
    },
  });

  await prisma.dsgvoAuditLog.create({
    data: {
      userId:  user.id,
      action:  "WISH_CREATED",
      detail:  `purposeCode=${petition.purposeCode} visibility=${petition.visibility}`,
      ipHash:  null,
    },
  });

  return NextResponse.json({ id: petition.id, status: "HOFFNUNG" }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;
  if (!user) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const purposeCode = searchParams.get("purposeCode");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100);

  const petitions = await prisma.petition.findMany({
    where: {
      authorId:  user.id,
      isDeleted: false,
      ...(purposeCode ? { purposeCode } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id:          true,
      title:       true,
      content:     true,
      status:      true,
      purposeCode: true,
      visibility:  true,
      createdAt:   true,
    },
  });

  return NextResponse.json({ petitions });
}
