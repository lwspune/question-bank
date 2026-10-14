import { describe, it, expect } from "vitest";
import { parseQuizQuestions, parseQuizKey, keyValueMatches } from "../scripts/afcat/lib";

// Fixtures are excerpts of the real LWS quiz files (pandoc -t plain --wrap=none),
// one per layout the folder actually uses.

describe("parseQuizQuestions", () => {
  it("reads (a)..(d) options split over two lines (Ratio quiz)", () => {
    const text = [
      "RATIO & PROPORTIONS TEST",
      "",
      "1. If the ratio of two numbers is 3:4 and their sum is 84, what is the larger number?",
      "",
      "(a) 36 (b) 40",
      "",
      "(c) 48 (d) 52",
      "",
      "2. What is the third proportional to 12 and 18?",
      "",
      "(a) 24 (b) 27",
      "",
      "(c) 30 (d) 36",
    ].join("\n");
    const { questions, errors } = parseQuizQuestions(text);
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(2);
    expect(questions[0]).toMatchObject({
      n: 1,
      stem: "If the ratio of two numbers is 3:4 and their sum is 84, what is the larger number?",
      options: ["36", "40", "48", "52"],
    });
    expect(questions[1].options).toEqual(["24", "27", "30", "36"]);
  });

  it("reads Qn. numbering, A) options on one line, and drops a trailing dash (Percentage quiz)", () => {
    const text = [
      "PERCENTAGE Quiz",
      "",
      "Q1. A man spends 75% of his income. If his income is Rs. 24,000, how much does he save? –",
      "",
      "A) Rs. 4,000 B) Rs. 6,000",
      "",
      "C) Rs. 8,000 D) Rs. 9,000",
      "",
      "Q2. What is 25% of 480?",
      "",
      "A) 100 B) 110 C) 120 D) 130",
    ].join("\n");
    const { questions } = parseQuizQuestions(text);
    expect(questions[0].stem).toBe("A man spends 75% of his income. If his income is Rs. 24,000, how much does he save?");
    expect(questions[0].options).toEqual(["Rs. 4,000", "Rs. 6,000", "Rs. 8,000", "Rs. 9,000"]);
    expect(questions[1].options).toEqual(["100", "110", "120", "130"]);
  });

  it("reads options printed on the stem line itself (Time & Work Q5)", () => {
    const text = [
      "Q4. A can do a work in 15 days. B can do it in 20 days. How long?",
      "",
      "A) 16 B) 18 C) 20 D) 19",
      "",
      "Q5. X can do 1/4 of a work in 10 days. How many days will X take to complete the entire work? A) 30 B) 40 C) 50 D) 60",
    ].join("\n");
    const { questions, errors } = parseQuizQuestions(text);
    expect(errors).toEqual([]);
    expect(questions[1]).toMatchObject({
      n: 5,
      stem: "X can do 1/4 of a work in 10 days. How many days will X take to complete the entire work?",
      options: ["30", "40", "50", "60"],
    });
  });

  it("reads one option per line and ignores a chatty preamble (Speed-Time-Distance quiz)", () => {
    const text = [
      "As your specialized AFCAT Mathematics guide, I have curated a comprehensive 50-question mock test.",
      "",
      "Time Allowed: 45 Minutes",
      "",
      "Q1. A train is moving at a speed of 90 km/hr. What is its speed in meters per second?",
      "A) 20 m/s",
      "B) 25 m/s",
      "C) 30 m/s",
      "D) 15 m/s",
      "",
      "Q2. A person covers a certain distance at 60 km/hr and returns at 40 km/hr. Average speed?",
      "A) 50 km/hr",
      "B) 48 km/hr",
      "C) 45 km/hr",
      "D) 52 km/hr",
    ].join("\n");
    const { questions } = parseQuizQuestions(text);
    expect(questions).toHaveLength(2);
    expect(questions[0].options).toEqual(["20 m/s", "25 m/s", "30 m/s", "15 m/s"]);
  });

  it("reads 'n:' numbering with lowercase a) options (SI/CI and Mixtures quizzes)", () => {
    const text = [
      "AFCAT SIMPLE & COMPOUND INTEREST",
      "",
      "30 Questions | 60 Mins",
      "",
      "1: A person invests Rs. 5,000 at 8% per annum for 3 years. The simple interest earned is:",
      "",
      "a) Rs. 900 b) Rs. 1,200 c) Rs. 1,000 d) Rs. 1,100",
    ].join("\n");
    const { questions } = parseQuizQuestions(text);
    expect(questions).toEqual([
      {
        n: 1,
        stem: "A person invests Rs. 5,000 at 8% per annum for 3 years. The simple interest earned is:",
        options: ["Rs. 900", "Rs. 1,200", "Rs. 1,000", "Rs. 1,100"],
      },
    ]);
  });

  it("captures an inline 'Answer:' line and does not absorb it into option D (P&L quiz with answers)", () => {
    const text = [
      "1. If the cost price is ₹500 and profit is 20%, the selling price is:",
      "",
      "A)  ₹580",
      "B)  ₹620",
      "C)  ₹600",
      "D)  ₹520",
      "",
      "Answer: C) ₹600",
      "",
      "------------------------------------------------------------------------",
      "",
      "2. An article is sold for ₹480 at a loss of 20%. What was the cost price?",
      "",
      "A)  ₹600",
      "B)  ₹575",
      "C)  ₹500",
      "D)  ₹525",
      "",
      "Answer: A) ₹600",
    ].join("\n");
    const { questions } = parseQuizQuestions(text);
    expect(questions[0].options).toEqual(["₹580", "₹620", "₹600", "₹520"]);
    expect(questions[0].answer).toBe("C");
    expect(questions[1].answer).toBe("A");
  });

  it("does not start a new question on a number that breaks the sequence", () => {
    const text = [
      "1. A tank is filled in",
      "40. minutes by one pipe. How long for two such pipes?",
      "(a) 10 (b) 20 (c) 30 (d) 40",
      "2. Next question?",
      "(a) 1 (b) 2 (c) 3 (d) 4",
    ].join("\n");
    const { questions } = parseQuizQuestions(text);
    expect(questions.map((q) => q.n)).toEqual([1, 2]);
    expect(questions[0].stem).toBe("A tank is filled in 40. minutes by one pipe. How long for two such pipes?");
  });

  it("accepts a parenthesised marker with no space after it, but not a bare one (P&L Q1, Q31)", () => {
    const text = ["1. If the cost price is ₹500 and profit is 20%, the selling price is:", "", "(a) ₹580 (b)₹620", "", "(c) ₹600 (d)20%"].join("\n");
    const { questions, errors } = parseQuizQuestions(text);
    expect(errors).toEqual([]);
    expect(questions[0].options).toEqual(["₹580", "₹620", "₹600", "20%"]);
    // "Ratio a)b" style text inside a stem is not an option run.
    const bare = parseQuizQuestions("1. Find x if a)b\nA) 1 B) 2 C) 3 D) 4");
    expect(bare.questions[0].options).toEqual(["1", "2", "3", "4"]);
  });

  it("stops at an ANSWER KEY heading and hands back the key text (Ratio and SDT quizzes)", () => {
    const text = [
      "50. What is the fourth proportional to 4, 9, 12?",
      "",
      "(a) 18 (b) 27 (c) 36 (d) 24",
      "",
      "ANSWER KEY",
      "",
      "1.  (c) 48",
      "",
      "2.  (b) 27",
    ].join("\n");
    const { questions, errors, keyText } = parseQuizQuestions(text);
    expect(errors).toEqual([]);
    expect(questions[0].options).toEqual(["18", "27", "36", "24"]);
    expect(keyText).toBe(["", "1.  (c) 48", "", "2.  (b) 27"].join("\n"));
  });

  it("reports a question whose options cannot be found, rather than inventing them", () => {
    const text = ["1. A question with no options at all?", "", "2. Fine?", "(a) 1 (b) 2 (c) 3 (d) 4"].join("\n");
    const { questions, errors } = parseQuizQuestions(text);
    expect(questions.map((q) => q.n)).toEqual([2]);
    expect(errors).toEqual(["Q1: could not find four options A-D in order"]);
  });
});

