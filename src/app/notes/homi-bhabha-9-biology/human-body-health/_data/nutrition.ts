import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HB_NUTRITION_NOTE: SubtopicNote = {
  subtopicName: "Nutrition and Body Organs",
  title: "Nutrition and Body Organs",
  oneLineDefinition:
    "Each nutrient has its own job and its own rich foods, the four kinds of teeth cut, tear and grind food, and the diaphragm divides the chest from the abdomen.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE: a rich source of vitamin A, a rich source of fat, the order in which teeth come out, and the sheet of muscle between the chest and the abdomen. Know which food is rich in what, and where each organ sits.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hbnu-nutrients",
      name: "Nutrients and the foods rich in them",
      intuition:
        "Food is a mix of nutrients, and each one does a different job. Rice gives energy, dal builds the body, carrots keep the eyes healthy. A question that asks for a rich source of something wants the food that has a lot of that one nutrient, not a food that is simply healthy.",
      definition:
        "- **Carbohydrates** and **fats** give energy. Fats give the most energy for each gram.\n" +
        "- **Proteins** build and repair the body.\n" +
        "- **Vitamins** and **minerals** are needed in small amounts but protect us from deficiency diseases.\n" +
        "- Carrots are rich in **beta-carotene**, which the body turns into **vitamin A**.\n" +
        "- Deficiency diseases: vitamin A, **night blindness**; vitamin B1, **beriberi**; vitamin C, **scurvy**; vitamin D, **rickets**; iron, **anaemia**; iodine, **goitre**; protein, **kwashiorkor**.\n" +
        "- A **balanced diet** has every nutrient in the right amount, plus water and fibre.",
      table: {
        columns: ["Nutrient", "Main job", "Rich sources"],
        rows: [
          { cells: ["Carbohydrates", "Give energy", "Rice, wheat, jowar, potato, sugar, jaggery"] },
          {
            cells: ["Fats (lipids)", "Store energy and give the most energy per gram", "Ghee, butter, oil, groundnut, coconut, egg yolk"],
            noteAmber: "Duck eggs carry more fat than hen eggs.",
          },
          { cells: ["Proteins", "Build and repair the body", "Pulses, soybean, milk, eggs, meat, fish"] },
          { cells: ["Vitamin A", "Healthy eyes and skin", "Carrot, papaya, mango, green leafy vegetables, milk"] },
          { cells: ["Vitamin C", "Healthy gums, healing of wounds", "Amla, lemon, orange, guava"] },
          { cells: ["Vitamin D", "Strong bones and teeth", "Sunlight on the skin, milk, egg yolk"] },
          { cells: ["Iron and iodine", "Iron for blood, iodine for the thyroid", "Leafy vegetables and jaggery (iron), iodised salt (iodine)"] },
          { cells: ["Fibre (roughage)", "Helps food and waste move through the intestine", "Fruits, vegetables, whole grains"] },
        ],
        caption: "For a rich source of one nutrient, pick the food that is packed with that nutrient.",
      },
      selfCheckExample: {
        prompt: "A boy cannot see well in dim light at dusk. Which vitamin is he short of, and which two foods would help him?",
        steps: ["Poor sight in dim light is night blindness.", "Night blindness comes from a lack of vitamin A, found in carrot and papaya."],
        answer: "Vitamin A: carrot and papaya (or green leafy vegetables)",
      },
      practiceSet: [
        { prompt: "Which disease is caused by a lack of vitamin C?", answer: "Scurvy (bleeding gums)" },
        { prompt: "Which nutrient gives the most energy for each gram?", answer: "Fats" },
        { prompt: "Which vitamin does the skin make in sunlight?", answer: "Vitamin D" },
        { prompt: "Which mineral, added to common salt, prevents goitre?", answer: "Iodine" },
      ],
      pyqExampleId: "25fe937f-04e8-4394-86a8-809a77d234fb",
      traps: [
        {
          title: "Taking groundnut for vitamin A",
          body: "Groundnut is rich in fat and protein, not vitamin A. For vitamin A choose carrot, papaya, mango or green leafy vegetables.",
        },
        {
          title: "Thinking meat and fish are the fattiest foods",
          body: "Goat meat and fish such as pomfret are mainly protein foods. Ghee, oil, nuts and egg yolk are far richer in fat.",
        },
        {
          title: "Thinking fibre is useless because it is not digested",
          body: "Fibre is not digested, but it helps food and waste move through the intestine and prevents constipation.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hbnu-organs",
      name: "Teeth and the body's cavities",
      intuition:
        "Your teeth work like a set of tools: the front ones cut, the pointed ones tear, the back ones grind. Inside the body, the organs sit in spaces called cavities. A dome-shaped sheet of muscle, the diaphragm, is the floor of the chest and the roof of the abdomen.",
      definition:
        "- An adult has **32 permanent teeth** of four kinds: **incisors**, **canines**, **premolars** and **molars**.\n" +
        "- A child has **20 milk teeth**: 8 incisors, 4 canines and 8 molars. There are no premolars among milk teeth.\n" +
        "- The first permanent tooth to come out is usually the **first molar**, at about **6 years**. The third molars (wisdom teeth) come last.\n" +
        "- The **diaphragm** is a dome-shaped muscular sheet that separates the **thoracic (chest) cavity** from the **abdominal cavity**.\n" +
        "- The chest cavity holds the **heart** and **lungs**. The abdominal cavity holds the **stomach, liver, intestines and kidneys**.\n" +
        "- The **pharynx** is in the throat, and the brain lies in the **cranial cavity** of the skull.",
      table: {
        columns: ["Tooth", "Number in an adult", "Shape", "Job"],
        rows: [
          { cells: ["Incisors", "8", "Flat, chisel-like edge", "Cutting and biting"] },
          { cells: ["Canines", "4", "Pointed, one cusp", "Tearing"] },
          { cells: ["Premolars", "8", "Two cusps", "Grinding"] },
          { cells: ["Molars", "12", "Broad crown with several cusps, two or three roots", "Crushing and grinding"] },
        ],
        caption: "Counted over both jaws: 8 + 4 + 8 + 12 = 32.",
      },
      selfCheckExample: {
        prompt: "An adult has a full set of 32 teeth. How many of them are molars, and how many are canines?",
        steps: ["Molars: 3 on each side of each jaw, so 12.", "Canines: 1 on each side of each jaw, so 4."],
        answer: "12 molars and 4 canines",
      },
      practiceSet: [
        { prompt: "Which teeth are used to tear food?", answer: "Canines" },
        { prompt: "How many milk teeth does a child have?", answer: "20" },
        { prompt: "Which cavity of the body holds the heart and the lungs?", answer: "The thoracic (chest) cavity" },
        { prompt: "Name two organs that lie in the abdominal cavity.", answer: "Any two of the stomach, liver, intestines and kidneys" },
      ],
      pyqExampleId: "3721bd38-33bc-4692-8466-097ea59169be",
      traps: [
        {
          title: "Putting the lungs below the diaphragm",
          body: "The heart and lungs lie above the diaphragm, in the chest. The stomach and liver lie below it, in the abdomen.",
        },
        {
          title: "Giving milk teeth premolars",
          body: "A child's 20 milk teeth are incisors, canines and molars. Premolars come only with the permanent teeth.",
        },
        {
          title: "Thinking the first permanent tooth is an incisor",
          body: "The first permanent tooth is usually the first molar, at about 6 years, which comes out behind the milk teeth.",
        },
      ],
    },
  ],
};
