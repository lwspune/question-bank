/**
 * Static content + numbers for the /guide/nda-current-affairs route.
 *
 * Pulled from the live NDA Current Affairs PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * SINGLE-PAGE LANDING — Template D (NEW). Strand axis is recurrence strength:
 *   - Anchor themes appear in 5+ years of papers (~5 q/paper coverage).
 *   - Recurring themes appear in 3–4 years (~3 q/paper).
 *   - Occasional themes appear in 1–2 years (drill if time permits).
 *
 * Why a new template (vs A/B/C/single-page-Economics):
 *
 *   Empirical: 90% of explicit-year mentions in CA questions are within 12
 *   months of the paper. Of 13 NDA Military Exercise questions across 5
 *   years, 13 different exercises are named — Yudh Abhyas, Malabar, Garuda,
 *   INDRA, etc. each appear in ONE paper. Same shape for flagship schemes:
 *   3 well-known schemes among ~14 candidates checked, each in one paper.
 *
 *   So the bank's role here is NOT memorise-these-facts. The facts are
 *   historical. The bank's role IS shape calibration — these are the
 *   recurring question shapes (named exercise ↔ partner country, scheme
 *   ↔ ministry/motto, ICC tournament ↔ winner, intl org ↔ HQ). Students
 *   harvest THIS YEAR'S facts from an external compendium and drill the
 *   bank for shape practice.
 *
 *   Every other guide proposes specific facts to memorise; this one
 *   explicitly does not. The /strategy block names the half-life and the
 *   prep path.
 *
 * Override of the same-day 2026-05-19 (post-Polity) defer. Re-evaluation
 * after the user pushed back: there ARE stable themes even though specific
 * facts aren't, so a single-page theme-prep-checklist is a useful artefact
 * even when a multi-route guide isn't. See Decisions log entry of the
 * same date (later, post-Economics).
 */

