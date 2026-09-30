import type { SubtopicNote } from "@/app/notes/_types";

export const HORIZONTAL_AOI_NOTE: SubtopicNote = {
  subtopicName: "Horizontal Strips and Sideways Parabolas",
  title: "Horizontal Strips and Sideways Parabolas",
  oneLineDefinition:
    "Regions whose boundaries are easier as x in terms of y, found by integrating the right curve minus the left curve along y.",
  whyItMatters:
    "Eighteen PYQs, thirteen of them multiple choice, and two from 2026. Seven bound a sideways parabola by a line; seven are two curves, at least one sideways, where horizontal strips avoid a split or the question switches from one strip to the other; four use a tangent to a sideways parabola together with an axis. Three ideas cover the page.",
  concepts: [
    // C1 — sideways parabola and a line
    {
      kind: "formula" as const,
      slug: "jaoi-sideways-line",
      name: "Right minus left, integrated in y",
      intuition:
        "A parabola that opens sideways, such as \\(y^2=4(x-1)\\), is x as a function of y. Rewrite the line as x in terms of y too. Then each horizontal strip runs from the left curve to the right one, and the area is one integral in y — where vertical strips would need two.",
      definition:
        "- Write each boundary as \\(x=g(y)\\).\n" +
        "- The limits are the y-values where the boundaries meet.\n" +
        "- If right minus left is \\(a(y-c)(d-y)\\), the area is \\(\\frac{a(d-c)^3}{6}\\).",
      formula: {
        label: "Horizontal strips",
        latex: "A=\\int_{c}^{d}\\big(x_{\\text{right}}-x_{\\text{left}}\\big)\\,dy",
      },
      authoredExample: {
        prompt: "Find the area between \\(y^2=x\\) and the line \\(x-y=2\\).",
        steps: [
          "As functions of y: \\(x=y^2\\) on the left and \\(x=y+2\\) on the right.",
          "They meet where \\(y^2=y+2\\), so \\(y=-1\\) and \\(y=2\\).",
          "Area \\(=\\int_{-1}^{2}(y+2-y^2)\\,dy=\\frac{3^3}{6}\\).",
        ],
        answer: "\\(\\frac92\\).",
      },
      selfCheckExample: {
        prompt: "Find the area between \\(y^2=4x\\) and the line \\(x-y=3\\).",
        steps: [
          "\\(x=\\frac{y^2}4\\) and \\(x=y+3\\) meet where \\(y^2-4y-12=0\\), so \\(y=-2\\) and \\(y=6\\).",
          "Right minus left is \\(\\frac14(y+2)(6-y)\\).",
          "Area \\(=\\frac14\\cdot\\frac{8^3}{6}\\).",
        ],
        answer: "\\(\\frac{64}3\\).",
      },
      practiceSet: [
        { prompt: "Area between \\(x=y^2\\) and \\(x=4\\)?", answer: "\\(\\frac{32}3\\)" },
        { prompt: "Area between \\(x=y^2\\) and \\(x=y\\)?", answer: "\\(\\frac16\\)" },
        { prompt: "Write \\(y^2=4(x-1)\\) as x in terms of y.", answer: "\\(x=1+\\frac{y^2}4\\)" },
        { prompt: "Area between \\(x=1-y^2\\) and the y-axis?", answer: "\\(\\frac43\\)" },
      ],
      pyqExampleId: "e57c1e8b-9903-496f-9454-5b3b00d181f3", // 2026 — a sideways parabola, a line and the axes
      traps: [
        {
          title: "Limits in y, not x",
          body: "Solve for the y-values where the curves meet. Substituting to get x-values first, and then using those as limits of a y-integral, gives a wrong area.",
        },
      ],
    },

    // C2 — two sideways curves, or a choice of strips
    {
      kind: "formula" as const,
      slug: "jaoi-sideways-pair",
      name: "Two sideways curves, or a choice of strips",
      intuition:
        "When both curves open sideways, horizontal strips see the same left and right curve all the way, so one integral does it. More generally, if one direction of strip would switch boundaries partway, try the other direction. The area is the same either way; only the limits and the integrand change.",
      definition:
        "- Two sideways curves \\(x=p(y)\\), \\(x=q(y)\\): meet where \\(p(y)=q(y)\\); area \\(=\\int(\\text{right}-\\text{left})\\,dy\\).\n" +
        "- If right minus left is \\(a(k^2-y^2)\\), the area is \\(\\frac{4ak^3}3\\).\n" +
        "- Choose the strip direction in which the two boundaries never change.",
      formula: {
        label: "Symmetric pair",
        latex: "\\int_{-k}^{k}a\\,(k^2-y^2)\\,dy=\\frac{4ak^3}{3}",
      },
      authoredExample: {
        prompt: "Find the area between \\(y^2=x\\) and \\(y^2=4-3x\\).",
        steps: [
          "As x in terms of y: \\(x=y^2\\) and \\(x=\\frac{4-y^2}3\\).",
          "They meet where \\(3y^2=4-y^2\\), so \\(y=\\pm1\\).",
          "Right minus left is \\(\\frac{4-4y^2}3=\\frac43(1-y^2)\\), so the area is \\(\\frac{4\\cdot\\frac43\\cdot1}3\\).",
        ],
        answer: "\\(\\frac{16}9\\).",
      },
      selfCheckExample: {
        prompt: "Find the area between \\(x=2y^2\\) and \\(x+y^2=3\\).",
        steps: [
          "\\(2y^2=3-y^2\\) gives \\(y=\\pm1\\).",
          "Right minus left is \\(3-3y^2=3(1-y^2)\\).",
          "Area \\(=\\frac{4\\cdot3\\cdot1}3\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "Area between \\(x=y^2\\) and \\(x=2-y^2\\)?", answer: "\\(\\frac83\\)" },
        { prompt: "Where do \\(x=-y^2\\) and \\(x=1-2y^2\\) meet?", answer: "\\(y=\\pm1\\)" },
        { prompt: "\\(\\int_{-2}^{2}(4-y^2)\\,dy\\)?", answer: "\\(\\frac{32}3\\)" },
        { prompt: "Which strips suit \\(y^2=4x\\) and \\(y^2=8-4x\\)?", answer: "Horizontal: both are x in terms of y" },
      ],
      pyqExampleId: "13ad7477-7107-437e-80d3-cf8ecb560c9f", // 2026 — two sideways parabolas
      traps: [
        {
          title: "Changing the strips changes both limits and integrand",
          body: "When a question rewrites an x-integral as a y-integral, redraw the region and read each piece's left and right boundary afresh. Swapping only the limits, or only the integrand, gives a different region.",
        },
      ],
    },

    // C3 — tangent to a sideways parabola
    {
      kind: "formula" as const,
      slug: "jaoi-sideways-tangent",
      name: "A tangent to a sideways parabola",
      intuition:
        "For \\(x=f(y)\\), differentiate in y: the tangent at \\(y_0\\) is \\(x=f(y_0)+f'(y_0)(y-y_0)\\), already in the form horizontal strips need. Because the tangent touches the parabola, the parabola minus the tangent is a perfect square, which integrates at once.",
      definition:
        "- Tangent to \\(x=f(y)\\) at \\(y_0\\): \\(x=f(y_0)+f'(y_0)(y-y_0)\\).\n" +
        "- For \\(x=ay^2+by+c\\), parabola minus tangent is \\(a(y-y_0)^2\\).\n" +
        "- From the x-axis up to the point of contact, the area is \\(\\frac{a\\,y_0^3}{3}\\).",
      formula: {
        label: "Parabola minus tangent",
        latex: "\\int_{0}^{y_0}a\\,(y-y_0)^2\\,dy=\\frac{a\\,y_0^{3}}{3}",
      },
      authoredExample: {
        prompt: "Find the area bounded by \\(y^2=4x\\), its tangent at \\((4,4)\\) and the x-axis.",
        steps: [
          "As \\(x=\\frac{y^2}4\\), \\(\\frac{dx}{dy}=\\frac y2=2\\) at \\(y=4\\), so the tangent is \\(x=2y-4\\).",
          "Parabola minus tangent \\(=\\frac{y^2}4-2y+4=\\frac{(y-4)^2}4\\).",
          "Area \\(=\\int_0^4\\frac{(y-4)^2}4\\,dy=\\frac{64}{12}\\).",
        ],
        answer: "\\(\\frac{16}3\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(x=y^2+1\\), its tangent at \\((2,1)\\) and the x-axis.",
        steps: [
          "\\(\\frac{dx}{dy}=2y=2\\), so the tangent is \\(x=2+2(y-1)=2y\\).",
          "Parabola minus tangent \\(=(y-1)^2\\).",
          "Area \\(=\\int_0^1(y-1)^2\\,dy\\).",
        ],
        answer: "\\(\\frac13\\).",
      },
      practiceSet: [
        { prompt: "Tangent to \\(x=y^2\\) at \\((1,1)\\)?", answer: "\\(x=2y-1\\)" },
        { prompt: "Tangent to \\(x=y^2\\) at \\((4,-2)\\)?", answer: "\\(x=-4y-4\\)" },
        { prompt: "\\(\\int_0^3(y-3)^2\\,dy\\)?", answer: "\\(9\\)" },
        { prompt: "For \\(x=\\frac{y^2}2\\), \\(\\frac{dx}{dy}\\) at \\(y=2\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "2c00f8cd-a5b2-4fe9-b31d-089ac216f053", // 2025 — a tangent from an external point to y^2 = x - 2
      traps: [
        {
          title: "dx/dy, not dy/dx",
          body: "For a sideways parabola, \\(\\frac{dx}{dy}\\) gives the tangent directly as x in terms of y. If you use \\(\\frac{dy}{dx}\\), its slope is the reciprocal — mixing the two gives a line that does not touch the curve.",
        },
      ],
    },
  ],
};
