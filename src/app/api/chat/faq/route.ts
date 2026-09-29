/**
 * POST /api/chat/faq — V's phase-2 predefined-question path. No LLM call,
 * no ANTHROPIC_API_KEY: a chip id in, a templated answer out, built from the
 * same live facts (EXAM_REGISTRY, plans, bank count) the dormant /api/chat
 * (LLM) route already reads. See the "V, phase 2" plan for why this exists
 * alongside the untouched LLM path rather than replacing it.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { isChatFaqId, buildFaqAnswer } from "@/lib/chat/faq";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { listActivePlans } from "@/lib/billing/plansQuery";
import type { ChatExamFact } from "@/lib/chat/facts";
import { getSessionUser } from "@/lib/auth";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const ASK_LIMIT = 30; // per IP per hour — a cheap DB read, generous cap is just hygiene

type Body = { questionId?: string };

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

    const rl = await checkAndIncrement(admin, `chat-faq:anon:${getClientIp(request)}`, {
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

    if (!isChatFaqId(raw.questionId)) {
      return NextResponse.json({ error: "Unknown question." }, { status: 400 });
    }

    const questionId = raw.questionId;
    const anon = createSupabaseAnonClient();
    const [plans, bankCount, user] = await Promise.all([
      listActivePlans(anon),
      anon
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("visibility", "PUBLIC"),
      getSessionUser(),
    ]);

    const reply = buildFaqAnswer(questionId, {
      exams: EXAM_REGISTRY.map(toExamFact),
      plans,
      bankTotal: bankCount.count ?? 0,
    });

    await recordChatInteraction(admin, {
      eventType: "faq_click",
      questionId,
      userId: user?.id ?? null,
    });

    return NextResponse.json({ ok: true, reply }, { status: 200 });
  } catch (err) {
    console.error("chat/faq route error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
