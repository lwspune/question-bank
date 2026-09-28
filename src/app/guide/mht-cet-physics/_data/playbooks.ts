/**
 * Playbook catalog for /guide/mht-cet-physics/playbooks.
 *
 * One playbook = one chapter, end to end (the Template C shape).
 *
 * WHY 21 AND NOT 24. Playbooks ship for every chapter at >= 0.9 q/paper on
 * RECENT weightage (2024-2025, 24 papers). Below the line, and covered in the
 * tail block on /strategy: Magnetic Materials 0.79 · Units and Measurement
 * 0.58 (entered in 2025 at 1.08 — the recent rate averages in 2024, when it
 * was not set) · Mechanical Properties of Solids 0.08.
 *
 * Slugs equal the /notes/mht-cet-physics chapter slugs, so the landing page
 * can link each playbook to its notes by slug alone.
 *
 * `chapter` + `subtopics[]` are canonical DB names, resolved at request time
 * via resolveTaxonomy. tests/guide-mht-cet-physics-playbooks.test.ts resolves
 * every one against the live taxonomy — a rename that breaks a drill fails it.
 *
 * `bucket` sizes: cornerstone 6 (18.5 q/paper) · quickwin 6 (13.3, all <=14%
 * HARD) · longtail 9 (16.7, mostly 21-32% HARD).
 */

export type PlaybookBucket = "cornerstone" | "quickwin" | "longtail";

