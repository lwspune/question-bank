import type { SubtopicNote } from "@/app/notes/_types";
import { HEREDITY_DNA_NOTE } from "./heredity-dna";
import { EVOLUTION_NOTE } from "./evolution";

export { GENETICS_EVOLUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/genetics-and-evolution/[subtopicSlug].
 * Keys are GLOBALLY-unique (`gen-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const GENETICS_EVOLUTION_NOTES: Record<string, SubtopicNote> = {
  "gen-heredity-dna": HEREDITY_DNA_NOTE,
  "gen-evolution": EVOLUTION_NOTE,
};

export const GENETICS_EVOLUTION_SLUGS = Object.keys(GENETICS_EVOLUTION_NOTES);
