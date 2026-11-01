import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIE_INDUSTRIES_NOTE: SubtopicNote = {
  subtopicName: "Manufacturing Industries",
  title: "Manufacturing Industries",
  oneLineDefinition:
    "India's iron and steel plants and their firsts, the ways industries are classified (by owner, raw material, weight and use), and the textile, sugar, fertiliser, aluminium and chemical industries.",
  whyItMatters:
    "Twenty-six questions in the bank: six from the 2023 shifts, eight from the 2024 shifts and 12 from the 2025 shifts. The 2025 papers asked how industries are classified, as 'which pair is correctly grouped' questions, so learn each classification with two examples.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgieid-steel",
      name: "Iron and steel",
      intuition:
        "Steel needs iron ore, coal and limestone, which are heavy to move, so the plants sit where these are found: on and around the Chota Nagpur plateau. SSC asks which plant came first and where each stands.",
      definition:
        "The facts:\n" +
        "- Iron and steel is a **heavy industry**: bulky raw materials (iron ore, coking coal, limestone) and heavy products.\n" +
        "- Most plants lie on the **Chota Nagpur plateau**, which holds all three raw materials.\n" +
        "- **TISCO, Jamshedpur (1907)**: the **oldest** of India's steel companies.\n" +
        "- **IISCO (1918)**: first factory at **Hirapur** (now Burnpur, near Asansol), on the Kolkata-Asansol line; now part of SAIL.\n" +
        "- **Rourkela (Odisha)**, built with **German** help and started in 1959, is the **first integrated public-sector** steel plant.",
      table: {
        columns: ["Plant", "Place", "Fact"],
        rows: [
          { cells: ["TISCO", "Jamshedpur, 1907", "Oldest steel company"], pyqExampleId: "2f7815c6-0769-413d-9dd7-7443d7fa3640" },
          { cells: ["IISCO", "Hirapur (Burnpur), 1918", "Now part of SAIL"], pyqExampleId: "9b1d355e-7ad9-47cb-b5ca-f2b064d3059f" },
          { cells: ["Rourkela", "Odisha, 1959", "German help; first public-sector plant"], pyqExampleId: "74e67df4-f845-4358-9df2-796104ba7397" },
        ],
      },
      pyqExampleId: "489a6949-a848-45cc-9ff5-ca8ce58c658d",
      selfCheckExample: {
        prompt: "Why are so many steel plants on the Chota Nagpur plateau?",
        steps: ["Steel needs iron ore, coal and limestone, all heavy to carry.", "The plateau has all three, so plants are built close to them."],
        answer: "The raw materials are found there.",
      },
      practiceSet: [
        { prompt: "Which is India's oldest iron and steel company?", answer: "TISCO, Jamshedpur (1907)" },
        { prompt: "With which country's help was the Rourkela plant built?", answer: "Germany" },
        { prompt: "Which region has the most iron and steel plants?", answer: "The Chota Nagpur plateau" },
      ],
      traps: [
        {
          title: "Heavy because of its raw materials",
          body: "Iron and steel is heavy because of **iron ore, coal and limestone**. A reason naming cotton or rubber is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgieid-types",
      name: "How industries are classified",
      intuition:
        "One industry can be described four ways: who owns it, what it uses, how heavy it is, and who uses what it makes. SSC gives pairs and asks which pair is correctly grouped, so know two examples in each box.",
      definition:
        "By **owner**:\n" +
        "- **Public**: the government, such as **BHEL** and SAIL. **Private**: TISCO, Bajaj Auto, Dabur.\n" +
        "- **Joint**: State and private together, such as **Oil India Ltd**. **Cooperative**: owned by producers or workers who **share profits and losses**, such as Maharashtra's sugar mills.\n\n" +
        "By **raw material**: **agro-based** (cotton textiles, **sugar**, jute, edible oil) and **mineral-based** (cement, steel, aluminium, petrochemicals).\n\n" +
        "By **weight**: **heavy** (iron and steel, **shipbuilding, automobiles**) and **light** (light materials into consumer goods: bulbs, sewing machines, watches).\n\n" +
        "By **use**: **basic** industries feed others (iron and steel, aluminium and copper smelting); **consumer goods** industries make things people use (**toothpaste**, soap).\n\n" +
        "NCERT's major industrial regions include **Chota Nagpur**, Hugli, Mumbai-Pune and Gujarat.",
      table: {
        columns: ["Classification", "Example"],
        rows: [
          { cells: ["Public sector", "BHEL"], pyqExampleId: "a1240472-b9eb-44f9-b0fa-06bef293c9b4" },
          { cells: ["Joint sector", "Oil India Ltd"], pyqExampleId: "cc673eea-d7ee-433c-b23b-30f474f86121" },
          { cells: ["Cooperative", "Sugar mills owned by growers"], pyqExampleId: "08d87b2b-5933-4e36-9207-7842dab1cb49" },
          { cells: ["Heavy", "Shipbuilding, automobiles"], pyqExampleId: "6c2e4976-21ad-44c5-8de2-e0cdb33a0d97" },
          { cells: ["Consumer goods", "Toothpaste"], pyqExampleId: "41e305cf-1b0a-4780-ae5d-d05c891dd759" },
        ],
      },
      pyqExampleId: "2ecb8afe-0548-402f-b554-bf14a408f061",
      selfCheckExample: {
        prompt: "Classify a toothpaste factory by use and a shipyard by weight.",
        steps: ["Toothpaste is used directly by people, so it is a consumer goods industry.", "Ships are bulky goods made from heavy materials, so a shipyard is a heavy industry."],
        answer: "Toothpaste: consumer goods. Shipyard: heavy industry.",
      },
      practiceSet: [
        { prompt: "Give an example of a joint sector industry.", answer: "Oil India Limited" },
        { prompt: "Is BHEL a public or private sector industry?", answer: "Public sector" },
        { prompt: "What do the members of a cooperative industry share?", answer: "Profits and losses" },
        { prompt: "Name two agro-based industries.", answer: "Cotton textiles and sugar" },
      ],
      traps: [
        {
          title: "Steel and cement are not agro-based",
          body: "A pair is agro-based only if **both** use farm produce. **Jute and steel** or **edible oil and aluminium** mix an agro-based with a mineral-based industry.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgieid-others",
      name: "Textiles, sugar, fertilisers, aluminium and chemicals",
      intuition:
        "Each of these industries has one or two facts SSC returns to: where it began, where it sits, or what limits it. Learn the facts below as one line each.",
      definition:
        "The facts:\n" +
        "- **Cotton textiles**: the first successful mill opened in **Mumbai (1854)**.\n" +
        "- **Sugar**: cane loses sucrose soon after cutting, so mills sit near the fields; crushing is **seasonal**; the industry suits **cooperatives**. Maharashtra and Tamil Nadu are major producers.\n" +
        "- **Fertilisers**: **Sindri** (Jharkhand, 1951), near the Jharia coalfield. **Urea** is the main nitrogenous fertiliser. India has **no potash** of its own. Output grew after the Green Revolution.\n" +
        "- **Aluminium**: the **second** most important metallurgical industry, after iron and steel. **Muri** (Jharkhand) is the oldest alumina refinery.\n" +
        "- **Inorganic chemicals** are made all over India, not only in the north; sulphuric acid and soda ash feed fertilisers, detergents and glass.\n" +
        "- **Chennai** is called the **Detroit of India** for its automobile industry.",
      table: {
        columns: ["Industry", "Fact to remember"],
        rows: [
          { cells: ["Cotton textiles", "First successful mill, Mumbai, 1854"], pyqExampleId: "eeb09ed5-de6c-41fb-8fd5-572cc5031322" },
          { cells: ["Fertilisers", "Sindri, Jharkhand"], pyqExampleId: "489cfc7b-07f8-4f81-a643-0d72b83655c2" },
          { cells: ["Aluminium", "Second metallurgical industry; Muri the oldest refinery"], pyqExampleId: "6a81c3b6-70f3-47a3-af55-305bdd4e1dbe" },
          { cells: ["Automobiles", "Chennai, the Detroit of India"], pyqExampleId: "b5c8257b-936e-422d-9b30-2265bb78e744" },
        ],
      },
      pyqExampleId: "e06d459e-743e-4c7c-8c21-5a0ad51db625",
      selfCheckExample: {
        prompt: "Why do sugar mills stand close to the cane fields?",
        steps: ["Sugarcane starts losing its sucrose soon after it is cut.", "So it must be crushed quickly, near where it grows."],
        answer: "Cut cane loses its sugar if carried far.",
      },
      practiceSet: [
        { prompt: "Which city is called the Detroit of India?", answer: "Chennai" },
        { prompt: "Which fertiliser mineral does India have to import entirely?", answer: "Potash" },
        { prompt: "Which metallurgical industry ranks first in India, ahead of aluminium?", answer: "Iron and steel" },
        { prompt: "Where was India's first successful cotton mill set up?", answer: "Mumbai" },
      ],
      traps: [
        {
          title: "Aluminium is second, not first",
          body: "Aluminium smelting is the **second** most important metallurgical industry; **iron and steel** is first.",
        },
      ],
    },
  ],
};
