import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CB_SOAPS_NOTE: SubtopicNote = {
  subtopicName: "Soaps, Detergents and Hydrogenation of Oils",
  title: "Soaps, Micelles and Hydrogenation",
  oneLineDefinition:
    "How a soap molecule cleans by forming micelles, why micelles stay spread out, and how nickel turns vegetable oil into solid fat.",
  whyItMatters:
    "Three CDS questions, two of them from 2026 (I). One asks for the hydrogenation catalyst; the others are statement checks on micelles and soap structure.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschcb-soaps",
      name: "Soap molecules and micelles",
      intuition:
        "A soap molecule has two ends that want different things. The long hydrocarbon tail dissolves in grease; the charged head dissolves in water. In water the tails hide together inside a ball, the micelle, with the grease trapped in the middle and the charged heads facing out.",
      definition:
        "The facts:\n" +
        "- **Soap** = **sodium or potassium salt of a long-chain carboxylic (fatty) acid**.\n" +
        "- **Hydrophilic** (water-loving) part: the **ionic carboxylate head**. **Hydrophobic** part: the hydrocarbon **tail**. The oil is not part of the soap.\n" +
        "- **Micelle**: tails point inward around the **grease at the centre**, heads outward in the water.\n" +
        "- The heads carry like charges, so micelles **repel each other and stay dispersed**; they do not precipitate.\n" +
        "- Micelles are colloid-sized, so they **scatter light**; soap solution looks cloudy.\n" +
        "- **Detergents** (sulphonate or ammonium salts) also work in **hard water**, where soap forms scum.",
      table: {
        columns: ["Part or idea", "What it is"],
        rows: [
          { cells: ["Soap", "Na or K salt of a long-chain carboxylic acid"] },
          { cells: ["Hydrophilic part", "Ionic head (–COO⁻ Na⁺)"] },
          { cells: ["Hydrophobic part", "Long hydrocarbon tail"] },
          { cells: ["Grease in a micelle", "Trapped in the centre"] },
          {
            cells: ["Why micelles stay dispersed", "Like charges on the heads repel"],
            noteAmber: "CDS 2026 (I): 'micelles precipitate out because of ion-ion repulsion' is the false statement.",
            pyqExampleId: "7adf637e-eaa1-4f6f-8358-8f456b0cc666",
          },
        ],
      },
      pyqExampleId: "7adf637e-eaa1-4f6f-8358-8f456b0cc666",
      selfCheckExample: {
        prompt: "Soap lathers poorly in hard water but a detergent lathers well. Why?",
        steps: [
          "Hard water contains calcium and magnesium ions.",
          "Soap's carboxylate reacts with them to form an insoluble scum.",
          "A detergent's sulphonate head does not form an insoluble salt with these ions.",
        ],
        answer: "Soap forms scum with Ca²⁺ and Mg²⁺; a detergent does not.",
      },
      practiceSet: [
        { prompt: "Which part of a soap molecule dissolves in water?", answer: "The ionic (carboxylate) head" },
        { prompt: "Where does grease sit in a micelle?", answer: "In the centre" },
        { prompt: "Why does soap solution look cloudy?", answer: "Micelles scatter light" },
      ],
      traps: [
        {
          title: "The hydrophilic part is the ionic head, not the oil",
          body: "'The hydrophilic part of soap is oil' is false. The **ionic head** is hydrophilic; the hydrocarbon **tail** is hydrophobic and dissolves the oil.",
        },
        {
          title: "Repulsion keeps micelles apart",
          body: "Like charges on the micelle surfaces make them **repel**, which keeps them dispersed. Repulsion does not make them settle out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcb-hydrogenation",
      name: "Hydrogenation of oils",
      intuition:
        "Vegetable oils are unsaturated: their chains carry double bonds, which keep them liquid. Adding hydrogen across those double bonds makes the chains saturated and the oil sets into a solid fat. It needs a catalyst, and that catalyst is nickel.",
      definition:
        "The reaction:\n" +
        "- Unsaturated oil + H₂ → saturated fat, with finely divided **nickel** as the catalyst (platinum or palladium also work).\n" +
        "- This is how **vanaspati ghee** is made from vegetable oil.\n" +
        "- Copper, iron and zinc do **not** catalyse this addition.\n" +
        "- Related: in **esterification** (acid + alcohol → ester + water), **concentrated H₂SO₄** acts as the **dehydrating agent**.",
      table: {
        columns: ["Process", "Reagent or catalyst", "Result"],
        rows: [
          {
            cells: ["Hydrogenation of oil", "H₂ with nickel", "Solid saturated fat (vanaspati)"],
            pyqExampleId: "1d778c22-6167-42ee-9473-b7cedaad8b3f",
          },
          { cells: ["Esterification", "Concentrated H₂SO₄ (removes water)", "Ester + water"] },
        ],
      },
      pyqExampleId: "1d778c22-6167-42ee-9473-b7cedaad8b3f",
      practiceSet: [
        { prompt: "Which metal catalyses the hydrogenation of vegetable oils?", answer: "Nickel" },
        { prompt: "What does hydrogenation turn an oil into?", answer: "A solid, saturated fat" },
        { prompt: "What is the role of concentrated sulphuric acid in esterification?", answer: "Dehydrating agent" },
      ],
      traps: [
        {
          title: "The catalyst is nickel",
          body: "Hydrogenation of oils uses **nickel** (or platinum, palladium). Options of copper, iron or zinc with hydrogen are distractors.",
        },
      ],
    },
  ],
};
