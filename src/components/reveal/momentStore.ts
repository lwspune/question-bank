"use client";

import { useSyncExternalStore } from "react";
import type { TeachingMoment } from "@/lib/questions/teachingMoment";

/**
 * The one line under a bank answer (lib/questions/teachingMoment): which card
 * shows which moment. The practice beacon learns it from a batched reply, not
 * from the card that was tapped, so the reply is posted here by question id and
 * the card subscribes to its own entry. One at a time on the page: a new moment
 * replaces the last, so two lines can never show at once.
 */
let current: TeachingMoment | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  for (const l of listeners) l();
}

export function showMoment(moment: TeachingMoment): void {
  current = moment;
  emit();
}

export function dismissMoment(questionId: string): void {
  if (current?.questionId !== questionId) return;
  current = null;
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** This card's moment, or null. */
export function useMoment(questionId: string): TeachingMoment | null {
  return useSyncExternalStore(
    subscribe,
    () => (current?.questionId === questionId ? current : null),
    () => null
  );
}
