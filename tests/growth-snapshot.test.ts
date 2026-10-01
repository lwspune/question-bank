import { describe, it, expect } from "vitest";
import {
  CHAPTER_TESTS_ANSWERED_KEEP,
  CHAPTER_TESTS_MIN_SITTINGS,
  CHAPTER_TESTS_STUDENTS_KEEP,
  chapterTestsVerdict,
  type ChapterTestWeek,
  CHAPTER_SHARE_KEEP,
  EMAIL_DAILY_CAP,
  INDEXING_GOAL,
  ONBOARDING_KEEP_POINTS,
  chapterShareVerdict,
  emailCapVerdict,
  indexingView,
  onboardingVerdict,
  viewFunnelWeek,
  viewNorthStar,
  type ArmCounts,
} from "@/lib/growth/snapshot";
import { MIN_LIFT_N } from "@/lib/pmf/snapshot";

const LIVE = "2026-10-01";
const BEFORE_CHECK = "2026-10-15";
const AFTER_CHECK = "2026-10-30";

describe("viewNorthStar", () => {
  const weeks = [
    { weekStart: "2026-09-07", learners: 102, learnersTwoPlus: 45 },
    { weekStart: "2026-09-14", learners: 41, learnersTwoPlus: 14 },
    { weekStart: "2026-09-21", learners: 54, learnersTwoPlus: 20 },
    { weekStart: "2026-09-28", learners: 52, learnersTwoPlus: 15 },
  ];

  it("marks the week containing today as partial and reports the last full week", () => {
    const v = viewNorthStar(weeks, "2026-10-01");
    expect(v.weeks.at(-1)!.partial).toBe(true);
    expect(v.weeks.filter((w) => w.partial)).toHaveLength(1);
    expect(v.thisWeek?.twoPlus).toBe(15);
    expect(v.lastFullWeek?.twoPlus).toBe(20);
  });

  it("finds the peak among full weeks", () => {
    const v = viewNorthStar(weeks, "2026-10-01");
    expect(v.peak).toEqual({ weekStart: "2026-09-07", twoPlus: 45 });
  });

  it("flags weeks that end before practice tracking began as undercounted", () => {
    const v = viewNorthStar(weeks, "2026-10-01");
    expect(v.weeks.find((w) => w.weekStart === "2026-09-07")!.undercounted).toBe(true);
    expect(v.weeks.find((w) => w.weekStart === "2026-09-21")!.undercounted).toBe(false);
  });

  it("orders weeks oldest first whatever order they arrive in", () => {
    const v = viewNorthStar([...weeks].reverse(), "2026-10-01");
    expect(v.weeks.map((w) => w.weekStart)).toEqual(weeks.map((w) => w.weekStart));
  });
});

describe("viewFunnelWeek", () => {
  it("states the 7-day return rate once enough students have had 7 full days", () => {
    const v = viewFunnelWeek({
      weekStart: "2026-09-14", signups: 44, signalled: 32, matured: 44, returned7: 11, paid: 0,
    });
    expect(v.returnRate).toBe(25);
    expect(v.signalRate).toBe(73);
  });

  it("withholds the return rate below the sample floor rather than printing a noisy one", () => {
    const v = viewFunnelWeek({
      weekStart: "2026-09-28", signups: 37, signalled: 30, matured: MIN_LIFT_N - 1, returned7: 4, paid: 0,
    });
    expect(v.returnRate).toBeNull();
  });

  it("has no signal rate for a week with no signups", () => {
    const v = viewFunnelWeek({
      weekStart: "2026-09-28", signups: 0, signalled: 0, matured: 0, returned7: 0, paid: 0,
    });
    expect(v.signalRate).toBeNull();
  });
});

function arms(practice: Partial<ArmCounts>, control: Partial<ArmCounts>): ArmCounts[] {
  const base = { onboarded: 0, matured: 0, returned7: 0, twoPlus: 0, firstPractice: 0, firstMock: 0 };
  return [
    { arm: "practice-first", ...base, ...practice },
    { arm: "mock-first", ...base, ...control },
  ];
}

