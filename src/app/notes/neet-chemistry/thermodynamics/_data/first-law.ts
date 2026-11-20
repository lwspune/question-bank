import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_TH_FIRST_LAW_NOTE: SubtopicNote = {
  subtopicName: "The First Law and Work",
  title: "The First Law and Work",
  oneLineDefinition:
    "Systems and surroundings, state functions, extensive and intensive properties, the four kinds of process, the first law ΔU = q + w with chemistry's signs, and the work a gas does when it expands.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. One matches four processes to their conditions (2024), one applies ΔU = q + w to heat taken in and work done by the system (2026), one asks for the work and heat when a gas expands into a vacuum (Re-NEET 2024), and three are about work: a reversible isothermal expansion worked out in calories (2024), the p-V graph with the most work (2022) and the work in a cycle of two isothermal and two adiabatic steps (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ncht-systems",
      name: "Systems, processes and state functions",
      intuition:
        "Thermodynamics needs a clear line between what we study and everything else. The part we study, say the gas in a cylinder or the reaction in a flask, is the system; the rest is the surroundings. We describe the system by a few measurable quantities such as pressure, volume and temperature. Some quantities depend only on where the system is now (its state), others depend on how it got there (the path). Telling these apart is the first skill of the chapter.",
      definition:
        "- **Open system:** exchanges both energy and matter with the surroundings (reactants in an open beaker). **Closed system:** exchanges energy but not matter (a closed vessel of conducting material). **Isolated system:** exchanges neither (reactants in a thermos flask).\n" +
        "- **State functions** depend only on the state, not on the path: \\(p\\), \\(V\\), \\(T\\), \\(U\\), \\(H\\), \\(S\\), \\(G\\). Heat \\(q\\) and work \\(w\\) depend on the path, but their sum \\(q + w = \\Delta U\\) does not.\n" +
        "- **Extensive properties** depend on the amount of matter: mass, volume, internal energy, enthalpy, entropy, heat capacity. **Intensive properties** do not: temperature, pressure, density, molar heat capacity.\n" +
        "- The ratio of two extensive properties is intensive: density is mass divided by volume.\n" +
        "- A **reversible process** goes infinitely slowly through a series of equilibrium states, so the system and the surroundings are always in near equilibrium with each other. Any other process is irreversible.",
      table: {
        columns: ["Process", "What is fixed", "What follows"],
        rows: [
          { cells: ["Isothermal", "Temperature, \\(\\Delta T = 0\\)", "For an ideal gas \\(\\Delta U = 0\\)"] },
          { cells: ["Isochoric", "Volume, \\(\\Delta V = 0\\)", "No expansion work, \\(w = 0\\)"] },
          { cells: ["Isobaric", "Pressure, \\(\\Delta p = 0\\)", "Heat taken in equals \\(\\Delta H\\)"] },
          { cells: ["Adiabatic", "No heat crosses the boundary, \\(q = 0\\)", "\\(\\Delta U = w_{ad}\\)"] },
          { cells: ["Cyclic", "The system returns to its starting state", "\\(\\Delta U = 0\\), since U is a state function"] },
        ],
      },
      pyqExampleId: "00e6254c-2681-4b14-a791-5167b8892f44",
      selfCheckExample: {
        prompt: "Which of q, w, ΔU and ΔH depend on the path taken between two states?",
        steps: [
          "ΔU and ΔH are changes in state functions, so they depend only on the two end states.",
          "Heat and work are energy in transfer; how much of each flows depends on the route.",
        ],
        answer: "Only q and w",
      },
      practiceSet: [
        { prompt: "Name the kind of system in which neither energy nor matter crosses the boundary.", answer: "An isolated system" },
        { prompt: "Is molar heat capacity an extensive or an intensive property?", answer: "Intensive" },
        { prompt: "Is the work done in a change a state function?", answer: "No, it depends on the path" },
        { prompt: "In a reversible process, how do the system and the surroundings stand at every stage?", answer: "In near equilibrium with each other" },
      ],
      traps: [
        {
          title: "A ratio of two extensive properties is intensive",
          body: "Mass and volume both depend on the amount, but density (mass per volume) does not. In the same way molarity and specific heat are intensive.",
        },
        {
          title: "Adiabatic does not mean isothermal",
          body: "In an adiabatic process no heat crosses the boundary, but the temperature can still change: a gas that expands adiabatically cools, because the work it does comes out of its internal energy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncht-first-law",
      name: "The first law with chemistry's signs",
      intuition:
        "Internal energy U is all the energy stored in a system: the motion of its molecules and the energy in its bonds. We cannot measure U itself, only its change. It changes in just two ways: heat flows in or out, or work is done on or by the system. Chemistry keeps the books from the system's side, so anything that adds energy to the system counts as positive.",
      definition:
        "- **First law:** \\(\\Delta U = q + w\\). Energy is neither created nor destroyed; the energy of an isolated system is constant.\n" +
        "- \\(q\\) is positive when the system absorbs heat and negative when it gives heat out.\n" +
        "- \\(w\\) is positive when work is done on the system (compression) and negative when the system does work (expansion).\n" +
        "- At constant volume no expansion work is done, so \\(\\Delta U = q_V\\).\n" +
        "- In an adiabatic change \\(q = 0\\), so \\(\\Delta U = w_{ad}\\).\n" +
        "- The internal energy of an ideal gas depends only on its temperature, so in an isothermal change \\(\\Delta U = 0\\) and \\(q = -w\\).",
      formula: {
        label: "First law",
        latex: "\\Delta U = q + w",
        symbols: [
          { symbol: "\\(q\\)", meaning: "heat absorbed by the system" },
          { symbol: "\\(w\\)", meaning: "work done on the system" },
        ],
      },
      authoredExample: {
        prompt:
          "A system gives out 120 J of heat to its surroundings while the surroundings do 300 J of work on it. Find the change in its internal energy.",
        steps: [
          "Heat leaves the system, so \\(q = -120\\) J. Work is done on the system, so \\(w = +300\\) J.",
          "\\(\\Delta U = q + w = -120 + 300 = +180\\) J.",
        ],
        answer: "\\(\\Delta U = +180\\) J",
      },
      selfCheckExample: {
        prompt: "One mole of a gas in a closed rigid steel vessel absorbs 400 J of heat. Find w and ΔU.",
        steps: [
          "The vessel is rigid, so the volume cannot change and no expansion work is done: \\(w = 0\\).",
          "\\(\\Delta U = q + w = 400 + 0 = 400\\) J.",
        ],
        answer: "\\(w = 0\\), \\(\\Delta U = +400\\) J",
      },
      practiceSet: [
        { prompt: "Work of 100 J is done on a gas in a perfectly insulated cylinder. Find ΔU of the gas.", answer: "\\(+100\\) J" },
        { prompt: "What is ΔU for an isolated system?", answer: "Zero" },
        { prompt: "An ideal gas expands at constant temperature and does 500 J of work. How much heat does it absorb?", answer: "500 J (\\(q = -w\\))" },
        { prompt: "In chemistry's sign convention, is w positive or negative when a gas is compressed?", answer: "Positive: work is done on the system" },
      ],
      pyqExampleId: "31ffe844-5063-43cd-9dd9-80f88eca6344",
      traps: [
        {
          title: "Work done by the system is negative",
          body: "In \\(\\Delta U = q + w\\) the work is the work done on the system. When a gas expands and does 200 J of work, \\(w = -200\\) J. Physics books write the same law as \\(\\Delta U = Q - W\\) with W done by the gas; do not mix the two conventions in one sum.",
        },
        {
          title: "Heat given out is negative",
          body: "Heat the system releases to the surroundings enters the first law with a minus sign. Only heat absorbed by the system is positive.",
        },
        {
          title: "Free expansion does no work and takes no heat",
          body: "A gas expanding into a vacuum pushes against zero pressure, so \\(w = 0\\). For an ideal gas at constant temperature \\(\\Delta U = 0\\) as well, so \\(q = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncht-work",
      name: "Work of expansion",
      visualizationSlug: "neet-chem-pv-work",
      intuition:
        "A gas that expands pushes back whatever holds it in, the piston and the air beyond it, and so does work. The work depends on the pressure it pushes against and on how far the volume changes. If the gas expands slowly, with the outside pressure kept only a little below its own at every stage, it pushes against the largest pressure it can and does the most work.",
      definition:
        "- Against a constant external pressure: \\(w = -p_{ex}\\Delta V = -p_{ex}(V_f - V_i)\\). Expansion gives negative w, compression positive w.\n" +
        "- **Free expansion** into a vacuum: \\(p_{ex} = 0\\), so \\(w = 0\\). No work is done in the free expansion of an ideal gas, whether the process is reversible or irreversible.\n" +
        "- **Reversible isothermal expansion** of an ideal gas: \\(w_{rev} = -2.303\\,nRT\\log\\dfrac{V_f}{V_i}\\). At constant temperature \\(\\dfrac{V_f}{V_i} = \\dfrac{p_i}{p_f}\\), so \\(w_{rev} = -2.303\\,nRT\\log\\dfrac{p_i}{p_f}\\).\n" +
        "- On a p-V graph the work is the area under the curve. Between the same two volumes, the path at higher pressure encloses more area, so a reversible expansion gives more work than an expansion against a constant low pressure.\n" +
        "- In an adiabatic step \\(q = 0\\), so \\(w = \\Delta U\\).\n" +
        "- Units: 1 L atm = 101.3 J. With R = 8.314 J/(K mol) the work comes out in joules; with R = 2 cal/(K mol), in calories.",
      formula: {
        label: "Work of expansion",
        latex: "w = -p_{ex}\\Delta V, \\qquad w_{rev} = -2.303\\,nRT\\log\\frac{V_f}{V_i} = -2.303\\,nRT\\log\\frac{p_i}{p_f}",
        symbols: [
          { symbol: "\\(p_{ex}\\)", meaning: "external pressure the gas pushes against" },
          { symbol: "\\(V_i, V_f\\)", meaning: "initial and final volumes" },
          { symbol: "\\(p_i, p_f\\)", meaning: "initial and final pressures" },
        ],
      },
      authoredExample: {
        prompt:
          "Two moles of an ideal gas expand isothermally and reversibly at 300 K from 1 L to 10 L. Find the work done on the gas (R = 8.314 J/(K mol)).",
        steps: [
          "\\(w_{rev} = -2.303\\,nRT\\log\\dfrac{V_f}{V_i} = -2.303 \\times 2 \\times 8.314 \\times 300 \\times \\log 10\\).",
          "\\(\\log 10 = 1\\), so \\(w = -2.303 \\times 4988.4 = -11488\\) J.",
          "The minus sign says the gas does about 11.5 kJ of work on the surroundings.",
        ],
        answer: "\\(w \\approx -11.5\\) kJ",
      },
      selfCheckExample: {
        prompt: "A gas expands from 2 L to 5 L against a constant external pressure of 1 atm. Find w in joules (1 L atm = 101.3 J).",
        steps: [
          "\\(w = -p_{ex}\\Delta V = -1 \\times (5 - 2) = -3\\) L atm.",
          "\\(-3 \\times 101.3 = -303.9\\) J.",
        ],
        answer: "\\(w = -303.9\\) J",
      },
      practiceSet: [
        { prompt: "How much work is done when an ideal gas expands into a vacuum?", answer: "Zero" },
        { prompt: "A gas is compressed from 6 L to 2 L by a constant external pressure of 2 atm. Find w in L atm.", answer: "\\(+8\\) L atm" },
        { prompt: "In an adiabatic expansion, what is the work done on the gas equal to?", answer: "\\(\\Delta U\\), since \\(q = 0\\)" },
        {
          prompt: "A gas expands at constant temperature between the same two volumes, once reversibly and once against a constant low external pressure. In which case does it do more work?",
          answer: "The reversible expansion",
        },
      ],
      pyqExampleId: "428fd03b-4b79-4219-9cd5-06694dd9a0a5",
      traps: [
        {
          title: "Use the external pressure",
          body: "In \\(w = -p_{ex}\\Delta V\\) the pressure is the one the gas pushes against, not the gas's own starting pressure. Against a vacuum it is zero, whatever the gas pressure was.",
        },
        {
          title: "The pressure ratio is upside down",
          body: "For an isothermal ideal gas \\(\\dfrac{V_f}{V_i} = \\dfrac{p_i}{p_f}\\). Writing \\(\\log\\dfrac{p_f}{p_i}\\) for an expansion flips the sign of the work.",
        },
        {
          title: "Litre atmospheres are not joules",
          body: "\\(p\\Delta V\\) in atm and litres gives L atm. Multiply by 101.3 to get joules before comparing with answers in J.",
        },
      ],
    },
  ],
};
