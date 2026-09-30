import type { SubtopicNote } from "@/app/notes/_types";

export const PHASE_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Enthalpies of Phase Change, Solution and Neutralisation",
  title: "Enthalpies of Phase Change, Solution and Neutralisation",
  oneLineDefinition:
    "Enthalpy changes that make no new compound: melting, boiling and sublimation, dissolving and diluting, hydrating a salt, and neutralising H⁺ with OH⁻.",
  whyItMatters:
    "Sixteen PYQs, eleven of them numerical, none yet from 2026. Nine deal with phase changes, heating paths, solution, dilution and hydration; seven with the heat of neutralisation and the temperature rise it causes, where the limiting reagent decides the answer.",
  concepts: [
    // C1 — phase change, solution, dilution, hydration
    {
      kind: "formula" as const,
      slug: "jcthermo-phase-solution",
      name: "Enthalpies of phase change, solution, dilution and hydration",
      intuition:
        "At its transition temperature a substance takes in heat without getting hotter. The energy loosens the attractions between molecules (potential energy) instead of speeding them up (kinetic energy). Enthalpy is a state function, so any path can be split into warming steps and phase steps and added up.",
      definition:
        "- \\(\\Delta_{\\mathrm{sub}}H = \\Delta_{\\mathrm{fus}}H + \\Delta_{\\mathrm{vap}}H\\), all at the same temperature.\n" +
        "- Heating or cooling path: add \\(nC_p\\Delta T\\) for each phase and \\(\\pm\\Delta H\\) for each change of phase. Freezing and condensing take the negative sign.\n" +
        "- Enthalpy is extensive: heat = moles × molar enthalpy.\n" +
        "- The heat of solution depends on how much solvent is used. Heat of dilution = \\(\\Delta H\\)(more dilute) − \\(\\Delta H\\)(more concentrated).\n" +
        "- Hydration of an anhydrous salt: \\(\\Delta_{\\mathrm{hyd}}H = \\Delta_{\\mathrm{sol}}H(\\text{anhydrous}) - \\Delta_{\\mathrm{sol}}H(\\text{hydrate})\\).\n" +
        "- Endothermic: breaking bonds, melting, vaporising, subliming, dissolving \\(\\mathrm{NH_4Cl}\\). Exothermic: freezing, condensing, burning, dissolving a gas such as HCl.",
      formula: {
        label: "Hess cycles for phase changes and hydration",
        latex:
          "\\Delta_{\\mathrm{sub}}H = \\Delta_{\\mathrm{fus}}H + \\Delta_{\\mathrm{vap}}H,\\qquad \\Delta_{\\mathrm{hyd}}H = \\Delta_{\\mathrm{sol}}H_{\\mathrm{anhydrous}} - \\Delta_{\\mathrm{sol}}H_{\\mathrm{hydrate}}",
      },
      authoredExample: {
        prompt:
          "Find the enthalpy change to turn 1 mol of ice at 0 °C into steam at 100 °C. \\(\\Delta_{\\mathrm{fus}}H = 6.0\\) kJ mol⁻¹, \\(C_p\\)(liquid water) = 75 J K⁻¹ mol⁻¹, \\(\\Delta_{\\mathrm{vap}}H = 40.7\\) kJ mol⁻¹.",
        steps: [
          "Melt at 0 °C: +6.0 kJ.",
          "Warm the water by 100 K: \\(75 \\times 100 = 7500\\) J = +7.5 kJ.",
          "Vaporise at 100 °C: +40.7 kJ. Total \\(6.0 + 7.5 + 40.7 = 54.2\\) kJ.",
        ],
        answer: "\\(+54.2\\) kJ.",
      },
      selfCheckExample: {
        prompt:
          "The heat of solution of anhydrous \\(\\mathrm{Na_2CO_3}\\) is −25 kJ mol⁻¹, and of \\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\) is +67 kJ mol⁻¹. Find the heat of hydration of \\(\\mathrm{Na_2CO_3}\\) to the decahydrate.",
        steps: [
          "Route 1: anhydrous salt straight into solution, −25 kJ.",
          "Route 2: hydrate it (\\(\\Delta_{\\mathrm{hyd}}H\\)), then dissolve the hydrate (+67 kJ). Both routes end at the same solution.",
          "\\(\\Delta_{\\mathrm{hyd}}H + 67 = -25\\), so \\(\\Delta_{\\mathrm{hyd}}H = -92\\) kJ mol⁻¹.",
        ],
        answer: "\\(-92\\) kJ mol⁻¹.",
      },
      practiceSet: [
        { prompt: "\\(\\Delta_{\\mathrm{fus}}H = 5\\) kJ mol⁻¹ and \\(\\Delta_{\\mathrm{vap}}H = 35\\) kJ mol⁻¹. Find \\(\\Delta_{\\mathrm{sub}}H\\).", answer: "\\(40\\) kJ mol⁻¹" },
        { prompt: "\\(\\Delta_{\\mathrm{vap}}H\\) of water is 40 kJ mol⁻¹. How much heat vaporises 90 g of water?", answer: "\\(200\\) kJ" },
        {
          prompt: "HCl dissolved in 5 mol of water gives −63 kJ mol⁻¹; in 25 mol of water, −71 kJ mol⁻¹. Find the heat of dilution between them.",
          answer: "\\(-8\\) kJ mol⁻¹",
        },
        { prompt: "While ice melts at 0 °C, which rises: the kinetic or the potential energy of the molecules?", answer: "The potential energy" },
      ],
      pyqExampleId: "652f82b9-72ff-4b75-ae9f-c81e167369d6", // 9 Apr 2024 — heat of hydration of CuSO4 from two heats of solution
      traps: [
        {
          title: "The sign of a heat of dilution",
          body:
            "Heat of dilution is the more dilute value minus the more concentrated one. Going from −60 to −65 kJ mol⁻¹ gives −5 kJ mol⁻¹, not +5.",
        },
        {
          title: "Kilojoules beside joules in a heating path",
          body:
            "\\(\\Delta_{\\mathrm{fus}}H\\) is quoted in kJ mol⁻¹ but \\(C_p\\) in J K⁻¹ mol⁻¹. Convert one of them before adding, or the latent heat comes out a thousand times too small.",
        },
      ],
    },

    // C2 — neutralisation
    {
      kind: "formula" as const,
      slug: "jcthermo-neutralisation",
      name: "Enthalpy of neutralisation and the temperature rise",
      intuition:
        "A strong acid and a strong base are fully ionised, so the only reaction on mixing is H⁺ + OH⁻ → H₂O. That gives the same heat, about 57 kJ, for every mole of water formed. Count the water, not the acid: whichever of H⁺ or OH⁻ runs out first sets it.",
      definition:
        "- \\(\\mathrm{H^+(aq) + OH^-(aq) \\to H_2O(l)}\\), \\(\\Delta H = -57.1\\) kJ mol⁻¹ for a strong acid with a strong base.\n" +
        "- Moles of water = the smaller of mol \\(\\mathrm{H^+}\\) and mol \\(\\mathrm{OH^-}\\). \\(\\mathrm{H_2SO_4}\\) gives two \\(\\mathrm{H^+}\\) per mole.\n" +
        "- Heat \\(q = n_{\\mathrm{water}} \\times 57.1\\) kJ; temperature rise \\(\\Delta T = \\frac{q}{mc}\\), with \\(m\\) the TOTAL mass of the mixture (1 g per mL).\n" +
        "- A weak acid or weak base releases less, because part of the heat is spent ionising it. Ionisation enthalpy = 57.1 − |\\(\\Delta H\\)(weak)| kJ mol⁻¹.",
      formula: {
        label: "Temperature rise on neutralisation",
        latex: "\\Delta T = \\frac{n_{\\mathrm{H_2O}}\\,|\\Delta_{\\mathrm{neut}}H|}{m\\,c}",
      },
      authoredExample: {
        prompt:
          "150 mL of 0.4 M HCl is mixed with 100 mL of 0.25 M NaOH. Find the temperature rise. (\\(\\Delta_{\\mathrm{neut}}H = -57.3\\) kJ mol⁻¹, \\(c = 4.2\\) J g⁻¹ K⁻¹, density 1 g mL⁻¹)",
        steps: [
          "\\(\\mathrm{H^+}\\): \\(150 \\times 0.4 = 60\\) mmol. \\(\\mathrm{OH^-}\\): \\(100 \\times 0.25 = 25\\) mmol. The base runs out: 0.025 mol of water.",
          "\\(q = 0.025 \\times 57300 = 1432.5\\) J.",
          "Total mass 250 g: \\(\\Delta T = \\frac{1432.5}{250 \\times 4.2} = \\frac{1432.5}{1050} = 1.36\\) K.",
        ],
        answer: "\\(\\approx 1.36\\) °C.",
      },
      selfCheckExample: {
        prompt:
          "HCl + NaOH gives \\(\\Delta H = -57.3\\) kJ mol⁻¹; HCN + NaOH gives \\(\\Delta H = -12.1\\) kJ mol⁻¹. Find the enthalpy of ionisation of HCN.",
        steps: [
          "The strong-acid value is the heat of \\(\\mathrm{H^+ + OH^-}\\) alone.",
          "With HCN, part of that heat first ionises the acid: \\(57.3 - 12.1 = 45.2\\) kJ mol⁻¹.",
        ],
        answer: "\\(+45.2\\) kJ mol⁻¹.",
      },
      practiceSet: [
        {
          prompt: "0.1 mol of \\(\\mathrm{H_2SO_4}\\) is fully neutralised by NaOH (\\(\\Delta H = -57.1\\) kJ per mol of water). How much heat is released?",
          answer: "\\(11.42\\) kJ",
        },
        { prompt: "50 mL of 1 M HCl is mixed with 30 mL of 1 M NaOH. How many moles of water form?", answer: "\\(0.030\\) mol" },
        { prompt: "Why is \\(\\mathrm{CH_3COOH}\\) + NaOH less exothermic than HCl + NaOH?", answer: "Part of the heat is used to ionise the weak acid" },
        { prompt: "836 J is released into 100 g of water (\\(c = 4.18\\) J g⁻¹ K⁻¹). Find \\(\\Delta T\\).", answer: "\\(2.0\\) K" },
      ],
      pyqExampleId: "7a218397-3fd2-45c4-bfd3-b0746216aeca", // 2021 Paper 20 — 200 mL 0.2 M HCl + 300 mL 0.1 M NaOH, temperature rise
      traps: [
        {
          title: "Only one solution's volume",
          body:
            "The heat warms the whole mixture. 100 mL of acid plus 100 mL of base is 200 g of solution, not 100 g.",
        },
        {
          title: "More acid is not more heat",
          body:
            "Heat follows the limiting reagent. 50 mL of acid with 20 mL of base neutralises less than 30 mL with 30 mL, and it warms a larger volume, so its temperature rise is smaller.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Hess's law — the same cycles with reaction enthalpies",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-hess",
    },
  ],
};