export type Overview = {
  totalQ: number;
  /** Distinct GAT papers covered (NDA-1 + NDA-2 across the year window). */
  papers: number;
  yearsCovered: number;
  /** Avg q per paper across the window. */
  avgQPerPaper: number;
  /** Max marks per paper (paperQ × 4). */
  maxMarksPerPaper: number;
  /** Target marks per paper at 80% accuracy on ~7 attempts. */
  targetMarks: number;
  chapters: number;
  subtopics: number;
  difficulty: { easy: number; moderate: number; hard: number };
  pctHard: number;
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below.
 *  SQL-derived 2026-05-19 — full-bank tally on PUBLIC questions. */
export const OVERVIEW: Overview = {
  totalQ: 180,
  papers: 18,
  yearsCovered: 10,
  avgQPerPaper: 10.0,
  maxMarksPerPaper: 40,
  targetMarks: 24, // ~6 correct at ~80% on 7 attempts = 24 marks net of negative
  chapters: 8,
  subtopics: 31,
  difficulty: { easy: 76, moderate: 82, hard: 22 },
  pctHard: 12.2,
  asOf: "2026-05-19",
};

export type ChapterRow = {
  chapter: string;
  qCount: number;
  pctTotal: number; // 1 decimal
  pctHard: number; // 1 decimal
  focus: string;
};

/** 8 NDA Current Affairs chapters, sorted by question count descending.
 *  qCount sums to OVERVIEW.totalQ — locked by the themes test. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter: "International Affairs and Relations",
    qCount: 33,
    pctTotal: 18.3,
    pctHard: 15.2,
    focus:
      "India ↔ partner-country agreements + UN / multilateral bodies + world leaders and elections + summit hosting. The densest recurring theme on the paper — bilateral relations alone carries ~3 q per paper when it appears.",
  },
  {
    chapter: "Government Schemes, Policy and Governance",
    qCount: 33,
    pctTotal: 18.3,
    pctHard: 6.1,
    focus:
      "Recent scheme launches, governance and UT reform, Acts and policies, infrastructure connectivity projects. Lowest %HARD bank-wide — these are easy marks IF you've read the past year's scheme rollouts.",
  },
  {
    chapter: "Defence and Military Exercises",
    qCount: 29,
    pctTotal: 16.1,
    pctHard: 10.3,
    focus:
      "Bilateral and multilateral exercises (2.6 q per paper when present), Indian Navy ship inductions and naval policy, defence procurement deals, gallantry awards and service appointments.",
  },
  {
    chapter: "Sports",
    qCount: 23,
    pctTotal: 12.8,
    pctHard: 8.7,
    focus:
      "Cricket is the bank's most consistent CA theme (appears in 8 of 10 years). Non-cricket coverage skews to Olympic / Asian Games medallists and Khel Ratna recipients.",
  },
  {
    chapter: "Science and Technology",
    qCount: 18,
    pctTotal: 10.0,
    pctHard: 11.1,
    focus:
      "Space technology + astronomy is the only S&T theme that clocks 1 q per year. DRDO / marine tech, IT safety systems (KAVACH), health tech and science awards round out the chapter.",
  },
  {
    chapter: "Awards, Honours, Books and Culture",
    qCount: 18,
    pctTotal: 10.0,
    pctHard: 16.7,
    focus:
      "Civilian awards (Padma, Bharat Ratna, gallantry) + books and authors + Indian art and architecture + UNESCO recognitions. Recall-heavy but %HARD is on the higher side — distractors are well-engineered.",
  },
  {
    chapter: "National Events, Persons and India General Knowledge",
    qCount: 15,
    pctTotal: 8.3,
    pctHard: 20.0,
    focus:
      "Indian economy / geography / resources reference + national days and observances + institutional milestones. Highest %HARD in CA — the obscure-fact-or-pair-swap zone.",
  },
  {
    chapter: "Environment, Ecology and Energy",
    qCount: 11,
    pctTotal: 6.1,
    pctHard: 18.2,
    focus:
      "Ramsar sites and wetlands + climate change summits + environmental campaigns + wildlife conservation. Small bank, high %HARD — single-q themes mostly.",
  },
];

export type AnchorTheme = {
  /** URL-safe id, unique across all three theme buckets. */
  slug: string;
  /** Display name — short, scannable. */
  name: string;
  /** Chapter from CHAPTER_TABLE — used for browse-filter and category chip. */
  chapter: string;
  qCount: number;
  yearsAppearing: number;
  qPerYearWhenPresent: number;
  /** Subtopic names that resolve under live taxonomy — backing the drill CTA. */
  drillSubtopics: string[];
  /** Single sentence describing the recurring question stem pattern.
   *  Sourced from real bank stems. This part is durable. */
  shape: string;
  /** Fact-categories to harvest from THIS YEAR's news (3–6 entries).
   *  These are durable directives, not facts. The student fills in the
   *  specific facts from a yearly compendium. */
  checklist: string[];
  /** Optional small list of structural facts that DO stay stable across years
   *  (G7 nations, UN agency HQs, etc.). When present, the card shows them
   *  inline as a "Anchors that stay still" callout. */
  durableAnchors?: string[];
};

export type RecurringTheme = {
  slug: string;
  name: string;
  chapter: string;
  qCount: number;
  yearsAppearing: number;
  drillSubtopics: string[];
  /** Compact one-line shape note for the recurring-themes table. */
  oneLineShape: string;
};

export type OccasionalTheme = {
  slug: string;
  name: string;
  chapter: string;
  qCount: number;
  yearsAppearing: number;
  drillSubtopics: string[];
};

// ─── ANCHOR THEMES (5+ year recurrence · 86 q · ~5 q/paper) ─────────────

