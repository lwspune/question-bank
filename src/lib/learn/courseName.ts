import { getExamBySlug } from "@/lib/exam/examContext";
import { SUBJECT_NAMES } from "./subjects";

/** "MH HSC 12 Maths": the exam's name as PYQ Vault shows it, then the subject. */
export function courseName(course: { exam: string; subject: string }): string {
  const exam = getExamBySlug(course.exam)?.displayName ?? course.exam;
  return `${exam} ${SUBJECT_NAMES[course.subject] ?? course.subject}`;
}
