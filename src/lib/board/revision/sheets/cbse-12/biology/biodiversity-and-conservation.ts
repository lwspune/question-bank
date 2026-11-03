import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 13 Biodiversity and Conservation. Definitions,
 * figures, examples and the species-area equation checked against the NCERT
 * text (the book's own wording, trimmed); most-asked years and marks from
 * the CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Biodiversity and Conservation",
  chapterSlug: "biodiversity-and-conservation",
  source: "NCERT Biology (CBSE Class 12), Chapter 13",
  keyPoints: [
    {
      term: "Biodiversity and its levels",
      text: "Combined diversity at all levels of biological organisation (**Edward Wilson**). **Genetic:** *Rauwolfia vomitoria* differs in **reserpine** across Himalayan ranges; India has over **50,000 strains of rice** and **1,000 varieties of mango**. **Species:** the **Western Ghats** have more amphibian species than the Eastern Ghats. **Ecological:** India has greater ecosystem diversity than **Norway**.",
    },
    {
      term: "How many species",
      text: "IUCN (2004): slightly more than **1.5 million** species described; **Robert May** estimates about **7 million**. Over **70%** of recorded species are **animals**, plants no more than **22%**; **insects** are over 70% of animals. Fungi outnumber fishes, amphibians, reptiles and mammals together. **Prokaryotes** are not counted: conventional methods do not suit them and many cannot be cultured.",
    },
    {
      term: "India's biodiversity",
      text: "Only **2.4%** of the world's land area but **8.1%** of global species diversity: one of the **12 mega diversity countries**. Nearly **45,000 plant species** and twice as many animals are recorded; India has more than **1,200 species of birds**. By May's estimate over 1,00,000 plant and 3,00,000 animal species are yet to be described.",
    },
    {
      term: "Latitudinal gradient",
      text: "Species diversity **decreases from the equator towards the poles**; the **tropics (23.5° N to 23.5° S)** harbour more species. Birds: **Colombia** about **1,400**, New York (41° N) 105, **Greenland** (71° N) only 56. The **Amazonian rain forest** has the greatest biodiversity on earth: over 40,000 plant species, 3,000 fishes, 1,300 birds, 427 mammals.",
    },
    {
      term: "Why the tropics are richer",
      text: "(a) Speciation is a **function of time**: the tropics escaped **frequent glaciations** and stayed undisturbed for millions of years. (b) Tropical environments are **less seasonal, more constant and predictable**, promoting **niche specialisation**. (c) **More solar energy** gives higher productivity, which may indirectly give greater diversity.",
    },
    {
      term: "Species-area relationship",
      text: "**Alexander von Humboldt** observed that within a region **species richness increased with increasing explored area, but only up to a limit**. For many taxa (angiosperms, birds, bats, freshwater fishes) the curve is a **rectangular hyperbola**; on a log scale it is a **straight line**. **Z** lies in **0.1 to 0.2** for regions, but **0.6 to 1.2** for whole continents (frugivorous birds and mammals: **1.15**).",
    },
    {
      term: "Species richness and stability",
      text: "A **stable community** shows little year-to-year variation in productivity, is **resistant or resilient** to disturbances and resists **alien species**. **David Tilman's** outdoor plots: plots with **more species showed less year-to-year variation in total biomass**, and **increased diversity gave higher productivity**.",
    },
    {
      term: "Rivet popper hypothesis",
      text: "**Paul Ehrlich's** analogy: an airplane (**ecosystem**) is held by thousands of rivets (**species**). Popping rivets (extinctions) may not affect flight safety at first, but the plane weakens over time. Loss of rivets on the **wings (key species** that drive major ecosystem functions) is more serious than loss of rivets on seats or windows.",
    },
    {
      term: "Extinctions and their effects",
      text: "**IUCN Red List (2004):** **784 extinctions** in 500 years (338 vertebrates, 359 invertebrates, 87 plants): **dodo** (Mauritius), **quagga** (Africa), **thylacine** (Australia), **Steller's sea cow** (Russia), three tiger subspecies. Threatened: 12% birds, 23% mammals, **32% amphibians**, 31% gymnosperms. The **sixth extinction** is **100 to 1,000 times faster**. Loss lowers plant production and drought resistance.",
    },
    {
      term: "Habitat loss and over-exploitation",
      text: "**Habitat loss and fragmentation** is the **most important cause**. Tropical rain forests once covered over **14%** of land, now no more than **6%**; the **Amazon** ('lungs of the planet') is cleared for **soya beans** and **beef cattle** grassland. Fragmentation hurts animals needing **large territories** and migrants. **Over-exploitation** (need turns to greed): **Steller's sea cow, passenger pigeon**, marine fish.",
    },
    {
      term: "Alien species and co-extinctions",
      text: "**Nile perch** in **Lake Victoria** led to extinction of over **200 species of cichlid fish**. Invasive weeds: **carrot grass (*Parthenium*), *Lantana*, water hyacinth (*Eicchornia*)**. The **African catfish *Clarias gariepinus*** threatens our indigenous catfishes. **Co-extinction:** when a species dies out, species obligately linked to it go too: a host fish's **parasites**, a co-evolved **plant and pollinator**.",
    },
    {
      term: "Why conserve biodiversity",
      text: "**Narrowly utilitarian:** direct economic benefits (food, firewood, fibre, industrial products, medicines; over **25%** of drugs come from plants); **bioprospecting** explores molecular, genetic and species-level diversity for products. **Broadly utilitarian:** **ecosystem services**: the Amazon gives **20% of the oxygen**, **pollination**, aesthetic pleasure. **Ethical:** every species has an **intrinsic value**.",
    },
    {
      term: "In situ conservation and hotspots",
      text: "Protect the **whole ecosystem**. **Biodiversity hotspots:** regions with **very high species richness and high endemism**; **34** in the world, three in India (**Western Ghats and Sri Lanka, Indo-Burma, Himalaya**); under **2%** of land, their protection could cut extinctions by almost **30%**. India: biosphere reserves, national parks, sanctuaries; **sacred groves** (Khasi and **Jaintia Hills**, Meghalaya).",
    },
    {
      term: "Ex situ conservation",
      text: "Threatened animals and plants are taken out of their habitat into special settings: **zoological parks, botanical gardens, wildlife safari parks**. Advanced methods: **cryopreservation** of gametes, **in vitro fertilisation**, **tissue culture**, **seed banks**. Global efforts: **Earth Summit**, Rio de Janeiro **1992**; **World Summit on Sustainable Development**, Johannesburg **2002** (190 countries).",
    },
  ],
  formulas: [
    {
      label: "Species-area relationship (log scale)",
      latex: "\\log S = \\log C + Z \\log A",
      symbols: [
        { symbol: "S", meaning: "species richness" },
        { symbol: "A", meaning: "area" },
        { symbol: "Z", meaning: "slope of the line (regression coefficient), 0.1 to 0.2 for a region" },
        { symbol: "C", meaning: "Y-intercept" },
      ],
    },
  ],
  derivations: [
    {
      title: "Explain the species-area relationship with a graph",
      steps: [
        "Humboldt: within a region, species richness rises with explored area, but only up to a limit.",
        "Plot species richness (S) against area (A): a **rectangular hyperbola**.",
        "On a log scale the plot is a straight line: \\(\\log S = \\log C + Z \\log A\\), Z the slope and C the intercept.",
        "Z is 0.1 to 0.2 regardless of taxon or region; for whole continents it is much steeper, 0.6 to 1.2.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Global biodiversity: proportionate number of species of major taxa (Figure 13.1)",
      labels: ["plants: angiosperms, fungi, algae, mosses, ferns", "invertebrates: insects (largest), molluscs, crustaceans", "vertebrates: fishes, birds, reptiles, amphibians, mammals"],
    },
    {
      title: "Species-area relationship (Figure 13.2)",
      labels: ["species richness (S) on y-axis", "area (A) on x-axis", "rectangular hyperbola", "straight line on log scale, slope Z"],
    },
  ],
  mostAsked: [
    {
      topic: "Causes of biodiversity loss (the evil quartet): habitat loss and fragmentation, over-exploitation, alien species invasions, co-extinctions",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Conservation: in situ and ex situ, biodiversity hotspots, sacred groves, advanced ex situ methods",
      marks: 1,
      years: [2026, 2024, 2023, 2022],
    },
    {
      topic: "Latitudinal gradient: why the tropics and the Amazon have the greatest diversity",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Levels of biodiversity (genetic, species, ecological) and species numbers: global pie chart, India, prokaryotes",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Species-area relationship (Humboldt): rectangular hyperbola, log S = log C + Z log A, values of Z",
      marks: 3,
      years: [2025, 2024, 2022],
    },
    {
      topic: "Why conserve biodiversity: narrowly utilitarian, broadly utilitarian (ecosystem services), ethical; bioprospecting",
      marks: 3,
      years: [2026, 2023, 2022],
    },
    {
      topic: "Importance of species diversity: Tilman's experiments on stability and Ehrlich's rivet popper hypothesis",
      marks: 2,
      years: [2025, 2024, 2022],
    },
    {
      topic: "Extinctions: IUCN Red List records, recent extinctions, the sixth extinction, groups most threatened",
      marks: 1,
      years: [2026, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Hotspot defined by one criterion",
      body: "A hotspot needs **both** very high **species richness** and a high degree of **endemism** (species found nowhere else). Name India's three: Western Ghats and Sri Lanka, Indo-Burma, Himalaya.",
    },
    {
      title: "In situ and ex situ mixed up",
      body: "**In situ (on site):** hotspots, biosphere reserves, national parks, sanctuaries, sacred groves. **Ex situ (off site):** zoos, botanical gardens, safari parks, seed banks, cryopreservation.",
    },
    {
      title: "Wrong values of Z",
      body: "Z is **0.1 to 0.2** within a region for any taxon; it is **0.6 to 1.2** across whole continents. A steeper slope means species richness rises faster with area.",
    },
    {
      title: "Wrong rate for the sixth extinction",
      body: "Current extinction rates are **100 to 1,000 times faster** than in pre-human times, and **human activities** are responsible. Five earlier mass extinctions happened before humans.",
    },
    {
      title: "Alien species examples confused",
      body: "**Nile perch:** cichlids of **Lake Victoria** (east Africa). ***Clarias gariepinus***: the **African catfish** brought in for aquaculture. *Parthenium*, *Lantana* and *Eicchornia* are invasive **weeds**.",
    },
    {
      title: "Missing the main cause of loss",
      body: "**Habitat loss and fragmentation** is the **most important** cause; then over-exploitation, alien species invasions and co-extinctions. Give one example for each.",
    },
  ],
};

export default sheet;
