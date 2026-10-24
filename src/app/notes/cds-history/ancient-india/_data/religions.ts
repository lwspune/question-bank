import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_RELIGIONS_NOTE: SubtopicNote = {
  subtopicName: "Buddhism, Jainism and Other Schools",
  title: "Buddhism, Jainism and Other Schools",
  oneLineDefinition:
    "Buddhist texts, nuns and goddesses; the Jain gems, vows and sects with the Ajivikas; and the Charvaka, Vedanta and other schools of thought.",
  whyItMatters:
    "Thirteen questions, nine of them HARD. They rarely ask the Buddha's life story. They ask a name from the texts: a nun, a sutta, a goddess, a Jain teacher, a branch of the Charvakas. The Charvaka school alone was asked twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-buddhism",
      name: "Buddhist texts, nuns and goddesses",
      intuition:
        "The Buddha's teachings were collected in Pali into three 'baskets'. " +
        "He admitted women to the order, and later Buddhism added goddesses of its own, some of them older spirits turned to the faith.",
      definition:
        "- The Pali canon, the **Tipitaka**, has three baskets: **Vinaya** (rules for monks and nuns), **Sutta** (the Buddha's discourses) and **Abhidhamma** (philosophy).\n" +
        "- The Sutta Pitaka is divided into **Nikayas**. The **Majjhima Nikaya** holds the **Madhura Sutta**, where the monk **Kachchana** tells **King Avantiputta** that birth does not fix a person's rank.\n" +
        "- The **Jatakas**, stories of the Buddha's earlier births, are in **Pali**.\n" +
        "- The first woman ordained was **Mahapajapati Gotami**, the Buddha's foster mother. Nuns could reach liberation, but under eight rules they were placed **below the monks**.\n" +
        "- **Theris** were **elder nuns**; their verses form the **Therigatha**. **Khema** was a leading woman disciple of the Buddha.\n" +
        "- **Hariti** was a child-eating **yakshi** whom the Buddha turned into a **protector of children**. **Prajnaparamita** is wisdom; **Tara** protects from the eight great fears.",
      table: {
        columns: ["Name", "Who or what"],
        rows: [
          { cells: ["Theri", "An elder Buddhist nun; their verses are the Therigatha"] },
          { cells: ["Mahapajapati Gotami", "The Buddha's foster mother, the first woman ordained"] },
          {
            cells: ["Khema", "A Buddhist nun, a leading woman disciple of the Buddha"],
            noteAmber: "CDS 2021 (II): Khema was the one who was not a Jain acharya.",
            pyqExampleId: "e96b2637-b471-4453-b037-af98ef2d0af4",
          },
          {
            cells: ["Hariti", "A child-eating yakshi who became a protector of children"],
            pyqExampleId: "47149c6b-4a32-4ff0-be6a-33a768133335",
          },
          {
            cells: ["Madhura Sutta", "Majjhima Nikaya: Kachchana tells King Avantiputta that birth fixes no rank"],
            pyqExampleId: "21479141-cc07-4ea6-b802-61cad94df9ad",
          },
          {
            cells: ["Jatakas", "Stories of the Buddha's earlier births, in Pali"],
            pyqExampleId: "96766ffd-87a9-4d0d-b52b-6f5f956faecc",
          },
        ],
      },
      pyqExampleId: "f705349e-577c-48d2-93cf-de1abef5b56b",
      selfCheckExample: {
        prompt: "Which Buddhist goddess was changed by the Buddha from a child-eating yakshi into a protector of children?",
        steps: [
          "The story says the Buddha hid her own child so that she felt the grief she caused other mothers.",
          "After that she guarded children instead of taking them.",
        ],
        answer: "Hariti.",
      },
      practiceSet: [
        { prompt: "Who was the first woman ordained as a Buddhist nun?", answer: "Mahapajapati Gotami, the Buddha's foster mother" },
        { prompt: "Which Buddhist goddess personifies wisdom?", answer: "Prajnaparamita" },
        { prompt: "Name the three baskets of the Buddhist canon.", answer: "Vinaya, Sutta and Abhidhamma" },
        { prompt: "In which language are the Jataka stories?", answer: "Pali" },
      ],
      traps: [
        {
          title: "Nuns were not made equal to monks",
          body: "The Buddha accepted that women could reach liberation, but the eight rules placed nuns below monks in the order. A statement giving them equal status is false.",
        },
        {
          title: "Khema was Buddhist, not Jain",
          body: "Khema was a Buddhist nun. Bhadrabahu, Haribhadra and Siddhasena Divakara were Jain acharyas.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-jainism",
      name: "Jainism and the Ajivikas",
      intuition:
        "Jain ideas were older than Mahavira, who was the last of 24 teachers. " +
        "A famine split the monks into two groups that disagree to this day, and a rival sect, the Ajivikas, believed fate decided everything.",
      definition:
        "- Jainism has **24 tirthankaras**. **Parshva** (the 23rd) spread Jain ideas before **Mahavira** (the 24th).\n" +
        "- The **three gems (triratna)**: **right faith** (samyag-darshana), **right knowledge** (samyag-jnana) and **right conduct** (samyag-charitra).\n" +
        "- The **five vows**: non-violence (ahimsa), truth (satya), not stealing (asteya), not owning things (aparigraha) and chastity (brahmacharya).\n" +
        "- During a famine in Magadha, **Bhadrabahu** led a group of monks **south**: they became the **Digambaras** (sky-clad). Those who stayed under **Sthulabhadra** became the **Shvetambaras** (white-clad). Shvetambaras accept the canon of **12 Angas** and believe **women can attain liberation**.\n" +
        "- Mahavira's first woman disciple, **Chandana**, had been a captive sold as a slave.\n" +
        "- The **Ajivikas**, led by **Makkhali Gosala**, believed **fate (niyati)** controls everything. They had their own order and canon, practised severe austerity, and were **rivals** of both Jains and Buddhists.",
      table: {
        columns: ["Term", "Fact"],
        rows: [
          { cells: ["Triratna", "Right faith, right knowledge, right conduct"] },
          { cells: ["Five vows", "Non-violence, truth, not stealing, not owning, chastity"] },
          {
            cells: ["Shvetambara", "White-clad monks who stayed in Magadha under Sthulabhadra"],
            noteAmber: "CDS 2023 (II): the move south of the Vindhyas was wrongly given to them.",
            pyqExampleId: "f00d47dd-5279-4e99-b84d-c0b94f3b6cac",
          },
          { cells: ["Digambara", "Sky-clad monks, who went south with Bhadrabahu"] },
          {
            cells: ["Ajivikas", "Makkhali Gosala's sect: fate rules all; rivals of Jains and Buddhists"],
            pyqExampleId: "9a16a176-62e5-47f8-84db-af14021a2990",
          },
          {
            cells: ["Chandana", "Mahavira's first woman disciple, once a captive slave"],
            pyqExampleId: "b7541806-c301-44e3-830a-de1eb0cd2a26",
          },
        ],
      },
      pyqExampleId: "40e46d40-64e3-490b-b055-3788db9d58e3",
      selfCheckExample: {
        prompt: "Which Jain group went south with Bhadrabahu, and which stayed in Magadha?",
        steps: [
          "A famine drove one group of monks south under Bhadrabahu.",
          "The group that stayed behind under Sthulabhadra wore white clothes.",
        ],
        answer: "The Digambaras went south; the Shvetambaras stayed in Magadha.",
      },
      practiceSet: [
        { prompt: "Who was the 23rd Jain tirthankara?", answer: "Parshva" },
        { prompt: "Who led the Ajivika sect?", answer: "Makkhali Gosala" },
        { prompt: "What did the Ajivikas believe controls everything?", answer: "Fate (niyati)" },
        { prompt: "Who was the first woman disciple of Mahavira?", answer: "Chandana" },
      ],
      traps: [
        {
          title: "Vows are not gems",
          body: "Asteya (not stealing) and brahmacharya (chastity) are among the five vows. The three gems are right faith, right knowledge and right conduct.",
        },
        {
          title: "The Ajivikas were rivals, not allies",
          body: "The Ajivikas competed with both Jains and Buddhists; Makkhali Gosala broke bitterly with Mahavira. No alliance with the Jains against the Buddhists is recorded.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-philosophy",
      name: "Charvaka, Vedanta and the guardian gods",
      intuition:
        "Six orthodox schools accepted the Vedas. The Charvakas rejected them and everything beyond the senses: no soul, no afterlife. " +
        "Much later Shankara gave Vedanta its most famous form.",
      definition:
        "- The six **orthodox (astika)** schools accept the authority of the Vedas: **Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa and Vedanta**.\n" +
        "- The **Charvaka** or **Lokayata** school was **materialist**: only the **material world** exists, so there is **no life after death**. Its two branches were the **Dhurta** and the **Sushikshita**.\n" +
        "- **Shankara** taught **Advaita** (non-dual) Vedanta, building on the work of **Gaudapada**, and tried to show that the Upanishads and the Brahmasutras teach one system. Tradition credits him with founding four mathas.\n" +
        "- The **Lokapalas**, guardians of the directions: **Indra** (east), **Yama** (south), **Varuna** (west), **Kubera** (north).",
      table: {
        columns: ["School or name", "Key idea"],
        rows: [
          {
            cells: ["Charvaka (Lokayata)", "Only the material world exists; branches Dhurta and Sushikshita"],
            noteAmber: "CDS 2022 (II): Dhurta and Sushikshita were the Charvaka branches; Nyaya and Vaisheshika were not.",
            pyqExampleId: "bfd1ba6b-9425-4f8e-b4b1-ba459a48c9b6",
          },
          { cells: ["Nyaya and Vaisheshika", "Orthodox schools that accept the Vedas"] },
          {
            cells: ["Advaita Vedanta", "Shankara: one reality; built on Gaudapada"],
            pyqExampleId: "5041a29b-30d8-459f-a867-a6f0b6f8a47e",
          },
          {
            cells: ["Lokapalas", "Indra (east), Yama (south), Varuna (west), Kubera (north)"],
            pyqExampleId: "b0478f45-cd77-417a-8149-a27ab3c1c544",
          },
        ],
      },
      pyqExampleId: "58e3ccf9-6ed9-4974-af72-4de7ac726b28",
      selfCheckExample: {
        prompt: "Name the four Lokapalas and the direction each guards.",
        steps: ["Start in the east and go round clockwise: east, south, west, north."],
        answer: "Indra (east), Yama (south), Varuna (west), Kubera (north).",
      },
      practiceSet: [
        { prompt: "Name the six orthodox schools of Indian philosophy.", answer: "Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa and Vedanta" },
        { prompt: "Which school of Vedanta did Shankara teach?", answer: "Advaita (non-dual) Vedanta" },
        { prompt: "On whose philosophy did Shankara build?", answer: "Gaudapada's" },
        { prompt: "What does astika mean for a school of philosophy?", answer: "It accepts the authority of the Vedas" },
      ],
      traps: [
        {
          title: "Nyaya and Vaisheshika are not Charvaka",
          body: "Nyaya and Vaisheshika are orthodox schools that accept the Vedas and the soul. The Charvaka branches are the Dhurta and the Sushikshita.",
        },
        {
          title: "Brahma and Shiva are not Lokapalas",
          body: "The four Lokapalas are Indra, Yama, Varuna and Kubera. An option with Brahma, Shiva or Skanda is wrong.",
        },
      ],
    },
  ],
};
