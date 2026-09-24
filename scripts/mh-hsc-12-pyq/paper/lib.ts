/**
 * Pure core for the MH HSC Class-12 BOARD-PAPER lane.
 *
 * The sibling `scripts/mh-hsc-12-pyq/extract.ts` reads an LWS chapterwise
 * COMPILATION (.docx, via pandoc). This lane reads the actual printed board
 * question papers (PDF), which is a different source with different failure
 * modes — see ./README.md.
 *
 * TWO SUBJECTS, ONE LANE (Physics added 2026-09-23). Maths and Physics print
 * genuinely different papers — 44 items vs 47, 2-mark MCQs vs 1-mark, Q.2
 * running to (iv) vs (viii), and a different canonical ref spelling on the rows
 * already in the bank. So the paper GRAMMAR is data (`GrammarSpec`) and the
 * parser is shared, rather than one lane forking into two. This follows the
 * NCERT Class-11 decision: parameterise, don't fork.
 *
 * The bare `EXPECTED_REFS` / `normaliseRef` / `sectionOf` / `reconcileRefs` /
 * `validateChapter` exports stay bound to MATHS, so every Maths script that
 * imported them before this change behaves identically.
 *
 * Everything here is pure and TDD'd in tests/mh-hsc-12-paper-refs.test.ts
 * (Maths) and tests/mh-hsc-12-paper-physics-refs.test.ts (Physics).
 */

/** The 15 chapters the bank already carries for `mh-hsc-12` Mathematics.
 *  HARD-validated per question: this corpus is mature, so a chapter that is not
 *  on this list is a transcription error, never a new chapter. */
export const HSC_MATHS_CHAPTERS = [
  "Application of Definite Integration",
  "Application of Derivatives",
  "Binomial Distribution",
  "Definite Integration",
  "Differential Equations",
  "Differentiation",
  "Indefinite Integration",
  "Line and Planes",
  "Linear Programming",
  "Mathematical Logic",
  "Matrices",
  "Pair of Straight Lines",
  "Probability Distributions",
  "Trigonometric Functions",
  "Vectors",
] as const;

/** The 16 chapters the bank already carries for `mh-hsc-12` Physics — read off
 *  the live taxonomy on 2026-09-23, not typed from the syllabus. Every one of
 *  them already holds both textbook (`practice`) and board (`pyq`) rows, so an
 *  unknown name here is a transcription slip, never a gap. */
export const HSC_PHYSICS_CHAPTERS = [
  "AC Circuits",
  "Current Electricity",
  "Dual Nature of Radiation and Matter",
  "Electromagnetic Induction",
  "Electrostatics",
  "Kinetic Theory of Gases and Radiation",
  "Magnetic Fields due to Electric Current",
  "Magnetic Materials",
  "Mechanical Properties of Fluids",
  "Oscillations",
  "Rotational Dynamics",
  "Semiconductor Devices",
  "Structure of Atoms and Nuclei",
  "Superposition of Waves",
  "Thermodynamics",
  "Wave Optics",
] as const;

/** The 16 chapters the bank already carries for `mh-hsc-12` Chemistry — read
 *  off the live taxonomy on 2026-09-24, not typed from the syllabus. Unlike
 *  Physics, TWO of them hold textbook (`practice`) rows but no board (`pyq`)
 *  row at all — "Green Chemistry and Nanochemistry" and "Transition and Inner
 *  Transition Elements" — so a first PYQ landing in either is expected here,
 *  not a filing mistake. */
export const HSC_CHEMISTRY_CHAPTERS = [
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Amines",
  "Biomolecules",
  "Chemical Kinetics",
  "Chemical Thermodynamics",
  "Coordination Compounds",
  "Electrochemistry",
  "Elements of Groups 16, 17 and 18",
  "Green Chemistry and Nanochemistry",
  "Halogen Derivatives",
  "Introduction to Polymer Chemistry",
  "Ionic Equilibria",
  "Solid State",
  "Solutions",
  "Transition and Inner Transition Elements",
] as const;

export type HscMathsChapter = (typeof HSC_MATHS_CHAPTERS)[number];
export type HscPhysicsChapter = (typeof HSC_PHYSICS_CHAPTERS)[number];
export type HscChemistryChapter = (typeof HSC_CHEMISTRY_CHAPTERS)[number];

