/**
 * Content for /guide/jee-mains-physics/strategy.
 *
 * THE MARKING DECIDES THE AXIS. JEE Main pays +4 for a right answer and takes 1 for a wrong one, on
 * the multiple-choice and the numeric-answer questions alike. So, unlike CDS (a blind guess worth 0)
 * and MHT-CET (no penalty at all), the two formats need OPPOSITE rules: a blind MCQ guess is worth
 * +0.25 on average, and a blind numeric guess is worth close to −1. See GUESS_RULE and NUMERIC_RULE.
 *
 * TIERS ARE DERIVED, NOT TYPED. A chapter's tier comes from its 2025-2026 rate per 25-question paper
 * (CHAPTER_TABLE, computed from the generated matrix) against TIER_RULES. The bank carries no
 * difficulty grading for JEE (every row is MODERATE), so weight is the only axis. After an ingest a
 * chapter can cross a line on its own; tests/jee-mains-physics-guide-data.test.ts pins the current
 * membership so that happens in review, where the prose below can be re-read, not silently.
 *
 * PROSE CARRIES NO FIGURES. `summary`, `pitch` and `approach` are editorial; the page prints every
 * number beside them from CHAPTER_TABLE.
 */

import { CHAPTER_TABLE, PAPER, type ChapterRow } from "./jee-mains-physics";

/**
 * 25 q x 4 marks = 100, and 1 mark lost per wrong answer. The Physics share of the shared three-hour
 * clock is a suggested 60 minutes. Target: 20 solved attempts at 85% is 17 right and 3 wrong,
 * 68 - 3 = 65 marks, before any end-of-paper MCQ guesses (each worth +0.25 on average).
 */
export const STRATEGY_HEADLINE = {
  paperQ: PAPER.questions,
  totalMarks: PAPER.totalMarks,
  marksPerCorrect: PAPER.marksPerCorrect,
  penaltyPerWrong: PAPER.penaltyPerWrong,
  targetMarks: 65,
  targetAttempts: 20,
  targetAccuracyPct: 85,
  durationMin: PAPER.suggestedMinutes,
  minutesPerQuestion: PAPER.minutesPerQuestion,
};

export { GUESS_RULE, NUMERIC_RULE } from "@/lib/guide/jeeMarking";

/** How to spend the shared clock. A starting budget, not a measurement of anyone's paper. */
export const TIME_PLAN: { step: string; detail: string }[] = [
  {
    step: "Give Physics about an hour",
    detail:
      "The three subjects share one clock. Physics questions are shorter than most Maths ones but longer than most Chemistry ones, so an hour is a fair start. Adjust from your own mock tests.",
  },
  {
    step: "First pass: the one-formula questions",
    detail:
      "Go through all the questions once. Answer the ones that are one formula and a substitution, and mark the rest. A question that has not opened up in a few minutes is marked, not fought.",
  },
  {
    step: "Second pass: the marked questions",
    detail:
      "Come back once every subject has had its first pass. Work the marked questions in the order you think you can finish them, and check the units of every answer.",
  },
  {
    step: "Last minutes: fill every MCQ",
    detail:
      "Any multiple-choice question still blank gets an answer, after ruling out what you can. Numeric answers you have not worked out stay blank.",
  },
];

export type TierId = "cornerstone" | "core" | "longtail";

/** A chapter's tier is set by its 2025-2026 rate per 25-question paper. */
export const TIER_RULES: { id: TierId; minRecentPerPaper: number; label: string }[] = [
  { id: "cornerstone", minRecentPerPaper: 1.5, label: "Cornerstone" },
  { id: "core", minRecentPerPaper: 1.0, label: "Core" },
  // Anything still on the paper. A chapter with no question in 2025-2026 is DROPPED, not long tail.
  { id: "longtail", minRecentPerPaper: Number.MIN_VALUE, label: "Long tail" },
];

export function tierOf(recentPerPaper: number): TierId | "dropped" {
  const rule = TIER_RULES.find((r) => recentPerPaper >= r.minRecentPerPaper);
  return rule ? rule.id : "dropped";
}

