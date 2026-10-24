import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_URBAN_NOTE: SubtopicNote = {
  subtopicName: "Migration and Towns",
  title: "Migration and Towns",
  oneLineDefinition:
    "How many Indians are migrants and why they move, how towns are classed by function and by size, and which States and cities were the most urban in 2011.",
  whyItMatters:
    "Six CDS questions from 2018 to 2025. Two are on migration, and four on towns: their functions, their size classes, the most urbanised States and the largest cities. Every one rests on the 2011 Census or the NCERT chapter on human settlements.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-migration",
      name: "Migration",
      intuition:
        "The Census counts a person as a migrant if they now live somewhere other than their last place of residence. By that rule, about one Indian in three is a migrant. " +
        "Most of them are women who moved after marriage, so the reasons for migration look very different for men and for women.",
      definition:
        "From the **2011 Census** (migrants by place of last residence):\n" +
        "- About **45.6 crore** internal migrants, about **37 per cent** of India's people: roughly a third.\n" +
        "- For **women**, the biggest reason is **marriage**, because a bride usually moves to her husband's home.\n" +
        "- For **men**, the biggest reason is **work and employment**.\n" +
        "- The largest stream is **rural to rural**, mostly women moving on marriage.\n" +
        "- **Push factors** drive people out (unemployment, poor living conditions, disasters). **Pull factors** draw them in (jobs, better wages, schools, hospitals).",
      table: {
        columns: ["Question", "Answer (Census 2011)"],
        rows: [
          {
            cells: ["Share of people who are migrants", "About 37 per cent (45.6 crore)"],
            noteAmber: "CDS 2020 (I): of 25, 35, 45 and 55 per cent, the nearest is 35.",
            pyqExampleId: "414963a5-4ea3-4c9d-b379-19e2a906a3cb",
          },
          { cells: ["Main reason women migrate", "Marriage"] },
          { cells: ["Main reason men migrate", "Work and employment"] },
          { cells: ["Largest migration stream", "Rural to rural"] },
        ],
      },
      pyqExampleId: "12145f4d-77d0-4d61-a915-2bc29b5bca4b",
      selfCheckExample: {
        prompt: "A town has 2 lakh residents. Of them, 50,000 last lived somewhere else before moving there. What share of the town's people are migrants?",
        steps: [
          "Migrants as a share of all residents: 50,000 ÷ 2,00,000.",
          "That is 0.25, or 25 per cent.",
        ],
        answer: "25 per cent",
      },
      practiceSet: [
        { prompt: "What is the main reason men migrate within India?", answer: "Work and employment" },
        { prompt: "Which migration stream is the largest in India?", answer: "Rural to rural" },
        { prompt: "Give one push factor that drives people out of a village.", answer: "Any one of unemployment, poor living conditions, disasters, lack of schools or hospitals" },
        { prompt: "Give one pull factor that draws people to a city.", answer: "Any one of jobs, better wages, schools, hospitals, better facilities" },
      ],
      traps: [
        {
          title: "A third, not a half",
          body: "In 2011 about **37 per cent** of Indians were migrants by last residence: about a third. An option of 45 or 55 per cent is too high.",
        },
        {
          title: "Different reasons for men and women",
          body: "**Work** is the main reason men move; **marriage** is the main reason women move. A question on female migration wants **marriage**, not employment or education.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-towns",
      name: "Towns by function and size",
      intuition:
        "Every town grew up for a reason: a steel plant, a port, a coal mine, an army camp, a temple. That reason is its function, and the NCERT gives a short list of examples for each. " +
        "The Census also sorts towns by size into six classes, and the biggest class holds most of the urban people.",
      definition:
        "- **Functional classes** (NCERT Class 12): administrative, industrial, transport, commercial, mining, garrison cantonment, educational, religious and cultural, and tourist towns.\n" +
        "- **Size classes** (Census): **Class I** has 1 lakh or more people, **Class II** 50,000 to 99,999, **Class III** 20,000 to 49,999, **Class IV** 10,000 to 19,999, **Class V** 5,000 to 9,999 and **Class VI** under 5,000. **Class I towns hold about 70 per cent** of India's urban population.\n" +
        "- In **2011**, about **31 per cent** of Indians lived in towns. **Goa** was the most urbanised State (**62 per cent**), followed by Mizoram (52), Tamil Nadu (48), Kerala (48) and Maharashtra (45).\n" +
        "- The largest urban agglomerations in 2011: **Greater Mumbai** (18.4 million), **Delhi** (16.3), **Kolkata** (14.1), **Chennai** (8.7).",
      table: {
        columns: ["Function", "Example towns"],
        rows: [
          { cells: ["Administrative", "Chandigarh, Gandhinagar, Bhubaneswar"] },
          { cells: ["Industrial", "Bhilai, Jamshedpur, Hugli, Salem, Coimbatore"] },
          { cells: ["Transport", "Ports such as Kandla, Kochi and Visakhapatnam; rail junctions such as Itarsi and Katni"] },
          { cells: ["Mining", "Raniganj, Jharia, Digboi, Ankaleshwar, Singrauli"] },
          { cells: ["Garrison cantonment", "Ambala, Jalandhar, Mhow, Babina, Udhampur"] },
          { cells: ["Religious and cultural", "Varanasi, Amritsar, Madurai, Puri, Ajmer, Tirupati"] },
          { cells: ["Educational", "Roorkee, Aligarh, Pilani"] },
          { cells: ["Tourist", "Nainital, Shimla, Pachmarhi, Udhagamandalam, Mount Abu"] },
        ],
      },
      pyqExampleId: "87a0b81d-e697-406c-a47a-d23852af197d",
      selfCheckExample: {
        prompt: "A town has 35,000 people. In which Census size class does it fall?",
        steps: [
          "Class III covers 20,000 to 49,999 people.",
          "35,000 lies in that range.",
        ],
        answer: "Class III",
      },
      practiceSet: [
        { prompt: "Which State was the most urbanised in the 2011 Census?", answer: "Goa, about 62 per cent urban" },
        { prompt: "What share of India's people lived in towns in 2011?", answer: "About 31 per cent" },
        { prompt: "Which was India's largest urban agglomeration in 2011?", answer: "Greater Mumbai" },
        { prompt: "What population marks a Class I town?", answer: "One lakh or more" },
      ],
      traps: [
        {
          title: "Visakhapatnam is a transport town",
          body: "Visakhapatnam has a steel plant, but the NCERT lists it with **Kandla and Kochi** as a **transport (port) town**. **Bhilai** is the industrial town in the same list.",
        },
        {
          title: "Mumbai before Delhi",
          body: "In 2011 the **Greater Mumbai** agglomeration (18.4 million) was larger than **Delhi**'s (16.3 million), then Kolkata, then Chennai.",
        },
        {
          title: "Goa, then Mizoram",
          body: "Among States in 2011, **Goa** was the most urban, ahead of **Mizoram**. Maharashtra, though home to Mumbai, was only about 45 per cent urban, below Kerala.",
        },
      ],
    },
  ],
};
