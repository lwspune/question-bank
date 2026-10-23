/**
 * V's conversations (migration 0159). One conversation = the chat_interactions
 * rows sharing a conversation_id. This turns them into:
 *   currentSession  the exchanges since the last hour with no messages (2026-10-21)
 *   modelHistory  V's memory: the last exchanges, sent with a new question, each
 *                 marked with the question it was about (migration 0174)
 *   findReplyTarget / replyContext / quoteSnippet  a reply to an earlier message (0174)
 *   historyTurns  the chat window, rebuilt for a signed-in student's device
 *   groupConversations / conversationJsonl  the dashboard and the export
 *   unreadFollowups  late answers (0160) the student has not opened yet
 *   toolCallsForStorage  what V searched, fitted to its column (0167)
 *
 * Pure. Spec: tests/chat-conversation.test.ts.
 */
import { PREDEFINED_QUESTIONS } from "./faq";
import { ABUSE_REPLY } from "./abuse";
import type { ToolCallLog } from "./anthropic";
import { chosenIn, isAskVMessage, type AskedCard } from "./askVEvent";
import { parseNotesRefKey } from "./notesItem";

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
  /** The account that wrote the row; null when signed out. Dashboard only. */
  userId?: string | null;
  /** A late answer's first opening (0160); null = unread. */
  seenAt?: string | null;
  /** What V searched for this reply (0167); null when it made no call. */
  toolCalls?: ToolCallLog[] | null;
  /** The question the student had tapped Ask V on when they sent it (0174). */
  askedQuestionId?: string | null;
  /** The notes question tapped instead, as lib/chat/notesItem notesRefKey; the row's page says where (0181). */
  askedNotesItem?: string | null;
  /** The earlier message this one replies to (0174). */
  replyToId?: string | null;
};

const PAGE_PATH_RE = /^\/[A-Za-z0-9/_.~-]*$/;
const PAGE_PATH_MAX = 300;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Exchanges V remembers (two = the last four messages). */
export const MEMORY_EXCHANGES = 2;
/**
 * An hour with no messages ends a session (owner, 2026-10-21): the window shows
 * only the current one and V remembers only it. The rows stay stored.
 */
