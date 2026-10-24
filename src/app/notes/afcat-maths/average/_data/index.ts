import type { SubtopicNote } from "@/app/notes/_types";
import { AF_AV_BASICS_NOTE } from "./basics";
import { AF_AV_CONSECUTIVE_NOTE } from "./consecutive";
import { AF_AV_SINGLE_NOTE } from "./single";
import { AF_AV_GROUPS_NOTE } from "./groups";
import { AF_AV_JOINING_NOTE } from "./joining";
import { AF_AV_WEIGHTED_NOTE } from "./weighted";
import { AF_AV_EXTREMES_NOTE } from "./extremes";
import { AF_AV_CRICKET_NOTE } from "./cricket";
import { AF_AV_AGES_NOTE } from "./ages";

export { AF_AV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/average/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-av-` here and `afav-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afav-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_AV_NOTES: Record<string, SubtopicNote> = {
  "af-av-basics": AF_AV_BASICS_NOTE,
  "af-av-consecutive": AF_AV_CONSECUTIVE_NOTE,
  "af-av-single": AF_AV_SINGLE_NOTE,
  "af-av-groups": AF_AV_GROUPS_NOTE,
  "af-av-joining": AF_AV_JOINING_NOTE,
  "af-av-weighted": AF_AV_WEIGHTED_NOTE,
  "af-av-extremes": AF_AV_EXTREMES_NOTE,
  "af-av-cricket": AF_AV_CRICKET_NOTE,
  "af-av-ages": AF_AV_AGES_NOTE,
};

export const AF_AV_SLUGS = Object.keys(AF_AV_NOTES);
