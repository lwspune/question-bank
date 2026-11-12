/**
 * "Teach me step by step" (V_SPEC.md section 0, step 1): the light half, safe
 * in the chat window and in V's prompt. When the button is offered, the
 * message "Lost me here" sends (a No everywhere a No counts), the line V is
 * told about the step, and the events counted in chat_interactions.
 */
import { describe, it, expect } from "vitest";
import {
  lostStepMessage,
  lostStepOf,
  stepByStepOffered,
  stepTailLine,
  parseStepEvent,
  stepEventCode,
  STEP_EVENT_LABELS,
  stuckOn,
} from "@/lib/chat/stepByStep";
import { isExplanation, isNotUnderstoodMessage, notUnderstoodQuestionId, stuckStepOf } from "@/lib/chat/understood";

const QID = "0b6d2511-16dd-402c-adf9-46dbf34782c1";

describe("lostStepMessage", () => {
  it("names the step of the solution, and reads back", () => {
    expect(lostStepMessage(3)).toBe("I'm stuck on step 3 of the solution. Please explain it more simply.");
    expect(lostStepOf(lostStepMessage(3))).toBe(3);
    expect(lostStepOf(lostStepMessage(12))).toBe(12);
  });

  it("reads nothing else as a lost step", () => {
    expect(lostStepOf("I'm stuck on step 0 of the solution. Please explain it more simply.")).toBeNull();
    expect(lostStepOf("I'm stuck on step 3 of the solution.")).toBeNull();
    expect(lostStepOf("I didn't understand step 3. Please explain it more simply.")).toBeNull();
    expect(lostStepOf(null)).toBeNull();
  });

  it("is not V's own numbered step: 'Which step lost you?' stays separate", () => {
    expect(stuckStepOf(lostStepMessage(2))).toBeNull();
  });

  it("counts as a No everywhere a No counts", () => {
    expect(isNotUnderstoodMessage(lostStepMessage(2))).toBe(true);
    // V's reply to it asks "Did you understand?" again.
    expect(isExplanation([], lostStepMessage(2))).toBe(true);
    // A No on that reply goes to the Fix list as the tapped question.
    expect(notUnderstoodQuestionId({ toolCalls: null, message: lostStepMessage(2), askedQuestionId: QID })).toBe(QID);
  });
});

describe("stepByStepOffered", () => {
  it("offers it on an MCQ or numeric question with 2+ steps, in English", () => {
    expect(stepByStepOffered({ format: "mcq", stepCount: 2, language: null })).toBe(true);
    expect(stepByStepOffered({ format: "numeric", stepCount: 5, language: "en" })).toBe(true);
  });

  it("does not offer it on a written answer: MCQ first (owner, 2026-11-10)", () => {
    expect(stepByStepOffered({ format: "subjective", stepCount: 5, language: null })).toBe(false);
  });

  it("does not offer it with fewer than 2 steps", () => {
    expect(stepByStepOffered({ format: "mcq", stepCount: 1, language: null })).toBe(false);
    expect(stepByStepOffered({ format: "mcq", stepCount: 0, language: null })).toBe(false);
  });

  it("does not offer it to a student who asked V for another language: the solution is in English", () => {
    expect(stepByStepOffered({ format: "mcq", stepCount: 4, language: "hi" })).toBe(false);
    expect(stepByStepOffered({ format: "mcq", stepCount: 4, language: "mr" })).toBe(false);
    expect(stepByStepOffered({ format: "mcq", stepCount: 4, language: "hinglish" })).toBe(false);
  });
});

describe("stepTailLine", () => {
  it("tells V the step, its place, and to explain only that step", () => {
    const line = stepTailLine({ step: 2, total: 4, text: String.raw`So \(4\theta = \pi\).` });
    expect(line).toContain("step 2 of 4");
    expect(line).toContain(String.raw`"So \(4\theta = \pi\)."`);
    expect(line).toMatch(/only that step/i);
  });

  it("shortens a long step and keeps it on one line", () => {
    const text = `${"word ".repeat(200)}\nmore`;
    const line = stepTailLine({ step: 1, total: 3, text });
    expect(line).not.toContain("\n");
    expect(line).toContain("…");
    expect(line.length).toBeLessThan(900);
  });
});

describe("step events", () => {
  it("accepts the four actions with a step in range", () => {
    expect(parseStepEvent({ action: "open", step: 0 })).toEqual({ action: "open", step: 0 });
    expect(parseStepEvent({ action: "next", step: 3 })).toEqual({ action: "next", step: 3 });
    expect(parseStepEvent({ action: "lost", step: 11 })).toEqual({ action: "lost", step: 11 });
    expect(parseStepEvent({ action: "done", step: 4 })).toEqual({ action: "done", step: 4 });
  });

  it("refuses anything else", () => {
    expect(parseStepEvent({ action: "skip", step: 1 })).toBeNull();
    expect(parseStepEvent({ action: "next", step: -1 })).toBeNull();
    expect(parseStepEvent({ action: "next", step: 12 })).toBeNull();
    expect(parseStepEvent({ action: "next", step: 1.5 })).toBeNull();
    expect(parseStepEvent({ action: "next" })).toBeNull();
    expect(parseStepEvent(null)).toBeNull();
  });

  it("codes an event as the action and the 1-based step it happened on", () => {
    expect(stepEventCode({ action: "open", step: 0 })).toBe("open:1");
    expect(stepEventCode({ action: "lost", step: 2 })).toBe("lost:3");
    expect(stepEventCode({ action: "done", step: 4 })).toBe("done:5");
    // Fits chat_interactions.question_id (1 to 64 characters).
    expect(stepEventCode({ action: "next", step: 11 }).length).toBeLessThanOrEqual(64);
  });

  it("labels every action for the dashboard", () => {
    expect(STEP_EVENT_LABELS.map((l) => l.action)).toEqual(["open", "next", "lost", "done"]);
  });
});

describe("V is told the step (buildSystemTail)", () => {
  it("names the step after the tapped question, in place of 'leave earlier replies alone'", async () => {
    const { buildSystemTail } = await import("@/lib/chat/facts");
    const tail = buildSystemTail({
      page: "/browse",
      signedIn: true,
      question: { id: QID, chose: null },
      solutionStep: { step: 2, total: 3, text: "Here r = 4 cm." },
    });
    expect(tail).toContain("step 2 of 3");
    expect(tail).toContain('"Here r = 4 cm."');
    // The earlier explanation is the point here, as on a follow-up.
    expect(tail).not.toContain("do not mention, correct or take them back");
  });

  it("says nothing about a step without a tapped question", async () => {
    const { buildSystemTail } = await import("@/lib/chat/facts");
    const tail = buildSystemTail({ page: "/browse", signedIn: true, solutionStep: { step: 2, total: 3, text: "x" } });
    expect(tail).not.toContain("step 2 of 3");
  });
});

describe("stuckOn", () => {
  const steps = ["First step text.", "Second step text.", "Third step text."];
  it("finds the step a Lost me here names, with its place", () => {
    expect(stuckOn(steps, lostStepMessage(2))).toEqual({ step: 2, total: 3, text: "Second step text." });
  });
  it("finds nothing past the last step, without steps, or for another message", () => {
    expect(stuckOn(steps, lostStepMessage(4))).toBeNull();
    expect(stuckOn(null, lostStepMessage(1))).toBeNull();
    expect(stuckOn(steps, "Explain this question.")).toBeNull();
  });
});
