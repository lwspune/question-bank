"use client";

import { useSyncExternalStore } from "react";
import type { StuckOffer } from "@/lib/questions/stuckOffer";

/**
 * Which bank card shows the stuck offer (lib/questions/stuckOffer). The
 * practice beacon learns about it from a batched reply, not from the card that
 * was tapped, so the reply is posted here by question id and the card
 * subscribes to its own entry: the fixNudgeStore pattern. One at a time: a new
 * offer replaces the last.
 */
let current: StuckOffer | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  for (const l of listeners) l();
}

export function showStuckOffer(offer: StuckOffer): void {
  current = offer;
  emit();
}

export function dismissStuckOffer(questionId: string): void {
  if (current?.questionId !== questionId) return;
  current = null;
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** This card's offer, or null. */
export function useStuckOffer(questionId: string): StuckOffer | null {
  return useSyncExternalStore(
    subscribe,
    () => (current?.questionId === questionId ? current : null),
    () => null
  );
}
