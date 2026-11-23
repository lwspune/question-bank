/**
 * The board path's Phase 2 screens (MENTOR_SPEC.md §4 "V's part"), on the
 * one screen left since 2026-11-22, V's "My plan for today" card (the /me
 * card and the /board line were retired; tests/plan-in-v.test.ts):
 * - it opens on "Pick up here" after a gap and shows the weekly review the
 *   first days of a new week;
 * - today's tasks linked, the status line and the review; no way to /me.
 *
 * Server-rendered (no jsdom in this repo): this pins the markup before effects.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { VPathCardBody } from "@/components/chat/VPathCard";
import { buildPathView } from "@/lib/path/view";
import type { PathChapter } from "@/lib/path/model";

const slots = (p: string) => Array.from({ length: 10 }, (_, i) => [{ id: `${p}${i}`, format: "mcq" as const }]);
const CE: PathChapter = {
  id: "ce",
  name: "Current Electricity",
  subject: "physics",
  queue: "physics",
  rank: 1,
  boardPath: "/board/cbse-12/physics/current-electricity",
  top: slots("ce"),
  test: { mockId: "m-ce", slug: "cbse-12-chapter-ce", minutes: 23 },
};

function view(over: { review?: string[] | null; lastWorkDay?: string | null } = {}) {
  return buildPathView({
    exam: "cbse-12",
    subjects: ["physics"],
    stream: "pcm",
    dailyMinutes: 45,
    chapters: [CE],
    states: new Map([["ce", { sheet: true, topWorked: 4, test: false, recordedDone: false }]]),
    tasks: [
      { kind: "top", chapterId: "ce", minutes: 18 },
      { kind: "test", chapterId: "ce", minutes: 23 },
    ],
    fixAnswered: new Set(),
    today: "2026-11-25",
    examDate: "2027-02-15",
    examOfficial: false,
    startDay: "2026-11-10",
    lastWorkDay: over.lastWorkDay === undefined ? "2026-11-24" : over.lastWorkDay,
    review: over.review ?? null,
  });
}

const meCard = (v: ReturnType<typeof view>) => renderToStaticMarkup(createElement(VPathCardBody, { view: v }));

describe("V's card: pick up here and the weekly review", () => {
  it("opens on 'Pick up here' after a gap, naming the chapter and its part, never what was missed", () => {
    const html = meCard(view({ lastWorkDay: "2026-11-20" }));
    expect(html).toContain("Welcome back.");
    expect(html).toContain("Pick up here: Current Electricity, Top 10");
    expect(html).not.toMatch(/missed/i);
  });
  it("shows no pick-up line the day after work", () => {
    expect(meCard(view())).not.toContain("Pick up here");
  });
  it("shows the weekly review's lines under 'Your week'", () => {
    const html = meCard(view({ review: ["Last week: 1 chapter done (Atoms).", "Next: Nuclei."] }));
    expect(html).toContain("Your week");
    expect(html).toContain("Last week: 1 chapter done (Atoms).");
    expect(html).toContain("Next: Nuclei.");
  });
  it("shows no review block outside the review days", () => {
    expect(meCard(view())).not.toContain("Your week");
  });
});

describe("V: My plan for today", () => {
  const html = renderToStaticMarkup(createElement(VPathCardBody, { view: view({ review: ["A new week of your plan.", "Next: Nuclei."], lastWorkDay: "2026-11-20" }) }));
  it("links each of today's tasks to its work", () => {
    expect(html).toContain('href="/board/cbse-12/physics/current-electricity#top"');
    expect(html).toContain('href="/mock/cbse-12-chapter-ce"');
    expect(html).toContain("Work the Top 10 PYQs");
  });
  it("carries the status line, the pick-up line and the review", () => {
    expect(html).toContain("Physics 0 of 1");
    expect(html).toContain("Pick up here: Current Electricity, Top 10");
    expect(html).toContain("Next: Nuclei.");
  });
  it("never leads to /me, which no longer shows the plan", () => {
    expect(html).not.toContain('href="/me"');
  });
});
