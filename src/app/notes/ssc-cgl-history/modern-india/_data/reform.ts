import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_REFORM_NOTE: SubtopicNote = {
  subtopicName: "19th Century Social and Religious Reform",
  title: "19th Century Social and Religious Reform",
  oneLineDefinition:
    "The reform societies of Bengal, western India and beyond, their founders and years, and the campaigns against sati, for widow remarriage and against caste.",
  whyItMatters:
    "Thirty-seven questions in the bank: 17 from the 2023 shifts, 17 from the 2024 shifts and only three from the 2025 shifts, and 31 of them EASY. Nearly every question names a society and asks its founder, or names a founder and asks the society, so the founder table on each concept is what to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmorf-bengal",
      name: "Ram Mohan Roy, the Brahmo Samaj and Vidyasagar",
      intuition:
        "Reform began in Calcutta. Ram Mohan Roy attacked idol worship and sati with books, newspapers and debate; the Brahmo Samaj carried his ideas on; Vidyasagar then fought for widows. Learn the bodies in the order they were founded.",
      definition:
        "In time order:\n" +
        "- **Tuhfat-ul-Muwahhidin (A Gift to Monotheists)**, 1803 to 1804: **Ram Mohan Roy's** book in **Persian** against the worship of many gods.\n" +
        "- **Atmiya Sabha (1814)**, Calcutta: **Ram Mohan Roy**.\n" +
        "- **Hindu College, Calcutta (1817)**: backed by Ram Mohan Roy and David Hare. Ram Mohan Roy was the first reformer to see **modern (Western) education** as the way to spread modern ideas.\n" +
        "- **Brahmo Sabha (1828)**, Calcutta, later the **Brahmo Samaj**: **Ram Mohan Roy**. He and the Samaj wrote and debated against sati.\n" +
        "- **Sati banned (1829)** by **Lord William Bentinck**. The Company had held back for years, fearing a religious backlash.\n" +
        "- **Tattvabodhini Sabha (1839)**: **Debendranath Tagore**, who later led the Brahmo Samaj.\n" +
        "- **Hindu Widows' Remarriage Act (1856)**: passed after the campaign of **Ishwar Chandra Vidyasagar**, a **Sanskrit** scholar who also fought child marriage and polygamy.\n" +
        "- **Brahmo Samaj of India (1866)**: **Keshab Chandra Sen's** breakaway.",
      table: {
        columns: ["Body or reform", "Year", "Founder or leader"],
        rows: [
          { cells: ["Atmiya Sabha", "1814", "Ram Mohan Roy"], pyqExampleId: "c8df4d3b-1645-4611-aaa8-2f661126f596" },
          { cells: ["Brahmo Sabha (Brahmo Samaj)", "1828", "Ram Mohan Roy"], pyqExampleId: "e697739f-6a86-408e-9da1-8a96c176b3c4" },
          { cells: ["Sati banned", "1829", "Lord William Bentinck"], pyqExampleId: "4a032d1d-e28e-4611-a9bd-c50ce3f9cd2f" },
          { cells: ["Tattvabodhini Sabha", "1839", "Debendranath Tagore"], pyqExampleId: "d91b8076-f983-428b-a536-c239357cde4d" },
          { cells: ["Hindu Widows' Remarriage Act", "1856", "Ishwar Chandra Vidyasagar"], pyqExampleId: "ccfd5a34-216b-4d62-877d-e95e01c83f60" },
          { cells: ["Brahmo Samaj of India", "1866", "Keshab Chandra Sen"] },
        ],
      },
      pyqExampleId: "045d7dbc-ae57-48ba-b120-f43c57987cb1",
      selfCheckExample: {
        prompt: "Three Brahmo leaders head three different bodies. Match Ram Mohan Roy, Debendranath Tagore and Keshab Chandra Sen to theirs.",
        steps: [
          "Ram Mohan Roy founded the Brahmo Sabha in 1828.",
          "Debendranath Tagore founded the Tattvabodhini Sabha in 1839.",
          "Keshab Chandra Sen led the breakaway Brahmo Samaj of India in 1866.",
        ],
        answer: "Roy: Brahmo Sabha. Debendranath Tagore: Tattvabodhini Sabha. Keshab Chandra Sen: Brahmo Samaj of India.",
      },
      practiceSet: [
        { prompt: "In which language did Ram Mohan Roy write A Gift to Monotheists?", answer: "Persian" },
        { prompt: "Which body did Ram Mohan Roy found in Calcutta in 1814?", answer: "The Atmiya Sabha" },
        { prompt: "Whose campaign led to the Hindu Widows' Remarriage Act of 1856?", answer: "Ishwar Chandra Vidyasagar" },
        { prompt: "Which Governor-General banned sati in 1829?", answer: "Lord William Bentinck" },
        { prompt: "In which classical language was Vidyasagar a scholar?", answer: "Sanskrit" },
      ],
      traps: [
        {
          title: "Vidyasagar was a Sanskrit scholar",
          body: "The title Vidyasagar came from the **Sanskrit College**, Calcutta. A statement calling him a **Persian** scholar is false.",
        },
        {
          title: "Two Hindu Colleges",
          body: "The **Hindu College at Calcutta** dates from **1817**. A college founded in **1791** is the Sanskrit (Hindu) College at **Benaras**, set up by Jonathan Duncan.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmorf-west",
      name: "Arya Samaj, Prarthana Samaj and reform in western India",
      intuition:
        "Bombay and Pune had their own reformers. Two of their societies are asked again and again: the Prarthana Samaj, a cousin of the Brahmo Samaj, and the Arya Samaj, which called for a return to the Vedas.",
      definition:
        "In time order:\n" +
        "- **Paramahansa Mandali (1849)**, Bombay: a secret society against caste rules, with **Dadoba Pandurang**; **Karsondas Mulji** was linked with it.\n" +
        "- **Rahnumai Mazdayasnan Sabha (1851)**: Parsi religious reform, founded by **Naoroji Furdonji, Dadabhai Naoroji** and others.\n" +
        "- **Prarthana Samaj (1867)**, Bombay: founded by **Atmaram Pandurang**; **M. G. Ranade** and **R. G. Bhandarkar** were its leaders.\n" +
        "- **Satyashodhak Samaj (1873)**, Pune: **Jyotiba Phule**, against caste.\n" +
        "- **Arya Samaj (1875)**, founded in **Bombay** by **Swami Dayanand Saraswati**. Its call: **Back to the Vedas**, which it held to be the source of all true knowledge.\n" +
        "- **Stree Purush Tulana (1882)**: **Tarabai Shinde's** comparison of women and men, an early feminist book.\n" +
        "- **Deccan Education Society (1884)** and **Fergusson College (1885)**, Pune: **Bal Gangadhar Tilak**, Agarkar, Chiplunkar and others.",
      table: {
        columns: ["Body or work", "Year", "Founder or leader"],
        rows: [
          { cells: ["Paramahansa Mandali", "1849", "Dadoba Pandurang"], pyqExampleId: "097b8f8b-9d83-466b-9958-55d37fbf0065" },
          { cells: ["Rahnumai Mazdayasnan Sabha", "1851", "Dadabhai Naoroji and others"], pyqExampleId: "6c5440af-c16a-4918-aec0-3cfda3e07fee" },
          { cells: ["Prarthana Samaj", "1867", "Atmaram Pandurang; led by Ranade and Bhandarkar"], pyqExampleId: "77c49d0a-61f6-4c4b-875b-d56ba9808f8a" },
          { cells: ["Satyashodhak Samaj", "1873", "Jyotiba Phule"] },
          { cells: ["Arya Samaj", "1875", "Swami Dayanand Saraswati"], pyqExampleId: "427354ba-722d-440c-8e5e-ec038b9787ff" },
          { cells: ["Stree Purush Tulana", "1882", "Tarabai Shinde"], pyqExampleId: "92cc12f2-2580-49ca-8f89-aefd4192e79d" },
          { cells: ["Fergusson College", "1885", "Tilak and the Deccan Education Society"], pyqExampleId: "b3d6f864-1fee-4cf9-99af-1b2c03341efc" },
        ],
      },
      pyqExampleId: "7222c4af-db33-4bd7-afe8-8ccf0a9da12d",
      selfCheckExample: {
        prompt: "Both were founded in Bombay within eight years of each other. Which society was founded by a doctor and which by a sannyasi?",
        steps: [
          "The Prarthana Samaj was founded in 1867 by Dr Atmaram Pandurang.",
          "The Arya Samaj was founded in 1875 by Swami Dayanand Saraswati.",
        ],
        answer: "Prarthana Samaj: Dr Atmaram Pandurang. Arya Samaj: Swami Dayanand Saraswati.",
      },
      practiceSet: [
        { prompt: "Which reform society gave the call Back to the Vedas?", answer: "The Arya Samaj" },
        { prompt: "Which two scholars led the Prarthana Samaj?", answer: "M. G. Ranade and R. G. Bhandarkar" },
        { prompt: "Who wrote Stree Purush Tulana?", answer: "Tarabai Shinde" },
        { prompt: "Which community did the Rahnumai Mazdayasnan Sabha set out to reform?", answer: "The Parsis" },
        { prompt: "Who founded the Satyashodhak Samaj in 1873?", answer: "Jyotiba Phule" },
      ],
      traps: [
        {
          title: "The Arya Samaj began in Bombay",
          body: "Dayanand founded the **Arya Samaj** in **Bombay in 1875**, though it grew strongest in Punjab. An option of Lahore for its founding is a trap.",
        },
        {
          title: "Gokhale did not found Fergusson College",
          body: "**Tilak** and the Deccan Education Society founded it. **Gokhale** joined later as a life member and teacher.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmorf-others",
      name: "Theosophy, Vivekananda, and the Muslim, Sikh and caste reformers",
      intuition:
        "Outside Bengal and Bombay, reform took many shapes: a world body that praised Indian religions, a monk who spoke for Hinduism abroad, Muslim and Sikh revivals, and leaders of castes and tribes that the older reformers had left out.",
      definition:
        "The bodies and their leaders:\n" +
        "- **Theosophical Society**: founded in **New York in 1875** by **Madame H. P. Blavatsky** and **Colonel H. S. Olcott**; headquarters moved to **Adyar, Madras** (1882). **Annie Besant** later led it and promoted the study of ancient Indian religions.\n" +
        "- **Swami Vivekananda**: spoke at the **World's Parliament of Religions, Chicago, 1893**; founded the **Ramakrishna Mission (1897)**, with its headquarters at **Belur Math**.\n" +
        "- **Aligarh Movement**: **Sir Sayyid Ahmad Khan**; Muhammadan Anglo-Oriental College (1875).\n" +
        "- **Singh Sabha Movement**: began at **Amritsar in 1873**.\n" +
        "- **Satnami movement**: **Guru Ghasidas**, in Chhattisgarh, among the leather-working Chamars.\n" +
        "- **Sree Narayana Guru**, Kerala: \"one caste, one religion, one god for humankind\".\n" +
        "- **B. R. Ambedkar**: the **Samata Sainik Dal (1927)** and a **temple entry movement** begun in **1927**.\n" +
        "- **Thakkar Bapa**: lifelong work for **tribal (Adivasi)** communities; the Bhil Seva Mandal (1922).",
      table: {
        columns: ["Movement or body", "Leader", "Fact"],
        rows: [
          { cells: ["Theosophical Society", "Blavatsky and Olcott", "New York 1875; Adyar from 1882"], pyqExampleId: "8f19b5df-9e3c-4798-9629-e1887702528c" },
          { cells: ["Ramakrishna Mission", "Swami Vivekananda", "1897; Belur Math"], pyqExampleId: "672ff5b6-a208-44d0-a9e6-f9d70a7fa2ef" },
          { cells: ["Aligarh Movement", "Sayyid Ahmad Khan", "Muhammadan Anglo-Oriental College, 1875"], pyqExampleId: "2e87e509-eb25-4f1c-9d28-1baa10ff2c24" },
          { cells: ["Singh Sabha Movement", "Sikh reformers", "Amritsar, 1873"], pyqExampleId: "b1e9b33f-d783-47c5-9299-e1ef4d882a1e" },
          { cells: ["Satnami movement", "Guru Ghasidas", "Chhattisgarh, among leather workers"], pyqExampleId: "ac0967aa-5089-46f4-85e5-d63fcfff6fb4" },
          { cells: ["Samata Sainik Dal", "B. R. Ambedkar", "1927"], pyqExampleId: "0f06b027-c93f-49f7-ae93-85b8b4b2fb61" },
        ],
      },
      pyqExampleId: "fd193666-7373-4cac-b974-fd877b6e0d6c",
      selfCheckExample: {
        prompt: "Which reform body was founded abroad, where, and by whom?",
        steps: [
          "The Theosophical Society was founded in New York in 1875.",
          "Its founders were Madame Blavatsky and Colonel Olcott; it moved to Adyar, Madras, in 1882.",
        ],
        answer: "The Theosophical Society: New York, 1875, by Blavatsky and Olcott.",
      },
      practiceSet: [
        { prompt: "In which city and year did Vivekananda address the World's Parliament of Religions?", answer: "Chicago, 1893" },
        { prompt: "Whose motto was one caste, one religion, one god for humankind?", answer: "Sree Narayana Guru" },
        { prompt: "Who founded the Aligarh Movement?", answer: "Sir Sayyid Ahmad Khan" },
        { prompt: "Through which society did Annie Besant promote the study of ancient Indian religions?", answer: "The Theosophical Society" },
        { prompt: "Which body did B. R. Ambedkar form in 1927?", answer: "The Samata Sainik Dal" },
      ],
      traps: [
        {
          title: "Besant led the Theosophists but did not found them",
          body: "**Blavatsky and Olcott** founded the Theosophical Society in **1875**. **Annie Besant** joined later and led it in India.",
        },
        {
          title: "Ramakrishna did not found the Mission",
          body: "The **Ramakrishna Mission** was founded by his disciple **Vivekananda** in **1897**, eleven years after Ramakrishna's death.",
        },
      ],
    },
  ],
};
