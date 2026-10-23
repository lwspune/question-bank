import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RA_PROPORTIONALS_NOTE: SubtopicNote = {
  subtopicName: "Fourth, Third and Mean Proportionals",
  title: "Fourth, Third and Mean Proportionals",
  oneLineDefinition:
    "Four numbers are in proportion when the first is to the second as the third is to the fourth, and every proportional question is solved by one rule: the product of the outer terms equals the product of the inner terms.",
  whyItMatters:
    "Twenty-seven questions in the bank and twenty-five are EASY: seven on the fourth proportional, six on the third and fourteen on the mean proportional. Each is one line once you know which term is missing, so these are the fastest marks in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrapr-fourth",
      name: "Proportion and the fourth proportional",
      intuition:
        "Two ratios are equal when one fraction is a scaled copy of the other. Cross-multiplying turns that into one equation, so if any one of the four numbers is missing, it can be found from the other three.",
      definition:
        "- **a, b, c, d are in proportion**, written a : b :: c : d, when \\(\\frac{a}{b} = \\frac{c}{d}\\). The outer terms a and d are the **extremes**; b and c are the **means**.\n" +
        "- **The test and the solver:** product of extremes = product of means, \\(ad = bc\\).\n" +
        "- **Fourth proportional** to a, b and c, taken in that order: \\(d = \\frac{bc}{a}\\).\n" +
        "- Fast route: find the multiplier from the first pair and use it on the second. For 15, 24 and 35: \\(\\frac{24}{15} = 1.6\\), so \\(d = 35 \\times 1.6 = 56\\).\n" +
        "- **Adding or subtracting x to make four numbers proportional:** solve \\((a \\pm x)(d \\pm x) = (b \\pm x)(c \\pm x)\\). The \\(x^2\\) terms cancel, so it is a one-step equation. Testing the options is just as quick.",
      formula: {
        label: "Proportion and fourth proportional",
        latex: "a : b :: c : d \\Leftrightarrow ad = bc \\qquad d = \\frac{bc}{a}",
        symbols: [
          { symbol: "a, d", meaning: "the extremes (outer terms)" },
          { symbol: "b, c", meaning: "the means (inner terms)" },
        ],
      },
      authoredExample: {
        prompt: "Find the fourth proportional to 15, 24 and 35.",
        steps: [
          "\\(15 : 24 = 35 : d\\), so \\(15d = 24 \\times 35 = 840\\) and \\(d = 56\\).",
          "Fast route: the multiplier is \\(\\frac{24}{15} = 1.6\\), and \\(35 \\times 1.6 = 56\\).",
          "Check: \\(\\frac{15}{24} = \\frac{5}{8}\\) and \\(\\frac{35}{56} = \\frac{5}{8}\\).",
        ],
        answer: "56",
      },
      selfCheckExample: {
        prompt: "What number must be added to each of 5, 9, 7 and 12 so that the results are in proportion?",
        steps: [
          "\\((5 + x)(12 + x) = (9 + x)(7 + x)\\), so \\(60 + 17x = 63 + 16x\\).",
          "\\(x = 3\\). Check: 8, 12, 10, 15 gives \\(\\frac{8}{12} = \\frac{2}{3} = \\frac{10}{15}\\).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Find the fourth proportional to 6, 10 and 21.", answer: "35" },
        {
          prompt: "Are 4, 14, 6 and 21 in proportion?",
          answer: "Yes",
          method: "\\(4 \\times 21 = 84 = 14 \\times 6\\).",
        },
        { prompt: "If 12 : x :: 18 : 27, find x.", answer: "18" },
      ],
      pyqExampleId: "c524db42-237b-4a7a-adec-13175875a9bd",
      traps: [
        {
          title: "Taking the numbers in the wrong order",
          body:
            "The fourth proportional to 4, 10 and 6 comes from 4 : 10 = 6 : d, which gives 15. Starting from 10 : 4 = 6 : d gives 2.4, a different number. Keep the order printed in the stem.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrapr-third",
      name: "Third proportional",
      intuition:
        "Three numbers are in continued proportion when each is the same multiple of the one before, like 4, 6, 9 (each is 1.5 times the last). The third proportional is simply the next number in that chain.",
      definition:
        "- a, b, c are in **continued proportion** when a : b = b : c, so \\(b^2 = ac\\).\n" +
        "- The **third proportional** to a and b is \\(c = \\frac{b^2}{a}\\).\n" +
        "- Fast route: find the step \\(r = \\frac{b}{a}\\), then \\(c = b \\times r\\). For 16 and 24 the step is 1.5, so the third proportional is 36.\n" +
        "- With algebra, square the second term and divide by the first, cancelling powers as you go.",
      formula: {
        label: "Third proportional",
        latex: "a : b = b : c \\Leftrightarrow b^2 = ac \\qquad c = \\frac{b^2}{a}",
      },
      authoredExample: {
        prompt: "Find the third proportional to 16 and 24.",
        steps: [
          "\\(c = \\frac{24^2}{16} = \\frac{576}{16} = 36\\).",
          "Fast route: the step is \\(\\frac{24}{16} = 1.5\\), and \\(24 \\times 1.5 = 36\\).",
          "Check: \\(16 : 24 = 2 : 3\\) and \\(24 : 36 = 2 : 3\\).",
        ],
        answer: "36",
      },
      selfCheckExample: {
        prompt: "Find the third proportional to \\(2a^2\\) and \\(6ab\\).",
        steps: [
          "\\(c = \\frac{(6ab)^2}{2a^2} = \\frac{36a^2b^2}{2a^2} = 18b^2\\).",
          "Check: the step is \\(\\frac{6ab}{2a^2} = \\frac{3b}{a}\\), and \\(6ab \\times \\frac{3b}{a} = 18b^2\\).",
        ],
        answer: "\\(18b^2\\)",
      },
      practiceSet: [
        { prompt: "Find the third proportional to 9 and 12.", answer: "16" },
        { prompt: "Find the third proportional to 0.5 and 2.", answer: "8" },
        { prompt: "The third proportional to 4 and x is 25, and x is positive. Find x.", answer: "10" },
      ],
      pyqExampleId: "3226f7b0-0562-4ab3-b019-0b98c08a6cbe",
      traps: [
        {
          title: "Squaring the wrong term",
          body:
            "The third proportional to a and b is \\(\\frac{b^2}{a}\\), the SECOND term squared. For 9 and 12 it is 16; squaring the first term gives \\(\\frac{81}{12} = 6.75\\), which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrapr-mean",
      name: "Mean proportional",
      intuition:
        "The mean proportional is the number that sits in the middle of a continued proportion, a : m = m : b. It is the middle of a multiplying chain, not of an adding one, so it is a square root of a product, not half of a sum.",
      definition:
        "- The **mean proportional** of a and b is \\(m = \\sqrt{ab}\\), because a : m = m : b gives \\(m^2 = ab\\).\n" +
        "- **Decimals:** split each number into a perfect square: \\(\\sqrt{0.49 \\times 2.25} = 0.7 \\times 1.5 = 1.05\\).\n" +
        "- **Algebra:** multiply, then halve every power: \\(\\sqrt{4x^2 \\cdot 9y^4} = 6xy^2\\).\n" +
        "- **Missing number:** if m is the mean proportional of a and an unknown b, then \\(b = \\frac{m^2}{a}\\).\n" +
        "- **Which pair has mean proportional m?** The pair whose PRODUCT is \\(m^2\\). Multiply each option; do not add them.",
      formula: {
        label: "Mean proportional",
        latex: "a : m = m : b \\Leftrightarrow m = \\sqrt{ab} \\qquad b = \\frac{m^2}{a}",
      },
      authoredExample: {
        prompt: "Find the mean proportional of 0.49 and 2.25.",
        steps: [
          "\\(m = \\sqrt{0.49 \\times 2.25} = \\sqrt{0.49} \\times \\sqrt{2.25} = 0.7 \\times 1.5 = 1.05\\).",
          "Check: \\(\\frac{0.49}{1.05} = \\frac{7}{15}\\) and \\(\\frac{1.05}{2.25} = \\frac{7}{15}\\).",
        ],
        answer: "1.05",
      },
      selfCheckExample: {
        prompt: "The mean proportional of 27 and x is 18. Find x.",
        steps: [
          "\\(18^2 = 27x\\), so \\(x = \\frac{324}{27} = 12\\).",
          "Check: \\(27 : 18 = 3 : 2\\) and \\(18 : 12 = 3 : 2\\).",
        ],
        answer: "12",
      },
      practiceSet: [
        { prompt: "Find the mean proportional of 4 and 49.", answer: "14" },
        { prompt: "Find the mean proportional of \\(9x^2\\) and \\(4y^2\\), where x and y are positive.", answer: "\\(6xy\\)" },
        {
          prompt: "The mean proportional of p and q is 15. Can p and q be 5 and 40, or 9 and 25?",
          answer: "9 and 25",
          method: "The product must be \\(15^2 = 225\\); \\(5 \\times 40 = 200\\).",
        },
        { prompt: "Find the mean proportional of 8 and 18.", answer: "12" },
      ],
      pyqExampleId: "14820ca6-d061-4029-a199-a6053a4c4bf2",
      traps: [
        {
          title: "Halving the sum",
          body:
            "The mean proportional of 4 and 49 is \\(\\sqrt{196} = 14\\), not \\(\\frac{4 + 49}{2} = 26.5\\). That is the ordinary average, which belongs to adding chains, not to proportion.",
        },
        {
          title: "Misplacing the decimal in a square root",
          body:
            "\\(\\sqrt{0.09} = 0.3\\), because \\(0.3 \\times 0.3 = 0.09\\). Writing 0.03 is a common slip; count decimal places: the root has half as many as the square.",
        },
      ],
    },
  ],
};
