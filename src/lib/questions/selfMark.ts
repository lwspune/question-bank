/**
 * "Understood / Review later" on a written answer — the pure core (2026-10-28,
 * the owner's call).
 *
 * WHY THIS EXISTS. The drill is fed by `answer_wrong` rows, and only a graded
 * MCQ pick wrote one, so the ~27,000 written (subjective) questions could never
 * reach it. In the 30 days to 2026-10-28, ~400 students opened ~6,500 model
 * answers and nothing came back to them. No grader exists for a written
 * answer, so after the model answer the STUDENT judges their own: their tap is
 * the verdict, by design ("we will depend on judgement of student here").
 *
 * WHAT A TAP WRITES:
 *   - always one `self_mark` row (migration 0192): the tap itself, for
 *     measuring how many model answers get a tap at all, either button;
 *   - Review later → also `answer_wrong`: the question enters the drill;
 *   - Understood on a question WAITING in the drill → also `answer_correct`:
 *     it is fixed, the drill's one-right-answer rule (lib/drill/select.ts).
 *     Understood on a question never marked, or already fixed, writes no
 *     ladder row, because `answer_correct` means a recovery
 *     (lib/mocks/correctEvents.ts) and there is nothing to recover.
 * Both ladder rows carry `selfMark` in metadata, so any read can tell a
 * self-judged answer from a graded one.
 *
 * THE DRILL ROWS CARRY NO DEDUPE KEY, unlike an MCQ pick's
 * (lib/questions/bankVerdict answerDedupeKey): there the key stops a
 * reload-and-retap from fixing a question the student did not fix, but here
 * the student's tap IS the verdict, so the latest tap must always take effect.
 * A day key would drop a third same-day tap (Review, Understood, Review) while
 * the screen said "Saved". Only the TAP row is kept to one per question,
 * button, surface and India day, so a re-tap does not inflate the count.
 *
 * Pure: no DB, no clock of its own. Spec: tests/self-mark.test.ts.
 */
import type { ActivityEvent } from "@/lib/activity/events";
import type { QuestionState } from "@/lib/drill/select";
import { istDayKey } from "@/lib/email/dueNudge";

export const SELF_MARKS = ["understood", "review"] as const;
export type SelfMark = (typeof SELF_MARKS)[number];

/** Where the buttons sit outside the drill: /browse and the /questions pages
 *  (bank), and every board reader — /board, past papers, homework (board).
 *  The drill records its marks through /api/drill/answer. */
export const SELF_MARK_SURFACES = ["bank", "board"] as const;
export type SelfMarkSurface = (typeof SELF_MARK_SURFACES)[number];

export function isSelfMark(v: unknown): v is SelfMark {
  return typeof v === "string" && (SELF_MARKS as readonly string[]).includes(v);
}

function isSelfMarkSurface(v: unknown): v is SelfMarkSurface {
  return typeof v === "string" && (SELF_MARK_SURFACES as readonly string[]).includes(v);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export type ParsedSelfMark =
  | { ok: true; questionId: string; mark: SelfMark; surface: SelfMarkSurface }
  | { ok: false; error: string };

export function parseSelfMark(raw: unknown): ParsedSelfMark {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ok: false, error: "Invalid body." };
  const body = raw as Record<string, unknown>;
  const id = typeof body.questionId === "string" ? body.questionId.trim().toLowerCase() : "";
  if (!UUID_RE.test(id)) return { ok: false, error: "questionId must be a uuid." };
  if (!isSelfMark(body.mark)) return { ok: false, error: "mark must be understood or review." };
  if (!isSelfMarkSurface(body.surface)) return { ok: false, error: "surface must be bank or board." };
  return { ok: true, questionId: id, mark: body.mark, surface: body.surface };
}

/** What the student is told after a tap. */
export type SelfMarkOutcome =
  /** Review later: it is in Fix your mistakes. */
  | "saved"
  /** Understood on a question that was waiting: off the list. */
  | "fixed"
  /** Understood, and nothing was waiting. */
  | "understood";

/** The TAP row's key: one per question, button, surface and India day. */
export function selfMarkDedupeKey(
  mark: SelfMark,
  surface: string,
  userId: string,
  questionId: string,
  now: Date
): string {
  return `self_mark:${mark}:${surface}:${userId}:${questionId}:${istDayKey(now)}`;
}

export function selfMarkEvents(input: {
  questionId: string;
  mark: SelfMark;
  surface: SelfMarkSurface;
  /** The question's drill state BEFORE this tap (lib/drill/select questionState). */
  stateBefore: QuestionState;
  userId: string;
  now: Date;
}): { tap: ActivityEvent; ladder: ActivityEvent | null; outcome: SelfMarkOutcome } {
  const { questionId, mark, surface, stateBefore, userId, now } = input;
  const tap: ActivityEvent = {
    kind: "self_mark",
    refId: questionId,
    refKind: "question",
    metadata: { surface, mark },
    dedupeKey: selfMarkDedupeKey(mark, surface, userId, questionId, now),
  };
  const ladderRow = (kind: "answer_wrong" | "answer_correct"): ActivityEvent => ({
    kind,
    refId: questionId,
    refKind: "question",
    metadata: { surface, selfMark: mark },
  });

  if (mark === "review") return { tap, ladder: ladderRow("answer_wrong"), outcome: "saved" };
  if (stateBefore === "due") return { tap, ladder: ladderRow("answer_correct"), outcome: "fixed" };
  return { tap, ladder: null, outcome: "understood" };
}

/** What the student reads after a tap. Never "wrong": Review later is the
 *  student choosing to come back, not a verdict on them. */
export function selfMarkMessage(outcome: SelfMarkOutcome): string {
  switch (outcome) {
    case "saved":
      return "Saved for review. It's in Fix your mistakes.";
    case "fixed":
      return "Fixed: it's off your list.";
    case "understood":
      return "Marked as understood.";
  }
}

// ── a signed-out tap, saved after sign-in ────────────────────────────────────

/** Where a signed-out tap waits (localStorage, not session: an email sign-up
 *  confirms in a NEW tab). One tap, the latest: a visitor taps, signs in, and
 *  expects THAT one saved. */
export const PENDING_SELF_MARK_KEY = "qb_pending_self_mark";

/** Long enough to sign up and confirm an email; short enough that a tap from
 *  last week never lands in a drill unannounced. */
export const PENDING_SELF_MARK_TTL_MS = 2 * 60 * 60 * 1000;

export type PendingSelfMark = { questionId: string; mark: SelfMark; surface: SelfMarkSurface };

export function encodePendingSelfMark(p: PendingSelfMark, nowMs: number): string {
  return JSON.stringify({ ...p, at: nowMs });
}

/** Null for anything stale or malformed: the browser's storage is untrusted. */
export function parsePendingSelfMark(raw: string | null, nowMs: number): PendingSelfMark | null {
  if (!raw) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof v !== "object" || v === null) return null;
  const at = (v as { at?: unknown }).at;
  if (typeof at !== "number" || nowMs - at > PENDING_SELF_MARK_TTL_MS || at > nowMs) return null;
  const parsed = parseSelfMark(v);
  return parsed.ok ? { questionId: parsed.questionId, mark: parsed.mark, surface: parsed.surface } : null;
}
