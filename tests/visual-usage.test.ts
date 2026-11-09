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
    for (const surface of ["bank", "guide", "daily", "board", "drill", "mock", "v", "flashcards"]) {
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

  // 2026-11-08: the player now says whether animations were on, how many steps
  // the solution has, each new step reached, and how a finish was reached.
  const base = { questionId: Q, surface: "bank", scene: "space3d" };

  it("keeps the motion setting and step count on shown", () => {
    const r = parseVisualEvent({ ...base, action: "shown", motion: "reduced", steps: 3 }, "u1", NOW);
    expect(r.ok && r.value.metadata).toEqual({ surface: "bank", action: "shown", scene: "space3d", motion: "reduced", steps: 3 });
    expect(r.ok && r.value.dedupeKey).toBe(`visual:shown:${Q}:u1:2026-11-01`);
  });

  it("keeps a reached step as its own row per step, so steps 2 and 3 are both kept", () => {
    const r2 = parseVisualEvent({ ...base, action: "reached", step: 2 }, "u1", NOW);
    const r3 = parseVisualEvent({ ...base, action: "reached", step: 3 }, "u1", NOW);
    expect(r2.ok && r2.value.metadata).toEqual({ surface: "bank", action: "reached", scene: "space3d", step: 2 });
    expect(r2.ok && r2.value.dedupeKey).toBe(`visual:reached:2:${Q}:u1:2026-11-01`);
    expect(r3.ok && r3.value.dedupeKey).toBe(`visual:reached:3:${Q}:u1:2026-11-01`);
  });

  it("keeps how a finish was reached", () => {
    const r = parseVisualEvent({ ...base, action: "finished", how: "tapped" }, "u1", NOW);
    expect(r.ok && r.value.metadata).toEqual({ surface: "bank", action: "finished", scene: "space3d", how: "tapped" });
  });

  it("still accepts the old shapes, sent by a page loaded before the deploy", () => {
    expect(parseVisualEvent({ ...base, action: "shown" }, "u1", NOW).ok).toBe(true);
    expect(parseVisualEvent({ ...base, action: "finished" }, "u1", NOW).ok).toBe(true);
  });

  it("refuses a detail on the wrong action, a bad value, and a reached step without its number", () => {
    const bad = [
      { action: "reached" },
      { action: "reached", step: 1 },
      { action: "reached", step: 51 },
      { action: "reached", step: 2.5 },
      { action: "reached", step: "2" },
      { action: "shown", motion: "slow" },
      { action: "shown", steps: 0 },
      { action: "shown", steps: 51 },
      { action: "finished", how: "skipped" },
      { action: "finished", motion: "reduced" },
      { action: "shown", how: "auto" },
      { action: "shown", step: 2 },
      { action: "replayed", steps: 3 },
      { action: "chose_still", step: 2 },
    ];
    for (const b of bad) expect(parseVisualEvent({ ...base, ...b }, "u1", NOW).ok, JSON.stringify(b)).toBe(false);
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
      tracked: 0,
      animOff: 0,
      trackedFinished: 0,
      tapped: 0,
      trackedFinishedPct: null,
      stoppedAt: {},
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

  it("judges finishing only on the new player's rows, leaving out students with animations off", () => {
    const rows = [
      // old player: shown with no motion recorded
      row("u0", "q0", "shown"),
      // new player, animations on, auto finish
      row("u1", "q1", "shown", { motion: "full", steps: 3 }),
      row("u1", "q1", "reached", { step: 2 }),
      row("u1", "q1", "reached", { step: 3 }),
      row("u1", "q1", "finished", { how: "auto" }),
      // new player, tapped to the end
      row("u1", "q2", "shown", { motion: "full", steps: 2 }),
      row("u1", "q2", "reached", { step: 2 }),
      row("u1", "q2", "finished", { how: "tapped" }),
      // new player, stopped at step 2 of 3
      row("u2", "q1", "shown", { motion: "full", steps: 3 }),
      row("u2", "q1", "reached", { step: 2 }),
      // new player, stopped at step 1 of 3
      row("u3", "q1", "shown", { motion: "full", steps: 3 }),
      // new player, animations off: never in the finish share
      row("u4", "q1", "shown", { motion: "reduced", steps: 3 }),
    ];
    const [all] = summarizeVisualUsage(rows, "all");
    expect(all.shown).toBe(6);
    expect(all.tracked).toBe(5);
    expect(all.animOff).toBe(1);
    expect(all.trackedFinished).toBe(2);
    expect(all.tapped).toBe(1);
    expect(all.trackedFinishedPct).toBe(50); // 2 of the 4 with animations on
    expect(all.finishedPct).toBe(33); // the raw share still counts every pair
    expect(all.stoppedAt).toEqual({ "1/3": 1, "2/3": 1 });
  });

  it("takes a pair as tracked when any day's shown came from the new player", () => {
    const rows = [
      row("u1", "q1", "shown", { day: "2026-11-01" }),
      row("u1", "q1", "shown", { motion: "full", steps: 2, day: "2026-11-09" }),
      row("u1", "q1", "finished", { how: "auto", day: "2026-11-09" }),
    ];
    const [all] = summarizeVisualUsage(rows, "all");
    expect([all.shown, all.tracked, all.trackedFinished, all.trackedFinishedPct]).toEqual([1, 1, 1, 100]);
  });
});
