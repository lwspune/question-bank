import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_POPULATION_NOTE: SubtopicNote = {
  subtopicName: "Population Size and Growth",
  title: "Population Size and Growth",
  oneLineDefinition:
    "Which States have the most people and the most crowding, how India's population growth passed through four phases, and what the Census means by literacy, infant mortality and a young population.",
  whyItMatters:
    "Eleven CDS questions from 2016 to 2026. Four ask you to rank States by population or density, which needs the 2011 Census figures in your head. The others test the phases of growth and the exact definitions the Census uses.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-size-density",
      name: "State populations and density",
      intuition:
        "Population density is simply people per square kilometre. A big State can have many people and still be thinly spread; a small one can be crowded. " +
        "CDS likes to set four States in a row and ask for the right order, so learn the few numbers below rather than guessing from the map.",
      definition:
        "All figures are from the **2011 Census**, the latest complete count:\n" +
        "- India had about **121 crore** people and a **density of 382** persons per square kilometre.\n" +
        "- **Uttar Pradesh** is the **most populous** State (about 20 crore). **Sikkim** has the fewest people.\n" +
        "- **Bihar** is the **most densely** populated State (**1,106** per sq km). **Arunachal Pradesh** is the **least** (**17**).\n" +
        "- In the north-east, **Assam** is by far the densest (**398**), against Meghalaya (132), Nagaland (119) and Arunachal (17).",
      table: {
        columns: ["States compared", "Census 2011 figures"],
        rows: [
          {
            cells: ["Kerala, Jharkhand, Assam, Punjab (population)", "3.34 crore, 3.30 crore, 3.12 crore, 2.77 crore"],
            noteAmber: "CDS 2016 (II): Kerala, Jharkhand, Assam, Punjab is the decreasing order.",
            pyqExampleId: "767701ab-395b-4b94-8ac9-b28cec54cf04",
          },
          {
            cells: ["Meghalaya, Goa, Mizoram, Sikkim (population)", "29.7 lakh, 14.6 lakh, 10.9 lakh, 6.1 lakh"],
            noteAmber: "CDS 2019 (I): Meghalaya is the most populous of these four.",
            pyqExampleId: "b2080d16-2c37-4ba0-8245-127fa3f19c3d",
          },
          {
            cells: ["Arunachal, Mizoram, Sikkim, Himachal (density)", "17, 52, 86, 123 per sq km"],
            noteAmber: "CDS 2018 (II): this is the ascending order of density.",
            pyqExampleId: "c3eb6474-4be1-43dd-854c-4ffea726f5bb",
          },
          { cells: ["Assam, Meghalaya, Nagaland, Arunachal (density)", "398, 132, 119, 17 per sq km"] },
          { cells: ["Bihar and Arunachal Pradesh (density)", "1,106 (highest) and 17 (lowest) per sq km"] },
        ],
      },
      pyqExampleId: "2b5950de-35e8-4f17-acdc-78f1905c75cf",
      selfCheckExample: {
        prompt: "Density is people per square kilometre. A State has 1.2 crore people living on 60,000 square kilometres. What is its population density?",
        steps: [
          "1.2 crore is 1,20,00,000 people.",
          "Divide by the area: 1,20,00,000 ÷ 60,000 = 200.",
        ],
        answer: "200 persons per square kilometre",
      },
      practiceSet: [
        { prompt: "Which State had the highest population density in the 2011 Census?", answer: "Bihar, about 1,106 per sq km" },
        { prompt: "Which State had the lowest population density in the 2011 Census?", answer: "Arunachal Pradesh, about 17 per sq km" },
        { prompt: "Which is India's most populous State?", answer: "Uttar Pradesh" },
        { prompt: "What was India's population density in the 2011 Census?", answer: "About 382 persons per sq km" },
      ],
      traps: [
        {
          title: "Kerala just beats Jharkhand",
          body: "In 2011 **Kerala** (3.34 crore) had slightly more people than **Jharkhand** (3.30 crore). Options that put Jharkhand first are the trap; then come **Assam**, then **Punjab**.",
        },
        {
          title: "Large is not dense",
          body: "Arunachal Pradesh is the **largest** north-eastern State but the **least dense** in all India (17). **Assam** (398) is the densest in the north-east.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-growth",
      name: "Phases of population growth",
      intuition:
        "India's population did not grow at one steady speed. It stood almost still until 1921, then grew steadily as famines and epidemics were controlled, then shot up after 1951 as the death rate fell fast while families stayed large. " +
        "Since 1981 the growth rate has been falling, though the numbers keep rising.",
      definition:
        "- The **decadal growth rate** is the change in population over ten years, as a percentage of the population at the start.\n" +
        "- A Census year names the decade that **ends** in it: '1971' means the decade **1961 to 1971**.\n" +
        "- **1921** is the **demographic divide**: growth was stagnant before it and never fell back after it.\n" +
        "- Growth was **highest in 1961 to 1971** (about **24.8 per cent**), just above 1971 to 1981 (about 24.7). It fell to about **17.7 per cent** in 2001 to 2011.\n" +
        "- In **2001 to 2011** growth slowed in almost every State. **Tamil Nadu** was an exception: its growth **rose** from about 11.7 to about 15.6 per cent.",
      table: {
        columns: ["Period", "Phase"],
        rows: [
          { cells: ["1901 to 1921", "Stagnant or stationary growth"] },
          { cells: ["1921 to 1951", "Steady growth"] },
          {
            cells: ["1951 to 1981", "Population explosion; peak growth of about 24.8 per cent in 1961 to 1971"],
            noteAmber: "CDS 2020 (II): decadal growth was highest in the Census year 1971.",
            pyqExampleId: "bf5156d2-7881-4901-a2f5-b36cfd129fcf",
          },
          { cells: ["1981 onwards", "Growth still high but steadily slowing"] },
        ],
      },
      pyqExampleId: "e1d7721d-4f84-4443-94cf-ab60573ba55f",
      selfCheckExample: {
        prompt: "A district had 10 lakh people in 2001 and 11.5 lakh in 2011. What was its decadal growth rate?",
        steps: [
          "Increase over the decade: 11.5 lakh minus 10 lakh = 1.5 lakh.",
          "As a share of the starting population: 1.5 ÷ 10 = 0.15, which is 15 per cent.",
        ],
        answer: "15 per cent",
      },
      practiceSet: [
        { prompt: "What was India's decadal growth rate in 2001 to 2011?", answer: "About 17.7 per cent" },
        { prompt: "What name is given to India's population growth in 1951 to 1981?", answer: "Population explosion" },
        { prompt: "Was India's population growing fast or hardly at all between 1901 and 1921?", answer: "Hardly at all: growth was stagnant" },
        { prompt: "Which southern State's growth rate rose in 2001 to 2011 while most States' fell?", answer: "Tamil Nadu" },
      ],
      traps: [
        {
          title: "A Census year names the decade that ends",
          body: "The highest decadal growth was in **1961 to 1971**, recorded at the **1971** Census. An option '1961' points to the decade 1951 to 1961, which grew more slowly.",
        },
        {
          title: "Steady is not explosive",
          body: "**1921 to 1951** is **steady growth**. **1951 to 1981** is the **population explosion**. Swapping the two is the usual trap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-composition",
      name: "Literacy, age and infant mortality",
      intuition:
        "Behind each headline number is an exact definition, and CDS tests the definition rather than the number. Who counts as literate? Infant deaths out of what? " +
        "Learn the wording the Census uses; the wrong options change just one word of it.",
      definition:
        "- **Literate** (Census 2011): a person **aged seven or more** who can **both read and write with understanding** in **any language**. Someone who can read but not write is **not** literate.\n" +
        "- **Infant mortality rate (IMR)**: the number of **deaths of infants under one year** of age **per 1,000 live births** in a year.\n" +
        "- **Adolescents** (aged 10 to 19) were about **one-fifth** of India's people in 2011, a youthful group with high potential.\n" +
        "- India is a **young country**: its **median age is about 28 years** (UN estimate for the early 2020s), far below that of China, Japan or Europe.\n" +
        "- India had **more males than females**: the **sex ratio** was **943 females per 1,000 males** in 2011.",
      table: {
        columns: ["Measure", "Meaning or 2011 value"],
        rows: [
          { cells: ["Literate", "Aged 7 or more; reads and writes with understanding in any language"] },
          { cells: ["Literacy rate (2011)", "74 per cent: males 82 per cent, females 65 per cent"] },
          {
            cells: ["Infant mortality rate", "Deaths under one year of age per 1,000 live births in a year"],
            noteAmber: "CDS 2026 (I): the correct definition of IMR.",
            pyqExampleId: "f0b36b47-ae95-4b43-a533-59d7c414d204",
          },
          {
            cells: ["Adolescents (10 to 19)", "About one-fifth of the population"],
            noteAmber: "CDS 2021 (II): a youthful population with high potential, not half the population.",
            pyqExampleId: "3f53bef5-8945-427d-990d-3e77687c352d",
          },
          {
            cells: ["Median age", "About 28 years (early 2020s)"],
            pyqExampleId: "0369bd23-143b-44fc-9253-a31dcb6437e2",
          },
          { cells: ["Sex ratio (2011)", "943 females per 1,000 males"] },
        ],
      },
      pyqExampleId: "d9acc44b-20c1-4d71-a59c-617e5b4d3305",
      selfCheckExample: {
        prompt: "In one year a town records 4,000 live births, and 120 of those babies die before their first birthday. What is the town's infant mortality rate?",
        steps: [
          "IMR counts infant deaths per 1,000 live births.",
          "120 deaths out of 4,000 births is 120 ÷ 4 = 30 deaths for every 1,000 births.",
        ],
        answer: "30 per 1,000 live births",
      },
      practiceSet: [
        { prompt: "What was India's literacy rate in the 2011 Census?", answer: "About 74 per cent" },
        { prompt: "What was India's sex ratio in the 2011 Census?", answer: "943 females per 1,000 males" },
        { prompt: "Roughly what is India's median age today?", answer: "About 28 years" },
        { prompt: "From what age does the Census start counting people as literate or illiterate?", answer: "Seven years" },
      ],
      traps: [
        {
          title: "Reading alone is not literacy",
          body: "The Census counts a person as literate only if they can **both read and write** with understanding. A person who can **only read** is **not** literate.",
        },
        {
          title: "IMR is a rate, not a count",
          body: "IMR is infant deaths **per 1,000 live births**. A bare number of infant deaths in a year, or births per woman (that is the fertility rate), is a different measure.",
        },
        {
          title: "One-fifth, and more boys",
          body: "Adolescents were about **one-fifth** of India's people in 2011, **not half**. And as in the whole population, **males outnumber females** in this age group.",
        },
      ],
    },
  ],
};
