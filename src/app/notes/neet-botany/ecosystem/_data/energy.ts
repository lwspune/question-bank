import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_EC_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Energy Flow and Ecological Pyramids",
  title: "Energy Flow and Ecological Pyramids",
  oneLineDefinition:
    "How the sun's energy enters through producers and passes one way up the trophic levels, the grazing and detritus food chains, the 10 per cent law, and the pyramids of number, biomass and energy with their limits.",
  whyItMatters:
    "Eight NEET questions: one EASY, six MODERATE and one HARD. Three were on pyramids, and the pyramid of biomass in the sea, generally inverted, was the point of both NEET 2021 and NEET 2026. Two were 10 per cent law sums (NEET 2024 and Re-NEET 2024), and Re-NEET 2026 asked twice, on primary consumers and on statements about energy flow.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboec-food-chains",
      name: "Energy flow, food chains and trophic levels",
      intuition:
        "Energy in an ecosystem moves like water down a staircase that only goes one way. Sunlight is caught by plants, passed to the animals that eat them, then to the animals that eat those animals. At every step some energy is lost as heat, and none of it ever comes back to the plants.",
      definition:
        "Energy flow in NCERT:\n" +
        "- Except for the **deep sea hydro-thermal ecosystem**, the **sun** is the only source of energy for all ecosystems on Earth.\n" +
        "- Less than **50 per cent** of the incident solar radiation is **photosynthetically active radiation (PAR)**. Plants capture only **2 to 10 per cent of the PAR**, and this small amount sustains the entire living world.\n" +
        "- All organisms depend on producers for food, directly or indirectly, so energy flows **one way (unidirectional)**: from the sun to producers and then to consumers.\n" +
        "- Ecosystems are **not exempt from the Second Law of thermodynamics**. They need a constant supply of energy to make the molecules they require and to counteract the universal tendency toward increasing disorderliness.\n" +
        "- Producers: in a terrestrial ecosystem, herbaceous and woody plants; in an aquatic ecosystem, phytoplankton, algae and higher plants.\n" +
        "- **Primary consumers** feed on producers, so they are **herbivores** (insects, birds and mammals on land; molluscs in water). **Secondary consumers** are primary carnivores; then come tertiary consumers.\n" +
        "- **Grazing food chain (GFC)**: NCERT example **grass, goat, man**. It is the **major conduit** of energy flow in an **aquatic** ecosystem.\n" +
        "- **Detritus food chain (DFC)**: begins with **dead organic matter** and is made of decomposers (saprotrophs), mainly **fungi and bacteria**. In a **terrestrial** ecosystem a much larger fraction of energy flows through the DFC than through the GFC.\n" +
        "- The two chains connect at some levels, and omnivores such as cockroaches and crows join them, making a **food web**.\n" +
        "- The amount of energy **decreases** at successive trophic levels. Each level has a mass of living material at a given time, its **standing crop**, measured as biomass or as number per unit area. Biomass is measured more accurately as **dry weight**.",
      table: {
        columns: ["Trophic level", "Feeding role", "NCERT examples"],
        rows: [
          { cells: ["First", "Primary producer", "Phytoplankton, grass, trees"] },
          {
            cells: ["Second", "Primary consumer (herbivore)", "Zooplankton, grasshopper and cow"],
            noteAmber: "Re-NEET 2026: the primary consumers in a food chain are herbivores, not parasites, predators or carnivores.",
            pyqExampleId: "16adbf22-be84-4b88-8d32-b6ce1994a75b",
          },
          { cells: ["Third", "Secondary consumer (carnivore)", "Birds, fishes, wolf"] },
          { cells: ["Fourth", "Tertiary consumer (top carnivore)", "Man, lion"] },
        ],
      },
      pyqExampleId: "af7d913b-6d2f-4f50-a67b-85f5fc3ea1ee",
      selfCheckExample: {
        prompt: "In the NCERT grazing food chain of grass, goat and man, give the trophic level and the consumer type of each organism.",
        steps: [
          "Grass makes its own food, so it is the producer at the first trophic level.",
          "The goat eats the grass: a primary consumer (herbivore) at the second trophic level.",
          "Man eats the goat: a secondary consumer at the third trophic level.",
        ],
        answer: "Grass: producer, first level. Goat: primary consumer, second level. Man: secondary consumer, third level.",
      },
      practiceSet: [
        { prompt: "Which ecosystem on Earth does not depend on the sun for its energy?", answer: "The deep sea hydro-thermal ecosystem" },
        { prompt: "What share of incident solar radiation is photosynthetically active radiation?", answer: "Less than 50 per cent" },
        { prompt: "What percentage of PAR do plants capture?", answer: "Only 2 to 10 per cent" },
        { prompt: "In which kind of ecosystem is the grazing food chain the major conduit for energy flow?", answer: "An aquatic ecosystem" },
        { prompt: "In a terrestrial ecosystem, does more energy flow through the grazing food chain or the detritus food chain?", answer: "The detritus food chain, by a much larger fraction" },
        { prompt: "With what does the detritus food chain begin?", answer: "Dead organic matter (detritus)" },
        { prompt: "Why is dry weight preferred to fresh weight for measuring biomass?", answer: "Measurement in terms of dry weight is more accurate" },
      ],
      traps: [
        {
          title: "Ecosystems obey the Second Law",
          body: "Energy flow is **unidirectional**, and ecosystems are **not exempt** from the Second Law of thermodynamics: they need a **constant supply** of energy to fight increasing disorder.",
        },
        {
          title: "The detritus food chain starts with dead matter",
          body: "The **DFC begins with dead organic matter**, not with living organisms. It is made of decomposers, mainly fungi and bacteria.",
        },
        {
          title: "Land runs on detritus, water runs on grazing",
          body: "In **aquatic** ecosystems the **grazing** food chain carries most energy. On **land**, a much larger fraction flows through the **detritus** food chain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nboec-ten-percent",
      name: "The 10 per cent law",
      visualizationSlug: "eco-food-chain-pyramid",
      intuition:
        "Each step up a food chain keeps only about one tenth of the energy of the step below; the rest is lost, mostly as heat. Ten thousand joules in grass become about a thousand in the animals that eat it and a hundred in the animals that eat those. That is why food chains are short.",
      definition:
        "The 10 per cent law in NCERT:\n" +
        "- The number of trophic levels in a grazing food chain is **restricted** because the transfer of energy follows the **10 per cent law**: only **10 per cent** of the energy is transferred to each trophic level from the **lower** trophic level.\n" +
        "- So the energy at each level is one tenth of the level below, and ten times the level above. Going up by n levels multiplies the energy by \\((0.1)^n\\); going down by n levels multiplies it by \\(10^n\\).\n" +
        "- In NCERT's **ideal pyramid of energy**, primary producers convert only **1 per cent** of the energy in the sunlight available to them into NPP. That 1 per cent is sunlight to producers; the transfer between trophic levels is **10 per cent**.\n" +
        "- Some energy is always lost as **heat** at each step, which is why the pyramid of energy is always upright.",
      formula: {
        label: "Energy at the nth trophic level",
        latex: "E_n = E_1 \\times (0.1)^{\\,n-1}",
        symbols: [
          { symbol: "\\(E_1\\)", meaning: "energy at the first trophic level (the producers)" },
          { symbol: "\\(E_n\\)", meaning: "energy at the nth trophic level" },
          { symbol: "\\(n\\)", meaning: "the trophic level number, counting the producers as 1" },
        ],
      },
      authoredExample: {
        prompt: "The producers of a grassland hold 20,000 J of energy. Using the 10 per cent law, how much energy reaches the herbivores, the primary carnivores and the top carnivores at the fourth trophic level?",
        steps: [
          "Herbivores, second level: \\(20000 \\times 0.1 = 2000\\) J.",
          "Primary carnivores, third level: \\(2000 \\times 0.1 = 200\\) J.",
          "Top carnivores, fourth level: \\(200 \\times 0.1 = 20\\) J, the same as \\(20000 \\times (0.1)^3\\).",
        ],
        answer: "2,000 J, 200 J and 20 J.",
      },
      pyqExampleId: "e6c3df58-04a8-4f52-9971-7d1b361d248c",
      selfCheckExample: {
        prompt: "Herbivores in a field hold 5,000 kJ of energy. Using the 10 per cent law, how much energy reaches the secondary carnivores that eat the primary carnivores?",
        steps: [
          "Herbivores are the second trophic level, primary carnivores the third and secondary carnivores the fourth.",
          "Two steps up: \\(5000 \\times 0.1 \\times 0.1 = 50\\) kJ.",
        ],
        answer: "50 kJ.",
      },
      practiceSet: [
        { prompt: "Producers in a pond hold 10,000 J. Using the 10 per cent law, how much energy reaches the third trophic level?", answer: "100 J" },
        { prompt: "Why is the number of trophic levels in a grazing food chain restricted?", answer: "Because energy transfer follows the 10 per cent law, so little energy is left after a few levels" },
        { prompt: "In NCERT's ideal pyramid of energy, what percentage of the available sunlight do primary producers convert into NPP?", answer: "1 per cent" },
        { prompt: "Primary consumers in a forest hold 8,000 kJ. How much energy, by the 10 per cent law, reaches the primary carnivores?", answer: "800 kJ" },
        { prompt: "By the 10 per cent law, how many times more energy does the first trophic level hold than the third?", answer: "100 times" },
      ],
      traps: [
        {
          title: "Between trophic levels it is 10 per cent, not 1 per cent",
          body: "Energy passes from one trophic level to the next by the **10 per cent law**. The **1 per cent** figure is the share of available **sunlight** that producers turn into NPP.",
        },
        {
          title: "Going down a level multiplies by ten",
          body: "Each lower level holds **ten times** the energy of the level above. From the fourth level back to the first is three steps, so multiply by \\(10^3 = 1000\\), not by 4 or by 10.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboec-pyramids",
      name: "Pyramids of number, biomass and energy",
      intuition:
        "Stack the trophic levels as bars, producers at the bottom. Usually each bar is narrower than the one below, giving a pyramid. But count insects on one big tree, or weigh plankton in the sea, and some pyramids turn upside down. Energy never can, because some is always lost at every step.",
      definition:
        "Ecological pyramids in NCERT:\n" +
        "- The **base** of each pyramid is the **producers** (first trophic level) and the **apex** is the tertiary or top level consumer.\n" +
        "- The three pyramids studied are of **number**, **biomass** and **energy**. Any calculation must include **all** organisms at a trophic level, not a few individuals.\n" +
        "- In most ecosystems all three pyramids are **upright**: producers are more in number and biomass than herbivores, and herbivores more than carnivores.\n" +
        "- NCERT's **grassland pyramid of numbers** is upright: about 5,842,000 primary producers support 708,000 primary consumers, 354,000 secondary consumers and only **3 tertiary consumers**.\n" +
        "- The **pyramid of biomass in the sea** is generally **inverted**, because the biomass of fishes far exceeds that of phytoplankton. In NCERT's figure a small standing crop of phytoplankton (4) supports a large standing crop of zooplankton (21).\n" +
        "- NCERT also asks you to picture the pyramid of numbers for **many insects feeding on one big tree**, with small birds eating the insects: here too the numbers do not form an upright pyramid.\n" +
        "- The **pyramid of energy is always upright** and can never be inverted, because some energy is always **lost as heat** when it flows from one trophic level to the next. Each bar shows the energy at that level in a given time or annually per unit area.",
      table: {
        columns: ["Pyramid", "Usual shape", "Exception in NCERT"],
        rows: [
          { cells: ["Number", "Upright, as in a grassland", "Many insects feeding on one big tree"] },
          {
            cells: ["Biomass", "Upright on land", "Generally inverted in the sea: fishes and zooplankton outweigh phytoplankton"],
            noteAmber: "NEET 2021: the false statement was that the pyramid of biomass in the sea is generally upright.",
            pyqExampleId: "0d4b3b76-8c3c-4168-b27a-39c923a782a1",
          },
          { cells: ["Energy", "Always upright", "None: it can never be inverted, since energy is lost as heat at each step"] },
        ],
      },
      pyqExampleId: "d3eba373-73f5-4da6-b309-4a82c9c5c272",
      selfCheckExample: {
        prompt: "A student draws a pyramid of energy for a forest in which the herbivore bar is wider than the producer bar. Is this possible? Explain.",
        steps: [
          "Herbivores get all their energy from the producers below them.",
          "Some energy is always lost as heat at each transfer, so the higher level must hold less.",
        ],
        answer: "No. A pyramid of energy is always upright, because energy is lost as heat at every step; the herbivore bar must be narrower.",
      },
      practiceSet: [
        { prompt: "What does the base of an ecological pyramid represent, and what does the apex represent?", answer: "The base is the producers (first trophic level); the apex is the tertiary or top level consumer" },
        { prompt: "Name the three ecological pyramids usually studied.", answer: "The pyramids of number, biomass and energy" },
        { prompt: "In NCERT's grassland pyramid of numbers, how many top carnivores are supported by nearly 6 million plants?", answer: "Only 3" },
        { prompt: "Why can a pyramid of energy never be inverted?", answer: "Some energy is always lost as heat when it passes from one trophic level to the next" },
        { prompt: "What does each bar of a pyramid of energy show?", answer: "The amount of energy at that trophic level in a given time, or annually per unit area" },
      ],
      traps: [
        {
          title: "Biomass in the sea is inverted, energy never is",
          body: "The pyramid of **biomass in the sea** is generally **inverted**. The pyramid of **energy** is **always upright**, in a pond or anywhere else.",
        },
        {
          title: "The grassland pyramid of numbers is upright",
          body: "In a **grassland** the pyramid of numbers is **upright**: millions of plants, fewer herbivores and only a few top carnivores. The upside-down case NCERT gives is many insects on **one big tree**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboec-pyramid-limits",
      name: "Limitations of ecological pyramids",
      intuition:
        "A pyramid is a neat drawing of a messy reality. It puts each species in one box on one level, in one straight chain. Real animals eat at several levels, chains are tangled into webs, and the decomposers that recycle everything have no box at all.",
      definition:
        "Limits of ecological pyramids in NCERT:\n" +
        "- A **trophic level** is a **functional level**, not a species. A given species may occupy **more than one trophic level** in the same ecosystem at the same time.\n" +
        "- NCERT example: a **sparrow** is a **primary consumer** when it eats seeds, fruits and peas, and a **secondary consumer** when it eats insects and worms.\n" +
        "- The limitations of ecological pyramids are:\n" +
        "- They do **not take into account** the same species belonging to **two or more trophic levels**.\n" +
        "- They assume a **simple food chain**, something that almost never exists in nature; they **do not accommodate a food web**.\n" +
        "- **Saprophytes** are given **no place** in ecological pyramids, even though they play a vital role in the ecosystem.",
      table: {
        columns: ["Limitation", "Why it matters"],
        rows: [
          { cells: ["Ignores a species at two or more trophic levels", "A sparrow eating seeds and insects is both a primary and a secondary consumer"] },
          {
            cells: ["Assumes a simple food chain and does not accommodate a food web", "Real chains are interconnected into webs"],
            noteAmber: "Re-NEET 2024: the option claiming pyramids accommodate a food web was the one that is not a limitation.",
            pyqExampleId: "ad7dd8ca-39ad-4453-891a-26d74fd8fd29",
          },
          { cells: ["Gives saprophytes no place", "Saprophytes play a vital role in the ecosystem"] },
        ],
      },
      pyqExampleId: "ad7dd8ca-39ad-4453-891a-26d74fd8fd29",
      selfCheckExample: {
        prompt: "A sparrow eats grain in the morning and caterpillars in the evening. At which trophic levels does it feed, and which limitation of ecological pyramids does this show?",
        steps: [
          "Eating grain, a producer's product, makes it a primary consumer.",
          "Eating caterpillars, which are herbivores, makes it a secondary consumer.",
          "A pyramid puts each species on a single level, so it cannot show this.",
        ],
        answer: "It is a primary and a secondary consumer; pyramids do not take into account a species at two or more trophic levels.",
      },
      practiceSet: [
        { prompt: "Is a trophic level a species or a functional level?", answer: "A functional level" },
        { prompt: "Which group of organisms, though vital to the ecosystem, gets no place in ecological pyramids?", answer: "Saprophytes" },
        { prompt: "Which NCERT bird is a primary consumer when it eats seeds and a secondary consumer when it eats insects?", answer: "The sparrow" },
        { prompt: "What kind of food chain does an ecological pyramid assume?", answer: "A simple food chain, which almost never exists in nature" },
      ],
      traps: [
        {
          title: "Pyramids cannot show a food web",
          body: "An ecological pyramid assumes a **simple food chain** and does **not accommodate a food web**. An option saying it does is the one that is not a limitation.",
        },
        {
          title: "Saprophytes are left out of pyramids",
          body: "**Saprophytes** play a vital role in the ecosystem, yet they have **no place** in ecological pyramids.",
        },
      ],
    },
  ],
};
