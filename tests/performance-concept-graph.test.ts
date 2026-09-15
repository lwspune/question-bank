/**
 * The concept prerequisite graph and the "Where to focus" view-model built on
 * it — the one piece genuinely imported from nda-tracker, because faculty-
 * curated prerequisites are not recoverable from any corpus.
 *
 * Pure unit tests only. The companion check that every graph node is a REAL
 * live chapter is a prod-contract suite — performance-concept-graph-taxonomy —
 * because `npm test` targets the seeded test project, whose taxonomy is three
 * chapters, not the bank this graph describes.
 */
import { describe, it, expect } from "vitest";
import {
  CHAPTER_PREREQS,
  getPrerequisites,
  getRootCauseChain,
  getReadyToLearn,
  validateConceptGraph,
} from "@/lib/performance/conceptGraph";
import { buildFocusAreas, accuracyMapFor } from "@/lib/performance/focusAreas";
import type { ChapterRow } from "@/lib/performance/compute";

/** A chapter row carrying just what the focus builder reads. */
function chapter(name: string, weightedScore: number, judged = 10): ChapterRow {
  return {
    chapter: name,
    subtopics: [],
    total: judged,
    answered: judged,
    correct: Math.round(weightedScore * judged),
    wrong: judged - Math.round(weightedScore * judged),
    seenBlank: 0,
    neverReached: 0,
    judged,
    thin: judged < 3,
    accuracy: Math.round(weightedScore * 100),
    weightedScore,
    trend: "stable",
    medianSecs: 30,
    timedCount: judged,
    wrongQuestionIds: [],
    seenBlankQuestionIds: [],
  };
}

// ── graph integrity ─────────────────────────────────────────────────────────

describe("concept graph integrity", () => {
  it("is acyclic", () => {
    expect(validateConceptGraph(CHAPTER_PREREQS).cycles).toEqual([]);
  });

  it("detects a cycle when one is introduced", () => {
    // Fault-injected: a validator that cannot fail proves nothing.
    const bad = { A: ["B"], B: ["C"], C: ["A"] };
    expect(validateConceptGraph(bad).cycles.length).toBeGreaterThan(0);
  });

  it("reports nodes outside the canonical chapter list", () => {
    const r = validateConceptGraph({ Functions: ["Nonexistent Chapter"] }, ["Functions"]);
    expect(r.unknownNodes).toEqual(["Nonexistent Chapter"]);
  });

  it("treats a chapter with no entry as foundational", () => {
    expect(getPrerequisites("Statistics")).toEqual([]);
  });
});

// ── root cause ──────────────────────────────────────────────────────────────

describe("getRootCauseChain", () => {
  it("walks past a weak chapter to the deepest weak prerequisite", () => {
    // The whole point: "you are weak in Definite Integration, but the real gap
    // is Indefinite Integration" — advice a per-chapter accuracy bar cannot give.
    const acc = {
      "Definite Integration": 0.3,
      "Indefinite Integration": 0.2,
      Differentiation: 0.8,
    };
    const rows = getRootCauseChain(acc);
    const di = rows.find((r) => r.chapter === "Definite Integration")!;
    expect(di.root).toBe("Indefinite Integration");
    expect(di.isRoot).toBe(false);
  });

  it("stops at a chapter whose prerequisites are strong", () => {
    const rows = getRootCauseChain({ "Definite Integration": 0.3, "Indefinite Integration": 0.9 });
    expect(rows.find((r) => r.chapter === "Definite Integration")!.isRoot).toBe(true);
  });

  it("never treats an UNTESTED prerequisite as the root cause", () => {
    // null is "we have not looked", not "they are bad at it". Blaming an
    // untested chapter would send the student to revise something on no evidence.
    const rows = getRootCauseChain({ "Definite Integration": 0.3, "Indefinite Integration": null });
    expect(rows.find((r) => r.chapter === "Definite Integration")!.root).toBe(
      "Definite Integration"
    );
  });

  it("ranks the weakest root first", () => {
    const rows = getRootCauseChain({ Conics: 0.4, Circles: 0.45, Lines: 0.1 });
    expect(rows[0].root).toBe("Lines");
  });
});

// ── ready to learn ──────────────────────────────────────────────────────────

describe("getReadyToLearn", () => {
  it("unlocks a chapter once every prerequisite is mastered", () => {
    const ready = getReadyToLearn({ "Trigonometric Identities": 0.9 }).map((r) => r.chapter);
    expect(ready).toContain("Inverse Trigonometry");
    expect(ready).toContain("Height & Distance");
  });

  it("does NOT count an untested prerequisite as satisfied", () => {
    // "Ready to learn" asserts the groundwork is demonstrably in place.
    const ready = getReadyToLearn({ Conics: 0.2 }).map((r) => r.chapter);
    expect(ready).not.toContain("Conics"); // Circles is untested
  });

  it("omits a chapter already mastered", () => {
    expect(getReadyToLearn({ Statistics: 0.95 }).map((r) => r.chapter)).not.toContain("Statistics");
  });
});

// ── focus areas ─────────────────────────────────────────────────────────────

describe("buildFocusAreas", () => {
  it("is null for any subject without an authored graph", () => {
    // Inventing prerequisites for Physics would be fabrication, not a feature.
    expect(buildFocusAreas("NDA", "Physics", [chapter("Optics", 0.2)])).toBeNull();
    expect(buildFocusAreas("CDS", "Mathematics", [chapter("Conics", 0.2)])).toBeNull();
  });

  it("groups weak chapters under one root and links to real vault routes", () => {
    const rows = [
      chapter("Definite Integration", 0.3),
      chapter("Indefinite Integration", 0.2),
      chapter("Applications of Integration", 0.25),
    ];
    const focus = buildFocusAreas("NDA", "Mathematics", rows)!;
    expect(focus.startHere[0].chapter).toBe("Indefinite Integration");
    expect(focus.startHere[0].unlocks).toContain("Definite Integration");
    // Internal redirects we own, not cross-origin guesses.
    expect(focus.startHere[0].learnHref).toBe("/go/learn?chapter=Indefinite%20Integration");
    expect(focus.startHere[0].practiceHref).toContain("/go/practice?");
    expect(focus.startHere[0].practiceHref).toContain("exam=NDA");
  });

  it("will not call a chapter weak on one or two answers", () => {
    // The departure from nda-tracker, forced by this bank's data: a proctored
    // OMR student attempts most of the paper; the median attempt here answers
    // 36% of it, so chapter rows routinely rest on a single question.
    const thin = [chapter("Indefinite Integration", 0.0, 2)];
    expect(accuracyMapFor(thin)["Indefinite Integration"]).toBeNull();
    expect(buildFocusAreas("NDA", "Mathematics", thin)!.startHere).toEqual([]);

    const solid = [chapter("Indefinite Integration", 0.0, 3)];
    expect(buildFocusAreas("NDA", "Mathematics", solid)!.startHere).toHaveLength(1);
  });
});
