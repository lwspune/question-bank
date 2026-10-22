import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_WO_PEOPLE_NOTE: SubtopicNote = {
  subtopicName: "Population, Cities and Industry",
  title: "Population, Cities and Industry",
  oneLineDefinition:
    "The measures of population density and sex ratio, the population pyramid, the words NCERT uses for cities and settlements, and the cities and mines known for one industry.",
  whyItMatters:
    "Eleven CDS questions from 2017 to 2024: 1 EASY, 6 MODERATE, 4 HARD, the most HARD of any page in this chapter. Most test a term from NCERT's human geography (physiological density, primate city, gateway city), and two are city-and-industry match lists.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgewo-population",
      name: "Density, sex ratio and the population pyramid",
      intuition:
        "Every population measure is one number divided by another, and the name tells you which. Density divides people by land, so ask which land: all of it, or only the land that can be farmed. Sex ratio compares men and women, so ask which way round the country counts it.",
      definition:
        "Density (people per unit of land):\n" +
        "- **Arithmetic density**: total population ÷ total land area.\n" +
        "- **Physiological density**: total population ÷ **arable** (farmable) land. It shows the pressure of people on the land that feeds them.\n" +
        "- **Agricultural density**: **farm** population ÷ arable land.\n" +
        "Sex ratio (NCERT Class 12):\n" +
        "- In **India** it is **females per 1,000 males**. Some countries count it the other way, as males per 1,000 females.\n" +
        "- The world's sex ratio is about **102 males per 100 females**. **Asia has a low sex ratio**: fewer women than men, as in China and India.\n" +
        "The **population pyramid** shows **age groups** up the side and **males and females** on either side. A wide base means many children, so a high birth rate.\n" +
        "Language: most of **Central Asia** speaks Turkic languages (Uzbek, Kazakh, Kyrgyz, Turkmen) of the **Altaic** family.",
      table: {
        columns: ["Term", "How it is worked out or what it shows"],
        rows: [
          { cells: ["Arithmetic density", "Total population ÷ total land area"] },
          { cells: ["Physiological density", "Total population ÷ arable land"] },
          { cells: ["Agricultural density", "Farm population ÷ arable land"] },
          { cells: ["Sex ratio in India", "Females per 1,000 males"] },
          {
            cells: ["Sex ratio of Asia", "Low: fewer women than men"],
            noteAmber: "CDS 2019 (II): the false statement was that Asia has a high sex ratio.",
            pyqExampleId: "5ba32078-ec43-4154-9ced-01b960ada0af",
          },
          {
            cells: ["Population pyramid", "Age groups and the two sexes"],
            noteAmber: "CDS 2022 (I): it displays both age groups and sex.",
            pyqExampleId: "d4d71f38-7357-434d-b1e9-151f5ce7c2b8",
          },
          {
            cells: ["Main language family of Central Asia", "Altaic (Turkic languages)"],
            noteAmber: "CDS 2020 (I): Altaic, not Indo-European or Sino-Tibetan.",
            pyqExampleId: "bdf435dc-0542-45c1-b675-1dab3fe7d5aa",
          },
        ],
      },
      pyqExampleId: "8ef8dbbd-6439-4764-9e55-41b0e3aaa6a3",
      selfCheckExample: {
        prompt: "Nearly all of Egypt's people live on a narrow strip of farmland along the Nile, and most of the country is desert. Which is far higher for Egypt, its arithmetic density or its physiological density?",
        steps: [
          "Arithmetic density divides the people by all the land, desert included, so the number is small.",
          "Physiological density divides the same people by the farmland alone, which is a tiny area.",
        ],
        answer: "Its physiological density, many times over.",
      },
      practiceSet: [
        { prompt: "How is the sex ratio expressed in India?", answer: "Females per 1,000 males" },
        { prompt: "What is the world's sex ratio, as NCERT gives it?", answer: "About 102 males per 100 females" },
        { prompt: "What does a population pyramid with a very wide base show?", answer: "Many children: a high birth rate" },
        { prompt: "To which language family do Uzbek and Kazakh belong?", answer: "The Altaic family (Turkic branch)" },
      ],
      traps: [
        {
          title: "Physiological is everyone; agricultural is farmers only",
          body: "Both divide by **arable land**. **Physiological** density counts the **whole** population; **agricultural** density counts only the **farm** population. **Arithmetic** density uses all the land, not just arable land.",
        },
        {
          title: "Low sex ratio means fewer women",
          body: "When NCERT says **Asia has a low sex ratio**, it counts women per men: there are fewer women. Do not read 'low' as fewer men.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-cities",
      name: "Cities and settlement patterns",
      intuition:
        "Human geography names the shapes villages take and the jobs cities do. A village's shape follows whatever it is built along: a road, a river, a lake. A city's name in the textbook follows its role: the one giant city, the city at the country's door.",
      definition:
        "Settlement patterns (NCERT Class 12):\n" +
        "- **Linear**: along a road, railway, river or canal.\n" +
        "- **Circular**: around a **lake or tank**, with the houses facing the water.\n" +
        "- **Cross-shaped**: where two roads cross. Others are T-shaped, star-like and the double village on both banks of a river.\n" +
        "Kinds of city:\n" +
        "- **Primate city**: a country's largest city, many times bigger than the second. The idea is **Mark Jefferson**'s (1939). Bangkok is a standard example.\n" +
        "- **Central place theory** is **Christaller**'s, developed by **Lösch**.\n" +
        "- **Gateway city**: a city whose position links a country or region with others. It controls the entry and exit, so it dominates a wide area. Most are **ports**, and many were **colonial capitals**.\n" +
        "- **London** was the first city in the world to reach **one million** people, around **1810**.",
      table: {
        columns: ["Term", "Meaning", "Name to remember"],
        rows: [
          {
            cells: ["Primate city", "A country's largest city, far bigger than the second", "Mark Jefferson (1939)"],
            noteAmber: "CDS 2017 (II): Jefferson, not Christaller or Lösch.",
            pyqExampleId: "7b7fe901-19e7-4852-b82a-0464a5613bde",
          },
          { cells: ["Central place theory", "How towns serve the area around them", "Christaller; Lösch"] },
          {
            cells: ["Gateway city", "Links a country or region with the outside; most are ports", "Many were colonial capitals"],
            noteAmber: "CDS 2024 (I): all three statements about gateway cities were correct.",
            pyqExampleId: "ea923b2b-46a8-4e6f-baf9-a66c0fcfa5a4",
          },
          {
            cells: ["First million city", "The first city to reach one million people", "London, around 1810"],
            noteAmber: "CDS 2022 (I): London, not Paris or New York.",
            pyqExampleId: "1eebf81f-f09b-409d-9700-d8f3dff5a937",
          },
          { cells: ["Linear settlement", "Houses along a road, river or canal", "Follows the line"] },
          { cells: ["Circular settlement", "Houses around a lake or tank", "Faces the water"] },
          { cells: ["Cross-shaped settlement", "Houses where two roads meet", "Grows four ways"] },
        ],
      },
      pyqExampleId: "555b26fe-8dac-4722-afd5-0ba51fc9d3e2",
      selfCheckExample: {
        prompt: "Bangkok has many times the population of any other city in Thailand. Which idea from human geography describes it, and who gave that idea?",
        steps: [
          "A country's largest city that dwarfs the second city is called a primate city.",
          "The law of the primate city was set out by Mark Jefferson in 1939.",
        ],
        answer: "A primate city, an idea of Mark Jefferson.",
      },
      practiceSet: [
        { prompt: "Which settlement pattern grows along a road or a river?", answer: "Linear" },
        { prompt: "Which settlement pattern grows where two roads cross?", answer: "Cross-shaped" },
        { prompt: "Which geographer is linked with central place theory?", answer: "Walter Christaller" },
        { prompt: "What were many gateway cities in the past, besides being ports?", answer: "Colonial capitals (administrative centres)" },
      ],
      traps: [
        {
          title: "Jefferson, not Christaller",
          body: "The **primate city** belongs to **Mark Jefferson**. **Christaller** and **Lösch** gave central place theory, and **Griffith Taylor** a stage theory of towns; all three are offered as distractors.",
        },
        {
          title: "London, not Paris or New York",
          body: "**London** reached **one million** people first, around **1810**. Paris and New York came later.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-industry",
      name: "Industrial regions and famous mines",
      intuition:
        "These are match lists: a city or region against a country or a product. Each place is known for one thing, so learn them as pairs and the code falls out after two certain matches.",
      definition:
        "Industrial places CDS has asked:\n" +
        "- **Detroit** (Michigan, USA): **motor cars**.\n" +
        "- **Leipzig** (Saxony, **Germany**): an old industrial and trading city.\n" +
        "- **Lorraine** (**France**): iron ore and **steel**.\n" +
        "- **Cumberland** (north-west England, **UK**): an old coal and iron district.\n" +
        "- **Antwerp** (Belgium): **diamond cutting**.\n" +
        "- **Tokyo and Yokohama** (Japan): **shipbuilding**, among other heavy industry.\n" +
        "- **Harbin** (north-east China): heavy industry; matched with steel in the 2019 (I) list.\n" +
        "- The **Climax mine** in the Colorado Rockies, **USA**, was for decades the world's leading source of **molybdenum**.",
      table: {
        columns: ["Place", "Country", "Known for"],
        rows: [
          { cells: ["Detroit", "USA", "Motor cars"] },
          { cells: ["Leipzig", "Germany", "Old industrial and trading city"] },
          { cells: ["Lorraine", "France", "Iron ore and steel"] },
          { cells: ["Cumberland", "UK", "Old coal and iron district"] },
          {
            cells: ["Antwerp", "Belgium", "Diamond cutting"],
            noteAmber: "CDS 2019 (I) match: Detroit motor cars, Antwerp diamond cutting, Tokyo shipbuilding, Harbin steel.",
            pyqExampleId: "d2270165-12d4-4899-bfc3-cc48d7b24c69",
          },
          { cells: ["Tokyo and Yokohama", "Japan", "Shipbuilding"] },
          {
            cells: ["Climax mine", "USA (Colorado)", "Molybdenum"],
            noteAmber: "CDS 2020 (II): the Climax mine is in the USA, not Canada.",
            pyqExampleId: "b71fd3a9-2b5c-427b-83db-d4aca17dd007",
          },
        ],
      },
      pyqExampleId: "094e8928-7fd2-46bd-a42c-643f8c96abf6",
      practiceSet: [
        { prompt: "Which metal is the Climax mine famous for?", answer: "Molybdenum" },
        { prompt: "Which Belgian city is a world centre of diamond cutting?", answer: "Antwerp" },
        { prompt: "Which Japanese cities are known for shipbuilding?", answer: "Tokyo and Yokohama" },
      ],
      traps: [
        {
          title: "Cumberland is English",
          body: "The **Cumberland** of the industrial match list is the old coal and iron district of north-west **England**, not a place in the United States.",
        },
        {
          title: "Climax is in Colorado",
          body: "The **Climax** molybdenum mine is in the Rocky Mountains of **Colorado, USA**. Canada, Australia and South Africa are offered because they are big mining countries too.",
        },
      ],
    },
  ],
};
