/**
 * IMAT twins, pure core (spec tests/imat-twins.test.ts).
 *
 * A twin is our own practice question written for one Cambridge question
 * (2011-2022): same section, chapter, skill, format and difficulty; new
 * situation, numbers, wording and options. The Cambridge papers stay private
 * forever, so the twin is what a student practises on. `twinOf` records the
 * source for coverage tracking only and is never published.
 *
 * SCOPE (owner, 2026-10-11): twin a Cambridge question only if its topic is
 * in the current syllabus (DM 1005/2026, Allegato A, which the ministry says
 * is essentially the 2025 one) or the ministry papers 2023-2026 have asked
 * it. Applied to the 760 Cambridge questions:
 * - Figure questions wait for a later pass (we do not draw diagrams).
 * - Optics: not in the syllabus, never asked by the ministry. Out.
 * - Oscillations and waves: not listed, but the ministry asked 3. In.
 * - Critical thinking: the syllabus covers "completing a logical argument
 *   from given statements" (conclusion questions) and the ministry asked a
 *   "strengthen" question in 2023; weaken is the same skill reversed. Those
 *   are in. Assumption, flaw, principle, main conclusion and parallel
 *   reasoning are argument analysis, neither listed nor asked. Out.
 */
import katex from "katex";
import { SUBJECT_OF_SECTION, type ImatQuestion, type ImatSection } from "../lib";
import { contentHash } from "../../../src/lib/upload/hash";
import { normalizeNewlines } from "../../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload, StoredOptionLabel } from "../../../src/lib/upload/validate";

const LABELS: readonly StoredOptionLabel[] = ["A", "B", "C", "D", "E"];

export type ImatTwin = {
  /** "twin-<year>-Q<n>", naming the source. */
  id: string;
  /** The source, as the originality corpus names it: "<year> Q<n>". */
  twinOf: string;
  section: ImatSection;
  subject?: "Physics" | "Mathematics";
  chapter: string;
  /** Shared material (a passage or a table) shown above the stem. */
  context?: string;
  text: string;
  options: string[];
  answer: "A" | "B" | "C" | "D" | "E";
  solution: string;
};

export type CriticalThinkingKind =
  | "conclusion"
  | "strengthen"
  | "weaken"
  | "assumption"
  | "flaw"
  | "principle"
  | "main-conclusion"
  | "parallel"
  | "other";

/**
 * Order matters: "main conclusion" before the generic "conclusion". Word
 * boundaries matter too: an unbounded /follows?/ matched "Which one of the
 * FOLLOWing", which nearly every question contains, so every unrecognised
 * kind fell through as an in-scope conclusion question.
 */
const CT_KINDS: readonly [CriticalThinkingKind, RegExp][] = [
  ["main-conclusion", /main conclusion|best expresses/i],
  ["parallel", /parallel|similar (in its )?reasoning|same (pattern|structure)|logical structure|matches the reasoning/i],
  ["assumption", /assum/i],
  ["flaw", /flaw/i],
  ["principle", /principle/i],
  ["strengthen", /strengthen/i],
  ["weaken", /weaken/i],
  ["conclusion", /\b(drawn|follows|must be true|reliably|inferred|conclu\w*)\b/i],
];

export function criticalThinkingKind(text: string): CriticalThinkingKind {
  return CT_KINDS.find(([, r]) => r.test(text))?.[0] ?? "other";
}

const CT_IN_SCOPE = new Set<CriticalThinkingKind>(["conclusion", "strengthen", "weaken"]);
const OUT_OF_SYLLABUS_CHAPTERS = new Set(["Optics"]);

export type TwinScope = { inScope: true } | { inScope: false; reason: string };

export function twinScope(q: ImatQuestion): TwinScope {
  if (q.figure || q.optionImages) return { inScope: false, reason: "figure" };
  if (OUT_OF_SYLLABUS_CHAPTERS.has(q.chapter)) return { inScope: false, reason: "not in the syllabus" };
  if (q.chapter === "Critical Thinking") {
    const kind = criticalThinkingKind(q.text);
    if (!CT_IN_SCOPE.has(kind)) return { inScope: false, reason: `critical thinking: ${kind}` };
  }
  return { inScope: true };
}

