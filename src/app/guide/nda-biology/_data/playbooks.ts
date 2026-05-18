/**
 * Playbook catalog for /guide/nda-biology/playbooks.
 *
 * 9 playbooks, 1:1 with chapters. Same shape as nda-physics + nda-chemistry
 * (chapter-level playbooks, no per-subtopic split) — Biology subtopics are
 * well-cleaned but thin (max 13 q on HP.Circulatory + MD.Pathogens; many at
 * 1-3 q). Per-subtopic playbooks would proliferate without adding clarity.
 *
 * `bucket` tags map each playbook to one of the 3 strategy strands (Recall
 * / Apply / Verify) defined in strategy.ts. Buckets reflect the dominant
 * skill the chapter demands, not its sole skill:
 *   - recall  (90 q · 5 playbooks):  Human Physiology, Cell Biology,
 *                                    Microbiology and Disease, Biodiversity,
 *                                    Genetics and Evolution
 *   - apply   (46 q · 2 playbooks):  Plant Biology, Reproduction
 *                                    (mechanism-tracing — photosynthesis
 *                                    flow, inheritance ratios, transpiration
 *                                    physics, osmosis direction)
 *   - verify  (54 q · 2 playbooks):  Microbiology overlap + Ecology/Environment
 *                                    + Biochemistry (multi-statement
 *                                    correctness shapes dominate)
 *
 * NOTE on bucket sizes: Biology is overwhelmingly recall (82% of questions
 * by execution mode), so the recall bucket is the largest. The Apply +
 * Verify buckets are sized by which chapters MOST exhibit those execution
 * modes — not by question count alone. Don't read bucket totals as "this
 * many q are Apply" — they're "the chapters that LEAN apply contain this
 * many q in total".
 */

export type PlaybookBucket = "recall" | "apply" | "verify";

export type Playbook = {
  slug: string;
  name: string;
  /** Single-line summary shown on the index card. */
  summary: string;
  chapter: string;
  /** All subtopics in `chapter` that this playbook covers. */
  subtopics: string[];
  qCount: number;
  pctHard: number;
  bucket: PlaybookBucket;
};

