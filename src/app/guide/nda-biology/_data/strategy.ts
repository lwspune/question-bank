/**
 * Content for /guide/nda-biology/strategy.
 *
 * NDA Biology strategy = skill-strand split (Recall / Apply / Verify),
 * with NO %HARD overlay (same as Chemistry; UNLIKE Physics). Why no overlay:
 *   - Zero chapters above 7.7% HARD (max: Reproduction at 7.7% on 13 q =
 *     1 HARD; everything else ≤3.4%). The "concentrated HARD pool" lever
 *     the Physics overlay needs simply doesn't exist for Biology.
 *   - 4 of 9 chapters have ZERO HARD across the entire 10-year window.
 *
 * Strand split (190 q):
 *   - Recall  (132 q · 5 chapters): pure fact retrieval — vitamin↔disease,
 *     organ↔function, organelle↔role, kingdom↔example, scientist↔discovery,
 *     pathogen↔disease. The marks-per-hour leader.
 *   - Apply   (42 q · 2 chapters): mechanism-tracing — photosynthesis flow,
 *     transpiration physics, osmosis direction, inheritance ratios,
 *     pollination genetics. Plant Biology + Reproduction lean this way.
 *   - Verify  (16 q · 2 chapters): multi-statement true/false evaluation.
 *     Ecology + Biochemistry lean this way — the dominant question shape is
 *     "Consider the following statements... which are correct?".
 *
 * NOTE on bucket sizes: Biology is overwhelmingly recall by question shape
 * (155/190 = 82% are single-fact-recall questions). The Apply + Verify
 * buckets are based on which CHAPTERS most exhibit those execution modes —
 * not pure question counts. A Cell Biology question can still be "verify"
 * by shape even though the chapter is grouped in Recall.
 *
 * GAT PART B Biology is ~10–11 q per single paper (range 9–13 across the
 * 2017–2026 bank; avg 10.6). Marks per correct = 4, penalty −1.33 — same
 * 4 / −1.33 scoring as every NDA section. Per-paper max ≈ 44 marks.
 * (Note: don't confuse with Physics's ~25 q/paper or Chemistry's ~15 q/paper
 * — Biology is the smallest of the three Part B science sections. Each
 * section has its own q-count and contributes independently to the GAT
 * 600-mark total.)
 */

import type { Difficulty } from "@/lib/questions/filters";

