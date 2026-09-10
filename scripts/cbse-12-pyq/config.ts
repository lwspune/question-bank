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
import { CHAPTERS as NCERT_CHAPTERS, EXAM_ID_CBSE_12 as CBSE12 } from "../ncert/config";

import type { SubjectKey } from "./lib";
export type { SubjectKey };

/** Where the official ZIPs are unpacked: <SOURCE_ROOT>/<year>/{qp,ms}/… */
const SOURCE_BASE = "C:\\tmp\\PYQPs\\CBSE\\XII";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs + hash dumps
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

/** The years present in the official archive, and the only ones patternForYear knows. */
export const YEARS = [2022, 2023, 2024, 2025, 2026] as const;

/**
 * The subject row these questions land on. Must already exist — the NCERT
 * textbook ingest created it. Chapters AUTO-CREATE on commit, so a chapter name
 * that differs by even a space silently FORKS the corpus in two (the
 * mh-ssc-10-text lesson).
 *
 * ⚠ commit.ts does NOT validate against this list — its own header says it
 * "does not re-check chapter/subtopic names, and a bad chapter name
 * AUTO-CREATES a duplicate chapter rather than failing". The only guard is
 * validate.ts, and only if it is run. An earlier version of this comment
 * claimed the opposite, promising a guard that does not exist.
 */
