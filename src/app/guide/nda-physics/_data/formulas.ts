/**
 * Content for /guide/nda-physics/formulas.
 *
 * The formula compendium — a single-page index of the ~30 essential formulas
 * NDA Physics actually tests, grouped by chapter. New page kind for /guide
 * (English doesn't need one; maths embeds formulas in principle pages).
 *
 * Formulas are written in plain-text + unicode (superscripts, Greek, ratios)
 * so the page can stay a server component without dragging in the KaTeX
 * pipeline. NDA Physics is qualitative-recall heavy — formulas are short
 * enough to read in plain text and that lowers the accessibility surface.
 *
 * The contract: every formula on this list has appeared (directly or by
 * symbol-level recall) in the 2017–2026 NDA PART B Physics bank at least
 * once. Editorial curation; not exhaustive.
 */

export type FormulaEntry = {
  /** Stable identifier (kebab-case). */
  id: string;
  /** What it's called. */
  name: string;
  /** The formula in plain-text + unicode. */
  formula: string;
  /** Symbol legend — one line per variable. */
  legend: string[];
  /** Optional trap/notes. Where students go wrong. */
  notes?: string;
};

export type FormulaGroup = {
  /** Chapter (matches CHAPTER_TABLE.chapter). */
  chapter: string;
  /** Playbook slug — used to link the group header to its deep-dive. */
  playbookSlug: string;
  formulas: FormulaEntry[];
};

