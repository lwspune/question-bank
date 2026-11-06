"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { sendActivity } from "@/lib/activity/clientBeacon";
import type { DownloadBox, PaywallGate } from "@/lib/activity/clientEvents";
import {
  DECLINE_REASON_LABELS,
  reasonsOffered,
  shouldAskOnClose,
  whyAskedKey,
  type DeclineReason,
} from "@/lib/billing/declineReasons";
import { istDate } from "@/lib/sales/summary";

/**
 * Asking "why not today?" once more, as a toast, when a pass offer closes
 * without a sale (2026-11-06). The question in the box stays; this reaches the
 * students who close the box without answering it (8 in 9 on 5 Nov). The toast
 * never holds the exit: the offer has already closed, and it goes by itself.
 */

const TOAST_MS = 10_000;

// "Handled today" for one offer: answered in the box, or asked on close. In
// browser storage, which can throw or come back empty (private window), so a
// copy lives in memory for this page too.
const handledHere = new Set<string>();

function keyFor(gate: PaywallGate, box: DownloadBox | undefined): string {
  return whyAskedKey(gate, box, istDate(new Date()));
}

export function markWhyHandled(gate: PaywallGate, box?: DownloadBox): void {
  const key = keyFor(gate, box);
  handledHere.add(key);
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    /* storage blocked: the in-memory copy still holds for this page */
  }
}

function wasWhyHandled(gate: PaywallGate, box?: DownloadBox): boolean {
  const key = keyFor(gate, box);
  if (handledHere.has(key)) return true;
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function WhyToast({
  toastId,
  gate,
  box,
  planId,
}: {
  toastId: string | number;
  gate: PaywallGate;
  box?: DownloadBox;
  planId?: string;
}) {
  const heading = "Quick question: why not today?";
  const onTap = (reason: DeclineReason) => {
    sendActivity({ kind: "paywall_event", step: "declined", gate, box, planId, reason, afterCheckout: false, onClose: true });
    toast.dismiss(toastId);
    toast("Thanks. This helps us decide what to build.");
  };

  return (
    <div
      role="group"
      aria-label={heading}
      className="w-[min(92vw,22rem)] space-y-2 rounded-lg border border-border bg-card p-3 font-sans text-card-foreground shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium">{heading}</p>
        <button
          type="button"
          onClick={() => toast.dismiss(toastId)}
          aria-label="Close"
          className="rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {reasonsOffered(false).map((reason) => (
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

/**
 * For a pass offer: when it leaves the screen without a sale, ask once in a
 * toast (shouldAskOnClose has the rules). `bought` is the offer's own flag,
 * set when its checkout ends in a payment.
 */
export function useAskWhyOnClose({
  gate,
  box,
  planId,
  isSignedIn,
  busy,
  dismissed,
  bought,
}: {
  gate: PaywallGate;
  box?: DownloadBox;
  planId?: string;
  isSignedIn: boolean;
  busy: boolean;
  dismissed: boolean;
  bought: MutableRefObject<boolean>;
}): void {
  // The latest values, read once when the offer goes away.
  const latest = useRef({ gate, box, planId, isSignedIn, busy, dismissed, bought });
  useEffect(() => {
    latest.current = { gate, box, planId, isSignedIn, busy, dismissed, bought };
  });
  const [shownAt] = useState(() => Date.now());

  useEffect(() => {
    return () => {
      const s = latest.current;
      const ask = shouldAskOnClose({
        signedIn: s.isSignedIn,
        bought: s.bought.current,
        busy: s.busy,
        dismissed: s.dismissed,
        handledToday: wasWhyHandled(s.gate, s.box),
        // A remount in development (Strict Mode) lands here at once and is skipped.
        shownMs: Date.now() - shownAt,
      });
      if (!ask) return;
      markWhyHandled(s.gate, s.box);
      toast.custom((id) => <WhyToast toastId={id} gate={s.gate} box={s.box} planId={s.planId} />, {
        duration: TOAST_MS,
      });
    };
  }, [shownAt]);
}
