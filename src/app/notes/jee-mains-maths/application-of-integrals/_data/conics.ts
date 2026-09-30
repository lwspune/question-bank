import type { SubtopicNote } from "@/app/notes/_types";

export const CONICS_AOI_NOTE: SubtopicNote = {
  subtopicName: "Circles, Ellipses and Other Conics",
  title: "Circles, Ellipses and Other Conics",
  oneLineDefinition:
    "Regions that involve a circle, an ellipse or a hyperbola, where sectors, segments and the ellipse area πab save most of the integration.",
  whyItMatters:
    "Twenty-two PYQs, fifteen of them multiple choice, and four from 2026. Ten cut a circle with a parabola; five cut a circle with a line, a V or a second circle; seven use an ellipse, a hyperbola or another closed curve. Three ideas cover the page.",
  concepts: [
    // C1 — circle and parabola
    {
      kind: "formula" as const,
      slug: "jaoi-circle-parabola",
      name: "A circle and a parabola",
      intuition:
        "Find where the circle and the parabola meet. The parabola part is a plain integral. The circle part is quicker from geometry: the area under an arc is a sector plus or minus a triangle, so \\(\\int\\sqrt{r^2-x^2}\\,dx\\) rarely has to be done by substitution.",
      definition:
        "- \\(\\int_0^{c}\\sqrt{r^2-x^2}\\,dx=\\frac c2\\sqrt{r^2-c^2}+\\frac{r^2}2\\sin^{-1}\\frac cr\\).\n" +
        "- Sector of angle \\(\\theta\\) (radians): \\(\\frac12r^2\\theta\\).\n" +
        "- Both curves are usually symmetric about the x-axis or the y-axis: find one half and double.",
      formula: {
        label: "Under a circular arc",
        latex: "\\int\\sqrt{r^2-x^2}\\,dx=\\frac{x}{2}\\sqrt{r^2-x^2}+\\frac{r^2}{2}\\sin^{-1}\\frac{x}{r}+C",
      },
      authoredExample: {
        prompt: "Find the first-quadrant area inside \\(x^2+y^2=2\\) and above \\(y=x^2\\).",
        steps: [
          "\\(x^2+x^4=2\\) gives \\(x^2=1\\), so they meet at \\((1,1)\\).",
          "Under the circle from 0 to 1: the triangle to \\((1,1)\\) gives \\(\\frac12\\), and the sector from 45° to 90° gives \\(\\frac12\\cdot2\\cdot\\frac\\pi4=\\frac\\pi4\\).",
          "Subtract \\(\\int_0^1x^2\\,dx=\\frac13\\).",
        ],
        answer: "\\(\\frac\\pi4+\\frac16\\).",
      },
      selfCheckExample: {
        prompt: "Find the first-quadrant area inside \\(x^2+y^2=18\\) and above \\(y=\\frac{x^2}3\\).",
        steps: [
          "\\(x^2+\\frac{x^4}9=18\\) gives \\(x^2=9\\), so they meet at \\((3,3)\\).",
          "Under the circle from 0 to 3: triangle \\(\\frac92\\) plus sector \\(\\frac12\\cdot18\\cdot\\frac\\pi4=\\frac{9\\pi}4\\).",
          "Subtract \\(\\int_0^3\\frac{x^2}3\\,dx=3\\).",
        ],
        answer: "\\(\\frac{9\\pi}4+\\frac32\\).",
      },
      practiceSet: [
        { prompt: "Sector of radius 2 and angle \\(\\frac\\pi3\\)?", answer: "\\(\\frac{2\\pi}3\\)" },
        { prompt: "\\(\\int_0^3\\sqrt{9-x^2}\\,dx\\)?", answer: "\\(\\frac{9\\pi}4\\)" },
        { prompt: "Where does \\(y^2=4x\\) meet \\(x^2+y^2=12\\)?", answer: "\\((2,\\pm2\\sqrt2)\\)" },
        { prompt: "\\(\\int_0^1\\sqrt{1-x^2}\\,dx\\)?", answer: "\\(\\frac\\pi4\\)" },
      ],
      pyqExampleId: "cbdf0ac9-e060-46e9-aeb7-7bd9e53a821c", // 2024 — a parabola divides a circle
      traps: [
        {
          title: "Inside and outside a parabola",
          body: "Inside \\(y^2=kx\\) means \\(y^2\\le kx\\), the side that holds the focus. Outside is the rest of the circle. Sketch both before deciding which piece to subtract from which.",
        },
      ],
    },

    // C2 — circle cut by a line or a second circle
    {
      kind: "formula" as const,
      slug: "jaoi-circle-segment",
      name: "Segments: a circle cut by a line or a circle",
      intuition:
        "A chord cuts a circle into two segments. The smaller one is a sector minus the triangle from the centre, so it needs only the angle the chord makes at the centre. The lens where two circles overlap is two segments, one from each circle, on either side of the common chord.",
      definition:
        "- Chord at distance d from the centre: \\(\\cos\\frac\\theta2=\\frac dr\\), where \\(\\theta\\) is the angle at the centre.\n" +
        "- Minor segment \\(=\\frac12r^2(\\theta-\\sin\\theta)\\); the major segment is \\(\\pi r^2\\) minus it.\n" +
        "- Lens between two circles = the two segments cut off by the common chord.",
      formula: {
        label: "Minor segment",
        latex: "\\text{segment}=\\frac12r^2(\\theta-\\sin\\theta)",
      },
      authoredExample: {
        prompt: "Find the area of the smaller part of \\(x^2+y^2=4\\) cut off by \\(x+y=2\\).",
        steps: [
          "The chord runs from \\((2,0)\\) to \\((0,2)\\), so it makes a right angle at the centre.",
          "Segment \\(=\\frac12\\cdot4\\left(\\frac\\pi2-1\\right)\\).",
        ],
        answer: "\\(\\pi-2\\).",
      },
      selfCheckExample: {
        prompt: "Find the area of the smaller part of \\(x^2+y^2=16\\) cut off by \\(x=2\\).",
        steps: [
          "\\(\\cos\\frac\\theta2=\\frac24\\), so \\(\\theta=\\frac{2\\pi}3\\).",
          "Segment \\(=\\frac12\\cdot16\\left(\\frac{2\\pi}3-\\frac{\\sqrt3}2\\right)\\).",
        ],
        answer: "\\(\\frac{16\\pi}3-4\\sqrt3\\).",
      },
      practiceSet: [
        { prompt: "Segment of a unit circle whose chord makes \\(\\frac\\pi2\\) at the centre?", answer: "\\(\\frac\\pi4-\\frac12\\)" },
        { prompt: "Angle at the centre for the chord \\(x=1\\) of \\(x^2+y^2=4\\)?", answer: "\\(\\frac{2\\pi}3\\)" },
        { prompt: "Area of \\(x^2+y^2\\le9\\) above the x-axis?", answer: "\\(\\frac{9\\pi}2\\)" },
        { prompt: "Larger part of \\(x^2+y^2=4\\) cut off by \\(x+y=2\\)?", answer: "\\(3\\pi+2\\)" },
      ],
      pyqExampleId: "0b6d2511-16dd-402c-adf9-46dbf34782c1", // 2026 — the lens between two equal circles
      traps: [
        {
          title: "Minor or major",
          body: "The formula gives the smaller segment. When the question asks for the larger portion, subtract it from \\(\\pi r^2\\) — and a V-shaped cut needs the two pieces on each side added.",
        },
      ],
    },

    // C3 — ellipse, hyperbola and other closed curves
    {
      kind: "formula" as const,
      slug: "jaoi-ellipse-hyperbola",
      name: "Ellipses, hyperbolas and other closed curves",
      intuition:
        "An ellipse is a circle of radius a stretched by \\(\\frac ba\\) in the y-direction, so its area is \\(\\pi ab\\) and every region inside it scales the same way. For a hyperbola, the arc is \\(\\sqrt{x^2-a^2}\\), whose integral carries a logarithm. For any other closed curve, use its symmetry and find one quarter.",
      definition:
        "- Ellipse \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}\\le1\\): area \\(\\pi ab\\); a quarter is \\(\\frac{\\pi ab}4\\).\n" +
        "- \\(\\int\\sqrt{x^2-a^2}\\,dx=\\frac x2\\sqrt{x^2-a^2}-\\frac{a^2}2\\ln\\left|x+\\sqrt{x^2-a^2}\\right|+C\\).\n" +
        "- Put a conic in standard form before reading off a and b.",
      formula: {
        label: "Area of an ellipse",
        latex: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}\\le1:\\quad A=\\pi ab",
      },
      authoredExample: {
        prompt: "Find the first-quadrant area inside \\(\\frac{x^2}9+\\frac{y^2}4=1\\) and above the chord joining \\((3,0)\\) and \\((0,2)\\).",
        steps: [
          "Quarter ellipse \\(=\\frac{\\pi\\cdot3\\cdot2}4=\\frac{3\\pi}2\\).",
          "The triangle below the chord has area \\(\\frac12\\cdot3\\cdot2=3\\).",
        ],
        answer: "\\(\\frac{3\\pi}2-3\\).",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(x^2-y^2=1\\) and the line \\(x=2\\).",
        steps: [
          "Area \\(=2\\int_1^2\\sqrt{x^2-1}\\,dx\\).",
          "\\(\\left[\\frac x2\\sqrt{x^2-1}-\\frac12\\ln\\left(x+\\sqrt{x^2-1}\\right)\\right]_1^2=\\sqrt3-\\frac12\\ln(2+\\sqrt3)\\).",
        ],
        answer: "\\(2\\sqrt3-\\ln(2+\\sqrt3)\\).",
      },
      practiceSet: [
        { prompt: "Area of \\(\\frac{x^2}{16}+\\frac{y^2}9\\le1\\)?", answer: "\\(12\\pi\\)" },
        { prompt: "Area of \\(4x^2+y^2\\le4\\)?", answer: "\\(2\\pi\\)" },
        { prompt: "First-quadrant area of \\(\\frac{x^2}4+y^2\\le1\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "Area of \\(x^2+9y^2\\le9\\)?", answer: "\\(3\\pi\\)" },
      ],
      pyqExampleId: "d60ff93a-057a-4072-b91d-7cae538bf49c", // 2026 — an ellipse minus a square
      traps: [
        {
          title: "Standard form first",
          body: "\\(4x^2+9y^2=36\\) is \\(\\frac{x^2}9+\\frac{y^2}4=1\\), so \\(a=3\\), \\(b=2\\) and the area is \\(6\\pi\\). Reading a and b off the unscaled equation gives a wrong area.",
        },
      ],
    },
  ],
};
