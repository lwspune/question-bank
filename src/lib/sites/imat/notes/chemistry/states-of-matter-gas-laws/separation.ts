import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_GAS_SEPARATION_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Separation",
  title: "Pure Substances, Mixtures and Separation Techniques",
  oneLineDefinition:
    "Elements and compounds are pure substances with fixed properties; mixtures can be separated by physical methods that exploit a difference in size, solubility, boiling point or attraction.",
  whyItMatters:
    "No past IMAT question has been set on this page yet, but it is in the official syllabus. Expect a short fact: which technique separates a given mixture, or whether a material is an element, a compound or a mixture.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gas-pure-mixtures",
      name: "Elements, compounds and mixtures",
      intuition:
        "A pure substance is one kind of thing all the way through, so it has a fixed composition and sharp melting and boiling points. A mixture is two or more substances mingled without bonding, so its composition can vary and it can be pulled apart without a chemical reaction.",
      definition:
        "- An **element** contains only one kind of atom and cannot be split into simpler substances by chemical means.\n" +
        "- A **compound** is two or more elements **chemically bonded** in a **fixed ratio**. Its properties differ from those of its elements, and only a chemical reaction can separate them.\n" +
        "- A **mixture** contains substances that are not bonded together; its composition can vary.\n" +
        "- **Homogeneous** mixtures (solutions, air, alloys) look the same throughout. **Heterogeneous** mixtures (sand in water, oil and water) have visibly different parts.\n" +
        "- A **pure** substance melts and boils at sharp, fixed temperatures; an impure one melts and boils over a range.",
      table: {
        columns: ["Type", "What it is", "Examples", "How it can be separated"],
        rows: [
          { cells: ["Element", "One kind of atom", "Iron, oxygen gas, \\(\\mathrm{S_8}\\)", "Cannot be broken down chemically"] },
          { cells: ["Compound", "Elements bonded in a fixed ratio", "Water, sodium chloride, carbon dioxide", "Only by a chemical reaction"] },
          { cells: ["Homogeneous mixture", "Uniform throughout, one phase", "Salt water, air, brass", "Physical methods such as distillation"] },
          { cells: ["Heterogeneous mixture", "Not uniform, visible parts", "Sand in water, oil and water, granite", "Physical methods such as filtration"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following is a compound?",
        options: ["Air", "Brass", "Sea water", "Carbon dioxide", "Oxygen gas"],
        steps: [
          "Carbon dioxide is carbon and oxygen bonded in a fixed 1 : 2 ratio, so it is a compound.",
          "Air, brass (copper and zinc) and sea water are mixtures of varying composition. Oxygen gas is an element, even though its molecules contain two atoms.",
        ],
        answer: "(D) Carbon dioxide",
      },
      practiceSet: [
        { prompt: "Is steel an element, a compound or a mixture?", answer: "A homogeneous mixture (an alloy of iron with carbon and other elements)" },
        { prompt: "A white solid melts gradually between 118 °C and 124 °C. Is it pure?", answer: "No: a pure substance melts at one sharp temperature" },
        { prompt: "Is distilled water a pure substance?", answer: "Yes: it is the compound \\(\\mathrm{H_2O}\\)" },
      ],
      traps: [
        {
          title: "Looking uniform does not make a substance pure",
          body: "Salt water and air look the same throughout, but they are homogeneous mixtures: their composition can change and their parts can be separated physically. A pure substance has a fixed composition and sharp melting and boiling points.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gas-separation",
      name: "Separation techniques: filtration, distillation, chromatography and others",
      intuition:
        "Every separation method uses one property in which the parts of a mixture differ. Different particle sizes suggest filtration, different boiling points suggest distillation, different attractions to a surface suggest chromatography. Name the difference first and the method follows.",
      definition:
        "- **Filtration** separates an insoluble solid from a liquid: the solid stays on the filter paper as the residue, the liquid passes through as the filtrate.\n" +
        "- **Evaporation** and **crystallisation** recover a dissolved solid from its solution.\n" +
        "- **Simple distillation** recovers a solvent from a solution (pure water from salt water). **Fractional distillation** separates miscible liquids with different boiling points (ethanol and water, crude oil, liquid air).\n" +
        "- **Chromatography** separates dissolved substances, such as the dyes in an ink, by how strongly each is attracted to the stationary phase (paper) compared with the mobile phase (solvent). \\(R_f\\) = distance moved by the spot / distance moved by the solvent front, always between 0 and 1.\n" +
        "- A **separating funnel** separates immiscible liquids; **centrifugation** separates suspended solids by density (blood cells from plasma).",
      table: {
        columns: ["Technique", "Separates", "Based on", "Example"],
        rows: [
          { cells: ["Filtration", "Insoluble solid from a liquid", "Particle size", "Sand from water"] },
          { cells: ["Evaporation or crystallisation", "Dissolved solid from its solution", "The solvent is volatile, the solid is not", "Salt from sea water"] },
          { cells: ["Simple distillation", "Solvent from a solution", "Very different boiling points", "Pure water from salt water"] },
          { cells: ["Fractional distillation", "Miscible liquids", "Boiling points closer together", "Ethanol from water; fractions of crude oil"] },
          { cells: ["Chromatography", "Dissolved substances in small amounts", "Attraction to the stationary and mobile phases", "Dyes in an ink; amino acids"] },
          { cells: ["Separating funnel", "Immiscible liquids", "Density; liquids do not mix", "Oil from water"] },
          { cells: ["Centrifugation", "Suspended solid from a liquid", "Density", "Blood cells from plasma"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Ethanol (boiling point 78 °C) and water mix completely. Which technique is used to obtain a liquid rich in ethanol from the mixture?",
        options: ["Filtration", "Separating funnel", "Fractional distillation", "Crystallisation", "Centrifugation"],
        steps: [
          "Ethanol and water are miscible liquids with boiling points 22 degrees apart.",
          "Fractional distillation separates such liquids: the vapour richer in the lower-boiling ethanol rises up the column and is condensed.",
          "A and E need a solid. B needs liquids that do not mix. D recovers a dissolved solid.",
        ],
        answer: "(C) Fractional distillation",
      },
      practiceSet: [
        { prompt: "In paper chromatography the solvent front moves 8.0 cm and a dye spot moves 3.0 cm. What is the \\(R_f\\) of the dye?", answer: "About 0.38", method: "\\(3.0/8.0\\)" },
        { prompt: "How do you obtain dry salt from a mixture of sand, salt and water?", answer: "Filter off the sand, then evaporate or crystallise the salt from the filtrate" },
        { prompt: "Which technique separates oil from water?", answer: "A separating funnel" },
        { prompt: "Which technique separates red blood cells from plasma?", answer: "Centrifugation" },
      ],
      traps: [
        {
          title: "Filtration cannot remove a dissolved substance",
          body: "A dissolved solid passes through filter paper with the solvent. To get salt out of salt water you must evaporate the water, or distil it off. Filtration only removes undissolved solids.",
        },
      ],
    },
  ],
};
