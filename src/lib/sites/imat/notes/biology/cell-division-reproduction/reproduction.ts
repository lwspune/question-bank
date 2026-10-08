import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CDR_REPRODUCTION_NOTE: SubtopicNote = {
  subtopicName: "Asexual and Sexual Reproduction",
  title: "Asexual and Sexual Reproduction and Life Cycles",
  oneLineDefinition:
    "Asexual reproduction copies one parent by mitosis or fission; sexual reproduction mixes two parents' genes through meiosis and fertilisation.",
  whyItMatters:
    "The 2014 paper compared asexual and sexual reproduction in a which-statement-is-correct question, and a 2021 question asked which structure in a set of diagrams is formed by mitosis. Life cycles have not been asked yet, but they test whether you know where meiosis and mitosis sit in plants.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-cdr-asexual-sexual",
      name: "Asexual and sexual reproduction: methods, advantages and costs",
      intuition:
        "Asexual reproduction is fast and needs no partner, but every offspring is a copy, so one new disease or change in climate can hit them all. Sexual reproduction is slower and costs energy, but it mixes genes, so some offspring may cope with a change. Many organisms keep both options.",
      definition:
        "**Asexual reproduction**: one parent; offspring are **clones**, genetically identical to the parent apart from **mutations**.\n" +
        "- In eukaryotes it uses **mitosis**; bacteria use **binary fission**.\n" +
        "**Sexual reproduction**: two haploid **gametes** fuse at **fertilisation**; meiosis and fertilisation create **variation**.\n" +
        "- Mutations happen in both kinds; only sexual reproduction adds recombination.\n" +
        "- Many organisms can do both: strawberries (seeds and runners), aphids (sexual eggs and parthenogenesis), yeast, Hydra.",
      table: {
        columns: ["Method", "How it works", "Example"],
        rows: [
          { cells: ["Binary fission", "One cell copies its DNA and splits in two", "Bacteria, Amoeba"] },
          { cells: ["Budding", "An outgrowth grows and breaks off", "Yeast, Hydra"] },
          { cells: ["Fragmentation", "A piece of the body regrows into a whole organism", "Flatworms (planarians), starfish"] },
          { cells: ["Vegetative propagation", "A new plant grows from a stem, root or leaf", "Potato tubers, strawberry runners, onion bulbs"] },
          { cells: ["Parthenogenesis", "An egg develops without being fertilised", "Aphids, male honeybees, some lizards"] },
        ],
        caption: "Sexual reproduction is favoured when the environment changes; asexual reproduction when it is stable.",
      },
      selfCheckExample: {
        prompt: "Which statement about reproduction is correct?",
        options: [
          "In eukaryotes, asexual offspring are made by mitosis and are identical to the parent apart from mutations",
          "Asexual reproduction uses meiosis to make spores",
          "Mutations occur only in organisms that reproduce sexually",
          "Bacteria reproduce asexually by mitosis",
          "An organism can reproduce either sexually or asexually, never both",
        ],
        steps: [
          "Asexual reproduction in eukaryotes relies on mitosis, which gives identical copies; only a mutation can make them differ.",
          "B confuses asexual reproduction with the meiosis that makes plant spores in a sexual life cycle.",
          "C is wrong: mutations are copying errors and happen in all organisms. D is wrong: bacteria have no nucleus and divide by binary fission. E is wrong: aphids and strawberries do both.",
        ],
        answer: "(A) In eukaryotes, asexual offspring are made by mitosis and are identical to the parent apart from mutations",
      },
      practiceSet: [
        { prompt: "How do bacteria reproduce?", answer: "Binary fission" },
        { prompt: "What is development of an unfertilised egg called?", answer: "Parthenogenesis" },
        { prompt: "Give one advantage of asexual reproduction.", answer: "It is fast and needs no mate", method: "Useful in a stable environment" },
        { prompt: "Give one advantage of sexual reproduction.", answer: "It produces variation, so a population can adapt to change" },
      ],
      traps: [
        {
          title: "Variation is not only for sexual reproducers",
          body: "Asexual populations also vary, through mutation, and natural selection acts on them (bacterial antibiotic resistance is the famous case). Sexual reproduction adds much more variation by recombining genes, but it is not the only source.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-cdr-life-cycles",
      name: "Life cycles: where meiosis, mitosis and fertilisation fall",
      intuition:
        "Every sexual life cycle alternates two events: meiosis halves the chromosome number and fertilisation doubles it. Organisms differ in which stage grows into the main body. In animals the body is diploid; in most fungi it is haploid; in plants both stages grow into a body, one after the other.",
      definition:
        "Three patterns of sexual life cycle:\n" +
        "- **Diplontic** (animals): the adult is diploid; meiosis makes gametes directly, so gametes are the only haploid cells.\n" +
        "- **Haplontic** (most fungi, many algae such as Chlamydomonas): the adult is haploid; the zygote is the only diploid cell and undergoes meiosis at once.\n" +
        "- **Alternation of generations** (all land plants): a diploid **sporophyte** makes haploid **spores by meiosis**; a spore grows by mitosis into a haploid **gametophyte**, which makes **gametes by mitosis**.\n" +
        "- In mosses the gametophyte is the main plant; in ferns and flowering plants the sporophyte is.\n" +
        "- Flowering plants have **double fertilisation**: one sperm nucleus joins the egg (zygote, 2n), the other joins two polar nuclei (**endosperm**, 3n).",
      table: {
        columns: ["Life cycle", "Main body", "Meiosis makes", "Example"],
        rows: [
          { cells: ["Diplontic", "Diploid", "Gametes", "Humans and other animals"] },
          { cells: ["Haplontic", "Haploid", "Haploid cells from the zygote", "Most fungi, Chlamydomonas"] },
          { cells: ["Alternation, gametophyte dominant", "Haploid gametophyte", "Spores", "Mosses"] },
          { cells: ["Alternation, sporophyte dominant", "Diploid sporophyte", "Spores", "Ferns, flowering plants"] },
        ],
      },
      selfCheckExample: {
        prompt: "In a flowering plant, how are the male and female gametes produced?",
        options: [
          "By meiosis in the diploid sporophyte",
          "By meiosis in the haploid gametophyte",
          "By mitosis in the diploid sporophyte",
          "By mitosis in the haploid gametophyte",
          "By binary fission of the pollen grain",
        ],
        steps: [
          "In plants, meiosis makes spores, not gametes. The spores grow into the gametophyte (the pollen grain and the embryo sac).",
          "The gametophyte is already haploid, so it makes its gametes by mitosis.",
          "A describes how spores are made; B is impossible because a haploid cell cannot halve its chromosome number again; C would give diploid gametes; E is a prokaryote process.",
        ],
        answer: "(D) By mitosis in the haploid gametophyte",
      },
      practiceSet: [
        { prompt: "In a plant, what does the sporophyte produce by meiosis?", answer: "Haploid spores" },
        { prompt: "In a haplontic life cycle, which is the only diploid stage?", answer: "The zygote" },
        { prompt: "What is the ploidy of endosperm in a flowering plant?", answer: "Triploid (3n)" },
        { prompt: "Which generation is the main plant in a moss?", answer: "The haploid gametophyte" },
      ],
      traps: [
        {
          title: "Gametes are not always made by meiosis",
          body: "In animals, meiosis makes gametes. In plants, meiosis makes spores, and the haploid gametophyte then makes gametes by mitosis. An option saying gametes always come straight from meiosis is wrong for plants.",
        },
      ],
    },
  ],
};
