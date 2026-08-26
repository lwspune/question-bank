import { describe, expect, it } from "vitest";
import {
  hasPipeTable,
  isPairList,
  isPqrs,
  isStatementList,
  lintRecord,
} from "../scripts/practice-paper/gat-lint";

/**
 * GAT_RULES.md is enforced by gat-lint, and every rule below is a GATE — a BLOCK stops a
 * commit. So the cost of a false positive is a clean paper being refused, and the cost of
 * a false negative is a broken question shipping. Both directions are asserted here.
 *
 * Every fixture is real text from a paper this repo has ingested, not invented prose.
 */

const rec = (over: Partial<Parameters<typeof lintRecord>[0]> = {}) =>
  lintRecord({
    n: 1,
    stem: "Which one of the following is the capital of Australia?",
    optA: "Sydney",
    optB: "Canberra",
    optC: "Melbourne",
    optD: "Perth",
    answer: "B",
    solution:
      "Canberra was purpose-built as the federal capital to settle the rivalry between " +
      "Sydney and Melbourne, both of which are larger but neither of which is the seat of " +
      "government. Perth is the capital of Western Australia only. Matches option B.",
    difficulty: "EASY",
    subtopic: "World Geography",
    ...over,
  } as Parameters<typeof lintRecord>[0]);

const rules = (fs: ReturnType<typeof lintRecord>) => fs.map((f) => `${f.rule}:${f.severity}`);

describe("gat-lint: a well-formed record is clean", () => {
  it("reports nothing", () => {
    expect(rec()).toEqual([]);
  });
});

describe("rule 0 — exactly four distinct, non-empty options", () => {
  it("blocks a missing option", () => {
    expect(rules(rec({ optC: "   " }))).toContain("0:BLOCK");
  });

  it("blocks duplicated options, case-insensitively", () => {
    // LWS Mock 5 Q115 printed the same Wien's-law relation at (a) and (c).
    expect(rules(rec({ optA: "Sydney", optC: "sydney" }))).toContain("0:BLOCK");
  });

  it("blocks option (d) that has swallowed a Directions block", () => {
    const f = rec({ optD: "Perth Directions (Q. 11-15): Each of the following sentences" });
    expect(rules(f)).toContain("0:BLOCK");
  });

  it("does NOT block a legitimately long option (d)", () => {
    // A long final option is normal in assertion-reason and "none of the above" items;
    // only a runaway one relative to its siblings is contamination.
    const long = "Both A and R are true and R is the correct explanation of A";
    expect(
      rec({ optA: long + " one", optB: long + " two", optC: long + " three", optD: long }),
    ).toEqual([]);
  });
});

describe("rules 1 and 3 — statement and P/Q/R/S parts need their own lines", () => {
  it("blocks a flattened statement list", () => {
    const stem =
      "Consider the following statements: 1. Amphibians are cold-blooded. 2. Reptiles lay eggs. " +
      "Which of the statements given above is/are correct?";
    expect(rules(rec({ stem }))).toContain("1:BLOCK");
  });

  it("passes the same list once it is split onto lines", () => {
    const stem =
      "Consider the following statements:\n1. Amphibians are cold-blooded.\n" +
      "2. Reptiles lay eggs.\nWhich of the statements given above is/are correct?";
    expect(rules(rec({ stem }))).not.toContain("1:BLOCK");
  });

  it("blocks flattened P/Q/R/S parts", () => {
    const stem = "S1: The lions were widespread. P. There are reserves. Q. Hunters caused it. " +
      "R. Today they are rare. S. Only parks remain. The proper sequence should be:";
    expect(rules(rec({ stem }))).toContain("3:BLOCK");
  });
});

describe("rule 2 — a pair list must be a real GFM table", () => {
  it("blocks a List I / List II stem with no table", () => {
    const stem = "Match List-I with List-II and select the correct answer: A. Malaria 1. Fungi";
    expect(rules(rec({ stem }))).toContain("2:BLOCK");
  });

  it("accepts a table carrying the mandatory separator row", () => {
    const stem =
      "Match List-I with List-II and select the correct answer:\n" +
      "| List-I | List-II |\n|---|---|\n| A. Malaria | 1. Protozoan |\n";
    expect(rules(rec({ stem }))).not.toContain("2:BLOCK");
  });

  it("does not demand a table when each pair lives in an OPTION", () => {
    // "Which pair is not correctly matched" puts the pairs in the options, so there is
    // nothing in the stem to lay out and rule 2 must not fire.
    expect(rec({ stem: "Which one of the following pairs is not correctly matched?" })).toEqual([]);
  });

  it("hasPipeTable requires the separator, not merely pipes", () => {
    expect(hasPipeTable("| A | B |\n| 1 | 2 |")).toBe(false);
    expect(hasPipeTable("| A | B |\n|---|---|\n| 1 | 2 |")).toBe(true);
  });
});

