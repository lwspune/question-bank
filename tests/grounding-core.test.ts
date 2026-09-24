import { describe, it, expect } from "vitest";
import { ungroundedTokens } from "../scripts/lib/grounding";

// The grounding audit is the ONLY mechanical check standing behind an authored
// answer in a textbook that ships no answer key — MH State Board Class 9
// (History/PolSci + Geography), Class 10 (Science + History/PolSci), and now
// Class 12 Geography. There is nothing to diff those answers against, so the
// failure mode it exists to catch is a FLUENT INVENTION: a real-sounding date,
// person or place the chapter never mentions.
//
// Why this file exists as a SHARED core (2026-09-24). Three pipelines had each
// grown their own copy, and they had DRIFTED: the mh-ssc-10-text copy carried
// five noise fixes — possessive stripping on both sides, math/emphasis stripping,
// pipe-table + paragraph sentence boundaries, trailing-connector trimming, and a
// case-insensitive stopword test — that the mh-sb-9 copy did not. Each was
// earned from a real false-positive class. Adding a fourth copy for the Class 12
// Geography lane would have meant choosing which copy's blind spots to inherit.
//
// SIGNAL-TO-NOISE IS LOAD-BEARING, not a nicety: every false positive is a hit a
// human must read and dismiss, and a probe that cries wolf six times a chapter
// stops being read at all. So these tests pin BOTH directions — it must still
// fire on a real invention, and it must stay silent on sentence glue. The five
// drift fixes are pinned individually so the shared core cannot regress to the
// weaker behaviour.

const CHAPTER = `
The Election Commission was established in 1950. Sukumar Sen was the first chief
election commissioner after independence. The President appoints the election
commissioners. The list of World Heritage Sites is announced by UNESCO.
Savarkar's writings and Ambedkar's speeches are discussed in Let's Discuss.
`;

const tokens = (solution: string, chapter = CHAPTER) =>
  ungroundedTokens(solution, chapter).map((h) => h.token);

describe("ungroundedTokens — still catches a real invention", () => {
  it("flags a year the chapter never states", () => {
    expect(tokens("The Act was passed in 2005.")).toContain("2005");
  });

  it("does not flag a year the chapter does state", () => {
    expect(tokens("The Commission was established in 1950.")).toHaveLength(0);
  });

  it("flags a proper noun the chapter never names", () => {
    expect(tokens("The talks were held at Dumbarton Oaks.")).toContain("Dumbarton Oaks");
  });

  it("does not flag a proper noun the chapter does name", () => {
    expect(tokens("The answer is Sukumar Sen.")).toHaveLength(0);
  });
});

describe("ungroundedTokens — does not fire on sentence glue", () => {
  it("ignores a capital that is merely sentence-initial", () => {
    expect(tokens("Facilitate the participation of local people.")).toHaveLength(0);
  });

  it("ignores a grounded name reached through a connector", () => {
    expect(tokens("Follow the directives issued by UNESCO for such sites.")).toHaveLength(0);
  });

  it("ignores an option label before a grounded name", () => {
    expect(tokens("So the answer is (a) Sukumar Sen.")).toHaveLength(0);
  });
});

// ── the five fixes that the mh-ssc-10-text copy had and mh-sb-9 did not ──────
// Each of these FAILS against the older implementation. They are the reason the
// shared core is seeded from the newer copy rather than the older one.

describe("ungroundedTokens — possessives are grammar, not names", () => {
  it("matches a possessive in the answer against the plain name in the chapter", () => {
    // Candidate "Sukumar Sen's" must reduce to "Sukumar Sen" to meet the chapter,
    // which prints the name plain. The possessive must also sit MID-sentence: a
    // sentence-initial single word is dropped by a different rule entirely, so a
    // sentence-initial possessive would be silent in both implementations and
    // this test would prove nothing.
    expect(tokens("We studied Sukumar Sen's tenure closely.")).toHaveLength(0);
  });

  it("matches a plain name in the answer against a possessive in the chapter", () => {
    // The mirror direction: strip the haystack too, or the two can never meet.
    expect(tokens("The section is called Let Discuss.")).toHaveLength(0);
  });
});

describe("ungroundedTokens — a LaTeX macro is not a claim about the world", () => {
  it("ignores a macro inside an inline math zone", () => {
    expect(tokens("Therefore \\(x \\Rightarrow y\\) holds for all cases.")).toHaveLength(0);
  });

  it("still flags an invention sitting outside the math zone", () => {
    // Paired with the test above, this is what makes the math-strip assertion
    // DISCRIMINATING rather than vacuous: stripping the math zone must not also
    // silence the prose around it.
    //
    // The assertion is on "Ghent" rather than the whole name deliberately. A
    // sentence-initial stopword followed by a connector ("At … the Treaty of
    // Ghent") fragments the run: "At the Treaty" loses its stop-word head and is
    // reported as "the Treaty", and "Ghent" is reported separately. That is a
    // real limitation of the capitalised-run regex, inherited unchanged from the
    // canonical copy. It costs nothing that matters here — BOTH fragments point
    // a human at the same invented name, which is all a triage probe owes its
    // reader. Pinning the fragmented form instead would freeze an implementation
    // detail and fail the day the regex improves.
    expect(tokens("At \\(x = 2\\) the Treaty of Ghent applied.")).toContain("Ghent");
  });
});

describe("ungroundedTokens — markdown emphasis must not hide a sentence start", () => {
  it("ignores a bolded sentence-initial word", () => {
    // Without stripping "**", the sentence-initial rule cannot see the word is
    // sentence-initial, and "Convert" is reported as a name.
    expect(tokens("**Convert the distance into metres.**")).toHaveLength(0);
  });
});

describe("ungroundedTokens — table cells and paragraph breaks are sentence boundaries", () => {
  it("treats each pipe-table cell as its own sentence", () => {
    // Every cell opens with a capital; without the boundary one table contributes
    // a row of bogus "names".
    const table = "| Casts | Prepares | Delivers |";
    expect(tokens(table)).toHaveLength(0);
  });

  it("treats a paragraph break as a sentence boundary", () => {
    // A worked step routinely ends a paragraph without a full stop, so the next
    // paragraph's opening word read as mid-sentence and was reported as a name.
    expect(tokens("The value is 6\n\nNumerator: the total count")).toHaveLength(0);
  });
});

describe("ungroundedTokens — a name never ends on a connector", () => {
  it("trims a trailing connector rather than testing it as part of the name", () => {
    // "UNESCO for" tested as one unit reports missing even though UNESCO is there.
    expect(tokens("Issued by UNESCO for the listed sites.")).toHaveLength(0);
  });

  it("trims a connector off a run whose head is not a stopword", () => {
    // "Facilitate the" is pure glue, but its head is NOT in STOP, so the
    // sentence-initial rule cannot drop it and the run survives at length >= 4.
    // Only the connector trim reduces it to a bare sentence-initial word.
    expect(tokens("Facilitate the participation of local people.")).toHaveLength(0);
  });
});

// NOT pinned separately: the case-insensitivity of the stopword test. It is real
// and deliberate in the implementation — the connector allowance admits a
// lowercase "the" into a run, which a case-SENSITIVE `STOP.has` would not
// recognise as glue — but every input that isolates it is already reduced to
// silence by the connector trim or the length floor in BOTH implementations.
// A test written for it passed against the older copy too, so it discriminated
// nothing and was removed rather than left as decoration. The two connector
// tests above exercise the trim and the stopword test together, which is the
// combination that actually runs in production.
