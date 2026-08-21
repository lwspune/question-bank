import { NOTES_CHAPTERS } from "./chapters";

/**
 * Server-side authoritative map from a question's taxonomy position →
 * (subtopic slug + concept list), for every chapter that has notes content.
 * Auto-derived from `NOTES_CHAPTERS` — adding a chapter to that registry is
 * enough; this module updates automatically.
 *
 * Used by the /questions/[id]/edit route and admin UI to validate concept tags
 * against the question's actual subtopic, by `applyEdit`, and by the /browse
 * backlink chip.
 *
 * KEYED BY (exam, subject, chapter, subtopic) SINCE 2026-08-21. It was keyed
 * on the bare subtopic NAME with silent last-wins, and that shipped a live
 * 404: NDA Maths and MHT-CET Maths both have a subtopic named exactly
 * "Integration by Parts", MHT-CET registers later, so an NDA question resolved
 * to MHT-CET's `integration-by-parts` slug and the chip pointed at
 * /notes/nda-maths/indefinite-integration/integration-by-parts — a route that
 * does not exist (NDA's slug is `ii-by-parts`).
 *
 * CHAPTER is part of the key, not just (exam, subject): NDA Chemistry has a
 * subtopic named "Physical vs Chemical Changes" in BOTH "Matter and Its
 * States" and "Chemical Reactions". Without the chapter one of the two is
 * permanently unreachable.
 *
 * Note this is a distinct axis from the documented "notes subtopic SLUGS are
 * globally unique" rule — the slugs here genuinely are unique
 * (`ii-by-parts` != `integration-by-parts`). It is the NAMES that repeat, and
 * nothing guarded them.
 */
export type ConceptOption = {
  slug: string;
  name: string;
};

export type SubtopicNotesEntry = {
  subtopicSlug: string;
  /** Concept slugs + display names, in the order they appear in the note. */
  concepts: ConceptOption[];
};

/** Identifies which chapter's subtopic is being asked for. */
export type NotesChapterScope = {
  /** Canonical DB exam name, e.g. "NDA". */
  examName: string;
  /** Canonical DB subject name, e.g. "Mathematics". */
  subjectName: string;
  /** Canonical DB chapter name, e.g. "Indefinite Integration". */
  chapterName: string;
};

const subtopicKey = (
  scope: NotesChapterScope,
  subtopicName: string
): string =>
  `${scope.examName}::${scope.subjectName}::${scope.chapterName}::${subtopicName}`;

const REGISTRY: Map<string, SubtopicNotesEntry> = new Map();

for (const chapter of NOTES_CHAPTERS) {
  const scope: NotesChapterScope = {
    examName: chapter.examName,
    subjectName: chapter.subjectName,
    chapterName: chapter.chapter.chapterName,
  };
  for (const [subtopicSlug, note] of Object.entries(chapter.notes)) {
    REGISTRY.set(subtopicKey(scope, note.subtopicName), {
      subtopicSlug,
      concepts: note.concepts.map((c) => ({ slug: c.slug, name: c.name })),
    });
  }
}

/**
 * Look up the slug + concept list for a subtopic, within the chapter that owns
 * it. Returns null when that subtopic doesn't yet have notes content.
 */
export function getSubtopicNotesEntry(
  scope: NotesChapterScope,
  subtopicName: string
): SubtopicNotesEntry | null {
  return REGISTRY.get(subtopicKey(scope, subtopicName)) ?? null;
}

/**
 * Validate a (subtopicSlug, conceptSlug) pair against the registry.
 * Returns null if valid, or an error reason string.
 */
export function validateConceptTag(
  scope: NotesChapterScope,
  subtopicName: string,
  subtopicSlug: string,
  conceptSlug: string
): string | null {
  const entry = REGISTRY.get(subtopicKey(scope, subtopicName));
  if (!entry) {
    return `subtopic "${subtopicName}" has no notes content — concept tagging not yet enabled`;
  }
  if (entry.subtopicSlug !== subtopicSlug) {
    return `subtopicSlug "${subtopicSlug}" does not match the question's subtopic (expected "${entry.subtopicSlug}")`;
  }
  const concept = entry.concepts.find((c) => c.slug === conceptSlug);
  if (!concept) {
    return `concept "${conceptSlug}" is not defined for subtopic "${subtopicName}"`;
  }
  return null;
}
