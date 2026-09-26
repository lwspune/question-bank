/**
 * Unit test for the Razorpay webhook route's gating logic — signature check,
 * event filter, notes extraction, and grant dispatch. The grant itself is
 * mocked (no DB); the signature is computed with the real HMAC so the route's
 * verifyWebhookSignature path runs for real.
 *
 * This is the authoritative grant path (Razorpay calls it on order.paid), so
 * the routing — when it grants vs ignores vs rejects — is the thing to lock.
 */
import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "vitest";
import { createHmac } from "node:crypto";
import { NextRequest } from "next/server";

// Mock the grant so the route never touches the DB.
vi.mock("@/lib/billing/grant", () => ({
  grantRazorpayEntitlement: vi.fn(async () => ({ kind: "ok" })),
  revokeRazorpayEntitlement: vi.fn(async () => ({ kind: "ok", revoked: 1 })),
}));

import { grantRazorpayEntitlement, revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { POST } from "@/app/api/billing/webhook/route";

const grantMock = vi.mocked(grantRazorpayEntitlement);
const revokeMock = vi.mocked(revokeRazorpayEntitlement);
const SECRET = "test_webhook_secret";

function makeRequest(
  bodyObj: unknown,
  opts: { secret?: string; badSig?: boolean } = {}
): NextRequest {
  const raw = JSON.stringify(bodyObj);
  const sig = opts.badSig
    ? "deadbeef"
    : createHmac("sha256", opts.secret ?? SECRET).update(raw).digest("hex");
  return new NextRequest("http://localhost/api/billing/webhook", {
    method: "POST",
    body: raw,
    headers: {
      "x-razorpay-signature": sig,
      "content-type": "application/json",
    },
  });
}

const orderPaid = (notes: Record<string, string>, paymentId?: string) => ({
  event: "order.paid",
  payload: {
    order: { entity: { status: "paid", amount_paid: 49900, currency: "INR", notes } },
    ...(paymentId ? { payment: { entity: { id: paymentId } } } : {}),
  },
});

describe("billing webhook routing", () => {
  beforeEach(() => {
    grantMock.mockClear();
    grantMock.mockResolvedValue({ kind: "ok" });
    revokeMock.mockClear();
    revokeMock.mockResolvedValue({ kind: "ok", revoked: 1 });
    process.env.RAZORPAY_WEBHOOK_SECRET = SECRET;
  });

  afterEach(() => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
  });

  it("grants on a complete order.paid event", async () => {
    const req = makeRequest(
      orderPaid({ userId: "user-1", planId: "teacher-pass-1y" }, "pay_abc")
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ granted: "ok" });

    expect(grantMock).toHaveBeenCalledTimes(1);
    expect(grantMock).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-1",
        paymentId: "pay_abc",
        scope: "teacher",
      })
    );
    // 365-day plan → a non-null ISO expiry.
    expect(grantMock.mock.calls[0][0].expiresAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("skips a paid amount that does not match the plan in the notes", async () => {
    const body = orderPaid({ userId: "user-1", planId: "mock-pass-6m" }, "pay_abc");
    const res = await POST(makeRequest(body)); // 49900 paid, mock pass costs 9900
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toHaveProperty("skipped");
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("revokes the pass on a full refund", async () => {
    const res = await POST(
      makeRequest({
        event: "refund.processed",
        payload: {
          refund: { entity: { payment_id: "pay_abc", amount: 49900 } },
          payment: { entity: { id: "pay_abc", amount: 49900, amount_refunded: 49900 } },
        },
      })
    );
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ revoked: 1 });
    expect(revokeMock).toHaveBeenCalledWith("pay_abc");
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("surfaces a transient revoke error as 500 (Razorpay retries)", async () => {
    revokeMock.mockResolvedValueOnce({ kind: "error", message: "db down" });
    const res = await POST(
      makeRequest({
        event: "refund.processed",
        payload: {
          refund: { entity: { payment_id: "pay_abc", amount: 49900 } },
          payment: { entity: { id: "pay_abc", amount: 49900, amount_refunded: 49900 } },
        },
      })
    );
    expect(res.status).toBe(500);
  });

  it("ignores a non-order.paid event without granting", async () => {
    const req = makeRequest({ event: "payment.captured", payload: {} });
    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ignored: "payment.captured" });
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("skips when userId is missing", async () => {
    const req = makeRequest(orderPaid({ planId: "teacher-pass-1y" }, "pay_abc"));
    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toHaveProperty("skipped");
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("skips when paymentId is missing", async () => {
    const req = makeRequest(orderPaid({ userId: "user-1", planId: "teacher-pass-1y" }));
    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toHaveProperty("skipped");
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("skips on an unknown planId", async () => {
    const req = makeRequest(
      orderPaid({ userId: "user-1", planId: "no-such-plan" }, "pay_abc")
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toHaveProperty("skipped");
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("rejects a bad signature with 400 and does not grant", async () => {
    const req = makeRequest(
      orderPaid({ userId: "user-1", planId: "teacher-pass-1y" }, "pay_abc"),
      { badSig: true }
    );
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("returns 503 when the webhook secret is not configured", async () => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
    const req = makeRequest(
      orderPaid({ userId: "user-1", planId: "teacher-pass-1y" }, "pay_abc")
    );
    const res = await POST(req);
    expect(res.status).toBe(503);
    expect(grantMock).not.toHaveBeenCalled();
  });

  it("surfaces a transient grant error as 500 (Razorpay retries)", async () => {
    grantMock.mockResolvedValueOnce({ kind: "error", message: "db down" });
    const req = makeRequest(
      orderPaid({ userId: "user-1", planId: "teacher-pass-1y" }, "pay_abc")
    );
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(grantMock).toHaveBeenCalledTimes(1);
  });

  it("reports already_granted idempotently with 200", async () => {
    grantMock.mockResolvedValueOnce({ kind: "already_granted" });
    const req = makeRequest(
      orderPaid({ userId: "user-1", planId: "teacher-pass-1y" }, "pay_abc")
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ granted: "already_granted" });
  });
});
