import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HME_LITERATURE_NOTE: SubtopicNote = {
  subtopicName: "Literature, Music and Travellers",
  title: "Literature, Music and Travellers",
  oneLineDefinition:
    "The chronicles and poems of medieval India with their authors, the great books on music, and the foreign travellers with the ruler each one visited.",
  whyItMatters:
    "Fourteen questions in the bank: six from the 2023 shifts, five from the 2024 shifts and three from the 2025 shifts. Nearly every one pairs a book with its author or a traveller with a ruler, so three short tables answer them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmelt-books",
      name: "Chronicles and poems",
      intuition:
        "The Sultanate's history comes from court chroniclers writing in Persian; the regional kingdoms have their own poets in Sanskrit, Hindi and Kannada. Learn each book with its writer and the king it praises.",
      definition:
        "Persian chronicles of the Sultanate:\n" +
        "- **Taj-ul-Maasir**: **Hasan Nizami**.\n" +
        "- **Khazain-ul-Futuh** (on Alauddin Khalji's conquests): **Amir Khusrau**.\n" +
        "- **Tarikh-i-Firuz Shahi**: **Ziauddin Barani**.\n" +
        "- **Tarikh-i-Mubarak Shahi**: **Yahya bin Ahmad Sirhindi**.\n\n" +
        "Regional works:\n" +
        "- **Prithviraj Raso**: **Chand Bardai**, court poet of Prithviraj Chauhan.\n" +
        "- **Ramacharita**: **Sandhyakar Nandi**; its hero is the Pala king **Ramapala**.\n" +
        "- **Pampa, Ponna and Ranna**: the **three jewels of Kannada** literature (10th century).\n" +
        "- **Basavanna** (12th century): founder of the Virashaiva (Lingayat) movement; first a Jaina and a minister at a Chalukya court.",
      table: {
        columns: ["Work", "Author"],
        rows: [
          { cells: ["Taj-ul-Maasir", "Hasan Nizami"] },
          { cells: ["Khazain-ul-Futuh", "Amir Khusrau"] },
          { cells: ["Tarikh-i-Firuz Shahi", "Ziauddin Barani"], pyqExampleId: "9fac4d44-816f-4900-97fe-83c24a7eff1a" },
          { cells: ["Prithviraj Raso", "Chand Bardai"], pyqExampleId: "073865e0-f192-4f41-8ac3-d5b534000007" },
          { cells: ["Ramacharita", "Sandhyakar Nandi"], pyqExampleId: "69a0dea5-ae85-4e4b-9af2-1b74372afe1b" },
        ],
      },
      pyqExampleId: "9d25e484-37b9-4adf-9794-a6ec3334e518",
      selfCheckExample: {
        prompt: "Which Bhakti saint of 12th-century Karnataka had been a Jaina and a royal minister, and what movement did he found?",
        steps: ["Basavanna was first a Jaina and a minister at a Chalukya court.", "He founded the Virashaiva, or Lingayat, movement."],
        answer: "Basavanna; the Virashaiva (Lingayat) movement.",
      },
      practiceSet: [
        { prompt: "Who wrote the Prithviraj Raso?", answer: "Chand Bardai" },
        { prompt: "Which language's literature calls Pampa, Ponna and Ranna its three jewels?", answer: "Kannada" },
        { prompt: "Who is the hero of Sandhyakar Nandi's Ramacharita?", answer: "The Pala king Ramapala" },
        { prompt: "Whose conquests does Amir Khusrau's Khazain-ul-Futuh describe?", answer: "Alauddin Khalji's" },
      ],
      traps: [
        {
          title: "Barani is the historian, Khusrau the poet",
          body: "**Tarikh-i-Firuz Shahi** is **Barani's** history. **Amir Khusrau** was a court poet; his Khazain-ul-Futuh praises Alauddin.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmelt-music",
      name: "Books on music",
      intuition:
        "Three books on music turn up in SSC papers, each from a different century and court. Learn the book with its author and where it was written.",
      definition:
        "The books:\n" +
        "- **Sangeet Ratnakara** (13th century): **Sharangadeva**, at the Yadava court of **Devagiri** in Maharashtra; a founding text for both Hindustani and Carnatic music.\n" +
        "- **Raga Tarangini**: ascribed to **Lochana Kavi**.\n" +
        "- **Sangeet Raj**: **Rana Kumbha** of Mewar (15th century).\n\n" +
        "Even under **Aurangzeb**, who banished singing from his court, many Persian books on Indian classical music were written; SSC's key credits his reign with the most.",
      table: {
        columns: ["Book", "Author"],
        rows: [
          { cells: ["Sangeet Ratnakara", "Sharangadeva"] },
          { cells: ["Raga Tarangini", "Lochana Kavi"], pyqExampleId: "f21b45c9-5752-4156-96ac-b864e0ce54f9" },
          { cells: ["Sangeet Raj", "Rana Kumbha"] },
        ],
      },
      pyqExampleId: "3ded751f-917a-414b-9993-fafc31f35c30",
      selfCheckExample: {
        prompt: "Which music book was written at Devagiri, and which at the court of Mewar?",
        steps: ["Sharangadeva wrote the Sangeet Ratnakara at the Yadava court of Devagiri.", "Rana Kumbha of Mewar wrote the Sangeet Raj."],
        answer: "Devagiri: Sangeet Ratnakara. Mewar: Sangeet Raj.",
      },
      practiceSet: [
        { prompt: "To whom is the Raga Tarangini ascribed?", answer: "Lochana Kavi" },
        { prompt: "Who wrote the Sangeet Ratnakara?", answer: "Sharangadeva" },
        { prompt: "In which century was the Sangeet Ratnakara written?", answer: "The 13th century" },
      ],
      traps: [
        {
          title: "The Natya Shastra is far older",
          body: "In a question on the 13th-century treatise, the **Natya Shastra** (Bharata) is the decoy. The answer is the **Sangeet Ratnakara**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmelt-travellers",
      name: "Foreign travellers",
      intuition:
        "Each traveller came at a fixed time and wrote about one ruler or one coast. Learn the traveller with his century, his country and whom he saw.",
      definition:
        "In time order:\n" +
        "- **Al-Biruni** (11th century): came with **Mahmud of Ghazni**; wrote Kitab-ul-Hind.\n" +
        "- **Marco Polo** (late 13th century): Venetian; on his voyage back from China he described the **pepper** trade of **Malabar**.\n" +
        "- **Ibn Battuta** (14th century): Moroccan, at the court of **Muhammad bin Tughlaq**. In his Rihla he wrote that Delhi's people threw abusive letters at the Sultan, who shifted the capital to punish them, and that rebel chiefs hid in **bamboo groves** and hills.\n" +
        "- **Abdur Razzaq** (1443): Persian envoy at Vijayanagara.\n" +
        "- **Jean-Baptiste Tavernier** (17th century): a **French jeweller** who made **six** journeys to India under the Mughals.",
      table: {
        columns: ["Traveller", "Century", "Remember for"],
        rows: [
          { cells: ["Al-Biruni", "11th", "Came with Mahmud of Ghazni"], pyqExampleId: "133996a4-23d3-4ea6-8d0e-1d9dfccce00f" },
          { cells: ["Marco Polo", "13th", "Malabar's pepper trade"] },
          { cells: ["Ibn Battuta", "14th", "Muhammad bin Tughlaq's court"], pyqExampleId: "6e59de9a-fca1-4998-b2cd-04cd76529ee4" },
          { cells: ["Tavernier", "17th", "French jeweller; six journeys"], pyqExampleId: "fe8b1098-38ad-4868-b26c-53fecd764cd5" },
        ],
      },
      pyqExampleId: "6709398a-8bdc-4d44-a8cf-bdd32e7d12b3",
      selfCheckExample: {
        prompt: "Put these travellers in order of their visits: Ibn Battuta, Al-Biruni, Tavernier, Marco Polo.",
        steps: ["Al-Biruni came in the 11th century and Marco Polo in the 13th.", "Ibn Battuta came in the 14th century and Tavernier in the 17th."],
        answer: "Al-Biruni, Marco Polo, Ibn Battuta, Tavernier.",
      },
      practiceSet: [
        { prompt: "With whose armies did Al-Biruni come to India?", answer: "Mahmud of Ghazni's" },
        { prompt: "At whose court did Ibn Battuta serve?", answer: "Muhammad bin Tughlaq's" },
        { prompt: "What was Tavernier's trade?", answer: "Jeweller (gem merchant)" },
        { prompt: "From which country did Ibn Battuta come?", answer: "Morocco" },
      ],
      traps: [
        {
          title: "Megasthenes is 2,000 years early",
          body: "In a question on a **14th-century** traveller, **Megasthenes** (Mauryan) and **Al-Biruni** (11th century) are decoys. The 14th-century traveller is **Ibn Battuta**.",
        },
      ],
    },
  ],
};
