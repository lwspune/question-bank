import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CP_SEEDS_NOTE: SubtopicNote = {
  subtopicName: "Gymnosperms and Angiosperms",
  title: "Gymnosperms and Angiosperms",
  oneLineDefinition:
    "Seed plants are of two kinds: gymnosperms bear naked seeds on cones with no flowers or fruits, and angiosperms bear flowers and keep their seeds inside fruits; angiosperms are dicots or monocots.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE: which plant is not a gymnosperm, which pairs are all gymnosperms, a true feature of Pinus, and a true feature of dicot plants. Learn the gymnosperm list and the dicot and monocot table and each is quick.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9cpse-gymnosperms",
      name: "Gymnosperms: plants with naked seeds",
      intuition:
        "Pick up a pine cone. Its seeds sit openly on the scales of the cone, with no fruit wrapped around them. Gymnosperm means 'naked seed'. These are the tall, evergreen, woody trees of cold hills and gardens, such as pine, deodar and the Christmas tree.",
      definition:
        "- Seeds are **naked**: not enclosed in a fruit. They form on **cones**.\n" +
        "- **No flowers** and **no fruits**.\n" +
        "- Mostly **evergreen, perennial and woody** trees and shrubs.\n" +
        "- Examples: **Cycas**, **Pinus** (pine), **Picea** (spruce), **Thuja** (morpankhi), **deodar** and the **Christmas tree**.",
      table: {
        columns: ["Gymnosperm", "Where you may see it"],
        rows: [
          { cells: ["Cycas", "Gardens; it looks like a small palm"] },
          { cells: ["Pinus (pine)", "Hill forests; bears woody cones"] },
          { cells: ["Deodar", "Himalayan forests"] },
          { cells: ["Thuja (morpankhi)", "Garden hedges; leaves spread like a peacock's tail"] },
          { cells: ["Christmas tree, Picea", "Gardens and cold hills"] },
        ],
        caption: "Cycas looks like a palm, but a palm is a flowering plant and Cycas is a gymnosperm.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: deodar, Cycas, mango, Pinus.",
        steps: ["Deodar, Cycas and Pinus bear naked seeds and no fruit.", "The mango is a fruit with its seed inside, so the mango tree is a flowering plant."],
        answer: "Mango",
      },
      practiceSet: [
        { prompt: "What does the name gymnosperm mean?", answer: "Naked seed: the seeds are not covered by a fruit" },
        { prompt: "On what structures do the seeds of a pine tree form?", answer: "On cones" },
        { prompt: "Do gymnosperms bear flowers?", answer: "No: they have no flowers and no fruits" },
        { prompt: "Is the morpankhi (Thuja) a gymnosperm or an angiosperm?", answer: "A gymnosperm" },
      ],
      pyqExampleId: "4696457e-8b90-4041-b8e5-8fd7e44b870d",
      traps: [
        {
          title: "Saying gymnosperm seeds are covered",
          body: "Gymnosperm seeds lie bare on the scales of a cone. Only angiosperms keep their seeds inside a fruit.",
        },
        {
          title: "Calling Cycas a palm",
          body: "Cycas looks like a palm but has no flowers and bears naked seeds. It is a gymnosperm.",
        },
        {
          title: "Taking every evergreen garden plant for a gymnosperm",
          body: "Asparagus, hibiscus and palms are flowering plants. Check for flowers and fruits before calling a plant a gymnosperm.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cpse-angiosperms",
      name: "Angiosperms: dicots and monocots",
      intuition:
        "Most plants you know, from grass to mango trees, are flowering plants. Their seeds grow inside a fruit. Split a seed of gram and it opens into two halves (two cotyledons): that is a dicot. A grain of maize or rice does not split: it has one cotyledon, a monocot. The rest of the plant follows the seed: the roots, the veins of the leaves and the flower parts all differ.",
      definition:
        "- **Angiosperms** bear **flowers**, and their seeds are **enclosed in a fruit**.\n" +
        "- **Dicots**: two cotyledons, **tap root**, **reticulate** (net-like) venation, flower parts in **fours or fives**, vascular bundles **in a ring** in the stem.\n" +
        "- **Monocots**: one cotyledon, **fibrous roots**, **parallel** venation, flower parts in **threes** (trimerous), vascular bundles **scattered** in the stem.\n" +
        "- Dicot examples: pea, gram, mango, hibiscus, sunflower, Catharanthus. Monocot examples: maize, wheat, rice, banana, onion, coconut, asparagus.",
      table: {
        columns: ["Feature", "Dicot", "Monocot"],
        rows: [
          { cells: ["Cotyledons in the seed", "Two", "One"] },
          { cells: ["Roots", "Tap root", "Fibrous roots"] },
          { cells: ["Venation of leaves", "Reticulate (net-like)", "Parallel"] },
          { cells: ["Flower parts", "In fours or fives", "In threes (trimerous)"] },
          { cells: ["Vascular bundles in the stem", "In a ring", "Scattered"] },
          { cells: ["Examples", "Pea, mango, hibiscus, sunflower", "Maize, wheat, rice, banana, onion"] },
        ],
        caption: "Every row flips between the two columns: learn one column and the other is its opposite.",
      },
      selfCheckExample: {
        prompt: "A plant has leaves with parallel veins and a bunch of thin fibrous roots. Is it a dicot or a monocot?",
        steps: ["Parallel venation and fibrous roots are both monocot features."],
        answer: "A monocot",
      },
      practiceSet: [
        { prompt: "How many cotyledons does a seed of gram have?", answer: "Two (it is a dicot)" },
        { prompt: "What kind of venation does a mango leaf have?", answer: "Reticulate (net-like)" },
        { prompt: "In which flowering plants are the flower parts in threes?", answer: "In monocots" },
        { prompt: "Is the banana plant a dicot or a monocot?", answer: "A monocot" },
      ],
      pyqExampleId: "c0573dcb-ca3b-421d-b6d4-68e486343cec",
      traps: [
        {
          title: "Giving dicots fibrous roots",
          body: "Dicots have a tap root. Fibrous roots belong to monocots such as maize and wheat.",
        },
        {
          title: "Calling trimerous flowers a dicot feature",
          body: "Flowers with parts in threes are a monocot feature. Dicot flowers have parts in fours or fives.",
        },
      ],
    },
  ],
};
