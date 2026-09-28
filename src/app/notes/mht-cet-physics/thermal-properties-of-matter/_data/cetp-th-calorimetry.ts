import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermal-properties-of-matter";

export const CALORIMETRY_NOTE: SubtopicNote = {
  subtopicName: "Calorimetry, Latent Heat, and Heat Capacity",
  title: "Calorimetry: Heat Lost Equals Heat Gained",
  oneLineDefinition:
    "When hot and cold bodies share heat in isolation, the heat one loses equals the heat the other gains, Q = mcΔT for a temperature change and Q = mL for a change of state; a body's heat capacity mc is the heat that raises it by one degree.",
  whyItMatters:
    "4 PYQs, none HARD: the definition of thermal capacity, a metal's heat capacity from the water it warms, the temperature rise of a bullet that stops in a wall, and ice mixed with warm water. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-th-calorimetry",
      name: "Mixing, Melting and Heat From Motion",
      intuition:
        "Write the heat each body exchanges and set losses equal to gains. For a temperature change Q = mcΔT; the product mc is the body's heat capacity (thermal capacity), the heat for a one-degree rise. For melting, Q = mL with L = 80 cal/g for ice. When ice meets warm water, first check whether the warm water can melt all the ice: if not, the mixture stays at 0 °C. Mechanical energy turned into heat enters the same balance, divided by J = 4.2 J/cal when the heat is in calories.",
      definition:
        "- \\(Q = mc\\Delta T\\); heat capacity \\(C = mc\\) (heat per degree); water \\(c = 1\\) cal/g °C \\(= 4200\\) J/kg K.\n" +
        "- Change of state: \\(Q = mL\\); ice \\(L = 80\\) cal/g.\n" +
        "- **Heat lost = heat gained.** Check first whether all the ice can melt.\n" +
        "- Bullet stopping with fraction f of its KE as heat: \\(ms\\Delta T = \\dfrac{f\\,mv^2}{2J}\\) (50% ⇒ \\(\\Delta T = \\dfrac{v^2}{4Js}\\)).",
      formula: {
        label: "Heat balance",
        latex: "m_1c_1(T_1 - T) = m_2c_2(T - T_2), \\qquad Q = mL",
      },
      authoredExample: {
        prompt: "A metal at 850 K is dropped into 1 kg of water at 300 K; they settle at 350 K. Heat capacity of the metal?",
        steps: ["Water gains 1 × 4200 × 50 = 2.1 × 10⁵ J.", "Metal falls 500 K: C = 2.1 × 10⁵/500 = 420 J/K."],
        answer: "420 J/K",
      },
      selfCheckExample: {
        prompt: "100 g of water at 60 °C is mixed with 200 g of water at 30 °C. Final temperature?",
        steps: ["100(60 − T) = 200(T − 30)."],
        answer: "40 °C",
      },
      practiceSet: [
        { prompt: "Heat that raises a body's temperature by 1 °C is called?", answer: "Thermal capacity" },
      ],
      pyqExampleId: "dd75a5aa-9529-4057-8e49-07ca697751a2",
      traps: [
        {
          title: "Averaging temperatures when ice is present",
          body:
            "Melting absorbs heat without raising the temperature. 540 g of water at 80 °C gives up exactly the 43 200 cal that 540 g of ice needs to melt, so the mixture ends at 0 °C, not at an average.",
        },
        {
          title: "Confusing heat capacity with specific heat",
          body:
            "Specific heat c is per gram; heat capacity mc is for the whole body. 'Heat that raises the BODY by 1 °C' is heat capacity.",
        },
      ],
    },
  ],
  related: [
    { label: "Conduction — how the heat moves", href: `${BASE}/cetp-th-conduction` },
    { label: "Radiation — the water equivalent from cooling times", href: `${BASE}/cetp-th-radiation` },
  ],
};
