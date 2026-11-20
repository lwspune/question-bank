import { describe, expect, it } from "vitest";
import { heldForKey, keyReadDiff, normaliseMsceKey, parseBlindAnswer, scoreMsce, sectionErrors, sectionSubject } from "../scripts/mh-scholarship/lib";

describe("sectionSubject (the printed section fixes the subject)", () => {
  it("Paper I: English Q1-25, Mathematics Q26-75", () => {
    expect(sectionSubject(1, 1)).toBe("English");
    expect(sectionSubject(1, 25)).toBe("English");
    expect(sectionSubject(1, 26)).toBe("Mathematics");
    expect(sectionSubject(1, 75)).toBe("Mathematics");
  });
  it("Paper II: Marathi Q1-25, Intelligence Test Q26-75", () => {
    expect(sectionSubject(2, 3)).toBe("Marathi");
    expect(sectionSubject(2, 26)).toBe("Intelligence Test");
  });
  it("refuses a number outside the paper", () => {
    expect(() => sectionSubject(1, 0)).toThrow();
    expect(() => sectionSubject(2, 76)).toThrow();
  });
  it("sectionErrors names every item filed under the wrong subject", () => {
    expect(
      sectionErrors(1, [
        { number: 2, subject: "English" },
        { number: 30, subject: "English" },
        { number: 26, subject: "Mathematics" },
      ]),
    ).toEqual(["Q30: subject \"English\", but Paper I Q26-75 is Mathematics"]);
  });
});

// MSCE's final keys print the OPTION NUMBER (1-4) per question, and a
// two-answer item as "2&4". Options are stored as A-D (1 -> A ... 4 -> D).
const full = (over: Record<string, string> = {}): Record<string, string> => {
  const k: Record<string, string> = {};
  for (let n = 1; n <= 75; n++) k[String(n)] = String((n % 4) + 1);
  return { ...k, ...over };
};

describe("normaliseMsceKey (MSCE's printed key: option numbers 1-4)", () => {
  it("maps 1-4 to A-D", () => {
    const { key, pairs } = normaliseMsceKey(full({ "1": "1", "2": " 4 ", "3": "3" }), 75);
    expect(key["1"]).toBe("A");
    expect(key["2"]).toBe("D");
    expect(key["3"]).toBe("C");
    expect(pairs).toEqual({});
  });

  it('reads "2&4", "1 & 3" and "3,4" as a two-answer item, letters in order, and keeps it OUT of the single key', () => {
    const { key, pairs } = normaliseMsceKey(full({ "4": "2&4", "13": "1 & 3", "26": "4,3" }), 75);
    expect(pairs["4"]).toEqual(["B", "D"]);
    expect(pairs["13"]).toEqual(["A", "C"]);
    expect(pairs["26"]).toEqual(["C", "D"]);
    expect(key["4"]).toBeUndefined();
    expect(key["13"]).toBeUndefined();
  });

  it('reads "1OR2" as EITHER option accepted: a single-answer item, not held, kept in `either`', () => {
    const { key, pairs, either } = normaliseMsceKey(full({ "53": "1OR2", "54": "3 or 4", "60": "1 OR 4" }), 75);
    expect(either["53"]).toEqual(["A", "B"]);
    expect(either["54"]).toEqual(["C", "D"]);
    expect(either["60"]).toEqual(["A", "D"]);
    expect(key["53"]).toBe("A");
    expect(pairs["53"]).toBeUndefined();
    expect(heldForKey(normaliseMsceKey(full({ "53": "1OR2" }), 75))).toEqual([]);
  });

  it('marks "*" (MSCE: "questions marked * are cancelled") as X', () => {
    expect(normaliseMsceKey(full({ "12": "*" }), 75).key["12"]).toBe("X");
  });

  it("marks a cancelled item X", () => {
    expect(normaliseMsceKey(full({ "7": "X" }), 75).key["7"]).toBe("X");
    expect(normaliseMsceKey(full({ "8": "cancelled" }), 75).key["8"]).toBe("X");
    expect(normaliseMsceKey(full({ "9": "रद्द" }), 75).key["9"]).toBe("X");
  });

  it("refuses an unreadable cell rather than guessing", () => {
    expect(() => normaliseMsceKey(full({ "3": "5" }), 75)).toThrow(/Q3/);
    expect(() => normaliseMsceKey(full({ "4": "B" }), 75)).toThrow(/Q4/);
    expect(() => normaliseMsceKey(full({ "5": "" }), 75)).toThrow(/Q5/);
    expect(() => normaliseMsceKey(full({ "6": "2&2" }), 75)).toThrow(/Q6/);
    expect(() => normaliseMsceKey(full({ "6": "1&2&3" }), 75)).toThrow(/Q6/);
  });

  it("refuses a short key and a question outside the paper", () => {
    const short = full();
    delete short["75"];
    expect(() => normaliseMsceKey(short, 75)).toThrow(/missing 1 of 75/);
    expect(() => normaliseMsceKey(full({ "76": "1" }), 75)).toThrow(/Q76/);
  });

  it("lets a config-held number be absent, and only a held one", () => {
    const k = full();
    delete k["10"];
    expect(normaliseMsceKey(k, 75, [10]).key["10"]).toBeUndefined();
  });
});

