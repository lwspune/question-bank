import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 14 Ecosystems and Energy Flow. Definitions checked
 * against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the 11 board past-paper questions in the bank,
 * 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Ecosystems and Energy Flow",
  chapterSlug: "ecosystems-and-energy-flow",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 14",
  keyPoints: [
    {
      term: "Ecosystem",
      text: "A self regulatory and self sustaining structural and functional unit of nature, with biotic and abiotic components; the term was coined by **Tansley (1935)**. Its four functional aspects: productivity, decomposition, nutrient cycling and energy flow. **Ecosystem services:** benefits people obtain from ecosystems (supporting, provisioning, regulating, cultural).",
    },
    {
      term: "Stratification and zonation",
      text: "**Stratification:** vertical distribution of species at different levels (trees, then shrubs, then herbs and grasses in a forest; epipelagic to benthic zones in the sea). **Zonation:** horizontal distribution of plants and animals on land or in water, most pronounced at the edges of a lake or beach.",
    },
    {
      term: "Productivity",
      text: "The rate of generation of biomass, in g/m²/day. **GPP:** rate of production of organic matter during photosynthesis. **NPP:** GPP minus respiratory losses (R), the biomass available to heterotrophs. **Secondary productivity:** rate of formation of new organic matter by consumers. Biosphere NPP is about 170 billion tons a year; oceans only 55.",
    },
    {
      term: "Decomposition",
      text: "Decomposers break down complex organic matter into inorganic substances like carbon dioxide, water and nutrients. **Detritus** (dead remains of plants and animals, including fecal matter) is the raw material. Steps: fragmentation, leaching, catabolism, humification and mineralization. It needs oxygen; warm and moist conditions favour it.",
    },
    {
      term: "Fragmentation, leaching and catabolism",
      text: "**Fragmentation:** detritivores (e.g. earthworm) break detritus into smaller particles. **Leaching:** water soluble inorganic nutrients go down into the soil horizon and get precipitated as unavailable salts. **Catabolism:** bacterial and fungal enzymes degrade detritus into simpler inorganic substances.",
    },
    {
      term: "Humification and mineralisation",
      text: "**Humification** accumulates **humus**: a partially decomposed, dark coloured, amorphous, colloidal organic substance, resistant to microbial action and decomposed very slowly. It increases the water holding capacity of soil and is a reservoir of nutrients. **Mineralisation:** humus is degraded by microbes and inorganic nutrients are released.",
    },
    {
      term: "Food chains and saprotrophs",
      text: "Three types: grazing (grass, deer, leopard), detritus and parasitic. The **detritus food chain** begins with dead organic matter; its decomposers, mainly fungi and bacteria, meet their energy and nutrient needs by degrading the detritus: **saprotrophs (saprobes)**. Interconnected food chains form a **food web**, which keeps the ecosystem stable.",
    },
    {
      term: "Energy flow and the 10% law",
      text: "Flow of energy is **unidirectional**: sun to producers to consumers, lost as heat. Less than 50% of sunlight is PAR, and plants capture only 2 to 10% of it. **10% law (R. Lindeman, 1942):** only 10% of the energy is transferred to each trophic level as net energy from the previous level. So food chains are short.",
    },
    {
      term: "Ecological pyramids",
      text: "A graphic representation of organisms of successive trophic levels with respect to **number, biomass and energy** (C. Elton, 1927). Base: producers; apex: top consumer. Biomass is inverted in the ocean; numbers inverted for insects on one tree. Limits: assume a simple food chain, ignore food webs and saprophytes.",
    },
    {
      term: "Pyramid of energy",
      text: "Always **upright**, never inverted: only 10% passes on as net energy to the next trophic level and a large amount is lost as heat at each step. Producers 100%, primary consumers 10%, secondary 1%, tertiary 0.1%.",
    },
    {
      term: "Nutrient cycles and carbon sinks",
      text: "**Gaseous** cycles (carbon, nitrogen) have the atmosphere as reservoir; **sedimentary** cycles (phosphorus) have the Earth's crust. 71% of carbon is dissolved in oceans. Carbon in **rocks and fossil fuels** (oil, coal, natural gas) is away from the cycle for a long time: these long term stores are the **sinks**.",
    },
    {
      term: "Phosphorus cycle",
      text: "A sedimentary cycle; the natural reservoir is rock with phosphates. Phosphate-solubilizing bacteria release phosphorus from wastes and dead organisms; there is no respiratory release into the air. Phosphorus is always in short supply, a **limiting factor**; a sudden influx from runoff causes **eutrophication** (overgrowth of algae).",
    },
    {
      term: "Ecological succession",
      text: "The gradual and predictable change in the species composition of a given area. **Pioneer species** invade a bare area; the whole sequence of communities is the **sere**; each transitional community is a **seral community**. The final **climax community** does not evolve further and stays stable while the environment is unchanged.",
    },
    {
      term: "Primary and secondary succession",
      text: "**Primary:** starts where no living organisms were present before: a newly formed volcanic island, newly cooled lava, bare rock, a new pond; very slow, as soil must form. **Secondary:** where communities were destroyed: abandoned farm lands, burned or cut forests, flooded land; faster, since soil is present.",
    },
  ],
  formulas: [
    {
      label: "Net primary productivity",
      latex: "\\text{GPP} - R = \\text{NPP}",
      symbols: [
        { symbol: "GPP", meaning: "gross primary productivity" },
        { symbol: "R", meaning: "respiratory losses of the plants" },
      ],
    },
    {
      label: "Ten percent law",
      latex: "E_{\\text{next level}} = \\dfrac{10}{100} \\times E_{\\text{previous level}}",
      symbols: [{ symbol: "E", meaning: "net energy at a trophic level" }],
    },
  ],
  derivations: [
    {
      title: "Define decomposition and explain its steps in correct sequence",
      steps: [
        "**Fragmentation:** detritivores such as earthworm break detritus into smaller fragments.",
        "**Leaching:** water soluble inorganic nutrients percolate into the soil and are precipitated as unavailable salts.",
        "**Catabolism:** bacterial and fungal enzymes degrade detritus into simpler inorganic substances.",
        "**Humification:** dark, amorphous, colloidal humus accumulates; it decomposes very slowly.",
        "**Mineralisation:** microbes degrade humus and release inorganic nutrients. All steps operate simultaneously on the detritus.",
      ],
    },
    {
      title: "Describe the pyramid of energy with a diagram",
      steps: [
        "Plot the energy accumulated per unit area at each trophic level, producers at the base.",
        "Producers 100%, primary consumers 10%, secondary consumers 1%, tertiary consumers 0.1%.",
        "Only 10% passes on as net energy; the rest is lost as heat at each step.",
        "So the pyramid of energy is always upright and can never be inverted.",
      ],
    },
    {
      title: "Hydrarch succession (primary succession in water)",
      steps: [
        "Pioneers: small **phytoplankton**.",
        "Rooted submerged plants (*Hydrilla*), then rooted floating angiosperms (*Lotus*), then free floating plants (*Pistia*).",
        "Reed swamp (*Typha*), then marsh meadow (*Cyperus*), then scrub (*Alnus*).",
        "Finally trees (*Quercus*): a climax forest; the water body turns into land, and the series moves from hydric to mesic.",
      ],
    },
    {
      title: "Xerarch succession on bare rock",
      steps: [
        "Pioneers: **crustose lichens**, which secrete acids to dissolve rock, help weathering and form soil.",
        "Bryophytes (mosses) take hold in the small amount of soil.",
        "Herbaceous plants, then grasses and shrubs, after several stages.",
        "A stable climax forest community: the series moves from xeric to mesic.",
      ],
    },
    {
      title: "Describe the carbon cycle and the impact of human activities",
      steps: [
        "Photosynthesis pulls \\(\\ce{CO2}\\) from the air into plants; food chains move carbon to animals.",
        "Respiration and decomposers return \\(\\ce{CO2}\\) to the atmosphere.",
        "Oceans absorb \\(\\ce{CO2}\\); some is deposited as calcium or magnesium carbonate and lost to sediments.",
        "Rocks and fossil fuels are long term sinks; burning fossil fuels, wood, forest fires and volcanoes release \\(\\ce{CO2}\\).",
        "Rapid deforestation and burning of fossil fuel have increased the release of \\(\\ce{CO2}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Pyramid of energy", labels: ["producers 100%", "primary consumers 10%", "secondary consumers 1%", "tertiary consumers 0.1%", "upright shape"] },
    { title: "Energy flow showing increasing trophic level", labels: ["1000 J of light energy", "100 J producer, 10 J herbivore", "900 J, 90 J, 9 J lost to environment", "producer, herbivore, carnivore"] },
    { title: "Decomposition cycle", labels: ["leaf falls and becomes litter", "leaching of nutrients into soil", "decomposers", "mineralization", "soil rich in organic content"] },
    { title: "Carbon cycle", labels: ["photosynthesis", "plant and animal respiration", "decay of dead organisms", "fossil fuels and emissions", "ocean"] },
    { title: "Hydrarch succession of plants", labels: ["phytoplankton stage", "submerged plant stage", "submerged and free floating stage", "reed-swamp stage", "marsh-meadow stage", "scrub and forest stage"] },
    { title: "Pyramid of numbers", labels: ["producers at the base", "primary consumers", "secondary consumers", "tertiary consumer at the apex"] },
  ],
  mostAsked: [
    { topic: "Decomposition: definition, steps in sequence (leaching, humification, mineralisation), humus, saprotrophs", years: [2026, 2025, 2024] },
    { topic: "Pioneer species: lichens on rock (rock into soil), phytoplankton in water", years: [2026, 2024] },
    { topic: "Primary succession (volcanic island) and the climax community", years: [2026, 2024] },
    { topic: "Energy flow: 10% law numerical and the pyramid of energy with a diagram", years: [2026, 2024] },
    { topic: "Carbon cycle: long term sinks (rocks and fossil fuels)", years: [2025] },
  ],
  mistakes: [
    {
      title: "Steps of decomposition out of order",
      body: "Write them as fragmentation, leaching, catabolism, humification, mineralisation. Humus is formed in humification and broken down in mineralisation.",
    },
    {
      title: "Ten percent numericals",
      body: "Count one 10% step per level. In the book's Fig. 14.6, 1000 J of light gives the producer 100 J, the herbivore 10 J and the carnivore 1 J. Say which level the given energy belongs to before you start: when it is the producers' own, as in the 2026 board question (5000 J), herbivores get 500 J and carnivores 50 J.",
    },
    {
      title: "Inverting the pyramid of energy",
      body: "The pyramid of energy is **always upright**. Biomass can be inverted (ocean) and numbers can be inverted (insects on a single tree).",
    },
    {
      title: "Pioneer and climax confused",
      body: "Pioneers come first: crustose lichens on rock, phytoplankton in water. The **climax community** comes last and does not evolve further.",
    },
    {
      title: "Primary and secondary succession swapped",
      body: "A newly formed volcanic island or bare rock (no soil) is **primary**; an abandoned field or a forest after fire (soil present) is **secondary**, and faster.",
    },
  ],
};

export default sheet;
