import type { SubtopicNote } from "@/app/notes/_types";
import { FTC_NOTE } from "./ftc";
import { PROPERTIES_NOTE } from "./properties";
import { PIECEWISE_NOTE } from "./piecewise";
import { AREA_NOTE } from "./area";
import { FUNCTION_CONDITIONS_NOTE } from "./function-conditions";

export { DEFINITE_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/definite-integration/[subtopicSlug].
 * Keys are GLOBALLY-unique (`defint-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order
 * (taught FTC → properties → piecewise → area → function-conditions, not the
 * bank's count order which leads with Properties).
 */
export const DEFINITE_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "defint-ftc": FTC_NOTE,
  "defint-properties": PROPERTIES_NOTE,
  "defint-piecewise": PIECEWISE_NOTE,
  "defint-area": AREA_NOTE,
  "defint-function-conditions": FUNCTION_CONDITIONS_NOTE,
};

export const DEFINITE_INTEGRATION_SLUGS = Object.keys(DEFINITE_INTEGRATION_NOTES);
