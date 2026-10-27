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

/** "performance-starter": keep the offer if this share of empty-page viewers start a test within a day. */
export const STARTER_KEEP_PCT = 15;

/**
 * "formula-pages": keep building on the chapter formula pages (PYQ counts per
 * formula next) if Google indexes at least this many of them by the check
 * date. A provisional bar: about a fifth of the ~220 pages, against a site
 * where 39 of ~1,650 pages were indexed on 2026-09-21.
 */
export const FORMULA_PAGES_INDEXED_KEEP = 40;
/** ...and at least this many signups first landed on a /formula page. */
export const FORMULA_PAGES_SIGNUPS_KEEP = 5;

/**
 * "paper-pages": keep building on the past paper reading pages if this many
 * signups first land on one (or on a past-paper list) by the check date...
 */
export const PAPER_PAGES_SIGNUPS_KEEP = 10;
/** ...or ChatGPT names us in at least this many of the five paper prompts (asked by hand). */
export const PAPER_PAGES_CHATGPT_KEEP = 2;

/**
 * "notes-titles": keep the student wording on the notes titles if signups
 * whose first page was a /notes page reach this share of all signups in the
 * window. A SHARE, not a count: the four weeks before already held 20 of 511
 * (3.9%), so a count of 20 would pass with no effect, and total signups were
 * growing fast enough to lift any count on their own.
 */
export const NOTES_TITLES_SHARE_KEEP_PCT = 6;
/** ...or ChatGPT names us in at least this many of the five notes prompts (asked by hand). */
export const NOTES_TITLES_CHATGPT_KEEP = 2;

/**
 * "specific-offer": keep the per-page lead on the board-paper and homework
 * boxes if at least this share of students shown the offer there open
 * checkout. Provisional, set by Claude: about twice /browse's rate before the
 * change (2 of 21), well under the tiny pre-change sample on these boxes (3 of 5).
 */
export const SPECIFIC_OFFER_CHECKOUT_PCT = 20;

/**
 * "practice-tests": keep V's practice-test builder (and build on it) if
 * students start at least this many practice tests in the window...
 */
export const PRACTICE_TESTS_STARTED_KEEP = 30;
/**
 * ...and answer at least this share of them on average. Chapter tests ran at
 * 63% answered and full papers at 18% in the 30 days before (2026-10-15).
 */
export const PRACTICE_TESTS_ANSWERED_KEEP_PCT = 50;

/**
 * "pyq-wording": keep "previous year questions" if Search Console impressions
 * for queries containing "previous year" in the window are at least this many
 * times the same-length window before the change. Search Console compares two
 * date ranges after the fact, so the baseline needs no reading taken today.
 */
export const PYQ_WORDING_IMPRESSIONS_KEEP_RATIO = 1.5;

/**
 * "practice-friends": keep "practise together" (send a test, then the shared
 * results card) if students send at least this many practice tests in the two
 * weeks...
 */
export const PRACTICE_FRIEND_SENDS_KEEP = 10;
/** ...and at least this many friends start the copy they were sent. */
export const PRACTICE_FRIEND_STARTS_KEEP = 3;

/**
 * "mock-together": keep the "Practise together" box under Start on published
 * papers if students send at least this many papers in the two weeks...
 */
export const MOCK_TOGETHER_SENDS_KEEP = 10;
/** ...and at least this many friends start a paper they were sent. */
export const MOCK_TOGETHER_STARTS_KEEP = 3;

/**
 * IMAT on PYQ Vault (2026-10-20): keep investing in IMAT (the ministry papers
 * once cleared, then mocks) if at least this many students choose it...
 */
export const IMAT_STUDENTS_KEEP = 20;
/**
 * ...and build the international site (intl.pyqvault.com) once visitors from
 * outside India make up at least this share of IMAT page views.
 */
export const IMAT_FOREIGN_SHARE_PCT = 25;

/**
 * "v-finder" (study-partner Phase 0): V's page-finding is reliable enough to
 * build the explain-a-question step on top of it when, of the chapter asks in
 * the window, at most this share got a false "not found" (baseline 4 of 17).
 */
export const V_FINDER_NOT_FOUND_MAX_PCT = 10;

/**
 * "v-explain" (study-partner Phase 1): keep "Ask V about this question" if at
 * least this many students get an explanation in the two weeks...
 */
export const V_EXPLAIN_STUDENTS_KEEP = 20;
/** ...and the similar question V offers is answered right at least this often (%). */
export const V_EXPLAIN_SIMILAR_RIGHT_KEEP_PCT = 50;

/**
 * "v-strategy" (study-partner Phase 2): keep exam_strategy if at least this many
 * weightage or "what comes next year" asks are answered from it in two weeks,
 * and none of them gets "I don't have that data".
 */
export const V_STRATEGY_ANSWERS_KEEP = 10;

/**
 * "v-plan" (study-partner Phase 3): keep V's week plan if at least this many
 * students make one in two weeks...
 */
export const V_PLAN_STUDENTS_KEEP = 10;
/** ...and at least this share of the planned days is done (%), read from the same log the ticks use. */
export const V_PLAN_DAYS_DONE_KEEP_PCT = 30;

