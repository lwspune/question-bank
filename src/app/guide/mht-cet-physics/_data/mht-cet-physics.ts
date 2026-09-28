/**
 * Static content + numbers for the /guide/mht-cet-physics route.
 *
 * Pulled from the live MHT-CET Physics PUBLIC bank (PYQ only). Editorial
 * numbers snapshot is `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template C, the MHT-CET Maths variant (chapter playbooks + tier strands +
 * formula compendium), chosen by measurement rather than copied:
 *
 *   - %HARD is spread, not flat: 18 of 24 chapters are above 15% HARD, and
 *     inside a chapter it concentrates in one or two subtopics (Fluids:
 *     Pressure, Buoyancy, and Archimedes 83% against Excess Pressure and
 *     Capillary Rise 0%). That is the cherry-pick pattern Template C exists for.
 *   - Execution-mode strands do not partition Physics: 44-70% of every
 *     chapter's answers are numbers (Semiconductor Devices, at 24%, is the one
 *     exception), so "calculate vs recall" sorts nothing. Tiers are forced, as
 *     they were for MHT-CET Maths.
 *   - The one big cross-chapter shape is the RATIO question — 279 stems across
 *     22 of 24 chapters. It is a technique, not a topic, so it lives on
 *     /traps and in the strategy approach, not as a principles route.
 *
 * THREE FACTS SHAPE THE WHOLE GUIDE:
 *
 *   1. NO NEGATIVE MARKING. There is no attempt-versus-skip decision; the axis
 *      is ORDER and TIME, exactly as for Maths.
 *   2. PHYSICS SHARES ITS PAPER. Paper II is Physics (questions 1-50) and
 *      Chemistry (51-100), 1 mark each, 100 questions in 90 minutes
 *      (src/lib/mocks/blueprints.ts MHT_CET_PHY_CHEM_PAPER). There is no
 *      Physics clock — only a split you choose. Chemistry is ~3% HARD against
 *      Physics' 18%, so the split is the biggest single decision on the paper.
 *   3. WEIGHTAGE IS RECENT (2024-2025, 24 papers), not lifetime. 2025 halved
 *      Gravitation and Ray Optics and brought in Units and Measurement.
 *
 * The 42 papers are counted by year + pyq_note, never by source_file: re-dated
 * rows keep their old file (see scripts/lib/mhtcetTrendsMatrix.ts
 * canonicalPaperFiles).
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/mht-cet-physics (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes, in reading order. No ncert-map: MHT-CET follows the
 *  Maharashtra State Board syllabus, not NCERT. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How MHT-CET Physics actually works — 50 questions sharing 90 minutes with Chemistry, no negative marking, and what 2,098 past-year questions across 42 papers reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Quick-Win, Long Tail — and how to split the 90 minutes with Chemistry. Six quick-win chapters give 13 questions a paper at 14% HARD or less.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "21 playbooks — one per chapter above 0.9 questions per paper. The subtopic split, where the HARD sits, and whether the chapter cherry-picks.",
  },
  {
    slug: "formulas",
    label: "Formulas",
    blurb:
      "Single-page index of the formulas MHT-CET Physics actually tests, grouped by chapter. With about a minute a question, recall has to be instant.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "The 2025 moves, in numbers — Gravitation and Ray Optics halved, Units and Measurement went from zero to a question a paper, Motion in a Plane rose by half.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The ratio question is 279 stems across 22 chapters — solved by proportion, not by calculation. Plus the sign, unit and figure traps the paper reuses.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct papers, by year + pyq_note: 2021 = 1, 2022 = 1, 2023 = 16,
   *  2024 = 11, 2025 = 13. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count. 21 of the 24 chapters clear the 0.9 q/paper line. */
  playbooks: number;
  /** Paper II is Physics + Chemistry. `questions` / `totalMarks` are the
   *  Physics half; `paperQuestions` and `durationMinutes` are the whole
   *  shared paper. */
  paper: {
    questions: number;
    marksPerQuestion: number;
    totalMarks: number;
    paperQuestions: number;
    durationMinutes: number;
    negativeMarking: false;
    /** durationMinutes / paperQuestions — the paper-wide average. */
    minutesPerQuestion: number;
  };
  /** A STARTING budget for the shared 90 minutes — a recommendation to test
   *  in timed mocks, not a measurement. Chemistry is ~3% HARD and much of it
   *  recall; Physics is 18% HARD. */
  timeSplit: { chemistryMinutes: number; physicsMinutes: number };
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

