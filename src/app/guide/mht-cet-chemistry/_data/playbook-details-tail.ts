/**
 * Deep dives for the 9 RECALL playbooks of /guide/mht-cet-chemistry/playbooks.
 * Same sources and rules as playbook-details-core.ts.
 */

import type { PlaybookDetail } from "./types";

export const TAIL_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  biomolecules: {
    slug: "biomolecules",
    trigger: "A sugar, its linkage or whether it reduces Fehling's; an amino acid or peptide; a DNA or RNA base; a vitamin or enzyme.",
    story: [
      "150 q at 2.31 a paper, 1% HARD. Amino acids and proteins (46 q, never HARD): essential amino acids, the peptide bond, and protein structure levels. Carbohydrates (35 q) and glycosidic linkages (28 q): which sugars reduce Fehling's and Tollens', and which link joins which units.",
      "Nucleic acids (25 q) are the bases — adenine, guanine, cytosine in both; thymine in DNA, uracil in RNA — and the sugar, deoxyribose or ribose.",
    ],
    subSkills: [
      { name: "Linkages", description: "Sucrose α1–β2 (non-reducing), maltose α1–4, lactose β1–4, cellulose β1–4, starch α1–4 with α1–6 branches." },
      { name: "Reducing sugars", description: "A free hemiacetal group reduces Fehling's; sucrose has none." },
      { name: "Nucleic acids", description: "DNA: A, G, C, T and deoxyribose; RNA: A, G, C, U and ribose." },
    ],
    traps: [
      { name: "Sucrose as a reducing sugar", description: "Sucrose's link joins both anomeric carbons, so it does NOT reduce Fehling's — the planted answer in 'which is non-reducing'." },
      { name: "Thymine in RNA", description: "Uracil replaces thymine in RNA." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["introduction-to-polymer-chemistry", "aldehydes-ketones-and-carboxylic-acids"],
  },

  "coordination-compounds": {
    slug: "coordination-compounds",
    trigger: "A complex ion — its ligands, oxidation state, coordination number, name, isomers, hybridisation or magnetism.",
    story: [
      "140 q at 2.03 a paper, 2% HARD, and most of it is counting rather than memory. Bonding theories, EAN and magnetism (48 q) is the largest page, then ligands and denticity (39 q): en is bidentate, EDTA hexadentate, and ambidentate ligands (NO₂⁻, SCN⁻) bind through either atom.",
      "Oxidation state is the metal's charge after subtracting the ligands'. EAN = atomic number − oxidation state + 2 × coordination number. Magnetism counts unpaired electrons after the ligand has (or has not) forced pairing.",
    ],
    subSkills: [
      { name: "Denticity", description: "Mono: NH₃, Cl⁻, H₂O. Bi: en, ox²⁻. Hexa: EDTA⁴⁻." },
      { name: "Oxidation state and CN", description: "Charge of the complex minus the ligands' charges; CN = number of donor atoms." },
      { name: "EAN", description: "Z − oxidation state + 2 × CN; 36 for many stable complexes (the krypton number)." },
      { name: "Magnetism", description: "Strong-field ligands (CN⁻, CO) pair electrons; weak-field (F⁻, H₂O) leave them unpaired." },
    ],
    traps: [
      { name: "Counting ligands instead of donor atoms", description: "[Co(en)₃]³⁺ has three ligands but coordination number 6 — each en binds twice." },
      { name: "The ligand's charge", description: "Oxidation state of Fe in [Fe(CN)₆]⁴⁻ is +2: −4 = x + 6(−1)." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["transition-and-inner-transition-elements", "chemical-bonding"],
  },

  "introduction-to-polymer-chemistry": {
    slug: "introduction-to-polymer-chemistry",
    trigger: "A polymer's monomers, its class, how it is made, or what it is used for.",
    story: [
      "139 q at 2.08 a paper, and one HARD question in all of them. Two tables do nearly everything: monomers (49 q) and uses (37 q).",
      "Classification (39 q) sorts the same polymers three ways — addition against condensation, homopolymer against copolymer, thermoplastic against thermosetting — so one polymer learned properly answers three kinds of question. Polymerisation methods (14 q) are free-radical, ionic and condensation mechanisms by name.",
    ],
    subSkills: [
      { name: "Monomers", description: "Nylon 6,6: hexamethylenediamine + adipic acid. Nylon 6: caprolactam. Buna-S: butadiene + styrene. Buna-N: butadiene + acrylonitrile. Terylene: ethylene glycol + terephthalic acid. Bakelite: phenol + formaldehyde." },
      { name: "Classes", description: "Condensation polymers lose a small molecule (nylon, terylene, bakelite); addition polymers do not (polythene, PVC, Teflon)." },
      { name: "Uses", description: "PVC pipes, Teflon non-stick, PAN a wool substitute, glyptal paints, nylon 6 tyre cords." },
    ],
    traps: [
      { name: "Nylon 6 against nylon 6,6", description: "Nylon 6 comes from one monomer (caprolactam); nylon 6,6 from two. The numbers count carbons in each monomer." },
      { name: "Buna-S against Buna-N", description: "S is styrene, N is acrylonitrile; both are copolymers with butadiene." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["biomolecules", "green-chemistry-and-nanochemistry"],
  },

  "transition-and-inner-transition-elements": {
    slug: "transition-and-inner-transition-elements",
    trigger: "A d- or f-block element's configuration, oxidation states, colour, magnetic moment, or a lanthanoid trend.",
    story: [
      "126 q at 1.87 a paper, 2% HARD. Configurations carry the chapter — and chromium (3d⁵4s¹) and copper (3d¹⁰4s¹) break the filling pattern. Colour comes from unpaired d electrons, so Sc³⁺, Ti⁴⁺ and Zn²⁺ are colourless.",
      "The spin-only formula μ = √(n(n + 2)) BM turns unpaired electrons into a moment (Mn²⁺, five unpaired, 5.92 BM). Lanthanoids and actinoids (41 q, the largest page): the lanthanoid contraction and +3 as the common oxidation state.",
    ],
    subSkills: [
      { name: "Configurations", description: "3d filling with the Cr and Cu exceptions; ions lose 4s electrons first." },
      { name: "Magnetism", description: "μ = √(n(n + 2)) BM: n = 1 → 1.73, 2 → 2.83, 3 → 3.87, 4 → 4.90, 5 → 5.92." },
      { name: "Colour", description: "Coloured if there are unpaired d electrons (d¹-d⁹); d⁰ and d¹⁰ ions are colourless." },
      { name: "Lanthanoids", description: "Contraction across the series; +3 common, Ce⁴⁺ and Eu²⁺ as exceptions." },
    ],
    traps: [
      { name: "Removing 3d before 4s", description: "Fe²⁺ is 3d⁶, not 3d⁴4s²: the 4s electrons leave first." },
      { name: "Zn²⁺ as coloured", description: "Zn²⁺ is d¹⁰, so colourless and diamagnetic." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["coordination-compounds", "elements-of-group-16-17-and-18"],
  },

  "chemical-bonding": {
    slug: "chemical-bonding",
    trigger: "A molecule's shape, hybridisation, bond order, dipole moment or bond type.",
    story: [
      "96 q at 1.28 a paper, 2% HARD. VSEPR (30 q) is counting electron pairs: bond pairs plus lone pairs around the central atom give the geometry, lone pairs bend it — NH₃ pyramidal, H₂O bent, XeF₄ square planar.",
      "Molecular orbital theory (18 q) is bond order = (bonding − antibonding)/2: O₂ has 2 and two unpaired electrons, so it is paramagnetic. Dipole moment (18 q) is zero for symmetric molecules — CO₂, BF₃, CH₄, CCl₄.",
    ],
    subSkills: [
      { name: "VSEPR", description: "Steric number = bond pairs + lone pairs: 2 linear, 3 trigonal, 4 tetrahedral, 5 trigonal bipyramidal, 6 octahedral." },
      { name: "Bond order", description: "(Nb − Na)/2; O₂ 2, N₂ 3, O₂⁻ 1.5, O₂²⁻ 1." },
      { name: "Dipole moment", description: "Zero when the bond dipoles cancel by symmetry." },
    ],
    traps: [
      { name: "Shape from bond pairs only", description: "H₂O has four electron pairs (tetrahedral arrangement) but a bent shape. The geometry of atoms, not of pairs, is asked." },
      { name: "O₂ as diamagnetic", description: "Lewis structures pair every electron; MO theory leaves two unpaired in O₂, which is why it is paramagnetic." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["coordination-compounds", "structure-of-atom"],
  },

  "elements-of-group-16-17-and-18": {
    slug: "elements-of-group-16-17-and-18",
    trigger: "Oxygen, sulphur or ozone; a halogen, interhalogen or oxoacid; a noble gas compound — or a trend down a group.",
    story: [
      "80 q at 1.28 a paper, 4% HARD, and up from 1.00 a paper in 2023-24 to 1.38 in 2025 and 1.23 in 2026. Group 16 (37 q, never HARD): hydride trends (thermal stability falls and acidity rises from H₂O to H₂Te), allotropes of sulphur, ozone, and oleum.",
      "Group 17 (36 q, all three HARD): oxidising power (F₂ strongest), the oxoacids and their oxidation states, and interhalogens. Group 18 (7 q): xenon fluorides and their shapes.",
    ],
    subSkills: [
      { name: "Hydride trends", description: "H₂O → H₂Te: stability falls, acidity rises, boiling point lowest at H₂S (water is high from hydrogen bonding)." },
      { name: "Oxoacids", description: "Cl in HClO +1, HClO₂ +3, HClO₃ +5, HClO₄ +7; acid strength rises with oxidation state." },
      { name: "Xenon compounds", description: "XeF₂ linear, XeF₄ square planar, XeF₆ distorted octahedral." },
    ],
    traps: [
      { name: "Water's boiling point", description: "The boiling-point trend reverses at water because of hydrogen bonding; H₂S, not H₂O, is lowest." },
      { name: "Oleum's formula", description: "Oleum is H₂S₂O₇ (pyrosulphuric acid), not H₂SO₄." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["redox-reactions", "transition-and-inner-transition-elements"],
  },

  "redox-reactions": {
    slug: "redox-reactions",
    trigger: "An oxidation number to find, a species oxidised or reduced, or a redox equation to balance.",
    story: [
      "73 q at 1.15 a paper, 1% HARD. Oxidation-number calculation is 44 of them: the sum over a species equals its charge, with O as −2 and H as +1 — except in peroxides (O −1) and metal hydrides (H −1).",
      "The rest reuses it: whichever element's oxidation number rises is oxidised, and it is the reducing agent. A reaction in which no oxidation number changes — CrO₄²⁻ ⇌ Cr₂O₇²⁻ — is not redox.",
    ],
    subSkills: [
      { name: "The rules", description: "Elements 0; O −2 (peroxide −1, OF₂ +2); H +1 (metal hydride −1); the sum equals the charge." },
      { name: "Structural exceptions", description: "Fractional averages (S in S₄O₆²⁻ averages +2.5, though the S atoms differ)." },
      { name: "Oxidised against reducing agent", description: "The species oxidised IS the reducing agent." },
    ],
    traps: [
      { name: "Peroxide oxygen", description: "O in H₂O₂ and Na₂O₂ is −1. Using −2 gives an impossible oxidation state for the other element." },
      { name: "Chromate and dichromate", description: "Cr stays +6 in CrO₄²⁻ ⇌ Cr₂O₇²⁻, so it is not a redox reaction." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["electrochemistry", "elements-of-group-16-17-and-18"],
  },

  "surface-chemistry": {
    slug: "surface-chemistry",
    trigger: "Adsorption and its types, a colloid and its class, coagulation by an electrolyte, or a catalyst.",
    story: [
      "68 q at 1.08 a paper, and never a HARD question. Colloids (41 q): lyophilic against lyophobic, the dispersed phase and medium, and the Hardy–Schulze rule — the ion with the charge OPPOSITE to the sol's coagulates it, more strongly the higher its charge.",
      "Adsorption (18 q): physisorption (van der Waals, reversible, falls with temperature) against chemisorption (chemical bonds, specific), and the Freundlich isotherm.",
    ],
    subSkills: [
      { name: "Hardy–Schulze", description: "For a negative sol (As₂S₃): Al³⁺ > Ba²⁺ > Na⁺. For a positive sol (Fe(OH)₃): [Fe(CN)₆]⁴⁻ > SO₄²⁻ > Cl⁻." },
      { name: "Adsorption types", description: "Physisorption: weak, multilayer, reversible. Chemisorption: strong, monolayer, specific." },
      { name: "Colloid classes", description: "Aerosol, gel, emulsion, foam by phase and medium." },
    ],
    traps: [
      { name: "The ion's sign", description: "The coagulating ion carries the charge opposite to the sol. A large anion does nothing to a negative sol." },
      { name: "Physisorption and heat", description: "Physisorption decreases as temperature rises; chemisorption first increases." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["solutions", "green-chemistry-and-nanochemistry"],
  },

  "green-chemistry-and-nanochemistry": {
    slug: "green-chemistry-and-nanochemistry",
    trigger: "A principle of green chemistry, a percentage atom economy, a green solvent, or a nanostructure's dimension, synthesis or characterisation.",
    story: [
      "63 q at 1.10 a paper, and never a HARD question. It has risen two years running: 0.67 a paper across 2023-24, 1.00 in 2025 and 1.15 in 2026, which is what made it a playbook. Green chemistry (36 q): the principles, percentage atom economy, and safer solvents such as water and supercritical CO₂.",
      "Nanochemistry (27 q): nanostructures classified by dimension (the textbook lists quantum dots and nano-rings as zero-dimensional), the sol–gel route, and the instruments that characterise a nanomaterial.",
    ],
    subSkills: [
      { name: "Atom economy", description: "% atom economy = mass of the desired product ÷ total mass of all reactants × 100. Every reactant counts, including the one that ends in the by-product." },
      { name: "The principles", description: "Prevent waste rather than treat it, maximise atom economy, use safer solvents, save energy, prefer renewable feedstocks and catalysts, design products to degrade." },
      { name: "Nanostructures", description: "Classified by how many dimensions lie outside the nanoscale: quantum dots and nano-rings zero, nanotubes and nanowires one, thin films two." },
      { name: "Sol–gel synthesis", description: "Precursor to sol to gel, then drying, then the final dehydration: the order of steps is what is asked." },
    ],
    traps: [
      { name: "Leaving a reactant out of the sum", description: "For ethanol from chloroethane and KOH the denominator is 64.5 + 56 = 120.5, so the atom economy is 46 ÷ 120.5 = 38.2%. Dropping the KOH gives 71.3%, far too high." },
      { name: "Nano-rings as one-dimensional", description: "A ring looks like a bent wire, but the textbook lists nano-rings with quantum dots as zero-dimensional." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["surface-chemistry", "introduction-to-polymer-chemistry"],
  },
};
