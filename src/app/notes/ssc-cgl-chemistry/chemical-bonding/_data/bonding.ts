import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CCB_BONDING_NOTE: SubtopicNote = {
  subtopicName: "Valency, Oxidation Numbers and Atomicity",
  title: "Valency, Oxidation Numbers and Atomicity",
  oneLineDefinition:
    "Writing a formula from valencies, variable valency and the old -ous and -ic names, working out an oxidation number, and how many atoms make up a molecule of an element.",
  whyItMatters:
    "Seven questions in the bank: four from the 2023 shifts and three from the 2024 shifts. The oxidation-number sum is the one with working; the rest are single facts.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssccbbo-valency",
      name: "Valency and oxidation numbers",
      intuition:
        "A neutral compound's charges cancel. So the oxidation numbers of all its atoms add to zero, which lets you solve for the one you do not know.",
      definition:
        "Valency and formulas:\n" +
        "- Cross the valencies: Mg (2) and OH (1) give **Mg(OH)2**.\n" +
        "- **Variable valency**: **iron** is 2 (ferrous) or 3 (ferric).\n" +
        "- Old names: **-ous** is the lower valency, **-ic** the higher. Argentous is silver(I); **argentic** is silver(II), valency **+2**.\n\n" +
        "Oxidation numbers: H is +1 and O is minus 2 in most compounds; the total for a neutral compound is **0**.",
      formula: {
        latex: "\\sum \\text{oxidation numbers} = 0",
        label: "Neutral compound",
        symbols: [{ symbol: "0", meaning: "The charge of a neutral compound" }],
      },
      authoredExample: {
        prompt: "Find the oxidation number of manganese in KMnO4.",
        steps: ["K is +1 and each O is minus 2, so the four O give minus 8.", "+1 + x minus 8 = 0, so x = +7."],
        answer: "+7.",
      },
      pyqExampleId: "cbde04b3-b4fc-443a-afe3-8f50e1a39bfa",
      selfCheckExample: {
        prompt: "Write the formula of aluminium oxide from the valencies Al 3 and O 2.",
        steps: ["Cross the valencies: Al takes 2 and O takes 3.", "That gives Al2O3, with charges 2 x 3 = 6 and 3 x 2 = 6."],
        answer: "Al2O3.",
      },
      practiceSet: [
        { prompt: "What is iron's valency in ferric oxide?", answer: "3" },
        { prompt: "What is the oxidation number of sulphur in H2SO4?", answer: "+6" },
        { prompt: "Which suffix marks the higher valency, -ous or -ic?", answer: "-ic" },
      ],
      traps: [
        {
          title: "Metal ions are never negative",
          body: "A valency for **argentic** silver of minus 1 or minus 2 cannot be right: a metal ion is positive. Argentic is **+2**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccbbo-atomicity",
      name: "Atomicity",
      intuition:
        "Atomicity is how many atoms make up one molecule of an element. Noble gases stand alone; the common gases pair up.",
      definition:
        "The kinds:\n" +
        "- **Monoatomic**: noble gases such as **helium**.\n" +
        "- **Diatomic**: **chlorine** (Cl2), oxygen (O2), hydrogen, nitrogen. Carbon monoxide is a diatomic molecule too.\n" +
        "- **Triatomic**: ozone (O3): 18 valence electrons, with one double and one single bond in its Lewis structure.\n" +
        "- **Polyatomic**: phosphorus (P4), sulphur (S8).",
      table: {
        columns: ["Element", "Atomicity"],
        rows: [
          { cells: ["Helium", "1"], pyqExampleId: "13de4303-8087-48bf-9a97-95b92f615553" },
          { cells: ["Chlorine", "2"], pyqExampleId: "34717c44-6223-4bc8-8c04-21c9aec4ba71" },
          { cells: ["Ozone", "3"] },
          { cells: ["Phosphorus", "4"] },
        ],
      },
      pyqExampleId: "34717c44-6223-4bc8-8c04-21c9aec4ba71",
      selfCheckExample: {
        prompt: "What is the atomicity of ozone, and of sulphur?",
        steps: ["Ozone is O3: three atoms.", "Sulphur is S8: eight atoms, so polyatomic."],
        answer: "Ozone 3; sulphur 8.",
      },
      practiceSet: [
        { prompt: "Is argon monoatomic or diatomic?", answer: "Monoatomic" },
        { prompt: "What is the atomicity of phosphorus?", answer: "4" },
        { prompt: "How many valence electrons does O3 have?", answer: "18" },
      ],
      traps: [
        {
          title: "Chlorine is diatomic",
          body: "Chlorine gas is **Cl2**, so **diatomic**. Only noble gases are monoatomic among the gases SSC lists.",
        },
      ],
    },
  ],
};
