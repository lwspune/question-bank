/**
 * Pure core for applying source-verified corrections raised by /dashboard/reports.
 *
 * Kept separate from the IO runner so the two things that can silently corrupt the
 * bank are testable: (1) WHEN a `content_hash` recompute is required, and (2) the
 * integrity invariants (exactly one correct option, no duplicate option texts).
 *
 * The rehash rule follows `contentHash(text, options, answer)` in
 * `src/lib/upload/hash.ts` — note `context` and `solution` are NOT hashed, so
 * edits to those are id-stable and need no recompute (and therefore cannot
 * collide with a sibling row).
 */

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
