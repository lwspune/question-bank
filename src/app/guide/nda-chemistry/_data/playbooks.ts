/**
 * Playbook catalog for /guide/nda-chemistry/playbooks.
 *
 * 12 playbooks, 1:1 with chapters. Same shape as nda-physics (chapter-level
 * playbooks, no per-subtopic split) for two reasons:
 *   1. Chemistry chapters are the natural unit — every "lever" is in-chapter,
 *      not cross-chapter (no principles axis).
 *   2. Subtopics are well-cleaned but thin (max 15 q, several 2–3 q) — per
 *      subtopic playbooks would proliferate without adding clarity.
 *
 * `bucket` tags map each playbook to one of the 3 strategy strands (Recall
 * / Rule / Calculate) defined in strategy.ts. Buckets reflect the dominant
 * skill the chapter demands, not its sole skill:
 *   - recall    (144 q · 7 playbooks):  Carbon, Matter, Industrial, Metals,
 *                                       Hydrogen, Everyday Life, Practical
 *   - rule      (109 q · 4 playbooks):  Atomic Structure, Acids/Bases/Salts,
 *                                       Chemical Reactions, Chemical Bonding
 *   - calculate (9 q   · 1 playbook):   Mole Concept and Stoichiometry
 *
 * Bucket sizes are deliberately uneven — they reflect the bank's actual
 * 63%-recall shape, not a quota. NDA Chemistry is a Recall-heavy subject;
 * the strand split honours that.
 */

export type PlaybookBucket = "recall" | "rule" | "calculate";

