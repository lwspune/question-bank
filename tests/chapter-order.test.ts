/**
 * Putting a subject's chapters in textbook order (2026-10-26): seven board
 * subjects carried the order their chapters were loaded in. The plan must
 * cover every chapter exactly once, keep a retired "[Outdated]" chapter after
 * the book's own, keep the subject's numbering base (0 or 1), and refuse a
 * target that names a chapter the subject does not have, or misses one it has.
 */
import { describe, it, expect } from "vitest";
import { planChapterOrder } from "../scripts/lib/chapterOrder";

const ch = (name: string, order: number) => ({ id: name.toLowerCase().replace(/\W+/g, "-"), name, order_index: order });

describe("planChapterOrder", () => {
  const current = [ch("Magnetism", 0), ch("Charges", 1), ch("Surface Chemistry [Outdated]", 2), ch("Potential", 3)];

  it("numbers the chapters in book order from the subject's own base, retired ones last", () => {
    const plan = planChapterOrder(current, ["Charges", "Potential", "Magnetism"]);
    expect(plan.map((m) => [m.name, m.to])).toEqual([
      ["Charges", 0],
      ["Potential", 1],
      ["Magnetism", 2],
      ["Surface Chemistry [Outdated]", 3],
    ]);
    expect(plan.find((m) => m.name === "Magnetism")).toMatchObject({ from: 0, to: 2 });
  });

  it("keeps a 1-based subject 1-based", () => {
    const plan = planChapterOrder([ch("B", 1), ch("A", 2)], ["A", "B"]);
    expect(plan.map((m) => m.to)).toEqual([1, 2]);
  });

  it("refuses a target naming a chapter the subject does not have", () => {
    expect(() => planChapterOrder(current, ["Charges", "Potential", "Magnetism", "Optics"])).toThrow(/Optics/);
  });

  it("refuses a target that misses one of the subject's chapters", () => {
    expect(() => planChapterOrder(current, ["Charges", "Potential"])).toThrow(/Magnetism/);
  });

  it("refuses a target that names a chapter twice", () => {
    expect(() => planChapterOrder(current, ["Charges", "Charges", "Potential", "Magnetism"])).toThrow(/twice/);
  });
});
