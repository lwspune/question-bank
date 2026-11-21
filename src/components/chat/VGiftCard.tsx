"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Gift, Loader2, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { activatePracticeTrial } from "@/components/reveal/useRevealMeter";
import { useFixPoints } from "@/components/billing/useFixPoints";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { TRIAL_OFFER_BODY, TRIAL_OFFER_TITLE, trialActiveLine } from "@/lib/billing/practiceTrial";
import { vaultPointsLapseLine, vaultPointsLine } from "@/lib/billing/fixPoints";
import { GIFT_OPEN_LABEL, GIFT_TEASER, giftReason, type VGift } from "@/lib/chat/gift";
import { invalidatePulse } from "@/lib/viewer/usePulse";

/**
 * V's gift (owner, 2026-11-21, lib/chat/gift), under V's greeting: a closed
 * box that says only "I have a gift for you", and, once opened, what the
 * student has earned and why. The window decides when it shows and records
 * the opening (lib/chat/giftSeen); this draws it and runs its one button.
 *
 * Nothing new is granted here. The 7-day pass is the answer-limit trial
 * (0273): Activate is the same call as the trial card's, and the server checks
 * again at the tap. The discount is the student's Vault Points (0245), which
 * the order route applies at checkout.
 */
export default function VGiftCard({
  gift,
  opened,
  onOpen,
  onNavigate,
}: {
  gift: VGift;
  opened: boolean;
  onOpen: () => void;
  onNavigate?: () => void;
}) {
  if (!opened) {
    return (
      <section
        aria-label="A gift from V"
        className="ml-9 mt-2 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-3 text-sm shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-sm motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:duration-500">
            <Gift className="h-5 w-5" aria-hidden />
          </span>
          <p className="font-semibold text-foreground">{GIFT_TEASER}</p>
        </div>
        <Button variant="brand" className="mt-3 w-full" onClick={onOpen}>
          {GIFT_OPEN_LABEL}
        </Button>
      </section>
    );
  }
  return gift.kind === "trial" ? <TrialGift gift={gift} /> : <PointsGift gift={gift} onNavigate={onNavigate} />;
}

function Opened({ gift, children }: { gift: VGift; children: React.ReactNode }) {
  return (
    <section
      aria-label="Your gift from V"
      className="ml-9 mt-2 space-y-3 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-3 text-sm shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300"
    >
      <p className="flex items-start gap-2 text-muted-foreground">
        <PartyPopper className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <span>{giftReason(gift)}</span>
      </p>
      {children}
    </section>
  );
}

function TrialGift({ gift }: { gift: VGift }) {
  const [busy, setBusy] = useState(false);
  const [activeUntil, setActiveUntil] = useState<string | null>(null);

  const onActivate = async () => {
    setBusy(true);
    const result = await activatePracticeTrial();
    setBusy(false);
    if (!result.ok) {
      toast.error("Couldn't activate the pass. Please try again.");
      return;
    }
    sendActivityOnce("v_gift:activate:trial", { kind: "surface_viewed", surface: "v_gift", gift: "trial", action: "activate" });
    setActiveUntil(result.expiresAt);
    toast.success(trialActiveLine(result.expiresAt));
    // The pulse now says "a pass", so the gift is not offered again.
    invalidatePulse();
  };

  return (
    <Opened gift={gift}>
      <div className="space-y-1">
        <p className="font-semibold text-foreground">{TRIAL_OFFER_TITLE}</p>
        <p className="text-muted-foreground">{TRIAL_OFFER_BODY}</p>
      </div>
      {activeUntil ? (
        <p role="status" className="flex items-center gap-2 font-medium text-foreground">
          <Check className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
          {trialActiveLine(activeUntil)}
        </p>
      ) : (
        <Button variant="brand" className="w-full" onClick={onActivate} disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {busy ? "Activating…" : "Activate"}
        </Button>
      )}
    </Opened>
  );
}

function PointsGift({ gift, onNavigate }: { gift: Extract<VGift, { kind: "points" }>; onNavigate?: () => void }) {
  // The live points, read when the box opens: more may have come since the pulse.
  const view = useFixPoints();
  const pct = view ? view.pct : gift.milestone;
  const line = vaultPointsLine(view) ?? `${gift.milestone} Vault Points: ${gift.milestone}% off the pass. Points last 30 days.`;
  const lapse = vaultPointsLapseLine(view);
  const href = pricingHref(null, usePathname() ?? undefined);
  return (
    <Opened gift={gift}>
      <p className="text-3xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">{pct}% off</p>
      <p className="text-foreground">{line}</p>
      {lapse && <p className="text-xs text-muted-foreground">{lapse}</p>}
      <Link
        href={href}
        prefetch={false}
        onClick={() => {
          sendActivityOnce("v_gift:pricing:points", { kind: "surface_viewed", surface: "v_gift", gift: "points", action: "pricing" });
          onNavigate?.();
        }}
        className="flex min-h-10 w-full items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        See your price
      </Link>
    </Opened>
  );
}
