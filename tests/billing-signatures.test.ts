/**
 * Pure-logic tests for Razorpay signature verification + expiry math.
 * No network — the HMAC scheme + timing-safe compare are the security-critical
 * bits, so they're unit-tested against self-computed vectors.
 */
import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import {
  verifyPaymentSignature,
  verifyWebhookSignature,
} from "@/lib/billing/razorpay";
import { computeExpiry, getPlan, PLANS } from "@/lib/billing/plans";

const SECRET = "test_secret_key";

describe("billing/razorpay verifyPaymentSignature", () => {
  const orderId = "order_ABC123";
  const paymentId = "pay_XYZ789";
  const good = createHmac("sha256", SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  it("accepts a correct signature", () => {
    expect(verifyPaymentSignature(orderId, paymentId, good, SECRET)).toBe(true);
  });

  it("rejects a tampered signature", () => {
    expect(verifyPaymentSignature(orderId, paymentId, good + "00", SECRET)).toBe(false);
    expect(verifyPaymentSignature(orderId, paymentId, "deadbeef", SECRET)).toBe(false);
  });

  it("rejects when order/payment id is swapped", () => {
    expect(verifyPaymentSignature(paymentId, orderId, good, SECRET)).toBe(false);
  });

  it("rejects under the wrong secret", () => {
    expect(verifyPaymentSignature(orderId, paymentId, good, "other_secret")).toBe(false);
  });

  it("rejects empty/garbage input safely", () => {
    expect(verifyPaymentSignature(orderId, paymentId, "", SECRET)).toBe(false);
  });
});

describe("billing/razorpay verifyWebhookSignature", () => {
  const body = JSON.stringify({ event: "payment.captured", id: "evt_1" });
  const good = createHmac("sha256", SECRET).update(body).digest("hex");

  it("accepts a correct webhook signature over the raw body", () => {
    expect(verifyWebhookSignature(body, good, SECRET)).toBe(true);
  });

  it("rejects when the body is mutated", () => {
    expect(verifyWebhookSignature(body + " ", good, SECRET)).toBe(false);
  });

  it("rejects a bad signature", () => {
    expect(verifyWebhookSignature(body, "nope", SECRET)).toBe(false);
  });
});

describe("billing/plans", () => {
  const NOW = Date.UTC(2026, 4, 31);

  it("has at least the premium plan, priced in paise", () => {
    expect(PLANS.length).toBeGreaterThan(0);
    const p = PLANS[0];
    expect(p.amountPaise).toBeGreaterThan(0);
    expect(p.scope).toBe("all");
  });

  it("getPlan returns the plan by id, null otherwise", () => {
    const p = PLANS[0];
    expect(getPlan(p.id)).toEqual(p);
    expect(getPlan("nope")).toBeNull();
  });

  it("computeExpiry adds durationDays as an ISO timestamp", () => {
    const iso = computeExpiry(NOW, 365);
    expect(iso).toBe(new Date(NOW + 365 * 86400000).toISOString());
  });

  it("computeExpiry returns null for a lifetime (null duration)", () => {
    expect(computeExpiry(NOW, null)).toBeNull();
  });
});
