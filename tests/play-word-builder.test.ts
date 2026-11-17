import { describe, it, expect } from "vitest";
import {
  istDay,
  addDays,
  weekdayName,
  emptyBuilder,
  recordAnswer,
  isMastered,
  isDue,
  dueCount,
  pickRound,
  startRound,
  answerInRound,
  wordStatus,
  parseBuilder,
  serializeBuilder,
  MASTERY_DAYS,
  ROUND_SIZE,
  type BuilderProgress,
} from "@/lib/play/words/builder";
import type { WordEntry } from "@/lib/play/words/extract";
import { seededRng } from "@/lib/play/generate";

const entry = (word: string, over: Partial<WordEntry> = {}): WordEntry => ({
  id: `id-${word}`,
  word,
  kind: "synonym",
  group: "ssc",
  exam: "SSC CGL",
  year: 2025,
  note: "Tier I",
  sentence: null,
  options: ["a", "b", "c", "d"],
  answer: 0,
  solution: "x",
  ...over,
});

const D1 = "2026-11-17";

describe("days are India days", () => {
  it("istDay turns 20:00 UTC into the next India date", () => {
    expect(istDay(new Date("2026-11-17T18:00:00Z"))).toBe("2026-11-17");
    expect(istDay(new Date("2026-11-17T18:31:00Z"))).toBe("2026-11-18");
  });

  it("addDays crosses months and years", () => {
    expect(addDays("2026-11-30", 1)).toBe("2026-12-01");
    expect(addDays("2026-12-31", 2)).toBe("2027-01-02");
  });

  it("weekdayName names the day", () => {
    expect(weekdayName("2026-11-19")).toBe("Thursday");
    expect(weekdayName("2026-11-17")).toBe("Tuesday");
  });
});

describe("recordAnswer: a word is mastered after it is right on 3 different days", () => {
  it("is 3 days", () => {
    expect(MASTERY_DAYS).toBe(3);
    expect(ROUND_SIZE).toBe(10);
  });

  it("a miss brings the word back tomorrow", () => {
    const { progress, counted } = recordAnswer(emptyBuilder(), "cavil", false, D1);
    expect(counted).toBe(true);
    expect(progress.words.cavil).toEqual({ first: D1, last: D1, right: [], misses: 1, due: "2026-11-18" });
  });

  it("right answers space out: 2 days after the first, 4 after the second, then mastered", () => {
    let p = recordAnswer(emptyBuilder(), "cavil", true, D1).progress;
    expect(p.words.cavil.due).toBe("2026-11-19");
    p = recordAnswer(p, "cavil", true, "2026-11-19").progress;
    expect(p.words.cavil.due).toBe("2026-11-23");
    p = recordAnswer(p, "cavil", true, "2026-11-23").progress;
    expect(isMastered(p.words.cavil)).toBe(true);
    expect(p.words.cavil.due).toBeNull();
  });

  it("only the first answer of a day counts: a second try the same day changes nothing", () => {
    const first = recordAnswer(emptyBuilder(), "cavil", false, D1).progress;
    const again = recordAnswer(first, "cavil", true, D1);
    expect(again.counted).toBe(false);
    expect(again.progress).toBe(first);
  });

  it("a miss keeps the days already right", () => {
    let p = recordAnswer(emptyBuilder(), "cavil", true, D1).progress;
    p = recordAnswer(p, "cavil", false, "2026-11-19").progress;
    expect(p.words.cavil.right).toEqual([D1]);
    expect(p.words.cavil.misses).toBe(1);
    expect(p.words.cavil.due).toBe("2026-11-20");
  });

  it("never changes the progress it was given", () => {
    const p = emptyBuilder();
    recordAnswer(p, "cavil", true, D1);
    expect(p.words).toEqual({});
  });
});

describe("isDue and dueCount", () => {
  it("a word is due on or after its date, unless mastered or already answered today", () => {
    const p = recordAnswer(emptyBuilder(), "cavil", false, D1).progress;
    expect(isDue(p.words.cavil, D1)).toBe(false);
    expect(isDue(p.words.cavil, "2026-11-18")).toBe(true);
    expect(isDue(p.words.cavil, "2026-11-25")).toBe(true);
    expect(dueCount(p, "2026-11-18")).toBe(1);
    expect(dueCount(p, D1)).toBe(0);
  });
});

