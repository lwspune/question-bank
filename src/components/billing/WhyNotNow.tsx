"use client";

import { useState } from "react";
import { sendActivity } from "@/lib/activity/clientBeacon";
import type { DownloadBox, PaywallGate } from "@/lib/activity/clientEvents";
import { DECLINE_REASON_LABELS, reasonsOffered, whyNotNowPrompt, type DeclineReason } from "@/lib/billing/declineReasons";
import { cn } from "@/lib/utils";
import { markWhyHandled } from "./WhyNotNowToast";

/**
 * "Not buying today? Tell us why": one tap under a pass offer (2026-11-05).
 * About 85% of the students an offer meets close it without opening checkout,
 * and nothing said why; the answer goes to /dashboard/sales. Small and below
 * the pay button, so it never competes with it. Signed-in students only (the
 * beacon drops anonymous pings). After a closed checkout it asks "Didn't pay?"
 * and adds "Payment didn't work". Hidden while a checkout is in progress.
 */
export default function WhyNotNow({
  gate,
  box,
  planId,
  busy,
  dismissed,
  className,
}: {
  gate: PaywallGate;
  box?: DownloadBox;
  planId?: string;
  /** A checkout is in progress (from the tap on Pay until Razorpay closes or the payment clears). */
  busy: boolean;
  /** The student opened Razorpay and closed it. */
  dismissed: boolean;
  className?: string;
}) {
  const [answered, setAnswered] = useState<DeclineReason | null>(null);
  const prompt = whyNotNowPrompt({ busy, dismissed });
  const afterCheckout = prompt === "after";

  if (prompt === "hidden") return null;
  if (answered) {
    return (
      <p role="status" className={cn("text-center text-xs text-muted-foreground", className)}>
        Thanks. This helps us decide what to build.
      </p>
    );
  }

  const onTap = (reason: DeclineReason) => {
    setAnswered(reason);
    markWhyHandled(gate, box);
    sendActivity({ kind: "paywall_event", step: "declined", gate, box, planId, reason, afterCheckout });
  };

  const heading = afterCheckout ? "Didn't pay? What stopped you?" : "Not buying today? Tell us why:";

  return (
    <div role="group" aria-label={heading} className={cn("space-y-1.5 font-sans", className)}>
      <p className="text-center text-xs text-muted-foreground">{heading}</p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {reasonsOffered(afterCheckout).map((reason) => (
          <button
            key={reason}
            type="button"
            onClick={() => onTap(reason)}
            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            {DECLINE_REASON_LABELS[reason]}
          </button>
        ))}
      </div>
    </div>
  );
}
