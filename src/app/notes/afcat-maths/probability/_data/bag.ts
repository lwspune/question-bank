import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PR_BAG_NOTE: SubtopicNote = {
  subtopicName: "Drawing from a Bag",
  title: "Drawing from a Bag: One Ball, One After Another, With Replacement",
  oneLineDefinition:
    "One ball is favourable balls over all balls; draws one after another multiply, with the bag shrinking at each step unless the ball is put back.",
  whyItMatters:
    "This page is EASY and MODERATE questions only, but each turns on one word: not, or, neither, with replacement or without. Read the bag twice, once for the colours and once for whether a ball goes back, and most of the marks follow.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpr-bag-one",
      name: "One ball: favourable over total",
      intuition:
        "A bag with 3 red, 5 blue and 2 white balls holds 10 balls. One ball drawn at random is blue with probability \\(\\tfrac{5}{10} = \\tfrac12\\).",
      definition:
        "- The total is every ball of every colour. The favourable balls are those of the colours asked for.\n" +
        "- 'Not red' is all the other colours, or \\(1 - P(\\text{red})\\).\n" +
        "- 'Red or white' adds, because one ball cannot be both colours.\n" +
        "- 'Neither red nor white' is the colours left over.",
      formula: {
        label: "One ball",
        latex: "P(\\text{colour}) = \\dfrac{\\text{balls of that colour}}{\\text{all balls}}",
      },
      authoredExample: {
        prompt: "A bag has 7 red, 2 green and 6 white balls. Find the probability that a ball drawn at random is red or green.",
        steps: ["There are \\(7 + 2 + 6 = 15\\) balls.", "Red or green: \\(7 + 2 = 9\\).", "\\(P = \\tfrac{9}{15} = \\tfrac{3}{5}\\)."],
        answer: "\\(\\tfrac{3}{5}\\).",
      },
      selfCheckExample: {
        prompt: "A box has 3 black, 8 white and 9 grey balls. Find the probability that a ball drawn is not grey.",
        steps: ["There are 20 balls, and \\(3 + 8 = 11\\) are not grey.", "\\(P = \\tfrac{11}{20}\\)."],
        answer: "\\(\\tfrac{11}{20}\\).",
      },
      practiceSet: [
        { prompt: "A jar has 5 orange and 15 pink sweets. Find the probability that a sweet picked at random is orange.", answer: "\\(\\tfrac{1}{4}\\)" },
        { prompt: "A bag has 2 red, 3 blue and 7 yellow balls. Find the probability that a ball drawn is neither red nor blue.", answer: "\\(\\tfrac{7}{12}\\)" },
        { prompt: "A bag has 10 balls, 4 of them red. Find the probability that a ball drawn is not red.", answer: "\\(\\tfrac{3}{5}\\)" },
        { prompt: "A bag has x red and 8 blue balls, and the probability of drawing red is \\(\\tfrac13\\). Find x.", answer: "\\(4\\)", method: "\\(\\tfrac{x}{x + 8} = \\tfrac13\\)." },
      ],
      pyqExampleId: "fb2fe03b-2cd7-4473-aca4-7addd2e4bbc8",
      traps: [
        {
          title: "The total is every ball",
          body: "In a bag of 3 red, 5 blue and 2 white, white is \\(\\tfrac{2}{10}\\), not \\(\\tfrac{2}{8}\\): the white balls are part of the total.",
        },
        {
          title: "Neither is not either",
          body: "'Neither red nor blue' is the colours left over. 'Either red or blue' is those two colours. Reading one as the other gives the complement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-bag-in-turn",
      name: "One after another, without replacement",
      intuition:
        "Draw a red ball and keep it out: the bag now has one ball fewer and one red fewer. Multiply the step probabilities, each worked on the bag as it is at that step.",
      definition:
        "- P(first red, then blue) \\(= \\tfrac{r}{n} \\times \\tfrac{b}{n - 1}\\), for r red and b blue among n balls.\n" +
        "- Both red: \\(\\tfrac{r}{n} \\times \\tfrac{r - 1}{n - 1}\\).\n" +
        "- 'The second is red, given the first was blue' is only the second step: \\(\\tfrac{r}{n - 1}\\).\n" +
        "- At least one red in two draws: \\(1 - P(\\text{no red})\\), where no red is two balls of the other colours, step by step.",
      formula: {
        label: "Without replacement",
        latex: "P(A \\text{ then } B) = \\dfrac{a}{n} \\times \\dfrac{b}{n - 1}",
      },
      authoredExample: {
        prompt: "A bag has 5 red and 3 blue balls. Two are drawn one after the other without replacement. Find the probability that the first is blue and the second red.",
        steps: ["First blue: \\(\\tfrac38\\). Then 5 red remain among 7.", "\\(\\tfrac38 \\times \\tfrac57 = \\tfrac{15}{56}\\)."],
        answer: "\\(\\tfrac{15}{56}\\).",
      },
      selfCheckExample: {
        prompt: "A bag has 4 white and 6 black balls. Two are drawn without replacement. Find the probability that at least one is white.",
        steps: ["No white: \\(\\tfrac{6}{10} \\times \\tfrac59 = \\tfrac13\\).", "\\(1 - \\tfrac13 = \\tfrac23\\)."],
        answer: "\\(\\tfrac{2}{3}\\).",
      },
      practiceSet: [
        { prompt: "A bag has 3 red and 7 green balls. Two are drawn without replacement. Find the probability that both are green.", answer: "\\(\\tfrac{7}{15}\\)" },
        { prompt: "A bag has 5 yellow and 5 blue balls. Three are drawn without replacement. Find the probability that all three are yellow.", answer: "\\(\\tfrac{1}{12}\\)" },
        { prompt: "A bag has 7 red and 2 blue balls. A ball is drawn and kept out, and it is red. Find the probability that the next ball is blue.", answer: "\\(\\tfrac{1}{4}\\)" },
      ],
      pyqExampleId: "48906fff-ad85-4ac2-86d0-6e22862603ca",
      traps: [
        {
          title: "Change both numbers",
          body: "After a red ball is kept out of 5 red and 3 blue, the bag has 4 red among 7. Writing \\(\\tfrac57\\) or \\(\\tfrac48\\) for the next red changes only one of the two.",
        },
        {
          title: "Order is part of the event",
          body: "'First red, then blue' is one order. 'One red and one blue' in two draws adds the other order too: \\(2 \\times \\tfrac58 \\times \\tfrac37 = \\tfrac{15}{28}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-bag-replace",
      name: "With replacement: the bag resets",
      intuition:
        "When each ball goes back before the next draw, every draw is from the same bag. The draws are independent, like tosses of a biased coin.",
      definition:
        "- All k draws red: \\(\\left(\\tfrac{r}{n}\\right)^k\\).\n" +
        "- Exactly j red in k draws: \\(^kC_j \\, p^j (1 - p)^{k - j}\\), with \\(p = \\tfrac{r}{n}\\). It is the coins rule with p in place of a half.\n" +
        "- One of each of two colours in two draws: add both orders, \\(2pq\\), where p and q are the two colours' probabilities.",
      formula: {
        label: "j of k draws, with replacement",
        latex: "P(j \\text{ of } k) = {}^kC_j\\, p^j (1 - p)^{k - j}",
      },
      authoredExample: {
        prompt: "A bag has 3 red and 7 white balls. Three are drawn with replacement. Find the probability that exactly two are red.",
        steps: [
          "\\(p = \\tfrac{3}{10}\\) for red on each draw.",
          "Choose the two red draws: \\(^3C_2 = 3\\).",
          "\\(3 \\times \\left(\\tfrac{3}{10}\\right)^2 \\times \\tfrac{7}{10} = \\tfrac{189}{1000}\\).",
        ],
        answer: "\\(\\tfrac{189}{1000}\\).",
      },
      selfCheckExample: {
        prompt: "A bag has 1 black and 3 white balls. Two are drawn with replacement. Find the probability that both are white.",
        steps: ["\\(P(\\text{white}) = \\tfrac34\\) on each draw.", "\\(\\left(\\tfrac34\\right)^2 = \\tfrac{9}{16}\\)."],
        answer: "\\(\\tfrac{9}{16}\\).",
      },
      practiceSet: [
        { prompt: "A bag has 4 red and 4 green balls. Three are drawn with replacement. Find the probability that all three are green.", answer: "\\(\\tfrac{1}{8}\\)" },
        { prompt: "A bag has 5 blue and 3 yellow balls. Two are drawn with replacement. Find the probability that the first is blue and the second yellow.", answer: "\\(\\tfrac{15}{64}\\)" },
        { prompt: "A bag has 1 red and 4 white balls. Two are drawn with replacement. Find the probability of exactly one red.", answer: "\\(\\tfrac{8}{25}\\)" },
      ],
      pyqExampleId: "da40071e-9462-4791-b0d6-23c4ceeee868",
      traps: [
        {
          title: "With replacement nothing shrinks",
          body: "Three draws with replacement from 2 red and 8 white give all red as \\(\\left(\\tfrac{2}{10}\\right)^3 = \\tfrac{1}{125}\\). Writing \\(\\tfrac{2}{10} \\times \\tfrac19 \\times \\tfrac08\\) treats the balls as kept out.",
        },
      ],
    },
  ],
};
