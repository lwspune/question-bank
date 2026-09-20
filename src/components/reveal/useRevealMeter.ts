"use client";

import { useCallback, useEffect, useState } from "react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { revealDecision, FREE_REVEAL_LIMIT } from "@/lib/questions/revealMeter";
import { recordPractice } from "./practiceBeacon";
import { trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";

const KEY = "qb_revealed";

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode / disabled storage — meter just won't persist */
  }
}

/**
 * Client-side answer-reveal meter, shared across /browse + /board. Anon viewers
 * get FREE_REVEAL_LIMIT distinct-question reveals (persisted in localStorage);
 * signed-in viewers are unlimited. `attemptReveal(id)` returns whether the
 * reveal is allowed and consumes budget on the first reveal of a new question.
 *
 * `surface` is REQUIRED and has no default on purpose. It defaulted to the bank
 * for as long as this hook has existed, which is why /board spent from 0105 to
 * 2026-09-18 recording its reveals as /browse reveals: the caller that needed to
 * say something different was never asked to. A default here is silent
 * mislabelling with a compile-time fix available, so the next surface to adopt
 * the hook has to state which product it is.
 *
 * `examName` is required for the same reason rather than optional: both current
 * callers have it, and an optional one would let the next caller quietly create
 * an unattributed bucket in the wall-hit breakdown. It is the DB `exams.name`
 * on both surfaces, so the two never speak different vocabularies.
 */
export function useRevealMeter(surface: PracticeSurface, examName: string) {
  const { signedIn, loading } = useSignedIn();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readIds());
  }, []);

  const attemptReveal = useCallback(
    (questionId: string): boolean => {
      // Don't gate before auth resolves — a signed-in user must never be walled
      // by a brief loading window.
      if (loading) return true;
      const decision = revealDecision({ signedIn, revealedIds: readIds(), questionId });
      if (decision.allow && !signedIn) {
        writeIds(decision.nextIds);
        setIds(decision.nextIds);
      }
      // Persist the reveal as a practice signal (migration 0105), tagged with
      // the surface that revealed it (0107/0108). Signed-in only — recordPractice
      // no-ops for anon. This is the ONLY place the bank or the board reader
      // tells the server it was used; everything else about /browse,
      // /questions and /board is invisible by construction.
      if (decision.allow) recordPractice(questionId, signedIn, surface);
      // The wall bit: an anon viewer has spent their free reveals and is about
      // to meet RevealSignInPrompt. This is the sharpest conversion moment in
      // the product and, until now, the only one that emitted nothing at all —
      // recordPractice above no-ops for exactly the population this measures.
      // Anonymous + aggregate: a count, never a person. Once per session,
      // because clicking five more locked cards is one wall, not five.
      if (!decision.allow) {
        trackFunnelOnce("reveal_wall_hit", surface, { surface, exam: examName });
      }
      return decision.allow;
    },
    [signedIn, loading, surface, examName]
  );

  const remaining = signedIn ? Infinity : Math.max(0, FREE_REVEAL_LIMIT - ids.length);
  return { attemptReveal, remaining, signedIn, loading };
}
