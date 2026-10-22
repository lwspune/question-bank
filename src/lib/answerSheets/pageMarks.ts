/**
 * Marks written onto a student's answer-sheet pages: ticks, crosses, circles,
 * short notes and each question's score (migration 0175). PURE.
 * Spec: tests/answer-sheets-page-marks.test.ts. Ported from nda-tracker's
 * homework marks (src/lib/assignments/pageMarks.js).
 *
 * The grader places them in grade.json's `marks` list as percent of the
 * PREPARED page (scripts/grading/pages.py makes the pages and a labelled grid
 * to read positions off). `grading:preview` draws them and the grader looks at
 * the drawing before `grading:commit` will save; the database repeats the shape
 * rules (answer_page_marks) and the one-score-per-scored-question rule.
 *
 * A score mark carries NO text: what it prints comes from the grade row
 * (scoreText), so a page can never show a number the grade does not hold.
 */
import type { GradeRow } from "./grade";

export const MARK_KINDS = ["tick", "cross", "circle", "note", "score"] as const;
export type MarkKind = (typeof MARK_KINDS)[number];
export const MAX_NOTE_CHARS = 80;
export const MAX_MARKS = 400;
/** Mirrors answer_page_marks.page and answer_submissions.marked_pages (0175). */
export const MAX_MARKED_PAGES = 60;
/** Kinds that show where marks were lost; a question that lost marks needs one. */
const LOSS_KINDS: readonly string[] = ["cross", "circle", "note"];

export type PageMark = {
  /** Order in the file, 1-based: the row's key in answer_page_marks. */
  seq: number;
  page: number;
  /** The graded question (its paper position, as in `grades`). */
  position: number;
  kind: MarkKind;
  x: number;
  y: number;
  w: number | null;
  h: number | null;
  text: string | null;
  toX: number | null;
  toY: number | null;
};

export type MarksCheck = { ok: true; marks: PageMark[] } | { ok: false; errors: string[] };

type Row = Pick<GradeRow, "position" | "printedNumber" | "maxMarks" | "outcome" | "awarded">;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const onPage = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 100;
const round1 = (n: number) => Math.round(n * 10) / 10;
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** "2.5/3". Numbers print without trailing zeros. */
export function scoreText(row: Pick<Row, "awarded" | "maxMarks">): string {
  return `${Number(row.awarded)}/${Number(row.maxMarks)}`;
}

const rowState = (row: Row) => (row.awarded === row.maxMarks ? "full" : row.awarded === 0 ? "zero" : "partial");

