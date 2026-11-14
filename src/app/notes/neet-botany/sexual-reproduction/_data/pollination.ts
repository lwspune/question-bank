import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_SR_POLLINATION_NOTE: SubtopicNote = {
  subtopicName: "Pollination",
  title: "Pollination",
  oneLineDefinition:
    "How pollen reaches a stigma: the three kinds of pollination by where the pollen comes from, the devices that stop self-pollination, and the wind, water and animal agents with the flowers each one needs.",
  whyItMatters:
    "Nine NEET questions: two EASY and seven MODERATE. Every NEET from 2021 to 2026 asked at least one, though neither Re-NEET did. Xenogamy was asked twice in almost the same words, in NEET 2021 and NEET 2026, and the statement questions lift whole NCERT lines on wind and water pollination.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbosr-kinds",
      name: "Autogamy, geitonogamy and xenogamy",
      intuition:
        "Pollination is the transfer of pollen from an anther to a stigma. Sort it by where the pollen comes from: the same flower, another flower on the same plant, or a different plant. Only the last one brings in new genes, so plants have ways to avoid the first two.",
      definition:
        "The kinds of pollination in NCERT:\n" +
        "- **Autogamy**: pollen goes to the stigma of the **same flower**. In an open flower with exposed anthers and stigma (**chasmogamous**) complete autogamy is rare.\n" +
        "- **Cleistogamous** flowers **do not open at all**. Their anthers and stigma lie close together, so when the anthers burst, pollen reaches the stigma. They are **invariably autogamous**, since no cross pollen can land on the stigma, and they give an **assured seed set** even without pollinators.\n" +
        "- *Viola* (common pansy), *Oxalis* and *Commelina* bear **both** chasmogamous and cleistogamous flowers.\n" +
        "- **Geitonogamy**: pollen goes to the stigma of **another flower of the same plant**. It needs a pollinating agent, so it works like cross-pollination, but genetically it is **like autogamy**, since the pollen comes from the same plant.\n" +
        "- **Xenogamy**: pollen goes to the stigma of a **different plant**. It is the **only** kind that brings **genetically different** pollen to the stigma.\n" +
        "- **Outbreeding devices**: continued self-pollination leads to **inbreeding depression**. Plants avoid it by releasing pollen when the stigma is not receptive, by placing anther and stigma apart, by **self-incompatibility** (a genetic block on self-pollen germinating or its tube growing in the pistil), and by **unisexual** flowers.\n" +
        "- Male and female flowers on the **same plant** (castor, maize: **monoecious**) prevent autogamy but **not** geitonogamy. Male and female flowers on **different plants** (papaya: **dioecious**) prevent **both**.",
      table: {
        columns: ["Kind", "Pollen comes from", "Genetically"],
        rows: [
          { cells: ["Autogamy", "The same flower", "Same plant, no new genes"] },
          {
            cells: ["Cleistogamy", "The same flower, which never opens", "Always autogamous"],
            noteAmber: "NEET 2022: cleistogamous flowers are invariably autogamous, and the lack of any chance of cross-pollination was the drawback.",
          },
          { cells: ["Geitonogamy", "Another flower of the same plant", "Like autogamy, though an agent carries the pollen"] },
          {
            cells: ["Xenogamy", "A flower of a different plant", "The only kind that brings genetically different pollen"],
            noteAmber: "NEET 2026: xenogamy was again the kind that brings genetically different pollen.",
            pyqExampleId: "57d93f5d-e346-497a-9a5c-2ade47a64e83",
          },
        ],
      },
      pyqExampleId: "0a7c6f25-3e54-4805-95f7-cf1b25ef0a90",
      selfCheckExample: {
        prompt: "Maize bears male and female flowers on the same plant. Which kind of pollination does this prevent, and which kind can still happen?",
        steps: [
          "A plant with separate male and female flowers on the same plant is monoecious.",
          "Pollen cannot reach a stigma in the same flower, so autogamy is prevented.",
          "Pollen can still go from a male flower to a female flower of the same plant, which is geitonogamy.",
        ],
        answer: "It prevents autogamy but not geitonogamy.",
      },
      practiceSet: [
        { prompt: "Name a plant that bears both chasmogamous and cleistogamous flowers.", answer: "*Viola* (common pansy), *Oxalis* or *Commelina*" },
        { prompt: "What are flowers with exposed anthers and stigma called?", answer: "Chasmogamous flowers" },
        { prompt: "What does continued self-pollination lead to?", answer: "Inbreeding depression" },
        { prompt: "Which NCERT plant has male and female flowers on different plants, preventing both autogamy and geitonogamy?", answer: "Papaya" },
        { prompt: "What is the genetic mechanism that stops self-pollen from germinating or growing a tube in the pistil called?", answer: "Self-incompatibility" },
      ],
      traps: [
        {
          title: "Geitonogamy is not xenogamy",
          body: "In **geitonogamy** the pollen comes from **another flower of the same plant**, so it is genetically like autogamy. Only **xenogamy** (a different plant) brings genetically different pollen.",
        },
        {
          title: "Cleistogamy and chasmogamy are opposite",
          body: "**Cleistogamous** flowers never open and are always self-pollinated. **Chasmogamous** flowers are open. *Viola*, *Oxalis* and *Commelina* have both kinds.",
        },
        {
          title: "Monoecy still allows geitonogamy",
          body: "Separate male and female flowers on **one plant** (castor, maize) stop only **autogamy**. Only **dioecy** (papaya) stops geitonogamy as well.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-abiotic",
      name: "Wind and water pollination",
      intuition:
        "Wind and water do not aim. Pollen reaching a stigma is a matter of chance, so these plants make huge amounts of pollen and build flowers that release it or catch it well. They do not need to attract anyone, so their flowers are plain and have no nectar.",
      definition:
        "Abiotic pollination in NCERT:\n" +
        "- Most plants use **animals**; only a small share use **wind or water**. With either, pollen landing on a stigma is a **chance** event, so the flowers make an **enormous amount of pollen** compared with the number of ovules.\n" +
        "- **Wind** is the more common abiotic agent. The pollen is **light and non-sticky**. The flowers often have **well-exposed stamens** and a **large, often feathery stigma**, a **single ovule** in each ovary, and many flowers packed into an **inflorescence**. It is quite common in **grasses**.\n" +
        "- In the **corn cob**, the **tassels** are the **stigma and style**, which wave in the wind to **trap pollen**.\n" +
        "- **Water** pollination is **quite rare**: about **30 genera**, mostly **monocotyledons**. Examples: *Vallisneria* and *Hydrilla* in fresh water, and marine **sea grasses** such as *Zostera*.\n" +
        "- Not all aquatic plants use water. In most of them, such as **water hyacinth** and **water lily**, the flowers rise above the water and are pollinated by **insects or wind**.\n" +
        "- Among lower plants (**algae, bryophytes, pteridophytes**) water is the regular way for male gametes to travel.\n" +
        "- In most water-pollinated species the pollen is protected from wetting by a **mucilaginous covering**.\n" +
        "- **Both** wind- and water-pollinated flowers are **not very colourful** and **do not produce nectar**.",
      table: {
        columns: ["Plant", "Agent", "How the pollen reaches the stigma"],
        rows: [
          {
            cells: ["Maize (corn cob)", "Wind", "The tassels, which are the stigma and style, wave in the wind and trap pollen"],
            noteAmber: "NEET 2023: the tassels of the corn cob trap pollen grains.",
            pyqExampleId: "63c6b608-6b6d-4ce1-9ac4-4abde8f641e8",
          },
          {
            cells: ["Grasses", "Wind", "Light pollen from well-exposed stamens is caught by feathery stigmas"],
            noteAmber: "NEET 2024: a figure of a wind-pollinated inflorescence; the clue was its well-exposed stamens.",
          },
          { cells: ["*Vallisneria*", "Water (fresh)", "The female flower reaches the surface on a long stalk; male flowers or pollen float on the surface and are carried passively by currents"] },
          { cells: ["Sea grasses such as *Zostera*", "Water (marine)", "The female flowers stay under water; the long, ribbon-like pollen is carried passively inside the water"] },
          { cells: ["Water lily, water hyacinth", "Insects or wind", "The flowers rise above the water, so water is not the agent"] },
        ],
      },
      pyqExampleId: "86424960-778c-43ff-91c0-c796f46b4aaf",
      selfCheckExample: {
        prompt: "A grass has light, non-sticky pollen, well-exposed stamens and a large feathery stigma. Which agent pollinates it, and what does each of the three features do?",
        steps: [
          "These are the marks of wind pollination.",
          "Light, non-sticky pollen can be carried in wind currents.",
          "Well-exposed stamens let the pollen be released easily into the wind.",
          "A large feathery stigma traps pollen from the air.",
        ],
        answer: "Wind. The pollen travels in the air, the exposed stamens release it easily, and the feathery stigma catches it.",
      },
      practiceSet: [
        { prompt: "About how many genera of flowering plants are pollinated by water?", answer: "About 30, mostly monocotyledons" },
        { prompt: "Name two freshwater plants that are pollinated by water.", answer: "*Vallisneria* and *Hydrilla*" },
        { prompt: "Name a marine sea grass that is pollinated by water.", answer: "*Zostera*" },
        { prompt: "How many ovules does each ovary of a wind-pollinated flower often have?", answer: "A single ovule" },
        { prompt: "Name one group of lower plants in which water is the regular way for male gametes to travel.", answer: "Algae, bryophytes or pteridophytes" },
      ],
      traps: [
        {
          title: "Water lily is not water-pollinated",
          body: "**Water lily** and **water hyacinth** live in water, but their flowers rise above it and are pollinated by **insects or wind**. *Vallisneria*, *Hydrilla* and *Zostera* are the water-pollinated ones.",
        },
        {
          title: "Tassels trap pollen, they do not release it",
          body: "The **tassels** of a corn cob are the **stigma and style**. Their job is to **trap** pollen from the wind, not to attract insects or scatter pollen.",
        },
        {
          title: "Plenty of pollen is not why the flowers are plain",
          body: "Both statements are NCERT facts: wind- and water-pollinated flowers are **not colourful and lack nectar**, and they make **enormous amounts of pollen**. The pollen is there because landing is a matter of chance; the plain flowers are because there is no animal to attract. NEET 2025 asked exactly this: both true, but one does not explain the other.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-animal",
      name: "Pollination by animals",
      intuition:
        "Most flowering plants pay animals to carry their pollen. The flower advertises with colour, scent and size, and pays with nectar or pollen. Bees are the most important of these workers.",
      definition:
        "Biotic pollination in NCERT:\n" +
        "- Agents: bees, butterflies, flies, beetles, wasps, ants, moths, birds (**sunbirds** and **humming birds**) and **bats**. Among animals, **insects**, particularly **bees**, are the **dominant** biotic pollinators.\n" +
        "- Larger animals can pollinate too: some **primates (lemurs)**, **tree-dwelling rodents** and reptiles such as the **gecko lizard** and **garden lizard**.\n" +
        "- Most insect-pollinated flowers are **large, colourful, fragrant and rich in nectar**. Small flowers are clustered into an **inflorescence** to be noticed.\n" +
        "- Flowers pollinated by **flies and beetles** give out **foul odours** to attract them.\n" +
        "- **Nectar and pollen** are the usual **floral rewards**. In some species the reward is a safe place to **lay eggs**: *Amorphophallus*, whose flower is about **6 feet** tall, is NCERT's example.\n" +
        "- *Yucca* and a species of **moth** cannot complete their life cycles without each other: the moth lays its eggs in the **locule of the ovary**, pollinates the flower, and its larvae come out as the seeds develop.\n" +
        "- Some insects take pollen or nectar **without pollinating**: they are **pollen or nectar robbers**.",
      table: {
        columns: ["Flower feature", "Who it is for"],
        rows: [
          {
            cells: ["Large, colourful, fragrant, rich in nectar", "Insects"],
            noteAmber: "NEET 2023: large, colourful, fragrant flowers with nectar were the mark of insect pollination.",
            pyqExampleId: "9932520c-ac49-497a-a1b8-0f82fd2d1aae",
          },
          { cells: ["Foul odour", "Flies and beetles"] },
          { cells: ["Small flowers clustered into an inflorescence", "Insects, which notice the cluster more easily"] },
          { cells: ["A safe place to lay eggs", "Insects visiting *Amorphophallus*; the moth of *Yucca*"] },
          { cells: ["Not colourful, no nectar", "No animal: wind or water pollination"] },
        ],
      },
      pyqExampleId: "ebea614b-8f83-473f-956e-a7943b6ff6e1",
      selfCheckExample: {
        prompt: "How do *Yucca* and its moth depend on each other?",
        steps: [
          "The moth lays its eggs in the locule of the *Yucca* ovary.",
          "While doing so it pollinates the flower.",
          "The moth larvae come out of the eggs as the seeds start developing, so neither can complete its life cycle without the other.",
        ],
        answer: "The moth pollinates the flower while laying eggs in its ovary, and its larvae grow as the seeds develop.",
      },
      practiceSet: [
        { prompt: "Name two birds that pollinate flowers.", answer: "Sunbirds and humming birds" },
        { prompt: "Name a reptile that can pollinate flowers.", answer: "The gecko lizard or the garden lizard" },
        { prompt: "What are the two usual floral rewards for animal pollinators?", answer: "Nectar and pollen grains" },
        { prompt: "What are insects that take pollen or nectar without pollinating the flower called?", answer: "Pollen or nectar robbers" },
        { prompt: "Name a primate that pollinates flowers.", answer: "Lemurs" },
      ],
      traps: [
        {
          title: "Bees lead, not moths or butterflies",
          body: "Among insects, **bees** are the dominant pollinating agents. Moths and butterflies pollinate too, but they are not the dominant ones.",
        },
        {
          title: "Bright flowers with nectar point to insects",
          body: "Large, colourful, fragrant flowers with **nectar** are insect-pollinated. Wind- and water-pollinated flowers are **plain** and have **no nectar**.",
        },
      ],
    },
  ],
};
