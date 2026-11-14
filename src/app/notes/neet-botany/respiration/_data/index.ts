import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_RS_GLYCOLYSIS_NOTE } from "./glycolysis";
import { NEET_BO_RS_KREBS_NOTE } from "./krebs";
import { NEET_BO_RS_YIELD_NOTE } from "./yield";

export { NEET_BO_RS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/respiration/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-rs-` here and `nbors-` on concept slugs.
 *
 * NCERT XI ch.14: glycolysis, fermentation, Krebs cycle, ETS, ATP yield, RQ.
 */
export const NEET_BO_RS_NOTES: Record<string, SubtopicNote> = {
  "nbo-rs-glycolysis": NEET_BO_RS_GLYCOLYSIS_NOTE,
  "nbo-rs-krebs": NEET_BO_RS_KREBS_NOTE,
  "nbo-rs-yield": NEET_BO_RS_YIELD_NOTE,
};

export const NEET_BO_RS_SLUGS = Object.keys(NEET_BO_RS_NOTES);
