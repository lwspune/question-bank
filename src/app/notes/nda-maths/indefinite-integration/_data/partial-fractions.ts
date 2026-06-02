import type { SubtopicNote } from "@/app/notes/_types";

export const PARTIAL_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Integration by Partial Fractions",
  title: "Integration by Partial Fractions",
  oneLineDefinition:
    "Partial fractions break a single rational function into a sum of simpler fractions, each of which integrates to a logarithm or an arctangent.",
  whyItMatters:
    "7 PYQs sit here, and the NDA reuses one shape relentlessly: 1/(x(xⁿ+1)). " +
    "Beyond that, two variations recur — substitute a trig expression first and THEN decompose, and the 'express the numerator using the denominator and its derivative' trick. " +
    "All three reduce to splitting, then integrating term by term.",
  concepts: [
    // 1 — decomposition + cover-up (foundation)
    {
      kind: "formula" as const,
      slug: "pf-decomposition-coverup",
      name: "Decomposition and the Cover-Up Method",
      intuition:
        "A proper rational function whose denominator factors can be rewritten as a sum of fractions, one per factor. The cover-up method reads off each numerator instantly by plugging in the root that kills the other factors.",
      definition:
        "For distinct linear factors,\n" +
        "\\[\\dfrac{p(x)}{(x-a)(x-b)} = \\dfrac{A}{x-a} + \\dfrac{B}{x-b}.\\]\n" +
        "**Cover-up:** to get \\(A\\), cover the \\((x-a)\\) factor and evaluate the rest at \\(x=a\\); likewise for \\(B\\) at \\(x=b\\). Each piece then integrates as \\(\\int \\dfrac{A}{x-a}\\,dx = A\\ln|x-a|\\). An irreducible quadratic factor \\(x^2+1\\) needs a numerator of the form \\(Cx+D\\) and integrates to a log plus an arctan.",
      formula: {
        label: "Linear-factor decomposition",
        latex:
          "\\dfrac{p(x)}{(x-a)(x-b)} = \\dfrac{A}{x-a} + \\dfrac{B}{x-b}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{(x-1)(x+2)}\\).",
        steps: [
          "Decompose: \\(\\dfrac{1}{(x-1)(x+2)} = \\dfrac{A}{x-1} + \\dfrac{B}{x+2}\\).",
          "Cover-up: \\(A = \\dfrac{1}{(1+2)} = \\tfrac13\\) (at \\(x=1\\)); \\(B = \\dfrac{1}{(-2-1)} = -\\tfrac13\\) (at \\(x=-2\\)).",
          "Integrate each: \\(\\tfrac13\\ln|x-1| - \\tfrac13\\ln|x+2|\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\ln\\left|\\dfrac{x-1}{x+2}\\right| + C\\)",
      },
      traps: [
        {
          title: "Decompose only a PROPER fraction",
          body:
            "If the numerator's degree is \\(\\geq\\) the denominator's, do polynomial division FIRST, then decompose the remainder. Skipping this gives a wrong split.",
        },
      ],
    },

    // 2 — the 1/(x(x^n+1)) family (PYQ 54e985e5)
    {
      kind: "formula" as const,
      slug: "pf-x-xn-plus-1-family",
      name: "The Recurring 1 over x times x-to-the-n-plus-1 Family",
      pyqExampleId: "54e985e5-1981-45b0-b53f-9dd59c37dd04",
      intuition:
        "This exact shape appears again and again in NDA papers. The trick is not classical partial fractions — multiply top and bottom by x-to-the-(n-1) to manufacture the derivative of the denominator, turning it into two log terms.",
      definition:
        "For \\(\\displaystyle\\int \\dfrac{dx}{x(x^n+1)}\\), multiply numerator and denominator by \\(x^{n-1}\\):\n" +
        "\\[\\int \\dfrac{x^{n-1}\\,dx}{x^n(x^n+1)}.\\]\n" +
        "Now \\(\\dfrac{1}{x^n(x^n+1)} = \\dfrac{1}{x^n} - \\dfrac{1}{x^n+1}\\) (a one-line split), and \\(x^{n-1}\\,dx = \\tfrac{1}{n}\\,d(x^n)\\). With \\(t=x^n\\) it becomes \\(\\dfrac{1}{n}\\int\\big(\\tfrac1t - \\tfrac{1}{t+1}\\big)dt\\), giving the standard answer\n" +
        "\\[\\dfrac{1}{n}\\ln\\left|\\dfrac{x^n}{x^n+1}\\right| + C.\\]",
      formula: {
        label: "Closed form for the family",
        latex:
          "\\int \\dfrac{dx}{x(x^n+1)} = \\dfrac{1}{n}\\ln\\left|\\dfrac{x^n}{x^n+1}\\right| + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{x(x^3+1)}\\).",
        steps: [
          "This is the family with \\(n=3\\).",
          "Apply the closed form directly: \\(\\dfrac{1}{n}\\ln\\left|\\dfrac{x^n}{x^n+1}\\right|\\) with \\(n=3\\).",
          "Substitute \\(n=3\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\ln\\left|\\dfrac{x^3}{x^3+1}\\right| + C\\)",
      },
      traps: [
        {
          title: "The 1 over n out front is easy to lose",
          body:
            "The coefficient is \\(\\dfrac{1}{n}\\), coming from \\(x^{n-1}dx = \\tfrac1n d(x^n)\\). For \\(n=7\\) the answer carries \\(\\tfrac17\\); the no-coefficient option is the planted distractor.",
        },
      ],
    },

    // 3 — substitute then decompose (PYQ 8501bf79, set S17)
    {
      kind: "formula" as const,
      slug: "pf-substitute-then-decompose",
      name: "Substitute First, Then Decompose",
      pyqExampleId: "8501bf79-09e0-4714-a8c5-0ebfbee2ac82",
      intuition:
        "A trig integrand can become a rational function in one substitution — then ordinary partial fractions finish it. The classic case is sine on top with a product of cosine-linear factors below: substitute u equals cosine.",
      definition:
        "For \\(\\displaystyle\\int \\dfrac{\\sin\\theta\\,d\\theta}{(2+\\cos\\theta)(3+4\\cos\\theta)}\\), put \\(u=\\cos\\theta\\), \\(du = -\\sin\\theta\\,d\\theta\\). The integral becomes \\(-\\displaystyle\\int \\dfrac{du}{(2+u)(3+4u)}\\), a rational function. Decompose \\(\\dfrac{1}{(2+u)(3+4u)} = \\dfrac{A'}{2+u} + \\dfrac{B'}{3+4u}\\) by cover-up, integrate to logs, then put \\(u=\\cos\\theta\\) back. " +
        "When the answer is written \\(A\\ln|2+\\cos\\theta| + B\\ln|3+4\\cos\\theta|\\), the \\(\\ln|3+4\\cos\\theta|\\) coefficient picks up an extra \\(\\tfrac14\\) from the chain factor inside that factor.",
      formula: {
        label: "Trig-to-rational substitution",
        latex:
          "\\int \\dfrac{\\sin\\theta\\,d\\theta}{f(\\cos\\theta)} = -\\int \\dfrac{du}{f(u)},\\quad u=\\cos\\theta",
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int \\dfrac{\\sin\\theta\\,d\\theta}{(1+\\cos\\theta)(2+\\cos\\theta)}\\).",
        steps: [
          "Let \\(u=\\cos\\theta\\), \\(du=-\\sin\\theta\\,d\\theta\\): integral \\(= -\\int \\dfrac{du}{(1+u)(2+u)}\\).",
          "Cover-up: \\(\\dfrac{1}{(1+u)(2+u)} = \\dfrac{1}{1+u} - \\dfrac{1}{2+u}\\).",
          "Integrate: \\(-\\big(\\ln|1+u| - \\ln|2+u|\\big)\\), then \\(u=\\cos\\theta\\) back.",
        ],
        answer:
          "\\(\\ln\\left|\\dfrac{2+\\cos\\theta}{1+\\cos\\theta}\\right| + C\\)",
      },
      traps: [
        {
          title: "Carry the minus from du, and the chain factor",
          body:
            "\\(u=\\cos\\theta\\) gives \\(du=-\\sin\\theta\\,d\\theta\\) — the leading minus stays. And a factor like \\(3+4\\cos\\theta\\) contributes a \\(\\tfrac14\\) to its log coefficient because \\(\\dfrac{d}{du}(3+4u)=4\\).",
        },
      ],
    },

    // 4 — numerator = A*denom + B*denom' (PYQ 2e67fa84, set S1)
    {
      kind: "formula" as const,
      slug: "pf-numerator-as-denominator-combo",
      name: "Express the Numerator via the Denominator and Its Derivative",
      pyqExampleId: "2e67fa84-a49a-4b6d-be0f-dab7143a5c87",
      intuition:
        "When both numerator and denominator are linear combinations of sine and cosine, you cannot use cover-up. Instead write the numerator as A times the denominator plus B times the denominator's derivative — then the integral splits into an x-term and a log-term.",
      definition:
        "For \\(\\displaystyle\\int \\dfrac{p\\cos x + q\\sin x}{a\\cos x + b\\sin x}\\,dx\\), set\n" +
        "\\[p\\cos x + q\\sin x = A\\,(a\\cos x + b\\sin x) + B\\,\\dfrac{d}{dx}(a\\cos x + b\\sin x).\\]\n" +
        "Match the \\(\\cos x\\) and \\(\\sin x\\) coefficients to solve the \\(2\\times 2\\) system for \\(A, B\\). Then\n" +
        "\\[\\int = A\\!\\int 1\\,dx + B\\!\\int \\dfrac{(\\text{denominator})'}{\\text{denominator}}\\,dx = A\\,x + B\\ln|a\\cos x + b\\sin x| + C,\\]\n" +
        "the second piece being the \\(f'/f\\) log pattern.",
      formula: {
        label: "Numerator as denom + derivative",
        latex:
          "N(x) = A\\,D(x) + B\\,D'(x)\\ \\Rightarrow\\ \\int \\dfrac{N}{D}\\,dx = A x + B\\ln|D| + C",
      },
      authoredExample: {
        prompt:
          "Express \\(5\\cos x + \\sin x\\) as \\(A(\\cos x + \\sin x) + B\\dfrac{d}{dx}(\\cos x + \\sin x)\\), and integrate \\(\\dfrac{5\\cos x + \\sin x}{\\cos x + \\sin x}\\).",
        steps: [
          "\\(\\dfrac{d}{dx}(\\cos x + \\sin x) = -\\sin x + \\cos x\\). So match \\(5\\cos x + \\sin x = A(\\cos x+\\sin x) + B(\\cos x - \\sin x)\\).",
          "Coefficients: \\(\\cos x\\): \\(A+B=5\\); \\(\\sin x\\): \\(A-B=1\\). Solve: \\(A=3,\\ B=2\\).",
          "Integrate: \\(A\\,x + B\\ln|\\cos x+\\sin x| = 3x + 2\\ln|\\cos x + \\sin x|\\).",
        ],
        answer: "\\(3x + 2\\ln|\\cos x + \\sin x| + C\\)",
      },
      traps: [
        {
          title: "Watch the sign in the denominator's derivative",
          body:
            "\\(\\dfrac{d}{dx}(2\\cos x + 5\\sin x) = -2\\sin x + 5\\cos x\\) — the cosine term's derivative is \\(-\\sin\\). A sign slip in the \\(2\\times2\\) system swaps \\(A\\) and \\(B\\), the exact distractor the paired items test.",
        },
      ],
    },
  ],
};
