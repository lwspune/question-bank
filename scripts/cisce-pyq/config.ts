/**
 * Config for the ISC Class-12 PCM **BOARD PYQ** ingestion.
 *
 * ISC is CISCE's Class-12 certificate. It is NOT ICSE, which is CISCE's Class-10
 * certificate — a distinction worth stating because the request that opened this
 * lane said "ICSE 12th", and the two archives sit side by side on disk with
 * different papers, different syllabi and different patterns.
 *
 * ── WHAT MAKES THIS LANE DIFFERENT FROM ITS PREDECESSORS ─────────────────────
 * `mh-ssc-10`, `mh-sb-9` and `mh-hsc-12` ship no answer key at all, so every
 * answer there is derived and the end-of-source cross-check gate cannot run.
 * `cbse-12-pyq` ships an official marking scheme paired 1:1 with every paper.
 *
 * ISC sits in BETWEEN, and the split is by year rather than by subject:
 *
 *   2025 — CISCE's "Analysis of Pupil Performance" reproduces every question
 *          AND its official marking scheme (verified: 22/20/21 MARKING SCHEME
 *          blocks against 22/20/21 questions, no gaps). Key available.
 *   2026 — question papers only. The 2025 edition was published in November
 *          2025, so the 2026 edition is expected around November 2026; until it
 *          lands there is no key for this year.
 *
 * Answers are BLIND-DERIVED for both years and then, for 2025 only, diffed
 * against CISCE's own. That ordering is deliberate: it makes 2025 the one place
 * ISC derivation accuracy can be MEASURED rather than asserted, and that
 * measured rate is what says how far to trust the 2026 answers. Same role the
 * UPSC CSE corpus plays for the blind-derivation pipeline generally.
 *
 * ⚠ The derivers must not see the key. Withhold it at dump time rather than
 * asking an agent to ignore it — see [[blind-check-contamination]].
 *
 * ── MEASURED PROPERTIES ──────────────────────────────────────────────────────
 * 1. VISION ONLY. The 2026 papers have a ZERO-character text layer (150 dpi
 *    scans, legible and crisp at a 200 dpi render, with a diagonal serial-number
 *    watermark). The 2025 marking schemes DO have a text layer, and it is
 *    LOSSY rather than merely noisy: every math-italic glyph is doubled and
 *    letters COLLAPSE ONTO EACH OTHER, so `dx` and `dy` both extract as the same
 *    `𝑑𝑑𝑑𝑑` and `sin` as `𝑆𝑆𝑆𝑆𝑆𝑆`. No substitution table can repair that, because
 *    the information is gone. Use the text layer for prose cross-checking only;
 *    every symbol comes from vision. (Same class as the cbse-11 / mh-sb-11 trap,
 *    one step worse.)
 * 2. NO VECTOR DRAWINGS ANYWHERE — every page is a raster plus PNG overlays, so
 *    figures are cropped from the page image, not extracted as objects.
 * 3. FIGURES AND TABLES BOTH OCCUR (numbered "Figure 5" circuit diagrams in
 *    Physics; a features/ G1 / G2 grid in Physics Q11). Tables are authored as
 *    GFM pipe-tables per the project convention.
 * 4. ONE PAPER PER SUBJECT PER YEAR. ISC prints no series/set variants, unlike
 *    CBSE's 5-6 series x 3 sets — so there is no cross-set dedup axis here, and
 *    `content_hash` has nothing to collapse within a sitting.
 *
 * ── THE INTERNAL-CHOICE TRAP ─────────────────────────────────────────────────
 * ISC numbers an internal choice's two branches as SUBPARTS:
 *
 *     Question 16                     Question 1
 *      (i)  …drone cameras…            (i)   …
 *             OR                       (ii)  …
 *      (ii) …perpendicular vectors…    (iii) …
 *
 * Under Q16 those are ALTERNATIVES; under Q1 they are all COMPULSORY. Identical
 * label shape, opposite meaning, and the only discriminator is the bare `OR`
 * line. Both branches are bank rows either way — what the distinction protects
 * is the marks arithmetic and any future /mock reconstruction. See
 * ./pattern.ts for the per-paper counts.
 *
 * A caution inherited from cbse-12-pyq, which learned it on real data: for 2025
 * the QUESTION TEXT comes from the marking-scheme document, and CBSE was
 * observed pasting a sibling set's question block into the wrong marking scheme.
 * ISC prints one paper per subject per year, so that specific failure mode has
 * no mechanism here — but we hold no 2025 question paper, so it is unverified
 * rather than ruled out. Treat a 2025 stem that reads oddly as suspect.
 */
export { ORG_ID, CREATED_BY } from "../practice/config";
export {
  ISC_SUBJECTS,
  MEASURED_YEARS,
  patternForYear,
  effectiveMarks,
  isMeasuredYear,
  type IscSubject,
  type MeasuredYear,
  type PaperPattern,
  type SectionSpec,
  type SectionId,
} from "./pattern";
import { CISCE_EXAMS, sourceForYear as sourceForExamYear, type YearSource } from "./exams";
import { ISC_12_SUBJECTS, ISC_12_TAXONOMY, ISC_12_SUBTOPICS, type IscChapter, type Isc12Subject } from "./taxonomy/isc-12";

export type { YearSource, IscChapter };

/**
 * ── ISC ALIASES ──────────────────────────────────────────────────────────────
 * This lane was ISC-only until 2026-10-30; the per-exam profiles now live in
 * exams.ts. These names stay so the ISC specs (tests/isc-12-*.test.ts) read as
 * they were written. New code takes a CisceExam from exams.ts instead.
 */
export const ISC_12_EXAM_NAME = CISCE_EXAMS["isc-12"].examName as "ISC Class 12";
export const ISC_TAXONOMY = ISC_12_TAXONOMY;
export const ISC_SUBTOPICS = ISC_12_SUBTOPICS;
export const YEAR_SOURCES: readonly YearSource[] = CISCE_EXAMS["isc-12"].years;
export const sourceForYear = (year: number): YearSource => sourceForExamYear(CISCE_EXAMS["isc-12"], year);
export function chaptersFor(subject: Isc12Subject): readonly IscChapter[] {
  return ISC_12_TAXONOMY[subject];
}
export function allChapterNames(): string[] {
  return ISC_12_SUBJECTS.flatMap((s) => ISC_12_TAXONOMY[s].map((c) => c.name));
}

/** `16(ii)` -> `16-ii.png`: a ref is not a safe filename. */
export const figureFile = (ref: string) => `${ref.replace(/[()]/g, "-").replace(/-+$/, "").replace(/-+/g, "-")}.png`;
