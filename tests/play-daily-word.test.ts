import { describe, it, expect } from "vitest";
import {
  scoreGuess,
  keyMarks,
  clueFor,
  isDailyCandidate,
  dailyWord,
  isValidGuess,
  emptyDaily,
  recordGuess,
  dayState,
  shareText,
  parseDaily,
  serializeDaily,
  CLUE_AFTER,
  MAX_GUESSES,
  KEEP_DAYS,
} from "@/lib/play/words/daily";
import type { WordEntry } from "@/lib/play/words/extract";

const entry = (word: string): WordEntry => ({
  id: `id-${word}`,
  word,
  kind: "synonym",
  group: "ssc",
  exam: "SSC CGL",
  year: 2025,
  note: "Tier I",
  sentence: null,
  options: ["Praise", "Quibble", "Approve", "Ignore"],
  answer: 1,
  solution: "x",
});

describe("scoreGuess: b = right place, o = in the word elsewhere, g = not in it", () => {
  it("scores the mockup's guesses against CAVIL", () => {
    expect(scoreGuess("plain", "cavil")).toEqual(["g", "o", "o", "b", "g"]);
    expect(scoreGuess("claim", "cavil")).toEqual(["b", "o", "o", "b", "g"]);
    expect(scoreGuess("cavil", "cavil")).toEqual(["b", "b", "b", "b", "b"]);
  });

  it("marks a repeated letter only as many times as the answer has it", () => {
    // ABATE has one E and two A.
    // The last E is in its place, so the two earlier Es have nothing left to match.
    expect(scoreGuess("eerie", "abate")).toEqual(["g", "g", "g", "g", "b"]);
    // The middle A is in its place; the last A takes the answer's other A.
    expect(scoreGuess("llama", "abate")).toEqual(["g", "g", "b", "g", "o"]);
    expect(scoreGuess("table", "abate")).toEqual(["o", "o", "o", "g", "b"]);
    // The right-place letter is used up first.
    expect(scoreGuess("aaaaa", "abate")).toEqual(["b", "g", "b", "g", "g"]);
  });

  it("is case-blind", () => {
    expect(scoreGuess("CAVIL", "cavil")).toEqual(["b", "b", "b", "b", "b"]);
  });
});

describe("keyMarks: the keyboard keeps each letter's best mark", () => {
  it("right place beats elsewhere beats not in the word", () => {
    const k = keyMarks(["plain", "claim"], "cavil");
    expect(k).toEqual({ p: "g", l: "o", a: "o", i: "b", n: "g", c: "b", m: "g" });
  });
});

describe("the daily word", () => {
  it("is only a 5 or 6 letter word of plain letters", () => {
    expect(isDailyCandidate(entry("cavil"))).toBe(true);
    expect(isDailyCandidate(entry("grumpy"))).toBe(true);
    expect(isDailyCandidate(entry("awry"))).toBe(false);
    expect(isDailyCandidate(entry("trenchant"))).toBe(false);
    expect(isDailyCandidate(entry("x-ray"))).toBe(false);
  });

  const pool = ["cavil", "grumpy", "abate", "deter", "placid", "wary", "trenchant", "laud", "zesty", "humble"].map(entry);

  it("is the same word all day, for everyone, whatever order the list arrives in", () => {
    const a = dailyWord(pool, "2026-11-17");
    const b = dailyWord([...pool].reverse(), "2026-11-17");
    expect(a?.word).toBe(b?.word);
    expect(a && isDailyCandidate(a)).toBe(true);
  });

  it("changes from one day to the next and repeats only after every word has had a day", () => {
    const n = pool.filter(isDailyCandidate).length;
    const seen = new Set<string>();
    let day = "2026-11-17";
    for (let i = 0; i < n; i++) {
      seen.add(dailyWord(pool, day)!.word);
      day = new Date(Date.parse(day + "T00:00:00Z") + 86_400_000).toISOString().slice(0, 10);
    }
    expect(seen.size).toBe(n);
  });

  it("is null when no word fits", () => {
    expect(dailyWord([entry("awry")], "2026-11-17")).toBeNull();
  });
});

