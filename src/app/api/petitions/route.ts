import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const user = session?.user as any;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const petitions = await prisma.petition.findMany({
    where: {
      authorId: user.id,
      isDeleted: false,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      visibility: true,
      createdAt: true,
    },
  });

  return NextResponse.json(petitions);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // JUNIOR users cannot submit petitions directly
  if (user.role === "JUNIOR") {
    return NextResponse.json({ error: "Junior accounts cannot submit petitions directly." }, { status: 403 });
  }

  const body = await req.json();
  const { title, content, visibility } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Titel und Inhalt sind erforderlich." }, { status: 400 });
  }

  const petition = await prisma.petition.create({
    data: {
      title: title.trim().substring(0, 100),
      content: content.trim().substring(0, 2000),
      visibility: ["PUBLIC", "TENANT_ONLY", "PRIVATE"].includes(visibility) ? visibility : "PRIVATE",
      status: "HOFFNUNG",
      authorId: user.id,
      tenantId: user.tenantId ?? null,
    },
  });

  return NextResponse.json(petition, { status: 201 });
}
