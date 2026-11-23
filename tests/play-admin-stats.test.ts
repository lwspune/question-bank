import { describe, it, expect } from "vitest";
import { buildPlayStats, gameOf, STUDY_KINDS, type PlayRoundRow, type StudyRow } from "@/lib/play/adminStats";
import { LEVELS } from "@/lib/play/levels";

const NOW = new Date("2026-11-17T08:00:00Z"); // 13:30 IST, 17 Nov

function maths(userId: string, at: string, level: number, correct: number, wrong: number, cleared: boolean): PlayRoundRow {
  return { userId, createdAt: at, metadata: { level, correct, wrong, points: correct * 10, cleared } };
}

function build(rounds: PlayRoundRow[], study: StudyRow[] = [], now = NOW) {
  return buildPlayStats({ rounds, study, names: new Map([["a", "Asha"], ["b", "Bilal"]]), now });
}

describe("gameOf: which game a play_round row is", () => {
  it("a row with no game field is the maths game (every row before the /play hub)", () => {
    expect(gameOf({ level: 1, correct: 3 })).toBe("maths");
  });
  it("reads the English games by their game field", () => {
    expect(gameOf({ game: "word_builder" })).toBe("word_builder");
    expect(gameOf({ game: "daily_word" })).toBe("daily_word");
  });
  it("an unknown game is 'other', never dropped", () => {
    expect(gameOf({ game: "chess" })).toBe("other");
    expect(gameOf(null)).toBe("maths");
  });
});

describe("summary", () => {
  it("counts players, rounds, today's rounds (India time) and players back on a second day", () => {
    const s = build([
      maths("a", "2026-11-15T10:00:00Z", 1, 20, 2, true),
      maths("a", "2026-11-17T07:00:00Z", 2, 10, 5, false),
      // 16 Nov 19:00 UTC = 17 Nov 00:30 IST: today in India, yesterday in UTC.
      maths("b", "2026-11-16T19:00:00Z", 1, 5, 1, false),
    ]);
    expect(s.summary).toMatchObject({
      players: 2,
      rounds: 3,
      roundsToday: 2,
      playersToday: 2,
      cameBack: 1,
      lastRoundAt: "2026-11-17T07:00:00Z",
    });
  });

  it("is all zeros with no rounds", () => {
    const s = build([]);
    expect(s.summary).toMatchObject({ players: 0, rounds: 0, roundsToday: 0, cameBack: 0, lastRoundAt: null });
    expect(s.players).toEqual([]);
    expect(s.recent).toEqual([]);
  });
});

describe("levels (maths game)", () => {
  it("has a row for every level, even one nobody has played", () => {
    const s = build([maths("a", "2026-11-17T06:00:00Z", 1, 20, 2, true)]);
    expect(s.levels.map((l) => l.id)).toEqual(LEVELS.map((l) => l.id));
    const l8 = s.levels.find((l) => l.id === 8)!;
    expect(l8).toMatchObject({ rounds: 0, players: 0, clearedPct: null, medianCorrect: null, hint: null });
  });

  it("counts rounds, cleared share, first tries and the median right answers", () => {
    const s = build([
      maths("a", "2026-11-17T06:00:00Z", 1, 14, 4, false), // a's first try: not cleared
      maths("a", "2026-11-17T06:01:00Z", 1, 20, 2, true),
      maths("b", "2026-11-17T06:02:00Z", 1, 24, 1, true), // b's first try: cleared
    ]);
    const l1 = s.levels.find((l) => l.id === 1)!;
    expect(l1).toMatchObject({
      rounds: 3,
      players: 2,
      cleared: 2,
      clearedPct: 67,
      firstTries: 2,
      firstTryCleared: 1,
      firstTryClearPct: 50,
      medianCorrect: 20,
      target: 20,
    });
    // (14/18 + 20/22 + 24/25) / 3 → median of 78, 91, 96
    expect(l1.medianAccuracyPct).toBe(91);
  });

  it("orders first tries by time, not by row order", () => {
    const s = build([
      maths("a", "2026-11-17T06:05:00Z", 2, 30, 0, true),
      maths("a", "2026-11-17T06:00:00Z", 2, 5, 5, false),
    ]);
    expect(s.levels.find((l) => l.id === 2)!).toMatchObject({ firstTries: 1, firstTryCleared: 0 });
  });

  it("gives no hint below 5 first tries", () => {
    const rounds = ["a", "b", "c", "d"].map((u, i) => maths(u, `2026-11-17T06:0${i}:00Z`, 2, 38, 0, true));
    expect(build(rounds).levels.find((l) => l.id === 2)!.hint).toBe(null);
  });

  it("calls a level easy when 80%+ of first tries clear it", () => {
    const rounds = ["a", "b", "c", "d", "e"].map((u, i) => maths(u, `2026-11-17T06:0${i}:00Z`, 2, 38, 0, true));
    expect(build(rounds).levels.find((l) => l.id === 2)!.hint).toBe("easy");
  });

  it("calls a level hard when under 20% of its rounds clear", () => {
    const rounds = ["a", "b", "c", "d", "e", "f"].map((u, i) => maths(u, `2026-11-17T06:0${i}:00Z`, 4, 5, 3, false));
    expect(build(rounds).levels.find((l) => l.id === 4)!.hint).toBe("hard");
  });

  it("ignores a maths row whose level is not a real level", () => {
    const s = build([maths("a", "2026-11-17T06:00:00Z", 99, 5, 0, true)]);
    expect(s.levels.every((l) => l.rounds === 0)).toBe(true);
    expect(s.summary.rounds).toBe(1);
  });
});

