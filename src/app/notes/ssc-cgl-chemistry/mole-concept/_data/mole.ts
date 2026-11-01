import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CMO_MOLE_NOTE: SubtopicNote = {
  subtopicName: "The Mole and the Laws of Combination",
  title: "The Mole and the Laws of Combination",
  oneLineDefinition:
    "Avogadro's number, the percentage of an element in a compound, balancing an equation, and the laws of chemical combination with the people and years behind them.",
  whyItMatters:
    "Seven questions in the bank: two from the 2023 shifts and five from the 2024 shifts. Three are short sums (a percentage or a balanced equation) that the one formula on this page answers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssccmomo-mole",
      name: "Percentage composition and balancing",
      intuition:
        "Add up the masses of all the atoms to get the molar mass. An element's share is its own mass over that total.",
      definition:
        "The steps:\n" +
        "- **Molar mass**: add the atomic masses (H 1, C 12, O 16, S 32).\n" +
        "- **Percentage of an element** = its mass in one formula / molar mass x 100. The percentages add to 100.\n" +
        "- **Avogadro's constant**: **6.022 x 10^23** particles in a mole.\n" +
        "- **Balancing**: match carbon, then hydrogen, then oxygen. Burning ethanol, C2H5OH + 3O2 gives **2CO2 + 3H2O**.",
      formula: {
        latex: "\\%\\ \\text{element} = \\frac{\\text{mass of element in formula}}{\\text{molar mass}} \\times 100",
        label: "Percentage composition",
        symbols: [{ symbol: "molar mass", meaning: "Sum of the atomic masses in one formula" }],
      },
      authoredExample: {
        prompt: "Find the percentage of sulphur in H2SO3.",
        steps: ["Molar mass = 2 + 32 + 48 = 82.", "Sulphur = 32 / 82 x 100, about 39%."],
        answer: "About 39%.",
      },
      pyqExampleId: "f81e6dc7-649d-4ad8-9203-7587983e88f7",
      selfCheckExample: {
        prompt: "What percentage of water (H2O) is oxygen by mass?",
        steps: ["Molar mass = 2 + 16 = 18.", "Oxygen = 16 / 18 x 100, about 88.9%."],
        answer: "About 88.9%.",
      },
      practiceSet: [
        { prompt: "What is Avogadro's constant?", answer: "6.022 x 10^23 per mole" },
        { prompt: "What is the molar mass of glucose, C6H12O6?", answer: "180" },
        { prompt: "How many O2 molecules balance one ethanol molecule burning?", answer: "Three" },
      ],
      traps: [
        {
          title: "Check the percentages add to 100",
          body: "In a composition question the options often list the right numbers in the wrong order. Match each to its element, then check they add to 100.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccmomo-laws",
      name: "The laws and their discoverers",
      intuition:
        "Each law of chemical combination has one name attached. SSC asks the name or the year.",
      definition:
        "The laws:\n" +
        "- **Conservation of mass**: **Lavoisier**, set out in his 1789 Elementary Treatise. He also published the **Method of Chemical Nomenclature** in **1787**, the basis of today's compound names.\n" +
        "- **Definite proportions**: Proust. **Multiple proportions**: Dalton.\n" +
        "- **Avogadro** (**1811**): equal volumes of gases at the same temperature and pressure hold equal numbers of molecules. This reconciled Dalton's atoms with Gay-Lussac's combining volumes.",
      table: {
        columns: ["Law or work", "Who and when"],
        rows: [
          { cells: ["Conservation of mass", "Lavoisier"] },
          { cells: ["Method of Chemical Nomenclature", "Lavoisier, 1787"], pyqExampleId: "de143edf-4c55-4eb0-a5e8-5f07da0c266b" },
          { cells: ["Equal volumes, equal molecules", "Avogadro, 1811"], pyqExampleId: "a36b2d80-d945-4889-8d79-1007ec193012" },
          { cells: ["Definite proportions", "Proust"] },
          { cells: ["Multiple proportions", "Dalton"] },
        ],
      },
      pyqExampleId: "4f4ab0e8-52f9-498c-acde-74c63a502806",
      selfCheckExample: {
        prompt: "Whose law says a compound always contains its elements in the same fixed proportion by mass?",
        steps: ["Fixed proportion by mass is the law of definite proportions.", "It was stated by Joseph Proust."],
        answer: "Proust's.",
      },
      practiceSet: [
        { prompt: "Who gave the law of multiple proportions?", answer: "John Dalton" },
        { prompt: "In which year did Avogadro state his hypothesis?", answer: "1811" },
        { prompt: "Whose work is the basis of modern compound names?", answer: "Lavoisier's" },
      ],
      traps: [
        {
          title: "Mass is Lavoisier, energy is physics",
          body: "Lavoisier's law is **conservation of mass**. Conservation of **energy** belongs to physics and is the decoy.",
        },
      ],
    },
  ],
};
