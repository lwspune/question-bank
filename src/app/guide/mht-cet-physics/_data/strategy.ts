/**
 * Content for /guide/mht-cet-physics/strategy.
 *
 * TWO FACTS SHAPE THIS FILE.
 *
 * 1. NO NEGATIVE MARKING. A blank and a wrong answer both score zero, so every
 *    question gets an answer and the axis is ORDER and TIME, never
 *    attempt-versus-skip — the MHT-CET Maths rule, unchanged.
 *
 * 2. PHYSICS SHARES ITS CLOCK. Paper II is Physics (1-50) and Chemistry
 *    (51-100), 1 mark each, 100 questions in 90 minutes. Nothing stops you
 *    spending 70 minutes on Physics, and nothing gives it back. Chemistry is
 *    ~3% HARD against Physics' 18%, so the recommended split gives Physics the
 *    larger share: 55 minutes for its 50 questions (1.1 a question) and 35 for
 *    Chemistry. That split is a STARTING BUDGET to test in timed mocks, not a
 *    measurement, and the page says so.
 *
 * TIERING is on RECENT weightage (2024-2025, 24 papers) plus %HARD.
 *
 * NUMBERS. Chapter q-counts and %HARD are lifetime figures over the 2,098
 * PUBLIC past-year questions (42 papers, 2021-2025, 24 chapters). Strand
 * qCount is the sum of its chapters and pctOfBank that sum over 2,098. The
 * three strands plus the three tail chapters reconcile to 2,098 exactly
 * (768 + 557 + 720 + 53), and their recent rates to 50.0 questions a paper
 * (18.51 + 13.33 + 16.72 + 1.45).
 *
 * `mustDrill` / `skipSubtopics` / `targetHard` hold canonical DB subtopic
 * names, resolved to UUIDs at request time for /browse drill links. A typo
 * silently produces an empty drill — tests/guide-mht-cet-physics-playbooks
 * .test.ts resolves every one against the live taxonomy.
 */

import type { Difficulty } from "@/lib/questions/filters";

/** How to attack a chapter on an exam with NO NEGATIVE MARKING: when in the
 *  paper you reach it and how long you may stay — never whether to attempt. */
export type DrillPosture =
  /** Cheap and fast: answer on the opening sweep, inside the budget. */
  | "bank-first"
  /** HARD spread across the subtopics, so nothing to cherry-pick. */
  | "own-outright"
  /** Cheap subtopics on the first sweep, expensive ones on the second pass. */
  | "split-pass"
  /** About a question a paper and expensive: last, and still answered. */
  | "last-pass-guess";

export type StrandChapter = {
  chapter: string;
  /** Lifetime PUBLIC PYQ count for the chapter (of 2,098). */
  qCount: number;
  pctHard: number;
  posture: DrillPosture;
  /** Subtopics to drill, in prep order — cheapest first. */
  mustDrill: string[];
  /** Last in the PREP queue — never an instruction to leave a question blank. */
  skipSubtopics?: string[];
  /** Subtopics whose HARD pool deserves extra timed reps. */
  targetHard?: string[];
  /** Recent q/paper and the marks that implies at 1 mark each. */
  expectedYieldPerPaper: string;
  studyHours: number;
  summary: string;
};

export type StrategyStrand = {
  id: "cornerstone" | "quickwin" | "longtail";
  label: string;
  qCount: number;
  pctOfBank: number;
  pitch: string;
  approach: string[];
  chapters: StrandChapter[];
};

/**
 * Headline numbers. The Physics half of Paper II: 50 q x 1 mark = 50 marks.
 * penaltyPerWrong is 0, so targetAttempts MUST equal paperQ. 50 answers at 70%
 * is 35 correct = 35 marks. `minutesPerQuestion` is the RECOMMENDED Physics
 * budget (55 of the shared 90 minutes over 50 questions), not a paper rule.
 */
export const STRATEGY_HEADLINE = {
  paperQ: 50,
  totalMarks: 50,
  marksPerCorrect: 1,
  penaltyPerWrong: 0,
  targetMarks: 35,
  targetAttempts: 50,
  targetAccuracyPct: 70,
  /** The whole Paper II clock, shared with Chemistry. */
  sharedPaperMinutes: 90,
  /** The recommended Physics share of it. */
  durationMin: 55,
  minutesPerQuestion: 1.1,
};

