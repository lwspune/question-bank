/**
 * "Did you clear it?": the card a student sees on /me after an exam's result
 * is announced (migration 0149, 2026-10-10). Pure: no I/O.
 *
 * A "yes" with consent is only a REQUEST to be shown: it is stored unpublished
 * and a superadmin reviews it, because we cannot verify a result.
 */
import type { ExamSlug } from "@/lib/exam/examContext";
import type { ResultStage } from "./summary";

export type OpenAnnouncement = {
  id: string;
  examSlug: ExamSlug;
  examName: string;
  sitting: string;
  stage: ResultStage;
  /** YYYY-MM-DD */
  announcedOn: string;
  /** YYYY-MM-DD, the last day the card is shown. */
  askUntil: string;
};

export const RESULT_OUTCOMES = ["cleared", "not_cleared", "did_not_appear", "dismissed"] as const;
export type ResultOutcome = (typeof RESULT_OUTCOMES)[number];

export type ResultAnswer = {
  announcementId: string;
  outcome: ResultOutcome;
  showPublicly: boolean;
  displayName: string | null;
};

/**
 * The announcements to ask this student about today: inside the window (both
 * ends included), of an exam they chose, not answered yet. Any answer, a
 * dismissal included, stops the asking. Newest first.
 */
export function pendingChecks(
  announcements: readonly OpenAnnouncement[],
  targetExams: readonly string[],
  answered: ReadonlySet<string>,
  todayIso: string
): OpenAnnouncement[] {
  const mine = new Set(targetExams);
  return announcements
    .filter((a) => mine.has(a.examSlug) && !answered.has(a.id) && a.announcedOn <= todayIso && todayIso <= a.askUntil)
    .sort((a, b) => b.announcedOn.localeCompare(a.announcedOn));
}

/** Collapse spaces and trim: "  Ratnesh   Garg " -> "Ratnesh Garg". */
function tidy(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

/** The same rule as the database CHECK on student_results.display_name. */
export function isShowableName(name: string): boolean {
  const n = tidy(name);
  return n.length >= 2 && n.length <= 60 && !/[0-9_@]/.test(n);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Check a posted answer before anything is written (fail fast). */
export function validateResultAnswer(
  input: unknown
): { ok: true; value: ResultAnswer } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Send an answer." };
  const b = input as Record<string, unknown>;
  if (typeof b.announcementId !== "string" || !UUID.test(b.announcementId)) {
    return { ok: false, error: "Unknown result." };
  }
  if (typeof b.outcome !== "string" || !(RESULT_OUTCOMES as readonly string[]).includes(b.outcome)) {
    return { ok: false, error: "Unknown answer." };
  }
  const outcome = b.outcome as ResultOutcome;
  const showPublicly = b.showPublicly === true;
  if (showPublicly && outcome !== "cleared") return { ok: false, error: "Only a cleared result can be shown." };
  let displayName: string | null = null;
  if (showPublicly) {
    if (typeof b.displayName !== "string" || !isShowableName(b.displayName)) {
      return { ok: false, error: "Enter your name as it should appear: letters and spaces only." };
    }
    displayName = tidy(b.displayName);
  }
  return { ok: true, value: { announcementId: b.announcementId, outcome, showPublicly, displayName } };
}

/** The account's name, filled in on the card; blank when it looks like a handle. */
export function suggestDisplayName(meta: Record<string, unknown> | null | undefined): string {
  const raw = meta?.full_name ?? meta?.name;
  if (typeof raw !== "string") return "";
  return isShowableName(raw) ? tidy(raw) : "";
}

/** The card's question: "Did you clear the NDA 2 2026 written exam?" */
export function checkQuestion(a: Pick<OpenAnnouncement, "sitting" | "stage">): string {
  switch (a.stage) {
    case "written":
      return `Did you clear the ${a.sitting} written exam?`;
    case "ssb":
      return `Were you recommended at the ${a.sitting} SSB?`;
    case "final":
      return `Did you make the ${a.sitting} final merit list?`;
  }
}
