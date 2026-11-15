/**
 * V's "Your day" card (2026-11-15, owner): shown in place of V's greeting the
 * first time a student opens V each day. Built from the student's own numbers,
 * never by the model. Pure: every input is a literal.
 */
import { describe, it, expect } from "vitest";
import {
  buildDayCard,
  fixedBetween,
  lastVisit,
  mergeDays,
  planDoneOn,
  DAY_LOOKBACK_DAYS,
  type DayCardInput,
  type DaySpan,
} from "@/lib/chat/dayCard";
import type { DrillEvent } from "@/lib/drill/select";

// Sun 15 Nov 2026, 09:00 IST.
const NOW = new Date("2026-11-15T03:30:00Z");

const span = (day: string, answered: number, right: number, top: DaySpan["topChapter"] = null): DaySpan => ({
  day,
  answered,
  right,
  topChapter: top,
});

function input(over: Partial<DayCardInput> = {}): DayCardInput {
  return {
    exam: { slug: "nda", displayName: "NDA" },
    now: NOW,
    daysLeft: 142,
    days: [],
    fixedOnDay: 0,
    fixedTotal: 0,
    dueChapters: [],
    movedUp: [],
    plan: null,
    ...over,
  };
}

const ev = (q: string, correct: boolean, at: string): DrillEvent => ({ questionId: q, correct, at });

describe("lastVisit", () => {
  it("is the latest day before today with answers, in India time", () => {
    const days = [span("2026-11-11", 5, 3), span("2026-11-14", 2, 1)];
    expect(lastVisit(days, NOW)?.day).toBe("2026-11-14");
  });

  it("never counts today: the card is about the day before", () => {
    expect(lastVisit([span("2026-11-15", 9, 9)], NOW)).toBeNull();
  });

  it("ignores a day older than the lookback", () => {
    expect(lastVisit([span("2026-10-01", 9, 9)], NOW)).toBeNull();
    expect(DAY_LOOKBACK_DAYS).toBe(30);
  });

  it("ignores a day with no answers", () => {
    expect(lastVisit([span("2026-11-14", 0, 0)], NOW)).toBeNull();
  });
});

describe("mergeDays", () => {
  it("adds practice and mock answers of the same day, and keeps the bigger top chapter", () => {
    const merged = mergeDays(
      [span("2026-11-14", 10, 6, { name: "Vectors", answered: 6 })],
      [span("2026-11-14", 30, 20, { name: "Trigonometry", answered: 12 }), span("2026-11-12", 4, 4)]
    );
    expect(merged).toEqual([
      span("2026-11-12", 4, 4),
      span("2026-11-14", 40, 26, { name: "Trigonometry", answered: 12 }),
    ]);
  });
});

describe("fixedBetween", () => {
  it("counts questions that became fixed inside the window", () => {
    const events = [
      ev("a", false, "2026-11-10T05:00:00Z"),
      ev("a", true, "2026-11-14T05:00:00Z"), // fixed on 14 Nov
      ev("b", false, "2026-11-10T05:00:00Z"),
      ev("b", true, "2026-11-12T05:00:00Z"), // fixed before
      ev("c", false, "2026-11-14T06:00:00Z"), // missed on the day, not fixed
    ];
    expect(fixedBetween(events, "2026-11-14")).toBe(1);
  });

  it("does not go below zero when a fixed question is missed again that day", () => {
    const events = [ev("a", false, "2026-11-10T05:00:00Z"), ev("a", true, "2026-11-11T05:00:00Z"), ev("a", false, "2026-11-14T05:00:00Z")];
    expect(fixedBetween(events, "2026-11-14")).toBe(0);
  });

  it("uses India days: 23:00 IST on the 14th belongs to the 14th", () => {
    const events = [ev("a", false, "2026-11-10T05:00:00Z"), ev("a", true, "2026-11-14T17:30:00Z")];
    expect(fixedBetween(events, "2026-11-14")).toBe(1);
    expect(fixedBetween(events, "2026-11-15")).toBe(0);
  });
});

