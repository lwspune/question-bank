/**
 * One row per sent answer sheet, for the student's list and the "Answer sheets"
 * card on both performance pages. Pure: the loaders in ./query read the sheets,
 * this decides what each row says and where it opens.
 *
 * Two viewers read the same rows. The student's open their own report; a
 * superadmin's open the staff copy under that student's dashboard, because the
 * student's report page reads with the student's own session and finds nothing
 * for anyone else.
 */
import type { OwnSubmission, SubmissionStatus } from "./query";

export type SheetViewer = { kind: "self" } | { kind: "staff"; studentId: string };

export type SheetRow = {
  id: string;
  title: string;
  /** The day it was sent, in India: "22 Oct 2026". */
  sentOn: string;
  status: SubmissionStatus;
  /** "48.5 / 80" once checked, otherwise null. */
  marks: string | null;
  href: string;
};

/** How many sheets the student's performance card shows before "All answer sheets". */
export const CARD_SHEET_LIMIT = 5;

export function sheetHref(viewer: SheetViewer, id: string): string {
  return viewer.kind === "self"
    ? `/me/answer-sheets/${id}`
    : `/dashboard/students/${viewer.studentId}/answer-sheets/${id}`;
}

function day(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function buildSheetRows(subs: OwnSubmission[], viewer: SheetViewer): SheetRow[] {
  return subs.map((s) => ({
    id: s.id,
    title: s.paper?.title ?? "Board paper",
    sentOn: day(s.submittedAt),
    status: s.status,
    marks: s.status === "graded" && s.totalAwarded !== null ? `${s.totalAwarded} / ${s.totalMax}` : null,
    href: sheetHref(viewer, s.id),
  }));
}

/**
 * The card's rows. The student sees their latest few and a link to the full
 * list; a superadmin sees every sheet, since there is no staff list to link to.
 */
export function cardSheetRows(subs: OwnSubmission[], viewer: SheetViewer): { rows: SheetRow[]; more: boolean } {
  const rows = buildSheetRows(subs, viewer);
  if (viewer.kind === "staff") return { rows, more: false };
  return { rows: rows.slice(0, CARD_SHEET_LIMIT), more: rows.length > CARD_SHEET_LIMIT };
}
