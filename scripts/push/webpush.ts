/**
 * Browser-push delivery shared by the push senders (the due nudge and "your
 * friend finished"). Runs only where the VAPID private key is: GitHub Actions
 * or a local shell, never Vercel, which has the public key alone.
 */
import webpush from "web-push";
import type { SupabaseClient } from "@supabase/supabase-js";
import { PUSH_TTL_SECONDS, classifyDelivery, shouldDropAfterFailure, type DeliveryOutcome } from "../../src/lib/push/core";
import { recordDelivery, type PushSubRow } from "../../src/lib/push/service";

const THROTTLE_MS = 100;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function setVapidFromEnv(): void {
  const subject = process.env.VAPID_SUBJECT;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!subject || !publicKey || !privateKey) {
    throw new Error("VAPID_SUBJECT, VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY must all be set (see OPERATIONS.md).");
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
}

export type Delivery = { outcome: DeliveryOutcome; code: number | null; error: string | null };

/** One delivery; never throws. The status code decides the subscription's fate. */
export async function deliver(sub: PushSubRow, payload: string): Promise<Delivery> {
  try {
    const res = await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      payload,
      { TTL: PUSH_TTL_SECONDS, urgency: "normal" }
    );
    return { outcome: classifyDelivery(res.statusCode), code: res.statusCode, error: null };
  } catch (e) {
    const code = (e as { statusCode?: number }).statusCode ?? null;
    const body = (e as { body?: string }).body ?? (e instanceof Error ? e.message : String(e));
    return { outcome: classifyDelivery(code), code, error: String(body).slice(0, 1000) };
  }
}

/**
 * Send one payload to each of a student's browsers, updating each
 * subscription, and return the best outcome (sent beats failed beats gone)
 * with the browser that took it, for the send-log row.
 */
export async function deliverToAll(
  db: SupabaseClient,
  browsers: readonly PushSubRow[],
  body: string
): Promise<Delivery & { subId: string | null }> {
  let best: Delivery & { subId: string | null } = { outcome: "failed", code: null, error: "no browser", subId: null };
  const rank = { sent: 2, failed: 1, gone: 0 } as const;
  for (const sub of browsers) {
    const d = await deliver(sub, body);
    await recordDelivery(db, sub, d.outcome, d.outcome === "failed" && shouldDropAfterFailure(sub.failCount));
    if (d.outcome !== "sent") console.log(`       ${d.outcome} (${d.code ?? "no status"})${d.error ? ` — ${d.error.slice(0, 120)}` : ""}`);
    if (best.subId === null || rank[d.outcome] > rank[best.outcome]) best = { ...d, subId: d.outcome === "sent" ? sub.id : null };
    await sleep(THROTTLE_MS);
  }
  return best;
}
