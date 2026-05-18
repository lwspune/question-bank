/**
 * Content for /guide/nda-history/strategy.
 *
 * NDA History strategy = TIER-STYLE strand split — NEW within Template B
 * variants — chosen because History's execution modes (recall, multi-
 * statement, date-anchored) are uniform across chapters (don't partition
 * them), so the honest seam is STRATEGIC PRIORITY by chapter weight.
 *
 * Strand split (260 q):
 *   - Cornerstone        (122 q · 1 chapter · 47% of bank): Modern India.
 *     Drill all subtopics; target HARDs in 19thC Reform + British Admin +
 *     British Economic. Cannot be cherry-picked — Freedom Movement IS
 *     46% of the chapter.
 *   - Foundation Recall  ( 97 q · 2 chapters · 37% of bank): Ancient India
 *     + Medieval India. Named-fact recall heavy (75% / 64% pure recall).
 *     Drill /timeline-and-pairs → Rulers + Scholars + Era timeline.
 *   - Quick-Win          ( 41 q · 1 chapter · 16% of bank): World History.
 *     Lightest %HARD (20%), date-anchored (39%). Cherry-pick EASY/MOD
 *     first.
 *
 * GAT PART A History is ~14 q per single paper (range 10–19 across 18
 * papers in the bank; avg 14.4). Marks per correct = 4, penalty −1.33
 * per wrong. Per-paper max ≈ 56 marks. (Note: NDA History sits in GAT
 * PART A alongside Geography (~19 q), Polity (~5 q), Economics (~1–2 q),
 * Current Affairs (~10 q), plus English in its own PART. Each section
 * contributes independently to the GAT 600-mark total.)
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
  id: "cornerstone" | "foundation" | "quickwin";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/** Headline numbers shown in the strategy hero. PART A History is ~14 q
 *  per single paper on the GAT (range 10–19 across 18 papers in the bank;
 *  avg 14.4). Max marks per paper ≈ 56 (14 × 4), penalty −1.33 per wrong. */
export const STRATEGY_HEADLINE = {
  paperQ: 14,
  totalMarks: 56,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 38,
  targetAttempts: 12,
  targetAccuracyPct: 85,
};

