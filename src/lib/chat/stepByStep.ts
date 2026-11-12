/**
 * "Teach me step by step" (V_SPEC.md section 0, step 1; owner 2026-11-12).
 *
 * Under V's explanation of a bank question, the stored solution is shown one
 * step at a time (lib/chat/solutionSteps.ts cuts it), the animation, when the
 * question has one, moving with it. Between steps the student taps "Got it,
 * next step" or "Lost me here". No AI call per step: the steps are our checked
 * solution, so they never go against the key and use none of the hour's
 * messages. "Lost me here" alone asks V, naming the step of OUR solution; V is
 * told that step's text (stepTailLine) and explains only it.
 *
 * Light on purpose (no scene code): the chat window and V's prompt import it.
 * Spec: tests/chat-step-by-step.test.ts.
 */
import type { VLanguage } from "./language";

/** What "Lost me here" sends for the student. Step is 1-based, as the card shows it. */
export function lostStepMessage(step: number): string {
  return `I'm stuck on step ${step} of the solution. Please explain it more simply.`;
}

const LOST_RE = /^I'm stuck on step ([1-9]\d?) of the solution\. Please explain it more simply\.$/;

/** The step a "Lost me here" message names, or null. */
export function lostStepOf(message: string | null | undefined): number | null {
  const m = message ? LOST_RE.exec(message) : null;
  return m ? Number(m[1]) : null;
}

/**
 * Whether the button goes under an explanation: an MCQ or numeric question
 * (MCQ first, owner 2026-11-10; a written answer is points, not steps) whose
 * solution cuts into 2+ steps, for a student who has not asked V for another
 * language (the stored solutions are English).
 */
export function stepByStepOffered(q: { format: string | null; stepCount: number; language: VLanguage | null }): boolean {
  if (q.format !== "mcq" && q.format !== "numeric") return false;
  if (q.language !== null && q.language !== "en") return false;
  return q.stepCount >= 2;
}

/** The step of our solution a "Lost me here" message names, with its place, or null. */
export function stuckOn(
  steps: readonly string[] | null,
  message: string
): { step: number; total: number; text: string } | null {
  const step = lostStepOf(message);
  if (!steps || step === null || step > steps.length) return null;
  return { step, total: steps.length, text: steps[step - 1] };
}

/** How much of a step V is told: enough to find it in its own explanation. */
const STEP_TEXT_MAX = 600;

/**
 * V's tail line for "Lost me here": the step of our solution the student is
 * stuck on. It takes the place of "leave your earlier replies alone", since
 * the explanation they were reading is the point here.
 */
export function stepTailLine(s: { step: number; total: number; text: string }): string {
  const flat = s.text.replace(/\s+/g, " ").trim();
  const quoted = flat.length > STEP_TEXT_MAX ? `${flat.slice(0, STEP_TEXT_MAX)}…` : flat;
  return `They were reading our solution to this question one step at a time and are stuck on step ${s.step} of ${s.total}: "${quoted}". Explain only that step, as rule 7 says for a step that lost them: in full with the actual numbers, or the idea it needs first, or a tiny example. Do not walk through the other steps.`;
}

/** The actions counted, in funnel order, with the labels a dashboard shows. */
export const STEP_EVENT_LABELS = [
  { action: "open", label: "Started step by step" },
  { action: "next", label: "Got it, next step" },
  { action: "lost", label: "Lost me here" },
  { action: "done", label: "Reached the last step" },
] as const;

export type StepAction = (typeof STEP_EVENT_LABELS)[number]["action"];
export type StepEvent = { action: StepAction; step: number };

const ACTIONS: ReadonlySet<string> = new Set(STEP_EVENT_LABELS.map((l) => l.action));
/** solutionSteps never gives more steps than an animation may carry (12). */
const STEP_INDEX_MAX = 11;

/** An event from the chat window: an action and the 0-based step it happened on, or null. */
export function parseStepEvent(raw: unknown): StepEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const { action, step } = raw as { action?: unknown; step?: unknown };
  if (typeof action !== "string" || !ACTIONS.has(action)) return null;
  if (typeof step !== "number" || !Number.isInteger(step) || step < 0 || step > STEP_INDEX_MAX) return null;
  return { action: action as StepAction, step };
}

/** How an event is stored in chat_interactions.question_id: "<action>:<1-based step>". */
export function stepEventCode(e: StepEvent): string {
  return `${e.action}:${e.step + 1}`;
}
