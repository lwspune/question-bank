import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PK_PTERIDOPHYTES_NOTE: SubtopicNote = {
  subtopicName: "Pteridophytes",
  title: "Pteridophytes",
  oneLineDefinition:
    "The first land plants with xylem and phloem: their sporophyte body, the four classes with an example of each, the life cycle through the prothallus, and heterospory as the first step towards seeds.",
  whyItMatters:
    "Five NEET questions, one each in NEET 2021, NEET 2023, Re-NEET 2024, NEET 2025 and Re-NEET 2026. Heterospory was asked twice (2021 and 2023), and the four classes twice (Re-NEET 2024 and Re-NEET 2026). NEET 2025 asked for the order of stages in the life cycle.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopk-ptero-features",
      name: "The pteridophyte body and its four classes",
      intuition:
        "Pteridophytes are the horsetails and ferns. They are the first land plants with vascular tissue, xylem and phloem, so the plant you see has a true root, stem and leaves. Unlike in bryophytes, this main plant is the diploid sporophyte. NCERT sorts pteridophytes into four classes, and NEET asks you to match each class with its genus.",
      definition:
        "Pteridophytes, as NCERT describes them:\n" +
        "- Include **horsetails and ferns**. Used for **medicine**, as **soil-binders**, and often grown as **ornamentals**.\n" +
        "- Evolutionarily the **first terrestrial plants to possess vascular tissues**, xylem and phloem.\n" +
        "- Found in **cool, damp, shady** places, though some may flourish in **sandy-soil** conditions.\n" +
        "- The main plant body is a **sporophyte**, differentiated into **true root, stem and leaves**, with well-differentiated vascular tissue.\n" +
        "- Leaves are small (**microphylls**) as in *Selaginella*, or large (**macrophylls**) as in ferns.\n" +
        "- Sporangia are borne on leaf-like **sporophylls**. In some, such as *Selaginella* and *Equisetum*, sporophylls form compact **strobili** or cones.\n" +
        "- Four classes: **Psilopsida**, **Lycopsida**, **Sphenopsida** and **Pteropsida** (see the table).",
      table: {
        columns: ["Class", "NCERT example"],
        rows: [
          { cells: ["Psilopsida", "*Psilotum*"] },
          { cells: ["Lycopsida", "*Selaginella*, *Lycopodium*"] },
          {
            cells: ["Sphenopsida", "*Equisetum*"],
            noteAmber: "Re-NEET 2026: Sphenopsida is a class of pteridophytes.",
            pyqExampleId: "bbf67854-4c1a-4086-b132-d6df94e98959",
          },
          { cells: ["Pteropsida", "*Dryopteris*, *Pteris*, *Adiantum*"] },
        ],
      },
      pyqExampleId: "3993b52f-7338-4f62-a11d-922926306225",
      selfCheckExample: {
        prompt: "*Selaginella* has small leaves and a fern has large ones. What does NCERT call each kind of leaf?",
        steps: [
          "Small leaves, as in *Selaginella*, are microphylls.",
          "Large leaves, as in ferns, are macrophylls.",
        ],
        answer: "*Selaginella* has microphylls; ferns have macrophylls.",
      },
      practiceSet: [
        { prompt: "Which were the first terrestrial plants to possess xylem and phloem?", answer: "Pteridophytes" },
        { prompt: "To which class of pteridophytes does *Psilotum* belong?", answer: "Psilopsida" },
        { prompt: "Name the two NCERT genera in the class Lycopsida.", answer: "*Selaginella* and *Lycopodium*" },
        { prompt: "What are the leaf-like structures that bear sporangia in pteridophytes called?", answer: "Sporophylls" },
        { prompt: "Name two pteridophytes in which the sporophylls form compact strobili.", answer: "*Selaginella* and *Equisetum*" },
        { prompt: "Give two uses of pteridophytes that NCERT names.", answer: "Any two of: medicine, soil-binders, ornamentals" },
      ],
      traps: [
        {
          title: "Pteridophytes have true roots, stems and leaves",
          body: "The pteridophyte sporophyte has a **true** root, stem and leaves with vascular tissue. Only bryophytes are limited to root-like, stem-like and leaf-like parts.",
        },
        {
          title: "Equisetum and Selaginella are in different classes",
          body: "*Equisetum* is the **Sphenopsida** example and *Selaginella* is in **Lycopsida**, even though both bear strobili.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-ptero-cycle",
      name: "The pteridophyte life cycle",
      intuition:
        "The big fern plant is the sporophyte. It makes spores by meiosis. A spore grows into a tiny, flat, green plant on the ground: the prothallus, which is the gametophyte. The prothallus bears the sex organs. Water carries the male gametes to the archegonium, fertilisation makes a zygote, and the zygote grows into a new sporophyte.",
      definition:
        "The cycle in NCERT order:\n" +
        "- In the sporangia, **spore mother cells** undergo **meiosis** to make spores.\n" +
        "- Spores grow into **inconspicuous, small but multicellular, free-living**, mostly **photosynthetic, thalloid** gametophytes called **prothallus**.\n" +
        "- The gametophyte needs **cool, damp, shady** places. Because it needs water for fertilisation, pteridophytes spread only over **narrow geographical regions**.\n" +
        "- The gametophyte bears **antheridia** and **archegonia**.\n" +
        "- **Water** carries the **antherozoids** released from the antheridia to the **mouth of the archegonium**.\n" +
        "- An antherozoid fuses with the egg to form the **zygote**, which grows into a multicellular, well-differentiated **sporophyte**, the dominant phase.",
      table: {
        columns: ["Stage", "What happens"],
        rows: [
          { cells: ["1. Meiosis", "Spore mother cells in the sporangia divide to make spores"] },
          { cells: ["2. Prothallus", "Spores grow into small, free-living, mostly photosynthetic gametophytes"] },
          { cells: ["3. Sex organs", "Antheridia and archegonia form on the prothallus"] },
          { cells: ["4. Transfer", "Water carries antherozoids to the mouth of the archegonium"] },
          { cells: ["5. Fertilisation", "Antherozoid and egg fuse to form the zygote"] },
          { cells: ["6. Sporophyte", "The zygote grows into the dominant sporophyte"] },
        ],
      },
      pyqExampleId: "d6acd143-e348-4dc0-99b5-595b6a69bc8b",
      selfCheckExample: {
        prompt: "Why do pteridophytes grow only over narrow geographical regions?",
        steps: [
          "Their gametophytes need cool, damp, shady places.",
          "They also need water to carry the male gametes for fertilisation.",
        ],
        answer: "Because the gametophyte needs cool, damp, shady places and water for fertilisation, which limits where they can spread.",
      },
      practiceSet: [
        { prompt: "What is the gametophyte of a pteridophyte called?", answer: "Prothallus" },
        { prompt: "Is the prothallus of a pteridophyte free-living or dependent on the sporophyte?", answer: "Free-living (and mostly photosynthetic)" },
        { prompt: "Which cells in the sporangia of a pteridophyte undergo meiosis?", answer: "Spore mother cells" },
        { prompt: "Which is the dominant phase in the life cycle of a pteridophyte?", answer: "The sporophyte" },
      ],
      traps: [
        {
          title: "The prothallus is the gametophyte",
          body: "In pteridophytes the **prothallus** is the small **gametophyte**. It is free-living and mostly photosynthetic, with no vascular tissue and no differentiated body.",
        },
        {
          title: "Meiosis comes before the prothallus",
          body: "Spores are made by **meiosis in spore mother cells**, and the prothallus grows from a spore. So meiosis is the first step of the cycle and fertilisation comes after the sex organs form.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-heterospory",
      name: "Homospory and heterospory",
      intuition:
        "Most pteridophytes make one kind of spore. A few make two: a large megaspore that grows into a female gametophyte and a small microspore that grows into a male one. In these few, the female gametophyte stays on the parent plant for a while and the embryo starts growing inside it. That is a first step towards the seed.",
      definition:
        "From NCERT:\n" +
        "- The **majority** of pteridophytes make spores of one kind: they are **homosporous**.\n" +
        "- Genera like *Selaginella* and *Salvinia* make **two kinds of spores**, **macro (large)** and **micro (small)**: they are **heterosporous**.\n" +
        "- Megaspores grow into **female** gametophytes; microspores grow into **male** gametophytes.\n" +
        "- In heterosporous plants the **female gametophyte is retained on the parent sporophyte** for variable periods.\n" +
        "- The zygote develops into a young **embryo within the female gametophyte**. This event is a **precursor to the seed habit**, an important step in evolution.",
      table: {
        columns: ["Point", "Homosporous", "Heterosporous"],
        rows: [
          {
            cells: ["Kinds of spores", "One kind, all alike", "Two kinds: megaspores (large) and microspores (small)"],
            noteAmber: "NEET 2021: plants that make two kinds of spores are called heterosporous.",
            pyqExampleId: "43aea0d0-75aa-43e9-a9cf-45ee12094629",
          },
          { cells: ["How common", "The majority of pteridophytes", "A few genera, such as *Selaginella* and *Salvinia*"] },
          { cells: ["Female gametophyte", "Free-living", "Retained on the parent sporophyte for a while"] },
        ],
      },
      pyqExampleId: "6b342d49-e739-4fce-957a-128e8f7c54e3",
      selfCheckExample: {
        prompt: "In heterosporous pteridophytes, which kind of spore grows into the female gametophyte, and where does the embryo first grow?",
        steps: [
          "The large megaspore grows into the female gametophyte.",
          "The zygote grows into a young embryo within that female gametophyte, which stays on the parent sporophyte.",
        ],
        answer: "The megaspore; the embryo grows inside the female gametophyte while it is still on the parent plant.",
      },
      practiceSet: [
        { prompt: "Are the majority of pteridophytes homosporous or heterosporous?", answer: "Homosporous" },
        { prompt: "Which event in heterosporous pteridophytes is a precursor to the seed habit?", answer: "The zygote develops into an embryo within the female gametophyte retained on the parent sporophyte." },
        { prompt: "Into what does a microspore of *Selaginella* grow?", answer: "A male gametophyte" },
        { prompt: "What is the small spore of a heterosporous plant called?", answer: "Microspore" },
      ],
      traps: [
        {
          title: "The word ends in sporous",
          body: "Plants that make **two kinds of spores** are **heterosporous**; plants with one kind are **homosporous**. Look-alike options such as homosorus and heterosorus are not the terms for this.",
        },
        {
          title: "Most pteridophytes are homosporous",
          body: "Heterospory is the **exception**, seen in genera like *Selaginella* and *Salvinia*. The **majority** of pteridophytes are **homosporous**.",
        },
        {
          title: "Not every Lycopsida member is heterosporous",
          body: "*Selaginella* is heterosporous, but *Lycopodium*, in the same class Lycopsida, is homosporous. The heterosporous pair NCERT names is *Selaginella* and *Salvinia*.",
        },
      ],
    },
  ],
};
