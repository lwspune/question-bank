/**
 * The Progress and Map tabs. From 2026-11-08 the map sat under Progress as
 * "Chapters" (a Papers · Chapters switch); since 2026-11-23 (owner) it is the
 * fourth tab, Map, and Progress is Papers (/performance) alone.
 *
 *  - /progress (the avatar menu's "Your progress", old links) always opens
 *    Papers: sending a student with no paper to the map would light up the
 *    Map tab instead of the one they tapped.
 *  - The map follows the exam focus, as Papers already does.
 *  - Two outcome tiles on both pages: mistakes fixed, subtopics mastered.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {}, refresh: () => {}, push: () => {} }),
  usePathname: () => "/performance",
}));

import { ME_TABS } from "@/components/me/MeHeader";
import OutcomeTiles from "@/components/me/OutcomeTiles";
import { mapExamFor } from "@/lib/me/progress";
import { masteredCount } from "@/lib/performance/masteryMap";
import { buildPerformance, type PerfInput } from "@/lib/performance/compute";
import type { PerfAttempt, PerfFact } from "@/lib/performance/types";
import type { Pulse } from "@/lib/pulse/cache";

describe("the tabs", () => {
  it("are Home · Review · Progress · Map, with Account in the avatar menu", () => {
    expect(ME_TABS.map((t) => t.label)).toEqual(["Home", "Review", "Progress", "Map"]);
    expect(ME_TABS.find((t) => t.key === "progress")?.href).toBe("/progress");
    expect(ME_TABS.find((t) => t.key === "map")?.href).toBe("/me/map");
  });

  it("each page lights up its own tab, with no Papers · Chapters switch left", () => {
    const perf = readFileSync(join(process.cwd(), "src/app/performance/page.tsx"), "utf8");
    const map = readFileSync(join(process.cwd(), "src/app/me/map/page.tsx"), "utf8");
    expect(perf).toContain('active="progress"');
    expect(map).toContain('active="map"');
    for (const page of [perf, map]) expect(page).not.toContain("ProgressSwitch");
  });

  it("the avatar menu links Your progress", () => {
    const menu = readFileSync(join(process.cwd(), "src/components/UserMenu.tsx"), "utf8");
    expect(menu).toContain('href="/progress"');
    expect(menu).toContain("Your progress");
    expect(menu).not.toContain("Your performance");
  });
});

describe("/progress: where the old Progress address opens", () => {
  it("always Papers, never the map (the map has its own tab)", () => {
    const page = readFileSync(join(process.cwd(), "src/app/progress/page.tsx"), "utf8");
    expect(page).toMatch(/redirect\("\/performance"\)/);
    expect(page).not.toContain("/me/map");
  });
});

describe("mapExamFor: the map follows the exam focus", () => {
  it("a link that names an exam wins, with the exam row", () => {
    expect(mapExamFor({ laneExams: ["NDA", "CDS"], focusExamName: "CDS", urlExam: "NDA" })).toEqual({ exam: "NDA", showExamRow: true });
  });
  it("the focus exam opens, and the header's chips stand in for the exam row", () => {
    expect(mapExamFor({ laneExams: ["NDA", "CDS"], focusExamName: "CDS", urlExam: undefined })).toEqual({ exam: "CDS", showExamRow: false });
  });
  it("no focus, or a focus with nothing answered: the map's own default, with the row", () => {
    expect(mapExamFor({ laneExams: ["NDA"], focusExamName: null, urlExam: undefined })).toEqual({ exam: undefined, showExamRow: true });
    expect(mapExamFor({ laneExams: ["NDA"], focusExamName: "CDS", urlExam: undefined })).toEqual({ exam: undefined, showExamRow: true });
  });
});

describe("masteredCount: the map's green dots, every exam", () => {
  const NOW = new Date("2026-11-08T12:00:00Z");
  const at = new Date(NOW.getTime() - 2 * 86_400_000).toISOString();
  const attempt: PerfAttempt = {
    attemptId: "A1", mockSlug: "m", mockTitle: "NDA Maths", examName: "NDA", paperCode: "maths", pyqYear: 2025,
    source: "pyq", scope: "full", sections: [{ key: "maths", label: "Mathematics", count: 4 }], totalQuestions: 4,
    totalMarks: 10, durationSecs: 9000, status: "submitted", startedAt: at, submittedAt: at, score: 10, maxScore: 10,
  };
  const fact = (p: number, r: PerfFact["r"], t: number): PerfFact => ({
    a: "A1", p, q: `q${p}`, s: 0, c: 0, t, d: "MODERATE", f: "mcq", k: "A", kn: null, r, rn: null,
    g: false, m: 2.5, nm: -0.83, ts: 30, rc: true,
  });
  const input = (facts: PerfFact[]): PerfInput => ({
    userId: "u1",
    attempts: [attempt],
    facts,
    dims: { subjects: ["Mathematics"], chapters: ["Matrices"], subtopics: ["Determinants", "Inverse"] },
    weightage: [
      { exam: "NDA", subject: "Mathematics", chapter: "Matrices", subtopic: "Determinants", q: 20 },
      { exam: "NDA", subject: "Mathematics", chapter: "Matrices", subtopic: "Inverse", q: 20 },
    ],
  });

  it("counts a subtopic answered right often enough", () => {
    const perf = buildPerformance(input([fact(1, "A", 0), fact(2, "A", 0), fact(3, "A", 0), fact(4, "B", 1)]), NOW);
    expect(masteredCount(perf.lanes)).toBe(1);
  });

  it("is zero with nothing answered", () => {
    expect(masteredCount([])).toBe(0);
  });
});

describe("OutcomeTiles", () => {
  const pulse = { due: 3, week: { done: 0, goal: null }, totals: { answered: 900, right: 500, fixed: 19 } } as Pulse;

  it("shows what got better: mistakes fixed and subtopics mastered", () => {
    const html = renderToStaticMarkup(createElement(OutcomeTiles, { mastery: { mastered: 22, of: 40 }, pulse }));
    expect(html).toContain("19");
    expect(html).toContain("mistakes fixed");
    expect(html).toContain("22");
    expect(html).toContain("of 40");
    expect(html).toContain("subtopics mastered");
    expect(html).not.toContain("answered");
  });

  it("says how many are still to fix when some wait, counting every exam's (2026-11-10)", () => {
    const html = renderToStaticMarkup(
      createElement(OutcomeTiles, { mastery: null, pulse: { ...pulse, chapterDue: { c1: 4, c2: 3 } } })
    );
    expect(html).toContain("fixed · 7 to go");
    expect(html).not.toContain("subtopics mastered");
  });
});

describe("the international site's map", () => {
  it("keeps its own header there: intl has no Home, Review or Papers to tab to", () => {
    const page = readFileSync(join(process.cwd(), "src/app/me/map/page.tsx"), "utf8");
    expect(page).toMatch(/intl \? Promise\.resolve\(null\) : getExamIdMap\(\)/);
    expect(page).toContain("Your map");
  });
});
