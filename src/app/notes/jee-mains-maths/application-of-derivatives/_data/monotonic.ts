import type { SubtopicNote } from "@/app/notes/_types";

export const MONOTONIC_AOD_NOTE: SubtopicNote = {
  subtopicName: "Increasing and Decreasing Functions",
  title: "Increasing and Decreasing Functions",
  oneLineDefinition:
    "Reading where a function rises or falls from the sign of its derivative, choosing a parameter so a function is monotonic, and using monotonicity to compare values.",
  whyItMatters:
    "Twenty-seven PYQs, twenty-three of them multiple choice. Fourteen find where a function increases or decreases from the sign of f′; six choose a parameter so that a function is monotonic, or has no critical point; seven use the fact that f′ increases when f″ > 0, or that a monotonic function keeps the order of its inputs. Three ideas cover the page.",
  concepts: [
    // C1 — sign of the derivative
    {
      kind: "formula" as const,
      slug: "jaod-sign",
      name: "The sign of the derivative",
      intuition:
        "A function increases where \\(f'>0\\) and decreases where \\(f'<0\\). Factor \\(f'\\), mark its zeros and the points where it or \\(f\\) is undefined, and read the sign on each interval. Zeros of \\(f'\\) at isolated points do not stop a function increasing: \\(x^3\\) increases everywhere.",
      definition:
        "- \\(f'>0\\) on an interval: \\(f\\) strictly increasing there (isolated zeros allowed).\n" +
        "- \\(f'<0\\): strictly decreasing.\n" +
        "- Make a sign chart of \\(f'\\) between its zeros and the gaps in the domain.\n" +
        "- \\((x^x)'=x^x(\\ln x+1)\\).",
      formula: {
        label: "Monotonicity test",
        latex: "f'(x)>0\\ \\text{on }I\\ \\Rightarrow\\ f\\ \\text{increasing on }I",
      },
      authoredExample: {
        prompt: "Where does \\(f(x)=x^3-3x^2-9x\\) increase?",
        steps: [
          "\\(f'(x)=3(x-3)(x+1)\\), positive outside \\([-1,3]\\).",
        ],
        answer: "On \\((-\\infty,-1)\\) and \\((3,\\infty)\\); it decreases on \\((-1,3)\\).",
      },
      selfCheckExample: {
        prompt: "Where does \\(f(x)=xe^{-x}\\) increase?",
        steps: [
          "\\(f'(x)=(1-x)e^{-x}\\), positive for \\(x<1\\).",
        ],
        answer: "On \\((-\\infty,1)\\).",
      },
      practiceSet: [
        { prompt: "Is \\(\\frac1x\\) decreasing on \\((-\\infty,0)\\cup(0,\\infty)\\)?", answer: "No — only on each piece" },
        { prompt: "\\(x-\\sin x\\) is?", answer: "Increasing everywhere" },
        { prompt: "Where does \\(\\frac{\\ln x}x\\) increase?", answer: "\\((0,e)\\)" },
        { prompt: "Where does \\(e^x+e^{-x}\\) increase?", answer: "\\((0,\\infty)\\)" },
      ],
      pyqExampleId: "37a7a3f3-f133-42d3-8fdf-9ffec97bc49e", // 2024 — x/(x^2 - 6x - 16) decreases on each piece of its domain
      traps: [
        {
          title: "Each piece is not the union",
          body: "\\(\\frac1x\\) decreases on \\((-\\infty,0)\\) and on \\((0,\\infty)\\), but \\(\\frac1{-1}<\\frac11\\), so it does not decrease on their union. Options often hinge on this.",
        },
      ],
    },

    // C2 — parameters
    {
      kind: "formula" as const,
      slug: "jaod-param",
      name: "Parameters that make a function monotonic",
      intuition:
        "'Increasing for all \\(x\\)' means \\(f'(x)\\ge0\\) everywhere. When \\(f'\\) is a quadratic, that needs a positive leading coefficient and a discriminant \\(\\le0\\). On an interval, the least value of \\(f'\\) there must be \\(\\ge0\\). 'No critical point' means \\(f'\\) never vanishes: a constant plus a bounded term must never reach 0.",
      definition:
        "- \\(ax^2+bx+c\\ge0\\) for all \\(x\\): \\(a>0\\) and \\(b^2-4ac\\le0\\).\n" +
        "- Monotonic on \\(I\\): \\(\\min_I f'\\ge0\\) (or \\(\\max_I f'\\le0\\)).\n" +
        "- \\(f'=k+g\\) with \\(|g|\\le M\\): no zero when \\(|k|>M\\).",
      formula: {
        label: "Quadratic never negative",
        latex: "ax^2+bx+c\\ge0\\ \\forall x\\ \\Leftarrow\\ a>0,\\ b^2-4ac\\le0",
      },
      authoredExample: {
        prompt: "For which \\(k\\) is \\(x^3+kx^2+3x\\) increasing for all \\(x\\)?",
        steps: [
          "\\(f'(x)=3x^2+2kx+3\\ge0\\) needs \\(4k^2-36\\le0\\).",
        ],
        answer: "\\(-3\\le k\\le3\\).",
      },
      selfCheckExample: {
        prompt: "Find the least \\(a\\) for which \\(x^2+ax\\) is increasing on \\([2,5]\\).",
        steps: [
          "\\(2x+a\\ge0\\) on \\([2,5]\\); the smallest value of \\(2x\\) is 4.",
        ],
        answer: "\\(a=-4\\).",
      },
      practiceSet: [
        { prompt: "\\(ax+\\sin x\\) increasing on \\(\\mathbb R\\)?", answer: "\\(a\\ge1\\)" },
        { prompt: "\\(x^3+ax\\) increasing on \\(\\mathbb R\\)?", answer: "\\(a\\ge0\\)" },
        { prompt: "\\(kx-\\ln x\\) increasing on \\((1,\\infty)\\)?", answer: "\\(k\\ge1\\)" },
        { prompt: "Critical points of \\(2x-\\cos x\\)?", answer: "None" },
      ],
      pyqExampleId: "916c9d2b-10a8-4efc-9012-d26b7c8293f8", // 2022 — largest lambda for which a cubic increases on R
      traps: [
        {
          title: "Include the boundary value",
          body: "At the boundary value \\(f'\\) touches 0 at one point, and the function still increases. So 'increasing for all x' usually gives a closed condition like \\(\\lambda\\le\\frac13\\).",
        },
      ],
    },

    // C3 — f'' > 0 and order
    {
      kind: "formula" as const,
      slug: "jaod-composite",
      name: "Increasing derivatives and order",
      intuition:
        "If \\(f''>0\\), then \\(f'\\) is increasing, so \\(f'(u)>f'(v)\\) exactly when \\(u>v\\). That settles functions like \\(g(x)=f(x)+f(1-x)\\): \\(g'(x)=f'(x)-f'(1-x)\\) is negative when \\(x<1-x\\). Likewise, an increasing \\(f\\) keeps order — \\(f(u)>f(v)\\) exactly when \\(u>v\\) — which turns an inequality between values into one between inputs.",
      definition:
        "- \\(f''>0\\): \\(f'\\) increasing, so compare \\(f'(u)\\) and \\(f'(v)\\) by comparing \\(u\\) and \\(v\\).\n" +
        "- \\(f\\) increasing: \\(f(u)>f(v)\\) exactly when \\(u>v\\); decreasing reverses it.\n" +
        "- \\(\\frac{\\ln x}x\\) decreases for \\(x>e\\), which orders powers like \\(a^b\\) and \\(b^a\\).",
      formula: {
        label: "Symmetric sum",
        latex: "g(x)=f(x)+f(c-x):\\ g'(x)=f'(x)-f'(c-x)",
      },
      authoredExample: {
        prompt: "\\(f''>0\\) on \\((0,2)\\) and \\(g(x)=f(x)+f(2-x)\\). Where does \\(g\\) decrease?",
        steps: [
          "\\(g'(x)=f'(x)-f'(2-x)<0\\) exactly when \\(x<2-x\\).",
        ],
        answer: "On \\((0,1)\\); it increases on \\((1,2)\\).",
      },
      selfCheckExample: {
        prompt: "Which is larger, \\(3^\\pi\\) or \\(\\pi^3\\)?",
        steps: [
          "\\(\\frac{\\ln x}x\\) decreases for \\(x>e\\), so \\(\\frac{\\ln3}3>\\frac{\\ln\\pi}\\pi\\), i.e. \\(\\pi\\ln3>3\\ln\\pi\\).",
        ],
        answer: "\\(3^\\pi\\).",
      },
      practiceSet: [
        { prompt: "\\(f''>0\\) and \\(f'(2)=0\\): sign of \\(f'(3)\\)?", answer: "Positive" },
        { prompt: "\\(f\\) increasing and \\(f(a)>f(b)\\): then?", answer: "\\(a>b\\)" },
        { prompt: "\\(f'>0\\): where does \\(f(x^2)\\) increase?", answer: "\\((0,\\infty)\\)" },
        { prompt: "\\(e^x\\ge1+x\\): equality at?", answer: "\\(x=0\\)" },
      ],
      pyqExampleId: "24e5322a-7f1f-4897-8224-9f2eaa61935b", // 2023 — g(x) = f(x) + f(1 - x) with f'' > 0
      traps: [
        {
          title: "f″ > 0 is about f′, not f",
          body: "\\(f''>0\\) makes \\(f'\\) increase; \\(f\\) itself can still fall wherever \\(f'<0\\). Keep track of which function the sign statement is about.",
        },
      ],
    },
  ],
};
