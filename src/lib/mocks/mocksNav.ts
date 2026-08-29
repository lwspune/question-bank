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
// Type-only: keeps this module pure (no DB import at runtime).
import type { MockListItem } from "@/lib/mocks/query";

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

/** One exam's card on the /mock picker. Every number is DERIVED from the rows
 *  /mock already fetches, so a new sitting updates the card by itself. */
export type MockExamCard = MockExamNav & {
  /** Published mocks for this exam. 0 renders as "coming soon". */
  count: number;
  /** Oldest / newest sitting; both 0 when nothing is published yet. */
  firstYear: number;
  lastYear: number;
  /** Distinct papers a sitting is made of — NDA 2 (Maths + GAT), CDS/NEET 1. */
  paperCount: number;
};

/**
 * The /mock exam picker's model, in EXAM_REGISTRY order.
 *
 * /mock used to render every published mock as one flat exam -> year -> card
 * list — 63 cards under 29 headings, ~7 screens on desktop and ~11 on mobile,
 * with the exam filter living only in a rail that is a Sheet below `lg`. Its
 * ordering was also an accident: it sorted on newest year and fell through to
 * a localeCompare tiebreak, and since all three exams have a 2026 sitting the
 * tiebreak decided the page. That put CDS (6 attempts) above NDA (252) and
 * disagreed with the rail beside it, which has always been registry order.
 *
 * So this is a picker, matching /notes' index and /guide's picker — /mock was
 * the only cross-exam surface that dumped every leaf. Per-exam listing already
 * lived at /mock/exam/[slug], which until now was linked from nowhere.
 *
 * Rows whose examName is not a mock-exam are IGNORED rather than dropped
 * silently into a void: tests/mocks-registry.test.ts is the standing probe
 * that stops such a row existing, because the flat list used to render
 * whatever the DB returned and a picker cannot.
 */
export function buildMockExamCards(mocks: MockListItem[]): MockExamCard[] {
  return getMockExams().map((exam) => {
    const mine = mocks.filter((m) => m.examName === exam.examName);
    const years = mine.map((m) => m.pyqYear);
    return {
      ...exam,
      count: mine.length,
      firstYear: years.length ? Math.min(...years) : 0,
      lastYear: years.length ? Math.max(...years) : 0,
      paperCount: new Set(mine.map((m) => m.paperCode)).size,
    };
  });
}
