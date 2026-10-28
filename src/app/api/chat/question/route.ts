/**
 * The question card inside V (2026-10-19, study-partner Phase 1).
 *
 * GET  /api/chat/question?id=<uuid>  the question for "Try a similar one" or
 *      "Is this your question?", WITHOUT its answer (lib/chat/questionCard.ts).
 *      PUBLIC questions only (anon client), so it may be cached publicly.
 *      Also (2026-10-23) ?page=<notes page>&concept=&item=[&index=]: a notes
 *      practice question for the card above an Ask V tap, prompt and options
 *      only (lib/chat/notesItem.ts notesItemCard).
 * POST /api/chat/question  { id, chose }  a signed-in student's pick, checked
 *      here. It is one of the day's free answers like any other reveal, and
 *      it is recorded as practice on the "v" surface, with a miss as an
 *      answer_wrong so the drill brings it back.
 *
 * Both answer 404 while explanations are switched off (/dashboard/chat, 0168).
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { getPremiumLimits } from "@/lib/billing/premiumLimits";
import { passOnSale } from "@/lib/billing/passOnSale";
import { logActivityOnce } from "@/lib/activity/service";
import { istDayKey } from "@/lib/email/dueNudge";
import { readChatSettings } from "@/lib/chat/settingsAdmin";
import { parseAskedQuestion, revealCheck, toVQuestion } from "@/lib/chat/questionTools";
import { cardView, gradeCard } from "@/lib/chat/questionCard";
import { revealedToday } from "@/lib/chat/questionReveal";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { parseNotesItemRef } from "@/lib/chat/notesItem";
import { loadNotesItemCard } from "@/lib/chat/notesItemServer";

export const dynamic = "force-dynamic";

const LIMIT_PER_HOUR = 120;
const HOUR_MS = 60 * 60 * 1000;

async function explainOn(): Promise<boolean> {
  return (await readChatSettings(createSupabaseAdminClient())).explainEnabled;
}

export async function GET(request: NextRequest) {
  try {
    if (!(await explainOn())) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const params = request.nextUrl.searchParams;
    const page = params.get("page");
    if (page !== null) {
      const index = params.get("index");
      const ref = parseNotesItemRef({ concept: params.get("concept"), item: params.get("item"), index: index === null ? undefined : Number(index) });
      const card = ref ? await loadNotesItemCard(page, ref) : null;
      if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(
        { question: card },
        { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
      );
    }
    const asked = parseAskedQuestion({ id: params.get("id") });
    if (!asked) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const row = (await queryQuestionsByIds(createSupabaseAnonClient(), [asked.id]))[0];
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    // Stored as a bucket path (sometimes a full address): the card needs a URL it can load.
    const image = row.imageUrl ? publicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", row.imageUrl) : null;
    return NextResponse.json(
      { question: cardView(toVQuestion(row), image) },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (err) {
    console.error("chat/question GET failed", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }
    if (!userId) return NextResponse.json({ error: "Sign in to answer." }, { status: 401 });
    if (!(await explainOn())) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const rl = await checkAndIncrement(createSupabaseAdminClient(), `chat-card:user:${userId}`, {
      limit: LIMIT_PER_HOUR,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) return NextResponse.json({ error: "Too many answers. Please try again later." }, { status: 429 });

    const raw = (await request.json().catch(() => null)) as { id?: unknown; chose?: unknown } | null;
    const asked = parseAskedQuestion(raw);
    if (!asked || !asked.chose) return NextResponse.json({ error: "Pick one of the options." }, { status: 400 });

    const row = (await queryQuestionsByIds(createSupabaseAnonClient(), [asked.id]))[0];
    const graded = row ? gradeCard(toVQuestion(row), asked.chose) : null;
    if (!graded) return NextResponse.json({ error: "That question cannot be checked here." }, { status: 400 });

    // The student's own login for the count and the record: user_activity is own-row under RLS.
    const db = createSupabaseServerClient();
    const now = new Date();
    const limits = await getPremiumLimits(db);
    const limit = !limits || limits.hasPass ? null : limits.revealsPerDay;
    const check = revealCheck({ limit, todayIds: limit === null ? [] : await revealedToday(db, userId, now), questionId: asked.id });
    // The card sells the pass in place, as the bank's wall does (2026-10-28).
    if (check.kind === "limit") {
      return NextResponse.json({ ok: false, limit: check.limit, pass: await passOnSale() }, { status: 200 });
    }

    const day = istDayKey(now);
    await logActivityOnce(db, userId, {
      kind: "question_practiced",
      refId: asked.id,
      refKind: "question",
      metadata: { surface: "v", chose: asked.chose, correct: graded.correct },
      dedupeKey: `v_card:${asked.id}:${userId}:${day}`,
    });
    if (!graded.correct) {
      await logActivityOnce(db, userId, {
        kind: "answer_wrong",
        refId: asked.id,
        refKind: "question",
        metadata: { surface: "v", chose: asked.chose },
        dedupeKey: `answer:v:${userId}:${asked.id}:${day}`,
      });
    }
    return NextResponse.json({ ok: true, correct: graded.correct, answer: graded.answer }, { status: 200 });
  } catch (err) {
    console.error("chat/question POST failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
