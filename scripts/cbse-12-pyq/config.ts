// Config for the CBSE Class-12 MATHEMATICS **BOARD PYQ** ingestion.
//
// DISTINCT FROM scripts/ncert/, and the distinction is the whole point:
//   scripts/ncert/       → the NCERT TEXTBOOK for this exam, question_kind='practice'
//                          (13 chapters / 1,414 rows, complete as of 2026-08-17).
//   scripts/cbse-12-pyq/ → CBSE's past board QUESTION PAPERS, question_kind='pyq'.
// Both write into the SAME exam and the SAME 13 chapters, so a chapter carries
// its textbook exercises and its board PYQs together and the /browse
// PYQ/Practice toggle separates them — the mh-hsc-12-pyq / mh-ssc-10-text shape.
// `practiceOnly` comes OFF the cbse-12 registry entry when the first rows land.
//
// ── SOURCE ────────────────────────────────────────────────────────────────────
// OFFICIAL, and both halves come from CBSE itself:
//   papers          https://www.cbse.gov.in/cbsenew/question-paper/<year>/XII/…zip
//   marking schemes https://www.cbse.gov.in/cbsenew/Marking-Scheme/<year>/XII/…zip
// The archive covers exactly 2022-2026 for Class XII Maths. Filenames are NOT
// consistent across years (separators change, 2022 misspells "Mathematcs", 2026
// prefixes an internal job number) — see parsePaperCode in ./lib.ts.
//
// ⚠ THIS IS THE FIRST BOARD-PYQ CORPUS IN THE BANK THAT SHIPS AN OFFICIAL KEY.
// mh-ssc-10, mh-sb-9 and mh-hsc-12 have none — every answer there is derived and
// the mandatory end-of-source cross-check gate cannot run. Here a marking scheme
// pairs 1:1 with every set and carries the official answer plus step-wise
// working, so the gate CAN run. That is the single biggest quality difference
// between this ingest and its three predecessors, and it should be used: no
// answer ships without being diffed against CBSE's own.
//
// ── MEASURED PROPERTIES (Phase 0/1, 2026-08-18) ───────────────────────────────
// 1. VISION ONLY, all five years — and for 2026 that is a MEASUREMENT, not an
//    assumption. 2022-2025 papers have a zero-character text layer (pure scans).
//    2026 is born-digital and looks clean at ~18k chars of English, yet `√`, `∫`
//    and `π` each occur ZERO times, and Q3 of 65/1/1 — a question ABOUT
//    transposes — extracts as "(A + B) = A + B" with every prime gone. The same
//    arithmetically-lossy-text-layer trap as mh-sb-11 and cbse-11. Scan quality
//    is otherwise excellent (crisp typeset, not photocopy).
// 2. BILINGUAL, Hindi and English on ALTERNATING pages (page 4 is the Hindi of
//    page 5). English only — a translation must never be ingested, since
//    content_hash is stem-derived and translated rows can never dedup against
//    the real English paper (the mh-ssc-10 rule).
// 3. 78 regular papers: 5-6 series x 3 sets per year. Excluded: five 65(B)
//    visually-impaired papers (a separately adapted question set — an exclusion,
//    not an oversight). The 2024 ZIP also ships three papers TWICE under two
//    filenames each, byte-identical; dedup by file hash, not by name.
// 4. Sets are NOT interchangeable. Measured on marking-scheme question images:
//    cross-SERIES overlap is ~0 (3 shared blocks across all 15 pairs of 2025),
//    so the six series are genuinely different papers; WITHIN a series the three
//    sets are partial reshuffles overlapping anywhere from 8% to 55%. No single
//    assumption covers that spread, which is why it was measured per series.
//
// ── DEDUP: TWO STAGES, AND THE FIRST ONE IS PROOF-GRADE ───────────────────────
// CBSE's marking schemes embed each question as a discrete image, and a reused
// question is BYTE-IDENTICAL across sets. So stage 1 is a SHA-256 match on the
// publisher's own file — evidence of reuse, not a similarity heuristic. Verified
// three ways before being trusted: visually (a block is one whole question
// INCLUDING its four options), by yield (exact hashing finds 770 of the 890
// duplicates), and for correctness — across the 27 questions appearing in more
// than one 65/5 set the official answers AGREE 14 / DISAGREE 0.
//   stage 1  exact SHA-256 on marking-scheme blocks → auto-drop.  770 dupes.
//   stage 2  perceptual + text similarity → REVIEWED LEDGER, never auto-drop.
//            120 dupes, and they are not optional: series 65/1 and 65/4
//            RE-ENCODE their images, so exact hashing under-detects there
//            (perceptual finds 15 extra in 65/1, 11 in 65/4, vs 1-2 elsewhere).
// Stage 2 follows scripts/mh-hsc-12-pyq/dedupe.ts, whose header records why a
// bare threshold is not enough: its 0.90 cut missed real pairs at 0.76-0.89
// while a genuinely-different pair sat at 0.83. Adjudicate by reading both.
//
// ⚠ THE IMAGE INDEX IS A DEDUP TOOL, NOT A QUESTION INVENTORY. It covers ~87% of
// items (2,861 blocks against ~3,300 expected: 38 questions + 9 internal-choice
// alternatives per full80 paper). Question numbering and the authoritative item
// list come from the PAPERS. An item the index misses is not lost — it is simply
// transcribed and then caught by stage 2, which is the safe direction.
//
// ── COVERAGE ──────────────────────────────────────────────────────────────────
// 2,861 raw blocks → 1,971 unique by both stages (31% redundancy removed).
// Zero cross-YEAR reuse: CBSE never repeats a question between years, so that
// axis needs no dedup. Projected final corpus ~2,100-2,300 questions once the
// ~13% of items the image index does not cover are transcribed and text-deduped.
// Unlike mh-hsc-12 (a chapterwise compilation, deliberately incomplete), these
// are COMPLETE papers, so this corpus CAN back /mock sittings.
import { join } from "node:path";

