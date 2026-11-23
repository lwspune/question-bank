/**
 * The payment check's webhook alarm (2026-11-22, 0283), with Razorpay, the
 * database and email faked. What is locked:
 *
 * - a paid order with no delivery sends "the Razorpay webhook has gone quiet"
 *   to the platform admins, once: the day's claim decides;
 * - an order whose delivery came sends nothing;
 * - a day already claimed sends nothing again;
 * - an email that reached nobody hands the day back (the next run retries)
 *   and fails the run;
 * - a dry run claims and sends nothing.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";

vi.mock("@/lib/billing/razorpay", () => ({ listPayments: vi.fn(), fetchOrder: vi.fn() }));
vi.mock("@/lib/billing/applyPaidOrder", () => ({ applyPaidOrder: vi.fn(async () => ({ kind: "ok" })) }));
vi.mock("@/lib/billing/paddle", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/billing/paddle")>()),
  isPaddleConfigured: vi.fn(() => false),
}));
vi.mock("@/lib/billing/webhookReceipts", () => ({
  readReceivedRefs: vi.fn(async () => new Set<string>()),
  firstReceiptSec: vi.fn(async () => null),
  claimDailyAlarm: vi.fn(async () => true),
  releaseDailyAlarm: vi.fn(async () => undefined),
  trimReceipts: vi.fn(async () => undefined),
}));
vi.mock("@/lib/answerSheets/grader", () => ({ readGraderEmails: vi.fn(async () => ["owner@example.test"]) }));
vi.mock("@/lib/email/resend", () => ({ sendEmail: vi.fn(async () => ({ ok: true, providerId: "e1" })) }));

import { listPayments } from "@/lib/billing/razorpay";
import { claimDailyAlarm, firstReceiptSec, readReceivedRefs, releaseDailyAlarm } from "@/lib/billing/webhookReceipts";
import { sendEmail } from "@/lib/email/resend";
import { runPaymentCheck } from "@/lib/billing/paymentCheck";
import { WEBHOOK_RECEIPTS_SINCE_SEC } from "@/lib/billing/webhookAlarm";

/** Every read the check makes answers: pay_A is already granted, and no plan sells through Paddle. */
function fakeAdmin(): SupabaseClient {
  const result = { data: [{ provider_ref: "pay_A", payment_id: null }], error: null, count: 0 };
  const chain: Record<string, unknown> = {};
  for (const m of ["select", "in", "eq", "order", "range"]) chain[m] = () => chain;
  chain.then = (resolve: (v: typeof result) => unknown) => resolve(result);
  return { from: () => chain } as unknown as SupabaseClient;
}

const NOW_MS = (WEBHOOK_RECEIPTS_SINCE_SEC + 5 * 86400) * 1000;
const PAID_AN_HOUR_AGO = NOW_MS / 1000 - 3600;

/** One captured payment on order_A, already granted (so the alarm is the only news). */
function onePaidOrder() {
  vi.mocked(listPayments).mockResolvedValue({
    ok: true,
    payments: [{ id: "pay_A", status: "captured", order_id: "order_A", amount: 19900, currency: "INR", created_at: PAID_AN_HOUR_AGO }],
  });
}

const run = (apply = true) =>
  runPaymentCheck({ admin: fakeAdmin(), apply, days: 3, runUrl: "run", nowMs: NOW_MS });

beforeEach(() => {
  vi.mocked(sendEmail).mockClear().mockResolvedValue({ ok: true, providerId: "e1" });
  vi.mocked(claimDailyAlarm).mockClear().mockResolvedValue(true);
  vi.mocked(releaseDailyAlarm).mockClear();
  vi.mocked(readReceivedRefs).mockReset().mockResolvedValue(new Set());
  // Recording began a day before the payment.
  vi.mocked(firstReceiptSec).mockReset().mockResolvedValue(PAID_AN_HOUR_AGO - 86400);
  onePaidOrder();
});

describe("runPaymentCheck: the webhook alarm", () => {
  it("emails the admins when a paid order had no delivery", async () => {
    const r = await run();
    expect(r.silent.razorpay.map((i) => i.ref)).toEqual(["order_A"]);
    expect(claimDailyAlarm).toHaveBeenCalledTimes(1);
    const subjects = vi.mocked(sendEmail).mock.calls.map((c) => c[0].subject);
    expect(subjects).toEqual([expect.stringMatching(/Razorpay webhook has gone quiet/)]);
    expect(r.failed).toBe(false);
  });

  it("sends nothing when the delivery came", async () => {
    vi.mocked(readReceivedRefs).mockImplementation(async (_a, provider) =>
      provider === "razorpay" ? new Set(["order_A"]) : new Set()
    );
    const r = await run();
    expect(r.silent.razorpay).toEqual([]);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("sends nothing again once the day is claimed", async () => {
    vi.mocked(claimDailyAlarm).mockResolvedValue(false);
    await run();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("hands the day back and fails the run when the email reached nobody", async () => {
    vi.mocked(sendEmail).mockResolvedValue({ ok: false, error: "resend down" });
    const r = await run();
    expect(releaseDailyAlarm).toHaveBeenCalledTimes(1);
    expect(r.failed).toBe(true);
  });

  it("claims and sends nothing in a dry run, but reports the email", async () => {
    const r = await run(false);
    expect(claimDailyAlarm).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
    expect(r.emails).toEqual([expect.stringMatching(/webhook has gone quiet/)]);
  });

  it("stays quiet until the first delivery is recorded: before that, no order can have one", async () => {
    vi.mocked(firstReceiptSec).mockResolvedValue(null);
    const r = await run();
    expect(r.silent.razorpay).toEqual([]);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("ignores orders paid before the first recorded delivery (the deploy that began recording)", async () => {
    vi.mocked(firstReceiptSec).mockResolvedValue(PAID_AN_HOUR_AGO + 60);
    const r = await run();
    expect(r.silent.razorpay).toEqual([]);
  });
});
