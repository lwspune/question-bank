import type { SubtopicNote } from "@/app/notes/_types";

export const TANGENTS_AOD_NOTE: SubtopicNote = {
  subtopicName: "Tangents, Normals and Rates of Change",
  title: "Tangents, Normals and Rates of Change",
  oneLineDefinition:
    "The derivative as a slope and as a rate: tangents and normals to a curve, curves meeting at an angle, and quantities that change together over time.",
  whyItMatters:
    "Twenty PYQs, eleven of them multiple choice. Four are rates of change — a balloon, a cone filling with water. Sixteen use the slope of a curve: tangents and normals at a point, tangents through an outside point, and curves that cut at right angles. Two ideas cover the page.",
  concepts: [
    // C1 — related rates
    {
      kind: "formula" as const,
      slug: "jaod-rates",
      name: "Rates of change",
      intuition:
        "When two quantities are tied by a formula, their rates are tied by its derivative. Write the formula in one variable first (use similar triangles for a cone), differentiate with respect to time by the chain rule, and only then put in the numbers for the instant asked about.",
      definition:
        "- \\(\\frac{dy}{dt}=\\frac{dy}{dx}\\cdot\\frac{dx}{dt}\\).\n" +
        "- Sphere: \\(V=\\frac43\\pi r^3\\), \\(S=4\\pi r^2\\); \\(\\frac{dV}{dt}=S\\frac{dr}{dt}\\).\n" +
        "- Cone: \\(V=\\frac13\\pi r^2h\\), curved surface \\(\\pi rl\\); a fixed cone fixes \\(\\frac rh\\).\n" +
        "- A quantity growing at a constant rate is linear in time.",
      formula: {
        label: "Chain rule for rates",
        latex: "\\frac{dV}{dt}=\\frac{dV}{dr}\\cdot\\frac{dr}{dt}",
      },
      authoredExample: {
        prompt: "The radius of a sphere grows at \\(0.1\\) cm/s. How fast is its volume growing when \\(r=5\\) cm?",
        steps: [
          "\\(\\frac{dV}{dt}=4\\pi r^2\\frac{dr}{dt}=4\\pi\\cdot25\\cdot0.1\\).",
        ],
        answer: "\\(10\\pi\\) cm³/s.",
      },
      selfCheckExample: {
        prompt: "The side of a square grows at 2 cm/s. How fast is its area growing when the side is 5 cm?",
        steps: [
          "\\(A=s^2\\), so \\(\\frac{dA}{dt}=2s\\frac{ds}{dt}=2\\cdot5\\cdot2\\).",
        ],
        answer: "\\(20\\) cm²/s.",
      },
      practiceSet: [
        { prompt: "Circle, \\(r=3\\), \\(\\frac{dr}{dt}=2\\): \\(\\frac{dA}{dt}\\)?", answer: "\\(12\\pi\\)" },
        { prompt: "Cube of side 2, side growing at 1 per second: \\(\\frac{dV}{dt}\\)?", answer: "\\(12\\)" },
        { prompt: "Sphere, \\(r=2\\), \\(\\frac{dr}{dt}=1\\): \\(\\frac{dS}{dt}\\)?", answer: "\\(16\\pi\\)" },
        { prompt: "Surface area of a sphere grows at a constant rate. What is linear in time?", answer: "\\(r^2\\)" },
      ],
      pyqExampleId: "dec56495-87be-4850-b312-8e3ddfe7b34a", // 2022 — balloon whose surface area grows at a constant rate
      traps: [
        {
          title: "Differentiate before substituting",
          body: "Put the instant's values in only after differentiating. Substituting \\(h=10\\) first turns a variable into a constant and its rate into 0.",
        },
      ],
    },

    // C2 — tangents and normals
    {
      kind: "formula" as const,
      slug: "jaod-tangent",
      name: "Tangents and normals",
      intuition:
        "The slope of the tangent at \\(x_0\\) is \\(f'(x_0)\\), and the normal is at right angles to it, with slope \\(-\\frac1{f'(x_0)}\\). For a curve given by a parameter, \\(\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}\\); for an implicit curve, differentiate both sides. A tangent 'through an outside point' is found by writing the tangent at a general point and making it pass through that point.",
      definition:
        "- Tangent: \\(y-y_0=m(x-x_0)\\), \\(m=f'(x_0)\\); normal slope \\(-\\frac1m\\).\n" +
        "- Horizontal tangent: \\(\\frac{dy}{dx}=0\\); vertical: \\(\\frac{dx}{dy}=0\\).\n" +
        "- Parametric: \\(\\frac{dy}{dx}=\\frac{\\dot y}{\\dot x}\\).\n" +
        "- Angle between curves: \\(\\tan\\theta=\\left|\\frac{m_1-m_2}{1+m_1m_2}\\right|\\); at right angles, \\(m_1m_2=-1\\).",
      formula: {
        label: "Tangent at a point",
        latex: "y-y_0=f'(x_0)(x-x_0)",
      },
      authoredExample: {
        prompt: "Find the tangent and the normal to \\(y=x^2-3x\\) at \\(x=1\\).",
        steps: [
          "The point is \\((1,-2)\\) and the slope \\(2x-3=-1\\).",
        ],
        answer: "Tangent \\(y=-x-1\\); normal \\(y=x-3\\).",
      },
      selfCheckExample: {
        prompt: "At which points does \\(y=x^3-3x\\) have a horizontal tangent?",
        steps: [
          "\\(3x^2-3=0\\) at \\(x=\\pm1\\).",
        ],
        answer: "\\((1,-2)\\) and \\((-1,2)\\).",
      },
      practiceSet: [
        { prompt: "Slope of \\(x=t^2,\\ y=2t\\) at \\(t=1\\)?", answer: "\\(1\\)" },
        { prompt: "Normal slope where the tangent slope is 3?", answer: "\\(-\\frac13\\)" },
        { prompt: "Tangent to \\(y=e^x\\) at \\(x=0\\)?", answer: "\\(y=x+1\\)" },
        { prompt: "\\(\\tan\\) of the angle between \\(y=x^2\\) and \\(y=2-x^2\\) at \\((1,1)\\)?", answer: "\\(\\frac43\\)" },
      ],
      pyqExampleId: "66378d40-b493-45cf-abe7-d99a95daa7db", // 2023 — points where the normal is parallel to a given line
      traps: [
        {
          title: "A normal parallel to a line",
          body: "If the normal is parallel to a line of slope \\(m\\), the tangent has slope \\(-\\frac1m\\). Setting \\(f'(x)=m\\) finds points where the tangent, not the normal, is parallel to the line.",
        },
      ],
    },
  ],
};
