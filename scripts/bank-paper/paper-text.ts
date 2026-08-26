/**
 * Text rules for an assembled paper — the seven checks that every other gate is
 * blind to.
 *
 * WHY THIS EXISTS. `auditEnglishSection` (./english.ts) governs the STRUCTURE of
 * the English section: which questions sit together, and whether a directions
 * block prints once. These rules govern the TEXT of any question in any section,
 * and they are all defects of the STORED STRING rather than of rendering —
 * `/browse` and the docx export both honour a real newline (`KatexRenderer` sets
 * `whiteSpace: pre-wrap`; `mathRuns()` emits `TextRun({break:1})`) and both build
 * a GFM pipe-table through `parseTableBlocks`. So a run-on stem or a flattened
 * match-list is wrong in the bank, not on the page.
 *
 * A printed paper is the surface that makes this matter: a student can re-flow
 * nothing, and cannot ask what the missing figure looked like.
 *
 *   P1 statement-run-on          two labelled claims sharing a line
 *   P2 matchlist-not-a-table     List-I/List-II that never parses as a table
 *   P3 pqrs-run-on               a rearrangement stem on one line
 *   P4 figure-ref-no-image       cites a figure it does not have
 *   P5 figure-text-duplicated    a figure re-described in prose beside the image
 *   P6 hand-wave                 a solution that asserts instead of deriving
 *   P7 internal-provenance       review notes that must never reach a student
 *
 * BLOCKING vs REPORTING is the load-bearing distinction. P1-P4 and P7 are
 * objective: a run-on is a run-on, a missing figure is missing, and an
 * "[LLM-derived …]" bracket in an answer key is never acceptable. P5 and P6 need
 * a human read — a duplicated figure description is redundant rather than wrong
 * (and is sometimes the ONLY thing making the question answerable), and "clearly"
 * has legitimate uses no regex separates from a hand-wave. Marking those blocking
 * would train people to skip the gate, which is worse than not having it.
 *
 * See tests/bank-paper-text.test.ts. Several negative cases there are phrases
 * that tripped the first draft against real rows — "reducing agent", "seen
 * clearly" — and are pinned so a future tightening cannot reintroduce them.
 */
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";

export type PaperTextRow = {
  id: string;
  /** Human label for the report, e.g. "Physics / Optics Q12". */
  where: string;
  stem: string;
  context: string | null;
  solution: string | null;
  /** All four option texts joined — enough to spot "Diagram A" style options. */
  optionsText: string;
  hasImage: boolean;
};

export type TextViolation = {
  rule: string;
  id: string;
  where: string;
  detail: string;
  blocking: boolean;
};

export const BLOCKING_RULES = [
  "P1-statement-run-on",
  "P2-matchlist-not-a-table",
  "P3-pqrs-run-on",
  "P4-figure-ref-no-image",
  "P7-internal-provenance",
] as const;

/** A LABELLED claim — "Statement I:", "Statement-2.", "Assertion (A):". The
 *  label and its delimiter are both required, so the prose word "statements"
 *  (as in "which of the following statements") cannot match. */
const STATEMENT_LABEL = /(?:Statement\s*[-–—]?\s*(?:[IVX]+|\d+)|Assertion\s*\((?:A)\)|Reason\s*\((?:R)\))\s*[:.]/gi;
/** A rearrangement part label. The boundary is a NON-CONSUMING lookbehind: a
 *  consuming `(?:^|[\s.])` swallows the preceding newline, which then makes the
 *  match offset point at the newline rather than the label and defeats the
 *  is-it-at-line-start test below. */
const PQRS_LABEL = /(?<![^\s.])(?:S\s*[16]|[PQRS])\s*:/g;

const MATCHLIST = /List\s*[-–—]?\s*(?:I\b|1\b)/i;

/** Cites a figure the question expects the reader to look at. */
const FIGURE_REF =
  /(?:shown in (?:the )?figure|given (?:figure|diagram|circuit diagram)|in the figure|figure below|diagram below|following diagrams?|as shown|adjoining figure|observe the given|the figure shows)/i;
/** An option set that IS a set of diagrams. */
const DIAGRAM_OPTIONS = /\bdiagram\s*[A-D]\b|\bfigure\s*[A-D]\b/i;
/** A parenthetical that re-describes the figure in prose. */
const FIGURE_PROSE = /\((?:The|In the)\s+figures?\b[^)]{40,}\)/is;

/** Asserts a result instead of deriving it. Each pattern is anchored so it
 *  cannot match the same word used descriptively — "clearly" must introduce a
 *  clause, not modify a verb like "seen clearly". */
