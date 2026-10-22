/**
 * The answer-sheet rows shown on the performance pages (and the student's own
 * list). Two viewers read the same sheets: the student, whose rows open their
 * own report, and a superadmin, whose rows open the staff copy of that report
 * under the student's dashboard. A row pointing the wrong way is either a 404
 * (staff sent to /me) or a dead end, so the link is the thing worth pinning.
 */
import { describe, it, expect } from "vitest";
import { buildSheetRows, cardSheetRows, sheetHref, CARD_SHEET_LIMIT } from "@/lib/answerSheets/sheetRows";
import type { OwnSubmission } from "@/lib/answerSheets/query";

const STUDENT = "11111111-2222-3333-4444-555555555555";

function sub(over: Partial<OwnSubmission> = {}): OwnSubmission {
  return {
    id: "aaaaaaaa-0000-0000-0000-000000000001",
    status: "graded",
    submittedAt: "2026-10-21T18:54:21Z",
    gradedAt: "2026-10-22T06:00:00Z",
    regradedAt: null,
    totalAwarded: 48.5,
    totalMax: 80,
    wentWell: null,
    nextSteps: null,
    rejectedReason: null,
    markedPages: 5,
    scansDeleted: false,
    paper: { title: "Maharashtra HSC Class 12 Mathematics February 2026", examId: "e", subjectId: "s", href: null },
    ...over,
  };
}

describe("sheetHref", () => {
  it("opens the student's own report for the student", () => {
    expect(sheetHref({ kind: "self" }, "abc")).toBe("/me/answer-sheets/abc");
  });

  it("opens the staff copy under that student's dashboard for a superadmin", () => {
    expect(sheetHref({ kind: "staff", studentId: STUDENT }, "abc")).toBe(
      `/dashboard/students/${STUDENT}/answer-sheets/abc`
    );
  });
});

describe("buildSheetRows", () => {
  it("shows the marks of a checked sheet", () => {
    const [row] = buildSheetRows([sub()], { kind: "self" });
    expect(row).toMatchObject({ status: "graded", marks: "48.5 / 80", title: sub().paper!.title });
  });

  it("has no marks while the sheet is being checked or after it was rejected", () => {
    const rows = buildSheetRows(
      [sub({ status: "submitted", totalAwarded: null, totalMax: null }), sub({ status: "rejected", totalAwarded: null, totalMax: null })],
      { kind: "self" }
    );
    expect(rows.map((r) => [r.status, r.marks])).toEqual([
      ["submitted", null],
      ["rejected", null],
    ]);
  });

  it("dates a sheet by the day in India, not in UTC", () => {
    // 18:54 UTC on the 21st is 00:24 IST on the 22nd.
    expect(buildSheetRows([sub()], { kind: "self" })[0].sentOn).toBe("22 Oct 2026");
  });

  it("names a sheet whose paper is no longer published", () => {
    expect(buildSheetRows([sub({ paper: null })], { kind: "self" })[0].title).toBe("Board paper");
  });

  it("links every row for the viewer it is built for", () => {
    const rows = buildSheetRows([sub({ id: "x1" }), sub({ id: "x2" })], { kind: "staff", studentId: STUDENT });
    expect(rows.map((r) => r.href)).toEqual([
      `/dashboard/students/${STUDENT}/answer-sheets/x1`,
      `/dashboard/students/${STUDENT}/answer-sheets/x2`,
    ]);
  });
});

describe("cardSheetRows", () => {
  const many = Array.from({ length: CARD_SHEET_LIMIT + 1 }, (_, i) => sub({ id: `s${i}` }));

  it("shows nothing at all when no sheet was sent", () => {
    expect(cardSheetRows([], { kind: "self" })).toEqual({ rows: [], more: false });
    expect(cardSheetRows([], { kind: "staff", studentId: STUDENT })).toEqual({ rows: [], more: false });
  });

  it("shows the student their latest sheets and says there are more", () => {
    const card = cardSheetRows(many, { kind: "self" });
    expect(card.rows.map((r) => r.id)).toEqual(many.slice(0, CARD_SHEET_LIMIT).map((s) => s.id));
    expect(card.more).toBe(true);
  });

  it("does not claim more when every sheet fits", () => {
    expect(cardSheetRows(many.slice(0, 2), { kind: "self" }).more).toBe(false);
  });

  it("shows a superadmin every sheet", () => {
    const card = cardSheetRows(many, { kind: "staff", studentId: STUDENT });
    expect(card.rows).toHaveLength(many.length);
    expect(card.more).toBe(false);
  });
});
