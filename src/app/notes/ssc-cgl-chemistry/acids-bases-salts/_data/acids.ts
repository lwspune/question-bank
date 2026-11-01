import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CAB_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Acids, Bases and Their Reactions",
  title: "Acids, Bases and Their Reactions",
  oneLineDefinition:
    "Acetic acid and vinegar, baking soda in milk and fire extinguishers, what a metal and a dilute acid give, and the order of strength of the alkali hydroxides.",
  whyItMatters:
    "Eight questions in the bank: one from the 2023 shifts and seven from the 2024 shifts, seven of them EASY. Three ask the same reaction (a metal with dilute sulphuric acid), so the one general rule here answers them all.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssccabac-daily",
      name: "Acids and bases at home",
      intuition:
        "Two kitchen chemicals carry most of these questions: vinegar, an acid, and baking soda, a mild base.",
      definition:
        "Acids:\n" +
        "- **Ethanoic acid** is **acetic acid**; **vinegar** is a 5 to 8% solution of it, used as a **souring agent** in pickles and sauces.\n\n" +
        "Baking soda (**sodium bicarbonate**, NaHCO3):\n" +
        "- A white crystalline powder that neutralises both acids and bases; used as an antacid.\n" +
        "- It gives off CO2 in **soda-acid fire extinguishers**.\n" +
        "- A milkman adds a little to milk to **raise its pH** from about 6 to slightly alkaline, so the milk sours later.",
      table: {
        columns: ["Substance", "Use"],
        rows: [
          { cells: ["Vinegar", "Acetic acid; souring agent"], pyqExampleId: "97316a0a-a5e6-4f94-b748-b22f226d7f5a" },
          { cells: ["Sodium bicarbonate", "Fire extinguishers, antacid"], pyqExampleId: "b37fcb71-8d8c-4ff3-b10c-fd582a3cf80b" },
        ],
      },
      pyqExampleId: "3c1847d5-4b1d-48d9-b2d4-0a2a55a5552e",
      selfCheckExample: {
        prompt: "Which acid is the souring agent in vinegar and pickles?",
        steps: ["Vinegar is a dilute solution of ethanoic acid.", "Ethanoic acid is better known as acetic acid."],
        answer: "Acetic acid.",
      },
      practiceSet: [
        { prompt: "What is the chemical name of baking soda?", answer: "Sodium bicarbonate (sodium hydrogencarbonate)" },
        { prompt: "Does baking soda raise or lower the pH of milk?", answer: "Raises it" },
        { prompt: "What gas does a soda-acid extinguisher release?", answer: "Carbon dioxide" },
      ],
      traps: [
        {
          title: "Alkaline means a higher pH",
          body: "Making milk **slightly alkaline** means **raising** its pH. Options saying the soda reduces the pH to alkaline are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccabac-reactions",
      name: "Metals with acids, and base strength",
      intuition:
        "A reactive metal pushes hydrogen out of a dilute acid. The metal joins the acid's other part to make a salt, and hydrogen bubbles off.",
      definition:
        "The rule: **metal + dilute acid gives salt + hydrogen**.\n" +
        "- Zinc + sulphuric acid gives **zinc sulphate** + **hydrogen** (it burns with a pop).\n" +
        "- Magnesium + dilute sulphuric acid gives magnesium sulphate + **hydrogen**. Sulphur dioxide comes only from hot, concentrated acid.\n\n" +
        "Base strength: down Group 1 the hydroxides grow stronger: **CsOH > KOH > NaOH > LiOH**.",
      table: {
        columns: ["Reaction", "Products"],
        rows: [
          { cells: ["Zn + H2SO4", "ZnSO4 + H2"], pyqExampleId: "1dbe51af-6e5f-4310-b4dc-e455bdcdee62" },
          { cells: ["Mg + dilute H2SO4", "MgSO4 + H2"], pyqExampleId: "24ed008d-b05d-4bb6-8a34-cb00f2969103" },
          { cells: ["Strongest alkali hydroxide", "CsOH"], pyqExampleId: "eae59de9-920d-45f1-8589-fdf62633605a" },
        ],
      },
      pyqExampleId: "3a76f7d1-054b-4468-95b9-d102d420c266",
      selfCheckExample: {
        prompt: "Iron reacts with dilute hydrochloric acid. Name the salt and the gas.",
        steps: ["Metal plus dilute acid gives a salt and hydrogen.", "Iron with hydrochloric acid gives iron chloride."],
        answer: "Iron(II) chloride and hydrogen.",
      },
      practiceSet: [
        { prompt: "What gas burns with a pop?", answer: "Hydrogen" },
        { prompt: "Which is the weakest of LiOH, NaOH, KOH, CsOH?", answer: "LiOH" },
        { prompt: "What salt forms from zinc and sulphuric acid?", answer: "Zinc sulphate" },
      ],
      traps: [
        {
          title: "Dilute acid gives hydrogen, not SO2",
          body: "With **dilute** sulphuric acid, metals give **hydrogen**. Sulphur dioxide is the decoy; it needs hot, concentrated acid.",
        },
      ],
    },
  ],
};
