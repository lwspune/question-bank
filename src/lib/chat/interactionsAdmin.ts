/**
 * Service-role reads and writes for public.chat_interactions (migration 0127).
 * The table has RLS on with zero policies, so nothing else can touch it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ChatInteractionRow } from "./interactions";

export type RecordChatInteraction =
  | { eventType: "launcher_open"; questionId?: null; userId: string | null }
  | { eventType: "faq_click"; questionId: string; userId: string | null }
  /** Migration 0145: the text a student typed, already masked (maskPersonal). */
  | { eventType: "typed_question"; message: string; userId: string | null };

/** Best effort: a lost telemetry row must never fail the request that carries it. */
export async function recordChatInteraction(
  db: SupabaseClient,
  input: RecordChatInteraction
): Promise<void> {
  try {
    const { error } = await db.from("chat_interactions").insert({
      event_type: input.eventType,
      question_id: input.eventType === "faq_click" ? input.questionId : null,
      message: input.eventType === "typed_question" ? input.message : null,
      user_id: input.userId,
    });
    if (error) console.error("recordChatInteraction:", error.message);
  } catch (err) {
    console.error("recordChatInteraction:", err);
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
      .select("event_type, question_id, created_at, message, user_id")
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
      });
    }
    if (rows.length < to - from + 1) break;
  }
  return out;
}
