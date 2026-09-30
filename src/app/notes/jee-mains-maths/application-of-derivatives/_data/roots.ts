import type { SubtopicNote } from "@/app/notes/_types";

export const ROOTS_AOD_NOTE: SubtopicNote = {
  subtopicName: "Counting Real Roots",
  title: "Counting Real Roots",
  oneLineDefinition:
    "Using the derivative to count how many times a graph crosses the x-axis: a monotonic function crosses at most once, and otherwise the signs of the local maxima and minima decide.",
  whyItMatters:
    "Ten PYQs, half of them numerical answers. Four show that a function is monotonic, so it has at most one root; six find the local maximum and minimum values and count the sign changes between them. No equation here is solved — only counted. Two ideas cover the page.",
  concepts: [
    // C1 — monotonic, one root
    {
      kind: "formula" as const,
      slug: "jaod-oneroot",
      name: "A monotonic function has at most one root",
      intuition:
        "If \\(f'>0\\) everywhere (or \\(f'<0\\)), the graph never turns, so it meets the axis at most once. To show it meets it once, find two points where \\(f\\) has opposite signs. A substitution such as \\(t=e^x\\) turns some equations into a polynomial on \\(t>0\\); count only the roots in that range.",
      definition:
        "- \\(f'\\) of one sign: at most one real root.\n" +
        "- \\(f(a)f(b)<0\\) with \\(f\\) continuous: a root in \\((a,b)\\).\n" +
        "- After \\(t=e^x\\), count roots with \\(t>0\\) only.",
      formula: {
        label: "At most one root",
        latex: "f'(x)>0\\ \\forall x\\ \\Rightarrow\\ f(x)=0\\ \\text{has at most one root}",
      },
      authoredExample: {
        prompt: "How many real roots has \\(x^3+x+1=0\\), and where?",
        steps: [
          "\\(f'(x)=3x^2+1>0\\), so at most one.",
          "\\(f(-1)=-1<0<1=f(0)\\).",
        ],
        answer: "One, in \\((-1,0)\\).",
      },
      selfCheckExample: {
        prompt: "Locate the real root of \\(x^5+2x-7=0\\).",
        steps: [
          "\\(f'=5x^4+2>0\\); \\(f(1)=-4\\) and \\(f(2)=29\\).",
        ],
        answer: "Exactly one, in \\((1,2)\\).",
      },
      practiceSet: [
        { prompt: "Roots of \\(e^x=-x\\)?", answer: "\\(1\\)" },
        { prompt: "Roots of \\(x+\\sin x=1\\)?", answer: "\\(1\\)" },
        { prompt: "Roots of \\(\\ln x=1-x\\)?", answer: "\\(1\\) (at \\(x=1\\))" },
        { prompt: "\\(f'>0\\) and \\(f(0)=0\\): roots?", answer: "Only \\(x=0\\)" },
      ],
      pyqExampleId: "a6512386-8987-43bf-a214-e3d1c6e43ccb", // 2022 — real solutions of x^7 + 5x^3 + 3x + 1 = 0
      traps: [
        {
          title: "At most one is not exactly one",
          body: "Monotonicity gives at most one root. It is exactly one only when \\(f\\) also takes both signs — check two values, or the limits at the ends.",
        },
      ],
    },

    // C2 — counting with extreme values
    {
      kind: "formula" as const,
      slug: "jaod-count",
      name: "Counting roots from the extreme values",
      intuition:
        "Between consecutive turning points the graph is monotonic, so it crosses the axis at most once there. List the local maxima and minima in order, with the limits at \\(\\pm\\infty\\), and count the sign changes along the list. For \\(f(x)=k\\), move the horizontal line \\(y=k\\): a cubic has three real roots exactly when \\(k\\) lies strictly between its local minimum and maximum values.",
      definition:
        "- Order: \\(f(-\\infty)\\), the extreme values, \\(f(\\infty)\\); count sign changes.\n" +
        "- Cubic \\(f(x)=k\\): three distinct roots when \\(f_{\\min}<k<f_{\\max}\\).\n" +
        "- A local extreme value equal to 0 is a repeated root.",
      formula: {
        label: "Three roots of a cubic",
        latex: "f(x)=k\\ \\text{has 3 distinct roots}\\ \\Leftarrow\\ f_{\\min}<k<f_{\\max}",
      },
      authoredExample: {
        prompt: "For which \\(k\\) has \\(x^3-3x+k=0\\) three distinct real roots?",
        steps: [
          "\\(g(x)=x^3-3x\\) has a local maximum 2 at \\(x=-1\\) and a local minimum \\(-2\\) at \\(x=1\\).",
          "\\(g(x)=-k\\) needs \\(-2<-k<2\\).",
        ],
        answer: "\\(|k|<2\\).",
      },
      selfCheckExample: {
        prompt: "How many real roots has \\(x^3-6x^2+9x-3=0\\)?",
        steps: [
          "\\(f'=3(x-1)(x-3)\\); \\(f(1)=1>0\\) and \\(f(3)=-3<0\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "Real roots of \\(x^3+3x-5=0\\)?", answer: "\\(1\\)" },
        { prompt: "Real roots of \\(x^4+1=0\\)?", answer: "\\(0\\)" },
        { prompt: "Real roots of \\(e^x=x^2\\)?", answer: "\\(1\\)" },
        { prompt: "\\(2x^3-3x^2+c=0\\) has three real roots for?", answer: "\\(0<c<1\\)" },
      ],
      pyqExampleId: "8a505fe3-4bc7-497a-b2c9-1fad5a663231", // 2022 — distinct real roots of x^7 - 7x - 2 = 0
      traps: [
        {
          title: "Count the ends too",
          body: "The first and last crossings come from the limits at \\(\\pm\\infty\\). An even-degree polynomial with positive leading term starts and ends positive, so a single minimum below 0 gives two roots, not one.",
        },
      ],
    },
  ],
};