describe("English games", () => {
  it("summarises Word Builder and Daily Word rounds apart from maths", () => {
    const s = build([
      { userId: "a", createdAt: "2026-11-17T06:00:00Z", metadata: { game: "word_builder", correct: 7, wrong: 3, mastered: 1 } },
      { userId: "b", createdAt: "2026-11-17T06:01:00Z", metadata: { game: "word_builder", correct: 9, wrong: 1, mastered: 2 } },
      { userId: "a", createdAt: "2026-11-17T06:02:00Z", metadata: { game: "daily_word", solved: true, guesses: 3 } },
      { userId: "b", createdAt: "2026-11-17T06:03:00Z", metadata: { game: "daily_word", solved: false, guesses: 6 } },
      { userId: "b", createdAt: "2026-11-17T06:04:00Z", metadata: { game: "daily_word", solved: true, guesses: 5 } },
    ]);
    expect(s.games.find((g) => g.game === "word_builder")).toMatchObject({ rounds: 2, players: 2 });
    expect(s.wordBuilder).toEqual({ rounds: 2, medianCorrect: 8, mastered: 3 });
    expect(s.dailyWord).toEqual({ rounds: 3, solved: 2, solvedPct: 67, medianGuesses: 4 });
    expect(s.levels.every((l) => l.rounds === 0)).toBe(true);
  });

  it("lists only games that have rounds", () => {
    const s = build([maths("a", "2026-11-17T06:00:00Z", 1, 20, 2, true)]);
    expect(s.games.map((g) => g.game)).toEqual(["maths"]);
  });
});

describe("rounds per day", () => {
  it("covers the last 28 India days, newest first, zero-filled", () => {
    const s = build([
      maths("a", "2026-11-17T06:00:00Z", 1, 20, 2, true),
      maths("b", "2026-11-17T06:30:00Z", 1, 20, 2, true),
      maths("a", "2026-11-15T06:00:00Z", 1, 20, 2, true),
      maths("a", "2026-10-01T06:00:00Z", 1, 20, 2, true), // older than 28 days
    ]);
    expect(s.perDay).toHaveLength(28);
    expect(s.perDay[0]).toEqual({ day: "2026-11-17", rounds: 2, players: 2 });
    expect(s.perDay[1]).toEqual({ day: "2026-11-16", rounds: 0, players: 0 });
    expect(s.perDay[2]).toEqual({ day: "2026-11-15", rounds: 1, players: 1 });
    expect(s.perDay[27].day).toBe("2026-10-21");
  });
});

