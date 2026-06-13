import type { SubtopicNote } from "@/app/notes/_types";

export const SOILS_NOTE: SubtopicNote = {
  subtopicName: "Soils",
  title: "Soils",
  oneLineDefinition:
    "Soil is the thin living layer that forms where weathered rock, climate, organisms, topography and time meet; soil-forming processes and a global classification organise its many types.",
  whyItMatters:
    "5 PYQs. The earners are the soil-forming FACTORS (parent material, climate, organisms, topography, time — never 'human habitation'), the named soil PROCESSES (calcification, laterisation, podsolisation, gleisation), and a couple of classification facts (Histosols = organic soil).",
  concepts: [
    // 1. soil formation (FOUNDATION, formula)
    {
      kind: "formula" as const,
      slug: "soil-formation",
      name: "How soil forms — the five factors",
      intuition:
        "Soil is what weathering leaves behind, slowly enriched with organic matter. Five natural factors control it: the PARENT material (the rock beneath), CLIMATE (rain and heat), living ORGANISMS, the TOPOGRAPHY (slope and drainage) and TIME. Human habitation is NOT one of the natural soil-forming factors — that's the classic trap.",
      definition:
        "The five soil-forming factors:\n" +
        "- **Parent material** — the underlying rock that weathers into mineral grains.\n" +
        "- **Climate** — temperature and rainfall drive weathering and leaching.\n" +
        "- **Organisms** — plants, microbes and animals add humus.\n" +
        "- **Topography (relief)** — slope controls drainage and erosion.\n" +
        "- **Time** — soil deepens and matures over long periods.\n" +
        "**Human habitation is NOT a soil-forming factor.** Soil develops in distinct layers called **horizons** (O, A, B, C).",
      authoredExample: {
        prompt:
          "Which of these is NOT a soil-forming factor: parent material, topography, climate, human habitation?",
        steps: [
          "Parent material, topography and climate are three of the five natural factors.",
          "The remaining two natural factors are organisms and time.",
          "Human habitation is not among the natural soil-forming factors.",
        ],
        answer: "Human habitation.",
      },
      selfCheckExample: {
        prompt: "Name the five natural factors that form soil.",
        steps: [
          "Start from the rock and the climate acting on it.",
          "Add the living organisms, the slope, and the time available.",
        ],
        answer: "Parent material, climate, organisms, topography, and time.",
      },
      practiceSet: [
        { prompt: "Which factor is NOT a soil-forming factor: climate, time, human habitation, organisms?", answer: "Human habitation" },
        { prompt: "The underlying rock that weathers into soil is the ___ material?", answer: "Parent" },
        { prompt: "The layers of a soil profile are called?", answer: "Horizons" },
      ],
      pyqExampleId: "d8918082-560a-4431-a846-348a5f2117cb", // NOT a soil-forming factor = human habitation
    },

    // 2. soil processes (reference)
    {
      kind: "reference" as const,
      slug: "soil-processes",
      name: "Soil-forming processes",
      intuition:
        "Once soil exists, named processes shape its profile. Translocation moves fine particles down from upper horizons (eluviation) and dumps them lower (illuviation). The dominant process depends on climate: dry climates concentrate lime (calcification), cold conifer forests strip and bleach the topsoil (podsolisation), and hot wet tropics leach everything but iron and aluminium (laterisation).",
      definition:
        "- **Translocation** — fine particles washed DOWN by **eluviation** (removal from upper horizon) and deposited lower by **illuviation**.\n" +
        "- **Calcification** — where **evapotranspiration exceeds precipitation** (dry climate), lime/calcium accumulates near the surface.\n" +
        "- **Podsolisation** — in cool **Taiga (coniferous) forests**, acids bleach and leach the topsoil.\n" +
        "- **Laterisation** — in hot wet tropics, silica is leached, leaving iron/aluminium oxides (red laterite).\n" +
        "- **Gleisation** — waterlogged, poorly-drained soils.\n" +
        "Process classes: translocation, enrichment, removal, transformation.",
      table: {
        columns: ["Process", "Where / what"],
        rows: [
          {
            cells: ["Translocation", "Eluviation (down) + illuviation (deposit)"],
            noteAmber: "NDA 2025 — translocation = eluviation + illuviation.",
          },
          {
            cells: ["**Calcification**", "Evapotranspiration > precipitation (dry); lime builds up"],
            noteAmber: "NDA 2023 — dry climate, evaporation exceeds rainfall → calcification.",
          },
          {
            cells: ["**Podsolisation**", "Taiga (coniferous) forest"],
            noteAmber: "NDA 2023 — podsolisation is predominant in the Taiga forest.",
          },
          { cells: ["Laterisation", "Hot wet tropics (red laterite)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In which climate regime does calcification occur — where evapotranspiration significantly exceeds precipitation, or where rainfall exceeds evaporation?",
        steps: [
          "Calcification concentrates lime, which only happens when water doesn't wash it away.",
          "That requires a dry climate — evaporation exceeding rainfall.",
        ],
        answer: "Where evapotranspiration exceeds precipitation (a dry climate).",
      },
      practiceSet: [
        { prompt: "Eluviation + illuviation together make up which process?", answer: "Translocation" },
        { prompt: "Podsolisation predominates in which forest?", answer: "Taiga (coniferous)" },
        { prompt: "Which process dominates where evaporation exceeds rainfall?", answer: "Calcification" },
      ],
      pyqExampleId: "a2a15206-9632-4892-ac96-ffc945973b34", // podsolisation in Taiga
    },

    // 3. soil classification (reference)
    {
      kind: "reference" as const,
      slug: "soil-classification",
      name: "Soil classification (soil orders)",
      intuition:
        "The global soil-taxonomy splits soils into orders, each ending in '-sols'. A few are NDA-worthy: Histosols are the ORGANIC, peaty soils; Aridisols are dry-desert soils; Oxisols are heavily-weathered tropical soils; Vertisols are swelling clay soils.",
      definition:
        "- **Histosols** — ORGANIC soils, rich in peat/decayed plant matter (waterlogged).\n" +
        "- **Aridisols** — dry desert soils.\n" +
        "- **Oxisols** — deeply weathered, iron/aluminium-rich tropical soils.\n" +
        "- **Vertisols** — clay-rich soils that swell and crack (like India's black cotton soil).",
      table: {
        columns: ["Soil order", "Character"],
        rows: [
          {
            cells: ["**Histosols**", "Organic (peaty)"],
            noteAmber: "NDA 2023 — Histosols are the organic soil.",
          },
          { cells: ["Aridisols", "Dry desert soils"] },
          { cells: ["Oxisols", "Weathered tropical soils"] },
          { cells: ["Vertisols", "Swelling clays"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is an organic soil: Aridisols, Histosols, Oxisols, Vertisols?",
        steps: [
          "Aridisols are dry; Oxisols are weathered tropics; Vertisols are clays.",
          "The peaty, organic-matter-rich order is Histosols.",
        ],
        answer: "Histosols.",
      },
      practiceSet: [
        { prompt: "Which soil order is organic/peaty?", answer: "Histosols" },
        { prompt: "Dry desert soils belong to which order?", answer: "Aridisols" },
      ],
      pyqExampleId: "dab5e760-7057-4ee0-b204-f30b0f280fa7", // organic soil = Histosols
    },
  ],
};
