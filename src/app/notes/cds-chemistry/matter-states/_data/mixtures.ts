import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MS_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Compounds, Mixtures and Solutions",
  title: "Elements, Compounds and Mixtures",
  oneLineDefinition:
    "What separates a compound from a mixture, how to sort everyday substances into each, and how to state a solution's concentration as a mass percentage.",
  whyItMatters:
    "Six CDS questions. Five ask the same thing in different words: a compound has a fixed composition and cannot be separated by physical means, a mixture can. One is a short concentration calculation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschms-compounds",
      name: "Elements, compounds and mixtures",
      intuition:
        "An element is one kind of atom. A compound is two or more elements chemically joined in a fixed ratio, so it has its own properties and can only be split by a chemical change. A mixture is substances simply put together, in any ratio, and can be separated by physical means.",
      definition:
        "The differences:\n" +
        "- **Element**: cannot be broken into simpler substances by chemical means (silicon, tin).\n" +
        "- **Compound**: elements joined in a **fixed ratio by mass**; **one kind of particle**; constituents **cannot** be separated by **physical** methods (sugar, calcium carbonate, water).\n" +
        "- **Mixture**: **variable composition**; separable by physical methods such as evaporation (air, milk, tea, sugar solution).\n" +
        "- **Homogeneous mixture** (solution): uniform throughout, such as sulphur dissolved in carbon disulphide, or salt in water.",
      table: {
        columns: ["Property", "Compound", "Mixture"],
        rows: [
          {
            cells: ["Composition", "Fixed", "Variable"],
            noteAmber: "CDS 2018 (I) and 2026 (I): 'a compound has variable composition' is the wrong statement.",
            pyqExampleId: "dcb43c8c-6444-4e19-a6df-a7caec0cc7e0",
          },
          { cells: ["Particles", "One kind", "Two or more kinds"] },
          {
            cells: ["Separation", "Only by chemical means", "By physical means (evaporation, filtration)"],
            pyqExampleId: "b54a5261-6b32-4003-bf82-9daf201b8ba5",
          },
          {
            cells: ["Examples", "Sugar, calcium carbonate, water", "Air, milk, tea, sugar solution"],
            noteAmber: "Asked in CDS 2023 (II) (sugar) and 2025 (I) (calcium carbonate).",
            pyqExampleId: "600c38f4-8b78-4beb-a2ec-91bfeeb8de00",
          },
        ],
      },
      pyqExampleId: "d634dec6-1218-4d1d-8aee-e0fff2fca59a",
      selfCheckExample: {
        prompt: "Sort these: brass, carbon dioxide, iron, sea water.",
        steps: [
          "Iron is one kind of atom: an element.",
          "Carbon dioxide is carbon and oxygen joined in a fixed ratio: a compound.",
          "Brass (copper and zinc in varying ratios) and sea water (salts in water) have variable composition: mixtures.",
        ],
        answer: "Element: iron. Compound: carbon dioxide. Mixtures: brass and sea water.",
      },
      practiceSet: [
        { prompt: "Is air a compound or a mixture?", answer: "A mixture" },
        { prompt: "Can the elements in a compound be separated by filtration?", answer: "No — only by a chemical change" },
        { prompt: "Is a solution of sulphur in carbon disulphide homogeneous?", answer: "Yes" },
        { prompt: "Is tin an element, a compound or a mixture?", answer: "An element" },
      ],
      traps: [
        {
          title: "A compound's composition is fixed",
          body: "A compound always has its elements in the **same ratio by mass** (law of constant proportions). 'Variable composition' describes a **mixture**.",
        },
        {
          title: "Sugar solution is a mixture",
          body: "Sugar is a compound, but **sugar dissolved in water** is a mixture: you can change how much sugar it holds and recover the sugar by evaporation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschms-concentration",
      name: "Concentration as mass by mass percentage",
      intuition:
        "Concentration says how much solute is in the whole solution. The trap is the denominator: divide by the mass of the solution (solute plus solvent), not by the solvent alone.",
      definition:
        "The formula:\n" +
        "- **Mass of solution = mass of solute + mass of solvent**.\n" +
        "- **Mass by mass %** = (mass of solute ÷ mass of solution) × 100.",
      formula: {
        label: "Mass by mass percentage",
        latex: "\\text{mass \\%} = \\frac{\\text{mass of solute}}{\\text{mass of solute} + \\text{mass of solvent}} \\times 100",
      },
      authoredExample: {
        prompt: "25 g of salt is dissolved in 100 g of water. What is the concentration as a mass by mass percentage?",
        steps: [
          "Mass of solution = 25 + 100 = 125 g.",
          "Mass % = \\(\\frac{25}{125} \\times 100\\).",
          "= 20%.",
        ],
        answer: "20%.",
      },
      selfCheckExample: {
        prompt: "12 g of sugar is dissolved in 188 g of water. Find the mass by mass percentage.",
        steps: [
          "Mass of solution = 12 + 188 = 200 g.",
          "Mass % = \\(\\frac{12}{200} \\times 100 = 6\\)%.",
        ],
        answer: "6%.",
      },
      pyqExampleId: "ab6936be-5179-4b01-9751-d4996c6a3e8a",
      practiceSet: [
        { prompt: "15 g of solute is in 285 g of solvent. What is the mass by mass percentage?", answer: "5%" },
        { prompt: "What is the mass of a solution made from 30 g of solute and 70 g of water?", answer: "100 g" },
        { prompt: "In mass by mass percentage, what goes in the denominator?", answer: "The mass of the whole solution" },
      ],
      traps: [
        {
          title: "Divide by the solution, not the solvent",
          body: "Dividing the solute by the solvent alone gives a number that is too large. Always add the solute to the solvent first.",
        },
      ],
    },
  ],
};
