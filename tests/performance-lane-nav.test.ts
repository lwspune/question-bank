/**
 * The (exam, subject) navigation on /dashboard/students/[id]/performance.
 *
 * This was page logic — `lanes.find(...) ?? lanes[0]` inline in the route — and
 * it encoded a rule nobody had chosen: the default lane was whichever the
 * student had ANSWERED most of. On a multi-exam student that is often not the
 * exam they last sat. Measured on production, 3 of the 12 students who span
 * more than one exam would land on the wrong one under that rule.
 *
 * So the default is now RECENCY (the exam of their most recent counted
 * attempt), and the rule lives here where it can be pinned.
 *
 * Lanes come from buildPerformance rather than hand-built literals: the nav's
 * whole job is to re-group lanes that the core already sorted, and a fixture
 * that invents its own order would not test that.
 */
import { describe, it, expect } from "vitest";
import { buildPerformance, type PerfInput } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";
import type { PerfAttempt, PerfFact } from "@/lib/performance/types";

const DAY = 86_400_000;
const NOW = new Date("2026-09-15T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * DAY).toISOString();

function attempt(over: Partial<PerfAttempt>): PerfAttempt {
  return {
    attemptId: "A1",
    mockSlug: "m1",
    mockTitle: "Paper",
    examName: "NDA",
    paperCode: "p",
    pyqYear: 2025,
    source: "pyq",
    scope: "full",
    sections: [],
    totalQuestions: 4,
    totalMarks: 10,
    durationSecs: 9000,
    status: "submitted",
    startedAt: daysAgo(1),
    submittedAt: daysAgo(1),
    score: 5,
    maxScore: 10,
    ...over,
  };
}

function fact(over: Partial<PerfFact>): PerfFact {
  return {
    a: "A1", p: 1, q: "q1", s: 0, c: 0, t: 0,
    d: "MODERATE", f: "mcq",
    k: "A", kn: null, r: "A", rn: null,
    g: false, m: 2.5, nm: -0.83, ts: 30, rc: true,
    ...over,
  };
}

/**
 * Two exams, deliberately arranged so busiest ≠ most recent — the production
 * shape that exposed the old default.
 *
 *   CDS (older sitting)  : 4 answered in Physics  ← busiest
 *   NDA (recent sitting) : 2 answered in Mathematics  ← most recent
 */
function twoExamInput(): PerfInput {
  const attempts = [
    attempt({ attemptId: "cds", mockSlug: "cds-1", examName: "CDS", startedAt: daysAgo(30), totalQuestions: 4 }),
    attempt({ attemptId: "nda", mockSlug: "nda-1", examName: "NDA", startedAt: daysAgo(1), totalQuestions: 2 }),
  ];
  const facts = [
    // CDS · Physics — 4 answered
    fact({ a: "cds", q: "c1", p: 1, s: 1, c: 1, t: 1 }),
    fact({ a: "cds", q: "c2", p: 2, s: 1, c: 1, t: 1 }),
    fact({ a: "cds", q: "c3", p: 3, s: 1, c: 1, t: 1 }),
    fact({ a: "cds", q: "c4", p: 4, s: 1, c: 1, t: 1 }),
    // NDA · Mathematics — 2 answered
    fact({ a: "nda", q: "n1", p: 1, s: 0, c: 0, t: 0 }),
    fact({ a: "nda", q: "n2", p: 2, s: 0, c: 0, t: 0 }),
  ];
  return {
    userId: "u1",
    attempts,
    facts,
    dims: {
      subjects: ["Mathematics", "Physics"],
      chapters: ["Conics", "Optics"],
      subtopics: ["Parabola", "Lenses"],
    },
    weightage: [],
  };
}

function navFor(want: { exam?: string; subject?: string } = {}) {
  const perf = buildPerformance(twoExamInput(), NOW);
  return buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, want);
}

