"use client";

import { useSyncExternalStore } from "react";

/**
 * Which bank card shows the "5 wrong today" line (lib/drill/fixNudge).
 *
 * The practice beacon learns about the nudge from a batched reply, not from
 * the card that was tapped, so the reply is posted here by question id and the
 * card subscribes to its own entry. Same pattern as the reveal meter's store:
 * one module-level value, each card reading only its slice, so a nudge redraws
 * one card rather than the whole list.
 *
 * ONE AT A TIME: a new nudge replaces the last, so a student who scrolls on and
 * crosses the next multiple sees it on the new card only.
 */
export type FixNudgeView = { questionId: string; wrongToday: number; due: number | null };

let current: FixNudgeView | null = null;
const listeners = new Set<() => void>();

export function showFixNudge(nudge: FixNudgeView): void {
  current = nudge;
  for (const l of listeners) l();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** This card's nudge, or null. */
export function useFixNudge(questionId: string): FixNudgeView | null {
  return useSyncExternalStore(
    subscribe,
    () => (current?.questionId === questionId ? current : null),
    () => null
  );
}

/** Read the `fixNudge` field of a practice reply, or null if it is not one. */
export function parseFixNudge(raw: unknown): FixNudgeView | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.questionId !== "string" || typeof r.wrongToday !== "number") return null;
  const due = typeof r.due === "number" ? r.due : null;
  return { questionId: r.questionId, wrongToday: r.wrongToday, due };
}
