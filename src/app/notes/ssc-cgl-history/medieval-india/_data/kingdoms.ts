import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HME_KINGDOMS_NOTE: SubtopicNote = {
  subtopicName: "Early Medieval Kingdoms",
  title: "Early Medieval Kingdoms",
  oneLineDefinition:
    "The kingdoms of 650 to 1200 CE: the three powers that fought over Kannauj, the Pallavas and Cholas of the south, and the Rajput and Kashmir rulers of the north up to Muhammad Ghori.",
  whyItMatters:
    "Twenty-three questions in the bank: four from the 2023 shifts, nine from the 2024 shifts and ten from the 2025 shifts. The questions match a dynasty to its region, founder or rival, so this page is a set of matchings: three powers to three regions, two Chola kings to two temples, three assemblies to three kinds of village.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmeek-tripartite",
      name: "Palas, Pratiharas and Rashtrakutas",
      intuition:
        "For two centuries three dynasties fought over one city, Kannauj, the old capital of Harsha. One came from the east, one from the west and one from the Deccan. Learn where each came from and its key kings.",
      definition:
        "The **tripartite struggle** (8th to 10th century) for **Kannauj**:\n" +
        "- **Palas** of **Bengal and Bihar**: founded by **Gopala** (about 750 CE); then Dharmapala and Devapala.\n" +
        "- **Gurjara-Pratiharas** of **Gujarat and Rajasthan**: first capital **Bhinmal**; rose under **Nagabhatta I**, who held back the Arabs; later ruled from Kannauj. The poet **Rajashekhara** served **Mahendrapala I**.\n" +
        "- **Rashtrakutas** of the **western Deccan** (capital Manyakheta): founded by Dantidurga. Kings such as Dhruva, Govinda III and Indra III raided north for Kannauj. **Krishna III** defeated the Chola **Parantaka I** at Takkolam (949 CE).",
      table: {
        columns: ["Dynasty", "Region", "King to remember"],
        rows: [
          { cells: ["Palas", "Bengal and Bihar", "Gopala (founder)"], pyqExampleId: "87d6add3-8725-466d-8102-b125f79ccf2b" },
          { cells: ["Gurjara-Pratiharas", "Gujarat and Rajasthan", "Nagabhatta I"], pyqExampleId: "87efec44-e46f-4fa4-99c8-b4bc9fcb66da" },
          { cells: ["Rashtrakutas", "Western Deccan", "Krishna III"], pyqExampleId: "5cb3f420-4be2-44a1-b58e-962e08c375f5" },
          { cells: ["Cholas (for contrast)", "Tamil Nadu", "Rajaraja I"] },
        ],
      },
      pyqExampleId: "22878151-d6f1-4c0b-88d9-e70c91d1e25f",
      selfCheckExample: {
        prompt: "A statement says the Pratiharas were based in the east and the Palas in the west. Is it right?",
        steps: ["The Palas ruled Bengal and Bihar, in the east.", "The Gurjara-Pratiharas ruled Gujarat and Rajasthan, in the west."],
        answer: "No: it reverses them. Palas east, Pratiharas west.",
      },
      practiceSet: [
        { prompt: "Which city did the tripartite struggle aim to control?", answer: "Kannauj" },
        { prompt: "Who founded the Pala dynasty?", answer: "Gopala" },
        { prompt: "What was the first capital of the Gurjara-Pratiharas?", answer: "Bhinmal" },
        { prompt: "Which Rashtrakuta king defeated the Chola king Parantaka I?", answer: "Krishna III" },
      ],
      traps: [
        {
          title: "Rashtrakutas, not Chalukyas",
          body: "The third power in the tripartite struggle is the **Rashtrakutas**. The Chalukyas and Maukharis are wrong options from other centuries.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmeek-cholas",
      name: "Pallavas and Cholas",
      intuition:
        "In the south the Pallavas fought the Chalukyas, and the Cholas then built the strongest kingdom the south had seen, with great temples, a navy and village assemblies that ran themselves. SSC asks the kings, the emblem and the assemblies.",
      definition:
        "**Pallavas**: **Narasimhavarman I** defeated the Chalukya Pulakeshin II and captured **Vatapi (Badami)** in **642 CE**.\n\n" +
        "**Cholas**:\n" +
        "- Emblem: the **tiger**. (The Pandyas used the fish and the Cheras the bow.)\n" +
        "- **Rajaraja I** (985 to **1014**) built the Brihadisvara temple at **Thanjavur**. His son **Rajendra I** built a new capital, **Gangaikonda Cholapuram**, and sent a navy to South-East Asia.\n" +
        "- Village assemblies: the **Ur** in an ordinary village, the **Sabha** (Mahasabha) in a **Brahmin village** (brahmadeya), and the **Nagaram** of merchants.\n" +
        "- Farming depended on **irrigation water**, so the Cholas built tanks, wells and channels from the Kaveri.",
      table: {
        columns: ["Assembly", "Who sat in it"],
        rows: [
          { cells: ["Ur", "Landholders of an ordinary village"], pyqExampleId: "9c827c83-bc68-455b-9d70-f0f6e00a3562" },
          { cells: ["Sabha (Mahasabha)", "Brahmins of a brahmadeya village"], pyqExampleId: "8cf371ba-80b5-45cc-b66d-6b2330f5b906" },
          { cells: ["Nagaram", "Merchants"] },
        ],
      },
      pyqExampleId: "9d0dcc20-ff00-41cc-b755-287b35bcf30f",
      selfCheckExample: {
        prompt: "Two Chola kings, father and son, built two great temples. Which king built which, and where?",
        steps: [
          "Rajaraja I built the Brihadisvara temple at Thanjavur.",
          "His son Rajendra I built the temple at his new capital, Gangaikonda Cholapuram.",
        ],
        answer: "Rajaraja I: Thanjavur. Rajendra I: Gangaikonda Cholapuram.",
      },
      practiceSet: [
        { prompt: "What was the emblem of the Cholas?", answer: "The tiger" },
        { prompt: "In which year did Rajaraja I's reign end?", answer: "1014" },
        { prompt: "Which Pallava king captured Vatapi?", answer: "Narasimhavarman I" },
        { prompt: "What was the Ur in a Chola village?", answer: "The village assembly of an ordinary village" },
      ],
      traps: [
        {
          title: "Sabha for Brahmin villages, Ur for the rest",
          body: "The **Sabha** met in **brahmadeya** (Brahmin) villages. The **Ur** was the assembly of an **ordinary** village. Do not swap them.",
        },
        {
          title: "The Bahmanis were not southern Tamil kings",
          body: "The **Bahmani** kingdom was founded in the **Deccan** in 1347 by a rebel against the Tughlaqs. It has nothing to do with the Cholas or Cheras.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmeek-north",
      name: "Rajputs, Kashmir and Muhammad Ghori",
      intuition:
        "In the north, Rajput clans held Delhi, Ajmer, Kannauj and Mewar until Muhammad Ghori's battles of the 1190s. SSC asks the battle years and one fact about each clan.",
      definition:
        "In time order:\n" +
        "- **Kashmir**: **Queen Didda** ruled in the 10th century (980 to 1003 CE), first as regent; Kalhana's Rajatarangini tells her story.\n" +
        "- **Tomaras**: the Rajput clan that founded Delhi (Anangapala); they minted the **Dehliwal** coins.\n" +
        "- **Prithviraj Chauhan**: won the **first battle of Tarain (1191)** against Muhammad Ghori and lost the **second (1192)**, which ended his reign.\n" +
        "- **Chandawar (1194)**: Ghori defeated **Jayachandra** of the Gahadavalas of Kannauj.\n" +
        "- **Mewar**: ruled by the **Sisodia** Rajputs from Chittor. **Rana Kumbha** (15th century) built the Vijay Stambh and wrote the **Sangeet Raj**, a book on music.",
      table: {
        columns: ["Event or ruler", "Year", "Fact"],
        rows: [
          { cells: ["Queen Didda", "980 to 1003", "Ruled Kashmir"], pyqExampleId: "0e8dbb32-5a62-49da-be4a-ae6a90742afc" },
          { cells: ["First battle of Tarain", "1191", "Prithviraj Chauhan beat Ghori"] },
          { cells: ["Second battle of Tarain", "1192", "Ghori beat Prithviraj Chauhan"] },
          { cells: ["Battle of Chandawar", "1194", "Ghori beat Jayachandra"], pyqExampleId: "a3330c68-3bd1-48ce-8571-88273c0da728" },
          { cells: ["Rana Kumbha", "1433 to 1468", "Sisodia of Mewar; Sangeet Raj"], pyqExampleId: "c2bc8805-e693-41ba-91a4-8b7a37af8bb3" },
        ],
      },
      pyqExampleId: "3e42a4e1-0cdf-46f7-ac46-b9fd88d7ce6c",
      selfCheckExample: {
        prompt: "Muhammad Ghori fought three battles in the 1190s. Name the opponent in each and say who won.",
        steps: [
          "First Tarain (1191): Prithviraj Chauhan won.",
          "Second Tarain (1192): Ghori beat Prithviraj Chauhan.",
          "Chandawar (1194): Ghori beat Jayachandra of Kannauj.",
        ],
        answer: "1191 Prithviraj won; 1192 Ghori won against Prithviraj; 1194 Ghori won against Jayachandra.",
      },
      practiceSet: [
        { prompt: "Which region did Queen Didda rule?", answer: "Kashmir" },
        { prompt: "Which Rajput clan minted the Dehliwal coins?", answer: "The Tomaras" },
        { prompt: "Which dynasty ruled Mewar in the 15th century?", answer: "The Sisodias" },
        { prompt: "Which Rana of Mewar wrote the Sangeet Raj?", answer: "Rana Kumbha" },
      ],
      traps: [
        {
          title: "1192 ended Prithviraj, 1206 began the Sultanate",
          body: "Prithviraj Chauhan's reign ended at **Tarain in 1192**. **1206** is when Qutbuddin Aibak founded the Delhi Sultanate.",
        },
      ],
    },
  ],
};