/** Editorial per chapter: a short display name and one or two sentences, no figures. */
export const CHAPTER_NOTES: Record<string, { name: string; summary: string }> = {
  "Electrostatics": {
    name: "Electrostatics",
    summary:
      "The largest chapter on the recent papers. Coulomb's law, field and potential, Gauss's law and capacitors; capacitors alone are a large share, so learn the slab and combination rules cold.",
  },
  "Ray Optics": {
    name: "Ray Optics",
    summary:
      "Grown into a cornerstone. Mirrors, refraction, lenses and prisms each come down to one equation used with a fixed sign convention, so the convention is half the chapter.",
  },
  "Units and Measurements": {
    name: "Units and Measurements",
    summary:
      "Dimensions and errors on nearly every paper, and it has grown. Quick questions once the dimensional formulas of the common quantities are known by heart.",
  },
  "System of Particles and Rotational Motion": {
    name: "Rotational Motion",
    summary:
      "Moment of inertia feeds torque, angular momentum and rolling. Many of its questions have numeric answers, so learn the standard results and the two axis theorems exactly.",
  },
  "Current Electricity": {
    name: "Current Electricity",
    summary:
      "Still about one question a paper, though smaller than in the early papers. Kirchhoff's laws, bridges, meters and cells; many answers are numbers, so no option will catch a slip.",
  },
  "Wave Optics": {
    name: "Wave Optics",
    summary:
      "Young's double slit carries most of it: fringe width, fringe position and intensity. It has grown since the early papers.",
  },
  "Moving Charges and Magnetism": {
    name: "Moving Charges and Magnetism",
    summary:
      "The field of a wire, a loop and a solenoid, the force on a moving charge, and the galvanometer conversions. Directions decide many answers.",
  },
  "Mechanical Properties of Fluids": {
    name: "Fluids",
    summary:
      "Pressure, Bernoulli, viscosity and surface tension. It has grown since the early papers, and most of its questions are calculations.",
  },
  "Thermodynamics": {
    name: "Thermodynamics",
    summary:
      "The first law, the four processes and the heat engine. Read work, heat and internal energy off a P–V graph with the sign convention fixed.",
  },
  "Semiconductor Electronics": {
    name: "Semiconductor Electronics",
    summary:
      "Diodes, the Zener regulator and logic gates. Mostly reading a circuit or a truth table; transistors have not been asked in the recent papers.",
  },
  "Dual Nature of Radiation and Matter": {
    name: "Dual Nature",
    summary:
      "The photoelectric equation and the de Broglie wavelength. Short questions, few with numeric answers, and the laws are often asked as statements.",
  },
  "Electromagnetic Waves": {
    name: "Electromagnetic Waves",
    summary:
      "The wave equation, energy and intensity, and the order of the spectrum. Mostly recall and one-line calculations.",
  },
  "Motion in a Plane": {
    name: "Motion in a Plane",
    summary:
      "Projectiles, relative velocity and circular motion. Lighter than in the early papers, but each question is a vector split into two perpendicular parts.",
  },
  "Work, Energy and Power": {
    name: "Work, Energy and Power",
    summary:
      "The work-energy theorem, power and collisions. Energy conservation usually beats a force analysis.",
  },
  "Electromagnetic Induction": {
    name: "Electromagnetic Induction",
    summary:
      "Faraday's law, motional emf and inductance. Nearly half its questions have numeric answers.",
  },
  "Kinetic Theory": {
    name: "Kinetic Theory",
    summary:
      "Gas laws, molecular speeds and degrees of freedom. Lighter than before; the degrees-of-freedom table answers a large part of it.",
  },
  "Oscillations": {
    name: "Oscillations",
    summary:
      "Simple harmonic motion, springs and pendulums. Lighter than in the early papers; time-period questions dominate.",
  },
  "Atoms": {
    name: "Atoms",
    summary:
      "Bohr's model and the hydrogen spectrum: radius, energy and the spectral series. Scaling with Z and n answers most questions.",
  },
  "Gravitation": {
    name: "Gravitation",
    summary:
      "Field, potential, escape speed and satellites. It has shrunk by almost half since the early papers.",
  },
  "Mechanical Properties of Solids": {
    name: "Solids",
    summary:
      "Young's modulus, stress and strain, and the elastic energy of a stretched wire. Almost every question is a calculation.",
  },
  "Thermal Properties of Matter": {
    name: "Thermal Properties",
    summary:
      "Expansion, calorimetry, conduction and cooling. A small chapter of direct calculations.",
  },
  "Motion in a Straight Line": {
    name: "Motion in a Straight Line",
    summary:
      "The equations of motion and graphs of motion. Lighter than in the early papers; read every graph's slope and area.",
  },
  "Waves": {
    name: "Waves",
    summary:
      "The wave equation, strings and pipes, beats and the Doppler effect. Half its questions have numeric answers.",
  },
  "Nuclei": {
    name: "Nuclei",
    summary:
      "Mass defect, binding energy and Q-values. Radioactivity has almost stopped appearing, so the binding-energy pages now carry the chapter.",
  },
  "Laws of Motion": {
    name: "Laws of Motion",
    summary:
      "Newton's laws, friction and pulleys. Lighter than in the early papers, but its free-body habit runs through all of mechanics.",
  },
  "Alternating Current": {
    name: "Alternating Current",
    summary:
      "Reactance, impedance, resonance and power in an LCR circuit. It has shrunk by about half since the early papers.",
  },
  "Magnetism and Matter": {
    name: "Magnetism and Matter",
    summary:
      "Bar magnets, the earth's field and magnetic materials. A small chapter, mostly recall of the material classes.",
  },
  "Communication Systems": {
    name: "Communication Systems",
    summary:
      "Set in the early papers and none since. Its notes stay up for the older papers.",
  },
};

