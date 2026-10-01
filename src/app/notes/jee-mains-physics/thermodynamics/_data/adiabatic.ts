import type { SubtopicNote } from "@/app/notes/_types";

export const ADIABATIC_TD_NOTE: SubtopicNote = {
  subtopicName: "Adiabatic Processes",
  title: "Adiabatic Processes",
  oneLineDefinition:
    "With no heat exchanged, a gas follows PV^γ = constant, and all the work it does comes out of its internal energy, so W = −ΔU.",
  whyItMatters:
    "Thirty PYQs, the largest page in the chapter, with four numerical answers and five from 2026. Fourteen use PV^γ = constant or its temperature forms to find a pressure, a temperature, a volume ratio or γ itself. Ten find the work, which depends only on the change in temperature. Six test the ideas: how steep an adiabat is next to an isotherm, why compression heats the gas, and why the molar heat capacity is zero.",
  concepts: [
    // C1 — the adiabatic relations
    {
      kind: "formula" as const,
      slug: "jpthermo-adiabatic-relations",
      name: "The adiabatic relations PV^γ, TV^(γ−1) and P^(1−γ)T^γ",
      intuition:
        "With no heat exchanged, a gas that is compressed must heat up and one that expands must cool. That temperature change makes the pressure change faster than on an isotherm: PV^γ = constant instead of PV = constant. PV = nRT then swaps any one variable for the temperature.",
      definition:
        "- \\(PV^{\\gamma} = \\text{const}\\), \\(TV^{\\gamma - 1} = \\text{const}\\), \\(P^{1 - \\gamma}T^{\\gamma} = \\text{const}\\), so \\(P \\propto T^{\\gamma/(\\gamma - 1)}\\).\n" +
        "- Density form: \\(\\rho \\propto 1/V\\), so \\(P \\propto \\rho^{\\gamma}\\) and \\(T \\propto \\rho^{\\gamma - 1}\\).\n" +
        "- \"Sudden\", \"insulated\", \"thermally non-conducting walls\" and \"constant entropy\" all mean adiabatic.\n" +
        "- Compressed to \\(V/k\\) from pressure P: isothermally the pressure becomes kP, adiabatically \\(k^{\\gamma}P\\).\n" +
        "- γ from data: match powers in \\(\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma} = \\dfrac{P_2}{P_1}\\), or in \\(\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma - 1} = \\dfrac{T_2}{T_1}\\). Then \\(\\gamma = 1 + \\dfrac{2}{f}\\) names the gas: 5/3 monoatomic, 7/5 rigid diatomic.\n" +
        "- A chain of processes: work out the pressure or temperature leg by leg, using PV = const on the isothermal legs and \\(PV^{\\gamma} = \\text{const}\\) on the adiabatic ones.\n" +
        "- Use absolute temperatures in \\(TV^{\\gamma - 1}\\).",
      formula: {
        label: "Adiabatic relations",
        latex: "PV^{\\gamma} = \\text{const} \\qquad TV^{\\gamma - 1} = \\text{const} \\qquad P^{1 - \\gamma}T^{\\gamma} = \\text{const}",
      },
      authoredExample: {
        prompt:
          "A gas with γ = 4/3 at 600 K and 3.2 atm expands adiabatically to 8 times its volume. Find its final temperature and pressure.",
        steps: [
          "\\(T_2 = T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma - 1} = 600 \\times 8^{-1/3} = 300\\ \\text{K}\\).",
          "\\(P_2 = P_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma} = 3.2 \\times 8^{-4/3} = \\dfrac{3.2}{16} = 0.2\\ \\text{atm}\\).",
          "Check PV/T: \\(\\dfrac{0.2 \\times 8}{300} = \\dfrac{3.2 \\times 1}{600}\\); both sides are 0.00533.",
        ],
        answer: "300 K; 0.2 atm",
      },
      selfCheckExample: {
        prompt:
          "In a reversible adiabatic expansion a gas's volume grows 27 times and its absolute temperature falls to one-ninth. Find γ. Is the gas monoatomic or diatomic?",
        steps: [
          "\\(TV^{\\gamma - 1} = \\text{const}\\): \\(27^{\\gamma - 1} = 9\\), so \\(3^{3(\\gamma - 1)} = 3^{2}\\).",
          "\\(\\gamma - 1 = \\tfrac{2}{3}\\), so \\(\\gamma = \\tfrac{5}{3}\\): a monoatomic gas.",
        ],
        answer: "γ = 5/3; monoatomic",
      },
      practiceSet: [
        { prompt: "In an adiabatic process P is proportional to \\(T^{5/2}\\). Find γ.", answer: "5/3" },
        { prompt: "A diatomic gas (γ = 1.4) at 300 K has its volume halved adiabatically. Final temperature? (\\(2^{0.4} = 1.32\\))", answer: "about 396 K" },
        { prompt: "A gas with γ = 3/2 is compressed to one-ninth of its volume, once isothermally and once adiabatically. Ratio of the final pressures, adiabatic to isothermal?", answer: "3" },
        { prompt: "The density of a gas with γ = 5/3 rises 27 times adiabatically. By what factor does its absolute temperature rise?", answer: "9" },
      ],
      pyqExampleId: "f4bd5aea-56c4-4959-90ba-59cd26a788a5", // 10 Apr 2023: V/8 isothermal vs adiabatic, ratio of final pressures
      traps: [
        {
          title: "A sudden change is adiabatic",
          body: "There is no time for heat to flow, so use PV^γ = constant. The isothermal answer from PV = constant is always among the options.",
        },
        {
          title: "Kelvin in TV^(γ−1)",
          body: "A temperature ratio needs absolute temperatures. A gas at 27 °C is at 300 K; doubling 27 °C is not doubling the temperature.",
        },
      ],
    },

    // C2 — adiabatic work
    {
      kind: "formula" as const,
      slug: "jpthermo-adiabatic-work",
      name: "Work done in an adiabatic process",
      intuition:
        "With Q = 0, the first law leaves W = −ΔU. All the work a gas does comes out of its internal energy, so for a given gas and amount the work depends only on how much the temperature changes: W = nCv(T₁ − T₂). Writing Cv = R/(γ − 1) gives the usual formula.",
      definition:
        "- \\(W = -\\Delta U = nC_V(T_1 - T_2) = \\dfrac{nR(T_1 - T_2)}{\\gamma - 1} = \\dfrac{P_1V_1 - P_2V_2}{\\gamma - 1}\\).\n" +
        "- Expansion: T falls, W > 0, ΔU < 0. Compression: T rises, W < 0 (work is done **on** the gas), ΔU > 0.\n" +
        "- \"Work done on the gas\" is −W.\n" +
        "- If only volumes or pressures are given, first find the missing end value from the adiabatic relations.\n" +
        "- \\(C_V = \\dfrac{f}{2}R\\), counting 2 for each vibrational mode.",
      formula: {
        label: "Adiabatic work (done by the gas)",
        latex: "W = \\frac{nR(T_1 - T_2)}{\\gamma - 1} = \\frac{P_1V_1 - P_2V_2}{\\gamma - 1} = -\\Delta U",
      },
      authoredExample: {
        prompt:
          "2 mol of a monoatomic ideal gas expands adiabatically and cools from 500 K to 350 K. Find the work done by the gas and ΔU. (\\(R = 8.3\\ \\text{J mol}^{-1}\\text{K}^{-1}\\))",
        steps: [
          "Monoatomic: \\(\\gamma - 1 = \\tfrac{2}{3}\\).",
          "\\(W = \\dfrac{2 \\times 8.3 \\times (500 - 350)}{2/3} = 2490 \\times 1.5 = 3735\\ \\text{J}\\).",
          "\\(\\Delta U = -W = -3735\\ \\text{J}\\). Check: \\(nC_V\\Delta T = 2 \\times 12.45 \\times (-150) = -3735\\ \\text{J}\\).",
        ],
        answer: "W = 3735 J; ΔU = −3735 J",
      },
      selfCheckExample: {
        prompt:
          "A gas with γ = 4/3 starts at \\(1.6 \\times 10^{5}\\ \\text{Pa}\\) and 2 L and expands adiabatically to 16 L. Find the work it does.",
        steps: [
          "\\(P_2 = 1.6 \\times 10^{5} \\times 8^{-4/3} = \\dfrac{1.6 \\times 10^{5}}{16} = 10^{4}\\ \\text{Pa}\\).",
          "\\(P_1V_1 = 1.6 \\times 10^{5} \\times 2 \\times 10^{-3} = 320\\ \\text{J}\\); \\(P_2V_2 = 10^{4} \\times 16 \\times 10^{-3} = 160\\ \\text{J}\\).",
          "\\(W = \\dfrac{320 - 160}{1/3} = 480\\ \\text{J}\\).",
        ],
        answer: "480 J",
      },
      practiceSet: [
        { prompt: "A gas does 600 J of work adiabatically. Find ΔU.", answer: "−600 J" },
        { prompt: "1 mol of a rigid diatomic gas is compressed adiabatically and warms by 20 K. Work done on it? (R = 8.3 J mol⁻¹ K⁻¹)", answer: "415 J" },
        { prompt: "\\(P_1V_1 = 500\\ \\text{J}\\), \\(P_2V_2 = 300\\ \\text{J}\\), γ = 1.4, adiabatic. Work done by the gas?", answer: "500 J" },
        { prompt: "3 mol of a monoatomic gas cools adiabatically by 40 K. Work done by the gas? (R = 8.3 J mol⁻¹ K⁻¹)", answer: "1494 J" },
      ],
      pyqExampleId: "c6eb1968-292d-417d-8f90-fa567badf1ef", // 2 Apr 2026 S1: 0.15 m³ at 8 bar expanded adiabatically to 1 bar
      traps: [
        {
          title: "The sign in a compression",
          body: "In an adiabatic compression the gas does negative work and warms up. \"Work done on the gas\" is the positive number; read which one the question asks for.",
        },
        {
          title: "Divide by γ − 1, not by γ",
          body: "W = nRΔT/(γ − 1). Dividing by γ gives a much smaller wrong value, and it is often one of the options.",
        },
      ],
    },

    // C3 — adiabatic ideas (reference)
    {
      kind: "reference" as const,
      slug: "jpthermo-adiabatic-ideas",
      name: "True and false statements about adiabatic processes",
      intuition:
        "Assertion and statement questions on adiabatic processes test a handful of ideas. Q = 0 is the definition; the internal energy does change; the curve is steeper than an isotherm; and the molar heat capacity is zero, because the temperature changes with no heat at all.",
      definition:
        "- Slopes at the same point: isothermal \\(\\dfrac{dP}{dV} = -\\dfrac{P}{V}\\); adiabatic \\(\\dfrac{dP}{dV} = -\\gamma\\dfrac{P}{V}\\).\n" +
        "- On an adiabat \\(\\dfrac{dP}{P} = -\\gamma\\dfrac{dV}{V}\\); on an isotherm \\(\\dfrac{dP}{P} = -\\dfrac{dV}{V}\\).\n" +
        "- So for the same rise in pressure, the volume falls more on an isotherm than on an adiabat.\n" +
        "- A free expansion into a vacuum has Q = 0 and W = 0, so ΔU = 0: it is adiabatic but irreversible, and PV^γ = const does not describe it.",
      table: {
        columns: ["Claim about an adiabatic process", "True or false", "Why"],
        rows: [
          { cells: ["No heat crosses the boundary", "True", "That is the definition: Q = 0"] },
          { cells: ["The internal energy stays constant", "False", "ΔU = −W, which is not zero unless no work is done"], noteAmber: "Q = 0 does not stop U changing: the work comes out of U." },
          { cells: ["An adiabatic compression raises the temperature", "True", "The work done on the gas goes into U, and U rises with T"] },
          { cells: ["Its P–V curve is steeper than the isotherm through the same point", "True", "Its slope is γ times the isothermal slope"] },
          { cells: ["The molar heat capacity is zero", "True", "C = Q/(nΔT) with Q = 0 while ΔT is not zero"] },
          { cells: ["The product TV stays constant", "False", "It is TV^(γ−1) that stays constant"] },
          { cells: ["A free expansion into a vacuum follows PV^γ = constant", "False", "It is irreversible; an ideal gas keeps its temperature"] },
        ],
        caption: "Every row follows from Q = 0 and Q = ΔU + W.",
      },
      selfCheckExample: {
        prompt:
          "An ideal gas is at \\(P = 2 \\times 10^{5}\\ \\text{Pa}\\) and \\(V = 4 \\times 10^{-3}\\ \\text{m}^{3}\\). Find the slope dP/dV of the isotherm and of the adiabat through this point, taking γ = 1.5.",
        steps: [
          "Isotherm: \\(-\\dfrac{P}{V} = -\\dfrac{2 \\times 10^{5}}{4 \\times 10^{-3}} = -5 \\times 10^{7}\\ \\text{Pa/m}^{3}\\).",
          "Adiabat: \\(-\\gamma\\dfrac{P}{V} = -1.5 \\times 5 \\times 10^{7} = -7.5 \\times 10^{7}\\ \\text{Pa/m}^{3}\\).",
        ],
        answer: "\\(-5 \\times 10^{7}\\) and \\(-7.5 \\times 10^{7}\\ \\text{Pa/m}^{3}\\)",
      },
      practiceSet: [
        { prompt: "A gas expands adiabatically. Does its temperature rise or fall?", answer: "It falls" },
        { prompt: "Ratio of the adiabatic slope to the isothermal slope at one point, for a monoatomic gas?", answer: "5/3" },
        { prompt: "A gas expands into a vacuum inside an insulated box. Work done and ΔU?", answer: "Both zero" },
        { prompt: "On an adiabat with γ = 1.5 the volume rises by 2%. Fractional change in pressure?", answer: "A 3% fall" },
      ],
      pyqExampleId: "a2b407cc-09a2-4b91-b776-14481a1891c3", // 29 Jan 2025: volume falls faster on an isotherm than on an adiabat
      traps: [
        {
          title: "Adiabatic is not isothermal",
          body: "Q = 0 does not make ΔT = 0. With no heat to make up for the work, the temperature must change in an adiabatic process.",
        },
        {
          title: "The steeper curve is the adiabat",
          body: "Through any point the adiabat is steeper than the isotherm by the factor γ. On a P–V diagram showing both, the steeper one is the adiabat.",
        },
      ],
    },
  ],
};