describe("parseQuizKey", () => {
  it("reads 'Qn. Answer: X) value - solution' (Percentage and Time & Work keys)", () => {
    const text = [
      "AFCAT PERCENTAGE - ANSWER KEY WITH SOLUTIONS",
      "",
      "Q1. Answer: B) Rs. 6,000 - Income = Rs. 24,000 - Spends = 75% of 24,000 = Rs. 18,000",
      "",
      "Q2. Answer: C) 120 - 25% of 480 = (25/100) × 480 = 120",
      "",
      "Q4. Answer: D) 16 days",
    ].join("\n");
    const key = parseQuizKey(text);
    expect(key.get(1)).toEqual({
      letter: "B",
      value: "Rs. 6,000",
      solution: "Income = Rs. 24,000 - Spends = 75% of 24,000 = Rs. 18,000",
    });
    expect(key.get(2)?.letter).toBe("C");
    expect(key.get(4)).toEqual({ letter: "D", value: "16 days", solution: "" });
  });

  it("reads 'Question n: Answer - X) value - solution' (SI/CI and Mixtures keys)", () => {
    const text = [
      "Question 1: Answer - B) 50 liters - Subtopic: Replacement Problem - Initial Ratio: Milk:Water = 3:2",
      "",
      "------------------------------------------------------------------------",
      "",
      "Question 2: Answer - A) Rs. 360 - Subtopic: Weighted Average Cost",
    ].join("\n");
    const key = parseQuizKey(text);
    expect(key.get(1)).toMatchObject({ letter: "B", value: "50 liters" });
    expect(key.get(2)).toMatchObject({ letter: "A", value: "Rs. 360" });
  });

  it("reads multi-line 'Question n - ANSWER: X' blocks (Probability key)", () => {
    const text = [
      "Question 1 - ANSWER: C",
      "",
      "Topic: Binomial Probability - Coin Tossing",
      "",
      "Solution: - Total possible outcomes = 2⁴ = 16",
      "",
      "P(3H) = 4/16 = 1/4",
      "",
      "Answer: C) 1/4",
      "",
      "Question 2 - ANSWER: A",
      "",
      "Answer: A) 1/3",
    ].join("\n");
    const key = parseQuizKey(text);
    expect(key.get(1)?.letter).toBe("C");
    expect(key.get(1)?.value).toBe("1/4");
    expect(key.get(1)?.solution).toContain("P(3H) = 4/16 = 1/4");
    expect(key.get(2)).toMatchObject({ letter: "A", value: "1/3" });
  });

  it("reads 'n. (x) value' lines (the key printed at the end of the Ratio quiz)", () => {
    const text = ["", "1.  (c) 48", "", "2.  (b) 27", "", "3.  (a) 8:15"].join("\n");
    const key = parseQuizKey(text);
    expect(key.get(1)).toEqual({ letter: "C", value: "48", solution: "" });
    expect(key.get(3)).toEqual({ letter: "A", value: "8:15", solution: "" });
  });

  it("reads a Q/Answer grid when the key is only a table (P&L key)", () => {
    const text = [
      "Answer Key Summary",
      "",
      "  Q    Answer   Q    Answer   Q    Answer",
      "  ---- -------- ---- -------- ---- --------",
      "  1    C        11   A        21   D",
      "",
      "  2    A        12   A        22   D",
    ].join("\n");
    const key = parseQuizKey(text);
    expect(key.get(1)?.letter).toBe("C");
    expect(key.get(11)?.letter).toBe("A");
    expect(key.get(22)?.letter).toBe("D");
    expect(key.size).toBe(6);
  });
});

describe("keyValueMatches", () => {
  it("accepts the keyed option whatever its spacing, case or units dressing", () => {
    expect(keyValueMatches("Rs. 6,000", "Rs. 6,000")).toBe(true);
    expect(keyValueMatches("17.14 days", "17.14")).toBe(true);
    expect(keyValueMatches("1/4", " 1/4 ")).toBe(true);
  });

  it("rejects a key value the keyed option does not carry (Mixtures Q1: key says 50, options have no 50)", () => {
    expect(keyValueMatches("50 liters", "40 liters")).toBe(false);
    expect(keyValueMatches("16 days", "19")).toBe(false);
  });
});
