import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_NI_INDUSTRY_NOTE: SubtopicNote = {
  subtopicName: "Industrial Policy",
  title: "Industrial Policy",
  oneLineDefinition:
    "How industrial output is measured (the IIP and the eight core industries), the Maharatna and Navratna companies, and the schemes from Make in India to PM MITRA.",
  whyItMatters:
    "Twelve CDS questions, three of them in 2026. Scheme questions name the scheme and ask its aim or its year; the core industries were asked twice (2018 (I) and 2022 (II)).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecni-iip-core",
      name: "The IIP and the eight core industries",
      intuition:
        "The Index of Industrial Production tracks how much factories, mines and power plants produce each month, against a base year. Eight basic industries feed almost every other one, so they are tracked in their own index and make up about two fifths of the IIP.",
      definition:
        "The facts:\n" +
        "- **IIP**: released monthly by the **NSO (MoSPI)**, base year **2011-12**.\n" +
        "- **Use-based weights**: **primary goods about 34 per cent** (the largest), intermediate goods about 17, consumer non-durables about 15, consumer durables about 13, infrastructure and construction goods about 12, capital goods about 8.\n" +
        "- **Index of Eight Core Industries**: compiled by the **Office of the Economic Adviser, DPIIT**. The eight carry about **40.27 per cent** of the IIP's weight.\n" +
        "- The eight, by weight: **refinery products** (about 28 per cent, the largest), **electricity**, **steel**, **coal**, **crude oil**, **natural gas**, **cement** and **fertilizers** (the smallest).\n" +
        "- In **2015-16**, **natural gas** output **fell**, while coal, refinery products and fertilizers grew.",
      table: {
        columns: ["Core industry", "Weight in the core index (per cent)"],
        rows: [
          { cells: ["Refinery products", "28.04"] },
          { cells: ["Electricity", "19.85"] },
          { cells: ["Steel", "17.92"] },
          { cells: ["Coal", "10.33"] },
          { cells: ["Crude oil", "8.98"] },
          {
            cells: ["Natural gas", "6.88"],
            noteAmber: "CDS 2018 (I): natural gas was the core industry with negative growth in 2015-16.",
            pyqExampleId: "7c199cef-06a3-475a-aa58-29d9ba738fe4",
          },
          { cells: ["Cement", "5.37"] },
          { cells: ["Fertilizers", "2.63"] },
        ],
      },
      pyqExampleId: "7f6f5115-a0cc-47cf-a40b-8ea47a3deb66",
      selfCheckExample: {
        prompt: "In the use-based IIP, which group carries the largest weight: capital goods, primary goods or consumer durables?",
        steps: [
          "The weights are about 8 per cent for capital goods, 34 for primary goods and 13 for consumer durables.",
        ],
        answer: "Primary goods.",
      },
      practiceSet: [
        { prompt: "Which core industry has the largest weight in the Index of Eight Core Industries?", answer: "Refinery products" },
        { prompt: "Which office compiles the Index of Eight Core Industries?", answer: "The Office of the Economic Adviser, DPIIT" },
        { prompt: "Which core industry has the smallest weight?", answer: "Fertilizers" },
        { prompt: "What is the base year of the current IIP?", answer: "2011-12" },
      ],
      traps: [
        {
          title: "Two different bodies",
          body: "The **IIP** comes from the **NSO under MoSPI**; the **core industries** index comes from the **Office of the Economic Adviser in DPIIT**. Do not give both to one office.",
        },
        {
          title: "Primary goods outweigh capital goods",
          body: "In the use-based IIP, **primary goods** (mining, electricity and the like) weigh about **34 per cent**; **capital goods** only about **8**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-psu",
      name: "Maharatna, Navratna and Miniratna companies",
      intuition:
        "The government grades its large companies (central public sector enterprises) so that the best ones can invest and decide without asking a ministry each time. The grade sets how much freedom they get: Maharatna most, then Navratna, then Miniratna.",
      definition:
        "The grades:\n" +
        "- **Miniratna** (1997, Categories I and II): smaller profit-making companies.\n" +
        "- **Navratna** (1997): more freedom to invest; a company must be a Miniratna Category I first.\n" +
        "- **Maharatna** (2010): the largest; a company must be a **Navratna**, **listed**, with large turnover, net worth and profit.\n" +
        "- **Coal India Limited**: **Maharatna** (2011) under the **Ministry of Coal**, the **largest coal producer in the world**, headquarters **Kolkata**.\n" +
        "- **IndianOil**, **GAIL** and **BPCL** are **Maharatna**; **Bharat Electronics (BEL)** is **Navratna**. A status can be upgraded, so it holds for the year asked.",
      table: {
        columns: ["Company", "Status", "Note"],
        rows: [
          {
            cells: ["Coal India Limited", "Maharatna", "World's largest coal producer; headquarters Kolkata, not Ranchi"],
            pyqExampleId: "38930bb4-d3c6-4abb-9fa1-eddfae9338a1",
          },
          { cells: ["IndianOil Corporation", "Maharatna", "Oil refining and marketing"] },
          { cells: ["GAIL (India)", "Maharatna", "Natural gas"] },
          { cells: ["Bharat Petroleum", "Maharatna", "Upgraded in 2017"] },
          { cells: ["Bharat Electronics", "Navratna", "Defence electronics"] },
        ],
      },
      pyqExampleId: "3dae4b1b-653a-40a4-a849-b216264d1fbf",
      practiceSet: [
        { prompt: "Which grade must a company hold before it can become a Maharatna?", answer: "Navratna" },
        { prompt: "In which year was the Maharatna grade created?", answer: "2010" },
        { prompt: "Where is the headquarters of Coal India Limited?", answer: "Kolkata" },
      ],
      traps: [
        {
          title: "Coal India sits in Kolkata",
          body: "Coal India's headquarters is in **Kolkata**, West Bengal. Ranchi hosts one of its subsidiaries (Central Coalfields), which is the usual distractor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-missions",
      name: "Industrial schemes and missions",
      intuition:
        "Since 2014 the government has launched a string of schemes to bring investment into Indian factories and new firms. CDS names one and asks what it does or when it began; the name itself usually tells you the aim.",
      definition:
        "In time order:\n" +
        "- **Invest India** (2009): a **not-for-profit joint venture** company and India's **National Investment Promotion and Facilitation Agency**, under **DPIIT**.\n" +
        "- **Make in India** (**25 September 2014**): to facilitate investment, **foster innovation**, build skills and build manufacturing infrastructure.\n" +
        "- **Startup India** (16 January 2016) and its **Fund of Funds for Startups**, **₹10,000 crore**, run by **SIDBI**. A **second fund of funds** of about ₹10,000 crore (Budget 2025-26) aims at **deep-tech** and technology-led manufacturing startups.\n" +
        "- **Atmanirbhar Bharat** (May 2020): with **production-linked incentive (PLI)** schemes, to raise manufacturing and exports and to draw foreign firms to produce in India.\n" +
        "- **PM MITRA** (2021): **Pradhan Mantri Mega Integrated Textile Region and Apparel** parks, seven large textile parks covering the whole chain from fibre to garment.\n" +
        "- **MSMEs**: the second-largest employer after agriculture; low capital per job, so they suit backward regions.\n" +
        "- **Sunrise sectors**: new, fast-growing industries, such as **food processing**.",
      table: {
        columns: ["Scheme", "Year", "Aim"],
        rows: [
          {
            cells: ["Invest India", "2009", "National investment promotion and facilitation agency; non-profit joint venture"],
            pyqExampleId: "ba9832e5-8d5c-43b9-b1e8-c5e6377444c8",
          },
          {
            cells: ["Make in India", "2014", "Investment, innovation, skills, manufacturing infrastructure"],
            noteAmber: "CDS 2019 (II): launched in 2014, not 2018.",
            pyqExampleId: "3322adcd-588c-4982-9969-28039cd4f606",
          },
          {
            cells: ["Startup India Fund of Funds 2.0", "2025", "About ₹10,000 crore for deep-tech startups, run through SIDBI"],
            pyqExampleId: "db702c2b-de6c-4424-85c6-9ce64a15340f",
          },
          {
            cells: ["Atmanirbhar Bharat", "2020", "Manufacturing and exports; foreign investment in domestic production"],
            pyqExampleId: "2b4eecd8-f92a-4b06-a424-327cf69535df",
          },
          { cells: ["PM MITRA", "2021", "Integrated textile and apparel parks"] },
        ],
      },
      pyqExampleId: "e730a720-37cf-4386-a218-8c12cae821fd",
      practiceSet: [
        { prompt: "Which agency is India's National Investment Promotion and Facilitation Agency?", answer: "Invest India" },
        { prompt: "Which bank runs the Fund of Funds for Startups?", answer: "SIDBI" },
        { prompt: "On what date was Make in India launched?", answer: "25 September 2014" },
        { prompt: "Name a sector the government calls a sunrise sector.", answer: "Food processing" },
      ],
      traps: [
        {
          title: "SIDBI runs the startup fund, not NITI Aayog",
          body: "The Fund of Funds for Startups is operated through **SIDBI**. NITI Aayog is a policy think tank and runs no such fund.",
        },
        {
          title: "Old sectors are not sunrise sectors",
          body: "Sunrise sectors are **new and fast-growing**. Manufacturing, textiles and services as a whole are long-established, so they are not the answer.",
        },
      ],
    },
  ],
};
