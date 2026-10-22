import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_CULTURE_NOTE: SubtopicNote = {
  subtopicName: "Historians, Writers and Orientalists",
  title: "Historians, Writers and Orientalists",
  oneLineDefinition:
    "The orientalist scholars, museums and colonial buildings of British India, the books, poems and art of the national movement, and the modern historians whose books CDS matches with their authors.",
  whyItMatters:
    "Sixteen CDS questions, ten of them HARD. Most are pure matching: a book with its author, a society with its founder. They cannot be reasoned out, so this page is a list to learn, with the traps where two people share a surname or a subject.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-orientalists",
      name: "Orientalists, museums and colonial buildings",
      intuition:
        "Some British officials in Calcutta set out to study India's languages, laws and past. They founded a society, taught Sanskrit to young officers and translated old texts. " +
        "Later the government built museums, passed a law on found treasure and put up grand buildings in Bombay.",
      definition:
        "The scholars and the landmarks:\n" +
        "- **Asiatic Society of Bengal (1784)**: founded by **Sir William Jones**, its first president. **Warren Hastings** declined the presidency and became its patron.\n" +
        "- **Charles Wilkins** translated the **Bhagavad Gita** into English (1785).\n" +
        "- **Henry Thomas Colebrooke** was **Professor of Sanskrit** at **Fort William College** (from 1801).\n" +
        "- **Siyar-ul-Mutakherin**: a Persian history of 18th-century Bengal, describing Plassey, by **Ghulam Husain Tabatabai**.\n" +
        "- **Indian Museum, Calcutta (1814)**; **Government Museum, Madras (1851)**; **Indian Treasure Trove Act (1878)**.\n" +
        "- **Bombay Secretariat** (1870s, Venetian Gothic): designed by **H. St Clair Wilkins** of the Royal Engineers.",
      table: {
        columns: ["Name", "Year", "Fact"],
        rows: [
          { cells: ["Asiatic Society of Bengal", "1784", "Founded by William Jones; Hastings its patron"] },
          { cells: ["Bhagavad Gita in English", "1785", "Translated by Charles Wilkins"] },
          {
            cells: ["Henry Thomas Colebrooke", "1801", "Professor of Sanskrit, Fort William College"],
            pyqExampleId: "9a121e8b-3ea6-4b81-a566-10e9a4096037",
          },
          {
            cells: ["Siyar-ul-Mutakherin", "1780s", "Ghulam Husain Tabatabai"],
            pyqExampleId: "9579efbf-5bdf-44e7-9a00-08b5225ec2c5",
          },
          { cells: ["Indian Museum, Calcutta", "1814", "Oldest museum in India"] },
          { cells: ["Government Museum, Madras", "1851", "Museum founded at Madras"] },
          {
            cells: ["Bombay Secretariat", "1870s", "Designed by H. St Clair Wilkins"],
            pyqExampleId: "b81ddac4-4b84-4bec-bc8f-675b4d940d29",
          },
          { cells: ["Indian Treasure Trove Act", "1878", "Law on treasure found in the ground"] },
        ],
      },
      pyqExampleId: "70bd0274-f4fa-4aa4-8710-d9b93db6088d",
      selfCheckExample: {
        prompt: "What is the Siyar-ul-Mutakherin, and who wrote it?",
        steps: [
          "It is a Persian history of 18th-century Bengal.",
          "It describes the Battle of Plassey and the rise of English power, and it was written by Ghulam Husain Tabatabai.",
        ],
        answer: "A Persian history of 18th-century Bengal (including Plassey), by Ghulam Husain.",
      },
      practiceSet: [
        { prompt: "Who translated the Bhagavad Gita into English in 1785?", answer: "Charles Wilkins" },
        { prompt: "At which institution was Henry Colebrooke Professor of Sanskrit?", answer: "Fort William College, Calcutta" },
        { prompt: "In which year was the Indian Museum founded in Calcutta?", answer: "1814" },
        { prompt: "In which architectural style was the Bombay Secretariat built?", answer: "Venetian Gothic" },
      ],
      traps: [
        {
          title: "Two Wilkinses",
          body: "**Charles Wilkins** was the orientalist who translated the Gita. **H. St Clair Wilkins** was the engineer who designed the Bombay Secretariat.",
        },
        {
          title: "Colebrooke taught; he did not found",
          body: "Colebrooke's chair was at **Fort William College**. He was a member and later president of the Asiatic Society, but its founder was **William Jones**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-literature",
      name: "Books, poems and art of the national movement",
      intuition:
        "Writers and artists carried the national movement as much as speeches did. A play exposed the indigo planters, a novel gave India a song, a poem made a heroine of the Rani of Jhansi, and revolutionaries wrote about their prisons.",
      definition:
        "The works in time order:\n" +
        "- **Neel Darpan (1860)**: a Bengali play by **Dinabandhu Mitra** on the cruelty of the **indigo planters**. **Michael Madhusudan Dutt** translated it into English; **Rev. James Long**, who published it, was fined.\n" +
        "- **Anandamath (1882)**: by **Bankim Chandra Chattopadhyay**; it contains **Vande Mataram**.\n" +
        "- **Indian Society of Oriental Art (1907)**: founded by **Abanindranath Tagore**, with Gaganendranath Tagore and E.B. Havell, to revive Indian painting.\n" +
        "- **Amar Katha (1910 to 1913)**: the autobiography of the actress **Binodini Dasi**. **Amar Jiban** is the earlier autobiography of **Rashsundari Debi**.\n" +
        "- **Bandi Jivan**: the prison memoir of **Sachindranath Sanyal**, founder of the Hindustan Republican Association.\n" +
        "- **Jhansi ki Rani** (\"Khoob ladi mardani woh to Jhansi wali rani thi\"): by **Subhadra Kumari Chauhan**.\n" +
        "- **The Indian Struggle**: **Subhas Chandra Bose's** account of the movement, carried to 1942.\n" +
        "- **Maze Vidyapeeth** (My University): a Marathi poem by **Narayan Surve** on the working class of Bombay.",
      table: {
        columns: ["Work or body", "Kind", "By"],
        rows: [
          {
            cells: ["Neel Darpan", "Bengali play, 1860", "Dinabandhu Mitra; English by Michael Madhusudan Dutt"],
            pyqExampleId: "326bffb5-fee1-4ba3-a1b4-b90dcb22c176",
          },
          { cells: ["Anandamath", "Bengali novel, 1882", "Bankim Chandra Chattopadhyay"] },
          {
            cells: ["Indian Society of Oriental Art", "Art society, 1907", "Abanindranath Tagore and others"],
            pyqExampleId: "3bc9f7a4-e032-450d-a9eb-363ab472051e",
          },
          {
            cells: ["Amar Katha", "Autobiography, 1910 to 1913", "Binodini Dasi"],
            pyqExampleId: "94911448-4f34-49dc-ac89-62dbabb7d685",
          },
          {
            cells: ["Bandi Jivan", "Prison memoir", "Sachindranath Sanyal"],
            pyqExampleId: "29235f34-ba55-4694-8e7f-30e588b28dbd",
          },
          {
            cells: ["Jhansi ki Rani", "Hindi poem", "Subhadra Kumari Chauhan"],
            pyqExampleId: "7db1f1e4-0c85-46cf-881d-600c8bee51d1",
          },
          {
            cells: ["The Indian Struggle", "History of the movement", "Subhas Chandra Bose"],
            pyqExampleId: "a8f0b8c8-f5fe-4108-85f8-159a841eae4d",
          },
          {
            cells: ["Maze Vidyapeeth", "Marathi poem", "Narayan Surve"],
            pyqExampleId: "64a35873-8d04-4092-b022-23a717d256d9",
          },
        ],
      },
      pyqExampleId: "5ebc4415-d686-4a51-b2d0-edd0bb01748b",
      selfCheckExample: {
        prompt: "Three people are linked to Neel Darpan. Who wrote it, who translated it, and who was punished for publishing it?",
        steps: [
          "Dinabandhu Mitra wrote the Bengali play.",
          "Michael Madhusudan Dutt made the English translation.",
          "Rev. James Long published it and was fined.",
        ],
        answer: "Written by Dinabandhu Mitra, translated by Michael Madhusudan Dutt, published by James Long, who was fined.",
      },
      practiceSet: [
        { prompt: "Whose autobiography is Amar Jiban?", answer: "Rashsundari Debi's" },
        { prompt: "Which revolutionary wrote the prison memoir Bandi Jivan?", answer: "Sachindranath Sanyal" },
        { prompt: "Which Marathi poet wrote Maze Vidyapeeth?", answer: "Narayan Surve" },
        { prompt: "Who wrote the Hindi poem Jhansi ki Rani?", answer: "Subhadra Kumari Chauhan" },
      ],
      traps: [
        {
          title: "Written by one, translated by another",
          body: "**Dinabandhu Mitra** wrote Neel Darpan. The question about its **English translation** wants **Michael Madhusudan Dutt**. James Long only published it.",
        },
        {
          title: "Abanindranath, not Rabindranath",
          body: "The **Indian Society of Oriental Art** was founded by **Abanindranath Tagore**, the painter. Rabindranath and Dwarakanath are the Tagore distractors.",
        },
        {
          title: "Amar Katha and Amar Jiban",
          body: "**Amar Katha** is **Binodini Dasi's**. The similar title **Amar Jiban** belongs to **Rashsundari Debi**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-historians",
      name: "Historians of modern India and their books",
      intuition:
        "CDS sometimes asks you to match modern historians with their books. The trick is to tie each book to its subject: a historian of Swadeshi, of Chauri Chaura, of the Permanent Settlement, of the Congress in one province.",
      definition:
        "Historian and book:\n" +
        "- **Sumit Sarkar**: The Swadeshi Movement in Bengal, 1903 to 1908.\n" +
        "- **Shahid Amin**: Event, Metaphor, Memory: Chauri Chaura, 1922 to 1992.\n" +
        "- **Ranajit Guha**: A Rule of Property for Bengal (on the Permanent Settlement).\n" +
        "- **Bipan Chandra**: The Rise and Growth of Economic Nationalism in India.\n" +
        "- **Sekhar Bandyopadhyay**: From Plassey to Partition.\n" +
        "- **Sarvepalli Gopal**: Jawaharlal Nehru: A Biography.\n" +
        "- **David Hardiman**: Gandhi in His Time and Ours.\n" +
        "- **Gyanendra Pandey**: The Ascendancy of the Congress in Uttar Pradesh, 1926 to 1934.\n" +
        "- **Ashis Nandy** argued that a single, homogenised Hinduism was a modern idea built by the **cultural arrogance of post-Enlightenment Europe**.",
      table: {
        columns: ["Historian", "Book or idea", "Subject"],
        rows: [
          {
            cells: ["Sumit Sarkar", "The Swadeshi Movement in Bengal", "Swadeshi, 1903 to 1908"],
            noteAmber: "CDS 2016 (II) matched these first four.",
            pyqExampleId: "9fe0c48f-ac5f-4237-bcb8-819a9d812aca",
          },
          { cells: ["Shahid Amin", "Event, Metaphor, Memory", "Chauri Chaura"] },
          { cells: ["Ranajit Guha", "A Rule of Property for Bengal", "The Permanent Settlement"] },
          { cells: ["Bipan Chandra", "The Rise and Growth of Economic Nationalism in India", "Early Congress economics"] },
          { cells: ["Sekhar Bandyopadhyay", "From Plassey to Partition", "Survey of modern India"] },
          { cells: ["Sarvepalli Gopal", "Jawaharlal Nehru: A Biography", "Nehru's life"] },
          { cells: ["David Hardiman", "Gandhi in His Time and Ours", "Gandhi's ideas"] },
          { cells: ["Gyanendra Pandey", "The Ascendancy of the Congress in Uttar Pradesh", "Congress in UP, 1926 to 1934"] },
          {
            cells: ["Ashis Nandy", "Homogenised Hinduism built by post-Enlightenment Europe", "Religion and colonialism"],
            pyqExampleId: "2cdad12d-28ee-403f-92e5-496f2edb80fe",
          },
        ],
      },
      pyqExampleId: "bf9bd569-b5e8-436d-afd1-2519d5da5d43",
      selfCheckExample: {
        prompt: "Which historian argued that a single homogenised Hinduism was built by the cultural arrogance of post-Enlightenment Europe?",
        steps: [
          "The argument is about a plural set of faiths being forced into one organised religion under European influence.",
          "That is the social theorist Ashis Nandy, not Partha Chatterjee or Rajni Kothari.",
        ],
        answer: "Ashis Nandy.",
      },
      practiceSet: [
        { prompt: "Who wrote A Rule of Property for Bengal?", answer: "Ranajit Guha" },
        { prompt: "Which historian wrote a history of Chauri Chaura from 1922 to 1992?", answer: "Shahid Amin" },
        { prompt: "Who wrote The Rise and Growth of Economic Nationalism in India?", answer: "Bipan Chandra" },
      ],
      traps: [
        {
          title: "Sarkar wrote on Swadeshi",
          body: "**Sumit Sarkar's** book is on the **Swadeshi movement**. **Economic nationalism** is **Bipan Chandra's** subject. The wrong codes swap these two.",
        },
      ],
    },
  ],
};
