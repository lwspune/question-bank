/**
 * UCEED lane constants. README.md has the method; lib.ts the pure core.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { UCEED_SUBJECTS } from "../../src/lib/mocks/blueprints";

export { ORG_ID, CREATED_BY } from "../practice/config";

/** The exams.name of the row every UCEED question hangs off. */
export const EXAM_NAME = "UCEED";

/**
 * pyq_note on every row. The card's source tag prints it ("UCEED · 2026 · IIT Bombay · Q12"),
 * which is the credit line the owner asked for on 2026-11-03: the paper is IIT Bombay's.
 * It must stay a short pyq note to publish (publicPyqNote, 48 chars).
 */
export const PYQ_NOTE = "IIT Bombay";

/** Sources, figures and blind-solve scratch live outside the repo (nothing here is committed). */
export const ROOT = "C:\\tmp\\PYQPs\\UCEED";
/** A question's figure: Q<nn>.png, or Q<nn>.jpg when the PNG was over storage's 1 MB (extract.py fit_storage). */
export const figurePath = (year: number, n: number) => {
  const stem = join(ROOT, "figures", String(year), `Q${String(n).padStart(2, "0")}`);
  return existsSync(`${stem}.jpg`) ? `${stem}.jpg` : `${stem}.png`;
};
export const DATA = join(__dirname, "data");

/** The seven Part A areas of the official syllabus; one list, shared with the mock blueprint. */
export const SUBJECTS = UCEED_SUBJECTS;

export const sourceFile = (year: number) => `UCEED ${year} Part A (IIT Bombay)`;
