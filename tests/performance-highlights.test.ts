/**
 * The plain-English layer of /performance (2026-10-08): the band's trend line,
 * steadiness, "What went well", "Fix next", the clock advice and the pace line.
 * Every claim here is printed to a student as a fact about them, so each rule
 * is pinned with the case where it must stay SILENT as well as the case where
 * it speaks. Pure core: src/lib/performance/highlights.ts.
 */
import { describe, it, expect } from "vitest";
import {
  clockAdvice,
  countingNote,
  fixNext,
  paceLine,
  steadiness,
  trendLabel,
  trendLine,
  wentWell,
} from "@/lib/performance/highlights";
import type { ChapterRow, Coverage, Lane, Summary, SubtopicRow, TimeAnalysis } from "@/lib/performance/compute";

function sub(over: Partial<SubtopicRow> = {}): SubtopicRow {
  return {
    chapter: "Vocabulary",
    subtopic: "Synonyms",
    total: 40,
    answered: 30,
    correct: 18,
    wrong: 12,
    seenBlank: 2,
    neverReached: 8,
    judged: 30,
    thin: false,
    accuracy: 60,
    weightedScore: 0.6,
    markScore: 0.6,
    trend: "stable",
    medianSecs: 20,
    timedCount: 30,
    wrongQuestionIds: Array.from({ length: 12 }, (_, i) => `w${i}`),
    seenBlankQuestionIds: ["b1", "b2"],
    ...over,
  };
}

function chapter(name: string, over: Partial<ChapterRow> = {}): ChapterRow {
  const { subtopic: _s, ...rest } = sub({ chapter: name });
  return { ...rest, chapter: name, subtopics: [], ...over };
}

const COVERAGE: Coverage = {
  inPaper: 600,
  reached: 363,
  answered: 334,
  seenBlank: 29,
  neverReached: 237,
  medianSecs: 22,
  headMedianSecs: 26,
  tailMedianSecs: null,
};

const TIME: TimeAnalysis = {
  totalSecs: 11940,
  correctSecs: 7500,
  wrongSecs: 3960,
  blankSecs: 480,
  unjudgedSecs: 0,
  medianCorrectSecs: 21,
  medianWrongSecs: 27,
  medianBlankSecs: 13.5,
  zeroDwell: 0,
  slowest: [],
};

function lane(over: Partial<Lane> = {}): Lane {
  return {
    exam: "NDA",
    subject: "English",
    attempts: 12,
    judged: 334,
    thin: false,
    accuracy: 63,
    coverage: COVERAGE,
    time: TIME,
    difficulty: [
      { difficulty: "EASY", answered: 170, correct: 110, accuracy: 65 },
      { difficulty: "MODERATE", answered: 146, correct: 88, accuracy: 60 },
      { difficulty: "HARD", answered: 18, correct: 13, accuracy: 72 },
    ],
    chapters: [
      chapter("Spotting Errors", { accuracy: 37, judged: 54, trend: "stable" }),
      chapter("Vocabulary", { accuracy: 59, judged: 116, trend: "declining" }),
      chapter("Idioms and Phrases", { accuracy: 65, judged: 34, trend: "improving" }),
      chapter("Sentence Rearrangement", { accuracy: 96, judged: 49, trend: "stable" }),
    ],
    wrongAudit: [sub({ subtopic: "Synonyms", wrong: 20, wrongQuestionIds: Array.from({ length: 20 }, (_, i) => `s${i}`) })],
    skipAudit: [],
    projection: {
      total: 83,
      ceiling: 200,
      rows: [
        { chapter: "Vocabulary", marksAtStake: 70.1, projected: 27.3, gap: 42.8, accuracy: 59, wrongRate: 0.3, judged: 116, reached: 120, thin: false, tested: true },
        { chapter: "Spotting Errors", marksAtStake: 24.6, projected: 1.6, gap: 23.1, accuracy: 37, wrongRate: 0.5, judged: 54, reached: 60, thin: false, tested: true },
      ],
      subtopicRows: [],
    },
    ...over,
  };
}

