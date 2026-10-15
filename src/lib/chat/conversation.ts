/**
 * V's conversations (migration 0159). One conversation = the chat_interactions
 * rows sharing a conversation_id. This turns them into:
 *   modelHistory  V's memory: the last exchanges, sent with a new question
 *   historyTurns  the chat window, rebuilt for a signed-in student's device
 *   groupConversations / conversationJsonl  the dashboard and the export
 *   unreadFollowups  late answers (0160) the student has not opened yet
 *
 * Pure. Spec: tests/chat-conversation.test.ts.
 */
import { PREDEFINED_QUESTIONS } from "./faq";

export type ConversationRow = {
  id: string;
  eventType: "launcher_open" | "faq_click" | "typed_question" | "builder_step" | "v_followup";
  questionId: string | null;
  createdAt: string;
  message: string | null;
  reply: string | null;
  replySource: "ai" | "fallback" | "template" | "followup" | null;
  replyLinks: string[] | null;
  feedback: number | null;
  conversationId: string | null;
  pagePath: string | null;
  signedIn: boolean;
  /** A late answer's first opening (0160); null = unread. */
  seenAt?: string | null;
};

const PAGE_PATH_RE = /^\/[A-Za-z0-9/_.~-]*$/;
const PAGE_PATH_MAX = 300;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Exchanges V remembers (two = the last four messages). */
export const MEMORY_EXCHANGES = 2;
/** Messages the chat window shows. */
export const HISTORY_MESSAGES = 30;

/** The page a question was asked on: a site path only, query and fragment dropped. */
export function cleanPagePath(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const path = v.split(/[?#]/)[0];
  if (path.length > PAGE_PATH_MAX || !PAGE_PATH_RE.test(path)) return null;
  return path;
}

export function isConversationId(v: unknown): v is string {
  return typeof v === "string" && UUID_RE.test(v);
}

const FAQ_LABELS = new Map<string, string>(PREDEFINED_QUESTIONS.map((q) => [q.id, q.label]));

/** What the student asked in this row: typed text, the button they tapped, or
 *  the questions a late answer (0160) answers. */
function questionOf(r: ConversationRow): string | null {
  if (r.eventType === "typed_question" || r.eventType === "v_followup") return r.message;
  if (r.eventType === "faq_click" && r.questionId) return FAQ_LABELS.get(r.questionId) ?? r.questionId;
  return null;
}

/** Rows that are an exchange (a question and V's reply), oldest first. */
function exchanges(rows: readonly ConversationRow[]): ConversationRow[] {
  return rows
    .filter((r) => questionOf(r) && r.reply)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export type ModelTurn = { role: "user" | "assistant"; content: string };

export function modelHistory(rows: readonly ConversationRow[], keep = MEMORY_EXCHANGES): ModelTurn[] {
  return exchanges(rows)
    .slice(-keep)
    .flatMap((r) => [
      { role: "user" as const, content: questionOf(r)! },
      { role: "assistant" as const, content: r.reply! },
    ]);
}

export type HistoryTurn =
  | { role: "user"; text: string }
  | {
      role: "assistant";
      text: string;
      id?: string;
      links?: string[];
      source?: "ai" | "fallback" | "template" | "followup";
      feedback?: number | null;
    };

export function historyTurns(rows: readonly ConversationRow[]): HistoryTurn[] {
  const turns: HistoryTurn[] = [];
  for (const r of exchanges(rows)) {
    turns.push({ role: "user", text: questionOf(r)! });
    if (r.replySource === "ai") {
      turns.push({
        role: "assistant",
        text: r.reply!,
        id: r.id,
        links: r.replyLinks ?? [],
        source: "ai",
        feedback: r.feedback,
      });
    } else if (r.replySource === "followup") {
      turns.push({ role: "assistant", text: r.reply!, links: r.replyLinks ?? [], source: "followup" });
    } else {
      turns.push({ role: "assistant", text: r.reply! });
    }
  }
  return turns.slice(-HISTORY_MESSAGES);
}

export type ConversationTurn = {
  question: string;
  reply: string;
  source: "ai" | "fallback" | "template" | "followup" | null;
  feedback: number | null;
  page: string | null;
  at: string;
};

export type Conversation = {
  conversationId: string;
  startedAt: string;
  signedIn: boolean;
  turns: ConversationTurn[];
};

/** Conversations with at least one exchange, newest first. Rows with no id are skipped. */
export function groupConversations(rows: readonly ConversationRow[]): Conversation[] {
  const byId = new Map<string, ConversationRow[]>();
  for (const r of rows) {
    if (!r.conversationId) continue;
    const list = byId.get(r.conversationId) ?? [];
    list.push(r);
    byId.set(r.conversationId, list);
  }
  const out: Conversation[] = [];
  for (const [conversationId, list] of byId) {
    const ex = exchanges(list);
    if (ex.length === 0) continue;
    out.push({
      conversationId,
      startedAt: ex[0].createdAt,
      signedIn: list.some((r) => r.signedIn),
      turns: ex.map((r) => ({
        question: questionOf(r)!,
        reply: r.reply!,
        source: r.replySource,
        feedback: r.feedback,
        page: r.pagePath,
        at: r.createdAt,
      })),
    });
  }
  const last = (c: Conversation) => c.turns[c.turns.length - 1].at;
  return out.sort((a, b) => last(b).localeCompare(last(a)));
}

/** One line of the export. Never carries the account id: signed in or not is enough. */
export function conversationJsonl(c: Conversation): string {
  return JSON.stringify({
    conversation_id: c.conversationId,
    signed_in: c.signedIn,
    started_at: c.startedAt,
    messages: c.turns.flatMap((t) => [
      { role: "user", content: t.question, at: t.at, ...(t.page ? { page: t.page } : {}) },
      {
        role: "assistant",
        content: t.reply,
        ...(t.source ? { source: t.source } : {}),
        ...(t.feedback ? { feedback: t.feedback } : {}),
      },
    ]),
  });
}

/** Late answers (0160) in these rows that the student has not opened yet. */
export function unreadFollowups(rows: readonly ConversationRow[]): number {
  return rows.filter((r) => r.eventType === "v_followup" && !r.seenAt).length;
}
