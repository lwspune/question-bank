import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TH_FIRSTLAW_NOTE: SubtopicNote = {
  subtopicName: "First Law of Thermodynamics",
  title: "Internal Energy and the First Law",
  oneLineDefinition:
    "Internal energy, the first law ΔU = Q + W with its sign convention, what the law becomes for isothermal, adiabatic, isochoric and isobaric processes, and heat at constant volume and constant pressure.",
  whyItMatters:
    "14 questions. Eleven were set in board papers: state the first law with its equation (2015); find ΔU from the heat and work exchanged (2014, 2019 and 2026); say what happens to internal energy when the system does work (2017); name the process in which ΔU = 0 (2018); write the first law for isothermal, adiabatic and isochoric processes (2016, 2022, 2024 and 2026); and derive the relation between ΔH and ΔU (2026). The textbook adds an expansion in an insulated container and finding ΔH and ΔU together.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccth-first-law",
      name: "Internal energy and the first law",
      intuition:
        "Think of internal energy as the money in a bank account. Heat coming in and work done on the system are deposits; heat going out and work done by the system are withdrawals. The balance changes by exactly the deposits minus the withdrawals: energy is never created or lost, only moved.",
      definition:
        "- **Internal energy (U):** the energy stored in a substance, made up of the kinetic and potential energies of its particles. U is a state function and an extensive property; only its change \\(\\Delta U = U_2 - U_1\\) can be measured.\n" +
        "- **First law:** the total energy of a system and its surroundings remains constant when the system changes from an initial state to a final state. Equivalent statements: the energy of the universe remains constant; the total internal energy of an isolated system is constant; energy is neither created nor destroyed and can only be converted from one form to another.\n" +
        "- **Mathematical form:** if Q is the heat supplied to the system and W the work done on it, \\(\\Delta U = Q + W\\); for an infinitesimal change \\(dU = dQ + dW\\).\n" +
        "- Signs: heat absorbed \\(+Q\\), heat released \\(-Q\\); work done on the system \\(+W\\), work done by the system \\(-W\\).",
      formula: {
        label: "First law of thermodynamics",
        latex: "\\Delta U = Q + W",
        symbols: [
          { symbol: "\\(\\Delta U\\)", meaning: "increase in internal energy of the system" },
          { symbol: "\\(Q\\)", meaning: "heat supplied to the system" },
          { symbol: "\\(W\\)", meaning: "work done on the system" },
        ],
      },
      authoredExample: {
        prompt:
          "A system absorbs 1.2 kJ of heat while the surroundings do 0.8 kJ of work on it. Calculate the change in its internal energy.",
        steps: [
          "Given: heat absorbed, so \\(Q = +1.2\\ \\text{kJ}\\); work done on the system, so \\(W = +0.8\\ \\text{kJ}\\).",
          "Formula: \\(\\Delta U = Q + W\\).",
          "Substitution: \\(\\Delta U = (+1.2\\ \\text{kJ}) + (+0.8\\ \\text{kJ})\\).",
          "\\(\\Delta U = +2.0\\ \\text{kJ}\\): both are deposits, so the internal energy rises.",
        ],
        answer: "ΔU = +2.0 kJ",
      },
      selfCheckExample: {
        prompt: "A gas releases 300 J of heat while 700 J of work is done on it. Find ΔU.",
        steps: ["\\(Q = -300\\ \\text{J}\\), \\(W = +700\\ \\text{J}\\).", "\\(\\Delta U = -300 + 700 = +400\\ \\text{J}\\)."],
        answer: "+400 J",
      },
      practiceSet: [
        { prompt: "A system absorbs 50 kJ of heat and its internal energy rises by 30 kJ. Find W and say who does the work.", answer: "\\(W = 30 - 50 = -20\\ \\text{kJ}\\): the system does 20 kJ of work on the surroundings" },
        { prompt: "State the first law in terms of an isolated system.", answer: "The total internal energy of an isolated system is constant" },
        { prompt: "Is internal energy a state function or a path function?", answer: "A state function" },
      ],
      pyqExampleId: "94f74487-3b5b-448c-ad90-62222e33ea0e",
      traps: [
        {
          title: "Subtracting instead of adding signed terms",
          body: "Write the sign of Q and of W first, then add: \\(\\Delta U = Q + W\\). Subtracting the two sizes gives a wrong answer whenever energy leaves in both ways.",
        },
        {
          title: "A statement without the equation",
          body: "The board asks for the statement and its mathematical expression together. Write \\(\\Delta U = Q + W\\) and say what Q and W stand for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccth-first-law-processes",
      name: "The first law for each kind of process",
      intuition:
        "Each named process switches off one term of \\(\\Delta U = Q + W\\). Fix the temperature of an ideal gas and U cannot change. Insulate the system and Q is zero. Fix the volume and no PV work is done. What is left is the first law for that process.",
      definition:
        "- Start every answer from \\(\\Delta U = Q + W\\) and say which term is zero, and why.\n" +
        "- Isothermal: U of an ideal gas depends only on temperature, so \\(\\Delta U = 0\\) and \\(W = -Q\\): heat absorbed is all used to do work on the surroundings.\n" +
        "- Adiabatic: \\(Q = 0\\), so \\(\\Delta U = W\\). Work done by the system is paid for from its internal energy, which falls.\n" +
        "- Isochoric: \\(\\Delta V = 0\\), so \\(W = -P_{ext}\\Delta V = 0\\) and \\(\\Delta U = Q_V\\).\n" +
        "- Isobaric: \\(Q_p = \\Delta U + P_{ext}\\Delta V\\), the heat at constant pressure, given the symbol \\(\\Delta H\\).\n" +
        "- Q is a path function, but \\(Q_V\\) and \\(Q_p\\) are state functions.",
      table: {
        columns: ["Process", "Condition", "First law becomes"],
        rows: [
          {
            cells: ["Isothermal (ideal gas)", "\\(\\Delta T = 0\\), so \\(\\Delta U = 0\\)", "\\(0 = Q + W\\), so \\(W = -Q\\)"],
            pyqExampleId: "a555fd53-8150-429d-a67d-abc2235eff24",
            noteAmber: "Board 2022 and 2024 asked for the isothermal form.",
          },
          {
            cells: ["Adiabatic", "\\(Q = 0\\)", "\\(\\Delta U = W\\)"],
            pyqExampleId: "4f116a9b-b6cc-44a7-a532-7ae861ac9f8e",
            noteAmber: "Board 2016, 2022 and 2026 asked for the adiabatic form.",
          },
          {
            cells: ["Isochoric", "\\(\\Delta V = 0\\), so \\(W = 0\\)", "\\(\\Delta U = Q_V\\)"],
            pyqExampleId: "d213bcd2-78e1-4a22-804d-79377e1d7ea0",
            noteAmber: "Board 2016, 2024 and 2026 asked for the isochoric form.",
          },
          { cells: ["Isobaric", "\\(\\Delta P = 0\\)", "\\(Q_p = \\Delta U + P_{ext}\\Delta V = \\Delta H\\)"] },
        ],
      },
      practiceSet: [
        { prompt: "In which process is the heat absorbed equal to the change in internal energy?", answer: "Isochoric: \\(\\Delta U = Q_V\\)" },
        { prompt: "A gas expands adiabatically and does 150 J of work. Find ΔU.", answer: "\\(Q = 0\\), \\(W = -150\\ \\text{J}\\), so \\(\\Delta U = -150\\ \\text{J}\\)" },
        { prompt: "An ideal gas absorbs 400 J of heat at constant temperature. Find W.", answer: "\\(\\Delta U = 0\\), so \\(W = -400\\ \\text{J}\\): it does 400 J of work" },
      ],
      pyqExampleId: "d213bcd2-78e1-4a22-804d-79377e1d7ea0",
      traps: [
        {
          title: "Saying ΔU = 0 for an adiabatic process",
          body: "ΔU = 0 belongs to the isothermal process of an ideal gas. In an adiabatic process Q = 0, and ΔU equals the work, which is not zero.",
        },
        {
          title: "Writing only the final equation",
          body: "Two marks need the reason as well: write the condition (\\(Q = 0\\), \\(\\Delta V = 0\\) or \\(\\Delta T = 0\\)), substitute in \\(\\Delta U = Q + W\\), then give the result.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-heat-constant-pressure",
      name: "Heat at constant pressure and the ΔH, ΔU relation",
      intuition:
        "Most reactions run in open flasks, at the constant pressure of the air. There the heat exchanged pays for two things: the change in internal energy and the PV work of pushing the air back. That heat gets its own name, the enthalpy change ΔH. If gases are formed, ΔH is bigger than ΔU by the work of making room for them.",
      definition:
        "- At constant pressure: \\(Q_p = \\Delta U + P_{ext}\\Delta V = \\Delta H\\). At constant volume: \\(Q_V = \\Delta U\\).\n" +
        "Derivation of \\(\\Delta H = \\Delta U + \\Delta n_g RT\\) (the full page is Enthalpy):\n" +
        "- \\(H = U + PV\\), so at constant pressure \\(\\Delta H = \\Delta U + P\\Delta V = \\Delta U + PV_2 - PV_1\\)\n" +
        "- \\(V_1\\) = volume of gaseous reactants (\\(n_1\\) mol), \\(V_2\\) = volume of gaseous products (\\(n_2\\) mol), ideal behaviour: \\(PV_1 = n_1RT\\), \\(PV_2 = n_2RT\\)\n" +
        "- Substitute: \\(\\Delta H = \\Delta U + n_2RT - n_1RT = \\Delta U + (n_2 - n_1)RT\\)\n" +
        "- \\(\\Delta H = \\Delta U + \\Delta n_g RT\\), with \\(\\Delta n_g\\) = moles of gaseous products minus moles of gaseous reactants.",
      formula: {
        label: "Heat at constant pressure",
        latex: "Q_p = \\Delta U + P_{ext}\\Delta V = \\Delta H, \\qquad \\Delta H = \\Delta U + \\Delta n_g RT",
      },
      authoredExample: {
        prompt:
          "In a reaction carried out at constant pressure, the system releases 5 kJ of heat and 3 kJ of work is done on it. Find ΔH and ΔU.",
        steps: [
          "Given: \\(Q_p = -5\\ \\text{kJ}\\) (heat released), \\(W = +3\\ \\text{kJ}\\) (work done on the system).",
          "At constant pressure \\(\\Delta H = Q_p = -5\\ \\text{kJ}\\).",
          "First law: \\(\\Delta U = Q + W = -5 + 3 = -2\\ \\text{kJ}\\).",
        ],
        answer: "ΔH = −5 kJ; ΔU = −2 kJ",
      },
      selfCheckExample: {
        prompt: "For N₂(g) + 3H₂(g) → 2NH₃(g), is ΔH greater than, equal to or less than ΔU? Give the reason.",
        steps: ["\\(\\Delta n_g = 2 - 4 = -2\\).", "\\(\\Delta H = \\Delta U - 2RT\\), so \\(\\Delta H < \\Delta U\\)."],
        answer: "ΔH is less than ΔU, because the number of moles of gas decreases",
      },
      practiceSet: [
        { prompt: "Which is measured directly by the heat exchanged in a rigid closed vessel, ΔU or ΔH?", answer: "ΔU, since \\(Q_V = \\Delta U\\)" },
        { prompt: "For a reaction with \\(\\Delta n_g = 0\\), how are ΔH and ΔU related?", answer: "They are equal" },
      ],
      pyqExampleId: "242ffdba-34b0-4ebe-b41d-4c8b476b4c7d",
      traps: [
        {
          title: "Counting solids and liquids in Δn",
          body: "Only gases are counted in \\(\\Delta n_g\\); the volume change of solids and liquids is negligible.",
        },
        {
          title: "Skipping the ideal gas step",
          body: "The derivation earns its marks at \\(PV_1 = n_1RT\\) and \\(PV_2 = n_2RT\\). Writing the final relation alone is not a derivation.",
        },
      ],
    },
  ],
};