/** The shared-clock plan, rendered as its own section on /strategy. */
export const TIME_SPLIT = {
  chemistryMinutes: 35,
  physicsMinutes: 55,
  reviewMinutes: 0,
  lines: [
    "Paper II gives you 90 minutes for 100 questions and does not divide them. Physics is questions 1-50 and Chemistry 51-100, but you may answer in any order and spend the time however you like.",
    "The two halves do not cost the same. MHT-CET Chemistry is about 3% HARD and much of it is recall — a name, a structure, a trend. Physics is 18% HARD and more than half its answers are numbers you have to compute. Spending the same 45 minutes on each gives Chemistry time it does not need and starves Physics.",
    "A starting budget to test in your timed mocks: Chemistry in about 35 minutes (0.7 a question), Physics in about 55 (1.1 a question). This is a recommendation, not a measurement — after two timed mocks, move it by your own numbers.",
    "Take Chemistry first if you are faster there: the marks bank quickly and the Physics minutes you save are real. Whichever order you choose, set a time to switch and keep to it — a 90-minute paper with no split drifts, and it always drifts towards the subject you find harder.",
  ],
};

export const CORNERSTONE_STRAND: StrategyStrand = {
  id: "cornerstone",
  label:
    "Cornerstone — Electrostatics · Rotational Dynamics · Superposition of Waves · Mechanical Properties of Fluids · Wave Optics · Oscillations (768 q · 37% of bank)",
  qCount: 768,
  pctOfBank: 37,
  pitch:
    "Six chapters carry 18.5 questions a paper — 37% of the Physics half, and each is around 20% HARD. They are the chapters you cannot be slow in. None of them is cheap end to end, but five of the six cherry-pick: each hides a page at 12% HARD or less (Gauss's law and capillary rise at 0%, rolling at 8%, the wave equation at 9%, SHM energy at 12%). Prep here is about entering each chapter at its cheap page, not about coverage.",
  approach: [
    "Enter each chapter at its cheapest page, not at page one. Electrostatics: Gauss's Law and Electric Flux and the dipole are 29 questions with no HARD one. Fluids: Excess Pressure and Capillary Rise is 38 questions at 0% HARD. Rotational Dynamics: Angular Momentum, Torque, and Conservation is 22 at 5%.",
    "All six have shipped teaching notes at /notes/mht-cet-physics, with every past-year question tagged to a page. Read a chapter's notes once, then drill page by page.",
    "Wave Optics is the one that does not cherry-pick: its three big pages are each 21% HARD. Own all three, or plan to lose three marks a paper.",
    "Superposition of Waves and Sound overlap almost completely — stationary waves, pipes, beats, Doppler. Prepare them together and you get Sound's question a paper nearly free.",
    "On the paper, the cheap halves go on the first sweep with the quick-wins; the axis theorems, surface tension, beats and spring systems wait for the second pass.",
  ],
  chapters: [
    {
      chapter: "Electrostatics",
      qCount: 166,
      pctHard: 22,
      posture: "split-pass",
      mustDrill: [
        "Gauss's Law and Electric Flux",
        "Electric Dipole — Field, Potential, Torque",
        "Capacitance and Combinations of Capacitors",
        "Electric Potential and Potential Energy",
        "Energy Stored in a Capacitor",
        "Coulomb's Law and Electric Field",
        "Dielectrics in Capacitors",
      ],
      targetHard: ["Dielectrics in Capacitors", "Coulomb's Law and Electric Field"],
      expectedYieldPerPaper: "3.83 q/paper · about 4 marks",
      studyHours: 10,
      summary:
        "166 q · 22% HARD · the heaviest chapter on the Physics paper, nearly four questions every time. It cherry-picks cleanly: Gauss's law (20 q) and the dipole (9 q) have never produced a HARD question, while Dielectrics in Capacitors runs 39% HARD. Bank the flux and dipole pages first.",
    },
    {
      chapter: "Rotational Dynamics",
      qCount: 128,
      pctHard: 21,
      posture: "split-pass",
      mustDrill: [
        "Angular Momentum, Torque, and Conservation",
        "Rotational Kinetic Energy and Rolling Motion",
        "Kinematics of Circular Motion",
        "Dynamics of Circular Motion — Banking, Conical Pendulum, Vertical Circle",
        "Moment of Inertia and Radius of Gyration",
        "Parallel and Perpendicular Axis Theorems",
      ],
      targetHard: ["Parallel and Perpendicular Axis Theorems"],
      expectedYieldPerPaper: "3.13 q/paper · about 3 marks",
      studyHours: 9,
      summary:
        "128 q · 21% HARD, and rising — 2.89 a paper in 2023-24, 3.38 in 2025. The axis theorems page is 25 questions at 48% HARD and holds nearly half the chapter's HARD; angular momentum (5%) and rolling (8%) are the cheap pages. Take those first.",
    },
    {
      chapter: "Superposition of Waves",
      qCount: 123,
      pctHard: 20,
      posture: "split-pass",
      mustDrill: [
        "Progressive Wave, Wave Equation, and Velocity",
        "Superposition, Phase/Path Difference, and Interference",
        "Stationary Waves and Vibrating Strings",
        "Pipes, Resonance Tube, and Doppler Effect",
        "Beats and Sonometer",
      ],
      targetHard: ["Beats and Sonometer"],
      expectedYieldPerPaper: "3.00 q/paper · 3 marks",
      studyHours: 8,
      summary:
        "123 q · 20% HARD. Reading a wave equation — amplitude, ω, k, speed ω/k — is 34 questions at 9% HARD and the cheapest entry. Beats and the sonometer are 41% HARD. Prepare it with Sound.",
    },
    {
      chapter: "Mechanical Properties of Fluids",
      qCount: 124,
      pctHard: 19,
      posture: "split-pass",
      mustDrill: [
        "Excess Pressure and Capillary Rise",
        "Bernoulli, Continuity, Streamline, and Torricelli",
        "Viscosity, Stokes' Law, Terminal Velocity, and Reynolds",
        "Surface Tension and Surface Energy",
      ],
      skipSubtopics: ["Pressure, Buoyancy, and Archimedes"],
      targetHard: ["Surface Tension and Surface Energy"],
      expectedYieldPerPaper: "2.96 q/paper · about 3 marks",
      studyHours: 8,
      summary:
        "124 q · 19% HARD, and two thirds of it is surface tension. Excess Pressure and Capillary Rise is 38 questions and has never produced a HARD one — the best page in the cornerstone strand. Pressure and buoyancy is 6 questions at 83% HARD and 0.13 a paper: last in the prep queue, still answered on the day.",
    },
    {
      chapter: "Wave Optics",
      qCount: 117,
      pctHard: 19,
      posture: "own-outright",
      mustDrill: [
        "Wavefronts, Huygens, and Coherence",
        "Polarisation — Malus and Brewster",
        "Young's Double Slit — Fringe Width, Positions and Shifts",
        "Interference Intensity and Coherent Sources",
        "Single Slit Diffraction and Resolving Power",
      ],
      expectedYieldPerPaper: "2.96 q/paper · about 3 marks",
      studyHours: 8,
      summary:
        "117 q · 19% HARD, spread evenly: Young's double slit, single slit and interference intensity are each 21% HARD. No cheap half to take, so own all three. Polarisation (10 q, 10%) is the quick page.",
    },
    {
      chapter: "Oscillations",
      qCount: 110,
      pctHard: 19,
      posture: "split-pass",
      mustDrill: [
        "SHM Energy — Kinetic, Potential, and Total",
        "SHM Kinematics — Displacement, Velocity, Phase, and Damping",
        "Simple Pendulum — Period, Lift, Weightlessness",
        "Spring-Mass and Other SHM Systems",
      ],
      targetHard: ["Spring-Mass and Other SHM Systems"],
      expectedYieldPerPaper: "2.63 q/paper · about 3 marks",
      studyHours: 7,
      summary:
        "110 q · 19% HARD. SHM kinematics is the biggest page (44 q, 16%) and energy the cheapest (17 q, 12%); spring systems — springs in series and parallel, cut springs — carry the HARD at 28%.",
    },
  ],
};

