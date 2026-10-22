import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_ISLANDS_NOTE: SubtopicNote = {
  subtopicName: "Islands and Sea Channels",
  title: "Islands and Sea Channels",
  oneLineDefinition:
    "The Andaman and Nicobar Islands and Lakshadweep: the sea channels between them, their peaks and the tribes who live there.",
  whyItMatters:
    "Nine CDS questions from 2018 to 2026, 4 EASY and 5 MODERATE, none HARD. The Ten Degree Channel alone has been asked three times, so these are some of the surest marks in the chapter.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-channels",
      name: "Sea channels and straits",
      intuition:
        "Several channels are named after the line of latitude they follow. The Ten Degree Channel runs along 10°N and cuts the Andaman group off from the Nicobar group. The Eight and Nine Degree Channels lie on the other side of India, in the Arabian Sea, around Minicoy.",
      definition:
        "Two seas, two island groups:\n" +
        "- In the **Bay of Bengal**: the **Ten Degree Channel** separates the **Andaman** group from the **Nicobar** group.\n" +
        "- In the **Arabian Sea**: the **Nine Degree Channel** separates **Minicoy** from the rest of Lakshadweep, and the **Eight Degree Channel** separates Minicoy from the **Maldives**.\n" +
        "- The **Palk Strait** separates Tamil Nadu from Sri Lanka.",
      table: {
        columns: ["Channel", "What it separates"],
        rows: [
          {
            cells: ["Ten Degree Channel", "Little Andaman (Andaman group) from Car Nicobar (Nicobar group)"],
            noteAmber: "CDS 2019 (I) and 2021 (I): the 10°N line is the answer for Andaman versus Nicobar.",
            pyqExampleId: "ce63789f-a04a-4609-a48a-483ddb2c7275",
          },
          { cells: ["Duncan Passage", "South Andaman from Little Andaman"] },
          { cells: ["Coco Channel", "North Andaman from the Coco Islands of Myanmar"] },
          { cells: ["Great Channel", "Great Nicobar from Sumatra (Indonesia)"] },
          { cells: ["Nine Degree Channel", "Minicoy from the main Lakshadweep islands"] },
          {
            cells: ["Eight Degree Channel", "Minicoy (Lakshadweep) from the Maldives"],
            noteAmber: "CDS 2018 (II): Lakshadweep from Maldives, not Andaman from Nicobar.",
            pyqExampleId: "63dbd88d-e35c-4c0c-b9f3-43a3b634f5f6",
          },
          { cells: ["Palk Strait", "Tamil Nadu from Sri Lanka"] },
        ],
      },
      pyqExampleId: "41d1f3dc-d92c-4b51-ae66-f22cee169626",
      selfCheckExample: {
        prompt: "Of the Eight, Nine and Ten Degree Channels, which lie in the Arabian Sea and which in the Bay of Bengal?",
        steps: [
          "The Eight and Nine Degree Channels are both around Minicoy, the southern island of Lakshadweep.",
          "Lakshadweep is in the Arabian Sea.",
          "The Ten Degree Channel lies between the Andaman and Nicobar groups, in the Bay of Bengal.",
        ],
        answer: "Eight and Nine Degree: Arabian Sea. Ten Degree: Bay of Bengal.",
      },
      practiceSet: [
        { prompt: "Which channel separates Minicoy from the Maldives?", answer: "The Eight Degree Channel" },
        { prompt: "Which strait separates Tamil Nadu from Sri Lanka?", answer: "The Palk Strait" },
        { prompt: "Which passage separates South Andaman from Little Andaman?", answer: "The Duncan Passage" },
        { prompt: "Which channel separates Great Nicobar from Sumatra?", answer: "The Great Channel" },
      ],
      traps: [
        {
          title: "Ten Degree is Andaman and Nicobar",
          body: "The **Ten Degree Channel** is in the Bay of Bengal, between Little Andaman and Car Nicobar. The Eight and Nine Degree Channels belong to **Lakshadweep** in the Arabian Sea.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-island-groups",
      name: "Andaman, Nicobar and Lakshadweep",
      intuition:
        "India's islands come in two very different sets. The Andaman and Nicobar Islands in the Bay of Bengal are the tops of a drowned mountain range, so they are hilly and have peaks. Lakshadweep in the Arabian Sea is made of coral, so its islands are small and flat.",
      definition:
        "Key facts:\n" +
        "- **Andaman group** (north): highest point **Saddle Peak** in North Andaman; **Mount Diavolo** in Middle Andaman; **Port Blair** in South Andaman.\n" +
        "- **Nicobar group** (south): **Mount Thuillier** (642 m) on Great Nicobar. **Indira Point**, India's southern tip, is also on Great Nicobar.\n" +
        "- **Barren Island** in the Andaman Sea is India's only active volcano.\n" +
        "- **Lakshadweep**: coral islands, capital **Kavaratti**, total area about **32 sq km**, the smallest Union Territory.",
      table: {
        columns: ["Island group", "Facts to remember"],
        rows: [
          {
            cells: ["Andaman group", "Saddle Peak (North Andaman), Mount Diavolo (Middle Andaman), Port Blair (South Andaman)"],
            noteAmber: "CDS 2022 (II): Lhotse is a Himalayan peak next to Everest, not an island peak.",
            pyqExampleId: "e5085c76-af4b-451f-a26d-075207a77848",
          },
          { cells: ["Nicobar group", "Mount Thuillier and Indira Point, both on Great Nicobar"] },
          { cells: ["Barren Island", "India's only active volcano, in the Andaman Sea"] },
          {
            cells: ["Lakshadweep", "Coral islands; capital Kavaratti; about 32 sq km, the smallest UT"],
            noteAmber: "CDS 2020 (II): smaller than Chandigarh, Puducherry and Dadra and Nagar Haveli and Daman and Diu.",
            pyqExampleId: "437041dd-4db2-439e-8afa-8c3b78bcc7b2",
          },
        ],
      },
      pyqExampleId: "d57230a4-c4c9-4caf-abec-c10116fa40ac",
      selfCheckExample: {
        prompt: "Which Union Territory is the smallest by area: Lakshadweep, Chandigarh or Puducherry? Say why.",
        steps: [
          "Lakshadweep is a set of small coral islands; together they cover about 32 sq km.",
          "Chandigarh covers about 114 sq km and Puducherry about 490 sq km.",
        ],
        answer: "Lakshadweep, at about 32 sq km.",
      },
      practiceSet: [
        { prompt: "What is the highest peak of the Andaman Islands?", answer: "Saddle Peak, in North Andaman" },
        { prompt: "Which is India's only active volcano?", answer: "Barren Island" },
        { prompt: "What is the capital of Lakshadweep?", answer: "Kavaratti" },
        { prompt: "What are the Lakshadweep islands made of?", answer: "Coral" },
      ],
      traps: [
        {
          title: "Lakshadweep is coral, the Andamans are hills",
          body: "The Andaman and Nicobar Islands are a **drowned mountain range** with peaks over 600 m. Lakshadweep is **coral** and flat. A question about a peak is always about the Andaman and Nicobar Islands.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-island-tribes",
      name: "Tribes of the Andaman and Nicobar Islands",
      intuition:
        "Five small, ancient tribes of the islands are listed as particularly vulnerable tribal groups. Four live in the Andamans and one, the Shompen, in the forest of Great Nicobar. Tie each tribe to its island.",
      definition:
        "The five vulnerable groups:\n" +
        "- **Great Andamanese**: Strait Island.\n" +
        "- **Onge**: Little Andaman.\n" +
        "- **Jarawa**: western coast of South and Middle Andaman.\n" +
        "- **Sentinelese**: North Sentinel Island.\n" +
        "- **Shompen**: interior of Great Nicobar.\n" +
        "The **Nyishi** are not island people: they are the largest tribe of Arunachal Pradesh.",
      table: {
        columns: ["Tribe", "Island"],
        rows: [
          { cells: ["Great Andamanese", "Strait Island"] },
          { cells: ["Onge", "Little Andaman"] },
          { cells: ["Jarawa", "South and Middle Andaman (west coast)"] },
          { cells: ["Sentinelese", "North Sentinel Island"] },
          {
            cells: ["Shompen", "Great Nicobar (interior forest)"],
            noteAmber: "CDS 2019 (I): the Shompen belong to the Andaman and Nicobar Islands, not Jharkhand or Odisha.",
            pyqExampleId: "ce830696-3c39-4c44-919a-79a620fd889f",
          },
        ],
      },
      pyqExampleId: "8cb8b4d7-ad1e-46a6-9f46-b0f1aa64f67b",
      selfCheckExample: {
        prompt: "Which one of these is NOT a tribe of the Andaman and Nicobar Islands: Shompen, Onge, Nyishi, Jarawa?",
        steps: [
          "Shompen live on Great Nicobar, Onge on Little Andaman and Jarawa on South and Middle Andaman.",
          "The Nyishi live in Arunachal Pradesh.",
        ],
        answer: "Nyishi.",
      },
      practiceSet: [
        { prompt: "On which island do the Onge live?", answer: "Little Andaman" },
        { prompt: "Which tribe lives in the interior forest of Great Nicobar?", answer: "The Shompen" },
        { prompt: "On which island do the Sentinelese live?", answer: "North Sentinel Island" },
      ],
      traps: [
        {
          title: "The Shompen are the one Nicobar tribe",
          body: "Four of the five vulnerable island tribes live in the **Andamans**. The **Shompen** are the one that lives in the **Nicobar** group, on Great Nicobar.",
        },
      ],
    },
  ],
};
