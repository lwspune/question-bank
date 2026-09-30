import type { SubtopicNote } from "@/app/notes/_types";

export const BUILD_AOD_NOTE: SubtopicNote = {
  subtopicName: "Functions Built from Their Extrema",
  title: "Functions Built from Their Extrema",
  oneLineDefinition:
    "Working backwards: finding a polynomial, or a parameter, from where its maxima and minima are and from a limit or a value it must take.",
  whyItMatters:
    "Fourteen PYQs, eleven of them multiple choice. Nine build a polynomial from the points where it has extrema together with a limit or a value; five find a parameter from where a cubic's maximum and minimum sit. Two ideas cover the page.",
  concepts: [
    // C1 — polynomial from conditions
    {
      kind: "formula" as const,
      slug: "jaod-fromlimit",
      name: "A polynomial from its extrema",
      intuition:
        "An extremum at \\(a\\) gives \\(f'(a)=0\\). When the extrema are all known, write \\(f'\\) first — \\(f'(x)=k(x-a)(x-b)\\) — and integrate. A limit like \\(\\lim_{x\\to0}\\frac{f(x)}{x^3}=c\\) says the terms below \\(x^3\\) are missing and the \\(x^3\\) coefficient is \\(c\\). Then use the remaining values to fix the constants.",
      definition:
        "- Extremum at \\(a\\): \\(f'(a)=0\\).\n" +
        "- Known extrema \\(a,b\\): \\(f'(x)=k(x-a)(x-b)\\).\n" +
        "- \\(\\lim_{x\\to0}\\frac{f(x)}{x^k}=c\\neq0\\): no terms below \\(x^k\\), and the \\(x^k\\) coefficient is \\(c\\).\n" +
        "- An odd polynomial has \\(f(-x)=-f(x)\\).",
      formula: {
        label: "Start from the derivative",
        latex: "f'(x)=k(x-a)(x-b)\\ \\Rightarrow\\ f(x)=k\\left(\\tfrac{x^3}3-\\tfrac{a+b}2x^2+abx\\right)+C",
      },
      authoredExample: {
        prompt: "A cubic has extrema at \\(x=0\\) and \\(x=2\\), with \\(f(0)=1\\) and \\(f(2)=-3\\). Find it.",
        steps: [
          "\\(f'(x)=kx(x-2)\\), so \\(f(x)=k\\left(\\frac{x^3}3-x^2\\right)+1\\).",
          "\\(f(2)=-\\frac43k+1=-3\\) gives \\(k=3\\).",
        ],
        answer: "\\(f(x)=x^3-3x^2+1\\).",
      },
      selfCheckExample: {
        prompt: "A quartic has \\(\\lim_{x\\to0}\\frac{f(x)}{x^2}=2\\) and extrema at \\(x=1\\) and \\(x=2\\) besides \\(x=0\\). Find it.",
        steps: [
          "\\(f=ax^4+bx^3+2x^2\\), \\(f'=x(4ax^2+3bx+4)\\) with roots 1 and 2.",
          "Product \\(\\frac4{4a}=2\\) gives \\(a=\\frac12\\); sum \\(-\\frac{3b}{4a}=3\\) gives \\(b=-2\\).",
        ],
        answer: "\\(f(x)=\\frac12x^4-2x^3+2x^2\\).",
      },
      practiceSet: [
        { prompt: "\\(ax^3+bx\\) with extrema at \\(\\pm1\\)?", answer: "\\(b=-3a\\)" },
        { prompt: "\\(\\lim_{x\\to0}\\frac{ax^3+bx}{x}=3\\)?", answer: "\\(b=3\\)" },
        { prompt: "For an odd \\(f\\), \\(f(2)-f(-2)\\)?", answer: "\\(2f(2)\\)" },
        { prompt: "\\(f'=3(x-1)(x+1)\\), \\(f(0)=2\\)?", answer: "\\(x^3-3x+2\\)" },
      ],
      pyqExampleId: "9dc73050-33a1-434a-9b6d-9d6c1f466ddc", // 2026 — degree-5 polynomial with extrema at +-1 and a limit condition
      traps: [
        {
          title: "Use every condition once",
          body: "Count unknowns and conditions: each extremum gives one equation, the limit fixes several coefficients at once, and a value gives one more. A condition used twice leaves a constant undetermined.",
        },
      ],
    },

    // C2 — where the extrema sit
    {
      kind: "formula" as const,
      slug: "jaod-where",
      name: "Where a cubic's maximum and minimum sit",
      intuition:
        "For a cubic with positive leading coefficient, \\(f'\\) is an upward parabola: \\(f'\\) is positive, then negative, then positive. So the smaller root of \\(f'\\) is the maximum and the larger is the minimum; a negative leading coefficient swaps them. Conditions such as 'maximum at a negative \\(x\\), minimum at a positive \\(x\\)' become conditions on the roots of \\(f'\\), handled by their sum and product.",
      definition:
        "- Leading coefficient \\(>0\\): smaller root of \\(f'\\) = maximum, larger = minimum.\n" +
        "- Two extrema exist when \\(f'\\) has two distinct real roots.\n" +
        "- Roots of opposite sign: product of the roots of \\(f'\\) is negative.",
      formula: {
        label: "Order of the extrema",
        latex: "f(x)=ax^3+\\dots,\\ a>0:\\ x_{\\max}<x_{\\min}",
      },
      authoredExample: {
        prompt: "For \\(a>0\\), \\(f(x)=x^3-3a^2x\\), and the local maximum exceeds the local minimum by 32. Find \\(a\\).",
        steps: [
          "\\(f'=3(x-a)(x+a)\\): maximum at \\(-a\\), minimum at \\(a\\).",
          "\\(f(-a)-f(a)=2a^3-(-2a^3)=4a^3=32\\).",
        ],
        answer: "\\(a=2\\).",
      },
      selfCheckExample: {
        prompt: "Where are the maximum and minimum of \\(2x^3-12x^2+18x\\)?",
        steps: [
          "\\(f'=6(x-1)(x-3)\\), leading coefficient positive.",
        ],
        answer: "Maximum at 1, minimum at 3.",
      },
      practiceSet: [
        { prompt: "\\(f'=(x-2)(x-5)\\): maximum at?", answer: "\\(2\\)" },
        { prompt: "\\(-x^3+3x\\): maximum at?", answer: "\\(1\\)" },
        { prompt: "\\(f'=3x^2+2px+q\\) with extrema at 1 and 3?", answer: "\\(p=-6,\\ q=9\\)" },
        { prompt: "\\(x^3+px\\) has two extrema when?", answer: "\\(p<0\\)" },
      ],
      pyqExampleId: "624ee1ef-8c98-44bf-94d5-a2699a9d45f8", // 2025 — cubic whose maximum and minimum points multiply to 54
      traps: [
        {
          title: "Check the sign of the leading term",
          body: "With a negative leading coefficient, or a parameter that may be negative, the smaller root of \\(f'\\) is the minimum. Settle the sign before naming which root is which.",
        },
      ],
    },
  ],
};
