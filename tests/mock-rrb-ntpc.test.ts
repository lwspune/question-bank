import { describe, expect, it } from "vitest";
import { RRB_NTPC_CBT_1, RRB_NTPC_UG_CBT_1, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { RRB_NTPC_MOCK_SHIFTS, RRB_NTPC_UG_MOCK_SHIFTS, deriveRrbNtpcSittings, rrbNtpcSittings, rrbNtpcUgSittings } from "../scripts/mocks/rrbNtpcSittings";
import { GA, LEVELS, SHIFTS, SUBJECTS } from "../scripts/rrb-ntpc/config";

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

/**
 * RRB NTPC Undergraduate CBT 1 mocks: the same scheme (100 questions, 90 minutes, +1 / -1/3), its
 * own exam, and three sections as its sheet prints them (Mathematics 30, General Awareness 40,
 * General Intelligence and Reasoning 30), which is also RRB's printed order.
 */
describe("RRB NTPC Undergraduate CBT 1 blueprint", () => {
  it("is 100 questions, 100 marks, 90 minutes, +1 / -1/3, under the Undergraduate exam", () => {
    expect(totalQuestions(RRB_NTPC_UG_CBT_1)).toBe(100);
    expect(totalMarks(RRB_NTPC_UG_CBT_1)).toBe(100);
    expect(RRB_NTPC_UG_CBT_1.durationSecs).toBe(90 * 60);
    expect(RRB_NTPC_UG_CBT_1.marking).toEqual({ correct: 1, wrong: -0.3333 });
    expect(RRB_NTPC_UG_CBT_1).toMatchObject({ examName: LEVELS.undergraduate.examName, examSlug: "rrb-ntpc-undergraduate", paperLabel: "Undergraduate CBT 1" });
  });

  it("has the sheet's three sections, in its order, with its subjects", () => {
    expect(RRB_NTPC_UG_CBT_1.sections.map((s) => [s.label, s.count])).toEqual([
      ["Mathematics", 30],
      ["General Awareness", 40],
      ["General Intelligence and Reasoning", 30],
    ]);
    expect(RRB_NTPC_UG_CBT_1.sections.map((s) => [...s.subjects])).toEqual(LEVELS.undergraduate.layout.map((s) => s.subjects));
    expect(RRB_NTPC_UG_CBT_1.sections[1].subjects).toEqual(GA);
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("rrb-ntpc-undergraduate", "cbt-1")).toBe(RRB_NTPC_UG_CBT_1);
  });
});

describe("RRB NTPC Undergraduate sittings", () => {
  it("lists the 32 shifts, and Graduate's list holds none of them", () => {
    expect(RRB_NTPC_UG_MOCK_SHIFTS).toHaveLength(32);
    expect(rrbNtpcUgSittings()).toHaveLength(32);
    expect(RRB_NTPC_MOCK_SHIFTS.some((id) => id.startsWith("u1-"))).toBe(false);
  });

  it("names a shift's paper by its level", () => {
    const shift = { id: "u1-2026-06-13-s2", ...SHIFTS["u1-2026-06-13-s2"] };
    expect(deriveRrbNtpcSittings([shift])).toEqual([
      {
        key: "u1-2026-06-13-s2",
        year: 2025,
        sourceFile: "RRB_NTPC_UG_CBT1_2026-06-13_S2",
        slug: "rrb-ntpc-undergraduate-cbt-1-2026-06-13-shift-2",
        title: "RRB NTPC Undergraduate CBT 1 (13 Jun 2026, Shift 2)",
      },
    ]);
  });
});
