/**
 * Step chips under V's explanation (owner, 2026-11-15; replaces "Teach me step
 * by step"): an explanation with numbered steps is shown as a bubble per step,
 * and a tapped step offers Explain and Reply. The pure half: how a reply splits,
 * the message Explain sends (a No wherever a No counts), what V is told about a
 * Reply on one step, and the taps counted in chat_interactions.
 * Pure core src/lib/chat/stepChips.ts.
 */
import { describe, it, expect } from "vitest";
import {
  explainStepMessage,
  explainStepOf,
  MAX_REPLY_STEPS,
  parseStepTap,
  replyParts,
  replyStepContext,
  STEP_TAP_LABELS,
  stepTapCode,
} from "@/lib/chat/stepChips";
import { isExplanation, isNotUnderstoodMessage, notUnderstoodQuestionId, stuckStepOf } from "@/lib/chat/understood";

const QID = "0b6d2511-16dd-402c-adf9-46dbf34782c1";

const REPLY = [
  "You picked (B) 4. The answer is (A) 5.",
  "1. Put the x terms together: \\((x^2-6x)+(y^2+4y)=12\\)",
  "2. Complete each square. Add 9 and 4 to both sides:",
  "\\((x-3)^2+(y+2)^2=25\\)",
  "3. Compare with \\((x-h)^2+(y-k)^2=r^2\\), so \\(r^2=25\\).",
  "",
  "Answer: (A) 5",
].join("\n");

describe("replyParts: an explanation split into its opening, steps and ending", () => {
  it("splits on numbered steps that run 1, 2, 3, keeping a step's later lines with it", () => {
    const p = replyParts(REPLY);
    expect(p).not.toBeNull();
    expect(p!.intro).toBe("You picked (B) 4. The answer is (A) 5.");
    expect(p!.steps).toEqual([
      "Put the x terms together: \\((x^2-6x)+(y^2+4y)=12\\)",
      "Complete each square. Add 9 and 4 to both sides:\n\\((x-3)^2+(y+2)^2=25\\)",
      "Compare with \\((x-h)^2+(y-k)^2=r^2\\), so \\(r^2=25\\).",
    ]);
    expect(p!.outro).toBe("Answer: (A) 5");
  });

  it("reads '1)' and 'Step 1:' as V writes both", () => {
    expect(replyParts("1) First\n2) Second")!.steps).toEqual(["First", "Second"]);
    expect(replyParts("Step 1: First\nStep 2: Second")!.steps).toEqual(["First", "Second"]);
  });

  it("keeps a blank line inside the steps with the step before it, and ends the last step at a blank line", () => {
    const p = replyParts("1. First\n\n2. Second\nmore of two\n\nSo the answer is 5.\nGood luck");
    expect(p!.steps).toEqual(["First", "Second\nmore of two"]);
    expect(p!.outro).toBe("So the answer is 5.\nGood luck");
  });

  it("has no opening or ending when the reply is only steps", () => {
    const p = replyParts("1. First\n2. Second");
    expect(p).toEqual({ intro: "", steps: ["First", "Second"], outro: "" });
  });

  it("never splits inside maths that runs over a line break", () => {
    const p = replyParts("1. Start \\(\n2 + 2\n\\) here\n2. Next");
    expect(p!.steps).toEqual(["Start \\(\n2 + 2\n\\) here", "Next"]);
  });

  it("stops splitting at a number out of order: the rest stays in the step it is in", () => {
    const p = replyParts("1. First\n2. Second\n1. a list inside step two");
    expect(p!.steps).toEqual(["First", "Second\n1. a list inside step two"]);
  });

  it("is null for fewer than two steps, a list not starting at 1, or too many steps", () => {
    expect(replyParts("Plain explanation.\nNo numbers.")).toBeNull();
    expect(replyParts("1. Only one step\n\nAnswer: 5")).toBeNull();
    expect(replyParts("2. Second\n3. Third")).toBeNull();
    const many = Array.from({ length: MAX_REPLY_STEPS + 1 }, (_, i) => `${i + 1}. step`).join("\n");
    expect(replyParts(many)).toBeNull();
    const most = Array.from({ length: MAX_REPLY_STEPS }, (_, i) => `${i + 1}. step`).join("\n");
    expect(replyParts(most)!.steps).toHaveLength(MAX_REPLY_STEPS);
  });

  it("loses no words: every non-blank line of the reply is in a part", () => {
    const p = replyParts(REPLY)!;
    const words = (s: string) => s.replace(/^\s*(?:Step\s+)?\d{1,2}(?:[.)]\s|:\s)/gim, "").split(/\s+/).filter(Boolean);
    expect([p.intro, ...p.steps, p.outro].flatMap(words)).toEqual(words(REPLY));
  });
});