describe("buildLaneNav — exam axis", () => {
  it("lists each exam once, with its own totals", () => {
    const nav = navFor();
    expect(nav.exams.map((e) => e.exam).sort()).toEqual(["CDS", "NDA"]);
    expect(nav.exams.find((e) => e.exam === "CDS")?.judged).toBe(4);
    expect(nav.exams.find((e) => e.exam === "NDA")?.judged).toBe(2);
  });

  it("orders the exam row busiest-first, independent of which is selected", () => {
    // The ROW order is stability, not selection: CDS has more answered, so it
    // leads even though NDA is the default. A row that reordered itself on
    // every click would move the target the reader just aimed at.
    expect(navFor().exams.map((e) => e.exam)).toEqual(["CDS", "NDA"]);
    expect(navFor({ exam: "NDA" }).exams.map((e) => e.exam)).toEqual(["CDS", "NDA"]);
  });

  it("DEFAULTS to the most recent exam, not the busiest", () => {
    const nav = navFor();
    expect(nav.selectedExam).toBe("NDA");
    expect(nav.selected?.exam).toBe("NDA");
  });

  it("honours an explicit exam over the recency default", () => {
    const nav = navFor({ exam: "CDS" });
    expect(nav.selectedExam).toBe("CDS");
    expect(nav.selected?.subject).toBe("Physics");
  });

  it("falls back to the busiest exam when recency names one with no lane", () => {
    // A student whose latest attempt was abandoned under the engagement floor
    // has a `latest` exam that produced no lane. Falling through must not
    // leave the page with nothing selected.
    const perf = buildPerformance(twoExamInput(), NOW);
    const nav = buildLaneNav(perf.lanes, "NEET", {});
    expect(nav.selectedExam).toBe("CDS");
    expect(nav.selected).not.toBeNull();
  });

  it("ignores an unknown exam in the URL rather than rendering an empty page", () => {
    const nav = navFor({ exam: "Astrophysics" });
    expect(nav.selectedExam).toBe("NDA");
    expect(nav.selected).not.toBeNull();
  });
});

describe("buildLaneNav — subject axis", () => {
  it("shows only the selected exam's subjects", () => {
    expect(navFor({ exam: "CDS" }).subjects.map((l) => l.subject)).toEqual(["Physics"]);
    expect(navFor({ exam: "NDA" }).subjects.map((l) => l.subject)).toEqual(["Mathematics"]);
  });

  it("keeps a subject only when it belongs to the selected exam", () => {
    // Asking for NDA · Physics — a real subject, but of the other exam — must
    // not silently hand back the CDS lane under an NDA heading.
    const nav = navFor({ exam: "NDA", subject: "Physics" });
    expect(nav.selected?.exam).toBe("NDA");
    expect(nav.selected?.subject).toBe("Mathematics");
  });

  it("defaults the subject to the busiest lane of the exam", () => {
    // Recency picks the EXAM; it cannot rank subjects, because one paper spans
    // many of them. Within an exam the busiest lane is the most informative.
    const perf = buildPerformance(twoExamInput(), NOW);
    const nav = buildLaneNav(perf.lanes, "CDS", {});
    expect(nav.selected?.subject).toBe("Physics");
  });
});

describe("buildLaneNav — degenerate inputs", () => {
  it("returns a well-formed empty nav for a student with no lanes", () => {
    const nav = buildLaneNav([], null, {});
    expect(nav.exams).toEqual([]);
    expect(nav.subjects).toEqual([]);
    expect(nav.selected).toBeNull();
    expect(nav.selectedExam).toBeNull();
  });

  it("reports a single-exam student as one exam, so the row can be suppressed", () => {
    const perf = buildPerformance(
      {
        userId: "u1",
        attempts: [attempt({ attemptId: "A1", mockSlug: "m1" })],
        facts: [fact({ a: "A1" })],
        dims: { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola"] },
        weightage: [],
      },
      NOW
    );
    expect(buildLaneNav(perf.lanes, "NDA", {}).exams).toHaveLength(1);
  });
});