export const QUICKWIN_STRAND: StrategyStrand = {
  id: "quickwin",
  label:
    "Quick-Win — Semiconductor Devices · AC Circuits · Electromagnetic Induction · Kinetic Theory of Gases · Motion in a Plane · Laws of Motion (557 q · 27% of bank)",
  qCount: 557,
  pctOfBank: 27,
  pitch:
    "Bank these first. Six chapters worth 13.3 questions a paper, every one of them at 14% HARD or less — against 18% for the Physics bank as a whole. Every question on this paper pays the same single mark, so the point is not that these are worth more; it is that they cost a fraction of the time. Semiconductor Devices is three questions a paper at 3% HARD, and most of it is reading a gate or a circuit, not computing.",
  approach: [
    "Answer every question from these six on the opening sweep of the Physics half. Roughly 13 marks, most of them well inside a minute.",
    "Semiconductor Devices and Electromagnetic Induction together are six questions a paper at 3% and 9% HARD. If you are short of prep time before the exam, these two are the highest-certainty hours you can buy.",
    "Semiconductor questions are often a figure — a gate circuit, a diode arrangement. The HARD rate is low, but the figure has to be read, not assumed: trace every gate input to its output before you look at the options.",
    "Kinetic Theory of Gases is mostly one proportionality — v_rms ∝ √(T/M) — and Motion in a Plane is 6% HARD and rising (1.00 a paper in 2023-24, 1.54 in 2025).",
    "One chapter outside this strand belongs in the same habit: Magnetic Materials is 33 questions with a single HARD one, below the playbook line at 0.79 a paper. Answer it on the opening sweep whenever it appears.",
  ],
  chapters: [
    {
      chapter: "Semiconductor Devices",
      qCount: 129,
      pctHard: 3,
      posture: "bank-first",
      mustDrill: [
        "Band Theory, Doping, and Semiconductor Types",
        "p-n Junction — Depletion Layer and Biasing",
        "Special Diodes — Zener, LED, Photodiode",
        "Diode Circuits and Rectifiers",
        "Transistors — BJT, CE Amplifier, and Gain",
        "Logic Gates and Boolean Algebra",
      ],
      expectedYieldPerPaper: "3.08 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "129 q · 3% HARD — the best return on the Physics paper. Four of its six pages have never produced a HARD question. Logic gates (36 q) are the biggest page and nearly all figure-reading; transistors (29 q, 0% HARD) are α, β and gain.",
    },
    {
      chapter: "AC Circuits",
      qCount: 129,
      pctHard: 12,
      posture: "bank-first",
      mustDrill: [
        "Reactance — Inductive, Capacitive, and Single-Element Circuits",
        "Power in AC Circuit — Average, Factor, Wattless",
        "RMS, Peak, and AC Source Characteristics",
        "Series LCR — Impedance, Phase and Phasors",
        "Resonance in Series LCR Circuits",
        "LC Oscillations, Transformer, and AC Generator",
      ],
      expectedYieldPerPaper: "3.00 q/paper · 3 marks",
      studyHours: 6,
      summary:
        "129 q · 12% HARD. Reactance (23 q, 0% HARD) and power (25 q, 4%) are the cheap half; impedance and resonance (65 q together) are about 15% HARD. One impedance triangle does most of the chapter.",
    },
    {
      chapter: "Electromagnetic Induction",
      qCount: 119,
      pctHard: 9,
      posture: "bank-first",
      mustDrill: [
        "Faraday's and Lenz's Laws — Induced EMF, Current, and Charge",
        "Self-Inductance, Energy Stored, and LR Circuit",
        "Mutual Inductance, Coupling, and Transformer/Generator",
        "Motional EMF and Rotating Conductors",
      ],
      expectedYieldPerPaper: "2.92 q/paper · about 3 marks",
      studyHours: 6,
      summary:
        "119 q · 9% HARD. Faraday and Lenz (22 q) have never produced a HARD question; motional EMF and rotating rods (19 q, 21%) are the only expensive page.",
    },
    {
      chapter: "Kinetic Theory of Gases",
      qCount: 80,
      pctHard: 14,
      posture: "bank-first",
      mustDrill: [
        "Gas Laws and Ideal Gas Equation",
        "Average KE, Equipartition, and Specific Heats",
        "Kinetic Theory — Pressure, RMS Speed, and Temperature",
      ],
      expectedYieldPerPaper: "1.96 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "80 q · 14% HARD. Gas laws are 19 questions at 0%; the RMS-speed page (36 q, 22%) is ratio work — v_rms ∝ √(T/M) — and falls to a proportion, not a calculation.",
    },
    {
      chapter: "Motion in a Plane",
      qCount: 53,
      pctHard: 6,
      posture: "bank-first",
      mustDrill: [
        "Kinematics — Equations of Motion, Free Fall, and Graphs",
        "Relative Motion and Meeting Problems",
        "Uniform Circular Motion — Centripetal Acceleration, Banking",
        "Projectile Motion — Range, Height, and Time of Flight",
        "Vector Operations and Components",
      ],
      expectedYieldPerPaper: "1.33 q/paper · about 1 mark",
      studyHours: 3,
      summary:
        "53 q · 6% HARD and rising — 1.54 a paper in 2025. Kinematics, relative motion and circular motion (37 q together) have never produced a HARD question.",
    },
    {
      chapter: "Laws of Motion",
      qCount: 47,
      pctHard: 11,
      posture: "bank-first",
      mustDrill: [
        "Impulse, Momentum, and Collisions",
        "Newton's Laws — Force, Tension, Lift, and Connected Blocks",
        "Equilibrium, Centre of Mass, and Friction",
      ],
      expectedYieldPerPaper: "1.04 q/paper · 1 mark",
      studyHours: 3,
      summary:
        "47 q · 11% HARD. Momentum and collisions (17 q, 6%) are the cheap page; connected blocks and lifts are one free-body diagram per body.",
    },
  ],
};

