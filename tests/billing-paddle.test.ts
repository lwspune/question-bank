/**
 * Paddle (2026-11-17): the intl site's USD passes are sold through Paddle,
 * the Merchant of Record, so EU VAT and other sales taxes are Paddle's to
 * collect. Razorpay keeps everything else. Pure core: src/lib/billing/paddle.ts.
 *
 * The ORDER is still the contract. Our server creates the Paddle transaction
 * with the same notes Razorpay orders carry (stampOrderNotes) as custom_data,
 * and every grant path reads the terms back from the transaction Paddle holds.
 *
 * One thing Razorpay never needed: Paddle.js can open a checkout from the
 * BROWSER with its own custom_data. So a grant also requires the two marks
 * only our server can make: origin "api" (needs the secret API key) and a
 * one-off "custom" price (catalog prices are all a browser can use).
 */
import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import {
  verifyPaddleSignature,
  paidOrderFromTransaction,
  decidePaddleTransaction,
  decidePaddleEvent,
  transactionBody,
  paddleEnvFromToken,
  paddleApiBase,
  strandedPaddleTransactions,
  type PaddleTransaction,
} from "@/lib/billing/paddle";
import { stampOrderNotes, type Plan } from "@/lib/billing/plans";
import { PLAN_COLUMNS, rowToPlan } from "@/lib/billing/plansQuery";

const IMAT: Plan = {
  id: "intl-pass-6m", label: "Premium Pass", blurb: "b", perks: [], urlKey: "intl", amountPaise: 1900,
  currency: "USD", site: "intl", durationDays: 182, scope: "imat", active: true, sortOrder: 1, countries: null,
  paymentProvider: "paddle", paddleProductId: "pro_1",
};

const NOW = Date.parse("2026-11-17T12:00:00Z");

function txn(over: Partial<PaddleTransaction> = {}, priceOver: Record<string, unknown> = {}): PaddleTransaction {
  return {
    id: "txn_1",
    status: "completed",
    origin: "api",
    currency_code: "USD",
    created_at: "2026-11-17T11:00:00Z",
    custom_data: stampOrderNotes(IMAT, "u1", NOW),
    items: [
      {
        quantity: 1,
        price: { id: "pri_c", type: "custom", product_id: "pro_1", unit_price: { amount: "1900", currency_code: "USD" }, ...priceOver },
      },
    ],
    ...over,
  };
}

describe("verifyPaddleSignature", () => {
  const secret = "pdl_ntfset_secret";
  const raw = '{"event_type":"transaction.completed"}';
  const sign = (ts: number, body = raw, key = secret) => createHmac("sha256", key).update(`${ts}:${body}`).digest("hex");
  const nowSec = 1_800_000_000;

  it("accepts Paddle's ts/h1 header over the raw body", () => {
    expect(verifyPaddleSignature(raw, `ts=${nowSec};h1=${sign(nowSec)}`, secret, nowSec)).toBe(true);
  });

  it("accepts any h1 while Paddle rotates the secret", () => {
    const header = `ts=${nowSec};h1=${"0".repeat(64)};h1=${sign(nowSec)}`;
    expect(verifyPaddleSignature(raw, header, secret, nowSec)).toBe(true);
  });

  it("refuses another secret, a changed body, and a missing or garbled header", () => {
    expect(verifyPaddleSignature(raw, `ts=${nowSec};h1=${sign(nowSec, raw, "other")}`, secret, nowSec)).toBe(false);
    expect(verifyPaddleSignature(raw + " ", `ts=${nowSec};h1=${sign(nowSec)}`, secret, nowSec)).toBe(false);
    expect(verifyPaddleSignature(raw, "", secret, nowSec)).toBe(false);
    expect(verifyPaddleSignature(raw, `h1=${sign(nowSec)}`, secret, nowSec)).toBe(false);
    expect(verifyPaddleSignature(raw, `ts=${nowSec};h1=zz`, secret, nowSec)).toBe(false);
  });

  it("refuses a signature older than five minutes (a replayed delivery)", () => {
    const old = nowSec - 301;
    expect(verifyPaddleSignature(raw, `ts=${old};h1=${sign(old)}`, secret, nowSec)).toBe(false);
    const recent = nowSec - 299;
    expect(verifyPaddleSignature(raw, `ts=${recent};h1=${sign(recent)}`, secret, nowSec)).toBe(true);
  });
});

