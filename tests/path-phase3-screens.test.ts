/**
 * The board path's Phase 3 screens (MENTOR_SPEC.md §4 "Pace", "The last
 * three weeks"): Lighter and More on /me and /account, behind said honestly,
 * and the revision weeks' paper and rework rows.
 *
 * Server-rendered (no jsdom in this repo): this pins the markup before effects.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PathCard from "@/app/me/PathCard";
import PathSettingsCard from "@/app/account/PathSettingsCard";
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

const behindView = (readOnly = false) =>
  renderToStaticMarkup(
    createElement(PathCard, {
      readOnly,
      initial: {
        offer: null,
        path: buildPathView({
          exam: "cbse-12",
          subjects: ["physics"],
          stream: "pcm",
          dailyMinutes: 30,
          chapters: Array.from({ length: 40 }, (_, i) => chapter(`x${i}`)),
          states: new Map(),
          tasks: [{ kind: "sheet", chapterId: "x0", minutes: 10 }],
          fixAnswered: new Set(),
          today: "2026-12-10",
          examDate: "2027-02-15",
          examOfficial: false,
        }),
      },
    })
  );

describe("/me: the pace", () => {
  it("says behind honestly, with what More would take", () => {
    const html = behindView();
    expect(html).toMatch(/At this pace you finish on \d+ \w+\. Tap More to finish by 25 Jan \(about \d+ min a day\)\./);
    expect(html).not.toMatch(/missed|streak/i);
  });
  it("offers Lighter and More beside the minutes a day", () => {
    const html = behindView();
    expect(html).toContain("30 min a day");
    expect(html).toContain('aria-label="Lighter: 10 minutes less a day"');
    expect(html).toContain('aria-label="More: 10 minutes more a day"');
  });
  it("offers neither in the staff view", () => {
    const html = behindView(true);
    expect(html).not.toContain("Lighter");
    expect(html).not.toContain("More: 10");
  });
});

describe("/me: the revision weeks", () => {
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
    createElement(PathCard, {
      initial: {
        offer: null,
        path: buildPathView({
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
      },
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

describe("/account: the pace", () => {
  it("shows the minutes a day with Lighter and More", () => {
    const html = renderToStaticMarkup(
      createElement(PathSettingsCard, { active: { exam: "cbse-12", subjects: ["physics", "chemistry", "mathematics"], dailyMinutes: 50 }, stopped: false })
    );
    expect(html).toContain("about 50 minutes a day");
    expect(html).toContain('aria-label="Lighter: 10 minutes less a day"');
    expect(html).toContain('aria-label="More: 10 minutes more a day"');
  });
});
