/**
 * Content for /guide/mht-cet-physics/formulas.
 *
 * The formula compendium — the formulas MHT-CET Physics actually tests,
 * grouped by chapter in strand order (cornerstone, quick-win, long tail).
 *
 * RENDERING CONVENTION — plain text + unicode, NOT LaTeX. The shared
 * FormulaSheet renderer prints `formula` as raw text in a font-mono block, so
 * a backslash-LaTeX string would ship as literal markup.
 *
 * Editorial curation, not a syllabus dump: each entry carries a subtopic that
 * appears in the 2021-2025 bank. Many `notes` point at the ratio form, because
 * 279 questions across 22 chapters are ratio questions (see /traps).
 */

export type FormulaEntry = {
  id: string;
  name: string;
  formula: string;
  legend: string[];
  notes?: string;
};

export type FormulaGroup = {
  /** Canonical bank chapter name — matches PLAYBOOKS[].chapter. */
  chapter: string;
  playbookSlug: string;
  formulas: FormulaEntry[];
};

export const FORMULA_GROUPS: FormulaGroup[] = [
  {
    chapter: "Electrostatics",
    playbookSlug: "electrostatics",
    formulas: [
      {
        id: "coulomb-field-potential",
        name: "Coulomb force, field and potential",
        formula: "F = kq₁q₂/r²     E = kq/r²     V = kq/r     k = 1/4πε₀ = 9 × 10⁹ N m² C⁻²",
        legend: ["q = charge", "r = distance", "E is a vector; V is a scalar"],
        notes: "Add fields as vectors and potentials as signed numbers. At the midpoint of two equal like charges E = 0 but V does not.",
      },
      {
        id: "gauss",
        name: "Gauss's law",
        formula: "Φ = q_enclosed / ε₀",
        legend: ["Φ = flux through a CLOSED surface"],
        notes: "Shape does not matter. A charge at a cube's centre sends Φ/6 through each face.",
      },
      {
        id: "dipole",
        name: "Electric dipole",
        formula: "p = q × 2a     E_axis = 2kp/r³     E_equator = kp/r³     τ = pE sin θ     U = −pE cos θ",
        legend: ["p = dipole moment", "θ = angle between p and E"],
      },
      {
        id: "capacitor",
        name: "Capacitance and combinations",
        formula: "C = ε₀A/d   (with dielectric: KC)\nparallel: C = C₁ + C₂     series: 1/C = 1/C₁ + 1/C₂",
        legend: ["A = plate area", "d = separation", "K = dielectric constant"],
      },
      {
        id: "capacitor-energy",
        name: "Energy stored in a capacitor",
        formula: "U = ½CV² = Q²/2C = ½QV",
        legend: ["Battery connected: V fixed", "Battery removed: Q fixed"],
        notes: "Slab inserted with the battery on: C, Q and U rise by K. With the battery off: V and U fall by K.",
      },
    ],
  },
  {
    chapter: "Rotational Dynamics",
    playbookSlug: "rotational-dynamics",
    formulas: [
      {
        id: "mi-standard",
        name: "Standard moments of inertia",
        formula: "ring MR²   disc ½MR²   solid sphere ⅖MR²   hollow sphere ⅔MR²   rod (centre) ML²/12   rod (end) ML²/3",
        legend: ["M = mass", "R = radius", "L = length"],
      },
      {
        id: "axis-theorems",
        name: "Parallel and perpendicular axis theorems",
        formula: "I = I_cm + Md²          I_z = I_x + I_y  (flat bodies only)",
        legend: ["d = distance between the parallel axes"],
        notes: "The perpendicular-axis theorem does not apply to a 3-D body.",
      },
      {
        id: "angular-momentum",
        name: "Angular momentum and torque",
        formula: "L = Iω     τ = dL/dt = Iα     no external torque: I₁ω₁ = I₂ω₂",
        legend: ["ω = angular speed", "α = angular acceleration"],
      },
      {
        id: "rolling",
        name: "Rolling without slipping",
        formula: "KE = ½mv²(1 + K²/R²)     a = g sin θ / (1 + K²/R²)",
        legend: ["K = radius of gyration", "K²/R²: sphere 2/5, disc 1/2, ring 1"],
        notes: "Smallest K²/R² reaches the bottom first: sphere, then disc, then ring.",
      },
      {
        id: "circular-dynamics",
        name: "Banking and the vertical circle",
        formula: "banking: tan θ = v²/rg     vertical circle: v_top ≥ √(gr),  v_bottom ≥ √(5gr)",
        legend: ["r = radius", "θ = banking angle"],
      },
    ],
  },
  {
    chapter: "Superposition of Waves",
    playbookSlug: "superposition-of-waves",
    formulas: [
      {
        id: "wave-equation",
        name: "Progressive wave",
        formula: "y = A sin(ωt − kx)     v = ω/k = fλ     k = 2π/λ",
        legend: ["A = amplitude", "ω = angular frequency", "k = wave number"],
      },
      {
        id: "string",
        name: "Vibrating string",
        formula: "v = √(T/μ)     fₙ = (n/2L)√(T/μ)",
        legend: ["T = tension", "μ = mass per unit LENGTH", "n = 1, 2, 3 …"],
      },
      {
        id: "pipes",
        name: "Pipes",
        formula: "open: fₙ = nv/2L (all n)     closed: fₙ = nv/4L (odd n only)\nend correction e = 0.6r per open end",
        legend: ["L = length", "r = radius of the pipe"],
        notes: "A closed pipe's first overtone is its THIRD harmonic.",
      },
      {
        id: "beats",
        name: "Beats",
        formula: "beat frequency = |f₁ − f₂|",
        legend: ["Loading a fork lowers its frequency; filing raises it"],
      },
    ],
  },
  {
    chapter: "Mechanical Properties of Fluids",
    playbookSlug: "mechanical-properties-of-fluids",
    formulas: [
      {
        id: "capillary",
        name: "Capillary rise",
        formula: "h = 2T cos θ / rρg",
        legend: ["T = surface tension", "θ = contact angle", "r = tube radius"],
        notes: "h ∝ 1/r: halve the radius, double the rise.",
      },
      {
        id: "excess-pressure",
        name: "Excess pressure",
        formula: "drop: ΔP = 2T/r     soap bubble: ΔP = 4T/r",
        legend: ["A soap film has two surfaces"],
      },
      {
        id: "surface-energy",
        name: "Surface energy",
        formula: "W = T × ΔA     soap bubble of radius r: W = 8πr²T",
        legend: ["ΔA = increase in surface area"],
        notes: "n drops merging: R = n^(1/3) r; area falls, energy is released.",
      },
      {
        id: "stokes",
        name: "Stokes' law and terminal velocity",
        formula: "F = 6πηrv     v_t = 2r²(ρ − σ)g / 9η",
        legend: ["η = viscosity", "ρ = density of the sphere", "σ = density of the fluid"],
        notes: "v_t ∝ r².",
      },
      {
        id: "bernoulli",
        name: "Continuity and Bernoulli",
        formula: "A₁v₁ = A₂v₂     P + ½ρv² + ρgh = constant     Torricelli: v = √(2gh)",
        legend: ["A = cross-section", "v = flow speed"],
      },
    ],
  },
  {
    chapter: "Wave Optics",
    playbookSlug: "wave-optics",
    formulas: [
      {
        id: "ydse",
        name: "Young's double slit",
        formula: "β = λD/d     in a liquid: β/μ     film shift = (μ − 1)tD/d",
        legend: ["D = slit–screen distance", "d = slit separation", "t = film thickness"],
      },
      {
        id: "interference-intensity",
        name: "Interference intensity",
        formula: "I = I₁ + I₂ + 2√(I₁I₂) cos φ     I_max/I_min = ((√I₁ + √I₂)/(√I₁ − √I₂))²",
        legend: ["φ = phase difference"],
        notes: "Two equal sources: maximum 4I, minimum 0.",
      },
      {
        id: "single-slit",
        name: "Single slit",
        formula: "minima: a sin θ = nλ     central maximum width = 2λD/a",
        legend: ["a = slit width"],
      },
      {
        id: "polarisation",
        name: "Malus and Brewster",
        formula: "I = I₀ cos²θ     tan θ_B = μ",
        legend: ["Unpolarised light through one polariser: I₀/2"],
      },
    ],
  },
  {
    chapter: "Oscillations",
    playbookSlug: "oscillations",
    formulas: [
      {
        id: "shm",
        name: "SHM kinematics",
        formula: "x = A sin(ωt + φ)     v = ω√(A² − x²)     a = −ω²x",
        legend: ["v_max = ωA", "a_max = ω²A"],
      },
      {
        id: "shm-energy",
        name: "SHM energy",
        formula: "E = ½kA²     PE = ½kx²     KE = ½k(A² − x²)",
        legend: ["KE = PE at x = A/√2"],
      },
      {
        id: "spring-mass",
        name: "Spring-mass and combinations",
        formula: "T = 2π√(m/k)     parallel: k = k₁ + k₂     series: 1/k = 1/k₁ + 1/k₂",
        legend: ["A spring cut to 1/n of its length has n × k"],
      },
      {
        id: "pendulum",
        name: "Simple pendulum",
        formula: "T = 2π√(l/g_eff)     lift up: g + a     lift down: g − a",
        legend: ["l = length"],
      },
    ],
  },
  {
    chapter: "Semiconductor Devices",
    playbookSlug: "semiconductor-devices",
    formulas: [
      {
        id: "transistor",
        name: "Transistor relations",
        formula: "I_E = I_B + I_C     α = I_C/I_E     β = I_C/I_B     β = α/(1 − α)",
        legend: ["CE amplifier: voltage gain = β R_out/R_in", "power gain = β × voltage gain"],
      },
      {
        id: "gates",
        name: "Logic gates",
        formula: "AND A·B   OR A+B   NOT Ā   NAND (A·B)‾   NOR (A+B)‾   XOR A⊕B",
        legend: ["NAND and NOR are universal gates"],
        notes: "Trace a gate circuit row by row through its truth table; do not guess from the shapes.",
      },
      {
        id: "rectifier",
        name: "Rectifier frequency",
        formula: "half-wave: output ripple f     full-wave: 2f",
        legend: ["f = input frequency"],
      },
    ],
  },
  {
    chapter: "AC Circuits",
    playbookSlug: "ac-circuits",
    formulas: [
      {
        id: "rms",
        name: "RMS values",
        formula: "V_rms = V₀/√2     I_rms = I₀/√2",
        legend: ["Meters read RMS"],
      },
      {
        id: "reactance",
        name: "Reactance",
        formula: "X_L = ωL     X_C = 1/ωC",
        legend: ["ω = 2πf"],
      },
      {
        id: "impedance",
        name: "Series LCR",
        formula: "Z = √(R² + (X_L − X_C)²)     tan φ = (X_L − X_C)/R     V = √(V_R² + (V_L − V_C)²)",
        legend: ["φ = phase of voltage ahead of current"],
      },
      {
        id: "resonance",
        name: "Resonance",
        formula: "ω₀ = 1/√(LC)     Z = R     Q = ω₀L/R",
        legend: ["Current is largest at resonance"],
      },
      {
        id: "ac-power",
        name: "Power and transformer",
        formula: "P = V_rms I_rms cos φ     cos φ = R/Z\nV_s/V_p = N_s/N_p = I_p/I_s",
        legend: ["cos φ = power factor"],
      },
    ],
  },
  {
    chapter: "Electromagnetic Induction",
    playbookSlug: "electromagnetic-induction",
    formulas: [
      {
        id: "faraday",
        name: "Faraday's law",
        formula: "e = −N dΦ/dt     charge through the circuit q = NΔΦ/R",
        legend: ["Φ = BA cos θ"],
        notes: "The charge does not depend on how fast the flux changed.",
      },
      {
        id: "motional",
        name: "Motional EMF",
        formula: "sliding rod: e = Blv     rod rotating about an end: e = ½Bωl²     rotating coil: e₀ = NBAω",
        legend: ["l = length", "ω = angular speed"],
      },
      {
        id: "inductance",
        name: "Self and mutual inductance",
        formula: "e = −L dI/dt     U = ½LI²     e₂ = −M dI₁/dt",
        legend: ["L = self-inductance", "M = mutual inductance"],
      },
      {
        id: "lr",
        name: "LR circuit",
        formula: "I = I₀(1 − e^(−t/τ))     τ = L/R",
        legend: ["τ = time constant"],
      },
    ],
  },
  {
    chapter: "Kinetic Theory of Gases",
    playbookSlug: "kinetic-theory-of-gases",
    formulas: [
      {
        id: "rms-speed",
        name: "Molecular speeds",
        formula: "v_rms = √(3RT/M)     v_mean = √(8RT/πM)     v_mp = √(2RT/M)",
        legend: ["M = molar mass (kg/mol)", "T in kelvin"],
        notes: "All three ∝ √(T/M). Quadruple T to double the speed.",
      },
      {
        id: "pressure",
        name: "Pressure and kinetic energy",
        formula: "P = ⅓ρv²_rms     average KE per molecule = (3/2)kT",
        legend: ["ρ = density of the gas"],
      },
      {
        id: "equipartition",
        name: "Equipartition and specific heats",
        formula: "C_v = (f/2)R     C_p = C_v + R     γ = 1 + 2/f",
        legend: ["f = 3 (monatomic), 5 (diatomic)"],
      },
    ],
  },
  {
    chapter: "Motion in a Plane",
    playbookSlug: "motion-in-a-plane",
    formulas: [
      {
        id: "suvat",
        name: "Equations of motion",
        formula: "v = u + at     s = ut + ½at²     v² = u² + 2as     s_nth = u + a(n − ½)",
        legend: ["s_nth = distance in the nth second"],
      },
      {
        id: "projectile",
        name: "Projectile",
        formula: "R = u² sin 2θ / g     H = u² sin²θ / 2g     T = 2u sin θ / g",
        legend: ["θ measured above the horizontal"],
        notes: "Same range for θ and 90° − θ.",
      },
      {
        id: "circular",
        name: "Uniform circular motion",
        formula: "a = v²/r = ω²r     v = ωr",
        legend: ["r = radius"],
      },
    ],
  },
  {
    chapter: "Laws of Motion",
    playbookSlug: "laws-of-motion",
    formulas: [
      {
        id: "newton",
        name: "Newton's second law and the lift",
        formula: "F = ma     apparent weight: m(g + a) up, m(g − a) down, 0 in free fall",
        legend: ["a = acceleration of the lift"],
      },
      {
        id: "impulse",
        name: "Impulse and collisions",
        formula: "J = Δp = FΔt     e = (v₂ − v₁)/(u₁ − u₂)     rebound height = e²h",
        legend: ["e = coefficient of restitution"],
        notes: "Momentum is conserved in every collision; kinetic energy only in an elastic one.",
      },
    ],
  },
  {
    chapter: "Magnetic Fields Due to Electric Current",
    playbookSlug: "magnetic-fields-due-to-electric-current",
    formulas: [
      {
        id: "standard-fields",
        name: "Standard fields",
        formula: "long wire: μ₀I/2πr     loop centre: μ₀I/2R     arc of angle θ: μ₀Iθ/4πR     solenoid: μ₀nI",
        legend: ["n = turns per unit length", "θ in radians"],
        notes: "Add the parts with their directions — into and out of the page subtract.",
      },
      {
        id: "moving-charge",
        name: "Force on a moving charge",
        formula: "F = qvB sin θ     r = mv/qB     T = 2πm/qB",
        legend: ["The period does not depend on the speed"],
      },
      {
        id: "parallel-wires",
        name: "Parallel wires and the galvanometer",
        formula: "F/l = μ₀I₁I₂/2πd     m = NIA     τ = mB sin θ     current sensitivity = nBA/k",
        legend: ["Like currents attract", "k = torsion constant"],
      },
    ],
  },
  {
    chapter: "Thermal Properties of Matter",
    playbookSlug: "thermal-properties-of-matter",
    formulas: [
      {
        id: "stefan",
        name: "Stefan–Boltzmann law",
        formula: "P = σAeT⁴     net: P = σAe(T⁴ − T₀⁴)",
        legend: ["T in kelvin", "e = emissivity"],
        notes: "Double T (kelvin): power × 16.",
      },
      {
        id: "wien",
        name: "Wien's displacement law",
        formula: "λ_max T = b ≈ 2.9 × 10⁻³ m K",
        legend: ["λ_max = peak wavelength"],
      },
      {
        id: "cooling",
        name: "Newton's law of cooling",
        formula: "(T₁ − T₂)/t = k[(T₁ + T₂)/2 − T₀]",
        legend: ["T₀ = surroundings"],
      },
      {
        id: "expansion",
        name: "Thermal expansion",
        formula: "ΔL = LαΔT     β = 2α     γ = 3α",
        legend: ["β = area, γ = volume coefficient"],
      },
    ],
  },
  {
    chapter: "Dual Nature of Radiation and Matter",
    playbookSlug: "dual-nature-of-radiation-and-matter",
    formulas: [
      {
        id: "photoelectric",
        name: "Einstein's photoelectric equation",
        formula: "hν = φ + K_max     K_max = eV₀     hν₀ = φ     E(eV) = 1240/λ(nm)",
        legend: ["φ = work function", "V₀ = stopping potential"],
        notes: "Intensity changes the current, not V₀.",
      },
      {
        id: "de-broglie",
        name: "de Broglie wavelength",
        formula: "λ = h/p = h/√(2mK) = h/√(2mqV)     electron: λ = 1.227/√V nm",
        legend: ["K = kinetic energy", "V = accelerating voltage"],
      },
    ],
  },
  {
    chapter: "Current Electricity",
    playbookSlug: "current-electricity",
    formulas: [
      {
        id: "meters",
        name: "Ammeter and voltmeter",
        formula: "shunt: S = I_g G / (I − I_g)     series resistance: R = V/I_g − G",
        legend: ["G = galvanometer resistance", "I_g = full-scale current"],
      },
      {
        id: "bridges",
        name: "Wheatstone and meter bridge",
        formula: "balanced: P/Q = R/S     meter bridge: R/S = l/(100 − l)",
        legend: ["l = balancing length in cm"],
      },
      {
        id: "potentiometer",
        name: "Potentiometer",
        formula: "E₁/E₂ = l₁/l₂     r = R(l₁ − l₂)/l₂",
        legend: ["r = internal resistance of the cell"],
      },
    ],
  },
  {
    chapter: "Structure of Atoms and Nuclei",
    playbookSlug: "structure-of-atoms-and-nuclei",
    formulas: [
      {
        id: "bohr",
        name: "Bohr model",
        formula: "r ∝ n²/Z     v ∝ Z/n     E = −13.6 Z²/n² eV     KE = −E,  PE = 2E",
        legend: ["n = orbit number", "Z = atomic number"],
      },
      {
        id: "rydberg",
        name: "Hydrogen spectrum",
        formula: "1/λ = RZ²(1/n₁² − 1/n₂²)     Lyman n₁=1, Balmer 2, Paschen 3",
        legend: ["R = 1.097 × 10⁷ m⁻¹"],
      },
      {
        id: "decay",
        name: "Radioactive decay",
        formula: "N = N₀e^(−λt)     T½ = 0.693/λ     τ = 1/λ = 1.44 T½     after n half-lives N = N₀/2ⁿ",
        legend: ["λ = decay constant"],
      },
    ],
  },
  {
    chapter: "Thermodynamics",
    playbookSlug: "thermodynamics",
    formulas: [
      {
        id: "first-law",
        name: "First law",
        formula: "ΔQ = ΔU + ΔW     ΔU = nC_vΔT",
        legend: ["ΔW = work done BY the gas"],
      },
      {
        id: "processes",
        name: "Processes",
        formula: "isothermal: W = nRT ln(V₂/V₁)     adiabatic: PV^γ = constant, W = (P₁V₁ − P₂V₂)/(γ − 1)",
        legend: ["γ = C_p/C_v"],
      },
      {
        id: "carnot",
        name: "Carnot engine and refrigerator",
        formula: "η = 1 − T₂/T₁     COP = T₂/(T₁ − T₂)",
        legend: ["Temperatures in kelvin"],
      },
    ],
  },
  {
    chapter: "Gravitation",
    playbookSlug: "gravitation",
    formulas: [
      {
        id: "g-variation",
        name: "Variation of g",
        formula: "height: g R²/(R + h)² ≈ g(1 − 2h/R)     depth: g(1 − d/R)",
        legend: ["R = Earth's radius"],
        notes: "The small-height form fails at h ≈ R: there g is exactly g/4.",
      },
      {
        id: "orbits",
        name: "Orbits",
        formula: "v_o = √(GM/r)     T² ∝ r³     E = −GMm/2r",
        legend: ["r = orbit radius"],
      },
      {
        id: "escape",
        name: "Escape velocity",
        formula: "v_e = √(2GM/R) = √(2gR) = √2 × v_o (at the surface)",
        legend: ["Independent of the body's mass and launch direction"],
      },
    ],
  },
  {
    chapter: "Optics (Ray)",
    playbookSlug: "ray-optics",
    formulas: [
      {
        id: "lens-mirror",
        name: "Lens and mirror formulas",
        formula: "lens: 1/v − 1/u = 1/f     mirror: 1/v + 1/u = 1/f     P = 1/f (m)",
        legend: ["Cartesian sign convention"],
      },
      {
        id: "lensmaker",
        name: "Lensmaker and lenses in contact",
        formula: "1/f = (μ − 1)(1/R₁ − 1/R₂)     P = P₁ + P₂",
        legend: ["In a liquid: (μ_lens/μ_liquid − 1)"],
      },
      {
        id: "refraction",
        name: "Apparent depth and TIR",
        formula: "apparent depth = real depth / μ     sin C = 1/μ",
        legend: ["C = critical angle"],
      },
      {
        id: "prism",
        name: "Prism",
        formula: "μ = sin((A + δ_m)/2) / sin(A/2)     thin prism: δ = (μ − 1)A",
        legend: ["A = prism angle", "δ_m = minimum deviation"],
      },
    ],
  },
  {
    chapter: "Sound",
    playbookSlug: "sound",
    formulas: [
      {
        id: "doppler",
        name: "Doppler effect",
        formula: "f' = f (v + v_o)/(v − v_s)  (approach)     f' = f (v − v_o)/(v + v_s)  (recession)",
        legend: ["v = speed of sound", "v_o = observer", "v_s = source"],
      },
      {
        id: "speed-of-sound",
        name: "Speed of sound in a gas",
        formula: "v = √(γRT/M)     v ∝ √T",
        legend: ["Independent of pressure at fixed temperature"],
      },
    ],
  },
];

export const FORMULA_STATS = {
  formulas: FORMULA_GROUPS.reduce((s, g) => s + g.formulas.length, 0),
  chapters: FORMULA_GROUPS.length,
};
