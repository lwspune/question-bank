import { describe, expect, it } from "vitest";
import { homeworkDayView, adjacentDays } from "@/lib/homework/dayView";
import { ASSERTION_REASON_INSTRUCTION } from "@/lib/mocks/instructionContext";

const item = (position: number, questionId: string, sub = 1, chapter = "Optics") => ({
  position,
  sub,
  questionId,
  chapter,
  note: `Asked ${position + 1} times: Mar 2016`,
});
const q = (id: string, context: string | null = null) => ({ id, context, text: `stem ${id}` });

describe("homeworkDayView", () => {
  it("puts the day's questions in slot order, each slot carrying its chapter and note", () => {
    const out = homeworkDayView([item(2, "b", 1, "Matrices"), item(1, "a")], [q("a"), q("b")]);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.slots.map((s) => [s.position, s.chapter, s.note, s.questions.map((x) => x.id)])).toEqual([
      [1, "Optics", "Asked 2 times: Mar 2016", ["a"]],
      [2, "Matrices", "Asked 3 times: Mar 2016", ["b"]],
    ]);
  });

  it("keeps a case study's parts together in part order, its passage once on the slot", () => {
    const passage = "A ray of light passes through a prism of angle 60 degrees...";
    const out = homeworkDayView(
      [item(1, "p2", 2), item(1, "p1", 1), item(2, "c")],
      [q("p1", passage), q("p2", passage), q("c")]
    );
    if (!out.ok) throw new Error("expected ok");
    const [cs] = out.slots;
    expect(cs.passage).toBe(passage);
    expect(cs.questions.map((x) => [x.id, x.context])).toEqual([
      ["p1", null],
      ["p2", null],
    ]);
  });

  it("swaps a paper's own Assertion-Reason directions for the general wording", () => {
    const own = "Questions 13 to 16 are Assertion (A) and Reason (R) type. Select the correct answer from the codes (a), (b), (c) and (d) as given below.";
    const out = homeworkDayView([item(1, "ar")], [q("ar", own)]);
    if (!out.ok) throw new Error("expected ok");
    expect(out.slots[0].passage).toBe(ASSERTION_REASON_INSTRUCTION);
  });

  it("leaves each part its own context when the parts do not share one", () => {
    const out = homeworkDayView([item(1, "x", 1), item(1, "y", 2)], [q("x", "Passage X"), q("y", "Passage Y")]);
    if (!out.ok) throw new Error("expected ok");
    expect(out.slots[0].passage).toBeNull();
    expect(out.slots[0].questions.map((x) => x.context)).toEqual(["Passage X", "Passage Y"]);
  });

  it("refuses a day whose question is no longer readable, naming it", () => {
    expect(homeworkDayView([item(1, "a"), item(2, "gone")], [q("a")])).toEqual({ ok: false, missing: ["gone"] });
  });

  it("refuses an empty day", () => {
    expect(homeworkDayView([], [])).toEqual({ ok: false, missing: [] });
  });
});

describe("adjacentDays", () => {
  it("links both ways inside the plan and stops at its ends", () => {
    expect(adjacentDays(1, 81)).toEqual({ prev: null, next: 2 });
    expect(adjacentDays(40, 81)).toEqual({ prev: 39, next: 41 });
    expect(adjacentDays(81, 81)).toEqual({ prev: 80, next: null });
  });
});
