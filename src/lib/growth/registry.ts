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
import { STUDY_CIRCLE_MIN_YES, STUDY_CIRCLE_YES_RATE } from "@/lib/studyCircle/core";

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
 * UGC NET Paper 1 (2026-11-10): keep adding cycles if, by two weeks after the
 * December 2026 sitting, this many students have chosen UGC NET at sign-up...
 */
export const UGC_NET_SIGNUPS_KEEP = 50;
/** ...and this many of them have bought the pass (owner, 2026-11-10). */
export const UGC_NET_PASSES_KEEP = 3;
/**
 * CLAT UG (2026-11-11): keep adding CLAT years and content if, by two weeks
 * after CLAT 2027 (6 Dec 2026), this many students have chosen CLAT...
 */
export const CLAT_STUDENTS_KEEP = 50;
/** ...and this many of them have bought a pass. Proposed by Claude, the UGC NET bar; the owner set no rule for CLAT. */
export const CLAT_PASSES_KEEP = 3;
/** The Learn tab (2026-10-27): keep building learning inside PYQ Vault at this many students who master a concept... */
export const LEARN_MASTERED_KEEP = 25;
/** ...and this many who come back to Learn on a second day. */
export const LEARN_RETURNED_KEEP = 10;
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
 * "v-progress": keep V's "How's my progress" card if at least this many
 * students open it in two weeks (the Plan my week button it replaced was
 * tapped by 20 in its first week)...
 */
export const V_PROGRESS_STUDENTS_KEEP = 30;
/** ...and at least this share of them start a drill or open /performance within 30 minutes (%). */
export const V_PROGRESS_NEXT_STEP_KEEP_PCT = 25;

/**
 * "v-pay-offer": keep the pass offer under V's limit reply if at least this
 * share of the students shown it open checkout (%). The bank's wall, the same
 * offer, ran ~3% (5 of 148 students, 14 days to 2026-10-28); a student asking
 * V about one question is further along than one browsing a list...
 */
export const V_PAY_OFFER_CHECKOUT_KEEP_PCT = 10;

/**
 * "v-premium-hourly": keep the Premium offer at V's hourly limit if at least
 * this share of the free students shown it open checkout (%), the same bar as
 * the daily-answer offer in V (V_PAY_OFFER_CHECKOUT_KEEP_PCT).
 */
export const V_PREMIUM_HOURLY_CHECKOUT_KEEP_PCT = 10;

/**
 * "v-follow-up-loop" (V_LEARNING_LOOP.md step 2): keep the linked, free
 * follow-up if a follow-up is answered after at least this share of Ask V
 * explanations (%). Before it: 3 try cards answered in 4 weeks, on about 400
 * explanations (under 1%).
 */
export const V_FOLLOW_UP_KEEP_PCT = 10;

/**
 * "v-fix-line" (V_LEARNING_LOOP.md step 3): keep the chapter's Fix line under
 * V's explanations if at least this share of the times it is shown lead to a
 * drill start from it that day (%), the chapter-fix experiment's own drop bar.
 */
export const V_FIX_LINE_KEEP_PCT = 10;

/**
 * "v-better-retry" (V_LEARNING_LOOP.md step 4): keep the new second try and
 * the step buttons if at least this share of answered second tries get a Yes
 * (%). Before: 2 of 7 answered (29%), 23 Nos from 23 Oct to 9 Nov.
 */
export const V_RETRY_YES_KEEP_PCT = 50;

/**
 * "v-step-by-step" (V_SPEC.md section 0, step 1): keep "Teach me step by step"
 * if at least V_STEPS_START_KEEP_PCT of the explanations it goes under get a
 * start, and at least V_STEPS_FINISH_KEEP_PCT of starts reach the last step (%).
 */
export const V_STEPS_START_KEEP_PCT = 10;
export const V_STEPS_FINISH_KEEP_PCT = 50;

/**
 * "v-step-chips" (owner, 2026-11-15): keep the step bubbles and their chips if
 * at least V_STEP_CHIPS_TAP_KEEP_PCT of the stepped explanations get a step
 * tapped, and at least V_STEP_CHIPS_YES_KEEP_PCT of V's answers to Explain that
 * the student answers get a Yes (%). Before: "Which step lost you?" got 0 picks
 * from 2026-11-10, the Reply icon 0 uses since 2026-10-21.
 */
export const V_STEP_CHIPS_TAP_KEEP_PCT = 15;
export const V_STEP_CHIPS_YES_KEEP_PCT = 50;

/**
 * "v-day-card": keep V's "Your day" card if at least V_DAY_REPEAT_KEEP_PCT of
 * the students shown it in the window see it on 2+ days (before: 7 of 31, 23%,
 * opened "How's my progress" on 2+ days, 28 Oct to 15 Nov) and at least
 * V_DAY_NEXT_STEP_KEEP_PCT of showings lead to a tap on the card that day.
 */
export const V_DAY_REPEAT_KEEP_PCT = 35;
export const V_DAY_NEXT_STEP_KEEP_PCT = 25;

/**
 * "v-gift": keep V's gift if at least this share of the students shown the
 * closed box open it (%). There is no before: the box is new. What students do
 * with an opened gift (Activate, See your price, a pass bought with points) is
 * reported beside it, not judged on: the trial and the points are each judged
 * by their own experiment.
 */
export const V_GIFT_OPEN_KEEP_PCT = 50;

/**
 * "study-time-card": keep the Study time card's suggestion if at least
 * STUDY_NEXT_TAP_KEEP_PCT of the students shown one tap it, and at least
 * STUDY_NEXT_TIME_KEEP_PCT of shown suggestions get 10+ minutes on that chapter
 * within 7 days. There is no before: the card is new, so how often a chapter
 * gets time without the card is read beside it from students never shown one.
 */
export const STUDY_NEXT_TAP_KEEP_PCT = 15;
export const STUDY_NEXT_TIME_KEEP_PCT = 30;

/**
 * "v-exam-countdown": keep the exam countdown in V's "Your day" card if at
 * least this share of the days it shows lead to a drill or practice start from
 * the card that day (%). Before (v-day-card, 16-21 Nov, measured 2026-11-21):
 * a drill start from the card on 3 of 86 showings (3.5%), so the bar asks for a
 * clear lift.
 */
export const V_EXAM_COUNTDOWN_KEEP_PCT = 10;

/**
 * "v-checkin": keep V's check-in if at least V_CHECKIN_ANSWER_KEEP_PCT of the
 * students it asks tap an answer, and at least V_CHECKIN_PRACTISE_KEEP_PCT of
 * its showings are followed by practice later that day: no worse than the
 * card it replaces (7 of 10 "Since your last visit" cards after 4+ days away,
 * 16-21 Nov, measured 2026-11-21). Students who open V are keen, so the bar
 * is "no worse", not a lift.
 */
export const V_CHECKIN_ANSWER_KEEP_PCT = 40;
export const V_CHECKIN_PRACTISE_KEEP_PCT = 70;

/**
 * "v-teach-chapter": keep the "Teach me" buttons if at least
 * V_TEACH_CHAPTER_TAP_KEEP_PCT of the students shown one tap one, and at least
 * V_TEACH_CHAPTER_ON_KEEP_PCT of the chapters V teaches from a tap get a second
 * message from the student in that chat (they went on, asked, or tried). The
 * nearest baseline: the stuck offer's Teach me the idea, tapped on 32 of 174
 * offers (18%) in the 28 days to 2026-11-21. A button is a lighter ask than an
 * offer at a stuck moment, so the bar is half of it.
 */
export const V_TEACH_CHAPTER_TAP_KEEP_PCT = 10;
export const V_TEACH_CHAPTER_ON_KEEP_PCT = 30;

/**
 * "v-learn-first": keep Learn first in V's chapter lessons if at least this share
 * of the Learn maps V shows lead the student to open a lesson from the map (%).
 * Until the same day's second change (2026-11-22) it was Your turn answered; the
 * map is now the whole reply, so opening a lesson is the step it asks for. No
 * baseline (Learn's tab had 3 learners ever), so the bar is one map in three.
 */
export const V_LEARN_FIRST_OPEN_KEEP_PCT = 30;

/**
 * "score-plan": keep "How to raise your score" if at least this share of the
 * fair full-paper attempts it shows on start the Fix list within a day (%).
 * Baseline with "What to fix next", 36 fair attempts (60 to 14 days before
 * 2026-11-10): 5 (14%) started a drill within a day, 7 (19%) sat another full
 * paper of the exam within 14 days.
 */
export const SCORE_PLAN_DRILL_KEEP_PCT = 25;

/**
 * "stuck-offer": keep the offer if, at the moments it shows, students leave
 * less often than the baseline (%): 14% left right after the answer that made
 * 3 of their last 4 on a subtopic wrong (30 days to 2026-11-10).
 */
export const STUCK_OFFER_LEAVE_BASELINE_PCT = 14;
/**
 * "same-mistake": a bank miss on a question the student had missed before, in
 * the 4 weeks to 2026-10-31 (before the line existed): 151 moments by 61
 * students, 22.5% fixed (answered right) within 14 days, 12.6% answered
 * nothing more within 20 minutes. The bars the line is judged against.
 */
export const SAME_MISTAKE_FIXED_BASELINE_PCT = 22.5;
export const SAME_MISTAKE_LEAVE_BASELINE_PCT = 12.6;
/**
 * "checkout-contact": of students who opened checkout in the 30 days to
 * 2026-11-12 with a mobile saved with us, the share who paid (23 of 51). Their
 * mobile was NOT sent to Razorpay then, so the same group after the change is
 * the clean comparison (students without one paid 12 of 48).
 */
export const CHECKOUT_CONTACT_PAID_BASELINE_PCT = 45;
/** "checkout-contact": the same window's students with NO saved mobile, the share who paid (12 of 48). */
export const CHECKOUT_NO_CONTACT_PAID_BASELINE_PCT = 25;
/**
 * "checkout-return": of students who left a checkout without paying in that
 * sitting (45 days to 2026-11-12), the share who paid on a later day with no
 * nudge (12 of 83).
 */
export const CHECKOUT_RETURN_LATER_PAID_BASELINE_PCT = 14;
/**
 * "checkout-followup": of students who left a checkout unpaid (20 Oct to 12
 * Nov, the follow-up's own rule), the share who paid within 7 days: 2 of 26
 * with a mobile, 3 of 39 without. 8% both.
 */
export const CHECKOUT_FOLLOWUP_BASELINE_PCT = 8;
/** Points the messageable group must beat the bar-only group by. */
export const CHECKOUT_FOLLOWUP_KEEP_POINTS = 10;
/**
 * "welcome-exam-confirm": of the 2,021 students who signed up in the 30 days
 * to 2026-11-12 (staff left out), the share who left /welcome with an exam
 * (955), and the share who never answered its first screen at all (712).
 */
export const WELCOME_EXAM_PICKED_BASELINE_PCT = 47;
export const WELCOME_SCREEN1_LEFT_BASELINE_PCT = 35;
/**
 * "exam-guess-card": keep "Your exam: X (our guess)" on Home if at least this
 * share of students who see it tap Correct or Change within 14 days (%). The
 * old "Studying for X?" card (2026-11-02) was never measured; on 2026-11-14
 * 1,255 students with no exam had been shown it or nothing.
 */
export const EXAM_GUESS_CARD_TAP_KEEP_PCT = 20;
/**
 * "install-app": students (staff left out) who must open the installed app in
 * the 4 weeks before a Play Store listing is worth building; about 8 had asked
 * for an app in the 4 weeks before /app existed.
 */
export const INSTALL_APP_STUDENTS_KEEP = 30;
/**
 * "install-app": of 1,174 students active 17-30 Oct 2026, the share active on
 * 3+ other IST days in the 14 days after their first day in that window (20.8%;
 * 44.8% came back at all). Installed students must beat it.
 */
export const INSTALL_APP_RETURN_BASELINE_PCT = 21;
/**
 * "teacher-or-student": answers needed in the 3 weeks before the labels are
 * worth using. Before the question, the only labels were 96 tutor-interest
 * answers (7 teachers), too few to test a behaviour rule against.
 */
export const TEACHER_STUDENT_ANSWERS_MIN = 200;
/**
 * "teacher-or-student": the share of accounts the behaviour rule names (answer
 * keys downloaded, under 10 answers, no mock, 40%+ of activity Mon-Sat 9-16
 * IST) that must answer Teacher before the rule labels accounts that never
 * answered. Below it, the rule is a guess and stays unused.
 */
export const TEACHER_RULE_PRECISION_PCT = 70;
/**
 * "blog-posts": the share of all signups in the window that must land first on
 * one KIND of article (news, data, evergreen) for that kind to be kept. Before
 * the database articles, 1 signup ever (2026-11-03) had landed on the blog.
 */
export const BLOG_SIGNUP_SHARE_KEEP_PCT = 1;
/** "blog-posts": or, by the window's last week, this many Search Console clicks a week on that kind's pages. */
export const BLOG_GSC_CLICKS_KEEP = 50;
/**
 * "gulf-price": pass revenue per student who signed up from the six Gulf
 * countries, 9 Oct (country recorded) to 15 Nov 2026, at the India prices:
 * Rs 199 from 34 students, about Rs 6 each. The Gulf price must beat it.
 */
export const GULF_PRICE_BASELINE_RUPEES_PER_STUDENT = 6;
/** "gulf-price": Gulf sales needed in the window before the revenue line means anything. */
export const GULF_PRICE_MIN_SALES = 2;
/**
 * "enem-interest": students choosing ENEM (target_exams) in 4 weeks for it to
 * earn more work. IMAT drew 15 in its first two weeks on intl (24 by 11-15),
 * with notes and English content; ENEM has neither.
 */
export const ENEM_STUDENTS_KEEP = 20;
/** "enem-interest": ...of whom this many started a mock or answered 20+ questions. */
export const ENEM_ACTIVE_KEEP = 5;
/**
 * "practice-trial": of students who met the answer limit on 3+ days from 13 Oct
 * to 18 Nov 2026 with no trial, 4 of 67 (6%) bought a pass after their 3rd day.
 */
export const PRACTICE_TRIAL_BASELINE_PCT = 6;
/**
 * "v-intl": international students (an intl exam in target_exams) who ask V a
 * question in 3 weeks, and of them who come back to V on a second day.
 */
export const V_INTL_ASKERS_KEEP = 10;
export const V_INTL_RETURNERS_KEEP = 3;
/** "practice-trial": keep at this share of offered students buying, or more. */
export const PRACTICE_TRIAL_KEEP_PCT = 10;
/** "practice-trial": switch off at this share or less. */
export const PRACTICE_TRIAL_STOP_PCT = 3;
/**
 * "answer-limit-copy": of students who met the answer limit in the 30 days to
 * 2026-11-11, the share who opened checkout from it (35 of 360) and who bought
 * a pass afterwards (16 of 360), staff left out.
 */
export const ANSWER_LIMIT_COPY_CHECKOUT_BASELINE_PCT = 9.7;
export const ANSWER_LIMIT_COPY_BUY_BASELINE_PCT = 4.4;

/**
 * "self-mark": keep Understood / Review later under written model answers if
 * at least this share of signed-in written-answer reveals get a tap (%)...
 */
export const SELF_MARK_TAP_KEEP_PCT = 10;
/** ...and at least this share of the questions saved for review are later fixed (%). */
export const SELF_MARK_FIXED_KEEP_PCT = 20;

/**
 * "visual-solutions": keep Animated as the default view if at least this share
 * of the animations shown play to the end (%; student-question pairs)...
 */
export const VISUAL_FINISHED_KEEP_PCT = 50;
/** ...and fewer than this share are switched to Still (%). Where one exam or
 *  surface passes it, Still becomes that exam's or surface's default. */
export const VISUAL_STILL_MAX_PCT = 20;

/**
 * "pass-price": keep Rs 199 if a week's pass revenue is at least the week
 * before the change (6 sales at Rs 99)...
 */
export const PRICE_BASELINE_WEEKLY_REVENUE = 594;
/**
 * "pass-tiers": the single Rs 499 pass it replaced sold Rs 998 in the 5 days
 * 29 Oct to 2 Nov, about Rs 1,397 a week.
 */
export const PASS_TIERS_BASELINE_WEEKLY_REVENUE = 1397;
/**
 * "answer-limit": keep 25 a day unless the share of limit-meeters back on a
 * later day within 7 days falls more than this many points below the 65% before.
 */
export const ANSWER_LIMIT_RETURN_BASELINE_PCT = 65;
/**
 * "signed-out-answers": signups per 100 India visitors before the signed-out
 * limit went from 10 to 5 (2026-11-24). About 10 in each week from 19 Oct to
 * 9 Nov (Vercel, country IN); 89 signups a day in the week of 17-23 Nov.
 */
export const SIGNED_OUT_SIGNUPS_PER_100_BASELINE = 10;
/**
 * V's AI replies followed by another message within 30 minutes, before the
 * line-by-line reveal (%), repeat Ask V taps on the same question left out
 * (2026-11-07; counted, they had made it 48%). `npm run v:followups`.
 */
