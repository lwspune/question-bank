/**
 * Cross-exam navigation model for the /guide tree, derived from EXAM_REGISTRY.
 *
 * The /guide index and the per-exam hubs (/guide/nda, /guide/mht-cet) render
 * the SAME rail — an exam switcher — exactly as /notes and /notes/<examSlug>
 * do. Before 2026-08-22 those three pages were the only ones in either tree
 * with no side nav at all: the 11 subject guides had one (their own routes),
 * /notes had one, and the guide index/hubs had none.
 *
 * DELIBERATELY THINNER THAN notesNav.ts. That module also groups SUBJECTS,
 * because /notes derives everything from the NOTES_CHAPTERS registry. Guides
 * have no such registry — each hub hardcodes its own list of subject guides
 * (NDA 10 entries, MHT-CET 1) — so this only models the exam level, which is
 * all the rail needs. If a hub ever has to become data-driven, or the rail has
 * to show subjects, that missing registry is the piece to build first.
 *
 * Pure (no DB / no React); unit-tested in tests/guides-nav.test.ts.
 */

import { EXAM_REGISTRY, type ExamSlug } from "@/lib/exam/examContext";

export type GuideExamGroup = {
  slug: ExamSlug;
  /** Short label for the rail, e.g. "NDA". */
  displayName: string;
  /** The exam's /guide subtree — non-null by construction here. */
  guidesPath: string;
};

/** Every exam with a shipped /guide subtree, in EXAM_REGISTRY order. */
export function getGuideExamGroups(): GuideExamGroup[] {
  return EXAM_REGISTRY.filter((e) => e.guidesPath !== null).map((e) => ({
    slug: e.slug,
    displayName: e.displayName,
    guidesPath: e.guidesPath as string,
  }));
}

/**
 * The rail itself: the index first, then one entry per guide-bearing exam.
 *
 * The index MUST lead — GuideSideNav defaults its `landingHref` to the first
 * item and exact-matches that one, so any other order leaves "All exams"
 * highlighted on every per-exam hub.
 */
export function buildGuideSideNav(): { href: string; label: string }[] {
  return [
    { href: "/guide", label: "All exams" },
    ...getGuideExamGroups().map((g) => ({
      href: g.guidesPath,
      label: g.displayName,
    })),
  ];
}
