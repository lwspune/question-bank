import type { SubtopicNote } from "@/app/notes/_types";
import { STANDARD_FORMS_NOTE } from "./standard-forms";
import { SUBSTITUTION_NOTE } from "./substitution";
import { BY_PARTS_NOTE } from "./by-parts";
import { PARTIAL_FRACTIONS_NOTE } from "./partial-fractions";

export { NDA_INDEFINITE_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/indefinite-integration/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Slugs carry the `ii-` prefix so they stay globally unique against the
 * MHT-CET Indefinite Integration chapter (which owns `substitution`,
 * `integration-by-parts`, etc.) — concept-tag keys are global.
 */
export const NDA_INDEFINITE_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "ii-standard-forms": STANDARD_FORMS_NOTE,
  "ii-substitution": SUBSTITUTION_NOTE,
  "ii-by-parts": BY_PARTS_NOTE,
  "ii-partial-fractions": PARTIAL_FRACTIONS_NOTE,
};

export const NDA_INDEFINITE_INTEGRATION_SLUGS = Object.keys(
  NDA_INDEFINITE_INTEGRATION_NOTES
);
