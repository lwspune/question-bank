import type { SubtopicNote } from "@/app/notes/_types";
import { CORE_TECHNIQUES_NOTE } from "./core-techniques";
import { PARAMETRIC_IMPLICIT_HIGHER_NOTE } from "./parametric-implicit-higher";
import { DIFFERENTIABILITY_NOTE } from "./differentiability";

export { DIFFERENTIATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/differentiation/[subtopicSlug].
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags (globally unique across all chapters — `diff-` prefixed).
 * Order matches the chapter's teaching order (subtopicOrder).
 */
export const DIFFERENTIATION_NOTES: Record<string, SubtopicNote> = {
  "diff-core-techniques": CORE_TECHNIQUES_NOTE,
  "diff-parametric-implicit-higher": PARAMETRIC_IMPLICIT_HIGHER_NOTE,
  "diff-differentiability": DIFFERENTIABILITY_NOTE,
};

export const DIFFERENTIATION_SLUGS = Object.keys(DIFFERENTIATION_NOTES);
