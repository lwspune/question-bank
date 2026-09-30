import type { SubtopicNote } from "@/app/notes/_types";

export const CONDITIONS_PROB_NOTE: SubtopicNote = {
  subtopicName: "Random Coefficients and Inequalities",
  title: "Random Coefficients and Inequalities",
  oneLineDefinition:
    "Probabilities where the random outcomes are the coefficients of an equation or the terms of an inequality: count the choices that satisfy the condition.",
  whyItMatters:
    "Eleven PYQs, nine of them multiple choice. Seven roll or pick the coefficients of a quadratic and ask for real, equal or no real roots, or for positivity for all x; four ask when another inequality holds. The probability is a count once the condition is turned into a statement about the coefficients. Two ideas cover the page.",
  concepts: [
    // C1 — quadratic conditions
    {
      kind: "formula" as const,
      slug: "jprob-quadratic",
      name: "Quadratics with random coefficients",
      intuition:
        "Turn the condition into one on the discriminant: real roots need \\(b^2\\ge4ac\\), equal roots \\(b^2=4ac\\), distinct real roots \\(b^2>4ac\\), and \\(ax^2+bx+c>0\\) for all \\(x\\) needs \\(a>0\\) and \\(b^2<4ac\\). Then fix \\(b\\) and count the pairs \\((a,c)\\) with the required product.",
      definition:
        "- Real roots: \\(b^2\\ge4ac\\); equal: \\(b^2=4ac\\); none: \\(b^2<4ac\\).\n" +
        "- Positive for all \\(x\\): \\(a>0\\) and \\(b^2<4ac\\).\n" +
        "- Fix \\(b\\), count \\((a,c)\\) with \\(ac\\) on the right side of \\(\\frac{b^2}{4}\\).",
      formula: {
        label: "Discriminant conditions",
        latex: "ax^2+bx+c:\\quad b^2-4ac\\ \\gtreqless\\ 0",
      },
      authoredExample: {
        prompt: "\\(b\\) and \\(c\\) are each chosen from 1 to 4. Find the probability that \\(x^2+bx+c=0\\) has real roots.",
        steps: [
          "\\(b^2\\ge4c\\): \\(b=2\\): \\(c=1\\); \\(b=3\\): \\(c=1,2\\); \\(b=4\\): \\(c=1,2,3,4\\). Total 7.",
        ],
        answer: "\\(\\frac{7}{16}\\).",
      },
      selfCheckExample: {
        prompt: "\\(a,b,c\\) are chosen from 1 to 4. How many choices give equal roots?",
        steps: [
          "\\(b^2=4ac\\): \\(b=2\\): \\(ac=1\\); \\(b=4\\): \\(ac=4\\): \\((1,4),(2,2),(4,1)\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "Equal roots of \\(ax^2+bx+c\\) need?", answer: "\\(b^2=4ac\\)" },
        { prompt: "\\(x^2+2x+c>0\\) for all \\(x\\) needs?", answer: "\\(c>1\\)" },
        { prompt: "Pairs \\((a,c)\\) from 1–6 with \\(ac\\le2\\)?", answer: "\\(3\\)" },
        { prompt: "Is \\(b=1\\) ever enough for real roots with \\(a,c\\ge1\\)?", answer: "No" },
      ],
      pyqExampleId: "c78ff8fc-bf6d-445a-b3ab-7fa46d4c4d80", // 2022 — x^2 + alpha x + beta > 0 for all x, two dice
      traps: [
        {
          title: "Strict or not",
          body: "'Real roots' allows \\(b^2=4ac\\); 'two distinct real roots' and 'one root bigger than the other' do not. Check whether the equality cases belong in the count.",
        },
      ],
    },

    // C2 — other inequalities
    {
      kind: "formula" as const,
      slug: "jprob-inequality",
      name: "Other conditions on random outcomes",
      intuition:
        "Solve the inequality in the random quantity first, then count. For a product \\(x(n-x)\\ge k\\), solve the quadratic to get a range of \\(x\\). For a sum of dice \\(N\\), find the values of \\(N\\) that satisfy the condition, then add the probabilities of those sums.",
      definition:
        "- Solve for the random variable's range, then count the outcomes in it.\n" +
        "- \\(x(n-x)\\) is largest at \\(x=\\frac n2\\).\n" +
        "- Sum of two dice: \\(P(N=k)=\\frac{6-|k-7|}{36}\\).",
      formula: {
        label: "Sum of two dice",
        latex: "P(N=k)=\\frac{6-|k-7|}{36},\\quad k=2,\\dots,12",
      },
      authoredExample: {
        prompt: "Two dice are thrown. Find the probability that the sum \\(N\\) satisfies \\(N^2>50\\).",
        steps: [
          "\\(N\\ge8\\): \\(\\frac{5+4+3+2+1}{36}\\).",
        ],
        answer: "\\(\\frac{15}{36}=\\frac{5}{12}\\).",
      },
      selfCheckExample: {
        prompt: "Two positive integers add to 10. Find the probability that their product is at least 21 (ordered pairs).",
        steps: [
          "\\(x(10-x)\\ge21\\Rightarrow3\\le x\\le7\\): 5 of the 9 ordered pairs.",
        ],
        answer: "\\(\\frac59\\).",
      },
      practiceSet: [
        { prompt: "\\(P(N=7)\\) for two dice?", answer: "\\(\\frac16\\)" },
        { prompt: "\\(P(N\\le3)\\)?", answer: "\\(\\frac{1}{12}\\)" },
        { prompt: "Largest product of two positive integers with sum 20?", answer: "\\(100\\)" },
        { prompt: "Integers with \\(x(8-x)\\ge12\\)?", answer: "\\(2\\le x\\le6\\)" },
      ],
      pyqExampleId: "4aaed28a-1690-496a-97e7-7cb063b5877b", // 2023 — two dice, probability that 2^N < N!
      traps: [
        {
          title: "Integer endpoints",
          body: "After solving the inequality, check whether the endpoints are integers and whether they are included; a strict inequality drops them.",
        },
      ],
    },
  ],
};
