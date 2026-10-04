/**
 * Service-role reads and writes for the push nudge (PUSH_SPEC.md §8). Not
 * `server-only`, and the client is a parameter, so the tsx sender can import
 * it (the lib/email/service.ts precedent). Every read is PAGED: PostgREST
 * truncates a bare `.select()` at 1000 rows without an error.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PriorSend } from "@/lib/email/recommend";
import { countClickedSends } from "@/lib/email/dueNudgeService";
import { PUSH_KIND } from "./core";

const PAGE = 1000;

export type PushSubRow = {
  id: string;
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  failCount: number;
};

/** Every stored subscription. A dead one is deleted on its 404/410 and a
 *  failing one after PUSH_MAX_FAILS, so a row that exists is worth trying. */
export async function readSubscriptions(db: SupabaseClient): Promise<PushSubRow[]> {
  const out: PushSubRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("push_subscriptions")
      .select("id, user_id, endpoint, p256dh, auth, fail_count")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readSubscriptions: ${error.message}`);
    const rows = (data ?? []) as Record<string, unknown>[];
    for (const r of rows) {
      out.push({
        id: r.id as string,
        userId: r.user_id as string,
        endpoint: r.endpoint as string,
        p256dh: r.p256dh as string,
        auth: r.auth as string,
        failCount: (r.fail_count as number) ?? 0,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/** Prior push nudges in the email send log's shape. The dedupe key format is
 *  the email's own, so both lists feed one selectDueNudges and one cap. */
export async function readPriorPushSends(db: SupabaseClient): Promise<PriorSend[]> {
  const out: PriorSend[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("push_sends")
      .select("user_id, dedupe_key, created_at")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readPriorPushSends: ${error.message}`);
    const rows = (data ?? []) as Record<string, unknown>[];
    for (const r of rows) {
      out.push({ userId: r.user_id as string, dedupeKey: r.dedupe_key as string, createdAt: r.created_at as string });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/** After a delivery: forget a gone subscription, count a failure (dropping a
 *  zombie), or clear the count on success. */
export async function recordDelivery(
  db: SupabaseClient,
  sub: PushSubRow,
  outcome: "sent" | "gone" | "failed",
  drop: boolean
): Promise<void> {
  const q = db.from("push_subscriptions");
  const { error } =
    outcome === "gone" || drop
      ? await q.delete().eq("id", sub.id)
      : outcome === "failed"
        ? await q.update({ fail_count: sub.failCount + 1, failed_at: new Date().toISOString() }).eq("id", sub.id)
        : sub.failCount > 0
          ? await q.update({ fail_count: 0, failed_at: null }).eq("id", sub.id)
          : { error: null };
  if (error) throw new Error(`recordDelivery(${sub.id}): ${error.message}`);
}

/** Sends, taps, and recipients who drilled within `hours` — the push twin of
 *  readNudgeConversion. Read-only. */
export async function readPushConversion(
  db: SupabaseClient,
  hours = 24
): Promise<{ sent: number; tapped: number; drilledAfter: number; subscribers: number }> {
  const sends: { id: string; user_id: string; created_at: string }[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("push_sends")
      .select("id, user_id, created_at")
      .eq("kind", PUSH_KIND)
      .eq("status", "sent")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readPushConversion sends: ${error.message}`);
    const rows = (data ?? []) as { id: string; user_id: string; created_at: string }[];
    sends.push(...rows);
    if (rows.length < PAGE) break;
  }
  const { count } = await db.from("push_subscriptions").select("id", { count: "exact", head: true });
  if (sends.length === 0) return { sent: 0, tapped: 0, drilledAfter: 0, subscribers: count ?? 0 };

  const earliest = sends[0].created_at;
  const tapped = await countClickedSends(db, sends.map((s) => s.id), earliest, "push_clicked");
  const drillsByUser = new Map<string, number[]>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("user_id, created_at")
      .eq("kind", "drill_completed")
      .gte("created_at", earliest)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readPushConversion drills: ${error.message}`);
    const rows = (data ?? []) as { user_id: string; created_at: string }[];
    for (const d of rows) {
      const list = drillsByUser.get(d.user_id) ?? [];
      list.push(Date.parse(d.created_at));
      drillsByUser.set(d.user_id, list);
    }
    if (rows.length < PAGE) break;
  }
  let drilledAfter = 0;
  for (const s of sends) {
    const t = Date.parse(s.created_at);
    if ((drillsByUser.get(s.user_id) ?? []).some((x) => x >= t && x - t <= hours * 3_600_000)) drilledAfter++;
  }
  return { sent: sends.length, tapped, drilledAfter, subscribers: count ?? 0 };
}