export const FORMULA_GROUPS: FormulaGroup[] = [
  {
    chapter: "Units, Measurement and Dimensions",
    playbookSlug: "units-measurement-and-dimensions",
    formulas: [
      {
        id: "dim-force",
        name: "Dimensions of force, energy, pressure, power",
        formula: "[F] = M L T⁻²   [E] = M L² T⁻²   [P] = M L⁻¹ T⁻²   [W/t] = M L² T⁻³",
        legend: ["M = mass", "L = length", "T = time"],
        notes:
          "Recognise these by structure: anything with L² is energy/torque; anything with L⁻¹ is pressure or related to it.",
      },
      {
        id: "cgs-si",
        name: "CGS ↔ SI conversions",
        formula: "1 dyne = 10⁻⁵ N    1 erg = 10⁻⁷ J    1 poise = 0.1 Pa·s",
        legend: ["dyne = CGS force unit (g·cm·s⁻²)", "erg = CGS energy unit", "poise = CGS dynamic viscosity"],
      },
      {
        id: "light-year-parsec",
        name: "Astronomical distances",
        formula: "1 light year ≈ 9.46 × 10¹⁵ m    1 parsec ≈ 3.26 light years ≈ 2.06 × 10⁵ AU",
        legend: ["AU = astronomical unit ≈ 1.5 × 10¹¹ m (Earth–Sun distance)"],
      },
    ],
  },
  {
    chapter: "Kinematics and Motion",
    playbookSlug: "kinematics-and-motion",
    formulas: [
      {
        id: "kinematic-equations",
        name: "Equations of motion (constant acceleration)",
        formula: "v = u + at    s = ut + ½at²    v² = u² + 2as",
        legend: [
          "u = initial velocity",
          "v = final velocity",
          "a = acceleration (negative for deceleration)",
          "s = displacement (signed)",
          "t = time",
        ],
        notes:
          "These hold only for CONSTANT a. If a changes (e.g. two-phase motion), apply them piecewise and add. Sign convention: pick a +direction and stick to it.",
      },
      {
        id: "circular-motion",
        name: "Circular motion (centripetal acceleration)",
        formula: "a_c = v²/R = ω²R    where ω = 2π/T",
        legend: ["R = radius", "v = tangential speed", "ω = angular velocity", "T = period"],
        notes:
          "For UNIFORM circular motion |v| is constant, but v itself changes direction so there's still acceleration (always toward centre).",
      },
    ],
  },
  {
    chapter: "Laws of Motion and Forces",
    playbookSlug: "laws-of-motion-and-forces",
    formulas: [
      {
        id: "newton-second-law",
        name: "Newton's second law",
        formula: "F = ma = dp/dt",
        legend: ["F = net force", "m = mass", "a = acceleration", "p = momentum"],
      },
      {
        id: "momentum-impulse",
        name: "Momentum and impulse",
        formula: "p = mv    J = F·Δt = Δp",
        legend: ["p = momentum (vector)", "J = impulse", "Δp = change in momentum"],
        notes:
          "Impulse–momentum theorem is the lever for force-time graph problems: ∫F dt = area under F-t curve = Δp.",
      },
      {
        id: "conservation-momentum",
        name: "Conservation of momentum (isolated system)",
        formula: "m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
        legend: ["u = before-collision velocity", "v = after-collision velocity"],
        notes:
          "Always conserved if no external force. Energy may or may not be conserved (elastic vs inelastic). For recoil: 0 = m_gun·v_gun + m_bullet·v_bullet ⟹ v_gun is opposite-sign and much smaller (mass ratio).",
      },
    ],
  },
  {
    chapter: "Work, Energy and Power",
    playbookSlug: "work-energy-and-power",
    formulas: [
      {
        id: "work",
        name: "Work done by a force",
        formula: "W = F·d·cosθ",
        legend: ["F = magnitude of force", "d = displacement", "θ = angle between F and d"],
        notes:
          "Force perpendicular to displacement does ZERO work (cos 90° = 0). Classic trap: gravity on horizontal motion, magnetic force on charged particle.",
      },
      {
        id: "kinetic-energy",
        name: "Kinetic and potential energy",
        formula: "KE = ½mv²    PE = mgh    Total ME = KE + PE",
        legend: ["m = mass", "v = speed", "h = height above reference"],
        notes:
          "In free-fall (no air resistance), ME is conserved: ½mv₀² + mgh₀ = ½mv² + mgh. Use this to dodge integrating F over distance.",
      },
      {
        id: "power",
        name: "Power",
        formula: "P = W/t = F·v",
        legend: ["W = work done", "t = time", "F·v = instantaneous power if v is the speed at which F acts"],
        notes:
          "Constant-power machine on smooth surface: P=Fv ⟹ Fv=const. Combined with F=ma=m(dv/dt) gives v∝√t (not v∝t).",
      },
    ],
  },
  {
    chapter: "Gravitation",
    playbookSlug: "gravitation",
    formulas: [
      {
        id: "newton-gravitation",
        name: "Newton's law of gravitation",
        formula: "F = Gm₁m₂/r²",
        legend: [
          "G = 6.67 × 10⁻¹¹ N·m²·kg⁻²",
          "m₁, m₂ = masses",
          "r = distance between centres",
        ],
      },
      {
        id: "surface-gravity",
        name: "Surface gravity and escape velocity",
        formula: "g = GM/R²    v_esc = √(2gR) = √(2GM/R)",
        legend: ["M = planet mass", "R = planet radius", "v_esc = escape velocity from surface"],
        notes:
          "Planet-scaled ratio trap: if R halved and density 4× ⟹ M = (4ρ)(½·(4/3)πR³) = ½M_earth. New v_esc = √(2G·½M / ½R) = √(2GM/R) = same as Earth. Always compute step-by-step.",
      },
      {
        id: "kepler-third",
        name: "Kepler's third law (orbital period)",
        formula: "T² ∝ R³    ⟹   T₁/T₂ = (R₁/R₂)^(3/2)",
        legend: ["T = orbital period", "R = orbital radius"],
        notes:
          "Comes from balancing gravity = centripetal: GMm/R² = mv²/R = m·(2πR/T)²/R. Common shape: T₁/T₂ = (R/4R)^(3/2) = 1/8.",
      },
    ],
  },
  {
    chapter: "Fluid Mechanics and Properties of Matter",
    playbookSlug: "fluid-mechanics-and-properties-of-matter",
    formulas: [
      {
        id: "hydrostatic-pressure",
        name: "Hydrostatic pressure",
        formula: "P = hρg    (gauge)    P_abs = P_atm + hρg",
        legend: ["h = depth below free surface", "ρ = fluid density", "g = 9.8 m/s²"],
      },
      {
        id: "archimedes",
        name: "Archimedes' principle (buoyant force)",
        formula: "F_b = V_submerged · ρ_fluid · g",
        legend: [
          "V_submerged = volume of object IN the fluid (not total volume)",
          "ρ_fluid = density of fluid (not object)",
        ],
        notes:
          "Floating ⟹ F_b = mg ⟹ V_sub/V_total = ρ_object/ρ_fluid. Wholly submerged ⟹ F_b uses V_total.",
      },
      {
        id: "density-mixing",
        name: "Density of a mixture",
        formula: "Equal volumes: ρ_avg = (ρ₁+ρ₂)/2     Equal masses: ρ_avg = 2ρ₁ρ₂/(ρ₁+ρ₂)",
        legend: ["ρ₁, ρ₂ = densities of components"],
        notes:
          "Equal-mass formula is the harmonic mean — always SMALLER than the arithmetic mean. The 'equal-mass < equal-volume' inequality is the recurring buoyancy ratio trap.",
      },
    ],
  },
  {
    chapter: "Heat and Thermodynamics",
    playbookSlug: "heat-and-thermodynamics",
    formulas: [
      {
        id: "sensible-heat",
        name: "Sensible heat (no phase change)",
        formula: "Q = mcΔT",
        legend: ["m = mass", "c = specific heat capacity", "ΔT = temperature change"],
        notes:
          "Specific heat is per-unit-mass-per-unit-ΔT. Water: c = 4186 J/(kg·K) = 1 cal/(g·°C). Ice: c ≈ 2100 J/(kg·K) — half of water.",
      },
      {
        id: "latent-heat",
        name: "Latent heat (phase change at constant T)",
        formula: "Q = mL",
        legend: ["L = specific latent heat (kJ/kg)"],
        notes:
          "Water: L_fusion ≈ 334 kJ/kg, L_vaporisation ≈ 2260 kJ/kg. Phase change happens AT temperature (0 °C, 100 °C); no T change while changing phase. Forgetting a latent term in a calorimetry mix is the #1 trap.",
      },
      {
        id: "temperature-conversion",
        name: "Temperature scale conversions",
        formula: "T_C = (T_F − 32) × 5/9    T_K = T_C + 273.15",
        legend: ["C = Celsius", "F = Fahrenheit", "K = Kelvin"],
        notes:
          "F = C trap: only at −40° (the scales cross). K = F trap: only at 574.25 K. Always set up the equation, don't guess.",
      },
      {
        id: "ideal-gas",
        name: "Ideal gas law",
        formula: "PV = nRT",
        legend: [
          "P = pressure (Pa)",
          "V = volume (m³)",
          "n = moles",
          "R = 8.314 J/(mol·K)",
          "T = absolute temperature (K)",
        ],
        notes:
          "Process variants: isothermal (PV=const), isobaric (V/T=const), isochoric (P/T=const), adiabatic (PVⁿ=const, n=γ).",
      },
    ],
  },
  {
    chapter: "Oscillations and Waves",
    playbookSlug: "oscillations-and-waves",
    formulas: [
      {
        id: "pendulum-period",
        name: "Simple pendulum (small angle)",
        formula: "T = 2π√(L/g)",
        legend: ["T = period", "L = string length", "g = gravity"],
        notes:
          "MASS doesn't appear. Doubling mass changes nothing. Doubling L multiplies T by √2 ≈ 1.41. Moving to a planet with g/4 doubles T. This is the recurring ratio trap.",
      },
      {
        id: "wave-equation",
        name: "Wave equation",
        formula: "v = f·λ",
        legend: ["v = wave speed", "f = frequency (Hz)", "λ = wavelength"],
        notes:
          "Speed of sound in air ≈ 343 m/s at 20 °C. Speed of light c = 3 × 10⁸ m/s. The Doppler-style change-of-medium trap: frequency stays the same, λ changes.",
      },
    ],
  },
  {
    chapter: "Sound",
    playbookSlug: "sound",
    formulas: [
      {
        id: "sound-properties",
        name: "Sound wave property mapping",
        formula: "Amplitude → loudness    Frequency → pitch    Waveform → timbre/quality",
        legend: ["Each perception attribute maps to one physical property — don't swap them"],
        notes:
          "Loudness is measured in decibels (dB), NOT in Hz (that's pitch). Amplitude is in pressure (Pa) or displacement (m).",
      },
      {
        id: "echo-formula",
        name: "Echo distance",
        formula: "d = v·t/2",
        legend: ["d = distance to reflecting surface", "v = speed of sound", "t = round-trip time"],
        notes:
          "Divide by 2 — the round trip is 2d. Same formula powers SONAR (in water, v ≈ 1500 m/s) and the bat-echolocation question.",
      },
    ],
  },
  {
    chapter: "Light and Optics",
    playbookSlug: "light-and-optics",
    formulas: [
      {
        id: "mirror-lens-formula",
        name: "Mirror / lens formula (Cartesian sign convention)",
        formula: "1/v − 1/u = 1/f    (lens)    1/v + 1/u = 1/f   (mirror)",
        legend: [
          "u = object distance (NEGATIVE for real object)",
          "v = image distance (sign tells real/virtual)",
          "f = focal length (negative for concave lens / convex mirror)",
        ],
        notes:
          "Sign convention is the #1 trap. NDA uses Cartesian (distances measured from pole, +x to the right). Object always at NEGATIVE u in this convention. Magnification: m = v/u (lens) or m = −v/u (mirror).",
      },
      {
        id: "lens-power",
        name: "Lens power",
        formula: "P = 1/f    (f in metres, P in dioptres)",
        legend: ["P > 0 for convex (converging) lens", "P < 0 for concave (diverging) lens"],
        notes:
          "Combine thin lenses in contact: P_total = P₁ + P₂. Convert cm to m first.",
      },
      {
        id: "snell-refraction",
        name: "Snell's law and refractive index",
        formula: "μ = sin i / sin r    n = c/v",
        legend: [
          "i = angle of incidence (from normal)",
          "r = angle of refraction",
          "μ, n = refractive index",
          "c = speed of light in vacuum, v = speed in medium",
        ],
        notes:
          "Higher μ = slower light in medium. Vacuum: μ = 1. Water ≈ 1.33, glass ≈ 1.5, diamond ≈ 2.4.",
      },
      {
        id: "tir-critical-angle",
        name: "Total internal reflection (critical angle)",
        formula: "sin θ_c = 1/μ",
        legend: ["θ_c = critical angle for the denser medium"],
        notes:
          "TIR happens only going DENSE → RARE (e.g. water → air, glass → air). For glass (μ=1.5), θ_c ≈ 42°.",
      },
    ],
  },
  {
    chapter: "Electricity and Magnetism",
    playbookSlug: "electricity-and-magnetism",
    formulas: [
      {
        id: "ohms-law",
        name: "Ohm's law",
        formula: "V = IR",
        legend: ["V = potential difference (volts)", "I = current (amperes)", "R = resistance (ohms)"],
      },
      {
        id: "resistor-combinations",
        name: "Resistor combinations",
        formula: "Series: R_total = R₁ + R₂ + ...    Parallel: 1/R_total = 1/R₁ + 1/R₂ + ...",
        legend: ["Series: same I through all, V splits", "Parallel: same V across all, I splits"],
        notes:
          "For TWO parallel resistors: R = R₁R₂/(R₁+R₂). For N identical R in parallel: R/N. For N identical R in series: NR. Heat in parallel vs series with same V: P_parallel/P_series = (R_series/R_parallel) — usually 4× for two equal R.",
      },
      {
        id: "electrical-power",
        name: "Electrical power",
        formula: "P = VI = I²R = V²/R",
        legend: ["Pick the form that matches the GIVEN: V&I, I&R, or V&R"],
        notes:
          "1 unit (kWh) = 1000 W × 1 h = 3.6 × 10⁶ J. Cost = P(kW) × t(h) × rate(₹/unit).",
      },
      {
        id: "resistivity",
        name: "Resistivity",
        formula: "R = ρL/A",
        legend: [
          "ρ = resistivity (material property, Ω·m)",
          "L = length",
          "A = cross-sectional area",
        ],
        notes:
          "Stretching a wire keeps volume const: if L doubles, A halves, R quadruples (∝L²). Bending or coiling doesn't change R.",
      },
      {
        id: "lorentz-force",
        name: "Force on a charge in a magnetic field",
        formula: "F = qvB sin θ    (direction: F ⊥ both v and B)",
        legend: ["q = charge", "v = velocity", "B = magnetic field", "θ = angle between v and B"],
        notes:
          "Positive and negative charges deflect in OPPOSITE directions. If v ∥ B (θ=0), force is zero. Right-hand rule: thumb=v, fingers=B, palm=F for positive charge.",
      },
    ],
  },
  {
    chapter: "Modern Physics",
    playbookSlug: "modern-physics",
    formulas: [
      {
        id: "planck-einstein",
        name: "Planck–Einstein relation",
        formula: "E = hf = hc/λ",
        legend: [
          "E = photon energy",
          "h = 6.63 × 10⁻³⁴ J·s (Planck's constant)",
          "f = frequency, λ = wavelength",
          "c = 3 × 10⁸ m/s",
        ],
        notes:
          "Higher frequency = more energetic photon. UV more energetic than visible more than IR. Dimensions of h are the same as angular momentum: M L² T⁻¹.",
      },
    ],
  },
];

/** Quick stats for the formulas hero. */
export const FORMULA_STATS = {
  formulas: FORMULA_GROUPS.reduce((s, g) => s + g.formulas.length, 0),
  chapters: FORMULA_GROUPS.length,
};
