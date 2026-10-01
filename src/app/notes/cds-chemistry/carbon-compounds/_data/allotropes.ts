import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CB_ALLOTROPES_NOTE: SubtopicNote = {
  subtopicName: "Carbon and Its Allotropes",
  title: "Carbon and Its Allotropes",
  oneLineDefinition:
    "Diamond, graphite, fullerene and graphene: how each is built, why only graphite conducts, and what is not an allotrope.",
  whyItMatters:
    "Seven CDS questions, the largest page in the chapter. Almost all of them come back to one contrast: diamond is a hard insulator, graphite a soft conductor, and the reason is how many bonds each carbon makes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschcb-allotropes",
      name: "The allotropes of carbon",
      intuition:
        "Allotropes are different forms of the same element, made of the same atoms joined in different ways. Carbon has four that CDS asks about. Coal is not one of them: it is a rock that contains carbon along with other elements.",
      definition:
        "The four forms:\n" +
        "- **Diamond**: each carbon bonded to **four** others in a 3-D network. Hardest natural substance; **insulator**.\n" +
        "- **Graphite**: each carbon bonded to **three** others in flat hexagonal layers; one electron per carbon is free, so it **conducts**. Soft and slippery: used as a lubricant and in pencils.\n" +
        "- **Fullerene** (C₆₀, buckminsterfullerene): football-shaped molecules; **not** a good conductor.\n" +
        "- **Graphene**: a **single layer of graphite**, the thinnest material known, almost transparent, an excellent conductor. It is a **zero band-gap** semimetal, not a wide band-gap semiconductor.\n" +
        "- **Coal** is **not** an allotrope: it is a mixture containing carbon with hydrogen, sulphur, nitrogen and minerals.\n" +
        "- Carbon is a minor part of the Earth's crust, roughly **0.02%** by mass, mostly as carbonates and fossil fuels.",
      table: {
        columns: ["Form", "Bonds per carbon", "Conducts electricity?"],
        rows: [
          { cells: ["Diamond", "4 (3-D network)", "No"] },
          { cells: ["Graphite", "3 (flat layers)", "Yes"] },
          { cells: ["Fullerene (C₆₀)", "3 (closed cage)", "No"] },
          {
            cells: ["Graphene", "3 (one layer)", "Yes, very well"],
            noteAmber: "CDS 2025 (II): 'a wide band-gap semiconductor' is the property graphene does NOT have.",
            pyqExampleId: "7ca4cfaa-888b-4a29-8283-cd7d2445a683",
          },
          {
            cells: ["Coal", "Not an allotrope: a mixture", "Not a single form of carbon"],
            noteAmber: "CDS 2016 (II): coal is the one that is not an allotrope of carbon.",
            pyqExampleId: "c5790819-6ce1-4754-b749-f2f3e021ef73",
          },
        ],
      },
      pyqExampleId: "1ee34656-374d-4571-b568-cb9dbe92add0",
      selfCheckExample: {
        prompt: "Graphite is used as a dry lubricant in machines. Which feature of its structure makes it slippery?",
        steps: [
          "Graphite's carbons sit in flat sheets, each carbon bonded to three others in its own sheet.",
          "The sheets are held to each other only by weak forces.",
          "So the sheets slide over one another easily.",
        ],
        answer: "Its layers are held together only weakly, so they slide over each other.",
      },
      practiceSet: [
        { prompt: "Which allotrope of carbon is the hardest natural substance?", answer: "Diamond" },
        { prompt: "How many carbon atoms is each carbon bonded to in diamond?", answer: "Four" },
        { prompt: "What is the formula of buckminsterfullerene?", answer: "C₆₀" },
        { prompt: "Is coal an allotrope of carbon?", answer: "No" },
      ],
      traps: [
        {
          title: "The coal answer: a carbon-rich rock is not an allotrope",
          body: "An allotrope is a **pure** form of one element. Coal contains hydrogen, sulphur, nitrogen and minerals, so it is **not** an allotrope. Diamond, graphite, graphene and fullerene are.",
        },
        {
          title: "Graphene has no band gap",
          body: "Graphene is a **zero band-gap** semimetal, which is why it conducts so well. Calling it a wide band-gap semiconductor is the false statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcb-diamond-graphite",
      name: "Diamond and graphite compared",
      intuition:
        "Diamond and graphite are both pure carbon, so they have the same percentage of carbon and give only carbon dioxide when burnt. Every difference between them comes from structure: four bonds in three dimensions against three bonds in a flat sheet.",
      definition:
        "Point by point:\n" +
        "- **Same**: pure carbon; same percentage of carbon; both burn to CO₂.\n" +
        "- **Diamond**: rigid 3-D network, each C–C bond the **same length (154 pm) in every direction**; very hard; no free electrons, so an **insulator**.\n" +
        "- **Graphite**: each carbon bonded to three others **in the same plane**, forming a **hexagonal** array; layers held by weak forces, so soft and slippery; one free electron per carbon, so a **conductor**.",
      table: {
        columns: ["Property", "Diamond", "Graphite"],
        rows: [
          { cells: ["Structure", "3-D tetrahedral network", "Flat hexagonal layers"] },
          {
            cells: ["Bonds per carbon", "4", "3, all in one plane"],
            noteAmber: "CDS 2019 (II): in graphite each carbon is bonded to three others in the same plane, giving a hexagonal array.",
            pyqExampleId: "39a23a29-95c6-4ad7-a4dc-f45fb2aeaf31",
          },
          { cells: ["Hardness", "Hardest natural substance", "Soft, slippery"] },
          { cells: ["Electrical conduction", "Insulator", "Good conductor"] },
          { cells: ["Percentage of carbon", "100% (pure)", "100% (pure)"] },
        ],
      },
      pyqExampleId: "610b7ac2-883c-416a-8444-e626d4c0b016",
      practiceSet: [
        { prompt: "Which is the better electrical conductor, diamond or graphite?", answer: "Graphite" },
        { prompt: "In graphite, what shape do the rings of carbon atoms make?", answer: "Hexagons" },
        { prompt: "Do diamond and graphite contain the same percentage of carbon?", answer: "Yes — both are pure carbon" },
      ],
      traps: [
        {
          title: "Same element, different properties",
          body: "'Diamond and graphite have similar physical and chemical properties' is **false** for physical properties: one is hard and insulating, the other soft and conducting. Their chemistry is the same because both are pure carbon.",
        },
        {
          title: "Diamond's bonds are all the same length",
          body: "Every C–C bond in diamond is the same length in every direction. A statement that diamond has 'different carbon to carbon distance in all directions' is untrue.",
        },
      ],
    },
  ],
};
