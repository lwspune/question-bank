/**
 * Playbook catalog for /guide/nda-history/playbooks.
 *
 * 4 playbooks, 1:1 with chapters. Same shape as nda-physics + nda-chemistry
 * + nda-biology + nda-geography (chapter-level playbooks, no per-subtopic
 * split) — History subtopics are 4–56 q range; the chapter is the natural
 * student unit and 4 playbooks beats fragmenting into 20+ thin pages.
 *
 * `bucket` tags map each playbook to one of the 3 strategy tier-strands
 * (cornerstone / foundation / quickwin) defined in strategy.ts. This is the
 * NEW within Template B variants — strands are tier-style by strategic
 * priority, not execution-mode (because History's execution modes are
 * uniform across chapters; see nda-history.ts header for full rationale).
 *
 *   - cornerstone (122 q · 1 playbook): Modern India — the chapter is 47%
 *                                       of the bank. Cannot be cherry-
 *                                       picked away even though its HARD
 *                                       pool concentrates in Freedom
 *                                       Movement (which IS the chapter).
 *   - foundation  (97 q · 2 playbooks): Ancient India + Medieval India —
 *                                       named-fact recall heavy (75% +
 *                                       64% pure recall), dates rare
 *                                       (5–6% date-anchored).
 *   - quickwin    (41 q · 1 playbook):  World History — lightest %HARD
 *                                       (20%), date-anchored (39%
 *                                       date-q), cherry-pick EASY/MOD
 *                                       first.
 *
 * Bucket sizes are CHAPTER-grouping totals (the strand summary on
 * strategy.ts shows 122/97/41 q). Execution modes (multi-statement 70 q,
 * date-anchored 61 q) cut UNIFORMLY across all 4 chapters — they're a
 * cross-cutting overlay drilled via /timeline-and-pairs (chronology
 * lever) and the traps page (multi-statement Verify lever), not their own
 * strand.
 */

