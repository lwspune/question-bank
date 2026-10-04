"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { afterPurchasePath } from "@/lib/billing/checkoutReturn";
import { useCheckout, type CheckoutOutcome } from "@/components/billing/useCheckout";

export default function PricingClient({
  planId,
  buttonLabel,
  returnTo,
}: {
  planId: string;
  buttonLabel: string;
  /** Where the buyer was blocked; they go back there once access is granted. */
  returnTo?: string;
}) {
  const router = useRouter();
  const onDone = useCallback(
    (outcome: CheckoutOutcome) => {
      if (outcome === "paid") {
        router.push(afterPurchasePath(returnTo));
        router.refresh();
      } else {
        router.push("/account");
      }
    },
    [router, returnTo]
  );
  const { start, busy } = useCheckout({ planId, surface: "pricing", onDone });

  return (
    <Button variant="brand" className="w-full" onClick={start} disabled={busy}>
      {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
      {busy ? "Opening checkout…" : buttonLabel}
    </Button>
  );
}
