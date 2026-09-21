"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CheckCircle2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  summarizeOwnAttempts,
  attemptBadge,
  type MockAttemptSummary,
} from "@/lib/mocks/attempted";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { fetchOwnAttempts } from "./ownAttemptsClient";

/**
 * The client half of the "have I sat this?" marker on a mock card.
 *
 * WHY A PROVIDER AND NOT A CLIENT LIST. MockCatalogueList stays a SERVER
 * component, so the markup a crawler receives — every title, link and stat —
 * is untouched by construction rather than by verification. Only this badge
 * crosses into the client bundle. One fetch serves the whole page: a per-card
 * fetch would be 36 identical queries on the NDA list.
 *
 * WHY IT RENDERS NOTHING ON THE SERVER. The badge is per-user data on a page
 * that is prerendered once and served to everyone, so it MUST NOT reach the
 * HTML. State starts empty, which is also what the server renders, so there is
 * no hydration mismatch and the anon copy stays byte-identical.
 */
const OwnAttemptsContext = createContext<Map<string, MockAttemptSummary>>(
  new Map()
);

export function OwnAttemptsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signedIn, loading } = useSignedIn();
  const [summaries, setSummaries] = useState<Map<string, MockAttemptSummary>>(
    new Map()
  );

  useEffect(() => {
    if (loading || !signedIn) return;
    let active = true;
    fetchOwnAttempts().then((rows) => {
      // `now` is read once, here, rather than inside the fold: a live attempt
      // is one whose timer has not run out, and that is a property of when the
      // page was loaded, not of when React happened to re-render.
      if (active) setSummaries(summarizeOwnAttempts(rows, Date.now()));
    });
    return () => {
      active = false;
    };
  }, [loading, signedIn]);

  return (
    <OwnAttemptsContext.Provider value={summaries}>
      {children}
    </OwnAttemptsContext.Provider>
  );
}

/**
 * One card's badge — or nothing at all for a paper never opened.
 *
 * Absolutely positioned by the CARD (see MockCatalogueList), not laid out in
 * flow, so that when it arrives after hydration it cannot reflow the title and
 * grow the card. A badge that shifts the page is a Core Web Vitals regression
 * on a surface that exists to be indexed.
 */
export function MockAttemptBadge({ mockId }: { mockId: string }) {
  const summaries = useContext(OwnAttemptsContext);
  const badge = attemptBadge(summaries.get(mockId));
  if (!badge) return null;

  const live = badge.tone === "live";
  const Icon = live ? Play : CheckCircle2;

  return (
    <span
      // The label is terse ("×3 · 68/100"); the spoken form is not. Colour is
      // never the only carrier — the text and the icon both say which state
      // this is, so it survives greyscale and colour-blindness.
      aria-label={badge.ariaLabel}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium tabular-nums",
        live
          ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
          : "border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400"
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      <span aria-hidden>{badge.label}</span>
    </span>
  );
}
