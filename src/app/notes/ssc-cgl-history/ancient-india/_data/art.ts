import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_ART_NOTE: SubtopicNote = {
  subtopicName: "Art, Painting and Sculpture",
  title: "Art, Painting and Sculpture",
  oneLineDefinition:
    "Ashoka's pillars and their capitals, the Persian touch in Mauryan art, and the Gandhara and Mathura schools of sculpture with the early Buddhist sites that came before them.",
  whyItMatters:
    "Eleven questions in the bank, nine of them from the 2025 shifts alone. Those papers asked statement and comparison questions, Mathura against Gandhara above all, so learn the differences between the two schools, not just their names.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschanar-mauryan",
      name: "Mauryan pillars and court art",
      intuition:
        "Ashoka's polished stone pillars, each crowned by an animal, are the first great Indian court art. SSC asks which animals they carry, where they stand, and what came from Persia.",
      definition:
        "The facts:\n" +
        "- The **Lion Capital** found at **Sarnath** has four lions back to back; it is India's **National Emblem**.\n" +
        "- Pillar capitals carry a **lion** (Sarnath, Sanchi), a **bull** (Rampurva), an **elephant** (Sankissa) or a horse.\n" +
        "- Pillar sites by state: **Lauriya Nandangarh** in **Bihar**, Sarnath in Uttar Pradesh, Sanchi in Madhya Pradesh.\n" +
        "- **Persian (Achaemenid) influence**: the monumental size, the mirror polish, the bell-shaped capital and the **bold, realistic** animal figures.",
      table: {
        columns: ["Capital or site", "Animal or fact"],
        rows: [
          { cells: ["Sarnath", "Four lions; the National Emblem"], pyqExampleId: "d415cec5-169f-40b2-9f29-39bb0f6b16e5" },
          { cells: ["Rampurva", "Bull"] },
          { cells: ["Sankissa", "Elephant"] },
          { cells: ["Lauriya Nandangarh", "Ashokan pillar in Bihar"], pyqExampleId: "7adb1832-3f0a-475a-9a1a-97b83cbe7075" },
        ],
      },
      pyqExampleId: "37042020-accf-4c43-bc15-3960b66cdbfe",
      selfCheckExample: {
        prompt: "Name two features of Ashoka's pillars that show Persian influence.",
        steps: [
          "Their huge size and the mirror polish on the stone follow Achaemenid Persian court art.",
          "So do the bell-shaped capitals and the bold, realistic animals on top.",
        ],
        answer: "Any two of: monumental size, mirror polish, bell-shaped capital, bold realistic animals.",
      },
      practiceSet: [
        { prompt: "Where was the Lion Capital, now the National Emblem, found?", answer: "Sarnath" },
        { prompt: "Which animal crowns the Rampurva capital?", answer: "A bull" },
        { prompt: "In which state is the Ashokan pillar at Lauriya Nandangarh?", answer: "Bihar" },
        { prompt: "From which empire did Mauryan art take its bold, realistic style?", answer: "Achaemenid Persia" },
      ],
      traps: [
        {
          title: "Sanchi has a lion capital too",
          body: "**Sanchi** also has a lion capital, but the one called **the Lion Capital**, the National Emblem, is **Sarnath's**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanar-schools",
      name: "Gandhara, Mathura and the early Buddhist sites",
      intuition:
        "In the Kushana age two schools made the first images of the Buddha: Gandhara in the north-west, in a Greek style, and Mathura, in an Indian one. SSC asks how they differ and the order of the sites that came before them.",
      definition:
        "Order of the early Buddhist sculpture sites: **Bharhut** (Shunga, 2nd century BCE), then the gateways of **Sanchi Stupa 1** (1st century BCE), then **Mathura** (Kushana, from the 1st century CE).\n\n" +
        "**Mathura school**:\n" +
        "- **Spotted red sandstone**, in the **indigenous Yaksha** tradition: a full, strong body and a smiling face.\n" +
        "- Made **Buddhist, Jain and Brahmanical** images, such as **Kartikeya, Vishnu and Kubera**, mostly in the **Kushana** period, for Indian and foreign patrons alike.\n" +
        "- Rich in **nature motifs**: women with trees, lotuses, creepers and animals.\n\n" +
        "**Gandhara school**:\n" +
        "- **Grey-blue schist**, with **Greco-Roman (Hellenistic)** features: wavy hair and heavy drapery. Mainly **Buddhist**.\n" +
        "- Beyond stone: the gold **Bimaran reliquary** and the carved ivory plaques of **Begram**, both in Afghanistan.",
      table: {
        columns: ["Feature", "Mathura", "Gandhara"],
        rows: [
          { cells: ["Stone", "Spotted red sandstone", "Grey-blue schist"] },
          { cells: ["Style", "Indigenous, Yaksha-like", "Greco-Roman (Hellenistic)"], pyqExampleId: "01e97cda-f0ef-4799-a5ca-9edd1eb28cb8" },
          { cells: ["Religions", "Buddhist, Jain and Brahmanical", "Mainly Buddhist"], pyqExampleId: "64cd9df0-4ee4-4217-8c95-94a6926907f0" },
        ],
      },
      pyqExampleId: "67b0d1ab-030c-4082-bae5-8f3683fbbeae",
      selfCheckExample: {
        prompt: "Put Mathura, Bharhut and Sanchi Stupa 1 in order by the age of their sculpture.",
        steps: [
          "Bharhut's railing reliefs are the oldest, from the 2nd century BCE.",
          "Sanchi's carved gateways follow in the 1st century BCE.",
          "Mathura's school flourished under the Kushanas from the 1st century CE.",
        ],
        answer: "Bharhut, Sanchi, Mathura.",
      },
      practiceSet: [
        { prompt: "Which stone did the Mathura sculptors mainly use?", answer: "Spotted red sandstone" },
        { prompt: "Which school shows Greco-Roman features such as wavy hair and drapery?", answer: "The Gandhara school" },
        { prompt: "Under which dynasty did the Mathura school flourish?", answer: "The Kushanas" },
        { prompt: "Where were carved ivory plaques of the Gandhara age found?", answer: "Begram, in Afghanistan" },
      ],
      traps: [
        {
          title: "Do not swap the stones",
          body: "**Mathura** is **red sandstone**; **Gandhara** is **grey schist**. An option that gives red sandstone to Gandhara, or phyllite to Mathura, reverses them.",
        },
        {
          title: "Gandhara is the foreign one",
          body: "The **Hellenistic** influence belongs to **Gandhara**. Mathura grew on **indigenous** lines.",
        },
      ],
    },
  ],
};
