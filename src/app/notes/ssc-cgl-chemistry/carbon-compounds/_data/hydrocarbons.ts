import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CCC_HYDROCARBONS_NOTE: SubtopicNote = {
  subtopicName: "Hydrocarbons and Fuels",
  title: "Hydrocarbons and Fuels",
  oneLineDefinition:
    "The general formulas of alkanes, alkenes and alkynes with names for each carbon count, old and common names, how hydrocarbons burn, boiling points, and the chemists SSC names.",
  whyItMatters:
    "Thirteen questions in the bank: nine from the 2023 shifts and four from the 2024 shifts. Half need one general formula to answer, so learn the three formulas and you can name any chain.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscccchy-formulas",
      name: "Alkanes, alkenes, alkynes and their names",
      intuition:
        "A hydrocarbon's family sets how many hydrogens go with n carbons. Single bonds only: 2n + 2. One double bond: 2n. One triple bond: 2n minus 2.",
      definition:
        "The families:\n" +
        "- **Alkanes** (saturated): CnH(2n+2). Propane is C3H8; **nonane** is C9H20.\n" +
        "- **Alkenes**: CnH(2n). Ethene C2H4, **propene C3H6**.\n" +
        "- **Alkynes**: CnH(2n minus 2). Ethyne C2H2, propyne C3H4.\n" +
        "- Benzene C6H6 is unsaturated.\n\n" +
        "Names and facts:\n" +
        "- **Olefiant gas** is the old name of **ethylene**. **1,3-dimethylbenzene** is **m-xylene**; toluene is methylbenzene.\n" +
        "- **Unsaturated** hydrocarbons burn with a **yellow, sooty** flame; saturated ones with a blue flame. Ethanol burns to CO2 and water, giving **heat and light**.\n" +
        "- For the same carbon count, **alkynes** boil highest. Methane boils at 111 K, chloroform at 334 K.\n" +
        "- **Fullerene** (C60) was found by Curl, Kroto and Smalley in **1985**.",
      table: {
        columns: ["Compound or term", "Fact"],
        rows: [
          { cells: ["Propene", "C3H6"], pyqExampleId: "aba672b1-ebbe-42e4-b7f9-ba25dbbadc2d" },
          { cells: ["C9H20", "Nonane"], pyqExampleId: "6dfcf4a6-6622-4cd2-90d9-5590f56a2283" },
          { cells: ["Olefiant gas", "Ethylene"], pyqExampleId: "adbd8b3b-f2bb-4ac6-bfed-9b9a8bd67597" },
          { cells: ["1,3-dimethylbenzene", "m-xylene"], pyqExampleId: "e5831881-15d3-43f3-a05b-79e946b6fb54" },
          { cells: ["Unsaturated flame", "Yellow and sooty"], pyqExampleId: "8d5c979c-178a-4f98-b393-2948363de277" },
          { cells: ["Fullerene", "1985"], pyqExampleId: "516a7b66-4b84-468d-9d06-3e4976a53bd2" },
        ],
      },
      pyqExampleId: "6dbb23b0-bb44-470f-b2f9-a5c74bdee286",
      selfCheckExample: {
        prompt: "Write the formula of the alkyne with five carbon atoms.",
        steps: ["Alkynes follow CnH(2n minus 2).", "For n = 5: 2 x 5 minus 2 = 8, so C5H8."],
        answer: "C5H8 (pentyne).",
      },
      practiceSet: [
        { prompt: "Which family does C4H8 belong to?", answer: "Alkenes" },
        { prompt: "What is toluene's other name?", answer: "Methylbenzene" },
        { prompt: "Of alkanes, alkenes and alkynes with the same carbons, which boils highest?", answer: "Alkynes" },
      ],
      traps: [
        {
          title: "Benzene is not saturated",
          body: "**C6H6** looks compact, but benzene is **unsaturated**. The saturated choice is the one that fits CnH(2n+2).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscccchy-chemists",
      name: "Chemists behind the rules",
      intuition:
        "A few questions name a chemist and a year. Learn each with the one idea it is remembered for.",
      definition:
        "The names:\n" +
        "- **Michael Faraday** isolated **benzene** in **1825**, from illuminating gas.\n" +
        "- **Erich Huckel** (**1931**): a ring is **aromatic** if it has **4n + 2** pi electrons.\n" +
        "- **Kharasch and Mayo** (**1933**): the **peroxide effect**, HBr adding against Markovnikov's rule when peroxides are present.\n" +
        "- **Kekule** proposed the ring structure of benzene.",
      table: {
        columns: ["Chemist", "Remembered for"],
        rows: [
          { cells: ["Faraday, 1825", "Discovered benzene"] },
          { cells: ["Kharasch and Mayo, 1933", "Peroxide effect"], pyqExampleId: "21588c93-c55d-46bd-a31b-3440189382b1" },
          { cells: ["Kekule", "Benzene ring structure"] },
        ],
      },
      pyqExampleId: "0d349432-58e9-4f5a-8dd0-349f2b47a243",
      selfCheckExample: {
        prompt: "Benzene has 6 pi electrons. Does it satisfy the 4n + 2 rule, and for what n?",
        steps: ["Set 4n + 2 = 6.", "Then n = 1, a whole number, so the rule is met."],
        answer: "Yes, with n = 1.",
      },
      practiceSet: [
        { prompt: "Who discovered benzene?", answer: "Michael Faraday" },
        { prompt: "What is the peroxide effect also called?", answer: "The Kharasch effect" },
        { prompt: "Who proposed the ring structure of benzene?", answer: "Friedrich Kekule" },
      ],
      traps: [
        {
          title: "Huckel, not Kekule",
          body: "The **4n + 2** rule for aromatic rings is **Huckel's**. Kekule gave benzene's ring structure.",
        },
      ],
    },
  ],
};
