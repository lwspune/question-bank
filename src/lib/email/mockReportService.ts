/**
 * Service-role reads for the per-attempt mock report. The DECISION lives in the
 * pure mockReport.ts; this module fetches rows and nothing else.
 *
 * NOT marked "server-only" so the tsx script can import it, and every function
 * takes the supabase client as a PARAMETER — the src/lib/email/service.ts
 * precedent for a core shared by a CLI and server code.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PeerMap } from "./mockReport";

/** PostgREST puts an `.in()` list in the URL, so a few hundred uuids overflow
 *  the request line and the server answers a bare Bad Request. A mock carries
 *  up to 150 questions, but chunking is the rule regardless of today's size —
 *  this has already bitten `reviews:report` at 833 ids. */
const IN_CHUNK = 200;
const PAGE = 1000;

/**
 * Peer accuracy per question, 0-100, POOLED AT READ TIME.
 *
 * question_item_stats holds one row per (question, sitting) and deliberately
 * never stores a pooled number — pooling is the reader's job, which is what
 * lets a second sitting be added without rewriting history. So this sums the
 * numerators and denominators across every row for a question rather than
 * averaging the per-row rates, which would weight a 4-student sitting the same
 * as a 200-student one.
 *
 * A question with no rows is ABSENT from the map, never zero: the email must be
 * able to tell "no peer evidence" from "nobody got it right".
 */
export async function readPeerAccuracy(
  db: SupabaseClient,
  questionIds: string[]
): Promise<PeerMap> {
  const totals = new Map<string, { correct: number; attempted: number }>();
  const unique = [...new Set(questionIds)];

  for (let i = 0; i < unique.length; i += IN_CHUNK) {
    const slice = unique.slice(i, i + IN_CHUNK);
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("question_item_stats")
        .select("question_id, attempted, correct")
        .in("question_id", slice)
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`readPeerAccuracy: ${error.message}`);
      const rows = data ?? [];
      for (const r of rows as Record<string, unknown>[]) {
        const id = r.question_id as string;
        const acc = totals.get(id) ?? { correct: 0, attempted: 0 };
        acc.correct += Number(r.correct ?? 0);
        acc.attempted += Number(r.attempted ?? 0);
        totals.set(id, acc);
      }
      if (rows.length < PAGE) break;
    }
  }

  const out: PeerMap = new Map();
  for (const [id, { correct, attempted }] of totals) {
    // A zero denominator is a row that recorded exposure without responses. It
    // is evidence of nothing, so it stays out of the map rather than becoming
    // a 0% that would sort a question to the bottom of a real ranking.
    if (attempted > 0) out.set(id, Math.round((correct / attempted) * 100));
  }
  return out;
}

import { ENGAGEMENT_FLOOR } from "@/lib/performance/compute";

export type ReportCandidate = {
  attemptId: string;
  userId: string;
  submittedAt: string;
};

/**
 * Drop attempts that were abandoned rather than sat.
 *
 * A report on a paper the student walked away from is noise at best: the live
 * dry run on 2026-09-19 offered to mail "0/300 — 0 things to fix" about an
 * attempt with nothing answered. It became visible that day because the expiry
 * sweep graded 118 abandoned attempts, but the gap was always there — this
 * selection has never applied the ENGAGEMENT_FLOOR that lib/performance has used
 * since it shipped.
 *
 * Counted with the same predicate as `isAnswered`: a row in `attempt_answers`
 * can record a FLAG alone, so rows are not answers.
 */
async function dropAbandoned(
  db: SupabaseClient,
  candidates: ReportCandidate[]
): Promise<ReportCandidate[]> {
  if (candidates.length === 0) return candidates;
  const ids = candidates.map((c) => c.attemptId);

  const answered = new Map<string, number>();
  const CHUNK = 200; // `.in()` rides in the URL — a different limit from the 1000-row cap
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db
      .from("attempt_answers")
      .select("attempt_id, selected_label, numeric_response")
      .in("attempt_id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`dropAbandoned answers: ${error.message}`);
    for (const r of (data ?? []) as Record<string, unknown>[]) {
      if (r.selected_label == null && r.numeric_response == null) continue;
      const id = r.attempt_id as string;
      answered.set(id, (answered.get(id) ?? 0) + 1);
    }
  }

  const totals = new Map<string, number>();
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("id, mock:mock_tests(total_questions)")
      .in("id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`dropAbandoned totals: ${error.message}`);
    for (const r of (data ?? []) as Record<string, unknown>[]) {
      const m = (Array.isArray(r.mock) ? r.mock[0] : r.mock) as { total_questions: number } | null;
      totals.set(r.id as string, m?.total_questions ?? 0);
    }
  }

  return candidates.filter((c) => {
    const total = totals.get(c.attemptId) ?? 0;
    // Unknown paper length is treated as abandoned — never mail a report whose
    // own denominator is unknown.
    if (total <= 0) return false;
    return (answered.get(c.attemptId) ?? 0) / total >= ENGAGEMENT_FLOOR;
  });
}

/**
 * Graded attempts submitted since `since`, oldest first.
 *
 * FORWARD-ONLY IS ENFORCED BY THE CALLER'S CUTOFF, not by a flag on the row:
 * 542 attempts predate this feature and none of them should be mailed about
 * weeks later. A cutoff is also the only form of this rule that survives a
 * replay — re-running with the same cutoff selects the same set.
 */
export async function readReportCandidates(
  db: SupabaseClient,
  since: Date
): Promise<ReportCandidate[]> {
  const out: ReportCandidate[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("id, user_id, submitted_at, status")
      .in("status", ["submitted", "expired"])
      .gte("submitted_at", since.toISOString())
      .order("submitted_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readReportCandidates: ${error.message}`);
    const rows = data ?? [];
    for (const r of rows as Record<string, unknown>[]) {
      if (!r.submitted_at) continue;
      out.push({
        attemptId: r.id as string,
        userId: r.user_id as string,
        submittedAt: r.submitted_at as string,
      });
    }
    if (rows.length < PAGE) break;
  }
  return dropAbandoned(db, out);
}
