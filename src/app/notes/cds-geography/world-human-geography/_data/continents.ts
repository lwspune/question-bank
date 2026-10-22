import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_WO_CONTINENTS_NOTE: SubtopicNote = {
  subtopicName: "Continents, Islands and Latitudes",
  title: "Continents, Islands and Latitudes",
  oneLineDefinition:
    "Which countries the Equator and the Tropic of Capricorn cross, the record facts about Antarctica and Australia, the mountains and plateaus of each continent, and where the islands CDS asks about lie.",
  whyItMatters:
    "Fourteen CDS questions from 2017 to 2025: 1 EASY, 12 MODERATE, 1 HARD. Four came in the single 2025 (I) paper. Antarctica came up in both 2024 papers, and the Tropic of Capricorn twice as a which-country-does-it-not-cross item.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgewo-latitudes",
      name: "The Equator and the Tropic of Capricorn",
      intuition:
        "A latitude question is a map question in disguise. Learn which countries each line cuts, and learn the near misses: the countries that sit right beside the line but never touch it. CDS likes to put a near miss among three countries the line does cross.",
      definition:
        "Two lines CDS keeps asking about:\n" +
        "- The **Equator** (0°) crosses **Ecuador, Colombia and Brazil** in South America, and Kenya, Somalia and Indonesia elsewhere. **Singapore**, at about 1.3° N, is one of the big cities closest to it.\n" +
        "- The **Tropic of Capricorn** (about 23.4° S) crosses four South American countries: **Chile, Argentina, Paraguay and Brazil**.\n" +
        "- **Bolivia** stops at about 22.9° S, just north of the Tropic, so the line never enters it.\n" +
        "- **Uruguay** lies between about 30° S and 35° S, wholly south of the Tropic.",
      table: {
        columns: ["Place or line", "Latitude", "What to remember"],
        rows: [
          { cells: ["Equator", "0°", "Crosses Ecuador, Colombia and Brazil in South America"] },
          {
            cells: ["Singapore", "About 1.3° N", "The closest to the Equator of Singapore, Mogadishu, Colombo and Manila"],
            noteAmber: "CDS 2020 (II): Singapore, not Mogadishu (about 2° N).",
            pyqExampleId: "09b9b89f-2617-4234-82ba-12b378470b72",
          },
          { cells: ["Colombo", "About 7° N", "Sri Lanka's chief city, farther from the Equator than Singapore"] },
          { cells: ["Manila", "About 14.6° N", "The farthest of the four from the Equator"] },
          { cells: ["Tropic of Capricorn", "About 23.4° S", "Crosses Chile, Argentina, Paraguay and Brazil"] },
          {
            cells: ["Bolivia", "Southern tip about 22.9° S", "Wholly north of the Tropic of Capricorn"],
            noteAmber: "CDS 2019 (I): the Tropic does not pass through Bolivia.",
            pyqExampleId: "2f914380-fb4c-4755-b86a-d814a19d86a6",
          },
          {
            cells: ["Uruguay", "About 30° S to 35° S", "Wholly south of the Tropic of Capricorn"],
            noteAmber: "CDS 2020 (II): the Tropic does not pass through Uruguay.",
            pyqExampleId: "ea3a78e8-ade4-4d82-a94f-398c5a89569b",
          },
        ],
      },
      pyqExampleId: "2f914380-fb4c-4755-b86a-d814a19d86a6",
      selfCheckExample: {
        prompt: "Brazil stretches from about 5° N in the north to about 34° S in the south. Which two of the major lines of latitude cross Brazil?",
        steps: [
          "The Equator is 0°, and 0° lies between 5° N and 34° S.",
          "The Tropic of Capricorn is about 23.4° S, which also lies between 5° N and 34° S.",
          "The Tropic of Cancer (about 23.4° N) is far north of 5° N, so it misses Brazil.",
        ],
        answer: "The Equator and the Tropic of Capricorn.",
      },
      practiceSet: [
        { prompt: "At about what latitude does the Tropic of Capricorn lie?", answer: "About 23.4° South" },
        { prompt: "Name three South American countries that the Equator crosses.", answer: "Ecuador, Colombia and Brazil" },
        { prompt: "Does Uruguay lie north or south of the Tropic of Capricorn?", answer: "South of it, between about 30° S and 35° S" },
        { prompt: "Which city lies closer to the Equator, Colombo or Singapore?", answer: "Singapore (about 1.3° N against about 7° N)" },
      ],
      traps: [
        {
          title: "Bolivia touches all the Tropic countries but not the Tropic",
          body: "Bolivia borders Chile, Argentina, Paraguay and Brazil, all four of which the **Tropic of Capricorn** crosses. Bolivia itself ends at about **22.9° S**, so the line never enters it.",
        },
        {
          title: "Uruguay is too far south",
          body: "**Uruguay** sits between about 30° S and 35° S, wholly **south** of the Tropic of Capricorn. Argentina, its neighbour, is crossed by the line; Uruguay is not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-antarctica",
      name: "Antarctica and Australia",
      intuition:
        "Antarctica wins its records because of ice. The ice sheet is so thick that the continent stands higher on average than any other, even though much of the rock under the ice is low. Australia's facts are about which coast things are on: the big range and the big reef are both on the east side.",
      definition:
        "Facts CDS has tested:\n" +
        "- **Antarctica** covers about **14 million sq km**, larger than **Europe** (about 10 million sq km).\n" +
        "- It has the **highest average elevation** of any continent, about 2,300 m, because of its thick ice sheet.\n" +
        "- Its highest peak is **Vinson Massif** (Mount Vinson), about 4,892 m.\n" +
        "- The **West Wind Drift** circles it from **west to east**. Seen from above the South Pole, that is **clockwise**.\n" +
        "- In Australia, the **Great Dividing Range** runs down the **east** side, from Cape York to Victoria. **Perth** is on the far west coast.\n" +
        "- The **Great Barrier Reef** lies off Queensland, with the **Coral Sea** to its east, between the reef and the open South Pacific.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          {
            cells: ["Antarctica or Europe: which is larger?", "Antarctica, about 14 million sq km against about 10 million"],
            noteAmber: "CDS 2024 (II): true. In the same item, Mount Ross is not the highest peak and the West Wind Drift does not run anticlockwise.",
            pyqExampleId: "3ddf2be9-57b6-4a12-86f9-7ccc7e842afe",
          },
          { cells: ["Continent with the highest average elevation", "Antarctica, because of its ice sheet"] },
          { cells: ["Highest peak of Antarctica", "Vinson Massif (Mount Vinson), about 4,892 m"] },
          { cells: ["Direction of the West Wind Drift", "West to east; clockwise when seen from above the South Pole"] },
          {
            cells: ["Great Dividing Range", "Down Australia's east side, from Cape York to Victoria"],
            noteAmber: "CDS 2025 (I): it does not run from Melbourne to Perth.",
            pyqExampleId: "9f117ab3-38d8-4f33-b711-835d6a5f4a98",
          },
          { cells: ["Sea between the Great Barrier Reef and the open South Pacific", "The Coral Sea"] },
        ],
      },
      pyqExampleId: "ccfc5e32-d19b-479c-b2df-b085f3e26572",
      selfCheckExample: {
        prompt: "The West Wind Drift flows from west to east all the way round Antarctica. Looking down on the South Pole from space, does it turn clockwise or anticlockwise?",
        steps: [
          "Seen from above the North Pole, a west-to-east flow turns anticlockwise.",
          "Looking from above the South Pole is looking at the globe from the other end, so the turn is seen the other way round.",
        ],
        answer: "Clockwise.",
      },
      practiceSet: [
        { prompt: "Which is larger in area, Antarctica or Europe?", answer: "Antarctica (about 14 million sq km against about 10 million)" },
        { prompt: "Along which side of Australia does the Great Dividing Range run?", answer: "The east side" },
        { prompt: "Which sea lies east of the Great Barrier Reef, between it and the open South Pacific?", answer: "The Coral Sea" },
      ],
      traps: [
        {
          title: "Vinson, not Ross",
          body: "The highest peak of Antarctica is **Vinson Massif**. **Mount Ross** is not; the Ross Sea and the Ross Ice Shelf are named after the same explorer, which is why the name feels familiar.",
        },
        {
          title: "The Great Dividing Range never reaches Perth",
          body: "The **Great Dividing Range** runs down Australia's **east** side. **Perth** is on the far **west** coast, across the whole width of the continent.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-mountains",
      name: "Mountains and plateaus of the continents",
      intuition:
        "Pin each mountain and plateau to its continent and, where you can, to one country. Most CDS errors here are not about the landform at all: they are a plateau put in the wrong continent, or a famous peak swapped for its neighbour.",
      definition:
        "Africa:\n" +
        "- **Kilimanjaro** (Tanzania), about 5,895 m, is **Africa's highest mountain**. **Mount Kenya** is second.\n" +
        "- The **Virunga Mountains**, a volcanic chain on the borders of DR Congo, Rwanda and Uganda, are home to the endangered **mountain gorillas**.\n" +
        "- The **Abyssinian** (Ethiopian) plateau is in Africa.\n" +
        "Europe and Asia:\n" +
        "- The **Caucasus** stand between the **Black Sea** and the **Caspian Sea**.\n" +
        "- The **Urals** run north to south through Russia and divide European Russia from Asian Russia.\n" +
        "- The **Anatolian** plateau is Asian Turkey; the **Iberian** plateau (the Meseta) is Spain, in Europe.\n" +
        "South America:\n" +
        "- The **Patagonian** plateau is in southern Argentina.",
      table: {
        columns: ["Mountain or plateau", "Continent and place", "Remember"],
        rows: [
          {
            cells: ["Kilimanjaro", "Africa, Tanzania", "Africa's highest mountain, about 5,895 m"],
            noteAmber: "CDS 2023 (II): Kilimanjaro, not Mount Kenya or the Atlas.",
            pyqExampleId: "77db8c16-12a9-45f9-98dd-8d2b08ea7e9c",
          },
          { cells: ["Mount Kenya", "Africa, Kenya", "Africa's second highest mountain"] },
          {
            cells: ["Virunga Mountains", "Africa, DR Congo, Rwanda and Uganda", "Home of the endangered mountain gorillas"],
            noteAmber: "CDS 2025 (I): Virunga, not Kilimanjaro or the Ngorongoro Crater.",
            pyqExampleId: "5f33a1f5-bfcf-4bc5-9ad2-f6a959e1ce8d",
          },
          {
            cells: ["Caucasus", "Between Europe and Asia", "Separates the Black Sea from the Caspian Sea"],
            noteAmber: "CDS 2019 (II): the Caucasus, not the Urals or the Carpathians.",
            pyqExampleId: "8cc0d833-5126-4106-8392-615225e4f1ae",
          },
          { cells: ["Urals", "Russia", "Divides European Russia from Asian Russia"] },
          { cells: ["Abyssinian plateau", "Africa, Ethiopia", "The Ethiopian highlands"] },
          { cells: ["Anatolian plateau", "Asia, Turkey", "The Asian part of Turkey"] },
          { cells: ["Iberian plateau (Meseta)", "Europe, Spain", "The high centre of the Iberian peninsula"] },
          { cells: ["Patagonian plateau", "South America, Argentina", "The dry south of Argentina"] },
        ],
      },
      pyqExampleId: "56756311-4bd4-45fd-8ea7-fdbabe9d8c77",
      selfCheckExample: {
        prompt: "A student writes that the Urals separate the Black Sea from the Caspian Sea. What is wrong, and which range is meant?",
        steps: [
          "The Urals run north to south through Russia, far north of both seas, dividing European Russia from Asian Russia.",
          "The range on the strip of land between the Black Sea and the Caspian Sea is the Caucasus.",
        ],
        answer: "The Caucasus separate the two seas; the Urals lie far to the north.",
      },
      practiceSet: [
        { prompt: "Which is Africa's second highest mountain, after Kilimanjaro?", answer: "Mount Kenya" },
        { prompt: "In which mountains of Africa do the endangered mountain gorillas live?", answer: "The Virunga Mountains" },
        { prompt: "Which mountain range divides European Russia from Asian Russia?", answer: "The Urals" },
      ],
      traps: [
        {
          title: "Patagonia is in South America",
          body: "The **Patagonian** plateau is in southern **Argentina**, South America. It is not in Australia, however far south both sound.",
        },
        {
          title: "Iberia is Europe, not North America",
          body: "The **Iberian** plateau (the Meseta) is the centre of **Spain**. Spain and Portugal make up the Iberian peninsula of **Europe**.",
        },
        {
          title: "Kilimanjaro over Mount Kenya",
          body: "Both are volcanic peaks of East Africa near the Equator. **Kilimanjaro** (Tanzania) is the higher one and the highest in Africa; **Mount Kenya** is second.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-islands",
      name: "Islands of the world",
      intuition:
        "For an island, learn two things: its rank by size if it is a big one, and which ocean or sea it sits in. CDS often offers a nearby sea as the wrong answer, so place each island exactly.",
      definition:
        "The biggest islands, by area:\n" +
        "- 1. **Greenland** (Denmark).\n" +
        "- 2. **New Guinea**, about 786,000 sq km, north of Australia.\n" +
        "- 3. **Borneo**, about 748,000 sq km. 4. **Madagascar**. **Sumatra** is sixth.\n" +
        "- Australia is counted as a continent, not an island.\n" +
        "Other islands CDS has asked:\n" +
        "- **Bermuda** is in the **North Atlantic Ocean**, about 1,000 km east of the United States. It is not in the Caribbean.\n" +
        "- **Easter Island** (Rapa Nui) is in the South Pacific, the south-eastern corner of **Polynesia**, and has been a territory of **Chile** since 1888. It is a UNESCO World Heritage Site for its stone statues.\n" +
        "- **Macau** and **Hong Kong** both stand on the Pearl River estuary in south China: Macau on its west side, Hong Kong on its east.",
      table: {
        columns: ["Island", "Where", "Remember"],
        rows: [
          { cells: ["Greenland", "North Atlantic and Arctic", "The world's largest island"] },
          {
            cells: ["New Guinea", "Western Pacific, north of Australia", "Second largest, about 786,000 sq km"],
            noteAmber: "CDS 2017 (II): larger than Borneo, Madagascar and Sumatra.",
            pyqExampleId: "ede2a27e-29b3-4082-84f5-5c492496ee27",
          },
          { cells: ["Borneo", "South-East Asia", "Third largest, about 748,000 sq km"] },
          { cells: ["Madagascar", "Indian Ocean, off Africa", "Fourth largest"] },
          { cells: ["Bermuda", "North Atlantic Ocean", "East of the United States, outside the Caribbean"] },
          {
            cells: ["Easter Island (Rapa Nui)", "South Pacific", "Part of Polynesia; a territory of Chile since 1888"],
            noteAmber: "CDS 2025 (I): both statements, Polynesia and Chile, are correct.",
            pyqExampleId: "39b0bff3-fa74-47f6-9ad6-6de3eab539ef",
          },
        ],
      },
      pyqExampleId: "6a33d7c0-ee37-43c8-bea1-f568698aebbf",
      practiceSet: [
        { prompt: "Which is the largest island in the world?", answer: "Greenland" },
        { prompt: "Which island is larger, New Guinea or Borneo?", answer: "New Guinea" },
        { prompt: "Which country does Easter Island belong to?", answer: "Chile" },
        { prompt: "On which side of the Pearl River estuary does Hong Kong stand?", answer: "The east side (Macau is on the west)" },
      ],
      traps: [
        {
          title: "Bermuda is not in the Caribbean",
          body: "**Bermuda** lies in the open **North Atlantic**, about 1,000 km east of the United States. The Caribbean Sea and the Gulf of Mexico are much farther south.",
        },
        {
          title: "New Guinea beats Borneo",
          body: "The two are close in size, but **New Guinea** (about 786,000 sq km) is second in the world and **Borneo** (about 748,000 sq km) third. Greenland is first.",
        },
        {
          title: "Easter Island is Chilean but Polynesian",
          body: "**Easter Island** is governed by **Chile**, a South American country, yet its people and culture belong to **Polynesia**. Both facts are true together.",
        },
      ],
    },
  ],
};
