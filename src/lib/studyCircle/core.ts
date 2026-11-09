/**
 * The study-circle button test (owner, 2026-11-09; migration 0247). A card on
 * Home asks whether a student would use a circle of friends they already know
 * (each other's week, no chat, no scores, no ranking). Nothing is built: this
 * measures demand. Pure rules, shared by the route, the Home read and the
 * growth readout.
 */
import { isStage } from "@/lib/profile/onboarding";

/** The card stops showing, and the route stops writing, at this instant
 *  (midnight IST starting 24 Nov: 14 full days from 10 Nov). */
export const STUDY_CIRCLE_ENDS = new Date("2026-11-24T00:00:00+05:30");

/** Build friends-only circles only if at least this share of students who saw
 *  the card said Yes... */
export const STUDY_CIRCLE_YES_RATE = 0.1;
/** ...and at least this many said Yes. */
export const STUDY_CIRCLE_MIN_YES = 40;

export type StudyCircleAnswer = "yes" | "no";

/** Show the card while the test runs, until the student answers. */
export function studyCircleAskDue(row: { answer: string | null } | null, now: Date): boolean {
  if (now.getTime() >= STUDY_CIRCLE_ENDS.getTime()) return false;
  return !row || row.answer === null;
}

export type StudyCircleBody = { action: "shown" } | { action: "answer"; answer: StudyCircleAnswer };

export function parseStudyCircleBody(raw: unknown): { ok: true; value: StudyCircleBody } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid body" };
  const body = raw as Record<string, unknown>;
  if (body.action === "shown") return { ok: true, value: { action: "shown" } };
  if (body.action === "answer" && (body.answer === "yes" || body.answer === "no")) {
    return { ok: true, value: { action: "answer", answer: body.answer } };
  }
  return { ok: false, error: "Invalid answer" };
}

export type StudyCircleRow = { answer: string | null; stage: string | null };
export type StudyCircleCounts = { seen: number; yes: number; no: number; yesRate: number };
export type StudyCircleSummary = StudyCircleCounts & { school: StudyCircleCounts };

function count(rows: StudyCircleRow[]): StudyCircleCounts {
  const yes = rows.filter((r) => r.answer === "yes").length;
  const no = rows.filter((r) => r.answer === "no").length;
  return { seen: rows.length, yes, no, yesRate: rows.length ? yes / rows.length : 0 };
}

/** Everyone who saw the card, and Class 9-10 students on their own (the
 *  post that started this was a Class 10 student's). */
export function summariseStudyCircle(rows: StudyCircleRow[]): StudyCircleSummary {
  const school = rows.filter((r) => isStage(r.stage) && r.stage === "class-9-10");
  return { ...count(rows), school: count(school) };
}

export function studyCircleVerdict(s: StudyCircleCounts): "build" | "drop" {
  return s.yes >= STUDY_CIRCLE_MIN_YES && s.yesRate >= STUDY_CIRCLE_YES_RATE ? "build" : "drop";
}
