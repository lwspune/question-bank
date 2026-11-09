"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout, type CheckoutOutcome } from "@/components/billing/useCheckout";
import AskParent from "@/components/billing/AskParent";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { perMonthLine } from "@/lib/billing/offerCopy";
import type { PassCta } from "@/lib/billing/plans";
import { useDiscountedPass, FixPointsOfferNote } from "@/components/billing/useFixPoints";

/**
 * The Premium Pass under V's hourly-limit line (owner, 2026-11-07, 0226): a
 * signed-in free student who has asked V the hour's questions is offered the
 * pass that lifts the limit. Bought in place, like the daily-answer offer
 * (VPassOffer); counted as gate "v_hourly". A Practice Pass holder never sees
 * it (no upgrade price yet), and neither does a signed-out visitor.
 */
export default function VHourlyOffer({
  pass: offered,
  premiumLimit,
  onPaid,
}: {
  pass: PassCta;
  premiumLimit: number | null;
  /** Access granted: the caller asks the stopped message again. */
  onPaid: () => void;
}) {
  // Fix Points (0245) lower the price shown; the order route charges it.
  const pass = useDiscountedPass(offered);
  const router = useRouter();
  useEffect(() => {
    sendActivityOnce("v_hourly", { kind: "paywall_event", step: "shown", gate: "v_hourly" });
    trackFunnelOnce("v_hourly_limit_hit", "v");
  }, []);
  const onDone = (outcome: CheckoutOutcome) => {
    if (outcome === "paid") onPaid();
    else router.push("/account");
  };
  const { start, busy } = useCheckout({ planId: pass.planId, surface: "v_hourly", onDone });
  const perMonth = perMonthLine(pass);
  const onPay = () => {
    trackFunnelOnce("v_hourly_limit_pass_click", "v");
    void start();
  };

  return (
    <div className="mt-3 space-y-3 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4 font-sans text-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="space-y-1">
        <p className="flex items-center gap-2 font-semibold text-foreground">
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          Ask V without the hourly limit
        </p>
        <p className="text-muted-foreground">
          {premiumLimit
            ? `With ${pass.label}, ask V up to ${premiumLimit} questions an hour for ${pass.length}.`
            : `With ${pass.label}, ask V much more each hour for ${pass.length}.`}{" "}
          It also opens every answer in the bank and PDF downloads.
        </p>
      </div>
      <div className="space-y-1.5">
        <Button variant="brand" className="w-full" onClick={onPay} disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {busy ? "Opening checkout…" : `Get ${pass.label} · ${pass.price}`}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          One-time payment{perMonth ? `, ${perMonth}` : ""}. UPI, card or netbanking.
        </p>
        <FixPointsOfferNote planId={pass.planId} />
        {pass.parentLink && !busy && <AskParent planId={pass.planId} gate="v_hourly" className="pt-1" />}
      </div>
    </div>
  );
}
