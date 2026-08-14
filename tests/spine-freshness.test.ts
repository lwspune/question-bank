import { describe, expect, it } from "vitest";
import {
  diffSpine,
  isDrifted,
  missingPyq,
  type SpineEntry,
} from "../scripts/lib/spineFreshness";

const e = (chapter: string, subtopic: string, pyq: number): SpineEntry => ({
  chapter,
  subtopic,
  pyq,
});

describe("diffSpine", () => {
  it("reports no drift when the spine matches the bank", () => {
    const rows = [e("Amines", "Basicity", 12), e("Polymers", "Copolymers", 3)];
    const drift = diffSpine(rows, rows);
    expect(drift).toEqual({ missing: [], stale: [], changed: [] });
    expect(isDrifted(drift)).toBe(false);
  });

  // The JEE Chemistry case: subtopics the corpus surfaced that the spine has
  // never seen. They render nowhere, so the page cannot even show them as
  // unassessed — which is why this is the finding that matters most.
  it("finds subtopics the bank has and the spine does not", () => {
    const drift = diffSpine(
      [e("Amines", "Basicity", 12)],
      [e("Amines", "Basicity", 12), e("Solid State", "Unit Cells", 10)],
    );
    expect(drift.missing).toEqual([e("Solid State", "Unit Cells", 10)]);
    expect(missingPyq(drift)).toBe(10);
    expect(isDrifted(drift)).toBe(true);
  });

  it("finds spine rows the bank no longer has", () => {
    const drift = diffSpine(
      [e("Amines", "Basicity", 12), e("Polymers", "Copolymers", 3)],
      [e("Amines", "Basicity", 12)],
    );
    expect(drift.stale).toEqual([e("Polymers", "Copolymers", 3)]);
  });

  it("finds a count that moved under a row that still exists", () => {
    const drift = diffSpine([e("Amines", "Basicity", 12)], [e("Amines", "Basicity", 40)]);
    expect(drift.changed).toEqual([
      { chapter: "Amines", subtopic: "Basicity", spinePyq: 12, bankPyq: 40 },
    ]);
    expect(drift.missing).toEqual([]);
    expect(missingPyq(drift)).toBe(0);
  });

  // Six Chemistry subtopic names live in two chapters each ("Isomerism" in both
  // Coordination Compounds and Organic Chemistry). Keying on the name alone
  // would pair them off and report no drift where there is plenty.
  it("keys on (chapter, subtopic), not the subtopic name", () => {
    const drift = diffSpine(
      [e("Coordination Compounds", "Isomerism", 5)],
      [e("Organic Chemistry", "Isomerism", 9)],
    );
    expect(drift.missing).toEqual([e("Organic Chemistry", "Isomerism", 9)]);
    expect(drift.stale).toEqual([e("Coordination Compounds", "Isomerism", 5)]);
    expect(drift.changed).toEqual([]);
  });

  it("reports every drift kind at once rather than stopping at the first", () => {
    const drift = diffSpine(
      [e("A", "keep", 1), e("A", "gone", 2), e("A", "moved", 3)],
      [e("A", "keep", 1), e("A", "moved", 30), e("A", "new", 4)],
    );
    expect(drift.missing.map((r) => r.subtopic)).toEqual(["new"]);
    expect(drift.stale.map((r) => r.subtopic)).toEqual(["gone"]);
    expect(drift.changed.map((r) => r.subtopic)).toEqual(["moved"]);
  });

  it("treats an empty spine as wholly drifted rather than as agreement", () => {
    const drift = diffSpine([], [e("A", "x", 1)]);
    expect(isDrifted(drift)).toBe(true);
    expect(drift.missing).toHaveLength(1);
  });
});
