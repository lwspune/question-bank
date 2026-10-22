import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_BD_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Classification, Plants and Fungi",
  title: "Classification, Plants and Fungi",
  oneLineDefinition:
    "The ranks from kingdom down to species, the five kingdoms of living things, the main groups of plants from algae to flowering plants, and how fungi grow and feed.",
  whyItMatters:
    "Ten CDS questions from 2019 (I) to 2026 (II). Six are about fungi: three ask about feeding on dead matter (saprophytes), two are about yeast, and one asks what hyphae are. Two ask about the ranks of classification and two about the plant groups.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbibd-ranks",
      name: "The ranks of classification",
      intuition:
        "Classification puts living things into boxes inside boxes. The biggest box, the kingdom, holds a huge variety of organisms that share only a few features. Each smaller box holds fewer organisms that share more. The smallest box, the species, holds organisms so alike that they can breed with each other.",
      definition:
        "The taxonomic ranks, from the broadest to the narrowest:\n" +
        "- **Kingdom → Phylum → Class → Order → Family → Genus → Species**.\n" +
        "- For plants, **Division** is used in place of Phylum.\n" +
        "- **Species** is the basic unit: a group of individuals with fundamental similarities that can interbreed (all rose plants of one kind, all human beings).\n" +
        "- A **genus** is a group of related species; a **family** is a group of related genera.\n" +
        "- **Binomial nomenclature** (Carolus **Linnaeus**): every organism gets a two-word name, the **genus** first with a capital letter, then the **species** word in small letters, both in italics, for example *Homo sapiens* and *Mangifera indica* (mango).",
      table: {
        columns: ["Rank", "Human being", "Mango"],
        rows: [
          { cells: ["Kingdom", "Animalia", "Plantae"] },
          { cells: ["Phylum or Division", "Chordata", "Angiospermae"] },
          { cells: ["Class", "Mammalia", "Dicotyledonae"] },
          { cells: ["Order", "Primata", "Sapindales"] },
          { cells: ["Family", "Hominidae", "Anacardiaceae"] },
          { cells: ["Genus", "Homo", "Mangifera"] },
          {
            cells: ["Species", "sapiens", "indica"],
            noteAmber: "CDS 2020 (II): all the individuals of one kind, such as rose plants, form a species.",
            pyqExampleId: "b5620112-9a25-4aae-b7e5-678d061708d6",
          },
        ],
      },
      pyqExampleId: "941ffa2e-75ba-44d7-8240-b2bfa6f27e2a",
      selfCheckExample: {
        prompt: "The scientific name of the tiger is Panthera tigris. Which word names the genus and which names the species, and how should the name be written?",
        steps: [
          "In binomial nomenclature the first word is always the genus and the second is the species.",
          "The genus begins with a capital letter and the species word with a small letter.",
          "Both words are printed in italics (or underlined when written by hand).",
        ],
        answer: "Panthera is the genus and tigris the species; written in italics, with only Panthera capitalised.",
      },
      practiceSet: [
        { prompt: "Who introduced the two-word system of naming organisms?", answer: "Carolus Linnaeus" },
        { prompt: "Which rank is used for plants in place of phylum?", answer: "Division" },
        { prompt: "Which rank is a group of related genera?", answer: "Family" },
        { prompt: "In a scientific name, which of the two words begins with a capital letter?", answer: "The genus (the first word)" },
      ],
      traps: [
        {
          title: "Order comes before Family",
          body: "Wrong schemes in the options swap Order and Family, or Genus and Species. The right order is **Class, Order, Family, Genus, Species**: order is the wider group and species the narrowest.",
        },
        {
          title: "Species is the basic unit, not genus",
          body: "All individuals of one kind, such as all rose plants, form a **species**. A genus is a bigger group that holds several related species.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibd-kingdoms",
      name: "The five kingdoms",
      intuition:
        "R. H. Whittaker sorted all living things into five kingdoms by asking three questions. Does the cell have a proper nucleus? Is the body one cell or many? Does it make its own food, or take it from outside? Bacteria have no nucleus, so they stand alone. Single-celled organisms with a nucleus form another kingdom. Fungi, plants and animals are the three kingdoms left.",
      definition:
        "Whittaker's five kingdoms (1969):\n" +
        "- **Monera**: prokaryotes (no true nucleus), single-celled, for example bacteria and blue-green algae.\n" +
        "- **Protista**: all **single-celled eukaryotes**, for example Amoeba, Paramecium and Euglena.\n" +
        "- **Fungi**: a unique kingdom of **heterotrophs**; cell wall of **chitin**; most are made of thin threads called **hyphae**. **Yeast** is the exception: it is **unicellular** and reproduces by **budding**.\n" +
        "- **Plantae**: many-celled, make their own food by photosynthesis, cell wall of **cellulose**.\n" +
        "- **Animalia**: many-celled, heterotrophic, **no cell wall**.\n" +
        "- Among the fungi, the **Ascomycetes** (sac fungi) are mostly many-celled, for example Penicillium, and rarely single-celled, for example yeast.",
      table: {
        columns: ["Kingdom", "Cell and body", "Nutrition", "Examples"],
        rows: [
          { cells: ["Monera", "Prokaryotic, single-celled", "Varied", "Bacteria, blue-green algae"] },
          { cells: ["Protista", "Eukaryotic, single-celled", "Varied", "Amoeba, Paramecium, Euglena"] },
          {
            cells: ["Fungi", "Eukaryotic, mostly threads of hyphae; yeast is single-celled", "Heterotrophic, mostly saprophytic", "Yeast, mushroom, bread mould"],
            noteAmber: "CDS 2022 (I): the yeast used to make bread is a fungus, not a protist or a moneran.",
            pyqExampleId: "79b596f9-c02e-487a-b44f-c9b3492f46e7",
          },
          { cells: ["Plantae", "Eukaryotic, many-celled, cellulose wall", "Autotrophic", "Mosses, ferns, flowering plants"] },
          { cells: ["Animalia", "Eukaryotic, many-celled, no cell wall", "Heterotrophic", "Sponges, insects, human beings"] },
        ],
      },
      pyqExampleId: "08f5798f-d06c-46c1-a6a1-1cc64136e152",
      selfCheckExample: {
        prompt: "A single-celled organism has no nuclear membrane around its genetic material. In which of the five kingdoms does it belong, and why not in Protista?",
        steps: [
          "No nuclear membrane means no true nucleus, so the cell is prokaryotic.",
          "Protista holds only single-celled organisms that DO have a nucleus (eukaryotes).",
          "Prokaryotes are placed in Monera.",
        ],
        answer: "Monera, because it is a prokaryote; Protista is only for single-celled eukaryotes.",
      },
      practiceSet: [
        { prompt: "Who proposed the five-kingdom classification?", answer: "R. H. Whittaker (1969)" },
        { prompt: "What is the cell wall of a fungus made of?", answer: "Chitin" },
        { prompt: "In which kingdom are bacteria placed?", answer: "Monera" },
        { prompt: "Which kingdom has many-celled organisms with no cell wall?", answer: "Animalia" },
      ],
      traps: [
        {
          title: "Yeast is a single-celled fungus",
          body: "Yeast is a **fungus**, not a protist and not a bacterium. It is also **unicellular**: a statement that calls yeast multicellular is the false one. Most other fungi are made of hyphae.",
        },
        {
          title: "Protozoa is not one of the five kingdoms",
          body: "Amoeba and Paramecium are often called protozoa, but the kingdom is **Protista**. An option offering Protozoa as a kingdom for yeast is a distractor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibd-plants",
      name: "The plant groups",
      intuition:
        "Plants are sorted by three questions. Is the body divided into root, stem and leaf? Does it have tubes (vascular tissue) to carry water? Does it make seeds, and are the seeds inside a fruit? The answers run from the simplest plants, the algae in water, to the flowering plants that cover the land.",
      definition:
        "The plant groups, simplest first (NCERT Class 9):\n" +
        "- **Thallophyta (algae)**: body not divided into root, stem and leaf; **predominantly aquatic**; for example Spirogyra, Ulothrix, Cladophora, Chara.\n" +
        "- **Bryophyta**: simple plant body, no vascular tissue; the **amphibians of the plant kingdom**; for example Riccia, Marchantia, Funaria (moss).\n" +
        "- **Pteridophyta**: true root, stem and leaves with **vascular tissue**, but **no seeds** (they reproduce by spores); for example **Marsilea, ferns and horse-tails**.\n" +
        "- **Gymnosperms**: seeds are **naked** (not inside a fruit); for example Pinus, Cycas.\n" +
        "- **Angiosperms**: seeds **inside a fruit**; the flowering plants, split into monocots and dicots.\n" +
        "- Thallophytes, bryophytes and pteridophytes have hidden reproductive organs and are called **cryptogams**; gymnosperms and angiosperms bear seeds and are **phanerogams**.",
      table: {
        columns: ["Group", "Key feature", "Examples"],
        rows: [
          {
            cells: ["Algae (Thallophyta)", "No root, stem or leaf; mostly in water", "Spirogyra, Ulothrix, Chara"],
            noteAmber: "CDS 2020 (II): in Kingdom Plantae, the predominantly aquatic group is the algae.",
            pyqExampleId: "5543de30-6bdb-4783-a9e7-cfe5da9881be",
          },
          { cells: ["Bryophyta", "No vascular tissue; need water to reproduce", "Riccia, Marchantia, Funaria"] },
          {
            cells: ["Pteridophyta", "Vascular tissue but no seeds", "Marsilea, ferns, horse-tails"],
            noteAmber: "CDS 2019 (II): Marsilea, fern and horse-tail are pteridophytes.",
            pyqExampleId: "3a82002d-8aef-48dd-8ae5-68936651a1a6",
          },
          { cells: ["Gymnosperms", "Naked seeds", "Pinus, Cycas"] },
          { cells: ["Angiosperms", "Seeds enclosed in a fruit; flowers", "Mango, wheat, rose"] },
        ],
      },
      pyqExampleId: "3a82002d-8aef-48dd-8ae5-68936651a1a6",
      selfCheckExample: {
        prompt: "Place each plant in its group: Spirogyra, Funaria, Pinus and wheat.",
        steps: [
          "Spirogyra is a green alga with no root, stem or leaf, so it is a thallophyte.",
          "Funaria is a moss with no vascular tissue, so it is a bryophyte.",
          "Pinus bears naked seeds in cones, so it is a gymnosperm.",
          "Wheat flowers and its seed is inside a fruit (the grain), so it is an angiosperm.",
        ],
        answer: "Spirogyra: alga. Funaria: bryophyte. Pinus: gymnosperm. Wheat: angiosperm.",
      },
      practiceSet: [
        { prompt: "Which plant group is called the amphibians of the plant kingdom?", answer: "Bryophyta" },
        { prompt: "Which group of plants bears seeds that are not enclosed in a fruit?", answer: "Gymnosperms" },
        { prompt: "In which plant group is the body not divided into root, stem and leaf?", answer: "Thallophyta (algae)" },
        { prompt: "Name a gymnosperm.", answer: "Pinus (or Cycas)" },
      ],
      traps: [
        {
          title: "Vascular tissue does not mean seeds",
          body: "Pteridophytes have true roots, stems, leaves and **vascular tissue**, but they make **no seeds**. Seeds begin with the gymnosperms.",
        },
        {
          title: "Bryophytes live on land, algae in water",
          body: "Bryophytes grow on damp land and need water only to reproduce. The plants that are **predominantly aquatic** are the **algae**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibd-fungi",
      name: "How fungi grow and feed",
      intuition:
        "A fungus has no chlorophyll, so it cannot make food. Instead it grows thin threads into its food, pours digestive enzymes out onto it, and soaks up what dissolves. When the food is dead matter, such as bread, dung or fallen leaves, the fungus is a saprophyte. Plants and algae with chlorophyll make their own food, and a parasite feeds on a living host.",
      definition:
        "The body and food of fungi:\n" +
        "- **Hyphae**: thin, thread-like filaments; a network of hyphae is a **mycelium**, the body of most fungi.\n" +
        "- **Saprophytic nutrition**: food is **broken down outside the body** by secreted enzymes and the products are absorbed. Yeast, mushrooms (**Agaricus**) and bread mould (**Rhizopus**) feed this way.\n" +
        "- **Parasitic nutrition**: feeding on a living host, for example **Cuscuta** (amarbel, a plant without chlorophyll), tapeworm, lice.\n" +
        "- **Autotrophic nutrition**: making food by photosynthesis, for example algae (Spirogyra, Ulothrix, Cladophora), liverworts (Riccia) and grass.\n" +
        "- Animals such as Amoeba and Paramecium **take food inside** and digest it there (holozoic nutrition).",
      table: {
        columns: ["Organism", "Group", "Mode of nutrition"],
        rows: [
          {
            cells: ["Agaricus (mushroom)", "Fungus", "Saprophytic"],
            noteAmber: "CDS 2019 (I): Agaricus is the saprophyte; Ulothrix, Riccia and Cladophora make their own food.",
            pyqExampleId: "c2a95afd-edbb-40c1-aa5b-a4162e470d13",
          },
          {
            cells: ["Rhizopus (bread mould)", "Fungus", "Saprophytic"],
            noteAmber: "CDS 2023 (II): the saprophyte among Cuscuta, Rhizopus, Spirogyra and grass is Rhizopus.",
            pyqExampleId: "39426f16-bb26-441e-acc2-d53964958586",
          },
          {
            cells: ["Yeast", "Fungus", "Saprophytic"],
            noteAmber: "CDS 2021 (II): yeast, mushroom and bread mould break food down outside the body and absorb it.",
            pyqExampleId: "73be4adb-e8d2-46d1-82f0-818aad6c4a9e",
          },
          { cells: ["Cuscuta", "Flowering plant", "Parasitic"] },
          { cells: ["Spirogyra", "Alga", "Autotrophic"] },
          { cells: ["Amoeba", "Protist", "Holozoic (takes food in)"] },
        ],
      },
      pyqExampleId: "cfbf5de5-9266-4062-a935-673200eb03fb",
      selfCheckExample: {
        prompt: "A slice of bread kept in a damp box grows a black, cotton-like mould in a few days. Explain how the mould gets its food.",
        steps: [
          "The mould is a fungus with no chlorophyll, so it cannot make its own food.",
          "Its hyphae grow into the bread and give out digestive enzymes.",
          "The enzymes break the starch down outside the mould, and the hyphae absorb the dissolved sugars.",
        ],
        answer: "It is a saprophyte: it digests the bread outside its body and absorbs the products through its hyphae.",
      },
      practiceSet: [
        { prompt: "What is a network of fungal hyphae called?", answer: "A mycelium" },
        { prompt: "What is the mode of nutrition of an organism that feeds on dead and decaying matter?", answer: "Saprophytic" },
        { prompt: "Cuscuta has no chlorophyll and takes food from a living plant. What is its mode of nutrition?", answer: "Parasitic" },
        { prompt: "Does Spirogyra make its own food?", answer: "Yes: it is an alga with chlorophyll" },
      ],
      traps: [
        {
          title: "A plant without chlorophyll is not a saprophyte by default",
          body: "**Cuscuta** has no chlorophyll, but it feeds on a **living** host plant, so it is a **parasite**. A saprophyte feeds on **dead** matter, like Rhizopus on bread.",
        },
        {
          title: "Hyphae are threads, not spores",
          body: "**Hyphae** are the thin threads that make up a fungus's body. They are not reproductive cells, and a mass of them together is the mycelium.",
        },
      ],
    },
  ],
};
