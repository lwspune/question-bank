import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HME_SULTANATE_NOTE: SubtopicNote = {
  subtopicName: "Delhi Sultanate",
  title: "Delhi Sultanate",
  oneLineDefinition:
    "The five dynasties of the Delhi Sultanate in order with the deeds of their great Sultans, and the departments, coins, markets and taxes they set up.",
  whyItMatters:
    "Twenty-three questions in the bank: ten from the 2023 shifts, eight from the 2024 shifts and five from the 2025 shifts. Half ask who did something (Balban, Alauddin Khalji and Muhammad bin Tughlaq between them answer most); the other half ask what a department or a term meant. A ruler list and a term list cover both.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmeds-rulers",
      name: "The Sultans and their deeds",
      intuition:
        "Five dynasties ruled Delhi for 320 years. Learn their order first, then one or two deeds for each great Sultan: SSC asks the deed and gives four Sultans as options.",
      definition:
        "The dynasties and their founders, in order:\n" +
        "- **Slave (Mamluk), 1206**: **Qutbuddin Aibak** (1206 to 1210), after Muhammad Ghori's death.\n" +
        "- **Khalji, 1290**: **Jalaluddin Khalji**.\n" +
        "- **Tughlaq, 1320**: Ghiyasuddin Tughlaq.\n" +
        "- **Sayyid, 1414**: **Khizr Khan**.\n" +
        "- **Lodi, 1451**: **Bahlul Lodi**. The last Sultan, **Ibrahim Lodi**, fell to Babur at Panipat in 1526.\n\n" +
        "The great Sultans:\n" +
        "- **Iltutmish** (1211 to 1236). His daughter **Raziya** (1236 to 1240) was the Sultanate's only woman ruler.\n" +
        "- **Balban** (1266 to 1287): chose **consolidation over conquest**; brought in the Persian court customs of **sijda** (prostration) and **paibos** (kissing the feet). When **Tughril Khan** rebelled in Bengal (1279), Balban crushed him.\n" +
        "- **Alauddin Khalji** (1296 to 1316): his slave-general **Malik Kafur** led the southern campaigns, the first against **Devagiri** (1307 to 1308).\n" +
        "- **Muhammad bin Tughlaq** (1324 to 1351): token currency; moved the capital to Daulatabad.",
      table: {
        columns: ["Sultan", "Reign", "Remember for"],
        rows: [
          { cells: ["Qutbuddin Aibak", "1206 to 1210", "Founded the Slave dynasty"], pyqExampleId: "d6d5108f-4440-42f4-a214-e062867c446d" },
          { cells: ["Raziya", "1236 to 1240", "The only woman Sultan"], pyqExampleId: "27f6fa47-33d8-435c-a43d-70c852c9d83d" },
          { cells: ["Balban", "1266 to 1287", "Sijda and paibos; consolidation"], pyqExampleId: "442cac24-7f31-4acc-9c4b-514a14e40fc7" },
          { cells: ["Alauddin Khalji", "1296 to 1316", "Malik Kafur's southern campaigns"], pyqExampleId: "5f486511-25c0-46cc-b5d3-4e7d50d8c2ba" },
          { cells: ["Muhammad bin Tughlaq", "1324 to 1351", "Token currency; Daulatabad"], pyqExampleId: "aed85cd4-6faa-42db-903b-425f72b5187f" },
          { cells: ["Ibrahim Lodi", "Died 1526", "The last Sultan"], pyqExampleId: "30f02d90-84ab-405f-b5b3-52182dcdaa3a" },
        ],
      },
      pyqExampleId: "a11ec052-97c2-4c0a-b6df-5082d0ff19ee",
      selfCheckExample: {
        prompt: "Match each dynasty to its founder: Khalji, Sayyid, Lodi. Choose from Bahlul Lodi, Jalaluddin Khalji, Khizr Khan.",
        steps: ["The Khalji dynasty was founded by Jalaluddin Khalji in 1290.", "The Sayyid dynasty by Khizr Khan in 1414, and the Lodi dynasty by Bahlul Lodi in 1451."],
        answer: "Khalji: Jalaluddin Khalji. Sayyid: Khizr Khan. Lodi: Bahlul Lodi.",
      },
      practiceSet: [
        { prompt: "Which Sultan brought in sijda and paibos at court?", answer: "Balban" },
        { prompt: "Which region did Alauddin Khalji's first southern campaign target?", answer: "Devagiri" },
        { prompt: "Who was the last Sultan of Delhi?", answer: "Ibrahim Lodi" },
        { prompt: "Which Sultan chose consolidation rather than expansion?", answer: "Balban" },
        { prompt: "In which year did Raziya come to the throne?", answer: "1236" },
      ],
      traps: [
        {
          title: "Balban was a Slave Sultan, not a Khalji",
          body: "**Balban** belongs to the **Slave dynasty**, and the Sultanate began with **Aibak**, not Balban.",
        },
        {
          title: "Tughril Khan, not Bughra Khan",
          body: "**Tughril Khan** rebelled in Bengal in 1279. **Bughra Khan**, Balban's son, was made governor of Bengal after the revolt was crushed.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmeds-admin",
      name: "Departments, coins, markets and taxes",
      intuition:
        "The Sultanate's officials have Persian titles that tell you their job once you know the root: arz is muster, insha is writing, kohi is cultivation. Learn each department with its job and its Sultan.",
      definition:
        "**Departments (diwans)**:\n" +
        "- **Diwan-i-Arz**: the **military** department, set up by **Balban** under the Ariz-i-Mumalik.\n" +
        "- **Diwan-i-Insha**: royal **correspondence**, headed by the **Dabir-i-Khas**.\n" +
        "- **Diwan-i-Amir-i-Kohi**: **agriculture**, set up by **Muhammad bin Tughlaq**.\n" +
        "- **Diwan-i-Risalat**: religious affairs and appeals. The **Barid-i-Mumalik** ran the intelligence and post.\n\n" +
        "**Iqta**: the revenue of a territory assigned to an officer for his service. The Bahmani and Vijayanagara kingdoms borrowed the idea.\n\n" +
        "**Alauddin Khalji's** army and markets: **dagh** (branding of horses), **huliya** (a description of each soldier) and **cash pay**. Grain sold at the **Mandi**, cloth at the **Sarai-i-Adl**, under the **Shahna-i-Mandi**.\n\n" +
        "**Coins**: **Iltutmish** introduced the silver **tanka** and the copper **jital**. Muhammad bin Tughlaq's token currency used copper (bronze) coins in place of silver.\n\n" +
        "**Taxes**: kharaj (land tax), jizya (on non-Muslims) and **khums**, **one-fifth of war booty**.",
      table: {
        columns: ["Term", "Meaning", "Linked with"],
        rows: [
          { cells: ["Diwan-i-Arz", "Military department", "Balban"], pyqExampleId: "b985a278-86ac-46e4-84de-466aa8171e09" },
          { cells: ["Diwan-i-Insha", "Royal correspondence", "Dabir-i-Khas"], pyqExampleId: "b6447ed1-652d-4928-9a46-2384a4fbd8d0" },
          { cells: ["Diwan-i-Amir-i-Kohi", "Agriculture", "Muhammad bin Tughlaq"], pyqExampleId: "04ec39b1-418f-43b2-a007-5925501b5efc" },
          { cells: ["Dagh and huliya", "Branding horses; roll of soldiers", "Alauddin Khalji"], pyqExampleId: "3b5ef638-2999-4fc1-8716-93f1c7be8298" },
          { cells: ["Sarai-i-Adl", "Cloth market", "Alauddin Khalji"], pyqExampleId: "4c1f50f5-b5a9-46c0-bbef-b010607fe211" },
          { cells: ["Tanka and jital", "Silver and copper coins", "Iltutmish"], pyqExampleId: "cc947fc9-e5d4-4d6b-8677-755e9e091ee8" },
          { cells: ["Iqta", "Revenue of a territory for service", "Copied by the Bahmanis"], pyqExampleId: "099e505d-f748-479d-8f9e-cf59d0b6a614" },
        ],
      },
      pyqExampleId: "eb04f984-e51c-4fd8-96b4-501ac19f6e00",
      selfCheckExample: {
        prompt: "Match Balban, Muhammad bin Tughlaq and the Dabir-i-Khas to the department each is linked with.",
        steps: [
          "Balban organised the Diwan-i-Arz, the military department.",
          "Muhammad bin Tughlaq set up the Diwan-i-Amir-i-Kohi for agriculture.",
          "The Dabir-i-Khas headed the Diwan-i-Insha, royal correspondence.",
        ],
        answer: "Balban: Arz. Muhammad bin Tughlaq: Amir-i-Kohi. Dabir-i-Khas: Insha.",
      },
      practiceSet: [
        { prompt: "What was the Diwan-i-Arz?", answer: "The military department" },
        { prompt: "Which Sultan introduced dagh and huliya?", answer: "Alauddin Khalji" },
        { prompt: "Which Sultan introduced the silver tanka and the copper jital?", answer: "Iltutmish" },
        { prompt: "What was sold at the Sarai-i-Adl?", answer: "Cloth (and other manufactured goods)" },
        { prompt: "What was an iqta?", answer: "The revenue of a territory assigned to an officer for his service" },
      ],
      traps: [
        {
          title: "Kharaj, jizya and khums are three different taxes",
          body: "**Kharaj** is the land tax, **jizya** the tax on non-Muslims, and **khums** the state's **one-fifth share of war booty**.",
        },
        {
          title: "The tanka was what Tughlaq replaced",
          body: "Muhammad bin Tughlaq's token coins were **copper (jital)**. The **silver tanka** is the coin they stood in for, so it is the wrong answer.",
        },
      ],
    },
  ],
};
