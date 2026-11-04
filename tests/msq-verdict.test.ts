import { describe, expect, it } from "vitest";
import { msqOptionMark, msqVerdict } from "@/lib/questions/msq";

describe("msqVerdict: how a set of ticks compares with the correct set", () => {
  it("is 'all' only for exactly the correct set, in any order", () => {
    expect(msqVerdict(["C", "A"], ["A", "C"])).toEqual({ kind: "all", found: 2, total: 2, wrongPicks: [] });
  });

  it("is 'partial' for some correct options and no wrong one", () => {
    expect(msqVerdict(["A"], ["A", "C", "D"])).toEqual({ kind: "partial", found: 1, total: 3, wrongPicks: [] });
  });

  it("is 'wrong' as soon as one ticked option is not correct, and names it", () => {
    expect(msqVerdict(["A", "B"], ["A", "C"])).toEqual({ kind: "wrong", found: 1, total: 2, wrongPicks: ["B"] });
  });

  it("is 'none' with nothing ticked", () => {
    expect(msqVerdict([], ["A"])).toEqual({ kind: "none", found: 0, total: 1, wrongPicks: [] });
  });
});

describe("msqOptionMark: one option after the student checks", () => {
  it("shows nothing before checking", () => {
    expect(msqOptionMark({ checked: false, ticked: true, isCorrect: true })).toBe("none");
  });

  it("marks a ticked correct option right, an unticked correct one missed", () => {
    expect(msqOptionMark({ checked: true, ticked: true, isCorrect: true })).toBe("right");
    expect(msqOptionMark({ checked: true, ticked: false, isCorrect: true })).toBe("missed");
  });

  it("marks a ticked wrong option wrong and leaves an unticked wrong one alone", () => {
    expect(msqOptionMark({ checked: true, ticked: true, isCorrect: false })).toBe("wrong");
    expect(msqOptionMark({ checked: true, ticked: false, isCorrect: false })).toBe("none");
  });

  it("never marks a ticked option wrong on a cancelled question (no option is right)", () => {
    expect(msqOptionMark({ checked: true, ticked: true, isCorrect: false, cancelled: true })).toBe("none");
  });
});

describe("msqVerdictLine", () => {
  it("says what happened in plain words", async () => {
    const { msqVerdictLine } = await import("@/lib/questions/msq");
    expect(msqVerdictLine(msqVerdict(["A", "C"], ["A", "C"]))).toBe("All correct: you found both right options.");
    expect(msqVerdictLine(msqVerdict(["A", "B", "C"], ["A", "B", "C"]))).toBe("All correct: you found all 3 right options.");
    expect(msqVerdictLine(msqVerdict(["D"], ["D"]))).toBe("Correct: that is the only right option.");
    expect(msqVerdictLine(msqVerdict(["A"], ["A", "C", "D"]))).toBe("Partly right: you found 1 of the 3 right options, with no wrong one.");
    expect(msqVerdictLine(msqVerdict(["A", "B", "D"], ["A", "C"]))).toBe("Not quite: B and D are not correct.");
  });
});

describe("toggleTick: one tap on an option of a multiple-select question", () => {
  it("adds an unticked option and keeps the set in letter order", async () => {
    const { toggleTick } = await import("@/lib/questions/msq");
    expect(toggleTick(["C"], "A")).toEqual(["A", "C"]);
    expect(toggleTick([], "B")).toEqual(["B"]);
  });

  it("removes a ticked option, and an emptied set is null (unanswered)", async () => {
    const { toggleTick } = await import("@/lib/questions/msq");
    expect(toggleTick(["A", "C"], "C")).toEqual(["A"]);
    expect(toggleTick(["A"], "A")).toBeNull();
    expect(toggleTick(null, "D")).toEqual(["D"]);
  });
});

describe("msqInstruction: how the question is marked, in one line", () => {
  it("states partial credit as the paper prints it", async () => {
    const { msqInstruction } = await import("@/lib/questions/msq");
    expect(msqInstruction("partial", 4, -1)).toBe(
      "Tick every correct option. All correct and no wrong one: +4. Some correct and no wrong one: +1 for each. Any wrong tick: -1."
    );
  });

  it("states all-or-nothing marking", async () => {
    const { msqInstruction } = await import("@/lib/questions/msq");
    expect(msqInstruction("exact", 3, -0.19)).toBe(
      "Tick every correct option. All correct and no wrong one: +3. Anything else: -0.19. No partial marks."
    );
  });
});
