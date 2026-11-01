import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIP_RELIEF_NOTE: SubtopicNote = {
  subtopicName: "Mountains, Plateaus and Plains of India",
  title: "Mountains, Plateaus and Plains of India",
  oneLineDefinition:
    "The Himalayas and their divisions, the hills of the North-East and the two Ghats, the peninsular plateau and the northern plains, and India's size, borders and island channels.",
  whyItMatters:
    "Thirty-one questions in the bank: 13 from the 2023 shifts, 13 from the 2024 shifts and five from the 2025 shifts, and 24 of them EASY. Most ask which range a hill belongs to, so learning the hills by range (Western Ghats, Eastern Ghats, Meghalaya, Purvanchal) answers most of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgipmo-himalaya",
      name: "The Himalayas and the north-eastern hills",
      intuition:
        "The Himalayas run from the Indus in the west to the Brahmaputra in the east and are cut into divisions by rivers. East of them, lower hills curve south along the Myanmar border, and the Meghalaya plateau sits apart to the south-west.",
      definition:
        "The Himalayas:\n" +
        "- They stretch from the **Indus** (west) to the **Brahmaputra** (east), and shield India from **cold winds from Central Asia**.\n" +
        "- Divisions by river: Punjab Himalaya (Indus to Sutlej), **Kumaon Himalaya (Sutlej to Kali)**, Nepal Himalaya (Kali to Teesta), Assam Himalaya (Teesta to Dihang).\n" +
        "- **Kanchenjunga**, India's highest peak, is in the **Darjeeling and Sikkim Himalayas**.\n" +
        "- **Duns** are long valleys between the Lesser Himalayas and the Shiwaliks; **Dehra Dun** is the largest.\n\n" +
        "The North-East:\n" +
        "- **Purvanchal**: the Patkai Bum, **Naga, Manipur and Mizo hills**. (The Pir Panjal is in Jammu and Kashmir, not Purvanchal.) **Japfu** peak is in Nagaland.\n" +
        "- **Meghalaya plateau**: the **Garo, Khasi and Jaintia** hills. **Mawsynram**, on the southern Khasi hills, gets the highest average rainfall in the world.",
      table: {
        columns: ["Hills or peak", "Where"],
        rows: [
          { cells: ["Kanchenjunga", "Darjeeling and Sikkim Himalayas"], pyqExampleId: "1f6b9578-790d-4337-adc3-81cd09407e94" },
          { cells: ["Kumaon Himalaya", "Between the Sutlej and the Kali"], pyqExampleId: "9a89014a-c296-4f84-9fa3-600a7370a0e8" },
          { cells: ["Garo, Khasi, Jaintia", "Meghalaya plateau"], pyqExampleId: "7abce283-70e0-4073-ad14-39064c5a6869" },
          { cells: ["Japfu", "Nagaland"], pyqExampleId: "336c157b-e0ed-4df7-86f3-38c6421402d8" },
          { cells: ["Mawsynram", "Southern Khasi hills"], pyqExampleId: "24590d47-4a51-438d-bcd6-be9e87819512" },
          { cells: ["Dehra Dun", "The largest dun"], pyqExampleId: "ac3ba6dd-9869-4354-9158-008090fe1331" },
        ],
      },
      pyqExampleId: "d2f1e093-4524-45ab-9658-8d378f652d55",
      selfCheckExample: {
        prompt: "Name the rivers that mark the western and eastern ends of the Himalayas.",
        steps: ["The Himalayas begin in the west at the Indus.", "They end in the east at the Brahmaputra."],
        answer: "The Indus and the Brahmaputra.",
      },
      practiceSet: [
        { prompt: "Which hills of Meghalaya hold Mawsynram?", answer: "The Khasi hills" },
        { prompt: "Which is the largest dun?", answer: "Dehra Dun" },
        { prompt: "Name the three hills of the Meghalaya plateau.", answer: "Garo, Khasi and Jaintia" },
        { prompt: "What do the Himalayas block from entering India?", answer: "Cold winds from Central Asia" },
      ],
      traps: [
        {
          title: "Pir Panjal is not Purvanchal",
          body: "The **Purvanchal** are the Patkai, Naga, Manipur and Mizo hills. The **Pir Panjal** range is in Jammu and Kashmir.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgipmo-plateau",
      name: "The peninsular plateau, the Ghats and the plains",
      intuition:
        "South of the plains lies an old, worn plateau edged by two ranges of hills, the Western and Eastern Ghats. North of it lie the flat, fertile plains built by three Himalayan rivers. SSC asks which hills belong to which Ghats.",
      definition:
        "The Ghats:\n" +
        "- **Western Ghats**: the **Anaimalai** hills (with **Anamudi**), the Nilgiris and the Cardamom hills. UNESCO listed them in 2012: they shape the **monsoon** and are a world **biodiversity hotspot**.\n" +
        "- **Eastern Ghats**: the **Shevaroy** hills near Salem (Tamil Nadu), with Yercaud.\n" +
        "- **Ooty**, in the Nilgiris, gets no snow; Himalayan hill stations do.\n\n" +
        "The plateau:\n" +
        "- Its features include **tors, spurs, block mountains** and rift valleys.\n" +
        "- The **Central Highlands** extend east as Bundelkhand and Baghelkhand, and further east as the **Chota Nagpur** plateau, which the Damodar drains.\n" +
        "- The **Deccan lava plateau** is covered with fertile **black soil**.\n\n" +
        "The plains: the **Northern Plains** were built by the **Indus, Ganga and Brahmaputra**, and their alluvium makes them among the most fertile land in India. In the Thar, crescent dunes called **barchans** lie around **Jaisalmer**.",
      table: {
        columns: ["Hills", "Range"],
        rows: [
          { cells: ["Anaimalai (Anamudi)", "Western Ghats"], pyqExampleId: "958c0a68-a89f-4de6-9cc8-bf830a78a85b" },
          { cells: ["Nilgiri, Cardamom", "Western Ghats"] },
          { cells: ["Shevaroy", "Eastern Ghats"], pyqExampleId: "7bc49f67-64e1-4904-89cd-3572e0143212" },
          { cells: ["Lushai (Mizo)", "Mizoram"], pyqExampleId: "b28456df-1eb6-497b-9210-4fc9c939ba9f" },
        ],
      },
      pyqExampleId: "795da14e-4590-4efa-9ce0-6c1467defebe",
      selfCheckExample: {
        prompt: "Which river is the odd one out among the three that built the Northern Plains: Indus, Ganga, Godavari, Brahmaputra?",
        steps: ["The Northern Plains were laid down by the Indus, Ganga and Brahmaputra systems.", "The Godavari is a peninsular river crossing the Deccan."],
        answer: "The Godavari.",
      },
      practiceSet: [
        { prompt: "In which Ghats are the Shevaroy hills?", answer: "The Eastern Ghats" },
        { prompt: "Why did UNESCO list the Western Ghats?", answer: "They shape the monsoon and are a world biodiversity hotspot" },
        { prompt: "Which soil covers the Deccan lava plateau?", answer: "Black soil" },
        { prompt: "What are barchans?", answer: "Crescent-shaped sand dunes, as near Jaisalmer" },
      ],
      traps: [
        {
          title: "Chota Nagpur is not drained by the Chambal",
          body: "The **Chambal and Betwa** drain the western Central Highlands. **Chota Nagpur** is drained by rivers such as the **Damodar**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgipmo-location",
      name: "Size, borders and island channels",
      intuition:
        "A few facts fix India on the map: its share of the world's land, which States touch Bhutan, and the channels and gulfs that separate its islands and Sri Lanka.",
      definition:
        "The facts:\n" +
        "- India covers about **2.4%** of the world's area and is the **seventh** largest country.\n" +
        "- **Bhutan** borders **Sikkim, West Bengal, Assam and Arunachal Pradesh**, not Meghalaya.\n" +
        "- The **Ten Degree Channel** separates the **Andaman** from the **Nicobar** islands; the Nine Degree Channel lies in Lakshadweep.\n" +
        "- The **Gulf of Mannar** lies between India's south-eastern tip and the **west coast of Sri Lanka**.\n" +
        "- Of Puducherry's four parts, **Karaikal** lies nearest Sri Lanka. **New Moore Island** lay near **Bangladesh**.\n" +
        "- **Mizoram** is called the **molasses basin**, for its soft, loose deposits.",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          { cells: ["Ten Degree Channel", "Between Andaman and Nicobar"], pyqExampleId: "655b7895-9033-466f-9da2-7a71fbce9822" },
          { cells: ["Gulf of Mannar", "India and Sri Lanka's west coast"], pyqExampleId: "8834ca77-a4bd-4256-8902-b5992a3e1bf0" },
          { cells: ["Molasses basin", "Mizoram"], pyqExampleId: "ea4e6681-fdf1-4f9e-9b2a-3b5b8f692da4" },
          { cells: ["States touching Bhutan", "Sikkim, West Bengal, Assam, Arunachal"], pyqExampleId: "1731a9cf-1b1e-417c-94e4-c313e7426d59" },
        ],
      },
      pyqExampleId: "f5a4912b-b902-464b-875c-bc1728e88839",
      selfCheckExample: {
        prompt: "Which channel separates the Andaman from the Nicobar islands, and which lies further west in Lakshadweep?",
        steps: ["The Ten Degree Channel separates the Andaman and Nicobar islands.", "The Nine Degree Channel lies in the Lakshadweep group."],
        answer: "Ten Degree Channel; Nine Degree Channel.",
      },
      practiceSet: [
        { prompt: "What share of the world's area does India cover?", answer: "About 2.4%" },
        { prompt: "Does Meghalaya share a border with Bhutan?", answer: "No" },
        { prompt: "Which State is called the molasses basin?", answer: "Mizoram" },
      ],
      traps: [
        {
          title: "The Gulf of Mannar faces Sri Lanka's west coast",
          body: "The **Gulf of Mannar** lies between India and the **west** coast of Sri Lanka. Options naming its south or east coast are wrong.",
        },
      ],
    },
  ],
};
