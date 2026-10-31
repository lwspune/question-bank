import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HAN_GUPTA_NOTE: SubtopicNote = {
  subtopicName: "The Guptas and Their Successors",
  title: "The Guptas and Their Successors",
  oneLineDefinition:
    "The Gupta kings and their Vakataka allies, the Gupta officers and revenue terms, and the kingdoms that followed: the Maukharis, Pushyabhutis, Maitrakas, Chalukyas and Pallavas.",
  whyItMatters:
    "Twenty-eight questions in the bank: six from the 2023 shifts, ten from the 2024 shifts and 12 from the 2025 shifts, and 23 of them MODERATE or HARD, the hardest page in the chapter. The 2025 papers asked eleven questions on Gupta officers and revenue terms, most of them as match-the-pair; each term has one meaning, so the two tables on this page answer all of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschangu-rulers",
      name: "Gupta kings and the Vakatakas",
      intuition:
        "The Guptas ruled the north for two centuries and made the Vakatakas of the Deccan their in-laws. SSC asks the marriage, the title the kings took, and one inscription with a grim first.",
      definition:
        "The kings, in order: **Chandragupta I**, **Samudragupta** (his conquests are in the **Allahabad Pillar** inscription), **Chandragupta II** (Vikramaditya), Kumaragupta I and Skandagupta.\n\n" +
        "- Gupta kings called themselves **Paramabhagavata**, the supreme devotee of Vishnu, and used the **Garuda** emblem: they were **Vaishnavas**.\n" +
        "- **Chandragupta II** married his daughter **Prabhavatigupta** to the Vakataka king **Rudrasena II**; after Rudrasena's death she ruled as regent.\n" +
        "- The **Vakatakas** were founded by **Vindhyashakti** in the 3rd century CE and ruled **northern Maharashtra and Vidarbha**.\n" +
        "- The **Eran inscription** of **Bhanugupta** (510 CE) is the **earliest inscriptional evidence of sati**.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Gupta king whose daughter married a Vakataka", "Chandragupta II"], pyqExampleId: "161bb47b-8c36-4486-94c1-9548702e4c51" },
          { cells: ["Vakataka king who married Prabhavatigupta", "Rudrasena II"], pyqExampleId: "e4695290-f7db-4189-995b-ed1dc9cf63ca" },
          { cells: ["Founder of the Vakatakas", "Vindhyashakti"], pyqExampleId: "d401c7a4-39b0-4f97-8136-db89a2c46dae" },
          { cells: ["Earliest inscriptional evidence of sati", "Eran inscription, Gupta period"], pyqExampleId: "3259dd46-4ceb-4286-898c-fb2ef2d4819b" },
        ],
      },
      pyqExampleId: "622baf29-bf05-47bd-aa2e-649f638e9024",
      selfCheckExample: {
        prompt: "How were the Guptas and the Vakatakas related, and who ruled the Vakataka kingdom after Rudrasena II died?",
        steps: [
          "Chandragupta II married his daughter Prabhavatigupta to the Vakataka king Rudrasena II.",
          "When Rudrasena II died young, Prabhavatigupta ruled the Vakataka kingdom as regent.",
        ],
        answer: "By marriage; Prabhavatigupta ruled as regent.",
      },
      practiceSet: [
        { prompt: "Which region did the Vakatakas rule?", answer: "Northern Maharashtra and Vidarbha" },
        { prompt: "Which inscription gives the earliest record of sati?", answer: "The Eran inscription of Bhanugupta (510 CE)" },
        { prompt: "Which bird was the Gupta royal emblem?", answer: "Garuda" },
        { prompt: "Which Gupta king's conquests are recorded on the Allahabad Pillar?", answer: "Samudragupta's" },
      ],
      traps: [
        {
          title: "Chandragupta II, not Chandragupta I",
          body: "The Vakataka marriage was arranged by **Chandragupta II**. **Chandragupta I** founded the dynasty a generation earlier.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschangu-officers",
      name: "Gupta officers and the town board",
      intuition:
        "Gupta titles look hard but each one is built from its job. Learn each officer as a pair with his duty: SSC gives four pairs and asks which one is right.",
      definition:
        "At the court:\n" +
        "- **Mahasandhivigrahika**: minister of **peace (sandhi) and war (vigraha)**, in effect the foreign minister. Harishena held it under Samudragupta.\n" +
        "- **Bhandagaradhikrita**: head of the **treasury**.\n" +
        "- **Dhruvadhikaranika**: officer for **land revenue**.\n" +
        "- **Pustapala**: **keeper of records** (land records).\n\n" +
        "In the village: the **gramika** (gramadhyaksha) was the **headman** and the **talavataka** the **village accountant**.\n\n" +
        "In the town, a **board (adhishthanadhikarana)** advised the district officer. Its members: the **nagarashreshthi** (chief of the guilds and bankers), the **sarthavaha** (chief merchant, leader of the trading caravans), the **prathama kulika** (chief artisan) and the **prathama kayastha** (chief scribe).",
      table: {
        columns: ["Officer", "Duty"],
        rows: [
          { cells: ["Mahasandhivigrahika", "Minister of peace and war"] },
          { cells: ["Bhandagaradhikrita", "Treasury"] },
          { cells: ["Pustapala", "Keeper of records"], pyqExampleId: "20efb6f4-5969-4d7e-b444-985986078244" },
          { cells: ["Gramika", "Village headman"], pyqExampleId: "160fea6a-6c33-4c40-a638-813fb72e30d8" },
          { cells: ["Talavataka", "Village accountant"], pyqExampleId: "9401abe5-1476-4da6-ae5a-2f8d1693b16c" },
          { cells: ["Sarthavaha", "Chief merchant, on the town board"], pyqExampleId: "e84d0330-94e4-450f-a0fc-54bbbc044fc6" },
          { cells: ["Adhishthanadhikarana", "Town board of guild, merchant, artisan and scribe"], pyqExampleId: "32a29a37-6bd7-41c6-9e01-87647a292c2b" },
        ],
      },
      pyqExampleId: "c16ab9ae-63b9-4f81-8961-f1333d116225",
      selfCheckExample: {
        prompt: "Name the four members of a Gupta town board and what each represented.",
        steps: [
          "The nagarashreshthi represented the guilds and bankers, and the sarthavaha the merchants.",
          "The prathama kulika represented the artisans, and the prathama kayastha the scribes.",
        ],
        answer: "Nagarashreshthi (guilds), sarthavaha (merchants), prathama kulika (artisans), prathama kayastha (scribes).",
      },
      practiceSet: [
        { prompt: "Which Gupta officer kept the records?", answer: "The Pustapala" },
        { prompt: "Who was the village accountant in Gupta times?", answer: "The talavataka" },
        { prompt: "Which officer headed the Gupta treasury?", answer: "The Bhandagaradhikrita" },
        { prompt: "What did the sarthavaha lead?", answer: "The merchants and trading caravans" },
      ],
      traps: [
        {
          title: "The Pustapala kept records, not taxes",
          body: "SSC pairs the **Pustapala** with tax collection. He was the **keeper of records**; tax collection belonged to others.",
        },
        {
          title: "The town board was civic, not religious or military",
          body: "The **adhishthanadhikarana** brought together a guild head, a merchant, an artisan and a scribe. Options calling it a court, a temple committee or a war council are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschangu-revenue",
      name: "Gupta revenue terms",
      intuition:
        "Gupta land grants list what the villagers owed: a share of the crop, supplies, cash, labour and fines. Each word means one of these. SSC mixes up the meanings and asks which pair is right.",
      definition:
        "The terms:\n" +
        "- **Bhaga**: the **king's share of the produce**, usually one-sixth.\n" +
        "- **Bhoga**: periodic **supplies** of fruit, firewood and flowers to the king.\n" +
        "- **Hiranya**: tax paid in **cash (gold)**.\n" +
        "- **Vishti** (vaishthika): **forced, unpaid labour**.\n" +
        "- **Dasaparadha**: **fines for ten offences**.\n" +
        "- **Adeya**: what is **to be surrendered**, that is, dues owed to the state.\n" +
        "- **Utkhetayita**: a **levy**, a tax.\n" +
        "- **Dhanya** simply means **grain**: it is a decoy in these questions, never a gold tax or labour.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Bhaga", "King's share of produce"] },
          { cells: ["Bhoga", "Supplies of fruit, firewood, flowers"] },
          { cells: ["Hiranya", "Tax in cash (gold)"] },
          { cells: ["Vishti", "Forced labour"], pyqExampleId: "cc16f13e-b40d-4344-83ce-c9d5f4f66035" },
          { cells: ["Dasaparadha", "Fines for ten offences"], pyqExampleId: "8c8f0715-e663-4dcc-afbb-9492a09589c6" },
          { cells: ["Adeya", "Dues to be surrendered"], pyqExampleId: "dadb8294-1793-4475-9d6c-c19268149e4a" },
        ],
      },
      pyqExampleId: "320eacf1-02d1-4899-b394-a3130d9942b8",
      selfCheckExample: {
        prompt: "Which pair is correct: Hiranya with forced labour, Vishti with forced labour, or Dhanya with gold?",
        steps: [
          "Hiranya was tax in cash or gold, not labour.",
          "Dhanya means grain, not gold.",
          "Vishti was forced, unpaid labour, so that pair is right.",
        ],
        answer: "Vishti with forced labour.",
      },
      practiceSet: [
        { prompt: "What was hiranya?", answer: "Tax paid in cash (gold)" },
        { prompt: "What does dasaparadha mean?", answer: "Fines for ten offences" },
        { prompt: "What was bhoga?", answer: "Periodic supplies of fruit, firewood and flowers to the king" },
        { prompt: "What word meant forced, unpaid labour in Gupta records?", answer: "Vishti (vaishthika)" },
      ],
      traps: [
        {
          title: "Bhaga and bhoga are different",
          body: "**Bhaga** is the king's **share of the crop**. **Bhoga** is **supplies** such as fruit and firewood. One vowel separates them, and SSC uses that.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschangu-successors",
      name: "After the Guptas: Harsha and the regional kingdoms",
      intuition:
        "When the Guptas weakened, each region got its own dynasty with its own capital. Learn the dynasty with its capital and one king; the questions ask nothing more.",
      definition:
        "In the north and west:\n" +
        "- **Maukharis**: **Kannauj**, which then replaced Pataliputra as the political centre of the north.\n" +
        "- **Pushyabhutis** (Vardhanas): **Thanesar**. **Prabhakarvardhana** beat the **Hunas**; **Harshavardhana** ruled **606 to 647 CE** and wrote the plays **Nagananda, Ratnavali and Priyadarshika**.\n" +
        "- **Maitrakas**: once Gupta feudatories, they ruled from **Valabhi** in Saurashtra; **Dhruvasena II** was Harsha's son-in-law.\n\n" +
        "In the south:\n" +
        "- **Chalukyas of Badami**: **Pulakeshin II** stopped Harsha on the Narmada and took the title **Dakshinapatheshvara**, lord of the south.\n" +
        "- **Pallavas**: **Kanchipuram**. **Mahendravarman I** wrote the farce **Mattavilasa-prahasana**.\n\n" +
        "Travellers: the Chinese pilgrim **Hsuan Tsang** came in **Harsha's** reign; **Faxian** had come under **Chandragupta II**. Abroad, the **Shailendras** of Java were **Buddhists** who built Borobudur.",
      table: {
        columns: ["Dynasty", "Capital", "King to remember"],
        rows: [
          { cells: ["Maukhari", "Kannauj", "Rulers after the Guptas"], pyqExampleId: "09c1b6bf-fbd5-42ea-b499-e1ffa6aead53" },
          { cells: ["Pushyabhuti", "Thanesar", "Harshavardhana (606 to 647 CE)"], pyqExampleId: "37c0bc9d-bafe-4030-86bb-3cdc6887fd54" },
          { cells: ["Maitraka", "Valabhi", "Dhruvasena II"], pyqExampleId: "f3d7ac01-05b8-4b07-a594-d83d5fe0566b" },
          { cells: ["Chalukya", "Badami", "Pulakeshin II"] },
          { cells: ["Pallava", "Kanchipuram", "Mahendravarman I"], pyqExampleId: "82c11780-8d5b-4c48-8af1-1e5caf0f213a" },
        ],
      },
      pyqExampleId: "0ad4ca73-fe84-4a7a-a0e2-fc2a364ada5e",
      selfCheckExample: {
        prompt: "Two Chinese pilgrims came to India two centuries apart. Under which king did each come?",
        steps: ["Faxian came in the reign of the Gupta king Chandragupta II.", "Hsuan Tsang came in the reign of Harshavardhana."],
        answer: "Faxian under Chandragupta II; Hsuan Tsang under Harshavardhana.",
      },
      practiceSet: [
        { prompt: "What was the capital of the Maitrakas?", answer: "Valabhi" },
        { prompt: "Which city did the Maukharis rule from?", answer: "Kannauj" },
        { prompt: "Which people did Prabhakarvardhana defeat?", answer: "The Hunas" },
        { prompt: "Which religion did the Shailendra kings of Java follow?", answer: "Buddhism" },
        { prompt: "Name one play written by Harshavardhana.", answer: "Nagananda, Ratnavali or Priyadarshika" },
      ],
      traps: [
        {
          title: "Vikramorvasiyam is Kalidasa's",
          body: "Harsha wrote **Nagananda, Ratnavali and Priyadarshika**. **Vikramorvasiyam** is **Kalidasa's**, and is the odd one out.",
        },
        {
          title: "Thanesar for the Pushyabhutis, Kannauj for the Maukharis",
          body: "The **Pushyabhutis** began at **Thanesar**; **Kannauj** was the **Maukhari** capital (Harsha later ruled from it too).",
        },
      ],
    },
  ],
};
