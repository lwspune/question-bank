import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PF_NORTH_NOTE: SubtopicNote = {
  subtopicName: "The Himalayas and the Northern Plains",
  title: "The Himalayas and the Northern Plains",
  oneLineDefinition:
    "The Himalayas run in three parallel ranges and are divided from west to east by rivers; south of them, the Northern Plains are made of river deposits laid down in belts.",
  whyItMatters:
    "Five questions in the bank, three EASY and two MODERATE. Each asks for one name: a range, a division between two rivers, a peak, a kind of alluvium or the part of the plain between two rivers. The names sound alike (Himadri, Himachal; bhabar, bhangar), so learn each with the fact that sets it apart.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spipfno-ranges",
      name: "The three parallel ranges and the highest peaks",
      intuition:
        "Seen from north to south, the Himalayas are three ranges side by side, each lower than the one before it. The highest peaks are in the northern range; the hill stations are in the middle one; the low outer hills face the plains.",
      definition:
        "- **Himadri** (Great or Inner Himalayas): the northernmost and highest range, about 6,000 m high on average, covered in snow all year.\n" +
        "- **Himachal** (Lesser or Middle Himalayas): south of Himadri. Its ranges include the Pir Panjal, the Dhaula Dhar and the Mahabharat, and it has most of the hill stations.\n" +
        "- **Shiwalik** (Outer Himalayas): the outermost range, only 900 to 1,100 m high, made of loose sediments brought down by rivers.\n" +
        "- The long valleys between the Himachal and the Shiwalik are called **duns**, such as Dehra Dun.\n" +
        "- **Mount Everest** is the highest peak in the world. **K2** (Godwin Austen), about 8,611 m, in the **Karakoram** range, is the second highest.",
      table: {
        columns: ["Range", "Other name", "What sets it apart"],
        rows: [
          { cells: ["Himadri", "Great or Inner Himalayas", "Northernmost and highest; snow all year"] },
          { cells: ["Himachal", "Lesser or Middle Himalayas", "Pir Panjal, Dhaula Dhar, Mahabharat ranges; hill stations"] },
          {
            cells: ["Shiwalik", "Outer Himalayas", "Lowest and outermost, 900 to 1,100 m"],
            noteAmber: "Duns such as Dehra Dun lie between the Himachal and the Shiwalik.",
          },
        ],
        caption: "Highest peak in the world: Mount Everest. Second highest: K2 (Godwin Austen), in the Karakoram.",
      },
      selfCheckExample: {
        prompt: "What is the outermost range of the Himalayas, the one next to the plains, called?",
        steps: [
          "From north to south the ranges are Himadri, Himachal and Shiwalik.",
          "The outermost one, facing the plains, is the lowest.",
        ],
        answer: "The Shiwalik.",
      },
      practiceSet: [
        { prompt: "Which range of the Himalayas has the highest peaks?", answer: "Himadri (the Great Himalayas)" },
        { prompt: "What are the long valleys between the Lesser Himalayas and the Shiwalik called?", answer: "Duns" },
        { prompt: "Name one range that is part of the Lesser Himalayas.", answer: "Pir Panjal (or Dhaula Dhar, or Mahabharat)" },
        { prompt: "Which is the highest peak in the world?", answer: "Mount Everest" },
      ],
      pyqExampleId: "f0604b6e-b549-4100-b8b9-c2ba19e30631",
      traps: [
        {
          title: "Mixing up Himadri and Himachal",
          body:
            "Himadri is the Great Himalayas, the high snowy range in the north. Himachal is the Lesser Himalayas, the middle range. The state of Himachal Pradesh takes its name from the same word, which helps you remember Himachal is the one with the hill stations.",
        },
        {
          title: "Taking the Karakoram for a peak",
          body: "The Karakoram is a range. K2 is the peak in it, the second highest in the world.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipfno-divisions",
      name: "Divisions of the Himalayas by river valleys",
      intuition:
        "From west to east, rivers cut the Himalayas into parts, and each part is named after the region it lies in. Learn the rivers in order from west to east and each division falls between two of them.",
      definition:
        "- **Punjab Himalayas**: between the Indus and the Satluj.\n" +
        "- **Kumaon Himalayas**: between the Satluj and the Kali.\n" +
        "- **Nepal Himalayas**: between the Kali and the Teesta.\n" +
        "- **Assam Himalayas**: between the Teesta and the Dihang.\n" +
        "- Beyond the Dihang gorge the mountains turn south along India's eastern border. These are the **Purvanchal** (eastern hills): the Patkai, Naga, Manipur and Mizo hills.",
      table: {
        columns: ["Division", "From river", "To river"],
        rows: [
          { cells: ["Punjab Himalayas", "Indus", "Satluj"] },
          { cells: ["Kumaon Himalayas", "Satluj", "Kali"] },
          { cells: ["Nepal Himalayas", "Kali", "Teesta"] },
          { cells: ["Assam Himalayas", "Teesta", "Dihang"] },
        ],
        caption: "River order from west to east: Indus, Satluj, Kali, Teesta, Dihang. The Purvanchal lies beyond the Dihang.",
      },
      selfCheckExample: {
        prompt: "Which part of the Himalayas lies between the Satluj and the Kali rivers?",
        steps: ["West to east: Indus, Satluj, Kali.", "The Indus to Satluj part is the Punjab Himalayas, so Satluj to Kali is the next one."],
        answer: "The Kumaon Himalayas.",
      },
      practiceSet: [
        { prompt: "Between which two rivers do the Nepal Himalayas lie?", answer: "The Kali and the Teesta" },
        { prompt: "Which part of the Himalayas lies between the Indus and the Satluj?", answer: "The Punjab Himalayas" },
        { prompt: "What are the hills beyond the Dihang gorge, along India's eastern border, called?", answer: "The Purvanchal (eastern hills)" },
        { prompt: "Name one hill range of the Purvanchal.", answer: "Patkai (or Naga, Manipur, Mizo)" },
      ],
      pyqExampleId: "649048fa-b716-4e69-80c6-bc85690118ff",
      traps: [
        {
          title: "Calling the Purvanchal a part of the Assam Himalayas",
          body:
            "The Assam Himalayas end at the Dihang. The Purvanchal is the line of hills that turns south beyond the Dihang gorge.",
        },
        {
          title: "Getting the river order wrong",
          body:
            "The Satluj comes before the Kali, and the Kali before the Teesta. If you place the Kali west of the Satluj, every division shifts by one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipfno-belts",
      name: "Belts of the Northern Plains: bhabar, terai, bhangar, khadar",
      intuition:
        "The Northern Plains are built from mud, sand and pebbles carried down by Himalayan rivers. Close to the hills the coarse pebbles drop first; further out the fine alluvium spreads. Each strip has its own name.",
      definition:
        "- **Bhabar**: a narrow belt, about 8 to 16 km wide, of pebbles at the foot of the Shiwaliks. Streams sink into it and disappear.\n" +
        "- **Terai**: south of the bhabar. The streams come up again and make the land wet, swampy and marshy.\n" +
        "- **Bhangar**: the older alluvium, on higher land above the level of floods.\n" +
        "- **Khadar**: the newer, younger alluvium of the flood plains, renewed almost every year and very fertile.",
      table: {
        columns: ["Name", "What it is", "Where"],
        rows: [
          { cells: ["Bhabar", "Belt of pebbles, 8 to 16 km wide; streams disappear", "Foot of the Shiwaliks"] },
          { cells: ["Terai", "Wet, swampy, marshy land; streams reappear", "South of the bhabar"] },
          { cells: ["Bhangar", "Older alluvium", "Above the flood level"] },
          {
            cells: ["Khadar", "Newer, younger alluvium; very fertile", "Flood plains"],
            noteAmber: "Khadar is renewed by floods almost every year.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "What is the older alluvium of the Northern Plains, lying above the level of floods, called?",
        steps: ["The plains have two kinds of alluvium: old and new.", "The old one sits on higher ground that floods do not reach."],
        answer: "Bhangar.",
      },
      practiceSet: [
        { prompt: "What is the belt of pebbles at the foot of the Shiwaliks, where streams disappear, called?", answer: "Bhabar" },
        { prompt: "What is the wet, swampy belt south of the bhabar called?", answer: "Terai" },
        { prompt: "Which is more fertile, bhangar or khadar?", answer: "Khadar" },
        { prompt: "About how wide is the bhabar belt?", answer: "8 to 16 km" },
      ],
      pyqExampleId: "e2c1775c-1c74-475e-a06b-56dde267a8b0",
      traps: [
        {
          title: "Mixing up bhabar and bhangar",
          body:
            "Both start with bh. Bhabar is the pebble belt at the foot of the hills; bhangar is the old alluvium of the plain. Only bhangar is a kind of alluvium.",
        },
        {
          title: "Thinking the older alluvium is the more fertile",
          body: "Khadar, the newer alluvium, is renewed by floods and is the more fertile one. Bhangar is older and lies above the floods.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipfno-plains",
      name: "Parts of the Northern Plains from west to east",
      intuition:
        "The Northern Plains are one long stretch, but each part belongs to a different river system: the Indus in the west, the Ganga in the middle, the Brahmaputra in the east.",
      definition:
        "- **Punjab plain**: the western part, made by the Indus and its tributaries. Much of it is made of doabs, the land between two rivers.\n" +
        "- **Ganga plain**: between the Ghaggar and the Teesta rivers, across North India and West Bengal.\n" +
        "- **Brahmaputra plain**: the eastern part, in Assam.",
      table: {
        columns: ["Part", "River system", "Where"],
        rows: [
          { cells: ["Punjab plain", "Indus and its tributaries", "West"] },
          { cells: ["Ganga plain", "Ganga", "Between the Ghaggar and the Teesta"] },
          { cells: ["Brahmaputra plain", "Brahmaputra", "Assam, in the east"] },
        ],
        caption: "A doab is the land between two rivers that meet.",
      },
      selfCheckExample: {
        prompt: "In which state does the Brahmaputra plain lie?",
        steps: ["The Brahmaputra plain is the eastern part of the Northern Plains.", "It runs along the Brahmaputra valley."],
        answer: "Assam.",
      },
      practiceSet: [
        { prompt: "Which river system made the Punjab plain?", answer: "The Indus and its tributaries" },
        { prompt: "What is the land between two rivers that meet called?", answer: "A doab" },
        { prompt: "Which is the eastern part of the Northern Plains?", answer: "The Brahmaputra plain" },
      ],
      pyqExampleId: "9be0b4b8-95db-4f0d-a58f-1f79538df8dc",
      traps: [
        {
          title: "Calling the bhabar a part of the plain",
          body: "The bhabar is a narrow belt of pebbles along the hills, not one of the three parts of the plain. The parts are named after the Indus (Punjab), the Ganga and the Brahmaputra.",
        },
      ],
    },
  ],
};