export const V_REVEAL_FOLLOWUP_BASELINE_PCT = 39;
/** A fall of this many points in that share is looked into before anything else changes in V. */
export const V_REVEAL_FOLLOWUP_MAX_DROP = 5;
export const ANSWER_LIMIT_RETURN_MAX_DROP = 10;
/** "why-not-buy": answers needed before a reason is read as the answer (below it, run 2 more weeks). */
export const WHY_NOT_BUY_MIN_ANSWERS = 30;
/** "why-not-buy": a reason holding this share of a group's answers decides that group's next change (%). */
export const WHY_NOT_BUY_LEAD_PCT = 40;
/** "parent-pay": passes a parent pays through a link, by the check date, that keep it. */
export const PARENT_PAY_KEEP = 5;
/** "fix-points": the rise in graded fixes per active student, against the 30 days before, that keeps it (%). */
export const FIX_POINTS_FIXES_LIFT_PCT = 30;
/** "fix-points": passes sold with points by the check date that keep it. */
export const FIX_POINTS_SALES_KEEP = 5;
/** "referrals": passes bought by referred friends by the check date that keep it. */
export const REFERRALS_SALES_KEEP = 3;
/** "flashcards": cards answered per deck a student opens, on average, that keeps it open to students. */
export const FLASHCARDS_ANSWERS_PER_OPEN_KEEP = 3;
/** "tutor-interest": student Yes answers (looking for 1:1 tutoring) that take tutoring further. */
export const TUTOR_STUDENT_YES_KEEP = 20;
/** "tutor-price": answers each price needs before the three are compared (below it, run 2 more weeks). */
export const TUTOR_PRICE_MIN_ANSWERS = 15;
/**
 * "offline-classes": Pune leads in 4 weeks for the header Classes button to stay.
 * Before it, 1 of 88 tutoring Yes answers was someone in Pune open to offline.
 */
export const CLASS_LEADS_PUNE_KEEP = 10;
/**
 * "me-class-offer": the share of students who saw a /me class card and said
 * Yes with their number, for the card to stay. The /classes button brought 9
 * leads in its first 6 days (0 SPI, 2 NDA).
 */
export const ME_CLASS_OFFER_YES_KEEP_PCT = 5;
/**
 * "notes-visuals": the Visuals gallery is kept if this many signed-in students
 * open a visual in 4 weeks AND this share of them tap "Practise 3 questions".
 */
export const NOTES_VISUALS_OPENERS_KEEP = 100;
export const NOTES_VISUALS_PRACTISE_PCT = 20;
/**
 * "partner-courses": different students (accounts, else browsers; staff left
 * out) who tap a partner course on /store in 6 weeks, for the trial to be taken
 * to Defence Mania as a commission or coupon deal (owner, 2026-11-17).
 */
export const PARTNER_COURSE_TAPPERS_KEEP = 30;
/** Exam rooms (migration 0289): students who joined any room in 4 weeks, their extra return days over
 *  matched non-members, and student messages a day in the busiest rooms. */
