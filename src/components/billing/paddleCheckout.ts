"use client";

/**
 * Paddle.js in the browser (0271): loaded on demand, only when a checkout is
 * a Paddle one, so no www page ever fetches it. Paddle.Initialize may run
 * once per page, so it is called once with a dispatcher, and each checkout
 * sets the listener the dispatcher forwards to.
 */

/** The Paddle checkout events we act on. */
export type PaddleCheckoutEvent = {
  name?: string;
  data?: { transaction_id?: string } | null;
};

type PaddleGlobal = {
  Environment: { set: (env: "sandbox" | "production") => void };
  Initialize: (opts: { token: string; eventCallback: (e: PaddleCheckoutEvent) => void }) => void;
  Checkout: {
    open: (opts: {
      transactionId: string;
      customer?: { email: string };
      settings?: { displayMode?: "overlay"; theme?: "light" | "dark"; locale?: string; showAddDiscounts?: boolean };
    }) => void;
    close: () => void;
  };
};

declare global {
  interface Window {
    Paddle?: PaddleGlobal;
  }
}

const SCRIPT_SRC = "https://cdn.paddle.com/paddle/v2/paddle.js";
let scriptLoad: Promise<void> | null = null;
let initialisedWith: string | null = null;
let listener: ((e: PaddleCheckoutEvent) => void) | null = null;

/** Loads Paddle.js once per page; a failed load can be retried. */
export function loadPaddle(): Promise<void> {
  if (window.Paddle) return Promise.resolve();
  if (scriptLoad) return scriptLoad;
  scriptLoad = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = SCRIPT_SRC;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => {
      scriptLoad = null;
      el.remove();
      reject(new Error("Payment page didn't load. Check your connection and try again."));
    };
    document.head.appendChild(el);
  });
  return scriptLoad;
}

/**
 * Initialises Paddle once with `token` (test_ = sandbox). With `?_ptxn=` in
 * the address (a Paddle payment link lands on /pricing), Paddle opens that
 * transaction's checkout by itself during this call.
 */
export async function initPaddle(token: string, onEvent: (e: PaddleCheckoutEvent) => void): Promise<PaddleGlobal> {
  await loadPaddle();
  const paddle = window.Paddle;
  if (!paddle) throw new Error("Payment page didn't load. Try again in a moment.");
  listener = onEvent;
  if (initialisedWith !== token) {
    paddle.Environment.set(token.startsWith("test_") ? "sandbox" : "production");
    paddle.Initialize({ token, eventCallback: (e) => listener?.(e) });
    initialisedWith = token;
  }
  return paddle;
}

export async function openPaddleCheckout(opts: {
  token: string;
  transactionId: string;
  email?: string;
  onEvent: (e: PaddleCheckoutEvent) => void;
}): Promise<void> {
  const paddle = await initPaddle(opts.token, opts.onEvent);
  paddle.Checkout.open({
    transactionId: opts.transactionId,
    ...(opts.email ? { customer: { email: opts.email } } : {}),
    settings: { displayMode: "overlay", theme: "light", locale: "en", showAddDiscounts: false },
  });
}

export function closePaddleCheckout(): void {
  window.Paddle?.Checkout.close();
}

export type PaddleVerifyResult = "paid" | "pending" | "failed";

/**
 * Asks our server to grant the pass for a completed transaction. Paddle's
 * "completed" event can arrive a moment before the money is recorded, so a
 * 202 is asked again a few times; the webhook grants it in any case.
 */
export async function verifyPaddleTransaction(
  transactionId: string,
  { tries = 5, waitMs = 2000 }: { tries?: number; waitMs?: number } = {}
): Promise<{ result: PaddleVerifyResult; error?: string }> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch("/api/billing/paddle/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) return { result: "paid" };
      if (res.status !== 202) return { result: res.status === 502 ? "pending" : "failed", error: body.error };
    } catch {
      return { result: "pending" };
    }
    await new Promise((r) => setTimeout(r, waitMs));
  }
  return { result: "pending" };
}
