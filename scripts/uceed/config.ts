/**
 * UCEED lane constants. README.md has the method; lib.ts the pure core.
 */
import { join } from "node:path";

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
export const figurePath = (year: number, n: number) => join(ROOT, "figures", String(year), `Q${String(n).padStart(2, "0")}.png`);
export const DATA = join(__dirname, "data");

/** The seven Part A areas of the official syllabus (UCEED 2027 brochure, section 16), in its order. */
export const SUBJECTS = [
  "Visualization and Spatial Reasoning",
  "Practical and Scientific Knowledge",
  "Observation and Design Sensitivity",
  "Environment and Society",
  "Analytical and Logical Reasoning",
  "Language",
  "Creativity",
] as const;

export const sourceFile = (year: number) => `UCEED ${year} Part A (IIT Bombay)`;
