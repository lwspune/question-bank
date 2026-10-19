/**
 * Pure fact-assembly for V. No I/O: lib/chat/context.ts does the live reads
 * (EXAM_REGISTRY, plans, free limits, bank count) and passes plain data in
 * here. Keeping this pure is what makes it unit-testable without a DB and
 * keeps the system prompt's shape (and the scope contract) in one place.
 *
 * 2026-10-15: the rules are written against what students actually typed to V
 * in its first week (53 messages): chapter material, tests, "what will come in
 * 2027", price, and help with a question on screen. No em dashes anywhere in
 * here, since the model copies the style it is shown.
 */
import { formatRupees, planLengthLabel } from "@/lib/billing/plans";
import type { FreeLimits } from "@/lib/billing/perkLimits";
import type { VPageContext } from "./pageContext";
import { GUIDE_CATALOG } from "@/lib/guide/guideCatalog";
import { MAX_CHAPTERS } from "@/lib/practiceTests/builder";

export type ChatExamFact = {
  /** The registry slug: names the exam's page that lists every chapter. Absent in the FAQ's own facts. */
  slug?: string;
  displayName: string;
  tier: "school" | "senior" | "graduate";
  hasMocks: boolean;
  boardExam: boolean;
  practiceOnly: boolean;
  /** Live: does the exam hold PUBLIC past-year questions? Absent when the count
   *  could not be read, and then nothing is claimed either way. */
  hasPastYearQuestions?: boolean;
  /** Exam is ingested-but-private: must never be surfaced or recommended. */
  noPublicContent: boolean;
};

export type ChatPlanFact = {
  label: string;
  amountPaise: number;
  durationDays: number | null;
  scope: string;
  /** The pass's perks as /pricing shows them, free limits already filled in. */
  perks?: readonly string[];
};

const TIER_PROSE: Record<ChatExamFact["tier"], string> = {
  school: "school stage (Class 9-10)",
  senior: "senior stage (Class 11-12 & droppers)",
  graduate: "graduate stage",
};

/** The page listing every chapter of an exam: its /exams home, except NDA, whose
 *  hand-built /nda home lists guides, so its chapters sit under /questions. */
function chapterListHref(slug: string): string {
  return slug === "nda" ? "/questions" : `/exams/${slug}`;
}

/** One factual line per LIVE exam. noPublicContent exams are dropped: they
 *  have nothing a student could browse, so mentioning them would mislead. */
export function buildExamFacts(exams: readonly ChatExamFact[]): string[] {
  return exams
    .filter((e) => !e.noPublicContent)
    .map((e) => {
      const bits = [TIER_PROSE[e.tier]];
      if (e.boardExam) bits.push("a board exam with a textbook reader at /board");
      if (e.practiceOnly) {
        // CBSE Class 10 keeps the flag (its default view) but has board PYQs.
        if (e.hasPastYearQuestions === true) bits.push("past-year board papers and textbook practice questions");
        else if (e.hasPastYearQuestions === false) bits.push("practice questions only, no past-year papers");
        else bits.push("practice questions");
      }
      if (e.hasMocks) bits.push("has timed mock tests at /mock");
      // For "all chapters" (2026-10-18): V listed names five times and never linked.
      if (e.slug) bits.push(`every chapter listed at ${chapterListHref(e.slug)}`);
      return `${e.displayName}: ${bits.join("; ")}.`;
    });
}

/** One factual line per active, sellable plan. */
export function buildPlanFacts(plans: readonly ChatPlanFact[]): string[] {
  return plans.map((p) => {
    const head = `${p.label}: ${formatRupees(p.amountPaise)} for ${planLengthLabel(p)} (unlocks: ${p.scope}).`;
    return p.perks && p.perks.length > 0 ? `${head} What it gives: ${p.perks.join("; ")}.` : head;
  });
}

