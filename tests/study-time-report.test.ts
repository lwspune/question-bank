/**
 * The study-time report shared by Home's card and V (lib/studyTime/report.ts):
 * what a student's own time adds up to, today and over the last 7 days, and
 * how it sits next to the paper. Every line that would say "0" or "less" is
 * left out (ENGAGEMENT_SPEC.md principles gate).
 */
import { describe, it, expect } from "vitest";
import {
  buildStudyCard,
  dayStudyLine,
  formatDuration,
  pickStudyNext,
  studyProgressRows,
  usualDaySecs,
  type StudyRow,
} from "@/lib/studyTime/report";
import type { ChapterWeight } from "@/lib/me/startNext";

const EXAM = "e-nda";
const OTHER = "e-cds";
// Sat 21 Nov 2026, 18:00 in India.
const NOW = new Date("2026-11-21T12:30:00Z");

function row(day: string, kind: StudyRow["kind"], mins: number, chapter: string | null, subject = "Mathematics", examId: string | null = EXAM): StudyRow {
  return {
    day,
    kind,
    secs: mins * 60,
    chapterId: chapter ? `c-${chapter}` : null,
    chapter,
    subject: chapter ? subject : null,
    examId: chapter ? examId : null,
  };
}

function weight(chapter: string, marks: number, subject = "Mathematics"): ChapterWeight {
  return {
    chapterId: `c-${chapter}`,
    chapter,
    subject,
    exam: "NDA",
    paperCode: "maths",
    papers: 10,
    qPerPaper: marks / 2.5,
    marksPerPaper: marks,
    paperMarks: 300,
  };
}

const input = (rows: StudyRow[], weights: ChapterWeight[] = []) => ({
  rows,
  now: NOW,
  examId: EXAM,
  examLabel: "NDA",
  weights,
});

describe("formatDuration", () => {
  it("writes minutes, hours, and hours with minutes", () => {
    expect(formatDuration(42 * 60)).toBe("42 min");
    expect(formatDuration(3600)).toBe("1 h");
    expect(formatDuration(200 * 60)).toBe("3 h 20 min");
    expect(formatDuration(65 * 60 + 29)).toBe("1 h 5 min");
    expect(formatDuration(20)).toBe("1 min");
  });
});

