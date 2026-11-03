import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 11 Organisms and Populations. Definitions,
 * growth equations and interactions checked against the NCERT text (the
 * book's own wording, trimmed); most-asked years and marks from the CBSE
 * board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Organisms and Populations",
  chapterSlug: "organisms-and-populations",
  source: "NCERT Biology (CBSE Class 12), Chapter 11",
  keyPoints: [
    {
      term: "Population and its attributes",
      text: "Individuals of a species in a well defined geographical area that share or compete for similar resources and potentially interbreed. A population has attributes an individual does not: **birth rates and death rates** (per capita, e.g. 8 new lotus on 20 = 0.4 per lotus per year), **sex ratio** and **age distribution**.",
    },
    {
      term: "Age pyramid",
      text: "The plot of age distribution (per cent individuals of a given age or age group); for humans it shows males and females. Its shape reflects the **growth status** of the population: (a) **growing (expanding)**, (b) **stable** or (c) **declining**.",
    },
    {
      term: "Measuring population density (N)",
      text: "Total number is usually best, but **per cent cover or biomass** is more meaningful where numbers mislead (one huge banyan against 200 carrot grass plants). **Relative densities** serve too: **fish caught per trap**. Often estimated indirectly: the **tiger census** uses **pug marks and fecal pellets**.",
    },
    {
      term: "Four basic processes",
      text: "**Natality** (births) and **immigration** (individuals of the same species coming in) **increase** density; **mortality** (deaths) and **emigration** (individuals leaving) **decrease** it. Births and deaths matter most normally; immigration can matter more when a **new habitat is being colonised**.",
    },
    {
      term: "Exponential growth and r",
      text: "With **unlimited resources** a population grows in an exponential or geometric fashion: a **J-shaped curve**. **r**, the **intrinsic rate of natural increase**, is a very important parameter for assessing the impact of any biotic or abiotic factor on population growth: Norway rat 0.015, flour beetle 0.12, human population in India (1981) 0.0205.",
    },
    {
      term: "Logistic growth and carrying capacity (K)",
      text: "A habitat supports a maximum possible number, **nature's carrying capacity (K)**. With limited resources a population shows a **lag phase**, then **acceleration** and **deceleration**, and finally an **asymptote** at K: a **sigmoid curve**, the **Verhulst-Pearl Logistic Growth**. It is the **more realistic** model, since resources become limiting sooner or later.",
    },
    {
      term: "Life history variation",
      text: "Populations evolve to maximise **reproductive (Darwinian) fitness** (high r). Under a particular set of selection pressures, organisms evolve towards the **most efficient reproductive strategy**. Some breed once (Pacific salmon, bamboo), others many times (most birds and mammals); some produce many small offspring (oysters, pelagic fishes), others few large ones (birds, mammals).",
    },
    {
      term: "Population interactions (Table 11.1)",
      text: "**Mutualism (+, +)**, **competition (\\(-\\), \\(-\\))**, **predation (+, \\(-\\))**, **parasitism (+, \\(-\\))**, **commensalism (+, 0)**, **amensalism (\\(-\\), 0)**. Predation, parasitism and commensalism share one feature: the interacting species **live closely together**.",
    },
    {
      term: "Roles of predators",
      text: "Conduits for **energy transfer** to higher trophic levels; keep **prey populations under control** (prickly pear cactus in Australia was controlled only by a cactus-feeding **moth**); help **maintain species diversity** by reducing competition among prey (without the starfish *Pisaster*, over 10 invertebrate species went extinct). Predators are **prudent**: overexploited prey dies out, then so does the predator.",
    },
    {
      term: "Defences against predation",
      text: "Insects and frogs are **cryptically coloured (camouflaged)**; some are poisonous. The **Monarch butterfly** is distasteful to birds from a chemical it acquires as a **caterpillar by feeding on a poisonous weed**. Plants: **thorns** (*Acacia*, cactus) and chemicals; ***Calotropis*** makes poisonous **cardiac glycosides**, so cattle and goats never browse it. Nicotine, caffeine, quinine are defences too.",
    },
    {
      term: "Competition",
      text: "A process in which the **fitness of one species (its r) is significantly lower in the presence of another**. Even unrelated species compete (flamingoes, fishes for zooplankton); in **interference competition** resources need not be limiting. **Gause's Competitive Exclusion Principle:** two closely related species competing for the same resources cannot co-exist indefinitely; the inferior one is eliminated eventually.",
    },
    {
      term: "Evidence of competition and resource partitioning",
      text: "**Abingdon tortoise** (Galapagos) became extinct within a decade of **goats** arriving (greater browsing efficiency). **Competitive release:** Connell found the larger barnacle ***Balanus*** excludes the smaller ***Chathamalus*** on the rocky coasts of Scotland. **Resource partitioning:** **MacArthur's five warbler species** on one tree co-exist by foraging differently.",
    },
    {
      term: "Parasitism and commensalism",
      text: "**Parasites** are often **host-specific** and co-evolve with the host. **Ectoparasites:** lice on humans, ticks on dogs, copepods on marine fish; plant: *Cuscuta*. **Brood parasitism:** the **cuckoo (koel)** lays eggs in the **crow's** nest; its eggs resemble the host's. **Commensalism (+, 0):** orchid on mango, **barnacles on a whale**, **cattle egret and grazing cattle**, **clown fish and sea anemone**.",
    },
    {
      term: "Mutualism and co-evolution",
      text: "**Lichens**, **mycorrhizae**. **Fig and wasp** (like **yucca and its moth**): a one-to-one relationship; the wasp pollinates the fig while seeking egg-laying sites, and the fig gives it some **developing seeds** for its larvae. **Ophrys** uses **sexual deceit**: a petal resembles the female bee, the male **pseudocopulates** and carries pollen; if the bee changes, the flower must **co-evolve**.",
    },
  ],
  formulas: [
    {
      label: "Population density after one time period",
      latex: "N_{t+1} = N_t + [(B + I) - (D + E)]",
      symbols: [
        { symbol: "\\(N_t\\)", meaning: "population density at time t" },
        { symbol: "B, I", meaning: "births and immigrants (increase density)" },
        { symbol: "D, E", meaning: "deaths and emigrants (decrease density)" },
      ],
    },
    {
      label: "Exponential growth",
      latex: "\\frac{dN}{dt} = (b - d) \\times N = rN",
      symbols: [
        { symbol: "b, d", meaning: "per capita birth and death rates" },
        { symbol: "r", meaning: "intrinsic rate of natural increase, r = b minus d" },
      ],
    },
    {
      label: "Exponential growth, integral form",
      latex: "N_t = N_0 e^{rt}",
      symbols: [
        { symbol: "\\(N_0\\)", meaning: "population density at time zero" },
        { symbol: "e", meaning: "base of natural logarithms (2.71828)" },
      ],
    },
    {
      label: "Logistic growth (Verhulst-Pearl)",
      latex: "\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)",
      symbols: [
        { symbol: "K", meaning: "carrying capacity" },
        { symbol: "N", meaning: "population density at time t" },
      ],
    },
  ],
  derivations: [
    {
      title: "Describe the logistic growth curve with a graph and its equation",
      steps: [
        "Resources are limited, so individuals compete; the habitat supports at most **K**, the carrying capacity.",
        "Plot N against time: **lag phase**, then **acceleration**, then **deceleration**, and an **asymptote** when N reaches K.",
        "The curve is **sigmoid**; the equation is \\(\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)\\).",
        "Contrast: unlimited resources give the J-shaped exponential curve \\(\\frac{dN}{dt} = rN\\). The logistic model is more realistic.",
      ],
    },
    {
      title: "Find the population density from natality, mortality, immigration and emigration",
      steps: [
        "Write \\(N_{t+1} = N_t + [(B + I) - (D + E)]\\).",
        "Add births and immigrants; subtract deaths and emigrants. Net increase = \\((B + I) - (D + E)\\).",
        "E.g. B = 280, D = 200, I = 40, E = 50: net increase = 320 \\(-\\) 250 = 70.",
        "To find \\(N_t\\) from \\(N_{t+1}\\), rearrange: \\(N_t = N_{t+1} - (B + I) + (D + E)\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Age pyramids for human population (Figure 11.1)",
      labels: ["expanding: broad base (triangular)", "stable: bell-shaped", "declining: narrow base (urn-shaped)", "pre-reproductive, reproductive, post-reproductive", "males and females on either side"],
    },
    {
      title: "Population growth curves (Figure 11.3)",
      labels: ["a: exponential, J-shaped", "b: logistic, sigmoid", "K: carrying capacity (dotted line)", "population density N against time t"],
    },
    {
      title: "Factors changing population density (Figure 11.2)",
      labels: ["population density N", "natality and immigration (in)", "mortality and emigration (out)"],
    },
  ],
  mostAsked: [
    {
      topic: "Population growth: exponential (J-shaped) and logistic (sigmoid) curves, dN/dt = rN, r and carrying capacity K",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Predation: roles of predators, prudent predators, prickly pear, prey and plant defences (Monarch butterfly, Calotropis)",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Mutualism and co-evolution: fig and wasp, Ophrys and its bee (sexual deceit), yucca and moth",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Commensalism and parasitism: cattle egret, clown fish and sea anemone, barnacles on whale, brood parasitism (cuckoo and crow)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Competition: Gause's competitive exclusion principle, Connell's barnacles, Abingdon tortoise, resource partitioning",
      marks: 1,
      years: [2026, 2023, 2022],
    },
    {
      topic: "Population attributes and density: per cent cover, biomass, relative density, pug marks; natality, mortality, immigration and emigration",
      marks: 2,
      years: [2026, 2025, 2023, 2022],
    },
    {
      topic: "Age pyramids: expanding, stable and declining populations",
      years: [2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Commensalism called mutualism",
      body: "Barnacles on a whale, an orchid on a mango tree, cattle egret with cattle and clown fish in a sea anemone are **commensalism (+, 0)**: the whale, tree, cattle and anemone get no benefit.",
    },
    {
      title: "J and S curves swapped",
      body: "**Exponential** (unlimited resources) is **J-shaped**; **logistic** (limited resources, levels off at K) is **sigmoid**. Label the dotted line as **K, carrying capacity**.",
    },
    {
      title: "Signs wrong in the density equation",
      body: "Births and immigrants are **added**, deaths and emigrants **subtracted**. Rearrange carefully when \\(N_{t+1}\\) is given and \\(N_t\\) is asked.",
    },
    {
      title: "Gause's principle stated without its condition",
      body: "It applies to **closely related species** competing for the **same, limiting** resources; the **inferior** one is eliminated. With non-limiting resources species may co-exist by **resource partitioning**.",
    },
    {
      title: "Wrong source of the Monarch's poison",
      body: "The butterfly acquires the chemical **as a caterpillar** by feeding on a **poisonous weed**; it is not made by the adult. *Calotropis* is avoided for its **cardiac glycosides**.",
    },
    {
      title: "Who is the parasite in brood parasitism",
      body: "The **cuckoo (koel)** is the parasite; the **crow** is the host that incubates the eggs. The cuckoo's eggs resemble the crow's in size and colour.",
    },
  ],
};

export default sheet;
