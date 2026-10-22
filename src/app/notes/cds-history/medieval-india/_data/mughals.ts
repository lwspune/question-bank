import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_ME_MUGHALS_NOTE: SubtopicNote = {
  subtopicName: "The Mughals and the Marathas",
  title: "The Mughals and the Marathas",
  oneLineDefinition:
    "Mughal kingship and the mansab system, the books and paintings of the Mughal court, Shivaji's rise and rule, and the later Mughals and Awadh in the 18th century.",
  whyItMatters:
    "Sixteen CDS questions, fourteen of them HARD: the hardest page of the chapter. They ask who wrote, painted or translated a named work, and the options are other real names from the same court, so learn each work with its author.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshime-emperors",
      name: "Emperors, kingship and the mansab",
      intuition:
        "The Mughals ruled through an idea and a system. The idea: the king receives a divine light from God. The system: every officer held a numbered rank, the mansab, that fixed his pay and the soldiers he kept.",
      definition:
        "- **Babur** (1526 to 1530) followed the **Naqshbandi** shaikh **Khwaja Ubaydullah Ahrar**, and put one of Ahrar's works into Turkish verse.\n" +
        "- **Abul Fazl** described **Akbar's** kingship as resting on **farr-i izadi**, a light passed from God to the king. The idea was first developed by the Iranian Sufi **Shihabuddin Suhrawardi** (died 1191).\n" +
        "- Akbar's policy was **sulh-i kul**, peace with all. By a **farman of 1598** he allowed the Jesuits to build a **church at Cambay** (Khambhat).\n" +
        "- **Mansab** ranks: **zat** fixed a mansabdar's **position and salary**; **sawar** fixed the **number of horsemen** he had to keep. In the 17th century, holders of a **zat of 1,000 or more** were the nobles (**umara**).\n" +
        "- **Muqarrab Khan**, a physician and noble, was a favourite of **Jahangir** (1605 to 1627).",
      table: {
        columns: ["Emperor", "Reign", "Fact asked"],
        rows: [
          {
            cells: ["Babur", "1526 to 1530", "Follower of the Naqshbandi Khwaja Ubaydullah Ahrar"],
            pyqExampleId: "6e99b270-afff-48de-ae74-4490d16bceb3",
          },
          {
            cells: ["Akbar", "1556 to 1605", "Kingship as farr-i izadi, an idea from Shihabuddin Suhrawardi"],
            noteAmber: "CDS 2018 (I): Suhrawardi, not Ibn al-Arabi or Nizamuddin Auliya.",
            pyqExampleId: "e5229287-0498-4898-a9d2-f04cda3bfd4d",
          },
          {
            cells: ["Akbar", "1598", "Farman allowing a church at Cambay"],
            pyqExampleId: "f1ce83fb-5ebf-46f1-a475-7a88041b44b9",
          },
          {
            cells: ["Akbar onward", "16th and 17th centuries", "Zat fixes rank and pay; sawar fixes horsemen; umara at zat 1,000 or more"],
            noteAmber: "CDS 2020 (I): the nobility line rests on zat, not sawar.",
            pyqExampleId: "9dec6967-a09c-494e-89ce-af44f5edac39",
          },
          {
            cells: ["Jahangir", "1605 to 1627", "Muqarrab Khan was his favourite"],
            pyqExampleId: "2ed40ea3-223f-45d7-80d7-9835ec49ac6f",
          },
        ],
      },
      pyqExampleId: "e5229287-0498-4898-a9d2-f04cda3bfd4d",
      selfCheckExample: {
        prompt: "A 17th century mansabdar holds a zat of 1,500 and a sawar of 800. Is he one of the umara?",
        steps: [
          "Nobility was decided by the zat rank, not the sawar rank.",
          "His zat of 1,500 is above the line of 1,000.",
        ],
        answer: "Yes, because his zat rank is 1,000 or more",
      },
      practiceSet: [
        { prompt: "Which Naqshbandi saint did Babur follow?", answer: "Khwaja Ubaydullah Ahrar" },
        { prompt: "What did a mansabdar's sawar rank show?", answer: "The number of horsemen he had to maintain" },
        { prompt: "What did Akbar's farman of 1598 allow at Cambay?", answer: "The building of a church" },
        { prompt: "Muqarrab Khan was a favourite of which Mughal emperor?", answer: "Jahangir" },
      ],
      traps: [
        {
          title: "Nobles by zat, not sawar",
          body: "A statement that mansabdars with 1,000 or more **sawar** were the umara is false. The line was a **zat** of 1,000 or more.",
        },
        {
          title: "Suhrawardi's light, not Ibn al-Arabi's",
          body: "Farr-i izadi was first developed by **Shihabuddin Suhrawardi**. Ibn al-Arabi is known for a different idea, the unity of being, and is the usual distractor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-mughal-books",
      name: "Books and painting at the Mughal court",
      intuition:
        "The Mughal court was a workshop of books. Historians wrote the reign, translators turned Sanskrit works into Persian, and painters, first brought from Persia by Humayun, illustrated it all.",
      definition:
        "- **Humayun** brought Persian painters to his court, among them **Mir Sayyid Ali**, **Abd al-Samad** and **Dost Musawwir**. **Bihzad**, the great master of Herat, never worked for him.\n" +
        "- Histories of **Akbar's** reign: **Tarikh-i-Akbari** by **Arif Qandahari**, **Tabaqat-i-Akbari** by **Nizamuddin Ahmad**, **Muntakhab-ut-Tawarikh** by **Badauni**, the **Akbarnama** and **Ain-i Akbari** by **Abul Fazl**.\n" +
        "- **Faizi**, Abul Fazl's brother and Akbar's poet laureate, translated **Bhaskaracharya's Lilavati** into Persian.\n" +
        "- The **Ain-i Akbari** lists the Indian sciences a Sanskrit student should learn: **Vyakarana** (grammar), **Nyaya**, **Vedanta** and **Patanjala**.\n" +
        "- Under **Jahangir**, **Abul Hasan** (titled Nadir-uz-Zaman) painted the famous picture of **Jahangir embracing Shah Abbas** of Persia.",
      table: {
        columns: ["Work", "By", "Reign"],
        rows: [
          {
            cells: ["Paintings of Humayun's atelier", "Mir Sayyid Ali, Abd al-Samad, Dost Musawwir (not Bihzad)", "Humayun"],
            noteAmber: "CDS 2021 (I): Bihzad was the painter NOT associated with Humayun.",
            pyqExampleId: "07416b75-9419-4103-b13f-aa4fc72f605a",
          },
          {
            cells: ["Tarikh-i-Akbari", "Arif Qandahari", "Akbar"],
            pyqExampleId: "4c2dc382-b413-4156-8252-e574026779bd",
          },
          {
            cells: ["Lilavati in Persian", "Faizi", "Akbar"],
            noteAmber: "CDS 2021 (I): Faizi, not his brother Abul Fazl.",
            pyqExampleId: "7a7420b4-1bd4-4cb8-8646-2087fdbbfbb0",
          },
          {
            cells: ["Ain-i Akbari's Indian sciences", "Abul Fazl lists Vyakarana, Nyaya, Vedanta, Patanjala", "Akbar"],
            noteAmber: "CDS 2025 (I): Vyakarana is on the list; Ayurveda, Ganita and Jyotisha are not.",
            pyqExampleId: "ff293a95-e3d6-4ea2-a6d4-44afac2b3962",
          },
          {
            cells: ["Jahangir embracing Shah Abbas", "Abul Hasan", "Jahangir"],
            pyqExampleId: "b1e7d4ed-ebfd-43ef-9df6-c97ef99f6eef",
          },
        ],
      },
      pyqExampleId: "7a7420b4-1bd4-4cb8-8646-2087fdbbfbb0",
      selfCheckExample: {
        prompt: "Two histories of Akbar's reign have similar names: the Tarikh-i-Akbari and the Tabaqat-i-Akbari. Who wrote each?",
        steps: ["Tarikh-i-Akbari: Arif Qandahari, one of the early accounts of the reign.", "Tabaqat-i-Akbari: Nizamuddin Ahmad."],
        answer: "Tarikh-i-Akbari by Arif Qandahari; Tabaqat-i-Akbari by Nizamuddin Ahmad",
      },
      practiceSet: [
        { prompt: "Who painted Jahangir embracing Shah Abbas of Persia?", answer: "Abul Hasan" },
        { prompt: "Name one painter Humayun brought from Persia.", answer: "Mir Sayyid Ali or Abd al-Samad" },
        { prompt: "Who wrote the Muntakhab-ut-Tawarikh?", answer: "Badauni" },
        { prompt: "Which four Indian sciences does the Ain-i Akbari list for Sanskrit students?", answer: "Vyakarana, Nyaya, Vedanta and Patanjala" },
      ],
      traps: [
        {
          title: "Bihzad never painted for Humayun",
          body: "**Bihzad** was the famous master of Herat, a generation earlier. Humayun's painters were **Mir Sayyid Ali**, **Abd al-Samad** and **Dost Musawwir**.",
        },
        {
          title: "Faizi translated, Abul Fazl chronicled",
          body: "The two brothers sit side by side in the options. **Faizi**, the poet, translated the Lilavati; **Abul Fazl** wrote the Akbarnama and the Ain-i Akbari.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshime-marathas",
      name: "Shivaji, the Marathas and the later Mughals",
      intuition:
        "In the 17th century Shivaji built a Maratha kingdom fort by fort, against Bijapur and the Mughals. After Aurangzeb died in 1707, Mughal emperors became puppets of powerful nobles, and governors such as those of Awadh became rulers in their own right.",
      definition:
        "- **Shivaji's rise in order**: captured **Torna** (about 1646), annexed **Javli** (1656), killed **Afzal Khan** (1659), raided **Shaista Khan** at Poona (1663), crowned at Raigad (**1674**).\n" +
        "- At the coronation the council of eight ministers, the **Ashta Pradhan**, was completed with set duties. Shivaji used **Marathi in place of Persian** and had **Sanskrit terms** coined for government.\n" +
        "- He sent an envoy to the **English at Bombay**, seeking help against the **Siddis of Danda-Rajpuri** (Janjira) and a supply of grenades, mortars and ammunition.\n" +
        "- In Maratha villages, **mirasdars** held hereditary rights in land, while **uparis** were **tenants** who farmed without those rights.\n" +
        "- The **Sayyid brothers** were 'kingmakers': they overthrew **Jahandar Shah** (who had been raised by **Zulfiqar Khan**), put **Farrukhsiyar** on the throne in 1713, followed a tolerant policy (they abolished the jizya) and made an agreement with **Shahu** in 1719.\n" +
        "- **Awadh**: **Saadat Khan** founded the line as Nawab; his successor **Safdarjung** became wazir of the empire in 1748, the first **Nawab Wazir**.",
      table: {
        columns: ["Year", "Event"],
        rows: [
          { cells: ["About 1646", "Shivaji captures Torna"] },
          { cells: ["1656", "Annexation of Javli"] },
          { cells: ["1659", "Afzal Khan killed at Pratapgarh"] },
          {
            cells: ["1663", "Night raid on Shaista Khan at Poona"],
            noteAmber: "CDS 2023 (II): the order is Torna, Javli, Afzal Khan, Shaista Khan.",
            pyqExampleId: "47bd8af4-8bf5-4385-a5dd-47caa4d9dc42",
          },
          {
            cells: ["1674", "Coronation; Ashta Pradhan completed; Marathi in place of Persian"],
            pyqExampleId: "1a0a37f6-70c4-41be-a1fe-39bbb4121dca",
          },
          {
            cells: ["1713", "Sayyid brothers overthrow Jahandar Shah and enthrone Farrukhsiyar"],
            noteAmber: "CDS 2017 (II): the Sayyids did NOT bring Jahandar Shah to power.",
            pyqExampleId: "beebe91f-ce51-4b11-9b88-214eabd8f306",
          },
          { cells: ["1719", "Sayyid brothers' agreement with Shahu"] },
          {
            cells: ["1748", "Safdarjung becomes wazir: the first Nawab Wazir of Awadh"],
            pyqExampleId: "92670e38-b941-486a-a05d-9ac3ee37be4c",
          },
        ],
      },
      pyqExampleId: "47bd8af4-8bf5-4385-a5dd-47caa4d9dc42",
      selfCheckExample: {
        prompt: "Why did Shivaji send an envoy to the English at Bombay?",
        steps: [
          "The Siddis of Danda-Rajpuri held the sea approaches he needed.",
          "He wanted English help against them, and grenades, mortars and ammunition his own workshops could not make.",
        ],
        answer: "To get English help against the Siddis and to buy grenades, mortars and ammunition",
      },
      practiceSet: [
        { prompt: "Who brought Jahandar Shah to the Mughal throne?", answer: "Zulfiqar Khan" },
        { prompt: "Who was the first Nawab Wazir of Awadh?", answer: "Safdarjung" },
        { prompt: "In the Maratha villages, what was an upari?", answer: "A tenant who farmed land without hereditary rights" },
        { prompt: "In which year was Shivaji crowned?", answer: "1674" },
      ],
      traps: [
        {
          title: "Nawab first, Nawab Wazir second",
          body: "**Saadat Khan** founded Awadh's line as Nawab. The title **Nawab Wazir** began with **Safdarjung**, who became wazir of the empire. Read which title the stem asks for.",
        },
        {
          title: "Mirasdar owns, upari rents",
          body: "A **mirasdar** held a hereditary right in his land; an **upari** was a tenant without it. Neither word means a soldier or a village headman.",
        },
      ],
    },
  ],
};
