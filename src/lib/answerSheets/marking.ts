/**
 * What grading:preview and grading:commit share (migration 0175): check
 * grade.json's grades, then its page marks, and stamp what will be drawn. ONE
 * copy, so the commit compares against exactly what the preview drew. Pure but
 * for the hash. Spec: tests/answer-sheets-marking.test.ts.
 */
import { createHash } from "node:crypto";
import type { PaperItemRow } from "@/lib/questionPapers/listing";
import { validateGrade, type GradeRow } from "./grade";
import { drawingPayload, validateMarks, type PageMark } from "./pageMarks";
import { buildPaperReport, type PaperSummary } from "./paperReport";

type Passed = Extract<ReturnType<typeof validateGrade>, { ok: true }>;

export type SheetCheck =
  | { ok: true; grade: Passed; marks: PageMark[]; pageCount: number; payloadJson: string; stamp: string }
  | { ok: false; errors: string[] };

export const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

export function checkSheet(input: { items: PaperItemRow[]; totalMarks: number; file: unknown; pageCount: number }): SheetCheck {
  const { items, totalMarks, file, pageCount } = input;
  const grade = validateGrade({ items, totalMarks, file });
  if (!grade.ok) return { ok: false, errors: [...grade.errors, "(The page marks are checked once the grades pass.)"] };

  const marks = validateMarks({ marks: (file as { marks?: unknown }).marks, pageCount, rows: grade.rows });
  if (!marks.ok) return { ok: false, errors: marks.errors };

  const payloadJson = JSON.stringify({ pageCount, ...drawingPayload({ marks: marks.marks, rows: grade.rows }) });
  return { ok: true, grade, marks: marks.marks, pageCount, payloadJson, stamp: sha256(payloadJson) };
}

export type ReportPayload = {
  title: string;
  gradedOn: string;
  pageCount: number;
  wentWell: string;
  nextSteps: string;
  grades: { label: string; maxMarks: number; outcome: GradeRow["outcome"]; awarded: number | null; missing: string | null }[];
  report: PaperSummary;
};

/** What scripts/grading/pages.py `report` lays out: built by the same summary the report page shows. */
export function reportPayload(input: {
  title: string;
  gradedOn: string;
  totalMax: number;
  check: Extract<SheetCheck, { ok: true }>;
}): ReportPayload {
  const { grade, pageCount } = input.check;
  return {
    title: input.title,
    gradedOn: input.gradedOn,
    pageCount,
    wentWell: grade.wentWell,
    nextSteps: grade.nextSteps,
    grades: grade.rows.map((r) => ({
      label: `Q.${r.printedNumber}`,
      maxMarks: r.maxMarks,
      outcome: r.outcome,
      awarded: r.awarded,
      missing: r.missing,
    })),
    report: buildPaperReport({ grades: grade.rows, totalMax: input.totalMax }),
  };
}