export type Section = "A" | "B" | "C" | "D";
export type Placement = { section: Section; marks: number; format: "mcq" | "subjective" };
export type Reconciliation = { missing: string[]; unexpected: string[]; duplicates: string[] };

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

/** A ref is one of three shapes: a sub-item of the Q.1/Q.2 blocks, a whole
 *  numbered question, or ONE PART of a whole numbered question that we split
 *  because its two halves belong to different chapters (see `parentRef`). */
type Parsed =
  | { kind: "sub"; parent: 1 | 2; idx: number }
  | { kind: "whole"; n: number; part?: number };

type Band = { to: number; section: Section; marks: number };

type GrammarSpec = {
  /** Subject name as the bank spells it — this is the routing key. */
  subject: string;
  /** Short name used in error text, matching what the lane said before. */
  label: string;
  chapters: readonly string[];
  /** How many roman sub-items each block header carries. */
  blocks: { 1: number; 2: number };
  /** Placement of a sub-item under each block header. */
  blockPlacement: { 1: Placement; 2: Placement };
  /** Inclusive range of whole-numbered questions. */
  whole: { from: number; to: number };
  /** Section/marks bands over the whole-numbered range, in ascending order. */
  bands: Band[];
  /** Render a block sub-item. The three subjects' shipped rows all disagree:
   *  Maths carries `Q. 1. (i)`, Physics `Q. 1(i)`, Chemistry `Q.1.i`. */
  renderSub: (parent: number, roman: string) => string;
  /** Accept `Q.19.b` as split part 2 of Q.19, alongside the roman `Q.19.ii`.
   *
   *  OFF by default, and deliberately per-subject rather than global. Only the
   *  Chemistry compilation splits a mixed-bag question with letters — 12 of the
   *  2025 sitting's 52 rows are `Q.4.a` / `Q.21.b` / `Q.22.b.i` shapes — and
   *  Maths and Physics have none anywhere. Turning it on globally would make
   *  `Q. 21(a)` parse on a paper where it has never meant a split, which is the
   *  kind of silent widening that stops a parser catching a real typo.
   *
   *  A letter and its roman twin denote the SAME part (`a` and `i` are both
   *  part 1), so both fold onto one canonical ref. Romans are matched FIRST, so
   *  `i`, `v` and `x` are always read as romans and never as the 9th, 22nd and
   *  24th letters. */
  letterParts?: boolean;
};

const SUB_RE = /^Q\.?\s*(\d{1,2})\.?\s*[([]?\s*([ivxIVX]+)\s*[)\]]?\.?$/;
const WHOLE_RE = /^Q\.?\s*(\d{1,2})\.?$/;
/** `Q.19.b`, `Q. 19(b)` — a LETTER split part. See GrammarSpec.letterParts. */
const LETTER_PART_RE = /^Q\.?\s*(\d{1,2})\.?\s*[([]?\s*([a-hj-uwyzA-HJ-UWYZ])\s*[)\]]?\.?$/;

function parseRef(spec: GrammarSpec, raw: string): Parsed | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;

  const sub = s.match(SUB_RE);
  if (sub) {
    const n = Number(sub[1]);
    const idx = ROMAN.indexOf(sub[2].toLowerCase());
    if (idx < 0) return null;

    // Q.1 and Q.2 are BLOCK headers, so `Q. 1(iii)` is a sub-item of the block.
    if (n === 1 || n === 2) {
      const parent = n as 1 | 2;
      if (idx + 1 > spec.blocks[parent]) return null;
      return { kind: "sub", parent, idx };
    }

    // Anything else numbered is a real question, so `Q. 31(i)` is a split PART
    // of it. The parent must still be a question that exists on this paper.
    if (n < spec.whole.from || n > spec.whole.to) return null;
    return { kind: "whole", n, part: idx };
  }

  // Letter split parts, e.g. `Q.19.b`. Tried only AFTER the roman branch above,
  // so `i`/`v`/`x` are always romans; the letters that reach here cannot be.
  if (spec.letterParts) {
    const letter = s.match(LETTER_PART_RE);
    if (letter) {
      const n = Number(letter[1]);
      // Q.1 and Q.2 are block headers whose sub-items are romans on every
      // printed paper, so a letter there is a malformed ref, not a split.
      if (n !== 1 && n !== 2 && n >= spec.whole.from && n <= spec.whole.to) {
        const idx = letter[2].toLowerCase().charCodeAt(0) - 97;
        if (idx >= 0 && idx < ROMAN.length) return { kind: "whole", n, part: idx };
      }
      return null;
    }
  }

  const whole = s.match(WHOLE_RE);
  if (whole) {
    const n = Number(whole[1]);
    if (n < spec.whole.from || n > spec.whole.to) return null;
    return { kind: "whole", n };
  }

  return null;
}

