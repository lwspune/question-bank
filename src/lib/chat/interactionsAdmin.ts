/**
 * Service-role reads and writes for public.chat_interactions (migration 0127).
 * The table has RLS on with zero policies, so nothing else can touch it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AiUsageDay, ChatInteractionRow } from "./interactions";
import type { BuilderStepId } from "./builderSteps";
import { toolCallsForStorage, type ConversationRow } from "./conversation";
import type { ToolCallLog } from "./anthropic";

/** Migration 0159: the conversation a row belongs to and the page it came from. */
type InConversation = { conversationId?: string | null; pagePath?: string | null };

export type RecordChatInteraction = InConversation &
  (
    | { eventType: "launcher_open"; questionId?: null; userId: string | null }
    /** Migration 0159: the templated answer the button gave. */
    | { eventType: "faq_click"; questionId: string; userId: string | null; replyText?: string }
    /** Migration 0145: the text a student typed, already masked (maskPersonal).
     *  Migration 0158: V's reply, where it came from and, for AI, its token use.
     *  Migration 0159: the paths the window made tappable. */
    | {
        eventType: "typed_question";
        message: string;
        userId: string | null;
        /** Migration 0174: the question the student had tapped Ask V on, and the earlier message this replies to. */
        askedQuestionId?: string | null;
        replyToId?: string | null;
        reply?: {
          text: string;
          /** ai_failed (migration 0162): the fixed reply, after an AI answer failed part-way; carries what it spent. */
          source: "ai" | "ai_failed" | "fallback";
          tokensIn?: number;
          tokensOut?: number;
          /** Migration 0161: input read from / written to the prompt cache. */
          cacheReadTokens?: number;
          cacheWriteTokens?: number;
          links?: string[];
          /** Migration 0167: what V searched for this reply. */
          toolCalls?: ToolCallLog[];
        };
      }
    /** Migration 0157: one step of the practice-test builder. */
    | { eventType: "builder_step"; step: BuilderStepId; userId: string | null }
  );

/**
 * Best effort: a lost telemetry row must never fail the request that carries
 * it. Returns the new row's id (the thumbs buttons need it), null on failure.
 */
export async function recordChatInteraction(
  db: SupabaseClient,
  input: RecordChatInteraction
): Promise<string | null> {
  const reply = input.eventType === "typed_question" ? input.reply : undefined;
  const faqReply = input.eventType === "faq_click" ? input.replyText : undefined;
  const spentTokens = reply && (reply.source === "ai" || reply.source === "ai_failed") ? reply : null;
  try {
    const { data, error } = await db
      .from("chat_interactions")
      .insert({
        reply: reply?.text ?? faqReply ?? null,
        reply_source: reply?.source ?? (faqReply ? "template" : null),
        tokens_in: spentTokens ? (spentTokens.tokensIn ?? null) : null,
        tokens_out: spentTokens ? (spentTokens.tokensOut ?? null) : null,
        cache_read_tokens: spentTokens ? (spentTokens.cacheReadTokens ?? null) : null,
        cache_write_tokens: spentTokens ? (spentTokens.cacheWriteTokens ?? null) : null,
        reply_links: reply && reply.links && reply.links.length > 0 ? reply.links.slice(0, 10) : null,
        tool_calls: toolCallsForStorage(reply?.toolCalls),
        event_type: input.eventType,
        question_id:
          input.eventType === "faq_click"
            ? input.questionId
            : input.eventType === "builder_step"
              ? input.step
              : null,
        message: input.eventType === "typed_question" ? input.message : null,
        asked_question_id: input.eventType === "typed_question" ? (input.askedQuestionId ?? null) : null,
        reply_to_id: input.eventType === "typed_question" ? (input.replyToId ?? null) : null,
        user_id: input.userId,
        conversation_id: input.conversationId ?? null,
        page_path: input.pagePath ?? null,
      })
      .select("id")
      .single();
    if (error) {
      console.error("recordChatInteraction:", error.message);
      return null;
    }
    return (data?.id as string | undefined) ?? null;
  } catch (err) {
    console.error("recordChatInteraction:", err);
    return null;
  }
}

