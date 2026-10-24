import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_SUFIS_NOTE: SubtopicNote = {
  subtopicName: "Sufis and Schools of Thought",
  title: "Sufis and Schools of Thought",
  oneLineDefinition:
    "The Sufi silsilas and the Chishtis, the Sufi books CDS names, and the Indian schools of philosophy from Mimamsa and Vedanta to Kashmir Shaivism and the Sahajiyas.",
  whyItMatters:
    "Nine CDS questions, five of them HARD. The Sufi ones ask what a word means or who wrote a book; the philosophy ones ask which school a teacher belonged to. Each answer is a pairing, so learn the names in twos.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-silsilas",
      name: "Sufi silsilas and the Chishtis",
      intuition:
        "A Sufi learnt from a master, who had learnt from his master, and so on back to the Prophet. That chain is a silsila, and each order of Sufis is named after its founder or the town it began in.",
      definition:
        "- **Silsila** means a **chain**. Around the **12th century** silsilas took shape across the Islamic world. A silsila was the **continuous link between master and disciple**, an **unbroken spiritual line back to the Prophet Muhammad**, and the path by which **spiritual power and blessings** reached devotees.\n" +
        "- The **Chishti** silsila is named after **Chisht**, a town in **central Afghanistan**. **Khwaja Muinuddin Chishti** brought it to India and settled at **Ajmer**.\n" +
        "- **Jahanara**, Shah Jahan's daughter, wrote the **Munis al-Arwah**, a biography of Muinuddin Chishti. The **Fawaid al-Fuad** is a record of Nizamuddin Auliya's conversations.\n" +
        "- **Al-Hujwiri** (11th century, Lahore) wrote the **Kashf al-Mahjub**. He talked with yogis but was **not impressed** by their theory of the divisions of the human body. **Al-Biruni** compared Sufi ideas with the **Bhagavad Gita** and **Patanjali's Yoga Sutra**, and the yogic text **Amrita Kunda** had a lasting effect on Sufism.\n" +
        "- The **Khojas**, a branch of the Ismailis, sang devotional poems called **ginan** (from the Sanskrit jnana, knowledge).",
      table: {
        columns: ["Name", "What it is"],
        rows: [
          {
            cells: ["Kashf al-Mahjub (11th century)", "Al-Hujwiri's book on Sufism; he was not convinced by the yogis' theory of the body"],
            pyqExampleId: "2c16332b-0080-4334-a4ff-2791062007d1",
          },
          {
            cells: ["Silsila", "A chain: master to disciple, back to the Prophet; a channel of blessings"],
            noteAmber: "CDS 2018 (I): all three meanings were correct.",
            pyqExampleId: "d2afe9e8-9fe0-4a2e-bfe8-16319166aa7d",
          },
          {
            cells: ["Chisht", "Town in central Afghanistan that names the Chishti silsila"],
            noteAmber: "CDS 2021 (II): central Afghanistan.",
            pyqExampleId: "e623fe5f-3880-4d51-b93f-c63aa16c90d5",
          },
          { cells: ["Fawaid al-Fuad", "Conversations of Nizamuddin Auliya"] },
          {
            cells: ["Munis al-Arwah (17th century)", "Jahanara's biography of Muinuddin Chishti"],
            noteAmber: "CDS 2021 (II): Jahanara's book is the Munis al-Arwah.",
            pyqExampleId: "882c0e12-a31d-4cff-bddb-b7ccf81d3b5c",
          },
          {
            cells: ["Ginan", "Devotional poems of the Khojas, an Ismaili branch"],
            pyqExampleId: "8b1fd14e-9816-4ca9-a664-c84e15ccf2e1",
          },
        ],
      },
      pyqExampleId: "d2afe9e8-9fe0-4a2e-bfe8-16319166aa7d",
      selfCheckExample: {
        prompt: "Shah Jahan's daughter Jahanara wrote a biography of a Sufi saint. Which book is it, and whose life does it tell?",
        steps: ["Jahanara was a follower of the Chishti order.", "Her book, the Munis al-Arwah, is a life of its founder in India."],
        answer: "The Munis al-Arwah, a life of Khwaja Muinuddin Chishti",
      },
      practiceSet: [
        { prompt: "In which town did Khwaja Muinuddin Chishti settle in India?", answer: "Ajmer" },
        { prompt: "What literary genre did the Khojas develop?", answer: "Ginan, devotional poems" },
        { prompt: "Who wrote the Kashf al-Mahjub?", answer: "Al-Hujwiri" },
        { prompt: "Whose conversations are recorded in the Fawaid al-Fuad?", answer: "Nizamuddin Auliya's" },
      ],
      traps: [
        {
          title: "Munis al-Arwah, not Fawaid al-Fuad",
          body: "Jahanara's biography of Muinuddin Chishti is the **Munis al-Arwah**. The **Fawaid al-Fuad** records Nizamuddin Auliya's talks and is the usual wrong option.",
        },
        {
          title: "Hujwiri was not won over by the yogis",
          body: "In a 'which is not correct' item on Sufis and yoga, the false statement is that **Hujwiri** was impressed by the yogis' theory of the body. The parallels drawn by **Al-Biruni** and the influence of the **Amrita Kunda** are both true.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-philosophy",
      name: "Schools of philosophy",
      intuition:
        "Indian thinkers argued over the Vedas in two halves: the ritual part and the knowledge part. Others built schools around Shiva, or within Buddhism. " +
        "CDS names a teacher and asks for his school, so learn teacher and school together.",
      definition:
        "- **Purva-Mimamsa** studies the **ritual** part of the Vedas. Its two main teachers were **Kumarila Bhatta** and **Prabhakara** (7th to 8th century).\n" +
        "- **Uttara-Mimamsa**, or **Vedanta**, studies the Upanishads. **Shankara** (8th century) founded **Advaita** (non-dualism); **Ramanuja** taught **Vishishtadvaita** (qualified non-dualism); **Madhva** elaborated **Dvaita** (dualism).\n" +
        "- **Kashmir Shaivism** (Trika) was founded by **Vasugupta** (9th century), to whom the Shiva Sutras are credited. **Abhinavagupta** was its greatest teacher, later.\n" +
        "- The **Sahajiya** cult of the 10th and 11th centuries grew out of tantric **Buddhism**; its songs survive as the **Charyapadas**. A Vaishnava Sahajiya movement came much later.",
      table: {
        columns: ["School", "Teacher", "Time"],
        rows: [
          {
            cells: ["Purva-Mimamsa", "Kumarila Bhatta and Prabhakara", "7th to 8th century"],
            noteAmber: "CDS 2022 (II): Purva-Mimamsa, not Uttara-Mimamsa.",
            pyqExampleId: "db7d11d8-e566-41c4-9dd0-d4d8f85c22d8",
          },
          {
            cells: ["Advaita Vedanta", "Shankara", "8th century"],
            pyqExampleId: "73ac8319-f125-44ba-b7e5-d59cd65aab17",
          },
          {
            cells: ["Kashmir Shaivism", "Vasugupta (founder); Abhinavagupta (later)", "9th century onward"],
            noteAmber: "CDS 2024 (I): Vasugupta propounded it.",
            pyqExampleId: "635598ad-cac7-45e9-98a8-126a83772465",
          },
          {
            cells: ["Sahajiya", "Buddhist siddhas; songs in the Charyapadas", "10th to 11th century"],
            pyqExampleId: "f1f71a1b-d5fc-491e-bbf8-246cf6a4d4f5",
          },
          { cells: ["Vishishtadvaita Vedanta", "Ramanuja", "11th to 12th century"] },
          { cells: ["Dvaita Vedanta", "Madhva", "13th century"] },
        ],
      },
      pyqExampleId: "db7d11d8-e566-41c4-9dd0-d4d8f85c22d8",
      selfCheckExample: {
        prompt: "Who founded Kashmir Shaivism, and who was its greatest later teacher?",
        steps: ["The Shiva Sutras, the base of the system, are credited to Vasugupta in the 9th century.", "About two centuries later Abhinavagupta explained it most fully."],
        answer: "Vasugupta founded it; Abhinavagupta was its greatest teacher",
      },
      practiceSet: [
        { prompt: "Who elaborated the philosophy of Dvaita?", answer: "Madhva" },
        { prompt: "With which religion is the Sahajiya cult of the 10th and 11th centuries linked?", answer: "Buddhism" },
        { prompt: "Which philosophy did Ramanuja teach?", answer: "Vishishtadvaita, qualified non-dualism" },
        { prompt: "What is another name for Uttara-Mimamsa?", answer: "Vedanta" },
      ],
      traps: [
        {
          title: "Abhinavagupta explained, Vasugupta founded",
          body: "**Abhinavagupta** is the most famous name in Kashmir Shaivism, but the founder is **Vasugupta**.",
        },
        {
          title: "Early Sahajiyas were Buddhist",
          body: "The Sahajiya cult of the **10th and 11th centuries** is **Buddhist**. The Vaishnava Sahajiyas of Bengal came centuries later, so 'early Bhakti' is the trap option.",
        },
      ],
    },
  ],
};
