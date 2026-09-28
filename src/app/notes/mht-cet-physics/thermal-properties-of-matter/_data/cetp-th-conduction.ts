import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermal-properties-of-matter";

export const CONDUCTION_NOTE: SubtopicNote = {
  subtopicName: "Heat Conduction and Thermal Resistance",
  title: "Conduction Through Rods and Slabs",
  oneLineDefinition:
    "Heat flows along a rod at the rate Q/t = KAΔT/L, which is the temperature difference divided by the thermal resistance L/KA; slabs in series add their resistances and rods side by side add their conductances, exactly like electrical resistors.",
  whyItMatters:
    "8 PYQs, none HARD: K from the flow rate, a rod's thermal resistance, a composite slab of two materials, two rods joined end to end and then side by side, and what happens when every dimension of a rod doubles. One asks which everyday heating is convection. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-th-conduction",
      name: "Rate of Flow and Thermal Resistance",
      intuition:
        "Heat flow through a rod is like current through a resistor: the temperature difference drives it, and the rod resists with R = L/KA. Two slabs in series carry the same heat, so their resistances add; two rods side by side share the temperature difference, so their conductances add. Doubling every dimension of a rod doubles the length and quadruples the area, so the flow doubles. Conduction moves heat through a solid, convection by moving fluid (a room heater warms air that circulates), and radiation needs no medium at all.",
      definition:
        "- \\(\\dfrac{Q}{t} = \\dfrac{KA\\,\\Delta T}{L}\\), so \\(K = \\dfrac{QL}{tA\\,\\Delta T}\\).\n" +
        "- **Thermal resistance** \\(R = \\dfrac{L}{KA} = \\dfrac{\\Delta T}{Q/t}\\) (40 °C, 1600 cal/s ⇒ 0.025 °C s/cal).\n" +
        "- **Series** slabs: \\(R = R_1 + R_2\\) (K, x and 2K, 4x ⇒ \\(\\dfrac{3x}{KA}\\), a factor of 1/3).\n" +
        "- Two identical rods: end to end twice the resistance, side by side half — the time for the same heat falls 4 times (12 s ⇒ 3 s).\n" +
        "- All dimensions doubled: \\(A \\to 4A\\), \\(L \\to 2L\\), flow doubles.",
      formula: {
        label: "Conduction",
        latex: "\\frac{Q}{t} = \\frac{KA\\,\\Delta T}{L} = \\frac{\\Delta T}{R}, \\qquad R = \\frac{L}{KA}",
      },
      authoredExample: {
        prompt: "A copper rod (K = 400 W/m K) 0.5 m long with cross-section 2 × 10⁻⁴ m² has its ends at 100 °C and 0 °C. Rate of heat flow?",
        steps: ["Q/t = 400 × 2 × 10⁻⁴ × 100/0.5.", "Q/t = 16 W."],
        answer: "16 W",
      },
      selfCheckExample: {
        prompt: "400 cal/s flows through a rod with a 20 °C difference across it. Thermal resistance?",
        steps: ["R = ΔT/(Q/t)."],
        answer: "0.05 °C s/cal",
      },
      practiceSet: [
        { prompt: "Every dimension of a cylindrical rod is doubled, same end temperatures. The heat flow?", answer: "Doubles" },
        { prompt: "Which heats by convection: a copper utensil, a room heater, an iron rod, or the Sun on the Earth?", answer: "A room heater" },
      ],
      pyqExampleId: "89105486-da83-4cf3-b0ee-79bc583fc64c",
      traps: [
        {
          title: "Adding conductivities for slabs in series",
          body:
            "Slabs in series carry the same heat and add their RESISTANCES, x/KA + 4x/2KA = 3x/KA. Averaging K is wrong.",
        },
        {
          title: "Scaling the flow with the area alone",
          body:
            "Doubling all dimensions multiplies A by 4 but also doubles L, so the flow only doubles.",
        },
      ],
    },
  ],
  related: [
    { label: "Radiation — heat that needs no medium", href: `${BASE}/cetp-th-radiation` },
  ],
};
