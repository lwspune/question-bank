/**
 * The stored exam guess (migration 0254, owner 2026-11-14): for a student who
 * never chose an exam, the one their practice or first page points to
 * (suggestExam.ts), kept apart from `target_exams` because that column means
 * the student CHOSE it, and /account, rosters, emails and the results question
 * all read it that way.
 *
 * Home shows it as "Your exam: X (our guess)" with Correct and Change. The
 * guess is kept after the student chooses, so its accuracy can be measured.
 *
 * Pure rules shared by the header, the card's route and the daily job.
 * Spec: tests/exam-guess.test.ts.
 */
import { onSiteExam, type GuessSource, type InferredExam } from "./suggestExam";

/** The welcome-screen experiment (registry `welcome-exam-confirm`) counts
 *  accounts created from here on by whether they end up with an exam. */
export const WELCOME_TEST_FROM = new Date("2026-11-13T00:00:00+05:30");
/** That test's 14 days end; from here every no-exam student gets the card. */
export const GUESS_CARD_ALL_FROM = new Date("2026-11-28T00:00:00+05:30");

/** The daily job waits this long after sign-up: the welcome screen and the
 *  first visits get their chance to ask first. */
export const GUESS_MIN_AGE_DAYS = 3;
/** ...and guesses for every account this young, active or not, so a missed
 *  run still reaches a student who landed, signed up and went quiet. */
export const GUESS_NEW_ACCOUNT_DAYS = 5;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * "guess": the new card. "suggest": the old "Studying for X?" card, kept for
 * accounts the welcome-screen test is measuring until it ends, so a better
 * Home card cannot be mistaken for a better welcome screen. An unknown sign-up
 * date counts as new: the safe side for the test.
 */
export function guessCardVariant(createdAt: string | null | undefined, now: Date): "guess" | "suggest" {
  if (now.getTime() >= GUESS_CARD_ALL_FROM.getTime()) return "guess";
  const t = createdAt ? Date.parse(createdAt) : NaN;
  return Number.isFinite(t) && t < WELCOME_TEST_FROM.getTime() ? "guess" : "suggest";
}

export type StoredGuessRow = { exam: string; source: string; card_answer: string | null };

/**
 * The stored guess as the header uses it: the exam, "declined" once the
 * student tapped Change (they said it is wrong; the plain "Choose your exam"
 * shows instead), or null when there is none to use.
 */
export function storedGuess(row: StoredGuessRow | null): InferredExam | "declined" | null {
  if (!row) return null;
  if (row.card_answer === "change") return "declined";
  const slug = onSiteExam(row.exam);
  if (!slug || (row.source !== "practice" && row.source !== "landing")) return null;
  return { slug, source: row.source as GuessSource };
}

/** Whether the daily job works out this no-exam student's guess today. */
export function guessDue(input: {
  createdAt: string | null;
  now: Date;
  /** Their stored guess, if any: answered = they tapped Correct or Change. */
  row: { answered: boolean } | null;
  /** Answered a question since the previous run. */
  activeRecently: boolean;
  /** The backfill: everyone not answered. */
  all: boolean;
}): boolean {
  if (input.row?.answered) return false;
  if (input.all) return true;
  const t = input.createdAt ? Date.parse(input.createdAt) : NaN;
  if (!Number.isFinite(t)) return false;
  const ageDays = (input.now.getTime() - t) / DAY_MS;
  if (ageDays < GUESS_MIN_AGE_DAYS) return false;
  if (!input.row && ageDays < GUESS_NEW_ACCOUNT_DAYS) return true;
  return input.activeRecently;
}

export type GuessWrite =
  | { kind: "none" }
  | { kind: "insert"; values: { exam: string; source: GuessSource; guessed_at: string } }
  | {
      kind: "update";
      values: { exam: string; source: GuessSource; guessed_at: string; card_seen_at: null };
    };

/**
 * What to write for a fresh guess. No guess writes nothing: a record that
 * became mixed, or a read that failed, never clears a guess. The same exam
 * writes nothing, so guessed_at stays the first time. A different exam
 * replaces it and forgets that the old card was seen.
 */
export function planGuessWrite(
  row: { exam: string; source: string; card_seen_at: string | null } | null,
  next: InferredExam | null,
  now: Date
): GuessWrite {
  if (!next) return { kind: "none" };
  const guessed_at = now.toISOString();
  if (!row) return { kind: "insert", values: { exam: next.slug, source: next.source, guessed_at } };
  if (row.exam === next.slug) return { kind: "none" };
  return { kind: "update", values: { exam: next.slug, source: next.source, guessed_at, card_seen_at: null } };
}

export type ExamGuessBody = { action: "seen" | "correct" | "change" };

export function parseExamGuessBody(raw: unknown): { ok: true; value: ExamGuessBody } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid body" };
  const action = (raw as Record<string, unknown>).action;
  if (action === "seen" || action === "correct" || action === "change") return { ok: true, value: { action } };
  return { ok: false, error: "Invalid action" };
}
