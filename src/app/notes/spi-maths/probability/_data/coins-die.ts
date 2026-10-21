import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PR_COINS_DIE_NOTE: SubtopicNote = {
  subtopicName: "Coins and a Single Die",
  title: "Coins and a Single Die",
  oneLineDefinition:
    "The probability of an event is the number of outcomes you want divided by the number of equally likely outcomes there are.",
  whyItMatters:
    "Twelve questions in the bank, all EASY: a die thrown once, or two or three coins tossed. Each is one count over 6, 4 or 8, so the only way to lose the mark is to list the outcomes wrongly.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiprcd-outcomes",
      name: "Experiment, outcome, sample space and event",
      intuition:
        "Throwing a die is an **experiment**. Each face it can show is an **outcome**, and the list of all outcomes is the **sample space**. An **event** is any group of outcomes you care about, such as 'an even number'.",
      definition:
        "- **Sample space** for one die: \\(\\{1, 2, 3, 4, 5, 6\\}\\), six outcomes.\n" +
        "- **Sample space** for one coin: \\(\\{H, T\\}\\), two outcomes.\n" +
        "- An **event** is a part of the sample space. 'An even number' on a die is \\(\\{2, 4, 6\\}\\).\n" +
        "- Outcomes are **equally likely** when none is favoured: a fair die, a fair coin, a well-shuffled deck.",
      formula: {
        label: "Number of outcomes",
        latex: "n(S) = \\text{number of outcomes in the sample space}",
      },
      authoredExample: {
        prompt: "List the sample space for one die and the event 'a number greater than 4'.",
        steps: [
          "Sample space: \\(\\{1, 2, 3, 4, 5, 6\\}\\), so \\(n(S) = 6\\).",
          "Greater than 4 means 5 or 6: the event is \\(\\{5, 6\\}\\).",
        ],
        answer: "\\(S = \\{1, 2, 3, 4, 5, 6\\}\\), event \\(= \\{5, 6\\}\\).",
      },
    },
    {
      kind: "formula" as const,
      slug: "spiprcd-classical",
      name: "Probability as favourable outcomes over all outcomes",
      intuition:
        "When every outcome is equally likely, the chance of an event is simply the share of outcomes that belong to it. Count the ones you want, count all of them, divide.",
      definition:
        "- \\(P(E) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}\\).\n" +
        "- Simplify the fraction at the end: \\(\\frac{3}{6} = \\frac{1}{2}\\).\n" +
        "- The rule needs equally likely outcomes. A die with letters or colours on its faces still has six equally likely faces.",
      formula: {
        label: "Classical probability",
        latex: "P(E) = \\frac{n(E)}{n(S)}",
        symbols: [
          { symbol: "n(E)", meaning: "number of outcomes favourable to the event" },
          { symbol: "n(S)", meaning: "number of outcomes in the sample space" },
        ],
      },
      authoredExample: {
        prompt: "A die is thrown once. Find the probability of a number greater than 4.",
        steps: [
          "Favourable outcomes: 5 and 6, so \\(n(E) = 2\\).",
          "All outcomes: \\(n(S) = 6\\).",
          "\\(P(E) = \\frac{2}{6} = \\frac{1}{3}\\).",
        ],
        answer: "\\(\\frac{1}{3}\\)",
      },
      selfCheckExample: {
        prompt: "A die is thrown once. Find the probability of a number less than 5.",
        steps: ["Favourable: 1, 2, 3, 4, which is 4 outcomes.", "\\(P = \\frac{4}{6} = \\frac{2}{3}\\)."],
        answer: "\\(\\frac{2}{3}\\)",
      },
      practiceSet: [
        { prompt: "A die is thrown once. What is the probability of getting a 6?", answer: "\\(\\frac{1}{6}\\)" },
        { prompt: "A die is thrown once. What is the probability of a number from 1 to 6?", answer: "\\(1\\)" },
        { prompt: "A die is thrown once. What is the probability of getting a 7?", answer: "\\(0\\)" },
        {
          prompt: "A die has the letters P, Q, R, S, T, U on its faces. What is the probability that it shows U?",
          answer: "\\(\\frac{1}{6}\\)",
        },
      ],
      pyqExampleId: "063a5a04-0686-4316-be05-a79734ceafb6",
      traps: [
        {
          title: "Forgetting to simplify",
          body:
            "\\(\\frac{3}{6}\\) is usually printed as \\(\\frac{1}{2}\\). If your fraction is not among the options, reduce it before deciding you are wrong.",
        },
        {
          title: "'Not even' is not a new count",
          body:
            "'Not an even number' on a die means 1, 3 or 5: the odd numbers. Rephrase a 'not' into the outcomes it leaves before counting.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiprcd-faces",
      name: "Which faces of a die are prime, composite or square",
      intuition:
        "Most single-die questions are really number questions in disguise: 'a prime number', 'a perfect square', 'a multiple of 3'. Know which of 1 to 6 fit each word and the probability is immediate.",
      definition:
        "Two facts settle most disputes:\n" +
        "- **1 is neither prime nor composite.**\n" +
        "- **2 is the only even prime**, so the odd primes on a die are 3 and 5.",
      table: {
        columns: ["Property", "Faces", "Probability"],
        rows: [
          { cells: ["Even", "2, 4, 6", "1/2"] },
          { cells: ["Odd", "1, 3, 5", "1/2"] },
          { cells: ["Prime", "2, 3, 5", "1/2"] },
          { cells: ["Odd prime", "3, 5", "1/3"] },
          { cells: ["Composite", "4, 6", "1/3"] },
          { cells: ["Perfect square", "1, 4", "1/3"] },
          { cells: ["Multiple of 3", "3, 6", "1/3"] },
          {
            cells: ["Neither prime nor composite", "1", "1/6"],
            noteAmber: "1 has only one factor, so it is in neither list.",
          },
        ],
        caption: "Every probability is the number of faces over 6, reduced.",
      },
      selfCheckExample: {
        prompt: "A die is thrown once. Find the probability of a prime number.",
        steps: ["Primes on a die: 2, 3, 5.", "\\(P = \\frac{3}{6} = \\frac{1}{2}\\)."],
        answer: "\\(\\frac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "Which faces of a die show composite numbers?", answer: "4 and 6" },
        { prompt: "A die is thrown once. What is the probability of a multiple of 2?", answer: "\\(\\frac{1}{2}\\)" },
        { prompt: "A die is thrown once. What is the probability of a factor of 6?", answer: "\\(\\frac{4}{6} = \\frac{2}{3}\\) (1, 2, 3, 6)" },
        {
          prompt: "A die is thrown once. What is the probability of a number that is neither prime nor composite?",
          answer: "\\(\\frac{1}{6}\\)",
        },
      ],
      pyqExampleId: "f00603d0-b7df-4202-91fd-e5c003185a2c",
      traps: [
        {
          title: "Counting 1 as a prime",
          body: "1 is not prime, so the primes on a die are 2, 3 and 5, giving \\(\\frac{1}{2}\\), not \\(\\frac{2}{3}\\).",
        },
        {
          title: "Counting 2 as an odd prime",
          body: "2 is prime but even. 'An odd prime' on a die is 3 or 5 only.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprcd-coins",
      name: "Listing the outcomes for two or three coins",
      intuition:
        "Each coin doubles the list: one coin has 2 outcomes, two coins 4, three coins 8. Write them all out in a fixed order and count the ones that fit.",
      definition:
        "- Two coins: HH, HT, TH, TT. HT and TH are **different** outcomes.\n" +
        "- Three coins: HHH, HHT, HTH, THH, HTT, THT, TTH, TTT.\n" +
        "- **Exactly one** head, **at least one** head and **at most one** head are three different events.\n" +
        "- The same doubling works for dice: each die multiplies the count by 6, so three dice give \\(6^3 = 216\\) outcomes.",
      formula: {
        label: "Outcomes for k coins or dice",
        latex: "n(S) = 2^k \\text{ for } k \\text{ coins} \\qquad n(S) = 6^k \\text{ for } k \\text{ dice}",
      },
      authoredExample: {
        prompt: "Three coins are tossed. Find the probability of exactly two heads.",
        steps: [
          "There are \\(2^3 = 8\\) outcomes.",
          "Exactly two heads: HHT, HTH, THH, which is 3 outcomes.",
          "\\(P = \\frac{3}{8}\\).",
        ],
        answer: "\\(\\frac{3}{8}\\)",
      },
      selfCheckExample: {
        prompt: "Three coins are tossed. Find the probability that all three show the same face.",
        steps: ["Same face: HHH or TTT, which is 2 of 8 outcomes.", "\\(P = \\frac{2}{8} = \\frac{1}{4}\\)."],
        answer: "\\(\\frac{1}{4}\\)",
      },
      practiceSet: [
        { prompt: "How many outcomes are there when four coins are tossed?", answer: "\\(2^4 = 16\\)" },
        { prompt: "A coin is tossed and a die is thrown. How many outcomes are there?", answer: "\\(2 \\times 6 = 12\\)" },
        { prompt: "Two coins are tossed. What is the probability of no head?", answer: "\\(\\frac{1}{4}\\) (TT only)" },
        { prompt: "Three coins are tossed. What is the probability of at least one head?", answer: "\\(\\frac{7}{8}\\) (all but TTT)" },
      ],
      pyqExampleId: "ce752736-1404-4525-a061-71184480fca1",
      traps: [
        {
          title: "Treating HT and TH as one outcome",
          body:
            "With two coins there are four outcomes, not three. Exactly one head is HT or TH, so its probability is \\(\\frac{2}{4} = \\frac{1}{2}\\), not \\(\\frac{1}{3}\\).",
        },
        {
          title: "'At most one' includes none",
          body:
            "At most one tail with three coins means no tail or one tail: HHH, HHT, HTH, THH. Leaving out HHH gives \\(\\frac{3}{8}\\), a printed wrong option.",
        },
      ],
    },
  ],
};
