import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_EC_ECOSYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Ecosystems and Energy Flow",
  title: "Ecosystems and Energy Flow",
  oneLineDefinition:
    "Population, community, ecosystem and biome, how a community develops by succession, how food chains pass on food and poisons, and why energy dwindles at each step.",
  whyItMatters:
    "Eight CDS questions from 2017 (II) to 2026 (II). Two ask simply what a food chain is, two are about energy flow, and one HARD question asks the order of the stages of succession.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbiec-ecosystem",
      name: "Population, community, ecosystem and succession",
      intuition:
        "Start with one deer. All the deer in a forest are a population. All the living things in the forest together, deer, trees, birds and fungi, are a community. Add the soil, water, air and sunlight they depend on, and you have an ecosystem. A community also changes over time: bare ground is slowly taken over by plants, each set changing the place for the next, until a stable community settles.",
      definition:
        "Levels of ecology (NCERT Class 10 and 12):\n" +
        "- **Population**: organisms of **one species** living in the **same area at the same time**.\n" +
        "- **Community**: populations of **many species** living together in one area.\n" +
        "- **Ecosystem**: a community **together with its non-living (abiotic) environment**: a pond, a forest, an ocean, even an **aquarium** (a man-made ecosystem).\n" +
        "- **Biome**: a very large region with its own climate and vegetation, such as a desert, grassland or tropical rain forest.\n" +
        "- **Ecological succession**: the gradual change of the community in a place, in the order **nudation** (a bare area forms), **migration** (seeds and spores arrive), ecesis (they settle), **reaction** (the living things change the place), **stabilisation** (a stable **climax community**).\n" +
        "- On bare rock the first settlers, the **pioneer species**, are usually **lichens**.",
      table: {
        columns: ["Level or stage", "Meaning"],
        rows: [
          {
            cells: ["Population", "One species, same area, same time"],
            noteAmber: "CDS 2021 (II): a population is a group of organisms of one species living in the same area at the same time.",
            pyqExampleId: "6a91dfc1-5493-474b-ac00-3e2af0c8029a",
          },
          { cells: ["Community", "Many species living together"] },
          { cells: ["Ecosystem", "Community plus its abiotic environment"] },
          { cells: ["Biome", "Large region of one climate and vegetation type"] },
          {
            cells: ["Succession", "Nudation, migration, reaction, stabilisation"],
            noteAmber: "CDS 2019 (II), HARD: the order is Nudation, Migration, Reaction and Stabilization.",
            pyqExampleId: "ab951b82-6f24-4d1a-b48e-a34636ddc52b",
          },
        ],
      },
      pyqExampleId: "d45fb470-2930-49de-82b8-fe25ea3c3821",
      selfCheckExample: {
        prompt: "Lava cools into bare rock. Describe how a forest could finally grow there.",
        steps: [
          "First the bare surface forms (nudation), and spores of lichens arrive and settle (migration).",
          "Lichens, the pioneers, break the rock and add dead matter, making a thin soil (reaction).",
          "Mosses, then grasses, shrubs and finally trees take over, each changing the place for the next.",
          "At last a stable climax community, here a forest, remains (stabilisation).",
        ],
        answer: "By succession: lichens, then mosses, grasses, shrubs and trees, ending in a stable climax forest.",
      },
      practiceSet: [
        { prompt: "What is a large region with its own climate and vegetation, such as a desert, called?", answer: "A biome" },
        { prompt: "Which organisms are usually the first to grow on bare rock?", answer: "Lichens (the pioneer species)" },
        { prompt: "What is the final, stable community of a succession called?", answer: "The climax community" },
        { prompt: "What is a group of populations of different species living in one area called?", answer: "A community" },
      ],
      traps: [
        {
          title: "Community has no soil or water in it",
          body: "A **community** is only the living part. Add the **abiotic** part (soil, water, air, light) and it becomes an **ecosystem**. A **population** is one species only.",
        },
        {
          title: "Succession starts with nudation",
          body: "Succession cannot begin until there is a bare area: **nudation** comes first and **stabilisation** last, with migration and reaction in between in that order.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbiec-food-chains",
      name: "Food chains and biomagnification",
      intuition:
        "A food chain shows who eats whom. It always starts with a green plant, which makes food from sunlight, and each next link eats the one before it. Some poisons, such as DDT, are not broken down or passed out of the body. So each animal keeps all the poison from everything it ate, and the amount climbs higher at every step up the chain.",
      definition:
        "Food chains (NCERT Class 10, Our Environment):\n" +
        "- A **food chain** is the **passage of food, and so of energy**, from one organism to the next.\n" +
        "- Each step is a **trophic level**: **producers** (green plants) first, then **herbivores** (primary consumers), then **carnivores** (secondary and tertiary consumers). For example grass, insect, frog, snake, hawk.\n" +
        "- **Decomposers** (bacteria and fungi) break down dead bodies and return nutrients to the soil.\n" +
        "- **Bioaccumulation**: a heavy metal or pesticide builds up **inside one organism** over its life.\n" +
        "- **Biomagnification**: its concentration **rises at each higher trophic level**, so a large fish carries more pesticide than the plankton. With DDT, fish-eating birds get thin eggshells that break.",
      table: {
        columns: ["Trophic level", "Role", "Example"],
        rows: [
          { cells: ["First", "Producer", "Grass, phytoplankton"] },
          { cells: ["Second", "Primary consumer (herbivore)", "Insect, deer, zooplankton"] },
          { cells: ["Third", "Secondary consumer", "Frog, small fish"] },
          { cells: ["Fourth", "Tertiary consumer", "Snake, big fish"] },
          {
            cells: ["Top", "Top carnivore; gathers the most pesticide", "Hawk, fish-eating bird"],
            noteAmber: "CDS 2018 (I): bioaccumulation is build-up in one organism; large fish holding more pesticide than plankton is biomagnification, so Statement II does not explain Statement I.",
            pyqExampleId: "5bf85fb7-bc62-40eb-b4cc-daf18bc9eb28",
          },
          {
            cells: ["All levels", "Decomposers return nutrients", "Bacteria, fungi"],
            noteAmber: "CDS 2019 (II): a food chain is the passage of food, and so energy, from one organism to another.",
            pyqExampleId: "81fdb31b-b099-4644-ae29-7993ad4a9be2",
          },
        ],
      },
      pyqExampleId: "2c3df6f1-4078-4e0a-959d-4d12408a5763",
      selfCheckExample: {
        prompt: "DDT is sprayed near a lake. The water holds only a tiny trace of it, yet the fish-eating birds of the lake carry a large amount. Explain why.",
        steps: [
          "DDT is not broken down or passed out, so each organism keeps what it takes in.",
          "Plankton take a little from the water; small fish eat many plankton, and big fish eat many small fish.",
          "Each step concentrates the DDT further, so the birds at the top carry the most.",
        ],
        answer: "Biomagnification: DDT stays in the body, so its concentration rises at each higher trophic level.",
      },
      practiceSet: [
        { prompt: "What is each step of a food chain called?", answer: "A trophic level" },
        { prompt: "Which organisms break down dead bodies and return nutrients to the soil?", answer: "Decomposers (bacteria and fungi)" },
        { prompt: "Which organisms are always at the first trophic level?", answer: "Producers (green plants)" },
        { prompt: "What is the build-up of a pesticide inside a single organism over its life called?", answer: "Bioaccumulation" },
      ],
      traps: [
        {
          title: "A food chain starts with a producer",
          body: "Every food chain begins with a **green plant** and then runs through animals that eat each other. A set of only herbivores, or one that puts the grass last, is not a food chain.",
        },
        {
          title: "Accumulation is one body, magnification is up the chain",
          body: "**Bioaccumulation** happens **within one organism**. **Biomagnification** is the rise **from one trophic level to the next**. The plankton-to-fish observation is biomagnification.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsbiec-energy",
      name: "Energy flow and the ten per cent law",
      intuition:
        "Of all the energy a plant stores, an animal eating it keeps only about a tenth in its own body; the rest is used for living and lost as heat. The same happens at every step. So energy shrinks tenfold at each level, and after four or five steps there is too little left to feed another level. Energy only flows forward and is lost as heat, but the nutrients in dead bodies are returned to the soil and used again.",
      definition:
        "Energy flow (NCERT Class 10 and 12):\n" +
        "- **Ten per cent law** (Lindeman): only about **10 per cent** of the energy at one trophic level is passed to the next; the rest is lost, mostly as **heat** in respiration.\n" +
        "- So food chains are short, usually **3 or 4** (at most 5) levels: the **energy available falls** at each higher level.\n" +
        "- **Energy flow is unidirectional**: from the Sun to producers to consumers, and it is never reused.\n" +
        "- **Nutrient flow is cyclic**: decomposers return matter to the soil, and it goes round in the biogeochemical cycles (carbon, nitrogen, water).\n" +
        "- The **pyramid of energy** is therefore **always upright**.",
      formula: {
        label: "Energy at a trophic level",
        latex: "E_n = E_1 \\times \\left(\\tfrac{1}{10}\\right)^{\\,n-1}",
        symbols: [
          { symbol: "E1", meaning: "energy fixed by the producers (first level)" },
          { symbol: "En", meaning: "energy available at level n" },
          { symbol: "n", meaning: "number of the trophic level" },
        ],
      },
      authoredExample: {
        prompt: "The plants of a field fix 20,000 J of energy. About how much reaches the secondary consumers (the third trophic level)?",
        steps: [
          "Producers are level 1, primary consumers level 2, secondary consumers level 3.",
          "Level 2 gets one tenth of 20,000 J, which is 2,000 J.",
          "Level 3 gets one tenth of 2,000 J, which is 200 J.",
        ],
        answer: "About 200 J.",
      },
      pyqExampleId: "6ce7ae11-4ed7-4d50-b237-298ca8185a51",
      selfCheckExample: {
        prompt: "A hawk sits at the fourth trophic level and gets 6 J of energy from its food chain. About how much energy did the producers fix?",
        steps: [
          "Going down one level multiplies the energy by 10.",
          "Level 3 had 60 J and level 2 had 600 J.",
          "So level 1, the producers, had 6,000 J.",
        ],
        answer: "About 6,000 J.",
      },
      practiceSet: [
        { prompt: "Plants fix 1,000 J. About how much reaches the herbivores that eat them?", answer: "About 100 J" },
        { prompt: "Who proposed the ten per cent law of energy transfer?", answer: "Raymond Lindeman" },
        { prompt: "In what form is most of the energy lost at each trophic level?", answer: "As heat (in respiration)" },
        { prompt: "Can a pyramid of energy ever be inverted?", answer: "No: it is always upright" },
      ],
      traps: [
        {
          title: "Energy one way, nutrients in a cycle",
          body: "**Energy flows one way** and is lost as heat. **Nutrients cycle**, returned by decomposers. Options that make energy cyclic, or both flows the same, are wrong.",
        },
        {
          title: "Energy, not food or parasites, limits the chain",
          body: "A food chain stops at 4 or 5 levels because the **energy available falls tenfold** at each step. Shortage of food in general, polluted air or parasites are not the reason.",
        },
      ],
    },
  ],
};
