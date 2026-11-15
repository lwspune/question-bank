import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_SI_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Fractions and Decimals",
  title: "Fractions and Decimals",
  oneLineDefinition:
    "A recurring decimal is a fraction over 9s and 0s, fractions compare by cross-multiplying, sums of a pattern often telescope, and a continued fraction is worked from the bottom up.",
  whyItMatters:
    "10 questions in the Tier II bank, 3 EASY and 7 MODERATE: the hardest page of the chapter for its size. Turning every decimal into a fraction first is what makes the MODERATE ones short.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2sifr-recurring",
      name: "Recurring decimals as fractions",
      intuition:
        "A repeating decimal is a fraction in disguise. Put the repeating block over as many 9s as it has digits; each digit that comes before the repeat, and does not repeat, adds a 0 underneath.",
      definition:
        "- \\(0.\\overline{ab} = \\frac{ab}{99}\\) and \\(0.\\overline{7} = \\frac{7}{9}\\).\n" +
        "- \\(0.a\\overline{bc} = \\frac{abc - a}{990}\\): all the digits minus the ones that do not repeat, over 9s then 0s.\n" +
        "- \\(0.\\overline{9} = 1\\), so \\(33.5\\overline{9} = 33.6\\).\n" +
        "- Change every term to a fraction first, then add, subtract or multiply.",
      formula: {
        label: "A decimal with a non-repeating part",
        latex: "0.a\\overline{bc} = \\frac{abc - a}{990}",
      },
      authoredExample: {
        prompt: "Write \\(0.3\\overline{18}\\) as a fraction in lowest terms.",
        steps: ["\\(\\frac{318 - 3}{990} = \\frac{315}{990}\\).", "Divide top and bottom by 45: \\(\\frac{7}{22}\\)."],
        answer: "\\(\\frac{7}{22}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(0.\\overline{6} + 0.1\\overline{6}\\) as a fraction.",
        steps: ["\\(0.\\overline{6} = \\frac{2}{3}\\) and \\(0.1\\overline{6} = \\frac{16 - 1}{90} = \\frac{1}{6}\\).", "Sum \\(= \\frac{5}{6}\\)."],
        answer: "\\(\\frac{5}{6}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(0.\\overline{45}\\) as a fraction.", answer: "\\(\\frac{5}{11}\\)" },
        { prompt: "Write \\(1.2\\overline{3}\\) as a fraction.", answer: "\\(\\frac{37}{30}\\)" },
        { prompt: "Find \\(0.\\overline{3} \\times 0.\\overline{6}\\).", answer: "\\(\\frac{2}{9}\\)" },
      ],
      pyqExampleId: "ca4aacbd-afc6-4bd4-b904-c4f30a3bfa63",
      traps: [
        {
          title: "Putting a non-repeating digit over 9",
          body: "\\(0.1\\overline{6}\\) is \\(\\frac{16 - 1}{90} = \\frac{1}{6}\\), not \\(\\frac{16}{99}\\). Only the repeating digits get 9s; the others get 0s.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2sifr-compare",
      name: "Comparing and adding fractions",
      intuition:
        "To compare two fractions, cross-multiply, or compare each with a landmark such as one half. Long sums of fractions often follow a pattern that makes them telescope, so that nearly every term cancels.",
      definition:
        "- \\(\\frac{a}{b} > \\frac{c}{d}\\) exactly when \\(ad > bc\\), for positive b and d.\n" +
        "- A landmark such as \\(\\frac{1}{2}\\) settles many comparisons at a glance.\n" +
        "- \\(\\frac{1}{n(n + k)} = \\frac{1}{k}\\left(\\frac{1}{n} - \\frac{1}{n + k}\\right)\\), so sums of such terms telescope.\n" +
        "- In a word problem, name each fraction and turn each sentence into one equation.",
      formula: {
        label: "Splitting a product fraction",
        latex: "\\frac{1}{n(n + k)} = \\frac{1}{k}\\left(\\frac{1}{n} - \\frac{1}{n + k}\\right)",
      },
      authoredExample: {
        prompt: "Find \\(\\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\frac{1}{4 \\times 5} + \\frac{1}{5 \\times 6}\\).",
        steps: ["Each term is \\(\\frac{1}{n} - \\frac{1}{n + 1}\\), so the middle terms cancel.", "What is left is \\(\\frac{1}{2} - \\frac{1}{6} = \\frac{1}{3}\\)."],
        answer: "\\(\\frac{1}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Which is larger, \\(\\frac{7}{9}\\) or \\(\\frac{11}{14}\\)?",
        steps: ["Cross-multiply: \\(7 \\times 14 = 98\\) and \\(11 \\times 9 = 99\\).", "99 is larger, so \\(\\frac{11}{14}\\) is larger."],
        answer: "\\(\\frac{11}{14}\\)",
      },
      practiceSet: [
        { prompt: "Which is the smallest: \\(\\frac{3}{7}\\), \\(\\frac{4}{9}\\), \\(\\frac{5}{11}\\)?", answer: "\\(\\frac{3}{7}\\)" },
        { prompt: "Find \\(\\frac{1}{1 \\times 3} + \\frac{1}{3 \\times 5} + \\frac{1}{5 \\times 7}\\).", answer: "\\(\\frac{3}{7}\\)" },
        { prompt: "Two fractions add up to \\(\\frac{7}{12}\\), and one of them is \\(\\frac{1}{4}\\). Find the other.", answer: "\\(\\frac{1}{3}\\)" },
      ],
      pyqExampleId: "a8d4051d-1932-464e-a864-c32fc1719d13",
      traps: [
        {
          title: "Comparing the numerators alone",
          body: "\\(\\frac{3}{5}\\) is larger than \\(\\frac{4}{9}\\) even though 3 is less than 4: cross-multiplying gives 27 against 20.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2sifr-continued",
      name: "Continued fractions",
      intuition:
        "A continued fraction is a fraction inside a fraction inside a fraction. Work it from the bottom up to find its value; to find the letters in one, keep splitting off the whole number and turning the rest upside down.",
      definition:
        "- To simplify, start at the deepest level and work upwards, one fraction at a time.\n" +
        "- To write \\(\\frac{p}{q}\\) as \\(\\frac{1}{a + \\frac{1}{b + \\cdots}}\\): turn it over to \\(\\frac{q}{p}\\), take the whole number as a, turn the remainder over, and repeat.\n" +
        "- Each turn makes a fraction less than 1 into one greater than 1.",
      formula: {
        label: "One step of the split",
        latex: "\\frac{p}{q} = \\frac{1}{a + \\frac{r}{p}} \\text{ when } q = ap + r",
      },
      authoredExample: {
        prompt: "Simplify \\(1 + \\cfrac{1}{1 + \\cfrac{1}{1 + \\frac{1}{2}}}\\).",
        steps: [
          "Deepest level: \\(1 + \\frac{1}{2} = \\frac{3}{2}\\), and \\(\\frac{1}{3/2} = \\frac{2}{3}\\).",
          "Next: \\(1 + \\frac{2}{3} = \\frac{5}{3}\\), and \\(\\frac{1}{5/3} = \\frac{3}{5}\\).",
          "Top: \\(1 + \\frac{3}{5} = \\frac{8}{5}\\).",
        ],
        answer: "\\(\\frac{8}{5}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\frac{13}{30} = \\cfrac{1}{a + \\cfrac{1}{b + \\frac{1}{c}}}\\) with whole numbers a, b, c, find \\(a + b + c\\).",
        steps: ["\\(\\frac{30}{13} = 2 + \\frac{4}{13}\\), so \\(a = 2\\).", "\\(\\frac{13}{4} = 3 + \\frac{1}{4}\\), so \\(b = 3\\) and \\(c = 4\\). Sum 9."],
        answer: "9",
      },
      practiceSet: [
        { prompt: "Simplify \\(2 + \\cfrac{1}{2 + \\frac{1}{2}}\\).", answer: "\\(\\frac{12}{5}\\)" },
        { prompt: "Simplify \\(\\cfrac{1}{1 + \\frac{1}{3}}\\).", answer: "\\(\\frac{3}{4}\\)" },
        { prompt: "If \\(\\frac{7}{10} = \\cfrac{1}{1 + \\cfrac{1}{a + \\frac{1}{b}}}\\) with whole numbers, find a and b.", answer: "\\(a = 2, b = 3\\)" },
      ],
      pyqExampleId: "d17863b7-c0fb-4f45-80c5-d65ac375d478",
      traps: [
        {
          title: "Starting from the top",
          body: "A continued fraction must be worked from its deepest level upwards. Simplifying the top fraction first mixes levels and gives a wrong value.",
        },
      ],
    },
  ],
};
