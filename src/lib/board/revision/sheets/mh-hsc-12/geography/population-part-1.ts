import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Geography, Ch. 1 Population: Part 1. Definitions in the Balbharati
 * text's own wording; most-asked years from the 46 board past-paper questions
 * in the bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Population: Part 1",
  chapterSlug: "population-part-1",
  source: "Balbharati Geography Std XII (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Population Geography",
      text: "A branch of Human Geography. It studies human population and its distribution and pattern on the earth's surface, its qualitative and quantitative composition, and how population influences the economy and development of a region.",
    },
    {
      term: "Population distribution",
      text: "The way people are spaced over the earth's surface. Human population is **unevenly** distributed throughout the world, and so is population density.",
    },
    {
      term: "Population by continent (pie chart, 2019)",
      text: "World population about 7.7 billion. Asia 59.65%, Africa 16.96%, Europe 9.69%, South America 8.40%, North America 4.75%, Australia 0.55%. **Antarctica** (about 9% of the land) is missing from the population chart: it has no permanent human settlements.",
    },
    {
      term: "Population density",
      text: "The number of people living in a unit area: total population divided by total area in sq. km. It is a function of the population and the area of a region.",
    },
    {
      term: "Population growth (population change)",
      text: "The change in number of inhabitants of a territory during a specific period of time. It may be positive (growth) or negative (decline), in absolute numbers or as a percentage. It is an important indicator of economic development.",
    },
    {
      term: "Components of population change",
      text: "There are **three**: births, deaths and **migration**. Population grows not only by a rising birth rate but also by a falling death rate.",
    },
    {
      term: "Crude birth rate (CBR)",
      text: "The number of live births in a year per thousand of population.",
    },
    {
      term: "Crude death rate (CDR)",
      text: "The number of deaths in a particular year per thousand of population, in a particular region.",
    },
    {
      term: "Why the rates are called crude",
      text: "They ignore the **age structure** of the population: they do not take into account the age group that is actually able to give birth.",
    },
    {
      term: "Demographic transition theory",
      text: "Based on the population trends of a country with time: a country passes through different stages of population growth, and may take several years to pass through a stage. Birth and death rates change with economic development.",
    },
    {
      term: "Population explosion",
      text: "Stage 2 (early expanding) of the theory: the death rate falls with medical care but the birth rate stays high, so the population grows rapidly. It has the **highest growth rate** of all stages.",
    },
    {
      term: "Population composition",
      text: "All the characteristics of a population that can be measured: rural and urban residence, age, marital status, sex ratio, etc.",
    },
    {
      term: "Population structure",
      text: "The overall picture we get by studying the composition of the population, e.g. the percentage of children, young and aged. It gives an idea of the dependency ratio and its effect on the economy.",
    },
  ],
  formulas: [
    {
      label: "Density of population",
      latex: "\\text{Density} = \\frac{\\text{Total population}}{\\text{Total area (in sq. km)}}",
    },
    {
      label: "Crude birth rate",
      latex: "\\text{CBR} = \\frac{\\text{Live births in a year}}{\\text{Total population in that year}} \\times 1000",
    },
    {
      label: "Crude death rate",
      latex: "\\text{CDR} = \\frac{\\text{Deaths in a year}}{\\text{Total population in that year}} \\times 1000",
    },
    {
      label: "Population growth and growth rate",
      latex:
        "\\text{Growth} = \\text{Present} - \\text{Earlier population} \\qquad \\text{Growth rate} = \\frac{\\text{Growth}}{\\text{Earlier population}} \\times 100",
    },
  ],
  derivations: [
    {
      title: "Explain the physical factors affecting distribution of population",
      steps: [
        "**Relief:** flat plains and gentle slopes are dense (crops, roads, industry easy), e.g. Ganga plains. Mountains and plateaus are sparse, e.g. Himalayas, except where there is livelihood (Dehradun, Leh).",
        "**Climate:** extreme heat, cold or very heavy rain repel people; equable climates attract them (Mediterranean). Amazon and Congo basins are sparse; only Eskimos and Lapps live in the cold.",
        "**Availability of water:** the most important factor, so river valleys and coasts are dense, e.g. Nile valley, coastal plains of India; in deserts people live near oases (Phalodi, Al-Ahsa).",
        "**Soils:** fertile loamy and alluvial soils support intensive agriculture: flood plains of the Mississippi, Ganga, Irrawaddy, Yangtze; black soil areas; volcanic slopes of Java, Japan, Sicily.",
      ],
    },
    {
      title: "Explain the human factors affecting distribution of population, with examples",
      steps: [
        "**Agriculture:** fertilisers and irrigation raise production and support more people; type of farming and crops matter (rice-growing regions are dense).",
        "**Mining:** minerals attract industries and workers: Katanga copper belt, Chota Nagpur Plateau, Appalachians (USA), Manchuria. Gold in the Australian desert and oil in South-West Asia draw people despite odd conditions.",
        "**Transportation:** roads and highways make a region accessible and raise density (Ambegaon Budruk, Pune); sea trade built port cities, so coasts of India and the USA are dense.",
        "**Urbanisation:** industries create towns; cities offer jobs, education, health care and transport, giving continuous urban belts, e.g. Greater Mumbai.",
        "**Government policies:** a government may populate an area (incentives in Siberia) or depopulate it (Japan paying people to leave Tokyo).",
      ],
    },
    {
      title: "Explain the demographic transition theory and its stages",
      steps: [
        "**Stage 1, high stationary:** high birth and death rates, stable population; agrarian, poor sanitation and medical care. No country is in this stage now.",
        "**Stage 2, early expanding:** death rate falls with medical care, birth rate stays high: rapid growth (population explosion). E.g. Congo, Bangladesh, Uganda, Niger.",
        "**Stage 3, late expanding:** both rates fall but birth rate stays above death rate, so the population still grows; incomes, education and family planning rise. E.g. China, India.",
        "**Stage 4, low stationary:** both rates low and almost equal, minimal growth; very high standard of living, secondary and tertiary activities dominate. E.g. USA.",
        "**Stage 5, declining:** birth rate very low, at or below the death rate; growth minimal or negative, few children, many elderly. E.g. Sweden, Finland.",
      ],
    },
    {
      title: "Difference between stage 1 and stage 5 (population growth almost nil in both)",
      steps: [
        "Stage 1: birth rate and death rate are both **high**; families big, economy agrarian, poor health care and high disease.",
        "Stage 5: birth rate is **very low** and equals or falls below a low death rate; very high standard of living, tertiary economy, many elderly.",
        "So growth is nil in both, but stage 1 is underdevelopment and stage 5 is a developed, ageing population.",
      ],
    },
    {
      title: "Correlation between birth rates and death rates",
      steps: [
        "Birth rates and death rates together decide growth or decline of a population.",
        "High birth rate, high death rate: population stable or a low increase (stage 1).",
        "High birth rate, falling or low death rate: rapid increase (stages 2 and 3).",
        "Low birth rate, low death rate: minimal growth (stage 4); birth rate below death rate: decline (stage 5).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Demographic transition theory graph (Fig 1.7)",
      labels: [
        "five stages named across the top",
        "birth rate line",
        "death rate line",
        "total population line",
        "natural increase shaded",
        "natural decrease in stage 5",
        "y axis: rates per 1000 people",
        "x axis: time",
      ],
    },
    {
      title: "Pie charts: land and population by continent (Fig 1.1)",
      labels: ["Asia: most land and most people", "Australia: least land and least people", "Antarctica: land but no population", "percentages for each continent"],
    },
    {
      title: "World outline map: population distribution (Fig 1.2)",
      labels: [
        "dense: Ganga plains, Bangladesh, China",
        "dense: Mumbai, Nile valley, Western Europe",
        "dense: south-east coast of Australia",
        "sparse: Amazon basin, Sahara",
        "sparse: Siberia, Greenland, Antarctica",
        "sparse: Himalayas",
      ],
    },
  ],
  mostAsked: [
    { topic: "Map: mark densely and sparsely populated places on a world outline map", years: [2026, 2025, 2024] },
    { topic: "Read the continent pie charts: highest, lowest, Europe's share, the missing continent", years: [2026, 2025] },
    { topic: "Give reasons: physical factors (relief, climate) make distribution uneven", years: [2026, 2025, 2024] },
    { topic: "Explain the human factors affecting distribution of population, with examples", years: [2026, 2025, 2024] },
    { topic: "Demographic transition theory: the stages, countries in each, population explosion", years: [2026, 2025, 2024] },
    { topic: "Components of population change; birth rate and death rate and their correlation", years: [2026, 2025, 2024] },
    { topic: "World population growth over time, read from a given graph", years: [2026] },
  ],
  mistakes: [
    {
      title: "Leaving out migration",
      body: "Population change has **three** components: births, deaths and migration. \"Migration is not a component of population change\" is a wrong statement.",
    },
    {
      title: "Per hundred instead of per thousand",
      body: "CBR and CDR are per **1000** of population. The growth rate is a percentage: growth divided by the earlier population, times 100.",
    },
    {
      title: "Mixing up stage 1 and stage 5",
      body: "Both have almost nil growth. Stage 1 has high birth and death rates; stage 5 has a very low birth rate at or below the death rate. No country is in stage 1 today.",
    },
    {
      title: "Wrong country for a stage",
      body: "Stage 2: Congo, Bangladesh, Uganda, Niger. Stage 3: China (and India). Stage 4: USA. Stage 5: Sweden, Finland. A late expanding country is China, not Sweden or Congo.",
    },
    {
      title: "Calling every mountain or desert empty",
      body: "Livelihood can concentrate people anyway: Dehradun and Leh in mountains, oases in deserts, gold mines in the Australian desert, coal and iron in the Appalachians.",
    },
    {
      title: "Reading Europe from the prose",
      body: "When the question gives the pie chart, answer from it: Europe holds 9.69% of the world's population (2019), Africa 16.96%, Australia 0.55%.",
    },
  ],
};

export default sheet;
