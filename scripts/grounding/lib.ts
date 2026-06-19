// Pure helpers for the RAG grounding/extraction pipeline.
// Unit-tested in tests/grounding-extract.test.ts. No IO here.

import { z } from "zod";

export type OptionLabel = "A" | "B" | "C" | "D";

/** Clean structured solution derived by the LLM and stored in questions.solution_json. */
export interface SolutionJson {
  /** One-line method / approach. */
  approach: string;
  /** Ordered worked steps. */
  steps: string[];
  /** The final answer value, as text (e.g. "3/4", "x = 2"). */
  final_answer: string;
  /** Which option the re-derivation lands on, or null if undeterminable. */
  option_matched: OptionLabel | null;
}

const SOLUTION_JSON_SCHEMA = z.object({
  approach: z.string(),
  steps: z.array(z.string()),
  final_answer: z.string(),
  option_matched: z.enum(["A", "B", "C", "D"]).nullable(),
});

// Formatting/structural commands carry no semantic content — drop the command
// (their braced content is kept and the braces are removed at the end).
const FORMATTING_COMMANDS = [
  "left", "right", "text", "mathbf", "mathrm", "mathit", "mathsf", "mathcal",
  "boldsymbol", "displaystyle", "operatorname", "limits", "big", "Big", "bigg",
  "Bigg", "hat", "bar", "vec", "tilde", "dot", "overline", "underline",
  "overrightarrow", "mathbb", "nonumber", "label",
];

/**
 * Render-free plain text for embedding + grounding. The goal is to PRESERVE the
 * semantic tokens (function/operator names, variables, numbers) that an
 * embedding needs — never to delete them — while shedding pure typography.
 * Decidable rules (the contract under test):
 *   - \begin{env}/\end{env} -> removed (matrix/cases wrappers)
 *   - \frac{a}{b} -> a/b ; \sqrt{x} -> sqrt(x)
 *   - \times, \cdot -> * ; common relations -> ascii (<=, >=, !=, ->)
 *   - formatting commands (\left \right \text \mathbf ...) -> dropped
 *   - any OTHER \command -> kept as the word "command" (so \sin->sin, \int->int,
 *     \cos\theta->"cos theta"), space-separated so adjacent commands don't glue
 *   - \( \) \[ \] delimiters, & column seps, \\ row seps -> space
 *   - collapses runs of whitespace, trims
 */
export function latexToPlainText(raw: string): string {
  let s = raw;

  // Environment wrappers (matrices, cases) -> gone; entries survive.
  s = s.replace(/\\(?:begin|end)\{[a-zA-Z*]+\}/g, " ");

  // Structural commands that consume their {...} braces.
  s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");
  s = s.replace(/\\sqrt\{([^{}]*)\}/g, "sqrt($1)");

  // Operators + common relations -> readable ascii.
  s = s.replace(/\\times/g, " * ").replace(/\\cdot/g, " * ").replace(/\\div/g, " / ");
  s = s.replace(/\\(?:le|leq)\b/g, " <= ").replace(/\\(?:ge|geq)\b/g, " >= ");
  s = s.replace(/\\(?:ne|neq)\b/g, " != ").replace(/\\pm\b/g, " +/- ");
  s = s.replace(/\\(?:to|rightarrow|Rightarrow)\b/g, " -> ");

  // Drop formatting commands (keep their content; no separator — they wrap, so
  // their neighbours should stay adjacent, e.g. \left(x\right) -> (x)).
  s = s.replace(new RegExp(`\\\\(?:${FORMATTING_COMMANDS.join("|")})\\b`, "g"), "");

  // Spacing commands.
  s = s.replace(/\\[,!;:]/g, " ");

  // Every remaining \command -> its name, space-prefixed so command-command
  // adjacency (\cos\theta) doesn't glue while \int( keeps its bracket.
  s = s.replace(/\\([a-zA-Z]+)/g, " $1");

  // Delimiters, column/row separators -> space.
  s = s.replace(/\\[()[\]]/g, " ").replace(/&/g, " ").replace(/\\\\/g, " ");

  // Shed leftover braces and any stray backslashes.
  s = s.replace(/[{}]/g, "").replace(/\\/g, "");

  // Normalize whitespace.
  return s.replace(/\s+/g, " ").trim();
}

/**
 * Defensive parse of an LLM JSON response: strips a ```json ... ``` fence (or a
 * bare ``` fence) and surrounding whitespace, then JSON.parse. Throws if the
 * remaining text is not valid JSON.
 */
export function parseModelJson(raw: string): unknown {
  let s = raw.trim();
  const fence = s.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/i);
  if (fence) s = fence[1].trim();
  return JSON.parse(s);
}

/**
 * Validates an arbitrary parsed object against the SolutionJson shape and
 * returns it typed. Throws on a missing/wrong-typed field or an option_matched
 * outside A|B|C|D|null.
 */
export function validateSolutionJson(obj: unknown): SolutionJson {
  return SOLUTION_JSON_SCHEMA.parse(obj);
}

/**
 * Wrong-key candidate detector: true only when the re-derived option and the
 * bank's correct label are both present AND differ. A null re-derivation is
 * "undeterminable", not a mismatch.
 */
export function detectKeyMismatch(optionMatched: string | null, correctLabel: string): boolean {
  if (optionMatched == null) return false;
  return optionMatched !== correctLabel;
}

/** Idempotency filter for the extraction script: true when grounding is missing. */
export function needsGrounding(row: { plain_text: string | null }): boolean {
  return row.plain_text == null || row.plain_text.trim().length === 0;
}

/** Idempotency filter for the embedding script: true when an embedding is missing. */
export function needsEmbedding(row: { embedding: unknown | null }): boolean {
  return row.embedding == null;
}

/**
 * The bank's own correct-answer label for a question — the ground truth the
 * agent's re-derived option_matched is audited against. Returns the first
 * is_correct option's label, or null if none is flagged.
 */
export function correctOptionLabel(options: { label: string; is_correct: boolean }[]): string | null {
  return options.find((o) => o.is_correct)?.label ?? null;
}
