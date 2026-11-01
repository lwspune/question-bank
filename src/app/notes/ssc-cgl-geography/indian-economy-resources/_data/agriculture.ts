import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIE_AGRICULTURE_NOTE: SubtopicNote = {
  subtopicName: "Agriculture and the Green Revolution",
  title: "Agriculture and the Green Revolution",
  oneLineDefinition:
    "India's three cropping seasons with their crops, the States that lead in a crop, the Green Revolution with its people and its side effects, and the planning programmes for farmers and dry areas.",
  whyItMatters:
    "Eighteen questions in the bank: seven from the 2023 shifts and 11 from the 2024 shifts, 13 of them EASY. The commonest is 'which crop is NOT grown in this season', so learn the three seasons with two or three crops each before anything else.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgieag-crops",
      name: "Seasons, crops and leading States",
      intuition:
        "Indian farming follows the monsoon. Crops sown with the rains are kharif, crops sown for the winter are rabi, and a short summer season in between grows fruit and vegetables. Place a crop in its season and most questions answer themselves.",
      definition:
        "The three seasons:\n" +
        "- **Kharif** (sown with the monsoon, June to October): **rice (paddy)**, cotton, maize, jowar, bajra, soyabean.\n" +
        "- **Rabi** (sown in winter, harvested in spring): **wheat**, mustard, gram, barley.\n" +
        "- **Zaid** (the short summer, March to June): **watermelon, muskmelon, cucumber**, vegetables and fodder.\n\n" +
        "**West Bengal** grows **three rice crops** a year: aus, aman and boro.\n\n" +
        "Leading States and places:\n" +
        "- **Pulses**: Madhya Pradesh. **Grapes**: Maharashtra (Nashik). **Tea**: Assam, then West Bengal.\n" +
        "- **Coffee** first came to India on the **Baba Budan Hills** in Karnataka.\n" +
        "- **Tamil Nadu** is divided into **seven** agro-climatic zones.",
      table: {
        columns: ["Season", "When", "Crops"],
        rows: [
          { cells: ["Kharif", "With the monsoon", "Rice, cotton, maize, soyabean"] },
          { cells: ["Rabi", "Winter", "Wheat, mustard, gram, barley"] },
          { cells: ["Zaid", "March to June", "Watermelon, muskmelon, cucumber"], pyqExampleId: "46c35eaa-44cf-4cec-a540-5f3f47fd15c5" },
        ],
      },
      pyqExampleId: "fb8c4772-798e-4b71-bf7e-1858e386dc04",
      selfCheckExample: {
        prompt: "Which of these is the odd one out: watermelon, cucumber, rice, muskmelon? Say why.",
        steps: ["Watermelon, cucumber and muskmelon are zaid crops of the short summer season.", "Rice is a kharif crop, sown with the monsoon."],
        answer: "Rice, a kharif crop among zaid crops.",
      },
      practiceSet: [
        { prompt: "Which State is the largest producer of pulses?", answer: "Madhya Pradesh" },
        { prompt: "On which hills was coffee first grown in India?", answer: "The Baba Budan Hills, Karnataka" },
        { prompt: "Name West Bengal's three rice crops.", answer: "Aus, aman and boro" },
        { prompt: "Which State leads India in tea?", answer: "Assam" },
      ],
      traps: [
        {
          title: "Wheat is rabi",
          body: "**Wheat** is the main **rabi** crop. Cotton, paddy and soyabean are **kharif**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgieag-green",
      name: "The Green Revolution and land",
      intuition:
        "From the mid-1960s new high-yielding seeds, irrigation and fertilisers multiplied harvests, but only for two crops in a few regions, and they wore out the soil and water. SSC asks where, which crops, who, and the damage.",
      definition:
        "The Green Revolution:\n" +
        "- Its **first phase** (mid-1960s to mid-1970s) was limited to **wheat and rice** in irrigated areas, above all **Punjab**, Haryana and western Uttar Pradesh.\n" +
        "- The **Indian Agricultural Research Institute** (the Pusa Institute) is in **New Delhi**. **Dr D. S. Athwal**, who bred dwarf wheat, is called the father of the **Wheat Revolution**.\n" +
        "- Its harms: a falling **groundwater table**, **soil degradation** from chemicals and over-irrigation, and **higher input costs**.\n\n" +
        "Land degradation elsewhere: in **Jharkhand and Chhattisgarh** the main cause is **deforestation by mining**.\n\n" +
        "Planning approaches:\n" +
        "- **Target area**: programmes for a kind of land, such as Command Area Development, Drought Prone Areas and Hill Areas.\n" +
        "- **Target group**: programmes for a kind of people, such as the Small and **Marginal Farmers** Development Agencies.\n" +
        "- **Neeru-Meeru** ('water and you') built water-harvesting works in **Andhra Pradesh**.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Crops of the first phase", "Wheat and rice"], pyqExampleId: "9fc10a98-f3b1-48a7-b86e-154cdac11c21" },
          { cells: ["State most transformed", "Punjab"] },
          { cells: ["Father of the Wheat Revolution", "D. S. Athwal"], pyqExampleId: "8353ed53-4ac7-4068-bd4b-abe00c631248" },
          { cells: ["Indian Agricultural Research Institute", "New Delhi"], pyqExampleId: "2155c5c1-c5a4-4b9b-ae17-01cdc64490c0" },
          { cells: ["Neeru-Meeru programme", "Andhra Pradesh"], pyqExampleId: "b25e1e08-3e19-4f90-85c8-a393880f2031" },
        ],
      },
      pyqExampleId: "a1b58623-8ee8-47e8-b558-ae5d2aab690c",
      selfCheckExample: {
        prompt: "Name three harms of the Green Revolution.",
        steps: ["Tube-well irrigation lowered the groundwater table.", "Heavy fertiliser and over-irrigation degraded the soil, and seeds, fertiliser and pesticide raised costs."],
        answer: "Falling groundwater, soil degradation and higher input costs.",
      },
      practiceSet: [
        { prompt: "Which two crops did the first phase of the Green Revolution cover?", answer: "Wheat and rice" },
        { prompt: "What is the main cause of land degradation in Jharkhand and Chhattisgarh?", answer: "Deforestation due to mining" },
        { prompt: "Is the Marginal Farmers Development Agency a target-group or target-area programme?", answer: "Target group" },
        { prompt: "Where is the Indian Agricultural Research Institute?", answer: "New Delhi" },
      ],
      traps: [
        {
          title: "Target group means people, target area means land",
          body: "The **Marginal Farmers** agency serves a group of **people**. The Drought Prone Areas and Hill Areas programmes serve kinds of **land**.",
        },
      ],
    },
  ],
};
