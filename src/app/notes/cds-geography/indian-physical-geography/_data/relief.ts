import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_RELIEF_NOTE: SubtopicNote = {
  subtopicName: "Mountains, Plateaus and Plains",
  title: "Mountains, Plateaus and Plains",
  oneLineDefinition:
    "The Himalayan ranges and passes, the hills and plateaus of the peninsula, the belts of the northern plains, the Thar desert and the two coasts.",
  whyItMatters:
    "Sixteen CDS questions from 2017 to 2026, and the hardest page of the chapter: 7 HARD, 8 MODERATE, 1 EASY. Most are match-the-list or north-to-south items, so a table in your head is the whole skill.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-himalaya-ranges",
      name: "Ranges of the north, peaks and glaciers",
      intuition:
        "North of the plains, the mountains stand in rows like steps. Beyond the Great Himalaya lie the Trans-Himalayan ranges of Ladakh, and beyond those the Karakoram and the Kunlun. Learn the rows from north to south and every ordering question is a look-up.",
      definition:
        "From north to south:\n" +
        "- **Kunlun**, then **Karakoram**, then the **Ladakh** range, then the **Zaskar** range (the Trans-Himalaya).\n" +
        "- Then the **Great Himalaya** (Himadri), the **Lesser Himalaya** (with the **Pir Panjal**), and the **Shiwaliks** at the edge of the plains.\n" +
        "In Kashmir:\n" +
        "- The **Karewas** are thick lake deposits of glacial clay with moraines, laid down in the Pleistocene on the lower slopes of the Pir Panjal. They grow **saffron**, almond and walnut.\n" +
        "- The **Jhelum** meanders across the flat floor of the Kashmir valley.\n" +
        "- **Pangong Tso** and **Tso Moriri** in Ladakh are **salt-water** lakes.",
      table: {
        columns: ["Range or feature", "What to remember"],
        rows: [
          { cells: ["Kunlun", "The farthest north, on the edge of the Tibetan plateau"] },
          {
            cells: ["Karakoram", "Siachen glacier, at the head of the Nubra valley"],
            noteAmber: "CDS 2024 (II): Siachen and the Nubra valley was the one correct pair.",
            pyqExampleId: "2906283b-0a2b-4447-b393-c1f7e318d078",
          },
          { cells: ["Ladakh range", "North of the Indus in Ladakh"] },
          { cells: ["Zaskar range", "South of the Indus, in front of the Great Himalaya"] },
          { cells: ["Great Himalaya", "Kanchenjunga with the Zemu glacier (Sikkim); Nanda Devi (Uttarakhand)"] },
          {
            cells: ["Pir Panjal", "Karewa deposits on its lower slopes, in the Kashmir valley"],
            noteAmber: "CDS 2022 (II): all three statements on the Karewas were true.",
            pyqExampleId: "7046cce0-0616-487c-81f9-716b0b838ac5",
          },
          {
            cells: ["Kashmir valley", "The Jhelum meanders; Pangong Tso and Tso Moriri (Ladakh) are salt-water lakes"],
            noteAmber: "CDS 2026 (I): the statement calling them freshwater lakes was the false one.",
            pyqExampleId: "3868646f-dd89-4695-8230-f01389e74665",
          },
          { cells: ["Shiwaliks", "The outermost foothills, next to the plains"] },
        ],
      },
      pyqExampleId: "ff590a52-cebb-4359-be93-acbcb80274d1",
      selfCheckExample: {
        prompt: "Put these in order from north to south: Shiwaliks, Great Himalaya, Pir Panjal.",
        steps: [
          "The Great Himalaya is the innermost and highest of the three.",
          "The Pir Panjal belongs to the Lesser Himalaya, south of it.",
          "The Shiwaliks are the outermost foothills, next to the plains.",
        ],
        answer: "Great Himalaya, Pir Panjal, Shiwaliks.",
      },
      practiceSet: [
        { prompt: "On the lower slopes of which range are the Karewas found?", answer: "The Pir Panjal" },
        { prompt: "Which spice is grown on the Karewas of Kashmir?", answer: "Saffron" },
        { prompt: "In which mountain range is the Siachen glacier?", answer: "The Karakoram" },
        { prompt: "In which state is Nanda Devi peak?", answer: "Uttarakhand" },
      ],
      traps: [
        {
          title: "The Kunlun is north of the Karakoram",
          body: "Going south from Tibet the order is **Kunlun, Karakoram, Ladakh, Zaskar**. The Karakoram is not the farthest north; the Kunlun is.",
        },
        {
          title: "Pangong Tso is salty",
          body: "Pangong Tso and Tso Moriri are high lakes in Ladakh with **salt water**. Dal and Wular in Kashmir are the freshwater lakes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-passes",
      name: "Himalayan passes",
      intuition:
        "A pass is a low gap in a mountain wall that a road can use. Tie each pass to its state and to the two places it joins, going west to east along the Himalaya.",
      definition:
        "West to east:\n" +
        "- **Ladakh**: Zoji La (from Kashmir), Khardung La, Lanak La.\n" +
        "- **Himachal Pradesh**: Rohtang, **Shipki La** (where the Satluj enters India).\n" +
        "- **Uttarakhand**: **Lipulekh** (Kailash Mansarovar route).\n" +
        "- **Sikkim**: **Nathu La** and Jelep La (to the Chumbi valley of Tibet).\n" +
        "- **Arunachal Pradesh**: Bomdi La.\n" +
        "- **Bolan** and **Khyber** are passes of Pakistan and Afghanistan, not of the Indian Himalaya.",
      table: {
        columns: ["Pass", "Where", "What it joins"],
        rows: [
          { cells: ["Zoji La", "Between Kashmir and Ladakh", "Srinagar and Leh"] },
          { cells: ["Khardung La", "Ladakh", "Leh and the Nubra valley"] },
          {
            cells: ["Lanak La", "Ladakh (Aksai Chin)", "The old route from Ladakh to Lhasa"],
            pyqExampleId: "0d20c8df-802f-4fc6-a85c-873cf58998ad",
          },
          { cells: ["Rohtang", "Himachal Pradesh", "Kullu and Lahaul"] },
          {
            cells: ["Shipki La", "Himachal Pradesh (Kinnaur)", "The Satluj valley and Tibet"],
            noteAmber: "CDS 2026 (I): Shipki La is in the Satluj valley, not the Chumbi or Teesta valley.",
            pyqExampleId: "5da987c4-49a3-4d40-be8b-965a8fd90685",
          },
          { cells: ["Lipulekh", "Uttarakhand (Pithoragarh)", "India and Tibet, on the Kailash Mansarovar route"] },
          { cells: ["Nathu La", "Sikkim", "Gangtok and the Chumbi valley"] },
          { cells: ["Jelep La", "Sikkim", "Sikkim and the Chumbi valley"] },
          { cells: ["Bomdi La", "Arunachal Pradesh", "The road to Tawang"] },
          {
            cells: ["Bolan", "Pakistan (Balochistan)", "Not a Himalayan pass"],
            noteAmber: "CDS 2023 (II): the odd one out against Zojila, Shipkila and Lipulekh.",
            pyqExampleId: "b213e582-efe1-475c-8902-6554569ada81",
          },
        ],
      },
      pyqExampleId: "85a9e6f9-714c-47a1-9743-1f6babcd2aa7",
      selfCheckExample: {
        prompt: "Which pass carries the road from Kullu to Lahaul, and in which state is it?",
        steps: [
          "Kullu and Lahaul are both valleys of Himachal Pradesh.",
          "The pass between them is Rohtang.",
        ],
        answer: "Rohtang, in Himachal Pradesh.",
      },
      practiceSet: [
        { prompt: "Which pass joins Leh with the Nubra valley?", answer: "Khardung La" },
        { prompt: "Which pass in Arunachal Pradesh lies on the road to Tawang?", answer: "Bomdi La" },
        { prompt: "In which country is the Bolan Pass?", answer: "Pakistan" },
        { prompt: "Name a second pass of Sikkim, besides Nathu La.", answer: "Jelep La" },
      ],
      traps: [
        {
          title: "Shipki La and Lipulekh are next door, not the same state",
          body: "**Shipki La** is in **Himachal Pradesh**, on the Satluj. **Lipulekh** is in **Uttarakhand**, on the Kailash Mansarovar route. CDS swaps them in the options.",
        },
        {
          title: "Bolan and Khyber are not Indian",
          body: "The **Bolan** (Pakistan) and the **Khyber** (Pakistan and Afghanistan) cross the western mountains, not the Indian Himalaya.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-plateau-hills",
      name: "Hills and plateaus of the peninsula",
      intuition:
        "The peninsula is an old, hard block of rock worn down into plateaus and hill ranges. Each range has one peak or one fact CDS asks about. Learn the range, its top and its state together.",
      definition:
        "The ranges, north to south:\n" +
        "- **Aravalli** (Rajasthan): highest point **Guru Shikhar** on Mount Abu.\n" +
        "- **Vindhya**: just north of the Narmada.\n" +
        "- **Satpura**: between the **Narmada** and the **Tapi**; highest point **Dhupgarh** near Pachmarhi. The **Mahadeo** hills are its eastern part.\n" +
        "- **Nilgiri** (Tamil Nadu): **Doddabetta**.\n" +
        "- **Anaimalai** (Kerala): **Anaimudi**, the highest peak of peninsular India.\n" +
        "Plateaus: **Malwa** (western Madhya Pradesh, black soil, Indore) and **Chota Nagpur** (Jharkhand, old Archaean granite and gneiss, rich in minerals).",
      table: {
        columns: ["Hills or plateau", "Peak or fact", "State"],
        rows: [
          { cells: ["Aravalli", "Guru Shikhar, Mount Abu", "Rajasthan"] },
          { cells: ["Vindhya", "The northern wall of the Narmada valley", "Madhya Pradesh"] },
          { cells: ["Satpura", "Dhupgarh; lies between the Narmada and the Tapi", "Madhya Pradesh"] },
          { cells: ["Mahadeo hills", "Eastern part of the Satpura system", "Madhya Pradesh"] },
          { cells: ["Nilgiri", "Doddabetta", "Tamil Nadu"] },
          { cells: ["Anaimalai", "Anaimudi, the highest peak of the peninsula", "Kerala"] },
          {
            cells: ["Malwa plateau", "Black soil; Indore stands on it", "Madhya Pradesh"],
            noteAmber: "CDS 2025 (II): Indore is on the Malwa plateau, not in Nimar, Bundelkhand or Mahakoshal.",
            pyqExampleId: "bbca137e-ef5c-4b82-926b-b4b7bfe6eefb",
          },
          { cells: ["Chota Nagpur plateau", "Archaean granite and gneiss; rich in minerals", "Jharkhand"] },
        ],
      },
      pyqExampleId: "aa59fb55-ab1b-4372-9b62-9b51d7e04f0c",
      selfCheckExample: {
        prompt: "A river flows west through a long valley with the Vindhya range on its north and the Satpura on its south. Name the river.",
        steps: [
          "The Vindhya lies just north of the Narmada.",
          "The Satpura lies between the Narmada and the Tapi, so it is south of the Narmada.",
        ],
        answer: "The Narmada.",
      },
      practiceSet: [
        { prompt: "Between which two rivers does the Satpura range lie?", answer: "The Narmada and the Tapi" },
        { prompt: "On which plateau does Indore stand?", answer: "The Malwa plateau" },
        { prompt: "Which plateau of Jharkhand is made of Archaean granite and gneiss?", answer: "The Chota Nagpur plateau" },
        { prompt: "Which range lies just north of the Narmada?", answer: "The Vindhya" },
      ],
      traps: [
        {
          title: "Anaimudi beats Doddabetta",
          body: "**Doddabetta** is the top of the Nilgiris, but the highest peak of the whole peninsula is **Anaimudi** in the Anaimalai hills of Kerala.",
        },
        {
          title: "Dhupgarh is Satpura, Guru Shikhar is Aravalli",
          body: "**Dhupgarh** (near Pachmarhi) crowns the **Satpura**; **Guru Shikhar** (Mount Abu) crowns the **Aravalli**. The Vindhya has no peak CDS has asked about.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-plains-coasts",
      name: "Plains, desert and coasts",
      intuition:
        "When a river leaves the mountains it slows down and drops its load: the heavy boulders first, at the foot of the hills, and the fine silt far out on the plain. That one idea explains the belts of the northern plains. The Thar and the two coasts each have one fact CDS asks.",
      definition:
        "The northern plains, from the hills outwards:\n" +
        "- **Bhabar**: a narrow belt of pebbles and boulders at the foot of the Shiwaliks; streams sink under it.\n" +
        "- **Terai**: a wet, marshy belt south of the bhabar where the streams come back up.\n" +
        "- **Bhangar**: older alluvium, above flood level, with lime nodules (kankar).\n" +
        "- **Khadar**: newer alluvium on the floodplains, renewed by floods every year.\n" +
        "The **Thar** (Marusthali) lay under the sea in the **Mesozoic** era; fossils at Aakal and marine deposits near Brahmsar (Jaisalmer) show it.\n" +
        "The **west coast** is high, rocky and retreating, with **erosional** forms. The **east coast** is low and sedimentary, with **depositional** forms such as deltas.",
      table: {
        columns: ["Feature", "What it is"],
        rows: [
          { cells: ["Bhabar", "Boulders and pebbles at the foot of the Shiwaliks"] },
          { cells: ["Terai", "Marshy belt south of the bhabar"] },
          { cells: ["Bhangar", "Older alluvium, above flood level"] },
          { cells: ["Khadar", "Newer alluvium on the floodplains"] },
          {
            cells: ["Thar (Marusthali)", "Under the sea in the Mesozoic era"],
            noteAmber: "CDS 2022 (II): Mesozoic, not Palaeozoic or Cenozoic.",
            pyqExampleId: "70db1de9-78c5-4ec9-b018-7ff93f2604ba",
          },
          {
            cells: ["West coast", "High, rocky, retreating; erosional landforms"],
            noteAmber: "CDS 2022 (II): all three statements on the two coasts were true.",
            pyqExampleId: "c3b87902-3bb2-4895-a5e4-b026cc5fa64c",
          },
          { cells: ["East coast", "Low, sedimentary; depositional landforms such as deltas"] },
        ],
      },
      pyqExampleId: "1e60ece0-31d7-4dd4-a521-5ea02bb2b0bc",
      selfCheckExample: {
        prompt: "Walking south from the Shiwaliks into the Ganga plain, in what order do you meet the bhangar, the bhabar and the terai?",
        steps: [
          "The heaviest material is dropped first, right at the foot of the hills: the bhabar.",
          "The streams come up again just south of it, making the marshy terai.",
          "Beyond lies the old alluvium of the bhangar.",
        ],
        answer: "Bhabar, then terai, then bhangar.",
      },
      practiceSet: [
        { prompt: "Which is the newer alluvium: khadar or bhangar?", answer: "Khadar" },
        { prompt: "What is the marshy belt just south of the bhabar called?", answer: "The terai" },
        { prompt: "In which geological era was the Thar desert under the sea?", answer: "The Mesozoic era" },
        { prompt: "Which coast of India is dominated by depositional landforms?", answer: "The east coast" },
      ],
      traps: [
        {
          title: "Bhabar is dry, terai is wet",
          body: "The **bhabar** is a dry belt of boulders where streams disappear underground. The **terai** below it is **marshy**, because the streams come up again there.",
        },
        {
          title: "Khadar is new, bhangar is old",
          body: "**Khadar** is the new alluvium laid down by floods each year. **Bhangar** is the old alluvium on higher ground. Students often swap them.",
        },
      ],
    },
  ],
};
