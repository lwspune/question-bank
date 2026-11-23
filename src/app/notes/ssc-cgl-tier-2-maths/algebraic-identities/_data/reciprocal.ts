import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_AI_RECIPROCAL_NOTE: SubtopicNote = {
  subtopicName: "Reciprocal Sums x ± 1/x",
  title: "Reciprocal Sums x ± 1/x",
  oneLineDefinition:
    "Knowing x + 1/x fixes every higher power of x plus its reciprocal: square to climb two steps, cube to climb three, multiply two rungs to reach the rest, and read x + 1/x straight off a quadratic.",
  whyItMatters:
    "9 questions in the Tier II bank, 4 EASY and 5 MODERATE. The MODERATE ones ask for the fifth or seventh power, which is two multiplications once the lower rungs are known.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2aire-ladder",
      name: "Climbing from x + 1/x",
      visualizationSlug: "ssc-t2-reciprocal-ladder",
      intuition:
        "Knowing \\(x + \\frac{1}{x}\\) fixes \\(x^2 + \\frac{1}{x^2}\\), \\(x^3 + \\frac{1}{x^3}\\) and every higher power. Square to go up two, cube to go up three, and multiply two rungs together to reach any other.",
      definition:
        "- If \\(x + \\frac{1}{x} = k\\): \\(x^2 + \\frac{1}{x^2} = k^2 - 2\\) and \\(x^3 + \\frac{1}{x^3} = k^3 - 3k\\).\n" +
        "- If \\(x - \\frac{1}{x} = m\\): \\(x^2 + \\frac{1}{x^2} = m^2 + 2\\) and \\(x^3 - \\frac{1}{x^3} = m^3 + 3m\\).\n" +
        "- Multiplying two rungs: \\(\\left(x^a + x^{-a}\\right)\\left(x^b + x^{-b}\\right) = \\left(x^{a+b} + x^{-(a+b)}\\right) + \\left(x^{a-b} + x^{-(a-b)}\\right)\\).\n" +
        "- \\(x^4 + \\frac{1}{x^4} = \\left(x^2 + \\frac{1}{x^2}\\right)^2 - 2\\); you can also come back down by square roots, taking the positive root when \\(x > 0\\).",
      formula: {
        label: "The first rungs",
        latex: "x + \\frac{1}{x} = k \\;\\Rightarrow\\; x^2 + \\frac{1}{x^2} = k^2 - 2, \\quad x^3 + \\frac{1}{x^3} = k^3 - 3k",
      },
      authoredExample: {
        prompt: "If \\(x + \\frac{1}{x} = 5\\), find \\(x^2 + \\frac{1}{x^2}\\), \\(x^3 + \\frac{1}{x^3}\\) and \\(x^5 + \\frac{1}{x^5}\\).",
        steps: [
          "\\(x^2 + \\frac{1}{x^2} = 25 - 2 = 23\\); \\(x^3 + \\frac{1}{x^3} = 125 - 15 = 110\\).",
          "Multiply rungs 2 and 3: \\(23 \\times 110 = \\left(x^5 + \\frac{1}{x^5}\\right) + \\left(x + \\frac{1}{x}\\right)\\).",
          "So \\(x^5 + \\frac{1}{x^5} = 2530 - 5 = 2525\\).",
        ],
        answer: "23, 110 and 2525",
      },
      selfCheckExample: {
        prompt: "If \\(x - \\frac{1}{x} = 3\\), find \\(x^2 + \\frac{1}{x^2}\\) and \\(x^3 - \\frac{1}{x^3}\\).",
        steps: ["\\(x^2 + \\frac{1}{x^2} = 9 + 2 = 11\\).", "\\(x^3 - \\frac{1}{x^3} = 27 + 9 = 36\\)."],
        answer: "11 and 36",
      },
      practiceSet: [
        { prompt: "If \\(x + \\frac{1}{x} = 3\\), find \\(x^4 + \\frac{1}{x^4}\\).", answer: "47" },
        { prompt: "If \\(x + \\frac{1}{x} = \\sqrt{5}\\), find \\(x^3 + \\frac{1}{x^3}\\).", answer: "\\(2\\sqrt{5}\\)" },
        { prompt: "If \\(x^2 + \\frac{1}{x^2} = 18\\) and \\(x > 1\\), find \\(x - \\frac{1}{x}\\).", answer: "4" },
      ],
      pyqExampleId: "7a9eda81-6b4f-46ec-9ebd-a9469e52282a",
      traps: [
        {
          title: "Squaring without the middle term",
          body: "\\(\\left(x + \\frac{1}{x}\\right)^2 = x^2 + 2 + \\frac{1}{x^2}\\). Forgetting the 2 puts every later rung out by a growing amount.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2aire-equation",
      name: "From a quadratic to x + 1/x",
      intuition:
        "A quadratic like \\(x^2 - 5x + 1 = 0\\) hides \\(x + \\frac{1}{x}\\): divide every term by x and it reads \\(x + \\frac{1}{x} = 5\\). From there the ladder does the rest.",
      definition:
        "- \\(ax^2 + bx + a = 0\\) (equal outer coefficients): divide by \\(ax\\) to get \\(x + \\frac{1}{x} = -\\frac{b}{a}\\).\n" +
        "- If the outer coefficients differ, as in \\(3x^2 - 5x + 1 = 0\\), divide by \\(3x\\): \\(x + \\frac{1}{3x} = \\frac{5}{3}\\).\n" +
        "- For a fraction such as \\(\\frac{x^4 + 1/x^2}{x^2 + 5x + 1}\\), divide top and bottom by x first.\n" +
        "- \\(\\left(x - \\frac{k}{x}\\right)^2 = \\left(x + \\frac{k}{x}\\right)^2 - 4k\\).",
      formula: {
        label: "Reading x + 1/x from a quadratic",
        latex: "x^2 - kx + 1 = 0 \\;\\Rightarrow\\; x + \\frac{1}{x} = k",
      },
      authoredExample: {
        prompt: "If \\(x^2 - 6x + 1 = 0\\), find \\(x^2 + \\frac{1}{x^2}\\).",
        steps: ["Divide by x: \\(x + \\frac{1}{x} = 6\\).", "\\(x^2 + \\frac{1}{x^2} = 36 - 2 = 34\\)."],
        answer: "34",
      },
      selfCheckExample: {
        prompt: "If \\(2x^2 - 7x + 2 = 0\\), find \\(x^3 + \\frac{1}{x^3}\\).",
        steps: ["Divide by 2x: \\(x + \\frac{1}{x} = \\frac{7}{2}\\).", "\\(x^3 + \\frac{1}{x^3} = \\frac{343}{8} - \\frac{21}{2} = \\frac{259}{8}\\)."],
        answer: "\\(\\frac{259}{8}\\)",
      },
      practiceSet: [
        { prompt: "If \\(x^2 - 4x + 1 = 0\\), find \\(x + \\frac{1}{x}\\).", answer: "4" },
        { prompt: "If \\(5x^2 - 8x + 5 = 0\\), find \\(x^2 + \\frac{1}{x^2}\\).", answer: "\\(\\frac{14}{25}\\)" },
        { prompt: "If \\(x^2 + 3x + 1 = 0\\), find \\(x^3 + \\frac{1}{x^3}\\).", answer: "\\(-18\\)" },
      ],
      pyqExampleId: "5c1dfb4d-857b-4883-ad50-3a852003c76a",
      traps: [
        {
          title: "Losing the sign",
          body: "\\(x^2 + 3x + 1 = 0\\) gives \\(x + \\frac{1}{x} = -3\\), not 3. The middle term moves across with its sign changed.",
        },
      ],
    },
  ],
};