describe("pickRound", () => {
  const pool = ["abate", "cavil", "deter", "grumpy", "laud", "mercurial", "placate", "sentient", "trenchant", "wary", "zeal", "awry"].map(
    (w) => entry(w)
  );

  it("puts due words first, oldest due date first, then new words", () => {
    let p: BuilderProgress = emptyBuilder();
    p = recordAnswer(p, "wary", false, "2026-11-10").progress; // due 11-11
    p = recordAnswer(p, "cavil", false, "2026-11-14").progress; // due 11-15
    p = recordAnswer(p, "laud", true, "2026-11-16").progress; // due 11-18, not yet
    const round = pickRound(pool, p, D1, seededRng(1));
    expect(round.slice(0, 2).map((e) => e.word)).toEqual(["wary", "cavil"]);
    expect(round).toHaveLength(ROUND_SIZE);
    expect(round.map((e) => e.word)).not.toContain("laud");
    expect(new Set(round.map((e) => e.word)).size).toBe(ROUND_SIZE);
  });

  it("leaves out mastered words and words answered today", () => {
    let p: BuilderProgress = emptyBuilder();
    for (const d of ["2026-11-01", "2026-11-03", "2026-11-07"]) p = recordAnswer(p, "abate", true, d).progress;
    p = recordAnswer(p, "deter", false, D1).progress;
    const words = pickRound(pool, p, D1, seededRng(2), 50).map((e) => e.word);
    expect(words).not.toContain("abate");
    expect(words).not.toContain("deter");
    expect(words).toHaveLength(pool.length - 2);
  });

  it("is short, not padded, when the pool runs out", () => {
    expect(pickRound(pool.slice(0, 3), emptyBuilder(), D1, seededRng(3))).toHaveLength(3);
  });
});

describe("a round: a missed word comes back once at the end", () => {
  it("re-queues a miss once and reports first-try results", () => {
    let r = startRound(["a", "b", "c"]);
    expect(r.queue[0]).toBe("a");
    r = answerInRound(r, false); // a missed -> back at the end
    expect(r.queue).toEqual(["b", "c", "a"]);
    r = answerInRound(r, true);
    r = answerInRound(r, true);
    r = answerInRound(r, false); // a missed again: not re-queued twice
    expect(r.queue).toEqual([]);
    expect(r.firstTry).toEqual({ a: false, b: true, c: true });
    expect(r.answers).toBe(4);
  });

  it("does nothing once the queue is empty", () => {
    const r = answerInRound(startRound([]), true);
    expect(r.queue).toEqual([]);
    expect(r.answers).toBe(0);
  });
});

describe("wordStatus", () => {
  it("is New on the day a word is first seen, Learning after, Mastered at 3 days", () => {
    let p = recordAnswer(emptyBuilder(), "cavil", true, D1).progress;
    expect(wordStatus(p.words.cavil, D1)).toBe("New");
    expect(wordStatus(p.words.cavil, "2026-11-19")).toBe("Learning");
    p = recordAnswer(p, "cavil", true, "2026-11-19").progress;
    p = recordAnswer(p, "cavil", true, "2026-11-23").progress;
    expect(wordStatus(p.words.cavil, "2026-11-23")).toBe("Mastered");
  });
});

describe("parseBuilder: saved progress", () => {
  it("round-trips", () => {
    let p = recordAnswer(emptyBuilder(), "cavil", true, D1).progress;
    p = { ...p, group: "nda" };
    expect(parseBuilder(serializeBuilder(p))).toEqual(p);
  });

  it("starts fresh on anything it cannot read", () => {
    for (const raw of [null, "", "{", "[]", '{"v":2,"group":"all","words":{}}', '{"v":1,"group":"mars","words":{}}']) {
      expect(parseBuilder(raw)).toEqual(emptyBuilder());
    }
  });

  it("drops a word whose state is malformed and keeps the rest", () => {
    const raw = JSON.stringify({
      v: 1,
      group: "all",
      words: {
        cavil: { first: D1, last: D1, right: [D1], misses: 0, due: "2026-11-19" },
        bad: { first: 3, last: D1, right: "x", misses: -1, due: null },
      },
    });
    expect(Object.keys(parseBuilder(raw).words)).toEqual(["cavil"]);
  });
});
