import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_SOCIETY_NOTE: SubtopicNote = {
  subtopicName: "Society, Land and Trade",
  title: "Society, Land and Trade",
  oneLineDefinition:
    "Women and property in the Smriti law books, trade with Rome and the sites that prove it, and the old words for kinds of land, assemblies, dress and weapons.",
  whyItMatters:
    "Twelve questions, nine of them HARD. Arikamedu was the answer twice, in 2019 (II) and 2026 (I). The rest test exact meanings: of stridhana, of a land word, of a garment or a weapon.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-stridhana",
      name: "Women and property in the law books",
      intuition:
        "The Smriti law books let sons share the family estate and let women keep only certain gifts as their own. " +
        "That personal wealth, stridhana, was protected even from the husband.",
      definition:
        "- The **paternal estate** was divided **equally among the sons** after the parents died, with a special share for the eldest.\n" +
        "- A woman could keep the **gifts she received at her marriage**. This was her **stridhana**.\n" +
        "- Stridhana could be **inherited by her children**, and the **husband had no claim** on it.\n" +
        "- The **Manusmriti** gives men **seven** ways of getting wealth: inheritance, finding, purchase, conquest, investment, work and gifts from good people.\n" +
        "- It gives women only **six**: gifts at the nuptial fire, at the bridal procession, as a **token of affection**, and from her brother, mother and father.",
      table: {
        columns: ["Rule", "What the Smritis say"],
        rows: [
          { cells: ["Paternal estate", "Divided equally among sons; a special share for the eldest"] },
          { cells: ["Stridhana", "Gifts a woman received at marriage; hers to keep"] },
          { cells: ["Who inherits stridhana", "Her children; the husband has no claim"] },
          { cells: ["Men's ways to wealth", "Seven: inheritance, finding, purchase, conquest, investment, work, gifts from good people"] },
          {
            cells: ["Women's ways to wealth", "Six: gifts at the nuptial fire, at the bridal procession, as a token of affection, and from brother, mother and father"],
            noteAmber: "CDS 2018 (II): token of affection was the answer; purchase, investment and inheritance are on the men's list.",
            pyqExampleId: "2da209ac-7cdb-40eb-8be2-f6913394f18f",
          },
        ],
      },
      pyqExampleId: "de94d491-f45f-42aa-a0d1-85e52123a049",
      selfCheckExample: {
        prompt: "According to the Manusmriti, can a woman acquire wealth by purchase?",
        steps: [
          "Purchase is on the Manusmriti's list of seven ways for men.",
          "The women's list has only gifts: at marriage, from family, as a token of affection.",
        ],
        answer: "No; purchase is a way for men only.",
      },
      practiceSet: [
        { prompt: "Among whom was the paternal estate divided in the Smriti law books?", answer: "Equally among the sons" },
        { prompt: "How many ways of getting wealth does the Manusmriti give men?", answer: "Seven" },
        { prompt: "How many ways of getting wealth does the Manusmriti give women?", answer: "Six" },
      ],
      traps: [
        {
          title: "The husband had no say over stridhana",
          body: "Stridhana passed to a woman's children and the husband had no claim on it. A statement that the children needed his permission is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-trade",
      name: "Trade with Rome and links abroad",
      intuition:
        "In the first centuries CE Roman ships came to India for spices and luxuries and paid in gold. " +
        "Roman pots and coins dug up in south India prove the trade, and Greek visitors left their own impressions of India.",
      definition:
        "- India sent Rome **pepper**, **spikenard**, **tortoiseshell**, **pearls**, **ivory** and fine cloth.\n" +
        "- Rome paid largely in **gold coins**: the **aurei**, found in hoards in south India.\n" +
        "- **Arikamedu**, near Puducherry on the **Coromandel coast**, has Roman **amphorae** (wine jars) and **Arretine ware**: direct proof of the trade.\n" +
        "- Other ports: **Bharukachchha** (Broach) in Gujarat, **Tamralipti** in Bengal, and **Muchiri** on the **Malabar** coast.\n" +
        "- Greek visitors such as **Megasthenes** admired India's **fertile soil** and **able farmers**. Ancient Indians also knew the use of **manure**, but that is a separate fact, not the reason for the Greeks' praise.\n" +
        "- The **Roma** (Gypsies) are traced to India because their language, **Romani**, is an **Indo-Aryan** language.",
      table: {
        columns: ["Item or place", "Fact"],
        rows: [
          {
            cells: ["Arikamedu", "Near Puducherry, Coromandel coast; Roman amphorae and Arretine ware"],
            noteAmber: "CDS 2019 (II): asked as the site of maritime links on the Coromandel coast.",
            pyqExampleId: "b65cc51b-b853-4a14-970a-5188ac076031",
          },
          {
            cells: ["Aurei", "Roman gold coins, found in hoards in south India"],
            pyqExampleId: "103b6cce-493d-401b-811e-e3fef2e74ded",
          },
          { cells: ["Exports to Rome", "Pepper, spikenard, tortoiseshell, pearls, ivory, fine cloth"] },
          { cells: ["Bharukachchha", "A port in Gujarat (Broach)"] },
          { cells: ["Tamralipti", "A port in Bengal"] },
          {
            cells: ["Romani", "The Roma's language; an Indo-Aryan language"],
            pyqExampleId: "330e65b3-6f5b-453d-8027-99f2bf3dc316",
          },
        ],
      },
      pyqExampleId: "e97a92eb-1b23-4cbf-9f2e-bf639041c26f",
      selfCheckExample: {
        prompt: "What do hoards of Roman aurei found in south India tell historians?",
        steps: [
          "Aurei are Roman gold coins.",
          "Large numbers of them could only have come by trade, as payment for Indian goods.",
        ],
        answer: "That Indo-Roman trade was large, and that Rome paid for Indian goods in gold.",
      },
      practiceSet: [
        { prompt: "Which spice was the chief Indian export to Rome?", answer: "Pepper" },
        { prompt: "In which region was the ancient port of Tamralipti?", answer: "Bengal" },
        { prompt: "Which Greek ambassador praised India's fertile soil and able farmers?", answer: "Megasthenes" },
        { prompt: "What evidence links the Roma (Gypsies) to India?", answer: "Their language, Romani, is Indo-Aryan" },
      ],
      traps: [
        {
          title: "Arikamedu is on the Coromandel coast",
          body: "Arikamedu, near Puducherry, is the Coromandel site. Muchiri was on the Malabar coast, Bharukachchha in Gujarat and Tamralipti in Bengal.",
        },
        {
          title: "Aurei are coins",
          body: "Aurei are Roman gold coins, not wine, perfume or pepper. Wine came in the amphorae.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-terms",
      name: "Words for land, places, dress and arms",
      intuition:
        "Old texts have exact words for kinds of land, local assemblies, clothes and weapons. " +
        "CDS gives the word and asks for the meaning, so this is a short glossary to learn.",
      definition:
        "- Land: **urvara** is fertile land, **maru** is desert, **nadimatrika** is land watered by a river, **devamatrika** is land watered by rain.\n" +
        "- In the south, the **nattar** were the assembly of a **nadu** (a local area) in Chola times. **Nagarakkani** was land owned by the **nagaram**, the merchants' assembly.\n" +
        "- A **yupa** is a **sacrificial post**; a **viragal** is a **hero stone** raised in the Tamil country for a warrior who died.\n" +
        "- Dress: the **antariya** was an **unstitched** length of cloth draped round the lower body; the **uttariya** was an upper scarf.\n" +
        "- Weapons: **sharnga**, **kodanda** and **karmuka** all mean a **bow**; **kunta** is a **spear**.",
      table: {
        columns: ["Word", "Meaning"],
        rows: [
          { cells: ["Urvara", "Fertile land"] },
          { cells: ["Maru", "Desert land"] },
          { cells: ["Nadimatrika", "Land watered by a river"] },
          { cells: ["Devamatrika", "Land watered by rain"] },
          {
            cells: ["Nattar", "Assembly of a nadu in Chola times"],
            noteAmber: "CDS 2023 (II): 'male serpent deity' was the wrong meaning.",
            pyqExampleId: "7201379f-f253-481d-aaa2-4b0af9c9eca9",
          },
          { cells: ["Yupa", "Sacrificial post"] },
          { cells: ["Viragal", "Hero stone"] },
          {
            cells: ["Antariya", "Unstitched lower garment draped round the body"],
            pyqExampleId: "4723f887-b580-4109-af3c-ceb74bca15eb",
          },
          {
            cells: ["Kunta", "Spear"],
            noteAmber: "CDS 2025 (I): sharnga, kodanda and karmuka mean bow; kunta does not.",
            pyqExampleId: "a6d3a24e-e275-489a-9673-a74cd5b222e6",
          },
        ],
      },
      pyqExampleId: "ec236248-b9d6-492b-8a1d-03b5e8c27f21",
      selfCheckExample: {
        prompt: "Name two Sanskrit words for the bow and one for the spear.",
        steps: ["Sharnga is Vishnu's bow and kodanda is Rama's; karmuka is another name.", "The spear or lance is the kunta."],
        answer: "Bow: sharnga, kodanda or karmuka. Spear: kunta.",
      },
      practiceSet: [
        { prompt: "What is a viragal?", answer: "A hero stone for a warrior who died" },
        { prompt: "What was the uttariya?", answer: "An upper scarf or upper garment" },
        { prompt: "What is a yupa?", answer: "A sacrificial post" },
        { prompt: "What was the nagaram in south India?", answer: "The merchants' assembly" },
      ],
      traps: [
        {
          title: "Devamatrika is rain-fed",
          body: "Devamatrika land has 'the god for its mother', so it depends on rain. Nadimatrika land has a river for its mother and is watered by the river.",
        },
        {
          title: "Nattar is an assembly, not a god",
          body: "The nattar were the assembly of a nadu in Chola times. An option calling it a serpent deity is the wrong pair.",
        },
      ],
    },
  ],
};
