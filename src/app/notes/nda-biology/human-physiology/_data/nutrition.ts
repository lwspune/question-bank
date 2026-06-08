import type { SubtopicNote } from "@/app/notes/_types";

export const NUTRITION_NOTE: SubtopicNote = {
  subtopicName: "Nutrition, Vitamins and Minerals",
  title: "Nutrition, Vitamins and Minerals",
  oneLineDefinition:
    "A balanced diet supplies seven components; vitamins and minerals are the micronutrients whose deficiency causes specific named diseases.",
  whyItMatters:
    "8 PYQs, and the vitamin-deficiency table is the single highest-yield recall block in the whole chapter — it recurs almost every year. " +
    "Learn each vitamin's chemical name, its deficiency disease, and its source; the bank tests all three angles and sneaks in non-deficiency diseases (rabies, hepatitis) as traps.",
  concepts: [
    // vitamins (REFERENCE) — the big one
    {
      kind: "reference" as const,
      slug: "vitamins-deficiency-sources",
      name: "Vitamins — chemical name, deficiency, and source",
      intuition:
        "Vitamins are micronutrients the body cannot make in sufficient amounts. Each has a letter, a chemical name, a deficiency disease, and a food source — and the NDA can ask from any of those four columns. " +
        "The reliable trap is mixing an infectious disease (rabies, hepatitis) into the options, because those are NOT deficiency diseases.",
      definition:
        "The high-yield vitamin facts:\n" +
        "- **B1 (Thiamin)** — deficiency: beriberi.\n" +
        "- **B2 (Riboflavin)**, **B12 (Cobalamin)** — B12 is uniquely **made by intestinal bacteria** and found in animal foods.\n" +
        "- **C (Ascorbic acid)** — deficiency: **scurvy** (bleeding gums); source: citrus fruits.\n" +
        "- **D (Calciferol)** — deficiency: **rickets** (bone deformity); source: sunlight.\n" +
        "- **K** — needed for **blood clotting**; source: leafy greens + gut bacteria.\n" +
        "- **A (Retinol)** — deficiency: night blindness. **E (Tocopherol)** — antioxidant.",
      table: {
        columns: ["Vitamin", "Chemical name", "Deficiency disease", "Source"],
        rows: [
          { cells: ["A", "Retinol", "Night blindness", "Carrots, liver"] },
          { cells: ["B1", "**Thiamin**", "Beriberi", "Whole grains"] },
          { cells: ["B12", "Cobalamin", "Anaemia", "**Intestinal bacteria**, animal foods"] },
          {
            cells: ["C", "Ascorbic acid", "**Scurvy**", "Citrus fruits"],
            noteAmber: "NDA 2019 — Vitamin C deficiency = scurvy (NOT rickets, which is Vitamin D).",
          },
          { cells: ["D", "Calciferol", "**Rickets**", "Sunlight"] },
          { cells: ["K", "—", "Poor blood clotting", "Leafy greens, gut bacteria"] },
        ],
        caption: "Deficiency diseases only. Rabies and hepatitis are INFECTIOUS — never the answer to a deficiency question.",
      },
      selfCheckExample: {
        prompt:
          "A sailor with no fresh fruit develops bleeding gums. Which vitamin is he lacking, and what is the disease called?",
        steps: [
          "Bleeding gums and poor wound healing are the signs of scurvy.",
          "Scurvy is caused by a deficiency of Vitamin C (ascorbic acid).",
          "Fresh citrus fruits supply Vitamin C — hence the old practice of carrying limes on ships.",
        ],
        answer: "Vitamin C deficiency; the disease is scurvy.",
      },
      practiceSet: [
        { prompt: "Vitamin C deficiency causes which disease?", answer: "Scurvy" },
        { prompt: "Vitamin D deficiency causes which disease?", answer: "Rickets" },
        { prompt: "Which vitamin is made by intestinal bacteria?", answer: "Vitamin B12" },
        { prompt: "Vitamin B1 is also called?", answer: "Thiamin" },
        { prompt: "Which vitamin is needed for blood clotting?", answer: "Vitamin K" },
      ],
      pyqExampleId: "864033cb-c1f3-4399-a4e9-b7672a3dc421", // vit C → scurvy
      traps: [
        {
          title: "Not every disease in the options is a deficiency disease",
          body:
            "A deficiency question may list **rabies** or **hepatitis** among the options — both are **infections**, not nutrient deficiencies. Rickets (D), scurvy (C) and beriberi (B1) are the deficiency answers.",
        },
        {
          title: "Don't confuse the chemical names",
          body:
            "Thiamin = B1, Riboflavin = B2, Retinol = A, Tocopherol = E. The bank lines all four up as options for 'B1 is also known as ___'; the answer is **Thiamin**.",
        },
      ],
    },

    // balanced diet & macronutrients (REFERENCE)
    {
      kind: "reference" as const,
      slug: "balanced-diet-macronutrients",
      name: "Balanced diet and macronutrients",
      intuition:
        "A balanced diet is not just 'food' — it is a specific list of seven components the body needs in the right proportions. " +
        "Alongside it, the NDA tests basic biomolecule facts: all enzymes are proteins, but not all proteins are enzymes.",
      definition:
        "The components and the biomolecule facts the bank tests:\n" +
        "- A **balanced diet** has **seven components**: carbohydrates, proteins, fats, vitamins, minerals, fibre (roughage), and water.\n" +
        "- **Carbohydrates** (e.g. glucose) and **fats** are energy-rich; fats give the most energy per gram.\n" +
        "- **Proteins** build and repair. **All enzymes are proteins, but not all proteins are enzymes** — many are structural (collagen, keratin) or transport (haemoglobin).\n" +
        "- **Fruits and vegetables** are the richest source of vitamins and minerals.",
      table: {
        columns: ["Component", "Main role"],
        rows: [
          { cells: ["Carbohydrates", "Main energy source (glucose)"] },
          { cells: ["Proteins", "Growth and repair"] },
          { cells: ["Fats", "Energy store (most energy per gram)"] },
          { cells: ["Vitamins + Minerals", "Micronutrients (from fruits and vegetables)"] },
          { cells: ["Fibre (roughage)", "Aids bowel movement"] },
          { cells: ["Water", "Medium for all reactions"] },
        ],
        caption: "Seven components — the bank's correct option lists all of them including fibre and water.",
      },
      selfCheckExample: {
        prompt:
          "True or false: 'All proteins are enzymes.' Justify in one line.",
        steps: [
          "Enzymes are proteins — true.",
          "But proteins also include structural ones (collagen, keratin), transport ones (haemoglobin) and antibodies.",
          "So the set of proteins is larger than the set of enzymes.",
        ],
        answer: "False. All enzymes are proteins, but not all proteins are enzymes.",
      },
      practiceSet: [
        { prompt: "How many components does a balanced diet have?", answer: "Seven", method: "carb, protein, fat, vitamins, minerals, fibre, water" },
        { prompt: "Best source of vitamins and minerals for vegetarians?", answer: "Fruits and vegetables" },
        { prompt: "Are all proteins enzymes?", answer: "No", method: "all enzymes are proteins, not the reverse" },
      ],
      pyqExampleId: "086307de-d155-4217-9e75-3042c8643d00", // balanced diet 7 components
      traps: [
        {
          title: "Fibre and water count as diet components",
          body:
            "The 'most complete' option for a balanced diet includes **fibre (roughage) and water** alongside carbs, proteins, fats, vitamins and minerals. Options dropping fibre or water are incomplete.",
        },
      ],
    },

    // minerals & metabolism (REFERENCE, incl gout)
    {
      kind: "reference" as const,
      slug: "minerals-and-metabolism",
      name: "Minerals and metabolic waste",
      intuition:
        "Minerals are inorganic micronutrients with very specific jobs — iodine for thyroxine, iron for haemoglobin, calcium for bone. " +
        "The bank also asks one metabolism question: gout comes from too much uric acid, which is a breakdown product of the nucleic acids in food.",
      definition:
        "Key mineral facts plus the gout question:\n" +
        "- **Iodine** — needed by the thyroid to make **thyroxine**; deficiency causes goitre.\n" +
        "- **Iron** — needed for **haemoglobin**; deficiency causes anaemia.\n" +
        "- **Calcium** — bones, teeth, and blood clotting.\n" +
        "- **Gout** — caused by high **uric acid**, the breakdown product of **purines in nucleic acids**; gout patients should reduce nucleic-acid-rich foods.",
      table: {
        columns: ["Mineral / waste", "Linked to"],
        rows: [
          { cells: ["Iodine", "Thyroxine synthesis (deficiency → goitre)"] },
          { cells: ["Iron", "Haemoglobin (deficiency → anaemia)"] },
          { cells: ["Calcium", "Bones, teeth, clotting"] },
          {
            cells: ["Uric acid", "From nucleic acids → high levels cause **gout**"],
            noteAmber: "NDA 2017 — gout patients should minimise NUCLEIC-ACID-rich foods (uric acid comes from purines).",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which mineral is needed to make thyroxine?", answer: "Iodine" },
        { prompt: "Gout patients should reduce which food component?", answer: "Nucleic acids", method: "uric acid is a purine breakdown product" },
        { prompt: "Iron deficiency causes which condition?", answer: "Anaemia" },
      ],
      pyqExampleId: "c7b8ced4-888f-4eca-8399-575e7bf3e2fe", // gout → minimise nucleic acids
    },
  ],
};