describe("guesses", () => {
  it("clue after 2, 6 tries, keep 30 days", () => {
    expect(CLUE_AFTER).toBe(2);
    expect(MAX_GUESSES).toBe(6);
    expect(KEEP_DAYS).toBe(30);
  });

  it("a guess is letters only, the answer's length", () => {
    expect(isValidGuess("claim", 5)).toBe(true);
    expect(isValidGuess("clai", 5)).toBe(false);
    expect(isValidGuess("cl4im", 5)).toBe(false);
    expect(isValidGuess("grumpy", 6)).toBe(true);
  });

  it("records guesses until solved, then refuses more", () => {
    let p = emptyDaily();
    let r = recordGuess(p, "2026-11-17", "PLAIN", "cavil");
    expect(r.ok).toBe(true);
    p = r.progress;
    p = recordGuess(p, "2026-11-17", "claim", "cavil").progress;
    r = recordGuess(p, "2026-11-17", "cavil", "cavil");
    expect(dayState(r.progress, "2026-11-17")).toEqual({ guesses: ["plain", "claim", "cavil"], done: true, solved: true });
    expect(recordGuess(r.progress, "2026-11-17", "abate", "cavil").ok).toBe(false);
  });

  it("ends unsolved after 6 wrong guesses", () => {
    let p = emptyDaily();
    for (const g of ["plain", "claim", "abate", "deter", "zesty", "humid"]) p = recordGuess(p, "2026-11-17", g, "cavil").progress;
    expect(dayState(p, "2026-11-17")).toMatchObject({ done: true, solved: false });
  });

  it("refuses an invalid guess without changing anything", () => {
    const p = emptyDaily();
    const r = recordGuess(p, "2026-11-17", "abc", "cavil");
    expect(r.ok).toBe(false);
    expect(r.progress).toBe(p);
  });

  it("keeps only the last 30 days", () => {
    let p = emptyDaily();
    for (let i = 0; i < 40; i++) {
      const day = new Date(Date.parse("2026-10-01T00:00:00Z") + i * 86_400_000).toISOString().slice(0, 10);
      p = recordGuess(p, day, "cavil", "cavil").progress;
    }
    expect(Object.keys(p.days)).toHaveLength(KEEP_DAYS);
    expect(p.days["2026-10-01"]).toBeUndefined();
  });

  it("an unplayed day is empty", () => {
    expect(dayState(emptyDaily(), "2026-11-17")).toEqual({ guesses: [], done: false, solved: false });
  });
});

describe("shareText", () => {
  it("is the date, the score and the grid in squares, with the link", () => {
    const t = shareText("2026-11-17", ["plain", "claim", "cavil"], "cavil", true);
    expect(t).toBe(
      ["PYQ Vault Daily Word, 17 Nov: 3/6", "⬜🟧🟧🟦⬜", "🟦🟧🟧🟦⬜", "🟦🟦🟦🟦🟦", "www.pyqvault.com/play/daily-word"].join("\n")
    );
  });

  it("shows X when not solved", () => {
    expect(shareText("2026-11-17", ["plain"], "cavil", false).split("\n")[0]).toBe("PYQ Vault Daily Word, 17 Nov: X/6");
  });
});

describe("parseDaily", () => {
  it("round-trips and starts fresh on junk", () => {
    const p = recordGuess(emptyDaily(), "2026-11-17", "plain", "cavil").progress;
    expect(parseDaily(serializeDaily(p))).toEqual(p);
    for (const raw of [null, "{", "[]", '{"v":9,"days":{}}', '{"v":1,"days":{"2026-11-17":{"guesses":[1]}}}']) {
      expect(parseDaily(raw)).toEqual(emptyDaily());
    }
  });
});

describe("clueFor: the clue after 2 guesses gives the sentence when there is one, not the answer", () => {
  const base = entry("failed");

  it("blanks the marked word out of the exam's sentence", () => {
    const e = { ...base, kind: "antonym" as const, sentence: "Ram \\(\\underline{\\text{failed}}\\) at first, then he ___ in every field." };
    expect(clueFor(e)).toEqual({ kind: "sentence", text: "Ram [?] at first, then he ___ in every field." });
    expect(clueFor({ ...e, sentence: "His **Failed** plan." })).toEqual({ kind: "sentence", text: "His [?] plan." });
  });

  it("falls back to the meaning when there is no sentence, or the word is not marked in it", () => {
    expect(clueFor({ ...base, sentence: null })).toEqual({ kind: "meaning", text: 'It means much the same as "Quibble".' });
    expect(clueFor({ ...base, kind: "antonym", sentence: null })).toEqual({ kind: "meaning", text: 'It is the opposite of "Quibble".' });
    expect(clueFor({ ...base, sentence: "Nothing marked here." }).kind).toBe("meaning");
  });
});
