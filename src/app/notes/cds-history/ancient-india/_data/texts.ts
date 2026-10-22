import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_TEXTS_NOTE: SubtopicNote = {
  subtopicName: "Literature, Grammar and Science",
  title: "Literature, Grammar and Science",
  oneLineDefinition:
    "The grammarians Panini, Katyayana and Patanjali, Shruti and Smriti, the Sanskrit plays and poems CDS matches with their authors, and the early manuscripts of mathematics and medicine.",
  whyItMatters:
    "Ten questions, all from 2020 onward and six of them HARD. They test who wrote what, which text came first, and what a manuscript is about. A table of authors and subjects answers almost all of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-grammar",
      name: "Grammarians and the order of texts",
      intuition:
        "Sanskrit grammar was built in three steps: Panini wrote the rules, Katyayana added notes, and Patanjali wrote a great commentary on both. " +
        "Knowing that chain tells you who came before whom.",
      definition:
        "- **Panini** wrote the **Ashtadhyayi**, a Sanskrit grammar of about the fifth or fourth century BCE. It is older than the Natyashastra, the Manusmriti and the surviving Sushruta Samhita.\n" +
        "- **Katyayana** wrote **varttikas**, critical notes on Panini's rules.\n" +
        "- **Patanjali** wrote the **Mahabhashya**, a commentary on Panini and Katyayana, in Shunga times. It is a book of **grammar**: people and events appear in it only as examples. It does **not** mention Kautilya.\n" +
        "- **Shruti** (heard) is revealed literature: the **Vedas**. **Smriti** (remembered) is human-made: the **Vedangas** such as the **Kalpa Sutras**, the **epics** and the **Puranas**.",
      table: {
        columns: ["Text or class", "Fact"],
        rows: [
          {
            cells: ["Ashtadhyayi", "Panini's grammar, about the 5th or 4th century BCE"],
            noteAmber: "CDS 2025 (I): earlier than the Natyashastra, the Sushruta Samhita and the Manusmriti.",
            pyqExampleId: "61be6088-ea88-47b6-b337-9e403d37e39c",
          },
          { cells: ["Varttikas", "Katyayana's notes on Panini's rules"] },
          {
            cells: ["Mahabhashya", "Patanjali's commentary on Panini and Katyayana; history only in passing"],
            pyqExampleId: "57d13831-853e-4cb6-b59f-e8e3dbe2fe29",
          },
          { cells: ["Shruti", "Revealed texts: the Vedas"] },
          {
            cells: ["Smriti", "Remembered texts: Vedangas such as the Kalpa Sutras, the epics, the Puranas"],
            pyqExampleId: "ef2d7945-753c-4e22-8650-bd21fc5664da",
          },
        ],
      },
      pyqExampleId: "60d2fd94-7ae9-4f5d-ab44-bd786f88a49b",
      selfCheckExample: {
        prompt: "Is the Ramayana Shruti or Smriti, and why?",
        steps: [
          "Shruti is literature held to be revealed: only the Vedas.",
          "The epics were composed and remembered by people.",
        ],
        answer: "Smriti, because it is a remembered, human composition, not revealed like the Vedas.",
      },
      practiceSet: [
        { prompt: "Who wrote the Mahabhashya?", answer: "Patanjali" },
        { prompt: "Who wrote the Ashtadhyayi?", answer: "Panini" },
        { prompt: "Does Patanjali's Mahabhashya mention Kautilya?", answer: "No" },
        { prompt: "Are the Kalpa Sutras Shruti or Smriti?", answer: "Smriti" },
      ],
      traps: [
        {
          title: "Katyayana sits between Panini and Patanjali",
          body: "Katyayana commented on Panini, and Patanjali commented on both of them. So Katyayana was neither Panini's nor Patanjali's contemporary.",
        },
        {
          title: "The Vedas are Shruti",
          body: "The Vedas are Shruti, revealed literature. Smriti covers the Vedangas, epics and Puranas, so an option putting the Vedas in Smriti is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-literature",
      name: "Plays, poems and stories",
      intuition:
        "CDS likes a four-pair match of Sanskrit works and authors. Learn the pairs as you would learn capitals of countries.",
      definition:
        "- **Bhasa**: Duta Ghatotkacha and other one-act plays from the Mahabharata.\n" +
        "- **Shudraka**: the **Mrichchhakatika** (The Little Clay Cart).\n" +
        "- **Bharavi**: the **Kiratarjuniya**.\n" +
        "- **Bhatti**: the **Ravanavadha**, also called the Bhattikavya, which tells Rama's story while teaching grammar.\n" +
        "- **Ashvaghosha**: the **Buddhacharita**, the **Saundarananda** and the play **Sariputraprakarana**.\n" +
        "- The **Panchatantra**, said to be by **Vishnu Sharma**, uses animal fables to show **what should and should not be done** in life.",
      table: {
        columns: ["Work", "Author"],
        rows: [
          { cells: ["Duta Ghatotkacha", "Bhasa"] },
          { cells: ["Mrichchhakatika", "Shudraka"] },
          { cells: ["Kiratarjuniya", "Bharavi"] },
          { cells: ["Ravanavadha (Bhattikavya)", "Bhatti"] },
          {
            cells: ["Buddhacharita, Saundarananda, Sariputraprakarana", "Ashvaghosha"],
            noteAmber: "CDS 2022 (II): the Manjushrimulakalpa was the one not by him.",
            pyqExampleId: "becffe8a-3745-47f8-a8e8-af4b3cfd90c2",
          },
          {
            cells: ["Panchatantra", "Vishnu Sharma"],
            pyqExampleId: "ae5f113c-3333-4925-b78c-b088f3b83c7d",
          },
        ],
      },
      pyqExampleId: "dd9f3094-2d9c-444e-ac15-703c4a5d1598",
      selfCheckExample: {
        prompt: "A student says the Panchatantra is a philosophical text that refutes rival schools. What is it really?",
        steps: [
          "Its stories are about animals who act wisely or foolishly.",
          "Each story ends with a lesson on how to behave.",
        ],
        answer: "A book of fables that shows by example what should and should not be done.",
      },
      practiceSet: [
        { prompt: "Who wrote the Buddhacharita?", answer: "Ashvaghosha" },
        { prompt: "Who is said to have composed the Panchatantra?", answer: "Vishnu Sharma" },
        { prompt: "In which language did Ashvaghosha write the Buddhacharita?", answer: "Sanskrit" },
      ],
      traps: [
        {
          title: "Mrichchhakatika is Shudraka's",
          body: "The Mrichchhakatika is by Shudraka and the Duta Ghatotkacha by Bhasa. Do not hand Bhasa's plays to Shudraka or the other way round.",
        },
        {
          title: "The Manjushrimulakalpa is not Ashvaghosha's",
          body: "Ashvaghosha wrote the Buddhacharita, Saundarananda and Sariputraprakarana. The Manjushrimulakalpa is a much later Mahayana text.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-science",
      name: "Manuscripts of mathematics and medicine",
      intuition:
        "Two old birch-bark manuscripts carry their finders' or villages' names, and CDS asks what each is about. " +
        "One is mathematics, one is medicine: keep them apart.",
      definition:
        "- The **Bakshali manuscript**, found near Peshawar, is in **Gatha**, a form of Prakrit, in the **Sharada** script. It deals with **fractions, square roots and progressions**.\n" +
        "- The **Bower manuscript**, birch-bark leaves found at **Kucha** in Central Asia, is a source on **medicine**.\n" +
        "- **Aryabhata** gave **pi** as **3.1416**, correct to four decimal places.\n" +
        "- The **Sushruta Samhita** is on **surgery**; the **Charaka Samhita** on **medicine**.\n" +
        "- The **Sharangadhara Samhita** is a medieval book of **Ayurveda**, not a book on politics.",
      table: {
        columns: ["Text", "Subject", "Key fact"],
        rows: [
          {
            cells: ["Bakshali manuscript", "Mathematics", "Gatha Prakrit in Sharada script; fractions, square roots, progressions"],
            noteAmber: "CDS 2023 (II): the Sharangadhara Samhita as a political text was the false statement.",
            pyqExampleId: "03421545-1cd0-4654-98e3-efb5de6fda21",
          },
          { cells: ["Bower manuscript", "Medicine", "Birch bark, found at Kucha in Central Asia"] },
          { cells: ["Aryabhatiya", "Mathematics and astronomy", "Pi as 3.1416"] },
          { cells: ["Sushruta Samhita", "Surgery", "An early medical classic"] },
          { cells: ["Charaka Samhita", "Medicine", "An early medical classic"] },
          { cells: ["Sharangadhara Samhita", "Ayurveda", "A medieval medical text"] },
        ],
      },
      pyqExampleId: "4775a213-7896-45f5-ba0a-b3f2e72644e4",
      selfCheckExample: {
        prompt: "What value of pi did Aryabhata give, and to how many decimal places is it correct?",
        steps: ["He gave the ratio of a circle's circumference to its diameter as 62,832 to 20,000.", "That is 3.1416."],
        answer: "3.1416, correct to four decimal places.",
      },
      practiceSet: [
        { prompt: "What is the Sushruta Samhita about?", answer: "Surgery" },
        { prompt: "In which script is the Bakshali manuscript written?", answer: "Sharada" },
        { prompt: "Is the Sharangadhara Samhita about politics or medicine?", answer: "Medicine (Ayurveda)" },
      ],
      traps: [
        {
          title: "Bakshali is maths, Bower is medicine",
          body: "The Bakshali manuscript deals with arithmetic; the Bower manuscript with remedies and treatment. They are both birch-bark finds, so they are easy to swap.",
        },
      ],
    },
  ],
};