/** Newest first. Paged under the 1000-row PostgREST cap, up to `limit` rows. */
export async function listChatInteractions(limit = 5000): Promise<ChatInteractionRow[]> {
  const db = createSupabaseAdminClient();
  const PAGE = 1000;
  const out: ChatInteractionRow[] = [];

  for (let from = 0; from < limit; from += PAGE) {
    const to = Math.min(from + PAGE, limit) - 1;
    const { data, error } = await db
      .from("chat_interactions")
      .select(
        "event_type, question_id, created_at, message, user_id, reply, reply_source, tokens_in, tokens_out, cache_read_tokens, cache_write_tokens"
      )
      .order("created_at", { ascending: false })
      .range(from, to);
    if (error) throw new Error(`list chat interactions failed: ${error.message}`);
    const rows = data ?? [];
    for (const r of rows) {
      out.push({
        eventType: r.event_type as ChatInteractionRow["eventType"],
        questionId: (r.question_id as string | null) ?? null,
        createdAt: r.created_at as string,
        message: (r.message as string | null) ?? null,
        signedIn: r.user_id != null,
        userId: (r.user_id as string | null) ?? null,
        reply: (r.reply as string | null) ?? null,
        replySource: (r.reply_source as "ai" | "fallback" | null) ?? null,
        tokensIn: (r.tokens_in as number | null) ?? null,
        cacheReadTokens: (r.cache_read_tokens as number | null) ?? null,
        cacheWriteTokens: (r.cache_write_tokens as number | null) ?? null,
        tokensOut: (r.tokens_out as number | null) ?? null,
      });
    }
    if (rows.length < to - from + 1) break;
  }
  return out;
}

const CONVERSATION_COLUMNS =
  "id, event_type, question_id, created_at, message, reply, reply_source, reply_links, feedback, conversation_id, page_path, user_id, seen_at, tool_calls, asked_question_id, reply_to_id";

type RawConversationRow = {
  id: string;
  event_type: ConversationRow["eventType"];
  question_id: string | null;
  created_at: string;
  message: string | null;
  reply: string | null;
  reply_source: ConversationRow["replySource"];
  reply_links: string[] | null;
  feedback: number | null;
  conversation_id: string | null;
  page_path: string | null;
  user_id: string | null;
  seen_at: string | null;
  tool_calls: ToolCallLog[] | null;
  asked_question_id: string | null;
  reply_to_id: string | null;
};

function toConversationRow(r: RawConversationRow): ConversationRow & { userId: string | null } {
  return {
    id: r.id,
    eventType: r.event_type,
    questionId: r.question_id,
    createdAt: r.created_at,
    message: r.message,
    reply: r.reply,
    replySource: r.reply_source,
    replyLinks: r.reply_links,
    feedback: r.feedback,
    conversationId: r.conversation_id,
    pagePath: r.page_path,
    signedIn: r.user_id != null,
    seenAt: r.seen_at,
    toolCalls: r.tool_calls,
    askedQuestionId: r.asked_question_id,
    replyToId: r.reply_to_id,
    userId: r.user_id,
  };
}

/** The newest rows of one conversation (a conversation stays well under this). */
export async function readConversation(
  db: SupabaseClient,
  conversationId: string,
  limit = 60
): Promise<(ConversationRow & { userId: string | null })[]> {
  const { data, error } = await db
    .from("chat_interactions")
    .select(CONVERSATION_COLUMNS)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("readConversation:", error.message);
    return [];
  }
  return ((data ?? []) as RawConversationRow[]).map(toConversationRow);
}

/**
 * V may remember a conversation only if it is this person's: every signed-in
 * row in it must be theirs. A conversation started signed out and continued
 * after signing in is still theirs.
 */
export function conversationBelongsTo(
  rows: readonly { userId: string | null }[],
  userId: string | null
): boolean {
  return rows.every((r) => r.userId === null || r.userId === userId);
}

/** A signed-in student's latest conversation, for their history on another device. */
export async function readLatestConversation(
  db: SupabaseClient,
  userId: string
): Promise<(ConversationRow & { userId: string | null })[]> {
  const { data, error } = await db
    .from("chat_interactions")
    .select("conversation_id")
    .eq("user_id", userId)
    .not("conversation_id", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data?.conversation_id) {
    if (error) console.error("readLatestConversation:", error.message);
    return [];
  }
  return readConversation(db, data.conversation_id as string);
}

