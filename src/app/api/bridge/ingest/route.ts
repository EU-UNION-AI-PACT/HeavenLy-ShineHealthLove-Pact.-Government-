import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Auth: CRON_SECRET oder interner Aufruf
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fieldKey, vision, talents = [] } = body;

    if (!fieldKey || !vision) {
      return NextResponse.json({ error: "fieldKey and vision required" }, { status: 400 });
    }

    // Zero-Knowledge: anonyme Referenz — kein Bezug zur Person
    const anonymousRef = crypto.randomUUID();

    const profile = {
      meta: {
        protocol_version: "2026.1",
        evaluation_type: "Dignity-Based-No-Grades",
        legal_basis: "Art. 1 GG, Art. 23 UN-UDHR, Art. 6(1)(a) DSGVO",
        grades_ignored: true,
        certificates_ignored: true,
      },
      aspiration: {
        field_key: fieldKey,
        vision,
        preferred_environment: "Offen, entwicklungsorientiert, würdevoll",
      },
      ikigai: {
        what_you_love: null,
        what_world_needs: null,
        what_you_are_good_at: null,
        what_you_can_be_paid_for: null,
        mapping_status: "PENDING",
      },
      human_potential: {
        self_assessed_talents: talents,
        hidden_skills_detected: [],
        pattern_match_results: [],
      },
      bridge_status: {
        current_stage: "INCEPTION",
        agent_triggered: true,
        mentor_candidates: [],
        resource_links: [],
        next_step: null,
      },
      dsgvo: {
        anonymized_at: null,
        erasure_requested: false,
        portability_available: true,
      },
    };

    const record = await prisma.humanPotential.create({
      data: {
        anonymousRef,
        profile,
        fieldKey,
        bridgeStatus: "INCEPTION",
      },
    });

    return NextResponse.json({
      ok: true,
      anonymousRef: record.anonymousRef,
      bridgeStatus: record.bridgeStatus,
      message: "Berufungswunsch eingegangen. Die Brücke wird gebaut.",
    }, { status: 201 });

  } catch (err) {
    console.error("[bridge/ingest]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
