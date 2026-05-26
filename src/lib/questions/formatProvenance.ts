/**
 * Compose the provenance bracket text for a question card —
 * `Q{num} · {disambiguator} · {year}` — that helps teachers
 * cross-reference a bank question against the source PYQ paper.
 *
 * Caller wraps the returned string in `[ ... ]` if rendered as a chip;
 * the helper itself stays plain so it composes elsewhere too.
 */
export type ProvenanceInput = {
  examName: string | null;
  questionNumber: string | null;
  pyqYear: number | null;
  pyqMonth: string | null;
  pyqNote: string | null;
};

export function formatProvenance(p: ProvenanceInput): string | null {
  const parts: string[] = [];

  if (p.questionNumber) parts.push(`Q${p.questionNumber}`);

  // NDA: month is the disambiguator (Apr⇒NDA 1, Sep⇒NDA 2, enforced
  // by the 2026-05-26 metadata cleanup). pyq_note is structurally
  // redundant for NDA so we drop it.
  // Anything else (MHT-CET today; future JEE/CUET/etc.): pyq_note,
  // which carries day+shift (e.g. "10th May Shift 1" — load-bearing
  // when one month has 14 distinct papers).
  const disambiguator = p.examName === "NDA" ? p.pyqMonth : p.pyqNote;
  if (disambiguator) parts.push(disambiguator);

  if (p.pyqYear !== null) parts.push(String(p.pyqYear));

  return parts.length > 0 ? parts.join(" · ") : null;
}
