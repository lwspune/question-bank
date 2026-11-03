import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 6 Evolution. Theories, evidences and dates
 * checked against the NCERT text (the book's own wording, trimmed);
 * most-asked years and marks from the CBSE board past-paper questions in the
 * bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Evolution",
  chapterSlug: "evolution",
  source: "NCERT Biology (CBSE Class 12), Chapter 6",
  keyPoints: [
    {
      term: "Origin of the universe and earth",
      text: "**Big Bang** theory: the universe is almost **13.8 billion years** old. Earth formed about **4.5 billion years** back; life appeared about **four billion years** back. Looking at stars we are peeping into the past, since their light started its journey millions of years back.",
    },
    {
      term: "Spontaneous generation and panspermia",
      text: "Early Greek thinkers: units of life called **spores** were transferred to different planets (**panspermia**). **Spontaneous generation**: life from decaying matter. **Louis Pasteur** showed life comes only from pre-existing life: in **pre-sterilised flasks** no life came from **killed yeast**, while in a flask open to air new organisms arose.",
    },
    {
      term: "Chemical evolution (Oparin and Haldane)",
      text: "The first life came from pre-existing **non-living organic molecules** (RNA, protein), preceded by **chemical evolution**: diverse organic molecules from inorganic constituents. Early earth: high temperature, volcanic storms, a **reducing atmosphere** with CH4, NH3. Meteorites hold similar compounds.",
    },
    {
      term: "Darwin's theory of natural selection",
      text: "From the voyage of **H.M.S. Beagle**. Populations have built-in variation; those better fit leave more progeny. **Fitness** means **reproductive fitness**. **Branching descent** and **natural selection** are the two key concepts. Alfred **Wallace** (Malay Archipelago) reached similar conclusions; **Malthus** on populations probably influenced Darwin.",
    },
    {
      term: "Fossils and embryology",
      text: "**Fossils**: remains of hard parts of life forms in rocks; different-aged sediments hold different life forms (**paleontological evidence**). **Ernst Heckel**: vertebrate embryos have vestigial **gill slits**, functional only in fish. **Karl Ernst von Baer** disproved this: embryos never pass through the adult stages of other animals.",
    },
    {
      term: "Homologous organs: divergent evolution",
      text: "Same anatomical structure, different functions, from **common ancestry**. Forelimbs of whales, bats, cheetah and human all have **humerus, radius, ulna, carpals, metacarpals, phalanges**. Also vertebrate hearts and brains; in plants, **thorn of Bougainvillea and tendril of Cucurbita**.",
    },
    {
      term: "Analogous organs: convergent evolution",
      text: "Different structures evolving for the **same function** in a similar habitat: wings of **butterfly and bird**, eye of **octopus and mammals**, flippers of **penguins and dolphins**, **sweet potato** (root) and **potato** (stem). **Biochemical** similarities in proteins and genes also point to shared ancestry.",
    },
    {
      term: "Industrial melanism",
      text: "England, 1850s (before industrialisation): more **white-winged** moths; 1920: more **dark-winged** (melanised) moths. Predators spot a moth against a contrasting background: soot darkened the trunks and killed the white lichens. In rural areas melanic moths stayed few. **No variant is completely wiped out.**",
    },
    {
      term: "Evolution by anthropogenic action",
      text: "Excess herbicides, pesticides, antibiotics and drugs select **resistant** varieties in months or years, not centuries. So evolution is not directed: it is a **stochastic process** based on chance events and chance mutation.",
    },
    {
      term: "Adaptive radiation",
      text: "Evolution of different species in a given geographical area starting from a point and radiating to other habitats. **Darwin's finches**: from the original **seed-eating** finch, insectivorous and vegetarian forms. **Australian marsupials** from one ancestral stock. More than one adaptive radiation in an isolated area: **convergent evolution** (placental wolf and Tasmanian wolf).",
    },
    {
      term: "Lamarck and Hugo de Vries",
      text: "**Lamarck**: evolution driven by **use and disuse** of organs (giraffe's neck); nobody believes it now. **Hugo de Vries** (evening primrose): **mutations**, large, random and directionless, cause evolution in a single step: **saltation**. Darwin's variations were small, directional and gradual.",
    },
    {
      term: "Hardy-Weinberg principle",
      text: "Allele frequencies in a population are **stable** and constant from generation to generation: the gene pool is constant (**genetic equilibrium**). Five factors disturb it: **gene migration or gene flow, genetic drift, mutation, genetic recombination, natural selection**. A drifted population that becomes a new species: **founder effect**.",
    },
    {
      term: "Types of natural selection",
      text: "**Stabilising**: more individuals acquire the **mean** character value. **Directional**: more individuals acquire a value **other than the mean** (as in industrial melanism). **Disruptive**: more individuals acquire **peripheral values at both ends** of the curve.",
    },
    {
      term: "Origin and evolution of man",
      text: "15 mya: **Dryopithecus** (ape-like) and **Ramapithecus** (man-like). 2 mya: **Australopithecines**, East African grasslands, stone weapons, ate fruit. **Homo habilis**: first human-like, 650-800 cc, no meat. **Homo erectus** (Java, 1.5 mya): 900 cc, ate meat. **Neanderthal**: 1400 cc, hides, buried dead. Modern **Homo sapiens** in the ice age, 75,000-10,000 years ago.",
    },
  ],
  formulas: [
    {
      label: "Allele frequencies",
      latex: "p + q = 1",
      symbols: [
        { symbol: "\\(p\\)", meaning: "frequency of allele A" },
        { symbol: "\\(q\\)", meaning: "frequency of allele a" },
      ],
    },
    {
      label: "Hardy-Weinberg equation",
      latex: "p^2 + 2pq + q^2 = 1",
      symbols: [
        { symbol: "\\(p^2\\)", meaning: "frequency of AA" },
        { symbol: "\\(2pq\\)", meaning: "frequency of Aa" },
        { symbol: "\\(q^2\\)", meaning: "frequency of aa" },
      ],
    },
  ],
  derivations: [
    {
      title: "S.L. Miller's experiment (1953) and what it showed",
      steps: [
        "Prompted by the hypothesis of **Oparin and Haldane** that life arose by chemical evolution.",
        "A closed flask with **CH4, H2, NH3 and water vapour** at 800 °C, with an **electric discharge**, recreated early earth.",
        "He observed formation of **amino acids**; others got sugars, nitrogen bases, pigments and fats.",
        "So organic molecules form from inorganic ones: the first part of the story, **chemical evolution**, was more or less accepted.",
      ],
    },
    {
      title: "Explain industrial melanism as natural selection",
      steps: [
        "Before industrialisation, white lichens covered the trees: **white-winged** moths were camouflaged; dark moths were picked out by predators.",
        "After industrialisation, smoke and soot darkened the trunks and lichens died: **dark-winged** moths survived, white ones were eaten.",
        "The proportion reversed (more melanised moths by 1920), but in rural areas melanic moths stayed few.",
        "Those that camouflage better survive and increase: **directional selection**.",
      ],
    },
    {
      title: "How is the Hardy-Weinberg expression derived?",
      steps: [
        "Let \\(p\\) and \\(q\\) be the frequencies of alleles A and a, so \\(p + q = 1\\).",
        "The chance that A appears on both chromosomes of a diploid is \\(p \\times p = p^2\\) (AA); similarly \\(q^2\\) (aa) and \\(2pq\\) (Aa).",
        "So \\(p^2 + 2pq + q^2 = 1\\), the binomial expansion of \\((p+q)^2\\).",
        "If measured frequencies differ from expected, the difference shows the extent of **evolutionary change**.",
      ],
    },
    {
      title: "Salient features of Darwin's theory of natural selection",
      steps: [
        "Natural resources are limited; population sizes stay stable except for seasonal fluctuation.",
        "Members of a population vary, and most variations are **inherited**.",
        "Populations could grow exponentially, so there is **competition** for resources; only some survive.",
        "Heritable variations that make resource use better let their bearers reproduce and **leave more progeny**: over generations new forms arise.",
      ],
    },
    {
      title: "A brief account of evolution, in order",
      steps: [
        "About **2000 mya**: first cellular forms; some released O2. **500 mya**: invertebrates. About **350 mya**: jawless fish. About **320 mya**: sea weeds and a few plants.",
        "About 350 mya: **lobefins** (like the Coelacanth, found in 1938) moved on land and evolved into the **first amphibians**.",
        "Amphibians evolved into **reptiles** with thick-shelled eggs. About 200 mya some went back to water: **Ichthyosaurs**.",
        "Dinosaurs disappeared about **65 mya**; mammals, first like shrews, took over.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Miller's experiment (Figure 6.1)",
      labels: ["electrodes (electric discharge)", "CH4, NH3, H2 and water vapour", "boiling water", "condenser", "water with organic compounds (trap)"],
    },
    {
      title: "Homologous organs in plants and animals (Figure 6.3)",
      labels: ["thorn of Bougainvillea", "tendril of Cucurbita", "forelimbs of whale, bat, cheetah, human", "humerus, radius and ulna", "carpals, metacarpals, phalanges"],
    },
    {
      title: "White-winged and dark-winged moths on a tree trunk (Figure 6.4)",
      labels: ["unpolluted area: lichen-covered trunk", "polluted area: dark trunk", "camouflaged moth survives"],
    },
    {
      title: "Variety of beaks of Darwin's finches (Figure 6.5)",
      labels: ["original seed-eating finch", "insectivorous finches", "vegetarian finches", "Galapagos Islands"],
    },
    {
      title: "Operation of natural selection on different traits (Figure 6.8)",
      labels: ["stabilising: peak gets narrower at the mean", "directional: peak shifts to one side", "disruptive: two peaks at both ends"],
    },
  ],
  mostAsked: [
    {
      topic: "Natural selection: Darwin's theory and its limits, industrial melanism, types of selection, Lamarck, de Vries and saltation, antibiotic resistance",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Evidences for evolution: homologous and analogous organs, divergent and convergent evolution, fossils, embryology, biochemical similarities",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Origin and evolution of man: Dryopithecus to Homo sapiens, in order, with features",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Adaptive radiation: Darwin's finches, Australian marsupials, convergent evolution with placental mammals",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Hardy-Weinberg principle: the equation, numericals, factors that disturb the equilibrium",
      marks: 1,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Origin of life: Pasteur, panspermia, Oparin and Haldane, Miller's experiment",
      years: [2026, 2024, 2023],
    },
    {
      topic: "A brief account of evolution: order of appearance of plants and vertebrates",
      marks: 1,
      years: [2026, 2025, 2023],
    },
  ],
  mistakes: [
    {
      title: "Calling homologous organs analogous",
      body: "Thorn of Bougainvillea and tendril of Cucurbita are **homologous** (divergent evolution). Wings of butterfly and bird, eyes of octopus and mammals, flippers of penguins and dolphins, sweet potato and potato are **analogous** (convergent evolution).",
    },
    {
      title: "Taking the recessive percentage as q",
      body: "If 36 per cent show the recessive trait, \\(q^2 = 0.36\\), so \\(q = 0.6\\) and \\(p = 0.4\\); heterozygotes \\(2pq = 0.48\\). For numbers, multiply by the population: with \\(p = 0.8\\) in 200, AA = 128, Aa = 64, aa = 8.",
    },
    {
      title: "Mixing up Lamarck, Darwin and de Vries",
      body: "**Lamarck**: use and disuse, inheritance of acquired characters. **Darwin**: small, directional, heritable variations; gradual evolution. **de Vries**: large, random mutations; saltation (evening primrose).",
    },
    {
      title: "Industrial melanism the wrong way round",
      body: "Before industrialisation **white** moths were more; after it **dark** moths were more. It is **directional** selection, and neither type was completely wiped out.",
    },
    {
      title: "Wrong order or facts in human evolution",
      body: "Dryopithecus and Ramapithecus, Australopithecines, Homo habilis (650-800 cc), Homo erectus (900 cc), Neanderthal (1400 cc), Homo sapiens. Australopithecines ate fruit; Homo erectus ate meat; Neanderthals used hides and buried their dead.",
    },
    {
      title: "Wrong gases in Miller's flask",
      body: "CH4, H2, NH3 and water vapour: a **reducing** mixture with **no free oxygen**, and an electric discharge. Amino acids formed.",
    },
  ],
};

export default sheet;
