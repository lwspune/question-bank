import { describe, expect, it } from "vitest";
import { RRB_NTPC_CBT_1, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { RRB_NTPC_MOCK_SHIFTS, deriveRrbNtpcSittings, rrbNtpcSittings } from "../scripts/mocks/rrbNtpcSittings";
import { SHIFTS, SUBJECTS } from "../scripts/rrb-ntpc/config";

/**
 * RRB NTPC Graduate CBT 1 mocks: one per shift, the paper as RRB set it: 100 questions in one
 * section (Mathematics, Reasoning and General Awareness mixed in RRB's order), 90 minutes, +1 for a
 * right answer and -1/3 for a wrong one. A flawed question rides as grace (src/lib/mocks/flawed.json),
 * so every mock is 100 questions.
 */
describe("RRB NTPC Graduate CBT 1 blueprint", () => {
  it("is 100 questions, 100 marks, 90 minutes, +1 / -1/3", () => {
    expect(totalQuestions(RRB_NTPC_CBT_1)).toBe(100);
    expect(totalMarks(RRB_NTPC_CBT_1)).toBe(100);
    expect(RRB_NTPC_CBT_1.durationSecs).toBe(90 * 60);
    expect(RRB_NTPC_CBT_1.marking).toEqual({ correct: 1, wrong: -0.3333 });
  });

  it("is ONE section carrying every subject, so the mock keeps RRB's printed order", () => {
    expect(RRB_NTPC_CBT_1.sections).toHaveLength(1);
    expect(RRB_NTPC_CBT_1.sections[0].count).toBe(100);
    expect([...RRB_NTPC_CBT_1.sections[0].subjects].sort()).toEqual([...SUBJECTS].sort());
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("rrb-ntpc", "cbt-1")).toBe(RRB_NTPC_CBT_1);
  });
});

describe("RRB NTPC sittings: one mock per committed shift", () => {
  it("lists all 24 committed shifts", () => {
    expect(RRB_NTPC_MOCK_SHIFTS).toHaveLength(24);
    expect(rrbNtpcSittings()).toHaveLength(24);
  });

  it("names a shift's paper by its source file, slug and title", () => {
    const shift = { id: "g1-2026-03-22-s2", ...SHIFTS["g1-2026-03-22-s2"] };
    expect(deriveRrbNtpcSittings([shift])).toEqual([
      {
        key: "g1-2026-03-22-s2",
        year: 2025,
        sourceFile: "RRB_NTPC_G_CBT1_2026-03-22_S2",
        slug: "rrb-ntpc-graduate-cbt-1-2026-03-22-shift-2",
        title: "RRB NTPC Graduate CBT 1 (22 Mar 2026, Shift 2)",
      },
    ]);
  });

  it("orders shifts by date, then shift", () => {
    const pick = ["g1-2026-03-27-s1", "g1-2026-03-16-s3", "g1-2026-03-16-s1"].map((id) => ({ id, ...SHIFTS[id] }));
    expect(deriveRrbNtpcSittings(pick).map((s) => s.key)).toEqual(["g1-2026-03-16-s1", "g1-2026-03-16-s3", "g1-2026-03-27-s1"]);
  });
});
