import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_RIVERS_NOTE: SubtopicNote = {
  subtopicName: "River Systems",
  title: "River Systems",
  oneLineDefinition:
    "The Indus, Ganga and Brahmaputra systems with their tributaries and projects, and the rivers of the peninsula with how they differ from Himalayan rivers.",
  whyItMatters:
    "Twenty CDS questions from 2016 to 2026, the biggest page of the chapter: 3 EASY, 12 MODERATE, 5 HARD, and nine of them since 2023. The favourite shape is a tributary question: which river joins which, and in what order.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-indus",
      name: "The Indus system",
      intuition:
        "The Indus rises in Tibet, crosses Ladakh and flows into Pakistan. Five rivers of Punjab feed it from the east. Learn them from west to east, Jhelum, Chenab, Ravi, Beas, Satluj, and hang each dam on its river.",
      definition:
        "The system:\n" +
        "- The **Indus** rises in Tibet near Lake Mansarovar and flows through **Ladakh** into Pakistan.\n" +
        "- Its five eastern tributaries, west to east: **Jhelum, Chenab, Ravi, Beas, Satluj**.\n" +
        "- The **Satluj** enters India at Shipki La; the **Bhakra Nangal** dam stands on it.\n" +
        "- The **Chenab** carries the **Salal** project at Reasi in Jammu and Kashmir.\n" +
        "- From the north the Indus gets the **Gilgit** and **Hunza** (Karakoram); in Ladakh the **Zaskar** joins it.\n" +
        "- From the west, the **Gomal**, Kurram and Kabul come from the Afghan hills (the Sulaiman range), not from the Himalaya.\n" +
        "- In India the Indus basin covers Ladakh, Jammu and Kashmir, Himachal Pradesh, Punjab, Haryana and Rajasthan.",
      table: {
        columns: ["River", "What to remember"],
        rows: [
          { cells: ["Jhelum", "Flows through Wular lake in the Kashmir valley"] },
          {
            cells: ["Chenab", "Salal project at Reasi"],
            noteAmber: "CDS 2025 (I): Salal is on the Chenab, not the Jhelum, Nubra or Shyok.",
            pyqExampleId: "ee919364-5e1c-44c8-bfde-95d888e5ca36",
          },
          { cells: ["Ravi", "The middle one of the five Punjab rivers"] },
          { cells: ["Beas", "Joins the Satluj at Harike"] },
          { cells: ["Satluj", "Easternmost; enters at Shipki La; Bhakra Nangal dam"] },
          {
            cells: ["Gomal", "Rises in the Sulaiman range on the Afghan border, not in the Himalaya"],
            noteAmber: "CDS 2025 (I): the odd one out against the Gilgit, Hunza and Zaskar.",
            pyqExampleId: "afee6cf8-ec13-4064-8583-ec41ba53413e",
          },
          {
            cells: ["Indus basin in India", "Ladakh, Jammu and Kashmir, Himachal Pradesh, Punjab, Haryana, Rajasthan"],
            pyqExampleId: "a311cc03-fc83-4545-b394-04131bb2bb3f",
          },
        ],
      },
      pyqExampleId: "e7b5bba1-e2f5-4540-8226-abccddc1ad95",
      selfCheckExample: {
        prompt: "Name the five Punjab rivers of the Indus system in order from west to east.",
        steps: [
          "The westernmost flows through Kashmir: the Jhelum.",
          "Then the Chenab and the Ravi.",
          "The Beas joins the Satluj, which is the easternmost.",
        ],
        answer: "Jhelum, Chenab, Ravi, Beas, Satluj.",
      },
      practiceSet: [
        { prompt: "Which tributary of the Indus flows through Wular lake?", answer: "The Jhelum" },
        { prompt: "Where does the Beas join the Satluj?", answer: "At Harike" },
        { prompt: "From which mountains does the Gomal river come?", answer: "The Sulaiman range on the Afghan border" },
        { prompt: "Through which Indian Union Territory does the main Indus river flow?", answer: "Ladakh" },
      ],
      traps: [
        {
          title: "Bhakra is on the Satluj, Salal on the Chenab",
          body: "**Bhakra Nangal** is on the **Satluj**; **Salal** is on the **Chenab**. The Jhelum and the Beas carry other projects, so match the dam to its own river.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-ganga",
      name: "The Ganga system",
      intuition:
        "The Ganga collects rivers from both sides as it flows east. From the Himalaya on its left come the Ramganga, Gomti, Ghaghara, Gandak and Kosi; from the peninsula on its right come the Yamuna and the Son. Many peninsular rivers reach the Ganga only through the Yamuna.",
      definition:
        "Key points:\n" +
        "- **Right bank** (from the south): the **Yamuna** at Prayagraj, which brings the **Chambal, Betwa and Ken**; and the **Son**, which joins the Ganga **directly**, near Patna.\n" +
        "- **Left bank** (from the Himalaya), west to east: Ramganga, Gomti, **Ghaghara** (which has collected the **Sharda**), **Gandak**, **Kosi**, Mahananda.\n" +
        "- Cities on the Ganga, west to east: **Kanpur, Prayagraj, Varanasi, Patna, Bhagalpur**.\n" +
        "- The basin reaches **Himachal Pradesh** (Yamuna headwaters), **Rajasthan** (Chambal and Banas) and **Chhattisgarh** (through the Son).\n" +
        "- **Bhopal** is not a river city: it grew around its lakes.",
      table: {
        columns: ["Tributary", "Bank", "Where it joins"],
        rows: [
          { cells: ["Yamuna", "Right", "Prayagraj"] },
          { cells: ["Son", "Right", "Directly, near Patna"] },
          {
            cells: ["Gomti", "Left", "Near Ghazipur"],
            noteAmber: "CDS 2018 (I): east to west the order is Kosi, Gandak, Ghaghara, Gomti.",
            pyqExampleId: "6d1e0397-2acc-4960-813c-eec25bc23d9a",
          },
          { cells: ["Ghaghara", "Left", "Near Chhapra; the Sharda flows into it first"] },
          { cells: ["Gandak", "Left", "Hajipur, opposite Patna"] },
          { cells: ["Kosi", "Left", "Near Kursela in Bihar"] },
          {
            cells: ["Mahananda", "Left", "West Bengal, the last big left-bank tributary"],
            noteAmber: "CDS 2016 (II): the Teesta was the river that does not join the Ganga.",
            pyqExampleId: "65a35938-21df-4d21-b782-99cf5386fd51",
          },
        ],
      },
      pyqExampleId: "a0877f29-d6ac-4e5b-9272-fe72182f67eb",
      selfCheckExample: {
        prompt: "Put the Kosi, the Gomti and the Gandak in order from east to west, by where they meet the Ganga.",
        steps: [
          "The Gomti joins near Ghazipur in eastern Uttar Pradesh, the farthest west of the three.",
          "The Gandak joins at Hajipur, opposite Patna.",
          "The Kosi joins near Kursela, farther downstream in Bihar.",
        ],
        answer: "Kosi, Gandak, Gomti.",
      },
      practiceSet: [
        { prompt: "At which city does the Yamuna join the Ganga?", answer: "Prayagraj" },
        { prompt: "Into which river does the Sharda flow?", answer: "The Ghaghara" },
        { prompt: "Which city on the Ganga is farther east: Patna or Bhagalpur?", answer: "Bhagalpur" },
        { prompt: "Which river carries the drainage of northern Chhattisgarh to the Ganga?", answer: "The Son" },
      ],
      traps: [
        {
          title: "The Teesta is not a Ganga river",
          body: "The **Teesta** rises in Sikkim and joins the **Brahmaputra**. The Son, the Mahananda and the Sharda (through the Ghaghara) all belong to the Ganga.",
        },
        {
          title: "Chambal, Betwa and Ken go through the Yamuna",
          body: "The **Chambal, Betwa and Ken** are tributaries of the **Yamuna**, so they reach the Ganga only through it. The **Son** is the peninsular river that joins the Ganga directly.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-brahmaputra",
      name: "The Brahmaputra and the Barak",
      intuition:
        "One river, four names. It rises in Tibet as the Tsangpo, bends sharply round the Namcha Barwa massif, enters Arunachal Pradesh as the Siang or Dihang, becomes the Brahmaputra in Assam and the Jamuna in Bangladesh. The Barak is a separate river of the south, the head of the Meghna.",
      definition:
        "The names in order:\n" +
        "- **Tsangpo** in Tibet; it takes a **U-turn** round Namcha Barwa.\n" +
        "- **Siang** or **Dihang** in Arunachal Pradesh.\n" +
        "- **Brahmaputra** in Assam, after the **Dibang** and the **Lohit** join.\n" +
        "- **Jamuna** in Bangladesh.\n" +
        "Tributaries:\n" +
        "- North bank: **Subansiri, Manas, Puthimari**.\n" +
        "- South bank: **Dhansiri, Dikhow**.\n" +
        "- The **Teesta** of Sikkim joins it in Bangladesh.\n" +
        "- The **Barak** rises in the hills of **Manipur** and is the head stream of the **Meghna**.",
      table: {
        columns: ["Name or river", "Where"],
        rows: [
          { cells: ["Tsangpo", "Tibet"] },
          {
            cells: ["Siang or Dihang", "Arunachal Pradesh"],
            noteAmber: "CDS 2026 (I): the Dihang is the Brahmaputra, not the Dikhow, Subansiri or Teesta.",
            pyqExampleId: "f28a65a5-61be-4d40-ab4c-3d259a420ba5",
          },
          { cells: ["Brahmaputra", "Assam"] },
          { cells: ["Jamuna", "Bangladesh"] },
          {
            cells: ["Subansiri, Manas, Puthimari", "North-bank tributaries in Assam"],
            pyqExampleId: "54f24ad1-0cbb-401b-88ad-295a1482c679",
          },
          { cells: ["Barak", "Rises in the hills of Manipur; head stream of the Meghna"] },
        ],
      },
      pyqExampleId: "b11b67af-dd60-4a2e-be0c-0fbfe538be6b",
      selfCheckExample: {
        prompt: "Which two rivers join the Dihang to form the Brahmaputra in Assam?",
        steps: [
          "The Dihang comes down from Arunachal Pradesh.",
          "In the upper Assam valley it is joined by the Dibang and the Lohit.",
        ],
        answer: "The Dibang and the Lohit.",
      },
      practiceSet: [
        { prompt: "What is the Brahmaputra called in Tibet?", answer: "The Tsangpo" },
        { prompt: "What is the Brahmaputra called in Bangladesh?", answer: "The Jamuna" },
        { prompt: "In the hills of which state does the Barak rise?", answer: "Manipur" },
        { prompt: "Is the Dhansiri a north-bank or a south-bank tributary of the Brahmaputra?", answer: "South bank" },
      ],
      traps: [
        {
          title: "The Barak rises in Manipur",
          body: "The **Barak**, head stream of the Meghna, rises in the hills of **Manipur**, not Meghalaya. CDS 2024 (II) used Meghalaya as the false statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-peninsular",
      name: "Peninsular rivers",
      intuition:
        "Himalayan rivers are young and fed by snow as well as rain, so they flow all year. Peninsular rivers are old and fed by rain alone, so many shrink in the dry season. Most peninsular rivers run east to the Bay of Bengal because the plateau tilts that way; the Narmada and the Tapi are the big exceptions.",
      definition:
        "Himalayan and peninsular rivers:\n" +
        "- **Himalayan**: perennial (snow and rain), still cutting deep gorges; in their long courses they show youth in the hills, maturity on the plains and old age in the delta.\n" +
        "- **Peninsular**: seasonal (rain only), flowing on an old, stable block; they have reached **maturity** and have broad, shallow valleys.\n" +
        "East-flowing: **Mahanadi, Godavari, Krishna, Kaveri** (deltas on the Bay of Bengal).\n" +
        "West-flowing: **Narmada** (rift valley between the Vindhya and the Satpura) and **Tapi**; they form **estuaries**, not deltas.\n" +
        "Inland: the **Luni** of Rajasthan ends in the Rann of Kachchh; the **Ghaggar** is lost in the Rajasthan desert.",
      table: {
        columns: ["River", "Flows into", "Fact"],
        rows: [
          { cells: ["Mahanadi", "Bay of Bengal", "Rises in Chhattisgarh"] },
          { cells: ["Godavari", "Bay of Bengal", "The largest peninsular river, called the Dakshin Ganga"] },
          {
            cells: ["Krishna", "Bay of Bengal", "With the Tungabhadra it encloses the Raichur doab, between Gulbarga and Hampi"],
            pyqExampleId: "2cf2a724-15d3-4f08-a9d1-81ff566225ad",
          },
          {
            cells: ["Kaveri", "Bay of Bengal", "Main tributaries Kabini, Bhavani and Amaravati"],
            pyqExampleId: "c106f31e-4eef-4f6b-8ed0-eccf005f4cdc",
          },
          {
            cells: ["Narmada", "Arabian Sea", "Flows west in a rift valley between the Vindhya and the Satpura"],
            noteAmber: "CDS 2018 (II): the west-flowing river against the Mahanadi, Godavari and Krishna.",
            pyqExampleId: "7011838f-18bf-41d4-a874-cb6726f5daee",
          },
          { cells: ["Tapi", "Arabian Sea", "Flows west, south of the Satpura"] },
          {
            cells: ["Luni", "Rann of Kachchh", "Tributaries Khari, Sukri and Jawai"],
            noteAmber: "CDS 2018 (II): the Banas is a Chambal tributary, not a Luni one.",
            pyqExampleId: "ba93284c-f93c-42cf-93b5-c3dfd784d533",
          },
        ],
      },
      pyqExampleId: "489f4c86-2d17-48d9-8108-a244ca1c4196",
      selfCheckExample: {
        prompt: "Which way do the Narmada and the Tapi flow, and what do they form where they meet the sea?",
        steps: [
          "Both flow west, into the Arabian Sea.",
          "They run fast through narrow valleys and drop little silt at the mouth.",
        ],
        answer: "West, into the Arabian Sea; they form estuaries, not deltas.",
      },
      practiceSet: [
        { prompt: "Which river is called the Dakshin Ganga?", answer: "The Godavari" },
        { prompt: "Which tributary of the Krishna flows past Hampi?", answer: "The Tungabhadra" },
        { prompt: "Into which river does the Banas of Rajasthan flow?", answer: "The Chambal" },
        { prompt: "Where does the Luni river end?", answer: "In the Rann of Kachchh" },
      ],
      traps: [
        {
          title: "Only two big rivers flow west",
          body: "The **Mahanadi, Godavari, Krishna and Kaveri** flow **east** to the Bay of Bengal. The **Narmada** and the **Tapi** are the large west-flowing rivers.",
        },
        {
          title: "Snow keeps Himalayan rivers flowing",
          body: "Because they start in snowfields, Himalayan rivers are **perennial**: they do not dry up in winter. It is the rain-fed peninsular rivers that shrink in the dry season.",
        },
      ],
    },
  ],
};
