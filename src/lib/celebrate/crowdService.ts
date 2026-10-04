/**
 * Server read for "beat the crowd" (2026-10-04). Rules: lib/celebrate/crowd.ts.
 *
 * SERVICE ROLE, deliberately and narrowly. `question_reviews` has no read
 * policy and `question_item_stats` is staff-read by RLS, so a student's own
 * client can read neither. This returns only a tier (70/80/90) for questions
 * the student has JUST answered right — a fact about a question, never about a
 * person — the same posture as the result page's peer rates (C4).
 *
 * REVIEWS FIRST. Almost no question has a crowd review, so the common path is
 * one indexed query that finds nothing and stops.
 *
 * Best-effort: any failure returns an empty map, i.e. no message.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  CROWD_REVIEW_RUNS,
  crowdTier,
  isCrowdEligible,
  poolFreshStats,
  type CrowdStatRow,
  type CrowdTier,
} from "./crowd";

/** Tiers for the given questions (≤50, the practice batch cap); absent = no message. */
export async function crowdTiers(questionIds: readonly string[]): Promise<Map<string, CrowdTier>> {
  const out = new Map<string, CrowdTier>();
  const ids = [...new Set(questionIds)];
  if (ids.length === 0) return out;
  try {
    const db = createSupabaseAdminClient();

    const { data: reviews, error: rErr } = await db
      .from("question_reviews")
      .select("question_id, verdict, reviewed_content_hash, reviewed_at")
      .in("run_label", [...CROWD_REVIEW_RUNS])
      .in("question_id", ids)
      .order("reviewed_at", { ascending: false });
    if (rErr) throw new Error(rErr.message);
    const latest = new Map<string, { verdict: string; hash: string }>();
    for (const r of (reviews ?? []) as { question_id: string; verdict: string; reviewed_content_hash: string }[]) {
      if (!latest.has(r.question_id)) latest.set(r.question_id, { verdict: r.verdict, hash: r.reviewed_content_hash });
    }
    if (latest.size === 0) return out;

    const reviewed = [...latest.keys()];
    const [{ data: qs, error: qErr }, { data: stats, error: sErr }] = await Promise.all([
      db.from("questions").select("id, content_hash, source_file").in("id", reviewed),
      db
        .from("question_item_stats")
        .select("question_id, attempted, correct, measured_content_hash, verdict_mismatch")
        .in("question_id", reviewed),
    ]);
    if (qErr) throw new Error(qErr.message);
    if (sErr) throw new Error(sErr.message);

    const statsBy = new Map<string, CrowdStatRow[]>();
    for (const s of (stats ?? []) as {
      question_id: string;
      attempted: number;
      correct: number;
      measured_content_hash: string | null;
      verdict_mismatch: number | null;
    }[]) {
      const list = statsBy.get(s.question_id) ?? [];
      list.push({
        attempted: s.attempted,
        correct: s.correct,
        measuredContentHash: s.measured_content_hash,
        verdictMismatch: s.verdict_mismatch,
      });
      statsBy.set(s.question_id, list);
    }

    for (const q of (qs ?? []) as { id: string; content_hash: string; source_file: string | null }[]) {
      const review = latest.get(q.id)!;
      const eligible = isCrowdEligible({
        reviewVerdict: review.verdict,
        reviewedHash: review.hash,
        currentHash: q.content_hash,
        sourceFile: q.source_file,
      });
      if (!eligible) continue;
      const tier = crowdTier(poolFreshStats(statsBy.get(q.id) ?? [], q.content_hash));
      if (tier !== null) out.set(q.id, tier);
    }
  } catch (e) {
    console.error("crowd tiers failed", e);
    return new Map();
  }
  return out;
}

/** The highest tier among the given questions, or null. */
export function topTier(tiers: ReadonlyMap<string, CrowdTier>): CrowdTier | null {
  let best: CrowdTier | null = null;
  for (const t of tiers.values()) if (best === null || t > best) best = t;
  return best;
}