describe("onboardingVerdict", () => {
  it("is too early while either half has fewer than the floor of students with 7 full days", () => {
    const v = onboardingVerdict(arms({ matured: 12, returned7: 6 }, { matured: 9, returned7: 1 }), AFTER_CHECK, LIVE);
    expect(v.status).toBe("too-early");
    expect(v.diffPoints).toBeNull();
  });

  it("gives an early read, not a verdict, before the check date", () => {
    const v = onboardingVerdict(arms({ matured: 20, returned7: 10 }, { matured: 20, returned7: 4 }), BEFORE_CHECK, LIVE);
    expect(v.status).toBe("early-read");
    expect(v.diffPoints).toBe(30);
  });

  it(`keeps practice-first when it beats control by ${ONBOARDING_KEEP_POINTS}+ points after the check date`, () => {
    const v = onboardingVerdict(arms({ matured: 40, returned7: 16 }, { matured: 40, returned7: 10 }), AFTER_CHECK, LIVE);
    expect(v.diffPoints).toBe(15);
    expect(v.status).toBe("keep");
  });

  it(`reverts it when it trails control by ${ONBOARDING_KEEP_POINTS}+ points`, () => {
    const v = onboardingVerdict(arms({ matured: 40, returned7: 4 }, { matured: 40, returned7: 12 }), AFTER_CHECK, LIVE);
    expect(v.status).toBe("kill");
  });

  it("calls a smaller gap 'no clear difference', which this sample size cannot resolve", () => {
    const v = onboardingVerdict(arms({ matured: 40, returned7: 12 }, { matured: 40, returned7: 10 }), AFTER_CHECK, LIVE);
    expect(v.status).toBe("no-difference");
  });

  it("reports both halves' rates", () => {
    const v = onboardingVerdict(arms({ matured: 20, returned7: 10 }, { matured: 25, returned7: 5 }), AFTER_CHECK, LIVE);
    expect(v.rates).toEqual({ "practice-first": 50, "mock-first": 20 });
  });

  it("treats a missing half as zero students", () => {
    const v = onboardingVerdict([{ arm: "practice-first", onboarded: 3, matured: 3, returned7: 1, twoPlus: 0, firstPractice: 1, firstMock: 0 }], AFTER_CHECK, LIVE);
    expect(v.status).toBe("too-early");
  });
});

describe("chapterShareVerdict", () => {
  it("is still running before the check date, whatever the count", () => {
    expect(chapterShareVerdict(1, BEFORE_CHECK, LIVE).status).toBe("running");
  });

  it(`keeps the card at ${CHAPTER_SHARE_KEEP}+ signups by the check date`, () => {
    expect(chapterShareVerdict(CHAPTER_SHARE_KEEP, AFTER_CHECK, LIVE).status).toBe("keep");
  });

  it("removes it below that", () => {
    expect(chapterShareVerdict(CHAPTER_SHARE_KEEP - 1, AFTER_CHECK, LIVE).status).toBe("kill");
  });
});

describe("emailCapVerdict", () => {
  const day = (d: string, sent: number, failed: number) => ({ day: d, sent, failed });
  const LIVE_CAP = "2026-09-25";

  it("holds when nothing failed in the last 7 days", () => {
    const v = emailCapVerdict([day("2026-10-01", 23, 0), day("2026-09-30", 60, 0)], "2026-10-01", LIVE_CAP);
    expect(v.status).toBe("holding");
    expect(v.failed7).toBe(0);
    expect(v.busiest).toEqual({ day: "2026-09-30", total: 60 });
    expect(v.cap).toBe(EMAIL_DAILY_CAP);
  });

  it("fails when any send since it went live hit an error", () => {
    const v = emailCapVerdict([day("2026-09-28", 150, 52)], "2026-10-01", LIVE_CAP);
    expect(v.status).toBe("failing");
    expect(v.failed7).toBe(52);
  });

  it("ignores failures older than 7 days", () => {
    const v = emailCapVerdict([day("2026-09-20", 100, 5), day("2026-10-01", 10, 0)], "2026-10-01", "2026-09-01");
    expect(v.failed7).toBe(0);
    expect(v.status).toBe("holding");
  });

  it("does not hold failures from before the cap went live against it", () => {
    const v = emailCapVerdict(
      [day("2026-09-28", 202, 52), day("2026-10-01", 9, 0)],
      "2026-10-01",
      "2026-10-01"
    );
    expect(v.failed7).toBe(0);
    expect(v.status).toBe("holding");
    expect(v.busiest).toEqual({ day: "2026-10-01", total: 9 });
  });
});

