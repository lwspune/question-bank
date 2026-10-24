import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RCC_CALENDAR_NOTE } from "./calendar";

export { SSC_CALENDAR_CLOCK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/calendar-clock/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rcc-` here and `sscrcc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/calendar-clock.ts). Order matches `subtopicOrder`.
 */
export const SSC_CALENDAR_CLOCK_NOTES: Record<string, SubtopicNote> = {
  "ssc-rcc-calendar": SSC_RCC_CALENDAR_NOTE,
};

export const SSC_CALENDAR_CLOCK_SLUGS = Object.keys(SSC_CALENDAR_CLOCK_NOTES);