export type StrandChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  /** Subtopics to drill (each becomes a "Drill →" CTA). */
  mustDrill: string[];
  /** Realistic marks ceiling per paper from this chapter. */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyStrand = {
  id: "recall" | "apply" | "verify";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/** Headline numbers shown in the strategy hero. PART B Biology is ~10–11 q
 *  per single paper on the GAT (range 9–13 across 18 papers in the bank;
 *  avg 10.6). Max marks per paper ≈ 44 (11 × 4), penalty −1.33 per wrong. */
export const STRATEGY_HEADLINE = {
  paperQ: 11,
  totalMarks: 44,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 32,
  targetAttempts: 10,
  targetAccuracyPct: 90,
};

export const RECALL_STRAND: StrategyStrand = {
  id: "recall",
  label:
    "Recall — Human Physiology · Cell Biology · Microbiology · Biodiversity · Genetics (132 q · 69%)",
  qCount: 132,
  pctOfBank: 69,
  pitch:
    "Pure fact recall — vitamin↔disease, organ↔function, organelle↔role, kingdom↔example, scientist↔discovery, pathogen↔disease. 132 q at an average of 1.5% HARD. The highest marks-per-hour strand in the bank, and the strand where Biology most rewards methodical prep. 4 of these 5 chapters carry ZERO HARD across 10 years (only Cell Biology has 1 HARD across 44 q). Drill the /reference-tables page side-by-side with this strand — it covers the highest-leverage named-fact memorisation surface (50+ disease↔pathogen + vitamin↔deficiency + hormone↔gland + scientist↔discovery pairs).",
  approach: [
    "Read /guide/nda-biology/reference-tables end-to-end first. That's the 50+ named-fact pairs the recall strand keeps re-testing. Active-recall it in 4 passes (cover the right column, read the name, write the pair).",
    "Human Physiology is the bank's largest chapter (52 q). Its weight is spread evenly across body systems — the three biggest subtopics are Body Tissues (8 q · the four tissue types), Nervous + Sense Organs (8 q · neurons/reflex arc/eye), and Nutrition + Vitamins (8 q · vitamin↔deficiency table), then Digestive + Enzymes (7 q · pepsin/trypsin/amylase). Drill these subtopics separately.",
    "Microbiology and Disease (21 q · 0% HARD) is the chapter most under-invested in. Disease↔pathogen pairs appear year after year (elephantiasis-Wuchereria, sleeping sickness-Trypanosoma, smallpox-virus, TB-Mycobacterium, cholera-Vibrio, malaria-Plasmodium). Memorise the table cold — it's 13 of the chapter's 21 q.",
  ],
  chapters: [
    {
      chapter: "Human Physiology",
      qCount: 52,
      pctHard: 2,
      mustDrill: [
        "Circulatory and Lymphatic System",
        "Digestive System and Enzymes",
        "Nutrition, Vitamins and Minerals",
        "Nervous System and Sense Organs",
        "Endocrine System and Hormones",
        "Respiratory System",
        "Connective and Epithelial Tissues",
        "Excretory and Reproductive Anatomy",
        "Immune System — Antibody Production",
      ],
      expectedYieldPerPaper: "~10 marks",
      studyHours: 5,
      summary:
        "52 q · 1 HARD across 10 yrs. The largest chapter. Tissues + Nervous + Nutrition cover 24 of the 52 — drill these three subtopics first. Vitamin↔deficiency cluster on /reference-tables compounds the value.",
    },
    {
      chapter: "Cell Biology",
      qCount: 44,
      pctHard: 2,
      mustDrill: [
        "Cell Organelles and Functions",
        "Cell Structure Fundamentals",
        "Prokaryotic vs Eukaryotic Cells",
        "Osmosis and Tonicity",
        "Cell Wall and Cell Membrane",
        "Cellular Respiration and ATP",
        "Cell Division and DNA Replication",
        "Microscopy",
      ],
      expectedYieldPerPaper: "~8 marks",
      studyHours: 4,
      summary:
        "44 q · 1 HARD across 10 yrs. Cell Organelles (17 q) is the dominant subtopic — memorise the ribosome/mitochondria/golgi/ER/nucleus function table cold. Osmosis (4 q, 25% HARD) is the chapter's lone Apply pocket.",
    },
    {
      chapter: "Microbiology and Disease",
      qCount: 21,
      pctHard: 0,
      mustDrill: [
        "Pathogens and Diseases",
        "Antibiotics — Discovery",
        "Disease Vectors — Malaria",
      ],
      expectedYieldPerPaper: "~4 marks",
      studyHours: 2,
      summary:
        "21 q · ZERO HARD across 10 yrs. The most under-invested chapter. Disease↔pathogen pairs (13 q) are the marquee lever — drill /reference-tables → 'Diseases' cluster. Fleming-Penicillin, viruses immune to antibiotics, Anopheles for malaria — all repeat-tested.",
    },
    {
      chapter: "Biodiversity and Classification",
      qCount: 11,
      pctHard: 0,
      mustDrill: [
        "Animal Kingdom Classification",
        "Plant Kingdom Classification",
        "Kingdom Fungi",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 1.5,
      summary:
        "11 q · ZERO HARD across 10 yrs. Pure classification recall. Sponges = Porifera, mollusks = soft-bodied + shell, bryophytes = non-vascular plants. Read the 5-kingdom + 4-plant-group + animal-phylum tables once, recognise on test day.",
    },
    {
      chapter: "Genetics and Evolution",
      qCount: 4,
      pctHard: 0,
      mustDrill: [
        "Heredity and DNA",
        "Theory of Evolution",
      ],
      expectedYieldPerPaper: "≤1 mark",
      studyHours: 0.5,
      summary:
        "4 q · ZERO HARD across 10 yrs. The smallest chapter. Base pairing A-T G-C, Darwin/Origin of Species. Drill once in 30 min — the q-yield is low but the marks are essentially free.",
    },
  ],
};

export const APPLY_STRAND: StrategyStrand = {
  id: "apply",
  label: "Apply — Plant Biology · Reproduction (42 q · 22%)",
  qCount: 42,
  pctOfBank: 22,
  pitch:
    "Mechanism-tracing — follow a biological process and predict the outcome. Plant Biology (29 q · 3% HARD) requires tracing photosynthesis flow, transpiration physics (vaseline-on-leaf), xylem-water-up vs phloem-food-bidirectional. Reproduction (13 q · 8% HARD) requires inheritance ratios, double-fertilisation arithmetic (2n + n = 3n endosperm), pollination genetics. 42 q at an average of 4% HARD — including 4 of the bank's 5 HARDs. The skill is process-tracing, not pure recall: the answer follows from the mechanism, not from a memorised fact.",
  approach: [
    "Memorise the 4 master processes first: (1) Photosynthesis — light-dependent (thylakoid) → light-independent (stroma); inputs 6CO₂ + 6H₂O + light → outputs C₆H₁₂O₆ + 6O₂. (2) Cellular respiration — glycolysis (cytoplasm) → Krebs (mitochondrial matrix) → ETC (inner membrane); net 36–38 ATP per glucose. (3) Osmosis direction — water moves from LOW solute to HIGH solute (high water potential to low). RBC in 2% detergent → hypotonic to detergent solution but detergent disrupts membrane → cell bursts. (4) Pollination → double fertilisation: 1 male nucleus + egg = 2n zygote; 1 male nucleus + 2 polar nuclei = 3n endosperm.",
    "Plant Biology Transpiration subtopic (3 q · 33% HARD) is the hottest Apply pocket. The vaseline-on-leaf experiment (control + vaseline-upper + vaseline-lower) tests whether you can reason: stomata mostly on lower surface → vaseline-lower blocks most transpiration → that leaf loses least mass. Practice the experimental-design reasoning.",
    "Reproduction is small (13 q) but disproportionately HARD-heavy. The Genetic Principles subtopic (3 q · 33% HARD) tests parent↔offspring genetic continuity (chromosome number, gamete formation, sexual vs asexual). Drill the inheritance-ratio basics: AA × aa → all Aa; Aa × Aa → 1:2:1 AA:Aa:aa; codominance vs incomplete dominance.",
  ],
  chapters: [
    {
      chapter: "Plant Biology",
      qCount: 29,
      pctHard: 3,
      mustDrill: [
        "Plant Tissues and Meristems",
        "Photosynthesis",
        "Seed, Fruit and Embryo Development",
        "Transpiration, Tropisms and Plant Processes",
        "Vegetative Propagation",
      ],
      expectedYieldPerPaper: "~5 marks",
      studyHours: 4,
      summary:
        "29 q · 1 HARD across 10 yrs. Plant Tissues + Photosynthesis are the giant subtopics (11 + 10 = 21 of 29). Drill xylem-vs-phloem direction, apical-vs-lateral meristem, light/dark reactions. The Transpiration subtopic (3 q · 33% HARD) is the Apply hot pocket.",
    },
    {
      chapter: "Reproduction",
      qCount: 13,
      pctHard: 8,
      mustDrill: [
        "Angiosperm Reproduction — Pollination and Fertilization",
        "Sexual Reproduction — Genetic Principles",
        "Animal and Human Reproduction",
        "Meiosis and DNA in Flowering Plants",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 2,
      summary:
        "13 q · 1 HARD across 10 yrs. Pollination + Fertilisation (7 q) is the biggest subtopic — self vs cross-pollination, double fertilisation arithmetic. Sexual Reproduction Principles (3 q, 33% HARD) is the chapter's HARD pocket.",
    },
  ],
};

export const VERIFY_STRAND: StrategyStrand = {
  id: "verify",
  label: "Verify — Ecology and Environment · Biochemistry (16 q · 8%)",
  qCount: 16,
  pctOfBank: 8,
  pitch:
    "Multi-statement true/false evaluation. The dominant question shape in these chapters is 'Consider the following statements about X. Which are correct?' — 3 or 4 statements, each individually verifiable. 16 q at 0% HARD across both chapters. The skill is methodical statement-by-statement evaluation: read each statement, judge it true/false against your knowledge, then match to the option that lists exactly the correct ones. Speed matters — these questions take longer per attempt than pure recall.",
  approach: [
    "Drill the statement-evaluation execution mode separately from pure recall. The trap is partial-credit thinking — you can't get 'half the statements right'; you must judge each one true/false correctly. The option that lists exactly 2 correct statements (when there are 3) is a distractor.",
    "Ecology and Environment (12 q) has two big subtopics — Environment + Biodiversity (6 q) and Ecosystems + Biomes + Ecological Interactions (6 q). The biome-identification questions (tropical rainforest features, taiga features, savanna characteristics) test recall, but most others test statement-evaluation. Mutualism vs commensalism vs parasitism distinction is repeat-tested.",
    "Biochemistry (4 q) is tiny — read once in 20 min. Rancidity (oxidation of fats), browning (Maillard reaction), fermentation (anaerobic, ethanol + CO₂), peptide bonds in protein primary structure. Don't over-invest beyond the read.",
  ],
  chapters: [
    {
      chapter: "Ecology and Environment",
      qCount: 12,
      pctHard: 0,
      mustDrill: [
        "Environment and Biodiversity",
        "Ecosystems, Biomes and Ecological Interactions",
      ],
      expectedYieldPerPaper: "~2 marks",
      studyHours: 2,
      summary:
        "12 q · ZERO HARD across 10 yrs. Half biome-identification (recall), half multi-statement Verify. Mutualism vs commensalism vs parasitism, biome features, food chain construction. Always state each statement explicitly before picking the option.",
    },
    {
      chapter: "Biochemistry",
      qCount: 4,
      pctHard: 0,
      mustDrill: [
        "Food Spoilage — Rancidity and Browning",
        "Anaerobic Respiration and Fermentation",
        "Protein Structure",
      ],
      expectedYieldPerPaper: "≤1 mark",
      studyHours: 0.5,
      summary:
        "4 q · ZERO HARD across 10 yrs. Tiny chapter, all EASY. Rancidity = fat oxidation. Fermentation = anaerobic respiration (glucose → ethanol + CO₂). Peptide bond = C-N bond between adjacent amino acids. Read once, recognise, done.",
    },
  ],
};

export const STRATEGY_STRANDS = [RECALL_STRAND, APPLY_STRAND, VERIFY_STRAND];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — Recall-first to bank fast high-confidence marks,
 *  then Apply for mechanism questions, Verify last for multi-statement work
 *  (the slowest per attempt). Slot budget is ~10–11 min total (PART B Biology's
 *  share of the 150-min GAT is roughly proportional to its q-count: ~11 q ×
 *  ~1 min ≈ 11 min). */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 4,
    label:
      "Sweep Recall (Human Physiology + Cell Biology + Microbiology + Biodiversity + Genetics)",
    detail:
      "Scan all ~10–11 Biology questions, mark every Recall-strand item (vitamin↔deficiency, organ↔function, organelle role, kingdom/phylum classification, disease↔pathogen, scientist↔discovery). Expect ~7 Recall items per paper at ~25 sec each. Target: 6 correct in 4 min. If you don't recognise a vitamin-disease or disease-pathogen pair within 5 sec, skip — the −1.33 penalty makes a guess negative-EV at below ~55% confidence.",
  },
  {
    durationMin: 5,
    label: "Sweep Apply (Plant Biology + Reproduction)",
    detail:
      "Attempt every mechanism-tracing question. Photosynthesis flow (1 q), plant tissue function (1 q), pollination + fertilisation (≤1 q), osmosis direction (≤1 q), transpiration reasoning (≤1 q). ~2–3 items × ~85 sec. Target: 2 correct. The Transpiration experimental-design questions can swallow 2+ min — if you're not sure within 90 sec, skip.",
  },
  {
    durationMin: 2,
    label: "Verify last (Ecology + Biochemistry + scattered statement-evaluation)",
    detail:
      "Tackle multi-statement 'which of the following statements is correct?' questions last. These appear scattered across all chapters but cluster in Ecology + Biochemistry. Typically ~1 dedicated Verify item + 1 statement-evaluation question across other chapters. ~2 items × ~60 sec. Read each statement independently, judge true/false, then pick the option that lists exactly the correct set. Don't half-commit — if any statement is uncertain, the whole question is.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Recall — Human Physiology + Cell Biology + Microbiology + Biodiversity + Genetics", hours: 13, outcome: "~24 marks/paper" },
  { label: "Apply — Plant Biology + Reproduction", hours: 6, outcome: "~7 marks/paper" },
  { label: "Verify — Ecology + Biochemistry", hours: 2.5, outcome: "~3 marks/paper" },
  { label: "Reference-tables active recall (the /reference-tables page)", hours: 3, outcome: "Compounding gains across Recall" },
  { label: "Past papers, timed (last 3 years)", hours: 4, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
