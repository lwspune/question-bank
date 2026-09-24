/**
 * The MH HSC Class-12 BOARD PAPERS — six Maths (added 2026-09-19) and seven
 * Physics (added 2026-09-23) — and what each one is for.
 *
 * ⚠ THE FILENAME IS NOT THE SITTING. Two of the six Maths papers are misnamed,
 * both calling a February sitting "March". Physics is WORSE: four of its seven
 * are wrong, and in two directions — `Phy Mar 2024/2025/2026` are all February
 * sittings, and `Phy June 2024` is the 20 JULY supplementary. Every `year`/
 * `month` below is read off the PRINTED COVER (`YYYY <roman month> DD` in the
 * header box, or a `DATE : DD/MM/YYYY` line on the newer layout) and
 * cross-checked against the subject code. This is the same trap
 * `scripts/mh-ssc-10/README.md` carries a standing warning for.
 *
 * ⚠ AND THE EMBEDDED TITLE IS NOT THE COVER EITHER. `Phy June 2026.pdf` carries
 * the XPS path `\\apl26\MSB JULY 2026\...` while its cover prints
 * `DATE : 19/06/2026`. The XPS folder is the print house's batch label and it
 * lags; the cover wins, which is what `render.ts` already enforces.
 *
 * ⚠ THESE SUPERSEDE the `RAW_PAPERS` note in ../config.ts, which records the
 * 2024 + 2025 papers as "scanned, need render + vision". The copies added on
 * 2026-09-19 are born-digital typeset reproductions with real text layers — the
 * text layer is still LOSSY for math (every symbol is a glyph-image) but it is
 * ground truth for prose, numbering and reading order.
 */
import { join } from "node:path";

export { ORG_ID, CREATED_BY, EXAM_ID, SOURCE_ROOT } from "../config";
import { SOURCE_ROOT } from "../config";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs + text dumps
export const DATA = join(__dirname, "data"); // committed: transcription source of truth

/** Where the Physics prints live. A different tree from the Maths papers, so it
 *  cannot be derived from the shared SOURCE_ROOT. */
export const PHYSICS_SOURCE_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\Physics\\State_Board\\Question_Papers";

/** @deprecated Read `paper.subject` — this lane carries two subjects since
 *  2026-09-23. Kept so pre-Physics Maths scripts resolve unchanged. */
export const SUBJECT_NAME = "Mathematics";

export type PaperSubject = "Mathematics" | "Physics";

export type BankStatus =
  /** No rows for this sitting exist. Straight ingest. */
  | "new"
  /** The compilation already supplied rows for this sitting. Ingest is a
   *  RECONCILIATION against shipped content — gated, see ./README.md. */
  | "reconcile";

