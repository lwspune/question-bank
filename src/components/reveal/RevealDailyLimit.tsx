"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import { dailyRevealLimit } from "./useRevealMeter";

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

/** In place of an answer after a refused tap. The caller re-keys it per tap. */
export function RevealDailyPrompt({ surface }: { surface: PracticeSurface }) {
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
