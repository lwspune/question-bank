/**
 * The payment check (2026-11-15): which captured Razorpay payments were never
 * granted, what each one would grant, and the email the owner gets.
 *
 * WHY: on 2026-11-15 a ₹197 Practice Pass paid by UPI was never granted (the
 * buyer's browser never ran the success check and the webhook never granted
 * it), and a ₹499 Premium Pass on 2026-11-01 was the same, fixed by hand three
 * days later. The check grants by the WEBHOOK's own rule (decideWebhook), so
 * the two paths cannot disagree.
 */
import { describe, expect, it } from "vitest";
import {
  RECONCILE_GRACE_SECONDS,
  buildStrandedEmail,
  decidePaidOrder,
  strandedPayments,
  type RazorpayPayment,
  type StrandedOutcome,
} from "@/lib/billing/reconcile";
import { stampOrderNotes, type Plan } from "@/lib/billing/plans";
import { stampDiscountNotes } from "@/lib/billing/fixPoints";
import { stampEbookOrderNotes } from "@/lib/ebooks/order";

const NOW = 1_763_200_000; // seconds
const OLD = NOW - RECONCILE_GRACE_SECONDS - 60;

const pay = (over: Partial<RazorpayPayment> = {}): RazorpayPayment => ({
  id: "pay_A",
  status: "captured",
  order_id: "order_A",
  amount: 19700,
  currency: "INR",
  created_at: OLD,
  method: "upi",
  ...over,
});

const PRACTICE: Plan = {
  id: "practice-pass-6m", label: "Practice Pass", blurb: "", perks: [], urlKey: "practice",
  amountPaise: 19900, currency: "INR", site: "pyqvault", durationDays: 182, scope: "practice", active: true, sortOrder: 1,
};

describe("strandedPayments", () => {
  it("keeps a captured payment on one of our orders that has no grant", () => {
    expect(strandedPayments([pay()], new Set(), NOW).map((p) => p.id)).toEqual(["pay_A"]);
  });

  it("drops a payment already granted (a pass or an ebook row carries its id)", () => {
    expect(strandedPayments([pay()], new Set(["pay_A"]), NOW)).toEqual([]);
  });

  it("drops refunded, failed and authorized-only payments", () => {
    const list = ["refunded", "failed", "authorized", "created"].map((status, i) => pay({ id: `pay_${i}`, status }));
    expect(strandedPayments(list, new Set(), NOW)).toEqual([]);
  });

  it("drops a payment with no order (a payment link or page, not our checkout)", () => {
    expect(strandedPayments([pay({ order_id: null }), pay({ id: "pay_B", order_id: "" })], new Set(), NOW)).toEqual([]);
  });

  it("leaves a payment younger than the grace period to the webhook", () => {
    const fresh = pay({ created_at: NOW - RECONCILE_GRACE_SECONDS + 30 });
    expect(strandedPayments([fresh], new Set(), NOW)).toEqual([]);
  });
});

describe("decidePaidOrder", () => {
  it("grants the 2026-11-15 order as the webhook would: Practice Pass, 182 days, marked as bought with points", () => {
    const notes = stampDiscountNotes(stampOrderNotes(PRACTICE, "user-1"), PRACTICE, { points: 1 });
    expect(notes.amountPaise).toBe("19700");
    const d = decidePaidOrder({ status: "paid", amount_paid: 19700, currency: "INR", notes }, "pay_A");
    expect(d).toMatchObject({
      action: "grant",
      userId: "user-1",
      paymentId: "pay_A",
      grant: { scope: "practice", durationDays: 182, amountPaise: 19700, currency: "INR" },
      note: "fix_points:1",
      referral: false,
    });
  });

  it("grants an ebook order as an ebook", () => {
    const notes = stampEbookOrderNotes({ slug: "book-1", listPaise: 14900, amountPaise: 14900 }, "user-2");
    const d = decidePaidOrder({ status: "paid", amount_paid: 14900, currency: "INR", notes }, "pay_B");
    expect(d).toMatchObject({ action: "grant_ebook", userId: "user-2", paymentId: "pay_B", grant: { ebookSlug: "book-1" } });
  });

  it("skips an order that carries no buyer (not ours to grant)", () => {
    expect(decidePaidOrder({ status: "paid", amount_paid: 100, currency: "INR", notes: {} }, "pay_C")).toMatchObject({
      action: "skip",
      reason: "no buyer in order notes",
    });
  });

  it("skips an order whose paid amount does not match what our server stamped", () => {
    const notes = stampOrderNotes(PRACTICE, "user-1");
    expect(decidePaidOrder({ status: "paid", amount_paid: 100, currency: "INR", notes }, "pay_D")).toMatchObject({
      action: "skip",
    });
  });
});

describe("buildStrandedEmail", () => {
  const base: StrandedOutcome = {
    paymentId: "pay_A", orderId: "order_A", amount: 19700, currency: "INR", createdAt: OLD,
    result: "granted", what: "Practice Pass (practice)", detail: "",
  };
  const RUN = "https://github.com/x/y/actions/runs/1";

  it("sends nothing when every payment was already granted or was not ours", () => {
    expect(buildStrandedEmail([], RUN)).toBeNull();
    expect(buildStrandedEmail([{ ...base, result: "already_granted" }, { ...base, result: "skipped", detail: "no buyer in order notes" }], RUN)).toBeNull();
  });

  it("names each payment it granted, in rupees, and says the webhook missed it", () => {
    const e = buildStrandedEmail([base], RUN);
    expect(e).not.toBeNull();
    expect(e!.subject).toContain("1 payment");
    expect(e!.text).toContain("pay_A");
    expect(e!.text).toContain("₹197");
    expect(e!.text).toContain("Practice Pass");
    expect(e!.text.toLowerCase()).toContain("webhook");
    expect(e!.html).toContain("pay_A");
  });

  it("also writes when a grant FAILED, since then a buyer is still waiting", () => {
    const e = buildStrandedEmail([{ ...base, result: "error", detail: "db down" }], RUN);
    expect(e).not.toBeNull();
    expect(e!.subject.toLowerCase()).toContain("could not");
    expect(e!.text).toContain("db down");
    expect(e!.text).toContain(RUN);
  });

  it("shows a dollar payment in dollars", () => {
    const e = buildStrandedEmail([{ ...base, amount: 1900, currency: "USD" }], RUN);
    expect(e!.text).toContain("$19");
  });

  it("escapes what it puts in the html", () => {
    const e = buildStrandedEmail([{ ...base, result: "error", detail: "<b>x</b>" }], RUN);
    expect(e!.html).not.toContain("<b>x</b>");
  });
});
