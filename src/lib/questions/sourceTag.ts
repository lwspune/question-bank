/**
 * The source tag on a bank question card: which of three kinds a question is,
 * in words a student reads at a glance. Spec: tests/question-source-tag.test.ts.
 *
 * Past papers are the product's promise, so only they carry a sitting and a
 * number, and only they get the brand colour on the card. A practice-set
 * question carries no number: "17" inside its set used to print as "[Q17]",
 * which reads as question 17 of a real paper.
 */
import type { PublicQuestionKind } from "./publicPyqNote";

export type SourceKind = "pyq" | "textbook" | "practice";
export type SourceTag = { kind: SourceKind; label: string };

export type SourceTagInput = {
  questionKind?: PublicQuestionKind;
  exam: { name: string };
  pyqYear: number | null;
  pyqMonth: string | null;
  pyqNote: string | null;
  questionNumber: string | null;
};

/** The textbook a board exam's exercises come from, by exam name. */
function textbookFor(examName: string): string | null {
  if (examName.startsWith("CBSE")) return "NCERT";
  if (examName.startsWith("Maharashtra")) return "Balbharati";
  return null;
}

export function sourceTag(q: SourceTagInput): SourceTag {
  const ref = q.questionNumber?.trim() || null;

  if (q.questionKind === "practice") {
    const book = textbookFor(q.exam.name);
    if (book) return { kind: "textbook", label: ref ? `${book} textbook · ${ref}` : `${book} textbook` };
    return { kind: "practice", label: "Practice question" };
  }

  // Same disambiguation as formatProvenance: NDA by month, others by pyq_note.
  const parts = [q.exam.name];
  const isNda = q.exam.name === "NDA";
  if (isNda && q.pyqMonth && q.pyqYear !== null) parts.push(`${q.pyqMonth} ${q.pyqYear}`);
  else if (q.pyqYear !== null) parts.push(String(q.pyqYear));
  if (!isNda && q.pyqNote) parts.push(q.pyqNote);
  if (ref) parts.push(/^\d+$/.test(ref) ? `Q${ref}` : ref);
  return { kind: "pyq", label: parts.join(" · ") };
}
