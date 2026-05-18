/**
 * Static content + numbers for the /guide/nda-history route.
 *
 * Pulled from the live NDA History PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template B variant 5 (Geography-like, non-flat %HARD) but with a
 * TIER-STYLE strand split — NEW within Template B variants — chosen because:
 *
 *   - %HARD is NON-FLAT: ALL 4 chapters > 15% HARD (Modern 34%, Medieval
 *     28%, Ancient 27%, World 20%). Disqualifies pure Template B's
 *     "≤2 chapters > 15% HARD" gate.
 *
 *   - HARD is mixed-concentration: top-2 subtopic share of chapter HARD
 *     is 63% (Modern), 40% (Medieval, DIFFUSE), 67% (Ancient), 63%
 *     (World). BUT Modern's "concentrated HARD pool" IS Freedom Movement
 *     (56 q · 46% of chapter) — the chapter's primary content, cannot
 *     be legitimately skipped. Template C's per-chapter `DrillPosture`
 *     overlay's "skip HARD subs" lever fails on the dominant chapter.
 *
 *   - Cross-chapter topical lever max is Reformers/Movements at 27 q × 2 ch.
 *     Dynasties/Rulers/Kings 20 × 4 ch, Books/Authors 15 × 4 ch — all far
 *     below Template A's 40 q × ≥4 ch gate. Principles axis is dead.
 *
 *   - Execution-mode signal is UNIFORM across chapters: multi-statement
 *     (70 q × 4 ch · 43% HARD) and date-anchored (61 q × 4 ch · 43% HARD)
 *     cut UNIFORMLY across all 4 chapters. They don't partition chapters.
 *     So a Biology/Geography-style Recall/Apply/Verify strand split would
 *     force lopsided cuts (Recall 44 q : Date 163 q : Verify 53 q if
 *     grouped by chapter's dominant mode).
 *
 *   - Strand split = TIER-STYLE by strategic priority (NEW variant within
 *     Template B). Recall is still universally stable — but where prior
 *     variants split chapters by EXECUTION MODE, History splits by
 *     STRATEGIC WEIGHT because the execution modes are bank-wide-uniform.
 *
 *       Cornerstone (Modern India alone)         122 q · 47% · 34% HARD
 *       Foundation Recall (Ancient + Medieval)    97 q · 37% · 28% HARD
 *       Quick-Win (World History)                 41 q · 16% · 20% HARD
 *
 *     Cornerstone gets its own strand because Modern India is 47% of the
 *     bank (no other NDA subject has one chapter at this share); cannot
 *     be cherry-picked away even though its HARD pool concentrates in
 *     Freedom Movement. Foundation Recall groups the two recall-heavy
 *     "older" eras (Ancient 75% pure recall, Medieval 64%). Quick-Win is
 *     World History — lowest %HARD, smallest chapter, date-anchored.
 *
 *   - History-specific subject artefact = /timeline-and-pairs (analogue
 *     of /vocab-families, /formulas, /common-compounds, /reference-tables).
 *     Two cluster types: (1) CHRONOLOGY ~50 year-event pairs across all 4
 *     eras — the lever for the 61 date-anchored q; (2) NAMED PAIRS
 *     multi-domain reference — rulers↔dynasty, scholars↔texts,
 *     viceroys↔era, reformers↔movement, Acts↔year. Rendered via new
 *     `HistoryReferenceTables` component (3rd multi-domain parallel after
 *     Biology + Geography).
 *
 *   - Trends HEADLINE: same framing as Chemistry/Biology/Geography —
 *     paper has NOT consistently hardened. %HARD bounces 19% (2017) → 42%
 *     (2021 peak) → 10% (2026-1 lowest). Distinctive secondary callout:
 *     chapter mix shifted from Modern-heavy (2017–2020 had ~55% Modern
 *     papers) to balanced (2022+ have Ancient surging to 9–10 q/yr from
 *     a ~2 baseline). The "Modern is 47% of bank" stat is skewed by old
 *     papers — recent papers spread more evenly across eras.
 *
 *   - Trap genre = PAIRED-FACT SWAPS (king↔dynasty, scholar↔text,
 *     viceroy↔era, treaty↔year, reformer↔movement) — same shape as
 *     Biology paired-fact genre — plus CHRONOLOGY/SEQUENCE genre
 *     (chronological order, century-anchored, traveller-by-era) and
 *     MULTI-STATEMENT VERIFY (partial-credit, universal-claim,
 *     match-list misalignment). Bucketed by GENRE in TRAP_SHAPES so the
 *     fix maps to the trap, regardless of which chapter it appears in.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-history (or "" for landing)
  label: string;
  blurb: string;
};

/** The 7 main routes under /guide/nda-history, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA History actually works — what the 260-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Foundation Recall, Quick-Win — three chapter-tier strands matched to NDA History's bank weights. Per-chapter must-drill subtopics and a ~25-hour time plan.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "4 playbooks — one per chapter. The dominant subtopic shape, the traps, and the worked PYQs you need.",
  },
  {
    slug: "timeline-and-pairs",
    label: "Timeline & pairs",
    blurb:
      "Single-page chronology + named-pair reference NDA actually tests. ~95 entries across 5 themed clusters — Era timeline, Rulers↔dynasty, Reformers↔movement, Viceroys/British Acts↔year, Scholars↔texts.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA History shifted 2017→2026 — Modern dominated 2017–20 (~55% of paper), Ancient surged 2022–24, paper has NOT consistently hardened. 2021 peak HARD, 2026-1 was the easiest. Drill all 10 years equally.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA History reuses — king↔dynasty swap, scholar↔text swap, viceroy↔era swap, treaty↔year swap, reformer↔movement swap, chronological-order traps, multi-statement partial-credit.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. NDA History is asked on NDA-1 + NDA-2 each year
   *  except 2020 (COVID-cancelled NDA-2) and 2026 NDA-2 (not yet held). */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — 1 per chapter. */
  playbooks: number;
  /** Timeline + named-pair entries indexed on /timeline-and-pairs. */
  referenceFacts: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below.
 *  SQL-derived 2026-05-19 — full-bank tally. */
