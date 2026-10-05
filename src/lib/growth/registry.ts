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
/** The exam whose chapter tests are being judged. */
export const CHAPTER_TESTS_EXAM = "MHT-CET";
/** MHT-CET students sitting any mock in a week, before chapter tests: about 5. */
export const CHAPTER_TESTS_STUDENTS_KEEP = 10;
/** Share of a chapter test answered that counts as "students finish these". */
export const CHAPTER_TESTS_ANSWERED_KEEP = 70;
/** Chapter-test sittings needed before the answered share is stated. */
export const CHAPTER_TESTS_MIN_SITTINGS = 10;

/** Second page: tap rate (taps per 100 shown) that keeps a nudge. */
export const SECOND_PAGE_KEEP_PCT = 3;

/**
 * "Buy from the download box": keep it if at least this many passes sell
 * through the box by the check date. The week before it shipped sold none
 * (107 gate visitors, 56 "Get pass" taps), so any sale is above baseline;
 * two is the floor that is not one lucky buyer.
 */
export const BOX_BUY_MIN_SALES = 2;

/**
 * Resource chips: taps per 100 cards whose chips were shown that keep them on
 * the card. Same bar as the second-page nudges: a link almost nobody uses is
 * clutter on the most-used surface in the product.
 */
export const CHIPS_KEEP_PCT = 3;

/**
 * Premium limits (migration 0134): keep them if at least this many passes sell
 * by the check date. One pass sold in the pass's first nine days, so three is
 * a clear rise rather than one lucky buyer. A provisional bar: the owner sets
 * the final one.
 */
export const PREMIUM_LIMITS_MIN_SALES = 3;

