/**
 * Static content + numbers for the /guide/nda-physics route.
 *
 * Pulled from the live NDA Physics PUBLIC bank. Editorial numbers snapshot
 * is `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Structurally different from BOTH nda-maths AND nda-english (Template C —
 * chapter-playbooks + skill-strand strategy + formula compendium):
 *
 *   - No "principles" axis — best cross-chapter physics lever maxes at 12 q
 *     across 6 chapters (ratio-proportional reasoning, a question-style not
 *     a technique). NDA Maths' weakest TOP_PRINCIPLES principle has 29 q × 2 ch for
 *     comparison. Fails Template A's "≥40 q × ≥4 ch" gate.
 *
 *   - %HARD is mid-spread (5 of 14 chapters > 15% HARD: E&M 21.5, Heat 20.5,
 *     FMPoM 30.4, Kinematics 25, Oscillations 15.4). Not flat like English
 *     (Template B), but not strong-tier like Maths (Template A). Strategy is
 *     SKILL-STRAND (Recall/Apply/Reason) with a %HARD overlay marking
 *     "drill all" vs "cherry-pick" vs "skip HARD subtopics" chapters.
 *
 *   - Per-chapter playbooks (14 of them, 1:1 with chapters) — physics
 *     chapters ARE the natural unit; subtopics are too fine (50 of them with
 *     several at 1–3 q) for English-style per-subtopic playbooks.
 *
 *   - New /formulas page — physics is the first subject where a flat ~30-row
 *     formula index serves as a stand-alone revision artefact. English has
 *     no analog; maths embeds formulas in principle deep-dive pages.
 *
 *   - Sharper trends story than English — NDA Physics paper hardened
 *     dramatically: HARD ratio 2% in 2021 → 44% in 2026 NDA-1. Paper is
 *     ~22× more difficulty-dense per q. Honest framing matters here.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-physics (or "" for landing)
  label: string;
  blurb: string;
};

/** The 7 main routes under /guide/nda-physics, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Physics actually works — what the 449-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Recall, Apply, Reason — the three skill strands and which chapters live where, with %HARD-aware drill orders.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "14 playbooks — one per chapter. The dominant subtopic shape, the traps, and the formulas you need.",
  },
  {
    slug: "formulas",
    label: "Formulas",
    blurb:
      "Single-page index of the ~30 formulas NDA Physics actually tests. Symbols, units, and which chapters touch each.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Physics shifted 2017→2026 — Laws of Motion grew 3×, E&M tripled in 2022, the 2026 paper is 22× more HARD-dense than 2021.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA Physics reuses — series-vs-parallel swap, sign-convention flip, dimensional mismatch, ratio inversion.",
  },
  {
    slug: "ncert-map",
    label: "NCERT Map",
    blurb:
      "Which NCERT Class 9–12 chapters each NDA bucket absorbs — plus a watch-list of Class-12 topics to flag a syllabus drift early.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. PART B Physics is asked on NDA-1 + NDA-2 each year
   *  except 2020 (COVID-cancelled NDA-2) and 2026 NDA-2 (not yet held). */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — replaces the maths guide's "principles" headline. */
  playbooks: number;
  /** Number of formulas indexed on /formulas. */
  formulas: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 449,
  // 2017–2025: 2 papers each except 2020 (1, NDA-2 cancelled) = 17 papers
  // 2026: 1 paper (NDA-1 only). Total: 18.
  papers: 18,
  yearsCovered: 10,
  chapters: 14,
  playbooks: 14,
  formulas: 32,
  // SQL-derived 2026-05-18 — sum of EASY+MOD+HARD across all 14 chapters.
  difficulty: { easy: 226, moderate: 160, hard: 63 },
  asOf: "2026-05-18",
};

export type ChapterRow = {
  chapter: string;
  qCount: number;
  /** % of bank total (1 decimal). */
  pctTotal: number;
  /** % HARD within chapter (rounded integer). */
  pctHard: number;
  /** Top subtopics with counts, plus optional context. */
  focus: string;
};

