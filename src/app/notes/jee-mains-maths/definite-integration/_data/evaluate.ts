import type { SubtopicNote } from "@/app/notes/_types";

export const EVALUATE_DI_NOTE: SubtopicNote = {
  subtopicName: "Evaluating by Substitution, Parts and Partial Fractions",
  title: "Evaluating by Substitution, Parts and Partial Fractions",
  oneLineDefinition:
    "Working out a definite integral directly: a substitution with its limits changed, integration by parts, partial fractions and inverse-tangent splits, finding the integrand before integrating, and bounding an integral that cannot be evaluated.",
  whyItMatters:
    "Forty-nine PYQs, a quarter of the chapter. Most need one well-chosen substitution; the rest integrate by parts, split into partial fractions, or first work out what the integrand is. Four ideas cover the page.",
  concepts: [
    // C1 — substitution
    {
      kind: "formula" as const,
      slug: "jdi-substitution",
      name: "Substitution: tan x, tan(x/2) and rationalising",
      intuition:
        "Choose a substitution that turns the integrand into a rational function or a standard form, and change the limits along with the variable, so there is nothing to substitute back. Even powers of \\(\\sin x\\) and \\(\\cos x\\) divided by \\(\\cos^4x\\) or similar become polynomials in \\(t=\\tan x\\). A denominator \\(a+b\\sin x+c\\cos x\\) becomes rational with \\(t=\\tan\\frac x2\\). A difference of square roots is rationalised first.",
      definition:
        "- **Change the limits** with the variable; never substitute back.\n" +
        "- \\(t=\\tan x\\): \\(dx=\\frac{dt}{1+t^2}\\), \\(\\sec^2x=1+t^2\\).\n" +
        "- \\(t=\\tan\\frac x2\\): \\(\\sin x=\\frac{2t}{1+t^2}\\), \\(\\cos x=\\frac{1-t^2}{1+t^2}\\), \\(dx=\\frac{2\\,dt}{1+t^2}\\).\n" +
        "- \\(\\frac1{\\sqrt a+\\sqrt b}=\\frac{\\sqrt a-\\sqrt b}{a-b}\\).",
      formula: {
        label: "Half-angle substitution",
        latex: "t=\\tan\\frac x2:\\quad \\sin x=\\frac{2t}{1+t^2},\\ \\cos x=\\frac{1-t^2}{1+t^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}\\frac{dx}{2+\\cos x}\\).",
        steps: [
          "With \\(t=\\tan\\frac x2\\): \\(2+\\cos x=\\frac{3+t^2}{1+t^2}\\), so the integral is \\(\\int_0^1\\frac{2\\,dt}{3+t^2}\\).",
          "\\(=\\frac2{\\sqrt3}\\tan^{-1}\\frac1{\\sqrt3}=\\frac2{\\sqrt3}\\cdot\\frac\\pi6\\).",
        ],
        answer: "\\(\\frac{\\pi}{3\\sqrt3}\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/4}\\sec^4x\\,dx\\).",
        steps: [
          "\\(t=\\tan x\\): \\(\\int_0^1(1+t^2)\\,dt\\).",
        ],
        answer: "\\(\\frac43\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^1\\frac{x}{1+x^2}dx\\)?", answer: "\\(\\frac12\\ln2\\)" },
        { prompt: "\\(\\int_0^{\\pi/2}\\sin x\\cos x\\,dx\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\int_0^1 2xe^{x^2}dx\\)?", answer: "\\(e-1\\)" },
        { prompt: "\\(\\int_0^1\\frac{dx}{\\sqrt{1-x^2}}\\)?", answer: "\\(\\frac\\pi2\\)" },
      ],
      pyqExampleId: "bc3123dc-2f04-4680-a940-c033970db171", // 2022 — integral of 1/(3 + 2 sin x + cos x) over [0, pi/2]
      traps: [
        {
          title: "The limits change too",
          body: "With \\(t=\\tan x\\), the limit \\(x=\\frac\\pi2\\) becomes \\(t\\to\\infty\\), and with \\(t=\\tan\\frac x2\\) it becomes \\(t=1\\). Keeping the old limits is the most common slip.",
        },
      ],
    },

    // C2 — parts and partial fractions
    {
      kind: "formula" as const,
      slug: "jdi-parts",
      name: "Parts, partial fractions and inverse-tangent splits",
      intuition:
        "By parts moves a derivative from one factor to the other: \\(\\int_a^b uv'=[uv]_a^b-\\int_a^b u'v\\), with the boundary term worked out at the limits. A rational integrand splits into partial fractions. An inverse tangent of a quadratic often splits as a difference: \\(\\cot^{-1}(1+x+x^2)=\\tan^{-1}(x+1)-\\tan^{-1}x\\), because \\(\\frac{(x+1)-x}{1+x(x+1)}=\\frac1{1+x+x^2}\\).",
      definition:
        "- \\(\\int_a^b uv'\\,dx=[uv]_a^b-\\int_a^b u'v\\,dx\\).\n" +
        "- Partial fractions before integrating a rational function.\n" +
        "- \\(\\tan^{-1}A-\\tan^{-1}B=\\tan^{-1}\\frac{A-B}{1+AB}\\): look for \\(A-B=1\\).\n" +
        "- **Inverse pair:** \\(\\int_a^bf+\\int_{f(a)}^{f(b)}f^{-1}=bf(b)-af(a)\\) for increasing \\(f\\).",
      formula: {
        label: "By parts",
        latex: "\\int_a^b u\\,v'\\,dx=\\big[uv\\big]_a^b-\\int_a^b u'\\,v\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\int_0^1xe^x\\,dx\\).",
        steps: [
          "\\([xe^x]_0^1-\\int_0^1e^x\\,dx=e-(e-1)\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\int_0^{\\pi/2}x\\cos x\\,dx\\).",
        steps: [
          "\\([x\\sin x]_0^{\\pi/2}-\\int_0^{\\pi/2}\\sin x\\,dx\\).",
        ],
        answer: "\\(\\frac\\pi2-1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_1^e\\ln x\\,dx\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\int_0^1\\frac{dx}{(x+1)(x+2)}\\)?", answer: "\\(\\ln\\frac43\\)" },
        { prompt: "\\(\\tan^{-1}\\frac1{1+x+x^2}\\) as a difference?", answer: "\\(\\tan^{-1}(x+1)-\\tan^{-1}x\\)" },
        { prompt: "\\(\\int_0^\\pi x\\sin x\\,dx\\)?", answer: "\\(\\pi\\)" },
      ],
      pyqExampleId: "f850f612-bcb6-4909-b305-c5bed4531a8f", // 2026 — integral of cot^-1(1 + x + x^2) over [0, 1]
      traps: [
        {
          title: "Work out the boundary term",
          body: "\\([uv]_a^b\\) is a number, not zero by default. It is zero only when \\(uv\\) vanishes at both limits; check before dropping it.",
        },
      ],
    },

    // C3 — find the integrand first
    {
      kind: "formula" as const,
      slug: "jdi-find-then-integrate",
      name: "Find the integrand first, then integrate",
      intuition:
        "Many questions hide the integrand: a polynomial given through \\(f(x^2+1)\\), a function fixed by a functional equation, or coefficients fixed by conditions. Find the function explicitly, check it against every condition, then integrate. Powers of sine and cosine are easier after reducing to multiple angles.",
      definition:
        "- \\(f(g(x))\\) given: put \\(t=g(x)\\) to recover \\(f(t)\\).\n" +
        "- Functional equation in \\(f(x)\\) and \\(f\\left(\\frac1x\\right)\\): substitute again and solve the pair.\n" +
        "- \\(\\cos^2x=\\frac{1+\\cos2x}2\\); \\(\\cos^4x=\\frac38+\\frac12\\cos2x+\\frac18\\cos4x\\).",
      formula: {
        label: "Fourth power of cosine",
        latex: "\\cos^4x=\\frac38+\\frac12\\cos2x+\\frac18\\cos4x",
      },
      authoredExample: {
        prompt: "\\(f(x-1)=x^2-2x+2\\). Find \\(\\int_0^3f(x)\\,dx\\).",
        steps: [
          "Put \\(t=x-1\\): \\(f(t)=(t+1)^2-2(t+1)+2=t^2+1\\).",
          "\\(\\int_0^3(x^2+1)\\,dx=9+3\\).",
        ],
        answer: "\\(12\\).",
      },
      selfCheckExample: {
        prompt: "\\(P(x)=x^2+bx\\) and \\(\\int_0^1P(x)\\,dx=1\\). Find \\(b\\).",
        steps: [
          "\\(\\frac13+\\frac b2=1\\).",
        ],
        answer: "\\(b=\\frac43\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^{\\pi/2}\\cos^2x\\,dx\\)?", answer: "\\(\\frac\\pi4\\)" },
        { prompt: "\\(\\int_0^{2\\pi}\\sin^2x\\,dx\\)?", answer: "\\(\\pi\\)" },
        { prompt: "\\(f(2x)=4x^2\\). \\(\\int_0^1f(x)\\,dx\\)?", answer: "\\(\\frac13\\)" },
        { prompt: "\\(\\int_0^\\pi\\cos^4x\\,dx\\)?", answer: "\\(\\frac{3\\pi}8\\)" },
      ],
      pyqExampleId: "362834c7-8ae3-48f8-991f-56a1081d7b7f", // 2026 — f(x^2 + 1) = x^4 + 5x^2 + 2, integral of f over [0, 3]
      traps: [
        {
          title: "Check the function you found",
          body: "A function recovered from one condition may fail another. Test it against every given value before integrating.",
        },
      ],
    },

    // C4 — bounds
    {
      kind: "formula" as const,
      slug: "jdi-bounds",
      name: "Bounding an integral without evaluating it",
      intuition:
        "If \\(m\\le f(x)\\le M\\) on \\([a,b]\\), then \\(m(b-a)\\le\\int_a^bf\\le M(b-a)\\). A monotonic integrand takes its extreme values at the ends, which gives the tightest such bounds. Split the interval where the bounds on \\(f\\) change.",
      definition:
        "- \\(m\\le f\\le M\\) on \\([a,b]\\Rightarrow m(b-a)\\le\\int_a^bf\\le M(b-a)\\).\n" +
        "- \\(f\\) decreasing: \\((b-a)f(b)\\le\\int_a^bf\\le(b-a)f(a)\\).\n" +
        "- Different bounds on different parts: add the parts.",
      formula: {
        label: "Bounds from the extreme values",
        latex: "m(b-a)\\le\\int_a^b f(x)\\,dx\\le M(b-a)",
      },
      authoredExample: {
        prompt: "Between which numbers does \\(\\int_0^1e^{x^2}dx\\) lie?",
        steps: [
          "\\(1\\le e^{x^2}\\le e\\) on \\([0,1]\\).",
        ],
        answer: "Between 1 and \\(e\\).",
      },
      selfCheckExample: {
        prompt: "Bound \\(\\int_1^2\\frac{dx}{x}\\).",
        steps: [
          "\\(\\frac12\\le\\frac1x\\le1\\) on \\([1,2]\\).",
        ],
        answer: "Between \\(\\frac12\\) and 1 (the value is \\(\\ln2\\approx0.69\\)).",
      },
      practiceSet: [
        { prompt: "Bounds for \\(\\int_0^1\\frac{dx}{1+x^2}\\)?", answer: "\\(\\frac12\\) and 1" },
        { prompt: "\\(2\\le f\\le5\\) on \\([1,3]\\): \\(\\int_1^3f\\) lies in?", answer: "\\([4,10]\\)" },
        { prompt: "\\(f\\) decreasing on \\([a,b]\\): the bounds?", answer: "\\((b-a)f(b)\\) and \\((b-a)f(a)\\)" },
        { prompt: "\\(0\\le f\\le\\frac12\\) on \\([0,2]\\): \\(\\int_0^2f\\) lies in?", answer: "\\([0,1]\\)" },
      ],
      pyqExampleId: "5faac73d-ec65-4929-8c62-3fea64be6ea0", // 2021 — bounds for g(3) from bounds on f over [0,1] and (1,3]
      traps: [
        {
          title: "Check the bound against the options",
          body: "Work out the two bounds as decimals and compare with each option. If the bounds fit no option, recheck the monotonicity before trusting either.",
        },
      ],
    },
  ],
};
