/**
 * Cross-exam navigation model for /notes, derived entirely from the
 * NOTES_CHAPTERS registry (through its generated nav index —
 * `npm run notes:nav-index`) + EXAM_REGISTRY. The /notes top index and the
 * per-exam hubs (/notes/<examSlug>) render from these groupings, so adding a
 * new exam's notes is just a registry entry — no new hand-written hub page.
 *
 * Pure (no DB / no React); unit-tested in tests/notes-nav.test.ts.
 */

import { EXAM_REGISTRY, PYQVAULT_EXAMS, getExamBySlug, type ExamEntry, type ExamSlug } from "@/lib/exam/examContext";
// The generated index, NOT the registry: this module is on every page through
// AppHeader, and the registry imports the whole notes corpus. See notesNavIndex.ts.
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";

export type NotesSubjectGroup = {
  /** URL segment, e.g. "nda-biology" → /notes/nda-biology. */
  subjectRoute: string;
  /** Display label, e.g. "NDA Biology". */
  subjectDisplay: string;
  chapterCount: number;
  subtopicCount: number;
};

export type NotesExamGroup = {
  slug: ExamSlug;
  /** Short label, e.g. "NDA". */
  displayName: string;
  /** Canonical exam name from the DB / registry, e.g. "NDA". */
  examName: string;
  subjects: NotesSubjectGroup[];
};

/** Build the subject groups for a single exam (registration order preserved). */
function subjectsForExam(examName: string): NotesSubjectGroup[] {
  const bySubject = new Map<string, NotesSubjectGroup>();
  for (const c of NOTES_NAV_INDEX) {
    if (c.examName !== examName) continue;
    const existing = bySubject.get(c.subjectRoute);
    const subtopics = c.subtopicCount;
    if (existing) {
      existing.chapterCount += 1;
      existing.subtopicCount += subtopics;
    } else {
      bySubject.set(c.subjectRoute, {
        subjectRoute: c.subjectRoute,
        subjectDisplay: c.subjectDisplay,
        chapterCount: 1,
        subtopicCount: subtopics,
      });
    }
  }
  return [...bySubject.values()];
}

/**
 * All exams that have at least one notes subject, in registry order. Used by
 * the /notes cross-exam index, so it lists www's exams unless given another
 * registry (the full EXAM_REGISTRY when prerendering every exam's hub).
 */
export function getNotesExamGroups(registry: readonly ExamEntry[] = PYQVAULT_EXAMS): NotesExamGroup[] {
  return registry.map(toExamGroup).filter((g) => g.subjects.length > 0);
}

/**
 * One exam's group by slug. Returns the entry even when it has zero notes
 * subjects (so /notes/<slug> can show an honest "coming soon" instead of
 * 404). Returns null only for an unknown slug.
 */
export function getNotesExamGroup(slug: string): NotesExamGroup | null {
  const entry = EXAM_REGISTRY.find((e) => e.slug === slug);
  return entry ? toExamGroup(entry) : null;
}

function toExamGroup(entry: ExamEntry): NotesExamGroup {
  return {
    slug: entry.slug,
    displayName: entry.displayName,
    examName: entry.examName,
    subjects: subjectsForExam(entry.examName),
  };
}

/** Slugs of exams that should be statically pre-rendered for /notes/[examSlug]. */
export function notesExamSlugs(): ExamSlug[] {
  return EXAM_REGISTRY.map((e) => e.slug);
}

/**
 * The exam list beside a /notes/<exam> hub: PYQ Vault's exams on www, and on an
 * international exam's hub (intl.pyqvault.com, 2026-10-30) only the
 * international ones, with the intl home as "All exams". Chosen by the exam,
 * never by the host, so the hub stays cacheable.
 */
export function notesExamSideNav(currentExamSlug: string): { href: string; label: string }[] {
  const intl = getExamBySlug(currentExamSlug)?.site === "intl";
  const registry = intl ? EXAM_REGISTRY.filter((e) => e.site === "intl") : PYQVAULT_EXAMS;
  return [
    { href: intl ? "/" : "/notes", label: "All exams" },
    ...getNotesExamGroups(registry).map((g) => ({ href: `/notes/${g.slug}`, label: g.displayName })),
  ];
}
