/**
 * The exam and subject a download was for, read off the questions exported
 * (migration 0155). Null means mixed, never a guess at the majority. A subject
 * row belongs to one exam, so the subject is named only alongside one exam.
 */
type Tagged = { exam: { id: string }; subject: { id: string } };

export function exportTaxonomy(questions: readonly Tagged[]): {
  examId: string | null;
  subjectId: string | null;
} {
  const exams = new Set(questions.map((q) => q.exam.id));
  const subjects = new Set(questions.map((q) => q.subject.id));
  const examId = exams.size === 1 ? [...exams][0] : null;
  const subjectId = examId && subjects.size === 1 ? [...subjects][0] : null;
  return { examId, subjectId };
}
