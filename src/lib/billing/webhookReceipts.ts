/**
 * The webhook alarm's database half (migration 0283): record each delivery,
 * read back which orders had one, and claim the day's alarm email once.
 * Service role only. The pure half is lib/billing/webhookAlarm.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { WebhookProvider, WebhookReceipt } from "./webhookAlarm";

/** `.in()` puts the refs in the URL; past ~200 the request line overflows (CLAUDE.md pitfalls). */
const IN_CHUNK = 200;

/**
 * Records one delivery. Best effort: it logs and returns on any failure,
 * because a webhook must never fail (and be retried, or switched off by the
 * provider) over its own bookkeeping.
 */
export async function recordWebhookReceipt(receipt: WebhookReceipt, client?: SupabaseClient): Promise<void> {
  try {
    const admin = client ?? createSupabaseAdminClient();
    const { error } = await admin.from("billing_webhook_receipts").insert(receipt);
    if (error) console.error("webhook receipt: insert failed", error.message);
  } catch (err) {
    console.error("webhook receipt: insert threw", err instanceof Error ? err.message : String(err));
  }
}

/** Which of `refs` had a delivery of one of `events` from `provider`. */
export async function readReceivedRefs(
  admin: SupabaseClient,
  provider: WebhookProvider,
  refs: readonly string[],
  events: readonly string[]
): Promise<Set<string>> {
  const got = new Set<string>();
  const unique = [...new Set(refs)];
  for (let i = 0; i < unique.length; i += IN_CHUNK) {
    const { data, error } = await admin
      .from("billing_webhook_receipts")
      .select("ref")
      .eq("provider", provider)
      .in("event", [...events])
      .in("ref", unique.slice(i, i + IN_CHUNK));
    if (error) throw new Error(`webhook receipts read failed: ${error.message}`);
    for (const r of data ?? []) if (r.ref) got.add(r.ref as string);
  }
  return got;
}

/**
 * True the first time an alarm is claimed for an IST day, false after. The
 * primary key (alarm, ist_day) decides, so overlapping runs cannot both send.
 */
export async function claimDailyAlarm(admin: SupabaseClient, alarm: "webhook_silent", istDay: string): Promise<boolean> {
  const { data, error } = await admin
    .from("billing_alarm_sends")
    .upsert({ alarm, ist_day: istDay }, { onConflict: "alarm,ist_day", ignoreDuplicates: true })
    .select("alarm");
  if (error) throw new Error(`alarm claim failed: ${error.message}`);
  return (data ?? []).length > 0;
}

/** Hands back an unsent day's claim, so the next run tries the email again. */
export async function releaseDailyAlarm(admin: SupabaseClient, alarm: "webhook_silent", istDay: string): Promise<void> {
  const { error } = await admin.from("billing_alarm_sends").delete().eq("alarm", alarm).eq("ist_day", istDay);
  if (error) console.error("alarm release failed", error.message);
}

/** Receipts older than this are never read (the check looks back 3 days). */
export const RECEIPT_KEEP_DAYS = 90;

export async function trimReceipts(admin: SupabaseClient, nowMs: number): Promise<void> {
  const cutoff = new Date(nowMs - RECEIPT_KEEP_DAYS * 86400_000).toISOString();
  const { error } = await admin.from("billing_webhook_receipts").delete().lt("received_at", cutoff);
  if (error) console.error("webhook receipts trim failed", error.message);
}
