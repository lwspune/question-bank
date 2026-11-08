/**
 * The student's own Home renders its numbers in the server's HTML (2026-11-08):
 * "Fix N mistakes", the progress tiles and Weak spots, from the pulse /me
 * builds alongside its other reads. Before, the cards waited for the page's
 * JavaScript to start and then fetched them (about 1.6 s + 0.4 s on a laptop),
 * so the page's main button arrived last.
 *
 * Server-rendered markup (no jsdom here): what the student sees before any
 * script has run.
 */
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MeView from "@/app/me/MeView";
import type { MeData } from "@/lib/me/load";
import type { Pulse } from "@/lib/pulse/cache";
import { resolveFocus } from "@/lib/me/focus";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: () => {}, refresh: () => {}, push: () => {} }),
  usePathname: () => "/me",
}));

const data: MeData = {
  greeting: "Good evening",
  name: "Riya",
  focus: resolveFocus({ targets: ["nda"], saved: null, recent: null }),
  examLinks: [{ slug: "nda", label: "NDA", href: "/mock/exam/nda" }] as MeData["examLinks"],
  suggestedExam: null,
  resultCheck: null,
  suggestedName: "",
  stage: null,
  showStageNudge: false,
  pushPromptedAt: "2026-11-01T00:00:00Z",
  resume: undefined,
  cont: undefined,
  mockHref: "/mock/exam/nda",
  notesHref: "/notes/nda",
  weekly: { done: 2, goal: 4 },
  assigned: [],
  attempts: [],
  mocks: { completed: 0, bestPct: null, resumeAttempt: null } as unknown as MeData["mocks"],
  continueItems: [],
  showNps: false,
  tutorPriceAsk: null,
  pathCard: { path: null, offer: null },
};

const PULSE: Pulse = {
  due: 23,
  week: { done: 3, goal: 4 },
  exam: null,
  totals: { answered: 1234, right: 800, fixed: 11 },
  weak: [{ chapterId: "c1", name: "Probability", place: "NDA Maths", due: 9 }],
  chapterDue: { c1: 9 },
};

describe("MeView, the student's own Home with the server's pulse", () => {
  const out = renderToStaticMarkup(createElement(MeView, { data, vapidKey: "", initialPulse: PULSE }));

  it("puts the main action in the HTML", () => {
    expect(out).toContain("Fix 23 mistakes");
  });

  it("puts Weak spots in the HTML", () => {
    expect(out).toContain("Probability");
  });

  it("keeps no number tiles or week ring on Home (they moved to Progress, 2026-11-08)", () => {
    expect(out).not.toContain("1,234");
    expect(out).not.toContain("3/4");
  });

  it("stays the student's own page: the controls that save are there", () => {
    expect(out).toContain("Not you?");
  });
});

/**
 * "Start next" (2026-11-09): the highest-value chapters not started, each with
 * its weight in a real paper, the owner's format.
 */
describe("MeView, Start next", () => {
  const startNext = [
    {
      chapterId: "c9",
      chapter: "Matrices & Determinants",
      subject: "Mathematics",
      exam: "NDA",
      paperCode: "maths",
      papers: 19,
      qPerPaper: 9.5,
      marksPerPaper: 23.8,
      paperMarks: 300,
    },
  ];

  it("shows the chapter, its weight in a paper and a Start link", () => {
    const html = renderToStaticMarkup(createElement(MeView, { data: { ...data, startNext }, vapidKey: "", initialPulse: PULSE }));
    expect(html).toContain("Start next");
    expect(html).toContain("Matrices &amp; Determinants");
    expect(html).toContain("about 10 questions a paper · 24 of 300 marks (8%)");
    expect(html).toContain('href="/go/practice?exam=NDA&amp;subject=Mathematics&amp;chapter=Matrices+%26+Determinants"');
  });

  it("is not there with nothing to start", () => {
    const html = renderToStaticMarkup(createElement(MeView, { data: { ...data, startNext: [] }, vapidKey: "", initialPulse: PULSE }));
    expect(html).not.toContain("Start next");
  });
});
