import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CR_DAILY_NOTE: SubtopicNote = {
  subtopicName: "Reactions in Daily Life",
  title: "Reactions in Daily Life",
  oneLineDefinition:
    "The chemistry of whitewashing, the limewater test for carbon dioxide, and what electrolysis of brine gives.",
  whyItMatters:
    "Six CDS questions. Whitewashing alone came three times (2021, and twice in 2023): quicklime becomes slaked lime, which takes up carbon dioxide to leave a shiny layer of calcium carbonate.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschcr-lime",
      name: "Quicklime, slaked lime and whitewashing",
      intuition:
        "Quicklime (calcium oxide) reacts with water so fiercely that it hisses and gets hot; the product is slaked lime. Whitewash is a suspension of slaked lime. On the wall it slowly takes carbon dioxide from the air and turns into a thin, shiny coat of calcium carbonate.",
      definition:
        "The two steps:\n" +
        "- **CaO(s) + H₂O(l) → Ca(OH)₂(aq) + heat**: quicklime → **slaked lime**; strongly **exothermic**.\n" +
        "- Walls are whitewashed with a suspension of **slaked lime, Ca(OH)₂**, not quicklime.\n" +
        "- On the wall: **Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)**. The thin **calcium carbonate** layer gives the **shine**, and it forms over two or three days.\n" +
        "- Calcium hydroxide is an **inorganic** compound.",
      table: {
        columns: ["Name", "Formula", "Role"],
        rows: [
          { cells: ["Quicklime", "CaO", "Reacts with water to make slaked lime"] },
          {
            cells: ["Slaked lime", "Ca(OH)₂", "Applied to the wall as whitewash"],
            noteAmber: "CDS 2023 (I): it is slaked lime, not quicklime, that is used for whitewashing.",
            pyqExampleId: "60c8c7cb-8917-4a88-8b87-0432b2975793",
          },
          {
            cells: ["Calcium carbonate", "CaCO₃", "Shiny layer formed with CO₂ from air"],
            pyqExampleId: "939d10b7-dd9c-40cb-90a1-5c0d9102650d",
          },
        ],
      },
      pyqExampleId: "c2b50eb9-507a-400b-8d9a-efc178b47cf7",
      selfCheckExample: {
        prompt: "Why does a freshly whitewashed wall become shiny only after two or three days?",
        steps: [
          "Whitewash is slaked lime, Ca(OH)₂.",
          "It reacts slowly with the small amount of CO₂ in air.",
          "The product, calcium carbonate, forms a thin shiny layer as the reaction proceeds.",
        ],
        answer: "The slaked lime takes days to react with CO₂ in the air and form shiny calcium carbonate.",
      },
      practiceSet: [
        { prompt: "What is the chemical name of slaked lime?", answer: "Calcium hydroxide" },
        { prompt: "Is the reaction of quicklime with water exothermic or endothermic?", answer: "Exothermic" },
        { prompt: "Which gas from the air reacts with whitewash?", answer: "Carbon dioxide" },
      ],
      traps: [
        {
          title: "Whitewash is slaked lime, not quicklime",
          body: "Walls are coated with **Ca(OH)₂**. Quicklime (CaO) is what you start from, and it is the **slaked lime** that reacts with CO₂ on the wall.",
        },
        {
          title: "The shine is calcium carbonate",
          body: "The shiny finish is **CaCO₃**, formed from Ca(OH)₂ and **CO₂**. Oxygen plays no part.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcr-gas-tests",
      name: "Tests for common gases",
      intuition:
        "Each common gas has a quick test. Carbon dioxide turns limewater milky, because it makes insoluble chalk. Hydrogen burns with a pop. Oxygen relights a glowing splint.",
      definition:
        "The tests:\n" +
        "- **Carbon dioxide**: turns **limewater milky** (Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O). Exhaled air does this.\n" +
        "- CO₂ comes from a **carbonate + dilute acid**, at room temperature.\n" +
        "- **Hydrogen**: burns with a **pop** (a metal such as zinc + dilute acid makes it).\n" +
        "- **Oxygen**: relights a **glowing splint**.",
      table: {
        columns: ["Gas", "Test", "Made by"],
        rows: [
          {
            cells: ["Carbon dioxide", "Limewater turns milky", "Carbonate + dilute acid; breathing out"],
            pyqExampleId: "ef2d6d90-2ce5-4b6b-bf72-773481469466",
          },
          { cells: ["Hydrogen", "Burns with a pop", "Zinc or magnesium + dilute acid"] },
          { cells: ["Oxygen", "Relights a glowing splint", "Heating potassium permanganate"] },
        ],
      },
      pyqExampleId: "643b66a2-956c-40a6-a427-c96fab96c984",
      practiceSet: [
        { prompt: "Which gas turns limewater milky?", answer: "Carbon dioxide" },
        { prompt: "What forms when limewater turns milky?", answer: "Calcium carbonate" },
        { prompt: "Which gas burns with a pop?", answer: "Hydrogen" },
      ],
      traps: [
        {
          title: "Zinc and acid give hydrogen, not CO₂",
          body: "Only a **carbonate** (or hydrogen carbonate) with acid gives CO₂, which turns limewater milky. A metal with acid gives hydrogen, which does not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcr-chlor-alkali",
      name: "Electrolysis of brine",
      intuition:
        "Passing electricity through salt water splits it three ways: chlorine at one electrode, hydrogen at the other, and sodium hydroxide left in the solution. Because it makes chlorine and an alkali, it is called the chlor-alkali process.",
      definition:
        "The process:\n" +
        "- 2NaCl + 2H₂O → **2NaOH** + **Cl₂** + **H₂**.\n" +
        "- **Chlorine** at the **anode**, **hydrogen** at the **cathode**, **sodium hydroxide** in the solution.\n" +
        "- Chlorine and slaked lime then give bleaching powder.",
      table: {
        columns: ["Product", "Where it forms"],
        rows: [
          { cells: ["Chlorine gas", "Anode"] },
          { cells: ["Hydrogen gas", "Cathode"] },
          {
            cells: ["Sodium hydroxide", "Left in the solution"],
            pyqExampleId: "3b145612-08ec-4627-9c9d-16b12ba0a503",
          },
        ],
      },
      pyqExampleId: "3b145612-08ec-4627-9c9d-16b12ba0a503",
      practiceSet: [
        { prompt: "Which gas forms at the anode when brine is electrolysed?", answer: "Chlorine" },
        { prompt: "Which gas forms at the cathode when brine is electrolysed?", answer: "Hydrogen" },
      ],
    },
  ],
};
