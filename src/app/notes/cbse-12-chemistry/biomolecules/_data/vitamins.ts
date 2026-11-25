import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_BM_VITAMINS_NOTE: SubtopicNote = {
  subtopicName: "Vitamins",
  title: "Vitamins: Fat-Soluble, Water-Soluble and Deficiency Diseases",
  oneLineDefinition:
    "What vitamins are, why fat-soluble vitamins are stored and water-soluble ones are not, and the sources and deficiency disease of each vitamin in NCERT's table.",
  whyItMatters:
    "33 questions, and thirty of them come from board papers, in every year from 2023 to 2026. Two things are asked again and again: the deficiency disease of a vitamin (scurvy, rickets, beri-beri, night blindness, pernicious anaemia, increased clotting time), mostly as one-mark MCQs, and why vitamin C cannot be stored in the body, often as an assertion-reason item. The table on this page is the whole answer to most of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcbm-solubility",
      name: "Fat-soluble and water-soluble vitamins",
      intuition:
        "Whether the body can keep a vitamin depends on what it dissolves in. A vitamin that dissolves in fat can sit in the liver and in fat tissue for later. A vitamin that dissolves in water is washed out in the urine, so there is no store and it has to come in with food again and again.",
      definition:
        "- **Vitamins** are organic compounds required in the diet in **small amounts** to perform specific biological functions for normal growth and health; their **deficiency causes specific diseases**.\n" +
        "- Most vitamins cannot be synthesised in our body, but plants can synthesise almost all of them, so they are considered **essential food factors**. Bacteria of the gut can produce some of them. Excess of vitamins is also harmful.\n" +
        "- The name came from **vital + amine**, since the first ones found had amino groups. Most do not, so the final \"e\" of \"vitamine\" was dropped.\n" +
        "- **Fat-soluble vitamins: A, D, E and K.** Soluble in fats and oils, insoluble in water. **Stored in the liver and adipose (fat-storing) tissues.**\n" +
        "- **Water-soluble vitamins: the B group and C.** They must be **supplied regularly in the diet** because they are **readily excreted in urine** and **cannot be stored** in the body (**except vitamin B₁₂**).\n" +
        "- **Assertion-reason codes in Chemistry:** (A) both true and R explains A; (B) both true, R does not explain A; (C) A true, R false; (D) A false, R true. Decide each statement on its own first, then ask whether R is the reason for A.",
      table: {
        columns: ["Point", "Fat-soluble vitamins", "Water-soluble vitamins"],
        rows: [
          { cells: ["Members", "A, D, E, K", "B group (B₁, B₂, B₆, B₁₂) and C"] },
          { cells: ["Dissolve in", "Fats and oils, not water", "Water"] },
          {
            cells: ["Stored in the body?", "Yes, in the liver and adipose tissue", "No, readily excreted in urine (vitamin B₁₂ is the exception)"],
            noteAmber: "Board 2025 asked \"Vitamin D cannot be stored\" as an assertion: A is false, R (fat soluble, not excreted in urine) is true, so (D).",
            pyqExampleId: "b9b1d81a-feb5-40ea-999a-57051ec58ff9",
          },
          {
            cells: ["Vitamin K", "Fat soluble: can be stored", "Not in this group"],
            noteAmber: "Board 2025 assertion-reason: \"Vitamin K can be stored\" is true, \"it is water soluble\" is false, so (C).",
            pyqExampleId: "ff402880-ecf5-4004-b1d9-8d71edc4b24d",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Name two fat-soluble and two water-soluble vitamins, and say where the body stores the fat-soluble ones.",
        steps: [
          "Fat-soluble: vitamins A and D (E and K are also correct).",
          "Water-soluble: vitamin C and vitamin B₁ (any member of the B group).",
          "Fat-soluble vitamins are stored in the liver and adipose tissue.",
        ],
        answer: "A and D; C and B₁; stored in the liver and adipose tissue",
      },
      practiceSet: [
        { prompt: "Which water-soluble vitamin can be stored in the body?", answer: "Vitamin B₁₂" },
        { prompt: "Why are vitamins called essential food factors?", answer: "Most of them cannot be synthesised in our body, so they must come from food (plants can make almost all of them)" },
        { prompt: "How are vitamins classified?", answer: "By solubility, into fat-soluble vitamins (A, D, E, K) and water-soluble vitamins (B group and C)" },
      ],
      pyqExampleId: "a0004567-fa8a-4a00-845c-390518b74239",
      traps: [
        {
          title: "Vitamin C is water soluble",
          body: "\"Vitamin C is fat soluble and excreted in urine\" was the false Reason of a 2023 assertion-reason item (answer C). Fat-soluble vitamins are stored; water-soluble ones are excreted.",
        },
        {
          title: "Remember the exception",
          body: "Water-soluble vitamins cannot be stored, except vitamin B₁₂. Write the exception when a question asks you to classify vitamins in full.",
        },
        {
          title: "Two answers in one question",
          body: "\"Why can't vitamin C be stored? Name the disease\" needs both: water soluble and excreted in urine, then scurvy. A reason without the disease loses a mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcbm-deficiency",
      name: "Sources and deficiency diseases",
      intuition:
        "Each vitamin has one job the body cannot do without, so each shortage shows up as its own disease. Learn the table row by row, vitamin with disease, because the board's MCQ simply names one and asks for the other.",
      definition:
        "- **Vitamin A:** xerophthalmia (hardening of the cornea of the eye) and night blindness.\n" +
        "- **Vitamin B₁ (thiamine):** beri-beri (loss of appetite, retarded growth).\n" +
        "- **Vitamin B₂ (riboflavin):** cheilosis (fissuring at the corners of the mouth and lips), digestive disorders and a burning sensation of the skin.\n" +
        "- **Vitamin B₆ (pyridoxine):** convulsions.\n" +
        "- **Vitamin B₁₂:** pernicious anaemia (RBCs deficient in haemoglobin).\n" +
        "- **Vitamin C (ascorbic acid):** scurvy (bleeding gums).\n" +
        "- **Vitamin D:** rickets (bone deformities in children) and osteomalacia (soft bones and joint pain in adults).\n" +
        "- **Vitamin E:** increased fragility of RBCs and muscular weakness.\n" +
        "- **Vitamin K:** increased blood clotting time.",
      table: {
        columns: ["Vitamin", "Sources", "Deficiency disease"],
        rows: [
          {
            cells: ["A", "Fish liver oil, carrots, butter, milk", "Xerophthalmia, night blindness"],
            noteAmber: "Board 2024 asked the vitamin behind xerophthalmia and two of its sources.",
            pyqExampleId: "9ab4449e-3e7f-4a4b-95f0-a7d97642799f",
          },
          { cells: ["B₁ (thiamine)", "Yeast, milk, green vegetables, cereals", "Beri-beri"] },
          { cells: ["B₂ (riboflavin)", "Milk, egg white, liver, kidney", "Cheilosis, digestive disorders, burning sensation of the skin"] },
          { cells: ["B₆ (pyridoxine)", "Yeast, milk, egg yolk, cereals, grams", "Convulsions"] },
          {
            cells: ["B₁₂", "Meat, fish, egg, curd", "Pernicious anaemia"],
            noteAmber: "Board 2023 and 2025 asked the vitamin whose deficiency causes pernicious anaemia.",
            pyqExampleId: "302f8176-c2d0-4629-a385-bf3d6588853d",
          },
          {
            cells: ["C (ascorbic acid)", "Citrus fruits, amla, green leafy vegetables", "Scurvy (bleeding gums)"],
            noteAmber: "Scurvy was a one-mark MCQ in 2023, 2024 and 2025.",
            pyqExampleId: "5b8fe42b-4851-46b6-8c0f-7b8b588ecc30",
          },
          {
            cells: ["D", "Exposure to sunlight, fish, egg yolk", "Rickets (children), osteomalacia (adults)"],
            noteAmber: "Board 2023 MCQ: rickets is caused by lack of vitamin D.",
            pyqExampleId: "05f99bf7-9a78-45d3-8dfa-11c3ef508bec",
          },
          {
            cells: ["E", "Vegetable oils such as wheat germ oil and sunflower oil", "Increased fragility of RBCs, muscular weakness"],
            noteAmber: "Board 2026 MCQ named both symptoms and asked for the vitamin.",
            pyqExampleId: "39dd10e7-a42d-4949-a803-8efc52cbcd68",
          },
          {
            cells: ["K", "Green leafy vegetables", "Increased blood clotting time"],
            noteAmber: "Board 2023, 2024 and 2025 asked the vitamin needed for the clotting of blood.",
            pyqExampleId: "4cc9cc42-563c-4a3d-bf22-ac608dd0a80f",
          },
        ],
      },
      selfCheckExample: {
        prompt: "A child has bone deformities. Which vitamin is lacking, what is the disease called, and give two sources of the vitamin.",
        steps: [
          "Bone deformities in children are rickets.",
          "Rickets is caused by a deficiency of vitamin D.",
          "Sources from NCERT's table: exposure to sunlight, fish and egg yolk.",
        ],
        answer: "Vitamin D; rickets; sunlight and fish (or egg yolk)",
      },
      practiceSet: [
        { prompt: "What is the chemical name of vitamin C, and which disease does its deficiency cause?", answer: "Ascorbic acid; scurvy" },
        { prompt: "Deficiency of vitamin B₆ causes which disease?", answer: "Convulsions" },
        { prompt: "Give two sources of vitamin A.", answer: "Fish liver oil and carrots (butter and milk also)" },
        { prompt: "What is the other name of vitamin B₂, and what is cheilosis?", answer: "Riboflavin; fissuring at the corners of the mouth and lips" },
      ],
      pyqExampleId: "991174d1-2c79-40e5-834f-432ee3eed880",
      traps: [
        {
          title: "Name the B vitamin exactly",
          body: "Beri-beri is B₁, cheilosis B₂, convulsions B₆, pernicious anaemia B₁₂. When options list several B vitamins, \"vitamin B\" is not specific enough.",
        },
        {
          title: "Clotting time goes up, not down",
          body: "Lack of vitamin K increases the blood clotting time. Vitamin E, not K, is linked to fragile RBCs and muscular weakness.",
        },
        {
          title: "Eye diseases belong to vitamin A",
          body: "Night blindness and xerophthalmia are vitamin A deficiencies. Scurvy, with bleeding gums, is vitamin C.",
        },
      ],
    },
  ],
};