export type Paper = {
  id: string; // slug → data/<id>.*.json
  subject: PaperSubject; // picks the paper grammar — see lib.ts `grammarFor`
  pdf: string; // absolute path to the source PDF
  year: number; // from the PRINTED COVER, never the filename
  month: string; // from the PRINTED COVER, never the filename
  paperCode: string; // printed subject code — the independent check on year+month
  sourceFile: string; // questions.source_file — the dedup + rollback key
  note: string; // questions.pyq_note
  bankStatus: BankStatus;
  /** Rows this sitting already has in the bank, measured 2026-09-19. A
   *  reconciliation that does not end at 44 has found something. */
  bankRows?: number;
  /** Refs the compilation never captured, measured by question-number census.
   *  These are straight net-new adds even on a `reconcile` paper. */
  knownMissingRefs?: string[];
  /** Refs whose stem prints a FIGURE (all are Mathematical Logic switching
   *  circuits — the only figure genre in this corpus). A ref listed here and
   *  not cropped is a defect; "Construct the switching circuit …" questions
   *  are NOT listed, because there the student draws it. */
  figureRefs: string[];
  /** Refs the exam-scoped `content_hash` ABSORBED into a row that already
   *  existed, so this sitting has no row of its own for them.
   *
   *  Recorded rather than tolerated. `flip-public.ts` checks the bank's row
   *  count against the printed 44, and a shortfall is normally a real loss —
   *  rows that failed to commit, or a transcription that was never 44. Listing
   *  the absorbed refs here makes the expected count `44 - absorbed`, so the
   *  check still bites on every OTHER cause. A blanket override would not.
   *
   *  Each entry names what absorbed it, because "absorbed" alone does not say
   *  whether the board repeated an earlier sitting or set a textbook exercise. */
  absorbedRefs?: { ref: string; into: string }[];
  /** Set when the PDF is not a board print but a publisher's reproduction, so
   *  `render.ts` has no printed cover to verify against.
   *
   *  The consequence is not just a skipped check. On a board print a
   *  disagreement with the bank SETTLES in the paper's favour, because the
   *  paper is the artifact the students sat. A reproduction is a SECOND
   *  TRANSCRIPTION of that artifact, so a disagreement is a flag for a human
   *  and never a verdict. Reconciliation must not auto-apply against one. */
  thirdParty?: { reason: string };
  /** Subtopics this paper introduces that the live taxonomy does not yet carry.
   *
   *  `verify.ts` refuses an off-catalog subtopic, and that default is right: a
   *  near-miss spelling silently forks a shipped subtopic in two. But a BOARD
   *  PAPER can legitimately examine something the textbook never did, and the
   *  Physics corpus was built from the textbook — its subtopics come from the
   *  exercises, so a section the book TEACHES and never ASKS has no subtopic at
   *  all. jun-2026 Q.7 is the first: Balbharati XII §5.15 covers free, forced
   *  and damped vibrations, the exercises never touch them, and the board set
   *  "Distinguish between free and forced vibrations".
   *
   *  Declaring it here keeps the check hard for everything else, and makes the
   *  addition a decision someone wrote down rather than a spelling that slipped
   *  through. Subtopics auto-create at commit, so nothing else is needed — but
   *  re-run gen-catalog.ts afterwards so the catalog stops calling it new. */
  newSubtopics?: { chapter: string; subtopic: string; why: string }[];
  /** Extra ROWS beyond the printed item count, because some printed items are
   *  carried as two rows (see `parentRef` in lib.ts).
   *
   *  Without this the reconciliation invariant `bankRows + missing = printed`
   *  is simply false, and it is false for a real reason rather than a counting
   *  slip: `phy-feb-2023` holds 48 rows against a 47-item paper because its
   *  Section D numbers three two-part items Q.28(i)/(ii), Q.29(i)/(ii),
   *  Q.30(i)/(ii). Three items, six rows, +3. Stating the number here keeps the
   *  invariant sharp instead of widening it to "roughly equal", which would
   *  stop catching the miscount it exists for. */
  splitRows?: number;
};

const paper = (
  id: string,
  file: string,
  year: number,
  month: string,
  paperCode: string,
  bankStatus: BankStatus,
  figureRefs: string[],
  extra: Partial<Paper> = {},
): Paper => ({
  id,
  subject: "Mathematics",
  pdf: join(SOURCE_ROOT, file),
  year,
  month,
  paperCode,
  sourceFile: `MH_HSC_12_Maths_PYQ__${year}_${month}.pdf`,
  note: `Maharashtra HSC Class 12 Board PYQ — Mathematics & Statistics (Arts & Science), ${month} ${year} (paper code ${paperCode})`,
  bankStatus,
  figureRefs,
  ...extra,
});

/**
 * Same shape for the Physics prints, which live in a different source tree.
 *
 * ⚠ THE NOTE LENGTH IS LOAD-BEARING, not prose. `publicPyqNote` publishes a
 * `pyq_note` to students only when it is under 48 chars after bracket-stripping
 * — the rule that keeps a source blurb ("Oswaal", "Balbharati") off the public
 * provenance line. That cap is safe only because real notes measure <=38 or
 * >=93 with NOTHING between, and `npm run audit:provenance` reports anything
 * landing in the 39-92 gap as a silent loss risk. This template is deliberately
 * long enough to clear 93 on the shortest month ("June"), and
 * tests/mh-hsc-12-paper-manifest.test.ts asserts it stays out of the gap.
 */
const physicsPaper = (
  id: string,
  file: string,
  year: number,
  month: string,
  paperCode: string,
  bankStatus: BankStatus,
  figureRefs: string[],
  extra: Partial<Paper> = {},
): Paper => ({
  id,
  subject: "Physics",
  pdf: join(PHYSICS_SOURCE_ROOT, file),
  year,
  month,
  paperCode,
  sourceFile: `MH_HSC_12_Physics_PYQ__${year}_${month}.pdf`,
  note: `Maharashtra HSC Class 12 Board question paper — Physics (Subject code 54), ${month} ${year} sitting (paper code ${paperCode})`,
  bankStatus,
  figureRefs,
  ...extra,
});

