"use client";

import { toast } from "sonner";

/**
 * Show one celebration (2026-10-04): a run, a milestone, a fixed question.
 *
 * ONE AT A TIME BY CONSTRUCTION. Every celebration shares one toast id, so a new
 * one replaces whatever is showing rather than stacking: a run of 5 followed a
 * few seconds later by "100 questions answered" reads as two moments, never a
 * pile. Short (3 s) and non-blocking: nothing waits on it and the next question
 * is never covered for long.
 *
 * Sonner announces through a polite live region and switches its animation off
 * under prefers-reduced-motion (its own stylesheet), so neither is redone here.
 */
const CELEBRATION_ID = "celebration";

export function celebrate(message: string): void {
  toast.success(message, { id: CELEBRATION_ID, duration: 3000 });
}
