import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AB_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Acids in Food and the Body",
  title: "Acids in Food and the Body",
  oneLineDefinition:
    "Which acid is in which fruit, food, sting or body fluid, and what common acids and antacids are used for.",
  whyItMatters:
    "Eleven CDS questions, every one a recall of source and acid. The same pairs come back: methanoic acid in nettle and ant stings (three times), hydrochloric acid in the stomach (twice), oxalic acid in tomato (twice).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschab-food-acids",
      name: "Acids in fruits, foods and household products",
      intuition:
        "Most acids in food are weak organic acids, and each has a signature source. Learn the pairs as a list: citrus has citric acid, tomato has oxalic, tamarind has tartaric, curd has lactic, vinegar is acetic.",
      definition:
        "The pairs CDS asks:\n" +
        "- **Citric acid**: lemon, orange and other citrus fruits; also a food preservative.\n" +
        "- **Ascorbic acid** is **vitamin C** (amla, citrus); lack of it causes scurvy.\n" +
        "- **Oxalic acid**: **tomato**, spinach.\n" +
        "- **Tartaric acid**: **tamarind**, grapes. (Oxalic acid is **not** the acid of tamarind.)\n" +
        "- **Lactic acid**: curd and sour milk.\n" +
        "- **Acetic acid**: **vinegar**, which is a **5–8% solution of acetic acid in water**; used in pickles.\n" +
        "- **Boric acid** is a mild antiseptic. **Magnesium hydroxide** (milk of magnesia) is a base used as an antacid.",
      table: {
        columns: ["Source or use", "Acid"],
        rows: [
          { cells: ["Lemon, orange", "Citric acid"] },
          {
            cells: ["Vitamin C (amla, citrus)", "Ascorbic acid"],
            noteAmber: "CDS 2019 (II): vitamin C is ascorbic acid.",
            pyqExampleId: "dcbd6201-23a7-4763-96aa-268633f5c3dc",
          },
          {
            cells: ["Tomato", "Oxalic acid"],
            noteAmber: "Asked in CDS 2021 (I) and again in a 2026 (II) match-the-list.",
            pyqExampleId: "361e6f07-a3d0-429a-9275-c715ae967705",
          },
          {
            cells: ["Tamarind, grapes", "Tartaric acid"],
            noteAmber: "CDS 2023 (II): 'oxalic acid is found in tamarind paste' was the incorrect statement.",
            pyqExampleId: "97cd3a09-4295-45f6-94cc-c69e1b68bd24",
          },
          { cells: ["Curd, sour milk", "Lactic acid"] },
          {
            cells: ["Vinegar (5–8% in water), pickles", "Acetic acid"],
            pyqExampleId: "783d6298-6d18-4363-b918-40bc56c0e849",
          },
          {
            cells: ["Mild antiseptic", "Boric acid"],
            noteAmber: "CDS 2020 (I) matched boric acid to antiseptic, citric acid to preservative, Mg(OH)₂ to antacid, acetic acid to pickle.",
            pyqExampleId: "4e8f5bfe-4f93-4c35-94b2-9e7cab1c8537",
          },
        ],
      },
      pyqExampleId: "be9a875f-706d-4351-9909-91c055d67537",
      selfCheckExample: {
        prompt: "Match each food with its acid: (i) curd, (ii) tamarind, (iii) lemon. Acids: citric, lactic, tartaric.",
        steps: [
          "Curd is soured by bacteria that make lactic acid.",
          "Tamarind's sourness is tartaric acid.",
          "Lemon is a citrus fruit, so citric acid.",
        ],
        answer: "Curd: lactic acid. Tamarind: tartaric acid. Lemon: citric acid.",
      },
      practiceSet: [
        { prompt: "Which acid is vitamin C?", answer: "Ascorbic acid" },
        { prompt: "Which acid gives lemon its sour taste?", answer: "Citric acid" },
        { prompt: "Which acid is found in grapes?", answer: "Tartaric acid" },
        { prompt: "Which acid gives tamarind its sour taste?", answer: "Tartaric acid" },
        { prompt: "Which acid is used as a mild antiseptic in eye washes?", answer: "Boric acid" },
      ],
      traps: [
        {
          title: "Tomato is oxalic, tamarind is tartaric",
          body: "The two are swapped often in the options. **Oxalic acid** is in tomato and spinach; **tartaric acid** is in tamarind and grapes.",
        },
        {
          title: "Milk of magnesia is a base, not an acid",
          body: "In a list of 'compound and use', magnesium hydroxide is the **antacid**: it is a mild base that neutralises excess stomach acid.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-body-acids",
      name: "Acids in stings and in the stomach",
      intuition:
        "Two body facts carry most of these questions. The sting of an ant, bee or nettle injects methanoic (formic) acid. The stomach makes hydrochloric acid, a mineral acid, to digest food and kill germs.",
      definition:
        "The facts:\n" +
        "- **Methanoic acid** (formic acid, HCOOH) is injected by **ant and bee stings** and by the **stinging hairs of nettle leaves**. Its name comes from the Latin formica, ant.\n" +
        "- A sting is soothed by a **mild base**: baking soda, or the leaf of the dock plant that grows beside nettle.\n" +
        "- The **stomach** secretes **hydrochloric acid** (HCl). It is a **mineral** acid; lactic, uric and methanoic acids are organic.\n" +
        "- Stomach HCl kills microbes and activates the enzyme pepsin. Too much of it causes acidity, treated with an antacid.\n" +
        "- **Lactic acid** builds up in **muscles** during hard exercise.",
      table: {
        columns: ["Source", "Acid", "Kind"],
        rows: [
          {
            cells: ["Ant or bee sting", "Methanoic (formic) acid", "Organic"],
            pyqExampleId: "61888cdc-c564-4a57-8a88-d1bbeac4156d",
          },
          {
            cells: ["Nettle leaf hairs", "Methanoic (formic) acid", "Organic"],
            noteAmber: "Asked twice: CDS 2021 (II) and 2022 (II).",
            pyqExampleId: "10e37d70-7095-41ad-be10-c29da40fbf11",
          },
          {
            cells: ["Stomach (gastric juice)", "Hydrochloric acid", "Mineral"],
            noteAmber: "Asked twice: CDS 2020 (I) and 2022 (I). HCl is the only mineral acid among the usual options.",
            pyqExampleId: "51b5a125-3d65-4273-8b37-a225fb6c984e",
          },
          { cells: ["Tired muscles", "Lactic acid", "Organic"] },
        ],
      },
      pyqExampleId: "456f76bd-e281-446b-9455-6792c9d73087",
      selfCheckExample: {
        prompt: "A bee sting is painful because of an acid. Which acid is it, and why does rubbing baking soda on the sting help?",
        steps: [
          "Bee and ant stings inject methanoic (formic) acid.",
          "Baking soda (sodium hydrogen carbonate) is a mild base.",
          "The base neutralises the acid, so the burning eases.",
        ],
        answer: "Methanoic acid; the baking soda neutralises it.",
      },
      practiceSet: [
        { prompt: "What is the common name of methanoic acid?", answer: "Formic acid" },
        { prompt: "Which mineral acid is present in the human stomach?", answer: "Hydrochloric acid" },
        { prompt: "Which acid builds up in muscles during hard exercise?", answer: "Lactic acid" },
        { prompt: "Is methanoic acid a mineral acid or an organic acid?", answer: "Organic" },
      ],
      traps: [
        {
          title: "The stomach acid is hydrochloric, not sulphuric",
          body: "Gastric juice contains **hydrochloric acid**. Sulphuric, nitric and formic acids are distractors; lactic and uric acids are organic, not mineral.",
        },
        {
          title: "Nettle and ant share one acid",
          body: "Both inject **methanoic (formic) acid**. Citric, tartaric and acetic acids are food acids and do not sting.",
        },
      ],
    },
  ],
};
