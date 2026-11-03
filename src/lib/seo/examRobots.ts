import type { Metadata } from "next";
import { getExamBySlug } from "@/lib/exam/examContext";

/**
 * Page-level robots for an exam's question pages: indexed and followed as usual, but with
 * `noimageindex` when the exam's registry entry sets `noImageIndex`, so its figures stay out of
 * image search. Undefined otherwise, which leaves the root layout's robots in force.
 * Spec: tests/exam-robots.test.ts.
 */
export function examRobots(examSlug: string): Metadata["robots"] | undefined {
  if (!getExamBySlug(examSlug)?.noImageIndex) return undefined;
  return { index: true, follow: true, noimageindex: true };
}
