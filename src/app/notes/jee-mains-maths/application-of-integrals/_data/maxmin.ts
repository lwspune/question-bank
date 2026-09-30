import type { SubtopicNote } from "@/app/notes/_types";

export const MAXMIN_AOI_NOTE: SubtopicNote = {
  subtopicName: "Max, Min and Piecewise Boundaries",
  title: "Max, Min and Piecewise Boundaries",
  oneLineDefinition:
    "Regions whose boundary is the smaller or larger of two curves, or a function defined in pieces, split wherever the rule changes.",
  whyItMatters:
    "Eleven PYQs, four of them multiple choice. Seven have a boundary given by the min or max of two curves, so the top switches where they cross; four define the boundary piecewise — through a composite, a greatest-integer term, a sign chart or a differentiability condition. Two ideas cover the page.",
  concepts: [
    // C1 — min and max
    {
      kind: "formula" as const,
      slug: "jaoi-min-max",
      name: "The min or max of two curves",
      intuition:
        "\\(\\min\\{f,g\\}\\) is whichever curve is lower at each x, so it switches from one to the other where \\(f=g\\). Find those crossings, decide which curve is lower on each piece, and integrate that one. \\(0\\le y\\le\\min\\{f,g\\}\\) is simply the region under both curves at once.",
      definition:
        "- \\(\\min\\{f,g\\}=f\\) where \\(f\\le g\\), and g elsewhere; \\(\\max\\) is the reverse.\n" +
        "- The switch points are the roots of \\(f=g\\).\n" +
        "- With \\(0\\le y\\), keep only the x where the boundary is non-negative.",
      formula: {
        label: "Integrate the lower curve on each piece",
        latex: "\\int_a^b\\min\\{f,g\\}\\,dx=\\int_a^c f\\,dx+\\int_c^b g\\,dx\\quad(f\\le g\\text{ on }[a,c])",
      },
      authoredExample: {
        prompt: "Find the area of \\(\\{(x,y):0\\le x\\le3,\\ 0\\le y\\le\\min\\{x^2,4\\}\\}\\).",
        steps: [
          "\\(x^2=4\\) at \\(x=2\\): the boundary is \\(x^2\\) on \\([0,2]\\) and 4 on \\([2,3]\\).",
          "Area \\(=\\int_0^2x^2\\,dx+4\\cdot1=\\frac83+4\\).",
        ],
        answer: "\\(\\frac{20}3\\).",
      },
      selfCheckExample: {
        prompt: "Find the area between \\(y=\\max\\{x,x^2\\}\\) and the x-axis for \\(0\\le x\\le3\\).",
        steps: [
          "\\(x\\ge x^2\\) on \\([0,1]\\) and \\(x^2\\ge x\\) on \\([1,3]\\).",
          "Area \\(=\\int_0^1x\\,dx+\\int_1^3x^2\\,dx=\\frac12+\\frac{26}3\\).",
        ],
        answer: "\\(\\frac{55}6\\).",
      },
      practiceSet: [
        { prompt: "Area under \\(\\min\\{x,1\\}\\) on \\([0,2]\\)?", answer: "\\(\\frac32\\)" },
        { prompt: "Where does \\(\\min\\{2x,6-x\\}\\) switch?", answer: "\\(x=2\\)" },
        { prompt: "\\(\\max\\{x,2-x\\}\\) at \\(x=0\\)?", answer: "\\(2\\)" },
        { prompt: "Area of \\(0\\le y\\le\\min\\{x,4-x\\}\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "553cee3c-8d33-45b6-bb97-9e6eaa0bcc2c", // 2025 — under both 2|x| + 1 and x^2 + 1
      traps: [
        {
          title: "The min can dip below the axis",
          body: "With \\(0\\le y\\le\\min\\{f,g\\}\\), the region exists only where the min is non-negative. Find where the lower curve crosses the x-axis — that, not a crossing of f and g, may be the end of the region.",
        },
      ],
    },

    // C2 — piecewise rules
    {
      kind: "formula" as const,
      slug: "jaoi-piecewise",
      name: "Piecewise rules, composites and the greatest integer",
      intuition:
        "Rewrite the boundary as a list of ordinary curves on intervals, then integrate piece by piece. For a composite, find the pieces of the inner function first and apply the outer one to each. For \\([x]\\), each unit interval is a constant. For a sign condition, draw the sign chart and keep only the intervals that pass.",
      definition:
        "- \\([x]=n\\) on \\([n,n+1)\\).\n" +
        "- \\(\\frac{t+|t|}2\\) is t for \\(t\\ge0\\) and 0 for \\(t<0\\).\n" +
        "- Differentiable at a joint: the two pieces agree in value and in slope there.\n" +
        "- Sign condition: keep the intervals of the sign chart where it holds.",
      formula: {
        label: "Add the pieces",
        latex: "\\int_a^b f\\,dx=\\sum_{i}\\int_{x_{i-1}}^{x_i}f_i(x)\\,dx",
      },
      authoredExample: {
        prompt: "Let \\(f(t)=\\frac{t+|t|}2\\). Find the area between \\(y=f(x^2-1)\\) and the x-axis for \\(-2\\le x\\le2\\).",
        steps: [
          "\\(f(t)=t\\) for \\(t\\ge0\\) and 0 for \\(t<0\\).",
          "So \\(f(x^2-1)=x^2-1\\) when \\(|x|\\ge1\\) and 0 when \\(|x|<1\\).",
          "Area \\(=2\\int_1^2(x^2-1)\\,dx=2\\cdot\\frac43\\).",
        ],
        answer: "\\(\\frac83\\).",
      },
      selfCheckExample: {
        prompt: "Find the area under \\(y=x[x]\\) from \\(x=0\\) to \\(x=2\\).",
        steps: [
          "On \\([0,1)\\), \\([x]=0\\), so \\(y=0\\).",
          "On \\([1,2)\\), \\([x]=1\\), so \\(y=x\\), and \\(\\int_1^2x\\,dx=\\frac32\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^3[x]\\,dx\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\frac{x+|x|}2\\) at \\(x=-3\\)?", answer: "\\(0\\)" },
        { prompt: "Sign of \\(x(x-1)(x-2)\\) on \\((1,2)\\)?", answer: "Negative" },
        { prompt: "\\(x^2\\) for \\(x<1\\), \\(bx+c\\) for \\(x\\ge1\\): differentiable at 1 when?", answer: "\\(b=2\\), \\(c=-1\\)" },
      ],
      pyqExampleId: "9b025c51-f678-4774-9ae6-d8446cb72727", // 2025 — a differentiable piecewise function and a line
      traps: [
        {
          title: "Split at every jump",
          body: "\\([x^2]\\) jumps where \\(x^2\\) is an integer: at \\(x=1\\), \\(\\sqrt2\\) and \\(\\sqrt3\\), not only at whole numbers of x. Find where the inside of the bracket crosses an integer.",
        },
      ],
    },
  ],
};