export type Playbook = {
  slug: string;
  name: string;
  /** Single-line summary shown on the index card. */
  summary: string;
  chapter: string;
  /** All subtopics in `chapter` that this playbook covers. */
  subtopics: string[];
  /** Lifetime PUBLIC PYQ count for the chapter. */
  qCount: number;
  /** Questions per paper on 2024-2025 papers — the number that drives tiering. */
  qPerPaper: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // Cornerstone (6 playbooks, 18.5 q/paper)
  {
    slug: "electrostatics",
    name: "Electrostatics",
    summary:
      "166 q - 3.83/paper - 22% HARD. The heaviest chapter on the Physics paper. Gauss's law and the dipole are 29 questions without a HARD one; dielectrics are 39% HARD.",
    chapter: "Electrostatics",
    subtopics: [
      "Electric Potential and Potential Energy",
      "Coulomb's Law and Electric Field",
      "Capacitance and Combinations of Capacitors",
      "Dielectrics in Capacitors",
      "Energy Stored in a Capacitor",
      "Gauss's Law and Electric Flux",
      "Electric Dipole — Field, Potential, Torque",
    ],
    qCount: 166,
    qPerPaper: 3.83,
    pctHard: 22,
    bucket: "cornerstone",
  },
  {
    slug: "rotational-dynamics",
    name: "Rotational Dynamics",
    summary:
      "128 q - 3.13/paper - 21% HARD, and rising in 2025. The axis theorems hold nearly half the HARD; angular momentum and rolling are the cheap pages.",
    chapter: "Rotational Dynamics",
    subtopics: [
      "Parallel and Perpendicular Axis Theorems",
      "Rotational Kinetic Energy and Rolling Motion",
      "Moment of Inertia and Radius of Gyration",
      "Angular Momentum, Torque, and Conservation",
      "Dynamics of Circular Motion — Banking, Conical Pendulum, Vertical Circle",
      "Kinematics of Circular Motion",
    ],
    qCount: 128,
    qPerPaper: 3.13,
    pctHard: 21,
    bucket: "cornerstone",
  },
  {
    slug: "superposition-of-waves",
    name: "Superposition of Waves",
    summary:
      "123 q - 3.00/paper - 20% HARD. Reading a wave equation is the cheap entry at 9%; beats and the sonometer carry the HARD at 41%. Prepare it with Sound.",
    chapter: "Superposition of Waves",
    subtopics: [
      "Stationary Waves and Vibrating Strings",
      "Progressive Wave, Wave Equation, and Velocity",
      "Pipes, Resonance Tube, and Doppler Effect",
      "Beats and Sonometer",
      "Superposition, Phase/Path Difference, and Interference",
    ],
    qCount: 123,
    qPerPaper: 3.0,
    pctHard: 20,
    bucket: "cornerstone",
  },
  {
    slug: "mechanical-properties-of-fluids",
    name: "Mechanical Properties of Fluids",
    summary:
      "124 q - 2.96/paper - 19% HARD. Two thirds surface tension, and capillary rise (38 q) has never produced a HARD question.",
    chapter: "Mechanical Properties of Fluids",
    subtopics: [
      "Surface Tension and Surface Energy",
      "Excess Pressure and Capillary Rise",
      "Viscosity, Stokes' Law, Terminal Velocity, and Reynolds",
      "Bernoulli, Continuity, Streamline, and Torricelli",
      "Pressure, Buoyancy, and Archimedes",
    ],
    qCount: 124,
    qPerPaper: 2.96,
    pctHard: 19,
    bucket: "cornerstone",
  },
  {
    slug: "wave-optics",
    name: "Wave Optics",
    summary:
      "117 q - 2.96/paper - 19% HARD, spread evenly over Young's double slit, single slit and interference intensity. The one cornerstone that does not cherry-pick.",
    chapter: "Wave Optics",
    subtopics: [
      "Young's Double Slit — Fringe Width, Positions and Shifts",
      "Single Slit Diffraction and Resolving Power",
      "Interference Intensity and Coherent Sources",
      "Polarisation — Malus and Brewster",
      "Wavefronts, Huygens, and Coherence",
    ],
    qCount: 117,
    qPerPaper: 2.96,
    pctHard: 19,
    bucket: "cornerstone",
  },
  {
    slug: "oscillations",
    name: "Oscillations",
    summary:
      "110 q - 2.63/paper - 19% HARD. SHM kinematics is the biggest page, energy the cheapest; spring systems carry the HARD at 28%.",
    chapter: "Oscillations",
    subtopics: [
      "SHM Kinematics — Displacement, Velocity, Phase, and Damping",
      "Spring-Mass and Other SHM Systems",
      "Simple Pendulum — Period, Lift, Weightlessness",
      "SHM Energy — Kinetic, Potential, and Total",
    ],
    qCount: 110,
    qPerPaper: 2.63,
    pctHard: 19,
    bucket: "cornerstone",
  },

  // Quick-win (6 playbooks, 13.3 q/paper, all <= 14% HARD)
  {
    slug: "semiconductor-devices",
    name: "Semiconductor Devices",
    summary:
      "129 q - 3.08/paper - 3% HARD. The best return on the Physics paper: four of six pages have never produced a HARD question. Mostly figure-reading, not calculation.",
    chapter: "Semiconductor Devices",
    subtopics: [
      "Logic Gates and Boolean Algebra",
      "Transistors — BJT, CE Amplifier, and Gain",
      "Band Theory, Doping, and Semiconductor Types",
      "Diode Circuits and Rectifiers",
      "p-n Junction — Depletion Layer and Biasing",
      "Special Diodes — Zener, LED, Photodiode",
    ],
    qCount: 129,
    qPerPaper: 3.08,
    pctHard: 3,
    bucket: "quickwin",
  },
  {
    slug: "ac-circuits",
    name: "AC Circuits",
    summary:
      "129 q - 3.00/paper - 12% HARD. Reactance and power are the cheap half; one impedance triangle does most of the rest.",
    chapter: "AC Circuits",
    subtopics: [
      "Series LCR — Impedance, Phase and Phasors",
      "Resonance in Series LCR Circuits",
      "Power in AC Circuit — Average, Factor, Wattless",
      "Reactance — Inductive, Capacitive, and Single-Element Circuits",
      "LC Oscillations, Transformer, and AC Generator",
      "RMS, Peak, and AC Source Characteristics",
    ],
    qCount: 129,
    qPerPaper: 3.0,
    pctHard: 12,
    bucket: "quickwin",
  },
  {
    slug: "electromagnetic-induction",
    name: "Electromagnetic Induction",
    summary:
      "119 q - 2.92/paper - 9% HARD. Faraday and Lenz have never produced a HARD question; motional EMF is the only expensive page.",
    chapter: "Electromagnetic Induction",
    subtopics: [
      "Self-Inductance, Energy Stored, and LR Circuit",
      "Mutual Inductance, Coupling, and Transformer/Generator",
      "Faraday's and Lenz's Laws — Induced EMF, Current, and Charge",
      "Motional EMF and Rotating Conductors",
    ],
    qCount: 119,
    qPerPaper: 2.92,
    pctHard: 9,
    bucket: "quickwin",
  },
  {
    slug: "kinetic-theory-of-gases",
    name: "Kinetic Theory of Gases",
    summary:
      "80 q - 1.96/paper - 14% HARD. Gas laws at 0%; the RMS-speed page is ratio work on v_rms ∝ √(T/M).",
    chapter: "Kinetic Theory of Gases",
    subtopics: [
      "Kinetic Theory — Pressure, RMS Speed, and Temperature",
      "Average KE, Equipartition, and Specific Heats",
      "Gas Laws and Ideal Gas Equation",
    ],
    qCount: 80,
    qPerPaper: 1.96,
    pctHard: 14,
    bucket: "quickwin",
  },
  {
    slug: "motion-in-a-plane",
    name: "Motion in a Plane",
    summary:
      "53 q - 1.33/paper - 6% HARD, and rising (1.00 to 1.54 a paper in 2025). Three of its five pages have never produced a HARD question.",
    chapter: "Motion in a Plane",
    subtopics: [
      "Kinematics — Equations of Motion, Free Fall, and Graphs",
      "Uniform Circular Motion — Centripetal Acceleration, Banking",
      "Vector Operations and Components",
      "Relative Motion and Meeting Problems",
      "Projectile Motion — Range, Height, and Time of Flight",
    ],
    qCount: 53,
    qPerPaper: 1.33,
    pctHard: 6,
    bucket: "quickwin",
  },
  {
    slug: "laws-of-motion",
    name: "Laws of Motion",
    summary:
      "47 q - 1.04/paper - 11% HARD. One free-body diagram per body; momentum and collisions are the cheap page.",
    chapter: "Laws of Motion",
    subtopics: [
      "Newton's Laws — Force, Tension, Lift, and Connected Blocks",
      "Impulse, Momentum, and Collisions",
      "Equilibrium, Centre of Mass, and Friction",
    ],
    qCount: 47,
    qPerPaper: 1.04,
    pctHard: 11,
    bucket: "quickwin",
  },

  // Long tail (9 playbooks, 16.7 q/paper)
  {
    slug: "magnetic-fields-due-to-electric-current",
    name: "Magnetic Fields Due to Electric Current",
    summary:
      "98 q - 2.42/paper - 29% HARD. The field of a conductor is half the chapter at 33%, much of it a figure of wires and arcs.",
    chapter: "Magnetic Fields Due to Electric Current",
    subtopics: [
      "Magnetic Field of Current-Carrying Conductor",
      "Magnetic Moment of Current Loop and Galvanometer Instruments",
      "Force on Current-Carrying Conductor and Parallel Wires",
      "Force on Moving Charge in Magnetic Field",
    ],
    qCount: 98,
    qPerPaper: 2.42,
    pctHard: 29,
    bucket: "longtail",
  },
  {
    slug: "thermal-properties-of-matter",
    name: "Thermal Properties of Matter",
    summary:
      "84 q - 2.13/paper - 17% HARD. 53 of the 84 are radiation — Stefan and Wien as ratio questions.",
    chapter: "Thermal Properties of Matter",
    subtopics: [
      "Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body",
      "Thermal Expansion — Linear, Surface, Volumetric",
      "Heat Conduction and Thermal Resistance",
      "Calorimetry, Latent Heat, and Heat Capacity",
    ],
    qCount: 84,
    qPerPaper: 2.13,
    pctHard: 17,
    bucket: "longtail",
  },
  {
    slug: "dual-nature-of-radiation-and-matter",
    name: "Dual Nature of Radiation and Matter",
    summary:
      "82 q - 2.04/paper - 32% HARD. The hardest chapter in the bank, and one of the narrowest: two equations carry all of it.",
    chapter: "Dual Nature of Radiation and Matter",
    subtopics: [
      "Photoelectric Effect — Stopping Potential, Threshold, and Work Function",
      "de Broglie Wavelength and Matter Waves",
    ],
    qCount: 82,
    qPerPaper: 2.04,
    pctHard: 32,
    bucket: "longtail",
  },
  {
    slug: "current-electricity",
    name: "Current Electricity",
    summary:
      "82 q - 1.96/paper - 24% HARD. Meter conversions and Kirchhoff are the cheap entry; the bridges are 35% HARD.",
    chapter: "Current Electricity",
    subtopics: [
      "Galvanometer, Ammeter, and Voltmeter Conversion",
      "Kirchhoff's Laws and Circuit Analysis",
      "Potentiometer",
      "Wheatstone Bridge and Meter Bridge",
      "Ohm's Law, Cells, EMF, and Internal Resistance",
    ],
    qCount: 82,
    qPerPaper: 1.96,
    pctHard: 24,
    bucket: "longtail",
  },
  {
    slug: "structure-of-atoms-and-nuclei",
    name: "Structure of Atoms and Nuclei",
    summary:
      "85 q - 1.96/paper - 22% HARD. Radioactive decay at 6%; the Bohr page is scaling laws, and falls to ratios.",
    chapter: "Structure of Atoms and Nuclei",
    subtopics: [
      "Bohr Model and Atomic Properties",
      "Hydrogen Spectrum and Spectral Series",
      "Radioactive Decay and Half-Life",
    ],
    qCount: 85,
    qPerPaper: 1.96,
    pctHard: 22,
    bucket: "longtail",
  },
  {
    slug: "thermodynamics",
    name: "Thermodynamics",
    summary:
      "84 q - 1.92/paper - 21% HARD. The first law is cheap; the processes page holds the HARD at 31%.",
    chapter: "Thermodynamics",
    subtopics: [
      "First Law, Internal Energy, and Work-Heat Relations",
      "Isothermal, Adiabatic, Isobaric, and Isochoric Processes",
      "Carnot Engine, Efficiency, and Refrigerator",
    ],
    qCount: 84,
    qPerPaper: 1.92,
    pctHard: 21,
    bucket: "longtail",
  },
  {
    slug: "gravitation",
    name: "Gravitation",
    summary:
      "80 q - 1.75/paper - 23% HARD, and halved in 2025. Variation of g is 33 questions at 3% HARD — the page to keep.",
    chapter: "Gravitation",
    subtopics: [
      "Variation of g with Depth, Altitude, Density, and Latitude",
      "Satellites, Orbital Motion, and Kepler's Laws",
      "Gravitational PE, Escape Velocity, and Energy",
      "Newton's Law of Gravitation and Gravitational Force",
    ],
    qCount: 80,
    qPerPaper: 1.75,
    pctHard: 23,
    bucket: "longtail",
  },
  {
    slug: "ray-optics",
    name: "Ray Optics",
    summary:
      "78 q - 1.50/paper - 29% HARD, and halved in 2025. Lenses and refraction are the core; the prism page is 47% HARD.",
    chapter: "Optics (Ray)",
    subtopics: [
      "Refraction, Apparent Depth, and Total Internal Reflection",
      "Lenses — Lens Formula, Power, and Lensmaker",
      "Prism — Deviation, Dispersion, and Refractive Index",
      "Optical Instruments — Microscope and Telescope",
      "Mirrors and Image Formation",
    ],
    qCount: 78,
    qPerPaper: 1.5,
    pctHard: 29,
    bucket: "longtail",
  },
  {
    slug: "sound",
    name: "Sound",
    summary:
      "47 q - 1.04/paper - 21% HARD. Doppler and pipes — the same material as Superposition of Waves, and cheap if prepared with it.",
    chapter: "Sound",
    subtopics: [
      "Pipes, Resonance, Overtones, and Beats",
      "Doppler Effect — Moving Source and Observer",
      "Sound Wave Properties, Speed, and Intensity",
    ],
    qCount: 47,
    qPerPaper: 1.04,
    pctHard: 21,
    bucket: "longtail",
  },
];

/** Every playbook slug, in catalog order. Drives generateStaticParams. */
export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

/** Playbooks in one strand, catalog order preserved. */
export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
