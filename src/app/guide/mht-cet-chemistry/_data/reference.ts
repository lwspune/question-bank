/**
 * Content for /guide/mht-cet-chemistry/reference — the Chemistry counterpart
 * of the Maths and Physics /formulas page.
 *
 * Chemistry's flat-list artefact is not only formulas: half the paper is
 * answered by recognising a named reaction or a reagent. So each chapter group
 * holds whichever the chapter turns on — the physical formulas for the
 * Calculate strand, the named reactions for Reactions, the tables for Recall.
 *
 * Rendered by the shared FormulaSheet (plain text + unicode, never LaTeX: the
 * renderer prints `formula` raw). Groups follow the strands.
 */

export type ReferenceEntry = {
  id: string;
  name: string;
  /** The formula, reaction or fact, in plain text + unicode. */
  formula: string;
  legend: string[];
  notes?: string;
};

export type ReferenceGroup = {
  chapter: string;
  playbookSlug: string;
  formulas: ReferenceEntry[];
};

export const FORMULA_GROUPS: ReferenceGroup[] = [
  // Calculate
  {
    chapter: "Solutions and Colligative Properties",
    playbookSlug: "solutions",
    formulas: [
      { id: "colligative", name: "Colligative properties", formula: "ΔT_b = i·K_b·m     ΔT_f = i·K_f·m     π = i·C·R·T     (p° − p)/p° = x₂", legend: ["m = molality", "C = molarity", "i = van't Hoff factor"], notes: "i = 2 for NaCl, 3 for CaCl₂, 4 for AlCl₃ (full dissociation)." },
      { id: "henry", name: "Henry's law", formula: "C = K_H · p", legend: ["C = solubility of the gas", "p = its partial pressure"] },
    ],
  },
  {
    chapter: "Solid State",
    playbookSlug: "solid-state",
    formulas: [
      { id: "density", name: "Density of a unit cell", formula: "ρ = z·M / (a³·N_A)", legend: ["z = 1 (sc), 2 (bcc), 4 (fcc)", "a in cm"] },
      { id: "radius", name: "Radius and edge", formula: "sc: r = a/2     bcc: r = √3·a/4     fcc: r = √2·a/4", legend: ["a = edge length"] },
      { id: "packing", name: "Packing and voids", formula: "sc 52.4%   bcc 68%   fcc/hcp 74%     n atoms → n octahedral, 2n tetrahedral voids", legend: [] },
    ],
  },
  {
    chapter: "Chemical Kinetics",
    playbookSlug: "chemical-kinetics",
    formulas: [
      { id: "first-order", name: "First-order kinetics", formula: "k = (2.303/t)·log(a/(a − x))     t½ = 0.693/k", legend: ["a = initial amount", "x = amount reacted"], notes: "log 2 = 0.301, log 3 = 0.477, log 5 = 0.699 — no calculator." },
      { id: "zero-order", name: "Zero-order kinetics", formula: "[A] = [A]₀ − kt     t½ = [A]₀ / 2k", legend: [] },
      { id: "arrhenius", name: "Arrhenius", formula: "log(k₂/k₁) = (Eₐ / 2.303R)·(1/T₁ − 1/T₂)", legend: ["Eₐ = activation energy"] },
    ],
  },
  {
    chapter: "Ionic Equilibria",
    playbookSlug: "ionic-equilibria",
    formulas: [
      { id: "ph", name: "pH", formula: "pH = −log[H⁺]     pH + pOH = 14 (25 °C)", legend: [] },
      { id: "ostwald", name: "Weak electrolytes", formula: "α = √(K/c)     [H⁺] = √(Ka·c)", legend: ["α = degree of dissociation"] },
      { id: "buffer", name: "Buffer", formula: "pH = pKa + log([salt]/[acid])", legend: [] },
      { id: "ksp", name: "Solubility product", formula: "AB: s²     AB₂: 4s³     A₂B₃: 108s⁵", legend: ["s = molar solubility"] },
    ],
  },
  {
    chapter: "Chemical Thermodynamics and Energetics",
    playbookSlug: "chemical-thermodynamics",
    formulas: [
      { id: "first-law", name: "First law", formula: "ΔU = q + w     w = −P_ext·ΔV     1 dm³ bar = 100 J", legend: ["Work done ON the system is positive"] },
      { id: "dh-du", name: "ΔH and ΔU", formula: "ΔH = ΔU + Δn_g·R·T", legend: ["Δn_g = gas moles of products − reactants"] },
      { id: "gibbs", name: "Gibbs energy", formula: "ΔG = ΔH − TΔS     ΔG° = −2.303RT·log K     equilibrium T = ΔH/ΔS", legend: [] },
    ],
  },
  {
    chapter: "Electrochemistry",
    playbookSlug: "electrochemistry",
    formulas: [
      { id: "cell", name: "Cell potential and energy", formula: "E°cell = E°cathode − E°anode     ΔG° = −n·F·E°", legend: ["reduction potentials for both"] },
      { id: "nernst", name: "Nernst equation (25 °C)", formula: "E = E° − (0.0592/n)·log Q", legend: ["n = electrons transferred"] },
      { id: "conductivity", name: "Conductivity", formula: "κ = cell constant / R     Λm = 1000·κ / c     α = Λm / Λ°m", legend: ["Λm in S cm² mol⁻¹"] },
      { id: "faraday", name: "Faraday's law", formula: "m = (M / n·F)·I·t     1 F = 96500 C", legend: [] },
    ],
  },
  {
    chapter: "Structure of Atom",
    playbookSlug: "structure-of-atom",
    formulas: [
      { id: "bohr", name: "Bohr model", formula: "r = 0.529·n²/Z Å     E = −13.6·Z²/n² eV", legend: [] },
      { id: "radiation", name: "Radiation and matter waves", formula: "E = h·ν = h·c/λ     λ = h/(m·v)", legend: [] },
    ],
  },
  {
    chapter: "Some Basic Concepts of Chemistry",
    playbookSlug: "some-basic-concepts",
    formulas: [
      { id: "mole", name: "The mole", formula: "n = m/M = N/N_A = V/22.4 dm³ (gas at STP)", legend: ["N_A = 6.022 × 10²³"] },
      { id: "concentration", name: "Concentration", formula: "molarity = mol / L solution     molality = mol / kg solvent", legend: [] },
    ],
  },
  // Reactions
  {
    chapter: "Alcohols, Phenols and Ethers",
    playbookSlug: "alcohols-phenols-and-ethers",
    formulas: [
      { id: "lucas", name: "Lucas test", formula: "ZnCl₂/conc. HCl: 3° turbid at once · 2° in minutes · 1° not at room temperature", legend: [] },
      { id: "phenol-reactions", name: "Phenol named reactions", formula: "Reimer–Tiemann: phenol + CHCl₃/NaOH → salicylaldehyde     Kolbe: sodium phenoxide + CO₂ → salicylic acid", legend: [] },
      { id: "williamson", name: "Williamson ether synthesis", formula: "R–O⁻Na⁺ + R′–X → R–O–R′", legend: ["R′–X should be primary"] },
    ],
  },
  {
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    playbookSlug: "aldehydes-ketones-and-carboxylic-acids",
    formulas: [
      { id: "making", name: "Making aldehydes", formula: "Rosenmund: RCOCl + H₂ (Pd/BaSO₄) → RCHO     Stephen: RCN + SnCl₂/HCl → RCHO     Etard: toluene + CrO₂Cl₂ → benzaldehyde", legend: [] },
      { id: "reduce-co", name: "C=O to CH₂", formula: "Clemmensen: Zn–Hg / conc. HCl     Wolff–Kishner: NH₂NH₂ / KOH", legend: [] },
      { id: "tests", name: "Tests", formula: "Tollens' → silver mirror (aldehydes)     Fehling's → red Cu₂O     iodoform: CH₃CO– or CH₃CH(OH)–", legend: [] },
      { id: "cannizzaro", name: "Aldol and Cannizzaro", formula: "Aldol: needs α-H     Cannizzaro: no α-H (HCHO, C₆H₅CHO) → alcohol + acid salt", legend: [] },
    ],
  },
  {
    chapter: "Amines",
    playbookSlug: "amines",
    formulas: [
      { id: "basicity", name: "Basicity in water", formula: "(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ > C₆H₅NH₂", legend: [] },
      { id: "hofmann", name: "Hofmann bromamide", formula: "RCONH₂ + Br₂ + 4NaOH → RNH₂ (one carbon fewer)", legend: [] },
      { id: "diazonium", name: "Diazonium salts", formula: "C₆H₅NH₂ + NaNO₂/HCl (273 K) → C₆H₅N₂⁺Cl⁻ → phenol (H₂O, Δ) · C₆H₅Cl (CuCl, Sandmeyer)", legend: [] },
    ],
  },
  {
    chapter: "Halogen Derivatives of Alkanes",
    playbookSlug: "halogen-derivatives",
    formulas: [
      { id: "exchange", name: "Halide exchange", formula: "Finkelstein: RCl/RBr + NaI (acetone) → RI     Swarts: RCl + AgF → RF", legend: [] },
      { id: "coupling", name: "Coupling", formula: "Wurtz: 2RX + 2Na → R–R     Fittig: 2ArX + 2Na → Ar–Ar     Wurtz–Fittig: ArX + RX + 2Na → Ar–R", legend: [] },
      { id: "sn", name: "Substitution against elimination", formula: "aq. KOH → alcohol     alc. KOH → alkene (Saytzeff: more substituted)     3° SN1, 1° SN2", legend: [] },
    ],
  },
  {
    chapter: "Aromatic Compounds",
    playbookSlug: "aromatic-compounds",
    formulas: [
      { id: "huckel", name: "Aromaticity", formula: "planar · cyclic · conjugated · (4n + 2) π electrons", legend: [] },
      { id: "directors", name: "Directing groups", formula: "o/p: –OH –NH₂ –R –X     m: –NO₂ –CN –CHO –COOH", legend: [] },
    ],
  },
  {
    chapter: "Alkanes",
    playbookSlug: "alkanes",
    formulas: [
      { id: "decarboxylation", name: "Decarboxylation", formula: "RCOONa + NaOH (CaO, Δ) → R–H + Na₂CO₃", legend: ["one carbon fewer"] },
      { id: "grignard", name: "Grignard to alkane", formula: "RMgX + H₂O → R–H", legend: [] },
    ],
  },
  // Recall
  {
    chapter: "Biomolecules",
    playbookSlug: "biomolecules",
    formulas: [
      { id: "linkages", name: "Glycosidic linkages", formula: "sucrose α1–β2 (non-reducing) · maltose α1–4 · lactose β1–4 · cellulose β1–4 · starch α1–4 + α1–6", legend: [] },
      { id: "bases", name: "Nucleic acid bases", formula: "DNA: A G C T + deoxyribose     RNA: A G C U + ribose", legend: [] },
    ],
  },
  {
    chapter: "Coordination Compounds",
    playbookSlug: "coordination-compounds",
    formulas: [
      { id: "ean", name: "Effective atomic number", formula: "EAN = Z − oxidation state + 2 × coordination number", legend: [] },
      { id: "denticity", name: "Denticity", formula: "mono: NH₃ H₂O Cl⁻ CN⁻     bi: en ox²⁻     hexa: EDTA⁴⁻", legend: [] },
    ],
  },
  {
    chapter: "Introduction to Polymer Chemistry",
    playbookSlug: "introduction-to-polymer-chemistry",
    formulas: [
      { id: "monomers", name: "Monomers", formula: "nylon 6,6: hexamethylenediamine + adipic acid · nylon 6: caprolactam · Buna-S: butadiene + styrene · Buna-N: butadiene + acrylonitrile · terylene: ethylene glycol + terephthalic acid · bakelite: phenol + formaldehyde", legend: [] },
    ],
  },
  {
    chapter: "Transition and Inner Transition Elements",
    playbookSlug: "transition-and-inner-transition-elements",
    formulas: [
      { id: "spin-only", name: "Spin-only magnetic moment", formula: "μ = √(n(n + 2)) BM     n = 1→1.73 · 2→2.83 · 3→3.87 · 4→4.90 · 5→5.92", legend: ["n = unpaired electrons"] },
    ],
  },
  {
    chapter: "Chemical Bonding and Molecular Structure",
    playbookSlug: "chemical-bonding",
    formulas: [
      { id: "bond-order", name: "Bond order", formula: "bond order = (bonding − antibonding electrons) / 2     N₂ 3 · O₂ 2 · O₂⁻ 1.5 · O₂²⁻ 1", legend: [] },
      { id: "vsepr", name: "VSEPR", formula: "steric number 2 linear · 3 trigonal planar · 4 tetrahedral · 5 trigonal bipyramidal · 6 octahedral", legend: ["lone pairs bend the shape"] },
    ],
  },
  {
    chapter: "Surface Chemistry",
    playbookSlug: "surface-chemistry",
    formulas: [
      { id: "hardy-schulze", name: "Hardy–Schulze rule", formula: "negative sol: Al³⁺ > Ba²⁺ > Na⁺     positive sol: [Fe(CN)₆]⁴⁻ > SO₄²⁻ > Cl⁻", legend: ["the ion opposite in charge to the sol coagulates it"] },
    ],
  },
];

export const FORMULA_STATS = {
  formulas: FORMULA_GROUPS.reduce((s, g) => s + g.formulas.length, 0),
  chapters: FORMULA_GROUPS.length,
};
