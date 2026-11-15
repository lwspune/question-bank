import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_AK_CHORDATA_NOTE: SubtopicNote = {
  subtopicName: "Phylum Chordata",
  title: "Phylum Chordata",
  oneLineDefinition:
    "The three features every chordate has, how chordates differ from non-chordates, the three subphyla, and how the vertebrates are divided.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. Three of them (NEET 2022, Re-NEET 2024 and NEET 2025) are the same assertion: all vertebrates are chordates, but not all chordates are vertebrates. The other three compare chordates with non-chordates.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoak-chordate-features",
      name: "Chordates and non-chordates compared",
      intuition:
        "Every chordate, from a sea squirt to a human, has at some stage a stiff rod along its back, a hollow nerve cord above it and slits in the throat. Non-chordates have none of these. Their nerve cord runs along the belly, is solid and is double, and their heart, if they have one, sits on the back. Learn the two columns as mirror images.",
      definition:
        "Chordates are fundamentally characterised by three features:\n" +
        "- a **notochord**\n" +
        "- a **dorsal, hollow nerve cord**\n" +
        "- **paired pharyngeal gill slits**\n\n" +
        "They are also bilaterally symmetrical, **triploblastic, coelomate** and at the organ-system level, with a **post-anal tail** and a **closed circulatory system**.\n\n" +
        "Non-chordates are the animals that do not form a notochord, Porifera to Echinodermata (Hemichordata is also placed under non-chordata). NCERT compares the two groups feature by feature in the table below.",
      table: {
        columns: ["Feature", "Chordates", "Non-chordates"],
        rows: [
          { cells: ["Notochord", "Present", "Absent"] },
          { cells: ["Central nervous system", "Dorsal, hollow and single", "Ventral, solid and double"] },
          {
            cells: ["Pharynx", "Perforated by gill slits", "Gill slits absent"],
          },
          {
            cells: ["Heart", "Ventral", "Dorsal (if present)"],
            noteAmber: "NEET 2024: notochord absent, heart dorsal if present and no post-anal tail were the non-chordate features.",
            pyqExampleId: "d58efc3a-15bf-4eb5-ab63-89e3fc79ee2c",
          },
          { cells: ["Post-anal part (tail)", "Present", "Absent"] },
        ],
      },
      pyqExampleId: "bc9c1cb4-c9a2-4352-a8c7-4a9c95865f5a",
      selfCheckExample: {
        prompt: "An animal has a ventral, solid, double nerve cord and a dorsal heart. Is it a chordate or a non-chordate?",
        steps: [
          "Chordates have a dorsal, hollow, single nerve cord and a ventral heart.",
          "A ventral, solid, double nerve cord and a dorsal heart are the non-chordate pattern.",
        ],
        answer: "A non-chordate.",
      },
      practiceSet: [
        { prompt: "What are the three fundamental features of chordates?", answer: "A notochord, a dorsal hollow nerve cord and paired pharyngeal gill slits" },
        { prompt: "Which part of a chordate's body lies behind the anus?", answer: "The post-anal part, or tail" },
        { prompt: "From which germ layer is the notochord derived?", answer: "The mesoderm" },
        { prompt: "In NCERT's present scheme, is Hemichordata a chordate or a non-chordate phylum?", answer: "A non-chordate phylum" },
      ],
      traps: [
        {
          title: "The chordate nerve cord is single and hollow",
          body: "The chordate nerve cord is **dorsal, hollow and single**. **Ventral, solid and double** is the **non-chordate** nerve cord, so a chordate statement with a solid double cord is false.",
        },
        {
          title: "Gill slits are a chordate feature",
          body: "A chordate's pharynx is **perforated by gill slits**. The **absence** of gill slits is a **non-chordate** feature, never a chordate one.",
        },
        {
          title: "Chordate heart is ventral",
          body: "In chordates the heart is **ventral**. A **dorsal** heart (if a heart is present) is the non-chordate pattern.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoak-subphyla",
      name: "The subphyla of Chordata and the vertebrates",
      intuition:
        "Chordates differ in how long they keep the notochord. A sea squirt has it only in the tail of its larva. A lancelet keeps it from head to tail all its life. A vertebrate has it only as an embryo, then a backbone of cartilage or bone takes its place. That is why every vertebrate is a chordate, but many chordates never grow a backbone.",
      definition:
        "Phylum Chordata has three subphyla:\n" +
        "- **Urochordata (Tunicata):** the notochord is present **only in the larval tail**. Examples: *Ascidia*, *Salpa*, *Doliolum*.\n" +
        "- **Cephalochordata:** the notochord extends **from head to tail** and **persists throughout life**. Example: *Branchiostoma* (*Amphioxus*, the lancelet).\n" +
        "- **Vertebrata:** the notochord is present **during the embryonic period** and is **replaced by a cartilaginous or bony vertebral column in the adult**. **Thus all vertebrates are chordates but all chordates are not vertebrates.**\n\n" +
        "Urochordata and Cephalochordata are together called **protochordates**, and they are exclusively marine.\n\n" +
        "Besides the basic chordate features, vertebrates have a **ventral muscular heart with two, three or four chambers**, **kidneys** for excretion and osmoregulation, and **paired appendages**, fins or limbs.\n\n" +
        "How the vertebrates are divided:\n" +
        "- **Division Agnatha** (no jaws): class **Cyclostomata**.\n" +
        "- **Division Gnathostomata** (jaws): superclass **Pisces** (fins: Chondrichthyes, Osteichthyes) and superclass **Tetrapoda** (limbs: Amphibia, Reptilia, Aves, Mammalia).",
      table: {
        columns: ["Subphylum", "Notochord", "Examples"],
        rows: [
          { cells: ["Urochordata (Tunicata)", "Only in the larval tail", "Ascidia, Salpa, Doliolum"] },
          { cells: ["Cephalochordata", "From head to tail, throughout life", "Branchiostoma (Amphioxus, the lancelet)"] },
          {
            cells: ["Vertebrata", "Only in the embryo; replaced by a cartilaginous or bony vertebral column in the adult", "Cyclostomes, fishes, amphibians, reptiles, birds, mammals"],
            noteAmber: "Re-NEET 2024: a Reason saying all chordates are vertebrates was false; NCERT's line runs the other way round.",
            pyqExampleId: "5a6aa244-c625-49bb-970f-185b0ec88861",
          },
        ],
      },
      pyqExampleId: "084ebd4b-0eb6-4ab1-aea2-950fb5304015",
      selfCheckExample: {
        prompt: "In which chordate subphylum does the notochord run from head to tail and last throughout life, and what is NCERT's example?",
        steps: [
          "Urochordates keep the notochord only in the larval tail; vertebrates lose it after the embryo.",
          "Only in the Cephalochordata does it stay from head to tail for life.",
        ],
        answer: "Cephalochordata; Branchiostoma (Amphioxus).",
      },
      practiceSet: [
        { prompt: "Where is the notochord found in a urochordate?", answer: "Only in the tail of the larva" },
        { prompt: "What are Urochordata and Cephalochordata together called?", answer: "Protochordates" },
        { prompt: "Name the jawless division of vertebrates and its one class.", answer: "Agnatha; Cyclostomata" },
        { prompt: "Name the two superclasses of Gnathostomata.", answer: "Pisces and Tetrapoda" },
        { prompt: "Give NCERT's three examples of urochordates.", answer: "Ascidia, Salpa and Doliolum" },
      ],
      traps: [
        {
          title: "Every vertebrate is a chordate, not the other way round",
          body: "**All vertebrates are chordates, but all chordates are not vertebrates**: urochordates and cephalochordates never form a vertebral column. A statement saying all chordates are vertebrates is false.",
        },
        {
          title: "Vertebrates do have a notochord",
          body: "A vertebrate has a **notochord in the embryo**; it is **replaced** by a cartilaginous or bony **vertebral column** in the adult.",
        },
        {
          title: "Salpa is a urochordate",
          body: "*Salpa*, *Ascidia* and *Doliolum* are **urochordates**; *Branchiostoma* is the **cephalochordate**. Both groups are protochordates and exclusively marine.",
        },
      ],
    },
  ],
};
