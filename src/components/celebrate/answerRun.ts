"use client";

import { EMPTY_RUN, runMessage, stepRun, type RunState } from "@/lib/celebrate/runs";
import { celebrate } from "./celebrate";

/**
 * The page session's "right in a row" counter (2026-10-04), shared by every
 * card on /browse, /questions and the /board reader.
 *
 * MODULE-LEVEL ON PURPOSE, for practiceBeacon's reason: each card mounts its
 * own hook, and a run is a property of the student's session, not of a card.
 * It survives client-side navigation and resets on a full page load, which is
 * the right lifetime for "in a row" — nothing is stored, nothing follows the
 * student to their next visit, and a run that ends is never mentioned.
 *
 * `seen` is what makes only the FIRST act on a question count: a pick after
 * "Show answer", a re-pick after seeing the key, or a re-opened card is not an
 * attempt. It mirrors the beacon's `sent` set, which applies the same rule to
 * the server's verdict, so a run and a recorded answer agree on what counted.
 *
 * Works for signed-out visitors too: the verdict comes from the options already
 * on the page, and nothing is sent anywhere.
 */
const seen = new Set<string>();
let run: RunState = EMPTY_RUN;

/** One allowed reveal. `correct` null = a reveal with no gradable pick. */
export function noteRevealForRun(questionId: string, correct: boolean | null, topic: string | null): void {
  const firstAct = !seen.has(questionId);
  seen.add(questionId);
  const step = stepRun(run, { firstAct, correct, topic });
  run = step.state;
  if (step.level !== null) celebrate(runMessage(step.level, step.topic));
}