export const OVERVIEW: Overview = {
  totalQ: 2098,
  papers: 42,
  yearsCovered: 5, // 2021-2025 inclusive
  chapters: 24,
  playbooks: 21,
  paper: {
    questions: 50,
    marksPerQuestion: 1,
    totalMarks: 50,
    paperQuestions: 100,
    durationMinutes: 90,
    negativeMarking: false,
    minutesPerQuestion: 0.9,
  },
  timeSplit: { chemistryMinutes: 35, physicsMinutes: 55 },
  // EASY 31.4% · MODERATE 50.4% · HARD 18.2%. Sums to totalQ.
  difficulty: { easy: 659, moderate: 1057, hard: 382 },
  asOf: "2026-09-28",
};

/** Whether the chapter is still being set on current papers. */
export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string; // canonical DB chapter name
  /** Lifetime PUBLIC PYQ count across all 42 papers. */
  qCount: number;
  /** % of the 2,098-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT papers (2024-2025, 24 papers). */
  qPerPaper: number;
  /** % HARD within the chapter (rounded integer). */
  pctHard: number;
  /** Subtopic split with counts and %HARD. Subtopic names are canonical DB
   *  strings — copy exactly. */
  focus: string;
  status?: ChapterStatus;
  /** The evidence behind a status, or a move worth flagging. */
  note?: string;
};

