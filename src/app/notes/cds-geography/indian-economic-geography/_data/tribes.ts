import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_TRIBES_NOTE: SubtopicNote = {
  subtopicName: "Tribes and Languages",
  title: "Tribes and Languages",
  oneLineDefinition:
    "Where India's Scheduled Tribes and Scheduled Castes are most numerous and most concentrated, a few tribes and communities by region, and the four language families with their branches.",
  whyItMatters:
    "Eight CDS questions from 2016 to 2023, three of them in 2018. The tribe questions hinge on one distinction: the State with the most tribal people is not the State where they form the highest share. The language questions ask which family or branch a language belongs to.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-tribes",
      name: "Tribes and scheduled populations",
      intuition:
        "A big State with a modest tribal share can still hold more tribal people than a small State that is almost entirely tribal. So CDS asks two different questions: the largest number, and the highest share. " +
        "Madhya Pradesh answers the first; Mizoram answers the second.",
      definition:
        "From the **2011 Census**:\n" +
        "- Scheduled Tribes are about **8.6 per cent** of India's people, and Scheduled Castes about **16.6 per cent**.\n" +
        "- **Largest ST population**: **Madhya Pradesh** (about 1.5 crore), then **Maharashtra**.\n" +
        "- **Highest ST share** among States: **Mizoram** (about **94 per cent**), then **Nagaland** (about 86) and Meghalaya (about 86). Arunachal Pradesh is lower, at about 69.\n" +
        "- **Highest SC share**: **Punjab**, about **32 per cent**.\n" +
        "- A few tribes and communities by home region: **Todas** of the **Nilgiris (the Blue Mountains)** in Tamil Nadu; **Gonds** of central India; **Bhils** of western India; **Jarawas** of the Andaman Islands; **Adi** of Arunachal Pradesh; and the **Ahoms**, a Tai people who ruled the Brahmaputra valley of **Assam** for six centuries.",
      table: {
        columns: ["Question", "Answer (Census 2011)"],
        rows: [
          {
            cells: ["Largest ST population", "Madhya Pradesh, then Maharashtra"],
            noteAmber: "CDS 2016 (II): the second largest is Maharashtra, not Chhattisgarh; the second highest share is Nagaland, not Arunachal.",
            pyqExampleId: "5f5a9b83-d7f0-423a-a9f0-0abcb7231526",
          },
          { cells: ["Highest ST share of a State", "Mizoram, about 94 per cent"] },
          {
            cells: ["Highest SC share of a State", "Punjab, about 32 per cent"],
            pyqExampleId: "dfb47efc-4183-463a-b740-ac1690db0d3c",
          },
          {
            cells: ["Tribe of the Blue Mountains (Nilgiris)", "Todas"],
            noteAmber: "CDS 2017 (II): the Todas, not the Lambadas, Gonds or Jarawas.",
            pyqExampleId: "511c6ba5-b65f-4bc7-b705-0d53c9175ab8",
          },
          {
            cells: ["Ethnic community of Assam", "Ahoms"],
            noteAmber: "CDS 2023 (I): the Ahoms, against the Bhils, Gonds and Adi.",
            pyqExampleId: "5b17e321-bed8-4d8f-af32-c60fe5262e6b",
          },
        ],
      },
      pyqExampleId: "54881510-5a8d-4c0d-87a5-695e489d8a24",
      selfCheckExample: {
        prompt: "Madhya Pradesh has the largest number of tribal people in India, yet Mizoram has the highest tribal share. How can both be true?",
        steps: [
          "Madhya Pradesh is a very large State. About a fifth of its people are tribal, and that fifth is a very large number.",
          "Mizoram is small, but almost all of its people (about 94 per cent) are tribal.",
          "A share and a number answer different questions.",
        ],
        answer: "Madhya Pradesh has the most tribal people because it is large; Mizoram has the highest share because almost all its small population is tribal.",
      },
      practiceSet: [
        { prompt: "Which State has the second largest Scheduled Tribe population?", answer: "Maharashtra" },
        { prompt: "Where do the Jarawas live?", answer: "In the Andaman Islands" },
        { prompt: "What share of India's people were Scheduled Tribes in 2011?", answer: "About 8.6 per cent" },
        { prompt: "Which State had the highest share of Scheduled Castes in 2011?", answer: "Punjab" },
      ],
      traps: [
        {
          title: "Number versus share",
          body: "The **largest number** of tribal people is in **Madhya Pradesh**. The **highest share** of a State's people is in **Mizoram**. Read the stem for which one it asks.",
        },
        {
          title: "Second place is Nagaland",
          body: "After Mizoram, the next highest tribal share among States is **Nagaland** (about 86 per cent), not Arunachal Pradesh (about 69).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-languages",
      name: "Language families",
      intuition:
        "India's hundreds of languages fall into four families. One family is very large and covers most of the north; one covers the south; the other two are small and live in the hills of the north-east and the tribal belts of the centre. " +
        "Inside the small Austric family, the two branches are what CDS tests.",
      definition:
        "The four families (NCERT Class 12, India: People and Economy):\n" +
        "- **Indo-European (Indo-Aryan branch)**: about **73 per cent** of Indians, the **largest group**. Hindi, Bengali, Marathi, Gujarati, Punjabi, Urdu, Kashmiri.\n" +
        "- **Dravidian**: about **20 per cent**. Tamil, Telugu, Kannada, Malayalam, Gondi.\n" +
        "- **Austric (Austro-Asiatic)**: about **1.4 per cent**. Two branches: **Munda** (Santhali, Ho, Mundari) and **Mon-Khmer** (**Khasi**, Nicobarese).\n" +
        "- **Sino-Tibetan (Tibeto-Burman)**: under 1 per cent. Ladakhi, Bodo, Naga languages, Mizo, Manipuri, **Monpa** (Arunachal Pradesh).\n" +
        "- The main languages of **Jammu and Kashmir** include **Kashmiri (Koshur)**, **Urdu**, Dogri and **Gojri**.",
      table: {
        columns: ["Family", "Branch and examples"],
        rows: [
          { cells: ["Indo-European", "Indo-Aryan: Hindi, Bengali, Marathi, Kashmiri, Urdu; about 73 per cent of Indians"] },
          { cells: ["Dravidian", "Tamil, Telugu, Kannada, Malayalam; about 20 per cent"] },
          {
            cells: ["Austric", "Munda: Santhali, Ho, Mundari. Mon-Khmer: Khasi, Nicobarese"],
            noteAmber: "CDS 2018 (II): Khasi belongs to the Mon-Khmer branch of Austro-Asiatic.",
            pyqExampleId: "5f8355ac-7399-486d-ad7a-4f15a6ffb66c",
          },
          {
            cells: ["Sino-Tibetan", "Tibeto-Burman: Ladakhi, Bodo, Mizo, Manipuri, Monpa"],
            noteAmber: "CDS 2020 (I): Monpa, an Arunachal language, is not a principal language of Jammu and Kashmir.",
            pyqExampleId: "3a8e67bf-07a3-4460-b748-8648d45205a4",
          },
        ],
      },
      pyqExampleId: "e3b305ef-6889-4f39-b8f6-7612a70505ac",
      selfCheckExample: {
        prompt: "Bodo is spoken in Assam and Mizo in Mizoram. To which language family do both belong?",
        steps: [
          "Both are languages of the north-eastern hills.",
          "The north-eastern hill languages (Bodo, Naga, Mizo, Manipuri) are Tibeto-Burman.",
          "Tibeto-Burman is a part of the Sino-Tibetan family.",
        ],
        answer: "The Sino-Tibetan family (Tibeto-Burman)",
      },
      practiceSet: [
        { prompt: "To which branch of the Austric family does Santhali belong?", answer: "The Munda branch" },
        { prompt: "To which language family does Tamil belong?", answer: "Dravidian" },
        { prompt: "In which State is Monpa spoken?", answer: "Arunachal Pradesh" },
        { prompt: "What do its own speakers call the Kashmiri language?", answer: "Koshur" },
      ],
      traps: [
        {
          title: "Khasi is Mon-Khmer, not Munda",
          body: "Both branches are Austric, but **Khasi** (Meghalaya) and Nicobarese are **Mon-Khmer**. Santhali, Ho and Mundari are **Munda**.",
        },
        {
          title: "Monpa belongs to Arunachal",
          body: "Kashmiri (Koshur), Urdu and Gojri are languages of Jammu and Kashmir. **Monpa** is spoken in the **Tawang** area of **Arunachal Pradesh**.",
        },
      ],
    },
  ],
};
