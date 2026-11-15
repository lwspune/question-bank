/**
 * Step chips under V's explanation (owner, 2026-11-15; replaced "Teach me step
 * by step", which got 1 student start in 3 days). An explanation whose steps
 * are numbered 1, 2, 3 is shown as a bubble per step; tapping a step offers
 * Explain (V explains that step alone) and Reply (the step quoted above the
 * typing box, and V told only that step).
 *
 * Why: students ask about one step in their own words ("where did the 9y² go",
 * "explain clearly step 2"), about 1 typed follow-up in 10, while the buttons
 * kept under a reply got nothing (Reply: 0 uses since 10-21; "Which step lost
 * you?": 0 picks since 11-10).
 *
 * Light on purpose: the chat window, the dashboard and V's prompt import it.
 * Pure. Spec: tests/chat-step-chips.test.ts.
 */

/** The most steps split out; a longer list stays one bubble. */
export const MAX_REPLY_STEPS = 12;

/** "1. ", "1) " or "Step 1: " at the start of a line (V writes all three). */
const STEP_START = /^\s*(?:Step\s+)?(\d{1,2})(?:[.)]\s|:\s)/i;

/** Open maths: more \( than \), or more \[ than \]. */
function mathOpen(s: string): boolean {
  const count = (re: RegExp) => (s.match(re) ?? []).length;
  return count(/\\\(/g) > count(/\\\)/g) || count(/\\\[/g) > count(/\\\]/g);
}

export type ReplyParts = {
  /** Before step 1: often the line about their pick. May be empty. */
  intro: string;
  /** Each step's text, its number taken off. 2 to MAX_REPLY_STEPS of them. */
  steps: string[];
  /** After the last step and a blank line: often the answer. May be empty. */
  outro: string;
};

/**
 * The reply as an opening, its numbered steps and an ending, or null when it
 * has no run of 2+ steps starting at 1 (it then stays one bubble). A step runs
 * to the next number in order; the last runs to the first blank line. A number
 * out of order, or one inside open maths, is part of the step it sits in.
 */
export function replyParts(reply: string): ReplyParts | null {
  const lines = reply.split("\n");
  const intro: string[] = [];
  const steps: string[][] = [];
  const outro: string[] = [];
  let ordered = true;
  let inOutro = false;
  for (const line of lines) {
    if (inOutro) {
      outro.push(line);
      continue;
    }
    const current = steps[steps.length - 1];
    const open = current ? mathOpen(current.join("\n")) : mathOpen(intro.join("\n"));
    const m = !open && ordered ? STEP_START.exec(line) : null;
    if (m && Number(m[1]) === steps.length + 1) {
      steps.push([line.slice(m[0].length)]);
      continue;
    }
    if (m && steps.length > 0) ordered = false;
    if (!current) {
      intro.push(line);
      continue;
    }
    current.push(line);
  }
  if (steps.length < 2 || steps.length > MAX_REPLY_STEPS) return null;

  // The last step ends at its first blank line (outside maths); the rest is the ending.
  const last = steps[steps.length - 1];
  for (let i = 1; i < last.length; i++) {
    if (last[i].trim() === "" && !mathOpen(last.slice(0, i).join("\n"))) {
      outro.unshift(...last.splice(i));
      break;
    }
  }
  const tidy = (ls: readonly string[]) => ls.join("\n").replace(/^\s*\n/, "").trim();
  return {
    intro: tidy(intro),
    steps: steps.map((s) => tidy(s).replace(/\n{2,}/g, "\n")),
    outro: tidy(outro),
  };
}

/** What Explain sends for the student. Step is 1-based, as the bubble shows it. */
export function explainStepMessage(step: number): string {
  return `Explain step ${step} more simply.`;
}

const EXPLAIN_RE = /^Explain step ([1-9]\d?) more simply\.$/;

/** The step an Explain message names, or null. */
export function explainStepOf(message: string | null | undefined): number | null {
  const m = message ? EXPLAIN_RE.exec(message) : null;
  return m ? Number(m[1]) : null;
}

/** How much of a step V is told: enough to find it in its own reply. */
const STEP_TEXT_MAX = 600;

/**
 * What V is told before a message that replies to one step of its earlier
 * reply, or null when the reply has no such step (V is then told the whole
 * exchange, as for any Reply).
 */
export function replyStepContext(reply: string, step: number): string | null {
  const parts = replyParts(reply);
  if (!parts || step < 1 || step > parts.steps.length) return null;
  const flat = parts.steps[step - 1].replace(/\s+/g, " ").trim();
  const quoted = flat.length > STEP_TEXT_MAX ? `${flat.slice(0, STEP_TEXT_MAX)}…` : flat;
  return `[The student is replying to step ${step} of ${parts.steps.length} of your earlier explanation: "${quoted}". Answer about that step only.]`;
}

/** The taps counted, in funnel order, with the labels the dashboard shows. */
export const STEP_TAP_LABELS = [
  { action: "tap", label: "Tapped a step" },
  { action: "explain", label: "Explain" },
  { action: "reply", label: "Reply" },
] as const;

export type StepTapAction = (typeof STEP_TAP_LABELS)[number]["action"];
export type StepTap = { action: StepTapAction; step: number };

const ACTIONS: ReadonlySet<string> = new Set(STEP_TAP_LABELS.map((l) => l.action));

/** A tap from the chat window: an action and the 0-based step it was on, or null. */
export function parseStepTap(raw: unknown): StepTap | null {
  if (!raw || typeof raw !== "object") return null;
  const { action, step } = raw as { action?: unknown; step?: unknown };
  if (typeof action !== "string" || !ACTIONS.has(action)) return null;
  if (typeof step !== "number" || !Number.isInteger(step) || step < 0 || step >= MAX_REPLY_STEPS) return null;
  return { action: action as StepTapAction, step };
}

/** How a tap is stored in chat_interactions.question_id: "<action>:<1-based step>" (event step_by_step, 0252). */
export function stepTapCode(t: StepTap): string {
  return `${t.action}:${t.step + 1}`;
}
