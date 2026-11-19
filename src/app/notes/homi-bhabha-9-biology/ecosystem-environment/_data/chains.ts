import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_EE_CHAINS_NOTE: SubtopicNote = {
  subtopicName: "Food Chains and Consumers",
  title: "Food Chains and Consumers",
  oneLineDefinition:
    "Producers make food, herbivores, carnivores and omnivores eat it, scavengers eat the dead and decomposers break everything down; a food chain links them in the order of who is eaten by whom.",
  whyItMatters:
    "Five questions in the bank, one EASY, three MODERATE and one HARD: a pair of scavengers, two Venn diagrams that sort animals into herbivores, carnivores, omnivores, scavengers and decomposers, and the same freshwater food chain asked twice (December 2021 and 2023).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9eech-consumers",
      name: "Producers, consumers, scavengers and decomposers",
      intuition:
        "Every living thing in an ecosystem has a job tied to food. Green plants make it. Animals eat plants, or eat other animals, or both. Some animals clean up dead bodies, and tiny bacteria and fungi finish the job by breaking the remains down into simple substances that go back to the soil.",
      definition:
        "- **Producers** make their own food by photosynthesis: green plants, algae and phytoplankton.\n" +
        "- **Herbivores** (primary consumers) eat only plants. **Carnivores** (secondary and higher consumers) eat other animals. **Omnivores** eat both.\n" +
        "- A **top consumer** is not eaten by any other animal in that ecosystem.\n" +
        "- **Scavengers** eat dead and decaying animals and so clean the surroundings.\n" +
        "- **Decomposers**, bacteria and fungi, break down dead plants and animals into simple substances that return to the soil.\n" +
        "- **Reading a Venn diagram**: an animal in the overlap of two circles belongs to both groups. An omnivore sits where the herbivore and carnivore circles overlap.",
      table: {
        columns: ["Group", "What it eats", "Examples"],
        rows: [
          { cells: ["Producers", "Make their own food", "Grass, trees, algae, phytoplankton"] },
          { cells: ["Herbivores (primary consumers)", "Only plants", "Cow, deer, elephant, rabbit, grasshopper"] },
          { cells: ["Carnivores", "Other animals", "Lion, tiger, wolf, owl, eagle, snake"] },
          { cells: ["Omnivores", "Plants and animals", "Bear, chimpanzee, human"] },
          { cells: ["Scavengers", "Dead and decaying animals", "Vulture, hyena, crow, jackal"] },
          { cells: ["Decomposers", "Break down dead plants and animals", "Bacteria, fungi"], noteAmber: "Decomposers are microbes, not animals." },
        ],
        caption: "The bear is both an omnivore and a top consumer; the crow eats almost anything and is a scavenger too.",
      },
      selfCheckExample: {
        prompt: "Which one is a decomposer: vulture, mushroom, wolf, deer?",
        steps: ["A vulture is a scavenger, a wolf a carnivore and a deer a herbivore.", "A mushroom is a fungus, which breaks down dead matter."],
        answer: "Mushroom",
      },
      practiceSet: [
        { prompt: "Why are vultures called scavengers?", answer: "They eat dead and decaying animals and so clean the surroundings" },
        { prompt: "Name an animal that is both an omnivore and a top consumer.", answer: "The bear" },
        { prompt: "To which group do the bacteria that break down dead bodies belong?", answer: "Decomposers" },
        { prompt: "Is an elephant a primary consumer or a secondary consumer?", answer: "A primary consumer, because it eats only plants" },
      ],
      pyqExampleId: "4f305979-c7c0-4911-8696-e577ef574949",
      traps: [
        {
          title: "Calling scavengers decomposers",
          body: "Scavengers are animals, such as vultures and hyenas, that eat dead bodies. Decomposers are bacteria and fungi that break the remains down into simple substances.",
        },
        {
          title: "Treating the bear as a herbivore",
          body: "A bear eats fruit, honey, fish and small animals, so it is an omnivore. No animal hunts it, so it is also a top consumer.",
        },
        {
          title: "Calling fungi producers",
          body: "Fungi have no chlorophyll and cannot make food. They are decomposers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9eech-chains",
      name: "Writing a food chain",
      intuition:
        "A food chain is a list of who is eaten by whom. Start with the plant, because only a plant can make food from sunlight. Then add the animal that eats it, then the animal that eats that one, until you reach the animal nothing eats. Decomposers feed on the dead of every link, so they come last.",
      definition:
        "- A food chain **always starts with a producer**.\n" +
        "- Each arrow means **is eaten by**, and shows the way energy flows.\n" +
        "- Then come the **herbivore**, the **carnivores** in order, and the **top consumer**.\n" +
        "- **Decomposers** act on dead remains at every level; when they are listed, they come **last**.\n" +
        "- In fresh water the producers are **algae** (such as Nitella) and water plants; small animals such as **annelids** (worms) and insect larvae eat them.\n" +
        "- Many food chains joined together make a **food web**.",
      table: {
        columns: ["Ecosystem", "A food chain"],
        rows: [
          { cells: ["Grassland", "Grass, deer, tiger"] },
          { cells: ["Farm", "Grain, rat, snake, hawk"] },
          { cells: ["Sea", "Phytoplankton, zooplankton, small fish, big fish"] },
        ],
        caption: "Each chain is written from the producer to the top consumer.",
      },
      selfCheckExample: {
        prompt: "Arrange these into a food chain: snake, grass, eagle, frog, grasshopper.",
        steps: [
          "The producer is grass, eaten by the grasshopper.",
          "A frog eats the grasshopper, a snake eats the frog, and the eagle eats the snake.",
        ],
        answer: "Grass, grasshopper, frog, snake, eagle",
      },
      practiceSet: [
        { prompt: "In a food chain, what does the arrow from grass to deer mean?", answer: "Grass is eaten by the deer: energy passes from the grass to the deer" },
        { prompt: "What is always the first link of a food chain?", answer: "A producer, such as a green plant or an alga" },
        { prompt: "Arrange in a food chain: lion, grass, zebra.", answer: "Grass, zebra, lion" },
        { prompt: "Where do decomposers come when they are written into a food chain?", answer: "At the end, because they break down the dead remains of every level" },
      ],
      pyqExampleId: "9da36514-d070-40c6-8c90-a66a41d87a99",
      traps: [
        {
          title: "Starting a chain with an animal",
          body: "Only producers can make food from sunlight, so a food chain always begins with a plant or an alga.",
        },
        {
          title: "Reversing the arrows",
          body: "The arrow points from the one that is eaten to the one that eats it, the same way the energy flows.",
        },
        {
          title: "Putting the decomposer in the middle",
          body: "Decomposers feed on the dead of every level, so when they appear in a sequence they are written last.",
        },
      ],
    },
  ],
};
