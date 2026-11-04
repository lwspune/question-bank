import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 4 Environmental Management.
 * Statements checked against the Balbharati text; most-asked years from the
 * board past papers in the bank. Acid rain, sewage uses, blue revolution,
 * waste decomposition, pesticide spraying, noise control, the 3R mantra and
 * water conservation are filed under this chapter but not taught in it.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Environmental Management",
  chapterSlug: "environmental-management",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Ecosystem",
      text: "Biotic and abiotic factors occupying a definite geographical area and their interactions. A small pond is an ecosystem; the Earth is the largest. Producers, consumers and decomposers are all important.",
    },
    {
      term: "Environment and ecology",
      text: "**Environment**: physical, chemical and biological factors affecting living organisms; natural or artificial. **Ecology**: the study of interactions between biotic and abiotic factors. Its basic functional unit is the ecosystem.",
    },
    {
      term: "Factors affecting environment",
      text: "**Natural**: earthquakes, floods, volcanoes. **Manmade**: deforestation, pollution, population explosion, fast industrialization, unplanned urbanization, overuse of natural resources.",
    },
    {
      term: "Environmental pollution",
      text: "Unnecessary and unacceptable change in the surrounding environment due to natural events or human activities: harmful changes in air, water and soil. Types: air, water, sound, soil, thermal, light, radioactive.",
    },
    {
      term: "Need of environmental conservation",
      text: "To maintain the balance in nature and to solve natural and artificial problems. It must become a public movement, with awareness through education. We have the Earth on lease from future generations.",
    },
    {
      term: "Laws for conservation",
      text: "Wildlife Protection Act **1972**; Forest (Conservation) Act **1980** (forest land for no other use); Environment (Protection) Act **1986** (control pollution); National Green Tribunal **2010**. UNEP set up in 1972.",
    },
    {
      term: "Jadav Molai Payeng",
      text: "A forest worker of Assam who planted trees for 30 years and grew the **Molai Jungle** over 1360 acres at Kokilamukh, Jorhat. Awarded Padmashree. Lesson: one determined person can establish a new forest.",
    },
    {
      term: "Biodiversity",
      text: "Richness of living organisms in nature due to varieties of organisms, ecosystems and genetic variations. Three levels: **genetic diversity** (within a species), **species diversity**, **ecosystem diversity**. World Biodiversity Day: **22nd May**.",
    },
    {
      term: "Sacred groves",
      text: "Forests conserved in the name of god; sanctuaries kept by society, not the forest department. More than 13000 are reported in India.",
    },
    {
      term: "Hotspots and endangered heritage places",
      text: "34 biodiversity hotspots in the world. Endangered places in India: **Western Ghat** (Asiatic lion, wild bison), **Manas National Park**, Assam (tiger, rhino), **Sunderban National Park**, West Bengal (reserved for tigers).",
    },
    {
      term: "Threatened species",
      text: "**Endangered**: lion tailed monkey, lesser florican. **Rare**: red panda, musk deer. **Vulnerable**: tiger, lion. **Indeterminate**: giant squirrel (Shekru).",
    },
    {
      term: "Red List",
      text: "Prepared by **IUCN**. **Pink pages**: endangered species. **Green pages**: previously endangered but presently safe species.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "How can biodiversity be conserved?",
      steps: [
        "Protect rare species; establish national parks and sanctuaries; declare some regions as bioreserves.",
        "Run projects for conservation of special species; conserve all plants and animals.",
        "Observe the rules; maintain a record of traditional knowledge.",
      ],
    },
    {
      title: "Classification of threatened species",
      steps: [
        "**Endangered**: numbers or habitat so reduced they may soon be extinct without conservation. Lion tailed monkey, lesser florican.",
        "**Rare**: numbers considerably declined; being endemic they may vanish fast. Red panda, musk deer.",
        "**Vulnerable**: numbers extremely low and still declining. Tiger, lion.",
        "**Indeterminate**: appear endangered, but shy habits give no definite information. Giant squirrel.",
      ],
    },
    {
      title: "My role in environmental conservation",
      steps: [
        "**Conservation**: conserve available resources. **Control**: prevent harm, stop harmful activities, change mindsets.",
        "**Production**: revive harmed factors, attempt innovation. **Preservation**: preserve what is left, prevent further loss.",
        "**Prevention**: prevent possible harm, design new plans. **Awareness**: education, guidance, organization, participation.",
      ],
    },
    {
      title: "Paddy field: what if frogs decline suddenly?",
      steps: [
        "Food chain: paddy, grasshopper, frog, snake, eagle.",
        "Fewer frogs: grasshoppers increase and damage the paddy crop.",
        "Snakes, and then eagles, decline for lack of food; the balance of the ecosystem is disturbed.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Food chain of a paddy field (Fig. 4.1)",
      labels: ["paddy (producer)", "grasshopper (primary consumer)", "frog (secondary consumer)", "snake (tertiary consumer)", "eagle (apex consumer)"],
    },
    {
      title: "Components of ecosystem (chart)",
      labels: ["abiotic: physical factors, inorganic and organic substances", "biotic: producers (autotrophs)", "consumers: primary, secondary, tertiary", "decomposers"],
    },
  ],
  mostAsked: [
    { topic: "Food chain and ecosystem: arrange or complete a chain, apex consumer, producer level, biotic components, effect on paddy if frogs decline", marks: 1, years: [2026, 2025, 2024, 2023, 2019] },
    { topic: "My role in environmental conservation: complete the flow chart, two actions for each role", marks: 5, years: [2025, 2020] },
    { topic: "Environmental conservation: short note, its need, factors affecting environment (natural and manmade)", marks: 2, years: [2026, 2024, 2023] },
    { topic: "Threatened species: four categories with examples, Red List page colours", marks: 1, years: [2026, 2024, 2022] },
    { topic: "Biodiversity: define it, steps to conserve it, World Biodiversity Day", years: [2026, 2025, 2024, 2019] },
    { topic: "Endangered places, laws and Molai Jungle: Sunderban, Western Ghat, Forest Conservation Act 1980, story of Jadav Molai Payeng", marks: 1, years: [2025, 2023, 2022] },
    { topic: "Environment symbols: identify them and write your role", marks: 3, years: [2024, 2022, 2019] },
  ],
  mistakes: [
    {
      title: "Food chain in the wrong order",
      body: "Start with the producer: paddy, grasshopper, frog, snake, eagle. The eagle is the apex consumer; plants are at the producer level.",
    },
    {
      title: "Mixing up threatened species examples",
      body: "Endangered: lion tailed monkey, lesser florican. Rare: red panda, musk deer. Vulnerable: tiger, lion. Indeterminate: giant squirrel.",
    },
    {
      title: "Wrong year for an Act",
      body: "Wildlife Protection 1972, Forest (Conservation) 1980, Environment (Protection) 1986, National Green Tribunal 2010.",
    },
    {
      title: "Swapping the heritage places",
      body: "As the book pairs them (and the board's 2022 question used it): Sunderban (West Bengal), tigers; Western Ghat, Asiatic lion and wild bison; Manas (Assam), tiger and rhino.",
    },
  ],
};

export default sheet;
