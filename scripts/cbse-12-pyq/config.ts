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
//
// CLASS 10 (2026-10-14) runs through this same pipeline, on the cbse-10 exam:
// every class-specific value (exam, source folder, source_file prefix, code
// anchors) lives on its SubjectSpec, so a script reads the exam off the
// paper's subject (subjectForPaperId) or off a required --class
// (classFromArgs), never off an ambient constant. The exam ids are exported
// for tests only; the three historical Class-12 fix scripts import theirs
// from ../ncert/config by name.
export { EXAM_ID_CBSE_12, EXAM_ID_CBSE_10 } from "../ncert/config";
import { CHAPTERS as NCERT_CHAPTERS, EXAM_ID_CBSE_12 as CBSE12, EXAM_ID_CBSE_10 as CBSE10 } from "../ncert/config";

import { PAPER_PATTERNS, patternForYear, totalMarks, type SubjectKey } from "./lib";
export type { SubjectKey };

/** Where the official ZIPs are unpacked: <SOURCE_ROOT>/<year>/{qp,ms}/… */
const SOURCE_BASE = "C:\\tmp\\PYQPs\\CBSE\\XII";
const SOURCE_BASE_10 = "C:\\tmp\\PYQPs\\CBSE\\X";

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
 * The 13 live cbse-12 BIOLOGY chapters, verbatim from the DB 2026-10-07
 * (240 practice rows from the NCERT ingest, 0 pyq).
 *
 * Measured 2026-10-07 across all 73 English marking schemes, word-boundary
 * matched: the three chapters NCERT dropped (Reproduction in Organisms,
 * Strategies for Enhancement in Food Production, Environmental Issues) barely
 * register. The hits are "deforestation" and "inbreeding", which the live
 * Biodiversity and Sexual Reproduction chapters still teach, plus three
 * "biomagnification" in 2025. So no "[Outdated]" chapter is declared up front;
 * a question that truly has no home is decided when it is met, the Chemistry
 * rule, never filed onto an adjacent chapter.
 */
export const CHAPTERS_BIOLOGY = [
  "Sexual Reproduction in Flowering Plants",
  "Human Reproduction",
  "Reproductive Health",
  "Principles of Inheritance and Variation",
  "Molecular Basis of Inheritance",
  "Evolution",
  "Human Health and Disease",
  "Microbes in Human Welfare",
  "Biotechnology: Principles and Processes",
  "Biotechnology and its Applications",
  "Organisms and Populations",
  "Ecosystem",
  "Biodiversity and Conservation",
  // Dropped by the rationalised NCERT (adaptations, responses to abiotic
  // factors); five 2022 rows examine it. Tissue culture is NOT here: the
  // current book teaches it in Biotechnology and its Applications.
  "Organism and its Environment [Outdated]",
] as const;

/**
 * The 14 live cbse-10 MATHEMATICS chapters, verbatim from the DB 2026-10-14
 * (587 NCERT textbook rows, 0 pyq), in their order_index order.
 *
 * The 2022 Term-II papers examine CONSTRUCTIONS, which the rationalised NCERT
 * book dropped: "construct" appears 12 times across that year's 12 English
 * schemes, word-boundary matched. Filed on an "[Outdated]" chapter, the Class
 * 12 Chemistry rule (never onto an adjacent live chapter). Later years' hits
 * on "construct" were not checked one by one; decide each when met.
 */
export const CHAPTERS_MATHS_10 = [
  "Real Numbers",
  "Triangles",
  "Statistics",
  "Surface Areas and Volumes",
  "Probability",
  "Polynomials",
  "Pair of Linear Equations in Two Variables",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Coordinate Geometry",
  "Introduction to Trigonometry",
  "Some Applications of Trigonometry",
  "Circles",
  "Areas Related to Circles",
  "Constructions [Outdated]",
] as const;

