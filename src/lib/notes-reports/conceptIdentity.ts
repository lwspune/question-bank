import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

/**
 * Full identity of a /notes concept, resolved from the globally-unique
 * (subtopicSlug, conceptSlug) pair. Carries everything `createConceptReport`
 * needs to (a) resolve the owning org via the subtopic's bank questions and
 * (b) denormalize a self-describing breadcrumb + route segments onto the
 * report row for triage.
 *
 * Subtopic slugs are globally unique across all chapters (the notes-lint
 * invariant), so the (subtopicSlug, conceptSlug) pair is a stable global key.
 */
export type ConceptIdentity = {
  examName: string;
  subjectName: string;
  subjectRoute: string;
  chapterSlug: string;
  chapterName: string;
  subtopicSlug: string;
  subtopicName: string;
  conceptSlug: string;
  conceptName: string;
};

const key = (subtopicSlug: string, conceptSlug: string) =>
  `${subtopicSlug}::${conceptSlug}`;

const REGISTRY: Map<string, ConceptIdentity> = new Map();

for (const chapter of NOTES_CHAPTERS) {
  for (const [subtopicSlug, note] of Object.entries(chapter.notes)) {
    for (const concept of note.concepts) {
      REGISTRY.set(key(subtopicSlug, concept.slug), {
        examName: chapter.examName,
        subjectName: chapter.subjectName,
        subjectRoute: chapter.subjectRoute,
        chapterSlug: chapter.chapterSlug,
        chapterName: chapter.chapter.chapterName,
        subtopicSlug,
        subtopicName: note.subtopicName,
        conceptSlug: concept.slug,
        conceptName: concept.name,
      });
    }
  }
}

/**
 * Resolve a concept's full identity from its slug pair. Returns null when the
 * pair doesn't match any shipped concept — the create helper maps that to
 * `unknown_concept` so a tampered request can't insert an arbitrary report.
 */
export function getConceptIdentity(
  subtopicSlug: string,
  conceptSlug: string
): ConceptIdentity | null {
  return REGISTRY.get(key(subtopicSlug, conceptSlug)) ?? null;
}
