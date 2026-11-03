import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part II), Ch. 4 Definite Integration. Statements are
 * the Balbharati text's own, trimmed; every property and worked value
 * re-checked by substitution or by integrating a test case; most-asked years
 * from the 15 board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Definite Integration",
  chapterSlug: "definite-integration",
  source: "Balbharati Mathematics and Statistics Part II Std XII (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Definite integral as an area",
      text: "For \\(f(x) \\ge 0\\) and continuous on \\([a, b]\\), \\(\\int_a^b f(x)\\,dx\\) is defined as the area of the region bounded by \\(y = f(x)\\), the X-axis and the ordinates \\(x = a\\) and \\(x = b\\).",
    },
    {
      term: "Definite integral as limit of a sum",
      text: "Divide \\([a, b]\\) into \\(n\\) equal strips of width \\(h\\); the sum of the strip areas tends to the integral as \\(n \\to \\infty\\). The word 'to integrate' means 'to find the sum of'.",
    },
    {
      term: "Fundamental theorem of integral calculus",
      text: "Let \\(f\\) be the continuous function defined on \\([a, b]\\) and \\(\\int f(x)\\,dx = g(x) + c\\). Then \\(\\int_a^b f(x)\\,dx = g(b) - g(a)\\). The constant \\(c\\) cancels, so a definite integral is a number.",
    },
    {
      term: "Lower and upper limits",
      text: "In \\(\\int_a^b f(x)\\,dx\\), \\(a\\) is called the lower limit and \\(b\\) the upper limit.",
    },
    {
      term: "Why the properties matter",
      text: "These properties are very useful in evaluation of the definite integral: many integrals with no easy primitive (such as \\(\\log(1 + \\tan x)\\)) are found by a property, not by integrating.",
    },
    {
      term: "Even and odd functions",
      text: "\\(f(x)\\) is an **even** function if \\(f(-x) = f(x)\\) (\\(x^2\\), \\(\\cos x\\), \\(|x|\\)) and an **odd** function if \\(f(-x) = -f(x)\\) (\\(x^3\\), \\(\\sin x\\), \\(\\tan^{-1}x\\)). Test \\(f(-x)\\) before using Property VIII.",
    },
    {
      term: "Changing the limits in a substitution",
      text: "When you put \\(t = \\phi(x)\\), change the limits too: as \\(x\\) varies from \\(a\\) to \\(b\\), \\(t\\) varies from \\(\\phi(a)\\) to \\(\\phi(b)\\). Then never return to \\(x\\).",
    },
    {
      term: "Splitting the interval",
      text: "For \\(|x|\\), \\([x]\\) or a function defined in pieces, split \\([a, b]\\) at the points where the rule changes (Property IV) and integrate each piece.",
    },
    {
      term: "A useful general result",
      text: "Adding the integral to itself after Property V gives \\(\\int_a^b \\frac{f(x)}{f(x) + f(a + b - x)}\\,dx = \\frac{b - a}{2}\\).",
    },
    {
      term: "Reduction formulae",
      text: "To evaluate \\(\\int_0^{\\pi/2} \\sin^n x\\,dx\\) and \\(\\int_0^{\\pi/2} \\cos^n x\\,dx\\), the results used are known as reduction formulae. Both integrals are equal (Property VI).",
    },
  ],
  formulas: [
    {
      label: "Fundamental theorem",
      latex: "\\int_a^b f(x)\\,dx = \\Big[g(x)\\Big]_a^b = g(b) - g(a), \\quad g'(x) = f(x)",
    },
    {
      label: "Limit of a sum",
      latex: "\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{r=1}^{n} h\\,f(a + rh), \\quad h = \\frac{b - a}{n}",
    },
    {
      label: "Sums used in limit of a sum",
      latex: "\\sum_{r=1}^{n} r = \\frac{n(n + 1)}{2} \\qquad \\sum_{r=1}^{n} r^2 = \\frac{n(n + 1)(2n + 1)}{6}",
    },
    { label: "Property I", latex: "\\int_a^a f(x)\\,dx = 0" },
    { label: "Property II", latex: "\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx" },
    { label: "Property III", latex: "\\int_a^b f(x)\\,dx = \\int_a^b f(t)\\,dt" },
    {
      label: "Property IV",
      latex: "\\int_a^b f(x)\\,dx = \\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx, \\quad a < c < b",
    },
    { label: "Property V", latex: "\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx" },
    { label: "Property VI", latex: "\\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx" },
    {
      label: "Property VII",
      latex: "\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx",
    },
    {
      label: "Property VII when f(2a - x) = f(x)",
      latex: "\\int_0^{2a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx \\quad (\\text{and } 0 \\text{ if } f(2a - x) = -f(x))",
    },
    {
      label: "Property VIII (even and odd functions)",
      latex: "\\int_{-a}^{a} f(x)\\,dx = \\begin{cases} 2\\int_0^a f(x)\\,dx, & f \\text{ even} \\\\ 0, & f \\text{ odd} \\end{cases}",
    },
    {
      label: "A general result",
      latex: "\\int_a^b \\frac{f(x)}{f(x) + f(a + b - x)}\\,dx = \\frac{b - a}{2}",
    },
    {
      label: "Substitution with new limits",
      latex: "\\int_a^b f(\\phi(x))\\,\\phi'(x)\\,dx = \\int_{\\phi(a)}^{\\phi(b)} f(t)\\,dt",
    },
    {
      label: "By parts with limits",
      latex: "\\int_a^b u\\,v\\,dx = \\Big[u\\int v\\,dx\\Big]_a^b - \\int_a^b \\Big(u'\\int v\\,dx\\Big)dx",
    },
    {
      label: "Reduction formula, n odd",
      latex: "\\int_0^{\\pi/2} \\sin^n x\\,dx = \\int_0^{\\pi/2} \\cos^n x\\,dx = \\frac{n - 1}{n}\\cdot\\frac{n - 3}{n - 2}\\cdots\\frac{4}{5}\\cdot\\frac{2}{3}",
    },
    {
      label: "Reduction formula, n even",
      latex: "\\int_0^{\\pi/2} \\sin^n x\\,dx = \\int_0^{\\pi/2} \\cos^n x\\,dx = \\frac{n - 1}{n}\\cdot\\frac{n - 3}{n - 2}\\cdots\\frac{3}{4}\\cdot\\frac{1}{2}\\cdot\\frac{\\pi}{2}",
    },
  ],
  derivations: [
    {
      title: "Prove that \\(\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx\\). Hence find \\(\\int_{\\pi/6}^{\\pi/3} \\sin^2 x\\,dx\\)",
      steps: [
        "Let \\(\\int f(x)\\,dx = g(x) + c\\). In the R.H.S. put \\(a + b - x = t\\), so \\(dx = -dt\\); as \\(x\\) goes from \\(a\\) to \\(b\\), \\(t\\) goes from \\(b\\) to \\(a\\).",
        "R.H.S. \\(= \\int_b^a f(t)(-dt) = \\int_a^b f(t)\\,dt = \\int_a^b f(x)\\,dx\\) (Properties II and III) \\(=\\) L.H.S.",
        "Hence: \\(a + b = \\frac{\\pi}{2}\\), so \\(I = \\int_{\\pi/6}^{\\pi/3} \\sin^2 x\\,dx = \\int_{\\pi/6}^{\\pi/3} \\cos^2 x\\,dx\\).",
        "Add: \\(2I = \\int_{\\pi/6}^{\\pi/3} 1\\,dx = \\frac{\\pi}{6}\\), so \\(I = \\frac{\\pi}{12}\\).",
      ],
    },
    {
      title: "Prove that \\(\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\) if \\(f\\) is even, \\(= 0\\) if \\(f\\) is odd. Hence find \\(\\int_{-1}^{1} \\tan^{-1}x\\,dx\\)",
      steps: [
        "By Property IV, \\(\\int_{-a}^{a} f(x)\\,dx = \\int_{-a}^{0} f(x)\\,dx + \\int_0^a f(x)\\,dx\\) ... (i)",
        "In the first, put \\(x = -t\\), \\(dx = -dt\\); \\(x: -a \\to 0\\) gives \\(t: a \\to 0\\). So \\(\\int_{-a}^{0} f(x)\\,dx = \\int_0^a f(-x)\\,dx\\).",
        "Then (i) becomes \\(\\int_{-a}^{a} f(x)\\,dx = \\int_0^a [f(-x) + f(x)]\\,dx\\).",
        "Odd: \\(f(-x) = -f(x)\\), the bracket is 0. Even: \\(f(-x) = f(x)\\), it is \\(2f(x)\\), giving \\(2\\int_0^a f(x)\\,dx\\).",
        "Hence: \\(\\tan^{-1}(-x) = -\\tan^{-1}x\\), so \\(\\tan^{-1}x\\) is odd and \\(\\int_{-1}^{1} \\tan^{-1}x\\,dx = 0\\).",
      ],
    },
    {
      title: "Prove that \\(\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx\\). Hence show that \\(\\int_0^{\\pi} \\sin x\\,dx = 2\\int_0^{\\pi/2} \\sin x\\,dx\\)",
      steps: [
        "By Property IV, \\(\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_a^{2a} f(x)\\,dx\\).",
        "In \\(\\int_a^{2a} f(x)\\,dx\\) put \\(x = 2a - t\\), \\(dx = -dt\\); \\(x: a \\to 2a\\) gives \\(t: a \\to 0\\).",
        "So \\(\\int_a^{2a} f(x)\\,dx = \\int_a^0 f(2a - t)(-dt) = \\int_0^a f(2a - x)\\,dx\\), which proves the result.",
        "Hence: with \\(2a = \\pi\\), \\(\\sin(\\pi - x) = \\sin x\\), so both parts equal \\(\\int_0^{\\pi/2} \\sin x\\,dx\\), giving \\(2\\int_0^{\\pi/2} \\sin x\\,dx\\) (\\(= 2\\)).",
      ],
    },
    {
      title: "Show that \\(\\int_0^{\\pi/4} \\log(1 + \\tan x)\\,dx = \\frac{\\pi}{8}\\log 2\\) (Property VI)",
      steps: [
        "Let \\(I = \\int_0^{\\pi/4} \\log(1 + \\tan x)\\,dx\\). By Property VI, \\(I = \\int_0^{\\pi/4} \\log\\left(1 + \\tan\\left(\\frac{\\pi}{4} - x\\right)\\right)dx\\).",
        "\\(1 + \\frac{1 - \\tan x}{1 + \\tan x} = \\frac{2}{1 + \\tan x}\\), so \\(I = \\int_0^{\\pi/4} [\\log 2 - \\log(1 + \\tan x)]\\,dx = \\frac{\\pi}{4}\\log 2 - I\\).",
        "\\(2I = \\frac{\\pi}{4}\\log 2\\), so \\(I = \\frac{\\pi}{8}\\log 2\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_0^3 \\frac{\\sqrt{x}}{\\sqrt{x} + \\sqrt{3 - x}}\\,dx\\) (add \\(I\\) to itself)",
      steps: [
        "Let \\(I\\) be the integral. By Property V (here \\(a + b - x = 3 - x\\)), \\(I = \\int_0^3 \\frac{\\sqrt{3 - x}}{\\sqrt{3 - x} + \\sqrt{x}}\\,dx\\).",
        "Add the two forms: \\(2I = \\int_0^3 1\\,dx = 3\\), so \\(I = \\frac{3}{2}\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_{-\\pi/4}^{\\pi/4} \\frac{1}{1 - \\sin x}\\,dx\\)",
      steps: [
        "Multiply by \\(1 + \\sin x\\): \\(\\frac{1 + \\sin x}{\\cos^2 x} = \\sec^2 x + \\sec x\\tan x\\).",
        "\\(I = \\Big[\\tan x + \\sec x\\Big]_{-\\pi/4}^{\\pi/4} = (1 + \\sqrt{2}) - (-1 + \\sqrt{2}) = 2\\).",
        "Check by Property VIII: \\(\\sec x\\tan x\\) is odd, so \\(I = 2\\int_0^{\\pi/4} \\sec^2 x\\,dx = 2\\).",
      ],
    },
    {
      title: "Evaluate \\(\\int_{-1}^{1} |x|\\,dx\\) (split the interval)",
      steps: [
        "\\(|x| = -x\\) for \\(x < 0\\) and \\(x\\) for \\(x \\ge 0\\). By Property IV, \\(I = \\int_{-1}^{0} (-x)\\,dx + \\int_0^1 x\\,dx\\).",
        "\\(I = \\frac{1}{2} + \\frac{1}{2} = 1\\). (Or: \\(|x|\\) is even, so \\(I = 2\\int_0^1 x\\,dx = 1\\).)",
      ],
    },
    {
      title: "Evaluate \\(\\int_1^2 (2x + 5)\\,dx\\) as the limit of a sum",
      steps: [
        "\\(a = 1\\), \\(b = 2\\), \\(h = \\frac{1}{n}\\), so \\(nh = 1\\); \\(f(1 + rh) = 7 + 2rh\\).",
        "\\(\\sum_{r=1}^{n} h(7 + 2rh) = 7nh + 2h^2\\frac{n(n + 1)}{2} = 7 + \\frac{n + 1}{n}\\).",
        "As \\(n \\to \\infty\\), the sum tends to \\(7 + 1 = 8\\). Check: \\(\\Big[x^2 + 5x\\Big]_1^2 = 14 - 6 = 8\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    {
      topic: "Evaluate a definite integral by substitution or a standard form (often an MCQ, or finding \\(k\\) from the value)",
      years: [2026, 2025, 2024, 2018],
    },
    {
      topic: "Prove \\(\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx\\) or 0 (even, odd), or use it",
      years: [2026, 2024],
    },
    {
      topic: "Prove \\(\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx\\) and use it, or use \\(f(a - x)\\)",
      years: [2026, 2025, 2022],
    },
    {
      topic: "Prove \\(\\int_0^{2a} f(x)\\,dx = \\int_0^a f(x)\\,dx + \\int_0^a f(2a - x)\\,dx\\)",
      years: [2024, 2016],
    },
  ],
  mistakes: [
    {
      title: "Keeping the old limits after a substitution",
      body: "In \\(\\int_1^2 \\frac{1}{x^2}e^{1/x}\\,dx\\), \\(t = \\frac{1}{x}\\) changes the limits to \\(1\\) and \\(\\frac{1}{2}\\): the answer is \\(e - \\sqrt{e}\\). Change the limits with the variable, or go back to \\(x\\) before you substitute them.",
    },
    {
      title: "Writing \\(f(a - x)\\) when the lower limit is not 0",
      body: "\\(f(a - x)\\) works only on \\([0, a]\\). On \\([a, b]\\) use \\(f(a + b - x)\\): on \\([\\frac{\\pi}{6}, \\frac{\\pi}{3}]\\), \\(\\sin x\\) becomes \\(\\cos x\\).",
    },
    {
      title: "Using Property VIII without testing \\(f(-x)\\)",
      body: "\\(\\frac{1}{1 - \\sin x}\\) is neither even nor odd. Write \\(f(-x)\\) and state \"f is odd\" or \"f is even\" before you use the result; the statement earns the mark.",
    },
    {
      title: "Integrating \\(|x|\\) as \\(x\\)",
      body: "\\(\\int_{-1}^{1} x\\,dx = 0\\) but \\(\\int_{-1}^{1} |x|\\,dx = 1\\). Split the interval where the modulus changes sign.",
    },
    {
      title: "Adding \\(c\\) to a definite integral",
      body: "The constant cancels in \\(g(b) - g(a)\\). A definite integral is a number: no \\(c\\) in the answer.",
    },
    {
      title: "Dropping the \\(\\frac{\\pi}{2}\\) in the reduction formula",
      body: "Only an even power ends with \\(\\frac{1}{2}\\cdot\\frac{\\pi}{2}\\): \\(\\int_0^{\\pi/2} \\cos^8 x\\,dx = \\frac{35\\pi}{256}\\), but \\(\\int_0^{\\pi/2} \\sin^7 x\\,dx = \\frac{16}{35}\\).",
    },
  ],
};

export default sheet;
