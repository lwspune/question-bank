/**
 * The webhook ROUTE with an ebook order: it must reach the ebook grant and
 * never the pass grant, and a full refund must take the book away as well as
 * any pass bought with that payment (a payment id buys one thing, so at most
 * one of the two revokes a row, and running both keeps the route simple).
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { createHmac } from "node:crypto";
import { NextRequest } from "next/server";

vi.mock("@/lib/billing/grant", () => ({
  grantRazorpayEntitlement: vi.fn(async () => ({ kind: "ok" })),
  revokeRazorpayEntitlement: vi.fn(async () => ({ kind: "ok", revoked: 0 })),
}));
vi.mock("@/lib/ebooks/grant", () => ({
  grantEbookPurchase: vi.fn(async () => ({ kind: "ok" })),
  revokeEbookPurchase: vi.fn(async () => ({ kind: "ok", revoked: 1 })),
}));

import { grantRazorpayEntitlement, revokeRazorpayEntitlement } from "@/lib/billing/grant";
import { grantEbookPurchase, revokeEbookPurchase } from "@/lib/ebooks/grant";
import { stampEbookOrderNotes } from "@/lib/ebooks/order";
import { POST } from "@/app/api/billing/webhook/route";

const SECRET = "test_webhook_secret";
const passGrant = vi.mocked(grantRazorpayEntitlement);
const passRevoke = vi.mocked(revokeRazorpayEntitlement);
const bookGrant = vi.mocked(grantEbookPurchase);
const bookRevoke = vi.mocked(revokeEbookPurchase);

function request(body: unknown): NextRequest {
  const raw = JSON.stringify(body);
  return new NextRequest("http://localhost/api/billing/webhook", {
    method: "POST",
    body: raw,
    headers: {
      "x-razorpay-signature": createHmac("sha256", SECRET).update(raw).digest("hex"),
      "content-type": "application/json",
    },
  });
}

describe("billing webhook: ebooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RAZORPAY_WEBHOOK_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
  });

  it("grants the ebook on order.paid and never a pass", async () => {
    const res = await POST(
      request({
        event: "order.paid",
        payload: {
          order: {
            entity: {
              status: "paid",
              amount_paid: 14900,
              currency: "INR",
              notes: stampEbookOrderNotes({ slug: "mht-cet-maths", listPaise: 14900, amountPaise: 14900 }, "u1"),
            },
          },
          payment: { entity: { id: "pay_book" } },
        },
      })
    );
    expect(res.status).toBe(200);
    expect(bookGrant).toHaveBeenCalledWith({
      userId: "u1",
      paymentId: "pay_book",
      ebookSlug: "mht-cet-maths",
      amountPaise: 14900,
    });
    expect(passGrant).not.toHaveBeenCalled();
  });

  it("returns 500 on a failed ebook grant so Razorpay retries", async () => {
    bookGrant.mockResolvedValueOnce({ kind: "error", message: "db down" });
    const res = await POST(
      request({
        event: "order.paid",
        payload: {
          order: {
            entity: {
              status: "paid",
              amount_paid: 14900,
              currency: "INR",
              notes: stampEbookOrderNotes({ slug: "mht-cet-maths", listPaise: 14900, amountPaise: 14900 }, "u1"),
            },
          },
          payment: { entity: { id: "pay_book" } },
        },
      })
    );
    expect(res.status).toBe(500);
  });

  it("a full refund revokes the ebook bought with that payment", async () => {
    const res = await POST(
      request({
        event: "refund.processed",
        payload: { payment: { entity: { id: "pay_book", amount: 14900, amount_refunded: 14900 } } },
      })
    );
    expect(res.status).toBe(200);
    expect(bookRevoke).toHaveBeenCalledWith("pay_book");
    expect(passRevoke).toHaveBeenCalledWith("pay_book");
    await expect(res.json()).resolves.toMatchObject({ revoked: 1 });
  });

  it("returns 500 when the ebook revoke fails", async () => {
    bookRevoke.mockResolvedValueOnce({ kind: "error", message: "db down" });
    const res = await POST(
      request({
        event: "refund.processed",
        payload: { payment: { entity: { id: "pay_book", amount: 14900, amount_refunded: 14900 } } },
      })
    );
    expect(res.status).toBe(500);
  });
});
