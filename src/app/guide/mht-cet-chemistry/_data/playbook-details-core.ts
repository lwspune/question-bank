/**
 * Deep dives for the 8 CALCULATE + 6 REACTIONS playbooks of
 * /guide/mht-cet-chemistry/playbooks/{slug}.
 *
 * Statistics: the bank measurement of 2026-09-28 (2,074 PUBLIC PYQs, 42
 * papers), after the label fix. Chapter figures match playbooks.ts; subtopic
 * figures are the per-subtopic q and %HARD from the same measurement.
 * exampleQuestionIds is deliberately empty — invented UUIDs ship dead links.
 */

import type { PlaybookDetail } from "./types";

export const CORE_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // CALCULATE

  solutions: {
    slug: "solutions",
    trigger: "A solute in a solvent and a change in vapour pressure, boiling point, freezing point or osmotic pressure — or a gas dissolving under pressure.",
    story: [
      "131 q at 3.17 a paper — the heaviest Chemistry chapter on recent papers — and 3% HARD. Four of its six pages are the same idea in four forms: a colligative property depends on how many particles are dissolved, not on what they are. Boiling-point elevation (28 q), vapour-pressure lowering (23 q), osmotic pressure (22 q) and freezing-point depression (16 q) all scale with the van't Hoff factor i.",
      "The other two pages are quick. Henry's law (27 q, with the solution types) is one multiplication, C = K_H·p. The van't Hoff page (15 q) is i from a measured freezing point, or the ratio question 'x K for urea, how much for CaCl₂' — 3x, because CaCl₂ gives three ions.",
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
      "130 q at 3.04 a paper, 5% HARD. The density page is the largest (42 q, 7%): every question is ρ = zM/(a³N_A) solved for a different unknown — density, molar mass, edge length, or z, which then names the cell (1 sc, 2 bcc, 4 fcc).",
      "The radius page (30 q, never HARD) links a and r: r = a/2 for simple cubic, a√3/4 for bcc, a√2/4 for fcc. Packing Efficiency and Voids (27 q, 15%) holds most of the HARD — 52%, 68% and 74%, and the counts of octahedral (n) and tetrahedral (2n) voids. Types of solids and defects (31 q) are recall.",
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
      "125 q at exactly 3.00 a paper, 2% HARD. 103 of the 125 questions sit on three pages that have never produced a HARD question: rate and stoichiometry (25 q), rate law and order (36 q), and first-order kinetics (42 q).",
      "The first-order page is the paper's favourite: k = (2.303/t) log(a/(a − x)) from a percent decomposed, and t½ = 0.693/k in either direction. With no calculator, the logs you need are the three to memorise — log 2 = 0.301, log 3 = 0.477, log 5 = 0.699. The HARD sits on the small Arrhenius page (8 q, 38%).",
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
      "122 q at 2.96 a paper, 2% HARD. Two pages are recall and belong on the first sweep: Theories of Acids and Bases (12 q) and Salt Hydrolysis (16 q) — which salt gives an acidic or basic solution comes from whether its parent acid and base are strong or weak.",
      "The rest is log arithmetic: pH = −log[H⁺] and pH + pOH = 14; α = √(K/c) for a weak electrolyte (Ostwald); pH = pKa + log([salt]/[acid]) for a buffer; and Ksp from solubility by salt type — the largest page at 29 questions.",
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
      "121 q at 2.96 a paper, 3% HARD. The first-law page is 50 questions on its own: ΔU = q + w with the chemist's sign convention (work done ON the system is positive), w = −P_ext·ΔV, and 1 dm³ bar = 100 J.",
      "ΔH = ΔU + Δn_g·RT (18 q) needs only the change in moles of GAS. Hess's law and bond enthalpies (21 q) add and subtract equations. Spontaneity (11 q) is the ΔG = ΔH − TΔS sign table: ΔH negative and ΔS positive is spontaneous at all temperatures.",
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
      "122 q at 2.88 a paper, 9% HARD — the only Chemistry chapter with real HARD load, and it sits on one page. Galvanic Cells, EMF, Nernst Equation and Thermodynamics is 48 questions, and ten of them are HARD: all Nernst — the potential of an electrode at 0.1 M or 0.01 M, or how far the emf moves when one ion's concentration changes tenfold.",
      "The other four pages are one line each. Faraday: m = ZIt = (M/nF)·It. Conductivity: κ = (1/R)·cell constant, and Λm = κ × 1000/c. Kohlrausch: Λ°m of a weak electrolyte from strong ones. Batteries (9 q) are recall.",
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
      "70 q at 1.42 a paper, 1% HARD — and it HALVED in 2025, from 2.00 a paper across 2023-24 to 1.00. Still set every year; give it fewer hours than 2023-24 papers suggest.",
      "Bohr's model (18 q, never HARD) is scaling: rₙ = 0.529n²/Z Å, Eₙ = −13.6Z²/n² eV. Radiation is E = hν = hc/λ. The quantum-number rules decide which set is allowed, and the particles page counts protons, neutrons and electrons.",
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
      "51 q at 1.33 a paper, 2% HARD — and rising, from 1.15 a paper in 2023-24 to 1.54 in 2025. The mole page is 31 questions: mass ↔ moles ↔ particles ↔ volume, with 22.4 dm³ per mole of gas at STP.",
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
      "126 q at 3.04 a paper, 5% HARD — the heaviest organic chapter. More than half is naming and classifying: IUPAC and common nomenclature is 34 questions and classification 21 — primary, secondary, tertiary, allylic, benzylic, vinylic, and the named phenols (catechol, resorcinol, quinol).",
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
      "109 q at 2.54 a paper, 3% HARD. This is the named-reaction chapter, and the prep is a list learned in both directions. Preparation (30 q): Rosenmund (acid chloride + H₂/Pd–BaSO₄ → aldehyde), Stephen (nitrile → aldehyde), Etard (toluene + CrO₂Cl₂ → benzaldehyde), Gattermann–Koch.",
      "Reduction and tests (20 q): Clemmensen (Zn–Hg/HCl) and Wolff–Kishner (NH₂NH₂/KOH) take C=O to CH₂; Tollens' and Fehling's detect aldehydes; the iodoform test needs CH₃CO–. Cannizzaro needs an aldehyde with no α-hydrogen.",
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
      "81 q at 1.96 a paper, 4% HARD. The reactions-and-basicity page (27 q, 11%) holds the HARD: basicity order, the Hinsberg test (1°, 2° and 3° amines behave differently with benzenesulphonyl chloride), the carbylamine test (1° amines only, foul-smelling isocyanide), and Hofmann elimination.",
      "Preparation (15 q) is Hofmann bromamide (amide → amine with one carbon fewer) and reduction of nitro compounds and nitriles. Diazonium salts (12 q) come from aniline + NaNO₂/HCl at 273 K, then become phenol, a halobenzene (Sandmeyer) or an azo dye.",
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
    relatedSlugs: ["aldehydes-ketones-and-carboxylic-acids", "aromatic-compounds"],
  },

  "halogen-derivatives": {
    slug: "halogen-derivatives",
    trigger: "An alkyl or aryl halide to name, prepare, substitute or eliminate — or a named polyhalogen compound.",
    story: [
      "79 q at 1.83 a paper, 3% HARD. Classification and naming (27 q) is the largest page. Preparation (15 q) is named exchange and coupling: Finkelstein (NaI/acetone → iodide), Swarts (AgF → fluoride), Wurtz (2RX + Na → R–R) and Fittig for aryl halides.",
      "Substitution and elimination (26 q): SN2 for primary halides (inversion, one step), SN1 for tertiary (carbocation, racemisation), and Saytzeff's rule — the more substituted alkene. Polyhalogen compounds (11 q) are a table: Freon-12, DDT and BHC, chloroform to phosgene, the war gases.",
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
    relatedSlugs: ["alcohols-phenols-and-ethers", "alkanes"],
  },

  "aromatic-compounds": {
    slug: "aromatic-compounds",
    trigger: "A benzene ring — aromatic or not, substituted where, or a side chain oxidised.",
    story: [
      "35 q at 0.96 a paper, 3% HARD. Aromaticity is Hückel's rule: a planar, cyclic, conjugated ring with 4n + 2 π electrons. Electrophilic substitution (12 q) is where a second group goes: –OH, –NH₂, –CH₃ and halogens direct ortho/para; –NO₂, –COOH, –CHO direct meta.",
      "Side-chain reactions (15 q) are mostly oxidation — KMnO₄ turns any alkyl chain with a benzylic hydrogen into –COOH — and Friedel–Crafts reactions with AlCl₃.",
    ],
    subSkills: [
      { name: "Hückel's rule", description: "Planar, cyclic, conjugated, 4n + 2 π electrons (benzene 6, n = 1)." },
      { name: "Directing groups", description: "Activators (–OH, –NH₂, –R) and halogens: ortho/para. Deactivators (–NO₂, –CN, –COOH): meta." },
      { name: "Side-chain oxidation", description: "Alkyl benzene + KMnO₄ → benzoic acid, whatever the chain length." },
    ],
    traps: [
      { name: "Halogens as deactivators", description: "Halogens slow the reaction yet direct ortho/para — the one group where the two rules part." },
      { name: "Chain length after oxidation", description: "Ethylbenzene and propylbenzene both oxidise to benzoic acid; the extra carbons leave." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["alkanes", "amines"],
  },

  alkanes: {
    slug: "alkanes",
    trigger: "An alkane made by coupling, decarboxylation or from a Grignard reagent — or chain isomers to count.",
    story: [
      "35 q at 0.92 a paper and never a HARD question. Preparation (17 q) is three named routes: Wurtz (2RX + 2Na → R–R, the chain doubles), decarboxylation with soda-lime (RCOONa → RH, one carbon fewer), and Grignard reagents with water (RMgX + H₂O → RH).",
      "Naming and isomers (14 q) count chain isomers — pentane has three — and read names off structures. Free-radical halogenation (4 q) is the substitution chain.",
    ],
    subSkills: [
      { name: "Wurtz", description: "2RX + 2Na → R–R: an odd-carbon alkane cannot come from a single halide." },
      { name: "Decarboxylation", description: "RCOONa + NaOH/CaO → RH + Na₂CO₃ — one carbon fewer." },
      { name: "Chain isomers", description: "Butane 2, pentane 3, hexane 5." },
    ],
    traps: [
      { name: "Counting carbons after decarboxylation", description: "Sodium propanoate gives ethane, not propane." },
      { name: "Wurtz and odd chains", description: "Propane cannot be made cleanly by Wurtz from one halide: mixing two halides gives a mixture of three alkanes." },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["halogen-derivatives", "aromatic-compounds"],
  },
};
