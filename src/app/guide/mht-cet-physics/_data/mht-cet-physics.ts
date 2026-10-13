/**
 * Static content + numbers for the /guide/mht-cet-physics route.
 *
 * Pulled from the live MHT-CET Physics PUBLIC bank (PYQ only). Editorial
 * numbers snapshot is `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template C, the MHT-CET Maths variant (chapter playbooks + tier strands +
 * formula compendium), chosen by measurement rather than copied:
 *
 *   - %HARD is spread, not flat: most chapters sit between 15% and 30% HARD,
 *     and inside a chapter it concentrates in one or two subtopics (Fluids:
 *     Surface Tension and Surface Energy 32% against Excess Pressure and
 *     Capillary Rise 5%). That is the cherry-pick pattern Template C exists for.
 *   - Execution-mode strands do not partition Physics: numerical answers run
 *     through every chapter but Semiconductor Devices (measured on the
 *     2021-2025 bank, 2026-09-28), so "calculate vs recall" sorts nothing.
 *     Tiers are forced, as they were for MHT-CET Maths.
 *   - The one big cross-chapter shape is the RATIO question: 459 stems across
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
 *      Physics clock, only a split you choose. Chemistry is ~3% HARD against
 *      Physics' 17%, so the split is the biggest single decision on the paper.
 *   3. WEIGHTAGE IS RECENT (2025-2026, 39 papers), not lifetime. 2025 halved
 *      Gravitation and Ray Optics and brought in Units and Measurement, and
 *      2026 held all three moves.
 *
 * The 68 papers are counted by year + pyq_note, never by source_file: re-dated
 * rows keep their old file (see scripts/lib/mhtcetTrendsMatrix.ts
 * canonicalPaperFiles). The 26 papers of 2026 hold 1,292 public questions, 8
 * short of 26 x 50: printed questions with a flaw stay out of the public bank,
 * so the recent rates sum to 49.8 a paper, not 50.
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
      "How MHT-CET Physics actually works: 50 questions sharing 90 minutes with Chemistry, no negative marking, and what 3,390 past-year questions across 68 papers reveal.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Quick-Win, Long Tail, and how to split the 90 minutes with Chemistry. Seven quick-win chapters give 14 questions a paper at 13% HARD or less.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "22 playbooks, one per chapter above 0.9 questions per paper. The subtopic split, where the HARD sits, and whether the chapter cherry-picks.",
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
      "The 2025 moves, held by 2026: Gravitation and Ray Optics halved and stayed down, Units and Measurement went from zero to a question a paper, Motion in a Plane nearly doubled.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The ratio question is 459 stems across 22 chapters, solved by proportion, not by calculation. Plus the sign, unit and figure traps the paper reuses.",
  },
];

export type Overview = {
  totalQ: number;
  /** Distinct papers, by year + pyq_note: 2021 = 1, 2022 = 1, 2023 = 16,
   *  2024 = 11, 2025 = 13, 2026 = 26. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count. 22 of the 24 chapters clear the 0.9 q/paper line. */
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
    /** durationMinutes / paperQuestions, the paper-wide average. */
    minutesPerQuestion: number;
  };
  /** A STARTING budget for the shared 90 minutes: a recommendation to test
   *  in timed mocks, not a measurement. Chemistry is ~3% HARD and much of it
   *  recall; Physics is 17% HARD. */
  timeSplit: { chemistryMinutes: number; physicsMinutes: number };
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

export const OVERVIEW: Overview = {
  totalQ: 3390,
  papers: 68,
  yearsCovered: 6, // 2021-2026 inclusive
  chapters: 24,
  playbooks: 22,
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
  // EASY 34.2% · MODERATE 49.1% · HARD 16.7%. Sums to totalQ.
  difficulty: { easy: 1158, moderate: 1666, hard: 566 },
  asOf: "2026-10-13",
};

/** Whether the chapter is still being set on current papers. */
export type ChapterStatus = "live" | "dropped" | "entered";

