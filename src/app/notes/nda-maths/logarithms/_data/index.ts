import type { SubtopicNote } from "@/app/notes/_types";
import { IDENTITIES_CHANGE_OF_BASE_SUMS_NOTE } from "./identities-change-of-base-sums";
import { SOLVING_EQUATIONS_APPLICATIONS_NOTE } from "./solving-equations-applications";

export { LOGARITHMS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/logarithms/[subtopicSlug].
 * Keys are the URL slugs; chapter.subtopicOrder owns rendering order. The
 * `log-` prefix keeps the subtopic slugs (and therefore the concept-tag keys)
 * globally unique.
 */
export const LOGARITHMS_NOTES: Record<string, SubtopicNote> = {
  "log-identities-change-of-base-sums": IDENTITIES_CHANGE_OF_BASE_SUMS_NOTE,
  "log-solving-equations-applications": SOLVING_EQUATIONS_APPLICATIONS_NOTE,
};

export const LOGARITHMS_SLUGS = Object.keys(LOGARITHMS_NOTES);
