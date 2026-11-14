import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_AN_TISSUES_NOTE } from "./tissues";
import { NEET_BO_AN_ORGANS_NOTE } from "./organs";
import { NEET_BO_AN_SECONDARY_NOTE } from "./secondary";

export { NEET_BO_AN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/anatomy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-an-` here and `nboan-` on concept slugs.
 *
 * NCERT XI ch.6: tissues, tissue systems, secondary growth.
 */
export const NEET_BO_AN_NOTES: Record<string, SubtopicNote> = {
  "nbo-an-tissues": NEET_BO_AN_TISSUES_NOTE,
  "nbo-an-organs": NEET_BO_AN_ORGANS_NOTE,
  "nbo-an-secondary": NEET_BO_AN_SECONDARY_NOTE,
};

export const NEET_BO_AN_SLUGS = Object.keys(NEET_BO_AN_NOTES);
