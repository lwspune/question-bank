"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { loadRazorpay } from "@/components/billing/useCheckout";
import { trackFunnel } from "@/lib/analytics/trackFunnel";

/**
 * The parent's Pay button (2026-11-09). Same Razorpay checkout as a student's,
 * but through the parent routes: no sign-in, the order is stamped for the
 * student the link names, and the grant goes to that student.
 *
 * No activity beacons from here: the payer has no account. The server records
 * the checkout under the student's id (parent-order), and the payment is the
 * pass itself.
 */
export default function ParentPayButton({
  code,
  price,
  studentName,
}: {
  code: string;
  price: string;
  studentName: string | null;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<"paid" | "pending" | null>(null);
  const who = studentName ?? "The student";

  // Warm the script while the parent reads the page, so the tap opens fast.
  useEffect(() => {
    loadRazorpay().catch(() => undefined);
  }, []);

  async function pay() {
    setBusy(true);
    const props = { surface: "parent_link" };
    const fail = (message: string) => {
      trackFunnel("checkout_failed", props);
      toast.error(message);
      setBusy(false);
    };
    try {
      await loadRazorpay();
      const Razorpay = window.Razorpay;
      if (!Razorpay) return fail("The payment page didn't load. Try again in a moment.");

      const res = await fetch("/api/billing/parent-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const order = (await res.json()) as {
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        planLabel?: string;
        error?: string;
        state?: string;
      };
      if (res.status === 409) {
        // The link stopped being payable while the page was open (paid, expired): show the page as it is now.
        toast.info(order.state === "already_active" ? `${who} already has this pass.` : "This link can't be paid any more.");
        window.location.reload();
        return;
      }
      if (!res.ok || !order.orderId || !order.keyId) return fail(order.error || "Could not start the payment.");

      const rzp = new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount ?? 0,
        currency: order.currency ?? "INR",
        name: "PYQ Vault",
        description: order.planLabel,
        theme: { color: "#1d4ed8" },
        handler: async (resp) => {
          try {
            const v = await fetch("/api/billing/parent-verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code, ...resp }),
            });
            trackFunnel("checkout_paid", props);
            // Money was taken either way; a 202 or a failed check is granted by the webhook shortly.
            setDone(v.ok ? "paid" : "pending");
          } catch {
            trackFunnel("checkout_paid", props);
            setDone("pending");
          }
          setBusy(false);
        },
        modal: {
          ondismiss: () => {
            setBusy(false);
            trackFunnel("checkout_dismissed", props);
          },
        },
      });
      trackFunnel("checkout_opened", props);
      rzp.open();
    } catch (err) {
      fail(err instanceof Error ? err.message : "The payment failed to start.");
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-lg border border-brand/30 bg-brand/5 p-4 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-brand-accent" aria-hidden="true" />
        <p className="mt-2 font-semibold">Thank you. Payment received.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {done === "paid"
            ? `${who}'s pass is active now. We've emailed ${studentName ?? "them"} too.`
            : `${who}'s pass will be active in a few minutes. Nothing more to do.`}
        </p>
      </div>
    );
  }

  return (
    <Button className="w-full" size="lg" onClick={pay} disabled={busy} aria-busy={busy}>
      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      Pay {price}
    </Button>
  );
}