export type PlaybookBucket = "cornerstone" | "foundation" | "quickwin";

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
  // ─────── Cornerstone strand (1 playbook · 122 q) ───────
  {
    slug: "modern-india",
    name: "Modern India",
    summary:
      "122 q · 34% HARD — the bank's largest chapter AND densest-HARD chapter. Freedom Movement — INC, Gandhi and Independence (56 q · 34% HARD — chapter giant, 46% of Modern India's content), 19th Century Social and Religious Reform (17 · 41% HARD — densest %HARD subtopic), British Administration, Acts and Legislation (16 · 38% HARD — Charter/GoI Acts), Post-Independence India (14 · 21% HARD), European Trading and Early British Conquest (10 · 20% HARD — Plassey/Buxar/Diwani), British Economic Policy and Industrial India (9 · 44% HARD — drain of wealth, deindustrialization). The cornerstone of NDA History prep — drill all subtopics, target HARDs in 19thC Reform + British Admin + British Economic.",
    chapter: "Modern India",
    subtopics: [
      "Freedom Movement — INC, Gandhi and Independence",
      "19th Century Social and Religious Reform",
      "British Administration, Acts and Legislation",
      "Post-Independence India",
      "European Trading and Early British Conquest",
      "British Economic Policy and Industrial India",
    ],
    qCount: 122,
    pctHard: 34,
    bucket: "cornerstone",
  },

  // ─────── Foundation Recall strand (2 playbooks · 97 q) ───────
  {
    slug: "medieval-india",
    name: "Medieval India",
    summary:
      "53 q · 28% HARD. Diffuse HARD — 6 subtopics carry 3-3-3-3-2-1 HARDs (no cherry-pick lever). Medieval Travellers, Trade and Crops (11 · 27% HARD — Ibn Battuta/Marco Polo/Nikitin/Monserrate/Mundy/Bernier, crop introductions), Mughal Empire and Administration (10 · 30% HARD — Akbar's mansabdari, Aurangzeb's expansion), Vijayanagara Empire (9 · 33% HARD — Krishnadevaraya, Hampi, foreign accounts), Bhakti and Sufi Movements (9 · 22% HARD — Kabir/Tulsidas/Mirabai/Shankardeva/Chaitanya, Chishti/Suhrawardi orders), Other Medieval Kingdoms — Chola, Rajput, Ahom, Sikh (8 · 38% HARD — Chola maritime, Ahom Saraighat, Sikh Gurus), Medieval Literature and Texts (6 · 17% HARD). Drill /timeline-and-pairs → 'Rulers↔dynasty' + 'Scholars↔texts' clusters.",
    chapter: "Medieval India",
    subtopics: [
      "Medieval Travellers, Trade and Crops",
      "Mughal Empire and Administration",
      "Vijayanagara Empire",
      "Bhakti and Sufi Movements",
      "Other Medieval Kingdoms (Chola, Rajput, Ahom, Sikh)",
      "Medieval Literature and Texts",
    ],
    qCount: 53,
    pctHard: 28,
    bucket: "foundation",
  },
  {
    slug: "ancient-india",
    name: "Ancient India",
    summary:
      "44 q · 27% HARD. The most recall-heavy chapter (75% pure recall) — dates rare (5%). Ancient Indian Literature and Inscriptions (12 · 42% HARD — densest %HARD subtopic; Vedas, Sangam, Ashokan edicts, Sushruta Samhita), Harappan and Indus Valley Civilization (9 · 33% HARD — Mohenjo-daro, Dholavira, Lothal, town planning), Mahajanapadas, Magadha and Mauryan Empire (8 · 13% HARD — 16 mahajanapadas, Bimbisara, Ashoka), Buddhism, Jainism and Religious Architecture (6 · 0% HARD — guaranteed marks pocket; Buddha, Jain tirthankaras, stupas), Society, Trade and Foreign Connections (5 · 40% HARD — Greek/Roman accounts, Indo-Greek coins), Post-Mauryan, Gupta and Sangam Period (4 · 25% HARD). Drill /timeline-and-pairs → 'Scholars↔texts' cluster cold.",
    chapter: "Ancient India",
    subtopics: [
      "Ancient Indian Literature and Inscriptions",
      "Harappan and Indus Valley Civilization",
      "Mahajanapadas, Magadha and Mauryan Empire",
      "Buddhism, Jainism and Religious Architecture",
      "Society, Trade and Foreign Connections",
      "Post-Mauryan, Gupta and Sangam Period",
    ],
    qCount: 44,
    pctHard: 27,
    bucket: "foundation",
  },

  // ─────── Quick-Win strand (1 playbook · 41 q) ───────
  {
    slug: "world-history",
    name: "World History",
    summary:
      "41 q · 20% HARD — lightest %HARD chapter, the quick-win pocket. Enlightenment and Political Revolutions (12 · 25% HARD — American + French Revolutions, Continental Congress, Magna Carta, Locke/Rousseau), Industrial Revolution (12 · 17% HARD — first use of term, key inventions: spinning jenny, steam engine, telephone), 20th Century — World Wars, Modernity and Global Institutions (10 · 20% HARD — WWI causes/impact, Treaty of Versailles, League/UN), Renaissance, Exploration and Scientific Revolution (7 · 14% HARD — Vasco da Gama, Magellan, Columbus, Galileo, EIC founding dates). Date-anchored (39% of chapter q is date-anchored — highest in History bank). Drill /timeline-and-pairs → 'Era timeline' cluster for the chronology backbone.",
    chapter: "World History",
    subtopics: [
      "Enlightenment and Political Revolutions",
      "Industrial Revolution",
      "20th Century — World Wars, Modernity and Global Institutions",
      "Renaissance, Exploration and Scientific Revolution",
    ],
    qCount: 41,
    pctHard: 20,
    bucket: "quickwin",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  cornerstone: PLAYBOOKS.filter((p) => p.bucket === "cornerstone"),
  foundation: PLAYBOOKS.filter((p) => p.bucket === "foundation"),
  quickwin: PLAYBOOKS.filter((p) => p.bucket === "quickwin"),
};
