import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_WO_COUNTRIES_NOTE: SubtopicNote = {
  subtopicName: "Countries and Borders",
  title: "Countries and Borders",
  oneLineDefinition:
    "Which countries touch Ukraine and Russia, the states of the Arabian Peninsula and the lines around Afghanistan, and the places, old names and national symbols CDS ties to a country.",
  whyItMatters:
    "Eleven CDS questions from 2016 to 2025: 3 EASY and 8 MODERATE. Four ask about borders and regions (Ukraine's neighbours twice, the Arabian Peninsula, the Durand Line), and all four came in 2024 or 2025.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgewo-ukraine",
      name: "Ukraine, Russia and their neighbours",
      intuition:
        "Draw the map once in your head: Russia to the east, Belarus to the north, and a ring of central European countries to the west and south-west. Then remember Kaliningrad, the piece of Russia cut off on the Baltic coast between Poland and Lithuania, because it gives two more countries a border with Russia.",
      definition:
        "Ukraine has **seven** land neighbours:\n" +
        "- **Russia** (east and north-east) and **Belarus** (north).\n" +
        "- **Poland**, **Slovakia** and **Hungary** (west).\n" +
        "- **Romania** and **Moldova** (south-west).\n" +
        "Countries CDS has offered that do **not** touch Ukraine: **Lithuania**, **Latvia** and **Estonia**. Belarus lies between them and Ukraine.\n" +
        "**Kaliningrad** is a Russian exclave on the Baltic coast, wedged between **Poland** and **Lithuania**, so both of them border Russia there. Belarus borders the Russian mainland.",
      table: {
        columns: ["Country", "Borders Ukraine?", "Borders Russia?"],
        rows: [
          { cells: ["Belarus", "Yes, to Ukraine's north", "Yes, the Russian mainland"] },
          { cells: ["Poland", "Yes, to Ukraine's west", "Only the Kaliningrad exclave"] },
          {
            cells: ["Lithuania", "No, Belarus lies between them", "Only the Kaliningrad exclave"],
            noteAmber: "CDS 2025 (I): Lithuania, not Poland, Romania or Belarus, is the one that does not border Ukraine.",
            pyqExampleId: "ac79d0b6-7f59-44b9-9ac4-c14d5bd1b239",
          },
          { cells: ["Latvia", "No", "Yes, the Russian mainland"] },
          { cells: ["Estonia", "No", "Yes, the Russian mainland"] },
          { cells: ["Romania", "Yes, to Ukraine's south-west", "No"] },
          { cells: ["Moldova", "Yes, wedged between Romania and Ukraine", "No"] },
          { cells: ["Slovakia and Hungary", "Yes, to Ukraine's west", "No"] },
        ],
      },
      pyqExampleId: "ac79d0b6-7f59-44b9-9ac4-c14d5bd1b239",
      practiceSet: [
        { prompt: "How many countries share a land border with Ukraine?", answer: "Seven" },
        { prompt: "Besides Poland, which two countries border Ukraine on its west?", answer: "Slovakia and Hungary" },
        { prompt: "Name the Russian exclave on the Baltic coast between Poland and Lithuania.", answer: "Kaliningrad" },
        { prompt: "Which small country lies between Romania and Ukraine?", answer: "Moldova" },
      ],
      traps: [
        {
          title: "The Baltic states do not reach Ukraine",
          body: "**Lithuania**, **Latvia** and **Estonia** all lie north of **Belarus**, which separates them from Ukraine. Of the three, Latvia and Estonia border the Russian mainland.",
        },
        {
          title: "Kaliningrad gives Poland a Russian border",
          body: "**Poland** does not touch the Russian mainland, but it does border Russia's **Kaliningrad** exclave on the Baltic. So does **Lithuania**. Read a 'borders Russia' option with this in mind.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-west-asia",
      name: "The Arabian Peninsula, Jordan and Afghanistan",
      intuition:
        "The Arabian Peninsula is a fixed list of seven states, so learn the seven and anything else is outside it. Jordan sits just north of the peninsula and has a tiny coast, which is the fact CDS uses to catch you. Afghanistan's facts are its border lines and the bases foreign armies used there.",
      definition:
        "West Asia:\n" +
        "- The **Arabian Peninsula** has seven states: **Saudi Arabia, Yemen, Oman, the UAE, Qatar, Bahrain and Kuwait**.\n" +
        "- **Jordan** lies north of the peninsula, in the Levant. It was created as Transjordan under the **British Mandate** after the First World War.\n" +
        "- Jordan is **not landlocked**: it has a short coast at **Aqaba**, on the Gulf of Aqaba, an arm of the Red Sea.\n" +
        "Afghanistan:\n" +
        "- The **Durand Line**, drawn in **1893** by Sir Mortimer Durand between British India and Afghanistan, is now the **Afghanistan and Pakistan** border.\n" +
        "- **Bagram Air Base**, north of Kabul, was the largest American base in Afghanistan until foreign troops left in **2021**.",
      table: {
        columns: ["Place or line", "Where", "Remember"],
        rows: [
          { cells: ["Arabian Peninsula", "South-west Asia", "Saudi Arabia, Yemen, Oman, UAE, Qatar, Bahrain, Kuwait"] },
          {
            cells: ["Jordan", "North of the peninsula, in the Levant", "Created under the British Mandate; coast at Aqaba"],
            noteAmber: "CDS 2025 (I): created through the British Mandate, yes; landlocked, no.",
            pyqExampleId: "e4b2d012-2aa8-4f30-8531-f6215029bf53",
          },
          {
            cells: ["Durand Line", "Afghanistan and Pakistan", "Drawn in 1893 by Sir Mortimer Durand"],
            noteAmber: "CDS 2025 (II): Afghanistan and Pakistan, not India and Pakistan.",
            pyqExampleId: "af14fc1e-1b1d-4f85-bd57-95e161357356",
          },
          {
            cells: ["Bagram Air Base", "Afghanistan, north of Kabul", "The largest American base there until 2021"],
            noteAmber: "CDS 2021 (II): Bagram is in Afghanistan.",
            pyqExampleId: "1f0ce6dc-11b9-4863-ba29-7d91fa452b7a",
          },
        ],
      },
      pyqExampleId: "dc5ec3c0-2761-4a1d-8fbb-d62f8c255d06",
      selfCheckExample: {
        prompt: "Jordan's only coastline is about 26 km long, at the port of Aqaba. A statement says Jordan is a landlocked country. Is it true?",
        steps: [
          "A landlocked country has no coastline at all.",
          "Jordan's coast at Aqaba is short, but it is a real coast on the Gulf of Aqaba, an arm of the Red Sea.",
        ],
        answer: "False: Jordan has a coastline, so it is not landlocked.",
      },
      practiceSet: [
        { prompt: "Which two countries does the Durand Line separate today?", answer: "Afghanistan and Pakistan" },
        { prompt: "In which country is Bagram Air Base?", answer: "Afghanistan" },
        { prompt: "Under which power's mandate was Transjordan created after the First World War?", answer: "Britain" },
      ],
      traps: [
        {
          title: "Jordan is next to the peninsula, not in it",
          body: "**Jordan** borders Saudi Arabia but lies north of the peninsula, in the Levant. The seven peninsula states are Saudi Arabia, Yemen, Oman, the UAE, Qatar, Bahrain and Kuwait.",
        },
        {
          title: "A short coast still counts",
          body: "**Jordan** has only a short coast at **Aqaba**, but that is enough: it is **not** landlocked.",
        },
        {
          title: "The Durand Line is not India's border",
          body: "The **Durand Line** was drawn between British India and Afghanistan, and today it is the **Afghanistan and Pakistan** border. The India and Pakistan line drawn in 1947 is the Radcliffe Line.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-places",
      name: "Places, old names and national symbols",
      intuition:
        "These questions give a clue (a city, a treaty, a fish, three place names) and ask for the country. The clue is the whole question, so learn each one as a pair: clue and country.",
      definition:
        "Pairs CDS has asked:\n" +
        "- **Edo** was the old name of **Tokyo**. It was renamed when the emperor moved there after the **Meiji Restoration of 1868**.\n" +
        "- The **hilsa** (ilish) is the national fish of **Bangladesh**.\n" +
        "- **Cartagena**, the city that gave its name to the **Protocol on Biosafety** (2000), is in **Colombia**.\n" +
        "- **Stewart Island**, the **Bay of Plenty** and **Hawke Bay** are all in **New Zealand**.\n" +
        "- The **South China Sea** dispute: **China, Vietnam, Malaysia**, the Philippines, Brunei and Taiwan claim islands there. **Indonesia** is not a claimant; it objects only where China's line overlaps its own waters near the Natuna Islands.",
      table: {
        columns: ["Clue", "Answer"],
        rows: [
          {
            cells: ["Earlier name of Tokyo", "Edo, renamed after the Meiji Restoration of 1868"],
            noteAmber: "CDS 2016 (II): Edo, not Kyoto or Osaka.",
            pyqExampleId: "b3205483-dad6-4041-9c07-926fa3bde113",
          },
          {
            cells: ["National fish of Bangladesh", "Hilsa (ilish)"],
            noteAmber: "CDS 2020 (I): the hilsa is Bangladesh's national fish.",
            pyqExampleId: "e18f46c3-c716-493f-af44-4b2e1eee89e8",
          },
          {
            cells: ["Cartagena of the Protocol on Biosafety", "Colombia"],
            noteAmber: "CDS 2019 (I): Colombia, not Venezuela or Brazil.",
            pyqExampleId: "4abb9c13-9df4-4825-b47f-f772d0f2f026",
          },
          { cells: ["Stewart Island, Bay of Plenty, Hawke Bay", "New Zealand"] },
          {
            cells: ["Claimants in the South China Sea", "China, Vietnam, Malaysia, the Philippines, Brunei, Taiwan"],
            noteAmber: "CDS 2019 (I): China, Vietnam and Malaysia, not Indonesia.",
            pyqExampleId: "396d0be7-be3c-45f5-a1c0-291f29d9a4bb",
          },
        ],
      },
      pyqExampleId: "6675f367-bd41-4408-85f4-ed8f07ee635c",
      selfCheckExample: {
        prompt: "Indonesia's Natuna Islands lie at the southern edge of the South China Sea. Why is Indonesia still not counted among the claimants in the South China Sea dispute?",
        steps: [
          "The claimants are the countries that claim ownership of the disputed islands, such as the Spratlys.",
          "Indonesia claims none of those islands. It only objects where China's line overlaps the sea zone around its own Natuna Islands.",
        ],
        answer: "It claims none of the disputed islands; its quarrel is only about its own waters.",
      },
      practiceSet: [
        { prompt: "What was Tokyo called before the Meiji Restoration of 1868?", answer: "Edo" },
        { prompt: "Of which country is the hilsa the national fish?", answer: "Bangladesh" },
        { prompt: "In which country is the Cartagena that gave its name to the Protocol on Biosafety?", answer: "Colombia" },
      ],
      traps: [
        {
          title: "Two Cartagenas",
          body: "There is a **Cartagena** in Spain too. The one that hosted the biosafety talks, and gave the **Cartagena Protocol** its name, is on the Caribbean coast of **Colombia**.",
        },
        {
          title: "Edo, not Kyoto",
          body: "**Kyoto** was the old imperial capital of Japan, a different city. **Edo** is the old name of **Tokyo** itself.",
        },
      ],
    },
  ],
};
