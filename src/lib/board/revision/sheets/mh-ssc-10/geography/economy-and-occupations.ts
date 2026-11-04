import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 8 Economy and Occupations. India and Brazil side
 * by side, checked against the Balbharati Geography Std X text; most-asked
 * years and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Economy and Occupations",
  chapterSlug: "economy-and-occupations",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Sectors in GDP (2016 pie charts)",
      text: "Brazil: primary 5.5%, secondary 27.5%, **tertiary 67%**. India: primary 17%, secondary 26%, tertiary 57%. Brazil's economy depends mainly on **tertiary** activities.",
    },
    {
      term: "Population engaged (2016 pie charts)",
      text: "Brazil: primary 10%, secondary 19%, tertiary 71%. India: **primary 48.8%**, secondary 24.3%, tertiary 26.9%. India's agriculture engages far more people than Brazil's.",
    },
    {
      term: "Mixed and developing economies",
      text: "Both are **mixed** economies: sectors such as banking, railways, airways, health and telecommunications are run by both the public and private sectors. Both are **developing** economies.",
    },
    {
      term: "Per capita income",
      text: "India's national income is higher than Brazil's, but its per capita income is lower because of its **massive population**. 2016: Brazil 8840, India 1680, USA 56280 US dollars.",
    },
    {
      term: "Agriculture in Brazil",
      text: "Main occupation in the highlands and coastal areas. Rice and maize are the cereals; coffee, cocoa, rubber, soyabean and sugarcane are commercial crops. Brazil is the **largest exporter of coffee and soyabean**; coffee: Minas Gerais and Sao Paulo. Cattle in the southern Savannah.",
    },
    {
      term: "Mining in Brazil",
      text: "The **east** is rich in iron ore, manganese, nickel, copper, bauxite, tungsten and diamonds. Mining is limited in the interior by **inaccessibility**, lack of knowledge of reserves and **dense forests**.",
    },
    {
      term: "Fishing in Brazil",
      text: "Coast of about 7400 km. The warm **Brazil current** meets the cold **Falkland current** off the south-east coast: a good fishing ground. Swordfish, shrimp, lobsters, sardines. Amazon fish are little used.",
    },
    {
      term: "Agriculture in India",
      text: "About 60% of land is cultivated, on level plains, rich soils and a long growing season. Mainly **subsistence** type. Rice, wheat, maize, sorghum, millets; tea, coffee, rubber plantations; sugarcane, cotton, jute.",
    },
    {
      term: "Fishing in India",
      text: "Adds to food supply, employment, nutrition and foreign exchange. Coast about 7500 km. Marine fishing is about 40% and inland fishing about **60%** of the catch. Sardines, mackerel, Bombay duck, prawns.",
    },
    {
      term: "Mining in India",
      text: "The **Chhota Nagpur plateau** is a storehouse of minerals. Coal: Korba (Chhattisgarh), eastern Maharashtra. Mineral oil: **Digboi** (Assam), Mumbai High, Kalol and Koyali (Gujarat). Marble: Rajasthan.",
    },
    {
      term: "Industries in Brazil",
      text: "Iron and steel, automobiles, petroleum, chemicals, cement; sugar, cotton, silk and woollen textiles. Most large industries are in the **south and south east**; the north east is the poorest part but attracts new investment.",
    },
    {
      term: "Industries in India",
      text: "Highly uneven. Steel centres in the north-eastern Peninsula, near coal and minerals. Agro-based industries near their raw materials; coir and fish canning in Kerala. Salt: Gujarat, Rajasthan, Tamil Nadu.",
    },
    {
      term: "Trade of Brazil",
      text: "Exports iron ore, coffee, cocoa, cotton, sugar, tobacco, oranges, bananas. Imports machinery, chemicals, fertilisers, wheat, mineral oil. Partners: Germany, USA, Canada, Italy, Argentina, Saudi Arabia.",
    },
    {
      term: "Trade of India",
      text: "Exports tea, mangoes, coffee, **spices**, leather goods, iron ore, cotton and silk textiles. Imports petroleum, machines, precious stones, gold. Partners: UK, USA, Germany, Japan, China, Russia.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Read the pie charts of sectors (GDP and population engaged)",
      labels: ["Primary, secondary, tertiary", "Share in GDP", "Share of population", "India and Brazil compared"],
    },
    {
      title: "Map of Brazil: occupations to mark",
      labels: ["Coffee region (Minas Gerais, Sao Paulo)", "Coal producing regions", "Iron ore (east)", "Fishing ground (south-east coast)"],
    },
  ],
  mostAsked: [
    { topic: "Read the pie charts of sectors in GDP and population engaged, or draw and read an export graph", marks: 6, years: [2025, 2024, 2020] },
    { topic: "Developing economies: per capita income, Brazil's tertiary sector, primary activities", marks: 1, years: [2026, 2025, 2022] },
    { topic: "Agriculture, mining and industries of Brazil", marks: 4, years: [2026, 2025, 2022, 2020] },
    { topic: "Fishing: important for India; Brazil's south-eastern coast", marks: 3, years: [2026, 2024, 2022] },
    { topic: "Map: coal and coffee regions of Brazil, Digboi refinery in India", marks: 1, years: [2026, 2022, 2020] },
    { topic: "Trade: Brazil's partners, India famous for spices, India a major trading partner", marks: 1, years: [2026, 2024] },
    { topic: "Give reasons: there is mixed economy in Brazil and India", marks: 3, years: [2026] },
    { topic: "India: subsistence agriculture, salt producing states", marks: 1, years: [2022, 2020] },
  ],
  mistakes: [
    {
      title: "Brazil as an agrarian economy",
      body: "Brazil's GDP comes mainly from **tertiary** activities (67%). India depends more on agriculture. Tourism is tertiary, so it is the odd man out among primary activities.",
    },
    {
      title: "Low national income as the reason",
      body: "India's national income is **higher** than Brazil's. Its per capita income is lower because of its **massive population**.",
    },
    {
      title: "Mixing up the two pie charts",
      body: "One chart is share in **GDP**, the other is share of **population engaged**. India's primary sector: 17% of GDP but 48.8% of people.",
    },
    {
      title: "Wrong partner, crop or state",
      body: "China is India's partner, not one of Brazil's listed partners. Jowar is not a crop of Brazil. Bihar does not produce salt (Gujarat, Rajasthan, Tamil Nadu do).",
    },
    {
      title: "Fishing in the Amazon",
      body: "Brazil's fishing is on the **south-east coast**, where warm and cold currents meet. Inland fishing in the Amazon is small. In India, inland fishing gives about 60% of the catch.",
    },
  ],
};

export default sheet;
