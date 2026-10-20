/**
 * The order and verify ROUTES with an ebook (2026-10-20). What is locked:
 *
 * - order: the price comes from ebookOrderTerms (the buyer's own terms), it is
 *   stamped into the Razorpay notes as an ebook order, and a book the buyer
 *   owns or that is off sale never reaches Razorpay;
 * - verify: a paid ebook order records the purchase and never grants a pass.
 *
 * Razorpay, the session and the DB writes are mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => ({ id: "u1", email: "asha@example.com" })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
vi.mock("@/lib/activity/service", () => ({ logActivity: vi.fn(async () => undefined) }));
vi.mock("@/lib/billing/razorpay", () => ({
  createOrder: vi.fn(async (input: { amountPaise: number }) => ({ ok: true, orderId: "order_1", amount: input.amountPaise, currency: "INR" })),
  fetchOrder: vi.fn(),
  verifyPaymentSignature: vi.fn(() => true),
}));
vi.mock("@/lib/ebooks/checkout", () => ({ ebookOrderTerms: vi.fn() }));
vi.mock("@/lib/ebooks/grant", () => ({ grantEbookPurchase: vi.fn(async () => ({ kind: "ok" })) }));
vi.mock("@/lib/billing/grant", () => ({ grantRazorpayEntitlement: vi.fn(async () => ({ kind: "ok" })) }));

import { createOrder, fetchOrder } from "@/lib/billing/razorpay";
import { ebookOrderTerms } from "@/lib/ebooks/checkout";
import { grantEbookPurchase } from "@/lib/ebooks/grant";
import { grantRazorpayEntitlement } from "@/lib/billing/grant";
import { stampEbookOrderNotes } from "@/lib/ebooks/order";
import { POST as order } from "@/app/api/billing/order/route";
import { POST as verify } from "@/app/api/billing/verify/route";

const post = (url: string, body: unknown) =>
  new NextRequest(`http://localhost${url}`, { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });

beforeEach(() => {
  vi.clearAllMocks();
  process.env.RAZORPAY_KEY_ID = "rzp_test";
  process.env.RAZORPAY_KEY_SECRET = "secret";
});

describe("/api/billing/order with an ebook", () => {
  it("charges the buyer's price and stamps an ebook order", async () => {
    vi.mocked(ebookOrderTerms).mockResolvedValueOnce({
      ok: true, slug: "mht-cet-maths", title: "MHT-CET Mathematics", listPaise: 14900, amountPaise: 11900, passHolder: true,
    });
    const res = await order(post("/api/billing/order", { ebookSlug: "mht-cet-maths" }));
    expect(res.status).toBe(200);
    const call = vi.mocked(createOrder).mock.calls[0][0];
    expect(call.amountPaise).toBe(11900);
    expect(call.notes).toMatchObject({ kind: "ebook", ebookSlug: "mht-cet-maths", amountPaise: "11900", userId: "u1" });
    await expect(res.json()).resolves.toMatchObject({ orderId: "order_1", planLabel: "MHT-CET Mathematics" });
  });

  it("never opens a checkout for a book the buyer owns", async () => {
    vi.mocked(ebookOrderTerms).mockResolvedValueOnce({ ok: false, status: 409, error: "You already own this book." });
    const res = await order(post("/api/billing/order", { ebookSlug: "mht-cet-maths" }));
    expect(res.status).toBe(409);
    expect(createOrder).not.toHaveBeenCalled();
  });
});

describe("/api/billing/verify with an ebook", () => {
  const paidOrder = (amount_paid: number, status = "paid") => ({
    ok: true as const,
    order: {
      status,
      amount_paid,
      currency: "INR",
      notes: stampEbookOrderNotes({ slug: "mht-cet-maths", listPaise: 14900, amountPaise: 14900 }, "u1"),
    },
  });
  const fields = { razorpay_order_id: "order_1", razorpay_payment_id: "pay_1", razorpay_signature: "sig" };

  it("records the purchase and grants no pass", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce(paidOrder(14900));
    const res = await verify(post("/api/billing/verify", fields));
    expect(res.status).toBe(200);
    expect(grantEbookPurchase).toHaveBeenCalledWith({ userId: "u1", paymentId: "pay_1", ebookSlug: "mht-cet-maths", amountPaise: 14900 });
    expect(grantRazorpayEntitlement).not.toHaveBeenCalled();
  });

  it("answers 202 when the payment is not captured yet (the webhook grants it)", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce(paidOrder(14900, "attempted"));
    const res = await verify(post("/api/billing/verify", fields));
    expect(res.status).toBe(202);
    expect(grantEbookPurchase).not.toHaveBeenCalled();
  });

  it("refuses a paid amount that differs from the stamped price", async () => {
    vi.mocked(fetchOrder).mockResolvedValueOnce(paidOrder(100));
    const res = await verify(post("/api/billing/verify", fields));
    expect(res.status).toBe(400);
    expect(grantEbookPurchase).not.toHaveBeenCalled();
  });
});
