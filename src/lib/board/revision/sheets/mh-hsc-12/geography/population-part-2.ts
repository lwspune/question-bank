import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Geography, Ch. 2 Population: Part 2. Definitions in the Balbharati
 * text's own wording; most-asked years from the 46 board past-paper questions
 * in the bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Population: Part 2",
  chapterSlug: "population-part-2",
  source: "Balbharati Geography Std XII (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Population as a human resource",
      text: "Population is also considered as a human resource. Its physical and intellectual characteristics affect the development of a region; if human resources are not developed, the use of other resources suffers too.",
    },
    {
      term: "Age structure",
      text: "The number of people in different age groups: infants, children, teenagers, young, adults, old people. Each group's share varies from country to country.",
    },
    {
      term: "Population pyramid",
      text: "Used by demographers to show the age and genderwise distribution of a population. Y-axis in the centre: age groups; X-axis: population or percentage. Left side males, right side females. **Base** = children, **apex** = old people.",
    },
    {
      term: "Working and dependent population",
      text: "A large 15 to 59 age group means a larger independent working population (manpower). Many children (0 to 15) mean a high dependency ratio; a growing 60 plus group means more spending on medical and health facilities.",
    },
    {
      term: "Sex ratio",
      text: "The ratio between the number of women and men; in India, females per 1000 males. World average 990. Highest in Latvia, Estonia, Russia, Ukraine (1162); least in Saudi Arabia (667). Asia is generally low. In India, Kerala is highest (1084, Census 2011).",
    },
    {
      term: "Demographic dividend",
      text: "The growth in an economy that results from a change in the age structure of a country's population. As birth and death rates fall, young dependents become fewer relative to the working population. It is not automatic: it needs the right policies.",
    },
    {
      term: "Life expectancy and retirement age",
      text: "Ageing populations grow because life expectancy is increasing, which puts pressure on pensions and medical facilities. So many countries are raising the retirement age, e.g. **Japan** (life expectancy about 84) is considering 70.",
    },
    {
      term: "Literacy rate",
      text: "The proportion of literate population is an indicator of a country's socio-economic development. Economic development is both a cause and a consequence of literacy. Every country has its own definition of literacy.",
    },
    {
      term: "Literacy in India",
      text: "The percentage of population **above 7 years** of age which is able to read, write and do arithmetic calculations with understanding.",
    },
    {
      term: "Occupational structure",
      text: "The share of the working population (15 to 59) in primary, secondary, tertiary and quaternary occupations: a good indicator of the level of economic development. An agrarian economy has a high share in primary activities.",
    },
    {
      term: "Rural and urban composition",
      text: "Based on residence. Rural areas: people mainly in primary activities. Urban areas: most of the working population in non-primary activities. The criteria differ from country to country.",
    },
    {
      term: "Migration",
      text: "The movement of an individual or group from one place to another, or across a political boundary, for a shorter or longer time or permanently. It may be planned or sudden, voluntary or involuntary.",
    },
    {
      term: "Types of migration",
      text: "By region: **internal** (within the country, e.g. to Mumbai from other states) and **external** (to another country). By duration: **short-term** or seasonal (sugarcane labour in Maharashtra), **long-term** and **permanent**.",
    },
    {
      term: "Push and pull factors",
      text: "**Push** factors make people leave their original place: fewer jobs, war, drought, pollution. **Pull** factors attract them to a region: education, employment opportunities.",
    },
  ],
  formulas: [
    {
      label: "Sex ratio (India)",
      latex: "\\text{Sex ratio} = \\frac{\\text{Total female population}}{\\text{Total male population}} \\times 1000",
    },
  ],
  derivations: [
    {
      title: "Three types of population pyramids (expansive, constrictive, stationary)",
      steps: [
        "**Expansive:** broad base, narrowing apex: more people die at each higher band; high birth rate and high death rate (developing, young country).",
        "**Constrictive:** narrower base, broader apex: fewer young and more elderly; low birth rate and lower death rate (developed country).",
        "**Stationary:** almost all age groups have the same share; very low birth and death rates; population hardly grows.",
      ],
    },
    {
      title: "Outline the importance of population pyramids in the study of populations",
      steps: [
        "Show the age and sex distribution of a population at a glance, and the number of men and women in each age group.",
        "The shape tells the birth and death rates and the stage of development (expansive, constrictive, stationary).",
        "They show the working population (15 to 59) and the dependents, young and old, so the dependency burden.",
        "So they help plan for the future: schools, jobs, medical care for the aged, pensions.",
      ],
    },
    {
      title: "Reasons for migration",
      steps: [
        "**Physical:** earthquakes, volcanic eruptions, droughts, floods.",
        "**Economic:** search for jobs and business, a better standard of living.",
        "**Social:** discrimination, education, health and medical facilities, marriage.",
        "**Political:** war or political problems make people seek refuge in another country.",
      ],
    },
    {
      title: "Examine the impact of migration on the population (donor and recipient regions)",
      steps: [
        "Migration changes the distribution and density of population in both regions.",
        "**Donor region:** population falls and facilities go unused; sex ratio and age structure change, e.g. Kerala's men work abroad, so its sex ratio is high (1084) and children and the old outnumber the young.",
        "**Recipient region:** pressure on housing, water and transport; farmland turned to housing, land prices rise, slums, inequality and crime grow; sex ratio low (Mumbai 832).",
        "But the recipient region gains working population, new ideas, research and technology, so economic development.",
      ],
    },
    {
      title: "Give reasons: literacy rate is an indicator of socio-economic development",
      steps: [
        "It reveals the standard of living, the social status of females, educational facilities and government policies.",
        "Economic development is both a cause and a consequence of literacy.",
        "Literate, skilled people find better work, so developed regions (Europe, North America) have high literacy and Sub-Saharan Africa the lowest.",
      ],
    },
    {
      title: "Give reasons: in developed countries the share of people in agriculture is low",
      steps: [
        "The share of workers in each sector shows the level of economic development.",
        "Only a developed economy with industries and infrastructure can absorb more workers in secondary, tertiary and quaternary activities.",
        "If the economy is still agrarian, the share in primary activities is high; in India it fell from 71.9% (1901) to 48.96% (2011) as industry grew.",
      ],
    },
    {
      title: "Demographic dividend: how it shows in a country",
      steps: [
        "Fewer dependents and more workers: personal savings grow and stimulate the economy.",
        "With fewer children, parents invest more in their education, building human capital.",
        "More women join the labour force and add to economic growth.",
        "Per capita GDP increases because the dependency ratio falls.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Three types of population pyramids (Fig 2.1)",
      labels: ["age groups on the central Y-axis", "population on the X-axis", "males left, females right", "base: children; apex: old", "expansive, constrictive, stationary shapes"],
    },
    {
      title: "Adult literacy rate by region and sex, 2016 (Fig 2.3)",
      labels: ["highest: Central Asia, Europe and North America", "lowest: Sub-Saharan Africa", "female rate below male in most regions", "equal only where literacy is full"],
    },
    {
      title: "Occupational structure of India, 1901 to 2011 (Table 2.3)",
      labels: [
        "primary falls: 71.9% to 48.96%",
        "secondary rises: 12.5% to 23.52%",
        "tertiary rises: 15.6% to 27.52%",
        "cultivators the largest group every decade",
        "cultivators highest 52.8% (1961)",
        "agricultural labourers lowest 16.7% (1961)",
      ],
    },
    {
      title: "Push and pull factors between donor and recipient regions",
      labels: ["donor region", "recipient region", "push factors from the donor", "pull factors towards the recipient"],
    },
  ],
  mostAsked: [
    { topic: "Age structure, dependency, demographic dividend and life expectancy (Japan highest)", years: [2026, 2025, 2024] },
    { topic: "Migration: meaning, reasons, rural to urban, effect on distribution and density", years: [2026, 2025, 2024] },
    { topic: "Give reasons: literacy rate is an indicator of socio-economic development", years: [2026, 2025, 2024] },
    { topic: "Population pyramids: types, and the broad base and broad apex assertion", years: [2026, 2025, 2024] },
    { topic: "Occupational structure: developed countries and agriculture; reading India's occupation data", years: [2026, 2025] },
    { topic: "Read the adult literacy graph by region and sex (Sub-Saharan Africa lowest)", years: [2026, 2024] },
    { topic: "Population composition and sex ratio: highest in the world and in India", years: [2026, 2024] },
    { topic: "Differentiate between donor region and recipient region", years: [2026, 2024] },
  ],
  mistakes: [
    {
      title: "Choosing the wrong option in the pyramid assertion",
      body: "\"Broad base means many children\" and \"broad apex means many elderly\" are both correct, but the apex does not explain the base: both correct, R **not** the correct explanation of A.",
    },
    {
      title: "Writing the sex ratio upside down",
      body: "In India it is **females per 1000 males**. Kerala (1084) is the highest state; Mumbai (832) is low because men migrate in for work.",
    },
    {
      title: "Mixing up constrictive and stationary",
      body: "Constrictive: narrow base, broad apex (more elderly). Stationary: almost the same share in every age group, population hardly grows.",
    },
    {
      title: "Wrong age for literacy in India",
      body: "India counts people **above 7 years** who can read, write and do arithmetic with understanding. Every country has its own definition.",
    },
    {
      title: "Putting relief in population composition",
      body: "Composition is what can be measured about people: age structure, sex ratio, literacy, occupation, rural and urban residence. Relief is a physical factor of distribution.",
    },
    {
      title: "Swapping donor and recipient",
      body: "The donor region is the one people leave (push factors); the recipient region is the one they move to (pull factors).",
    },
  ],
};

export default sheet;
