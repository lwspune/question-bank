/**
 * The staff view of a student's /me (/dashboard/students/[id]/me, 2026-11-07).
 *
 * Two properties, each a way the view could quietly go wrong:
 *  1. It shows the STUDENT's numbers. The pulse cards fetch for whoever is
 *     signed in, so unless the student's pulse is passed in they show the
 *     viewer's own.
 *  2. Nothing on it can save as the student. Every control that writes (name,
 *     goal, exam pick, reminder, result answer, feedback) is replaced by a note,
 *     and the student's own-row links (results, map, /performance) go to their
 *     staff pages.
 *
 * Server-rendered (no jsdom in this repo): this pins the markup before effects.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import MeView from "@/app/me/MeView";
import type { MeData } from "@/lib/me/load";
import type { Pulse } from "@/lib/pulse/cache";
import { summarizeUserMocks } from "@/lib/mocks/perf";
import type { UserAttempt } from "@/lib/mocks/query";

const STUDENT = "11111111-2222-3333-4444-555555555555";

const attempt: UserAttempt = {
  attemptId: "aaaaaaaa-0000-0000-0000-000000000001",
  mockSlug: "nda-1-2025-maths",
  mockTitle: "NDA 1 2025 Mathematics",
  pyqYear: 2025,
  source: "pyq",
  scope: "full",
  examSlug: "nda",
  examName: "NDA",
  paperCode: "maths",
  durationSecs: 9000,
  status: "submitted",
  score: 120,
  maxScore: 300,
  correct: 50,
  wrong: 20,
  skipped: 50,
  startedAt: "2026-11-01T05:00:00.000Z",
  submittedAt: "2026-11-01T07:00:00.000Z",
} as UserAttempt;

const data: MeData = {
  greeting: "Good evening",
  name: "Riya",
  examLinks: [{ slug: "nda", label: "NDA", href: "/nda" }] as MeData["examLinks"],
  suggestedExam: null,
  resultCheck: {
    id: "r1",
    examSlug: "nda",
    examName: "NDA",
    sitting: "NDA 2 2026",
    stage: "written",
    announcedOn: "2026-11-01",
    askUntil: "2026-11-21",
  } as MeData["resultCheck"],
  suggestedName: "Riya",
  stage: "class-12" as MeData["stage"],
  showStageNudge: true,
  pushPromptedAt: null,
  resume: undefined,
  cont: undefined,
  mockHref: "/mock/nda",
  notesHref: "/notes/nda",
  weekly: { done: 2, goal: 4 },
  assigned: [],
  attempts: [attempt],
  mocks: summarizeUserMocks([attempt]),
  continueItems: [],
  showNps: true,
};

/** Numbers no viewer's own pulse would carry by accident. */
const PULSE: Pulse = {
  due: 37,
  week: { done: 3, goal: 4 },
  exam: null,
  totals: { answered: 4321, right: 2160, fixed: 19 },
  weak: [{ chapterId: "c1", name: "Matrices and Determinants", place: "NDA Maths", due: 12 }],
  chapterDue: { c1: 12 },
};

const html = () =>
  renderToStaticMarkup(
    createElement(MeView, { data, vapidKey: "", viewAs: { studentId: STUDENT, pulse: PULSE } })
  );

describe("MeView, staff view of a student's /me", () => {
  it("shows the student's pulse, not a fetched one", () => {
    const out = html();
    expect(out).toContain("4,321");
    expect(out).toContain("37 to fix");
    expect(out).toContain("Matrices and Determinants");
    // The week ring reads the student's pulse too.
    expect(out).toContain("3/4");
  });

  it("renders no control that saves as the student", () => {
    const out = html();
    expect(out).not.toContain("Not you?"); // the name editor
    expect(out).not.toMatch(/>\s*change\s*</); // the weekly goal
    expect(out).not.toContain('href="/account"'); // exam and stage pickers
    expect(out).not.toContain("<form"); // feedback, name, result answer
    expect(out).not.toContain("<button");
  });

  it("says what the student sees where a control was taken out", () => {
    const out = html();
    expect(out).toContain("Did you clear the NDA 2 2026 written exam?");
    expect(out).toContain("including the 0 to 10 rating question");
    expect(out).toContain("turn on reminders");
    expect(out).toContain("Update your stage");
  });

  it("points the student's own-row links at their staff pages", () => {
    const out = html();
    expect(out).toContain(`/dashboard/students/${STUDENT}/attempt/${attempt.attemptId}`);
    expect(out).toContain(`/dashboard/students/${STUDENT}/performance`);
    expect(out).not.toContain("/mock/attempt/");
    expect(out).not.toContain('href="/me/map"');
    expect(out).not.toContain('href="/performance"');
  });
});

describe("the staff /me page", () => {
  const src = readFileSync("src/app/dashboard/students/[id]/me/page.tsx", "utf8");

  it("never logs activity as the student", () => {
    expect(src).not.toMatch(/logActivity/);
  });

  it("is superadmin-gated and renders the read-only view", () => {
    expect(src).toContain("getSessionSuperadmin()");
    expect(src).toMatch(/viewAs=\{\{/);
  });
});
