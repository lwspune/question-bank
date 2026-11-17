// Config for the UP Board (UPMSP) Class 10 + Class 12 BOARD PYQ ingestion.
//
// ── SOURCE ────────────────────────────────────────────────────────────────────
// UPMSP's own site (upmsp.edu.in) publishes NO past papers: only next year's
// model papers and a Class 9 question bank (checked 2026-11-17). The past papers
// come from upboardonline.com as SCANS of the board's own print, which is what
// our source rule asks for (an image of the original, never a typed copy). The
// owner OK'd the source on 2026-11-17. Each scan carries the site's URL in the
// footer and some carry a student's ticks and circles on the options: a tick is
// NEVER an answer, and a figure crop must not carry the footer.
//
// Saved as C:\Vilas\LWS_Pune\UP_Board\PYQPs\<the site's file name>.pdf, e.g.
// up-board-class-10-mathematics-822-bw-2025.pdf.
//
// ── SCOPE (owner, 2026-11-17) ─────────────────────────────────────────────────
// 2025 + 2026, Class 10 Mathematics (822) + Science (824), Class 12 Mathematics
// (324) + Physics (346) + Chemistry (347) + Biology (348): 82 papers, about seven
// SERIES per subject a year. The series are DIFFERENT papers on one pattern
// (2025 Maths BW asks the probability of an odd number where BX asks an even
// one), so every paper is new work. A paper with no English (or whose scan lost
// the English pages) is LEFT OUT, not translated by us.
//
// ── LANGUAGE ──────────────────────────────────────────────────────────────────
// Every question is printed in Hindi AND English. English is the canonical row
// (content_hash is English, as for RAS and SSC); Hindi is a translation
// (migration 0118). The owner chose Hindi as UP's default language and
// solutions in BOTH languages. Two print layouts exist: 12 pages (a whole
// section in Hindi, then the same section in English) and 8 pages (each
// question in Hindi, then in English).
//
// ── ANSWERS ───────────────────────────────────────────────────────────────────
// UPMSP publishes NO answer key and NO marking scheme. Every MCQ answer is
// worked out twice, blind, and every disagreement is settled by hand. Every
// solution says so.
import { join } from "node:path";

export { ORG_ID, CREATED_BY } from "../practice/config";
import { NCERT_CHAPTERS_FOR } from "./ncertSubtopics";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\UP_Board\\PYQPs";
export const OUT = join(__dirname, "out"); // gitignored: rendered pages
export const DATA = join(__dirname, "data"); // committed: transcriptions + answers

/** Filled by seed-exam.ts --apply. Empty means "not seeded yet" and commit refuses. */
export const EXAM_ID_UP_10 = "";
export const EXAM_ID_UP_12 = "";

export const EXAM_NAME_UP_10 = "UP Board Class 10";
export const EXAM_NAME_UP_12 = "UP Board Class 12";

export type UpClass = 10 | 12;
export type UpSubjectKey = "maths10" | "science10" | "maths12" | "physics12" | "chemistry12" | "biology12";

export type UpSubject = {
  key: UpSubjectKey;
  cls: UpClass;
  /** The board's subject code, printed on every page, e.g. 822. */
  code: string;
  /** The word upboardonline uses in its file names. */
  fileWord: string;
  /** The DB subject name. Must exist before the first commit (seed-subjects.ts). */
  subjectName: string;
};

export const SUBJECTS: Record<UpSubjectKey, UpSubject> = {
  maths10: { key: "maths10", cls: 10, code: "822", fileWord: "mathematics", subjectName: "Mathematics" },
  science10: { key: "science10", cls: 10, code: "824", fileWord: "science", subjectName: "Science" },
  maths12: { key: "maths12", cls: 12, code: "324", fileWord: "mathematics", subjectName: "Mathematics" },
  physics12: { key: "physics12", cls: 12, code: "346", fileWord: "physics", subjectName: "Physics" },
  chemistry12: { key: "chemistry12", cls: 12, code: "347", fileWord: "chemistry", subjectName: "Chemistry" },
  biology12: { key: "biology12", cls: 12, code: "348", fileWord: "biology", subjectName: "Biology" },
};

export function examIdFor(cls: UpClass): string {
  return cls === 10 ? EXAM_ID_UP_10 : EXAM_ID_UP_12;
}

/**
 * Chapters a UP paper may file a question on: the NCERT chapters (UP teaches
 * from the NCERT books) under the SAME names as CBSE, so a chapter reads the
 * same across boards, plus any chapter UP still teaches that NCERT dropped.
 * Those extras carry NO "[Outdated]" marker: for a UP student they are current.
 * Add one here only when a paper actually examines it.
 */
export const EXTRA_CHAPTERS: Partial<Record<UpSubjectKey, Record<string, string[]>>> = {
  // The 2025-26 paper instructions (x)-(xi) tell candidates how to answer
  // construction questions, so UP still examines Constructions.
  // Subtopic names are CBSE's (CLASS10_ADDENDUM §4, the old NCERT section
  // titles), so the two boards never fork a name.
  maths10: { Constructions: ["Division of a Line Segment", "Construction of Tangents to a Circle"] },
};

/** chapter -> subtopics a UP row may use, for one subject. */
export function subtopicCatalog(subject: UpSubject): Map<string, string[]> {
  const out = new Map<string, string[]>(NCERT_CHAPTERS_FOR(subject));
  for (const [ch, subs] of Object.entries(EXTRA_CHAPTERS[subject.key] ?? {})) {
    out.set(ch, [...new Set([...(out.get(ch) ?? []), ...subs])]);
  }
  return out;
}
