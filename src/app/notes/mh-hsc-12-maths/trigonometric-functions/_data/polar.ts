import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_TF_POLAR_NOTE: SubtopicNote = {
  subtopicName: "Polar Coordinates",
  title: "Polar Co-ordinates and Cartesian Co-ordinates",
  oneLineDefinition:
    "Polar co-ordinates (r, θ) fix a point by its distance from the pole and its angle from the polar axis, and x = r cos θ, y = r sin θ change them into Cartesian co-ordinates and back.",
  whyItMatters:
    "13 questions. Two were set in board papers, both asking for the polar co-ordinates of a point given in Cartesian form: (1, −√3) in 2024 and (−√2, −√2) in 2025. The textbook converts both ways, including points on an axis.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmtf-polar-to-cartesian",
      name: "Polar co-ordinates and changing them to Cartesian form",
      intuition:
        "Stand at the pole facing along the polar axis. Turn through the angle \\(\\theta\\) and walk a distance \\(r\\): you reach the point \\((r, \\theta)\\). Drop a perpendicular to the X-axis and the right triangle gives \\(x = r\\cos\\theta\\) and \\(y = r\\sin\\theta\\).",
      definition:
        "- Fix a point \\(O\\), the **pole**, and a ray \\(OX\\), the **polar axis**.\n" +
        "- For a point \\(P\\) other than \\(O\\): \\(r = OP\\) is the **radius vector** and \\(\\theta = m\\angle XOP\\) is the **vectorial angle**. The pair \\((r, \\theta)\\) gives the polar co-ordinates of \\(P\\).\n" +
        "- \\(\\theta\\) is the smallest non-negative angle from \\(OX\\) to \\(OP\\), so \\(0 \\le \\theta < 2\\pi\\). The pole has no polar co-ordinates.\n" +
        "- Taking \\(OX\\) as the X-axis: \\(\\cos\\theta = \\dfrac{x}{r}\\) and \\(\\sin\\theta = \\dfrac{y}{r}\\), so \\(x = r\\cos\\theta\\) and \\(y = r\\sin\\theta\\).",
      formula: {
        label: "Polar to Cartesian",
        latex: "x = r\\cos\\theta, \\qquad y = r\\sin\\theta",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius vector, the distance of the point from the pole" },
          { symbol: "\\(\\theta\\)", meaning: "vectorial angle, measured from the polar axis" },
        ],
      },
      authoredExample: {
        prompt: "Find the Cartesian co-ordinates of the point whose polar co-ordinates are \\(\\left(6, \\dfrac{5\\pi}{6}\\right)\\).",
        steps: [
          "Given: \\(r = 6\\), \\(\\theta = \\dfrac{5\\pi}{6}\\).",
          "Formula: \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\).",
          "\\(\\cos\\dfrac{5\\pi}{6} = -\\cos\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}\\) and \\(\\sin\\dfrac{5\\pi}{6} = \\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}\\).",
          "\\(x = 6 \\times \\left(-\\dfrac{\\sqrt{3}}{2}\\right) = -3\\sqrt{3}\\) and \\(y = 6 \\times \\dfrac{1}{2} = 3\\).",
        ],
        answer: "The Cartesian co-ordinates are \\(\\left(-3\\sqrt{3}, 3\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Show that the point with polar co-ordinates \\(\\left(2, \\dfrac{\\pi}{3}\\right)\\) lies on the line \\(y = \\sqrt{3}x\\).",
        steps: [
          "\\(x = 2\\cos\\dfrac{\\pi}{3} = 1\\) and \\(y = 2\\sin\\dfrac{\\pi}{3} = \\sqrt{3}\\).",
          "\\(\\sqrt{3}x = \\sqrt{3} = y\\), so the point lies on the line.",
        ],
        answer: "The point is \\((1, \\sqrt{3})\\), and \\(y = \\sqrt{3}x\\) holds",
      },
      practiceSet: [
        { prompt: "In which quadrant is the point with polar co-ordinates \\(\\left(2, \\dfrac{4\\pi}{3}\\right)\\)?", answer: "The third quadrant, since \\(\\pi < \\dfrac{4\\pi}{3} < \\dfrac{3\\pi}{2}\\)" },
        { prompt: "How far from the pole is the point with polar co-ordinates \\(\\left(7, \\dfrac{\\pi}{9}\\right)\\)?", answer: "7 units, the radius vector" },
        { prompt: "Which point has no polar co-ordinates?", answer: "The pole itself" },
      ],
      pyqExampleId: "0cd17853-77a7-4570-9dc5-7bc1bccbe3dd",
      traps: [
        {
          title: "Swapping cos and sin",
          body: "\\(x\\) goes with \\(\\cos\\theta\\) and \\(y\\) with \\(\\sin\\theta\\). Swapping them reflects the point in the line \\(y = x\\).",
        },
        {
          title: "Dropping the sign of the ratio",
          body: "For \\(\\theta\\) in quadrant II, III or IV, one or both ratios are negative. Find the sign from the quadrant before multiplying by \\(r\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-cartesian-to-polar",
      name: "Changing Cartesian co-ordinates to polar form",
      intuition:
        "Going back, \\(r\\) is just the distance from the origin, found by Pythagoras. The angle is harder: \\(\\tan\\theta = \\dfrac{y}{x}\\) gives only the reference angle, and the signs of \\(x\\) and \\(y\\) tell you which quadrant the point is in.",
      definition:
        "- \\(r = \\sqrt{x^2 + y^2}\\), always positive.\n" +
        "- Find the reference angle \\(\\alpha\\) from \\(\\tan\\alpha = \\left|\\dfrac{y}{x}\\right|\\) (or from \\(\\cos\\theta = \\dfrac{x}{r}\\), \\(\\sin\\theta = \\dfrac{y}{r}\\)).\n" +
        "- Place \\(\\theta\\) by the signs of \\(x\\) and \\(y\\): I gives \\(\\alpha\\), II gives \\(\\pi - \\alpha\\), III gives \\(\\pi + \\alpha\\), IV gives \\(2\\pi - \\alpha\\).\n" +
        "- A point on an axis: positive X-axis \\(\\theta = 0\\), positive Y-axis \\(\\dfrac{\\pi}{2}\\), negative X-axis \\(\\pi\\), negative Y-axis \\(\\dfrac{3\\pi}{2}\\).\n" +
        "- Give \\(\\theta\\) in \\([0, 2\\pi)\\), as the textbook defines the vectorial angle.",
      formula: {
        label: "Cartesian to polar",
        latex: "r = \\sqrt{x^2 + y^2}, \\qquad \\cos\\theta = \\frac{x}{r}, \\quad \\sin\\theta = \\frac{y}{r}",
      },
      authoredExample: {
        prompt: "Find the polar co-ordinates of the point whose Cartesian co-ordinates are \\(\\left(-2, 2\\sqrt{3}\\right)\\).",
        steps: [
          "Given: \\(x = -2\\), \\(y = 2\\sqrt{3}\\).",
          "\\(r = \\sqrt{x^2 + y^2} = \\sqrt{4 + 12} = 4\\).",
          "\\(\\cos\\theta = \\dfrac{x}{r} = -\\dfrac{1}{2}\\) and \\(\\sin\\theta = \\dfrac{y}{r} = \\dfrac{\\sqrt{3}}{2}\\).",
          "\\(x < 0\\) and \\(y > 0\\), so \\(\\theta\\) is in the second quadrant with reference angle \\(\\dfrac{\\pi}{3}\\): \\(\\theta = \\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}\\).",
          "Check: \\(4\\cos\\dfrac{2\\pi}{3} = -2\\) and \\(4\\sin\\dfrac{2\\pi}{3} = 2\\sqrt{3}\\).",
        ],
        answer: "The polar co-ordinates are \\(\\left(4, \\dfrac{2\\pi}{3}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "A point lies in the second quadrant with \\(r = 2\\) and \\(\\tan\\theta = -1\\). Find its polar and its Cartesian co-ordinates.",
        steps: [
          "Reference angle \\(\\dfrac{\\pi}{4}\\); second quadrant gives \\(\\theta = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}\\).",
          "\\(x = 2\\cos\\dfrac{3\\pi}{4} = -\\sqrt{2}\\) and \\(y = 2\\sin\\dfrac{3\\pi}{4} = \\sqrt{2}\\).",
        ],
        answer: "Polar \\(\\left(2, \\dfrac{3\\pi}{4}\\right)\\); Cartesian \\(\\left(-\\sqrt{2}, \\sqrt{2}\\right)\\)",
      },
      practiceSet: [
        { prompt: "Find the radius vector of the point \\((-5, 12)\\).", answer: "\\(r = \\sqrt{25 + 144} = 13\\)" },
        { prompt: "What is the vectorial angle of a point on the negative Y-axis?", answer: "\\(\\dfrac{3\\pi}{2}\\)" },
        { prompt: "A point has \\(x > 0\\) and \\(y < 0\\), with reference angle \\(\\dfrac{\\pi}{4}\\). Why do we write \\(\\theta = \\dfrac{7\\pi}{4}\\) and not \\(-\\dfrac{\\pi}{4}\\)?", answer: "The vectorial angle is taken in \\([0, 2\\pi)\\), so the fourth-quadrant angle is \\(2\\pi - \\dfrac{\\pi}{4}\\)" },
      ],
      pyqExampleId: "f22495db-b2c8-4fd0-acc2-ad31ea2a9187",
      traps: [
        {
          title: "Taking θ straight from tan θ",
          body: "\\(\\tan\\theta = \\dfrac{y}{x}\\) is the same for a point and its opposite point through the origin. Use the signs of \\(x\\) and \\(y\\) to choose the quadrant.",
        },
        {
          title: "A negative vectorial angle",
          body: "The textbook defines \\(\\theta\\) as the smallest non-negative angle, so \\(0 \\le \\theta < 2\\pi\\). A fourth-quadrant point gets \\(2\\pi - \\alpha\\), not \\(-\\alpha\\).",
        },
        {
          title: "No check at the end",
          body: "Put \\(r\\) and \\(\\theta\\) back into \\(x = r\\cos\\theta\\), \\(y = r\\sin\\theta\\). It takes one line and catches a wrong quadrant.",
        },
      ],
    },
  ],
};
