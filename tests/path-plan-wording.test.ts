/**
 * The board path is called a PLAN on every screen a student sees (owner,
 * 2026-11-08: "plan is more intuitive than path"). Code, URLs, tables and
 * event names keep "path"; only words a student reads change.
 *
 * Renders each board-plan screen (server-rendered, no jsdom here) and fails if
 * "path" survives in its visible text or in a screen-reader label.
 */
import { describe, expect, it } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PathCard from "@/app/me/PathCard";
import PathSettingsCard from "@/app/account/PathSettingsCard";
import { VPathCardBody } from "@/components/chat/VPathCard";
import { BoardPathLineView, BoardPathOffer } from "@/components/path/BoardPathLine";
import { buildPathView, chapterLine } from "@/lib/path/view";
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
  it("/me Today card", () => {
    const h = html(createElement(PathCard, { initial: { path: view(), offer: null } }));
    noPath(h);
    expect(visibleText(h)).toContain("Today's plan");
    expect(visibleText(h)).toContain("Biology is not in the plan yet.");
    expect(visibleText(h)).toContain("From chapters in your plan, 1 of 3 done");
  });

  it("/me Today card with every chapter done", () => {
    const h = html(createElement(PathCard, { initial: { path: allDone(), offer: null } }));
    noPath(h);
    expect(visibleText(h)).toContain("Every chapter in your plan is done.");
  });

  it("/me start card, stream known and not known", () => {
    for (const stream of ["pcb", null] as const) {
      const h = html(createElement(PathCard, { initial: { path: null, offer: { exam: "cbse-12", minutes: 50, stream } } }));
      noPath(h);
    }
    expect(visibleText(html(createElement(PathCard, { initial: { path: null, offer: { exam: "cbse-12", minutes: 50, stream: "pcb" } } })))).toContain(
      "Biology is not in the plan yet."
    );
  });

  it("V's card, and when everything is done", () => {
    const h = html(createElement(VPathCardBody, { view: view() }));
    noPath(h);
    expect(visibleText(h)).toContain("Today's plan");
    expect(visibleText(h)).toContain("See your full plan");
    const done = html(createElement(VPathCardBody, { view: allDone() }));
    noPath(done);
    expect(visibleText(done)).toContain("Every chapter in your plan is done.");
  });

  it("/board line and offer", () => {
    const line = chapterLine(CE, { sheet: true, topWorked: 4, test: false, recordedDone: false }, [{ kind: "top", chapterId: "ce", minutes: 18 }]);
    const h = html(createElement(BoardPathLineView, { line }));
    noPath(h);
    expect(visibleText(h)).toContain("In your plan");
    const offer = html(createElement(BoardPathOffer, {}));
    noPath(offer);
    expect(visibleText(offer)).toContain("See the plan");
  });

  it("/account, active and stopped", () => {
    const active = html(createElement(PathSettingsCard, { active: { exam: "cbse-12", subjects: ["physics", "chemistry"], dailyMinutes: 45 }, stopped: false }));
    noPath(active);
    expect(visibleText(active)).toContain("Your board plan");
    expect(visibleText(active)).toContain("Stop the plan");
    const stopped = html(createElement(PathSettingsCard, { active: null, stopped: true }));
    noPath(stopped);
    expect(visibleText(stopped)).toContain("Your plan is stopped.");
  });

  it("/drill header for today's Fix task", () => {
    const copy = scopeCopy({ kind: "path" });
    expect(copy.from).toBe("From today's plan");
    expect(copy.unit).toBe("from today's plan");
  });
});
