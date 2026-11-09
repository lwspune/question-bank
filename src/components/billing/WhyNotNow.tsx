"use client";

import { useState } from "react";
import { sendActivity } from "@/lib/activity/clientBeacon";
import type { DownloadBox, PaywallGate } from "@/lib/activity/clientEvents";
import { DECLINE_REASON_LABELS, reasonsOffered, whyNotNowPrompt, type DeclineReason } from "@/lib/billing/declineReasons";
import { cn } from "@/lib/utils";
import { markWhyHandled } from "./WhyNotNowToast";
import AskParent from "./AskParent";

/**
 * "Not buying today? Tell us why": one tap under a pass offer (2026-11-05).
 * About 85% of the students an offer meets close it without opening checkout,
 * and nothing said why; the answer goes to /dashboard/sales. Small and below
 * the pay button, so it never competes with it. Signed-in students only (the
 * beacon drops anonymous pings). After a closed checkout it asks "Didn't pay?"
 * and adds "Payment didn't work". Hidden while a checkout is in progress.
 *
 * "Can't pay yourself? Ask a parent to pay" sits above the reasons (2026-11-09)
 * when the pass can be paid through a parent link, and opens by itself when
 * the student answers "Need to ask a parent".
 */
export default function WhyNotNow({
  gate,
  box,
  planId,
  busy,
  dismissed,
  parentLink = false,
  className,
}: {
  gate: PaywallGate;
  box?: DownloadBox;
  planId?: string;
  /** A checkout is in progress (from the tap on Pay until Razorpay closes or the payment clears). */
  busy: boolean;
  /** The student opened Razorpay and closed it. */
  dismissed: boolean;
  /** The pass can be paid by a parent through a link (PassCta `parentLink`). */
  parentLink?: boolean;
  className?: string;
}) {
  const [answered, setAnswered] = useState<DeclineReason | null>(null);
  const prompt = whyNotNowPrompt({ busy, dismissed });
  const afterCheckout = prompt === "after";

  if (prompt === "hidden") return null;
  const askParent =
    parentLink && planId ? (
      <AskParent
        key={answered === "ask_parent" ? "asked" : "offer"}
        planId={planId}
        gate={gate}
        box={box}
        startOpen={answered === "ask_parent"}
      />
    ) : null;
  if (answered) {
    return (
      <div className={cn("space-y-2", className)}>
        {askParent}
        <p role="status" className="text-center text-xs text-muted-foreground">
          Thanks. This helps us decide what to build.
        </p>
      </div>
    );
  }

  const onTap = (reason: DeclineReason) => {
    setAnswered(reason);
    markWhyHandled(gate, box);
    sendActivity({ kind: "paywall_event", step: "declined", gate, box, planId, reason, afterCheckout });
  };

  const heading = afterCheckout ? "Didn't pay? What stopped you?" : "Not buying today? Tell us why:";

  return (
    <div className={cn("space-y-2 font-sans", className)}>
      {askParent}
      <div role="group" aria-label={heading} className="space-y-1.5">
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
    </div>
  );
}
