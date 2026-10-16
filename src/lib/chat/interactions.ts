/**
 * Pure core for V's in-app usage readout (/dashboard/chat). The rows come from
 * public.chat_interactions (migration 0127); this only aggregates them.
 */
import { PREDEFINED_QUESTIONS } from "@/lib/chat/faq";
import { BUILDER_STEP_LABELS } from "@/lib/chat/builderSteps";

export type ChatInteractionRow = {
  eventType: "launcher_open" | "faq_click" | "typed_question" | "builder_step";
  questionId: string | null;
  createdAt: string;
  /** A typed question's (masked) text, migration 0145. */
  message?: string | null;
  signedIn?: boolean;
  /** The account that typed it; null when signed out. Dashboard only. */
  userId?: string | null;
  /** What V replied and where from; token use on AI replies (migration 0158). */
  reply?: string | null;
  replySource?: "ai" | "fallback" | null;
  tokensIn?: number | null;
  tokensOut?: number | null;
  /** Input read from / written to the prompt cache (migration 0161). */
  cacheReadTokens?: number | null;
  cacheWriteTokens?: number | null;
};

/** Claude Haiku 5.5 list prices, USD per token (lib/chat/anthropic.ts V_MODEL). */
const USD_PER_INPUT_TOKEN = 0.1 / 1_000_000;
const USD_PER_OUTPUT_TOKEN = 0.5 / 1_000_000;
// Prompt cache (5-minute): a read is a tenth of the input price, a write a quarter extra.
const USD_PER_CACHE_READ_TOKEN = USD_PER_INPUT_TOKEN * 0.1;
const USD_PER_CACHE_WRITE_TOKEN = USD_PER_INPUT_TOKEN * 1.25;

/** One AI answer's cost at list price. Shared with scripts/chat/replay-typed.ts. */
export function aiAnswerCostUsd(t: {
  tokensIn?: number | null;
  tokensOut?: number | null;
  cacheReadTokens?: number | null;
  cacheWriteTokens?: number | null;
}): number {
  return (
    (t.tokensIn ?? 0) * USD_PER_INPUT_TOKEN +
    (t.tokensOut ?? 0) * USD_PER_OUTPUT_TOKEN +
    (t.cacheReadTokens ?? 0) * USD_PER_CACHE_READ_TOKEN +
    (t.cacheWriteTokens ?? 0) * USD_PER_CACHE_WRITE_TOKEN
  );
}

export type ChatInteractionSummary = {
  totalOpens: number;
  totalClicks: number;
  byQuestion: { id: string; label: string; count: number }[];
  totalTyped: number;
  /** Typed questions in the order given (the loader returns newest first). */
  typed: {
    text: string;
    createdAt: string;
    signedIn: boolean;
    userId: string | null;
    reply: string | null;
    replySource: "ai" | "fallback" | null;
  }[];
  /** Typed questions V answered with AI, and their cost at list price. */
  aiAnswers: number;
  aiCostUsd: number;
  /** The practice-test builder's funnel (migration 0157), every step listed. */
  builder: { step: string; label: string; count: number }[];
};

const LABELS = new Map<string, string>(PREDEFINED_QUESTIONS.map((q) => [q.id, q.label]));

export function summarizeChatInteractions(rows: readonly ChatInteractionRow[]): ChatInteractionSummary {
  let totalOpens = 0;
  let totalClicks = 0;
  const counts = new Map<string, number>();
  const typed: ChatInteractionSummary["typed"] = [];
  const builderCounts = new Map<string, number>();
  let aiAnswers = 0;
  let aiCostUsd = 0;

  for (const r of rows) {
    if (r.eventType === "launcher_open") {
      totalOpens++;
      continue;
    }
    if (r.eventType === "builder_step") {
      if (r.questionId) builderCounts.set(r.questionId, (builderCounts.get(r.questionId) ?? 0) + 1);
      continue;
    }
    if (r.eventType === "typed_question") {
      if (r.message) {
        typed.push({
          text: r.message,
          createdAt: r.createdAt,
          signedIn: r.signedIn === true,
          userId: r.userId ?? null,
          reply: r.reply ?? null,
          replySource: r.replySource ?? null,
        });
      }
      if (r.replySource === "ai") {
        aiAnswers++;
        aiCostUsd += aiAnswerCostUsd(r);
      }
      continue;
    }
    totalClicks++;
    if (r.questionId) counts.set(r.questionId, (counts.get(r.questionId) ?? 0) + 1);
  }

  // A retired question keeps its raw id as the label, so old rows still render.
  const byQuestion = [...counts.entries()]
    .map(([id, count]) => ({ id, label: LABELS.get(id) ?? id, count }))
    .sort((a, b) => b.count - a.count);

  const builder = BUILDER_STEP_LABELS.map(({ step, label }) => ({ step, label, count: builderCounts.get(step) ?? 0 }));

  return { totalOpens, totalClicks, byQuestion, totalTyped: typed.length, typed, builder, aiAnswers, aiCostUsd };
}
