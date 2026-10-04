/**
 * Pure fact-assembly for the "V" FAQ chatbot. No I/O — callers (the /api/chat
 * route) do the live reads (EXAM_REGISTRY, plans, bank count) and pass plain
 * data in here. Keeping this pure is what makes it unit-testable without a DB
 * and keeps the system prompt's shape (and the scope contract) in one place.
 */
import { formatRupees, planLengthLabel } from "@/lib/billing/plans";

export type ChatExamFact = {
  displayName: string;
  tier: "school" | "senior" | "graduate";
  hasMocks: boolean;
  boardExam: boolean;
  practiceOnly: boolean;
  /** Exam is ingested-but-private — must never be surfaced or recommended. */
  noPublicContent: boolean;
};

export type ChatPlanFact = {
  label: string;
  amountPaise: number;
  durationDays: number | null;
  scope: string;
};

const TIER_PROSE: Record<ChatExamFact["tier"], string> = {
  school: "school stage (Class 9-10)",
  senior: "senior stage (Class 11-12 & droppers)",
  graduate: "graduate stage",
};

/** One factual line per LIVE exam. noPublicContent exams are dropped — they
 *  have nothing a student could browse, so mentioning them would mislead. */
export function buildExamFacts(exams: readonly ChatExamFact[]): string[] {
  return exams
    .filter((e) => !e.noPublicContent)
    .map((e) => {
      const bits = [TIER_PROSE[e.tier]];
      if (e.boardExam) bits.push("a board exam with a textbook reader at /board");
      if (e.practiceOnly) bits.push("practice questions only, no past-year papers");
      if (e.hasMocks) bits.push("has timed mock tests at /mock");
      return `${e.displayName} — ${bits.join("; ")}.`;
    });
}

/** One factual line per active, sellable plan. */
export function buildPlanFacts(plans: readonly ChatPlanFact[]): string[] {
  return plans.map(
    (p) =>
      `${p.label}: ${formatRupees(p.amountPaise)} for ${planLengthLabel(p)} (unlocks: ${p.scope}).`
  );
}

/** Hand-written — there's no registry for "what's at this route" today, and
 *  building one for a handful of static pointers would be over-engineering. */
export const NAV_FACTS: readonly string[] = [
  "/browse — filter and preview the question bank by exam, chapter, subtopic, difficulty and year (free, no account needed).",
  "/mock — take a real past paper as a timed, auto-graded online mock test.",
  "/notes — self-sufficient teaching notes per chapter, free to read.",
  "/guide — exam strategy guides (which chapters to prioritise, how to spend your time).",
  "/board — a textbook-style reader for board exams (Maharashtra State Board, CBSE), section by section.",
  "/pricing — the Premium Pass: unlimited timed mock tests plus Word paper + answer-key downloads.",
];

export type ChatFacts = {
  exams: readonly string[];
  plans: readonly string[];
  bankTotal: number;
  nav: readonly string[];
};

/** Assembles the full system prompt V is called with. Answer-only-from-facts
 *  and the explain-a-PYQ refusal are the scope contract agreed with the user —
 *  see the "V — a basic FAQ chatbot" plan. */
export function buildSystemPrompt(facts: ChatFacts): string {
  const examBlock = facts.exams.length ? facts.exams.join("\n") : "(no exams currently live)";
  const planBlock = facts.plans.length
    ? facts.plans.join("\n")
    : "(nothing is on sale right now)";
  const navBlock = facts.nav.join("\n");

  return `You are V, the small FAQ assistant on PYQ Vault (pyqvault.com), a free public past-year-question bank for Indian entrance exams.

Answer STRICTLY and ONLY from the facts below. Never guess, and never use outside knowledge about these exams or this product.

If a question is out of scope — explaining or solving a specific question, anything about a signed-in student's own data or history, or a free-text search over question content — say briefly that V can't do that, and point at /browse (to search questions) or /notes (to study a topic) instead.

Keep answers short (1-3 sentences) and friendly.

EXAMS:
${examBlock}

BANK SIZE:
${facts.bankTotal} public questions across the live exams above.

PASSES ON SALE:
${planBlock}

WHERE THINGS ARE:
${navBlock}`;
}
