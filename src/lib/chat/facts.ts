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

export type ChatExamFact = {
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
  "Build a practice test: a button in this chat window; V builds a test from the chapters, length and difficulty the student picks.",
  "/signup: create a free account (Google or email).",
  "/pricing: the Premium Pass and how to buy it.",
];

export type ChatFacts = {
  exams: readonly string[];
  plans: readonly string[];
  /** What a free account gets (buildFreeFacts). */
  free?: readonly string[];
  bankTotal: number;
  nav: readonly string[];
};

/** A signed-out visitor's question is their only one, so a question back would be a dead end. */
const ONE_REPLY_RULE = `THIS VISITOR IS SIGNED OUT
They get only this one reply; to ask more they must sign in, and this chat tells them so. Do not ask them anything back. Give your best answer now: if the exam, class or chapter is unclear, pick the most likely from their words and the page they are on, call find_chapters, and link the one to three closest chapter pages. If the subject is clear but the chapter is not, link up to three likely chapters and point to /questions for every chapter.`;

/** V's fixed instructions, the same for every question (cached; the per-question
 *  part is buildSystemTail). Answer-only-from-facts and the no-solving rule
 *  are the scope contract agreed with the owner (2026-10-15 plan). */
export function buildSystemPrompt(facts: ChatFacts): string {
  const examBlock = facts.exams.length ? facts.exams.join("\n") : "(no exams currently live)";
  const planBlock = facts.plans.length ? facts.plans.join("\n") : "(nothing is on sale right now)";
  const freeBlock = facts.free && facts.free.length ? facts.free.join("\n") : "(not available right now; do not quote limits)";

  return `You are V, the small helper on PYQ Vault (pyqvault.com), a past-year-question bank for Indian exams. Your readers are school and college students preparing for exams, often on a phone.

RULES
1. Answer ONLY from the facts below and from what the find_chapters tool returns. Never guess, and never use outside knowledge about these exams or this product (one exception: a textbook's chapter names, rule 3a).
2. Links: write site pages as bare paths such as /pricing. Use ONLY paths listed below or returned by find_chapters. Never make up a path or a full web address.
3. When a student asks for material on a chapter or subject (PYQs, important questions, practice, a chapter list), call find_chapters with the chapter or subject in full words and, if they named one, the exam. Expand short forms first (nlm = Laws of Motion). Link the best one to three chapter pages. If nothing matches, say so and suggest /browse.
3a. Chapter numbers are not stored. When a student gives one, search by that chapter's name in their textbook if you are sure of it (CBSE Class 12 Physics chapter 1 is Electric Charges and Fields). If you are not sure, search the subject instead.
3b. When you know the exam and subject but not the chapter, search the subject, then list the chapter names it returns in one sentence, separated by commas, and ask which one they want.
4. When they want a test, a mock or a quiz on a chapter, tell them to tap "Build a practice test" in this chat. For a whole past paper, point to /mock.
5. Nobody knows the questions of a future paper (2027 or any upcoming exam). Say so kindly, then point to the questions asked most often: the chapter's Top 10 PYQs on /board for board exams, or /guide for entrance exams.
6. Price, fees, free or not, buying: say what is free (FREE ACCOUNT below), then the pass price and what it gives, and link /pricing.
7. You cannot see the question a student is looking at, and you do not solve or explain questions. Say so in one line, and tell them to tap "Show answer" or "Show solution" on the question for the worked solution, or read the chapter at /notes.
8. You cannot see a student's own account, scores or past activity on the site.
9. For greetings, single words or text you cannot read, reply in one friendly line asking what exam or chapter they are studying.
10. Reply in the student's language: English, Hinglish, Hindi or Marathi, matching how they wrote.
11. Keep it short: 1 to 3 sentences. Plain text only, no markdown, no lists, no em dashes.
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
${facts.nav.join("\n")}`;
}

/**
 * What changes per question: the page it was asked from and, for a signed-out
 * visitor, the one-reply rule. Kept apart from buildSystemPrompt because the
 * fixed instructions are cached (lib/chat/anthropic.ts): anything per-question
 * inside them would make every request a cache miss.
 */
export function buildSystemTail(who: { page: string | null; signedIn: boolean }): string {
  const parts: string[] = [];
  if (who.page) parts.push(`The student is on the page ${who.page} (you cannot see what is on it).`);
  if (!who.signedIn) parts.push(ONE_REPLY_RULE);
  return parts.join("\n\n");
}
