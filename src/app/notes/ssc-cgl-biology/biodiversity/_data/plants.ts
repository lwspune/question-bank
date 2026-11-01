import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BBC_PLANTS_NOTE: SubtopicNote = {
  subtopicName: "Plant Kingdom Classification",
  title: "Plant Kingdom Classification",
  oneLineDefinition:
    "The four plant groups from mosses to flowering plants with an example of each, the classes of algae by colour, and a few protists SSC names.",
  whyItMatters:
    "Twelve questions in the bank: nine from the 2023 shifts and three from the 2024 shifts. Most give an example plant or alga and ask its group, so learn each group with two examples.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbbcpl-groups",
      name: "The four plant groups",
      intuition:
        "Plants climbed a ladder: first no vessels, then vessels without seeds, then naked seeds, then seeds inside fruits. Place any plant on that ladder and you have its group.",
      definition:
        "The ladder:\n" +
        "- **Bryophytes** (mosses, liverworts): **no vascular tissue**; the **gametophyte** is the main plant. **Marchantia**, a liverwort, lifts its sex organs on **umbrella-shaped** stalks. Funaria, Polytrichum and Sphagnum are mosses.\n" +
        "- **Pteridophytes** (ferns, **horsetails**, **lycophytes**): the **first vascular plants**, with xylem and phloem but **no seeds**. **Equisetum** is the only living horsetail (Sphenopsida); **Selaginella** is a lycophyte.\n" +
        "- **Gymnosperms** (**Cycas**, **Pinus**): **naked seeds** in cones, **no flowers**; slow to reproduce.\n" +
        "- **Angiosperms** (rose): flowers, with seeds inside fruits.\n\n" +
        "In vascular plants the **sporophyte** is the main plant.\n\n" +
        "**Carolus Linnaeus** published **Systema Naturae** in **1735**, with a sexual system for classifying plants.",
      table: {
        columns: ["Group", "Examples"],
        rows: [
          { cells: ["Bryophytes", "Moss, Marchantia"], pyqExampleId: "df4553f8-9b7b-44a4-adff-8eb2760bed04" },
          { cells: ["Pteridophytes", "Ferns, Equisetum, Selaginella"], pyqExampleId: "0db2361d-d103-4a2f-a060-6751be74b93d" },
          { cells: ["Gymnosperms", "Cycas, Pinus"], pyqExampleId: "3e4d49e2-25fc-4090-a0d1-c99b9cf5ca18" },
          { cells: ["Angiosperms", "Rose"] },
        ],
      },
      pyqExampleId: "749ed4b2-f20a-471b-8b0b-dcc154b6ae78",
      selfCheckExample: {
        prompt: "A statement says gymnosperms are seedless flowering plants. What two things are wrong with it?",
        steps: ["Gymnosperms do bear seeds; the seeds are naked, not inside a fruit.", "They have cones, not flowers."],
        answer: "They have seeds, and they have no flowers.",
      },
      practiceSet: [
        { prompt: "Which plant group were the first vascular plants?", answer: "Pteridophytes" },
        { prompt: "Is Marchantia a moss or a liverwort?", answer: "A liverwort" },
        { prompt: "Who published Systema Naturae in 1735?", answer: "Carolus Linnaeus" },
      ],
      traps: [
        {
          title: "Cycas is not a fern",
          body: "**Cycas** looks fern-like but carries **naked seeds**, so it is a **gymnosperm**. Pairing it with Pteridophyta is the mismatch.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbbcpl-algae",
      name: "Algae by colour, and some protists",
      intuition:
        "Algae are named by colour, and each colour is a class. Learn the class name with its colour and one example, and the match-the-column questions fall out.",
      definition:
        "The classes:\n" +
        "- **Chlorophyceae**: **green** algae (Chlamydomonas, **Spirogyra**).\n" +
        "- **Phaeophyceae**: **brown** algae (**Sargassum**).\n" +
        "- **Rhodophyceae**: **red** algae, red from the pigment **r-phycoerythrin**.\n" +
        "- **Cyanophyceae**: **blue-green** algae, now called **cyanobacteria**.\n\n" +
        "Facts SSC uses:\n" +
        "- **Spirogyra** gametes are **isogamous** (alike) and **non-flagellated**; they fuse by conjugation. Chlamydomonas gametes have flagella.\n" +
        "- **Gonyaulax** is a **dinoflagellate** whose blooms cause **red tides**. Diatoms are chrysophytes; Euglena a euglenoid.",
      table: {
        columns: ["Class", "Colour", "Example"],
        rows: [
          { cells: ["Chlorophyceae", "Green", "Chlamydomonas"], pyqExampleId: "a6a18049-6ec3-43ba-9b16-4dd3cb2324f4" },
          { cells: ["Phaeophyceae", "Brown", "Sargassum"], pyqExampleId: "c8e5931b-a882-4783-9920-a97b7d0ea8dd" },
          { cells: ["Rhodophyceae", "Red", "Red seaweeds"] },
          { cells: ["Cyanophyceae", "Blue-green", "Cyanobacteria"] },
        ],
      },
      pyqExampleId: "b7bbac63-c484-498e-a7a1-69d69a64ec6e",
      selfCheckExample: {
        prompt: "Which class does Sargassum belong to, and what colour is it?",
        steps: ["Sargassum is a large seaweed of the brown algae.", "Brown algae form the class Phaeophyceae."],
        answer: "Phaeophyceae; brown.",
      },
      practiceSet: [
        { prompt: "What is another name for blue-green algae?", answer: "Cyanobacteria" },
        { prompt: "Are Spirogyra's gametes flagellated?", answer: "No; they are isogamous and non-flagellated" },
        { prompt: "Which protist causes red tides?", answer: "Gonyaulax, a dinoflagellate" },
      ],
      traps: [
        {
          title: "A liverwort is not an alga",
          body: "In an options list of algae, **liverwort** is the odd one: it is a **bryophyte**.",
        },
      ],
    },
  ],
};
