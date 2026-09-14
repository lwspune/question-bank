/**
 * Static content + numbers for the /guide/nda-chemistry route.
 *
 * Pulled from the live NDA Chemistry PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template B (English-style, playbooks-only) with one Chemistry-specific
 * divergence — see /common-compounds — chosen because:
 *
 *   - %HARD is the FLATTEST of any NDA subject. 6.1% overall, ZERO chapters
 *     above 11.1% HARD (max: Mole 11.1, Industrial 10.7, Reactions 10.0).
 *     4 chapters at 0% HARD. Disqualifies Template A's secondary gate AND
 *     Template C's `DrillPosture` overlay (which needs concentrated HARD
 *     pools to be meaningful — there are none).
 *
 *   - No cross-chapter principles axis. Strongest candidate is Acid-Base/pH
 *     at 26 q × 9 chapters (inflated by common-word false positives — many
 *     of those 26 hits aren't actually acid-base questions). Even granting
 *     the full count, 26 < 40 fails Template A's primary gate. Redox at
 *     13 q × 5 ch is the next-best, also too thin.
 *
 *   - Subject is dramatically Recall-heavy: a crude sub-name bucketing
 *     against the 277 q gave 165 recall / 97 rule = 63% recall, 37% rule.
 *     "Reason" as a third bucket would have nothing to bucket — there's no
 *     chain-reasoning lever in NDA Chemistry. INSTEAD, the third strand is
 *     "Calculate" (Mole/Stoichiometry/equiv-weight, ~12 q) which is a small
 *     but genuinely distinct skill.
 *
 *   - Year drift is flat (no hardening trend like Physics — see /trends).
 *     The 10-year window oscillates 0–14.3% HARD with avg ~6%. Drill ALL
 *     10 years equally; don't over-weight 2024+ the way you would for
 *     Physics.
 *
 *   - Chemistry-specific subject artefact = /common-compounds (analogue of
 *     /vocab-families and /formulas): ~50 commonly-tested name↔formula↔use
 *     pairs grouped into 10 themed clusters. Chemistry's heaviest recall
 *     load is chemical-name memorisation; this is the highest-leverage
 *     flat-list artefact for a 75%-recall subject.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-chemistry (or "" for landing)
  label: string;
  blurb: string;
};

/** The 7 main routes under /guide/nda-chemistry, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Chemistry actually works — what the 277-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Recall, Rule, Calculate — three skill strands matched to the bank's actual shape. Per-chapter must-drill subtopics and a ~30-hour time plan.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "12 playbooks — one per chapter. The dominant subtopic shape, the traps, and the worked PYQs you need.",
  },
  {
    slug: "common-compounds",
    label: "Common compounds",
    blurb:
      "Single-page index of the ~50 chemical name ↔ formula ↔ use pairs NDA Chemistry actually tests. 10 themed clusters, ready for active recall.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Chemistry shifted 2017→2026 — Carbon faded, Industrial doubled, no hardening trend. Drill all 10 years equally.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA Chemistry reuses — chemical-name swap, formula-of-acid-salt confusion, redox direction flip, periodic-trend reversal, hardness type swap.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. NDA Chemistry is asked on NDA-1 + NDA-2 each year
   *  except 2020 (COVID-cancelled NDA-2). 2026 completed 2026-09-14. */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — 1 per chapter. */
  playbooks: number;
  /** Common-compound entries indexed on /common-compounds. */
  compounds: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 277,
  // 2017–2026: 2 papers each except 2020 (1, NDA-2 COVID-cancelled) = 19.
  // NDA-2 2026 was written 2026-09-14, so 2026 is a complete year.
  papers: 19,
  yearsCovered: 10,
  chapters: 12,
  playbooks: 12,
  compounds: 50,
  // SQL-derived 2026-05-18 — full-bank tally.
  difficulty: { easy: 149, moderate: 111, hard: 17 },
  asOf: "2026-09-14",
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

