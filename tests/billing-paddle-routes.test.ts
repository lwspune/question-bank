/**
 * The Paddle routes (2026-11-17). Network calls to Paddle and the grant
 * writes are mocked; every decision is the real one.
 *
 *  - /api/billing/order sends a plan whose payment_provider is 'paddle' to
 *    Paddle (a transaction carrying our order notes) and every other plan to
 *    Razorpay, chosen AFTER the buyer's country picked the plan: a buyer in
 *    India still gets the rupee plan through Razorpay.
 *  - /api/billing/paddle/verify is the buyer's browser after checkout: it
 *    re-reads the transaction from Paddle and grants for the signed-in buyer.
 *  - /api/billing/paddle/webhook is Paddle's own notification: signed, then
 *    decided by decidePaddleEvent.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { createHmac } from "node:crypto";
import { NextRequest } from "next/server";
import { stampOrderNotes, type Plan } from "@/lib/billing/plans";
import type { PaddleTransaction } from "@/lib/billing/paddle";

// Webhook deliveries are recorded (0283); kept off the database here.
vi.mock("@/lib/billing/webhookReceipts", () => ({ recordWebhookReceipt: vi.fn(async () => undefined) }));
vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/profile/service", () => ({ getOwnMobile: vi.fn(async () => ({ mobile: null })) }));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number; currency: string }) => ({
    ok: true, orderId: "order_1", amount: input.amountPaise, currency: input.currency,
  })),
}));
vi.mock("@/lib/billing/paddle", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/billing/paddle")>()),
  createPaddleTransaction: vi.fn(async () => ({ ok: true, transactionId: "txn_new" })),
  fetchPaddleTransaction: vi.fn(),
}));
vi.mock("@/lib/billing/applyPaidOrder", () => ({ applyPaidOrder: vi.fn(async () => ({ kind: "ok" })) }));
vi.mock("@/lib/billing/grant", () => ({ revokeRazorpayEntitlement: vi.fn(async () => ({ kind: "ok", revoked: 1 })) }));

const NOW = Date.now();
const TXN = "txn_01m7mnc8hg3xj4c3rmybjvz8xw";
const usd: Plan = {
  id: "intl-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "intl", amountPaise: 1900,
  currency: "USD", site: "intl", durationDays: 182, scope: "imat", active: true, sortOrder: 1, countries: null,
  paymentProvider: "paddle", paddleProductId: "pro_1",
};
const india: Plan = {
  ...usd, id: "imat-india-6m", urlKey: "imat-india", amountPaise: 99900, currency: "INR", countries: ["IN"],
  paymentProvider: "razorpay", paddleProductId: null,
};
vi.mock("@/lib/billing/plansQuery", () => ({ listActivePlans: vi.fn(async () => [usd, india]) }));

import { createOrder } from "@/lib/billing/razorpay";
import { createPaddleTransaction, fetchPaddleTransaction } from "@/lib/billing/paddle";
import { applyPaidOrder } from "@/lib/billing/applyPaidOrder";
import { revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { getSessionUser } from "@/lib/auth";
import { POST as order } from "@/app/api/billing/order/route";
import { POST as verify } from "@/app/api/billing/paddle/verify/route";
import { POST as webhook } from "@/app/api/billing/paddle/webhook/route";

const json = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  new NextRequest(url, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json", ...headers } });

const paidTxn = (over: Partial<PaddleTransaction> = {}): PaddleTransaction => ({
  id: TXN,
  status: "completed",
  origin: "api",
  currency_code: "USD",
  created_at: new Date(NOW).toISOString(),
  custom_data: stampOrderNotes(usd, "u1", NOW),
  items: [{ quantity: 1, price: { id: "pri_c", type: "custom", product_id: "pro_1", unit_price: { amount: "1900", currency_code: "USD" } } }],
  ...over,
});

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
  process.env.PADDLE_API_KEY = "pdl_sdbx_apikey_x";
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN = "test_token";
  process.env.PADDLE_WEBHOOK_SECRET = "whsec";
});

describe("/api/billing/order picks the gateway from the plan the buyer's country chose", () => {
  it("a Paddle plan becomes a Paddle transaction carrying our order notes", async () => {
    const res = await order(json("http://localhost/api/billing/order", { planId: "intl-pass-6m" }, { "x-vercel-ip-country": "IT" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ provider: "paddle", transactionId: "txn_new", clientToken: "test_token", email: "asha@example.com" });
    expect(createOrder).not.toHaveBeenCalled();
    const body = vi.mocked(createPaddleTransaction).mock.calls[0][0];
    expect(body.currency_code).toBe("USD");
    expect(body.custom_data).toMatchObject({ userId: "u1", planId: "intl-pass-6m", amountPaise: "1900", currency: "USD", scope: "imat" });
    expect(body.items[0].price.product_id).toBe("pro_1");
  });

  it("a Paddle plan sells even where Razorpay has no keys", async () => {
    delete process.env.RAZORPAY_KEY_ID;
    const res = await order(json("http://localhost/api/billing/order", { planId: "intl-pass-6m" }, { "x-vercel-ip-country": "IT" }));
    expect(res.status).toBe(200);
  });

  it("a buyer in India who tapped the dollar pass gets the rupee plan through Razorpay", async () => {
    const res = await order(json("http://localhost/api/billing/order", { planId: "intl-pass-6m" }, { "x-vercel-ip-country": "IN" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ provider: "razorpay", orderId: "order_1" });
    expect(createPaddleTransaction).not.toHaveBeenCalled();
  });

  it("a Paddle plan without Paddle keys answers 503 and opens nothing", async () => {
    delete process.env.PADDLE_API_KEY;
    const res = await order(json("http://localhost/api/billing/order", { planId: "intl-pass-6m" }, { "x-vercel-ip-country": "IT" }));
    expect(res.status).toBe(503);
    expect(createPaddleTransaction).not.toHaveBeenCalled();
  });

  it("a failed Paddle call answers 502", async () => {
    vi.mocked(createPaddleTransaction).mockResolvedValueOnce({ ok: false, error: "boom" });
    const res = await order(json("http://localhost/api/billing/order", { planId: "intl-pass-6m" }, { "x-vercel-ip-country": "IT" }));
    expect(res.status).toBe(502);
  });
});

describe("/api/billing/paddle/verify", () => {
  const call = (body: unknown) => verify(json("http://localhost/api/billing/paddle/verify", body));

  it("grants a completed transaction for the signed-in buyer, through the shared grant", async () => {
    vi.mocked(fetchPaddleTransaction).mockResolvedValueOnce({ ok: true, transaction: paidTxn() });
    const res = await call({ transactionId: TXN });
    expect(res.status).toBe(200);
    expect(vi.mocked(applyPaidOrder).mock.calls[0][0]).toMatchObject({ action: "grant", userId: "u1", paymentId: TXN, provider: "paddle" });
  });

  it("a transaction not yet paid answers 202 and grants nothing", async () => {
    vi.mocked(fetchPaddleTransaction).mockResolvedValueOnce({ ok: true, transaction: paidTxn({ status: "ready" }) });
    const res = await call({ transactionId: TXN });
    expect(res.status).toBe(202);
    expect(applyPaidOrder).not.toHaveBeenCalled();
  });

  it("another account's transaction is refused", async () => {
    vi.mocked(getSessionUser).mockResolvedValueOnce({ id: "u2", email: "x@example.com" } as never);
    vi.mocked(fetchPaddleTransaction).mockResolvedValueOnce({ ok: true, transaction: paidTxn() });
    const res = await call({ transactionId: TXN });
    expect(res.status).toBe(400);
    expect(applyPaidOrder).not.toHaveBeenCalled();
  });

  it("a malformed id never reaches Paddle", async () => {
    for (const body of [{}, { transactionId: "../x" }, { transactionId: 5 }]) {
      expect((await call(body)).status).toBe(400);
    }
    expect(fetchPaddleTransaction).not.toHaveBeenCalled();
  });

  it("signed out is 401", async () => {
    vi.mocked(getSessionUser).mockResolvedValueOnce(null as never);
    expect((await call({ transactionId: TXN })).status).toBe(401);
  });

  it("Paddle unreachable is 502, so the browser says access will follow", async () => {
    vi.mocked(fetchPaddleTransaction).mockResolvedValueOnce({ ok: false, error: "down" });
    expect((await call({ transactionId: TXN })).status).toBe(502);
  });
});

describe("/api/billing/paddle/webhook", () => {
  const send = (payload: unknown, opts: { secret?: string; ts?: number } = {}) => {
    const raw = JSON.stringify(payload);
    const ts = opts.ts ?? Math.floor(Date.now() / 1000);
    const h1 = createHmac("sha256", opts.secret ?? "whsec").update(`${ts}:${raw}`).digest("hex");
    return webhook(
      new NextRequest("http://localhost/api/billing/paddle/webhook", {
        method: "POST",
        body: raw,
        headers: { "content-type": "application/json", "paddle-signature": `ts=${ts};h1=${h1}` },
      })
    );
  };

  it("a signed transaction.completed grants through the shared grant", async () => {
    const res = await send({ event_type: "transaction.completed", data: paidTxn() });
    expect(res.status).toBe(200);
    expect(vi.mocked(applyPaidOrder).mock.calls[0][0]).toMatchObject({ action: "grant", provider: "paddle", paymentId: TXN });
  });

  it("a bad signature is 400 and does nothing", async () => {
    const res = await send({ event_type: "transaction.completed", data: paidTxn() }, { secret: "wrong" });
    expect(res.status).toBe(400);
    expect(applyPaidOrder).not.toHaveBeenCalled();
  });

  it("an approved full refund revokes the pass that transaction bought", async () => {
    const res = await send({
      event_type: "adjustment.updated",
      data: { action: "refund", type: "full", status: "approved", transaction_id: TXN },
    });
    expect(res.status).toBe(200);
    expect(revokeRazorpayEntitlement).toHaveBeenCalledWith(TXN);
  });

  it("a grant that fails answers 500 so Paddle retries", async () => {
    vi.mocked(applyPaidOrder).mockResolvedValueOnce({ kind: "error", stage: "grant", message: "db" });
    expect((await send({ event_type: "transaction.completed", data: paidTxn() })).status).toBe(500);
  });

  it("other events are acknowledged and ignored", async () => {
    expect((await send({ event_type: "customer.created", data: {} })).status).toBe(200);
    expect(applyPaidOrder).not.toHaveBeenCalled();
  });

  it("no webhook secret configured is 503", async () => {
    delete process.env.PADDLE_WEBHOOK_SECRET;
    expect((await send({ event_type: "transaction.completed", data: paidTxn() })).status).toBe(503);
  });
});
