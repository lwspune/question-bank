import type { SubtopicNote } from "@/app/notes/_types";

export const FIRST_LAW_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Systems, State Functions and the First Law",
  title: "Systems, State Functions and the First Law",
  oneLineDefinition:
    "The language of thermodynamics — systems and their walls, state versus path functions, intensive versus extensive — and the first law ΔU = q + w, with work done on the system counted positive.",
  whyItMatters:
    "Twelve PYQs, ten of them multiple choice, and two from 2026. Six ask which quantities are state functions or intensive, or which textbook relation is written correctly. Six apply ΔU = q + w with the right signs: through a cycle, a stirred liquid, boiling water or an insulated box.",
  concepts: [
    // C1 — state functions, intensive properties, standard relations
    {
      kind: "reference" as const,
      slug: "jcthermo-state-functions",
      name: "State functions, intensive properties and the standard relations",
      intuition:
        "Cut the sample in half. A property that halves with it is extensive; one that stays the same is intensive. A state function depends only on where the system is now, not on how it got there. Heat and work depend on the route, so they are path functions.",
      definition:
        "- **Open** system: exchanges matter and energy. **Closed**: energy only. **Isolated**: neither.\n" +
        "- **Adiabatic** walls let no heat through, so \\(q = 0\\). **Diathermic** walls let heat through, so a system in a bath stays at the bath temperature.\n" +
        "- **Intensive**: temperature, pressure, density, concentration, \\(E^\\circ_{\\mathrm{cell}}\\), and any molar or specific quantity (molar heat capacity, molar mass).\n" +
        "- **Extensive**: volume, amount, mass, \\(U\\), \\(H\\), \\(S\\), \\(G\\) and their changes, the heat capacity of a sample.\n" +
        "- **State functions**: \\(U, H, S, G, p, V, T\\). **Path functions**: \\(q\\) and \\(w\\).\n" +
        "- Correct forms: \\(\\Delta U = q + w\\), \\(\\Delta H = \\Delta U + \\Delta n_g RT\\), \\(\\Delta G = \\Delta H - T\\Delta S\\), \\(\\Delta S = q_{\\mathrm{rev}}/T\\), \\(\\Delta S_{\\mathrm{sys}} + \\Delta S_{\\mathrm{surr}} \\ge 0\\).",
      table: {
        columns: ["Quantity", "Intensive or extensive", "State or path function"],
        rows: [
          { cells: ["Temperature, pressure, density", "Intensive", "State function"] },
          {
            cells: ["Molarity, molar heat capacity, standard cell potential", "Intensive", "State function"],
            noteAmber: "A per-mole or per-litre quantity is intensive, even though it is a ratio of two extensive ones.",
          },
          { cells: ["Volume, amount in moles, mass", "Extensive", "State function"] },
          {
            cells: ["Internal energy U, enthalpy H, entropy S, Gibbs energy G", "Extensive", "State function"],
            noteAmber: "Take less of a solution and G falls, even though its concentration and density stay the same.",
          },
          { cells: ["Heat capacity of a whole sample", "Extensive", "State function"] },
          {
            cells: ["Heat q, work w", "Extensive (they scale with the amount)", "Path function"],
            noteAmber: "Among U, V, q and H, only q is not a state variable.",
          },
        ],
        caption: "Halve the sample and ask what changes.",
      },
      selfCheckExample: {
        prompt:
          "How many of these are intensive: volume, molar volume, entropy, boiling point, heat capacity, specific heat?",
        steps: [
          "Volume, entropy and heat capacity double when the sample doubles: extensive.",
          "Molar volume, boiling point and specific heat stay the same: intensive.",
        ],
        answer: "Three.",
      },
      practiceSet: [
        { prompt: "Is the molar mass of a substance intensive or extensive?", answer: "Intensive" },
        { prompt: "Among \\(U\\), \\(H\\), \\(q\\) and \\(w\\), how many are state functions?", answer: "Two (\\(U\\) and \\(H\\))" },
        { prompt: "A process takes place inside a container whose walls pass no heat. What is \\(q\\)?", answer: "\\(q = 0\\) (adiabatic)" },
        {
          prompt: "At constant pressure, which is correct: \\(\\Delta H = \\Delta U - p\\Delta V\\) or \\(\\Delta H = \\Delta U + p\\Delta V\\)?",
          answer: "\\(\\Delta H = \\Delta U + p\\Delta V\\)",
        },
      ],
      pyqExampleId: "bda24538-907b-4a9a-87d1-1bffe2d2667d", // 28 Jul 2022 — state variables among U, V, q, H
      traps: [
        {
          title: "Sign-reversed textbook relations",
          body:
            "Distractors write \\(\\Delta U = q + p\\Delta V\\), \\(\\Delta H = \\Delta U - \\Delta n_g RT\\) or \\(\\Delta H = \\Delta U - p\\Delta V\\). With work on the system positive, expansion work is \\(-p\\Delta V\\), so \\(\\Delta U = q - p\\Delta V\\) and \\(\\Delta H = \\Delta U + \\Delta n_g RT\\).",
        },
        {
          title: "Same concentration, different Gibbs energy",
          body:
            "Two solutions with the same concentration have the same density, molar heat capacity and concentration, because those are intensive. Their Gibbs energies differ if they hold different amounts, because \\(G\\) is extensive.",
        },
      ],
    },

    // C2 — first law and its sign convention
    {
      kind: "formula" as const,
      slug: "jcthermo-first-law-signs",
      name: "First law sign convention: ΔU = q + w",
      intuition:
        "Internal energy changes only by heat and work crossing the boundary. Count everything that goes in as positive: heat absorbed, and work done on the system. Heat given out and work done by the system are negative. Over a full cycle the system returns to its start, so ΔU is zero whatever the path.",
      definition:
        "- \\(\\Delta U = q + w\\) (IUPAC and NCERT): \\(q > 0\\) when heat is absorbed, \\(w > 0\\) when work is done ON the system.\n" +
        "- Expansion: the system does work, so \\(w < 0\\). Compression: \\(w > 0\\).\n" +
        "- Adiabatic: \\(q = 0\\), so \\(\\Delta U = w\\). Stirring a liquid in an insulated vessel: \\(w > 0\\), so \\(\\Delta U > 0\\) and it warms.\n" +
        "- Cycle: \\(\\Delta U_{\\mathrm{cycle}} = 0\\), so the return path has \\(\\Delta U\\) equal and opposite to the forward path.\n" +
        "- Some books write \\(\\Delta U = q - W\\), where \\(W\\) is the work done BY the system. It is the same law.\n" +
        "- An exothermic reaction in an adiabatic box heats its contents. In a diathermic box in a bath, the heat leaves and the temperature stays the same.",
      formula: {
        label: "First law of thermodynamics",
        latex: "\\Delta U = q + w",
      },
      authoredExample: {
        prompt: "A gas absorbs 250 J of heat and expands, doing 400 J of work on the surroundings. Find \\(\\Delta U\\).",
        steps: [
          "Heat absorbed: \\(q = +250\\) J.",
          "The gas does 400 J of work, so the work done on it is \\(w = -400\\) J.",
          "\\(\\Delta U = 250 + (-400) = -150\\) J. The gas loses internal energy and cools.",
        ],
        answer: "\\(\\Delta U = -150\\) J.",
      },
      selfCheckExample: {
        prompt:
          "A gas goes from state P to state Q, absorbing 40 J of heat and doing 25 J of work on the surroundings. It is then returned from Q to P while giving out 30 J of heat. How much work is done in the return step, and on what?",
        steps: [
          "P → Q: \\(\\Delta U = 40 + (-25) = +15\\) J.",
          "Q → P must undo this: \\(\\Delta U = -15\\) J, with \\(q = -30\\) J.",
          "\\(-15 = -30 + w\\), so \\(w = +15\\) J. Positive: the surroundings do the work on the gas.",
        ],
        answer: "15 J of work is done on the gas.",
      },
      practiceSet: [
        { prompt: "\\(q = +80\\) J and \\(w = -30\\) J. Find \\(\\Delta U\\).", answer: "\\(+50\\) J" },
        { prompt: "A system gives out 60 J of heat while 60 J of work is done on it. Find \\(\\Delta U\\).", answer: "\\(0\\)" },
        { prompt: "A liquid in an insulated vessel is stirred. Give the signs of \\(q\\), \\(w\\) and \\(\\Delta U\\).", answer: "\\(q = 0\\), \\(w > 0\\), \\(\\Delta U > 0\\)" },
        { prompt: "What is \\(\\Delta U\\) for a gas taken round any complete cycle?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "9b8441a4-8da0-4ab5-8360-9d8970de1db6", // 2 Apr 2026 S2 — X to Y to X cycle, work in the return step
      traps: [
        {
          title: "Adding the magnitudes",
          body:
            "If a system does 200 J of work and absorbs 150 J of heat, \\(\\Delta U = 150 - 200 = -50\\) J. Adding them (350 J) or flipping the sign (+50 J) are the planted options.",
        },
        {
          title: "Boiling water does work",
          body:
            "Water heated to boiling takes in heat (\\(q > 0\\)) and stores more energy (\\(\\Delta U > 0\\)). The steam it makes pushes back the atmosphere, so the system does work: \\(w < 0\\), not zero.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Work of Expansion — where the value of w comes from",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-work",
    },
  ],
};
