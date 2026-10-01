/**
 * Deep-dives for the seven CALCULATE-strand /guide/jee-mains-chemistry playbooks: Some Basic Concepts
 * of Chemistry, Structure of Atom, Chemical Thermodynamics, Equilibrium, Chemical Kinetics,
 * Electrochemistry and Solutions. Sub-skills follow each chapter's /notes page order, and every fact
 * agrees with those notes. Prose carries no bank figures — the pages print counts and rates from the
 * generated matrix.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_A: Record<string, PlaybookDetail> = {
  "some-basic-concepts": {
    slug: "some-basic-concepts",
    trigger: "A mass, a volume of gas, a concentration or a titre to be turned into moles and carried through a formula, an equation or an n-factor.",
    story: [
      "Almost every question is arithmetic on the mole. Turn what the stem gives into moles, apply a ratio from a formula or a balanced equation, and turn the answer back into grams, litres or a concentration. The bank also files gas laws, oxidation numbers and titrations here, so the chapter is wider than its NCERT name.",
      "A large share are numeric-answer questions, so there is no option to check against and the integer you type has to be exact. The ideas are not hard. Marks go on units, on the molar volume, on water of crystallisation and on n-factors: kelvin in PV = nRT, kilograms of solvent for molality, two H⁺ per H₂SO₄, five electrons for permanganate in acid.",
      "The pages build on each other. Concentration needs the mole; titration needs both concentration and the electron counts from redox balancing. A slip early in the chain, such as an anhydrous molar mass for a hydrate, carries all the way to the answer.",
    ],
    subSkills: [
      { name: "Measurement and the mole", description: "n = m/M = N/Nₐ = V/Vₘ; count atoms against molecules; significant figures ignore the power of ten." },
      { name: "Percentage composition and formulae", description: "Masses to moles to the simplest whole-number ratio, then MF = (M ÷ EF mass) × EF; combustion data give C from CO₂ (12/44) and H from H₂O." },
      { name: "Stoichiometry and the limiting reagent", description: "Scale for purity first; the limiting reagent has the smallest n/ν, not the fewest moles; work the product from it." },
      { name: "Gas laws and gas volumes", description: "PV = nRT with T in kelvin and R matched to the units; volumes follow coefficients for gases only; pᵢ = xᵢP." },
      { name: "Molarity, dilution and mixing", description: "M = n/V(L); M₁V₁ = M₂V₂; M_mix = (M₁V₁ + M₂V₂)/(V₁ + V₂); molarity changes with temperature, molality does not." },
      { name: "Molality, mole fraction and ppm", description: "Fix a basis (1 L or 100 g of solution), use the density, and subtract the solute's mass to get the solvent's." },
      { name: "Oxidation number and redox balancing", description: "Sum of oxidation numbers = charge; a fractional value is an average; balance electrons lost = electrons gained, then check the charge." },
      { name: "Equivalents and titrations", description: "M₁n₁V₁ = M₂n₂V₂ at the end point; n is H⁺ or OH⁻ per unit for acid–base and electrons per unit for redox." },
    ],
    traps: [
      { name: "Molecules counted as atoms", description: "0.1 mol of O₂ holds 0.1Nₐ molecules but 0.2Nₐ atoms. Both values are usually among the options." },
      { name: "Fewest moles taken as limiting", description: "In N₂ + 3H₂, 0.5 mol N₂ and 1.2 mol H₂: H₂ runs out (0.4 < 0.5) though it has more moles. Divide by the coefficient first." },
      { name: "Dividing by the solution's mass", description: "Molality is per kilogram of solvent. Take the solute's mass out of the solution's mass before dividing." },
      { name: "The n-factor left at 1", description: "Ba(OH)₂ and H₂SO₄ carry two; FeC₂O₄ with permanganate carries three (Fe²⁺ gives one, oxalate two). The options sit a factor of two or three apart for this slip." },
      { name: "Celsius or the wrong R", description: "27 °C is 300 K. 0.082 goes with atm and litres, 0.083 with bar and litres, 8.314 with pascals and cubic metres." },
    ],
    relatedSlugs: ["solutions", "electrochemistry", "equilibrium"],
  },

  "structure-of-atom": {
    slug: "structure-of-atom",
    trigger: "A photon's energy or wavelength, a Bohr orbit or a spectral line, a de Broglie wavelength, an uncertainty, or a set of quantum numbers, nodes or orbital energies to count and order.",
    story: [
      "The chapter has two halves. The calculation half runs on a handful of relations: E = hν = hc/λ, the photoelectric equation, the Bohr radius and energy, the Rydberg equation and the de Broglie wavelength with the uncertainty principle. Each is one line once the units are right.",
      "Units decide those marks. Energies arrive in eV and leave in joules, masses must be in kg because h is in J s, and a wavenumber in cm⁻¹ needs c in cm s⁻¹. Numeric answers are often asked as a coefficient of a power of ten, so read which power the stem fixes.",
      "The counting half is quantum numbers, nodes and configurations. It is quick but exact: l stops at n − 1, radial nodes are n − l − 1, the (n + l) rule breaks a tie by the lower n, and hydrogen ignores the rule altogether.",
    ],
    subSkills: [
      { name: "Photons and the photoelectric effect", description: "E = hν = hc/λ = hcν̄; hν = hν₀ + ½mv²; intensity changes the number of electrons, frequency their energy." },
      { name: "Bohr orbits", description: "rₙ = 52.9 n²/Z pm, Eₙ = −13.6 Z²/n² eV; KE = −E and PE = 2E; only one-electron species qualify." },
      { name: "Hydrogen spectrum", description: "ν̄ = RZ²(1/n₁² − 1/n₂²); the series is named by the landing level; first line is the longest wavelength, the series limit the shortest." },
      { name: "de Broglie and uncertainty", description: "λ = h/mv = h/√(2mK); n whole waves fit a Bohr orbit, so λ grows as n; Δx·mΔv ≥ h/4π." },
      { name: "Quantum numbers", description: "Allowed values of n, l, mₗ, mₛ; a subshell holds 2(2l + 1) electrons; orbital angular momentum √(l(l + 1)) h/2π." },
      { name: "Orbitals, nodes and plots", description: "Radial nodes n − l − 1, angular nodes l; ψ² peaks at the nucleus for 1s while 4πr²ψ² peaks at a₀." },
      { name: "Orbital energies and configurations", description: "(n + l) rule for many-electron atoms, n alone for hydrogen-like ones; Cr and Cu take half-filled and filled d subshells." },
    ],
    traps: [
      { name: "Radius scaled as n", description: "The radius goes as n², so the sixth orbit of H is 36/16 times the fourth, not 6/4. The de Broglie wavelength in an orbit is the one that goes as n." },
      { name: "eV and J on different footings", description: "Convert with 1 eV = 1.602 × 10⁻¹⁹ J before subtracting a work function from hν. Mixing them gives an answer off by a huge power of ten." },
      { name: "Lines from one electron", description: "n(n − 1)/2 counts the lines a large sample can emit. A single electron cascading from n = 5 gives at most 4." },
      { name: "Aufbau applied to hydrogen", description: "In a one-electron atom 2s and 2p have the same energy and 4s lies above 3d. The (n + l) order holds only for many-electron atoms." },
      { name: "The wrong node formula", description: "Radial nodes are n − l − 1, not n − l. A 3s orbital has two radial nodes; a nodal plane is an angular node." },
    ],
    relatedSlugs: ["periodicity", "chemical-bonding", "d-and-f-block-elements"],
  },

  thermodynamics: {
    slug: "thermodynamics",
    trigger: "Heat, work, ΔU, ΔH, ΔS or ΔG for a change, a bomb calorimeter, enthalpies to combine, or a temperature at which a reaction turns spontaneous.",
    story: [
      "Most questions ask for a number, so the chapter rewards two habits above any formula. One sign convention: work done on the system is positive, so expansion work is −p_ext ΔV and ΔU = q + w. One unit check: ΔS and R come in joules, ΔH and ΔG in kilojoules.",
      "The early pages settle heat, work and internal energy: reversible against irreversible work, free expansion, q = nCΔT, and ΔH = ΔU + Δn_g RT from a bomb calorimeter. The middle pages find a reaction enthalpy by whatever route the data allow: formation enthalpies, combustion enthalpies, Hess's law or bond enthalpies.",
      "The last pages decide direction and extent. ΔG = ΔH − TΔS gives the sign cases and the crossover temperature T = ΔH/ΔS, and ΔG° = −2.303RT log K links the chapter to equilibrium. Distractors here are almost always the right size with the wrong sign, or a thousand times off.",
    ],
    subSkills: [
      { name: "State functions and the first law", description: "ΔU = q + w with work on the system positive; state against path functions; intensive against extensive." },
      { name: "Work of expansion", description: "w = −p_ext ΔV; w_rev = −2.303 nRT log(V₂/V₁); zero into a vacuum; net work in a cycle is the enclosed area." },
      { name: "Heat capacity and calorimetry", description: "q = nCΔT with Cp − Cv = R; a bomb calorimeter gives ΔU; ΔH = ΔU + Δn_g RT counting gases only." },
      { name: "Hess's law", description: "Formation: products minus reactants; combustion: reactants minus products; or add, reverse and scale the given equations." },
      { name: "Phase change, solution and neutralisation", description: "ΔsubH = ΔfusH + ΔvapH; heat of neutralisation follows the limiting reagent and warms the whole mixed volume." },
      { name: "Bond enthalpies", description: "ΔrH = Σ bonds broken − Σ bonds formed, valid only when every species is a gas." },
      { name: "Entropy, Gibbs energy and spontaneity", description: "ΔG = ΔH − TΔS; ΔH < 0 with ΔS > 0 is spontaneous at all temperatures; ΔG = 0 at T = ΔH/ΔS." },
      { name: "Gibbs energy and K", description: "ΔG° = −2.303RT log K; the slope of log K against 1/T is −ΔH°/2.303R." },
    ],
    traps: [
      { name: "Joules beside kilojoules", description: "With ΔH = 60 kJ and ΔS = 150 J K⁻¹, T = 60 000/150 = 400 K, not 0.4 K. The same slip makes a Δn_g RT correction a thousand times too big." },
      { name: "Signs reversed", description: "Broken minus formed, not formed minus broken; combustion data run reactants minus products. The sign-flipped value is always printed." },
      { name: "Liquid water counted as gas", description: "For C₂H₆(g) + 7/2 O₂(g) → 2CO₂(g) + 3H₂O(l), Δn_g = 2 − 4.5 = −2.5, not +0.5." },
      { name: "log for ln", description: "nRT log(V₂/V₁) without the 2.303 is 2.303 times too small, and the small value is always an option." },
      { name: "Bomb heat read as ΔH", description: "A bomb calorimeter runs at constant volume, so it measures ΔU. An enthalpy needs the Δn_g RT step, and the answer without it sits a few kJ away." },
    ],
    relatedSlugs: ["equilibrium", "electrochemistry", "chemical-kinetics"],
  },

  equilibrium: {
    slug: "equilibrium",
    trigger: "Kc, Kp or a degree of dissociation for a gas reaction, or a pH, a buffer, a salt solution or a solubility product in water.",
    story: [
      "Nearly every question writes one equilibrium expression and solves it for a concentration, a partial pressure, a degree of dissociation, a pH or a solubility. The gas-phase pages come first because the ionic pages reuse their tools: Ka, a buffer and Ksp are the same expression written for ions in water.",
      "Time goes on ICE tables and roots. The change row follows the coefficients, an inert gas counts only in the total pressure, and a solid adds nothing to K or to the pressure. On the ionic side, the formula is easy and the marks go on the concentration that enters it: two H⁺ from H₂SO₄, two lactate ions from calcium lactate, halved concentrations after mixing equal volumes.",
      "The recall that remains is short but exact: what pressure, an inert gas or a catalyst does to an equilibrium, and which indicator suits which titration. Numeric answers are often a pH or a power of ten in a solubility, so keep log 2 = 0.301 and log 3 = 0.477 at hand.",
    ],
    subSkills: [
      { name: "Writing and combining K", description: "Leave out solids and pure liquids; reverse gives 1/K, scaling by n gives Kⁿ, adding equations multiplies K; Kp = Kc(RT)^Δn." },
      { name: "ICE tables", description: "Check Q against K for the direction, follow the coefficients in the change row, and convert moles to partial pressures through the total." },
      { name: "Degree of dissociation and ΔG°", description: "For PCl₅ ⇌ PCl₃ + Cl₂, Kp = α²P/(1 − α²); raising P lowers α; ΔG° = −2.303RT log K." },
      { name: "Le Chatelier's principle", description: "Pressure and concentration move the mixture, not K; only temperature changes K; a catalyst moves nothing; an inert gas at constant volume moves nothing." },
      { name: "pH of acids and bases", description: "Strong acids and bases by net moles over total volume; weak acids by [H⁺] = √(KaC), pH = ½(pKa − log C)." },
      { name: "Buffers", description: "pH = pKa + log([salt]/[acid]); part-neutralising a weak acid with n_b of strong base leaves salt n_b and acid n_a − n_b." },
      { name: "Salt hydrolysis and indicators", description: "Salt of a weak acid and strong base: pH = 7 + ½pKa + ½log C; pick the indicator whose range covers the end-point pH." },
      { name: "Solubility product", description: "Ksp = xˣyʸs^(x+y) for AₓBᵧ; a common ion divides by its concentration to the power of its count; precipitate when Q > Ksp." },
    ],
    traps: [
      { name: "Scaling K as a factor", description: "Dividing every coefficient by 3 turns K into K^(1/3), not K/3. Adding equations multiplies their K; it never adds them." },
      { name: "The sign of Δn", description: "For CO + ½O₂ ⇌ CO₂, Δn = 1 − 3/2 = −½, so Kp/Kc = 1/√(RT). Reactants minus products gives √(RT), which is always offered." },
      { name: "Dropping the ion counts", description: "For Ag₂CrO₄, [Ag⁺] = 2s and Ksp = 4s³; for Zn(OH)₂ in NaOH the common ion is squared. Writing s² · s or dividing once gives the printed wrong answer." },
      { name: "Diluting an acid past neutral", description: "HCl diluted to 10⁻⁸ M does not have pH 8. Add water's own 10⁻⁷ M of H⁺; an acid stays acidic." },
      { name: "Henderson ratio inverted", description: "pH = pKa + log(salt/acid). For a basic buffer written for pH the ratio is base over salt; mixing the forms puts the pH on the wrong side of pKa." },
    ],
    relatedSlugs: ["thermodynamics", "electrochemistry", "solutions"],
  },

  "chemical-kinetics": {
    slug: "chemical-kinetics",
    trigger: "A rate, a rate law or an order, a time to some fraction decomposed, a half-life, a gas pressure over time, or a rate constant at two temperatures.",
    story: [
      "Two equations carry most of the chapter: the first-order law, k = (2.303/t) log([A]₀/[A]) with t½ = 0.693/k, and the Arrhenius equation, k = A e^(−Ea/RT). The rest is bookkeeping: dividing a rate by its coefficient, finding a reactant's pressure from a total pressure, or reading an order from a table, a half-life or a graph.",
      "Most questions want a number, usually to the nearest integer, and there is no calculator. Keep log 2 = 0.301, log 3 = 0.477 and ln 10 = 2.303 ready. Answers are built so that the logs come out clean: one-eighth left is three half-lives, and one-thousandth left takes three times as long as one-tenth left.",
      "Arrhenius questions are common, and marks slip there on the factor 2.303 between ln and log, on kelvin, and on joules against kilojoules for Ea. Mechanism and energy-profile questions are reading, not arithmetic: the slow step writes the rate law, and a catalyst lowers both barriers without changing ΔH.",
    ],
    subSkills: [
      { name: "Rate and stoichiometry", description: "Rate = −(1/a)d[A]/dt = (1/c)d[C]/dt; divide each species' rate by its coefficient before comparing." },
      { name: "Rate law and order", description: "Rate = k[A]ᵐ[B]ⁿ with exponents from experiment; pick runs where one concentration changes; the unit of k gives the order." },
      { name: "First order and half-life", description: "k = (2.303/t) log([A]₀/[A]); t½ = 0.693/k does not depend on [A]₀; time ratios are ratios of logs." },
      { name: "Gas decomposition and decay", description: "For A(g) → B(g) + C(g), p_A = 2pᵢ − Pₜ; radioactive decay and bacterial growth are first order." },
      { name: "Zero order and finding the order", description: "[A] = [A]₀ − kt, t½ = [A]₀/2k; t½ ∝ [A]₀^(1 − n) or the straight plot names the order." },
      { name: "Arrhenius equation", description: "log(k₂/k₁) = (Ea/2.303R)(1/T₁ − 1/T₂); slope of ln k against 1/T is −Ea/R; same A gives ln(k₂/k₁) = (Ea₁ − Ea₂)/RT." },
      { name: "Mechanisms and catalysts", description: "Rate law from the slow step with intermediates removed; ΔH = Ea,f − Ea,b; a catalyst changes neither ΔH, ΔG nor K." },
    ],
    traps: [
      { name: "Percent decomposed used as [A]", description: "Seventy parts decomposed out of a hundred leaves thirty. Use log(100/30), not log(100/70)." },
      { name: "Order read from the equation", description: "2N₂O₅ → 4NO₂ + O₂ is first order. Coefficients give exponents only for an elementary step." },
      { name: "Total pressure in the log", description: "The first-order law needs the reactant's own pressure. For A → B + C that is 2pᵢ − Pₜ, not Pₜ." },
      { name: "ln read as log", description: "The slope of log k against 1/T is −Ea/2.303R, not −Ea/R. Using the wrong one puts Ea out by 2.303; Ea in kJ with R in J puts it out by 1000." },
      { name: "Half-lives counted as if first order", description: "For zero order the second half-life is half the first, so one-quarter is reached at 1.5 t½, not 2 t½." },
    ],
    relatedSlugs: ["thermodynamics", "equilibrium", "some-basic-concepts"],
  },

  electrochemistry: {
    slug: "electrochemistry",
    trigger: "A table of reduction potentials, a cell emf at non-standard concentrations, ΔG° or K from E°, a conductivity or molar conductivity, or a current passed for a time.",
    story: [
      "The Nernst equation is the chapter's centre of gravity, so the sign of its log term must be automatic: E = E° − (0.059/n) log Q at 298 K, with Q as products over reactants and the powers from the same balanced equation that fixes n. Many questions run it backwards for a concentration, a ratio or a pH.",
      "Most numericals need only a handful of relations: E°cell = E°cathode − E°anode, ΔG° = −nFE° with F = 96500 C mol⁻¹, log K = nE°/0.059, Λm = 1000κ/c with Kohlrausch's law, and Faraday's m = MIt/nF. Marks slip on joules against kilojoules, on minutes left unconverted, on the factor 1000 in Λm, and on n.",
      "The rest is recall: the electrochemical series, what forms at each electrode in water, and the named batteries and fuel cells. Those questions are multiple choice and fast if the two tables are learnt.",
    ],
    subSkills: [
      { name: "Galvanic cells and the series", description: "E°cell = E°cathode − E°anode; a more negative E° is a stronger reducing agent; E° does not scale with the equation." },
      { name: "Nernst equation", description: "E = E° − (0.059/n) log Q; run it backwards for an unknown; the hydrogen electrode gives −0.059 pH plus a pressure term." },
      { name: "Gibbs energy, K and combined potentials", description: "ΔG° = −nFE°, log K = nE°/0.059; a new E° from two others weights each by its electrons: n₃E₃ = n₁E₁ ± n₂E₂." },
      { name: "Conductivity and molar conductivity", description: "κ = G*/R from the cell constant; Λm = 1000κ/c in S cm² mol⁻¹ with c in mol L⁻¹." },
      { name: "Dilution and Kohlrausch's law", description: "Λm = Λm° − A√c for strong electrolytes; Λm° = ν₊λ₊° + ν₋λ₋°; α = Λm/Λm° gives Ka and solubility." },
      { name: "Electrolysis and Faraday's laws", description: "m = MIt/nF with t in seconds; water is reduced before Na⁺; an active anode dissolves." },
      { name: "Batteries, fuel cells and corrosion", description: "Dry, mercury, lead storage and Ni–Cd cells; H₂–O₂ fuel cell; rusting as a small galvanic cell; zinc protects sacrificially, tin only as a barrier." },
    ],
    traps: [
      { name: "Q upside down or powers dropped", description: "Q is products over reactants, and in Zn + 2Ag⁺ the Ag⁺ is squared. Each slip moves the emf by a multiple of the correction." },
      { name: "Potentials subtracted directly", description: "E°(Fe³⁺/Fe) − E°(Fe²⁺/Fe) is not E°(Fe³⁺/Fe²⁺). Weight each potential by its electrons, then divide by the total electrons." },
      { name: "Four electrons for oxygen", description: "2H₂O → O₂ + 4H⁺ + 4e⁻: one mole of O₂ needs 4 F, not 2 F. Gold in AuCl₄⁻ is +3, so 3 electrons per atom." },
      { name: "Dropping the 1000", description: "With κ in S cm⁻¹ and c in mol L⁻¹, Λm = 1000κ/c. Without the 1000, or with SI units and the 1000 kept, every answer is a thousand off." },
      { name: "Joules reported as kilojoules", description: "nFE comes out in joules. A blank asking for kJ mol⁻¹ needs a division by 1000." },
    ],
    relatedSlugs: ["thermodynamics", "equilibrium", "some-basic-concepts"],
  },

  solutions: {
    slug: "solutions",
    trigger: "A gas dissolving under pressure, the vapour pressure of a mixture, or a solute changing a boiling point, freezing point or osmotic pressure.",
    story: [
      "Almost every question is a single formula with new numbers: Henry's law, Raoult's law, ΔT = iK·m or π = iCRT. The van 't Hoff factor multiplies each colligative effect for a salt, a weak acid or an associating solute, and finding i or α from a measured shift is where much of the chapter sits.",
      "What decides the marks is the concentration each formula wants: a mole fraction for vapour pressure, moles per kilogram of solvent for boiling and freezing points, and moles per litre of solution for osmotic pressure. A large share are numeric-answer questions, so a slip in grams against kilograms or in R against the pressure unit cannot be rescued by the options.",
      "The recall is narrow: what the Henry constant depends on, which mixtures deviate from Raoult's law and which azeotrope each gives, which way solvent flows in osmosis, and that only pure solvent freezes out.",
    ],
    subSkills: [
      { name: "Henry's law", description: "p = KH·x with the gas's partial pressure; a larger KH means a less soluble gas; 1 L of water is 55.56 mol." },
      { name: "Raoult's law for volatile liquids", description: "P = x_A p°_A + x_B p°_B; vapour y_A = x_A p°_A/P; positive deviation gives a minimum-boiling azeotrope, negative a maximum-boiling one." },
      { name: "Relative lowering of vapour pressure", description: "(p° − p)/p° = x₂ ≈ n₂/n₁; reachable from ΔTb because both depend on the same moles of solute." },
      { name: "Boiling and freezing points", description: "ΔTb = iKb·m and ΔTf = iKf·m with m per kg of solvent; M₂ = 1000Kw₂/(ΔT·W₁); water's Kf 1.86 exceeds its Kb 0.52." },
      { name: "Osmotic pressure", description: "π = iCRT with C per litre of solution and R matched to the pressure unit; isotonic solutions have equal iC." },
      { name: "Van 't Hoff factor", description: "i = 1 + (n − 1)α for dissociation, i = 1 − α/2 for a dimer; rank solutions by i × m." },
    ],
    traps: [
      { name: "Total pressure in Henry's law", description: "A gas that is one-fifth of the air at 5 atm has p = 1 atm. Putting 5 atm into p = KH·x gives a mole fraction five times too large." },
      { name: "Forgetting i, or dividing by n", description: "0.1 M NaCl is not isotonic with 0.1 M glucose. And α = (i − 1)/(n − 1): for MX₃ with i = 1.9, α = 0.3, not 0.9/4." },
      { name: "Molality against molarity", description: "ΔT uses kilograms of solvent; π uses litres of solution. Kilograms for molality, grams for moles of solvent; mixing them is a factor of 1000." },
      { name: "Mole fractions swapped", description: "With 1 mol A and 3 mol B, x_A = 0.25 multiplies p°_A. The relative lowering is the solute's mole fraction, p/p° the solvent's." },
      { name: "Azeotropes swapped", description: "Ethanol + water deviates positively and boils at a minimum; chloroform + acetone forms a new hydrogen bond, deviates negatively and boils at a maximum." },
    ],
    relatedSlugs: ["some-basic-concepts", "equilibrium"],
  },
};
