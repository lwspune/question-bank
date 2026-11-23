/**
 * The webhook alarm (2026-11-22, migration 0283): every webhook delivery is
 * recorded, and the payment check emails the owner when a paid order has no
 * delivery behind it.
 *
 * WHY: Razorpay's webhook sat DISABLED from 30 Oct to 22 Nov 2026 and nothing
 * noticed, because most buyers are granted by their own browser. Only buyers
 * whose UPI app never handed back to the page were stranded (1 Nov, 15 Nov,
 * 22 Nov). Every paid order should still get an order.paid delivery, so a
 * paid order with none is the signal, whether or not a buyer was stranded.
 */
import { describe, expect, it } from "vitest";
import {
  WEBHOOK_ALARM_MIN_AGE_SECONDS,
  buildWebhookSilentEmail,
  paddleReceipt,
  razorpayReceipt,
  silentRefs,
  type SilentItem,
} from "@/lib/billing/webhookAlarm";

describe("razorpayReceipt: what a Razorpay delivery is recorded as", () => {
  it("order.paid is recorded under its order id", () => {
    expect(
      razorpayReceipt({
        event: "order.paid",
        payload: { order: { entity: { id: "order_A", status: "paid" } }, payment: { entity: { id: "pay_A" } } },
      })
    ).toEqual({ provider: "razorpay", event: "order.paid", ref: "order_A" });
  });

  it("refund.processed is recorded under the refunded payment", () => {
    expect(
      razorpayReceipt({ event: "refund.processed", payload: { refund: { entity: { payment_id: "pay_B" } } } })
    ).toEqual({ provider: "razorpay", event: "refund.processed", ref: "pay_B" });
  });

  it("an event with no id is still recorded: the delivery itself is the news", () => {
    expect(razorpayReceipt({ event: "payment.authorized", payload: {} })).toEqual({
      provider: "razorpay",
      event: "payment.authorized",
      ref: null,
    });
  });

  it("a body with no event is not recorded", () => {
    expect(razorpayReceipt({})).toBeNull();
  });

  it("an over-long event or id is cut to the column's size, never refused", () => {
    const r = razorpayReceipt({ event: "e".repeat(200), payload: { refund: { entity: { payment_id: "p".repeat(200) } } } });
    expect(r?.event.length).toBe(64);
    expect(r?.ref?.length).toBe(64);
  });
});

describe("paddleReceipt: what a Paddle delivery is recorded as", () => {
  it("a transaction event is recorded under the transaction id", () => {
    expect(paddleReceipt({ event_type: "transaction.completed", data: { id: "txn_01abc" } })).toEqual({
      provider: "paddle",
      event: "transaction.completed",
      ref: "txn_01abc",
    });
  });

  it("an adjustment is recorded under the transaction it adjusts", () => {
    expect(paddleReceipt({ event_type: "adjustment.created", data: { transaction_id: "txn_01xyz" } })).toEqual({
      provider: "paddle",
      event: "adjustment.created",
      ref: "txn_01xyz",
    });
  });

  it("a body with no event type is not recorded", () => {
    expect(paddleReceipt({ data: { id: "txn_1" } })).toBeNull();
  });
});

describe("silentRefs: paid orders with no delivery behind them", () => {
  const NOW = 1_800_000_000;
  const SINCE = NOW - 10 * 86400;
  const OLD = NOW - WEBHOOK_ALARM_MIN_AGE_SECONDS - 60;
  const item = (ref: string, createdAtSec = OLD): SilentItem => ({ ref, createdAtSec, label: ref });

  it("names a paid order whose delivery never came", () => {
    expect(silentRefs([item("order_A"), item("order_B")], new Set(["order_A"]), NOW, SINCE).map((i) => i.ref)).toEqual([
      "order_B",
    ]);
  });

  it("leaves a young order alone: Razorpay delivers within seconds, but may retry", () => {
    const young = item("order_C", NOW - WEBHOOK_ALARM_MIN_AGE_SECONDS + 60);
    expect(silentRefs([young], new Set(), NOW, SINCE)).toEqual([]);
  });

  it("ignores orders paid before receipts were recorded at all", () => {
    expect(silentRefs([item("order_D", SINCE - 1)], new Set(), NOW, SINCE)).toEqual([]);
  });

  it("is silent when every order had its delivery", () => {
    expect(silentRefs([item("order_A")], new Set(["order_A"]), NOW, SINCE)).toEqual([]);
  });
});

describe("buildWebhookSilentEmail", () => {
  it("is null when nothing is missing", () => {
    expect(buildWebhookSilentEmail({ razorpay: [], paddle: [] }, "run")).toBeNull();
  });

  it("names the provider, the orders, and what to check", () => {
    const email = buildWebhookSilentEmail(
      {
        razorpay: [{ ref: "order_A", createdAtSec: 1_800_000_000, label: "₹199, pay_A" }],
        paddle: [],
      },
      "https://example.test/run"
    );
    expect(email).not.toBeNull();
    expect(email!.subject).toMatch(/Razorpay webhook/);
    expect(email!.subject).not.toMatch(/Paddle/);
    expect(email!.text).toContain("order_A");
    expect(email!.text).toContain("₹199, pay_A");
    // The thing to look at first: is it switched on.
    expect(email!.text).toMatch(/Disabled/);
    expect(email!.text).toContain("https://example.test/run");
    expect(email!.html).toContain("order_A");
  });

  it("names Paddle when Paddle is the quiet one", () => {
    const email = buildWebhookSilentEmail(
      { razorpay: [], paddle: [{ ref: "txn_1", createdAtSec: 1_800_000_000, label: "$19" }] },
      "run"
    );
    expect(email!.subject).toMatch(/Paddle webhook/);
    expect(email!.text).toContain("txn_1");
  });

  it("escapes what goes into the HTML", () => {
    const email = buildWebhookSilentEmail(
      { razorpay: [{ ref: "order_<x>", createdAtSec: 1_800_000_000, label: "<b>" }], paddle: [] },
      "run"
    );
    expect(email!.html).not.toContain("<b>");
    expect(email!.html).toContain("&lt;b&gt;");
  });
});
