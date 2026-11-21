/**
 * V's check-in (owner, 2026-11-21): the first time a student opens V after 4+
 * days without answering anything, V asks "How's your study going?" with three
 * taps, in place of the "Your day" card that day. Each tap leads to something
 * to do; it never counts the days missed. Pure: every input is a literal.
 */
import { describe, it, expect } from "vitest";
import { buildDayCard, type DayCardInput, type DaySpan } from "@/lib/chat/dayCard";
import {
  buildCheckIn,
  checkInChapterReply,
  checkInStuckReply,
  CHECKIN_CHOICES,
  CHECKIN_OTHER_DRAFT,
  CHECKIN_QUESTION,
  CHECKIN_WELL_REPLY,
  type CheckInChapter,
} from "@/lib/chat/checkIn";

// Sat 21 Nov 2026, 09:00 IST.
const NOW = new Date("2026-11-21T03:30:00Z");

const span = (day: string, answered: number, right: number): DaySpan => ({ day, answered, right, topChapter: null });

const ch = (id: string, chapter: string, due: number, notesHref: string | null = null): CheckInChapter => ({
  chapterId: id,
  chapter,
  due,
  notesHref,
  practiceHref: `/go/practice?exam=NDA&subject=Mathematics&chapter=${encodeURIComponent(chapter)}`,
});

function input(over: Partial<DayCardInput> = {}): DayCardInput {
  return {
    exam: { slug: "nda", displayName: "NDA" },
    now: NOW,
    daysLeft: 141,
    days: [],
    fixedOnDay: 0,
    fixedTotal: 0,
    dueChapters: [],
    movedUp: [],
    plan: null,
    ...over,
  };
}

describe("buildCheckIn", () => {
  const stuck = [ch("c-prob", "Probability", 3), ch("c-trig", "Trigonometry", 8, "/notes/nda-maths/trigonometry"), ch("c-vec", "Vectors", 5)];

  it("asks only after 4 or more days away", () => {
    expect(buildCheckIn({ daysAway: 3, due: 4, stuck, top: null })).toBeNull();
    expect(buildCheckIn({ daysAway: null, due: 4, stuck, top: null })).toBeNull();
    expect(buildCheckIn({ daysAway: 4, due: 4, stuck, top: null })).not.toBeNull();
  });

  it("offers the two chapters with the most mistakes waiting, most first", () => {
    const c = buildCheckIn({ daysAway: 6, due: 16, stuck, top: null });
    expect(c?.stuck.map((s) => s.chapter)).toEqual(["Trigonometry", "Vectors"]);
  });

  it("answers Short on time with five of their own mistakes", () => {
    const c = buildCheckIn({ daysAway: 6, due: 16, stuck, top: null });
    expect(c?.short.text).toMatch(/^Then 10 minutes is enough today\. Five of your own mistakes/);
    expect(c?.short.action).toEqual({ label: "Fix 5 mistakes", href: "/drill?from=v_checkin", kind: "fix" });
  });

  it("with no mistakes waiting, answers Short on time with the chapter that carries the most marks", () => {
    const c = buildCheckIn({
      daysAway: 6,
      due: 0,
      stuck: [],
      top: { chapter: "Trigonometry", practiceHref: "/go/practice?exam=NDA&subject=Mathematics&chapter=Trigonometry" },
    });
    expect(c?.short.text).toBe("Then 10 minutes is enough today. Try a few questions from Trigonometry, the chapter that carries the most marks.");
    expect(c?.short.action).toEqual({
      label: "Practise Trigonometry",
      href: "/go/practice?exam=NDA&subject=Mathematics&chapter=Trigonometry",
      kind: "practice",
    });
  });

  it("with nothing at all, points Short on time at their progress", () => {
    const c = buildCheckIn({ daysAway: 6, due: 0, stuck: [], top: null });
    expect(c?.short.action).toEqual({ label: "My full progress", href: "/performance", kind: "performance" });
  });
});