export function validateMarks(input: { marks: unknown; pageCount: number; rows: Row[] }): MarksCheck {
  const { marks, pageCount, rows } = input;
  if (!Array.isArray(marks)) {
    return { ok: false, errors: ["grade.json needs a `marks` list: the ticks, crosses, notes and scores to write on the pages."] };
  }
  const errors: string[] = [];
  if (marks.length > MAX_MARKS) errors.push(`Use at most ${MAX_MARKS} marks (there are ${marks.length}).`);
  const byPos = new Map(rows.map((r) => [r.position, r]));
  const q = (r: Row) => `Q.${r.printedNumber}`;
  const out: PageMark[] = [];

  marks.forEach((raw: unknown, i) => {
    const at = `Mark ${i + 1}`;
    if (!isObject(raw)) {
      errors.push(`${at} is not an object.`);
      return;
    }
    const row = typeof raw.position === "number" ? byPos.get(raw.position) : undefined;
    if (!row) {
      errors.push(`${at}: position ${String(raw.position)} is not a graded question.`);
      return;
    }
    const here = `${at} (${q(row)})`;
    let bad = false;
    const fail = (msg: string) => {
      errors.push(`${here}: ${msg}`);
      bad = true;
    };

    const kind = raw.kind as MarkKind;
    if (!MARK_KINDS.includes(kind)) {
      fail(`kind must be one of ${MARK_KINDS.join(", ")}.`);
      return;
    }
    if (!Number.isInteger(raw.page) || (raw.page as number) < 1 || (raw.page as number) > pageCount) {
      fail(`page must be a whole number from 1 to ${pageCount}.`);
    }
    if (!onPage(raw.x) || !onPage(raw.y)) fail("x and y must be numbers from 0 to 100 (percent of the page).");

    const hasSize = raw.w !== undefined || raw.h !== undefined;
    if (kind === "circle") {
      const sized = (v: unknown) => typeof v === "number" && Number.isFinite(v) && v > 0 && v <= 100;
      if (!sized(raw.w) || !sized(raw.h)) fail("a circle needs w and h, each above 0 and at most 100.");
    } else if (hasSize) {
      fail("only a circle has w and h.");
    }

    const note = text(raw.text);
    if (kind === "note") {
      if (!note) fail("a note needs text.");
      else if (note.length > MAX_NOTE_CHARS) fail(`the note is over ${MAX_NOTE_CHARS} characters.`);
    } else if (raw.text !== undefined && raw.text !== null && raw.text !== "") {
      fail("only a note has text (a score prints the marks from the grade).");
    }

    const to = raw.to;
    if (to !== undefined && to !== null) {
      if (kind !== "note") fail("only a note has `to`.");
      else if (!isObject(to) || !onPage(to.x) || !onPage(to.y)) fail("`to` must be a point from 0 to 100: { \"x\": …, \"y\": … }.");
    }
    if (bad) return;

    const point = kind === "note" && isObject(to) ? to : null;
    out.push({
      seq: out.length + 1,
      page: raw.page as number,
      position: row.position,
      kind,
      x: round1(raw.x as number),
      y: round1(raw.y as number),
      w: kind === "circle" ? round1(raw.w as number) : null,
      h: kind === "circle" ? round1(raw.h as number) : null,
      text: kind === "note" ? note : null,
      toX: point ? round1(point.x as number) : null,
      toY: point ? round1(point.y as number) : null,
    });
  });

  // Every question accounted for on the page. Counted over the raw list, so a
  // malformed score still stops "place one" from being reported as well.
  const kindsFor = (pos: number) => marks.filter((m) => isObject(m) && m.position === pos).map((m) => (m as Record<string, unknown>).kind);
  for (const row of rows) {
    const kinds = kindsFor(row.position);
    if (row.outcome === "not_attempted") {
      if (kinds.length > 0) errors.push(`${q(row)}: not attempted, so nothing goes on the page for it.`);
      continue;
    }
    if (row.outcome === "not_counted") {
      if (kinds.some((k) => k !== "note")) errors.push(`${q(row)}: not counted, so only a note (saying why) goes on the page.`);
      continue;
    }
    const scores = kinds.filter((k) => k === "score").length;
    if (scores === 0) errors.push(`${q(row)}: place one score mark (its marks, circled, beside the answer).`);
    if (scores > 1) errors.push(`${q(row)} has ${scores} score marks; place exactly one.`);
    if (row.awarded === row.maxMarks) {
      if (kinds.some((k) => LOSS_KINDS.includes(k as string))) {
        errors.push(`${q(row)}: full marks, so only ticks and the score go on the page.`);
      }
    } else if (!kinds.some((k) => LOSS_KINDS.includes(k as string))) {
      errors.push(`${q(row)}: marks were lost, so show where: add a cross, circle or note at the step.`);
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, marks: out };
}

export type DrawnMark = PageMark & { state: "full" | "partial" | "zero" | null };

/**
 * What scripts/grading/pages.py draws: every mark, with a score's text and
 * state taken from its grade row. Deterministic, so the preview stamp (a hash
 * of this) changes whenever a mark OR a mark's score changes.
 */
export function drawingPayload(input: { marks: PageMark[]; rows: Row[] }): { marks: DrawnMark[] } {
  const byPos = new Map(input.rows.map((r) => [r.position, r]));
  return {
    marks: input.marks.map((m) => {
      const row = byPos.get(m.position)!;
      return m.kind === "score" ? { ...m, text: scoreText(row), state: rowState(row) } : { ...m, state: null };
    }),
  };
}