export const CORNERSTONE_STRAND: StrategyStrand = {
  id: "cornerstone",
  label: "Cornerstone — Modern India (122 q · 47%)",
  qCount: 122,
  pctOfBank: 47,
  pitch:
    "Modern India is one chapter doing the work of THREE in any other NDA subject — 47% of the History bank, and the densest-HARD chapter at 34% HARD. Freedom Movement — INC, Gandhi and Independence is the chapter giant (56 q · 34% HARD — 46% of Modern India by itself). The HARD pool is concentrated in 19th Century Social and Religious Reform (17 q · 41% HARD) and British Economic Policy (9 q · 44% HARD), but you can't legitimately skip Freedom Movement — it's the chapter's primary content. The strategy is 'drill ALL subtopics, then target HARDs in the densest-HARD subtopics' — different from Foundation Recall's even-distribution approach.",
  approach: [
    "Read /timeline-and-pairs → 'Viceroys + British Acts ↔ year' + 'Reformers ↔ movement' clusters end-to-end first. These map to British Administration (16 q) and 19th Century Reform (17 q) directly. ~50 named-pair anchors there earn back ~8 marks per paper from Modern India alone.",
    "Freedom Movement (56 q · 34% HARD) is the chapter giant. Drill INC sessions year-by-year (Bombay 1885, Lahore 1929 Purna Swaraj, Karachi 1931, Tripuri 1939, Avadi 1955), Gandhi's satyagrahas in order (Champaran 1917, Kheda 1918, Ahmedabad 1918, Rowlatt 1919, Non-Cooperation 1920, Civil Disobedience 1930, Quit India 1942), and the league-of-leaders pairings (Tilak↔Home Rule Maharashtra/Belgaum, Annie Besant↔Home Rule Madras/Adyar, Subhas Bose↔Forward Bloc 1939, Bhagat Singh↔HSRA).",
    "19th Century Social and Religious Reform (17 q · 41% HARD) is the densest-HARD subtopic. Drill the reformer↔movement↔text triple cold: Raja Ram Mohan Roy / Brahmo Samaj 1828 / Tuhfat-ul-Muwahhidin; Dayanand Saraswati / Arya Samaj 1875 / Satyarth Prakash; Annie Besant / Theosophical Society / The Secret Doctrine; Vivekananda / Ramakrishna Mission 1897; Jyotirao Phule / Satyashodhak Samaj 1873; Ishwarchand Vidyasagar (Widow Remarriage Act 1856). Distractors swap reformer↔movement pairs — memorise the table, never guess.",
    "British Administration + Acts and Legislation (16 q · 38% HARD) tests Charter Act dates (1813 ended EIC monopoly except tea + China; 1833 made GG of India; 1853 separated exec + legislative). GoI Acts: 1858 (Crown rule), 1909 (Morley-Minto), 1919 (Montagu-Chelmsford diarchy), 1935 (provincial autonomy). Regulating Act 1773 (Warren Hastings as GG of Bengal). Indian Councils Acts 1861/1892. Memorise these dates cold — they're the date-anchored backbone of Modern India HARD questions.",
    "British Economic Policy (9 q · 44% HARD) is small but the highest-%HARD subtopic. Drain of wealth theory (Dadabhai Naoroji), deindustrialization of cottage industry, railways and telegraphs as colonial extraction tools, commercialization of agriculture (jute + indigo + opium). The 2024 HARD PYQ on pre-Five-Year-Plan plans (Bombay Plan 1944 by industrialists, Peoples Plan by MN Roy 1945, Sarvodaya Plan by JP Narayan 1950, Gandhian Plan by SN Agrawal 1944) tests exactly this strand.",
  ],
  chapters: [
    {
      chapter: "Modern India",
      qCount: 122,
      pctHard: 34,
      mustDrill: [
        "Freedom Movement — INC, Gandhi and Independence",
        "19th Century Social and Religious Reform",
        "British Administration, Acts and Legislation",
        "Post-Independence India",
        "European Trading and Early British Conquest",
        "British Economic Policy and Industrial India",
      ],
      expectedYieldPerPaper: "~18 marks",
      studyHours: 12,
      summary:
        "122 q · 34% HARD — bank's largest + densest-HARD chapter. Freedom Movement (56 q) is the chapter giant. 19thC Reform (17 q · 41% HARD) + British Economic (9 q · 44% HARD) carry the HARD pool. Drill all 6 subtopics; the timeline + named-pairs clusters compound directly here.",
    },
  ],
};

