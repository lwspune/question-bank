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
      "88 q at 2.17 a paper, 2% HARD. Amino acids and proteins (27 q, never HARD): essential amino acids, the peptide bond, and protein structure levels. Carbohydrates (21 q) and glycosidic linkages (19 q): which sugars reduce Fehling's and Tollens', and which link joins which units.",
      "Nucleic acids (16 q) are the bases — adenine, guanine, cytosine in both; thymine in DNA, uracil in RNA — and the sugar, deoxyribose or ribose.",
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
      "88 q at 2.12 a paper, 2% HARD, and most of it is counting rather than memory. Ligands and denticity (33 q) is the largest page: en is bidentate, EDTA hexadentate, and ambidentate ligands (NO₂⁻, SCN⁻) bind through either atom.",
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
      "85 q at 2.04 a paper, and one HARD question in all of them. Two tables do nearly everything: monomers (29 q) and uses (25 q).",
      "Classification (22 q) sorts the same polymers three ways — addition against condensation, homopolymer against copolymer, thermoplastic against thermosetting — so one polymer learned properly answers three kinds of question. Polymerisation methods (9 q) are free-radical, ionic and condensation mechanisms by name.",
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
    relatedSlugs: ["biomolecules", "alkanes"],
  },

  "transition-and-inner-transition-elements": {
    slug: "transition-and-inner-transition-elements",
    trigger: "A d- or f-block element's configuration, oxidation states, colour, magnetic moment, or a lanthanoid trend.",
    story: [
      "76 q at 1.75 a paper, 4% HARD. Configurations carry the chapter — and chromium (3d⁵4s¹) and copper (3d¹⁰4s¹) break the filling pattern. Colour comes from unpaired d electrons, so Sc³⁺, Ti⁴⁺ and Zn²⁺ are colourless.",
      "The spin-only formula μ = √(n(n + 2)) BM turns unpaired electrons into a moment (Mn²⁺, five unpaired, 5.92 BM). Lanthanoids (27 q): the lanthanoid contraction and +3 as the common oxidation state.",
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
      "64 q at 1.29 a paper, 3% HARD. VSEPR (20 q) is counting electron pairs: bond pairs plus lone pairs around the central atom give the geometry, lone pairs bend it — NH₃ pyramidal, H₂O bent, XeF₄ square planar.",
      "Molecular orbital theory (13 q) is bond order = (bonding − antibonding)/2: O₂ has 2 and two unpaired electrons, so it is paramagnetic. Dipole moment (11 q) is zero for symmetric molecules — CO₂, BF₃, CH₄, CCl₄.",
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
      "48 q at 1.29 a paper, 2% HARD — and rising, from 1.00 a paper in 2023-24 to 1.38 in 2025. Group 16 (24 q, never HARD): hydride trends (thermal stability falls and acidity rises from H₂O to H₂Te), allotropes of sulphur, ozone, and oleum.",
      "Group 17 (21 q): oxidising power (F₂ strongest), the oxoacids and their oxidation states, and interhalogens. Group 18 (3 q): xenon fluorides and their shapes.",
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
    relatedSlugs: ["elements-of-group-1-and-2", "redox-reactions"],
  },

  "redox-reactions": {
    slug: "redox-reactions",
    trigger: "An oxidation number to find, a species oxidised or reduced, or a redox equation to balance.",
    story: [
      "44 q at 1.08 a paper, 2% HARD. Oxidation-number calculation is 26 of them: the sum over a species equals its charge, with O as −2 and H as +1 — except in peroxides (O −1) and metal hydrides (H −1).",
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
      "39 q at 0.92 a paper, and never a HARD question. Colloids (21 q): lyophilic against lyophobic, the dispersed phase and medium, and the Hardy–Schulze rule — the ion with the charge OPPOSITE to the sol's coagulates it, more strongly the higher its charge.",
      "Adsorption (12 q): physisorption (van der Waals, reversible, falls with temperature) against chemisorption (chemical bonds, specific), and the Freundlich isotherm.",
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
    relatedSlugs: ["solutions", "elements-of-group-1-and-2"],
  },

  "elements-of-group-1-and-2": {
    slug: "elements-of-group-1-and-2",
    trigger: "An alkali or alkaline-earth metal's trend, an anomaly of lithium or beryllium, or an industrial process by name.",
    story: [
      "37 q at 0.92 a paper, and never a HARD question. Trends down the groups (22 q): size and reactivity rise, ionisation enthalpy falls. Lithium and beryllium are the exceptions — small, highly polarising ions — which explains most of what is asked about them.",
      "Industrial processes and minerals (15 q): the Solvay process for sodium carbonate, the chlor-alkali cell, and the ores of the group-2 metals.",
    ],
    subSkills: [
      { name: "Trends", description: "Down a group: atomic size up, ionisation enthalpy down, reactivity up." },
      { name: "Anomalies", description: "Li resembles Mg, Be resembles Al (diagonal relationship); both form covalent compounds." },
      { name: "Processes", description: "Solvay (Na₂CO₃), Castner–Kellner (NaOH), and the uses of plaster of Paris and quicklime." },
    ],
    traps: [
      { name: "Solubility trends reverse", description: "Group-2 sulphates grow LESS soluble down the group, hydroxides MORE soluble." },
      { name: "Lithium's carbonate", description: "Li₂CO₃ decomposes on heating, unlike the other alkali-metal carbonates — a diagonal-relationship effect." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["surface-chemistry", "elements-of-group-16-17-and-18"],
  },
};
