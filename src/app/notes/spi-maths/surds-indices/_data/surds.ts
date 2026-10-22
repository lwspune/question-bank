import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SI_SURDS_NOTE: SubtopicNote = {
  subtopicName: "Surds and Rationalising",
  title: "Surds and Rationalising",
  oneLineDefinition:
    "A surd is a root that cannot be simplified to a rational number; you simplify it, compare it, and clear it from a denominator with its conjugate.",
  whyItMatters:
    "Eight questions in the bank, two EASY and six MODERATE, and two are from the 2022 paper. They ask you to take square roots of decimals, compare roots, clear a root from a denominator, and find the square root of a number like 7 plus a root.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisisu-roots",
      name: "Simplifying and comparing roots",
      intuition:
        "Pull perfect squares out from under a root to make it simpler. To compare roots of different kinds, such as a square root and a cube root, raise both to the same power until the roots disappear.",
      definition:
        "- \\(\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}\\), so \\(\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}\\).\n" +
        "- Only like surds add: \\(2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}\\), but \\(\\sqrt{2} + \\sqrt{3}\\) stays as it is.\n" +
        "- The square root of a decimal has **half as many** decimal places: \\(\\sqrt{2.25} = 1.5\\), \\(\\sqrt{0.0004} = 0.02\\).\n" +
        "- To compare \\(\\sqrt[m]{a}\\) and \\(\\sqrt[n]{b}\\), raise both to the power LCM\\((m, n)\\) and compare the whole numbers you get.\n" +
        "- A quick estimate also works: \\(\\sqrt[3]{40}\\) lies between 3 and 4, since \\(3^3 = 27\\) and \\(4^3 = 64\\).",
      formula: {
        label: "Roots as powers",
        latex: "\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b} \\qquad \\sqrt[n]{a} = a^{\\frac{1}{n}}",
      },
      authoredExample: {
        prompt: "Which is greater, \\(\\sqrt{2}\\) or \\(\\sqrt[3]{3}\\)?",
        steps: [
          "The roots are of order 2 and 3, so raise both to the power 6.",
          "\\((\\sqrt{2})^6 = 2^3 = 8\\) and \\((\\sqrt[3]{3})^6 = 3^2 = 9\\).",
          "9 is greater than 8, so \\(\\sqrt[3]{3}\\) is greater.",
        ],
        answer: "\\(\\sqrt[3]{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{\\sqrt{1.44} + \\sqrt{0.81}}{\\sqrt{0.0049}}\\).",
        steps: [
          "\\(\\sqrt{1.44} = 1.2\\), \\(\\sqrt{0.81} = 0.9\\), \\(\\sqrt{0.0049} = 0.07\\).",
          "\\(\\frac{1.2 + 0.9}{0.07} = \\frac{2.1}{0.07} = 30\\).",
        ],
        answer: "30",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sqrt{75}\\).", answer: "\\(5\\sqrt{3}\\)" },
        { prompt: "Find \\(\\sqrt{0.0121}\\).", answer: "0.11" },
        { prompt: "Simplify \\(\\sqrt{12} + \\sqrt{27}\\).", answer: "\\(2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}\\)" },
        { prompt: "Which is greater, \\(\\sqrt[3]{30}\\) or 3?", answer: "\\(\\sqrt[3]{30}\\), since \\(3^3 = 27 < 30\\)" },
      ],
      pyqExampleId: "bdb4811a-2949-4478-8efb-8ea3cea3d3af",
      traps: [
        {
          title: "Splitting a root over a sum",
          body: "\\(\\sqrt{9 + 16} = \\sqrt{25} = 5\\), not \\(3 + 4 = 7\\). A root splits over a product, never over a sum.",
        },
        {
          title: "Getting the decimal places wrong",
          body: "\\(\\sqrt{0.0049} = 0.07\\), not 0.7. The number under the root has four decimal places, so its root has two.",
        },
        {
          title: "Adding unlike surds",
          body: "\\(\\sqrt{2} + \\sqrt{3}\\) is not \\(\\sqrt{5}\\): it is about \\(1.41 + 1.73 = 3.14\\), while \\(\\sqrt{5}\\) is about 2.24.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisisu-rationalise",
      name: "Rationalising the denominator",
      intuition:
        "A root in the denominator is cleared by multiplying top and bottom by its conjugate, the same two terms with the sign between them changed. The product of the pair is a difference of squares, so the root disappears.",
      definition:
        "- The **conjugate** of \\(a + \\sqrt{b}\\) is \\(a - \\sqrt{b}\\), and \\((a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b\\).\n" +
        "- The conjugate is the simplest **rationalising factor**: it turns the surd into a rational number.\n" +
        "- Multiply the top **and** the bottom by it, so the value does not change.\n" +
        "- For \\(\\frac{1}{\\sqrt{a}}\\), multiply by \\(\\frac{\\sqrt{a}}{\\sqrt{a}}\\): \\(\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}\\).\n" +
        "- If \\(x = a + \\sqrt{b}\\) and \\(a^2 - b = 1\\), then \\(\\frac{1}{x} = a - \\sqrt{b}\\), so \\(x + \\frac{1}{x} = 2a\\). For sums of squares use \\(x^2 + y^2 = (x + y)^2 - 2xy\\).",
      formula: {
        label: "Conjugate pair",
        latex: "(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b \\qquad (\\sqrt{a} + \\sqrt{b})(\\sqrt{a} - \\sqrt{b}) = a - b",
      },
      authoredExample: {
        prompt: "Write \\(\\dfrac{\\sqrt{5} + 1}{\\sqrt{5} - 1}\\) in the form \\(a + b\\sqrt{5}\\).",
        steps: [
          "Multiply top and bottom by the conjugate \\(\\sqrt{5} + 1\\).",
          "Top: \\((\\sqrt{5} + 1)^2 = 5 + 2\\sqrt{5} + 1 = 6 + 2\\sqrt{5}\\). Bottom: \\(5 - 1 = 4\\).",
          "\\(\\frac{6 + 2\\sqrt{5}}{4} = \\frac{3}{2} + \\frac{1}{2}\\sqrt{5}\\).",
        ],
        answer: "\\(a = \\frac{3}{2}\\), \\(b = \\frac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Rationalise \\(\\dfrac{1}{\\sqrt{7} - 2}\\).",
        steps: [
          "Multiply top and bottom by \\(\\sqrt{7} + 2\\).",
          "Bottom: \\(7 - 4 = 3\\). So the value is \\(\\frac{\\sqrt{7} + 2}{3}\\).",
        ],
        answer: "\\(\\frac{\\sqrt{7} + 2}{3}\\)",
      },
      practiceSet: [
        { prompt: "What is the simplest rationalising factor of \\(\\sqrt{6} + \\sqrt{2}\\)?", answer: "\\(\\sqrt{6} - \\sqrt{2}\\) (the product is 4)" },
        { prompt: "Rationalise \\(\\dfrac{6}{\\sqrt{3}}\\).", answer: "\\(\\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}\\)" },
        { prompt: "If \\(x = 2 + \\sqrt{3}\\), find \\(\\frac{1}{x}\\).", answer: "\\(2 - \\sqrt{3}\\), since \\(4 - 3 = 1\\)" },
        { prompt: "If \\(x = 2 + \\sqrt{3}\\), find \\(x + \\frac{1}{x}\\).", answer: "4" },
      ],
      pyqExampleId: "eaf7a009-1dbd-4a8c-b7a6-ac9c9009bf02",
      traps: [
        {
          title: "Multiplying only the denominator",
          body: "Multiplying the bottom alone by the conjugate changes the value. Multiply the top by the same factor.",
        },
        {
          title: "Losing a negative denominator",
          body: "For \\(2 - \\sqrt{7}\\) the product with its conjugate is \\(4 - 7 = -3\\). Carry that minus sign into every term of the answer.",
        },
        {
          title: "Using the wrong square identity",
          body: "\\(x^2 + y^2 = (x + y)^2 - 2xy\\), but \\(x^2 + xy + y^2 = (x + y)^2 - xy\\). Expand \\((x + y)^2\\) and take away only what is extra.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisisu-nested",
      name: "Square root of a surd and endless roots",
      intuition:
        "A number like \\(5 + 2\\sqrt{6}\\) is often a perfect square in disguise: \\((\\sqrt{3} + \\sqrt{2})^2\\). Find two numbers whose sum is the whole part and whose product is what sits under the root. An endless root repeats itself, so call it \\(x\\) and the repeat gives an equation.",
      definition:
        "- To find \\(\\sqrt{a + 2\\sqrt{b}}\\), find \\(m\\) and \\(n\\) with \\(m + n = a\\) and \\(mn = b\\). Then \\(\\sqrt{a + 2\\sqrt{b}} = \\sqrt{m} + \\sqrt{n}\\).\n" +
        "- First make the root term look like \\(2\\sqrt{b}\\): \\(\\sqrt{28} = 2\\sqrt{7}\\).\n" +
        "- For \\(\\sqrt{a - 2\\sqrt{b}}\\) the answer is \\(\\sqrt{m} - \\sqrt{n}\\), with the larger of \\(m\\) and \\(n\\) first so the result is positive.\n" +
        "- For \\(x = \\sqrt{k + \\sqrt{k + \\sqrt{k + \\ldots}}}\\), the part under the first root is \\(k + x\\), so \\(x^2 = k + x\\). Keep the positive root.",
      formula: {
        label: "Square root of a surd and an endless root",
        latex: "\\sqrt{(m + n) + 2\\sqrt{mn}} = \\sqrt{m} + \\sqrt{n} \\qquad x = \\sqrt{k + x} \\Rightarrow x^2 - x - k = 0",
      },
      authoredExample: {
        prompt: "Find the positive square root of \\(5 + 2\\sqrt{6}\\).",
        steps: [
          "Look for \\(m + n = 5\\) and \\(mn = 6\\): \\(m = 3\\), \\(n = 2\\).",
          "So \\(5 + 2\\sqrt{6} = (\\sqrt{3} + \\sqrt{2})^2\\).",
          "Check: \\((\\sqrt{3} + \\sqrt{2})^2 = 3 + 2 + 2\\sqrt{6}\\).",
        ],
        answer: "\\(\\sqrt{3} + \\sqrt{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{12 + \\sqrt{12 + \\sqrt{12 + \\ldots}}}\\).",
        steps: [
          "Let the value be \\(x\\). Then \\(x = \\sqrt{12 + x}\\), so \\(x^2 - x - 12 = 0\\).",
          "\\((x - 4)(x + 3) = 0\\), so \\(x = 4\\) or \\(x = -3\\).",
          "A square root is never negative, so \\(x = 4\\).",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "Find the positive square root of \\(8 + 2\\sqrt{15}\\).", answer: "\\(\\sqrt{5} + \\sqrt{3}\\)" },
        { prompt: "Find the positive square root of \\(4 - 2\\sqrt{3}\\).", answer: "\\(\\sqrt{3} - 1\\)" },
        { prompt: "Find \\(\\sqrt{20 + \\sqrt{20 + \\sqrt{20 + \\ldots}}}\\).", answer: "5" },
        { prompt: "Find \\(\\sqrt{2 + \\sqrt{2 + \\sqrt{2 + \\ldots}}}\\).", answer: "2" },
      ],
      pyqExampleId: "9f1d1478-63bb-4e01-b371-84098387f447",
      traps: [
        {
          title: "Not making the root term 2 root b first",
          body: "In \\(11 + \\sqrt{120}\\), write \\(\\sqrt{120} = 2\\sqrt{30}\\) before looking for m and n. Then \\(m + n = 11\\), \\(mn = 30\\), giving \\(\\sqrt{6} + \\sqrt{5}\\).",
        },
        {
          title: "Keeping the negative root",
          body: "The quadratic for an endless root has one negative solution. A square root cannot be negative, so that solution is rejected.",
        },
        {
          title: "Putting the smaller number first",
          body: "\\(\\sqrt{4 - 2\\sqrt{3}}\\) is \\(\\sqrt{3} - 1\\), not \\(1 - \\sqrt{3}\\), which is negative.",
        },
      ],
    },
  ],
};
