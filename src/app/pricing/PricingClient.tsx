"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function PricingClient({ planId }: { planId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  async function onBuy() {
    if (!window.Razorpay || !scriptReady) {
      toast.error("Payment library still loading — try again in a moment.");
      return;
    }
    setBusy(true);
    try {
      const orderRes = await fetch("/api/billing/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
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
        toast.error(order.error || "Could not start checkout");
        setBusy(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount ?? 0,
        currency: order.currency ?? "INR",
        name: "Question Bank",
        description: order.planLabel,
        prefill: order.email ? { email: order.email } : undefined,
        theme: { color: "#4f46e5" },
        handler: async (resp) => {
          const verifyRes = await fetch("/api/billing/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...resp, planId }),
          });
          const verify = (await verifyRes.json()) as { ok?: boolean; error?: string };
          if (verifyRes.ok && verify.ok) {
            toast.success("Payment successful — access unlocked!");
            router.push("/account");
            router.refresh();
          } else {
            toast.error(
              verify.error ||
                "Payment received — access will activate shortly. Check your account."
            );
            router.push("/account");
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.open();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptReady(true)}
        strategy="afterInteractive"
      />
      <Button variant="brand" className="w-full" onClick={onBuy} disabled={busy}>
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
        {busy ? "Opening checkout…" : "Buy premium"}
      </Button>
    </>
  );
}