export const SUBJECT_NAME_MATHS = "Mathematics";

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
export const CHAPTERS_MATHS = [
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

/**
 * The 14 live cbse-12 PHYSICS chapters, verbatim from the DB 2026-09-10.
 * Created by the NCERT textbook ingest (276 practice rows, 0 pyq). A board
 * paper is assigned per-question onto this SAME axis, so a chapter carries its
 * textbook exercises and its board PYQs together.
 */
export const CHAPTERS_PHYSICS = [
  "Alternating Current",
  "Atoms",
  "Current Electricity",
  "Dual Nature of Radiation and Matter",
  "Electric Charges and Fields",
  "Electromagnetic Induction",
  "Electromagnetic Waves",
  "Electrostatic Potential and Capacitance",
  "Magnetism and Matter",
  "Moving Charges and Magnetism",
  "Nuclei",
  "Ray Optics and Optical Instruments",
  "Semiconductor Electronics: Materials, Devices and Simple Circuits",
  "Wave Optics",
] as const;

/**
 * The 10 live cbse-12 CHEMISTRY chapters, verbatim from the DB 2026-09-10
 * (450 practice rows, 0 pyq).
 *
 * ⚠ The 2022 COVID Term-II paper predates NCERT's rationalisation and examines
 * content these ten chapters no longer cover. MEASURED across all 15 of that
 * year's marking schemes, word-boundary matched: the ONLY dropped chapter the
 * papers actually examine is SURFACE CHEMISTRY — colloid/colloidal 47,
 * adsorption 13, physisorption 6, chemisorption 6, lyophilic 6, lyophobic 6,
 * coagulation 3. Solid State, Polymers, p-Block, Metallurgy, Everyday-Life
 * Chemistry and Environmental Chemistry are all ABSENT.
 *
 * (A first pass with substring matching reported Solid State too, on 15 hits
 * for "void" — every one of them the word "avoid". The identical count showed
 * up in PHYSICS, which has no Solid State chapter at all, which is what gave it
 * away. Word-boundary match anything you intend to act on.)
 *
 * PHYSICS needs no such chapter: every topic its 2022 papers examine has a live
 * chapter. Its one "lattice" hit is "ionised cores in the lattice" inside a
 * semiconductor question — the live Semiconductor Electronics chapter.
 */
export const CHAPTERS_CHEMISTRY = [
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Amines",
  "Biomolecules",
  "Chemical Kinetics",
  "Coordination Compounds",
  "Electrochemistry",
  "Haloalkanes and Haloarenes",
  "Solutions",
  "The d-and f-Block Elements",
  // ── dropped from the syllabus; 2022 Term-II only ──────────────────────────
  //
  // The "[Outdated]" marker is deliberate and load-bearing (user's call,
  // 2026-09-10). The alternative — filing colloid questions onto Solutions or
  // Electrochemistry because they look adjacent — would be quietly wrong, and a
  // student practising them would have no way to know the content was dropped.
  // The marker rides the CHAPTER NAME so it shows in the /browse chapter filter
  // and on each question's chapter chip, i.e. before a student starts rather
  // than after.
  //
  // ⚠ NEVER put "[Outdated]" in a question's STEM. The stem is the faithful
  // transcription of a real board paper and is part of content_hash, so editing
  // it would both falsify the record and change the row's identity.
  //
  // ⚠ EXACT STRING. Chapters AUTO-CREATE on commit, so a name differing by one
  // space silently forks the corpus in two (the mh-ssc-10-text lesson). Slugs
  // to `surface-chemistry-outdated`.
  "Surface Chemistry [Outdated]",
] as const;

/**
 * Everything that differs between the three subjects, in ONE place.
 *
 * Parameterised rather than forked: the NCERT Class-11 precedent is explicit
 * that a fork means applying every future fix twice, and this repo already has
 * a live instance of that drift.
 */
export type SubjectSpec = {
  key: SubjectKey;
  /** The DB `subjects.name` row. Must already exist — the NCERT ingest made it. */
  subjectName: string;
  /** CBSE's internal subject code, as printed in marking-scheme headers. */
  cbseCode: string;
  /** The paper-code prefix CBSE prints on the paper: "65/5/1", "55/1/1", "56/7/3". */
  paperPrefix: string;
  sourceRoot: string;
  chapters: readonly string[];
};

export const SUBJECTS: Record<SubjectKey, SubjectSpec> = {
  maths: {
    key: "maths",
    subjectName: SUBJECT_NAME_MATHS,
    cbseCode: "041",
    paperPrefix: "65",
    sourceRoot: join(SOURCE_BASE, "Mathematics"),
    chapters: CHAPTERS_MATHS,
  },
  physics: {
    key: "physics",
    subjectName: "Physics",
    cbseCode: "042",
    paperPrefix: "55",
    sourceRoot: join(SOURCE_BASE, "Physics"),
    chapters: CHAPTERS_PHYSICS,
  },
  chemistry: {
    key: "chemistry",
    subjectName: "Chemistry",
    cbseCode: "043",
    paperPrefix: "56",
    sourceRoot: join(SOURCE_BASE, "Chemistry"),
    chapters: CHAPTERS_CHEMISTRY,
  },
};

/**
 * Which subject a paperId belongs to, DERIVED from its paper code.
 *
 *   2023-56-1-1 -> chemistry (56)   2025-65-5-1 -> maths (65)
 *
 * Derived rather than defaulted, and shared by validate.ts and commit.ts so the
 * two can never disagree about which subject a paper is. A default here is
 * genuinely dangerous: it would validate a Chemistry paper against the Maths
 * chapter list — reporting one "unknown chapter" per row, which reads as a
 * transcription fault rather than a mis-scoped run — and, worse, at COMMIT it
 * would stamp the wrong subject on real rows. `--subject=` overrides.
 */
export function subjectForPaperId(id: string, override?: string): SubjectSpec {
  if (override) return subjectFromArg(override);
  const prefix = /^\d{4}-(\d{2})-/.exec(id)?.[1];
  const found = Object.values(SUBJECTS).find((s) => s.paperPrefix === prefix);
  if (!found) {
    throw new Error(
      `cannot tell which subject "${id}" belongs to (expected a paper prefix of ` +
        `${Object.values(SUBJECTS)
          .map((s) => s.paperPrefix)
          .join("/")}). Pass --subject=<key>.`
    );
  }
  return found;
}

/** Resolve a --subject=<key> argument, refusing anything unknown rather than defaulting. */
export function subjectFromArg(arg: string | undefined): SubjectSpec {
  const key = (arg ?? "").trim().toLowerCase();
  const spec = (SUBJECTS as Record<string, SubjectSpec>)[key];
  if (!spec) {
    throw new Error(
      `unknown --subject=${JSON.stringify(arg ?? "")}. Expected one of: ${Object.keys(SUBJECTS).join(", ")}`
    );
  }
  return spec;
}

/**
 * questions.pyq_note — provenance stamped on every row.
 *
 * 2022 gets an extra clause because that paper is genuinely not comparable to
 * the others: it is the COVID Term-II examination, a 12-question / 35-mark
 * paper covering half the syllabus, and a reader seeing "CBSE 2022 board
 * examination" beside a 33-question 2024 paper would reasonably assume the two
 * are the same exam. The note is per-PAPER, which is the right grain for a fact
 * true of every row on it.
 */
export function pyqNote(subject: SubjectSpec, year: number, code: string): string {
  const base = `CBSE Class 12 ${subject.subjectName} (${subject.cbseCode}) board examination ${year}, question paper ${code}.`;
  const term2 =
    year === 2022
      ? ` This is the COVID-era Term-II paper (12 questions, 35 marks), covering part of the syllabus only, and it predates NCERT's rationalisation — some questions examine content the current syllabus no longer includes.`
      : "";
  return `${base}${term2} Official CBSE question paper; answer cross-checked against CBSE's published marking scheme for the same paper code.`;
}

/** questions.source_file / upload_jobs.filename — the dedup + rollback key. */
export function sourceFile(year: number, code: string): string {
  return `cbse-12-pyq-${year}-${code.replace(/\//g, "-")}`;
}

/**
 * The subtopics DECLARED for this subject's chapters by the NCERT ingest —
 * which is NOT the same set as the subtopics currently LIVE in the database.
 *
 * ⚠ THE DISTINCTION IS LOAD-BEARING AND WAS BEING COLLAPSED. A subtopic only
 * appears in the DB once some question has been filed on it, so a perfectly
 * legitimate, already-authored subtopic that no NCERT exercise happened to use
 * is INVISIBLE to a live-axis query. validate.ts read that absence as "not on
 * the live axis" and REFUSED the row — treating "nobody has used it yet" as
 * "this name is invalid".
 *
 * Measured on the Physics pilot: NCERT declares `Diffraction` under Wave Optics
 * and `Atomic Masses and Composition of the Nucleus` under Nuclei, and neither
 * has a live row. CBSE sets diffraction EVERY year — the pilot paper alone asks
 * it three times — so every Physics paper would have had those questions pushed
 * into `Interference and Young's Experiment` and reported as a taxonomy gap
 * that is not one. The right name already existed; nothing needed inventing.
 *
 * Returns chapterName -> declared subtopics, for this exam and subject only.
 */
export function declaredSubtopics(subject: SubjectSpec): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const ch of Object.values(NCERT_CHAPTERS)) {
    if (ch.examId !== CBSE12) continue;
    if (ch.subjectName !== subject.subjectName) continue;
    const prior = out.get(ch.chapterName) ?? [];
    out.set(ch.chapterName, [...new Set([...prior, ...ch.subtopics])]);
  }
  return out;
}
