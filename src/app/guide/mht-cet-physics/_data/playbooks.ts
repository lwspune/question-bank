/**
 * Playbook catalog for /guide/mht-cet-physics/playbooks.
 *
 * One playbook = one chapter, end to end (the Template C shape).
 *
 * WHY 22 AND NOT 24. Playbooks ship for every chapter at >= 0.9 q/paper on
 * RECENT weightage (2025-2026, 39 papers). Below the line, and covered in the
 * tail block on /strategy: Magnetic Materials 0.79 · Mechanical Properties of
 * Solids 0.10. Units and Measurement crossed the line when the window moved
 * to 2025-2026 (1.03: it entered in 2025 and held in 2026), so it gained a
 * playbook on 2026-10-13. Sound and Laws of Motion sit just above it at 0.97.
 *
 * Slugs equal the /notes/mht-cet-physics chapter slugs, so the landing page
 * can link each playbook to its notes by slug alone.
 *
 * `chapter` + `subtopics[]` are canonical DB names, resolved at request time
 * via resolveTaxonomy. tests/guide-mht-cet-physics-playbooks.test.ts resolves
 * every one against the live taxonomy — a rename that breaks a drill fails it.
 *
 * `bucket` sizes: cornerstone 6 (18.5 q/paper) · quickwin 7 (14.4, all <=13%
 * HARD) · longtail 9 (15.9, mostly 19-31% HARD).
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
  /** Questions per paper on 2025-2026 papers: the number that drives tiering. */
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
      "270 q - 3.95/paper - 18% HARD. The heaviest chapter on the Physics paper. Gauss's law and the dipole are 46 questions with two HARD ones; dielectrics are 25% HARD.",
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
    qCount: 270,
    qPerPaper: 3.95,
    pctHard: 18,
    bucket: "cornerstone",
  },
  {
    slug: "rotational-dynamics",
    name: "Rotational Dynamics",
    summary:
      "204 q - 3.08/paper - 20% HARD. The axis theorems hold nearly half the HARD at 44%; angular momentum (8%) and rolling (11%) are the cheap pages.",
    chapter: "Rotational Dynamics",
    subtopics: [
      "Parallel and Perpendicular Axis Theorems",
      "Rotational Kinetic Energy and Rolling Motion",
      "Moment of Inertia and Radius of Gyration",
      "Angular Momentum, Torque, and Conservation",
      "Dynamics of Circular Motion — Banking, Conical Pendulum, Vertical Circle",
      "Kinematics of Circular Motion",
    ],
    qCount: 204,
    qPerPaper: 3.08,
    pctHard: 20,
    bucket: "cornerstone",
  },
  {
    slug: "superposition-of-waves",
    name: "Superposition of Waves",
    summary:
      "205 q - 3.05/paper - 21% HARD. Reading a wave equation is the cheap entry at 9%; pipes and beats carry the HARD at 37% and 29%. Prepare it with Sound.",
    chapter: "Superposition of Waves",
    subtopics: [
      "Stationary Waves and Vibrating Strings",
      "Progressive Wave, Wave Equation, and Velocity",
      "Pipes, Resonance Tube, and Doppler Effect",
      "Beats and Sonometer",
      "Superposition, Phase/Path Difference, and Interference",
    ],
    qCount: 205,
    qPerPaper: 3.05,
    pctHard: 21,
    bucket: "cornerstone",
  },
  {
    slug: "mechanical-properties-of-fluids",
    name: "Mechanical Properties of Fluids",
    summary:
      "201 q - 2.95/paper - 18% HARD. Nearly two thirds surface tension, and capillary rise (63 q) has produced only three HARD questions.",
    chapter: "Mechanical Properties of Fluids",
    subtopics: [
      "Surface Tension and Surface Energy",
      "Excess Pressure and Capillary Rise",
      "Viscosity, Stokes' Law, Terminal Velocity, and Reynolds",
      "Bernoulli, Continuity, Streamline, and Torricelli",
      "Pressure, Buoyancy, and Archimedes",
    ],
    qCount: 201,
    qPerPaper: 2.95,
    pctHard: 18,
    bucket: "cornerstone",
  },
  {
    slug: "wave-optics",
    name: "Wave Optics",
    summary:
      "188 q - 2.79/paper - 16% HARD, spread evenly over Young's double slit, single slit, interference intensity and polarisation. The one cornerstone that does not cherry-pick.",
    chapter: "Wave Optics",
    subtopics: [
      "Young's Double Slit — Fringe Width, Positions and Shifts",
      "Single Slit Diffraction and Resolving Power",
      "Interference Intensity and Coherent Sources",
      "Polarisation — Malus and Brewster",
      "Wavefronts, Huygens, and Coherence",
    ],
    qCount: 188,
    qPerPaper: 2.79,
    pctHard: 16,
    bucket: "cornerstone",
  },
  {
    slug: "oscillations",
    name: "Oscillations",
    summary:
      "179 q - 2.69/paper - 19% HARD. SHM kinematics is the biggest page, energy the cheapest at 9%; spring systems carry the HARD at 26%.",
    chapter: "Oscillations",
    subtopics: [
      "SHM Kinematics — Displacement, Velocity, Phase, and Damping",
      "Spring-Mass and Other SHM Systems",
      "Simple Pendulum — Period, Lift, Weightlessness",
      "SHM Energy — Kinetic, Potential, and Total",
    ],
    qCount: 179,
    qPerPaper: 2.69,
    pctHard: 19,
    bucket: "cornerstone",
  },

  // Quick-win (7 playbooks, 14.4 q/paper, all <= 13% HARD)
  {
    slug: "semiconductor-devices",
    name: "Semiconductor Devices",
    summary:
      "206 q - 3.00/paper - 3% HARD. The best return on the Physics paper: four of six pages have never produced a HARD question. Mostly figure-reading, not calculation.",
    chapter: "Semiconductor Devices",
    subtopics: [
      "Logic Gates and Boolean Algebra",
      "Transistors — BJT, CE Amplifier, and Gain",
      "Band Theory, Doping, and Semiconductor Types",
      "Diode Circuits and Rectifiers",
      "p-n Junction — Depletion Layer and Biasing",
      "Special Diodes — Zener, LED, Photodiode",
    ],
    qCount: 206,
    qPerPaper: 3.0,
    pctHard: 3,
    bucket: "quickwin",
  },
  {
    slug: "ac-circuits",
    name: "AC Circuits",
    summary:
      "208 q - 3.05/paper - 10% HARD. Reactance and power are the cheap half (79 q, two HARD); one impedance triangle does most of the rest.",
    chapter: "AC Circuits",
    subtopics: [
      "Series LCR — Impedance, Phase and Phasors",
      "Resonance in Series LCR Circuits",
      "Power in AC Circuit — Average, Factor, Wattless",
      "Reactance — Inductive, Capacitive, and Single-Element Circuits",
      "LC Oscillations, Transformer, and AC Generator",
      "RMS, Peak, and AC Source Characteristics",
    ],
    qCount: 208,
    qPerPaper: 3.05,
    pctHard: 10,
    bucket: "quickwin",
  },
  {
    slug: "electromagnetic-induction",
    name: "Electromagnetic Induction",
    summary:
      "190 q - 2.74/paper - 9% HARD. Faraday and Lenz (40 q) have never produced a HARD question; motional EMF is the only expensive page.",
    chapter: "Electromagnetic Induction",
    subtopics: [
      "Self-Inductance, Energy Stored, and LR Circuit",
      "Mutual Inductance, Coupling, and Transformer/Generator",
      "Faraday's and Lenz's Laws — Induced EMF, Current, and Charge",
      "Motional EMF and Rotating Conductors",
    ],
    qCount: 190,
    qPerPaper: 2.74,
    pctHard: 9,
    bucket: "quickwin",
  },
  {
    slug: "kinetic-theory-of-gases",
    name: "Kinetic Theory of Gases",
    summary:
      "121 q - 1.69/paper - 11% HARD. Gas laws at 0%; the RMS-speed page is ratio work on v_rms ∝ √(T/M).",
    chapter: "Kinetic Theory of Gases",
    subtopics: [
      "Kinetic Theory — Pressure, RMS Speed, and Temperature",
      "Average KE, Equipartition, and Specific Heats",
      "Gas Laws and Ideal Gas Equation",
    ],
    qCount: 121,
    qPerPaper: 1.69,
    pctHard: 11,
    bucket: "quickwin",
  },
  {
    slug: "motion-in-a-plane",
    name: "Motion in a Plane",
    summary:
      "109 q - 1.95/paper - 6% HARD, and nearly doubled (1.00 a paper in 2023-24, 2.15 in 2026). Kinematics, 27 questions, has never produced a HARD one.",
    chapter: "Motion in a Plane",
    subtopics: [
      "Kinematics — Equations of Motion, Free Fall, and Graphs",
      "Uniform Circular Motion — Centripetal Acceleration, Banking",
      "Vector Operations and Components",
      "Relative Motion and Meeting Problems",
      "Projectile Motion — Range, Height, and Time of Flight",
    ],
    qCount: 109,
    qPerPaper: 1.95,
    pctHard: 6,
    bucket: "quickwin",
  },
  {
    slug: "units-and-measurement",
    name: "Units and Measurement",
    summary:
      "40 q - 1.03/paper - 0% HARD. New in 2025 and held in 2026. It has never produced a HARD question, and nearly all of it is how percentage errors add through a formula.",
    chapter: "Units and Measurement",
    subtopics: ["Units, Dimensions, and Error Analysis"],
    qCount: 40,
    qPerPaper: 1.03,
    pctHard: 0,
    bucket: "quickwin",
  },
  {
    slug: "laws-of-motion",
    name: "Laws of Motion",
    summary:
      "71 q - 0.97/paper - 13% HARD. One free-body diagram per body; momentum and collisions are the cheap page.",
    chapter: "Laws of Motion",
    subtopics: [
      "Newton's Laws — Force, Tension, Lift, and Connected Blocks",
      "Impulse, Momentum, and Collisions",
      "Equilibrium, Centre of Mass, and Friction",
    ],
    qCount: 71,
    qPerPaper: 0.97,
    pctHard: 13,
    bucket: "quickwin",
  },

  // Long tail (9 playbooks, 15.9 q/paper)
  {
    slug: "magnetic-fields-due-to-electric-current",
    name: "Magnetic Fields Due to Electric Current",
    summary:
      "160 q - 2.44/paper - 27% HARD. The field of a conductor is half the chapter at 28%, much of it a figure of wires and arcs.",
    chapter: "Magnetic Fields Due to Electric Current",
    subtopics: [
      "Magnetic Field of Current-Carrying Conductor",
      "Magnetic Moment of Current Loop and Galvanometer Instruments",
      "Force on Current-Carrying Conductor and Parallel Wires",
      "Force on Moving Charge in Magnetic Field",
    ],
    qCount: 160,
    qPerPaper: 2.44,
    pctHard: 27,
    bucket: "longtail",
  },
  {
    slug: "thermal-properties-of-matter",
    name: "Thermal Properties of Matter",
    summary:
      "145 q - 2.28/paper - 14% HARD, and rising two years running. 93 of the 145 are radiation: Stefan and Wien as ratio questions.",
    chapter: "Thermal Properties of Matter",
    subtopics: [
      "Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body",
      "Thermal Expansion — Linear, Surface, Volumetric",
      "Heat Conduction and Thermal Resistance",
      "Calorimetry, Latent Heat, and Heat Capacity",
    ],
    qCount: 145,
    qPerPaper: 2.28,
    pctHard: 14,
    bucket: "longtail",
  },
  {
    slug: "dual-nature-of-radiation-and-matter",
    name: "Dual Nature of Radiation and Matter",
    summary:
      "131 q - 1.97/paper - 31% HARD. The hardest chapter in the bank, and one of the narrowest: two equations carry all of it.",
    chapter: "Dual Nature of Radiation and Matter",
    subtopics: [
      "Photoelectric Effect — Stopping Potential, Threshold, and Work Function",
      "de Broglie Wavelength and Matter Waves",
    ],
    qCount: 131,
    qPerPaper: 1.97,
    pctHard: 31,
    bucket: "longtail",
  },
  {
    slug: "current-electricity",
    name: "Current Electricity",
    summary:
      "134 q - 1.97/paper - 21% HARD. Meter conversions and Kirchhoff are the cheap entry; the bridges are 35% HARD.",
    chapter: "Current Electricity",
    subtopics: [
      "Galvanometer, Ammeter, and Voltmeter Conversion",
      "Kirchhoff's Laws and Circuit Analysis",
      "Potentiometer",
      "Wheatstone Bridge and Meter Bridge",
      "Ohm's Law, Cells, EMF, and Internal Resistance",
    ],
    qCount: 134,
    qPerPaper: 1.97,
    pctHard: 21,
    bucket: "longtail",
  },
  {
    slug: "structure-of-atoms-and-nuclei",
    name: "Structure of Atoms and Nuclei",
    summary:
      "140 q - 2.05/paper - 19% HARD. Radioactive decay at 3%; the Bohr page is scaling laws, and falls to ratios.",
    chapter: "Structure of Atoms and Nuclei",
    subtopics: [
      "Bohr Model and Atomic Properties",
      "Hydrogen Spectrum and Spectral Series",
      "Radioactive Decay and Half-Life",
    ],
    qCount: 140,
    qPerPaper: 2.05,
    pctHard: 19,
    bucket: "longtail",
  },
  {
    slug: "thermodynamics",
    name: "Thermodynamics",
    summary:
      "136 q - 1.97/paper - 21% HARD. The first law is cheap at 9%; the processes page holds the HARD at 31%.",
    chapter: "Thermodynamics",
    subtopics: [
      "First Law, Internal Energy, and Work-Heat Relations",
      "Isothermal, Adiabatic, Isobaric, and Isochoric Processes",
      "Carnot Engine, Efficiency, and Refrigerator",
    ],
    qCount: 136,
    qPerPaper: 1.97,
    pctHard: 21,
    bucket: "longtail",
  },
  {
    slug: "gravitation",
    name: "Gravitation",
    summary:
      "106 q - 1.05/paper - 25% HARD, halved in 2025 and still there in 2026. Variation of g is 43 questions at 7% HARD, the page to keep.",
    chapter: "Gravitation",
    subtopics: [
      "Variation of g with Depth, Altitude, Density, and Latitude",
      "Satellites, Orbital Motion, and Kepler's Laws",
      "Gravitational PE, Escape Velocity, and Energy",
      "Newton's Law of Gravitation and Gravitational Force",
    ],
    qCount: 106,
    qPerPaper: 1.05,
    pctHard: 25,
    bucket: "longtail",
  },
  {
    slug: "ray-optics",
    name: "Ray Optics",
    summary:
      "112 q - 1.23/paper - 25% HARD, and halved in 2025. Lenses and refraction are the core; the prism page is 40% HARD.",
    chapter: "Optics (Ray)",
    subtopics: [
      "Refraction, Apparent Depth, and Total Internal Reflection",
      "Lenses — Lens Formula, Power, and Lensmaker",
      "Prism — Deviation, Dispersion, and Refractive Index",
      "Optical Instruments — Microscope and Telescope",
      "Mirrors and Image Formation",
    ],
    qCount: 112,
    qPerPaper: 1.23,
    pctHard: 25,
    bucket: "longtail",
  },
  {
    slug: "sound",
    name: "Sound",
    summary:
      "70 q - 0.97/paper - 20% HARD. Doppler and pipes: the same material as Superposition of Waves, and cheap if prepared with it.",
    chapter: "Sound",
    subtopics: [
      "Pipes, Resonance, Overtones, and Beats",
      "Doppler Effect — Moving Source and Observer",
      "Sound Wave Properties, Speed, and Intensity",
    ],
    qCount: 70,
    qPerPaper: 0.97,
    pctHard: 20,
    bucket: "longtail",
  },
];

/** Every playbook slug, in catalog order. Drives generateStaticParams. */
export const PLAYBOOK_SLUGS: readonly string[] = PLAYBOOKS.map((p) => p.slug);

/** Playbooks in one strand, catalog order preserved. */
export function playbooksInBucket(bucket: PlaybookBucket): Playbook[] {
  return PLAYBOOKS.filter((p) => p.bucket === bucket);
}