/** 14 NDA Physics chapters, sorted by question count descending. SQL-derived
 *  against the 449-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Light and Optics",
    qCount: 97,
    pctTotal: 21.6,
    pctHard: 10,
    focus:
      "Light Phenomena+Spectrum (29 · recall), Reflection+Mirrors (18 · 17% HARD), Refraction+TIR (17), Optical Instruments (13), Lenses+Lens formula (12 · 25% HARD), Prisms (8).",
  },
  {
    chapter: "Electricity and Magnetism",
    qCount: 93,
    pctTotal: 20.7,
    pctHard: 22,
    focus:
      "Magnetism+Effects (16 · 13%), Combination of Resistors (16 · 38% HARD — the bank's biggest HARD pool), Electrical Devices (15 · recall), Electrostatics (13), Power+Energy+Heating (10 · 30%), Current+Ohm's Law (9), Resistance+Resistivity (6), Magnetic Force+Fleming (5 · 40%), Cells+EMF+Kirchhoff (3).",
  },
  {
    chapter: "Laws of Motion and Forces",
    qCount: 41,
    pctTotal: 9.1,
    pctHard: 10,
    focus:
      "Newton's Laws (19), Conservation of Momentum+Collisions (8), Types of Forces (6), Impulse+Momentum (5), Friction (3).",
  },
  {
    chapter: "Heat and Thermodynamics",
    qCount: 39,
    pctTotal: 8.7,
    pctHard: 21,
    focus:
      "Heat+Calorimetry+Specific Heat (13 · 31% HARD), Temperature+Thermometry (11), Phase Change+Boiling (9), Thermodynamic Processes (6 · 33% HARD).",
  },
  {
    chapter: "Sound",
    qCount: 34,
    pctTotal: 7.6,
    pctHard: 3,
    focus:
      "Foundations—sound/perception/ear (11), Wave Equation+Speed+Bands (13), Sound Behaviours—echo/reverb/beats (5), Applications—SONAR/transducers/instruments (5). The bank's lowest-HARD chapter.",
  },
  {
    chapter: "Modern Physics",
    qCount: 25,
    pctTotal: 5.6,
    pctHard: 0,
    focus:
      "Atomic Structure (7), Nuclear Physics (5), Photoelectric Effect (4), Quantum+Modern EM (4), Scientists+Discoveries (3), Scientific Acronyms (2). Zero HARD across the whole chapter.",
  },
  {
    chapter: "Kinematics and Motion",
    qCount: 24,
    pctTotal: 5.3,
    pctHard: 25,
    focus:
      "Equations of Motion+Graphs (15 · 20% HARD), Circular Motion (3 · 33%), Projectile+Vertical (3), Vectors+Position (3 · 67%). Small chapter, heavy HARD load.",
  },
  {
    chapter: "Work, Energy and Power",
    qCount: 23,
    pctTotal: 5.1,
    pctHard: 9,
    focus:
      "Energy+Conservation (10), Work-Energy Theorem+Power (6), Work+Work Done (5), Simple Machines (2).",
  },
  {
    chapter: "Fluid Mechanics and Properties of Matter",
    qCount: 23,
    pctTotal: 5.1,
    pctHard: 30,
    focus:
      "Buoyancy+Density+Flotation (16 · 31% HARD), Pressure+Surface Tension (7 · 29% HARD). Smallest chapter by subtopic count, highest %HARD by chapter.",
  },
  {
    chapter: "Gravitation",
    qCount: 17,
    pctTotal: 3.8,
    pctHard: 12,
    focus:
      "Gravitational Field+Potential (7), Newton's Law of Gravitation (6), Orbits+Kepler+Escape (4 · 25%).",
  },
  {
    chapter: "Units, Measurement and Dimensions",
    qCount: 14,
    pctTotal: 3.1,
    pctHard: 7,
    focus:
      "Units and Dimensions (14 — single subtopic). Mostly EASY definitional recall + a few dimensional-analysis traps.",
  },
  {
    chapter: "Oscillations and Waves",
    qCount: 13,
    pctTotal: 2.9,
    pctHard: 15,
    focus:
      "Simple Pendulum (7), SHM+General Waves (6 · 33% HARD). Bridges Sound and Light — same v=fλ machinery in a different setting.",
  },
  {
    chapter: "Astronomy and Space",
    qCount: 4,
    pctTotal: 0.9,
    pctHard: 0,
    focus:
      "Astronomy and Space (4 — single subtopic). Pure recall: light year, parsec, black hole, largest planet. Easiest marks in the bank.",
  },
  {
    chapter: "Energy Sources",
    qCount: 2,
    pctTotal: 0.4,
    pctHard: 0,
    focus:
      "Energy Sources (2 — single subtopic). Conventional vs non-conventional, bio-mass. Rare topic; don't over-invest.",
  },
];
