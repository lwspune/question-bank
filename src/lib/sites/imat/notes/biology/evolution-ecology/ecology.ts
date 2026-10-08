import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_EVO_ECOLOGY_NOTE: SubtopicNote = {
  subtopicName: "Ecosystems and Ecology",
  title: "Ecosystems, Energy Flow, Nutrient Cycles and Interactions",
  oneLineDefinition:
    "Energy flows one way through an ecosystem and is mostly lost as heat at each level, while carbon and nitrogen are recycled; species interact through competition, predation and partnerships.",
  whyItMatters:
    "Only one past question, in 2018, sits here: two competing bacteria and which changes in conditions could favour one of them. Food chains, energy flow and the carbon and nitrogen cycles are standard syllabus topics that the ministry papers can ask at any time.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-evo-ecosystem-terms",
      name: "Levels of ecological organisation and trophic levels",
      intuition:
        "Ecology zooms out in steps: one organism, then all of its species in a place, then all species in that place, then those species plus the non-living world round them. Within an ecosystem, organisms are sorted by what they eat, which is how energy and matter move.",
      definition:
        "Key terms:\n" +
        "- **Biotic** factors are living (predators, competitors, disease); **abiotic** factors are non-living (light, temperature, water, pH, soil minerals).\n" +
        "- **Trophic levels**: **producers** (autotrophs, mostly photosynthetic) → **primary consumers** (herbivores) → **secondary** and **tertiary consumers** (carnivores).\n" +
        "- **Decomposers** (bacteria and fungi) break down dead matter and waste and return minerals to the soil; **detritivores** such as earthworms eat the dead matter.\n" +
        "- A **food chain** is one feeding line; a **food web** is all the linked chains in an ecosystem. Arrows point in the direction energy moves, from the eaten to the eater.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Population", "All individuals of one species in one area", "The perch in a lake"] },
          { cells: ["Community", "All populations of all species in one area", "Every plant, animal and microbe in the lake"] },
          { cells: ["Ecosystem", "A community plus its abiotic environment", "The lake with its water, mud, light and temperature"] },
          { cells: ["Habitat", "The place where an organism lives", "Shallow water among reeds"] },
          { cells: ["Niche", "The role of a species: what it eats, when, where, and how it uses resources", "A perch hunting small fish by day near the surface"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which term describes all the organisms of every species living in a pond, without the water and mud?",
        options: ["Community", "Population", "Ecosystem", "Habitat", "Niche"],
        steps: [
          "All the species in an area together form a community.",
          "A population is one species only; an ecosystem would include the abiotic water and mud.",
          "A habitat is a place and a niche is a role, not a group of organisms.",
        ],
        answer: "(A) Community",
      },
      practiceSet: [
        { prompt: "Is soil pH a biotic or an abiotic factor?", answer: "Abiotic" },
        { prompt: "Which trophic level do herbivores occupy?", answer: "Primary consumers" },
        { prompt: "What is the role of decomposers?", answer: "They break down dead matter and return minerals to the soil" },
      ],
      traps: [
        {
          title: "An ecosystem includes the non-living part",
          body: "A community is only the living organisms. An ecosystem is the community together with its abiotic environment. Options that use the two words as if they meant the same are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-evo-energy-flow",
      name: "Energy flow between trophic levels and the 10% rule",
      intuition:
        "Most of the energy an animal eats is burned in its own respiration and leaves as heat, or is never eaten at all (roots, bones) or passes out in faeces. Only a small part becomes new body tissue for the next level to eat. So energy shrinks fast up a food chain, which is why chains rarely have more than four or five levels.",
      definition:
        "Energy enters as light, is fixed by producers, and **flows one way**: it is not recycled.\n" +
        "- On average only about **10%** of the energy at one level becomes biomass in the next (the real range is roughly 5 to 20%).\n" +
        "- **Gross primary productivity (GPP)** is the energy plants fix; **net primary productivity** is what is left after their own respiration: NPP = GPP minus respiration.\n" +
        "- A **pyramid of energy** is never inverted. Pyramids of numbers (one oak tree, many caterpillars) and of biomass (in the sea) can be.\n" +
        "- Persistent poisons such as DDT and mercury are not broken down, so they become more concentrated at each level (**biomagnification**).",
      formula: {
        label: "Energy passed up a food chain",
        latex: "E_{k+1} \\approx 0.1 \\times E_{k} \\qquad \\text{efficiency} = \\frac{E_{k+1}}{E_k} \\times 100\\%",
        symbols: [
          { symbol: "\\(E_k\\)", meaning: "energy at trophic level k (producers are level 1)" },
          { symbol: "\\(E_{k+1}\\)", meaning: "energy passed to the next level" },
        ],
      },
      authoredExample: {
        prompt:
          "Grass in a meadow stores 50,000 kJ per m² per year. Using the 10% rule, how much energy reaches each level of the chain grass → grasshopper → frog → snake?",
        steps: [
          "Grasshoppers (primary consumers): \\(0.1 \\times 50\\,000 = 5000\\ \\text{kJ}\\).",
          "Frogs (secondary consumers): \\(0.1 \\times 5000 = 500\\ \\text{kJ}\\).",
          "Snakes (tertiary consumers): \\(0.1 \\times 500 = 50\\ \\text{kJ}\\), a thousandth of what the grass stored.",
        ],
        answer: "5000 kJ, 500 kJ and 50 kJ per m² per year",
      },
      selfCheckExample: {
        prompt:
          "Producers in a pond fix 120,000 kJ per m² per year. If 10% passes from each level to the next, how much energy reaches the tertiary consumers?",
        options: ["12,000 kJ", "1200 kJ", "12 kJ", "120 kJ", "30,000 kJ"],
        steps: [
          "Primary consumers: 12,000 kJ. Secondary: 1200 kJ. Tertiary: 120 kJ.",
          "Tertiary consumers are three steps above the producers, so multiply by \\(0.1^3\\).",
          "A stops at primary and B at secondary consumers; C takes one step too many; E divides by four levels instead of applying 10% per step.",
        ],
        answer: "(D) 120 kJ",
      },
      practiceSet: [
        { prompt: "Herbivores take in 30,000 kJ and their predators gain 2400 kJ. What is the transfer efficiency?", answer: "8%", method: "\\(2400/30\\,000 \\times 100\\)" },
        { prompt: "Producers fix 8000 kJ. With 10% transfer, how much reaches the secondary consumers?", answer: "80 kJ", method: "\\(8000 \\times 0.1^2\\)" },
        { prompt: "Plants fix 20,000 kJ and use 12,000 kJ in respiration. What is their net primary productivity?", answer: "8000 kJ", method: "GPP minus respiration" },
        { prompt: "Which kind of ecological pyramid can never be inverted?", answer: "The pyramid of energy" },
      ],
      traps: [
        {
          title: "Energy flows, matter cycles",
          body: "Carbon and nitrogen atoms go round and round between organisms and the environment. Energy does not: it enters as light and leaves as heat. An option saying decomposers return energy to the producers is wrong; they return minerals.",
        },
        {
          title: "Most energy is lost as heat from respiration",
          body: "The roughly 90% that does not reach the next level is mainly used in respiration and lost as heat, with the rest in uneaten parts and faeces. It is not stored in the predator's body.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-evo-cycles",
      name: "The carbon cycle and the nitrogen cycle",
      intuition:
        "Living things are built from a fixed stock of atoms, so the atoms must be reused. Carbon goes into living matter by photosynthesis and back out as carbon dioxide. Nitrogen is plentiful in the air, but almost nothing can use it as a gas: bacteria do nearly all the work of moving it in and out of living things.",
      definition:
        "**Carbon cycle**: photosynthesis removes \\(\\mathrm{CO_2}\\) from the air; respiration (by all organisms), decomposition and combustion return it. Oceans dissolve \\(\\mathrm{CO_2}\\); fossil fuels are carbon locked away for millions of years. Burning them and cutting forests raise atmospheric \\(\\mathrm{CO_2}\\) and add to the greenhouse effect.\n" +
        "**Nitrogen cycle**: \\(\\mathrm{N_2}\\) makes up about 78% of air, but plants take in nitrogen mainly as nitrate \\(\\mathrm{(NO_3^-)}\\) and ammonium \\(\\mathrm{(NH_4^+)}\\) to make amino acids and nucleic acids.\n" +
        "- **Nitrogen fixation** needs the enzyme **nitrogenase**, which oxygen damages.\n" +
        "- **Nitrification** needs oxygen; **denitrification** happens where oxygen is short, as in waterlogged soil.",
      table: {
        columns: ["Process", "Change", "Done by"],
        rows: [
          { cells: ["Nitrogen fixation", "\\(\\mathrm{N_2} \\rightarrow \\mathrm{NH_3}\\) or \\(\\mathrm{NH_4^+}\\)", "Rhizobium in legume root nodules, free-living Azotobacter, cyanobacteria; also lightning and the industrial Haber process"] },
          { cells: ["Ammonification", "Proteins and urea in dead matter and waste \\(\\rightarrow \\mathrm{NH_4^+}\\)", "Decomposers (bacteria and fungi)"] },
          { cells: ["Nitrification", "\\(\\mathrm{NH_4^+} \\rightarrow \\mathrm{NO_2^-} \\rightarrow \\mathrm{NO_3^-}\\)", "Nitrosomonas (first step), Nitrobacter (second step)"] },
          { cells: ["Assimilation", "\\(\\mathrm{NO_3^-}\\) and \\(\\mathrm{NH_4^+}\\) taken up into amino acids", "Plant roots, then animals by eating plants"] },
          { cells: ["Denitrification", "\\(\\mathrm{NO_3^-} \\rightarrow \\mathrm{N_2}\\) back to the air", "Anaerobic bacteria such as Pseudomonas"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which process returns nitrogen from the soil to the atmosphere?",
        options: ["Nitrogen fixation", "Nitrification", "Denitrification", "Ammonification", "Assimilation"],
        steps: [
          "Denitrifying bacteria turn nitrate into nitrogen gas, which escapes to the air.",
          "Fixation does the reverse, taking \\(\\mathrm{N_2}\\) out of the air.",
          "Nitrification and ammonification change one soil form into another, and assimilation moves nitrogen into living things.",
        ],
        answer: "(C) Denitrification",
      },
      practiceSet: [
        { prompt: "Which bacteria turn ammonium into nitrite?", answer: "Nitrosomonas" },
        { prompt: "In what form do plants mostly absorb nitrogen?", answer: "Nitrate ions" },
        { prompt: "Why do waterlogged soils lose nitrogen?", answer: "Low oxygen favours denitrifying bacteria, which release \\(\\mathrm{N_2}\\)" },
        { prompt: "Name two processes that add \\(\\mathrm{CO_2}\\) to the air.", answer: "Any two of: respiration, decomposition, combustion, volcanic activity" },
      ],
      traps: [
        {
          title: "Nitrification is not nitrogen fixation",
          body: "Fixation turns nitrogen gas into ammonia. Nitrification turns ammonium into nitrite and then nitrate. They are done by different bacteria, and only fixation brings new nitrogen in from the air.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-evo-interactions",
      name: "Interactions between species and population growth",
      intuition:
        "Every species is affected by the others around it: some it eats, some eat it, some want the same food, some help it. When conditions change, the balance shifts: a change that hurts one competitor frees resources for the other.",
      definition:
        "Species interactions are named by the effect on each partner (gain, harm or none).\n" +
        "- **Competition** can be within a species (**intraspecific**) or between species (**interspecific**). Two species with exactly the same niche cannot coexist for long: one excludes the other (**competitive exclusion**).\n" +
        "- Species differ in their tolerance of temperature, pH and chemicals, so a change in conditions or an added toxin can tip a competition either way.\n" +
        "- **Population growth**: with unlimited resources, numbers grow **exponentially** (J-shaped curve). In reality growth slows and levels off at the **carrying capacity** (K), the largest population the environment can support (S-shaped, **logistic** curve).\n" +
        "- **Density-dependent** factors (competition, predation, disease) bite harder in crowded populations; **density-independent** factors (floods, frost) do not depend on numbers.",
      table: {
        columns: ["Interaction", "Effect on each species", "Example"],
        rows: [
          { cells: ["Competition", "Both harmed", "Two plant species shading each other for light"] },
          { cells: ["Predation", "Predator gains, prey harmed", "Lynx and snowshoe hare"] },
          { cells: ["Parasitism", "Parasite gains, host harmed", "Tapeworm in a human gut"] },
          { cells: ["Mutualism", "Both gain", "Rhizobium in legume roots; the fungus and alga of a lichen"] },
          { cells: ["Commensalism", "One gains, the other unaffected", "Barnacles riding on a whale"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "On a rocky shore, two species of barnacle compete for space. Species X is removed from a stretch of rock. What is most likely to happen to species Y on that stretch?",
        options: [
          "It declines, because the two species were mutualists",
          "It spreads into the space that X used to hold",
          "It stays the same, because competition happens only within a species",
          "It evolves into species X within a few generations",
          "It dies out, because X was its prey",
        ],
        steps: [
          "Competition harms both species, so removing one releases space for the other.",
          "Y can now settle where X used to be, as far as Y's own tolerance of conditions allows.",
          "A and E describe the wrong relationship; C ignores interspecific competition; D is impossible on that time scale.",
        ],
        answer: "(B) It spreads into the space that X used to hold",
      },
      practiceSet: [
        { prompt: "What is the shape of a logistic growth curve?", answer: "S-shaped, levelling off at the carrying capacity" },
        { prompt: "A lichen is a fungus and an alga living together, both benefiting. What is this interaction?", answer: "Mutualism" },
        { prompt: "Is a hard frost a density-dependent or a density-independent factor?", answer: "Density-independent" },
        { prompt: "What is the carrying capacity?", answer: "The largest population an environment can support for a long time" },
      ],
      traps: [
        {
          title: "A change that harms one competitor helps the other",
          body: "If two species share a resource, anything that slows one of them (a temperature or pH it tolerates badly, or a chemical it is sensitive to) leaves more of the resource for the other, which then grows faster. The change does not need to act on the winner directly.",
        },
      ],
    },
  ],
};
