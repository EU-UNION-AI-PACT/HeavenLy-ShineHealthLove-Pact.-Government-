import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/news  — Resonance Feed for the current user
// POST /api/news — Admin-only: create a news item (broadcast or targeted)
//
// STRICT RULE: Junior IDs have NO inbox. Messages for juniors go to parent only.
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  const session = await auth();
  const user = session?.user as any;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // JUNIOR: no news inbox — redirect them to their portal visually
  if (user.role === "JUNIOR") {
    return NextResponse.json({ error: "Junior accounts have no external inbox." }, { status: 403 });
  }

  const news = await prisma.newsItem.findMany({
    where: {
      OR: [
        { recipientId: null },  // broadcast to all adults
        { recipientId: user.id },
      ],
    },
    orderBy: [{ isGolden: "desc" }, { publishedAt: "desc" }],
    take: 50,
    select: {
      id: true,
      title: true,
      content: true,
      category: true,
      isGolden: true,
      isVerified: true,
      publishedAt: true,
      author: { select: { name: true, sovereignId: true } },
    },
  });

  return NextResponse.json(news);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user as any;

  if (!user || !["SUPER_ADMIN", "TENANT_ADMIN"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, category, isGolden, recipientId, tenantId } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "title and content required" }, { status: 400 });
  }

  // NEVER target a JUNIOR directly — validate recipient role if provided
  if (recipientId) {
    const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
    if (recipient?.role === "JUNIOR") {
      return NextResponse.json(
        { error: "Cannot send news directly to a Junior account. Route to the parent instead." },
        { status: 400 }
      );
    }
  }

  const validCategories = ["GOVERNANCE", "GIESSFAST", "COMMUNITY", "PASSAGE", "GUARDIAN"];

  const item = await prisma.newsItem.create({
    data: {
      title: title.trim().substring(0, 200),
      content: content.trim().substring(0, 5000),
      category: validCategories.includes(category) ? category : "COMMUNITY",
      isGolden: Boolean(isGolden),
      isVerified: user.role === "SUPER_ADMIN",
      authorId: user.id,
      recipientId: recipientId ?? null,
      tenantId: tenantId ?? user.tenantId ?? null,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