describe("buildStudyCard", () => {
  it("is null under 15 minutes in the last 7 days", () => {
    expect(buildStudyCard(input([row("2026-11-21", "practice", 14, "Matrices")]))).toBeNull();
    expect(buildStudyCard(input([row("2026-11-21", "practice", 15, "Matrices")]))).not.toBeNull();
  });

  it("adds today's time by kind and chapter, most first", () => {
    const card = buildStudyCard(
      input([
        row("2026-11-21", "practice", 20, "Definite Integration"),
        row("2026-11-21", "reading", 4, "Definite Integration"),
        row("2026-11-21", "practice", 11, "Probability"),
        row("2026-11-21", "reading", 7, "Matrices"),
      ])
    )!;
    expect(card.today?.label).toBe("Today");
    expect(card.today?.summary.secs).toBe(42 * 60);
    expect(card.today?.summary.split).toEqual({ practice: 31 * 60, mock: 0, reading: 11 * 60 });
    expect(card.today?.summary.chapters.map((c) => [c.chapter, c.secs / 60])).toEqual([
      ["Definite Integration", 24],
      ["Probability", 11],
      ["Matrices", 7],
    ]);
  });

  it("shows the last day studied when nothing is in yet today", () => {
    const card = buildStudyCard(input([row("2026-11-20", "practice", 35, "Matrices")]))!;
    expect(card.today?.label).toBe("Yesterday");
    const older = buildStudyCard(input([row("2026-11-17", "practice", 35, "Matrices")]))!;
    expect(older.today?.label).toBe("Tue");
  });

  it("keeps only the exam in focus, and says what all exams add up to", () => {
    const card = buildStudyCard(
      input([
        row("2026-11-21", "practice", 30, "Matrices"),
        row("2026-11-21", "practice", 20, "Reading Comprehension", "English", OTHER),
        row("2026-11-21", "reading", 5, null),
      ])
    )!;
    expect(card.week.summary.secs).toBe(30 * 60);
    expect(card.week.allExamsSecs).toBe(55 * 60);
    const all = buildStudyCard({ ...input([row("2026-11-21", "practice", 30, "Matrices")]), examId: null })!;
    expect(all.week.allExamsSecs).toBeNull();
  });

  it("draws the last 7 days, today last, a day with nothing as 0", () => {
    const card = buildStudyCard(
      input([row("2026-11-15", "practice", 35, "Matrices"), row("2026-11-21", "mock", 42, "Matrices"), row("2026-11-14", "practice", 90, "Matrices")])
    )!;
    expect(card.week.days.map((d) => [d.label, d.secs / 60])).toEqual([
      ["Sun", 35],
      ["Mon", 0],
      ["Tue", 0],
      ["Wed", 0],
      ["Thu", 0],
      ["Fri", 0],
      ["Today", 42],
    ]);
    expect(card.week.summary.secs).toBe(77 * 60);
  });

  it("compares with last week only when the clock ran last week", () => {
    const withClock = buildStudyCard(
      input([row("2026-11-21", "practice", 30, "Matrices"), row("2026-11-12", "reading", 20, "Matrices")])
    )!;
    expect(withClock.week.lastWeekSecs).toBe(20 * 60);
    expect(withClock.week.since).toBeNull();

    // Only a mock last week: the clock had not started, so no comparison, and
    // the week counts from the clock's first day.
    const firstWeek = buildStudyCard(
      input([
        row("2026-11-12", "mock", 60, "Matrices"),
        row("2026-11-16", "mock", 40, "Matrices"),
        row("2026-11-18", "practice", 30, "Probability"),
        row("2026-11-21", "reading", 18, "Probability"),
      ])
    )!;
    expect(firstWeek.week.lastWeekSecs).toBeNull();
    expect(firstWeek.week.since).toBe("Wed");
    expect(firstWeek.week.summary.secs).toBe(48 * 60);
  });

  it("sets the subject with most time against the paper, within that subject's marks", () => {
    const card = buildStudyCard(
      input(
        [
          row("2026-11-20", "practice", 65, "Definite Integration"),
          row("2026-11-21", "practice", 30, "Matrices"),
          row("2026-11-21", "reading", 10, "Some Unweighted Chapter"),
          row("2026-11-21", "practice", 20, "Reading Comprehension", "English"),
        ],
        [weight("Definite Integration", 20), weight("Matrices", 15), weight("Trigonometry", 30), weight("Rare", 1), weight("Grammar", 50, "English")]
      )
    )!;
    expect(card.paper?.subject).toBe("Mathematics");
    // Rare (under a question a paper, no time) is left out; the unweighted
    // chapter's time still counts in the subject's total (105 min).
    expect(card.paper?.rows.map((r) => [r.chapter, Math.round(r.secs / 60), r.timePct, r.paperPct])).toEqual([
      ["Definite Integration", 65, 62, 30],
      ["Matrices", 30, 29, 23],
      ["Trigonometry", 0, 0, 45],
    ]);
  });

  it("leaves the paper out under an hour in the subject, or with no weights", () => {
    const short = buildStudyCard(input([row("2026-11-21", "practice", 59, "Matrices")], [weight("Matrices", 15)]))!;
    expect(short.paper).toBeNull();
    expect(short.paperSoon).toBe(true);
    const none = buildStudyCard(input([row("2026-11-21", "practice", 90, "Matrices")]))!;
    expect(none.paper).toBeNull();
    expect(none.paperSoon).toBe(false);
  });

  it("says 'more than your usual day' only when today is above it", () => {
    const days = ["2026-11-10", "2026-11-12", "2026-11-14", "2026-11-17", "2026-11-19"].map((d) => row(d, "practice", 30, "Matrices"));
    const above = buildStudyCard(input([...days, row("2026-11-21", "practice", 42, "Matrices")]))!;
    expect(above.today?.usualSecs).toBe(30 * 60);
    const below = buildStudyCard(input([...days, row("2026-11-21", "practice", 20, "Matrices")]))!;
    expect(below.today?.usualSecs).toBeNull();
  });
});

describe("usualDaySecs", () => {
  it("is the median of days studied in the 28 before today, from 3 days on", () => {
    const today = "2026-11-21";
    expect(usualDaySecs([row("2026-11-10", "practice", 30, "M"), row("2026-11-12", "practice", 50, "M")], today)).toBeNull();
    expect(
      usualDaySecs(
        [row("2026-11-10", "practice", 30, "M"), row("2026-11-12", "practice", 50, "M"), row("2026-11-14", "practice", 10, "M"), row("2026-11-21", "practice", 99, "M"), row("2026-10-01", "practice", 500, "M")],
        today
      )
    ).toBe(30 * 60);
  });
});

