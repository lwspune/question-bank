import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 13 Our Environment. Statements checked against
 * the NCERT text (definitions in the book's own words). Most-asked years and
 * marks from all 111 CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Our Environment",
  chapterSlug: "our-environment",
  source: "NCERT Science (CBSE Class 10), Chapter 13",
  keyPoints: [
    {
      term: "Ecosystem",
      text: "An ecosystem has **biotic** components (living organisms) and **abiotic** components (temperature, rainfall, wind, soil, minerals), interacting with each other. Forests, ponds and lakes are natural ecosystems; gardens, crop-fields and aquariums are human-made (artificial) ones.",
    },
    {
      term: "Producers, consumers and decomposers",
      text: "**Producers** (green plants, some bacteria) make food from inorganic substances by photosynthesis. **Consumers** depend on producers directly or indirectly: herbivores, carnivores, omnivores, parasites. **Decomposers** (bacteria and fungi) feed on dead remains and wastes.",
    },
    {
      term: "Decomposers",
      text: "They break down complex organic substances into simple inorganic substances that go into the soil and are used again by plants. So they clean the environment and replenish the soil. A pond needs no cleaning because its decomposers do this; an aquarium has none, so it must be cleaned.",
    },
    {
      term: "Food chain and trophic levels",
      text: "A series of organisms each feeding on the one before forms a food chain; each step is a **trophic level**. Producers (autotrophs) are at the first level, herbivores (primary consumers) at the second, small carnivores (secondary consumers) at the third, larger carnivores (tertiary) at the fourth.",
    },
    {
      term: "Flow of energy",
      text: "Green plants capture about **1 %** of the sunlight falling on their leaves. On average only **10 %** of the food energy at one level reaches the next (10 per cent law); the rest is lost as heat or used in life processes. So very little usable energy remains after four levels: food chains have only 3 or 4 steps.",
    },
    {
      term: "Unidirectional flow",
      text: "Energy flow is unidirectional: energy that passes to herbivores never comes back to autotrophs, and it does not move back to an earlier level. There are generally more individuals at the lower trophic levels; producers are the most numerous.",
    },
    {
      term: "Food web",
      text: "Each organism is eaten by more than one kind, so many food chains link into a network: a **food web**. It is more stable than a single food chain, as the loss of one kind of organism can be made up by others.",
    },
    {
      term: "Biological magnification",
      text: "Pesticides and other non-degradable chemicals washed into soil and water are taken up by plants and enter the food chain. As they are not degradable, they accumulate progressively at each trophic level. Their concentration is highest at the top level, so human beings, at the top of many food chains, are worst affected.",
    },
    {
      term: "Ozone layer",
      text: "Ozone \\(\\ce{O3}\\) is a molecule of three oxygen atoms and a deadly poison. But at the higher levels of the atmosphere it shields the earth's surface from ultraviolet radiation from the Sun, which is highly damaging (it causes skin cancer). It forms when UV radiation splits \\(\\ce{O2}\\) into free oxygen atoms, which then join \\(\\ce{O2}\\).",
    },
    {
      term: "Ozone depletion",
      text: "The ozone in the atmosphere began to drop sharply in the 1980s, linked to chlorofluorocarbons (CFCs) used as refrigerants and in fire extinguishers. In 1987 the UNEP forged an agreement to freeze CFC production at 1986 levels; CFC-free refrigerators are now mandatory.",
    },
    {
      term: "Biodegradable and non-biodegradable",
      text: "Substances broken down by biological processes (bacteria, saprophytes) are **biodegradable**: vegetable peels, paper, cotton, wood. Those that are not are **non-biodegradable**: plastics, glass, DDT, metal cans. Enzymes are specific, so plastics are not broken down and persist for a long time, harming soil, water and animals.",
    },
    {
      term: "Managing garbage",
      text: "Changes in life-style, more disposable things and new packaging have increased waste, much of it non-biodegradable. Ways to reduce it: separate biodegradable from non-biodegradable waste; compost kitchen waste; recycle paper, glass and metal; use cloth or jute bags instead of plastic; treat sewage before releasing it.",
    },
  ],
  formulas: [
    { label: "Formation of ozone", latex: "\\ce{O2 ->[UV] O + O} \\qquad \\ce{O + O2 -> O3}" },
    {
      label: "Ten per cent law",
      latex: "E_{\\text{next level}} = 10\\% \\text{ of } E_{\\text{previous level}} \\qquad \\text{e.g. } 10000\\text{ J} \\to 1000 \\to 100 \\to 10\\text{ J}",
    },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Food chains in nature (Figure 13.1)",
      labels: ["forest: grass, deer, lion", "grassland: grass, grasshopper, frog, snake, eagle", "pond: algae, small animals, fish", "arrows from food to feeder"],
    },
    {
      title: "Trophic levels (Figure 13.2)",
      labels: ["first: producers", "second: herbivores", "third: small carnivores", "fourth: large carnivores"],
    },
    {
      title: "Food web (Figure 13.3)",
      labels: ["producers at the base", "branching arrows", "one animal eating several kinds", "top carnivore"],
    },
    {
      title: "Flow of energy in an ecosystem (Figure 13.4)",
      labels: ["sun, 1 % fixed by producers", "10 % passed to each next level", "heat lost at every level", "decomposers"],
    },
  ],
  mostAsked: [
    {
      topic: "Food chains and energy flow: trophic levels, 1 % and 10 % rules, energy at each level, why chains have only 3 or 4 steps, food web, unidirectional flow",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Waste: biodegradable and non-biodegradable, harm from plastics, how to dispose of household waste, disposable cups",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Ozone layer: how it forms, why it matters though poisonous, depletion by CFCs, UNEP 1987 agreement",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Ecosystem and decomposers: biotic and abiotic parts, natural and artificial ecosystems, why an aquarium needs cleaning, role of decomposers",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Biological magnification: how pesticides build up along a food chain and which level has the most",
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Energy numericals backwards",
      body: "Going **up** the chain divide by 10 at each step; going **down** to the producer multiply by 10. If 5 J reaches man in grass, goat, man, the goat had 50 J and the grass 500 J.",
    },
    {
      title: "Magnification at the wrong level",
      body: "Biological magnification is **highest** at the top trophic level (the last consumer), though energy there is lowest. Name the top consumer: in plants, rats, snakes, peacock, it is the peacock.",
    },
    {
      title: "Arrows in a food chain",
      body: "The arrow points from the food to the eater (grass → deer → lion): the direction energy flows. Write producers first.",
    },
    {
      title: "Ozone as good everywhere",
      body: "Ozone is a deadly poison near the ground; it is useful only at the higher levels of the atmosphere, where it absorbs UV radiation.",
    },
    {
      title: "Calling paper or leather non-biodegradable",
      body: "Paper, cotton, leather, wood, peels and dead leaves are biodegradable. Plastic bags, polythene, glass, DDT, ball-pen refills and metal cans are not.",
    },
  ],
};

export default sheet;
