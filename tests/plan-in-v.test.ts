/**
 * The board plan lives in V alone (owner, 2026-11-22: "its crowding the
 * screen"). Day-14 readout: 144 starters, 5% of tasks done, 0 chapters done, so
 * it left /me, /board, /account and /review. What stays:
 * - "My plan for today" in V (only for a student already on the plan);
 * - tapping it pins a one-line "Today's plan" row at the top of V's chat for
 *   the rest of that India day; tapping the row opens the full card in place;
 * - the card has no link to /me (nothing is there now) and a "Stop my plan".
 * The plan's tables, today's pick, the free Top 10 answers, the Fix questions
 * and the chapter-test grants are unchanged (lib/path, /api/path).
 */
import { describe, expect, it } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { VPathCardBody } from "@/components/chat/VPathCard";
import { VPlanPinView } from "@/components/chat/VPlanPin";
import { PLAN_PIN_KEY, isPinnedToday, pinFor, planSummary } from "@/lib/chat/planPin";
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

function view(fixAnswered: string[] = ["q1"]) {
  return buildPathView({
    exam: "cbse-12",
    subjects: ["physics"],
    stream: "pcm",
    dailyMinutes: 45,
    chapters: [CE],
    states: new Map([["ce", { sheet: true, topWorked: 4, test: false, recordedDone: false }]]),
    tasks: [
      { kind: "fix", questionIds: ["q1", "q2"], minutes: 6 },
      { kind: "top", chapterId: "ce", minutes: 18 },
    ],
    fixAnswered: new Set(fixAnswered),
    today: "2026-11-25",
    examDate: "2027-02-15",
    examOfficial: false,
    startDay: "2026-11-10",
    lastWorkDay: "2026-11-24",
    review: null,
  });
}

const html = (el: ReactElement) => renderToStaticMarkup(el);
const text = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/\s+/g, " ");

describe("the pin lasts the India day it was made", () => {
  it("holds until midnight IST and not past it", () => {
    // 23:30 IST on 22 Nov is 18:00 UTC; 00:01 IST on 23 Nov is 18:31 UTC.
    const made = pinFor(new Date("2026-11-22T05:00:00Z"));
    expect(made).toBe("2026-11-22");
    expect(isPinnedToday(made, new Date("2026-11-22T18:00:00Z"))).toBe(true);
    expect(isPinnedToday(made, new Date("2026-11-22T18:31:00Z"))).toBe(false);
  });
  it("is off with nothing stored or something unreadable", () => {
    const now = new Date("2026-11-22T05:00:00Z");
    expect(isPinnedToday(null, now)).toBe(false);
    expect(isPinnedToday("yes", now)).toBe(false);
  });
  it("has its own storage key", () => {
    expect(PLAN_PIN_KEY).toMatch(/plan/);
  });
});

describe("the pinned row", () => {
  it("is one line when closed: the name, how much is done, and no tasks", () => {
    const v = view();
    expect(v.tasks).toHaveLength(2);
    const h = html(createElement(VPlanPinView, { view: v, open: false, onToggle: () => {} }));
    expect(h).toContain('aria-expanded="false"');
    expect(text(h)).toContain("Today's plan");
    expect(text(h)).toContain(planSummary(v));
    expect(text(h)).not.toContain("Current Electricity");
  });
  it("opens the full card in place", () => {
    const h = html(createElement(VPlanPinView, { view: view(), open: true, onToggle: () => {} }));
    expect(h).toContain('aria-expanded="true"');
    expect(text(h)).toContain("Current Electricity");
    // The button names the panel it opens.
    const controls = h.match(/aria-controls="([^"]+)"/)?.[1];
    expect(controls).toBeTruthy();
    expect(h).toContain(`id="${controls}"`);
  });
  it("counts the tasks done today", () => {
    expect(planSummary(view([]))).toBe("0 of 2 done");
    expect(planSummary(view(["q1", "q2"]))).toBe("1 of 2 done");
  });
  it("says when every chapter is done", () => {
    const done = buildPathView({
      exam: "cbse-12",
      subjects: ["physics"],
      stream: "pcm",
      dailyMinutes: 45,
      chapters: [CE],
      states: new Map([["ce", { sheet: true, topWorked: 10, test: true, recordedDone: true }]]),
      tasks: [],
      fixAnswered: new Set(),
      today: "2026-11-25",
      examDate: "2027-02-15",
      examOfficial: false,
    });
    expect(planSummary(done)).toBe("Every chapter done");
  });
});

describe("V's plan card", () => {
  it("has no link to /me, which no longer shows the plan", () => {
    const h = html(createElement(VPathCardBody, { view: view() }));
    expect(h).not.toContain('href="/me"');
    expect(text(h)).not.toContain("See your full plan");
  });
  it("offers Stop my plan when it can stop", () => {
    expect(text(html(createElement(VPathCardBody, { view: view(), onStop: async () => {} })))).toContain("Stop my plan");
    expect(text(html(createElement(VPathCardBody, { view: view() })))).not.toContain("Stop my plan");
  });
});

describe("no page outside V shows the plan", () => {
  const ROOT = join(__dirname, "..");
  function files(dir: string): string[] {
    return readdirSync(dir).flatMap((n) => {
      const p = join(dir, n);
      return statSync(p).isDirectory() ? files(p) : /\.(tsx?|jsx?)$/.test(n) ? [p] : [];
    });
  }
  // The plan's own code stays (lib/path, /api/path): only pages are checked.
  const KEPT = [join(ROOT, "src/lib/path"), join(ROOT, "src/app/api/path")];
  const src = files(join(ROOT, "src")).filter((f) => !KEPT.some((k) => f.startsWith(k)));

  it("the /me, /board and /account plan cards are gone", () => {
    expect(existsSync(join(ROOT, "src/app/me/PathCard.tsx"))).toBe(false);
    expect(existsSync(join(ROOT, "src/components/path/BoardPathLine.tsx"))).toBe(false);
    expect(existsSync(join(ROOT, "src/app/account/PathSettingsCard.tsx"))).toBe(false);
    const users = src.filter((f) => /[/]PathCard"|BoardPathLine|PathSettingsCard|loadPathCard\(|getPathSettings\(/.test(readFileSync(f, "utf8")));
    expect(users.map((f) => f.slice(ROOT.length + 1).replace(/\\/g, "/"))).toEqual([]);
  });
  it("/review no longer reads today's plan", () => {
    const review = files(join(ROOT, "src/app/review")).map((f) => readFileSync(f, "utf8")).join("\n");
    expect(review).not.toMatch(/lib\/path|today's plan|today&apos;s plan|inPlan/);
  });
});
