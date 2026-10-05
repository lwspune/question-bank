/**
 * Predefined-question FAQ layer for V, phase 2 — no LLM call, no API key.
 * Reuses the SAME facts inputs the live-LLM path (buildSystemPrompt in
 * facts.ts) already reads, just rendered through a template instead of
 * handed to Claude. Numbers here are never hardcoded — they come from the
 * caller's live reads (EXAM_REGISTRY, listActivePlans, a PUBLIC count), same
 * as the dormant LLM path, so this can't drift from the bank the way a
 * hand-written FAQ string would.
 */
import { formatRupees, planLengthLabel } from "@/lib/billing/plans";
import type { ChatExamFact, ChatPlanFact } from "@/lib/chat/facts";

export type ChatFaqId =
  | "exams"
  | "signup"
  | "mock-pass"
  | "notes"
  | "mocks"
  | "bank-size";

// Student-facing on purpose (see the "student specific" pivot). Downloads are
// answered inside "mock-pass" since 2026-10-01, when the one pass took them on.
export const PREDEFINED_QUESTIONS: readonly { id: ChatFaqId; label: string }[] = [
  { id: "exams", label: "Which exams do you cover?" },
  { id: "signup", label: "Do I need an account to browse questions?" },
  { id: "notes", label: "Where do I find notes for a subject?" },
  { id: "mocks", label: "Do you have timed mock tests?" },
  { id: "mock-pass", label: "What's the Premium Pass?" },
  { id: "bank-size", label: "How many questions are in the bank?" },
];

const QUESTION_ID_SET: ReadonlySet<string> = new Set(PREDEFINED_QUESTIONS.map((q) => q.id));

export function isChatFaqId(v: unknown): v is ChatFaqId {
  return typeof v === "string" && QUESTION_ID_SET.has(v);
}

export type ChatFaqInput = {
  exams: readonly ChatExamFact[];
  plans: readonly ChatPlanFact[];
  bankTotal: number;
};

function liveExams(input: ChatFaqInput): ChatExamFact[] {
  return input.exams.filter((e) => !e.noPublicContent);
}

function mockPassLine(input: ChatFaqInput): string {
  const plan = input.plans.find((p) => p.scope === "mocks");
  if (!plan) {
    return "There's no mock pass on sale right now — a set number of mocks are free for everyone, no pass needed yet. Check /pricing for current passes.";
  }
  return `The ${plan.label} is ${formatRupees(plan.amountPaise)} for ${planLengthLabel(plan)} — it unlocks unlimited timed mock tests once you use up your free ones, and PDF downloads of question papers and answer keys.`;
}

export function buildFaqAnswer(id: ChatFaqId, input: ChatFaqInput): string {
  switch (id) {
    case "exams": {
      const names = liveExams(input).map((e) => e.displayName);
      return `We cover ${names.length} exams, including ${names.slice(0, 6).join(", ")}${names.length > 6 ? " and more" : ""}. Browse them all at /browse.`;
    }
    case "signup":
      return "No — anyone can filter and preview the question bank for free, no account needed. Signing in (it's free) unlocks timed mock tests, saved questions, and reporting a wrong answer.";
    case "notes":
      return "Self-sufficient teaching notes, free to read, are at /notes — pick your exam there for a chapter-by-chapter hub.";
    case "mocks": {
      const withMocks = liveExams(input).find((e) => e.hasMocks);
      return withMocks
        ? `Yes — real past papers served as timed, auto-graded tests at /mock (${withMocks.displayName} is one of the exams that has them). A few are free; sign in (also free) to start one.`
        : "Yes — real past papers served as timed, auto-graded tests at /mock. Sign in (free) to start one.";
    }
    case "mock-pass":
      return mockPassLine(input);
    case "bank-size":
      return `${input.bankTotal.toLocaleString("en-IN")} public questions across the live exams, and growing. Filter them at /browse.`;
    default:
      return "I'm not sure about that one yet — try /browse or /notes, or ask a different question.";
  }
}
