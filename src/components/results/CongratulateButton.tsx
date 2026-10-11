"use client";

import { useEffect, useState } from "react";
import { Check, PartyPopper } from "lucide-react";
import { celebrate } from "@/components/celebrate/celebrate";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import {
  CONGRATS_STORAGE_KEY,
  congratsMessage,
  hasCongratulated,
  rememberCongratulated,
} from "@/lib/results/congratulate";
import { burstConfetti } from "./confettiBurst";

type Props = {
  /** congratsKey(group). */
  resultKey: string;
  count: number;
  examSlug: string;
  stage: string;
};

function readStore(): string | null {
  try {
    return window.localStorage.getItem(CONGRATS_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Confetti and a well done from V for the students on a results strip
 * (2026-10-11, lib/results/congratulate). One tap per result per browser; the
 * browser remembers it, and nothing is sent anywhere but the funnel count.
 */
export default function CongratulateButton({ resultKey, count, examSlug, stage }: Props) {
  const [done, setDone] = useState(false);

  // Read after mount: the page is cached and the server never sees storage.
  useEffect(() => {
    setDone(hasCongratulated(readStore(), resultKey));
  }, [resultKey]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!reduced) {
      const r = e.currentTarget.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + r.height / 2);
    }
    celebrate(congratsMessage(count));
    trackFunnel("results_congratulate_click", { exam: examSlug, stage });
    try {
      window.localStorage.setItem(CONGRATS_STORAGE_KEY, rememberCongratulated(readStore(), resultKey));
    } catch {
      /* private window or blocked storage: the button simply forgets */
    }
    setDone(true);
  };

  if (done) {
    return (
      <span className="inline-flex h-8 items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <Check className="h-3.5 w-3.5" aria-hidden />
        Congratulated
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-brand-accent/40 bg-brand/5 px-3 text-sm font-medium text-brand-accent transition-colors hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <PartyPopper className="h-4 w-4" aria-hidden />
      Congratulate
    </button>
  );
}
