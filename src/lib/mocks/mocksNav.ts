/**
 * Cross-exam navigation model for /mock, mirroring notesNav.ts. Derived from
 * EXAM_REGISTRY's `hasMocks` flag, so the left-rail exam switcher (All exams ·
 * NDA · NEET …) and the statically pre-rendered per-exam routes stay in sync
 * with the registry — a new exam's mocks surface in nav just by flipping
 * `hasMocks`, no hand-edited nav.
 *
 * Pure (no DB / no React); unit-tested in tests/mocks-nav.test.ts. The mock
 * DATA still comes from the DB (getPublishedMocks); this only shapes the nav.
 */

import { EXAM_REGISTRY, type ExamSlug } from "@/lib/exam/examContext";

export type MockExamNav = {
  slug: ExamSlug;
  /** Short label for the rail, e.g. "NDA". */
  displayName: string;
  /** Canonical exam name from the DB / registry, e.g. "NDA" — used to filter
   *  published mocks for the per-exam page. */
  examName: string;
};

/** Exams that have published mock tests (`hasMocks`), in EXAM_REGISTRY order. */
export function getMockExams(): MockExamNav[] {
  return EXAM_REGISTRY.filter((e) => e.hasMocks === true).map((e) => ({
    slug: e.slug,
    displayName: e.displayName,
    examName: e.examName,
  }));
}

/** One mock exam by slug; null for an unknown slug OR an exam with no mocks. */
export function getMockExam(slug: string): MockExamNav | null {
  const e = EXAM_REGISTRY.find((x) => x.slug === slug && x.hasMocks === true);
  return e ? { slug: e.slug, displayName: e.displayName, examName: e.examName } : null;
}

/** Left-rail items for every /mock surface: "All exams" + one per mock-exam. */
export function mockSideNav(): { href: string; label: string }[] {
  return [
    { href: "/mock", label: "All exams" },
    ...getMockExams().map((e) => ({ href: `/mock/exam/${e.slug}`, label: e.displayName })),
  ];
}

/** Slugs to statically pre-render for /mock/exam/[examSlug]. */
export function mockExamSlugs(): ExamSlug[] {
  return getMockExams().map((e) => e.slug);
}

/**
 * The mock exams as prose, for /mock's indexed <title> + description:
 * "NDA", "NDA & NEET", "NDA, CDS & NEET". Derived rather than hand-written
 * because the hardcoded "NDA & NEET" copy went stale the moment a third exam
 * shipped — an indexed page naming two exams while serving three. Registry
 * order, so the output is deterministic.
 */
export function mockExamNames(): string {
  const names = getMockExams().map((e) => e.displayName);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}