/**
 * "pass-price": keep Rs 199 if a week's pass revenue is at least the week
 * before the change (6 sales at Rs 99)...
 */
export const PRICE_BASELINE_WEEKLY_REVENUE = 594;
/**
 * "answer-limit": keep 25 a day unless the share of limit-meeters back on a
 * later day within 7 days falls more than this many points below the 65% before.
 */
export const ANSWER_LIMIT_RETURN_BASELINE_PCT = 65;
/** V's AI replies followed by another typed message within 30 minutes, before the line-by-line reveal (%). */
export const V_REVEAL_FOLLOWUP_BASELINE_PCT = 48;
/** A fall of this many points in that share is looked into before anything else changes in V. */
export const V_REVEAL_FOLLOWUP_MAX_DROP = 5;
export const ANSWER_LIMIT_RETURN_MAX_DROP = 10;
/** "tutor-interest": student Yes answers (looking for 1:1 tutoring) that take tutoring further. */
export const TUTOR_STUDENT_YES_KEEP = 20;

/** The ISO date `days` (by default `EXPERIMENT_WINDOW_DAYS`) after `liveSince`. */
export function checkOn(liveSince: string, days: number = EXPERIMENT_WINDOW_DAYS): string {
  const d = new Date(`${liveSince}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
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
  | "premium-limits"
  | "performance-starter"
  | "formula-pages"
  | "specific-offer"
  | "paper-pages"
  | "notes-titles"
  | "practice-tests"
  | "practice-friends"
  | "mock-together"
  | "pyq-wording"
  | "imat"
  | "v-finder"
  | "v-explain"
  | "v-strategy"
  | "v-plan"
  | "ebook-store"
  | "pass-price"
  | "answer-limit"
  | "v-reveal"
  | "tutor-interest";

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
  /** Days to the check, when not the standard `EXPERIMENT_WINDOW_DAYS`. */
  windowDays?: number;
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
    liveSince: "2026-10-06", // switched on at /dashboard/pricing; merged 2026-10-05 with every limit off
    readout: "premium-limits",
    status: "running",
  },
  {
    id: "performance-starter",
    title: "A first test on the empty performance page",
    change:
      "A student with no graded paper used to see a blank box on /performance. It now offers one short test: the chapter test for the chapter they practised last, else their exam's first chapter test, else its newest past paper; a board student is told timed tests are not live yet, and a student with no exam picks one.",
    why: "Two in three active students (102 of 155, 2026-10-06) have no graded paper, so for most students the page was empty. A full paper is 90 to 180 minutes; a chapter test is 15 to 25, and chapter tests are finished far more often (median 85% answered against 3% for full MHT-CET papers).",
    metric: "Of students who view /performance with no graded paper (surface_viewed 'performance'), the share who start a mock within 24 hours (mock_started); performance_starter_click in Vercel says which offer they took",
    rule: `Keep it if ${STARTER_KEEP_PCT}%+ of those viewers start a test within a day by the check date; below that, try a different offer before removing it.`,
    liveSince: "2026-10-06",
    readout: "performance-starter",
    status: "running",
  },
  {
    id: "formula-pages",
    title: "Chapter formula pages",
    change:
      "About 220 static pages at /formula/<exam>/<subject>/<chapter>: each notes chapter's formulas with their symbol legends, reference tables and traps with explanations, grouped by subtopic, with the formula sheet PDF box. Linked from each notes chapter page and the /formula index.",
    why: "Students ask for formulas to keep, and formula lists are a common search and a quotable answer for ChatGPT, which already sends about half of signups to chapter pages. Built from the notes data alone, so they cost no database load.",
    metric: "Indexed /formula/ pages (Search Console, read by hand); signups whose first page was a /formula/ page (student_profiles.acq_landing)",
    rule: `Keep building on them (PYQ counts per formula next) if ${FORMULA_PAGES_INDEXED_KEEP}+ are indexed and ${FORMULA_PAGES_SIGNUPS_KEEP}+ signups first landed on one by the check date; otherwise leave them as they are and build nothing more on them.`,
    liveSince: "2026-10-10",
    readout: "formula-pages",
    status: "running",
  },
  {
    id: "specific-offer",
    title: "Name what the student is missing on past papers and homework",
    change:
      "Once the free paper is spent, the pass offer on a board past paper or a homework plan leads with that page's own numbers (\"All 7 Physics past papers, 2023 to 2026\", \"All 81 days of Mathematics homework\") above a shorter list of the rest of the pass. /browse, mocks and formula sheets keep the generic list. Every paywall row now says which download box it came from.",
    why: "From 8 to 14 Oct every recent sale came from these two boxes (free board papers 12, then 2 paid; homework 3, then 1), none from /browse (61 free papers, 0 paid), because there the need repeats: next year's paper, tomorrow's homework. Yet they showed the same six generic perks, and one student tapped that list as if it were buttons, then left.",
    metric:
      "Students who open checkout ÷ students shown the offer, on the board_paper and homework boxes (user_activity paywall_event, metadata.box), beside /browse's; passes sold whose checkout_opened names one of those boxes",
    rule: `Keep it if ${SPECIFIC_OFFER_CHECKOUT_PCT}%+ of students shown the offer on these boxes open checkout by the check date; if it holds, try the same lead on mocks. Below that, go back to the generic list.`,
    liveSince: "2026-10-15",
    readout: "specific-offer",
    status: "running",
  },
  {
    id: "paper-pages",
    title: "Past papers you can read",
    change:
      "Each of the ~300 past papers gets a reading page at /mock/<slug>/paper: every question in the order it was set, answers behind a tap and the free-answer meter. The past-paper lists are titled \"Previous Year Question Papers with Solutions\" (or \"with Answers\" where an exam has none), and exam homes link them.",
    why: "Asked \"best free website for MHT CET previous year questions\", ChatGPT named AglaSem, ConceptFirst and SelfStudys, which all show their papers. Our paper pages were a title and a start button, left out of the sitemap for being thin.",
    metric:
      "Signups whose first page was a /mock/<slug>/paper page or a past-paper list (student_profiles.acq_landing); how many of the five paper prompts name us in ChatGPT (asked by hand)",
    rule: `Keep building on them if ${PAPER_PAGES_SIGNUPS_KEEP}+ signups first land on one, or ChatGPT names us in ${PAPER_PAGES_CHATGPT_KEEP}+ of the five prompts, by the check date; otherwise leave them as they are.`,
    liveSince: "2026-10-15",
    readout: "paper-pages",
    status: "running",
  },
  {
    id: "notes-titles",
    title: "Notes titled the way students ask",
    change:
      "Every notes hub and chapter title says \"Notes\", \"Free\" and \"PDF\" (\"NDA Maths Notes: Free Chapter-wise PDF\", \"Probability: NDA Maths Notes (Free PDF)\") instead of \"Teaching Notes\", and every description leads with \"Free chapter-wise ... notes\". About 300 pages, one file (lib/notes/titles.ts).",
    why: "Asked \"where can I get NDA maths notes\", ChatGPT answered \"free NDA Maths notes PDF chapter-wise\" and named The Cavalier, EduRev and Oswaal. We have exactly that, every chapter with a free PDF handout, but our titles said \"Teaching Notes\" and never free, chapter-wise or PDF.",
    metric:
      "Share of signups whose first page was a /notes page (student_profiles.acq_landing; 3.9% in the four weeks before); how many of the five notes prompts name us in ChatGPT (asked by hand)",
    rule: `Keep the wording if ${NOTES_TITLES_SHARE_KEEP_PCT}%+ of signups first land on a notes page, or ChatGPT names us in ${NOTES_TITLES_CHATGPT_KEEP}+ of the five prompts, by the check date; otherwise look again at what the winning pages say.`,
    liveSince: "2026-10-15",
    readout: "notes-titles",
    status: "running",
  },
  {
    id: "practice-tests",
    title: "V builds a practice test",
    change:
      "\"Build a practice test\" is V's first option: V asks exam, subject, up to 5 chapters (or the most-asked), length, difficulty and whether to skip answered questions, then builds a test to start online (one free a day) or download (pass or the free paper).",
    why: "Short tests get finished: in the 30 days before, students answered 63% of a chapter test and 18% of a full paper. Students were typing it into V (\"i want a mock on nlm\", \"Mini test\").",
    metric:
      "Practice tests started (mock_attempts on scope 'custom', first attempts); their average share answered; the builder funnel at /dashboard/chat",
    rule: `Keep it and build on it if students start ${PRACTICE_TESTS_STARTED_KEEP}+ practice tests and answer ${PRACTICE_TESTS_ANSWERED_KEEP_PCT}%+ of them on average by the check date; otherwise read the funnel for where students stop.`,
    liveSince: "2026-10-15",
    readout: "practice-tests",
    status: "running",
  },
  {
    id: "practice-friends",
    title: "Practise together: send a practice test to a friend",
    change:
      "A practice test V built carries \"Practise together\": the student sends a link, the friend signs in and sits their own copy, free and outside their daily free test. Once a friend finishes, both result pages show which questions each side missed (no scores), and everyone who finished earlier gets a push.",
    why: "Students share little today (5 mock shares in a month), so this tests whether a cooperative reason to come back (what you both missed, ask or explain) makes them send tests. The owner chose to build both steps at once rather than wait for the send numbers.",
    metric:
      "Practice-test sends (share_events kind 'practice'); friends who start and finish a copy; signups from utm_campaign practice-share; friend-finished pushes tapped",
    rule: `Keep it if students send ${PRACTICE_FRIEND_SENDS_KEEP}+ practice tests and ${PRACTICE_FRIEND_STARTS_KEEP}+ friends start their copy in two weeks; if sends come but nobody finishes, read where friends stop; if nobody sends, take the box off the result page.`,
    liveSince: "2026-10-16",
    windowDays: 14,
    readout: "practice-friends",
    status: "running",
  },
  {
    id: "mock-together",
    title: "Practise together on mock tests and chapter tests",
    change:
      "Every published paper's start page (full past papers, chapter tests, practice papers) carries \"Practise together\" under Start. The friend opens the link, sits the same paper free (past the free mock and chapter-test limits, migration 0166), and both result pages show which questions each side missed, with a push when a friend finishes.",
    why: "V's practice tests are where practise together started, but only 11 had ever been built; mocks and chapter tests are where the students are (275 finished in the 30 days before), so this is where the idea can actually be tested (owner, 2026-10-17).",
    metric:
      "Paper sends (share_events kind 'mock_together'); friends who start a paper from an invite (mock_invite_joins); signups from utm_campaign mock-together",
    rule: `Keep it if students send ${MOCK_TOGETHER_SENDS_KEEP}+ papers and ${MOCK_TOGETHER_STARTS_KEEP}+ friends start one in two weeks; if sends come but nobody starts, read where friends stop; if nobody sends, take the box off the start page.`,
    liveSince: "2026-10-17",
    windowDays: 14,
    readout: "mock-together",
    status: "running",
  },
  {
    id: "imat-on-pyqvault",
    title: "IMAT on PYQ Vault, the same for every visitor",
    change:
      "IMAT is an ordinary exam on pyqvault.com: 681 original practice questions (five options, filed under 206 subtopics) and 46 chapters of notes. The ministry papers wait on the copyright opinion.",
    why: "We have no foreign traffic because we have no foreign content, Indian students sit IMAT too, and the site that already ranks is the cheapest place to test demand. A country-dependent site was rejected: Google crawls from the US (owner, 2026-10-20).",
    metric:
      "Students with IMAT among their exams; IMAT page views and the share from outside India (Clarity)",
    rule: `Keep investing in IMAT if ${IMAT_STUDENTS_KEEP}+ students choose it in six weeks; build intl.pyqvault.com once visitors from outside India are ${IMAT_FOREIGN_SHARE_PCT}%+ of IMAT page views; if neither moves, leave IMAT as it is and spend nothing more on it.`,
    liveSince: "2026-10-20",
    windowDays: 42,
    readout: "imat",
    status: "running",
  },
  {
    id: "ebook-store",
    title: "Book store: formula, notes and PYQ books as paid PDFs",
    change:
      "A Books button in the header opens /store. Three kinds of book, sold apart from the pass (20% off for pass holders): Formula Books and Notes Books (Rs 49 each) for MHT-CET Maths, Physics and Chemistry, and the MHT-CET Maths PYQ Book (Rs 149, every past question 2021-2026 with full solutions). Each buyer's copy carries their email on every page, five downloads. After buying, \"Want this as a printed book?\" takes a free tap and an optional pincode.",
    why: "The owner wants to sell printed books. This tests the cheap half first: which kind of book students pay for, at what price, and how many buyers want it printed (and where).",
    metric:
      "Per book, signed-in students: opened its page and took its sample (user_activity surface_viewed, store / ebook_sample), bought and revenue (ebook_purchases), refunds, printed-copy taps and pincodes (ebook_print_interest), downloads. Signed-out visits, header Ebooks taps (ebook_store_link_click) and checkout steps per book (checkout_* with slug) in Vercel, read by hand",
    rule: "No decision rule yet: we have no data on what students pay for a book (owner, 2026-10-20). Watch the numbers; once 30-50 buyers have asked for a printed copy, consider a paid pre-order window.",
    liveSince: "2026-10-20",
    readout: "ebook-store",
    status: "running",
  },
  {
    id: "pyq-wording",
    title: "\"Previous year questions\", the words students search",
    change:
      "Site-wide titles, descriptions, every /questions chapter lead, exam counts, llms.txt and the sign-up pages say \"previous year questions (PYQs)\" instead of \"past-year questions\". Guide and notes prose is not changed yet.",
    why: "Indian students search \"previous year questions\" or \"PYQ\", which is what our name abbreviates; almost nobody searches \"past-year questions\". The past-paper lists already said \"Previous Year Question Papers\" (2026-10-15).",
    metric:
      "Search Console impressions for queries containing \"previous year\", the window after vs the same-length window before (read by hand)",
    rule: `Keep the wording (and do the guide and notes prose next) if impressions for \"previous year\" queries reach ${PYQ_WORDING_IMPRESSIONS_KEEP_RATIO}x the window before by the check date; otherwise keep it anyway (it is our own name) but do not spend more on the prose.`,
    liveSince: "2026-10-16",
    readout: "pyq-wording",
    status: "running",
  },
  {
    id: "v-finder",
    title: "V finds what we have (study partner, Phase 0)",
    change:
      "V is told the page's chapter or exam and the exams on the student's profile, its chapter search reads subtopic names and finds a chapter named inside a sentence, and it links the subject's strategy guide for weightage questions.",
    why: "Reading every conversation (2026-10-19): 4 of 17 chapter asks got a false \"not found\", about 7 conversations spent turns on \"which exam?\" though 21 of 27 signed-in typers had exams on their profile, and weightage asks got \"I don't have that data\". Explaining questions (Phase 1) needs the finder to be right first.",
    metric:
      "False \"not found\" share of chapter asks (read from chat_interactions.tool_calls); conversations with a \"which exam?\" turn V could have skipped; signed-in V replies followed by practice within 30 minutes",
    rule: `Start Phase 1 (Ask V about this question) if at most ${V_FINDER_NOT_FOUND_MAX_PCT}% of chapter asks get a false "not found"; above that, fix the misses the saved searches show first.`,
    liveSince: "2026-10-19",
    windowDays: 14,
    readout: "v-finder",
    status: "running",
  },
  {
    id: "v-explain",
    title: "Ask V about this question (study partner, Phase 1)",
    change:
      "An Ask V button on question cards (/browse, /questions, /board, the mock review) opens V with the question attached. V explains straight away (a hint only when asked, since 2026-10-20), only from the stored solution and key, then shows a similar question as a card to answer in the chat. A full explanation is one of the day's free answers.",
    why: "Reading every conversation (2026-10-19): about 1 in 5 students who typed wanted the question on their screen explained, and V could only say \"tap Show solution\". The similar question after an explanation is the learning check: answering one right after an explanation is the evidence it worked.",
    metric:
      "Students with an explanation (question_practiced surface 'v' with no chose); similar-question cards answered (surface 'v' with chose) and the share answered right; whether students who used Ask V come back within 7 days",
    rule: `Keep it if ${V_EXPLAIN_STUDENTS_KEEP}+ students get an explanation in two weeks and the similar question is answered right ${V_EXPLAIN_SIMILAR_RIGHT_KEEP_PCT}%+ of the time; under the student count, check whether the button is found before changing V; under the right-answer share, read the explanations before anything else.`,
    liveSince: "2026-10-19",
    windowDays: 14,
    readout: "v-explain",
    status: "running",
  },
  {
    id: "v-strategy",
    title: "V quotes real weightage (study partner, Phase 2)",
    change:
      "V has an exam_strategy tool: each chapter's share of the subject's past-year questions over the last 3 years in the bank, in how many of the last 5 years it was asked, its page, and the subject's guide; without a subject, each subject's share. V quotes only those numbers, and answers \"what will come in 2027\" with the chapters asked every year.",
    why: "Reading every conversation (2026-10-19): weightage and \"important chapters\" asks were common, and V could only link a guide, which exists for 17 subjects; for the rest it said it had no weightage data.",
    metric: "V replies whose saved tool calls include exam_strategy; weightage asks answered \"no data\" (read from chat_interactions)",
    rule: `Keep it if ${V_STRATEGY_ANSWERS_KEEP}+ asks are answered from it in two weeks and none gets "no data"; if a reply quotes a number the tool did not return, tighten rule 5a before anything else.`,
    liveSince: "2026-10-19",
    windowDays: 14,
    readout: "v-strategy",
    status: "running",
  },
  {
    id: "v-plan",
    title: "V plans the week (study partner, Phase 3)",
    change:
      "Asked for a plan or a timetable, V saves one task a day for the next seven days (weak chapters first, then the exam's biggest chapters, the due drill and a timed mock), asking for the exam date once, and shows it as a card inside V that ticks itself from what the student does; \"my plan\" shows it again.",
    why: "Reading every conversation (2026-10-19): students asked for timetables and \"how to prepare\", and V could only link pages. A plan made from their own weak chapters is deliberate practice, and ticks read from the log are feedback without a streak.",
    metric: "Students with a study_plans row; share of planned days done (the card's own ticks); whether planners come back within 7 days",
    rule: `Keep it if ${V_PLAN_STUDENTS_KEEP}+ students make a plan in two weeks and ${V_PLAN_DAYS_DONE_KEEP_PCT}%+ of planned days are done; under the day share, read which kind of day is skipped (chapter, drill or mock) before changing the plan.`,
    liveSince: "2026-10-19",
    windowDays: 14,
    readout: "v-plan",
    status: "running",
  },
  {
    id: "pass-price",
    title: "Premium Pass at Rs 199",
    change:
      "The Premium Pass went from Rs 99 to Rs 199 (6 months, same perks) at 07:30 IST on 2026-10-23, at /dashboard/pricing. All 12 passes sold before it were at Rs 99.",
    why: "Of students who open checkout, 1 in 3 buys (11 of 33), so the people who reach checkout want the pass; at Rs 199 sales can fall by almost half and revenue still rises. The owner's call.",
    metric:
      "Pass revenue per week (entitlements source razorpay, granted_at in the week, times the price), against Rs 594 (6 sales) in the week before; checkout opened then paid (user_activity paywall_event step checkout_opened, then a razorpay entitlement), against 33%. The answer limit changed the same day, so checkout-to-paid is the cleaner read on price; revenue carries both changes",
    rule: `Keep Rs 199 if a week's revenue holds at Rs ${PRICE_BASELINE_WEEKLY_REVENUE}+ over the window (read first at 14 days); if it falls below that, go back to Rs 99 or try a price between.`,
    liveSince: "2026-10-23",
    readout: "pass-price",
    status: "running",
  },
  {
    id: "answer-limit",
    title: "25 free answers a day, down from 30",
    change:
      "Signed-in students now get 25 free answers a day in the bank and the book reader, down from 30, from 18:15 IST on 2026-10-23, at /dashboard/pricing.",
    why: "The answer limit is the only free limit students meet often (87 of 478 in the 14 days to 23 Oct; the mock limit 5 of 102, chapter tests 1 of 148, saves 2 of 93), and it brought 5 of the 11 tracked sales. 63 more students reached 20 to 29 answers on their best day, so a lower limit shows the pass to more of them. 77% of signups never meet any offer.",
    metric:
      "Students meeting the limit per day (paywall_event gate reveals, step shown, distinct students per IST day), against 10.7; of those, the share back on a later IST day within 7 days (question_practiced, mock_started or drill_started), against 65%; their checkout opens and passes. Read from 24 Oct, as 23 Oct straddles the change",
    rule: `Keep 25 if the students who meet it still come back (within ${ANSWER_LIMIT_RETURN_MAX_DROP} points of ${ANSWER_LIMIT_RETURN_BASELINE_PCT}%) and more of them open checkout; if the return share falls further, go back to 30.`,
    liveSince: "2026-10-23",
    readout: "answer-limit",
    status: "running",
  },
  {
    id: "v-reveal",
    title: "V's replies shown a line at a time",
    change:
      "A new reply from V grows in its bubble one line at a time (the first at once, then a pause long enough to read each line, about 5 seconds for 8 lines), instead of landing as one block; a tap shows the rest. Replies from history show whole.",
    why: "The owner, 2026-10-23: one block is heavy to take in, one line after another helps students digest it, and it is how they are used to reading chats.",
    metric:
      "Share of V's AI replies followed by another typed message in the same conversation within 30 minutes (chat_interactions), against 48% (111 of 233, 15 to 23 Oct). Thumbs are too few to read",
    rule: `Keep it if the follow-up share holds at ${V_REVEAL_FOLLOWUP_BASELINE_PCT}% or rises over two weeks; if it falls ${V_REVEAL_FOLLOWUP_MAX_DROP}+ points, read the conversations for replies left unread before changing the pace.`,
    liveSince: "2026-10-23",
    windowDays: 14,
    readout: "v-reveal",
    status: "running",
  },
  {
    id: "tutor-interest",
    title: "1:1 tutoring: is there demand?",
    change:
      "A Tutor button in the header, beside Ebooks, opens /tutor: Student or Teacher, then \"Looking for 1:1 tutoring?\" (a teacher is asked \"Would you like to teach 1:1?\"), then Online, Offline or Either on a Yes. Nothing is sold or booked, and no contact details are asked; the page says tutoring will be announced there.",
    why: "The owner is weighing 1:1 tutoring and wants demand measured before anything is built. One page counts both sides: students who want a tutor and teachers who would teach.",
    metric:
      "Student and teacher answers, Yes and No, by Online / Offline / Either, and student Yes by exam (tutor_interest, migration 0190). Header Tutor taps (tutor_link_click) in Vercel, read by hand. Signed-out answers are one row each, so they can count a person twice",
    rule: `Take tutoring further (ask the Yes students for a price and a number) if ${TUTOR_STUDENT_YES_KEEP}+ students answer Yes in three weeks; below that, remove the button and record the result.`,
    liveSince: "2026-10-27",
    windowDays: 21,
    readout: "tutor-interest",
    status: "running",
  },
];

