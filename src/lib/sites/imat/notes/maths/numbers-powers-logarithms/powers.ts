import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_NPL_POWERS_NOTE: SubtopicNote = {
  subtopicName: "Powers, Roots and Surds",
  title: "Powers, Fractional Exponents and Surds",
  oneLineDefinition:
    "The laws of powers let you rewrite any product of powers over one base; a fractional exponent is a root, and a surd in a denominator is removed with its conjugate.",
  whyItMatters:
    "Powers are asked almost every year: rewriting to a common base (2019, 2020, 2023), a root of a root (2024) and rationalising a denominator (2020). The 2023 question also needed a common factor taken out of a sum of powers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-npl-index-laws",
      name: "Laws of powers and rewriting to a common base",
      intuition:
        "A power is repeated multiplication, so multiplying two powers of the same base just counts the factors together. Most IMAT power questions mix bases like 4, 8 and 16; they become easy once everything is written as a power of the same prime (here 2).",
      definition:
        "For \\(a, b \\ne 0\\) and integers \\(m, n\\):\n" +
        "- \\(a^0 = 1\\) and \\(a^{-n} = \\frac{1}{a^n}\\).\n" +
        "- Same base: multiply means **add** exponents, divide means **subtract**, power of a power means **multiply**.\n" +
        "- \\((ab)^n = a^n b^n\\), but \\((a + b)^n\\) is **not** \\(a^n + b^n\\).\n" +
        "- Common base: \\(4 = 2^2\\), \\(8 = 2^3\\), \\(16 = 2^4\\), \\(9 = 3^2\\), \\(27 = 3^3\\), \\(25 = 5^2\\).\n" +
        "- If \\(a^p = a^q\\) with \\(a > 0\\) and \\(a \\ne 1\\), then \\(p = q\\). This solves equations such as \\(9^x = 27\\).\n" +
        "- A sum of powers does not combine; take out a common factor instead: \\(9^x + 3^x = 3^x(3^x + 1)\\).",
      formula: {
        label: "Laws of powers",
        latex: "a^m a^n = a^{m+n} \\qquad \\frac{a^m}{a^n} = a^{m-n} \\qquad (a^m)^n = a^{mn}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "the base, the same in every factor" },
          { symbol: "\\(m, n\\)", meaning: "the exponents" },
        ],
      },
      authoredExample: {
        prompt: "Write \\(\\dfrac{27^n \\times 9^{2n}}{3^n}\\) as a single power of 3.",
        steps: [
          "Rewrite each base as a power of 3: \\(27^n = 3^{3n}\\) and \\(9^{2n} = (3^2)^{2n} = 3^{4n}\\).",
          "Numerator: \\(3^{3n} \\times 3^{4n} = 3^{7n}\\) (add the exponents).",
          "Divide by \\(3^n\\): \\(3^{7n - n} = 3^{6n}\\) (subtract the exponents).",
        ],
        answer: "\\(3^{6n}\\)",
      },
      selfCheckExample: {
        prompt: "Which expression is equal to \\(\\dfrac{4^{3n} \\times 8^{n}}{16^{n}}\\) for every integer \\(n\\)?",
        options: ["\\(2^{9n}\\)", "\\(2^{13n}\\)", "\\(2^{5n}\\)", "\\(2^{3n}\\)", "\\(2^{18n}\\)"],
        steps: [
          "\\(4^{3n} = 2^{6n}\\), \\(8^n = 2^{3n}\\), \\(16^n = 2^{4n}\\).",
          "\\(2^{6n + 3n - 4n} = 2^{5n}\\).",
          "Option A forgets the denominator; B adds its exponent instead of subtracting; E multiplies exponents that should be added.",
        ],
        answer: "(C) \\(2^{5n}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(5^{-2}\\).", answer: "\\(\\frac{1}{25}\\)" },
        { prompt: "Evaluate \\((2^3)^4 \\div 2^5\\).", answer: "128", method: "\\(2^{12 - 5} = 2^7\\)" },
        { prompt: "Simplify \\(\\dfrac{25^x + 5^x}{5^x + 1}\\).", answer: "\\(5^x\\)", method: "\\(25^x + 5^x = 5^x(5^x + 1)\\)" },
        { prompt: "Solve \\(9^x = 27\\).", answer: "\\(x = \\frac{3}{2}\\)", method: "\\(3^{2x} = 3^3\\)" },
      ],
      traps: [
        {
          title: "Adding equal powers does not add the exponents",
          body: "\\(2^{10} + 2^{10} = 2 \\times 2^{10} = 2^{11}\\), not \\(2^{20}\\) and not \\(4^{10}\\). Exponents add only when powers of the same base are multiplied.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-rational-exponents",
      name: "Fractional exponents and nth roots",
      intuition:
        "Since \\((a^{1/2})^2 = a^1 = a\\), the power one half must be the square root. In the same way the power \\(\\frac{1}{n}\\) is the nth root, and \\(\\frac{m}{n}\\) is the nth root raised to the power m. The laws of powers still hold, so a root of a root is just a product of fractions.",
      definition:
        "For \\(a > 0\\):\n" +
        "- \\(a^{1/n} = \\sqrt[n]{a}\\), and \\(a^{m/n} = (\\sqrt[n]{a})^m = \\sqrt[n]{a^m}\\).\n" +
        "- Take the root first: \\(32^{3/5} = (\\sqrt[5]{32})^3 = 2^3\\) is easier than \\(\\sqrt[5]{32^3}\\).\n" +
        "- A **negative** exponent means a reciprocal, not a negative number.\n" +
        "- Root of a root: \\(\\sqrt[m]{\\sqrt[n]{a}} = a^{1/(mn)}\\).\n" +
        "- An odd root of a negative number is real (\\(\\sqrt[3]{-8} = -2\\)); an even root of a negative number is not real.",
      formula: {
        label: "Fractional exponent",
        latex: "a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the root (denominator of the exponent)" },
          { symbol: "\\(m\\)", meaning: "the power (numerator of the exponent)" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate (a) \\(32^{3/5}\\), (b) \\(27^{-2/3}\\), (c) \\(\\sqrt[3]{\\sqrt{64}}\\).",
        steps: [
          "(a) \\(\\sqrt[5]{32} = 2\\), so \\(32^{3/5} = 2^3 = 8\\).",
          "(b) \\(\\sqrt[3]{27} = 3\\), so \\(27^{2/3} = 9\\) and the negative sign gives the reciprocal: \\(\\frac{1}{9}\\).",
          "(c) \\(\\sqrt[3]{\\sqrt{64}} = 64^{1/6} = 2\\), since \\(2^6 = 64\\). (Check: \\(\\sqrt{64} = 8\\) and \\(\\sqrt[3]{8} = 2\\).)",
        ],
        answer: "(a) 8, (b) \\(\\frac{1}{9}\\), (c) 2",
      },
      selfCheckExample: {
        prompt: "What is the value of \\(\\left(16^{3/4}\\right)^{-1/2}\\)?",
        options: [
          "\\(2\\sqrt{2}\\)",
          "\\(-2\\sqrt{2}\\)",
          "\\(\\frac{1}{8}\\)",
          "\\(\\frac{1}{2\\sqrt{2}}\\)",
          "\\(\\frac{1}{4}\\)",
        ],
        steps: [
          "\\(16^{3/4} = (\\sqrt[4]{16})^3 = 2^3 = 8\\).",
          "\\(8^{-1/2} = \\frac{1}{\\sqrt{8}} = \\frac{1}{2\\sqrt{2}}\\).",
          "Option A ignores the minus sign; B reads the minus as a negative number; C stops after the first step and takes the reciprocal.",
        ],
        answer: "(D) \\(\\frac{1}{2\\sqrt{2}}\\)",
      },
      practiceSet: [
        { prompt: "Evaluate \\(81^{3/4}\\).", answer: "27", method: "\\(\\sqrt[4]{81} = 3\\), then \\(3^3\\)" },
        { prompt: "Evaluate \\(8^{-1/3}\\).", answer: "\\(\\frac{1}{2}\\)" },
        { prompt: "Evaluate \\(1000^{2/3}\\).", answer: "100", method: "\\(\\sqrt[3]{1000} = 10\\), then \\(10^2\\)" },
        { prompt: "For \\(x > 0\\), simplify \\(\\sqrt[3]{x^6}\\).", answer: "\\(x^2\\)", method: "\\(x^{6/3}\\)" },
      ],
      traps: [
        {
          title: "A negative exponent does not make the number negative",
          body: "\\(4^{-1/2} = \\frac{1}{\\sqrt{4}} = \\frac{1}{2}\\), a positive number. The minus sign in an exponent means take the reciprocal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-npl-surds",
      name: "Simplifying surds and rationalising the denominator",
      intuition:
        "A surd is a root that cannot be simplified to a whole number, like \\(\\sqrt{2}\\). Pulling out the largest square factor makes surds comparable, so like surds can be collected. A surd in the denominator is cleared by using the difference of two squares: \\((b + \\sqrt{c})(b - \\sqrt{c})\\) has no root left in it.",
      definition:
        "- \\(\\sqrt{ab} = \\sqrt{a}\\sqrt{b}\\) and \\(\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}\\) for \\(a, b \\ge 0\\).\n" +
        "- **Simplify** by taking out the largest square factor: \\(\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}\\).\n" +
        "- Only **like surds** add: \\(2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}\\), but \\(\\sqrt{2} + \\sqrt{3}\\) does not simplify.\n" +
        "- **Rationalise** \\(\\frac{a}{\\sqrt{c}}\\) by multiplying top and bottom by \\(\\sqrt{c}\\).\n" +
        "- Rationalise \\(\\frac{a}{b + \\sqrt{c}}\\) by multiplying top and bottom by the **conjugate** \\(b - \\sqrt{c}\\); the denominator becomes \\(b^2 - c\\).",
      formula: {
        label: "Rationalising with the conjugate",
        latex: "\\frac{a}{b+\\sqrt{c}} = \\frac{a\\,(b-\\sqrt{c})}{b^2 - c}",
        symbols: [
          { symbol: "\\(b - \\sqrt{c}\\)", meaning: "the conjugate of \\(b + \\sqrt{c}\\)" },
        ],
      },
      authoredExample: {
        prompt: "(a) Simplify \\(\\sqrt{50} + \\sqrt{18} - \\sqrt{8}\\). (b) Rationalise \\(\\dfrac{6}{3 - \\sqrt{5}}\\).",
        steps: [
          "(a) \\(\\sqrt{50} = 5\\sqrt{2}\\), \\(\\sqrt{18} = 3\\sqrt{2}\\), \\(\\sqrt{8} = 2\\sqrt{2}\\). Total: \\((5 + 3 - 2)\\sqrt{2} = 6\\sqrt{2}\\).",
          "(b) Multiply top and bottom by \\(3 + \\sqrt{5}\\). Denominator: \\(3^2 - 5 = 4\\).",
          "So the fraction is \\(\\dfrac{6(3 + \\sqrt{5})}{4} = \\dfrac{9 + 3\\sqrt{5}}{2}\\).",
        ],
        answer: "(a) \\(6\\sqrt{2}\\); (b) \\(\\frac{9 + 3\\sqrt{5}}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Which of the following is equal to \\(\\dfrac{4}{3 + \\sqrt{5}}\\)?",
        options: [
          "\\(3 - \\sqrt{5}\\)",
          "\\(3 + \\sqrt{5}\\)",
          "\\(\\frac{6 - 2\\sqrt{5}}{7}\\)",
          "\\(12 - 4\\sqrt{5}\\)",
          "\\(\\frac{3 - \\sqrt{5}}{4}\\)",
        ],
        steps: [
          "Multiply top and bottom by the conjugate \\(3 - \\sqrt{5}\\): the denominator is \\(9 - 5 = 4\\).",
          "\\(\\dfrac{4(3 - \\sqrt{5})}{4} = 3 - \\sqrt{5}\\).",
          "Option B keeps the wrong sign; C uses \\(9 + 5\\) in the denominator; D forgets to divide by 4; E divides by 4 twice.",
        ],
        answer: "(A) \\(3 - \\sqrt{5}\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\sqrt{75}\\).", answer: "\\(5\\sqrt{3}\\)" },
        { prompt: "Rationalise \\(\\frac{1}{\\sqrt{3}}\\).", answer: "\\(\\frac{\\sqrt{3}}{3}\\)" },
        { prompt: "Evaluate \\((\\sqrt{7} + 2)(\\sqrt{7} - 2)\\).", answer: "3", method: "\\(7 - 4\\)" },
        { prompt: "Evaluate \\(\\sqrt{12} \\times \\sqrt{3}\\).", answer: "6", method: "\\(\\sqrt{36}\\)" },
      ],
      traps: [
        {
          title: "The root of a sum is not the sum of the roots",
          body: "\\(\\sqrt{9 + 16} = \\sqrt{25} = 5\\), not \\(3 + 4 = 7\\). Roots split over a product or a quotient, never over a sum or a difference.",
        },
        {
          title: "The conjugate denominator is b² minus c",
          body: "\\((b + \\sqrt{c})(b - \\sqrt{c}) = b^2 - c\\). Writing \\(b^2 + c\\) is the usual slip, and an option built on it is always present.",
        },
      ],
    },
  ],
};
