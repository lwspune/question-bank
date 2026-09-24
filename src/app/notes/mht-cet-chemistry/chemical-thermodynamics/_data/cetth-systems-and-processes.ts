import type { SubtopicNote } from "@/app/notes/_types";

export const SYSTEMS_AND_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Thermodynamic Systems, Properties and Processes",
  title: "Thermodynamic Systems, Properties and Processes",
  oneLineDefinition:
    "A system is the part of the universe under study; its properties are intensive (independent of amount) or extensive, and state functions (fixed by the state) or path functions (heat, work); a process is named by what it holds constant.",
  whyItMatters:
    "12 PYQs, all EASY — pure recall. The paper asks which property is intensive or extensive, which is a path function, what an isolated system is, which process keeps volume constant, and what is true or false of an isothermal or reversible process. " +
    "Two short tables and five process definitions cover it.",
  concepts: [
    // 1 — systems and properties
    {
      kind: "reference" as const,
      slug: "cetth-systems-and-properties",
      name: "Systems, Intensive Versus Extensive, State Versus Path",
      intuition:
        "Halve the sample: a property that halves with it (mass, volume, U, H, S, heat capacity) is extensive; one that stays the same (temperature, pressure, density, boiling point, specific heat, surface tension) is intensive. A state function depends only on where the system is, not how it got there; heat and work depend on the route.",
      definition:
        "- **Open** system exchanges matter and energy (beaker); **closed** exchanges energy only (sealed flask); **isolated** exchanges neither (thermos flask).\n" +
        "- **Intensive**: temperature, pressure, density, boiling point, refractive index, viscosity, surface tension, specific heat, molar properties.\n" +
        "- **Extensive**: mass, volume, number of moles, internal energy, enthalpy, entropy, Gibbs energy, heat capacity.\n" +
        "- **State functions**: U, H, S, G, T, P, V. **Path functions**: heat q and work w.\n" +
        "- Temperature is the exam's example of a property that is BOTH intensive and a state function.",
      table: {
        columns: ["Property", "Intensive or extensive", "State or path"],
        rows: [
          { cells: ["Temperature, pressure", "Intensive", "State"] },
          { cells: ["Boiling point, density, surface tension, viscosity, specific heat", "Intensive", "State"], noteAmber: "SPECIFIC heat (per gram) is intensive; HEAT CAPACITY (of the sample) is extensive." },
          { cells: ["Mass, volume, number of moles", "Extensive", "State"] },
          { cells: ["Internal energy U, enthalpy H, entropy S", "Extensive", "State"], noteAmber: "Internal energy is the planted 'not intensive' option." },
          { cells: ["Heat capacity", "Extensive", "—"] },
          { cells: ["Heat q, work w", "—", "Path"], noteAmber: "Work is the only path function among U, w, S, H." },
        ],
        caption: "Divide the sample in two and ask what changes.",
      },
      selfCheckExample: {
        prompt: "Sort into intensive and extensive: heat capacity, boiling point, internal energy, pressure. Which of them is a path function?",
        steps: [
          "Intensive: boiling point, pressure. Extensive: heat capacity, internal energy.",
          "None — all four are state properties; only heat and work are path functions.",
        ],
        answer: "Intensive: boiling point, pressure; extensive: heat capacity, internal energy; no path function among them",
      },
      practiceSet: [
        { prompt: "Which is NOT intensive: internal energy, viscosity, surface tension, specific heat?", answer: "Internal energy" },
        { prompt: "Which is a path function: U, work, S, H?", answer: "Work" },
        { prompt: "A system exchanging neither matter nor energy is?", answer: "Isolated" },
        { prompt: "Both intensive and a state function: U, V, T or S?", answer: "Temperature" },
      ],
      pyqExampleId: "49482f3a-6357-4bad-b760-d1f9dbb9d783",
      traps: [
        {
          title: "Heat capacity as intensive",
          body:
            "A bigger sample needs more heat per degree, so heat capacity is EXTENSIVE. Its per-gram version, specific heat, is intensive. The paper pairs them in one option to catch the mix-up.",
        },
      ],
    },

    // 2 — processes
    {
      kind: "formula" as const,
      slug: "cetth-processes",
      name: "Isothermal, Isochoric, Isobaric, Adiabatic and Reversible",
      intuition:
        "Each process fixes one thing and that fixes one term of the first law. Constant volume kills the work; constant temperature kills ΔU (ideal gas); adiabatic kills q. A reversible process is one carried out so slowly, through equilibrium states, that an infinitesimal change reverses it.",
      definition:
        "- **Isothermal** (T constant): for an ideal gas \\(\\Delta U = 0\\) and \\(\\Delta H = 0\\); heat CAN flow in or out (\\(q = -w\\)).\n" +
        "- **Isochoric** (V constant): \\(w = -P_{\\text{ext}}\\Delta V = 0\\), so \\(q_V = \\Delta U\\).\n" +
        "- **Isobaric** (P constant): \\(q_P = \\Delta U + P_{\\text{ext}}\\Delta V = \\Delta H\\). Heating a gas at constant P: \\(V_1/T_1 = V_2/T_2\\) — doubling V from 300 K needs 600 K.\n" +
        "- **Adiabatic** (q = 0): \\(\\Delta U = w\\); temperature changes.\n" +
        "- **Reversible**: infinitely slow, driving and opposing forces differ INFINITESIMALLY, mechanical equilibrium at every step, reversed by an infinitesimal change. **Irreversible**: finite difference, sudden, real processes.",
      formula: {
        label: "What each process fixes",
        latex:
          "\\text{isochoric: } w = 0;\\quad \\text{isothermal (ideal): } \\Delta U = 0;\\quad \\text{adiabatic: } q = 0;\\quad \\text{isobaric: } q_P = \\Delta H",
      },
      authoredExample: {
        prompt: "A gas at 2 dm³ and 250 K is heated at constant pressure until its volume is 5 dm³. Name the process and find the final temperature.",
        steps: [
          "Isobaric. \\(T_2 = T_1 V_2/V_1 = 250 \\times 5/2 = 625\\) K.",
        ],
        answer: "Isobaric; 625 K",
      },
      selfCheckExample: {
        prompt: "Which statement about an isothermal process of an ideal gas is false: heat can be exchanged; temperature is constant; internal energy is constant; no work is done?",
        steps: [
          "Work is done in an isothermal expansion (\\(w = -q\\)); the false statement is 'no work is done'.",
        ],
        answer: "'No work is done'",
      },
      practiceSet: [
        { prompt: "Process with constant volume?", answer: "Isochoric" },
        { prompt: "In a reversible process the driving and opposing forces differ by?", answer: "An infinitesimal amount" },
        { prompt: "3 dm³ at 300 K doubled at constant P: new T?", answer: "600 K" },
        { prompt: "True for isobaric: \\(Q_P = \\Delta U + P_{ext}\\Delta V\\) or \\(\\Delta U = 0\\)?", answer: "\\(Q_P = \\Delta U + P_{ext}\\Delta V\\)" },
      ],
      pyqExampleId: "11e1dd26-7ed8-4191-aa5f-e746848636d2",
      traps: [
        {
          title: "'Isothermal' read as 'no heat exchange'",
          body:
            "That is ADIABATIC. In an isothermal process heat flows freely — it is exactly what keeps the temperature constant while the gas does work.",
        },
      ],
    },
  ],
  related: [
    {
      label: "First Law — the sign convention and the work term",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-first-law",
    },
    {
      label: "Enthalpy — why q at constant pressure is ΔH",
      href: "/notes/mht-cet-chemistry/chemical-thermodynamics/cetth-enthalpy",
    },
  ],
};