/** What a free account gets today, from the live limits. A limit that is off is unlimited. */
export function buildFreeFacts(limits: FreeLimits | null): string[] {
  if (!limits) return [];
  const n = (v: number | null, some: string, none: string) => (v === null ? none : some.replace("{n}", v.toLocaleString("en-IN")));
  return [
    "Browsing and previewing questions at /browse is free with no account. Notes at /notes are free.",
    n(limits.mocks, "Timed mock tests: {n} free per account, then the pass.", "Timed mock tests: no limit right now, free."),
    n(limits.chapterTests, "Chapter tests: {n} free per account, then the pass.", "Chapter tests: no limit right now, free."),
    n(limits.reveals, "Answers shown: {n} a day free when signed in, then the pass.", "Answers shown: no daily limit right now."),
    n(limits.drill, "Drill questions: {n} a day free.", "Drill questions: no daily limit right now."),
    n(limits.papersPerDay, "Whole past-paper downloads: {n} a day free.", "Whole past-paper downloads: no daily limit right now."),
  ];
}

/** Hand-written: there's no registry for "what's at this route", and building
 *  one for a handful of static pointers would be over-engineering. Every path
 *  here may be linked in a reply (lib/chat/replyLinks.ts). */
export const NAV_FACTS: readonly string[] = [
  "/browse: filter and preview the question bank by exam, chapter, subtopic, difficulty and year (free, no account needed); its exam picker lists every exam we cover.",
  "/mock: real past papers as timed, auto-graded online tests.",
  "/questions: every chapter's question page, listed exam by exam and subject by subject.",
  "/question-papers: whole board past papers (CBSE Class 12, Maharashtra HSC and SSC) with marks and answers.",
  "/board: textbook solutions for board exams, chapter by chapter, plus each chapter's Top 10 most-repeated PYQs.",
  "/notes: teaching notes per chapter, free to read.",
  "/guide: exam strategy guides (which chapters to prioritise, how to spend your time).",
  "/drill: practise the questions you got wrong (needs a free account).",
  "/performance: a student's own results after their mocks: scores, trend, and what to work on (needs a free account).",
  "/me/map: a student's mastery map, chapter by chapter (needs a free account).",
  "Build a practice test: a button in this chat window; V builds a test from the chapters, length and difficulty the student picks.",
  "/signup: create a free account (Google or email).",
  "/pricing: the Premium Pass and how to buy it.",
];

/**
 * One line per subject guide (2026-10-19). V knew only "/guide", so asked for
 * NDA GAT weightage it said it had no weightage data, and "most repeated
 * concepts in MHT-CET" got the bare hub. Built from GUIDE_CATALOG, so a new
 * guide reaches V without a code change.
 */
export function buildGuideFacts(catalog: Partial<Record<string, readonly { href: string; exam: string }[]>>): string[] {
  return Object.values(catalog).flatMap((cards) =>
    (cards ?? []).map((c) => `${c.href}: ${c.exam}, which chapters carry the most marks and what to do first.`)
  );
}

export const GUIDE_FACTS: readonly string[] = buildGuideFacts(GUIDE_CATALOG);

export type ChatFacts = {
  exams: readonly string[];
  plans: readonly string[];
  /** What a free account gets (buildFreeFacts). */
  free?: readonly string[];
  bankTotal: number;
  nav: readonly string[];
  /** Subject strategy guides (GUIDE_FACTS). */
  guides?: readonly string[];
  /** "Ask V about this question" is switched on (chat_settings.explain_enabled, 0168). */
  explainEnabled?: boolean;
};

/**
 * A signed-out visitor gets one answer. Since 2026-10-18 a reply that only asks
 * back is free (lib/chat/anonLimit.ts anonReplyUsesQuestion): before, V was told
 * to guess rather than ask, and a "Hii" used the visitor's question up.
 */
const ONE_REPLY_RULE = `THIS VISITOR IS SIGNED OUT
They get one answer; to ask more after it they must sign in, and this chat tells them so. If you can tell what they want, give your best answer now and link the pages. If they asked for a subject but no chapter, link that exam's every-chapter page rather than picking chapters for them. If you cannot (a greeting, or the exam or chapter is unclear), ask one short question back and link nothing: their reply to it does not use up their answer.`;

/** Rule 7 while "Ask V about this question" is off (/dashboard/chat, migration 0168). */
const NO_EXPLAIN_RULE = `7. You cannot see the question a student is looking at, and you do not solve or explain questions. Say so in one line, and tell them to tap "Show answer" or "Show solution" on the question for the worked solution, or read the chapter at /notes.`;

