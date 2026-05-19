/**
 * Playbook catalog for /guide/nda-polity/playbooks.
 *
 * 4 playbooks, 1:1 with chapters. Same shape as nda-physics + nda-chemistry
 * + nda-biology + nda-geography + nda-history (chapter-level playbooks, no
 * per-subtopic split) — Polity subtopics are 2–21 q range; the chapter is
 * the natural student unit and 4 playbooks beats fragmenting into 14 thin
 * pages.
 *
 * `bucket` tags map each playbook to one of the 3 strategy tier-strands
 * (cornerstone / foundation / specialist) defined in strategy.ts. This is
 * the SECOND use of tier-style strands within Template B variants (after
 * History) — strands are tier-style by strategic priority, not execution-
 * mode (see nda-polity.ts header for full rationale).
 *
 *   - cornerstone (36 q · 1 playbook): Government Structure — chapter is
 *                                      40% of bank AND carries most
 *                                      absolute HARDs (6 of 17 bank-wide).
 *                                      Drill all 4 subtopics.
 *   - foundation  (42 q · 2 playbooks): Indian Constitution + Fundamental
 *                                       Rights/DPSP/Local Governance —
 *                                       constitutional content recall,
 *                                       ~14% HARD avg, FR articles +
 *                                       Amendments + Parts/Schedules.
 *   - specialist  (12 q · 1 playbook): World Polity — smallest chapter
 *                                      BUT highest %HARD (42%) AND
 *                                      multi-statement-dominant (50%).
 *                                      Specialist Wildcard, opposite of
 *                                      History's small-and-easy Quick-Win
 *                                      pattern.
 *
 * Bucket sizes are CHAPTER-grouping totals (strategy.ts summary shows
 * 36/42/12 q). Execution modes (multi-statement 21 q, article-citation
 * 11 q) cut across all chapters but unevenly — they're a cross-cutting
 * overlay drilled via /reference-tables (Articles lever) and the traps
 * page (multi-statement Verify lever), not their own strand.
 */