/**
 * The 13 live cbse-10 SCIENCE chapters, verbatim from the DB 2026-10-14 (421
 * NCERT rows, 0 pyq). ⚠ "Light — Reflection and Refraction" carries a real em
 * dash; a hyphen would fork the chapter on commit.
 *
 * Measured 2026-10-14 across the English schemes, word-boundary matched: the
 * 2022 Term-II papers examine PERIODIC CLASSIFICATION (periodic 7, Döbereiner
 * 4, Newlands 3, Mendeleev 2), a chapter the current book dropped. 2023 shows
 * "biogas" 3 and "sustainable" 6 (Sources of Energy / Sustainable Management,
 * also dropped); not declared up front, decided per question when met.
 */
export const CHAPTERS_SCIENCE_10 = [
  "Chemical Reactions and Equations",
  "Electricity",
  "Heredity",
  "Our Environment",
  "The Human Eye and the Colourful World",
  "Magnetic Effects of Electric Current",
  "Acids, Bases and Salts",
  "Metals and Non-metals",
  "Carbon and its Compounds",
  "Life Processes",
  "Control and Coordination",
  "How do Organisms Reproduce?",
  "Light — Reflection and Refraction",
  "Periodic Classification of Elements [Outdated]",
] as const;

/**
 * A source file no filename rule can classify, dropped BY NAME with its reason.
 * `year` scopes it, because CBSE reuses names across years.
 */
export type ExcludedSource = { year: number; kind: "qp" | "ms"; file: string; reason: string };

/**
 * Everything that differs between the subjects, in ONE place.
 *
 * Parameterised rather than forked: the NCERT Class-11 precedent is explicit
 * that a fork means applying every future fix twice, and this repo already has
 * a live instance of that drift.
 */
/**
 * A file belonging to ANOTHER paper that ships in the same archive, recognised
 * by its own paper prefix: Maths Basic (430) inside the 2026 Standard ZIP, the
 * Punjabi (40/41) and Urdu (46/47) versions beside the English papers. Counted
 * as excluded with this reason, never as unaccounted and never parsed.
 */
export type ExcludedPrefix = { prefix: string; reason: string };

export type SubjectSpec = {
  key: SubjectKey;
  /** 10 or 12: names the source_file prefix and the pyq_note. */
  classLabel: 10 | 12;
  /** The exam row every write for this subject is scoped to. */
  examId: string;
  /** The DB `subjects.name` row. Must already exist — the NCERT ingest made it. */
  subjectName: string;
  /** What CBSE calls the paper, when it is not the subject name ("Mathematics Standard"). */
  paperLabel?: string;
  /** CBSE's internal subject code, as printed in marking-scheme headers. */
  cbseCode: string;
  /** The paper-code prefix CBSE prints on the paper: "65/5/1", "55/1/1", "56/7/3". */
  paperPrefix: string;
  /**
   * Anchors tried in order when reading a code off a FILENAME. Class 12 falls
   * back to the subject code (Physics 2026 names its schemes "XII-2-042-1-1");
   * Class 10 must NOT: "X_086_31_2_MS…" read on "086" is paper 31/3/1.
   */
  codeAnchors: string[];
  sourceRoot: string;
  chapters: readonly string[];
  /** Files dropped by name; see ExcludedSource. */
  excludedSources?: readonly ExcludedSource[];
  /** Other papers in the same archive; see ExcludedPrefix. */
  excludedPrefixes?: readonly ExcludedPrefix[];
  /**
   * Pair marking schemes to papers by the codes printed on their PAGES, not
   * their names. Class 10 Science ships one scheme per series under names
   * like "science (English) set no. 1.pdf"; see blockStartCodes in ./lib.
   */
  msSplitByContent?: boolean;
  /** Schemes whose own page numbering is broken, split by hand; see MsBlockOverride. */
  msBlockOverrides?: readonly MsBlockOverride[];
};

/**
 * The page blocks of ONE marking-scheme file, declared because the file's own
 * running header cannot be trusted to find them. Matched by exact basename
 * within the year, like ExcludedSource, so it can never reach another file.
 * `from`/`to` are 0-based and inclusive, as splitMergedMs returns them.
 */