export const FOUNDATION_STRAND: StrategyStrand = {
  id: "foundation",
  label: "Foundation Recall — Ancient India + Medieval India (97 q · 37%)",
  qCount: 97,
  pctOfBank: 37,
  pitch:
    "Ancient India + Medieval India are the recall-heavy chapters (75% + 64% pure named-fact recall) — dates are rare (5–6% date-anchored). The lever is paired-fact mastery: ruler↔dynasty, scholar↔text, traveller↔era, reformer↔movement, dynasty↔architecture. 97 q across 12 subtopics at 28% average HARD — evenly distributed (Medieval is genuinely diffuse: 6 subtopics carry 3-3-3-3-2-1 HARDs, no cherry-pick lever). The skill is methodical named-fact memorisation, not chronological reasoning. Drill /timeline-and-pairs → 'Rulers ↔ dynasty' + 'Scholars ↔ texts' clusters in active-recall mode.",
  approach: [
    "Read /timeline-and-pairs → 'Rulers ↔ dynasty' + 'Scholars ↔ texts' clusters first. These two clusters carry ~40 named-pair anchors that map directly onto Ancient + Medieval recall HARDs. Without them, every Mughal-Vijayanagara-Chola-Bhakti question is a guess.",
    "Ancient Indian Literature and Inscriptions (12 q · 42% HARD — chapter's densest %HARD) is the highest-leverage Ancient subtopic. Vedas: Rigveda (oldest), Yajurveda (rituals), Samaveda (music — basis of Indian classical), Atharvaveda (folk). Six Vedangas. Upanishads (philosophy, Brahman-Atman). Smritis (Manu, Yajnavalkya). Itihasas (Mahabharata, Ramayana). Sangam Tamil (3 sangams). Ashokan inscriptions (Major Rock Edicts 1–14 + Minor Rock Edicts + 7 Pillar Edicts; Kalinga Edicts 13 + 14 on dhamma + war regret; Maski/Gujarra mention 'Ashoka' by name). Kharosthi script (NW India, written right-to-left, deciphered via Indo-Greek coins). Sushruta Samhita (Ayurveda surgery — Chakrapanidatta's 11C Bengal commentary is a 2024 HARD PYQ).",
    "Medieval Travellers, Trade and Crops (11 q · 27% HARD) tests traveller-by-era chronology in addition to recall. Order matters: Al-Biruni (11C Mahmud of Ghazni's era), Ibn Battuta (14C Muhammad bin Tughlaq), Marco Polo (13C, brief Indian visit), Afanasii Nikitin (15C Bahmani/Vijayanagara), Nicolo Conti (15C), Abdur Razzaq (15C Vijayanagara — Devaraya II's court), Antonio Monserrate (16C Akbar Jesuit envoy), Domingo Paes + Fernao Nuniz (16C Vijayanagara — Krishnadevaraya's reign), Peter Mundy (17C Shah Jahan's reign), Bernier + Tavernier (17C Aurangzeb), Manucci (late 17C-early 18C). The 2025 HARD PYQ tests this chronology (Battuta 14C → Nikitin 15C → Monserrate 16C → Mundy 17C).",
    "Mughal Empire (10 q · 30% HARD) + Vijayanagara Empire (9 q · 33% HARD) carry the chapter's HARD pool. Mughal lineage Babur → Humayun → Akbar (mansabdari, Din-i-Ilahi, Ibadat Khana) → Jahangir → Shah Jahan (Taj Mahal, Red Fort, Peacock Throne) → Aurangzeb (Deccan campaigns, jizya restoration). Vijayanagara: Sangama → Saluva → Tuluva (Krishnadevaraya's golden age 1509–1529 — captured Raichur fort 1520, Udayagiri 1514, Kondavidu 1515; foreign accounts of Paes + Nuniz; Amuktamalyada text in Telugu) → Aravidu. Talikota 1565 = end of Vijayanagara.",
    "Bhakti and Sufi (9 q · 22% HARD) tests devotional movement leaders + Sufi orders. Bhakti: Kabir (Banaras, nirgun, weaver caste), Tulsidas (Awadhi Ramcharitmanas), Surdas (Brajbhasha Sursagar), Mirabai (Rajasthan, Krishna devotion), Shankardeva (Assam Vaishnavism — late 15C, founder of Mahapuruxiya Dharma — NOT Gaudiya Vaishnavism which is Chaitanya's), Chaitanya (Bengal Gaudiya Vaishnavism). Sufi orders: Chishti (Khwaja Moinuddin Chishti at Ajmer; Nizamuddin Auliya Delhi), Suhrawardi (Multan, royal-favoured), Naqshbandi (Akbar's later period), Qadiri (Aurangzeb's brother Dara Shikoh). The 2025 HARD PYQ tests Shankardeva (Assam Vaishnavism, NOT Gaudiya).",
  ],
  chapters: [
    {
      chapter: "Ancient India",
      qCount: 44,
      pctHard: 27,
      mustDrill: [
        "Ancient Indian Literature and Inscriptions",
        "Harappan and Indus Valley Civilization",
        "Mahajanapadas, Magadha and Mauryan Empire",
        "Buddhism, Jainism and Religious Architecture",
        "Society, Trade and Foreign Connections",
        "Post-Mauryan, Gupta and Sangam Period",
      ],
      expectedYieldPerPaper: "~5 marks",
      studyHours: 4,
      summary:
        "44 q · 27% HARD. Most recall-heavy chapter (75% pure recall). Literature + Inscriptions (12 q · 42% HARD) is the densest %HARD subtopic and highest leverage. Buddhism/Jainism (6 q · 0% HARD) is a guaranteed marks pocket — read once, done.",
    },
    {
      chapter: "Medieval India",
      qCount: 53,
      pctHard: 28,
      mustDrill: [
        "Medieval Travellers, Trade and Crops",
        "Mughal Empire and Administration",
        "Vijayanagara Empire",
        "Bhakti and Sufi Movements",
        "Other Medieval Kingdoms (Chola, Rajput, Ahom, Sikh)",
        "Medieval Literature and Texts",
      ],
      expectedYieldPerPaper: "~6 marks",
      studyHours: 5,
      summary:
        "53 q · 28% HARD. Diffuse HARD — 6 subtopics carry 3-3-3-3-2-1 HARDs, no cherry-pick lever (drill all). Travellers (11 q) + Mughals (10 q) + Vijayanagara (9 q) + Bhakti/Sufi (9 q) + Other Kingdoms (8 q) cover 51 of 53 q. Timeline + named-pairs clusters do most of the work.",
    },
  ],
};

