/**
 * Orchestration for one student's drill: the due pool, and the daily-set
 * fill that tops it up (ENGAGEMENT_SPEC.md B2). The RULES live in select.ts
 * and fill.ts; the ROWS come from query.ts; this module is the order they
 * run in.
 *
 * NOT marked `server-only`, and every function takes the supabase client as
 * a parameter, so `npm run drill:smoke` can drive the same chain the page
 * runs — with the service-role client where the page uses the student's JWT.
 * The service.ts wrapper adds the session and nothing else.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { attachRefs, dueQuestions, type DrillEvent, type DueQuestion } from "./select";
import { composeDailySet, pickUnseen, rankWeakSubtopics, WEAK_SUBTOPICS } from "./fill";
import {
  loadDrillEvents,
  loadQuestionRefs,
  loadSeenQuestionIds,
  loadUnseenCandidates,
} from "./query";

export type OwnPool = {
  /** Every answer event on record — the fill ranks weak subtopics from it. */
  events: DrillEvent[];
  /** Due questions that still resolve to a PUBLIC MCQ, in the pool's order. */
  drillable: DueQuestion[];
};

/**
 * This student's whole drillable pool.
 *
 * Shared by the drill and by `/api/me/pulse`, which is what the header badge
 * reads. That sharing is the point: the count a student sees is the count the
 * drill will serve from, because it is the same read, not an approximation.
 */
export async function loadOwnPool(db: SupabaseClient, userId: string, now: Date): Promise<OwnPool> {
  const events = await loadDrillEvents(db, userId);
  const due = dueQuestions(events, now);
  if (due.length === 0) return { events, drillable: [] };
  // Taxonomy for the whole pool: it is what the interleaver groups on, AND the
  // eligibility filter (a question that no longer resolves is dropped).
  const refs = await loadQuestionRefs(db, due.map((d) => d.questionId));
  return { events, drillable: attachRefs(due, refs) };
}

/**
 * Unseen PYQ ids to top a drill up with, in order of relevance.
 *
 * Weak subtopics come from EVERY recorded miss, not just the due ones — a
 * subtopic they have retired questions in is still where they were weak. The
 * seen set (attempt_answers + activity refs) is what keeps this moving: a
 * question served today is met and never comes back as "new". `examId` is
 * the fallback scope when the weak subtopics cannot fill the gap (or there
 * are none yet); null means no target exam, so no fallback.
 */
export async function fillUnseen(
  db: SupabaseClient,
  userId: string,
  events: readonly DrillEvent[],
  need: number,
  examId: string | null
): Promise<string[]> {
  if (need <= 0) return [];
  const seen = await loadSeenQuestionIds(db, userId);
  const out: string[] = [];

  const wrongIds = [...new Set(events.filter((e) => !e.correct).map((e) => e.questionId))];
  if (wrongIds.length > 0) {
    const refs = await loadQuestionRefs(db, wrongIds);
    const weak = rankWeakSubtopics(
      wrongIds.map((id) => ({ questionId: id, subtopicId: refs.get(id)?.subtopicId ?? null })),
      WEAK_SUBTOPICS
    );
    if (weak.length > 0) {
      const candidates = await loadUnseenCandidates(db, { subtopicIds: weak });
      out.push(...pickUnseen(candidates, seen, need));
    }
  }

  if (out.length < need && examId) {
    const candidates = await loadUnseenCandidates(db, { examId });
    const already = new Set([...seen, ...out]);
    out.push(...pickUnseen(candidates, already, need - out.length));
  }
  return out;
}

export { composeDailySet };
