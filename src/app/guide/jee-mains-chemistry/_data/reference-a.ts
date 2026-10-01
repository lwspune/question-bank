/**
 * Content for /guide/jee-mains-chemistry/reference, part A: the Calculate and Reactions strands.
 *
 * One flat list per chapter of what the paper tests. The physical chapters carry their formulas;
 * the organic reaction chapters carry reagent → product entries and named reactions. Every entry is
 * drawn from the chapter's /notes/jee-mains-chemistry pages, in their order.
 *
 * PLAIN TEXT + UNICODE, NOT LaTeX: the shared FormulaSheet prints `formula` raw. No counts, shares
 * or years in `notes` (tests/jee-mains-chemistry-guide-data.test.ts).
 */

import type { ReferenceGroup } from "./types";

export const REFERENCE_GROUPS_A: ReferenceGroup[] = [
  // Calculate
  {
    chapter: "Some Basic Concepts of Chemistry",
    playbookSlug: "some-basic-concepts",
    formulas: [
      { id: "mole", name: "The mole", formula: "n = m/M = N/N_A = V/V_m", legend: ["N_A = 6.022 × 10²³ mol⁻¹", "V_m = 22.4 L at 273 K and 1 atm; 22.7 L at 273.15 K and 1 bar"], notes: "If the stem names no molar volume, try both: the intended one gives round numbers." },
      { id: "counting", name: "Counting atoms and electrons", formula: "atoms = n × N_A × atoms per formula unit     electrons = n × N_A × electrons per molecule", legend: ["H₂O has 3 atoms; C₁₂H₂₂O₁₁ has 45", "CH₄ has 10 electrons; N₂ has 14"], notes: "Molecules are not atoms: multiply by the atoms in one formula unit." },
      { id: "composition", name: "Percentage and empirical formula", formula: "%X = (atoms of X × A_X / M) × 100     MF = (M / EF mass) × EF", legend: ["Combustion: C is 12/44 of the CO₂ mass; H is 2/18 of the H₂O mass", "Clear fractions: 1.5 → ×2, 1.33 → ×3, 1.25 → ×4"], notes: "Do not round 1.5 away; double every ratio instead." },
      { id: "combustion-volumes", name: "Formula from combustion volumes", formula: "CxHy + (x + y/4) O₂ → x CO₂ + (y/2) H₂O", legend: ["x = V(CO₂) / V(hydrocarbon)", "Cooling removes the water; KOH absorbs CO₂; what remains is unused O₂"] },
      { id: "stoichiometry", name: "Limiting reagent and yield", formula: "limiting reagent = smallest n / coefficient     % yield = actual / theoretical × 100", legend: ["For aA → bB: n_B = n_A × b/a", "Purity: use only the pure mass"], notes: "The test is moles over coefficient, not the fewest moles." },
      { id: "gases", name: "Gas laws", formula: "PV = nRT     M = dRT/P     p_i = x_i·P", legend: ["R = 0.0821 L atm K⁻¹ mol⁻¹ = 0.083 L bar K⁻¹ mol⁻¹ = 8.314 J K⁻¹ mol⁻¹", "T in kelvin; x_i = mole fraction"], notes: "Mass fraction is not mole fraction: turn each gas into moles first." },
      { id: "molarity", name: "Molarity, dilution and mixing", formula: "M = n / V(L)     M₁V₁ = M₂V₂     M_mix = (M₁V₁ + M₂V₂) / (V₁ + V₂)", legend: ["Millimoles = M × V(mL)", "CuSO₄·5H₂O is 249.5 g mol⁻¹: keep the water of crystallisation"], notes: "Water added is not the final volume." },
      { id: "concentration", name: "Molality, mole fraction and ppm", formula: "m = n_solute / kg solvent     M = 10 × (% w/w) × d / M_B     ppm = (mass solute / mass solution) × 10⁶", legend: ["d = density in g mL⁻¹; M_B = molar mass of solute", "In water: x_solute = m / (m + 55.5)"], notes: "Molarity and normality change with temperature; molality, mole fraction and ppm do not." },
      { id: "half-reactions", name: "Redox half-reactions", formula: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O     Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O", legend: ["Neutral or basic: MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻", "Oxidation numbers in a species add up to its charge"], notes: "The medium sets the product of permanganate." },
      { id: "titration", name: "Titrations and the n-factor", formula: "M₁n₁V₁ = M₂n₂V₂", legend: ["Redox n: MnO₄⁻ 5 in acid, 3 in neutral or basic · Cr₂O₇²⁻ 6 · Fe²⁺ 1 · C₂O₄²⁻ 2 · FeC₂O₄ 3", "Acid-base n: H₂SO₄ 2 · H₃PO₄ 3 when fully neutralised · Ca(OH)₂ 2"], notes: "Count every oxidisable part: in FeC₂O₄ both iron and oxalate lose electrons." },
    ],
  },
  {
    chapter: "Structure of Atom",
    playbookSlug: "structure-of-atom",
    formulas: [
      { id: "photon", name: "Photon energy", formula: "E = hν = hc/λ = hc·ν̄     c = νλ", legend: ["h = 6.626 × 10⁻³⁴ J s", "E (eV) = 1240 / λ (nm)"], notes: "With ν̄ in cm⁻¹, use c = 3 × 10¹⁰ cm s⁻¹." },
      { id: "photoelectric", name: "Photoelectric effect", formula: "hν = hν₀ + ½mv²     λ₀ = hc / W₀", legend: ["W₀ = hν₀ = work function", "1 eV = 1.602 × 10⁻¹⁹ J"], notes: "Intensity changes the current, not the kinetic energy." },
      { id: "bohr", name: "Bohr model", formula: "r = 52.9·n²/Z pm     E = −13.6·Z²/n² eV     v = 2.18 × 10⁶·Z/n m s⁻¹", legend: ["KE = −E; PE = 2E", "Ionisation energy from n = 1: 13.6·Z² eV"], notes: "The first excited state is n = 2." },
      { id: "rydberg", name: "Rydberg equation", formula: "ν̄ = 1/λ = R·Z²·(1/n₁² − 1/n₂²)", legend: ["R = 1.097 × 10⁷ m⁻¹ = 109677 cm⁻¹; n₁ < n₂", "ΔE = 13.6·Z²·(1/n₁² − 1/n₂²) eV"], notes: "First line: lowest energy, longest wavelength. Series limit: n₂ = ∞." },
      { id: "spectral-lines", name: "Spectral series and line counts", formula: "lines = Δn(Δn + 1)/2     Lyman n₁ = 1 (UV) · Balmer 2 (visible) · Paschen 3 · Brackett 4 · Pfund 5 (IR)", legend: ["Δn = n₂ − n₁, for many atoms", "One electron: at most n₂ − n₁ lines"] },
      { id: "de-broglie", name: "de Broglie wavelength", formula: "λ = h/mv = h/√(2mK) = h/√(2mqV)", legend: ["K = kinetic energy; q, V = charge and accelerating potential", "In the n-th Bohr orbit: 2πr = nλ, so λ = 2πn·a₀/Z"], notes: "Work in kg and J." },
      { id: "uncertainty", name: "Uncertainty principle", formula: "Δx·Δp ≥ h/4π     Δv = h / (4πm·Δx)", legend: ["Δp = m·Δv", "If Δx = Δp, then Δp = √(h/4π)"], notes: "Δx = Δp is not Δx = Δv." },
      { id: "quantum-numbers", name: "Quantum numbers", formula: "l = 0 … n − 1     m_l = −l … +l     shell: n² orbitals, 2n² electrons     subshell: 2(2l + 1) electrons", legend: ["Orbital angular momentum L = √(l(l + 1))·h/2π", "Pauli: no two electrons share all four quantum numbers"], notes: "Angular momentum uses l, not n; it is zero for every s orbital." },
      { id: "nodes", name: "Nodes", formula: "radial nodes = n − l − 1     angular nodes = l     total = n − 1", legend: ["Peaks in 4πr²ψ² = n − l", "A boundary surface encloses about 90 per cent of the probability"] },
      { id: "filling", name: "Orbital energy and filling", formula: "lower (n + l) fills first; a tie goes to the lower n     Cr [Ar]3d⁵4s¹ · Cu [Ar]3d¹⁰4s¹", legend: ["One-electron species: energy depends on n only (2s = 2p)", "Hund: spread out with parallel spins before pairing"], notes: "Cations lose the highest-n electrons first: 4s before 3d." },
    ],
  },
  {
    chapter: "Chemical Thermodynamics",
    playbookSlug: "thermodynamics",
    formulas: [
      { id: "first-law", name: "First law", formula: "ΔU = q + w", legend: ["q > 0 when heat is absorbed; w > 0 when work is done ON the system", "Adiabatic: q = 0, so ΔU = w"], notes: "Over a cycle ΔU = 0, so q = −w." },
      { id: "work-constant-p", name: "Work against a constant pressure", formula: "w = −p_ext·(V₂ − V₁)", legend: ["Free expansion: p_ext = 0, so w = 0", "1 L bar = 100 J · 1 L atm = 101.3 J"], notes: "Expansion work is negative; compression work is positive." },
      { id: "work-reversible", name: "Reversible isothermal work", formula: "w = −2.303·nRT·log(V₂/V₁) = −2.303·nRT·log(p₁/p₂)", legend: ["Isothermal ideal gas: ΔU = 0, ΔH = 0, q = −w", "Reversible adiabatic: w = ΔU = nC_v·ΔT"], notes: "The log form needs the 2.303; the ln form does not." },
      { id: "heat-capacity", name: "Heat capacity and calorimetry", formula: "q_V = nC_v·ΔT = ΔU     q_p = nC_p·ΔT = ΔH     C_p − C_v = R", legend: ["Monatomic ideal gas: C_v = 3R/2, C_p = 5R/2", "Bomb calorimeter: Δ_cU = −C_cal·ΔT / n"], notes: "A bomb calorimeter measures ΔU, not ΔH." },
      { id: "dh-du", name: "ΔH and ΔU", formula: "ΔH = ΔU + Δn_g·RT", legend: ["Δn_g = gas moles of products − gas moles of reactants", "R = 8.314 × 10⁻³ kJ K⁻¹ mol⁻¹ beside ΔH in kJ"], notes: "Liquid water does not count in Δn_g; water vapour does." },
      { id: "hess", name: "Hess's law", formula: "Δ_rH° = Σν·Δ_fH°(products) − Σν·Δ_fH°(reactants)", legend: ["Δ_fH° = 0 for an element in its reference state", "From combustion: Δ_rH = ΣΔ_cH(reactants) − ΣΔ_cH(products)", "Reverse an equation: −ΔH; multiply it by k: k·ΔH"], notes: "Combustion runs reactants minus products, the reverse of formation." },
      { id: "neutralisation", name: "Neutralisation and phase change", formula: "H⁺ + OH⁻ → H₂O     Δ_neutH = −57.1 kJ mol⁻¹     ΔT = q / (m·c)", legend: ["Moles of water = the smaller of mol H⁺ and mol OH⁻; m = total mass of the mixture", "Δ_subH = Δ_fusH + Δ_vapH at the same temperature"], notes: "A weak acid or base releases less: part of the heat ionises it." },
      { id: "bond-enthalpy", name: "Bond enthalpy", formula: "Δ_rH = ΣBE(bonds broken) − ΣBE(bonds formed)", legend: ["All species gaseous; count every bond (C₂H₆: 6 C–H and 1 C–C)", "Average bond enthalpy = atomisation enthalpy / number of bonds"], notes: "Broken minus formed: the reverse of the formation rule." },
      { id: "gibbs", name: "Gibbs energy and spontaneity", formula: "ΔG = ΔH − TΔS     ΔG = 0 at T = ΔH/ΔS", legend: ["ΔH > 0, ΔS > 0: spontaneous above ΔH/ΔS; ΔH < 0, ΔS < 0: below it", "Δ_rS° = ΣνS°(products) − ΣνS°(reactants)", "Phase change: ΔS = ΔH_trans / T_trans"], notes: "Put ΔS in kJ K⁻¹ before using it with ΔH in kJ." },
      { id: "gibbs-k", name: "Gibbs energy and K", formula: "ΔG° = −2.303·RT·log K     log K = −ΔH°/(2.303R)·(1/T) + ΔS°/(2.303R)", legend: ["ΔG° < 0 ⇒ K > 1; ΔG° = 0 ⇒ K = 1", "Slope of log K against 1/T = −ΔH°/2.303R"], notes: "A positive ΔG° means K < 1, not no reaction." },
    ],
  },
  {
    chapter: "Equilibrium",
    playbookSlug: "equilibrium",
    formulas: [
      { id: "kc", name: "Equilibrium constant", formula: "K_c = [C]^c[D]^d / [A]^a[B]^b", legend: ["Pure solids and liquids are left out", "Q has the same form at any moment: Q < K forward, Q > K backward"], notes: "Equal rates at equilibrium, not equal amounts." },
      { id: "combining", name: "Reversing, scaling and adding", formula: "reverse: 1/K     multiply by n: Kⁿ     add: K₁·K₂     subtract: K₁/K₂", legend: ["Halving the equation gives √K"], notes: "Scaling is a power, not a factor." },
      { id: "kp-kc", name: "Kp and Kc", formula: "K_p = K_c·(RT)^Δn", legend: ["Δn = gas moles of products − gas moles of reactants", "R = 0.0821 L atm K⁻¹ mol⁻¹ for K_p in atm"], notes: "Count gases only; Δn = 0 gives K_p = K_c." },
      { id: "dissociation", name: "Degree of dissociation", formula: "A ⇌ B + C: K_p = α²P / (1 − α²)     A ⇌ 2B: K_p = 4α²P / (1 − α²)", legend: ["α = degree of dissociation; P = total pressure", "p_i = x_i·P; an inert gas counts in P, not in K"], notes: "When products have more gas moles, raising P lowers α." },
      { id: "k-temperature", name: "K, ΔG° and temperature", formula: "ΔG° = −2.303·RT·log K     log(K₂/K₁) = ΔH°/(2.303R)·(1/T₁ − 1/T₂)", legend: ["Only temperature changes K", "Heating an exothermic reaction lowers K"], notes: "Concentration, pressure, inert gas and a catalyst move the mixture, never K." },
      { id: "ph-strong", name: "pH of strong acids and bases", formula: "pH = −log[H⁺]     pH + pOH = 14 (25 °C)     mixture: [H⁺] = (n_H⁺ − n_OH⁻) / V_total", legend: ["H₂SO₄ gives 2 H⁺; Ca(OH)₂ and Ba(OH)₂ give 2 OH⁻", "Diluting a strong acid n times raises its pH by log n"], notes: "A very dilute acid never crosses pH 7: water's own H⁺ counts." },
      { id: "ph-weak", name: "Weak acids and bases", formula: "[H⁺] = √(K_a·C)     pH = ½(pK_a − log C)     α = √(K_a/C)", legend: ["Weak base: [OH⁻] = √(K_b·C)", "Diprotic H₂X: [X²⁻] ≈ K_a2"], notes: "Take the square root." },
      { id: "buffer", name: "Buffers", formula: "pH = pK_a + log([salt]/[acid])     pOH = pK_b + log([salt]/[base])", legend: ["Part-neutralised: pH = pK_a + log(n_b / (n_a − n_b))", "Half-neutralised: pH = pK_a"], notes: "Strong reagent equal to or more than the weak one leaves no buffer." },
      { id: "hydrolysis", name: "Salt hydrolysis", formula: "WA + SB: pH = 7 + ½pK_a + ½log C     SA + WB: pH = 7 − ½pK_b − ½log C     WA + WB: pH = 7 + ½(pK_a − pK_b)", legend: ["C = concentration of the hydrolysing ion", "Phenolphthalein for weak acid with strong base; methyl orange for strong acid with weak base"] },
      { id: "ksp", name: "Solubility product", formula: "AB: s²   AB₂: 4s³   AB₃: 27s⁴   A₂B₃: 108s⁵     common ion: s = K_sp / Cⁿ", legend: ["s = molar solubility; n = count of the common ion in the formula", "Q > K_sp: precipitate, with concentrations after mixing"], notes: "Across salt types compare s, not K_sp." },
    ],
  },
  {
    chapter: "Chemical Kinetics",
    playbookSlug: "chemical-kinetics",
    formulas: [
      { id: "rate", name: "Rate of reaction", formula: "r = −(1/a)·d[A]/dt = (1/c)·d[C]/dt", legend: ["For aA + bB → cC + dD", "Rate of Y = (y/x) × rate of X"], notes: "The rate of reaction is the per-coefficient value, not one species' rate." },
      { id: "rate-law", name: "Rate law and order", formula: "r₂/r₁ = ([A]₂/[A]₁)^m · ([B]₂/[B]₁)^n", legend: ["m = log(r₂/r₁) / log([A]₂/[A]₁) with [B] fixed", "Orders come from experiment, not from the balanced equation"] },
      { id: "k-units", name: "Unit of k", formula: "unit of k = (mol L⁻¹)^(1 − n) s⁻¹", legend: ["Zero order mol L⁻¹ s⁻¹ · first s⁻¹ · second L mol⁻¹ s⁻¹"], notes: "Molecularity is 1, 2 or 3, never zero or a fraction." },
      { id: "first-order", name: "First order", formula: "k = (2.303/t)·log([A]₀/[A])     t½ = 0.693/k", legend: ["[A] = what remains", "log 2 = 0.301 · log 3 = 0.477 · log 5 = 0.699"], notes: "Use what remains, not what has reacted." },
      { id: "first-order-landmarks", name: "First-order landmarks", formula: "t(75%) = 2·t½     t(87.5%) = 3·t½     t(90%) = 3.32·t½     t(99%) = 2·t(90%)", legend: ["After n half-lives, (½)ⁿ remains", "[A] = [A]₀·e^(−kt): it never reaches zero"] },
      { id: "gas-pressure", name: "First order from gas pressure", formula: "A(g) → B(g) + C(g):  k = (2.303/t)·log(p_i / (2p_i − P_t))", legend: ["p_i = initial pressure; P_t = total pressure at time t", "For this reaction P_∞ = 2p_i"], notes: "Never put the total pressure itself into the log." },
      { id: "radioactive", name: "Radioactive decay", formula: "N = N₀·e^(−λt) = N₀·(½)^(t/t½)     λ = 0.693/t½", legend: ["Activity is proportional to N", "λ does not change with temperature or pressure"] },
      { id: "zero-order", name: "Zero order and half-life", formula: "[A] = [A]₀ − kt     t½ = [A]₀/2k     t(complete) = [A]₀/k", legend: ["For order n: t½ ∝ [A]₀^(1 − n)", "[A] against t is a straight line of slope −k"], notes: "Falling to a quarter takes 1.5 half-lives, not 2." },
      { id: "arrhenius", name: "Arrhenius equation", formula: "k = A·e^(−Eₐ/RT)     log(k₂/k₁) = Eₐ/(2.303R)·(1/T₁ − 1/T₂)", legend: ["Slope of ln k against 1/T = −Eₐ/R; of log k = −Eₐ/2.303R", "2.303R = 19.15 J K⁻¹ mol⁻¹"], notes: "Temperatures in kelvin." },
      { id: "mechanism", name: "Mechanisms and catalysts", formula: "ΔH = Eₐ(forward) − Eₐ(backward)     k = k₁k₂/k₃ ⇒ Eₐ = Eₐ₁ + Eₐ₂ − Eₐ₃", legend: ["Rate law = the slow step's rate law", "Catalyst: k_cat / k_uncat = e^(ΔEₐ/RT)"], notes: "A catalyst lowers both barriers equally; ΔH, ΔG and K do not change." },
    ],
  },
  {
    chapter: "Electrochemistry",
    playbookSlug: "electrochemistry",
    formulas: [
      { id: "cell-potential", name: "Cell potential", formula: "E°cell = E°cathode − E°anode", legend: ["Both are reduction potentials", "Anode: oxidation, negative, left · Cathode: reduction, positive, right"], notes: "E° is intensive: doubling a half-reaction does not double it." },
      { id: "nernst", name: "Nernst equation (298 K)", formula: "E = E° − (0.059/n)·log Q", legend: ["Q = products over reactants; solids count as 1", "Concentration cell: E = (0.059/n)·log(c_cathode / c_anode)"], notes: "Keep the powers from the balanced equation in Q." },
      { id: "ph-electrodes", name: "Electrodes that depend on pH", formula: "E(H⁺/H₂) = −0.059·pH − (0.059/2)·log p_H₂", legend: ["Oxygen electrode: E = 1.23 − 0.059·pH", "MnO₄⁻/Mn²⁺ carries [H⁺]⁸ in the log; Cr₂O₇²⁻/Cr³⁺ carries [H⁺]¹⁴"] },
      { id: "gibbs-k", name: "Gibbs energy and K", formula: "ΔG° = −nFE°     log K = nE° / 0.059", legend: ["F = 96500 C mol⁻¹", "Maximum electrical work = nFE"], notes: "The most negative ΔG° goes with the largest nE°, not the largest E°." },
      { id: "combining", name: "Combining electrode potentials", formula: "n₃E°₃ = n₁E°₁ ± n₂E°₂", legend: ["E°(Fe³⁺/Fe²⁺) = 3E°(Fe³⁺/Fe) − 2E°(Fe²⁺/Fe)", "E°(X⁻/MX/M) = E°(M⁺/M) + 0.059·log K_sp"], notes: "Never subtract two half-reaction potentials directly to get a third." },
      { id: "conductivity", name: "Conductivity", formula: "κ = G*/R     Λm = 1000·κ / c", legend: ["G* = l/A, the cell constant (cm⁻¹)", "Λm in S cm² mol⁻¹ with κ in S cm⁻¹ and c in mol L⁻¹", "1 S cm² mol⁻¹ = 10⁻⁴ S m² mol⁻¹"], notes: "On dilution κ falls and Λm rises." },
      { id: "kohlrausch", name: "Kohlrausch's law", formula: "Λ°m = ν₊λ°₊ + ν₋λ°₋", legend: ["Λ°m(CH₃COOH) = Λ°m(CH₃COONa) + Λ°m(HCl) − Λ°m(NaCl)", "Strong electrolytes: Λm = Λ°m − A·√c"], notes: "A weak electrolyte's Λ°m comes only from Kohlrausch's law, not by extrapolation." },
      { id: "dissociation", name: "Degree of dissociation and solubility", formula: "α = Λm / Λ°m     K_a = cα² / (1 − α)     s = 1000·κ / Λ°m", legend: ["s = solubility of a sparingly soluble salt, mol L⁻¹", "Then K_sp = s² for a 1 : 1 salt"] },
      { id: "faraday", name: "Faraday's laws", formula: "m = M·I·t / (n·F)     Q = I·t", legend: ["n: Ag⁺ 1 · Cu²⁺ 2 · Al³⁺ 3 · O₂ 4 · H₂ and Cl₂ 2", "Cells in series: masses in the ratio of M/n"], notes: "Time in seconds; oxygen needs four electrons." },
      { id: "electrolysis-products", name: "Products of electrolysis", formula: "brine: Cl₂ at the anode, H₂ + OH⁻ at the cathode     aq. CuSO₄, Pt: Cu and O₂     aq. CuSO₄, Cu: Cu deposits, the Cu anode dissolves", legend: ["Na⁺, K⁺, Mg²⁺ and Al³⁺ are never deposited from water", "Dilute H₂SO₄ gives O₂; concentrated H₂SO₄ gives S₂O₈²⁻"] },
    ],
  },
  {
    chapter: "Solutions",
    playbookSlug: "solutions",
    formulas: [
      { id: "henry", name: "Henry's law", formula: "p = K_H·x", legend: ["p = partial pressure of the gas; x = its mole fraction in solution", "Moles in 1 L of water ≈ 55.56·x"], notes: "A larger K_H means a less soluble gas; K_H rises with temperature." },
      { id: "raoult", name: "Raoult's law, two volatile liquids", formula: "P = x_A·p°_A + x_B·p°_B", legend: ["p_A = x_A·p°_A", "The higher p° belongs to the more volatile liquid"] },
      { id: "vapour", name: "Vapour composition", formula: "y_A = x_A·p°_A / P     1/P = y_A/p°_A + y_B/p°_B", legend: ["y = mole fraction in the vapour"], notes: "The vapour is richer in the more volatile liquid." },
      { id: "deviations", name: "Deviations from Raoult's law", formula: "positive: ΔH_mix > 0, ΔV_mix > 0, minimum-boiling azeotrope     negative: ΔH_mix < 0, ΔV_mix < 0, maximum-boiling azeotrope", legend: ["Positive: ethanol + water, acetone + CS₂", "Negative: chloroform + acetone, HNO₃ + water"], notes: "A new hydrogen bond between the two liquids means a negative deviation." },
      { id: "rlvp", name: "Relative lowering of vapour pressure", formula: "(p° − p)/p° = x₂ = n₂/(n₁ + n₂) ≈ n₂/n₁", legend: ["x₂ = mole fraction of the solute", "Electrolyte: use i·n₂"], notes: "The solute's mole fraction, not the solvent's." },
      { id: "bp-fp", name: "Elevation and depression", formula: "ΔT_b = i·K_b·m     ΔT_f = i·K_f·m     M₂ = 1000·K·w₂ / (ΔT·W₁)", legend: ["m = molality; W₁ = grams of solvent", "Water: K_b = 0.52, K_f = 1.86 K kg mol⁻¹"], notes: "Only the solvent freezes out." },
      { id: "kb-kf", name: "The solvent constants", formula: "K_b = R·T_b²·M₁ / (1000·Δ_vapH)     K_f = R·T_f²·M₁ / (1000·Δ_fusH)", legend: ["M₁ in g mol⁻¹; ΔH in J mol⁻¹"], notes: "For water K_f is larger than K_b." },
      { id: "osmotic", name: "Osmotic pressure", formula: "π = iCRT     M = wRT / (πV)     π = hρg", legend: ["C in mol per litre of solution", "R = 0.083 L bar K⁻¹ mol⁻¹ = 0.0821 L atm K⁻¹ mol⁻¹"], notes: "Isotonic means equal i·C, not equal C." },
      { id: "vant-hoff-dissociation", name: "Van 't Hoff factor, dissociation", formula: "i = 1 + (n − 1)α     α = (i − 1)/(n − 1)", legend: ["n = ions per formula unit", "i = normal molar mass / observed molar mass"], notes: "Divide by n − 1, not by n." },
      { id: "vant-hoff-association", name: "Van 't Hoff factor, association", formula: "i = 1 − (1 − 1/n)α     dimer: i = 1 − α/2", legend: ["Complete dimerisation gives i = ½ (acetic or benzoic acid in benzene)"], notes: "Association raises the apparent molar mass." },
    ],
  },
  // Reactions
  {
    chapter: "Hydrocarbons",
    playbookSlug: "hydrocarbons",
    formulas: [
      { id: "alkane-routes", name: "Making alkanes", formula: "Wurtz: 2RX + 2Na (dry ether) → R–R     Kolbe: electrolysis of RCOONa → R–R + CO₂     soda lime: RCOONa + NaOH (CaO, Δ) → RH + Na₂CO₃", legend: ["Wurtz and Kolbe double the chain; soda lime removes one carbon", "RMgX + H₂O → RH; with D₂O → RD"], notes: "Two different halides in a Wurtz reaction give three alkanes." },
      { id: "conformations", name: "Conformations", formula: "ethane: staggered (60°) most stable, eclipsed (0°) least     n-butane: anti < gauche < eclipsed < fully eclipsed", legend: ["Butane order is increasing energy", "Conformers interconvert at room temperature and cannot be separated"] },
      { id: "radical-halogenation", name: "Free-radical halogenation", formula: "Cl₂ (hν) → 2Cl·     structural products = sets of non-equivalent H", legend: ["H reactivity 3° > 2° > 1°; Br· is far more selective than Cl·", "A chiral product counts twice when stereoisomers are asked for"] },
      { id: "hx-water", name: "Adding HX and water", formula: "RCH=CH₂ + HBr → RCHBrCH₃     RCH=CH₂ + HBr (peroxide) → RCH₂CH₂Br", legend: ["Markovnikov through the more stable carbocation; check for a hydride or methyl shift", "H₂O/H⁺: Markovnikov, may rearrange · Hg(OAc)₂ then NaBH₄: Markovnikov, no shift · B₂H₆ then H₂O₂/OH⁻: anti-Markovnikov"], notes: "The peroxide effect works with HBr only." },
      { id: "br2-kmno4", name: "Bromine and permanganate", formula: "Br₂ in CCl₄: anti addition     cold dilute KMnO₄: syn-diol     hot KMnO₄: =CH₂ → CO₂, =CHR → RCOOH, =CR₂ → R₂C=O", legend: ["trans-But-2-ene + Br₂ → meso; cis → racemic", "Cl₂ with light, or NBS: allylic substitution, C=C kept"] },
      { id: "ozonolysis", name: "Ozonolysis", formula: "R₂C=CHR′ + O₃, then Zn/H₂O → R₂C=O + R′CHO", legend: ["=CH₂ gives HCHO", "A ring alkene gives one dicarbonyl chain"], notes: "Without Zn the aldehydes are oxidised to acids." },
      { id: "alkynes", name: "Alkynes", formula: "RC≡CH + NaNH₂ → RC≡C⁻Na⁺ + NH₃     H₂, Lindlar → cis-alkene     Na in liquid NH₃ → trans-alkene     H₂O, HgSO₄/H₂SO₄ → RCOCH₃", legend: ["Only a terminal alkyne has the acidic H: white precipitate with ammoniacal AgNO₃", "Ethyne alone hydrates to ethanal"], notes: "Alcoholic KOH stops at the vinyl halide; NaNH₂ finishes the alkyne." },
      { id: "huckel", name: "Aromaticity", formula: "aromatic: planar, cyclic, conjugated, (4n + 2) π electrons     antiaromatic: planar, cyclic, 4n", legend: ["Aromatic ions: cyclopentadienyl anion, tropylium cation, cyclopropenyl cation", "Cyclooctatetraene is non-aromatic: it is tub-shaped"], notes: "Count only π electrons in the ring, not an exocyclic C=O." },
      { id: "eas", name: "Electrophilic substitution", formula: "o/p: –NH₂ –OH –OCH₃ –NHCOCH₃ –R –X     m: –NO₂ –CN –CHO –COR –COOH –SO₃H", legend: ["Electrophiles: NO₂⁺ (HNO₃ + H₂SO₄) · Cl⁺ (Cl₂ + AlCl₃) · SO₃ · R⁺ and RCO⁺ (AlCl₃)", "Halogens deactivate yet direct ortho and para"], notes: "Friedel–Crafts fails on rings carrying –NO₂ or –NH₂." },
      { id: "side-chain", name: "Side-chain oxidation and Friedel–Crafts", formula: "C₆H₅–CH₂R + KMnO₄/KOH (Δ), then H₃O⁺ → C₆H₅COOH", legend: ["Needs a benzylic H: a tert-butyl group is not oxidised", "Alkylation can rearrange and repeat; acylation does neither"], notes: "Do any Friedel–Crafts step before adding a strong deactivator." },
    ],
  },
  {
    chapter: "Haloalkanes and Haloarenes",
    playbookSlug: "haloalkanes-and-haloarenes",
    formulas: [
      { id: "from-alcohols", name: "Halides from alcohols", formula: "ROH + SOCl₂ → RCl + SO₂ + HCl     ROH + HX: 3° > 2° > 1°", legend: ["1° and 2° need ZnCl₂ (Lucas reagent); also PCl₅, PCl₃, PBr₃", "Alkene + HX: Markovnikov; HBr with peroxide: anti-Markovnikov"], notes: "Phenol does not give an aryl halide with HX." },
      { id: "exchange", name: "Halide exchange", formula: "Finkelstein: RCl/RBr + NaI (dry acetone) → RI     Swarts: RCl/RBr + AgF, Hg₂F₂, CoF₂ or SbF₃ → RF", legend: ["Swarts makes freons such as CCl₂F₂ from CCl₄"], notes: "Finkelstein runs because NaCl and NaBr precipitate in acetone." },
      { id: "from-diazonium", name: "Aryl halides from diazonium salts", formula: "Sandmeyer: ArN₂⁺ + Cu₂Cl₂/HCl → ArCl · Cu₂Br₂/HBr → ArBr · CuCN/KCN → ArCN     Gattermann: Cu powder + HX → ArX     KI → ArI", legend: ["Iodide needs no copper"], notes: "Gattermann gives chlorides and bromides, not cyanides." },
      { id: "sn1-sn2", name: "SN1 and SN2", formula: "SN2: rate = k[RX][Nu⁻], inversion     SN1: rate = k[RX], racemisation", legend: ["SN2: CH₃X > 1° > 2° > 3°; polar aprotic solvent", "SN1: 3° > 2° > 1° > CH₃X; benzylic and allylic fast; polar protic solvent"], notes: "SN1 can rearrange; SN2 never does." },
      { id: "nucleophiles", name: "Leaving groups and nucleophiles", formula: "leaving group: I > Br > Cl > F     protic: I⁻ > Br⁻ > Cl⁻ > F⁻     aprotic: F⁻ > Cl⁻ > Br⁻ > I⁻", legend: ["Same donor atom: follow basicity (RO⁻ > C₆H₅O⁻ > CH₃COO⁻)", "A bulky base such as (CH₃)₃CO⁻ is a poor nucleophile"] },
      { id: "agno3", name: "Which halides ionise", formula: "alcoholic AgNO₃: 3°, benzylic, allylic at once · 1° slowly · vinylic, aryl, bridgehead never", legend: ["SN1 order of cations: (C₆H₅)₃C⁺ > (C₆H₅)₂CH⁺ > C₆H₅CH₂⁺", "A halide whose cation is aromatic ionises easily (tropylium)"] },
      { id: "ambident", name: "Reagent to product", formula: "KCN → R–CN · AgCN → R–NC · KNO₂ → R–O–N=O · AgNO₂ → R–NO₂", legend: ["KCN and KNO₂ are ionic; AgCN and AgNO₂ are covalent", "Aq. KOH → ROH · NaOR′ → ROR′ · NH₃ → amines · LiAlH₄ → RH"] },
      { id: "elimination", name: "Elimination", formula: "R–CH₂–CH₂–X + KOH (alcoholic, Δ) → R–CH=CH₂ + KX + H₂O", legend: ["Aqueous KOH substitutes; alcoholic KOH eliminates", "Zaitsev: the more substituted alkene is major; a bulky base gives the less substituted one"], notes: "No β-hydrogen, no elimination." },
      { id: "haloarenes", name: "Substitution on haloarenes", formula: "C₆H₅Cl + NaOH (623 K, 300 atm), then H⁺ → C₆H₅OH", legend: ["Nitro groups ortho or para to Cl make it far easier", "Electrophiles go ortho and para to the halogen, para major"], notes: "A meta nitro group barely helps." },
      { id: "metals", name: "Reactions with metals", formula: "RX + Mg (dry ether) → RMgX     Wurtz: 2RX + 2Na → R–R     Wurtz–Fittig: ArX + RX + 2Na → Ar–R     Fittig: 2ArX + 2Na → Ar–Ar", legend: ["RMgX + H₂O → RH; with D₂O → RD", "A 1,3-dihalide with Na or Zn gives cyclopropane"] },
    ],
  },
  {
    chapter: "Alcohols, Phenols and Ethers",
    playbookSlug: "alcohols-phenols-and-ethers",
    formulas: [
      { id: "making-alcohols", name: "Making alcohols", formula: "RMgX + HCHO → 1° · RCHO → 2° · R₂CO → 3° alcohol (then H₃O⁺)", legend: ["Acid hydration: Markovnikov, can rearrange; hydroboration: anti-Markovnikov, no shift", "NaBH₄ reduces aldehydes and ketones, not acids; LiAlH₄ reduces acids"] },
      { id: "boiling-points", name: "Boiling points", formula: "alkane < ether < aldehyde, ketone < alcohol < carboxylic acid", legend: ["At similar molar mass; branching lowers the boiling point"], notes: "o-Nitrophenol is chelated: it boils lower and is steam volatile." },
      { id: "acidity", name: "Acidity", formula: "pKa: p-nitrophenol 7.1 < o-nitrophenol 7.2 < m-nitrophenol 8.3 < phenol 10.0 < p-cresol 10.2 < ethanol 15.9", legend: ["Alcohols: CH₃OH > 1° > 2° > 3°", "−I and −R groups strengthen a phenol; +I and +R weaken it"], notes: "Methoxy weakens phenol at para but strengthens it at meta." },
      { id: "screens", name: "Screens for O–H compounds", formula: "Na: every O–H · NaOH: phenols and acids · NaHCO₃: acids and picric acid · neutral FeCl₃: violet with phenol", legend: ["Active H: ROH + CH₃MgI → CH₄; mol CH₄ = mol O–H"], notes: "Benzyl alcohol is not a phenol." },
      { id: "lucas-oxidation", name: "Lucas test and oxidation", formula: "Lucas (conc. HCl + ZnCl₂): 3° turbid at once · 2° in about five minutes · 1° none at room temperature", legend: ["Oxidation: 1° → aldehyde (PCC) or acid (KMnO₄, K₂Cr₂O₇); 2° → ketone; 3° resists", "Hot Cu at 573 K: 1° → aldehyde, 2° → ketone, 3° → alkene"], notes: "Acetylation adds 42 g mol⁻¹ for each OH." },
      { id: "dehydration", name: "Acid dehydration", formula: "ROH + H⁺ → ROH₂⁺ → R⁺ (shift if better) → most substituted alkene", legend: ["Ease: 3° > 2° > 1°; a 1° alcohol needs conc. H₂SO₄ at 443 K", "At 413 K a 1° alcohol gives the ether instead"], notes: "Check for a hydride or methyl shift before drawing the alkene." },
      { id: "making-phenol", name: "Making phenol", formula: "cumene + O₂, then H⁺ → phenol + propanone     C₆H₅Cl + NaOH (623 K, 300 atm) → phenol     C₆H₅N₂⁺Cl⁻ + warm H₂O → phenol", legend: ["Benzenesulphonic acid fused with NaOH, then H⁺, also gives phenol"] },
      { id: "phenol-named", name: "Named reactions of phenol", formula: "Reimer–Tiemann: phenol + CHCl₃/aq. NaOH → salicylaldehyde     Kolbe: sodium phenoxide + CO₂ (400 K, 4–7 atm) → salicylic acid", legend: ["Reimer–Tiemann electrophile: :CCl₂; ortho major", "Zn dust → benzene · Na₂Cr₂O₇/H₂SO₄ → benzoquinone · acetylating salicylic acid → aspirin"], notes: "Chloroform gives the aldehyde; carbon dioxide gives the acid." },
      { id: "phenol-ring", name: "Ring substitution of phenol", formula: "bromine water → 2,4,6-tribromophenol (white)     Br₂ in CS₂, 273 K → p-bromophenol     dil. HNO₃ → o- + p-nitrophenol     conc. HNO₃ → picric acid", legend: ["No FeBr₃ needed: the OH activates the ring", "Steam distillation carries off o-nitrophenol"], notes: "Picric acid is a trinitrophenol, not TNT." },
      { id: "ethers", name: "Making and cleaving ethers", formula: "Williamson: RO⁻Na⁺ + R′X → ROR′ (R′ = CH₃ or 1°)     ArOCH₃ + HI → ArOH + CH₃I     R₃C–O–CH₃ + HI → R₃C–I + CH₃OH", legend: ["Aryl ethers: phenoxide + alkyl halide, never aryl halide + alkoxide", "Primary groups: I goes to the smaller one (SN2); a tertiary group takes the I (SN1)"], notes: "A tertiary halide with an alkoxide gives an alkene, not an ether." },
    ],
  },
  {
    chapter: "Aldehydes, Ketones and Carboxylic Acids",
    playbookSlug: "aldehydes-ketones-and-carboxylic-acids",
    formulas: [
      { id: "making", name: "Named routes to carbonyls", formula: "Rosenmund: RCOCl + H₂ (Pd–BaSO₄) → RCHO     Stephen: RCN + SnCl₂/HCl, then H₃O⁺ → RCHO     Etard: toluene + CrO₂Cl₂, then H₃O⁺ → C₆H₅CHO", legend: ["Gattermann–Koch: benzene + CO + HCl (AlCl₃, CuCl) → C₆H₅CHO", "PCC stops a 1° alcohol at the aldehyde; DIBAL-H takes an ester or nitrile to RCHO"], notes: "The Stephen reduction needs the water step." },
      { id: "addition", name: "Nucleophilic addition", formula: "reactivity: HCHO > RCHO > RCOR′ and RCHO > ArCHO     R₂C=O + HCN (OH⁻) → R₂C(OH)CN", legend: ["Electron-withdrawing ring groups raise reactivity; donors lower it", "Cyanohydrin + H₃O⁺ → 2-hydroxy acid; + LiAlH₄ → amino alcohol"], notes: "Cyanide adds to both faces, so the product is racemic." },
      { id: "derivatives", name: "Carbonyl derivatives", formula: "R₂C=O + H₂N–Z → R₂C=N–Z + H₂O (weak acid, pH about 4 to 5)", legend: ["NH₂OH → oxime · NH₂NH₂ → hydrazone · 2,4-DNP → orange precipitate · NH₂NHCONH₂ → semicarbazone", "Two R′OH, dry HCl → acetal: stable to base, hydrolysed by acid"], notes: "Semicarbazide bonds through the NH₂ of its NH–NH₂ end." },
      { id: "grignard", name: "Grignard reagents", formula: "HCHO → 1° · RCHO → 2° · R₂CO → 3° alcohol     RCN + R′MgX, then H₃O⁺ → RCOR′     RMgX + CO₂, then H₃O⁺ → RCOOH", legend: ["An ester uses two equivalents and gives a 3° alcohol", "Each acidic H uses up one more equivalent"], notes: "Carbon dioxide adds one carbon." },
      { id: "reductions", name: "Reductions", formula: "Clemmensen: Zn–Hg/conc. HCl, C=O → CH₂     Wolff–Kishner: NH₂NH₂, KOH, glycol, heat, C=O → CH₂", legend: ["LiAlH₄: aldehyde, ketone, acid, ester → alcohol; amide, nitrile → amine", "NaBH₄: aldehydes and ketones only"], notes: "An acid-sensitive molecule needs Wolff–Kishner; a base-sensitive one needs Clemmensen." },
      { id: "tests", name: "Identification tests", formula: "Tollens' → silver mirror · Fehling's → red Cu₂O · 2,4-DNP → yellow-orange precipitate · I₂/NaOH → yellow CHI₃", legend: ["Tollens': every aldehyde, HCOOH, α-hydroxy ketones · Fehling's: aliphatic aldehydes only", "Iodoform: CH₃CO– or CH₃CH(OH)– joined to H or C"], notes: "Acetic acid and its esters fail the iodoform test." },
      { id: "aldol", name: "Aldol condensation", formula: "2RCH₂CHO (dil. OH⁻) → RCH₂CH(OH)CH(R)CHO → (Δ, −H₂O) RCH₂CH=C(R)CHO", legend: ["Needs an α-H; the new C–C joins the α-carbon to the carbonyl carbon", "Crossed: products = (partners with an α-H) × (all partners)", "Claisen–Schmidt: ArCHO + ketone with α-H, NaOH → α,β-unsaturated ketone"], notes: "Intramolecular aldol closes a five- or six-membered ring." },
      { id: "cannizzaro", name: "Cannizzaro reaction", formula: "2ArCHO (conc. OH⁻) → ArCOO⁻ + ArCH₂OH     HCHO + ArCHO → HCOO⁻ + ArCH₂OH", legend: ["Needs no α-H: HCHO, ArCHO, R₃CCHO", "Crossed: HCHO is the one oxidised"], notes: "Concentrated alkali, not dilute." },
      { id: "acid-strength", name: "Acid strength", formula: "pKa: CF₃COOH 0.23 < CCl₃COOH 0.65 < ClCH₂COOH 2.86 < HCOOH 3.75 < C₆H₅COOH 4.19 < CH₃COOH 4.76", legend: ["−I groups strengthen: more of them, and nearer the COOH, is stronger", "Acids release CO₂ from NaHCO₃; phenols do not, except picric acid"] },
      { id: "acid-reactions", name: "Reactions of carboxylic acids", formula: "HVZ: RCH₂COOH + X₂/red P → RCH(X)COOH     RCOOH + SOCl₂ → RCOCl     soda lime: RCOONa → RH", legend: ["Hydrolysis rate: acid chloride > anhydride > ester > amide", "LiAlH₄ or B₂H₆ → RCH₂OH; NaBH₄ does not reduce COOH"], notes: "COOH directs meta, and benzoic acid gives no Friedel–Crafts reaction." },
    ],
  },
  {
    chapter: "Amines",
    playbookSlug: "amines",
    formulas: [
      { id: "basicity-aliphatic", name: "Basicity of aliphatic amines", formula: "methyl: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃     ethyl: (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃", legend: ["In water; in the gas phase 3° > 2° > 1° > NH₃", "pK_a(BH⁺) + pK_b(B) = 14"], notes: "Tertiary is not the strongest base in water." },
      { id: "basicity-aryl", name: "Basicity of aryl amines", formula: "pK_b: C₆H₅CH₂NH₂ 4.70 < C₆H₅N(CH₃)₂ 8.92 < C₆H₅NHCH₃ 9.30 < C₆H₅NH₂ 9.38", legend: ["Smaller pK_b, stronger base; para donors raise basicity, acceptors lower it", "Pyridine is weak; pyrrole is almost non-basic"], notes: "Benzylamine behaves as an aliphatic amine." },
      { id: "reduction", name: "Amines by reduction", formula: "ArNO₂ + Sn/HCl or Fe/HCl → ArNH₂     RCN + LiAlH₄ → RCH₂NH₂     RCONH₂ + LiAlH₄ → RCH₂NH₂", legend: ["The nitrile route adds one carbon to the halide RX", "SnCl₂/HCl on a nitrile gives an aldehyde, not an amine"] },
      { id: "ammonolysis-gabriel", name: "Ammonolysis and Gabriel synthesis", formula: "RX + NH₃ → RNH₂ → R₂NH → R₃N → R₄N⁺X⁻     Gabriel: phthalimide + KOH, then RX, then NaOH(aq) → RNH₂", legend: ["Excess NH₃ favours the primary amine", "Gabriel makes primary alkyl amines only, never aryl amines"] },
      { id: "hofmann-bromamide", name: "Hofmann bromamide degradation", formula: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O", legend: ["One carbon fewer, through the isocyanate R–N=C=O", "Benzamide gives aniline"], notes: "Only an unsubstituted amide RCONH₂ reacts." },
      { id: "acylation", name: "Acylation", formula: "RNH₂ + (CH₃CO)₂O → RNHCOCH₃ + CH₃COOH", legend: ["Each acetyl group adds 42 g mol⁻¹", "Schotten–Baumann: C₆H₅COCl in aqueous NaOH"], notes: "The more nucleophilic group is acylated first." },
      { id: "tests", name: "Carbylamine, Hinsberg and nitrous acid", formula: "RNH₂ + CHCl₃ + 3KOH (Δ) → R–NC + 3KCl + 3H₂O", legend: ["Hinsberg (C₆H₅SO₂Cl): 1° product dissolves in alkali · 2° insoluble · 3° no reaction", "HNO₂, cold: 1° aliphatic → N₂ + ROH · 2° → yellow N-nitrosamine"], notes: "The carbylamine test is positive for primary aromatic amines too." },
      { id: "aniline-ring", name: "Ring substitution of aniline", formula: "Br₂ water → 2,4,6-tribromoaniline     HNO₃/H₂SO₄ (288 K) → para and meta nitroaniline, little ortho", legend: ["Protect by acetylation, substitute, then hydrolyse", "The meta product comes from the anilinium ion; Friedel–Crafts fails because N binds AlCl₃"], notes: "NH₂ is not a meta director." },
      { id: "diazonium", name: "Diazonium salts", formula: "ArNH₂ + NaNO₂ + 2HCl (273–278 K) → ArN₂⁺Cl⁻ + NaCl + 2H₂O", legend: ["CuCl/HCl → ArCl · CuBr/HBr → ArBr · CuCN/KCN → ArCN · KI → ArI · HBF₄, Δ → ArF · warm H₂O → ArOH", "H₃PO₂ or ethanol → ArH"], notes: "Electron-withdrawing groups destabilise the diazonium salt." },
      { id: "coupling", name: "Coupling and azo dyes", formula: "ArN₂⁺ + phenol (mild OH⁻) → p-hydroxyazobenzene (orange)     ArN₂⁺ + aniline (mild H⁺) → p-aminoazobenzene (yellow)", legend: ["β-Naphthol in NaOH → orange-red dye: the test for a primary aromatic amine", "Coupling goes para; ortho if para is blocked"], notes: "Coupling keeps both nitrogens." },
    ],
  },
];
