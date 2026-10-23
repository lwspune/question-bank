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
  replySource?: "ai" | "ai_failed" | "fallback" | null;
  tokensIn?: number | null;
  tokensOut?: number | null;
  /** Input read from / written to the prompt cache (migration 0161). */
  cacheReadTokens?: number | null;
  cacheWriteTokens?: number | null;
  /** The part of the writes kept for an hour (migration 0180). */
  cacheWrite1hTokens?: number | null;
};

/** Claude Haiku 5.5 list prices, USD per token (lib/chat/anthropic.ts V_MODEL). */
const USD_PER_INPUT_TOKEN = 0.1 / 1_000_000;
const USD_PER_OUTPUT_TOKEN = 0.5 / 1_000_000;
// Prompt cache: a read is a tenth of the input price; a write a quarter extra for 5 minutes, double for an hour.
const USD_PER_CACHE_READ_TOKEN = USD_PER_INPUT_TOKEN * 0.1;
const USD_PER_CACHE_WRITE_TOKEN = USD_PER_INPUT_TOKEN * 1.25;
const USD_PER_CACHE_WRITE_1H_TOKEN = USD_PER_INPUT_TOKEN * 2;

/** One AI answer's cost at list price. Shared with V's test runner (scripts/chat/eval/run.ts). */
export function aiAnswerCostUsd(t: {
  tokensIn?: number | null;
  tokensOut?: number | null;
  cacheReadTokens?: number | null;
  cacheWriteTokens?: number | null;
  /** Part of `cacheWriteTokens`, not added to it. Rows before migration 0180 have none. */
  cacheWrite1hTokens?: number | null;
}): number {
  const writes1h = t.cacheWrite1hTokens ?? 0;
  return (
    (t.tokensIn ?? 0) * USD_PER_INPUT_TOKEN +
    (t.tokensOut ?? 0) * USD_PER_OUTPUT_TOKEN +
    (t.cacheReadTokens ?? 0) * USD_PER_CACHE_READ_TOKEN +
    ((t.cacheWriteTokens ?? 0) - writes1h) * USD_PER_CACHE_WRITE_TOKEN +
    writes1h * USD_PER_CACHE_WRITE_1H_TOKEN
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
    replySource: "ai" | "ai_failed" | "fallback" | null;
  }[];
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

  return { totalOpens, totalClicks, byQuestion, totalTyped: typed.length, typed, builder };
}

/** One India-time day of V's AI use, as chat_ai_usage_by_day() (migration 0162) adds it up. */
export type AiUsageDay = {
  day: string;
  /** AI answers given. */
  answers: number;
  /** Answers that failed part-way: the student got the fixed reply, the tokens were still spent. */
  failed: number;
  tokensIn: number;
  tokensOut: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  cacheWrite1hTokens?: number;
};

export type AiUsageSummary = {
  /** Every day ever: the "AI cost so far" figure. */
  total: { answers: number; failed: number; costUsd: number };
  /** The last DAYS_SHOWN India-time days with any AI use, newest first. */
  days: (AiUsageDay & {
    costUsd: number;
    cachedShare: number | null;
    /** Cost over answers, failed ones included (they were billed too). */
    costPerAnswer: number | null;
    /** Share of input WRITTEN to the cache: the dear part, which the 1-hour cache exists to shrink. */
    writeShare: number | null;
  })[];
  weeks: CostWeeks;
};

export type CostWeek = { from: string; to: string; answers: number; costUsd: number; perAnswerUsd: number | null };

export type CostWeeks = {
  thisWeek: CostWeek;
  lastWeek: CostWeek;
  /** Change in cost per answer, 0.1 = 10% dearer; null when a week had too few answers to compare. */
  change: number | null;
  /** Cost per answer rose more than COST_RISE_FLAG. */
  flagged: boolean;
};

/** A rise in cost per answer above this gets flagged in the weekly review (V_SPEC.md). */
export const COST_RISE_FLAG = 0.2;
/** Fewer answers than this in either week and the change is noise (the first AI week had 2). */
export const MIN_ANSWERS_TO_COMPARE = 20;

const DAYS_SHOWN = 30;
const IST_OFFSET_MS = 330 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Prices V's AI use. The sums come from the database, one row per day, so no
 * row limit can make the total undercount (the old version added up the newest
 * 5,000 rows read). `cachedShare` is the part of the day's input read from the
 * prompt cache: near zero for days means the cache is not hitting.
 */
export function summarizeAiUsage(rows: readonly AiUsageDay[], now: Date): AiUsageSummary {
  const total = { answers: 0, failed: 0, costUsd: 0 };
  for (const r of rows) {
    total.answers += r.answers;
    total.failed += r.failed;
    total.costUsd += aiAnswerCostUsd(r);
  }
  const todayIst = new Date(now.getTime() + IST_OFFSET_MS);
  const cutoff = new Date(todayIst.getTime() - (DAYS_SHOWN - 1) * DAY_MS).toISOString().slice(0, 10);
  const days = rows
    .filter((r) => r.day >= cutoff)
    .sort((a, b) => b.day.localeCompare(a.day))
    .map((r) => {
      const input = r.tokensIn + r.cacheReadTokens + r.cacheWriteTokens;
      const costUsd = aiAnswerCostUsd(r);
      const billed = r.answers + r.failed;
      return {
        ...r,
        costUsd,
        cachedShare: input > 0 ? r.cacheReadTokens / input : null,
        costPerAnswer: billed > 0 ? costUsd / billed : null,
        writeShare: input > 0 ? r.cacheWriteTokens / input : null,
      };
    });
  return { total, days, weeks: compareCostWeeks(rows, now) };
}

/**
 * The Thursday cost line: cost per answer over the last 7 full India-time days
 * against the 7 before. Per answer, not the total: more students asking more
 * is the point, a dearer answer is what to look into. Today is left out, half done.
 */
export function compareCostWeeks(rows: readonly AiUsageDay[], now: Date): CostWeeks {
  const today = new Date(now.getTime() + IST_OFFSET_MS);
  const dayAgo = (n: number) => new Date(today.getTime() - n * DAY_MS).toISOString().slice(0, 10);
  const week = (from: string, to: string): CostWeek => {
    let answers = 0;
    let costUsd = 0;
    for (const r of rows) {
      if (r.day < from || r.day > to) continue;
      answers += r.answers + r.failed;
      costUsd += aiAnswerCostUsd(r);
    }
    return { from, to, answers, costUsd, perAnswerUsd: answers > 0 ? costUsd / answers : null };
  };
  const thisWeek = week(dayAgo(7), dayAgo(1));
  const lastWeek = week(dayAgo(14), dayAgo(8));
  const comparable = thisWeek.answers >= MIN_ANSWERS_TO_COMPARE && lastWeek.answers >= MIN_ANSWERS_TO_COMPARE;
  const change =
    comparable && thisWeek.perAnswerUsd !== null && lastWeek.perAnswerUsd
      ? thisWeek.perAnswerUsd / lastWeek.perAnswerUsd - 1
      : null;
  return { thisWeek, lastWeek, change, flagged: change !== null && change > COST_RISE_FLAG };
}
