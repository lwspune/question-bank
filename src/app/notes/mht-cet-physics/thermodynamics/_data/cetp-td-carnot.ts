import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermodynamics";

export const CARNOT_NOTE: SubtopicNote = {
  subtopicName: "Carnot Engine, Efficiency, and Refrigerator",
  title: "The Carnot Engine and the Refrigerator",
  oneLineDefinition:
    "A Carnot engine runs between a hot source at T₁ and a cold sink at T₂ through two isothermal and two adiabatic steps, and its efficiency 1 − T₂/T₁ is the most any engine between those temperatures can reach; run backwards it is a refrigerator with coefficient of performance T₂/(T₁ − T₂).",
  whyItMatters:
    "11 PYQs, 3 of them HARD. The favourite gives the efficiency before and after the sink is lowered by some kelvins and asks for both temperatures. " +
    "Others ask for the work from a given heat, the source temperature for a higher efficiency, a refrigerator's room temperature, the link between efficiency and COP, and the order of the cycle's steps. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-td-carnot-efficiency",
      name: "Efficiency and Coefficient of Performance",
      intuition:
        "The cycle is isothermal expansion at T₁, adiabatic expansion, isothermal compression at T₂, adiabatic compression. Its efficiency η = W/Q₁ = 1 − T₂/T₁, temperatures in kelvin. Lowering the sink by a known amount changes η, and the two equations fix both temperatures. For a fixed sink, a higher efficiency needs a hotter source: T₁ = T₂/(1 − η). A refrigerator moves heat from the cold side; its coefficient of performance β = T₂/(T₁ − T₂) = (1 − η)/η, so η = 1/(β + 1). With a diatomic working gas, the adiabatic volume ratio fixes T₂/T₁ = (V₁/V₂)^0.4.",
      definition:
        "- \\(\\eta = \\dfrac{W}{Q_1} = 1 - \\dfrac{T_2}{T_1}\\) (227 °C and 27 °C ⇒ 40%; 50 kJ in ⇒ 20 kJ out).\n" +
        "- New source for a new η, same sink: \\(T_1' = \\dfrac{T_2}{1 - \\eta'}\\) (50% at 600 K → 70% ⇒ 1000 K).\n" +
        "- Sink lowered by x: \\(1 - \\dfrac{T_2 - x}{T_1} = \\eta'\\) together with \\(1 - \\dfrac{T_2}{T_1} = \\eta\\).\n" +
        "- Refrigerator: \\(\\beta = \\dfrac{T_2}{T_1 - T_2} = \\dfrac{1 - \\eta}{\\eta}\\), \\(\\eta = \\dfrac{1}{\\beta + 1}\\).\n" +
        "- First step of the cycle: isothermal expansion.",
      formula: {
        label: "Carnot",
        latex: "\\eta = 1 - \\frac{T_2}{T_1}, \\qquad \\beta = \\frac{T_2}{T_1 - T_2}",
      },
      authoredExample: {
        prompt: "An engine's efficiency is 1/4. Lowering its sink by 50 K raises it to 1/2. Source and sink temperatures?",
        steps: ["T₂ = 3T₁/4, and (T₂ − 50)/T₁ = 1/2.", "3T₁/4 − T₁/2 = 50 ⇒ T₁ = 200 K, T₂ = 150 K."],
        answer: "200 K and 150 K",
      },
      selfCheckExample: {
        prompt: "A Carnot engine works between 500 K and 300 K. Efficiency?",
        steps: ["1 − 300/500."],
        answer: "40%",
      },
      practiceSet: [
        { prompt: "Carnot engine between 600 K and 300 K does 1.5 kJ per cycle. Heat taken in?", answer: "3.0 kJ" },
        { prompt: "Refrigerator freezer at −13 °C, COP 5. Temperature of the room?", answer: "39 °C" },
      ],
      pyqExampleId: "3172b3d2-4b3b-4838-b7ac-587341b0e437",
      traps: [
        {
          title: "Using degrees Celsius in the efficiency",
          body:
            "227 °C and 27 °C give 1 − 300/500 = 40%, not 1 − 27/227. Convert to kelvin first.",
        },
        {
          title: "Changing the source when the sink moves",
          body:
            "'Sink lowered by 57 K' leaves T₁ alone. Write the two efficiencies with the same T₁ and solve.",
        },
      ],
    },
  ],
  related: [
    { label: "Processes — the isothermals and adiabatics in the cycle", href: `${BASE}/cetp-td-processes` },
  ],
};
