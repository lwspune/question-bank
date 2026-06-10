/**
 * Quiz THEME-COVERAGE probe logic (triage aid, NOT a gate).
 *
 * The quiz harvester only turns a concept's `formula.latex` into formula-recall
 * atoms and a concept's `traps` callouts into trap atoms — so a formula taught
 * only in `definition`/`intuition` prose, or a chapter with no `traps`, silently
 * yields no atoms for that theme ("atoms consumed" ≠ "theme complete"). This
 * module surfaces those gaps. See [[quiz-formula-coverage-gap]].
 *
 * Two signals:
 *  - STRONG (`conceptCoverage`): a concept teaches formulas in prose but its
 *    `formula.latex` is EMPTY — it exposes nothing (the Lines case).
 *  - REVIEW (`chapterFormulaGaps`): a prose formula matched against NO concept's
 *    `formula.latex` ANYWHERE in the chapter. Matched chapter-wide + deduped so a
 *    formula restated across concepts isn't a false gap; still noisy (derivation
 *    steps + conditions look like formulas), so it's a human-review list.
 *
 * Pure + side-effect-free; the CLI (`scripts/quiz-coverage.ts`) prints the report.
 */
import { splitFormulaPieces } from "./atoms";

const RELATION = /=|\\ge|\\le|\\geq|\\leq|\\equiv/;

const COMMON_MACROS = new Set([
  "\\left", "\\right", "\\text", "\\times", "\\cdot", "\\quad", "\\qquad",
  "\\bar", "\\begin", "\\end", "\\hat", "\\ldots", "\\dots", "\\Rightarrow",
  "\\rightarrow", "\\to", "\\implies", "\\iff", "\\leq", "\\geq", "\\neq",
  "\\in", "\\approx", "\\pm", "\\mp", "\\,", "\\;", "\\!",
]);

const STRUCTURE_MACRO =
  /\\d?frac|\\sqrt|\\binom|\\sin|\\cos|\\tan|\\cot|\\sec|\\csc|\\sum|\\prod|\\int|\\log|\\ln|\\vec|\\overrightarrow|\\det|\\operatorname/;

export function mathZones(s: string): string[] {
  const out: string[] = [];
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) out.push(m[1] ?? m[2] ?? "");
  return out;
}

/** A math zone is "formula-like" if it asserts a relation AND has real structure
 *  (a binary operator OR a structure/content macro) — so `x=2`, `n=10`, `f(x)`
 *  are excluded, while `m=\dfrac{y_2-y_1}{x_2-x_1}` and `\sin(A+B)=…` qualify. */
export function isFormulaLike(zone: string): boolean {
  if (!RELATION.test(zone)) return false;
  const stripped = zone.replace(/\\[a-zA-Z]+/g, " ");
  if (/[+\-*/^]/.test(stripped)) return true;
  if (STRUCTURE_MACRO.test(zone)) return true;
  return (zone.match(/\\[a-zA-Z]+/g) ?? []).some((mc) => !COMMON_MACROS.has(mc));
}

/** Formula-like math zones across a concept's prose fields. */
export function proseFormulas(...texts: (string | undefined)[]): string[] {
  return texts
    .filter((t): t is string => Boolean(t))
    .flatMap(mathZones)
    .filter(isFormulaLike);
}

/** Canonical form for matching a prose formula against a `formula.latex` piece:
 *  drop layout/spacing, unify \dfrac/\tfrac→\frac, strip braces + whitespace. */
export function normalizeFormula(s: string): string {
  return s
    .replace(/\\left|\\right/g, "")
    .replace(/\\[,;!]/g, "")
    .replace(/\\[dt]frac/g, "\\frac")
    .replace(/[{}\s]/g, "");
}

type ConceptLike = {
  slug: string;
  kind?: string;
  definition?: string;
  intuition?: string;
  formula?: { latex?: string };
  traps?: unknown[];
};

const latexPieces = (c: ConceptLike): string[] =>
  c.kind === "formula" && c.formula?.latex ? splitFormulaPieces(c.formula.latex) : [];

export type ConceptCoverage = {
  slug: string;
  proseCount: number;
  latexCount: number;
  flagged: boolean;
  reason: string;
};

/** STRONG signal: concept teaches formula(s) in prose but `formula.latex` is empty. */
export function conceptCoverage(concept: ConceptLike): ConceptCoverage {
  const prose = new Set(proseFormulas(concept.definition, concept.intuition).map(normalizeFormula));
  const latex = latexPieces(concept);
  const flagged = prose.size > 0 && latex.length === 0;
  return {
    slug: concept.slug,
    proseCount: prose.size,
    latexCount: latex.length,
    flagged,
    reason: flagged ? `${prose.size} formula(s) in prose, formula.latex EMPTY` : "",
  };
}

/** REVIEW signal: prose formulas matched against NO `formula.latex` piece anywhere
 *  in the chapter (deduped per concept). Noisy — includes derivation steps. */
export function chapterFormulaGaps(concepts: ConceptLike[]): { slug: string; formula: string }[] {
  const latexNorms = concepts.flatMap(latexPieces).map(normalizeFormula).filter(Boolean);
  const covered = (p: string): boolean => {
    const pn = normalizeFormula(p);
    return latexNorms.some((ln) => ln.includes(pn) || pn.includes(ln));
  };
  const out: { slug: string; formula: string }[] = [];
  for (const c of concepts) {
    const seen = new Set<string>();
    for (const p of proseFormulas(c.definition, c.intuition)) {
      const pn = normalizeFormula(p);
      if (seen.has(pn)) continue;
      seen.add(pn);
      if (!covered(p)) out.push({ slug: c.slug, formula: p });
    }
  }
  return out;
}

/** Total `traps` callouts across a chapter's concepts (each → one trap atom). A
 *  chapter below ~12 can't assemble a standalone Common-Traps quiz. */
export function trapCalloutCount(concepts: { traps?: unknown[] }[]): number {
  return concepts.reduce((n, c) => n + (Array.isArray(c.traps) ? c.traps.length : 0), 0);
}
