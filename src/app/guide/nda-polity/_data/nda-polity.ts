/**
 * Static content + numbers for the /guide/nda-polity route.
 *
 * Pulled from the live NDA Polity PUBLIC bank. Snapshot date is
 * `OVERVIEW.asOf`; refresh per the post-upload ritual.
 *
 * Template B variant 5 (second use of the tier-style strand axis, after
 * History) — chosen because:
 *
 *   - SMALLEST GAT section we've guided (90 q · 4 ch · ~5 q/paper, range
 *     2–10). Per-paper q-count is tiny — strategic-priority labels
 *     (Cornerstone / Foundation / Specialist) are more actionable than
 *     skill-bucket labels (Recall / Apply / Verify) when there are only
 *     4 chapters and you can name-drop each one in the strand title.
 *
 *   - %HARD is borderline non-flat: 13.6 / 15.0 / 16.7 / 41.7. Only World
 *     Polity is a real outlier (41.7%); the other 3 cluster 13–17%. Pure
 *     Template B's "≤2 chapters > 15% HARD" gate is borderline-passed
 *     (Govt Structure 16.7 + World Polity 41.7), but the outlier chapter
 *     (World Polity) is small (12 q) and its HARD concentrates in UN 60%
 *     + Democracy 40% — both 5-q subtopics, no cherry-pick lever.
 *     Template C's per-chapter DrillPosture overlay can't add signal
 *     against a 12-q chapter where the HARD pool IS the chapter.
 *
 *   - Cross-chapter topical lever max is article-citation 28 q × 3 ch
 *     (fails Template A's 40 q × ≥4 ch gate). Election 22 q × 4 ch also
 *     fails the 40-q threshold. Principles axis is dead.
 *
 *   - Execution-mode probe shows PARTIAL partition — multi-statement is
 *     4.5% (FR/DPSP) / 15% (IC) / 30.6% (Govt) / 50% (World). FR/DPSP and
 *     World Polity sit at opposite extremes but Govt Structure has BOTH
 *     heavy multi-statement (30.6%) AND heavy single-fact recall (69%) —
 *     execution mode doesn't cleanly partition. So a Biology/Geography-
 *     style Recall/Apply/Verify split would force Govt Structure to live
 *     in a single bucket it doesn't fit. Tier-style is the cleaner seam.
 *
 *   - Strand split = TIER-STYLE by strategic priority, like History but
 *     with the **third tier INVERTED**: where History's Quick-Win is the
 *     smallest AND easiest chapter (World History 41 q · 20% HARD),
 *     Polity's third tier is the smallest BUT HARDEST chapter (World
 *     Polity 12 q · 42% HARD). Re-labelled "Specialist Wildcard" to
 *     capture the small-and-high-stakes profile (vs History's
 *     small-and-easy):
 *
 *       Cornerstone        — Government Structure   36 q · 40% · 16.7% HARD
 *       Foundation Recall  — Indian Constitution +
 *                            FR/DPSP/Local Gov      42 q · 47% · ~14% HARD avg
 *       Specialist Wildcard — World Polity          12 q · 13% · 41.7% HARD
 *                                                  + 50% multi-statement
 *
 *     Cornerstone gets its own strand because Government Structure carries
 *     the most absolute HARDs (6 of 17 bank-wide) AND is 40% of bank.
 *     Foundation Recall bundles Indian Constitution + FR/DPSP — the two
 *     recall-heavy "constitutional content" chapters (Articles, FRs, DPSP,
 *     Amendments, Parts/Schedules). Specialist Wildcard is World Polity —
 *     small chapter but multi-statement-dominant abstract theory + UN
 *     reference that demands its own prep mode.
 *
 *   - Polity-specific subject artefact = /reference-tables (analogue of
 *     vocab-families / formulas / common-compounds / Bio+Geo reference-
 *     tables / History timeline-and-pairs). MULTI-DOMAIN: 4 themed
 *     clusters — Key Articles ↔ Subject (28 q reference article numbers;
 *     bank's #1 cross-chapter lever); Constitutional Amendments ↔ Year ↔
 *     Theme; Constitutional Bodies ↔ Function ↔ Article; Parts &
 *     Schedules ↔ Content. Rendered via new PolityReferenceTables
 *     component (8th multi-domain parallel after Bio+Geo+History).
 *
 *   - Trends HEADLINE: same framing as Chemistry/Biology/Geography/History
 *     — paper has NOT consistently hardened. %HARD bounces 0% (2020 + 2021
 *     small samples) → 50% (2026 NDA-1 spike) → 44% (2017) — no monotonic
 *     trajectory. Noisy partly because of small per-paper samples (avg
 *     5 q/paper). Drill all 10 years equally. SECONDARY callout: Govt
 *     Structure spiked in 2026 (7 q in one paper — biggest single-chapter-
 *     in-one-paper share); 2021 was the FR/DPSP outlier year (7 q).
 *
 *   - Trap genre = PAIRED-FACT SWAPS (Article↔subject, body↔function,
 *     reformer↔reform, Amendment↔year — same shape as Biology + History
 *     Recall genre) + PROCEDURAL-CONFUSION (Money Bill vs Finance Bill,
 *     Presidential vs Governor's discretion, original vs appellate
 *     jurisdiction, Council vs Commission — Polity-specific institutional
 *     procedure distinctions) + MULTI-STATEMENT VERIFY (partial-credit,
 *     universal-claim, match-list-misalignment — same shape as History
 *     Verify genre). Bucketed by GENRE so the fix maps to the trap.
 */

