/**
 * Per-playbook deep-dive content for /guide/nda-physics/playbooks/{slug}.
 *
 * Each entry mirrors the english shape: trigger (one-line "when to reach for
 * this"), story (2–3 paragraph teacherly explanation), sub-skills (the rules
 * / patterns inside), traps (chapter-specific distractor shapes), worked
 * example UUIDs (2 per playbook, resolved via loadWorkedExamples at request
 * time), and relatedSlugs (cross-links to other playbooks).
 *
 * UUIDs SQL-picked against the live 449-q NDA Physics PUBLIC bank — recent
 * year first, with at least one HARD where the chapter has a HARD pool to
 * illustrate. All 14 chapters have details; none ship as "coming soon."
 */

export type PlaybookDetail = {
  /** One-line "when to use" cue. */
  trigger: string;
  /** 2–3 paragraph teacherly explanation. */
  story: string[];
  /** The rules / sub-skills inside this playbook. */
  subSkills: { name: string; description: string }[];
  /** Distractor patterns specific to this playbook. */
  traps: { name: string; description: string }[];
  /** Ordered worked-example UUIDs from the bank. */
  exampleQuestionIds: string[];
  /** Cross-link to 2–3 related playbook slugs. */
  relatedSlugs: string[];
};

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // ─────────────────────── RECALL ───────────────────────
  sound: {
    trigger:
      "A sound-property statement, a v=fλ plug-in, a SONAR distance, an ear-anatomy match, or a beats question.",
    story: [
      "34 q in 10 years, 1 HARD across the whole chapter. NDA's lowest-difficulty chapter. The work is recognition: 'amplitude controls loudness, frequency controls pitch, waveform controls quality' — the three-line table memorised cold answers 60% of the recall items.",
      "v = f·λ is the one formula. Speed of sound in air ≈ 343 m/s at 20 °C, in water ≈ 1500 m/s, in steel ≈ 5000 m/s. SONAR (water echolocation, ships) and ultrasound (medical imaging, bat navigation) use the same echo formula d = v·t/2.",
      "Ear anatomy: ossicles (hammer-anvil-stirrup) transmit, cochlea converts pressure→electrical via hair cells, auditory nerve carries signal to brain. Test rarely goes deeper than 'which part converts to electrical signal' (cochlea/hair cells).",
    ],
    subSkills: [
      {
        name: "Sound property mapping",
        description:
          "Amplitude → loudness (dB). Frequency → pitch (Hz). Waveform → timbre / quality. NEVER swap them.",
      },
      {
        name: "v = f·λ plug-in",
        description:
          "Identify which of {v, f, λ} is given and which is missing. Convert units (cm → m, Hz → kHz) before plugging.",
      },
      {
        name: "Echo / SONAR formula",
        description:
          "Round trip is 2d. d = v·t/2. For SONAR in water v ≈ 1500 m/s, in air v ≈ 343 m/s. Watch the divide-by-2.",
      },
      {
        name: "Ear → SONAR vocabulary recall",
        description:
          "Audible range 20 Hz – 20 kHz, infrasound < 20 Hz, ultrasound > 20 kHz. Bats use ultrasound; whales use a mix; humans hear neither extreme.",
      },
    ],
    traps: [
      {
        name: "Amplitude in Hz",
        description:
          "Wrong option says 'amplitude is measured in Hz.' Amplitude is pressure or displacement, NOT frequency. Hz belongs to frequency.",
      },
      {
        name: "Forgetting /2 on echo",
        description:
          "d = v·t (whole trip) vs d = v·t/2 (one-way). The trap option uses the whole trip — picks v·t as the distance.",
      },
    ],
    exampleQuestionIds: [
      "4d92e75e-1222-4d5b-8ccc-d49e87845cce", // MOD 2026 — speed of sound in gas, pressure double
      "8da91884-a246-4048-9abe-1aebaf27af39", // MOD 2022 — sound 1 kHz, 50 cm wavelength, 1 km time
    ],
    relatedSlugs: ["oscillations-and-waves", "light-and-optics", "modern-physics"],
  },

  "modern-physics": {
    trigger:
      "An atomic-structure recall (electron/proton/neutron mass), a nuclear fission/fusion statement, a photoelectric phrase, a scientist–discovery pair, or an LED/LASER acronym.",
    story: [
      "25 q across 10 years, ZERO HARD. The chapter rewards memorisation discipline more than any other in NDA Physics. The work is flashcard-style: scientist pairs, acronyms, and the three-tier atomic model history (Dalton → Thomson plum-pudding → Rutherford nuclear → Bohr quantised orbits).",
      "Photoelectric effect tests its qualitative shape, not its math: light KICKS electrons from a metal surface, threshold frequency below which nothing happens regardless of intensity, KE depends on frequency above threshold. E = hf is the only formula and it's tested via dimensions ('what are the dimensions of Planck's constant?') more than plug-in.",
      "Nuclear physics is statement-truth: fission (heavy splits) powers reactors and bombs; fusion (light combines) powers the sun and hydrogen bombs. The 'binding energy per nucleon' curve peaks around iron-56 — heavier-than-iron fuses release energy, lighter-than-iron split releases.",
    ],
    subSkills: [
      {
        name: "Scientist → discovery pairing",
        description:
          "8 canonical pairs cold: Chadwick=neutron, Einstein=photoelectric, Marie Curie=radium/polonium, Rutherford=nuclear, Bohr=atomic, Planck=quantum, J.J. Thomson=electron, Roentgen=X-rays.",
      },
      {
        name: "Acronym expansion",
        description:
          "LED = Light Emitting Diode. LASER = Light Amplification by Stimulated Emission of Radiation. MASER = Microwave. NMR = Nuclear Magnetic Resonance. MRI = Magnetic Resonance Imaging.",
      },
      {
        name: "Atomic model history",
        description:
          "Dalton (indivisible atom) → Thomson (plum pudding) → Rutherford (gold-foil ⟹ small dense nucleus) → Bohr (quantised orbits) → quantum mechanics (probability clouds).",
      },
      {
        name: "Fission vs fusion",
        description:
          "Fission = heavy nucleus splits (U-235 in reactors, atom bomb). Fusion = light nuclei combine (sun, hydrogen bomb). Both release energy because of binding-energy-per-nucleon shape.",
      },
    ],
    traps: [
      {
        name: "Photoelectric — intensity vs frequency",
        description:
          "Intensity below threshold frequency does NOTHING. Above threshold, intensity controls number of electrons, frequency controls their KE. The wrong option swaps these.",
      },
      {
        name: "X-rays vs gamma rays",
        description:
          "Both EM radiation. X-rays come from atomic transitions (electron shells); gamma from nuclear transitions. Common trap: 'X-rays come from the nucleus.'",
      },
    ],
    exampleQuestionIds: [
      "e9601a61-7b6d-4c05-bdd6-69284c00da95", // MOD 2025 — dimensions of h
      "68f56d32-48d5-41ff-b482-dc682a92ac40", // MOD 2021 — scientist-discovery pairs
    ],
    relatedSlugs: ["units-measurement-and-dimensions", "astronomy-and-space"],
  },

  "units-measurement-and-dimensions": {
    trigger:
      "A 'find the dimensional formula of X', a unit-conversion (1 dyne = ? N), a 'which is dimensionless?', a match-list of quantity↔unit, or a precision/least-count question.",
    story: [
      "14 q across 10 years, all under one subtopic (Units and Dimensions). The chapter sets up everything else — dimensional analysis catches algebra errors, and unit conversions appear inside other chapters' calculations too.",
      "Memorise 6 dimensional formulas: Force M·L·T⁻², Energy M·L²·T⁻², Pressure M·L⁻¹·T⁻², Power M·L²·T⁻³, Planck's constant M·L²·T⁻¹ (same as angular momentum), G M⁻¹·L³·T⁻². Anything else can be reconstructed from F=ma or E=½mv² in 30 seconds.",
      "Dimensionless quantities: angle (rad), refractive index, dielectric constant, specific gravity, strain, coefficients of friction, Reynolds number. They're all ratios of like-with-like.",
    ],
    subSkills: [
      {
        name: "Dimensional formula derivation",
        description:
          "Start from F = ma or E = ½mv², derive everything else. Force = [M·L·T⁻²]. Energy = [M·L²·T⁻²]. Pressure = Force/Area = [M·L⁻¹·T⁻²].",
      },
      {
        name: "CGS ↔ SI conversion",
        description:
          "1 dyne = 10⁻⁵ N (g·cm·s⁻² vs kg·m·s⁻²). 1 erg = 10⁻⁷ J. 1 poise = 0.1 Pa·s. Build conversions from the unit definitions.",
      },
      {
        name: "Dimensionless detection",
        description:
          "If the quantity is a RATIO of two same-dimension things, it's dimensionless. Angle = arc/radius. Refractive index = c/v_medium. Strain = Δl/l.",
      },
      {
        name: "Least count / precision",
        description:
          "Least count = smallest measurable unit (1 mm on a metre scale, 0.01 mm on a vernier). Precision relates to least count; accuracy relates to systematic error. Don't conflate.",
      },
    ],
    traps: [
      {
        name: "L⁻¹ vs L",
        description:
          "Pressure is M·L⁻¹·T⁻² (force per AREA — area is L², so dividing gives L⁻¹ in the L-tally). Energy density is also M·L⁻¹·T⁻². If you write +1 instead of −1 you've inverted the answer.",
      },
      {
        name: "Confusing precision and accuracy",
        description:
          "Precision = consistency / least count. Accuracy = closeness to true value. A precise-but-inaccurate measurement clusters around a wrong value. NDA tests precision more than accuracy.",
      },
    ],
    exampleQuestionIds: [
      "5deaac34-7d1a-4092-adf7-2b548daa325e", // MOD 2022 — dim of gravitational constant
      "eef81c32-7ef0-45df-bb5c-f58141ae96a8", // MOD 2019 — 1 dyne equals
    ],
    relatedSlugs: ["modern-physics", "kinematics-and-motion", "laws-of-motion-and-forces"],
  },

  "astronomy-and-space": {
    trigger:
      "A light-year/parsec definition, planets-by-size, black hole / star-collapse statement.",
    story: [
      "4 q across 10 years. The whole playbook is a 4-fact list: light year ≈ 9.46×10¹⁵ m, parsec ≈ 3.26 light years ≈ 206,265 AU, Jupiter is the largest planet, black hole = collapsed remnant of a massive star. That's it. Don't over-invest.",
      "Memorise the planet order by distance from sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune (Pluto demoted to dwarf planet in 2006). By size: Jupiter > Saturn > Uranus > Neptune > Earth > Venus > Mars > Mercury.",
    ],
    subSkills: [
      {
        name: "Astronomical distance recall",
        description:
          "1 AU ≈ 1.5 × 10¹¹ m (Earth–Sun). 1 light year ≈ 9.46 × 10¹⁵ m. 1 parsec ≈ 3.26 light years ≈ 206,265 AU. All units of distance, not time.",
      },
      {
        name: "Planet trivia",
        description:
          "Jupiter = largest, Mercury = smallest (post-Pluto-demotion). Venus = hottest. Mars = red. Saturn = rings. Uranus = tilted axis.",
      },
    ],
    traps: [
      {
        name: "Light year as a time unit",
        description:
          "Light year is a unit of DISTANCE (the distance light travels in 1 year), not time. Standard wrong option: 'measurement of time.'",
      },
    ],
    exampleQuestionIds: [
      "3fda6c80-4542-4770-9dab-4b6eebf6aaba", // EASY 2025 — parsec in AU
      "7d9c97ca-00a5-4928-82ab-bb327749d31b", // EASY 2019 — black hole
    ],
    relatedSlugs: ["modern-physics", "gravitation"],
  },

  "energy-sources": {
    trigger:
      "Conventional vs non-conventional energy source identification.",
    story: [
      "2 q across 10 years. Conventional: coal, petroleum, natural gas. Non-conventional: solar, wind, tidal, geothermal, biomass, hydro (sometimes counted as conventional, sometimes not — defer to the option set). Read once, recognise the categories, done.",
    ],
    subSkills: [
      {
        name: "Conventional vs non-conventional",
        description:
          "Conventional = fossil fuels (coal, oil, gas). Non-conventional / renewable = solar, wind, tidal, geothermal, biomass.",
      },
      {
        name: "Biomass identification",
        description:
          "Biomass = anything biologically derived burned for energy: wood, dung, agricultural waste, biofuels. Coal is NOT biomass (it's fossilised plant matter, but classified as conventional / fossil).",
      },
    ],
    traps: [
      {
        name: "Coal as biomass",
        description:
          "Coal originated from ancient plant matter, but it's classified as a fossil fuel / conventional, NOT biomass. The trap option lists coal as bio-mass.",
      },
    ],
    exampleQuestionIds: [
      "60c7c564-b869-4ce0-b1fb-6460c6bfaddd", // EASY 2025 — non-conventional energy
      "dab4df6b-4c2c-4af0-9201-0563d7aaa59b", // EASY 2021 — not a biomass source
    ],
    relatedSlugs: ["modern-physics", "astronomy-and-space"],
  },

  // ─────────────────────── APPLY ───────────────────────
  "light-and-optics": {
    trigger:
      "A mirror/lens formula calculation, a Snell's-law refraction, a TIR critical-angle, a prism-deviation, an eye-defect correction, or a 'which colour bends most' dispersion question.",
    story: [
      "97 q in 10 years — NDA Physics's largest chapter. Half RECALL (Light Phenomena, Optical Instruments, Eye defects — 42 q), half FORMULA-APPLY (Reflection, Refraction, Lenses, Prisms — 55 q). Drill recall subtopics fast for guaranteed marks; train the formula sign convention separately for the calculation subtopics.",
      "The mirror formula 1/v + 1/u = 1/f and lens formula 1/v − 1/u = 1/f are nearly identical — the lens has a minus where the mirror has a plus. Magnification = v/u (lens) or −v/u (mirror). Cartesian sign convention: distances measured from pole, +x to the right. Real object always has u < 0. f is negative for diverging optics (concave lens, convex mirror).",
      "Snell's law μ = sin i / sin r is the second pillar. n = c/v in medium. TIR happens only DENSE→RARE when i > critical angle (sin θ_c = 1/μ). Light Phenomena tests the qualitative shape: violet bends MOST, red bends LEAST (high-frequency = higher refractive index in normal media). Sky is blue because of Rayleigh scattering (λ⁻⁴, short wavelengths scatter more).",
    ],
    subSkills: [
      {
        name: "Cartesian sign convention discipline",
        description:
          "Distances from pole, +x to the right (direction of incident light). Real object: u negative. Real image on same side as outgoing light: v positive (lens) or negative (mirror — convention varies, check). Always draw the ray first.",
      },
      {
        name: "Mirror/lens formula application",
        description:
          "Identify f sign (concave mirror/convex lens: +; convex mirror/concave lens: −). Plug u with sign. Solve for v. Magnification m = v/u (lens) or −v/u (mirror).",
      },
      {
        name: "Snell's law + TIR check",
        description:
          "μ_1 sin θ_1 = μ_2 sin θ_2. Going dense→rare, check whether θ_1 exceeds critical angle (sin θ_c = μ_rare/μ_dense). Above θ_c, TIR (no refraction).",
      },
      {
        name: "Light phenomena recall (Phenomena + Instruments)",
        description:
          "Sky blue = Rayleigh scattering (λ⁻⁴). Red sunset = scattering of short wavelengths leaving long ones. Rainbow = refraction + TIR + dispersion in water drops. Mirage = continuous refraction in hot-air layers.",
      },
    ],
    traps: [
      {
        name: "Sign-convention flip",
        description:
          "u with wrong sign, or f with wrong sign for a diverging lens/convex mirror, places v on the wrong side and often with the wrong magnitude. The wrong option matches the flipped sign.",
      },
      {
        name: "TIR in the wrong direction",
        description:
          "TIR only DENSE→RARE. If the question describes light going from air→water and asks about TIR, the answer involves NO TIR (water is denser, so rare→dense).",
      },
      {
        name: "Lens power units",
        description:
          "P = 1/f with f in METRES, not cm. f = 25 cm ⟹ f = 0.25 m ⟹ P = 4 D. Forgetting the conversion gives a factor-of-100 error.",
      },
    ],
    exampleQuestionIds: [
      "ad7f0a37-cca4-419f-81c0-c9124c79ac8e", // HARD 2026 — prism 60° ray path
      "92eddea7-8fda-40e2-89a2-0c519cbd908c", // HARD 2024 — eye u/v/f schematic
    ],
    relatedSlugs: ["sound", "modern-physics", "oscillations-and-waves"],
  },

  "laws-of-motion-and-forces": {
    trigger:
      "A Newton's-laws statement-truth, a collision/recoil momentum conservation, an impulse from F-t graph, a friction-on-inclined-plane, or a 'two-equal-forces resultant' geometry.",
    story: [
      "41 q in 10 years. Grew 3× in 2023–24 (typical 3–5 → 7, 10) — currently the second-most-tested chapter. Newton's three laws statement-truth (19 q) is the dominant subtopic. The work is recognising which law a scenario invokes: 1st (inertia, balanced forces), 2nd (F=ma, unbalanced), 3rd (action-reaction pairs).",
      "Conservation of momentum (8 q) is the second pillar. m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ for isolated systems. Recoil: 0 = m_gun · v_gun + m_bullet · v_bullet — solve for v_gun (opposite-direction, much smaller because mass ratio). Elastic vs inelastic: elastic conserves KE too; inelastic loses KE to heat/deformation.",
      "Impulse–momentum theorem: J = F·Δt = Δp. The recurring shape is the F-t graph — area under the curve equals impulse equals change in momentum. Trapezoidal area + initial v = 0 ⟹ final v = (impulse)/m.",
    ],
    subSkills: [
      {
        name: "Newton's law recognition",
        description:
          "1st: object at rest stays at rest unless acted upon. 2nd: F_net = ma. 3rd: action-reaction pairs, EQUAL magnitude OPPOSITE direction on DIFFERENT bodies.",
      },
      {
        name: "Momentum conservation in collisions",
        description:
          "Always conserved if no external force. Write m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ first, then check if KE also conserved (elastic) or not (inelastic).",
      },
      {
        name: "Recoil equation",
        description:
          "Total initial momentum = 0 (system at rest). Final: 0 = m·v_object + M·V_recoil ⟹ V_recoil = −(m/M)·v_object. Opposite sign, scaled by mass ratio.",
      },
      {
        name: "Impulse from F-t graph",
        description:
          "J = area under F-t curve. For a trapezoid (rises, plateau, falls), J = (sum of parallel sides)/2 × height — same as area-of-trapezoid. Δp = J ⟹ v_final = v_initial + J/m.",
      },
    ],
    traps: [
      {
        name: "Action-reaction pair on same body",
        description:
          "Action-reaction NEVER acts on the same body. Book-on-table: gravity ON book (Earth-on-book) and Normal force ON book (table-on-book) are NOT action-reaction (both on book). The action-reaction PAIR for gravity-on-book is book-on-Earth.",
      },
      {
        name: "Forgetting friction direction",
        description:
          "Kinetic friction opposes RELATIVE motion. On a block sliding down an incline, friction acts UP the incline. On a block being pushed, friction acts OPPOSITE the push.",
      },
    ],
    exampleQuestionIds: [
      "0cfb5ffc-ae71-4644-87dd-09f77f085235", // HARD 2026 — two equal forces, resultant equal
      "09c35887-0983-4922-b71c-748196a219d4", // HARD 2024 — ball bounces, F on floor
    ],
    relatedSlugs: ["kinematics-and-motion", "work-energy-and-power", "fluid-mechanics-and-properties-of-matter"],
  },

  "kinematics-and-motion": {
    trigger:
      "A v=u+at / s=ut+½at² plug-in, a V-T / X-T graph identification, a projectile range, a circular-motion average-acceleration over half-circle, or a vector position-time analysis.",
    story: [
      "24 q in 10 years · 25% HARD — small chapter, heavy HARD load. Equations of Motion subtopic (15 q) dominates. The three equations v = u + at, s = ut + ½at², v² = u² + 2as hold ONLY for constant acceleration; piecewise motion requires applying them in segments.",
      "V-T (velocity-time) graphs: slope = acceleration; area under curve = displacement. X-T (position-time) graphs: slope = velocity; curvature direction reveals acceleration sign. Most graph questions test mapping between an equation (v = u + at) and the correct graph shape (straight line with positive slope = u-intercept).",
      "Vectors and Position (3 q, 67% HARD) is the toughest subtopic. Position vector r⃗ = x î + y ĵ + z k̂ as a function of t. Velocity = dr⃗/dt (component-wise), acceleration = dv⃗/dt. Magnitude of velocity = √(vₓ² + v_y² + v_z²). NDA's HARD shape: 'given r⃗(t), what's the angle of velocity with x-axis at t=1?'",
    ],
    subSkills: [
      {
        name: "Three equations of motion (constant a)",
        description:
          "v = u + at (no s). s = ut + ½at² (no v). v² = u² + 2as (no t). Pick the equation that omits the unknown you don't need.",
      },
      {
        name: "V-T / X-T graph reading",
        description:
          "Slope of V-T = acceleration. Area under V-T = displacement. Slope of X-T = velocity. V-T for v = u + at: line with slope a, y-intercept u.",
      },
      {
        name: "Piecewise motion handling",
        description:
          "Two-phase problem (a₁ for t₁ seconds, then a₂ for t₂ seconds): compute v at end of phase 1 = u + a₁t₁; use it as initial for phase 2. Total distance = s_1 + s_2.",
      },
      {
        name: "Circular motion — average acceleration over half circle",
        description:
          "Speed constant but velocity direction reverses. Δv⃗ = v_final − v_initial = −2v̂ × v. |Δv⃗| = 2v. Time for half circle = πR/v. |a_avg| = 2v / (πR/v) = 2v²/(πR).",
      },
    ],
    traps: [
      {
        name: "Applying constant-a equations to changing-a motion",
        description:
          "If a changes mid-motion, you CAN'T apply v² = u² + 2as across the whole motion. Must split into segments. Distractor option uses the equations naively.",
      },
      {
        name: "Average acceleration vs average velocity",
        description:
          "Average velocity = (u+v)/2 for constant a (different formula for variable a). Average acceleration = Δv/Δt — uses CHANGE in v, not average of v.",
      },
    ],
    exampleQuestionIds: [
      "d1614bb0-c7ca-422e-8d9f-eaf3065330de", // HARD 2026 — position vector r = √3 t² î + √2 t ĵ + √5 k̂
      "fae7b219-d9ae-40b8-8f3a-2c982f02b90b", // HARD 2024 — two-phase acceleration, 550 m
    ],
    relatedSlugs: ["laws-of-motion-and-forces", "work-energy-and-power", "oscillations-and-waves"],
  },

  "work-energy-and-power": {
    trigger:
      "A KE↔PE conversion in free-fall, a W = F·d·cosθ angle calculation, a constant-power machine v(t), or a Simple Machines lever-class identification.",
    story: [
      "23 q in 10 years · 9% HARD. The chapter splits four ways: Energy and Conservation (10 q — free fall, inclined plane), Work-Energy Theorem and Power (6 q — P = Fv, constant-P), Work and Work Done (5 q — definition and the cosθ trap), Simple Machines (2 q — lever class identification).",
      "Mechanical energy conservation in a frictionless system: ½mv₀² + mgh₀ = ½mv² + mgh. Equivalently: KE gained = PE lost. The 320-g ball dropped from height h with 625 J of PE problem: v = √(2gh) using mgh = ½mv² ⟹ v = √(2 × 625 / 0.320) = √3906 ≈ 62.5 m/s. Always check units (g in grams vs kg).",
      "Constant-power machine on smooth surface: P = Fv = const. Combined with F = ma = m(dv/dt) gives v dv = (P/m) dt ⟹ v ∝ √t (NOT v ∝ t). This is the recurring HARD shape: 'constant power, find v vs t' — the linear answer is the trap.",
    ],
    subSkills: [
      {
        name: "Conservation of mechanical energy",
        description:
          "KE + PE = const in frictionless system. ½mv₀² + mgh₀ = ½mv² + mgh. Set the reference point for PE (usually ground = 0). Subtract.",
      },
      {
        name: "Work = F·d·cosθ",
        description:
          "Angle between force and displacement. Perpendicular (θ=90°) ⟹ zero work. Centripetal force on circular motion does zero work; magnetic force on charged particle does zero work.",
      },
      {
        name: "Power forms",
        description:
          "P = W/t (average). P = F·v (instantaneous). For constant power on smooth surface, F decreases as v grows: F = P/v.",
      },
      {
        name: "Simple machine lever classes",
        description:
          "Class 1: fulcrum BETWEEN load and effort (seesaw, crowbar). Class 2: load between fulcrum and effort (wheelbarrow, bottle opener). Class 3: effort between fulcrum and load (tongs, human arm, broom).",
      },
    ],
    traps: [
      {
        name: "Zero work when force perpendicular to motion",
        description:
          "A waiter carrying a tray walks horizontally — gravity is vertical, motion horizontal, so gravity does ZERO work on the tray. Wrong option uses W = mgh = 0 only when h=0; right reasoning uses cos 90° = 0.",
      },
      {
        name: "Constant-power: v ∝ t trap",
        description:
          "If you naively assume constant force from a constant-power machine, you get v ∝ t (constant a). Wrong. P = Fv constant means F decreases as v grows; integrating gives v ∝ √t.",
      },
    ],
    exampleQuestionIds: [
      "0408f378-6c7f-45f9-932a-c5fb895d4ecc", // MOD 2026 — constant power v vs t
      "4af38486-56ea-4dd4-ba91-91a1e07f1768", // MOD 2024 — 320g ball, 625 J PE, final v
    ],
    relatedSlugs: ["laws-of-motion-and-forces", "gravitation", "kinematics-and-motion"],
  },

  gravitation: {
    trigger:
      "An F = Gm₁m₂/r² calculation, a planet-scaled g/v_esc/T comparison, a Kepler's-3rd orbital-period ratio, or a weightlessness explanation.",
    story: [
      "17 q in 10 years · 12% HARD. Three subtopics: Gravitational Field and Potential (7 q), Newton's Law of Gravitation (6 q), Orbits Kepler Escape (4 q). The chapter is formula-light (4 formulas) but ratio-trap heavy.",
      "Surface gravity g = GM/R². Escape velocity v_esc = √(2gR) = √(2GM/R). Kepler's third law T² ∝ R³. The recurring HARD shape: 'a planet has R = R_earth/2 and density 4× Earth's, find escape speed' — needs you to expand M = ρ·(4/3)πR³ THEN plug into v_esc formula. The factors cancel: v_esc = same as Earth.",
      "Weightlessness in orbit: the astronaut and the station are both in FREE FALL toward Earth, accelerating at the same rate, so the astronaut feels no normal force from the station floor. This is not 'no gravity' — gravity is still there, providing the centripetal force for the orbit.",
    ],
    subSkills: [
      {
        name: "Newton's law of gravitation plug-in",
        description:
          "F = Gm₁m₂/r² between two point masses. G = 6.67×10⁻¹¹. r is centre-to-centre distance.",
      },
      {
        name: "Surface g for any planet",
        description:
          "g = GM/R². With M = (4/3)πR³ρ, g = (4/3)πGRρ. So g ∝ R·ρ.",
      },
      {
        name: "Escape velocity scaling",
        description:
          "v_esc = √(2gR) = √(2GM/R) = √((8/3)πGR²ρ). So v_esc ∝ R·√ρ. Doubling R doubles v_esc (with ρ fixed). Quadrupling ρ doubles v_esc.",
      },
      {
        name: "Kepler's third law ratio",
        description:
          "T² ∝ R³. Ratio form: T₁/T₂ = (R₁/R₂)^(3/2). If R doubles, T multiplies by 2^(3/2) = 2.83.",
      },
    ],
    traps: [
      {
        name: "Planet-scaling: keeping ρ and R separate",
        description:
          "If R scales by k and ρ by m, then M scales by m·k³, NOT m·k. Forgetting the R³ factor inside mass is the recurring trap. Always expand M = (4/3)πR³ρ symbolically.",
      },
      {
        name: "Weightlessness = no gravity",
        description:
          "Wrong. Weightlessness = no NORMAL FORCE because everything is falling at the same rate. Gravity is still acting; it's providing the centripetal force for the orbit.",
      },
    ],
    exampleQuestionIds: [
      "95e70f86-27f6-4001-8097-db3d61f785c5", // HARD 2024 — R/2, density 4×, escape speed
      "fc86772d-5a17-4b4c-b094-6fb87e05e78c", // MOD 2026 — planet year 8× Earth, orbit
    ],
    relatedSlugs: ["work-energy-and-power", "astronomy-and-space", "laws-of-motion-and-forces"],
  },

  "oscillations-and-waves": {
    trigger:
      "A pendulum period change with L / mass / g, a SHM displacement-velocity-acceleration sign mapping, or a 'do EM, sound, water waves all carry energy' statement-truth.",
    story: [
      "13 q in 10 years · 15% HARD. Two subtopics: Simple Pendulum (7 q) and SHM + General Waves (6 q). Small chapter, formula-rich.",
      "T_pendulum = 2π√(L/g). The most-tested fact: mass DOESN'T appear. Doubling mass changes nothing. Doubling L multiplies T by √2 ≈ 1.41. Moving to a planet with g/4 doubles T. The recurring shape: 'L increased 4×, m doubled, find new T/old T' — answer is √4 = 2, mass irrelevant.",
      "SHM: displacement x = A sin(ωt), velocity v = Aω cos(ωt), acceleration a = −Aω² sin(ωt) = −ω²x. Acceleration is OPPOSITE in sign to displacement (always pointing toward equilibrium). At extremes (x = ±A), v = 0, a = max. At equilibrium (x = 0), v = max, a = 0.",
    ],
    subSkills: [
      {
        name: "Pendulum period ratio",
        description:
          "T = 2π√(L/g). Doubling L multiplies T by √2. Halving g multiplies T by √2. Mass irrelevant. Air resistance only affects amplitude over time, not period (to first approximation).",
      },
      {
        name: "SHM x-v-a sign mapping",
        description:
          "x and a always OPPOSITE sign. v is 90° (¼-cycle) ahead of x. At extremes: v=0, a=max. At equilibrium: v=max, a=0.",
      },
      {
        name: "Wave general properties",
        description:
          "All waves (EM, sound, water) carry energy; exhibit reflection, refraction, diffraction, superposition. Sound and water need a medium; EM doesn't (can travel in vacuum).",
      },
    ],
    traps: [
      {
        name: "Mass in pendulum period",
        description:
          "Mass doesn't appear. 'When mass doubles, period doubles' is the standard wrong option. Same trap: 'air resistance changes the period' — air resistance damps the AMPLITUDE, not the period.",
      },
      {
        name: "Direction of acceleration in SHM",
        description:
          "Acceleration is OPPOSITE to displacement, always pointing toward equilibrium. Wrong option says 'acceleration is in the direction of motion' (only true on the way back to equilibrium, not the way out).",
      },
    ],
    exampleQuestionIds: [
      "1b56753b-6290-40f7-a6a6-8d7a5128d0e3", // MOD 2025 — L×4, mass×2, period ratio
      "9a109d75-9877-4512-82f1-b59a4616adc9", // MOD 2026 — pendulum at θ=60°, air resistance
    ],
    relatedSlugs: ["sound", "gravitation", "light-and-optics"],
  },

  // ─────────────────────── REASON ───────────────────────
  "electricity-and-magnetism": {
    trigger:
      "Any resistor-network reduction, a P = V²/R / I²R / VI choice, a charge-in-magnetic-field force direction, an electrostatics shell or capacitor, or a Fleming's left/right hand rule.",
    story: [
      "93 q in 10 years · 22% HARD. The bank's #1 HARD pool by absolute count. Nine subtopics: Combination of Resistors (16 q · 38% HARD), Magnetism and Magnetic Effects (16 q), Electrical Devices (15 q), Electrostatics (13 q), Electrical Power/Energy/Heating (10 q · 30% HARD), Electric Current and Ohm's Law (9 q), Resistance and Resistivity (6 q), Magnetic Force and Fleming's Rules (5 q · 40% HARD), Cells/EMF/Kirchhoff (3 q).",
      "Combination of Resistors is the marquee subtopic. R_series = sum, R_parallel = reciprocal sum. For two equal R in parallel: R/2. For N equal R in parallel: R/N. The 'wire of resistance R cut into N equal pieces and reconnected' shape: each piece R/N, N in parallel ⟹ R/N². Heat dissipation P = V²/R for fixed V: parallel (smaller R) dissipates MORE. Ratio P_parallel/P_series with same V and two equal R: 4.",
      "Magnetism HARD shape: a charged particle enters a magnetic field. Force F = qv × B (vector cross product). Direction by right-hand rule for positive charge (thumb=v, fingers=B, palm=F); opposite for negative. If v ∥ B, force = 0; if v ⊥ B, magnitude qvB, particle moves in circle. Trap: mixing up Fleming's left-hand (motor — F from V and B) with right-hand (generator — induced V from F and B).",
    ],
    subSkills: [
      {
        name: "Series / parallel reduction",
        description:
          "Series: R_eq = R₁+R₂. Parallel: 1/R_eq = 1/R₁+1/R₂ ⟹ for two: R₁R₂/(R₁+R₂). Iterate from the innermost combination outward. For ladder/infinite networks, exploit self-similarity: R_∞ = R + (R · R_∞)/(R+R_∞).",
        },
      {
        name: "Power-form selection",
        description:
          "P = VI (always works). P = I²R (use when I and R given, fixed I scenario). P = V²/R (use when V and R given, fixed V scenario). For constant V: smaller R ⟹ more P. For constant I: larger R ⟹ more P.",
      },
      {
        name: "Lorentz force direction",
        description:
          "F = qv × B. Magnitude qvB sinθ. Direction by right-hand rule for +q; opposite for −q. Positive and negative charges deflect OPPOSITE directions in same field.",
      },
      {
        name: "Resistivity and stretching",
        description:
          "R = ρL/A. Stretching keeps volume constant (V = LA), so doubling L halves A and R quadruples (R ∝ L²). Bending or coiling doesn't change R.",
      },
    ],
    traps: [
      {
        name: "Parallel vs series, ratio inverted",
        description:
          "P_parallel/P_series = 4 (for two equal R, same V). Picking 1/4 (correct magnitude, inverted) is the dominant wrong option. Always reason 'which has smaller R_eq' first.",
      },
      {
        name: "Negative-charge force direction",
        description:
          "Right-hand rule gives direction for POSITIVE charges. For negative charges, reverse the direction. Wrong options use right-hand rule on a negative charge without flipping.",
      },
      {
        name: "P = I²R vs P = V²/R when comparing",
        description:
          "Don't use I²R when comparing two resistors carrying DIFFERENT currents (series with different parallel branches). Don't use V²/R when they have DIFFERENT V across them. P = VI always works.",
      },
    ],
    exampleQuestionIds: [
      "d0db672d-9a24-4c22-bb9c-3d4e911a0be9", // HARD 2025 — parallel vs series heat ratio
      "e2e8904d-cd22-43f8-8b9f-a8649fc717f4", // HARD 2026 — three wires X→Y→Z equivalent
    ],
    relatedSlugs: ["modern-physics", "heat-and-thermodynamics", "units-measurement-and-dimensions"],
  },

  "heat-and-thermodynamics": {
    trigger:
      "A Q = mcΔT calorimetry mixing, a temperature-scale conversion, a phase-change with latent heat, a PV = nRT or PVⁿ = const process variant.",
    story: [
      "39 q in 10 years · 21% HARD. Four subtopics: Heat / Calorimetry / Specific Heat (13 q · 31% HARD), Temperature and Thermometry (11 q), Phase Change and Boiling (9 q), Thermodynamic Processes (6 q · 33% HARD).",
      "Calorimetry is the marquee. Q_gained_by_cold = Q_lost_by_hot (no external heat transfer). Sensible heat Q = mcΔT, latent heat Q = mL at phase boundaries. The 'ice at −10°C + water at 30°C, find final T' problem has THREE segments: warm ice −10→0 (sensible), melt ice at 0 (latent), warm melted-ice water 0→T (sensible). Cool original water 30→T (sensible). Set up the heat balance: m_ice·c_ice·10 + m_ice·L_f + m_ice·c_w·T = m_w·c_w·(30−T).",
      "Thermodynamic processes are tested as algebra. PV = nRT is the ideal gas law. Process variants: isothermal PV=const (Boyle); isobaric V/T=const; isochoric P/T=const; adiabatic PVᵞ=const. NDA HARD shape: 'in a process PV² = const for ideal gas, find T₁/T₂ vs V₁/V₂' — derive from PV=nRT plus PV² = const: T·V = const ⟹ T₁/T₂ = V₂/V₁.",
    ],
    subSkills: [
      {
        name: "Heat balance equation",
        description:
          "∑Q_gained = ∑Q_lost. Each substance contributes mcΔT for sensible heating, mL for any phase boundary crossed. Final state (all liquid? mixed?) is part of the setup, not the output.",
      },
      {
        name: "Temperature scale conversion",
        description:
          "T_C = (T_F − 32) × 5/9. T_K = T_C + 273.15. T_F = T_C × 9/5 + 32. Scales cross: C=F at −40°. C=K never (offset 273). K=F at 574.25.",
      },
      {
        name: "PV = nRT process variants",
        description:
          "Isothermal: T const, PV=const. Isobaric: P const, V/T=const. Isochoric: V const, P/T=const. Adiabatic: PVᵞ=const, T·V^(γ−1)=const, T·P^((1−γ)/γ)=const.",
      },
      {
        name: "Latent heat for phase changes",
        description:
          "Water: L_f ≈ 334 kJ/kg (melt at 0°C). L_v ≈ 2260 kJ/kg (boil at 100°C). Phase change happens AT temperature, no T change while changing phase. Q = mL.",
      },
    ],
    traps: [
      {
        name: "Skipping a latent-heat term",
        description:
          "Forgetting to add Q = mL when crossing the 0°C or 100°C boundary. The wrong option matches the no-latent calculation. ALWAYS map the temperature journey of EACH substance first.",
      },
      {
        name: "Process variant misidentification",
        description:
          "Assuming PV = const (isothermal) when the question stipulates a different relationship. Always read the process specification carefully; derive from PV = nRT + the given constraint, don't fall back on a memorised pair.",
      },
      {
        name: "Specific heat 'depends on mass and shape'",
        description:
          "Specific heat is intensive — depends only on material. The wrong option claims dependence on mass or shape, both wrong.",
      },
    ],
    exampleQuestionIds: [
      "387f390f-1a21-42d4-8c7a-60bb27cc9b22", // HARD 2026 — 5g ice -20°C into m kg water 30°C
      "a2b85be9-214d-4faa-9b40-547ce57f6adf", // HARD 2026 — PV² = const
    ],
    relatedSlugs: ["fluid-mechanics-and-properties-of-matter", "modern-physics", "work-energy-and-power"],
  },

  "fluid-mechanics-and-properties-of-matter": {
    trigger:
      "An Archimedes' buoyancy with floating/sinking, a density-mixing equal-volume/equal-mass, a hydrostatic pressure P = hρg, or a surface-tension statement.",
    story: [
      "23 q in 10 years · 30% HARD — the chapter with the HIGHEST %HARD in the bank. Two subtopics: Buoyancy / Density / Flotation (16 q · 31% HARD) and Pressure / Surface Tension (7 q · 29% HARD).",
      "Buoyancy F_b = V_submerged · ρ_fluid · g (Archimedes). For floating object: F_b = mg ⟹ V_submerged/V_total = ρ_object/ρ_fluid. The 'sealed packet 1L mass 800g into water (ρ=1), then into liquid B (ρ=1.5)' shape: in water, ρ_packet = 0.8 < 1 ⟹ floats with 80% submerged. In liquid B, ρ_packet = 0.8 < 1.5 ⟹ floats with 0.8/1.5 ≈ 53% submerged.",
      "Density mixing: equal VOLUMES of ρ₁ and ρ₂ ⟹ ρ_avg = (ρ₁+ρ₂)/2 (arithmetic mean). Equal MASSES ⟹ ρ_avg = 2ρ₁ρ₂/(ρ₁+ρ₂) (harmonic mean). Harmonic < arithmetic always (with positive different ρ). The recurring HARD shape: 'mixed in equal volume rel den 4, mixed in equal mass rel den 3, find ρ₁ ρ₂' — set up both equations and solve simultaneously.",
    ],
    subSkills: [
      {
        name: "Archimedes' principle setup",
        description:
          "F_b = V_submerged × ρ_fluid × g. For floating: F_b = mg ⟹ V_sub/V_total = ρ_object/ρ_fluid. For wholly submerged: V_sub = V_total.",
      },
      {
        name: "Density mixing formulas",
        description:
          "Equal volume: ρ_avg = (ρ₁+ρ₂)/2 (arithmetic mean). Equal mass: ρ_avg = 2ρ₁ρ₂/(ρ₁+ρ₂) (harmonic mean). Harmonic is always smaller.",
      },
      {
        name: "Hydrostatic pressure",
        description:
          "P_gauge = h·ρ·g (depth below free surface). P_absolute = P_atm + h·ρ·g. Pressure same at same depth in connected liquids regardless of container shape.",
      },
      {
        name: "Surface tension qualitative",
        description:
          "Force-per-unit-length along the surface. Causes water-drop sphericity, capillary rise/fall, soap-bubble pressure-jump. Decreases with temperature.",
      },
    ],
    traps: [
      {
        name: "Equal-volume vs equal-mass arithmetic confusion",
        description:
          "Wrong option swaps the two formulas. Equal volume = arithmetic, equal mass = harmonic. Re-derive from ρ = m_total / V_total in 30 seconds.",
      },
      {
        name: "Using V_total instead of V_submerged for buoyancy",
        description:
          "F_b uses ONLY the volume IN the fluid, not the total volume. For a partially-submerged floating object, V_submerged < V_total. The wrong option uses V_total.",
      },
      {
        name: "Pressure on container walls vs base",
        description:
          "Pressure at the base = hρg, independent of container shape (Pascal). But the FORCE on the walls integrates pressure × area, which DOES depend on shape. Don't conflate pressure with force.",
      },
    ],
    exampleQuestionIds: [
      "c51396be-7a8e-4af0-a7ca-bf629d942b50", // HARD 2019 — density mixing equal vol vs equal mass
      "07afef44-bb3d-409f-b537-d8dd3e1d8d8a", // HARD 2022 — sealed packet 1L 800g in water vs B
    ],
    relatedSlugs: ["heat-and-thermodynamics", "laws-of-motion-and-forces", "gravitation"],
  },
};

/** Slugs with full deep-dive content (all 14). Exposed so the playbooks
 *  index can mark which entries have deep dives (matches english pattern). */
export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
