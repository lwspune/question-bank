import { getExamBySlug, isBoardExam } from "@/lib/exam/examContext";
import { SUBJECT_NAMES } from "./subjects";

/** "MH HSC 12 Maths": the exam's name as PYQ Vault shows it, then the subject. */
export function courseName(course: { exam: string; subject: string }): string {
  const exam = getExamBySlug(course.exam)?.displayName ?? course.exam;
  return `${exam} ${SUBJECT_NAMES[course.subject] ?? course.subject}`;
}

/**
 * The school years a course's chapters are taught in: "Class 12" for a board course, "Class 11
 * and 12" for NDA's. Read from the chapters: the course row holds only the highest year.
 */
export function courseLevel(standards: number[]): string | null {
  const years = [...new Set(standards)].sort((a, b) => a - b);
  if (years.length === 0) return null;
  if (years.length === 1) return `Class ${years[0]}`;
  return `Class ${years.slice(0, -1).join(", ")} and ${years[years.length - 1]}`;
}

/** The chapter page's past-questions link: a board's papers are board questions; an entrance exam names itself. */
export function pastQuestionsLabel(exam: string): string {
  if (isBoardExam(exam)) return "Past board questions";
  return `Past ${getExamBySlug(exam)?.displayName ?? exam} questions`;
}
