import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 6 Plant Water Relation. Definitions checked against
 * the Balbharati text (wordings are the book's own, trimmed); most-asked years
 * from the 17 board past-paper questions in the bank, 2024-2026. The book states
 * DPD = OP - TP but never writes water potential as a sum of components, so
 * the sheet gives only the DPD relation.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Plant Water Relation",
  chapterSlug: "plant-water-relation",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Properties of water",
      text: "Liquid at room temperature, best solvent, inert with neutral pH, raw material for photosynthesis. High specific heat, heat of vaporization and heat of fusion make it a thermal buffer. High surface tension, adhesion and cohesion. All due to hydrogen bonds.",
    },
    {
      term: "Soil water",
      text: "**Gravitational** water percolates deep; **hygroscopic** water is held by fine soil particles; **combined water** is water present as hydrated oxides of silicon, aluminium, etc. None of these is available. Only **capillary water**, held in pores between soil particles, is absorbed.",
    },
    {
      term: "Root hair",
      text: "A cytoplasmic extension of an epiblema cell, 1 to 10 mm long, colourless, unbranched, short-lived. Large central vacuole, thin film of cytoplasm, two-layered wall (outer pectin, inner cellulose). Wall freely permeable, plasma membrane selectively permeable.",
    },
    {
      term: "Imbibition",
      text: "Swelling up of hydrophillic colloids due to adsorption of water. The adsorbing substance is the imbibant, the water imbibed is the imbibate. Seen in soaking of seeds, swelling of raisins, wooden doors in the rainy season.",
    },
    {
      term: "Diffusion and DPD",
      text: "Diffusion: movement of particles from their higher to lower concentration. **DPD** (suction pressure, B.S. Meyer 1938): the difference in the diffusion pressures of pure solvent and the solvent in a solution. Now called water potential.",
    },
    {
      term: "Osmosis",
      text: "A special type of diffusion of solvent through a semipermeable membrane, from weaker to stronger solution. **Endosmosis** (into the cell) makes it turgid; **exosmosis** (out of the cell) makes it flaccid.",
    },
    {
      term: "Turgor pressure and wall pressure",
      text: "**TP**: pressure exerted by turgid cell sap on the cell membrane and cell wall. **WP**: the equal counter pressure of the rigid cell wall. In a fully turgid cell TP = WP = OP, so DPD is zero.",
    },
    {
      term: "Water potential",
      text: "The chemical potential of water, symbol \\(\\psi\\). Pure water has \\(\\psi = 0\\); a solute lowers it, so it is negative. Water flows from higher (less negative) to lower (more negative) water potential. Units: bars, pascals, atmospheres.",
    },
    {
      term: "Plasmolysis",
      text: "Exo-osmosis in a living cell placed in a hypertonic solution: the protoplast shrinks and recedes from the cell wall. In hypotonic solution, endo-osmosis makes it turgid again (**deplasmolysis**).",
    },
    {
      term: "Apoplast and symplast",
      text: "**Apoplast**: water moves through cell walls and intercellular spaces of the cortex, up to the endodermis (Casparian strip). **Symplast** (transmembrane): water moves from living cell to living cell through plasmodesmata.",
    },
    {
      term: "Passive and active absorption",
      text: "**Passive** (about 98%): by day, driven by transpiration pull, no ATP. **Active**: usually at night, driven by root pressure, against the DPD gradient, uses ATP; osmotic (Atkins and Priestley) or non-osmotic (Kramer and Thimann).",
    },
    {
      term: "Ascent of sap",
      text: "Transport of water with dissolved minerals from root to aerial parts against gravity, through xylem tracheids and vessels. Theories: root pressure, capillarity and the accepted **cohesion-tension (transpiration pull) theory** of Dixon and Jolly (1894).",
    },
    {
      term: "Translocation of food",
      text: "Food moves through phloem as **sucrose**, from source to sink. Vertical: up or down. Lateral: phloem to pith is **radial**; phloem to cortex is **tangential**. Best explained by Munch's pressure flow (mass flow) hypothesis.",
    },
    {
      term: "Transpiration",
      text: "Loss of water in the form of vapour through leaves, stem, flowers and fruits. Stomatal (90 to 93%), cuticular (8 to 10%), lenticular (0.1 to 1%). Liquid loss through hydathodes is guttation. Curtis called it a necessary evil.",
    },
  ],
  formulas: [
    {
      label: "Diffusion pressure deficit",
      latex: "\\text{DPD} = \\text{OP} - \\text{TP} \\qquad (\\text{TP} = \\text{WP})",
      symbols: [
        { symbol: "Flaccid cell", meaning: "TP = 0, so DPD = OP" },
        { symbol: "Fully turgid cell", meaning: "TP = OP, so DPD = 0" },
      ],
    },
  ],
  derivations: [
    {
      title: "Factors affecting water absorption",
      steps: [
        "Capillary water must be present in the soil.",
        "Absorption is fastest at a soil temperature of 20 to 30 °C.",
        "A high concentration of solutes in soil water lowers absorption; so does poorly aerated soil.",
        "Faster transpiration speeds up absorption.",
      ],
    },
    {
      title: "Root pressure theory and its limitations",
      steps: [
        "Proposed by Priestley; a cut stem oozes xylem sap, proof of root pressure (named by S. Hales). Value +1 to +2 bars, enough for 10 to 20 m.",
        "Limits: not applicable to plants taller than 20 m; ascent occurs even without roots; nearly zero in tall gymnosperms.",
        "No root pressure in actively transpiring plants, and xylem sap is normally under tension.",
      ],
    },
    {
      title: "Cohesion-tension (transpiration pull) theory",
      steps: [
        "Cohesion (water to water) and adhesion (water to lignified xylem wall) form a continuous water column from root to leaf tip.",
        "Transpiration from leaves raises the DPD of mesophyll cells, which draw water from leaf xylem.",
        "This creates tension (transpiration pull) in the xylem, transmitted down to the root, which lifts the column.",
      ],
    },
    {
      title: "Opening and closing of stomata",
      steps: [
        "Stoma opens when guard cells turn turgid by endosmosis: thin outer walls stretch and pull the thick inner walls apart. Flaccid guard cells close it.",
        "Starch-sugar interconversion (Steward 1964): by day, phosphorylase turns starch to sugar, raising osmotic potential; water enters and the stoma opens. The reverse at night closes it.",
        "Proton transport (Levitt 1974): by day starch gives malic acid; protons go to subsidiary cells and K+ ions come in with Cl-, forming potassium malate; endosmosis opens the stoma.",
        "At night abscisic acid stops K+ and Cl- uptake, so guard cells turn flaccid and the stoma closes.",
      ],
    },
    {
      title: "Advantages of transpiration",
      steps: [
        "Removes excess water and helps passive absorption of water and minerals.",
        "Helps the ascent of sap and keeps cells turgid.",
        "Open stomata allow gaseous exchange for photosynthesis and respiration; it cools the leaf.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Structure of root hair (Fig. 6.1 b)",
      labels: ["cell wall", "cytoplasm", "nucleus", "vacuole", "mitochondria (board asks it)", "root epithelial (epiblemal) cell"],
    },
    {
      title: "Root tip showing root hair zone (Fig. 6.1 a)",
      labels: ["root cap", "meristematic region", "zone of elongation", "root hair zone", "maturation zone"],
    },
    {
      title: "Stomatal apparatus in a dicot (Fig. 6.8)",
      labels: ["kidney-shaped guard cells", "stomatal pore", "subsidiary cells", "epidermal cells", "chloroplast and nucleus", "inner thick wall"],
    },
    {
      title: "Pathways for water uptake by the root (Fig. 6.3)",
      labels: ["apoplast path", "symplast path", "transmembrane (vacuolar) path", "cortex", "Casparian strip", "xylem"],
    },
  ],
  mostAsked: [
    { topic: "Absorption of water by the root: imbibition, factors affecting it, pathway of uptake", years: [2026, 2025, 2024] },
    { topic: "Transpiration: stomatal opening and closing (starch-sugar and proton transport theories), stomatal diagram, advantages", years: [2026, 2025, 2024] },
    { topic: "Translocation of food: as sucrose, radial and tangential translocation", years: [2026, 2024] },
    { topic: "Structure of root hair, with a labelled diagram", years: [2026, 2025] },
    { topic: "Root pressure: its value, and limitations of root pressure theory", years: [2024] },
    { topic: "Properties of water, and combined water in the soil", years: [2026] },
    { topic: "DPD of a turgid cell when turgor pressure equals wall pressure", years: [2026] },
  ],
  mistakes: [
    {
      title: "Calling hygroscopic or combined water available",
      body: "Only capillary water is available to roots. Gravitational, hygroscopic and combined water are not.",
    },
    {
      title: "Wrong DPD for a turgid cell",
      body: "In a fully turgid cell TP equals OP (and WP), so DPD is zero. In a flaccid cell TP is zero, so DPD equals OP.",
    },
    {
      title: "Swapping radial and tangential",
      body: "Phloem to pith is radial translocation; phloem to cortex is tangential. Food always travels as sucrose.",
    },
    {
      title: "Getting guard cell walls backwards",
      body: "The inner wall (facing the stoma) is thick and inelastic; the outer wall is thin and elastic. Dicots have kidney-shaped guard cells, grasses dumbbell-shaped.",
    },
    {
      title: "Overstating root pressure",
      body: "Root pressure is +1 to +2 bars, enough for only 10 to 20 m. Transpiration pull, not root pressure, lifts water in tall trees.",
    },
  ],
};

export default sheet;