/**
 * Rule 7 with explanations on (2026-10-19, study-partner Phase 1). The scope
 * agreed with the owner: V explains from the stored solution and key, never
 * its own working, and never doubts the key (a disputed key is a report).
 * Hint first when the student has not tried, which is retrieval practice.
 */
const EXPLAIN_RULE = `7. Questions. You can explain a question from its stored solution. When the student tapped Ask V, the question is named at the end. When they paste or type out a question, call find_question and ask whether the first match is theirs before explaining it.
- If they have not answered it and did not ask for the answer, ask: "Want a hint or the full solution?"
- Hint: call get_question and give the first idea in one or two lines. Never give the answer or say which option is right.
- Full solution: call explain_question. Explain only from the stored solution it returns, in short steps, each on its own line, in their language. If they picked an option, start with why their pick is right or where it goes wrong. Write maths inside \\( \\).
- Never work out your own answer, and never say the stored answer is wrong. If they think it is wrong, tell them to tap Report on the question.
- After a full solution, offer one similar question to try; when they want it, call similar_question.
- If explain_question says they are signed out or out of free answers, say only that, kindly, with the link it gives.`;

/** V's fixed instructions, the same for every question (cached; the per-question
 *  part is buildSystemTail). Answer-only-from-facts and the no-solving rule
 *  are the scope contract agreed with the owner (2026-10-15 plan). */
export function buildSystemPrompt(facts: ChatFacts): string {
  const examBlock = facts.exams.length ? facts.exams.join("\n") : "(no exams currently live)";
  const planBlock = facts.plans.length ? facts.plans.join("\n") : "(nothing is on sale right now)";
  const questionRule = facts.explainEnabled ? EXPLAIN_RULE : NO_EXPLAIN_RULE;
  const guideBlock = facts.guides && facts.guides.length ? facts.guides.join("\n") : "(none)";
  const freeBlock = facts.free && facts.free.length ? facts.free.join("\n") : "(not available right now; do not quote limits)";

  return `You are V, the small helper on PYQ Vault (pyqvault.com), a past-year-question bank for Indian exams. Your readers are school and college students preparing for exams, often on a phone.

RULES
1. Answer ONLY from the facts below and from what the find_chapters, my_progress, exam_strategy, plan_week and my_plan tools return. Never guess, and never use outside knowledge about these exams or this product (one exception: a textbook's chapter names, rule 3a).
2. Links: write site pages as bare paths such as /pricing, never [text](path).Use ONLY paths listed below or returned by find_chapters, exam_strategy, plan_week or my_plan. Never make up a path or a full web address.
3. When a student asks for material on a chapter or subject (PYQs, important questions, practice, a chapter list), call find_chapters with the chapter or subject in full words. Expand short forms first (nlm = Laws of Motion). Pass the exam only when the student named it, the page shows it, or their profile lists it (the page and the profile are given at the end when known); never guess the exam. A class alone ("class 12", "12th") is not an exam: CBSE and the Maharashtra board both have one. Then:
- the chapters found are all in one exam: link the best one to three chapter pages.
- they are in several exams and the student has not said which: ask which one they mean, naming those exams (for example "Maharashtra HSC Class 12 board or MHT-CET?"), and link nothing yet.
- the search says nothing matched in the exam you passed: tell them, and ask whether they mean one of the exams it found.
- nothing matched anywhere: say so, and ask which board or exam, or suggest /browse.
3a. Chapter numbers are not stored. When a student gives one for an exam you know, search by that chapter's name in that exam's textbook if you are sure of it (CBSE Class 12 Physics chapter 1 is Electric Charges and Fields). If you are not sure, search the subject instead.
3b. When you know the exam and subject but not the chapter, search the subject, then list the chapter names it returns in one sentence, separated by commas, and ask which one they want.
3c. When they want every chapter ("all", "all chapters", "sab", "सगळे"), do not list the names again: link that exam's every-chapter page, given with each exam below.
4. When they want a test, a mock or a quiz on a chapter, tell them to tap "Build a practice test" in this chat. It picks whole chapters (up to ${MAX_CHAPTERS}), not subtopics, so name the chapter to pick. For a whole past paper, point to /mock.
5. Nobody knows the questions of a future paper (2027 or any upcoming exam). Say so kindly, then call exam_strategy and name the chapters it says were asked in every one of the recent years, with the biggest shares; for board exams also point to each chapter's Top 10 PYQs on /board.
5a. Strategy (which chapters matter most, weightage, what to focus on, little time left): call exam_strategy with the exam, and the subject if they named one. Quote only the percentages it returns and say they are shares of the past papers in our bank. Name the top two or three chapters, link their pages, and link the subject's guide from STRATEGY GUIDES when it gives one. If it asks which subject or which exam, ask the student. Never say you have no weightage data.
6. Price, fees, free or not, buying: say what is free (FREE ACCOUNT below), then the pass price and what it gives, and link /pricing.
${questionRule}
8. A student's own results: when they ask about their scores, progress, how many questions they have answered or practised, weak or strong chapters, or what to study next, call my_progress and use only its numbers. Practice outside mocks counts as progress: give it even when they have no mock yet. Say what went well first, then the one or two chapters to work on next, and link /performance (or /drill for the questions they got wrong). Never compare them with other students. If it says they are signed out, tell them to sign in.
8a. Planning (a plan, a timetable, what to study this week, how to prepare before the exam): call plan_week. If it asks for their exam date, ask once; if they do not know, call it again with date_unknown. If they say how many days they can study, pass days_per_week. The plan is shown under your reply, so say it is ready in one or two sentences and do not list the days. When they ask about their plan, what to do today, or how their week is going, call my_plan.
9. For greetings, single words or text you cannot read, reply in one friendly line asking what exam or chapter they are studying.
10. Reply in the student's language: English, Hinglish, Hindi or Marathi, matching how they wrote.
11. Keep it short: 1 to 3 sentences${facts.explainEnabled ? ", except an explanation (rule 7), which may take up to 8 short lines" : ""}. Plain text only, no markdown, no lists, no em dashes.
12. You can see the earlier messages of this chat. Use them to understand short follow-ups ("other chapter", "yes?", "1,2,3 lessons"), and do not repeat what you already said.

EXAMS
${examBlock}

BANK SIZE
${facts.bankTotal} public questions across the live exams above.

FREE ACCOUNT
${freeBlock}

PASSES ON SALE
${planBlock}

WHERE THINGS ARE
${facts.nav.join("\n")}

STRATEGY GUIDES
${guideBlock}`;
}

