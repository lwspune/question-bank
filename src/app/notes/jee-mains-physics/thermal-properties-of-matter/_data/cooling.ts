import type { SubtopicNote } from "@/app/notes/_types";

export const COOLING_TH_NOTE: SubtopicNote = {
  subtopicName: "Radiation and Newton's Law of Cooling",
  title: "Radiation and Newton's Law of Cooling",
  oneLineDefinition:
    "A body radiates power P = eσAT⁴ with T in kelvin, its spectrum peaks where λₘT = b, and a body only a little warmer than its surroundings cools at a rate proportional to its excess temperature.",
  whyItMatters:
    "Eleven PYQs, three of them asking for a number, none from 2026. Three use Stefan's law to compare the power radiated by two bodies or to find an emissivity; eight are Newton's law of cooling, finding a time or a temperature for a second stage of cooling from the first. The average form of Newton's law turns each one into two short equations.",
  concepts: [
    // C1 — Stefan, Wien and Newton's law of cooling
    {
      kind: "formula" as const,
      slug: "jpthermal-newton-cooling",
      name: "Stefan's law, Wien's law and Newton's law of cooling",
      intuition:
        "Every body radiates, and the power rises steeply with temperature: as the fourth power of the kelvin temperature. That is Stefan's law. A hotter body also radiates its peak at a shorter wavelength, which is Wien's law. A body in a room also absorbs, so its net loss depends on how much hotter it is than the room. When that excess is small, the net loss is simply proportional to the excess: that is Newton's law of cooling. A body twice as far above room temperature cools twice as fast.",
      definition:
        "- **Stefan's law**: \\(P = e\\sigma AT^{4}\\), T in kelvin, \\(\\sigma = 5.67 \\times 10^{-8}\\ \\text{W m}^{-2}\\text{K}^{-4}\\). For a sphere \\(A = 4\\pi r^{2}\\), so \\(P \\propto er^{2}T^{4}\\). For a wire \\(A = \\pi dL\\).\n" +
        "- Net loss to surroundings at \\(T_0\\): \\(P_{net} = e\\sigma A(T^{4} - T_0^{4})\\).\n" +
        "- A good absorber is a good emitter; a perfect black body has \\(e = 1\\).\n" +
        "- **Wien's law**: \\(\\lambda_mT = b\\), with \\(b \\approx 2.9 \\times 10^{-3}\\ \\text{m K}\\). Hotter means a shorter peak wavelength.\n" +
        "- **Newton's law of cooling** (small excess): \\(\\dfrac{dT}{dt} = -k(T - T_s)\\). Exactly, \\(T - T_s = (T_0 - T_s)e^{-kt}\\).\n" +
        "- Average form for exam questions: \\(\\dfrac{T_1 - T_2}{t} = k\\left(\\dfrac{T_1 + T_2}{2} - T_s\\right)\\). Find k from the first stage, then use it for the second.\n" +
        "- Over equal intervals the excess over the surroundings falls by the same factor each time, in the exact form and in the average form.",
      formula: {
        label: "Radiation and cooling",
        latex:
          "P = e\\sigma AT^{4} \\qquad \\lambda_mT = b \\qquad \\frac{T_1 - T_2}{t} = k\\left(\\frac{T_1 + T_2}{2} - T_s\\right) \\qquad T - T_s = (T_0 - T_s)e^{-kt}",
      },
      authoredExample: {
        prompt:
          "A body cools from \\(70^{\\circ}C\\) to \\(50^{\\circ}C\\) in 6 minutes in a room at \\(30^{\\circ}C\\). How long does it take to cool from \\(50^{\\circ}C\\) to \\(40^{\\circ}C\\)?",
        steps: [
          "First stage, average form: \\(\\dfrac{70 - 50}{6} = k\\left(\\dfrac{70 + 50}{2} - 30\\right) = 30k\\), so \\(k = \\dfrac{1}{9}\\ \\text{min}^{-1}\\).",
          "Second stage: \\(\\dfrac{50 - 40}{t} = \\dfrac{1}{9}\\left(\\dfrac{50 + 40}{2} - 30\\right) = \\dfrac{15}{9}\\).",
          "\\(t = \\dfrac{10 \\times 9}{15} = 6\\ \\text{min}\\). A drop of only 10 degrees takes as long as the first 20, because the body is now closer to room temperature.",
        ],
        answer: "6 minutes",
      },
      selfCheckExample: {
        prompt:
          "A black sphere of radius 2 cm at 1000 K radiates 80 W. Another black sphere of radius 4 cm is at 500 K. What power does it radiate? (Ignore the surroundings.)",
        steps: [
          "\\(P \\propto r^{2}T^{4}\\), with the same e for both.",
          "\\(\\dfrac{P_2}{P_1} = \\left(\\dfrac{4}{2}\\right)^{2}\\left(\\dfrac{500}{1000}\\right)^{4} = 4 \\times \\dfrac{1}{16} = \\dfrac{1}{4}\\).",
          "\\(P_2 = 20\\ \\text{W}\\).",
        ],
        answer: "20 W",
      },
      practiceSet: [
        { prompt: "The kelvin temperature of a black body is doubled. By what factor does the power it radiates change?", answer: "16" },
        { prompt: "The Sun's spectrum peaks near 500 nm. Estimate its surface temperature. (\\(b = 2.9 \\times 10^{-3}\\ \\text{m K}\\))", answer: "About 5800 K" },
        { prompt: "A body's excess temperature over its surroundings falls from 40 K to 30 K in 5 minutes. What is the excess after another 5 minutes?", answer: "22.5 K", method: "Equal intervals, same factor: \\(30 \\times \\tfrac{3}{4}\\)." },
        { prompt: "For a small excess temperature, the excess is made three times larger. How does the rate of cooling change?", answer: "It becomes three times larger" },
      ],
      pyqExampleId: "c0366b0b-77b4-4f5a-8b6d-aca2753164ad", // 29 Jan 2025: coffee cooling, two stages at the same room temperature
      traps: [
        {
          title: "Celsius in Stefan's law",
          body: "P = eσAT⁴ needs the kelvin temperature. A body at 127°C against one at 27°C radiates (400/300)⁴ ≈ 3.2 times as much, not (127/27)⁴ ≈ 490 times.",
        },
        {
          title: "Averaging the wrong quantity",
          body: "In the average form, average the two TEMPERATURES and then subtract the surroundings. The rate on the left is the drop divided by the time, not the excess divided by the time.",
        },
        {
          title: "Minutes and seconds",
          body: "k comes out per minute if the times are in minutes. A time of 10/3 minutes is 200 s; check the unit the options use before choosing.",
        },
        {
          title: "Doubling the excess does not quadruple the rate",
          body: "Newton's law is linear in the excess temperature: double the excess, double the rate. The fourth power belongs to Stefan's law and the absolute temperature.",
        },
      ],
    },
  ],
};
