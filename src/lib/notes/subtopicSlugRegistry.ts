import { STATISTICS_NOTES } from "@/app/notes/nda-maths/statistics/_data";
import { VECTORS_NOTES } from "@/app/notes/nda-maths/vectors/_data";

/**
 * Server-side authoritative map from canonical DB subtopic name → slug for
 * every chapter that has notes content. As new chapters ship, append one
 * entry per chapter — that's the only place the registry needs to grow.
 *
 * Used by the /questions/[id]/edit route and admin UI to validate concept
 * tags against the question's actual subtopic, and to find the concept list
 * to render in the tagging multi-select.
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

/** Map keyed by exact DB subtopic name. */
const REGISTRY: Map<string, SubtopicNotesEntry> = new Map();

for (const [subtopicSlug, note] of Object.entries(STATISTICS_NOTES)) {
  REGISTRY.set(note.subtopicName, {
    subtopicSlug,
    concepts: note.concepts.map((c) => ({ slug: c.slug, name: c.name })),
  });
}

for (const [subtopicSlug, note] of Object.entries(VECTORS_NOTES)) {
  REGISTRY.set(note.subtopicName, {
    subtopicSlug,
    concepts: note.concepts.map((c) => ({ slug: c.slug, name: c.name })),
  });
}

/**
 * Look up the slug + concept list for a subtopic by its canonical DB name.
 * Returns null when the subtopic doesn't yet have notes content.
 */
export function getSubtopicNotesEntry(
  subtopicName: string
): SubtopicNotesEntry | null {
  return REGISTRY.get(subtopicName) ?? null;
}

/**
 * Validate a (subtopicSlug, conceptSlug) pair against the registry.
 * Returns null if valid, or an error reason string.
 */
export function validateConceptTag(
  subtopicName: string,
  subtopicSlug: string,
  conceptSlug: string
): string | null {
  const entry = REGISTRY.get(subtopicName);
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