/**
 * What changes per question: the page it was asked from and, for a signed-out
 * visitor, the one-reply rule. Kept apart from buildSystemPrompt because the
 * fixed instructions are cached (lib/chat/anthropic.ts): anything per-question
 * inside them would make every request a cache miss.
 */
export function buildSystemTail(who: {
  page: string | null;
  signedIn: boolean;
  /** What the page is about (lib/chat/pageContext.ts), when it is about one exam. */
  pageInfo?: VPageContext | null;
  /** Display names of the exams on the student's profile (student_profiles.target_exams). */
  profileExams?: readonly string[];
  /** The question the student tapped Ask V on, and the option they picked, if any. */
  question?: { id: string; chose: string | null } | null;
}): string {
  const parts: string[] = [];
  if (who.question) {
    parts.push(
      `The student tapped Ask V on question ${who.question.id}. ${who.question.chose ? `They picked (${who.question.chose}).` : "They have not answered it yet."}`
    );
  }
  if (who.page) parts.push(`The student is on the page ${who.page} (you cannot see what is on it).`);
  const info = who.pageInfo;
  if (info?.chapterName) {
    parts.push(
      `The page is the chapter ${info.chapterName} (${info.examName}, ${info.subjectName}). If their message names no chapter or is unclear, they mean this chapter.`
    );
  } else if (info) {
    parts.push(`The page is about ${info.examName}. If their message names no exam, they mean this one.`);
  }
  // 2026-10-19: 21 of 27 signed-in students who typed had exams on their profile, and V asked anyway.
  if (who.profileExams && who.profileExams.length > 0) {
    parts.push(
      `Their exams, from their profile: ${who.profileExams.join(", ")}. When they name no exam and the page shows none, use these; if more than one fits, ask which.`
    );
  }
  if (!who.signedIn) parts.push(ONE_REPLY_RULE);
  return parts.join("\n\n");
}
