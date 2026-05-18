/**
 * Static content + numbers for the /guide/nda-biology route.
 *
 * Pulled from the live NDA Biology PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template B (English-style, playbooks-only) with TWO Biology-specific
 * divergences — see /reference-tables and the Recall/Apply/Verify strand
 * split — chosen because:
 *
 *   - %HARD is the FLATTEST of any NDA subject (flatter than Chemistry).
 *     Max 7.7% on a 13-q chapter (1 HARD across the whole chapter).
 *     Only 4 HARDs across 190 q · 10 yrs = 2.1% overall. 4 of 9 chapters
 *     have ZERO HARD across the entire 10-year window. Disqualifies both
 *     Template A's secondary gate AND Template C's `DrillPosture` overlay
 *     (which needs concentrated HARD pools to be meaningful — there are
 *     none).
 *
 *   - No cross-chapter principles axis. Strongest candidate is Diseases/
 *     Pathogens at 19 q × 3 chapters (heavily skewed to MD); next is
 *     DNA/chromosomes/cell-division at ~15 q × 4 chapters. Both fail
 *     Template A's primary gate of 40 q × ≥4 chapters. Cross-chapter
 *     lever in Biology is genuinely thin.
 *
 *   - Subject is overwhelmingly recall-shaped: 82% of questions are
 *     simple single-fact recall (155/190), 13% are statements-correctness
 *     evaluation (24/190), 4% which-correct (8), and 1% other shapes.
 *     "Calculate" as a third bucket would have nothing to bucket — no
 *     numeric strand in NDA Biology. "Reason" has only the 4 HARD
 *     applied-recall questions — too thin to anchor a strand. INSTEAD,
 *     the third strand is "Verify" (multi-statement true/false
 *     evaluation, ~24 q) which is a small but genuinely distinct
 *     execution-mode skill.
 *
 *   - Year drift is flat (same headline as Chemistry — paper has NOT
 *     hardened). 10-year window oscillates 0–9.1% HARD with no trend.
 *     Drill ALL 10 years equally; don't over-weight 2024+ the way you
 *     would for NDA Physics.
 *
 *   - Biology-specific subject artefact = /reference-tables (analogue of
 *     /vocab-families, /formulas, /common-compounds). 4 themed clusters
 *     of named facts — diseases ↔ pathogens, vitamins ↔ deficiencies,
 *     hormones ↔ glands, scientists ↔ discoveries. Biology's heaviest
 *     recall load is named-fact-pair memorisation; this is the
 *     highest-leverage flat-list artefact for a 82%-recall subject.
 *     Structurally distinct from Chemistry's /common-compounds (single
 *     domain, name↔formula↔use) — Biology's named facts come from FOUR
 *     domains, so the page is organised as themed clusters.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-biology (or "" for landing)
  label: string;
  blurb: string;
};

/** The 7 main routes under /guide/nda-biology, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Biology actually works — what the 190-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Recall, Apply, Verify — three skill strands matched to the bank's actual shape. Per-chapter must-drill subtopics and a ~22-hour time plan.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "9 playbooks — one per chapter. The dominant subtopic shape, the traps, and the worked PYQs you need.",
  },
  {
    slug: "reference-tables",
    label: "Reference tables",
    blurb:
      "Single-page index of the ~50 named-fact pairs NDA Biology actually tests. 4 themed clusters — diseases ↔ pathogens, vitamins ↔ deficiencies, hormones ↔ glands, scientists ↔ discoveries.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Biology shifted 2017→2026 — Cell Biology grew, Microbiology faded, no hardening trend. Drill all 10 years equally.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA Biology reuses — disease↔pathogen swap, vitamin↔deficiency swap, hormone↔gland swap, RNA-virus vs DNA-virus, monocot↔dicot trait swap.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. NDA Biology is asked on NDA-1 + NDA-2 each year
   *  except 2020 (COVID-cancelled NDA-2) and 2026 NDA-2 (not yet held). */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — 1 per chapter. */
  playbooks: number;
  /** Reference-table entries indexed on /reference-tables. */
  referenceFacts: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below. */
