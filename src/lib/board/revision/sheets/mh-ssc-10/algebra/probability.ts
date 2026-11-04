import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Algebra, Ch. 5 Probability. Statements checked against the
 * Balbharati Mathematics Part I text; most-asked years and marks from the
 * board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Algebra",
  subjectRoute: "algebra",
  chapterName: "Probability",
  chapterSlug: "probability",
  source: "Balbharati Mathematics Part I Std X (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Random experiment",
      text: "An experiment in which all possible results are known in advance, but none of them can be predicted with certainty, and each result has an equal possibility.",
    },
    {
      term: "Outcome",
      text: "The result of a random experiment. Tossing a coin has 2 outcomes (H or T); throwing a die has 6 (1 to 6).",
    },
    {
      term: "Equally likely outcomes",
      text: "Outcomes are equally likely if none of them occurs in preference to the others. We assume the coins, dice and cards used are fair (unbiased).",
    },
    {
      term: "Sample space",
      text: "The set of all possible outcomes of a random experiment, denoted by **S**. Each element is a **sample point**; their number is \\(n(S)\\).",
    },
    {
      term: "Event",
      text: "A set of favourable outcomes of the sample space; an event is a **subset** of S. Events are named A, B, C; the number of elements in A is \\(n(A)\\).",
    },
    {
      term: "Sample spaces to know",
      text: "One coin: \\(n(S) = 2\\). Two coins: \\(\\{HH, HT, TH, TT\\}\\), \\(n(S) = 4\\). One die: \\(n(S) = 6\\). Two dice: \\(n(S) = 36\\). A coin and a die: \\(n(S) = 12\\).",
    },
    {
      term: "Coin tossed twice",
      text: "The sample space for a coin tossed twice is the same as for two coins tossed together. A die rolled twice is the same as two dice rolled together.",
    },
    {
      term: "Pack of playing cards",
      text: "52 cards in 4 sets (heart, diamond, club, spade) of 13 each: 26 red (hearts, diamonds) and 26 black. King, Queen and Jack are **face cards**: 12 in all. There are 4 aces.",
    },
    {
      term: "Probability of an event",
      text: "\\(P(A) = \\frac{n(A)}{n(S)}\\): the number of sample points in event A over the number in the sample space.",
    },
    {
      term: "Range of probability",
      text: "Probability is written as a fraction or a percentage, and is always from 0 to 1 (0% to 100%). So 1.5, 2.0 or \\(\\frac{15}{10}\\) can never be a probability.",
    },
  ],
  formulas: [
    { label: "Probability of an event", latex: "P(A) = \\frac{n(A)}{n(S)}" },
    { label: "Range", latex: "0 \\le P(A) \\le 1 \\qquad 0\\% \\le P(A) \\le 100\\%" },
    { label: "Number of sample points", latex: "n(S) = 2 \\text{ (coin)},\\; 4 \\text{ (two coins)},\\; 6 \\text{ (die)},\\; 36 \\text{ (two dice)},\\; 52 \\text{ (cards)}" },
  ],
  derivations: [
    {
      title: "Find the probability of an event (method)",
      steps: [
        "Write the sample space S and \\(n(S)\\).",
        "Write the event A in set form, listing only the favourable outcomes, and \\(n(A)\\).",
        "\\(P(A) = \\frac{n(A)}{n(S)}\\); simplify the fraction.",
      ],
    },
    {
      title: "Two digit numbers from given digits, without repetition (method)",
      steps: [
        "From 2, 3, 5: S = {23, 25, 32, 35, 52, 53}, \\(n(S) = 6\\).",
        "Pick the numbers that satisfy the condition (odd: units digit odd; multiple of 5: units digit 0 or 5).",
        "Divide their count by \\(n(S)\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Write the sample space S, n(S), and events in set form", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016] },
    { topic: "Probability with coins and dice (one or two dice, a coin and a die)", marks: 2, years: [2026, 2025, 2024, 2022, 2019, 2018, 2016] },
    { topic: "Balls, pens, cards in a box, or a committee: find the probability", marks: 3, years: [2026, 2025, 2022, 2020, 2016] },
    { topic: "Which number cannot be a probability, or find n(S) from P(A)", marks: 1, years: [2025, 2024, 2023, 2022, 2020] },
    { topic: "Two digit numbers formed from given digits", marks: 3, years: [2026, 2025, 2023, 2020, 2019] },
    { topic: "A card from a pack of 52 playing cards", years: [2025, 2024, 2022, 2020] },
  ],
  mistakes: [
    {
      title: "Writing HT and TH as one outcome",
      body: "With two coins, HT and TH are different sample points: \\(n(S) = 4\\), not 3. With two dice, (1, 2) and (2, 1) are different: \\(n(S) = 36\\).",
    },
    {
      title: "Missing the words at least and at most",
      body: "At least one head: HH, HT, TH. At most one head: HT, TH, TT. No head: TT only.",
    },
    {
      title: "Counting 1 as a prime number",
      body: "On a die, the primes are 2, 3, 5 only, so \\(P = \\frac{3}{6} = \\frac{1}{2}\\). Perfect squares on a die are 1 and 4.",
    },
    {
      title: "Allowing repeated digits when the question forbids it",
      body: "Read whether repetition is allowed. Without repetition, from 2, 3, 5 you get only 6 two digit numbers, not 9. A number cannot start with 0.",
    },
    {
      title: "An answer above 1",
      body: "If your probability comes out more than 1 or negative, \\(n(A)\\) or \\(n(S)\\) is wrong. Recount.",
    },
  ],
};

export default sheet;