describe("indexingView", () => {
  it("reports the latest reading against the goal, and the change since the one before", () => {
    const v = indexingView([
      { on: "2026-09-21", value: 39 },
      { on: "2026-10-20", value: 64 },
    ]);
    expect(v.latest).toEqual({ on: "2026-10-20", value: 64 });
    expect(v.change).toBe(25);
    expect(v.goal).toBe(INDEXING_GOAL);
    expect(v.status).toBe("tracking");
  });

  it("asks for a reading when there is none", () => {
    const v = indexingView([]);
    expect(v.latest).toBeNull();
    expect(v.change).toBeNull();
  });
});

describe("chapterTestsVerdict", () => {
  const LIVE_CT = "2026-10-01"; // a Thursday: its week starts 2026-09-28
  const week = (weekStart: string, p: Partial<ChapterTestWeek> = {}): ChapterTestWeek => ({
    weekStart,
    fullSittings: 0, fullStudents: 0, fullAnswered: 0, fullQuestions: 0,
    chapterSittings: 0, chapterStudents: 0, chapterAnswered: 0, chapterQuestions: 0,
    anyStudents: 0,
    ...p,
  });

  it("counts only weeks from the one it went live in", () => {
    const v = chapterTestsVerdict(
      [week("2026-09-21", { fullSittings: 9, fullAnswered: 50, fullQuestions: 100 }), week("2026-09-28", { fullSittings: 2, chapterSittings: 3 })],
      "2026-10-02",
      LIVE_CT
    );
    expect(v.since.fullSittings).toBe(2);
    expect(v.since.chapterSittings).toBe(3);
  });

  it("is running before the check date", () => {
    const v = chapterTestsVerdict([week("2026-09-28", { chapterSittings: 4 })], "2026-10-10", LIVE_CT);
    expect(v.status).toBe("running");
  });

  it(`withholds the answered share below ${CHAPTER_TESTS_MIN_SITTINGS} chapter-test sittings`, () => {
    const v = chapterTestsVerdict(
      [week("2026-09-28", { chapterSittings: CHAPTER_TESTS_MIN_SITTINGS - 1, chapterAnswered: 90, chapterQuestions: 100 })],
      "2026-10-10",
      LIVE_CT
    );
    expect(v.since.chapterAnsweredPct).toBeNull();
  });

  it("reports the last full week's MHT-CET mock students, not the partial one", () => {
    const v = chapterTestsVerdict(
      [week("2026-10-19", { anyStudents: 7 }), week("2026-10-26", { anyStudents: 2 })],
      "2026-10-30",
      LIVE_CT
    );
    expect(v.lastFullWeekStudents).toBe(7);
  });

  it(`keeps them featured once weekly MHT-CET mock students reach ${CHAPTER_TESTS_STUDENTS_KEEP}`, () => {
    const v = chapterTestsVerdict(
      [week("2026-10-19", { anyStudents: CHAPTER_TESTS_STUDENTS_KEEP }), week("2026-10-26")],
      "2026-10-30",
      LIVE_CT
    );
    expect(v.status).toBe("keep");
  });

  it(`keeps them featured when chapter tests average ${CHAPTER_TESTS_ANSWERED_KEEP}%+ answered`, () => {
    const v = chapterTestsVerdict(
      [week("2026-10-19", { anyStudents: 4, chapterSittings: 12, chapterAnswered: 180, chapterQuestions: 240 })],
      "2026-10-30",
      LIVE_CT
    );
    expect(v.since.chapterAnsweredPct).toBe(75);
    expect(v.status).toBe("keep");
  });

  it("stops featuring them when neither bar is met by the check date", () => {
    const v = chapterTestsVerdict(
      [week("2026-10-19", { anyStudents: 6, chapterSittings: 12, chapterAnswered: 120, chapterQuestions: 240 })],
      "2026-10-30",
      LIVE_CT
    );
    expect(v.status).toBe("kill");
  });
});
