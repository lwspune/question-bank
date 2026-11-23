import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_DI_LIMIT_NOTE: SubtopicNote = {
  subtopicName: "Definite Integral as a Limit of a Sum",
  title: "The Definite Integral as a Limit of a Sum",
  oneLineDefinition:
    "The integral of f(x) from a to b is the limit, as the number of strips n grows without bound, of the sum of h times f(a + rh) for r = 1 to n, where h = (b − a)/n.",
  whyItMatters:
    "9 questions, all from the textbook: the four solved examples of section 4.1 and the five sums of Exercise 4.1. No board paper in this bank asked for a limit of a sum, so learn the method well enough to do one sum cleanly and spend more time on the other pages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmdi-limit-polynomial",
      name: "Limit of a sum for polynomials",
      intuition:
        "For a function that is not negative on [a, b], the definite integral is the area between the curve, the X-axis and the lines x = a and x = b. Cut that area into n thin strips of equal width h. Each strip is nearly a rectangle of height f(a + rh), so the area is nearly the sum of h times f(a + rh). As n grows, the strips get thinner and the sum becomes the exact area.",
      definition:
        "- Divide \\([a, b]\\) into \\(n\\) equal parts of width \\(h = \\dfrac{b - a}{n}\\), so \\(nh = b - a\\).\n" +
        "- \\(\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{r=1}^{n} h\\,f(a + rh)\\). As \\(n \\to \\infty\\), \\(h \\to 0\\).\n" +
        "- Standard sums: \\(\\sum r = \\dfrac{n(n + 1)}{2}\\), \\(\\sum r^2 = \\dfrac{n(n + 1)(2n + 1)}{6}\\), \\(\\sum r^3 = \\left[\\dfrac{n(n + 1)}{2}\\right]^2\\).\n" +
        "- **Method:** write \\(f(a + rh)\\), sum term by term, rewrite every product in terms of \\(nh\\) and \\(h\\), then let \\(h \\to 0\\).",
      formula: {
        label: "Definite integral as a limit of a sum",
        latex: "\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{r=1}^{n} h\\,f(a + rh), \\qquad h = \\frac{b - a}{n}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "width of each strip" },
          { symbol: "\\(n\\)", meaning: "number of equal strips" },
          { symbol: "\\(f(a + rh)\\)", meaning: "height of the strip with right end at a + rh" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_1^3 x^2\\,dx\\) as a limit of a sum.",
        steps: [
          "Here \\(f(x) = x^2\\), \\(a = 1\\), \\(b = 3\\), \\(h = \\dfrac{3 - 1}{n} = \\dfrac{2}{n}\\), so \\(nh = 2\\).",
          "\\(f(1 + rh) = (1 + rh)^2 = 1 + 2rh + r^2h^2\\).",
          "\\(\\int_1^3 x^2\\,dx = \\lim_{n \\to \\infty} \\sum_{r=1}^{n} h\\left(1 + 2rh + r^2h^2\\right) = \\lim_{n \\to \\infty}\\left[nh + 2h^2\\,\\dfrac{n(n + 1)}{2} + h^3\\,\\dfrac{n(n + 1)(2n + 1)}{6}\\right]\\).",
          "In terms of \\(nh\\): \\(= \\lim_{n \\to \\infty}\\left[nh + nh(nh + h) + \\dfrac{nh(nh + h)(2nh + h)}{6}\\right] = \\lim_{h \\to 0}\\left[2 + 2(2 + h) + \\dfrac{2(2 + h)(4 + h)}{6}\\right]\\).",
          "Let \\(h \\to 0\\): \\(= 2 + 4 + \\dfrac{2 \\times 2 \\times 4}{6} = 6 + \\dfrac{8}{3} = \\dfrac{26}{3}\\).",
        ],
        answer: "\\(\\int_1^3 x^2\\,dx = \\dfrac{26}{3}\\)",
      },
      selfCheckExample: {
        prompt: "To evaluate \\(\\int_2^5 f(x)\\,dx\\) as a limit of a sum with \\(n\\) equal parts, what are \\(h\\) and \\(nh\\)?",
        steps: ["\\(h = \\dfrac{b - a}{n} = \\dfrac{5 - 2}{n}\\)."],
        answer: "\\(h = \\dfrac{3}{n}\\) and \\(nh = 3\\)",
      },
      practiceSet: [
        { prompt: "Write \\(\\sum_{r=1}^{n} r^2\\) as a formula in \\(n\\).", answer: "\\(\\dfrac{n(n + 1)(2n + 1)}{6}\\)" },
        {
          prompt: "Evaluate \\(\\int_0^2 x\\,dx\\) as a limit of a sum.",
          answer: "\\(2\\)",
          method: "\\(h = \\dfrac{2}{n}\\); \\(\\sum h \\cdot rh = h^2\\,\\dfrac{n(n + 1)}{2} = \\dfrac{nh(nh + h)}{2} \\to \\dfrac{2 \\times 2}{2}\\).",
        },
        { prompt: "With \\(nh = 4\\) fixed, find the limit of \\(nh(nh + h)\\) as \\(h \\to 0\\).", answer: "\\(16\\)" },
      ],
      pyqExampleId: "f116a2b7-2e9d-42bd-9ad1-fcec0867cbe0",
      traps: [
        {
          title: "Letting h go to 0 too early",
          body: "\\(h^2\\,n(n + 1)\\) looks as if it should vanish, but it equals \\(nh(nh + h)\\), which tends to \\((b - a)^2\\). Rewrite every product in terms of \\(nh\\) first, and only then let \\(h \\to 0\\).",
        },
        {
          title: "Skipping the set-up lines",
          body: "The first marks go to \\(f(x)\\), \\(a\\), \\(b\\), \\(h = \\dfrac{b - a}{n}\\) and the form \\(f(a + rh)\\). Write all of them before the sum, even when the final value is easy to guess from the antiderivative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmdi-limit-exponential",
      name: "Limit of a sum for exponential and sine functions",
      intuition:
        "For an exponential function, the heights f(a + rh) multiply by the same number at each step, so the sum is a geometric progression with a ready formula. What is left is a standard limit. For sin x the book uses a trigonometric trick instead: multiplying the sum by 2 sin(h/2) makes the terms cancel in pairs.",
      definition:
        "- For \\(e^x\\): \\(\\sum_{r=1}^{n} e^{a + rh} = e^a\\left(e^h + e^{2h} + \\dots + e^{nh}\\right) = e^a\\,e^h\\,\\dfrac{e^{nh} - 1}{e^h - 1}\\), a G.P. with ratio \\(e^h\\).\n" +
        "- For \\(k^x\\), the same G.P. with ratio \\(k^h\\).\n" +
        "- Standard limits: \\(\\lim_{h \\to 0}\\dfrac{e^h - 1}{h} = 1\\) and \\(\\lim_{h \\to 0}\\dfrac{k^h - 1}{h} = \\log k\\).\n" +
        "- For \\(\\sin x\\): multiply \\(\\sum \\sin rh\\) by \\(2\\sin\\dfrac{h}{2}\\) and use \\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\); the middle terms cancel.",
      formula: {
        label: "Sum of a G.P. and the standard limit",
        latex: "\\sum_{r=1}^{n} k^{rh} = k^h\\,\\frac{k^{nh} - 1}{k^h - 1}, \\qquad \\lim_{h \\to 0}\\frac{k^h - 1}{h} = \\log k",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^1 2^x\\,dx\\) as a limit of a sum.",
        steps: [
          "Here \\(f(x) = 2^x\\), \\(a = 0\\), \\(b = 1\\), \\(h = \\dfrac{1}{n}\\), so \\(nh = 1\\).",
          "\\(\\int_0^1 2^x\\,dx = \\lim_{n \\to \\infty} \\sum_{r=1}^{n} h\\,2^{rh} = \\lim_{n \\to \\infty} h\\left(2^h + 2^{2h} + \\dots + 2^{nh}\\right)\\).",
          "The bracket is a G.P. with first term \\(2^h\\) and ratio \\(2^h\\): its sum is \\(2^h\\,\\dfrac{2^{nh} - 1}{2^h - 1} = 2^h\\,\\dfrac{2 - 1}{2^h - 1}\\).",
          "So the integral \\(= \\lim_{h \\to 0} 2^h \\cdot \\dfrac{h}{2^h - 1} = 1 \\times \\dfrac{1}{\\log 2}\\), since \\(\\lim_{h \\to 0}\\dfrac{2^h - 1}{h} = \\log 2\\).",
        ],
        answer: "\\(\\int_0^1 2^x\\,dx = \\dfrac{1}{\\log 2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\lim_{h \\to 0}\\dfrac{h}{e^h - 1}\\).",
        steps: ["It is the reciprocal of \\(\\lim_{h \\to 0}\\dfrac{e^h - 1}{h} = 1\\)."],
        answer: "\\(1\\)",
      },
      practiceSet: [
        { prompt: "Find the sum \\(e^h + e^{2h} + \\dots + e^{nh}\\).", answer: "\\(e^h\\,\\dfrac{e^{nh} - 1}{e^h - 1}\\)" },
        { prompt: "State \\(\\lim_{h \\to 0}\\dfrac{5^h - 1}{h}\\).", answer: "\\(\\log 5\\)" },
        {
          prompt: "When \\(\\int_0^{\\pi/2}\\sin x\\,dx\\) is found as a limit of a sum, by what is \\(\\sum_{r=1}^{n}\\sin rh\\) multiplied so that its terms cancel in pairs?",
          answer: "\\(2\\sin\\dfrac{h}{2}\\)",
        },
      ],
      pyqExampleId: "48d6e49e-703e-4cf0-ac74-85de1b3f8c4f",
      traps: [
        {
          title: "Dropping the factor e to the power a",
          body: "When \\(a \\neq 0\\), \\(f(a + rh) = e^{a}\\,e^{rh}\\). Leaving out \\(e^a\\) gives the integral over \\([0, b - a]\\) instead of \\([a, b]\\).",
        },
        {
          title: "Writing 1 for every standard limit",
          body: "\\(\\lim_{h \\to 0}\\dfrac{e^h - 1}{h} = 1\\), but \\(\\lim_{h \\to 0}\\dfrac{k^h - 1}{h} = \\log k\\). For \\(7^x\\) the answer carries \\(\\dfrac{1}{\\log 7}\\).",
        },
      ],
    },
  ],
};
