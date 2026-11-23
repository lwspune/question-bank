import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SFI_INSTITUTIONS_NOTE: SubtopicNote = {
  subtopicName: "Institutions, Organisations and Headquarters",
  title: "Institutions, Organisations and Headquarters",
  oneLineDefinition:
    "India's national academies and institutes with their cities, the global indices and who publishes them, and the Quad.",
  whyItMatters:
    "Thirteen questions in the bank. All seven from the 2023 and 2024 shifts asked about an Indian institution; all six from the 2025 shifts asked about a global grouping or index. Learn both lists.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsfiin-academies",
      name: "National academies and institutes",
      intuition:
        "India's three national academies sit together at Rabindra Bhavan in New Delhi, and each covers one field of the arts. Most institute questions ask the city, and most of the answers here are New Delhi; the exceptions are worth learning first.",
      definition:
        "**The three national academies**, all at **Rabindra Bhavan, New Delhi**:\n" +
        "- **Sangeet Natak Akademi**: **music, dance and drama**; set up in **1952** and inaugurated on **28 January 1953** by President **Rajendra Prasad**.\n" +
        "- **Lalit Kala Akademi**: **fine arts** (1954).\n" +
        "- **Sahitya Akademi**: **literature** (1954).\n\n" +
        "**Institutes**:\n" +
        "- **Kathak Kendra**, the National Institute of Kathak Dance, New Delhi, set up in **1964** as a unit of the Sangeet Natak Akademi.\n" +
        "- **National Dope Testing Laboratory**: **New Delhi**.\n" +
        "- **National Sports University**: **Imphal, Manipur** (2018).\n" +
        "- **ICAR Sugarcane Breeding Institute**: **Coimbatore, Tamil Nadu** (1912); its \"Co\" sugarcane varieties are grown across India.",
      table: {
        columns: ["Institution", "City", "Remember"],
        rows: [
          { cells: ["Sangeet Natak Akademi", "New Delhi", "Music, dance and drama; inaugurated 1953"] },
          { cells: ["Lalit Kala Akademi", "New Delhi", "Fine arts"] },
          { cells: ["Sahitya Akademi", "New Delhi", "Literature"] },
          { cells: ["Kathak Kendra", "New Delhi", "A unit of the Sangeet Natak Akademi"] },
          { cells: ["National Dope Testing Laboratory", "New Delhi", "Tests athletes for doping"] },
          { cells: ["National Sports University", "Imphal", "Manipur, 2018"] },
          { cells: ["ICAR Sugarcane Breeding Institute", "Coimbatore", "Tamil Nadu, 1912"] },
        ],
      },
      pyqExampleId: "5f6e3777-0bd5-452e-91c6-372a447a2d77",
      selfCheckExample: {
        prompt: "Which national academy covers the fine arts: the Sangeet Natak Akademi, the Lalit Kala Akademi or the Sahitya Akademi?",
        steps: ["Sangeet Natak is music, dance and drama; Sahitya is literature.", "Lalit Kala is the fine arts."],
        answer: "The Lalit Kala Akademi.",
      },
      practiceSet: [
        { prompt: "Which President inaugurated the Sangeet Natak Akademi in 1953?", answer: "Rajendra Prasad" },
        { prompt: "Which is India's national academy of music, dance and drama?", answer: "The Sangeet Natak Akademi" },
        { prompt: "In which city is the ICAR Sugarcane Breeding Institute?", answer: "Coimbatore" },
        { prompt: "In which city is the National Dope Testing Laboratory?", answer: "New Delhi" },
      ],
      traps: [
        {
          title: "Dance belongs to Sangeet Natak, not Lalit Kala",
          body: "India's national academy of **dance** (with music and drama) is the **Sangeet Natak Akademi**. The **Lalit Kala Akademi** is for the **fine arts**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfiin-indices",
      name: "Global indices and who publishes them",
      intuition:
        "An index question names the index and offers four bodies. The publisher is usually the body whose own field the index measures: a UN agency for its field, a university centre for research data, the World Economic Forum for broad economic themes.",
      definition:
        "The publishers:\n" +
        "- **Corruption Perceptions Index**: **Transparency International**, a civil society organisation based in **Berlin**.\n" +
        "- **Environmental Performance Index**: **Yale** and **Columbia** universities.\n" +
        "- **Energy Transition Index** and **Global Gender Gap Index**: the **World Economic Forum**.\n" +
        "- **Human Development Index**: the **UNDP**.\n" +
        "- **Global Innovation Index**: **WIPO**, the World Intellectual Property Organization.\n" +
        "- **World Press Freedom Index**: **Reporters Without Borders**.",
      table: {
        columns: ["Index", "Published by"],
        rows: [
          { cells: ["Corruption Perceptions Index", "Transparency International"] },
          { cells: ["Environmental Performance Index", "Yale and Columbia universities"] },
          { cells: ["Energy Transition Index", "World Economic Forum"] },
          { cells: ["Global Gender Gap Index", "World Economic Forum"] },
          { cells: ["Human Development Index", "UNDP"] },
          { cells: ["Global Innovation Index", "WIPO"] },
          { cells: ["World Press Freedom Index", "Reporters Without Borders"] },
        ],
      },
      pyqExampleId: "5e618ecf-e515-4129-8351-7394c90a3c86",
      selfCheckExample: {
        prompt: "Which body publishes both the Global Gender Gap Index and the Energy Transition Index?",
        steps: ["Both measure broad economic themes across countries.", "Both come from the World Economic Forum."],
        answer: "The World Economic Forum.",
      },
      practiceSet: [
        { prompt: "Which organisation publishes the Corruption Perceptions Index?", answer: "Transparency International" },
        { prompt: "Which UN body publishes the Human Development Index?", answer: "The UNDP" },
        { prompt: "Which organisation publishes the Global Innovation Index?", answer: "WIPO" },
        { prompt: "Which organisation publishes the World Press Freedom Index?", answer: "Reporters Without Borders" },
      ],
      traps: [
        {
          title: "The corruption index is not the World Bank's",
          body: "The **Corruption Perceptions Index** comes from **Transparency International**, a civil society body, not from the World Bank, the OECD or a UN office.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsfiin-quad",
      name: "The Quad",
      intuition:
        "The Quad is four democracies around the Indo-Pacific. SSC asks its members, its region, when it was proposed and when it came back.",
      definition:
        "The facts:\n" +
        "- The **Quadrilateral Security Dialogue (Quad)** has four members: **India, the USA, Japan and Australia**.\n" +
        "- It was first proposed in **2007** by Japanese Prime Minister **Shinzo Abe**, lapsed, and was **revived in 2017**. In 2004 the four had only worked together on tsunami relief.\n" +
        "- Its focus is a free and open **Indo-Pacific**.\n" +
        "- Of the four, the **USA** has by far the largest economy.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Members", "India, the USA, Japan, Australia"] },
          { cells: ["Region of focus", "Indo-Pacific"] },
          { cells: ["Who proposed it", "Shinzo Abe, Prime Minister of Japan"] },
          { cells: ["Revived", "2017"] },
          { cells: ["Largest economy among members", "USA"] },
        ],
      },
      pyqExampleId: "c60325cb-089d-4521-a536-cb81ac39e358",
      selfCheckExample: {
        prompt: "Name the four members of the Quad.",
        steps: ["The Quad is four democracies around the Indo-Pacific: one in South Asia, one in East Asia, one in North America and one in Oceania."],
        answer: "India, the USA, Japan and Australia.",
      },
      practiceSet: [
        { prompt: "Which region is the Quad's main focus?", answer: "The Indo-Pacific" },
        { prompt: "Which Japanese Prime Minister first proposed the Quad?", answer: "Shinzo Abe" },
        { prompt: "In which year was the Quad revived?", answer: "2017" },
        { prompt: "Which Quad member has the largest economy?", answer: "The USA" },
      ],
      traps: [
        {
          title: "2017 is the revival, not the start",
          body: "The Quad was first proposed in **2007**; **2017** is the year it was **revived**.",
        },
      ],
    },
  ],
};
