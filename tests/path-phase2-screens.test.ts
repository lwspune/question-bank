/**
 * The board path's Phase 2 screens (MENTOR_SPEC.md §4 "V's part"):
 * - /me's card opens on "Pick up here" after a gap and shows the weekly
 *   review the first days of a new week;
 * - V's "My plan for today" card: today's tasks linked, the status line, the
 *   review, and the way to /me;
 * - the /board chapter line: this chapter's parts for a path student, the
 *   offer for a Class 12 student without a path.
 *
 * Server-rendered (no jsdom in this repo): this pins the markup before effects.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PathCard from "@/app/me/PathCard";
import { VPathCardBody } from "@/components/chat/VPathCard";
import { BoardPathLineView, BoardPathOffer } from "@/components/path/BoardPathLine";
import { buildPathView, chapterLine } from "@/lib/path/view";
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

const meCard = (v: ReturnType<typeof view>) => renderToStaticMarkup(createElement(PathCard, { initial: { path: v, offer: null } }));

describe("/me: pick up here and the weekly review", () => {
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
  const html = renderToStaticMarkup(createElement(VPathCardBody, { view: view({ review: ["A new week on your path.", "Next: Nuclei."], lastWorkDay: "2026-11-20" }) }));
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
  it("leads to the full card on /me", () => {
    expect(html).toContain('href="/me"');
  });
});

describe("/board: the path line on a chapter page", () => {
  it("shows this chapter's parts, the Top 10's count and today's part", () => {
    const line = chapterLine(CE, { sheet: true, topWorked: 4, test: false, recordedDone: false }, [{ kind: "top", chapterId: "ce", minutes: 18 }]);
    const html = renderToStaticMarkup(createElement(BoardPathLineView, { line }));
    expect(html).toContain("On your path");
    expect(html).toContain("Revision sheet");
    expect(html).toContain("4 of 10");
    expect(html).toContain("Today: work the Top 10 PYQs");
    // Done parts say so to a screen reader, not by colour alone.
    expect(html).toContain("Revision sheet: done");
    expect(html).toContain("Chapter test: not done yet");
  });
  it("says the chapter is done once it is", () => {
    const line = chapterLine(CE, { sheet: true, topWorked: 10, test: true, recordedDone: true }, []);
    expect(renderToStaticMarkup(createElement(BoardPathLineView, { line }))).toContain("Chapter done");
  });
  it("offers the path to a Class 12 student without one, leading to /me", () => {
    const html = renderToStaticMarkup(createElement(BoardPathOffer));
    expect(html).toContain("Finish every chapter before your boards");
    expect(html).toContain('href="/me"');
  });
});
