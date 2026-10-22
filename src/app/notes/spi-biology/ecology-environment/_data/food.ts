import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_EC_FOOD_NOTE: SubtopicNote = {
  subtopicName: "Ecosystems and Food Chains",
  title: "Ecosystems and Food Chains",
  oneLineDefinition:
    "An ecosystem is the living things of a place together with its non-living surroundings, and a food chain is the order in which food, and the energy in it, passes from plants to animals.",
  whyItMatters:
    "Three questions in the bank: one EASY (what an ecosystem includes), one MODERATE (the links of a food chain) and one HARD (a pyramid of biomass for a pond chain). The MODERATE one is lost by putting decomposers into the chain; the HARD one by forgetting that a pond's tiny plants can weigh less than the animals eating them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiecfo-components",
      name: "The parts of an ecosystem",
      intuition:
        "A pond is an ecosystem: the fish, plants and microbes in it, and also the water, mud, sunlight and air they depend on. Neither half works without the other.",
      definition:
        "- **Biotic** (living) components: **producers** (green plants), **consumers** (animals) and **decomposers** (bacteria and fungi).\n" +
        "- **Abiotic** (non-living) components: air, water, soil, sunlight, temperature, minerals.\n" +
        "- An ecosystem always has **both**, interacting with each other.\n" +
        "- Examples: natural (pond, forest, grassland, desert) and man-made (garden, crop field, aquarium).\n" +
        "- **Decomposers** break down dead plants and animals and return minerals to the soil.",
      table: {
        columns: ["Component", "Living or not", "Examples"],
        rows: [
          { cells: ["Producers", "Living", "Grass, trees, algae"] },
          { cells: ["Consumers", "Living", "Deer, frog, lion"] },
          { cells: ["Decomposers", "Living", "Bacteria, fungi"] },
          {
            cells: ["Abiotic factors", "Non-living", "Air, water, soil, sunlight"],
            noteAmber: "An ecosystem includes the non-living part too, not living things alone.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Sort into biotic and abiotic: mushroom, sunlight, earthworm, soil.",
        steps: ["Mushroom (a fungus) and earthworm are living: biotic.", "Sunlight and soil are non-living: abiotic."],
        answer: "Biotic: mushroom, earthworm. Abiotic: sunlight, soil.",
      },
      practiceSet: [
        { prompt: "Which living things return minerals from dead bodies to the soil?", answer: "Decomposers (bacteria and fungi)" },
        { prompt: "Is temperature a biotic or an abiotic component?", answer: "Abiotic" },
        { prompt: "Is an aquarium a natural or a man-made ecosystem?", answer: "Man-made" },
      ],
      pyqExampleId: "94df979e-4fdb-41cc-803a-5cd37a4dbe55",
      traps: [
        {
          title: "An ecosystem as living things only",
          body: "A community is the living things alone. An ecosystem adds the non-living part (air, water, soil, light) that they live in and use.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiecfo-chains",
      name: "Food chains, trophic levels and pyramids",
      intuition:
        "A food chain answers 'who eats whom', in order: a plant, then the animal that eats the plant, then the animal that eats that animal. Each step is a trophic level. " +
        "Draw a bar for each level and you get an ecological pyramid.",
      definition:
        "- **Food chain** links: **producer** (plant), **herbivore** (primary consumer), **carnivore** (secondary consumer), and sometimes a top carnivore. Example: grass, deer, lion.\n" +
        "- **Decomposers** act on every level but are **not a link** in the chain.\n" +
        "- A **food web** is many food chains joined together.\n" +
        "- **Pyramid of numbers** and **pyramid of energy**: usually widest at the producers. The pyramid of energy is **always upright**.\n" +
        "- **Pyramid of biomass** (living weight): upright on land. In a **pond or sea**, tiny producers (phytoplankton) are eaten as fast as they grow, so their biomass at any moment can be **less** than the herbivores': the bottom bar is the narrow one.",
      table: {
        columns: ["Trophic level", "Name", "Example (grassland)", "Example (pond)"],
        rows: [
          { cells: ["First", "Producer", "Grass", "Phytoplankton"] },
          { cells: ["Second", "Herbivore (primary consumer)", "Grasshopper", "Small crustaceans"] },
          { cells: ["Third", "Carnivore (secondary consumer)", "Frog", "Small fish"] },
          {
            cells: ["Fourth", "Top carnivore", "Snake", "Large fish"],
            noteAmber: "Decomposers are not a level in the chain.",
          },
        ],
        caption: "The pyramid of energy is always upright; a pond's pyramid of biomass can have a narrow base.",
      },
      selfCheckExample: {
        prompt: "In the chain grass, rabbit, fox, which organism is the primary consumer, and which is the secondary consumer?",
        steps: ["The rabbit eats the plant, so it is the primary consumer (herbivore).", "The fox eats the rabbit, so it is the secondary consumer (carnivore)."],
        answer: "Rabbit: primary consumer. Fox: secondary consumer.",
      },
      practiceSet: [
        { prompt: "What is a network of many joined food chains called?", answer: "A food web" },
        { prompt: "Which ecological pyramid is always upright?", answer: "The pyramid of energy" },
        { prompt: "In the chain plants, insects, frog, snake, what is the frog?", answer: "A secondary consumer (carnivore)" },
        { prompt: "In which kind of ecosystem can the pyramid of biomass have a narrow base?", answer: "A pond or sea, where the producers are tiny phytoplankton" },
      ],
      pyqExampleId: "a54851e5-207f-4e82-8b5b-9628335c3f75",
      traps: [
        {
          title: "Putting decomposers in the chain",
          body: "Producers, consumers and decomposers are the parts of an ecosystem. A food chain is producers, herbivores and carnivores; decomposers work on every level from the side.",
        },
        {
          title: "Every pyramid is upright",
          body: "The pyramid of energy is always upright, but a pond's pyramid of biomass can be narrow at the bottom, because tiny producers are eaten as fast as they grow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiecfo-ten-percent",
      name: "The ten percent law of energy flow",
      intuition:
        "At each step of a food chain, most of the energy is used up in living and lost as heat. Only about a tenth of it is stored in the body of the next animal.",
      definition:
        "- Only about **10%** of the energy at one trophic level reaches the next.\n" +
        "- So the energy falls by ten times at each step, and food chains are usually only 3 or 4 steps long.\n" +
        "- Green plants store only about **1%** of the sunlight that falls on them: a different figure from the 10%.",
      formula: {
        label: "Energy at the next level",
        latex: "E_{\\text{next}} = \\frac{10}{100} \\times E_{\\text{this}}",
      },
      authoredExample: {
        prompt: "Plants in a field store 20,000 J of energy. How much reaches a snake in the chain plants, grasshopper, frog, snake?",
        steps: [
          "Grasshopper: \\(10\\%\\) of 20,000 J \\(= 2000\\) J.",
          "Frog: \\(10\\%\\) of 2000 J \\(= 200\\) J.",
          "Snake: \\(10\\%\\) of 200 J \\(= 20\\) J.",
        ],
        answer: "20 J",
      },
      selfCheckExample: {
        prompt: "A herbivore gets 500 kJ from the plants it eats. About how much energy passes to the carnivore that eats it?",
        steps: ["\\(10\\%\\) of 500 kJ \\(= 50\\) kJ."],
        answer: "50 kJ",
      },
      practiceSet: [
        { prompt: "About what percentage of energy passes from one trophic level to the next?", answer: "10%" },
        { prompt: "A secondary consumer receives 30 J. How much energy was at the producer level two steps below?", answer: "3000 J" },
        { prompt: "About what percentage of the sunlight falling on them do green plants store?", answer: "1%" },
      ],
      traps: [
        {
          title: "Mixing up the 1% and the 10%",
          body: "Plants store about 1% of sunlight; about 10% of energy passes from one animal level to the next. A question about sunlight wants 1%.",
        },
      ],
    },
  ],
};
