import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FR_LOCAL_NOTE: SubtopicNote = {
  subtopicName: "Panchayati Raj and Local Government",
  title: "Panchayati Raj and Local Government",
  oneLineDefinition:
    "Government closest to the people: the three tiers of Panchayati Raj, the Gram Sabha, the officials who run a village, the city's local bodies, and why power is passed down to them.",
  whyItMatters:
    "Seven questions in the bank, all EASY, from the LWS mock tests. Each asks for one name: the middle tier, who sits in the Gram Sabha, who gets one-third of the seats, who keeps the land records, who helps the panchayat with its work. The options mix bodies from different levels, so the order of the tiers is the thing to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spifrlo-panchayat",
      name: "The three tiers and the people who run a village",
      intuition:
        "Panchayati Raj is local self-government in villages, built in three tiers like steps: village, block and district. " +
        "Below the elected bodies sit the voters of the village, and beside them a few government officials who keep records.",
      definition:
        "- The **73rd Amendment (1992)** gave Panchayati Raj a place in the Constitution, with elections every five years.\n" +
        "- The three tiers: **Gram Panchayat** (village), **Panchayat Samiti** (block, the **middle tier**) and **Zila Parishad** (district).\n" +
        "- The **Gram Sabha** is **all the adult voters** of the village. It is not a tier: it elects the Gram Panchayat and checks its work.\n" +
        "- The Gram Panchayat is headed by the **Sarpanch**. A **Panchayat Secretary**, appointed by the government, calls its meetings and keeps its records.\n" +
        "- At least **one-third of the seats** are reserved for **women**. Seats for Scheduled Castes and Scheduled Tribes are reserved in proportion to their population.\n" +
        "- The **Patwari** measures land and keeps the **land records** of a group of villages. The **Tehsildar** supervises the Patwaris.",
      table: {
        columns: ["Body or officer", "Level", "Role"],
        rows: [
          { cells: ["Gram Sabha", "Village", "**All adult voters**; elects and checks the Gram Panchayat"] },
          { cells: ["Gram Panchayat", "Village (lowest tier)", "Elected panches headed by the Sarpanch"] },
          { cells: ["Panchayat Samiti", "Block (**middle tier**)", "Links the villages and the district"] },
          { cells: ["Zila Parishad", "District (top tier)", "Plans for the whole district"] },
          { cells: ["Panchayat Secretary", "Village", "Appointed by the government; **assists the Gram Panchayat**, keeps records"] },
          { cells: ["Patwari", "Group of villages", "Keeps the **land records**"] },
          { cells: ["Tehsildar", "Tehsil", "Supervises the Patwaris"] },
        ],
        caption: "The 73rd Amendment (1992) reserves at least one-third of panchayat seats for women.",
      },
      selfCheckExample: {
        prompt: "Which panchayat body works at the district level?",
        steps: ["The tiers run village, block, district.", "The district tier is the Zila Parishad."],
        answer: "The Zila Parishad",
      },
      practiceSet: [
        { prompt: "Who heads a Gram Panchayat?", answer: "The Sarpanch" },
        { prompt: "Which officer keeps the land records of a group of villages?", answer: "The Patwari" },
        { prompt: "Which Amendment gave Panchayati Raj a place in the Constitution?", answer: "The 73rd Amendment (1992)" },
        { prompt: "What share of seats in Panchayati Raj bodies is reserved for women?", answer: "At least one-third" },
        { prompt: "Who are the members of the Gram Sabha?", answer: "All the adult voters of the village" },
        { prompt: "Which officer supervises the Patwaris?", answer: "The Tehsildar" },
      ],
      pyqExampleId: "0d2864e5-ee89-49ee-b970-3730468ee671",
      traps: [
        {
          title: "The Gram Sabha is not a tier",
          body:
            "The three tiers are Gram Panchayat, Panchayat Samiti and Zila Parishad. The Gram Sabha is the meeting of all village voters, so it is never the answer for a tier.",
        },
        {
          title: "One-third is for women",
          body:
            "Women get at least one-third of the seats. Scheduled Castes and Scheduled Tribes get seats in proportion to their population, which is a different rule.",
        },
        {
          title: "The Secretary, not the Collector",
          body:
            "The Panchayat Secretary helps the Gram Panchayat with its day-to-day work. The Collector heads a whole district, and an MLA sits in the state assembly.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spifrlo-democracy",
      name: "Decentralisation and taking part in local decisions",
      intuition:
        "Local problems are best known to local people. So in a democracy some power is passed down from the centre and the states to village and city bodies, and citizens are asked to take part in their decisions.",
      definition:
        "- **Decentralisation** means taking power from the central and state governments and giving it to **local government**.\n" +
        "- It lets people decide matters of their own area and solve local problems locally. Rule by one person or group (**dictatorship, monarchy, authoritarian rule**) is the opposite.\n" +
        "- **Participatory democracy** means citizens take part directly, not only by voting: in a village through the **Gram Sabha**, in a city through **ward meetings** and ward committees.\n" +
        "- In cities the local bodies are the **Municipal Corporation** (big cities, headed by a Mayor), the **Municipal Council** (smaller towns) and the **Nagar Panchayat**. The **74th Amendment (1992)** gave them a place in the Constitution.",
      table: {
        columns: ["Idea or body", "Meaning"],
        rows: [
          { cells: ["Decentralisation", "Power passed down to **local government**"] },
          { cells: ["Participatory democracy", "Citizens take part directly, as in **ward meetings**"] },
          { cells: ["Municipal Corporation", "Local body of a big city; headed by the Mayor"] },
          { cells: ["Municipal Council", "Local body of a smaller town"] },
          { cells: ["74th Amendment (1992)", "Gave city local bodies a place in the Constitution"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which Amendment gave city local bodies such as municipalities a place in the Constitution?",
        steps: ["The 73rd Amendment was for villages.", "The 74th Amendment, in the same year, was for towns and cities."],
        answer: "The 74th Amendment (1992)",
      },
      practiceSet: [
        { prompt: "What is decentralisation?", answer: "Taking power from the central and state governments and giving it to local government" },
        { prompt: "Who heads a Municipal Corporation?", answer: "The Mayor" },
        { prompt: "Which local body governs a big city?", answer: "The Municipal Corporation" },
        { prompt: "In participatory democracy, how do villagers take part directly in decisions?", answer: "Through the Gram Sabha" },
      ],
      pyqExampleId: "045ae1a0-c712-4788-bd71-da73cdaba2b5",
      traps: [
        {
          title: "Voting alone is not participation",
          body:
            "Participatory democracy asks more than a vote every five years. Citizens attending ward meetings or the Gram Sabha and speaking for their needs is the picture of it.",
        },
        {
          title: "73rd for villages, 74th for cities",
          body:
            "Both Amendments came in 1992. The 73rd is Panchayati Raj in villages; the 74th is municipalities in towns and cities.",
        },
      ],
    },
  ],
};
