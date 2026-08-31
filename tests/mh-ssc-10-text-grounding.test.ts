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

// ── Added when the Science chapters landed: the first solutions in this pipeline
//    to carry LaTeX and markdown emphasis. Every "not" case below was a REAL false
//    positive on Gravitation before the fix; the "still sees" cases exist so the
//    fix cannot quietly widen into a blind spot.
describe("ungroundedTokens — LaTeX and markdown artefacts", () => {
  const chapter = "The value of g is 9.8 and the period of revolution is T.";
  const tokens = (sol: string) => ungroundedTokens(sol, chapter).map((h) => h.token);

  it("ignores a LaTeX macro name inside a math zone", () => {
    // \\Rightarrow is a macro, not a claim about the world. It was reported on
    // four separate Gravitation answers.
    const sol = "By the law, \\(0 = u - gt \\Rightarrow t = u/g\\), so the times are equal.";
    expect(tokens(sol)).not.toContain("Rightarrow");
  });

  it("still sees a proper noun that sits OUTSIDE the math zone", () => {
    const sol = "The result \\(T^2 = KR^3\\) is due to Kepler and nobody else.";
    expect(tokens(sol)).toContain("Kepler");
  });

  it("treats a bolded sentence-opening word as sentence-initial", () => {
    const sol = "First do this. **Convert the distance to metres.**";
    expect(tokens(sol)).not.toContain("Convert");
  });

  it("treats a paragraph break as a sentence boundary", () => {
    // "Numerator:" opens its own paragraph after a math zone, so the preceding
    // sentence never ended in punctuation and it read as mid-sentence.
    const sol = "The force is \\(F = GMm/d^2\\)\n\nNumerator: six times seven.";
    expect(tokens(sol)).not.toContain("Numerator");
  });

  it("does not swallow a real name that merely follows a math zone", () => {
    const sol = "Given \\(g = 9.8\\), the value on Zargon is quite different.";
    expect(tokens(sol)).toContain("Zargon");
  });

  it("still sees a name emphasised in bold mid-sentence", () => {
    const sol = "The law is named after **Cavendish** and nobody else.";
    expect(tokens(sol)).toContain("Cavendish");
  });
});

// ── The possessive asymmetry, proved with a control by the Environmental
//    Management ingestion agent: the candidate token has `'s` stripped but the
//    chapter haystack does not, so any MULTI-WORD name containing a possessive can
//    never match, however plainly it is printed.
describe("ungroundedTokens — possessives in the haystack", () => {
  it("matches a multi-word name whose chapter form carries a possessive", () => {
    const chapter = "The box on page 41 is headed Let's Discuss and asks for information.";
    const sol = "The chapter's Let's Discuss box asks the student to collect information.";
    expect(ungroundedTokens(sol, chapter).map((h) => h.token)).not.toContain("Let Discuss");
  });

  it("matches a curly-apostrophe possessive too", () => {
    const chapter = "Hope’s apparatus demonstrates the anomalous behaviour of water.";
    // Mid-sentence on purpose: a sentence-INITIAL capital is a separate rule, and
    // testing both at once would not tell us which one fired.
    const sol = "The experiment uses Hope’s apparatus to show the effect.";
    expect(ungroundedTokens(sol, chapter).map((h) => h.token)).not.toContain("Hope apparatus");
  });

  it("still reports a name that is genuinely absent", () => {
    const chapter = "The box on page 41 is headed Let's Discuss.";
    const sol = "The chapter never mentions Bishnoi's Movement anywhere.";
    expect(ungroundedTokens(sol, chapter).map((h) => h.token)).toContain("Bishnoi Movement");
  });
});
