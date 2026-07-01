import type { SubtopicNote } from "@/app/notes/_types";

export const INCREASING_DECREASING_NOTE: SubtopicNote = {
  subtopicName: "Increasing and Decreasing Functions",
  title: "Increasing and Decreasing Functions",
  oneLineDefinition:
    "The sign of the derivative decides where a function rises or falls: f prime greater than zero means increasing, f prime less than zero means decreasing. Find where f prime is zero, split the line, and sign-test each piece.",
  whyItMatters:
    "This is the workhorse subtopic of the chapter — 29 PYQs sit directly here (9 HARD, 14 MODERATE, 6 EASY). The moves recur exactly: factor a cubic's f prime and read intervals, use a discriminant to prove f prime keeps one sign, take a rational or rational-trig quotient down to a constant-sign ad minus bc condition, or run a chain-rule sign analysis on a product with exp or log. " +
    "The recurring MHT-CET traps live here too: the decreasing case needs f prime LESS than zero (so a rational quotient decreasing forces ad minus bc less than zero, not greater), an interval option must be a SUBSET of the true monotonic set, and a strictly-increasing cubic needs its quadratic f prime to have negative discriminant.",
  concepts: [
    // 1 — foundation: the sign chart of f' (no pyqExampleId, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetaod-sign-chart-monotonicity",
      name: "The Sign of the Derivative Decides Monotonicity",
      visualizationSlug: "aod-sign-of-derivative",
      intuition:
        "Where the tangent slopes up the curve rises; where it slopes down the curve falls. So the sign of \\(f'(x)\\) on an interval — not the size or sign of \\(f\\) itself — is what decides whether \\(f\\) is increasing or decreasing there. The whole subtopic reduces to building the sign chart of \\(f'\\).",
      definition:
        "On an interval \\(I\\):\n" +
        "- \\(f'(x) > 0\\) for all \\(x \\in I \\Rightarrow f\\) is **strictly increasing** on \\(I\\).\n" +
        "- \\(f'(x) < 0\\) for all \\(x \\in I \\Rightarrow f\\) is **strictly decreasing** on \\(I\\).\n" +
        "**Method (the sign chart):** solve \\(f'(x) = 0\\) (and note where \\(f'\\) is undefined); these **critical points** split the number line into intervals. Test the sign of \\(f'\\) in each interval — a factored form like \\((x-a)(x-b)(x-c)\\) flips sign at each simple root. Where \\(f'\\) is \\(+\\), \\(f\\) increases; where \\(-\\), it decreases.",
      formula: {
        label: "Monotonicity from the sign of f prime",
        latex:
          "f'(x) > 0 \\;\\Rightarrow\\; f \\text{ increasing}, \\qquad f'(x) < 0 \\;\\Rightarrow\\; f \\text{ decreasing}",
        symbols: [
          { symbol: "f'(x)", meaning: "the slope of the tangent at \\(x\\) — its SIGN is all that matters" },
        ],
      },
      authoredExample: {
        prompt: "On which intervals is \\(f(x) = x^3 - 12x + 5\\) increasing, and on which decreasing?",
        steps: [
          "\\(f'(x) = 3x^2 - 12 = 3(x-2)(x+2)\\).",
          "Critical points where \\(f'=0\\): \\(x = -2\\) and \\(x = 2\\); they split the line into three pieces.",
          "Sign-test \\(f'\\): on \\((-\\infty,-2)\\) it is \\(+\\); on \\((-2,2)\\) it is \\(-\\); on \\((2,\\infty)\\) it is \\(+\\).",
        ],
        answer:
          "Increasing on \\((-\\infty,-2)\\) and \\((2,\\infty)\\); decreasing on \\((-2,2)\\).",
      },
      selfCheckExample: {
        prompt: "Find where \\(f(x) = 2x^3 - 3x^2 - 12x + 1\\) is decreasing.",
        steps: [
          "\\(f'(x) = 6x^2 - 6x - 12 = 6(x-2)(x+1)\\).",
          "\\(f' < 0\\) between the roots \\(x = -1\\) and \\(x = 2\\).",
        ],
        answer: "Decreasing on \\((-1,2)\\).",
      },
      practiceSet: [
        { prompt: "\\(f'(x) < 0\\) on an interval means \\(f\\) is?", answer: "Strictly decreasing" },
        { prompt: "First step to find monotonic intervals?", answer: "Solve \\(f'(x)=0\\), then sign-test each piece" },
        { prompt: "\\(f(x)=x^2-4x\\): where is \\(f'=0\\)?", answer: "\\(x = 2\\) (increasing after, decreasing before)" },
        { prompt: "Where is \\(f(x)=x^3-3x\\) decreasing?", answer: "\\((-1,1)\\)", method: "\\(f'=3(x-1)(x+1)<0\\) between the roots" },
      ],
      traps: [
        {
          title: "Monotonicity is decided by the sign of \\(f'\\), not by \\(f\\)",
          body:
            "\\(f\\) increasing \\(\\iff f'(x) \\ge 0\\) on the interval; decreasing \\(\\iff f'(x) \\le 0\\). A large or positive VALUE of \\(f\\) tells you nothing — read the sign of the DERIVATIVE. Build the sign chart of \\(f'\\) piece by piece between its zeros.",
        },
      ],
    },

    // 2 — polynomial monotonicity via factored f'(x)
    {
      kind: "formula" as const,
      slug: "cetaod-polynomial-factored-derivative",
      name: "Polynomial Monotonicity via a Factored Derivative",
      intuition:
        "For a polynomial, \\(f'\\) is a lower-degree polynomial that factors. Once \\(f'\\) is in factored form, its roots are the only places the sign can change, and a product of linear factors flips sign at each simple root. So factor \\(f'\\), mark its roots, and alternate signs across the line.",
      definition:
        "For \\(f\\) a polynomial:\n" +
        "- Compute \\(f'(x)\\) and **factor it fully** into linear (and irreducible-quadratic) factors.\n" +
        "- The **simple** real roots of \\(f'\\) are the sign-change points. A product like \\((x-a)(x-b)(x-c)\\) is \\(+\\) to the right of the largest root and alternates as you cross each root going left.\n" +
        "- A **squared** factor (double root) does NOT change sign — it touches zero and keeps the same sign on both sides.\n" +
        "Read off the increasing (\\(f'>0\\)) and decreasing (\\(f'<0\\)) intervals directly from the chart.",
      formula: {
        label: "Cubic derivative factors to a quadratic",
        latex:
          "f(x) = ax^3 + \\dots \\;\\Rightarrow\\; f'(x) = 3a\\,(x - r_1)(x - r_2)",
        symbols: [
          { symbol: "r_1, r_2", meaning: "roots of \\(f'\\); the sign of \\(f'\\) flips at each simple root" },
        ],
      },
      authoredExample: {
        prompt: "For what \\(x\\) is \\(f(x) = x^3 - 3x^2 - 9x + 4\\) increasing?",
        steps: [
          "\\(f'(x) = 3x^2 - 6x - 9 = 3(x-3)(x+1)\\).",
          "Roots \\(x = -1, 3\\). Sign of the product: \\(+\\) on \\((-\\infty,-1)\\), \\(-\\) on \\((-1,3)\\), \\(+\\) on \\((3,\\infty)\\).",
          "Increasing where \\(f' > 0\\).",
        ],
        answer: "Increasing on \\((-\\infty,-1)\\) and \\((3,\\infty)\\).",
      },
      selfCheckExample: {
        prompt: "Find the set where \\(f(x) = [x(x-2)]^2\\) is increasing.",
        steps: [
          "Write \\(f(x) = x^2(x-2)^2\\). Then \\(f'(x) = 2x(x-2)^2 + x^2 \\cdot 2(x-2) = 2x(x-2)(2x-2) = 4x(x-1)(x-2)\\).",
          "Three simple roots \\(0, 1, 2\\). Sign of \\(x(x-1)(x-2)\\): \\(-,+,-,+\\) across \\((-\\infty,0),(0,1),(1,2),(2,\\infty)\\).",
          "Increasing where \\(f' > 0\\), i.e. on \\((0,1) \\cup (2,\\infty)\\).",
        ],
        answer: "Increasing on \\((0,1) \\cup (2,\\infty)\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=2x^3-6x+5\\): increasing set?", answer: "\\(x<-1\\) or \\(x>1\\)", method: "\\(f'=6(x-1)(x+1)>0\\)" },
        { prompt: "\\(f(x)=x^3-6x^2+9x+3\\): decreasing set?", answer: "\\((1,3)\\)", method: "\\(f'=3(x-1)(x-3)<0\\)" },
        { prompt: "\\(f(x)=x^3+6x^2-36x+7\\): increasing set?", answer: "\\((-\\infty,-6)\\cup(2,\\infty)\\)", method: "\\(f'=3(x+6)(x-2)\\)" },
        { prompt: "Does a squared factor of \\(f'\\) change its sign?", answer: "No — a double root touches zero without flipping sign" },
      ],
      pyqExampleId: "daadb95c-75b7-4de4-bdc9-d58827bcde05", // 2x^3-9x^2+12x+2 decreasing in (1,2)
      traps: [
        {
          title: "An option must be a SUBSET of the true monotonic set",
          body:
            "For \\(f(x)=\\dfrac{x}{2}+\\dfrac{2}{x}\\) the true decreasing set is \\((-2,0)\\cup(0,2)\\). The correct MHT-CET option is \\((1,2)\\) — not because that is the whole set, but because it is a valid SUBSET on which \\(f\\) decreases. Test each option for 'is this interval inside the monotonic set?', not 'does this equal the full set?'.",
        },
        {
          title: "Factor \\(f'\\) before reading signs",
          body:
            "Trying to sign-test \\(f'\\) without factoring invites arithmetic slips. Always factor \\(f'(x)\\) fully first; the roots are the only sign-change points, and a clean factored product makes the alternating-sign chart automatic.",
        },
      ],
    },

    // 3 — discriminant test: a>0, D<0 ⇒ f'>0 everywhere
    {
      kind: "formula" as const,
      slug: "cetaod-discriminant-strictly-monotonic",
      name: "Discriminant Test for a Strictly Monotonic Cubic",
      intuition:
        "If \\(f'\\) is a quadratic that never crosses zero, it can never change sign — so \\(f\\) is monotonic on the whole real line. A quadratic with positive leading coefficient and negative discriminant stays strictly positive everywhere, forcing \\(f\\) to be strictly increasing.",
      definition:
        "For a cubic \\(f\\), \\(f'(x) = Ax^2 + Bx + C\\) (with \\(A > 0\\)). Then:\n" +
        "- **Discriminant \\(B^2 - 4AC < 0\\)** \\(\\Rightarrow f'\\) has no real roots \\(\\Rightarrow f'(x) > 0\\) for all \\(x\\) \\(\\Rightarrow f\\) is **strictly increasing on \\(\\mathbb{R}\\)** (no turning points).\n" +
        "- Symmetrically, \\(A<0\\) with \\(B^2-4AC<0\\) gives \\(f'<0\\) everywhere (strictly decreasing).\n" +
        "This is the standard way to prove 'increasing throughout the real line' or to impose 'no local extremum' as a parameter condition.",
      formula: {
        label: "Strictly increasing everywhere",
        latex:
          "f'(x) = Ax^2 + Bx + C,\\ A > 0,\\ B^2 - 4AC < 0 \\;\\Rightarrow\\; f'(x) > 0 \\ \\forall x",
        symbols: [
          { symbol: "B^2 - 4AC", meaning: "discriminant of \\(f'\\); negative means \\(f'\\) never touches zero" },
        ],
      },
      authoredExample: {
        prompt: "Show that \\(f(x) = x^3 - 10x^2 + 200x - 10\\) is increasing throughout \\(\\mathbb{R}\\).",
        steps: [
          "\\(f'(x) = 3x^2 - 20x + 200\\).",
          "Discriminant \\(= (-20)^2 - 4(3)(200) = 400 - 2400 = -2000 < 0\\).",
          "Leading coefficient \\(3 > 0\\) and no real roots, so \\(f'(x) > 0\\) for every \\(x\\).",
        ],
        answer: "\\(f\\) is strictly increasing on the whole real line.",
      },
      selfCheckExample: {
        prompt:
          "If \\(f(x) = x^3 + bx^2 + cx + d\\) with \\(0 < b^2 < c\\), what can you say about \\(f\\) on \\((-\\infty,\\infty)\\)?",
        steps: [
          "\\(f'(x) = 3x^2 + 2bx + c\\). Discriminant \\(= 4b^2 - 12c = 4(b^2 - 3c)\\).",
          "Since \\(c > b^2 > 0\\), we have \\(b^2 - 3c < b^2 - 3b^2 = -2b^2 < 0\\), so the discriminant is negative.",
          "Leading coefficient \\(3 > 0\\) and no real roots \\(\\Rightarrow f'(x) > 0\\) for all \\(x\\).",
        ],
        answer: "\\(f\\) is a strictly increasing function on \\(\\mathbb{R}\\).",
      },
      practiceSet: [
        { prompt: "\\(f'(x)=3x^2-20x+200\\): sign for all \\(x\\)?", answer: "Always positive (discriminant \\(-2000<0\\))" },
        { prompt: "Cubic strictly increasing on \\(\\mathbb{R}\\) needs \\(f'\\) (a quadratic) to have?", answer: "Negative discriminant and \\(A>0\\)" },
        { prompt: "\\(3x^2+2bx+c\\), \\(0<b^2<c\\): sign of discriminant?", answer: "Negative", method: "\\(4(b^2-3c)<0\\)" },
        { prompt: "\\(A>0\\), \\(B^2-4AC<0\\): does the cubic have any local extremum?", answer: "No — \\(f'\\) never changes sign" },
      ],
      pyqExampleId: "ce8db059-5e86-4fcc-a83a-8e8d37616a01", // x^3-10x^2+200x-10 increasing throughout
      traps: [
        {
          title: "'Increasing throughout' is a discriminant statement, not an interval statement",
          body:
            "When the options include 'increasing throughout the real line', check the discriminant of \\(f'\\) FIRST. If \\(B^2-4AC<0\\) with \\(A>0\\), \\(f'\\) has no roots so there are no intervals to split — the answer is 'increasing everywhere', and any option offering split intervals is a distractor.",
        },
        {
          title: "\\(0 < b^2 < c\\) is engineered to make the discriminant negative",
          body:
            "The condition \\(0<b^2<c\\) for \\(f'=3x^2+2bx+c\\) gives discriminant \\(4(b^2-3c)\\), and \\(c>b^2\\) forces \\(b^2-3c<0\\). Recognise this family: whenever the constant term dominates the middle coefficient squared, the quadratic \\(f'\\) stays one-signed.",
        },
      ],
    },

    // 4 — rational & rational-trig quotients: ad−bc constant-sign, the decreasing-sign trap
    {
      kind: "formula" as const,
      slug: "cetaod-rational-quotient-adbc",
      name: "Rational and Rational-Trig Quotients: the ad minus bc Condition",
      intuition:
        "For a quotient of two linear-in-(sin, cos) or linear expressions, the quotient rule collapses: the denominator becomes a squared (always positive) term, so the sign of \\(f'\\) is entirely decided by ONE constant, \\(ad-bc\\). Monotonicity then reduces to the sign of that single constant.",
      definition:
        "For \\(f(x) = \\dfrac{a\\sin x + b\\cos x}{c\\sin x + d\\cos x}\\), the quotient rule gives\n" +
        "\\[f'(x) = \\dfrac{ad - bc}{(c\\sin x + d\\cos x)^2}.\\]\n" +
        "The denominator is a square, hence \\(> 0\\) wherever defined, so:\n" +
        "- **\\(f\\) increasing for all \\(x\\)** \\(\\iff ad - bc > 0\\).\n" +
        "- **\\(f\\) decreasing for all \\(x\\)** \\(\\iff ad - bc < 0\\).\n" +
        "The same collapse happens for a simple rational \\(\\dfrac{ax+b}{cx+d}\\): \\(f'=\\dfrac{ad-bc}{(cx+d)^2}\\). A parameter version (e.g. \\(\\dfrac{k\\sin x+2\\cos x}{\\sin x+\\cos x}\\)) turns 'strictly increasing' into a linear inequality in the parameter.",
      formula: {
        label: "Sign of the derivative of a bilinear-trig quotient",
        latex:
          "f(x) = \\frac{a\\sin x + b\\cos x}{c\\sin x + d\\cos x} \\;\\Rightarrow\\; f'(x) = \\frac{ad - bc}{(c\\sin x + d\\cos x)^2}",
        symbols: [
          { symbol: "ad - bc", meaning: "the ONLY thing whose sign matters; \\(>0\\) increasing, \\(<0\\) decreasing" },
        ],
      },
      authoredExample: {
        prompt:
          "If \\(f(x) = \\dfrac{a\\sin x + b\\cos x}{c\\sin x + d\\cos x}\\) is decreasing for all \\(x\\), what condition must hold?",
        steps: [
          "Quotient rule: \\(f'(x) = \\dfrac{ad - bc}{(c\\sin x + d\\cos x)^2}\\).",
          "The denominator is a square, so it is \\(> 0\\) wherever defined; the sign of \\(f'\\) equals the sign of \\(ad - bc\\).",
          "Decreasing means \\(f'(x) < 0\\) for all \\(x\\), so we need \\(ad - bc < 0\\).",
        ],
        answer: "\\(ad - bc < 0\\).",
      },
      selfCheckExample: {
        prompt:
          "For what \\(k\\) is \\(f(x) = \\dfrac{k\\sin x + 2\\cos x}{\\sin x + \\cos x}\\) strictly increasing for all real \\(x\\)?",
        steps: [
          "Here \\(a=k, b=2, c=1, d=1\\), so \\(ad - bc = k\\cdot 1 - 2\\cdot 1 = k - 2\\).",
          "Thus \\(f'(x) = \\dfrac{k-2}{(\\sin x + \\cos x)^2}\\).",
          "Strictly increasing needs \\(f'(x) > 0\\), i.e. \\(k - 2 > 0\\).",
        ],
        answer: "\\(k > 2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{a\\sin x+b\\cos x}{c\\sin x+d\\cos x}\\) increasing for all \\(x\\) needs?", answer: "\\(ad-bc>0\\)" },
        { prompt: "Why does the denominator not affect the sign of \\(f'\\)?", answer: "It is a SQUARE, so always positive where defined" },
        { prompt: "\\(f(x)=\\dfrac{2x+1}{x-3}\\): sign of \\(f'\\)?", answer: "Negative", method: "\\(ad-bc=2(-3)-1(1)=-7<0\\)" },
        { prompt: "\\(\\dfrac{k\\sin x+2\\cos x}{\\sin x+\\cos x}\\) strictly increasing needs?", answer: "\\(k>2\\)" },
      ],
      pyqExampleId: "a65ebc00-1feb-4c5d-9a2e-664871378427", // decreasing ⇒ ad-bc<0
      traps: [
        {
          title: "Decreasing needs \\(f' < 0\\): the sign FLIPS",
          body:
            "The single most common error here is setting \\(f'>0\\) for a 'decreasing' function. Decreasing means \\(f'(x) < 0\\), so a bilinear-trig quotient decreasing forces \\(ad - bc < 0\\) — NOT \\(ad-bc>0\\). Read 'decreasing' \\(\\to\\) 'negative derivative' \\(\\to\\) 'negative \\(ad-bc\\)'.",
        },
        {
          title: "It is \\(ad - bc\\), not \\(ab - cd\\)",
          body:
            "The determinant of the coefficient pattern is \\(ad - bc\\) (main-diagonal minus off-diagonal of \\(\\begin{smallmatrix}a&b\\\\c&d\\end{smallmatrix}\\)). Distractor options offer \\(ab-cd\\) or a swapped sign — write out the quotient-rule numerator once to lock in \\(ad-bc\\).",
        },
      ],
    },

    // 5 — products / composites with e^x and log x (chain-rule sign analysis)
    {
      kind: "formula" as const,
      slug: "cetaod-exp-log-sign-analysis",
      name: "Products and Composites with exp and log: Chain-Rule Sign Analysis",
      intuition:
        "Exponentials are always positive and logs of positive arguments are defined only on part of the line — so when \\(f\\) is a product or composite involving \\(e^{(\\cdot)}\\) or \\(\\log(\\cdot)\\), the always-positive exponential factor drops out of the sign test, and the monotonicity is decided by the remaining polynomial or rational factor. Differentiate, pull out the guaranteed-positive part, and sign-test what is left.",
      definition:
        "Differentiate with the product/chain rule, then isolate the factor whose sign is fixed:\n" +
        "- \\(e^{g(x)} > 0\\) always, so in \\(f'(x) = e^{g(x)} \\cdot (\\text{stuff})\\) the sign is the sign of **stuff**.\n" +
        "- \\(\\dfrac{d}{dx}\\log(u) = \\dfrac{u'}{u}\\); on the domain \\(u>0\\), the sign is the sign of \\(u'\\).\n" +
        "- For a composite \\((f\\circ g)'(x) = f'(g(x))\\,g'(x)\\), each factor's sign multiplies. Reduce to the product of the non-trivial factors and build their combined sign chart.",
      formula: {
        label: "The exponential factor drops out of the sign test",
        latex:
          "f'(x) = e^{g(x)}\\,h(x) \\;\\Rightarrow\\; \\operatorname{sign} f'(x) = \\operatorname{sign} h(x) \\quad (\\text{since } e^{g(x)} > 0)",
        symbols: [
          { symbol: "e^{g(x)}", meaning: "strictly positive — never changes the sign of \\(f'\\)" },
          { symbol: "h(x)", meaning: "the remaining factor whose sign chart you must build" },
        ],
      },
      authoredExample: {
        prompt: "Find the interval on which \\(f(x) = x^2 e^{-x}\\) strictly increases.",
        steps: [
          "Product rule: \\(f'(x) = 2x\\,e^{-x} + x^2(-e^{-x}) = x e^{-x}(2 - x)\\).",
          "\\(e^{-x} > 0\\) always, so \\(\\operatorname{sign} f' = \\operatorname{sign}\\big(x(2-x)\\big)\\).",
          "\\(x(2-x) > 0 \\Rightarrow 0 < x < 2\\).",
        ],
        answer: "Strictly increasing on \\((0,2)\\).",
      },
      selfCheckExample: {
        prompt: "On what interval is \\(f(x) = (x+2)e^{-x}\\) increasing?",
        steps: [
          "\\(f'(x) = e^{-x} + (x+2)(-e^{-x}) = -e^{-x}(x+1)\\).",
          "\\(e^{-x} > 0\\), so \\(\\operatorname{sign} f' = \\operatorname{sign}\\big(-(x+1)\\big)\\).",
          "\\(f' > 0 \\iff x + 1 < 0 \\iff x < -1\\).",
        ],
        answer: "Increasing on \\((-\\infty,-1)\\); decreasing on \\((-1,\\infty)\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=\\dfrac{\\log x}{x}\\) \\((x>0)\\): increasing set?", answer: "\\((0,e)\\)", method: "\\(f'=\\dfrac{1-\\log x}{x^2}>0\\iff \\log x<1\\)" },
        { prompt: "In \\(f'(x)=e^{g(x)}h(x)\\), what decides the sign?", answer: "The sign of \\(h(x)\\) — \\(e^{g(x)}>0\\) always" },
        { prompt: "\\(f(x)=\\log(1+x)-\\dfrac{2x}{2+x}\\): increasing set?", answer: "\\((-1,\\infty)\\)", method: "\\(f'=\\dfrac{x^2}{(x+1)(x+2)^2}\\ge0\\)" },
        { prompt: "\\(f(x)=xe^{x(1-x)}\\): increasing set?", answer: "\\(\\left(-\\tfrac12,1\\right)\\)", method: "\\(f'=e^{x(1-x)}(1+x-2x^2)\\), sign of \\(-(2x+1)(x-1)\\)" },
      ],
      pyqExampleId: "441e8d1d-5857-41ac-8767-69bcfb52ceed", // x^2 e^{-x} strictly increases (0,2)
      traps: [
        {
          title: "Don't sign-test the exponential — it is always positive",
          body:
            "In \\(f'(x) = xe^{-x}(2-x)\\), the \\(e^{-x}\\) is strictly positive and contributes nothing to the sign. Only the polynomial factor \\(x(2-x)\\) matters. Wasting effort on \\(e^{-x}\\) (or, worse, treating it as sometimes negative) derails the whole sign chart.",
        },
        {
          title: "For a log, respect the domain before reading the sign",
          body:
            "\\(\\dfrac{d}{dx}\\log(u) = \\dfrac{u'}{u}\\) only where \\(u > 0\\). For \\(f(x)=\\dfrac{\\log_e(\\pi+x)}{\\log_e(e+x)}\\), the whole analysis lives on the domain where both logs are defined and positive; there \\(\\pi>e\\) forces the numerator of \\(f'\\) negative, so \\(f\\) is DECREASING on \\((0,\\infty)\\) — a case where the 'obvious' increasing answer is wrong.",
        },
      ],
    },

    // 6 — trig-function monotonicity: reduce to a single sinusoid, longest increasing interval
    {
      kind: "formula" as const,
      slug: "cetaod-trig-monotonicity-single-sinusoid",
      name: "Trigonometric Monotonicity: Reduce to a Single Sinusoid",
      intuition:
        "A trig expression's derivative is far easier once the expression is collapsed to a single \\(\\sin\\) or \\(\\cos\\) of one angle. Use identities (triple-angle, power-reduction) to rewrite \\(f\\), differentiate to a lone \\(\\pm\\sin(kx)\\) or \\(\\pm\\cos(kx)\\), and solve the elementary inequality \\(\\sin < 0\\) or \\(\\cos > 0\\) for the monotonic intervals.",
      definition:
        "Standard collapses that make the derivative a single sinusoid:\n" +
        "- **Triple angle:** \\(3\\sin x - 4\\sin^3 x = \\sin 3x\\), so \\(f' = 3\\cos 3x\\).\n" +
        "- **Power reduction:** \\(\\sin^4 x + \\cos^4 x = 1 - \\tfrac12\\sin^2 2x\\), giving \\(f' = -\\sin 4x\\).\n" +
        "Then read monotonicity from the sinusoid: \\(f' = 3\\cos 3x > 0 \\iff \\cos 3x > 0\\); \\(f' = -\\sin 4x > 0 \\iff \\sin 4x < 0\\). " +
        "The **longest increasing interval** of \\(\\sin(kx)\\)-type functions is the length of one rising quarter/half of the sinusoid — e.g. \\(f = \\sin 3x\\) rises on \\(\\left(-\\tfrac{\\pi}{6},\\tfrac{\\pi}{6}\\right)\\), a run of length \\(\\tfrac{\\pi}{3}\\).",
      formula: {
        label: "Collapse to one angle, then read the sinusoid",
        latex:
          "3\\sin x - 4\\sin^3 x = \\sin 3x, \\qquad \\sin^4 x + \\cos^4 x = 1 - \\tfrac{1}{2}\\sin^2 2x \\;\\Rightarrow\\; f' = -\\sin 4x",
      },
      authoredExample: {
        prompt:
          "Find the length of the longest interval on which \\(f(x) = 3\\sin x - 4\\sin^3 x\\) is increasing.",
        steps: [
          "Collapse: \\(3\\sin x - 4\\sin^3 x = \\sin 3x\\).",
          "\\(f'(x) = 3\\cos 3x \\ge 0 \\iff \\cos 3x \\ge 0 \\iff -\\tfrac{\\pi}{2} \\le 3x \\le \\tfrac{\\pi}{2}\\).",
          "So \\(-\\tfrac{\\pi}{6} \\le x \\le \\tfrac{\\pi}{6}\\); the interval has length \\(\\tfrac{\\pi}{6} - (-\\tfrac{\\pi}{6}) = \\tfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{3}\\).",
      },
      selfCheckExample: {
        prompt: "On which interval does \\(f(x) = \\sin^4 x + \\cos^4 x\\) increase?",
        steps: [
          "\\(f'(x) = 4\\sin^3 x\\cos x - 4\\cos^3 x\\sin x = -4\\sin x\\cos x(\\cos^2 x - \\sin^2 x) = -\\sin 4x\\).",
          "Increasing \\(\\iff f' > 0 \\iff \\sin 4x < 0 \\iff \\pi < 4x < 2\\pi\\).",
          "Divide by 4: \\(\\tfrac{\\pi}{4} < x < \\tfrac{\\pi}{2}\\).",
        ],
        answer: "Increasing on \\(\\left(\\tfrac{\\pi}{4}, \\tfrac{\\pi}{2}\\right)\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(3\\sin x - 4\\sin^3 x\\).", answer: "\\(\\sin 3x\\)", method: "triple-angle identity" },
        { prompt: "\\(f=\\sin^4 x+\\cos^4 x\\): what is \\(f'\\)?", answer: "\\(-\\sin 4x\\)", method: "power-reduction then double angle" },
        { prompt: "\\(\\sin 3x\\) longest increasing interval length?", answer: "\\(\\dfrac{\\pi}{3}\\)", method: "\\(\\cos 3x\\ge0\\) on width \\(\\pi/3\\)" },
        { prompt: "\\(f'=-\\sin 4x>0\\) needs?", answer: "\\(\\sin 4x<0\\)" },
      ],
      pyqExampleId: "c98295cf-f637-4191-aec3-927e619a121f", // longest interval sin3x = pi/3
      traps: [
        {
          title: "Collapse to one angle BEFORE differentiating",
          body:
            "Differentiating \\(3\\sin x - 4\\sin^3 x\\) term by term is messy; recognising it as \\(\\sin 3x\\) makes \\(f' = 3\\cos 3x\\) a one-liner. Likewise \\(\\sin^4 x + \\cos^4 x\\) is best reduced with the double-angle identity first — spotting the standard form is the whole shortcut.",
        },
        {
          title: "Mind the \\(k\\) when scaling the interval",
          body:
            "For \\(f'=-\\sin 4x\\), you solve \\(\\sin 4x<0\\) for the argument \\(4x\\) (a run of width \\(\\pi\\) in \\(4x\\)), then divide by 4 to get the \\(x\\)-interval (width \\(\\pi/4\\)). Forgetting to divide the argument's bounds by \\(k\\) inflates the interval by a factor of \\(k\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Differentiation notes", href: "/notes/mht-cet-maths/differentiation/foundations-chain" },
  ],
};
