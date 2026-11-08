/**
 * POST /api/chat/similar: "One more like this" under one of V's explanations
 * (2026-11-08, owner). Another question from the explained question's
 * subtopic, none the student opened today, shown by the chat as a "try" card.
 * No AI call, so it uses none of the hour's messages; the card opens its
 * answer under the usual daily limit. Signed in only: explanations are.
 * Logic in lib/chat/moreLikeThis.ts.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getSessionUser } from "@/lib/auth";
import { moreLikeThis } from "@/lib/chat/moreLikeThis";
import { loadSimilarId, loadVQuestion } from "@/lib/chat/questionToolsServer";
import { revealedToday } from "@/lib/chat/questionReveal";

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;
const SIMILAR_LIMIT = 60; // per student per hour: far above a student working through cards
const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(request: NextRequest) {
  try {
    let userId: string | null = null;
    try {
      userId = (await getSessionUser())?.id ?? null;
    } catch {
      userId = null;
    }
    if (!userId) return NextResponse.json({ error: "Sign in to get more questions." }, { status: 401, headers: NO_STORE });

    const rl = await checkAndIncrement(createSupabaseAdminClient(), `chat-similar:${userId}`, { limit: SIMILAR_LIMIT, windowMs: HOUR_MS });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429, headers: { ...NO_STORE, "Retry-After": String(rl.retryAfter) } }
      );
    }

    const anon = createSupabaseAnonClient();
    const body = await request.json().catch(() => null);
    const result = await moreLikeThis(body, {
      loadQuestion: (id) => loadVQuestion(anon, id),
      loadSimilar: async (q) => loadSimilarId(anon, q, await revealedToday(createSupabaseServerClient(), userId!, new Date())),
    });
    if (result.status !== 200) {
      const error = result.status === 400 ? "Invalid question." : "Question not found.";
      return NextResponse.json({ error }, { status: result.status, headers: NO_STORE });
    }
    return NextResponse.json({ ok: true, questionId: result.questionId }, { headers: NO_STORE });
  } catch (err) {
    console.error("chat/similar route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500, headers: NO_STORE });
  }
}