export type ChapterRow = {
  chapter: string; // canonical DB chapter name
  /** Lifetime PUBLIC PYQ count across all 68 papers. */
  qCount: number;
  /** % of the 3,390-question bank (1 decimal). */
  pctTotal: number;
  /** Questions per paper on RECENT papers (2025-2026, 39 papers). */
  qPerPaper: number;
  /** % HARD within the chapter (rounded integer). */
  pctHard: number;
  /** Subtopic split with counts and %HARD. Subtopic names are canonical DB
   *  strings: copy exactly. */
  focus: string;
  status?: ChapterStatus;
  /** The evidence behind a status, or a move worth flagging. */
  note?: string;
};

/** All 24 chapters, sorted by RECENT weightage. The qCounts sum to exactly
 *  3,390 (OVERVIEW.totalQ) and the qPerPaper figures to 49.8, the public
 *  questions per 2025-2026 paper (see the header). */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Electrostatics",
    qCount: 270,
    pctTotal: 8.0,
    qPerPaper: 3.95,
    pctHard: 18,
    focus:
      "Electric Potential and Potential Energy (68 · 18% HARD), Coulomb's Law and Electric Field (44 · 23%), Capacitance and Combinations of Capacitors (42 · 19%), Dielectrics in Capacitors (40 · 25%), Gauss's Law and Electric Flux (30 · 3%), Energy Stored in a Capacitor (30 · 23%), Electric Dipole — Field, Potential, Torque (16 · 6%). The heaviest chapter on the paper, and it cherry-picks: Gauss and the dipole are 46 questions with only two HARD ones between them.",
  },
  {
    chapter: "Rotational Dynamics",
    qCount: 204,
    pctTotal: 6.0,
    qPerPaper: 3.08,
    pctHard: 20,
    focus:
      "Parallel and Perpendicular Axis Theorems (41 · 44% HARD), Angular Momentum, Torque, and Conservation (38 · 8%), Rotational Kinetic Energy and Rolling Motion (37 · 11%), Moment of Inertia and Radius of Gyration (32 · 28%), Kinematics of Circular Motion (29 · 10%), Dynamics of Circular Motion — Banking, Conical Pendulum, Vertical Circle (27 · 15%). The axis theorems page alone holds 18 of the chapter's 41 HARD questions, nearly half; angular momentum (8%) and rolling (11%) are the cheap pages. It rose to 3.38 a paper in 2025, then settled at 2.92 in 2026.",
  },
  {
    chapter: "AC Circuits",
    qCount: 208,
    pctTotal: 6.1,
    qPerPaper: 3.05,
    pctHard: 10,
    focus:
      "Resonance in Series LCR Circuits (50 · 12% HARD), Series LCR — Impedance, Phase and Phasors (46 · 15%), Reactance — Inductive, Capacitive, and Single-Element Circuits (41 · 2%), Power in AC Circuit — Average, Factor, Wattless (38 · 3%), LC Oscillations, Transformer, and AC Generator (19 · 21%), RMS, Peak, and AC Source Characteristics (14 · 7%). Three a paper at 10% HARD; reactance and power are the cheap half, 79 questions with two HARD ones.",
  },
  {
    chapter: "Superposition of Waves",
    qCount: 205,
    pctTotal: 6.0,
    qPerPaper: 3.05,
    pctHard: 21,
    focus:
      "Stationary Waves and Vibrating Strings (57 · 19% HARD), Progressive Wave, Wave Equation, and Velocity (57 · 9%), Pipes, Resonance Tube, and Doppler Effect (43 · 37%), Beats and Sonometer (35 · 29%), Superposition, Phase/Path Difference, and Interference (13 · 8%). The wave equation page is the cheap entry; pipes, beats and the sonometer carry the HARD.",
  },
  {
    chapter: "Semiconductor Devices",
    qCount: 206,
    pctTotal: 6.1,
    qPerPaper: 3.0,
    pctHard: 3,
    focus:
      "Logic Gates and Boolean Algebra (56 · 11% HARD), Transistors — BJT, CE Amplifier, and Gain (47 · 0%), Band Theory, Doping, and Semiconductor Types (34 · 0%), Special Diodes — Zener, LED, Photodiode (24 · 0%), Diode Circuits and Rectifiers (24 · 4%), p-n Junction — Depletion Layer and Biasing (21 · 0%). Three questions a paper at 3% HARD, the best return on the whole Physics paper. Most of it is recall and gate-reading, not calculation.",
  },
  {
    chapter: "Mechanical Properties of Fluids",
    qCount: 201,
    pctTotal: 5.9,
    qPerPaper: 2.95,
    pctHard: 18,
    focus:
      "Surface Tension and Surface Energy (66 · 32% HARD), Excess Pressure and Capillary Rise (63 · 5%), Viscosity, Stokes' Law, Terminal Velocity, and Reynolds (33 · 12%), Bernoulli, Continuity, Streamline, and Torricelli (25 · 16%), Pressure, Buoyancy, and Archimedes (14 · 36%). Nearly two thirds of it is surface tension, and the capillary half of that is 63 questions with only three HARD.",
  },
  {
    chapter: "Wave Optics",
    qCount: 188,
    pctTotal: 5.5,
    qPerPaper: 2.79,
    pctHard: 16,
    focus:
      "Young's Double Slit — Fringe Width, Positions and Shifts (68 · 16% HARD), Single Slit Diffraction and Resolving Power (50 · 18%), Interference Intensity and Coherent Sources (43 · 16%), Polarisation — Malus and Brewster (19 · 16%), Wavefronts, Huygens, and Coherence (8 · 0%). The HARD is spread evenly across the pages, so this chapter does not cherry-pick.",
  },
  {
    chapter: "Electromagnetic Induction",
    qCount: 190,
    pctTotal: 5.6,
    qPerPaper: 2.74,
    pctHard: 9,
    focus:
      "Self-Inductance, Energy Stored, and LR Circuit (67 · 12% HARD), Mutual Inductance, Coupling, and Transformer/Generator (56 · 7%), Faraday's and Lenz's Laws — Induced EMF, Current, and Charge (40 · 0%), Motional EMF and Rotating Conductors (27 · 22%). Nearly three a paper at 9% HARD, one of the cheapest heavyweights on the paper after Semiconductor Devices.",
  },
  {
    chapter: "Oscillations",
    qCount: 179,
    pctTotal: 5.3,
    qPerPaper: 2.69,
    pctHard: 19,
    focus:
      "SHM Kinematics — Displacement, Velocity, Phase, and Damping (66 · 17% HARD), Spring-Mass and Other SHM Systems (43 · 26%), Simple Pendulum — Period, Lift, Weightlessness (37 · 24%), SHM Energy — Kinetic, Potential, and Total (33 · 9%). Energy is the cheap page; spring systems and the pendulum carry the HARD.",
  },
  {
    chapter: "Magnetic Fields Due to Electric Current",
    qCount: 160,
    pctTotal: 4.7,
    qPerPaper: 2.44,
    pctHard: 27,
    focus:
      "Magnetic Field of Current-Carrying Conductor (83 · 28% HARD), Magnetic Moment of Current Loop and Galvanometer Instruments (34 · 38%), Force on Moving Charge in Magnetic Field (22 · 0%), Force on Current-Carrying Conductor and Parallel Wires (21 · 33%). Heavy and hard: the field-of-a-conductor page is half the chapter at 28% HARD, much of it figure-based.",
  },
  {
    chapter: "Thermal Properties of Matter",
    qCount: 145,
    pctTotal: 4.3,
    qPerPaper: 2.28,
    pctHard: 14,
    focus:
      "Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body (93 · 18% HARD), Thermal Expansion — Linear, Surface, Volumetric (26 · 12%), Heat Conduction and Thermal Resistance (18 · 6%), Calorimetry, Latent Heat, and Heat Capacity (8 · 0%). On this paper the chapter is mostly radiation: 93 of its 145 questions.",
    note:
      "Rising two years running: 1.89 questions a paper across the 27 papers of 2023-24, then 2.15 in 2025 and 2.35 in 2026. It now outweighs Atoms and Nuclei, Thermodynamics and Dual Nature.",
  },
  {
    chapter: "Structure of Atoms and Nuclei",
    qCount: 140,
    pctTotal: 4.1,
    qPerPaper: 2.05,
    pctHard: 19,
    focus:
      "Bohr Model and Atomic Properties (67 · 24% HARD), Hydrogen Spectrum and Spectral Series (39 · 23%), Radioactive Decay and Half-Life (34 · 3%). Radioactive decay is the cheap page, one HARD question in 34; the Bohr scaling laws carry the HARD.",
  },
  {
    chapter: "Current Electricity",
    qCount: 134,
    pctTotal: 4.0,
    qPerPaper: 1.97,
    pctHard: 21,
    focus:
      "Galvanometer, Ammeter, and Voltmeter Conversion (37 · 14% HARD), Potentiometer (36 · 17%), Wheatstone Bridge and Meter Bridge (31 · 35%), Kirchhoff's Laws and Circuit Analysis (26 · 15%), Ohm's Law, Cells, EMF, and Internal Resistance (4 · 50%). The meter conversions are the cheap entry; bridges carry the HARD.",
  },
  {
    chapter: "Thermodynamics",
    qCount: 136,
    pctTotal: 4.0,
    qPerPaper: 1.97,
    pctHard: 21,
    focus:
      "Isothermal, Adiabatic, Isobaric, and Isochoric Processes (65 · 31% HARD), First Law, Internal Energy, and Work-Heat Relations (53 · 9%), Carnot Engine, Efficiency, and Refrigerator (18 · 17%). The first law is cheap; the processes page holds 20 of the chapter's 28 HARD questions.",
  },
  {
    chapter: "Dual Nature of Radiation and Matter",
    qCount: 131,
    pctTotal: 3.9,
    qPerPaper: 1.97,
    pctHard: 31,
    focus:
      "Photoelectric Effect — Stopping Potential, Threshold, and Work Function (87 · 38% HARD), de Broglie Wavelength and Matter Waves (44 · 16%). The hardest chapter in the bank at 31%, but two equations do nearly all of it.",
  },
  {
    chapter: "Motion in a Plane",
    qCount: 109,
    pctTotal: 3.2,
    qPerPaper: 1.95,
    pctHard: 6,
    focus:
      "Vector Operations and Components (35 · 9% HARD), Kinematics — Equations of Motion, Free Fall, and Graphs (27 · 0%), Uniform Circular Motion — Centripetal Acceleration, Banking (18 · 6%), Projectile Motion — Range, Height, and Time of Flight (18 · 6%), Relative Motion and Meeting Problems (11 · 9%). Six HARD questions in 109, the cheapest mechanics chapter on the paper.",
    note:
      "Nearly doubled: 1.00 question a paper across the 27 papers of 2023-24, then 1.54 in 2025 and 2.15 in 2026. The biggest rise of any chapter that was already on the paper.",
  },
  {
    chapter: "Kinetic Theory of Gases",
    qCount: 121,
    pctTotal: 3.6,
    qPerPaper: 1.69,
    pctHard: 11,
    focus:
      "Kinetic Theory — Pressure, RMS Speed, and Temperature (48 · 17% HARD), Average KE, Equipartition, and Specific Heats (43 · 12%), Gas Laws and Ideal Gas Equation (30 · 0%). Close to two a paper at 11% HARD, and most of it is one proportionality: v_rms ∝ √(T/M).",
  },
  {
    chapter: "Optics (Ray)",
    qCount: 112,
    pctTotal: 3.3,
    qPerPaper: 1.23,
    pctHard: 25,
    focus:
      "Refraction, Apparent Depth, and Total Internal Reflection (37 · 19% HARD), Lenses — Lens Formula, Power, and Lensmaker (34 · 26%), Prism — Deviation, Dispersion, and Refractive Index (25 · 40%), Optical Instruments — Microscope and Telescope (10 · 10%), Mirrors and Image Formation (6 · 17%). Expensive at 25% HARD, with the prism page the worst at 40%.",
    note:
      "Halved in 2025 and stayed low: 2.19 questions a paper across the 27 papers of 2023-24, then 1.08 in 2025 and 1.31 in 2026. Still live, but no longer worth two questions of prep.",
  },
  {
    chapter: "Gravitation",
    qCount: 106,
    pctTotal: 3.1,
    qPerPaper: 1.05,
    pctHard: 25,
    focus:
      "Variation of g with Depth, Altitude, Density, and Latitude (43 · 7% HARD), Gravitational PE, Escape Velocity, and Energy (28 · 50%), Satellites, Orbital Motion, and Kepler's Laws (27 · 22%), Newton's Law of Gravitation and Gravitational Force (8 · 50%). Variation of g is 43 questions at 7% HARD, the cheap page in a chapter that halved in 2025 and stayed there.",
    note:
      "Halved in 2025 and stayed there: 2.26 questions a paper across the 27 papers of 2023-24, then 1.15 in 2025 and exactly one on every 2026 paper. Still set on all 39 papers of 2025-26, so cut its prep hours, not the chapter.",
  },
  {
    chapter: "Units and Measurement",
    qCount: 40,
    pctTotal: 1.2,
    qPerPaper: 1.03,
    pctHard: 0,
    focus:
      "Units, Dimensions, and Error Analysis (40 · 0% HARD). 35 of the 40 are about measurement error, most of them how percentage errors add through a formula.",
    status: "entered",
    note:
      "Entered with 2025 and held in 2026: zero questions in the 29 papers before 2025, then 14 in the 13 papers of 2025 and 26 in the 26 papers of 2026. Anyone prepping from older papers has never seen it set, and it has never produced a HARD question.",
  },
  {
    chapter: "Sound",
    qCount: 70,
    pctTotal: 2.1,
    qPerPaper: 0.97,
    pctHard: 20,
    focus:
      "Pipes, Resonance, Overtones, and Beats (27 · 33% HARD), Doppler Effect — Moving Source and Observer (24 · 13%), Sound Wave Properties, Speed, and Intensity (19 · 11%). It overlaps Superposition of Waves almost completely, so prepare the two together.",
  },
  {
    chapter: "Laws of Motion",
    qCount: 71,
    pctTotal: 2.1,
    qPerPaper: 0.97,
    pctHard: 13,
    focus:
      "Newton's Laws — Force, Tension, Lift, and Connected Blocks (32 · 16% HARD), Impulse, Momentum, and Collisions (30 · 10%), Equilibrium, Centre of Mass, and Friction (9 · 11%). About a question a paper at 13% HARD, and the method (a free-body diagram per block) is the same one Rotational Dynamics and Oscillations use.",
  },
  {
    chapter: "Magnetic Materials",
    qCount: 54,
    pctTotal: 1.6,
    qPerPaper: 0.79,
    pctHard: 4,
    focus:
      "Magnetisation, Susceptibility, Permeability, and B-H-M Relations (26 · 4% HARD), Magnetic Dipole Moment and Bar Magnet (14 · 7%), Classification, Curie's Law, Hysteresis, and Shielding (14 · 0%). Below the playbook line, but two HARD questions in 54: a cheap mark most papers carry.",
  },
  {
    chapter: "Mechanical Properties of Solids",
    qCount: 10,
    pctTotal: 0.3,
    qPerPaper: 0.1,
    pctHard: 20,
    focus:
      "Elasticity, Springs, and Energy in Strained Solids (10 · 20% HARD). Ten questions in 68 papers: none in 2025, four in 2026. Read the spring and elastic-energy formulas once; do not drill it.",
  },
];
