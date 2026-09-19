/**
 * Pure core for the MH HSC Class-12 Maths BOARD-PAPER lane.
 *
 * The sibling `scripts/mh-hsc-12-pyq/extract.ts` reads an LWS chapterwise
 * COMPILATION (.docx, via pandoc). This lane reads the actual printed board
 * question papers (PDF), which is a different source with different failure
 * modes — see ./README.md.
 *
 * Everything here is pure and TDD'd in tests/mh-hsc-12-paper-refs.test.ts.
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

export type HscMathsChapter = (typeof HSC_MATHS_CHAPTERS)[number];

export type Section = "A" | "B" | "C" | "D";
export type Placement = { section: Section; marks: number; format: "mcq" | "subjective" };

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

/** Every sitting 2024-2026 prints the identical structure:
 *  Q.1 (i)-(viii) MCQ 2m · Q.2 (i)-(iv) VSA 1m · Q.3-14 2m · Q.15-26 3m · Q.27-34 4m.
 *  44 items, 112 printed marks against a Max of 80 — the gap IS the optionality
 *  (any 8 of 12, any 8 of 12, any 5 of 8). */
export const EXPECTED_REFS: string[] = [
  ...ROMAN.map((r) => `Q. 1. (${r})`),
  ...ROMAN.slice(0, 4).map((r) => `Q. 2. (${r})`),
  ...Array.from({ length: 32 }, (_, i) => `Q. ${i + 3}`),
];

const EXPECTED_SET = new Set(EXPECTED_REFS);

/**
 * Fold any observed spelling of a question ref onto the canonical one.
 *
 * The shipped 2024/2025 rows carry FIVE spellings of the same kind of sub-item
 * (`Q. 1. (i)`, `Q. 1. iii.`, `Q. 1. v.`, `Q. 2. (ii)`, `Q. 2. iv.`), because the
 * compilation was hand-typed. Comparing a new transcription against those rows —
 * which is the whole of the reconciliation phase — needs one canonical form.
 *
 * Returns `null` rather than a guess for anything that is not a ref ON THIS
 * PAPER: `Q. 35` and `Q. 1. (ix)` both look like refs and are both wrong, and a
 * lenient parser would file a transcription slip as a real question.
 */
export function normaliseRef(raw: string): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;

  const sub = s.match(/^Q\.?\s*([12])\.?\s*[(\[]?\s*([ivxIVX]+)\s*[)\]]?\.?$/);
  if (sub) {
    const parent = sub[1];
    const idx = ROMAN.indexOf(sub[2].toLowerCase());
    if (idx < 0) return null;
    // Q.1 runs to (viii); Q.2 stops at (iv).
    const limit = parent === "1" ? 8 : 4;
    if (idx + 1 > limit) return null;
    return `Q. ${parent}. (${ROMAN[idx]})`;
  }

  const whole = s.match(/^Q\.?\s*(\d{1,2})\.?$/);
  if (whole) {
    const n = Number(whole[1]);
    // Q.1 and Q.2 are BLOCK headers, not items — their items carry a sub-ref.
    if (n < 3 || n > 34) return null;
    return `Q. ${n}`;
  }

  return null;
}

/** Section, marks and format follow from the ref alone — they are printed
 *  structure, not a per-question judgement, so nothing downstream should be
 *  asked to supply them. */
export function sectionOf(raw: string): Placement {
  const ref = normaliseRef(raw);
  if (!ref) throw new Error(`not a question ref on this paper: ${JSON.stringify(raw)}`);

  if (ref.startsWith("Q. 1. (")) return { section: "A", marks: 2, format: "mcq" };
  if (ref.startsWith("Q. 2. (")) return { section: "A", marks: 1, format: "subjective" };

  const n = Number(ref.slice(3));
  if (n <= 14) return { section: "B", marks: 2, format: "subjective" };
  if (n <= 26) return { section: "C", marks: 3, format: "subjective" };
  return { section: "D", marks: 4, format: "subjective" };
}

export type Reconciliation = { missing: string[]; unexpected: string[]; duplicates: string[] };

/**
 * Reconcile a transcription's refs against the printed paper BOTH ways.
 *
 * A count is not enough and never was: 44 refs with one question transcribed
 * twice under two spellings and another dropped passes any length check, and
 * that is exactly the shape a hand-typed source produces. So this reports what
 * is missing, what is not on the paper, and what arrived twice — independently.
 */
export function reconcileRefs(seen: readonly string[]): Reconciliation {
  const counts = new Map<string, number>();
  const unexpected: string[] = [];

  for (const raw of seen) {
    const ref = normaliseRef(raw);
    if (!ref) {
      unexpected.push(String(raw).trim());
      continue;
    }
    counts.set(ref, (counts.get(ref) ?? 0) + 1);
  }

  const order = (a: string, b: string) => EXPECTED_REFS.indexOf(a) - EXPECTED_REFS.indexOf(b);

  return {
    missing: EXPECTED_REFS.filter((r) => !counts.has(r)),
    unexpected,
    duplicates: [...counts.entries()]
      .filter(([, n]) => n > 1)
      .map(([r]) => r)
      .sort(order),
  };
}

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

/**
 * HARD-validate a chapter against the 15 the bank already carries.
 *
 * The upload path auto-creates an unknown chapter, which is right for a fresh
 * corpus and wrong here: `"Lines and Planes"` is the natural spelling and the
 * bank's is `"Line and Planes"`, so auto-creation would silently FORK a shipped
 * chapter in two — the questions would land somewhere real-looking and nothing
 * downstream would report it. The error names the near-match rather than just
 * refusing, because the near-match is the answer ~every time it fires.
 */
export function validateChapter(name: string): HscMathsChapter {
  const s = String(name ?? "").trim();
  const exact = HSC_MATHS_CHAPTERS.find((c) => c === s);
  if (exact) return exact;

  const ranked = HSC_MATHS_CHAPTERS.map((c) => ({ c, score: similarity(s, c) })).sort((x, y) => y.score - x.score);
  const best = ranked[0];
  const hint = best && best.score >= 0.6 ? ` Did you mean "${best.c}"?` : "";
  throw new Error(`unknown mh-hsc-12 Maths chapter: ${JSON.stringify(s)}.${hint}`);
}
