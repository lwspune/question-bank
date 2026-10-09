/**
 * Pure core for V's in-app usage readout (/dashboard/chat). The rows come from
 * public.chat_interactions (migration 0127); this only aggregates them.
 */
import { PREDEFINED_QUESTIONS } from "@/lib/chat/faq";

export type ChatInteractionRow = {
  eventType: "launcher_open" | "faq_click" | "typed_question";
  questionId: string | null;
  createdAt: string;
  /** A typed question's (masked) text, migration 0145. */
  message?: string | null;
  signedIn?: boolean;
};

export type ChatInteractionSummary = {
  totalOpens: number;
  totalClicks: number;
  byQuestion: { id: string; label: string; count: number }[];
  totalTyped: number;
  /** Typed questions in the order given (the loader returns newest first). */
  typed: { text: string; createdAt: string; signedIn: boolean }[];
};

const LABELS = new Map<string, string>(PREDEFINED_QUESTIONS.map((q) => [q.id, q.label]));

export function summarizeChatInteractions(rows: readonly ChatInteractionRow[]): ChatInteractionSummary {
  let totalOpens = 0;
  let totalClicks = 0;
  const counts = new Map<string, number>();
  const typed: ChatInteractionSummary["typed"] = [];

  for (const r of rows) {
    if (r.eventType === "launcher_open") {
      totalOpens++;
      continue;
    }
    if (r.eventType === "typed_question") {
      if (r.message) typed.push({ text: r.message, createdAt: r.createdAt, signedIn: r.signedIn === true });
      continue;
    }
    totalClicks++;
    if (r.questionId) counts.set(r.questionId, (counts.get(r.questionId) ?? 0) + 1);
  }

  // A retired question keeps its raw id as the label, so old rows still render.
  const byQuestion = [...counts.entries()]
    .map(([id, count]) => ({ id, label: LABELS.get(id) ?? id, count }))
    .sort((a, b) => b.count - a.count);

  return { totalOpens, totalClicks, byQuestion, totalTyped: typed.length, typed };
}
