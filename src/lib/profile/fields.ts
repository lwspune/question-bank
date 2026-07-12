/**
 * Pure helpers for the self-serve /account profile fields (Phase 2 of the
 * staggered data-collection plan) + the completion-meter math. No I/O; safe to
 * import on the client (the meter updates live as the form changes). Unit-tested
 * in tests/profile-fields.test.ts.
 *
 * Sibling of onboarding.ts (exam + stage) — this adds the never-gated fields a
 * student fills at their own pace on /account: medium, stream, city, goal.
 */
import { sanitizeTargetExams, isStage, type Stage } from "@/lib/profile/onboarding";
import type { ExamSlug } from "@/lib/exam/examContext";

/** Language of instruction. Closed set — mirrored by the DB CHECK (0049). */
export const MEDIUMS = ["hindi", "english"] as const;
export type Medium = (typeof MEDIUMS)[number];

/**
 * Academic stream at the PCM/PCB/PCMB granularity — enough to tell a maths-track
 * (NDA/JEE) student from a bio-track (NEET) one, which is the whole point of
 * capturing it (the "background mismatch" segment). Mirrored by the DB CHECK.
 */
export const STREAMS = ["pcm", "pcb", "pcmb", "commerce", "arts"] as const;
export type Stream = (typeof STREAMS)[number];

const MEDIUM_SET = new Set<string>(MEDIUMS);
const STREAM_SET = new Set<string>(STREAMS);

export function isMedium(value: unknown): value is Medium {
  return typeof value === "string" && MEDIUM_SET.has(value);
}
export function isStream(value: unknown): value is Stream {
  return typeof value === "string" && STREAM_SET.has(value);
}

const CITY_MAX = 80;
const GOAL_MAX = 200;

/** Trim, cap, and collapse blank/whitespace-only to null. */
function cleanText(raw: unknown, max: number): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

/** The editable self-serve fields, all optional. */
export type ProfileDetails = {
  targetExams?: ExamSlug[];
  stage?: Stage | null;
  medium?: Medium | null;
  stream?: Stream | null;
  city?: string | null;
  goal?: string | null;
};

/**
 * Sanitise a PARTIAL profile patch — only the keys that were provided come back,
 * so /account can PATCH just what changed. Enums null out when unknown, free
 * text is trimmed/capped, exams run through the registry sanitiser. Never throws
 * — /account edits are never a hard gate.
 */
export function sanitizeProfileDetails(input: Record<string, unknown>): ProfileDetails {
  const out: ProfileDetails = {};
  if ("targetExams" in input) out.targetExams = sanitizeTargetExams(input.targetExams);
  if ("stage" in input) out.stage = isStage(input.stage) ? input.stage : null;
  if ("medium" in input) out.medium = isMedium(input.medium) ? input.medium : null;
  if ("stream" in input) out.stream = isStream(input.stream) ? input.stream : null;
  if ("city" in input) out.city = cleanText(input.city, CITY_MAX);
  if ("goal" in input) out.goal = cleanText(input.goal, GOAL_MAX);
  return out;
}

/** The full profile shape the completion meter scores. */
export type ScorableProfile = {
  mobile: string | null;
  targetExams: string[];
  stage: string | null;
  medium: string | null;
  stream: string | null;
  city: string | null;
  goal: string | null;
};

/** The fields counted toward "% complete", in display order. Mobile is
 *  included (the user's call) so /account is the single view of profile depth. */
const SCORED_FIELDS: readonly (keyof ScorableProfile)[] = [
  "mobile",
  "targetExams",
  "stage",
  "medium",
  "stream",
  "city",
  "goal",
];

function isFilled(profile: ScorableProfile, key: keyof ScorableProfile): boolean {
  const v = profile[key];
  if (key === "targetExams") return Array.isArray(v) && v.length > 0;
  return typeof v === "string" && v.trim().length > 0;
}

export type ProfileCompletion = {
  filled: number;
  total: number;
  percent: number;
  missing: (keyof ScorableProfile)[];
};

/**
 * The completion-meter math: how many of the scored fields are filled, as a
 * count + rounded percent + the list still missing. A nudge, never a gate.
 */
export function profileCompletion(profile: ScorableProfile): ProfileCompletion {
  const missing: (keyof ScorableProfile)[] = [];
  let filled = 0;
  for (const key of SCORED_FIELDS) {
    if (isFilled(profile, key)) filled += 1;
    else missing.push(key);
  }
  const total = SCORED_FIELDS.length;
  return { filled, total, percent: Math.round((filled / total) * 100), missing };
}
