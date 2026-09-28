/**
 * Deep-dive content for the 9 LONG-TAIL playbooks of
 * /guide/mht-cet-physics/playbooks/{slug}. Same sources and rules as
 * playbook-details-core.ts.
 */

import type { PlaybookDetail } from "./types";

export const TAIL_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  "magnetic-fields-due-to-electric-current": {
    slug: "magnetic-fields-due-to-electric-current",
    trigger:
      "A straight wire, a loop, an arc or a solenoid carrying current; a charge moving through a field; two parallel wires; or a moving-coil galvanometer.",
    story: [
      "98 q at 2.42 a paper, 29% HARD. Magnetic Field of Current-Carrying Conductor is more than half the chapter (52 q, 33%), and much of it is a figure: two wires crossing, an arc joined to straight leads, a loop inside a loop. The fields must be added with their directions, and a field INTO the page and one OUT of it subtract.",
      "The cheap page is Force on Moving Charge in Magnetic Field (12 q, 0% HARD): F = qvB sin θ, and a charge moving perpendicular to B goes round a circle of radius r = mv/qB. Force between parallel wires (14 q, 43%) is the expensive one — currents in the same direction attract.",
      "The galvanometer page (20 q, 25%) connects to Current Electricity: the current sensitivity nBA/k, and a loop's magnetic moment m = NIA.",
    ],
    subSkills: [
      {
        name: "Standard fields",
        description:
          "Long wire μ₀I/2πr; centre of a loop μ₀I/2R; arc of angle θ μ₀Iθ/4πR; solenoid μ₀nI. A straight lead pointing at the centre adds nothing.",
      },
      { name: "Force on a moving charge", description: "F = qvB sin θ; circular path r = mv/qB, period 2πm/qB (independent of speed)." },
      { name: "Parallel wires", description: "Force per length μ₀I₁I₂/2πd; like currents attract." },
      { name: "Magnetic moment and galvanometer", description: "m = NIA; torque = mB sin θ; current sensitivity = nBA/k." },
    ],
    traps: [
      {
        name: "Adding fields without their directions",
        description: "In a figure of wires and arcs, each part's field is into or out of the page. Opposite directions subtract. The all-added option is always printed.",
      },
      {
        name: "Counting the straight leads",
        description: "A straight wire whose line passes through the point gives zero field there. Only the arcs and the other wires count.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["electromagnetic-induction", "current-electricity", "electrostatics"],
  },

  "thermal-properties-of-matter": {
    slug: "thermal-properties-of-matter",
    trigger: "A hot body radiating, a black body and its peak wavelength, a body cooling, a rod or plate expanding, or heat flowing through a slab.",
    story: [
      "84 q at 2.13 a paper, 17% HARD — and on this paper the chapter is mostly radiation: Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body is 53 of the 84 questions at 23% HARD.",
      "Almost every radiation question is a ratio. Stefan: P = σAeT⁴, so doubling the absolute temperature multiplies the power by 16. Wien: λ_max T = constant, so a hotter body peaks at a shorter wavelength. Newton's law of cooling: the rate of cooling is proportional to the excess temperature, used with the average temperature over an interval.",
      "Thermal expansion (19 q, 11%) is β = 2α and γ = 3α. Conduction (8 q) and calorimetry (4 q) are small and have never produced a HARD question.",
    ],
    subSkills: [
      { name: "Stefan–Boltzmann", description: "P = σAeT⁴ with T in kelvin. Net loss to surroundings ∝ T⁴ − T₀⁴." },
      { name: "Wien's law", description: "λ_max T = b ≈ 2.9 × 10⁻³ m K." },
      { name: "Newton's law of cooling", description: "(T₁ − T₂)/t = k[(T₁ + T₂)/2 − T₀]. Use it twice and take the ratio." },
      { name: "Expansion", description: "ΔL = LαΔT; area β = 2α; volume γ = 3α." },
    ],
    traps: [
      {
        name: "Using Celsius in Stefan's law",
        description: "T⁴ needs kelvin. 227 °C to 727 °C is 500 K to 1000 K: power ×16, not ×(727/227)⁴.",
      },
      {
        name: "Forgetting the surroundings",
        description: "A body in a room at T₀ loses net power σAe(T⁴ − T₀⁴). Using T⁴ alone overstates the loss.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["kinetic-theory-of-gases", "thermodynamics"],
  },

  "dual-nature-of-radiation-and-matter": {
    slug: "dual-nature-of-radiation-and-matter",
    trigger: "Light falling on a metal — work function, threshold, stopping potential, photocurrent graphs — or the wavelength of a moving particle.",
    story: [
      "82 q at 2.04 a paper, 32% HARD — the hardest chapter in the Physics bank. But it is also one of the narrowest: two equations carry all of it. Photoelectric Effect is 56 questions at 36% HARD; de Broglie Wavelength and Matter Waves is 26 at 23%.",
      "The photoelectric equation is hν = φ + ½mv²_max, and eV₀ = ½mv²_max. Below the threshold frequency nothing is emitted whatever the intensity; above it, intensity sets the NUMBER of electrons (the current) and frequency sets their energy (the stopping potential). The graph questions test exactly that split.",
      "de Broglie: λ = h/p = h/√(2mK) = h/√(2mqV). For an electron accelerated through V volts, λ ≈ 1.227/√V nm. Doubling the kinetic energy divides λ by √2.",
    ],
    subSkills: [
      { name: "Einstein's equation", description: "hν = φ + K_max, K_max = eV₀. Threshold: hν₀ = φ. In eV: E = 1240/λ(nm)." },
      { name: "Intensity vs frequency", description: "Intensity raises the current and leaves V₀ unchanged; frequency raises V₀ and leaves the saturation current unchanged." },
      { name: "de Broglie wavelength", description: "λ = h/√(2mK). Electron through V volts: λ = 1.227/√V nm." },
    ],
    traps: [
      {
        name: "Letting intensity change the stopping potential",
        description: "Brighter light of the same frequency gives more electrons, not faster ones. The stopping potential does not move; the saturation current does.",
      },
      {
        name: "Doubling the frequency doubles the energy",
        description: "K_max = hν − φ. Doubling ν more than doubles K_max, because φ stays fixed. Ratio questions print the 'doubles' option.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["structure-of-atoms-and-nuclei", "wave-optics"],
  },

  "current-electricity": {
    slug: "current-electricity",
    trigger: "A network of resistors and cells, a potentiometer or meter bridge, or turning a galvanometer into an ammeter or voltmeter.",
    story: [
      "82 q at 1.96 a paper, 24% HARD. Galvanometer, Ammeter, and Voltmeter Conversion (24 q, 17%) and Kirchhoff's Laws (19 q, 16%) are the cheap entry. An ammeter is a galvanometer with a small SHUNT in parallel; a voltmeter is one with a large resistance in series.",
      "The bridges carry the HARD: Wheatstone Bridge and Meter Bridge is 17 questions at 35%, and Potentiometer 18 at 28%. A bridge is balanced only when P/Q = R/S; when it is, the galvanometer arm carries no current and can be removed. When it is not — and some that look balanced are not — current flows through that arm and the circuit must be solved with Kirchhoff.",
      "A potentiometer compares EMFs by balancing lengths: E₁/E₂ = l₁/l₂, and the internal resistance r = R(l₁ − l₂)/l₂.",
    ],
    subSkills: [
      { name: "Meter conversion", description: "Shunt S = I_g G/(I − I_g) in parallel for an ammeter; series R = V/I_g − G for a voltmeter." },
      { name: "Kirchhoff's laws", description: "Current in = current out at a junction; the EMFs round a loop equal the IR drops." },
      { name: "Bridges", description: "Balanced when P/Q = R/S. Meter bridge: R/S = l/(100 − l)." },
      { name: "Potentiometer", description: "E₁/E₂ = l₁/l₂; r = R(l₁ − l₂)/l₂. Sensitivity rises with the wire's length." },
    ],
    traps: [
      {
        name: "Deleting the galvanometer from an unbalanced bridge",
        description: "The arm carries no current only when P/Q = R/S. Check the ratio first; a bridge with arms 4, 4, 1 and 3 Ω is not balanced.",
      },
      {
        name: "Shunt in series",
        description: "An ammeter's shunt goes in PARALLEL and is small; a voltmeter's resistance goes in SERIES and is large. The two are swapped in the options.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["electrostatics", "magnetic-fields-due-to-electric-current", "semiconductor-devices"],
  },

  "structure-of-atoms-and-nuclei": {
    slug: "structure-of-atoms-and-nuclei",
    trigger: "A Bohr orbit — radius, speed, energy — a spectral line of hydrogen, or a sample decaying with a half-life.",
    story: [
      "85 q at 1.96 a paper, 22% HARD. Radioactive Decay and Half-Life is the cheap page (18 q, 6%): after n half-lives N = N₀/2ⁿ, and the mean life is 1.44 times the half-life.",
      "The Bohr page (39 q, 28%) is scaling laws: r ∝ n²/Z, v ∝ Z/n, E ∝ −Z²/n². Almost every question is a ratio between two orbits or two atoms, and answering it from the proportion is faster and safer than computing each value.",
      "The hydrogen spectrum (28 q, 25%) is 1/λ = RZ²(1/n₁² − 1/n₂²) with the right lower level: Lyman 1, Balmer 2, Paschen 3. The longest wavelength of a series is its FIRST line, the shortest its limit.",
    ],
    subSkills: [
      { name: "Bohr scaling", description: "r ∝ n²/Z, v ∝ Z/n, E = −13.6Z²/n² eV. Kinetic energy = −E, potential energy = 2E." },
      { name: "Spectral series", description: "1/λ = RZ²(1/n₁² − 1/n₂²). Lyman n₁ = 1 (UV), Balmer 2 (visible), Paschen 3 (IR)." },
      { name: "Radioactive decay", description: "N = N₀e^(−λt), T½ = 0.693/λ, mean life τ = 1/λ = 1.44 T½." },
    ],
    traps: [
      {
        name: "Longest vs shortest wavelength in a series",
        description:
          "The longest wavelength is the smallest energy jump — the first line (n₂ = n₁ + 1). The shortest is the series limit (n₂ = ∞). Ratio questions print both orders.",
      },
      {
        name: "Signs of the Bohr energies",
        description: "Total energy is negative; kinetic energy is its magnitude; potential energy is twice the total. A higher orbit has LESS kinetic energy.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["dual-nature-of-radiation-and-matter", "semiconductor-devices"],
  },

  thermodynamics: {
    slug: "thermodynamics",
    trigger: "Heat supplied and work done by a gas, an isothermal or adiabatic change, a p–V diagram, or a heat engine or refrigerator.",
    story: [
      "84 q at 1.92 a paper, 21% HARD. First Law, Internal Energy, and Work-Heat Relations (37 q, 11%) is the cheap page: ΔQ = ΔU + ΔW, with ΔU = nC_vΔT whatever the process.",
      "The HARD sits on Isothermal, Adiabatic, Isobaric, and Isochoric Processes (36 q, 31%): PV^γ = constant for an adiabatic change, work in an isothermal expansion nRT ln(V₂/V₁), and work as the area under a p–V curve — enclosed by a cycle, positive if the cycle runs clockwise.",
      "Carnot Engine, Efficiency, and Refrigerator is small (11 q, 27%): η = 1 − T₂/T₁ with temperatures in kelvin, and the coefficient of performance of a refrigerator T₂/(T₁ − T₂).",
    ],
    subSkills: [
      { name: "First law", description: "ΔQ = ΔU + ΔW. ΔU depends only on ΔT: nC_vΔT." },
      { name: "The four processes", description: "Isothermal ΔU = 0; adiabatic ΔQ = 0 and PV^γ = constant; isochoric ΔW = 0; isobaric ΔW = PΔV." },
      { name: "Work from a p–V diagram", description: "Work = area under the curve; for a cycle, the enclosed area, clockwise positive." },
      { name: "Heat engines", description: "η = 1 − T₂/T₁ (kelvin). Refrigerator COP = T₂/(T₁ − T₂)." },
    ],
    traps: [
      {
        name: "Letting ΔU depend on the path",
        description: "Internal energy is a state function: two processes between the same end states have the same ΔU, however different their Q and W.",
      },
      {
        name: "Celsius in the efficiency",
        description: "η = 1 − T₂/T₁ needs kelvin. An engine between 27 °C and 327 °C has η = 1 − 300/600 = 50%, not 92%.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["kinetic-theory-of-gases", "thermal-properties-of-matter"],
  },

  gravitation: {
    slug: "gravitation",
    trigger: "g at a height or a depth, a satellite's orbit or period, escape velocity, or the energy to move a body away from Earth.",
    story: [
      "80 q at 1.75 a paper, 23% HARD — and it HALVED in 2025: 2.26 a paper across the 27 papers of 2023-24, 1.15 across the 13 of 2025. It is still set every year, so cut its hours rather than the chapter.",
      "Keep one page whatever else you cut: Variation of g with Depth, Altitude, Density, and Latitude is 33 questions at 3% HARD. g at height h is g(1 − 2h/R) for small h; at depth d it is g(1 − d/R); at the centre it is zero.",
      "The HARD is in the energy pages: Gravitational PE, Escape Velocity, and Energy (19 q, 42%) and Satellites (21 q, 29%). Escape velocity √(2gR) is √2 times the orbital speed near the surface, and a satellite's total energy is half its potential energy.",
    ],
    subSkills: [
      { name: "Variation of g", description: "Height: g(1 − 2h/R) for h ≪ R, g R²/(R + h)² in general. Depth: g(1 − d/R). g ∝ ρR at the surface." },
      { name: "Orbits", description: "v_o = √(GM/r); T² ∝ r³ (Kepler). Geostationary period 24 h." },
      { name: "Energy and escape", description: "U = −GMm/r; orbital E = −GMm/2r; v_e = √(2GM/R) = √2 v_o at the surface." },
    ],
    traps: [
      {
        name: "Using the small-height formula at large heights",
        description: "g(1 − 2h/R) holds only for h ≪ R. At h = R, g is g/4 exactly, not zero.",
      },
      {
        name: "Letting escape velocity depend on the mass or angle",
        description: "Escape velocity does not depend on the body's mass or the direction of launch. Options that scale it with m are wrong.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["rotational-dynamics", "motion-in-a-plane"],
  },

  "ray-optics": {
    slug: "ray-optics",
    trigger: "A lens or mirror with an object distance, a slab or a liquid and apparent depth, a prism and its deviation, or a microscope or telescope.",
    story: [
      "78 q at 1.50 a paper, 29% HARD — and it HALVED in 2025: 2.19 a paper across 2023-24, 1.08 across 2025. Still live, but no longer worth two questions of prep.",
      "Lenses (24 q, 25%) and Refraction, Apparent Depth, and Total Internal Reflection (26 q, 27%) are the core. 1/v − 1/u = 1/f with the sign convention; power P = 1/f in metres; lenses in contact add their powers. Apparent depth is real depth over μ, and TIR needs sin C = 1/μ.",
      "The prism page (17 q) is the most expensive at 47% HARD: minimum deviation μ = sin((A + δ)/2)/sin(A/2), and a thin prism deviates by (μ − 1)A.",
    ],
    subSkills: [
      { name: "Lens and mirror formulas", description: "Lens 1/v − 1/u = 1/f; mirror 1/v + 1/u = 1/f. Magnification v/u (lens) or −v/u (mirror)." },
      { name: "Power and lensmaker", description: "P = 1/f (m); in contact P = P₁ + P₂; lensmaker 1/f = (μ − 1)(1/R₁ − 1/R₂)." },
      { name: "Refraction and TIR", description: "Apparent depth = real/μ; critical angle sin C = 1/μ." },
      { name: "Prism", description: "A = r₁ + r₂; minimum deviation μ = sin((A + δ_m)/2)/sin(A/2); thin prism δ = (μ − 1)A." },
    ],
    traps: [
      {
        name: "Dropping the sign convention",
        description: "Object distances are negative in the Cartesian convention. A concave lens has negative f. One lost sign flips a real image to a virtual one.",
      },
      {
        name: "A lens in a liquid keeps its focal length",
        description: "Immersed in a liquid, (μ − 1) becomes (μ_lens/μ_liquid − 1), and the focal length grows. It can even change sign.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["wave-optics", "dual-nature-of-radiation-and-matter"],
  },

  sound: {
    slug: "sound",
    trigger: "A source or observer moving, a pipe resonating, overtones, or two sources producing beats.",
    story: [
      "47 q at 1.04 a paper, 21% HARD. Doppler Effect — Moving Source and Observer (19 q, 16%) and Pipes, Resonance, Overtones, and Beats (22 q, 27%) are nearly all of it.",
      "Doppler: f' = f (v ± v_o)/(v ∓ v_s), the upper signs for approach. The same speed moves the pitch more when the SOURCE moves than when the observer does — a comparison the paper sets directly.",
      "The pipes and beats are the same material as Superposition of Waves. Prepare the two chapters together and Sound costs little extra.",
    ],
    subSkills: [
      { name: "Doppler", description: "f' = f(v + v_o)/(v − v_s) on approach; flip both signs on recession." },
      { name: "Pipes and overtones", description: "Open: all harmonics; closed: odd only. First overtone = second harmonic (open), third (closed)." },
      { name: "Speed of sound", description: "v ∝ √T for a gas; independent of pressure at fixed temperature." },
    ],
    traps: [
      {
        name: "Treating a moving source like a moving observer",
        description: "At the same speed a moving source shifts the pitch more than a moving observer. Swapping the formulas gives the other printed option.",
      },
      {
        name: "Pressure changing the speed of sound",
        description: "At constant temperature, v does not depend on pressure. Options that scale v with P are wrong.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["superposition-of-waves", "oscillations"],
  },
};
