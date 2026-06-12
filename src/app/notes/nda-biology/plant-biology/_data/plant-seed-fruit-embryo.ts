import type { SubtopicNote } from "@/app/notes/_types";

export const PLANT_SEED_FRUIT_EMBRYO_NOTE: SubtopicNote = {
  subtopicName: "Seed, Fruit and Embryo Development",
  title: "Seed, Fruit and Embryo Development",
  oneLineDefinition:
    "The seed embryo has a radicle (becomes the root) and a plumule (becomes the shoot); a false fruit like apple develops from the thalamus; and the ovule's nucellus stores reserve food.",
  whyItMatters:
    "4 PYQs, EASY–MODERATE. The reliable fact is the radicle → root / plumule → shoot pair from the germinating embryo. " +
    "Two reproductive-structure facts round it out: apple is a FALSE fruit (from the thalamus, not the ovary), and a sunflower 'flower' is actually an inflorescence (many florets).",
  concepts: [
    // SEED EMBRYO PARTS — radicle/plumule (features radicle PYQ + diagram)
    {
      kind: "formula" as const,
      slug: "plant-seed-embryo-parts",
      name: "The seed embryo — radicle and plumule",
      intuition:
        "Inside every seed is a tiny embryo with two growing tips. The radicle points down and becomes the root; the plumule points up and becomes the shoot. The cotyledon stores food to fuel that early growth. " +
        "Remember: Radicle → Root (both start with R, both go down).",
      definition:
        "The parts of the seed embryo and what each becomes on germination:\n" +
        "- **Radicle** — the embryonic **root**; emerges first and grows DOWN into the primary root.\n" +
        "- **Plumule** — the embryonic **shoot**; grows UP into the stem and leaves.\n" +
        "- **Cotyledon** — stores **reserve food** for the seedling.\n" +
        "- **Seed coat (testa)** — the protective outer layer.",
      visualizationSlug: "plant-seed-parts",
      authoredExample: {
        prompt:
          "During germination, one structure of the embryo emerges first and grows downward to anchor the seedling. Name it and what it becomes.",
        steps: [
          "The downward-growing embryonic part is the radicle.",
          "It develops into the primary root.",
        ],
        answer: "The radicle — it grows into the root.",
      },
      selfCheckExample: {
        prompt:
          "Which embryo part becomes the shoot, and which becomes the root?",
        steps: [
          "Plumule → shoot (grows up).",
          "Radicle → root (grows down).",
        ],
        answer: "Plumule = shoot; radicle = root.",
      },
      practiceSet: [
        { prompt: "Which embryo part grows into the root?", answer: "Radicle", method: "Radicle → Root" },
        { prompt: "Which embryo part grows into the shoot?", answer: "Plumule" },
        { prompt: "Which embryo part stores reserve food in the seed?", answer: "Cotyledon" },
      ],
      pyqExampleId: "dadda44a-7656-4b9e-b88f-02f5509477f7", // radicle → root
      traps: [
        {
          title: "Radicle = Root, Plumule = shoot",
          body:
            "Don't swap them. The **radicle** grows into the **root** (down); the **plumule** grows into the **shoot** (up). 'Radicle → Root' shares the R. Cotyledon and epicotyl are distractors — cotyledon stores food.",
        },
      ],
    },

    // FRUIT DEVELOPMENT — apple false fruit (thalamus) + inflorescence
    {
      kind: "reference" as const,
      slug: "plant-fruit-development",
      name: "True vs false fruit, and the inflorescence",
      intuition:
        "A true fruit develops from the ovary. A FALSE fruit (pseudocarp) has its fleshy edible part come from some OTHER floral part — in apple, that's the thalamus (receptacle). " +
        "Separately, what looks like one big 'flower' in a sunflower or marigold is really an inflorescence — a cluster of many tiny florets.",
      definition:
        "Two reproductive-structure facts:\n" +
        "- **False fruit (pseudocarp)** — the fleshy part develops from a floral part OTHER than the ovary. In **apple**, the edible flesh comes from the **thalamus (receptacle)**; the true fruit is the core.\n" +
        "- **Inflorescence** — a cluster of many small flowers (florets) on a common axis. **Sunflower and marigold** (family Asteraceae) are inflorescences, not single flowers — the colourful 'flower' is a head of many florets.",
      table: {
        columns: ["Structure", "What it is", "Example"],
        rows: [
          {
            cells: ["False fruit (apple)", "Fleshy part from the **thalamus**, not the ovary", "Apple, pear (pseudocarps)"],
            noteAmber: "Apple's edible part = thalamus / receptacle (NDA 2026), not petal/sepal/stamen.",
          },
          {
            cells: ["Inflorescence", "A cluster of many florets on one axis", "Sunflower, marigold (Asteraceae)"],
            noteAmber: "The colourful sunflower/marigold 'flower' is an INFLORESCENCE (NDA 2017).",
          },
        ],
        caption:
          "Apple flesh = thalamus (false fruit); sunflower head = inflorescence (many florets).",
      },
      selfCheckExample: {
        prompt:
          "Why is an apple called a false fruit, and which floral part forms its edible flesh?",
        steps: [
          "A true fruit develops from the ovary; the apple's flesh does not.",
          "Apple's fleshy edible part develops from the **thalamus (receptacle)**.",
          "Because the flesh is not from the ovary, the apple is a FALSE fruit.",
        ],
        answer: "Its edible flesh comes from the thalamus, not the ovary — so it is a false fruit.",
      },
      practiceSet: [
        { prompt: "Which floral part forms the edible flesh of an apple?", answer: "Thalamus (receptacle)" },
        { prompt: "Apple is an example of a true fruit or a false fruit?", answer: "False fruit (pseudocarp)" },
        { prompt: "The colourful 'flower' of a sunflower is actually what?", answer: "An inflorescence", method: "a head of many florets" },
      ],
      pyqExampleId: "b994766a-6266-4315-8ec6-8964b80db41e", // apple false fruit = thalamus
      traps: [
        {
          title: "Apple flesh = thalamus, not petal/sepal/stamen",
          body:
            "In the apple (a false fruit), the fleshy edible part develops from the **thalamus (receptacle)**. Petal, sepal and stamen are distractors — they don't become the flesh.",
        },
        {
          title: "Sunflower = inflorescence, not a single flower",
          body:
            "Sunflower and marigold belong to the composite family; the showy 'flower' is an **inflorescence** of many small florets, not one flower.",
        },
      ],
    },

    // OVULE STRUCTURE — nucellus stores reserve food
    {
      kind: "reference" as const,
      slug: "plant-ovule-structure",
      name: "Parts of the ovule — where reserve food is stored",
      intuition:
        "The ovule is the structure inside the ovary that becomes the seed. It has several named parts, but for the exam the key one is the nucellus — the nutritive tissue that holds the reserve food for the developing embryo.",
      definition:
        "Parts of the ovule and their roles:\n" +
        "- **Nucellus** — the central nutritive tissue (megasporangium); holds the **reserve food** for the embryo.\n" +
        "- **Integument** — the outer protective covering (becomes the seed coat).\n" +
        "- **Funicle** — the stalk attaching the ovule to the ovary wall.\n" +
        "- **Chalaza** — the base of the ovule where integuments and nucellus meet.",
      table: {
        columns: ["Ovule part", "Role"],
        rows: [
          {
            cells: ["**Nucellus**", "Nutritive tissue holding the reserve food"],
            noteAmber: "The ovule part with reserve food = nucellus (NDA 2026).",
          },
          { cells: ["**Integument**", "Outer protective layer (→ seed coat)"] },
          { cells: ["**Funicle**", "Stalk attaching the ovule"] },
          { cells: ["**Chalaza**", "Base where integument meets the nucellus"] },
        ],
        caption:
          "Reserve food = nucellus; protection = integument; stalk = funicle.",
      },
      selfCheckExample: {
        prompt:
          "Which part of the ovule supplies stored food to the developing embryo — the integument or the nucellus?",
        steps: [
          "The integument is a protective covering (→ seed coat).",
          "The nucellus is the nutritive tissue that stores reserve food.",
        ],
        answer: "The nucellus.",
      },
      practiceSet: [
        { prompt: "Which ovule part possesses the reserve food?", answer: "Nucellus" },
        { prompt: "Which ovule part becomes the seed coat?", answer: "Integument" },
        { prompt: "What is the stalk attaching the ovule called?", answer: "Funicle" },
      ],
      pyqExampleId: "e6376a72-511a-49b5-b753-ebce08962f6d", // nucellus has reserve food
      traps: [
        {
          title: "Reserve food = nucellus (not integument or funicle)",
          body:
            "The ovule part with the reserve food is the **nucellus** (the nutritive megasporangium). The integument protects, the funicle is the stalk, the chalaza is the base — none store the food.",
        },
      ],
    },
  ],
};
