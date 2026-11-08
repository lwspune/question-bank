/**
 * The board path on /me (MENTOR_SPEC.md §4, Phase 1): the Today card for a
 * path student and the start card for a Class 12 student without one.
 *
 * Server-rendered (no jsdom in this repo): this pins the markup before effects.
 * The staff view must show the student's path read-only, in place of the week
 * ring (D4), with nothing on it that saves as the student.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PathCard from "@/app/me/PathCard";
import MeView from "@/app/me/MeView";
import { buildPathView } from "@/lib/path/view";
import type { ChapterState, PathChapter } from "@/lib/path/model";
import type { PathTask } from "@/lib/path/today";
import type { MeData } from "@/lib/me/load";
import type { Pulse } from "@/lib/pulse/cache";
import { summarizeUserMocks } from "@/lib/mocks/perf";
import { resolveFocus } from "@/lib/me/focus";

const slots = (p: string) => Array.from({ length: 10 }, (_, i) => [{ id: `${p}${i}`, format: "mcq" as const }]);
const chapter = (id: string, subject: PathChapter["subject"], name: string): PathChapter => ({
  id,
  name,
  subject,
  queue: subject,
  rank: 1,
  boardPath: `/board/cbse-12/${subject}/${id}`,
  top: slots(id),
  test: { mockId: `m-${id}`, slug: `cbse-12-chapter-${id}`, minutes: 23 },
});
const CE = "0b6f3c1e-2a4d-4c8e-9f10-1a2b3c4d5e6f";
const chapters = [chapter(CE, "physics", "Current Electricity"), chapter("sol", "chemistry", "Solutions")];

function view(opts: { states?: Map<string, ChapterState>; tasks?: PathTask[]; today?: string; stream?: "pcm" | "pcb" } = {}) {
  return buildPathView({
    exam: "cbse-12",
    subjects: ["physics", "chemistry"],
    stream: opts.stream ?? "pcm",
    dailyMinutes: 55,
    chapters,
    states: opts.states ?? new Map([[CE, { sheet: true, topWorked: 4, test: false, recordedDone: false }]]),
    tasks: opts.tasks ?? [
      { kind: "sheet", chapterId: CE, minutes: 10 },
      { kind: "top", chapterId: CE, minutes: 18 },
      { kind: "test", chapterId: CE, minutes: 23 },
    ],
    fixAnswered: new Set(),
    today: opts.today ?? "2026-11-25",
    examDate: "2027-02-15",
    examOfficial: false,
  });
}

const card = (initial: Parameters<typeof PathCard>[0]["initial"], readOnly = false) =>
  renderToStaticMarkup(createElement(PathCard, { initial, readOnly }));

describe("the /me Today card on the path", () => {
  it("shows the status line and links each task straight to its work", () => {
    const v = view();
    const out = card({ path: v, offer: null });
    expect(out).toContain("Today&#x27;s plan");
    expect(out).toContain("Physics 0 of 1 · Chemistry 0 of 1, on track");
    expect(out).toContain(`href="/board/cbse-12/physics/${CE}#top"`);
    expect(out).toContain(`href="/mock/cbse-12-chapter-${CE}"`);
    expect(out).toContain("Physics · Current Electricity");
    expect(out).toContain("4 of 10");
    expect(out).toContain("about 51 min");
  });

  it("marks a task done by work and offers 'Not taught yet' only on the rest", () => {
    const out = card({ path: view(), offer: null });
    expect(out).toContain("Done:");
    expect(out.match(/>Not taught yet</g)).toHaveLength(2);
  });

  it("says the board date is expected while it is not announced", () => {
    expect(card({ path: view(), offer: null })).toContain("CBSE Class 12 boards from 15 Feb (expected)");
  });

  it("gives the honest finish date when behind, never a missed-day count (D3)", () => {
    const out = card({ path: view({ today: "2027-01-24" }), offer: null });
    expect(out).toMatch(/behind by \d+ days?/);
    // The day before revision starts no study day is left, so More cannot
    // catch up: the line says the finish date even at the top pace (Phase 3).
    expect(out).toMatch(/you finish on \d+ \w+/);
    expect(out).not.toMatch(/missed|streak/i);
  });

  it("says well done when today's tasks are all done", () => {
    const states = new Map([[CE, { sheet: true, topWorked: 10, test: true, recordedDone: false }]]);
    const out = card({ path: view({ states }), offer: null });
    expect(out).toContain("Today&#x27;s tasks are done");
  });

  it("tells a PCB student Biology is not in the path yet (D1)", () => {
    expect(card({ path: view({ stream: "pcb" }), offer: null })).toContain("Biology is not in the plan yet");
  });

  it("is read-only in the staff view: no buttons", () => {
    const out = card({ path: view(), offer: null }, true);
    expect(out).not.toContain("<button");
    expect(out).toContain("Physics 0 of 1");
  });
});

describe("the /me start card", () => {
  it("asks the stream in one tap when it is not known", () => {
    const out = card({ path: null, offer: { exam: "cbse-12", minutes: 55, stream: null } });
    expect(out).toContain("Finish Physics, Chemistry and Maths before your boards");
    expect(out).toContain("about 55 minutes a day");
    for (const s of ["PCM", "PCB", "PCMB"]) {
      expect(out).toContain(`>${s}<`);
      expect(out).toContain(`aria-label="${s}: start my plan"`);
    }
  });

  it("has one Start button when the stream is known", () => {
    const out = card({ path: null, offer: { exam: "mh-hsc-12", minutes: 60, stream: "pcm" } });
    expect(out).toContain("Start my plan");
    expect(out).not.toContain("Start my path");
    expect(out).not.toContain(">PCB<");
  });

  it("names Physics and Chemistry, and Biology's absence, for a PCB student", () => {
    const out = card({ path: null, offer: { exam: "cbse-12", minutes: 45, stream: "pcb" } });
    expect(out).toContain("Finish Physics and Chemistry before your boards");
    expect(out).toContain("Biology is not in the plan yet");
  });
});

describe("MeView, the path in the staff view", () => {
  const base = {
    greeting: "Good evening",
    name: "Riya",
    examLinks: [],
    suggestedExam: null,
    focus: resolveFocus({ targets: ["nda"], saved: null, recent: null }),
    resultCheck: null,
    suggestedName: "",
    stage: null,
    showStageNudge: false,
    pushPromptedAt: null,
    resume: undefined,
    cont: undefined,
    mockHref: "/mock",
    notesHref: "/notes",
    weekly: { done: 2, goal: 4 },
    assigned: [],
    attempts: [],
    mocks: summarizeUserMocks([]),
    continueItems: [],
    showNps: false,
    tutorPriceAsk: null,
  } as unknown as MeData;
  const PULSE = { due: 0, week: { done: 3, goal: 4 }, exam: null, totals: { answered: 0, right: 0, fixed: 0 }, weak: [], chapterDue: {} } as unknown as Pulse;
  const render = (pathCard: MeData["pathCard"]) =>
    renderToStaticMarkup(createElement(MeView, { data: { ...base, pathCard }, vapidKey: "", viewAs: { studentId: "s1", pulse: PULSE } }));

  it("shows the student's path in place of the week ring (D4)", () => {
    const out = render({ path: view(), offer: null });
    expect(out).toContain("Physics 0 of 1 · Chemistry 0 of 1, on track");
    expect(out).not.toContain("study days a week");
    expect(out).not.toContain("<button");
  });

  it("says what the student sees in place of the start offer", () => {
    const out = render({ path: null, offer: { exam: "cbse-12", minutes: 55, stream: null } });
    expect(out).toContain("Here they see the board plan offer: about 55 minutes a day");
    // With no plan, the Today card is below it (its study-days ring went 2026-11-08).
    expect(out).toContain("Today");
  });
});
