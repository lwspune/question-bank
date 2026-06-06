import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONS_DOMAIN_RANGE_NOTE: SubtopicNote = {
  subtopicName: "Domain, Range, and Function Properties",
  title: "Domain, Range, and the Standard Properties",
  oneLineDefinition:
    "Find where a function is allowed to live (domain), what values it produces (range), and whether it is even, odd, or periodic.",
  whyItMatters:
    "The biggest slice of the chapter — 48 PYQs, and most are EASY or MODERATE. The recurring asks are " +
    "narrow and learnable: domain from square-roots / denominators / logs, range of a bounded rational " +
    "or quadratic-on-an-interval, even-vs-odd, and period. A few standard functions (modulus, reciprocal, " +
    "sign, exponential) show up again and again. Drill these and you bank the chapter's easy marks.",
  concepts: [
    // Foundation — reading domain/range off a graph
    {
      kind: "formula" as const,
      slug: "funcs-domain-range-from-graph",
      name: "Reading domain and range from a graph",
      intuition:
        "On a graph, the **domain** is the shadow the curve casts on the x-axis (how far left–right it " +
        "extends) and the **range** is its shadow on the y-axis (how far up–down). Sweep across, then sweep up.",
      definition:
        "**Domain** \\(=\\) set of \\(x\\)-values the graph covers; **range** \\(=\\) set of \\(y\\)-values it reaches. " +
        "A filled dot / solid edge includes the endpoint (closed); an open dot / asymptote excludes it (open). " +
        "Reading them off a sketch is often faster than algebra for standard curves.",
      visualizationSlug: "function-domain-range-graph",
      authoredExample: {
        prompt:
          "The graph of \\(f\\) is the upper semicircle of radius 2 centred at the origin. Domain and range?",
        steps: [
          "Horizontally the semicircle runs from \\(-2\\) to \\(2\\): domain \\([-2,2]\\).",
          "Vertically it runs from \\(0\\) (the ends) up to \\(2\\) (the top): range \\([0,2]\\).",
        ],
        answer: "Domain \\([-2,2]\\), range \\([0,2]\\).",
      },
      practiceSet: [
        { prompt: "Domain read off a graph spanning \\(x\\in[-1,3]\\)?", answer: "\\([-1,3]\\)" },
        { prompt: "An open dot at an endpoint means the value is …?", answer: "Excluded (open interval)" },
        { prompt: "Range of a horizontal line \\(y=4\\)?", answer: "\\(\\{4\\}\\)" },
        { prompt: "Domain shadow is cast on which axis?", answer: "The \\(x\\)-axis" },
      ],
    },

    // Finding domain
    {
      kind: "formula" as const,
      slug: "funcs-finding-domain",
      name: "Finding the domain (roots, denominators, logs)",
      intuition:
        "The domain is everything you are allowed to feed in. Three rules cover almost every NDA question: " +
        "**don't divide by zero**, **don't take an even root of a negative**, and **only take logs of positives**. " +
        "Apply each restriction and intersect.",
      definition:
        "- **Even root** \\(\\sqrt[\\text{even}]{g(x)}\\): need \\(g(x)\\ge 0\\).\n" +
        "- **Denominator**: need denominator \\(\\neq 0\\).\n" +
        "- **Logarithm** \\(\\log g(x)\\): need \\(g(x)>0\\); base must be \\(>0,\\neq1\\).\n" +
        "When several appear, the domain is the **intersection** of all the individual conditions.",
      authoredExample: {
        prompt: "Find the domain of \\(f(x)=\\dfrac{1}{\\sqrt{5-x}}\\).",
        steps: [
          "Square root needs \\(5-x\\ge 0\\Rightarrow x\\le 5\\).",
          "But it sits in a denominator, so it must be \\(\\neq 0\\): \\(5-x>0\\Rightarrow x<5\\) (strict).",
          "Combine: \\(x<5\\).",
        ],
        answer: "Domain \\(=(-\\infty,5)\\).",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(f(x)=\\dfrac{\\sqrt{x+1}}{x-3}\\).",
        steps: [
          "Root: \\(x+1\\ge0\\Rightarrow x\\ge-1\\).",
          "Denominator: \\(x-3\\neq0\\Rightarrow x\\neq3\\).",
          "Intersect: \\([-1,\\infty)\\) minus the point \\(3\\).",
        ],
        answer: "\\([-1,3)\\cup(3,\\infty)\\).",
      },
      traps: [
        {
          title: "≥ 0 under a plain root, but > 0 when the root is a denominator",
          body:
            "A root by itself allows equality (\\(\\sqrt{g}\\) needs \\(g\\ge0\\)). The moment that root is in a " +
            "**denominator** — e.g. \\(\\dfrac{1}{\\sqrt{|x|-x}}\\) — the value 0 is banned too, so you need the " +
            "**strict** inequality \\(g>0\\). Missing this flips a closed bracket to an open one and loses the mark.",
        },
      ],
      pyqExampleId: "0966e9fe-7685-461b-b63a-2f75a36f780d", // 2019 — domain of √((2−x)(x−3)) = [2,3]
    },

    // Finding range
    {
      kind: "formula" as const,
      slug: "funcs-finding-range",
      name: "Finding the range",
      intuition:
        "The range is the set of outputs. For bounded rationals, solve for \\(x\\) in terms of \\(y\\) and ask " +
        "which \\(y\\) keep \\(x\\) real; for a quadratic on an interval, use the vertex and endpoints; for " +
        "sine/cosine combinations, bound the amplitude.",
      definition:
        "Common techniques:\n" +
        "- **Solve for \\(x\\)**: rearrange \\(y=f(x)\\) to \\(x=\\dots\\); the range is the \\(y\\) for which \\(x\\) is real/in-domain.\n" +
        "- **Quadratic on an interval**: check the vertex and the endpoints; mind whether endpoints are included.\n" +
        "- **\\(a\\sin x+b\\cos x+c\\)** lies in \\([c-\\sqrt{a^2+b^2},\\,c+\\sqrt{a^2+b^2}]\\).",
      authoredExample: {
        prompt: "Find the range of \\(f(x)=\\dfrac{1}{1+x^2}\\), \\(x\\in\\mathbb{R}\\).",
        steps: [
          "\\(1+x^2\\ge 1\\), and it grows without bound as \\(|x|\\to\\infty\\).",
          "So the denominator runs over \\([1,\\infty)\\), hence \\(f=\\dfrac{1}{1+x^2}\\) runs over \\((0,1]\\).",
          "Max \\(1\\) at \\(x=0\\) (attained); \\(0\\) is approached but never reached.",
        ],
        answer: "Range \\(=(0,1]\\).",
      },
      selfCheckExample: {
        prompt: "Find the range of \\(f(x)=x^2-4x+5\\) on the open interval \\((1,4)\\).",
        steps: [
          "Complete the square: \\(f(x)=(x-2)^2+1\\); vertex minimum \\(1\\) at \\(x=2\\) (inside the interval, attained).",
          "Endpoints (open, not attained): \\(f(1)=2\\), \\(f(4)=5\\); the larger side reaches up toward \\(5\\).",
          "So values run from the minimum \\(1\\) up to but not including \\(5\\).",
        ],
        answer: "\\([1,5)\\).",
      },
      traps: [
        {
          title: "Range is not the codomain",
          body:
            "If a question declares \\(f:\\mathbb{R}\\to\\mathbb{R}\\) but the outputs only fill \\([0,1)\\), the " +
            "**range** is \\([0,1)\\) — not \\(\\mathbb{R}\\). 'Onto' questions are really 'shrink the codomain to the range' questions.",
        },
      ],
      pyqExampleId: "25ecae02-2b44-4241-9486-1b5dfd8a244a", // 2018 — range of x²/(1+x²) = [0,1)
    },

    // Even and odd
    {
      kind: "formula" as const,
      slug: "funcs-even-and-odd",
      name: "Even and odd functions",
      intuition:
        "An **even** function is mirror-symmetric about the y-axis (\\(f(-x)=f(x)\\)); an **odd** function has " +
        "half-turn symmetry about the origin (\\(f(-x)=-f(x)\\)). Most functions are **neither** — only special ones qualify.",
      definition:
        "- **Even:** \\(f(-x)=f(x)\\) for all \\(x\\) (e.g. \\(x^2,\\ \\cos x,\\ |x|\\)).\n" +
        "- **Odd:** \\(f(-x)=-f(x)\\) for all \\(x\\) (e.g. \\(x^3,\\ \\sin x,\\ x\\)). An odd function defined at 0 has \\(f(0)=0\\).\n" +
        "- Test by computing \\(f(-x)\\) and comparing. If it matches neither, the function is **neither**.",
      visualizationSlug: "even-odd-symmetry",
      authoredExample: {
        prompt: "Classify \\(f(x)=x^3-x\\) as even, odd, or neither.",
        steps: [
          "Compute \\(f(-x)=(-x)^3-(-x)=-x^3+x\\).",
          "Factor: \\(-x^3+x=-(x^3-x)=-f(x)\\).",
          "Matches the odd condition \\(f(-x)=-f(x)\\).",
        ],
        answer: "Odd.",
      },
      selfCheckExample: {
        prompt: "Classify \\(f(x)=|x|-x^3\\).",
        steps: [
          "\\(f(-x)=|-x|-(-x)^3=|x|+x^3\\).",
          "This is neither \\(f(x)=|x|-x^3\\) nor \\(-f(x)=-|x|+x^3\\).",
        ],
        answer: "Neither even nor odd.",
      },
      traps: [
        {
          title: "\\(f(0)=0\\) is necessary for odd, not sufficient",
          body:
            "Many odd functions pass through the origin, but passing through the origin does not make a function " +
            "odd — you must verify \\(f(-x)=-f(x)\\) for **all** \\(x\\). And a sum like even + odd is usually neither.",
        },
      ],
      pyqExampleId: "27ac52bc-dfa8-4db9-a18e-fb4f9913a30e", // 2022 — ln(x+√(1+x²)) is odd, f(x)+f(−x)=0
    },

    // Periodicity
    {
      kind: "formula" as const,
      slug: "funcs-periodicity",
      name: "Periodic functions and their period",
      intuition:
        "A periodic function repeats: its graph is one tile copied endlessly. The **period** is the width of the " +
        "smallest tile. For combinations you scale the base period, then take the LCM.",
      definition:
        "\\(f\\) is **periodic** with period \\(T>0\\) if \\(f(x+T)=f(x)\\) for all \\(x\\); the smallest such \\(T\\) is " +
        "**the** period.\n" +
        "- \\(\\sin x,\\cos x\\): period \\(2\\pi\\); \\(\\tan x\\): period \\(\\pi\\).\n" +
        "- \\(\\sin(kx)\\) has period \\(\\tfrac{2\\pi}{|k|}\\); \\(\\sin^2 x\\) has period \\(\\pi\\).\n" +
        "- Period of a **sum** is the LCM of the individual periods.",
      formula: {
        label: "Period after scaling the argument",
        latex: "\\text{period of }\\sin(kx)=\\frac{2\\pi}{|k|},\\qquad \\text{period of }\\tan(kx)=\\frac{\\pi}{|k|}",
      },
      authoredExample: {
        prompt: "Find the period of \\(f(x)=\\cos\\!\\left(\\dfrac{x}{2}\\right)\\).",
        steps: [
          "\\(\\cos(kx)\\) has period \\(\\dfrac{2\\pi}{|k|}\\); here \\(k=\\tfrac12\\).",
          "Period \\(=\\dfrac{2\\pi}{1/2}=4\\pi\\).",
        ],
        answer: "\\(4\\pi\\).",
      },
      selfCheckExample: {
        prompt: "Find the period of \\(f(x)=\\sin 2x+\\cos 3x\\).",
        steps: [
          "Period of \\(\\sin 2x\\) is \\(\\pi\\); period of \\(\\cos 3x\\) is \\(\\tfrac{2\\pi}{3}\\).",
          "Period of the sum is \\(\\operatorname{LCM}\\!\\left(\\pi,\\tfrac{2\\pi}{3}\\right)=2\\pi\\).",
        ],
        answer: "\\(2\\pi\\).",
      },
      pyqExampleId: "c95aa5a9-87d2-4b80-9ad3-6ebaa206443a", // 2021 — period of ln(2+sin²x) = π
    },

    // Modulus function
    {
      kind: "formula" as const,
      slug: "funcs-modulus-function",
      name: "The modulus function and distance",
      intuition:
        "\\(|x|\\) measures distance from 0, so it is never negative and its V-shaped graph bounces off the x-axis " +
        "at the origin. Sums of moduli like \\(|x-a|+|x-b|\\) read as **total distance** to two points — minimised " +
        "anywhere between them.",
      definition:
        "\\(|x|=x\\) for \\(x\\ge0\\) and \\(-x\\) for \\(x<0\\); it is **even**, with range \\([0,\\infty)\\).\n" +
        "- \\(x+|x|=0\\) for \\(x<0\\) and \\(2x\\) for \\(x\\ge0\\) — range \\([0,\\infty)\\).\n" +
        "- \\(|x-a|+|x-b|\\) (with \\(a<b\\)) has minimum value \\(b-a\\), attained for all \\(x\\in[a,b]\\).",
      authoredExample: {
        prompt: "Find the minimum value of \\(f(x)=|x-1|+|x-5|\\).",
        steps: [
          "Read it as the total distance from \\(x\\) to \\(1\\) and to \\(5\\).",
          "That total is smallest when \\(x\\) lies between them; then it equals the gap \\(5-1=4\\).",
          "(For \\(x\\) outside \\([1,5]\\) the total only grows.)",
        ],
        answer: "Minimum value \\(=4\\), attained for all \\(x\\in[1,5]\\).",
      },
      traps: [
        {
          title: "\\(|x|\\) is even, never odd",
          body:
            "\\(|-x|=|x|\\), so the modulus is even. Combinations like \\(|x|-x^3\\) mix an even and an odd part and " +
            "end up **neither**. Also: \\(\\sqrt{x^2}=|x|\\), not \\(x\\) — a common sign slip.",
        },
      ],
      pyqExampleId: "7535cf61-10a4-4f8d-a8d5-34cae406c3f5", // 2023 — range of x+|x| = [0,∞)
    },

    // Standard functions and graphs
    {
      kind: "formula" as const,
      slug: "funcs-standard-functions-graphs",
      name: "Standard functions and their graphs",
      intuition:
        "A handful of standard shapes recur: the reciprocal \\(1/x\\) (two branches, asymptotes), the sign " +
        "function \\(x/|x|\\) (a step of \\(\\pm1\\)), and the exponential \\(a^x\\) (domain all reals, positive output). " +
        "Knowing each one's domain, range and asymptotes answers most graph questions on sight.",
      definition:
        "- **Reciprocal** \\(\\dfrac{1}{x-a}\\): domain \\(x\\neq a\\), range \\(y\\neq0\\); vertical asymptote \\(x=a\\), horizontal \\(y=0\\).\n" +
        "- **Sign** \\(\\dfrac{x}{|x|}\\): equals \\(+1\\) for \\(x>0\\), \\(-1\\) for \\(x<0\\); undefined at 0.\n" +
        "- **Exponential** \\(a^x\\,(a>0)\\): domain \\(\\mathbb{R}\\), range \\((0,\\infty)\\), continuous and differentiable everywhere.",
      authoredExample: {
        prompt:
          "State the domain, range and asymptotes of \\(f(x)=\\dfrac{1}{x+2}\\).",
        steps: [
          "Denominator zero at \\(x=-2\\): domain \\(\\mathbb{R}\\setminus\\{-2\\}\\).",
          "It never outputs 0: range \\(\\mathbb{R}\\setminus\\{0\\}\\).",
          "Vertical asymptote \\(x=-2\\); horizontal asymptote \\(y=0\\).",
        ],
        answer: "Domain \\(x\\neq-2\\), range \\(y\\neq0\\); asymptotes \\(x=-2\\) and \\(y=0\\).",
      },
      practiceSet: [
        { prompt: "Domain of \\(3^x\\)?", answer: "\\((-\\infty,\\infty)\\)" },
        { prompt: "Range of \\(10^x\\)?", answer: "\\((0,\\infty)\\)" },
        { prompt: "Value of \\(\\dfrac{x}{|x|}\\) at \\(x=-4\\)?", answer: "\\(-1\\)" },
        { prompt: "Vertical asymptote of \\(\\dfrac{1}{x-1}\\)?", answer: "\\(x=1\\)" },
      ],
      pyqExampleId: "c6bc0dd2-78ca-4675-b5a1-351bcc921465", // 2020 — graph of y = 1/(x−1)
    },
  ],
};
