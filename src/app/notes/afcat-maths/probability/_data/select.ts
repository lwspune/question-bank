import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PR_SELECT_NOTE: SubtopicNote = {
  subtopicName: "Selecting Balls with Combinations",
  title: "Choosing Several Balls at Once: Combinations",
  oneLineDefinition:
    "When several balls are taken together, count selections with nCr: the ways to get the mix you want, divided by the ways to choose that many balls from the whole bag.",
  whyItMatters:
    "This is the hardest page of the chapter: well over a third of its questions are HARD. Each one is two nCr counts and a division, and the marks go on the cases: exactly against at least, same colour summed over every colour, and different colours, where the complement is often quicker.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpr-select-mix",
      name: "A given mix of colours: choose from each colour and multiply",
      intuition:
        "Choosing 3 balls from 5 red and 4 blue, exactly 1 red means 1 of the 5 reds and 2 of the 4 blues: \\(5 \\times 6 = 30\\) ways out of \\(^9C_3 = 84\\), so \\(\\tfrac{30}{84} = \\tfrac{5}{14}\\).",
      definition:
        "- The total number of ways to choose r balls from n is \\(^nC_r\\). The order of the chosen balls does not matter.\n" +
        "- The ways to get a mix are \\(^aC_x \\times {}^bC_y \\times \\dots\\), one factor for each colour, with \\(x + y + \\dots = r\\).\n" +
        "- 'Drawn together', 'selected' or 'chosen' means combinations. Drawing one by one without replacement gives the same probability, worked step by step as on the last page.\n" +
        "- Useful values: \\(^nC_2 = \\tfrac{n(n - 1)}{2}\\) and \\(^nC_3 = \\tfrac{n(n - 1)(n - 2)}{6}\\).",
      formula: {
        label: "A mix of colours",
        latex: "P = \\dfrac{{}^aC_x \\times {}^bC_y}{{}^nC_r}",
      },
      authoredExample: {
        prompt: "A bag has 4 red and 6 green balls. Three balls are drawn together. Find the probability that exactly 2 are green.",
        steps: [
          "Ways: \\(^6C_2 \\times {}^4C_1 = 15 \\times 4 = 60\\).",
          "Total: \\(^{10}C_3 = 120\\).",
          "\\(P = \\tfrac{60}{120} = \\tfrac12\\).",
        ],
        answer: "\\(\\tfrac{1}{2}\\).",
      },
      selfCheckExample: {
        prompt: "A box has 3 red, 4 blue and 5 white balls. Four are chosen. Find the probability of exactly 1 red, 1 blue and 2 white.",
        steps: ["Ways: \\(3 \\times 4 \\times {}^5C_2 = 3 \\times 4 \\times 10 = 120\\).", "Total: \\(^{12}C_4 = 495\\).", "\\(\\tfrac{120}{495} = \\tfrac{8}{33}\\)."],
        answer: "\\(\\tfrac{8}{33}\\).",
      },
      practiceSet: [
        { prompt: "From 5 red and 3 black balls, 2 are chosen. Find the probability that both are black.", answer: "\\(\\tfrac{3}{28}\\)" },
        { prompt: "From 6 white and 4 red balls, 3 are chosen. Find the probability that all three are red.", answer: "\\(\\tfrac{1}{30}\\)" },
        { prompt: "From 7 blue and 3 green balls, 4 are chosen. Find the probability that exactly 2 are green.", answer: "\\(\\tfrac{3}{10}\\)", method: "\\(\\tfrac{3 \\times 21}{210}\\)." },
      ],
      pyqExampleId: "043a9ad4-68a5-433b-866f-72574965c03d",
      traps: [
        {
          title: "Every ball is in the total",
          body: "Choosing 2 balls from 3 red, 4 blue and 5 white, the total is \\(^{12}C_2 = 66\\), even when the question asks only about red.",
        },
        {
          title: "Exactly two red needs the rest non-red",
          body: "Exactly 2 red among 3 chosen means the third ball is not red. Multiply by the ways to choose that ball; \\(^rC_2\\) over the total alone misses the factor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-select-same",
      name: "Same colour: add over every colour",
      intuition:
        "Two balls of the same colour can be both red, or both blue, or both white. Count each case and add.",
      definition:
        "- Same colour for r balls: add \\(^{(\\text{that colour})}C_r\\) over every colour with at least r balls.\n" +
        "- Divide by \\(^nC_r\\).\n" +
        "- 'Exactly two of the same colour' among three: pick the colour, pick two of it, then pick the third ball from the other colours.",
      formula: {
        label: "Same colour",
        latex: "P(\\text{same}) = \\dfrac{{}^aC_r + {}^bC_r + {}^cC_r}{{}^nC_r}",
      },
      authoredExample: {
        prompt: "A bag has 2 red, 4 blue and 7 white balls. Two are drawn together. Find the probability that they are the same colour.",
        steps: [
          "Same colour: \\(^2C_2 + {}^4C_2 + {}^7C_2 = 1 + 6 + 21 = 28\\).",
          "Total: \\(^{13}C_2 = 78\\).",
          "\\(P = \\tfrac{28}{78} = \\tfrac{14}{39}\\).",
        ],
        answer: "\\(\\tfrac{14}{39}\\).",
      },
      selfCheckExample: {
        prompt: "A bag has 5 red and 5 black balls. Three are drawn together. Find the probability that all three are the same colour.",
        steps: ["\\(^5C_3 + {}^5C_3 = 10 + 10 = 20\\).", "Total: \\(^{10}C_3 = 120\\), so \\(\\tfrac{20}{120} = \\tfrac16\\)."],
        answer: "\\(\\tfrac{1}{6}\\).",
      },
      practiceSet: [
        { prompt: "A bag has 6 red and 3 blue balls. Two are drawn. Find the probability that they are the same colour.", answer: "\\(\\tfrac{1}{2}\\)", method: "\\(\\tfrac{15 + 3}{36}\\)." },
        { prompt: "A bag has 3 balls of each of 3 colours. Three are drawn. Find the probability that all are the same colour.", answer: "\\(\\tfrac{1}{28}\\)" },
        { prompt: "A bag has 4 red and 2 white balls. Two are drawn. Find the probability that they are the same colour.", answer: "\\(\\tfrac{7}{15}\\)" },
      ],
      pyqExampleId: "35ea546f-d682-48ce-8126-a049444b3f97",
      traps: [
        {
          title: "Do not stop at one colour",
          body: "Same colour from 2 red, 4 blue and 7 white is \\(1 + 6 + 21 = 28\\) pairs. Counting only the white pairs gives \\(\\tfrac{21}{78}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-select-different",
      name: "Different colours: one minus same, or one of each",
      intuition:
        "Two balls of different colours are every pair that is not the same colour. For three balls from three colours, 'all different' means one of each colour.",
      definition:
        "- Two balls of different colours: \\(1 - P(\\text{same colour})\\).\n" +
        "- r balls, all different, from exactly r colours: multiply the colour counts. From more colours than r, add over each choice of r colours.\n" +
        "- With fewer colours than balls, 'all different' is impossible: the probability is 0.",
      formula: {
        label: "Different colours",
        latex: "P(\\text{different}) = 1 - P(\\text{same})",
      },
      authoredExample: {
        prompt: "A bag has 2 red, 4 blue and 7 white balls. Two are drawn together. Find the probability that they are different colours.",
        steps: [
          "Same colour was \\(\\tfrac{28}{78} = \\tfrac{14}{39}\\), so different is \\(1 - \\tfrac{14}{39} = \\tfrac{25}{39}\\).",
          "Check directly: \\(2 \\times 4 + 2 \\times 7 + 4 \\times 7 = 8 + 14 + 28 = 50\\), and \\(\\tfrac{50}{78} = \\tfrac{25}{39}\\).",
        ],
        answer: "\\(\\tfrac{25}{39}\\).",
      },
      selfCheckExample: {
        prompt: "A bag has 2 red, 3 blue and 4 green balls. Three are drawn together. Find the probability that they are all different colours.",
        steps: ["One of each: \\(2 \\times 3 \\times 4 = 24\\).", "Total: \\(^9C_3 = 84\\), so \\(\\tfrac{24}{84} = \\tfrac27\\)."],
        answer: "\\(\\tfrac{2}{7}\\).",
      },
      practiceSet: [
        { prompt: "A bag has 6 red and 4 white balls. Two are drawn. Find the probability that they are different colours.", answer: "\\(\\tfrac{8}{15}\\)" },
        { prompt: "A bag has 3 balls of each of 4 colours. Three are drawn. Find the probability that all three are different colours.", answer: "\\(\\tfrac{27}{55}\\)", method: "\\(\\tfrac{4 \\times 27}{220}\\)." },
        { prompt: "A bag has 4 red and 4 blue balls. Three are drawn. Find the probability that all three are different colours.", answer: "\\(0\\)" },
      ],
      pyqExampleId: "af1cd9f6-bb61-46fd-808e-44849438dae3",
      traps: [
        {
          title: "One of each is a product, not a sum",
          body: "One red, one blue and one green from 2, 3 and 4 balls is \\(2 \\times 3 \\times 4 = 24\\) choices, not \\(2 + 3 + 4\\).",
        },
        {
          title: "More colours than balls",
          body: "Three balls from four colours: first choose which three colours, then one ball of each, and add over all four choices of colours.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-select-at-least",
      name: "At least: add the exact cases, or take away the rest",
      intuition:
        "'At least 2 red' among 3 chosen is exactly 2 red or exactly 3 red. Count each case with the mix rule and add. When the cases are many, count what is not wanted and subtract.",
      definition:
        "- At least k of a colour: add exactly k, k + 1, and so on up to the most possible.\n" +
        "- At least one of a colour with a balls: \\(1 - \\dfrac{^{n - a}C_r}{^nC_r}\\).\n" +
        "- Pick whichever list of cases is shorter.",
      formula: {
        label: "At least one of a colour",
        latex: "P(\\text{at least one}) = 1 - \\dfrac{{}^{n - a}C_r}{{}^nC_r}",
      },
      authoredExample: {
        prompt: "A bag has 5 red and 4 blue balls. Three are drawn together. Find the probability that at least 2 are red.",
        steps: [
          "Exactly 2 red: \\(^5C_2 \\times {}^4C_1 = 10 \\times 4 = 40\\). Exactly 3 red: \\(^5C_3 = 10\\).",
          "Favourable: 50. Total: \\(^9C_3 = 84\\).",
          "\\(P = \\tfrac{50}{84} = \\tfrac{25}{42}\\).",
        ],
        answer: "\\(\\tfrac{25}{42}\\).",
      },
      selfCheckExample: {
        prompt: "From 4 red and 6 green balls, 3 are drawn together. Find the probability that at least one is red.",
        steps: ["No red: \\(^6C_3 = 20\\) of \\(^{10}C_3 = 120\\), which is \\(\\tfrac16\\).", "\\(1 - \\tfrac16 = \\tfrac56\\)."],
        answer: "\\(\\tfrac{5}{6}\\).",
      },
      practiceSet: [
        { prompt: "From 3 red and 5 white balls, 2 are drawn. Find the probability that at least one is red.", answer: "\\(\\tfrac{9}{14}\\)" },
        { prompt: "From 6 blue and 2 yellow balls, 3 are drawn. Find the probability that at least 2 are blue.", answer: "\\(\\tfrac{25}{28}\\)", method: "\\(\\tfrac{30 + 20}{56}\\)." },
        { prompt: "From 4 black and 4 white balls, 4 are drawn. Find the probability that at least 3 are black.", answer: "\\(\\tfrac{17}{70}\\)" },
      ],
      pyqExampleId: "a9e8ee9f-ff18-463a-9590-2afb413444d4",
      traps: [
        {
          title: "At least includes the top case",
          body: "At least 2 red among 3 drawn includes 3 red. Counting only exactly 2 red leaves that case out.",
        },
        {
          title: "The opposite of at least one",
          body: "The complement of 'at least one red' is 'no red', not 'exactly one red'.",
        },
      ],
    },
  ],
};
