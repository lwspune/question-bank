import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MC_KINDS_NOTE: SubtopicNote = {
  subtopicName: "Kinds of Microbes and Fungi",
  title: "Kinds of Microbes and Fungi",
  oneLineDefinition:
    "Microbes fall into bacteria (kingdom Monera), protozoa, algae, fungi and viruses; fungi grow as threads called hyphae and spread by spores floating in the air.",
  whyItMatters:
    "Six questions in the bank, all MODERATE. Four ask you to put a microbe in its group: which organisms are Monera, which group diatoms belong to, which pairs of microbe and group are right, and what bacteria and protists share. Two are on fungi: picking Aspergillus and Rhizopus from drawings, and what fungi do.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mcki-groups",
      name: "The groups of microbes and their members",
      intuition:
        "Microbes are living things too small to see without a microscope. Sort them by their cells: bacteria are the simplest, with no true nucleus; protozoa and algae are single cells with a proper nucleus, the algae green and making their own food; fungi feed on dead matter; and viruses are not even cells, they come alive only inside another cell.",
      definition:
        "- **Bacteria** (kingdom **Monera**): one cell with **no nuclear membrane** and no mitochondria, but with **DNA** and **ribosomes**. Shapes: round (cocci), rod (bacilli), spiral and comma-shaped. Examples: Rhizobium, Lactobacillus, Salmonella typhi, Treponema pallidum, Legionella, Clostridium.\n" +
        "- **Protozoa** (kingdom **Protista**): one cell with a true nucleus. Examples: **Amoeba**, **Paramecium**, **Plasmodium**, Euglena.\n" +
        "- **Algae**: green, make their own food. Examples: **Chlamydomonas**, **Volvox** (often grouped under Protista), **diatoms**, Spirogyra.\n" +
        "- **Fungi**: cannot make food; live on dead matter. Examples: **yeast**, **Penicillium**, **Aspergillus**, **Rhizopus**, mushroom.\n" +
        "- **Viruses**: **not cells**; just genetic material in a protein coat. They multiply only inside a living cell. Examples: **bacteriophage** (attacks bacteria), HIV, influenza virus.\n" +
        "- Every cell, of a bacterium or a protist, has **ribosomes**, because every cell must make proteins.",
      table: {
        columns: ["Group", "Cell", "Examples"],
        rows: [
          { cells: ["Bacteria (Monera)", "One cell, no true nucleus", "Rhizobium, Lactobacillus, Salmonella, Treponema, Clostridium"] },
          { cells: ["Protozoa (Protista)", "One cell with a nucleus", "Amoeba, Paramecium, Plasmodium"] },
          { cells: ["Algae", "Cells with chloroplasts", "Chlamydomonas, Volvox, diatoms, Spirogyra"] },
          { cells: ["Fungi", "Threads (hyphae) or single cells (yeast)", "Yeast, Penicillium, Aspergillus, Rhizopus"] },
          { cells: ["Viruses", "Not a cell", "Bacteriophage, HIV, influenza virus"] },
        ],
        caption: "Penicillium is a fungus and Plasmodium a protozoan: neither belongs to Monera.",
      },
      selfCheckExample: {
        prompt: "Sort into bacteria and protozoa: Amoeba, Lactobacillus, Paramecium, Rhizobium.",
        steps: ["Lactobacillus and Rhizobium have no true nucleus: bacteria.", "Amoeba and Paramecium are one-celled with a nucleus: protozoa."],
        answer: "Bacteria: Lactobacillus, Rhizobium. Protozoa: Amoeba, Paramecium.",
      },
      practiceSet: [
        { prompt: "To which kingdom do bacteria belong?", answer: "Monera" },
        { prompt: "What is a bacteriophage?", answer: "A virus that infects bacteria" },
        { prompt: "To which group of microbes does Chlamydomonas belong?", answer: "Algae" },
        { prompt: "Which part, needed to make proteins, is present in the cells of both bacteria and protozoa?", answer: "Ribosomes" },
      ],
      pyqExampleId: "f0c0dfda-d000-48ac-8de9-51f08f9ded76",
      traps: [
        {
          title: "Thinking bacteria have no DNA",
          body: "Bacteria have DNA. What they lack is a nuclear membrane around it.",
        },
        {
          title: "Calling diatoms protozoa",
          body: "Diatoms make their own food with chloroplasts, so they are algae. Protozoa such as Amoeba take in ready-made food.",
        },
        {
          title: "Putting Penicillium among the bacteria",
          body: "Penicillium is a fungus that grows as threads. The bacteria are the Monera, such as Salmonella and Rhizobium.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mcki-fungi",
      name: "Fungi: hyphae, spores and the common moulds",
      intuition:
        "Leave bread in a damp place and a fuzzy mould appears. That fuzz is a fungus: a mat of fine threads that has grown into the bread to feed on it. Its tiny spores were already floating in the air, waiting for a damp meal. Each mould carries its spores in its own way, and that is how you tell them apart in a drawing.",
      definition:
        "- A fungus body is made of thin threads called **hyphae**; a mass of hyphae is a **mycelium**. Yeast is the exception: a single cell.\n" +
        "- Fungi **cannot make their own food**. Their hyphae grow **deep into** bread, fruit, leather or **wood** to feed, which is how they spoil them.\n" +
        "- They spread mainly by **spores**, which are so light that they are always present in the **air**.\n" +
        "- Fungi grow best in **warm, damp** places.",
      table: {
        columns: ["Fungus", "What it looks like", "Known for"],
        rows: [
          { cells: ["Rhizopus (bread mould)", "Round black spore cases (sporangia) on upright stalks, with root-like rhizoids below", "Growing on stale bread"] },
          { cells: ["Aspergillus", "A swollen round head with chains of spores all around it", "Mould on food grains and fruit"] },
          { cells: ["Penicillium", "A stalk ending in brush-like branches with chains of spores", "The antibiotic penicillin"] },
          { cells: ["Mushroom", "An umbrella-shaped cap on a stalk", "Some kinds are eaten"] },
          { cells: ["Yeast", "Single oval cells that bud", "Bread and alcohol"] },
        ],
        caption: "Swollen head with spores all round: Aspergillus. Brush: Penicillium. Round ball on a stalk: Rhizopus.",
      },
      selfCheckExample: {
        prompt: "A drawing shows a mould whose upright stalk ends in a brush of branches, each carrying a chain of spores. Name the fungus.",
        steps: ["Brush-like branches with spore chains are the mark of Penicillium."],
        answer: "Penicillium",
      },
      practiceSet: [
        { prompt: "What are the thin threads that make up the body of a fungus called?", answer: "Hyphae" },
        { prompt: "How do fungi spread from one piece of bread to another?", answer: "By tiny spores carried in the air" },
        { prompt: "Which fungus is commonly called bread mould?", answer: "Rhizopus" },
        { prompt: "Why does a wooden door left damp for a long time start to rot?", answer: "Fungi grow their hyphae into the damp wood and feed on it" },
      ],
      pyqExampleId: "ba61856b-2206-4bd0-802c-57b47acd8b52",
      traps: [
        {
          title: "Mixing up Aspergillus and Penicillium",
          body: "Aspergillus has a swollen round head with spores all round it. Penicillium has a brush of branches at the top of its stalk.",
        },
        {
          title: "Thinking fungi make their own food",
          body: "Fungi have no chlorophyll. They feed on dead or living matter by growing their hyphae into it.",
        },
      ],
    },
  ],
};
