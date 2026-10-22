import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_OC_FLOOR_NOTE: SubtopicNote = {
  subtopicName: "Sea Floor, Salinity and Coral Reefs",
  title: "Sea Floor, Salinity and Coral Reefs",
  oneLineDefinition:
    "The steps of the ocean floor from the shelf down to the trenches, how salty sea water is and which salts it holds, and where and why coral reefs grow.",
  whyItMatters:
    "Nine CDS questions from 2018 to 2025: 4 EASY, 3 MODERATE, 2 HARD. Five of them are about coral reefs, and both HARD items are single named facts: an undersea plateau and the order of three salts in sea water.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeoc-relief",
      name: "Relief of the ocean floor",
      intuition:
        "Walk out from a beach under the sea and the floor drops in steps. First a wide, shallow shelf, then a steep slope, then a huge flat plain far below. Here and there the plain is cut by narrow trenches, the deepest places on Earth, and raised by ridges, plateaus and lone undersea mountains.",
      definition:
        "The major divisions, from the coast outwards:\n" +
        "- **Continental shelf**: the shallow, gently sloping edge of a continent, down to about **200 m**. The richest fishing grounds lie here.\n" +
        "- **Continental slope**: the steep drop from about 200 m to about **3,000 m**.\n" +
        "- **Deep sea plain** (abyssal plain): the flat floor, about **3,000 to 6,000 m** deep, covered with fine sediment.\n" +
        "- **Oceanic deeps or trenches**: long, narrow, very deep cuts, mostly in the **Pacific** where plates meet. The **Mariana Trench** in the western Pacific holds the **Challenger Deep**, nearly **11,000 m**, the deepest point of any ocean.\n" +
        "The minor features: **mid-ocean ridges** (undersea mountain chains, such as the Mid-Atlantic Ridge), **seamounts** (lone volcanic peaks), **guyots** (flat-topped seamounts), **submarine canyons** and **undersea plateaus**.",
      table: {
        columns: ["Feature", "What it is", "Example"],
        rows: [
          { cells: ["Continental shelf", "Shallow edge of a continent, to about 200 m", "Grand Banks off Newfoundland"] },
          { cells: ["Continental slope", "Steep drop from about 200 m to 3,000 m", "Edge of every continental shelf"] },
          { cells: ["Deep sea plain", "Flat floor about 3,000 to 6,000 m deep", "Floors of all the great oceans"] },
          {
            cells: ["Trench", "Narrow, very deep cut where plates meet", "Mariana Trench (Challenger Deep, nearly 11,000 m), western Pacific"],
            noteAmber: "CDS 2020 (II): the Mariana Trench is the deepest point, ahead of the Tonga, Kermadec and Philippine trenches.",
            pyqExampleId: "2aae2eeb-02fb-41fa-bdd8-2eb0e9b0a5fc",
          },
          { cells: ["Mid-ocean ridge", "Long undersea mountain chain", "Mid-Atlantic Ridge"] },
          { cells: ["Guyot", "A seamount with a flat top", "Common in the Pacific"] },
          {
            cells: ["Undersea plateau", "A broad raised block of the floor", "Amsterdam and St. Paul Plateau, southern Indian Ocean"],
            noteAmber: "CDS 2025 (II): the Amsterdam and St. Paul Plateau is in the southern Indian Ocean.",
            pyqExampleId: "51b4ae1c-a4c0-4e84-b999-6a1ebadab5ec",
          },
        ],
      },
      pyqExampleId: "2aae2eeb-02fb-41fa-bdd8-2eb0e9b0a5fc",
      selfCheckExample: {
        prompt:
          "A ship's echo sounder shows the depth growing slowly to about 200 m, then falling fast to about 3,000 m. Which two parts of the ocean floor has the ship crossed?",
        steps: [
          "The gentle, shallow part down to about 200 m is the edge of the continent under the sea.",
          "The steep fall from about 200 m to about 3,000 m is the next step down.",
        ],
        answer: "The continental shelf, then the continental slope.",
      },
      practiceSet: [
        { prompt: "Which part of the ocean floor is the shallowest, next to the coast?", answer: "The continental shelf" },
        { prompt: "What is a seamount with a flat top called?", answer: "A guyot" },
        { prompt: "Name the undersea mountain chain that runs down the middle of the Atlantic Ocean.", answer: "The Mid-Atlantic Ridge" },
        { prompt: "About how deep is the deep sea plain?", answer: "About 3,000 to 6,000 m" },
      ],
      traps: [
        {
          title: "Deep is not deepest",
          body: "The Tonga, Kermadec and Philippine trenches are all very deep, and all in the Pacific. The deepest point of all is the **Challenger Deep in the Mariana Trench**, nearly 11,000 m down.",
        },
        {
          title: "Amsterdam and St. Paul is in the Indian Ocean",
          body: "The **Amsterdam and St. Paul Plateau** lies in the **southern Indian Ocean**, carrying two small French islands. Do not place it in the Atlantic because the name sounds European.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeoc-salinity",
      name: "Salinity and the salts in sea water",
      intuition:
        "Sea water is salty because rivers have carried dissolved salts into the sea for millions of years, and evaporation takes away only the water. More evaporation makes water saltier; more rain, river water or melting ice makes it fresher. Common salt is by far the biggest share of what is dissolved.",
      definition:
        "Salinity and what changes it:\n" +
        "- **Salinity** is the weight of dissolved salt in 1,000 g of sea water, given in **parts per thousand** (‰). The open ocean averages about **35‰**.\n" +
        "- **Isohalines** are lines on a map joining places of **equal salinity** (halos is Greek for salt).\n" +
        "- **Raises salinity**: strong evaporation (hot, dry, cloudless seas such as the **Red Sea** and the **Mediterranean**).\n" +
        "- **Lowers salinity**: rain, rivers and melting ice (the **Baltic Sea**, fed by many rivers, is very fresh).\n" +
        "- Of all the salt dissolved in sea water, **sodium chloride** is about three quarters. The rest, in falling order, is magnesium chloride, magnesium sulphate, calcium sulphate, potassium sulphate and calcium carbonate.",
      table: {
        columns: ["Salt", "Share of the dissolved salts"],
        rows: [
          { cells: ["Sodium chloride", "About 77.8%"] },
          {
            cells: ["Magnesium chloride", "About 10.9%"],
            noteAmber: "CDS 2025 (I): ascending order is calcium carbonate, calcium sulphate, magnesium chloride.",
            pyqExampleId: "60f9927b-cc0f-43fb-9daa-33357039bfdc",
          },
          { cells: ["Magnesium sulphate", "About 4.7%"] },
          { cells: ["Calcium sulphate", "About 3.6%"] },
          { cells: ["Potassium sulphate", "About 2.5%"] },
          { cells: ["Calcium carbonate", "About 0.3%"] },
        ],
        caption: "Sea water itself is about 3.5% salt, so these are shares of the salt, not of the water.",
      },
      pyqExampleId: "60f9927b-cc0f-43fb-9daa-33357039bfdc",
      selfCheckExample: {
        prompt: "Why is the Red Sea much saltier than the Baltic Sea?",
        steps: [
          "The Red Sea lies in a hot, dry desert belt, so evaporation is strong and almost no river flows into it.",
          "The Baltic Sea is cool, so evaporation is weak, and many rivers pour fresh water into it.",
          "Evaporation removes water and leaves the salt behind; fresh water dilutes it.",
        ],
        answer: "Heavy evaporation and no rivers raise the Red Sea's salinity; weak evaporation and many rivers keep the Baltic fresh.",
      },
      practiceSet: [
        { prompt: "What is the average salinity of the open ocean?", answer: "About 35 parts per thousand" },
        { prompt: "What do isohalines join on a map?", answer: "Places of equal salinity" },
        { prompt: "Which salt is the largest share of the salts dissolved in sea water?", answer: "Sodium chloride (common salt)" },
        { prompt: "Does heavy rainfall raise or lower the salinity of the sea?", answer: "It lowers it" },
      ],
      traps: [
        {
          title: "Iso-lines by their root",
          body: "An **isohaline** joins equal salinity, an **isotherm** equal temperature, an **isobar** equal pressure and an **isohyet** equal rainfall. The root halos means salt.",
        },
        {
          title: "Shares of the salt, not of the water",
          body: "Sodium chloride is about 78% of the **dissolved salt**, not 78% of sea water. Sea water as a whole is only about 3.5% salt.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeoc-coral-growth",
      name: "How coral reefs grow",
      intuition:
        "A coral reef is built by tiny animals called polyps, which make limestone skeletons. Tiny algae live inside them and feed them by photosynthesis, so a reef needs sunlight. That one fact explains the rest: the water must be shallow, clear, warm and salty, and a coral dies in fresh or muddy water.",
      definition:
        "What a reef needs:\n" +
        "- **Warm water**: best at about **23 to 25 °C**; no reefs where the water falls below about 20 °C.\n" +
        "- **Shallow water**: not deeper than about **50 m**, so sunlight reaches the algae.\n" +
        "- **Salt water** that is **clear** and free of mud: fresh water and silt kill the polyps.\n" +
        "The three kinds of reef:\n" +
        "- **Fringing reef**: close to the shore of an island or continent.\n" +
        "- **Barrier reef**: parallel to the coast but separated from it by a wide lagoon. The largest is the **Great Barrier Reef**.\n" +
        "- **Atoll**: a ring of coral around a lagoon with no island in the middle. The **Lakshadweep** islands are atolls.\n" +
        "A **coral island** is built by reefs; an island made by volcanoes or cut off from a continent is not a coral island.",
      table: {
        columns: ["Condition", "What corals need", "Why"],
        rows: [
          { cells: ["Temperature", "Warm, about 23 to 25 °C", "Polyps die in cold water"] },
          { cells: ["Depth", "Shallow, not deeper than about 50 m", "Sunlight must reach the algae"] },
          {
            cells: ["Salinity", "Salt water only", "Fresh water kills the polyps"],
            noteAmber: "CDS 2018 (II): 'coral can grow abundantly in freshwater' is the wrong statement.",
            pyqExampleId: "9d76adc5-23b1-4669-999f-90499c90ed40",
          },
          { cells: ["Clarity", "Clear water, free of silt", "Mud blocks light and smothers the polyps"] },
          { cells: ["Sunlight", "Plenty of it", "The algae inside the coral photosynthesise"] },
        ],
      },
      pyqExampleId: "9d76adc5-23b1-4669-999f-90499c90ed40",
      selfCheckExample: {
        prompt: "Coral reefs are common in tropical seas but rare near the mouths of big rivers in the same seas. Why?",
        steps: [
          "A river mouth brings in fresh water, which lowers the salinity.",
          "It also brings mud, which makes the water cloudy and cuts off sunlight.",
          "Corals need salty, clear, sunlit water, so they cannot grow there.",
        ],
        answer: "River water is fresh and muddy; corals need salty, clear water with sunlight.",
      },
      practiceSet: [
        { prompt: "What is a ring of coral around a lagoon, with no island in the middle, called?", answer: "An atoll" },
        { prompt: "Which kind of reef is separated from the coast by a wide lagoon?", answer: "A barrier reef" },
        { prompt: "Why do coral reefs need sunlight?", answer: "The algae living inside the coral make food by photosynthesis" },
        { prompt: "Below about what depth do reef-building corals stop growing?", answer: "About 50 m" },
      ],
      traps: [
        {
          title: "A fringing reef touches the shore",
          body: "A **fringing** reef grows right at the shore. A **barrier** reef runs parallel to it across a wide lagoon. An **atoll** is a ring with no island inside. Keep the three apart by how far they sit from land.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeoc-coral-places",
      name: "Where coral reefs are",
      intuition:
        "India has four reef areas: two gulfs on the mainland coast and two island groups. One more gulf on the west coast, Khambhat, has none, because its water is muddy. Outside India, the giant is Australia's Great Barrier Reef.",
      definition:
        "Reefs in India:\n" +
        "- **Gulf of Kachchh** (Gujarat) and **Gulf of Mannar** (Tamil Nadu), on the mainland coast.\n" +
        "- **Lakshadweep**: coral atolls in the Arabian Sea.\n" +
        "- **Andaman and Nicobar Islands**: fringing reefs, the **largest reef area in India**. Swaraj Dweep (once Havelock Island) has coral reefs.\n" +
        "- **No reefs in the Gulf of Khambhat** (Cambay): a very large tidal range and heavy silt from rivers keep its water muddy.\n" +
        "Abroad:\n" +
        "- **Great Barrier Reef**: the world's largest barrier reef system, over 2,000 km long in the Coral Sea, off **Queensland** on Australia's **north-eastern (east) coast**.\n" +
        "- **Rainbow Reef**, Fiji: a well-known soft-coral reef.",
      table: {
        columns: ["Reef area", "Where", "Note"],
        rows: [
          {
            cells: ["Andaman and Nicobar Islands", "Bay of Bengal", "Largest reef area in India; fringing reefs"],
            noteAmber: "CDS 2022 (II): largest area under coral reefs among the states and union territories.",
            pyqExampleId: "0fe71bf6-a7e4-4884-9404-f188211d005d",
          },
          { cells: ["Lakshadweep", "Arabian Sea", "Coral atolls"] },
          { cells: ["Gulf of Mannar", "Tamil Nadu", "Reefs around small islands near the coast"] },
          { cells: ["Gulf of Kachchh", "Gujarat", "Reefs in the Marine National Park near Jamnagar"] },
          {
            cells: ["Gulf of Khambhat (Cambay)", "Gujarat", "No reefs: muddy water and a huge tidal range"],
            noteAmber: "CDS 2019 (II): the Gulf of Cambay is the region without coral reefs.",
            pyqExampleId: "529ea9cb-f0eb-437d-9e04-a9e34af6ab1b",
          },
          {
            cells: ["Great Barrier Reef", "Coral Sea, off Queensland, east coast of Australia", "World's largest barrier reef system"],
            noteAmber: "CDS 2020 (II): it lies off the east coast of Australia.",
            pyqExampleId: "da9abbbd-2708-4e7c-964d-1954c0581be8",
          },
          {
            cells: ["Kyushu", "Japan", "Not a coral island: one of Japan's four main islands, made by volcanoes"],
            noteAmber: "CDS 2020 (II): Kyushu is the odd one out against the Great Barrier Reef, Rainbow Reef and Swaraj Island.",
            pyqExampleId: "c32992c3-f999-44ef-951b-8eba045d2103",
          },
        ],
      },
      pyqExampleId: "529ea9cb-f0eb-437d-9e04-a9e34af6ab1b",
      selfCheckExample: {
        prompt: "Which Indian island group is made of coral atolls, and in which sea does it lie?",
        steps: [
          "An atoll is a ring of coral around a lagoon.",
          "India's atoll group is the one off the Kerala coast, in the Arabian Sea.",
        ],
        answer: "Lakshadweep, in the Arabian Sea.",
      },
      practiceSet: [
        { prompt: "In which state is the Gulf of Mannar?", answer: "Tamil Nadu" },
        { prompt: "Off which Australian state does the Great Barrier Reef lie?", answer: "Queensland" },
        { prompt: "What was Swaraj Dweep in the Andamans called before it was renamed?", answer: "Havelock Island" },
        { prompt: "Which of India's reef areas has the largest area of reefs?", answer: "The Andaman and Nicobar Islands" },
      ],
      traps: [
        {
          title: "Kachchh has reefs, Khambhat does not",
          body: "Both gulfs are in Gujarat. The **Gulf of Kachchh** has coral reefs; the **Gulf of Khambhat** (Cambay) has none, because its water is muddy.",
        },
        {
          title: "Largest reef area is the Andamans, not Lakshadweep",
          body: "Lakshadweep is the island group made of coral, but the **largest area under reefs** is around the **Andaman and Nicobar Islands**.",
        },
      ],
    },
  ],
};