function summary(over: Partial<Summary> = {}): Summary {
  return {
    graded: 15,
    inProgress: 0,
    retakesDropped: 14,
    belowFloor: 12,
    latest: null,
    deltaPoints: 10,
    attemptQuality: 64,
    consistency: { sd: 0.1, label: "Moderate" },
    ...over,
  };
}

describe("trendLine", () => {
  it("names a rise, in the reader's person", () => {
    expect(trendLine(summary({ deltaPoints: 10 }), "self")).toBe("10 points up on your last paper");
    expect(trendLine(summary({ deltaPoints: 1 }), "staff")).toBe("1 point up on their last paper");
  });

  // Decision 1 (owner, 2026-10-08): a drop is never the headline.
  it("says nothing about a drop, no change, or a first paper", () => {
    expect(trendLine(summary({ deltaPoints: -4 }), "self")).toBeNull();
    expect(trendLine(summary({ deltaPoints: 0 }), "self")).toBeNull();
    expect(trendLine(summary({ deltaPoints: null }), "self")).toBeNull();
  });
});

describe("steadiness", () => {
  it("turns the spread into points between papers", () => {
    expect(steadiness({ sd: 0.1, label: "Moderate" })).toBe("±10");
    expect(steadiness({ sd: 0.064, label: "Consistent" })).toBe("±6");
  });

  it("is null until there are two papers to compare", () => {
    expect(steadiness(null)).toBeNull();
  });
});

describe("wentWell", () => {
  it("leads with the strongest chapters, then an improving one, then hard questions", () => {
    const items = wentWell(lane());
    expect(items.map((i) => i.strong)).toEqual([
      "Sentence Rearrangement: 96% right",
      "Idioms and Phrases: improving",
      "Hard questions: 72% right",
    ]);
    expect(items[0].rest).toBe(" across 49 questions.");
    // Better than easy is said only because it is true here (72 > 65).
    expect(items[2].rest).toBe(", better than easy ones (18 answered).");
  });

  it("never calls a thin chapter strong", () => {
    const items = wentWell(
      lane({ chapters: [chapter("Polity", { accuracy: 100, judged: 3, thin: true })], difficulty: [] })
    );
    expect(items).toEqual([]);
  });

  it("does not praise hard questions on a handful of answers", () => {
    const items = wentWell(
      lane({ chapters: [], difficulty: [{ difficulty: "HARD", answered: 4, correct: 4, accuracy: 100 }] })
    );
    expect(items).toEqual([]);
  });

  it("does not compare hard to easy when hard is not ahead", () => {
    const items = wentWell(
      lane({
        chapters: [],
        difficulty: [
          { difficulty: "EASY", answered: 100, correct: 80, accuracy: 80 },
          { difficulty: "HARD", answered: 20, correct: 14, accuracy: 70 },
        ],
      })
    );
    expect(items).toEqual([{ strong: "Hard questions: 70% right", rest: " (20 answered)." }]);
  });

  it("stops at three", () => {
    const many = ["A", "B", "C", "D"].map((n) => chapter(n, { accuracy: 90, judged: 40 }));
    expect(wentWell(lane({ chapters: many }))).toHaveLength(3);
  });
});

