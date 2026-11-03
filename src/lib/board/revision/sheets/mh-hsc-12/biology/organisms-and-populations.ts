import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 13 Organisms and Populations. Definitions checked
 * against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the 11 board past-paper questions in the bank,
 * 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Organisms and Populations",
  chapterSlug: "organisms-and-populations",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 13",
  keyPoints: [
    {
      term: "Habitat and niche",
      text: "**Habitat:** the place or area where a particular species lives (its postal address); not species specific, supports many species. **Niche:** the functional role played by an organism in its environment (J. Grinnell), its profession; species specific. Types: spatial, trophic, multidimensional (hypervolume). Fundamental niche: no competitors; realized niche: with competition.",
    },
    {
      term: "Regulate and conform",
      text: "**Regulate:** some organisms maintain homeostasis by physiological and behavioural changes which ensure constant body temperature and osmotic concentration; all birds and mammals (thermoregulation, osmoregulation). **Conform:** most animals and plants cannot maintain a constant internal environment; their body temperature changes with the ambient temperature.",
    },
    {
      term: "Migrate and suspend",
      text: "**Migrate:** the organism moves away temporarily from the stressful habitat to a more hospitable area and returns when the stressful period is over (birds in winter). **Suspend:** reduces metabolic activity: seeds go into **dormancy**; animals go into **hibernation** during winter (polar bear) or **aestivation** to avoid summer heat (some snails and fish).",
    },
    {
      term: "Adaptation",
      text: "An attribute of the organism (morphological, physiological and behavioural) that enables it to survive and reproduce in its habitat. Desert plants: thick cuticle, stomata in deep pits, CAM pathway; *Opuntia* leaves reduced to spines. **Allen's rule:** mammals of colder climates have shorter snout, ears, tail and limbs. Seals have a thick layer of fat (**blubber**).",
    },
    {
      term: "Behavioural adaptations",
      text: "Desert lizards keep their body temperature fairly constant by behaviour: they **bask in the sun** and absorb heat when body temperature drops below the comfort zone, and **move into shade** when the ambient temperature rises. Some species **burrow into the sand** to escape the heat. Migration is also behavioural.",
    },
    {
      term: "Population",
      text: "Individuals living in groups in a well defined geographical area, sharing or competing for similar resources and potentially interbreeding. Attributes: size and density, natality, mortality, sex ratio, age pyramid, immigration, emigration and growth forms. Natural selection operates at the population level.",
    },
    {
      term: "Natality and mortality",
      text: "**Natality:** the birth rate; greatest influence on growth. **Absolute natality:** births under ideal conditions; **realized natality:** births when environmental pressures come into play. **Mortality:** the death rate. **Absolute mortality:** deaths under ideal conditions; **realized mortality:** deaths when environmental pressures come into play.",
    },
    {
      term: "Immigration and emigration",
      text: "**Immigration (I):** the number of individuals of the same species that have come into the habitat from elsewhere during the time period. **Emigration (E):** the number of individuals of the population who left the habitat during the time period. Births and immigration increase density; deaths and emigration decrease it.",
    },
    {
      term: "Exponential and logistic growth",
      text: "**Exponential (geometric):** when resources are unlimited, the species fully realizes its innate potential to grow in numbers (bacteria on a fresh agar plate). **Logistic (Verhulst-Pearl):** with limited resources, growth slows as competition rises and levels off at the **carrying capacity (K)**: a sigmoid curve. Logistic is the more realistic model.",
    },
    {
      term: "Interspecific interactions",
      text: "**Mutualism** and **protocooperation** (+ +), **commensalism** (+ 0), **parasitism** and **predation** (+ and -), **amensalism** (- and 0), **competition** (- and -), **neutralism** (0 0). Interactions may be intraspecific (same population) or interspecific (different species).",
    },
    {
      term: "Mutualism",
      text: "An obligatory and interdependent interaction that benefits both species. **Lichen:** a fungus and photosynthetic algae or cyanobacteria. Plant and animal: animals pollinate flowers and disperse seeds, rewarded with pollen, nectar and juicy fruits; flower and pollinator co-evolve (humming birds and flowers).",
    },
    {
      term: "Commensalism",
      text: "One species benefits and the other is neither harmed nor benefited. **Orchid** growing as an epiphyte on a mango branch. **Cattle egret** forages near grazing cattle, which flush out insects. **Clown fish** lives among the stinging tentacles of a **sea anemone** and gets protection; the anemone gets no benefit.",
    },
    {
      term: "Competition",
      text: "A process in which the fitness of one species is significantly lower in the presence of another (flamingos and fish compete for zooplankton). **Gause's competitive exclusion principle:** two closely related species competing for the same resources cannot coexist indefinitely; the inferior one is eliminated. **Resource partitioning** (feeding at different times) allows coexistence.",
    },
    {
      term: "Defences against predation",
      text: "**Plants:** thorns (*Acacia*, cactus) are morphological; stored chemicals make the herbivore sick: *Calotropis* makes poisonous **cardiac glycosides**; nicotine, caffeine, quinine, strychnine and opium are secondary metabolites made as defences. **Prey animals:** camouflage (cryptic colour); the Monarch butterfly is distasteful to birds.",
    },
  ],
  formulas: [
    {
      label: "Population density after one time period",
      latex: "N_{t+1} = N_t + [(B + I) - (D + E)]",
      symbols: [
        { symbol: "\\(N_t\\)", meaning: "population density at time t" },
        { symbol: "B, I", meaning: "births and immigration (increase density)" },
        { symbol: "D, E", meaning: "deaths and emigration (decrease density)" },
      ],
    },
  ],
  derivations: [
    {
      title: "Describe the logistic population growth curve with a suitable diagram",
      steps: [
        "Resources such as food and space are limited, so competition rises as density increases and weeds out the weaker individuals.",
        "Plot population density (N) against time (t): first a **lag phase**, then acceleration in the **log (exponential) phase**.",
        "Then deceleration, the **diminishing growth phase**, as resources run short.",
        "Finally an asymptote, the **stationary phase**, when density reaches the carrying capacity (K) of the habitat.",
        "The sigmoid curve is Verhulst-Pearl logistic growth, more realistic than exponential growth.",
      ],
    },
    {
      title: "Enlist and explain the important characteristics of a population",
      steps: [
        "**Size and density:** number of individuals, and number per unit space at a given time (biomass where a count is misleading).",
        "**Natality and mortality:** birth rate and death rate, each absolute or realized.",
        "**Sex ratio:** ratio of one sex to the other; 1:1 is the most common evolutionary stable strategy.",
        "**Age pyramid:** pre-reproductive (0 to 14), reproductive (15 to 44), post-reproductive (45 to 85+ years).",
        "**Immigration and emigration:** individuals coming in and leaving; with births and deaths they change density.",
      ],
    },
  ],
  diagrams: [
    { title: "Logistic growth curve of population", labels: ["lag phase", "log or exponential phase", "diminishing growth phase", "stationary phase at carrying capacity (K)", "population size against time"] },
    { title: "Exponential growth curve of population", labels: ["population size on the y axis", "time on the x axis", "steep rise with no upper limit"] },
    { title: "Age pyramids", labels: ["rapid, slow, zero and negative growth", "ages 0 to 14, 15 to 44, 45 to 85+", "male and female halves"] },
    { title: "V.T.S. of lichen thallus", labels: ["alga", "fungus"] },
    { title: "Commensalism", labels: ["cattle egret with buffalo", "clown fish", "tentacles of sea anemone"] },
  ],
  mostAsked: [
    { topic: "Commensalism: describe it with examples (orchid on a mango tree, clown fish and sea anemone)", years: [2026, 2025, 2024] },
    { topic: "Population characteristics: absolute and realized natality and mortality, emigration", years: [2026, 2024] },
    { topic: "Surviving a changed environment: regulate, conform, migrate; hibernation and aestivation; desert animals", years: [2026, 2024] },
    { topic: "Exponential growth of bacteria in a petridish", years: [2026] },
    { topic: "Chemical defence mechanisms in plants against herbivores", years: [2025] },
    { topic: "Mutualism", years: [2024] },
  ],
  mistakes: [
    {
      title: "Absolute and realized swapped",
      body: "Absolute natality is always **more** than realized natality; absolute mortality is always **less** than realized mortality. Absolute means ideal conditions.",
    },
    {
      title: "Commensalism called mutualism",
      body: "Clown fish with sea anemone, orchid on a mango tree and cattle egret with cattle are **commensalism** (one benefits, other unaffected). Lichen is **mutualism**.",
    },
    {
      title: "Hibernation and aestivation mixed up",
      body: "**Hibernation** is during winter (polar bear); **aestivation** is to avoid summer heat (some snails and fish).",
    },
    {
      title: "Wrong growth curve",
      body: "Bacteria on a freshly inoculated plate with unlimited resources show **exponential** growth; a habitat with limited resources gives the sigmoid **logistic** curve.",
    },
    {
      title: "Logistic curve phases unlabelled",
      body: "Name all four phases (lag, log, diminishing growth, stationary) and mark the carrying capacity K where the curve levels off.",
    },
  ],
};

export default sheet;