/** The ISO date `EXPERIMENT_WINDOW_DAYS` after `liveSince`. */
export function checkOn(liveSince: string): string {
  const d = new Date(`${liveSince}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + EXPERIMENT_WINDOW_DAYS);
  return d.toISOString().slice(0, 10);
}

export type Readout =
  | "onboarding-arms"
  | "chapter-share"
  | "indexing"
  | "email-cap"
  | "chapter-tests"
  | "second-page"
  | "box-buy"
  | "resource-chips"
  | "premium-limits";

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
    id: "chapter-tests",
    title: "MHT-CET chapter tests",
    change:
      "72 chapter tests (20 questions, 18-36 minutes) published next to the full papers, and linked from each chapter's /questions and notes pages. From 2026-10-05 the notes topic page's test card also holds the drill link (a separate drill box below it was removed), so the card is the page's main closing action.",
    why: "A full paper is a hard first step: before launch about 5 MHT-CET students a week sat a mock, answering about half of it.",
    metric: "MHT-CET students sitting any mock per week; share of each sitting answered, chapter tests vs full papers",
    rule: `Keep them featured if weekly MHT-CET mock students reach ${CHAPTER_TESTS_STUDENTS_KEEP}+ or chapter tests average ${CHAPTER_TESTS_ANSWERED_KEEP}%+ answered by the check date; otherwise stop featuring them on chapter pages.`,
    liveSince: "2026-10-01",
    readout: "chapter-tests",
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
  {
    id: "second-page",
    title: "Second page",
    change:
      "On chapter question pages and notes pages, V says hello once per device (not signed in, after 2 reveals or 40 s with a scroll) with one next step; chapter question pages also get a next-step card after the 5th question.",
    why: "Most search visitors read one page and leave. Both point at a page that is not more of the same: the chapter test, the notes, or the real past questions.",
    metric: "Tap rate of each (taps / shown), read by hand from Vercel; share of single-page visits on chapter pages, read from Clarity",
    rule: `Keep each if ${SECOND_PAGE_KEEP_PCT}%+ of those who see it tap it by the check date; remove it otherwise. The two are judged separately.`,
    liveSince: "2026-10-04",
    readout: "second-page",
    status: "running",
  },
  {
    id: "box-buy",
    title: "Free download + buy in the download box",
    change:
      "Every account gets one free Word download (paper or key, branded) after signing in from the box; after that the box sells the pass in place: the pass's perks and price, Google sign-in over the page, Razorpay, then the download view. The pass is renamed Premium Pass. Both shipped together, so they are judged together.",
    why: "In the week to 2026-10-04, 52 of 94 signed-out visitors tapped \"Get pass\" with the price shown, and all were lost on /pricing, whose first step was \"Sign in to buy\".",
    metric: "Passes sold through the box (Vercel checkout_paid, surface download_box), per 100 gate visitors (teacher_gate_shown); free downloads used (free_download_used, and the free_downloads table) as the step before; the checkout_* events show where the rest stop",
    rule: `Keep it if ${BOX_BUY_MIN_SALES}+ passes sell through the box by the check date; otherwise look at the step where buyers stop before touching the price.`,
    liveSince: "2026-10-04",
    readout: "box-buy",
    status: "running",
  },
  {
    id: "resource-chips",
    title: "Strategy and concept chips on question cards",
    change:
      "The bank card's links to the strategy guide and the concept notes became one line of small chips shown only once the solution is open (2026-10-04 card redesign). They stay in the page's HTML either way, so crawlers still see the links.",
    why: "The owner asked whether students use them at all. They take space on the most-used surface (1,229 bank reveals a week against 30 mocks), so they must earn it, either by being tapped or by helping search.",
    metric: "Tap rate: resource_chips_click ÷ resource_chips_shown in Vercel (props say which chip and which page). If that misses, the fallback is search value: are the notes and guide pages the chips point at indexed, and do they get search clicks (Search Console)?",
    rule: `Keep them if ${CHIPS_KEEP_PCT}%+ of cards that show them get a tap by the check date. Below that, keep them only if their target pages show search value (indexed and getting search clicks, or cited by AI answers); otherwise retire the chips.`,
    liveSince: "2026-10-04",
    readout: "resource-chips",
    status: "running",
  },
  {
    id: "premium-limits",
    title: "Free limits on what students use",
    change:
      "Premium Pass now covers what students do, with a free allowance of each: 5 chapter tests (apart from the 3 mocks), 15 Fix your mistakes questions a day, 50 answers a day signed in, 100 saved questions, and the projected score for 7 days after revealing it. Each limit is switched on at /dashboard/pricing.",
    why: "The pass sold mocks and downloads, which few use: in the 14 days to 2026-10-05, 122 students revealed 3,277 answers while 39 started a mock, only 5 had ever reached the mock limit, and 1 pass sold.",
    metric: "Passes sold since the limits went on (entitlements, source razorpay); paywall_event 'shown' by gate (chapter_test, drill, reveals, saves, projection) says which limit is met; return visits of the students who hit the 50-answer limit say whether it costs us learners",
    rule: `Keep them if ${PREMIUM_LIMITS_MIN_SALES}+ passes sell by the check date and the students who meet the answer limit keep coming back; if those students stop returning, raise or drop that limit first.`,
    liveSince: "2026-10-05",
    readout: "premium-limits",
    status: "running",
  },
];

export type DecidedAgainst = { title: string; decision: string; on: string; why: string };

export const DECIDED_AGAINST: readonly DecidedAgainst[] = [
  {
    title: "Brand line on institute papers",
    decision: "No; pass downloads are branded instead",
    on: "2026-10-01",
    why: "Owner's call: an institute's own staff papers stay unbranded. Papers downloaded with the pass carry a light PYQ Vault watermark and www.pyqvault.com in the footer.",
  },
  {
    title: "Separate ₹499 Teacher Pass",
    decision: "Retired; one ₹99 PYQ Vault Pass unlocks downloads for everyone",
    on: "2026-10-01",
    why: "44 of 52 teacher-access requests came from students, a teacher cannot be verified, and the Teacher Pass sold none. Owner's call: 6 months, no download cap for now.",
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

export type ReadingMetric =
  | "google-indexed"
  | "share-taps"
  | "hello-tap-rate"
  | "card-tap-rate"
  | "box-sales-per-100"
  | "chip-tap-rate"
  | "limit-sales";

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
  "hello-tap-rate": {
    label: "V hello tap rate (%)",
    source: "Vercel → Analytics → Events → v_hello_click ÷ v_hello_shown",
    entries: [],
  },
  "card-tap-rate": {
    label: "Next-step card tap rate (%)",
    source: "Vercel → Analytics → Events → next_step_card_click ÷ next_step_card_shown",
    entries: [],
  },
  "limit-sales": {
    label: "Passes sold since the free limits went on",
    source: "entitlements where source = 'razorpay' and granted_at >= the switch-on date; paywall_event shown rows by gate beside it",
    entries: [{ on: "2026-10-05", value: 1, note: "Baseline: 1 pass sold since sales opened on 2026-09-27, before any of these limits" }],
  },
  "box-sales-per-100": {
    label: "Passes sold per 100 download-gate visitors",
    source: "Vercel → Analytics → Events → checkout_paid (surface download_box) ÷ teacher_gate_shown visitors × 100",
    entries: [
      {
        on: "2026-10-04",
        value: 0,
        note: "Baseline, 7 days before the box sold in place: 107 gate visitors (94 signed out), 56 tapped Get pass, 0 sales",
      },
    ],
  },
  "chip-tap-rate": {
    label: "Question-card chip tap rate (%)",
    source: "Vercel → Analytics → Events → resource_chips_click ÷ resource_chips_shown",
    entries: [],
  },
};
