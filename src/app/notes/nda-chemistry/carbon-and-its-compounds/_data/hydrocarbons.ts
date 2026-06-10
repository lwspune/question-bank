import type { SubtopicNote } from "@/app/notes/_types";

export const HYDROCARBONS_NOTE: SubtopicNote = {
  subtopicName: "Hydrocarbons and Organic Classification",
  title: "Hydrocarbons and Organic Classification",
  oneLineDefinition:
    "Hydrocarbons are compounds of only carbon and hydrogen, grouped into homologous series (alkanes, alkenes, alkynes) each with its own general formula and trends.",
  whyItMatters:
    "Small but reliable — the bank asks which homologous series a formula belongs to, orders boiling points by chain length, and tests the historic organic-vs-inorganic boundary that Wöhler's urea synthesis erased. " +
    "The general formulas are the one piece of pure recall here.",
  concepts: [
    // homologous series + general formulas (formula variant)
    {
      kind: "formula" as const,
      slug: "homologous-series",
      name: "Homologous series and general formulas",
      intuition:
        "A homologous series is a family of hydrocarbons that share a general formula and differ from the next member by one CH₂ unit. Knowing the general formula lets you classify any hydrocarbon on sight: count the carbons, check the hydrogens.",
      definition:
        "The three open-chain series and their general formulas (n = number of carbon atoms):\n" +
        "- **Alkanes** (single bonds, saturated): **CₙH₂ₙ₊₂** — e.g. CH₄, C₂H₆.\n" +
        "- **Alkenes** (one C=C double bond): **CₙH₂ₙ** — e.g. C₂H₄, C₄H₈.\n" +
        "- **Alkynes** (one C≡C triple bond): **CₙH₂ₙ₋₂** — e.g. C₂H₂, C₃H₄.\n" +
        "**Boiling point rises with chain length** — bigger molecules have stronger forces between them.",
      formula: {
        label: "General formulas of hydrocarbon series",
        latex: "\\text{Alkane: } \\text{C}_n\\text{H}_{2n+2} \\qquad \\text{Alkene: } \\text{C}_n\\text{H}_{2n} \\qquad \\text{Alkyne: } \\text{C}_n\\text{H}_{2n-2}",
      },
      pyqExampleId: "ad471085-412e-4917-b22a-7247498aabcd", // C4H8 belongs to alkenes
      authoredExample: {
        prompt: "To which homologous series does C₃H₄ belong?",
        steps: [
          "Count carbons: n = 3.",
          "Test alkane CₙH₂ₙ₊₂ = C₃H₈ (no), alkene CₙH₂ₙ = C₃H₆ (no), alkyne CₙH₂ₙ₋₂ = C₃H₄ (yes).",
          "C₃H₄ matches the alkyne formula (it is propyne).",
        ],
        answer: "Alkynes — C₃H₄ fits CₙH₂ₙ₋₂ (propyne).",
      },
      selfCheckExample: {
        prompt: "Arrange propane, butane, pentane and octane in increasing order of boiling point.",
        steps: [
          "Boiling point rises with the number of carbon atoms (longer chain, stronger forces).",
          "Carbon counts: propane 3, butane 4, pentane 5, octane 8.",
          "So the order follows the carbon count.",
        ],
        answer: "Propane < Butane < Pentane < Octane.",
      },
      practiceSet: [
        { prompt: "General formula of an alkane?", answer: "CₙH₂ₙ₊₂" },
        { prompt: "General formula of an alkene?", answer: "CₙH₂ₙ" },
        { prompt: "Which series does C₂H₂ (ethyne) belong to?", answer: "Alkynes", method: "CₙH₂ₙ₋₂ with n = 2" },
        { prompt: "Does boiling point increase or decrease with chain length?", answer: "Increases" },
      ],
      traps: [
        {
          title: "CₙH₂ₙ is shared by alkenes and cycloalkanes",
          body:
            "An open-chain CₙH₂ₙ is an **alkene**, but a ring (cycloalkane) has the same formula. For the bank's classification question on an open-chain formula like C₄H₈, the intended answer is **alkene**.",
        },
      ],
    },

    // organic vs inorganic + Wöhler (reference variant)
    {
      kind: "reference" as const,
      slug: "organic-vs-inorganic",
      name: "Organic vs inorganic — and Wöhler's synthesis",
      intuition:
        "'Organic' once meant 'made by living things' and was thought impossible to make in a lab — until Wöhler made urea from an inorganic salt in 1828, breaking the vital-force theory. " +
        "Today organic = carbon compounds (with a few inorganic exceptions like carbonates, CO and CO₂). The bank tests the odd-one-out: which listed compound is NOT organic.",
      definition:
        "The historic boundary and the bank's examples:\n" +
        "- **Marsh gas** = **methane (CH₄)** — organic.\n" +
        "- **Urea** — organic; **first synthesised by Wöhler (1828)** from ammonium cyanate, disproving the vital-force theory.\n" +
        "- **Cane sugar (sucrose)** — organic (a carbohydrate).\n" +
        "- **Ammonium cyanate (NH₄OCN)** — an **inorganic** ionic salt (Wöhler's starting material).\n" +
        "- Carbon forms the **largest number of compounds** of any element, because of catenation and tetra-valency.",
      table: {
        columns: ["Compound", "Organic or inorganic", "Note"],
        rows: [
          { cells: ["Marsh gas (methane, CH₄)", "Organic", "Simplest alkane"] },
          {
            cells: ["Urea", "Organic", "First lab-synthesised organic compound (Wöhler, 1828)"],
            noteAmber: "Wöhler made urea FROM ammonium cyanate — the product is organic, the starting salt is inorganic.",
          },
          { cells: ["Cane sugar (sucrose)", "Organic", "A carbohydrate"] },
          { cells: ["Ammonium cyanate (NH₄OCN)", "Inorganic", "An ionic salt — Wöhler's precursor"] },
        ],
      },
      pyqExampleId: "f5283a4b-9c28-4f5a-8661-35853d7dfeca", // ammonium cyanate is NOT organic
      practiceSet: [
        { prompt: "What is the common name of methane?", answer: "Marsh gas" },
        { prompt: "Who first synthesised urea, and in which year?", answer: "Wöhler, 1828" },
        { prompt: "Is ammonium cyanate organic or inorganic?", answer: "Inorganic", method: "it is an ionic salt" },
        { prompt: "Which element forms the largest number of compounds?", answer: "Carbon" },
      ],
      traps: [
        {
          title: "The starting salt is inorganic, the product is organic",
          body:
            "Ammonium cyanate (NH₄OCN) is the **inorganic** answer to 'which is NOT organic', even though Wöhler turned it into urea (organic). Don't let the urea connection fool you into calling the salt organic.",
        },
      ],
    },
  ],
};
