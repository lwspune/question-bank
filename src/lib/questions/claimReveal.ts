/**
 * The browser half of the server-decided daily answer limit (migration 0228,
 * 2026-11-08). Pure apart from the one call it is handed.
 *
 * The database function claim_reveal decides every NEW answer of the
 * signed-in daily limit and records it in the same step. Before it, the page
 * decided from a copy of today's count fetched once per load, and a failed
 * fetch left the student unlimited until a reload (2026-11-07: one student
 * opened 68 answers past a limit of 15). The copy is now for display only:
 * which cards look locked before a tap.
 *
 * When the server cannot be asked (offline, an error), `claimReveal` returns
 * null and the caller lets that ONE answer through: a student is never walled
 * by our error, and one failure costs one answer, not the rest of the visit.
 */
import type { DailyReveals } from "./revealMeter";
import { DAILY_REVEAL_SURFACES } from "./revealQuota";

export const CLAIM_REASONS = ["counted", "repeat", "limit", "pass", "free", "off", "path", "uncounted"] as const;
export type ClaimReason = (typeof CLAIM_REASONS)[number];

export type ClaimResult = { allowed: boolean; reason: ClaimReason; used: number | null; limit: number | null };

type Rpc = (fn: "claim_reveal", args: { p_question_id: string; p_surface: string }) => PromiseLike<{ data: unknown; error: unknown }>;

/**
 * Must the page ask the server before opening this answer? Yes for every new
 * answer on a counted surface, including when the page holds no copy of the
 * day's count. No for an answer already open today, today's board-path
 * questions, a pass the server has confirmed, a signed-out viewer (the
 * device's own wall) and the surfaces the limit does not cover.
 */
export function needsClaim(input: {
  signedIn: boolean;
  surface: string;
  unlimited: boolean;
  todayIds: readonly string[];
  exemptIds: readonly string[];
  questionId: string;
}): boolean {
  if (!input.signedIn || input.unlimited) return false;
  if (!(DAILY_REVEAL_SURFACES as readonly string[]).includes(input.surface)) return false;
  if (input.todayIds.includes(input.questionId) || input.exemptIds.includes(input.questionId)) return false;
  return true;
}

const isCount = (v: unknown): v is number | null => v === null || (typeof v === "number" && Number.isFinite(v));

export function parseClaim(data: unknown): ClaimResult | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (typeof d.allowed !== "boolean") return null;
  if (typeof d.reason !== "string" || !(CLAIM_REASONS as readonly string[]).includes(d.reason)) return null;
  const used = d.used ?? null;
  const limit = d.limit ?? null;
  if (!isCount(used) || !isCount(limit)) return null;
  return { allowed: d.allowed, reason: d.reason as ClaimReason, used, limit };
}

/** Ask the server. Null when it cannot be asked or the reply makes no sense. */
export async function claimReveal(rpc: Rpc, questionId: string, surface: string): Promise<ClaimResult | null> {
  try {
    const { data, error } = await rpc("claim_reveal", { p_question_id: questionId, p_surface: surface });
    if (error) return null;
    return parseClaim(data);
  } catch {
    return null;
  }
}

/**
 * The page's display copy after a claim. Counted or already open: this answer
 * is open today and the server's count is the count. Refused: the day's
 * answers are used, so every new card locks, even on a page whose own copy
 * never loaded. Anything else (a pass, a free exam, a path question) leaves
 * the copy as it was.
 */
export function applyClaim(copy: DailyReveals | null, questionId: string, result: ClaimResult): DailyReveals | null {
  if (result.limit === null || result.used === null) return copy;
  if (result.reason === "counted" || result.reason === "repeat") {
    const todayIds = copy?.todayIds ?? [];
    return {
      ...copy,
      limit: result.limit,
      todayIds: todayIds.includes(questionId) ? todayIds : [...todayIds, questionId],
      used: result.used,
    };
  }
  if (result.reason === "limit") {
    return { ...copy, limit: result.limit, todayIds: copy?.todayIds ?? [], used: result.used };
  }
  return copy;
}
