import { describe, it, expect } from "vitest";
import { layoutStatements, findStatementLabels } from "../scripts/lib/statementLayout";

/**
 * A statement-list stem must print each numbered claim on its own line. 189+
 * bank rows were ingested with them run together on one line; both renderers
 * (Word `TextRun({break:1})`, web `white-space: pre-wrap`) already honour a real
 * newline, so the repair is purely to the stored text.
 *
 * Every trap below was found in live bank data, not imagined.
 */
describe("findStatementLabels", () => {
  it("finds an ascending numeric run", () => {
    const t = "Consider the following statements: 1. Alpha holds. 2. Beta holds.";
    expect(findStatementLabels(t).map((l) => l.token)).toEqual(["1.", "2."]);
  });

  it("needs at least TWO labels — a lone number is not a list", () => {
    expect(findStatementLabels("The set has 1. Which of these is correct?")).toEqual([]);
  });

  it("requires the run to ASCEND from 1, so a stray '3.' alone is not a label", () => {
    expect(findStatementLabels("A value of 3. Something else.")).toEqual([]);
  });

  it("takes the FIRST '2.' — a statement ending in the numeral 2 must not win", () => {
    // Live row: "... 2. tan+cot can never be less than 2. Which of the above ..."
    const t = "Statements: 1. First claim. 2. Second claim is at least 2. Which of the above?";
    const found = findStatementLabels(t);
    expect(found.map((l) => l.token)).toEqual(["1.", "2."]);
    // the label is the EARLIER occurrence, before the trailing "at least 2."
    expect(found[1].index).toBeLessThan(t.indexOf("at least 2."));
  });

  it("does not read a decimal as a label", () => {
    expect(findStatementLabels("Values 1.5 and 2.5 are given.")).toEqual([]);
  });

  it("does not read a large number as a label", () => {
    expect(findStatementLabels("The power set has 1024. Another sentence 2. here.")).toEqual([]);
  });

  it("ignores label-shaped text inside a math zone", () => {
    // \(1\cdot5\) and \([.]\) are live examples.
    expect(findStatementLabels("Given \\(1. x\\) and \\(2. y\\) only.")).toEqual([]);
  });

  it("finds roman and parenthesised runs", () => {
    expect(findStatementLabels("Claims: I. one. II. two.").map((l) => l.token)).toEqual([
      "I.",
      "II.",
    ]);
    expect(findStatementLabels("Claims: (1) one. (2) two.").map((l) => l.token)).toEqual([
      "(1)",
      "(2)",
    ]);
  });
});

describe("layoutStatements", () => {
  it("puts each statement and the closing question on its own line", () => {
    const t =
      "Consider the following statements: 1. The null set is a subset of every set. 2. Every set is a subset of itself. Which of the above statements are correct?";
    expect(layoutStatements(t).text).toBe(
      "Consider the following statements:\n" +
        "1. The null set is a subset of every set.\n" +
        "2. Every set is a subset of itself.\n" +
        "Which of the above statements are correct?"
    );
  });

  it("is IDEMPOTENT — re-running never stacks blank lines", () => {
    const t = "Statements: 1. One. 2. Two. Which of the above is correct?";
    const once = layoutStatements(t).text;
    expect(layoutStatements(once).text).toBe(once);
  });

  it("leaves an already-correct stem byte-identical", () => {
    const t = "Consider the following:\n1. One.\n2. Two.\nWhich of the above is correct?";
    const r = layoutStatements(t);
    expect(r.text).toBe(t);
    expect(r.changed).toBe(false);
  });

  it("does not touch a stem carrying a GFM table (Match List labels are cells)", () => {
    // 521 of the bare-pattern matches bank-wide are Match Lists like this.
    const t =
      "Match List-I with List-II:\n| List-I | List-II |\n| --- | --- |\n| A. sin x | 1. one |\n| B. cos x | 2. two |";
    const r = layoutStatements(t);
    expect(r.text).toBe(t);
    expect(r.skipped).toBe("table");
  });

  it("does not split a lead-in that merely uses the phrase, with no labels", () => {
    const t = "Which of the following statements about a null set is correct?";
    expect(layoutStatements(t).changed).toBe(false);
  });

  it("only breaks the closing question when it follows the LAST label", () => {
    // "Which of the following" is the LEAD-IN here, not the closer.
    const t = "Which of the following are correct? 1. One. 2. Two.";
    expect(layoutStatements(t).text).toBe("Which of the following are correct?\n1. One.\n2. Two.");
  });

  it("preserves math verbatim across the rewrite", () => {
    const t = "Statements: 1. \\(x \\notin (A \\cup B)\\) holds. 2. \\(A \\cap B = \\phi\\) holds.";
    const out = layoutStatements(t).text;
    expect(out).toContain("\\(x \\notin (A \\cup B)\\)");
    expect(out).toContain("\\(A \\cap B = \\phi\\)");
    expect(out.split("\n")).toHaveLength(3);
  });

  it("reports changed=true only when it actually rewrote something", () => {
    expect(layoutStatements("Statements: 1. One. 2. Two.").changed).toBe(true);
    expect(layoutStatements("Nothing to do here.").changed).toBe(false);
  });
});

