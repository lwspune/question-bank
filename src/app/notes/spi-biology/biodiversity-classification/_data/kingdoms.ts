import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_BD_KINGDOMS_NOTE: SubtopicNote = {
  subtopicName: "Five Kingdoms and the Ranks of Classification",
  title: "Five Kingdoms and the Ranks of Classification",
  oneLineDefinition:
    "Whittaker sorted all living things into five kingdoms, and inside each kingdom organisms are placed in ranks from the broad kingdom down to the single species.",
  whyItMatters:
    "Four questions in the bank, three EASY and one MODERATE: who gave the five kingdom system (from the 2022 paper), the order of the ranks, the protist that links plants and animals, and the protists whose silica walls cover the seabed. Learn the five kingdoms, the ranks in order and two famous protists.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spibdki-kingdoms",
      name: "Whittaker's five kingdoms and the ranks",
      intuition:
        "Classification is sorting: first into a few large boxes (kingdoms), then smaller and smaller boxes inside them, until each box holds one kind of organism, a species. " +
        "The five kingdoms are told apart by two questions: is the cell with or without a nucleus, and is the body one cell or many?",
      definition:
        "- **R H Whittaker** (1969) gave the **five kingdom** system: **Monera, Protista, Fungi, Plantae, Animalia**.\n" +
        "- **Carolus Linnaeus** gave **binomial nomenclature**: every organism has a two part name, genus then species (Homo sapiens).\n" +
        "- **Ranks, from the top down**: kingdom, phylum (division for plants), class, order, family, genus, **species**.\n" +
        "- **From the bottom up** it is the reverse: species, genus, family, order, class, phylum or division, kingdom.\n" +
        "- **Species** is the basic unit: organisms that can breed with each other.",
      table: {
        columns: ["Kingdom", "Cell", "Body", "Example"],
        rows: [
          { cells: ["Monera", "No true nucleus", "One cell", "Bacteria, blue green algae"] },
          { cells: ["Protista", "True nucleus", "One cell", "Amoeba, Euglena, diatoms"] },
          { cells: ["Fungi", "True nucleus, cell wall of chitin", "Mostly many cells, cannot make food", "Yeast, mushroom, Rhizopus"] },
          { cells: ["Plantae", "True nucleus, cell wall of cellulose", "Many cells, make their own food", "Moss, fern, mango"] },
          {
            cells: ["Animalia", "True nucleus, no cell wall", "Many cells, eat food", "Earthworm, fish, human"],
            noteAmber: "Whittaker's system covers all living things, not just animals.",
          },
        ],
        caption: "Ranks top down: kingdom, phylum or division, class, order, family, genus, species.",
      },
      selfCheckExample: {
        prompt: "Put these ranks in order from the smallest group to the largest: order, species, family, class, genus.",
        steps: ["The smallest group is the species, then the genus.", "Next come family, order and class, in that order."],
        answer: "Species, genus, family, order, class",
      },
      practiceSet: [
        { prompt: "Who gave the two part naming of organisms, binomial nomenclature?", answer: "Carolus Linnaeus" },
        { prompt: "In which kingdom are bacteria placed?", answer: "Monera" },
        { prompt: "Which rank comes just above genus?", answer: "Family" },
        { prompt: "In Homo sapiens, which word is the genus?", answer: "Homo" },
        { prompt: "What is the cell wall of a fungus made of?", answer: "Chitin" },
      ],
      pyqExampleId: "e4b2cb0f-6b9c-4b0f-ace6-0efb34e43c08",
      traps: [
        {
          title: "Putting class below order",
          body: "Going up, order comes before class: species, genus, family, order, class, phylum, kingdom. A list that puts class before order on the way up is wrong.",
        },
        {
          title: "Robert Hooke for classification",
          body: "Robert Hooke first saw cells. The five kingdom system is Whittaker's, and the two part naming of species is Linnaeus's.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spibdki-protists",
      name: "Protists: Euglena, diatoms and their relatives",
      intuition:
        "Protists are single cells with a true nucleus. Some behave like tiny plants, some like tiny animals, and one, Euglena, behaves like both.",
      definition:
        "- **Euglena**: has **chloroplasts** and makes food by photosynthesis like a plant, but has **no cell wall**, swims with a **flagellum** and can take in food like an animal. So it is the **connecting link between plants and animals**.\n" +
        "- **Diatoms**: have cell walls of **silica**. When they die the walls pile up on the seabed as **diatomaceous earth**.\n" +
        "- **Amoeba**: moves and feeds with false feet (pseudopodia).\n" +
        "- **Paramecium**: moves with **cilia**; has no chloroplasts.\n" +
        "- **Plasmodium**: causes malaria.",
      table: {
        columns: ["Protist", "Moves by", "Known for"],
        rows: [
          {
            cells: ["Euglena", "Flagellum", "Link between plants and animals"],
            noteAmber: "Euglena has chloroplasts; Paramecium has none.",
          },
          { cells: ["Diatoms", "Drift in water", "Silica walls, deposits on the seabed"] },
          { cells: ["Amoeba", "False feet (pseudopodia)", "Changes its shape"] },
          { cells: ["Paramecium", "Cilia", "Slipper shape"] },
          { cells: ["Plasmodium", "Carried by mosquitoes", "Causes malaria"] },
        ],
      },
      selfCheckExample: {
        prompt: "Spot the wrong row: (a) Amoeba: false feet (b) Paramecium: cilia (c) Euglena: flagellum (d) Paramecium: chloroplasts for photosynthesis",
        steps: ["Amoeba, Paramecium and Euglena move as stated.", "Paramecium has no chloroplasts; it eats food."],
        answer: "(d) is wrong: Paramecium has no chloroplasts.",
      },
      practiceSet: [
        { prompt: "Which protist moves with cilia?", answer: "Paramecium" },
        { prompt: "What are the cell walls of diatoms made of?", answer: "Silica" },
        { prompt: "With what does Amoeba move and catch food?", answer: "False feet (pseudopodia)" },
      ],
      pyqExampleId: "04504c68-3029-4723-894e-5f44401059ca",
      traps: [
        {
          title: "Calling a moss a protist",
          body: "Marchantia and Funaria (moss) are true plants, bryophytes, made of many cells. Euglena, the plant-animal link, is a single-celled protist.",
        },
        {
          title: "Protozoa or bacteria for seabed silica",
          body: "The silica on the seabed comes from the walls of diatoms, which are protists with glass-like silica walls.",
        },
      ],
    },
  ],
};
