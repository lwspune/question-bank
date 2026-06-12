import type { SubtopicNote } from "@/app/notes/_types";

export const ECOSYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Ecosystems, Biomes and Ecological Interactions",
  title: "Ecosystems, Biomes and Ecological Interactions",
  oneLineDefinition:
    "An ecosystem is a community of living organisms (biotic) interacting with their non-living surroundings (abiotic); energy flows one way through trophic levels while organisms feed on one another and live in named biomes around the world.",
  whyItMatters:
    "This is the machinery half of the chapter — 6 PYQs. " +
    "The bank tests it four ways: pick the valid food chain, name an organism's trophic level (producer / primary consumer), recognise a symbiotic relationship (the bee-and-flower mutualism is a favourite), and classify a land or aquatic biome from its description. " +
    "All EASY or MODERATE — get the trophic-level vocabulary and the three symbiosis types cold and these marks are free.",
  concepts: [
    // Foundation — what an ecosystem is (no PYQ)
    {
      kind: "formula" as const,
      slug: "eco-ecosystem-foundations",
      name: "What an ecosystem is — biotic and abiotic components",
      intuition:
        "An ecosystem is everything in one place that interacts — the living things plus the non-living surroundings they depend on. " +
        "A pond is an ecosystem: the fish, plants and microbes (living) plus the water, sunlight, temperature and dissolved minerals (non-living). Knowing this split tells you what each exam term is.",
      definition:
        "An **ecosystem** is a community of living organisms interacting with each other and with their physical environment. Its two component groups are:\n" +
        "- **Biotic components** — all the living organisms, sorted by how they get food: **producers** (green plants, algae — make their own food), **consumers** (animals that eat others), and **decomposers** (bacteria, fungi — break down dead matter).\n" +
        "- **Abiotic components** — the non-living physical and chemical factors: sunlight, temperature, water, air, soil, and minerals.\n" +
        "Two things flow through every ecosystem: **energy** (one-way, from the Sun through producers to consumers) and **nutrients** (recycled in cycles by decomposers).",
      authoredExample: {
        prompt:
          "In a forest ecosystem, sort these into biotic vs abiotic: a deer, sunlight, soil minerals, a mushroom, rainfall, an oak tree.",
        steps: [
          "Biotic = living. The deer, the mushroom and the oak tree are all organisms.",
          "Abiotic = non-living. Sunlight, soil minerals and rainfall are physical/chemical factors.",
          "Within the biotic group note the roles: oak tree = producer, deer = consumer, mushroom = decomposer.",
        ],
        answer:
          "Biotic: deer, mushroom, oak tree. Abiotic: sunlight, soil minerals, rainfall.",
      },
      practiceSet: [
        { prompt: "Name the two component groups of an ecosystem.", answer: "Biotic (living) and abiotic (non-living)" },
        { prompt: "Which biotic group makes its own food?", answer: "Producers", method: "green plants and algae" },
        { prompt: "Which organisms break down dead matter?", answer: "Decomposers", method: "bacteria and fungi" },
        { prompt: "Give three abiotic factors of a pond.", answer: "Water, sunlight, temperature (also air, minerals)" },
      ],
    },

    // trophic levels and food chains (FORMULA) — covers cbe49114 + 528c485d
    {
      kind: "formula" as const,
      slug: "eco-trophic-levels-food-chains",
      name: "Trophic levels, food chains and the 10% law",
      intuition:
        "A food chain is the path energy takes as one organism eats another: grass to grasshopper to frog to snake. " +
        "Each step is a trophic (feeding) level, and the arrow always points TO the organism that gets the energy. Only about a tenth of the energy passes up each step, which is why chains are short and top predators are few.",
      definition:
        "A **food chain** is a linear sequence showing who eats whom, with energy passing from one feeding level to the next. The **trophic levels** are:\n" +
        "- **Producers (1st level)** — green plants and algae; trap solar energy to make food.\n" +
        "- **Primary consumers (2nd level)** — herbivores that eat producers (caterpillar, goat, grasshopper, deer).\n" +
        "- **Secondary consumers (3rd level)** — small carnivores/omnivores that eat herbivores (frog, small fish).\n" +
        "- **Tertiary / top consumers (4th level)** — top carnivores that eat secondary consumers (snake, hawk).\n" +
        "The arrow in a food chain points from the eaten to the eater (toward the energy receiver). By the **10% law (Lindeman)**, only about **10%** of the energy at one level is passed to the next — the rest is lost as heat — so a typical chain has only 4–5 links.",
      formula: {
        label: "The 10% law of energy transfer",
        latex: "E_{n+1} \\approx 0.10 \\times E_{n}",
        symbols: [
          { symbol: "E_n", meaning: "energy available at trophic level n" },
          { symbol: "E_{n+1}", meaning: "energy passed to the next (higher) level" },
        ],
      },
      visualizationSlug: "eco-food-chain-pyramid",
      authoredExample: {
        prompt:
          "In the chain Grass → Goat → Tiger, name the trophic level of each organism, and state which is the primary consumer.",
        steps: [
          "Grass makes its own food by photosynthesis → producer (1st level).",
          "The goat is a herbivore that eats the grass → primary consumer (2nd level).",
          "The tiger eats the goat → secondary consumer (3rd level).",
          "The primary consumer is the herbivore — the goat.",
        ],
        answer:
          "Grass = producer, goat = primary consumer, tiger = secondary consumer. The goat is the primary consumer.",
      },
      selfCheckExample: {
        prompt:
          "Which of these is a valid food chain, and why are the others invalid: (a) Grass, goat and human; (b) Goat, cow and human?",
        steps: [
          "A food chain needs a producer at the start, then organisms each eating the previous one.",
          "(a) Grass (producer) → goat (eats grass) → human (eats goat). Each link eats the one before — valid.",
          "(b) Goat and cow are both herbivores eating plants; neither eats the other, so there is no producer-to-consumer sequence — invalid.",
        ],
        answer: "Grass → goat → human is the valid food chain.",
      },
      practiceSet: [
        { prompt: "What trophic level is a caterpillar that eats leaves?", answer: "Primary consumer", method: "a herbivore eating a producer" },
        { prompt: "Which trophic level traps solar energy?", answer: "Producers", method: "green plants and algae" },
        { prompt: "By the 10% law, if producers hold 2000 units of energy, how much reaches the primary consumers?", answer: "About 200 units", method: "10% of 2000" },
        { prompt: "Which way does the arrow point in a food chain?", answer: "Toward the eater (the energy receiver)" },
      ],
      pyqExampleId: "cbe49114-d7dd-40e7-950c-523dec708bcd", // valid food chain = grass, goat, human
      traps: [
        {
          title: "A food chain must START with a producer",
          body:
            "'Goat, cow and human' is not a food chain — goat and cow are both herbivores and neither eats the other. A valid chain begins with a producer (grass) and each later organism eats the one before it.",
        },
        {
          title: "Primary consumer = herbivore, not 'the first animal you see'",
          body:
            "The primary consumer is the organism that eats the PRODUCER — a herbivore (caterpillar, goat, grasshopper). A frog or sparrowhawk eats other animals, so they are secondary or higher consumers, not primary.",
        },
      ],
    },

    // nutrition modes (REFERENCE) — covers 7bd85656
    {
      kind: "reference" as const,
      slug: "eco-nutrition-modes",
      name: "Nutrition modes — autotrophs, heterotrophs, decomposers",
      intuition:
        "Organisms are grouped by how they obtain carbon and energy. Autotrophs make their own food from simple inorganic raw materials (mainly carbon dioxide); heterotrophs must eat other organisms; decomposers feed on dead matter. " +
        "The NDA tests the definition directly — 'organisms that use CO₂ as their main carbon source' are autotrophs.",
      definition:
        "Three nutrition modes, classified by carbon and energy source:\n" +
        "- **Autotrophs** — 'self-feeders'; build their own food from **carbon dioxide** using light (photosynthesis) or chemical energy (chemosynthesis). They are the producers.\n" +
        "- **Heterotrophs** — 'other-feeders'; cannot fix CO₂, so they obtain carbon by eating other organisms. All animals are heterotrophs.\n" +
        "- **Decomposers (saprotrophs)** — heterotrophs that feed on **dead** organic matter, recycling nutrients back to the soil (bacteria, fungi).",
      table: {
        columns: ["Mode", "Carbon source", "Examples"],
        rows: [
          {
            cells: ["**Autotroph**", "Carbon dioxide (CO₂), fixed via photosynthesis or chemosynthesis", "Green plants, algae, cyanobacteria"],
            noteAmber: "NDA 2023 — organisms using CO₂ as their principal carbon source are AUTOTROPHS.",
          },
          { cells: ["**Heterotroph**", "Organic matter from other organisms", "All animals, fungi, most bacteria"] },
          { cells: ["**Decomposer**", "Dead organic matter (detritus)", "Bacteria, fungi, earthworms"] },
          { cells: ["**Parasite**", "Living host's body", "Tapeworm, Plasmodium, Cuscuta"] },
        ],
        caption:
          "Autotroph = producer (makes food from CO₂); heterotroph = consumer (eats others); decomposer = recycler of dead matter.",
      },
      selfCheckExample: {
        prompt:
          "An organism captures atmospheric carbon dioxide and builds its own sugars using sunlight. What nutrition mode is this, and is the organism a producer or a consumer?",
        steps: [
          "Using CO₂ as the carbon source and light as energy is photosynthesis.",
          "An organism that makes its own food from CO₂ is an autotroph.",
          "Autotrophs are the producers of an ecosystem.",
        ],
        answer: "It is an autotroph — a producer.",
      },
      practiceSet: [
        { prompt: "What do we call organisms that use CO₂ as their principal carbon source?", answer: "Autotrophs", method: "they fix CO₂ via photosynthesis" },
        { prompt: "Are all animals autotrophs or heterotrophs?", answer: "Heterotrophs", method: "they eat other organisms" },
        { prompt: "Which organisms feed on dead organic matter?", answer: "Decomposers", method: "bacteria and fungi" },
        { prompt: "Autotrophs occupy which trophic level?", answer: "Producers (1st level)" },
      ],
      pyqExampleId: "7bd85656-7068-45f8-9f9b-20d6df62ff7c", // CO2 as carbon source = autotroph
      traps: [
        {
          title: "Decomposers are heterotrophs, not autotrophs",
          body:
            "A common distractor calls decomposers a kind of autotroph. They are not — they cannot fix CO₂. They are heterotrophs that feed on DEAD matter (saprotrophs), while autotrophs are the green producers that make food from CO₂.",
        },
      ],
    },

    // symbiosis / ecological interactions (REFERENCE) — covers 0df19cfa
    {
      kind: "reference" as const,
      slug: "eco-symbiosis-interactions",
      name: "Ecological interactions — mutualism, commensalism, parasitism",
      intuition:
        "When two species live closely together, the relationship is named by who benefits and who is harmed. " +
        "The NDA favourite is the bee-and-flower partnership: the bee gets nectar and the flower gets pollinated — both win, so it is mutualism. Learn the win/lose pattern for each type.",
      definition:
        "Interactions between two species, named by their effect on each partner (+ benefit, − harm, 0 no effect):\n" +
        "- **Mutualism (+ / +)** — both partners benefit (bee and flower; lichen = alga + fungus; nitrogen-fixing bacteria in legume roots).\n" +
        "- **Commensalism (+ / 0)** — one benefits, the other is unaffected (orchid growing on a tree; remora fish on a shark).\n" +
        "- **Parasitism (+ / −)** — one (parasite) benefits, the host is harmed (tapeworm, Plasmodium, Cuscuta).\n" +
        "- **Predation (+ / −)** — the predator kills and eats the prey (lion and deer).\n" +
        "- **Competition (− / −)** — both compete for the same limited resource.",
      table: {
        columns: ["Interaction", "Effect (species 1 / 2)", "Example"],
        rows: [
          {
            cells: ["**Mutualism**", "Benefit / Benefit (+ / +)", "Bee and flower (nectar for pollination); lichen"],
            noteAmber: "NDA 2023 — the flower-and-honeybee relationship helps the flower with POLLINATION (a mutualism).",
          },
          { cells: ["**Commensalism**", "Benefit / No effect (+ / 0)", "Orchid on a tree; remora on a shark"] },
          { cells: ["**Parasitism**", "Benefit / Harm (+ / −)", "Tapeworm, Plasmodium, Cuscuta on host"] },
          { cells: ["**Predation**", "Benefit / Harm (+ / −)", "Lion eats deer"] },
          { cells: ["**Competition**", "Harm / Harm (− / −)", "Two plants competing for light/water"] },
        ],
        caption:
          "Read the sign pair: both + is mutualism; + and 0 is commensalism; + and − (host kept alive) is parasitism.",
      },
      selfCheckExample: {
        prompt:
          "A honey-bee visits a flower, drinks its nectar, and in doing so carries pollen from flower to flower. Name the interaction and state how the flower benefits.",
        steps: [
          "The bee gains food (nectar); the flower gains pollen transfer between flowers.",
          "Both species benefit → mutualism.",
          "The flower's benefit is pollination — cross-pollination is achieved by the visiting bee.",
        ],
        answer: "Mutualism; the flower benefits through pollination.",
      },
      practiceSet: [
        { prompt: "In the bee-flower relationship, how does the flower benefit?", answer: "Pollination", method: "the bee transfers pollen between flowers" },
        { prompt: "What interaction has both partners benefiting (+ / +)?", answer: "Mutualism", method: "e.g. lichen, bee and flower" },
        { prompt: "A tapeworm living in a host gut is which interaction?", answer: "Parasitism", method: "parasite benefits, host harmed" },
        { prompt: "An orchid growing on a tree, neither helping nor harming it, is which interaction?", answer: "Commensalism" },
      ],
      pyqExampleId: "0df19cfa-5a2c-42da-b4fb-830e39560210", // bee-flower → pollination
      traps: [
        {
          title: "Bee + flower benefits the flower with POLLINATION, not 'germination' or 'size'",
          body:
            "The distractors offer 'quick germination of pollen' or 'increase in size'. The flower's benefit from the bee is **pollination** — the bee carries pollen between flowers, enabling cross-pollination. This is a mutualism (the bee gets nectar).",
        },
        {
          title: "Don't confuse commensalism with mutualism",
          body:
            "In **mutualism** BOTH species benefit (+ / +). In **commensalism** one benefits and the other is unaffected (+ / 0). The bee-flower pair is mutualism because the bee also gains food.",
        },
      ],
    },

    // biomes (REFERENCE) — covers 008bd53b + ad7a4fc5
    {
      kind: "reference" as const,
      slug: "eco-biomes",
      name: "Biomes — land and aquatic ecosystems",
      intuition:
        "A biome is a large region defined by its climate and the community of plants and animals adapted to it — desert, grassland, tropical forest, temperate forest, taiga, tundra. " +
        "The NDA describes a biome by its trees, climate and animals and asks you to name it; it also tests the ocean as a biome where phytoplankton are the main producers.",
      definition:
        "Major **land (terrestrial) biomes**, identified by climate and vegetation:\n" +
        "- **Tropical rainforest** — hot, very high rainfall year-round; dense evergreen trees; the richest biodiversity.\n" +
        "- **Temperate (deciduous) forest** — high rainfall, cold-to-mild seasons; **deciduous** trees (maple, oak, hickory, beech) that shed leaves; raccoons, squirrels, deer.\n" +
        "- **Taiga (boreal forest)** — cold; coniferous evergreens (pine, spruce).\n" +
        "- **Grassland / Savanna** — moderate rainfall; grasses, grazing herbivores.\n" +
        "- **Desert** — very low rainfall; cacti, xerophytes.\n" +
        "- **Tundra** — coldest; no trees, mosses and lichens.\n\n" +
        "In **aquatic biomes** (oceans, lakes), the main producers are tiny floating **phytoplankton**, which carry out most of the ocean's photosynthesis and produce most of its organic carbon.",
      table: {
        columns: ["Biome", "Climate", "Signature life"],
        rows: [
          { cells: ["**Tropical rainforest**", "Hot, high rainfall all year", "Dense evergreen trees; greatest biodiversity"] },
          {
            cells: ["**Temperate forest**", "High rainfall, cold-to-mild seasons", "Deciduous trees (maple, oak, hickory); raccoons, squirrels"],
            noteAmber: "NDA 2024 — deciduous maple/oak/hickory + raccoons + cold-to-mild + high rainfall = TEMPERATE forest.",
          },
          { cells: ["**Taiga / Boreal**", "Cold", "Coniferous evergreens (pine, spruce)"] },
          { cells: ["**Desert**", "Very low rainfall", "Cacti, xerophytes, reptiles"] },
          { cells: ["**Tundra**", "Coldest, frozen", "No trees; mosses, lichens"] },
          {
            cells: ["**Ocean (aquatic)**", "Saltwater", "Phytoplankton = main producers"],
            noteAmber: "NDA 2018 — phytoplankton produce most of the ocean's organic carbon (true); algae are NOT limited to the cold-water biome (false).",
          },
        ],
        caption:
          "Identify a land biome from its trees + climate; remember phytoplankton are the ocean's primary producers.",
      },
      selfCheckExample: {
        prompt:
          "A forest has high rainfall, temperatures from cold to mild, deciduous trees such as maple and oak, and animals like raccoons and squirrels. Which biome is it?",
        steps: [
          "Deciduous trees (they shed leaves) plus cold-to-mild seasons point away from a tropical (evergreen) or boreal (coniferous) forest.",
          "Maple, oak and hickory with raccoons and squirrels are classic temperate-forest species.",
          "High rainfall with distinct seasons confirms a temperate deciduous forest.",
        ],
        answer: "A temperate (deciduous) forest.",
      },
      practiceSet: [
        { prompt: "A forest of deciduous maple and oak with cold-to-mild seasons is which biome?", answer: "Temperate forest" },
        { prompt: "Which biome has the greatest biodiversity?", answer: "Tropical rainforest" },
        { prompt: "What are the main producers in the ocean?", answer: "Phytoplankton", method: "they do most of the ocean's photosynthesis" },
        { prompt: "Coniferous pine and spruce forests in a cold climate make which biome?", answer: "Taiga (boreal forest)" },
      ],
      pyqExampleId: "008bd53b-1630-4bd9-9f6d-1d1d4e084a5d", // temperate forest identification
      traps: [
        {
          title: "Deciduous + cold-to-mild = temperate, not tropical or boreal",
          body:
            "Tropical forests are hot and evergreen; boreal/taiga forests are coniferous evergreens. A forest of **deciduous** maple/oak/hickory with cold-to-mild seasons and high rainfall is a **temperate** forest.",
        },
        {
          title: "Phytoplankton are everywhere in the ocean, not just cold water",
          body:
            "Phytoplankton (and algae) produce most of the ocean's organic carbon — true — but they are NOT restricted to cold-water biomes. A statement claiming algae are produced only in cold water is false.",
        },
      ],
    },
  ],
};
