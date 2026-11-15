import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_BO_SR_GAMETOPHYTES_NOTE } from "./gametophytes";
import { NEET_BO_SR_POLLINATION_NOTE } from "./pollination";
import { NEET_BO_SR_FERTILISATION_NOTE } from "./fertilisation";

export { NEET_BO_SR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-botany/sexual-reproduction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nbo-sr-` here and `nbosr-` on concept slugs.
 *
 * NCERT XII ch.1: gametophytes, pollination, fertilisation, seed and fruit.
 */
export const NEET_BO_SR_NOTES: Record<string, SubtopicNote> = {
  "nbo-sr-gametophytes": NEET_BO_SR_GAMETOPHYTES_NOTE,
  "nbo-sr-pollination": NEET_BO_SR_POLLINATION_NOTE,
  "nbo-sr-fertilisation": NEET_BO_SR_FERTILISATION_NOTE,
};

export const NEET_BO_SR_SLUGS = Object.keys(NEET_BO_SR_NOTES);
