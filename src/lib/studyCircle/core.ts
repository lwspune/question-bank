/**
 * The study-circle button test (owner, 2026-11-09; migration 0247). A card on
 * Home asks whether a student would use a circle of friends they already know
 * (each other's week, no chat, no scores, no ranking). Nothing was built: it
 * measured demand. Retired 2026-11-15 (6 of 157 said Yes): the card, its
 * route and the Home read are gone; these are the rules the growth readout
 * still uses.
 */
import { isStage } from "@/lib/profile/onboarding";

/** Build friends-only circles only if at least this share of students who saw
 *  the card said Yes... */
export const STUDY_CIRCLE_YES_RATE = 0.1;
/** ...and at least this many said Yes. */
export const STUDY_CIRCLE_MIN_YES = 40;

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
