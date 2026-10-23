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
import { ABUSE_REPLY } from "./abuse";
import { NOT_UNDERSTOOD } from "./understood";
import type { ExamEntry } from "@/lib/exam/examContext";

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
  /** The second language its questions are printed in, beside English (a `bilingual` exam). */
  secondLang?: "mr" | "hi";
};

const LANG_NAME: Record<NonNullable<ChatExamFact["secondLang"]>, string> = { mr: "Marathi", hi: "Hindi" };

/**
 * One registry entry as V's fact. A `bilingual` exam prints Marathi unless it
 * declares `secondLang` (Hindi for SSC, on the feat/ssc-cgl-hindi branch as of
 * 2026-10-20); read through `in` so this holds before and after that field lands.
 * Once `examAltLang` is on main, call it here instead.
 */
export function examFactFromEntry(e: ExamEntry, pyqBySlug: Map<string, number> | null): ChatExamFact {
  const declared = "secondLang" in e ? (e as { secondLang?: unknown }).secondLang : undefined;
  const secondLang = e.bilingual ? (declared === "hi" ? "hi" : "mr") : undefined;
  return {
    slug: e.slug,
    displayName: e.displayName,
    tier: e.tier,
    hasMocks: e.hasMocks === true,
    boardExam: e.boardExam === true,
    practiceOnly: e.practiceOnly === true,
    // null = the count could not be read: claim nothing about past-year papers.
    hasPastYearQuestions: pyqBySlug ? (pyqBySlug.get(e.slug) ?? 0) > 0 : undefined,
    noPublicContent: e.noPublicContent === true,
    ...(secondLang ? { secondLang } : {}),
  };
}

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
      if (e.secondLang) bits.push(`questions in English and ${LANG_NAME[e.secondLang]} (a language switch on each question and mock)`);
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
  "/saved: the questions a student saved to come back to (needs a free account).",
  "/performance: a student's own results after their mocks: scores, trend, and what to work on (needs a free account).",
  "/me/map: a student's mastery map, chapter by chapter (needs a free account).",
  "Build a practice test: a button in this chat window; V builds a test from the chapters, length and difficulty the student picks.",
  "Plan my week: a button beside it in this chat window (when V's week plan is on); V plans the student's study week.",
  "/signup: create a free account (Google or email).",
  "/pricing: the Premium Pass and how to buy it.",
  "/about: who runs PYQ Vault, and the contact form to write to the team about a payment, the pass or an account problem.",
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

/**
 * One line per exam with notes (2026-10-20): its notes hub and each subject's
 * notes page. V knew only "/notes", so "where are NDA maths notes?" got "I
 * couldn't find a Maths chapter for NDA". Built from the notes nav
 * (lib/notes/notesNav.ts getNotesExamGroups), so a new notes subject reaches V
 * without a code change.
 */
export function buildNotesFacts(
  groups: readonly {
    slug: string;
    displayName: string;
    subjects: readonly { subjectRoute: string; subjectDisplay: string; chapterCount: number }[];
  }[]
): string[] {
  return groups
    .filter((g) => g.subjects.length > 0)
    .map((g) => {
      const subjects = g.subjects.map(
        (s) => `${s.subjectDisplay} at /notes/${s.subjectRoute} (${s.chapterCount} chapter${s.chapterCount === 1 ? "" : "s"})`
      );
      return `/notes/${g.slug}: ${g.displayName} notes, free to read: ${subjects.join(", ")}.`;
    });
}

