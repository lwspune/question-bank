import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CP_BASIS_NOTE: SubtopicNote = {
  subtopicName: "Basis of Classification",
  title: "Basis of Classification",
  oneLineDefinition:
    "Plants are sorted step by step, by flowers, by body parts, by seeds, into divisions, classes, orders, families, genera and species; the simplest plants, the thallophytes, have a body with no root, stem or leaves.",
  whyItMatters:
    "Three questions in the bank, all MODERATE: filling the order and species of Hibiscus in a classification table, placing four plants on a yes or no flow chart, and naming the three types of lichen. Each needs the ladder of ranks and the yes or no questions that split the plant kingdom.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9cpba-hierarchy",
      name: "Ranks of classification and the plant kingdom's main groups",
      intuition:
        "Think of an address: country, state, city, street, house. Classification works the same way. Kingdom is the widest box and species the narrowest. To place a plant, ask simple questions in turn: does it flower? does it have a root, stem and leaves? are its seeds covered by a fruit?",
      definition:
        "- **Ranks**, widest to narrowest: **Kingdom, Division, Class, Order, Family, Genus, Species**.\n" +
        "- **Binomial name** (Carl Linnaeus): genus name first, with a capital letter, then species name in small letters, as in Hibiscus rosa-sinensis or Mangifera indica (mango).\n" +
        "- Hibiscus: Kingdom Plantae, Division Angiosperms, Class Dicotyledonae, **Order Malvales**, **Family Malvaceae**, Genus Hibiscus, Species rosa-sinensis.\n" +
        "- **Non-flowering plants (cryptogams)**: **Thallophyta** (no root, stem or leaves), **Bryophyta**, **Pteridophyta**.\n" +
        "- **Seed plants (phanerogams)**: **Gymnosperms** (naked seeds, no flowers) and **Angiosperms** (flowering plants, seeds inside fruits).\n" +
        "- Among flowering plants, one with a **branched stem** is like Catharanthus (sadaphuli); one with an **unbranched stem** is like a palm (betel nut, coconut).",
      table: {
        columns: ["Question", "Answer No", "Answer Yes"],
        rows: [
          { cells: ["Does it flower?", "Non-flowering: algae, mosses, ferns", "Flowering plants (angiosperms)"] },
          { cells: ["Non-flowering: does it have organs (root, stem, leaves)?", "Alga such as Ulva or Spirogyra", "Fern"] },
          { cells: ["Flowering: does the stem have branches?", "Palm such as betel nut or coconut", "Catharanthus, mango, hibiscus"] },
          { cells: ["Seed plant: is the seed inside a fruit?", "Gymnosperm such as Cycas or Pinus", "Angiosperm"] },
        ],
        caption: "Read a classification flow chart one question at a time, from the top.",
      },
      selfCheckExample: {
        prompt: "Put these ranks in order from the widest to the narrowest: genus, kingdom, family, class.",
        steps: ["The full ladder is kingdom, division, class, order, family, genus, species."],
        answer: "Kingdom, class, family, genus",
      },
      practiceSet: [
        { prompt: "In the name Mangifera indica, which word is the genus?", answer: "Mangifera" },
        { prompt: "Who introduced the two-word (binomial) system of naming living things?", answer: "Carl Linnaeus" },
        { prompt: "A plant has no flowers and its body has no root, stem or leaves. To which group does it belong?", answer: "Thallophyta (algae)" },
        { prompt: "A flowering plant has a tall stem with no branches, like a coconut tree. Name another such plant.", answer: "The betel nut palm" },
      ],
      pyqExampleId: "932ec851-eea1-4667-a2fe-b10f2d179ef5",
      traps: [
        {
          title: "Swapping order and family",
          body: "Order is the wider rank and family sits inside it: Hibiscus is in the order Malvales and the family Malvaceae.",
        },
        {
          title: "Writing the species name with a capital",
          body: "In a binomial name only the genus starts with a capital letter: Hibiscus rosa-sinensis, not Hibiscus Rosa-sinensis.",
        },
        {
          title: "Putting a fern with the algae",
          body: "A fern has true roots, a stem and leaves, though no flowers. Only the algae have a body with no organs at all.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cpba-thallophyta",
      name: "Thallophytes, fungi and lichens",
      intuition:
        "The simplest plants are the algae: a green body called a thallus, with no root, stem or leaves, mostly living in water. A fungus has no chlorophyll and cannot make its own food. When an alga and a fungus live together as one, they form a lichen: the alga makes food and the fungus gives shelter and water.",
      definition:
        "- **Thallophyta (algae)**: the body is a **thallus**, not divided into root, stem and leaves. They have chlorophyll and live mostly in water. Examples: **Spirogyra, Ulva, Ulothrix, Chara, Sargassum**.\n" +
        "- **Fungi** have **no chlorophyll**. Examples: yeast, mushroom, Mucor, Penicillium.\n" +
        "- A **lichen** is an **alga and a fungus living together**, each helping the other.\n" +
        "- Lichens are grouped by shape into three types: **crustose** (crust-like, flat on rock or bark), **foliose** (leaf-like) and **fruticose** (shrub-like, branched).\n" +
        "- Lichens do not grow where the air is badly polluted, so they show how clean the air is.",
      table: {
        columns: ["Type of lichen", "Shape"],
        rows: [
          { cells: ["Crustose", "A flat crust stuck to rock or bark"] },
          { cells: ["Foliose", "Flat, leaf-like lobes"] },
          { cells: ["Fruticose", "Shrub-like, branched, often hanging"] },
        ],
        caption: "Marchantia, Riccia and Funaria are bryophytes, never a type of lichen.",
      },
      selfCheckExample: {
        prompt: "Which two living things together make up a lichen, and what does each give the other?",
        steps: ["The alga has chlorophyll and makes food.", "The fungus holds water and gives the alga shelter."],
        answer: "An alga and a fungus: the alga gives food, the fungus gives water and shelter.",
      },
      practiceSet: [
        { prompt: "What is the body of an alga, not divided into root, stem and leaves, called?", answer: "A thallus" },
        { prompt: "Name two algae.", answer: "Spirogyra and Ulva (or Chara, Ulothrix, Sargassum)" },
        { prompt: "What does a fruticose lichen look like?", answer: "A small branched shrub" },
        { prompt: "Why can a fungus not make its own food?", answer: "It has no chlorophyll" },
      ],
      pyqExampleId: "5991ac1e-af3f-4f6c-8cfd-bb2fac537b37",
      traps: [
        {
          title: "Taking a lichen for a single plant",
          body: "A lichen is two living things, an alga and a fungus, living together as one body.",
        },
        {
          title: "Calling Marchantia a lichen",
          body: "Marchantia is a liverwort, a bryophyte. The lichen types are crustose, foliose and fruticose.",
        },
      ],
    },
  ],
};
