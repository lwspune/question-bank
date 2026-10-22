import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_GUPTAS_NOTE: SubtopicNote = {
  subtopicName: "Post-Mauryan Kingdoms and the Guptas",
  title: "Post-Mauryan Kingdoms and the Guptas",
  oneLineDefinition:
    "The Shungas, Satavahanas and Kushanas, the great inscriptions of Kharavela, Rudradaman and Samudragupta, the Gupta state and its coins, and Harsha's world.",
  whyItMatters:
    "Twelve questions, eight of them HARD. Many are built on inscriptions: what a king's record says, in what language, and where it stands. The Sudarshana lake alone appears in two questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-post-mauryan",
      name: "Shungas, Satavahanas and Kushanas",
      intuition:
        "After the Mauryas, new dynasties held different parts of India: the Shungas in the Ganga valley, the Satavahanas in the Deccan, " +
        "and the Kushanas, from Central Asia, in the north-west. Each tried to show its kings as special in its own way.",
      definition:
        "- **Pushyamitra Shunga** overthrew the last Maurya king. In Shunga times the grammarian **Patanjali** says the **Yavanas** (Indo-Greeks) reached **Saketa** and **Madhyamika**. Madhyamika is **Nagari, near Chittor** in Rajasthan.\n" +
        "- Satavahana kings are known by their **mothers' names**, such as **Gautamiputra Satakarni** and **Vasishthiputra Pulumavi**, though the throne still passed **from father to son**.\n" +
        "- Kushana kings such as **Kanishka** projected a **godlike** image through their **coins** and huge **statues**, at **Mat near Mathura** and at **Surkh Kotal** in Afghanistan. They used titles such as **devaputra**, son of god.",
      table: {
        columns: ["Dynasty", "Key fact"],
        rows: [
          {
            cells: ["Shungas", "Pushyamitra overthrew the last Maurya; Yavanas reached Saketa and Madhyamika"],
            noteAmber: "CDS 2026 (II): Madhyamika is near Chittor.",
            pyqExampleId: "75c6ef28-d16b-4f31-89b1-13e2f93ba7db",
          },
          { cells: ["Satavahanas", "Kings named after their mothers; the throne passed from father to son"] },
          {
            cells: ["Kushanas", "Coins and colossal statues show kings as godlike; title devaputra"],
            pyqExampleId: "3cc4750f-9d60-463a-9f5b-4e105186df27",
          },
        ],
      },
      pyqExampleId: "3ac1d519-4536-4ed6-bca7-8b97187a1128",
      selfCheckExample: {
        prompt: "Through what two kinds of evidence do historians read the Kushana idea of kingship?",
        steps: [
          "Their coins show the king beside gods.",
          "Huge royal statues stood in shrines at Mat near Mathura and at Surkh Kotal.",
        ],
        answer: "Their coins and their sculpture.",
      },
      practiceSet: [
        { prompt: "Who founded the Shunga dynasty?", answer: "Pushyamitra Shunga" },
        { prompt: "Near which modern town was ancient Madhyamika?", answer: "Chittor, in Rajasthan" },
        { prompt: "What title meaning son of god did Kushana kings use?", answer: "Devaputra" },
        { prompt: "Where was the headless standing statue of Kanishka found?", answer: "At Mat, near Mathura" },
      ],
      traps: [
        {
          title: "A mother's name does not mean a mother's line",
          body: "Satavahana kings took their mothers' names, as in Gautamiputra Satakarni, but succession still went from father to son.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-inscriptions",
      name: "Hathigumpha, Junagadh and Prayaga",
      intuition:
        "Three long inscriptions tell us most of what we know about three kings. " +
        "CDS asks what each records, in what language, and where it stands.",
      definition:
        "- The **Hathigumpha** inscription at **Udayagiri**, near Bhubaneswar in **Odisha**, is the record of **Kharavela** of **Kalinga**. In his **eleventh year** he broke up a confederacy of Tamil states that had lasted **113 years**.\n" +
        "- The **Junagadh** (Girnar) inscription of the **Shaka** ruler **Rudradaman** is in **Sanskrit**, in the **Brahmi** script, and is **dated** (year 72). It records the **repair of the Sudarshana lake**, a reservoir first built under the Mauryas.\n" +
        "- The **Prayaga Prashasti** at Allahabad, composed in Sanskrit by the court poet **Harishena**, praises **Samudragupta**. It is carved on an **Ashokan pillar**.\n" +
        "- Ashoka's edicts at **Sannati** are in **Karnataka**, not Odisha.",
      table: {
        columns: ["Inscription", "King", "Key fact"],
        rows: [
          {
            cells: ["Hathigumpha, Udayagiri (Odisha)", "Kharavela of Kalinga", "Broke a Tamil confederacy 113 years old"],
            pyqExampleId: "df2e1643-2b79-4b4b-8361-5c221a7af591",
          },
          { cells: ["Junagadh (Girnar), Gujarat", "Rudradaman, a Shaka ruler", "Sanskrit in Brahmi; repair of the Sudarshana lake"] },
          {
            cells: ["Prayaga Prashasti, Allahabad", "Samudragupta", "Composed by Harishena; carved on an Ashokan pillar"],
            pyqExampleId: "dd8a8369-51c0-4c27-98ea-c9e532035c8e",
          },
          {
            cells: ["Sannati", "Ashoka", "Edicts in Karnataka"],
            noteAmber: "CDS 2025 (II): three of the four pairs were right; Sannati in Odisha was the wrong one.",
            pyqExampleId: "33afb7fa-2dcf-428d-891b-f303de5c9402",
          },
        ],
      },
      pyqExampleId: "38464129-9f5d-4a44-8e9b-25a72bef7987",
      selfCheckExample: {
        prompt: "Who composed the Prayaga Prashasti, and which king does it praise?",
        steps: [
          "It is a prashasti, a poem of praise, carved on an older Ashokan pillar at Allahabad.",
          "Its author was the court poet of the Gupta king who campaigned north and south.",
        ],
        answer: "Harishena composed it in praise of Samudragupta.",
      },
      practiceSet: [
        { prompt: "Whose inscription is at Hathigumpha?", answer: "Kharavela of Kalinga" },
        { prompt: "In which state is the Hathigumpha inscription?", answer: "Odisha" },
        { prompt: "In which state is Sannati?", answer: "Karnataka" },
        { prompt: "In which language is the Prayaga Prashasti?", answer: "Sanskrit" },
      ],
      traps: [
        {
          title: "Junagadh is Sanskrit and dated",
          body: "Rudradaman's Junagadh inscription is in Sanskrit, in the Brahmi script, and carries a date. It is not Prakrit, not Kharoshthi and not undated.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-guptas",
      name: "Gupta kings, coins and society",
      intuition:
        "The Guptas called themselves kings of kings and close to the gods, and they struck more gold coins than any dynasty before them. " +
        "Sanskrit writing flourished, but land grants slowly spread power out, and women lost ground.",
      definition:
        "- Gupta kings took titles such as **Maharajadhiraja**, **Parama-bhattaraka** and **Parameshvara**, and linked themselves to the gods with epithets such as **Parama-bhagavata** and **Parama-daivata**.\n" +
        "- Most Gupta coins were **gold**, called **dinara**. **Silver** coins began with **Chandragupta II** after he conquered the Western Kshatrapas, who used silver; later kings such as Kumaragupta I, Skandagupta and Budhagupta also struck them. Copper coins were few.\n" +
        "- Coins show the **king** on the front and a **deity** on the back.\n" +
        "- **Sanskrit** literature reached its classical height; **Kalidasa** wrote in this age.\n" +
        "- **Land grants** of villages to priests and temples, with tax and administrative rights, spread power out and led towards feudal ties.\n" +
        "- The **status of women fell**: early marriage, no formal education, property mostly limited to stridhana.",
      table: {
        columns: ["Topic", "Fact"],
        rows: [
          {
            cells: ["Gold coins", "Dinara; the most numerous Gupta coins"],
            noteAmber: "CDS 2020 (II): 'most Gupta coins were copper' was the wrong statement.",
            pyqExampleId: "590c137f-f19a-4190-9fa6-5156b8f30e73",
          },
          { cells: ["Silver coins", "From Chandragupta II, after he conquered the Western Kshatrapas"] },
          { cells: ["Coin design", "The king on the front, a deity on the back"] },
          { cells: ["Land grants", "Villages given with tax and administrative rights; power spread out"] },
          {
            cells: ["Women", "Status fell: early marriage, no formal education"],
            pyqExampleId: "18259181-4cb3-4155-ba40-59a445bd0664",
          },
        ],
      },
      pyqExampleId: "47d39b9d-1c79-436c-964a-2d38fb0d45bb",
      selfCheckExample: {
        prompt: "Why did the Guptas begin to strike silver coins, and under which king?",
        steps: [
          "The Western Kshatrapas of western India used silver coins.",
          "When Chandragupta II conquered them, he issued silver coins for that region.",
        ],
        answer: "Chandragupta II, after conquering the silver-using Western Kshatrapas.",
      },
      practiceSet: [
        { prompt: "What were Gupta gold coins called?", answer: "Dinara" },
        { prompt: "Did the status of women rise or fall in the Gupta period?", answer: "It fell" },
        { prompt: "What did grants of land with tax rights do to Gupta administration?", answer: "They spread power out (decentralised it)" },
        { prompt: "Which great Sanskrit poet wrote in the Gupta age?", answer: "Kalidasa" },
      ],
      traps: [
        {
          title: "Gupta women lost ground",
          body: "Women's status declined in the Gupta age. A statement that they got formal education and property rights by law is the false one.",
        },
        {
          title: "Gold, not copper",
          body: "The Guptas struck mostly gold coins. Copper coins were comparatively few.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-harsha",
      name: "Harsha and after",
      intuition:
        "Harshavardhana ruled north India from Kanyakubja (Kanauj) in the seventh century. " +
        "We know him through his court poet's biography and a Chinese pilgrim's diary, and his throne was seized when he died.",
      definition:
        "- **Harshavardhana** ruled from **Kanyakubja** (Kanauj). His court poet **Banabhatta** wrote the **Harshacharita**, and the Chinese pilgrim **Xuanzang** visited him.\n" +
        "- His ally **Bhaskaravarman**, king of **Kamarupa** (Assam) of the **Varman** dynasty, sent him gifts. His enemy was **Shashanka** of Gauda (Bengal).\n" +
        "- The Chalukya king **Pulakeshin II** stopped him at the **Narmada**.\n" +
        "- After Harsha died without an heir, his minister **Arunashva** seized Kanyakubja. The Chinese envoy Wang Xuance returned with Tibetan and Nepali troops and captured him.",
      table: {
        columns: ["Person", "Link to Harsha"],
        rows: [
          { cells: ["Banabhatta", "Court poet; wrote the Harshacharita"] },
          { cells: ["Xuanzang", "Chinese pilgrim who visited his court"] },
          { cells: ["Bhaskaravarman", "Varman king of Kamarupa (Assam); an ally who sent gifts"] },
          { cells: ["Shashanka", "King of Gauda (Bengal); an enemy"] },
          { cells: ["Pulakeshin II", "Chalukya king who stopped him at the Narmada"] },
          {
            cells: ["Arunashva", "Minister who seized Kanyakubja after his death"],
            pyqExampleId: "7772a0c1-f19d-4235-8128-be25c99b147b",
          },
        ],
      },
      pyqExampleId: "d2c45f94-51a8-4c16-9593-aa36f507dfdb",
      selfCheckExample: {
        prompt: "Who seized the throne of Kanyakubja after Harsha died, and who captured him?",
        steps: [
          "Harsha left no heir, so a minister took power.",
          "He attacked a Chinese embassy, whose envoy came back with Tibetan and Nepali soldiers.",
        ],
        answer: "The minister Arunashva seized it; the Chinese envoy Wang Xuance captured him.",
      },
      practiceSet: [
        { prompt: "Who wrote the Harshacharita?", answer: "Banabhatta" },
        { prompt: "Which Chalukya king defeated Harsha?", answer: "Pulakeshin II" },
        { prompt: "Which city was Harsha's capital?", answer: "Kanyakubja (Kanauj)" },
        { prompt: "Which Chinese pilgrim visited Harsha's court?", answer: "Xuanzang" },
      ],
      traps: [
        {
          title: "Shashanka fought Harsha; he did not succeed him",
          body: "Shashanka of Gauda was Harsha's enemy during his reign. The man who seized Kanyakubja after Harsha's death was his minister Arunashva.",
        },
      ],
    },
  ],
};
