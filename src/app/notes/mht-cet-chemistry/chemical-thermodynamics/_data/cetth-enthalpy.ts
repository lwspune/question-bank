import type { SubtopicNote } from "@/app/notes/_types";

export const ENTHALPY_NOTE: SubtopicNote = {
  subtopicName: "Enthalpy and Relation Between ΔH and ΔU",
  title: "Enthalpy and the Relation Between ΔH and ΔU",
  oneLineDefinition:
    "Enthalpy H = U + PV is the heat of a process at constant pressure; for a reaction with a change in gas moles, ΔH = ΔU + Δn_g RT, so ΔH and ΔU differ only when gases are made or consumed.",
  whyItMatters:
    "18 PYQs, 2 HARD. Half are ΔH − ΔU = Δn_g RT — read the equation, count gas moles, multiply — including the reverse move from ΔU to ΔH with R = 8.314. The rest are an enthalpy of vaporisation from grams and kilojoules, and recall: freezing is minus fusion, melting is endothermic, ΔH of an isothermal ideal-gas step is zero.",
  concepts: [
    // 1 — enthalpy and phase changes
    {
      kind: "formula" as const,
      slug: "cetth-enthalpy-and-phase-changes",
      name: "Enthalpy, Heat at Constant Pressure and Phase Changes",
      intuition:
        "At constant pressure part of the heat supplied goes into pushing back the atmosphere, so the heat is ΔU plus PΔV — that sum is ΔH. A phase change at constant T and P is pure enthalpy: melting and boiling absorb heat (positive), freezing and condensing release the same amount (negative).",
      definition:
        "- \\(H = U + PV\\); at constant P, \\(q_P = \\Delta H = \\Delta U + P\\Delta V\\). A gas doing 200 J of expansion work while U rises 432 J has \\(\\Delta H = 632\\) J.\n" +
        "- \\(\\Delta H_{\\text{freezing}} = -\\Delta H_{\\text{fusion}}\\); \\(\\Delta H_{\\text{condensation}} = -\\Delta H_{\\text{vaporisation}}\\). Melting ice is ENDOTHERMIC; freezing, condensation and deposition are exothermic.\n" +
        "- \\(\\Delta H_{\\text{vap}}\\) per mole = heat supplied ÷ moles vaporised: 13 g benzene (1/6 mol) by 5.1 kJ → 30.6 kJ mol⁻¹; 11.5 g ethanol (0.25 mol) by 11.8 kJ → 47.2; 1.8 g water (0.1 mol) by 4 kJ → 40.\n" +
        "- Two formation equations give a phase change: \\(\\Delta H_{\\text{vap}}(\\text{H}_2\\text{O}) = \\Delta H_f(g) - \\Delta H_f(l) = -57 - (-68.3) = 11.3\\) kcal mol⁻¹; for 9 g, 5.65 kcal.\n" +
        "- Isothermal process of an ideal gas: \\(\\Delta H = nC_P\\Delta T = 0\\), whatever the volume change.",
      formula: {
        label: "Enthalpy",
        latex:
          "H = U + PV,\\qquad \\Delta H = q_P,\\qquad \\Delta H_{\\text{vap}} = \\frac{q}{n}",
      },
      authoredExample: {
        prompt: "4.6 g of ethanol (M = 46) absorbs 4.3 kJ to vaporise at its boiling point. Find ΔH_vap, and the heat released when 23 g of ethanol vapour condenses.",
        steps: [
          "0.1 mol absorbs 4.3 kJ: \\(\\Delta H_{\\text{vap}} = 43\\) kJ mol⁻¹.",
          "23 g = 0.5 mol condensing releases \\(0.5 \\times 43 = 21.5\\) kJ (\\(\\Delta H = -21.5\\) kJ).",
        ],
        answer: "\\(43\\) kJ mol⁻¹; \\(-21.5\\) kJ",
      },
      selfCheckExample: {
        prompt: "Which is endothermic: water freezing, steam condensing, ice melting, steam depositing as frost?",
        steps: [
          "Only melting absorbs heat.",
        ],
        answer: "Ice melting",
      },
      practiceSet: [
        { prompt: "Enthalpy of freezing is the negative of?", answer: "Enthalpy of fusion" },
        { prompt: "13 g benzene vaporised by 5.1 kJ: ΔH_vap?", answer: "30.6 kJ mol⁻¹" },
        { prompt: "ΔH for the isothermal free expansion of an ideal gas?", answer: "Zero" },
        { prompt: "Definition of enthalpy?", answer: "\\(U + PV\\)" },
      ],
      pyqExampleId: "9db7f320-35e1-4d3a-ae93-1785addba6b9",
      traps: [
        {
          title: "Dividing the heat by the grams",
          body:
            "5.1 kJ / 13 g is a per-gram figure and matches no option. Convert to moles first: ΔH_vap is per MOLE.",
        },
      ],
    },

    // 2 — ΔH − ΔU
    {
      kind: "formula" as const,
      slug: "cetth-delta-h-minus-delta-u",
      name: "ΔH = ΔU + Δn_g RT",
      intuition:
        "The PΔV term of a reaction at constant T is the gas made or consumed: PΔV = Δn_g RT. So ΔH exceeds ΔU when gas is produced, falls short when gas is consumed, and equals it when Δn_g = 0 — or at constant volume, where there is no PΔV at all. Solids and liquids contribute nothing.",
      definition:
        "- \\(\\Delta H = \\Delta U + \\Delta n_g RT\\); \\(\\Delta H - \\Delta U = \\Delta n_g RT\\). Significant only for systems with GASES.\n" +
        "- \\(\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\to 3\\text{CO}_2 + 4\\text{H}_2\\text{O}(l)\\): \\(\\Delta n_g = 3 - 6 = -3\\), \\(\\Delta H - \\Delta U = -3RT\\). \\(2\\text{C}(s) + 3\\text{H}_2 \\to \\text{C}_2\\text{H}_6\\): −2RT. \\(\\text{CO} + \\tfrac{1}{2}\\text{O}_2 \\to \\text{CO}_2\\): \\(\\Delta n_g = -\\tfrac{1}{2}\\), so \\(\\Delta H < \\Delta U\\).\n" +
        "- \\(\\Delta H = \\Delta U\\): constant volume, or \\(\\Delta n_g = 0\\) — \\(\\text{H}_2 + \\text{Br}_2 \\to 2\\text{HBr}\\).\n" +
        "- Numbers: \\(\\text{NH}_2\\text{CN} + \\tfrac{3}{2}\\text{O}_2 \\to \\text{N}_2 + \\text{CO}_2 + \\text{H}_2\\text{O}(l)\\), \\(\\Delta U = -740.5\\) kJ, \\(\\Delta n_g = -\\tfrac{1}{2}\\): \\(\\Delta H = -740.5 - 0.5 \\times 8.314 \\times 10^{-3} \\times 298 = -741.7\\) kJ.\n" +
        "- Reverse: \\(\\Delta U = \\Delta H - \\Delta n_g RT\\). \\(\\text{OF}_2 + \\text{H}_2\\text{O}(g) \\to 2\\text{HF} + \\text{O}_2\\): \\(\\Delta H = -310\\) kJ, \\(\\Delta n_g = +1\\), \\(\\Delta U = -310 - 2.5 = -312.5\\) kJ.",
      formula: {
        label: "ΔH and ΔU",
        latex:
          "\\Delta H = \\Delta U + \\Delta n_g\\,RT",
      },
      authoredExample: {
        prompt: "For \\(\\text{N}_2(g) + 3\\text{H}_2(g) \\to 2\\text{NH}_3(g)\\) at 300 K, ΔH = −92.0 kJ. Find ΔU.",
        steps: [
          "\\(\\Delta n_g = 2 - 4 = -2\\). \\(\\Delta U = \\Delta H - \\Delta n_g RT = -92.0 + 2 \\times 8.314 \\times 10^{-3} \\times 300 = -92.0 + 5.0 = -87.0\\) kJ.",
        ],
        answer: "\\(-87.0\\) kJ",
      },
      selfCheckExample: {
        prompt: "For \\(\\text{CaCO}_3(s) \\to \\text{CaO}(s) + \\text{CO}_2(g)\\), is ΔH greater than, equal to or less than ΔU?",
        steps: [
          "\\(\\Delta n_g = +1\\): \\(\\Delta H = \\Delta U + RT > \\Delta U\\).",
        ],
        answer: "Greater",
      },
      practiceSet: [
        { prompt: "\\(\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\to 3\\text{CO}_2 + 4\\text{H}_2\\text{O}(l)\\): ΔH − ΔU?", answer: "−3RT" },
        { prompt: "At constant volume, ΔH versus ΔU?", answer: "Equal" },
        { prompt: "ΔH − ΔU is significant for systems of?", answer: "Gases only" },
        { prompt: "Which has ΔH = ΔU: \\(\\text{H}_2 + \\text{Br}_2 \\to 2\\text{HBr}\\) or \\(\\text{PCl}_5 \\to \\text{PCl}_3 + \\text{Cl}_2\\)?", answer: "\\(\\text{H}_2 + \\text{Br}_2 \\to 2\\text{HBr}\\)" },
      ],
      pyqExampleId: "470f86f6-1371-4251-a7fa-b1f3269be364",
      traps: [
        {
          title: "Counting liquid water as a gas",
          body:
            "\\(\\text{H}_2\\text{O}(l)\\) contributes nothing to \\(\\Delta n_g\\). Propane combustion is −3RT because the four waters are liquid; counting them gives +1RT, an offered option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "First Law — the PV work that separates ΔH from ΔU",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-first-law",
    },
    {
      label: "Thermochemistry — enthalpies of formation and reaction",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-thermochemistry",
    },
  ],
};
