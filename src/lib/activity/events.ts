/**
 * Pure core for the engagement activity spine (migration 0052).
 *
 * A `user_activity` row is one append-only fact about what a signed-in student
 * did — the substrate every later engagement mechanic (progress cockpit, weak-
 * area drills, milestones, weekly summary, re-engagement nudges) reads from,
 * rather than each re-deriving behaviour from scattered tables.
 *
 * DESIGN: kinds are a closed, learning-anchored allowlist — NO vanity/"logged
 * in N days"/"earned XP" kinds (see the engagement principles gate in CLAUDE.md).
 * Adding a kind is an append to ACTIVITY_KINDS + the DB CHECK (migration).
 *
 * This module is pure (no DB, no server-only) so it's unit-testable; the write
 * side lives in service.ts and the DB CHECK is the integrity backstop.
 */

/** The closed set of activity kinds. Every entry must map to a real learning or
 * engagement action — never a vanity metric. */
export const ACTIVITY_KINDS = [
  "mock_submitted", // finished + graded a timed mock (metadata: score, maxScore, …)
  "answer_wrong", // missed a question in a graded mock (refId = questionId) — drill fuel
  "answer_correct", // got a question right in a graded mock (refId = questionId)
  "chapter_mastered", // marked a /notes subtopic mastered (refId = subtopicSlug)
  "note_checkpoint", // completed a /notes mastery checkpoint (metadata: score, total)
  "question_bookmarked", // saved a question (refId = questionId)
  "quiz_taken", // completed a public/daily quiz
  "drill_completed", // finished a personalised weak-area drill (future phase)
] as const;

export type ActivityKind = (typeof ACTIVITY_KINDS)[number];

const KIND_SET: ReadonlySet<string> = new Set(ACTIVITY_KINDS);

export function isActivityKind(v: unknown): v is ActivityKind {
  return typeof v === "string" && KIND_SET.has(v);
}

/** A semantic event, as emitted by a write path (before it becomes a DB row). */
export type ActivityEvent = {
  kind: ActivityKind;
  /** Opaque reference into another table (questionId, attemptId, slug). */
  refId?: string;
  /** What refId points at ("mock_attempt", "question", "notes_subtopic"). */
  refKind?: string;
  /** Small extensible payload (score, subjectRoute, sectionKey). */
  metadata?: Record<string, unknown>;
  /** Idempotency key — set ONLY by the backfill so re-runs no-op on conflict.
   * Live events leave it undefined (repeats are legitimate history). */
  dedupeKey?: string;
};

const MAX_REF_LEN = 200;
const MAX_METADATA_KEYS = 50;

export type SanitizeActivityResult =
  | { ok: true; value: ActivityEvent }
  | { ok: false; error: string };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Validate + normalize an untrusted event body (e.g. from a future client
 * endpoint). Server-internal callers construct ActivityEvent directly, but this
 * keeps a single hardening point: closed kind, bounded refs, bounded metadata.
 */
export function sanitizeActivityEvent(raw: unknown): SanitizeActivityResult {
  if (!isPlainObject(raw)) return { ok: false, error: "Invalid event." };
  if (!isActivityKind(raw.kind)) return { ok: false, error: "Unknown activity kind." };

  const out: ActivityEvent = { kind: raw.kind };

  if (raw.refId !== undefined) {
    if (typeof raw.refId !== "string" || raw.refId.length === 0 || raw.refId.length > MAX_REF_LEN)
      return { ok: false, error: "Invalid refId." };
    out.refId = raw.refId;
  }
  if (raw.refKind !== undefined) {
    if (typeof raw.refKind !== "string" || raw.refKind.length === 0 || raw.refKind.length > MAX_REF_LEN)
      return { ok: false, error: "Invalid refKind." };
    out.refKind = raw.refKind;
  }
  if (raw.metadata !== undefined) {
    if (!isPlainObject(raw.metadata)) return { ok: false, error: "Invalid metadata." };
    if (Object.keys(raw.metadata).length > MAX_METADATA_KEYS)
      return { ok: false, error: "Metadata too large." };
    out.metadata = raw.metadata;
  }
  return { ok: true, value: out };
}

/** The DB-column shape of a user_activity insert. */
export type ActivityRow = {
  user_id: string;
  kind: ActivityKind;
  ref_id: string | null;
  ref_kind: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  dedupe_key?: string;
};

/**
 * Map a semantic event + acting user into the DB insert row. Pure — the service
 * supplies the timestamp so this stays deterministic + testable.
 */
export function buildActivityRow(userId: string, event: ActivityEvent, nowIso: string): ActivityRow {
  const row: ActivityRow = {
    user_id: userId,
    kind: event.kind,
    ref_id: event.refId ?? null,
    ref_kind: event.refKind ?? null,
    metadata: event.metadata ?? {},
    created_at: nowIso,
  };
  if (event.dedupeKey !== undefined) row.dedupe_key = event.dedupeKey;
  return row;
}
