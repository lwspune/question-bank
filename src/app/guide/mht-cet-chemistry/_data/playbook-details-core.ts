/**
 * Deep dives for the 8 CALCULATE + 5 REACTIONS playbooks of
 * /guide/mht-cet-chemistry/playbooks/{slug}.
 *
 * Statistics: the bank measurement of 2026-10-13 (3,371 PUBLIC PYQs, 68
 * papers, 2021-2026). Chapter figures match playbooks.ts; subtopic figures are
 * the per-subtopic q and %HARD from the same measurement.
 * exampleQuestionIds is deliberately empty — invented UUIDs ship dead links.
 */

import type { PlaybookDetail } from "./types";

export const CORE_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // CALCULATE

  solutions: {
    slug: "solutions",
    trigger: "A solute in a solvent and a change in vapour pressure, boiling point, freezing point or osmotic pressure — or a gas dissolving under pressure.",
    story: [
      "208 q at 2.97 a paper, the largest Chemistry chapter over all 68 papers, and 3% HARD. Four of its six pages are the same idea in four forms: a colligative property depends on how many particles are dissolved, not on what they are. Osmotic pressure (44 q), boiling-point elevation (43 q), vapour-pressure lowering (33 q) and freezing-point depression (22 q) all scale with the van't Hoff factor i.",
      "The other two pages are quick. Henry's law (41 q, with the solution types) is one multiplication, C = K_H·p. The van't Hoff page (25 q, 12% HARD, the chapter's hardest) is i from a measured freezing point, or the ratio question 'x K for urea, how much for CaCl₂': 3x, because CaCl₂ gives three ions.",
    ],
    subSkills: [
      { name: "Colligative formulas", description: "ΔT_b = iK_b·m, ΔT_f = iK_f·m, π = iCRT, and (p° − p)/p° = x₂ (dilute: W₂M₁/(M₂W₁))." },
      { name: "The van't Hoff factor", description: "i = particles per formula unit for a strong electrolyte (NaCl 2, CaCl₂ 3, AlCl₃ 4); i = observed ÷ normal colligative value otherwise." },
      { name: "Henry's law", description: "Solubility C = K_H·p. Check whether K_H is given per bar or its reciprocal." },
      { name: "Solution types", description: "Name the solute and solvent phases: iodine in air is solid in gas; camphor in N₂ likewise." },
    ],
    traps: [
      { name: "Forgetting i for an electrolyte", description: "0.1 m NaCl lowers the freezing point about twice as much as 0.1 m glucose. Leaving i = 1 gives the glucose answer, and it is printed." },
      { name: "Molality against molarity", description: "ΔT uses molality (per kg of solvent); π uses molarity (per litre of solution). Mixing them shifts the answer by the solution's density." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["some-basic-concepts", "ionic-equilibria"],
  },

  "solid-state": {
    slug: "solid-state",
    trigger: "A unit cell — simple cubic, bcc or fcc — with a density, an edge length, a radius, or a count of atoms, voids or defects.",
    story: [
      "205 q at 2.92 a paper, 6% HARD. The density page is the largest (61 q, 10%): every question is ρ = zM/(a³N_A) solved for a different unknown (density, molar mass, edge length, or z, which then names the cell: 1 sc, 2 bcc, 4 fcc).",
      "The radius page (42 q, never HARD) links a and r: r = a/2 for simple cubic, a√3/4 for bcc, a√2/4 for fcc. Packing Efficiency and Voids (49 q, 12%) is 52%, 68% and 74%, and the counts of octahedral (n) and tetrahedral (2n) voids; it and the density page hold all twelve HARD questions. Types of solids and defects (53 q) are recall.",
    ],
    subSkills: [
      { name: "The density equation", description: "ρ = zM/(a³N_A). Keep a in cm (1 pm = 10⁻¹⁰ cm) so a³ comes out in cm³." },
      { name: "Radius from edge", description: "sc: r = a/2. bcc: r = √3a/4. fcc: r = √2a/4 = a/(2√2)." },
      { name: "Packing and voids", description: "sc 52.4%, bcc 68%, fcc/hcp 74%. For n atoms in close packing: n octahedral, 2n tetrahedral voids." },
      { name: "Defects and magnetism", description: "Schottky lowers density, Frenkel does not; ferromagnetic, antiferromagnetic and ferrimagnetic by domain alignment." },
    ],
    traps: [
      { name: "Picometres left unconverted", description: "An edge in pm must become cm before cubing: 400 pm = 4 × 10⁻⁸ cm. A slip of one power of ten in a moves the density a thousandfold, and the options are built around that slip." },
      { name: "Using z for the wrong cell", description: "bcc has 2 atoms per cell and fcc 4. Swapping them halves or doubles the answer." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["some-basic-concepts", "chemical-bonding"],
  },

  "chemical-kinetics": {
    slug: "chemical-kinetics",
    trigger: "A rate, a rate law, an order, a percent decomposed in a time, a half-life, or a temperature change and an activation energy.",
    story: [
      "205 q at 3.05 a paper, 3% HARD. 167 of the 205 questions sit on three pages that have never produced a HARD question: rate and stoichiometry (31 q), rate law and order (59 q), and first-order kinetics (77 q).",
      "The first-order page is the paper's favourite: k = (2.303/t) log(a/(a − x)) from a percent decomposed, and t½ = 0.693/k in either direction. With no calculator, the logs you need are the three to memorise: log 2 = 0.301, log 3 = 0.477, log 5 = 0.699. All six HARD questions sit on the small Arrhenius page (18 q, 33%).",
    ],
    subSkills: [
      { name: "Rate and stoichiometry", description: "For aA → bB: rate = −(1/a)d[A]/dt = (1/b)d[B]/dt. Divide by the coefficient." },
      { name: "Order from a rate law or data", description: "Order is experimental: the sum of the exponents. Doubling a concentration of order n multiplies the rate by 2ⁿ." },
      { name: "First and zero order", description: "First: k = (2.303/t) log(a/(a − x)), t½ = 0.693/k (independent of a). Zero: t½ = a/(2k)." },
      { name: "Arrhenius", description: "log(k₂/k₁) = (Eₐ/2.303R)(1/T₁ − 1/T₂)." },
    ],
    traps: [
      { name: "Missing the coefficient in a rate", description: "In N₂ + 3H₂ → 2NH₃, NH₃ forms at twice the rate N₂ is used. The 1:1 answer is always an option." },
      { name: "Order equals molecularity", description: "Molecularity is for an elementary step and is a whole number; order is measured and can be fractional or zero. H₂ + Br₂ has order 3/2." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["chemical-thermodynamics", "ionic-equilibria"],
  },

  "ionic-equilibria": {
    slug: "ionic-equilibria",
    trigger: "A pH, a Ka or Kb, a degree of dissociation, a buffer, a salt in water, or a solubility and its Ksp.",
    story: [
      "201 q at 3.03 a paper, 3% HARD. Two pages are recall and belong on the first sweep: Theories of Acids and Bases (23 q) and Salt Hydrolysis (25 q). Which salt gives an acidic or basic solution comes from whether its parent acid and base are strong or weak.",
      "The rest is log arithmetic: pH = −log[H⁺] and pH + pOH = 14 (42 q, and four of the chapter's seven HARD); α = √(K/c) for a weak electrolyte (Ostwald); pH = pKa + log([salt]/[acid]) for a buffer; and Ksp from solubility by salt type, the largest page at 46 questions.",
    ],
    subSkills: [
      { name: "pH and pOH", description: "pH = −log[H⁺]; at 25 °C, pH + pOH = 14. For a strong acid, [H⁺] = concentration × basicity." },
      { name: "Weak electrolytes", description: "α = √(K/c), [H⁺] = √(Ka·c)." },
      { name: "Buffers", description: "pH = pKa + log([salt]/[acid]); pOH = pKb + log([salt]/[base])." },
      { name: "Solubility product", description: "AB: Ksp = s². AB₂: 4s³. A₂B₃: 108s⁵. A common ion lowers solubility." },
    ],
    traps: [
      { name: "Ksp by the wrong salt type", description: "For CaF₂, Ksp = s·(2s)² = 4s³, not s². Each salt type has its own power." },
      { name: "The basicity of the acid", description: "0.01 M H₂SO₄ gives [H⁺] = 0.02 M, so pH = 1.7, not 2." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["solutions", "electrochemistry"],
  },

  "chemical-thermodynamics": {
    slug: "chemical-thermodynamics",
    trigger: "Heat and work for a system, ΔU against ΔH, a bond enthalpy or Hess's-law sum, or whether a reaction is spontaneous.",
    story: [
      "199 q at 3.00 a paper, 3% HARD. The first-law page is 76 questions on its own: ΔU = q + w with the chemist's sign convention (work done ON the system is positive), w = −P_ext·ΔV, and 1 dm³ bar = 100 J.",
      "ΔH = ΔU + Δn_g·RT (23 q) needs only the change in moles of GAS. Hess's law and bond enthalpies (42 q) add and subtract equations. Spontaneity (23 q) is the ΔG = ΔH − TΔS sign table: ΔH negative and ΔS positive is spontaneous at all temperatures.",
    ],
    subSkills: [
      { name: "First law and signs", description: "ΔU = q + w. Heat absorbed and work done on the system are positive. Expansion: w = −P_ext·ΔV." },
      { name: "Units", description: "1 dm³ bar = 100 J; 1 L atm = 101.3 J." },
      { name: "ΔH and ΔU", description: "ΔH = ΔU + Δn_g·RT, with Δn_g counted from gas moles only." },
      { name: "Spontaneity", description: "ΔG = ΔH − TΔS; at equilibrium T = ΔH/ΔS; ΔG° = −2.303RT log K." },
    ],
    traps: [
      { name: "The physics sign convention", description: "Chemistry counts work done ON the system as positive (ΔU = q + w). Physics' ΔU = q − w with work done BY the gas gives the same physics but a flipped w — mixing the two flips the answer." },
      { name: "Counting liquids in Δn_g", description: "Only gas moles count. In H₂(g) + ½O₂(g) → H₂O(l), Δn_g = −1.5, not −0.5." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["electrochemistry", "chemical-kinetics"],
  },

  electrochemistry: {
    slug: "electrochemistry",
    trigger: "A cell and its emf, electrode potentials at non-standard concentration, a conductivity or cell constant, or a charge passed and a mass deposited.",
    story: [
      "197 q at 2.90 a paper, 7% HARD: the Chemistry chapter with the most HARD questions (13), and ten of them sit on one page. Galvanic Cells, EMF, Nernst Equation and Thermodynamics is 73 questions, and its ten HARD are all Nernst: the potential of an electrode at 0.1 M or 0.01 M, or how far the emf moves when one ion's concentration changes tenfold.",
      "The other four pages are one line each. Faraday: m = ZIt = (M/nF)·It. Conductivity: κ = (1/R)·cell constant, and Λm = κ × 1000/c. Kohlrausch: Λ°m of a weak electrolyte from strong ones. Batteries (16 q) are recall.",
    ],
    subSkills: [
      { name: "E°cell", description: "E°cell = E°cathode − E°anode (reduction potentials). ΔG° = −nFE°." },
      { name: "Nernst", description: "E = E° − (0.0592/n) log Q at 25 °C. For M(n+)|M: E = E° + (0.0592/n) log[M(n+)]." },
      { name: "Conductivity", description: "κ = G* / R; Λm = 1000κ/c (S cm² mol⁻¹); α = Λm/Λ°m." },
      { name: "Faraday", description: "1 F = 96500 C per mole of electrons; mass = (M/nF) × charge." },
    ],
    traps: [
      { name: "Dropping n in the Nernst term", description: "For Zn²⁺, n = 2, so a tenfold change moves E by 0.0296 V, not 0.0592 V. The n = 1 answer is printed." },
      { name: "Reversing the subtraction", description: "E°cell = E°(cathode) − E°(anode), using reduction potentials for both. Taking the anode minus the cathode gives the right size with the wrong sign." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["chemical-thermodynamics", "ionic-equilibria"],
  },

  "structure-of-atom": {
    slug: "structure-of-atom",
    trigger: "A Bohr orbit, an electron's wavelength or energy, a spectral line, quantum numbers, or isotopes and isoelectronic species.",
    story: [
      "99 q at 1.08 a paper, 1% HARD. It HALVED in 2025 and stayed there: 2.00 a paper across 2023-24, 1.00 in 2025, 1.12 in 2026. Still set in almost every paper; give it half the hours 2023-24 papers suggest.",
      "Bohr's model (22 q, never HARD) is scaling: rₙ = 0.529n²/Z Å, Eₙ = −13.6Z²/n² eV. Radiation is E = hν = hc/λ. The quantum-number rules decide which set is allowed, and the particles page counts protons, neutrons and electrons.",
    ],
    subSkills: [
      { name: "Bohr scaling", description: "r = 0.529 n²/Z Å, E = −13.6 Z²/n² eV, v ∝ Z/n." },
      { name: "Radiation", description: "E = hν = hc/λ; de Broglie λ = h/mv." },
      { name: "Quantum numbers", description: "l runs 0 to n − 1, m from −l to +l; a subshell holds 2(2l + 1) electrons." },
    ],
    traps: [
      { name: "An impossible quantum-number set", description: "l must be less than n: (n = 2, l = 2) cannot exist. Such a set is planted among allowed ones." },
      { name: "Isoelectronic means same electrons", description: "Na⁺, Mg²⁺ and F⁻ each have 10 electrons — isoelectronic, though their protons differ." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["chemical-bonding", "some-basic-concepts"],
  },

  "some-basic-concepts": {
    slug: "some-basic-concepts",
    trigger: "Moles from a mass, a volume at STP or a number of particles; a limiting reagent; a percentage composition or a molarity.",
    story: [
      "80 q at 1.26 a paper, 1% HARD. It ran 1.15 a paper in 2023-24, jumped to 1.54 in 2025 and settled at 1.12 in 2026. The mole page is 50 questions: mass ↔ moles ↔ particles ↔ volume, with 22.4 dm³ per mole of gas at STP.",
      "The same arithmetic runs through every Calculate chapter, so these hours pay twice. The one HARD question type is H₂O₂ volume strength converted to percent by mass.",
    ],
    subSkills: [
      { name: "Mole conversions", description: "n = m/M = N/N_A = V/22.4 dm³ (gas at STP)." },
      { name: "Stoichiometry", description: "Convert to moles, scale by the balanced equation, convert back. Find the limiting reagent first." },
      { name: "Concentration", description: "Molarity = moles per litre of solution; molality = moles per kg of solvent." },
    ],
    traps: [
      { name: "Mass ratio as mole ratio", description: "An equation's coefficients are MOLE ratios. 2H₂ + O₂ → 2H₂O means 4 g of hydrogen with 32 g of oxygen, not 2:1 by mass." },
      { name: "Molecules against atoms", description: "One mole of O₂ has N_A molecules and 2N_A atoms. The question's wording decides which." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["solutions", "solid-state"],
  },

  // REACTIONS

  "alcohols-phenols-and-ethers": {
    slug: "alcohols-phenols-and-ethers",
    trigger: "An –OH on a chain or a ring, an ether, a name to give or read, or a test that tells primary, secondary and tertiary apart.",
    story: [
      "198 q at 2.92 a paper, 5% HARD: the largest organic chapter. Half of it is naming, classifying and physical properties: IUPAC and common nomenclature is 42 questions, classification 32 (primary, secondary, tertiary, allylic, benzylic, vinylic, and the named phenols: catechol, resorcinol, quinol) and physical properties 26.",
      "The reaction pages add Lucas' test (tertiary turns cloudy at once), Reimer–Tiemann (phenol → salicylaldehyde), Kolbe (phenol → salicylic acid), Williamson's ether synthesis, and phenol's acidity, raised by electron-withdrawing groups.",
    ],
    subSkills: [
      { name: "Classifying alcohols", description: "By the carbon carrying –OH: bonded to one, two or three carbons. Allylic and benzylic are next to C=C or a ring." },
      { name: "Naming", description: "Longest chain with the –OH, lowest locant to it; ethers named as alkoxyalkanes." },
      { name: "Named reactions", description: "Lucas, Reimer–Tiemann, Kolbe, Williamson, and dehydration to an alkene." },
      { name: "Acidity", description: "Phenol > water > alcohol; nitro groups raise phenol's acidity, methyl groups lower it." },
    ],
    traps: [
      { name: "Williamson with a tertiary halide", description: "A tertiary halide eliminates rather than substitutes; the ether needs the alkoxide from the tertiary side and a primary halide." },
      { name: "The named phenols", description: "Catechol is 1,2-, resorcinol 1,3-, quinol 1,4-benzenediol. They are asked in both directions." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["aldehydes-ketones-and-carboxylic-acids", "halogen-derivatives"],
  },

  "aldehydes-ketones-and-carboxylic-acids": {
    slug: "aldehydes-ketones-and-carboxylic-acids",
    trigger: "A C=O group made, removed, tested or reacted — or a named reaction whose product is asked.",
    story: [
      "192 q at 2.92 a paper, 2% HARD, and up from 2.38 a paper in 2025 to 3.19 in 2026. This is the named-reaction chapter, and the prep is a list learned in both directions. Preparation (45 q): Rosenmund (acid chloride + H₂/Pd–BaSO₄ → aldehyde), Stephen (nitrile → aldehyde), Etard (toluene + CrO₂Cl₂ → benzaldehyde), Gattermann–Koch.",
      "Reduction and tests (37 q): Clemmensen (Zn–Hg/HCl) and Wolff–Kishner (NH₂NH₂/KOH) take C=O to CH₂; Tollens' and Fehling's detect aldehydes; the iodoform test needs CH₃CO–. Cannizzaro needs an aldehyde with no α-hydrogen.",
    ],
    subSkills: [
      { name: "Making carbonyls", description: "Rosenmund, Stephen, Etard, Gattermann–Koch, ozonolysis, and oxidation of alcohols." },
      { name: "Removing C=O", description: "Clemmensen (acid) and Wolff–Kishner (base) → CH₂." },
      { name: "Tests", description: "Tollens' (silver mirror), Fehling's (red Cu₂O), iodoform (CH₃CO– or CH₃CH(OH)–)." },
      { name: "Addition and condensation", description: "HCN, NaHSO₃, and aldol condensation (needs α-H); Cannizzaro (no α-H)." },
    ],
    traps: [
      { name: "Aldol against Cannizzaro", description: "Aldol needs an α-hydrogen; Cannizzaro works only without one. HCHO and benzaldehyde give Cannizzaro, ethanal gives aldol." },
      { name: "Ketones and Tollens'", description: "Ketones do not reduce Tollens' or Fehling's reagent — the test that tells an aldehyde from a ketone." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["alcohols-phenols-and-ethers", "amines"],
  },

  amines: {
    slug: "amines",
    trigger: "An amine to classify, rank by basicity, prepare or test — or a diazonium salt and what it turns into.",
    story: [
      "134 q at 2.05 a paper, 4% HARD. The reactions-and-basicity page (42 q, 12%) holds five of the six HARD: basicity order, the Hinsberg test (1°, 2° and 3° amines behave differently with benzenesulphonyl chloride), the carbylamine test (1° amines only, foul-smelling isocyanide), and Hofmann elimination.",
      "Preparation (32 q) is Hofmann bromamide (amide → amine with one carbon fewer) and reduction of nitro compounds and nitriles. Diazonium salts (22 q) come from aniline + NaNO₂/HCl at 273 K, then become phenol, a halobenzene (Sandmeyer) or an azo dye.",
    ],
    subSkills: [
      { name: "Basicity", description: "In water, methylamines: 2° > 1° > 3° > NH₃. Aniline is much weaker (lone pair in the ring)." },
      { name: "Tests", description: "Hinsberg separates 1°, 2°, 3°; carbylamine detects 1° only." },
      { name: "Preparation", description: "Hofmann bromamide loses one carbon; Gabriel makes 1° amines only." },
      { name: "Diazonium salts", description: "ArN₂⁺Cl⁻ at 0-5 °C; + H₂O → phenol; + CuCl → chlorobenzene; + phenol → azo dye." },
    ],
    traps: [
      { name: "Gas-phase basicity", description: "In the gas phase 3° is most basic; in water, solvation makes 2° the strongest. MHT-CET asks the aqueous order." },
      { name: "Counting carbons in Hofmann bromamide", description: "The amine has one carbon fewer than the amide. Keeping the carbon count gives the wrong homologue." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["aldehydes-ketones-and-carboxylic-acids", "basic-principles-of-organic-chemistry"],
  },

  "halogen-derivatives": {
    slug: "halogen-derivatives",
    trigger: "An alkyl or aryl halide to name, prepare, substitute or eliminate — or a named polyhalogen compound.",
    story: [
      "137 q at 2.18 a paper, 1% HARD. SN1 against SN2 (36 q) and classification and naming (34 q) are the largest pages. Preparation (24 q) is named exchange and coupling: Finkelstein (NaI/acetone → iodide), Swarts (AgF → fluoride), Wurtz (2RX + Na → R–R) and Fittig for aryl halides.",
      "Substitution and elimination (60 q): SN2 for primary halides (inversion, one step), SN1 for tertiary (carbocation, racemisation), and Saytzeff's rule: the more substituted alkene. Polyhalogen compounds (19 q) are a table: Freon-12, DDT and BHC, chloroform to phosgene, the war gases.",
    ],
    subSkills: [
      { name: "Exchange and coupling", description: "Finkelstein, Swarts, Wurtz, Fittig, Wurtz–Fittig — know which halide and which product." },
      { name: "SN1 against SN2", description: "3° → SN1 (carbocation, racemic); 1° → SN2 (inversion)." },
      { name: "Elimination", description: "alc. KOH gives the alkene; Saytzeff: the more substituted alkene is major." },
      { name: "Polyhalogen compounds", description: "Freon-12 CCl₂F₂; DDT and its replacement BHC; CHCl₃ oxidises to phosgene COCl₂." },
    ],
    traps: [
      { name: "Aqueous against alcoholic KOH", description: "Aqueous KOH substitutes (alcohol); alcoholic KOH eliminates (alkene). The two products are both options." },
      { name: "Finkelstein against Swarts", description: "Finkelstein makes iodides (NaI); Swarts makes fluorides (AgF, Hg₂F₂)." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["alcohols-phenols-and-ethers", "basic-principles-of-organic-chemistry"],
  },

  "basic-principles-of-organic-chemistry": {
    slug: "basic-principles-of-organic-chemistry",
    trigger: "A functional group to name or rank, an isomer to count or classify, a chiral carbon, or which effect or carbocation is the more stable.",
    story: [
      "72 q at 1.15 a paper, 10% HARD: the hardest chapter of any size, and a playbook since 2026, when it rose from 0.85 a paper (2025) to 1.31. Its three pages are close to equal: naming, functional groups and homologous series (25 q, 8% HARD), electronic effects and intermediates (24 q, 8%), and isomerism and stereochemistry (23 q, 13%).",
      "Isomerism holds the most HARD: counting chiral carbons, telling metamers from functional isomers, and what enantiomers share. The electronic-effects page is the ranking every reaction chapter reuses: alkyl groups (+I) and resonance stabilise a carbocation, so 3° > 2° > 1° > methyl, and benzylic and allylic cations are steadier still.",
    ],
    subSkills: [
      { name: "Functional-group priority", description: "Carboxylic acid > anhydride > ester > acid halide > amide > nitrile > aldehyde > ketone > alcohol > amine. The highest-priority group takes the suffix." },
      { name: "Homologous series", description: "Successive members differ by CH₂, 14 u in molar mass, with the same functional group and a gradation in physical properties." },
      { name: "Electronic effects", description: "+I: alkyl groups. −I: –NO₂, –CN, halogens. +R: –OH, –OR, –NH₂ donate by resonance even though O and N are electronegative." },
      { name: "Isomerism", description: "Chain, position, functional group and metamerism (different alkyl groups either side of the same group); a chiral carbon carries four different groups." },
    ],
    traps: [
      { name: "Ester against acid halide", description: "In the priority order the ester ranks ABOVE the acid halide. Reversing them names the compound from the wrong group." },
      { name: "Metamers against functional isomers", description: "Ethanol and dimethyl ether differ in functional group: they are functional isomers, not metamers. Metamers keep the group and move the alkyl groups around it." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["alcohols-phenols-and-ethers", "halogen-derivatives"],
  },
};