const ZONE = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
const DASH = /—|–| -- /;

function mathProblems(s: string): string[] {
  const out: string[] = [];
  for (const m of s.matchAll(ZONE)) {
    try {
      katex.renderToString(m[1] ?? m[2], { throwOnError: true, displayMode: m[2] !== undefined, strict: "ignore" });
    } catch (e) {
      out.push((e as Error).message.slice(0, 100));
    }
  }
  if ((s.match(/\\\(/g) ?? []).length !== (s.match(/\\\)/g) ?? []).length) out.push("unbalanced \\( \\)");
  return out;
}

/** Problems with a batch of twins; an empty list means it passes. */
export function checkTwins(twins: readonly ImatTwin[], sources: ReadonlyMap<string, ImatQuestion>): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const t of twins) {
    const at = t.id;
    const src = sources.get(t.twinOf);
    if (!src) {
      problems.push(`${at}: no such past question "${t.twinOf}"`);
      continue;
    }
    const scope = twinScope(src);
    if (!scope.inScope) problems.push(`${at}: ${t.twinOf} is out of scope (${scope.reason})`);
    if (seen.has(t.twinOf)) problems.push(`${at}: ${t.twinOf} twinned twice`);
    seen.add(t.twinOf);
    if (t.id !== `twin-${t.twinOf.replace(" ", "-")}`) problems.push(`${at}: id must be twin-${t.twinOf.replace(" ", "-")}`);
    if (t.section !== src.section) problems.push(`${at}: section ${t.section}, source is ${src.section}`);
    if (t.chapter !== src.chapter) problems.push(`${at}: chapter "${t.chapter}", source is "${src.chapter}"`);
    if (src.section === "physmath" && t.subject !== src.subject) problems.push(`${at}: subject must be ${src.subject}`);

    if (t.options.length !== 5 || new Set(t.options.map((o) => o.trim())).size !== 5)
      problems.push(`${at}: needs five distinct options`);
    if (!["A", "B", "C", "D", "E"].includes(t.answer)) problems.push(`${at}: answer must be A-E`);
    if (!t.text.trim()) problems.push(`${at}: empty stem`);
    if (!t.solution.trim()) problems.push(`${at}: no solution`);
    for (const [field, s] of [["context", t.context ?? ""], ["text", t.text], ["solution", t.solution], ...t.options.map((o, i) => [`option ${i + 1}`, o])]) {
      for (const p of mathProblems(s)) problems.push(`${at} ${field}: KaTeX: ${p}`);
      if (DASH.test(s)) problems.push(`${at} ${field}: em dash, en dash or spaced double hyphen`);
    }
  }
  return problems;
}

/**
 * One twin -> the row commitStaged stores. Options keep the order written
 * (the answer letters are balanced across the set, so no shuffle). The
 * Cambridge source (`twinOf`) is deliberately NOT carried: it stays in the
 * repo for coverage tracking and can never reach a published page.
 */
export function buildTwinRow(t: ImatTwin, sourceRow: number): ParsedRowPayload {
  for (const [field, value] of [["text", t.text], ["context", t.context], ["solution", t.solution], ...t.options.map((o, i) => [`option ${i + 1}`, o])] as const) {
    if (value && normalizeNewlines(value) !== value) throw new Error(`${t.id} ${field}: literal backslash-n; fix the twin file`);
  }
  const options = t.options.map((text, i) => ({ label: LABELS[i], text: text.trim(), isCorrect: LABELS[i] === t.answer }));
  const text = t.text.trim();
  return {
    sourceRow,
    subjectName: t.section === "physmath" ? t.subject! : SUBJECT_OF_SECTION[t.section],
    chapterName: t.chapter,
    context: t.context?.trim() || undefined,
    text,
    difficulty: "MODERATE",
    solution: t.solution.trim(),
    options,
    contentHash: contentHash(text, options.map((o) => o.text), t.answer),
  };
}
