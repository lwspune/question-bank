/**
 * Pure core for applying source-verified corrections raised by /dashboard/reports.
 *
 * Kept separate from the IO runner so the two things that can silently corrupt the
 * bank are testable: (1) WHEN a `content_hash` recompute is required, and (2) the
 * integrity invariants (exactly one correct option, no duplicate option texts).
 *
 * The rehash rule follows `src/lib/upload/hash.ts`, one formula per format (see
 * `newContentHash`). `solution` is never hashed, so a solution edit is always
 * id-stable; `context` is hashed for numeric and subjective rows only.
 */

import { contentHash, numericContentHash, subjectiveContentHash } from "../../src/lib/upload/hash";

export interface QuestionState {
  text: string;
  context: string | null;
  solution: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
}

export interface Fix {
  /** questions.id */
  id: string;
  /** human tag for the log line, e.g. "JEE 2026 Apr05 S1 Q52" */
  label: string;
  /** why this edit is correct — source citation */
  reason: string;
  text?: string;
  context?: string | null;
  solution?: string;
  /** partial map of option label -> new text */
  options?: Record<string, string>;
  /** only when the key actually moves */
  correct?: string;
}

export interface FixPlan {
  finalText: string;
  finalContext: string | null;
  finalSolution: string | null;
  finalOptions: { label: string; text: string; is_correct: boolean }[];
  /** null for subjective / numeric rows, which carry no options */
  finalCorrect: string | null;
  /** true when text, an option text, or the answer changed */
  needsRehash: boolean;
  changed: string[];
  problems: string[];
  isNoop: boolean;
}

export function planFix(state: QuestionState, fix: Fix): FixPlan {
  const problems: string[] = [];
  const changed: string[] = [];

  const finalText = fix.text ?? state.text;
  if (finalText !== state.text) changed.push("text");

  const finalContext = fix.context !== undefined ? fix.context : state.context;
  if (finalContext !== state.context) changed.push("context");

  const finalSolution = fix.solution ?? state.solution;
  if (finalSolution !== state.solution) changed.push("solution");

  const byLabel = new Map(state.options.map((o) => [o.label, o]));
  for (const label of Object.keys(fix.options ?? {})) {
    if (!byLabel.has(label)) problems.push(`unknown option label ${label}`);
  }

  const oldCorrect = state.options.find((o) => o.is_correct)?.label ?? null;
  let finalCorrect: string | null = fix.correct ?? oldCorrect;

  if (state.options.length > 0) {
    if (fix.correct && !byLabel.has(fix.correct)) {
      problems.push(`correct label ${fix.correct} does not exist`);
      finalCorrect = oldCorrect;
    } else if (!finalCorrect) {
      problems.push("row has no correct option and the fix does not name one");
    }
  } else {
    finalCorrect = null;
  }

  const finalOptions = state.options.map((o) => {
    const text = fix.options?.[o.label] ?? o.text;
    if (text !== o.text) changed.push(`option:${o.label}`);
    return { label: o.label, text, is_correct: finalCorrect ? o.label === finalCorrect : o.is_correct };
  });

  const texts = finalOptions.map((o) => o.text.trim());
  const dupes = [...new Set(texts.filter((t, i) => texts.indexOf(t) !== i))];
  if (dupes.length) problems.push(`duplicate option text after fix: ${dupes.join(" | ")}`);

  const keyMoved = finalCorrect !== oldCorrect;
  if (keyMoved) changed.push(`key:${oldCorrect ?? "-"}->${finalCorrect ?? "-"}`);

  const optionTextChanged = changed.some((c) => c.startsWith("option:"));
  const needsRehash = finalText !== state.text || optionTextChanged || keyMoved;

  return {
    finalText,
    finalContext,
    finalSolution,
    finalOptions,
    finalCorrect,
    needsRehash,
    changed,
    problems,
    isNoop: changed.length === 0,
  };
}

export type QuestionFormat = "mcq" | "subjective" | "numeric";

/**
 * The content_hash a fixed row should carry, or null when the fix leaves it
 * alone. Each format has its own formula (src/lib/upload/hash.ts): an MCQ hashes
 * stem + options + key, a numeric or subjective row hashes stem + context. Using
 * the MCQ formula on a numeric row would give it a hash its pipeline never
 * produces, so a re-ingest would insert a duplicate instead of matching it.
 */
export function newContentHash(state: QuestionState, plan: FixPlan, format: QuestionFormat): string | null {
  if (format === "mcq") {
    return plan.needsRehash
      ? contentHash(plan.finalText, plan.finalOptions.map((o) => o.text), plan.finalCorrect ?? "")
      : null;
  }
  if (plan.finalText === state.text && plan.finalContext === state.context) return null;
  return format === "numeric"
    ? numericContentHash(plan.finalText, plan.finalContext)
    : subjectiveContentHash(plan.finalText, plan.finalContext);
}