describe("fixNext", () => {
  it("names the most-missed topic, the weakest chapter, then speed", () => {
    const items = fixNext(lane(), "self");
    expect(items.map((i) => i.kind)).toEqual(["mistakes", "chapter", "speed"]);
    expect(items[0]).toMatchObject({ title: "Synonyms", detail: "20 wrong, your most-missed topic" });
    expect(items[0].questionIds).toHaveLength(20);
    expect(items[1]).toMatchObject({ title: "Spotting Errors", detail: "37% right, up to 23 marks to win" });
    expect(items[2]).toMatchObject({ title: "Speed", detail: "237 questions you never reached" });
  });

  it("leaves out marks to win when the projection is hidden", () => {
    const items = fixNext(lane({ projection: null }), "self");
    expect(items.find((i) => i.kind === "chapter")?.detail).toBe("37% right");
  });

  it("does not repeat the most-missed topic's chapter as the weakest chapter", () => {
    const items = fixNext(
      lane({
        chapters: [chapter("Vocabulary", { accuracy: 40, judged: 80 }), chapter("Grammar", { accuracy: 50, judged: 40 })],
        wrongAudit: [sub({ chapter: "Vocabulary", subtopic: "Synonyms", wrong: 20 })],
      }),
      "self"
    );
    expect(items.find((i) => i.kind === "chapter")?.title).toBe("Grammar");
  });

  it("raises speed only when a real share of the paper went unreached", () => {
    const items = fixNext(
      lane({ coverage: { ...COVERAGE, inPaper: 600, neverReached: 30 } }),
      "self"
    );
    expect(items.some((i) => i.kind === "speed")).toBe(false);
  });

  it("speaks in the third person to staff", () => {
    expect(fixNext(lane(), "staff")[0].detail).toBe("20 wrong, their most-missed topic");
  });
});

describe("clockAdvice", () => {
  it("names the unreached questions, then the slow wrong answers", () => {
    expect(clockAdvice(lane(), "self")).toEqual({
      strong: "You ran out of time on 237 questions.",
      rest:
        " That's about speed, not knowledge. You spend longer on wrong answers (27 s) than right ones (21 s): when a question stalls, move on.",
    });
  });

  it("says nothing when the clock was not the problem", () => {
    const calm = lane({
      coverage: { ...COVERAGE, neverReached: 10 },
      time: { ...TIME, medianWrongSecs: 18, medianCorrectSecs: 21 },
    });
    expect(clockAdvice(calm, "self")).toBeNull();
  });

  it("gives the move-on advice alone when everything was reached", () => {
    const reached = lane({ coverage: { ...COVERAGE, neverReached: 0 } });
    expect(clockAdvice(reached, "staff")).toEqual({
      strong: "They spend longer on wrong answers (27 s) than right ones (21 s).",
      rest: " When a question stalls, moving on saves time.",
    });
  });
});

describe("paceLine", () => {
  // The bug that shipped: "26s ... → —s in the last."
  it("never prints a missing number", () => {
    expect(paceLine({ ...COVERAGE, headMedianSecs: 26, tailMedianSecs: null })).toBe(
      "About 26 s a question at the start of a paper."
    );
    expect(paceLine({ ...COVERAGE, headMedianSecs: null, tailMedianSecs: 14 })).toBe(
      "About 14 s a question at the end of a paper."
    );
    expect(paceLine({ ...COVERAGE, headMedianSecs: null, tailMedianSecs: null })).toBeNull();
  });

  it("gives both ends, and calls a rushed finish", () => {
    expect(paceLine({ ...COVERAGE, headMedianSecs: 26, tailMedianSecs: 20 })).toBe(
      "About 26 s a question at the start of a paper, 20 s at the end."
    );
    expect(paceLine({ ...COVERAGE, headMedianSecs: 40, tailMedianSecs: 12 })).toBe(
      "About 40 s a question at the start of a paper, 12 s at the end. The end was rushed."
    );
  });
});

describe("countingNote", () => {
  it("says what was counted and, only if anything was left out, that it was", () => {
    expect(countingNote(summary(), "self")).toBe(
      "Your first try at 15 papers. Retakes and papers you left early aren't counted."
    );
    expect(countingNote(summary({ graded: 1, retakesDropped: 0, belowFloor: 0 }), "self")).toBe(
      "Your first try at 1 paper."
    );
    expect(countingNote(summary({ retakesDropped: 0, belowFloor: 0, inProgress: 2 }), "staff")).toBe(
      "Their first try at 15 papers. 2 still in progress."
    );
  });
});

describe("trendLabel", () => {
  it("uses everyday words", () => {
    expect(trendLabel("improving")).toBe("improving");
    expect(trendLabel("declining")).toBe("slipping");
    expect(trendLabel("volatile")).toBe("up and down");
    expect(trendLabel("stable")).toBe("steady");
    expect(trendLabel("unknown")).toBeNull();
  });
});