export const LONGTAIL_STRAND: StrategyStrand = {
  id: "longtail",
  label:
    "Long Tail — Magnetic Fields Due to Electric Current · Thermal Properties of Matter · Dual Nature of Radiation and Matter · Current Electricity · Structure of Atoms and Nuclei · Thermodynamics · Gravitation · Optics (Ray) · Sound (720 q · 34% of bank)",
  qCount: 720,
  pctOfBank: 34,
  pitch:
    "Nine chapters at one to two and a half questions a paper, together 16.7 questions — a third of the Physics half. They are also where the paper is hardest: Dual Nature is 32% HARD, Magnetic Fields and Ray Optics 29%, Current Electricity 24%. They come on the second pass, after the cornerstones' cheap pages and every quick-win are banked. And every one of them still gets an answer: there is no negative marking, so a guess is free and a blank is not.",
  approach: [
    "Most of these still cherry-pick. Variation of g is 33 questions at 3% HARD inside Gravitation; radioactive decay is 18 at 6% inside Atoms and Nuclei; the first law is 37 at 11% inside Thermodynamics. Take those pages in prep even if you take nothing else from the chapter.",
    "Gravitation and Ray Optics both HALVED in 2025 (2.26 to 1.15 and 2.19 to 1.08 a paper). Both are still set every year, so do not drop them — but they no longer earn two questions of prep time. See Trends.",
    "Dual Nature is the hardest chapter in the bank and also the narrowest: two equations — Einstein's photoelectric equation and de Broglie's λ = h/p — carry all 82 questions. Owning those two is cheaper than the 32% suggests.",
    "Every chapter here has shipped teaching notes at /notes/mht-cet-physics, with every PYQ tagged to a page.",
  ],
  chapters: [
    {
      chapter: "Magnetic Fields Due to Electric Current",
      qCount: 98,
      pctHard: 29,
      posture: "split-pass",
      mustDrill: [
        "Force on Moving Charge in Magnetic Field",
        "Magnetic Moment of Current Loop and Galvanometer Instruments",
        "Magnetic Field of Current-Carrying Conductor",
        "Force on Current-Carrying Conductor and Parallel Wires",
      ],
      targetHard: ["Magnetic Field of Current-Carrying Conductor"],
      expectedYieldPerPaper: "2.42 q/paper · about 2 marks",
      studyHours: 6,
      summary:
        "98 q · 29% HARD. Force on a moving charge (12 q) has never produced a HARD question; the field of a conductor is half the chapter at 33%, and much of it is a figure of wires and arcs whose fields must be added with their directions.",
    },
    {
      chapter: "Thermal Properties of Matter",
      qCount: 84,
      pctHard: 17,
      posture: "split-pass",
      mustDrill: [
        "Heat Conduction and Thermal Resistance",
        "Calorimetry, Latent Heat, and Heat Capacity",
        "Thermal Expansion — Linear, Surface, Volumetric",
        "Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body",
      ],
      targetHard: ["Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body"],
      expectedYieldPerPaper: "2.13 q/paper · about 2 marks",
      studyHours: 5,
      summary:
        "84 q · 17% HARD, and 53 of them are radiation. Stefan's law (P ∝ AT⁴) and Wien's law are ratio questions; conduction and calorimetry are small and HARD-free.",
    },
    {
      chapter: "Dual Nature of Radiation and Matter",
      qCount: 82,
      pctHard: 32,
      posture: "own-outright",
      mustDrill: [
        "de Broglie Wavelength and Matter Waves",
        "Photoelectric Effect — Stopping Potential, Threshold, and Work Function",
      ],
      targetHard: ["Photoelectric Effect — Stopping Potential, Threshold, and Work Function"],
      expectedYieldPerPaper: "2.04 q/paper · about 2 marks",
      studyHours: 5,
      summary:
        "82 q · 32% HARD — the hardest chapter in the bank, and one of the narrowest. The photoelectric page is 56 questions at 36%; de Broglie is 26 at 23%. Two equations and their graphs.",
    },
    {
      chapter: "Current Electricity",
      qCount: 82,
      pctHard: 24,
      posture: "split-pass",
      mustDrill: [
        "Ohm's Law, Cells, EMF, and Internal Resistance",
        "Galvanometer, Ammeter, and Voltmeter Conversion",
        "Kirchhoff's Laws and Circuit Analysis",
        "Potentiometer",
        "Wheatstone Bridge and Meter Bridge",
      ],
      targetHard: ["Wheatstone Bridge and Meter Bridge"],
      expectedYieldPerPaper: "1.96 q/paper · about 2 marks",
      studyHours: 5,
      summary:
        "82 q · 24% HARD. Meter conversions (24 q, 17%) and Kirchhoff (19 q, 16%) are the cheap entry; the bridges carry the HARD at 35%. A bridge that looks balanced often is not — check the ratio before you delete the galvanometer arm.",
    },
    {
      chapter: "Structure of Atoms and Nuclei",
      qCount: 85,
      pctHard: 22,
      posture: "split-pass",
      mustDrill: [
        "Radioactive Decay and Half-Life",
        "Hydrogen Spectrum and Spectral Series",
        "Bohr Model and Atomic Properties",
      ],
      targetHard: ["Bohr Model and Atomic Properties"],
      expectedYieldPerPaper: "1.96 q/paper · about 2 marks",
      studyHours: 5,
      summary:
        "85 q · 22% HARD. Radioactive decay is 18 questions at 6%; the Bohr page (39 q, 28%) is scaling laws — r ∝ n²/Z, v ∝ Z/n, E ∝ Z²/n² — and falls to ratios.",
    },
    {
      chapter: "Thermodynamics",
      qCount: 84,
      pctHard: 21,
      posture: "split-pass",
      mustDrill: [
        "First Law, Internal Energy, and Work-Heat Relations",
        "Carnot Engine, Efficiency, and Refrigerator",
        "Isothermal, Adiabatic, Isobaric, and Isochoric Processes",
      ],
      targetHard: ["Isothermal, Adiabatic, Isobaric, and Isochoric Processes"],
      expectedYieldPerPaper: "1.92 q/paper · about 2 marks",
      studyHours: 5,
      summary:
        "84 q · 21% HARD. The first law is 37 questions at 11%; the processes page (36 q, 31%) holds the HARD — adiabatic relations and work read off a p–V diagram.",
    },
    {
      chapter: "Gravitation",
      qCount: 80,
      pctHard: 23,
      posture: "split-pass",
      mustDrill: [
        "Variation of g with Depth, Altitude, Density, and Latitude",
        "Satellites, Orbital Motion, and Kepler's Laws",
        "Gravitational PE, Escape Velocity, and Energy",
        "Newton's Law of Gravitation and Gravitational Force",
      ],
      targetHard: ["Gravitational PE, Escape Velocity, and Energy"],
      expectedYieldPerPaper: "1.75 q/paper · about 2 marks",
      studyHours: 4,
      summary:
        "80 q · 23% HARD, and HALVED in 2025 (2.26 a paper to 1.15). Variation of g is 33 questions at 3% HARD — take that page whatever else you cut. Energy and escape velocity are 42% HARD.",
    },
    {
      chapter: "Optics (Ray)",
      qCount: 78,
      pctHard: 29,
      posture: "last-pass-guess",
      mustDrill: [
        "Lenses — Lens Formula, Power, and Lensmaker",
        "Refraction, Apparent Depth, and Total Internal Reflection",
        "Mirrors and Image Formation",
        "Optical Instruments — Microscope and Telescope",
        "Prism — Deviation, Dispersion, and Refractive Index",
      ],
      targetHard: ["Prism — Deviation, Dispersion, and Refractive Index"],
      expectedYieldPerPaper: "1.50 q/paper · about 1-2 marks",
      studyHours: 4,
      summary:
        "78 q · 29% HARD, and HALVED in 2025 (2.19 a paper to 1.08). Lenses and refraction are 50 questions at about a quarter HARD; the prism page is 47%. Sign convention is where the marks go.",
    },
    {
      chapter: "Sound",
      qCount: 47,
      pctHard: 21,
      posture: "last-pass-guess",
      mustDrill: [
        "Doppler Effect — Moving Source and Observer",
        "Pipes, Resonance, Overtones, and Beats",
        "Sound Wave Properties, Speed, and Intensity",
      ],
      expectedYieldPerPaper: "1.04 q/paper · 1 mark",
      studyHours: 3,
      summary:
        "47 q · 21% HARD. Doppler (19 q, 16%) and pipes (22 q, 27%) — the same pipes and beats as Superposition of Waves. Prepared with that chapter, Sound costs little extra.",
    },
  ],
};