describe("players and study before / after the first round", () => {
  it("counts study DAYS in the 7 days before and after the first round, as scripts/play/readout.sql does", () => {
    const first = "2026-11-08T06:00:00Z"; // 8 Nov 11:30 IST
    const s = build(
      [maths("a", first, 1, 20, 2, true), maths("a", "2026-11-10T06:00:00Z", 2, 10, 2, false)],
      [
        { userId: "a", createdAt: "2026-11-02T06:00:00Z" }, // before
        { userId: "a", createdAt: "2026-11-02T09:00:00Z" }, // same IST day: one day
        { userId: "a", createdAt: "2026-11-07T17:00:00Z" }, // 7 Nov 22:30 IST: before
        { userId: "a", createdAt: "2026-11-07T19:00:00Z" }, // 8 Nov 00:30 IST: the first round's day counts as after
        { userId: "a", createdAt: "2026-11-12T06:00:00Z" }, // after
        { userId: "a", createdAt: "2026-11-15T07:00:00Z" }, // past the 7 days: neither
        { userId: "a", createdAt: "2026-10-30T06:00:00Z" }, // before the 7 days: neither
      ]
    );
    expect(s.players[0]).toMatchObject({
      userId: "a",
      name: "Asha",
      rounds: 2,
      days: 2,
      topLevel: 2,
      levelsCleared: 1,
      studyBefore: 2,
      studyAfter: 2,
      weekAfterDone: true,
    });
  });

  it("marks a player whose 7 days after have not passed, and leaves them out of the comparison", () => {
    const s = build(
      [maths("a", "2026-11-17T06:00:00Z", 1, 20, 2, true), maths("b", "2026-11-01T06:00:00Z", 1, 20, 2, true)],
      [
        { userId: "b", createdAt: "2026-10-28T06:00:00Z" },
        { userId: "b", createdAt: "2026-11-02T06:00:00Z" },
        { userId: "b", createdAt: "2026-11-03T06:00:00Z" },
      ]
    );
    expect(s.players.find((p) => p.userId === "a")!.weekAfterDone).toBe(false);
    expect(s.experiment).toMatchObject({
      players: 2,
      compared: 1,
      medianBefore: 1,
      medianAfter: 2,
      studiedMore: 1,
      studiedLess: 0,
      cameBackPct: 0,
    });
  });

  it("names an unknown player by a short id, and sorts players by their latest round", () => {
    const s = build([maths("zzzzzzzz-1234", "2026-11-17T07:00:00Z", 1, 3, 0, false), maths("a", "2026-11-17T06:00:00Z", 1, 3, 0, false)]);
    expect(s.players.map((p) => p.userId)).toEqual(["zzzzzzzz-1234", "a"]);
    expect(s.players[0].name).toBe("Student zzzzzzzz");
  });

  it("lists the games each player has played", () => {
    const s = build([
      maths("a", "2026-11-17T06:00:00Z", 1, 3, 0, false),
      { userId: "a", createdAt: "2026-11-17T06:05:00Z", metadata: { game: "daily_word", solved: true, guesses: 2 } },
    ]);
    expect(s.players[0].games).toEqual(["maths", "daily_word"]);
  });
});

describe("recent rounds", () => {
  it("lists the newest 50, newest first, with a one-line result", () => {
    const rounds = Array.from({ length: 55 }, (_, i) =>
      maths("a", new Date(Date.parse("2026-11-17T00:00:00Z") + i * 60_000).toISOString(), 1, i, 1, i >= 20)
    );
    const s = build(rounds);
    expect(s.recent).toHaveLength(50);
    expect(s.recent[0]).toMatchObject({ name: "Asha", game: "maths", result: "Level 1 · 54 right, 1 wrong", cleared: true });
  });

  it("describes the English games in their own terms", () => {
    const s = build([
      { userId: "a", createdAt: "2026-11-17T06:00:00Z", metadata: { game: "word_builder", correct: 7, wrong: 3, mastered: 1 } },
      { userId: "b", createdAt: "2026-11-17T06:01:00Z", metadata: { game: "daily_word", solved: false, guesses: 6 } },
    ]);
    expect(s.recent[0]).toMatchObject({ game: "daily_word", result: "Not solved in 6 guesses", cleared: false });
    expect(s.recent[1]).toMatchObject({ game: "word_builder", result: "7 right first try, 3 wrong · 1 mastered", cleared: null });
  });
});

it("STUDY_KINDS are the readout's study kinds, and never play_round", () => {
  expect([...STUDY_KINDS].sort()).toEqual(
    ["drill_completed", "drill_started", "mock_submitted", "note_checkpoint", "question_practiced"].sort()
  );
});

describe("the arcade games (2026-11-18) on /dashboard/play", () => {
  it("reads each new game by name and gives it a result line", () => {
    for (const g of ["number_rain", "word_groups", "launch", "element_hunt", "timeline", "pin_it"]) {
      expect(gameOf({ game: g })).toBe(g);
    }
    expect(gameOf({ game: "chess" })).toBe("other");
    const s = buildPlayStats({
      rounds: [
        { userId: "a", createdAt: "2026-11-18T06:00:00Z", metadata: { game: "number_rain", world: 2, score: 340, blasts: 25, missed: 3 } },
        { userId: "b", createdAt: "2026-11-18T06:01:00Z", metadata: { game: "launch", level: 4, hit: true, shots: 2 } },
      ],
      study: [],
      names: new Map(),
      now: new Date("2026-11-18T12:00:00Z"),
    });
    expect(s.games.map((g) => g.game)).toEqual(["number_rain", "launch"]);
    expect(s.recent.find((r) => r.game === "launch")).toMatchObject({ result: "Level 4 · 2 shots", cleared: true });
  });
});
