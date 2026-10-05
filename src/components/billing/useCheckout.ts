"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { trackFunnel } from "@/lib/analytics/trackFunnel";

/** Minimal shape of the Razorpay Checkout global we use. */
type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  prefill?: { email?: string };
  theme?: { color?: string };
  handler: (resp: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
};
type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type RazorpayInstance = { open: () => void };
declare global {
  interface Window {
    Razorpay?: new (opts: RazorpayOptions) => RazorpayInstance;
  }
}

/** Where a checkout started. The download box buys in place since 2026-10-04. */
export type CheckoutSurface = "download_box" | "pricing";

/** The paywall gate the server logs for each surface (see checkoutGate). */
const GATE: Record<CheckoutSurface, "teacher" | "pricing"> = {
  download_box: "teacher",
  pricing: "pricing",
};

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let scriptLoad: Promise<void> | null = null;

/** Loads Razorpay once per page; a failed load can be retried. */
function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
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

export type CheckoutOutcome = "paid" | "pending";

/**
 * Razorpay checkout, shared by /pricing and the download box. Creates the
 * order (the ORDER is the contract: the server stamps price, scope and length
 * into it), opens Razorpay, verifies, and reports each step as a funnel event
 * so a lost sale can be placed. `onDone` runs once money has been taken:
 * "paid" when access is granted now, "pending" when the webhook will grant it
 * (including a verify that refused or broke after payment).
 */
export function useCheckout({
  planId,
  surface,
  onDone,
}: {
  planId: string;
  surface: CheckoutSurface;
  onDone: (outcome: CheckoutOutcome) => void;
}): { start: () => Promise<void>; busy: boolean } {
  const [busy, setBusy] = useState(false);

  // Warm the script while the buyer reads the offer, so the tap opens fast.
  useEffect(() => {
    loadRazorpay().catch(() => undefined);
  }, []);

  const start = useCallback(async () => {
    setBusy(true);
    const fail = (message: string) => {
      trackFunnel("checkout_failed", { surface });
      toast.error(message);
      setBusy(false);
    };
    // Money was taken but verify refused or broke: the webhook still grants
    // from the order notes, so send the buyer to their account, as before.
    const paidButUnverified = (message?: string) => {
      trackFunnel("checkout_failed", { surface });
      toast.error(message || "Payment received. Access will activate shortly. Check your account.");
      setBusy(false);
      onDone("pending");
    };
    try {
      await loadRazorpay();
      const Razorpay = window.Razorpay;
      if (!Razorpay) return fail("Payment page didn't load. Try again in a moment.");

      const orderRes = await fetch("/api/billing/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, gate: GATE[surface] }),
      });
      const order = (await orderRes.json()) as {
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        planLabel?: string;
        email?: string;
        error?: string;
      };
      if (!orderRes.ok || !order.orderId || !order.keyId) {
        return fail(order.error || "Could not start checkout");
      }

      const rzp = new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount ?? 0,
        currency: order.currency ?? "INR",
        name: "PYQ Vault",
        description: order.planLabel,
        prefill: order.email ? { email: order.email } : undefined,
        theme: { color: "#1d4ed8" },
        handler: async (resp) => {
          try {
            const verifyRes = await fetch("/api/billing/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            const verify = (await verifyRes.json()) as { ok?: boolean; error?: string };
            if (verifyRes.ok && verify.ok) {
              trackFunnel("checkout_paid", { surface });
              toast.success("Payment successful. Access unlocked!");
              setBusy(false);
              onDone("paid");
            } else if (verifyRes.status === 202) {
              // Paid, not yet captured: the order.paid webhook grants it shortly.
              trackFunnel("checkout_paid", { surface });
              toast.info(verify.error || "Payment received. Access will activate shortly.");
              setBusy(false);
              onDone("pending");
            } else {
              paidButUnverified(verify.error);
            }
          } catch {
            paidButUnverified();
          }
        },
        modal: {
          ondismiss: () => {
            setBusy(false);
            trackFunnel("checkout_dismissed", { surface });
            sendActivity({ kind: "paywall_event", step: "checkout_dismissed", gate: GATE[surface], planId });
          },
        },
      });
      trackFunnel("checkout_opened", { surface });
      rzp.open();
    } catch (err) {
      fail(err instanceof Error ? err.message : "Checkout failed");
    }
  }, [planId, surface, onDone]);

  return { start, busy };
}
