import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_POSTMAURYA_NOTE: SubtopicNote = {
  subtopicName: "Post-Mauryan Kingdoms and the Sangam Age",
  title: "Post-Mauryan Kingdoms and the Sangam Age",
  oneLineDefinition:
    "The dynasties between the Mauryas and the Guptas: the Shungas, the Shakas, Parthians and Kushanas in the north, the Satavahanas in the Deccan, and the Sangam kingdoms of the far south.",
  whyItMatters:
    "Eleven questions in the bank: three from the 2023 shifts, seven from the 2024 shifts and one from the 2025 shifts, two of them HARD. Each asks a dynasty for a king, a title or an inscription, so one table per region does the work.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschanpm-north",
      name: "Shungas, Shakas, Parthians and Kushanas",
      intuition:
        "After the Mauryas fell, a Brahmin general took Magadha and a string of foreign peoples ruled the north-west. Each is remembered by one king and one record: an inscription, a title or a council.",
      definition:
        "In time order:\n" +
        "- **Shungas**: founded by **Pushyamitra Shunga**, who killed the last Mauryan king Brihadratha and performed Ashvamedha sacrifices. The last Shunga, **Devabhuti**, was killed by his minister **Vasudeva Kanva**, who founded the **Kanva** dynasty.\n" +
        "- **Shakas** (Western Kshatrapas): **Rudradaman I** repaired the **Sudarshana lake** in Kathiawar, as his **Junagadh (Girnar)** inscription of about 150 CE records.\n" +
        "- **Parthians (Pahlavas)**: the **Takht-i-Bahi** inscription from **Mardan**, near Peshawar, names their king **Gondophernes**.\n" +
        "- **Kushanas**: **Kanishka** patronised Buddhism and held the **Fourth Buddhist Council**; **Vasudeva I**, the last great Kushana, issued **gold dinars** and copper coins. Kushana kings took the title **Devaputra**, son of god.",
      table: {
        columns: ["Dynasty", "King to remember", "Fact"],
        rows: [
          { cells: ["Shunga", "Pushyamitra (first), Devabhuti (last)", "Began when Pushyamitra killed the last Mauryan king"], pyqExampleId: "4e11615c-b2b9-4c7d-8b98-43ff546fa766" },
          { cells: ["Shaka", "Rudradaman I", "Repaired the Sudarshana lake"], pyqExampleId: "7f7c7421-8f8d-4f7d-9db5-c2e458cd1dfd" },
          { cells: ["Parthian", "Gondophernes", "Takht-i-Bahi inscription, Mardan"], pyqExampleId: "03246260-bcdd-4836-a78a-521710e7a6dc" },
          { cells: ["Kushana", "Kanishka", "Fourth Buddhist Council"], pyqExampleId: "f24632bb-9487-4936-b567-cc2a4beb4ddc" },
          { cells: ["Kushana", "Vasudeva I", "Gold dinars and copper coins"], pyqExampleId: "6cc8f382-d42c-4fb6-b0f4-2cfd2eddafc7" },
        ],
      },
      pyqExampleId: "f6b9460c-8495-44e8-b22b-6cc6660b10a9",
      selfCheckExample: {
        prompt: "How did the Shunga dynasty begin and end?",
        steps: [
          "It began when Pushyamitra Shunga killed Brihadratha, the last Mauryan king.",
          "It ended when the last Shunga, Devabhuti, was killed by his minister Vasudeva Kanva, who founded the Kanva dynasty.",
        ],
        answer: "Begun by Pushyamitra (killing Brihadratha); ended with Devabhuti, killed by Vasudeva Kanva.",
      },
      practiceSet: [
        { prompt: "Which Shaka ruler repaired the Sudarshana lake?", answer: "Rudradaman I" },
        { prompt: "Which dynasty's rule does the Takht-i-Bahi inscription show?", answer: "The Parthians (Pahlavas)" },
        { prompt: "Who was the last Shunga king?", answer: "Devabhuti" },
        { prompt: "Which Kushana king held the Fourth Buddhist Council?", answer: "Kanishka" },
      ],
      traps: [
        {
          title: "Devabhuti, not Bhavabhuti",
          body: "**Devabhuti** was the last Shunga king. **Bhavabhuti** was a Sanskrit playwright, put in the options because the names look alike.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanpm-south",
      name: "Satavahanas and the Sangam kingdoms",
      intuition:
        "In the Deccan the Satavahanas ruled for three centuries; further south three Tamil kingdoms ruled in the age of the Sangam poems. SSC asks the great king, the capital and the poets.",
      definition:
        "**Satavahanas** (Deccan):\n" +
        "- Their greatest king was **Gautamiputra Satakarni**. His mother **Gautami Balashri's Nasik inscription** lists his titles and his defeat of the Shaka ruler Nahapana.\n" +
        "- Their kingdom was divided into districts called **aharas** (or rashtras).\n\n" +
        "**Sangam kingdoms** (far south): the **Cheras**, the **Cholas** (Uraiyur and the port Puhar) and the **Pandyas**, whose capital was **Madurai**. Megasthenes first mentioned the Pandyas, famous for pearls.\n\n" +
        "**Tamil works**: the **Silappathikaram** (the Jewelled Anklet), the earliest Tamil epic, by **Ilango Adigal**; its sequel the **Manimekalai**, by **Sittalai Sattanar**.",
      table: {
        columns: ["Kingdom or work", "Fact"],
        rows: [
          { cells: ["Satavahana", "Gautamiputra Satakarni; districts called aharas"], pyqExampleId: "3f67c817-8b80-4a4c-95a3-0d9e1ef31903" },
          { cells: ["Pandya", "Capital Madurai; famous for pearls"], pyqExampleId: "16518251-8615-4fe5-86e9-38a0070650d9" },
          { cells: ["Chola", "Uraiyur and the port Puhar"] },
          { cells: ["Silappathikaram", "Ilango Adigal"], pyqExampleId: "0fd4c5f6-491b-4e29-8c88-73ecda1b5ea1" },
          { cells: ["Manimekalai", "Sittalai Sattanar"] },
        ],
      },
      pyqExampleId: "550521c7-0bff-4f99-a486-f192ee4f01c4",
      selfCheckExample: {
        prompt: "Name the earliest Tamil epic, its poet, and the poem that continues its story.",
        steps: [
          "The Silappathikaram, the story of Kannagi and Kovalan, is the earliest Tamil epic.",
          "Ilango Adigal wrote it, and Sittalai Sattanar's Manimekalai continues it.",
        ],
        answer: "Silappathikaram by Ilango Adigal; continued in the Manimekalai.",
      },
      practiceSet: [
        { prompt: "What was the capital of the Pandyas?", answer: "Madurai" },
        { prompt: "Into what units was the Satavahana kingdom divided?", answer: "Aharas (rashtras), that is, districts" },
        { prompt: "Whose inscription at Nasik records Gautamiputra Satakarni's deeds?", answer: "His mother Gautami Balashri's" },
        { prompt: "Who wrote the Silappathikaram?", answer: "Ilango Adigal" },
      ],
      traps: [
        {
          title: "Thanjavur is a later Chola capital",
          body: "The Sangam Cholas ruled from **Uraiyur** and **Puhar**. **Thanjavur** was the capital of the later Cholas, and is a wrong option for the Pandyas' Madurai.",
        },
      ],
    },
  ],
};
