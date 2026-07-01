import type { SubtopicNote } from "@/app/notes/_types";

export const MAXIMA_MINIMA_NOTE: SubtopicNote = {
  subtopicName: "Maxima, Minima, and Optimisation",
  title: "Maxima, Minima & Optimisation",
  oneLineDefinition:
    "Locate the peaks and valleys of a function: find the critical points where the derivative is zero, classify them with the first- or second-derivative test, then apply the machinery to constrained sets, parameter conditions, and real word problems.",
  whyItMatters:
    "This is the largest and hardest subtopic in the whole chapter — 42 PYQs, heavily HARD. Everything else in Applications of Derivatives feeds into it. The MHT-CET question factory recycles a handful of templates relentlessly: the extreme-value-parameter family (y = a log x + bx² + x, extrema at x = −1 and x = 2), the maximum of a cubic on a set S = {x : quadratic ≤ 0}, wire-cutting and open-tank optimisation, profit maximisation, and the minimum of a sec θ − b tan θ. " +
    "The recurring traps live here too: the second-derivative sign (f″ < 0 is a MAX, not a min), forgetting to check the endpoints of a constrained set, and dropping the AM-GM shortcut that turns a two-line derivative problem into one line.",
  concepts: [
    // 1 — critical points (FOUNDATION, no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetaod-critical-points",
      name: "Critical Points — Where the Slope Vanishes",
      intuition:
        "A smooth curve can only turn from rising to falling (or vice versa) where its tangent is momentarily flat — where the slope is zero. Those points, together with any point where the derivative fails to exist, are the ONLY candidates for a local peak or valley. Everything in this subtopic starts by finding them.",
      definition:
        "A **critical point** (or stationary point) of \\(f\\) is a value \\(x = c\\) in the domain where \\(f'(c) = 0\\) **or** \\(f'(c)\\) does not exist.\n" +
        "- Local maxima and minima can occur **only** at critical points — but a critical point need NOT be an extremum (it may be a point of inflection, e.g. \\(x = 0\\) for \\(f(x) = x^3\\)).\n" +
        "- So the recipe is always: (1) compute \\(f'(x)\\); (2) solve \\(f'(x) = 0\\) (and note where it is undefined); (3) **classify** each candidate with the first- or second-derivative test.",
      formula: {
        label: "Critical-point condition",
        latex: "f'(c) = 0 \\quad \\text{or} \\quad f'(c) \\text{ does not exist}",
        symbols: [{ symbol: "c", meaning: "a candidate for a local maximum or minimum" }],
      },
      authoredExample: {
        prompt: "Find the critical points of \\(f(x) = x^3 - 6x^2 + 9x + 2\\).",
        steps: [
          "Differentiate: \\(f'(x) = 3x^2 - 12x + 9\\).",
          "Factor: \\(f'(x) = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)\\).",
          "Set \\(f'(x) = 0\\): \\(x = 1\\) and \\(x = 3\\).",
        ],
        answer: "Critical points at \\(x = 1\\) and \\(x = 3\\) (each still needs classifying).",
      },
      selfCheckExample: {
        prompt: "Find the critical points of \\(f(x) = x^5 - 5x^4 + 5x^3 - 10\\).",
        steps: [
          "\\(f'(x) = 5x^4 - 20x^3 + 15x^2 = 5x^2(x^2 - 4x + 3)\\).",
          "\\(= 5x^2(x - 1)(x - 3)\\).",
          "Set \\(= 0\\): \\(x = 0,\\ 1,\\ 3\\).",
        ],
        answer: "Critical points at \\(x = 0,\\ 1,\\ 3\\).",
      },
      practiceSet: [
        { prompt: "Critical points of \\(f(x) = x^2 - 4x\\)?", answer: "\\(x = 2\\)", method: "\\(f'(x) = 2x - 4 = 0\\)" },
        { prompt: "Critical points of \\(f(x) = x^3 - 3x\\)?", answer: "\\(x = \\pm 1\\)", method: "\\(3x^2 - 3 = 0\\)" },
        { prompt: "Is \\(f'(c) = 0\\) enough to guarantee an extremum at \\(c\\)?", answer: "No — it is only a candidate", method: "\\(x^3\\) at \\(0\\) is an inflection" },
        { prompt: "Where can \\(f(x) = |x - 2|\\) have an extremum?", answer: "\\(x = 2\\)", method: "\\(f'\\) undefined there" },
      ],
      traps: [
        {
          title: "\\(f'(c) = 0\\) is NECESSARY, not sufficient",
          body:
            "A critical point is a CANDIDATE, not a guarantee. \\(f(x) = x^3\\) has \\(f'(0) = 0\\) yet no extremum at \\(0\\) — the slope touches zero and keeps the same sign (a point of inflection). Always confirm with a genuine sign change of \\(f'\\) or the sign of \\(f''\\).",
        },
        {
          title: "Don't forget points where \\(f'\\) is UNDEFINED",
          body:
            "For \\(f(x) = x^{2/3} + (x-2)^{2/3}\\), \\(f'(x) = \\tfrac{2}{3}\\big(x^{-1/3} + (x-2)^{-1/3}\\big)\\) is undefined at \\(x = 0\\) and \\(x = 2\\) — those are critical points too. Restricting to \\(f' = 0\\) alone misses them.",
        },
      ],
    },

    // 2 — first-derivative test
    {
      kind: "formula" as const,
      slug: "cetaod-first-derivative-test",
      name: "The First-Derivative Test",
      intuition:
        "Walk along the curve through a critical point. If the slope switches from uphill to downhill (\\(+\\) to \\(-\\)), you just crested a peak — a local maximum. If it switches from downhill to uphill (\\(-\\) to \\(+\\)), you passed through the bottom of a valley — a local minimum. If the slope keeps the same sign, it is neither.",
      definition:
        "At a critical point \\(c\\), examine the sign of \\(f'\\) just to the left and just to the right:\n" +
        "- \\(f'\\) changes \\(+ \\to -\\) \\(\\Rightarrow\\) local **maximum** at \\(c\\).\n" +
        "- \\(f'\\) changes \\(- \\to +\\) \\(\\Rightarrow\\) local **minimum** at \\(c\\).\n" +
        "- \\(f'\\) does **not** change sign \\(\\Rightarrow\\) neither (a point of inflection).\n" +
        "This test always works — even when \\(f''\\) is awkward to compute or when \\(f''(c) = 0\\) leaves the second-derivative test inconclusive. Factor \\(f'(x)\\) into linear/quadratic pieces and read the sign in each interval.",
      formula: {
        label: "First-derivative test",
        latex: "f' : + \\to - \\ \\Rightarrow\\ \\text{max}, \\qquad f' : - \\to + \\ \\Rightarrow\\ \\text{min}",
      },
      authoredExample: {
        prompt: "Use the first-derivative test to classify the critical points of \\(f(x) = 2x^3 - 9x^2 + 12x + 1\\).",
        steps: [
          "\\(f'(x) = 6x^2 - 18x + 12 = 6(x - 1)(x - 2)\\), critical points \\(x = 1, 2\\).",
          "On \\(x < 1\\): both factors negative \\(\\Rightarrow f' > 0\\). On \\(1 < x < 2\\): \\((x-1) > 0, (x-2) < 0 \\Rightarrow f' < 0\\).",
          "At \\(x = 1\\): \\(f'\\) goes \\(+ \\to -\\) \\(\\Rightarrow\\) local **maximum**.",
          "On \\(x > 2\\): both factors positive \\(\\Rightarrow f' > 0\\). At \\(x = 2\\): \\(f'\\) goes \\(- \\to +\\) \\(\\Rightarrow\\) local **minimum**.",
        ],
        answer: "Local maximum at \\(x = 1\\); local minimum at \\(x = 2\\).",
      },
      selfCheckExample: {
        prompt: "Use the first-derivative test to find where \\(f(x) = x^4 - 2x^2 + 3\\) has a local maximum.",
        steps: [
          "\\(f'(x) = 4x^3 - 4x = 4x(x - 1)(x + 1)\\), critical points \\(x = -1,\\ 0,\\ 1\\).",
          "On \\(-1 < x < 0\\): \\(4x < 0,\\ (x-1) < 0,\\ (x+1) > 0 \\Rightarrow f' > 0\\). On \\(0 < x < 1\\): \\(4x > 0,\\ (x-1) < 0,\\ (x+1) > 0 \\Rightarrow f' < 0\\).",
          "At \\(x = 0\\): \\(f'\\) goes \\(+ \\to -\\) \\(\\Rightarrow\\) local maximum. (At \\(x = \\pm 1\\), \\(f'\\) flips \\(- \\to +\\) — those are minima.)",
        ],
        answer: "Local maximum at \\(x = 0\\).",
      },
      practiceSet: [
        { prompt: "\\(f'\\) changes \\(- \\to +\\) at \\(c\\). What is \\(c\\)?", answer: "A local minimum" },
        { prompt: "\\(f'\\) keeps the same sign through \\(c\\). What is \\(c\\)?", answer: "Neither (inflection)" },
        { prompt: "\\(f'(x) = 5x^2(x-1)(x-3)\\): is \\(x = 0\\) an extremum?", answer: "No — repeated factor, no sign change" },
        { prompt: "\\(f'(x) = (x-2)(x-4)\\): classify \\(x = 2\\).", answer: "Local maximum", method: "\\(f' : + \\to -\\)" },
      ],
      pyqExampleId: "413ad4de-8119-4f71-9545-3dd659fd9a5a", // x^5 - 5x^4 + 5x^3 - 10, max at x = 1
      traps: [
        {
          title: "A repeated root of \\(f'\\) is NOT an extremum",
          body:
            "For \\(f'(x) = 5x^2(x-1)(x-3)\\), the factor \\(x^2\\) means \\(f'\\) touches zero at \\(x = 0\\) without changing sign — so \\(x = 0\\) is neither a max nor a min. Only \\(x = 1\\) and \\(x = 3\\) (simple roots, genuine sign flips) are extrema.",
        },
      ],
    },

    // 3 — second-derivative test (core, SVG)
    {
      kind: "formula" as const,
      slug: "cetaod-second-derivative-test",
      name: "The Second-Derivative Test",
      visualizationSlug: "aod-extrema-curve",
      intuition:
        "The second derivative measures how the curve bends. At a critical point, if the curve is concave up — like the bottom of a bowl — you are at a minimum; if it is concave down — like the top of a dome — you are at a maximum. So the SIGN of \\(f''\\) at the critical point tells you the answer directly.",
      definition:
        "At a critical point \\(c\\) (where \\(f'(c) = 0\\)):\n" +
        "- \\(f''(c) < 0\\) \\(\\Rightarrow\\) curve concave **down** \\(\\Rightarrow\\) local **maximum**.\n" +
        "- \\(f''(c) > 0\\) \\(\\Rightarrow\\) curve concave **up** \\(\\Rightarrow\\) local **minimum**.\n" +
        "- \\(f''(c) = 0\\) \\(\\Rightarrow\\) **inconclusive** — fall back to the first-derivative test.\n" +
        "This is usually the fastest test when \\(f''\\) is easy to compute at the critical point.",
      formula: {
        label: "Second-derivative test",
        latex: "f''(c) < 0 \\Rightarrow \\text{local max}, \\qquad f''(c) > 0 \\Rightarrow \\text{local min}",
        symbols: [
          { symbol: "f''(c)", meaning: "concavity at the critical point c" },
        ],
      },
      authoredExample: {
        prompt: "Classify the critical points of \\(f(x) = x^5 - 5x^4 + 5x^3 - 10\\) that give a maximum.",
        steps: [
          "\\(f'(x) = 5x^2(x - 1)(x - 3)\\), critical points \\(x = 0, 1, 3\\).",
          "\\(f''(x) = 20x^3 - 60x^2 + 30x\\).",
          "At \\(x = 1\\): \\(f''(1) = 20 - 60 + 30 = -10 < 0\\) \\(\\Rightarrow\\) local **maximum**.",
          "At \\(x = 3\\): \\(f''(3) = 540 - 540 + 90 = 90 > 0\\) \\(\\Rightarrow\\) local minimum. (At \\(x = 0\\), \\(f''(0) = 0\\): inconclusive, and the first-derivative test shows no sign change.)",
        ],
        answer: "Maximum at \\(x = 1\\).",
      },
      selfCheckExample: {
        prompt: "Find where \\(f(x) = x^{2/3} + (x - 2)^{2/3}\\) attains its maximum, and the maximum value.",
        steps: [
          "\\(f'(x) = \\tfrac{2}{3}\\big(x^{-1/3} + (x - 2)^{-1/3}\\big) = 0\\) gives \\(x = 1\\) (symmetry point).",
          "The second derivative is negative at \\(x = 1\\), so it is a maximum.",
          "\\(f(1) = 1^{2/3} + (-1)^{2/3} = 1 + 1 = 2\\).",
        ],
        answer: "Maximum value \\(2\\) at \\(x = 1\\).",
      },
      practiceSet: [
        { prompt: "\\(f''(c) < 0\\) at a critical point means?", answer: "Local maximum" },
        { prompt: "\\(f''(c) > 0\\) at a critical point means?", answer: "Local minimum" },
        { prompt: "\\(f''(c) = 0\\) — what next?", answer: "Use the first-derivative test" },
        { prompt: "\\(f(x) = x^2 + \\tfrac{128}{x}\\ (x>0)\\): min at \\(x = 4\\)? Check \\(f''\\).", answer: "Yes — \\(f''(4) > 0\\)", method: "\\(f'' = 2 + 256/x^3\\)" },
      ],
      pyqExampleId: "6ece096c-2fda-4083-aad3-910a0c8dd165", // x^3 - 6x^2 + 9x + 2, max at x = 1
      traps: [
        {
          title: "\\(f'' < 0\\) is a MAXIMUM (the sign trips everyone)",
          body:
            "Concave DOWN (\\(f'' < 0\\)) is a local MAX; concave UP (\\(f'' > 0\\)) is a local MIN. Students routinely guess the opposite. Picture the shape: a dome (\\(\\cap\\), \\(f'' < 0\\)) peaks; a bowl (\\(\\cup\\), \\(f'' > 0\\)) bottoms out.",
        },
        {
          title: "When \\(f''(c) = 0\\), the test says NOTHING",
          body:
            "\\(f''(c) = 0\\) is inconclusive — \\(c\\) could be a max, a min, or an inflection. Do not conclude 'inflection' automatically. Switch to the first-derivative test and read the actual sign change of \\(f'\\).",
        },
      ],
    },

    // 4 — extreme-value-parameter family (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-extreme-value-parameters",
      name: "Extreme Value at a Given Point ⇒ Solve for Parameters",
      intuition:
        "If a question TELLS you that a function has an extremum at certain \\(x\\)-values, that is the same as saying \\(f'\\) equals zero there. Substitute each given point into \\(f'(x) = 0\\), get one equation per point, and solve the resulting linear system for the unknown constants.",
      definition:
        "'\\(f\\) has an extreme value at \\(x = p\\)' means \\(f'(p) = 0\\). With two given extreme points you get two equations in the unknown parameters — a routine linear system.\n" +
        "**The signature MHT-CET template** is \\(y = a\\log x + bx^2 + x\\) with extrema at \\(x = -1\\) and \\(x = 2\\):\n" +
        "\\[y' = \\dfrac{a}{x} + 2bx + 1 = 0.\\]\n" +
        "At \\(x = -1\\): \\(-a - 2b + 1 = 0\\); at \\(x = 2\\): \\(\\tfrac{a}{2} + 4b + 1 = 0\\). Solving gives \\(a = 2\\), \\(b = -\\tfrac{1}{2}\\) — memorise this pair, because the paper asks for many different combinations of it (\\(a + b\\), \\(\\tfrac{a}{b} + \\tfrac{b}{a}\\), \\(a^2 + 2b\\), etc.).",
      formula: {
        label: "Extremum condition at a given point",
        latex: "f'(p) = 0 \\quad \\text{for each stated extreme point } p",
      },
      authoredExample: {
        prompt: "The function \\(f(x) = x^3 + a x^2 + b x + c\\) has a local extremum at \\(x = 1\\) and passes through a point where \\(f'(-1) = 0\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "\\(f'(x) = 3x^2 + 2ax + b\\); the extrema at \\(x = 1\\) and \\(x = -1\\) mean \\(f'(1) = 0\\) and \\(f'(-1) = 0\\).",
          "At \\(x = 1\\): \\(3 + 2a + b = 0\\). At \\(x = -1\\): \\(3 - 2a + b = 0\\).",
          "Subtract the two: \\(4a = 0 \\Rightarrow a = 0\\); then \\(b = -3\\).",
        ],
        answer: "\\(a = 0,\\ b = -3\\) (so \\(f'(x) = 3x^2 - 3\\), extrema at \\(x = \\pm 1\\)).",
      },
      selfCheckExample: {
        prompt: "If \\(y = \\alpha\\log x + \\beta x^3 - x\\) has extreme values at \\(x = -1\\) and \\(x = 1\\), find \\(\\alpha\\) and \\(\\beta\\).",
        steps: [
          "\\(y' = \\dfrac{\\alpha}{x} + 3\\beta x^2 - 1\\); set \\(= 0\\) at both points.",
          "At \\(x = 1\\): \\(\\alpha + 3\\beta - 1 = 0 \\Rightarrow \\alpha + 3\\beta = 1\\).",
          "At \\(x = -1\\): \\(-\\alpha + 3\\beta - 1 = 0 \\Rightarrow -\\alpha + 3\\beta = 1\\).",
          "Add: \\(6\\beta = 2 \\Rightarrow \\beta = \\tfrac{1}{3}\\); subtract: \\(\\alpha = 0\\).",
        ],
        answer: "\\(\\alpha = 0,\\ \\beta = \\tfrac{1}{3}\\).",
      },
      practiceSet: [
        { prompt: "For the \\(a\\log x + bx^2 + x\\) family (extrema \\(-1, 2\\)): \\(a = ?,\\ b = ?\\)", answer: "\\(a = 2,\\ b = -\\tfrac{1}{2}\\)" },
        { prompt: "Same family: \\(\\dfrac{a}{b} + \\dfrac{b}{a} = ?\\)", answer: "\\(-\\tfrac{17}{4}\\)", method: "\\(-4 - \\tfrac14\\)" },
        { prompt: "Same family: \\(a^2 + 2b = ?\\)", answer: "\\(3\\)", method: "\\(4 - 1\\)" },
        { prompt: "'Extreme value at \\(x = p\\)' translates to which equation?", answer: "\\(f'(p) = 0\\)" },
      ],
      pyqExampleId: "03e0d7f6-96fc-46be-bf79-ca530d75ff17", // a log x + b x^2 + x, a + b = 3/2
      traps: [
        {
          title: "Read exactly which combination is asked",
          body:
            "Every one of these questions has \\(a = 2, b = -\\tfrac12\\) at its core, but they ask for different outputs: \\(a + b = \\tfrac32\\), \\(\\tfrac{a}{b} + \\tfrac{b}{a} = -\\tfrac{17}{4}\\), \\(a^2 + 2b = 3\\), or just the pair itself. Solve the system once, then compute the specific expression requested — don't stop at \\(a, b\\).",
        },
        {
          title: "\\(\\log x\\) is natural log, and the \\(x = -1\\) extremum is formal",
          body:
            "Throughout MHT-CET \\(\\log\\) means \\(\\log_e\\). The template uses \\(x = -1\\) as an extreme point by writing \\(\\log|x|\\) (or reading \\(\\log x\\) in the extended sense) — treat \\(\\dfrac{d}{dx}\\log|x| = \\dfrac{1}{x}\\) and substitute \\(x = -1\\) directly.",
        },
      ],
    },

    // 5 — absolute max/min on a constrained set S (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-absolute-extrema-constrained-set",
      name: "Absolute Max/Min on a Constrained Set S",
      intuition:
        "When the domain is a set defined by an inequality like \\(\\{x : x^2 + 30 \\le 11x\\}\\), first solve the inequality to get the actual interval — usually a short closed interval. Then the absolute maximum or minimum is simply the biggest (or smallest) among the function's values at any interior critical point AND at the two endpoints.",
      definition:
        "To find the greatest/least value of \\(f\\) on a set \\(S\\) given by a quadratic inequality:\n" +
        "1. **Solve the inequality.** \\(x^2 + 30 \\le 11x \\Leftrightarrow x^2 - 11x + 30 \\le 0 \\Leftrightarrow (x-5)(x-6) \\le 0 \\Leftrightarrow x \\in [5, 6]\\).\n" +
        "2. **Find interior critical points** of \\(f\\) that lie inside the interval (often there are none — \\(f\\) may be monotonic on such a short interval).\n" +
        "3. **Evaluate \\(f\\) at every critical point in the interval and at both endpoints**; the largest is the absolute max, the smallest the absolute min.\n" +
        "For \\(f(x) = 3x^3 - 18x^2 + 27x - 40\\), \\(f'(x) = 9(x-3)^2 \\ge 0\\), so \\(f\\) is increasing on \\([5,6]\\) — the max is at \\(x = 6\\): \\(f(6) = 122\\).",
      formula: {
        label: "Absolute extremum on a closed interval",
        latex: "\\max_{[a,b]} f = \\max\\big\\{ f(a),\\ f(b),\\ f(c_i) \\big\\}",
        symbols: [
          { symbol: "a, b", meaning: "endpoints of the interval from solving the inequality" },
          { symbol: "c_i", meaning: "critical points of f lying inside (a, b)" },
        ],
      },
      authoredExample: {
        prompt: "Find the greatest value of \\(f(x) = x^3 - 3x + 5\\) on \\(S = \\{x \\in \\mathbb{R} : x^2 - 4 \\le 0\\}\\).",
        steps: [
          "Solve \\(S\\): \\(x^2 - 4 \\le 0 \\Rightarrow x \\in [-2, 2]\\).",
          "\\(f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1) = 0 \\Rightarrow x = \\pm 1\\), both inside \\([-2, 2]\\).",
          "Evaluate every candidate: \\(f(-2) = -8 + 6 + 5 = 3\\), \\(f(-1) = -1 + 3 + 5 = 7\\), \\(f(1) = 1 - 3 + 5 = 3\\), \\(f(2) = 8 - 6 + 5 = 7\\).",
          "The greatest of \\(\\{3, 7, 3, 7\\}\\) is \\(7\\).",
        ],
        answer: "Greatest value \\(= 7\\) (at \\(x = -1\\) and \\(x = 2\\)).",
      },
      selfCheckExample: {
        prompt: "Find the minimum value of \\(f(x) = 2x^3 - 15x^2 + 36x - 48\\) on \\(A = \\{x : x^2 + 20 \\le 9x\\}\\).",
        steps: [
          "Solve \\(A\\): \\(x^2 - 9x + 20 \\le 0 \\Rightarrow (x - 4)(x - 5) \\le 0 \\Rightarrow x \\in [4, 5]\\).",
          "\\(f'(x) = 6x^2 - 30x + 36 = 6(x - 2)(x - 3)\\); its roots \\(2, 3\\) lie OUTSIDE \\([4,5]\\), so no interior critical point — compare endpoints.",
          "\\(f(4) = 128 - 240 + 144 - 48 = -16\\); \\(f(5) = 250 - 375 + 180 - 48 = 7\\).",
        ],
        answer: "Minimum value \\(= -16\\) (at \\(x = 4\\)).",
      },
      practiceSet: [
        { prompt: "Solve \\(x^2 + 30 \\le 11x\\).", answer: "\\(x \\in [5, 6]\\)", method: "\\((x-5)(x-6) \\le 0\\)" },
        { prompt: "First step for 'max of \\(f\\) on \\(S = \\{x: \\text{quadratic} \\le 0\\}\\)'?", answer: "Solve the inequality for the interval" },
        { prompt: "Max of \\(3x^3 - 18x^2 + 27x - 40\\) on \\([5,6]\\)?", answer: "\\(122\\)", method: "increasing, so at \\(x = 6\\)" },
        { prompt: "If no critical point lies inside, the extremum is at?", answer: "An endpoint" },
      ],
      pyqExampleId: "97164649-babb-4159-95ea-7bb54576f3df", // max of 3x^3-18x^2+27x-40 on S = 122
      traps: [
        {
          title: "SOLVE the inequality first — S is not all of \\(\\mathbb{R}\\)",
          body:
            "The constraint \\(x^2 + 30 \\le 11x\\) restricts \\(x\\) to a short interval \\([5, 6]\\). Optimising over all reals (finding \\(f' = 0\\) globally) gives the wrong answer — the global critical points \\(x = 1, 3\\) are not even in the set. Always convert the inequality into the interval before doing anything else.",
        },
        {
          title: "On a closed interval, always compare the ENDPOINTS",
          body:
            "If \\(f\\) is monotonic on the interval (no interior critical point), the extreme value sits at an endpoint. Even when there IS an interior critical point, you must still evaluate \\(f\\) at both endpoints and pick the winner — the endpoint value often beats the turning-point value.",
        },
      ],
    },

    // 6 — applied optimisation: geometry + AM-GM (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-optimisation-geometry-amgm",
      name: "Applied Optimisation — Geometry & the AM-GM Shortcut",
      intuition:
        "Word problems all follow one recipe: write the quantity to optimise, use the constraint to reduce it to ONE variable, then set the derivative to zero. But a huge share of them — minimise a sum, maximise a product — collapse to a single AM-GM line with no calculus at all. Learn to spot both.",
      definition:
        "**The recipe:** (1) express the target \\(Q\\) and the constraint; (2) eliminate a variable so \\(Q = Q(t)\\); (3) solve \\(Q'(t) = 0\\); (4) confirm max/min.\n" +
        "**The AM-GM shortcut:** for positive terms, AM \\(\\ge\\) GM with equality when the terms are equal. So a **sum with fixed product** is minimised, and a **product with fixed sum** is maximised, when the terms are equal:\n" +
        "\\[ax + by \\ \\ge\\ 2\\sqrt{ax \\cdot by} = 2\\sqrt{ab\\,xy}. \\]\n" +
        "In particular, \\(\\min(ax + by)\\) subject to \\(xy = c^2\\) is \\(2c\\sqrt{ab}\\), attained when \\(ax = by\\).\n" +
        "**Standard geometric results worth quoting:** a fixed-perimeter rectangle is largest as a square; a triangle with two equal fenced sides \\(x\\) has max area \\(\\tfrac{1}{2}x^2\\) (at \\(90^\\circ\\)); a circular sector of fixed perimeter maximises area at a specific radius; splitting a number to maximise a product-of-powers uses the ratio of the exponents.",
      formula: {
        label: "AM-GM optimisation shortcut",
        latex: "\\min(ax + by)\\ \\text{s.t.}\\ xy = c^2 \\ =\\ 2c\\sqrt{ab} \\quad (\\text{equality at } ax = by)",
      },
      authoredExample: {
        prompt: "Find the minimum value of \\(ax + by\\) where \\(xy = c^2\\) (all positive).",
        steps: [
          "By AM-GM: \\(ax + by \\ge 2\\sqrt{(ax)(by)} = 2\\sqrt{ab \\cdot xy}\\).",
          "Substitute the constraint \\(xy = c^2\\): \\(= 2\\sqrt{ab \\cdot c^2} = 2c\\sqrt{ab}\\).",
          "Equality (the minimum) holds when \\(ax = by\\).",
        ],
        answer: "Minimum \\(= 2c\\sqrt{ab}\\).",
      },
      selfCheckExample: {
        prompt: "20 is split into two parts so that (cube of one part) × (square of the other) is maximum. Find the parts.",
        steps: [
          "Let the parts be \\(x\\) and \\(20 - x\\); maximise \\(z = x^3(20 - x)^2\\).",
          "\\(\\dfrac{dz}{dx} = x^2(20 - x)\\big[3(20 - x) - 2x\\big] = x^2(20 - x)(60 - 5x)\\).",
          "Set \\(= 0\\): \\(x = 12\\) (rejecting \\(x = 0, 20\\)). Shortcut: split in the ratio of the exponents \\(3 : 2\\), i.e. \\(\\tfrac{3}{5}(20) = 12\\) and \\(8\\).",
        ],
        answer: "The parts are \\(12\\) and \\(8\\).",
      },
      practiceSet: [
        { prompt: "\\(\\min(ax + by)\\) with \\(xy = c^2\\)?", answer: "\\(2c\\sqrt{ab}\\)", method: "AM-GM" },
        { prompt: "\\(x + 2y = 8\\): maximum of \\(xy\\)?", answer: "\\(8\\)", method: "\\(x = 4, y = 2\\)" },
        { prompt: "Sum of two numbers is 3; max of (first)×(second)²?", answer: "\\(4\\)", method: "\\(1 \\times 2^2\\)" },
        { prompt: "Triangular park, two fenced sides \\(x\\): max area?", answer: "\\(\\tfrac{1}{2}x^2\\)", method: "\\(\\tfrac{x^2}{2}\\sin 2\\theta\\), max at \\(\\theta = 45^\\circ\\)" },
      ],
      pyqExampleId: "17e79b70-f19a-4cc0-ba47-12cb001c4949", // min ax+by, xy=c^2 = 2c√(ab)
      traps: [
        {
          title: "AM-GM only maximises a PRODUCT (fixed sum) or minimises a SUM (fixed product)",
          body:
            "The shortcut applies to a sum-with-fixed-product (minimise) or a product-with-fixed-sum (maximise), with all terms POSITIVE. It gives \\(2c\\sqrt{ab}\\) for \\(\\min(ax + by)\\) — not \\(2ab\\sqrt{c}\\) or \\(-2c\\sqrt{ab}\\). Match the constraint shape before quoting the result.",
        },
        {
          title: "Number-splitting: split in the ratio of the EXPONENTS",
          body:
            "To maximise \\(x^m(k - x)^n\\), the maximiser is \\(x = \\dfrac{m}{m+n}\\,k\\). For 'cube of one × square of the other' of 20: ratio \\(3 : 2\\) gives \\(12\\) and \\(8\\). Guessing \\(10, 10\\) (equal split) is wrong unless the exponents are equal.",
        },
      ],
    },

    // 7 — mensuration optimisation (tank/box/poster) (anchored, clean question)
    {
      kind: "formula" as const,
      slug: "cetaod-optimisation-mensuration",
      name: "Applied Optimisation — Tanks, Boxes & Cost",
      intuition:
        "Mensuration problems fix a volume and ask for the cheapest or least-material design. Write the surface area (or cost) in terms of the volume constraint, reduce to one variable, and minimise. The classic result: an open square-based tank of given volume uses least metal when the side is twice the height.",
      definition:
        "For an **open** tank with a **square base** of side \\(x\\) and height \\(h\\), volume \\(V = x^2 h\\):\n" +
        "- Surface area (base + 4 sides, no top) \\(A = x^2 + 4xh\\).\n" +
        "- Eliminate \\(h = \\dfrac{V}{x^2}\\): \\(A(x) = x^2 + \\dfrac{4V}{x}\\).\n" +
        "- \\(A'(x) = 2x - \\dfrac{4V}{x^2} = 0 \\Rightarrow x^3 = 2V \\Rightarrow x = 2h\\) (the optimal side is twice the height).\n" +
        "For a **cost** version, weight each face by its unit cost before minimising. Always confirm with \\(A'' > 0\\) that it is a minimum.",
      formula: {
        label: "Open square-based tank, least surface",
        latex: "A(x) = x^2 + \\dfrac{4V}{x}, \\qquad A'(x) = 0 \\Rightarrow x^3 = 2V,\\ \\ x = 2h",
        symbols: [
          { symbol: "x", meaning: "side of the square base" },
          { symbol: "h", meaning: "height; at the optimum x = 2h" },
        ],
      },
      authoredExample: {
        prompt: "An open box with a square base of side \\(x\\) is to hold \\(2000\\) cm³. Find the side that minimises the material used.",
        steps: [
          "Volume: \\(x^2 h = 2000 \\Rightarrow h = \\dfrac{2000}{x^2}\\).",
          "Open box surface: \\(A = x^2 + 4xh = x^2 + \\dfrac{8000}{x}\\).",
          "\\(A'(x) = 2x - \\dfrac{8000}{x^2} = 0 \\Rightarrow x^3 = 4000 \\Rightarrow x = \\sqrt[3]{4000} \\approx 15.87\\) cm.",
          "\\(A''(x) = 2 + \\dfrac{16000}{x^3} > 0\\), confirming a minimum.",
        ],
        answer: "Side \\(x = \\sqrt[3]{4000}\\) cm (about \\(15.87\\) cm).",
      },
      selfCheckExample: {
        prompt: "An open metallic tank with a square base and vertical sides has volume \\(500\\) m³. Find the dimensions using least metal.",
        steps: [
          "\\(x^2 y = 500 \\Rightarrow y = \\dfrac{500}{x^2}\\); \\(A = x^2 + 4xy = x^2 + \\dfrac{2000}{x}\\).",
          "\\(A'(x) = 2x - \\dfrac{2000}{x^2} = 0 \\Rightarrow x^3 = 1000 \\Rightarrow x = 10\\).",
          "Then \\(y = \\dfrac{500}{100} = 5\\).",
        ],
        answer: "Base \\(10\\) m × \\(10\\) m, height \\(5\\) m.",
      },
      practiceSet: [
        { prompt: "Open square tank, volume \\(V\\): optimal side in terms of height?", answer: "\\(x = 2h\\)", method: "\\(x^3 = 2V\\)" },
        { prompt: "Open tank \\(4000\\) cm³, min surface: side?", answer: "\\(20\\) cm" },
        { prompt: "Which face does an OPEN tank omit?", answer: "The top" },
        { prompt: "How to confirm a minimum after \\(A' = 0\\)?", answer: "\\(A'' > 0\\)" },
      ],
      pyqExampleId: "3f3d3912-6fd6-4f8c-9de1-bc7abb11024f", // open tank 4000 cm^3, side 20 height 10
      traps: [
        {
          title: "OPEN tank has no top — count the faces carefully",
          body:
            "An open square-based tank has surface area \\(x^2 + 4xh\\) (one base + four sides), NOT \\(2x^2 + 4xh\\). Including a non-existent top changes the optimum. For a cost problem, weight only the faces that actually exist.",
        },
        {
          title: "Eliminate the second variable via the volume constraint FIRST",
          body:
            "You cannot differentiate \\(A = x^2 + 4xh\\) directly — it has two variables. Use \\(V = x^2 h\\) to write \\(h\\) in terms of \\(x\\), reducing \\(A\\) to one variable before setting \\(A'(x) = 0\\).",
        },
      ],
    },

    // 8 — economics optimisation (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-optimisation-economics",
      name: "Applied Optimisation — Profit, Revenue & Cost",
      intuition:
        "Economics problems are optimisation in disguise: profit is revenue minus cost, both functions of the number of items \\(x\\). Build the profit function \\(P(x)\\), differentiate, set \\(P'(x) = 0\\) for the production level that maximises profit, then evaluate \\(P\\) there.",
      definition:
        "**Profit** \\(P(x) = R(x) - C(x)\\), where \\(R(x) = (\\text{price per item}) \\times x\\) is revenue and \\(C(x)\\) is total cost.\n" +
        "- If the price per item is \\(p(x)\\), then \\(R(x) = x\\,p(x)\\).\n" +
        "- Maximise: solve \\(P'(x) = 0\\) (marginal revenue = marginal cost) and check \\(P''(x) < 0\\).\n" +
        "- The final answer is the profit VALUE \\(P(x^*)\\) at the optimal \\(x^*\\), unless the number of items itself is asked.",
      formula: {
        label: "Profit maximisation",
        latex: "P(x) = R(x) - C(x), \\qquad P'(x) = 0,\\ \\ P''(x) < 0",
      },
      authoredExample: {
        prompt: "A firm sells \\(x\\) units at a price of \\((50 - x)\\) rupees each, and the cost of producing \\(x\\) units is \\((20x + 100)\\) rupees. Find the maximum profit.",
        steps: [
          "Revenue \\(R(x) = x(50 - x) = 50x - x^2\\).",
          "Profit \\(P(x) = R - C = 50x - x^2 - (20x + 100) = -x^2 + 30x - 100\\).",
          "\\(P'(x) = -2x + 30 = 0 \\Rightarrow x = 15\\); \\(P'' = -2 < 0\\) (maximum).",
          "\\(P(15) = -225 + 450 - 100 = 125\\).",
        ],
        answer: "Maximum profit \\(= ₹125\\) (at \\(x = 15\\) units).",
      },
      selfCheckExample: {
        prompt: "A manufacturer's cost for \\(x\\) items is \\(x^2 + 78x + 2500\\), and the price satisfies \\(8x = 600 - p\\). Find the maximum profit.",
        steps: [
          "Price \\(p = 600 - 8x\\); revenue \\(R = xp = (600 - 8x)x = 600x - 8x^2\\).",
          "Profit \\(P(x) = R - C = 600x - 8x^2 - (x^2 + 78x + 2500) = -9x^2 + 522x - 2500\\).",
          "\\(P'(x) = -18x + 522 = 0 \\Rightarrow x = 29\\); \\(P'' = -18 < 0\\) (maximum).",
          "\\(P(29) = -9(841) + 522(29) - 2500 = -7569 + 15138 - 2500 = 5069\\).",
        ],
        answer: "Maximum profit \\(= ₹5069\\).",
      },
      practiceSet: [
        { prompt: "Profit \\(P\\) in terms of \\(R\\) and \\(C\\)?", answer: "\\(P = R - C\\)" },
        { prompt: "Revenue if price per item is \\(p(x)\\)?", answer: "\\(R = x\\,p(x)\\)" },
        { prompt: "Condition for max profit at \\(x^*\\)?", answer: "\\(P'(x^*) = 0,\\ P''(x^*) < 0\\)" },
        { prompt: "\\(P(x) = -9x^2 + 522x - 2500\\): profit-maximising \\(x\\)?", answer: "\\(x = 29\\)", method: "\\(P' = -18x + 522\\)" },
      ],
      pyqExampleId: "8cf2d067-e330-4397-900f-1992937bcd80", // profit 143.4
      traps: [
        {
          title: "Build REVENUE as price × quantity, not just price",
          body:
            "Revenue from selling \\(x\\) items at price \\(p\\) each is \\(x \\cdot p\\), not \\(p\\). Forgetting the factor \\(x\\) gives a linear profit with no interior maximum. Multiply the per-item price by the number of items before subtracting cost.",
        },
        {
          title: "Return the profit VALUE, not the quantity",
          body:
            "Solving \\(P'(x) = 0\\) gives the optimal number of items \\(x^*\\) — but the question usually asks for the maximum PROFIT. Substitute \\(x^*\\) back into \\(P(x)\\) to get the rupee value.",
        },
      ],
    },

    // 9 — trig-expression + rational max/min (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-trig-rational-extrema",
      name: "Extrema of Trig and Rational Expressions",
      intuition:
        "Two special shapes appear so often they are worth memorising as formulas. For \\(a\\sec\\theta - b\\tan\\theta\\) (with \\(a > b\\)) the minimum is \\(\\sqrt{a^2 - b^2}\\). For a rational function \\(\\dfrac{x^2 - x + 1}{x^2 + x + 1}\\), the extreme values come from setting the derivative to zero — and they are reciprocals about the value 1.",
      definition:
        "**Trig minimum:** for \\(a > b > 0\\), the minimum of \\(a\\sec\\theta - b\\tan\\theta\\) on \\((0, \\tfrac{\\pi}{2})\\) is \\(\\sqrt{a^2 - b^2}\\), reached when \\(\\sin\\theta = \\dfrac{b}{a}\\).\n" +
        "**Harmonic (\\(a\\sin\\theta + b\\cos\\theta\\)):** its extreme values are \\(\\pm\\sqrt{a^2 + b^2}\\).\n" +
        "**Rational \\(\\dfrac{x^2 - x + 1}{x^2 + x + 1}\\):** \\(y' = \\dfrac{2(x^2 - 1)}{(x^2 + x + 1)^2} = 0\\) at \\(x = \\pm 1\\); \\(f(-1) = 3\\) (max), \\(f(1) = \\tfrac{1}{3}\\) (min), so the range is \\(\\big[\\tfrac13, 3\\big]\\).",
      formula: {
        label: "Key extremum formulas",
        latex: "\\min(a\\sec\\theta - b\\tan\\theta) = \\sqrt{a^2 - b^2}\\ (a>b), \\qquad \\max/\\min(a\\sin\\theta + b\\cos\\theta) = \\pm\\sqrt{a^2 + b^2}",
        symbols: [
          { symbol: "a, b", meaning: "coefficients; for the sec–tan form require a > b > 0" },
        ],
      },
      authoredExample: {
        prompt: "For real \\(x\\), find the minimum value of \\(\\dfrac{1 - x + x^2}{1 + x + x^2}\\).",
        steps: [
          "\\(y = \\dfrac{1 - x + x^2}{1 + x + x^2}\\); by the quotient rule \\(y' = \\dfrac{2(x^2 - 1)}{(1 + x + x^2)^2} = 0 \\Rightarrow x = \\pm 1\\).",
          "\\(f(1) = \\dfrac{1}{3}\\), \\(f(-1) = \\dfrac{3}{1} = 3\\).",
          "The smaller is \\(\\dfrac{1}{3}\\), so the minimum value is \\(\\dfrac{1}{3}\\) (and the maximum is \\(3\\)).",
        ],
        answer: "Minimum \\(= \\dfrac{1}{3}\\).",
      },
      selfCheckExample: {
        prompt: "Find the minimum value of \\(f(x) = \\sin^4 x + \\cos^4 x\\) on \\(0 < x < \\tfrac{\\pi}{2}\\).",
        steps: [
          "Use \\(\\sin^4 x + \\cos^4 x = 1 - 2\\sin^2 x\\cos^2 x = 1 - \\tfrac{1}{2}\\sin^2 2x\\).",
          "This is least when \\(\\sin^2 2x\\) is greatest, i.e. \\(\\sin^2 2x = 1\\) at \\(x = \\tfrac{\\pi}{4}\\).",
          "Minimum value \\(= 1 - \\tfrac{1}{2} = \\tfrac{1}{2}\\).",
        ],
        answer: "Minimum \\(= \\dfrac{1}{2}\\) at \\(x = \\dfrac{\\pi}{4}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\min(a\\sec\\theta - b\\tan\\theta)\\), \\(a > b\\)?", answer: "\\(\\sqrt{a^2 - b^2}\\)" },
        { prompt: "Max of \\(5\\sin\\theta + 12\\cos\\theta\\)?", answer: "\\(13\\)", method: "\\(\\sqrt{25 + 144}\\)" },
        { prompt: "Min of \\(\\dfrac{1 - x + x^2}{1 + x + x^2}\\)?", answer: "\\(\\tfrac{1}{3}\\)", method: "at \\(x = 1\\)" },
        { prompt: "Min of \\(\\sin^4 x + \\cos^4 x\\) on \\((0, \\tfrac{\\pi}{2})\\)?", answer: "\\(\\tfrac{1}{2}\\)", method: "\\(1 - \\tfrac12\\sin^2 2x\\), at \\(x = \\tfrac\\pi4\\)" },
      ],
      pyqExampleId: "7b2224ae-af9e-45ac-88fb-150dadc36ed9", // min a sec θ - b tan θ = √(a²-b²)
      traps: [
        {
          title: "\\(\\sec\\)–\\(\\tan\\) minimum is \\(\\sqrt{a^2 - b^2}\\), not \\(\\sqrt{a^2 + b^2}\\)",
          body:
            "The sec–tan form gives \\(\\sqrt{a^2 - b^2}\\) (a difference under the root), whereas the harmonic form \\(a\\sin\\theta + b\\cos\\theta\\) gives \\(\\sqrt{a^2 + b^2}\\) (a sum). Mixing the two is the classic error — check whether you have \\(\\sec/\\tan\\) or \\(\\sin/\\cos\\).",
        },
        {
          title: "For a symmetric rational, both \\(x = \\pm 1\\) matter",
          body:
            "\\(\\dfrac{x^2 - x + 1}{x^2 + x + 1}\\) has critical points at BOTH \\(x = 1\\) and \\(x = -1\\), giving \\(\\tfrac13\\) (min) and \\(3\\) (max). Evaluating only one loses either the greatest or the least value — you need both for a 'difference' or 'range' question.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Differentiation notes",
      href: "/notes/mht-cet-maths/differentiation/cetdiff-foundations-chain",
    },
    { label: "MHT-CET Maths bank", href: "/browse?exam=mht-cet&subject=Mathematics" },
  ],
};