/**
 * Thumbs up (1), down (-1) or cleared (null) on one AI reply. Proof of
 * ownership is the conversation id the device holds, and the account when the
 * row was written signed in. Returns false when no row matched.
 */
export async function setReplyFeedback(
  db: SupabaseClient,
  input: { id: string; conversationId: string; userId: string | null; value: 1 | -1 | null }
): Promise<boolean> {
  let q = db
    .from("chat_interactions")
    .update({ feedback: input.value, feedback_at: input.value === null ? null : new Date().toISOString() })
    .eq("id", input.id)
    .eq("conversation_id", input.conversationId)
    .eq("reply_source", "ai");
  q = input.userId ? q.or(`user_id.is.null,user_id.eq.${input.userId}`) : q.is("user_id", null);
  const { data, error } = await q.select("id");
  if (error) {
    console.error("setReplyFeedback:", error.message);
    return false;
  }
  return (data ?? []).length === 1;
}

/** Every row that belongs to a conversation, newest first, paged under the 1000-row cap. */
export async function listConversationRows(limit = 10000): Promise<ConversationRow[]> {
  const db = createSupabaseAdminClient();
  const PAGE = 1000;
  const out: ConversationRow[] = [];
  for (let from = 0; from < limit; from += PAGE) {
    const to = Math.min(from + PAGE, limit) - 1;
    const { data, error } = await db
      .from("chat_interactions")
      .select(CONVERSATION_COLUMNS)
      .not("conversation_id", "is", null)
      .in("event_type", ["typed_question", "faq_click", "v_followup"])
      .order("created_at", { ascending: false })
      .range(from, to);
    if (error) throw new Error(`list conversation rows failed: ${error.message}`);
    const rows = (data ?? []) as RawConversationRow[];
    out.push(...rows.map(toConversationRow));
    if (rows.length < to - from + 1) break;
  }
  return out;
}

/**
 * The student opened V with a late answer (0160) waiting: mark it read. Only
 * their own, only once (the first opening is the one worth knowing).
 */
export async function markFollowupsSeen(
  db: SupabaseClient,
  input: { userId: string; conversationId: string }
): Promise<number> {
  const { data, error } = await db
    .from("chat_interactions")
    .update({ seen_at: new Date().toISOString() })
    .eq("user_id", input.userId)
    .eq("conversation_id", input.conversationId)
    .eq("event_type", "v_followup")
    .is("seen_at", null)
    .select("id");
  if (error) {
    console.error("markFollowupsSeen:", error.message);
    return 0;
  }
  return (data ?? []).length;
}

/** The conversation holding a student's newest UNREAD late answer (0160), if any. */
export async function readUnreadFollowupConversation(
  db: SupabaseClient,
  userId: string
): Promise<(ConversationRow & { userId: string | null })[]> {
  const { data, error } = await db
    .from("chat_interactions")
    .select("conversation_id")
    .eq("user_id", userId)
    .eq("event_type", "v_followup")
    .is("seen_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data?.conversation_id) {
    if (error) console.error("readUnreadFollowupConversation:", error.message);
    return [];
  }
  return readConversation(db, data.conversation_id as string);
}

type AiUsageRow = {
  day: string;
  answers: number;
  failed: number;
  tokens_in: number;
  tokens_out: number;
  cache_read_tokens: number;
  cache_write_tokens: number;
};

/** V's AI use per India-time day, summed in the database (migration 0162): one row a day, no row limit. Null when unreadable. */
export async function listAiUsageByDay(): Promise<AiUsageDay[] | null> {
  const { data, error } = await createSupabaseAdminClient().rpc("chat_ai_usage_by_day");
  if (error) {
    console.error("listAiUsageByDay:", error.message);
    return null;
  }
  return ((data ?? []) as AiUsageRow[]).map((r) => ({
    day: r.day,
    answers: r.answers,
    failed: r.failed,
    tokensIn: Number(r.tokens_in),
    tokensOut: Number(r.tokens_out),
    cacheReadTokens: Number(r.cache_read_tokens),
    cacheWriteTokens: Number(r.cache_write_tokens),
  }));
}
