import { describe, expect, it } from "vitest";
import { UGC_NET_PAPER_1, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { deriveUgcNetSittings } from "../scripts/mocks/ugcNetSittings";
import { SHIFTS } from "../scripts/ugc-net/config";

/**
 * UGC NET Paper 1 mocks: one per shift, the General Paper as NTA set it: 50
 * questions, 2 marks each, no negative marking. The real exam gives 3 hours for
 * Paper 1 and Paper 2 together; Paper 1 alone is timed at 60 minutes (owner,
 * 2026-11-10). A question NTA dropped stays in the mock as grace, so every
 * mock is 50 questions.
 */
describe("UGC NET Paper 1 blueprint", () => {
  it("is 50 questions, 100 marks, 60 minutes, +2 / 0, one section", () => {
    expect(totalQuestions(UGC_NET_PAPER_1)).toBe(50);
    expect(totalMarks(UGC_NET_PAPER_1)).toBe(100);
    expect(UGC_NET_PAPER_1.durationSecs).toBe(60 * 60);
    expect(UGC_NET_PAPER_1.marking).toEqual({ correct: 2, wrong: 0 });
    expect(UGC_NET_PAPER_1.sections.map((s) => [s.subjects.join(), s.count])).toEqual([["General Paper", 50]]);
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("ugc-net", "paper-1")).toBe(UGC_NET_PAPER_1);
  });
});

describe("UGC NET sittings: one mock per committed shift", () => {
  it("names a shift's paper by its source file, slug and title", () => {
    const shift = SHIFTS.find((s) => s.id === "2024-09-03-1")!;
    expect(deriveUgcNetSittings([shift])).toEqual([
      {
        key: "2024-09-03-1",
        year: 2024,
        sourceFile: "UGC NET June 2024, 3 Sep 2024 Shift 1 (NTA)",
        slug: "ugc-net-paper-1-2024-09-03-shift-1",
        title: "UGC NET Paper 1, June 2024 (3 Sep 2024, Shift 1)",
      },
    ]);
  });

  it("orders shifts by date, then shift", () => {
    const pick = ["2024-09-03-1", "2024-08-21-2", "2024-08-21-1"].map((id) => SHIFTS.find((s) => s.id === id)!);
    expect(deriveUgcNetSittings(pick).map((s) => s.key)).toEqual(["2024-08-21-1", "2024-08-21-2", "2024-09-03-1"]);
  });
});
