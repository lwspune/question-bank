import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_SOL_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Separation",
  title: "Solutions, Mixtures and How to Separate Them",
  oneLineDefinition:
    "A solution is a mixture that looks the same all the way through; each kind of mixture is separated by the property its parts do not share.",
  whyItMatters:
    "Mixtures were asked in 2017 and 2022: whether a mixture is homogeneous or heterogeneous, which pairs of liquids mix, and which technique separates a named component.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-sol-terms",
      name: "Solutions and mixtures: the key terms",
      intuition:
        "A mixture keeps the separate substances in it, in any proportion. If the particles are spread so finely that every part of the sample is the same, the mixture is homogeneous and is called a solution. If you can see, or spin out, separate parts, it is heterogeneous.",
      definition:
        "- A **solution** is a homogeneous mixture of a **solute** (the substance dissolved, usually the smaller amount) in a **solvent** (the substance it dissolves in, usually the larger amount). Water is the commonest solvent; the solution is then **aqueous**.\n" +
        "- **Homogeneous**: one phase, the same composition everywhere. Solutions can be liquid (salt water), gas (air) or solid (alloys such as brass).\n" +
        "- **Heterogeneous**: two or more visible phases or particles.\n" +
        "- Two liquids that mix in any proportion are **miscible**; liquids that form layers are **immiscible**.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Solution", "Homogeneous mixture; particles too small to see or settle", "Sugar dissolved in water"] },
          { cells: ["Suspension", "Heterogeneous; particles large enough to settle or be filtered", "Muddy water"] },
          { cells: ["Colloid", "Particles about 1 to 1000 nm across; they scatter light and do not settle", "Milk, fog"] },
          { cells: ["Miscible liquids", "Mix completely to give one layer", "Water and ethanol"] },
          { cells: ["Immiscible liquids", "Separate into two layers", "Hexane and water"] },
          { cells: ["Blood", "Heterogeneous: cells suspended in plasma, which is itself a solution", "Spinning blood separates the cells"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following is a homogeneous mixture?",
        options: [
          "Muddy river water",
          "Olive oil shaken with water",
          "Filtered sea water",
          "Whole blood",
          "Iron filings stirred into sulfur powder",
        ],
        steps: [
          "Filtered sea water is a solution of salts in water: the same composition throughout, with nothing that settles.",
          "A and E contain visible separate particles. B separates into layers. D contains cells that a centrifuge can spin out.",
        ],
        answer: "(C) Filtered sea water",
      },
      practiceSet: [
        { prompt: "Is brass (copper and zinc) a solution?", answer: "Yes, a solid solution", method: "Homogeneous mixture of metals" },
        { prompt: "In a fizzy drink, name a gas that is a solute.", answer: "Carbon dioxide" },
        { prompt: "Are hexane and water miscible?", answer: "No: they form two layers" },
        { prompt: "Is a solution a pure substance?", answer: "No: it is a homogeneous mixture" },
      ],
      traps: [
        {
          title: "Homogeneous does not mean pure, and blood is not homogeneous",
          body: "Salt water is homogeneous but still a mixture of two substances. Blood looks uniform but is heterogeneous: its cells can be separated by spinning. Options calling blood homogeneous, or calling a solution a pure substance, are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-sol-separation",
      name: "Separation techniques and when to use each",
      intuition:
        "To separate a mixture, find a property its parts do not share: particle size, boiling point, density, or how strongly each sticks to a surface. Each technique exploits one of these, so name the difference first and the technique follows.",
      definition:
        "- **Filtration** removes an insoluble solid from a liquid. It cannot remove a dissolved solute.\n" +
        "- **Evaporation** and **crystallisation** recover a dissolved solid from its solution.\n" +
        "- **Simple distillation** recovers the solvent from a solution of a solid.\n" +
        "- **Fractional distillation** separates miscible liquids whose boiling points are close.\n" +
        "- A **separating funnel** separates immiscible liquids.\n" +
        "- **Chromatography** separates dissolved substances that move at different speeds through a stationary phase.\n" +
        "- **Centrifugation** spins suspended particles to the bottom of a tube.",
      table: {
        columns: ["Technique", "Separates", "Based on", "Example"],
        rows: [
          { cells: ["Filtration", "Insoluble solid from a liquid", "Particle size", "Sand from water"] },
          { cells: ["Evaporation or crystallisation", "Dissolved solid from its solution", "Solvent evaporates, solid stays", "Salt from sea water"] },
          { cells: ["Simple distillation", "Solvent from a solution", "Large difference in boiling point", "Pure water from sea water"] },
          { cells: ["Fractional distillation", "Miscible liquids", "Close boiling points", "Ethanol from water; crude oil fractions"] },
          { cells: ["Separating funnel", "Immiscible liquids", "Density; liquids do not mix", "Oil from water"] },
          { cells: ["Chromatography", "Dissolved substances in a mixture", "Different attraction to the paper and the solvent", "Plant pigments, ink dyes"] },
          { cells: ["Centrifugation", "Suspended particles from a liquid", "Density", "Blood cells from plasma"] },
        ],
      },
      selfCheckExample: {
        prompt: "A forensic scientist wants to separate the different coloured dyes in a drop of black ink. Which technique should be used?",
        options: ["Filtration", "Chromatography", "Evaporation", "Simple distillation", "Centrifugation"],
        steps: [
          "The dyes are all dissolved in the same solution, so only a technique that separates dissolved substances from each other works: chromatography.",
          "Filtration and centrifugation cannot catch dissolved particles. Evaporation and simple distillation would leave all the dyes together.",
        ],
        answer: "(B) Chromatography",
      },
      practiceSet: [
        { prompt: "How do you obtain solid salt from salt water?", answer: "Evaporation or crystallisation" },
        { prompt: "How do you separate cyclohexane from water?", answer: "With a separating funnel", method: "They are immiscible" },
        { prompt: "How do you remove chalk powder from water?", answer: "Filtration" },
        { prompt: "How do you separate blood plasma from blood cells?", answer: "Centrifugation" },
      ],
      traps: [
        {
          title: "Filtration cannot remove a dissolved substance",
          body: "Dissolved particles pass through filter paper with the solvent. Salt cannot be filtered out of salt water; it needs evaporation, or distillation to recover the water. Two miscible liquids need fractional distillation, not filtration or a separating funnel.",
        },
      ],
    },
  ],
};
