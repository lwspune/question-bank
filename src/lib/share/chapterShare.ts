/**
 * The chapter share card ("Studying this with friends?") ran on every
 * /questions and notes chapter page from 2026-10-01 and was removed on
 * 2026-11-11 under its experiment's rule: 4 signups in six weeks, the bar was
 * 5 (lib/growth/registry.ts, "chapter-share").
 *
 * Only the campaign name stays: the growth readout still counts the signups
 * the card's links brought in (student_profiles.acq_campaign).
 */

/** Ties every chapter share to one rollup in student_profiles.acq_campaign. */
export const CHAPTER_SHARE_CAMPAIGN = "chapter-share";
