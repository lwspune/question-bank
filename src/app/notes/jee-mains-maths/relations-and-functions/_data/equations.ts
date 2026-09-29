import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATIONS_FN_NOTE: SubtopicNote = {
  subtopicName: "Functional Equations",
  title: "Functional Equations",
  oneLineDefinition:
    "Equations for an unknown function: additive and multiplicative rules such as f(x + y) = f(x) + f(y), equations in f(x) and f(1/x) solved by a second substitution, and sums that pair up because f(x) + f(a − x) is constant.",
  whyItMatters:
    "Twenty PYQs. Each gives a rule the function obeys rather than a formula, and asks for a value or a sum. Three moves settle almost all of them: put in convenient numbers, substitute to get a second equation, or pair terms from the two ends of a sum. Three ideas cover the page.",
  concepts: [
    // C1 — additive and multiplicative
    {
      kind: "formula" as const,
      slug: "jfn-cauchy",
      name: "Additive and multiplicative rules",
      intuition:
        "On natural numbers, \\(f(x+y)=f(x)+f(y)\\) gives \\(f(n)=nf(1)\\), and \\(f(x+y)=f(x)f(y)\\) gives \\(f(n)=f(1)^n\\). When extra terms appear, as in \\(f(x+y)=f(x)+f(y)+2xy\\), put \\(x=y=0\\) first to get \\(f(0)\\), then either step \\(y=1\\) repeatedly or assume the polynomial form the question states and match coefficients. \\(f(x+y)+f(x-y)=2f(x)f(y)\\) has cosine-type solutions.",
      definition:
        "- \\(f(x+y)=f(x)+f(y)\\Rightarrow f(n)=nf(1)\\), \\(f(0)=0\\).\n" +
        "- \\(f(x+y)=f(x)f(y)\\), \\(f\\ne0\\) \\(\\Rightarrow f(n)=f(1)^n\\), \\(f(0)=1\\).\n" +
        "- **Extra terms:** \\(x=y=0\\) first, then match coefficients.\n" +
        "- \\(f(x+y)+f(x-y)=2f(x)f(y)\\): \\(f(x)=\\cos(cx)\\) type.",
      formula: {
        label: "Additive rule",
        latex: "f(x+y)=f(x)+f(y)\\ \\Rightarrow\\ f(n)=n\\,f(1)",
      },
      authoredExample: {
        prompt: "\\(f(x+y)=f(x)+f(y)\\) on \\(\\mathbb N\\) and \\(f(1)=4\\). Find \\(\\sum_{k=1}^{5}f(k)\\).",
        steps: [
          "\\(f(k)=4k\\), so the sum is \\(4\\cdot15\\).",
        ],
        answer: "\\(60\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x+y)=f(x)+f(y)+2xy\\) and \\(f(1)=3\\). Find \\(f(3)\\).",
        steps: [
          "\\(f(x)=x^2+cx\\) fits; \\(f(1)=1+c=3\\), so \\(c=2\\).",
        ],
        answer: "\\(f(3)=15\\).",
      },
      practiceSet: [
        { prompt: "\\(f(m+n)=f(m)+f(n)\\), \\(f(4)=12\\). \\(f(1)\\)?", answer: "\\(3\\)" },
        { prompt: "\\(f(x+y)=f(x)f(y)\\), \\(f(1)=2\\). \\(f(5)\\)?", answer: "\\(32\\)" },
        { prompt: "\\(f(x+y)=f(x)+f(y)\\): \\(f(0)\\)?", answer: "\\(0\\)" },
        { prompt: "\\(f(x+y)=f(x)f(y)\\), \\(f\\ne0\\): \\(f(0)\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "241602d5-a128-433c-aca1-478da494f5f6", // 2021 — f(m+n) = f(m) + f(n), f(6) = 18, find f(2)f(3)
      traps: [
        {
          title: "A constant term changes f(0)",
          body: "In \\(f(x+y)=f(x)+f(y)+c\\), putting \\(x=y=0\\) gives \\(f(0)=-c\\), not 0. Find it before using any pattern.",
        },
      ],
    },

    // C2 — substitute and solve
    {
      kind: "formula" as const,
      slug: "jfn-substitute",
      name: "Substitute again, then solve the pair",
      intuition:
        "When the equation links \\(f(x)\\) with \\(f(g(x))\\) and \\(g(g(x))=x\\), as for \\(\\frac1x\\), \\(\\frac kx\\) or \\(1-x\\), replace \\(x\\) by \\(g(x)\\). That gives a second equation in the same two unknowns; solve the pair as simultaneous equations. A map that returns only after three steps, like \\(\\frac1{1-x}\\), needs three equations. A polynomial with \\(f(x)f\\left(\\frac1x\\right)=f(x)+f\\left(\\frac1x\\right)\\) is \\(1\\pm x^n\\).",
      definition:
        "- **Partner maps** (\\(g\\circ g=\\mathrm{id}\\)): \\(\\frac1x\\), \\(\\frac kx\\), \\(1-x\\), \\(-x\\).\n" +
        "- Replace \\(x\\) by \\(g(x)\\); eliminate \\(f(g(x))\\) between the two equations.\n" +
        "- \\(f(x)f\\left(\\frac1x\\right)=f(x)+f\\left(\\frac1x\\right)\\), \\(f\\) a polynomial \\(\\Rightarrow f(x)=1\\pm x^n\\).",
      formula: {
        label: "Two equations, two unknowns",
        latex: "af(x)+bf\\big(g(x)\\big)=h(x),\\quad af\\big(g(x)\\big)+bf(x)=h\\big(g(x)\\big)",
      },
      authoredExample: {
        prompt: "\\(2f(x)+f\\left(\\frac1x\\right)=3x\\). Find \\(f(2)\\).",
        steps: [
          "Replace \\(x\\) by \\(\\frac1x\\): \\(2f\\left(\\frac1x\\right)+f(x)=\\frac3x\\).",
          "Twice the first minus the second: \\(3f(x)=6x-\\frac3x\\), so \\(f(x)=2x-\\frac1x\\).",
        ],
        answer: "\\(f(2)=\\frac72\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)+2f(1-x)=x\\). Find \\(f(0)\\).",
        steps: [
          "Replace \\(x\\) by \\(1-x\\): \\(f(1-x)+2f(x)=1-x\\).",
          "Twice this minus the first: \\(3f(x)=2-3x\\).",
        ],
        answer: "\\(f(0)=\\frac23\\).",
      },
      practiceSet: [
        { prompt: "The partner substitution for \\(f(x)\\) and \\(f\\left(\\frac4x\\right)\\)?", answer: "\\(x\\to\\frac4x\\)" },
        { prompt: "One solution of \\(f(x)+f\\left(\\frac1x\\right)=x+\\frac1x\\)?", answer: "\\(f(x)=x\\)" },
        { prompt: "Polynomial with \\(f(x)f\\left(\\frac1x\\right)=f(x)+f\\left(\\frac1x\\right)\\), \\(f(2)=9\\)?", answer: "\\(1+x^3\\)" },
        { prompt: "A partner map other than \\(\\frac1x\\)?", answer: "\\(1-x\\) (or \\(-x\\), \\(\\frac kx\\))" },
      ],
      pyqExampleId: "10695848-bf28-4f27-97b8-d51021eeec05", // 2025 — f(x) + 3f(24/x) = 4x, find f(3) + f(8)
      traps: [
        {
          title: "A sum may need no solving",
          body: "If the question asks for \\(f(a)+f(b)\\) where \\(b\\) is \\(a\\)'s partner, putting \\(x=a\\) and \\(x=b\\) and adding the two equations can give it directly, without finding \\(f\\).",
        },
      ],
    },

    // C3 — pairing sums
    {
      kind: "formula" as const,
      slug: "jfn-pair-sums",
      name: "Pairing terms when f(x) + f(a − x) is constant",
      intuition:
        "Sums like \\(f\\left(\\frac1n\\right)+f\\left(\\frac2n\\right)+\\dots+f\\left(\\frac{n-1}n\\right)\\) are set up to pair: check whether \\(f(x)+f(a-x)\\) is a constant, with \\(a\\) the sum of the first and last inputs. Then add the terms in pairs from the two ends. With an odd number of terms the middle one is left over, and it equals half the constant.",
      definition:
        "- \\(f(x)=\\frac{b^x}{b^x+\\sqrt b}\\Rightarrow f(x)+f(1-x)=1\\).\n" +
        "- \\(m\\) terms paired: \\(\\frac m2\\times\\) constant.\n" +
        "- Middle term \\(f\\left(\\frac a2\\right)=\\frac12\\times\\) constant.",
      formula: {
        label: "The standard pair",
        latex: "f(x)=\\frac{b^x}{b^x+\\sqrt b}\\ \\Rightarrow\\ f(x)+f(1-x)=1",
      },
      authoredExample: {
        prompt: "\\(f(x)=\\frac{4^x}{4^x+2}\\). Find \\(\\sum_{k=1}^{9}f\\left(\\frac k{10}\\right)\\).",
        steps: [
          "\\(f(x)+f(1-x)=1\\): four pairs, plus \\(f\\left(\\frac12\\right)=\\frac12\\).",
        ],
        answer: "\\(\\frac92\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\frac{9^x}{9^x+3}\\). Find \\(\\sum_{k=1}^{5}f\\left(\\frac k6\\right)\\).",
        steps: [
          "Two pairs, plus \\(f\\left(\\frac12\\right)=\\frac12\\).",
        ],
        answer: "\\(\\frac52\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)+f(1-x)=1\\): \\(\\sum_{k=1}^{19}f\\left(\\frac k{20}\\right)\\)?", answer: "\\(\\frac{19}2\\)" },
        { prompt: "\\(f(x)=\\frac{b^x}{b^x+\\sqrt b}\\): \\(f\\left(\\frac12\\right)\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "Pairs in \\(f\\left(\\frac1{11}\\right)+\\dots+f\\left(\\frac{10}{11}\\right)\\)?", answer: "\\(5\\)" },
        { prompt: "\\(f(x)+f(2-x)=1\\). \\(f(1)\\)?", answer: "\\(\\frac12\\)" },
      ],
      pyqExampleId: "701547a2-92a2-4692-b2fd-9e13be09ae93", // 2025 — f = 2^x/(2^x + sqrt 2), sum of f(k/82) for k = 1..81
      traps: [
        {
          title: "Count the terms",
          body: "An odd number of terms leaves a middle term unpaired. Add it separately; forgetting it is the usual gap between two options.",
        },
      ],
    },
  ],
};
