import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PK_BRYOPHYTES_NOTE: SubtopicNote = {
  subtopicName: "Bryophytes",
  title: "Bryophytes",
  oneLineDefinition:
    "Why bryophytes are the amphibians of the plant kingdom, their life cycle from gametophyte to dependent sporophyte, liverworts with their gemmae, and mosses with their protonema and leafy stages.",
  whyItMatters:
    "Four NEET questions: NEET 2021, NEET 2023 and two in NEET 2025. Gemmae were asked twice (2021 and 2025). The other two ask for the order of events in the life cycle and for where the moss protonema comes from.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopk-bryo-features",
      name: "Bryophytes and their life cycle",
      visualizationSlug: "neet-bryophyte-cycle",
      intuition:
        "Bryophytes live on land but need water to reproduce, so NCERT calls them the amphibians of the plant kingdom. The green plant you see is the gametophyte: it is haploid and makes the gametes. After fertilisation a small sporophyte grows out of it and stays attached, feeding on it. The sporophyte makes spores by meiosis, and each spore grows into a new gametophyte.",
      definition:
        "Bryophytes, as NCERT describes them:\n" +
        "- Live in **damp, humid and shaded** places. Called **amphibians of the plant kingdom**: they live in soil but **need water for sexual reproduction**.\n" +
        "- Body is thallus-like, prostrate or erect, attached by **unicellular or multicellular rhizoids**. No true roots, stem or leaves, only root-like, stem-like and leaf-like parts.\n" +
        "- The main plant body is **haploid**: the **gametophyte**.\n" +
        "- Sex organs are **multicellular**. The **antheridium** makes **biflagellate antherozoids**; the flask-shaped **archegonium** holds a **single egg**.\n" +
        "- Antherozoids are released into **water**, reach the archegonium and one fuses with the egg to form the **zygote**.\n" +
        "- The zygote does not undergo meiosis at once. It grows into a **multicellular sporophyte** that is **not free-living**: it stays attached to the photosynthetic gametophyte and takes food from it.\n" +
        "- Some sporophyte cells undergo **reduction division (meiosis)** to make **haploid spores**, which grow into gametophytes.\n" +
        "- Uses: some mosses are food for herbaceous mammals and birds. *Sphagnum* gives **peat**, used as **fuel** and as **packing material** for sending living material, because it **holds water**. Mosses with **lichens** are the **first organisms to colonise rocks**; mosses form mats that cut the impact of rain and **prevent soil erosion**.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["Dominant phase", "Haploid gametophyte"] },
          { cells: ["Male sex organ and gamete", "Antheridium, making biflagellate antherozoids"] },
          { cells: ["Female sex organ", "Archegonium, flask-shaped, with a single egg"] },
          { cells: ["Fertilisation needs", "Water, to carry the antherozoids to the archegonium"] },
          { cells: ["Sporophyte", "Multicellular, attached to the gametophyte and fed by it"] },
          { cells: ["Spores made by", "Meiosis in some cells of the sporophyte"] },
          { cells: ["Peat moss", "*Sphagnum*: fuel and packing material, since it holds water"] },
        ],
      },
      pyqExampleId: "edd0ad4b-2fed-4af7-a52a-d3f8f4a9d203",
      selfCheckExample: {
        prompt: "Is the sporophyte of a bryophyte haploid or diploid, and why can it not live on its own?",
        steps: [
          "The sporophyte grows from the zygote, so it is diploid.",
          "It is attached to the photosynthetic gametophyte and takes its food from it.",
        ],
        answer: "Diploid; it depends on the gametophyte for food and stays attached to it.",
      },
      practiceSet: [
        { prompt: "Why are bryophytes called the amphibians of the plant kingdom?", answer: "They live on land but need water for sexual reproduction." },
        { prompt: "How many flagella does an antherozoid of a bryophyte have?", answer: "Two (biflagellate)" },
        { prompt: "What anchors a bryophyte to the soil?", answer: "Rhizoids, unicellular or multicellular" },
        { prompt: "Which moss gives peat?", answer: "*Sphagnum*" },
        { prompt: "Which two kinds of organisms are the first to colonise bare rocks?", answer: "Mosses and lichens" },
      ],
      traps: [
        {
          title: "The green bryophyte plant is haploid",
          body: "In bryophytes the main plant body is the **gametophyte**, which is **haploid**. The diploid sporophyte is small and depends on it. This is the reverse of pteridophytes.",
        },
        {
          title: "The zygote does not make spores at once",
          body: "A bryophyte zygote does **not** undergo meiosis straight away. It first grows into a **multicellular sporophyte**, and only some cells of that sporophyte undergo meiosis to make spores.",
        },
        {
          title: "Peat is valued for holding water",
          body: "*Sphagnum* peat is used to pack living material because it can **hold water**, not because it kills germs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-liverworts",
      name: "Liverworts and gemmae",
      intuition:
        "Liverworts are the flatter bryophytes. *Marchantia* has a flat thallus that lies close to the ground. Besides breaking into pieces, a liverwort can make small green buds called gemmae in little cups on its thallus. A gemma falls off and grows into a new plant. That is asexual reproduction, with no gametes involved.",
      definition:
        "Liverworts, as NCERT describes them:\n" +
        "- Grow in moist, shady places: banks of streams, marshy ground, damp soil, bark of trees and deep in woods.\n" +
        "- Body is **thalloid**, as in *Marchantia*: **dorsiventral** and closely pressed to the ground. Leafy members have tiny leaf-like parts in **two rows** on stem-like structures.\n" +
        "- **Asexual** reproduction: by **fragmentation** of the thallus, or by **gemmae**.\n" +
        "- **Gemmae** are **green, multicellular, asexual buds** that form in small receptacles called **gemma cups** on the thallus. They break off and grow into new plants.\n" +
        "- **Sexual** reproduction: male and female sex organs on the **same or different** thalli.\n" +
        "- The sporophyte has a **foot, seta and capsule**. Spores form in the capsule after meiosis and grow into free-living gametophytes.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["Example", "*Marchantia*"] },
          { cells: ["Thallus", "Dorsiventral, closely pressed to the substrate"] },
          {
            cells: ["Gemmae", "Green, multicellular, asexual buds"],
            noteAmber: "NEET 2025: gemmae help in asexual reproduction.",
            pyqExampleId: "fd20b361-81e3-4e2a-8d4a-6390c777846b",
          },
          { cells: ["Where gemmae form", "In gemma cups on the thallus"] },
          { cells: ["Asexual reproduction", "Fragmentation of thalli, or gemmae"] },
          { cells: ["Sporophyte parts", "Foot, seta and capsule"] },
        ],
      },
      pyqExampleId: "470e9a69-a26e-40d4-a4e0-29acbd8632a8",
      selfCheckExample: {
        prompt: "A *Marchantia* thallus is cut into two pieces and each piece grows into a new plant. What kind of reproduction is this, and what is the other way a liverwort reproduces asexually?",
        steps: [
          "A thallus breaking into pieces that each grow is fragmentation, a form of asexual reproduction.",
          "NCERT gives one more asexual way for liverworts: gemmae formed in gemma cups.",
        ],
        answer: "Fragmentation; the other asexual way is by gemmae.",
      },
      practiceSet: [
        { prompt: "What are the small receptacles on a liverwort thallus that hold gemmae called?", answer: "Gemma cups" },
        { prompt: "Name the three parts of the sporophyte of a liverwort.", answer: "Foot, seta and capsule" },
        { prompt: "In leafy liverworts, how are the tiny leaf-like parts arranged on the stem-like structure?", answer: "In two rows" },
        { prompt: "Name the thalloid liverwort that NCERT uses as its example.", answer: "*Marchantia*" },
      ],
      traps: [
        {
          title: "Gemmae are asexual, and found in liverworts",
          body: "**Gemmae** are **asexual** buds, so they play no part in sexual reproduction. NCERT describes them in **some liverworts**, not in mosses, pteridophytes or gymnosperms.",
        },
        {
          title: "A liverwort sporophyte is the simpler one",
          body: "Both liverworts and mosses have a sporophyte of foot, seta and capsule, but the **moss sporophyte is more elaborate** than the liverwort one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopk-mosses",
      name: "Mosses",
      intuition:
        "In mosses the gametophyte comes in two stages. A spore first grows into a thin green thread lying on the ground, the protonema. Buds on the protonema then grow upright into the leafy stage, which is the moss plant you notice. The leafy stage carries the sex organs, and after fertilisation a sporophyte grows on top of it.",
      definition:
        "Mosses, as NCERT describes them:\n" +
        "- The gametophyte has two stages.\n" +
        "- **Protonema stage**: grows **directly from a spore**; it is **creeping, green, branched and frequently filamentous**.\n" +
        "- **Leafy stage**: grows from the **secondary protonema** as a **lateral bud**. It has **upright, slender axes** with **spirally arranged leaves**, attached to the soil by **multicellular, branched rhizoids**. It bears the sex organs.\n" +
        "- **Vegetative** reproduction: by **fragmentation** and by **budding in the secondary protonema**.\n" +
        "- Antheridia and archegonia are at the **apex of the leafy shoots**.\n" +
        "- The zygote grows into a sporophyte of **foot, seta and capsule**, **more elaborate** than in liverworts. Spores form in the capsule after meiosis. Mosses have an **elaborate mechanism of spore dispersal**.\n" +
        "- Examples: *Funaria*, *Polytrichum*, *Sphagnum*.",
      table: {
        columns: ["Point", "The fact"],
        rows: [
          { cells: ["First stage of the gametophyte", "Protonema, grown directly from a spore"] },
          { cells: ["Protonema", "Creeping, green, branched, frequently filamentous"] },
          { cells: ["Second stage", "Leafy stage, from a lateral bud on the secondary protonema"] },
          { cells: ["Leafy stage", "Upright slender axes, spirally arranged leaves"] },
          { cells: ["Rhizoids", "Multicellular and branched"] },
          { cells: ["Position of sex organs", "At the apex of the leafy shoots"] },
          { cells: ["Vegetative reproduction", "Fragmentation, and budding in the secondary protonema"] },
          { cells: ["Examples", "*Funaria*, *Polytrichum*, *Sphagnum*"] },
        ],
      },
      pyqExampleId: "3e980cfd-50ef-4513-b1bf-fb0e78e8f627",
      selfCheckExample: {
        prompt: "From what does the leafy stage of a moss grow, and which stage carries the sex organs?",
        steps: [
          "The leafy stage grows as a lateral bud from the secondary protonema.",
          "The sex organs sit at the apex of the leafy shoots.",
        ],
        answer: "From a lateral bud on the secondary protonema; the leafy stage bears the sex organs.",
      },
      practiceSet: [
        { prompt: "How are the leaves arranged on the leafy stage of a moss?", answer: "Spirally" },
        { prompt: "What kind of rhizoids anchor the leafy stage of a moss?", answer: "Multicellular and branched" },
        { prompt: "Name three mosses that NCERT gives as examples.", answer: "*Funaria*, *Polytrichum* and *Sphagnum*" },
        { prompt: "Where on a moss plant are the antheridia and archegonia borne?", answer: "At the apex of the leafy shoots" },
      ],
      traps: [
        {
          title: "The protonema is branched",
          body: "The moss **protonema** is **creeping, green, branched** and frequently filamentous. It is not unbranched and it is not colourless.",
        },
        {
          title: "Moss rhizoids are multicellular and branched",
          body: "Bryophytes in general may have unicellular or multicellular rhizoids, but the leafy stage of a **moss** is anchored by **multicellular, branched** rhizoids.",
        },
      ],
    },
  ],
};
