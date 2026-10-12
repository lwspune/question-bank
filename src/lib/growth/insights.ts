/**
 * What we have learned about students, written as data. /dashboard/growth
 * renders it next to the experiments (2026-10-12, owner's request).
 *
 * An EXPERIMENT is a change we made, judged by a rule. An INSIGHT is an
 * observation (ChatGPT visitors skim, Google visitors browse), with the
 * evidence, a way to measure it again, and every re-check since. Insights are
 * often what experiments come from, and a re-check is how we notice one has
 * stopped being true.
 *
 * Like the registry, this changes by commit: a new insight or a re-check is a
 * dated entry in git. To re-check, run each due insight's `howToCheck`, then
 * append a check (oldest first) with the numbers and a verdict.
 *
 * Pure: no React, no DB. Spec: tests/growth-insights.test.ts.
 */

/** Days between re-checks unless an insight sets its own. */
export const INSIGHT_RECHECK_DAYS = 14;

export type InsightVerdict = "holds" | "stronger" | "weaker" | "reversed" | "mixed";

export type InsightCheck = {
  /** ISO day the numbers were read. */
  on: string;
  verdict: InsightVerdict;
  /** The numbers behind the verdict, in a sentence or two. */
  numbers: string;
};

export type Insight = {
  id: string;
  /** The claim, in one line. */
  title: string;
  /** What we saw, with the numbers. */
  finding: string;
  /** Where the numbers came from, and over what dates. */
  source: string;
  confidence: "low" | "medium" | "high";
  /** ISO day it was first written down. */
  firstSeen: string;
  /** Days between re-checks; INSIGHT_RECHECK_DAYS when unset. */
  recheckDays?: number;
  /** Exactly how to measure it again (query, tool, steps). */
  howToCheck: string;
  /** Re-checks, oldest first. */
  checks: InsightCheck[];
  /** open: still being watched. confirmed: held up, checked less often. retired: no longer true or no longer useful. */
  status: "open" | "confirmed" | "retired";
  /** What we did because of it, if anything. */
  actedOn?: string;
  /** An experiment in lib/growth/registry.ts it led to. */
  experimentId?: string;
};

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** The latest re-check's day, or the day it was first seen. */
export function lastCheckedOn(i: Insight): string {
  return i.checks.length ? i.checks[i.checks.length - 1].on : i.firstSeen;
}

export function nextCheckOn(i: Insight): string {
  return addDays(lastCheckedOn(i), i.recheckDays ?? INSIGHT_RECHECK_DAYS);
}

/** Due for a re-check on `today` (ISO). A retired insight never is. */
export function isDue(i: Insight, today: string): boolean {
  return i.status !== "retired" && nextCheckOn(i) <= today;
}

export function latestVerdict(i: Insight): InsightVerdict | null {
  return i.checks.length ? i.checks[i.checks.length - 1].verdict : null;
}

/** Due first (most overdue first), then the rest by next check date, retired last. */
export function sortForReview(list: readonly Insight[], today: string): Insight[] {
  const rank = (i: Insight) => (i.status === "retired" ? 2 : isDue(i, today) ? 0 : 1);
  return [...list].sort((a, b) => rank(a) - rank(b) || nextCheckOn(a).localeCompare(nextCheckOn(b)));
}

const BOARD_EXAMS = "mh-hsc-12, cbse-12, mh-ssc-10, cbse-10, cbse-11, mh-sb-11, mh-sb-9";