describe("paidOrderFromTransaction reads a Paddle transaction as the order contract", () => {
  it("a completed or paid transaction is paid, for the one item's price", () => {
    for (const status of ["completed", "paid"]) {
      expect(paidOrderFromTransaction(txn({ status }))).toMatchObject({ status: "paid", amount_paid: 1900, currency: "USD" });
    }
  });

  it("a transaction still open is not paid", () => {
    for (const status of ["draft", "ready", "billed", "canceled", "past_due"]) {
      expect(paidOrderFromTransaction(txn({ status })).status).not.toBe("paid");
    }
  });

  it("only string custom_data values become notes", () => {
    const order = paidOrderFromTransaction(txn({ custom_data: { userId: "u1", n: 5, nested: { a: 1 } } as never }));
    expect(order.notes).toEqual({ userId: "u1" });
  });

  it("two items, a quantity above one, or a price in another currency leave no amount to match", () => {
    const t = txn();
    expect(paidOrderFromTransaction({ ...t, items: [...t.items, ...t.items] }).amount_paid).toBeUndefined();
    expect(paidOrderFromTransaction(txn({}, {})).amount_paid).toBe(1900);
    expect(paidOrderFromTransaction({ ...t, items: [{ ...t.items[0], quantity: 2 }] }).amount_paid).toBeUndefined();
    expect(paidOrderFromTransaction(txn({}, { unit_price: { amount: "1900", currency_code: "EUR" } })).amount_paid).toBeUndefined();
  });
});

describe("decidePaddleTransaction", () => {
  it("grants a completed transaction our server made, from its own notes, marked as Paddle", () => {
    const d = decidePaddleTransaction(txn());
    expect(d).toMatchObject({
      action: "grant",
      userId: "u1",
      paymentId: "txn_1",
      provider: "paddle",
      grant: { planId: "intl-pass-6m", scope: "imat", amountPaise: 1900, currency: "USD", durationDays: 182 },
    });
  });

  it("refuses a transaction a browser made (origin web), whatever its notes say", () => {
    expect(decidePaddleTransaction(txn({ origin: "web" }))).toMatchObject({ action: "skip" });
  });

  it("refuses a catalog price: only our server sets a one-off price", () => {
    expect(decidePaddleTransaction(txn({}, { type: "standard" }))).toMatchObject({ action: "skip" });
  });

  it("refuses a transaction whose price is not what the notes say", () => {
    expect(decidePaddleTransaction(txn({}, { unit_price: { amount: "100", currency_code: "USD" } }))).toMatchObject({
      action: "skip",
      reason: "amount does not match order",
    });
  });

  it("refuses a charge in another currency than the notes", () => {
    expect(
      decidePaddleTransaction(txn({ currency_code: "EUR" }, { unit_price: { amount: "1900", currency_code: "EUR" } }))
    ).toMatchObject({ action: "skip" });
  });

  it("an unpaid transaction is skipped as not paid", () => {
    expect(decidePaddleTransaction(txn({ status: "ready" }))).toMatchObject({ action: "skip", reason: "order not paid" });
  });

  it("no buyer in the notes is skipped", () => {
    expect(decidePaddleTransaction(txn({ custom_data: {} }))).toMatchObject({ action: "skip" });
  });

  it("an ebook is never sold through Paddle", () => {
    expect(decidePaddleTransaction(txn({ custom_data: { userId: "u1", kind: "ebook", ebookSlug: "b" } }))).toMatchObject({
      action: "skip",
    });
  });
});

describe("decidePaddleEvent", () => {
  const event = (event_type: string, data: unknown) => ({ event_type, data });

  it("transaction.completed and transaction.paid grant", () => {
    expect(decidePaddleEvent(event("transaction.completed", txn()))).toMatchObject({ action: "grant", provider: "paddle" });
    expect(decidePaddleEvent(event("transaction.paid", txn({ status: "paid" })))).toMatchObject({ action: "grant" });
  });

  it("an approved FULL refund or a chargeback revokes the pass that transaction bought", () => {
    for (const action of ["refund", "chargeback"]) {
      const adj = { action, type: "full", status: "approved", transaction_id: "txn_1" };
      expect(decidePaddleEvent(event("adjustment.updated", adj))).toEqual({ action: "revoke", paymentId: "txn_1" });
      expect(decidePaddleEvent(event("adjustment.created", adj))).toEqual({ action: "revoke", paymentId: "txn_1" });
    }
  });

  it("a partial refund, one still pending, or a credit leaves the pass alone", () => {
    const base = { action: "refund", type: "full", status: "approved", transaction_id: "txn_1" };
    expect(decidePaddleEvent(event("adjustment.updated", { ...base, type: "partial" }))).toMatchObject({ action: "skip" });
    expect(decidePaddleEvent(event("adjustment.created", { ...base, status: "pending_approval" }))).toMatchObject({ action: "skip" });
    expect(decidePaddleEvent(event("adjustment.updated", { ...base, action: "credit" }))).toMatchObject({ action: "skip" });
    expect(decidePaddleEvent(event("adjustment.updated", { ...base, transaction_id: "" }))).toMatchObject({ action: "skip" });
  });

  it("other events are ignored", () => {
    expect(decidePaddleEvent(event("customer.created", {}))).toEqual({ action: "ignore", event: "customer.created" });
    expect(decidePaddleEvent({})).toEqual({ action: "ignore", event: undefined });
  });
});

