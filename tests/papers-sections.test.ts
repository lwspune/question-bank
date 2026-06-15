/**
 * Pure ordering + progress + snapshot helpers for the paper builder.
 */
import { describe, it, expect } from "vitest";
import {
  positionBetween,
  sectionProgress,
  buildSnapshot,
} from "@/lib/papers/sections";
import { DEFAULT_GAT_TEMPLATE } from "@/lib/papers/template";

describe("positionBetween", () => {
  it("returns 1 for the first item in an empty list", () => {
    expect(positionBetween(null, null)).toBe(1);
  });

  it("appends after a last item", () => {
    expect(positionBetween(5, null)).toBe(6);
  });

  it("prepends before a first item", () => {
    expect(positionBetween(null, 5)).toBe(4);
  });

  it("splits the gap between two items (drag-reorder without renumber)", () => {
    expect(positionBetween(2, 4)).toBe(3);
    expect(positionBetween(2, 3)).toBe(2.5);
  });
});

describe("sectionProgress", () => {
  it("reports count vs target per section, in template order", () => {
    const counts = { english: 48, physics: 12 };
    const result = sectionProgress(DEFAULT_GAT_TEMPLATE, counts);
    const english = result.sections.find((s) => s.key === "english")!;
    expect(english).toMatchObject({ label: "English", count: 48 });
    expect(english.target).toBeGreaterThan(0);
    expect(result.sections.find((s) => s.key === "chemistry")!.count).toBe(0);
    expect(result.sections.map((s) => s.key)).toEqual(
      DEFAULT_GAT_TEMPLATE.map((s) => s.key)
    );
  });

  it("buckets counts for keys not in the template into `unassigned`", () => {
    const counts = { english: 5, "deleted-section": 3, unassigned: 2 };
    const result = sectionProgress(DEFAULT_GAT_TEMPLATE, counts);
    expect(result.unassigned).toBe(5); // 3 + 2
  });

  it("totals questions and targets across the paper", () => {
    const counts = { english: 50, physics: 10 };
    const result = sectionProgress(DEFAULT_GAT_TEMPLATE, counts);
    expect(result.total).toBe(60);
    expect(result.targetTotal).toBe(
      DEFAULT_GAT_TEMPLATE.reduce((a, s) => a + s.targetCount, 0)
    );
  });
});

describe("buildSnapshot", () => {
  const membership = [
    { questionId: "q-eng-2", sectionKey: "english", position: 2 },
    { questionId: "q-eng-1", sectionKey: "english", position: 1 },
    { questionId: "q-phy-1", sectionKey: "physics", position: 1 },
    { questionId: "q-orphan", sectionKey: "deleted", position: 1 },
  ];

  it("groups by section in template order, each section sorted by position", () => {
    const snap = buildSnapshot(DEFAULT_GAT_TEMPLATE, membership);
    const english = snap.sections.find((s) => s.key === "english")!;
    expect(english.questionIds).toEqual(["q-eng-1", "q-eng-2"]); // position-sorted
    expect(snap.sections.find((s) => s.key === "physics")!.questionIds).toEqual([
      "q-phy-1",
    ]);
  });

  it("collects membership for unknown section keys into a trailing unassigned group", () => {
    const snap = buildSnapshot(DEFAULT_GAT_TEMPLATE, membership);
    const unassigned = snap.sections.find((s) => s.key === "unassigned");
    expect(unassigned?.questionIds).toEqual(["q-orphan"]);
    // unassigned is last
    expect(snap.sections[snap.sections.length - 1].key).toBe("unassigned");
  });

  it("exposes a flat ordered id list for the export pipeline", () => {
    const snap = buildSnapshot(DEFAULT_GAT_TEMPLATE, membership);
    expect(snap.orderedQuestionIds).toEqual([
      "q-eng-1",
      "q-eng-2",
      "q-phy-1",
      "q-orphan",
    ]);
  });

  it("omits empty sections from the snapshot", () => {
    const snap = buildSnapshot(DEFAULT_GAT_TEMPLATE, [
      { questionId: "q1", sectionKey: "english", position: 1 },
    ]);
    expect(snap.sections.map((s) => s.key)).toEqual(["english"]);
  });
});
