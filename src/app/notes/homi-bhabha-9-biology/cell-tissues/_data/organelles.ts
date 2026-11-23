import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CT_ORGANELLES_NOTE: SubtopicNote = {
  subtopicName: "Cell Organelles",
  title: "Cell Organelles",
  oneLineDefinition:
    "A cell is a tiny factory of organelles, each with one main job; a plant cell also has a cell wall, chloroplasts and a large vacuole that an animal cell lacks.",
  whyItMatters:
    "The busiest page of the chapter: nine questions, one EASY and eight MODERATE. Five ask what one organelle does or name the parts of a drawn nucleus or mitochondrion; four ask how a plant cell differs from an animal cell, which tiny organisms have chloroplasts, what the cell wall is made of and why Hooke's cork cells looked empty.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ctor-parts",
      name: "The organelles and the work each one does",
      intuition:
        "Think of a cell as a small factory. The nucleus is the office that gives orders. Mitochondria are the power station. The endoplasmic reticulum is the network of roads, the Golgi complex is the packing department, lysosomes are the cleaners, and vacuoles are the store rooms.",
      definition:
        "- **Nucleus**: controls all the work of the cell and **cell division**. It has a **double membrane with pores** and a **nucleolus** inside. Its thread-like **chromatin** coils up to form **chromosomes** when the cell divides.\n" +
        "- **Mitochondria**: release **energy** from food, so they are called the **powerhouse** of the cell. Each has a smooth **outer membrane**, an **inner membrane** folded into **cristae**, and a fluid **matrix** inside.\n" +
        "- **Endoplasmic reticulum (ER)**: a network of tubes that **carries substances** inside the cell. Rough ER carries ribosomes, which make proteins. Smooth ER, especially in **liver cells**, makes poisons and drugs **water soluble** so they can be flushed out (**detoxification**).\n" +
        "- **Golgi complex**: packs and sends out substances, and forms **vacuoles**, secretory vesicles and lysosomes.\n" +
        "- **Lysosomes**: bags of **digestive enzymes**. They destroy germs and worn-out parts (the cell's **defence** or immune system), and they digest the tadpole's tail during **metamorphosis**.\n" +
        "- **Vacuoles**: store water, food and wastes, and keep the cell's **osmotic pressure** (its firmness).",
      table: {
        columns: ["Organelle", "Main work", "Nickname or clue"],
        rows: [
          { cells: ["Nucleus", "Controls the cell and cell division; chromatin forms chromosomes", "Control centre"] },
          { cells: ["Mitochondria", "Release energy from food", "Powerhouse; inner membrane folded into cristae"] },
          { cells: ["Endoplasmic reticulum", "Carries substances; smooth ER detoxifies poisons and drugs", "Network of tubes"] },
          { cells: ["Ribosomes", "Make proteins", "Tiny grains on the rough ER"] },
          { cells: ["Golgi complex", "Packs and sends out substances; forms vacuoles and lysosomes", "Packing department"] },
          {
            cells: ["Lysosomes", "Digest germs and worn-out parts", "Suicide bags; the cell's immune system"],
            noteAmber: "Lysosomes do not supply energy: that is the job of mitochondria.",
          },
          { cells: ["Vacuoles", "Store water, food and wastes; keep the osmotic pressure", "Store rooms"] },
        ],
        caption: "A match-the-pairs question pairs these names with these jobs in a shuffled order.",
      },
      selfCheckExample: {
        prompt: "A drawing shows an organelle with a smooth outer covering and an inner membrane folded into finger-like ridges. Name the organelle and its main work.",
        steps: [
          "An inner membrane folded into ridges (cristae) belongs to a mitochondrion.",
          "Mitochondria release energy from food.",
        ],
        answer: "A mitochondrion, which releases energy for the cell",
      },
      practiceSet: [
        { prompt: "Which organelle holds digestive enzymes and destroys germs that enter the cell?", answer: "The lysosome" },
        { prompt: "What are the folds of the inner membrane of a mitochondrion called?", answer: "Cristae" },
        { prompt: "Which organelle in liver cells makes harmful drugs water soluble so that they can leave the body?", answer: "The smooth endoplasmic reticulum" },
        { prompt: "What forms chromosomes when a cell is about to divide?", answer: "The chromatin inside the nucleus" },
      ],
      pyqExampleId: "df93f45b-676e-4091-8d09-df7d403d1855",
      traps: [
        {
          title: "Giving lysosomes the job of supplying energy",
          body: "Energy comes from mitochondria. Lysosomes only digest: germs, worn-out parts, and whole tissues such as a tadpole's tail.",
        },
        {
          title: "Swapping the two membranes of a mitochondrion",
          body: "The outer membrane is smooth and forms the outside. The inner membrane lies just inside it and is the one folded into cristae.",
        },
        {
          title: "Giving detoxification to the Golgi complex",
          body: "Making poisons and drugs water soluble is the work of the smooth endoplasmic reticulum, mostly in liver cells. The Golgi complex packs and sends out substances.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ctor-plantanimal",
      name: "Plant cell, animal cell and the cell wall",
      intuition:
        "A plant cannot walk to its food or hide from the sun, so its cells carry extra kit: a stiff wall to hold the plant up, chloroplasts to make food from sunlight, and a big water tank (the vacuole) to keep it firm. An animal cell has none of these, but it is rich in lysosomes.",
      definition:
        "- **Only in plant cells**: a **cell wall**, **chloroplasts** (green plastids that make food) and a **large central vacuole**.\n" +
        "- **Mainly in animal cells**: **lysosomes** (rare in plant cells) and a **centrosome**. Their vacuoles are small or absent.\n" +
        "- **In both**: nucleus, cell membrane, mitochondria, ER, Golgi complex, ribosomes and vacuoles (large in plants, small in animals).\n" +
        "- **The cell wall** is always made of **cellulose and pectin**. Other polymers are added only where the plant needs them: **lignin** for hardness (wood), **suberin** to make cork waterproof, **cutin** in the cuticle that stops water loss from leaves.\n" +
        "- **Robert Hooke** (1665) looked at a thin slice of **cork** and named the little boxes **cells**. Cork cells are packed close together, their walls are thickened with **suberin**, and their living contents have died, so they looked **empty**.\n" +
        "- Some one-celled organisms have chloroplasts and make their own food: **Euglena**, **Volvox**, **Chlamydomonas**. **Amoeba** and **Paramecium** have none.",
      table: {
        columns: ["Part", "Plant cell", "Animal cell"],
        rows: [
          { cells: ["Cell wall", "Present: cellulose and pectin", "Absent"] },
          { cells: ["Chloroplasts", "Present in green parts", "Absent"] },
          { cells: ["Vacuole", "One large central vacuole", "Small or none"] },
          { cells: ["Lysosomes", "Rare", "Common"] },
          { cells: ["Centrosome", "Absent in most plant cells", "Present"] },
          { cells: ["Nucleus, mitochondria, Golgi, ER", "Present", "Present"] },
        ],
        caption: "In a Venn diagram of the two cells, chloroplasts sit in the plant-only part, lysosomes in the animal-only part and vacuoles in the overlap.",
      },
      selfCheckExample: {
        prompt: "Of Amoeba, Chlamydomonas and Paramecium, which one can make its own food, and which organelle lets it do so?",
        steps: [
          "Amoeba and Paramecium take in ready-made food and have no chloroplasts.",
          "Chlamydomonas is a green one-celled alga with a chloroplast.",
        ],
        answer: "Chlamydomonas, because it has a chloroplast",
      },
      practiceSet: [
        { prompt: "Name the two substances that make up the wall of every plant cell.", answer: "Cellulose and pectin" },
        { prompt: "Which substance in the cell walls of cork makes them waterproof?", answer: "Suberin" },
        { prompt: "Name two cell parts found in a plant cell but not in an animal cell.", answer: "Any two of: the cell wall, chloroplasts, a large central vacuole" },
        { prompt: "What did Robert Hooke look at when he first named cells?", answer: "A thin slice of cork" },
      ],
      pyqExampleId: "fb5e1238-fe3c-4c65-bd04-d7a6db662682",
      traps: [
        {
          title: "Thinking every cell wall has lignin or cutin",
          body: "Every plant cell wall has cellulose and pectin. Lignin, suberin and cutin are added only where they are needed, such as in wood, cork and the leaf cuticle.",
        },
        {
          title: "Thinking Hooke saw living cells",
          body: "Hooke's cork cells were dead. Only their thick, suberin-lined walls were left, which is why they looked like empty boxes.",
        },
        {
          title: "Putting vacuoles only in plant cells",
          body: "Animal cells have vacuoles too, but small ones. What a plant cell has is one large central vacuole.",
        },
        {
          title: "Giving Paramecium chloroplasts",
          body: "Paramecium and Amoeba take in ready-made food and have no chloroplasts. Euglena and Volvox are the green ones.",
        },
      ],
    },
  ],
};