export const INSIGHTS: readonly Insight[] = [
  {
    id: "chatgpt-vs-google",
    title: "ChatGPT brings one-question visitors, and the ones who sign up are our most engaged",
    finding:
      "Clarity, 11 Oct (250 recordings, about 12 hours): visits tagged utm_source=chatgpt.com were 15% of sessions. 34% of them opened an answer (Google 24%), but 53% left after one page and 34% saw 3+ pages, against Google's 35% and 65%. Google visitors also stayed longer (166 s active vs 92 s).",
    source: "Clarity session recordings, 11 Oct 2026; student_profiles.acq_source with user_activity, 28 days to 12 Oct",
    confidence: "medium",
    firstSeen: "2026-10-12",
    howToCheck:
      "Database: student_profiles created in the last 28 days (staff and superadmins excluded), grouped by acq_source (chatgpt.com vs google): signups, share with a question_practiced, mock_submitted or drill_completed row, and share with any user_activity on a later IST day (only accounts 2+ days old). Clarity (costs one of the 10 daily requests, ask first): 250 recordings, split by utm_source=chatgpt.com on the entry URL vs a google.com referrer; median active time, one-page share, share that opened an answer.",
    checks: [
      {
        on: "2026-10-12",
        verdict: "mixed",
        numbers:
          "Visits (Clarity) as above. Signups (database, 28 days) point the other way: ChatGPT 132 signups, 78% practised, 50% came back on a later day; Google 49 signups, 63% and 40%; unknown source 155, 61% and 37%.",
      },
    ],
    status: "open",
  },
  {
    id: "clarity-hides-chatgpt",
    title: "Clarity files ChatGPT visits under Other, so count them from the link tag",
    finding:
      "ChatGPT links carry utm_source=chatgpt.com and no referrer. Clarity's channel report showed chatgpt.com as the referrer on 4 sessions over 10 to 12 Oct, while 38 of 250 recordings (15%) entered on a chatgpt.com-tagged URL. 681 of about 880 sessions sat under Other with no referrer.",
    source: "Clarity dashboard (channel and referrer, 10 to 12 Oct) and recordings (11 Oct)",
    confidence: "high",
    firstSeen: "2026-10-12",
    recheckDays: 30,
    howToCheck:
      "Clarity (ask first): one dashboard query for sessions by channel and referrer over the last 3 days, and the recordings already pulled that day; compare the chatgpt.com referrer row with the count of entry URLs carrying utm_source=chatgpt.com.",
    checks: [],
    status: "open",
  },
  {
    id: "board-class-12-core",
    title: "The core student is Maharashtra Class 12 (HSC with MHT-CET), then CBSE 12",
    finding: `Of 266 signups in the 28 days to 12 Oct that picked an exam, 178 (67%) included a board exam; in the last 7 days 88 of 120 (73%). Most picked: MHT-CET 106, MH HSC 12 98, JEE Mains 81, NDA 57, CBSE 12 50; about 47 picked HSC together with MHT-CET. Board exams' share of signed-in answers rose from 38% (28 days) to 49% (7 days). Clarity on 11 Oct: chapter, board, paper and notes pages visited were MH HSC 12 107, CBSE 12 77, SSC 10 54, NDA about 19.`,
    source: "student_profiles.target_exams; user_activity joined to questions.exam_id; Clarity recordings 11 Oct",
    confidence: "high",
    firstSeen: "2026-10-12",
    howToCheck: `Database, staff and superadmins excluded: student_profiles from the last 28 and 7 days, share whose target_exams include a board exam (${BOARD_EXAMS}), signups per exam, and the most common pairs. Then question_practiced, answer_wrong and answer_correct joined to questions: board exams' share of answers over 28 days vs 7 days.`,
    checks: [],
    status: "open",
  },
  {
    id: "board-students-skip-tests",
    title: "Board students practise in the bank and the book reader, not in tests",
    finding:
      "28 days to 12 Oct, answers on board-exam questions: bank 1,623 (77 students), book reader 1,076 (61), mocks and chapter tests 100 (12), drill 58 (12). Entrance-exam students answered 1,546 in mocks (73 students).",
    source: "user_activity (question_practiced, answer_wrong, answer_correct) joined to questions, by metadata.surface",
    confidence: "medium",
    firstSeen: "2026-10-12",
    howToCheck:
      "Database: the same answers over 28 days, grouped by board vs other exams and by metadata.surface (no surface = a mock answer); answers and distinct students per group.",
    checks: [],
    status: "open",
  },
  {
    id: "download-box-signups",
    title: "Download-box signups skip the welcome screen and rarely come back",
    finding:
      "Since 6 Oct, signing up through the download box's Google button skips /welcome by design. In 14 days: 52 such accounts, 50 never saw the welcome screen and 51 picked no exam. 25% practised (79% for other signups); 5 of 20 old enough came back on a later day (49%). Since 8 Oct, 26 of 37 downloaded, almost all within 2 minutes; 11 did nothing after signing in.",
    source: "auth.users signup_source = download_box; student_profiles; export_events; user_activity; 14 days to 12 Oct",
    confidence: "medium",
    firstSeen: "2026-10-12",
    recheckDays: 7,
    howToCheck:
      "Database, last 14 days, accounts whose signup_source is download_box: share never onboarded, share that practised, share back on a later day, and how many have an export_events row. For those with none, count surface_viewed rows with surface download_box vs download_box_over_cap (recorded since 12 Oct): over_cap means the 200-question limit stopped them.",
    checks: [],
    status: "open",
    actedOn:
      "12 Oct: the box now says a selection over 200 is too big before asking anyone to sign in or pay, and records which download view a signed-in student meets. Not built yet: asking the exam right after a download-box signup.",
  },
  {
    id: "me-waypoint",
    title: "After signing in, /me was a stop on the way to somewhere else",
    finding:
      "Clarity, 10 to 12 Oct: /me had 80 quick-backs over 63 sessions. The 13 recorded /me visits stayed 2 to 23 seconds, then went to mocks, board, notes or drill. The header's Sign in sent everyone to /me, even from a chapter page.",
    source: "Clarity dashboard (quick-backs by page) and recordings",
    confidence: "medium",
    firstSeen: "2026-10-12",
    howToCheck:
      "Clarity (ask first): quick-backs by page URL for the last 3 days; compare /me's quick-backs per session with 80 over 63. Lower means students now land where they meant to.",
    checks: [],
    status: "open",
    actedOn: "12 Oct (pushed): the header and report-dialog Sign in links return students to the page they were on.",
  },
  {
    id: "search-unused",
    title: "Almost nobody types a search on /browse",
    finding:
      "1 of 216 /browse page views in 250 recordings carried a typed search (complex numbers). The text entries Clarity logged on /browse were filter checkboxes. Students navigate by exam, subject and chapter.",
    source: "Clarity recordings, 11 Oct",
    confidence: "medium",
    firstSeen: "2026-10-12",
    recheckDays: 30,
    howToCheck: "Clarity recordings (ask first): share of /browse URLs in the page timelines that carry q=.",
    checks: [],
    status: "open",
  },
  {
    id: "dead-taps-are-reading",
    title: "Clarity's dead and rage taps here are mostly students selecting text",
    finding:
      "Every top dead or rage-tap page traced on 12 Oct was one student selecting text while reading: the MHT-CET Beats notes page (22 rage taps), the /browse solution text, CBSE 11 Binomial. Each burst came with a Selected Text event. The one real problem found that way was the download box's 200-question limit.",
    source: "Clarity dashboard and recordings, 10 to 12 Oct",
    confidence: "high",
    firstSeen: "2026-10-12",
    recheckDays: 60,
    howToCheck:
      "For any page Clarity ranks high on dead or rage taps, pull its recordings and check whether the taps come from one session and land on prose with Selected Text beside them, before calling the page broken.",
    checks: [],
    status: "confirmed",
  },
  {
    id: "notes-little-used",
    title: "Signed-in students barely use notes",
    finding:
      "7 days to 12 Oct: 14 notes checkpoints from 4 students, against 2,665 answers opened by 148 students. A floor: a notes visit may record less than other pages do.",
    source: "user_activity, 7 days to 12 Oct",
    confidence: "low",
    firstSeen: "2026-10-12",
    howToCheck:
      "Database, last 7 days: note_checkpoint and chapter_mastered rows and students, beside question_practiced. First check what a notes visit records (a surface_viewed row would settle it) before trusting a low number.",
    checks: [],
    status: "open",
  },
  {
    id: "homework-demand",
    title: "Homework downloads and answer-sheet checks are both near zero so far",
    finding:
      "By 12 Oct: homework (launched 9 Oct) had 1 download by 1 student; board past papers (launched 10 Oct) 17 downloads by 3 students; answer-sheet checking (launched 11 Oct) 1 sheet. Too early to tell demand from discovery.",
    source: "export_events (mode homework; board_paper_id set; staff excluded) and answer_submissions, to 12 Oct",
    confidence: "low",
    firstSeen: "2026-10-12",
    howToCheck:
      "Database: export_events with mode = 'homework' and not is_staff, last 7 days, downloads and distinct students; the same for board_paper_id is not null; answer_submissions per week. Also note how long each checked sheet took (from the grading sessions), which is what decides whether checking can grow.",
    checks: [],
    status: "open",
    actedOn: "12 Oct: decided not to add checking to homework until it reaches about 20 students a week (see Decided against).",
  },
  {
    id: "browse-slow-distance",
    title: "/browse is slow because each database call crosses from Washington to Mumbai",
    finding:
      "As the first page of a visit /browse loads in a median 4.3 s on phones (chapter pages 2.2 s). A database call does 3 to 10 ms of work but takes 222 ms (623 ms at p90) from Vercel's iad1; callers in Mumbai get 8 ms. /browse makes 2 calls in a row signed out and about 4 signed in.",
    source: "Clarity recordings 11 Oct; Supabase edge logs and live timing, 12 Oct",
    confidence: "high",
    firstSeen: "2026-10-12",
    recheckDays: 30,
    howToCheck:
      "Time one filtered /browse URL 4 times with curl (first byte and total) and read x-vercel-id; Supabase edge_logs for /rest/v1 calls grouped by request.cf.colo (IAD vs BOM), median and p90 origin_time.",
    checks: [],
    status: "open",
    actedOn: "Logged in SUGGESTIONS.md on 12 Oct: run /browse in bom1 (about $3 a month). Deferred by the owner.",
  },
];
