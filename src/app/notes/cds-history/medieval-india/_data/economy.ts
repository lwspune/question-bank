import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_ECONOMY_NOTE: SubtopicNote = {
  subtopicName: "Peasants, Trade and Travellers",
  title: "Peasants, Trade and Travellers",
  oneLineDefinition:
    "Mughal peasants, zamindars and village servants, the crafts and mines of medieval India, and the travellers from Al-Biruni to Bernier whose accounts describe it all.",
  whyItMatters:
    "Eighteen CDS questions, the most of any page. Eight are on travellers: who wrote which book, who served whom, who said a famous line. The peasant questions come almost word for word from the NCERT chapter on peasants and zamindars.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-peasants",
      name: "Peasants, zamindars and village servants",
      intuition:
        "Most people in Mughal India were peasants. Persian records had several words for them, and different words for those who farmed their own village and those who farmed someone else's. " +
        "Above the peasant stood the zamindar, and above him the state.",
      definition:
        "- Indo-Persian sources call the peasant **raiyat** (or riaya), **muzarian**, **kisan** or **asami**. A **majur** was a hired labourer, not a peasant.\n" +
        "- **Khud-kashta** peasants lived in the village where they farmed. **Pahi-kashta** peasants were **non-resident** cultivators who farmed another village's land **on contract**, either because its **revenue terms were better** or because **economic distress** drove them there.\n" +
        "- **Zamindars** were an **exploitative** class, yet in many **17th century** agrarian uprisings in north India **peasants backed them** against the state.\n" +
        "- **Panchayat documents** from **Rajasthan, Gujarat and Maharashtra** record petitions by **women** against a husband's infidelity or his neglect of wife and children.\n" +
        "- The historian **Irfan Habib** argued that the Mughal state was not just the protector of the exploiting classes but **itself the main instrument of exploitation**.\n" +
        "- **Balutedars** were the **village servants and artisans** of the medieval **Deccan and Maharashtra** (carpenter, blacksmith, potter, barber). They served the village as a whole and were paid a share of its harvest.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Raiyat, muzarian, asami, kisan", "Words for a peasant in Mughal Persian sources (majur was a labourer)"],
            noteAmber: "CDS 2022 (I): raiyat, asami and muzarian; not majur.",
            pyqExampleId: "6c62038b-d3ca-4be0-9102-c170bf72189d",
          },
          { cells: ["Khud-kashta", "Resident peasant farming his own village"] },
          {
            cells: ["Pahi-kashta", "Non-resident peasant farming on contract, for better terms or from distress"],
            noteAmber: "CDS 2016 (II): both statements true, and the second explains the first.",
            pyqExampleId: "1b44e610-b9bf-4301-bab1-f28d3073de5c",
          },
          {
            cells: ["Zamindar", "Exploitative, yet often backed by peasants in 17th century revolts"],
            pyqExampleId: "e9fff99d-dbf1-4300-b584-2f804a15e48a",
          },
          {
            cells: ["Panchayat records", "Women's petitions against infidelity and neglect (Rajasthan, Gujarat, Maharashtra)"],
            pyqExampleId: "ff845f80-d682-411f-9137-a0fdf35ef110",
          },
          {
            cells: ["Balutedar", "Village servant or artisan of the Deccan, serving the whole village"],
            pyqExampleId: "25023569-1164-4958-abc7-455ceb0616c6",
          },
        ],
      },
      pyqExampleId: "6c62038b-d3ca-4be0-9102-c170bf72189d",
      selfCheckExample: {
        prompt: "A cultivator lives in village A but farms land in village B on a contract, because village B asks for less revenue. What kind of peasant is he?",
        steps: ["He does not live where he farms, so he is not khud-kashta.", "A non-resident cultivator on contract is pahi-kashta."],
        answer: "A pahi-kashta peasant",
      },
      practiceSet: [
        { prompt: "What were khud-kashta peasants?", answer: "Peasants who lived in the village where they farmed" },
        { prompt: "Which records show women petitioning against a husband's infidelity?", answer: "Panchayat documents of Rajasthan, Gujarat and Maharashtra" },
        { prompt: "Which historian called the Mughal state itself the main instrument of exploitation?", answer: "Irfan Habib" },
        { prompt: "Who were the balutedars?", answer: "Village servants and artisans of the medieval Deccan and Maharashtra" },
      ],
      traps: [
        {
          title: "Balutedars served the village, not one family",
          body: "Balutedars were paid by the **village as a whole** from its harvest. A statement that they were employed by an individual peasant family is false.",
        },
        {
          title: "Exploiter and ally at once",
          body: "Zamindars exploited peasants **and** were backed by them in revolts against the state. Both are true, but the second does not explain the first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-crafts",
      name: "Crafts, mines and coins",
      intuition:
        "Medieval India made dye, cut gems and cast metal for the world. CDS picks one craft at a time and asks what changed it or where it was done.",
      definition:
        "- **Indigo**: the dye is made by steeping and beating the plant in vats. Lining the vats with **lime and gypsum mortar** made them **waterproof**, and this greatly improved indigo making.\n" +
        "- **Diamonds** were mined at **Panna** in **Bundelkhand** in the Sultanate period. **Khambhat** (Cambay) was a port where gems were cut and traded, not mined. Later, **Golconda** became the great diamond market of the Deccan.\n" +
        "- The **Ahoms** of the Brahmaputra valley were skilled metal-casters who made fine **matchlocks**, cannon and gunpowder.\n" +
        "- **Kopeki** (the Russian kopek) is the name of a **coin**.",
      table: {
        columns: ["Craft or item", "Fact asked"],
        rows: [
          {
            cells: ["Diamonds", "Mined at Panna, Bundelkhand, in the Sultanate period"],
            pyqExampleId: "b25fc543-b7fb-4b2f-9f95-552c79d710b0",
          },
          {
            cells: ["Indigo", "Vats lined with lime and gypsum mortar made waterproof"],
            noteAmber: "CDS 2025 (I): the improvement came from waterproofing the vats.",
            pyqExampleId: "e305eba3-076c-4b25-ad4b-c9ecbf1e1213",
          },
          {
            cells: ["Matchlocks", "Cast by the Ahoms, famous metal-workers"],
            pyqExampleId: "6bd48afa-e028-4645-8116-a1cf32fd94df",
          },
          {
            cells: ["Kopeki", "A coin"],
            pyqExampleId: "54104366-1715-4803-8e2c-914be502b343",
          },
        ],
      },
      pyqExampleId: "e305eba3-076c-4b25-ad4b-c9ecbf1e1213",
      selfCheckExample: {
        prompt: "Which people of the Brahmaputra valley were famous for casting excellent matchlocks?",
        steps: ["The Brahmaputra valley is in Assam.", "The Ahoms ruled there and were skilled metal-casters."],
        answer: "The Ahoms",
      },
      practiceSet: [
        { prompt: "Where were diamonds mined in the Sultanate period?", answer: "Panna, in Bundelkhand" },
        { prompt: "What is the word kopeki associated with?", answer: "Coins" },
        { prompt: "Which Deccan place later became the great diamond market?", answer: "Golconda" },
        { prompt: "Was Khambhat known for mining gems or for cutting and trading them?", answer: "For cutting and trading them; it was a port" },
      ],
      traps: [
        {
          title: "Khambhat traded gems, Panna mined them",
          body: "**Khambhat** was a port where gems were cut and sold. Diamonds were **mined** at **Panna**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-travellers",
      name: "Travellers' accounts",
      intuition:
        "Much of what we know about medieval India comes from outsiders who wrote down what they saw. Each one came at a different time, served a different master and wrote one famous book or line. " +
        "Put them in order and attach each to his fact.",
      definition:
        "- **Al-Biruni** (973 to 1048), from Khwarizm, came with **Mahmud of Ghazni** and wrote the **Kitab-ul-Hind** in **Arabic**.\n" +
        "- **Ibn Battuta** of **Morocco** (14th century) wrote his travels, the **Rihla**, in **Arabic**. **Muhammad bin Tughluq** made him qazi of Delhi and sent him as **envoy to China**.\n" +
        "- **Francisco Pelsaert**, a Dutch merchant at Agra (about 1626), wrote: 'So much is wrung from the peasants that even dry bread is scarcely left to fill their stomachs.'\n" +
        "- **Francois Bernier** (French, in India 1656 to 1668) was physician to **Prince Dara Shikoh**, Shah Jahan's eldest son, and later served the noble Danishmand Khan.\n" +
        "- **Jean-Baptiste Tavernier**, a French jeweller, made six voyages to India and went home to France.\n" +
        "- **Niccolao Manucci** (Venice) came in 1653, served in Mughal armies and as a physician, and **never returned to Europe**; he died in India.\n" +
        "- **Abbe J. A. Dubois**, a French missionary in south India around 1800, wrote that a Hindu woman could go anywhere alone without fear of idle loungers.",
      table: {
        columns: ["Traveller", "From and when", "Fact asked"],
        rows: [
          {
            cells: ["Al-Biruni", "Khwarizm, 11th century", "Kitab-ul-Hind, written in Arabic"],
            noteAmber: "CDS 2020 (II): Arabic, not Persian.",
            pyqExampleId: "d8b67707-df87-4351-bd18-a2ab744ec67d",
          },
          {
            cells: ["Ibn Battuta", "Morocco, 14th century", "Rihla in Arabic; Muhammad bin Tughluq's envoy to China"],
            noteAmber: "Asked twice: CDS 2020 (II) for the envoy and 2026 (I) for the Rihla.",
            pyqExampleId: "1e317a30-c16a-4bb1-ba33-59dddbd4b1f1",
          },
          {
            cells: ["Francisco Pelsaert", "Holland, about 1626", "So much is wrung from the peasants..."],
            pyqExampleId: "4ae79734-2022-40da-ab30-7f6e4d31f7e8",
          },
          {
            cells: ["Francois Bernier", "France, 1656 to 1668", "Physician to Prince Dara Shikoh"],
            pyqExampleId: "54d5b9de-6616-4718-82b0-4f5693917f2d",
          },
          {
            cells: ["Niccolao Manucci", "Venice, from 1653", "Never returned to Europe; died in India"],
            noteAmber: "CDS 2018 (II): Manucci, not Bernier or Tavernier.",
            pyqExampleId: "0a7df9ff-4f13-44db-bb9d-17657958b2e6",
          },
          {
            cells: ["Jean-Baptiste Tavernier", "France, 17th century", "Jeweller; six voyages to India"],
            pyqExampleId: "d998165e-8f91-4b63-916d-68f5cce12009",
          },
          {
            cells: ["Abbe J. A. Dubois", "France, around 1800", "A Hindu woman could go anywhere alone"],
            pyqExampleId: "97025628-e570-4804-aaae-f115bdb3341c",
          },
        ],
      },
      pyqExampleId: "54d5b9de-6616-4718-82b0-4f5693917f2d",
      selfCheckExample: {
        prompt: "Which European wrote that so much was taken from Mughal peasants that even dry bread was scarcely left to them?",
        steps: ["The line describes the burden of revenue on peasants around Agra.", "It comes from the report of the Dutch merchant there, about 1626."],
        answer: "Francisco Pelsaert",
      },
      practiceSet: [
        { prompt: "In which language did Al-Biruni write the Kitab-ul-Hind?", answer: "Arabic" },
        { prompt: "Which Delhi Sultan sent Ibn Battuta as his envoy to China?", answer: "Muhammad bin Tughluq" },
        { prompt: "Which European traveller never returned to Europe and died in India?", answer: "Niccolao Manucci" },
        { prompt: "What is Ibn Battuta's book of travels called?", answer: "The Rihla" },
      ],
      traps: [
        {
          title: "Dara Shikoh, not Shah Jahan",
          body: "Bernier was physician to **Prince Dara Shikoh**, the emperor's eldest son. The emperor himself, Princess Jahanara and Prince Murad are the wrong options.",
        },
        {
          title: "Both books are in Arabic",
          body: "Al-Biruni's **Kitab-ul-Hind** and Ibn Battuta's **Rihla** were both written in **Arabic**, the language of learning in their world. Persian is the tempting wrong answer.",
        },
      ],
    },
  ],
};