export type PlaybookBucket = "cornerstone" | "foundation" | "specialist";

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
  // ─────── Cornerstone strand (1 playbook · 36 q) ───────
  {
    slug: "government-structure",
    name: "Government Structure — Parliament, Judiciary and Constitutional Bodies",
    summary:
      "36 q · 17% HARD — bank's largest chapter (40% of total) AND highest absolute HARD count (6 of 17 bank-wide). Constitutional Bodies and Offices (21 q · 10% HARD — chapter giant; CAG, ECI, UPSC, Attorney-General, Lokpal, Finance Commission), Parliament — Composition, Procedures and Powers (10 · 30% HARD — densest %HARD; Money/Finance Bills, Speaker, committees), Government Departments and Schemes (3 · 0% HARD), Judiciary — Supreme Court and High Courts (2 · 50% HARD — small but HARD-heavy; HC territorial jurisdictions). The cornerstone of NDA Polity prep — drill all 4 subtopics, target HARDs in Parliament + Judiciary.",
    chapter:
      "Government Structure — Parliament, Judiciary and Constitutional Bodies",
    subtopics: [
      "Constitutional Bodies and Offices",
      "Parliament — Composition, Procedures and Powers",
      "Government Departments and Schemes",
      "Judiciary — Supreme Court and High Courts",
    ],
    qCount: 36,
    pctHard: 17,
    bucket: "cornerstone",
  },

  // ─────── Foundation Recall strand (2 playbooks · 42 q) ───────
  {
    slug: "fundamental-rights-dpsp-local",
    name: "Fundamental Rights, DPSP and Local Governance",
    summary:
      "22 q · 14% HARD. Constitutional-content recall heavy. Electoral Systems (9 · 22% HARD — densest %HARD subtopic; political party recognition, FRs article-numbers, Fifth Schedule scope, 11th Schedule devolved subjects), Fundamental Rights, DPSP and Duties (8 · 0% HARD — guaranteed marks pocket; FRs articles 12–35, DPSP 36–51, FD 51A inserted by 42nd Amendment 1976, novel-DPSP attribution to Ambedkar, justiciable vs non-justiciable, 6 freedoms under 19), Local Self-Government and Panchayati Raj (5 · 20% HARD — Article 243G Panchayat powers, District Planning Committee Article 243ZD, 1882 Ripon resolution = Magna Carta of LSG, Mehta/Ashok Mehta/Singhvi committees). Drill /reference-tables → 'Key Articles ↔ Subject' cluster cold — the cluster carries ~12 of this chapter's named-fact anchors.",
    chapter: "Fundamental Rights, DPSP and Local Governance",
    subtopics: [
      "Electoral Systems",
      "Fundamental Rights, DPSP and Duties",
      "Local Self-Government and Panchayati Raj",
    ],
    qCount: 22,
    pctHard: 14,
    bucket: "foundation",
  },
  {
    slug: "indian-constitution",
    name: "Indian Constitution — Making, Foundation and Amendments",
    summary:
      "20 q · 15% HARD. Constitutional Amendments (10 · 20% HARD — chapter giant; 42nd Amendment 1976 'mini-Constitution', 73rd/74th PRI 1992, 35th Sikkim 1974, 52nd Anti-Defection 1985, 86th RTE 2002, 101st GST 2017, 73rd added Part IX Panchayats, Article 51A Fundamental Duties inserted by 42nd, Article 352 Emergency), Features, Parts and Schedules of Constitution (4 · 25% HARD — Part IX-A Municipalities, Part IX-B Cooperatives, Part X Scheduled Areas, 10th Schedule Anti-Defection 1985, borrowed-features sources), Making of Constitution and Constitutional History (3 · 0% HARD — Drafting Committee BR Ambedkar chair, Objective Resolution 13 Dec 1946 by Nehru, BN Rau Constitutional Adviser + SN Mukherjee Chief Draftsman as civil-servant assistants), Federal Structure — States, UTs and Finance (3 · 0% HARD — 28 states + 8 UTs current count, Article 371A Nagaland special provisions, 16th Finance Commission Arvind Panagariya). Drill /reference-tables → 'Constitutional Amendments ↔ Year ↔ Theme' cluster cold.",
    chapter: "Indian Constitution — Making, Foundation and Amendments",
    subtopics: [
      "Constitutional Amendments",
      "Features, Parts and Schedules of Constitution",
      "Making of Constitution and Constitutional History",
      "Federal Structure — States, UTs and Finance",
    ],
    qCount: 20,
    pctHard: 15,
    bucket: "foundation",
  },

  // ─────── Specialist Wildcard strand (1 playbook · 12 q) ───────
  {
    slug: "world-polity",
    name: "World Polity, Democracy and International Relations",
    summary:
      "12 q · 42% HARD — SMALLEST chapter but HARDEST %HARD in the bank. INVERTS History's Quick-Win pattern (small + easy). 50% multi-statement — abstract theory + UN reference content. Democracy and Political Theory (5 · 40% HARD — universal adult franchise chronology USA 1920 → Japan 1947 → India 1950 → Sri Lanka 1931 [wait — Sri Lanka 1931 actually preceded India], democracy features = consent + political equality + accountability, Lincoln's 'government of the people' quote, US Declaration of Independence rights), United Nations and Global Institutions (5 · 60% HARD — DENSEST %HARD subtopic in entire Polity bank; UNSC non-permanent members 10 elected for 2-yr terms, UN Peacekeeping Operations ↔ countries UNMOGIP/UNFICYP/UNMIK/UNTSO/UNDOF, UN Declarations chronology UDHR 1948 → ICESCR 1966 → CEDAW 1979 → CRC 1989, SDG 17 goals), India's Foreign Policy — Panchsheel (2 · 0% HARD — easy marks pocket; 5 principles of Panchsheel 1954 signed with China). Cover this chapter cold — small but high-yield.",
    chapter: "World Polity, Democracy and International Relations",
    subtopics: [
      "Democracy and Political Theory",
      "United Nations and Global Institutions",
      "India's Foreign Policy — Panchsheel",
    ],
    qCount: 12,
    pctHard: 42,
    bucket: "specialist",
  },
];

/** Slugs eligible for /playbooks/[slug] static rendering. */
export const PLAYBOOK_SLUGS = PLAYBOOKS.map((p) => p.slug);

/** Index by bucket — used by the /playbooks index page. */
export const PLAYBOOKS_BY_BUCKET: Record<PlaybookBucket, Playbook[]> = {
  cornerstone: PLAYBOOKS.filter((p) => p.bucket === "cornerstone"),
  foundation: PLAYBOOKS.filter((p) => p.bucket === "foundation"),
  specialist: PLAYBOOKS.filter((p) => p.bucket === "specialist"),
};