const renderRef = (spec: GrammarSpec, p: Parsed): string =>
  p.kind === "sub"
    ? spec.renderSub(p.parent, ROMAN[p.idx])
    : p.part === undefined
      ? `Q. ${p.n}`
      : `Q. ${p.n}(${ROMAN[p.part]})`;

/** Token-stem a chapter name so a plural/singular slip is recognisable as one. */
const stem = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t));

function similarity(a: string, b: string): number {
  const A = new Set(stem(a));
  const B = new Set(stem(b));
  const shared = [...A].filter((t) => B.has(t)).length;
  return shared / new Set([...A, ...B]).size;
}

export type Grammar = {
  subject: string;
  chapters: readonly string[];
  expectedRefs: string[];
  /**
   * Fold any observed spelling of a question ref onto the canonical one.
   *
   * The shipped rows carry several spellings of the same sub-item, because the
   * compilation was hand-typed. Comparing a new transcription against those
   * rows — which is the whole of the reconciliation phase — needs one canonical
   * form.
   *
   * Returns `null` rather than a guess for anything that is not a ref ON THIS
   * PAPER. A lenient parser would file a transcription slip as a real question.
   */
  normaliseRef: (raw: string) => string | null;
  /** The printed item a ref belongs to: a split part maps to its parent,
   *  everything else maps to itself. Coverage is counted on parents, because
   *  `Q. 31(i)` + `Q. 31(ii)` IS the paper's Q.31 — not two strays plus a hole. */
  parentRef: (ref: string) => string;
  /** Section, marks and format follow from the ref alone — they are printed
   *  structure, not a per-question judgement, so nothing downstream should be
   *  asked to supply them. */
  sectionOf: (raw: string) => Placement;
  /**
   * Reconcile a transcription's refs against the printed paper BOTH ways.
   *
   * A count is not enough and never was: a full-length transcription with one
   * question entered twice under two spellings and another dropped passes any
   * length check, and that is exactly the shape a hand-typed source produces.
   * So this reports what is missing, what is not on the paper, and what arrived
   * twice — independently.
   */
  reconcileRefs: (seen: readonly string[]) => Reconciliation;
  /**
   * HARD-validate a chapter against the ones the bank already carries.
   *
   * The upload path auto-creates an unknown chapter, which is right for a fresh
   * corpus and wrong here: `"Lines and Planes"` is the natural spelling and the
   * bank's is `"Line and Planes"`, so auto-creation would silently FORK a
   * shipped chapter in two — the questions would land somewhere real-looking
   * and nothing downstream would report it. The error names the near-match
   * rather than just refusing, because the near-match is the answer ~every time
   * it fires.
   */
  validateChapter: (name: string) => string;
};

