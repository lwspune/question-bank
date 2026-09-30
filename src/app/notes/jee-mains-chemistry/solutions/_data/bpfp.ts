import type { SubtopicNote } from "@/app/notes/_types";

export const BPFP_SOL_NOTE: SubtopicNote = {
  subtopicName: "Elevation of Boiling Point and Depression of Freezing Point",
  title: "Elevation of Boiling Point and Depression of Freezing Point",
  oneLineDefinition:
    "A non-volatile solute raises the boiling point and lowers the freezing point of a solvent by K times the molality, ΔTb = Kb·m and ΔTf = Kf·m.",
  whyItMatters:
    "Twenty-seven PYQs, fifteen of them numeric, and two from 2026. Sixteen are ΔT = K·m in some direction: a new boiling or freezing point, a molar mass, an antifreeze mass or the ice that separates on cooling. Six are about Kb and Kf themselves, and five read a vapour pressure diagram or test what happens as a solution freezes.",
  concepts: [
    // C1 — ΔT = K m
    {
      kind: "formula" as const,
      slug: "jcsol-delta-t",
      name: "Elevation and depression, ΔT = K·m",
      intuition:
        "Dissolved particles lower the solvent's vapour pressure, so the solution has to be heated further to boil and cooled further to freeze. Both shifts are proportional to the molality: moles of solute per kilogram of SOLVENT.",
      definition:
        "- \\(\\Delta T_b = K_b m\\), \\(\\Delta T_f = K_f m\\), with \\(m = \\dfrac{w_2/M_2}{W_1/1000}\\) (\\(W_1\\) in grams of solvent).\n" +
        "- Molar mass: \\(M_2 = \\dfrac{1000\\,K\\,w_2}{\\Delta T\\,W_1}\\).\n" +
        "- Solvent given as a volume: grams \\(=\\) volume \\(\\times\\) density.\n" +
        "- Several non-electrolytes in one solvent: add their moles.\n" +
        "- Equal masses of two solutes in equal solvent: \\(\\Delta T \\propto 1/M\\), so the larger molar mass gives the smaller shift.\n" +
        "- Two compounds AB and \\(\\mathrm{AB_2}\\): find both molar masses, then solve \\(A + B\\) and \\(A + 2B\\) together.\n" +
        "- Ice on cooling: only water freezes. The water still liquid at \\(-\\Delta T_f\\) is \\(n_2 K_f/\\Delta T_f\\) kg; ice \\(=\\) water at the start minus that. For 0.5 mol sucrose in 1 kg of water cooled to \\(-1.86\\) °C, 0.5 kg stays liquid and 500 g is ice.",
      formula: {
        label: "Colligative temperature shifts",
        latex: "\\Delta T_b = K_b\\,m \\qquad \\Delta T_f = K_f\\,m \\qquad M_2 = \\frac{1000\\,K\\,w_2}{\\Delta T\\,W_1}",
      },
      authoredExample: {
        prompt:
          "1.8 g of a non-volatile non-electrolyte in 40 g of water lowers the freezing point by 0.465 K. Find its molar mass (\\(K_f = 1.86\\) K kg/mol).",
        steps: [
          "\\(m = 0.465/1.86 = 0.25\\) mol/kg.",
          "Moles of solute \\(= 0.25 \\times 0.040 = 0.01\\) mol.",
          "\\(M = 1.8/0.01 = 180\\) g/mol.",
        ],
        answer: "\\(180\\) g/mol",
      },
      selfCheckExample: {
        prompt:
          "3 g each of two non-electrolytes AB and \\(\\mathrm{AB_2}\\) are dissolved separately in 200 g of a solvent with \\(K_f = 2.0\\) K kg/mol. The freezing points fall by 0.4 K and 0.25 K. Find the atomic masses of A and B.",
        steps: [
          "\\(M = \\dfrac{1000 \\times 2.0 \\times 3}{\\Delta T \\times 200} = \\dfrac{30}{\\Delta T}\\).",
          "AB: \\(30/0.4 = 75\\). \\(\\mathrm{AB_2}\\): \\(30/0.25 = 120\\).",
          "\\(A + B = 75\\) and \\(A + 2B = 120\\), so \\(B = 45\\) and \\(A = 30\\).",
        ],
        answer: "A \\(= 30\\), B \\(= 45\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\Delta T_f\\) for a 0.5 mol/kg aqueous glucose solution (\\(K_f = 1.86\\))?", answer: "\\(0.93\\) K" },
        { prompt: "An aqueous solution boils 0.26 K above water (\\(K_b = 0.52\\)). What is its molality?", answer: "\\(0.5\\) mol/kg" },
        { prompt: "1 mol of ethylene glycol and 1 mol of glucose are dissolved in 1 kg of water (\\(K_b = 0.52\\)). What is \\(\\Delta T_b\\)?", answer: "\\(1.04\\) K" },
        { prompt: "What mass of solvent is in 50 mL of ethanol of density 0.8 g/mL?", answer: "\\(40\\) g" },
      ],
      pyqExampleId: "2d17e78a-c452-444c-b474-129e551da270", // 2026 — PQ and PQ2 in solvent A, atomic masses of P and Q
      traps: [
        {
          title: "The ratio of shifts is the INVERSE ratio of molar masses",
          body: "For equal masses in equal solvent, \\(\\Delta T \\propto 1/M\\). If the depressions are in the ratio 1 : 4, the molar masses are in the ratio 4 : 1. Writing 1 : 4 for the masses is the planted option.",
        },
        {
          title: "Molality is per kilogram of SOLVENT",
          body: "Divide the solute's moles by the solvent's mass in kg, not by the solution's mass and not by a volume in litres. A solvent given in mL needs its density first.",
        },
        {
          title: "Answer in the order asked",
          body: "When a question asks for P and Q 'respectively', the option with the right pair in the wrong order is always present. Match your two values to their letters before choosing.",
        },
        {
          title: "Ice is pure solvent",
          body: "On cooling a solution only the solvent freezes. The solute stays behind, so the remaining liquid grows more concentrated. The ice separated is the starting water minus the water still needed to hold the solute at that temperature.",
        },
      ],
    },

    // C2 — Kb and Kf
    {
      kind: "formula" as const,
      slug: "jcsol-kb-kf",
      name: "Ebullioscopic and cryoscopic constants, Kb and Kf",
      intuition:
        "\\(K_b\\) and \\(K_f\\) are the shifts a 1 mol/kg solution would give. They belong to the solvent: a solvent with a high boiling point and a small heat of vaporisation has a large \\(K_b\\).",
      definition:
        "- \\(K_b = \\dfrac{R\\,T_b^{2}\\,M_1}{1000\\,\\Delta H_{\\text{vap}}}\\), \\(K_f = \\dfrac{R\\,T_f^{2}\\,M_1}{1000\\,\\Delta H_{\\text{fus}}}\\) (\\(M_1\\) in g/mol, \\(\\Delta H\\) in J/mol).\n" +
        "- At the freezing point \\(\\Delta S_{\\text{fus}} = \\Delta H_{\\text{fus}}/T_f\\), so \\(K_f = \\dfrac{M_1 R\\,T_f}{1000\\,\\Delta S_{\\text{fus}}}\\).\n" +
        "- For two solvents with equal \\(M_1\\): \\(K_b \\propto T_b^{2}/\\Delta H_{\\text{vap}}\\).\n" +
        "- Values: water \\(K_b = 0.52\\), \\(K_f = 1.86\\); benzene \\(K_b = 2.53\\), \\(K_f = 5.12\\); acetic acid \\(K_f = 3.9\\) (all in K kg/mol).\n" +
        "- For water \\(K_f > K_b\\), so the same solution's freezing point falls more than its boiling point rises.\n" +
        "- Osmotic pressure, not \\(\\Delta T\\), is used for the molar mass of proteins and polymers: the shifts are too small to read.",
      formula: {
        label: "The solvent constants",
        latex: "K_b = \\frac{R\\,T_b^{2}\\,M_1}{1000\\,\\Delta H_{\\text{vap}}} \\qquad K_f = \\frac{R\\,T_f^{2}\\,M_1}{1000\\,\\Delta H_{\\text{fus}}} = \\frac{M_1 R\\,T_f}{1000\\,\\Delta S_{\\text{fus}}}",
      },
      authoredExample: {
        prompt:
          "Solvents X and Y have the same molar mass. X boils at 300 K with \\(\\Delta H_{\\text{vap}} = 30\\) kJ/mol; Y boils at 450 K with \\(\\Delta H_{\\text{vap}} = 45\\) kJ/mol. Find \\(K_b(\\text{Y})/K_b(\\text{X})\\).",
        steps: [
          "\\(K_b \\propto T_b^{2}/\\Delta H_{\\text{vap}}\\) when \\(M_1\\) is the same.",
          "X: \\(300^2/30 = 3000\\). Y: \\(450^2/45 = 4500\\).",
          "Ratio \\(= 4500/3000 = 1.5\\).",
        ],
        answer: "\\(1.5\\)",
      },
      selfCheckExample: {
        prompt:
          "Water boils at 373 K and \\(\\Delta H_{\\text{vap}} = 40.66\\) kJ/mol. Estimate \\(K_b\\) for water (\\(R = 8.314\\) J/(K mol), M = 18 g/mol).",
        steps: [
          "\\(K_b = \\dfrac{8.314 \\times 373^2 \\times 18}{1000 \\times 40660}\\).",
          "\\(373^2 = 139129\\); numerator \\(= 8.314 \\times 139129 \\times 18 = 2.082 \\times 10^{7}\\).",
          "\\(K_b = 2.082 \\times 10^{7}/4.066 \\times 10^{7} = 0.512\\).",
        ],
        answer: "About \\(0.51\\) K kg/mol",
      },
      practiceSet: [
        { prompt: "For water, which is larger, Kb or Kf?", answer: "Kf (1.86 against 0.52 K kg/mol)" },
        { prompt: "What is \\(\\Delta T_b\\) for a 1 mol/kg aqueous urea solution?", answer: "\\(0.52\\) K" },
        { prompt: "Two solvents have the same molar mass and heat of vaporisation, and boiling points in the ratio 2 : 1. What is the ratio of their Kb?", answer: "\\(4 : 1\\)" },
        { prompt: "What is Kf for benzene?", answer: "\\(5.12\\) K kg/mol" },
      ],
      pyqExampleId: "32c27d0c-6dec-43c3-9826-29a674d9fa89", // 2025 — Kf from ΔS(fus); Kf of benzene vs water
      traps: [
        {
          title: "For water, Kf is larger than Kb",
          body: "Water's \\(K_f = 1.86\\) is more than three times its \\(K_b = 0.52\\). A statement that the boiling point of water rises more than its freezing point falls, for the same solution, is false.",
        },
        {
          title: "Benzene's Kf is larger than water's",
          body: "Benzene has \\(K_f = 5.12\\) K kg/mol against water's 1.86. The same molality freezes benzene almost three times as far below its normal freezing point.",
        },
      ],
    },

    // C3 — reading the diagram and what freezes
    {
      kind: "reference" as const,
      slug: "jcsol-phase-curves",
      name: "Vapour pressure diagrams and what freezes out",
      intuition:
        "Draw vapour pressure against temperature. The solution's curve sits below the solvent's at every temperature, so it reaches 1 atm at a higher temperature (it boils later) and meets the solid solvent's curve at a lower one (it freezes later on cooling).",
      definition:
        "- Boiling point: where the liquid's curve reaches the external pressure.\n" +
        "- Freezing point: where the liquid's curve crosses the curve of the SOLID solvent.\n" +
        "- \\(\\Delta T_b\\) is the gap between the two liquids' boiling points; \\(\\Delta T_f\\) the gap between their freezing points.\n" +
        "- Only the solvent solidifies; the solute stays dissolved.",
      table: {
        columns: ["Feature", "What happens", "Why"],
        rows: [
          { cells: ["Solution's vapour pressure curve", "Lies below the pure solvent's curve at every temperature", "The non-volatile solute lowers the vapour pressure"] },
          { cells: ["Boiling point", "The solution reaches 1 atm (760 mmHg) at a higher temperature", "Its vapour pressure starts lower, so it must be heated further"] },
          { cells: ["Freezing point", "The solution meets the solid solvent's curve at a lower temperature", "Its lower vapour pressure matches the solid's only at a lower temperature"] },
          { cells: ["What freezes out", "Pure solid solvent", "The solute stays in the liquid"], noteAmber: "'Only solute molecules solidify' is the planted false statement." },
          { cells: ["Solution as ice forms", "Grows more concentrated and its freezing point keeps falling", "Water leaves as ice while the solute stays"] },
          { cells: ["Salt on ice at 0 °C", "The ice melts and the mixture cools below 0 °C", "Brine freezes below 0 °C, a freezing mixture that keeps ice cream frozen"] },
        ],
        caption: "The solution's curve below the solvent's explains both shifts: a higher boiling point and a lower freezing point.",
      },
      selfCheckExample: {
        prompt: "A pure solvent and a solution of a non-volatile solute in it are cooled side by side. Which forms solid first, and what is the solid in each case?",
        steps: [
          "The pure solvent freezes at the higher temperature, so it forms solid first.",
          "In both, the solid is the pure solvent; the solution's solute stays in the liquid.",
        ],
        answer: "The pure solvent freezes first; in both the solid is pure solvent.",
      },
      practiceSet: [
        { prompt: "Is the solution's vapour pressure curve above or below the pure solvent's?", answer: "Below, at every temperature" },
        { prompt: "At its boiling point, a liquid's vapour pressure equals what?", answer: "The external pressure, 1 atm in an open vessel" },
        { prompt: "What happens to the freezing point of water when sugar is dissolved in it?", answer: "It falls" },
        { prompt: "Salt is sprinkled on ice at 0 °C. Does the ice melt?", answer: "Yes; the salty mixture freezes below 0 °C" },
      ],
      pyqExampleId: "89ca63f5-05e6-4ca4-856d-5ba3701824c5", // 2023 — statements on the freezing-point experiment
      traps: [
        {
          title: "Only the solvent freezes",
          body: "At the freezing point of a solution, pure solvent crystallises and the solute is left in the liquid. A statement that the solute solidifies, or that both do, is false.",
        },
        {
          title: "The solution's vapour pressure is lower, not higher",
          body: "Every colligative effect starts from the lowered vapour pressure. A statement that the solution's vapour pressure is more than the solvent's contradicts Raoult's law.",
        },
      ],
    },
  ],
};
