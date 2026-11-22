/**
 * The webhook alarm's database half (migration 0283), against the test
 * database. What is locked:
 *
 * - a recorded delivery is found again by provider + ref + event;
 * - the daily alarm is claimed ONCE per day: a second claim the same day says
 *   "already sent", so two overlapping runs cannot both email;
 * - nobody but the service role can read the receipts;
 * - the database refuses an unknown provider.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { claimDailyAlarm, readReceivedRefs, recordWebhookReceipt } from "@/lib/billing/webhookReceipts";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const REF_A = `order_t${STAMP}a`.slice(0, 64);
const REF_B = `order_t${STAMP}b`.slice(0, 64);
// A day far from any real one, so the test cannot collide with a live claim.
const DAY = "1999-01-02";

describe.skipIf(!HAS_ENV)("billing_webhook_receipts + billing_alarm_sends (0283)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;

  beforeAll(() => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
  });

  afterAll(async () => {
    await admin.from("billing_webhook_receipts").delete().in("ref", [REF_A, REF_B]);
    await admin.from("billing_alarm_sends").delete().eq("ist_day", DAY);
  });

  it("finds a recorded order.paid delivery, and only that one", async () => {
    await recordWebhookReceipt({ provider: "razorpay", event: "order.paid", ref: REF_A }, admin);
    await recordWebhookReceipt({ provider: "razorpay", event: "refund.processed", ref: REF_B }, admin);
    const got = await readReceivedRefs(admin, "razorpay", [REF_A, REF_B], ["order.paid"]);
    expect([...got]).toEqual([REF_A]);
  });

  it("does not mix providers", async () => {
    const got = await readReceivedRefs(admin, "paddle", [REF_A], ["order.paid"]);
    expect(got.size).toBe(0);
  });

  it("claims the day's alarm once", async () => {
    expect(await claimDailyAlarm(admin, "webhook_silent", DAY)).toBe(true);
    expect(await claimDailyAlarm(admin, "webhook_silent", DAY)).toBe(false);
  });

  it("keeps the receipts from anyone but the service role", async () => {
    const { data } = await anon.from("billing_webhook_receipts").select("id").in("ref", [REF_A]);
    expect(data ?? []).toEqual([]);
  });

  it("refuses an unknown provider", async () => {
    const { error } = await admin.from("billing_webhook_receipts").insert({ provider: "stripe", event: "x", ref: REF_A });
    expect(error?.code).toBe("23514");
  });

  it("never throws when the write fails: a delivery must not fail over its own record", async () => {
    const broken = createClient("http://127.0.0.1:9", "key", { auth: { persistSession: false } });
    await expect(
      recordWebhookReceipt({ provider: "razorpay", event: "order.paid", ref: REF_A }, broken)
    ).resolves.toBeUndefined();
  });
});
