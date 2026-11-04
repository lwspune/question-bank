import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 14 Probability. Statements checked against the
 * NCERT Class 10 text (rationalised); formulas rebuilt; most-asked years and
 * marks from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Probability",
  chapterSlug: "probability",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 14",
  keyPoints: [
    {
      term: "Theoretical probability",
      text: "\\(P(E) = \\frac{\\text{number of outcomes favourable to } E}{\\text{number of all possible outcomes of the experiment}}\\), when the outcomes are equally likely.",
    },
    {
      term: "Equally likely",
      text: "Outcomes are equally likely when each has the same chance: a fair coin, a fair die, a well-shuffled deck, a ball drawn 'at random'.",
    },
    {
      term: "Sure and impossible events",
      text: "The probability of a sure (certain) event is 1. The probability of an impossible event is 0.",
    },
    {
      term: "Range",
      text: "The favourable outcomes are never more than all the outcomes, so \\(0 \\leq P(E) \\leq 1\\). A probability can never be negative or more than 1 (so not 1.5, \\(-0.2\\) or 120%).",
    },
    {
      term: "Elementary event",
      text: "An event having only one outcome is an elementary event. The sum of the probabilities of all the elementary events of an experiment is 1.",
    },
    {
      term: "Complementary events",
      text: "For any event E, \\(P(E) + P(\\overline{E}) = 1\\), where \\(\\overline{E}\\) is 'not E'. E and \\(\\overline{E}\\) are complementary events.",
    },
    {
      term: "Deck of cards",
      text: "52 cards in 4 suits of 13: spades and clubs (black), hearts and diamonds (red). Kings, queens and jacks are face cards: 12 in all. There are 4 aces.",
    },
    {
      term: "Two dice",
      text: "Throwing a die twice and throwing two dice together are the same experiment: 36 outcomes \\((x, y)\\). There are 6 doublets.",
    },
    {
      term: "Coins",
      text: "Two coins: HH, HT, TH, TT (4 outcomes). Three coins: 8 outcomes, HHH, HHT, HTH, THH, HTT, THT, TTH, TTT.",
    },
  ],
  formulas: [
    { label: "Probability of an event", latex: "P(E) = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}" },
    { label: "Complement", latex: "P(\\overline{E}) = 1 - P(E)" },
    { label: "Range", latex: "0 \\leq P(E) \\leq 1" },
    { label: "Number of outcomes", latex: "n \\text{ coins: } 2^n, \\qquad 2 \\text{ dice: } 36" },
    { label: "Two dice: ways to get each sum", latex: "\\begin{array}{c|ccccccccccc} \\text{sum} & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\\\ \\hline \\text{ways} & 1 & 2 & 3 & 4 & 5 & 6 & 5 & 4 & 3 & 2 & 1 \\end{array}" },
    { label: "Leap year", latex: "366 = 52 \\times 7 + 2 \\Rightarrow P(53 \\text{ Mondays}) = \\frac{2}{7}" },
  ],
  derivations: [
    {
      title: "Two dice are thrown together. Find the probability that the sum is 8, and that the numbers are different",
      steps: [
        "Total outcomes \\(= 6 \\times 6 = 36\\). List or use the grid of pairs \\((x, y)\\).",
        "Sum 8: \\((2, 6), (3, 5), (4, 4), (5, 3), (6, 2)\\), 5 outcomes. \\(P = \\frac{5}{36}\\).",
        "Same numbers (doublets): 6 outcomes. Different numbers: \\(36 - 6 = 30\\). \\(P = \\frac{30}{36} = \\frac{5}{6}\\).",
      ],
    },
    {
      title: "Three coins are tossed together. Find P(at least two heads), P(at most one head), P(exactly one tail)",
      steps: [
        "Outcomes: HHH, HHT, HTH, THH, HTT, THT, TTH, TTT (8 in all).",
        "At least two heads: HHH, HHT, HTH, THH, so \\(P = \\frac{4}{8} = \\frac{1}{2}\\).",
        "At most one head: TTT, HTT, THT, TTH, so \\(P = \\frac{1}{2}\\).",
        "Exactly one tail: HHT, HTH, THH, so \\(P = \\frac{3}{8}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Numbers on cards, discs or balls (or one die): prime, composite, even, a multiple, a perfect square", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Balls in a bag, coins in a piggy bank, lottery, defective items: find a probability or the number of balls", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Cards from a pack of 52, or after some cards are removed or lost", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Two dice: sum, product, difference, doublets, different numbers", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Case study: survey tables, games, birthdays and leap years", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "Complementary events and range: \\(P(E) + P(\\overline{E}) = 1\\), which number cannot be a probability", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Two or three coins tossed together: at least, at most, exactly", marks: 1, years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Wrong total after removing cards",
      body: "If all face cards are removed, 40 cards are left; if one card is lost, 51 are left. Use the **new** total, and count favourable cards from what is left.",
    },
    {
      title: "At least and at most",
      body: "'At least one head' = one or more heads (only TT is left out of HH, HT, TH, TT). 'At most one head' = zero or one head.",
    },
    {
      title: "Counting 1 as prime, or forgetting 'between'",
      body: "1 is neither prime nor composite. 'Between 1 and 20' leaves out 1 and 20. Count the numbers carefully: 5 to 100 has 96 numbers.",
    },
    {
      title: "Treating (2, 6) and (6, 2) as one outcome",
      body: "With two dice, \\((2, 6)\\) and \\((6, 2)\\) are different outcomes. Only doublets like \\((4, 4)\\) are counted once.",
    },
    {
      title: "Leap year questions",
      body: "A leap year has 366 days = 52 weeks + 2 days. The 2 extra days form 7 equally likely pairs, so P(53 Mondays) = \\(\\frac{2}{7}\\). In a non-leap year it is \\(\\frac{1}{7}\\).",
    },
  ],
};

export default sheet;