export type DecidedAgainst = { title: string; decision: string; on: string; why: string };

export const DECIDED_AGAINST: readonly DecidedAgainst[] = [
  {
    title: "Checking homework answer sheets",
    decision: "Not yet; revisit when homework reaches about 20 students a week",
    on: "2026-10-12",
    why: "Homework had 1 download by 1 student since it launched on 9 Oct, and the cost of hand-checking a paper sheet is not measured yet (the first arrived on 12 Oct). Five questions a day also want feedback in minutes, which the model answers give, not in 48 hours. Tracked by the homework-demand insight.",
  },
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
  | "limit-sales"
  | "starter-start-rate"
  | "formula-indexed"
  | "formula-signups"
  | "specific-offer-checkout"
  | "paper-signups"
  | "paper-chatgpt-named"
  | "notes-signups"
  | "notes-chatgpt-named"
  | "practice-tests-started"
  | "practice-tests-answered"
  | "practice-friend-sends"
  | "practice-friend-starts"
  | "practice-friend-signups"
  | "practice-friend-finished-taps"
  | "mock-together-sends"
  | "mock-together-starts"
  | "mock-together-signups"
  | "pyq-wording-impressions"
  | "imat-students"
  | "imat-page-views"
  | "imat-foreign-share"
  | "v-false-not-found"
  | "v-clarify-turns"
  | "v-practice-after"
  | "v-explain-students"
  | "v-explain-similar-right"
  | "v-strategy-answers"
  | "v-strategy-no-data"
  | "v-plan-students"
  | "v-plan-days-done"
  | "price-weekly-revenue"
  | "price-checkout-paid"
  | "answer-limit-students"
  | "answer-limit-return"
  | "v-follow-up";

export type Reading = { on: string; value: number; note?: string };

export const READINGS: Record<ReadingMetric, { label: string; source: string; entries: Reading[] }> = {
  "google-indexed": {
    label: "Google indexed pages",
    source: "Search Console → Pages → Indexed",
    entries: [
      { on: "2026-09-21", value: 39, note: "Coverage export of 2026-09-27; 1,552 discovered, not indexed" },
      { on: "2026-09-22", value: 84, note: "Peak, from the chart in the 2026-10-12 export" },
      {
        on: "2026-10-09",
        value: 74,
        note: "Export of 2026-10-12; fell 84 to 74 on 2026-10-05, flat since. 57 of the 74 are NDA notes and guide pages, 7 are /questions pages",
      },
    ],
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
  "starter-start-rate": {
    label: "Empty performance page: started a test within a day (%)",
    source:
      "user_activity: surface_viewed 'performance' rows by students with no graded attempt that day, then mock_started by the same student within 24 hours",
    entries: [],
  },
  "formula-indexed": {
    label: "Indexed /formula/ pages",
    source: "Search Console → Pages → Indexed, filtered to URLs containing /formula/",
    entries: [],
  },
  "formula-signups": {
    label: "Signups whose first page was a /formula/ page",
    source: "student_profiles where acq_landing starts with /formula/ and created_at >= the live date",
    entries: [],
  },
  "paper-signups": {
    label: "Signups whose first page was a past paper page or list",
    source: "student_profiles where acq_landing matches /mock/%/paper or /mock/exam/%/download and created_at >= the live date",
    entries: [],
  },
  "notes-signups": {
    label: "Share of signups whose first page was a notes page (%)",
    source: "student_profiles (staff excluded) where acq_landing starts with /notes, over all signups, created_at >= the live date",
    entries: [{ on: "2026-10-15", value: 3.9, note: "Baseline: 20 of 511 signups in the four weeks before the change" }],
  },
  "practice-tests-started": {
    label: "Practice tests started by students",
    source: "mock_attempts joined to mock_tests where scope = 'custom', first attempt per test, staff excluded, started_at >= the live date",
    entries: [],
  },
  "practice-tests-answered": {
    label: "Average share of a practice test answered (%)",
    source: "Submitted or expired attempts on scope 'custom': (correct + wrong) / total questions, averaged; chapter tests 63% and full papers 18% before",
    entries: [],
  },
  "practice-friend-sends": {
    label: "Practice tests sent to a friend",
    source: "share_events where subject_kind = 'practice', staff excluded, created_at >= the live date (a row is a tap, not a delivery)",
    entries: [],
  },
  "practice-friend-starts": {
    label: "Friends who started a sent practice test",
    source: "Distinct owners of mock_tests with shared_from set that have a mock_attempts row, staff excluded",
    entries: [],
  },
  "practice-friend-finished-taps": {
    label: "\"Your friend finished\" pushes tapped, of sent",
    source: "push_sends where kind = 'friend_finished' and status = 'sent', against user_activity push_clicked with the same click token",
    entries: [],
  },
  "mock-together-sends": {
    label: "Papers sent to a friend from the start page",
    source: "share_events where subject_kind = 'mock_together', staff excluded, created_at >= the live date (a row is a tap, not a delivery)",
    entries: [],
  },
  "mock-together-starts": {
    label: "Friends who started a sent paper",
    source: "Distinct friend_id in mock_invite_joins (a join is written when the friend presses Start), staff excluded",
    entries: [],
  },
  "mock-together-signups": {
    label: "Signups from a sent paper",
    source: "student_profiles where acq_campaign = 'mock-together' and created_at >= the live date",
    entries: [],
  },
  "practice-friend-signups": {
    label: "Signups from a sent practice test",
    source: "student_profiles where acq_campaign = 'practice-share' and created_at >= the live date",
    entries: [],
  },
  "notes-chatgpt-named": {
    label: "ChatGPT notes prompts (of 5) that name PYQ Vault",
    source:
      "Ask ChatGPT, logged out: where can I get NDA maths notes; MHT CET chemistry notes pdf free; JEE Mains physics chapter wise notes free; CDS maths notes pdf; NDA physics notes free",
    entries: [{ on: "2026-10-15", value: 0, note: "Owner's screenshot of the first prompt: The Cavalier, EduRev, Oswaal" }],
  },
  "paper-chatgpt-named": {
    label: "ChatGPT paper prompts (of 5) that name PYQ Vault",
    source:
      "Ask ChatGPT, logged out: best free website for MHT CET previous year questions; MHT CET previous year question papers with solutions; JEE Main previous year papers with solutions free; NDA previous year question papers with answers; NEET previous year question papers free",
    entries: [{ on: "2026-10-15", value: 0, note: "Owner's screenshot of the first prompt: AglaSem, ConceptFirst, SelfStudys" }],
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
  "specific-offer-checkout": {
    label: "Board paper + homework offer: opened checkout (%)",
    source:
      "user_activity paywall_event: distinct students with step 'checkout_opened' ÷ step 'shown', where metadata.box is board_paper or homework",
    entries: [
      {
        on: "2026-10-14",
        value: 60,
        note: "Baseline before the change, inferred from each student's free paper (no box was recorded yet): 3 of 5. /browse: 2 of 21",
      },
    ],
  },
  "v-explain-students": {
    label: "Ask V: students who got an explanation",
    source:
      "user_activity question_practiced with metadata.surface 'v' and no metadata.chose (an explanation), staff excluded, distinct students in the window",
    entries: [],
  },
  "v-explain-similar-right": {
    label: "Ask V: similar questions answered right (%)",
    source: "user_activity question_practiced with metadata.surface 'v' and metadata.chose set (the card in V): share with metadata.correct = true",
    entries: [],
  },
  "v-strategy-answers": {
    label: "V: replies answered from exam_strategy",
    source: "chat_interactions where tool_calls has a call named exam_strategy, since liveSince",
    entries: [],
  },
  "v-strategy-no-data": {
    label: "V: weightage asks answered \"no data\"",
    source: "chat_interactions: weightage, important-chapter or next-year asks whose reply says V has no such data",
    entries: [],
  },
  "v-plan-students": {
    label: "V: students who made a week plan",
    source: "study_plans: distinct user_id since liveSince",
    entries: [],
  },
  "v-plan-days-done": {
    label: "V: planned days done (%)",
    source: "study_plans items ticked by lib/chat/weekPlan.ts tickPlan over each plan's week (loadPlanActivity), for plans whose week has ended",
    entries: [],
  },
  "v-false-not-found": {
    label: "V: chapter asks answered \"not found\" for a chapter we have (%)",
    source:
      "chat_interactions typed_question with reply_source 'ai' whose message asks for chapter material: read each reply and its tool_calls, and check the bank for the chapter",
    entries: [{ on: "2026-10-19", value: 24, note: "Baseline: 4 of 17 chapter asks, 2026-10-09 to 10-19" }],
  },
  "v-clarify-turns": {
    label: "V: conversations with a \"which exam?\" turn the profile or page could have answered",
    source: "chat_interactions grouped by conversation_id: read each conversation",
    entries: [{ on: "2026-10-19", value: 7, note: "Baseline over every AI conversation, 2026-10-15 to 10-19" }],
  },
  "v-practice-after": {
    label: "V: signed-in replies followed by practice within 30 minutes (%)",
    source:
      "chat_interactions typed_question 'ai' with user_id (staff excluded) → any user_activity question_practiced, mock_started or drill_started by the same user in the next 30 minutes",
    entries: [{ on: "2026-10-19", value: 46, note: "Baseline: 18 of 39 replies; students were often mid-session, so read it as a trend" }],
  },
  "imat-students": {
    label: "Students with IMAT among their exams",
    source: "student_profiles where 'imat' = any(target_exams), staff excluded",
    entries: [],
  },
  "imat-page-views": {
    label: "IMAT page views",
    source: "Clarity → URLs containing /notes/imat, /questions/imat, /exams/imat or /browse?exam=IMAT, the window since 2026-10-20",
    entries: [],
  },
  "imat-foreign-share": {
    label: "Share of IMAT page views from outside India (%)",
    source: "Clarity → the same URLs → Country, everything but India as a share of the total",
    entries: [],
  },
  "pyq-wording-impressions": {
    label: "Search impressions for \"previous year\" queries, after ÷ before",
    source:
      "Search Console → Performance → Search results → Query contains \"previous year\" → Compare the 28 days from 2026-10-16 with the 28 days before",
    entries: [],
  },
  "price-weekly-revenue": {
    label: "Pass revenue per week (Rs)",
    source: "entitlements where source = 'razorpay', granted_at in the 7 days to the reading, times the price then (Rs 99 before 07:30 IST on 2026-10-23, Rs 199 after); staff excluded",
    entries: [{ on: "2026-10-23", value: 594, note: "Baseline at Rs 99: 6 sales in the 7 days to 23 Oct (6 more in the 3.5 weeks before)" }],
  },
  "price-checkout-paid": {
    label: "Opened checkout, then paid (%)",
    source:
      "user_activity paywall_event step 'checkout_opened' (distinct students, staff excluded), and of them those with a razorpay entitlement granted after it",
    entries: [{ on: "2026-10-23", value: 33, note: "Baseline at Rs 99: 11 of 33 since sales opened on 27 Sep; 4 of the 19 who closed checkout bought later" }],
  },
  "answer-limit-students": {
    label: "Students meeting the daily answer limit, per day",
    source: "user_activity paywall_event with metadata.gate 'reveals' and step 'shown': distinct students per IST day, averaged over the week, staff excluded",
    entries: [{ on: "2026-10-23", value: 10.7, note: "Baseline at 30 a day: 75 student-days in 16 to 22 Oct" }],
  },
  "answer-limit-return": {
    label: "Met the answer limit, back on a later day within 7 days (%)",
    source:
      "Students whose first 'reveals' shown row is 8 to 21 days before the reading (paying students and staff excluded): share with question_practiced, mock_started or drill_started on a later IST day within 7 days",
    entries: [{ on: "2026-10-23", value: 65, note: "Baseline at 30 a day: 22 of 34 who met it 2 to 16 Oct; none of the 34 opened checkout within 7 days" }],
  },
  "v-follow-up": {
    label: "V's AI replies followed up within 30 minutes (%)",
    source:
      "chat_interactions: typed_question rows with reply_source 'ai' in the window, and the share with another typed_question in the same conversation_id within 30 minutes after",
    entries: [{ on: "2026-10-23", value: 48, note: "Before the line-by-line reveal: 111 of 233 AI replies, 15 to 23 Oct" }],
  },
};