export { ORG_ID, CREATED_BY } from "../practice/config";
// CBSE Class 12 — the SAME exam row as the NCERT textbook corpus.
//
// ⚠ Imported under its EXPLICIT class-bearing name, never re-exported as a bare
// `EXAM_ID`. scripts/ncert/config.ts deliberately DELETED its module-level
// `EXAM_ID` when Class 11 arrived, because one unqualified constant imported by
// ~10 scripts is a cross-exam-write hazard: a single missed call site silently
// scopes a Class-11 write to Class 12 and no gate sees it. Reintroducing the
// ambiguous name here would undo that.
export { EXAM_ID_CBSE_12 } from "../ncert/config";

/** Where the official ZIPs are unpacked: <SOURCE_ROOT>/<year>/{qp,ms}/… */
export const SOURCE_ROOT = "C:\\tmp\\PYQPs\\CBSE\\XII\\Mathematics";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs + hash dumps
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

/** The years present in the official archive, and the only ones patternForYear knows. */
export const YEARS = [2022, 2023, 2024, 2025, 2026] as const;

/**
 * The subject row these questions land on. Must already exist — the NCERT
 * textbook ingest created it. Chapters AUTO-CREATE on commit, so a chapter name
 * that differs by even a space silently FORKS the corpus in two (the
 * mh-ssc-10-text lesson); commit.ts validates against this list and refuses an
 * unknown name rather than creating one.
 */
export const SUBJECT_NAME = "Mathematics";

/**
 * The 13 live cbse-12 chapters, verbatim from the DB as of 2026-08-18.
 * A board paper spans the whole syllabus, so PYQs are assigned per-question onto
 * this existing axis — the same axis the textbook rows use, so PYQ and practice
 * rows share one taxonomy per chapter.
 *
 * ⚠ Three NCERT rationalisation gaps recorded during the textbook ingest matter
 * when classifying: Ch.11 no longer teaches THE PLANE, Ch.13 no longer teaches
 * random variables or the binomial distribution, and Ch.6 has dropped tangents &
 * normals and approximations. Board papers 2023-2026 follow the rationalised
 * syllabus, but the 2022 Term-2 paper predates it — expect items there with no
 * clean NCERT home, and file them rather than inventing a chapter.
 */
export const CHAPTERS = [
  "Relations and Functions",
  "Inverse Trigonometric Functions",
  "Matrices",
  "Determinants",
  "Continuity and Differentiability",
  "Application of Derivatives",
  "Integrals",
  "Application of Integrals",
  "Differential Equations",
  "Vector Algebra",
  "Three Dimensional Geometry",
  "Linear Programming",
  "Probability",
] as const;

/** questions.pyq_note — provenance stamped on every row. */
export function pyqNote(year: number, code: string): string {
  return `CBSE Class 12 Mathematics (041) board examination ${year}, question paper ${code}. Official CBSE question paper; answer cross-checked against CBSE's published marking scheme for the same paper code.`;
}

/** questions.source_file / upload_jobs.filename — the dedup + rollback key. */
export function sourceFile(year: number, code: string): string {
  return `cbse-12-pyq-${year}-${code.replace(/\//g, "-")}`;
}
