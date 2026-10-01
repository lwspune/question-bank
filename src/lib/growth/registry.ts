/**
 * The growth experiments, written as data — /dashboard/growth renders this.
 *
 * STATUS LIVES HERE, IN CODE (the owner's call, 2026-10-01): the page shows
 * status and never edits it. Starting, deciding or killing an experiment is a
 * commit to this file, so every change has a date and a reason in git.
 *
 * Each experiment counts from its MERGE date, not its deploy date (also the
 * owner's call): merges are recorded here, deploys are not. A merge that waits
 * days for a push makes the first days of the window empty, which can only
 * make a result look weaker, never stronger.
 *
 * READINGS are the numbers no query here can fetch — Google Search Console's
 * indexed-page count and Vercel's chapter_share_click events. They are added by
 * hand when the owner reads them out, oldest first.
 *
 * Pure: no React, no DB. Spec: tests/growth-registry.test.ts.
 */
import type { ActivityKind } from "@/lib/activity/events";

/**
 * What counts as studying for the North Star ("weekly learners on 2+ study
 * days"). Learning acts only: the reach and funnel kinds record a visit or an
 * impression, and counting a page view as a study day would let the number
 * rise with traffic rather than with learning.
 */
export const NORTH_STAR_KINDS: readonly ActivityKind[] = [
  "question_practiced",
  "mock_started",
  "mock_submitted",
  "answer_wrong",
  "answer_correct",
  "drill_started",
  "drill_completed",
  "note_checkpoint",
  "chapter_mastered",
  "question_bookmarked",
  "quiz_taken",
];

/** Every experiment is read four weeks after it goes live. */
export const EXPERIMENT_WINDOW_DAYS = 28;

/** The practice-first half must beat control by this many points to be kept. */
export const ONBOARDING_KEEP_POINTS = 15;
/** Signups tagged chapter-share needed by the check date to keep the card. */
export const CHAPTER_SHARE_KEEP = 5;
/** The three email jobs' combined worst case per day (welcome 30 + nudge 30 + report 10). */
export const EMAIL_DAILY_CAP = 70;
/** Google-indexed pages we are aiming for (39 on 2026-09-21). */
export const INDEXING_GOAL = 200;

/** The ISO date `EXPERIMENT_WINDOW_DAYS` after `liveSince`. */
export function checkOn(liveSince: string): string {
  const d = new Date(`${liveSince}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + EXPERIMENT_WINDOW_DAYS);
  return d.toISOString().slice(0, 10);
}

export type Readout = "onboarding-arms" | "chapter-share" | "indexing" | "email-cap";

export type Experiment = {
  id: string;
  title: string;
  /** What changed, in one sentence. */
  change: string;
  /** Why we expect it to help. */
  why: string;
  /** The number it is judged on. */
  metric: string;
  /** How the number turns into a decision. */
  rule: string;
  /** Merge date, ISO. */
  liveSince: string;
  readout: Readout;
  status: "running" | "decided";
  /** Set only once decided. */
  decision?: string;
};

export const EXPERIMENTS: readonly Experiment[] = [
  {
    id: "practice-first",
    title: "Practice-first onboarding",
    change:
      "Half of new students whose exam has mocks see \"Practise a chapter\" as the main button on the welcome screen, instead of a full paper.",
    why: "A full paper is a hard first step (27% of attempts are abandoned), and bank practice has the largest retention lift we measure. That lift is a correlation, so it is tested on half.",
    metric: "Share of each half who come back within 7 days",
    rule: `Keep if practice-first is ${ONBOARDING_KEEP_POINTS}+ points higher after 4 weeks; revert if ${ONBOARDING_KEEP_POINTS}+ points lower; otherwise no clear difference.`,
    liveSince: "2026-10-01",
    readout: "onboarding-arms",
    status: "running",
  },
  {
    id: "chapter-share",
    title: "Chapter share card",
    change:
      "A \"Studying this with friends?\" card (WhatsApp, More apps, Copy link) on every /questions chapter page and notes chapter page.",
    why: "Students already ask their groups for a chapter's past questions; this makes our page the answer.",
    metric: "Signups tagged utm_campaign=chapter-share",
    rule: `Keep if it brings ${CHAPTER_SHARE_KEEP}+ signups by the check date; remove it otherwise.`,
    liveSince: "2026-10-01",
    readout: "chapter-share",
    status: "running",
  },
  {
    id: "internal-links",
    title: "Internal links to crawlable pages",
    change:
      "21 home exam cards go to the exam home instead of the robots-blocked bank; notes chapters link to their /questions page; the breadcrumb links the exam home.",
    why: "Google has indexed about 39 of ~1,650 known pages. Links from indexed pages steer its few daily fetches to the rest.",
    metric: "Google indexed pages (Search Console, read by hand)",
    rule: `Tracked, not killed: the links stay either way. Goal ${INDEXING_GOAL} indexed pages.`,
    liveSince: "2026-10-01",
    readout: "indexing",
    status: "running",
  },
  {
    id: "email-cap",
    title: "Email daily cap",
    change:
      "The three email jobs send at most 70 a day together, leaving room for sign-up and password-reset mail on the same 100/day account.",
    why: "On 2026-09-28 the jobs tried 202 sends and 52 failed on the quota, so auth mail that day could have failed too.",
    metric: "Failed sends in the last 7 days",
    rule: "Holds while nothing fails on quota. Revisit if the cap starts holding back mail students need.",
    liveSince: "2026-10-01",
    readout: "email-cap",
    status: "running",
  },
];

export type DecidedAgainst = { title: string; decision: string; on: string; why: string };

export const DECIDED_AGAINST: readonly DecidedAgainst[] = [
  {
    title: "Brand line on the Word paper",
    decision: "No",
    on: "2026-10-01",
    why: "Owner's call: teachers' papers stay unbranded.",
  },
  {
    title: "Paywall change",
    decision: "Keep the 3-mock free limit",
    on: "2026-10-01",
    why: "Owner's call: no change until mock volume makes the limit bite (about one student a week reached it).",
  },
  {
    title: "Teacher lead calls",
    decision: "All 10 open leads were students; declined",
    on: "2026-10-01",
    why: "The retired request form drew students, not teachers: about 7 real teachers in 52 requests.",
  },
  {
    title: "Paid email plan",
    decision: "Capped sends instead",
    on: "2026-10-01",
    why: "Owner's call: fit the free 100/day quota rather than pay for more.",
  },
];

export type ReadingMetric = "google-indexed" | "share-taps";

export type Reading = { on: string; value: number; note?: string };

export const READINGS: Record<ReadingMetric, { label: string; source: string; entries: Reading[] }> = {
  "google-indexed": {
    label: "Google indexed pages",
    source: "Search Console → Pages → Indexed",
    entries: [{ on: "2026-09-21", value: 39, note: "Coverage export of 2026-09-27; 1,552 discovered, not indexed" }],
  },
  "share-taps": {
    label: "Chapter share taps",
    source: "Vercel → Analytics → Events → chapter_share_click",
    entries: [],
  },
};
