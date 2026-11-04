import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 12 Ecosystem. Definitions, productivity,
 * decomposition, energy flow and pyramids checked against the NCERT text (the
 * book's own wording, trimmed); most-asked years and marks from the CBSE
 * board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Ecosystem",
  chapterSlug: "ecosystem",
  source: "NCERT Biology (CBSE Class 12), Chapter 12",
  keyPoints: [
    {
      term: "Structure and function of an ecosystem",
      text: "Interaction of biotic and abiotic components gives each ecosystem its physical structure. **Species composition** and **stratification** (vertical distribution of species at different levels: trees on top, then shrubs, then herbs and grasses) are its structural features. It functions as a unit through **productivity, decomposition, energy flow and nutrient cycling**.",
    },
    {
      term: "Pond ecosystem",
      text: "**Abiotic:** water with dissolved inorganic and organic substances, and the rich soil deposit at the bottom; solar input, temperature and day-length regulate it. **Autotrophs:** phytoplankton, some algae, floating, submerged and marginal plants. **Consumers:** zooplankton, free swimming and bottom dwelling forms. **Decomposers:** fungi, bacteria and flagellates, abundant at the bottom.",
    },
    {
      term: "Primary production and productivity",
      text: "**Primary production:** the amount of biomass or organic matter produced per unit area over a time period by plants during photosynthesis, in weight (\\(\\text{g m}^{-2}\\)) or energy (\\(\\text{kcal m}^{-2}\\)). **Productivity** is the **rate** of biomass production, in \\(\\text{g m}^{-2}\\,\\text{yr}^{-1}\\) or \\((\\text{kcal m}^{-2})\\,\\text{yr}^{-1}\\).",
    },
    {
      term: "GPP, NPP and secondary productivity",
      text: "**GPP:** the rate of production of organic matter during photosynthesis. A considerable part is used by plants in **respiration (R)**. **NPP = GPP minus R**: the biomass **available for consumption to heterotrophs** (herbivores and decomposers). **Secondary productivity:** the rate of formation of new organic matter by **consumers**.",
    },
    {
      term: "Why primary productivity varies",
      text: "It depends on the **plant species** of the area, **environmental factors**, **availability of nutrients** and the **photosynthetic capacity** of plants. Annual NPP of the biosphere is about **170 billion tons** (dry weight); the oceans, despite covering about **70 per cent** of the surface, give only **55 billion tons**.",
    },
    {
      term: "Decomposition and detritus",
      text: "Decomposers break down complex organic matter into inorganic substances like **carbon dioxide, water and nutrients**. **Detritus** (dead leaves, bark, flowers, dead animals, faeces) is the raw material. Steps: **fragmentation** (detritivores such as earthworm make small particles), **leaching** (water-soluble nutrients go down and precipitate as **unavailable salts**), **catabolism** (bacterial and fungal enzymes).",
    },
    {
      term: "Humification and mineralisation",
      text: "**Humification** accumulates **humus**: a **dark coloured amorphous** substance, **highly resistant to microbial action**, decomposed at an extremely slow rate; being **colloidal** it is a **reservoir of nutrients**. Some microbes degrade humus further and release inorganic nutrients: **mineralisation**. All the steps operate **simultaneously** on detritus.",
    },
    {
      term: "Factors affecting decomposition",
      text: "Decomposition is largely an **oxygen-requiring** process, controlled by the **chemical composition of detritus** and **climatic factors**. It is **slower** if detritus is rich in **lignin and chitin**, **quicker** if rich in **nitrogen and water-soluble substances like sugars**. **Warm and moist** conditions favour it; **low temperature and anaerobiosis** inhibit it, so organic matter builds up.",
    },
    {
      term: "Energy flow",
      text: "The **sun** is the only source of energy (except deep sea hydro-thermal ecosystems). **Less than 50 per cent** of incident radiation is **photosynthetically active radiation (PAR)**; plants capture only **2 to 10 per cent of the PAR**. Flow is **unidirectional**: sun, producers, consumers. Under the **second law of thermodynamics**, ecosystems need a constant energy supply to counteract increasing disorderliness.",
    },
    {
      term: "Grazing and detritus food chains",
      text: "**GFC** starts with producers: grass (producer), goat (primary consumer), man (secondary consumer). **DFC** begins with **dead organic matter** and is made up of **decomposers** (saprotrophs, mainly fungi and bacteria). In an **aquatic** ecosystem **GFC** is the major conduit for energy; in a **terrestrial** ecosystem a much larger fraction flows through the **DFC**. Interconnected chains make a **food web**.",
    },
    {
      term: "Trophic levels, standing crop and the 10 per cent law",
      text: "Producers form the **first trophic level**, herbivores (primary consumers) the second, carnivores (secondary consumers) the third. **Standing crop:** the mass of living material at a trophic level at a particular time, measured as **biomass or number** per unit area (dry weight is more accurate). **10 per cent law:** only 10 per cent of the energy passes to each next trophic level.",
    },
    {
      term: "Ecological pyramids",
      text: "Pyramids of **number, biomass and energy**; the **base** is the producers, the **apex** the top consumer. In most ecosystems all are **upright**. **Exceptions:** number of insects feeding on a **big tree**; the **pyramid of biomass in sea is inverted** because the biomass of fishes far exceeds that of phytoplankton. The **pyramid of energy is always upright**: energy is always lost as heat at each step.",
    },
    {
      term: "Trophic level is a functional level",
      text: "A trophic level represents a **functional level, not a species**. A species may occupy **more than one trophic level** at the same time: a **sparrow** is a primary consumer when it eats seeds and a secondary consumer when it eats insects. Any calculation must include **all organisms** at that trophic level.",
    },
    {
      term: "Limitations of ecological pyramids",
      text: "They do not take into account the **same species belonging to two or more trophic levels**; they assume a **simple food chain**, which almost never exists, and do not accommodate a **food web**; **saprophytes are given no place**, though they play a vital role in the ecosystem.",
    },
  ],
  formulas: [
    {
      label: "Net primary productivity",
      latex: "\\text{NPP} = \\text{GPP} - R",
      symbols: [
        { symbol: "GPP", meaning: "gross primary productivity" },
        { symbol: "R", meaning: "respiration losses of the plants" },
      ],
    },
    {
      label: "Ten per cent law",
      latex: "E_{n+1} = \\frac{10}{100} \\times E_n",
      symbols: [
        { symbol: "\\(E_n\\)", meaning: "energy at a trophic level" },
        { symbol: "\\(E_{n+1}\\)", meaning: "energy passed to the next trophic level" },
      ],
    },
  ],
  derivations: [
    {
      title: "Construct an ideal pyramid of energy when 10,00,000 J of sunlight is available",
      steps: [
        "Primary producers convert only **1%** of the sunlight available to them into NPP: 10,000 J.",
        "Primary consumers get 10 per cent of that: 1,000 J.",
        "Secondary consumers: 100 J. Tertiary consumers (fourth level): 10 J.",
        "Draw bars narrowing upwards, producers at the base; it is **always upright** since energy is lost as heat at each step.",
      ],
    },
    {
      title: "Arrange and explain the steps of decomposition",
      steps: [
        "**Fragmentation:** detritivores (earthworm) break detritus into smaller particles.",
        "**Leaching:** water-soluble inorganic nutrients go down into the soil and precipitate as unavailable salts.",
        "**Catabolism:** bacterial and fungal enzymes degrade detritus into simpler inorganic substances.",
        "**Humification:** dark, amorphous, colloidal humus accumulates.",
        "**Mineralisation:** microbes degrade humus and release inorganic nutrients.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Decomposition cycle in a terrestrial ecosystem (Figure 12.1)",
      labels: ["detritus", "fragmentation by detritivores", "leaching", "catabolism", "humification (humus)", "mineralisation: inorganic nutrients"],
    },
    {
      title: "Trophic levels in an ecosystem (Figure 12.2)",
      labels: ["1st: producer", "2nd: primary consumer (herbivore)", "3rd: secondary consumer (carnivore)", "4th: tertiary consumer (top carnivore)"],
    },
    {
      title: "Pyramid of numbers in a grassland (Figure 12.4 a)",
      labels: ["producers (PP) at the base", "primary consumers (PC)", "secondary consumers (SC)", "only 3 top carnivores (TC)"],
    },
    {
      title: "Inverted pyramid of biomass in the sea (Figure 12.4 c)",
      labels: ["small standing crop of phytoplankton (base)", "large standing crop of zooplankton or fishes", "inverted shape"],
    },
    {
      title: "An ideal pyramid of energy (Figure 12.4 d)",
      labels: ["1,000,000 J of sunlight", "PP 10,000 J (1% into NPP)", "PC 1,000 J", "SC 100 J", "TC 10 J"],
    },
  ],
  mostAsked: [
    {
      topic: "Ecological pyramids: number, biomass and energy; upright and inverted (tree, sea), standing crop, limitations",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Energy flow and food chains: grazing versus detritus food chain, trophic levels, 10 per cent law, PAR, laws of thermodynamics",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Productivity: primary productivity and its units, GPP and NPP (GPP minus R), secondary productivity, why it varies",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Decomposition: fragmentation, leaching, catabolism, humification, mineralisation; humus; factors affecting the rate",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Ecosystem structure: stratification, functional aspects, components of a pond",
      marks: 1,
      years: [2026],
    },
  ],
  mistakes: [
    {
      title: "Calling the energy pyramid inverted",
      body: "The pyramid of **energy is always upright**. Only number (insects on a big tree) or **biomass in the sea** can be inverted.",
    },
    {
      title: "Production and productivity confused",
      body: "Production is an amount (\\(\\text{g m}^{-2}\\)); **productivity is a rate** (\\(\\text{g m}^{-2}\\,\\text{yr}^{-1}\\)). NPP is always less than GPP because plants use part of GPP in respiration.",
    },
    {
      title: "Wrong food chain for the ecosystem",
      body: "**Aquatic:** grazing food chain is the major conduit. **Terrestrial:** a much larger fraction of energy flows through the **detritus** food chain.",
    },
    {
      title: "Applying 10 per cent to sunlight",
      body: "Producers trap only about **1%** of the sunlight as NPP; the **10 per cent law** applies from one trophic level to the **next**.",
    },
    {
      title: "Decomposition rate reversed",
      body: "Rich in **lignin and chitin**: **slower**. Rich in **nitrogen and sugars**: **quicker**. Low temperature and anaerobiosis **inhibit** it. Leaching makes nutrients **unavailable salts**, not available ones.",
    },
    {
      title: "Stratification listed as a function",
      body: "Stratification and species composition are **structural** features. The four **functional** aspects are productivity, decomposition, energy flow and nutrient cycling.",
    },
  ],
};

export default sheet;
