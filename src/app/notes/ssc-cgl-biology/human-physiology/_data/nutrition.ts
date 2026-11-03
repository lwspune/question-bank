import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BHP_NUTRITION_NOTE: SubtopicNote = {
  subtopicName: "Nutrition, Vitamins and Minerals",
  title: "Nutrition, Vitamins and Minerals",
  oneLineDefinition:
    "What each food group does and where it comes from, deficiency diseases, other names for vitamins, and the salt disorders named by their Latin roots.",
  whyItMatters:
    "Ten questions in the bank: six from the 2023 shifts and four from the 2024 shifts. They ask a food group's role, a source, a deficiency or a vitamin's chemical name, so the two tables cover them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbhpnu-nutrients",
      name: "Food groups, sources and deficiencies",
      intuition:
        "Food does three jobs: energy, building and protection. Each group has a job and a typical food, and a missing group leaves a known disease.",
      definition:
        "The groups:\n" +
        "- **Proteins**: **body-building** food (egg white, pulses).\n" +
        "- **Carbohydrates** (wheat) and **fats** (butter, cheese): **energy-giving**.\n" +
        "- **Vitamins and minerals**: **protective**; they let the body carry out its **metabolic reactions**.\n" +
        "- **Vitamin C**: citrus fruits such as **lemon**.\n\n" +
        "Disorders and terms:\n" +
        "- **Kwashiorkor**: lack of **protein** (not fat); children may stay **stunted**.\n" +
        "- **Natr-** means sodium and **kal-** potassium: low blood sodium is **hyponatremia**, low potassium hypokalemia.\n" +
        "- **Non-perishable** foods are dry: **pulses**, grains, sugar. Milk, curds and meat spoil quickly.",
      table: {
        columns: ["Food", "Rich in"],
        rows: [
          { cells: ["Egg white", "Protein"], pyqExampleId: "c3501c86-62f2-4490-aab0-208ced3031f5" },
          { cells: ["Butter and cheese", "Fat"] },
          { cells: ["Wheat", "Carbohydrate"] },
          { cells: ["Lemon", "Vitamin C"] },
        ],
      },
      pyqExampleId: "9cd4b096-4ff6-40f7-94c4-60f0ca0157f8",
      selfCheckExample: {
        prompt: "A child's diet has enough calories but almost no protein. Which disease is likely, and what does it do to growth?",
        steps: ["Protein lack with adequate calories causes kwashiorkor.", "It causes swelling and can leave the child stunted for life."],
        answer: "Kwashiorkor; it can stunt growth permanently.",
      },
      practiceSet: [
        { prompt: "What is the medical name for low blood sodium?", answer: "Hyponatremia" },
        { prompt: "Are pulses perishable?", answer: "No; they are non-perishable" },
        { prompt: "Which food group is called protective food?", answer: "Vitamins and minerals" },
      ],
      traps: [
        {
          title: "Kwashiorkor is protein, not fat",
          body: "A statement that **kwashiorkor** comes from a lack of **fat** is false. It is a **protein** deficiency.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbhpnu-vitamins",
      name: "Vitamins: names and deficiencies",
      intuition:
        "Each vitamin has a chemical name and a sign of deficiency. SSC gives one and asks the other.",
      definition:
        "The vitamins:\n" +
        "- **A**: retinol.\n" +
        "- **B2**: riboflavin; lack causes **cheilosis**, cracks at the corners of the mouth.\n" +
        "- **B6**: pyridoxine, pyridoxal, pyridoxamine.\n" +
        "- **C**: **ascorbic acid**; lack causes scurvy.\n" +
        "- **D**: lack causes rickets. **Ergocalciferol** (vitamin **D2**) treats hypoparathyroidism and resistant rickets.\n" +
        "- **E**: tocopherol.",
      table: {
        columns: ["Vitamin", "Chemical name", "Deficiency sign"],
        rows: [
          { cells: ["B2", "Riboflavin", "Cheilosis"], pyqExampleId: "ca74818a-e424-48b5-95d2-afa75d2f517f" },
          { cells: ["C", "Ascorbic acid", "Scurvy"] },
          { cells: ["D2", "Ergocalciferol", "Rickets"], pyqExampleId: "28e53478-6b39-42fc-a650-ff844fa578b3" },
        ],
      },
      pyqExampleId: "c81dd4cf-eca8-447d-9526-3734d7e29825",
      selfCheckExample: {
        prompt: "Pyridoxine is offered as another name for vitamin C. Which vitamin is it really?",
        steps: ["Vitamin C is ascorbic acid.", "Pyridoxine, pyridoxal and pyridoxamine are forms of vitamin B6."],
        answer: "Vitamin B6.",
      },
      practiceSet: [
        { prompt: "Which vitamin is retinol?", answer: "Vitamin A" },
        { prompt: "Lack of which vitamin causes cheilosis?", answer: "Vitamin B2 (riboflavin)" },
        { prompt: "What is tocopherol?", answer: "Vitamin E" },
      ],
      traps: [
        {
          title: "Pyridoxine is B6",
          body: "The three **pyridox-** names all belong to **vitamin B6**. Vitamin C is **ascorbic acid**.",
        },
      ],
    },
  ],
};