function buildGrammar(spec: GrammarSpec): Grammar {
  const expectedRefs: string[] = [
    ...Array.from({ length: spec.blocks[1] }, (_, i) => spec.renderSub(1, ROMAN[i])),
    ...Array.from({ length: spec.blocks[2] }, (_, i) => spec.renderSub(2, ROMAN[i])),
    ...Array.from({ length: spec.whole.to - spec.whole.from + 1 }, (_, i) => `Q. ${spec.whole.from + i}`),
  ];
  const order = new Map(expectedRefs.map((r, i) => [r, i]));

  const normaliseRef = (raw: string): string | null => {
    const p = parseRef(spec, raw);
    return p ? renderRef(spec, p) : null;
  };

  const parentRef = (ref: string): string => {
    const p = parseRef(spec, ref);
    if (!p || p.kind !== "whole" || p.part === undefined) return ref;
    return `Q. ${p.n}`;
  };

  const sectionOf = (raw: string): Placement => {
    const p = parseRef(spec, raw);
    if (!p) throw new Error(`not a question ref on this paper: ${JSON.stringify(raw)}`);
    if (p.kind === "sub") return spec.blockPlacement[p.parent];
    const band = spec.bands.find((b) => p.n <= b.to);
    if (!band) throw new Error(`no marks band covers ${JSON.stringify(raw)}`);
    return { section: band.section, marks: band.marks, format: "subjective" };
  };

  const reconcileRefs = (seen: readonly string[]): Reconciliation => {
    const exact = new Map<string, number>();
    const bare = new Set<string>(); // parents seen as a whole, unsplit item
    const split = new Set<string>(); // parents seen via at least one split part
    const unexpected: string[] = [];

    for (const raw of seen) {
      const ref = normaliseRef(raw);
      if (!ref) {
        unexpected.push(String(raw).trim());
        continue;
      }
      exact.set(ref, (exact.get(ref) ?? 0) + 1);
      const parent = parentRef(ref);
      (parent === ref ? bare : split).add(parent);
    }

    const duplicates = [
      ...[...exact.entries()].filter(([, n]) => n > 1).map(([r]) => r),
      // A printed item cannot be both whole and split. Seeing it as each means
      // the same question is in the transcription twice, and neither exact ref
      // repeats — so the count-based check above is blind to it.
      ...[...split].filter((p) => bare.has(p)),
    ].sort((a, b) => (order.get(parentRef(a)) ?? 0) - (order.get(parentRef(b)) ?? 0));

    return {
      missing: expectedRefs.filter((r) => !bare.has(r) && !split.has(r)),
      unexpected,
      duplicates,
    };
  };

  const validateChapter = (name: string): string => {
    const s = String(name ?? "").trim();
    const exact = spec.chapters.find((c) => c === s);
    if (exact) return exact;

    const ranked = spec.chapters
      .map((c) => ({ c, score: similarity(s, c) }))
      .sort((x, y) => y.score - x.score);
    const best = ranked[0];
    const hint = best && best.score >= 0.6 ? ` Did you mean "${best.c}"?` : "";
    throw new Error(`unknown mh-hsc-12 ${spec.label} chapter: ${JSON.stringify(s)}.${hint}`);
  };

  return {
    subject: spec.subject,
    chapters: spec.chapters,
    expectedRefs,
    normaliseRef,
    parentRef,
    sectionOf,
    reconcileRefs,
    validateChapter,
  };
}

/** Every Maths sitting 2024-2026 prints the identical structure:
 *  Q.1 (i)-(viii) MCQ 2m · Q.2 (i)-(iv) VSA 1m · Q.3-14 2m · Q.15-26 3m · Q.27-34 4m.
 *  44 items, 112 printed marks against a Max of 80 — the gap IS the optionality
 *  (any 8 of 12, any 8 of 12, any 5 of 8). */
export const MATHS_GRAMMAR = buildGrammar({
  subject: "Mathematics",
  label: "Maths",
  chapters: HSC_MATHS_CHAPTERS,
  blocks: { 1: 8, 2: 4 },
  blockPlacement: {
    1: { section: "A", marks: 2, format: "mcq" },
    2: { section: "A", marks: 1, format: "subjective" },
  },
  whole: { from: 3, to: 34 },
  bands: [
    { to: 14, section: "B", marks: 2 },
    { to: 26, section: "C", marks: 3 },
    { to: 34, section: "D", marks: 4 },
  ],
  renderSub: (parent, roman) => `Q. ${parent}. (${roman})`,
});

/** Every born-digital Physics sitting in the folder prints the identical
 *  structure, measured off the June-2026 print (code J-229):
 *  Q.1 (i)-(x) MCQ 1m · Q.2 (i)-(viii) VSA 1m · Q.3-14 2m · Q.15-26 3m · Q.27-31 4m.
 *  47 items, 98 printed marks against a Max of 70 — the gap IS the optionality
 *  (any 8 of 12, any 8 of 12, any 3 of 5).
 *
 *  Note the ref spelling is `Q. 1(i)`, NOT the Maths lane's `Q. 1. (i)`. That is
 *  how the 364 Physics rows already in the bank are written, and reconciliation
 *  compares against them. */