export const ANCHOR_THEMES: AnchorTheme[] = [
  {
    slug: "india-bilateral-relations",
    name: "India ↔ partner-country agreements",
    chapter: "International Affairs and Relations",
    qCount: 15,
    yearsAppearing: 5,
    qPerYearWhenPresent: 3.0,
    drillSubtopics: ["India's Foreign Policy and Bilateral Relations"],
    shape:
      'Variants of "In [month/year] India entered an agreement / scrapped a regime / hosted a visit with [country] to..." plus "[place in the news] is located in / borders [country]". The lever is always a specific recent India-↔-partner event — the question rotates with the news cycle.',
    checklist: [
      "State visits by/to Indian leaders in the past 12 months",
      "Major bilateral agreements or MoUs signed (defence, trade, connectivity, energy)",
      "India-neighbour developments — Bangladesh, Sri Lanka, Maldives, Nepal, Bhutan, Myanmar, China, Pakistan",
      "India ↔ major-power milestones — USA, Russia, France, UK, Japan, EU, GCC",
      "Indian-hosted bilateral / multilateral summits this year",
      "Places-in-news (foreign cities, islands, dam / canal sites) — know which country they're in",
    ],
    durableAnchors: [
      "India's 7 land-border neighbours: Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, Afghanistan (PoK)",
      "India's maritime neighbours: Sri Lanka, Maldives",
      "SAARC vs BIMSTEC vs ASEAN — India is member of SAARC + BIMSTEC; ASEAN observer/partner",
    ],
  },
  {
    slug: "cricket-tournaments-players",
    name: "Cricket — tournaments, winners, players in news",
    chapter: "Sports",
    qCount: 13,
    yearsAppearing: 8,
    qPerYearWhenPresent: 1.6,
    drillSubtopics: ["Cricket — Records, Tournaments and Players"],
    shape:
      'Variants of "Who won the [tournament] in [recent year]?" / "Consider the following statements about [Indian cricketer]" / "Identify the cricketer who [recently retired / set a record / joined ICC Hall of Fame]". The most consistently-appearing CA theme — 8 of 10 years.',
    checklist: [
      "ICC men's tournament winners in the past 24 months (T20 WC, ODI WC, Test Championship, Champions Trophy)",
      "Latest IPL champion + winning captain + Orange / Purple Cap holders",
      "Domestic trophy holders — Ranji, Syed Mushtaq Ali, Vijay Hazare, Duleep",
      "Recent women's cricket milestones — Asia Cup, T20 / ODI WC",
      "Indian cricketers' career milestones in past 12 months — retirements, captaincy, records",
    ],
    durableAnchors: [
      "ICC tournament cycle: T20 WC every 2 yrs, ODI WC every 4 yrs",
      "ICC Hall of Fame Indians: Bishan Bedi, Kapil Dev, Anil Kumble, Sachin Tendulkar, Rahul Dravid, Vinoo Mankad, Sunil Gavaskar, Diana Edulji, Virender Sehwag",
      'Domestic trophy ↔ format: Ranji (multi-day), Mushtaq Ali (T20), Vijay Hazare (List A), Duleep (zone-based first-class)',
    ],
  },
  {
    slug: "military-exercises",
    name: "Military exercises ↔ partner country",
    chapter: "Defence and Military Exercises",
    qCount: 13,
    yearsAppearing: 5,
    qPerYearWhenPresent: 2.6,
    drillSubtopics: ["Military Exercises — Bilateral and Multilateral"],
    shape:
      'Variants of "Exercise [name] is a joint exercise between India and..." / "[Edition] of [exercise] was held in [city / country]" / list-matching 4 exercise names to 4 countries. Specific exercises rotate every year — almost zero name-level repetition across papers — but the SHAPE recurs.',
    checklist: [
      "India's standing bilateral exercises by partner — USA: Yudh Abhyas + Vajra Prahar + Tarkash + Tiger Triumph; Russia: INDRA series; France: Garuda + Varuna + Shakti; UK: Indra Dhanush + Konkan; Japan: JIMEX + Dharma Guardian; Australia: AUSINDEX",
      "Smaller-neighbour exercises — Bangladesh: Sampriti; Sri Lanka: Mitra Shakti; Nepal: Surya Kiran; Maldives: Ekuverin; Singapore: SIMBEX",
      "NEW exercise editions or NEW exercise names announced this year (track defence-ministry press releases)",
      "Multilateral exercises involving India — Malabar (US-IN-JP-AU), MILAN (Indian Navy hosted, ~50 nations), Cobra Gold (observer)",
      "Recently-concluded editions and their hosting country / city",
    ],
    durableAnchors: [
      "Tri-service vs single-service: Yudh Abhyas (Army), Varuna (Navy), Garuda (Air Force); Sea Vigil / TROPEX are India-only",
      "Malabar started bilateral US-IN, expanded to US-IN-JP (2015), then US-IN-JP-AU (2020)",
    ],
  },
  {
    slug: "governance-policy-uts",
    name: "Governance, policy and UT reform",
    chapter: "Government Schemes, Policy and Governance",
    qCount: 12,
    yearsAppearing: 7,
    qPerYearWhenPresent: 1.7,
    drillSubtopics: ["Governance, Policy and Union Territory Reform"],
    shape:
      'Variants of "[Policy / Act / Bill / Amendment] is associated with..." / "Recently the Government of India announced..." / multi-statement T/F about a policy. Appears in 7 of 10 years — the most stable Govt-Schemes theme.',
    checklist: [
      "Major Acts passed in the current Parliament session (PIB + Ministry of Law releases)",
      "Recent Constitutional Amendments (104th onwards) and what each one does",
      "Recent Supreme Court directives that reshaped policy",
      "Recent Centrally-Sponsored vs Central-Sector scheme rebrandings / mergers",
      "Recent administrative reforms — UT boundary changes, state special status, language / classical status grants",
    ],
    durableAnchors: [
      "8 UTs: Delhi, Puducherry, J&K, Ladakh, Chandigarh, A&N Islands, Lakshadweep, Dadra & Nagar Haveli + Daman & Diu",
      "Article 370 abrogation: 5 Aug 2019; J&K + Ladakh as UTs from 31 Oct 2019",
      "Constitutional Amendment numbering — even number = states & UTs reorg; cross-check before guessing year",
    ],
  },
  {
    slug: "schemes-health-education-welfare",
    name: "Health, education and welfare schemes",
    chapter: "Government Schemes, Policy and Governance",
    qCount: 12,
    yearsAppearing: 6,
    qPerYearWhenPresent: 2.0,
    drillSubtopics: ["Health, Education and Welfare Schemes"],
    shape:
      'Variants of "[Scheme name] is associated with [purpose / ministry]" / "[Tagline / motto] is the motto of which scheme?" / multi-statement T/F on a recently-launched scheme. Mottoes are tested directly — "Not me, but you", "Fitness ka dose, aadha ghanta roz", "Saansad Adarsh Gram".',
    checklist: [
      "Top 5 NEW schemes from each major ministry in past 12 months — Health & Family Welfare, Education, Women & Child Dev, Rural Dev, Skill Dev, Tribal Affairs",
      "Recent scheme rebrandings, mergers, or platform integrations (e.g. eSanjeevani with Ayushman Bharat)",
      "Mottoes and taglines of major schemes (these ARE asked directly)",
      "Operating ministry of each flagship scheme — confusion between Centre-implemented vs State-run is a common distractor",
      "Recent expansions of coverage (district count, beneficiary count, age bracket changes)",
    ],
    durableAnchors: [
      "Flagship-by-ministry quick recall: Ayushman Bharat (Health) · MGNREGA (Rural Dev) · Skill India / PMKVY (Skill Dev) · Beti Bachao Beti Padhao (WCD) · Ujjwala (Petroleum) · PMAY (Housing/Rural Dev) · Swachh Bharat (Jal Shakti / MoHUA)",
    ],
  },
  {
    slug: "international-organisations",
    name: "International organisations and multilateral bodies",
    chapter: "International Affairs and Relations",
    qCount: 8,
    yearsAppearing: 6,
    qPerYearWhenPresent: 1.3,
    drillSubtopics: ["International Organizations and Multilateral Bodies"],
    shape:
      'Variants of "The headquarters of [organisation] is located at..." / "Which one is NOT a member of [group]?" / "[Recently-appointed head] is associated with..." / structural-fact statements about UN agencies, BRICS, NATO etc.',
    checklist: [
      "Latest appointments at major UN bodies — Secretary-General, WHO DG, IMF MD, WB President, UNCTAD, WTO DG",
      "Recent NATO + EU + ASEAN membership shifts (e.g. ASEAN's 11th member in 2025)",
      "Latest BRICS / G20 / G7 / SCO / SAARC / BIMSTEC / QUAD / I2U2 outcomes and member shifts",
      "Latest UNESCO World Heritage / Creative City / Intangible Cultural Heritage additions",
      "Latest IMF / World Bank index rankings (Ease of Doing Business, Logistics Performance, etc.)",
    ],
    durableAnchors: [
      "UN agency HQs — WHO (Geneva), UNESCO (Paris), ILO (Geneva), WMO (Geneva), FAO (Rome), IMF + WB (Washington DC), UNICEF (NY), IAEA (Vienna)",
      "G7 nations: USA, UK, Canada, France, Germany, Italy, Japan (the EU is a non-enumerated participant)",
      "UN Security Council permanent members: USA, UK, France, Russia, China (the P5)",
      "BRICS expanded 2024–25 with Egypt, Ethiopia, Iran, UAE (Saudi Arabia membership status was under negotiation)",
    ],
  },
  {
    slug: "space-technology",
    name: "Space technology and astronomy",
    chapter: "Science and Technology",
    qCount: 5,
    yearsAppearing: 5,
    qPerYearWhenPresent: 1.0,
    drillSubtopics: ["Space Technology and Astronomy"],
    shape:
      'Variants of "[ISRO mission name] is associated with..." / "Which one is the [launch vehicle / orbiter / lander]?" / identification of a recent mission\'s scientific objective. Clockwork ~1 q every year — never skipped.',
    checklist: [
      "ISRO missions launched in the past 12 months + planned next-6-month launches",
      "Major foreign space milestones — NASA Artemis cycle, ESA / JAXA / CNSA major missions",
      "Notable astronomical phenomena visible from India (eclipses, conjunctions, comet apparitions)",
      "Private Indian space-launch milestones — Skyroot, Agnikul, Pixxel",
    ],
    durableAnchors: [
      "ISRO launch vehicles: PSLV (workhorse), GSLV (cryogenic), SSLV (small-sat), LVM3 (heavy-lift / Chandrayaan-3 + Gaganyaan)",
      "Chandrayaan-1 (2008) found water; Chandrayaan-2 (2019) lander crashed; Chandrayaan-3 (2023) soft-landed on south pole — first ever",
      "Mangalyaan (2013) — first interplanetary at first attempt; Aditya-L1 (2023) — solar observatory at L1",
      "Gaganyaan target window: first crewed mission planned 2026–27",
    ],
  },
  {
    slug: "other-sports-personalities",
    name: "Other sports — medallists and personalities",
    chapter: "Sports",
    qCount: 8,
    yearsAppearing: 5,
    qPerYearWhenPresent: 1.6,
    drillSubtopics: ["Other Sports and Personalities"],
    shape:
      'Variants of "Who won the [non-cricket sport event]?" / "[Person] is associated with which sport?" / identification of medallists at recent Olympic / Asian / Commonwealth Games.',
    checklist: [
      "Recent Olympic / Asian Games / Commonwealth Games medal-tally + Indian medallists by event",
      "Recent Khel Ratna / Arjuna / Dronacharya / Major Dhyan Chand award recipients",
      "Latest world-cup outcomes in non-cricket sports — hockey, badminton, wrestling, athletics, archery, shooting, kabaddi",
      "Recent retirements, debuts, or coaching changes for major Indian athletes",
    ],
    durableAnchors: [
      "Khel Ratna renamed to Major Dhyan Chand Khel Ratna in 2021",
      "Norman Pritchard (1900): India's first Olympic medallist (2 silver, athletics)",
      "KD Jadhav (1952): India's first individual Olympic medal (wrestling)",
      "Abhinav Bindra (2008): India's first individual Olympic gold (10m air rifle)",
    ],
  },
];

