import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_IG_MINERALS_NOTE: SubtopicNote = {
  subtopicName: "Minerals and Energy",
  title: "Minerals and Energy",
  oneLineDefinition:
    "Minerals form in set ways inside rocks and are mined in known belts; the energy we use comes from conventional sources such as coal and oil, and from newer non conventional ones.",
  whyItMatters:
    "Ten questions in the bank, nine EASY and one MODERATE, the biggest page of the chapter: how and where minerals occur, which mine gives which mineral (mica at Koderma, copper at Khetri, thorium in monazite sand), the grades of coal and the oldest oil state.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiigmi-forms",
      name: "What minerals are and how they occur",
      intuition:
        "Everything we use, from a pin to a ship, is made from minerals. A mineral is a natural substance with a fixed make up, and where it is found depends on how it formed.",
      definition:
        "- A **mineral** is a natural substance with a definite internal structure. The **physical and chemical conditions** under which it forms decide its colour, hardness, lustre and density.\n" +
        "- In **igneous and metamorphic** rocks, minerals occur in cracks, crevices, faults or joints. Small ones are **veins**, large ones are **lodes** (tin, copper, zinc, lead).\n" +
        "- In **sedimentary** rocks, minerals occur in **beds or layers** (coal, some iron ore, gypsum, salt).\n" +
        "- When surface rocks are weathered and the soluble parts are washed away, the ore left behind can be valuable: **bauxite** forms this way.\n" +
        "- Sands of valley floors and the foot of hills hold **placer deposits** of gold, silver, tin and platinum. Ocean water gives common salt, magnesium and bromine.\n" +
        "- **Metallic** minerals give metals (iron, copper, bauxite for aluminium); **non metallic** ones include mica, salt and limestone; **energy minerals** are coal, petroleum and natural gas.",
      table: {
        columns: ["Where it forms", "Form", "Examples"],
        rows: [
          { cells: ["Igneous and metamorphic rocks", "Veins and lodes in cracks, crevices, faults, joints", "Tin, copper, zinc, lead"] },
          { cells: ["Sedimentary rocks", "Beds or layers", "Coal, gypsum, salt"] },
          {
            cells: ["Weathered surface rock", "Residue left after soluble parts wash away", "Bauxite"],
            noteAmber: "Bauxite is the ore of aluminium.",
          },
          { cells: ["Sand of valley floors", "Placer deposits", "Gold, silver, tin, platinum"] },
          { cells: ["Ocean water", "Dissolved", "Common salt, magnesium, bromine"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which kind of rock do minerals occur in beds or layers?",
        steps: ["Igneous and metamorphic rocks hold veins and lodes.", "Layered deposits belong to rocks that were themselves laid down in layers."],
        answer: "Sedimentary rocks.",
      },
      practiceSet: [
        { prompt: "What are large deposits of minerals in cracks of igneous rock called?", answer: "Lodes" },
        { prompt: "What are the mineral deposits in the sands of valley floors called?", answer: "Placer deposits" },
        { prompt: "Name a mineral obtained from ocean water.", answer: "Common salt (or magnesium, bromine)" },
        { prompt: "Is mica a metallic or a non metallic mineral?", answer: "Non metallic" },
      ],
      pyqExampleId: "a5c77017-b6a1-4c8f-9cfd-98041ed84c9d",
      traps: [
        {
          title: "Placing gold among weathered residues",
          body: "Bauxite is the mineral left behind by weathering. Gold and silver are found as placer deposits in sand.",
        },
        {
          title: "Calling petrol the stuff of everyday things",
          body: "Petrol is a fuel. The tools, utensils, wires and vehicles we use every day are made of metals obtained from minerals.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigmi-places",
      name: "Where the main minerals are mined",
      intuition:
        "Each mineral comes from a few well known belts. Learn the belt with the mineral, because the wrong options are usually real minerals from somewhere else.",
      definition:
        "- **Mica**: the Koderma, Gaya and Hazaribagh belt of Jharkhand is the leading area. Ajmer in Rajasthan and Nellore in Andhra Pradesh also have mica.\n" +
        "- **Copper**: Khetri mines in Rajasthan, Balaghat in Madhya Pradesh and Singhbhum in Jharkhand.\n" +
        "- **Bauxite**: the Amarkantak plateau, the Maikal hills and the Bilaspur and Katni plateau; the Panchpatmali deposits are in Koraput, Odisha.\n" +
        "- **Thorium**: the monazite sands of Kerala are rich in it. **Uranium** is mined in Jharkhand and the Aravalli ranges of Rajasthan.",
      table: {
        columns: ["Mineral", "Where it is mined"],
        rows: [
          { cells: ["Mica", "Koderma, Gaya and Hazaribagh belt (Jharkhand); Ajmer; Nellore"] },
          { cells: ["Copper", "Khetri (Rajasthan); Balaghat (Madhya Pradesh); Singhbhum (Jharkhand)"] },
          { cells: ["Bauxite", "Amarkantak plateau; Maikal hills; Panchpatmali in Koraput (Odisha)"] },
          {
            cells: ["Thorium", "Monazite sands of Kerala"],
            noteAmber: "Monazite is the thorium sand; uranium comes from Jharkhand and the Aravallis.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "In which state are the Balaghat copper mines?",
        steps: ["The copper mines named in the book are Khetri, Balaghat and Singhbhum.", "Balaghat is the one in central India."],
        answer: "Madhya Pradesh.",
      },
      practiceSet: [
        { prompt: "In which district of Odisha are the Panchpatmali bauxite deposits?", answer: "Koraput" },
        { prompt: "Which mineral is the Nellore belt of Andhra Pradesh known for?", answer: "Mica" },
        { prompt: "In which state are the Singhbhum copper mines?", answer: "Jharkhand" },
        { prompt: "The monazite sands of which state are rich in thorium?", answer: "Kerala" },
      ],
      pyqExampleId: "212fa376-b711-4bfb-a680-90f250929981",
      traps: [
        {
          title: "Mixing up thorium and uranium",
          body: "Both are atomic minerals. Monazite sand of Kerala gives thorium; uranium is mined in Jharkhand and the Aravallis of Rajasthan.",
        },
        {
          title: "Taking Koderma for an iron or copper mine",
          body: "Koderma, Gaya and Hazaribagh in Jharkhand are the mica belt. India's copper mines include Khetri in Rajasthan.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigmi-energy",
      name: "Sources of energy, coal and oil",
      intuition:
        "Energy sources are split into the old, familiar ones and the newer ones. Coal comes in grades by how much carbon it holds, and India's oil was first found in Assam.",
      definition:
        "- **Conventional** sources: firewood, cattle dung cake, coal, petroleum, natural gas and electricity (hydel and thermal).\n" +
        "- **Non conventional** sources: solar, wind, tidal, geothermal, biogas and atomic energy.\n" +
        "- Coal grades, low to high: **peat**, **lignite** (low grade brown coal, soft, with much moisture; main reserves at Neyveli in Tamil Nadu), **bituminous** (the most used commercial coal) and **anthracite** (the highest quality hard coal).\n" +
        "- Gondwana coal is in the Damodar valley (Jharia, Raniganj, Bokaro); younger Tertiary coal is in the north east.\n" +
        "- **Assam** is the oldest oil producing state: Digboi, Naharkatiya and Moran Hugrijan. Ankleshwar in Gujarat and Mumbai High off the Maharashtra coast came later.",
      table: {
        columns: ["Coal", "What it is like"],
        rows: [
          { cells: ["Peat", "Lowest grade: little carbon, much moisture, gives little heat"] },
          { cells: ["Lignite", "Low grade brown coal, soft, much moisture; main reserves at Neyveli, Tamil Nadu"] },
          { cells: ["Bituminous", "The most popular coal for commercial use"] },
          { cells: ["Anthracite", "The highest quality hard coal"] },
        ],
        caption: "Oldest oil producing state: Assam (Digboi). Later fields: Ankleshwar (Gujarat), Mumbai High (offshore).",
      },
      selfCheckExample: {
        prompt: "Which type of coal is the highest quality hard coal?",
        steps: ["Coal grades rise with the carbon they hold: peat, lignite, bituminous, anthracite.", "The top grade is the hardest."],
        answer: "Anthracite.",
      },
      practiceSet: [
        { prompt: "Is biogas a conventional or a non conventional source of energy?", answer: "Non conventional" },
        { prompt: "Where are the main lignite reserves of India?", answer: "Neyveli, Tamil Nadu" },
        { prompt: "Name one coal field of the Damodar valley.", answer: "Jharia (or Raniganj, Bokaro)" },
        { prompt: "Which is the most used commercial coal?", answer: "Bituminous" },
      ],
      pyqExampleId: "78a5db28-d50e-4b1a-a83e-1355dc96da66",
      traps: [
        {
          title: "Calling lignite the best coal",
          body: "Lignite is a low grade brown coal with a lot of moisture. The best, hardest coal is anthracite.",
        },
        {
          title: "Thinking non renewable means non conventional",
          body:
            "Coal, petroleum and natural gas run out, but they are conventional sources because they have long been in common use. Non conventional means the newer ones: solar, wind, tidal, geothermal, biogas, atomic.",
        },
        {
          title: "Choosing Maharashtra as the oldest oil state",
          body: "Mumbai High is offshore and came much later. Oil was first struck in Assam, at Digboi.",
        },
      ],
    },
  ],
};
