import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_SOILS_NOTE: SubtopicNote = {
  subtopicName: "Soils of India",
  title: "Soils of India",
  oneLineDefinition:
    "The main soils of India, what each is rich and poor in, where each is found, and the soil orders of the modern classification.",
  whyItMatters:
    "Eight CDS questions from 2016 to 2026, four of them since 2023: 1 EASY, 6 MODERATE, 1 HARD. Most give three clues and ask you to name the soil, so learn each soil as a set of clues.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-alluvial-black",
      name: "Alluvial and black soils",
      intuition:
        "Alluvial soil is the silt rivers lay down, so it covers the great plains and the deltas. Black soil formed from the lava rocks of the Deccan; it is a sticky clay that holds water for a long time. These two soils carry most of India's farming.",
      definition:
        "Alluvial soil:\n" +
        "- Laid down by rivers; ranges from **sandy loam to clay**.\n" +
        "- Generally **rich in potash** and **poor in phosphorus**; has enough lime.\n" +
        "- Grouped by age: **bhangar** (older) and **khadar** (newer).\n" +
        "Black soil (**regur**, black cotton soil):\n" +
        "- Formed from the lava rocks of the **Deccan**; covers **most of the Deccan plateau**: Maharashtra, Madhya Pradesh, Gujarat.\n" +
        "- **Rich in lime, iron, magnesia and alumina**; **poor in nitrogen, phosphorus and organic matter**.\n" +
        "- **Clayey, deep and impermeable**; it holds moisture, so it suits **rainfed cotton**.",
      table: {
        columns: ["Soil", "Rich in", "Poor in", "Found in"],
        rows: [
          {
            cells: ["Alluvial", "Potash, lime", "Phosphorus", "Northern plains, river valleys and deltas"],
            noteAmber: "CDS 2021 (I): rich in potash and poor in phosphorus.",
            pyqExampleId: "0960e5ce-b545-4597-958f-7724bac69a26",
          },
          {
            cells: ["Black (regur)", "Lime, iron, magnesia, alumina", "Nitrogen, phosphorus, organic matter", "Deccan plateau: Maharashtra, Madhya Pradesh, Gujarat"],
            noteAmber: "CDS 2026 (I): the false statement said rainfed crops do not grow well in black soil.",
            pyqExampleId: "cb2e2e29-c55d-481a-b892-b55be02293c9",
          },
        ],
      },
      pyqExampleId: "9cf65483-7a93-4c05-a8e9-d267803ca559",
      selfCheckExample: {
        prompt: "A soil is made of sand, silt and clay in different amounts, has enough potash and lime, and is divided by age into two kinds. Name the soil and the two kinds.",
        steps: [
          "Sand, silt and clay in varying amounts is what rivers lay down.",
          "Rich in potash and divided by age points to alluvial soil.",
          "The older kind is bhangar and the newer kind is khadar.",
        ],
        answer: "Alluvial soil; bhangar (older) and khadar (newer).",
      },
      practiceSet: [
        { prompt: "What is black soil also called?", answer: "Regur, or black cotton soil" },
        { prompt: "Which crop is black soil best known for?", answer: "Cotton" },
        { prompt: "Alluvial soil is generally poor in which nutrient?", answer: "Phosphorus" },
        { prompt: "Why do rainfed crops do well on black soil?", answer: "It holds moisture for a long time" },
      ],
      traps: [
        {
          title: "Impermeable helps, not hurts",
          body: "Black soil is **impermeable**, and that is why it **holds moisture** and grows good **rainfed** crops such as cotton. A statement that rainfed crops do badly on it is false.",
        },
        {
          title: "Alluvial is rich in potash, poor in phosphorus",
          body: "The pairing is **potash rich, phosphorus poor**. CDS offered the reverse and both-rich options in 2021 (I).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-other-soils",
      name: "Laterite, saline, arid and other soils",
      intuition:
        "Each of these soils is shaped by its climate. Heavy rain washes laterite clean of most minerals; fierce evaporation leaves salt on top of saline soil; little rain keeps arid soil sandy and low in humus. Read the climate and you can name the soil.",
      definition:
        "The soils:\n" +
        "- **Laterite**: hot, very wet places; heavy rain washes out lime and silica and leaves **iron and aluminium**. Low in nitrogen and humus. Western Ghats, Kerala, Karnataka, hills of Odisha and the north-east.\n" +
        "- **Saline** (usar): **sodium, potassium and magnesium** salts; **infertile**; sandy to loamy; **poor in nitrogen**. Arid and semi-arid areas and waterlogged, swampy ground: western Gujarat, the eastern deltas, the Sundarbans.\n" +
        "- **Arid**: sandy, low in humus and nitrogen. Western Rajasthan.\n" +
        "- **Red and yellow**: red from iron spread through old crystalline rock, yellow when that iron is hydrated. Eastern and southern Deccan.\n" +
        "- **Peaty**: lots of humus and organic matter; wet, badly drained ground in coastal Kerala, Odisha and West Bengal.",
      table: {
        columns: ["Soil", "Clue", "Found in"],
        rows: [
          { cells: ["Laterite", "Iron and aluminium; heavy rain washes out the rest", "Western Ghats, Kerala, Karnataka, Odisha hills"] },
          {
            cells: ["Saline (usar)", "Sodium, potassium and magnesium salts; infertile; poor in nitrogen", "Western Gujarat, eastern deltas, Sundarbans"],
            noteAmber: "CDS 2025 (I): 'rich in nitrogen' was the false statement.",
            pyqExampleId: "c8a392ae-360b-4c8f-8e9c-9aab3a40f758",
          },
          { cells: ["Arid", "Sandy; low in humus and nitrogen", "Western Rajasthan"] },
          { cells: ["Red and yellow", "Iron in crystalline rock gives the colour", "Eastern and southern Deccan"] },
          { cells: ["Peaty", "Very rich in humus and organic matter", "Coastal Kerala, Odisha, West Bengal"] },
        ],
      },
      pyqExampleId: "a7bb4ec6-0dfd-437f-a2e8-e7aaf2831017",
      selfCheckExample: {
        prompt: "Why does laterite soil form in hot places with very heavy rain?",
        steps: [
          "Heavy rain soaks through the soil again and again.",
          "It washes away the lime and silica (leaching).",
          "The iron and aluminium stay behind and build up.",
        ],
        answer: "Heavy rain leaches out lime and silica, leaving a soil rich in iron and aluminium.",
      },
      practiceSet: [
        { prompt: "Which soil is rich in iron and aluminium because heavy rain has washed out the rest?", answer: "Laterite soil" },
        { prompt: "Are saline soils rich or poor in nitrogen?", answer: "Poor" },
        { prompt: "What gives red soil its colour?", answer: "Iron spread through the old crystalline rock" },
        { prompt: "Which soil has the most humus and organic matter?", answer: "Peaty soil" },
      ],
      traps: [
        {
          title: "Saline soil is not fertile",
          body: "The salts in **saline** soil make it **infertile**, and it is **poor in nitrogen**. It forms both in dry areas and in **waterlogged** ground where evaporation leaves salt behind.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-soil-orders",
      name: "Soil orders (modern classification)",
      intuition:
        "Scientists also sort soils into orders by how far their layers have developed. India's soils are mostly young: the two biggest orders, Inceptisols and Entisols, are soils whose layers have hardly formed yet.",
      definition:
        "Share of India's area (ICAR classification, as in the NCERT book):\n" +
        "- **Inceptisols** about **40%**: young soils with weak layers; the largest.\n" +
        "- **Entisols** about **28%**: very young soils, such as fresh river sand and silt.\n" +
        "- **Alfisols** about **14%**.\n" +
        "- **Vertisols** about **9%**: heavy clays that crack when dry, like black soil.\n" +
        "- **Aridisols** about **4%**: desert soils.",
      table: {
        columns: ["Soil order", "Share of India", "What it is"],
        rows: [
          { cells: ["Inceptisols", "About 40%", "Young soils with weak layers"] },
          { cells: ["Entisols", "About 28%", "Very young soils"] },
          { cells: ["Alfisols", "About 14%", "More developed soils, with clay built up below the top layer"] },
          { cells: ["Vertisols", "About 9%", "Cracking clays, like black soil"] },
          { cells: ["Aridisols", "About 4%", "Desert soils"] },
        ],
      },
      pyqExampleId: "d2ca33dd-6327-44c2-95ea-06955da6b7e0",
      selfCheckExample: {
        prompt: "Put Alfisols, Entisols and Vertisols in order of the area they cover in India, largest first.",
        steps: [
          "Entisols cover about 28%.",
          "Alfisols cover about 14%.",
          "Vertisols cover about 9%.",
        ],
        answer: "Entisols, Alfisols, Vertisols.",
      },
      practiceSet: [
        { prompt: "Which soil order is like the black cotton soil?", answer: "Vertisols" },
        { prompt: "Which soil order is found in deserts?", answer: "Aridisols" },
        { prompt: "Which soil order covers the second largest area of India?", answer: "Entisols" },
      ],
      traps: [
        {
          title: "Inceptisols, not Entisols, are the largest",
          body: "Both are young soils, but **Inceptisols** (about 40%) cover more of India than **Entisols** (about 28%).",
        },
      ],
    },
  ],
};