export type MsBlockOverride = {
  year: number;
  file: string;
  blocks: readonly { code: string; from: number; to: number }[];
  reason: string;
};

const BIO_2024_SCAN =
  "a SCANNED copy of a paper the archive also ships born-digital (same questions, read 2026-10-07); " +
  "not byte-identical, so the hash dedup cannot collapse the pair";

const VI_SCHEME = "the visually-impaired paper's scheme; its name carries no code a VI rule can read";

export const SUBJECTS: Record<SubjectKey, SubjectSpec> = {
  maths: {
    key: "maths",
    classLabel: 12,
    examId: CBSE12,
    subjectName: SUBJECT_NAME_MATHS,
    cbseCode: "041",
    paperPrefix: "65",
    codeAnchors: ["65", "041"],
    sourceRoot: join(SOURCE_BASE, "Mathematics"),
    chapters: CHAPTERS_MATHS,
  },
  physics: {
    key: "physics",
    classLabel: 12,
    examId: CBSE12,
    subjectName: "Physics",
    cbseCode: "042",
    paperPrefix: "55",
    codeAnchors: ["55", "042"],
    sourceRoot: join(SOURCE_BASE, "Physics"),
    chapters: CHAPTERS_PHYSICS,
  },
  chemistry: {
    key: "chemistry",
    classLabel: 12,
    examId: CBSE12,
    subjectName: "Chemistry",
    cbseCode: "043",
    paperPrefix: "56",
    codeAnchors: ["56", "043"],
    sourceRoot: join(SOURCE_BASE, "Chemistry"),
    chapters: CHAPTERS_CHEMISTRY,
  },
  maths10: {
    key: "maths10",
    classLabel: 10,
    examId: CBSE10,
    subjectName: "Mathematics",
    paperLabel: "Mathematics Standard",
    cbseCode: "041",
    paperPrefix: "30",
    codeAnchors: ["30"],
    sourceRoot: join(SOURCE_BASE_10, "Mathematics_Standard"),
    chapters: CHAPTERS_MATHS_10,
    excludedPrefixes: [
      { prefix: "430", reason: "a Mathematics Basic (241) paper, a separate subject; the 2026 Standard ZIP ships both" },
      { prefix: "40", reason: "the Punjabi version of an English paper" },
      { prefix: "46", reason: "the Urdu version of an English paper" },
    ],
  },
  science10: {
    key: "science10",
    classLabel: 10,
    examId: CBSE10,
    subjectName: "Science",
    cbseCode: "086",
    paperPrefix: "31",
    codeAnchors: ["31"],
    sourceRoot: join(SOURCE_BASE_10, "Science"),
    chapters: CHAPTERS_SCIENCE_10,
    msSplitByContent: true,
    excludedPrefixes: [
      { prefix: "41", reason: "the Punjabi version of an English paper" },
      { prefix: "47", reason: "the Urdu version of an English paper" },
    ],
    msBlockOverrides: [
      {
        year: 2026,
        file: "Revised MS X_086_31.4 ALL ENGLISH.pdf",
        // Read 2026-10-14: every page prints its own code, and they change at
        // pages 12 and 24.
        blocks: [
          { code: "31/4/1", from: 0, to: 11 },
          { code: "31/4/2", from: 12, to: 23 },
          { code: "31/4/3", from: 24, to: 35 },
        ],
        reason: 'every page of the 31/4/3 block is headed "PAGE 1", so the page-number signal fires twelve times',
      },
    ],
    excludedSources: [
      { year: 2022, kind: "ms", file: "X_086_31_3_B_5_MS (For VI) unsigned.pdf", reason: VI_SCHEME },
      { year: 2024, kind: "ms", file: "science (Blind Engl.).pdf", reason: VI_SCHEME },
      { year: 2026, kind: "ms", file: "X_086_31.B (Blind) in ENGLISH.pdf", reason: VI_SCHEME },
    ],
  },
  biology: {
    key: "biology",
    classLabel: 12,
    examId: CBSE12,
    subjectName: "Biology",
    cbseCode: "044",
    paperPrefix: "57",
    codeAnchors: ["57", "044"],
    sourceRoot: join(SOURCE_BASE, "Biology"),
    chapters: CHAPTERS_BIOLOGY,
    excludedSources: [
      { year: 2024, kind: "qp", file: "57_5_1_BIOLOGY.pdf", reason: BIO_2024_SCAN },
      { year: 2024, kind: "qp", file: "57_5_2_BIOLOGY.pdf", reason: BIO_2024_SCAN },
      { year: 2024, kind: "qp", file: "57_5_3_BIOLOGY.pdf", reason: BIO_2024_SCAN },
      {
        year: 2026,
        kind: "ms",
        file: "044 57_3_3 Óñ¦Óñ+Óñ¿ÓÑìÓñªÓÑÇ -1.PDF",
        reason: "the HINDI scheme for 57/3/3; its Devanagari name arrives garbled, so no Hindi rule can read it",
      },
    ],
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
  const prefix = /^\d{4}-(\d{2,3})-/.exec(id)?.[1];
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
  const base = `CBSE Class ${subject.classLabel} ${subject.paperLabel ?? subject.subjectName} (${subject.cbseCode}) board examination ${year}, question paper ${code}.`;
  // The size is read off the subject's MEASURED pattern, not written here: it
  // used to be a literal "(12 questions, 35 marks)", true of Physics and
  // Chemistry and false of Biology's 13-question paper (and Maths' 14 / 40).
  let term2 = "";
  if (year === 2022) {
    const pattern = patternForYear(subject.key, year);
    const bands = PAPER_PATTERNS[pattern];
    const questions = bands[bands.length - 1].to;
    term2 = ` This is the COVID-era Term-II paper (${questions} questions, ${totalMarks(pattern)} marks), covering part of the syllabus only, and it predates NCERT's rationalisation — some questions examine content the current syllabus no longer includes.`;
  }
  return `${base}${term2} Official CBSE question paper; answer cross-checked against CBSE's published marking scheme for the same paper code.`;
}

/** A whole class's corpus, for scripts that scan every paper rather than one. */
export type ClassScope = { classLabel: 10 | 12; examId: string; sourcePrefix: string };

/**
 * Read the REQUIRED --class=10|12 of a corpus-wide script. No default: a
 * Class-12 default would quietly scan Class 12 for a Class 10 audit and report
 * a clean bill of health on the wrong corpus.
 */
export function classFromArgs(argv: string[]): ClassScope {
  const raw = argv.find((a) => a.startsWith("--class="))?.split("=")[1];
  if (raw !== "10" && raw !== "12") {
    throw new Error(`pass --class=10 or --class=12 (got ${JSON.stringify(raw ?? null)}); there is no default`);
  }
  const classLabel = Number(raw) as 10 | 12;
  return { classLabel, examId: classLabel === 10 ? CBSE10 : CBSE12, sourcePrefix: `cbse-${classLabel}-pyq-` };
}

/** The class scope a single paper id belongs to ("2025-30-1-1" -> Class 10). */
export function classOfPaperId(id: string): ClassScope {
  const s = subjectForPaperId(id);
  return { classLabel: s.classLabel, examId: s.examId, sourcePrefix: `cbse-${s.classLabel}-pyq-` };
}

/**
 * questions.source_file / upload_jobs.filename — the dedup + rollback key.
 * Class-prefixed, so a Class 10 paper can never share a key with a Class 12 one.
 */
export function sourceFile(subject: SubjectSpec, year: number, code: string): string {
  return `cbse-${subject.classLabel}-pyq-${year}-${code.replace(/\//g, "-")}`;
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
    if (ch.examId !== subject.examId) continue;
    if (ch.subjectName !== subject.subjectName) continue;
    const prior = out.get(ch.chapterName) ?? [];
    out.set(ch.chapterName, [...new Set([...prior, ...ch.subtopics])]);
  }
  return out;
}