describe("pickStudyNext", () => {
  const weights = [weight("Definite Integration", 20), weight("Matrices", 15), weight("Trigonometry", 30), weight("Vectors", 25)];
  const card = buildStudyCard(
    input([row("2026-11-20", "practice", 65, "Definite Integration"), row("2026-11-21", "practice", 30, "Matrices")], weights)
  )!;

  it("names the chapter worth most in the paper that got no time and is not strong yet", () => {
    expect(pickStudyNext(card, new Set())).toMatchObject({ chapter: "Trigonometry", subject: "Mathematics", paperPct: 33, praise: "Definite Integration" });
    expect(pickStudyNext(card, new Set(["Mathematics|Trigonometry"]))?.chapter).toBe("Vectors");
  });

  it("is null when every weighted chapter got time or is strong", () => {
    expect(pickStudyNext(card, new Set(["Mathematics|Trigonometry", "Mathematics|Vectors"]))).toBeNull();
  });

  it("praises the top chapter only from 30 minutes", () => {
    const small = buildStudyCard(
      input(
        [row("2026-11-21", "practice", 29, "Definite Integration"), row("2026-11-20", "practice", 29, "Matrices"), row("2026-11-19", "reading", 29, "Matrices")],
        weights
      )
    )!;
    expect(pickStudyNext(small, new Set())?.praise).toBe("Matrices");
    const tiny = buildStudyCard(
      input(
        [row("2026-11-21", "practice", 29, "Definite Integration"), row("2026-11-20", "practice", 25, "Matrices"), row("2026-11-19", "reading", 25, "Vectors")],
        weights
      )
    )!;
    expect(pickStudyNext(tiny, new Set())?.praise).toBeNull();
  });
});

describe("dayStudyLine", () => {
  it("gives a day's time in the exam with its top chapter, from 5 minutes", () => {
    const rows = [
      row("2026-11-20", "practice", 18, "Definite Integration"),
      row("2026-11-20", "reading", 6, "Definite Integration"),
      row("2026-11-20", "practice", 18, "Matrices"),
      row("2026-11-20", "practice", 30, "Reading Comprehension", "English", OTHER),
    ];
    expect(dayStudyLine(rows, "2026-11-20", EXAM)).toEqual({ secs: 42 * 60, top: { chapter: "Definite Integration", secs: 24 * 60 } });
    expect(dayStudyLine([row("2026-11-20", "practice", 4, "Matrices")], "2026-11-20", EXAM)).toBeNull();
  });
});

describe("studyProgressRows (V's How's my progress)", () => {
  const weights = [weight("Definite Integration", 20), weight("Matrices", 15), weight("Trigonometry", 30)];

  it("gives the week's time with its split, top chapter and last week, then the chapter the paper wants", () => {
    const card = buildStudyCard(
      input(
        [
          row("2026-11-12", "reading", 20, "Matrices"),
          row("2026-11-20", "practice", 65, "Definite Integration"),
          row("2026-11-21", "mock", 30, "Matrices"),
          row("2026-11-21", "reading", 5, "Matrices"),
        ],
        weights
      )
    )!;
    const next = pickStudyNext(card, new Set());
    expect(studyProgressRows(card, next)).toEqual([
      {
        label: "Study time this week",
        value: "1 h 40 min",
        detail: "Practice 1 h 5 min · Mocks 30 min · Reading 5 min. Most on Definite Integration (1 h 5 min). Last week 20 min.",
      },
      { label: "Time vs the paper", value: "Trigonometry got no time", detail: "It is about 46% of the NDA Mathematics marks." },
    ]);
  });

  it("is empty without a card, and has no paper row without a suggestion", () => {
    expect(studyProgressRows(null, null)).toEqual([]);
    const card = buildStudyCard(input([row("2026-11-21", "practice", 20, "Matrices")]))!;
    expect(studyProgressRows(card, null)).toEqual([
      { label: "Study time this week", value: "20 min", detail: "Practice 20 min. Most on Matrices (20 min)." },
    ]);
  });
});
