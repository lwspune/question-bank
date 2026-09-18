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

export type ReportCandidate = {
  attemptId: string;
  userId: string;
  submittedAt: string;
};

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
  return out;
}