// ─── RECURRING THEMES (3–4 year recurrence · 74 q · ~3 q/paper) ──────────

export const RECURRING_THEMES: RecurringTheme[] = [
  {
    slug: "civilian-awards-institutions",
    name: "Civilian awards, honours and educational institutions",
    chapter: "Awards, Honours, Books and Culture",
    qCount: 7,
    yearsAppearing: 4,
    drillSubtopics: ["Civilian Awards, Honours and Educational Institutions"],
    oneLineShape:
      "Recent Padma / Bharat Ratna / gallantry-award recipients · new IIT / IIIT / AIIMS / Central University announcements",
  },
  {
    slug: "books-literature-authors",
    name: "Books, literature and authors",
    chapter: "Awards, Honours, Books and Culture",
    qCount: 5,
    yearsAppearing: 4,
    drillSubtopics: ["Books, Literature and Authors"],
    oneLineShape:
      "Recent author release · Nobel / Booker / Jnanpith winner · book ↔ author pair identification",
  },
  {
    slug: "indian-navy-vessels",
    name: "Indian Navy — ships, vessels and naval policy",
    chapter: "Defence and Military Exercises",
    qCount: 5,
    yearsAppearing: 4,
    drillSubtopics: ["Indian Navy — Ships, Vessels and Naval Policy"],
    oneLineShape:
      'INS [name] is a [destroyer / submarine / aircraft carrier / patrol vessel] · naval policy announcement reference',
  },
  {
    slug: "defence-awards-institutions",
    name: "Defence awards, books and institutions",
    chapter: "Defence and Military Exercises",
    qCount: 7,
    yearsAppearing: 3,
    drillSubtopics: ["Defence Awards, Books and Institutions"],
    oneLineShape:
      "Gallantry-award recent recipient · senior service appointment · defence institution / academy reference",
  },
  {
    slug: "world-leaders-elections",
    name: "World leaders, elections and global events",
    chapter: "International Affairs and Relations",
    qCount: 6,
    yearsAppearing: 4,
    drillSubtopics: ["World Leaders, Elections and Global Events"],
    oneLineShape:
      "Recently-elected President of [country] · recent death of a major leader · ongoing crisis or coup reference",
  },
  {
    slug: "indian-economy-geography",
    name: "Indian economy, geography and resources",
    chapter: "National Events, Persons and India General Knowledge",
    qCount: 6,
    yearsAppearing: 4,
    drillSubtopics: ["Indian Economy, Geography and Resources"],
    oneLineShape:
      "India ranked X in [recent global index] · large-project (dam / canal / mine) news reference",
  },
  {
    slug: "defence-procurement",
    name: "Defence procurement and cooperation",
    chapter: "Defence and Military Exercises",
    qCount: 4,
    yearsAppearing: 3,
    drillSubtopics: ["Defence Procurement and Cooperation"],
    oneLineShape:
      "India inducted / signed [deal] with [country] for [equipment] · recent capability acquisition",
  },
  {
    slug: "national-days-observances",
    name: "National days, festivals and observances",
    chapter: "National Events, Persons and India General Knowledge",
    qCount: 5,
    yearsAppearing: 3,
    drillSubtopics: ["National Days, Festivals and Observances"],
    oneLineShape:
      "Theme of [UN observance day / Indian national day / annual festival] in [recent year]",
  },
  {
    slug: "national-institutions-milestones",
    name: "National institutions and milestones",
    chapter: "National Events, Persons and India General Knowledge",
    qCount: 4,
    yearsAppearing: 3,
    drillSubtopics: ["National Institutions, Milestones and History"],
    oneLineShape:
      "Recent centenary / golden-jubilee of [institution] · institutional reorganisation reference",
  },
  {
    slug: "climate-change-summits",
    name: "Climate change and summits",
    chapter: "Environment, Ecology and Energy",
    qCount: 3,
    yearsAppearing: 3,
    drillSubtopics: ["Climate Change and Summits"],
    oneLineShape:
      "Theme / host / outcome of COP [number] · climate-framework or pledge identification",
  },
  {
    slug: "ramsar-wetlands",
    name: "Ramsar sites, wetlands and protected areas",
    chapter: "Environment, Ecology and Energy",
    qCount: 3,
    yearsAppearing: 3,
    drillSubtopics: ["Ramsar Sites, Wetlands and Protected Areas"],
    oneLineShape:
      "Recently-designated Ramsar site ↔ state · tiger reserve / biosphere ↔ state pairing",
  },
  {
    slug: "it-railway-safety",
    name: "Information technology and railway safety",
    chapter: "Science and Technology",
    qCount: 3,
    yearsAppearing: 3,
    drillSubtopics: ["Information Technology and Railway Safety"],
    oneLineShape:
      'KAVACH / Bharat OS / [tech-safety-system name] is associated with [agency / purpose]',
  },
  {
    slug: "international-summits-forums",
    name: "International summits, initiatives and forums",
    chapter: "International Affairs and Relations",
    qCount: 4,
    yearsAppearing: 3,
    drillSubtopics: ["International Summits, Initiatives and Forums"],
    oneLineShape:
      "Theme / host city of [G20 / BRICS / QUAD / ASEAN-India / Voice of Global South] summit in [recent year]",
  },
  {
    slug: "infrastructure-transport-schemes",
    name: "Infrastructure, transport and cultural schemes",
    chapter: "Government Schemes, Policy and Governance",
    qCount: 6,
    yearsAppearing: 3,
    drillSubtopics: ["Infrastructure, Transport and Cultural Schemes"],
    oneLineShape:
      "[Connectivity project / cultural-revival scheme] is associated with [ministry / corridor / state]",
  },
  {
    slug: "indian-art-architecture",
    name: "Indian art, architecture and cultural practices",
    chapter: "Awards, Honours, Books and Culture",
    qCount: 3,
    yearsAppearing: 3,
    drillSubtopics: ["Indian Art, Architecture and Cultural Practices"],
    oneLineShape:
      "[Art form / cultural practice / festival] is associated with [state / community / GI tag]",
  },
  {
    slug: "unesco-recognitions",
    name: "UNESCO recognitions and cultural heritage",
    chapter: "Awards, Honours, Books and Culture",
    qCount: 3,
    yearsAppearing: 3,
    drillSubtopics: ["UNESCO Recognitions and Cultural Heritage"],
    oneLineShape:
      "Recently-added UNESCO World Heritage Site / Creative City / Intangible Cultural Heritage element",
  },
];