export type GuideRoute = {
  slug: string; // path segment after /guide/nda-polity (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes under /guide/nda-polity, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How NDA Polity actually works — what the 90-question bank reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Cornerstone, Foundation Recall, Specialist Wildcard — three chapter-tier strands matched to NDA Polity's bank weights. Per-chapter must-drill subtopics and a ~15-hour time plan for the smallest GAT section.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "4 playbooks — one per chapter. The dominant subtopic shape, the traps, and the worked PYQs you need.",
  },
  {
    slug: "reference-tables",
    label: "Reference tables",
    blurb:
      "Single-page Polity reference. ~80 entries across 4 themed clusters — Key Articles ↔ Subject, Constitutional Amendments ↔ Year ↔ Theme, Constitutional Bodies ↔ Function ↔ Article, Parts ↔ Schedules ↔ Content. Active-recall the morning of the exam.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "How NDA Polity shifted 2017→2026 — paper has NOT consistently hardened (bounces 0% to 50% with no trajectory). 2026 NDA-1 was the hardest paper, 2020/2021 the easiest. FR/DPSP spiked in 2021 (7 q), Govt Structure spiked in 2026 (7 q).",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "Distractor shapes NDA Polity reuses — Article↔subject swap, Amendment↔year confusion, body↔function swap, Money Bill vs Finance Bill, original vs appellate jurisdiction, multi-statement partial-credit.",
  },
];

export type Overview = {
  totalQ: number;
  /** GAT papers covered. NDA Polity is asked on NDA-1 + NDA-2 each year
   *  except 2020 (COVID-cancelled NDA-2) and 2026 NDA-2 (not yet held). */
  papers: number;
  yearsCovered: number;
  chapters: number;
  /** Playbook count — 1 per chapter. */
  playbooks: number;
  /** Reference table entries indexed on /reference-tables. */
  referenceFacts: number;
  difficulty: { easy: number; moderate: number; hard: number };
  asOf: string; // ISO date
};

/** Snapshot of the bank's shape as of the date below.
 *  SQL-derived 2026-05-19 — full-bank tally. */