export const OVERVIEW: Overview = {
  totalQ: 260,
  // 2017–2025: 2 papers each except 2020 (1, NDA-2 cancelled) = 17 papers.
  // 2026: 1 paper (NDA-1 only). Total: 18.
  papers: 18,
  yearsCovered: 10,
  chapters: 4,
  playbooks: 4,
  referenceFacts: 95,
  // EASY 51, MODERATE 133, HARD 76 (≈29% HARD bank-wide).
  difficulty: { easy: 51, moderate: 133, hard: 76 },
  asOf: "2026-05-19",
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

/** 4 NDA History chapters, sorted by question count descending. SQL-derived
 *  against the 260-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "Modern India",
    qCount: 122,
    pctTotal: 46.9,
    pctHard: 34,
    focus:
      "Freedom Movement — INC, Gandhi and Independence (56 · 34% HARD — chapter giant; INC sessions, Gandhi's satyagrahas, Home Rule, Swaraj Party, partition), 19th Century Social and Religious Reform (17 · 41% HARD — densest %HARD subtopic; Brahmo, Arya, Theosophical, women's reform, abolition acts), British Administration, Acts and Legislation (16 · 38% HARD — Charter Acts 1813/1833, Regulating Act 1773, GoI Acts 1858/1909/1919/1935), Post-Independence India (14 · 21% HARD), European Trading and Early British Conquest (10 · 20% HARD — Plassey, Buxar, Diwani), British Economic Policy and Industrial India (9 · 44% HARD — drain of wealth, deindustrialization, railways).",
  },
  {
    chapter: "Medieval India",
    qCount: 53,
    pctTotal: 20.4,
    pctHard: 28,
    focus:
      "Medieval Travellers, Trade and Crops (11 · 27% HARD — Ibn Battuta, Marco Polo, Nikitin, Monserrate, Mundy, Bernier; crop introductions: chilli, potato, tobacco), Mughal Empire and Administration (10 · 30% HARD — Akbar's mansabdari, Aurangzeb's expansion, Shah Jahan's architecture), Vijayanagara Empire (9 · 33% HARD — Krishnadevaraya's campaigns, Hampi, foreign accounts), Bhakti and Sufi Movements (9 · 22% HARD — Kabir, Tulsidas, Surdas, Mirabai, Shankardeva, Chaitanya, Chishti/Suhrawardi orders), Other Medieval Kingdoms — Chola, Rajput, Ahom, Sikh (8 · 38% HARD — Chola maritime, Rajput resistance, Ahom Battle of Saraighat, Sikh Guru lineage), Medieval Literature and Texts (6 · 17% HARD).",
  },
  {
    chapter: "Ancient India",
    qCount: 44,
    pctTotal: 16.9,
    pctHard: 27,
    focus:
      "Ancient Indian Literature and Inscriptions (12 · 42% HARD — densest %HARD subtopic in chapter; Vedas, Upanishads, Sangam Tamil, Ashokan inscriptions, Kharosthi/Brahmi scripts, Sushruta Samhita), Harappan and Indus Valley Civilization (9 · 33% HARD — Mohenjo-daro Great Bath, Dholavira water systems, Lothal dockyard, town planning), Mahajanapadas, Magadha and Mauryan Empire (8 · 13% HARD — 16 mahajanapadas, Bimbisara/Ajatashatru, Ashoka's edicts, dhamma-mahamatta administration), Buddhism, Jainism and Religious Architecture (6 · 0% HARD — easy marks pocket; Buddha's life, 4 Noble Truths, Jain tirthankaras, stupas/chaityas), Society, Trade and Foreign Connections (5 · 40% HARD — Greek/Roman accounts, Indo-Greek coins, trade routes), Post-Mauryan, Gupta and Sangam Period (4 · 25% HARD).",
  },
  {
    chapter: "World History",
    qCount: 41,
    pctTotal: 15.8,
    pctHard: 20,
    focus:
      "Enlightenment and Political Revolutions (12 · 25% HARD — densest %HARD subtopic; American Revolution, French Revolution, Continental Congress, Magna Carta, Locke/Rousseau/Voltaire), Industrial Revolution (12 · 17% HARD — first use of the term, key inventions: spinning jenny, steam engine, telephone), 20th Century — World Wars, Modernity and Global Institutions (10 · 20% HARD — WWI causes/impact, Treaty of Versailles, League/UN, Cold War origins), Renaissance, Exploration and Scientific Revolution (7 · 14% HARD — Vasco da Gama, Magellan, Columbus, Da Vinci, Galileo, Copernicus, EIC founding dates). Lightest %HARD chapter — date-anchored (39% of chapter), drill the chronology cluster cold.",
  },
];
