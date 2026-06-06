import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONS_GREATEST_INTEGER_NOTE: SubtopicNote = {
  subtopicName: "Greatest Integer Function",
  title: "The Greatest Integer (Floor) Function",
  oneLineDefinition:
    "⌊x⌋ rounds down to the nearest integer; its staircase graph, fractional part, and floor-equations are the testable pieces.",
  whyItMatters:
    "Seven PYQs, and not one is EASY — every question here is MODERATE or HARD, so the floor function punches " +
    "above its weight. The traps cluster around negatives (⌊−1.3⌋ = −2, not −1), the jump-down behaviour at " +
    "integers, and the fractional part {x} = x − ⌊x⌋. Solving floor-equations and floor-sums rounds it out.",
  concepts: [
    // Floor definition + graph
    {
      kind: "formula" as const,
      slug: "funcs-floor-graph",
      name: "Definition, graph, and behaviour at integers",
      intuition:
        "\\(\\lfloor x\\rfloor\\) (written \\([x]\\) in NDA papers) is the **greatest integer not exceeding \\(x\\)** — " +
        "round **down** on the number line. The graph is a staircase: flat on each \\([n,n+1)\\), then a jump up by 1 " +
        "at the next integer.",
      definition:
        "\\([x]=n\\) where \\(n\\) is the unique integer with \\(n\\le x<n+1\\). Properties:\n" +
        "- \\([x]\\le x<[x]+1\\), and \\([x]=x\\) exactly when \\(x\\) is an integer.\n" +
        "- **Discontinuous** (jump of 1) at every integer; **constant** in between, so its derivative is 0 on each open interval \\((n,n+1)\\).\n" +
        "- Range is \\(\\mathbb{Z}\\); domain is \\(\\mathbb{R}\\).",
      visualizationSlug: "greatest-integer-staircase",
      authoredExample: {
        prompt: "Evaluate \\([2.7]\\), \\([-1.3]\\), and \\([5]\\).",
        steps: [
          "\\([2.7]\\): greatest integer \\(\\le 2.7\\) is \\(2\\).",
          "\\([-1.3]\\): greatest integer \\(\\le -1.3\\) is \\(-2\\) (round **down**, not toward zero).",
          "\\([5]\\): \\(5\\) is already an integer, so \\([5]=5\\).",
        ],
        answer: "\\([2.7]=2,\\ [-1.3]=-2,\\ [5]=5\\).",
      },
      practiceSet: [
        { prompt: "\\([3.99]\\)?", answer: "\\(3\\)" },
        { prompt: "\\([-0.5]\\)?", answer: "\\(-1\\)" },
        { prompt: "Is \\([x]\\) continuous at \\(x=2\\)?", answer: "No — it jumps there" },
        { prompt: "Derivative of \\([x]\\) at \\(x=2.4\\)?", answer: "\\(0\\) (flat between integers)" },
      ],
      traps: [
        {
          title: "Floor rounds DOWN, so negatives go further from zero",
          body:
            "\\([-1.3]=-2\\), not \\(-1\\): you must go to the integer **below**. Truncating toward zero is the most " +
            "common floor mistake on negative inputs.",
        },
      ],
      pyqExampleId: "7465ba37-4712-4572-8dab-ecf0b92fe4d2", // 2022 — y=[x] continuity/derivative
    },

    // Fractional part
    {
      kind: "formula" as const,
      slug: "funcs-fractional-part",
      name: "The fractional part {x} = x − [x]",
      intuition:
        "Whatever the floor throws away is the **fractional part** \\(\\{x\\}=x-[x]\\). It is the leftover after " +
        "rounding down, so it always lands in \\([0,1)\\) — even for negative \\(x\\).",
      definition:
        "\\(\\{x\\}=x-[x]\\in[0,1)\\) for every real \\(x\\). Equivalently \\([x]-x=-\\{x\\}\\in(-1,0]\\). " +
        "It is periodic with period 1. For a non-integer \\(x\\), \\([x]-x\\) is strictly between \\(-1\\) and \\(0\\), " +
        "so \\(\\big[[x]-x\\big]=-1\\).",
      authoredExample: {
        prompt: "Find \\(\\{-2.3\\}\\).",
        steps: [
          "\\([-2.3]=-3\\) (floor rounds down).",
          "\\(\\{-2.3\\}=-2.3-(-3)=0.7\\).",
          "As expected, the result is in \\([0,1)\\).",
        ],
        answer: "\\(\\{-2.3\\}=0.7\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(x\\) is positive and not an integer, what is \\(\\big[[x]-x\\big]\\)?",
        steps: [
          "\\([x]-x=-\\{x\\}\\), and \\(\\{x\\}\\in(0,1)\\) for a non-integer, so \\([x]-x\\in(-1,0)\\).",
          "The floor of any value strictly between \\(-1\\) and \\(0\\) is \\(-1\\).",
        ],
        answer: "\\(-1\\).",
      },
      pyqExampleId: "c1fa36c4-2fad-4e39-b72c-e1fc69e67041", // 2022 — z=[[x]−x] = −1
    },

    // Floor equations and sums
    {
      kind: "formula" as const,
      slug: "funcs-floor-equations",
      name: "Floor equations and sums",
      intuition:
        "To solve an equation in \\([x]\\), treat \\([x]\\) as an **integer unknown** \\(n\\), solve the ordinary " +
        "equation for \\(n\\), then translate each integer back to the interval \\([n,n+1)\\). For floor sums, count " +
        "how many terms share each floor value.",
      definition:
        "Key idea: \\([x]=n\\iff x\\in[n,n+1)\\). So a polynomial equation in \\([x]\\) becomes a polynomial in the " +
        "integer \\(n\\); solve it, keep integer roots, and convert. For sums \\(\\sum[\\,\\cdot\\,]\\), group the index " +
        "range by where the floor value changes.",
      authoredExample: {
        prompt: "Solve \\([x]^2-5[x]+6=0\\) for real \\(x\\).",
        steps: [
          "Let \\(n=[x]\\): \\(n^2-5n+6=0\\Rightarrow(n-2)(n-3)=0\\), so \\(n=2\\) or \\(3\\).",
          "\\([x]=2\\Rightarrow x\\in[2,3)\\); \\([x]=3\\Rightarrow x\\in[3,4)\\).",
          "Union the intervals.",
        ],
        answer: "\\(x\\in[2,4)\\).",
      },
      selfCheckExample: {
        prompt: "How many real \\(x\\) satisfy \\([x]=4\\)? Describe them.",
        steps: [
          "\\([x]=4\\iff 4\\le x<5\\).",
          "That is the whole interval \\([4,5)\\) — infinitely many values.",
        ],
        answer: "All \\(x\\in[4,5)\\) (infinitely many).",
      },
      traps: [
        {
          title: "[x] = n is an interval, not a single point",
          body:
            "Solving a floor-equation gives **integer values of \\([x]\\)**; each one unpacks to a whole interval " +
            "\\([n,n+1)\\) of real \\(x\\). Reporting only the integers \\(x=n\\) misses the rest of the solution set.",
        },
      ],
      pyqExampleId: "23a57a18-2a62-41dc-bdbe-204e3f0ad6df", // 2024 — [x]²−30[x]+221=0, sum of integer solutions
    },
  ],
};
