/**
 * Paddle (2026-11-17): the gateway for plans whose payment_provider is
 * 'paddle' (migration 0271), today the intl site's USD passes. Paddle is the
 * Merchant of Record, so the buyer's sales tax (EU VAT, UK VAT, US sales tax)
 * is Paddle's to collect. Plain HTTP via fetch, no SDK, like razorpay.ts.
 *
 * THE ORDER IS STILL THE CONTRACT. /api/billing/order creates the transaction
 * with the same notes a Razorpay order carries (stampOrderNotes) as its
 * custom_data, and every grant path (the browser, the webhook, the payment
 * check) reads the terms back from the transaction Paddle holds through
 * planForPaidOrder, the rule Razorpay grants by.
 *
 * ONE THING RAZORPAY NEVER NEEDED. Paddle.js can open a checkout from the
 * browser with custom_data of its own choosing, so notes alone prove nothing.
 * A grant also requires the two marks only our server can make: origin 'api'
 * (creating one needs the secret API key) and a one-off 'custom' price (a
 * browser can only use catalogue prices). Without that check a buyer could
 * pay for the IMAT pass and write themselves a lifetime pass of any scope.
 *
 * Env: PADDLE_API_KEY (server), NEXT_PUBLIC_PADDLE_CLIENT_TOKEN (browser;
 * test_ = sandbox, live_ = production), PADDLE_WEBHOOK_SECRET (webhook).
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaidOrder, Plan } from "./plans";
import { decidePaidOrder, RECONCILE_GRACE_SECONDS } from "./reconcile";
import type { WebhookDecision } from "./webhook";
import { isEbookOrder } from "@/lib/ebooks/order";

export type PaymentProvider = "razorpay" | "paddle";
export type PaddleEnv = "sandbox" | "production";

/** test_ tokens belong to the sandbox; anything else is production. */
export function paddleEnvFromToken(token: string | undefined): PaddleEnv {
  return token?.startsWith("test_") ? "sandbox" : "production";
}

export function paddleApiBase(env: PaddleEnv): string {
  return env === "sandbox" ? "https://sandbox-api.paddle.com" : "https://api.paddle.com";
}

/** The environment the server talks to: the client token's, so the two can never disagree. */
function serverEnv(): PaddleEnv {
  return paddleEnvFromToken(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN);
}

/** True when a Paddle plan can be sold: the server key and the browser token are both set. */
export function isPaddleConfigured(): boolean {
  return !!process.env.PADDLE_API_KEY && !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
}

/** Paddle ids are `txn_` plus lowercase letters and digits; anything else never reaches the API. */
export const TRANSACTION_ID_RE = /^txn_[a-z0-9]{10,60}$/;

// ────────────────────────────────────────────────────────────────────
// Webhook signature
// ────────────────────────────────────────────────────────────────────

/** A signature older than this is refused: a replayed delivery, not a fresh one. */
export const SIGNATURE_TOLERANCE_SEC = 300;

/**
 * Paddle-Signature: `ts=<unix seconds>;h1=<hex>`, where h1 is
 * HMAC-SHA256(secret, `${ts}:${rawBody}`). While Paddle rotates a secret the
 * header carries one h1 per secret, and any match is enough.
 */
export function verifyPaddleSignature(
  rawBody: string,
  header: string,
  secret: string,
  nowSec: number,
  toleranceSec: number = SIGNATURE_TOLERANCE_SEC
): boolean {
  if (!header || !secret) return false;
  let ts: number | null = null;
  const signatures: string[] = [];
  for (const part of header.split(";")) {
    const [key, value] = part.split("=", 2).map((s) => s?.trim());
    if (key === "ts" && value && /^\d+$/.test(value)) ts = Number(value);
    else if (key === "h1" && value) signatures.push(value);
  }
  if (ts === null || signatures.length === 0) return false;
  if (Math.abs(nowSec - ts) > toleranceSec) return false;
  const expected = createHmac("sha256", secret).update(`${ts}:${rawBody}`).digest("hex");
  return signatures.some((s) => safeEqualHex(expected, s));
}

function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length || !/^[0-9a-f]+$/i.test(b)) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

// ────────────────────────────────────────────────────────────────────
// A transaction as the order contract
// ────────────────────────────────────────────────────────────────────