/** All 24 chapters, sorted by RECENT weightage. The qCounts sum to exactly
 *  2,098 (OVERVIEW.totalQ) and the qPerPaper figures to 50.0. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Electrostatics",
    qCount: 166,
    pctTotal: 7.9,
    qPerPaper: 3.83,
    pctHard: 22,
    focus:
      "Electric Potential and Potential Energy (43 · 21% HARD), Coulomb's Law and Electric Field (27 · 30%), Capacitance and Combinations of Capacitors (23 · 17%), Dielectrics in Capacitors (23 · 39%), Energy Stored in a Capacitor (21 · 29%), Gauss's Law and Electric Flux (20 · 0%), Electric Dipole — Field, Potential, Torque (9 · 0%). The heaviest chapter on the paper, and it cherry-picks: Gauss and the dipole are 29 questions without a single HARD one.",
  },
  {
    chapter: "Rotational Dynamics",
    qCount: 128,
    pctTotal: 6.1,
    qPerPaper: 3.13,
    pctHard: 21,
    focus:
      "Parallel and Perpendicular Axis Theorems (25 · 48% HARD), Rotational Kinetic Energy and Rolling Motion (24 · 8%), Moment of Inertia and Radius of Gyration (23 · 26%), Angular Momentum, Torque, and Conservation (22 · 5%), Dynamics of Circular Motion — Banking, Conical Pendulum, Vertical Circle (17 · 18%), Kinematics of Circular Motion (17 · 18%). Half the chapter's HARD sits in the axis theorems; rolling and angular momentum are nearly free. Up from 2.89 to 3.38 a paper in 2025.",
  },
  {
    chapter: "Semiconductor Devices",
    qCount: 129,
    pctTotal: 6.1,
    qPerPaper: 3.08,
    pctHard: 3,
    focus:
      "Logic Gates and Boolean Algebra (36 · 8% HARD), Transistors — BJT, CE Amplifier, and Gain (29 · 0%), Band Theory, Doping, and Semiconductor Types (18 · 0%), Diode Circuits and Rectifiers (18 · 6%), p-n Junction — Depletion Layer and Biasing (14 · 0%), Special Diodes — Zener, LED, Photodiode (14 · 0%). Three questions a paper at 3% HARD — the best return on the whole Physics paper. Most of it is recall and gate-reading, not calculation.",
  },
  {
    chapter: "AC Circuits",
    qCount: 129,
    pctTotal: 6.1,
    qPerPaper: 3.0,
    pctHard: 12,
    focus:
      "Series LCR — Impedance, Phase and Phasors (33 · 15% HARD), Resonance in Series LCR Circuits (32 · 16%), Power in AC Circuit — Average, Factor, Wattless (25 · 4%), Reactance — Inductive, Capacitive, and Single-Element Circuits (23 · 0%), LC Oscillations, Transformer, and AC Generator (9 · 33%), RMS, Peak, and AC Source Characteristics (7 · 14%). Three a paper at 12% HARD; reactance and power are the cheap half.",
  },
  {
    chapter: "Superposition of Waves",
    qCount: 123,
    pctTotal: 5.9,
    qPerPaper: 3.0,
    pctHard: 20,
    focus:
      "Stationary Waves and Vibrating Strings (36 · 19% HARD), Progressive Wave, Wave Equation, and Velocity (34 · 9%), Pipes, Resonance Tube, and Doppler Effect (23 · 22%), Beats and Sonometer (22 · 41%), Superposition, Phase/Path Difference, and Interference (8 · 13%). The wave equation page is the cheap entry; beats and the sonometer carry the HARD.",
  },
  {
    chapter: "Mechanical Properties of Fluids",
    qCount: 124,
    pctTotal: 5.9,
    qPerPaper: 2.96,
    pctHard: 19,
    focus:
      "Surface Tension and Surface Energy (42 · 29% HARD), Excess Pressure and Capillary Rise (38 · 0%), Viscosity, Stokes' Law, Terminal Velocity, and Reynolds (21 · 19%), Bernoulli, Continuity, Streamline, and Torricelli (17 · 18%), Pressure, Buoyancy, and Archimedes (6 · 83%). Two thirds of it is surface tension, and the capillary half of that has never produced a HARD question.",
  },
  {
    chapter: "Wave Optics",
    qCount: 117,
    pctTotal: 5.6,
    qPerPaper: 2.96,
    pctHard: 19,
    focus:
      "Young's Double Slit — Fringe Width, Positions and Shifts (39 · 21% HARD), Single Slit Diffraction and Resolving Power (34 · 21%), Interference Intensity and Coherent Sources (29 · 21%), Polarisation — Malus and Brewster (10 · 10%), Wavefronts, Huygens, and Coherence (5 · 0%). The HARD is spread evenly across the three big pages, so this chapter does not cherry-pick.",
  },
  {
    chapter: "Electromagnetic Induction",
    qCount: 119,
    pctTotal: 5.7,
    qPerPaper: 2.92,
    pctHard: 9,
    focus:
      "Self-Inductance, Energy Stored, and LR Circuit (43 · 9% HARD), Mutual Inductance, Coupling, and Transformer/Generator (35 · 9%), Faraday's and Lenz's Laws — Induced EMF, Current, and Charge (22 · 0%), Motional EMF and Rotating Conductors (19 · 21%). Nearly three a paper at 9% HARD — the second-best return on the paper after Semiconductor Devices.",
  },
  {
    chapter: "Oscillations",
    qCount: 110,
    pctTotal: 5.2,
    qPerPaper: 2.63,
    pctHard: 19,
    focus:
      "SHM Kinematics — Displacement, Velocity, Phase, and Damping (44 · 16% HARD), Spring-Mass and Other SHM Systems (25 · 28%), Simple Pendulum — Period, Lift, Weightlessness (24 · 21%), SHM Energy — Kinetic, Potential, and Total (17 · 12%). Kinematics and energy are the cheap two; spring systems carry the HARD.",
  },
  {
    chapter: "Magnetic Fields Due to Electric Current",
    qCount: 98,
    pctTotal: 4.7,
    qPerPaper: 2.42,
    pctHard: 29,
    focus:
      "Magnetic Field of Current-Carrying Conductor (52 · 33% HARD), Magnetic Moment of Current Loop and Galvanometer Instruments (20 · 25%), Force on Current-Carrying Conductor and Parallel Wires (14 · 43%), Force on Moving Charge in Magnetic Field (12 · 0%). Heavy and hard: the field-of-a-conductor page is half the chapter at a third HARD, much of it figure-based.",
  },
  {
    chapter: "Thermal Properties of Matter",
    qCount: 84,
    pctTotal: 4.0,
    qPerPaper: 2.13,
    pctHard: 17,
    focus:
      "Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body (53 · 23% HARD), Thermal Expansion — Linear, Surface, Volumetric (19 · 11%), Heat Conduction and Thermal Resistance (8 · 0%), Calorimetry, Latent Heat, and Heat Capacity (4 · 0%). On this paper the chapter is mostly radiation — 53 of its 84 questions.",
  },
  {
    chapter: "Dual Nature of Radiation and Matter",
    qCount: 82,
    pctTotal: 3.9,
    qPerPaper: 2.04,
    pctHard: 32,
    focus:
      "Photoelectric Effect — Stopping Potential, Threshold, and Work Function (56 · 36% HARD), de Broglie Wavelength and Matter Waves (26 · 23%). The hardest chapter in the bank at 32% — but two equations do nearly all of it.",
  },
  {
    chapter: "Current Electricity",
    qCount: 82,
    pctTotal: 3.9,
    qPerPaper: 1.96,
    pctHard: 24,
    focus:
      "Galvanometer, Ammeter, and Voltmeter Conversion (24 · 17% HARD), Kirchhoff's Laws and Circuit Analysis (19 · 16%), Potentiometer (18 · 28%), Wheatstone Bridge and Meter Bridge (17 · 35%), Ohm's Law, Cells, EMF, and Internal Resistance (4 · 50%). The meter conversions are the cheap entry; bridges carry the HARD.",
  },
  {
    chapter: "Structure of Atoms and Nuclei",
    qCount: 85,
    pctTotal: 4.1,
    qPerPaper: 1.96,
    pctHard: 22,
    focus:
      "Bohr Model and Atomic Properties (39 · 28% HARD), Hydrogen Spectrum and Spectral Series (28 · 25%), Radioactive Decay and Half-Life (18 · 6%). Radioactive decay is the cheap page; the Bohr scaling laws carry the HARD.",
  },
  {
    chapter: "Kinetic Theory of Gases",
    qCount: 80,
    pctTotal: 3.8,
    qPerPaper: 1.96,
    pctHard: 14,
    focus:
      "Kinetic Theory — Pressure, RMS Speed, and Temperature (36 · 22% HARD), Average KE, Equipartition, and Specific Heats (25 · 12%), Gas Laws and Ideal Gas Equation (19 · 0%). Two a paper at 14% HARD, and most of it is one proportionality: v_rms ∝ √(T/M).",
  },
  {
    chapter: "Thermodynamics",
    qCount: 84,
    pctTotal: 4.0,
    qPerPaper: 1.92,
    pctHard: 21,
    focus:
      "First Law, Internal Energy, and Work-Heat Relations (37 · 11% HARD), Isothermal, Adiabatic, Isobaric, and Isochoric Processes (36 · 31%), Carnot Engine, Efficiency, and Refrigerator (11 · 27%). The first law is cheap; the processes page holds most of the HARD.",
  },
  {
    chapter: "Gravitation",
    qCount: 80,
    pctTotal: 3.8,
    qPerPaper: 1.75,
    pctHard: 23,
    focus:
      "Variation of g with Depth, Altitude, Density, and Latitude (33 · 3% HARD), Satellites, Orbital Motion, and Kepler's Laws (21 · 29%), Gravitational PE, Escape Velocity, and Energy (19 · 42%), Newton's Law of Gravitation and Gravitational Force (7 · 43%). Variation of g is 33 questions at 3% HARD — the cheap page in a chapter that halved in 2025.",
    note:
      "Halved in 2025: 2.26 questions a paper across the 27 papers of 2023-24, then 1.15 across the 13 of 2025. Still set every year — cut its prep hours, not the chapter.",
  },
  {
    chapter: "Optics (Ray)",
    qCount: 78,
    pctTotal: 3.7,
    qPerPaper: 1.5,
    pctHard: 29,
    focus:
      "Refraction, Apparent Depth, and Total Internal Reflection (26 · 27% HARD), Lenses — Lens Formula, Power, and Lensmaker (24 · 25%), Prism — Deviation, Dispersion, and Refractive Index (17 · 47%), Optical Instruments — Microscope and Telescope (6 · 17%), Mirrors and Image Formation (5 · 20%). Expensive at 29% HARD, with the prism page the worst at 47%.",
    note:
      "Halved in 2025: 2.19 questions a paper across 2023-24, then 1.08 across 2025. Like Gravitation, still live — but no longer worth two questions of prep.",
  },
  {
    chapter: "Motion in a Plane",
    qCount: 53,
    pctTotal: 2.5,
    qPerPaper: 1.33,
    pctHard: 6,
    focus:
      "Kinematics — Equations of Motion, Free Fall, and Graphs (19 · 0% HARD), Uniform Circular Motion — Centripetal Acceleration, Banking (11 · 0%), Vector Operations and Components (10 · 20%), Relative Motion and Meeting Problems (7 · 0%), Projectile Motion — Range, Height, and Time of Flight (6 · 17%). 6% HARD and rising: 1.00 a paper in 2023-24, 1.54 in 2025.",
  },
  {
    chapter: "Laws of Motion",
    qCount: 47,
    pctTotal: 2.2,
    qPerPaper: 1.04,
    pctHard: 11,
    focus:
      "Newton's Laws — Force, Tension, Lift, and Connected Blocks (25 · 12% HARD), Impulse, Momentum, and Collisions (17 · 6%), Equilibrium, Centre of Mass, and Friction (5 · 20%). A question a paper at 11% HARD, and the method (a free-body diagram per block) is the same one Rotational Dynamics and Oscillations use.",
  },
  {
    chapter: "Sound",
    qCount: 47,
    pctTotal: 2.2,
    qPerPaper: 1.04,
    pctHard: 21,
    focus:
      "Pipes, Resonance, Overtones, and Beats (22 · 27% HARD), Doppler Effect — Moving Source and Observer (19 · 16%), Sound Wave Properties, Speed, and Intensity (6 · 17%). It overlaps Superposition of Waves almost completely — prepare the two together.",
  },
  {
    chapter: "Magnetic Materials",
    qCount: 33,
    pctTotal: 1.6,
    qPerPaper: 0.79,
    pctHard: 3,
    focus:
      "Magnetisation, Susceptibility, Permeability, and B-H-M Relations (13 · 0% HARD), Classification, Curie's Law, Hysteresis, and Shielding (10 · 0%), Magnetic Dipole Moment and Bar Magnet (10 · 10%). Below the playbook line, but one HARD question in 33 — a cheap mark most papers carry.",
  },
  {
    chapter: "Units and Measurement",
    qCount: 14,
    pctTotal: 0.7,
    qPerPaper: 0.58,
    pctHard: 0,
    focus:
      "Units, Dimensions, and Error Analysis (14 · 0% HARD). The recent rate hides the move — see the note. Ten of the 14 are error propagation.",
    status: "entered",
    note:
      "Entered with 2025: zero questions in the 29 papers before 2025, then 14 in the 13 papers of 2025 — 1.08 a paper. Anyone prepping from 2023-24 papers has never seen it set, and it has never produced a HARD question.",
  },
  {
    chapter: "Mechanical Properties of Solids",
    qCount: 6,
    pctTotal: 0.3,
    qPerPaper: 0.08,
    pctHard: 17,
    focus:
      "Elasticity, Springs, and Energy in Strained Solids (6 · 17% HARD). Six questions in 42 papers, none in 2025. Read the spring and elastic-energy formulas once; do not drill it.",
  },
];
