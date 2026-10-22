import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_CLIMATE_NOTE: SubtopicNote = {
  subtopicName: "Monsoon and Rainfall",
  title: "Monsoon and Rainfall",
  oneLineDefinition:
    "Why one side of a mountain is wet and the other dry, how the two branches of the monsoon and the retreating monsoon share out the rain, and where India is coldest and driest.",
  whyItMatters:
    "Seven CDS questions from 2017 to 2021: 1 EASY, 5 MODERATE, 1 HARD. Each one turns on a single idea, the rain shadow or the path of a monsoon branch, so one clear picture answers them all.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-rain-shadow",
      name: "Windward and leeward: the rain shadow",
      intuition:
        "Wet monsoon wind rises when it meets a mountain, cools, and drops its rain on the side facing it (the windward side). By the time it crosses the top it is dry, so the far side (the leeward side) gets little rain. That dry far side is the rain shadow.",
      definition:
        "Examples in India:\n" +
        "- **Western Ghats**: the coast (Mumbai, Mangaluru) is **windward** and very wet; the plateau east of the Ghats (Pune, Bengaluru, interior Maharashtra) is **leeward** and much drier.\n" +
        "- **Great Himalaya**: **Leh** in Ladakh lies in its rain shadow and is a cold desert with about 100 mm of rain a year, less than Jodhpur in the Thar.\n" +
        "- **Khasi hills**: **Mawsynram** and Cherrapunji, on the windward slope, are the wettest places in India.",
      table: {
        columns: ["Place", "Side", "Rain"],
        rows: [
          { cells: ["Mumbai, Mangaluru", "Windward of the Western Ghats", "Very heavy"] },
          { cells: ["Pune, Bengaluru", "Leeward of the Western Ghats", "Low"] },
          {
            cells: ["Interior Maharashtra", "Rain shadow of the Western Ghats", "Low in the monsoon"],
            noteAmber: "CDS 2017 (II): both statements true, and the rain shadow explains the low rain.",
            pyqExampleId: "411c29f2-b169-4e5a-bdfe-e6d661482579",
          },
          {
            cells: ["Leh", "Rain shadow of the Great Himalaya", "About 100 mm a year, the least"],
            noteAmber: "CDS 2020 (II): Leh gets less than Jodhpur, New Delhi or Bengaluru.",
            pyqExampleId: "aa359d0a-23e1-40d9-8f1a-0fa099cc9bbb",
          },
          { cells: ["Mawsynram, Cherrapunji", "Windward of the Khasi hills", "The heaviest in India"] },
        ],
      },
      pyqExampleId: "ef1fcdf9-2419-41e0-b312-72091c20b8d4",
      selfCheckExample: {
        prompt: "Mumbai and Pune are only about 120 km apart, yet Mumbai gets several times more monsoon rain. Why?",
        steps: [
          "The south-west monsoon blows in from the Arabian Sea and meets the Western Ghats.",
          "Mumbai, on the coast, is on the windward side, where the rising air drops its rain.",
          "Pune is east of the Ghats, on the leeward side, in the rain shadow.",
        ],
        answer: "Mumbai is windward of the Western Ghats; Pune lies in their rain shadow.",
      },
      practiceSet: [
        { prompt: "Which gets less rain in a year: Leh or Jodhpur?", answer: "Leh" },
        { prompt: "Which is the wettest place in India?", answer: "Mawsynram, in the Khasi hills of Meghalaya" },
        { prompt: "On which side of a mountain is the rain shadow: windward or leeward?", answer: "Leeward" },
        { prompt: "Why is interior Maharashtra dry in the monsoon?", answer: "It lies in the rain shadow of the Western Ghats" },
      ],
      traps: [
        {
          title: "The coast is windward",
          body: "Places on the west coast, such as **Mangaluru**, face the monsoon and are **windward**. The leeward, rain-shadow places are **east** of the Ghats, such as Pune and Bengaluru.",
        },
        {
          title: "Leh, not the Thar, is the driest",
          body: "The Thar is dry, but **Leh** in the rain shadow of the Himalaya gets even less: about 100 mm a year against roughly 350 mm at Jodhpur.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-monsoon",
      name: "Monsoon branches and the retreating monsoon",
      intuition:
        "The south-west monsoon splits around the peninsula into two branches. One crosses the Arabian Sea and hits the Western Ghats; the other crosses the Bay of Bengal, hits the north-east and turns west up the Ganga plain. In autumn the winds turn round, and the Tamil Nadu coast, dry all summer, gets its rain.",
      definition:
        "The pattern:\n" +
        "- The monsoon reaches **Kerala** around **1 June**.\n" +
        "- **Arabian Sea branch**: the west coast and the Western Ghats, then on to central and north-west India.\n" +
        "- **Bay of Bengal branch**: Bengal and the north-east; the Himalaya turn it **west** along the Ganga plain.\n" +
        "- The two branches **meet over north-west India**, so **Punjab** and Haryana get rain from both.\n" +
        "- **Retreating (north-east) monsoon**, October to December: picks up moisture over the Bay of Bengal and gives the **Coromandel coast of Tamil Nadu** most of its yearly rain.\n" +
        "- **Western disturbances**: winter rain in Punjab and Haryana, good for the wheat crop.",
      table: {
        columns: ["Wind", "Who gets the rain"],
        rows: [
          { cells: ["Arabian Sea branch", "West coast, Western Ghats, then central and north-west India"] },
          { cells: ["Bay of Bengal branch", "Bengal, the north-east, then west up the Ganga plain"] },
          {
            cells: ["Both branches together", "North-west India, such as Punjab"],
            noteAmber: "CDS 2021 (II): Punjab, not Maharashtra, Meghalaya or Tamil Nadu.",
            pyqExampleId: "5cb7d7c4-d023-4e14-90d9-a60a6dd7e094",
          },
          { cells: ["Retreating (north-east) monsoon", "Coromandel coast of Tamil Nadu, October to December"] },
          { cells: ["Western disturbances", "Punjab and Haryana in winter"] },
        ],
      },
      pyqExampleId: "9086d685-8f4c-4b8d-bcc9-2c37ac4c3025",
      selfCheckExample: {
        prompt: "After hitting the hills of the north-east, the Bay of Bengal branch of the monsoon turns west. What makes it turn, and which plain does it follow?",
        steps: [
          "The wind cannot cross the high wall of the Himalaya.",
          "It is turned along the foot of the mountains, towards the west.",
        ],
        answer: "The Himalaya block it, so it is turned west along the Ganga plain.",
      },
      practiceSet: [
        { prompt: "Which branch of the monsoon reaches Kerala first?", answer: "The Arabian Sea branch" },
        { prompt: "Around what date does the monsoon reach Kerala?", answer: "Around 1 June" },
        { prompt: "What brings winter rain to Punjab?", answer: "Western disturbances" },
        { prompt: "Over which part of India do the two monsoon branches meet?", answer: "North-west India, around Punjab" },
      ],
      traps: [
        {
          title: "Tamil Nadu's rain comes late",
          body: "The **Coromandel coast** lies in the rain shadow during the south-west monsoon. It gets most of its rain from the **retreating north-east monsoon**, October to December.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-temperature-drought",
      name: "Winter temperature and drought",
      intuition:
        "In January the north of India is cold and the south stays warm, because the south is closer to the equator and surrounded by sea. Drought hits where rain is low and unreliable: the dry west, not the wet plains or the north-east.",
      definition:
        "Two facts:\n" +
        "- In **January**, the **20°C isotherm** runs roughly along the **Tropic of Cancer** and splits India into a cooler north and a warmer south of about equal size.\n" +
        "- The most **drought-prone** areas are the dry west: **Kachchh** in Gujarat and western Rajasthan (west of the Aravalli). The Ganga plains, coastal Andhra Pradesh and the north-east get dependable rain.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          {
            cells: ["January isotherm that halves India", "20°C, near the Tropic of Cancer"],
            pyqExampleId: "a070ab4e-ade0-4144-b037-4e8ff4fbe628",
          },
          { cells: ["Most drought-prone regions", "Kachchh and western Rajasthan"] },
          { cells: ["Regions with dependable rain", "Ganga plains, coastal Andhra Pradesh, the north-east"] },
        ],
      },
      pyqExampleId: "b03062a8-c154-4c54-b4f7-a515c37dcd71",
      selfCheckExample: {
        prompt: "Why is the north-east of India hardly ever on a list of drought-prone regions?",
        steps: [
          "Drought comes from low and unreliable rain.",
          "The north-east gets heavy rain from the Bay of Bengal branch every year.",
        ],
        answer: "Its rainfall is heavy and dependable.",
      },
      practiceSet: [
        { prompt: "In January, is north India warmer or cooler than the south?", answer: "Cooler" },
        { prompt: "Which line of latitude does the 20°C January isotherm roughly follow?", answer: "The Tropic of Cancer" },
        { prompt: "Which part of Rajasthan is most drought-prone?", answer: "The west, beyond the Aravalli" },
      ],
      traps: [
        {
          title: "20°C, not 15°C or 25°C",
          body: "The January isotherm that cuts India into two near-equal halves is **20°C**, and it runs close to the **Tropic of Cancer**.",
        },
      ],
    },
  ],
};
