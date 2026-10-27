/**
 * A textbook question's own number. PURE. Spec: tests/board-clean-ref.test.ts.
 * Shared by the /board reader (BoardQuestionItem) and the Textbook Solutions
 * ebook, so the two cannot number a question differently.
 *
 * Trims the transcription's redundant leading section prefix so the book's own
 * number reads cleanly: "2.1 Ex 2.1 Q.3 (i)" -> "Q.3 (i)". Leaves already-clean
 * refs ("Misc I (11)", "Misc 2A Q.7") alone.
 */
export function cleanRef(ref: string): string {
  const trimmed = ref.replace(
    /^\d+\.\d+\s+(Solved\s+)?(Ex(ercise)?\.?\s*\d+(\.\d+)?|Feasible Ex\.?\d*|Graphical Example\s*\d*)\s+/i,
    ""
  );
  return trimmed.trim() || ref;
}
