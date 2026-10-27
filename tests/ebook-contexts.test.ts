/**
 * A question's paper context, once the question leaves its paper (2026-10-27):
 * a chapter-wise or repeated-PYQs book prints each question on its own, so a
 * section instruction that only made sense in the paper ("Answer the following
 * questions :") is noise repeated on every question and goes; an instruction
 * that SETS the task ("Differentiate between", "Write True or False", a map to
 * mark) is the question's own and stays, minus the paper's "(Any THREE)",
 * which means nothing outside the paper. A real passage is never touched.
 */
import { describe, it, expect } from "vitest";
import { bookContext } from "@/lib/ebooks/contexts";

describe("bookContext", () => {
  it("drops a section instruction that carries nothing", () => {
    for (const ctx of [
      "Answer the following questions :",
      "Answer the following questions:",
      "Answer the following questions in detail (any two) :",
      "Answer the following questions in detail (Any ONE) :",
      "Select and write the correct answer for the following multiple choice type of questions :",
      "Select and write the correct answers for the following multiple choice type of questions:",
      "Solve the following questions (Any two):",
      "Solve the following subquestions (any two):",
      "Attempt any five of the following.",
      "Do as directed :",
    ]) {
      expect(bookContext(ctx), ctx).toBeNull();
    }
  });

  it("keeps an instruction that sets the task, without the paper's choice count", () => {
    expect(bookContext("Differentiate between (Any THREE) :")).toBe("Differentiate between :");
    expect(bookContext("Give geographical reasons (any two).")).toBe("Give geographical reasons.");
    expect(bookContext("Write True or False :")).toBe("Write True or False :");
    expect(bookContext("Mark and name the following on the outline map of the world with suitable index (Any SIX) ")).toBe(
      "Mark and name the following on the outline map of the world with suitable index"
    );
  });

  it("never touches a passage", () => {
    const passage = "A researcher performs an experiment on photo-electric effect using two metals A and B (any two of the readings are shown).";
    expect(bookContext(passage)).toBe(passage);
  });

  it("passes no context through", () => {
    expect(bookContext(null)).toBeNull();
  });
});
