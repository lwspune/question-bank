import type { SubtopicNote } from "@/app/notes/_types";

export const MOUNTAINS_PLATEAUS_PLAINS_NOTE: SubtopicNote = {
  subtopicName: "Mountains, Plateaus and Plains of India",
  title: "Mountains, Plateaus and Plains of India",
  oneLineDefinition:
    "India is built of four great physiographic divisions — the young folded Himalayas in the north, the flat alluvial Northern Plains, the old rigid Peninsular Plateau fringed by the Ghats, and the narrow Coastal Plains by the sea.",
  whyItMatters:
    "7 PYQs and the natural starting point for the whole chapter — the map of India's relief. The marks come from (1) the Himalayan ranges and which pass sits in which range, (2) the alluvial belts of the Northern Plains (Bhabar, Tarai, Bhangar, Khadar), and (3) the features and peaks of the Peninsular Plateau and the Ghats. Memorise the north-to-south layout once and these stop being guesses.",
  concepts: [
    // 1. physiographic divisions (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "physiographic-divisions",
      name: "The four physiographic divisions",
      intuition:
        "Walk India from the Himalayas down to the sea and you cross four very different kinds of land in order. First the **Himalayas** — tall, young, folded mountains. Then the **Northern Plains** — dead flat, built from river-deposited alluvium. Then the **Peninsular Plateau** — an old, rigid, raised block of hard rock edged by the Ghats. Finally the **Coastal Plains** — a thin strip at the shore. Knowing this north-to-south order is the spine everything else hangs on.",
      definition:
        "North to south:\n" +
        "- **The Himalayas** — young **fold mountains**, raised by the collision of the Indian and Eurasian plates; the highest and most rugged relief.\n" +
        "- **The Northern Plains** — a flat, low belt of **alluvium** laid down by the Indus, Ganga and Brahmaputra.\n" +
        "- **The Peninsular Plateau** — an ancient, stable, rigid block of **denuded rocks and scarps**, India's oldest landmass, edged by the Western and Eastern **Ghats**.\n" +
        "- **The Coastal Plains** — narrow lowlands along the east and west coasts.",
      visualizationSlug: "igp-physiographic-cross-section",
      authoredExample: {
        prompt:
          "Rigid and stable elevated land, denuded rocks and a series of scarps — which physiographic division of India is being described?",
        steps: [
          "Rigid, stable and old points to the ancient block, not the young mountains or the flat plains.",
          "Denuded rocks and scarps are the signature of a worn-down plateau surface.",
          "That is the Peninsular Plateau.",
        ],
        answer: "The Peninsular Plateau.",
      },
      selfCheckExample: {
        prompt:
          "Which division is a flat belt built almost entirely from river-deposited alluvium?",
        steps: [
          "The Himalayas are folded rock; the Plateau is rigid old rock.",
          "The flat, alluvial belt between them is the Northern Plains.",
        ],
        answer: "The Northern Plains.",
      },
      practiceSet: [
        { prompt: "Name India's four physiographic divisions, north to south.", answer: "Himalayas → Northern Plains → Peninsular Plateau → Coastal Plains" },
        { prompt: "Which division is the oldest, most rigid landmass?", answer: "The Peninsular Plateau" },
        { prompt: "Which division is built of river alluvium?", answer: "The Northern Plains" },
      ],
      pyqExampleId: "5e17c55c-ccb3-415d-8319-4ecc91134715", // peninsular plateau features
    },

    // 2. Himalayan ranges (formula + diagram)
    {
      kind: "formula" as const,
      slug: "himalayan-ranges",
      name: "The Himalayan ranges, north to south",
      intuition:
        "The Himalayas are not one wall but several parallel ranges that step DOWN as you move south. Northernmost and highest are the **Trans-Himalayas** (Karakoram, Ladakh). Then the **Greater Himalayas (Himadri)** with the great snow peaks, then the **Lesser Himalayas (Himachal)**, then the low outermost **Shiwaliks**. Glacial landforms — moraines, eskers, outwash plains — belong to the cold, high northern ranges (so a question pointing you there points to Ladakh).",
      definition:
        "North → south, highest → lowest:\n" +
        "- **Trans-Himalayas** — Karakoram and Ladakh ranges; the highest, beyond the main axis.\n" +
        "- **Greater Himalayas (Himadri)** — the snow-capped backbone with the loftiest peaks.\n" +
        "- **Lesser Himalayas (Himachal)** — includes the **Pir Panjal** range.\n" +
        "- **Shiwaliks** — the low, outermost foothills.\n" +
        "Because these are glaciated high mountains, **moraines, eskers and outwash plains** (glacial-deposit landforms) are seen in the cold north — e.g. the Union Territory of **Ladakh**.",
      visualizationSlug: "igp-himalayan-ranges",
      authoredExample: {
        prompt:
          "To observe moraines, eskers and outwash plains, which Union Territory should you visit — Andaman & Nicobar, Lakshadweep, Puducherry or Ladakh?",
        steps: [
          "Moraines, eskers and outwash plains are glacial-deposition landforms, made by ice.",
          "The island and southern UTs are warm and never glaciated.",
          "Only Ladakh, high and cold in the Trans-Himalayas, has glaciers.",
        ],
        answer: "Ladakh.",
      },
      practiceSet: [
        { prompt: "Name the Himalayan ranges from north to south.", answer: "Trans-Himalaya → Greater (Himadri) → Lesser (Himachal) → Shiwalik" },
        { prompt: "Which range is the highest, northernmost belt?", answer: "Trans-Himalaya (Karakoram, Ladakh)" },
        { prompt: "Glacial landforms in India are seen in which UT?", answer: "Ladakh" },
      ],
      pyqExampleId: "41935b26-59b8-4b54-b345-f457c3ad8b02", // glacial landforms = Ladakh
    },

    // 3. Himalayan passes (reference)
    {
      kind: "reference" as const,
      slug: "himalayan-passes",
      name: "Himalayan passes and their ranges/states",
      intuition:
        "A pass is a gap that lets you cross a range. The NDA tests two things: which RANGE a pass cuts through, and which STATE/UT it lies in. Anchor the famous ones — Zoji La and Photu La in Ladakh region, Banihal in the Pir Panjal, Khardung La in the Karakoram, Bomdi La and Bum La in Arunachal Pradesh.",
      definition:
        "Pass → range/location:\n" +
        "- **Zoji La** — Great Himalayas (Ladakh route).\n" +
        "- **Banihal Pass** — Pir Panjal range (links Jammu to the Kashmir Valley).\n" +
        "- **Khardung La** — Karakoram range (Ladakh).\n" +
        "- **Photu La** — Zanskar/Ladakh range.\n" +
        "- **Arunachal Pradesh passes** — Bomdi La, Bum La, Yonggyap, Kumjawng, Diphu, Hpungan. **Muling La is NOT in Arunachal** (it is in the Sikkim/Tibet area).",
      table: {
        columns: ["Pass", "Range / location"],
        rows: [
          {
            cells: ["**Zoji La**", "Great Himalayas"],
            noteAmber: "NDA 2024 — Zoji La / Banihal / Photu La range-matching.",
            pyqExampleId: "3e1970b4-8534-4cb7-8aa2-616d58b4ee21",
          },
          { cells: ["Banihal Pass", "Pir Panjal range"] },
          { cells: ["Khardung La", "Karakoram range"] },
          {
            cells: ["**Bomdi La, Bum La, Yonggyap**", "Arunachal Pradesh"],
            noteAmber: "NDA 2026 — Muling La is the impostor; it is NOT a pass of Arunachal Pradesh.",
            pyqExampleId: "77574737-f9cd-4ba9-9fbb-0d9a9ed6b4b6",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which one is NOT a pass of Arunachal Pradesh: Kumjawng, Yonggyap, Muling La, Bomdi La?",
        steps: [
          "Kumjawng, Yonggyap and Bomdi La are all Arunachal passes.",
          "Muling La lies in the Sikkim/Tibet border area, not Arunachal.",
        ],
        answer: "Muling La.",
      },
      practiceSet: [
        { prompt: "Banihal Pass cuts through which range?", answer: "Pir Panjal" },
        { prompt: "Khardung La lies in which range?", answer: "Karakoram" },
        { prompt: "Name a pass of Arunachal Pradesh.", answer: "Bomdi La / Bum La / Yonggyap / Kumjawng" },
      ],
      pyqExampleId: "77574737-f9cd-4ba9-9fbb-0d9a9ed6b4b6", // NOT a pass of Arunachal = Muling La
      traps: [
        {
          title: "Match the pass to the right range AND state",
          body:
            "The classic trap pairs a real pass with the wrong range. Lock **Banihal → Pir Panjal**, **Khardung La → Karakoram**, **Zoji La → Great Himalayas**. And **Muling La is NOT in Arunachal** — it is the odd one out in an Arunachal-passes list.",
        },
      ],
    },

    // 4. Northern Plains belts (reference)
    {
      kind: "reference" as const,
      slug: "northern-plains-belts",
      name: "The alluvial belts of the Northern Plains",
      intuition:
        "The Northern Plains are sorted into belts running parallel to the foothills. Right below the Shiwaliks, fast streams dump heavy boulders into the porous **Bhabar**; just south the water re-emerges to make the marshy **Tarai**. Farther out, the plains divide into **Bhangar** (old, higher alluvium) and **Khadar** (new, flood-renewed alluvium).",
      definition:
        "From the foothills outward:\n" +
        "- **Bhabar** — a narrow porous belt just south of the Shiwaliks where streams **deposit heavy boulders and gravel**; rivers sink underground here.\n" +
        "- **Tarai** — the marshy, re-emergent belt just south of the Bhabar.\n" +
        "- **Bhangar** — older alluvium, on higher ground, away from active floods.\n" +
        "- **Khadar** — newer alluvium in the floodplain, renewed by every flood (the most fertile).",
      table: {
        columns: ["Belt", "What it is"],
        rows: [
          {
            cells: ["**Bhabar**", "Porous boulder/gravel belt below the Shiwaliks; rivers go underground"],
            noteAmber: "NDA 2023 — the belt where rivers deposit rocks and boulders is the Bhabar.",
            pyqExampleId: "e518d3c8-4bb5-40e7-829f-f0815500dd8c",
          },
          { cells: ["Tarai", "Marshy, re-emergent belt south of the Bhabar"] },
          { cells: ["Bhangar", "Old, higher alluvium"] },
          { cells: ["Khadar", "New floodplain alluvium (most fertile)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which narrow belt parallel to the Shiwalik foothills is where streams deposit heavy boulders and rocks?",
        steps: [
          "Tarai is marshy; Bhangar and Khadar are river-plain alluvium.",
          "The porous boulder-and-gravel belt at the foot of the Shiwaliks is the Bhabar.",
        ],
        answer: "The Bhabar.",
      },
      practiceSet: [
        { prompt: "Which belt is the porous boulder zone below the Shiwaliks?", answer: "Bhabar" },
        { prompt: "Old, higher alluvium is called?", answer: "Bhangar" },
        { prompt: "New flood-renewed alluvium is called?", answer: "Khadar" },
      ],
      pyqExampleId: "e518d3c8-4bb5-40e7-829f-f0815500dd8c", // Bhabar
      traps: [
        {
          title: "Bhabar vs Tarai",
          body:
            "Both sit at the foot of the Shiwaliks, but **Bhabar** is the upper, porous, dry boulder belt where rivers SINK; **Tarai** is the lower, marshy belt just south of it where the water RE-EMERGES. The 'rocks and boulders' clue is always Bhabar.",
        },
      ],
    },

    // 5. Peninsular Plateau and the Ghats (reference)
    {
      kind: "reference" as const,
      slug: "plateau-and-ghats",
      name: "The Peninsular Plateau and the Ghats",
      intuition:
        "The Peninsular Plateau is fringed by two hill ranges: the continuous **Western Ghats** and the broken **Eastern Ghats**. In the far south, near the **Nilgiri Hills**, the two Ghats meet. The plateau's peaks and the placing of named hills are the recall targets — e.g. Mahendragiri (the highest Eastern Ghats peak) is in Odisha, and the Cardamom Hills are a southern extension of the WESTERN Ghats.",
      definition:
        "- **Western Ghats** — continuous, higher, run parallel to the west coast; the Nilgiris and the southern hills (Anaimalai, Cardamom) belong to this system.\n" +
        "- **Eastern Ghats** — discontinuous, lower, broken by rivers; **Mahendragiri** in **Odisha** is its highest peak.\n" +
        "- **Nilgiri Hills** — where the Western and Eastern Ghats MEET, the southern hinge of the Peninsular Plateau.\n" +
        "- **Cardamom Hills** — a continuation of the **Western** Ghats (NOT the Eastern Ghats — a common trap).",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          {
            cells: ["**Mahendragiri**", "Highest peak of the Eastern Ghats — in **Odisha**"],
            noteAmber: "NDA 2025 — Mahendragiri is in Odisha.",
            pyqExampleId: "098d3dbe-0996-4a0c-97f5-37c19e5baa1e",
          },
          {
            cells: ["**Nilgiri Hills**", "Where the Eastern and Western Ghats meet (southern point of the plateau)"],
            noteAmber: "NDA 2023 — statement 1 (Ghats meet at the Nilgiris) is correct; the Cardamom Hills are NOT an Eastern-Ghats continuation.",
            pyqExampleId: "acdddf0c-c61f-477d-b5d1-3339ab5fa5d1",
          },
          { cells: ["Cardamom Hills", "Southern continuation of the WESTERN Ghats"] },
        ],
      },
      selfCheckExample: {
        prompt: "Mahendragiri, the highest peak of the Eastern Ghats, is in which state?",
        steps: [
          "The Eastern Ghats run along the east coast through Odisha and Andhra Pradesh.",
          "Mahendragiri, its highest peak, lies in Odisha.",
        ],
        answer: "Odisha.",
      },
      practiceSet: [
        { prompt: "Highest peak of the Eastern Ghats?", answer: "Mahendragiri (in Odisha)" },
        { prompt: "Where do the Eastern and Western Ghats meet?", answer: "The Nilgiri Hills" },
        { prompt: "The Cardamom Hills continue which Ghats?", answer: "The Western Ghats" },
      ],
      pyqExampleId: "098d3dbe-0996-4a0c-97f5-37c19e5baa1e", // Mahendragiri = Odisha
      traps: [
        {
          title: "Cardamom Hills are WESTERN, not Eastern",
          body:
            "A two-statement question pairs 'the Ghats meet at the Nilgiris' (true) with 'the Cardamom Hills continue the Eastern Ghats' (FALSE — they continue the Western Ghats). Only the first statement is correct.",
        },
      ],
    },
  ],
};
