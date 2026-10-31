import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_CULTURE_NOTE: SubtopicNote = {
  subtopicName: "India After 1947 and Culture",
  title: "India After 1947 and Culture",
  oneLineDefinition:
    "India's first years as a republic, its shortest-serving Prime Ministers and JP's Total Revolution, and the writers, newspapers, musicians and buildings of the colonial age.",
  whyItMatters:
    "Eighteen questions in the bank: four from the 2023 shifts, eight from the 2024 shifts and six from the 2025 shifts, and nine of them MODERATE or HARD, the highest share on any page of this chapter. They are hard because they leave the textbook's main line: a postage stamp, a music notation, a style of arch. Read the tables once and these become quick marks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmoaf-after",
      name: "India after 1947",
      intuition:
        "After independence the questions are about firsts and records: the first Republic Day guest, the first state made on the basis of language, the shortest time anyone was Prime Minister.",
      definition:
        "The facts:\n" +
        "- **Princely states**: their rulers' hopes of staying independent were undercut above all by their own **people's movements** (the Praja Mandals) demanding accession to India.\n" +
        "- **First Republic Day (26 January 1950)**: the chief guest was **Sukarno**, President of **Indonesia**.\n" +
        "- **Potti Sriramulu** fasted unto death for a Telugu-speaking state and died in **December 1952**; **Andhra State (1953)** became the first state formed on the basis of language.\n" +
        "- **Wheat Revolution**: in **1968** a special postage stamp of that name marked the Green Revolution's record wheat crop.\n" +
        "- **Jayaprakash Narayan (Lok Nayak)** led the **Total Revolution (1974)**: a **non-violent** call for social, political, economic and educational change, against corruption and for the decentralisation of power.\n" +
        "- **Shortest-serving Prime Ministers**: **Gulzarilal Nanda**, interim Prime Minister for **13 days** twice (1964 and 1966). **Atal Bihari Vajpayee's** first term (1996) lasted **16 days** and **Charan Singh's** (1979 to 1980) about five and a half months. **Chandra Shekhar** (1990 to 1991, about seven months) served less than Deve Gowda, Gujral or V. P. Singh.",
      table: {
        columns: ["Person or event", "Year", "Fact"],
        rows: [
          { cells: ["First Republic Day chief guest", "1950", "Sukarno of Indonesia"], pyqExampleId: "f7403dff-357f-4df2-a130-518dde596fcf" },
          { cells: ["Potti Sriramulu's fast", "1952", "Led to Andhra State, the first linguistic state"], pyqExampleId: "bc27ea6d-23e1-49f1-8d3a-f388214b71ae" },
          { cells: ["Wheat Revolution stamp", "1968", "Marked the Green Revolution"], pyqExampleId: "c1224a2e-b295-41bf-a007-8eb4f8974b14" },
          { cells: ["Total Revolution", "1974", "Jayaprakash Narayan (Lok Nayak)"], pyqExampleId: "a13c0fec-df1c-4b14-9ff4-e5050716e557" },
          { cells: ["Gulzarilal Nanda", "1964 and 1966", "Interim Prime Minister, 13 days each time"], pyqExampleId: "30d67052-6a18-49ab-bf29-297eb3bdf472" },
          { cells: ["Chandra Shekhar", "1990 to 1991", "About seven months as Prime Minister"], pyqExampleId: "6c68d73e-906b-47ed-8c01-9c787932d54d" },
        ],
      },
      pyqExampleId: "13a07db6-3f1b-409b-b4b3-a90e5c51f0c2",
      selfCheckExample: {
        prompt: "Put these Prime Ministers in order of how long they served, shortest first: Charan Singh, Gulzarilal Nanda, Chandra Shekhar, Vajpayee in 1996.",
        steps: [
          "Gulzarilal Nanda: 13 days each time he was interim Prime Minister.",
          "Vajpayee's first term in 1996: 16 days.",
          "Charan Singh: about five and a half months. Chandra Shekhar: about seven months.",
        ],
        answer: "Nanda, Vajpayee (1996), Charan Singh, Chandra Shekhar.",
      },
      practiceSet: [
        { prompt: "Which leader is called Lok Nayak?", answer: "Jayaprakash Narayan" },
        { prompt: "Who was the chief guest at India's first Republic Day?", answer: "Sukarno, President of Indonesia" },
        { prompt: "Whose fast unto death led to the first state formed on the basis of language?", answer: "Potti Sriramulu's" },
        { prompt: "What was the special postage stamp of 1968 for the Green Revolution called?", answer: "Wheat Revolution" },
      ],
      traps: [
        {
          title: "Total Revolution was non-violent",
          body: "JP's movement rejected **armed struggle**, and its economics was Gandhian and decentralised, not **privatisation**. Statements claiming either are false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoaf-writers",
      name: "Writers, newspapers and music",
      intuition:
        "Culture questions pair a work with its maker: a newspaper with its founder, a play or a novel with its author, a school with its founder and year. Learn the pairs in the table.",
      definition:
        "In time order:\n" +
        "- **Hicky's Bengal Gazette (1780)**, Calcutta: India's first newspaper, by **James Augustus Hicky**.\n" +
        "- **Nil Darpan (1860)**: **Dinabandhu Mitra's** Bengali play on the indigo planters' cruelty.\n" +
        "- **Anandamath (1882)**: **Bankim Chandra Chattopadhyay's** novel, which contains **Vande Mataram**, the national song.\n" +
        "- **Shantiniketan school (1901)**: **Rabindranath Tagore**; it grew into **Visva-Bharati (1921)**. His father Debendranath had set up the ashram there earlier.\n" +
        "- **Nobel Prize in Literature (1913)**: **Tagore**, for **Gitanjali**, the first Asian to win a Nobel.\n" +
        "- **Vishnu Narayan Bhatkhande**: a notation system for Hindustani classical music, and the compositions recorded in the **Kramik Pustak Malika**.\n" +
        "- **Bhupen Hazarika**: singer and composer from **Assam**; Bharat Ratna (2019).\n" +
        "- **Sekhar Bandyopadhyay**: **From Plassey to Partition**, a history of modern India.",
      table: {
        columns: ["Work or institution", "Year", "By"],
        rows: [
          { cells: ["Hicky's Bengal Gazette", "1780", "James Augustus Hicky"], pyqExampleId: "2e7b85d9-d5a7-4189-b58c-eb170dc0a62e" },
          { cells: ["Nil Darpan", "1860", "Dinabandhu Mitra"], pyqExampleId: "a11ada54-e298-429d-a7c9-c6b0cbd0c8c8" },
          { cells: ["Anandamath", "1882", "Bankim Chandra Chattopadhyay"], pyqExampleId: "e88d9cb2-381f-473f-9c29-c9c68f3394d0" },
          { cells: ["Shantiniketan school", "1901", "Rabindranath Tagore"], pyqExampleId: "5e208da8-4e30-49e8-bda6-06d750e6fcb8" },
          { cells: ["Gitanjali (Nobel Prize)", "1913", "Rabindranath Tagore"], pyqExampleId: "4652c0fd-7103-4210-b675-96cc6beb6713" },
          { cells: ["From Plassey to Partition", "2004", "Sekhar Bandyopadhyay"], pyqExampleId: "fa843eb3-0210-4ea6-8195-74d2ee945630" },
        ],
      },
      pyqExampleId: "c836beab-6b5d-4a34-b227-bbdc74beee0e",
      selfCheckExample: {
        prompt: "Name the first newspaper in India and the novel that contains Vande Mataram, with their authors.",
        steps: [
          "The first newspaper was Hicky's Bengal Gazette (1780), by James Augustus Hicky.",
          "Vande Mataram is in Anandamath (1882), by Bankim Chandra Chattopadhyay.",
        ],
        answer: "Hicky's Bengal Gazette (Hicky); Anandamath (Bankim Chandra Chattopadhyay).",
      },
      practiceSet: [
        { prompt: "Who wrote the play Nil Darpan?", answer: "Dinabandhu Mitra" },
        { prompt: "For which work did Tagore win the Nobel Prize in 1913?", answer: "Gitanjali" },
        { prompt: "From which state was Bhupen Hazarika?", answer: "Assam" },
        { prompt: "In which year did Tagore found his school at Shantiniketan?", answer: "1901" },
      ],
      traps: [
        {
          title: "Rabindranath founded the school, Debendranath the ashram",
          body: "**Rabindranath Tagore** founded the **school** at Shantiniketan in **1901**. His father **Debendranath** had set up the **ashram** there decades before.",
        },
        {
          title: "Anandamath is Bankim's, not Rabindranath's",
          body: "**Vande Mataram** (national song) is from **Bankim's** Anandamath. **Jana Gana Mana** (national anthem) is **Rabindranath Tagore's**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoaf-architecture",
      name: "Colonial architecture",
      intuition:
        "The British built their public buildings in three borrowed styles. SSC gives a statement about a style's features and asks whether it is true, so know which features belong to which style and where they came from.",
      definition:
        "The three styles:\n" +
        "- **Neo-classical**: columns and triangular pediments copied from ancient Greece and Rome. Example: the **Town Hall, Bombay**.\n" +
        "- **Neo-Gothic (Gothic revival)**: **pointed arches**, **ribbed vaults**, spires and fine detail, taken from **medieval European cathedrals**. Examples: **Victoria Terminus** and the **Bombay High Court**.\n" +
        "- **Indo-Saracenic**: Indian domes, chhatris and arches mixed with European plans. Example: the **Gateway of India**.\n\n" +
        "Public buildings stood on raised foundation platforms, with lime-mortar masonry, and carried arches, domes and long colonnaded verandas.",
      table: {
        columns: ["Style", "Features", "Example"],
        rows: [
          { cells: ["Neo-classical", "Greek and Roman columns, pediments", "Town Hall, Bombay"] },
          { cells: ["Neo-Gothic", "Pointed arches, ribbed vaults, spires", "Victoria Terminus, Bombay High Court"] },
          { cells: ["Indo-Saracenic", "Indian domes and chhatris with European plans", "Gateway of India"] },
        ],
      },
      pyqExampleId: "d6659eda-823d-4525-922f-628f74437691",
      selfCheckExample: {
        prompt: "A building in Bombay has pointed arches, ribbed vaults and spires. Which style is it, and where did those features come from?",
        steps: ["Pointed arches, ribbed vaults and spires are the marks of the Gothic style.", "They were taken from the medieval cathedrals of Europe and revived in the 19th century."],
        answer: "Neo-Gothic (Gothic revival); from medieval European cathedrals.",
      },
      practiceSet: [
        { prompt: "In which style is the Victoria Terminus in Bombay built?", answer: "Neo-Gothic (Gothic revival)" },
        { prompt: "In which style is the Gateway of India built?", answer: "Indo-Saracenic" },
        { prompt: "From which ancient civilisations did the neo-classical style borrow its columns?", answer: "Greece and Rome" },
      ],
      traps: [
        {
          title: "Gothic features are European, not new",
          body: "Pointed arches and ribbed vaults were the **hallmarks of medieval European cathedrals**. A reason saying they were unknown there is false.",
        },
      ],
    },
  ],
};
