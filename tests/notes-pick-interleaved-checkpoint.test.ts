import { describe, it, expect } from "vitest";
import { pickInterleavedCheckpoint } from "@/lib/notes/pickInterleavedCheckpoint";

describe("pickInterleavedCheckpoint", () => {
  it("returns an empty array when the drill map is empty", () => {
    expect(pickInterleavedCheckpoint(new Map(), [], 5)).toEqual([]);
  });

  it("returns an empty array when count is 0", () => {
    const map = new Map([["a", ["q1", "q2"]]]);
    expect(pickInterleavedCheckpoint(map, ["a"], 0)).toEqual([]);
  });

  it("round-robins across concepts in conceptOrder", () => {
    const map = new Map([
      ["a", ["a1", "a2", "a3"]],
      ["b", ["b1", "b2", "b3"]],
    ]);
    expect(pickInterleavedCheckpoint(map, ["a", "b"], 5)).toEqual([
      "a1",
      "b1",
      "a2",
      "b2",
      "a3",
    ]);
  });

  it("respects conceptOrder over Map insertion order", () => {
    const map = new Map([
      ["a", ["a1", "a2"]],
      ["b", ["b1", "b2"]],
    ]);
    expect(pickInterleavedCheckpoint(map, ["b", "a"], 4)).toEqual([
      "b1",
      "a1",
      "b2",
      "a2",
    ]);
  });

  it("skips slugs in conceptOrder that are absent from the map", () => {
    const map = new Map([["a", ["a1", "a2"]]]);
    expect(pickInterleavedCheckpoint(map, ["a", "missing", "b"], 4)).toEqual([
      "a1",
      "a2",
    ]);
  });

  it("ignores Map entries whose slug is not in conceptOrder", () => {
    const map = new Map([
      ["a", ["a1"]],
      ["b", ["b1"]],
    ]);
    expect(pickInterleavedCheckpoint(map, ["a"], 5)).toEqual(["a1"]);
  });

  it("returns all available ids when total drill count is below the target", () => {
    const map = new Map([
      ["a", ["a1"]],
      ["b", ["b1", "b2"]],
    ]);
    expect(pickInterleavedCheckpoint(map, ["a", "b"], 5)).toEqual([
      "a1",
      "b1",
      "b2",
    ]);
  });

  it("contains no duplicate ids even when concepts share a question id", () => {
    const map = new Map([
      ["a", ["x", "y"]],
      ["b", ["x", "z"]],
    ]);
    const picked = pickInterleavedCheckpoint(map, ["a", "b"], 4);
    expect(new Set(picked).size).toBe(picked.length);
  });

  it("is deterministic — identical inputs yield identical outputs", () => {
    const build = () =>
      new Map([
        ["a", ["a1", "a2", "a3"]],
        ["b", ["b1", "b2"]],
        ["c", ["c1", "c2", "c3", "c4"]],
      ]);
    const first = pickInterleavedCheckpoint(build(), ["a", "b", "c"], 5);
    const second = pickInterleavedCheckpoint(build(), ["a", "b", "c"], 5);
    expect(first).toEqual(second);
  });

  it("defaults to count=5 when no count argument is supplied", () => {
    const map = new Map([["a", ["a1", "a2", "a3", "a4", "a5", "a6"]]]);
    expect(pickInterleavedCheckpoint(map, ["a"])).toHaveLength(5);
  });

  it("preserves the original order of ids within each concept's drill array", () => {
    const map = new Map([["a", ["a3", "a1", "a2"]]]);
    expect(pickInterleavedCheckpoint(map, ["a"], 5)).toEqual([
      "a3",
      "a1",
      "a2",
    ]);
  });

  it("spreads picks evenly when one concept has far more drill ids than others", () => {
    const map = new Map([
      ["a", ["a1", "a2", "a3", "a4", "a5"]],
      ["b", ["b1"]],
      ["c", ["c1"]],
    ]);
    expect(pickInterleavedCheckpoint(map, ["a", "b", "c"], 5)).toEqual([
      "a1",
      "b1",
      "c1",
      "a2",
      "a3",
    ]);
  });
});