describe("rule 7 — a figure reference must be DEICTIC", () => {
  it("blocks a stem pointing at a figure that is not attached", () => {
    const stem = "Which of the carbon atoms present in the molecule given below are asymmetric?";
    expect(rules(rec({ stem }))).toContain("7:BLOCK");
  });

  it("blocks 'in the figure below' and 'as shown above'", () => {
    expect(rules(rec({ stem: "In the figure below, ABCD is a square. Find the area." }))).toContain("7:BLOCK");
    expect(rules(rec({ stem: "The circuit shown above carries a current of 2 A." }))).toContain("7:BLOCK");
  });

  it("downgrades to TRIAGE once an image IS attached", () => {
    const stem = "Which of the carbon atoms present in the molecule given below are asymmetric?";
    const f = rec({ stem, imageUrl: "https://example.test/q129.png" } as any);
    expect(rules(f)).toContain("4:TRIAGE");
    expect(rules(f)).not.toContain("7:BLOCK");
  });

  it("does NOT fire on 'figure' used descriptively", () => {
    // LWS Mock 5 Q69. "Figure" here is a sculpted form; nothing is missing. A bare
    // \bfigure\b test blocked this and would have refused a clean paper.
    const stem = "Ardhanarisvara, a figure of half Shiva and half Parvati, represents";
    expect(rules(rec({ stem }))).not.toContain("7:BLOCK");
  });

  it("does NOT fire on the optical sense of 'image'", () => {
    const stem = "The image formed by a convex lens when the object is at 2F is";
    expect(rules(rec({ stem }))).not.toContain("7:BLOCK");
  });

  it("does NOT fire on a question ABOUT the shape of a graph", () => {
    const stem = "The displacement-time graph of a particle moving with uniform velocity is a";
    expect(rules(rec({ stem }))).not.toContain("7:BLOCK");
  });

  it("does NOT fire on a verbally-described circuit", () => {
    // LWS Mock 1 Q149. "the circuit" is how every verbal resistance question is worded;
    // no diagram is referenced. Treating a bare determiner as deictic blocked this.
    const stem =
      "Two resistances of 10\\(\\Omega\\) are parallely connected in a circuit. " +
      "Equivalent resistance of the circuit will be.";
    expect(rules(rec({ stem }))).not.toContain("7:BLOCK");
  });

  it("does NOT fire on an ANAPHORIC 'the figure' describing something already in words", () => {
    // LWS Mock 3 Q73. "the figure" is the human form on the Pashupati seal, which the
    // statements themselves describe — it points backwards at prose, not at an attachment.
    const stem =
      "II. An elephant and a tiger are revealed at the right side of the figure " +
      "and a rhinoceros and a buffalo are seen on the left.";
    expect(rules(rec({ stem }))).not.toContain("7:BLOCK");
  });
});

describe("rules 5 and 6 — solution quality", () => {
  it("blocks a missing solution", () => {
    expect(rules(rec({ solution: "" }))).toContain("5:BLOCK");
  });

  it("blocks LLM process residue", () => {
    const solution =
      "As an AI language model I should note that Canberra is the capital, purpose-built " +
      "to settle the rivalry between the two larger cities. Matches option B.";
    expect(rules(rec({ solution }))).toContain("6:BLOCK");
  });

  it("triages a solution too short to have derived anything", () => {
    expect(rules(rec({ solution: "Canberra. Matches option B." }))).toContain("5:TRIAGE");
  });
});

describe("predicates", () => {
  it("isStatementList ignores GFM table rows", () => {
    // A match-list table's cells look exactly like a flattened statement list.
    const table = "| A. Malaria | 1. Protozoan |\n|---|---|\n| B. Polio | 2. Virus |";
    expect(isStatementList(table)).toBe(false);
  });

  it("isPqrs needs all of P, Q and R", () => {
    expect(isPqrs("P. one Q. two R. three")).toBe(true);
    expect(isPqrs("P. one Q. two")).toBe(false);
  });

  it("isPairList keys on the ask, not only on the words List I", () => {
    expect(isPairList("Match List-I with List-II")).toBe(true);
    expect(isPairList("Match Column A with Column B")).toBe(true);
  });
});
