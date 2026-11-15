import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_RH_CONTRACEPTION_NOTE } from "./contraception";
import { NEET_ZO_RH_MTP_NOTE } from "./mtp";
import { NEET_ZO_RH_INFERTILITY_NOTE } from "./infertility";

export { NEET_ZO_RH_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/reproductive-health/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-rh-` here and `nzorh-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_RH_NOTES: Record<string, SubtopicNote> = {
  "nzo-rh-contraception": NEET_ZO_RH_CONTRACEPTION_NOTE,
  "nzo-rh-mtp": NEET_ZO_RH_MTP_NOTE,
  "nzo-rh-infertility": NEET_ZO_RH_INFERTILITY_NOTE,
};

export const NEET_ZO_RH_SLUGS = Object.keys(NEET_ZO_RH_NOTES);