// ─── OCCASIONAL THEMES (1–2 year recurrence · 20 q · drill if time permits) ─

export const OCCASIONAL_THEMES: OccasionalTheme[] = [
  {
    slug: "tennis",
    name: "Tennis",
    chapter: "Sports",
    qCount: 2,
    yearsAppearing: 2,
    drillSubtopics: ["Tennis"],
  },
  {
    slug: "health-tech-anniversaries",
    name: "Health technology, science awards and anniversaries",
    chapter: "Science and Technology",
    qCount: 4,
    yearsAppearing: 2,
    drillSubtopics: ["Health Technology, Science Awards and Anniversaries"],
  },
  {
    slug: "drdo-marine-tech",
    name: "DRDO, defence and marine technology",
    chapter: "Science and Technology",
    qCount: 4,
    yearsAppearing: 2,
    drillSubtopics: ["DRDO, Defence and Marine Technology"],
  },
  {
    slug: "nuclear-renewable-energy",
    name: "Nuclear and renewable energy",
    chapter: "Science and Technology",
    qCount: 2,
    yearsAppearing: 2,
    drillSubtopics: ["Nuclear and Renewable Energy"],
  },
  {
    slug: "environmental-campaigns-disasters",
    name: "Environmental campaigns, disasters and energy",
    chapter: "Environment, Ecology and Energy",
    qCount: 3,
    yearsAppearing: 2,
    drillSubtopics: ["Environmental Campaigns, Disasters and Energy"],
  },
  {
    slug: "wildlife-conservation",
    name: "Wildlife conservation and species",
    chapter: "Environment, Ecology and Energy",
    qCount: 2,
    yearsAppearing: 2,
    drillSubtopics: ["Wildlife Conservation and Species"],
  },
  {
    slug: "government-events-reports",
    name: "Government events, reports and announcements",
    chapter: "Government Schemes, Policy and Governance",
    qCount: 3,
    yearsAppearing: 2,
    drillSubtopics: ["Government Events, Reports and Announcements"],
  },
];

