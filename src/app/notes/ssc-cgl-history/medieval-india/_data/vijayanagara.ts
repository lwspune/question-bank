import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HME_VIJAYANAGARA_NOTE: SubtopicNote = {
  subtopicName: "Vijayanagara Empire",
  title: "Vijayanagara Empire",
  oneLineDefinition:
    "Vijayanagara's kings and visitors, its battle of Talikota, the titles and the people of the empire, and the Bahmani kingdom and the five Deccan sultanates that faced it.",
  whyItMatters:
    "Fifteen questions in the bank: 12 from the 2023 shifts and three from the 2025 shifts, and 12 of the 15 MODERATE or HARD. Most come straight from the NCERT Class 12 chapter on Vijayanagara: the amara-nayakas, the kudirai chettis, the three kinds of pati, and Krishnadeva Raya's book.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmevj-kings",
      name: "Kings, visitors and Talikota",
      intuition:
        "Vijayanagara lasted two centuries in the south. SSC asks about its greatest king, the foreign visitors who described it, and the battle that destroyed its city.",
      definition:
        "In time order:\n" +
        "- Founded in **1336** by **Harihara and Bukka**.\n" +
        "- **Deva Raya I**: the Italian **Nicolo de Conti** visited. **Deva Raya II**: **Abdur Razzaq**, envoy of the Persian ruler Shah Rukh, came in **1443**.\n" +
        "- **Krishnadeva Raya** (1509 to 1529): wrote the Telugu poem **Amuktamalyada**, the story of the saint Andal's devotion to **Vishnu**, with his views on **statecraft**. He built the suburb **Nagalapuram**, named after his **mother**.\n" +
        "- **Carnatic music** took its form at Vijayanagara: **Purandara Dasa** is called its father.\n" +
        "- **Talikota (1565)**: the Deccan sultans of **Bijapur, Ahmadnagar and Golconda** defeated **Rama Raya** and **sacked the city of Vijayanagara**.",
      table: {
        columns: ["King or event", "Year", "Remember for"],
        rows: [
          { cells: ["Deva Raya II", "1443", "Visit of Abdur Razzaq from Persia"], pyqExampleId: "6a4e9d45-628c-4250-983f-48375f80e8df" },
          { cells: ["Krishnadeva Raya", "1509 to 1529", "Amuktamalyada; Nagalapuram"], pyqExampleId: "57d34dac-b980-4f71-bdfd-23d2cd709005" },
          { cells: ["Purandara Dasa", "16th century", "Father of Carnatic music"], pyqExampleId: "416d3498-a57a-4cb8-9c64-7cd8282f46d4" },
          { cells: ["Battle of Talikota", "1565", "Vijayanagara city sacked"], pyqExampleId: "1db2c300-39d6-4d13-8e26-f4705fb7ccbb" },
        ],
      },
      pyqExampleId: "1c4000f6-1ef7-4ef8-8c62-769a76bf1130",
      selfCheckExample: {
        prompt: "Two foreign visitors came to Vijayanagara under two kings with the same name. Who came under whom?",
        steps: ["Nicolo de Conti, from Italy, came under Deva Raya I.", "Abdur Razzaq, the envoy from Persia, came under Deva Raya II in 1443."],
        answer: "Nicolo de Conti under Deva Raya I; Abdur Razzaq under Deva Raya II.",
      },
      practiceSet: [
        { prompt: "After whom did Krishnadeva Raya name the suburb Nagalapuram?", answer: "His mother" },
        { prompt: "What is Krishnadeva Raya's Amuktamalyada partly about, besides Andal's devotion?", answer: "Statecraft" },
        { prompt: "Which city was sacked after the battle of Talikota?", answer: "Vijayanagara" },
        { prompt: "Who is called the father of Carnatic music?", answer: "Purandara Dasa" },
      ],
      traps: [
        {
          title: "The victors at Talikota were not sacked",
          body: "Bijapur, Ahmadnagar and Golconda **won** at Talikota. The city that was sacked was **Vijayanagara**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmevj-society",
      name: "Titles and people of the empire",
      intuition:
        "The words SSC asks here come from the NCERT chapter: what the empire called itself, what the rulers were called, and the commanders, merchants and weavers who ran its economy.",
      definition:
        "The terms:\n" +
        "- Historians say Vijayanagara Empire; people of the time called it the **Karnataka Samrajyamu**.\n" +
        "- Three kinds of ruler: the **Rayas** of Vijayanagara were **narapati** (lords of men), the **Deccan Sultans ashvapati** (lords of horses) and the **Gajapatis** of Odisha lords of elephants.\n" +
        "- **Amara-nayakas**: **military commanders** given territories to govern, who kept horses and elephants for the king.\n" +
        "- **Kudirai chettis**: local **merchants** who dealt in horses.\n" +
        "- **Pattanulkars**: **silk weavers** who came from Saurashtra in **Gujarat**.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Karnataka Samrajyamu", "What contemporaries called the empire"], pyqExampleId: "c88875ba-f1af-40fb-82d8-ae96abfb099d" },
          { cells: ["Narapati", "Lord of men: the Rayas"], pyqExampleId: "7b91d1db-8a61-4fd2-9d21-1ba6fbfda3cb" },
          { cells: ["Ashvapati", "Lord of horses: the Deccan Sultans"] },
          { cells: ["Amara-nayaka", "Military commander with a territory"], pyqExampleId: "97dfdd01-9e2b-419a-b7e9-730f2310f2d3" },
          { cells: ["Kudirai chetti", "Local horse merchant"], pyqExampleId: "9be2871e-c346-4c6c-8d65-42be2fceb796" },
          { cells: ["Pattanulkar", "Silk weaver from Gujarat"], pyqExampleId: "bf3e2210-a16f-4805-ad5d-b38c86808103" },
        ],
      },
      pyqExampleId: "f5bdc026-041c-47d7-98b3-75bd72e73b0a",
      selfCheckExample: {
        prompt: "An amara-nayaka and a kudirai chetti both dealt with horses. How were they different?",
        steps: [
          "An amara-nayaka was a military commander who kept horses for the king's army from his territory.",
          "A kudirai chetti was a merchant who traded in horses.",
        ],
        answer: "The amara-nayaka was a commander; the kudirai chetti was a horse merchant.",
      },
      practiceSet: [
        { prompt: "What did people of the time call the Vijayanagara Empire?", answer: "The Karnataka Samrajyamu" },
        { prompt: "Who were the Pattanulkars?", answer: "Silk weavers who came from Gujarat" },
        { prompt: "What were the amara-nayakas?", answer: "Military commanders" },
        { prompt: "Which rulers were called ashvapati, lords of horses?", answer: "The Deccan Sultans" },
      ],
      traps: [
        {
          title: "Gajapati is Odisha's title",
          body: "**Gajapati** (lord of elephants) was the title of the rulers of **Odisha**, Vijayanagara's rivals. The Rayas were **narapati**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmevj-deccan",
      name: "The Bahmani kingdom and the Deccan sultanates",
      intuition:
        "North of Vijayanagara a rebel against the Tughlaqs founded the Bahmani kingdom, which later broke into five sultanates. SSC asks the founder and which family ruled which state.",
      definition:
        "The facts:\n" +
        "- **Bahmani kingdom (1347)**: founded by **Alauddin Hasan** (Hasan Gangu), who took the title **Bahman Shah**; capital Gulbarga, later Bidar.\n" +
        "- It broke into **five sultanates**: **Bijapur** (Adil Shahi), **Ahmadnagar** (Nizam Shahi), **Golconda** (Qutb Shahi), **Berar** (Imad Shahi) and **Bidar** (Barid Shahi).\n" +
        "- **Malik Ambar**, an Abyssinian, was the regent of **Ahmadnagar**; he fought the Mughals and is known for his land revenue settlement.",
      table: {
        columns: ["Sultanate", "Ruling family"],
        rows: [
          { cells: ["Bijapur", "Adil Shahi"] },
          { cells: ["Ahmadnagar", "Nizam Shahi"], pyqExampleId: "54c60410-08e4-45f7-b836-3a024e5a43fa" },
          { cells: ["Golconda", "Qutb Shahi"] },
          { cells: ["Berar", "Imad Shahi"], pyqExampleId: "e5947530-4970-4d2f-8224-516d2fc6a333" },
          { cells: ["Bidar", "Barid Shahi"] },
        ],
      },
      pyqExampleId: "3a2606ac-a022-46e3-897e-50f6940234a2",
      selfCheckExample: {
        prompt: "Name the state each family ruled: the Nizam Shahis, the Imad Shahis and the Barid Shahis.",
        steps: ["The Nizam Shahis ruled Ahmadnagar.", "The Imad Shahis ruled Berar, and the Barid Shahis ruled Bidar."],
        answer: "Nizam Shahi: Ahmadnagar. Imad Shahi: Berar. Barid Shahi: Bidar.",
      },
      practiceSet: [
        { prompt: "Which family ruled Golconda?", answer: "The Qutb Shahis" },
        { prompt: "Which state did Malik Ambar serve?", answer: "Ahmadnagar" },
        { prompt: "In which year was the Bahmani kingdom founded?", answer: "1347" },
        { prompt: "Which family ruled Bijapur?", answer: "The Adil Shahis" },
      ],
      traps: [
        {
          title: "Bidar is Barid Shahi, Berar is Imad Shahi",
          body: "**Bidar** and **Berar** sound alike. **Bidar** was ruled by the **Barid Shahis**; **Berar** by the **Imad Shahis**.",
        },
      ],
    },
  ],
};
