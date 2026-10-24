import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_CL_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Climate Types",
  title: "Climate Types and Koppen's Scheme",
  oneLineDefinition:
    "How Koppen's capital and small letters name a climate, which Koppen types cover which parts of India, and how to recognise the world's climate types from their features.",
  whyItMatters:
    "Eleven CDS questions from 2018 to 2025: 8 MODERATE, 3 HARD. Five turn on Koppen's letters or names. Two 2025 items describe a climate in three statements, in NCERT's own words, and ask you to name it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgecl-koppen",
      name: "Koppen's letters",
      intuition:
        "Koppen sorted the world's climates by temperature and rain, the two things that decide what plants can grow. A capital letter gives the main group. A second letter gives the dry season (or, for dry climates, how dry). A third letter adds detail about heat or cold. Read the code one letter at a time.",
      definition:
        "Capital letters, the main groups (NCERT Class 11):\n" +
        "- **A** Tropical: coldest month 18 °C or warmer.\n" +
        "- **B** Dry: evaporation is more than precipitation. **BW** = **desert** (arid); **BS** = **steppe** (semi-arid).\n" +
        "- **C** Warm temperate (mid-latitude, also called **mesothermal**): coldest month between minus 3 °C and 18 °C.\n" +
        "- **D** Cold snow forest: coldest month minus 3 °C or colder.\n" +
        "- **E** Cold (polar): every month below 10 °C. **ET** = **tundra**; **EF** = **ice cap**, no month above 0 °C (interior Greenland and Antarctica).\n" +
        "- **H** Highland: cold because of height.\n\n" +
        "Small letters:\n" +
        "- **f** no dry season; **m** monsoon, a short dry season; **w** **winter** dry season; **s** **summer** dry season.\n" +
        "- In B climates, **h** = hot (subtropical) and **k** = cold (mid-latitude).",
      table: {
        columns: ["Code", "Name", "Main feature"],
        rows: [
          { cells: ["Af", "Tropical wet", "No dry season"] },
          { cells: ["Am", "Tropical monsoon", "Short dry season"] },
          {
            cells: ["Aw", "Tropical wet and dry (savanna)", "Winter dry season"],
            noteAmber: "CDS 2020 (II): Aw is the tropical savannah climate, not Am, Cwg or Dfc.",
            pyqExampleId: "749c8748-78b5-4512-bba4-622911dd8d3f",
          },
          { cells: ["BSh", "Subtropical steppe", "Low-latitude semi-arid"] },
          { cells: ["BWh", "Subtropical desert", "Low-latitude arid"] },
          {
            cells: ["BSk", "Mid-latitude steppe", "Mid-latitude semi-arid"],
            noteAmber: "CDS 2025 (II): three of four pairs from this table were right; marine west coast was wrongly given a severely cold summer.",
            pyqExampleId: "1ce97592-6f1f-4b7d-8ab4-e5cabcf5bd2d",
          },
          { cells: ["BWk", "Mid-latitude desert", "Mid-latitude arid"] },
          { cells: ["Cfa", "Humid subtropical", "No dry season, warm summer"] },
          { cells: ["Cs", "Mediterranean", "Dry, hot summer"] },
          { cells: ["Cfb", "Marine west coast", "No dry season, warm and cool summer"] },
          { cells: ["Df", "Humid continental", "No dry season, severe winter"] },
          { cells: ["Dw", "Subarctic (cold climate with dry winters)", "Winter dry and very severe"] },
          { cells: ["ET", "Tundra", "No true summer"] },
          { cells: ["EF", "Ice cap", "Perennial ice, no month above 0 °C"] },
        ],
      },
      pyqExampleId: "5d026a89-9022-4d31-bf62-288de950e229",
      selfCheckExample: {
        prompt: "Decode the Koppen type Cs one letter at a time, and name it.",
        steps: [
          "C is the warm temperate (mid-latitude) group: coldest month between minus 3 °C and 18 °C.",
          "s means the dry season comes in summer.",
          "A warm temperate climate with a dry summer and wet winter is the Mediterranean type.",
        ],
        answer: "Cs is the Mediterranean climate: warm temperate with a dry summer.",
      },
      practiceSet: [
        { prompt: "In Koppen's scheme, what does the small letter w mean?", answer: "A winter dry season" },
        { prompt: "What does EF stand for in Koppen's scheme?", answer: "The ice cap climate" },
        { prompt: "Which capital letter stands for tropical climates?", answer: "A" },
        { prompt: "In Koppen's scheme, what does the small letter f mean?", answer: "No dry season" },
      ],
      traps: [
        {
          title: "W is desert, S is steppe",
          body: "Inside the dry group B, capital **W** means **desert** (arid) and capital **S** means **steppe** (semi-arid). Do not mix them with the small **w** (winter dry season) and **s** (summer dry season).",
        },
        {
          title: "Marine west coast summers are mild",
          body: "Cfb, the marine west coast type, has **no dry season** and **mild** (warm and cool) summers. A 'severely cold summer' describes no Koppen C type.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-india-koppen",
      name: "Koppen types in India",
      intuition:
        "India spans hot deserts, wet coasts, the Ganga plain and the Himalaya, so it holds many Koppen types. The south, close to the sea and the equator, stays warm and even all year. The interior north swings between very hot and quite cold.",
      definition:
        "NCERT Class 11 (India: Physical Environment) map of Koppen types:\n" +
        "- **Amw**: the west coast **south of Goa** (monsoon with a short dry season).\n" +
        "- **As**: the **Coromandel coast** of Tamil Nadu (dry in summer, rain in winter).\n" +
        "- **Aw**: most of the **peninsular plateaus** south of the Tropic of Cancer (tropical savanna).\n" +
        "- **BShw**: north-western **Gujarat**, parts of western Rajasthan and Punjab (semi-arid steppe).\n" +
        "- **BWhw**: **extreme western Rajasthan** (hot desert).\n" +
        "- **Cwg**: the **Ganga plain**, eastern Rajasthan, northern Madhya Pradesh, most of the north-east.\n" +
        "- **Dfc**: **Arunachal Pradesh**. **E** (polar type): Jammu and Kashmir, Himachal Pradesh and Uttarakhand.\n\n" +
        "Sea versus interior:\n" +
        "- **South India**, near the sea on three sides and near the equator, has a **small daily and yearly range** of temperature and **high temperatures all year**: no extremes.\n" +
        "- The interior north has a **continental** climate: a large range between summer and winter.",
      table: {
        columns: ["Koppen type", "Region of India"],
        rows: [
          { cells: ["Amw", "West coast south of Goa"] },
          { cells: ["As", "Coromandel coast of Tamil Nadu"] },
          { cells: ["Aw", "Most of the peninsular plateaus"] },
          { cells: ["BShw", "North-western Gujarat, parts of western Rajasthan and Punjab"] },
          { cells: ["BWhw", "Extreme western Rajasthan"] },
          { cells: ["Cwg", "Ganga plain, eastern Rajasthan, northern Madhya Pradesh, most of the north-east"] },
          { cells: ["Dfc", "Arunachal Pradesh"] },
          { cells: ["E", "Jammu and Kashmir, Himachal Pradesh, Uttarakhand"] },
        ],
      },
      pyqExampleId: "d32cec1a-4ace-47e1-9137-6cc5167c2707",
      selfCheckExample: {
        prompt: "Chennai's coolest month is about 25 °C and its hottest about 33 °C. Delhi's run from about 14 °C to 34 °C. Why is Chennai's yearly range so much smaller?",
        steps: [
          "Chennai is on the coast, and the sea heats and cools slowly, which evens out the temperature.",
          "It is also nearer the equator, so the Sun is high all year.",
          "Delhi is far inland, with no sea to moderate it: a continental climate.",
        ],
        answer: "Chennai has the sea's moderating effect and a low latitude; Delhi is continental.",
      },
      practiceSet: [
        { prompt: "Which Koppen type covers the Coromandel coast of Tamil Nadu?", answer: "As" },
        { prompt: "Which Koppen type does NCERT give for the Ganga plain?", answer: "Cwg" },
        { prompt: "Which Indian state has the Dfc type?", answer: "Arunachal Pradesh" },
        { prompt: "Does South India have extreme climatic conditions?", answer: "No: its daily and yearly ranges are small and it is warm all year" },
      ],
      traps: [
        {
          title: "South India is not extreme",
          body: "Near the sea and the equator, South India has **small** daily and annual ranges and stays **hot all year**. 'Extreme climatic conditions' is the false statement about it.",
        },
        {
          title: "BWhw is only the far west",
          body: "The hot desert type **BWhw** covers only **extreme western Rajasthan**. The rest of the dry north-west (north-western Gujarat, parts of Rajasthan and Punjab) is the semi-arid **BShw**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-world-types",
      name: "World climate types from their features",
      intuition:
        "Many CDS items describe a climate in three statements and ask for its name. Each type has one tell-tale feature: the Mediterranean has its dry summer, the savanna its long dry season, the tundra its tiny summer, the Siberian type its winter high pressure.",
      definition:
        "The types CDS has described (NCERT Class 11):\n" +
        "- **Tropical wet and dry (Aw, savanna, 'Sudan type')**: hot all year; rain is **variable**, with a **short wet season** and a **longer dry season**. Found north and south of the Amazon forest (Brazil, Bolivia, **Paraguay**) and in **Sudan** and south of Central Africa.\n" +
        "- **Mediterranean (Cs)**: **dry, hot summer** and mild, **rainy winter**; on the west sides of continents between about 30° and 40°.\n" +
        "- **Cold climate with dry winters (Dw)**: mainly north-east **Asia**. Strong **winter anticyclones** that weaken in summer cause a **monsoon-like reversal** of wind; precipitation is low, about **12 to 15 cm**; summers get cooler polewards.\n" +
        "- **Tundra (ET)**: no true summer and a **very short warm growing season**, so **few species** live there: mosses, lichens, small shrubs.",
      table: {
        columns: ["Climate", "Tell-tale feature", "Where"],
        rows: [
          { cells: ["Tropical wet and dry (savanna)", "Short wet season, long dry season", "Sudan; Paraguay, Bolivia, Brazil"] },
          {
            cells: ["Mediterranean", "Dry summer, rainy winter", "West sides of continents, 30° to 40°"],
            noteAmber: "CDS 2019 (II): the most noticeable feature is the dry summer, not a dry winter.",
            pyqExampleId: "c590a205-d154-40a7-840d-0c3ca1edfd7e",
          },
          {
            cells: ["Cold climate with dry winters", "Winter anticyclone, monsoon-like wind reversal, 12 to 15 cm a year", "North-east Asia"],
            noteAmber: "CDS 2025 (II): named from three statements, ahead of tundra and steppe.",
            pyqExampleId: "b729d66b-4dbd-4ade-bdec-3b79008cc2bc",
          },
          {
            cells: ["Tundra", "Very short warm season, few species", "Arctic fringes of North America and Eurasia"],
            noteAmber: "CDS 2018 (I): low biodiversity, and the short warm season is the reason.",
            pyqExampleId: "849afdcb-dbfb-44fe-b2cf-635632aa311e",
          },
        ],
      },
      pyqExampleId: "4ddacbff-7547-43d8-9cd9-e3163e17502c",
      selfCheckExample: {
        prompt: "A city has warm, rainy winters around 10 °C and hot summers with almost no rain. It is on the west coast of a continent at 38° N. Name its climate type and Koppen code.",
        steps: [
          "Rain in winter and drought in summer is the reverse of the usual pattern.",
          "That reversal, on a west coast between 30° and 40°, is the mark of the Mediterranean type.",
          "In Koppen's scheme it is C (warm temperate) with s (summer dry).",
        ],
        answer: "Mediterranean climate, Koppen Cs.",
      },
      practiceSet: [
        { prompt: "Which climate type has a dry, hot summer and a rainy winter?", answer: "The Mediterranean" },
        { prompt: "Why does the tundra have few species?", answer: "Its warm growing season is very short" },
        { prompt: "About how much precipitation does the cold climate with dry winters get in a year?", answer: "About 12 to 15 cm" },
        { prompt: "In which continent is the cold climate with dry winters mainly found?", answer: "Asia (the north-east)" },
      ],
      traps: [
        {
          title: "The Mediterranean is dry in summer",
          body: "Most climates get their rain in summer. The Mediterranean is the exception: its summer is **dry** and its winter is **wet**. An option saying 'dry winter' is wrong.",
        },
        {
          title: "Monsoon-like winds outside the tropics",
          body: "A **monsoon-like reversal** of winds caused by **winter anticyclones** points to the **cold climate with dry winters** of north-east Asia, not to the tropical monsoon.",
        },
      ],
    },
  ],
};
