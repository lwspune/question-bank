/**
 * GET /api/me/study-next?exam=<slug> — the one chapter Home's Study time card
 * suggests next (lib/studyTime/report pickStudyNext): worth most in the
 * papers, no time this week, not already strong.
 *
 * WHY A SEPARATE READ, FETCHED ON TAP. "Strong" is the band V's progress card
 * uses (lib/chat/progressCard strongChapters), built from the student's whole
 * mock record (get_own_performance, up to ~1 MB for the heaviest student).
 * Home renders the card's numbers from a small read; only this suggestion
 * needs the big one, so it waits until the student opens "This week".
 *
 * `no-store`: per-user, never held by a CDN.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { getOwnPerformance } from "@/lib/performance/service";
import { strongChapters } from "@/lib/chat/progressCard";
import { goPracticeHref } from "@/lib/performance/links";
import { pickStudyNext } from "@/lib/studyTime/report";
import { loadStudyCard, studyExamOf } from "@/lib/studyTime/reportServer";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;

export async function GET(req: Request) {
  const exam = studyExamOf(new URL(req.url).searchParams.get("exam"));
  if (!exam) return NextResponse.json({ error: "Unknown exam." }, { status: 400, headers: NO_STORE });

  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401, headers: NO_STORE });

  try {
    const db = createSupabaseServerClient();
    const now = new Date();
    const [card, perf] = await Promise.all([loadStudyCard(db, user.id, exam.slug, await getExamIdMap(), now), getOwnPerformance()]);
    const next = card && perf ? pickStudyNext(card, strongChapters(perf, exam.examName, now)) : null;
    return NextResponse.json(
      { next: next ? { ...next, href: goPracticeHref(exam.examName, next.subject, next.chapter) } : null },
      { headers: NO_STORE }
    );
  } catch (e) {
    console.error("study next failed", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not load the suggestion." }, { status: 500, headers: NO_STORE });
  }
}