describe("explainStepMessage: what Explain sends for the student", () => {
  it("names the step and reads back", () => {
    expect(explainStepMessage(2)).toBe("Explain step 2 more simply.");
    expect(explainStepOf(explainStepMessage(2))).toBe(2);
    expect(explainStepOf(explainStepMessage(12))).toBe(12);
  });

  it("reads nothing else as an Explain tap", () => {
    expect(explainStepOf("Explain step 0 more simply.")).toBeNull();
    expect(explainStepOf("explain step 2 more simply")).toBeNull();
    expect(explainStepOf("Explain step 2 more simply. And step 3")).toBeNull();
    expect(explainStepOf(null)).toBeNull();
  });

  it("is a No wherever a No counts, but not the v-better-retry step message", () => {
    const m = explainStepMessage(3);
    expect(isNotUnderstoodMessage(m)).toBe(true);
    expect(stuckStepOf(m)).toBeNull();
    // V's answer to it asks "Did you understand?", even when it calls no tool.
    expect(isExplanation([], m)).toBe(true);
    // A No on that answer belongs to the question the student tapped Ask V on.
    expect(notUnderstoodQuestionId({ toolCalls: [], message: m, askedQuestionId: QID })).toBe(QID);
  });
});

describe("replyStepContext: what V is told about a Reply on one step", () => {
  it("names the step and quotes only it", () => {
    const c = replyStepContext(REPLY, 2);
    expect(c).toContain("step 2 of 3");
    expect(c).toContain("Complete each square. Add 9 and 4 to both sides:");
    expect(c).not.toContain("Put the x terms together");
  });

  it("is null when the reply has no such step", () => {
    expect(replyStepContext(REPLY, 4)).toBeNull();
    expect(replyStepContext("No steps here.", 1)).toBeNull();
  });
});

describe("step taps: counted in chat_interactions (event step_by_step, 0252)", () => {
  it("reads a tap, an Explain and a Reply on a 0-based step", () => {
    expect(parseStepTap({ action: "tap", step: 0 })).toEqual({ action: "tap", step: 0 });
    expect(parseStepTap({ action: "explain", step: 2 })).toEqual({ action: "explain", step: 2 });
    expect(parseStepTap({ action: "reply", step: MAX_REPLY_STEPS - 1 })).toEqual({ action: "reply", step: MAX_REPLY_STEPS - 1 });
  });

  it("refuses anything else, the retired step-by-step actions included", () => {
    for (const bad of [null, "tap", { action: "open", step: 0 }, { action: "lost", step: 1 }, { action: "tap", step: -1 }, { action: "tap", step: 1.5 }, { action: "tap", step: MAX_REPLY_STEPS }]) {
      expect(parseStepTap(bad)).toBeNull();
    }
  });

  it("stores '<action>:<1-based step>', as the step-by-step taps were", () => {
    expect(stepTapCode({ action: "explain", step: 1 })).toBe("explain:2");
  });

  it("labels the three taps in funnel order", () => {
    expect(STEP_TAP_LABELS.map((l) => l.action)).toEqual(["tap", "explain", "reply"]);
  });
});