export const SESSION_IDLE_MS = 60 * 60 * 1000;
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
function exchanges<T extends ConversationRow>(rows: readonly T[]): T[] {
  return rows
    .filter((r) => questionOf(r) && r.reply)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/**
 * The exchanges of the current session, oldest first: those after the last gap
 * of more than SESSION_IDLE_MS. With `now`, none when the newest is older than
 * that. A late answer (0160) is read without `now`: the student may open it days later.
 */
export function currentSession<T extends ConversationRow>(rows: readonly T[], now?: number): T[] {
  const ex = exchanges(rows);
  if (ex.length === 0) return [];
  const at = ex.map((r) => Date.parse(r.createdAt));
  if (now !== undefined && now - at[at.length - 1] > SESSION_IDLE_MS) return [];
  let start = at.length - 1;
  while (start > 0 && at[start] - at[start - 1] <= SESSION_IDLE_MS) start--;
  return ex.slice(start);
}

export type ModelTurn = { role: "user" | "assistant"; content: string };

/**
 * What a message was about: a bank question by id, a notes question by its page and key (0181, 2026-10-23:
 * two notes taps had sent the identical "Explain this question." with nothing to tell them apart).
 */
function aboutOf(r: ConversationRow): string | null {
  if (r.askedQuestionId) return `question ${r.askedQuestionId}`;
  if (r.askedNotesItem && r.pagePath) return `notes question ${r.pagePath}#${r.askedNotesItem}`;
  return null;
}

/** A message about a question starts with what it was about, so V can tell two questions' exchanges apart. */
function labelled(r: ConversationRow): string {
  const q = questionOf(r)!;
  const about = aboutOf(r);
  return about ? `[About ${about}]\n${q}` : q;
}

/** The card above an Ask V tap; only on the tap itself, never on a follow-up about the same question. */
function askedCardOfRow(r: ConversationRow, text: string): AskedCard | null {
  if (!isAskVMessage(text)) return null;
  if (r.askedQuestionId) return { questionId: r.askedQuestionId, chose: chosenIn(text) };
  const notes = parseNotesRefKey(r.askedNotesItem);
  return notes && r.pagePath ? { notes, page: r.pagePath } : null;
}

export function modelHistory(rows: readonly ConversationRow[], keep = MEMORY_EXCHANGES): ModelTurn[] {
  // Abuse and V's calm line (lib/chat/abuse.ts) are never part of what V remembers.
  return exchanges(rows)
    .filter((r) => r.reply !== ABUSE_REPLY)
    .slice(-keep)
    .flatMap((r) => [
      { role: "user" as const, content: labelled(r) },
      { role: "assistant" as const, content: r.reply! },
    ]);
}

/** The exchange a message replies to, if it is among `rows` (the caller passes this person's session). */
export function findReplyTarget<T extends ConversationRow>(rows: readonly T[], id: string | null | undefined): T | null {
  if (!id) return null;
  return exchanges(rows).find((r) => r.id === id) ?? null;
}

const REPLY_QUESTION_MAX = 300;
const REPLY_ANSWER_MAX = 1200;

/** What V is told before a message that replies to an earlier one. The stored message stays as typed. */
export function replyContext(target: ConversationRow): string {
  const what = aboutOf(target);
  const about = what ? ` about ${what}` : "";
  return [
    `[The student is replying to an earlier exchange${about}.`,
    `They had asked: ${questionOf(target)!.slice(0, REPLY_QUESTION_MAX)}`,
    `You replied: ${target.reply!.slice(0, REPLY_ANSWER_MAX)}]`,
  ].join("\n");
}

const QUOTE_MAX = 140;

/** The start of a message, for the quote above a reply: its first line, never cut inside maths. */
export function quoteSnippet(text: string): string {
  const line = text.split("\n").map((l) => l.trim()).find((l) => l.length > 0) ?? "";
  if (line.length <= QUOTE_MAX) return line;
  let cut = line.slice(0, QUOTE_MAX);
  const open = cut.lastIndexOf("\\(");
  if (open !== -1 && cut.indexOf("\\)", open) === -1) cut = cut.slice(0, open);
  return `${cut.trimEnd()}…`;
}

export type HistoryTurn =
  | {
      role: "user";
      text: string;
      /** The start of the message it replies to (0174). */
      quote?: string;
      /** The question an Ask V tap was about, shown as a card above it (2026-10-23). */
      asked?: AskedCard;
    }
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
    const target = findReplyTarget(rows, r.replyToId);
    const text = questionOf(r)!;
    const asked = askedCardOfRow(r, text);
    turns.push({
      role: "user",
      text,
      ...(target ? { quote: quoteSnippet(target.reply!) } : {}),
      ...(asked ? { asked } : {}),
    });
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
  toolCalls: ToolCallLog[] | null;
  /** What the student's window showed (2026-10-23), so /dashboard/chat draws it the same way. Not exported. */
  links: string[];
  asked: AskedCard | null;
  quote: string | null;
};

export type Conversation = {
  conversationId: string;
  startedAt: string;
  signedIn: boolean;
  /** The student's account, for the dashboard's name. Never exported. */
  userId: string | null;
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
      userId: list.find((r) => r.userId)?.userId ?? null,
      turns: ex.map((r) => {
        const question = questionOf(r)!;
        const target = findReplyTarget(list, r.replyToId);
        return {
          question,
          reply: r.reply!,
          source: r.replySource,
          feedback: r.feedback,
          page: r.pagePath,
          at: r.createdAt,
          toolCalls: r.toolCalls ?? null,
          links: r.replyLinks ?? [],
          asked: askedCardOfRow(r, question),
          quote: target ? quoteSnippet(target.reply!) : null,
        };
      }),
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
        ...(t.toolCalls && t.toolCalls.length > 0 ? { tool_calls: t.toolCalls } : {}),
      },
    ]),
  });
}

/** Late answers (0160) in these rows that the student has not opened yet. */
export function unreadFollowups(rows: readonly ConversationRow[]): number {
  return rows.filter((r) => r.eventType === "v_followup" && !r.seenAt).length;
}

// Under the column's 8,000-byte CHECK with room to spare: Postgres prints jsonb with a space after
// every colon and comma, so its text runs longer than JSON.stringify's.
const TOOL_CALLS_MAX_CALLS = 10;
const TOOL_CALLS_MAX_BYTES = 7000;

/**
 * The tool calls as stored (migration 0167). A value the CHECK refuses would
 * lose the whole row, question and all, so an oversized log drops the results
 * first and then itself.
 */
export function toolCallsForStorage(calls: readonly ToolCallLog[] | undefined): ToolCallLog[] | null {
  if (!calls || calls.length === 0) return null;
  const bytes = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).length;
  const kept = calls.slice(0, TOOL_CALLS_MAX_CALLS);
  if (bytes(kept) <= TOOL_CALLS_MAX_BYTES) return kept;
  const bare = kept.map(({ name, input }) => ({ name, input }));
  return bytes(bare) <= TOOL_CALLS_MAX_BYTES ? bare : null;
}
