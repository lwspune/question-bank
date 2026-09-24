import type { SubtopicNote } from "@/app/notes/_types";

export const ENTROPY_NOTE: SubtopicNote = {
  subtopicName: "Entropy and Second Law",
  title: "Entropy and the Second Law",
  oneLineDefinition:
    "Entropy measures disorder; a spontaneous process raises the entropy of the universe, ΔS_total = ΔS_sys + ΔS_surr > 0, where the surroundings' share is −ΔH_sys/T.",
  whyItMatters:
    "9 PYQs, none HARD. Two shapes: pick the reaction whose entropy falls (gas moles decrease, or gas becomes liquid) or rises (solid dissolves, gas made), and compute ΔS_surr = −ΔH/T or ΔS_total with the units matched — ΔH in kJ, ΔS in J K⁻¹. " +
    "One conversion and one sign.",
  concepts: [
    // 1 — sign of ΔS
    {
      kind: "formula" as const,
      slug: "cetth-entropy-sign-prediction",
      name: "Predicting the Sign of ΔS",
      intuition:
        "Gas is far more disordered than liquid, liquid than solid. So count gas molecules on each side and watch phase changes: more gas or a solid dissolving means entropy rises; fewer gas molecules or a gas condensing means it falls.",
      definition:
        "- \\(S_{\\text{gas}} \\gg S_{\\text{liquid}} > S_{\\text{solid}}\\). Melting, vaporisation, sublimation: ΔS > 0. Freezing, condensation, deposition: ΔS < 0.\n" +
        "- Gas moles up → ΔS > 0: \\(\\text{CaCO}_3(s) \\to \\text{CaO}(s) + \\text{CO}_2(g)\\); \\(\\text{H}_2 \\to 2\\text{H}\\); \\(2\\text{H}_2\\text{O}_2(l) \\to 2\\text{H}_2\\text{O}(l) + \\text{O}_2(g)\\).\n" +
        "- Gas moles down → ΔS < 0: \\(\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3\\); \\(2\\text{H}_2 + \\text{O}_2 \\to 2\\text{H}_2\\text{O}(l)\\) (three gas moles to a liquid); \\(\\text{CaO} + \\text{CO}_2 \\to \\text{CaCO}_3\\).\n" +
        "- Dissolving an ionic solid: \\(\\text{NaNO}_3(s) \\to \\text{Na}^+ + \\text{NO}_3^-\\), ΔS > 0. Crystallising from solution: ΔS < 0.",
      formula: {
        label: "Rule of thumb",
        latex:
          "\\Delta n_g > 0 \\Rightarrow \\Delta S > 0;\\qquad \\Delta n_g < 0 \\text{ or gas} \\to \\text{liquid/solid} \\Rightarrow \\Delta S < 0",
      },
      authoredExample: {
        prompt: "Order by entropy change, most positive first: \\(\\text{I}_2(s) \\to \\text{I}_2(g)\\); \\(2\\text{SO}_2 + \\text{O}_2 \\to 2\\text{SO}_3\\); \\(\\text{H}_2\\text{O}(l) \\to \\text{H}_2\\text{O}(s)\\).",
        steps: [
          "Sublimation makes a gas from a solid (large +); the SO₃ reaction loses a gas mole (−); freezing orders a liquid (−, smaller than losing a gas mole).",
        ],
        answer: "Sublimation > freezing > SO₂ oxidation",
      },
      selfCheckExample: {
        prompt: "Which shows a DECREASE in entropy: \\(\\text{H}_2\\text{O}(s) \\to \\text{H}_2\\text{O}(l)\\); \\(\\text{H}_2\\text{O}(l) \\to \\text{H}_2\\text{O}(g)\\); \\(\\text{H}_2\\text{O}(g) \\to \\text{H}_2\\text{O}(l)\\)?",
        steps: [
          "Condensation, gas to liquid.",
        ],
        answer: "\\(\\text{H}_2\\text{O}(g) \\to \\text{H}_2\\text{O}(l)\\)",
      },
      practiceSet: [
        { prompt: "Sign of ΔS for \\(\\text{NaNO}_3(s) \\to \\text{Na}^+(aq) + \\text{NO}_3^-(aq)\\)?", answer: "Positive" },
        { prompt: "Sign of ΔS for \\(2\\text{H}_2 + \\text{O}_2 \\to 2\\text{H}_2\\text{O}(l)\\)?", answer: "Negative" },
        { prompt: "Sign of ΔS for \\(\\text{H}_2 \\to 2\\text{H}\\)?", answer: "Positive" },
        { prompt: "Which phase has the highest entropy?", answer: "Gas" },
      ],
      pyqExampleId: "7b36deca-2170-4413-9487-07fd16b538d2",
      traps: [
        {
          title: "Counting moles without looking at phases",
          body:
            "\\(2\\text{H}_2\\text{O}_2(l) \\to 2\\text{H}_2\\text{O}(l) + \\text{O}_2(g)\\) has 2 → 3 moles overall, but what matters is that a GAS appears from liquids: ΔS > 0. Conversely 3 gas moles to 2 moles of LIQUID water is a large decrease.",
        },
      ],
    },

    // 2 — entropy calculations
    {
      kind: "formula" as const,
      slug: "cetth-entropy-calculations",
      name: "ΔS = q_rev/T, ΔS_surr = −ΔH/T and ΔS_total",
      intuition:
        "Heat flowing reversibly at temperature T changes entropy by q/T — at a phase change that is ΔH/T. The surroundings receive whatever heat the system gives out, so their entropy change is −ΔH_sys/T, and the total is the sum. Watch the units: ΔH arrives in kJ, ΔS in J K⁻¹.",
      definition:
        "- Phase change: \\(\\Delta S = \\dfrac{\\Delta H}{T}\\). Melting 1 g ice, 80 J g⁻¹ at 273 K: \\(0.293\\) J g⁻¹ K⁻¹.\n" +
        "- \\(\\Delta S_{\\text{surr}} = -\\dfrac{\\Delta H_{\\text{sys}}}{T}\\). Ice melting, +7 kJ at 300 K: \\(-7000/300 = -23.3\\) J K⁻¹. Water forming, −525 kJ at 300 K: \\(+1750\\) J K⁻¹.\n" +
        "- \\(\\Delta S_{\\text{total}} = \\Delta S_{\\text{sys}} + \\Delta S_{\\text{surr}} = \\Delta S_{\\text{sys}} - \\dfrac{\\Delta H}{T}\\). NH₄NO₃ dissolving, 28.1 kJ, 108.7 J K⁻¹, 300 K: \\(108.7 - 93.7 = 15.1\\) J K⁻¹ (spontaneous though endothermic).\n" +
        "- ΔH = −150 kJ, ΔS = 32 J K⁻¹, 300 K: \\(32 + 500 = 532\\). ΔH° = −208.6 kJ, ΔS° = −36 J K⁻¹, 298 K: \\(-36 + 700 = 664\\).\n" +
        "- Second law: \\(\\Delta S_{\\text{total}} > 0\\) spontaneous, \\(= 0\\) equilibrium, \\(< 0\\) non-spontaneous.",
      formula: {
        label: "Entropy of surroundings and total",
        latex:
          "\\Delta S_{\\text{surr}} = -\\frac{\\Delta H_{\\text{sys}}}{T},\\qquad \\Delta S_{\\text{total}} = \\Delta S_{\\text{sys}} - \\frac{\\Delta H_{\\text{sys}}}{T}",
      },
      authoredExample: {
        prompt: "A reaction has ΔH = −90 kJ and ΔS_sys = −120 J K⁻¹ at 300 K. Find ΔS_total and say whether it is spontaneous.",
        steps: [
          "\\(\\Delta S_{\\text{surr}} = 90000/300 = +300\\) J K⁻¹. \\(\\Delta S_{\\text{total}} = -120 + 300 = +180\\) J K⁻¹ > 0: spontaneous.",
        ],
        answer: "\\(+180\\) J K⁻¹; spontaneous",
      },
      selfCheckExample: {
        prompt: "Benzene boils at 353 K with ΔH_vap = 30.8 kJ mol⁻¹. Find ΔS_vap.",
        steps: [
          "\\(30800/353 = 87.3\\) J K⁻¹ mol⁻¹.",
        ],
        answer: "\\(87.3\\) J K⁻¹ mol⁻¹",
      },
      practiceSet: [
        { prompt: "ΔH = +7 kJ at 300 K: ΔS_surr?", answer: "−23.3 J K⁻¹" },
        { prompt: "525 kJ released at 300 K: ΔS_surr?", answer: "+1750 J K⁻¹" },
        { prompt: "ΔH = 28.1 kJ, ΔS_sys = 108.7 J K⁻¹, 300 K: ΔS_total?", answer: "15.1 J K⁻¹" },
        { prompt: "1 g ice melting at 273 K, 80 J: ΔS?", answer: "0.293 J g⁻¹ K⁻¹" },
      ],
      pyqExampleId: "4f3c7d3e-cfd0-46ef-9478-6f3ea77cc57d",
      traps: [
        {
          title: "Dividing kilojoules by kelvin",
          body:
            "28.1/300 = 0.094 is in kJ K⁻¹ and cannot be added to 108.7 J K⁻¹. Convert ΔH to joules first: 28100/300 = 93.7 J K⁻¹.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Gibbs Energy — ΔG = ΔH − TΔS is −TΔS_total",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-gibbs-energy",
    },
    {
      label: "Enthalpy — the ΔH that feeds ΔS_surr",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-enthalpy",
    },
  ],
};
