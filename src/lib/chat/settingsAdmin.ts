/**
 * Service-role reads and writes for public.chat_settings (migration 0158) and
 * the daily AI-answer count. The table has RLS on with no policies.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_CHAT_SETTINGS, istDayStart, type ChatSettings } from "./settings";

type Row = {
  ai_enabled: boolean;
  explain_enabled: boolean;
  plan_enabled: boolean;
  progress_enabled: boolean;
  per_person_per_hour: number;
  ai_answers_per_day: number;
};
const COLUMNS = "ai_enabled, explain_enabled, plan_enabled, progress_enabled, per_person_per_hour, ai_answers_per_day";

function fromRow(r: Row): ChatSettings {
  return {
    aiEnabled: r.ai_enabled,
    explainEnabled: r.explain_enabled,
    planEnabled: r.plan_enabled,
    progressEnabled: r.progress_enabled,
    perPersonPerHour: r.per_person_per_hour,
    aiAnswersPerDay: r.ai_answers_per_day,
  };
}

/** The live settings. On a failed read: the defaults, which keep the AI OFF. */
export async function readChatSettings(db: SupabaseClient): Promise<ChatSettings> {
  const { data, error } = await db
    .from("chat_settings")
    .select(COLUMNS)
    .eq("id", true)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("readChatSettings:", error.message);
    return DEFAULT_CHAT_SETTINGS;
  }
  return fromRow(data as Row);
}

export async function saveChatSettings(
  db: SupabaseClient,
  s: ChatSettings
): Promise<{ kind: "ok"; settings: ChatSettings } | { kind: "error"; message: string }> {
  const { data, error } = await db
    .from("chat_settings")
    .update({
      ai_enabled: s.aiEnabled,
      explain_enabled: s.explainEnabled,
      plan_enabled: s.planEnabled,
      progress_enabled: s.progressEnabled,
      per_person_per_hour: s.perPersonPerHour,
      ai_answers_per_day: s.aiAnswersPerDay,
      updated_at: new Date().toISOString(),
    })
    .eq("id", true)
    .select(COLUMNS)
    .single();
  if (error || !data) return { kind: "error", message: error?.message ?? "no settings row" };
  return { kind: "ok", settings: fromRow(data as Row) };
}

/** AI calls since midnight IST, counting answers that failed part-way (they cost too). null when unreadable. */
export async function countAiAnswersToday(db: SupabaseClient, now = new Date()): Promise<number | null> {
  const { count, error } = await db
    .from("chat_interactions")
    .select("id", { count: "exact", head: true })
    .in("reply_source", ["ai", "ai_failed"])
    .gte("created_at", istDayStart(now).toISOString());
  if (error) {
    console.error("countAiAnswersToday:", error.message);
    return null;
  }
  return count ?? 0;
}
