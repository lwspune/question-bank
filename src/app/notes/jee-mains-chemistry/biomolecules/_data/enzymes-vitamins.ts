import type { SubtopicNote } from "@/app/notes/_types";

export const ENZYMES_VITAMINS_BIO_NOTE: SubtopicNote = {
  subtopicName: "Enzymes and Vitamins",
  title: "Enzymes and Vitamins",
  oneLineDefinition:
    "Enzymes are globular-protein catalysts, each specific to one reaction and usually named after its substrate; vitamins split into fat-soluble A, D, E and K, which the body stores, and the water-soluble B group and C, which it excretes (except B12), and each vitamin has one deficiency disease to remember.",
  whyItMatters:
    "Eighteen PYQs, seventeen multiple choice and one asking for a number, two from 2026. Six are on enzymes: what they are, and which enzyme converts which substrate, as match-the-list questions. Four ask which vitamins the body can store. Eight match a vitamin to its chemical name or to its deficiency disease.",
  concepts: [
    // C1 — enzymes
    {
      kind: "reference" as const,
      slug: "jcbio-enzymes",
      name: "Enzymes and the reaction each one catalyses",
      intuition:
        "An enzyme is a protein catalyst made by a living cell. It speeds up one reaction, on one substrate, at body temperature, by lowering the activation energy far more than an acid catalyst does. Most enzyme names tell you the substrate: maltase acts on maltose, invertase inverts cane sugar.",
      definition:
        "- Enzymes are **biocatalysts** and almost all are **globular proteins** (NCERT).\n" +
        "- They are **highly specific**: each catalyses one reaction for one substrate.\n" +
        "- They are usually named after the substrate: the enzyme that hydrolyses maltose to glucose is **maltase**. **Oxidoreductases** catalyse the oxidation of one substrate with the reduction of another; an oxidase does not hydrolyse anything.\n" +
        "- They lower the activation energy much more than an acid catalyst: sucrose is hydrolysed with a lower activation energy by its enzyme than by acid.\n" +
        "- The enzyme–substrate pairs in the table, and urease from soya bean, come from the enzyme-catalysis section of NCERT's older Surface Chemistry chapter, not from the Biomolecules text; the other sources are the standard ones.\n" +
        "- As substrate concentration rises, the rate rises and then levels off once every enzyme molecule is busy. This saturation curve is outside NCERT.",
      table: {
        columns: ["Enzyme", "Converts", "Into", "Source or site"],
        rows: [
          { cells: ["Invertase", "Sucrose (cane sugar)", "Glucose and fructose", "Yeast"] },
          { cells: ["Zymase", "Glucose", "Ethanol and carbon dioxide", "Yeast"] },
          { cells: ["Diastase", "Starch", "Maltose", "Malt (germinating barley)"] },
          { cells: ["Maltase", "Maltose", "Glucose", "Yeast"] },
          { cells: ["Urease", "Urea", "Ammonia and carbon dioxide", "Soya bean"] },
          { cells: ["Pepsin", "Proteins", "Peptides", "Stomach"] },
          { cells: ["Trypsin", "Peptides and proteins", "Amino acids", "Pancreas, acting in the intestine"] },
        ],
        caption: "Starch goes to maltose (diastase), then to glucose (maltase), then to ethanol (zymase).",
      },
      selfCheckExample: {
        prompt: "Which enzyme turns starch into maltose, and which then turns maltose into glucose?",
        steps: [
          "Diastase, from malt, hydrolyses starch as far as maltose.",
          "Maltase, named after its substrate, hydrolyses maltose to glucose.",
        ],
        answer: "Diastase, then maltase.",
      },
      practiceSet: [
        { prompt: "Which enzyme converts urea into ammonia and carbon dioxide?", answer: "Urease" },
        { prompt: "Where in the body does pepsin act on proteins?", answer: "The stomach" },
        { prompt: "Are most enzymes fibrous or globular proteins?", answer: "Globular" },
        { prompt: "Which enzyme ferments glucose to ethanol?", answer: "Zymase" },
      ],
      pyqExampleId: "764bd255-097e-42c9-b4f4-07bb81db65dd", // 2024 — incorrect statements: non-specific; oxidase hydrolyses maltose
      traps: [
        {
          title: "Maltase, not oxidase, hydrolyses maltose",
          body: "Enzymes are named for what they act on. The hydrolysis of maltose to glucose is catalysed by maltase; an oxidase catalyses an oxidation.",
        },
        {
          title: "Diastase stops at maltose",
          body: "Diastase converts starch into maltose, not glucose. Maltase takes maltose on to glucose, and zymase takes glucose to ethanol and CO₂.",
        },
        {
          title: "Enzymes are specific",
          body: "Each enzyme catalyses one reaction or one class of reaction. A statement that enzymes are non-specific and catalyse different kinds of reactions is false.",
        },
      ],
    },

    // C2 — which vitamins are stored
    {
      kind: "formula" as const,
      slug: "jcbio-vitamin-storage",
      name: "Fat-soluble and water-soluble vitamins: which are stored",
      intuition:
        "Solubility decides storage. Fat-soluble vitamins dissolve in body fat and stay there. Water-soluble vitamins wash out in urine, so the diet must supply them regularly. Vitamin B12 is the one exception: it is water soluble but is stored.",
      definition:
        "- **Fat-soluble**: vitamins A, D, E and K. They are stored in the liver and adipose (fat-storing) tissue.\n" +
        "- **Water-soluble**: the B group (B1, B2, B6, B12) and vitamin C. They are readily excreted in urine and cannot be stored, so they must be supplied regularly in the diet.\n" +
        "- **Exception**: vitamin B12 is water soluble but can be stored (NCERT).\n" +
        "- So the vitamins the body can store are A, D, E, K and B12.",
      authoredExample: {
        prompt: "From vitamins B2, C, D, K, B6 and B12, how many can the body store?",
        steps: [
          "D and K are fat soluble, so both are stored.",
          "B2, B6 and C are water soluble and excreted, so none of them is stored.",
          "B12 is water soluble but is the exception and is stored.",
        ],
        answer: "Three: D, K and B12.",
      },
      selfCheckExample: {
        prompt: "Which of vitamins A, B1, C, D and B12 are water soluble, and which of those is still stored?",
        steps: [
          "A and D are fat soluble.",
          "B1, C and B12 are water soluble.",
          "Of these, only B12 is stored.",
        ],
        answer: "B1, C and B12 are water soluble; B12 is stored.",
      },
      practiceSet: [
        { prompt: "Is vitamin K fat soluble or water soluble?", answer: "Fat soluble" },
        { prompt: "Which water-soluble vitamin is not easily excreted?", answer: "Vitamin B12" },
        { prompt: "Why must vitamin C be supplied regularly in the diet?", answer: "It is water soluble and excreted in urine, so it is not stored" },
        { prompt: "Where are fat-soluble vitamins stored?", answer: "In the liver and adipose tissue" },
      ],
      pyqExampleId: "45c8abb6-1b22-419a-bbfd-54e2b86287f9", // 2024 — how many of eight vitamins are stored: 5
      traps: [
        {
          title: "B12 is water soluble but stored",
          body: "Do not drop B12 when counting storable vitamins. The count is the four fat-soluble vitamins plus B12.",
        },
        {
          title: "Thiamine and ascorbic acid are not stored",
          body: "Thiamine is B1 and ascorbic acid is C; both are water soluble. Of the common pairs, vitamins A and D are the ones stored for a long time.",
        },
      ],
    },

    // C3 — names and deficiency diseases
    {
      kind: "reference" as const,
      slug: "jcbio-vitamin-deficiency",
      name: "Vitamins: chemical names, deficiency diseases and sources",
      intuition:
        "Each vitamin has one deficiency disease in the syllabus, and the B vitamins are told apart by their chemical names. Learn the table as pairs; the questions are almost all match-the-list, where one swapped pair changes the answer.",
      definition:
        "- The B vitamins by name: B1 thiamine, B2 riboflavin, B6 pyridoxine, B12 cyanocobalamin.\n" +
        "- Ascorbic acid (vitamin C) is the vitamin among common acids; adipic, aspartic and saccharic acid are not vitamins.\n" +
        "- Vitamin K deficiency **increases** blood clotting time.\n" +
        "- NCERT gives vitamin E deficiency as increased fragility of red blood cells and muscular weakness. A 2021 key says vitamin E delays blood clotting; that is not an NCERT fact.",
      table: {
        columns: ["Vitamin", "Chemical name", "Deficiency disease", "Main sources"],
        rows: [
          { cells: ["A", "Retinol", "Xerophthalmia (hardening of the cornea) and night blindness", "Fish liver oil, carrots, butter, milk"] },
          { cells: ["B1", "Thiamine", "Beri-beri (loss of appetite, retarded growth)", "Yeast, milk, green vegetables, cereals"] },
          { cells: ["B2", "Riboflavin", "Cheilosis (fissures at the corners of the mouth and lips), digestive disorders", "Milk, egg white, liver, kidney"] },
          { cells: ["B6", "Pyridoxine", "Convulsions", "Yeast, milk, egg yolk, cereals, grams"] },
          { cells: ["B12", "Cyanocobalamin", "Pernicious anaemia", "Meat, fish, egg, curd"] },
          { cells: ["C", "Ascorbic acid", "Scurvy (bleeding gums)", "Citrus fruits, amla, green leafy vegetables"] },
          { cells: ["D", "Calciferol", "Rickets in children, osteomalacia in adults", "Sunlight, fish, egg yolk"] },
          { cells: ["E", "Tocopherol", "Increased fragility of red blood cells, muscular weakness", "Vegetable oils such as wheat germ and sunflower oil"] },
          { cells: ["K", "Phylloquinone", "Increased blood clotting time", "Green leafy vegetables"] },
        ],
        caption: "B1, B2 and B6 are the pairs most often swapped: thiamine, riboflavin, pyridoxine.",
      },
      selfCheckExample: {
        prompt: "A child's bones are soft and bent. Which vitamin is lacking, and what is the disease called?",
        steps: [
          "Soft, deformed bones in children point to poor calcium deposition.",
          "That is the deficiency disease of vitamin D.",
        ],
        answer: "Vitamin D; rickets.",
      },
      practiceSet: [
        { prompt: "What is the chemical name of vitamin B6?", answer: "Pyridoxine" },
        { prompt: "Which disease does a lack of vitamin B12 cause?", answer: "Pernicious anaemia" },
        { prompt: "Deficiency of which vitamin causes cheilosis?", answer: "Vitamin B2 (riboflavin)" },
        { prompt: "Deficiency of which vitamin causes night blindness?", answer: "Vitamin A" },
      ],
      pyqExampleId: "9baa149e-a219-4174-863f-4a695112fe2c", // 2026 — scurvy / convulsions / cheilosis / xerophthalmia
      traps: [
        {
          title: "Thiamine, riboflavin, pyridoxine in order",
          body: "B1 is thiamine, B2 riboflavin and B6 pyridoxine. Their diseases follow the same order: beri-beri, cheilosis, convulsions.",
        },
        {
          title: "Vitamin K deficiency slows clotting",
          body: "Without vitamin K blood takes longer to clot, so the clotting time increases. An option saying it decreases is false.",
        },
      ],
    },
  ],
};
