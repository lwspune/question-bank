import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_VEDIC_NOTE: SubtopicNote = {
  subtopicName: "Vedic Age",
  title: "Vedic Age",
  oneLineDefinition:
    "Rig Vedic tribes, rivers, grains and crafts; the hymns, goddesses and Upanishad stories CDS asks about; and the eight forms of marriage in the law books.",
  whyItMatters:
    "Eight questions, four of them MODERATE and three HARD. CDS asks Vedic words more than Vedic events: the name of a river, a grain, a craft, a goddess or a hymn. A short vocabulary list covers most of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-rigvedic-life",
      name: "Rig Vedic tribes, rivers and economy",
      intuition:
        "The early Aryans of the Rig Veda were mostly cattle herders who also grew a little grain. " +
        "Their leader, the rajan, led a tribe in war; he did not rule a fixed territory, so there was no State in the full sense yet.",
      definition:
        "- The early Aryans were **pastoral**: wealth was counted in **cattle**.\n" +
        "- The **rajan** was a **tribal chief** and war leader who ruled over his **people (jana)**, not over a fixed area. So historians say the Rig Vedic Aryans had **no State**.\n" +
        "- The **Battle of Ten Kings** (Dasarajna): **Sudas** of the **Bharata** tribe defeated ten tribes on the banks of the **Parushni**, the modern **Ravi**.\n" +
        "- Other Rig Vedic river names: **Shutudri** is the Sutlej, **Vitasta** the Jhelum, **Asikni** the Chenab, **Vipas** the Beas.\n" +
        "- The Rig Veda's words for cereals are **yava** (barley) and **dhanya** (grain). **Vrihi** (rice) and **godhuma** (wheat) appear in **later Vedic** texts.\n" +
        "- Crafts had names: the **ishukrit** or **ishukara** was the **arrow maker**.",
      table: {
        columns: ["Vedic word", "Meaning"],
        rows: [
          {
            cells: ["Rajan", "Tribal chief and war leader, ruling a people, not a territory"],
            pyqExampleId: "70bfa3c0-66c1-47f8-82ca-66be7a80311d",
          },
          { cells: ["Parushni", "The Ravi river"] },
          { cells: ["Shutudri", "The Sutlej river"] },
          { cells: ["Vitasta", "The Jhelum river"] },
          {
            cells: ["Yava", "Barley"],
            noteAmber: "CDS 2024 (II): yava and dhanya were the Rig Vedic words for cereals.",
            pyqExampleId: "0e0d01eb-ddb2-45cd-91d8-8bc8d562630a",
          },
          { cells: ["Vrihi and godhuma", "Rice and wheat, named in later Vedic texts"] },
          {
            cells: ["Ishukrit or ishukara", "Arrow maker"],
            pyqExampleId: "3fd7f69e-2806-4853-9059-f03045be4583",
          },
        ],
      },
      pyqExampleId: "5f8c5f7c-d14c-4904-b212-472b5b7fe711",
      selfCheckExample: {
        prompt: "Why do historians say the Rig Vedic Aryans did not have a State?",
        steps: [
          "A State needs rule over a fixed territory.",
          "The rajan was a tribal war leader whose authority was over his people, the jana, not over land with fixed borders.",
        ],
        answer: "Because the rajan ruled a tribe, not a territory.",
      },
      practiceSet: [
        { prompt: "What is the modern name of the Shutudri river?", answer: "The Sutlej" },
        { prompt: "What did the ishukrit make in Rig Vedic times?", answer: "Arrows" },
        { prompt: "Name the later Vedic words for rice and wheat.", answer: "Vrihi (rice) and godhuma (wheat)" },
        { prompt: "Which river is the Vitasta?", answer: "The Jhelum" },
      ],
      traps: [
        {
          title: "Parushni is the Ravi",
          body: "The Battle of Ten Kings was fought on the Parushni, the modern Ravi. The Sarasvati, the Drishadvati and the Shutudri (Sutlej) are other Rig Vedic rivers.",
        },
        {
          title: "Rice and wheat are later Vedic words",
          body: "The Rig Veda names only yava (barley) and dhanya (grain). Vrihi and godhuma appear in the later Vedic texts, after settlement moved into the Ganga valley.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-vedic-texts",
      name: "Hymns, goddesses and Upanishad stories",
      intuition:
        "The Rig Veda has ten books (mandalas); the tenth is one of the latest and holds famous hymns on society and marriage. " +
        "Each Vedic goddess has one job, and CDS swaps the jobs around in the options.",
      definition:
        "- The **Purusha Sukta** (Rig Veda 10.90) gives the origin of the **four varnas**.\n" +
        "- The **Surya Sukta** (Rig Veda 10.85) tells of the marriage of Surya, daughter of the Sun, and is the Vedic **wedding hymn**.\n" +
        "- **Dana stutis** are hymns in praise of **gifts**.\n" +
        "- Goddesses: **Ushas** is the **dawn**; **Aditi** the **mother of the gods** (the Adityas); **Vak** is **speech**; **Sinivali** grants **children**; **Raka** is the **full moon**.\n" +
        "- In the Upanishads, **Shvetaketu** questions his father **Uddalaka Aruni** (Chandogya Upanishad), and **Nachiketa** questions **Yama**, the god of death (Katha Upanishad). Both stories praise **asking questions in search of knowledge**.",
      table: {
        columns: ["Name", "What to remember"],
        rows: [
          { cells: ["Purusha Sukta", "Rig Veda 10.90: origin of the four varnas"] },
          {
            cells: ["Surya Sukta", "Rig Veda 10.85: the wedding hymn"],
            noteAmber: "CDS 2018 (I): the hymn of the 10th Mandala on marriage.",
            pyqExampleId: "56a64312-89ba-4308-ac07-935d6b923086",
          },
          { cells: ["Ushas", "Goddess of the dawn"] },
          { cells: ["Aditi", "Mother of the gods"] },
          { cells: ["Vak", "Goddess of speech"] },
          { cells: ["Sinivali", "Goddess who grants children"] },
          {
            cells: ["Shvetaketu and Nachiketa", "Upanishad seekers who asked questions to gain knowledge"],
            pyqExampleId: "388d34e7-4bf4-4e9c-b341-b79944a58e7f",
          },
        ],
      },
      pyqExampleId: "83e94771-6889-4052-a557-63c20f7b91b7",
      selfCheckExample: {
        prompt: "What lesson do the stories of Shvetaketu and Nachiketa share?",
        steps: [
          "Shvetaketu keeps questioning his father; Nachiketa keeps questioning Yama himself.",
          "Neither simply accepts what he is told.",
        ],
        answer: "Knowledge is won by asking questions.",
      },
      practiceSet: [
        { prompt: "Which Rig Vedic hymn explains the origin of the four varnas?", answer: "The Purusha Sukta" },
        { prompt: "Whom does Nachiketa question in the Katha Upanishad?", answer: "Yama, the god of death" },
        { prompt: "In which Mandala of the Rig Veda is the Purusha Sukta?", answer: "The 10th Mandala" },
        { prompt: "What do the dana stutis of the Rig Veda praise?", answer: "Gifts" },
      ],
      traps: [
        {
          title: "Ushas is the dawn, not Aditi",
          body: "Ushas is the goddess of the dawn. Aditi is the mother of the gods, and speech belongs to Vak, not Raka.",
        },
        {
          title: "Surya Sukta for marriage, Purusha Sukta for varnas",
          body: "The marriage hymn of the 10th Mandala is the Surya Sukta. The Purusha Sukta, also in the 10th Mandala, is about the origin of the four varnas.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-marriage",
      name: "The eight forms of marriage",
      intuition:
        "The Dharmashastras listed eight ways a marriage could happen, from a father's formal gift of his daughter to a girl carried off by force. " +
        "The first four were approved and the last four condemned.",
      definition:
        "- The law books list **eight forms** of marriage.\n" +
        "- **Brahma, Daiva, Arsha and Prajapatya** were the four **approved** forms.\n" +
        "- **Asura**: marriage by **purchase**. **Gandharva**: marriage by **mutual love**. **Rakshasa**: marriage by **capture**. **Paishacha**: marriage by **seduction or trickery**. These four were **condemned**.",
      table: {
        columns: ["Form", "Meaning"],
        rows: [
          { cells: ["Brahma", "The father gives his daughter to a learned man of good conduct"] },
          { cells: ["Daiva", "The daughter is given to a priest during a sacrifice"] },
          { cells: ["Arsha", "The groom gives the bride's father a cow and a bull"] },
          { cells: ["Prajapatya", "The couple are blessed to follow dharma together"] },
          { cells: ["Asura", "Marriage by purchase"] },
          { cells: ["Gandharva", "Marriage by mutual love"] },
          { cells: ["Rakshasa", "Marriage by capture"] },
          { cells: ["Paishacha", "Marriage by seduction or trickery"] },
        ],
      },
      pyqExampleId: "66a0218b-ed86-4c54-942e-d98eebc58690",
      selfCheckExample: {
        prompt: "Of the eight forms of marriage, which did the Dharmashastras approve?",
        steps: [
          "The list runs from the most to the least approved.",
          "The first four involve a proper gift of the bride; the last four involve money, love alone, force or trickery.",
        ],
        answer: "Brahma, Daiva, Arsha and Prajapatya.",
      },
      practiceSet: [
        { prompt: "Which form of marriage is marriage by purchase?", answer: "Asura" },
        { prompt: "Which form of marriage is marriage by mutual love?", answer: "Gandharva" },
        { prompt: "How many forms of marriage do the Dharmashastras list?", answer: "Eight" },
      ],
      traps: [
        {
          title: "Asura buys, Rakshasa seizes",
          body: "Asura marriage is by purchase; Rakshasa marriage is by capture, often in war; Paishacha is by seduction. CDS offers all three as options for one another.",
        },
      ],
    },
  ],
};
