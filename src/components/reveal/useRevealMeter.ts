"use client";

import { useCallback, useEffect, useState } from "react";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { revealDecision, FREE_REVEAL_LIMIT } from "@/lib/questions/revealMeter";
import { recordPractice } from "./practiceBeacon";

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
 */
export function useRevealMeter() {
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
      // Persist the reveal as a practice signal (migration 0105). Signed-in only
      // — recordPractice no-ops for anon. This is the ONLY place the bank tells
      // the server it was used; everything else about /browse and /questions is
      // invisible by construction.
      if (decision.allow) recordPractice(questionId, signedIn);
      return decision.allow;
    },
    [signedIn, loading]
  );

  const remaining = signedIn ? Infinity : Math.max(0, FREE_REVEAL_LIMIT - ids.length);
  return { attemptReveal, remaining, signedIn, loading };
}
