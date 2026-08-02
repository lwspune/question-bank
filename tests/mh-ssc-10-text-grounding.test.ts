import { describe, it, expect } from "vitest";
import { ungroundedTokens } from "../scripts/mh-ssc-10-text/audit-grounding";

// The grounding audit is the ONLY mechanical check standing behind these
// chapters' answers — the Class-10 History/Political Science textbook ships no
// answer key at all, so there is nothing to diff an authored answer against.
// That makes its SIGNAL-TO-NOISE load-bearing: every false positive it emits is
// a hit a human has to read and dismiss, and a probe that cries wolf six times
// per chapter stops being read. These tests pin the two properties that matter:
// it must still fire on a real invention, and it must not fire on sentence glue.

const CHAPTER = `
The Election Commission was established in 1950. Sukumar Sen was the first chief
election commissioner after independence. The President appoints the election
commissioners. The list of World Heritage Sites is announced by UNESCO.
`;

describe("ungroundedTokens — still catches real inventions", () => {
  it("flags a year the chapter never states", () => {
    const hits = ungroundedTokens("The Act was passed in 2005.", CHAPTER);
    expect(hits.map((h) => h.token)).toContain("2005");
  });

  it("does not flag a year the chapter does state", () => {
    const hits = ungroundedTokens("The Commission was established in 1950.", CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("1950");
  });

  it("flags a proper noun the chapter never names", () => {
    const hits = ungroundedTokens("The talks were held at Dumbarton Oaks.", CHAPTER);
    expect(hits.map((h) => h.token)).toContain("Dumbarton Oaks");
  });

  it("does not flag a proper noun the chapter does name", () => {
    const hits = ungroundedTokens("The answer is Sukumar Sen.", CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("Sukumar Sen");
  });
});

describe("ungroundedTokens — does not fire on sentence glue", () => {
  // The connector allowance (of / the / and / for / de) exists so "League of
  // Nations" survives as one token. But it also lets a run END on a connector,
  // and a name never does — so "UNESCO for" was being tested against the chapter
  // as a unit and reported missing even though UNESCO is right there.
  it("trims a trailing lowercase connector before testing containment", () => {
    const hits = ungroundedTokens("Follow the directives issued by UNESCO for such sites.", CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("UNESCO for");
    expect(hits.map((h) => h.token)).not.toContain("UNESCO");
  });

  it("ignores a stopword run whose connector differs only in case", () => {
    // "So the answer is (a) ..." — "So" and "The" are both stopwords, but the
    // all-stopword filter compared case-sensitively and "the" slipped past it.
    const hits = ungroundedTokens("So the answer is (a) Sukumar Sen.", CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("So the");
  });

  it("ignores a bare capitalised verb opening a sentence", () => {
    const hits = ungroundedTokens("Facilitate the participation of local people.", CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("Facilitate the");
  });

  // A possessive marker is never part of a name, but it blocks containment
  // outright: "Savarkar's" is reported missing from a chapter that says
  // "Savarkar" on almost every page.
  it("strips a possessive before testing containment", () => {
    const hits = ungroundedTokens("Sukumar Sen's appointment followed.", CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("Sukumar Sen's");
    expect(hits.map((h) => h.token)).not.toContain("Sukumar Sen");
  });

  it("still flags an invented name carrying a possessive", () => {
    const hits = ungroundedTokens("Dumbarton Oaks's minutes were sealed.", CHAPTER);
    expect(hits.map((h) => h.token)).toContain("Dumbarton Oaks");
  });

  // Concept-map answers are authored as GFM pipe-tables, and every cell opens
  // with a capital. Without treating a cell boundary as a sentence boundary,
  // each cell's first word ("Prepares", "Casts") reads as a mid-sentence proper
  // noun and gets reported — five hits from one table.
  it("treats a pipe-table cell boundary as a sentence boundary", () => {
    const table = "| Role | Duty |\n|---|---|\n| Voter | Casts the vote |\n| Officer | Prepares the list |";
    const hits = ungroundedTokens(table, CHAPTER);
    expect(hits.map((h) => h.token)).not.toContain("Casts");
    expect(hits.map((h) => h.token)).not.toContain("Prepares");
  });

  it("still flags an invented name inside a table cell", () => {
    const table = "| Place | Note |\n|---|---|\n| The talks at Dumbarton Oaks | sealed |";
    expect(ungroundedTokens(table, CHAPTER).map((h) => h.token)).toContain("Dumbarton Oaks");
  });

  it("keeps a real multi-word name that merely starts a sentence", () => {
    const hits = ungroundedTokens("Dumbarton Oaks hosted the conference.", CHAPTER);
    expect(hits.map((h) => h.token)).toContain("Dumbarton Oaks");
  });
});