export type Playbook = {
  slug: string;
  name: string;
  /** Single-line summary shown on the index card. */
  summary: string;
  chapter: string;
  /** All subtopics in `chapter` that this playbook covers. */
  subtopics: string[];
  qCount: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // ─────── Recall strand (7 playbooks, 144 q) ───────
  {
    slug: "carbon-and-its-compounds",
    name: "Carbon and Its Compounds",
    summary:
      "45 q · 4% HARD — the largest chapter. Allotropes (15 q · diamond/graphite/fullerene/graphene), common organic compounds (10 q), functional groups (9 q), soaps + hydrogenation, catenation, hydrocarbons. Pure recall + functional-group pattern recognition.",
    chapter: "Carbon and Its Compounds",
    subtopics: [
      "Allotropes of Carbon",
      "Common Carbon Compounds and Pigments",
      "Functional Groups and Common Organic Compounds",
      "Soaps, Detergents and Hydrogenation of Oils",
      "Catenation, Tetra-valency and Isomerism",
      "Hydrocarbons and Organic Classification",
    ],
    qCount: 45,
    pctHard: 4,
    bucket: "recall",
  },
  {
    slug: "matter-and-its-states",
    name: "Matter and Its States",
    summary:
      "30 q · 3% HARD. Five subtopics: separation techniques (filtration, distillation, chromatography), compound/mixture/solution classification, states + phase change, colloids vs suspensions (20% HARD — the lone trap subtopic), and physical vs chemical change identification.",
    chapter: "Matter and Its States",
    subtopics: [
      "Separation Techniques",
      "Compounds, Mixtures and Solutions",
      "States of Matter, Phase Changes and Diffusion",
      "Colloids and Suspensions",
      "Physical vs Chemical Changes",
    ],
    qCount: 30,
    pctHard: 3,
    bucket: "recall",
  },
  {
    slug: "industrial-and-applied-chemistry",
    name: "Industrial and Applied Chemistry",
    summary:
      "28 q · 11% HARD. Industrial gases (water gas, producer gas, syngas), cement + glass composition, fertilisers (NPK), alloys (brass, bronze, solder, stainless steel), and paints + coatings (4 q · 75% HARD — the bank's most concentrated HARD pool, pigment/drier/thinner/anti-skinning).",
    chapter: "Industrial and Applied Chemistry",
    subtopics: [
      "Industrial Gases, Manufacturing and Reactions",
      "Cement, Glass and Building Materials",
      "Fertilizers",
      "Common Industrial Substances and Alloys",
      "Paints and Coatings",
    ],
    qCount: 28,
    pctHard: 11,
    bucket: "recall",
  },
  {
    slug: "metals-and-non-metals",
    name: "Metals and Non-Metals",
    summary:
      "17 q · 0% HARD. Reactivity series (K > Na > Ca > Mg > Al > Zn > Fe > Cu > Hg > Ag > Au), reactions with water/acids, corrosion + galvanisation, alloy compositions, and ore-extraction methods. Zero HARD across the chapter — drill it for guaranteed marks.",
    chapter: "Metals and Non-Metals",
    subtopics: [
      "Reactivity Series and Reactions with Water",
      "Corrosion and Its Prevention",
      "Alloys and Their Composition",
      "Extraction of Metals and Ores",
    ],
    qCount: 17,
    pctHard: 0,
    bucket: "recall",
  },
  {
    slug: "hydrogen-and-water",
    name: "Hydrogen and Water",
    summary:
      "11 q · 9% HARD. Permanent vs temporary hardness (CaSO₄/MgSO₄ vs Ca(HCO₃)₂), softening methods (boiling/ion-exchange/lime-soda), pure-water source ranking, and dihydrogen properties + storage. The 'permanent hardness can't be removed by boiling' trap recurs.",
    chapter: "Hydrogen and Water",
    subtopics: [
      "Hardness and Purity of Water",
      "Properties of Hydrogen",
      "Properties and Anomalous Behaviour of Water",
    ],
    qCount: 11,
    pctHard: 9,
    bucket: "recall",
  },
  {
    slug: "chemistry-in-everyday-life",
    name: "Chemistry in Everyday Life",
    summary:
      "10 q · 0% HARD. Common chemicals + their uses (deep-sea diver's gas, freezing mixtures, fire-extinguisher CO₂, household acids), and medicines (antacids, analgesics, antibiotics). Pure recall — every q is a 'which substance does X' match.",
    chapter: "Chemistry in Everyday Life",
    subtopics: [
      "Common Chemicals and Their Uses",
      "Medicines and Health Chemistry",
    ],
    qCount: 10,
    pctHard: 0,
    bucket: "recall",
  },
  {
    slug: "practical-chemistry",
    name: "Practical Chemistry",
    summary:
      "3 q · 0% HARD in 10 years. Lab + food + health applications (food preservation, toothpaste action, curd-keeping methods). Read once, recognise, done — under 20 min total.",
    chapter: "Practical Chemistry",
    subtopics: ["Practical Applications: Health, Food and Lab Methods"],
    qCount: 3,
    pctHard: 0,
    bucket: "recall",
  },

  // ─────── Rule strand (4 playbooks, 109 q) ───────
  {
    slug: "atomic-structure-and-periodic-classification",
    name: "Atomic Structure and Periodic Classification",
    summary:
      "35 q · 9% HARD. Periodic trends (atomic radius, ionisation energy, electronegativity — across vs down), valency from group number, atomic-number/mass-number/subatomic-particle arithmetic, atomic models (Dalton → Thomson → Rutherford → Bohr — what each PROVED, not just what they said), isotopes vs isobars vs isoelectronic.",
    chapter: "Atomic Structure and Periodic Classification",
    subtopics: [
      "Periodic Trends, Valency and Atomicity",
      "Atomic Number, Mass Number and Subatomic Particles",
      "Atomic Models: Dalton, Rutherford, Bohr",
      "Isotopes and Isoelectronic Species",
      "Electron Configuration and Valence Shells",
    ],
    qCount: 35,
    pctHard: 9,
    bucket: "rule",
  },
  {
    slug: "acids-bases-and-salts",
    name: "Acids, Bases and Salts",
    summary:
      "33 q · 6% HARD. pH-scale classification (acidic < 7, neutral = 7, basic > 7), common-acid recall (citric in lemons, oxalic in tomatoes, lactic in milk, acetic in vinegar), Arrhenius/Brønsted/Lewis theory comparisons, oxides (acidic/basic/amphoteric/neutral), salts (acidic/basic/normal), and water of crystallisation counts.",
    chapter: "Acids, Bases and Salts",
    subtopics: [
      "pH Scale and Common Substances",
      "Common Acids: Names, Formulas and Uses",
      "Acid-Base Theory: Concepts, Oxides and Electrolytes",
      "Salts and Common Compounds",
      "Water of Crystallization",
    ],
    qCount: 33,
    pctHard: 6,
    bucket: "rule",
  },
  {
    slug: "chemical-reactions",
    name: "Chemical Reactions",
    summary:
      "30 q · 10% HARD. Redox classification (oxidation = loss of e⁻ / OIL RIG mnemonic), reaction-type identification (combination, decomposition, displacement, double-displacement), specific reactions (precipitation, electrolysis, lime water + CO₂), thermal decomposition products, and endo/exothermic recognition.",
    chapter: "Chemical Reactions",
    subtopics: [
      "Redox: Oxidation, Reduction and Reducing Agents",
      "Types of Reactions: Combination, Decomposition, Displacement",
      "Specific Reactions: Precipitation, Electrolysis and Daily Life",
      "Thermal and Photochemical Decomposition",
      "Endothermic and Exothermic Reactions",
      "Physical vs Chemical Changes",
    ],
    qCount: 30,
    pctHard: 10,
    bucket: "rule",
  },
  {
    slug: "chemical-bonding",
    name: "Chemical Bonding",
    summary:
      "11 q · 0% HARD. Ionic vs covalent prediction from electronegativity difference, oxidation-state assignment in a compound (rule sequence: H = +1, O = −2, group I = +1, sum to zero), valency from electronic config, molecular formula → atom count. Pure rule application, every q tractable.",
    chapter: "Chemical Bonding",
    subtopics: [
      "Ionic and Covalent Bonding",
      "Valency, Oxidation States and Molecular Formula",
      "Bond Counting and Molecular Structure",
    ],
    qCount: 11,
    pctHard: 0,
    bucket: "rule",
  },

  // ─────── Calculate strand (1 playbook, 9 q) ───────
  {
    slug: "mole-concept-and-stoichiometry",
    name: "Mole Concept and Stoichiometry",
    summary:
      "9 q · 11% HARD — the bank's only Calculate-strand chapter. Mole = 6.022×10²³ particles; molar mass arithmetic; Avogadro's law (equal V → equal n at same T, P); stoichiometric ratios from balanced equations; equivalent weight = molar mass / valency factor; laws of chemical combination (conservation of mass, definite proportions).",
    chapter: "Mole Concept and Stoichiometry",
    subtopics: [
      "Mole Concept, Avogadro's Law and Molar Calculations",
      "Stoichiometry and Laws of Chemical Combination",
    ],
    qCount: 9,
    pctHard: 11,
    bucket: "calculate",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  recall: PLAYBOOKS.filter((p) => p.bucket === "recall"),
  rule: PLAYBOOKS.filter((p) => p.bucket === "rule"),
  calculate: PLAYBOOKS.filter((p) => p.bucket === "calculate"),
};
