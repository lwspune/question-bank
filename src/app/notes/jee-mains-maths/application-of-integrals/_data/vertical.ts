import type { SubtopicNote } from "@/app/notes/_types";

export const VERTICAL_AOI_NOTE: SubtopicNote = {
  subtopicName: "Curves and Lines: Vertical Strips",
  title: "Curves and Lines: Vertical Strips",
  oneLineDefinition:
    "Regions bounded by parabolas, cubics and lines, found by integrating the top curve minus the bottom curve between the points where they meet.",
  whyItMatters:
    "Twenty PYQs, fourteen of them multiple choice, and three from 2026. Ten are a parabola against a line or against a second parabola; six have a top or bottom that changes partway — at a tangent, a second line or an axis — so the interval splits; four take y² = kx as y = √(kx) against a line or a cubic. Three ideas cover the page.",
  concepts: [
    // C1 — top minus bottom
    {
      kind: "formula" as const,
      slug: "jaoi-parabola-line",
      name: "Top minus bottom between the meeting points",
      intuition:
        "Equate the two curves to find where they meet; those x-values are the limits. Between them one curve stays on top, so the area is the integral of top minus bottom. For a parabola and a line, or two parabolas, top minus bottom is a quadratic that vanishes at both limits, and its integral has a closed form.",
      definition:
        "- Solve \\(f(x)=g(x)\\) for the limits \\(\\alpha<\\beta\\).\n" +
        "- Test one point between them to see which curve is on top.\n" +
        "- If top minus bottom is \\(a(x-\\alpha)(\\beta-x)\\) with \\(a>0\\), the area is \\(\\frac{a(\\beta-\\alpha)^3}{6}\\).",
      formula: {
        label: "Area between two curves",
        latex: "A=\\int_{\\alpha}^{\\beta}\\big(f(x)-g(x)\\big)\\,dx,\\qquad\\int_{\\alpha}^{\\beta}a(x-\\alpha)(\\beta-x)\\,dx=\\frac{a(\\beta-\\alpha)^3}{6}",
      },
      authoredExample: {
        prompt: "Find the area enclosed by \\(y=x^2\\) and \\(y=2x+3\\).",
        steps: [
          "\\(x^2=2x+3\\) gives \\(x=-1\\) and \\(x=3\\).",
          "At \\(x=0\\) the line (3) is above the parabola (0).",
          "\\(2x+3-x^2=(x+1)(3-x)\\), so the area is \\(\\frac{(3-(-1))^3}{6}=\\frac{64}{6}\\).",
        ],
        answer: "\\(\\frac{32}{3}\\).",
      },
      selfCheckExample: {
        prompt: "Find the area enclosed by \\(y=x^2-2x\\) and \\(y=4x-x^2\\).",
        steps: [
          "They meet where \\(2x^2=6x\\), so \\(x=0\\) and \\(x=3\\).",
          "Top minus bottom is \\(6x-2x^2=2x(3-x)\\), so \\(a=2\\).",
          "Area \\(=\\frac{2\\cdot3^3}{6}\\).",
        ],
        answer: "\\(9\\).",
      },
      practiceSet: [
        { prompt: "Area between \\(y=x^2\\) and \\(y=x\\)?", answer: "\\(\\frac16\\)" },
        { prompt: "Area between \\(y=x^2\\) and \\(y=4\\)?", answer: "\\(\\frac{32}{3}\\)" },
        { prompt: "Area between \\(y=2x^2\\) and \\(y=2\\)?", answer: "\\(\\frac83\\)" },
        { prompt: "Area between \\(y=x^2\\) and \\(y=3x\\)?", answer: "\\(\\frac92\\)" },
      ],
      pyqExampleId: "df3e3840-9978-4276-9eb5-eff87964e2e0", // 2026 — a parabola below a line
      traps: [
        {
          title: "A third bound can cut the top off",
          body: "When the region also has \\(y\\le c\\), the top is the lower of the two upper bounds. Find where the cap meets each curve and split the interval there before integrating.",
        },
      ],
    },

    // C2 — split where the boundary changes
    {
      kind: "formula" as const,
      slug: "jaoi-tangent-split",
      name: "Split where the top or bottom changes",
      intuition:
        "Some regions have three or more boundaries, so the top or the bottom switches partway across. List every x where two boundaries meet. Between consecutive ones the top and bottom are fixed, so integrate each piece and add. A tangent line is a common switching boundary: write it first, then find where it meets the axis or the other lines.",
      definition:
        "- Tangent to \\(y=f(x)\\) at \\(x=a\\): \\(y=f(a)+f'(a)(x-a)\\).\n" +
        "- Split the interval at every x where the top or the bottom changes.\n" +
        "- Pieces bounded only by straight lines are triangles: use \\(\\frac12\\times\\text{base}\\times\\text{height}\\).",
      formula: {
        label: "Split at the switch point c",
        latex: "A=\\int_{a}^{c}\\big(f_1-g\\big)\\,dx+\\int_{c}^{b}\\big(f_2-g\\big)\\,dx",
      },
      authoredExample: {
        prompt: "Find the area bounded by \\(y=x^2\\), its tangent at \\((1,1)\\) and the x-axis.",
        steps: [
          "Tangent: \\(y=1+2(x-1)=2x-1\\). It meets the x-axis at \\(x=\\frac12\\).",
          "The bottom is \\(y=0\\) on \\([0,\\frac12]\\) and the tangent on \\([\\frac12,1]\\).",
          "Area \\(=\\int_0^1x^2\\,dx-\\frac12\\cdot\\frac12\\cdot1=\\frac13-\\frac14\\).",
        ],
        answer: "\\(\\frac1{12}\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y=x^2\\), the line \\(y=2-x\\) and the x-axis.",
        steps: [
          "\\(x^2=2-x\\) at \\(x=1\\); the line meets the x-axis at \\(x=2\\).",
          "The top is \\(x^2\\) on \\([0,1]\\) and \\(2-x\\) on \\([1,2]\\).",
          "Area \\(=\\frac13+\\frac12\\).",
        ],
        answer: "\\(\\frac56\\).",
      },
      practiceSet: [
        { prompt: "Tangent to \\(y=x^2\\) at \\((2,4)\\)?", answer: "\\(y=4x-4\\)" },
        { prompt: "Tangent to \\(y=x^3\\) at \\((1,1)\\)?", answer: "\\(y=3x-2\\)" },
        { prompt: "Where does \\(y=4x-4\\) meet the x-axis?", answer: "\\(x=1\\)" },
        { prompt: "Area under \\(y=x\\) on \\([0,1]\\) plus under \\(y=2-x\\) on \\([1,2]\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "6fe32ab7-cf4a-4e02-9fe7-059f58ccaa5c", // 2026 — two regions whose boundaries change partway
      traps: [
        {
          title: "A tangent to a cubic crosses it again",
          body: "Solve curve = tangent in full. The point of contact is a double root, and the other root is where the tangent crosses the cubic again — that is the second limit.",
        },
      ],
    },

    // C3 — y^2 = kx as a square root
    {
      kind: "formula" as const,
      slug: "jaoi-root-curves",
      name: "Sideways parabolas as square roots",
      intuition:
        "In the first quadrant, \\(y^2=kx\\) is the curve \\(y=\\sqrt{kx}\\), which can be integrated in x like any other. Against a line \\(y=mx\\) through the origin, the two meet at \\(x=\\frac{k}{m^2}\\), and the area has a closed form.",
      definition:
        "- In the first quadrant, \\(y^2=kx\\) is \\(y=\\sqrt{kx}\\).\n" +
        "- \\(\\int_0^c\\sqrt{kx}\\,dx=\\frac23c\\sqrt{kc}\\): two-thirds of the rectangle it sits in.\n" +
        "- \\(y^2=4ax\\) meets \\(y=mx\\) at \\(x=\\frac{4a}{m^2}\\), and the area between them is \\(\\frac{8a^2}{3m^3}\\).",
      formula: {
        label: "Under a square-root curve",
        latex: "\\int_0^{c}\\sqrt{kx}\\,dx=\\frac23\\,c\\sqrt{kc}",
      },
      authoredExample: {
        prompt: "Find the area between \\(y^2=4x\\) and \\(y=x\\).",
        steps: [
          "\\(x^2=4x\\) gives \\(x=0\\) and \\(x=4\\).",
          "Area \\(=\\int_0^4\\big(2\\sqrt x-x\\big)\\,dx=\\frac43\\cdot8-8\\).",
        ],
        answer: "\\(\\frac83\\).",
      },
      selfCheckExample: {
        prompt: "Find the area between \\(y^2=x\\) and \\(y=\\frac x2\\).",
        steps: [
          "\\(\\frac{x^2}4=x\\) gives \\(x=0\\) and \\(x=4\\).",
          "Area \\(=\\int_0^4\\left(\\sqrt x-\\frac x2\\right)dx=\\frac{16}3-4\\).",
        ],
        answer: "\\(\\frac43\\).",
      },
      practiceSet: [
        { prompt: "\\(\\int_0^4\\sqrt x\\,dx\\)?", answer: "\\(\\frac{16}3\\)" },
        { prompt: "Where does \\(y^2=8x\\) meet \\(y=2x\\) (x > 0)?", answer: "\\((2,4)\\)" },
        { prompt: "Area between \\(y^2=4x\\) and \\(y=2x\\)?", answer: "\\(\\frac13\\)" },
        { prompt: "Area under \\(y=\\sqrt x\\) from 0 to 9?", answer: "\\(18\\)" },
      ],
      pyqExampleId: "cff770ab-ab00-475f-a3c6-0e8a7a38d7cf", // 2023 — y^2 = kx against y = x and x = 2
      traps: [
        {
          title: "The lower branch",
          body: "\\(y^2=kx\\) also has the branch \\(y=-\\sqrt{kx}\\). If the region is not limited to \\(y\\ge0\\), include the part below the x-axis, or use symmetry and double.",
        },
      ],
    },
  ],
};
