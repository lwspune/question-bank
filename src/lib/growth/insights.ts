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
    checks: [
      {
        on: "2026-10-20",
        verdict: "holds",
        numbers:
          "14 days to 20 Oct IST, staff excluded: 197 download-box signups (about 15 a day, up from about 4), 195 never saw /welcome, 194 picked no exam. 30% practised (question, mock, drill or notes checkpoint) vs 78% of the 471 other signups; 37 of 168 old enough came back on a later day (22%, vs 44%). 158 downloaded (149 within 2 minutes); of the 39 who did not, 11 saw the download box and none saw download_box_over_cap, so the 200-question limit is not what stops them.",
      },
    ],
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
    id: "notes-reading-before-scores",
    title: "Does reading a chapter's notes come before doing better on it?",
    finding:
      "Not measured yet: until 19 Oct nothing recorded a signed-in student reading a page, only answering. From 19 Oct every notes, /board, /questions, guide, formula and past-paper page a signed-in student opens is a surface_viewed row with metadata.path.",
    source: "user_activity surface_viewed with metadata.path, from 2026-10-19",
    confidence: "low",
    firstSeen: "2026-10-19",
    recheckDays: 14,
    howToCheck:
      "Database, staff excluded: (1) reach first: students and distinct pages per surface (notes, board, questions, guide, formula, question_papers, past_paper) since 19 Oct, beside question_practiced students. (2) Then per notes chapter (metadata.path /notes/<subjectRoute>/<chapterSlug>/..., mapped to the DB chapter through the NOTES_CHAPTERS registry): question_practiced rows with metadata.correct on that chapter in the 7 days after a read, against the same students' rows before the read and against students who practised the chapter without reading. A correlation at best: readers choose to read.",
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
  {
    id: "gulf-students-cannot-pay",
    title: "Gulf students reach the pass offer, but a card issued abroad cannot pay",
    finding:
      "Since signup country was recorded (9 Oct): 3 of 199 signups abroad (Qatar, UAE, Saudi Arabia), all Class 12 on NEET, JEE or CBSE 12. The Qatar student answered about 45 questions in an hour, met the daily answer wall and left without opening checkout. Razorpay's international cards were not switched on (checked 13 Oct), so a Gulf-issued card could not have paid. The daily limit resets at midnight IST, 21:30 to 22:30 in the Gulf.",
    source: "student_profiles.signup_country; user_activity paywall_event (metadata.country); Razorpay dashboard; 9 to 13 Oct",
    confidence: "low",
    firstSeen: "2026-10-13",
    howToCheck:
      "Database: signups by signup_country (not IN); for those, paywall_event rows by metadata.step (shown, checkout_opened) and razorpay entitlements. Razorpay dashboard: international cards on, and payments with a non-Indian card.",
    checks: [],
    status: "open",
    actedOn:
      "13 Oct: owner to request international cards on Razorpay. Not built: a local-currency hint on /pricing or 'resets at midnight IST' wording; only if more Gulf students meet the wall.",
  },
  {
    id: "no-referrer-signups",
    title: "Signups with no referrer grew from a fifth to over half, with no landing page to say where they came in",
    finding:
      "ChatGPT (about 10 a day) and Google (2 or 3) stayed steady; from 9 Oct almost all growth was signups with no channel (16 to 32 a day, 52% to 13 Oct; 20 to 25% in September). 44 of 130 since 9 Oct came through the download box. A visit with no referrer and no tag was not stored at all, so these rows had no landing page either. Clarity, 10 to 12 Oct: 681 of about 880 sessions had no referrer.",
    source: "student_profiles.acq_*; auth.users signup_source; Clarity channel report; 14 Sep to 13 Oct",
    confidence: "medium",
    firstSeen: "2026-10-13",
    howToCheck:
      "Database, signups since 13 Oct: count by acq_source (null, direct, chatgpt.com, google), then group the direct ones by acq_landing. A landing on /question-papers, /formula or /results points at what is being shared or bookmarked.",
    checks: [],
    status: "open",
    actedOn:
      "13 Oct: a direct visit is now stored with its landing page and replaced by the first named channel. /dashboard/pmf shows it as 'Direct (no referrer, from 13 Oct)'.",
  },
  {
    id: "heavy-users-leave-at-the-exam",
    title: "Our heaviest users were an exam-week cohort, and they left the week they sat the exam",
    finding:
      "All time to 15 Oct, the top 10% of students (57, each 149+ answers) gave 68% of all answers; 44 of them were NDA mock-takers and 93% of their answers came from mocks. NDA mocks per week climbed 51, 86, 116, then 254 in the week to 13 Sep (NDA 2), then 26, then 1 to 3. None of the 44 sat a mock after 22 Sep, and only 9 of the 31 students with 5+ NDA mocks did anything at all after 16 Sep. The NDA result card (10 Oct) brought 5 of those 31 back.",
    source: "mock_attempts joined to mock_tests and exams; user_activity; student_results; staff and superadmins excluded; July to 15 Oct",
    confidence: "high",
    firstSeen: "2026-10-15",
    recheckDays: 60,
    howToCheck:
      "Database, staff excluded: NDA mock_attempts per IST week, and per student the date of their last NDA mock. Before NDA 1 2027 (April): does the weekly count climb the same way, and do September's 5+-mock students come back for it (any user_activity in the 6 weeks before the exam)?",
    checks: [],
    status: "open",
  },
  {
    id: "heavy-users-wait-out-the-wall",
    title: "Heavy users who meet the daily answer limit come back tomorrow instead of paying",
    finding:
      "Top 10% of the last 28 days (39 students, 68+ answers each, 48% of all answers): 19 met a paywall. 13 met the daily answer limit; 11 of them practised again on a later day and none opened checkout. Across all 39, 3 ever opened checkout and 1 paid. They study in bursts: about 5 active days over 10, 60 to 70 answers on their best day. 44% used drill and 44% saved a question (14% and 16% for students with 10 to 67 answers); 8% used notes.",
    source: "user_activity (question_practiced, paywall_event by metadata.gate and step, drill_completed, question_bookmarked) and mock_attempts; entitlements; 28 days to 15 Oct",
    confidence: "medium",
    firstSeen: "2026-10-15",
    howToCheck:
      "Database, staff excluded, last 28 days: rank students by answers (question_practiced rows plus correct and wrong counts of finished mock_attempts) and take the top 10%. For them: share with a paywall_event shown, split by metadata.gate; of those who met 'reveals', how many practised on a later IST day and how many have a checkout_opened row; razorpay entitlements.",
    checks: [],
    status: "open",
  },
  {
    id: "day-one-bank-beats-mock",
    title: "A first-day mock brings volume, not return; first-day bank practice and saving bring return",
    finding:
      "Signups 16 Sep to 7 Oct (213, after the NDA exam so its leavers do not skew it), share active on 3+ days: all 16%; first 24 hours a mock 14% (43); 10+ bank answers and no mock 28% (57); 1 to 9 bank answers 16%; nothing 6% (62); saved a question 36% (22); answered in the book reader 35% (31). The wider window from 10 Sep gave the same order. One mock is about 100 answers, so a mock taker counts as heavy by volume while coming back no more often than average. These are correlations: students who save may simply be more motivated.",
    source: "student_profiles.created_at; user_activity in the first 24 hours and active IST days since; signups 16 Sep to 7 Oct, read 15 Oct",
    confidence: "medium",
    firstSeen: "2026-10-15",
    howToCheck:
      "Database, staff excluded: signups 8 to 35 days old. Bucket by their first 24 hours (any mock_submitted; else question_practiced 10+, 1 to 9, none; separately any question_bookmarked; any question_practiced with metadata.surface = 'board'), then the share with question_practiced, mock_submitted or drill_completed on 3+ distinct IST days.",
    checks: [],
    status: "open",
  },
  {
    id: "staff-marked-clearers-mocked-more",
    title: "NDA students marked as cleared had sat more mocks than those who said they did not clear",
    finding:
      "NDA 2 2026 written result: the 10 marked cleared (all by staff) averaged 8.1 NDA mocks and 26% average score, 8 of 10 had taken one. The 18 who said they did not clear averaged 2.2 mocks and 7%, and only 9 had taken one. Small and selected: staff marked only students they knew had cleared, so this says nothing yet about whether mocks help.",
    source: "student_results joined to NDA mock_attempts, 15 Oct",
    confidence: "low",
    firstSeen: "2026-10-15",
    recheckDays: 30,
    howToCheck:
      "Database: student_results by source and outcome, each with that student's NDA mock count and average score/max_score. Worth re-reading only once 20+ students have answered for themselves (source = 'self') on both sides.",
    checks: [],
    status: "open",
  },
  {
    id: "notes-pdf-collectors",
    title: "Students collect notes as PDFs, one chapter after another",
    finding:
      "Clarity, 14 Oct (250 recordings, 15:30 to 24:00 IST): 9 sessions opened a notes handout or tapped Download as PDF. One went through 14 MHT-CET Physics chapters in about 6 minutes: 4 to 8 s on each chapter page, then about 20 s on its print page, then back to the hub. That one session is most of the 68 quick-backs Clarity counted on /notes/mht-cet that day. Two students signed in through \"Sign in to download as PDF\" first. Next to notes-little-used: notes may be read later, from the file, not on the site.",
    source: "Clarity dashboard (quick-backs by page) and recordings, 14 Oct",
    confidence: "low",
    firstSeen: "2026-10-15",
    howToCheck:
      "Clarity recordings (ask first): sessions with a /notes/print/ page, and the most distinct print pages in one session. Database: surface_viewed rows with metadata.surface = 'handout' (one per page load and no chapter recorded, so a floor).",
    checks: [],
    status: "open",
  },
  {
    id: "handout-freezes-phones",
    title: "On a budget phone, a maths-heavy notes handout freezes the page before the PDF opens",
    finding:
      "Clarity, 14 Oct: a student signed in to download notes, saved Measures of Dispersion, then tapped Download as PDF on MHT-CET Indefinite Integration 7 times over three visits; the handout never appeared and each time the next page recorded was a fresh load of the Google landing page. Emulating a budget Android phone (CPU 6x slower) on the live site, the in-app tap to that handout took 76 s to finish drawing with one 52 s freeze (1,493 equations, 158k elements); Measures of Dispersion took 26 s with a 12 s freeze; a fast laptop takes 3 s. Each equation is a client component the phone draws again although the server already drew it. 71 of 266 chapters carry at least Measures of Dispersion's math, 16 at least Indefinite Integration's.",
    source: "Clarity recordings 14 Oct; headless Edge with CPU throttling against www.pyqvault.com, 15 Oct; math counted in each chapter's _data",
    confidence: "medium",
    firstSeen: "2026-10-15",
    howToCheck:
      "Re-run the throttled-phone timing (CDP Emulation.setCPUThrottlingRate 6, in-app push to /notes/print/mht-cet-maths/indefinite-integration) and read the longest task. Clarity recordings (ask first): sessions that tap Download as PDF with no /notes/print/ page after it.",
    checks: [],
    status: "open",
  },
  {
    id: "past-papers-sat-whole",
    title: "Students work through whole board past papers and read the model answers",
    finding:
      "Clarity, 14 Oct, four days after /question-papers opened: 20 of 250 sessions (8%) used it, with 40 taps on Show model answer. One student spent about 2.5 hours on three MH HSC Physics papers (23 to 49 minutes on each); another went through four MH HSC Maths papers, opening the answers.",
    source: "Clarity recordings, 14 Oct",
    confidence: "low",
    firstSeen: "2026-10-15",
    howToCheck:
      "Clarity recordings (ask first): share of sessions touching /question-papers, Show model answer taps, and the longest time on one paper page. Database: answer_sheets uploads per day, the step after sitting a paper on paper.",
    checks: [],
    status: "open",
  },
  {
    id: "paper-download-taps-few-downloads",
    title: "Few taps on a past paper's download button become downloads",
    finding:
      "Clarity, 14 Oct: 14 taps on \"Download paper and answer\" across 20 /question-papers sessions in half a day, while board_paper_downloads recorded 2 for the whole day. In the sessions traced, the box ended in a dismissed prompt (\"Not now\", or \"Maybe later\" on the mobile-number ask). A baseline for the specific pass offer, live from 15 Oct.",
    source: "Clarity recordings and board_paper_downloads, 14 Oct",
    confidence: "low",
    firstSeen: "2026-10-15",
    recheckDays: 7,
    howToCheck:
      "Clarity recordings (ask first): taps on \"Download paper and answer\" and what each session did next. Database, the same day: board_paper_downloads rows, and paywall_event rows whose metadata.box is board_paper.",
    checks: [],
    status: "open",
    experimentId: "specific-offer",
  },
  {
    id: "v-on-screen-asks",
    title: "Students ask V about the question on their screen, which V cannot see",
    finding:
      "In the first two days of V's AI answers (15 Oct 21:16 to 17 Oct IST), 4 of 15 people typing to V asked about what was in front of them: \"δ ye ky hai\" on a differentiation page, \"in this 3rd question does it follow Markovnikov rule\", \"provide those questions in hindi\", \"Diamagnetic and paramagnetic imp point\" on a board chapter. V answered that it cannot see the page. Of the 29 messages, about 9 asked to find a chapter or notes and about 8 were chat or off-topic.",
    source: "chat_interactions typed_question rows, staff and superadmins excluded, 15 Oct 21:16 to 17 Oct 23:59 IST",
    confidence: "low",
    firstSeen: "2026-10-18",
    recheckDays: 7,
    howToCheck:
      "Database: chat_interactions rows with event_type typed_question since the last check, user_id not in platform_admins or org_members (signed-out rows have no user_id; count them by conversation_id). Read every message and count the people asking about the question or page in front of them (a symbol, \"this question\", \"these questions\", a point from the open chapter) against everyone who typed. Build \"explain this question\" only if the share holds near a quarter on more people.",
    checks: [],
    status: "open",
  },
  {
    id: "signups-rarely-meet-an-offer",
    title: "Most signups never meet a pass offer; those who open checkout buy 1 in 3",
    finding:
      "Since sales opened (27 Sep to 23 Oct, all at Rs 99): 1,012 signups, 231 saw any paywall or offer (23%), 33 opened checkout (14% of those), 11 paid (33% of those), plus 1 who bought before tracking began. 19 closed checkout and 4 of them bought later. About 12 to 15% of visitors sign up (Clarity, 21 to 23 Oct: 207 signups, 1,375 visitors; a rough figure), so about 1 visitor in 700 buys. Sales came by two routes only: the daily answer limit, then /pricing (5), and a download box, mostly /browse (6). By gate, students who saw it and later paid: answer limit 104 and 5; /browse download box 44 and 3; older untagged download gate 66 and 3; board papers 8 and 1; Top PYQs 5 and 1; mock download box 15, formula sheet 9, drill 6, free-mock limit 4, homework and chapter tests 4, all 0. Of the free limits only the answer limit is met often (14 days: 87 of 478 practising students reached 30 answers on a day, 63 more reached 20 to 29); the mock limit of 3: 5 of 102 (81 sat only one), chapter tests of 5: 1 of 148, saves of 100: 2 of 93. 218 of the 478 never answered 10 in a day, so no limit reaches them.",
    source:
      "auth.users signups and user_activity paywall_event (metadata.gate, box, step), staff excluded; entitlements source razorpay; mock_attempts by mock_tests.scope since paywall_settings counts_from; question_bookmarks; question_practiced on surfaces bank and board, 14 days to 23 Oct; Clarity distinct users 21 to 23 Oct. Read 2026-10-23",
    confidence: "medium",
    firstSeen: "2026-10-23",
    howToCheck:
      "Database, staff excluded (org_members, platform_admins), since 2026-09-27: signups (auth.users); distinct students with paywall_event step 'shown', then 'checkout_opened', then a razorpay entitlement granted after it. Per metadata.gate and metadata.box: students shown, and of them those paid later. Limit reach, paying students also excluded: per student the most bank plus board question_practiced rows on one IST day in the last 14 days (bucket at the answer limit and 5 below it), full and sectional mocks first started since counts_from, question_bookmarks count. One Clarity call (ask first) for distinct users over 3 days, divided into signups over the same days. The price (Rs 199) and the answer limit (25) both changed on 2026-10-23, so compare like with like.",
    checks: [],
    status: "open",
    actedOn: "Owner raised the pass to Rs 199 and lowered the answer limit from 30 to 25 on 2026-10-23.",
    experimentId: "answer-limit",
  },
  {
    id: "mock-limit-met-at-exam-time",
    title: "The free-mock limit is measured off-season; students sit mocks in the weeks before their exam",
    finding:
      "On 23 Oct only 5 of 102 students who started a full mock since the limit went on had reached 3; 81 had sat one. The owner's point: students use mocks around their exam, so this says little about the limit in exam season. NDA showed the shape: mocks a week climbed 51, 86, 116, then 254 in the week of NDA 2 (13 Sep), then fell to 1 to 3 (see heavy-users-leave-at-the-exam). Judge the mock limit, and a mock-led offer, in the weeks before the next big sittings, not now.",
    source: "mock_attempts joined to mock_tests (scope full), first start per student and paper since paywall_settings.counts_from (27 Sep), staff and paying students excluded; read 2026-10-23",
    confidence: "low",
    firstSeen: "2026-10-23",
    recheckDays: 150,
    howToCheck:
      "Database, staff and paying students excluded: per IST week, full mocks started and students reaching the free-mock limit (paywall_event gate mock_limit, step shown), and of them checkout opens and passes. Run it from about 6 weeks before NDA 1 2027 and MHT-CET 2027 (March to May) and compare with the off-season weeks of Oct to Dec 2026.",
    checks: [],
    status: "open",
  },
];
