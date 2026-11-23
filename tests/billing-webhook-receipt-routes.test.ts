/**
 * Both webhook routes record each signed delivery (migration 0283), before
 * deciding what it means, so the payment check can tell "the webhook came" from
 * "the webhook is off". A bad signature is NOT recorded: anyone can POST to
 * the URL, and only Razorpay's or Paddle's own deliveries prove the webhook works.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { createHmac } from "node:crypto";
import { NextRequest } from "next/server";

vi.mock("@/lib/billing/webhookReceipts", () => ({ recordWebhookReceipt: vi.fn(async () => undefined) }));
vi.mock("@/lib/billing/applyPaidOrder", () => ({ applyPaidOrder: vi.fn(async () => ({ kind: "ok" })) }));
vi.mock("@/lib/billing/grant", () => ({ revokeRazorpayEntitlement: vi.fn(async () => ({ kind: "ok", revoked: 0 })) }));
vi.mock("@/lib/ebooks/grant", () => ({ revokeEbookPurchase: vi.fn(async () => ({ kind: "ok", revoked: 0 })) }));
vi.mock("@/lib/referrals/service", () => ({ revokeReferralReward: vi.fn(async () => 0) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));

import { recordWebhookReceipt } from "@/lib/billing/webhookReceipts";
import { POST as razorpayWebhook } from "@/app/api/billing/webhook/route";
import { POST as paddleWebhook } from "@/app/api/billing/paddle/webhook/route";

const recordMock = vi.mocked(recordWebhookReceipt);

const razorpay = (body: unknown, secret = "rzp_whsec") => {
  const raw = JSON.stringify(body);
  return razorpayWebhook(
    new NextRequest("http://localhost/api/billing/webhook", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json", "x-razorpay-signature": createHmac("sha256", secret).update(raw).digest("hex") },
    })
  );
};

const paddle = (body: unknown, secret = "pdl_whsec") => {
  const raw = JSON.stringify(body);
  const ts = Math.floor(Date.now() / 1000);
  const h1 = createHmac("sha256", secret).update(`${ts}:${raw}`).digest("hex");
  return paddleWebhook(
    new NextRequest("http://localhost/api/billing/paddle/webhook", {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json", "paddle-signature": `ts=${ts};h1=${h1}` },
    })
  );
};

beforeEach(() => {
  recordMock.mockClear();
  process.env.RAZORPAY_WEBHOOK_SECRET = "rzp_whsec";
  process.env.PADDLE_WEBHOOK_SECRET = "pdl_whsec";
});

describe("the Razorpay webhook records each signed delivery", () => {
  it("records order.paid under its order, even when the order is not ours to grant", async () => {
    const res = await razorpay({
      event: "order.paid",
      payload: { order: { entity: { id: "order_X", status: "paid", notes: {} } }, payment: { entity: { id: "pay_X" } } },
    });
    expect(res.status).toBe(200);
    expect(recordMock).toHaveBeenCalledWith({ provider: "razorpay", event: "order.paid", ref: "order_X" });
  });

  it("records an ignored event too: any signed delivery proves the webhook is on", async () => {
    await razorpay({ event: "payment.authorized", payload: { payment: { entity: { id: "pay_Y" } } } });
    expect(recordMock).toHaveBeenCalledWith({ provider: "razorpay", event: "payment.authorized", ref: "pay_Y" });
  });

  it("does not record a delivery with a bad signature", async () => {
    const res = await razorpay({ event: "order.paid", payload: {} }, "someone-else");
    expect(res.status).toBe(400);
    expect(recordMock).not.toHaveBeenCalled();
  });
});

describe("the Paddle webhook records each signed delivery", () => {
  it("records a transaction event under its transaction", async () => {
    await paddle({ event_type: "transaction.completed", data: { id: "txn_01abc", status: "completed" } });
    expect(recordMock).toHaveBeenCalledWith({ provider: "paddle", event: "transaction.completed", ref: "txn_01abc" });
  });

  it("does not record a delivery with a bad signature", async () => {
    const res = await paddle({ event_type: "transaction.completed", data: { id: "txn_1" } }, "someone-else");
    expect(res.status).toBe(400);
    expect(recordMock).not.toHaveBeenCalled();
  });
});