export const QUICKWIN_STRAND: StrategyStrand = {
  id: "quickwin",
  label: "Quick-Win — World History (41 q · 16%)",
  qCount: 41,
  pctOfBank: 16,
  pitch:
    "World History is the lightest-%HARD chapter (20%) — the date-anchored quick-win pocket of NDA History. 39% of the chapter q is date-anchored (highest of any History chapter — Modern India is 33%, Medieval 6%, Ancient 5%). Across 4 subtopics, the chronology lever dominates: Renaissance + Exploration (Vasco da Gama 1498, Magellan 1519–22, Columbus 1492), Industrial Revolution (term first used, key inventions in order: spinning jenny 1764, steam engine 1769, telephone 1876), Enlightenment + Political Revolutions (Continental Congress 1774, Declaration of Independence 1776, French Revolution 1789), 20th Century (WWI 1914–18, Treaty of Versailles 1919, League of Nations 1920, UN 1945). The skill is chronological anchoring — once a candidate has 15 absolute dates cold, the chapter answers itself.",
  approach: [
    "Read /timeline-and-pairs → 'Era timeline' cluster first. It contains ~35 absolute-date anchors across the 4 World History subtopics. Once you have 1492 Columbus, 1498 Vasco da Gama, 1519–22 Magellan, 1600 EIC, 1602 Dutch EIC, 1700s Enlightenment, 1764–69 industrial inventions, 1774 Continental Congress, 1789 French Revolution, 1815 Waterloo, 1857 Indian Mutiny, 1869 Suez, 1914 WWI, 1917 Russian Revolution, 1919 Versailles, 1939 WWII, 1945 UN, 1947 India independence — most World History questions answer themselves.",
    "Renaissance + Exploration (7 q · 14% HARD) tests EIC founding dates (British EIC 1600, Dutch EIC 1602, French EIC 1664, Danish EIC 1616, Portuguese — there was no separate EIC; Portuguese trading via Estado da Índia from 1505). The 2026 MOD PYQ tests chronological order: Vasco da Gama 1498 → British EIC 1600 → Dutch EIC 1602 → Magellan circumnavigation 1519–22 (so order is Gama → Magellan → BEIC → DEIC).",
    "Industrial Revolution (12 q · 17% HARD) tests term-coiner identification (Arnold Toynbee in lectures 1880–81 at Oxford — published 1884; the term was popularised by Friedrich Engels earlier in 1844 but coined more formally by Toynbee). Key inventions: spinning jenny (Hargreaves 1764), water frame (Arkwright 1769), steam engine (Watt 1769), spinning mule (Crompton 1779), power loom (Cartwright 1785), cotton gin (Whitney 1793), telegraph (Morse 1837), telephone (Bell 1876), electric bulb (Edison 1879). Causes: agricultural revolution + capital accumulation from colonial trade + Britain's coal + iron + textile demand.",
    "Enlightenment + Political Revolutions (12 q · 25% HARD — densest %HARD in chapter) tests Continental Congresses (First 1774 — rejected colonial union under British, drew up Declaration of Rights; Second 1775 — adopted Declaration of Independence 1776), French Revolution (Bastille July 14 1789, Reign of Terror 1793–94, Napoleon's coup 1799). Magna Carta 1215 (limiting royal power). Locke (Two Treatises of Government 1689), Rousseau (Social Contract 1762), Voltaire (Candide 1759). The 2019 HARD PYQ tests First Continental Congress decisions.",
    "20th Century (10 q · 20% HARD) tests WWI causes (Sarajevo assassination of Franz Ferdinand June 28 1914; assassination → Austria-Hungary's ultimatum to Serbia → alliance chain — Russia → France → Germany → Britain → Ottoman → Italy → US 1917 → Japan), Treaty of Versailles 1919 (Germany's war guilt clause + reparations + territorial losses), League of Nations 1920 (US never joined), UN 1945, Cold War origins (Yalta + Potsdam 1945, Iron Curtain Churchill 1946). The 2023 HARD PYQ tests WWI's impact on Europe (NOT industrial decline — Europe industrialized further; WAS political upheaval + colonial unrest + women's suffrage + Versailles humiliation).",
  ],
  chapters: [
    {
      chapter: "World History",
      qCount: 41,
      pctHard: 20,
      mustDrill: [
        "Enlightenment and Political Revolutions",
        "Industrial Revolution",
        "20th Century — World Wars, Modernity and Global Institutions",
        "Renaissance, Exploration and Scientific Revolution",
      ],
      expectedYieldPerPaper: "~5 marks",
      studyHours: 3,
      summary:
        "41 q · 20% HARD — lightest %HARD chapter. 39% date-anchored (highest in History). Drill the chronology cluster cold and most answers fall out. Enlightenment + Political Revolutions (12 q · 25% HARD) is the densest %HARD subtopic — focus there for HARD-stretch.",
    },
  ],
};

