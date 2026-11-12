"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { istDayKey } from "@/lib/email/dueNudge";
import type { PassCta } from "@/lib/billing/plans";
import {
  LEFT_CHECKOUT_GATE,
  LEFT_CHECKOUT_STORAGE_KEY,
  leftCheckoutCopy,
  parseBarRecord,
  showLeftCheckoutBar,
} from "@/lib/billing/leftCheckout";
import { useCheckout, type CheckoutOutcome } from "./useCheckout";
import { useDiscountedPass } from "./useFixPoints";
import AskParent from "./AskParent";

/**
 * "Your checkout didn't complete" (2026-11-12, owner): under the header, on
 * the first page a student opens on a day after they left a pass checkout, on
 * up to 2 such days, until they pay or tap Not now. The pulse says whether
 * there is a checkout to come back to (lib/billing/leftCheckout); this decides
 * the first page of the day in the browser, so cached pages stay cached.
 */
export default function CheckoutReturnBar({ pass }: { pass: PassCta | null }) {
  const path = usePathname();
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  // Decided after mount: it reads browser storage, which the server never sees.
  useEffect(() => {
    if (!pass || closed || !path) {
      setVisible(false);
      return;
    }
    const today = istDayKey(new Date());
    let record = null;
    try {
      record = parseBarRecord(localStorage.getItem(LEFT_CHECKOUT_STORAGE_KEY));
    } catch {
      /* storage blocked: treat as the first page */
    }
    const show = showLeftCheckoutBar(record, today, path);
    if (show && record?.day !== today) {
      try {
        localStorage.setItem(LEFT_CHECKOUT_STORAGE_KEY, JSON.stringify({ day: today, path }));
      } catch {
        /* ignore */
      }
    }
    setVisible(show);
    // Deduped per student per day on the server: what counts the bar's days.
    if (show) sendActivity({ kind: "paywall_event", step: "shown", gate: LEFT_CHECKOUT_GATE, planId: pass.planId });
  }, [pass, path, closed]);

  if (!pass || !visible || closed) return null;
  return <Bar pass={pass} onClose={() => setClosed(true)} />;
}

function Bar({ pass: offered, onClose }: { pass: PassCta; onClose: () => void }) {
  // Vault Points and an upgrade lower the price shown; the order route charges it.
  const pass = useDiscountedPass(offered);
  const router = useRouter();
  const copy = leftCheckoutCopy(pass);
  const onDone = useCallback(
    (outcome: CheckoutOutcome) => {
      onClose();
      // A reload lifts every limit on the page; a payment the webhook will
      // finish goes to the account page, as on every other offer.
      if (outcome === "paid") window.location.reload();
      else router.push("/account");
    },
    [onClose, router]
  );
  const { start, busy } = useCheckout({ planId: pass.planId, surface: "checkout_return", onDone });
  const notNow = () => {
    sendActivity({ kind: "paywall_event", step: "dismissed", gate: LEFT_CHECKOUT_GATE, planId: pass.planId });
    onClose();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-3 sm:px-6">
      <section
        aria-label="Your checkout didn't complete"
        className="rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4 font-sans text-sm animate-in fade-in duration-300 sm:flex sm:items-center sm:gap-6"
      >
        <div className="space-y-1 sm:flex-1">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <CreditCard className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
            {copy.title}
          </p>
          <p className="text-muted-foreground">{copy.body}</p>
        </div>
        <div className="mt-3 space-y-2 sm:mt-0 sm:w-64 sm:shrink-0">
          <Button variant="brand" className="w-full" onClick={() => void start()} disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {busy ? "Opening checkout…" : `Complete payment · ${pass.price}`}
          </Button>
          {pass.parentLink && <AskParent planId={pass.planId} gate="return" />}
          <p className="text-center">
            <button
              type="button"
              onClick={notNow}
              className="rounded-sm text-xs text-muted-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Not now
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
