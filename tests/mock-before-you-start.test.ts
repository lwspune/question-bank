/**
 * The "Before you start" lines on the mock instructions page (2026-11-11).
 *
 * Owner rule for this card: NO WRONG SUGGESTIONS. So every line is computed
 * from the paper's own per-question marking, never typed per exam, and every
 * expectation below is worked by hand from the marking it names:
 *
 *   expected marks of a guess with j options left = (m - (j - 1) p) / j
 *
 * where m = marks for a right answer, p = marks lost for a wrong one. A value
 * within 1% of m of zero counts as zero, because stored penalties are rounded
 * (NDA keeps 2.5/3 as 0.83, which would otherwise read as a tiny gain).
 */
import { describe, it, expect } from "vitest";
import { beforeYouStartLines, type GuessQuestion } from "@/lib/mocks/beforeYouStart";

const mcq = (marks: number, negMarks: number, n = 10): GuessQuestion[] =>
  Array.from({ length: n }, () => ({ marks, negMarks, numeric: false }));
const nat = (marks: number, negMarks: number, n = 5): GuessQuestion[] =>
  Array.from({ length: n }, () => ({ marks, negMarks, numeric: true }));
const kinds = (lines: ReturnType<typeof beforeYouStartLines>) => lines.map((l) => l.kind);

describe("beforeYouStartLines: the multiple-choice guessing rule", () => {
  it("JEE Main (+4/-1, 4 options): a blind guess gains +0.25, so never leave one blank", () => {
    const lines = beforeYouStartLines(mcq(4, -1), 4);
    expect(kinds(lines)).toEqual(["mcq_blind_gains"]);
    expect(lines[0].text).toMatch(/blind guess/i);
    expect(lines[0].text).not.toMatch(/skip/i);
  });

  it("reads a penalty stored as a positive number the same way", () => {
    expect(kinds(beforeYouStartLines(mcq(4, 1), 4))).toEqual(["mcq_blind_gains"]);
  });

  it("MPSC (+2/-0.5, 4 options): a blind guess gains +0.125", () => {
    expect(kinds(beforeYouStartLines(mcq(2, -0.5), 4))).toEqual(["mcq_blind_gains"]);
  });

  it("NDA (+2.5/-0.83, 4 options): a blind guess gains nothing; one option ruled out gains +0.28", () => {
    const lines = beforeYouStartLines(mcq(2.5, -0.83), 4);
    expect(lines).toEqual([expect.objectContaining({ kind: "mcq_rule_out", ruleOut: 1 })]);
    expect(lines[0].text).toMatch(/gains nothing/i);
    expect(lines[0].text).toMatch(/rule out one option/i);
  });

  it("CDS English (+0.83/-0.28, 4 options): the same one-third rule", () => {
    const lines = beforeYouStartLines(mcq(0.8333, -0.2778), 4);
    expect(lines).toEqual([expect.objectContaining({ kind: "mcq_rule_out", ruleOut: 1 })]);
  });

  it("UCEED's MCQ section (+3/-1, 4 options): blind 0, one ruled out +0.33", () => {
    expect(beforeYouStartLines(mcq(3, -1), 4)).toEqual([expect.objectContaining({ kind: "mcq_rule_out", ruleOut: 1 })]);
  });

  it("IMAT (+1.5/-0.4, FIVE options): a blind guess LOSES 0.02; one ruled out gains +0.075", () => {
    const lines = beforeYouStartLines(mcq(1.5, -0.4), 5);
    expect(lines).toEqual([expect.objectContaining({ kind: "mcq_rule_out", ruleOut: 1 })]);
    expect(lines[0].text).toMatch(/loses marks/i);
  });

  it("the same IMAT marking read as FOUR options would wrongly say a blind guess gains (why the count matters)", () => {
    expect(kinds(beforeYouStartLines(mcq(1.5, -0.4), 4))).toEqual(["mcq_blind_gains"]);
  });

  it("a harsh penalty (+1/-0.6, 4 options): blind -0.2, one out -0.07, two out +0.2, so rule out two", () => {
    const lines = beforeYouStartLines(mcq(1, -0.6), 4);
    expect(lines).toEqual([expect.objectContaining({ kind: "mcq_rule_out", ruleOut: 2 })]);
    expect(lines[0].text).toMatch(/rule out two options/i);
  });

  it("a penalty equal to the reward (+1/-1): even a 50-50 guess gains nothing, so answer only when sure", () => {
    expect(kinds(beforeYouStartLines(mcq(1, -1), 4))).toEqual(["mcq_sure_only"]);
  });

  it("MHT-CET (+2/0): no penalty, so answer every question", () => {
    const lines = beforeYouStartLines(mcq(2, 0), 4);
    expect(kinds(lines)).toEqual(["no_penalty"]);
    expect(lines[0].text).toMatch(/costs nothing/i);
    expect(lines[0].text).not.toMatch(/skip/i);
  });
});