export const OVERVIEW: Overview = {
  totalQ: 190,
  // 2017–2025: 2 papers each except 2020 (1, NDA-2 cancelled) = 17 papers.
  // 2026: 1 paper (NDA-1 only). Total: 18.
  papers: 18,
  yearsCovered: 10,
  chapters: 9,
  playbooks: 9,
  referenceFacts: 52,
  // SQL-derived 2026-05-18 — full-bank tally.
  difficulty: { easy: 130, moderate: 56, hard: 4 },
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

/** 9 NDA Biology chapters, sorted by question count descending. SQL-derived
 *  against the 190-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Human Physiology",
    qCount: 52,
    pctTotal: 27.4,
    pctHard: 2,
    focus:
      "Circulatory and Lymphatic System (13 · pure recall, RBC/WBC/blood groups), Digestive System and Enzymes (7 · 14% HARD), Nutrition, Vitamins and Minerals (7 · vitamin↔deficiency table), Nervous System and Sense Organs (6), Endocrine System and Hormones (5), Respiratory System (5), Connective and Epithelial Tissues (4), Excretory and Reproductive Anatomy (3), Immune System (2).",
  },
  {
    chapter: "Cell Biology",
    qCount: 44,
    pctTotal: 23.2,
    pctHard: 2,
    focus:
      "Cell Organelles and Functions (17 · ribosome/mitochondria/golgi/ER), Cell Structure Fundamentals (6), Prokaryotic vs Eukaryotic Cells (5), Osmosis and Tonicity (4 · 25% HARD — chapter's lone trap subtopic), Cell Wall and Cell Membrane (4), Cellular Respiration and ATP (4), Cell Division and DNA Replication (2), Microscopy (2).",
  },
  {
    chapter: "Plant Biology",
    qCount: 29,
    pctTotal: 15.3,
    pctHard: 3,
    focus:
      "Plant Tissues and Meristems (11 · xylem/phloem/meristem), Photosynthesis (10 · light/dark reactions, chloroplast), Seed, Fruit and Embryo Development (4), Transpiration, Tropisms and Plant Processes (3 · 33% HARD — chapter's lone HARD pool), Vegetative Propagation (1).",
  },
  {
    chapter: "Microbiology and Disease",
    qCount: 21,
    pctTotal: 11.1,
    pctHard: 0,
    focus:
      "Pathogens and Diseases (13 · disease↔pathogen pairs — the marquee recall lever), Antibiotics — Discovery (7 · Fleming-Penicillin, viruses immune to antibiotics), Disease Vectors — Malaria (1). Zero HARD across 10 years.",
  },
  {
    chapter: "Reproduction",
    qCount: 13,
    pctTotal: 6.8,
    pctHard: 8,
    focus:
      "Angiosperm Reproduction — Pollination and Fertilization (7), Sexual Reproduction — Genetic Principles (3 · 33% HARD — chapter's lone HARD), Animal and Human Reproduction (2 · oestrus cycle), Meiosis and DNA in Flowering Plants (1).",
  },
  {
    chapter: "Ecology and Environment",
    qCount: 12,
    pctTotal: 6.3,
    pctHard: 0,
    focus:
      "Environment and Biodiversity (6), Ecosystems, Biomes and Ecological Interactions (6 · biome characteristics, food chains). Zero HARD across 10 years.",
  },
  {
    chapter: "Biodiversity and Classification",
    qCount: 11,
    pctTotal: 5.8,
    pctHard: 0,
    focus:
      "Animal Kingdom Classification (5 · phylum Porifera/sponges, arthropods), Plant Kingdom Classification (4 · bryophytes/pteridophytes), Kingdom Fungi (2). Zero HARD across 10 years.",
  },
  {
    chapter: "Genetics and Evolution",
    qCount: 4,
    pctTotal: 2.1,
    pctHard: 0,
    focus:
      "Heredity and DNA (3 · base pairing A-T G-C, DNA structure), Theory of Evolution (1 · Darwin/Origin of Species).",
  },
  {
    chapter: "Biochemistry",
    qCount: 4,
    pctTotal: 2.1,
    pctHard: 0,
    focus:
      "Food Spoilage — Rancidity and Browning (2), Anaerobic Respiration and Fermentation (1), Protein Structure (1 · peptide bonds). Tiny chapter, all EASY.",
  },
];