/** The fields of a Paddle transaction the grant reads. */
export type PaddleTransaction = {
  id: string;
  status: string;
  /** 'api' when our server created it; 'web' when Paddle.js did. */
  origin?: string | null;
  currency_code: string;
  created_at: string;
  custom_data?: Record<string, unknown> | null;
  items: {
    quantity: number;
    price: {
      id?: string;
      /** 'custom' = a one-off price sent with the transaction; 'standard' = from the catalogue. */
      type?: string;
      product_id?: string;
      unit_price: { amount: string; currency_code: string };
    };
  }[];
};

/** Paddle's statuses once the money is taken ('paid' comes first, then 'completed'). */
const PAID_STATUSES = new Set(["paid", "completed"]);

/**
 * The transaction as the PaidOrder planForPaidOrder grants from: paid once
 * Paddle has the money, the one item's price as the amount paid, and the
 * string custom_data as the notes. Anything but exactly one item of quantity
 * one, priced in the transaction's currency, leaves no amount, so it can
 * never match the notes.
 */
export function paidOrderFromTransaction(txn: PaddleTransaction): PaidOrder {
  const notes: Record<string, string> = {};
  for (const [k, v] of Object.entries(txn.custom_data ?? {})) if (typeof v === "string") notes[k] = v;
  const item = txn.items?.length === 1 ? txn.items[0] : null;
  const amount =
    item && item.quantity === 1 && item.price?.unit_price?.currency_code === txn.currency_code
      ? Number(item.price.unit_price.amount)
      : undefined;
  return {
    status: PAID_STATUSES.has(txn.status) ? "paid" : txn.status,
    ...(amount !== undefined && Number.isFinite(amount) ? { amount_paid: amount } : {}),
    currency: txn.currency_code,
    notes,
  };
}

/**
 * What a Paddle transaction grants: Razorpay's own rule (decidePaidOrder,
 * the webhook's) after the two marks only our server can make. A grant is
 * marked as Paddle's so the pass row records the gateway.
 */
export function decidePaddleTransaction(txn: PaddleTransaction): WebhookDecision {
  if (txn.origin !== "api") return { action: "skip", reason: "transaction not created by our server" };
  if (!txn.items?.every((i) => i.price?.type === "custom")) {
    return { action: "skip", reason: "transaction not priced by our server" };
  }
  const order = paidOrderFromTransaction(txn);
  if (isEbookOrder(order.notes)) return { action: "skip", reason: "ebooks are not sold through Paddle" };
  const decision = decidePaidOrder(order, txn.id);
  return decision.action === "grant" ? { ...decision, provider: "paddle" } : decision;
}

/**
 * The payment check's Paddle half: paid transactions naming a buyer that no
 * pass row carries, older than the grace period (left to the webhook and the
 * browser, which normally grant within seconds). Razorpay's twin is
 * strandedPayments in reconcile.ts.
 */
export function strandedPaddleTransactions(
  transactions: readonly PaddleTransaction[],
  grantedRefs: ReadonlySet<string>,
  nowSec: number,
  graceSec: number = RECONCILE_GRACE_SECONDS
): PaddleTransaction[] {
  return transactions.filter(
    (t) =>
      PAID_STATUSES.has(t.status) &&
      typeof t.custom_data?.userId === "string" &&
      !grantedRefs.has(t.id) &&
      nowSec - Date.parse(t.created_at) / 1000 >= graceSec
  );
}

// ────────────────────────────────────────────────────────────────────
// Webhook events
// ────────────────────────────────────────────────────────────────────

export type PaddleEvent = { event_type?: string; data?: unknown };

type Adjustment = { action?: string; type?: string; status?: string; transaction_id?: string };

/**
 * transaction.paid / transaction.completed grant. An approved FULL refund or
 * a chargeback revokes the pass that transaction bought, as Razorpay's full
 * refund does (the refund policy: the pass ends when the refund is made). A
 * partial refund is a discount and leaves the pass alone.
 */
export function decidePaddleEvent(body: PaddleEvent): WebhookDecision {
  const type = body.event_type;
  if (type === "transaction.paid" || type === "transaction.completed") {
    const txn = body.data as PaddleTransaction | undefined;
    if (!txn?.id) return { action: "skip", reason: "no transaction" };
    return decidePaddleTransaction(txn);
  }
  if (type === "adjustment.created" || type === "adjustment.updated") {
    const adj = (body.data ?? {}) as Adjustment;
    if (adj.action !== "refund" && adj.action !== "chargeback") return { action: "skip", reason: `adjustment ${adj.action}` };
    if (adj.status !== "approved") return { action: "skip", reason: `adjustment ${adj.status}` };
    if (adj.type !== "full") return { action: "skip", reason: "partial refund" };
    if (!adj.transaction_id) return { action: "skip", reason: "no transaction id" };
    return { action: "revoke", paymentId: adj.transaction_id };
  }
  return { action: "ignore", event: type };
}

