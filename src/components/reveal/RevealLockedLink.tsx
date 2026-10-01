"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import { useSignInHref } from "./useSignInHref";

/**
 * Stands where a reveal button would be once an anon viewer's free reveals are
 * spent, so the wall is visible BEFORE a tap rather than discovered by a tap
 * that does nothing (Clarity dead + rage clicks, 2026-10-01).
 *
 * Mounting it counts as meeting the wall: the visitor no longer taps a button
 * and gets refused, so `reveal_wall_hit` would otherwise go quiet while
 * `reveal_wall_signin_click` kept counting, and the conversion rate would lose
 * its denominator. Both are once per session, as before.
 */
export default function RevealLockedLink({
  surface,
  examName,
}: {
  surface: PracticeSurface;
  examName: string;
}) {
  const href = useSignInHref();

  useEffect(() => {
    trackFunnelOnce("reveal_wall_hit", surface, { surface, exam: examName });
  }, [surface, examName]);

  return (
    <Link
      href={href}
      onClick={() => trackFunnelOnce("reveal_wall_signin_click", surface, { surface })}
      className="inline-flex items-center gap-1 rounded-sm font-sans text-xs font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Lock className="h-3.5 w-3.5" aria-hidden />
      Sign in to see the answer
    </Link>
  );
}