export const STRATEGY_STRANDS = [
  CORNERSTONE_STRAND,
  FOUNDATION_STRAND,
  QUICKWIN_STRAND,
];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — Cornerstone first (largest stake), then
 *  Foundation Recall (recall-heavy, fast), Quick-Win last (date-anchored —
 *  if a date doesn't fire in 5 sec, skip). Slot budget is ~12 min total
 *  (PART A History's share of the 150-min GAT is roughly proportional to
 *  its q-count: ~14 q × ~50 sec ≈ 12 min). */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 6,
    label: "Sweep Cornerstone (Modern India)",
    detail:
      "Modern India contributes ~6–7 q to a typical paper. Hit Freedom Movement + Reformers first (recognition-speed-anchored — INC sessions, Gandhi satyagrahas, reformer↔movement pairs fire in <10 sec or not at all). British Admin + Acts ↔ year questions are date-anchored — if a date doesn't fire fast, skip (−1.33 penalty). Target: 5 correct in 6 min.",
  },
  {
    durationMin: 4,
    label: "Sweep Foundation Recall (Ancient + Medieval)",
    detail:
      "Ancient + Medieval contribute ~5 q to a typical paper, mostly named-fact recall. Ruler↔dynasty, scholar↔text, traveller↔era pairs fire fast for a candidate who's drilled the timeline-and-pairs. The MOD/HARD pool here is multi-statement (Vijayanagara Krishnadevaraya campaigns, Shankardeva-vs-Gaudiya distinction) — read each statement T/F independently. Target: 3 correct.",
  },
  {
    durationMin: 2,
    label: "Quick-Win World History last",
    detail:
      "World History contributes ~2–3 q to a typical paper, mostly date-anchored. If a date fires in 5 sec → mark; if not → skip (don't pause to derive). Chronological-order questions (arrange these 4 events) need 60 sec — only attempt if at least 3 of 4 dates fire fast. Target: 2 correct.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Cornerstone — Modern India", hours: 12, outcome: "~18 marks/paper" },
  { label: "Foundation Recall — Ancient India + Medieval India", hours: 9, outcome: "~11 marks/paper" },
  { label: "Quick-Win — World History", hours: 3, outcome: "~5 marks/paper" },
  { label: "Timeline + named-pairs active recall (the /timeline-and-pairs page)", hours: 4, outcome: "Compounding gains across all strands" },
  { label: "Past papers, timed (last 3 years)", hours: 3, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