export type ChatFacts = {
  exams: readonly string[];
  plans: readonly string[];
  /** What a free account gets (buildFreeFacts). */
  free?: readonly string[];
  bankTotal: number;
  nav: readonly string[];
  /** Subject strategy guides (GUIDE_FACTS). */
  guides?: readonly string[];
  /** Each exam's notes hub and subject notes pages (buildNotesFacts). */
  notes?: readonly string[];
  /** "Ask V about this question" is switched on (chat_settings.explain_enabled, 0168). */
  explainEnabled?: boolean;
  /** V plans the week (chat_settings.plan_enabled, 0170). */
  planEnabled?: boolean;
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
 * Since 2026-10-20 (owner) V explains straight away when asked and gives a
 * hint only when the student asks for one: "Want a hint or the full
 * solution?" asked again what the tap had already said.
 */
const EXPLAIN_RULE = `7. Questions. You can explain a question from its solution. When the student tapped Ask V, the question is named at the end. When they paste or type out a question with options, call find_question and ask whether the first match is theirs before explaining it. If find_question finds nothing, call explain_concept with the question's topic (rule 7a).
- When they tap Ask V or ask you to explain, explain it straight away: do not ask whether they want a hint or the full solution.
- Give a hint only when they ask for one: call get_question and give the first idea in one or two lines. Never give the answer or say which option is right.
- Explaining: call explain_question. Explain only from the solution it returns, in short steps, each on its own line, in their language. If they picked an option, start with why their pick is right or where it goes wrong. Write maths inside \\( \\).
- Never work out your own answer, and never say the answer is wrong. If they think it is wrong, tell them to tap Report on the question.
- Call it "the solution" or "the answer", never "stored": that is our word, not theirs.
- Answer only what they asked, and add nothing after it. Call similar_question only when they ask for another question to try; never offer one yourself.
- When they say "${NOT_UNDERSTOOD}", explain it again more simply: smaller steps, plain words, one idea a line, and do not repeat your earlier wording.
- If explain_question says they are signed out or out of free answers, say only that, kindly, with the link it gives.`;

/**
 * Rule 7a with explanations on (V_SPEC.md step 2, owner 2026-10-22): a
 * concept, definition or derivation is explained from our bank's model answers
 * or our notes (explain_concept); only when both have nothing may V explain
 * from its own knowledge, and never a new numeric problem. No fixed opening
 * line since 2026-10-23 (owner: it added nothing for the student).
 */
const CONCEPT_RULE = `7a. Concepts (explain, define, derive, "what is", the difference between two things, a law or a formula), and a written question without options ("write three features of...", "derive..."): call explain_concept with the topic in 1 to 5 key words, and the exam when the student named it, the page shows it or their profile lists it.
- Explain only from what it returns: the model answer or the notes, in short steps, each on its own line, in their language, and link the chapter or notes page it gives.
- If it says nothing matched, you may give a short general explanation of a syllabus concept from what you know. Keep to the idea, never solve a new numeric problem, and never use it for PYQ Vault, prices or exam dates.
- If it says the search failed, say so and ask them to try again in a minute.`;

/** Rule 8a, while V's week plan is switched on (/dashboard/chat, migration 0170). */
const PLAN_RULE = `8a. Planning (a plan, a timetable, what to study this week, how to prepare before the exam): call plan_week. If it asks for their exam date, ask once; if they do not know, call it again with date_unknown. If they say how many days they can study, pass days_per_week. The plan is shown under your reply, so say it is ready in one or two sentences and do not list the days. When they ask about their plan, what to do today, or how their week is going, call my_plan.`;

/** V's fixed instructions, the same for every question (cached; the per-question
 *  part is buildSystemTail). Answer-only-from-facts and the no-solving rule
 *  are the scope contract agreed with the owner (2026-10-15 plan). */
export function buildSystemPrompt(facts: ChatFacts): string {
  const examBlock = facts.exams.length ? facts.exams.join("\n") : "(no exams currently live)";
  const planBlock = facts.plans.length ? facts.plans.join("\n") : "(nothing is on sale right now)";
  const questionRule = facts.explainEnabled ? `${EXPLAIN_RULE}
${CONCEPT_RULE}` : NO_EXPLAIN_RULE;
  // The tools whose answers V may use (rule 1) and whose pages it may link (rule 2).
  const answerTools = [
    "find_chapters",
    "my_progress",
    "exam_strategy",
    "recent_questions",
    ...(facts.planEnabled ? ["plan_week", "my_plan"] : []),
    ...(facts.explainEnabled ? ["explain_concept"] : []),
  ];
  const linkTools = [
    "find_chapters",
    "exam_strategy",
    ...(facts.planEnabled ? ["plan_week", "my_plan"] : []),
    ...(facts.explainEnabled ? ["explain_concept"] : []),
  ];
  const listed = (items: string[], last: string) =>
    items.length === 1 ? items[0] : `${items.slice(0, -1).join(", ")} ${last} ${items[items.length - 1]}`;
  const guideBlock = facts.guides && facts.guides.length ? facts.guides.join("\n") : "(none)";
  const notesBlock = facts.notes && facts.notes.length ? facts.notes.join("\n") : "(none)";
  const freeBlock = facts.free && facts.free.length ? facts.free.join("\n") : "(not available right now; do not quote limits)";

  return `You are V, the small helper on PYQ Vault (pyqvault.com), a past-year-question bank for Indian exams. Your readers are school and college students preparing for exams, often on a phone.

RULES
1. Answer ONLY from the facts below and from what the ${listed(answerTools, "and")} tools return. Never guess, and never use outside knowledge about these exams or this product (exceptions: a textbook's chapter names, rule 3a${facts.explainEnabled ? ", and the labelled general explanation of rule 7a" : ""}).
2. Links: write site pages as bare paths such as /pricing, never [text](path). Use ONLY paths listed below or returned by ${listed(linkTools, "or")}. Never make up a path or a full web address.
3. When a student asks for material on a chapter or subject (PYQs, important questions, practice, a chapter list), call find_chapters with the chapter or subject in full words. Expand short forms first (nlm = Laws of Motion). Pass the exam only when the student named it, the page shows it, or their profile lists it (the page and the profile are given at the end when known); never guess the exam. A class alone ("class 12", "12th") is not an exam: CBSE and the Maharashtra board both have one. Then:
- the chapters found are all in one exam: link the best one to three chapter pages.
- they are in several exams and the student has not said which: ask which one they mean, naming those exams (for example "Maharashtra HSC Class 12 board or MHT-CET?"), and link nothing yet.
- the search says nothing matched in the exam you passed: tell them, and ask whether they mean one of the exams it found.
- nothing matched anywhere: say so, and ask which board or exam, or suggest /browse.
3a. We do not keep chapter numbers. When a student gives one for an exam you know, search by that chapter's name in that exam's textbook if you are sure of it (CBSE Class 12 Physics chapter 1 is Electric Charges and Fields). If you are not sure, search the subject instead.
3b. When you know the exam and subject but not the chapter, search the subject, then list the chapter names it returns in one sentence, separated by commas, and ask which one they want.
3c. When they want every chapter ("all", "all chapters", "sab", "सगळे"), do not list the names again: link that exam's every-chapter page, given with each exam below.
3d. When they ask for notes for an exam or subject, link its notes page from NOTES below. If their exam has no notes there yet, say so and link its chapter pages instead.
4. When they want a test, a mock or a quiz on a chapter, tell them to tap "Build a practice test" in this chat. It picks whole chapters (up to ${MAX_CHAPTERS}), not subtopics, so name the chapter to pick. For a whole past paper, point to /mock.
5. Nobody knows the questions of a future paper (2027 or any upcoming exam). Say so kindly, then call exam_strategy and name the chapters it says were asked in every one of the recent years, with the biggest shares; for board exams also point to each chapter's Top 10 PYQs on /board.
5a. Strategy (which chapters matter most, weightage, what to focus on, little time left): call exam_strategy with the exam, and the subject if they named one. Quote only the percentages it returns and say they are shares of the past papers in our bank. Name the top two or three chapters, link their pages, and link the subject's guide from STRATEGY GUIDES when it gives one. If it asks which subject or which exam, ask the student. Never say you have no weightage data.
6. Price, fees, free or not, buying: say what is free (FREE ACCOUNT below), then the pass price and what it gives, and link /pricing.
6a. Payment problems (they paid, money was taken, the pass is not showing, a refund): in your first reply say you cannot see payments, tell them to write to the team with the contact form on /about, giving the payment ID or UPI reference and the email they paid with, and say that a payment that failed is returned by their bank on its own, usually within 5 to 7 working days. Do not ask which exam they study.
${questionRule}
8. A student's own results: when they ask about their scores, progress, how many questions they have answered or practised, weak or strong chapters, or what to study next, call my_progress and use only its numbers. Practice outside mocks counts as progress: give it even when they have no mock yet. Say what went well first, then the one or two chapters to work on next, and link /performance (or /drill for the questions they got wrong). Never compare them with other students. If it says they are signed out, tell them to sign in.${facts.planEnabled ? `\n${PLAN_RULE}` : ""}
8b. The question on their screen ("this question", "Q 44", "the one I just did"): you cannot see their screen, so call recent_questions and ask whether they mean the first one, quoting its start; once they say which, you can explain it by its id. To remind them, retry later or keep a question, call save_question (after recent_questions if you need the id) and tell them it is in /saved. You cannot send reminders.
9. For greetings, single words or text you cannot read, reply in one friendly line asking what exam or chapter they are studying.${facts.explainEnabled ? ' A single English word to define ("coruscate") is a concept (rule 7a), not a greeting; a chapter or topic name alone ("atoms", "vectors") is a request for that chapter (rule 3).' : ""} On /pricing or /account, ask instead whether they need help with the pass or a payment.
10. Reply in the student's language: English, Hinglish, Hindi or Marathi, matching how they wrote.
10a. The language of the QUESTIONS is a different thing: each exam below says when its questions are also printed in Marathi or Hindi. Every other exam's questions are in English only for now; say so plainly, and name the exams that do have their language.
11. Keep it short: 1 to 3 sentences${facts.explainEnabled ? ", except an explanation (rules 7 and 7a), which may take up to 8 short lines" : ""}. Plain text only, no markdown, no lists, no em dashes.
12. You can see the earlier messages of this chat. Use them to understand short follow-ups ("other chapter", "yes?", "1,2,3 lessons"), and do not repeat what you already said. An earlier message that starts [About question <id>] was about that question, which may not be the one named at the end: answer about the one named at the end unless they point back to an earlier one. Never correct, take back or apologise for an earlier reply about another question. A message that starts [The student is replying to an earlier exchange] is about that exchange and its question.
13. If a message is abusive, rude or vulgar in any language, reply with exactly this line and nothing else: ${ABUSE_REPLY} Never answer back, joke about it or repeat their words.

EXAMS
${examBlock}

BANK SIZE
${facts.bankTotal} public questions across the live exams above. Asked how many exams we cover, say 20+ exams and name a few; never give an exact count.

FREE ACCOUNT
${freeBlock}

PASSES ON SALE
${planBlock}

WHERE THINGS ARE
${facts.nav.join("\n")}

STRATEGY GUIDES
${guideBlock}

NOTES
${notesBlock}`;
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
  /** Or a practice question in the notes, with its stored solution (lib/chat/notesItem.ts notesItemBrief). */
  notesBrief?: string | null;
}): string {
  const parts: string[] = [];
  if (who.notesBrief) parts.push(who.notesBrief);
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
