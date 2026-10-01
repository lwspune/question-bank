import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MS_SEPARATION_NOTE: SubtopicNote = {
  subtopicName: "Separation Techniques",
  title: "Separation Techniques",
  oneLineDefinition:
    "Which method separates which mixture, from sublimation and centrifugation to chromatography, and why the parts of a compound need a chemical method instead.",
  whyItMatters:
    "Four CDS questions, all EASY or MODERATE. Each names a mixture and asks for the method, or names a method and asks what it cannot do.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschms-methods",
      name: "Choosing a separation method",
      intuition:
        "Each method uses one difference between the parts of a mixture: one sublimes and the other does not, one is denser, one sticks to paper more strongly. Find the difference and the method follows. A compound is different: its parts are held by chemical bonds, so only a chemical change, such as electrolysis, can split them.",
      definition:
        "The methods:\n" +
        "- **Sublimation**: one part turns straight from solid to vapour — **ammonium chloride**, camphor, naphthalene, iodine.\n" +
        "- **Centrifugation**: **very fine insoluble particles** that will not settle (cream from milk, blood cells from plasma).\n" +
        "- **Chromatography**: parts that stick differently to a stationary phase — **dyes, natural pigments, drugs in blood**. It **cannot** separate **isotopes**, which are chemically alike.\n" +
        "- **Filtration**, **decantation**: an insoluble solid from a liquid. **Evaporation**: a dissolved solid from its solvent.\n" +
        "- **Distillation**: a liquid from a dissolved solid, or liquids far apart in boiling point. **Fractional distillation**: liquids with close boiling points; gases of air.\n" +
        "- A **compound** cannot be separated by any of these. Its elements are split by a chemical method, such as **electrolysis** (water → hydrogen + oxygen).",
      table: {
        columns: ["Mixture", "Method", "Difference used"],
        rows: [
          {
            cells: ["Salt and ammonium chloride", "Sublimation", "NH₄Cl sublimes, salt does not"],
            pyqExampleId: "b9ceac6f-ca9b-4136-8971-c88759965e4e",
          },
          {
            cells: ["Very fine insoluble particles in a liquid", "Centrifugation", "Density"],
            pyqExampleId: "b72dcfbd-f042-4987-834a-58819a15a0e9",
          },
          {
            cells: ["Colours in a dye; drugs in blood", "Chromatography", "How strongly each part is held by the stationary phase"],
            noteAmber: "CDS 2019 (II): chromatography cannot separate radio-isotopes.",
            pyqExampleId: "ffdda5c7-cb4a-4681-b2a6-10800f5c8a5d",
          },
          { cells: ["Acetone and water", "Fractional distillation", "Boiling point"] },
          {
            cells: ["The elements in a compound (water)", "Electrolysis", "Breaks the chemical bonds"],
            pyqExampleId: "dd52b42d-bb74-4876-b03b-a986dd35e59a",
          },
        ],
      },
      pyqExampleId: "b9ceac6f-ca9b-4136-8971-c88759965e4e",
      selfCheckExample: {
        prompt: "How would you separate iodine from sand?",
        steps: [
          "Iodine sublimes on heating; sand does not.",
          "Heat the mixture gently and collect the iodine vapour on a cool surface.",
        ],
        answer: "Sublimation.",
      },
      practiceSet: [
        { prompt: "Which method separates cream from milk?", answer: "Centrifugation" },
        { prompt: "Which method separates the colours in an ink?", answer: "Chromatography" },
        { prompt: "Which method separates camphor from sand?", answer: "Sublimation" },
        { prompt: "How are hydrogen and oxygen obtained from water?", answer: "By electrolysis" },
      ],
      traps: [
        {
          title: "Chromatography cannot tell isotopes apart",
          body: "Isotopes of an element behave the same chemically, so they stick to the stationary phase in the same way. Chromatography separates dyes, pigments and drugs, not **isotopes**.",
        },
        {
          title: "A compound needs a chemical method",
          body: "Distillation, filtration and sublimation only separate mixtures. The elements of a compound are held by bonds and need a chemical change, such as electrolysis.",
        },
      ],
    },
  ],
};
