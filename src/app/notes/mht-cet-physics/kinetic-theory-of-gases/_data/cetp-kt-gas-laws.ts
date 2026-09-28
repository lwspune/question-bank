import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/kinetic-theory-of-gases";

export const GAS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Gas Laws and Ideal Gas Equation",
  title: "The Gas Laws and the Ideal Gas Equation",
  oneLineDefinition:
    "For a fixed amount of an ideal gas PV/T stays constant, which contains Boyle's law (PV constant at fixed T), Charles's law (V ∝ T at fixed P) and Gay-Lussac's law (P ∝ T at fixed V); written for n moles it is PV = nRT, or PV = NkT for N molecules.",
  whyItMatters:
    "19 PYQs, none HARD. Eleven apply one gas law — the percentage change in pressure for a percentage change in volume, a tyre warming up, a balloon rising. " +
    "Eight use PV = nRT or PV = NkT to compare the number of molecules in two jars, find a density or molecular mass, or count the moles that leak out. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-kt-gas-laws",
      name: "One Law at a Time",
      intuition:
        "Hold one quantity fixed and the other two are tied. At constant temperature PV is constant, so a 5% smaller volume needs pressure multiplied by 20/19 — 5.26% more, not 5%. At constant volume P ∝ T in kelvin, so a 2.5% rise in pressure for a 4 K rise means the gas started at 160 K. Combining them, P₁V₁/T₁ = P₂V₂/T₂. A real gas behaves most like an ideal one at low pressure and high temperature, where the molecules are far apart and fast. The force a gas exerts on a closed container's wall is its pressure times the area, so it goes as T to the first power.",
      definition:
        "- **Boyle** (T const): \\(P_1V_1 = P_2V_2\\) — V down 5% ⇒ P up 5.26%; P down 20% ⇒ V up 25%.\n" +
        "- **Gay-Lussac** (V const): \\(\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}\\) — 270 kPa at 27 °C ⇒ 279 kPa at 37 °C.\n" +
        "- **Combined**: \\(\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}\\) — 500 m³ at 27 °C, 1 atm ⇒ 900 m³ at −3 °C, 0.5 atm.\n" +
        "- Ideal behaviour: **low pressure, high temperature**. Force on a closed container's wall ∝ \\(T^1\\).",
      formula: {
        label: "Combined gas law",
        latex: "\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}",
      },
      authoredExample: {
        prompt: "A closed vessel holds gas at 100 °C. Its pressure rises by 4%. By how much has the temperature risen?",
        steps: ["T₁ = 373 K; P ∝ T, so T₂ = 1.04 × 373 = 387.92 K.", "Rise = 14.92 K."],
        answer: "14.92 °C",
      },
      selfCheckExample: {
        prompt: "A tyre is at 300 kPa and 27 °C. Pressure at 57 °C, volume fixed?",
        steps: ["300 × 330/300."],
        answer: "330 kPa",
      },
      practiceSet: [
        { prompt: "Volume increased by 7% at constant temperature. Change in pressure?", answer: "About 6.5% (a fall)" },
        { prompt: "A real gas behaves as an ideal gas at?", answer: "Low pressure and high temperature" },
      ],
      pyqExampleId: "bebf2e49-e45d-4b7d-b210-2be8b04bdea9",
      traps: [
        {
          title: "Equal percentages in Boyle's law",
          body:
            "PV is constant, not P + V. Reducing V by 5% multiplies P by 1/0.95 — an increase of 5.26%. The options include the plain 5%.",
        },
        {
          title: "Using degrees Celsius in P ∝ T",
          body:
            "27 °C to 37 °C is 300 K to 310 K, a 3.3% rise — not 37/27. Convert before taking the ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-kt-ideal-gas-equation",
      name: "PV = nRT and Counting Molecules",
      intuition:
        "The ideal gas equation counts the gas: n = PV/RT moles, or N = PV/kT molecules. Comparing two jars, the ratio of molecule numbers is the ratio of PV/T. With mass m and molar mass M, n = m/M, so density is ρ = PM/RT: at the same pressure and temperature a heavier gas is denser, and samples of equal mass, volume and pressure have temperatures in the ratio of their molar masses. Gas that leaks from a rigid vessel at constant temperature takes with it (P − P′)V/RT moles.",
      definition:
        "- \\(PV = nRT = NkT\\), \\(n = \\dfrac{m}{M}\\).\n" +
        "- Two jars: \\(\\dfrac{N_1}{N_2} = \\dfrac{P_1V_1/T_1}{P_2V_2/T_2}\\) (P, V, T against P, V/4, 2T ⇒ 4 : 1).\n" +
        "- Density: \\(\\rho = \\dfrac{PM}{RT}\\) (\\(\\rho \\propto P/T\\)); \\(\\dfrac{M_A}{M_B} = \\dfrac{\\rho_A P_B}{\\rho_B P_A}\\).\n" +
        "- Same m, V, P: \\(T \\propto M\\) (O₂ : H₂ = 16 : 1).\n" +
        "- Leak at constant T: \\(\\Delta n = \\dfrac{V}{RT}(P - P')\\).",
      formula: {
        label: "Ideal gas equation",
        latex: "PV = nRT = NkT, \\qquad \\rho = \\frac{PM}{RT}",
      },
      authoredExample: {
        prompt: "A gas has density ρ₀ at P₀ and T₀. What is its density at 2P₀ and 4T₀?",
        steps: ["ρ ∝ P/T.", "ρ = ρ₀ × 2/4."],
        answer: "ρ₀/2",
      },
      selfCheckExample: {
        prompt: "Jar A holds gas at P, V, T; jar B at 3P, V/2, 3T. Ratio of molecules in A to B?",
        steps: ["PV/T against (3P)(V/2)/(3T) = PV/2T."],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "Density ρ₀ at T₀, P₀. Density at 2T₀ and 3P₀?", answer: "3ρ₀/2" },
      ],
      pyqExampleId: "914f73d0-818e-4031-9460-eecec70ea4dd",
      traps: [
        {
          title: "Leaving T out of a molecule count",
          body:
            "The number of molecules is PV/kT. Two jars at different temperatures cannot be compared by PV alone.",
        },
      ],
    },
  ],
  related: [
    { label: "Kinetic Theory — where the pressure comes from", href: `${BASE}/cetp-kt-kinetic` },
  ],
};
