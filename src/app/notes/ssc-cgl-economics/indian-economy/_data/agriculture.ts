import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XIE_AGRICULTURE_NOTE: SubtopicNote = {
  subtopicName: "Green Revolution and Farm Schemes",
  title: "Green Revolution and Farm Schemes",
  oneLineDefinition:
    "What the Green Revolution was, who gained from it and what it cost, the second Green Revolution and the White Revolution, and the central schemes for farmers with their figures.",
  whyItMatters:
    "Twenty-six questions in the bank: four from the 2023 shifts, 12 from the 2024 shifts and ten from the 2025 shifts. Scheme questions ask a figure (a premium, an age band, an annual payment) or a ministry, so the scheme table carries most of the marks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxieag-green",
      name: "The Green Revolution",
      intuition:
        "From the mid-1960s new seeds, fertiliser and irrigation raised grain output fast. The gains were large but went to some crops, some regions and some farmers, and SSC asks about both the gains and the gaps.",
      definition:
        "The strategy:\n" +
        "- A package of **high-yielding (HYV) seeds**, **chemical fertilisers**, pesticides and assured **irrigation**, for food grains, above all **wheat** and later **rice**. **Organic manure** was not part of it.\n" +
        "- Before it, the **IADP** (Intensive Agricultural District Programme, 1960-61) tried intensive farming in seven districts.\n" +
        "- Cereal output rose from **72.4** million tonnes (1965-66) to **131.9** million tonnes (1978-79).\n" +
        "- It raised yields **and** the area cropped; it pushed farming toward the market, not away from it.\n\n" +
        "The gaps:\n" +
        "- Growth was **disproportionate**: mostly wheat, in irrigated **Punjab, Haryana and western UP**.\n" +
        "- It favoured **large farmers**, since HYV seeds need water and capital; fertiliser subsidies also went mostly to richer farmers.\n" +
        "- It over-used groundwater and chemicals.\n\n" +
        "Later: the **second Green Revolution** aims at **eastern India** and **sustainable**, holistic growth. The **White Revolution** (milk, **Operation Flood**) was led by **Verghese Kurien**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["IADP", "Intensive Agricultural District Programme"], pyqExampleId: "ef1e0c8d-c44b-4bdb-b7c5-840d6e858a51" },
          { cells: ["Cereals, 1978-79", "131.9 million tonnes"], pyqExampleId: "1c1bd61c-1f1b-46d2-bfa4-d075cfc169d3" },
          { cells: ["Who gained most", "Large farmers"], pyqExampleId: "01cb7a26-fcfd-426a-8ca4-84b853f48447" },
          { cells: ["White Revolution", "Verghese Kurien, Operation Flood"], pyqExampleId: "7cb1a367-6587-4878-9977-08120f9df1b9" },
        ],
      },
      pyqExampleId: "18ac6485-6162-40fd-b9ba-672e27c7e0d6",
      selfCheckExample: {
        prompt: "Which of these was not part of the Green Revolution package: HYV seeds, irrigation, organic manure, chemical fertiliser?",
        steps: ["The package was HYV seeds with chemical fertiliser, pesticides and irrigation.", "Organic manure belongs to older or organic farming."],
        answer: "Organic manure.",
      },
      practiceSet: [
        { prompt: "Which region did the second Green Revolution aim at?", answer: "Eastern India" },
        { prompt: "Why did the Green Revolution spread mainly to Punjab and Haryana?", answer: "HYV seeds needed assured irrigation, which those States had" },
        { prompt: "Which revolution is linked to milk?", answer: "The White Revolution" },
      ],
      traps: [
        {
          title: "The second revolution is eastern, not southern",
          body: "A statement that the second Green Revolution focused on **southern** India is false. It was aimed at the **eastern** States.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxieag-schemes",
      name: "Central schemes for farmers",
      intuition:
        "Each scheme has one number or one purpose SSC asks for. Learn the scheme with its figure, and a scheme's purpose from its full name.",
      definition:
        "Money and insurance:\n" +
        "- **PM-KISAN** (2019): **Rs 6,000** a year in three instalments of Rs 2,000.\n" +
        "- **PM Fasal Bima Yojana** (2016): the farmer pays at most **2%** for kharif crops, 1.5% for rabi, 5% for commercial crops.\n" +
        "- **PM Kisan Maandhan Yojana**: a pension; entry age **18 to 40**.\n" +
        "- **PM Awas Yojana (Gramin)**: cost shared **60 : 40** by Centre and States in the plains, 90 : 10 in the hill and north-eastern States.\n\n" +
        "Soil, water and farming methods:\n" +
        "- **Soil Health Card**: reports the soil's **nutrient status**.\n" +
        "- **Paramparagat Krishi Vikas Yojana**: **organic** farming in clusters.\n" +
        "- **PM-KUSUM**: **solar pumps** and solar plants on farms.\n" +
        "- **NMSA**: agriculture that is more productive and sustainable, including organic farming.\n" +
        "- **RKVY**: runs the crop diversification programme.\n\n" +
        "Ministries: **e-NAM**, PM-AASHA and the **National Beekeeping and Honey Mission** sit with the **Ministry of Agriculture**. The **e-GOPALA** app was built by the **National Dairy Development Board**.",
      table: {
        columns: ["Scheme", "Figure or purpose"],
        rows: [
          { cells: ["PM Fasal Bima Yojana", "At most 2% premium, kharif"], pyqExampleId: "4fb4e136-5aaa-4d81-a49b-2939d9fedcc4" },
          { cells: ["PM Kisan Maandhan", "Entry age 18 to 40"], pyqExampleId: "e973621c-f3c0-470f-9a5a-460aed710435" },
          { cells: ["PMAY-G, plains", "60 : 40 Centre to State"], pyqExampleId: "cdace3eb-783d-4e84-af90-bf65a12164e9" },
          { cells: ["Paramparagat Krishi Vikas", "Organic farming"], pyqExampleId: "bddd79af-cd79-457b-a94c-5892ecc87101" },
          { cells: ["Soil Health Card", "Nutrient status of soil"], pyqExampleId: "80cc3cdf-24ae-49c3-9f34-078e36c039f8" },
          { cells: ["PM-KUSUM", "Solar pumps"], pyqExampleId: "3247a45c-0934-4683-85dc-2bffcc575c30" },
        ],
      },
      pyqExampleId: "becda512-222e-468a-910a-b9e7458c02c8",
      selfCheckExample: {
        prompt: "A farmer insures a rabi wheat crop under PM Fasal Bima Yojana. What is the most premium the farmer pays?",
        steps: ["The caps are 2% for kharif, 1.5% for rabi and 5% for commercial crops.", "Wheat is a rabi crop."],
        answer: "1.5% of the sum insured.",
      },
      practiceSet: [
        { prompt: "How much is each PM-KISAN instalment?", answer: "Rs 2,000" },
        { prompt: "Which body built the e-GOPALA app?", answer: "The National Dairy Development Board" },
        { prompt: "Under which ministry is the National Beekeeping and Honey Mission?", answer: "Agriculture and Farmers Welfare" },
      ],
      traps: [
        {
          title: "A pension is not an income transfer",
          body: "**PM-KMY** is a **pension** for farmers aged 18 to 40 at entry; **PM-KISAN** is the Rs 6,000 yearly payment. Options swap the two.",
        },
      ],
    },
  ],
};
