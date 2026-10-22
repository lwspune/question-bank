import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_EC_ENVIRONMENT_NOTE: SubtopicNote = {
  subtopicName: "Waste and Wildlife Conservation",
  title: "Waste and Wildlife Conservation",
  oneLineDefinition:
    "Waste that microbes cannot break down piles up and harms the environment, and many wild species are shrinking in number and are sorted into categories by how threatened they are.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE: why disposable plastic plates are a problem, which human habit harms the environment, the threatened category of the red panda and musk deer (from the 2022 paper), and the month Siberian cranes arrive in India. The 2022 question copies the Maharashtra Class 10 book's definitions word for word, so learn those.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiecen-waste",
      name: "Biodegradable and non-biodegradable waste",
      intuition:
        "Peels and paper rot away because bacteria and fungi eat them. Plastic, glass and metal cans do not: no microbe can break them down, so they stay for hundreds of years.",
      definition:
        "- **Biodegradable**: broken down by microbes. Vegetable peels, paper, cotton, wood, dung.\n" +
        "- **Non-biodegradable**: not broken down by microbes. **Plastic**, polythene, glass, metal cans, DDT.\n" +
        "- Non-biodegradable waste piles up, chokes drains and soil, and harms animals that swallow it.\n" +
        "- **Good habits**: segregate waste into the two kinds, reuse utensils instead of disposable ones, carry cloth bags, use less of the **CFCs** that thin the **ozone layer**.\n" +
        "- **Bad habits**: excessive use of disposable plates, cups and plastic bags; burning plastic.",
      table: {
        columns: ["Waste", "Kind", "Why"],
        rows: [
          { cells: ["Fruit and vegetable peels", "Biodegradable", "Microbes break them down"] },
          { cells: ["Paper", "Biodegradable", "Microbes break it down"] },
          {
            cells: ["Plastic plates and bags", "Non-biodegradable", "No microbe can break them down"],
            noteAmber: "Plastic is avoided because it is non-biodegradable, not because it is light or toxic.",
          },
          { cells: ["Glass bottles", "Non-biodegradable", "No microbe can break them down"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the habit that harms the environment: (a) carrying a cloth bag (b) burning plastic in the open (c) composting kitchen waste (d) separating dry and wet waste",
        steps: ["Cloth bags, compost and separating waste all reduce harm.", "Burning plastic gives out poisonous smoke."],
        answer: "(b) burning plastic in the open",
      },
      practiceSet: [
        { prompt: "Is a cotton cloth biodegradable or non-biodegradable?", answer: "Biodegradable" },
        { prompt: "Which gases, used in old fridges and sprays, damage the ozone layer?", answer: "CFCs (chlorofluorocarbons)" },
        { prompt: "Which living things break down biodegradable waste?", answer: "Microbes (bacteria and fungi)" },
        { prompt: "Is a polythene bag biodegradable or non-biodegradable?", answer: "Non-biodegradable" },
      ],
      pyqExampleId: "2d3e8ab7-9eac-4e01-a4ab-323afece5103",
      traps: [
        {
          title: "Taking a good habit for the harmful one",
          body: "Segregating waste, reusing utensils and cutting down CFCs protect the environment. A question asking what harms it wants the bad habit, such as using piles of disposable plates.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiecen-wildlife",
      name: "Threatened species and migratory birds",
      intuition:
        "Species whose numbers are falling are put in categories, from 'gone for ever' to 'not enough known'. The questions read out a definition and ask for its name, so learn each definition in the book's words.",
      definition:
        "- **Extinct**: no longer found anywhere on Earth. The dodo.\n" +
        "- **Endangered**: on the verge of extinction; will die out unless saved.\n" +
        "- **Vulnerable**: numbers falling; likely to become endangered if the decline goes on.\n" +
        "- **Rare**: numbers have **declined considerably**; being **endemic** (found in one region only) they may become extinct very fast. The **red panda** and **musk deer**.\n" +
        "- **Indeterminate**: thought to be threatened, but there is not enough information to place them.\n" +
        "- **Migratory birds** fly to India for the winter. The **Siberian crane** used to arrive at Keoladeo (Bharatpur, Rajasthan) in **December** and leave around March.",
      table: {
        columns: ["Category", "What it means", "Example"],
        rows: [
          { cells: ["Extinct", "Found nowhere any more", "Dodo"] },
          { cells: ["Endangered", "On the verge of extinction", "Bengal tiger"] },
          { cells: ["Vulnerable", "Falling, likely to become endangered", "One-horned rhinoceros"] },
          {
            cells: ["Rare", "Numbers much declined, endemic, may vanish fast", "Red panda, musk deer"],
            noteAmber: "Endemic plus a sharp decline: that is the book's definition of rare.",
          },
        ],
        caption: "Indeterminate has no fixed example: it is for species too little known to place.",
      },
      selfCheckExample: {
        prompt: "A species is found nowhere on Earth any more. Which category is it in?",
        steps: ["It is not on the verge of extinction: it has already gone.", "That is the extinct category."],
        answer: "Extinct",
      },
      practiceSet: [
        { prompt: "What does endemic mean?", answer: "Found in one region only" },
        { prompt: "Which category is for species that are likely to become endangered if their numbers keep falling?", answer: "Vulnerable" },
        { prompt: "In which wetland in Rajasthan did Siberian cranes spend the winter?", answer: "Keoladeo (Bharatpur)" },
        { prompt: "Which bird, now extinct, is the usual example of extinction?", answer: "The dodo" },
      ],
      pyqExampleId: "e92e9a96-c861-43da-b4e3-ff00035c1600",
      traps: [
        {
          title: "Endangered for every shrinking species",
          body: "Endangered means on the very edge of extinction. A species whose numbers have dropped sharply and which lives in one region only is called rare in the Class 10 book.",
        },
        {
          title: "Thinking winter migrants arrive in the middle of winter",
          body: "Siberian cranes arrive at the start of winter, in December, and stay till about March. January and February fall in the middle of their stay.",
        },
      ],
    },
  ],
};
