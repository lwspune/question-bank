import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_DN_EMISSION_NOTE: SubtopicNote = {
  subtopicName: "Electron Emission",
  title: "Electron Emission",
  oneLineDefinition:
    "Why the free electrons in a metal cannot leave it on their own, the work function they must be given to escape, and the three ways of giving it: heat, a strong electric field or light.",
  whyItMatters:
    "1 question, set in a board paper: which metal gives photoelectric emission with visible light (2025, in a case study). Board 2023 asked the same idea the other way round on the next page: which metal does not. Both rest on the work function taught here, so learn which metals respond to visible light and which need ultraviolet.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpdn-work-function",
      name: "Work function and the three kinds of electron emission",
      intuition:
        "A metal is full of free electrons, yet they do not fall out of it. When an electron starts to leave, the surface it leaves behind becomes positive and pulls it back. So an electron gets out only if it is given at least a certain minimum energy, the work function. Heating the metal, a very strong electric field or light of a suitable frequency can supply it.",
      definition:
        "- **Work function** \\(\\phi_0\\): the minimum energy an electron needs to escape from the surface of a metal. It depends on the properties of the metal and the nature of its surface, and is usually given in electron volts.\n" +
        "- **One electron volt** is the energy an electron gains when it is accelerated through a potential difference of 1 volt: \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J.\n" +
        "- The energy needed for emission can be supplied in three ways: by heat, by a strong electric field, or by light. The table names them.\n" +
        "- **Which metals respond to visible light:** zinc, cadmium and magnesium give photoelectrons only with ultraviolet light. Alkali metals such as lithium, sodium, potassium, caesium and rubidium have low work functions and respond even to visible light.",
      table: {
        columns: ["Kind of emission", "How the energy is given"],
        rows: [
          {
            cells: ["Thermionic emission", "The metal is heated suitably, so the free electrons get enough thermal energy to come out"],
          },
          {
            cells: ["Field emission", "A very strong electric field, of the order of \\(10^{8}\\) V/m, pulls the electrons out of the metal, as in a spark plug"],
          },
          {
            cells: ["Photoelectric emission", "Light of suitable frequency falls on the metal; the electrons given out are called **photoelectrons**"],
            noteAmber:
              "Board 2025 asked which metal shows the photoelectric effect with visible light: caesium. Zinc, cadmium and magnesium need ultraviolet light.",
          },
        ],
        caption: "In every case the electron must be given at least the work function of the metal.",
      },
      selfCheckExample: {
        prompt: "The work function of a metal is \\(3.2 \\times 10^{-19}\\) J. Express it in electron volts.",
        steps: [
          "\\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J.",
          "\\(\\phi_0 = \\dfrac{3.2 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.0\\) eV.",
        ],
        answer: "2.0 eV",
      },
      practiceSet: [
        { prompt: "Name the kind of electron emission in which a metal is heated to make it give out electrons.", answer: "Thermionic emission" },
        { prompt: "What is the least energy an electron needs to escape from a metal surface called?", answer: "The work function of the metal" },
        {
          prompt: "Why can a free electron in a metal not leave the metal on its own?",
          answer: "As it starts to leave, the metal surface becomes positive and the ions pull it back",
        },
        { prompt: "Express a work function of 2.5 eV in joules.", answer: "\\(4.0 \\times 10^{-19}\\) J" },
      ],
      pyqExampleId: "597ff35c-0f38-45c4-8753-9ee5eb08da44",
      traps: [
        {
          title: "Treating the work function as a property of the light",
          body: "The work function belongs to the metal and its surface. Changing the colour or the brightness of the light never changes it; only a different metal or surface does.",
        },
        {
          title: "Mixing electron volts and joules",
          body: "A work function given in eV must be turned into joules (multiply by \\(1.6 \\times 10^{-19}\\)) before it is added to or taken from an energy in joules.",
        },
      ],
    },
  ],
};
