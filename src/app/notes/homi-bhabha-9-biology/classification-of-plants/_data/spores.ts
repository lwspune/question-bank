import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CP_SPORES_NOTE: SubtopicNote = {
  subtopicName: "Bryophytes and Pteridophytes",
  title: "Bryophytes and Pteridophytes",
  oneLineDefinition:
    "Bryophytes (mosses, liverworts, hornworts) have no true roots and no conducting tissue and need water to reproduce; pteridophytes (ferns and their relatives) have true roots, stems, leaves and conducting tissue, yet still bear spores, not seeds.",
  whyItMatters:
    "The busiest page of the chapter: ten questions, five EASY, four MODERATE and one HARD. Five are about bryophytes (why they are the amphibians of the plant kingdom, which plants are bryophytes, which lack conducting tissue, a label on a liverwort) and five about pteridophytes (which pair belongs, where Equisetum goes, which plants make spores). Most are a matter of knowing which name sits in which division.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9cpsp-bryophyta",
      name: "Bryophyta: the amphibians of the plant kingdom",
      intuition:
        "Mosses grow as a soft green carpet on damp walls and shady rocks in the rains. They live on land, but they cannot live without water: they have no roots to draw it up and no pipes to carry it, and their male cells must swim through a film of water to reach the egg. That is why they are called the amphibians of the plant kingdom.",
      definition:
        "- Small plants of **moist, shady** places.\n" +
        "- No true roots: thread-like **rhizoids** hold them to the soil. They have simple stem-like and leaf-like parts.\n" +
        "- **No conducting tissue**: no xylem for water and no phloem for food.\n" +
        "- They need **water for fertilisation** (the male gametes swim to the egg), so they are called the **amphibians of the plant kingdom**.\n" +
        "- They make **spores** in a **capsule**. In a leafy liverwort the capsule rises on a long stalk from a sheath called the **perianth**.\n" +
        "- Examples: **Funaria** (a moss), **Marchantia** and **Riccia** (liverworts), **Anthoceros** (a hornwort).",
      table: {
        columns: ["Kind", "Examples"],
        rows: [
          { cells: ["Moss", "Funaria"] },
          { cells: ["Liverwort", "Marchantia, Riccia"] },
          { cells: ["Hornwort", "Anthoceros"] },
        ],
        caption: "All of these are bryophytes: none has xylem or phloem.",
      },
      selfCheckExample: {
        prompt: "A small plant grows on a damp wall. It is held down by rhizoids, has no xylem or phloem, and forms spores in a capsule. To which division does it belong?",
        steps: ["Rhizoids in place of roots and no conducting tissue are the marks of a bryophyte."],
        answer: "Bryophyta",
      },
      practiceSet: [
        { prompt: "What holds a moss to the soil in place of roots?", answer: "Rhizoids" },
        { prompt: "Name two liverworts.", answer: "Marchantia and Riccia" },
        { prompt: "Why do bryophytes need water to reproduce?", answer: "Their male gametes must swim through water to reach the egg" },
        { prompt: "To which division does the moss Funaria belong?", answer: "Bryophyta" },
      ],
      pyqExampleId: "1948b311-dd5e-4cd6-b06a-071b34f7f5a5",
      traps: [
        {
          title: "Giving bryophytes true roots",
          body: "Bryophytes have rhizoids, not true roots. True roots first appear in the pteridophytes.",
        },
        {
          title: "Thinking every land plant has conducting tissue",
          body: "Bryophytes live on land but have no xylem or phloem. That is why they stay small and keep to damp places.",
        },
        {
          title: "Reading 'amphibian' as 'lives in water and on land at will'",
          body: "Bryophytes are called amphibians because they live on land but need water for fertilisation. They do not grow in air or in deserts.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cpsp-pteridophyta",
      name: "Pteridophyta: ferns and their relatives",
      intuition:
        "A fern looks like a real plant: it has roots, a stem and feathery leaves, and pipes inside to carry water and food. But it never flowers and never makes a seed. Turn a fern leaf over and you will see rows of brown dots: these hold the spores from which new ferns grow.",
      definition:
        "- True **roots, stem and leaves**, with **conducting tissue** (xylem and phloem).\n" +
        "- **No flowers and no seeds**: they reproduce by **spores**, made in **sori** (brown dots) on the underside of the leaves.\n" +
        "- They make spores asexually, and sexually they form a **zygote** after fertilisation, which still needs water.\n" +
        "- Examples: the ferns **Nephrolepis**, **Adiantum** (maidenhair fern) and **Pteris**; **Marsilea** (a water fern); **Selaginella**; **Lycopodium**; **Equisetum** (horsetail).",
      table: {
        columns: ["Plant", "Common name or note"],
        rows: [
          { cells: ["Nephrolepis, Pteris", "Ferns"] },
          { cells: ["Adiantum", "Maidenhair fern"] },
          { cells: ["Marsilea", "Water fern; its leaf looks like a four-leaf clover"] },
          { cells: ["Equisetum", "Horsetail"] },
          { cells: ["Selaginella, Lycopodium", "Called spike moss and club moss, but they are pteridophytes"], noteAmber: "The word 'moss' in their names does not make them bryophytes." },
        ],
        caption: "Ulva, Ulothrix, Sargassum and Chara are algae; Anthoceros and Marchantia are bryophytes.",
      },
      selfCheckExample: {
        prompt: "A plant has true roots, a stem and leaves with xylem and phloem, but no flowers or seeds. Brown dots line the underside of its leaves. Name its division and say what the dots hold.",
        steps: ["Conducting tissue without flowers or seeds marks a pteridophyte.", "The brown dots are sori, where spores are made."],
        answer: "Pteridophyta; the dots (sori) hold spores.",
      },
      practiceSet: [
        { prompt: "Where are the spores of a fern formed?", answer: "In sori on the underside of its leaves" },
        { prompt: "Which pteridophyte grows in water and has leaves like a four-leaf clover?", answer: "Marsilea" },
        { prompt: "What is the common name of Equisetum?", answer: "Horsetail" },
        { prompt: "Which group of non-flowering plants has xylem and phloem?", answer: "Pteridophyta" },
      ],
      pyqExampleId: "7026f61a-063e-4a01-bf81-789c88363d1e",
      traps: [
        {
          title: "Calling Lycopodium a moss",
          body: "Lycopodium (club moss) and Selaginella (spike moss) have true roots and conducting tissue. They are pteridophytes.",
        },
        {
          title: "Giving ferns seeds",
          body: "Ferns have roots, stems, leaves and conducting tissue, but no flowers and no seeds. New ferns grow from spores.",
        },
        {
          title: "Putting Ulva or Chara with the ferns",
          body: "Ulva, Chara, Ulothrix and Sargassum have no root, stem or leaves. They are algae (Thallophyta).",
        },
      ],
    },
  ],
};
