import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 15 Biodiversity, Conservation and Environmental
 * Issues. Definitions checked against the Balbharati text (wordings are the
 * book's own, trimmed); most-asked years from the 11 board past-paper
 * questions in the bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Biodiversity, Conservation and Environmental Issues",
  chapterSlug: "biodiversity-conservation-and-environmental-issues",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 15",
  keyPoints: [
    {
      term: "Biodiversity",
      text: "The totality of genes, species and ecosystems in a region (IUCN, UNEP and WRI). The term was coined by **Walter Rosen (1982)** and popularised by **Edward Wilson**. India is one of the 12 megadiversity countries, with 8.1% of the world's biodiversity on 2.4% of its land.",
    },
    {
      term: "Levels of biodiversity",
      text: "**Genetic diversity:** intraspecific; variation in genes and alleles within a species (*Rauwolfia serpentina* varies in reserpine from place to place). **Species diversity:** interspecific; the number of species in a region (amphibians richer in the Western Ghats than the Eastern Ghats). **Ecosystem diversity:** the types of ecosystems in an area (high in India, low in Norway).",
    },
    {
      term: "Latitudinal and altitudinal gradients",
      text: "Species richness is high at lower latitudes and declines steadily towards the poles; it is maximum in tropical rain forests (Amazon). Reasons: tropics stable for millions of years, fewer climatic changes, no glaciations, more sunlight and rainfall. Species diversity is also more at lower altitudes than at higher altitudes.",
    },
    {
      term: "Species area relationship",
      text: "**Alexander von Humboldt** observed that species richness increases with area, but up to a certain limit: a rectangular hyperbola, a straight line on a log scale. For smaller areas **Z is 0.1 to 0.2**; for very large areas such as whole continents the slope is steeper.",
    },
    {
      term: "Rivet popper hypothesis",
      text: "Given by **Paul Ehrlich** to explain the significance of diversity: the ecosystem is an aeroplane and species are its rivets. Losing a few rivets (species) causes little harm at first, but losing more, or a key rivet such as one binding the wings, threatens the plane. **Productivity stability hypothesis (David Tilman):** species richness gives stability.",
    },
    {
      term: "Causes of biodiversity loss: the Evil Quartet",
      text: "**Habitat loss and fragmentation:** the prime cause. **Over-exploitation:** Dodo, Steller's sea cow, passenger pigeon. **Alien species invasion:** an introduced species harms local ones, e.g. *Parthenium* (carrot grass), *Lantana*, water hyacinth, Nile perch. **Co-extinction:** extinction of a host fish causes extinction of its unique parasites.",
    },
    {
      term: "Endangered species",
      text: "When the number of members of a species starts dwindling, it is said to be **endangered**. IUCN: a very high risk of extinction from a rapid population decline of 50 to more than 70 percent over the previous 10 years (or three generations). IUCN keeps the **Red Data Book** (Red List) of conservation status.",
    },
    {
      term: "In situ conservation",
      text: "Protecting an organism by protecting its natural habitat: conservation **at home**, the most appropriate method (Kanha tiger reserve). **Biodiversity hotspots:** India has four: Western Ghats, Indo-Burma, Sundaland, Eastern Himalayas. India has 14 biosphere reserves, 90 national parks and 448 wildlife sanctuaries. **Sacred groves** (Khasi and Jaintia hills, Western Ghats) protect species.",
    },
    {
      term: "Ex situ conservation",
      text: "Living beings are protected away from their natural habitats, in captivity: wild life safari parks, zoological parks, botanical gardens, captive breeding (crocodile bank, Chennai) and **seed banks**. Modern methods: tissue culture, in vitro fertilization and **cryopreservation** of gametes at \\(-196\\,^\\circ\\)C.",
    },
    {
      term: "Air pollutants and their effects",
      text: "**Particulate:** smoke, smog, dust, heavy metals; PM2.5 is inhaled deep into the lungs, causing irritation, inflammation, lung damage, breathing disorders and premature deaths. **Gaseous:** \\(\\ce{CO2}\\), CO, \\(\\ce{SO2}\\), NO, \\(\\ce{NO2}\\). CO is a poisonous gas from incomplete combustion; \\(\\ce{NO2}\\) irritates eyes and lungs and at high levels injures lungs, liver and kidneys.",
    },
    {
      term: "Noise pollution",
      text: "Noise is an undesired high level of sound, included as an air pollutant by the Air Act (amendment 1987). Sound of 150 decibels or more (jet take off) may damage ear drums and cause **permanent hearing loss**. Noise also causes sleeplessness, increased heartbeat, altered breathing, psychological stress, and harms a child's learning and behaviour.",
    },
    {
      term: "Water pollution: BOD and biomagnification",
      text: "**BOD:** the amount of dissolved oxygen required by microorganisms for decomposing the organic matter in water (mg/L); high BOD means heavy pollution. **Biomagnification:** pollutants such as DDT and mercury accumulate in increasing concentration along the food chain. Water hyacinth, the **Terror of Bengal**, chokes water bodies.",
    },
    {
      term: "Greenhouse effect and global warming",
      text: "Gases in the atmosphere absorb the infrared radiation re-emitted by the earth and radiate it back, reheating the earth; without it the earth would average \\(-18\\,^\\circ\\)C, not 15 °C. **Global warming:** heating of the earth by rising greenhouse gases; the temperature rose by 0.6 °C in the past century.",
    },
    {
      term: "Ozone depletion",
      text: "The stratospheric ozone layer absorbs UV radiation and protects life. **CFCs** reach the stratosphere, UV releases Cl atoms, and Cl degrades ozone, acting as a catalyst; the depletion is marked over the Antarctic. UV-B damages DNA, causes skin cancer and snow blindness. The **Montreal Protocol (1987)** controls ozone depleting substances.",
    },
  ],
  formulas: [
    {
      label: "Species area relationship",
      latex: "S = CA^{Z}",
      symbols: [
        { symbol: "S", meaning: "species richness" },
        { symbol: "A", meaning: "area under study" },
        { symbol: "C", meaning: "Y intercept" },
        { symbol: "Z", meaning: "slope of the line (0.1 to 0.2 for small areas)" },
      ],
    },
    {
      label: "Species area relationship on a log scale",
      latex: "\\log S = \\log C + Z \\log A",
    },
  ],
  derivations: [
    {
      title: "Explain the greenhouse effect with reference to the gases and their sources",
      steps: [
        "About half of the incoming solar radiation reaches the earth's surface and heats it.",
        "The earth re-emits the heat as infrared radiation; atmospheric gases absorb a major part and radiate it back, reheating the earth, as in a glass house.",
        "\\(\\ce{CO2}\\): burning of fossil fuels in industries and automobiles, burning of agricultural wastes.",
        "\\(\\ce{CH4}\\): biogas plants, paddy fields, cattle sheds. **CFCs:** fire extinguishers and air conditioners. Nitrous oxide is also a greenhouse gas.",
        "Rising levels of these gases cause global warming, melting of ice caps and odd climatic changes.",
      ],
    },
    {
      title: "Ozone depletion by CFCs",
      steps: [
        "In the stratosphere ozone is formed and broken by UV: \\(\\ce{O2 + O -> O3}\\) and \\(\\ce{O3 -> O2 + O}\\), in equilibrium.",
        "CFCs move up to the stratosphere, where UV rays release Cl atoms from them.",
        "Cl degrades ozone and releases molecular oxygen; Cl acts as a catalyst and stays, so the damage continues.",
        "The thinner layer lets in UV-B, which damages DNA and causes skin cancer and snow blindness.",
      ],
    },
    {
      title: "Working of an electrostatic precipitator",
      steps: [
        "High voltage causes an electric discharge that ionises the air in the smokestack.",
        "Free electrons attach to the dust particles moving up, which become negatively charged.",
        "The charged particles move to the positively charged collector plates and settle there.",
        "Vibrating the electrodes removes them into a reservoir; almost 99% of particulate matter is removed.",
      ],
    },
    {
      title: "Cultural (accelerated) eutrophication",
      steps: [
        "Effluents from agricultural lands, industries and homes enrich the lake with nutrients.",
        "Algae grow excessively (algal bloom) and submerged plants die from reduced light.",
        "Decomposition of the dead matter uses up dissolved oxygen, so fish and other aquatic organisms die.",
        "The lake turns stinking, coloured and turbid: it is choked to death, an ageing that would naturally take thousands of years.",
      ],
    },
  ],
  diagrams: [
    { title: "Graph showing species area relationship", labels: ["species richness (S) against area (A)", "curve S = CA to the power Z", "log-log scale straight line", "slope Z, intercept C"] },
    { title: "Greenhouse effect", labels: ["sun", "greenhouse gases (CO2, CH4)", "re-radiated heat", "less heat escapes into space"] },
    { title: "Electrostatic precipitator", labels: ["negatively charged metal grid", "positively charged collector plates", "gas stream containing particles", "clean gas stream"] },
    { title: "Biomagnification of DDT", labels: ["water 0.000003 ppm", "zooplankton 0.04 ppm", "small fish 0.5 ppm", "large fish 2 ppm", "fish-eating birds 25 ppm"] },
  ],
  mostAsked: [
    { topic: "Loss of biodiversity: causes (Evil Quartet), invasive species, co-extinction", years: [2026, 2024] },
    { topic: "Species area relationship: read the graph and its equations", years: [2025, 2024] },
    { topic: "Air and noise pollution: types of air pollutants and harmful effects on human health", years: [2026, 2025] },
    { topic: "Define endangered species", years: [2026] },
    { topic: "In situ conservation of biodiversity", years: [2026] },
    { topic: "Greenhouse effect: the gases responsible and their sources", years: [2024] },
    { topic: "Rivet popper hypothesis", years: [2024] },
  ],
  mistakes: [
    {
      title: "Species area graph read the wrong way",
      body: "The curve is \\(S = CA^Z\\); the straight line on the log scale is \\(\\log S = \\log C + Z \\log A\\). C is the Y intercept and Z the slope: do not swap S, A, C and Z.",
    },
    {
      title: "In situ and ex situ mixed",
      body: "National parks, sanctuaries, biosphere reserves, hotspots and sacred groves are **in situ**. Zoos, botanical gardens, seed banks, tissue culture and cryopreservation are **ex situ**.",
    },
    {
      title: "Greenhouse effect confused with ozone depletion",
      body: "The greenhouse effect traps infrared heat (\\(\\ce{CO2}\\), \\(\\ce{CH4}\\), CFCs, nitrous oxide). Ozone depletion lets in UV and is caused by Cl from CFCs. Do not write that the ozone hole causes global warming.",
    },
    {
      title: "Rivet popper is about diversity",
      body: "Paul Ehrlich's rivet popper hypothesis explains the **significance of diversity** for the ecosystem, not biomagnification or the species area relationship.",
    },
    {
      title: "Invasive species examples",
      body: "Name the book's invasive species: *Parthenium* (carrot grass), *Lantana*, water hyacinth (*Eichhornia*), Nile perch, African catfish. Co-extinction is the host fish and its unique parasites.",
    },
  ],
};

export default sheet;
