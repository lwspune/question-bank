import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_LITERATURE_NOTE: SubtopicNote = {
  subtopicName: "Ancient Indian Literature and Inscriptions",
  title: "Ancient Indian Literature and Inscriptions",
  oneLineDefinition:
    "The Sanskrit and Tamil works SSC asks about with their authors, the medical texts, and the great inscriptions: whose they are, where they stand and what script they use.",
  whyItMatters:
    "Eleven questions in the bank: three from the 2023 shifts, five from the 2024 shifts and three from the 2025 shifts. Each one asks for a work's author, an inscription's king or place, or a script, so the two tables are the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschanli-books",
      name: "Books and their authors",
      intuition:
        "SSC lists four writers and asks who wrote one book, or lists four books and asks which one a writer did not write. Learn each writer with all the works of theirs that appear in the options.",
      definition:
        "Sanskrit:\n" +
        "- **Panini**: the **Ashtadhyayi**, on **Sanskrit grammar**.\n" +
        "- **Shudraka**: the play **Mrichchhakatika** (The Little Clay Cart).\n" +
        "- **Kalidasa**: **Abhijnanashakuntalam**, **Vikramorvasiyam** and the Meghaduta. **Bhasa**: Svapnavasavadattam. **Amarasimha**: the lexicon Amarakosha.\n" +
        "- **Harshavardhana**: the plays **Nagananda, Ratnavali and Priyadarshika**.\n" +
        "- **Mahendravarman I** (Pallava): the farce **Mattavilasa-prahasana**.\n\n" +
        "Tamil: the **Tolkappiyam**, by **Tolkappiyar**, a work on grammar, is the **earliest Tamil** text.\n\n" +
        "Medicine: **Charaka** (Charaka Samhita, medicine), **Sushruta** (Sushruta Samhita, surgery) and **Vagbhata** (**Ashtanga Sangraha** and Ashtanga Hridaya).",
      table: {
        columns: ["Work", "Author", "Subject"],
        rows: [
          { cells: ["Ashtadhyayi", "Panini", "Sanskrit grammar"], pyqExampleId: "396c4f5f-476f-46f1-a990-36afbeed54e0" },
          { cells: ["Mrichchhakatika", "Shudraka", "Play"], pyqExampleId: "5d8871b8-8541-4a05-b14a-852e82192007" },
          { cells: ["Nagananda, Ratnavali, Priyadarshika", "Harshavardhana", "Plays"], pyqExampleId: "c5af9900-1d71-4b5e-ab57-769b1527e83b" },
          { cells: ["Mattavilasa-prahasana", "Mahendravarman I", "Farce"], pyqExampleId: "60f1f73f-6eb2-4fad-bcd9-564766909af2" },
          { cells: ["Tolkappiyam", "Tolkappiyar", "Tamil grammar"], pyqExampleId: "41ba67a6-9e95-45f6-9a12-dadebed8537d" },
          { cells: ["Sushruta Samhita", "Sushruta", "Surgery"] },
        ],
      },
      pyqExampleId: "74d99178-ca6e-45df-b1f7-30eb4a984b66",
      selfCheckExample: {
        prompt: "Which of these plays is NOT by Kalidasa: Abhijnanashakuntalam, Ratnavali, Vikramorvasiyam?",
        steps: ["Abhijnanashakuntalam and Vikramorvasiyam are both Kalidasa's.", "Ratnavali was written by Harshavardhana."],
        answer: "Ratnavali, by Harshavardhana.",
      },
      practiceSet: [
        { prompt: "What is Panini's Ashtadhyayi about?", answer: "Sanskrit grammar" },
        { prompt: "Who wrote the Mrichchhakatika?", answer: "Shudraka" },
        { prompt: "Which is the earliest surviving Tamil text?", answer: "The Tolkappiyam, by Tolkappiyar" },
        { prompt: "Which Pallava king wrote the Mattavilasa-prahasana?", answer: "Mahendravarman I" },
        { prompt: "Which ancient medical text deals with surgery?", answer: "The Sushruta Samhita" },
      ],
      traps: [
        {
          title: "Bhaskaracharya was a mathematician",
          body: "In a question on Ayurvedic texts, **Bhaskaracharya** is the decoy: he wrote on **mathematics and astronomy**. The medical writers are Charaka, Sushruta and Vagbhata.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschanli-inscriptions",
      name: "Inscriptions and scripts",
      intuition:
        "Inscriptions are dated, named records cut in stone, so historians trust them. SSC asks which king an inscription belongs to, where it is, and which one was the first of its kind.",
      definition:
        "Ashoka's edicts:\n" +
        "- Mostly in **Prakrit** in the **Brahmi** script. In the north-west some use **Kharosthi**; in Afghanistan, Greek and Aramaic.\n" +
        "- The **Maski** edict, in **Raichur district, Karnataka**, is the first that names him as Ashoka.\n\n" +
        "Later inscriptions:\n" +
        "- **Junagadh (Girnar)**, about 150 CE: **Rudradaman I** (Shaka). It records his repair of the **Sudarshana lake** and is the **first long royal inscription in chaste Sanskrit**.\n" +
        "- **Allahabad (Prayag) Pillar**: **Samudragupta's** conquests, composed by **Harisena**; a main source for the **Guptas**.\n" +
        "- **Nasik**: the Satavahana Gautamiputra Satakarni, by his mother Gautami Balashri.\n" +
        "- **Aihole**: the Chalukya **Pulakeshin II**. **Hathigumpha**: **Kharavela** of Kalinga.",
      table: {
        columns: ["Inscription", "King or dynasty", "Remember for"],
        rows: [
          { cells: ["Maski", "Ashoka", "Names him as Ashoka; in Karnataka"], pyqExampleId: "66296460-7f8b-45c4-bb60-bf9a0cf1fb61" },
          { cells: ["Junagadh (Girnar)", "Rudradaman I", "First long inscription in chaste Sanskrit"], pyqExampleId: "c5cdb5a8-24a9-4fdb-9363-17403b04fbba" },
          { cells: ["Allahabad Pillar", "Samudragupta", "His conquests; by Harisena"] },
          { cells: ["Nasik", "Satavahanas", "Gautamiputra Satakarni's deeds"] },
          { cells: ["Aihole", "Pulakeshin II", "Chalukyas of Badami"] },
          { cells: ["Hathigumpha", "Kharavela", "Kalinga"] },
        ],
      },
      pyqExampleId: "a356acbc-9942-4832-8f49-803f0ddc353d",
      selfCheckExample: {
        prompt: "Which inscription records the repair of the Sudarshana lake, and why is it famous apart from that?",
        steps: [
          "The Junagadh (Girnar) inscription of the Shaka ruler Rudradaman I records the repair.",
          "It is also the first long royal inscription composed in chaste Sanskrit.",
        ],
        answer: "Rudradaman's Junagadh (Girnar) inscription; the first long royal inscription in chaste Sanskrit.",
      },
      practiceSet: [
        { prompt: "In which script are most of Ashoka's inscriptions written?", answer: "Brahmi" },
        { prompt: "In which present state is the Maski inscription?", answer: "Karnataka" },
        { prompt: "Whose achievements does the Hathigumpha inscription record?", answer: "Kharavela of Kalinga" },
        { prompt: "Who composed the Allahabad Pillar inscription?", answer: "Harisena" },
      ],
      traps: [
        {
          title: "Kharosthi only in the north-west",
          body: "Ashoka's edicts in **Kharosthi** are found only in the **north-west**. The script of nearly all the rest is **Brahmi**.",
        },
      ],
    },
  ],
};