export const OVERVIEW: Overview = {
  totalQ: 90,
  // 2017–2025: 2 papers each except 2020 (1, NDA-2 cancelled) = 17 papers.
  // 2026: 1 paper (NDA-1 only). Total: 18.
  papers: 18,
  yearsCovered: 10,
  chapters: 4,
  playbooks: 4,
  // 32 Articles + 18 Amendments + 19 Bodies + ~11 Parts/Schedules = ~80
  referenceFacts: 80,
  // EASY 32, MODERATE 41, HARD 17 (≈19% HARD bank-wide).
  difficulty: { easy: 32, moderate: 41, hard: 17 },
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

/** 4 NDA Polity chapters, sorted by question count descending. SQL-derived
 *  against the 90-q PUBLIC bank as of OVERVIEW.asOf. Numbers in `focus` may
 *  drift as new papers land — refresh in lockstep. */
export const CHAPTER_TABLE: ChapterRow[] = [
  {
    chapter:
      "Government Structure — Parliament, Judiciary and Constitutional Bodies",
    qCount: 36,
    pctTotal: 40.0,
    pctHard: 17,
    focus:
      "Constitutional Bodies and Offices (21 · 10% HARD — chapter giant; CAG, ECI, UPSC, Attorney-General, Lokpal, NHRC, Finance Commission — bodies' powers, removal, appointment), Parliament — Composition, Procedures and Powers (10 · 30% HARD — densest %HARD subtopic; Lok Sabha/Rajya Sabha composition, Money/Finance Bills, sittings, committees, Speaker), Government Departments and Schemes (3 · 0% HARD — quick-win pocket; ministries, GST Council), Judiciary — Supreme Court and High Courts (2 · 50% HARD — small but HARD-heavy; jurisdictions, common HCs, appointments).",
  },
  {
    chapter: "Fundamental Rights, DPSP and Local Governance",
    qCount: 22,
    pctTotal: 24.4,
    pctHard: 14,
    focus:
      "Electoral Systems (9 · 22% HARD — densest %HARD subtopic; political party recognition, FRs Article-numbers, Fifth Schedule scope, 11th Schedule devolved subjects), Fundamental Rights, DPSP and Duties (8 · 0% HARD — easy marks pocket; FR articles 12–35, DPSP 36–51, FD 51A, novel-DPSP attribution, justiciable vs non-justiciable), Local Self-Government and Panchayati Raj (5 · 20% HARD — Article 243G powers, District Planning Committee, 1882 Magna Carta of LSG, Mehta/Ashok/Singhvi committees).",
  },
  {
    chapter: "Indian Constitution — Making, Foundation and Amendments",
    qCount: 20,
    pctTotal: 22.2,
    pctHard: 15,
    focus:
      "Constitutional Amendments (10 · 20% HARD — chapter giant; 42nd Amendment 1976 'mini-Constitution', 73rd/74th PRI, 35th Sikkim, 52nd Anti-Defection, 86th RTE, 101st GST, Article 51A Fundamental Duties via 42nd 1976, Article 352 Emergency), Features, Parts and Schedules of Constitution (4 · 25% HARD — Part IX-A Municipalities, Part IX-B Cooperatives, 10th Schedule Anti-Defection, sources of borrowed features), Making of Constitution and Constitutional History (3 · 0% HARD — Drafting Committee, Objective Resolution 13 Dec 1946 by Nehru, BN Rau + SN Mukherjee civil-servant assistants), Federal Structure — States, UTs and Finance (3 · 0% HARD — 28+8 total, Article 371A Nagaland special provisions, Finance Commission 16th).",
  },
  {
    chapter: "World Polity, Democracy and International Relations",
    qCount: 12,
    pctTotal: 13.3,
    pctHard: 42,
    focus:
      "Democracy and Political Theory (5 · 40% HARD — universal adult franchise chronology USA→Japan→Sri Lanka→India, democracy features, Lincoln's definition, US Declaration of Independence rights), United Nations and Global Institutions (5 · 60% HARD — densest %HARD subtopic in bank; UNSC non-permanent member elections + composition, UN Peacekeeping Operations ↔ countries pairs UNMOGIP UNFICYP UNMIK UNTSO UNDOF, UN Declarations chronology, SDG goals), India's Foreign Policy — Panchsheel (2 · 0% HARD — easy marks pocket; 5 principles of Panchsheel 1954, mutual non-aggression, peaceful coexistence). Lightest chapter by size, HARDEST %HARD — Specialist Wildcard pocket.",
  },
];
