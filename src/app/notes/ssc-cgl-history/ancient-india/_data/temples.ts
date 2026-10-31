import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_TEMPLES_NOTE: SubtopicNote = {
  subtopicName: "Temple and Rock-Cut Architecture",
  title: "Temple and Rock-Cut Architecture",
  oneLineDefinition:
    "The great rock-cut caves and monoliths, and the parts of a temple in the Nagara, Dravida and Vesara styles, with the names SSC uses for each part.",
  whyItMatters:
    "Fourteen questions in the bank, and 11 of them come from the 2025 shifts. Those papers asked the names of temple parts (vimana, amalaka, bhadra, mandapa) and which style belongs to which region, so learn the parts as a labelled list, north and south side by side.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschantm-caves",
      name: "Rock-cut caves and monoliths",
      intuition:
        "Before temples were built from blocks, they were cut out of living rock. Each site SSC asks about has a dynasty, a state and one thing that makes it famous.",
      definition:
        "In time order:\n" +
        "- **Barabar caves**, Bihar (Mauryan): the **Lomas Rishi** cave, whose carved doorway copies a wooden hut.\n" +
        "- **Elephanta caves**, near Mumbai (about 6th century CE): dedicated to **Shiva**, with the great **Trimurti** (Sadashiva); their deep carving plays with light and shadow.\n" +
        "- **Mahabalipuram (Mamallapuram)**: the **Pallava** port, with the rathas, rock reliefs and the Shore Temple.\n" +
        "- **Kailasa temple, Ellora** (Cave 16): cut in the 8th century under the **Rashtrakuta** king **Krishna I**. It is a **monolith**: the whole temple was carved, from the top down, out of **one single rock**.",
      table: {
        columns: ["Site", "Dynasty", "Remember for"],
        rows: [
          { cells: ["Lomas Rishi cave, Barabar hills", "Mauryan", "Bihar; doorway like a wooden hut"], pyqExampleId: "467ee141-78a9-4b87-adad-26f26a062562" },
          { cells: ["Elephanta caves", "About 6th century", "Shiva; the Trimurti"] },
          { cells: ["Mahabalipuram", "Pallava", "Rathas and the Shore Temple"], pyqExampleId: "9c0faa27-1f7b-4c0a-a1db-cd0c929cc396" },
          { cells: ["Kailasa temple, Ellora", "Rashtrakuta (Krishna I)", "Cut from one single rock"], pyqExampleId: "f67b40b3-d69c-4533-b5b8-9ce7a8c0a853" },
        ],
      },
      pyqExampleId: "caddcb95-b7ba-41bd-8316-1a2e08638968",
      selfCheckExample: {
        prompt: "Who built the Kailasa temple at Ellora, and why is it called a monolith?",
        steps: [
          "It was cut in the reign of the Rashtrakuta king Krishna I, in the 8th century.",
          "It is a monolith because the whole temple was carved out of one single rock, not built from blocks.",
        ],
        answer: "Krishna I of the Rashtrakutas; it was carved from one single rock.",
      },
      practiceSet: [
        { prompt: "In which state is the Lomas Rishi cave?", answer: "Bihar" },
        { prompt: "Under which dynasty did Mahabalipuram become a centre of temple building?", answer: "The Pallavas" },
        { prompt: "Which god are the Elephanta caves dedicated to?", answer: "Shiva" },
        { prompt: "Which dynasty built the Kailasa temple at Ellora?", answer: "The Rashtrakutas" },
      ],
      traps: [
        {
          title: "Elephanta is Shaiva, not Buddhist",
          body: "Ajanta and many Ellora caves are Buddhist, but **Elephanta** is **Shaiva**. A Buddhist-stupa option for Elephanta is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschantm-styles",
      name: "Nagara, Dravida and Vesara",
      intuition:
        "North Indian temples rise in a curving tower; south Indian temples rise in a stepped pyramid with a tall gateway; the Deccan mixed the two. Each part has its own name, and SSC asks the names.",
      definition:
        "**Nagara** (north):\n" +
        "- A curving **shikhara** rises from a **square** base. On top sits the **amalaka**, a ribbed stone disc, with the kalasha above it.\n" +
        "- Shikhara types: **Latina** (rekha-prasada), tall with walls curving in to a point; **Phamsana**, broader and shorter, with slabs rising in a **straight** incline to a point; **Valabhi**, rectangular with a wagon-vaulted roof.\n" +
        "- The wall is broken into offsets: the central projection is the **bhadra**, the corner one the karna.\n" +
        "- Early example: the **Dashavatara temple, Deogarh** (Gupta, early 6th century), on a **panchayatana** plan. The old temples of **Uttarakhand** are Nagara too.\n\n" +
        "**Dravida** (south): the pyramidal tower over the sanctum is the **vimana**; the gateway tower in the outer wall is the **gopuram**.\n\n" +
        "**Vesara**: the hybrid style of the **Deccan** (Chalukya, Hoysala). Regional forms: **Rekha-deul** in **Odisha**, **Bhumija** in **Malwa**.\n\n" +
        "In every style the **mandapa** is the pillared hall where worshippers gather.",
      table: {
        columns: ["Part or style", "What it is"],
        rows: [
          { cells: ["Shikhara", "Curving tower of a Nagara temple"], pyqExampleId: "3afc004e-ac6c-468c-a161-ccb7d6104d65" },
          { cells: ["Amalaka", "Ribbed stone disc on top of the shikhara"], pyqExampleId: "a547f5ff-5345-497e-bf37-5c8ef9ee6135" },
          { cells: ["Bhadra", "Central projecting offset of a Nagara wall"], pyqExampleId: "7530578f-c6d2-4cb4-ad97-71a9091ee7b4" },
          { cells: ["Phamsana", "Broad shikhara of slabs in a straight incline"], pyqExampleId: "0e5ff4d8-d1c4-4f19-9fc5-3cb2eab58942" },
          { cells: ["Gopuram", "Gateway tower of a Dravida temple"] },
          { cells: ["Mandapa", "Pillared hall for worshippers"], pyqExampleId: "c18430da-cd17-4641-aeee-72043f379b54" },
          { cells: ["Vesara", "Deccan hybrid style"], pyqExampleId: "b4b49536-a7e7-4492-ae40-f46f507f441b" },
        ],
      },
      pyqExampleId: "5d533be1-2dc3-4372-8234-0e103e771319",
      selfCheckExample: {
        prompt: "A south Indian temple has two tall towers. What is each called, and where does each stand?",
        steps: [
          "The vimana is the pyramidal tower over the sanctum.",
          "The gopuram is the gateway tower in the outer enclosure wall.",
        ],
        answer: "The vimana over the sanctum; the gopuram at the gateway.",
      },
      practiceSet: [
        { prompt: "What sits on top of a Nagara shikhara?", answer: "The amalaka, a ribbed stone disc (with the kalasha above)" },
        { prompt: "What is the pillared hall of a temple called?", answer: "The mandapa" },
        { prompt: "In which region did the Vesara style arise?", answer: "The Deccan" },
        { prompt: "Which temple style do the old temples of Uttarakhand follow?", answer: "The Nagara style" },
        { prompt: "On what kind of plan is the Deogarh Dashavatara temple built?", answer: "A panchayatana plan" },
      ],
      traps: [
        {
          title: "Vimana is not the gateway",
          body: "In a Dravida temple the **vimana** is over the sanctum. The **gopuram** is the gateway. A statement calling the vimana the gateway is false.",
        },
        {
          title: "Kalinga architecture is Odisha's",
          body: "The **Kalinga** style, with its rekha-deul, belongs to **Odisha**. Tamil Nadu's temples are **Dravida**.",
        },
      ],
    },
  ],
};
