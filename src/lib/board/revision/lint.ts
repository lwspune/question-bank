/**
 * The quick-revision sheet checker (2026-11-03). Pure: a sheet in, a list of
 * problems out (empty = clean). Every registered sheet must pass it
 * (tests/board-revision-registry.test.ts); the rules are pinned by
 * tests/board-revision-lint.test.ts.
 *
 * "Quick" is enforced here: each section has a cap on items and each text a
 * cap on length, because a revision sheet that grows into notes stops being
 * read the night before.
 */
import katex from "katex";
import "katex/contrib/mhchem";
import { slugify } from "@/lib/board/query";
import type { RevisionSheet } from "./types";

type Limit = { min: number; max: number };

export const REVISION_LIMITS = {
  keyPoints: { min: 4, max: 14 },
  formulas: { min: 0, max: 20 },
  derivations: { min: 0, max: 10 },
  diagrams: { min: 0, max: 6 },
  mostAsked: { min: 3, max: 8 },
  mistakes: { min: 2, max: 6 },
} as const satisfies Record<string, Limit>;

/** Longest text, in characters, per field kind. */
const MAX_CHARS = { title: 160, text: 420, step: 220, label: 60 } as const;

const FIRST_YEAR = 2000;

// The voice rule (CLAUDE.md): no em dash, and no spaced en dash or double hyphen.
const DASH = /—|\s–\s|\s--\s/;

/** Inline maths zones of a text, or an error when a `\(` is never closed. */
function mathZones(text: string): { zones: string[]; error?: string } {
  const zones: string[] = [];
  let i = 0;
  for (;;) {
    const open = text.indexOf("\\(", i);
    if (open < 0) break;
    const close = text.indexOf("\\)", open + 2);
    if (close < 0) return { zones, error: "unclosed \\(" };
    zones.push(text.slice(open + 2, close));
    i = close + 2;
  }
  if (text.indexOf("\\)", i) >= 0) return { zones, error: "\\) without \\(" };
  return { zones };
}

function katexError(tex: string): string | null {
  try {
    katex.renderToString(tex, { throwOnError: true, strict: "ignore" });
    return null;
  } catch (err) {
    return err instanceof Error ? err.message.split("\n")[0] : String(err);
  }
}

export function lintRevisionSheet(sheet: RevisionSheet): string[] {
  const out: string[] = [];

  /** A prose field: present, short enough, no banned dash, no literal \n, maths that renders. */
  function text(path: string, value: string, max: number) {
    if (!value || !value.trim()) {
      out.push(`${path}: empty`);
      return;
    }
    if (value.length > max) out.push(`${path}: ${value.length} characters, over ${max}`);
    if (DASH.test(value)) out.push(`${path}: dash (write a full stop, colon, comma or brackets)`);
    const { zones, error } = mathZones(value);
    // Outside maths only: inside it, \nu and \neq are commands, not newlines.
    if (zones.reduce((s, z) => s.replace(`\\(${z}\\)`, ""), value).includes("\\n"))
      out.push(`${path}: literal \\n`);
    if (error) out.push(`${path}: ${error}`);
    for (const z of zones) {
      const e = katexError(z);
      if (e) out.push(`${path}: maths does not render (${e})`);
    }
  }

  function count(name: keyof typeof REVISION_LIMITS, n: number) {
    const { min, max } = REVISION_LIMITS[name];
    if (n < min) out.push(`${name}: ${n}, needs at least ${min}`);
    if (n > max) out.push(`${name}: ${n}, at most ${max} (keep it quick)`);
  }

  if (!/^[a-z0-9][a-z0-9-]*$/.test(sheet.examSlug)) out.push("examSlug: not a slug");
  if (sheet.subjectRoute !== slugify(sheet.subjectName))
    out.push(`subjectRoute: "${sheet.subjectRoute}" is not the board slug of "${sheet.subjectName}"`);
  if (sheet.chapterSlug !== slugify(sheet.chapterName))
    out.push(`chapterSlug: "${sheet.chapterSlug}" is not the board slug of "${sheet.chapterName}"`);
  text("source", sheet.source, MAX_CHARS.title);

  count("keyPoints", sheet.keyPoints.length);
  sheet.keyPoints.forEach((k, i) => {
    text(`keyPoints[${i}].term`, k.term, MAX_CHARS.label);
    text(`keyPoints[${i}].text`, k.text, MAX_CHARS.text);
  });

  count("formulas", sheet.formulas.length);
  sheet.formulas.forEach((f, i) => {
    text(`formulas[${i}].label`, f.label, MAX_CHARS.label);
    // The page's FormulaBlock prints the label as plain text: "C_V" would show its underscore.
    if (/\\\(|[_^]/.test(f.label)) out.push(`formulas[${i}].label: maths in a plain-text label (write Cv, or words)`);
    if (!f.latex.trim()) out.push(`formulas[${i}].latex: empty`);
    else {
      const e = katexError(f.latex);
      if (e) out.push(`formulas[${i}].latex: maths does not render (${e})`);
    }
    (f.symbols ?? []).forEach((s, j) => {
      text(`formulas[${i}].symbols[${j}].symbol`, s.symbol, MAX_CHARS.label);
      text(`formulas[${i}].symbols[${j}].meaning`, s.meaning, MAX_CHARS.label * 2);
    });
  });

  count("derivations", sheet.derivations.length);
  sheet.derivations.forEach((d, i) => {
    text(`derivations[${i}].title`, d.title, MAX_CHARS.title);
    if (d.steps.length < 2) out.push(`derivations[${i}]: needs at least 2 steps`);
    d.steps.forEach((s, j) => text(`derivations[${i}].steps[${j}]`, s, MAX_CHARS.step));
  });

  count("diagrams", sheet.diagrams.length);
  sheet.diagrams.forEach((d, i) => {
    text(`diagrams[${i}].title`, d.title, MAX_CHARS.title);
    if (d.labels.length < 2) out.push(`diagrams[${i}]: needs at least 2 labels`);
    d.labels.forEach((l, j) => text(`diagrams[${i}].labels[${j}]`, l, MAX_CHARS.label));
  });

  count("mostAsked", sheet.mostAsked.length);
  const thisYear = new Date().getFullYear();
  sheet.mostAsked.forEach((m, i) => {
    text(`mostAsked[${i}].topic`, m.topic, MAX_CHARS.title);
    if (m.marks !== undefined && (!Number.isInteger(m.marks) || m.marks < 1 || m.marks > 10))
      out.push(`mostAsked[${i}].marks: ${m.marks} is not a whole number of marks from 1 to 10`);
    if (m.years.length === 0) out.push(`mostAsked[${i}].years: empty`);
    for (const y of m.years)
      if (!Number.isInteger(y) || y < FIRST_YEAR || y > thisYear) out.push(`mostAsked[${i}].years: ${y} is not a year`);
    for (let j = 1; j < m.years.length; j++)
      if (m.years[j] >= m.years[j - 1]) {
        out.push(`mostAsked[${i}].years: list each year once, newest first`);
        break;
      }
  });

  count("mistakes", sheet.mistakes.length);
  sheet.mistakes.forEach((m, i) => {
    text(`mistakes[${i}].title`, m.title, MAX_CHARS.title);
    text(`mistakes[${i}].body`, m.body, MAX_CHARS.text);
  });

  return out;
}
