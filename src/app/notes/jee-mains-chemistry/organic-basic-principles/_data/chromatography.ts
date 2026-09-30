import type { SubtopicNote } from "@/app/notes/_types";

export const CHROMATOGRAPHY_GOC_NOTE: SubtopicNote = {
  subtopicName: "Chromatography",
  title: "Chromatography",
  oneLineDefinition:
    "Chromatography separates a mixture as a mobile phase carries it over a stationary phase: a component that clings more to the stationary phase travels less, so it has a lower Rf on a plate and leaves a column later.",
  whyItMatters:
    "Twenty PYQs, five of them asking for a number, and one from 2026. Ten test the types: adsorption in column and thin-layer chromatography, partition in paper chromatography, the adsorbents used and how colourless spots are made visible. Ten are about Rf: working it out from a plate, reading polarity from it, and turning it into an order of elution.",
  concepts: [
    // C1 — adsorption and partition chromatography
    {
      kind: "reference" as const,
      slug: "jcgoc-chroma-types",
      name: "Adsorption and partition chromatography",
      intuition:
        "In every kind of chromatography a moving solvent (the mobile phase) carries the mixture over something that stays put (the stationary phase). Each component divides its time between the two. In adsorption chromatography the stationary phase is a solid that holds the components on its surface; in partition chromatography it is a liquid film, and the components share themselves between two liquids.",
      definition:
        "- **Adsorption chromatography**: the components are adsorbed to different extents on a solid adsorbent, silica gel or alumina. Column chromatography and thin-layer chromatography (TLC) work this way.\n" +
        "- **Partition chromatography**: the components are distributed continuously between a liquid held as a thin film on an inert support (the stationary phase) and a moving liquid.\n" +
        "- **Paper chromatography** is partition chromatography: the paper is only the support, and the stationary phase is the WATER held in its pores.\n" +
        "- Colourless spots on a TLC plate are found with ultraviolet light (for fluorescent compounds), with iodine vapour (brown spots) or by spraying a reagent (ninhydrin for amino acids). A visualising agent is never added to the mobile phase.\n" +
        "- Preparative TLC separates small amounts, around 100 mg; column chromatography handles larger amounts.\n" +
        "- The separation depends on the adsorbent, the solvent, the solubility of each component and the length of the column or plate.",
      table: {
        columns: ["Technique", "Principle", "Stationary phase", "Mobile phase"],
        rows: [
          { cells: ["Column chromatography", "Adsorption", "Silica gel or alumina packed in a glass column", "A solvent (the eluant) run down the column"] },
          { cells: ["Thin-layer chromatography (TLC)", "Adsorption", "A thin layer of silica gel or alumina on a glass plate", "A solvent rising up the plate by capillary action"] },
          {
            cells: ["Paper chromatography", "Partition", "Water held in the pores of the paper", "A solvent rising up the paper"],
            noteAmber: "The paper itself is only the support, not the stationary phase.",
          },
        ],
        caption: "Column and TLC share a principle; paper chromatography is the odd one out.",
      },
      selfCheckExample: {
        prompt: "Name three ways to make colourless spots visible on a TLC plate.",
        steps: [
          "Fluorescent compounds show up under ultraviolet light.",
          "Many organic compounds take up iodine from iodine vapour and appear as brown spots.",
          "A spray reagent reacts with the compound to give a coloured spot, such as ninhydrin with an amino acid.",
        ],
        answer: "Ultraviolet light, iodine vapour and spraying a suitable reagent.",
      },
      practiceSet: [
        { prompt: "On what principle does thin-layer chromatography work?", answer: "Adsorption" },
        { prompt: "Name two adsorbents used in column chromatography.", answer: "Silica gel and alumina" },
        { prompt: "On what principle does paper chromatography work?", answer: "Partition" },
        { prompt: "Which technique suits a 100 mg mixture of two solids?", answer: "Preparative TLC" },
      ],
      pyqExampleId: "ba8b76ce-16d5-4387-801c-122435d224cc", // 2025 — partition chromatography and the stationary phase of paper
      traps: [
        {
          title: "The paper is not the stationary phase",
          body: "In paper chromatography the stationary phase is the water held in the paper's pores. A statement that the paper material itself is the stationary phase is false.",
        },
        {
          title: "TLC works by adsorption, not partition",
          body: "Thin-layer chromatography uses a solid adsorbent on a plate, just like column chromatography. Only paper chromatography, among the three, works by partition.",
        },
        {
          title: "No visualising agent in the mobile phase",
          body: "Spots are revealed after the plate is run: by UV light, iodine vapour or a spray. Adding a visualising agent to the solvent is not a method of locating spots.",
        },
      ],
    },

    // C2 — Rf and order of elution
    {
      kind: "formula" as const,
      slug: "jcgoc-rf",
      name: "Retardation factor and order of elution",
      intuition:
        "Rf compares how far a spot travelled with how far the solvent travelled. Both distances are measured from the base line, where the spot started, so Rf is a fraction between 0 and 1 with no unit. A compound held tightly by the stationary phase lags behind the solvent and has a small Rf.",
      definition:
        "- Measure both distances from the **base line** (the pencil line where the sample was spotted), never from the bottom edge of the plate.\n" +
        "- Rf has no unit and is always less than 1. For a given compound it changes with the solvent and the stationary phase.\n" +
        "- On polar silica gel or alumina, a more polar compound is held more strongly: it has a LOWER Rf and, on a column, it comes out LATER.\n" +
        "- The order of elution from a column is the order of decreasing Rf on a TLC plate run in the same system. The compound that elutes first has the higher Rf and the weaker adsorption.\n" +
        "- A rough polarity guide on silica: carboxylic acid > alcohol > aldehyde or ketone > ether > hydrocarbon.",
      formula: {
        label: "Retardation factor",
        latex:
          "R_f = \\dfrac{\\text{distance moved by the compound from the base line}}{\\text{distance moved by the solvent front from the base line}}",
      },
      authoredExample: {
        prompt:
          "On a silica gel TLC plate the solvent front travels 8.0 cm from the base line. Spot A travels 3.2 cm and spot B 6.0 cm. Find each Rf, say which compound is more polar, and which comes out first from a silica gel column.",
        steps: [
          "\\(R_f(\\mathrm{A}) = 3.2/8.0 = 0.40\\) and \\(R_f(\\mathrm{B}) = 6.0/8.0 = 0.75\\).",
          "A travels less, so silica holds it more strongly: A is the more polar compound.",
          "On a column the weakly held compound moves ahead, so B elutes first.",
        ],
        answer: "Rf of A = 0.40, of B = 0.75; A is more polar; B elutes first.",
      },
      selfCheckExample: {
        prompt:
          "The base line is drawn 1.0 cm above the bottom edge of a TLC plate. After the run, the solvent front is 7.0 cm and a spot 4.0 cm above the bottom edge. Find the Rf of the spot.",
        steps: [
          "Distance moved by the spot from the base line \\(= 4.0 - 1.0 = 3.0\\) cm.",
          "Distance moved by the solvent front from the base line \\(= 7.0 - 1.0 = 6.0\\) cm.",
          "\\(R_f = 3.0/6.0\\).",
        ],
        answer: "0.50 (not 4.0/7.0 = 0.57).",
      },
      practiceSet: [
        { prompt: "Does Rf have a unit?", answer: "No" },
        { prompt: "Can an Rf value be greater than 1?", answer: "No" },
        { prompt: "On silica gel, which has the lower Rf: a carboxylic acid or an ester of similar size?", answer: "The carboxylic acid" },
        { prompt: "Compound P elutes from a silica column before compound Q. Which has the higher Rf?", answer: "P" },
      ],
      pyqExampleId: "ca6b6d80-d64f-4b2e-9d4d-15bede2366d3", // 2026 — Rf of the alcohol from hydration of 2-methylpropene
      traps: [
        {
          title: "Measure from the base line, not the plate edge",
          body: "If a distance is given from the bottom of the plate, subtract the height of the base line first, for both the spot and the solvent front.",
        },
        {
          title: "More polar means lower Rf on silica",
          body: "A polar compound, such as an alcohol or an acid, sticks to polar silica gel and travels less. Its Rf is SMALLER than that of a non-polar compound in the same solvent.",
        },
        {
          title: "The first compound out has the higher Rf",
          body: "On a column, the compound that is adsorbed least runs fastest and elutes first. The same compound travels furthest on a TLC plate, so it has the higher Rf.",
        },
      ],
    },
  ],
};
