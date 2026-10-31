/**
 * What a student does with an animated solution (2026-10-31): the event the
 * browser may send, and the summary `npm run visuals:usage` prints from those
 * rows. Before this nothing recorded a play, a finish or a switch to Still, so
 * "are students using animated solutions?" had no answer.
 */
import { describe, it, expect } from "vitest";
import { parseVisualEvent, summarizeVisualUsage, sceneOf, type UsageRow } from "@/lib/visuals/usage";

const NOW = new Date("2026-10-31T20:00:00Z"); // 01:30 IST on 1 Nov
const Q = "0b6c2a4e-1f3d-4a5b-8c7d-9e0f1a2b3c4d";

describe("parseVisualEvent", () => {
  it("builds one row per student, question, action and India day", () => {
    const r = parseVisualEvent({ questionId: Q, surface: "bank", action: "shown", scene: "functionGraph" }, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: {
        kind: "solution_visual",
        refId: Q,
        refKind: "question",
        metadata: { surface: "bank", action: "shown", scene: "functionGraph" },
        dedupeKey: `visual:shown:${Q}:u1:2026-11-01`,
      },
    });
  });

  it("accepts every action and every surface that renders a visual", () => {
    for (const action of ["shown", "finished", "replayed", "opened_still", "chose_still", "chose_animated"]) {
      expect(parseVisualEvent({ questionId: Q, surface: "mock", action, scene: "space3d" }, "u1", NOW).ok).toBe(true);
    }
    for (const surface of ["bank", "guide", "daily", "board", "drill", "mock", "v"]) {
      expect(parseVisualEvent({ questionId: Q, surface, action: "shown", scene: "space3d" }, "u1", NOW).ok).toBe(true);
    }
  });

  it("refuses an unknown action or surface, a bad question id or scene, and junk", () => {
    const ok = { questionId: Q, surface: "bank", action: "shown", scene: "space3d" };
    expect(parseVisualEvent({ ...ok, action: "liked" }, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent({ ...ok, surface: "notes" }, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent({ ...ok, questionId: "not-a-uuid" }, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent({ ...ok, scene: "" }, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent({ ...ok, scene: "a b" }, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent({ ...ok, scene: "x".repeat(41) }, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent(null, "u1", NOW).ok).toBe(false);
    expect(parseVisualEvent([], "u1", NOW).ok).toBe(false);
  });
});

describe("sceneOf", () => {
  it("reads the scene name from a stored visual, or a placeholder", () => {
    expect(sceneOf({ scene: "coordGeometry", params: {} })).toBe("coordGeometry");
    expect(sceneOf(null)).toBe("unknown");
    expect(sceneOf({ scene: 3 })).toBe("unknown");
  });
});

function row(userId: string, questionId: string, action: UsageRow["action"], over: Partial<UsageRow> = {}): UsageRow {
  return { userId, questionId, action, surface: "bank", scene: "functionGraph", exam: "JEE Mains", day: "2026-11-01", ...over };
}

describe("summarizeVisualUsage", () => {
  it("counts student-question pairs, so a repeat on another day is one pair", () => {
    const rows = [
      row("u1", "q1", "shown"),
      row("u1", "q1", "shown", { day: "2026-11-02" }),
      row("u1", "q1", "finished"),
      row("u1", "q2", "shown"),
      row("u2", "q1", "shown"),
      row("u2", "q1", "replayed"),
      row("u2", "q1", "chose_still"),
    ];
    const [all] = summarizeVisualUsage(rows, "all");
    expect(all).toEqual({
      key: "all",
      students: 2,
      shown: 3,
      finished: 1,
      replayed: 1,
      openedStill: 0,
      choseStill: 1,
      choseAnimated: 0,
      finishedPct: 33,
      stillPct: 33,
    });
  });

  it("groups by surface, exam, scene or day, busiest first", () => {
    const rows = [
      row("u1", "q1", "shown", { surface: "mock", exam: "NDA" }),
      row("u2", "q1", "shown", { surface: "mock", exam: "NDA" }),
      row("u1", "q2", "shown", { surface: "bank" }),
      row("u3", "q3", "opened_still", { surface: "board", scene: "truthTable" }),
    ];
    expect(summarizeVisualUsage(rows, "surface").map((g) => [g.key, g.shown, g.openedStill])).toEqual([
      ["mock", 2, 0],
      ["bank", 1, 0],
      ["board", 0, 1],
    ]);
    expect(summarizeVisualUsage(rows, "exam").map((g) => g.key)).toEqual(["NDA", "JEE Mains"]);
    expect(summarizeVisualUsage(rows, "scene").map((g) => g.key)).toEqual(["functionGraph", "truthTable"]);
  });

  it("orders days by date and leaves shares empty when nothing was shown", () => {
    const rows = [row("u1", "q1", "opened_still", { day: "2026-11-02" }), row("u1", "q2", "shown", { day: "2026-11-01" })];
    const days = summarizeVisualUsage(rows, "day");
    expect(days.map((g) => g.key)).toEqual(["2026-11-01", "2026-11-02"]);
    expect(days[1].finishedPct).toBeNull();
    expect(days[1].stillPct).toBeNull();
    expect(summarizeVisualUsage([], "all")).toEqual([]);
  });
});
