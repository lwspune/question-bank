import type { SubtopicNote } from "@/app/notes/_types";

export const RATES_DE_NOTE: SubtopicNote = {
  subtopicName: "Curves and Growth from Rates",
  title: "Curves and Growth from Rates",
  oneLineDefinition:
    "Setting up the equation from words: a curve described by its tangent, normal or the area under it, and a quantity whose rate of change is proportional to itself or to its distance from a fixed value.",
  whyItMatters:
    "Thirteen PYQs, nine of them multiple choice. Once the equation is written it is separable or linear; the marks are in translating the condition. Nine describe a curve through its tangent, normal or area, and four are growth, cooling or population models. Two ideas cover the page.",
  concepts: [
    // C1 — tangent, normal, area conditions
    {
      kind: "formula" as const,
      slug: "jde-tangent",
      name: "Curves from tangent, normal and area conditions",
      intuition:
        "Write the tangent at \\((x,y)\\) as \\(Y-y=y'(X-x)\\) and read off what the condition needs: its \\(x\\)-intercept \\(x-\\frac{y}{y'}\\), its \\(y\\)-intercept \\(y-xy'\\), or the normal \\(Y-y=-\\frac{1}{y'}(X-x)\\). An area condition \\(\\int_a^xy\\,dt=F(x,y)\\) becomes an equation after differentiating in \\(x\\). The result is separable, homogeneous or linear.",
      definition:
        "- Tangent intercepts: \\(x\\)-axis at \\(x-\\frac{y}{y'}\\), \\(y\\)-axis at \\(y-xy'\\).\n" +
        "- Slope of the normal: \\(-\\frac{1}{y'}\\).\n" +
        "- Normals through a fixed point \\((a,b)\\): \\((x-a)+(y-b)y'=0\\), a circle centred there.\n" +
        "- Area \\(\\int_a^xy\\,dt=F(x,y)\\Rightarrow y=\\frac{d}{dx}F(x,y)\\).",
      formula: {
        label: "Tangent at (x, y)",
        latex: "Y-y=\\frac{dy}{dx}(X-x):\\quad X\\text{-int}=x-\\frac{y}{y'},\\ \\ Y\\text{-int}=y-xy'",
      },
      authoredExample: {
        prompt: "The tangent at every point of a curve meets the \\(y\\)-axis at height \\(2y\\). The curve passes through \\((1,1)\\). Find it.",
        steps: [
          "\\(y-xy'=2y\\Rightarrow xy'=-y\\Rightarrow\\frac{dy}{y}=-\\frac{dx}{x}\\).",
          "\\(xy=C\\), and \\((1,1)\\) gives \\(C=1\\).",
        ],
        answer: "\\(xy=1\\).",
      },
      selfCheckExample: {
        prompt: "Every normal to a curve passes through \\((1,0)\\), and the curve passes through \\((1,2)\\). Find it.",
        steps: [
          "\\((x-1)+yy'=0\\Rightarrow(x-1)^2+y^2=C\\), \\(C=4\\).",
        ],
        answer: "\\((x-1)^2+y^2=4\\).",
      },
      practiceSet: [
        { prompt: "Slope of the tangent proportional to \\(\\frac yx\\): the curves?", answer: "\\(y=Ax^k\\)" },
        { prompt: "\\(y\\)-intercept of the tangent?", answer: "\\(y-xy'\\)" },
        { prompt: "Normals all through the origin: the curves?", answer: "Circles centred at the origin" },
        { prompt: "\\(\\int_0^xy\\,dt=x^3\\): \\(y\\)?", answer: "\\(3x^2\\)" },
      ],
      pyqExampleId: "414993ba-ba6f-4d85-9a97-cce79c80a141", // 2022 — the y-axis bisects PQ, curve through (3, 3)
      traps: [
        {
          title: "Midpoint and intercept are not the same",
          body: "'The \\(y\\)-axis bisects \\(PQ\\)' means the midpoint has \\(x=0\\), i.e. \\(x+\\left(x-\\frac{y}{y'}\\right)=0\\). Setting the intercept itself to zero is a different condition.",
        },
      ],
    },

    // C2 — growth and decay
    {
      kind: "formula" as const,
      slug: "jde-growth",
      name: "Growth, decay and cooling",
      intuition:
        "'Rate proportional to the amount' is \\(\\frac{dN}{dt}=kN\\), so \\(N=N_0e^{kt}\\). 'Rate proportional to the difference from a fixed value \\(A\\)' — Newton's cooling, or a population with a constant loss — is \\(\\frac{dT}{dt}=-k(T-A)\\), so \\(T-A=(T_0-A)e^{-kt}\\). Equal time steps multiply the difference by the same factor, which is usually quicker than finding \\(k\\).",
      definition:
        "- \\(N'=kN\\Rightarrow N=N_0e^{kt}\\); doubling time \\(\\frac{\\ln2}{k}\\).\n" +
        "- \\(T'=-k(T-A)\\Rightarrow T-A=(T_0-A)e^{-kt}\\).\n" +
        "- \\(P'=aP-b\\Rightarrow P-\\frac ba=\\left(P_0-\\frac ba\\right)e^{at}\\).\n" +
        "- Equal intervals: the ratio of successive differences is constant.",
      formula: {
        label: "Newton's law of cooling",
        latex: "\\frac{dT}{dt}=-k(T-A)\\ \\Rightarrow\\ T-A=(T_0-A)\\,e^{-kt}",
      },
      authoredExample: {
        prompt: "A body at \\(100^\\circ\\) cools to \\(60^\\circ\\) in 10 minutes in a room at \\(20^\\circ\\). Find its temperature after 20 minutes.",
        steps: [
          "The difference goes \\(80\\to40\\) in 10 minutes: it halves every 10 minutes.",
          "After 20 minutes the difference is 20.",
        ],
        answer: "\\(40^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "A culture grows at a rate proportional to its size and triples in 2 hours. How long until it is nine times its starting size?",
        steps: [
          "Tripling twice gives nine times.",
        ],
        answer: "4 hours.",
      },
      practiceSet: [
        { prompt: "\\(N'=kN\\), \\(N_0=50\\): \\(N(t)\\)?", answer: "\\(50e^{kt}\\)" },
        { prompt: "\\(P'=0.5P-450\\): equilibrium \\(P\\)?", answer: "\\(900\\)" },
        { prompt: "Difference halves each hour: after 3 hours?", answer: "\\(\\frac18\\) of the start" },
        { prompt: "Doubling time for \\(k=\\ln2\\)?", answer: "1" },
      ],
      pyqExampleId: "38d1b025-8fcb-4ea5-a40e-34bcc7b9f4c6", // 2024 — T(0) = 160, T(15) = 120, room 80, find T(45)
      traps: [
        {
          title: "The difference decays, not the temperature",
          body: "In cooling, \\(T-A\\) is multiplied by \\(e^{-kt}\\), not \\(T\\) itself. Halving the temperature instead of its excess over the room gives a wrong answer.",
        },
      ],
    },
  ],
};
