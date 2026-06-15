/**
 * Pure ordering + progress + snapshot helpers for the paper builder.
 */
import { describe, it, expect } from "vitest";
import {
  positionBetween,
  positionForMove,
  planBulkAdd,
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

describe("positionForMove", () => {
  // rows are the section's membership, already sorted by position ascending.
  const rows = [
    { questionId: "a", position: 1 },
    { questionId: "b", position: 2 },
    { questionId: "c", position: 3 },
  ];

  it("moves a middle item UP to just before its previous neighbour", () => {
    // b up → swaps with a → lands before a: between null and a(1) → 0
    expect(positionForMove(rows, "b", "up")).toBe(0);
    // c up → between a(1) and b(2) → 1.5
    expect(positionForMove(rows, "c", "up")).toBe(1.5);
  });

  it("moves a middle item DOWN to just after its next neighbour", () => {
    // a down → between b(2) and c(3) → 2.5
    expect(positionForMove(rows, "a", "down")).toBe(2.5);
  });

  it("returns null when moving the first item up (already at the top)", () => {
    expect(positionForMove(rows, "a", "up")).toBeNull();
  });

  it("returns null when moving the last item down (already at the bottom)", () => {
    expect(positionForMove(rows, "c", "down")).toBeNull();
  });

  it("returns null for an unknown question id", () => {
    expect(positionForMove(rows, "zzz", "up")).toBeNull();
  });

  it("moving the last item up lands it between the two before it", () => {
    // c up → between a(1) and b(2) → 1.5
    expect(positionForMove(rows, "c", "up")).toBe(1.5);
  });

  it("moving the first item down lands it between the next two", () => {
    // a down → between b(2) and c(3) → 2.5
    expect(positionForMove(rows, "a", "down")).toBe(2.5);
  });
});

describe("planBulkAdd", () => {
  const subjectOf = (id: string): string | null => {
    if (id.startsWith("phy")) return "Physics";
    if (id.startsWith("eng")) return "English";
    if (id.startsWith("math")) return "Mathematics"; // no GAT section
    return null;
  };

  it("files each id into the section matching its subject, appending in order", () => {
    const plan = planBulkAdd(["phy1", "eng1", "phy2"], subjectOf, DEFAULT_GAT_TEMPLATE, []);
    expect(plan.added).toBe(3);
    expect(plan.alreadyIn).toBe(0);
    const phys = plan.rows.filter((r) => r.sectionKey === "physics");
    expect(phys.map((r) => r.questionId)).toEqual(["phy1", "phy2"]);
    expect(phys[0].position).toBeLessThan(phys[1].position); // appended in order
    expect(plan.rows.find((r) => r.questionId === "eng1")?.sectionKey).toBe("english");
  });

  it("files a subject with no matching section into 'unassigned'", () => {
    const plan = planBulkAdd(["math1"], subjectOf, DEFAULT_GAT_TEMPLATE, []);
    expect(plan.rows[0].sectionKey).toBe("unassigned");
  });

  it("appends after the section's existing max position", () => {
    const existing = [{ questionId: "phy0", sectionKey: "physics", position: 5 }];
    const plan = planBulkAdd(["phy1"], subjectOf, DEFAULT_GAT_TEMPLATE, existing);
    expect(plan.rows[0].position).toBeGreaterThan(5);
  });

  it("skips ids already in the paper and counts them as alreadyIn", () => {
    const existing = [{ questionId: "phy1", sectionKey: "physics", position: 1 }];
    const plan = planBulkAdd(["phy1", "eng1"], subjectOf, DEFAULT_GAT_TEMPLATE, existing);
    expect(plan.added).toBe(1);
    expect(plan.alreadyIn).toBe(1);
    expect(plan.rows.map((r) => r.questionId)).toEqual(["eng1"]);
  });

  it("dedups repeated input ids (counted once)", () => {
    const plan = planBulkAdd(["phy1", "phy1"], subjectOf, DEFAULT_GAT_TEMPLATE, []);
    expect(plan.added).toBe(1);
    expect(plan.rows).toHaveLength(1);
  });

  it("handles an empty id list", () => {
    const plan = planBulkAdd([], subjectOf, DEFAULT_GAT_TEMPLATE, []);
    expect(plan).toEqual({ rows: [], added: 0, alreadyIn: 0 });
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
