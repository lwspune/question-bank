import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TH_TERMS_NOTE: SubtopicNote = {
  subtopicName: "Terms Used in Thermodynamics",
  title: "System, Properties and Processes",
  oneLineDefinition:
    "The words the whole chapter is written in: system and surroundings, open, closed and isolated systems, extensive and intensive properties, state and path functions, and the five kinds of process.",
  whyItMatters:
    "6 questions. Four were set in board papers: define a reversible process (2020), an extensive property (2023), extensive and intensive properties together with isobaric and adiabatic processes (2024), and an intensive property (2026). Two of these also asked for the standard enthalpy of combustion, which is taught on the Thermochemistry page. The textbook adds why density is intensive and which quantities are not state functions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccth-properties",
      name: "System, surroundings and properties",
      intuition:
        "Thermodynamics first draws a boundary. The part you study is the system; everything else is the surroundings. Then it sorts the properties of the system into two kinds: those that grow when you take more of the substance (mass, volume) and those that do not (temperature, boiling point). Pour half a cup of hot coffee into another cup: each half has half the mass but the same temperature.",
      definition:
        "- **System:** the part of the universe under study. **Surroundings:** everything outside it.\n" +
        "- **Open system:** exchanges both energy and matter with the surroundings (hot coffee in an open cup).\n" +
        "- **Closed system:** exchanges energy but not matter (the cup covered with a saucer).\n" +
        "- **Isolated system:** exchanges neither energy nor matter (the covered cup, insulated).\n" +
        "- **Extensive property:** depends on the amount of matter present in the system.\n" +
        "- **Intensive property:** independent of the amount of matter present in the system.\n" +
        "- The ratio of two extensive properties is intensive, which is why density (mass divided by volume) is intensive.",
      table: {
        columns: ["Point", "Extensive property", "Intensive property"],
        rows: [
          {
            cells: ["Depends on the amount of matter", "Yes", "No"],
            pyqExampleId: "c7d7a528-250d-444d-ac0b-1014ee36d059",
            noteAmber: "Board 2024 asked you to define both kinds.",
          },
          {
            cells: [
              "Examples in the book",
              "Mass, volume, internal energy, heat capacity, number of moles",
              "Pressure, temperature, surface tension, viscosity, melting point, boiling point, specific heat",
            ],
            pyqExampleId: "55fc33ba-b925-472e-86b9-7b52ac168900",
            noteAmber: "Board 2026 asked you to define an intensive property.",
          },
          { cells: ["When the sample is cut in half", "Its value is halved", "Its value is unchanged"] },
          { cells: ["Density as a test case", "Mass and volume are both extensive", "Their ratio, density, is intensive"] },
        ],
      },
      practiceSet: [
        { prompt: "Sort these into extensive and intensive: volume, temperature, number of moles, viscosity.", answer: "Extensive: volume, number of moles. Intensive: temperature, viscosity" },
        { prompt: "Hot tea is kept in a closed, perfectly insulated flask. What kind of system is the tea?", answer: "An isolated system: it exchanges neither energy nor matter" },
        { prompt: "Is internal energy an extensive or an intensive property?", answer: "Extensive" },
      ],
      pyqExampleId: "d6691431-c9ec-4bd1-91c9-501cb153ffb2",
      traps: [
        {
          title: "Examples without the definition",
          body: "A list of examples does not earn the definition mark. First write 'depends on (or is independent of) the amount of matter present in the system', then give two examples.",
        },
        {
          title: "Calling a closed system isolated",
          body: "A closed system still exchanges energy (the covered cup still cools). Only an isolated system blocks both energy and matter.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccth-processes",
      name: "State functions, path functions and kinds of process",
      intuition:
        "Your height above sea level after a climb does not depend on which path you took, but how tired you are does. Pressure, volume, temperature and internal energy are like height: they depend only on the state. Heat and work are like tiredness: they depend on the path. A process is the change from one equilibrium state to another, and it is named by what is kept fixed.",
      definition:
        "- **State function:** a property that depends only on the state of the system, not on the path followed to reach it (P, V, T, U, H).\n" +
        "- **Path function:** a property that depends on the path. Work (W) and heat (Q) are path functions.\n" +
        "- **Thermodynamic equilibrium:** the state functions of the system do not vary with time.\n" +
        "- **Reversible process:** at every stage the driving force (P of the gas) is infinitesimally greater than the opposing force (Pext), and a slight change in the opposing force reverses it.\n" +
        "- Features of a reversible process: the forces differ by an infinitesimal amount; it can be reversed by an infinitesimal change; it is infinitely slow, with an infinite number of steps; after every step the system is in mechanical equilibrium with the surroundings.",
      table: {
        columns: ["Process", "What stays fixed", "Written as"],
        rows: [
          { cells: ["Isothermal", "Temperature; heat flows in or out to keep it so", "\\(\\Delta T = 0\\), so \\(\\Delta U = 0\\)"] },
          { cells: ["Isobaric", "Pressure (reactions in open containers)", "\\(\\Delta P = 0\\)"] },
          { cells: ["Isochoric", "Volume (reactions in closed containers)", "\\(\\Delta V = 0\\)"] },
          { cells: ["Adiabatic", "No heat exchange; the system is insulated", "\\(Q = 0\\)"] },
          {
            cells: ["Reversible", "Near balance of driving and opposing forces at every stage", "Infinitely slow, infinite number of steps"],
            pyqExampleId: "cfdc0c20-8a9d-4f63-8799-b08fb5c048cc",
            noteAmber: "Board 2020 asked you to define a reversible process.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Name the two path functions of this chapter.", answer: "Work (W) and heat (Q)" },
        { prompt: "A reaction is carried out in a sealed, rigid steel vessel. Name the kind of process.", answer: "Isochoric (constant volume)" },
        { prompt: "Give two features of a reversible process.", answer: "Any two: forces differ infinitesimally; it can be reversed by an infinitesimal change; it is infinitely slow with infinite steps; the system is in mechanical equilibrium after every step" },
      ],
      pyqExampleId: "cfdc0c20-8a9d-4f63-8799-b08fb5c048cc",
      traps: [
        {
          title: "Calling heat or work a state function",
          body: "Q and W depend on the path, so they are path functions. Their sum \\(Q + W = \\Delta U\\) is a state function. The textbook MCQ tests exactly this.",
        },
        {
          title: "Isothermal is not adiabatic",
          body: "Isothermal keeps the temperature fixed, so heat must flow. Adiabatic stops heat flow, so the temperature usually changes. Do not swap them in a definition.",
        },
      ],
    },
  ],
};