describe("beforeYouStartLines: numeric answers", () => {
  it("JEE Main 2025+ numeric (+4/-1): a guess has no options and costs 1 mark", () => {
    const lines = beforeYouStartLines([...mcq(4, -1), ...nat(4, -1)], 4);
    expect(kinds(lines)).toEqual(["mcq_blind_gains", "numeric_costs"]);
    expect(lines[1].text).toMatch(/costs 1 mark\b/);
    // The MCQ line must not read as covering numeric answers.
    expect(lines[0].text).toMatch(/multiple-choice/i);
  });

  it("states a fractional numeric penalty with its own value", () => {
    const lines = beforeYouStartLines(nat(3, -0.5), null);
    expect(lines).toEqual([expect.objectContaining({ kind: "numeric_costs" })]);
    expect(lines[0].text).toMatch(/costs 0\.5 marks/);
  });

  it("IPMAT Indore short answers (no penalty) beside +4/-1 MCQs: always enter a numeric answer", () => {
    expect(kinds(beforeYouStartLines([...mcq(4, -1), ...nat(4, 0)], 4))).toEqual(["mcq_blind_gains", "numeric_free"]);
  });

  it("a paper with no penalty anywhere gets ONE line, not two", () => {
    expect(kinds(beforeYouStartLines([...mcq(4, 0), ...nat(4, 0)], 4))).toEqual(["no_penalty"]);
  });
});

describe("beforeYouStartLines: says nothing rather than something wrong", () => {
  it("no line about multiple-choice when the option count is unknown", () => {
    expect(beforeYouStartLines(mcq(4, -1), null)).toEqual([]);
  });

  it("no multiple-choice line when its questions are marked differently from one another", () => {
    expect(beforeYouStartLines([...mcq(4, -1), ...mcq(2, -0.66)], 4)).toEqual([]);
  });

  it("no numeric line when numeric questions are marked differently from one another", () => {
    expect(kinds(beforeYouStartLines([...mcq(4, -1), ...nat(4, -1), ...nat(4, 0)], 4))).toEqual(["mcq_blind_gains"]);
  });

  it("ignores grace questions", () => {
    const qs: GuessQuestion[] = [...mcq(4, -1), { marks: 4, negMarks: 0, numeric: false, grace: true }];
    expect(kinds(beforeYouStartLines(qs, 4))).toEqual(["mcq_blind_gains"]);
  });

  /**
   * MPSC CSAT's Decision Making questions carry no penalty beside +2.5/-0.83
   * ones, and UCEED's multiple-SELECT questions read like multiple-choice to a
   * student: a line about "a guess here" would be wrong for some of the paper.
   */
  it("says nothing at all on a paper with per-option-marked questions", () => {
    const qs: GuessQuestion[] = [...mcq(2.5, -0.83), { marks: 2.5, negMarks: 0, numeric: false, optionMarks: { A: 2.5, B: 0 } }];
    expect(beforeYouStartLines(qs, 4)).toEqual([]);
  });

  it("says nothing at all on a paper with multiple-select questions", () => {
    const qs: GuessQuestion[] = [...mcq(3, -0.71), ...nat(4, 0), { marks: 4, negMarks: -1, numeric: false, msqScheme: "partial" }];
    expect(beforeYouStartLines(qs, 4)).toEqual([]);
  });

  it("an empty paper has no lines", () => {
    expect(beforeYouStartLines([], 4)).toEqual([]);
  });
});

describe("beforeYouStartLines: wording", () => {
  const all = [
    beforeYouStartLines([...mcq(4, -1), ...nat(4, -1)], 4),
    beforeYouStartLines(mcq(2.5, -0.83), 4),
    beforeYouStartLines(mcq(1.5, -0.4), 5),
    beforeYouStartLines(mcq(1, -0.6), 4),
    beforeYouStartLines(mcq(1, -1), 4),
    beforeYouStartLines([...mcq(4, -1), ...nat(4, 0)], 4),
    beforeYouStartLines(mcq(2, 0), 4),
  ].flat();

  it("has no dashes as punctuation (owner rule, 2026-10-05)", () => {
    for (const l of all) expect(l.text).not.toMatch(/[—–]| -- /);
  });

  it("every line is one short sentence or two", () => {
    for (const l of all) expect(l.text.length).toBeLessThanOrEqual(160);
  });
});
