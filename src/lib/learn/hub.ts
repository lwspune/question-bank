/**
 * The /learn hub's groups (2026-11-27): one per exam, in EXAM_REGISTRY's order, each with its
 * courses in subject order. And an exam's Learn link: straight to its course when it has one,
 * to its group on the hub when it has several (the hub is cached and the same for everyone, so an
 * anchor rather than a per-student page). Pure. Spec: tests/learn-hub.test.ts.
 */
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { courseHref, LEARN_HUB } from "./links";
import { SUBJECT_NAMES } from "./subjects";

const SUBJECT_ORDER = Object.keys(SUBJECT_NAMES);

export const examAnchor = (exam: string) => exam;

export type HubGroup<C> = { exam: string; name: string; courses: C[] };

export function groupCoursesByExam<C extends { exam: string; subject: string }>(courses: C[]): HubGroup<C>[] {
  const rank = (exam: string) => {
    const i = EXAM_REGISTRY.findIndex((e) => e.slug === exam);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  const subjectRank = (s: string) => {
    const i = SUBJECT_ORDER.indexOf(s);
    return i === -1 ? SUBJECT_ORDER.length : i;
  };
  const exams = [...new Set(courses.map((c) => c.exam))].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  return exams.map((exam) => ({
    exam,
    name: EXAM_REGISTRY.find((e) => e.slug === exam)?.displayName ?? exam,
    courses: courses.filter((c) => c.exam === exam).sort((a, b) => subjectRank(a.subject) - subjectRank(b.subject)),
  }));
}

/** The exam's Learn link for EXAM_REGISTRY.learnPath, given its course slugs. */
export function learnPathFor(exam: string, courses: string[]): string | undefined {
  if (courses.length === 0) return undefined;
  if (courses.length === 1) return courseHref(courses[0]);
  return `${LEARN_HUB}#${examAnchor(exam)}`;
}
