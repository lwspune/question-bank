import { describe, it, expect } from "vitest";
import {
  MISTAKES,
  GROUPS_EPOCH,
  puzzleIndexForDay,
  validatePuzzle,
  startGroups,
  submitGroup,
  groupsShareText,
  parseGroupsProgress,
  serializeGroupsProgress,
  recordGroupsResult,
  type Puzzle,
} from "@/lib/play/groups";
import { PUZZLES } from "@/lib/play/data/wordGroups";

const P: Puzzle = {
  id: 1,
  groups: [
    { name: "Stubborn", level: 1, words: ["adamant", "stubborn", "intransigent", "obstinate"] },
    { name: "Praise", level: 2, words: ["compliment", "praise", "extol", "glorify"] },
    { name: "Cannot do without", level: 3, words: ["indispensable", "essential", "necessary", "obligatory"] },
    { name: "Daring or cheek", level: 4, words: ["audacity", "courage", "effrontery", "nerve"] },
  ],
};

describe("validatePuzzle", () => {
  it("accepts 4 groups of 4 with 16 different words and one group per colour", () => {
    expect(validatePuzzle(P)).toEqual([]);
  });

  it("rejects a word used twice, a short group, and two groups of one colour", () => {
    const dup = { ...P, groups: P.groups.map((g, i) => (i === 1 ? { ...g, words: ["adamant", "praise", "extol", "glorify"] } : g)) } as Puzzle;
    expect(validatePuzzle(dup).join(" ")).toMatch(/adamant/);
    const short = { ...P, groups: P.groups.map((g, i) => (i === 0 ? { ...g, words: g.words.slice(0, 3) } : g)) } as Puzzle;
    expect(validatePuzzle(short).length).toBeGreaterThan(0);
    const colour = { ...P, groups: P.groups.map((g) => ({ ...g, level: 1 })) } as Puzzle;
    expect(validatePuzzle(colour).length).toBeGreaterThan(0);
  });
});

describe("every shipped puzzle", () => {
  it("is valid, numbered 1..N, and never repeats a group from another puzzle", () => {
    expect(PUZZLES.length).toBeGreaterThanOrEqual(60);
    PUZZLES.forEach((p, i) => {
      expect(p.id).toBe(i + 1);
      expect(validatePuzzle(p), `puzzle ${p.id}`).toEqual([]);
    });
    const seen = new Map<string, number>();
    for (const p of PUZZLES)
      for (const g of p.groups) {
        const key = [...g.words].map((w) => w.toLowerCase()).sort().join("|");
        expect(seen.get(key), `group ${g.name} in puzzles ${seen.get(key)} and ${p.id}`).toBeUndefined();
        seen.set(key, p.id);
      }
  });

  it("uses plain lower-case single words a tile can hold", () => {
    for (const p of PUZZLES)
      for (const g of p.groups)
        for (const w of g.words) expect(w, `puzzle ${p.id}`).toMatch(/^[a-z][a-z-]{1,13}$/);
  });
});

describe("the puzzle of the day", () => {
  it("day one is puzzle 1, then one a day, starting again after the last", () => {
    expect(puzzleIndexForDay(GROUPS_EPOCH, 60)).toBe(0);
    const d = new Date(`${GROUPS_EPOCH}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + 61);
    expect(puzzleIndexForDay(d.toISOString().slice(0, 10), 60)).toBe(1);
  });

  it("a day before the start still gets a puzzle", () => {
    expect(puzzleIndexForDay("2020-01-01", 60)).toBeGreaterThanOrEqual(0);
  });
});

describe("guessing", () => {
  const pick = (...words: string[]) => words;

  it("four words of one group solve it", () => {
    const r = submitGroup(startGroups(), P, pick("extol", "praise", "glorify", "compliment"));
    expect(r.result).toBe("solved");
    expect(r.state.solved).toEqual([1]);
    expect(r.state.mistakesLeft).toBe(MISTAKES);
  });

  it("three of one group is 'one away' and costs a mistake", () => {
    const r = submitGroup(startGroups(), P, pick("extol", "praise", "glorify", "nerve"));
    expect(r.result).toBe("one-away");
    expect(r.state.mistakesLeft).toBe(MISTAKES - 1);
  });

  it("the same four words twice is not charged again", () => {
    const once = submitGroup(startGroups(), P, pick("extol", "praise", "nerve", "adamant"));
    const twice = submitGroup(once.state, P, pick("praise", "extol", "adamant", "nerve"));
    expect(twice.result).toBe("already");
    expect(twice.state).toBe(once.state);
  });

  it("four mistakes end the game; four groups win it", () => {
    let s = startGroups();
    const wrong = [
      pick("extol", "praise", "nerve", "adamant"),
      pick("extol", "courage", "nerve", "adamant"),
      pick("essential", "praise", "nerve", "adamant"),
      pick("necessary", "praise", "nerve", "obstinate"),
    ];
    for (const w of wrong) s = submitGroup(s, P, w).state;
    expect(s.lost).toBe(true);
    let t = startGroups();
    for (const g of P.groups) t = submitGroup(t, P, [...g.words]).state;
    expect(t.won).toBe(true);
    expect(submitGroup(t, P, pick("extol", "praise", "glorify", "compliment")).result).toBe("over");
  });

  it("rejects anything but four different words of the puzzle", () => {
    expect(submitGroup(startGroups(), P, pick("extol", "praise", "glorify")).result).toBe("invalid");
    expect(submitGroup(startGroups(), P, pick("extol", "extol", "praise", "glorify")).result).toBe("invalid");
    expect(submitGroup(startGroups(), P, pick("extol", "praise", "glorify", "banana")).result).toBe("invalid");
  });

  it("the share grid has one row a guess, coloured by each word's group, and no words", () => {
    let s = startGroups();
    s = submitGroup(s, P, pick("extol", "praise", "nerve", "adamant")).state;
    s = submitGroup(s, P, pick("extol", "praise", "glorify", "compliment")).state;
    const text = groupsShareText(7, s);
    const lines = text.split("\n");
    expect(lines[0]).toContain("7");
    expect(lines.slice(1)).toHaveLength(2);
    expect(text).not.toMatch(/extol|praise/i);
  });
});

describe("results kept in the browser", () => {
  it("records a finished puzzle once and round-trips", () => {
    let s = startGroups();
    for (const g of P.groups) s = submitGroup(s, P, [...g.words]).state;
    const p = recordGroupsResult(parseGroupsProgress(null), 1, s);
    expect(p.done[1]).toEqual({ won: true, mistakes: 0 });
    expect(parseGroupsProgress(serializeGroupsProgress(p))).toEqual(p);
    expect(parseGroupsProgress("{bad")).toEqual(parseGroupsProgress(null));
  });
});
