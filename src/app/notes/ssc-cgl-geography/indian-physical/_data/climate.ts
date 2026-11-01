import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIP_CLIMATE_NOTE: SubtopicNote = {
  subtopicName: "Climate, Soils and Vegetation of India",
  title: "Climate, Soils and Vegetation of India",
  oneLineDefinition:
    "How the monsoon reaches India and why one coast stays dry, the traditional seasons, the forest types with their trees, and the forest policy, parks and sanctuaries SSC names.",
  whyItMatters:
    "Twenty-three questions in the bank: 11 from the 2023 shifts, nine from the 2024 shifts and three from the 2025 shifts, 12 of them MODERATE. The forest questions name a tree and ask its forest type, so a tree-to-forest table is the fastest part of the page to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgipcl-monsoon",
      name: "The monsoon and the seasons",
      intuition:
        "Most of India's rain comes in four months on the south-west monsoon, in two branches that meet over the northern plains. One coast misses most of that rain and gets its own later, from the retreating monsoon.",
      definition:
        "The south-west monsoon:\n" +
        "- It brings most of the rain from **June to September** and lasts about **100 to 120 days**.\n" +
        "- It comes in two branches, from the **Arabian Sea** and the **Bay of Bengal**, which **merge over the north-western Ganga plains**.\n" +
        "- The **Tamil Nadu coast** stays dry then, because the Bay of Bengal branch blows **parallel** to it. It gets heavy rain in **October to December** from the retreating north-easterly winds.\n\n" +
        "Temperature: **December and January** are the coldest months in the north. Coastal **Kerala** has almost no difference between day and night; the **Rajasthan** desert has a great one.\n\n" +
        "The six traditional seasons run Vasant (spring), Grishma, Varsha, Sharad, **Hemant (November and December)** and Shishir.\n\n" +
        "**Black soil** covers the **Deccan trap**, formed from its lava rock.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Months of most rain", "June to September"], pyqExampleId: "d92a21f4-45d1-4480-8d7b-15d0bc9a03cb" },
          { cells: ["Length of the monsoon", "100 to 120 days"], pyqExampleId: "87c423c5-0525-4943-86d3-db54eea97bf3" },
          { cells: ["Where the two branches merge", "North-western Ganga plains"], pyqExampleId: "633dc775-46d6-4e1a-9d91-fd3869e9d3a2" },
          { cells: ["Coast with winter rain", "Eastern (Tamil Nadu) coast"], pyqExampleId: "29fd5a91-74fc-4536-a6c9-5ab96a490b82" },
          { cells: ["Black soil region", "Deccan trap"], pyqExampleId: "834043bb-8c2b-4dca-b3d6-ed6b99c5179e" },
        ],
      },
      pyqExampleId: "98d6cce7-8d17-46c0-822a-37a3fd9588e7",
      selfCheckExample: {
        prompt: "Why does Chennai get its heaviest rain in November rather than July?",
        steps: [
          "In July the Bay of Bengal branch of the south-west monsoon blows parallel to the Tamil Nadu coast, so little rain falls there.",
          "From October to December the retreating north-easterly winds pick up moisture over the Bay of Bengal and drop it on that coast.",
        ],
        answer: "Its rain comes from the retreating north-east winds, not the south-west monsoon.",
      },
      practiceSet: [
        { prompt: "Which are the coldest months in North India?", answer: "December and January" },
        { prompt: "Which traditional season falls in November and December?", answer: "Hemant" },
        { prompt: "Where in India is the day-night temperature difference smallest: coastal Kerala or Rajasthan?", answer: "Coastal Kerala" },
      ],
      traps: [
        {
          title: "The south-west monsoon brings the June rains",
          body: "The rain of **June to September** comes from the **south-west** monsoon. The **north-east** monsoon is the winter rain of the Tamil Nadu coast.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgipcl-forests",
      name: "Forest types and their trees",
      intuition:
        "India's forests follow rainfall and height: dense evergreen forest where rain is heaviest, deciduous forest where it is moderate, mangroves on tidal coasts, and shola on the high southern hills. SSC names a tree and asks the forest.",
      definition:
        "The types:\n" +
        "- **Tropical evergreen** (more than 200 cm of rain): **ebony, mahogany**, rosewood. The moist forests of the Western Ghats and the North-East also hold **bamboo, epiphytes, aini and semul**. Semi-evergreen forest grows on the **Meghalaya plateau**, the **Sahyadri** and the Nicobar islands.\n" +
        "- **Tropical deciduous** (monsoon forests): **teak**, sal, sandalwood, shisham. **Tendu** leaves, used for bidis, come from the dry deciduous forests.\n" +
        "- **Mangrove** (tidal) forests: the **sundari** tree, which gives the Sundarbans its name and hard, durable timber.\n" +
        "- **Shola**: stunted evergreen forest in the **folds of valleys**, surrounded by grassland, on the high Western Ghats (Nilgiris, Anamalai).\n" +
        "- **Himalayan yew**, a medicinal tree, grows in the temperate Himalayas, as in **Himachal Pradesh**.",
      table: {
        columns: ["Tree", "Forest type"],
        rows: [
          { cells: ["Ebony, mahogany", "Tropical evergreen"], pyqExampleId: "b3c57109-de42-48a6-8c83-1a860e0be557" },
          { cells: ["Teak, sal", "Tropical deciduous"], pyqExampleId: "b5ff16c0-229b-4f4f-a7dc-4b848d5e070b" },
          { cells: ["Sundari", "Mangrove"], pyqExampleId: "ca6dd2e3-c1a3-4576-809b-8c0ec120c14f" },
          { cells: ["Tendu", "Dry deciduous (leaves for bidis)"], pyqExampleId: "05f8275d-7229-46ba-a50a-87ac10815f9e" },
          { cells: ["Bamboo, semul, aini", "Moist tropical"], pyqExampleId: "310a09e5-27ef-48a4-9fca-f244e19b9605" },
        ],
      },
      pyqExampleId: "4f1c662e-a989-4b44-a72c-ec230b03e83b",
      selfCheckExample: {
        prompt: "Teak and mahogany are both valuable woods. In which forest type does each grow?",
        steps: ["Teak is the typical tree of the tropical deciduous (monsoon) forest.", "Mahogany grows in the tropical evergreen forest of heavy rainfall."],
        answer: "Teak: deciduous. Mahogany: evergreen.",
      },
      practiceSet: [
        { prompt: "Which tree gives the Sundarbans its name?", answer: "The sundari" },
        { prompt: "Whose leaves are used to roll bidis?", answer: "Tendu" },
        { prompt: "On which hills do shola forests grow?", answer: "The high Western Ghats, such as the Nilgiris" },
      ],
      traps: [
        {
          title: "Teak is deciduous, not evergreen",
          body: "**Teak** and **sal** belong to the **deciduous** forests. **Ebony** and **mahogany** are the **evergreen** woods.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgipcl-protected",
      name: "Forest policy, parks and sanctuaries",
      intuition:
        "A few facts about how India protects its forests: the policy year, the forest-cover figure, and which State each named park is in.",
      definition:
        "The facts:\n" +
        "- The **National Forest Policy of 1988** called for people to share in protecting forests, which led to **Joint Forest Management**.\n" +
        "- The **India State of Forest Report 2019** put forest cover at **21.67%** of the country.\n" +
        "- Parks and sanctuaries: **Similipal** (Odisha), Namdapha (Arunachal Pradesh), Bandipur (Karnataka), Vansda (Gujarat), and **Chandra Prabha** sanctuary (Uttar Pradesh).",
      table: {
        columns: ["Park or sanctuary", "State"],
        rows: [
          { cells: ["Similipal", "Odisha"] },
          { cells: ["Namdapha", "Arunachal Pradesh"] },
          { cells: ["Bandipur", "Karnataka"] },
          { cells: ["Chandra Prabha", "Uttar Pradesh"], pyqExampleId: "34bce3c4-ee41-4be1-bab0-a56cc08cffba" },
        ],
      },
      pyqExampleId: "8a8c8869-7a70-4f52-a9d9-9fc24aa65b13",
      selfCheckExample: {
        prompt: "In which year did the forest policy behind Joint Forest Management come, and what did it ask for?",
        steps: ["It was the National Forest Policy of 1988.", "It asked for local people to share in protecting and managing forests."],
        answer: "1988; people's participation in protecting forests.",
      },
      practiceSet: [
        { prompt: "What was India's forest cover in the 2019 report?", answer: "21.67%" },
        { prompt: "In which State is Similipal National Park?", answer: "Odisha" },
        { prompt: "In which State is the Chandra Prabha sanctuary?", answer: "Uttar Pradesh" },
      ],
      traps: [
        {
          title: "Forest cover, not forest plus tree cover",
          body: "**21.67%** is **forest** cover in 2019. Forest plus tree cover together was nearer 24.6%, which SSC offers as a decoy.",
        },
      ],
    },
  ],
};
