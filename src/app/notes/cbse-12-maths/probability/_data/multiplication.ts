import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_PR_MULTIPLICATION_NOTE: SubtopicNote = {
  subtopicName: "Multiplication Theorem on Probability",
  title: "Multiplication Theorem on Probability",
  oneLineDefinition:
    "The probability that two events both happen is the probability of the first times the probability of the second given the first: P(E and F) = P(E) P(F|E), extended to three or more events in a row.",
  whyItMatters:
    "7 questions, three of them from board papers: a 2023 MCQ that turns P(B/A) and P(A) into P(A and B) and then uses the addition theorem, a 2022 question on drawing one ball from each of two boxes, and a 2025 case-study part. The rule itself runs under almost every Bayes' theorem and total probability question in the chapter. The textbook adds Examples 8 and 9 and Exercise 13.2 Q2 and Q3.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmpr-multrule",
      name: "The multiplication rule for two events",
      intuition:
        "To find the chance of 'E and then F', take the chance of E, then the chance of F now that E has happened. When the first draw is not put back, the second probability is worked out from what is left.",
      definition:
        "- **Multiplication rule:** \\(P(E \\cap F) = P(E)\\,P(F|E) = P(F)\\,P(E|F)\\), provided \\(P(E) \\ne 0\\) and \\(P(F) \\ne 0\\).\n" +
        "- It is the definition of conditional probability, multiplied out.\n" +
        "- **Without replacement:** the second probability is counted from the balls or cards that remain.\n" +
        "- **With replacement**, or two separate boxes, the second draw is not affected, so \\(P(F|E) = P(F)\\).\n" +
        "- 'Same colour' or 'one of each' is more than one case: work out each case as a product, then add.",
      formula: {
        label: "Multiplication rule",
        latex: "P(E \\cap F) = P(E)\\,P(F|E) = P(F)\\,P(E|F)",
      },
      authoredExample: {
        prompt: "A bag has 5 red and 3 white balls. Two balls are drawn one after the other without replacement. Find the probability that both are white.",
        steps: [
          "Let E be 'the first ball is white' and F be 'the second ball is white'.",
          "\\(P(E) = \\dfrac{3}{8}\\).",
          "After a white ball is drawn, 2 white remain among 7 balls, so \\(P(F|E) = \\dfrac{2}{7}\\).",
          "By the multiplication rule, \\(P(E \\cap F) = P(E)\\,P(F|E) = \\dfrac{3}{8} \\times \\dfrac{2}{7} = \\dfrac{3}{28}\\).",
        ],
        answer: "\\(\\dfrac{3}{28}\\)",
      },
      selfCheckExample: {
        prompt: "Two cards are drawn one after the other without replacement from a pack of 52 cards. Find the probability that the first is a king and the second is a queen.",
        steps: [
          "P(first is a king) \\(= \\dfrac{4}{52}\\).",
          "A king is gone but all 4 queens remain among 51 cards: P(second is a queen | first is a king) \\(= \\dfrac{4}{51}\\).",
        ],
        answer: "\\(\\dfrac{4}{52} \\times \\dfrac{4}{51} = \\dfrac{4}{663}\\)",
      },
      practiceSet: [
        {
          prompt: "Two cards are drawn without replacement from a pack of 52 cards. Find the probability that both are hearts.",
          answer: "\\(\\dfrac{13}{52} \\times \\dfrac{12}{51} = \\dfrac{1}{17}\\)",
        },
        { prompt: "If \\(P(F) = 0.7\\) and \\(P(E|F) = 0.2\\), find \\(P(E \\cap F)\\).", answer: "\\(0.14\\)" },
        {
          prompt: "A box has 7 good and 3 faulty bulbs. Two are taken out one by one without replacement. Find the probability that the first is good and the second is faulty.",
          answer: "\\(\\dfrac{7}{10} \\times \\dfrac{3}{9} = \\dfrac{7}{30}\\)",
        },
      ],
      pyqExampleId: "26165f0f-88cc-4d25-a9d9-c93983a936ad",
      traps: [
        {
          title: "Multiplying the first-draw probabilities twice",
          body: "Without replacement, the second draw comes from fewer balls. For two white balls from 3 white and 5 red, the answer is \\(\\dfrac{3}{8} \\times \\dfrac{2}{7}\\), not \\(\\dfrac{3}{8} \\times \\dfrac{3}{8}\\).",
        },
        {
          title: "Pairing the wrong conditional",
          body: "\\(P(E \\cap F) = P(E)\\,P(F|E)\\). Writing \\(P(E)\\,P(E|F)\\) mixes the two forms and is wrong.",
        },
        {
          title: "Forgetting the second case",
          body: "'The two balls are of the same colour' means both white OR both red. Find each product and add them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-chain",
      name: "Three or more events in a row",
      intuition:
        "The rule extends one step at a time. Each new factor is the probability of the next draw, given everything that has already been drawn.",
      definition:
        "- **For three events:** \\(P(E \\cap F \\cap G) = P(E)\\,P(F|E)\\,P(G|E \\cap F)\\).\n" +
        "- The rule extends in the same way to four or more events.\n" +
        "- For draws without replacement, each factor is (what is wanted and still left) divided by (what is left in all).\n" +
        "- **Answer layout:** name the events, write each factor with a reason ('one king has been drawn, so 3 kings remain in 51 cards'), multiply, simplify.",
      formula: {
        label: "Multiplication rule for three events",
        latex: "P(E \\cap F \\cap G) = P(E)\\,P(F|E)\\,P(G|E \\cap F)",
      },
      authoredExample: {
        prompt: "A bag has 4 white and 6 black balls. Three balls are drawn one by one without replacement. Find the probability that they are white, black and white, in that order.",
        steps: [
          "Let \\(W_1\\) be 'first white', \\(B_2\\) be 'second black' and \\(W_3\\) be 'third white'.",
          "\\(P(W_1) = \\dfrac{4}{10}\\).",
          "After one white is drawn, 6 black remain among 9 balls: \\(P(B_2|W_1) = \\dfrac{6}{9}\\).",
          "After a white and a black are drawn, 3 white remain among 8 balls: \\(P(W_3|W_1 \\cap B_2) = \\dfrac{3}{8}\\).",
          "\\(P = \\dfrac{4}{10} \\times \\dfrac{6}{9} \\times \\dfrac{3}{8} = \\dfrac{72}{720} = \\dfrac{1}{10}\\).",
        ],
        answer: "\\(\\dfrac{1}{10}\\)",
      },
      selfCheckExample: {
        prompt: "A bag has 5 red and 4 blue balls. Three balls are drawn one by one without replacement. Find the probability that the first two are red and the third is blue.",
        steps: ["\\(\\dfrac{5}{9} \\times \\dfrac{4}{8} \\times \\dfrac{4}{7} = \\dfrac{80}{504}\\)."],
        answer: "\\(\\dfrac{10}{63}\\)",
      },
      practiceSet: [
        {
          prompt: "Three cards are drawn one by one without replacement from a pack of 52 cards. Find the probability that all three are spades.",
          answer: "\\(\\dfrac{13}{52} \\times \\dfrac{12}{51} \\times \\dfrac{11}{50} = \\dfrac{11}{850}\\)",
        },
        {
          prompt: "An urn has 3 red and 2 blue balls. Three are drawn one by one without replacement. Find the probability of red, red, blue in that order.",
          answer: "\\(\\dfrac{3}{5} \\times \\dfrac{2}{4} \\times \\dfrac{2}{3} = \\dfrac{1}{5}\\)",
        },
        {
          prompt: "Four cards are drawn one by one without replacement from a pack of 52 cards. Find the probability that all four are aces.",
          answer: "\\(\\dfrac{4}{52} \\times \\dfrac{3}{51} \\times \\dfrac{2}{50} \\times \\dfrac{1}{49} = \\dfrac{1}{270725}\\)",
        },
      ],
      pyqExampleId: "0e45b74c-840c-40f8-b788-b70ef5e2bf0b",
      traps: [
        {
          title: "Not updating both counts",
          body: "Each draw without replacement lowers the total by 1, and lowers the count of that colour by 1. Change both before writing the next factor.",
        },
        {
          title: "Ignoring the order asked",
          body: "'White, black, white in that order' is one product. 'Two white and one black in any order' needs the three orders added.",
        },
      ],
    },
  ],
};