describe("keyReadDiff (two independent reads of a scanned key must agree)", () => {
  it("is empty when both reads agree cell for cell, ignoring spacing and case", () => {
    expect(keyReadDiff(full({ "4": "2&4", "53": "1OR2" }), full({ "4": "2 & 4", "53": "1 or 2" }))).toEqual([]);
  });
  it("names every cell that differs, and a cell only one read has", () => {
    const b = full({ "35": "1", "67": "3" });
    delete b["75"];
    expect(keyReadDiff(full({ "35": "2", "67": "4" }), b)).toEqual([
      'Q35: read 1 "2", read 2 "1"',
      'Q67: read 1 "4", read 2 "3"',
      'Q75: read 1 "4", read 2 ""',
    ]);
  });
});

describe("heldForKey (what is NOT committed)", () => {
  it("holds every two-answer item plus the config's own held numbers, sorted, once each", () => {
    const k = normaliseMsceKey(full({ "30": "2&4", "4": "1&3" }), 75);
    expect(heldForKey(k, [30, 61])).toEqual([4, 30, 61]);
  });
});

describe("parseBlindAnswer", () => {
  it("reads a single letter and a pair, normalising case and order", () => {
    expect(parseBlindAnswer("c")).toEqual(["C"]);
    expect(parseBlindAnswer("D,B")).toEqual(["B", "D"]);
    expect(parseBlindAnswer(" b & d ")).toEqual(["B", "D"]);
  });
  it("refuses anything else", () => {
    expect(() => parseBlindAnswer("E")).toThrow();
    expect(() => parseBlindAnswer("")).toThrow();
    expect(() => parseBlindAnswer("A,A")).toThrow();
  });
});

describe("scoreMsce", () => {
  it("scores single items by letter and two-answer items only when BOTH letters match; skips cancelled", () => {
    const k = normaliseMsceKey(full({ "1": "2", "2": "X", "3": "1&4", "4": "2&3" }), 75);
    const s = scoreMsce(k, [
      { number: 1, answer: "B", confidence: "HIGH" },
      { number: 2, answer: "A" },
      { number: 3, answer: "D,A", confidence: "MED" },
      { number: 4, answer: "B", confidence: "LOW" },
    ]);
    expect(s.scored).toBe(3);
    expect(s.match).toBe(2);
    expect(s.mismatched).toEqual([4]);
    expect(s.byConfidence.HIGH).toEqual({ ok: 1, of: 1 });
    expect(s.byConfidence.LOW).toEqual({ ok: 0, of: 1 });
  });

  it("counts either accepted letter of an OR item as right", () => {
    const k = normaliseMsceKey(full({ "53": "1OR2" }), 75);
    expect(scoreMsce(k, [{ number: 53, answer: "B" }]).match).toBe(1);
    expect(scoreMsce(k, [{ number: 53, answer: "C" }]).match).toBe(0);
  });
});
