import type { SubtopicNote } from "@/app/notes/_types";
import { AF_CI_SIMPLE_NOTE } from "./simple";
import { AF_CI_FINDING_NOTE } from "./finding";
import { AF_CI_CHANGES_NOTE } from "./changes";
import { AF_CI_MULTIPLES_NOTE } from "./multiples";
import { AF_CI_COMPOUND_NOTE } from "./compound";
import { AF_CI_POWERS_NOTE } from "./powers";
import { AF_CI_DIFFERENCE_NOTE } from "./difference";
import { AF_CI_PERIODS_NOTE } from "./periods";
import { AF_CI_INSTALMENTS_NOTE } from "./instalments";

export { AF_CI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/afcat-maths/interest/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `af-ci-` here and `afci-` on concept slugs.
 *
 * Pages cut from the bank's subtopics by scripts/afcat/recut.ts (plan generated-papers/_afci-plan.json, 2026-10-22).
 * Order matches `subtopicOrder`.
 */
export const AF_CI_NOTES: Record<string, SubtopicNote> = {
  "af-ci-simple": AF_CI_SIMPLE_NOTE,
  "af-ci-finding": AF_CI_FINDING_NOTE,
  "af-ci-changes": AF_CI_CHANGES_NOTE,
  "af-ci-multiples": AF_CI_MULTIPLES_NOTE,
  "af-ci-compound": AF_CI_COMPOUND_NOTE,
  "af-ci-powers": AF_CI_POWERS_NOTE,
  "af-ci-difference": AF_CI_DIFFERENCE_NOTE,
  "af-ci-periods": AF_CI_PERIODS_NOTE,
  "af-ci-instalments": AF_CI_INSTALMENTS_NOTE,
};

export const AF_CI_SLUGS = Object.keys(AF_CI_NOTES);
