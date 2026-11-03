import { getExamBySlug } from "@/lib/exam/examContext";

export type ExamRobots = { index: boolean; follow: boolean; noimageindex: boolean };

/**
 * Page-level robots for an exam's question pages: indexed and followed as usual, but with
 * `noimageindex` when the exam's registry entry sets `noImageIndex`, so its figures stay out of
 * image search. Undefined otherwise, which leaves the root layout's robots in force.
 * Spec: tests/exam-robots.test.ts.
 */
export function examRobots(examSlug: string): ExamRobots | undefined {
  if (!getExamBySlug(examSlug)?.noImageIndex) return undefined;
  return { index: true, follow: true, noimageindex: true };
}
