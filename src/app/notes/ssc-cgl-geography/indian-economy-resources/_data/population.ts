import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIE_POPULATION_NOTE: SubtopicNote = {
  subtopicName: "Population and Census 2011",
  title: "Population and Census 2011",
  oneLineDefinition:
    "The Census 2011 figures SSC asks (population, density, sex ratio, literacy, urban share), the States and Union Territories at the top and bottom of each list, and the phases of India's population growth.",
  whyItMatters:
    "Forty-three questions in the bank, the most on any page of this chapter: 17 from the 2023 shifts, 14 from the 2024 shifts and 12 from the 2025 shifts. Almost every one asks a Census 2011 number or which State tops a list, so a short table of figures and toppers is worth more here than any explanation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgiepo-census",
      name: "Census 2011: the headline numbers",
      intuition:
        "A handful of Census 2011 numbers come up again and again. Learn them as a set, because the wrong options are usually the same digits shuffled (382 against 328 or 282).",
      definition:
        "The facts:\n" +
        "- Census 2011 was the **15th** census since 1872 (the 7th after Independence). Its slogan was **Our Census, Our Future**.\n" +
        "- It ran in two phases: house-listing in 2010, and the **population count in February 2011**.\n" +
        "- India's population was about **121 crore**. **Uttar Pradesh** had the most people, about 20 crore or **16.5%**; **Maharashtra** was second.\n" +
        "- **Density: 382** persons per sq km (325 in 2001).\n" +
        "- **Urban share: 31%** (about 37.7 crore people).\n" +
        "- Growth from 2001: 17.7% in the decade, an annual exponential rate of **1.64%**.\n" +
        "- Ages: **0 to 14** years were **30.76%**; adolescents (**10 to 19**) were **20.9%**.\n" +
        "- The most populous district was **Thane** (Maharashtra).",
      table: {
        columns: ["Measure", "Census 2011"],
        rows: [
          { cells: ["Population density", "382 per sq km"], pyqExampleId: "21e25602-084c-4c99-8658-87c8cfaddde6" },
          { cells: ["Urban share", "31%"] },
          { cells: ["Annual exponential growth", "1.64%"], pyqExampleId: "b8037f1a-0ff8-4c6c-92c7-5e1959edd5a9" },
          { cells: ["Children 0 to 14", "30.76%"], pyqExampleId: "c9606278-9810-4d0d-8c51-6584858625bf" },
          { cells: ["Adolescents 10 to 19", "20.9%"], pyqExampleId: "be5db374-b15d-4712-b017-262558063634" },
          { cells: ["Most populous State", "Uttar Pradesh (about 16.5%)"], pyqExampleId: "167060c7-0d9c-42d5-a62c-38f7820a5e35" },
          { cells: ["Number of the census", "15th (since 1872)"], pyqExampleId: "491e654b-2dae-435c-9c2e-97a1cc06af3e" },
        ],
      },
      pyqExampleId: "20268321-dc30-4e3d-ad62-172063d7bae4",
      selfCheckExample: {
        prompt: "Name the two most populous States in Census 2011 and give India's population density.",
        steps: ["Uttar Pradesh was first and Maharashtra second (Bihar third).", "India's density was 382 persons per square kilometre."],
        answer: "Uttar Pradesh and Maharashtra; 382 per sq km.",
      },
      practiceSet: [
        { prompt: "What was the slogan of Census 2011?", answer: "Our Census, Our Future" },
        { prompt: "Which district had the largest population in Census 2011?", answer: "Thane" },
        { prompt: "What share of India's people lived in towns and cities in 2011?", answer: "About 31%" },
        { prompt: "In which month and year were people counted in Census 2011?", answer: "February 2011" },
      ],
      traps: [
        {
          title: "382, not 328 or 282",
          body: "India's density in 2011 was **382**. The options shuffle the same digits, so read them slowly.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgiepo-states",
      name: "Sex ratio, literacy and the States at the top",
      intuition:
        "SSC asks which State or Union Territory is highest or lowest on a measure. Kerala tops almost every social measure; Haryana and two small Union Territories sit at the bottom of the sex ratio.",
      definition:
        "Sex ratio (females per 1000 males):\n" +
        "- India **943** (940 in the first, provisional figures). Highest State **Kerala 1084**; highest Union Territory **Puducherry 1037**.\n" +
        "- Lowest State **Haryana 879**; Delhi **868**; lowest of all **Daman and Diu 618**.\n" +
        "- The UTs with the highest ratios: Puducherry, Lakshadweep, Andaman and Nicobar.\n\n" +
        "Literacy:\n" +
        "- Men **82.14%**, women **65.46%**: a gap of **16.68** points. Since 2001 men gained 6.88 points and women 11.79.\n" +
        "- **Kerala** (94%) was highest, then Himachal Pradesh (83%), with Haryana (76%) lower.\n\n" +
        "Other toppers:\n" +
        "- Highest urban share among States: **Goa**. Densest UTs: **Delhi, Chandigarh, Puducherry**. Most slum dwellers among UTs: **Delhi**.\n" +
        "- Largest tribal population: **Madhya Pradesh**, then Maharashtra, then Odisha.\n" +
        "- **Himachal Pradesh**: the highest Hindu share and the highest female work participation.\n" +
        "- Fastest growth from 2001 among those SSC lists: **Meghalaya**, Arunachal Pradesh, Bihar.\n" +
        "- **Tripuri**, spoken in Tripura, is a **Tibeto-Burman** language.",
      table: {
        columns: ["Measure", "Highest", "Lowest"],
        rows: [
          { cells: ["Sex ratio, States", "Kerala 1084", "Haryana 879"], pyqExampleId: "f4253b16-0e80-4cd0-a6c3-c57a7b0a28c4" },
          { cells: ["Sex ratio, UTs", "Puducherry 1037", "Daman and Diu 618"], pyqExampleId: "7bfc4d00-c6ce-4969-ba11-aa9c907bd0f6" },
          { cells: ["Literacy", "Kerala", "Bihar"], pyqExampleId: "c2dca86f-d1d3-4621-ba26-b7e558fd17fb" },
          { cells: ["Urban share, States", "Goa", "Himachal Pradesh"] },
          { cells: ["Density, UTs", "Delhi", "Andaman and Nicobar"], pyqExampleId: "c47ea636-eed2-4edb-b302-36d4848f7283" },
        ],
      },
      pyqExampleId: "6c93a5d9-8878-4082-9c80-93d325fd84dd",
      selfCheckExample: {
        prompt: "Male literacy in 2011 was 82.14% and female literacy 65.46%. What was the gap, and which State had the highest literacy?",
        steps: ["82.14 minus 65.46 is 16.68 percentage points.", "Kerala had the highest literacy, about 94%."],
        answer: "16.68 points; Kerala.",
      },
      practiceSet: [
        { prompt: "Which State had the highest sex ratio in 2011?", answer: "Kerala (1084)" },
        { prompt: "Which State had the largest Scheduled Tribe population in 2011?", answer: "Madhya Pradesh" },
        { prompt: "Which Union Territory had the most slum dwellers in 2011?", answer: "Delhi" },
        { prompt: "To which language family does Tripuri belong?", answer: "Tibeto-Burman" },
      ],
      traps: [
        {
          title: "Lowest State and lowest overall differ",
          body: "**Haryana (879)** is the lowest **State**; the lowest of all is the Union Territory **Daman and Diu (618)**. Read whether the question says State.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgiepo-growth",
      name: "Growth phases, workers and population policy",
      intuition:
        "India's population grew in four phases, from almost no growth to an explosion and then a slow easing. SSC asks the years of each phase, how the Census counts workers, and what the 2000 population policy aimed for.",
      definition:
        "Four phases of growth:\n" +
        "- **1901 to 1921**: stagnant (stationary).\n" +
        "- **1921 to 1951**: steady growth.\n" +
        "- **1951 to 1981**: **population explosion**, as death rates fell fast.\n" +
        "- **1981 onwards**: high growth that is slowly easing.\n\n" +
        "A population **stabilises** when births and deaths are nearly equal. India's pyramid is **broad at the base** and narrow at the top: many young people.\n\n" +
        "Workers: a **main worker** works 183 days or more in a year, a **marginal worker** fewer than 183. **Agricultural workers** were **54.6%** of all workers in 2011. Men migrate mostly for **work**, women mostly for **marriage**.\n\n" +
        "**National Population Policy 2000** aimed at free schooling to 14, an infant mortality rate **below 30** per 1000, and later marriage for girls. It did **not** aim to raise fertility.\n\n" +
        "Settlements: **dispersed** in hills such as Uttarakhand and Himachal Pradesh, **clustered** in the plains.",
      table: {
        columns: ["Phase", "Years"],
        rows: [
          { cells: ["Stagnant", "1901 to 1921"], pyqExampleId: "e23a2bc1-befd-43e9-9aed-2847a602595f" },
          { cells: ["Steady growth", "1921 to 1951"] },
          { cells: ["Population explosion", "1951 to 1981"], pyqExampleId: "6437e18f-162d-4a08-ad71-ccaf1d3f487e" },
          { cells: ["High growth, slowing", "1981 onwards"] },
        ],
      },
      pyqExampleId: "7563fea1-a0b7-4761-96b5-d8cb36c7f571",
      selfCheckExample: {
        prompt: "A farmhand worked 120 days last year. How does the Census classify him?",
        steps: ["A main worker works 183 days or more in a year.", "120 days is fewer than 183, so he is a marginal worker."],
        answer: "A marginal worker.",
      },
      practiceSet: [
        { prompt: "Which period is called the population explosion in India?", answer: "1951 to 1981" },
        { prompt: "What share of India's workers were in agriculture in 2011?", answer: "54.6%" },
        { prompt: "What is the main reason men migrate, according to the Census?", answer: "Work and employment" },
        { prompt: "When does a population stabilise?", answer: "When birth and death rates are nearly equal" },
      ],
      traps: [
        {
          title: "The pyramid is not broad at the top",
          body: "India's population pyramid is **broad at the base** and **narrows upwards**. A statement that it is broad at both base and top is false.",
        },
      ],
    },
  ],
};