export type TierChapter = ChapterRow & { name: string; summary: string };

function withNotes(row: ChapterRow): TierChapter {
  const n = CHAPTER_NOTES[row.chapter];
  if (!n) throw new Error(`jee-mains-physics strategy: no editorial note for "${row.chapter}"`);
  return { ...row, ...n };
}

export type StrategyTier = {
  id: TierId;
  label: string;
  pitch: string;
  approach: string[];
  chapters: TierChapter[];
};

const TIER_TEXT: Record<TierId, { pitch: string; approach: string[] }> = {
  cornerstone: {
    pitch:
      "Each of these sets more than one and a half questions a paper, and together they are about a third of the paper. Electrostatics is the largest chapter, and Ray Optics has roughly doubled since the early papers.",
    approach: [
      "Learn these first. Every one has full notes at /notes/jee-mains-physics; read a chapter's notes once, then drill page by page.",
      "Units and Measurements is the quickest win of the four: dimensions and errors take minutes once the dimensional formulas are known.",
      "Rotational Motion and Ray Optics set many numeric answers. A numeric question you cannot finish is left blank, so own these chapters, do not half-learn them.",
    ],
  },
  core: {
    pitch:
      "About one question a paper each. None can be skipped; the order among them matters less than finishing all of them.",
    approach: [
      "Current Electricity has shrunk from cornerstone weight but still sets about a question a paper, and many of its answers are numbers. Drill it for accuracy.",
      "Wave Optics and Fluids have grown since the early papers. Learn them straight after the cornerstone chapters.",
      "Semiconductor Electronics and Thermodynamics are mostly reading a circuit, a table or a graph: good first-pass questions.",
    ],
  },
  longtail: {
    pitch:
      "Each sets under one question a paper, but together they are still about two in every five questions. Their questions are often one formula long, which makes them cheap marks in a first pass.",
    approach: [
      "Do not skip this tier. Most of these chapters are quick to learn, and a paper sets many of them.",
      "Gravitation, Alternating Current, Motion in a Plane and Oscillations have shrunk since the early papers. Learn them, but after the rising chapters.",
      "Dual Nature, Electromagnetic Waves and Magnetism and Matter are mostly recall and one-line calculations: learn the tables once and collect the marks.",
    ],
  },
};

export const STRATEGY_TIERS: StrategyTier[] = TIER_RULES.map((rule) => ({
  id: rule.id,
  label: rule.label,
  ...TIER_TEXT[rule.id],
  chapters: CHAPTER_TABLE.filter((r) => tierOf(r.recentPerPaper) === rule.id).map(withNotes),
}));

/** Chapters with no question in 2025-2026. Listed so the bank is accounted for, not drilled. */
export const DROPPED_CHAPTERS: TierChapter[] = CHAPTER_TABLE.filter(
  (r) => tierOf(r.recentPerPaper) === "dropped",
).map(withNotes);

export function tierOfChapter(chapter: string): TierId | "dropped" {
  const row = CHAPTER_TABLE.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`jee-mains-physics strategy: no chapter "${chapter}"`);
  return tierOf(row.recentPerPaper);
}