export const PHYSICS_GRAMMAR = buildGrammar({
  subject: "Physics",
  label: "Physics",
  chapters: HSC_PHYSICS_CHAPTERS,
  blocks: { 1: 10, 2: 8 },
  blockPlacement: {
    1: { section: "A", marks: 1, format: "mcq" },
    2: { section: "A", marks: 1, format: "subjective" },
  },
  whole: { from: 3, to: 31 },
  bands: [
    { to: 14, section: "B", marks: 2 },
    { to: 26, section: "C", marks: 3 },
    { to: 31, section: "D", marks: 4 },
  ],
  renderSub: (parent, roman) => `Q. ${parent}(${roman})`,
});

/** Chemistry prints the SAME 47-item shape as Physics — measured off the June
 *  2026 print (code J-261) and identical on all seven born-digital sittings:
 *  Q.1 (i)-(x) MCQ 1m · Q.2 (i)-(viii) VSA 1m · Q.3-14 2m · Q.15-26 3m · Q.27-31 4m.
 *  98 printed marks against a Max of 70; the gap IS the optionality
 *  (any 8 of 12, any 8 of 12, any 3 of 5).
 *
 *  ONLY TWO THINGS DIFFER FROM PHYSICS, and both are why this is a third
 *  grammar rather than a reuse:
 *
 *  1. THE REF SPELLING. Three subjects, three spellings, all already shipped:
 *       Maths      `Q. 1. (v)`
 *       Physics    `Q. 1(v)`
 *       Chemistry  `Q.1.v`     — 128 of 131 distinct shipped refs, no brackets
 *     Reconciliation compares against the shipped rows, so the wrong spelling
 *     makes every ref look missing AND every shipped row look unexpected.
 *
 *  2. The chapter list.
 *
 *  Deliberately NOT modelled: the `OR` alternative refs the bank carries on
 *  older sittings (`Q.12 OR`, `Q.8.iii(OR)`). All seven born-digital papers
 *  print "Attempt any Eight / Eight / Three" and contain ZERO standalone OR
 *  lines — the OR pattern belongs to the pre-2021 sittings, which are scans
 *  and out of this lane's scope. */
export const CHEMISTRY_GRAMMAR = buildGrammar({
  subject: "Chemistry",
  label: "Chemistry",
  chapters: HSC_CHEMISTRY_CHAPTERS,
  blocks: { 1: 10, 2: 8 },
  blockPlacement: {
    1: { section: "A", marks: 1, format: "mcq" },
    2: { section: "A", marks: 1, format: "subjective" },
  },
  whole: { from: 3, to: 31 },
  bands: [
    { to: 14, section: "B", marks: 2 },
    { to: 26, section: "C", marks: 3 },
    { to: 31, section: "D", marks: 4 },
  ],
  renderSub: (parent, roman) => `Q.${parent}.${roman}`,
  letterParts: true,
});

const GRAMMARS: Record<string, Grammar> = {
  Mathematics: MATHS_GRAMMAR,
  Physics: PHYSICS_GRAMMAR,
  Chemistry: CHEMISTRY_GRAMMAR,
};

export function grammarFor(subject: string): Grammar {
  const g = GRAMMARS[String(subject ?? "").trim()];
  if (!g) {
    throw new Error(
      `no board-paper grammar for subject ${JSON.stringify(subject)}. Known: ${Object.keys(GRAMMARS).join(", ")}`,
    );
  }
  return g;
}

// ── Maths-bound aliases ────────────────────────────────────────────────────
// Pre-dating the Physics lane. Kept so every Maths script behaves identically.
export const EXPECTED_REFS = MATHS_GRAMMAR.expectedRefs;
export const normaliseRef = MATHS_GRAMMAR.normaliseRef;
export const sectionOf = MATHS_GRAMMAR.sectionOf;
export const reconcileRefs = MATHS_GRAMMAR.reconcileRefs;
export const validateChapter = MATHS_GRAMMAR.validateChapter as (name: string) => HscMathsChapter;