/** 12 NDA Chemistry chapters, sorted by question count descending. SQL-derived
 *  against the 277-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Carbon and Its Compounds",
    qCount: 46,
    pctTotal: 16.6,
    pctHard: 4,
    focus:
      "Allotropes of Carbon (15 · pure recall, diamond/graphite/fullerene), Common Carbon Compounds and Pigments (10), Functional Groups and Common Organic Compounds (9), Soaps Detergents Hydrogenation (4), Catenation/Tetra-valency/Isomerism (4), Hydrocarbons (3).",
  },
  {
    chapter: "Atomic Structure and Periodic Classification",
    qCount: 35,
    pctTotal: 12.6,
    pctHard: 9,
    focus:
      "Periodic Trends, Valency and Atomicity (12 · 8% HARD), Atomic Number/Mass Number/Subatomic Particles (7), Atomic Models — Dalton/Rutherford/Bohr (6 · 17% HARD), Isotopes/Isobars/Isoelectronic (6), Electron Configuration (4).",
  },
  {
    chapter: "Acids, Bases and Salts",
    qCount: 36,
    pctTotal: 13.0,
    pctHard: 8,
    focus:
      "pH Scale and Common Substances (8), Common Acids — Names/Formulas/Uses (8 · 12% HARD), Acid-Base Theory + Oxides + Electrolytes (7 · 14% HARD), Salts and Common Compounds (7), Water of Crystallization (5).",
  },
  {
    chapter: "Matter and Its States",
    qCount: 32,
    pctTotal: 11.6,
    pctHard: 3,
    focus:
      "Separation Techniques (7), Compounds/Mixtures/Solutions (7), States of Matter/Phase Changes/Diffusion (7), Colloids and Suspensions (7 · 20% HARD), Physical vs Chemical Changes (6).",
  },
  {
    chapter: "Chemical Reactions",
    qCount: 32,
    pctTotal: 11.6,
    pctHard: 9,
    focus:
      "Redox — Oxidation/Reduction/Reducing Agents (10 · 20% HARD — chapter's hottest subtopic), Types of Reactions — Combination/Decomposition/Displacement (7 · 14% HARD), Specific Reactions (5), Thermal/Photochemical Decomposition (3), Endo/Exothermic (3), Physical vs Chemical (2).",
  },
  {
    chapter: "Industrial and Applied Chemistry",
    qCount: 28,
    pctTotal: 10.1,
    pctHard: 11,
    focus:
      "Industrial Gases, Manufacturing and Reactions (8), Cement, Glass and Building Materials (6), Fertilizers (5), Common Industrial Substances and Alloys (5), Paints and Coatings (4 · 75% HARD — the bank's most concentrated HARD pool).",
  },
  {
    chapter: "Metals and Non-Metals",
    qCount: 18,
    pctTotal: 6.5,
    pctHard: 0,
    focus:
      "Reactivity Series and Reactions with Water (7), Corrosion and Its Prevention (5), Alloys and Their Composition (4), Extraction of Metals and Ores (2). Zero HARD across the whole chapter.",
  },
  {
    chapter: "Hydrogen and Water",
    qCount: 13,
    pctTotal: 4.7,
    pctHard: 8,
    focus:
      "Hardness and Purity of Water (5), Properties of Hydrogen (4 · 33% HARD), Properties and Anomalous Behaviour of Water (4).",
  },
  {
    chapter: "Chemical Bonding",
    qCount: 14,
    pctTotal: 5.1,
    pctHard: 0,
    focus:
      "Ionic and Covalent Bonding (7), Valency/Oxidation States/Molecular Formula (4), Bond Counting and Molecular Structure (3). Zero HARD — pure recall + rule application.",
  },
  {
    chapter: "Chemistry in Everyday Life",
    qCount: 10,
    pctTotal: 3.6,
    pctHard: 0,
    focus:
      "Common Chemicals and Their Uses (7), Medicines and Health Chemistry (3). Pure recall — drinks, gases, cleaners, antacids.",
  },
  {
    chapter: "Mole Concept and Stoichiometry",
    qCount: 10,
    pctTotal: 3.6,
    pctHard: 10,
    focus:
      "Mole Concept/Avogadro's Law/Molar Calculations (5 · 20% HARD), Stoichiometry/Laws of Chemical Combination (4). The bank's only Calculate-strand chapter.",
  },
  {
    chapter: "Practical Chemistry",
    qCount: 3,
    pctTotal: 1.1,
    pctHard: 0,
    focus:
      "Practical Applications — Health, Food and Lab Methods (3). Tiny chapter, all EASY. Read once, recognise, done.",
  },
];