// ─── COPY BLOCKS (prose used on the page) ─────────────────────────────────

/** The half-life directive — top callout under the hero. The single most
 *  important sentence on the page is the first one: drill the bank for
 *  SHAPE, not for FACTS. */
export const HALF_LIFE_NOTICE = {
  headline: "Drill this bank for SHAPE, not for FACTS",
  body: [
    "Of every NDA Current Affairs question that mentions a year explicitly, 90% reference an event within 12 months of the paper. Specific exercises, schemes, and award winners almost never repeat across years — every paper asks about THIS YEAR's new content.",
    "So the bank's role here is calibrating what GETS asked, not what to MEMORISE. The themes below are the recurring question shapes. Harvest the actual facts from a yearly current-affairs compendium of your choice.",
  ],
  callouts: [
    {
      label: "What the bank gives you",
      body: "Question shape calibration. 31 stable themes that recur across years even when specific facts rotate.",
    },
    {
      label: "What you bring yourself",
      body: "THIS YEAR's facts — fresh from a yearly compendium, ministry press releases, or a news app. Don't memorise the bank's historical answers.",
    },
  ],
};

/** Test-day plan + per-strand approach, rendered as a structured callout
 *  near the end of the page. */
export const TEST_DAY_PLAN = {
  headline: `Target ${OVERVIEW.targetMarks} of ~${OVERVIEW.maxMarksPerPaper} marks`,
  attemptCount: 7,
  skipCount: 3,
  bullets: [
    {
      label: "Attempt ~7 of 10 with confidence",
      body: "If you've harvested this year's facts against the 8 anchor themes, you'll recognise the shape of ~7 questions per paper. Attempt those.",
    },
    {
      label: "Skip 3 you've never seen",
      body: "Niche-person obituaries, obscure book titles, single-event observances are the year-specific noise — ~30 q (17% of bank) live in 1–2 year occasional themes. Don't guess.",
    },
    {
      label: "Time budget: ~1 minute per question",
      body: "CA is a 10-minute block in a 150-minute GAT. Don't let an unfamiliar stem pull time from the larger PART A sections (Geography 76, History 56, Polity 20 max marks).",
    },
    {
      label: "Watch the multi-statement trap",
      body: "About 20% of CA stems are 'Consider the following statements about X' with 2–4 sub-claims. Judge each independently and use elimination — partial credit / universal-claim distractors are common.",
    },
  ],
};
