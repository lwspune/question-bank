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

  // The "Q" prefix is for a PYQ paper's BARE NUMERAL ("42" → "Q42"), which is
  // how a teacher cross-references the printed paper. Every textbook and
  // worksheet corpus instead stores a DESCRIPTIVE ref, and prefixing those
  // yields "QEx Q.2 (ii)", "QMisc I (iv)", "QLvl I-CW Q1" or
  // "QA relation between length of an arc…" — 22,368 PUBLIC rows across 8 exams.
  // So the prefix is conditional: a descriptive ref already names itself and is
  // rendered verbatim. Deliberately NOT a blanket removal — "Q42" is correct and
  // wanted for the PYQ corpora, and the tests pin both directions.
  if (p.questionNumber) {
    const isBareNumeral = /^\d+$/.test(p.questionNumber.trim());
    parts.push(isBareNumeral ? `Q${p.questionNumber}` : p.questionNumber);
  }

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