describe("transactionBody", () => {
  it("prices the plan as a one-off price on its Paddle product, charged in the plan's currency, notes as custom_data", () => {
    const notes = stampOrderNotes(IMAT, "u1", NOW);
    const body = transactionBody(IMAT, notes);
    expect(body).toEqual({
      currency_code: "USD",
      custom_data: notes,
      items: [
        {
          quantity: 1,
          price: {
            product_id: "pro_1",
            name: "Premium Pass",
            description: "intl-pass-6m",
            unit_price: { amount: "1900", currency_code: "USD" },
            tax_mode: "location",
            quantity: { minimum: 1, maximum: 1 },
          },
        },
      ],
    });
  });

  it("charges the notes' amount, not the plan's, so the order stays the contract", () => {
    const notes = { ...stampOrderNotes(IMAT, "u1", NOW), amountPaise: "1500" };
    expect(transactionBody(IMAT, notes).items[0].price.unit_price.amount).toBe("1500");
  });

  it("refuses a plan with no Paddle product", () => {
    expect(() => transactionBody({ ...IMAT, paddleProductId: null }, stampOrderNotes(IMAT, "u1", NOW))).toThrow(/product/);
  });
});

describe("strandedPaddleTransactions (the payment check)", () => {
  const nowSec = Date.parse("2026-11-17T12:00:00Z") / 1000;
  const at = (minAgo: number) => new Date((nowSec - minAgo * 60) * 1000).toISOString();

  it("a paid transaction of ours, older than the grace period, with no pass row, is stranded", () => {
    const t = txn({ id: "txn_a", created_at: at(20) });
    expect(strandedPaddleTransactions([t], new Set(), nowSec).map((x) => x.id)).toEqual(["txn_a"]);
  });

  it("a granted one, a young one, an unpaid one, or one with no buyer is not", () => {
    const list = [
      txn({ id: "txn_granted", created_at: at(60) }),
      txn({ id: "txn_young", created_at: at(5) }),
      txn({ id: "txn_ready", status: "ready", created_at: at(60) }),
      txn({ id: "txn_nobuyer", custom_data: {}, created_at: at(60) }),
    ];
    expect(strandedPaddleTransactions(list, new Set(["txn_granted"]), nowSec)).toEqual([]);
  });
});

describe("plan rows carry their gateway (migration 0271)", () => {
  const row = {
    id: "intl-pass-6m", label: "Premium Pass", blurb: "b", perks: [], url_key: "intl", amount_paise: 1900,
    currency: "USD", site: "intl", duration_days: 182, scope: "imat", active: true, sort_order: 1,
  };

  it("a Paddle row maps its provider and product", () => {
    expect(rowToPlan({ ...row, payment_provider: "paddle", paddle_product_id: "pro_1" })).toMatchObject({
      paymentProvider: "paddle",
      paddleProductId: "pro_1",
    });
  });

  it("a row without the columns (or an unknown value) is Razorpay", () => {
    expect(rowToPlan(row)).toMatchObject({ paymentProvider: "razorpay", paddleProductId: null });
    expect(rowToPlan({ ...row, payment_provider: "stripe" })).toMatchObject({ paymentProvider: "razorpay" });
  });

  it("the read selects both columns", () => {
    expect(PLAN_COLUMNS).toMatch(/\bpayment_provider\b/);
    expect(PLAN_COLUMNS).toMatch(/\bpaddle_product_id\b/);
  });
});

describe("Paddle environment", () => {
  it("a test_ client token is the sandbox, a live_ one production", () => {
    expect(paddleEnvFromToken("test_abc")).toBe("sandbox");
    expect(paddleEnvFromToken("live_abc")).toBe("production");
    expect(paddleEnvFromToken(undefined)).toBe("production");
  });

  it("the API host follows the environment", () => {
    expect(paddleApiBase("sandbox")).toBe("https://sandbox-api.paddle.com");
    expect(paddleApiBase("production")).toBe("https://api.paddle.com");
  });
});
