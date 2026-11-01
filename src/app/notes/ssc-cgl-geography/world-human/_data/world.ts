import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GWH_WORLD_NOTE: SubtopicNote = {
  subtopicName: "World Geography",
  title: "World Geography",
  oneLineDefinition:
    "India's neighbours with their languages and symbols, the world's oceans, great lakes, river basins and straits, and two farming terms.",
  whyItMatters:
    "Sixteen questions in the bank: eight from the 2023 shifts, five from the 2024 shifts and three from the 2025 shifts, 14 of them EASY. Each asks one record or one match: the largest ocean, the deepest lake, a neighbour's language. Learn the lists as orders and pairs.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgwhwo-countries",
      name: "Neighbours and countries",
      intuition:
        "SSC asks India's neighbours by their language, their national symbol or their nickname. Learn each neighbour with one of each.",
      definition:
        "Languages:\n" +
        "- **Sri Lanka**: Sinhala (and Tamil). **Bhutan**: **Dzongkha**. **Myanmar**: Burmese. **Pakistan**: Urdu. **Afghanistan**: **Dari** and Pashto.\n\n" +
        "Symbols and names:\n" +
        "- **Bhutan** is the **Land of the Thunder Dragon** (Druk Yul).\n" +
        "- The national fruit of **Bangladesh** is the **jackfruit** (India's is the mango).\n" +
        "- Of the BRICS countries, **Russia** has the longest coastline.\n\n" +
        "Animals and their homes: kangaroos in Australia, ostriches in savannas and deserts, lemurs in Madagascar, orangutans in Borneo and Sumatra.",
      table: {
        columns: ["Country", "Official language"],
        rows: [
          { cells: ["Bhutan", "Dzongkha"], pyqExampleId: "15d93399-ba59-40ed-945e-373f51af0c9a" },
          { cells: ["Afghanistan", "Dari (and Pashto)"], pyqExampleId: "7bef8c13-9d0e-4222-841b-ba55609c6b1e" },
          { cells: ["Myanmar", "Burmese"] },
          { cells: ["Sri Lanka", "Sinhala (and Tamil)"] },
          { cells: ["Pakistan", "Urdu"] },
        ],
      },
      pyqExampleId: "cad772c0-66cc-4070-aa67-d3bff0f186dd",
      selfCheckExample: {
        prompt: "Match each country to its official language: Bhutan, Myanmar, Afghanistan. Choose from Dari, Dzongkha, Burmese.",
        steps: ["Bhutan's language is Dzongkha and Myanmar's is Burmese.", "Afghanistan's is Dari (with Pashto)."],
        answer: "Bhutan: Dzongkha. Myanmar: Burmese. Afghanistan: Dari.",
      },
      practiceSet: [
        { prompt: "What is the national fruit of Bangladesh?", answer: "The jackfruit" },
        { prompt: "Which BRICS country has the longest coastline?", answer: "Russia" },
        { prompt: "Where do orangutans live in the wild?", answer: "Borneo and Sumatra" },
      ],
      traps: [
        {
          title: "Orangutans are Asian",
          body: "Orangutans live only in **Borneo and Sumatra**. A pair placing them in the Caribbean is the wrong one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgwhwo-water",
      name: "Oceans, lakes, basins and straits",
      intuition:
        "World water questions ask an order (largest to smallest, deepest to shallowest) or one record. Learn the orders exactly, because the options swap two items.",
      definition:
        "Oceans by size: **Pacific > Atlantic > Indian > Southern (Antarctic) > Arctic**. The **Southern Ocean** circles Antarctica and reaches north to **60 degrees S**.\n\n" +
        "Lakes:\n" +
        "- By depth: **Baikal** (deepest) > **Tanganyika** > Caspian Sea > Vostok.\n" +
        "- **Lake Victoria**, Africa's largest, is shared by **Tanzania, Uganda and Kenya**.\n" +
        "- The **Dead Sea** is a landlocked salt lake between **Israel and Jordan**.\n\n" +
        "The **Amazon** basin (about 7 million sq km) is the world's largest river basin.\n\n" +
        "The **Bering Strait** joins the Pacific and Arctic oceans, between Russia and Alaska.",
      table: {
        columns: ["Record", "Answer"],
        rows: [
          { cells: ["Largest ocean", "Pacific"], pyqExampleId: "8b0e1a51-a4fb-4f73-bfb4-ad56575fb869" },
          { cells: ["Deepest lake", "Baikal"], pyqExampleId: "3260512c-3889-4543-a19d-b6284db4d6d9" },
          { cells: ["Largest river basin", "Amazon"] },
          { cells: ["Strait between Russia and Alaska", "Bering Strait"], pyqExampleId: "20deb482-b9ab-4428-b8cd-011e79b05eb6" },
          { cells: ["Salt lake between Israel and Jordan", "Dead Sea"], pyqExampleId: "54ebc482-3210-4633-af23-bed5fb5d8e90" },
        ],
      },
      pyqExampleId: "e17dd641-67f0-4f69-ba90-752b4fec85c3",
      selfCheckExample: {
        prompt: "Put these oceans in order of size, largest first: Indian, Atlantic, Pacific, Southern.",
        steps: ["The Pacific is largest, then the Atlantic.", "The Indian Ocean is third and the Southern Ocean fourth."],
        answer: "Pacific, Atlantic, Indian, Southern.",
      },
      practiceSet: [
        { prompt: "Which three countries share Lake Victoria?", answer: "Tanzania, Uganda and Kenya" },
        { prompt: "Which ocean surrounds Antarctica?", answer: "The Southern Ocean" },
        { prompt: "Which is the deepest lake in the world?", answer: "Lake Baikal" },
      ],
      traps: [
        {
          title: "The Atlantic is second, not the Indian",
          body: "The order is **Pacific, Atlantic, Indian**. Options that put the Indian Ocean second are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgwhwo-farming",
      name: "Two farming terms",
      intuition:
        "Two farming words come up: one about getting more from the same land, one about farms that copy nature.",
      definition:
        "The terms:\n" +
        "- **Intensive agriculture**: more **labour and capital** (fertiliser, irrigation) on the **same land**, to raise output per acre. Bringing more land under the plough is extensive farming.\n" +
        "- **Permaculture** (permanent agriculture): designing **sustainable** farms that copy natural ecosystems and need few outside inputs.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Intensive agriculture", "More inputs on the same land"], pyqExampleId: "ba210123-fff1-49a7-80ec-525e08696b4b" },
          { cells: ["Extensive agriculture", "More land, few inputs per acre"] },
          { cells: ["Permaculture", "Sustainable farms that copy nature"] },
        ],
      },
      pyqExampleId: "7ec233fd-8a14-4657-aa93-02d8eb76e382",
      selfCheckExample: {
        prompt: "A farmer doubles fertiliser and irrigation on the same five acres. Is that intensive or extensive farming?",
        steps: ["He adds inputs to the same land rather than farming more land.", "That is intensive agriculture."],
        answer: "Intensive.",
      },
      practiceSet: [
        { prompt: "What does permaculture aim at?", answer: "Sustainable farms that copy natural ecosystems" },
        { prompt: "Does intensive agriculture mean bringing more land under cultivation?", answer: "No; it means more inputs on the same land" },
      ],
      traps: [
        {
          title: "Permaculture is not about permafrost",
          body: "**Permaculture** is sustainable farming. The look-alike option about permafrost regions is a decoy.",
        },
      ],
    },
  ],
};