// ────────────────────────────────────────────────────────────────────
// The API
// ────────────────────────────────────────────────────────────────────

export type TransactionBody = {
  currency_code: string;
  custom_data: Record<string, string>;
  items: {
    quantity: 1;
    price: {
      product_id: string;
      name: string;
      description: string;
      unit_price: { amount: string; currency_code: string };
      tax_mode: "location";
      quantity: { minimum: 1; maximum: 1 };
    };
  }[];
};

/**
 * The transaction /api/billing/order creates: the plan's Paddle product at
 * the price the NOTES carry (the order is the contract), charged in the
 * plan's currency so the buyer pays what the pricing page shows. tax_mode
 * 'location' is Paddle's default: tax inside the price where that is the
 * custom (EU, UK), added on top where it is not (US).
 */
export function transactionBody(plan: Plan, notes: Record<string, string>): TransactionBody {
  if (!plan.paddleProductId) throw new Error(`plan ${plan.id} has no Paddle product`);
  return {
    currency_code: plan.currency,
    custom_data: notes,
    items: [
      {
        quantity: 1,
        price: {
          product_id: plan.paddleProductId,
          name: plan.label,
          description: plan.id,
          unit_price: { amount: notes.amountPaise, currency_code: plan.currency },
          tax_mode: "location",
          quantity: { minimum: 1, maximum: 1 },
        },
      },
    ],
  };
}

async function paddleFetch(path: string, init: RequestInit = {}): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  const key = process.env.PADDLE_API_KEY;
  if (!key) return { ok: false, error: "PADDLE_API_KEY not set" };
  try {
    const res = await fetch(`${paddleApiBase(serverEnv())}${path}`, {
      ...init,
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
      cache: "no-store",
    });
    const body = (await res.json().catch(() => null)) as { data?: unknown; error?: { code?: string; detail?: string } } | null;
    if (!res.ok) return { ok: false, error: `${res.status} ${body?.error?.code ?? ""} ${body?.error?.detail ?? ""}`.trim() };
    return { ok: true, data: body?.data ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function createPaddleTransaction(
  body: TransactionBody
): Promise<{ ok: true; transactionId: string } | { ok: false; error: string }> {
  const r = await paddleFetch("/transactions", { method: "POST", body: JSON.stringify(body) });
  if (!r.ok) return r;
  const id = (r.data as { id?: string } | null)?.id;
  return id ? { ok: true, transactionId: id } : { ok: false, error: "no transaction id in response" };
}

export async function fetchPaddleTransaction(
  id: string
): Promise<{ ok: true; transaction: PaddleTransaction } | { ok: false; error: string }> {
  if (!TRANSACTION_ID_RE.test(id)) return { ok: false, error: "malformed transaction id" };
  const r = await paddleFetch(`/transactions/${id}`);
  if (!r.ok) return r;
  return r.data ? { ok: true, transaction: r.data as PaddleTransaction } : { ok: false, error: "empty response" };
}

/**
 * Paid transactions created since `sinceIso`, newest first, for the payment
 * check. Follows Paddle's cursor pages (50 a page) up to `maxPages`.
 */
export async function listPaidPaddleTransactions(
  sinceIso: string,
  maxPages = 20
): Promise<{ ok: true; transactions: PaddleTransaction[] } | { ok: false; error: string }> {
  const out: PaddleTransaction[] = [];
  let path: string | null =
    `/transactions?status=paid,completed&created_at[GTE]=${encodeURIComponent(sinceIso)}&per_page=50&order_by=created_at[DESC]`;
  for (let page = 0; path && page < maxPages; page++) {
    const key = process.env.PADDLE_API_KEY;
    if (!key) return { ok: false, error: "PADDLE_API_KEY not set" };
    try {
      const res: Response = await fetch(`${paddleApiBase(serverEnv())}${path}`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      const body = (await res.json().catch(() => null)) as {
        data?: PaddleTransaction[];
        meta?: { pagination?: { next?: string; has_more?: boolean } };
      } | null;
      if (!res.ok) return { ok: false, error: `${res.status}` };
      out.push(...(body?.data ?? []));
      const next = body?.meta?.pagination?.has_more ? body.meta.pagination.next : null;
      path = next ? next.replace(/^https:\/\/[^/]+/, "") : null;
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  }
  return { ok: true, transactions: out };
}
