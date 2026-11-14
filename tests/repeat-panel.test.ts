/**
 * The repeat line's panel (2026-11-15, lib/questions/repeatPanel.ts): "See all"
 * opens the group on the same page. The student's own question is not shown
 * again in full; one line at the top says which paper it was and how they did.
 */
import { describe, it, expect } from "vitest";
import { panelSlots, yourQuestionLine } from "@/lib/questions/repeatPanel";
import type { HomeworkSlot } from "@/lib/homework/dayView";

type Q = { id: string };
const slot = (position: number, note: string, ids: string[]): HomeworkSlot<Q> => ({
  position,
  chapter: "",
  note,
  group: null,
  passage: null,
  questions: ids.map((id) => ({ id })),
});

const SLOTS = [slot(1, "NDA 1 2017", ["a"]), slot(2, "NDA 1 2021", ["b"]), slot(3, "NDA 2 2024", ["c"])];

describe("panelSlots", () => {
  it("leaves out the student's own question and says which paper it was", () => {
    const { slots, ownSitting } = panelSlots(SLOTS, "a");
    expect(slots.map((s) => s.note)).toEqual(["NDA 1 2021", "NDA 2 2024"]);
    expect(ownSitting).toBe("NDA 1 2017");
  });

  it("keeps a shared case study's other parts when only one part is the student's", () => {
    const { slots } = panelSlots([slot(1, "NDA 1 2017", ["a", "a2"]), slot(2, "NDA 1 2021", ["b"])], "a");
    expect(slots.map((s) => s.questions.map((q) => q.id))).toEqual([["a2"], ["b"]]);
  });

  it("shows everything when the question is not in the group", () => {
    const { slots, ownSitting } = panelSlots(SLOTS, "zzz");
    expect(slots).toHaveLength(3);
    expect(ownSitting).toBeNull();
  });
});

describe("yourQuestionLine", () => {
  it("says how they did on their own question", () => {
    expect(yourQuestionLine({ sitting: "NDA 1 2017", correct: true })).toBe("Your question (NDA 1 2017): you got it right.");
    expect(yourQuestionLine({ sitting: "NDA 1 2017", correct: false })).toBe("Your question (NDA 1 2017): you missed it. Try the others below.");
  });

  it("says only which paper when the result is not known", () => {
    expect(yourQuestionLine({ sitting: "NDA 1 2017", correct: null })).toBe("Your question was asked in NDA 1 2017.");
  });

  it("says nothing when the question is not in the group", () => {
    expect(yourQuestionLine({ sitting: null, correct: true })).toBeNull();
  });
});