const HAND_WAVE: [RegExp, string][] = [
  [/\bit can be shown\b/i, "it can be shown"],
  [/\bit is (?:easily|readily) seen\b/i, "it is easily seen"],
  [/\bverified numerically\b/i, "verified numerically"],
  [/\bevaluating gives\b/i, "evaluating gives"],
  [/\bthe printed solution\b/i, "cites the printed solution"],
  [/\bby an appropriate\b/i, "by an appropriate"],
  [/\bthe standard result\b/i, "the standard result"],
  [/\bone can show\b/i, "one can show"],
  [/\bleft (?:to|as an exercise) (?:the )?(?:reader|student)\b/i, "left to the reader"],
  [/(?:^|[.;]\s)\s*Clearly,/m, "opens a clause with 'Clearly,'"],
  [/(?:^|[.;]\s)\s*Obviously,/m, "opens a clause with 'Obviously,'"],
];

/** Internal review provenance. Deliberately NOT a bare /agent/ — "reducing
 *  agent" and the grammatical "agent" of a passive sentence are both legitimate
 *  subject vocabulary that tripped the first draft. */
const PROVENANCE: [RegExp, string][] = [
  [/\bLLM\b/i, "LLM"],
  [/verify before PUBLIC/i, "verify before PUBLIC"],
  [/confidence:\s*(?:HIGH|MED|LOW)/i, "confidence tag"],
  [/\bno official key\b/i, "no official key"],
  [/\bblind re-?derivation\b/i, "blind re-derivation"],
  [/\bderived_model\b/i, "derived_model"],
  [/\breviewNote\b/i, "reviewNote"],
  [/\bAI[- ]generated\b/i, "AI-generated"],
  [/\b(?:an?\s+)?(?:AI|language model)\s+(?:agent|assistant|model)\b/i, "names an AI agent"],
];

/** Count labels NOT at the start of a line. */
function inlineCount(s: string, re: RegExp): number {
  let n = 0;
  for (const m of s.matchAll(re)) {
    const before = s.slice(0, m.index ?? 0);
    if (!(before.length === 0 || /\n[ \t]*$/.test(before))) n += 1;
  }
  return n;
}

export function auditPaperText(rows: PaperTextRow[]): TextViolation[] {
  const out: TextViolation[] = [];
  const push = (rule: string, r: PaperTextRow, detail: string) =>
    out.push({
      rule, id: r.id, where: r.where, detail,
      blocking: (BLOCKING_RULES as readonly string[]).includes(rule),
    });

  for (const r of rows) {
    const stem = r.stem ?? "";
    const sol = r.solution ?? "";
    const both = `${stem}\n${r.context ?? ""}`;

    // P1
    const stmtTotal = stem.match(STATEMENT_LABEL)?.length ?? 0;
    if (stmtTotal >= 2 && inlineCount(stem, STATEMENT_LABEL) >= 1) {
      push("P1-statement-run-on", r, `${stmtTotal} labelled statements, not all on their own line`);
    }

    // P2
    if (MATCHLIST.test(both)) {
      const hasTable = parseTableBlocks(stem).some((b) => b.kind === "table");
      if (!hasTable) {
        const why = stem.includes("|")
          ? "has pipes but no |---| separator row, so GFM will not build a table"
          : "no pipe table at all — the lists are linearised into prose";
        push("P2-matchlist-not-a-table", r, why);
      }
    }

    // P3
    const pqrsTotal = stem.match(PQRS_LABEL)?.length ?? 0;
    if (pqrsTotal >= 4 && inlineCount(stem, PQRS_LABEL) >= 1) {
      push("P3-pqrs-run-on", r, `${pqrsTotal} parts, not all on their own line`);
    }

    // P4
    if (!r.hasImage && (FIGURE_REF.test(stem) || DIAGRAM_OPTIONS.test(r.optionsText ?? ""))) {
      push("P4-figure-ref-no-image", r, "cites a figure/diagram but no image is attached");
    }

    // P5
    if (r.hasImage && FIGURE_PROSE.test(stem)) {
      push("P5-figure-text-duplicated", r, "the attached figure is also described in prose in the stem");
    }

    // P6
    for (const [re, label] of HAND_WAVE) {
      if (re.test(sol)) { push("P6-hand-wave", r, label); break; }
    }

    // P7
    for (const [re, label] of PROVENANCE) {
      if (re.test(sol) || re.test(stem)) { push("P7-internal-provenance", r, label); break; }
    }
  }
  return out;
}
