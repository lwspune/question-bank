import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_IN_PLANNING_NOTE: SubtopicNote = {
  subtopicName: "Planning and Farm Policy",
  title: "Planning and Farm Policy",
  oneLineDefinition:
    "The Five Year Plans and their themes, NITI Aayog, the minimum support price and the public distribution system, and the farm, livestock and fisheries schemes.",
  whyItMatters:
    "Fifteen CDS questions, four of them from 2026. Three ask about planning; the rest name a farm or food scheme and ask what it does, so the aim of each scheme is what to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecin-plans",
      name: "The Five Year Plans and NITI Aayog",
      intuition:
        "From 1951 to 2017 India planned its economy in five-year blocks, each with a theme. Wars and droughts broke the sequence twice. In 2015 the Planning Commission gave way to NITI Aayog, which advises rather than allocates money.",
      definition:
        "The landmarks:\n" +
        "- **Planning Commission**: set up in **1950**, chaired by the Prime Minister.\n" +
        "- **Second Plan** (1956 to 1961) followed the **Mahalanobis model**: heavy industry first.\n" +
        "- **Plan holiday** (1966 to 1969): three annual plans after the 1965 war and two droughts.\n" +
        "- **Rolling plan** (1978 to 1980): adopted by the **Janata government**.\n" +
        "- **NITI Aayog** replaced the Planning Commission on **1 January 2015**. It is a **think tank** built on **cooperative federalism**: it designs strategies and long-term policy frameworks, but it **does not allocate funds** and does not impose policy on States.",
      table: {
        columns: ["Plan", "Years", "Theme"],
        rows: [
          { cells: ["First", "1951 to 1956", "Agriculture (Harrod-Domar model)"] },
          { cells: ["Second", "1956 to 1961", "Heavy industry (Mahalanobis model)"] },
          { cells: ["Third", "1961 to 1966", "A self-reliant, self-generating economy"] },
          {
            cells: ["Plan holiday", "1966 to 1969", "Three annual plans"],
            noteAmber: "CDS 2017 (II): Mahalanobis model, then plan holiday, then rolling plan.",
            pyqExampleId: "a8e893fc-dee9-449e-b273-45dac952fe4d",
          },
          { cells: ["Fourth", "1969 to 1974", "Growth with stability and self-reliance"] },
          { cells: ["Fifth", "1974 to 1979", "Removal of poverty and self-reliance"] },
          { cells: ["Rolling plan", "1978 to 1980", "Janata government"] },
          { cells: ["Seventh", "1985 to 1990", "Food, work and productivity"] },
          { cells: ["Ninth", "1997 to 2002", "Growth with social justice and equality"] },
          { cells: ["Eleventh", "2007 to 2012", "Faster and more inclusive growth"] },
          {
            cells: ["Twelfth (the last)", "2012 to 2017", "Faster, more inclusive and sustainable growth"],
            pyqExampleId: "7467119e-8acc-41c6-9e13-056f986fff50",
          },
        ],
      },
      pyqExampleId: "7467119e-8acc-41c6-9e13-056f986fff50",
      practiceSet: [
        { prompt: "Which Five Year Plan followed the Mahalanobis model?", answer: "The Second Plan (1956 to 1961)" },
        { prompt: "Which Plan had the theme 'food, work and productivity'?", answer: "The Seventh Plan" },
        { prompt: "On what date did NITI Aayog replace the Planning Commission?", answer: "1 January 2015" },
        { prompt: "Does NITI Aayog allocate funds to the States?", answer: "No. It is an advisory think tank" },
      ],
      traps: [
        {
          title: "NITI Aayog advises, it does not fund",
          body: "Unlike the Planning Commission, NITI Aayog **does not allocate money**; transfers to States go through the **Finance Ministry and the Finance Commission**. It does not impose policy on States either.",
        },
        {
          title: "Plan holiday before rolling plan",
          body: "The **plan holiday** was **1966 to 1969**; the **rolling plan** came later, **1978 to 1980**. The Mahalanobis model (Second Plan, 1956) came before both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecin-msp-food",
      name: "Minimum support price and the food system",
      intuition:
        "The government buys grain from farmers at a guaranteed price, stores it and sells it cheaply through ration shops. Three pieces make this work: the minimum support price, the Food Corporation of India and the public distribution system, with the National Food Security Act setting who is entitled.",
      definition:
        "The pieces:\n" +
        "- **Minimum support price (MSP)**: recommended by the **Commission for Agricultural Costs and Prices** (CACP). It weighs **cost of production**, demand and supply, **domestic and international price trends**, **inter-crop price parity**, the terms of trade between farming and other sectors, and the effect on consumers. A **cost of living index** is **not** one of its factors.\n" +
        "- **Food Corporation of India** (1965): **procures, stores and moves** grain and makes the bulk allocation to the States.\n" +
        "- **Public distribution system (PDS)**: run **jointly** by the Centre and the States. The **States alone identify the beneficiaries** and run the fair price shops; some add **pulses and edible oil**.\n" +
        "- **National Food Security Act, 2013**: covers up to **75 per cent of rural** and **50 per cent of urban** people, about **two thirds (67 per cent)** of the population, with **5 kg** of grain per person a month. It has run in **every State and Union Territory since November 2016**.",
      table: {
        columns: ["Item", "Who or what", "Key fact"],
        rows: [
          {
            cells: ["MSP", "CACP recommends", "Cost of production, price trends, inter-crop parity; not a cost of living index"],
            pyqExampleId: "1dd3d736-7ec2-4651-a651-76f413b82139",
          },
          { cells: ["Procurement and storage", "Food Corporation of India", "Moves grain to the States"] },
          { cells: ["Identifying beneficiaries", "State governments", "Not a joint task with the Centre"] },
          { cells: ["Food Security Act", "2013", "About 67 per cent of the population; all States and UTs since 2016"] },
        ],
      },
      pyqExampleId: "a19b7356-6d86-455e-b33a-c1936dfc42dc",
      selfCheckExample: {
        prompt: "A village has 1,000 people, all rural. Under the National Food Security Act, at most how many can be covered, and how much grain would each covered person get a month?",
        steps: [
          "The Act covers up to 75 per cent of rural people: 75 per cent of 1,000 is 750.",
          "Each covered person gets 5 kg a month.",
        ],
        answer: "Up to 750 people, 5 kg each a month.",
      },
      practiceSet: [
        { prompt: "Which body recommends the minimum support price?", answer: "The Commission for Agricultural Costs and Prices" },
        { prompt: "What share of India's urban population can the National Food Security Act cover?", answer: "Up to 50 per cent" },
        { prompt: "In which year was the National Food Security Act passed?", answer: "2013" },
      ],
      traps: [
        {
          title: "CACP recommends, it does not decide",
          body: "The CACP only **recommends** the MSP; the government announces it. And a **cost of living index** is not among the factors the CACP weighs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecin-farm-schemes",
      name: "Farm schemes",
      intuition:
        "Each farm scheme fixes one problem: water, soil, risk, credit or a crop the country imports. If you know which problem a scheme's name points at, you can rule out the options that belong to another scheme.",
      definition:
        "The schemes:\n" +
        "- **Pradhan Mantri Krishi Sinchayee Yojana** (PMKSY, 2015): **irrigation**. 'Har Khet Ko Pani', 'More crop per drop': convergence of irrigation investment, more land under assured irrigation, better on-farm water use.\n" +
        "- **Paramparagat Krishi Vikas Yojana** (PKVY, 2015-16): **organic farming** in clusters.\n" +
        "- **Pradhan Mantri Fasal Bima Yojana** (PMFBY, 2016): **crop insurance** against non-preventable natural risks; its aims include steady farm income and the **flow of credit** to agriculture. It **continues**, as does the **Restructured Weather Based Crop Insurance Scheme** (both extended to 2025-26).\n" +
        "- **PM Kisan Maandhan Yojana** (2019): pension for small and marginal farmers. **Modified Interest Subvention Scheme**: cheaper short-term crop loans.\n" +
        "- **National Mission on Edible Oils, Oil Palm** (2021): focus on the **North-East** and the **Andaman and Nicobar Islands**.\n" +
        "- **Ethanol blending**: India reached **10 per cent** blending in **2022**, ahead of target; most fuel ethanol comes from **sugarcane**, so the **sugar industry** gains most.\n" +
        "- **PM SVANidhi** (2020) gives loans to **urban street vendors**: it is **not** a farm scheme.",
      table: {
        columns: ["Scheme", "Year", "Aim"],
        rows: [
          {
            cells: ["PMKSY", "2015", "Irrigation and water use efficiency"],
            noteAmber: "CDS 2018 (I): protecting farmers against crop failure is not a PMKSY aim.",
            pyqExampleId: "2cd64fce-6648-4fc9-a3fc-9d0e62bdfb36",
          },
          { cells: ["PKVY", "2015-16", "Organic farming"] },
          {
            cells: ["PMFBY", "2016", "Crop insurance; continued, not discontinued"],
            noteAmber: "Asked twice: CDS 2025 (II) and 2026 (I). The ₹2 lakh death cover belongs to a different scheme.",
            pyqExampleId: "b293d404-0b71-4028-b997-ee2e55837f6b",
          },
          {
            cells: ["Oil palm mission", "2021", "Edible oil; North-East and Andaman and Nicobar"],
            pyqExampleId: "f4832db8-9b74-4715-bb53-bf568ebaa0b0",
          },
          {
            cells: ["Ethanol blending", "10 per cent reached in 2022", "Helps the sugar industry"],
            pyqExampleId: "a34879e6-c35e-4cb7-a308-b097accc17e9",
          },
          {
            cells: ["PM SVANidhi", "2020", "Loans to urban street vendors; not for farming"],
            pyqExampleId: "e846e283-34d7-4416-9d75-48eef3613ad6",
          },
        ],
      },
      pyqExampleId: "8a3a4c03-4cdd-45eb-852d-c9be8f18e025",
      practiceSet: [
        { prompt: "Which scheme carries the slogan 'More crop per drop'?", answer: "Pradhan Mantri Krishi Sinchayee Yojana" },
        { prompt: "Which crop gives India most of its fuel ethanol?", answer: "Sugarcane" },
        { prompt: "Which regions does the oil palm mission focus on?", answer: "The North-East and the Andaman and Nicobar Islands" },
        { prompt: "Whom does PM SVANidhi lend to?", answer: "Urban street vendors" },
      ],
      traps: [
        {
          title: "Insurance is PMFBY, not PMKSY",
          body: "**PMKSY** is about **irrigation**; protection against **crop failure** is **PMFBY**. Two similar names, two different jobs.",
        },
        {
          title: "Accident cover is not crop insurance",
          body: "A ₹2 lakh cover for **death or total disability** belongs to **Pradhan Mantri Suraksha Bima Yojana**, an accident insurance scheme, not to PMFBY.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecin-livestock-fisheries",
      name: "Livestock and fisheries",
      intuition:
        "Animals and fish give farm families income that does not depend on one harvest. The newer schemes push small businesses and startups in these sectors, not just higher output.",
      definition:
        "The schemes:\n" +
        "- **National Livestock Mission** (2014, restructured 2021-22): more output of **meat, egg, goat milk, wool and fodder**; **entrepreneurship** in small ruminants (sheep, goats), **poultry, piggery and fodder**; **risk management and livestock insurance**.\n" +
        "- **Department of Fisheries** (Ministry of Fisheries, Animal Husbandry and Dairying): the **Fisheries Startup Grand Challenge** (startups for productivity, sustainability and market access), the **Matsya Manthan** lecture series, and **business incubation centres** for fisheries startups.\n" +
        "- **Pradhan Mantri Matsya Sampada Yojana** (2020): the main scheme for fisheries growth.",
      table: {
        columns: ["Scheme or initiative", "What it does"],
        rows: [
          { cells: ["National Livestock Mission", "Output, entrepreneurship and insurance in livestock"] },
          {
            cells: ["Fisheries Startup Grand Challenge", "Finds startups with solutions for productivity, sustainability and market access"],
            pyqExampleId: "45cd0439-c355-4427-92cf-6991ff8342b1",
          },
          { cells: ["Matsya Manthan", "Lecture series to build innovation in fisheries"] },
          { cells: ["Pradhan Mantri Matsya Sampada Yojana", "Fisheries production and infrastructure, from 2020"] },
        ],
      },
      pyqExampleId: "b93914ce-40c6-4b0b-98bd-e061214cf4d4",
      practiceSet: [
        { prompt: "What is Matsya Manthan?", answer: "A lecture series to strengthen innovation in the fisheries sector" },
        { prompt: "Which scheme of 2020 is the main fisheries development scheme?", answer: "Pradhan Mantri Matsya Sampada Yojana" },
        { prompt: "Which ministry's department runs the Fisheries Startup Grand Challenge?", answer: "The Department of Fisheries, Ministry of Fisheries, Animal Husbandry and Dairying" },
      ],
      traps: [
        {
          title: "Livestock schemes now include insurance",
          body: "The National Livestock Mission covers **risk management and livestock insurance** as well as output and jobs. An option leaving insurance out is incomplete.",
        },
      ],
    },
  ],
};
