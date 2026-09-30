import type { SubtopicNote } from "@/app/notes/_types";

export const CALORIMETRY_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Heat Capacity, Calorimetry and Enthalpy vs Internal Energy",
  title: "Heat Capacity, Calorimetry and Enthalpy vs Internal Energy",
  oneLineDefinition:
    "How much heat a temperature rise takes (q = nCΔT), why a bomb calorimeter measures ΔU, and how ΔH follows from ΔU through the change in moles of gas.",
  whyItMatters:
    "Nineteen PYQs, sixteen of them numerical — the most calculation-heavy page in the chapter — and three from 2026. Five use heat capacities, seven read a bomb calorimeter, and seven convert between ΔH and ΔU for a reaction or a vaporisation.",
  concepts: [
    // C1 — heat capacity
    {
      kind: "formula" as const,
      slug: "jcthermo-heat-capacity",
      name: "Heat capacity: Cp, Cv and q = nCΔT",
      intuition:
        "Heat capacity says how much heat raises the temperature by one kelvin. At constant volume all the heat goes into internal energy. At constant pressure some of it pushes the surroundings back, so more heat is needed for the same rise: Cp is larger than Cv by R per mole.",
      definition:
        "- \\(q = C\\Delta T = nC_m\\Delta T = mc\\Delta T\\).\n" +
        "- Constant volume: \\(q_V = nC_v\\Delta T = \\Delta U\\). Constant pressure: \\(q_p = nC_p\\Delta T = \\Delta H\\).\n" +
        "- Ideal gas: \\(C_p - C_v = R\\) per mole, so \\(C_p > C_v\\) always.\n" +
        "- Monatomic ideal gas: \\(C_v = \\tfrac{3}{2}R\\), \\(C_p = \\tfrac{5}{2}R\\). For an ideal gas \\(\\Delta U = nC_v\\Delta T\\) in ANY process.\n" +
        "- Molar heat capacities near 298 K (J K⁻¹ mol⁻¹): He(g) about 21 (\\(C_p\\)), Cu(s) about 25 (roughly \\(3R\\)), \\(\\mathrm{Br_2}(l)\\) about 76. A liquid of molecules has the most ways to store energy.\n" +
        "- Electrical heating: \\(q = Pt\\) (watts × seconds).",
      formula: {
        label: "Heat and heat capacity",
        latex: "q = nC_m\\Delta T,\\qquad C_p - C_v = R",
      },
      authoredExample: {
        prompt:
          "2 mol of helium is heated at constant pressure from 320 K to 370 K. Find \\(q\\), \\(\\Delta U\\) and \\(w\\). (\\(R = 8.314\\) J K⁻¹ mol⁻¹)",
        steps: [
          "Helium is monatomic: \\(C_p = \\tfrac{5}{2}R = 20.785\\) and \\(C_v = \\tfrac{3}{2}R = 12.471\\) J K⁻¹ mol⁻¹.",
          "\\(q_p = 2 \\times 20.785 \\times 50 = 2079\\) J. \\(\\Delta U = 2 \\times 12.471 \\times 50 = 1247\\) J.",
          "\\(w = \\Delta U - q = 1247 - 2079 = -831\\) J, which is \\(-nR\\Delta T\\): the gas expands as it warms.",
        ],
        answer: "\\(q \\approx 2079\\) J, \\(\\Delta U \\approx 1247\\) J, \\(w \\approx -831\\) J.",
      },
      selfCheckExample: {
        prompt:
          "A 50 W heater runs for 90 s inside a rigid, insulated container of gas, and the temperature rises by 10 K. Find the heat capacity of the gas.",
        steps: [
          "\\(q = Pt = 50 \\times 90 = 4500\\) J. No heat escapes and no expansion work is done.",
          "\\(C = \\frac{q}{\\Delta T} = \\frac{4500}{10} = 450\\) J K⁻¹.",
        ],
        answer: "\\(450\\) J K⁻¹.",
      },
      practiceSet: [
        { prompt: "An ideal gas has \\(C_p = 29.1\\) J K⁻¹ mol⁻¹. Find \\(C_v\\). (\\(R = 8.3\\))", answer: "\\(20.8\\) J K⁻¹ mol⁻¹" },
        {
          prompt: "3 mol of a monatomic ideal gas warms by 20 K. Find \\(\\Delta U\\). (\\(R = 8.3\\))",
          answer: "\\(747\\) J",
        },
        { prompt: "For an ideal gas, which is larger: \\(C_p\\) or \\(C_v\\)?", answer: "\\(C_p\\), by \\(R\\) per mole" },
        { prompt: "Order the molar heat capacities at 298 K: He(g), Cu(s), \\(\\mathrm{Br_2}(l)\\).", answer: "\\(\\mathrm{Br_2}(l) > \\mathrm{Cu}(s) > \\mathrm{He}(g)\\)" },
      ],
      pyqExampleId: "4d1a6270-c83c-4d8a-89ad-30e817698a37", // 29 Jan 2025 — 500 J to 0.5 mol Ar at 1 atm
      traps: [
        {
          title: "Cv for heat added at constant pressure",
          body:
            "Heat supplied at constant pressure is \\(nC_p\\Delta T\\). Dividing it by \\(nC_v\\) overstates the temperature rise. And \\(\\Delta U\\) is less than the heat supplied, because part of the heat did expansion work.",
        },
      ],
    },

    // C2 — bomb calorimeter
    {
      kind: "formula" as const,
      slug: "jcthermo-bomb-calorimeter",
      name: "Bomb calorimeter: heat at constant volume",
      intuition:
        "A bomb calorimeter is a sealed steel vessel, so the volume cannot change and no expansion work is done. The heat it soaks up is the ΔU of the reaction with its sign reversed. An open vessel works at constant pressure and measures ΔH instead.",
      definition:
        "- Heat taken up by the calorimeter: \\(q = C_{\\mathrm{cal}}\\Delta T\\).\n" +
        "- Per mole of fuel: \\(\\Delta_c U = -\\frac{C_{\\mathrm{cal}}\\Delta T}{n}\\), with \\(n = \\frac{m}{M}\\).\n" +
        "- Then \\(\\Delta_c H = \\Delta_c U + \\Delta n_g RT\\).\n" +
        "- An open vessel (constant pressure) measures \\(\\Delta H\\) directly.\n" +
        "- Heat released \\(= n \\times |\\Delta_c H|\\), so a known heat gives the mass burnt.",
      formula: {
        label: "Bomb calorimeter",
        latex: "\\Delta_c U = -\\frac{C_{\\mathrm{cal}}\\,\\Delta T}{n}",
      },
      authoredExample: {
        prompt:
          "1.28 g of naphthalene, \\(\\mathrm{C_{10}H_8}\\) (M = 128), burns in a bomb calorimeter of heat capacity 10.0 kJ K⁻¹, and the temperature rises by 5.15 K. Find \\(\\Delta_c U\\) and \\(\\Delta_c H\\) at 298 K. (\\(R = 8.314\\) J K⁻¹ mol⁻¹)",
        steps: [
          "\\(n = 1.28/128 = 0.0100\\) mol. Heat \\(= 10.0 \\times 5.15 = 51.5\\) kJ.",
          "\\(\\Delta_c U = -51.5/0.0100 = -5150\\) kJ mol⁻¹.",
          "\\(\\mathrm{C_{10}H_8(s) + 12O_2(g) \\to 10CO_2(g) + 4H_2O(l)}\\): \\(\\Delta n_g = 10 - 12 = -2\\).",
          "\\(\\Delta_c H = -5150 + (-2)(8.314\\times10^{-3})(298) = -5150 - 4.96 = -5155\\) kJ mol⁻¹.",
        ],
        answer: "\\(\\Delta_c U = -5150\\) kJ mol⁻¹, \\(\\Delta_c H \\approx -5155\\) kJ mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "0.60 g of graphite burns in a bomb calorimeter of heat capacity 8.00 kJ K⁻¹, raising its temperature by 2.46 K. Find \\(\\Delta_c H\\) of graphite.",
        steps: [
          "\\(n = 0.60/12 = 0.050\\) mol. Heat \\(= 8.00 \\times 2.46 = 19.68\\) kJ.",
          "\\(\\Delta_c U = -19.68/0.050 = -393.6\\) kJ mol⁻¹.",
          "\\(\\mathrm{C(s) + O_2(g) \\to CO_2(g)}\\): \\(\\Delta n_g = 1 - 1 = 0\\), so \\(\\Delta_c H = \\Delta_c U\\).",
        ],
        answer: "\\(-393.6\\) kJ mol⁻¹.",
      },
      practiceSet: [
        { prompt: "A calorimeter of heat capacity 4 kJ K⁻¹ warms by 2.5 K. How much heat did the reaction release?", answer: "\\(10\\) kJ" },
        { prompt: "Which quantity does a bomb calorimeter measure directly: \\(\\Delta U\\) or \\(\\Delta H\\)?", answer: "\\(\\Delta U\\) (constant volume)" },
        { prompt: "0.02 mol of a fuel releases 30 kJ in a bomb calorimeter. Find \\(\\Delta_c U\\).", answer: "\\(-1500\\) kJ mol⁻¹" },
        {
          prompt: "A fuel has \\(\\Delta_c H = -900\\) kJ mol⁻¹ and M = 16 g mol⁻¹. What mass must burn to release 45 kJ?",
          answer: "\\(0.8\\) g",
        },
      ],
      pyqExampleId: "7c14c70a-9fdf-4cbb-8026-5bc20d98bdf2", // 26 Jun 2022 — methanol, bomb value to enthalpy of combustion
      traps: [
        {
          title: "Bomb heat is ΔU, not ΔH",
          body:
            "When a question quotes heat measured in a bomb calorimeter and asks for an enthalpy, it needs the \\(\\Delta n_g RT\\) step. Skipping it is a planted option, a few kJ away from the answer.",
        },
        {
          title: "Positive heat, negative ΔU",
          body:
            "The calorimeter warms because the reaction gives out heat. \\(C\\Delta T\\) is positive, but \\(\\Delta_c U\\) of the reaction is negative.",
        },
      ],
    },

    // C3 — ΔH = ΔU + Δn_g RT
    {
      kind: "formula" as const,
      slug: "jcthermo-dngrt",
      name: "ΔH and ΔU through the change in gas moles",
      intuition:
        "ΔH and ΔU differ by the work of making room for gas. One mole of gas at constant pressure needs RT of work to push the surroundings back, so each extra mole of gas made adds RT. Solids and liquids take up almost no volume, so they do not count.",
      definition:
        "- \\(\\Delta H = \\Delta U + \\Delta n_g RT\\), with \\(\\Delta n_g\\) = moles of gaseous products − moles of gaseous reactants.\n" +
        "- Liquid water among the products does not count; water vapour does.\n" +
        "- \\(\\Delta n_g = 0 \\Rightarrow \\Delta H = \\Delta U\\), as for \\(\\mathrm{C(s) + O_2(g) \\to CO_2(g)}\\).\n" +
        "- With \\(\\Delta H\\) in kJ, use \\(R = 8.314\\times10^{-3}\\) kJ K⁻¹ mol⁻¹.\n" +
        "- Vaporising 1 mol of a liquid: \\(\\Delta n_g = +1\\), so \\(\\Delta U = \\Delta_{\\mathrm{vap}}H - RT\\).\n" +
        "- For a gas heated or cooled at constant pressure: \\(\\Delta U = \\Delta H - p\\Delta V\\).",
      formula: {
        label: "Enthalpy and internal energy",
        latex: "\\Delta H = \\Delta U + \\Delta n_g RT",
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{N_2(g) + 3H_2(g) \\to 2NH_3(g)}\\), \\(\\Delta H = -92.4\\) kJ at 298 K. Find \\(\\Delta U\\). (\\(R = 8.314\\) J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\Delta n_g = 2 - 4 = -2\\).",
          "\\(\\Delta n_g RT = -2 \\times 8.314\\times10^{-3} \\times 298 = -4.96\\) kJ.",
          "\\(\\Delta U = \\Delta H - \\Delta n_g RT = -92.4 + 4.96 = -87.4\\) kJ.",
        ],
        answer: "\\(\\Delta U \\approx -87.4\\) kJ.",
      },
      selfCheckExample: {
        prompt:
          "The enthalpy of vaporisation of benzene is 30.8 kJ mol⁻¹ at its boiling point, 353 K. Find the change in internal energy on vaporisation. (\\(R = 8.314\\) J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\mathrm{C_6H_6(l) \\to C_6H_6(g)}\\): \\(\\Delta n_g = +1\\).",
          "\\(RT = 8.314 \\times 353 = 2935\\) J = 2.94 kJ.",
          "\\(\\Delta U = 30.8 - 2.94 = 27.9\\) kJ mol⁻¹.",
        ],
        answer: "\\(\\approx 27.9\\) kJ mol⁻¹.",
      },
      practiceSet: [
        { prompt: "Find \\(\\Delta n_g\\) for \\(\\mathrm{CH_4(g) + 2O_2(g) \\to CO_2(g) + 2H_2O(l)}\\).", answer: "\\(-2\\)" },
        { prompt: "Find \\(\\Delta n_g\\) for \\(\\mathrm{Mg(s) + \\tfrac{1}{2}O_2(g) \\to MgO(s)}\\).", answer: "\\(-\\tfrac{1}{2}\\)" },
        { prompt: "When is \\(\\Delta H = \\Delta U\\) for a reaction?", answer: "When \\(\\Delta n_g = 0\\)" },
        {
          prompt: "\\(\\Delta U = -100\\) kJ, \\(\\Delta n_g = +1\\) and T = 300 K. Find \\(\\Delta H\\). (\\(R = 8.3\\))",
          answer: "\\(-97.5\\) kJ",
        },
      ],
      pyqExampleId: "690107e5-e44f-4312-b6f0-381f52c1bcd8", // 8 Apr 2024 — vaporisation of water, internal energy change
      traps: [
        {
          title: "Counting liquid water as a gas",
          body:
            "In a combustion that makes \\(\\mathrm{H_2O(l)}\\), water is not a gas. For \\(\\mathrm{C_2H_6(g) + \\tfrac{7}{2}O_2(g) \\to 2CO_2(g) + 3H_2O(l)}\\), \\(\\Delta n_g = 2 - 4.5 = -2.5\\), not \\(+0.5\\).",
        },
        {
          title: "R in joules beside ΔH in kilojoules",
          body:
            "\\(8.314 \\times 300 = 2494\\) J must be written as 2.494 kJ before it is added to a \\(\\Delta H\\) in kJ. Otherwise the correction is a thousand times too big.",
        },
      ],
    },
  ],
  related: [
    {
      label: "The first law — why q at constant volume is ΔU",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-first-law",
    },
  ],
};
