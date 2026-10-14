/**
 * The source tag on a bank question card: which of three kinds a question is,
 * in words a student reads at a glance. Spec: tests/question-source-tag.test.ts.
 *
 * Past papers are the product's promise, so only they carry a sitting and a
 * number, and only they get the brand colour on the card. A practice-set
 * question carries no number: "17" inside its set used to print as "[Q17]",
 * which reads as question 17 of a real paper.
 */
import { publicPyqNote, type PublicQuestionKind } from "./publicPyqNote";

export type SourceKind = "pyq" | "textbook" | "practice";
/**
 * `detail` is the full pyq_note when the label shows less of it. Only a
 * superadmin's card is ever handed a raw note, so only they get one; it
 * becomes the tag's hover text.
 */
export type SourceTag = { kind: SourceKind; label: string; detail?: string };

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
  // The same short form a student is sent (publicPyqNote is idempotent on it),
  // so a superadmin's raw 200-character board note never fills the tag.
  const note = isNda ? null : publicPyqNote(q.pyqNote, "pyq");
  if (note) parts.push(note);
  if (ref) parts.push(/^\d+$/.test(ref) ? `Q${ref}` : ref);
  const raw = q.pyqNote?.trim();
  const detail = !isNda && raw && raw !== note ? raw : undefined;
  return detail ? { kind: "pyq", label: parts.join(" · "), detail } : { kind: "pyq", label: parts.join(" · ") };
}