describe("the replies", () => {
  it("asks the question with three taps, never counting the days away", () => {
    expect(CHECKIN_QUESTION).toBe("Good to see you. How's your study going?");
    expect(CHECKIN_CHOICES.map((c) => c.label)).toEqual(["Going well", "Stuck on a chapter", "Short on time"]);
    expect(CHECKIN_WELL_REPLY).toBe("Great. Here's where you left off.");
    for (const s of [CHECKIN_QUESTION, CHECKIN_WELL_REPLY]) expect(s).not.toMatch(/miss|days? away|\d/i);
  });

  it("asks which chapter, naming where the mistakes are, or asks them to say it", () => {
    expect(checkInStuckReply([ch("c", "Trigonometry", 8)])).toBe("Which one? These are where most of your mistakes are.");
    expect(checkInStuckReply([])).toBe("Which chapter? Tell me, and what feels hard about it.");
    expect(CHECKIN_OTHER_DRAFT).toBe("I'm stuck on ");
  });

  it("for a chapter with notes: read them first, then fix its mistakes", () => {
    const r = checkInChapterReply(ch("c-trig", "Trigonometry", 8, "/notes/nda-maths/trigonometry"));
    expect(r.text).toBe("Let's take Trigonometry slowly. Read the short notes first, then fix your 8 mistakes in it.");
    expect(r.actions).toEqual([
      { label: "Read the notes", href: "/notes/nda-maths/trigonometry", kind: "notes" },
      { label: "Fix Trigonometry", href: "/drill?chapter=c-trig&from=v_checkin", kind: "fix" },
    ]);
  });

  it("for a chapter without notes: fix its mistakes, or practise it", () => {
    const r = checkInChapterReply(ch("c-prob", "Probability", 1));
    expect(r.text).toBe("Let's take Probability slowly. Start with the 1 mistake you made in it.");
    expect(r.actions).toEqual([
      { label: "Fix Probability", href: "/drill?chapter=c-prob&from=v_checkin", kind: "fix" },
      { label: "Practise Probability", href: "/go/practice?exam=NDA&subject=Mathematics&chapter=Probability", kind: "practice" },
    ]);
  });

  it("has no em dashes", () => {
    const all = [CHECKIN_QUESTION, CHECKIN_WELL_REPLY, checkInStuckReply([]), checkInChapterReply(ch("c", "X", 2, "/n")).text];
    for (const s of all) expect(s).not.toMatch(/—|–| -- /);
  });
});

describe("buildDayCard: the check-in", () => {
  it("is set, with V's question as the greeting, when the last day with answers was 4+ days ago", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-16", 12, 7)],
        dueChapters: ["Trigonometry"],
        stuckChapters: [ch("c-trig", "Trigonometry", 1)],
      })
    );
    expect(card?.kind).toBe("since");
    expect(card?.greeting).toBe(CHECKIN_QUESTION);
    expect(card?.checkIn?.stuck.map((s) => s.chapter)).toEqual(["Trigonometry"]);
  });

  it("is not set after a shorter gap, nor for a student with no earlier day", () => {
    expect(buildDayCard(input({ days: [span("2026-11-18", 12, 7)], dueChapters: ["X"] }))?.checkIn).toBeNull();
    expect(buildDayCard(input({ dueChapters: ["X"] }))?.checkIn).toBeNull();
  });

  it("uses the big chapters for Short on time when nothing is waiting", () => {
    const card = buildDayCard(
      input({
        days: [span("2026-11-10", 12, 7)],
        fixedTotal: 3,
        bigChapters: [
          { chapterId: "c-trig", chapter: "Trigonometry", subject: "Mathematics", examName: "NDA", qPerPaper: 9, marksPerPaper: 22.5 },
        ],
      })
    );
    expect(card?.checkIn?.short.action.label).toBe("Practise Trigonometry");
  });
});
