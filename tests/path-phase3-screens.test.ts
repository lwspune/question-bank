/**
 * The board path's Phase 3 screens (MENTOR_SPEC.md §4 "The last three
 * weeks"): the revision weeks' paper and rework rows, on V's card, the one
 * screen left since 2026-11-22. Lighter and More left with /me's card and
 * /account's (tests/plan-in-v.test.ts).
 *
 * Server-rendered (no jsdom in this repo): this pins the markup before effects.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { VPathCardBody } from "@/components/chat/VPathCard";
import { buildPathView } from "@/lib/path/view";
import type { PathChapter, PathPaper } from "@/lib/path/model";

const slots = (p: string) => Array.from({ length: 10 }, (_, i) => [{ id: `${p}${i}`, format: "mcq" as const }]);
const chapter = (id: string, name = `Chapter ${id}`): PathChapter => ({
  id,
  name,
  subject: "physics",
  queue: "physics",
  rank: 1,
  boardPath: `/board/cbse-12/physics/${id}`,
  top: slots(id),
  test: { mockId: `m-${id}`, slug: `cbse-12-chapter-${id}`, minutes: 23 },
});

describe("V's card: the revision weeks", () => {
  const ce = chapter("ce", "Current Electricity");
  const paper: PathPaper = {
    id: "p25",
    subject: "physics",
    year: 2025,
    label: "2025 (55/1/1)",
    minutes: 180,
    href: "/question-papers/cbse-12/physics/2025-55-1",
    slots: [[[{ id: "q1", format: "subjective" }]]],
  };
  const html = renderToStaticMarkup(
    createElement(VPathCardBody, {
        view: buildPathView({
          exam: "cbse-12",
          subjects: ["physics"],
          stream: "pcm",
          dailyMinutes: 60,
          chapters: [ce],
          states: new Map([["ce", { sheet: true, topWorked: 10, test: true, recordedDone: true }]]),
          tasks: [
            { kind: "paper", paperId: "p25", minutes: 180 },
            { kind: "revise", chapterId: "ce", questionIds: ["ce1", "ce2"], minutes: 6 },
          ],
          fixAnswered: new Set(),
          today: "2027-01-26",
          examDate: "2027-02-15",
          examOfficial: false,
          papers: [paper],
          paperStates: new Map(),
        }),
    })
  );
  it("links a whole timed paper to its page, and the rework to the chapter's Top 10", () => {
    expect(html).toContain('href="/question-papers/cbse-12/physics/2025-55-1"');
    expect(html).toContain("Write a board paper, timed");
    expect(html).toContain("Physics · 2025 (55/1/1), 3 hours");
    expect(html).toContain('href="/board/cbse-12/physics/ce#top"');
    expect(html).toContain("Rework your Review later questions");
  });
  it("names the revision weeks in the status line", () => {
    expect(html).toContain("Physics 1 of 1, revision weeks");
  });
  it("offers no Not taught yet on a paper or a rework", () => {
    expect(html).not.toContain("Not taught yet");
  });
});
