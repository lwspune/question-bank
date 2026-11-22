/**
 * Method notes: a bracketed line on HOW an answer was got, never on the
 * question. PURE. Spec: tests/method-notes.test.ts.
 *
 * RULE (owner, 2026-11-19 and 2026-11-22): no such note reaches a student on
 * any surface. "[Answer worked out by PYQ Vault: ... Two independent solutions
 * agreed.]" tells a student nothing they can act on, reads as a disclaimer, and
 * in a printed book only adds pages. The fact is recorded in question_reviews
 * (which no student page reads); the solution carries the working alone.
 *
 * The kinds below are every phrasing the ingestion lanes ever wrote. Migration
 * 0280's CHECK refuses the same openings, so the database and this file agree.
 * A textbook-key note ("[Textbook answer-key error: ...]") is NOT a method note:
 * it tells a student why their own book shows a different answer.
 */

/** The opening of every method note, after the "[". Migration 0280's CHECK lists the same. */
export const METHOD_NOTE_OPENINGS = [
  "Answer worked out by PYQ Vault",
  "One sample answer written by PYQ Vault",
  "उत्तर PYQ Vault",
  "Derived answer",
  "Answer derived from the printed",
  // The keyed variant: still only says where the answer came from.
  "Answer from the official",
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A whole method note: "[" + an opening + anything but a closing bracket + "]". */
const NOTE_RE = new RegExp(`\\[(?:${METHOD_NOTE_OPENINGS.map(escape).join("|")})[^\\]]*\\]`, "g");

export function hasMethodNote(solution: string | null | undefined): boolean {
  return !!solution && new RegExp(NOTE_RE.source).test(solution);
}

/**
 * The solution with every method note cut out, and the notes (without their
 * brackets), so a caller can record them internally. Blank lines and spaces the
 * cut leaves behind are tidied; a solution that was only a note becomes null.
 */
export function splitMethodNotes(solution: string | null | undefined): { solution: string | null; notes: string[] } {
  if (solution == null) return { solution: null, notes: [] };
  const notes: string[] = [];
  const CUT = "\u0000";
  // Each note becomes one marker, taking the spaces on either side with it.
  const marked = solution.replace(new RegExp(`[ \\t]*(?:${NOTE_RE.source})[ \\t]*`, "g"), (m) => {
    notes.push(m.trim().slice(1, -1));
    return CUT;
  });
  if (notes.length === 0) return { solution, notes };
  const tidy = marked
    // Between lines: keep the larger line break around it (a paragraph stays a paragraph), at most one blank line.
    .replace(/(\n*)\u0000(\n*)/g, (_m, a: string, b: string) => {
      const n = Math.min(2, Math.max(a.length, b.length));
      return n ? "\n".repeat(n) : CUT;
    })
    // Inside a line: one space if text sits on both sides, else nothing.
    .replace(/(\S?)\u0000(\S?)/g, (_m, a: string, b: string) => (a && b ? `${a} ${b}` : a + b))
    .trim();
  return { solution: tidy.length ? tidy : null, notes };
}
