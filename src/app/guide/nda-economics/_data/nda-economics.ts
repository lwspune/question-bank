/**
 * Static content + numbers for the /guide/nda-economics route.
 *
 * Pulled from the live NDA Economics PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * SINGLE-PAGE LANDING — no /strategy /playbooks /trends /traps /reference
 * sub-routes. Bank is 24 q · 1 chapter · 3 subtopics · 1.5 q/paper · ~6 max
 * marks/paper. At this scale, the bank IS the framework; a multi-route guide
 * would be parody. The honest stance — drill the bank, memorise the Plan
 * timeline, accept the ~6-mark cap — fits on one page.
 *
 * The one reference artefact worth surfacing is the Five Year Plans timeline:
 * 18 of 24 PUBLIC questions live in the "Five Year Plans and Indian Planning"
 * subtopic, and the dominant question shape is paired-fact swap (Plan ↔
 * objective, Plan ↔ year range, Plan ↔ strategist). The timeline below is
 * the single-page recall anchor for that 75% of bank.
 *
 * Override of the same-day defer entry (2026-05-19 post-Polity) — user opted
 * for a thin one-page artefact over no-ship, with explicit framing of the
 * strategic cap rather than the parody headline numbers.
 */

export type Overview = {
  totalQ: number;
  /** GAT papers covered. Economics appears on most NDA-1 + NDA-2 papers;
   *  some papers carry 1 q, others up to 3. */
  papers: number;
  yearsCovered: number;
  /** Avg q per paper across the window. */
  avgQPerPaper: number;
  /** Max marks per paper (paperQ × 4). */
  maxMarksPerPaper: number;
  chapters: number;
  subtopics: number;
  difficulty: { easy: number; moderate: number; hard: number };
  pctHard: number;
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below.
 *  SQL-derived 2026-05-19 — full-bank tally. */
export const OVERVIEW: Overview = {
  totalQ: 24,
  // 2017–2025 has near-uniform 2 papers/year (NDA-1 + NDA-2); 2020 missing
  // NDA-2; 2019 missing NDA-1; 2022 missing NDA-2; 2026 NDA-1 only.
  // 16 papers carry at least one Economics q in the live bank.
  papers: 16,
  yearsCovered: 10,
  avgQPerPaper: 1.5,
  maxMarksPerPaper: 6,
  chapters: 1,
  subtopics: 3,
  difficulty: { easy: 5, moderate: 9, hard: 10 },
  pctHard: 41.7,
  asOf: "2026-05-19",
};

export type SubtopicRow = {
  subtopic: string;
  qCount: number;
  /** % of bank total (1 decimal). */
  pctTotal: number;
  /** % HARD within subtopic (rounded integer). */
  pctHard: number;
  /** What this subtopic tests, in one editorial line. */
  focus: string;
};

/** 3 NDA Economics subtopics, sorted by question count descending.
 *  SQL-derived against the 24-q PUBLIC bank as of OVERVIEW.asOf. */
export const SUBTOPIC_TABLE: SubtopicRow[] = [
  {
    subtopic: "Five Year Plans and Indian Planning",
    qCount: 18,
    pctTotal: 75.0,
    pctHard: 33,
    focus:
      "The dominant lever. Plan number ↔ objective, Plan ↔ year range, Plan ↔ strategist (Mahalanobis / Harrod–Domar), targets of the 12th Plan, Nehru–Mahalanobis strategy, Second Plan socialistic-pattern, Annual Plans 1966–69. Mostly paired-fact swap + multi-statement verify; some match-list.",
  },
  {
    subtopic: "Government Schemes — Agriculture and Livestock",
    qCount: 4,
    pctTotal: 16.7,
    pctHard: 50,
    focus:
      "Half-current-affairs: named schemes (National Livestock Mission sub-missions, Direct Tax Task Force 2017, Soil Health Card, PM-KISAN-style programmes). Content half-life is short — schemes named in older papers may have been renamed or merged. Drill what's in the bank; don't extrapolate.",
  },
  {
    subtopic: "International Trade and Finance",
    qCount: 2,
    pctTotal: 8.3,
    pctHard: 100,
    focus:
      "Both bank items are HARD year-anchored current-affairs (FDI cap in defence sector as of 2017, ODI ranking as of Nov 2020). Sample size too small to drill as technique — read both and move on.",
  },
];

export type PlanRow = {
  /** Plan number (1–12) or null for non-Plan periods (Annual Plans / Rolling Plan). */
  plan: number | null;
  /** Display label, e.g. "First Plan", "Annual Plans". */
  label: string;
  /** Year range, e.g. "1951–56". */
  years: string;
  /** One-line tagline / official objective. */
  tagline: string;
  /** Strategic emphasis or key fact that NDA has tested. Kept short. */
  emphasis: string;
};

/** The Indian Five Year Plans (1951 → 2017) plus the inter-Plan periods NDA
 *  references. Source: official Planning Commission / NITI Aayog records;
 *  cross-checked against the 18 Five-Year-Plan PYQs in the bank. Order is
 *  strictly chronological. Each row is 4 columns on the landing — drill this
 *  table the morning of the exam. */
export const FIVE_YEAR_PLANS: PlanRow[] = [
  {
    plan: 1,
    label: "First Plan",
    years: "1951–56",
    tagline: "Agriculture and irrigation priority",
    emphasis:
      "Harrod–Domar growth model. Foundation of community development programmes.",
  },
  {
    plan: 2,
    label: "Second Plan",
    years: "1956–61",
    tagline: "Socialistic pattern of society; heavy industry",
    emphasis:
      "Nehru–Mahalanobis strategy. PSU foundation (Bhilai, Rourkela, Durgapur steel plants). Imported capital goods.",
  },
  {
    plan: 3,
    label: "Third Plan",
    years: "1961–66",
    tagline: "Self-reliant and self-generating economy",
    emphasis:
      "Disrupted by 1962 Sino-Indian war, 1965 Indo-Pak war, drought. Failed targets.",
  },
  {
    plan: null,
    label: "Annual Plans (Plan Holiday)",
    years: "1966–69",
    tagline: "Three Annual Plans in place of a Fourth",
    emphasis:
      "Green Revolution introduced. Rupee devalued June 1966. NDA tests this gap as a paired-fact distinction from the regular Plans.",
  },
  {
    plan: 4,
    label: "Fourth Plan",
    years: "1969–74",
    tagline: "Growth with stability; progressive self-reliance",
    emphasis:
      "Garibi Hatao (Indira Gandhi). Bank nationalisation (1969). Drought + 1971 war strained execution.",
  },
  {
    plan: 5,
    label: "Fifth Plan",
    years: "1974–79",
    tagline: "Removal of poverty and attainment of self-reliance",
    emphasis:
      "Twenty-Point Programme. Terminated one year early (1978) by the Janata government.",
  },
  {
    plan: null,
    label: "Rolling Plan",
    years: "1978–80",
    tagline: "Janata government — annual + perspective rolling plan",
    emphasis:
      "Replaced the 5th Plan's final year. Abandoned when Congress returned to power in 1980.",
  },
  {
    plan: 6,
    label: "Sixth Plan",
    years: "1980–85",
    tagline: "Removal of poverty; economic liberalisation begins",
    emphasis:
      "Modernisation of technology. IRDP (Integrated Rural Development). Beginning of moves away from strict Nehruvian socialism.",
  },
  {
    plan: 7,
    label: "Seventh Plan",
    years: "1985–90",
    tagline: "Food, Work, Productivity",
    emphasis:
      "Rajiv Gandhi era. Anti-poverty programmes expanded. Computerisation push.",
  },
  {
    plan: null,
    label: "Annual Plans",
    years: "1990–92",
    tagline: "Political instability + balance-of-payments crisis",
    emphasis:
      "1991 economic crisis. LPG reforms (Liberalization, Privatization, Globalization) launched July 1991 under Narasimha Rao + Manmohan Singh.",
  },
  {
    plan: 8,
    label: "Eighth Plan",
    years: "1992–97",
    tagline: "Human resource development; LPG reforms entrenched",
    emphasis:
      "First Plan after liberalisation. Move from input-controlled to indicative planning.",
  },
  {
    plan: 9,
    label: "Ninth Plan",
    years: "1997–2002",
    tagline: "Growth with Social Justice and Equity",
    emphasis:
      "High priority to agriculture (along with the First Plan — paired-fact distinction NDA tests).",
  },
  {
    plan: 10,
    label: "Tenth Plan",
    years: "2002–07",
    tagline: "Faster, broad-based growth",
    emphasis:
      "Doubling of per-capita income in 10 years as a stated goal. Growth target 8%.",
  },
  {
    plan: 11,
    label: "Eleventh Plan",
    years: "2007–12",
    tagline: "Faster and More Inclusive Growth",
    emphasis:
      "Inclusive growth = expansion of opportunity for the poor. Higher social-sector spending.",
  },
  {
    plan: 12,
    label: "Twelfth Plan (final)",
    years: "2012–17",
    tagline: "Faster, More Inclusive and Sustainable Growth",
    emphasis:
      "LAST Indian Five Year Plan. 8% real GDP growth target (downgraded mid-Plan). 25 monitorable targets in education, health, infrastructure, environment.",
  },
];

/** Post-12th-Plan strategic framework — NITI Aayog replaced the Planning
 *  Commission in 2015. NDA hasn't tested this yet in the 24-q bank, but a
 *  reader looking at the timeline needs to know the Plan series ended. */
export const POST_PLAN_NOTE = {
  year: "2015",
  body: "NITI Aayog (National Institution for Transforming India) replaced the Planning Commission. The 12th Plan was the last Five Year Plan. NITI Aayog's planning horizon shifted to a 3-year Action Agenda, 7-year Strategy, and 15-year Vision document — not Plans.",
};