describe("planDoneOn", () => {
  const chapters = [
    { id: "sol", name: "Solutions" },
    { id: "ec", name: "Electrochemistry" },
    { id: "mat", name: "Matrices" },
  ];
  it("names what was finished that day, done over test over sheet", () => {
    const facts = {
      sheetAt: new Map([
        ["sol", "2026-11-14T05:00:00Z"],
        ["ec", "2026-11-14T06:00:00Z"],
        ["mat", "2026-11-14T06:00:00Z"],
      ]),
      testAt: new Map([["ec", "2026-11-14T07:00:00Z"]]),
      doneAt: new Map([["mat", "2026-11-14T08:00:00Z"]]),
    };
    expect(planDoneOn("2026-11-14", chapters, facts)).toEqual([
      "Solutions: chapter sheet done",
      "Electrochemistry: chapter test done",
      "Matrices: chapter done",
    ]);
  });

  it("leaves out work from other days", () => {
    const facts = { sheetAt: new Map([["sol", "2026-11-12T05:00:00Z"]]), testAt: new Map(), doneAt: new Map() };
    expect(planDoneOn("2026-11-14", chapters, facts)).toEqual([]);
  });
});

describe("buildDayCard", () => {
  it("came yesterday: what went well first, then today's mistakes", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-14", 24, 17)],
        fixedOnDay: 3,
        fixedTotal: 40,
        movedUp: [{ chapter: "Trigonometry", band: "mastered" }],
        dueChapters: ["Vectors", "Vectors", "Probability", "Probability", "Probability", "Matrices"],
      })
    );
    expect(card?.kind).toBe("yesterday");
    expect(card?.greeting).toBe("Welcome back. Here's your day.");
    expect(card?.title).toBe("Since yesterday");
    expect(card?.subtitle).toBe("NDA · 142 days to go");
    expect(card?.rows).toEqual([
      { label: "Yesterday", value: "24 questions, 17 right (71%)" },
      { label: "Fixed", value: "3 mistakes cleared", tone: "good" },
      { label: "Moved up", value: "Trigonometry: now strong", tone: "good" },
      { label: "Today", value: "6 mistakes waiting", detail: "About 5 minutes.", tone: "today" },
    ]);
    expect(card?.primary).toEqual({ label: "Fix 6 mistakes", href: "/drill?from=v_day", action: "drill" });
    expect(card?.secondary).toEqual({ label: "My full progress", href: "/performance", action: "performance" });
  });

  it("back after a few days: the date, never the days missed, and fixes so far", () => {
    const card = buildDayCard(
      input({
        exam: { slug: "mht-cet", displayName: "MHT-CET" },
        days: [span("2026-11-11", 12, 8, { name: "Probability", answered: 12 })],
        fixedOnDay: 0,
        fixedTotal: 41,
        dueChapters: ["Probability", "Probability", "Probability", "Probability", "Vectors", "Vectors", "Matrices", "Matrices", "Limits"],
      })
    );
    expect(card?.kind).toBe("since");
    expect(card?.greeting).toBe("Good to see you again. Here's where you left off.");
    expect(card?.title).toBe("Since your last visit");
    expect(card?.subtitle).toBe("Wed 11 Nov · MHT-CET");
    expect(card?.rows).toEqual([
      { label: "Last time", value: "12 questions, 8 right (67%)", detail: "Mostly Probability" },
      { label: "So far", value: "41 mistakes fixed in total", tone: "good" },
      { label: "Today", value: "9 mistakes waiting", detail: "4 of them are from Probability.", tone: "today" },
    ]);
    expect(JSON.stringify(card)).not.toMatch(/missed|streak/i);
  });

  it("names the top chapter only when it holds half the day's answers or more", () => {
    const card = buildDayCard(input({ days: [span("2026-11-14", 10, 5, { name: "Vectors", answered: 4 })] }));
    expect(card?.rows[0]).toEqual({ label: "Yesterday", value: "10 questions, 5 right (50%)" });
  });

  it("leaves out empty lines rather than showing 0", () => {
    const card = buildDayCard(input({ days: [span("2026-11-14", 1, 0)] }));
    expect(card?.rows).toEqual([{ label: "Yesterday", value: "1 question, 0 right (0%)" }]);
    expect(card?.primary).toEqual({ label: "My full progress", href: "/performance", action: "performance" });
    expect(card?.secondary).toBeNull();
  });

  it("with no recent visit but mistakes waiting: a plain day card", () => {
    const card = buildDayCard(input({ dueChapters: ["Vectors"] }));
    expect(card?.kind).toBe("fresh");
    expect(card?.title).toBe("Your day");
    expect(card?.rows).toEqual([{ label: "Today", value: "1 mistake waiting", detail: "About a minute.", tone: "today" }]);
    expect(card?.primary.label).toBe("Fix 1 mistake");
  });

  it("is null when there is nothing to say, so V keeps its greeting", () => {
    expect(buildDayCard(input())).toBeNull();
  });

  it("drops the days-to-go part when the exam date is unknown, and says exam today", () => {
    expect(buildDayCard(input({ daysLeft: null, dueChapters: ["A"] }))?.subtitle).toBe("NDA");
    expect(buildDayCard(input({ daysLeft: 0, dueChapters: ["A"] }))?.subtitle).toBe("NDA · exam today");
    expect(buildDayCard(input({ daysLeft: 1, dueChapters: ["A"] }))?.subtitle).toBe("NDA · 1 day to go");
  });

  it("on the board plan: yesterday's plan work, the plan's count, today's task first", () => {
    const card = buildDayCard(
      input({
        exam: { slug: "cbse-12", displayName: "CBSE Class 12" },
        daysLeft: 98,
        days: [span("2026-11-14", 8, 6)],
        dueChapters: ["Solutions", "Solutions", "Solutions", "Solutions"],
        plan: {
          doneOnDay: ["Solutions: chapter sheet done"],
          chaptersDone: 2,
          chaptersOf: 37,
          tasks: [
            { title: "Fix 5 mistakes", detail: "", href: "/drill?from=path&scope=path", minutes: 8, done: true },
            { title: "Solutions", detail: "Top 10: first 5 questions", href: "/homework/x", minutes: 15, done: false },
          ],
        },
      })
    );
    expect(card?.rows).toEqual([
      { label: "Yesterday", value: "Solutions: chapter sheet done", detail: "8 questions, 6 right (75%)", tone: "good" },
      { label: "Plan", value: "2 of 37 chapters done" },
      { label: "Today on your plan", value: "Solutions: Top 10: first 5 questions", detail: "About 15 minutes.", tone: "today" },
    ]);
    expect(card?.primary).toEqual({ label: "Start today's plan", href: "/homework/x", action: "plan" });
    expect(card?.secondary).toEqual({ label: "Fix 4 mistakes", href: "/drill?from=v_day", action: "drill" });
  });

  it("on the board plan with today's tasks done: says so, and mistakes lead", () => {
    const card = buildDayCard(
      input({
        exam: { slug: "cbse-12", displayName: "CBSE Class 12" },
        dueChapters: ["Solutions"],
        plan: {
          doneOnDay: [],
          chaptersDone: 0,
          chaptersOf: 37,
          tasks: [{ title: "Solutions", detail: "Chapter sheet", href: "/x", minutes: 10, done: true }],
        },
      })
    );
    expect(card?.rows).toEqual([
      { label: "Today on your plan", value: "Today's plan is done", tone: "good" },
      { label: "Today", value: "1 mistake waiting", detail: "About a minute.", tone: "today" },
    ]);
    expect(card?.primary.action).toBe("drill");
  });

  it("joins two moved-up chapters and names the middle band in words", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-14", 5, 5)],
        movedUp: [
          { chapter: "Matrices", band: "mid" },
          { chapter: "Vectors", band: "mastered" },
        ],
      })
    );
    expect(card?.rows[1]).toEqual({ label: "Moved up", value: "Matrices: now getting there · Vectors: now strong", tone: "good" });
  });
});
