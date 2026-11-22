/**
 * The board path is called a PLAN on every screen a student sees (owner,
 * 2026-11-08: "plan is more intuitive than path"). Code, URLs, tables and
 * event names keep "path"; only words a student reads change.
 *
 * Renders each board-plan screen (server-rendered, no jsdom here) and fails if
 * "path" survives in its visible text or in a screen-reader label. Since
 * 2026-11-22 the plan's screens are V's alone: the pinned row, its card and
 * Stop my plan, plus /drill's header for the Fix task.
 */
import { describe, expect, it } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { VPathCardBody } from "@/components/chat/VPathCard";
import { VPlanPinView } from "@/components/chat/VPlanPin";
import { buildPathView } from "@/lib/path/view";
import type { ChapterState, PathChapter } from "@/lib/path/model";
import type { PathTask } from "@/lib/path/today";
import { scopeCopy } from "@/lib/drill/scope";

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

function view(opts: { state?: ChapterState; tasks?: PathTask[]; stream?: "pcm" | "pcb" } = {}) {
  return buildPathView({
    exam: "cbse-12",
    subjects: ["physics"],
    stream: opts.stream ?? "pcb",
    dailyMinutes: 45,
    chapters: [CE],
    states: new Map([["ce", opts.state ?? { sheet: true, topWorked: 4, test: false, recordedDone: false }]]),
    tasks: opts.tasks ?? [
      { kind: "fix", questionIds: ["q1", "q2", "q3"], minutes: 8 },
      { kind: "top", chapterId: "ce", minutes: 18 },
    ],
    fixAnswered: new Set(["q1"]),
    today: "2026-11-25",
    examDate: "2027-02-15",
    examOfficial: false,
    startDay: "2026-11-10",
    lastWorkDay: "2026-11-24",
    review: null,
  });
}
const allDone = () => view({ state: { sheet: true, topWorked: 10, test: true, recordedDone: true }, tasks: [] });

const html = (el: ReactElement) => renderToStaticMarkup(el);
const visibleText = (h: string) =>
  h
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
const ariaLabels = (h: string) => [...h.matchAll(/aria-label="([^"]*)"/g)].map((m) => m[1]).join(" | ");
const noPath = (h: string) => {
  expect(visibleText(h)).not.toMatch(/\bpaths?\b/i);
  expect(ariaLabels(h)).not.toMatch(/\bpaths?\b/i);
};

describe("the board plan says plan, never path", () => {
  it("V's pinned row, closed and open", () => {
    for (const open of [false, true]) {
      const h = html(createElement(VPlanPinView, { view: view(), open, onToggle: () => {}, onStop: async () => {} }));
      noPath(h);
      expect(visibleText(h)).toContain("Today's plan");
    }
    const h = html(createElement(VPlanPinView, { view: view(), open: true, onToggle: () => {}, onStop: async () => {} }));
    expect(visibleText(h)).toContain("Biology is not in the plan yet.");
    expect(visibleText(h)).toContain("Stop my plan");
  });

  it("V's card, and when everything is done", () => {
    const h = html(createElement(VPathCardBody, { view: view() }));
    noPath(h);
    expect(visibleText(h)).toContain("Today's plan");
    const done = html(createElement(VPathCardBody, { view: allDone() }));
    noPath(done);
    expect(visibleText(done)).toContain("Every chapter in your plan is done.");
  });

  it("/drill header for today's Fix task", () => {
    const copy = scopeCopy({ kind: "path" });
    expect(copy.from).toBe("From today's plan");
    expect(copy.unit).toBe("from today's plan");
  });
});
