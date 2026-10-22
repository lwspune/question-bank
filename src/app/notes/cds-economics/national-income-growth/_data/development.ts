import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_NI_DEVELOPMENT_NOTE: SubtopicNote = {
  subtopicName: "Human Development and Global Indices",
  title: "Human Development and Global Indices",
  oneLineDefinition:
    "The idea of human development and its four pillars, how the HDI is built, the gender and health measures, and the global indices and rankings CDS quotes.",
  whyItMatters:
    "The largest page of the chapter: 21 CDS questions, 8 of them HARD. The HDI's dimensions were asked twice (2019 (II) and 2024 (II)) and so were the four pillars (2020 (I) and 2023 (II)). Ranking questions need the year of the report.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecni-hd-idea",
      name: "The idea of human development",
      intuition:
        "Growth in income is a means, not the goal. Human development asks whether people can live long and healthy lives, gain knowledge and have the means for a decent life, so that they have real choices. Different thinkers have framed it in different ways, and CDS asks which framing came from whom.",
      definition:
        "The ideas:\n" +
        "- **Mahbub ul Haq** (Pakistani economist) created the concept as a measure, with the **Human Development Index** and the first **Human Development Report** of **UNDP** in **1990**. **Amartya Sen** worked with him on its basis.\n" +
        "- The **four pillars**: **equity**, **sustainability**, **productivity** and **empowerment**.\n" +
        "- The four **approaches** (NCERT Class 12): **income** (income is what matters), **welfare** (people as beneficiaries of state spending), **basic needs** (first proposed by the **ILO**: six needs, health, education, food, water supply, sanitation and housing) and **capability** (**Amartya Sen**: building human capabilities).\n" +
        "- **Gross National Happiness**: **Bhutan** is the only country that officially measures its progress by it, an idea of its fourth king, **Jigme Singye Wangchuck**, in the 1970s.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          {
            cells: ["Concept of human development", "Mahbub ul Haq, first Human Development Report 1990"],
            pyqExampleId: "24dc3b7a-8da4-4124-85fe-ae846749be27",
          },
          {
            cells: ["Four pillars", "Equity, sustainability, productivity, empowerment"],
            noteAmber: "CDS 2023 (II): security is not one of the pillars.",
            pyqExampleId: "b2816e29-ad3e-4d6a-b6e5-652a3087b0de",
          },
          {
            cells: ["Basic needs approach", "Proposed by the ILO; six needs from health to housing"],
            pyqExampleId: "be8c031c-bfbc-4f72-a34a-3fbbec9f8da3",
          },
          { cells: ["Capability approach", "Amartya Sen"] },
          {
            cells: ["Gross National Happiness", "Bhutan, the only country to adopt it officially"],
            pyqExampleId: "d7d4c832-a67d-4599-9b6d-c2738dca27a6",
          },
        ],
      },
      pyqExampleId: "b06ce392-ef64-4619-bca0-02e5378425e8",
      practiceSet: [
        { prompt: "Which approach to human development is linked to Amartya Sen?", answer: "The capability approach" },
        { prompt: "Which country measures its progress officially by Gross National Happiness?", answer: "Bhutan" },
        { prompt: "Which UN body publishes the Human Development Report?", answer: "The UNDP" },
        { prompt: "Which international body first proposed the basic needs approach?", answer: "The International Labour Organisation" },
      ],
      traps: [
        {
          title: "Haq built it, Sen shaped the idea",
          body: "The concept of human development and the HDI are credited to **Mahbub ul Haq**. **Amartya Sen** gave the **capability approach** behind it. A 'who gave the concept' question wants Haq.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecni-hdi",
      name: "The Human Development Index",
      intuition:
        "The HDI puts three things on one scale from 0 to 1: health, knowledge and income. Each is first turned into an index by asking how far a country has come between a set minimum and maximum. The three indices are then combined by a geometric mean, so a very low score on one cannot be hidden by a high score on another.",
      definition:
        "How it is built:\n" +
        "- **Long and healthy life**: **life expectancy at birth**.\n" +
        "- **Knowledge**: **mean years of schooling** (adults 25 and over) and **expected years of schooling** (children entering school).\n" +
        "- **Decent standard of living**: **gross national income per head** (PPP dollars, taken in logs).\n" +
        "- Each dimension index = (actual − minimum) ÷ (maximum − minimum). For life expectancy the goalposts are **20 and 85 years**.\n" +
        "- Since **2010** the HDI is the **geometric mean** of the three indices.\n" +
        "- Not in the HDI: **mortality rate** as such, **literacy rate** (dropped in 2010), access to banking.",
      formula: {
        label: "Human Development Index",
        latex: "\\text{HDI} = \\left(I_{\\text{health}} \\times I_{\\text{education}} \\times I_{\\text{income}}\\right)^{1/3}",
        symbols: [
          { symbol: "\\(I\\)", meaning: "dimension index: (actual − minimum) ÷ (maximum − minimum)" },
        ],
      },
      authoredExample: {
        prompt: "A country's health index is 0.8, its education index 0.6 and its income index 0.7. Find its HDI.",
        steps: [
          "Multiply the three: 0.8 × 0.6 × 0.7 = 0.336.",
          "Take the cube root: 0.336 is close to 0.695 × 0.695 × 0.695.",
        ],
        answer: "HDI ≈ 0.69.",
      },
      selfCheckExample: {
        prompt: "Life expectancy in a country is 70 years. With goalposts of 20 and 85 years, what is its health index?",
        steps: [
          "Index = (70 − 20) ÷ (85 − 20).",
          "= 50 ÷ 65 ≈ 0.77.",
        ],
        answer: "About 0.77.",
      },
      pyqExampleId: "916c3d70-b649-4cf5-90fe-51b45e68d303",
      practiceSet: [
        { prompt: "Which average combines the three HDI dimension indices?", answer: "The geometric mean" },
        { prompt: "Which income measure does the HDI use?", answer: "Gross national income per head, in PPP dollars" },
        { prompt: "Which two schooling indicators make up the HDI's knowledge dimension?", answer: "Mean years of schooling and expected years of schooling" },
        { prompt: "What was India's HDI rank in the Human Development Report 2023-24?", answer: "134th of 193 countries" },
      ],
      traps: [
        {
          title: "Mortality is not an HDI indicator",
          body: "Health enters the HDI only through **life expectancy at birth**. Mortality rate, infant mortality and access to banking are **not** indicators of the index.",
        },
        {
          title: "Order ranks with the report's year",
          body: "In the 2019 report the order was **Germany (4), USA (15), South Africa (113), India (129)**. In the 2023-24 report the BRICS ran **Russia (56), China (75), Brazil (89), South Africa (110), India (134)**. India was **130th** in the 2025 report.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-gender-health",
      name: "Gender, health and social spending",
      intuition:
        "Some measures look past the average to who is left behind. The Gender Inequality Index asks how far women fall behind men. Infant mortality and life expectancy show how healthy a country is, and spending on education shows how much it invests in its people.",
      definition:
        "The measures:\n" +
        "- **Gender Inequality Index (GII, UNDP, 2010)**: three dimensions, **reproductive health** (maternal mortality ratio, adolescent birth rate), **empowerment** (women's seats in parliament, secondary education) and the **labour market** (participation rate). It runs from **0 (women and men fare equally) to 1**.\n" +
        "- **Infant mortality rate**: deaths under one year per 1,000 live births. India's is about **28** (Sample Registration System, 2020), far above **China, the USA and Sri Lanka**, which are all in single digits.\n" +
        "- **Life expectancy in India**: **women live longer than men**, and **urban** people longer than **rural** people.\n" +
        "- **Education spending** by the Centre and the States together stayed at about **3 per cent of GDP** in 2014 to 2019, with little change.",
      table: {
        columns: ["Measure", "Fact"],
        rows: [
          {
            cells: ["Gender Inequality Index", "Reproductive health, empowerment, labour market; 0 means equality"],
            pyqExampleId: "dea1f5ab-fade-418d-a914-601176c29034",
          },
          {
            cells: ["Infant mortality, India", "About 28 per 1,000 live births (2020); not comparable to China, the USA or Sri Lanka"],
            pyqExampleId: "48308d8e-0c34-4438-bbff-c3386c6724cf",
          },
          {
            cells: ["Life expectancy, India", "Female above male; urban above rural"],
            noteAmber: "CDS 2022 (II): male life expectancy above female is what you would not see.",
            pyqExampleId: "c4fe1c9b-31bb-4682-9834-38d28bacc9ad",
          },
          {
            cells: ["Education spending, 2014 to 2019", "About 3 per cent of GDP, stagnant"],
            pyqExampleId: "3b455cc0-f5d8-4c76-bbe0-b2fa28c48f99",
          },
        ],
      },
      pyqExampleId: "dea1f5ab-fade-418d-a914-601176c29034",
      practiceSet: [
        { prompt: "What does the infant mortality rate count?", answer: "Deaths of babies under one year for every 1,000 live births" },
        { prompt: "In India, do women or men have the higher life expectancy?", answer: "Women" },
        { prompt: "About what share of GDP did India's Centre and States together spend on education in 2014 to 2019?", answer: "About 3 per cent" },
        { prompt: "Which UN body publishes the Gender Inequality Index?", answer: "The UNDP" },
      ],
      traps: [
        {
          title: "Property and income are not GII dimensions",
          body: "The GII's three dimensions are **reproductive health, empowerment and the labour market**. Work participation enters only inside the labour market; property and income are not dimensions.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-rankings",
      name: "Global indices and India's rank",
      intuition:
        "Many bodies rank countries: on competitiveness, ease of doing business, innovation, progress towards the Sustainable Development Goals. CDS asks who publishes each index, what it is built from and how India's place has moved. A rank always belongs to a year, so learn the year with it.",
      definition:
        "The indices:\n" +
        "- **Global Competitiveness Index** (World Economic Forum): in 2016-17 built from three sub-indices, **basic requirements**, **efficiency enhancers** and **innovation and sophistication factors**. Health is a pillar inside basic requirements, not a sub-index.\n" +
        "- **Ease of Doing Business** (World Bank): India rose from **142 (2014) to 63 (2019)**, but its rank on **registering property fell** (about 121 to 154). The World Bank **stopped** the report in **2021**.\n" +
        "- **Global Innovation Index** (**WIPO**): India rose from **81 (2015)** to **40 (2023)** and **39 (2024)**. Most of India's research money comes from the **government**, not private firms.\n" +
        "- **SDG India Index** (**NITI Aayog**, from 2018): scores States on the 17 Sustainable Development Goals. In **2020-21** the lowest were **Bihar, Jharkhand and Assam**; Kerala was top.\n" +
        "- The 17 SDGs include **zero hunger** (2), **reduced inequalities** (10), **responsible consumption and production** (12) and **life below water** (14). There is no goal called 'reduced unemployment'.",
      table: {
        columns: ["Index", "Published by", "India, with year"],
        rows: [
          {
            cells: ["Global Competitiveness Index", "World Economic Forum", "Three sub-indices in 2016-17; no life expectancy sub-index"],
            pyqExampleId: "4be87702-53bd-45dd-aad2-6ad57895d4db",
          },
          {
            cells: ["Ease of Doing Business", "World Bank (stopped 2021)", "142 in 2014 to 63 in 2019; registering property worsened"],
            pyqExampleId: "0d40b80a-47ee-43c0-b6ae-6265b5ba4d1d",
          },
          {
            cells: ["Global Innovation Index", "WIPO", "81 in 2015, 40 in 2023, 39 in 2024"],
            noteAmber: "Asked twice: CDS 2024 (I) and 2025 (II).",
            pyqExampleId: "8df4fb62-3628-4a9a-b912-7e7c3152f71b",
          },
          {
            cells: ["SDG India Index", "NITI Aayog", "2020-21 bottom three: Bihar, Jharkhand, Assam"],
            pyqExampleId: "c75b172f-5979-43bf-b2c4-297d5fab9e2e",
          },
        ],
      },
      pyqExampleId: "3a69b1de-6b7b-4cf8-af24-258e7616bdd8",
      selfCheckExample: {
        prompt: "A statement says: 'Private firms fund most of India's research and development, as in rich countries.' Is it true?",
        steps: [
          "In most advanced economies, business funds the larger part of research.",
          "In India the government still funds the larger part.",
        ],
        answer: "False: in India most research money comes from the government.",
      },
      practiceSet: [
        { prompt: "Which organisation publishes the Global Innovation Index?", answer: "The World Intellectual Property Organization (WIPO)" },
        { prompt: "Which body prepares the SDG India Index?", answer: "NITI Aayog" },
        { prompt: "On which Ease of Doing Business parameter did India's rank fall between 2014 and 2019?", answer: "Registering property" },
        { prompt: "Which State was at the top of the SDG India Index 2020-21?", answer: "Kerala" },
      ],
      traps: [
        {
          title: "A rank is true only for its year",
          body: "India's Global Innovation Index rank was **81** in 2015 and **39** in 2024. A ranking statement must be checked against the report the question names.",
        },
        {
          title: "Overall rank up, one parameter down",
          body: "India's Ease of Doing Business rank improved overall, yet its **registering property** rank got **worse**. Do not assume every parameter moved with the total.",
        },
      ],
    },
  ],
};
