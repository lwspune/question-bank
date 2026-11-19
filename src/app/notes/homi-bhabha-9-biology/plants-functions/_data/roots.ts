import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_PF_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Roots, Stems and Adaptations",
  title: "Roots, Stems and Adaptations",
  oneLineDefinition:
    "Roots and stems often change shape for a special job, such as support, breathing, storage or a false trunk, and plants of poor soil or dry land change their whole way of life: insect-eaters, parasites and cacti.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE: the odd one out among modified roots, the plants with roots both in the soil and on the stem, the plant with a false stem, the odd one out among insect-eating plants, and the features of a cactus.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9pfro-roots",
      name: "Modified roots and stems",
      intuition:
        "A normal root holds the plant and drinks water; a normal stem holds up the leaves. Some plants ask more of them. A carrot root stores food, a mangrove root pokes out of the mud to breathe, a maize plant grows extra roots from its stem like tent ropes. And the tall 'trunk' of a banana plant is not a stem at all: it is leaf bases rolled tightly together.",
      definition:
        "- **Tap root** (dicots: mango, mustard) and **fibrous roots** (monocots: wheat, maize) are the two **normal** root systems.\n" +
        "- **Adventitious roots** grow from the stem or leaves, not from the main root. **Sugarcane, bamboo and maize** grow them from the nodes above the ground, besides their roots in the soil.\n" +
        "- **Modified roots**: **storage** (carrot, radish, beetroot, sweet potato), **stilt roots** for support (maize, sugarcane), **prop roots** hanging from branches (banyan), **breathing roots** that grow up out of the mud (mangroves), **aerial roots** that take moisture from the air (orchids).\n" +
        "- **Modified stems**: potato (tuber), ginger (rhizome), onion (bulb), all underground; the green, flat, fleshy stem of a cactus.\n" +
        "- **False stem**: the trunk of a **banana** plant is made of tightly rolled **leaf bases**; its real stem is underground.",
      table: {
        columns: ["Root or stem", "Job", "Example"],
        rows: [
          { cells: ["Storage root", "Stores food", "Carrot, radish, sweet potato"] },
          { cells: ["Stilt roots", "Extra support from the lower nodes", "Maize, sugarcane"] },
          { cells: ["Prop roots", "Hold up spreading branches", "Banyan"] },
          { cells: ["Breathing roots", "Take in air in waterlogged mud", "Mangroves"] },
          { cells: ["Aerial roots", "Absorb moisture from the air", "Orchids"] },
          { cells: ["False stem", "Rolled leaf bases standing like a trunk", "Banana"], noteAmber: "The banana's true stem is underground." },
        ],
        caption: "Tap roots and fibrous roots are normal root systems, not modified roots.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: potato, ginger, carrot, onion.",
        steps: ["Potato, ginger and onion are underground stems.", "A carrot is a root swollen with stored food."],
        answer: "Carrot",
      },
      practiceSet: [
        { prompt: "What is the 'trunk' of a banana plant made of?", answer: "Tightly rolled leaf bases: it is a false stem" },
        { prompt: "Why do mangrove trees have roots that grow upwards out of the mud?", answer: "The mud is waterlogged, so these breathing roots take in air" },
        { prompt: "What job do the aerial roots of an orchid do?", answer: "They absorb moisture from the air" },
        { prompt: "Which tree holds up its spreading branches with prop roots?", answer: "The banyan" },
      ],
      pyqExampleId: "434da6a5-9d79-4aa5-bc0e-171baf32feab",
      traps: [
        {
          title: "Counting fibrous roots as modified",
          body: "Fibrous roots are the normal root system of monocots. Modified roots do an extra job, such as storage, support or breathing.",
        },
        {
          title: "Calling a potato a root",
          body: "A potato is an underground stem (a tuber): its eyes are buds. A carrot and a radish are roots.",
        },
        {
          title: "Taking the banana trunk for a real stem",
          body: "The banana trunk is rolled leaf bases, a false stem. Bamboo, by contrast, has a true, jointed stem.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9pfro-adaptations",
      name: "Insect-eating plants, parasites and desert plants",
      intuition:
        "Most plants make all their food in green leaves and take the rest from the soil. Where the soil is poor in nitrogen, some plants catch insects to make up for it. Some plants have given up making food and simply steal it from another plant. In the desert, a cactus saves every drop of water by turning its leaves into spines and letting its green stem do their work.",
      definition:
        "- **Insectivorous plants** grow in soil poor in **nitrogen** and trap insects to get it: **Venus flytrap**, **pitcher plant**, **sundew**, bladderwort. They are green and still make their own food.\n" +
        "- **Parasitic plants** take food from a host plant: **dodder (Cuscuta)** is a yellow, leafless creeper that sends suckers into its host.\n" +
        "- **Cactus**: leaves are reduced to **spines**, so very little water is lost; the **stem is green and fleshy**, **stores water and food** and carries out **photosynthesis**; a thick waxy coat further cuts water loss.",
      table: {
        columns: ["Plant", "Kind", "What it does"],
        rows: [
          { cells: ["Venus flytrap", "Insectivorous", "Two-lobed leaf snaps shut on an insect"] },
          { cells: ["Pitcher plant", "Insectivorous", "Leaf forms a pitcher; insects slip in and drown"] },
          { cells: ["Sundew", "Insectivorous", "Sticky hairs on the leaf hold the insect"] },
          { cells: ["Dodder (Cuscuta)", "Parasite", "Leafless yellow creeper that sucks food from its host"] },
          { cells: ["Cactus", "Desert plant", "Spines for leaves; green fleshy stem stores water and makes food"] },
        ],
        caption: "Insect-eating plants still make their own food; they catch insects for nitrogen.",
      },
      selfCheckExample: {
        prompt: "A plant has no leaves and no green colour, and it twines round a hedge plant from which it draws its food. What kind of plant is it?",
        steps: ["It cannot make its own food without chlorophyll.", "It takes its food from another living plant."],
        answer: "A parasitic plant, such as dodder (Cuscuta)",
      },
      practiceSet: [
        { prompt: "Why do insectivorous plants catch insects?", answer: "The soil they grow in is poor in nitrogen, and insects supply it" },
        { prompt: "Into what are the leaves of a cactus changed?", answer: "Spines" },
        { prompt: "Which part of a cactus carries out photosynthesis?", answer: "Its green, fleshy stem" },
        { prompt: "How does a sundew hold an insect?", answer: "With sticky hairs on its leaves" },
      ],
      pyqExampleId: "d4c45d89-4abb-4468-b8c1-6faf66da07f2",
      traps: [
        {
          title: "Calling dodder an insect-eater",
          body: "Dodder is a parasite: it takes food from a host plant. Venus flytrap, pitcher plant and sundew catch insects.",
        },
        {
          title: "Thinking insect-eating plants cannot make food",
          body: "They are green and make their own food by photosynthesis. Insects only add the nitrogen their soil lacks.",
        },
        {
          title: "Giving a cactus a high rate of water loss",
          body: "With spines in place of leaves and a waxy coat, a cactus loses very little water.",
        },
      ],
    },
  ],
};