describe("layoutStatements — matching questions are a different defect", () => {
  it("skips a 'Match the following' stem even when it has no table", () => {
    // Live row (Foundation Course / Biology): the numbered items are Column A of a
    // matching question linearised into prose with ' / ' separators. Breaking them
    // onto lines strands a trailing '/' on each and does NOT fix the real defect —
    // these need to become a GFM table (rule P2-matchlist-not-a-table).
    const t =
      "Match the following with correct response.\nColumn A: (1) Phenotype / (2) Genotype / (3) Dominant factor";
    const r = layoutStatements(t);
    expect(r.text).toBe(t);
    expect(r.changed).toBe(false);
    expect(r.skipped).toBe("matching");
  });

  it("skips 'Match List-I with List-II' prose too", () => {
    const t = "Match List-I with List-II: 1. Alpha 2. Beta 3. Gamma";
    expect(layoutStatements(t).skipped).toBe("matching");
  });

  it("does NOT skip a normal statement stem that merely uses the word match", () => {
    const t = "Consider the following statements: 1. The sets match exactly. 2. They do not.";
    expect(layoutStatements(t).skipped).toBeUndefined();
    expect(layoutStatements(t).changed).toBe(true);
  });
});

describe("layoutStatements — guards earned from live false positives", () => {
  it("does not split a MID-SENTENCE enumeration", () => {
    // Live (MHT-CET Physics): breaking here strands a dangling "and then".
    const t =
      "The frequency heard by an observer as the train (1) approaches the station and then (2) recedes the station are respectively";
    expect(layoutStatements(t).changed).toBe(false);
  });

  it("does not split an enumeration used as a noun mid-sentence", () => {
    // Live (JEE Physics): "the point (1)" / "the point (2)" name parts of a figure.
    const t =
      "The radius of cross section at the point (1) is 2 cm and at the point (2) is 1 cm, respectively.";
    expect(layoutStatements(t).changed).toBe(false);
  });

  it("does not treat a FIGURE reference as a label", () => {
    // Live (JEE Chemistry): "Figure 1." / "Figure 2." are references, and the
    // naive split left a line containing just the word "Figure".
    const t = "Figure 1. electron probability density Figure 2. wave function for 2 s orbital";
    expect(layoutStatements(t).changed).toBe(false);
  });

  it("skips 'Match the column' as well as 'Match the following'", () => {
    const t = "Match the column. 1. (A) Antibiotic 2. Valium (B) Tranquilizer";
    expect(layoutStatements(t).skipped).toBe("matching");
  });

  it("still splits a genuine list introduced by a colon", () => {
    // Live (JEE Physics, Kinetic Theory) — this one IS correct to split.
    const t =
      "Following statements are given: (1) The average kinetic energy decreases. (2) The pressure increases.";
    expect(layoutStatements(t).text).toBe(
      "Following statements are given:\n(1) The average kinetic energy decreases.\n(2) The pressure increases."
    );
  });

  it("still splits a genuine list introduced by a question mark", () => {
    const t = "Which of the following are correct? 1. Alpha holds. 2. Beta holds.";
    expect(layoutStatements(t).changed).toBe(true);
  });

  it("breaks before a 'Choose the correct answer' closer too", () => {
    const t = "Given: 1. Alpha holds. 2. Beta holds. Choose the correct answer from the options below:";
    expect(layoutStatements(t).text.split("\n").pop()).toBe(
      "Choose the correct answer from the options below:"
    );
  });

  it("drops the alpha style entirely — prose capitals are not a list", () => {
    // ZERO of the 309 live proposals used an A./B. run, and prose like this does.
    expect(findStatementLabels("Let the answer be A. The reason is B. That is all.")).toEqual([]);
  });
});

describe("findStatementLabels agrees with layoutStatements on matching questions", () => {
  it("returns [] for a linearised match-list, so the gate and the repair agree", () => {
    // If it returned labels here, paper-text's P1 rule would BLOCK a paper over a
    // stem that layoutStatements deliberately refuses to repair — a deadlock with
    // no automated way out. P2-matchlist-not-a-table owns this defect instead.
    const t = "Match the following with correct response. (1) Phenotype / (2) Genotype";
    expect(findStatementLabels(t)).toEqual([]);
    expect(layoutStatements(t).skipped).toBe("matching");
  });
});

describe("layoutStatements — two-column match lists", () => {
  it("skips a 'Column I / Column II' list even without the word Match", () => {
    // Live (NDA Chemistry). Splitting at the Column-II numerals glues each
    // Column-II entry to the NEXT Column-I entry, so the rewrite ASSERTS pairings
    // the question exists to test — and one of them is the correct answer, which
    // the layout would leak. Strictly worse than leaving it as prose.
    const t =
      "Column I Column II A. Evaporation 1. Cream from milk B. Centrifugation 2. Salt from seawater";
    const r = layoutStatements(t);
    expect(r.text).toBe(t);
    expect(r.skipped).toBe("matching");
  });

  it("does not skip an ordinary stem that says 'column' in prose", () => {
    const t = "Consider the following statements about a column of mercury: 1. It rises. 2. It falls.";
    expect(layoutStatements(t).skipped).toBeUndefined();
    expect(layoutStatements(t).changed).toBe(true);
  });
});
