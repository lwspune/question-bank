import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MO_GYNOECIUM_NOTE: SubtopicNote = {
  subtopicName: "Gynoecium, Fruit and Seed",
  title: "Gynoecium, Fruit and Seed",
  oneLineDefinition:
    "The carpels and the five kinds of placentation with their NCERT plants, then the fruit that the ovary becomes and the parts of dicot and monocot seeds.",
  whyItMatters:
    "Seven NEET questions: five MODERATE and two EASY. Placentation was asked four times, in NEET 2023, Re-NEET 2024, NEET 2026 and Re-NEET 2026, always as plant names to match. NEET 2024 added a drupe and a labelled seed, and NEET 2025 asked for the aleurone layer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomo-placentation",
      name: "Gynoecium and placentation",
      intuition:
        "The gynoecium is the female whorl, made of one or more carpels. Inside the ovary the ovules sit on a cushion called the placenta, and the pattern they make is placentation. NEET gives four or five plants and asks you to match each with its placentation, so learn the NCERT plants in pairs with the type.",
      definition:
        "The gynoecium in NCERT:\n" +
        "- Each **carpel** has three parts: **stigma**, **style** and **ovary**. The ovules are borne on a flattened cushion, the **placenta**.\n" +
        "- **Apocarpous**: more than one carpel, all **free** (lotus, rose). **Syncarpous**: carpels **fused** (mustard, tomato).\n" +
        "- After fertilisation the **ovules** become **seeds** and the **ovary** becomes the **fruit**.\n" +
        "- **Placentation** is the arrangement of **ovules** inside the ovary.",
      table: {
        columns: ["Placentation", "Where the ovules sit", "NCERT examples"],
        rows: [
          { cells: ["Marginal", "On a ridge along the ventral suture of the ovary, in two rows", "Pea"] },
          {
            cells: ["Axile", "On a central axis in an ovary with several chambers", "China rose, tomato, lemon"],
            noteAmber: "NEET 2023: china rose, Petunia and lemon was the axile set.",
            pyqExampleId: "ad63d76d-927b-44aa-baf1-c7a606a92a47",
          },
          { cells: ["Parietal", "On the inner wall of the ovary; a one-chambered ovary becomes two-chambered by a false septum", "Mustard, *Argemone*"] },
          { cells: ["Free central", "On a central axis, with no septa", "*Dianthus*, primrose"] },
          {
            cells: ["Basal", "On a placenta at the base of the ovary, with a single ovule", "Sunflower, marigold"],
            noteAmber: "Re-NEET 2024: marigold is basal and primrose is free central.",
            pyqExampleId: "8b15d553-4091-46c3-afd4-4ac76250f5df",
          },
        ],
      },
      pyqExampleId: "dd990d44-2ea3-4419-8fe4-f595c68a184b",
      selfCheckExample: {
        prompt: "In a *Dianthus* ovary the ovules are borne on a central axis and there are no septa between chambers. Name this placentation and the other NCERT plant that shows it.",
        steps: [
          "Ovules on a central axis with no septa is free central placentation.",
          "If septa were present, a central axis would mean axile placentation instead.",
          "NCERT names primrose as the other example.",
        ],
        answer: "Free central placentation, also seen in primrose.",
      },
      practiceSet: [
        { prompt: "What are the three parts of a carpel?", answer: "Stigma, style and ovary" },
        { prompt: "What is a gynoecium with more than one carpel, all free, called? Give one NCERT example.", answer: "Apocarpous, as in lotus or rose" },
        { prompt: "What is the cushion inside the ovary that bears the ovules called?", answer: "The placenta" },
        { prompt: "After fertilisation, what does the ovary become?", answer: "The fruit" },
      ],
      traps: [
        {
          title: "China rose is axile, mustard is parietal",
          body: "**China rose, tomato and lemon** are **axile**. **Mustard and *Argemone*** are **parietal**: the ovules sit on the wall, and the false septum only makes the ovary look two-chambered.",
        },
        {
          title: "Free central has no septa",
          body: "Both **axile** and **free central** have ovules on a central axis. Axile has septa dividing the ovary; **free central** (*Dianthus*, primrose) has **none**.",
        },
        {
          title: "Basal means one ovule",
          body: "In **basal** placentation (sunflower, marigold) the placenta is at the base of the ovary and carries a **single** ovule.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomo-fruit-seed",
      name: "Fruit and seed",
      visualizationSlug: "plant-seed-parts",
      intuition:
        "After fertilisation the ovary ripens into a fruit and each ovule becomes a seed. The fruit wall has three layers, and in a drupe such as mango you can see all three. Inside the seed is the embryo, a tiny plant with a root end and a shoot end, wrapped in a seed coat and fed by cotyledons or endosperm.",
      definition:
        "Fruit:\n" +
        "- A **fruit** is a mature or ripened ovary formed after fertilisation. A fruit formed **without** fertilisation is **parthenocarpic**.\n" +
        "- The fruit wall, the **pericarp**, may be dry or fleshy. A fleshy pericarp has an outer **epicarp**, a middle **mesocarp** and an inner **endocarp**.\n" +
        "- **Drupe**: mango and coconut. Drupes come from **monocarpellary superior** ovaries and are **one-seeded**. In mango the mesocarp is fleshy and edible and the endocarp is stony; in coconut the mesocarp is **fibrous**.\n" +
        "Seed:\n" +
        "- **Dicot seed**: the seed coat has an outer **testa** and an inner **tegmen**. The **hilum** is the scar where the seed was attached to the fruit; the **micropyle** is a small pore above it. The embryo has an **embryonal axis** and **two cotyledons**, with the **radicle** at one end and the **plumule** at the other.\n" +
        "- **Endospermous** dicot seed: castor. Bean, gram and pea have **no endosperm** in the mature seed.\n" +
        "- **Monocot seed** (maize): usually endospermous, but orchid seeds are not. The seed coat is membranous and fused with the fruit wall. A proteinous **aleurone layer** separates the bulky endosperm from the embryo. The single shield-shaped cotyledon is the **scutellum**; the plumule and radicle are covered by the **coleoptile** and **coleorhiza**.",
      table: {
        columns: ["Part", "What it is or does", "Example"],
        rows: [
          {
            cells: ["Drupe", "One-seeded fruit from a monocarpellary superior ovary", "Mango, coconut"],
            noteAmber: "NEET 2024: mango was matched with drupe.",
            pyqExampleId: "7f3340d1-3d08-4e7c-9ace-d93349241e0d",
          },
          { cells: ["Mesocarp", "The middle layer of the fruit wall", "Fleshy and edible in mango; fibrous in coconut"] },
          { cells: ["Hilum", "Scar on the seed coat where the seed was attached to the fruit", "Bean or gram seed"] },
          { cells: ["Micropyle", "Small pore in the seed coat, above the hilum", "Bean or gram seed"] },
          {
            cells: ["Radicle", "The end of the embryonal axis that grows into the root", "Every seed"],
            noteAmber: "NEET 2024: in the labelled seed, the radicle was the part destined to form the root.",
            pyqExampleId: "3da2bcfd-5d23-40e6-99b5-6a5c433c485c",
          },
          { cells: ["Plumule", "The end of the embryonal axis that grows into the shoot", "Every seed"] },
          { cells: ["Aleurone layer", "Proteinous layer between the endosperm and the embryo", "Maize"] },
          { cells: ["Scutellum", "The single large shield-shaped cotyledon", "Maize and other cereals"] },
          { cells: ["Coleoptile and coleorhiza", "Sheaths covering the plumule and the radicle", "Maize"] },
        ],
      },
      pyqExampleId: "7f3340d1-3d08-4e7c-9ace-d93349241e0d",
      selfCheckExample: {
        prompt: "Mango and coconut are both drupes. How is the middle layer of the fruit wall different in the two?",
        steps: [
          "The middle layer of the pericarp is the mesocarp.",
          "In mango the mesocarp is fleshy, and it is the part we eat.",
          "In coconut the mesocarp is fibrous.",
        ],
        answer: "Mango has a fleshy, edible mesocarp; coconut has a fibrous mesocarp.",
      },
      practiceSet: [
        { prompt: "What is a fruit that forms without fertilisation called?", answer: "Parthenocarpic" },
        { prompt: "What is the scar on the seed coat through which the seed was attached to the fruit?", answer: "The hilum" },
        { prompt: "What is the single shield-shaped cotyledon of a maize grain called?", answer: "The scutellum" },
        { prompt: "Name a dicot seed in which the endosperm stores the food.", answer: "Castor" },
        { prompt: "What sheath covers the plumule in a maize grain?", answer: "The coleoptile" },
      ],
      traps: [
        {
          title: "Coconut mesocarp is fibrous",
          body: "Mango and coconut are both drupes, but only mango has a **fleshy, edible** mesocarp. In coconut the mesocarp is **fibrous**.",
        },
        {
          title: "Pea and bean seeds have no endosperm",
          body: "In **bean, gram and pea** the cotyledons store the food and the mature seed has **no endosperm**. **Castor** is the NCERT dicot seed that keeps its endosperm.",
        },
        {
          title: "Coleoptile covers the plumule, coleorhiza the radicle",
          body: "The shoot end (plumule) is in the **coleoptile** and the root end (radicle) is in the **coleorhiza**. Remember: rhiza means root.",
        },
      ],
    },
  ],
};
