"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Check, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout, type CheckoutOutcome } from "@/components/billing/useCheckout";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import { otherBenefits, perMonthLine } from "@/lib/billing/offerCopy";
import type { PassCta } from "@/lib/billing/plans";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import { dailyRevealLimit, dailyRevealPass } from "./useRevealMeter";

/**
 * The signed-in daily wall (migration 0134, 2026-10-05): a free student has
 * opened today's free answers. The signed-out wall's two shapes, for a student
 * who is already signed in: a link where the reveal button would be, and a
 * prompt after a refused tap. Both say what comes back free (tomorrow) before
 * offering the pass, and both count as meeting the wall once per page session.
 */

function useDailyWallSeen(surface: PracticeSurface): void {
  useEffect(() => {
    sendActivityOnce("reveals", { kind: "paywall_event", step: "shown", gate: "reveals" });
    trackFunnelOnce("reveal_daily_limit_hit", surface, { surface });
  }, [surface]);
}

function usePassHref(): string {
  return pricingHref(null, usePathname() ?? undefined);
}

/** Stands where a reveal button would be, before any tap. */
export function RevealDailyLink({ surface }: { surface: PracticeSurface }) {
  useDailyWallSeen(surface);
  const href = usePassHref();
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={() => trackFunnelOnce("reveal_daily_limit_pass_click", surface, { surface })}
      className="inline-flex items-center gap-1 rounded-sm font-sans text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Lock className="h-3.5 w-3.5" aria-hidden />
      Today&apos;s free answers are used
    </Link>
  );
}

/**
 * In place of an answer after a refused tap. The caller re-keys it per tap.
 * Sells the pass IN PLACE (2026-10-25): on 25 Oct this wall was 16 of the 32
 * pass offers shown, and its only action was a "Get pass" link to /pricing,
 * half hidden behind the V bubble on a phone. With no pass on sale (or the
 * plans read failed) it keeps that link.
 */
export function RevealDailyPrompt({ surface }: { surface: PracticeSurface }) {
  const pass = dailyRevealPass();
  return pass ? <RevealDailyOffer surface={surface} pass={pass} /> : <RevealDailyLinkPrompt surface={surface} />;
}

function RevealDailyOffer({ surface, pass }: { surface: PracticeSurface; pass: PassCta }) {
  useDailyWallSeen(surface);
  const router = useRouter();
  const limit = dailyRevealLimit();
  const [showOthers, setShowOthers] = useState(false);
  const others = otherBenefits(pass.perks);
  const perMonth = perMonthLine(pass);
  const onDone = useCallback(
    (outcome: CheckoutOutcome) => {
      // The quota is read once per page load, so a reload is what lifts the wall.
      if (outcome === "paid") window.location.reload();
      else router.push("/account");
    },
    [router]
  );
  const { start, busy } = useCheckout({ planId: pass.planId, surface: "reveal_wall", onDone });
  const onPay = () => {
    trackFunnelOnce("reveal_daily_limit_pass_click", surface, { surface });
    void start();
  };

  return (
    <div className="mt-3 space-y-3 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-4 font-sans text-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="space-y-1">
        <p className="flex items-center gap-2 font-semibold text-foreground">
          <Lock className="h-4 w-4 shrink-0" aria-hidden />
          That&apos;s today&apos;s {limit ?? ""} free answers
        </p>
        <p className="text-muted-foreground">
          See this answer now, with its full solution. {pass.label} opens every answer for {pass.length}.
        </p>
        {others.length > 0 && (
          <button
            type="button"
            onClick={() => setShowOthers((v) => !v)}
            aria-expanded={showOthers}
            className="rounded-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showOthers ? `Hide other ${pass.label} benefits` : `+ other ${pass.label} benefits`}
          </button>
        )}
        {showOthers && (
          <ul className="space-y-1.5 pt-1">
            {others.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="space-y-1.5">
        <Button variant="brand" className="w-full" onClick={onPay} disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {busy ? "Opening checkout…" : `Unlock all answers · ${pass.price}`}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          One-time payment{perMonth ? `, ${perMonth}` : ""}. UPI, card or netbanking.
        </p>
      </div>
      <p className="border-t border-brand-accent/20 pt-3 text-center text-xs text-muted-foreground">
        Not now? {limit ? `${limit} more free answers` : "More free answers"} tomorrow.
      </p>
    </div>
  );
}

/** The wall before 2026-10-25, for when no pass is on sale: a link to /pricing. */
function RevealDailyLinkPrompt({ surface }: { surface: PracticeSurface }) {
  useDailyWallSeen(surface);
  const href = usePassHref();
  const limit = dailyRevealLimit();
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-sm animate-in fade-in zoom-in-95 duration-300">
      <Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
      <span className="text-muted-foreground">
        You&apos;ve opened today&apos;s {limit ?? ""} free answers. More tomorrow, or unlimited with Premium Pass.
      </span>
      <Link
        href={href}
        prefetch={false}
        onClick={() => trackFunnelOnce("reveal_daily_limit_pass_click", surface, { surface })}
        className="ml-auto inline-flex items-center gap-1 rounded-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Get pass
      </Link>
    </div>
  );
}