export const STRATEGY_STRANDS = [CORNERSTONE_STRAND, QUICKWIN_STRAND, LONGTAIL_STRAND];

export type TailStatus = "live" | "entering" | "dropped";

export type TailChapter = {
  chapter: string;
  qCount: number;
  /** Recent weightage (2024-2025, 24 papers). All below the 0.9 line. */
  qPerPaper: number;
  pctHard: number;
  status: TailStatus;
  note: string;
};

/** The three chapters below the 0.9 q/paper line — no playbook, listed so the
 *  24-chapter bank is accounted for. */
export const TAIL_CHAPTERS: TailChapter[] = [
  {
    chapter: "Magnetic Materials",
    qCount: 33,
    qPerPaper: 0.79,
    pctHard: 3,
    status: "live",
    note: "One HARD question in 33 — a cheap mark on most papers. Below the playbook line on volume only; drill it with the quick-wins. Its notes are at /notes/mht-cet-physics/magnetic-materials.",
  },
  {
    chapter: "Units and Measurement",
    qCount: 14,
    qPerPaper: 0.58,
    pctHard: 0,
    status: "entering",
    note: "ENTERED in 2025: none in the 29 papers before 2025, then 14 in the 13 papers of 2025 — 1.08 a paper. The recent rate of 0.58 averages in 2024, when it was not set. It has never produced a HARD question, and ten of the 14 are error propagation. Half a day of prep for about a mark a paper.",
  },
  {
    chapter: "Mechanical Properties of Solids",
    qCount: 6,
    qPerPaper: 0.08,
    pctHard: 17,
    status: "live",
    note: "Six questions in 42 papers and none in 2025 — too few to call a trend either way. Read the spring and elastic-energy formulas once; do not drill it.",
  },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
