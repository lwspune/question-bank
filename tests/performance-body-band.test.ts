/**
 * The performance summary band (owner, 2026-11-08): Steadiness is removed. It
 * said how many points a student's papers spread ("±10 points between
 * papers"), which tells a student nothing to do. The band is shared by the
 * student's /performance and the staff view of a student, so both lose it:
 * a student never sees fewer numbers than their teacher, and the reverse holds
 * too.
 *
 * Rendered to markup (no jsdom here), from two marked papers, which is what
 * made Steadiness appear.
 */
import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PerformanceBody from "@/components/performance/PerformanceBody";
import { buildPerformance, type PerfInput } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";
import type { PerfAttempt, PerfFact } from "@/lib/performance/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {}, refresh: () => {}, push: () => {} }),
  usePathname: () => "/performance",
  useSearchParams: () => new URLSearchParams(),
}));

const NOW = new Date("2026-11-08T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000).toISOString();

function attempt(id: string, ago: number, score: number): PerfAttempt {
  return {
    attemptId: id,
    mockSlug: `nda-maths-${id}`,
    mockTitle: `NDA Mathematics ${id}`,
    examName: "NDA",
    paperCode: "maths",
    pyqYear: 2025,
    source: "pyq",
    scope: "full",
    sections: [{ key: "maths", label: "Mathematics", count: 4 }],
    totalQuestions: 4,
    totalMarks: 10,
    durationSecs: 9000,
    status: "submitted",
    startedAt: daysAgo(ago),
    submittedAt: daysAgo(ago),
    score,
    maxScore: 10,
  };
}

function fact(a: string, p: number, r: PerfFact["r"]): PerfFact {
  return {
    a, p, q: `${a}-q${p}`, s: 0, c: 0, t: 0,
    d: "MODERATE", f: "mcq",
    k: "A", kn: null, r, rn: null,
    g: false, m: 2.5, nm: -0.83, ts: 30, rc: true,
  };
}

function render(): string {
  // Two papers far apart in score, so the spread between them is real.
  const input: PerfInput = {
    userId: "u1",
    attempts: [attempt("A1", 10, 2.5), attempt("A2", 2, 10)],
    facts: [
      fact("A1", 1, "A"), fact("A1", 2, "B"), fact("A1", 3, "B"), fact("A1", 4, "B"),
      fact("A2", 1, "A"), fact("A2", 2, "A"), fact("A2", 3, "A"), fact("A2", 4, "A"),
    ],
    dims: { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola"] },
    weightage: [{ exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Parabola", q: 40 }],
  };
  const perf = buildPerformance(input, NOW);
  const nav = buildLaneNav(perf.lanes, perf.summary.latest?.exam ?? null, {});
  return renderToStaticMarkup(createElement(PerformanceBody, { perf, nav, basePath: "/performance", viewer: "self" }));
}

describe("the performance summary band", () => {
  it("has no Steadiness, even with two papers to compare", () => {
    const html = render();
    expect(html).not.toContain("Steadiness");
    expect(html).not.toContain("between papers");
  });

  it("keeps the other two facts (until the Progress tab rework)", () => {
    const html = render();
    expect(html).toContain("Last paper");
    expect(html).toContain("Answers right");
  });
});
