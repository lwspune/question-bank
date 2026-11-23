/**
 * The "Secure payment via ..." line under the passes on /pricing names the
 * gateway and currency of the passes SHOWN (0271), not the site: a visitor in
 * India on intl sees the rupee IMAT pass, paid through Razorpay in rupees,
 * while everyone else there sees the dollar pass sold through Paddle.
 */
import { describe, it, expect } from "vitest";
import { payMethods, paymentLine, paymentTerms } from "@/lib/billing/paymentLine";
import type { Plan } from "@/lib/billing/plans";

const plan = (over: Partial<Plan>): Plan => ({
  id: "p", label: "Pass", blurb: "b", perks: [], urlKey: "p", amountPaise: 1900, currency: "USD", site: "intl",
  durationDays: 182, scope: "imat", active: true, sortOrder: 1, ...over,
});

describe("paymentLine", () => {
  it("a Paddle pass names Paddle as the seller of record, in its currency", () => {
    const line = paymentLine([plan({ paymentProvider: "paddle", paddleProductId: "pro_1" })]);
    expect(line).toBe("Secure checkout by Paddle, our reseller and Merchant of Record · cards and other payment methods, in US dollars");
  });

  it("a dollar pass through Razorpay keeps the international-card line", () => {
    expect(paymentLine([plan({ paymentProvider: "razorpay" })])).toBe(
      "Secure payment via Razorpay · international debit and credit cards, in US dollars"
    );
  });

  it("a rupee pass through Razorpay offers UPI, on intl too (the IMAT India price)", () => {
    expect(paymentLine([plan({ currency: "INR" })])).toBe("Secure payment via Razorpay · UPI, cards, netbanking");
    expect(paymentLine([plan({ currency: "INR", site: "pyqvault", scope: "mocks" })])).toBe(
      "Secure payment via Razorpay · UPI, cards, netbanking"
    );
  });

  it("Paddle wins when any shown pass is sold through it", () => {
    const line = paymentLine([plan({ paymentProvider: "razorpay" }), plan({ paymentProvider: "paddle", paddleProductId: "pro_1" })]);
    expect(line).toMatch(/^Secure checkout by Paddle/);
  });

  it("no passes, no line", () => {
    expect(paymentLine([])).toBeNull();
  });
});

/**
 * The Terms' payment sentence. Paddle reviews the site BEFORE a plan can move
 * to it, so the Terms must name Paddle while dollar payments still go through
 * Razorpay, and stay true in both states; once every dollar pass is Paddle's,
 * the sentence says Paddle alone.
 */
describe("paymentTerms", () => {
  const inr = plan({ currency: "INR", site: "pyqvault", scope: "mocks" });
  const usdRazorpay = plan({ paymentProvider: "razorpay" });
  const usdPaddle = plan({ paymentProvider: "paddle", paddleProductId: "pro_1" });

  it("rupees only: Razorpay, as before", () => {
    expect(paymentTerms([inr])).toBe("Payments are processed by Razorpay. We do not see or store your card, UPI or bank details.");
  });

  it("dollars not yet moved to Paddle: true for either gateway, and names Paddle as Merchant of Record", () => {
    const s = paymentTerms([inr, usdRazorpay]);
    expect(s).toMatch(/^Payments in Indian rupees are processed by Razorpay\. /);
    expect(s).toMatch(/by Razorpay or, where the checkout says so, by our online reseller Paddle\.com/);
    expect(s).toMatch(/Merchant of Record/);
  });

  it("every dollar pass with Paddle: Paddle alone for dollars", () => {
    const s = paymentTerms([inr, usdPaddle]);
    expect(s).toMatch(/Orders in US dollars on intl\.pyqvault\.com are processed by our online reseller Paddle\.com, the Merchant of Record/);
    expect(s).not.toMatch(/Razorpay or/);
  });

  it("no rupee pass on sale leaves the rupee sentence out", () => {
    expect(paymentTerms([usdPaddle])).toMatch(/^Orders in US dollars/);
  });

  it("never an em dash (the voice rule)", () => {
    for (const set of [[inr], [inr, usdRazorpay], [inr, usdPaddle]]) expect(paymentTerms(set)).not.toMatch(/—/);
  });
});

// 2026-11-19 (V on intl): V told every buyer "pay by UPI, card or netbanking". The words follow the
// passes shown, by the same rule as paymentLine, so an intl buyer abroad hears what Paddle takes.
describe("payMethods: how V says to pay", () => {
  it("names what each gateway takes", () => {
    expect(payMethods([plan({ paymentProvider: "paddle", paddleProductId: "pro_1" })])).toBe("card or another method shown at checkout");
    expect(payMethods([plan({ paymentProvider: "razorpay" })])).toBe("an international debit or credit card");
    expect(payMethods([plan({ currency: "INR", site: "pyqvault", scope: "mocks" })])).toBe("UPI, card or netbanking");
  });

  it("falls back to www's words when nothing is on sale", () => {
    expect(payMethods([])).toBe("UPI, card or netbanking");
  });
});
