/**
 * POST /api/chat — "V", the scoped FAQ chatbot. Stateless: no history stored,
 * no retrieval. Facts are assembled fresh per request from EXAM_REGISTRY, the
 * live plans table and a single bank-wide count, then handed to Claude Haiku
 * in a system prompt that limits it to those facts. Deliberately NOT a PYQ
 * tutor — see the "V — a basic FAQ chatbot" plan for the scope boundary.
 *
 * Flow mirrors src/app/api/contact/route.ts: rate-limit (IP) → validate →
 * assemble facts → call → respond, same consistent response shape.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { validateChatMessage } from "@/lib/chat/validate";
import {
  buildExamFacts,
  buildPlanFacts,
  buildSystemPrompt,
  NAV_FACTS,
  type ChatExamFact,
} from "@/lib/chat/facts";
import { askV } from "@/lib/chat/anthropic";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { listActivePlans } from "@/lib/billing/plansQuery";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const ASK_LIMIT = 15; // per IP per hour — generous for a real visitor, caps abuse cost

type Body = { message?: string };

function toExamFact(e: (typeof EXAM_REGISTRY)[number]): ChatExamFact {
  return {
    displayName: e.displayName,
    tier: e.tier,
    hasMocks: e.hasMocks === true,
    boardExam: e.boardExam === true,
    practiceOnly: e.practiceOnly === true,
    noPublicContent: e.noPublicContent === true,
  };
}

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    // Rate-limit BEFORE parsing so junk still counts toward the bucket.
    const rl = await checkAndIncrement(admin, `chat:anon:${getClientIp(request)}`, {
      limit: ASK_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many questions — please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: Body;
    try {
      raw = (await request.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateChatMessage({ message: raw.message });
    if (!v.ok) {
      return NextResponse.json({ error: v.message }, { status: 400 });
    }

    const anon = createSupabaseAnonClient();
    const [plans, bankCount] = await Promise.all([
      listActivePlans(anon),
      anon
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("visibility", "PUBLIC"),
    ]);

    const systemPrompt = buildSystemPrompt({
      exams: buildExamFacts(EXAM_REGISTRY.map(toExamFact)),
      plans: buildPlanFacts(plans),
      bankTotal: bankCount.count ?? 0,
      nav: NAV_FACTS,
    });

    const result = await askV(systemPrompt, v.value);
    if (!result.ok) {
      console.error("V chat error:", result.error);
      return NextResponse.json({ error: "V is unavailable right now." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, reply: result.reply }, { status: 200 });
  } catch (err) {
    console.error("chat route error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
