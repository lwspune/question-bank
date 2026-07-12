/**
 * Pure "voice of user" helpers (Phase 4) — NPS engagement gate, bucketing +
 * rollup, and submission validation for NPS + feature requests. No I/O;
 * unit-tested in tests/feedback-nps.test.ts. Mirrored by the DB CHECKs on
 * user_feedback (migration 0051).
 */

/** Show NPS only to an engaged student: at least this many completed mocks. */
export const NPS_MIN_COMPLETED_MOCKS = 2;
/** …and not more often than this — a cooldown, so it's never a nag. */
export const NPS_COOLDOWN_DAYS = 90;

const DAY_MS = 86_400_000;
const MESSAGE_MAX = 1000;

/**
 * Should we show the NPS prompt? Engagement-gated (≥ N completed mocks) AND
 * outside the cooldown since the last NPS answer (or never answered).
 */
export function needsNps(input: {
  completedMocks: number;
  lastNpsAt: string | null;
  now: number;
}): boolean {
  if (input.completedMocks < NPS_MIN_COMPLETED_MOCKS) return false;
  if (!input.lastNpsAt) return true;
  const last = new Date(input.lastNpsAt).getTime();
  if (Number.isNaN(last)) return true;
  return input.now - last >= NPS_COOLDOWN_DAYS * DAY_MS;
}

export type NpsBucket = "detractor" | "passive" | "promoter";

/** Standard NPS bucketing: 0–6 detractor, 7–8 passive, 9–10 promoter. */
export function npsBucket(score: number): NpsBucket {
  if (score >= 9) return "promoter";
  if (score >= 7) return "passive";
  return "detractor";
}

export type NpsRollup = {
  count: number;
  promoters: number;
  passives: number;
  detractors: number;
  /** %promoters − %detractors, rounded (the NPS, −100…100). */
  score: number;
};

export function computeNps(rows: readonly { score: number }[]): NpsRollup {
  const r: NpsRollup = { count: rows.length, promoters: 0, passives: 0, detractors: 0, score: 0 };
  for (const { score } of rows) {
    const b = npsBucket(score);
    if (b === "promoter") r.promoters += 1;
    else if (b === "passive") r.passives += 1;
    else r.detractors += 1;
  }
  if (r.count > 0) {
    r.score = Math.round(((r.promoters - r.detractors) / r.count) * 100);
  }
  return r;
}

/** Trim + cap a comment/message; blank → null. */
function cleanMessage(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  return t ? t.slice(0, MESSAGE_MAX) : null;
}

export type NpsValidation =
  | { ok: true; score: number; message: string | null }
  | { ok: false; message: string };

/** NPS needs an integer 0–10; comment optional. */
export function validateNps(input: { score: unknown; message?: unknown }): NpsValidation {
  const s = input.score;
  if (typeof s !== "number" || !Number.isInteger(s) || s < 0 || s > 10) {
    return { ok: false, message: "Pick a score from 0 to 10." };
  }
  return { ok: true, score: s, message: cleanMessage(input.message) };
}

export type FeatureValidation =
  | { ok: true; message: string }
  | { ok: false; message: string };

/** A feature request needs a non-empty message. */
export function validateFeatureRequest(input: { message: unknown }): FeatureValidation {
  const m = cleanMessage(input.message);
  if (!m) return { ok: false, message: "Tell us what you'd like to see." };
  return { ok: true, message: m };
}
