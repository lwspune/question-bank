/**
 * IMAT teaching notes: the niche site's own registry.
 *
 * The chapters use the /notes data shapes, so the shared notes components
 * render them, but they are registered HERE and never in NOTES_CHAPTERS:
 * everything NOTES_CHAPTERS feeds (the PYQ Vault nav, sitemap, /notes index,
 * notes-lint) must never show IMAT (NICHE_SITES_SPEC.md). Today only the
 * superadmin preview at /dashboard/imat-notes reads this; the IMAT site's
 * /notes pages will read it once that site exists.
 *
 * Differences from PYQ Vault notes (pinned by tests/imat-notes.test.ts):
 * no featured past question (every IMAT row is PRIVATE, and 2011-2022 can
 * never be published), and every concept ends in a five-option self-check
 * written the way IMAT asks.
 *
 * Adding a chapter: write `<subject>/<chapter>/` (chapter.ts, one file per
 * page, index.ts), then append one entry below.
 */
import type { NotesChapterRegistration } from "@/lib/notes/chapters";
import type { ChapterNote, SubtopicNote } from "@/app/notes/_types";
import {
  IMAT_PHY_FLUIDS_CHAPTER,
  IMAT_PHY_FLUIDS_NOTES,
  IMAT_PHY_FLUIDS_SLUGS,
} from "./physics/fluids";

export type ImatNotesSubject = {
  /** URL segment, e.g. "imat-biology". */
  subjectRoute: string;
  /** The `subjects.name` under the IMAT exam. */
  subjectName: string;
  /** Display name, e.g. "IMAT Biology". */
  subjectDisplay: string;
};

export const IMAT_NOTES_SUBJECTS: readonly ImatNotesSubject[] = [
  { subjectRoute: "imat-biology", subjectName: "Biology", subjectDisplay: "IMAT Biology" },
  { subjectRoute: "imat-chemistry", subjectName: "Chemistry", subjectDisplay: "IMAT Chemistry" },
  { subjectRoute: "imat-physics", subjectName: "Physics", subjectDisplay: "IMAT Physics" },
  { subjectRoute: "imat-maths", subjectName: "Mathematics", subjectDisplay: "IMAT Mathematics" },
  {
    subjectRoute: "imat-logic",
    subjectName: "Logical Reasoning and Problem Solving",
    subjectDisplay: "IMAT Logical Reasoning",
  },
  {
    subjectRoute: "imat-reading",
    subjectName: "Reading Skills and General Knowledge",
    subjectDisplay: "IMAT Reading Skills and General Knowledge",
  },
];

function entry(
  subjectRoute: string,
  chapterSlug: string,
  chapter: ChapterNote,
  notes: Record<string, SubtopicNote>,
  slugs: string[]
): NotesChapterRegistration {
  const subject = IMAT_NOTES_SUBJECTS.find((s) => s.subjectRoute === subjectRoute);
  if (!subject) throw new Error(`Unknown IMAT subject route: ${subjectRoute}`);
  return {
    examName: "IMAT",
    subjectName: subject.subjectName,
    subjectRoute,
    subjectDisplay: subject.subjectDisplay,
    chapterSlug,
    chipLabel: `${chapter.chapterName} notes`,
    chapter,
    notes,
    slugs,
  };
}

export const IMAT_NOTES_CHAPTERS: readonly NotesChapterRegistration[] = [
  // Physics
  entry("imat-physics", "fluids", IMAT_PHY_FLUIDS_CHAPTER, IMAT_PHY_FLUIDS_NOTES, IMAT_PHY_FLUIDS_SLUGS),
];

export function getImatSubject(subjectRoute: string): ImatNotesSubject | undefined {
  return IMAT_NOTES_SUBJECTS.find((s) => s.subjectRoute === subjectRoute);
}

export function getImatChapter(
  subjectRoute: string,
  chapterSlug: string
): NotesChapterRegistration | undefined {
  return IMAT_NOTES_CHAPTERS.find(
    (c) => c.subjectRoute === subjectRoute && c.chapterSlug === chapterSlug
  );
}

export function imatChaptersOf(subjectRoute: string): NotesChapterRegistration[] {
  return IMAT_NOTES_CHAPTERS.filter((c) => c.subjectRoute === subjectRoute);
}
