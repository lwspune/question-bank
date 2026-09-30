import type { SubtopicNote } from "@/app/notes/_types";

export const PIECEWISE_DIFF_NOTE: SubtopicNote = {
  subtopicName: "Differentiability of Piecewise Functions",
  title: "Differentiability of Piecewise Functions",
  oneLineDefinition:
    "Testing whether a function built from pieces, a composite or a running maximum is differentiable, and finding a derivative at one point from the limit that defines it.",
  whyItMatters:
    "Eighteen PYQs, sixteen of them multiple choice, and one from 2026. Nine make two pieces meet with matching slopes, or test whether they do; five handle a composite g(f(x)) or a running maximum or minimum; four study functions like x² sin(1/x) near 0, or find f′(0) from the limit that defines it. Three ideas cover the page.",
  concepts: [
    // C1 — the join
    {
      kind: "formula" as const,
      slug: "jdiff-join",
      name: "Where two pieces join",
      intuition:
        "A piecewise function is differentiable at a join exactly when the two pieces meet there and meet with the same slope. That gives two equations, so two unknown constants can be fixed. Continuity alone is not enough, since a corner is continuous. Equal slopes alone are not enough either: two pieces with the same slope at different heights make a jump.",
      definition:
        "- Continuity at \\(a\\): left value = right value = \\(f(a)\\).\n" +
        "- Differentiability at \\(a\\): continuity and left slope = right slope.\n" +
        "- For formula pieces, each one-sided slope is that piece's derivative at \\(a\\).\n" +
        "- A piece \\(\\int_0^xg(t)\\,dt\\) has slope \\(g(x)\\).",
      formula: {
        label: "Smooth join at x = a",
        latex: "f_1(a)=f_2(a)\\quad\\text{and}\\quad f_1'(a)=f_2'(a)",
      },
      authoredExample: {
        prompt: "Find \\(a\\) and \\(b\\) so that \\(f(x)=x^2+a\\) for \\(x<2\\) and \\(f(x)=bx+1\\) for \\(x\\ge2\\) is differentiable.",
        steps: [
          "Slopes at 2: \\(2x=4\\) on the left, \\(b\\) on the right, so \\(b=4\\).",
          "Values at 2: \\(4+a=2b+1=9\\), so \\(a=5\\).",
        ],
        answer: "\\(a=5,\\ b=4\\).",
      },
      selfCheckExample: {
        prompt: "Is \\(f(x)=x^2\\) for \\(x<1\\), \\(f(x)=2x-1\\) for \\(x\\ge1\\), differentiable at 1?",
        steps: [
          "Values: \\(1\\) and \\(2-1=1\\).",
          "Slopes: \\(2x=2\\) and \\(2\\).",
        ],
        answer: "Yes: the values and the slopes both match.",
      },
      practiceSet: [
        { prompt: "\\(|x-2|\\) at \\(x=2\\)?", answer: "Continuous, not differentiable" },
        { prompt: "\\(f=x+1\\) for \\(x<0\\), \\(e^x\\) for \\(x\\ge0\\): differentiable at 0?", answer: "Yes: values 1 and 1, slopes 1 and 1" },
        { prompt: "\\(f=kx\\) for \\(x<1\\), \\(x^2\\) for \\(x\\ge1\\), continuous: \\(k\\), and differentiable at 1?", answer: "\\(k=1\\); not differentiable (slopes 1 and 2)" },
        { prompt: "\\(\\frac{d}{dx}\\int_0^x|t-1|\\,dt\\) at \\(x=3\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "40560c60-f073-46ba-96db-78d871ff7c20", // 2026 — α, β so that a quadratic piece and a linear piece join smoothly at x = 1
      traps: [
        {
          title: "Continuity comes first",
          body: "Matching slopes is not enough. \\(x\\) for \\(x<0\\) and \\(x+1\\) for \\(x\\ge0\\) have slope 1 on both sides but jump at 0, so the function is not differentiable there. Write both equations.",
        },
      ],
    },

    // C2 — composites and running maxima
    {
      kind: "formula" as const,
      slug: "jdiff-composite",
      name: "Composites and running maxima",
      intuition:
        "For \\(g(f(x))\\), trouble can come only from points where \\(f\\) is not differentiable, or where \\(f(x)\\) lands on a point where \\(g\\) is not. Find those \\(x\\), write \\(g(f(x))\\) as explicit pieces near each one, and test the join. A function like \\(\\max\\{h(t):t\\le x\\}\\) is the largest value so far: it follows \\(h\\) while \\(h\\) rises and stays flat after a peak.",
      definition:
        "- \\(g\\circ f\\) can fail only where \\(f\\) fails or where \\(f(x)\\) hits a bad point of \\(g\\).\n" +
        "- Write \\(g(f(x))\\) in pieces near each such point, then test the join.\n" +
        "- \\(\\max\\{h(t):t\\le x\\}\\) follows \\(h\\) while \\(h\\) rises and stays flat after a peak.\n" +
        "- \\(\\min\\{h(t):t\\le x\\}\\) follows \\(h\\) while \\(h\\) falls and stays flat after a trough.",
      formula: {
        label: "Chain rule at a point",
        latex: "(g\\circ f)'(a)=g'\\big(f(a)\\big)\\,f'(a)\\quad\\text{when both derivatives exist}",
      },
      authoredExample: {
        prompt: "\\(f(x)=\\max\\{t^2:-1\\le t\\le x\\}\\) for \\(x\\ge-1\\). Where in \\((-1,\\infty)\\) is \\(f\\) not differentiable?",
        steps: [
          "For \\(-1\\le x\\le1\\) the largest \\(t^2\\) so far is \\(1\\), from \\(t=-1\\).",
          "For \\(x>1\\) it is \\(x^2\\).",
          "At \\(x=1\\): slope \\(0\\) on the left, \\(2\\) on the right.",
        ],
        answer: "Only at \\(x=1\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=|x|\\) and \\(g(x)=x^2\\). Is \\(g(f(x))\\) differentiable at 0?",
        steps: [
          "\\(g(f(x))=|x|^2=x^2\\).",
        ],
        answer: "Yes, although \\(f\\) is not.",
      },
      practiceSet: [
        { prompt: "\\(f(x)=x^3\\), \\(g(x)=|x|\\): is \\(g(f(x))\\) differentiable at 0?", answer: "Yes: \\(|x^3|\\) has slope 0 on both sides" },
        { prompt: "\\(\\sin|x|\\) at \\(x=0\\)?", answer: "Not differentiable: slopes \\(-1\\) and \\(1\\)" },
        { prompt: "\\(\\max\\{\\cos t:0\\le t\\le x\\}\\) for \\(x\\ge0\\)?", answer: "\\(1\\) for every \\(x\\)" },
        { prompt: "\\(f(x)=x^2\\), \\(g(x)=|x-1|\\): where is \\(g(f(x))\\) not differentiable?", answer: "\\(x=\\pm1\\)" },
      ],
      pyqExampleId: "868da790-483c-46fe-a73f-e402dab80331", // 2023 — g∘f for two piecewise functions; continuous, one corner
      traps: [
        {
          title: "A bad inner function can be smoothed out",
          body: "\\(|x|\\) has a corner at 0, but \\(|x|^2=x^2\\) is smooth. Test \\(g\\circ f\\) itself at each suspect point; do not assume it fails because \\(f\\) does.",
        },
      ],
    },

    // C3 — first principles
    {
      kind: "formula" as const,
      slug: "jdiff-first-principles",
      name: "The derivative from its definition",
      intuition:
        "When a function has one formula away from a point and a separate value at it, the derivative there must come from the limit. For \\(x^2\\sin\\frac1x\\) with value 0 at 0, the difference quotient is \\(h\\sin\\frac1h\\to0\\), so \\(f'(0)=0\\); yet \\(f'(x)=2x\\sin\\frac1x-\\cos\\frac1x\\) has no limit at 0. The derivative exists everywhere but is not continuous. The limit also saves work: if \\(f(0)=0\\), then \\(f'(0)=\\lim\\frac{f(x)}{x}\\).",
      definition:
        "- \\(f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}\\).\n" +
        "- \\(x^n\\sin\\frac1x\\) with value 0 at 0: continuous for \\(n\\ge1\\), differentiable at 0 for \\(n\\ge2\\), with \\(f'\\) continuous at 0 for \\(n\\ge3\\).\n" +
        "- If \\(f(0)=0\\), then \\(f'(0)=\\lim_{x\\to0}\\frac{f(x)}{x}\\).",
      formula: {
        label: "Derivative at a point",
        latex: "f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}",
      },
      authoredExample: {
        prompt: "\\(f(x)=x^2\\sin\\frac1x\\) for \\(x\\ne0\\), \\(f(0)=0\\). Find \\(f'(0)\\), and decide whether \\(f'\\) is continuous at 0.",
        steps: [
          "\\(\\frac{f(h)-f(0)}{h}=h\\sin\\frac1h\\to0\\), so \\(f'(0)=0\\).",
          "For \\(x\\ne0\\): \\(f'(x)=2x\\sin\\frac1x-\\cos\\frac1x\\).",
          "\\(\\cos\\frac1x\\) has no limit as \\(x\\to0\\), so neither has \\(f'(x)\\).",
        ],
        answer: "\\(f'(0)=0\\), but \\(f'\\) is not continuous at 0.",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=\\frac{(e^x-1)\\cos x}{1+x^2}\\). Find \\(f'(0)\\).",
        steps: [
          "\\(f(0)=0\\), so \\(f'(0)=\\lim_{x\\to0}\\frac{e^x-1}{x}\\cdot\\frac{\\cos x}{1+x^2}\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(f(x)=x|x|\\): \\(f'(0)\\)?", answer: "\\(0\\)" },
        { prompt: "\\(x\\sin\\frac1x\\) with value 0 at 0: differentiable at 0?", answer: "No" },
        { prompt: "\\(f(x)=\\frac{x\\cos x}{1+\\sin x}\\): \\(f'(0)\\)?", answer: "\\(1\\)" },
        { prompt: "\\(x^3\\sin\\frac1x\\) with value 0 at 0: is \\(f'\\) continuous at 0?", answer: "Yes" },
      ],
      pyqExampleId: "f38af848-1695-48bc-8a86-db2bcb322ba2", // 2024 — f′(0) of a long product with a tan x factor, by the limit f(x)/x
      traps: [
        {
          title: "f′ can exist without being continuous",
          body: "For \\(x^2\\sin\\frac1x\\), the formula for \\(f'(x)\\) has no limit at 0, but \\(f'(0)=0\\) from the definition. Never decide differentiability at a point by taking the limit of the derivative formula.",
        },
      ],
    },
  ],
};