export const EXAM_ROOMS_JOINERS_KEEP = 100;
export const EXAM_ROOMS_RETURN_LIFT = 1.2;
export const EXAM_ROOMS_MESSAGES_PER_DAY = 1;
/** "play-games": signed-in students who finish a /play round in 4 weeks, the floor for reading the rule at all. */
export const PLAY_PLAYERS_MIN = 50;

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
  | "learn"
  | "v-finder"
  | "v-explain"
  | "v-strategy"
  | "v-plan"
  | "ebook-store"
  | "pass-price"
  | "pass-tiers"
  | "answer-limit"
  | "signed-out-answers"
  | "v-reveal"
  | "tutor-interest"
  | "tutor-price"
  | "v-progress"
  | "self-mark"
  | "v-pay-offer"
  | "v-premium-hourly"
  | "visual-solutions"
  | "homework-tab"
  | "homework-progress"
  | "why-not-buy"
  | "parent-pay"
  | "fix-points"
  | "referrals"
  | "flashcards"
  | "chapter-fix"
  | "board-path"
  | "study-circle"
  | "study-time-card"
  | "ugc-net"
  | "clat"
  | "v-follow-up-loop"
  | "v-fix-line"
  | "v-better-retry"
  | "v-step-by-step"
  | "v-step-chips"
  | "v-day-card"
  | "v-gift"
  | "v-exam-countdown"
  | "v-checkin"
  | "v-teach-chapter"
  | "v-learn-first"
  | "score-plan"
  | "stuck-offer"
  | "same-mistake"
  | "mock-before-start"
  | "review-traps"
  | "repeat-line"
  | "answer-limit-copy"
  | "checkout-contact"
  | "checkout-return"
  | "checkout-followup"
  | "welcome-exam-confirm"
  | "exam-guess-card"
  | "install-app"
  | "score-calculator"
  | "teacher-or-student"
  | "blog-posts"
  | "notes-drill-panel"
  | "gulf-price"
  | "enem-interest"
  | "offline-classes"
  | "me-class-offer"
  | "play-games"
  | "practice-trial"
  | "v-intl"
  | "notes-visuals"
  | "partner-courses"
  | "exam-rooms";

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
    status: "decided",
    decision:
      "Read 2026-11-11, 13 days after the check date: no clear difference, and control is slightly ahead. Back within 7 days: practice-first 97 of 319 (30%), mock-first 120 of 353 (34%); 2+ study days 92 vs 105. Owner's call: end the split and keep mock-first as the main welcome button for everyone. Removing the split from the code is a separate change, not yet made.",
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
    status: "decided",
    decision:
      "Read 2026-11-11, 13 days after the check date: 4 signups tagged chapter-share in six weeks, below the bar of 5. Removed under the rule (owner, 2026-11-11). Taking the card off the /questions and notes chapter pages is a separate change, not yet made.",
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
    status: "decided",
    decision:
      "Read 2026-11-11: kept featured. 14 MHT-CET students sat a mock in the last full week (bar 10, about 5 before launch). Since launch 112 chapter-test sittings answered 69% on average, against 27% for 58 full-paper sittings, so the answered half sits just under its 70% bar; the rule needs only one half.",
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
    status: "decided",
    decision:
      "Goal met (read 2026-11-11): 597 pages indexed on 2026-11-06 against the goal of 200, up from 39 when the links went in. About 124 of them are old IMAT URLs that now redirect to intl, so about 473 count. The links stay; indexing keeps its readings below.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: no send failed on the quota in the last 7 days; the busiest day was 72 against the cap of 70. Kept: the 70-a-day cap stays as a standing rule (owner, 2026-11-16). Revisit if a job starts holding back mail students need.",
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
    status: "decided",
    decision:
      "Both removed on 2026-11-05 under the rule, 4 days after the check date. Over 30 days (6 Oct to 5 Nov) V's hello got 97 taps from 3,944 visitors who saw it (2.5%) and the card 192 from 7,555 (2.5%), about 290 taps a month to the test, notes or bank together. Each started above 3% (hello 3.5%, card 3.3% in 8 to 14 Oct) and fell to 2.1% and 2.3% by 29 Oct to 4 Nov.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 10 passes were bought 4 Oct to 1 Nov whose last checkout opened from a download box (gate teacher), against a bar of 2. Kept (owner, 2026-11-16). The per-100-visitors figure needs Vercel and was not read.",
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
    status: "decided",
    decision:
      "Read 2026-11-11 over 12 Oct to 10 Nov: chips showed on 11,540 cards (2,176 browsers) and got 384 taps (3.3%), above the rule as a pair. Split: Concept notes 314 taps (2.7%), Strategy 70 (0.6%). Owner retired the Strategy chip from the card on 2026-11-11 (the /questions page header still links the guide once); Concept notes stays and now saves a way back from the notes (lib/browse/backToQuestion). From then resource_chips_shown counts only cards with a notes chip.",
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
    status: "decided",
    decision:
      "Read 2026-11-11: kept. 37 passes sold to 37 students since 2026-10-06 (bar 3; 1 before the limits). Students who meet the answer limit keep coming back: 65% back within 7 days (2026-10-23 reading), and 82 of the 84 heaviest students who met it in the 28 days to 11 Nov practised again on a later day. Sales also rose with signups, so the limits are not the only cause.",
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
    status: "decided",
    decision:
      "Read 2026-11-11: kept. Of 41 students whose first performance-page view since 6 Oct came before any graded paper, 11 started a test within 24 hours (27%, bar 15%). Small numbers: 107 students viewed the page in all.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 61 /formula/<exam>/<subject>/<chapter> pages had Google impressions in the last 3 months (Search Console, Performance filtered to /formula/; a page with impressions is indexed), against a bar of 40, and 11 signups first landed on one by the check date (bar 5). Kept: build on them, PYQ counts per formula next (owner, 2026-11-16).",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 3 of 29 students shown the board-paper and homework offers opened checkout (10%), under the 20% bar; the generic /browse list got 28 of 159 (18%). Small numbers, but under the rule: go back to the generic list on those boxes (owner, 2026-11-16). The code change is separate, not yet made.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 105 signups first landed on a past paper page or list, 15 Oct to 12 Nov (bar 10). Kept: build on the paper pages (owner, 2026-11-16).",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 154 of 1,929 signups (8.0%) first landed on a notes page, 15 Oct to 12 Nov, against 3.9% before and a bar of 6%. Kept (owner, 2026-11-16). Notes chapters were added in the same weeks, so not all of the rise is the titles.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 24 practice tests started 15 Oct to 12 Nov (bar 30), 51.5% of each answered on average (bar 50%); 1 more started since. Under the rule on starts: left as it is, nothing more built on it (owner, 2026-11-16).",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 8 practice tests sent (6 in the two weeks, bar 10) and no friend ever started a copy. Removed the Practise together box from the practice-test result page and from V's practice-test builder (owner, 2026-11-16); a link already sent still works.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 26 papers sent (12 in the two weeks, bar 10), but no friend has ever started one: mock_invite_joins is empty, staff included. Not a bug: the link carries the code through sign-in and the start route records the join; Vercel shows only 6 visitors on utm_campaign mock-together links in a month, and none pressed Start. Removed the Practise together box from the start page, which also stops making an invite row on every signed-in visit (owner, 2026-11-16); a link already sent still starts free.",
  },
  {
    id: "learn-class-12",
    title: "Learn tab: Concept Ladder's lessons inside PYQ Vault (Class 12 Maths)",
    change:
      "Every visitor gets a Learn tab (in place of Guides on the phone bar, Guides moving to the account menu; beside it on desktop; owner, 2026-10-28). Class 12 State Board and CBSE students land on their course; every other exam lands on /learn, which says its lessons are coming. The course: Concept Ladder's step-by-step Maths lessons, one concept at a time, with questions until three are right, spaced reviews, and the chapters their PYQ Vault mistakes point to. 28 chapters, 172 concepts. Concept Ladder keeps running.",
    why: "Neither Class 12 exam had notes or a guide, and they are our 4th and 5th most picked exams. Concept Ladder had the lessons but no students; PYQ Vault has the students and knows their mistakes.",
    metric:
      "Students (not staff) who answered a Learn question, mastered at least one concept, and answered on two or more different days, since launch (learn_experiment_readout, migration 0195). The steps before an answer from 2026-10-28 (0202): students who opened a Learn page, opened a lesson, began one. Guest lesson views and lessons begun (learn_lesson_start) in Vercel, read by hand",
    rule: `Keep building learning inside PYQ Vault if ${LEARN_MASTERED_KEEP}+ students master a concept and ${LEARN_RETURNED_KEEP}+ come back to Learn on a second day by the check date; otherwise keep building on Concept Ladder and leave the Learn tab as it is.`,
    liveSince: "2026-10-28",
    readout: "learn",
    status: "running",
  },
  {
    id: "homework-tab",
    title: "Homework tab with Top 10 PYQs, in Learn's place",
    change:
      "Homework replaces Learn in the nav at every width (phone slot 2), for every visitor. It opens the student's exam's homework page: each subject's plan (five past questions a day, the most repeated first) with a second tab listing every chapter's Top 10 PYQs, or a line saying that exam's homework is coming. Learn moved to the account menu and the footer.",
    why: "Learn's first week (28 Oct to 4 Nov): 36 of 233 active Class 12 students opened it and one answered a lesson question, while homework, with no tab, had 34 visitors open a day against 29 opening a lesson. The owner: homework has actual value, the questions are targeted PYQs (2026-11-04).",
    metric:
      "Visitors opening a homework day or a chapter's Top 10 a week (Vercel, read by hand); signed-in students on homework pages (user_activity surface_viewed 'homework', from the live date)",
    rule: "No fixed bar: the week before the tab is the baseline (34 visitors opened a day). Keep the tab if that number rises clearly and students come back on more than one day; otherwise read where they stop before moving the tab again. Homework plans will be added for the remaining exams over time.",
    liveSince: "2026-11-04",
    windowDays: 28,
    readout: "homework-tab",
    status: "running",
  },
  {
    id: "board-path",
    title: "Board path: today's tasks to every chapter done before the boards",
    change:
      "A Class 12 student (CBSE 12 or HSC 12) sees a start card on /me: Physics, Chemistry and Maths in book order, each chapter done by its revision sheet, its Top 10 PYQs and its chapter test, about N minutes a day set from the board date. Once started, a Today card replaces the week ring with 2-4 tasks a day, a Fix task for older mistakes, \"Not taught yet\", and an on-track line. Today's tasks are free of the answer, drill and chapter-test limits.",
    why: "Owner, 2026-11-07: students do not know what to study or in what order, and a plan alone did not help (V's week plans: 6 of 68 chapter tasks done). MENTOR_SPEC.md.",
    metric:
      "Starters (target 150), starters active on 4+ days in their first 28 days (target 50%), on track at week 4 (40%), median chapters done (8), today's tasks done of tasks shown (35%), fixing mistakes on 2+ days (30%). Also chapter tests granted, the free-limit cost.",
    rule: "Baselines (Class 12, 2026-11-07, npm run path:readout): no active student had a chapter done; 4+ active days CBSE 32%, HSC 28%; fixing on 2+ days 4%. Keep and build Phase 2 if starters beat the 4-day and chapters-done targets; if few start, read the start card first; if starters stop within a week, read which task they stop on. Week 1 (to 2026-11-15): 83 started of 147 who saw the offer, but 8% of tasks were done and no chapter was finished, because 94% of the questions starters practised on plan days were on chapters the plan had not picked. So from the first student save of \"What has your class covered?\" (MENTOR_SPEC.md §18) the plan follows the class: ticked chapters first, unticked untouched ones wait, a chapter worked on in the last 7 days leads the card, Switch chapter (3 a day) replaces Not taught yet, and the Top 10 comes in parts of 5. Read the readout's FOLLOW THE CLASS section: the same students' tasks done in the 7 days before that save against the 7 days after.",
    liveSince: "2026-11-07",
    windowDays: 28,
    readout: "board-path",
    status: "running",
  },
  {
    id: "chapter-fix",
    title: "Fix N mistakes in this chapter",
    change:
      "Signed in, a student who opens a chapter (/questions, /board, or /browse filtered to one chapter) where their drill holds mistakes sees one line above the questions, \"Fix 2 mistakes in this chapter\", with a Fix them button that opens the drill for that chapter alone.",
    why: "Students come back to the bank but rarely to the drill: in the 30 days to 2026-11-07, 534 of 947 students with a miss returned on 2+ days, but 41 drilled on 2+ days. So the drill goes to the chapter they already chose. Review of a ChatGPT mentorship plan, 2026-11-07.",
    metric:
      "Of chapter-days where a student practised a chapter while holding older unfixed mistakes there: the share fixing one of them that day. Also drill starts tagged chapter / board_chapter / browse_chapter against chapter_fix views.",
    rule: "Baseline (30 days to 2026-11-07): 30% (160 of 529 chapter-days, 191 students). Keep if 40%+. Drop if under 10% of chapter_fix views lead to a drill start that day. The /me redesign went live 2026-11-06, so part of any rise may be its. From 2026-11-10 V shows the same line under its explanations (tag v_chapter, experiment v-fix-line): its views and drill starts are separate rows of the readout, but a fix made from it also counts in this same-day share, so read the share with and without students who started a drill from v_chapter that day.",
    liveSince: "2026-11-07",
    windowDays: 21,
    readout: "chapter-fix",
    status: "running",
  },
  {
    id: "homework-progress",
    title: "Homework progress: days done and Continue",
    change:
      "Signed in, a homework plan page shows \"Your progress\" (days done, Continue: Day N, questions waiting in Fix your mistakes) and a Done, \"3 of 5\" or Up next label on each day. A day page shows how many questions are marked, a Done or To review label on each, the earlier Understood / Review later pressed, and \"Day N done\" with Next: Day N+1 at the end. No completed button: a day is done when every question is marked (a written one by Understood / Review later, an MCQ once answered), read from rows the pages already write. 2026-11-24 (owner): the header tab became \"Most Asked\", a plan opens on its Top 10 PYQs, and the days (with this progress strip) moved to a second tab, Daily homework, at /homework/<plan>/days. /me's Continue still goes straight to the next day, but fewer students may reach a day from the tab: read days opened and finished across that date.",
    why: "Owner, 2026-11-05: students should be able to track their homework. On the tab's first day 7 students opened homework pages and 5 opened a day, but nothing told them which days they had done or where to pick up.",
    metric:
      "Students who finish a homework day (every question of the day marked) and students who finish days on two or more different days; Fix your mistakes visits from homework (/drill?from=homework)",
    rule: "No fixed bar (no baseline: nothing measured completion before). Keep it if students finish days and some come back for another; if days are opened but rarely finished, read which questions they stop on before changing it.",
    liveSince: "2026-11-05",
    windowDays: 28,
    readout: "homework-progress",
    status: "running",
  },
  {
    id: "intl-site",
    title: "intl.pyqvault.com: IMAT on its own site, priced in dollars",
    change:
      "IMAT's pages moved from www to intl.pyqvault.com by permanent redirects. Intl shows no Indian exam (its own header, footer and home), has no V, and sells the pass in US dollars through Razorpay's international cards. Replaces imat-on-pyqvault (IMAT on www for everyone, 2026-10-20 to 10-30), ended early by the owner with 4 IMAT students, 2 of them foreign (US, Turkey), and no IMAT mock sat.",
    why: "Owner, 2026-10-30: international students pay where Indian students mostly do not, and an Indian site dilutes the offer for them. More international exams (MCAT next) will join the same site.",
    metric:
      "Students with IMAT among their exams and their countries; IMAT mocks sat; USD passes sold (/dashboard/sales, Pass $). From the first deploy after 2026-11-11, intl students get a welcome email (paper first, then Review, then notes; email_sends kind welcome, metadata site intl), so read mocks started within 48 hours of signup before and after that date apart: before it, no email reached an intl student and 1 of 15 IMAT signups had sat a mock",
    rule: "No decision rule yet: there is no baseline for foreign demand or dollar sales. Read it at six weeks; a first USD sale or 10+ foreign IMAT students is the sign to add the next international exam.",
    liveSince: "2026-10-30",
    windowDays: 42,
    readout: "imat",
    status: "running",
  },
  {
    id: "ebook-store",
    title: "Book store: formula, notes and PYQ books as paid PDFs",
    change:
      "A Books button in the header opens /store. Three kinds of book, sold apart from the pass (20% off for pass holders): Formula Books and Notes Books (Rs 49 each) for MHT-CET Maths, Physics and Chemistry, and the MHT-CET Maths PYQ Book (Rs 149, every past question 2021-2026 with full solutions). Each buyer's copy carries their email on every page, five downloads. After buying, \"Want this as a printed book?\" takes a free tap and an optional pincode. 2026-11-16 (owner): after 10 sales, all Repeated or Chapter-wise PYQs books on the boards, every other kind went off sale (Formula, Notes, Solved Papers, Textbook Solutions; one bought Solved Papers book stays on so its buyer keeps their page), and ten Repeated PYQs books were added for JEE Mains, MHT-CET and SSC CGL, plus CBSE 12 Biology. Read sales per book across that date.",
    why: "The owner wants to sell printed books. This tests the cheap half first: which kind of book students pay for, at what price, and how many buyers want it printed (and where).",
    metric:
      "Per book, signed-in students: opened its page and took its sample (user_activity surface_viewed, store / ebook_sample), bought and revenue (ebook_purchases), refunds, printed-copy taps and pincodes (ebook_print_interest), downloads. Signed-out visits, header Ebooks taps (ebook_store_link_click) and checkout steps per book (checkout_* with slug) in Vercel, read by hand. The header Ebooks button went from an outlined box to a tinted pill in the deploy that merged slicker Phase 1 (2026-11-10), so read header taps across that date with care. On 2026-11-16 a Play button joined Ebooks and Classes (play-games) and the pills got 4 px narrower on phones: another date to read across",
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
    status: "decided",
    decision:
      "Read 2026-11-16 (Search Console, query containing \"previous year\"): 1 impression from 16 Oct to 12 Nov against 0 in the 28 days before. Too few searches to move, so under the 1.5x bar: the wording stays (it is our own name) and nothing more is spent on the guide and notes prose (owner, 2026-11-16).",
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
    status: "decided",
    decision:
      "Read 2026-11-16: about 2 of 18 chapter asks in the two weeks got a false \"couldn't find\" (11%, bar 10%): GOC under JEE Mains (we have Organic Chemistry - Some Basic Principles and Techniques) and nouns under SSC CGL (asked on the SSC CGL Grammar page). Phase 1 shipped the same day anyway. Closed (owner, 2026-11-16); the two misses (a common short name, a topic inside a chapter) are the next fix to V's chapter search.",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 102 students got an explanation in the two weeks (bar 20), 199 to date. Only 3 similar-question cards were answered (2 right), too few to judge that half. Kept (owner, 2026-11-16).",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 15 replies used exam_strategy in the two weeks (bar 10), 22 to date; none of 8 weightage asks got a no-data reply. Kept (owner, 2026-11-16).",
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
    status: "decided",
    decision:
      "Read 2026-11-16: 17 students made a plan in the two weeks (bar 10), but 25 of 104 tasks were done (24%, bar 30%) over 20 plans whose week ended. Chapter days are the skipped kind: 6 of 68, against drills 8 of 16 and mocks 11 of 20. Decided (owner, 2026-11-16): make chapter days smaller or drop them before anything else. The Plan my week button was already replaced by How's my progress.",
  },
  {
    id: "v-progress",
    title: "V shows where you stand (\"How's my progress\")",
    change:
      "V's \"Plan my week\" button became \"How's my progress\": a card of the student's own numbers for one exam (this week's answers and the change on last week, mistakes fixed, the share of recent papers their practised chapters carry, mocks, chapter bands and what moved up, notes read), with Fix my mistakes (/drill) and View full performance. No AI call. Typed plan asks still get a plan.",
    why: "The plan button got taps because it was in plain sight (20 students in its first week) but the plans were not followed: 5 of 63 chapter days done and one student ever asked to see a plan again (2026-10-27). Seeing their own numbers is metacognition, and the drill is the one next step.",
    metric:
      "Students who opened the card (surface_viewed 'v_progress', one a day); of them, the share who started a drill (drill_started) or opened /performance (surface_viewed 'performance') within 30 minutes of opening it",
    rule: `Keep it if ${V_PROGRESS_STUDENTS_KEEP}+ students open it in two weeks and ${V_PROGRESS_NEXT_STEP_KEEP_PCT}%+ of them take a next step within 30 minutes; under the share, read which lines students see before changing the card.`,
    liveSince: "2026-10-27",
    windowDays: 14,
    readout: "v-progress",
    status: "decided",
    decision:
      "Read 2026-11-15 (5 days after the check date), owner's OK: keep. 31 students opened it in the 18 days from the 28 Oct deploy (43 openings), and 17 of them (55%) started a drill or opened /performance within 30 minutes. Only 7 of the 31 opened it on 2+ days: students look once, so the next test is a card that waits for them, \"v-day-card\".",
  },
  {
    id: "v-pay-offer",
    title: "V sells the pass when the day's answers run out",
    change:
      "When the day's free answers stop V explaining a question, V says so in one line and the bank's own pass offer shows under the reply (price, one tap to pay, more free answers tomorrow), and on V's question card. After paying, V asks the question again, so the answer comes without leaving the chat. Before, V's reply named \"the Premium Pass at /pricing\" in text.",
    why: "V gave the limit reply 26 times to 16 students in the 7 days to 2026-10-28, each one stuck on a specific question, and a text link took them away from it. None of it reached the paywall numbers.",
    metric:
      "Students shown the offer in V (Vercel reveal_daily_limit_hit with surface 'v'); of them, the share who opened checkout (checkout_opened with surface 'v_chat'), and passes paid from it (checkout_paid, surface 'v_chat')",
    rule: `Keep it if ${V_PAY_OFFER_CHECKOUT_KEEP_PCT}%+ of the students shown it open checkout over the window; under that, read the limit conversations before changing the words.`,
    liveSince: "2026-10-28",
    windowDays: 14,
    readout: "v-pay-offer",
    status: "decided",
    decision:
      "Read 2026-11-16 (Vercel, 28 Oct to 10 Nov): 30 visitors were shown the offer in V (reveal_daily_limit_hit, surface v) and 1 opened checkout from V (v_chat, 3%), 0 paid there; the bar was 10%. The bank's own wall did better (30 checkouts from reveal_wall). Under the rule: read the limit conversations before changing the words (owner, 2026-11-16).",
  },
  {
    id: "review-traps",
    title: "How this chapter catches students, on a Review chapter",
    change:
      "A Review chapter with a strategy-guide playbook shows its traps above the student's wrong answers there: the first trap cut to two lines, Show more for the rest, the playbook's \"Spot it\" line and a link to the playbook. 13 chapter-keyed guides (NDA science and humanities, MHT-CET PCM, CDS Maths, JEE PCM).",
    why: "The guides' insight reached only students who opened /guide; Review is where a student looks at their own misses in one chapter. Of 12,088 missed answers in the 30 days to 2026-11-11, 4,014 (33%) were in a chapter with a panel (MHT-CET 93%, JEE 98%, NDA 37%). The traps are not yet independently checked (owner: ship, validate later).",
    metric:
      "surface_viewed review_traps: shown, expand (Show more) and playbook per chapter and day; then whether the student's next answers in that chapter are right more often after an expand than after shown alone",
    rule: "Keep it if 15%+ of shown panels are expanded; drop it under 5%. Read the right-answer comparison with its counts, since students who expand may differ from those who do not.",
    liveSince: "2026-11-11",
    windowDays: 28,
    readout: "review-traps",
    status: "running",
  },
  {
    id: "notes-drill-panel",
    title: "Notes drill links open a panel on the notes page",
    change:
      "A notes topic's \"Drill N more on <concept>\" and \"Drill all N questions\" open their questions in a panel on the same page (full screen on a phone, right side from sm), 20 at a time with Show more, using /browse's own question cards, instead of opening /browse as a new page. Close or Esc returns the student to the concept they were reading; \"Open in the bank\" keeps /browse (cart, Word export) one tap away. Teachers get the panel too (owner, 2026-11-15).",
    why: "The links sent a student off the notes to /browse, and the way back (the Back to notes pill) landed at the top of the topic, not the concept. Panels on the page already carry See all (repeat line) and Teach me the idea (stuck offer). Nothing recorded a tap on these links before, so there is no before number.",
    metric:
      "surface_viewed notes_drill by action (open, more, close, full_page) and link (concept, topic), per topic and day; and the share of opens followed by a bank answer (practice row, surface bank) within 30 minutes. scripts/notes/notes-drill-readout.sql",
    rule: "Keep it if a third or more of opens get an answer within 30 minutes and full_page stays under a quarter of opens. If full_page passes half, students want the full page: go back to the link.",
    liveSince: "2026-11-15",
    windowDays: 28,
    readout: "notes-drill-panel",
    status: "running",
  },
  {
    id: "repeat-line",
    title: "Asked in 3 papers: the repeat line under an answered question",
    change:
      "After a student answers, one quiet line between the options and the solution says how often the question came back: \"Asked in 3 papers: NDA 1 2017, NDA 1 2021, NDA 2 2024 (new numbers in 2)\" for an exact repeat in 2+ papers, \"Questions like this were asked 9 times, 2022 to 2026\" for a type asked 5+ times, with See all N to the homework group page. On bank cards (/browse, chapter pages, Review, formula pages), the Fix your mistakes drill and mock review; never in a running mock. From the homework plans' reviewed repeat analysis, 31 subjects. From 2026-11-15 See all opens the group in a panel on the same page instead of going to it (owner), with close and full_page recorded: read See all taps before and after that date apart.",
    why: "The repeat analysis showed only on the homework pages. In the 30 days to 2026-11-12, 29.9% of bank answers were on a question that would carry the line (18.0% an exact repeat). A miss on a question that keeps coming back is the one most worth fixing; owner picked the quiet line over a box (2026-11-12).",
    metric:
      "surface_viewed repeat_line: shown (card, drill) and see_all (card, drill, mock_review) per question and day; then the share of misses on line questions answered right within 14 days. Baseline (misses 44 to 14 days before 2026-11-12): 16.9% of 2,062 misses on line questions, 17.1% on questions in no plan, 18.8% in a plan without a line. Count only from card, drill and mock_review: from 2026-11-16 the homework list's See all (homework days, /board Top 10, notes Top PYQs) opens the same panel and records under the same surface as from homework, board_top and notes_top, which are not the line",
    rule: "Keep it if misses on line questions get fixed within 14 days 3+ points more often than the 16.9% baseline while the other misses stay within a point of theirs, or 5%+ of shown lines get a See all tap. Drop it if neither moves.",
    liveSince: "2026-11-12",
    windowDays: 28,
    readout: "repeat-line",
    status: "running",
  },
  {
    id: "mock-before-start",
    title: "Before you start: what a guess is worth on this paper",
    change:
      "Every mock's instructions page gets a \"Before you start\" card computed from that paper's own marking: on JEE, NEET, SSC, MPSC Prelims and CLAT even a blind guess gains; on NDA, CDS, UPSC and SSC Tier II rule out one option first; on MHT-CET and board chapter tests a wrong answer costs nothing; JEE numeric answers cost 1 mark. Plus the paper's strategy guide where one exists. The Instructions' \"skip if unsure\" went: it was wrong wherever a blind guess gains.",
    why: "Fair full attempts in the 60 days to 2026-11-11 left 51.6% of questions blank on papers where a blind guess gains, and 52.6% on papers with no penalty at all, where a blank is never better than a guess. Guide insight surfaced where it can still change the score (owner, 2026-11-11).",
    metric:
      "Blank share (skipped_count over all questions) on fair full attempts (40%+ of the time used, a fifth answered), split by the card's line: blind guess gains, rule out one, no penalty. Baseline 51.6% / 59.3% / 52.6% (25, 15, 7 attempts). Blanks include questions never reached, which the card cannot fix",
    rule: "Keep it if the blank share on blind-gain and no-penalty papers falls by 5+ points with no fall in score per attempt; small numbers, so read it with the attempt counts.",
    liveSince: "2026-11-11",
    windowDays: 42,
    readout: "mock-before-start",
    status: "running",
  },
  {
    id: "stuck-offer",
    title: "Help after 3 of 4 wrong on a subtopic",
    change:
      "On a bank question card, the answer that makes 3 of the student's last 4 on its subtopic wrong (3 of 3 counts) gets an offer: \"3 of your last 4 on Coulomb's Law were wrong. Want help with the idea behind it?\" with Teach me the idea (our notes for the subtopic, else V explains the concept), Try an easier one (an easy unanswered question from the subtopic) and Keep going. Once per streak, never in a mock. Since 2026-11-11 (no student had tapped Teach yet) the notes show \"Back to your question\", and the card comes back answered with \"Now try one\" (steps returned, try_after). From 2026-11-15 Teach me the idea opens the notes in a panel on the same page (owner), then offers Now try one like it; teach_close and full_notes recorded. Read offers before and after that date apart. From 2026-11-22 (owner), where Learn teaches the topic, Teach me the idea opens Learn's lesson for it full screen instead (steps learn_open, learn_close), even where Learn would lock it; an MHT-CET or JEE topic no lesson is filed under opens V's Learn map for the chapter. Read Class 12 Maths offers before and after 2026-11-22 apart.",
    why: "30 days to 2026-11-10: 629 such moments by 267 students on bank and board practice, and 14% left right after (12% after a right answer). Every bank answer shows its solution, so these students had read three and still missed: the gap is the idea. Owner's idea.",
    metric:
      "Offers shown and each button (surface_viewed stuck_offer, metadata.action); whether the student answers again within 20 minutes; their next answers on that subtopic, right or wrong. Replaying the rule on 30 days of answers: about 540 offers to 215 students a month",
    rule: `Keep it if fewer than ${STUCK_OFFER_LEAVE_BASELINE_PCT}% leave right after an offer, or students who take Teach or Easier get their next answer on the subtopic right more often than those who keep going.`,
    liveSince: "2026-11-11",
    windowDays: 28,
    readout: "stuck-offer",
    status: "running",
  },
  {
    id: "same-mistake",
    title: "Same mistake again",
    change:
      "On a bank question card, a miss on a question the student had missed before says so as the one line under the answer: \"You picked B here last time too (12 Nov).\", or names the other option, or the mock it was missed in. The line is one of the teaching moments (lib/questions/teachingMoment), which show at most one per answer; it comes before the stuck offer. The Fix nudge (every 5th miss) was retired in the same change.",
    why: "Owner's call after the 2026-11-14 teaching-moments research: about 170 of these a month on the bank, and 59% picked the same wrong option again. Naming the repeat costs no new content and points the student at the step they keep missing.",
    metric:
      "Lines shown (surface_viewed teaching_moment, metadata.moment same_mistake); of those moments, the share answered right on the same question within 14 days, and the share with no answer within 20 minutes. Before/after, no held-back group (owner's call).",
    rule: `Keep it if fixed-within-14-days rises 5+ points above ${SAME_MISTAKE_FIXED_BASELINE_PCT}% without leaving rising 5+ points above ${SAME_MISTAKE_LEAVE_BASELINE_PCT}%. Drop it if leaving rises 5+ points. About 150 moments a month, so a change under 5 points is noise.`,
    liveSince: "2026-11-15",
    windowDays: 42,
    readout: "same-mistake",
    status: "running",
  },
  {
    id: "answer-limit-copy",
    title: "Answer limit: say why more practice matters",
    change:
      "Under \"That's today's N free answers\", the wall now leads with \"The more questions you practise, the more marks you get.\" then \"Practice Pass takes the limit away for 6 months, every answer with its full solution.\" It said \"See this answer now, with its full solution. Practice Pass opens every answer for 6 months.\" V's copy of the offer changes with it.",
    why: "Owner, 2026-11-11: the wall named features only, never why more answers help. Practising with real exam questions raising marks is a general truth, so it is said as one: no figure of ours (40 students a group, too few and confounded) and no promise of marks.",
    metric:
      "Of students shown the wall (paywall_event gate reveals, step shown, staff left out), the share who open checkout from it (step checkout_opened) and the share who buy any pass afterwards; against 35 of 360 (9.7%) and 16 of 360 (4.4%) in the 30 days to 2026-11-11",
    rule: `Keep it if checkout opens reach ${ANSWER_LIMIT_COPY_CHECKOUT_BASELINE_PCT}%+ and buyers hold at ${ANSWER_LIMIT_COPY_BUY_BASELINE_PCT}%+. Clearly lower on both: go back to the old line.`,
    liveSince: "2026-11-11",
    windowDays: 28,
    readout: "answer-limit-copy",
    status: "running",
  },
  {
    id: "score-plan",
    title: "How to raise your score, after a full paper",
    change:
      "On a fair full past paper (40%+ of the time used, a fifth or more answered), the result page's \"What to fix next\" becomes \"How to raise your score\": what went well, up to three actions each valued in marks (easy questions wrong, a section that ate the time, the chapters that cost the most with how often a paper asks them, guessing judged by the exam's own marking), progress since the last paper, and three steps before the next mock. Built by code from the attempt, no AI.",
    why: "Owner (2026-11-10): the question after a mock is how to gain marks, not where they were lost. Of 235 full-paper attempts in 30 days only 36 were fair (most are opened and abandoned), so it reaches about 27 students a month, the ones who sit papers.",
    metric:
      "Fair full-paper attempts that start a drill within a day (drill_started from score_plan or result), and that sit another full paper of the exam within 14 days, against the baseline (5 of 36 and 7 of 36)",
    rule: `Keep it if ${SCORE_PLAN_DRILL_KEEP_PCT}%+ of fair attempts start a drill within a day, or 14-day return beats 19%; small numbers, so read the replies, not only the rate.`,
    liveSince: "2026-11-10",
    windowDays: 42,
    readout: "score-plan",
    status: "running",
  },
  {
    id: "v-better-retry",
    title: "A better second try after \"No, I didn't understand\"",
    change:
      "After a No, a reply with numbered steps asks \"Which step lost you?\" (a button per step, and All of it), and V's second try must differ: the named step, or the one its first reply rushed, shown in full with the numbers, or the idea it needs first, or a tiny example (rule 7).",
    why: "Second tries were the first steps reworded, once word for word, and still skipped the hard step (\"do this for every entry\", \"using the quadratic formula\"). Of 21 second tries (23 Oct to 9 Nov), students answered Yes 2 times and No again 5 times.",
    metric:
      "chat_interactions: replies to a No (message I didn't understand..., plain or naming a step) answered Yes against No; step messages against plain ones (which steps students name). From 2026-11-15 leave out \"Explain step N more simply.\": that is the step chips (v-step-chips), not a second try after a No",
    rule: `Keep it if ${V_RETRY_YES_KEEP_PCT}%+ of answered second tries get a Yes (was 2 of 7).`,
    liveSince: "2026-11-10",
    windowDays: 28,
    readout: "v-better-retry",
    status: "running",
  },
  {
    id: "v-step-by-step",
    title: "Teach me step by step, under V's explanation",
    change:
      "Under V's explanation of an MCQ or numeric question whose solution has 2+ steps, a \"Teach me step by step\" button shows our stored solution one step at a time (the animation drawing the same step when the question has one), with \"Got it, next step\" and \"Lost me here\" between steps. Lost me here asks V about that step alone and offers to continue after its reply; no AI call per step.",
    why: "V_SPEC.md section 0: a tutor checks as it goes and waits, and V gave one reply and a Yes/No at the end (24 Yes, 24 No to 637 explanations in 30 days). 40% of the questions students asked V about have an animation whose steps were already tied to the solution, and the rest cut into a median 4 sentences.",
    metric:
      "chat_interactions event_type step_by_step (migration 0252): open, next, lost (by step), done; against Ask V explanations of questions that qualify (/dashboard/chat shows the funnel); then the verified-learning rate (npm run v:learning) of students who started it",
    rule: `Keep it if ${V_STEPS_START_KEEP_PCT}%+ of the explanations it goes under get a start and ${V_STEPS_FINISH_KEEP_PCT}%+ of starts reach the last step; read the verified-learning rate beside it as a trend (thin).`,
    liveSince: "2026-11-12",
    windowDays: 28,
    readout: "v-step-by-step",
    status: "decided",
    decision:
      "Ended early on 2026-11-15 (owner), 25 days before its check: replaced by the step chips (v-step-chips). In 3 days it got 2 starts of about 39 chances, and one was a staff account, so 1 student; both starts reached the last step. A button under the reply drew as few taps as the Reply icon (0 uses) and \"Which step lost you?\" (0 picks), so the step help moved into the steps themselves. Its taps stay stored (step_by_step, open/next/lost/done).",
  },
  {
    id: "v-day-card",
    title: "V's \"Your day\" card, the first time a student opens V each day",
    change:
      "The first time a signed-in student opens V on a new India day, a card stands in for V's greeting: their last day (answers, mistakes fixed, chapters that moved up; \"Since your last visit\" with the date after a gap, never the days missed), then one thing for today (the board plan's task, else Fix, starting with 5). A dot on V's button says it is waiting (a red \"1\" badge from 2026-11-20, owner: the 12 px blue dot read as decoration). No AI call. The mistakes notification now opens with \"Yesterday you fixed N.\" when there were fixes. From 2026-11-21 the card carries the exam countdown in the last 60 days before the exam (experiment v-exam-countdown), and after 4+ days away V asks \"How's your study going?\" in its place, the card behind Going well (experiment v-checkin, v_day rows with metadata.checkin), so read its numbers before and after that date apart. From 2026-11-24 the after-a-gap title names the exam (\"Since your last MHT-CET practice\"; a student who had practised JEE that day replied \"No my last visit was today only\"), and an answer in any exam shortens the gap the check-in counts.",
    why: "\"How's my progress\" works once (55% of openers took a next step) but not as a habit: 7 of 31 opened it on a second day. Of 1,509 students active in the 28 days to 2026-11-15, 63% came on one day only and 34% of active days were followed by a visit the next day. A card waiting when they open V tests whether seeing their own day brings them back.",
    metric:
      "surface_viewed 'v_day' (one a day per student, metadata.card yesterday | since | fresh): students shown it and the share shown it on 2+ days; Vercel v_day_tap by action; drill_started from v_day the same day; next-day return of students shown it against the 34% of all active days. From 2026-11-20 the badge seen is recorded (surface_viewed 'v_day_badge', one a day): read badge days followed by a card that day, and read the card numbers before and after 2026-11-20 apart. Read with scripts/chat/day-card-readout.sql",
    rule: `Keep it if ${V_DAY_REPEAT_KEEP_PCT}%+ of the students shown it see it on 2+ days and ${V_DAY_NEXT_STEP_KEEP_PCT}%+ of showings lead to a tap that day. Students who open V are keener than most, so next-day return is reported beside, not judged on.`,
    liveSince: "2026-11-15",
    windowDays: 28,
    readout: "v-day-card",
    status: "running",
  },
  {
    id: "v-gift",
    title: "V tells a student about what they have earned, as a gift",
    change:
      "When a student has earned the 7-day pass (the answer limit's offer, on its day) or reaches 10, 20, 30 or 40 Vault Points, V's button shows a red badge and V opens with \"I have a gift for you.\" and a closed box. Open your gift shows what it is and why: the 7-day pass with the same Activate as the limit card, or the points' discount with See your price. Nothing new is given away. Each gift shows once (an unopened one waits 3 days); a points milestone may come back once the points have run out and been earned again. www only, never with an active pass.",
    why: "The owner (2026-11-21): make V feel more human and the conversation more interesting. Both rewards already exist but are met on a card or a menu line; told by V as a gift, with the reason, they may feel earned rather than sold.",
    metric:
      "surface_viewed 'v_gift' (one a day per student, gift and step): students who saw the badge, were shown the box, opened it, and tapped its button (activate | pricing); trials activated from V; passes bought with points within 7 days of opening a points gift. scripts/chat/gift-readout.sql",
    rule: `Keep it if ${V_GIFT_OPEN_KEEP_PCT}%+ of the students shown the box open it. Activations and purchases are reported beside, not judged on: the practice-trial and fix-points experiments judge those.`,
    liveSince: "2026-11-21",
    windowDays: 28,
    readout: "v-gift",
    status: "running",
  },
  {
    id: "study-time-card",
    title: "Study time on Home, and in V",
    change:
      "Home gets a Study time card under the Today card: today (or the last day studied) and the last 7 days, split into practice, mocks and reading, by subject and by chapter, a \"More than your usual day\" line only when today is above it, and the subject with the most time set beside its share of the marks in the past papers. This week ends with one suggestion: the chapter worth the most marks that got no time this week and is not strong yet. Hidden under 15 minutes in the week. V's \"Your day\" card gains \"Studied 42 min, most on X\" and \"How's my progress\" two rows (the week's time, and the chapter the paper wants). Time comes from the study clock (migration 0277) and the mock's own time per question (0278).",
    why: "The owner (2026-11-21): show students how long they study, by exam, subject and chapter, daily and weekly. Nothing measured practice and reading time before the clock. Seeing their own time, and where it sits against the paper, may move time to the chapters the paper rewards.",
    metric:
      "surface_viewed 'study_time' (metadata.action seen | week | next_shown | next_tap, next_* with metadata.chapterId, once a day each): students shown the card, This week opened, suggestions shown and tapped; for each shown suggestion, study_time on that chapter in the 7 days after (10+ minutes), against chapters of the same weight never suggested. scripts/study-time/readout.sql",
    rule: `Keep the suggestion if ${STUDY_NEXT_TAP_KEEP_PCT}%+ of the students shown one tap it and ${STUDY_NEXT_TIME_KEEP_PCT}%+ of shown suggestions get 10+ minutes on that chapter within 7 days. The card's numbers stay either way: they are the student's own record.`,
    liveSince: "2026-11-21",
    windowDays: 28,
    readout: "study-time-card",
    status: "running",
  },
  {
    id: "v-exam-countdown",
    title: "The exam countdown in V's \"Your day\" card",
    change:
      "In the last 60 days before a student's exam, V's \"Your day\" card adds an amber row: \"NDA 2027 (I) is 30 days away. Big chapters where you still lose marks:\" with up to 3 of the exam's 5 biggest chapters (most marks a paper in the published papers) that still have mistakes waiting, and the day's step is Fix that chapter. With none waiting there, the 3 biggest chapters and Practise the first; in the last 7 days, one full paper under exam time. A date not yet announced says \"is expected around\". The board plan's task keeps the main button. Every first visit of those days, not only on milestone days.",
    why: "The owner (2026-11-21) wanted V to say the exam is getting close, personalised (version 1c). The engagement rules prefer a deadline to a daily streak, and the card was already where a student starts the day: 63% of students come on one day only, so a milestone-day message would mostly be missed.",
    metric:
      "surface_viewed 'v_day' with metadata.exam fix | top | mock: showings of each, and the share followed the same day by a drill start from v_day, or on mock days a mock started; a top day's Practise goes to the bank, so read it as Vercel v_day_tap action exam. scripts/chat/exam-countdown-readout.sql",
    rule: `Keep it if ${V_EXAM_COUNTDOWN_KEEP_PCT}%+ of the days it shows lead to a start from the card that day (before: 3 of 86 card showings, 3.5%, led to a drill start, 16-21 Nov). Under that, drop the row and keep the card as it was.`,
    liveSince: "2026-11-21",
    windowDays: 28,
    readout: "v-exam-countdown",
    status: "running",
  },
  {
    id: "v-teach-chapter",
    title: "\"Teach me\" a chapter with V, starting from the student's mistakes",
    change:
      "Three buttons open V with \"Teach me <chapter> for <exam>. Start from what I got wrong.\": Teach me beside Fix in /me's \"Your weak spots\", Teach me this beside Practise this on the mock result (both cards), and Teach me a chapter among V's own buttons, which offers the chapters with most mistakes waiting. V's chapter_overview now reads the student's waiting mistakes (the Fix list's), counts them by notes part, starts at the part holding most, and uses the latest one as its worked example. Shown only while V can explain (the explain switch). Lesson update (2026-11-21, owner, to match the mockup): the map is a card with the mistakes in each part, a question to try (\"Your turn\") sits under the reply, and three buttons (Go on, Explain more simply, Open the notes) stand in for V's own while a lesson is the latest reply; Go on asks chapter_overview for the next part by number. CHANGE (owner, 2026-11-23, from Vedu's and Abha's chats): the message is now \"Teach me <chapter> for <exam>.\" (no \"Start from what I got wrong.\"); V no longer works the latest mistake in its reply (it wrote the working and \"the answer is (A)\" with the question nowhere on screen); that mistake is the Your turn card instead, marked \"You got this one wrong before\", with a fresh question only when none of theirs fits the card; and a right answer there writes answer_correct, so it leaves the Fix list. Read replies from 2026-11-23 apart.",
    why: "674 students had a day with 3+ wrong answers in one chapter in the 28 days to 2026-11-21, and only 4 asked V to teach a chapter: nobody knew it could. Ask V under a question card, which says exactly what V will do, sends about half of all V messages. The owner approved the places in a mockup (2026-11-21). The card's own spot waits for the stuck-offer readout (one line per answer).",
    metric:
      "surface_viewed 'teach_chapter' (action shown / tap, metadata.from me_weak, mock_result, v_button, v_pick; once a day each): taps over students shown, per place; then the chats a tap opened (chat_interactions message starting \"Teach me \") and whether the student sent a second message there. scripts/chat/teach-chapter-readout.sql. The lesson buttons log as from lesson_go_on, lesson_simpler and lesson_notes: a second message sent by a button is counted apart from a typed one, so the buttons cannot pass the second-message bar on their own.",
    rule: `Keep a place if ${V_TEACH_CHAPTER_TAP_KEEP_PCT}%+ of the students shown its button tap it, and keep the whole idea if ${V_TEACH_CHAPTER_ON_KEEP_PCT}%+ of the chapters taught from a tap get a second message from the student. A place under the tap bar goes; under the second bar, read the replies before changing anything.`,
    liveSince: "2026-11-21",
    windowDays: 28,
    readout: "v-teach-chapter",
    status: "running",
  },
  {
    id: "v-learn-first",
    title: "V teaches a chapter from Learn's lessons wherever Learn teaches it",
    change:
      "Where Learn teaches the chapter (CBSE and HSC Class 12 Maths, and the Class 12 chapters of MHT-CET and JEE Mains Maths: 57 chapter links), V's Teach me lesson shows Learn's lessons as the map, each with the student's Learn progress (Done, n of 3, New) and their mistakes on the lesson to start with. SECOND CHANGE THE SAME DAY (owner, 2026-11-22, third iteration): the map is the whole reply. Tapping a lesson plays Learn's own lesson full screen over V (slides, questions, progress saved), even where Learn would lock it; V writes one line and teaches nothing; the Your turn card and the lesson's Go on / Explain more simply / Open buttons are gone on Learn chapters. Every other chapter keeps the notes lesson. BEFORE IT WENT LIVE (owner, 2026-11-23): NDA Maths joined, all 31 chapters (Concept Ladder's NDA course, 368 lessons, Class 11 and 12), so NDA's Teach me moved from the notes lesson to the Learn map; read NDA apart from the Class 12 courses.",
    why: "The owner (2026-11-22): \"Learn was designed for this only\", \"give Learn priority wherever it's available\", then \"let Learn concepts run as it is, full screen, in V\": the lesson itself, not V's retelling of it. Learn's 254 lessons had 3 learners ever (last on 2026-11-04): nothing led students there. About 220 students answered a Maths question in these four exams in the 30 days to 2026-11-22.",
    metric:
      "surface_viewed 'teach_chapter' with metadata.from lesson_learn (action shown: a Learn map in V; tap: a lesson opened from it), then surface_viewed 'learn_start' (the lesson begun: its first move) the same day, and Learn answers (learn_attempts). From the deploy after 2026-11-25, also user_activity learn_visit (migration 0288): for a lesson opened and not answered, whether the student reached the questions or stopped in the slides, which slide and how long on it (the readout's second query). Measurement only: what students see is unchanged. scripts/chat/learn-first-readout.sql",
    rule: `Keep Learn first if ${V_LEARN_FIRST_OPEN_KEEP_PCT}%+ of the Learn maps V shows lead to a lesson opened from the map. Under it, read how far opened lessons got (begun, a question answered) before changing anything.`,
    liveSince: "2026-11-22",
    windowDays: 28,
    readout: "v-learn-first",
    status: "running",
  },
  {
    id: "v-checkin",
    title: "V asks \"How's your study going?\" after 4+ days away",
    change:
      "The first time a student opens V after 4 or more days without answering anything, V asks \"Good to see you. How's your study going?\" with three taps, in place of the \"Your day\" card that day. Going well shows the card. Stuck on a chapter names the two chapters with the most mistakes waiting (or lets them type one to V), then that chapter's notes and its Fix. Short on time offers Fix 5 mistakes (else the chapter that carries the most marks). It never counts the days away. No AI call. From 2026-11-24 the gap counts answers in any exam, not only the card's exam, so a student who practised another exam within 4 days is no longer asked: fewer showings from that date.",
    why: "The owner (2026-11-21) wanted V to ask how a student's study is going. A return after a gap is when a student most needs a small first step, and the answers say how returning students feel, which nothing measured before. 786 returns after 4+ days in the 28 days to 2026-11-21.",
    metric:
      "surface_viewed 'v_checkin' (once a day each: shown, well, stuck, short, chapter, other, go): the share of students asked who tap an answer, the split of answers, and practice later that day (question_practiced, drill_started or mock_started after the question) against the card it replaces on the same kind of day (v_day card 'since' after 4+ days away, before 2026-11-21: 7 of 10). scripts/chat/checkin-readout.sql",
    rule: `Keep it if ${V_CHECKIN_ANSWER_KEEP_PCT}%+ of the students asked tap an answer and ${V_CHECKIN_PRACTISE_KEEP_PCT}%+ of showings are followed by practice that day (the card it replaces: 7 of 10). Under either, return to the card. Small numbers (about 10 a week open V on such a day), so a rough read.`,
    liveSince: "2026-11-21",
    windowDays: 28,
    readout: "v-checkin",
    status: "running",
  },
  {
    id: "v-step-chips",
    title: "Tap a step of V's explanation for Explain or Reply",
    change:
      "V's explanation of a question, when its steps are numbered, is shown as a bubble per step (the opening line, each step, the answer). Tapping a step shows Explain (V explains that step alone, and the question goes to Fix your mistakes like a No) and Reply (that step quoted above the typing box). V's rule 7 now asks for numbered steps. Replaced \"Teach me step by step\".",
    why: "Students ask about one step in their own words (\"where did the 9y\u00b2 go\", \"explain clearly step 2\"): about 1 typed follow-up to an explanation in 10, 30 days to 2026-11-15. The buttons kept under a reply got nothing (Reply 0 uses since 10-21, \"Which step lost you?\" 0 picks since 11-10, Teach me step by step 1 student start). Only 22% of explanations had numbered steps.",
    metric:
      "chat_interactions event_type step_by_step coded tap / explain / reply (by step, /dashboard/chat), against stepped explanations (signed-in AI replies that explained a question with 2+ numbered steps); understood Yes against No on V's answers to \"Explain step N more simply.\"; replies with reply_to_step (0259)",
    rule: `Keep it if ${V_STEP_CHIPS_TAP_KEEP_PCT}%+ of stepped explanations get a step tapped and ${V_STEP_CHIPS_YES_KEEP_PCT}%+ of answered Explain replies get a Yes; if taps are high but Yes is low, read the Explain replies before changing the layout.`,
    liveSince: "2026-11-15",
    windowDays: 28,
    readout: "v-step-chips",
    status: "running",
  },
  {
    id: "v-fix-line",
    title: "Fix N mistakes in this chapter, under V's explanation",
    change:
      "Under an Ask V explanation, a signed-in student whose drill holds mistakes from the explained question's chapter sees the chapter pages' line, \"Fix 2 mistakes in this chapter\", with a Fix them button that opens the drill for that chapter (tag v_chapter). It replaced a note telling V the student's recent mistakes on the topic, which V used in 1 of 18 test replies.",
    why: "Of 553 Ask V taps (20 Oct to 9 Nov), 310 came from a student with another mistake in the same chapter in the 30 days before, and V cannot see answers given elsewhere on the site. A button built by code shows every time; practising one's own mistakes is how the drill fixes them.",
    metric:
      "Line shown under V (surface_viewed chapter_fix, from v_chapter) and drill starts from v_chapter that day; read with scripts/drill/chapter-fix-readout.sql",
    rule: `Keep it if ${V_FIX_LINE_KEEP_PCT}%+ of the times it is shown lead to a drill start from it that day.`,
    liveSince: "2026-11-10",
    windowDays: 28,
    readout: "v-fix-line",
    status: "decided",
    decision:
      "Removed on 2026-11-11 by the owner, a day in: too much under V's explanation, and distracting. Shown twice, one drill start from it; too few to judge either way. The same line on the chapter pages (chapter-fix) stays.",
  },
  {
    id: "v-follow-up-loop",
    title: "V sees the follow-up answer",
    change:
      "After an explanation, the \"One more like this\" question is linked to the explanation it followed (v_followups, migration 0250), the first one per explanation per day uses none of the day's free answers (chat_settings.followup_free), a right answer says \"Right: you used the same idea on a new question\" and offers another, and a wrong one offers \"Show me where I went wrong\", where V starts from the step that differs from the question it just explained.",
    why: "V explained questions well but never saw whether the explanation worked (V_LEARNING_LOOP.md). After an Ask V explanation, 26 to 43% of students got a different question in the same subtopic right within 7 days, against 54 to 57% after a plain miss; V's try card had been answered 3 times in 4 weeks.",
    metric:
      "npm run v:learning: follow-ups after an explanation (answered, right, free) against Ask V explanations, and the verified-learning rate after an Ask V explanation; guard: Ask V explanations a week must not fall",
    rule: `Keep it if a follow-up is answered after ${V_FOLLOW_UP_KEEP_PCT}%+ of Ask V explanations over the window and Ask V explanations do not fall; then read whether the verified-learning rate after an explanation rose.`,
    liveSince: "2026-11-10",
    windowDays: 28,
    readout: "v-follow-up-loop",
    status: "running",
  },
  {
    id: "v-premium-hourly",
    title: "Premium Pass lifts V's hourly limit",
    change:
      "Premium Pass holders may ask V up to 50 messages an hour (chat_settings.premium_per_person_per_hour, migration 0226); everyone else stays at 5. At the limit V says how long until the student can ask again, in its own bubble instead of an error, and a signed-in free student gets the Premium Pass card under it (Practice Pass holders get the line only: no upgrade price yet). Every stopped message is now kept (chat_interactions 'hourly_limit').",
    why: "The owner asked whether V should make the ₹499 pass more attractive (2026-11-07). 17 of the 32 people holding a paid pass use V, and 33 students sent 5 messages inside an hour (19 Oct to 7 Nov), 5 of them paying; the ₹199 Practice Pass keeps V's explanations, since it promises unlimited answers.",
    metric:
      "Messages stopped by the hourly limit (chat_interactions event_type 'hourly_limit', and the students behind them); free students shown the card (Vercel v_hourly_limit_hit) and the share who opened checkout (checkout_opened, surface 'v_hourly'), passes paid from it; Premium's share of pass sales against the Practice Pass, before and after",
    rule: `Keep it if ${V_PREMIUM_HOURLY_CHECKOUT_KEEP_PCT}%+ of the free students shown the card open checkout over the window, or Premium's share of sales rises; read the stopped messages before changing the limit.`,
    liveSince: "2026-11-07",
    windowDays: 14,
    readout: "v-premium-hourly",
    status: "running",
  },
  {
    id: "visual-solutions",
    title: "Animated solutions",
    change:
      "Where a question has a checked animated solution (about 6,850 PUBLIC on 2026-10-31: JEE, MHT-CET, board maths, SSC CGL, NDA and others), the solution opens Animated and plays once it is on screen, with a switch to Still. Live since 2026-10-26; what students do with it is recorded from today (solution_visual, migration 0208).",
    why: "A worked solution that moves step by step with the written one should be easier to follow than text alone, above all for graphs, loci and 3D. Until today nothing recorded a play, a finish or a switch to Still, so whether students watch them was unknown.",
    metric:
      "Signed-in students, staff left out, counted as student-question pairs: of the animations shown (action shown), the share played to the end (finished) and the share switched to Still (chose_still), by surface, exam and scene. npm run visuals:usage",
    rule: `Keep Animated as the default if ${VISUAL_FINISHED_KEEP_PCT}%+ of shown animations finish and under ${VISUAL_STILL_MAX_PCT}% are switched to Still; where one exam or surface passes ${VISUAL_STILL_MAX_PCT}% switched to Still, make Still the default there.`,
    liveSince: "2026-10-31",
    windowDays: 14,
    readout: "visual-solutions",
    status: "decided",
    decision:
      "Read 2026-11-16 (npm run visuals:usage): 1,874 of 2,387 shown animations played to the end (79%, bar 50%) and 167 switched to Still (7%, limit 20%). No surface or exam passes 20% on real numbers (NDA 3 of 5, MHT-CET 19%). Kept: Animated stays the default everywhere (owner, 2026-11-16). On /drill only 30% finish, worth a look.",
  },
  {
    id: "self-mark",
    title: "Understood / Review later on written answers",
    change:
      "Under every written (subjective) model answer on /browse, the /questions pages and the board readers, two buttons: Understood and Review later. Review later sends the question to Fix your mistakes (/drill), where written questions are now served with the same two buttons; Understood there fixes it. Signed-out visitors see the buttons and are asked to sign in, and the tap saves itself once they do.",
    why: "The drill was fed only by graded MCQ picks, so the ~27,000 written questions never reached it: in the 30 days to 2026-10-28 ~400 students opened ~6,500 model answers and nothing came back to them. No grader exists for a written answer, so the student judges their own (the owner's call): spaced repetition and metacognition for the board-exam half of the bank.",
    metric:
      "Share of signed-in written-answer reveals (question_practiced on a subjective question, surfaces bank + board) followed by a self_mark tap the same day; and of the questions saved for review, the share later marked Understood (an answer_correct with selfMark)",
    rule: `Keep it if ${SELF_MARK_TAP_KEEP_PCT}%+ of written reveals get a tap and ${SELF_MARK_FIXED_KEEP_PCT}%+ of saved questions are fixed within the window; under the tap share, ask students before adding anything to the buttons.`,
    liveSince: "2026-10-28",
    readout: "self-mark",
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
    status: "decided",
    decision:
      "Rs 199 beat Rs 99: 15 sales and Rs 3,185 in 23 to 29 Oct, against Rs 594 the week before. The pass then went to Rs 499 on 29 Oct (not recorded here) and sold 2 in 5 days, none after 30 Oct, so on 2026-11-03 the owner split it into two passes (pass-tiers).",
  },
  {
    id: "pass-tiers",
    title: "Two passes: Practice Rs 199, Premium Rs 499",
    change:
      "The www pass split by feature (migration 0212): a Practice Pass at Rs 199 lifts every online limit (answers, drill, saves, projected score, mocks, chapter tests, V); the Premium Pass stays at Rs 499 and adds PDF downloads. Online walls offer Practice, download boxes offer Premium.",
    why: "The 27 rupee buyers since 27 Sep split into two groups: 12 practised online and downloaded little, 12 downloaded PDFs and barely practised (4 both, 3 neither). Only 2 ever took more than the 3 free mocks. Rs 199 was the only price with a good sales week; Rs 499 is untested for downloads. The owner's call.",
    metric:
      "Pass revenue per week and checkout opened then paid (the two readings below), and how many of the sales are Practice (/dashboard/sales, \"of which Practice\"). Read from the day the Practice plan goes on sale. From 11 Nov a Practice holder can upgrade to Premium for the difference (pass note upgrade_credit:<paise>, lib/billing/upgrade): such a sale is Premium revenue at the upgrade price, so count it apart, not as a new Premium buyer",
    rule: `Keep both passes if a week's revenue beats Rs ${PASS_TIERS_BASELINE_WEEKLY_REVENUE} (the single Rs 499 pass) at 14 days. If Premium sells none in 4 weeks, try it nearer Rs 299 before folding downloads back in.`,
    liveSince: "2026-11-03",
    readout: "pass-tiers",
    status: "running",
  },
  {
    id: "why-not-buy",
    title: "Ask students who don't buy what stopped them",
    change:
      "Under the answer-limit offer and every download box, signed-in students see \"Not buying today? Tell us why:\" with four one-tap answers (Too expensive, Need to ask a parent, Free is enough for me, Not sure it's worth it), and \"Payment didn't work\" after closing a checkout.",
    why: "From 7 Oct to 4 Nov about 85% of the students an offer met closed it without opening checkout, and nothing recorded why. Whether the fix is price, the parent who pays, or a pass that is not worth enough decides what to build next. The owner asked, 2026-11-05.",
    metric:
      "Answers by reason, student group (Class 9-12, Graduate) and offer, on /dashboard/sales \"Why students didn't buy\"; the share of offers answered; and pass sales against the Rs 199 week (14 in 23 to 28 Oct), in case the question costs a sale",
    rule: `Read on the check date. With ${WHY_NOT_BUY_MIN_ANSWERS}+ answers, a reason holding ${WHY_NOT_BUY_LEAD_PCT}%+ of a group's answers decides that group's next change (price, a parent-facing offer, or a pass that sells an outcome). Fewer answers: run 2 more weeks. If sales fall below the Practice baseline while it runs, take it off.`,
    liveSince: "2026-11-05",
    windowDays: 14,
    readout: "why-not-buy",
    status: "running",
  },
  {
    id: "parent-pay",
    title: "Ask a parent to pay",
    change:
      "Under every pass offer (answer limit, download boxes, V's hourly offer), signed-in students see \"Can't pay yourself? Ask a parent to pay\": a short /pay link and a ready WhatsApp message. The parent pays on a page written for them, with no account, and the pass goes to the student.",
    why: "In the 30 days to 9 Nov, 586 students met an offer and 85% left without opening checkout; \"Need to ask a parent\" was 6 of the first 26 why-not-buy answers. Many students cannot pay themselves.",
    metric:
      "Passes a parent paid (entitlement note parent_link:<code>), and students at each step (link made, opened by a parent, parent started paying) on /dashboard/sales \"Ask a parent to pay\"; plus all pass sales against the 3 weeks before, so a parent sale that only replaces a student's own is seen",
    rule: `Keep if a parent pays for ${PARENT_PAY_KEEP}+ passes by the check date and total pass sales do not fall. Fewer: look at where the steps drop (links not sent, parents not opening, parents not paying) before deciding.`,
    liveSince: "2026-11-09",
    readout: "parent-pay",
    status: "running",
  },
  {
    id: "fix-points",
    title: "Vault Points: fix a mistake, take 1% off the pass",
    change:
      "Each question a student gets right after missing it on an earlier day earns a Vault Point (called a fix point until 9 Nov), worth 1% off a rupee pass, up to 40%. Points last 30 days and a purchase starts them again. Every offer card and /pricing show the lower price; the drill, Review, /me and the avatar menu show the points with their value (/me and the avatar from 9 Nov, to pass holders too). From 2026-11-21 V tells a student without a pass who reaches 10, 20, 30 or 40 points about them as a gift inside V (experiment v-gift).",
    why: "The owner's call (9 Nov), against the data: of 33 buyers, none had fixed 10+ mistakes before paying, and 18 paid on their first day. The bet is that a reward makes students fix more mistakes and turns some of the learners who never pay into buyers.",
    metric:
      "Graded fixes per active student (fix_points_readout, the award's own rule) in the 30 days after against the 30 days before (baseline 9 Nov: 792 fixes by 138 of 1,312 active students, 0.60 each), and passes sold with points (entitlement note fix_points:<n>)",
    rule: `Keep if fixes per active student rise ${FIX_POINTS_FIXES_LIFT_PCT}%+ AND ${FIX_POINTS_SALES_KEEP}+ passes sell with points. Miss either: switch it off. From 2026-11-15 Home shows the points as one line, "Vault Points: 2", whose Know more opens the full card in a panel (owner): its Fix your mistakes link is a tap deeper, so drill starts tagged me_points may drop for that reason alone.`,
    liveSince: "2026-11-09",
    windowDays: 30,
    readout: "fix-points",
    status: "running",
  },
  {
    id: "referrals",
    title: "Invite a friend: 25% off for them, 30 free days for you",
    change:
      "Every student gets an invite link (/r/<code>, made when they tap Get my invite link on Home). A friend who creates a new account through it gets 25% off their first rupee pass, on top of any Vault Points (50% at most together); when that friend pays, the inviter gets 30 days of Premium, after any Premium they hold, up to 6 times. A full refund ends the 30 days it earned.",
    why: "The owner's call (9 Nov), against the data: students share under 1% of the time (18 real practise-together sends in 3 weeks, 0 joins; 4 sign-ups from any share, ever). The bet is that a reward on both sides makes a student send the link and a friend buy.",
    metric:
      "Passes bought by referred friends (referrals.paid_at), with the steps before it: links made (referral_codes), share taps (share_events kind referral), friends who signed up through a link (referrals). `npm run referrals:readout` lists every referred sale so a student inviting their own second account shows up.",
    rule: `Keep if referred friends buy ${REFERRALS_SALES_KEEP}+ passes by the check date. Fewer: switch it off. From 2026-11-15 Home shows Invite a friend as one line whose Know more opens the offer and link in a panel (owner): the Get my invite link button is a tap deeper, so links made may drop for that reason alone.`,
    liveSince: "2026-11-10",
    readout: "referrals",
    status: "running",
  },
  {
    id: "flashcards",
    title: "Flashcards for everyone",
    change:
      "The board icon on every question card, once staff-only, now opens the page's questions as a deck of flashcards for everyone: one a screen, an MCQ answered by tapping an option (a wrong one goes to Fix your mistakes), a written answer by Show answer and then Understood / Review later, the animated solution on the back. Each answer counts toward the free answers like the card's. Staff keep the projector as it was.",
    why: "The owner's call (9 Nov): one question a screen with arrows between them reads as flashcards, a way to practise a list by recalling before seeing the answer.",
    metric:
      "Vercel events: flashcards_answer ÷ flashcards_open where role is student (props say which page and how the card was answered); students' answers in the deck also reach the drill and the answer counts like the card's. The card's board button went from a bordered square to a borderless round icon in the deploy that merged slicker Phase 2 (2026-11-10), so read flashcards_open counts across that date with care; the answers-per-open ratio is the judge, not opens",
    rule: `Keep it open to students if they answer ${FLASHCARDS_ANSWERS_PER_OPEN_KEEP}+ cards per deck opened, on average, by the check date. Below 1, it is opened and left: put it back to staff only.`,
    liveSince: "2026-11-09",
    readout: "flashcards",
    status: "running",
  },
  {
    id: "answer-limit",
    title: "25 free answers a day, down from 30",
    change:
      "Signed-in students now get 25 free answers a day in the bank and the book reader, down from 30, from 18:15 IST on 2026-10-23, at /dashboard/pricing.",
    why: "The answer limit is the only free limit students meet often (87 of 478 in the 14 days to 23 Oct; the mock limit 5 of 102, chapter tests 1 of 148, saves 2 of 93), and it brought 5 of the 11 tracked sales. 63 more students reached 20 to 29 answers on their best day, so a lower limit shows the pass to more of them. 77% of signups never meet any offer.",
    metric:
      "Students meeting the limit per day (paywall_event gate reveals, step shown, distinct students per IST day), against 10.7; of those, the share back on a later IST day within 7 days (question_practiced, mock_started or drill_started), against 65%; their checkout opens and passes. Read from 24 Oct, as 23 Oct straddles the change. The wall's wording changed on 2026-11-11 (answer-limit-copy), so read checkout opens before and after that day apart",
    rule: `Keep 25 if the students who meet it still come back (within ${ANSWER_LIMIT_RETURN_MAX_DROP} points of ${ANSWER_LIMIT_RETURN_BASELINE_PCT}%) and more of them open checkout; if the return share falls further, go back to 30.`,
    liveSince: "2026-10-23",
    readout: "answer-limit",
    status: "running",
  },
  {
    id: "signed-out-answers",
    title: "5 free answers signed out, down from 10",
    change:
      "A visitor who is not signed in can open 5 answers (bank, board reader, question papers, notes questions) before the sign-in prompt, down from 10, from 2026-11-24. The count is kept in the browser, so a visitor who had already opened 5 or more meets the prompt on the next answer.",
    why: "The owner (2026-11-24): five answers show enough of the bank to sign up for, so asking sooner should bring more signups, not fewer. It was raised from 3 to 10 on 2026-10-01, when visitors walled at the 4th tapped the locked card and left.",
    metric:
      "Signups per 100 India visitors (auth.users per IST day over Vercel unique visitors with country IN, summed by week), against about 10; reveal_wall_signin_click over reveal_wall_hit (Vercel), and signups a day against 89 (17-23 Nov). Read 25 Nov on, as 24 Nov straddles the change",
    rule: `Keep 5 if signups per 100 India visitors stay at or above ${SIGNED_OUT_SIGNUPS_PER_100_BASELINE}; if they fall a point or more below it over two weeks, go back to 10.`,
    liveSince: "2026-11-24",
    readout: "signed-out-answers",
    status: "running",
  },
  {
    id: "v-reveal",
    title: "V's replies shown a line at a time",
    change:
      "A new reply from V grows in its bubble one line at a time (the first at once, then a pause long enough to read each line, about 5 seconds for 8 lines), instead of landing as one block; a tap shows the rest. Replies from history show whole.",
    why: "The owner, 2026-10-23: one block is heavy to take in, one line after another helps students digest it, and it is how they are used to reading chats.",
    metric:
      "Share of V's AI replies followed by another message in the same conversation within 30 minutes, a repeat Ask V tap on the same question not counted (npm run v:followups), against 39% (77 of 195, 15 to 22 Oct). Thumbs are too few to read. Until 2026-11-07 repeat taps counted, which read 48% (111 of 233, 15 to 23 Oct)",
    rule: `Keep it if the follow-up share holds at ${V_REVEAL_FOLLOWUP_BASELINE_PCT}% or rises over two weeks; if it falls ${V_REVEAL_FOLLOWUP_MAX_DROP}+ points, read the conversations for replies left unread before changing the pace.`,
    liveSince: "2026-10-23",
    windowDays: 14,
    readout: "v-reveal",
    status: "decided",
    decision:
      "Read 2026-11-16: overall follow-ups fell from 39% to 33-34% (5+ points), but the mix moved: Ask V explanations went from 50 of 195 AI replies to 420 of 675, and they are followed up less (28% before, 21% after). Typed chats held: 63 of 145 (43%) before, 120 of 255 (47%) after. So the fall is the mix, not the reveal. Kept (owner, 2026-11-16).",
  },
  {
    id: "tutor-interest",
    title: "1:1 tutoring: is there demand?",
    change:
      "A Tutor button in the header, beside Ebooks, opens /tutor: Student or Teacher, then \"Looking for 1:1 tutoring?\" (a teacher is asked \"Would you like to teach 1:1?\"), then Online, Offline or Either on a Yes. Nothing is sold or booked. Since 28 Oct only signed-in accounts can answer, and a Yes from an account with no city or no mobile on file is asked for them last (city since 30 Oct; \"Not now\" allowed on each); the Yes answers are listed, with their cities, on /dashboard/tutor.",
    why: "The owner is weighing 1:1 tutoring and wants demand measured before anything is built. One page counts both sides: students who want a tutor and teachers who would teach.",
    metric:
      "Student and teacher answers, Yes and No, by Online / Offline / Either, and student Yes by exam (tutor_interest, migration 0190). Header Tutor taps (tutor_link_click) in Vercel, read by hand; the button went from an outlined box to a tinted pill in the deploy that merged slicker Phase 1 (2026-11-10), so read taps across that date with care. Answers given signed out before 28 Oct are one row each, so they can count a person twice",
    rule: `Take tutoring further (ask the Yes students for a price and a number) if ${TUTOR_STUDENT_YES_KEEP}+ students answer Yes in three weeks; below that, remove the button and record the result.`,
    liveSince: "2026-10-27",
    windowDays: 21,
    readout: "tutor-interest",
    status: "decided",
    decision:
      "Cleared the bar (52 student Yes by 7 Nov against 20), but 75 of 88 Yes answers asked for ONLINE tutoring, and the owner decided online tutoring is too hard to build (2026-11-16). Only 13 were open to offline, 1 of them in Pune. The Tutor button became Classes: an interest form for the owner's offline classes in Pune (experiment offline-classes). /tutor redirects there; the answers stay on /dashboard/tutor.",
  },
  {
    id: "tutor-price",
    title: "1:1 tutoring: what price?",
    change:
      "After a Yes on /tutor, a student sees ONE price for a 1-hour 1:1 session, ₹499, ₹749 or ₹999 (fixed per account), and answers \"Yes, I would book\", \"Only if it cost less\" (then picks a lower amount or Not sure) or No. A teacher says what they would charge, in four bands. Yes answers from before this are asked when they come back to /tutor. Nothing is sold; the page says bookings are not open.",
    why: "52 students said Yes to tutoring in 10 days, but a Yes cost them nothing. The owner will not contact them, so the price is asked where they already answer. One price each, never a menu, because a menu pulls every answer to the cheapest.",
    metric:
      "Per price: students shown it, and how many answered Yes, Only if cheaper (with the amount) and No, plus new Yes answers who left at the price (tutor_interest, migration 0223). Teacher rates by band. Read the prices against each other: saying \"I would book\" runs well ahead of paying",
    rule: `Once each price has ${TUTOR_PRICE_MIN_ANSWERS}+ answers (else run 2 more weeks): the highest price whose Yes share is at least half of ₹499's is the price to try first; if even ₹499 gets under a third Yes, the demand is for something cheaper, so look at the "would pay" amounts before building anything.`,
    liveSince: "2026-11-07",
    windowDays: 21,
    readout: "tutor-price",
    status: "decided",
    decision:
      "Ended early on 2026-11-16, 12 days before its check date, when the owner dropped 1:1 online tutoring: the price no longer decides anything. The answers given so far stay readable on /dashboard/tutor. The /me price card went with it.",
  },
  {
    id: "offline-classes",
    title: "Offline classes in Pune: who asks for a call?",
    change:
      "The header's Tutor button became Classes. /classes asks which course (NDA, CDS, AFCAT, MHT-CET, JEE, 10th Board, 12th Board, SSC CGL; one or more), Pune or another city (Pune first), an optional name and a mobile with consent, and promises a call within 2 days. Anyone can send it, signed in or not; one lead per mobile. Leads are listed Pune first on /dashboard/classes with WhatsApp, a Called tick and a CSV. 2026-11-23 (owner): the button left the header for the avatar menu (\"Offline classes\", students only, taps still classes_link_click with from=menu) and a lead now needs an account (the form shows a sign-in step; the route refuses signed-out posts). In its first 7 days the header brought ~11 leads (3 Pune), 5 of them signed out. Read leads before and after 2026-11-23 apart.",
    why: "The owner runs offline classes in Pune and wants to fill them. The 1:1 tutoring check showed demand, but mostly for online tutoring and from outside Pune (15 of about 3,050 student profiles name Pune), so this asks for something the team can act on: a number to call about a named course.",
    metric:
      "Leads per week from class_interest (migration 0265), Pune vs other, by course; header Classes taps (classes_link_click) in Vercel by hand. Read with the team: of the Pune leads called, how many came for a demo or joined. A Play button went up beside Classes on its first day (play-games, 2026-11-16) and \"PYQ Vault\" hides on phones from then, so the whole window shares the header with it",
    rule: `Keep the button if it brings ${CLASS_LEADS_PUNE_KEEP}+ Pune leads in 4 weeks; below that, keep the form but take the button out of the header and link it only from Pune-facing pages.`,
    liveSince: "2026-11-16",
    windowDays: 28,
    readout: "offline-classes",
    status: "running",
  },
  {
    id: "me-class-offer",
    title: "Ask on Home: offline classes for the student's exam",
    change:
      "Home (/me) shows one card below Today: Class 10 students (SPI or a Class 10 board in their exams; stage Class 9-10 alone does not count) are asked \"Are you looking for an SPI crash course? We run one offline in Pune.\", and NDA students \"Are you looking for offline NDA classes? We run them in Pune.\" Yes asks for the mobile (filled in from the account), Pune or another city and consent, and the lead joins /dashboard/classes (courses added to any earlier lead on that number); No hides it for good; Know more opens the exam's pattern-and-syllabus page (/exams/<exam>/syllabus, only once one is published) and the card stays. A Class 10 student who also targets NDA is asked about SPI first, then NDA. 2026-11-23 (owner, migration 0285): widened to MHT-CET, JEE, CDS, AFCAT, 12th Board and SSC CGL, and ONE card per student ever: the course for the exam in focus (else their first exam, else the first other exam with a course); any Yes or No, or a /classes lead, ends it. On the same day the header Classes button moved to the avatar menu, so this card is now the main way students meet the classes. The readout before 2026-11-23 covers SPI and NDA only (7 shown, 1 Yes).",
    why: "The owner wants to fill an SPI crash course and offline NDA classes in Pune. The header Classes form waits to be found (9 leads in 6 days, 0 for SPI); asking the students who fit, where they already are, may find the ones who would come. About 123 Class 10 students and 405 NDA students had signed in by 2026-11-22.",
    metric:
      "Per card: students who saw it (class_offer_answers.shown_at, migration 0282), Know more taps (more_at), Yes and No; Yes leads by Pune vs other (class_interest, from_section 'me'). scripts/classes/me-offer-readout.sql. Read with the team: of the Pune leads called, how many came for a demo or joined",
    rule: `Per card, keep it if ${ME_CLASS_OFFER_YES_KEEP_PCT}%+ of the students who saw it say Yes with a number, or it brings 3+ Pune leads in 4 weeks; otherwise take the card off and keep /classes alone.`,
    liveSince: "2026-11-22",
    windowDays: 28,
    readout: "me-class-offer",
    status: "running",
  },
  {
    id: "play-games",
    title: "Play: a calculation game in the header",
    change:
      "A Play button in the header (after Ebooks and Classes) opens /play: 60-second rounds of whole-number sums in 8 levels (add and subtract to 20, tables, division, two-digit sums, tables to 20, bigger times and divide, order of operations, two-digit times two-digit). A level is cleared by enough right answers at 80%+ and opens the next. Fun without rankings: a combo, a personal best and a race against your own best round. Anyone can play; progress is kept in the browser. To fit Play on a 360 px phone the words \"PYQ Vault\" now hide below 640 px (logo stays) and the header pills are 4 px narrower.",
    why: "The owner sees students slip on everyday calculation in class, and studying is a chore, so a game may bring them back. The real question is whether it brings them back to STUDY, not just to the game.",
    metric:
      "Signed-in students with a play_round (migration 0267), rounds each, levels cleared; for players, study days (mocks, drill, bank answers) in the 7 days after their first round vs the 7 days before (scripts/play/readout.sql). Header Play taps (play_link_click) and every round signed in or out (play_round_end) in Vercel by hand. Classes and Ebooks are header buttons too: read their taps across 2026-11-16 with care. From 2026-11-17 /play is a hub (a ring of subjects) and the maths game moved to /play/maths, one tap further from the header; two English word games joined it (play_round with metadata.game word_builder or daily_word). Every game counts as playing; the readout also splits players by game. Read across 2026-11-17 with care. From 2026-11-18 /play is seven arcade games (Number Rain replaces the speed game at /play/maths; Word Builder is gone; play_round metadata.game number_rain, word_groups, daily_word, launch, element_hunt, timeline, pin_it), so read across 2026-11-18 with care too. From the deploy after 2026-11-23 Number Rain and Launch changed after the first rounds showed early drop-off: Number Rain got a gentle start, slower two-digit worlds (15 s+, at most 4 sums on screen for the first 10) and 3 stars a world; Launch keeps earlier shots on screen, aims by pulling back, shows aim help on levels 1-5, and shots never run out, so a Launch play_round is now one go at a level (reported on the hit, or as a miss when the player leaves the level) where it was 3 shots: read Launch rounds and clear rates across that deploy with care",
    rule: `Read once ${PLAY_PLAYERS_MIN}+ signed-in students have played. Keep Play in the header if players' study days after their first round are at least the days before (median) and a quarter or more play on 2+ days; if study days fall, the game is replacing study: move it off the header. Below ${PLAY_PLAYERS_MIN} players at the check, take the button out and link /play from mock results only.`,
    liveSince: "2026-11-16",
    windowDays: 28,
    readout: "play-games",
    status: "running",
  },
  {
    id: "exam-rooms",
    title: "Exam rooms: does an in-app group chat bring students back?",
    change:
      "A bubble at the bottom left (V keeps the right) opens Exam rooms for every signed-in student: one room per exam, listing only the exams on their profile, each with Join and the room's rules. In a room: a past question pinned every morning (Most Asked first, the team can swap it), doubts and replies, Ask V on a doubt (V answers in the room, 5 a day per student), Report (3 reports hide a message), and no member counts, ranks or links. The owner reviews reports at /dashboard/rooms and gets an evening email.",
    why: "Owner's call (2026-11-25), on the TotalGadha model: students sit in Telegram and WhatsApp exam groups for daily questions and doubts, and every one of those visits happens outside PYQ Vault. Claude first advised against it (thin rooms across many exams, students who come in bursts, the friends-only study circle at 3.8% Yes on 15 Nov); the owner chose every exam on day one over a pilot.",
    metric:
      "From exam_room_members, exam_room_messages and user_activity (scripts/rooms/readout.sql; staff left out): students who joined, joiners' active days in the 14 days after joining vs students active on the same days before who did not join, student messages a day per room, Ask V uses, reports and hides",
    rule: `Keep the rooms if ${EXAM_ROOMS_JOINERS_KEEP}+ students join in 4 weeks, joiners come back on ${EXAM_ROOMS_RETURN_LIFT}x+ the days of matched non-joiners, and the 3 busiest rooms average ${EXAM_ROOMS_MESSAGES_PER_DAY}+ student message a day. Otherwise close the rooms with no student messages and decide with the owner whether to keep any.`,
    liveSince: "2026-11-25",
    windowDays: 28,
    readout: "exam-rooms",
    status: "running",
  },
  {
    id: "partner-courses",
    title: "Partner courses on the store: do students want online courses?",
    change:
      "The header's Ebooks button became Store, and /store got a shelf per exam for online courses of our offline partner Defence Mania: CDS 1 2027 Sikandar 3.0 (starts 5 Dec) and the AFCAT 1 2027 Crash Course (starts 20 Dec), ₹1,999 each. Also LWS Pune's own SPI course (₹99, no start date on its page), on an SPI shelf shown first to SPI, Maharashtra SSC Class 10 and CBSE Class 10 students. A card says who runs the course and that it opens their site in a new tab, through our own tap link (/api/partner-course/[id]) with UTM tags. A CDS or AFCAT student sees their course shelf first; others find it under their other exams.",
    why: "Students buy online courses (Testbook earns this way), and 75 of 88 tutoring Yes answers wanted ONLINE teaching. Linking a partner's courses tests that demand without recording any video. Nothing is agreed with the partner yet; taps decide whether to ask for a commission or coupon deal.",
    metric:
      "Taps per course from partner_course_clicks (migration 0269): different students (account when signed in, else the browser's qb_vid), signed in vs out, per exam, staff left out (scripts/partner-courses/readout.sql). For scale, store visits and ebook buy taps over the same weeks (ebook-store). The rename from Ebooks to Store went out the same day, so read header store taps (ebook_store_link_click) across that deploy with care",
    rule: `Take it to Defence Mania as a commission or coupon deal if ${PARTNER_COURSE_TAPPERS_KEEP}+ different students tap one of its courses in 6 weeks; below that, take its shelves down and keep the Store name. The SPI course is LWS Pune's own, so it is read on its own taps (and LWS's sales), not this rule.`,
    liveSince: "2026-11-23",
    windowDays: 42,
    readout: "partner-courses",
    status: "running",
  },
  {
    id: "study-circle",
    title: "Study with your friends?",
    change:
      "Home shows every signed-in student a card: \"Study with your friends?\" You and up to 4 friends you already know would see each other's week (chapters done, mistakes fixed); no chat, no scores, no ranking; it says plainly that it is not built yet. Two equal buttons, \"I'd use this\" and \"Not for me\"; either answer hides it for good.",
    why: "A Class 10 student's post asking for a study partner (9 Nov). A circle of matched strangers was ruled out: most of these students are minors, and the pool is thin (29 students answered CBSE Class 10 questions in 30 days). Sharing here is already rare: 18 mock invites sent in 3 weeks, 0 joined. So demand is measured before anything is built.",
    metric:
      "Students who saw the card (it records when half of it first comes on screen), and how many answered Yes and No, overall and for Class 9-10 students (study_circle_interest, migration 0247; staff left out)",
    rule: `Build friends-only circles if ${STUDY_CIRCLE_MIN_YES}+ students say Yes AND that is ${STUDY_CIRCLE_YES_RATE * 100}%+ of those who saw it. Otherwise drop the idea. Even on a pass, the first build must show invited friends actually join.`,
    liveSince: "2026-11-09",
    windowDays: 15,
    readout: "study-circle",
    status: "decided",
    decision:
      "Read 2026-11-15, 9 days early: 6 of 157 students who saw it said Yes (3.8%), 14 said No, 137 never answered; Class 9-10 students 0 of 8. At that pace it would have ended near 18 Yes, under half the bar on both counts. Owner's call: drop it now. The card, its route and the Home read were removed the same day; the table and this readout stay. Do not bring back study circles, or matched strangers, without new evidence.",
  },
  {
    id: "ugc-net",
    title: "UGC NET Paper 1: a graduate exam nobody asked for",
    change:
      "UGC NET added 2026-11-10: Paper 1 (General Paper) of all 20 June 2024 shifts, 1,000 questions read from NTA's own master papers and keyed by question id from NTA's final key, each with a worked solution, and 20 timed mocks (50 q, 60 min, +2/0).",
    why: "Owner's call (graduate focus, 4 Nov: graduates were 22% of sign-ups but 44% of sales). No student had asked for it; UGC NET sits roughly 10 lakh candidates a cycle and Paper 1 is common to all of them.",
    metric:
      "Students with UGC NET among their exams, and passes those students bought, read by hand two weeks after the December 2026 sitting (dates on ugcnet.nta.nic.in)",
    rule: `Keep adding cycles (December 2025, then older ones) if ${UGC_NET_SIGNUPS_KEEP}+ students choose UGC NET AND ${UGC_NET_PASSES_KEEP}+ of them buy the pass. Otherwise it stays live but gets no more cycles.`,
    liveSince: "2026-11-10",
    windowDays: 70,
    readout: "ugc-net",
    status: "running",
  },
  {
    id: "clat",
    title: "CLAT UG: past papers and mocks three weeks before the exam",
    change:
      "CLAT added 2026-11-11: the Consortium's Set A papers for CLAT 2022-2026 (660 questions), passages read straight from the official booklets, each keyed from the Consortium's final key with a worked solution, and five timed mocks (+1/-0.25, 2 hours).",
    why: "Owner's call, to catch CLAT 2027 on 6 Dec 2026. No student had asked. It is a Class 12 exam, against the 4 Nov graduate focus, so it is a test of whether a timely exam with a fixed date draws students on its own.",
    metric: "Students with CLAT among their exams, and passes those students bought, read by hand on 2026-12-20, two weeks after the sitting",
    rule: `Keep adding (CLAT 2021, notes, CLAT PG) if ${CLAT_STUDENTS_KEEP}+ students choose CLAT AND ${CLAT_PASSES_KEEP}+ of them buy a pass. Otherwise it stays live with no more work. (Proposed: the owner set no rule; it copies UGC NET's.)`,
    liveSince: "2026-11-11",
    windowDays: 39,
    readout: "clat",
    status: "running",
  },
  {
    id: "checkout-contact",
    title: "No mobile-number form before Razorpay's ways to pay",
    change:
      "The order route returns the student's saved mobile (+91 form) and the checkout passes it to Razorpay with the email, and every checkout sets Razorpay's hidden.contact (the contact field optional and not shown), so a student with or without a saved mobile skips Razorpay's \"Enter mobile & email to continue\" form. Each checkout_opened row records hasContact.",
    why: "On 2026-11-12 two of three students who opened checkout closed it within 6 seconds (leaving takes two taps), both with a mobile saved with us that we never sent. A test account showed Razorpay's first screen is an empty mobile field. In 30 days 99 students opened checkout and 35 paid.",
    metric:
      "Checkout-to-paid in the same sitting (within an hour of opening) per student who opened checkout, split by checkout_opened metadata.hasContact; each group is compared with its own rate before (23 of 51 with a mobile, 12 of 48 without). Same sitting only since 2026-11-12, so a later payment brought by the checkout-return bar is not counted here",
    rule: `Keep it (it costs nothing) and judge the size: it worked if students with a saved mobile pay at above ${CHECKOUT_CONTACT_PAID_BASELINE_PCT}% and students without one above ${CHECKOUT_NO_CONTACT_PAID_BASELINE_PCT}%. If neither moves, the mobile form was not what stopped them, and the next look is the price.`,
    liveSince: "2026-11-13",
    windowDays: 21,
    readout: "checkout-contact",
    status: "running",
  },
  {
    id: "checkout-return",
    title: "Your checkout didn't complete: a bar on a later day",
    change:
      "A student who opened a pass checkout and did not pay sees a bar under the header on the first page they open on a later day: \"Your checkout didn't complete. The Practice Pass gives you unlimited practice for 6 months, and the more questions you practise, the more marks you get.\" with Complete payment (Razorpay in place, their own price), Ask a parent to pay and Not now. Up to 2 days within 7 days of the checkout; Not now or a payment stops it.",
    why: "45 days to 2026-11-12: 110 students opened checkout, 71 never paid, and 43 of those 71 came back on their own (27 the next day). Nothing reminded them. Owner's wording: practice is what improves the score.",
    metric:
      "Students who left a checkout unpaid, and the share who paid on a later day; the bar's chain from paywall_event gate return: shown, then checkout_opened, then paid. From 2026-11-19 the owner also WhatsApps students with a mobile (checkout-followup, owner's choice to start before this readout), so read the bar on students WITHOUT a mobile too: only the bar reaches them",
    rule: `Keep it if more than ${CHECKOUT_RETURN_LATER_PAID_BASELINE_PCT}% of students who leave a checkout pay on a later day (12 of 83 before, with no reminder).`,
    liveSince: "2026-11-13",
    windowDays: 28,
    readout: "checkout-return",
    status: "running",
  },
  {
    id: "checkout-followup",
    title: "The owner WhatsApps students who left a checkout unpaid",
    change:
      "At 18:00 IST the owner gets one email listing every student who opened a pass checkout in the last 24 hours and did not pay (once per student per 14 days, staff and intl passes left out), with where they met the offer, the reason they tapped, and a WhatsApp link that opens with a message typed: who they are, the pass and price, an offer to help, and the student's parent pay link. Students with no mobile are listed by email. The owner sends each by hand.",
    why: "20 Oct to 12 Nov, 65 students left a checkout unpaid (26 with a mobile) and only 5 paid within 7 days. The bar (checkout-return) is the automatic reminder; a personal message from the founder answers the question or the parent problem the bar cannot.",
    metric:
      "Of students listed, the share who pay a pass within 7 days of leaving, those WITH a mobile (messageable) against those WITHOUT (bar only, same period), so the bar's effect cancels out. Before: 2 of 26 with a mobile, 3 of 39 without (8% each). scripts/billing/checkout-followup-readout.sql",
    rule: `Read at 4 weeks. It worked if students with a mobile pay at ${CHECKOUT_FOLLOWUP_KEEP_POINTS}+ points above students without one (both were ${CHECKOUT_FOLLOWUP_BASELINE_PCT}% before). Small numbers (about 1 messageable student a day), so a rough read.`,
    liveSince: "2026-11-19",
    windowDays: 28,
    readout: "checkout-followup",
    status: "running",
  },
  {
    id: "welcome-exam-confirm",
    title: "Welcome screen confirms the exam the student came from",
    change:
      "When the page a new student came from names an exam (the exam they tapped, else the page they go back to, else the page they first landed on; lib/exam/examFromPath), the first welcome screen asks \"Preparing for MHT-CET?\" with one Yes, continue button, an optional class row, Choose a different exam (the old screen) and Skip for now. Before, it asked class then exam cold: a chapter page never set the exam cookie, so nothing was pre-selected.",
    why: "In the 30 days to 2026-11-12, 712 of 2,021 new students (35%) left the first welcome screen unanswered and only 955 (47%) left with an exam; 46% of students since 2026-09-01 have no exam, and those who skip never pick one later. 57% land first on a chapter page that names its exam, mostly from ChatGPT.",
    metric:
      "New sign-ups (staff left out) by student_profiles: the share with target_exams set, and the share with onboarded_at still null after 24 hours; split by whether examFromPath(acq_landing) names an exam, since only those see the new screen",
    rule: `Keep it if more than ${WELCOME_EXAM_PICKED_BASELINE_PCT}% of new students leave with an exam and fewer than ${WELCOME_SCREEN1_LEFT_BASELINE_PCT}% leave the first screen unanswered. If the share with an exam rises but students change the guessed exam later at /account more than rarely, the guess is wrong too often: look at which routes it came from.`,
    liveSince: "2026-11-13",
    windowDays: 14,
    readout: "welcome-exam-confirm",
    status: "running",
  },
  {
    id: "exam-guess-card",
    title: "Home shows a no-exam student the exam we guessed",
    change:
      "A student who never chose an exam sees \"Your exam: CBSE Class 12 (our guess)\" on Home with Correct and Change, in place of \"Studying for CBSE Class 12?\". The guess (80%+ of 3+ practised questions in one exam, else the page they first landed on) is stored in student_exam_guesses (migration 0254), backfilled on 2026-11-14 for 1,024 of 1,255 such students and refreshed daily (infer-exams.yml); target_exams is never written by it. Accounts from 2026-11-13 keep the old card until 2026-11-28, so the welcome-exam-confirm test stays clean.",
    why: "1,260 students on www who signed up before 2026-11-13 had no exam, so Home could not offer Start next, the study plan or their exam's mocks; a CBSE 12 student with a pass ignored the old card on 4 visits. Tested against students who chose, the guess was right 94% of the time from practice and 92% from the first page.",
    metric:
      "student_exam_guesses (read with the report mode of `npm run profile:infer-exams`): of students who saw the card (card_seen_at), the share who tapped Correct or Change; Correct vs Change is the guess's accuracy as students judge it; and of guessed students who later chose an exam, the share whose choice includes the guess",
    rule: `Keep it if ${EXAM_GUESS_CARD_TAP_KEEP_PCT}%+ of students who see it tap within 14 days and Change stays under 15% of taps. If Change is higher, look at which source (practice or landing) the changed guesses came from before the guess drives anything else on Home.`,
    liveSince: "2026-11-14",
    windowDays: 14,
    readout: "exam-guess-card",
    status: "running",
  },
  {
    id: "install-app",
    title: "Install PYQ Vault from the site (/app)",
    change:
      "A public /app page installs PYQ Vault to the home screen: one Install button on Android Chrome, the Share steps on iPhone, \"open this in Chrome or Safari first\" inside Instagram or Facebook. The account menu (phones not yet running the app) and the footer link to it, and V's app answer points at it. The service worker now registers for every visitor, which some Chrome versions need before they offer an install; Chrome's own install bar stays suppressed, so the offer appears only where we put it.",
    why: "About 8 students asked for an app in the four weeks to 2026-11-13 (7 asked V, 1 the contact form). The site already installed like an app, but nothing offered it. A Play Store listing comes next only if installs are real and installed students come back more.",
    metric:
      "Vercel events: app_install_click (outcome), app_installed (via button or browser), app_opened (launches from the icon, the one count that covers iPhone too), against /app page views. student_profiles.app_opened_at (migration 0255, staff left out): students who opened the installed app, and of those, the share active on 3+ other IST days in the 14 days after that date, against the share of all students active in the same weeks (20.8% of 1,174 who were active 17-30 Oct). Installers are self-selected keen students, so a higher share is a floor test, not proof the app caused it",
    rule: `List it on the Play Store next (a Trusted Web Activity) if ${INSTALL_APP_STUDENTS_KEEP}+ students open the installed app in the 4 weeks AND their 3+-day return share beats ${INSTALL_APP_RETURN_BASELINE_PCT}%. Fewer installs: keep /app as it is and stop there.`,
    liveSince: "2026-11-14",
    windowDays: 28,
    readout: "install-app",
    status: "running",
  },
  {
    id: "score-calculator",
    title: "Answer-key score calculators (/score-calculator)",
    change:
      "A free JEE Main score calculator: paste the response-sheet link, get marks on NTA's key subject by subject, share the score, and a \"tell me when the key is out\" alert before key day. SSC calculators follow once their browser reader is checked on a real sheet. The score needs no account; signing in only saves it.",
    why: "Distribution, not product, is the bottleneck. On answer-key day thousands of students search for a score calculator, and a shared score brings the next student. Ranked first of the 2026-11-16 distribution tactics.",
    metric:
      "Vercel events score_calc_check (outcome scored | error), score_calc_share, score_calc_alert; score_checks rows per sitting (one per sheet); signups whose acq_landing starts /score-calculator; page views of /score-calculator/jee-main in key week",
    rule: "Keep and build the SSC calculators if JEE Main 2027 Session 1 key week brings 1,000+ scored sheets AND 50+ signups landing on the calculator. Fewer: keep the page for search, build nothing more.",
    liveSince: "2026-11-16",
    windowDays: 90,
    readout: "score-calculator",
    status: "running",
  },
  {
    id: "teacher-or-student",
    title: "Ask \"Are you a teacher or a student?\" in the download boxes",
    change:
      "Every download box (/browse, mock and board papers, homework, formula and revision sheets) shows one line under its download buttons, in the download view only: \"Are you a teacher or a student?\" with Teacher and Student. Asked once per account, never signed out or to staff; the answer is student_profiles.user_role (migration 0258), seeded with the 96 tutor-interest answers.",
    why: "The download box made 273 accounts from 1 Oct to 1 Nov 2026, the third-largest signup route, but only 37% of them ever studied (100% of accounts that began by answering a question). Some are teachers, some wanted one file, and nothing told them apart: 6 self-declared teachers with activity were too few to test a behaviour rule.",
    metric:
      "Answers (student_profiles.user_role_at since the merge) by role, and the answer rate per box (surface_viewed role_question, metadata.box, against answers). Then the behaviour rule's precision against the answers. All in scripts/profile/teacher-student-readout.sql.",
    rule: `Use the labels if ${TEACHER_STUDENT_ANSWERS_MIN}+ accounts answer in 3 weeks: count teachers apart in readouts, and label accounts that never answered with the behaviour rule only if ${TEACHER_RULE_PRECISION_PCT}%+ of the accounts it names say Teacher. Fewer answers: move the question to after the file downloads.`,
    liveSince: "2026-11-15",
    windowDays: 21,
    readout: "teacher-or-student",
    status: "running",
  },
  {
    id: "blog-posts",
    title: "Blog posts and exam syllabus pages, published without a deploy",
    change:
      "Articles live in the database (migration 0263): the /blog skill writes a draft, the owner reads it at /dashboard/blog and taps Publish. Three kinds: news (a date, a result, a change), data (an analysis on the bank's numbers) and evergreen (an exam's pattern, syllabus and marks at /exams/<exam>/syllabus). About 2-3 a week.",
    why: "Students search exam dates, patterns and syllabi far more than chapter names, and many do not know them. Three blog posts in code (Sep-Oct 2026) brought 1 signup; whether more posts, of which kind, bring students is what this measures.",
    metric:
      "Signups whose first page was an article, by kind, as a share of all signups since the first database article (scripts/blog/readout.sql); Search Console clicks on /blog and /exams/*/syllabus pages, read by hand.",
    rule: `Per kind: keep writing it if its pages bring ${BLOG_SIGNUP_SHARE_KEEP_PCT}%+ of all signups in the 6 weeks, or ${BLOG_GSC_CLICKS_KEEP}+ Search Console clicks a week by the last week. Otherwise stop writing that kind; published pages stay.`,
    // The first database article (the CLAT syllabus page) was published on 2026-11-16.
    liveSince: "2026-11-16",
    windowDays: 42,
    readout: "blog-posts",
    status: "running",
  },
  {
    id: "gulf-price",
    title: "A Gulf price for the www passes",
    change:
      "Buyers in the UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain see and pay Rs 399 for the Practice Pass and Rs 999 for the Premium Pass (plans practice-pass-gulf and mock-pass-gulf, priced by country), instead of Rs 199 and Rs 499. Every price shown (pricing, walls, V, Fix Points, the checkout bar, the parent link) follows the buyer's country.",
    why: "Students outside India are mostly Indian families in the Gulf (34 since 9 Oct, CBSE 12, NEET and JEE first), with higher incomes than India; 1 of them had paid, Rs 199. A higher price may earn more per student without losing the sale.",
    metric:
      "Pass revenue (entitlements.amount_paise, source razorpay) from students whose signup_country is one of the six, per such student who signed up in the window, against the same before (Rs 199 from 34). Read the Gulf passes sold and any Gulf checkouts left unpaid (paywall_event) beside it",
    rule: `Keep the Gulf price if Gulf revenue per Gulf student beats Rs ${GULF_PRICE_BASELINE_RUPEES_PER_STUDENT} with at least ${GULF_PRICE_MIN_SALES} Gulf sales in the 6 weeks. Fewer sales, or less revenue per student: switch the two Gulf plans off, so Gulf buyers pay the India price again. The numbers are small, so this is a rough read, not proof.`,
    liveSince: "2026-11-15",
    windowDays: 42,
    readout: "gulf-price",
    status: "running",
  },
  {
    id: "enem-interest",
    title: "ENEM on the international site",
    change:
      "ENEM (Brazil) Day 2, 2021 to 2025, goes public on intl.pyqvault.com: 450 questions with worked solutions in Portuguese and 5 timed mocks, all free, no notes.",
    why: "Five years of one exam is a cheap way to learn whether Brazilian students find us at all before writing Portuguese notes or adding 2016-2020 (owner: \"will help gauge interest\"). The big Portuguese sites own ENEM topic searches, so it may draw little.",
    metric:
      "Students who chose ENEM (student_profiles.target_exams) since going public, and how many of them started an ENEM mock or answered 20+ ENEM questions; ENEM page views and their countries from Vercel beside it",
    rule: `Earn more work (2016-2020, then a 3-chapter notes pilot in Portuguese) if ${ENEM_STUDENTS_KEEP}+ students choose ENEM in 4 weeks and ${ENEM_ACTIVE_KEEP}+ of them use it. Fewer: leave ENEM as it is and add nothing.`,
    liveSince: "2026-11-15",
    windowDays: 28,
    readout: "enem-interest",
    status: "running",
  },
  {
    id: "practice-trial",
    title: "A 7-day Practice Pass on the 3rd day at the limit",
    change:
      "On a student's 3rd day at the daily answer limit, the wall offers a free 7-day Practice Pass instead of the Rs 199 offer (\"You are doing well. Here is your 7-day practice pass.\"). Nothing is granted until they tap Activate; the offer shows on 3 days at the limit at most, once per account, never to anyone who has held a pass. After it ends, the wall adds how many questions they answered in it (migration 0273). From 2026-11-21 V also tells an offered student about it as a gift inside V (experiment v-gift), with the same Activate: read the trial numbers before and after that date apart; a trial activated from V is recorded as surface_viewed 'v_gift' action activate.",
    why: "12 of 20 pass sales from 3 to 18 Nov came within a day of a student's first day at the limit, so a trial earlier would give that moment away. Past the 3rd day only 4 of 46 buyers in six weeks had paid, while 63 students had met the limit on 3+ days and never bought. The owner asked for a trial (2026-11-18); a reverse trial lets them feel what the pass removes.",
    metric:
      "Of students offered (practice_trial_offers), the share who tap Activate (entitlements source 'trial') and the share who buy a pass (source 'razorpay') within 14 days of their trial ending, against 4 of 67 (6%) before; plus all pass sales against the weeks before, in case earlier buyers start waiting. scripts/billing/practice-trial-readout.sql. The free limits were cut at 19:32 IST on 2026-11-21 (answers 15 to 10 a day, drill 10 to 5, mocks 3 to 1, chapter tests 5 to 3; owner): students reach their 3rd limit day sooner and more of them qualify, and the 6% baseline was measured at 15, so read students offered before and after that time apart (before it: 15 offered, 8 activated)",
    rule: `Read at 6 weeks. Keep if ${PRACTICE_TRIAL_KEEP_PCT}%+ of offered students buy, switch it off at ${PRACTICE_TRIAL_STOP_PCT}% or less (at /dashboard/pricing), in between run 4 more weeks. Small numbers (about 13 students a week), so a rough read.`,
    liveSince: "2026-11-19",
    windowDays: 42,
    readout: "practice-trial",
    status: "running",
  },
  {
    id: "v-intl",
    title: "V on the international site",
    change:
      "V shows on intl.pyqvault.com, told only what is true there: IMAT and ENEM, the IMAT pass paid by card through Paddle (rupees for a buyer in India), intl's own pages, and replies in the student's language. Build a practice test stays www-only.",
    why: "From 30 Oct V was hidden on intl while its Ask V buttons still sent: 3 IMAT students tapped, V answered, and they saw nothing (one tapped five times and hit the hourly limit). They were asking for it.",
    metric:
      "International students (an intl exam in student_profiles.target_exams) who sent V a typed question since it went live, how many came back to V on a second day, and their hourly-limit hits. scripts/chat/v-intl-readout.sql",
    rule: `Read at 3 weeks. Keep V on intl and give it more intl work (an IMAT practice-test builder) if ${V_INTL_ASKERS_KEEP}+ international students ask it something and ${V_INTL_RETURNERS_KEEP}+ come back on a second day. Fewer: leave V on (it costs little) and add nothing more for intl.`,
    liveSince: "2026-11-19",
    windowDays: 21,
    readout: "v-intl",
    status: "running",
  },
  {
    id: "notes-visuals",
    title: "Visuals: the notes' pictures and diagrams in one place",
    change:
      "The header's Visuals button (in the slot Classes left, 2026-11-23) opens /visuals/<subject> for the student's exam: every notes visual of that subject as a grid of squares, with Exam and Subject dropdowns, chapter chips with counts and All · Try it · 3D · Pictures. A tile opens it full screen (swipe up for the next) with the concept's name and intuition, Read in notes, Practise 3 questions (that concept's own questions in the notes drill panel; answers count toward the free limit) and Share. Signed-in students see the chapters with mistakes waiting first. Notes visuals only (912 across 27 subjects on www), not animated solutions. 2026-11-25: Read in notes opens the concept's notes in a panel over the visual (the stuck offer's), so `notes` from then on counts panels opened, not visits to the notes page; leaving from the panel is `full_notes`.",
    why: "Animated solutions are measured popular (499 students, 82-86% of plays finished, 7% switched to Still), and the owner asked for every visual in one place. The notes' 542 diagrams sit one per concept deep inside notes pages, and nothing recorded whether anyone used them.",
    metric:
      "Signed-in students who open a visual, and of them who tap Practise 3 questions and Read in notes (user_activity surface_viewed, surface visuals: page, open, practise, notes; staff left out; scripts/gallery/readout.sql). Header taps signed in or out (visuals_link_click) in Vercel by hand",
    rule: `Keep the header button if ${NOTES_VISUALS_OPENERS_KEEP}+ signed-in students open a visual in 4 weeks and ${NOTES_VISUALS_PRACTISE_PCT}%+ of them tap Practise 3 questions; below either, bring the numbers to the owner with a choice (move it under Notes, or keep it).`,
    liveSince: "2026-11-23",
    windowDays: 28,
    readout: "notes-visuals",
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
  | "ugc-net-students"
  | "ugc-net-passes"
  | "clat-students"
  | "clat-passes"
  | "v-false-not-found"
  | "v-clarify-turns"
  | "v-practice-after"
  | "v-explain-students"
  | "v-explain-similar-right"
  | "v-strategy-answers"
  | "v-strategy-no-data"
  | "v-plan-students"
  | "v-plan-days-done"
  | "v-progress-students"
  | "v-progress-next-step"
  | "self-mark-tap-share"
  | "self-mark-review-fixed"
  | "v-pay-offer-shown"
  | "v-hourly-stopped"
  | "v-hourly-checkout"
  | "v-pay-offer-checkout"
  | "price-weekly-revenue"
  | "price-checkout-paid"
  | "answer-limit-students"
  | "answer-limit-return"
  | "v-follow-up"
  | "visual-finished"
  | "visual-still"
  | "homework-day-visitors";

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
      { on: "2026-10-23", value: 121, note: "Live Pages report read on 2026-10-28; 4,733 discovered, not indexed" },
      {
        on: "2026-11-06",
        value: 597,
        note: "Export of 2026-11-10; jumped 121 to 597 on 2026-10-24. 452 www + 145 intl. 124 of the www pages are old IMAT URLs that now redirect to intl, so expect about 473. IMAT 257, SSC CGL 117, NDA 81; JEE, CBSE, HSC, CET and NEET about 50 together",
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
    source:
      "Vercel → Analytics → Events → v_hello_click ÷ v_hello_shown, unique visitors. The hello and both events were removed on 2026-11-05",
    entries: [
      { on: "2026-11-05", value: 2.5, note: "30 days to 5 Nov: 97 of 3,944. By week from 8 Oct: 3.5, 2.5, 2.3, 2.1" },
    ],
  },
  "card-tap-rate": {
    label: "Next-step card tap rate (%)",
    source:
      "Vercel → Analytics → Events → next_step_card_click ÷ next_step_card_shown, unique visitors. The card and both events were removed on 2026-11-05",
    entries: [
      { on: "2026-11-05", value: 2.5, note: "30 days to 5 Nov: 192 of 7,555. By week from 8 Oct: 3.3, 3.1, 1.9, 2.3" },
    ],
  },
  "limit-sales": {
    label: "Passes sold since the free limits went on",
    source: "entitlements where source = 'razorpay' and granted_at >= the switch-on date; paywall_event shown rows by gate beside it",
    entries: [
      { on: "2026-10-05", value: 1, note: "Baseline: 1 pass sold since sales opened on 2026-09-27, before any of these limits" },
      { on: "2026-11-11", value: 37, note: "37 students, granted_at >= 2026-10-06" },
    ],
  },
  "starter-start-rate": {
    label: "Empty performance page: started a test within a day (%)",
    source:
      "user_activity: surface_viewed 'performance' rows by students with no graded attempt that day, then mock_started by the same student within 24 hours",
    entries: [
      {
        on: "2026-11-11",
        value: 27,
        note: "Since 6 Oct: 11 of 41 students (each student's first view, with no paper submitted before it; a start = a mock_attempts row within 24 hours)",
      },
    ],
  },
  "formula-indexed": {
    label: "Indexed /formula/ pages",
    source: "Search Console → Pages → Indexed, filtered to URLs containing /formula/",
    entries: [{ on: "2026-11-16", value: 61, note: "Chapter pages with Google impressions in 3 months (Performance, page contains /formula/), 53 on www; a lower bound on indexed" }],
  },
  "formula-signups": {
    label: "Signups whose first page was a /formula/ page",
    source: "student_profiles where acq_landing starts with /formula/ and created_at >= the live date",
    entries: [{ on: "2026-11-11", value: 12, note: "Since 2026-10-10 (bar 5); the indexed half is still unread" }],
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
    entries: [
      { on: "2026-10-15", value: 0, note: "Owner's screenshot of the first prompt: AglaSem, ConceptFirst, SelfStudys" },
      {
        on: "2026-11-04",
        value: 0,
        note: "All 5 asked once (owner's account, temporary chat, Unpersonalized). ExamSIDE named in 3 of 5; also AglaSem, Careers360, Testbook, Vedclass, PracBee, eSaral, Prepp. Chapter prompts differ: HSC 12 Rotational Dynamics cites our page as its first link, CBSE 12 Integrals does not. ChatGPT now writes solved questions in the chat and links last",
      },
    ],
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
    entries: [
      {
        on: "2026-11-10",
        value: 3.3,
        note: "12 Oct to 10 Nov: 384 taps on 11,540 cards; notes 314 (2.7%), strategy 70 (0.6%). Strategy chip retired 2026-11-11",
      },
    ],
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
    entries: [{ on: "2026-10-27", value: 19, note: "19 plans saved; 20 students tapped the Plan my week button (24 taps), 18 more plan asks typed" }],
  },
  "v-plan-days-done": {
    label: "V: planned days done (%)",
    source: "study_plans items ticked by lib/chat/weekPlan.ts tickPlan over each plan's week (loadPlanActivity), for plans whose week has ended",
    entries: [
      {
        on: "2026-10-27",
        value: 15,
        note: "Early: no plan's week had ended. 15 of 99 tasks: chapter days 5/63, drill 3/14, mock 7/19. One student asked to see a plan again. The button was replaced by How's my progress",
      },
    ],
  },
  "v-progress-students": {
    label: "V: students who opened How's my progress",
    source: "user_activity surface_viewed with metadata.surface 'v_progress' (one a day per student), distinct user_id since liveSince",
    entries: [{ on: "2026-11-15", value: 31, note: "28 Oct to 15 Nov, from user_activity; 43 openings" }],
  },
  "v-progress-next-step": {
    label: "V: progress-card openers who drilled or opened /performance within 30 minutes (%)",
    source:
      "user_activity: each 'v_progress' view followed within 30 minutes by drill_started, or by surface_viewed 'performance', for the same student",
    entries: [{ on: "2026-11-15", value: 55, note: "17 of 31 openers drilled or opened /performance within 30 minutes" }],
  },
  "self-mark-tap-share": {
    label: "Written answers: reveals followed by an Understood / Review later tap (%)",
    source:
      "user_activity: question_practiced on a question_format subjective question (surfaces bank + board), signed-in, since liveSince; the share with a self_mark row for the same student and question the same India day",
    entries: [],
  },
  "self-mark-review-fixed": {
    label: "Written answers: questions saved for review later marked Understood (%)",
    source:
      "user_activity answer_wrong with metadata.selfMark review since liveSince, distinct (user, question); the share with a later answer_correct carrying metadata.selfMark understood",
    entries: [],
  },
  "v-pay-offer-shown": {
    label: "V: students shown the pass offer at the day's limit",
    source:
      "Vercel Analytics reveal_daily_limit_hit with surface 'v' (once per page session); cross-check chat_interactions tool_calls where explain_question's result starts \"The student has used today's\"",
    entries: [{ on: "2026-11-16", value: 30, note: "Vercel visitors, 28 Oct to 10 Nov" }],
  },
  "v-pay-offer-checkout": {
    label: "V: students shown the offer who opened checkout (%)",
    source: "Vercel Analytics checkout_opened with surface 'v_chat' over v-pay-offer-shown; passes paid = checkout_paid, surface 'v_chat'",
    entries: [{ on: "2026-11-16", value: 3, note: "1 of 30 opened checkout from v_chat, 0 paid" }],
  },
  "v-hourly-stopped": {
    label: "V: messages stopped by the hourly limit, a week (students)",
    source: "chat_interactions event_type 'hourly_limit' over the 7 days before the reading (migration 0226), staff left out; the students behind them in brackets",
    entries: [],
  },
  "v-hourly-checkout": {
    label: "V: free students shown the Premium card at the hourly limit who opened checkout (%)",
    source: "Vercel Analytics checkout_opened with surface 'v_hourly' over v_hourly_limit_hit; passes paid = checkout_paid, surface 'v_hourly'",
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
  "ugc-net-students": {
    label: "Students with UGC NET among their exams",
    source: "student_profiles where 'ugc-net' = any(target_exams), staff excluded",
    entries: [],
  },
  "ugc-net-passes": {
    label: "Passes bought by students with UGC NET among their exams",
    source: "entitlements (source razorpay, active) joined to student_profiles with 'ugc-net' in target_exams",
    entries: [],
  },
  "clat-students": {
    label: "Students with CLAT among their exams",
    source: "student_profiles where 'clat' = any(target_exams), staff excluded",
    entries: [],
  },
  "clat-passes": {
    label: "Passes bought by students with CLAT among their exams",
    source: "entitlements (source razorpay, active) joined to student_profiles with 'clat' in target_exams",
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
    entries: [{ on: "2026-11-16", value: 0, note: "1 impression 16 Oct to 12 Nov against 0 the 28 days before: no ratio, too few searches" }],
  },
  "price-weekly-revenue": {
    label: "Pass revenue per week (Rs)",
    source: "entitlements where source = 'razorpay', granted_at in the 7 days to the reading, times the price then (Rs 99 before 07:30 IST on 2026-10-23, Rs 199 after); staff excluded",
    entries: [
      { on: "2026-10-23", value: 594, note: "Baseline at Rs 99: 6 sales in the 7 days to 23 Oct (6 more in the 3.5 weeks before)" },
      { on: "2026-10-29", value: 3185, note: "At Rs 199: 15 sales in 23 to 29 Oct (the in-place offer also went live on 25 Oct)" },
      { on: "2026-11-02", value: 1397, note: "At Rs 499: Rs 998 (2 sales) in 29 Oct to 2 Nov, scaled to 7 days; the baseline for pass-tiers" },
    ],
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
      "npm run v:followups (lib/chat/followUpShare.ts): typed_question rows with reply_source 'ai' in the window, staff left out, and the share with another typed_question in the same conversation_id within 30 minutes after. A repeat Ask V tap on the same question is not a follow-up (since 2026-11-07)",
    entries: [
      { on: "2026-10-23", value: 48, note: "Before the line-by-line reveal: 111 of 233 AI replies, 15 to 23 Oct. Repeat taps counted (the old measure)" },
      {
        on: "2026-11-07",
        value: 27,
        note: "Repeat taps left out: 65 of 239, 31 Oct to 7 Nov (36% and 35% the two weeks before; 39% before the reveal, 15 to 22 Oct). Ask V taps grew from a few to most messages over the same weeks, so the fall is not the reveal's alone",
      },
    ],
  },
  "visual-finished": {
    label: "Animated solutions: shown animations played to the end (%)",
    source: "npm run visuals:usage, the 'all' row's fin% (user_activity solution_visual, student-question pairs, staff left out)",
    entries: [],
  },
  "visual-still": {
    label: "Animated solutions: shown animations switched to Still (%)",
    source: "npm run visuals:usage, the 'all' row's still%; read the surface and exam rows for any past the limit",
    entries: [],
  },  "homework-day-visitors": {
    label: "Visitors who opened a homework day or a chapter's Top 10 (Vercel, a week)",
    source: "Vercel Web Analytics, routes /homework/[planSlug]/day/[day] and /homework/[planSlug]/top/[chapterSlug], unique visitors over the 7 days before the reading (bot-inflated, read the trend). Signed-in students from 2026-11-04 also in user_activity surface_viewed 'homework'",
    entries: [
      { on: "2026-11-04", value: 34, note: "Before the tab: 29 Oct to 4 Nov, homework reachable only from Board cards, the exam home and the footer. 68 visitors opened any homework page. Learn's tab in the same week: 29 opened a lesson" },
    ],
  },

};
