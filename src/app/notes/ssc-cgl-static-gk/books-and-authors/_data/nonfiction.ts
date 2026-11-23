import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SBA_NONFICTION_NOTE: SubtopicNote = {
  subtopicName: "Non-Fiction Books and Their Authors",
  title: "Non-Fiction Books and Their Authors",
  oneLineDefinition:
    "Books by freedom fighters and leaders, the classic books on Indian music, and modern writing on India's history, nature and society, each with its author.",
  whyItMatters:
    "11 questions in the bank, and 9 of them turn on who wrote a book. The options are other real authors from the same shelf (Tharoor against Sanyal and Das, Paluskar against Bhatkhande), so learn each book with its author and one fact about it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsbanf-leaders",
      name: "Books by freedom fighters and leaders",
      intuition:
        "Most leaders wrote one famous book, and SSC pairs each book with the wrong leader to catch a guess. Keep each leader with his own book and the prison or year that goes with it.",
      definition:
        "The facts:\n" +
        "- **Mahatma Gandhi** wrote **Hind Swaraj** (1909, in Gujarati) and his autobiography, **The Story of My Experiments with Truth**.\n" +
        "- **Jawaharlal Nehru** wrote **The Discovery of India** in **Ahmednagar Fort** prison in 1944, and **Glimpses of World History** as letters to his daughter Indira.\n" +
        "- **Subhas Chandra Bose** wrote **The Indian Struggle**, his account of the national movement.\n" +
        "- **Bhagat Singh** wrote the essay **Why I Am an Atheist** in jail in 1930.\n" +
        "- **B. R. Ambedkar** wrote **Annihilation of Caste** (1936) and **The Buddha and His Dhamma**, published in **1957**, after his death in December 1956.\n" +
        "- **Rabindranath Tagore** won the **Nobel Prize in Literature in 1913** for **Gitanjali**.\n" +
        "- **Bal Gangadhar Tilak** wrote **Gita Rahasya** in **Mandalay** jail; **Dadabhai Naoroji** set out the drain of wealth in **Poverty and Un-British Rule in India**.",
      table: {
        columns: ["Book", "Author", "One fact"],
        rows: [
          { cells: ["Hind Swaraj", "Mahatma Gandhi", "1909, written in Gujarati"] },
          { cells: ["The Story of My Experiments with Truth", "Mahatma Gandhi", "His autobiography"] },
          { cells: ["The Discovery of India", "Jawaharlal Nehru", "Written in Ahmednagar Fort prison, 1944"] },
          { cells: ["Glimpses of World History", "Jawaharlal Nehru", "Letters to his daughter Indira"] },
          { cells: ["The Indian Struggle", "Subhas Chandra Bose", "His account of the national movement"] },
          { cells: ["Why I Am an Atheist", "Bhagat Singh", "Essay written in jail, 1930"] },
          { cells: ["Annihilation of Caste", "B. R. Ambedkar", "1936"] },
          { cells: ["The Buddha and His Dhamma", "B. R. Ambedkar", "Published 1957, after his death"] },
          { cells: ["Gitanjali", "Rabindranath Tagore", "Nobel Prize in Literature, 1913"] },
          { cells: ["Gita Rahasya", "Bal Gangadhar Tilak", "Written in Mandalay jail"] },
          { cells: ["Poverty and Un-British Rule in India", "Dadabhai Naoroji", "The drain of wealth"] },
          { cells: ["Wings of Fire", "A. P. J. Abdul Kalam", "His autobiography"] },
        ],
      },
      pyqExampleId: "6b39b0e0-a5b9-4681-911d-3875e1781614",
      selfCheckExample: {
        prompt: "Which leader wrote Gita Rahasya while in jail at Mandalay?",
        steps: ["Mandalay jail held Bal Gangadhar Tilak from 1908.", "He wrote his commentary on the Gita there."],
        answer: "Bal Gangadhar Tilak",
      },
      practiceSet: [
        { prompt: "Who wrote The Story of My Experiments with Truth?", answer: "Mahatma Gandhi" },
        { prompt: "Who wrote Glimpses of World History?", answer: "Jawaharlal Nehru" },
        { prompt: "Who wrote The Indian Struggle?", answer: "Subhas Chandra Bose" },
        { prompt: "Who wrote Annihilation of Caste?", answer: "B. R. Ambedkar" },
        { prompt: "Who wrote Wings of Fire?", answer: "A. P. J. Abdul Kalam" },
        { prompt: "Who wrote Poverty and Un-British Rule in India?", answer: "Dadabhai Naoroji" },
      ],
      traps: [
        {
          title: "The Discovery of India is Nehru's",
          body: "**The Discovery of India** is by **Jawaharlal Nehru**. Subhas Chandra Bose's book is **The Indian Struggle**.",
        },
        {
          title: "Ambedkar's last book came out after his death",
          body: "**The Buddha and His Dhamma** was published in **1957**; Ambedkar died in December **1956**. A question that says \"appeared after its author's death\" points to him.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsbanf-music",
      name: "Books on Indian music",
      intuition:
        "The two Vishnus of Hindustani music are the classic trap. Paluskar wrote the beginner's primers and founded a school; Bhatkhande sorted the ragas into a system. Learn which Vishnu did which.",
      definition:
        "The facts:\n" +
        "- **Vishnu Digambar Paluskar** founded the **Gandharva Mahavidyalaya** in Lahore in **1901** and wrote music primers such as **Sangeet Bal Prakash** and **Sangeet Bal Bodh**.\n" +
        "- **Vishnu Narayan Bhatkhande** wrote **Hindustani Sangeet Paddhati** and the **Kramik Pustak Malika** series, and grouped ragas into **thaats**.\n" +
        "- **Raag Sarita**, a book of khayal compositions, is by **Pandit Chintaman Raghunath (C. R.) Vyas**.\n" +
        "- **Anup Raag Vilas** is **Kumar Gandharva's** book of his own compositions.\n" +
        "- The old treatises: **Natya Shastra** by **Bharata Muni** (drama, dance and music) and **Sangita Ratnakara** by **Sharngadeva** (13th century).",
      table: {
        columns: ["Book", "Author", "One fact"],
        rows: [
          { cells: ["Sangeet Bal Prakash", "Vishnu Digambar Paluskar", "A primer; he founded the Gandharva Mahavidyalaya, 1901"] },
          { cells: ["Hindustani Sangeet Paddhati", "Vishnu Narayan Bhatkhande", "The thaat system of ragas"] },
          { cells: ["Kramik Pustak Malika", "Vishnu Narayan Bhatkhande", "A graded series of compositions"] },
          { cells: ["Raag Sarita", "C. R. Vyas", "Khayal compositions"] },
          { cells: ["Anup Raag Vilas", "Kumar Gandharva", "His own compositions"] },
          { cells: ["Natya Shastra", "Bharata Muni", "Ancient treatise on drama, dance and music"] },
          { cells: ["Sangita Ratnakara", "Sharngadeva", "13th-century treatise on music"] },
        ],
      },
      pyqExampleId: "b763f651-95bc-4749-823c-b188f5cc731f",
      selfCheckExample: {
        prompt: "Which musicologist grouped Hindustani ragas into thaats?",
        steps: ["Of the two Vishnus, Paluskar is the school-builder and primer writer.", "The raga classifier, author of Hindustani Sangeet Paddhati, is Bhatkhande."],
        answer: "Vishnu Narayan Bhatkhande",
      },
      practiceSet: [
        { prompt: "Who wrote Kramik Pustak Malika?", answer: "Vishnu Narayan Bhatkhande" },
        { prompt: "Which singer wrote Anup Raag Vilas?", answer: "Kumar Gandharva" },
        { prompt: "Who wrote the Natya Shastra?", answer: "Bharata Muni" },
        { prompt: "Who wrote Sangita Ratnakara?", answer: "Sharngadeva" },
        { prompt: "Which music school did Vishnu Digambar Paluskar found in 1901?", answer: "The Gandharva Mahavidyalaya" },
      ],
      traps: [
        {
          title: "Paluskar wrote primers; Bhatkhande built the system",
          body: "**Sangeet Bal Prakash** is **Paluskar's**. **Hindustani Sangeet Paddhati** and the thaats are **Bhatkhande's**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsbanf-modern",
      name: "Modern writing on India and the world",
      intuition:
        "These are the books of India's public writers: economists, diplomats, historians, travellers. Several titles sound alike (An Area of Darkness, An Era of Darkness; The Elephant Paradigm, The Elephant, the Tiger and the Cellphone), and SSC uses that.",
      definition:
        "The facts:\n" +
        "- **Amartya Sen** (Nobel in economics, 1998) wrote **The Argumentative Indian** (2005), essays on India's tradition of debate.\n" +
        "- **Shashi Tharoor** wrote **An Era of Darkness** (2016), on British rule in India; it won him the **Sahitya Akademi Award**. He also wrote **The Elephant, the Tiger and the Cellphone**.\n" +
        "- **V. S. Naipaul** wrote **An Area of Darkness** (1964), a **travelogue** of his first journey through India.\n" +
        "- **Gurcharan Das** wrote **India Unbound** and **The Elephant Paradigm** (2002), essays on a changing India.\n" +
        "- **Pranay Lal** wrote **Indica** (2015), a deep natural history of the subcontinent. **Tony Joseph** wrote **Early Indians**; **Sanjeev Sanyal** wrote **Land of the Seven Rivers**.\n" +
        "- **Pavan K. Varma** wrote **Being Indian** (2004), on Indian identity. It is prose, not poetry.\n" +
        "- **Peter Frankopan** wrote **The Silk Roads** (2015): world history told from the lands between the Mediterranean and China.",
      table: {
        columns: ["Book", "Author", "What it is"],
        rows: [
          { cells: ["The Argumentative Indian", "Amartya Sen", "Essays on India's tradition of debate"] },
          { cells: ["An Era of Darkness", "Shashi Tharoor", "British rule in India; Sahitya Akademi Award"] },
          { cells: ["The Elephant, the Tiger and the Cellphone", "Shashi Tharoor", "Essays on modern India"] },
          { cells: ["An Area of Darkness", "V. S. Naipaul", "Travelogue of his first journey through India"] },
          { cells: ["India Unbound", "Gurcharan Das", "India's economic story since independence"] },
          { cells: ["The Elephant Paradigm", "Gurcharan Das", "Essays on a changing India"] },
          { cells: ["Indica", "Pranay Lal", "Natural history of the subcontinent"] },
          { cells: ["Early Indians", "Tony Joseph", "Where India's people came from"] },
          { cells: ["Land of the Seven Rivers", "Sanjeev Sanyal", "A history of India's geography"] },
          { cells: ["Being Indian", "Pavan K. Varma", "Non-fiction on Indian identity"] },
          { cells: ["Imagining India", "Nandan Nilekani", "Ideas for India's future"] },
          { cells: ["The Silk Roads", "Peter Frankopan", "World history from the lands between Europe and China"] },
        ],
      },
      pyqExampleId: "eab46c4d-2eed-4165-a7ec-9b1ee77783dd",
      selfCheckExample: {
        prompt: "Who wrote Land of the Seven Rivers?",
        steps: ["Of the writers on India's deep past, Tony Joseph wrote Early Indians and Pranay Lal wrote Indica.", "Land of the Seven Rivers is Sanjeev Sanyal's."],
        answer: "Sanjeev Sanyal",
      },
      practiceSet: [
        { prompt: "Who wrote An Area of Darkness?", answer: "V. S. Naipaul" },
        { prompt: "Who wrote An Era of Darkness?", answer: "Shashi Tharoor" },
        { prompt: "Who wrote The Elephant Paradigm?", answer: "Gurcharan Das" },
        { prompt: "Who wrote Indica: A Deep Natural History of the Indian Subcontinent?", answer: "Pranay Lal" },
        { prompt: "Who wrote Early Indians?", answer: "Tony Joseph" },
        { prompt: "Who wrote Imagining India?", answer: "Nandan Nilekani" },
      ],
      traps: [
        {
          title: "Area for Naipaul, Era for Tharoor",
          body: "**An Area of Darkness** (1964) is **V. S. Naipaul's** travelogue. **An Era of Darkness** (2016) is **Shashi Tharoor's** history of British rule.",
        },
        {
          title: "Two elephant books, two authors",
          body: "**The Elephant Paradigm** is by **Gurcharan Das**. **The Elephant, the Tiger and the Cellphone** is by **Shashi Tharoor**.",
        },
        {
          title: "Being Indian is prose",
          body: "Pavan K. Varma's **Being Indian** is non-fiction about identity. A statement that calls it poetry, or links it to a poetry prize, is false.",
        },
      ],
    },
  ],
};