export const PAPERS: Record<string, Paper> = Object.fromEntries(
  [
    // ── New sittings ────────────────────────────────────────────────────────
    // Filename says "March 2026"; cover says 2026 II 21 = 21 February 2026.
    paper("feb-2026", "March 2026 paper.pdf", 2026, "February", "J-165", "new", []),
    // J-276 uses the newer layout with a literal `DATE : 24/06/2026` line.
    paper("jun-2026", "June 2026 paper.pdf", 2026, "June", "J-276", "new", []),
    // The July supplementary sittings were never ingested at all — the
    // compilation only ever covered the main (Feb/March) paper of each year.
    // Q.27 carries the corpus's largest figure (114.5pt, the only 3-branch
    // circuit) and a hand-enumerated grep for figure phrasings MISSED it: the
    // stem says "the following circuit", and the pattern listed "switching
    // circuit"/"given circuit" but never bare "circuit". fig_bounds.py found it.
    paper("jul-2024", "Maths July 2024 paper.pdf", 2024, "July", "J-174", "new", ["Q. 27"], {
      // The board set a Balbharati TEXTBOOK exercise verbatim as an exam
      // question, so the exam-scoped content_hash folded it into the practice
      // row that was already there. This sitting therefore holds 43 of its 44.
      absorbedRefs: [
        { ref: "Q. 12", into: "Definite Integration · practice · Ex 4.2 I (8) (StateBoard_12_Maths__Definite_Integration.pdf)" },
      ],
    }),
    paper("jul-2025", "Maths July 2025 paper.pdf", 2025, "July", "J-384", "new", ["Q. 27"]),

    // ── Reconciliation sittings ─────────────────────────────────────────────
    // The compilation's 2024 rows ARE this paper: its Q.1(vi)/(vii)/(viii) and
    // Q.2(iv) stems match this cover's items verbatim. 42 of 44 captured.
    paper("mar-2024", "Maths March 2024 paper new.pdf", 2024, "March", "J-862", "reconcile", ["Q. 15"], {
      bankRows: 42,
      knownMissingRefs: ["Q. 2. (iii)", "Q. 23"],
    }),
    // Filename says "March 2025"; cover says 2025 II 22 = 22 February 2025.
    // All 44 refs already present — nothing missing, so the whole value here is
    // verification against the printed page plus the month backfill.
    paper("feb-2025", "Maths March 2025 paper new.pdf", 2025, "February", "J-312", "reconcile", ["Q. 15"], {
      bankRows: 44,
      knownMissingRefs: [],
    }),

    // ══ PHYSICS ═══════════════════════════════════════════════════════════
    // Seven papers, all 47-item / 98-printed-mark / Max-70 prints. Six carry a
    // board cover; the seventh (Feb 2023) is a publisher reproduction.
    //
    // FIGURES: zero, on every sitting, verified structurally rather than
    // assumed — every large vector object on these pages is furniture (header
    // boxes, the page border, the seat-number box) and the only rasters are
    // sliced math fragments. Every "draw a neat diagram" on a Physics paper is
    // an instruction to the STUDENT, which is the opposite of the Maths lane
    // where "the following circuit" meant a printed figure.
    //
    // ⚠ THE TEXT LAYER CANNOT BE TRUSTED FOR MCQ OPTIONS ON ANY OF THESE.
    // PrimoPDF rasterised the operators, so `=`, `Δ`, `+` and `−` are PNG
    // slivers with no text behind them. Measured on jun-2026 Q.1(iii): options
    // (c) `Q = ΔU + W` and (d) `Q = ΔU − W` both extract as the string
    // `Q U W` — IDENTICAL. A text-only transcription silently yields a
    // duplicate-option MCQ or keys the wrong letter. Options come from the
    // rendered image; the text layer is ground truth for prose and numbering
    // only. `verify.ts` asserts the four option texts are pairwise distinct,
    // which is the direct guard for this.
    //
    // ⚠ AND THERE IS A SECOND, INDEPENDENT REASON, found on jul-2024 Q.1(vii).
    // Options print in TWO COLUMNS, and the extractor walks them in the wrong
    // order on some rows: the page prints "(c) dyne / (d) Wb/m^2" and the text
    // layer yields "(c) Wb/m^2 / (d) dyne" — the letters SWAPPED. Nothing is
    // lost, nothing collides, every option is non-empty and distinct, so the
    // collision check is blind to it and so is every other gate. A blind key
    // pass reading swapped options confirms the WRONG LETTER with full
    // confidence; see [[blind-rederivation-needs-option-fidelity]]. On that
    // question the key happened to be (b) either way, which is luck, not
    // safety. Read the options off the page — both hazards, one rule.

    // ── New sittings ────────────────────────────────────────────────────────
    // Cover prints `DATE : 19/06/2026`. The embedded XPS path says "MSB JULY
    // 2026" and is the print batch label, not the sitting — the cover wins.
    physicsPaper("phy-jun-2026", "Phy June 2026.pdf", 2026, "June", "J-229", "new", [], {
      // Q.31 is one printed item carried as two rows: its toroid derivation is
      // Magnetic Fields and its Carnot refrigerator is Thermodynamics.
      splitRows: 1,
      absorbedRefs: [
        {
          ref: "Q. 8",
          into: "Structure of Atoms and Nuclei · pyq February 2020 (verbatim board reuse: \"State any two postulates of Bohr's theory of hydrogen atom.\")",
        },
      ],
      // "Free, Forced and Damped Vibrations" was declared here as a new
      // subtopic and COMMITTED on 2026-09-24; the catalog now carries it, so the
      // declaration is dropped. Balbharati XII teaches it in SS5.14-5.15 and its
      // exercises never ask about it, which is why the textbook ingest created no
      // subtopic; two board sittings three years apart both examine it.
    }),
    // Filename says "Mar 2026"; cover says 2026 II 16 = 16 February 2026, and
    // the XPS path agrees ("MSB FEBRUARY 2026").
    physicsPaper("phy-feb-2026", "Phy Mar 2026.pdf", 2026, "February", "J-137", "new", [], {
      absorbedRefs: [
        {
          ref: "Q. 27",
          into: "Mechanical Properties of Fluids | pyq March 2016 (verbatim board reuse: Laplace law for a spherical bubble membrane)",
        },
      ],
    }),
    // Cover says 2025 VI 28 = 28 June 2025. The one "June" filename that is
    // actually June.
    physicsPaper("phy-jun-2025", "Phy June 2025.pdf", 2025, "June", "J-339", "new", [], {
      absorbedRefs: [
        {
          ref: "Q. 17",
          into: "Superposition of Waves | practice | StateBoard_12_Physics__Superposition_Waves.pdf (the board set a Balbharati TEXTBOOK exercise verbatim, so the exam-scoped content_hash folded it into the practice row already there; not a reuse of an earlier sitting)",
        },
      ],
    }),
    // Filename says "June 2024"; cover says 2024 VII 20 = 20 JULY 2024, and the
    // XPS path agrees ("MSB (JULY 2024)"). This is the supplementary sitting —
    // the compilation only ever covered the main paper of each year, so no
    // supplementary Physics sitting has ever been ingested.
    physicsPaper("phy-jul-2024", "Phy June 2024.pdf", 2024, "July", "J-129", "new", []),

    // ── Reconciliation sittings ─────────────────────────────────────────────
    // Filename says "Mar 2025"; cover says 2025 II 17 = 17 February 2025.
    // `2025.pdf` in the same folder is BYTE-IDENTICAL to this file (sha256
    // d3de81512a89…), so the folder's 15 PDFs are 13 distinct papers.
    // The compilation captured 46 of the 47 printed items.
    physicsPaper("phy-feb-2025", "Phy Mar 2025.pdf", 2025, "February", "J-287", "reconcile", [], {
      bankRows: 46,
      // Census taken 2026-09-24 against the printed page: the compilation holds
      // 46 of the 47 items and the single omission is Q.28, "Obtain an
      // expression for average power dissipated in a series LCR circuit."
      // Section D is the only short band (4 of 5); every other ref is present.
      knownMissingRefs: ["Q. 28"],
    }),
    // Filename says "Mar 2024"; cover says 2024 II 27 = 27 February 2024.
    // `2024.pdf` is byte-identical to this file (sha256 ad397ca22afa…).
    // The compilation captured 43 of the 47.
    physicsPaper("phy-feb-2024", "Phy Mar 2024.pdf", 2024, "February", "J-837", "reconcile", [], {
      bankRows: 43,
      // Q.29 is one printed item carried as two rows: the ammeter/voltmeter
      // comparison is Current Electricity and the S.H.M. energy numerical is
      // Oscillations. The compilation split it too, filing the two halves under
      // the same bare number in both chapters.
      splitRows: 1,
      // Census 2026-09-24 by reconcile-diff.ts, re-checked by direct SQL: the
      // compilation holds 43 of the 48 rows and these five were never captured.
      // Note Q.29(i)/(ii) are NOT listed: the diff reports them as absent only
      // because the bank files that split item under the bare number `Q. 29`
      // twice. The question is present; the ref spelling differs.
      knownMissingRefs: ["Q. 2(i)", "Q. 4", "Q. 6", "Q. 17", "Q. 25"],
      absorbedRefs: [
        {
          ref: "Q. 6",
          into: "Oscillations | pyq March 2017 Q. 2(iii) | MH_HSC_12_Physics_PYQ__Oscillations.docx (verbatim board reuse of the linear-S.H.M. differential-equation bookwork)",
        },
      ],
      // PRINTED TYPO, deliberately NOT preserved. Q.1(vii)'s options (b) and (c)
      // print a capital letter O where a zero is meant — confirmed at 600 dpi
      // against the narrower `0` glyph in the page-code box, and the option text
      // is rasterised so the text layer cannot settle it either way. Both this
      // transcription and the compilation's shipped row normalise it to `0`, and
      // the key (d) W = Q is unaffected under either reading. Recorded here so a
      // later session does not "find" the O and conclude the transcription drifted.
    }),
    // NOT a board print. No seat number, no subject code, no cover date box —
    // it is typeset under a "Board Question Paper: February 2023" heading, the
    // house style of a commercial reproduction. Included on the user's call
    // (2026-09-23), flagged so the weaker provenance travels with the data.
    //
    // The bank holds 48 rows for this sitting against a 47-item paper. That is
    // the one count in the corpus with no explanation yet: 2022's excess is the
    // compilation duplicating a bare Section-D number across two chapters, and
    // this file numbers its split parts properly (`Q. 29(i)` / `Q. 29(ii)` —
    // the convention this lane adopted). Reconciling it is how we find out.
    physicsPaper("phy-feb-2023", "2023.pdf", 2023, "February", "n/a", "reconcile", [], {
      bankRows: 48,
      // THE 48-vs-47 ANOMALY IS RESOLVED (census 2026-09-24, against this file):
      //   47 printed items
      //   − 2 the compilation never captured   (Q.1(ii) and Q.5)
      //   + 3 extra rows, because Section D's three two-part items are each
      //       split in two — this source numbers them Q.28(i)/(ii), Q.29(i)/(ii),
      //       Q.30(i)/(ii) rather than repeating a bare number the way the
      //       compilation's 2022 and 2024 rows do
      //   = 48.
      // So the excess was never a duplicate; it is a NUMBERING convention, and
      // it is the one this lane adopted. The transcription follows the printed
      // sub-numbers, giving 50 rows for 47 items.
      knownMissingRefs: ["Q. 1(ii)", "Q. 5"],
      absorbedRefs: [
        {
          ref: "Q. 5",
          into: "Rotational Dynamics | pyq March 2018 Q. 3(ii) | MH_HSC_12_Physics_PYQ__Rotational_Dynamics.docx (verbatim board reuse of the conservation-of-angular-momentum bookwork)",
        },
      ],
      splitRows: 3,
      // "Free, Forced and Damped Vibrations" was declared here as a new
      // subtopic and COMMITTED on 2026-09-24; the catalog now carries it, so the
      // declaration is dropped. Balbharati XII teaches it in SS5.14-5.15 and its
      // exercises never ask about it, which is why the textbook ingest created no
      // subtopic; two board sittings three years apart both examine it.
      thirdParty: {
        reason:
          "a collegedunia.com reproduction (its logo is footed on every page), not a board print — no seat number, subject code or cover date box, so render.ts has no printed cover to verify and a disagreement with the bank is a flag, never a verdict. It also re-typesets the paper: options are labelled (A)-(D) where every board print uses (a)-(d), and Section D's two-part items are numbered Q.29(i)/(ii) rather than repeating the bare number",
      },
    }),
  ].map((p) => [p.id, p]),
);

/** The papers for one subject, in manifest order. */
export const papersFor = (subject: PaperSubject): Paper[] =>
  Object.values(PAPERS).filter((p) => p.subject === subject);

export function requirePaper(id: string): Paper {
  const p = PAPERS[id];
  if (!p) throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  return p;
}

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);
export const pagesDir = (id: string) => join(OUT, id);
