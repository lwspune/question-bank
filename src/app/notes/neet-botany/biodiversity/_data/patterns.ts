import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_BD_PATTERNS_NOTE: SubtopicNote = {
  subtopicName: "Patterns of Biodiversity",
  title: "Patterns of Biodiversity",
  oneLineDefinition:
    "The three levels of biodiversity, how many species the world and India hold, why the tropics are richest, the species-area relationship and why species-rich communities are more stable.",
  whyItMatters:
    "Three NEET questions, all MODERATE. NEET 2024 asked why the tropics hold the most species and matched four scientists to their ideas; Re-NEET 2026 asked the Amazon groups in order of species count. Each turns on an exact NCERT number, name or reason.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbobd-numbers",
      name: "Levels of biodiversity and how many species",
      intuition:
        "Biodiversity is variety at every level: the genes inside one species, the many species in a place, and the many kinds of ecosystems in a country. Counting it is hard, because most species have not even been named yet.",
      definition:
        "Biodiversity in NCERT:\n" +
        "- The term was popularised by the sociobiologist **Edward Wilson**. It means the diversity at all levels of biological organisation.\n" +
        "- **Genetic diversity**: one species can vary a lot genetically. *Rauwolfia vomitoria* in different Himalayan ranges differs in the potency and concentration of the chemical **reserpine**. India has more than **50,000** genetically different strains of rice and **1,000** varieties of mango.\n" +
        "- **Species diversity**: the Western Ghats have a greater **amphibian** species diversity than the Eastern Ghats.\n" +
        "- **Ecological diversity**: India, with its deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows, has a greater ecosystem diversity than a Scandinavian country like Norway.\n" +
        "- **How many species**: the IUCN (2004) puts the described plant and animal species at slightly more than **1.5 million**. **Robert May** places the global species diversity at about **7 million**.\n" +
        "- More than **70 percent** of all recorded species are **animals**; plants (algae, fungi, bryophytes, gymnosperms and angiosperms) are no more than **22 percent**. Among animals, **insects** are the richest group: 7 of every 10 animals are insects. There are more species of **fungi** than of fishes, amphibians, reptiles and mammals put together.\n" +
        "- **Prokaryotes** are left out of these estimates, because the usual taxonomic methods do not work for them.\n" +
        "- **India** has only **2.4 percent** of the world's land area but **8.1 percent** of its species diversity, and is one of the **12 mega diversity** countries. Nearly **45,000** plant species and twice as many animal species have been recorded here.",
      table: {
        columns: ["Group in the Amazonian rain forest", "Species recorded"],
        rows: [
          {
            cells: ["Invertebrates", "More than 1,25,000"],
            noteAmber: "Re-NEET 2026: asked the order invertebrates, plants, fishes, birds, mammals, from most species to fewest.",
            pyqExampleId: "8c1d0a95-af85-4a67-8d05-922ce7c30678",
          },
          { cells: ["Plants", "More than 40,000"] },
          { cells: ["Fishes", "3,000"] },
          { cells: ["Birds", "1,300"] },
          { cells: ["Mammals", "427"] },
          { cells: ["Amphibians", "427"] },
          { cells: ["Reptiles", "378"] },
        ],
        caption: "The largely tropical Amazonian rain forest of South America has the greatest biodiversity on Earth.",
      },
      pyqExampleId: "8c1d0a95-af85-4a67-8d05-922ce7c30678",
      selfCheckExample: {
        prompt: "About 1.5 million species have been described, and Robert May estimates about 7 million species in all. Roughly what percentage of all species has been recorded so far?",
        steps: [
          "Divide the described species by the estimated total: \\(1.5 \\div 7 \\approx 0.21\\).",
          "That is about 21 percent, which NCERT rounds to 22 percent.",
          "So nearly four of every five species are still unknown to science.",
        ],
        answer: "Only about 22 percent of all species have been recorded.",
      },
      practiceSet: [
        { prompt: "Who popularised the term biodiversity?", answer: "The sociobiologist Edward Wilson" },
        { prompt: "Name the three levels of biodiversity.", answer: "Genetic diversity, species diversity and ecological diversity" },
        { prompt: "Which chemical varies in potency and concentration in *Rauwolfia vomitoria* from different Himalayan ranges?", answer: "Reserpine" },
        { prompt: "What share of the world's land area and of its species diversity does India have?", answer: "2.4 percent of the land and 8.1 percent of the species diversity" },
        { prompt: "Which group makes up 7 of every 10 recorded animal species?", answer: "Insects" },
        { prompt: "Which ghats have the greater amphibian species diversity, and which level of biodiversity does this show?", answer: "The Western Ghats; species diversity" },
      ],
      traps: [
        {
          title: "India's 8.1 percent is its share of species, not land",
          body: "India holds **2.4 percent** of the world's land area but **8.1 percent** of its species diversity. Swapping the two numbers reverses what makes India a mega diversity country.",
        },
        {
          title: "Prokaryotes are not in the species estimates",
          body: "The 1.5 million described and the 7 million estimated species leave out **prokaryotes**, because conventional taxonomic methods cannot identify them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobd-latitude",
      name: "Latitudinal gradient in diversity",
      intuition:
        "Walk from the equator towards a pole and the number of species keeps falling. The warm, steady tropics have had more time, more energy and more stable conditions for new species to form and live side by side.",
      definition:
        "The latitudinal gradient in NCERT:\n" +
        "- Species diversity **decreases** as we move away from the **equator** towards the **poles**. The **tropics** (23.5° N to 23.5° S) hold more species than temperate or polar areas.\n" +
        "- A tropical forest such as one in **Ecuador** has up to **10 times** as many species of vascular plants as a forest of equal area in a temperate region such as the Midwest of the USA.\n" +
        "- In the Amazonian rain forest there may be at least **two million insect species** still waiting to be discovered.\n" +
        "Three reasons for more species in the tropics:\n" +
        "- **Time**: speciation is generally a function of time. Temperate regions went through frequent **glaciations** in the past, but tropical latitudes stayed relatively **undisturbed for millions of years**, giving a long evolutionary time for species to diversify.\n" +
        "- **Constant environment**: tropical environments, unlike temperate ones, are **less seasonal**, relatively more **constant and predictable**. Such constant environments promote **niche specialisation** and so greater species diversity.\n" +
        "- **Energy**: more **solar energy** is available in the tropics, which gives **higher productivity**. This might in turn add to greater diversity.",
      table: {
        columns: ["Place", "Where it lies", "Bird species"],
        rows: [
          { cells: ["Colombia", "Near the equator", "Nearly 1,400"] },
          { cells: ["India", "Largely tropical latitudes", "More than 1,200"] },
          { cells: ["New York", "41° N", "105"] },
          { cells: ["Greenland", "71° N", "56"] },
        ],
        caption: "The further from the equator, the fewer the bird species.",
      },
      pyqExampleId: "06a4a611-b642-4a89-9179-9710e2a6224c",
      selfCheckExample: {
        prompt: "Arrange Greenland, Colombia and New York from the most bird species to the fewest, and give the rule that explains the order.",
        steps: [
          "Colombia lies near the equator: nearly 1,400 bird species.",
          "New York lies at 41° N: 105 species.",
          "Greenland lies at 71° N: 56 species.",
          "Diversity falls as latitude rises, away from the equator.",
        ],
        answer: "Colombia, then New York, then Greenland; species diversity decreases from the equator towards the poles.",
      },
      practiceSet: [
        { prompt: "Between which latitudes do the tropics lie?", answer: "23.5° N and 23.5° S" },
        { prompt: "A tropical forest in Ecuador has up to how many times as many vascular plant species as an equal temperate forest?", answer: "Up to 10 times" },
        { prompt: "What did temperate regions go through in the past that cut short their time for speciation?", answer: "Frequent glaciations" },
        { prompt: "How many insect species may still be undiscovered in the Amazonian rain forest?", answer: "At least two million" },
        { prompt: "How many bird species does India, lying largely in tropical latitudes, have?", answer: "More than 1,200" },
      ],
      traps: [
        {
          title: "The tropics are less seasonal, not more",
          body: "Tropical environments are **less seasonal**, more **constant and predictable** than temperate ones. A statement calling them more seasonal is the false one.",
        },
        {
          title: "More solar energy, not less",
          body: "The tropics receive **more solar energy**, which raises **productivity**. A statement that less energy reaches the tropics is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbobd-species-area",
      name: "Species-area relationship and stable communities",
      intuition:
        "Search a bigger area and you find more species, but each new patch adds fewer new ones than the last. On log scales this slowing curve becomes a straight line whose slope tells us how fast richness climbs with area.",
      definition:
        "Species and area in NCERT:\n" +
        "- **Alexander von Humboldt**, the German naturalist and geographer, found in the South American jungles that within a region species richness **increases with the explored area, but only up to a limit**.\n" +
        "- Species richness against area for many groups (angiosperm plants, birds, bats, freshwater fishes) gives a **rectangular hyperbola**. On a **logarithmic** scale it becomes a **straight line**: \\(\\log S = \\log C + Z \\log A\\).\n" +
        "- **Z**, the slope of the line (the regression coefficient), lies between **0.1 and 0.2** whatever the group or region: plants in Britain, birds in California or molluscs in New York state.\n" +
        "- For very large areas such as **whole continents** the line is much steeper, with Z between **0.6 and 1.2**. For **frugivorous** (fruit-eating) birds and mammals in tropical forests of different continents the slope is **1.15**.\n" +
        "Species diversity and the ecosystem:\n" +
        "- Communities with **more species** tend to be **more stable**. A stable community does not vary much in **productivity** from year to year, is resistant or resilient to occasional disturbance, and resists **invasion by alien species**.\n" +
        "- **David Tilman**'s long-term ecosystem experiments using **outdoor plots** showed that plots with more species had **less year-to-year variation** in total biomass, and that greater diversity gave **higher productivity**.\n" +
        "- **Paul Ehrlich**'s **rivet popper hypothesis**: an ecosystem is like an airplane held together by thousands of rivets (species). Popping a few rivets may not matter at first, but the plane grows weaker as more go. Losing rivets on the **wings** (key species that drive major ecosystem functions) is far more serious than losing a few on the seats or windows.\n" +
        "- **Robert May** places the global species diversity at about **7 million**.",
      formula: {
        label: "Species-area relationship, log form",
        latex: "\\log S = \\log C + Z \\log A",
        symbols: [
          { symbol: "\\(S\\)", meaning: "species richness" },
          { symbol: "\\(A\\)", meaning: "area" },
          { symbol: "\\(Z\\)", meaning: "slope of the line, the regression coefficient" },
          { symbol: "\\(C\\)", meaning: "the Y-intercept" },
        ],
      },
      authoredExample: {
        prompt: "In a region where Z = 0.2, the area surveyed is made 100 times larger. By about how many times does the species richness rise?",
        steps: [
          "Write the equation for both areas and subtract: \\(\\log S_2 - \\log S_1 = Z(\\log A_2 - \\log A_1)\\).",
          "The area ratio is 100, so \\(\\log A_2 - \\log A_1 = \\log 100 = 2\\).",
          "So \\(\\log (S_2/S_1) = 0.2 \\times 2 = 0.4\\).",
          "\\(S_2/S_1 = 10^{0.4} \\approx 2.5\\).",
        ],
        answer: "About 2.5 times as many species: a hundredfold area does not give a hundredfold richness.",
      },
      pyqExampleId: "0ce4547b-b5ba-48ff-8057-a9e51f5a9029",
      selfCheckExample: {
        prompt: "For an island group, log C = 1 and Z = 0.2 when area is in square kilometres. How many species are expected on an area of 100,000 square kilometres?",
        steps: [
          "\\(\\log A = \\log 100000 = 5\\).",
          "\\(\\log S = \\log C + Z \\log A = 1 + 0.2 \\times 5 = 2\\).",
          "\\(S = 10^{2} = 100\\).",
        ],
        answer: "About 100 species.",
      },
      practiceSet: [
        { prompt: "Within what range does the slope Z of the species-area line lie for most groups and regions?", answer: "0.1 to 0.2" },
        { prompt: "What is the range of Z for very large areas such as whole continents?", answer: "0.6 to 1.2" },
        { prompt: "What slope was found for frugivorous birds and mammals in tropical forests of different continents?", answer: "1.15" },
        { prompt: "On ordinary (not log) axes, what shape does the species-area curve take?", answer: "A rectangular hyperbola" },
        { prompt: "In the rivet popper hypothesis, what do the rivets on the wings of the plane stand for?", answer: "Key species that drive major ecosystem functions" },
        { prompt: "Name three features of a stable community.", answer: "Little year-to-year variation in productivity, resistance or resilience to occasional disturbance, and resistance to invasion by alien species" },
      ],
      traps: [
        {
          title: "Z is the slope, C is the intercept",
          body: "In \\(\\log S = \\log C + Z \\log A\\), **Z** is the **slope** (regression coefficient) and **C** is the **Y-intercept**. Z, not C, is the number that stays between 0.1 and 0.2.",
        },
        {
          title: "Continents give a steeper line",
          body: "For ordinary regions Z is **0.1 to 0.2**; for whole **continents** it rises to **0.6 to 1.2**. A Z of 1.15 belongs to frugivorous birds and mammals across continents.",
        },
        {
          title: "A stable community varies less",
          body: "A stable community shows **less**, not more, variation in productivity from year to year. Tilman's species-rich plots were the steadier ones.",
        },
      ],
    },
  ],
};
