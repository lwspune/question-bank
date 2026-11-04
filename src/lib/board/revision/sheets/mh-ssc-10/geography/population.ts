import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 6 Population. India and Brazil side by side,
 * checked against the Balbharati Geography Std X text; most-asked years and
 * marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Population",
  chapterSlug: "population",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Population as a resource",
      text: "Population is an important resource of any country. Its qualitative aspects (health, education, skills) matter for a nation's economic and social progress.",
    },
    {
      term: "India: size and density",
      text: "About **121 crore** (Census 2011), the **second** most populous country. India has 2.41% of the world's land but 17.5% of its population. Average density: **382 persons per sq km**.",
    },
    {
      term: "India: dense areas",
      text: "Distribution is very uneven; physiography and climate decide it. Fertile plain land and water, with farming, industries and trade, crowd people into the northern plains and cities like Delhi, Kolkata, Mumbai, Pune, Bengaluru and Chennai.",
    },
    {
      term: "India: sparse areas",
      text: "Mountains and hills, dry deserts and dense forests: density is sparse because of inaccessibility, absence of facilities and tough life.",
    },
    {
      term: "Brazil: size and density",
      text: "About **19 crore** (Census 2010): **5th** in the world in population and also 5th in area; the most populated country of South America. 5.6% of the world's land, 2.78% of its population. Density: about **23 persons per sq km**.",
    },
    {
      term: "Brazil: where people live",
      text: "Most Brazilians live within **300 km of the eastern coast**, where agriculture and industries have flourished. The central and western parts are less populated; the highlands are moderate.",
    },
    {
      term: "Amazon basin: sparse",
      text: "Unfavourable climate, heavy rainfall, inaccessibility and dense forests are barriers to settlement, so the Amazon basin is very sparsely populated.",
    },
    {
      term: "Sex ratio",
      text: "The number of **females per 1000 males** in a region. Brazil: more than 1000 for decades, women rising since 2001. India: men outnumber women; a slight rise after 1991.",
    },
    {
      term: "Age and sex pyramid",
      text: "Shows age and sex of a population. India has more **youth** (a higher working population) and more children. Brazil's population is slowly getting older: more people above 80.",
    },
    {
      term: "Growth rate",
      text: "Brazil's growth rate has fallen sharply; its population may not increase in the next two decades. India's rate was high till 1971, then stabilised and is now declining, but the population is still growing (up 18.2 crore from 2001 to 2011).",
    },
    {
      term: "Life expectancy",
      text: "The average number of years a person born in a country is expected to live. Its rise is an **indicator of development**. India about 68 years (41 in 1960); Brazil 75.",
    },
    {
      term: "Literacy rate",
      text: "Literacy rate is **higher in Brazil** than in India.",
    },
    {
      term: "Census",
      text: "Both count every ten years: India at the start of a decade (1961, 1971), Brazil (IBGE) at the end (1960, 1970). The first census of both was in 1872.",
    },
  ],
  formulas: [
    { label: "Population density", latex: "\\text{Density} = \\dfrac{\\text{Total population}}{\\text{Area in sq km}}" },
    { label: "Sex ratio", latex: "\\text{Sex ratio} = \\dfrac{\\text{Number of females}}{\\text{Number of males}} \\times 1000" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Draw a simple bar or line graph from given data",
      labels: ["Title of the graph", "Years on the X axis", "Percentage on the Y axis", "Scale written", "Bars of equal width", "Values and index"],
    },
    {
      title: "Age and sex pyramid (India and Brazil)",
      labels: ["Age groups on the Y axis", "Males on the left", "Females on the right", "Percentage of population"],
    },
  ],
  mostAsked: [
    { topic: "Draw a bar or line graph (literacy rate of India, urban population of Brazil or India) and answer questions on it", marks: 6, years: [2026, 2025, 2024, 2022] },
    { topic: "Read a graph: sex ratio, life expectancy, or the age and sex pyramid of India and Brazil", marks: 6, years: [2025, 2022, 2020] },
    { topic: "Map: mark or read population density and urbanised states (India and Brazil)", marks: 1, years: [2026, 2025, 2024, 2022, 2020] },
    { topic: "Distribution and density: India dense, Brazil sparse, east coast of Brazil crowded, factors", marks: 3, years: [2026, 2025, 2024, 2020] },
    { topic: "Composition: sex ratio, proportion of youth, literacy in India and Brazil", marks: 1, years: [2025, 2024, 2020] },
    { topic: "Rank: India second, Brazil fifth, Brazil most populated in South America", marks: 1, years: [2025, 2024, 2020] },
    { topic: "Most urbanised state of India (Goa)", marks: 1, years: [2026, 2022, 2020] },
    { topic: "Give reasons: population is an important resource", marks: 3, years: [2026] },
  ],
  mistakes: [
    {
      title: "A falling growth rate read as a falling population",
      body: "A line going down on a growth rate graph means the population is growing **more slowly**, not that it is decreasing.",
    },
    {
      title: "Sex ratio per 100",
      body: "Sex ratio is females per **1000** males. Brazil's is above 1000; India's is below 1000 (men outnumber women).",
    },
    {
      title: "Western Brazil is densely populated",
      body: "Wrong. The **eastern coast** is dense; the west and the Amazon basin are sparse. In India the north west is not dense either; the Ganga plains are.",
    },
    {
      title: "Youth and old age swapped",
      body: "India has the higher proportion of youth and children; Brazil has more old people. Brazil has the higher sex ratio, literacy and life expectancy.",
    },
    {
      title: "Graph with no title or scale",
      body: "Every graph needs a title, labelled axes, a written scale and equal bar widths. Read the interval from the Y axis and work out increases by subtracting values.",
    },
    {
      title: "Most urbanised state",
      body: "**Goa** is the most urbanised state of India (62% urban). Himachal Pradesh has a low population density.",
    },
  ],
};

export default sheet;
