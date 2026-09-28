import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermodynamics";

export const PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Isothermal, Adiabatic, Isobaric, and Isochoric Processes",
  title: "The Four Processes and the Adiabatic Relations",
  oneLineDefinition:
    "Holding temperature, heat, pressure or volume fixed gives the isothermal, adiabatic, isobaric and isochoric processes; an adiabatic change of an ideal gas follows PV^γ = constant, equivalently TV^(γ−1) = constant, which is steeper on a P–V graph than an isothermal.",
  whyItMatters:
    "36 PYQs, 11 of them HARD. Thirteen identify a process from a statement or a graph. Sixteen apply the adiabatic relations — the final pressure or temperature after a sudden compression, P against T, density against pressure. " +
    "Seven chain two processes or compare them, including gases that obey PV² or VP² = constant. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-td-process-identification",
      name: "Recognising Each Process",
      intuition:
        "Each process fixes one quantity. Isothermal: T constant, so ΔU = 0, PV = constant, a hyperbola on P–V, and all heat becomes work. Adiabatic: no heat exchanged, the system insulated, PV^γ = constant, and a steeper curve than the isothermal through the same point; the temperature changes. Isobaric: P constant, a horizontal line on P–V. Isochoric: V constant, a vertical line on P–V, no work, dQ = dU. A process PV^n = constant with zero specific heat must be adiabatic, so n = γ. On a p–T graph an isothermal is a vertical line.",
      definition:
        "- **Isothermal**: T const, ΔU = 0, Q = W, hyperbola.\n" +
        "- **Adiabatic**: Q = 0, \\(PV^\\gamma\\) const, steeper than isothermal; ΔT ≠ 0.\n" +
        "- **Isobaric**: P const, horizontal on P–V. **Isochoric**: V const, vertical on P–V, dQ = dU.\n" +
        "- \\(PV^n\\) const with zero specific heat ⇒ \\(n = \\gamma\\).\n" +
        "- On a cycle's P–V graph, the two steeper sides are the adiabatics.",
      formula: {
        label: "Process equations",
        latex: "PV = \\text{const (isothermal)}, \\qquad PV^\\gamma = \\text{const (adiabatic)}",
      },
      authoredExample: {
        prompt: "A cycle on a P–V graph has two curved sides of different steepness and two straight sides. Which curves are adiabatic?",
        steps: ["Through any point an adiabatic falls faster than an isothermal (slope −γP/V against −P/V).", "The steeper pair are the adiabatics."],
        answer: "The steeper pair",
      },
      selfCheckExample: {
        prompt: "In which process does the heat supplied equal the rise in internal energy?",
        steps: ["dQ = dU + P dV with dV = 0."],
        answer: "Isochoric",
      },
      practiceSet: [
        { prompt: "Which statement is NOT true: isochoric means pressure constant, or adiabatic means insulated?", answer: "Isochoric means pressure constant" },
        { prompt: "On a P–V graph, an isochoric change is?", answer: "A vertical line" },
      ],
      pyqExampleId: "9528bb3d-d5db-4781-9bf0-d6511bc89a30",
      traps: [
        {
          title: "Calling the steeper curve isothermal",
          body:
            "Adiabatic curves are the steeper ones — γ times the isothermal slope at the same point.",
        },
        {
          title: "Thinking an adiabatic keeps temperature constant",
          body:
            "No heat enters, but work changes the internal energy, so the temperature changes. Constant temperature is the isothermal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-td-adiabatic-relations",
      name: "The Adiabatic Relations",
      intuition:
        "Three forms of one law: PV^γ, TV^(γ−1) and P^(1−γ)T^γ are all constant. A 'sudden' compression is adiabatic. Compress to 1/k of the volume and the pressure rises by k^γ and the temperature by k^(γ−1); powers of 2 make the numbers clean — 32^(2/5) = 4 and 8^(4/3) = 16. Pressure follows temperature as P ∝ T^(γ/(γ−1)), 3.5 for a diatomic gas. Density is inversely proportional to volume, so P ∝ ρ^γ. The rms speed goes as √T, so cutting it 4 times needs T to fall 16 times.",
      definition:
        "- \\(PV^\\gamma\\), \\(TV^{\\gamma - 1}\\) and \\(P^{1-\\gamma}T^\\gamma\\) are constant.\n" +
        "- Compressed to 1/k: \\(P \\times k^\\gamma\\), \\(T \\times k^{\\gamma - 1}\\) (monoatomic to 1/8 at 300 K ⇒ 1200 K; to 1/27 ⇒ 9T).\n" +
        "- \\(P \\propto T^{\\gamma/(\\gamma - 1)}\\): diatomic 3.5; \\(P \\propto \\rho^\\gamma\\): ρ × 32 ⇒ P × 128.\n" +
        "- Gas column in a cylinder: \\(\\dfrac{T_2}{T_1} = \\left(\\dfrac{L_1}{L_2}\\right)^{\\gamma - 1}\\).\n" +
        "- \\(v_{\\text{rms}} \\propto \\sqrt{T}\\): ÷4 ⇒ T ÷ 16 ⇒ with γ = 1.5, V × 256.",
      formula: {
        label: "Adiabatic",
        latex: "PV^{\\gamma} = \\text{const}, \\qquad TV^{\\gamma - 1} = \\text{const}",
      },
      authoredExample: {
        prompt: "Air (γ = 1.4) at 300 K is suddenly compressed to 1/32 of its volume. Final temperature?",
        steps: ["T₂ = 300 × 32^0.4.", "32^0.4 = 2² = 4, so T₂ = 1200 K."],
        answer: "1200 K",
      },
      selfCheckExample: {
        prompt: "A monoatomic gas (γ = 5/3) is suddenly compressed to 1/8 of its volume. Factor on its pressure?",
        steps: ["8^(5/3) = 2⁵."],
        answer: "32",
      },
      practiceSet: [
        { prompt: "γ = 4/3 gas compressed to 1/8 of its volume. New pressure in terms of P₀?", answer: "16P₀" },
        { prompt: "27 °C gas (γ = 5/3) compressed to 8/27 of its volume. Rise in temperature?", answer: "375 K" },
      ],
      pyqExampleId: "6cc6f953-bf1e-46ed-bd8e-efa9c3cdceff",
      traps: [
        {
          title: "Using γ in the temperature relation",
          body:
            "Pressure goes as V^(−γ) but temperature as V^(−(γ−1)). Using γ for the temperature turns 4 into 128.",
        },
        {
          title: "Forgetting that 'sudden' means adiabatic",
          body:
            "A gas compressed suddenly has no time to exchange heat. Treating it as isothermal gives 4P instead of 8P for a four-fold compression with γ = 1.5.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-td-combined-processes",
      name: "Chaining and Comparing Processes",
      intuition:
        "Work through a chain one leg at a time, using the rule for each leg: an isothermal leg keeps PV, an adiabatic leg keeps PV^γ, an isobaric leg keeps P. To compare processes from the same start to the same volume, remember that the adiabatic changes pressure most: compressed to half, the isothermal pressure doubles and the adiabatic rises 2^γ times. A gas forced along PV^n = constant has T ∝ V^(1−n): for PV² = constant the temperature falls as it expands, for VP² = constant it rises as √V.",
      definition:
        "- Isothermal V → 4V then adiabatic back to V (γ = 3/2): \\(\\dfrac{P}{4} \\times 4^{3/2} = 2P\\).\n" +
        "- Same compression to V/8 (γ = 5/3): isothermal 8P, adiabatic 32P, ratio 1 : 4.\n" +
        "- Same final pressure after doubling V: \\(P_{\\text{iso}} : P_{\\text{adia}} : P_{\\text{isobar}} = 2 : 2^\\gamma : 1\\).\n" +
        "- \\(PV^2\\) const ⇒ \\(T \\propto \\dfrac{1}{V}\\); \\(VP^2\\) const ⇒ \\(T \\propto \\sqrt{V}\\) (2V ⇒ \\(\\sqrt{2}\\,T\\)).",
      formula: {
        label: "Chaining",
        latex: "\\text{isothermal: } P_1V_1 = P_2V_2, \\qquad \\text{adiabatic: } P_2V_2^\\gamma = P_3V_3^\\gamma",
      },
      authoredExample: {
        prompt: "A gas (γ = 5/3) at P, V expands isothermally to 2V, then adiabatically to 16V. Final pressure?",
        steps: ["Isothermal: P/2.", "Adiabatic: (P/2)(2V/16V)^(5/3) = (P/2)/32 = P/64."],
        answer: "P/64",
      },
      selfCheckExample: {
        prompt: "A gas (γ = 1.5) at P expands isothermally from V to 9V, then is compressed adiabatically back to V. Final pressure?",
        steps: ["P/9, then × 9^1.5 = 27."],
        answer: "3P",
      },
      practiceSet: [
        { prompt: "Isothermal and adiabatic compression from V to V/2. Final pressure of the isothermal sample compared with the adiabatic?", answer: "Less" },
      ],
      pyqExampleId: "2824f441-2993-4c50-a81a-abb2e6469ea5",
      traps: [
        {
          title: "Applying one rule to the whole chain",
          body:
            "Each leg has its own rule. PV^γ through an isothermal leg, or PV through an adiabatic one, gives a wrong pressure at the join.",
        },
      ],
    },
  ],
  related: [
    { label: "The First Law — heat, work and internal energy", href: `${BASE}/cetp-td-first-law` },
    { label: "Carnot Engine — two isothermals and two adiabatics", href: `${BASE}/cetp-td-carnot` },
  ],
};
