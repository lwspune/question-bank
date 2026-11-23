import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_CLASSICAL_NOTE: SubtopicNote = {
  subtopicName: "Classical Dances: States and Features",
  title: "Classical Dances: States and Features",
  oneLineDefinition:
    "The eight classical dances of India, the state each one comes from, the words and texts SSC ties to each dance, and the four gharanas of Kathak.",
  whyItMatters:
    "26 questions in the bank, 18 of them from the 2023 shifts. Most give a dance and ask its state, or give a word from inside a dance (Alarippu, Kalasam, Mati Akhora) and ask which dance it belongs to. Learn the eight dances with their states first: the same list lets you strike wrong options on every folk-dance page later.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsaccl-test",
      name: "Classical or folk: the eight-name test",
      intuition:
        "SSC often puts one classical dance among folk dances, or one folk dance among classical ones. If the eight classical names are fixed in your head, you can sort every option in a second.",
      definition:
        "The **Sangeet Natak Akademi** recognises **eight** classical dances. A classical dance takes its theory from Bharata Muni's **Natya Shastra** and has a fixed grammar of steps, hand gestures (mudras) and expressions.\n" +
        "- **South:** Bharatanatyam (Tamil Nadu), Kuchipudi (Andhra Pradesh).\n" +
        "- **Kerala:** Kathakali, Mohiniyattam.\n" +
        "- **East and North-East:** Odissi (Odisha), Sattriya (Assam), Manipuri (Manipur).\n" +
        "- **North:** Kathak.\n\n" +
        "Any other name in the options is a folk dance, a dance-drama or a revived temple dance. Yakshagana, Vilasini Natyam and Perini Shivatandavam are not among the eight.\n" +
        "- **Speed move:** for a \"which state\" question, name the dance's home state from this list, then strike every option that is the home of a different classical dance.",
      authoredExample: {
        prompt: "Which of these is NOT one of India's eight classical dances? (a) Sattriya (b) Mohiniyattam (c) Yakshagana (d) Kuchipudi",
        steps: [
          "Sattriya (Assam), Mohiniyattam (Kerala) and Kuchipudi (Andhra Pradesh) are all on the list of eight.",
          "Yakshagana is the dance-drama of coastal Karnataka. It is not on the list.",
        ],
        answer: "(c) Yakshagana",
      },
      selfCheckExample: {
        prompt: "Four dances are listed: Kathakali, Odissi, Garba and Manipuri. Which one is a folk dance?",
        steps: [
          "Kathakali, Odissi and Manipuri are three of the eight classical dances.",
          "Garba, the Navratri circle dance of Gujarat, is not on the list, so it is the folk dance.",
        ],
        answer: "Garba",
      },
      practiceSet: [
        { prompt: "How many classical dances does the Sangeet Natak Akademi recognise?", answer: "Eight" },
        { prompt: "From which ancient text do India's classical dances take their theory?", answer: "The Natya Shastra of Bharata Muni" },
        { prompt: "Which classical dance belongs to north India?", answer: "Kathak" },
        { prompt: "Is Yakshagana one of the eight classical dances?", answer: "No. It is the dance-drama of coastal Karnataka." },
      ],
      traps: [
        {
          title: "Yakshagana is not classical",
          body: "Yakshagana is a famous dance-drama of Karnataka, but it is not one of the eight classical dances. Karnataka has no classical dance of its own on the list.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsaccl-eight",
      name: "The eight classical dances and their states",
      intuition:
        "Each classical dance belongs to one state, grew in one setting (a temple, a court or a monastery) and has one fact everybody links to it. SSC asks the state more often than anything else.",
      definition:
        "- **Bharatanatyam**, Tamil Nadu: from the temples; its themes are mainly **Shaiva** (Shiva as Nataraja).\n" +
        "- **Kathak**, north India: from the kathakars, the storytellers of the epics; it later grew in the Mughal and Nawabi courts.\n" +
        "- **Kathakali**, Kerala: a dance-drama with painted faces and huge skirts.\n" +
        "- **Mohiniyattam**, Kerala: a graceful solo dance of women.\n" +
        "- **Kuchipudi**, Andhra Pradesh: named after **Kuchipudi village** in Krishna district.\n" +
        "- **Odissi**, Odisha: grew from the temple dance of the **Maharis** at the **Jagannath Temple, Puri**.\n" +
        "- **Sattriya**, Assam: created by **Srimanta Sankardeva** in the 15th century and kept alive in the Vaishnava monasteries (sattras).\n" +
        "- **Manipuri**, Manipur: the **Ras Lila** of Radha and Krishna is its heart.\n\n" +
        "Two revived dances are often put beside them. **Vilasini Natyam** is the temple and court dance of the devadasis of **Andhra Pradesh**. **Perini Shivatandavam** is a warrior dance of **Telangana** from the time of the **Kakatiya** kings, revived in the 20th century by Nataraja Ramakrishna.",
      table: {
        columns: ["Dance", "State", "Remember for"],
        rows: [
          { cells: ["Bharatanatyam", "Tamil Nadu", "Temple dance; Shaiva themes"], pyqExampleId: "ce678da6-d7c2-449e-9b73-546a5e24d392" },
          { cells: ["Kathak", "North India (Uttar Pradesh, Rajasthan)", "The storytellers' dance"] },
          { cells: ["Kathakali", "Kerala", "Dance-drama with painted faces"], pyqExampleId: "ca2557b1-ce74-43a8-ae42-dae160e0aa70" },
          { cells: ["Mohiniyattam", "Kerala", "Graceful solo dance of women"] },
          { cells: ["Kuchipudi", "Andhra Pradesh", "Named after Kuchipudi village"], pyqExampleId: "ef19ea63-be71-4aa4-861e-0370282a59cb" },
          { cells: ["Odissi", "Odisha", "Maharis of the Jagannath Temple, Puri"], pyqExampleId: "22479c6b-4a6e-40d9-9e5d-a9e4afb35343" },
          { cells: ["Sattriya", "Assam", "Srimanta Sankardeva; the sattras"], pyqExampleId: "f6b4ef86-4efd-4664-9d11-6930ae60ee06" },
          { cells: ["Manipuri", "Manipur", "The Ras Lila"], pyqExampleId: "ceb74bba-390c-4a89-b4e0-a13a5079e605" },
          { cells: ["Vilasini Natyam (not one of the eight)", "Andhra Pradesh", "Revived temple and court dance"] },
          { cells: ["Perini Shivatandavam (not one of the eight)", "Telangana", "Kakatiya warrior dance"], pyqExampleId: "f8886728-8cdf-4ded-9ddf-ab6a3012c81a" },
        ],
      },
      pyqExampleId: "eb526854-2fac-4d12-9465-0a11e5335491",
      selfCheckExample: {
        prompt: "Which classical dance grew from the temple dance of the Maharis at Puri?",
        steps: [
          "The Maharis danced at the Jagannath Temple in Puri, Odisha.",
          "Odisha's classical dance is Odissi.",
        ],
        answer: "Odissi",
      },
      practiceSet: [
        { prompt: "Kuchipudi takes its name from a village in which state?", answer: "Andhra Pradesh" },
        { prompt: "Which classical dance belongs to Tamil Nadu?", answer: "Bharatanatyam" },
        { prompt: "Perini Shivatandavam belongs to which state?", answer: "Telangana" },
        { prompt: "In which state did Sattriya grow?", answer: "Assam" },
        { prompt: "The themes of which classical dance are mainly Shaiva?", answer: "Bharatanatyam" },
      ],
      traps: [
        {
          title: "Kerala has two classical dances",
          body: "Kathakali and Mohiniyattam are both from Kerala. An option giving Mohiniyattam to Tamil Nadu is wrong: Tamil Nadu's classical dance is Bharatanatyam.",
        },
        {
          title: "Perini is Kakatiya, not Chola",
          body: "Perini Shivatandavam was danced before battle in the Kakatiya kingdom of the Telugu country (now Telangana). A statement linking it to the Chola court of Tamil Nadu is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsaccl-terms",
      name: "Terms, plays and styles of each dance",
      intuition:
        "SSC gives one word from inside a dance (an opening item, a song, an exercise, a style) and asks which dance it belongs to. Learn each word with its dance.",
      definition:
        "- **Bharatanatyam:** a recital opens with **Alarippu**, then Jatiswaram, Shabdam and Varnam. Its styles (banis) are named after places or schools: **Pandanallur, Thanjavur, Vazhuvoor, Melattur** and **Kalakshetra** (Rukmini Devi Arundale's).\n" +
        "- **Kathakali:** its plays are called **attakatha**; **Nalacharitam** by Unnayi Warrier is the most famous. **Kalasam** is a pure-dance passage danced between lines of the song.\n" +
        "- **Sattriya:** the **Borgeet** are devotional songs of Sankardeva and Madhavdeva that go with it; **Mati Akhora** is its set of basic ground exercises.\n" +
        "- **Manipuri:** **Lai Haraoba**, the ritual festival dance of the Meitei people, is its earliest form.\n" +
        "- **Mohiniyattam:** danced in the **lasya** style, soft and graceful, the opposite of the vigorous **tandava**.\n" +
        "- **Odissi:** **chowk** (a square stance) and **tribhanga** (the body bent in three places) are its two basic postures.",
      table: {
        columns: ["Term", "Dance", "What it is"],
        rows: [
          { cells: ["Alarippu", "Bharatanatyam", "The opening item of a recital"], pyqExampleId: "c5b38db8-d8a0-40b2-8af7-5c3eafd50526" },
          { cells: ["Vazhuvoor", "Bharatanatyam", "A style named after a Tamil Nadu village"], pyqExampleId: "f4600e5c-fbfa-49d6-a8a8-3febda711fe2" },
          { cells: ["Kalakshetra", "Bharatanatyam", "Rukmini Devi Arundale's style"], pyqExampleId: "d84e4067-3a9f-4af8-99b7-159f60da914e" },
          { cells: ["Nalacharitam", "Kathakali", "A famous play (attakatha)"], pyqExampleId: "059cc5db-6417-4ecf-b174-b3892f2a04c4" },
          { cells: ["Kalasam", "Kathakali", "Pure-dance passage between song lines"], pyqExampleId: "66a89ab1-3c2e-4080-a719-43be2c823b4d" },
          { cells: ["Borgeet", "Sattriya", "Devotional songs of Sankardeva"], pyqExampleId: "4948cfed-68c4-449d-8b7e-c5b0a0d33dde" },
          { cells: ["Mati Akhora", "Sattriya", "Basic ground exercises"], pyqExampleId: "927dd150-1631-443b-9ba7-f7ce0f06f7dd" },
          { cells: ["Lai Haraoba", "Manipuri", "Its earliest form"], pyqExampleId: "616e1f51-076d-4b76-957e-48639cc5420b" },
          { cells: ["Lasya", "Mohiniyattam", "The soft, graceful style"] },
          { cells: ["Chowk and tribhanga", "Odissi", "Its two basic postures"] },
        ],
      },
      pyqExampleId: "ba739a6d-bae9-4e8b-b4f7-1f8786b5db31",
      selfCheckExample: {
        prompt: "In which classical dance is Kalasam a pure-dance passage?",
        steps: [
          "Kalasam belongs to Kathakali, the dance-drama of Kerala.",
          "It is danced between lines of the song to round off a passage.",
        ],
        answer: "Kathakali",
      },
      practiceSet: [
        { prompt: "Which classical dance has Mati Akhora as its basic exercises?", answer: "Sattriya" },
        { prompt: "Lai Haraoba is the earliest form of which classical dance?", answer: "Manipuri" },
        { prompt: "What is the opening item of a Bharatanatyam recital called?", answer: "Alarippu" },
        { prompt: "Which Odissi posture bends the body in three places?", answer: "Tribhanga" },
        { prompt: "Nalacharitam is a play of which dance?", answer: "Kathakali" },
      ],
      traps: [
        {
          title: "Lasya is a style; tribhanga is a posture",
          body: "Mohiniyattam is danced in lasya, the soft style. Samapadam and tribhanga are body postures and chowk is an Odissi stance, so none of them answers \"which style is Mohiniyattam\".",
        },
        {
          title: "Kalakshetra is a style, not a separate dance",
          body: "Kalakshetra is Rukmini Devi Arundale's school and her style of Bharatanatyam. When an option says Kalakshetra, the dance is Bharatanatyam.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsaccl-gharanas",
      name: "The four Kathak gharanas",
      intuition:
        "Kathak has schools named after the cities or courts where they grew. SSC asks the three classic cities and who founded each school.",
      definition:
        "- **Lucknow gharana:** founded by **Ishwari Prasad** of Handia, near Prayagraj; it flowered at the court of **Wajid Ali Shah**. Birju Maharaj belonged to it.\n" +
        "- **Jaipur gharana:** traced to **Bhanuji**; known for strong, fast footwork.\n" +
        "- **Banaras gharana:** founded by **Janaki Prasad**.\n" +
        "- **Raigarh gharana:** grew at the court of **Raja Chakradhar Singh** of Raigarh, now in **Chhattisgarh**.\n\n" +
        "Jaipur, Lucknow and Banaras are the three classic gharanas, named after their cities. Raigarh is the younger fourth.",
      table: {
        columns: ["Gharana", "Founder or patron", "Place today"],
        rows: [
          { cells: ["Lucknow", "Ishwari Prasad", "Uttar Pradesh"], pyqExampleId: "d4d4b284-54c6-4553-add1-f1e1e0a1d2ce" },
          { cells: ["Jaipur", "Bhanuji", "Rajasthan"], pyqExampleId: "da898cd2-1438-423f-b84b-47e578f3a128" },
          { cells: ["Banaras", "Janaki Prasad", "Uttar Pradesh"], pyqExampleId: "e0d1dde7-1f1c-4a6f-a8ea-8f588f9d613b" },
          { cells: ["Raigarh", "Raja Chakradhar Singh", "Chhattisgarh"], pyqExampleId: "c07d25f0-77f8-4d66-86f4-fc5eff975680" },
        ],
      },
      pyqExampleId: "5e5aa8a3-e0c7-4dc6-981c-ee1881029db8",
      selfCheckExample: {
        prompt: "At whose court did the Raigarh gharana of Kathak grow?",
        steps: ["Raigarh was a princely state, now in Chhattisgarh.", "Its ruler Raja Chakradhar Singh was the patron of the gharana."],
        answer: "Raja Chakradhar Singh",
      },
      practiceSet: [
        { prompt: "Which Kathak gharana was founded by Janaki Prasad?", answer: "The Banaras gharana" },
        { prompt: "Which Kathak gharana belongs to present-day Chhattisgarh?", answer: "The Raigarh gharana" },
        { prompt: "Which gharana of Kathak did Birju Maharaj belong to?", answer: "The Lucknow gharana" },
        { prompt: "To whom is the Jaipur gharana of Kathak traced?", answer: "Bhanuji" },
      ],
      traps: [
        {
          title: "Ishwari Prasad is Lucknow, not Banaras",
          body: "Ishwari Prasad founded the Lucknow gharana; Janaki Prasad founded the Banaras gharana. The two names sound alike, so match the first name to the city.",
        },
        {
          title: "The three cities are Jaipur, Lucknow and Banaras",
          body: "An option naming Ayodhya, Prayagraj or Surat as a Kathak gharana city is wrong. The three classic gharanas are Jaipur, Lucknow and Banaras.",
        },
      ],
    },
  ],
};
