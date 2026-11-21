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
  type BigChapter,
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
      { label: "Today", value: "6 mistakes waiting", detail: "Start with 5: about 5 minutes.", tone: "today" },
    ]);
    expect(card?.primary).toEqual({ label: "Fix 5 mistakes", href: "/drill?from=v_day", action: "drill" });
    expect(card?.secondary).toEqual({ label: "My full progress", href: "/performance", action: "performance" });
  });

  it("back after a few days: the date, never the days missed, and fixes so far", () => {
    const card = buildDayCard(
      input({
        exam: { slug: "mht-cet", displayName: "MHT-CET" },
        // 3 days away: from 4, V asks its check-in first (tests/chat-check-in.test.ts).
        days: [span("2026-11-12", 12, 8, { name: "Probability", answered: 12 })],
        fixedOnDay: 0,
        fixedTotal: 41,
        dueChapters: ["Probability", "Probability", "Probability", "Probability", "Vectors", "Vectors", "Matrices", "Matrices", "Limits"],
      })
    );
    expect(card?.kind).toBe("since");
    expect(card?.greeting).toBe("Good to see you again. Here's where you left off.");
    expect(card?.title).toBe("Since your last visit");
    expect(card?.subtitle).toBe("Thu 12 Nov · MHT-CET");
    expect(card?.rows).toEqual([
      { label: "Last time", value: "12 questions, 8 right (67%)", detail: "Mostly Probability" },
      { label: "So far", value: "41 mistakes fixed in total", tone: "good" },
      { label: "Today", value: "9 mistakes waiting", detail: "Start with 5: about 5 minutes.", tone: "today" },
    ]);
    expect(JSON.stringify(card)).not.toMatch(/missed|streak/i);
  });

  it("with 5 or fewer waiting, says how many come from the chapter worked on last", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-11", 6, 3, { name: "Probability", answered: 6 })],
        dueChapters: ["Probability", "Probability", "Probability", "Vectors"],
      })
    );
    expect(card?.rows.at(-1)).toEqual({ label: "Today", value: "4 mistakes waiting", detail: "3 of them are from Probability.", tone: "today" });
    expect(card?.primary.label).toBe("Fix 4 mistakes");
  });

  it("never asks for more than one drill: a big backlog starts with 5", () => {
    const card = buildDayCard(input({ dueChapters: Array.from({ length: 472 }, () => "Differentiation") }));
    expect(card?.rows).toEqual([{ label: "Today", value: "472 mistakes waiting", detail: "Start with 5: about 5 minutes.", tone: "today" }]);
    expect(card?.primary.label).toBe("Fix 5 mistakes");
  });

  it("does not say \"Mostly\" about one or two answers", () => {
    const card = buildDayCard(input({ days: [span("2026-11-14", 2, 2, { name: "Vectors", answered: 2 })] }));
    expect(card?.rows[0]).toEqual({ label: "Yesterday", value: "2 questions, 2 right (100%)" });
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

/*
 * The exam countdown (owner, 2026-11-21, version "1c"): in the last 60 days
 * before the exam, the card names the BIG chapters (most marks a paper) where
 * the student still has mistakes waiting, and the day's step is to fix the
 * first. With none waiting there, the big chapters themselves; in the last
 * week, a full paper under exam time.
 */
describe("buildDayCard: the exam countdown", () => {
  const big = (id: string, chapter: string, marksPerPaper: number, qPerPaper = marksPerPaper / 2.5): BigChapter => ({
    chapterId: id,
    chapter,
    subject: "Mathematics",
    examName: "NDA",
    qPerPaper,
    marksPerPaper,
  });
  const BIG = [
    big("c-trig", "Trigonometry", 22.5, 9),
    big("c-mat", "Matrices and Determinants", 17.5, 7),
    big("c-prob", "Probability", 15, 6),
    big("c-vec", "Vectors", 12.5, 5),
    big("c-lim", "Limits", 10, 4),
    big("c-set", "Sets", 5, 2),
  ];
  const official = (daysLeft: number) => ({ label: "NDA 2027 (I)", date: "2027-04-11", official: true, daysLeft });

  it("shows nothing more than 60 days out, on the exam day, or with no date", () => {
    for (const c of [official(61), official(0), null]) {
      const card = buildDayCard(input({ days: [span("2026-11-14", 5, 3)], countdown: c, bigChapters: BIG, dueByChapter: { "c-trig": 8 } }));
      expect(card?.countdown ?? null, JSON.stringify(c)).toBeNull();
      expect(card?.rows.some((r) => r.tone === "exam")).toBe(false);
    }
  });

  it("names the big chapters with mistakes waiting, biggest first, and fixes the first", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-14", 5, 3)],
        dueChapters: ["Trigonometry", "Trigonometry", "Probability", "Sets"],
        countdown: official(14),
        bigChapters: BIG,
        dueByChapter: { "c-prob": 5, "c-trig": 8, "c-set": 4 },
      })
    );
    expect(card?.countdown).toBe("fix");
    expect(card?.rows).toContainEqual({
      label: "NDA 2027 (I) is 14 days away",
      value: "Big chapters where you still lose marks:",
      items: [
        { name: "Trigonometry", note: "8 mistakes to fix" },
        { name: "Probability", note: "5 to fix" },
      ],
      tone: "exam",
    });
    // Sets is not one of the 5 big chapters, so it is not named.
    expect(card?.rows).toContainEqual({ label: "Today", value: "Fix Trigonometry (8)", tone: "today" });
    expect(card?.rows.some((r) => r.value.endsWith("waiting"))).toBe(false);
    expect(card?.primary).toEqual({ label: "Fix Trigonometry", href: "/drill?chapter=c-trig&from=v_day", action: "exam" });
    expect(card?.secondary).toEqual({ label: "My full progress", href: "/performance", action: "performance" });
  });

  it("names at most three", () => {
    const card = buildDayCard(
      input({
        countdown: official(30),
        bigChapters: BIG,
        dueByChapter: { "c-trig": 1, "c-mat": 1, "c-prob": 1, "c-vec": 1 },
      })
    );
    const row = card?.rows.find((r) => r.tone === "exam");
    expect(row?.items?.map((i) => i.name)).toEqual(["Trigonometry", "Matrices and Determinants", "Probability"]);
    expect(row?.items?.[0].note).toBe("1 mistake to fix");
  });

  it("falls back to the chapters that carry the most marks when none of them has a mistake waiting", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-14", 5, 3)],
        dueChapters: ["Sets"],
        countdown: official(30),
        bigChapters: BIG,
        dueByChapter: { "c-set": 1 },
      })
    );
    expect(card?.countdown).toBe("top");
    expect(card?.rows).toContainEqual({
      label: "NDA 2027 (I) is 30 days away",
      value: "The chapters that carry the most marks:",
      items: [
        { name: "Trigonometry", note: "about 9 questions a paper" },
        { name: "Matrices and Determinants", note: "about 7 a paper" },
        { name: "Probability", note: "about 6 a paper" },
      ],
      tone: "exam",
    });
    expect(card?.rows).toContainEqual({ label: "Today", value: "Start with Trigonometry", tone: "today" });
    expect(card?.primary).toEqual({
      label: "Practise Trigonometry",
      href: "/go/practice?exam=NDA&subject=Mathematics&chapter=Trigonometry",
      action: "exam",
    });
    expect(card?.secondary).toEqual({ label: "Fix 1 mistake", href: "/drill?from=v_day", action: "drill" });
  });

  it("says a date not yet announced is expected, with the days in words", () => {
    const card = buildDayCard(
      input({
        countdown: { label: "MHT-CET 2027", date: "2027-01-14", official: false, daysLeft: 60 },
        bigChapters: BIG,
        dueByChapter: {},
      })
    );
    const row = card?.rows.find((r) => r.tone === "exam");
    expect(row?.label).toBe("MHT-CET 2027 is expected around 14 Jan");
    expect(row?.value).toBe("About 60 days. The chapters that carry the most marks:");
  });

  it("asks for a full paper in the last week", () => {
    const card = buildDayCard(
      input({
        exam: { slug: "nda", displayName: "NDA" },
        dueChapters: ["Trigonometry", "Trigonometry"],
        countdown: official(7),
        bigChapters: BIG,
        dueByChapter: { "c-trig": 2 },
      })
    );
    expect(card?.countdown).toBe("mock");
    expect(card?.rows).toContainEqual({
      label: "NDA 2027 (I) is 7 days away",
      value: "One full paper under exam time this week is worth more than new chapters now.",
      tone: "exam",
    });
    expect(card?.rows).toContainEqual({ label: "Today", value: "A full paper, under exam time", tone: "today" });
    expect(card?.primary).toEqual({ label: "Start a full mock", href: "/mock/exam/nda", action: "exam" });
    expect(card?.secondary).toEqual({ label: "Fix 2 mistakes", href: "/drill?from=v_day", action: "drill" });
    expect(buildDayCard(input({ countdown: official(1), bigChapters: BIG }))?.rows.find((r) => r.tone === "exam")?.label).toBe(
      "NDA 2027 (I) is tomorrow"
    );
  });

  it("keeps the board plan's task first, with the countdown's step second", () => {
    const card = buildDayCard(
      input({
        exam: { slug: "cbse-12", displayName: "CBSE Class 12" },
        countdown: official(20),
        bigChapters: BIG,
        dueByChapter: { "c-trig": 3 },
        plan: {
          doneOnDay: [],
          chaptersDone: 0,
          chaptersOf: 37,
          tasks: [{ title: "Solutions", detail: "Chapter sheet", href: "/homework/x", minutes: 10, done: false }],
        },
      })
    );
    expect(card?.primary).toEqual({ label: "Start today's plan", href: "/homework/x", action: "plan" });
    expect(card?.secondary).toEqual({ label: "Fix Trigonometry", href: "/drill?chapter=c-trig&from=v_day", action: "exam" });
    expect(card?.rows.filter((r) => r.label === "Today")).toEqual([]);
  });

  it("shows nothing for an exam with no measured big chapters (no published full paper)", () => {
    const card = buildDayCard(input({ days: [span("2026-11-14", 5, 3)], countdown: official(20), bigChapters: [], dueByChapter: {} }));
    expect(card?.countdown).toBeNull();
  });

  it("counts a chapter once when two papers both weigh it, at its larger weight", () => {
    const card = buildDayCard(
      input({
        countdown: official(30),
        bigChapters: [...BIG, { ...big("c-sets2", "Sets", 40, 16), chapterId: "c-set" }],
        dueByChapter: {},
      })
    );
    const names = card?.rows.find((r) => r.tone === "exam")?.items?.map((i) => i.name);
    expect(names).toEqual(["Sets", "Trigonometry", "Matrices and Determinants"]);
  });
});
