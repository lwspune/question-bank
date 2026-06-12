import type { SubtopicNote } from "@/app/notes/_types";
import { ECOSYSTEMS_NOTE } from "./ecosystems";
import { ENVIRONMENT_BIODIVERSITY_NOTE } from "./environment-biodiversity";

export { ECOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/ecology-and-environment/[subtopicSlug].
 * Keys are GLOBALLY-unique (`eco-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const ECOLOGY_NOTES: Record<string, SubtopicNote> = {
  "eco-ecosystems": ECOSYSTEMS_NOTE,
  "eco-environment-biodiversity": ENVIRONMENT_BIODIVERSITY_NOTE,
};

export const ECOLOGY_SLUGS = Object.keys(ECOLOGY_NOTES);
