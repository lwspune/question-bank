import type { SubtopicNote } from "@/app/notes/_types";

export const ABSOLUTE_AOD_NOTE: SubtopicNote = {
  subtopicName: "Greatest and Least Values",
  title: "Greatest and Least Values",
  oneLineDefinition:
    "The absolute maximum and minimum of a function: on a closed interval by comparing critical points with the endpoints, and over a whole domain by limits, substitution or AM-GM.",
  whyItMatters:
    "Twenty-six PYQs, twenty-one of them multiple choice, and four from 2026. Eighteen find the greatest and least values on a closed interval, often with a modulus or a greatest-integer part that adds corners; eight find a range or a least value over an open domain, where a substitution or AM-GM is quicker than differentiating. Two ideas cover the page.",
  concepts: [
    // C1 — closed interval
    {
      kind: "formula" as const,
      slug: "jaod-closed",
      name: "Closed interval: critical points and endpoints",
      intuition:
        "On \\([a,b]\\), a continuous function reaches its greatest and least values either at an endpoint or at a critical point inside. So list the critical points in the interval, add \\(a\\) and \\(b\\), evaluate \\(f\\) at all of them, and pick the largest and smallest. If \\(f\\) is monotonic on the interval, only the endpoints matter. For \\(|g|\\) or \\([g]\\), split the interval where \\(g\\) changes sign or crosses an integer.",
      definition:
        "- Candidates: endpoints, zeros of \\(f'\\), points where \\(f'\\) does not exist.\n" +
        "- Monotonic on \\([a,b]\\): extremes at \\(a\\) and \\(b\\).\n" +
        "- \\(\\tan^{-1}\\), \\(e^x\\), \\(\\ln x\\) are increasing: extremes of \\(\\tan^{-1}g\\) come from extremes of \\(g\\).\n" +
        "- \\([g]\\) is constant between the points where \\(g\\) crosses an integer.",
      formula: {
        label: "Closed-interval method",
        latex: "\\max_{[a,b]}f=\\max\\{f(a),\\,f(b),\\,f(c):f'(c)=0\\}",
      },
      authoredExample: {
        prompt: "Find the greatest and least values of \\(x^3-3x\\) on \\([0,2]\\).",
        steps: [
          "The critical point inside is \\(x=1\\): \\(f(1)=-2\\). Endpoints: \\(f(0)=0\\), \\(f(2)=2\\).",
        ],
        answer: "Greatest 2, least \\(-2\\).",
      },
      selfCheckExample: {
        prompt: "Find the greatest and least values of \\(\\sin x+\\cos x\\) on \\([0,\\pi]\\).",
        steps: [
          "\\(\\sin x+\\cos x=\\sqrt2\\sin\\left(x+\\frac\\pi4\\right)\\); \\(x+\\frac\\pi4\\in\\left[\\frac\\pi4,\\frac{5\\pi}4\\right]\\).",
        ],
        answer: "Greatest \\(\\sqrt2\\) at \\(\\frac\\pi4\\), least \\(-1\\) at \\(\\pi\\).",
      },
      practiceSet: [
        { prompt: "\\(x^2-4x\\) on \\([0,3]\\)?", answer: "Least \\(-4\\), greatest \\(0\\)" },
        { prompt: "Greatest \\(e^x\\) on \\([0,1]\\)?", answer: "\\(e\\)" },
        { prompt: "Greatest \\(|x-1|\\) on \\([0,3]\\)?", answer: "\\(2\\)" },
        { prompt: "Greatest \\(x+\\frac1x\\) on \\(\\left[\\frac12,2\\right]\\)?", answer: "\\(\\frac52\\)" },
      ],
      pyqExampleId: "41de5d15-6a4c-42cb-a432-75ebeb94b714", // 2024 — M - m for (x + 3)^2 (x - 2)^3 on [-4, 4]
      traps: [
        {
          title: "The endpoints count",
          body: "A local maximum inside the interval can be smaller than the value at an endpoint. In \\((x+3)^2(x-2)^3\\) on \\([-4,4]\\), both the greatest and the least values sit at endpoints.",
        },
      ],
    },

    // C2 — open domains and ranges
    {
      kind: "formula" as const,
      slug: "jaod-global",
      name: "Ranges and least values over a whole domain",
      intuition:
        "Over an open domain there are no endpoints, so compare the critical values with the limits at the ends of the domain. Two shortcuts save work. For a ratio of quadratics, set it equal to \\(y\\) and require the quadratic in \\(x\\) to have a real root. For a sum of two positive terms whose product is fixed, AM-GM gives the least value directly.",
      definition:
        "- Compare critical values with the limits at the ends of the domain.\n" +
        "- \\(y=\\frac{P(x)}{Q(x)}\\) (quadratics): real \\(x\\) needs a discriminant \\(\\ge0\\) in \\(x\\).\n" +
        "- AM-GM: \\(a+b\\ge2\\sqrt{ab}\\) for \\(a,b>0\\), equality at \\(a=b\\).\n" +
        "- Substitute \\(t=\\sin x\\), \\(t=e^x\\) and so on, keeping \\(t\\) in its range.",
      formula: {
        label: "AM-GM",
        latex: "a+b\\ge2\\sqrt{ab}\\quad(a,b>0),\\ \\text{equality when }a=b",
      },
      authoredExample: {
        prompt: "Find the least value of \\(x^2+\\frac{16}{x^2}\\).",
        steps: [
          "AM-GM: \\(x^2+\\frac{16}{x^2}\\ge2\\sqrt{16}\\), with equality at \\(x^2=4\\).",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Find the range of \\(\\frac{x^2+1}{x^2+x+1}\\).",
        steps: [
          "\\((y-1)x^2+yx+(y-1)=0\\) needs \\(y^2-4(y-1)^2\\ge0\\), i.e. \\((2-y)(3y-2)\\ge0\\).",
        ],
        answer: "\\(\\left[\\frac23,2\\right]\\).",
      },
      practiceSet: [
        { prompt: "Least \\(e^x+e^{-x}\\)?", answer: "\\(2\\)" },
        { prompt: "Least \\(x+\\frac4x\\) for \\(x>0\\)?", answer: "\\(4\\)" },
        { prompt: "Greatest \\(xe^{-x}\\)?", answer: "\\(\\frac1e\\)" },
        { prompt: "Least \\(\\frac1s+\\frac1{1-s}\\) on \\((0,1)\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "49a41523-7338-4b60-80bf-9e59a204a5cf", // 2024 — max + min of (2x^2 - 3x + 8)/(2x^2 + 3x + 8)
      traps: [
        {
          title: "Is the bound reached?",
          body: "AM-GM and the discriminant give bounds. Check that the equality case happens at an allowed \\(x\\); if it does not, the bound is not the least value.",
        },
      ],
    },
  ],
};