export const PLAYBOOKS: Playbook[] = [
  // ─────── Recall strand (5 playbooks) ───────
  {
    slug: "human-physiology",
    name: "Human Physiology",
    summary:
      "52 q · 2% HARD — the largest chapter. Circulatory + Lymphatic (13 q · RBC/WBC/blood groups), Digestive + Enzymes (7 · 14% HARD), Nutrition + Vitamins + Minerals (7 · vitamin↔deficiency table), plus nervous/endocrine/respiratory/tissues. Pure named-fact recall — drill /reference-tables → 'Vitamins' and 'Hormones' clusters side-by-side.",
    chapter: "Human Physiology",
    subtopics: [
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
    qCount: 52,
    pctHard: 2,
    bucket: "recall",
  },
  {
    slug: "cell-biology",
    name: "Cell Biology",
    summary:
      "44 q · 2% HARD. Cell Organelles + Functions (17 q · ribosome/mitochondria/golgi/ER — chapter's biggest subtopic), Cell Structure Fundamentals (6), Prokaryote vs Eukaryote (5), plus osmosis/membrane/respiration. The Osmosis and Tonicity subtopic (4 q · 25% HARD) is the chapter's lone Apply pocket — drill it separately.",
    chapter: "Cell Biology",
    subtopics: [
      "Cell Organelles and Functions",
      "Cell Structure Fundamentals",
      "Prokaryotic vs Eukaryotic Cells",
      "Osmosis and Tonicity",
      "Cell Wall and Cell Membrane",
      "Cellular Respiration and ATP",
      "Cell Division and DNA Replication",
      "Microscopy",
    ],
    qCount: 44,
    pctHard: 2,
    bucket: "recall",
  },
  {
    slug: "microbiology-and-disease",
    name: "Microbiology and Disease",
    summary:
      "21 q · 0% HARD across 10 years. Pathogens and Diseases (13 q · disease↔pathogen pairs — the marquee Biology recall lever, elephantiasis-Wuchereria / sleeping sickness-Trypanosoma / smallpox-virus / TB-Mycobacterium / cholera-bacterium), Antibiotics — Discovery (7 · Fleming-Penicillin, viruses immune to antibiotics), Disease Vectors (1). Zero HARD makes this a guaranteed marks chapter — drill /reference-tables → 'Diseases' cluster.",
    chapter: "Microbiology and Disease",
    subtopics: [
      "Pathogens and Diseases",
      "Antibiotics — Discovery",
      "Disease Vectors — Malaria",
    ],
    qCount: 21,
    pctHard: 0,
    bucket: "recall",
  },
  {
    slug: "biodiversity-and-classification",
    name: "Biodiversity and Classification",
    summary:
      "11 q · 0% HARD. Animal Kingdom (5 · sponges=Porifera, arthropods, vertebrate classes), Plant Kingdom (4 · bryophytes vs pteridophytes vs gymnosperms vs angiosperms), Kingdom Fungi (2). Pure classification recall — every q is a 'which kingdom/phylum is X' match. Zero HARD across the chapter.",
    chapter: "Biodiversity and Classification",
    subtopics: [
      "Animal Kingdom Classification",
      "Plant Kingdom Classification",
      "Kingdom Fungi",
    ],
    qCount: 11,
    pctHard: 0,
    bucket: "recall",
  },
  {
    slug: "genetics-and-evolution",
    name: "Genetics and Evolution",
    summary:
      "4 q · 0% HARD in 10 years. Heredity and DNA (3 · base pairing A-T/G-C, DNA structure facts), Theory of Evolution (1 · Darwin/Origin of Species). The smallest chapter — drill the 4 q in one sitting; don't over-invest, no return on time.",
    chapter: "Genetics and Evolution",
    subtopics: [
      "Heredity and DNA",
      "Theory of Evolution",
    ],
    qCount: 4,
    pctHard: 0,
    bucket: "recall",
  },

  // ─────── Apply strand (2 playbooks) ───────
  {
    slug: "plant-biology",
    name: "Plant Biology",
    summary:
      "29 q · 3% HARD. Plant Tissues + Meristems (11 q · xylem-water-up / phloem-food-bidirectional / apical-vs-lateral meristem), Photosynthesis (10 · light/dark reactions, chloroplast site, 6CO₂+6H₂O→C₆H₁₂O₆+6O₂), Seed/Fruit/Embryo (4), Transpiration + Tropisms (3 · 33% HARD — chapter's HARD pool, vaseline-on-leaf experiment design). Apply strand because each subtopic demands mechanism-tracing, not just recall.",
    chapter: "Plant Biology",
    subtopics: [
      "Plant Tissues and Meristems",
      "Photosynthesis",
      "Seed, Fruit and Embryo Development",
      "Transpiration, Tropisms and Plant Processes",
      "Vegetative Propagation",
    ],
    qCount: 29,
    pctHard: 3,
    bucket: "apply",
  },
  {
    slug: "reproduction",
    name: "Reproduction",
    summary:
      "13 q · 8% HARD. Angiosperm Reproduction — Pollination and Fertilization (7 · self vs cross-pollination, double fertilisation 2n+n=3n endosperm), Sexual Reproduction — Genetic Principles (3 · 33% HARD — chapter's lone HARD, parent↔offspring genetic continuity), Animal and Human Reproduction (2 · oestrus cycle), Meiosis + DNA in Flowering Plants (1). Apply strand because inheritance and pollination both require principle-application beyond pure recall.",
    chapter: "Reproduction",
    subtopics: [
      "Angiosperm Reproduction — Pollination and Fertilization",
      "Sexual Reproduction — Genetic Principles",
      "Animal and Human Reproduction",
      "Meiosis and DNA in Flowering Plants",
    ],
    qCount: 13,
    pctHard: 8,
    bucket: "apply",
  },

  // ─────── Verify strand (2 playbooks) ───────
  {
    slug: "ecology-and-environment",
    name: "Ecology and Environment",
    summary:
      "12 q · 0% HARD. Environment and Biodiversity (6), Ecosystems + Biomes + Ecological Interactions (6 · biome-feature identification, food-chain construction, mutualism/commensalism/parasitism). Verify strand because the dominant question shape is multi-statement evaluation ('Consider the following statements about ecosystems... which are correct?'). Zero HARD — guaranteed marks if you drill the verification habit.",
    chapter: "Ecology and Environment",
    subtopics: [
      "Environment and Biodiversity",
      "Ecosystems, Biomes and Ecological Interactions",
    ],
    qCount: 12,
    pctHard: 0,
    bucket: "verify",
  },
  {
    slug: "biochemistry",
    name: "Biochemistry",
    summary:
      "4 q · 0% HARD in 10 years. Food Spoilage — Rancidity and Browning (2), Anaerobic Respiration and Fermentation (1), Protein Structure (1 · peptide-bond sequence). Verify strand because the recurring question shape is 'which of the following statements about X is/are correct?'. Tiny chapter — read once in 20 min, don't over-invest.",
    chapter: "Biochemistry",
    subtopics: [
      "Food Spoilage — Rancidity and Browning",
      "Anaerobic Respiration and Fermentation",
      "Protein Structure",
    ],
    qCount: 4,
    pctHard: 0,
    bucket: "verify",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  recall: PLAYBOOKS.filter((p) => p.bucket === "recall"),
  apply: PLAYBOOKS.filter((p) => p.bucket === "apply"),
  verify: PLAYBOOKS.filter((p) => p.bucket === "verify"),
};
